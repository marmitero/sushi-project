/**
 * Layout da cena da torre — TODAS as posições derivam de medições em pixels nativos da arte
 * do kit (sprites/Png). Cada constante indica de onde veio. Auditoria: docs/PROJECT_AUDIT.md §9.
 *
 * Coordenadas do MUNDO: x ∈ [0, 720]; y cresce para baixo; o topo da imagem de fundo está em
 * y = 0 e a rua/calçada ficam perto de y ≈ 1000–1120. A câmera rola verticalmente (scrollY ≤ 0
 * revela os andares altos). Elementos de HUD usam scrollFactor 0.
 */

/** Resolução lógica (retrato, 9:16). */
export const GAME_W = 720;
export const GAME_H = 1280;

/**
 * Escala ÚNICA da arte do prédio (andares e caixa), personagens e carros.
 * Medição: o poço do elevador tem 184 px de largura tanto no andar (x 136–320) quanto no caixa
 * (x 122–306), e o chef (120 px) cabe na sala do andar (piso y≈297, teto y≈126) na mesma escala.
 * Ou seja: tudo foi desenhado na mesma escala no kit. 0.62 → andar com 655 px de largura.
 */
export const S = 0.62;

// ---------------------------------------------------------------------------------------------
// Fundo: Png/Backgrounds/Backgrounds.png (1904×3118). Escala para cobrir a altura da tela.
// ---------------------------------------------------------------------------------------------
export const BG = {
  w: 1904,
  h: 3118,
  scale: GAME_H / 3118,
  /** Cor do topo do céu (pixel 0,0) — continua acima da imagem quando a câmera sobe. */
  skyColor: 0x27aae1,
  /** Faixas medidas numa coluna da imagem (px nativos). */
  rows: {
    sidewalkTop: 2446, // borda superior da calçada
    sidewalkTiles: 2474, // ladrilhos
    curb: 2533, // meio-fio
    roadTop: 2575, // asfalto começa
    laneDash: 2659, // faixa tracejada (centro)
    roadBottom: 2717, // asfalto termina
    grass: 2718,
    dirt: 2740, // terra até o fim da imagem
  },
} as const;

/** y do mundo para uma linha (px nativos) da imagem de fundo. */
export const bgY = (row: number) => row * BG.scale;

/** Base do prédio: sobre os ladrilhos da calçada (entre 2474 e 2533). */
export const GROUND_Y = bgY(2518);

/** Linha inferior dos carros (rodas + sombra) na faixa de cima da rua, junto à calçada. */
export const LANE_Y = bgY(2652);

// ---------------------------------------------------------------------------------------------
// Andar: Png/Floors/Floor_LvN.png (1056×341; Lv0 = 1056×340 "ADD NEW FLOOR").
// ---------------------------------------------------------------------------------------------
export const FLOOR = {
  w: 1056,
  h: 341,
  /** Passo vertical do empilhamento (2–3 px de sobreposição p/ esconder bordas antisserrilhadas). */
  pitch: 338,
  /** Piso de tábuas da sala (y 289–300) — onde ficam os pés. */
  floorLine: 297,
  /** Centro do poço do elevador (x 136–320). */
  shaftX: 228,
  /** Placa vazia do telhado (x 342–593, y 39–98) → nome/nível do andar. */
  plate: { x: 467, y: 68 },
  /** Botão de upgrade sobre o telhado, à direita da placa. */
  upgrade: { x: 790, y: 68 },
  /** Balcão à esquerda da sala (x 330–415, topo y≈251) → garçonete atrás dele. */
  counter: { x: 372, top: 251 },
  /** Fogão à direita (x 755–815) → chef de costas cozinhando. */
  stoveX: 785,
  /** Ponto onde o chef entrega o pedido (à direita do balcão). */
  handoffX: 470,
  /** Texto "ADD NEW FLOOR" do letreiro do Lv0 (x≈640–816, y 175–229): coberto pelo botão PT-BR. */
  lockedBanner: { x: 728, y: 202 },
} as const;

// ---------------------------------------------------------------------------------------------
// Caixa (térreo / drive-thru): Png/Cashiers/CashierLN.png (1040×412).
// ---------------------------------------------------------------------------------------------
export const CASHIER = {
  w: 1040,
  h: 412,
  /** O poço do elevador começa em y=32 no caixa: o 1º andar encaixa ali (não no topo da imagem). */
  shaftTop: 32,
  /** Poço no caixa em x=122 vs. x=136 no andar → caixa desloca 14 px nativos para a direita. */
  shaftDx: 136 - 122,
  /** Janela "CASHIER": moldura x 171–291 / y 252–360, vidro até y≈351. */
  window: { x: 231, bottom: 352 },
} as const;

// ---------------------------------------------------------------------------------------------
// Carros (clientes do drive-thru): Png/Cars/CarN/{Idle,Move} (~236×167). Arte virada p/ ESQUERDA.
// ---------------------------------------------------------------------------------------------
export const CAR = {
  w: 236,
  /** Janela do motorista fica a ~32% da largura a partir da frente (lado esquerdo). */
  windowFrac: 0.32,
  speed: 300,
  /** Distância entre centros na fila (carro mais largo ≈ 243 px × S ≈ 151 + folga). */
  gap: 175,
  maxCars: 4,
} as const;

// ---------------------------------------------------------------------------------------------
// Derivados (coordenadas do mundo).
// ---------------------------------------------------------------------------------------------
export const TOWER_X = GAME_W / 2;
/** Borda esquerda da arte dos andares. */
export const FLOOR_LEFT = TOWER_X - (FLOOR.w / 2) * S;
/** x do mundo para um x nativo da arte do andar. */
export const floorX = (nativeX: number) => FLOOR_LEFT + nativeX * S;

export const CASHIER_LEFT = FLOOR_LEFT + CASHIER.shaftDx * S;
export const CASHIER_X = CASHIER_LEFT + (CASHIER.w / 2) * S;
export const CASHIER_TOP = GROUND_Y - CASHIER.h * S;
export const CASHIER_WINDOW_X = CASHIER_LEFT + CASHIER.window.x * S;
export const CASHIER_WINDOW_BOTTOM = CASHIER_TOP + CASHIER.window.bottom * S;

/** Base (y do mundo) do andar `slot` (0 = 1º andar acima do térreo). */
export const floorBottom = (slot: number) => CASHIER_TOP + CASHIER.shaftTop * S + 1 - slot * FLOOR.pitch * S;
/** y do mundo para um y nativo da arte do andar `slot`. */
export const floorY = (slot: number, nativeY: number) => floorBottom(slot) - (FLOOR.h - nativeY) * S;

/** x do centro do carro quando a janela do motorista está alinhada ao guichê. */
export const CAR_WINDOW_X = CASHIER_WINDOW_X + (0.5 - CAR.windowFrac) * CAR.w * S;

/** Altura reservada pela HUD superior (a câmera não esconde o topo da torre sob ela). */
export const HUD_TOP_H = 150;
