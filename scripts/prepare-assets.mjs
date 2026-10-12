// Copia os PNGs necessários de sprites/Png para public/assets e gera um
// manifest JSON usado pelo BootScene para carregar tudo sem placeholders.
// Os arquivos originais em sprites/ NUNCA são modificados.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(root, 'sprites', 'Png');
const OUT = path.join(root, 'public', 'assets');

const FPS = 30; // Derivado da duração das animações Spine (ex.: 20 frames / 0.667s ≈ 30fps).

function ensureDir(d) {
  fs.mkdirSync(d, { recursive: true });
}

function copyTree(src, dest, rel = '') {
  ensureDir(dest);
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    const r = path.posix.join(rel, entry.name);
    if (entry.isDirectory()) copyTree(s, d, r);
    else if (entry.name.toLowerCase().endsWith('.png')) fs.copyFileSync(s, d);
  }
}

function listPng(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.toLowerCase().endsWith('.png'))
    .sort();
}

function seq(dir, prefix, count) {
  const out = [];
  for (let i = 0; i < count; i++) {
    const name = `${prefix}_${String(i).padStart(2, '0')}.png`;
    out.push(`assets/${dir}/${name}`);
  }
  return out;
}

ensureDir(OUT);
copyTree(SRC, OUT);

const manifest = {
  fps: FPS,
  animations: {
    cashierGirl: seq('Cashier%20Girl', 'ChashierGirl-animation', 40),
    chefCooking: seq('Chef%20Guy/Cooking', 'ChefGuy-Cooking', 20),
    chefWalk: seq('Chef%20Guy/Walk', 'ChefGuy-Walk', 20),
    chefWalkFull: seq('Chef%20Guy/Walk%20Full%20Order', 'ChefGuy-Walk Full Order', 20),
    floorGirl: seq('Floor%20Girl', 'FloorGirl-animation', 20),
    liftGuy: seq('Lift%20Guy', 'Lift Guy-animation', 20),
  },
  cars: {},
  static: {},
};

// Carros: Idle (20) e Move (40) por variante 1..5.
for (let c = 1; c <= 5; c++) {
  manifest.cars[`car${c}`] = {
    idle: seq(`Cars/Car${c}/Idle`, `Cars-Car${c}_Idle`, 20),
    move: seq(`Cars/Car${c}/Move`, `Cars-Car${c}_Move`, 40),
  };
}

// Estáticos.
manifest.static.background = 'assets/Backgrounds/Backgrounds.png';
manifest.static.clouds = 'assets/Backgrounds/Clouds.png';
for (let lv = 0; lv <= 10; lv++) manifest.static[`floor${lv}`] = `assets/Floors/Floor_Lv${lv}.png`;
for (let l = 1; l <= 6; l++) manifest.static[`cashier${l}`] = `assets/Cashiers/CashierL${l}.png`;
manifest.static.mapArea = 'assets/Open%20Area%20Map/Area.png';
manifest.static.mapAvailable = 'assets/Open%20Area%20Map/Available Building.png';
manifest.static.mapLocked = 'assets/Open%20Area%20Map/Locked Building.png';
manifest.static.mapLock = 'assets/Open%20Area%20Map/Lock.png';
manifest.static.mapNamePlate = 'assets/Open%20Area%20Map/NamePlate.png';
manifest.static.mapClouds = 'assets/Open%20Area%20Map/Clouds.png';

// UI: copia nomes com espaço já URL-encoded no caminho acima; mapeia por nome legível.
const uiDir = path.join(OUT, 'Ui and PopUp');
const ui = {};
for (const f of listPng(uiDir)) {
  const key = f.replace(/\.png$/, '');
  ui[key] = `assets/Ui%20and%20PopUp/${encodeURIComponent(f)}`;
}
manifest.ui = ui;

fs.writeFileSync(path.join(OUT, 'manifest.json'), JSON.stringify(manifest, null, 2));

// Validação: nenhum arquivo referenciado pode estar ausente.
const missing = [];
function check(url) {
  const rel = decodeURIComponent(url.replace(/^assets\//, ''));
  const abs = path.join(OUT, rel);
  if (!fs.existsSync(abs)) missing.push(url);
}
Object.values(manifest.animations).forEach((arr) => arr.forEach(check));
Object.values(manifest.cars).forEach((v) => {
  v.idle.forEach(check);
  v.move.forEach(check);
});
Object.values(manifest.static).forEach(check);
Object.values(manifest.ui).forEach(check);

if (missing.length) {
  console.error(`[prepare-assets] ARQUIVOS AUSENTES (${missing.length}):`);
  missing.slice(0, 20).forEach((m) => console.error('  -', m));
  process.exit(1);
}

const total =
  Object.values(manifest.animations).reduce((a, x) => a + x.length, 0) +
  Object.values(manifest.cars).reduce((a, x) => a + x.idle.length + x.move.length, 0) +
  Object.keys(manifest.static).length +
  Object.keys(manifest.ui).length;
console.log(`[prepare-assets] OK — ${total} assets referenciados, 0 ausentes.`);
