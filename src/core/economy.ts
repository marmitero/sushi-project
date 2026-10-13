import { BALANCE as B } from './balance';
import { Big, big, add, sub, mulNum, gte } from './big';

/** v2: + customersServed (migração v1→v2 em save.ts). */
export const SAVE_VERSION = 2;

export interface GameState {
  version: number;
  money: Big;
  /** Nível (1..10) de cada andar superior desbloqueado. length = nº de andares. */
  floors: number[];
  /** Nível do caixa (1..6). */
  cashierLevel: number;
  /** Epoch ms do último save válido (p/ ganhos offline). */
  lastSaved: number;
  totalEarned: Big;
  /** Total de clientes do drive-thru que pagaram (online + offline). */
  customersServed: number;
}

export function initialState(now = Date.now()): GameState {
  return {
    version: SAVE_VERSION,
    money: big(B.startMoney),
    floors: [1], // começa com 1 andar superior nível 1 + térreo (caixa)
    cashierLevel: 1,
    lastSaved: now,
    totalEarned: big(0),
    customersServed: 0,
  };
}

/** Contribuição de um andar (cozinha) para a receita média por segundo (slot 0-based). */
export function floorIncome(s: GameState, slot: number): Big {
  const level = s.floors[slot];
  const base = B.floorBaseIncome * Math.pow(slot + 1, B.floorPosExp);
  const mult = Math.pow(B.floorLevelMult, level - 1);
  return big(base * mult);
}

/**
 * Receita MÉDIA por segundo (ritmo de vendas). Não credita nada sozinha:
 * é usada para precificar o ticket, para a HUD (estimativa) e para o offline.
 */
export function incomePerSec(s: GameState): Big {
  let sum = big(0);
  for (let i = 0; i < s.floors.length; i++) sum = add(sum, floorIncome(s, i));
  return mulNum(sum, B.cashierMult[s.cashierLevel - 1]);
}

/** Segundos entre pagamentos no guichê (depende do nível do caixa). */
export function serviceSeconds(s: GameState): number {
  return B.serviceSeconds[s.cashierLevel - 1];
}

/** Clientes atendidos por minuto no ritmo ativo. */
export function customersPerMinute(s: GameState): number {
  return 60 / serviceSeconds(s);
}

/** Valor pago por UM cliente: cozinhas (andares) definem o pedido, o caixa vende combos. */
export function ticketValue(s: GameState): Big {
  return mulNum(incomePerSec(s), serviceSeconds(s));
}

/**
 * Um cliente pagou no guichê. ÚNICA fonte de receita durante o jogo ativo.
 * Sempre credita valor positivo e incrementa o contador de clientes.
 */
export function sellToCustomer(s: GameState): { state: GameState; paid: Big } {
  const paid = ticketValue(s);
  return {
    state: {
      ...s,
      money: add(s.money, paid),
      totalEarned: add(s.totalEarned, paid),
      customersServed: s.customersServed + 1,
    },
    paid,
  };
}

export function unlockCost(s: GameState): Big {
  return big(B.unlockBase * Math.pow(B.unlockGrowth, s.floors.length));
}

export function floorUpgradeCost(s: GameState, slot: number): Big {
  const level = s.floors[slot];
  return big(B.floorUpgBase * Math.pow(B.floorUpgGrowth, level - 1) * (slot + 1));
}

export function cashierUpgradeCost(s: GameState): Big {
  return big(B.cashierUpgBase * Math.pow(B.cashierUpgGrowth, s.cashierLevel - 1));
}

/** Desbloqueia próximo andar. Atômico: só aplica se puder pagar. */
export function buyUnlock(s: GameState): { state: GameState; ok: boolean } {
  if (s.floors.length >= B.maxFloors) return { state: s, ok: false };
  const cost = unlockCost(s);
  if (!gte(s.money, cost)) return { state: s, ok: false };
  return {
    state: { ...s, money: sub(s.money, cost), floors: [...s.floors, 1] },
    ok: true,
  };
}

export function buyFloorUpgrade(s: GameState, slot: number): { state: GameState; ok: boolean } {
  if (slot < 0 || slot >= s.floors.length) return { state: s, ok: false };
  if (s.floors[slot] >= B.floorMaxLevel) return { state: s, ok: false };
  const cost = floorUpgradeCost(s, slot);
  if (!gte(s.money, cost)) return { state: s, ok: false };
  const floors = [...s.floors];
  floors[slot] += 1;
  return { state: { ...s, money: sub(s.money, cost), floors }, ok: true };
}

export function buyCashierUpgrade(s: GameState): { state: GameState; ok: boolean } {
  if (s.cashierLevel >= B.cashierMaxLevel) return { state: s, ok: false };
  const cost = cashierUpgradeCost(s);
  if (!gte(s.money, cost)) return { state: s, ok: false };
  return { state: { ...s, money: sub(s.money, cost), cashierLevel: s.cashierLevel + 1 }, ok: true };
}

export type OfflineReport = { seconds: number; capped: boolean; customers: number; gain: Big };

/**
 * Ganhos offline = clientes que passaram no drive-thru enquanto o jogo estava fechado/oculto.
 * clientes = floor(min(ausência, cap) * eficiência / serviceSeconds); ganho = clientes * ticket.
 * Mesma regra do jogo ativo (dinheiro só entra por cliente), em ritmo reduzido.
 * Protegido contra: double-grant (avança lastSaved), tempo negativo, cap, ausências curtas.
 */
export function applyOffline(
  s: GameState,
  now: number,
): { state: GameState; report: OfflineReport | null } {
  const elapsed = Math.floor((now - s.lastSaved) / 1000);
  if (!isFinite(elapsed) || elapsed < B.offlineMinSeconds) {
    return { state: { ...s, lastSaved: now }, report: null };
  }
  const cappedSeconds = Math.min(elapsed, B.offlineCapSeconds);
  const customers = Math.floor((cappedSeconds * B.offlineEfficiency) / serviceSeconds(s));
  if (customers <= 0) {
    return { state: { ...s, lastSaved: now }, report: null };
  }
  const gain = mulNum(ticketValue(s), customers);
  const state: GameState = {
    ...s,
    money: add(s.money, gain),
    totalEarned: add(s.totalEarned, gain),
    customersServed: s.customersServed + customers,
    lastSaved: now, // avança o marcador => reload não paga de novo
  };
  return {
    state,
    report: { seconds: elapsed, capped: elapsed > B.offlineCapSeconds, customers, gain },
  };
}
