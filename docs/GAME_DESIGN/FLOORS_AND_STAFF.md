# Andares, Caixa e Funcionários

## Andares superiores

- Catálogo de config: nível 1..10 mapeado a `Floor_Lv1..10.png`; estado trancado = `Floor_Lv0.png`.
- Cada slot tem: `id(slot)`, `level`, `asset`, `custoUpgrade`, `receitaBase` (fórmula em ECONOMY.md), `posição` (empilhado Y), `estado`.
- Desbloqueio cria slot nível 1; operação atômica; atualiza economia+visual+HUD+save.
- Upgrade troca o sprite (fade/scale) e recalcula receita.

## Caixa (térreo / drive-thru)

- Níveis 1..6 → `CashierL1..6.png` (incluem logo "SUSHI TOWER", janela "CASHIER" e placa "« DRIVE THRU"; L4–L6 trazem semáforo de drive-thru). Todos 1040×412 com a janela na mesma posição (x 171–291, base y≈352) — verificado nos 6 níveis.
- Efeito: multiplicador global `cashierMult` **e** tempo de atendimento `serviceSeconds` (4,0 → 2,0 s).
- É o **ponto de venda real**: cada carro que para na janela paga 1 ticket (ECONOMY.md §2.1). Sem carro, sem venda.

## Funcionários

Papéis confirmados na auditoria (visuais reais do kit) e onde ficam na cena (medido na arte, `src/game/layout.ts`):
- **Cashier Girl** — atendente **dentro da janela "CASHIER"** do caixa (o sprite já inclui caixa registradora e embalagens).
- **Chef Guy** — de costas no **fogão** à direita da sala (`Cooking`); periodicamente leva o pedido até a garçonete (`Walk Full Order`) e volta (`Walk`).
- **Floor Girl** — atrás do **balcão** à esquerda da sala (o sprite é da cintura para cima, com a máquina do balcão).
- **Lift Guy** — no **poço do elevador**, subindo e descendo e parando em cada andar.

MVP: funcionários são **visuais** (dão vida à torre; não alteram números). FASE 3 adiciona contratação/melhoria com efeitos mensuráveis:
- Chef: reduz tempo de "produção" / +receita por andar.
- Floor Girl: +eficiência do andar onde trabalha.
- Lift Guy: +velocidade de entrega vertical (mais pedidos/atendidos).
- Cashier Girl: +eficiência do caixa (ex.: reduzir `serviceSeconds`).

Cada funcionário terá: id, tipo, nível, custo contratação, custo melhoria, efeito-base, efeito/nível, estado, local de trabalho, representação visual (conforme 10.2 da Constituição).

## Elevador

- Poço integrado à arte de cada andar (x 136–320 nativo) e do caixa (começa em y=32): com a escala única ele forma uma coluna contínua do térreo ao andar bloqueado. O `Floor_Lv0` mostra a porta "CLOSED".
- Lift Guy percorre o poço por uma cadeia de tweens (MVP, decorativo).
- FASE 3: elevador vira sistema de entrega real (pedidos sobem, receita é "coletada" ao chegar) — a venda no drive-thru continua sendo o ponto de entrada do dinheiro.
