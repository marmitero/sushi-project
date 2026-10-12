# Andares, Caixa e Funcionários

## Andares superiores

- Catálogo de config: nível 1..10 mapeado a `Floor_Lv1..10.png`; estado trancado = `Floor_Lv0.png`.
- Cada slot tem: `id(slot)`, `level`, `asset`, `custoUpgrade`, `receitaBase` (fórmula em ECONOMY.md), `posição` (empilhado Y), `estado`.
- Desbloqueio cria slot nível 1; operação atômica; atualiza economia+visual+HUD+save.
- Upgrade troca o sprite (fade/scale) e recalcula receita.

## Caixa (térreo)

- Níveis 1..6 → `CashierL1..6.png` (incluem logo). Multiplicador global `cashierMult`.
- Não é um "botão de dinheiro": é o ponto de venda visual que escala com o nível.

## Funcionários

Papéis confirmados na auditoria (visuais reais do kit):
- **Cashier Girl** — atendente no caixa (anima 40f).
- **Chef Guy** — cozinha (`Cooking`) e entrega (`Walk`/`Walk Full Order`).
- **Floor Girl** — opera estação do andar.
- **Lift Guy** — operador do elevador.

MVP: funcionários são **visuais** (dão vida à torre). FASE 3 adiciona contratação/melhoria com efeitos mensuráveis:
- Chef: reduz tempo de "produção" / +receita por andar.
- Floor Girl: +eficiência do andar onde trabalha.
- Lift Guy: +velocidade de entrega vertical (mais pedidos/atendidos).
- Cashier Girl: +eficiência do caixa.

Cada funcionário terá: id, tipo, nível, custo contratação, custo melhoria, efeito-base, efeito/nível, estado, local de trabalho, representação visual (conforme 10.2 da Constituição).

## Elevador

- Shaft visual à esquerda de cada andar (integrado na arte); Lift Guy sobe/desce por tween (MVP).
- FASE 3: elevador vira sistema de entrega real (pedidos sobem, receita é "coletada" ao chegar).
