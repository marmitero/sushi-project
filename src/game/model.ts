import { BALANCE as B } from '../core/balance';
import { Big } from '../core/big';
import {
  GameState,
  OfflineReport,
  incomePerSec,
  ticketValue,
  serviceSeconds,
  customersPerMinute,
  sellToCustomer,
  buyUnlock,
  buyFloorUpgrade,
  buyCashierUpgrade,
  unlockCost,
  floorUpgradeCost,
  cashierUpgradeCost,
  applyOffline,
  initialState,
} from '../core/economy';
import { gte } from '../core/big';
import { save, load } from '../core/save';

export type { OfflineReport };

/**
 * Wrapper mutável e observável do estado econômico puro.
 * Toda mutação passa pelas funções atômicas do núcleo.
 *
 * IMPORTANTE: não existe receita por frame. O dinheiro só muda por:
 *  - `sell()`  → um cliente pagou no guichê do drive-thru;
 *  - compras   → `buyUnlock/buyFloor/buyCashier`;
 *  - offline   → `applyOffline` (clientes atendidos enquanto o jogo estava fechado/oculto).
 */
export class GameModel {
  state: GameState;
  offlineReport: OfflineReport | null = null;
  /** Estrutura mudou (andar/caixa) → cena atualiza a torre. */
  private listeners = new Set<() => void>();

  constructor() {
    const now = Date.now();
    const loaded = load();
    if (loaded) {
      const r = applyOffline(loaded, now);
      this.state = r.state;
      this.offlineReport = r.report;
    } else {
      this.state = initialState(now);
    }
    // Persiste já: o crédito offline fica gravado e um reload imediato não recalcula.
    this.persist();
  }

  onChange(fn: () => void): () => void {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }
  private emit() {
    this.listeners.forEach((f) => f());
  }

  incomePerSec(): Big {
    return incomePerSec(this.state);
  }
  ticket(): Big {
    return ticketValue(this.state);
  }
  serviceSeconds(): number {
    return serviceSeconds(this.state);
  }
  customersPerMinute(): number {
    return customersPerMinute(this.state);
  }

  /** Um cliente pagou no guichê. Retorna o valor pago (p/ feedback visual). */
  sell(): Big {
    const r = sellToCustomer(this.state);
    this.state = r.state;
    return r.paid;
  }

  unlockCost(): Big {
    return unlockCost(this.state);
  }
  floorUpgradeCost(slot: number): Big {
    return floorUpgradeCost(this.state, slot);
  }
  cashierUpgradeCost(): Big {
    return cashierUpgradeCost(this.state);
  }
  canUnlock(): boolean {
    return this.state.floors.length < B.maxFloors;
  }
  canCashier(): boolean {
    return this.state.cashierLevel < B.cashierMaxLevel;
  }
  canAffordUnlock(): boolean {
    return this.canUnlock() && gte(this.state.money, this.unlockCost());
  }
  canAffordFloor(slot: number): boolean {
    return this.state.floors[slot] < B.floorMaxLevel && gte(this.state.money, this.floorUpgradeCost(slot));
  }
  canAffordCashier(): boolean {
    return this.canCashier() && gte(this.state.money, this.cashierUpgradeCost());
  }

  buyUnlock(): boolean {
    const r = buyUnlock(this.state);
    if (r.ok) {
      this.state = r.state;
      this.persist();
      this.emit();
    }
    return r.ok;
  }
  buyFloor(slot: number): boolean {
    const r = buyFloorUpgrade(this.state, slot);
    if (r.ok) {
      this.state = r.state;
      this.persist();
      this.emit();
    }
    return r.ok;
  }
  buyCashier(): boolean {
    const r = buyCashierUpgrade(this.state);
    if (r.ok) {
      this.state = r.state;
      this.persist();
      this.emit();
    }
    return r.ok;
  }

  /** Instante em que o app/aba foi para segundo plano (null = em primeiro plano). */
  private suspendedAt: number | null = null;

  /** App/aba foi para segundo plano: grava o instante para contar o tempo fora. */
  suspend(now = Date.now()) {
    if (this.suspendedAt !== null) return; // já suspenso: mantém o 1º instante
    this.suspendedAt = now;
    this.state = { ...this.state, lastSaved: now };
    this.persist();
  }

  /**
   * Voltou do segundo plano: credita os clientes atendidos no período (mesma regra do offline)
   * e persiste imediatamente (evita pagar de novo num reload).
   * Sem `suspend()` prévio não credita nada — impede contar tempo jogado como tempo fora.
   */
  resume(now = Date.now()): OfflineReport | null {
    if (this.suspendedAt === null) return null;
    const r = applyOffline({ ...this.state, lastSaved: this.suspendedAt }, now);
    this.suspendedAt = null;
    this.state = r.state;
    this.persist();
    return r.report;
  }

  isSuspended(): boolean {
    return this.suspendedAt !== null;
  }

  /**
   * Grava o estado. Se o jogo estiver em segundo plano, o carimbo continua sendo o instante da
   * suspensão — assim fechar a aba depois de horas oculta não apaga esse tempo do offline.
   */
  persist() {
    save(this.state, undefined, this.suspendedAt ?? Date.now());
  }
}
