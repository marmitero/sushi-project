import Phaser from 'phaser';
import MANIFEST from '../generated/manifest.json';

export interface AssetManifest {
  fps: number;
  animations: Record<string, string[]>;
  cars: Record<string, { idle: string[]; move: string[] }>;
  static: Record<string, string>;
  ui: Record<string, string>;
}

export const ASSETS = MANIFEST as AssetManifest;

export class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    const bar = this.add.graphics();
    this.add
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

    const m = ASSETS;
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
  }

  create() {
    const m = ASSETS;
    const fps = m.fps || 30;
    const mk = (key: string, urls: string[]) => {
      if (this.anims.exists(key) || urls.length === 0) return;
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
