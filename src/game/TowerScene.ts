import Phaser from 'phaser';
import { GameModel, OfflineReport } from './model';
import { ASSETS } from './BootScene';
import { Big, add, fmt, sub } from '../core/big';
import { BALANCE as B } from '../core/balance';
import { DriveThru, SimCar } from '../core/drivethru';
import {
  GAME_W,
  GAME_H,
  S,
  BG,
  GROUND_Y,
  LANE_Y,
  FLOOR,
  CAR,
  TOWER_X,
  floorX,
  floorY,
  floorBottom,
  CASHIER_X,
  CASHIER_WINDOW_X,
  CASHIER_WINDOW_BOTTOM,
  CAR_WINDOW_X,
  HUD_TOP_H,
} from './layout';

const F_TITLE = '"Lilita One", sans-serif';
const F_BODY = '"Passion One", sans-serif';
const F_LABEL = '"Bebas Neue", sans-serif';

/** Ordem de desenho (maior = na frente). */
const DEPTH = {
  bg: 0,
  clouds: 1,
  floor: 10, // + fração por andar: andares de baixo por cima (beiral cobre a base do de cima)
  lift: 11.5,
  cashier: 12, // placa "SUSHI TOWER" fica na frente da base do 1º andar
  staff: 20,
  floorUi: 30,
  car: 40,
  fx: 50,
  hud: 100,
  popup: 200,
} as const;

/** Arraste acima disto (px lógicos) é rolagem, não toque — evita compras acidentais. */
const DRAG_THRESHOLD = 12;

type Btn = {
  root: Phaser.GameObjects.Container;
  bg: Phaser.GameObjects.Image;
  setEnabled(on: boolean): void;
};

type FloorView = {
  slot: number;
  level: number;
  img: Phaser.GameObjects.Image;
  chef: Phaser.GameObjects.Sprite;
  girl: Phaser.GameObjects.Sprite;
  plate: Phaser.GameObjects.Text;
  btn: Btn;
  cost: Phaser.GameObjects.Text;
};

type CarView = { sprite: Phaser.GameObjects.Sprite; key: string; lastX: number; mode: 'move' | 'idle' };

function txt(
  scene: Phaser.Scene,
  x: number,
  y: number,
  value: string,
  style: Phaser.Types.GameObjects.Text.TextStyle,
): Phaser.GameObjects.Text {
  return scene.add.text(x, y, value, { resolution: 2, ...style });
}

export class TowerScene extends Phaser.Scene {
  private model!: GameModel;
  private drive!: DriveThru;

  private floorViews: FloorView[] = [];
  private locked?: { img: Phaser.GameObjects.Image; btn: Btn; cost: Phaser.GameObjects.Text };
  private cashierImg!: Phaser.GameObjects.Image;
  private lift!: Phaser.GameObjects.Sprite;
  private liftFloors = -1;
  private carViews = new Map<number, CarView>();

  private moneyText!: Phaser.GameObjects.Text;
  private rateText!: Phaser.GameObjects.Text;
  private servedText!: Phaser.GameObjects.Text;
  private cashierBtn!: Btn;
  private cashierTitle!: Phaser.GameObjects.Text;
  private cashierSub!: Phaser.GameObjects.Text;
  private readonly hudCoin = { x: 44, y: 56 };

  private minScroll = 0;
  private dragging = false;
  private dragStartY = 0;
  private dragStartScroll = 0;
  private popupOpen = false;
  /** Ganho offline já creditado (e salvo) mas ainda não "coletado" na tela: a HUD o retém. */
  private hudHold: Big | null = null;
  private popup?: {
    report: OfflineReport;
    body: Phaser.GameObjects.Text;
    gain: Phaser.GameObjects.Text;
    note: Phaser.GameObjects.Text;
    coin: Phaser.GameObjects.Image;
  };

  private hudTimer = 0;
  private saveTimer = 0;

  constructor() {
    super('Tower');
  }

