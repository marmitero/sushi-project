# Economia e Balanceamento (MVP)

Implementação de referência: `src/core/balance.ts`, `src/core/economy.ts`, `src/core/drivethru.ts`, `src/core/big.ts`.
Todos os valores abaixo **existem no código** (não são aspiracionais).

> **Mudança de 2026-10-12 (após teste manual do diretor):** o dinheiro **não sobe mais sozinho**.
> A versão anterior somava `incomePerSec × dt` a cada quadro (`tick`), sem relação com nada na tela.
> Agora a **única** entrada de dinheiro no jogo ativo é a venda a um cliente do drive-thru
> (`sellToCustomer`), disparada quando um carro paga no guichê. Ver §2.1 e PROJECT_AUDIT.md §8.

## 1. Representação numérica

Moeda = `Big {m,e}` (mantissa+expoente decimal). Nunca `Number` p/ valores econômicos grandes. Formatação `fmt()` → `1.50K`, `2.50M`, `200Qi`…
Abaixo de 1000 a exibição **trunca** (nunca arredonda para cima: a HUD não mostra mais do que o jogador tem) e absorve resíduo de ponto flutuante (`499.9999… → 500`). Testado.

## 2. Receita

Capacidade de produção da torre (por segundo, em ritmo de atendimento contínuo):

`incomePerSec = cashierMult[cashierLevel-1] * Σ floorIncome(slot)`

`floorIncome(slot) = floorBaseIncome * (slot+1)^floorPosExp * floorLevelMult^(level-1)`

Parâmetros (MVP): `floorBaseIncome=1`, `floorPosExp=1.15`, `floorLevelMult=1.35`.
`cashierMult = [1, 1.5, 2.2, 3.2, 4.6, 6.5]` (nível 1..6) — **multiplicativo global**.
Bônus de andar (nível/posição) são multiplicativos entre si via fórmula acima. O caixa multiplica o total. Nenhum bônus é aplicado duas vezes.

### 2.1 Relação econômica veículos ↔ receita (Constituição §11.2)

Os clientes são os **carros do drive-thru** (o kit não tem pedestres; o caixa traz a placa "« DRIVE THRU").

| Grandeza | Fórmula | Código |
|---|---|---|
| Tempo de atendimento por cliente | `serviceSeconds[cashierLevel-1]` = `[4.0, 3.5, 3.0, 2.6, 2.3, 2.0]` s | `serviceSeconds()` |
| Clientes por minuto (fila cheia) | `60 / serviceSeconds` | `customersPerMinute()` |
| Valor pago por cliente (ticket) | `incomePerSec × serviceSeconds` | `ticketValue()` |
| Receita média por segundo | `ticket / serviceSeconds = incomePerSec` | — |

- Cada carro que para no guichê **paga 1 ticket** → `sellToCustomer()` soma `money`, `totalEarned` e `customersServed` (+1). Sem carro no guichê, não entra dinheiro.
- **Andares** (desbloqueio/upgrade) aumentam o **ticket** (o pedido de cada cliente fica maior).
- **Caixa** aumenta o ticket (`cashierMult`) **e** a vazão (`serviceSeconds` menor → mais clientes/min).
- A HUD mostra exatamente isso: `N clientes/min × $ticket` e `Atendidos: X · ≈ $Y/s`.
- A fila é simulada em `src/core/drivethru.ts` (puro, testado): entrada à direita, avanço para a esquerda até o guichê, atendimento, pagamento, saída à esquerda; até 4 carros; com fila cheia o intervalo entre pagamentos é **exatamente** `serviceSeconds` (teste: 60 s → 14 pagamentos com 4 s; 29 com 2 s).
- Delta de quadro limitado a 0,25 s: travadas/abas lentas não geram "rajadas" de vendas.

## 3. Custos

- Desbloquear próximo andar: `unlockBase * unlockGrowth^(nº andares)` = `25 * 1.9^n`.
- Upgrade de andar (L→L+1): `floorUpgBase * floorUpgGrowth^(L-1) * (slot+1)` = `12 * 1.6^(L-1) * (slot+1)`.
- Upgrade de caixa: `cashierUpgBase * cashierUpgGrowth^(L-1)` = `60 * 3.1^(L-1)`.

Limites: `floorMaxLevel=10`, `cashierMaxLevel=6`, `maxFloors=10` (MVP; expansão depois reusa variantes).

## 4. Atomicidade e integridade

Toda compra: verifica saldo (`gte`) e aplica débito+efeito **juntos** (funções puras retornam `{state, ok}`). Sem saldo → nenhuma mutação (saldo nunca negativo). Compra recusada mostra o motivo na tela ("Faltam $X"). Botões só disparam ao **soltar** e só se não houve arraste (> 12 px) — rolar a torre não compra nada por acidente. Testado (`tests/core.test.ts`) + verificação automatizada no navegador (TESTING.md).

## 5. Ritmo de progressão (intenção)

- Início `startMoney=15` permite o 1º upgrade de andar imediatamente; o 1º cliente paga $4 (1 andar Nv1 × 4 s) cerca de 5 s após abrir o jogo.
- Curvas exponenciais alternam alvos baratos (upgrade de andar) e caros (novo andar / caixa), evitando beco sem ação útil.
- Balanceamento fino será ajustado com simulações (FASE 10) — premissas documentadas aqui.

## 6. Ganhos offline (mesma unidade: clientes)

```
elapsed   = agora − lastSaved           (s)
se elapsed < offlineMinSeconds (30 s)    → nada (sem popup)
clientes  = floor( min(elapsed, offlineCapSeconds) × offlineEfficiency / serviceSeconds )
ganho     = clientes × ticket
```

`offlineCapSeconds=7200` (2 h), `offlineEfficiency=0.5`. `lastSaved` avança ao aplicar → **sem double-grant** em reload. Tempo negativo → 0. Detalhes e casos de aba em segundo plano: OFFLINE_PROGRESS.md.

## 7. O que NÃO monetiza no MVP

Nenhuma moeda premium; boosts/anúncios só a partir da FASE 7/9 com adaptadores reais (ver MONETIZATION.md).
