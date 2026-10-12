# Economia e Balanceamento (MVP)

Implementação de referência: `src/core/balance.ts`, `src/core/economy.ts`, `src/core/big.ts`.
Todos os valores abaixo **existem no código** (não são aspiracionais).

## 1. Representação numérica

Moeda = `Big {m,e}` (mantissa+expoente decimal). Nunca `Number` p/ valores econômicos grandes. Formatação `fmt()` → `1.50K`, `2.50M`, `200Qi`…

## 2. Receita

`incomePerSec = cashierMult[cashierLevel-1] * Σ floorIncome(slot)`

`floorIncome(slot) = floorBaseIncome * (slot+1)^floorPosExp * floorLevelMult^(level-1)`

Parâmetros (MVP): `floorBaseIncome=1`, `floorPosExp=1.15`, `floorLevelMult=1.35`.
`cashierMult = [1, 1.5, 2.2, 3.2, 4.6, 6.5]` (nível 1..6) — **multiplicativo global**.
Bônus de andar (nível/posição) são **aditivos dentro do andar** e multiplicativos entre si via fórmula acima. O caixa multiplica o total. Nenhum bônus é aplicado duas vezes.

## 3. Custos

- Desbloquear próximo andar: `unlockBase * unlockGrowth^(nº andares)` = `25 * 1.9^n`.
- Upgrade de andar (L→L+1): `floorUpgBase * floorUpgGrowth^(L-1) * (slot+1)` = `12 * 1.6^(L-1) * (slot+1)`.
- Upgrade de caixa: `cashierUpgBase * cashierUpgGrowth^(L-1)` = `60 * 3.1^(L-1)`.

Limites: `floorMaxLevel=10`, `cashierMaxLevel=6`, `maxFloors=10` (MVP; expansão depois reusa variantes).

## 4. Atomicidade e integridade

Toda compra: verifica saldo (`gte`) e aplica débito+efeito **juntos** (funções puras retornam `{state, ok}`). Sem saldo → nenhuma mutação. Testado (`tests/core.test.ts`).

## 5. Ritmo de progressão (intenção)

- Início `startMoney=15` permite o 1º upgrade de andar em ~10–20s.
- Curvas exponenciais alternam alvos baratos (upgrade de andar) e caros (novo andar / caixa), evitando beco sem ação útil.
- Balanceamento fino será ajustado com simulações (FASE 10) — premissas documentadas aqui.

## 6. Ganhos offline

`gain = incomePerSec * min(elapsed, offlineCapSeconds) * offlineEfficiency`
`offlineCapSeconds=7200`, `offlineEfficiency=0.5`. `lastSaved` avança ao aplicar → **sem double-grant** em reload. Tempo negativo → 0. Testado.

## 7. O que NÃO monetiza no MVP

Nenhuma moeda premium; boosts/anúncios só a partir da FASE 7/9 com adaptadores reais (ver MONETIZATION.md).