  create() {
    this.model = new GameModel();
    this.cameras.main.setBackgroundColor(BG.skyColor);

    // Fundo no MUNDO: rola junto com a torre, então a calçada fica sempre sob o prédio.
    this.add.image(TOWER_X, 0, 'st_background').setOrigin(0.5, 0).setScale(BG.scale).setDepth(DEPTH.bg);
    this.addClouds();

    this.buildCashier();
    this.syncFloors();
    this.buildLift();

    this.drive = new DriveThru({
      spawnX: GAME_W + 110,
      windowX: CAR_WINDOW_X,
      exitX: -110,
      speed: CAR.speed,
      gap: CAR.gap,
      maxCars: CAR.maxCars,
      variants: Object.keys(ASSETS.cars).length,
    });

    this.buildHud();
    this.setupInput();
    this.setupLifecycle();
    this.model.onChange(() => this.onStructureChange());

    if (this.model.offlineReport) this.showOfflinePopup(this.model.offlineReport);
    this.refreshHud();
  }

  // ======================================================================= Cenário
  private addClouds() {
    const defs = [
      { x: 470, y: 205, s: 0.8, dx: 50, dur: 16000 },
      { x: 230, y: -260, s: 0.6, dx: -40, dur: 20000 },
      { x: 480, y: -820, s: 0.7, dx: 60, dur: 24000 },
      { x: 240, y: -1400, s: 0.55, dx: -50, dur: 22000 },
    ];
    for (const d of defs) {
      const c = this.add
        .image(d.x, d.y, 'st_clouds')
        .setScale(d.s)
        .setAlpha(0.92)
        .setDepth(DEPTH.clouds)
        .setScrollFactor(1, 0.6); // parallax vertical
      this.tweens.add({ targets: c, x: d.x + d.dx, duration: d.dur, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
    }
  }

  private buildCashier() {
    this.cashierImg = this.add
      .image(CASHIER_X, GROUND_Y, 'st_cashier' + this.model.state.cashierLevel)
      .setOrigin(0.5, 1)
      .setScale(S)
      .setDepth(DEPTH.cashier);
    // Atendente dentro da janela "CASHIER" (a arte já traz a caixa registradora).
    this.add
      .sprite(CASHIER_WINDOW_X, CASHIER_WINDOW_BOTTOM, ASSETS.animations.cashierGirl[0])
      .setOrigin(0.5, 1)
      .setScale(S)
      .setDepth(DEPTH.staff)
      .play('cashierGirl');
  }

  /** Cria andares que faltam e troca a arte dos que mudaram de nível (sem recriar tudo). */
  private syncFloors() {
    const floors = this.model.state.floors;
    for (let i = this.floorViews.length; i < floors.length; i++) this.floorViews.push(this.createFloor(i));
    floors.forEach((lvl, i) => {
      const v = this.floorViews[i];
      if (v.level !== lvl) {
        v.level = lvl;
        v.img.setTexture('st_floor' + Math.min(lvl, 10));
        v.plate.setText(this.floorLabel(i, lvl));
        this.pop(v.img, S);
      }
    });
    this.syncLockedFloor();
    this.updateScrollBounds();
  }

  private floorLabel(slot: number, lvl: number) {
    return `ANDAR ${slot + 1} · NV ${lvl}`;
  }

  private createFloor(slot: number): FloorView {
    const lvl = this.model.state.floors[slot];
    const img = this.add
      .image(TOWER_X, floorBottom(slot), 'st_floor' + Math.min(lvl, 10))
      .setOrigin(0.5, 1)
      .setScale(S)
      .setDepth(DEPTH.floor + (B.maxFloors - slot) * 0.01);

    // Garçonete atrás do balcão da esquerda (o sprite mostra da cintura p/ cima + máquina).
    const girl = this.add
      .sprite(floorX(FLOOR.counter.x), floorY(slot, FLOOR.counter.top), ASSETS.animations.floorGirl[0])
      .setOrigin(0.5, 1)
      .setScale(S)
      .setDepth(DEPTH.staff);
    girl.play({ key: 'floorGirl', startFrame: Phaser.Math.Between(0, ASSETS.animations.floorGirl.length - 1) });

    // Chef de costas cozinhando no fogão da direita.
    const chef = this.add
      .sprite(floorX(FLOOR.stoveX), floorY(slot, FLOOR.floorLine), ASSETS.animations.chefCooking[0])
      .setOrigin(0.5, 1)
      .setScale(S)
      .setDepth(DEPTH.staff + 0.5);
    chef.play({ key: 'chefCooking', startFrame: Phaser.Math.Between(0, ASSETS.animations.chefCooking.length - 1) });
    this.scheduleChef(chef);

    // Nome/nível na placa vazia do telhado.
    const plate = txt(this, floorX(FLOOR.plate.x), floorY(slot, FLOOR.plate.y), this.floorLabel(slot, lvl), {
      fontFamily: F_LABEL,
      fontSize: '27px',
      color: '#ffe9c7',
    })
      .setOrigin(0.5)
      .setDepth(DEPTH.floorUi);

    // Botão de melhoria sobre o telhado (seta do kit + custo).
    const btn = this.makeButton(
      floorX(FLOOR.upgrade.x),
      floorY(slot, FLOOR.upgrade.y),
      'ui_Btn_Orange_Small',
      'ui_Btn_Orange_Small_Off',
      0.4,
      () => this.tryBuyFloor(slot),
    );
    const arrow = this.add.image(-50, -1, 'ui_ArrowUpgrade').setScale(0.62);
    const cost = txt(this, 12, 0, '', {
      fontFamily: F_TITLE,
      fontSize: '25px',
      color: '#ffffff',
      stroke: '#8a3c0f',
      strokeThickness: 5,
    }).setOrigin(0.5);
    btn.root.add([arrow, cost]).setDepth(DEPTH.floorUi);

    return { slot, level: lvl, img, chef, girl, plate, btn, cost };
  }

  /**
   * Vida no andar (puramente visual, documentado): o chef cozinha, leva o pedido até a garçonete
   * (anim "Walk Full Order", arte virada p/ esquerda) e volta (anim "Walk" espelhada).
   */
  private scheduleChef(chef: Phaser.GameObjects.Sprite) {
    this.time.delayedCall(Phaser.Math.Between(5000, 10000), () => {
      if (!chef.active) return;
      const from = floorX(FLOOR.stoveX);
      const to = floorX(FLOOR.handoffX);
      const ms = (Math.abs(from - to) / 70) * 1000;
      chef.setFlipX(false).play('chefWalkFull');
      this.tweens.add({
        targets: chef,
        x: to,
        duration: ms,
        onComplete: () => {
          chef.setFlipX(true).play('chefWalk');
          this.tweens.add({
            targets: chef,
            x: from,
            duration: ms,
            delay: 300,
            onComplete: () => {
              chef.setFlipX(false).play('chefCooking');
              this.scheduleChef(chef);
            },
          });
        },
      });
    });
  }

  /** Andar seguinte bloqueado (arte Lv0 "ADD NEW FLOOR") + botão de construção. */
  private syncLockedFloor() {
    const n = this.model.state.floors.length;
    if (!this.model.canUnlock()) {
      this.locked?.img.destroy();
      this.locked?.btn.root.destroy();
      this.locked = undefined;
      return;
    }
    if (!this.locked) {
      const img = this.add.image(TOWER_X, 0, 'st_floor0').setOrigin(0.5, 1).setScale(S);
      const btn = this.makeButton(0, 0, 'ui_Btn_Green', 'ui_Btn_Green', 0.8, () => this.tryUnlock());
      const title = txt(this, 0, -15, 'CONSTRUIR ANDAR', {
        fontFamily: F_TITLE,
        fontSize: '22px',
        color: '#ffffff',
        stroke: '#14532d',
        strokeThickness: 5,
      }).setOrigin(0.5);
      const cost = txt(this, 0, 15, '', {
        fontFamily: F_TITLE,
        fontSize: '24px',
        color: '#fff6c9',
        stroke: '#14532d',
        strokeThickness: 5,
      }).setOrigin(0.5);
      btn.root.add([title, cost]).setDepth(DEPTH.floorUi);
      this.locked = { img, btn, cost };
    }
    this.locked.img.setPosition(TOWER_X, floorBottom(n)).setDepth(DEPTH.floor + (B.maxFloors - n) * 0.01);
    this.locked.btn.root.setPosition(floorX(FLOOR.lockedBanner.x), floorY(n, FLOOR.lockedBanner.y));
  }

  /** Ascensorista no poço do elevador, parando em cada andar (decorativo, documentado). */
  private buildLift() {
    this.lift = this.add
      .sprite(floorX(FLOOR.shaftX), floorY(0, FLOOR.floorLine), ASSETS.animations.liftGuy[0])
      .setOrigin(0.5, 1)
      .setScale(S)
      .setDepth(DEPTH.lift)
      .play('liftGuy');
    this.restartLift();
  }

  private restartLift() {
    const n = this.model.state.floors.length;
    if (n === this.liftFloors) return;
    this.liftFloors = n;
    this.tweens.killTweensOf(this.lift);
    const stops = Array.from({ length: n }, (_, i) => floorY(i, FLOOR.floorLine));
    this.lift.y = stops[0];
    if (n < 2) return;
    const path = [...stops.slice(1), ...stops.slice(0, -1).reverse()]; // sobe e desce
    let prev = stops[0];
    const tweens = path.map((y) => {
      const duration = (Math.abs(y - prev) / 120) * 1000;
      prev = y;
      return { y, duration, delay: 700, ease: 'Sine.easeInOut' };
    });
    this.tweens.chain({ targets: this.lift, tweens, loop: -1 });
  }

  // ======================================================================= Drive-thru
  private syncCars() {
    const alive = new Set<number>();
    for (const c of this.drive.cars) {
      alive.add(c.id);
      const key = 'car' + (c.variant + 1);
      let v = this.carViews.get(c.id);
      if (!v) {
        const sprite = this.add
          .sprite(c.x, LANE_Y, ASSETS.cars[key].move[0])
          .setOrigin(0.5, 1)
          .setScale(S)
          .setDepth(DEPTH.car)
          .play('car_' + key + '_move');
        v = { sprite, key, lastX: c.x, mode: 'move' };
        this.carViews.set(c.id, v);
      }
      // Arte virada para a esquerda e movimento sempre para a esquerda: nunca espelhar.
      const mode = Math.abs(c.x - v.lastX) > 0.01 ? 'move' : 'idle';
      if (mode !== v.mode) {
        v.sprite.play('car_' + key + '_' + mode);
        v.mode = mode;
      }
      v.sprite.x = c.x;
      v.lastX = c.x;
    }
    for (const [id, v] of this.carViews) {
      if (!alive.has(id)) {
        v.sprite.destroy();
        this.carViews.delete(id);
      }
    }
  }

  /** Feedback de venda: "+valor" sobre o carro e moeda voando até o contador. */
  private onSale(car: SimCar, paid: Big) {
    const y = LANE_Y - 122;
    const label = txt(this, car.x, y, '+$' + fmt(paid), {
      fontFamily: F_TITLE,
      fontSize: '36px',
      color: '#ffe066',
      stroke: '#5a2d0c',
      strokeThickness: 7,
    })
      .setOrigin(0.5)
      .setDepth(DEPTH.fx)
      .setScale(0.6);
    // "pop" de entrada, segura legível e então sobe sumindo.
    this.tweens.add({ targets: label, scale: 1, duration: 160, ease: 'Back.easeOut' });
    this.tweens.add({
      targets: label,
      y: y - 64,
      alpha: { from: 1, to: 0 },
      delay: 650,
      duration: 900,
      ease: 'Cubic.easeIn',
      onComplete: () => label.destroy(),
    });

    const cam = this.cameras.main;
    const coin = this.add
      .image(car.x - 30, y - cam.scrollY, 'ui_CoinIcon')
      .setScale(0.6)
      .setScrollFactor(0)
      .setDepth(DEPTH.hud + 5);
    this.tweens.add({
      targets: coin,
      x: this.hudCoin.x,
      y: this.hudCoin.y,
      scale: 0.4,
      duration: 700,
      ease: 'Cubic.easeIn',
      onComplete: () => {
        coin.destroy();
        this.refreshHud();
        this.tweens.add({ targets: this.moneyText, scale: 1.12, duration: 80, yoyo: true });
      },
    });
  }

  // ======================================================================= HUD
  private buildHud() {
    const fixed = <T extends Phaser.GameObjects.GameObject & { setScrollFactor: (x: number) => T }>(o: T) =>
      o.setScrollFactor(0);

    fixed(this.add.image(24 + 124, 56, 'ui_HudCoinBar').setScale(0.8).setDepth(DEPTH.hud));
    fixed(this.add.image(this.hudCoin.x, this.hudCoin.y, 'ui_CoinIcon').setScale(0.95).setDepth(DEPTH.hud + 1));
    this.moneyText = fixed(
      txt(this, 84, 56, '0', {
        fontFamily: F_TITLE,
        fontSize: '38px',
        color: '#ffffff',
        stroke: '#8a3c0f',
        strokeThickness: 6,
      })
        .setOrigin(0, 0.5)
        .setDepth(DEPTH.hud + 1),
    );
    const line = { fontFamily: F_BODY, fontSize: '26px', color: '#ffffff', stroke: '#0b3550', strokeThickness: 5 };
    this.rateText = fixed(txt(this, 24, 96, '', line).setDepth(DEPTH.hud));
    this.servedText = fixed(txt(this, 24, 126, '', { ...line, fontSize: '22px', color: '#d8f1ff' }).setDepth(DEPTH.hud));

    // Melhoria do caixa: botão fixo na faixa de terra do fundo (abaixo da rua).
    this.cashierBtn = this.makeButton(GAME_W / 2, GAME_H - 78, 'ui_Btn_Orange', 'ui_Btn_Orange', 0.56, () =>
      this.tryBuyCashier(),
    );
    this.cashierTitle = txt(this, 0, -17, '', {
      fontFamily: F_TITLE,
      fontSize: '27px',
      color: '#ffffff',
      stroke: '#8a3c0f',
      strokeThickness: 6,
    }).setOrigin(0.5);
    this.cashierSub = txt(this, 0, 19, '', {
      fontFamily: F_BODY,
      fontSize: '23px',
      color: '#fff3d6',
      stroke: '#8a3c0f',
      strokeThickness: 4,
    }).setOrigin(0.5);
    this.cashierBtn.root.add([this.cashierTitle, this.cashierSub]);
    this.cashierBtn.root.setDepth(DEPTH.hud).setScrollFactor(0, 0, true);
  }

  private refreshHud() {
    const m = this.model;
    const s = m.state;
    this.moneyText.setText(fmt(this.hudHold ? sub(s.money, this.hudHold) : s.money));
    this.rateText.setText(`${Math.round(m.customersPerMinute())} clientes/min × $${fmt(m.ticket())}`);
    this.servedText.setText(`Atendidos: ${s.customersServed.toLocaleString('pt-BR')} · ≈ $${fmt(m.incomePerSec())}/s`);

    if (m.canCashier()) {
      this.cashierTitle.setText(`MELHORAR CAIXA · NV ${s.cashierLevel + 1}`);
      this.cashierSub.setText(`$${fmt(m.cashierUpgradeCost())} · atende mais rápido`);
      this.cashierBtn.setEnabled(m.canAffordCashier());
    } else {
      this.cashierTitle.setText('CAIXA NO NÍVEL MÁXIMO');
      this.cashierSub.setText(`${Math.round(m.customersPerMinute())} clientes/min`);
      this.cashierBtn.setEnabled(false);
    }

    this.floorViews.forEach((v) => {
      if (s.floors[v.slot] >= B.floorMaxLevel) {
        v.cost.setText('MÁX');
        v.btn.setEnabled(false);
      } else {
        v.cost.setText('$' + fmt(m.floorUpgradeCost(v.slot)));
        v.btn.setEnabled(m.canAffordFloor(v.slot));
      }
    });
    if (this.locked) {
      this.locked.cost.setText('$' + fmt(m.unlockCost()));
      this.locked.btn.setEnabled(m.canAffordUnlock());
    }
  }

  // ======================================================================= Compras
  private tryBuyFloor(slot: number) {
    const v = this.floorViews[slot];
    if (this.model.state.floors[slot] >= B.floorMaxLevel) return this.toast('Nível máximo', v.btn.root);
    if (!this.model.buyFloor(slot)) return this.deny(v.btn, this.model.floorUpgradeCost(slot));
    this.toast('Andar melhorado! Pedidos maiores', v.btn.root, '#b9ffb0');
  }

  private tryUnlock() {
    if (!this.locked) return;
    const btn = this.locked.btn;
    if (!this.model.buyUnlock()) return this.deny(btn, this.model.unlockCost());
    this.toast('Novo andar construído!', btn.root, '#b9ffb0');
  }

  private tryBuyCashier() {
    if (!this.model.canCashier()) return this.toast('Caixa já está no máximo', this.cashierBtn.root);
    if (!this.model.buyCashier()) return this.deny(this.cashierBtn, this.model.cashierUpgradeCost());
    this.toast(`Caixa nível ${this.model.state.cashierLevel}! Atendimento mais rápido`, this.cashierBtn.root, '#b9ffb0');
  }

  /** Compra recusada: explica o motivo (quanto falta) e balança o botão. */
  private deny(btn: Btn, cost: Big) {
    const missing = sub(cost, this.model.state.money);
    this.toast(missing.m > 0 ? `Faltam $${fmt(missing)}` : 'Indisponível', btn.root, '#ffd0c4');
    const x = btn.root.x;
    this.tweens.add({ targets: btn.root, x: x + 7, duration: 45, yoyo: true, repeat: 2, onComplete: () => btn.root.setX(x) });
  }

  private onStructureChange() {
    this.syncFloors();
    const lvl = this.model.state.cashierLevel;
    const key = 'st_cashier' + lvl;
    if (this.cashierImg.texture.key !== key) {
      this.cashierImg.setTexture(key);
      this.pop(this.cashierImg, S);
    }
    this.restartLift();
    this.refreshHud();
  }

  // ======================================================================= Botões / feedback
  private makeButton(x: number, y: number, texOn: string, texOff: string, scale: number, onTap: () => void): Btn {
    const root = this.add.container(x, y);
    const bg = this.add.image(0, 0, texOn).setScale(scale);
    root.add(bg);
    bg.setInteractive({ useHandCursor: true });
    let pressed = false;
    bg.on('pointerdown', () => {
      pressed = true;
      root.setScale(0.95);
    });
    bg.on('pointerout', () => {
      pressed = false;
      root.setScale(1);
    });
    bg.on('pointerup', () => {
      const fire = pressed && !this.dragging;
      pressed = false;
      root.setScale(1);
      if (fire) onTap(); // compra só no "soltar" e só se não houve arraste
    });
    return {
      root,
      bg,
      setEnabled: (on: boolean) => {
        if (texOn !== texOff) bg.setTexture(on ? texOn : texOff);
        else if (on) bg.clearTint();
        else bg.setTint(0x9a9a9a);
      },
    };
  }

  private toast(msg: string, anchor: Phaser.GameObjects.Container, color = '#ffffff') {
    const fixed = anchor.scrollFactorY === 0;
    const t = txt(this, anchor.x, anchor.y - 52, msg, {
      fontFamily: F_TITLE,
      fontSize: '24px',
      color,
      stroke: '#3b1d0a',
      strokeThickness: 6,
      align: 'center',
    })
      .setOrigin(0.5)
      .setDepth(fixed ? DEPTH.hud + 10 : DEPTH.fx + 1)
      .setScrollFactor(fixed ? 0 : 1);
    // Mantém o texto dentro da tela.
    t.x = Phaser.Math.Clamp(t.x, t.width / 2 + 8, GAME_W - t.width / 2 - 8);
    this.tweens.add({
      targets: t,
      y: t.y - 40,
      alpha: { from: 1, to: 0 },
      delay: 500,
      duration: 900,
      onComplete: () => t.destroy(),
    });
  }

  private pop(img: Phaser.GameObjects.Image, base: number) {
    this.tweens.add({ targets: img, scaleX: base * 1.04, scaleY: base * 1.04, duration: 110, yoyo: true });
  }

  // ======================================================================= Rolagem
  private setupInput() {
    const cam = this.cameras.main;
    this.input.on('pointerdown', (p: Phaser.Input.Pointer) => {
      this.dragging = false;
      this.dragStartY = p.y;
      this.dragStartScroll = cam.scrollY;
    });
    this.input.on('pointermove', (p: Phaser.Input.Pointer) => {
      if (!p.isDown || this.popupOpen) return;
      const dy = p.y - this.dragStartY;
      if (!this.dragging && Math.abs(dy) > DRAG_THRESHOLD) this.dragging = true;
      // Conteúdo segue o dedo: arrastar para baixo revela os andares de cima.
      if (this.dragging) cam.scrollY = this.clampScroll(this.dragStartScroll - dy);
    });
    // Roda do mouse (testes no desktop).
    this.input.on('wheel', (_p: unknown, _o: unknown, _dx: number, dy: number) => {
      if (this.popupOpen) return;
      cam.scrollY = this.clampScroll(cam.scrollY + dy * 0.8);
    });
  }

  private clampScroll(y: number) {
    return Phaser.Math.Clamp(y, this.minScroll, 0);
  }

  /** Limite superior da câmera: topo do último andar (ou do bloqueado) livre da HUD. */
  private updateScrollBounds() {
    const topSlot = this.model.state.floors.length - (this.locked ? 0 : 1);
    const topY = floorBottom(topSlot) - FLOOR.h * S;
    this.minScroll = Math.min(0, topY - HUD_TOP_H);
    const cam = this.cameras.main;
    cam.scrollY = this.clampScroll(cam.scrollY);
  }

  // ======================================================================= Ciclo de vida
  private setupLifecycle() {
    // Aba/app em segundo plano: grava o instante; ao voltar credita os clientes do período
    // (mesma regra/limite do offline). Implementa BALANCE.autosaveOnHide.
    const onHidden = () => this.model.suspend();
    const onVisible = () => {
      const r = this.model.resume();
      if (r) this.showOfflinePopup(r);
      this.refreshHud();
    };
    const onPageHide = () => this.model.persist();
    this.game.events.on(Phaser.Core.Events.HIDDEN, onHidden);
    this.game.events.on(Phaser.Core.Events.VISIBLE, onVisible);
    window.addEventListener('pagehide', onPageHide);
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.game.events.off(Phaser.Core.Events.HIDDEN, onHidden);
      this.game.events.off(Phaser.Core.Events.VISIBLE, onVisible);
      window.removeEventListener('pagehide', onPageHide);
    });
  }

