import Phaser from 'phaser';
import { GameModel } from './model';
import { ASSETS, AssetManifest } from './BootScene';
import { fmt, gte } from '../core/big';
import { BALANCE as B } from '../core/balance';

const W = 720;
const H = 1280;
const FLOOR_SCALE = 0.62;
const FLOOR_H = 340 * FLOOR_SCALE;
const CASHIER_SCALE = 0.63;
const CASHIER_H = 412 * CASHIER_SCALE;
const GROUND_Y = 1105;

export class TowerScene extends Phaser.Scene {
  private model!: GameModel;
  private world!: Phaser.GameObjects.Container;
  private M!: AssetManifest;

  private moneyText!: Phaser.GameObjects.Text;
  private incomeText!: Phaser.GameObjects.Text;
  private cashierBtn!: Phaser.GameObjects.Container;
  private cashierLabel!: Phaser.GameObjects.Text;

  private hudTimer = 0;
  private saveTimer = 0;

  constructor() {
    super('Tower');
  }

  create() {
    this.M = ASSETS;
    this.model = new GameModel();

    // Fundo (espaço de tela, não rola).
    const bg = this.add.image(W / 2, H / 2, 'st_background');
    const bgScale = Math.max(W / bg.width, H / bg.height);
    bg.setScale(bgScale).setScrollFactor?.(0);

    // Nuvens em parallax lento.
    const clouds = this.add.image(W / 2, 220, 'st_clouds').setAlpha(0.9);
    this.tweens.add({
      targets: clouds,
      x: W / 2 + 60,
      duration: 9000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    // Mundo rolável (torre).
    this.world = this.add.container(0, GROUND_Y);

    // Carro de entrega na rua.
    this.spawnCar();

    this.buildTower();
    this.buildHud();
    this.setupScroll();

    // Reage a mudanças econômicas reconstruindo a torre + HUD.
    this.model.onChange(() => {
      this.buildTower();
      this.refreshHud();
    });

    // Popup de ganhos offline.
    if (this.model.offlineReport) this.showOfflinePopup(this.model.offlineReport);

    this.refreshHud();
  }

  // ---------- Construção visual ----------
  private buildTower() {
    this.world.removeAll(true);
    const s = this.model.state;

    // Térreo / caixa (storefront) com sprite do nível atual.
    const cashier = this.add
      .image(0, 0, 'st_cashier' + s.cashierLevel)
      .setOrigin(0.5, 1)
      .setScale(CASHIER_SCALE);
    this.world.add(cashier);

    // Atendente no caixa.
    const girl = this.add.sprite(-140, -30, this.M.animations.cashierGirl[0])
      .setOrigin(0.5, 1)
      .setScale(1.5);
    girl.play('cashierGirl');
    this.world.add(girl);

    // Andares superiores.
    for (let i = 0; i < s.floors.length; i++) {
      const level = s.floors[i];
      const baseY = -(CASHIER_H + i * FLOOR_H);
      const artLevel = Math.min(level, 10);
      const floor = this.add
        .image(0, baseY, 'st_floor' + artLevel)
        .setOrigin(0.5, 1)
        .setScale(FLOOR_SCALE);
      this.world.add(floor);

      // Chef cozinhando + funcionária no andar.
      const chef = this.add.sprite(-90, baseY - 18, this.M.animations.chefCooking[0])
        .setOrigin(0.5, 1)
        .setScale(1.5);
      chef.play('chefCooking');
      const fgirl = this.add.sprite(120, baseY - 18, this.M.animations.floorGirl[0])
        .setOrigin(0.5, 1)
        .setScale(1.5);
      fgirl.play('floorGirl');
      this.world.add([chef, fgirl]);

      // Botão de upgrade do andar (seta) com custo.
      this.addFloorUpgradeButton(i, baseY);
    }

    // Próximo andar bloqueado (arte Lv0) + botão de desbloqueio.
    if (this.model.canUnlock()) {
      const topY = -(CASHIER_H + s.floors.length * FLOOR_H);
      const locked = this.add
        .image(0, topY, 'st_floor0')
        .setOrigin(0.5, 1)
        .setScale(FLOOR_SCALE);
      this.world.add(locked);
      this.addUnlockButton(topY);
    }

    // Operador do elevador sobe/desce no shaft esquerdo.
    this.spawnLiftGuy();
  }

  private addFloorUpgradeButton(slot: number, baseY: number) {
    const s = this.model.state;
    const maxed = s.floors[slot] >= B.floorMaxLevel;
    const btn = this.add.container(250, baseY - 60);
    const icon = this.add.image(0, 0, 'ui_ArrowUpgrade').setScale(0.5);
    const label = this.add
      .text(0, 40, maxed ? 'MAX' : fmt(this.model.floorUpgradeCost(slot)), {
        fontFamily: '"Lilita One", sans-serif',
        fontSize: '20px',
        color: '#fff3d6',
        stroke: '#5a2d0c',
        strokeThickness: 4,
      })
      .setOrigin(0.5);
    btn.add([icon, label]);
    if (!maxed) {
      btn.setInteractive(new Phaser.Geom.Rectangle(-40, -40, 90, 110), Phaser.Geom.Rectangle.Contains);
      btn.on('pointerdown', () => {
        if (this.model.buyFloor(slot)) this.flash(btn);
      });
    }
    this.world.add(btn);
  }

  private addUnlockButton(topY: number) {
    const btn = this.add.container(0, topY - FLOOR_H / 2);
    const box = this.add.image(0, 0, 'ui_Btn_Green').setScale(0.9, 0.8);
    const label = this.add
      .text(0, 0, 'Novo andar\n' + fmt(this.model.unlockCost()), {
        fontFamily: '"Lilita One", sans-serif',
        fontSize: '24px',
        color: '#ffffff',
        stroke: '#14532d',
        strokeThickness: 4,
        align: 'center',
      })
      .setOrigin(0.5);
    btn.add([box, label]);
    btn.setInteractive(new Phaser.Geom.Rectangle(-160, -50, 320, 100), Phaser.Geom.Rectangle.Contains);
    btn.on('pointerdown', () => {
      if (this.model.buyUnlock()) this.flash(btn);
    });
    this.world.add(btn);
  }

  private spawnLiftGuy() {
    const guy = this.add.sprite(-250, -CASHIER_H, this.M.animations.liftGuy[0])
      .setOrigin(0.5, 1)
      .setScale(1.4);
    guy.play('liftGuy');
    this.world.add(guy);
    const top = -(CASHIER_H + Math.max(1, this.model.state.floors.length) * FLOOR_H);
    this.tweens.add({
      targets: guy,
      y: top + 40,
      duration: 4000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });
  }

  private spawnCar() {
    const car = this.add.sprite(-120, 1180, this.M.cars.car1.move[0]).setOrigin(0.5, 1).setScale(0.8);
    car.play('car_car1_move');
    this.tweens.add({
      targets: car,
      x: W + 120,
      duration: 12000,
      repeat: -1,
      onRepeat: () => car.setX(-120),
    });
  }

  // ---------- HUD ----------
  private buildHud() {
    const top = this.add.container(0, 0).setDepth(100);
    const coin = this.add.image(40, 44, 'ui_CoinIcon').setScale(0.6);
    this.moneyText = this.add.text(76, 44, '0', {
      fontFamily: '"Lilita One", sans-serif',
      fontSize: '36px',
      color: '#ffe08a',
      stroke: '#4a2c0a',
      strokeThickness: 6,
    }).setOrigin(0, 0.5);
    this.incomeText = this.add.text(24, 84, '', {
      fontFamily: '"Passion One", sans-serif',
      fontSize: '24px',
      color: '#bfe8ff',
      stroke: '#0e2a3f',
      strokeThickness: 4,
    });
    top.add([coin, this.moneyText, this.incomeText]);

    // Botão de upgrade do caixa (fixo, canto inferior direito).
    this.cashierBtn = this.add.container(W - 110, H - 90).setDepth(100);
    const cbox = this.add.image(0, 0, 'ui_Btn_Orange').setScale(0.9);
    this.cashierLabel = this.add.text(0, 0, '', {
      fontFamily: '"Lilita One", sans-serif',
      fontSize: '20px',
      color: '#ffffff',
      stroke: '#7c2d12',
      strokeThickness: 4,
      align: 'center',
    }).setOrigin(0.5);
    this.cashierBtn.add([cbox, this.cashierLabel]);
    this.cashierBtn.setInteractive(new Phaser.Geom.Rectangle(-150, -40, 300, 80), Phaser.Geom.Rectangle.Contains);
    this.cashierBtn.on('pointerdown', () => {
      if (this.model.buyCashier()) this.flash(this.cashierBtn);
    });
  }

  private refreshHud() {
    const s = this.model.state;
    this.moneyText.setText(fmt(s.money));
    this.incomeText.setText('+' + fmt(this.model.incomePerSec()) + '/s');
    this.cashierLabel.setText(
      this.model.canCashier() ? 'Caixa L' + (s.cashierLevel + 1) + '\n' + fmt(this.model.cashierUpgradeCost()) : 'Caixa MAX',
    );
  }

  // ---------- Interação ----------
  private setupScroll() {
    let dragging = false;
    let lastY = 0;
    this.input.on('pointerdown', (p: Phaser.Input.Pointer) => {
      dragging = true;
      lastY = p.y;
    });
    this.input.on('pointerup', () => (dragging = false));
    this.input.on('pointermove', (p: Phaser.Input.Pointer) => {
      if (!dragging) return;
      const dy = p.y - lastY;
      lastY = p.y;
      // arrastar p/ baixo revela andares altos; p/ cima volta ao térreo.
      this.world.y = Phaser.Math.Clamp(this.world.y + dy, GROUND_Y, this.maxWorldY());
    });
  }

  private maxWorldY(): number {
    const towerH = CASHIER_H + this.model.state.floors.length * FLOOR_H + FLOOR_H;
    const topMargin = 150;
    return Math.max(GROUND_Y, topMargin + towerH);
  }

  private flash(obj: Phaser.GameObjects.Container) {
    this.tweens.add({ targets: obj, scaleX: 1.12, scaleY: 1.12, duration: 90, yoyo: true });
  }

  private showOfflinePopup(r: { seconds: number; capped: boolean; gain: any }) {
    const overlay = this.add.rectangle(W / 2, H / 2, W, H, 0x000000, 0.6).setDepth(200);
    const box = this.add.image(W / 2, H / 2, 'ui_PopUp_Box').setScale(1).setDepth(201);
    const mins = Math.floor(r.seconds / 60);
    const txt = this.add
      .text(W / 2, H / 2 - 40, `Enquanto você esteve fora\n(${mins} min) seu restaurante rendeu:`, {
        fontFamily: '"Lilita One", sans-serif',
        fontSize: '26px',
        color: '#5a2d0c',
        align: 'center',
      })
      .setOrigin(0.5)
      .setDepth(202);
    const gain = this.add
      .text(W / 2, H / 2 + 40, '+' + fmt(r.gain), {
        fontFamily: '"Lilita One", sans-serif',
        fontSize: '44px',
        color: '#15803d',
        stroke: '#ffffff',
        strokeThickness: 4,
      })
      .setOrigin(0.5)
      .setDepth(202);
    const close = this.add.image(W / 2, H / 2 + 140, 'ui_Btn_Green').setScale(0.8).setDepth(202).setInteractive();
    const closeTxt = this.add.text(W / 2, H / 2 + 140, 'Coletar', {
      fontFamily: '"Lilita One", sans-serif',
      fontSize: '26px',
      color: '#fff',
    }).setOrigin(0.5).setDepth(203);
    const dismiss = () => [overlay, box, txt, gain, close, closeTxt].forEach((o) => o.destroy());
    close.on('pointerdown', dismiss);
  }

  // ---------- Loop ----------
  update(_t: number, dt: number) {
    this.model.update(dt / 1000);
    this.hudTimer += dt;
    if (this.hudTimer > 150) {
      this.hudTimer = 0;
      this.refreshHud();
    }
    this.saveTimer += dt;
    if (this.saveTimer > B.saveIntervalMs) {
      this.saveTimer = 0;
      this.model.persist();
    }
  }
}
