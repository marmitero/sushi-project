import { describe, expect, it } from 'vitest';
import { big, add, sub, mulNum, gte, lt, fmt, toNumber } from '../src/core/big';
import {
  initialState,
  incomePerSec,
  ticketValue,
  serviceSeconds,
  customersPerMinute,
  sellToCustomer,
  buyUnlock,
  buyFloorUpgrade,
  buyCashierUpgrade,
  applyOffline,
  floorUpgradeCost,
  unlockCost,
  cashierUpgradeCost,
} from '../src/core/economy';
import { BALANCE as B } from '../src/core/balance';
import { serialize, migrate } from '../src/core/save';

describe('big', () => {
  it('soma valores simples', () => {
    expect(toNumber(add(big(1.5), big(2.5)))).toBeCloseTo(4);
  });
  it('subtrai e não gera negativo indevido em compra válida', () => {
    const m = big(100);
    const r = sub(m, big(40));
    expect(toNumber(r)).toBeCloseTo(60);
  });
  it('compara corretamente ordens de magnitude', () => {
    expect(lt(big(999), big(1000))).toBe(true);
    expect(gte(big(1e15), big(9e14))).toBe(true);
  });
  it('formata unidades', () => {
    expect(fmt(big(0))).toBe('0');
    expect(fmt(big(999))).toBe('999');
    expect(fmt(big(1500))).toBe('1.50K');
    expect(fmt(big(2_500_000))).toBe('2.50M');
    expect(fmt(big(1e12))).toBe('1.00T');
  });
  it('formata sem resíduo de ponto flutuante e nunca arredonda para cima', () => {
    // 45596.15 - 45096.15 = 499.99999999999 em ponto flutuante: deve exibir 500
    expect(fmt(sub(big(45596.15), big(45096.15)))).toBe('500');
    expect(fmt(sub(big(0.3), big(0.1)))).toBe('0.2');
    expect(fmt(big(11.99))).toBe('11'); // HUD não promete o que o jogador não tem
    expect(fmt(big(9.96))).toBe('9.9');
    expect(fmt(big(4))).toBe('4');
  });
  it('mantém precisão além de Number.MAX_SAFE_INTEGER', () => {
    const a = big(1e20);
    const b = add(a, big(1e20));
    expect(fmt(b)).toBe('200Qi'); // 2e20 => 200 * 1e18 (Qi)
  });
});