  private showOfflinePopup(r: OfflineReport) {
    // Já aberto (saiu de novo antes de coletar): soma ao relatório exibido.
    if (this.popup) {
      const p = this.popup;
      p.report = {
        seconds: p.report.seconds + r.seconds,
        customers: p.report.customers + r.customers,
        gain: add(p.report.gain, r.gain),
        capped: p.report.capped || r.capped,
      };
      this.hudHold = this.hudHold ? add(this.hudHold, r.gain) : r.gain;
      this.fillPopup();
      return;
    }
    this.popupOpen = true;
    this.hudHold = r.gain;
    const cx = GAME_W / 2;
    const cy = GAME_H / 2;
    const D = DEPTH.popup;
    const objs: Phaser.GameObjects.GameObject[] = [];
    const keep = <T extends Phaser.GameObjects.GameObject>(o: T): T => {
      (o as unknown as { setScrollFactor: (v: number) => void }).setScrollFactor(0);
      objs.push(o);
      return o;
    };

    keep(this.add.rectangle(cx, cy, GAME_W, GAME_H, 0x000000, 0.6).setDepth(D).setInteractive()); // bloqueia cliques
    const box = keep(this.add.image(cx, cy + 20, 'ui_PopUp_Box').setScale(0.56).setDepth(D + 1));
    const top = box.y - box.displayHeight / 2;

    keep(
      txt(this, cx, top + 172, 'BEM-VINDO DE VOLTA!', { fontFamily: F_TITLE, fontSize: '38px', color: '#7a3b0c' })
        .setOrigin(0.5)
        .setDepth(D + 2),
    );
    const body = keep(
      txt(this, cx, top + 280, '', {
        fontFamily: F_BODY,
        fontSize: '29px',
        color: '#5a2d0c',
        align: 'center',
        lineSpacing: 4,
      })
        .setOrigin(0.5)
        .setDepth(D + 2),
    );
    const coin = keep(this.add.image(0, top + 392, 'ui_CoinIcon').setDepth(D + 2));
    const gain = keep(
      txt(this, 0, top + 392, '', {
        fontFamily: F_TITLE,
        fontSize: '56px',
        color: '#1f8a3a',
        stroke: '#ffffff',
        strokeThickness: 6,
      })
        .setOrigin(0, 0.5)
        .setDepth(D + 2),
    );
    const note = keep(
      txt(this, cx, top + 472, '', { fontFamily: F_BODY, fontSize: '21px', color: '#8a5a3c', align: 'center' })
        .setOrigin(0.5)
        .setDepth(D + 2),
    );
    this.popup = { report: r, body, gain, note, coin };
    this.fillPopup();

    const close = () => {
      const from = { x: coin.x, y: coin.y };
      objs.forEach((o) => o.destroy());
      this.popup = undefined;
      this.popupOpen = false;
      this.collectBurst(from.x, from.y);
    };
    const btn = this.makeButton(cx, top + 585, 'ui_Btn_Green', 'ui_Btn_Green', 0.95, close);
    btn.root.add(
      txt(this, 0, 0, 'COLETAR', {
        fontFamily: F_TITLE,
        fontSize: '32px',
        color: '#ffffff',
        stroke: '#14532d',
        strokeThickness: 6,
      }).setOrigin(0.5),
    );
    btn.root.setDepth(D + 3).setScrollFactor(0, 0, true);
    objs.push(btn.root);
  }

