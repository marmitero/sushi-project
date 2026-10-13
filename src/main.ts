import Phaser from 'phaser';
// Fontes recomendadas pelo kit (sprites/FontLink.txt), empacotadas localmente (OFL-1.1).
import '@fontsource/lilita-one/400.css';
import '@fontsource/passion-one/400.css';
import '@fontsource/bebas-neue/400.css';
import { BootScene } from './game/BootScene';
import { TowerScene } from './game/TowerScene';
import { GAME_W, GAME_H } from './game/layout';

/**
 * Fontes declaradas via @font-face só são baixadas quando usadas. O canvas do Phaser não
 * "usa" fontes do ponto de vista do navegador, então pedimos o carregamento explícito antes
 * do primeiro texto — senão os rótulos nascem com a fonte reserva e não se corrigem sozinhos.
 */
async function loadFonts(timeoutMs = 4000) {
  const fonts = (document as Document & { fonts?: FontFaceSet }).fonts;
  if (!fonts) return;
  const families = ['Lilita One', 'Passion One', 'Bebas Neue'];
  const sample = 'Sushi Tower ÁÉÍÓÚ ãõç $0123456789';
  const all = Promise.all(families.map((f) => fonts.load(`32px "${f}"`, sample))).catch(() => undefined);
  await Promise.race([all, new Promise((r) => setTimeout(r, timeoutMs))]);
}

async function start() {
  await loadFonts();

  const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    parent: 'game',
    backgroundColor: '#27aae1', // cor do topo do céu do fundo do kit (continua acima da imagem)
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: GAME_W,
      height: GAME_H,
    },
    scene: [BootScene, TowerScene],
  };

  const game = new Phaser.Game(config);
  // Gancho SÓ de desenvolvimento (removido do build de produção pelo Vite) p/ verificação automatizada.
  if (import.meta.env.DEV) (window as unknown as { __game?: Phaser.Game }).__game = game;
}

start();
