import { BALANCE as B } from './balance';
import { Big, big, add, sub, mulNum, gte } from './big';

export const SAVE_VERSION = 1;

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
}

export function initialState(now = Date.now()): GameState {
  return {
    version: SAVE_VERSION,
    money: big(B.startMoney),
    floors: [1], // começa com 1 andar superior nível 1 + térreo (caixa)
    cashierLevel: 1,
    lastSaved: now,
    totalEarned: big(0),
  };
}

/** Receita por segundo de um andar superior (slot 0-based). */
export function floorIncome(s: GameState, slot: number): Big {
  const level = s.floors[slot];
  const base = B.floorBaseIncome * Math.pow(slot + 1, B.floorPosExp);
  const mult = Math.pow(B.floorLevelMult, level - 1);
  return big(base * mult);
}

/** Receita total por segundo (térreo/caixa multiplica tudo). */
export function incomePerSec(s: GameState): Big {
  let sum = big(0);
  for (let i = 0; i < s.floors.length; i++) sum = add(sum, floorIncome(s, i));
  return mulNum(sum, B.cashierMult[s.cashierLevel - 1]);
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

/** Aplica t segundos de receita. Retorna novo estado (imutável). */
export function tick(s: GameState, dtSec: number): GameState {
  if (dtSec <= 0) return s;
  const gain = mulNum(incomePerSec(s), dtSec);
  return { ...s, money: add(s.money, gain), totalEarned: add(s.totalEarned, gain) };
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

/**
 * Ganhos offline. Retorna estado atualizado + relatório p/ popup.
 * Protegido contra: double-grant (usa lastSaved e o avança), tempo negativo, cap.
 */
export function applyOffline(
  s: GameState,
  now: number,
): { state: GameState; report: { seconds: number; capped: boolean; gain: Big } | null } {
  const elapsed = Math.floor((now - s.lastSaved) / 1000);
  if (!isFinite(elapsed) || elapsed <= 0) {
    return { state: { ...s, lastSaved: now }, report: null };
  }
  const cappedSeconds = Math.min(elapsed, B.offlineCapSeconds);
  const gain = mulNum(mulNum(incomePerSec(s), cappedSeconds), B.offlineEfficiency);
  const state: GameState = {
    ...s,
    money: add(s.money, gain),
    totalEarned: add(s.totalEarned, gain),
    lastSaved: now, // avança o marcador => reload não paga de novo
  };
  return { state, report: { seconds: elapsed, capped: elapsed > B.offlineCapSeconds, gain } };
}
