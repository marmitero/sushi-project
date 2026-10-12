import { describe, expect, it } from 'vitest';
import { big, add, sub, mulNum, gte, lt, fmt, toNumber } from '../src/core/big';
import {
  initialState,
  incomePerSec,
  tick,
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

  it('tick acumula receita proporcional ao tempo', () => {
    const s = initialState();
    const after = tick(s, 10);
    expect(toNumber(after.money)).toBeCloseTo(B.startMoney + 10 * 1);
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
  it('save corrompido vira null no load (via migrate de lixo)', () => {
    expect(migrate({ version: 99 })).toBeNull(); // futuro
    const bad = migrate({ version: 1, floors: 'x' as unknown as number[] });
    expect(bad!.floors).toEqual([1]); // saneado
  });
});
