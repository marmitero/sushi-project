import { BALANCE as B } from '../core/balance';
import { Big } from '../core/big';
import {
  GameState,
  incomePerSec,
  tick,
  buyUnlock,
  buyFloorUpgrade,
  buyCashierUpgrade,
  unlockCost,
  floorUpgradeCost,
  cashierUpgradeCost,
  applyOffline,
  initialState,
} from '../core/economy';
import { save, load } from '../core/save';

export type OfflineReport = { seconds: number; capped: boolean; gain: Big };

/**
 * Wrapper mutável e observável do estado econômico puro.
 * Toda mutação passa pelas funções atômicas do núcleo.
 */
export class GameModel {
  state: GameState;
  offlineReport: OfflineReport | null = null;
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

  update(dtSec: number) {
    this.state = tick(this.state, dtSec);
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

  buyUnlock(): boolean {
    const r = buyUnlock(this.state);
    if (r.ok) {
      this.state = r.state;
      this.emit();
    }
    return r.ok;
  }
  buyFloor(slot: number): boolean {
    const r = buyFloorUpgrade(this.state, slot);
    if (r.ok) {
      this.state = r.state;
      this.emit();
    }
    return r.ok;
  }
  buyCashier(): boolean {
    const r = buyCashierUpgrade(this.state);
    if (r.ok) {
      this.state = r.state;
      this.emit();
    }
    return r.ok;
  }

  persist() {
    save(this.state);
  }
}
