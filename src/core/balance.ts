/**
 * Balanceamento centralizado (docs/GAME_DESIGN/ECONOMY.md).
 * Todos os valores econômicos do MVP vivem aqui — nada espalhado.
 */
export const BALANCE = {
  // Dinheiro inicial do jogador.
  startMoney: 15,

  // ---- ANDARES ----
  // Receita-base por segundo de um andar no nível 1 (slot índice 0 = 1º andar acima do térreo).
  floorBaseIncome: 1,
  // Multiplicador de receita por nível do andar: income *= levelMult^(L-1).
  floorLevelMult: 1.35,
  // Multiplicador positional: andares mais altos rendem mais (índice+1)^posExp.
  floorPosExp: 1.15,
  // Custo para melhorar um andar de nível L para L+1: upgBase * upgGrowth^(L-1) * (slot+1).
  floorUpgBase: 12,
  floorUpgGrowth: 1.6,
  floorMaxLevel: 10, // = Lv10 (arte vai até Lv10)

  // Custo para desbloquear o próximo andar: unlockBase * unlockGrowth^(nº já desbloqueados).
  unlockBase: 25,
  unlockGrowth: 1.9,
  maxFloors: 10, // andares superiores visíveis no MVP (arte sustenta 10 níveis)

  // ---- CAIXA (térreo) ----
  // Multiplicador global aplicado à receita total por nível de caixa (1..6).
  cashierMult: [1, 1.5, 2.2, 3.2, 4.6, 6.5], // índice = nível-1
  cashierUpgBase: 60,
  cashierUpgGrowth: 3.1,
  cashierMaxLevel: 6,

  // ---- OFFLINE ----
  offlineCapSeconds: 2 * 3600, // limite inicial de 2h
  offlineEfficiency: 0.5, // offline rende 50% da receita ativa

  // ---- SAVE ----
  saveKey: 'sushiventure.save.v1',
  saveIntervalMs: 3000,
  autosaveOnHide: true,
} as const;

export type Balance = typeof BALANCE;
