import Phaser from 'phaser';
import { BootScene } from './game/BootScene';
import { TowerScene } from './game/TowerScene';

async function start() {
  // Garante que as fontes do kit (Google Fonts) estejam prontas antes do primeiro draw.
  try {
    await (document as any).fonts?.ready;
  } catch {
    /* segue sem fontes */
  }

  const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    parent: 'game',
    backgroundColor: '#0e2a3f',
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: 720,
      height: 1280,
    },
    scene: [BootScene, TowerScene],
  };

  new Phaser.Game(config);
}

start();
