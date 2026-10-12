import Phaser from 'phaser';

export interface AssetManifest {
  fps: number;
  animations: Record<string, string[]>;
  cars: Record<string, { idle: string[]; move: string[] }>;
  static: Record<string, string>;
  ui: Record<string, string>;
}

export class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    // Barra de progresso simples (desenhada, sem asset externo).
    const bar = this.add.graphics();
    const label = this.add
      .text(360, 600, 'Carregando Sushiventure…', {
        fontFamily: '"Lilita One", sans-serif',
        fontSize: '28px',
        color: '#ffffff',
      })
      .setOrigin(0.5);
    this.load.on('progress', (p: number) => {
      bar.clear();
      bar.fillStyle(0x000000, 0.5).fillRect(110, 640, 500, 24);
      bar.fillStyle(0xffb347, 1).fillRect(114, 644, 492 * p, 16);
    });

    // 1) baixa o manifest gerado por scripts/prepare-assets.mjs
    this.load.json('manifest', 'assets/manifest.json');
    this.load.once('complete', () => this.queueFromManifest());
  }

  private queued = false;
  private queueFromManifest() {
    if (this.queued) return;
    this.queued = true;
    const m = this.cache.json.get('manifest') as AssetManifest;
    (this.game.registry as any).set('manifest', m);

    const seen = new Set<string>();
    const img = (key: string, url: string) => {
      if (seen.has(url)) return;
      seen.add(url);
      this.load.image(key, url);
    };

    Object.values(m.animations).forEach((arr) => arr.forEach((u) => img(u, u)));
    Object.values(m.cars).forEach((c) => {
      c.idle.forEach((u) => img(u, u));
      c.move.forEach((u) => img(u, u));
    });
    Object.entries(m.static).forEach(([k, u]) => img('st_' + k, u));
    Object.entries(m.ui).forEach(([k, u]) => img('ui_' + k, u));

    this.load.start();
  }

  create() {
    // Cria as animações globais a partir do manifest.
    const m = this.cache.json.get('manifest') as AssetManifest;
    const fps = m.fps || 30;
    const mk = (key: string, urls: string[]) => {
      if (this.anims.exists(key)) return;
      this.anims.create({
        key,
        frames: urls.map((u) => ({ key: u })),
        frameRate: fps,
        repeat: -1,
      });
    };
    mk('cashierGirl', m.animations.cashierGirl);
    mk('chefCooking', m.animations.chefCooking);
    mk('chefWalk', m.animations.chefWalk);
    mk('chefWalkFull', m.animations.chefWalkFull);
    mk('floorGirl', m.animations.floorGirl);
    mk('liftGuy', m.animations.liftGuy);
    Object.entries(m.cars).forEach(([k, c]) => {
      mk('car_' + k + '_idle', c.idle);
      mk('car_' + k + '_move', c.move);
    });

    this.scene.start('Tower');
  }
}
