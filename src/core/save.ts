import { BALANCE as B } from './balance';
import { Big, big } from './big';
import { GameState, SAVE_VERSION, initialState } from './economy';

/**
 * Serializa o estado p/ JSON seguro (Big como {m,e}).
 * `savedAt` = instante que conta como "último momento jogado" (base do offline).
 */
export function serialize(s: GameState, savedAt: number = Date.now()): string {
  return JSON.stringify({ ...s, lastSaved: savedAt });
}

export function save(s: GameState, storage: Storage = localStorage, savedAt: number = Date.now()): void {
  try {
    storage.setItem(B.saveKey, serialize(s, savedAt));
  } catch {
    // storage cheio/indisponível — falha silenciosa mas não quebra o jogo.
  }
}

/** Carrega e valida. Retorna null se inexistente/inválido (novo jogo). */
export function load(storage: Storage = localStorage): GameState | null {
  let raw: string | null = null;
  try {
    raw = storage.getItem(B.saveKey);
  } catch {
    return null;
  }
  if (!raw) return null;
  try {
    const data = JSON.parse(raw) as Partial<GameState> & { version?: number };
    return migrate(data);
  } catch {
    return null;
  }
}

/**
 * Migrações por versão.
 * v1 → v2: adiciona `customersServed` (default 0). Demais campos inalterados.
 */
export function migrate(data: Partial<GameState> & { version?: number }): GameState | null {
  const v = data.version ?? 0;
  if (v > SAVE_VERSION) return null; // save do futuro: ignora com segurança
  const base = initialState();
  const floors = Array.isArray(data.floors)
    ? data.floors.map((f) => clampInt(f, 1, B.floorMaxLevel)).slice(0, B.maxFloors)
    : base.floors;
  if (floors.length === 0) floors.push(1);
  const state: GameState = {
    version: SAVE_VERSION,
    money: nonNegative(toBig(data.money, base.money), base.money),
    floors,
    cashierLevel: clampInt(data.cashierLevel, 1, B.cashierMaxLevel),
    lastSaved: typeof data.lastSaved === 'number' && isFinite(data.lastSaved) ? data.lastSaved : Date.now(),
    totalEarned: nonNegative(toBig(data.totalEarned, big(0)), big(0)),
    customersServed: clampInt(data.customersServed ?? 0, 0, Number.MAX_SAFE_INTEGER),
  };
  return state;
}

/** Saldo nunca negativo vindo de save adulterado/corrompido. */
function nonNegative(v: Big, fallback: Big): Big {
  return v.m < 0 ? fallback : v;
}

function clampInt(v: unknown, lo: number, hi: number): number {
  const n = typeof v === 'number' ? Math.floor(v) : NaN;
  if (!isFinite(n)) return lo;
  return Math.min(hi, Math.max(lo, n));
}

function toBig(v: unknown, fallback: Big): Big {
  if (v && typeof v === 'object' && 'm' in (v as object) && 'e' in (v as object)) {
    const o = v as { m: unknown; e: unknown };
    if (typeof o.m === 'number' && isFinite(o.m) && typeof o.e === 'number' && isFinite(o.e)) {
      return big({ m: o.m, e: o.e });
    }
  }
  if (typeof v === 'number' && isFinite(v)) return big(v);
  return fallback;
}

export function clearSave(storage: Storage = localStorage): void {
  try {
    storage.removeItem(B.saveKey);
  } catch {
    /* noop */
  }
}