describe('economia', () => {
  it('receita inicial bate com a fórmula', () => {
    const s = initialState();
    // 1 andar slot0 nível1 => base 1*1^exp *1.35^0 =1 ; caixa L1 mult 1
    expect(toNumber(incomePerSec(s))).toBeCloseTo(1);
  });

  it('dinheiro só entra por venda: cada cliente credita exatamente o ticket', () => {
    const s = initialState();
    const ticket = toNumber(ticketValue(s));
    // ticket = receita média/s * segundos por cliente (caixa L1 = 4s) => 1 * 4
    expect(ticket).toBeCloseTo(1 * B.serviceSeconds[0]);
    const r = sellToCustomer(s);
    expect(toNumber(r.paid)).toBeCloseTo(ticket);
    expect(toNumber(r.state.money)).toBeCloseTo(B.startMoney + ticket);
    expect(toNumber(r.state.totalEarned)).toBeCloseTo(ticket);
    expect(r.state.customersServed).toBe(1);
    // estado original intacto (função pura)
    expect(toNumber(s.money)).toBeCloseTo(B.startMoney);
  });

  it('não existe mais receita passiva: o núcleo não exporta tick', async () => {
    const mod = (await import('../src/core/economy')) as Record<string, unknown>;
    expect(mod.tick).toBeUndefined();
  });

  it('ritmo de clientes: média de vendas = incomePerSec em todos os níveis de caixa', () => {
    for (let lvl = 1; lvl <= B.cashierMaxLevel; lvl++) {
      const s = { ...initialState(), floors: [3, 2, 1], cashierLevel: lvl };
      const perSecond = toNumber(ticketValue(s)) / serviceSeconds(s);
      expect(perSecond).toBeCloseTo(toNumber(incomePerSec(s)), 6);
      expect(customersPerMinute(s)).toBeCloseTo(60 / B.serviceSeconds[lvl - 1]);
    }
  });

  it('caixa melhor atende mais rápido e aumenta o ticket', () => {
    const s1 = initialState();
    const s2 = { ...s1, cashierLevel: 2 };
    expect(serviceSeconds(s2)).toBeLessThan(serviceSeconds(s1));
    expect(toNumber(ticketValue(s2))).toBeGreaterThan(toNumber(ticketValue(s1)));
  });

  it('compra de upgrade desconta exatamente o custo (atomicidade)', () => {
    let s = initialState();
    s = { ...s, money: big(1000) };
    const cost = floorUpgradeCost(s, 0);
    const r = buyFloorUpgrade(s, 0);
    expect(r.ok).toBe(true);
    expect(toNumber(r.state.money)).toBeCloseTo(1000 - toNumber(cost));
    expect(r.state.floors[0]).toBe(2);
  });

  it('não permite comprar sem saldo', () => {
    let s = initialState();
    s = { ...s, money: big(0) };
    expect(buyUnlock(s).ok).toBe(false);
    expect(buyFloorUpgrade(s, 0).ok).toBe(false);
    expect(buyCashierUpgrade(s).ok).toBe(false);
  });

  it('desbloqueio aumenta nº de andares e receita', () => {
    let s = initialState();
    s = { ...s, money: big(1e6) };
    const before = toNumber(incomePerSec(s));
    const r = buyUnlock(s);
    expect(r.ok).toBe(true);
    expect(r.state.floors.length).toBe(2);
    expect(toNumber(incomePerSec(r.state))).toBeGreaterThan(before);
  });

  it('upgrade do caixa multiplica receita global', () => {
    let s = initialState();
    const base = toNumber(incomePerSec(s));
    s = { ...s, money: big(1e6) };
    const r = buyCashierUpgrade(s);
    expect(r.ok).toBe(true);
    expect(toNumber(incomePerSec(r.state))).toBeCloseTo(base * B.cashierMult[1]);
  });

  it('ganhos offline não pagam duas vezes e respeitam cap', () => {
    let s = initialState(0);
    s = { ...s, lastSaved: 0 };
    const now = (B.offlineCapSeconds + 500) * 1000;
    const first = applyOffline(s, now);
    expect(first.report).not.toBeNull();
    expect(first.report!.capped).toBe(true);
    // reload no MESMO instante não paga de novo (lastSaved já avançou)
    const second = applyOffline(first.state, now);
    expect(second.report).toBeNull();
  });

  it('offline = clientes atendidos no ritmo reduzido, cada um pagando o ticket', () => {
    const s = { ...initialState(0), lastSaved: 0 };
    const now = (B.offlineCapSeconds + 500) * 1000;
    const r = applyOffline(s, now);
    const expectedCustomers = Math.floor((B.offlineCapSeconds * B.offlineEfficiency) / B.serviceSeconds[0]);
    expect(r.report!.customers).toBe(expectedCustomers);
    expect(toNumber(r.report!.gain)).toBeCloseTo(expectedCustomers * toNumber(ticketValue(s)));
    expect(r.state.customersServed).toBe(expectedCustomers);
  });

  it('ausência curta (< offlineMinSeconds) não gera ganho nem popup', () => {
    const s = { ...initialState(0), lastSaved: 0 };
    const r = applyOffline(s, (B.offlineMinSeconds - 1) * 1000);
    expect(r.report).toBeNull();
    expect(toNumber(r.state.money)).toBeCloseTo(B.startMoney);
  });

  it('ganhos offline com tempo negativo não concedem nada', () => {
    let s = initialState(10_000);
    s = { ...s, lastSaved: 10_000 };
    const r = applyOffline(s, 5_000); // relógio voltou
    expect(r.report).toBeNull();
  });
});

describe('save/migração', () => {
  it('roundtrip preserva estado', () => {
    const s = initialState();
    const json = serialize(s);
    const back = migrate(JSON.parse(json));
    expect(back).not.toBeNull();
    expect(back!.floors).toEqual(s.floors);
    expect(back!.cashierLevel).toBe(s.cashierLevel);
  });
  it('migra save v1 (sem customersServed) para v2', () => {
    const v1 = { version: 1, money: { m: 5, e: 2 }, floors: [2, 1], cashierLevel: 2, lastSaved: 123, totalEarned: { m: 1, e: 3 } };
    const back = migrate(v1 as never);
    expect(back).not.toBeNull();
    expect(back!.version).toBe(2);
    expect(back!.customersServed).toBe(0);
    expect(toNumber(back!.money)).toBeCloseTo(500);
    expect(back!.floors).toEqual([2, 1]);
  });
  it('save adulterado com saldo negativo não gera saldo negativo', () => {
    const back = migrate({ version: 2, money: { m: -5, e: 3 } } as never);
    expect(back!.money.m).toBeGreaterThanOrEqual(0);
  });
  it('save corrompido vira null no load (via migrate de lixo)', () => {
    expect(migrate({ version: 99 })).toBeNull(); // futuro
    const bad = migrate({ version: 1, floors: 'x' as unknown as number[] });
    expect(bad!.floors).toEqual([1]); // saneado
  });
});