  private fillPopup() {
    if (!this.popup) return;
    const { report: r, body, gain, note, coin } = this.popup;
    body.setText(
      `Enquanto você esteve fora (${fmtDuration(r.seconds)}),\n` +
        `o drive-thru atendeu ${r.customers.toLocaleString('pt-BR')}\nclientes, que pagaram:`,
    );
    gain.setText('+' + fmt(r.gain));
    // centraliza o conjunto moeda + valor
    const w = coin.displayWidth + 10 + gain.width;
    coin.x = GAME_W / 2 - w / 2 + coin.displayWidth / 2;
    gain.x = coin.x + coin.displayWidth / 2 + 10;
    const pct = Math.round(B.offlineEfficiency * 100);
    const cap = B.offlineCapSeconds / 3600;
    note.setText(
      r.capped
        ? `Ritmo fora do jogo: ${pct}% · limite de ${cap}h atingido`
        : `Ritmo fora do jogo: ${pct}% do normal (limite ${cap}h)`,
    );
  }

  /** "Coletar": moedas voam do popup até o contador, que então mostra o valor completo. */
  private collectBurst(x: number, y: number) {
    const n = 7;
    for (let i = 0; i < n; i++) {
      const c = this.add
        .image(x + Phaser.Math.Between(-30, 30), y + Phaser.Math.Between(-20, 20), 'ui_CoinIcon')
        .setScale(0.7)
        .setScrollFactor(0)
        .setDepth(DEPTH.hud + 5);
      this.tweens.add({
        targets: c,
        x: this.hudCoin.x,
        y: this.hudCoin.y,
        scale: 0.4,
        delay: i * 60,
        duration: 650,
        ease: 'Cubic.easeIn',
        onComplete: () => {
          c.destroy();
          if (i === n - 1) {
            this.hudHold = null;
            this.refreshHud();
            this.tweens.add({ targets: this.moneyText, scale: 1.18, duration: 110, yoyo: true });
          }
        },
      });
    }
  }

  // ======================================================================= Loop
  update(_t: number, deltaMs: number) {
    // Em segundo plano o tempo é contado pelo resume() (offline); não simula clientes aqui.
    if (this.model.isSuspended()) return;
    const dt = Math.min(deltaMs / 1000, 0.25);
    for (const car of this.drive.update(dt, this.model.serviceSeconds())) {
      this.onSale(car, this.model.sell()); // ÚNICA entrada de dinheiro no jogo ativo
    }
    this.syncCars();

    this.hudTimer += deltaMs;
    if (this.hudTimer > 200) {
      this.hudTimer = 0;
      this.refreshHud();
    }
    this.saveTimer += deltaMs;
    if (this.saveTimer > B.saveIntervalMs) {
      this.saveTimer = 0;
      this.model.persist();
    }
  }
}

// ----------------------------------------------------------------------- utilitários de texto
function fmtDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  if (m < 60) return `${Math.max(1, m)} min`;
  const h = Math.floor(m / 60);
  const mm = m % 60;
  return mm ? `${h}h ${mm}min` : `${h}h`;
}
