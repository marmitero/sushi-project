# Auditoria Inicial do Projeto (FASE 0)

Data: 2026-10-12 · Branch: `arena/71ec9a3a-sushi-project` (base `63fa98f` de `main`)

## 1. GitHub / Git

- Repositório `marmitero/sushi-project` com apenas `docs/master-prompt.md` e `sprites/` no commit inicial.
- Sem código, sem build, sem testes, sem CI, sem `.env`, sem segredos expostos.
- Trabalho anterior da sessão **não foi persistido** (árvore limpa); esta auditoria parte do commit base.

## 2. Sprites (recursivo, medido com ImageMagick)

- **559 PNG · 10,09 MB**; ~78 MB incluindo `Ai/`, `Eps/`, `Spine/`, `Json Atlas/`.
- Categorias confirmadas (ver `assets/ASSET_INVENTORY.md`): fundos, 11 andares, 6 caixas(+logo), 4 personagens animados, 5 carros (Idle/Move), mapa de cidades, 44 UI, 12 artboards de loja, fontes (FontLink), licenças.
- **Animações a 30 fps** (derivado das durações Spine).

## 3. Correções sobre `sprites/referencia_tecnica.md`

1. `Floor_Lv0` é o andar **trancado** ("ADD NEW FLOOR"), não a fundação.
2. **Não há** PNGs separados de "offline/floor/cashier upgrade popup" — esses layouts estão nos artboards da Shop Screen; a janela offline do MVP compõe `PopUp_Box`+`Gams Image`.
3. Os **atlas Spine estão em baixa resolução** (ex.: 256×64) → inadequados p/ render final; usar frames PNG.
4. O **logo** não é arquivo próprio; está embutido em `Cashiers/*`.

## 4. CraftPix / Licença

- Página oficial confirma kit royalty-free p/ uso comercial (ver `assets/ASSET_LICENSES.md`).
- Preservados `license.txt` e créditos. Runtime Spine tem licença própria → evitado no MVP.

## 5. Avaliação de engine (ver ADR-0001)

- **Godot 4.7.2-stable existe** (GitHub, 2026-08-18) e exporta Web+Android.
- **Escolhido: Phaser 3 + TypeScript + Vite** (alinhado à Constituição 5.1), testável em web imediatamente neste ambiente, Android via Capacitor. Godot registrado como alternativa válida.

## 6. Problemas / riscos identificados

- Personagens em resolução nativa baixa → limitar upscale (~2×) ou regenerar do vetor.
- 500+ PNGs soltos → pipeline de manifest + futuro atlas p/ draw calls (FASE 10/perf).
- Fontes via CDN → ~~prever bundle p/ Android offline~~ **resolvido em 2026-10-12** (empacotadas, ver §8).
- Sem backend: operações que exigem confiança (compras reais, antifraude offline) só com adaptadores reais depois.

## 7. Entregáveis desta fase

`ASSET_INVENTORY.md`, `ASSET_USAGE_MATRIX.md`, `ASSET_LICENSES.md`, `PROJECT_AUDIT.md`, `ADR-0001`, `AI_STATE.md`, + GDD/direção de arte/roadmap/arquitetura/data-model e MVP jogável.

## 8. Auditoria pós-teste manual (2026-10-12)

Relato do diretor após jogar a versão portátil no navegador do Windows: *"a visualização ficou meio bugada e fora de centro, algumas coisas ficaram cortadas da tela, os carros estão andando de ré, e o dinheiro sobe sozinho, sem o cliente 'comprar'"*. Cada sintoma foi reproduzido em Chromium headless (screenshots "antes") e rastreado até a causa no código:

| # | Sintoma | Causa raiz (evidência) | Correção |
|---|---|---|---|
| 1 | Torre fora de centro, metade cortada | O container do mundo estava em x=0 enquanto os filhos usavam coordenadas relativas ao centro → torre centrada na **borda esquerda** da tela. | Mundo em coordenadas absolutas (x 0–720) + câmera; `layout.ts` com todas as posições. |
| 2 | Jogo deslocado na janela | **Centralização dupla**: `#game` com flex-center **e** Phaser `CENTER_BOTH` (margens somadas). Medido: canvas em `left=701` em 1366×768 (correto 467); `top=137` no celular (correto 91). | CSS só ocupa a janela (`position:fixed; inset:0`); quem centraliza é o Phaser. |
| 3 | Botão do caixa cortado | `Btn_Orange` ×0,9 em (610,1190): ultrapassava a direita/baixo. | ×0,56 centralizado em (360,1202), na faixa de terra. |
| 4 | Popup offline cortado | `PopUp_Box` 1065×1297 desenhado em ×1 — maior que a tela 720×1280. | ×0,56 (596×726), conteúdo reposicionado e conferido. |
| 5 | Peças desencaixadas | Prédio em `GROUND_Y=1105` (meio da rua), carro sobre a terra, personagens ~2,4× maiores que a sala, caixa ×0,63 vs andares ×0,62 (poço desalinhado), 1º andar no topo da imagem do caixa (poço começa em y=32 → vão). | Escala única `S=0.62` provada por medição (§9); prédio na calçada, carros na faixa da rua, personagens nos pontos medidos. |
| 6 | Carros "de ré" | A arte dos 5 carros é **virada para a esquerda**, mas eles andavam para a direita. | Fluxo direita → esquerda (como a placa "« DRIVE THRU"), nunca espelhados; `Move`/`Idle` conforme o movimento. |
| 7 | Dinheiro sobe sozinho | `GameModel.update` chamava `tick(dt)`: somava `incomePerSec × dt` todo quadro, sem relação com clientes. | `tick` removido. Única entrada no jogo ativo: carro paga no guichê → `sellToCustomer()`. Offline convertido para clientes (mesma unidade). Ver ECONOMY.md §2.1. |
| 8 | (encontrado na auditoria) Arrastar comprava | Botões disparavam no `pointerdown`: arrastar a torre começando num botão comprava. | Compra só no `pointerup` e só sem arraste (> 12 px). |
| 9 | (encontrado) Vazamento de tweens | `buildTower()` destruía/recriava tudo a cada compra e deixava tweens do ascensorista vivos. | Atualização incremental; cadeia do elevador recriada só quando muda o nº de andares. |
| 10 | (encontrado) `autosaveOnHide` não implementado | Flag existia em `balance.ts` sem uso; tempo com aba oculta não era tratado. | `suspend()`/`resume()` no HIDDEN/VISIBLE + `pagehide`; simulação pausa oculta → sem pagamento duplo. |
| 11 | (encontrado) Fontes externas | Google Fonts falhava sem internet (inclusive na versão portátil) → fonte reserva. | `@fontsource` (OFL-1.1) empacotado + `document.fonts.load` antes do Phaser; licenças em `public/licenses/fonts/`. |
| 12 | (encontrado) HUD mostrava 499 em vez de 500 | `fmt()` truncava resíduo de ponto flutuante. | Epsilon na formatação + teste de regressão. |

Verificação: typecheck limpo · 31/31 testes · screenshots "depois" em celular/desktop/Full HD · leitura do estado do jogo durante vendas, compras, recusa, rolagem e offline (TESTING.md) · build portátil de produção servido estaticamente sem erros. Estado: **Testado**, aguardando validação manual do diretor.

## 9. Medições da arte usadas no layout (px nativos)

| Peça | Medida | Uso |
|---|---|---|
| `Floor_LvN` 1056×341 | poço x 136–320 (altura toda); sala x 334–879; tábuas y 289–300 (pés em 297); conteúdo y 1–340 (passo 338) | escala, empilhamento, pés dos personagens |
| | placa vazia do telhado x 342–593 / y 39–98 | "ANDAR N · NV L" |
| | balcão esquerdo x 330–415, topo y≈251; fogão x 755–815 | garçonete / chef |
| `Floor_Lv0` | letreiro y 175–229, texto "ADD NEW FLOOR" x≈640–816 | botão "CONSTRUIR ANDAR" |
| `CashierL1..6` 1040×412 | poço x 122–306 a partir de y=32; janela x 171–291 / y 252–360 (vidro até ≈352), igual nos 6 níveis | alinhamento do poço, atendente, parada dos carros |
| `Car1..5` | 204–243 × 158–167, todos virados p/ esquerda; janela do motorista a ~32% da largura a partir da frente | sentido e ponto de parada no guichê |
| `Backgrounds.png` 1904×3118 | calçada 2446–2533 (ladrilhos 2474+); rua 2575–2717 (faixa 2653–2665); terra 2740+ | `GROUND_Y` (2518), `LANE_Y` (2652) |
| Personagens | chef 100×120; atendente 92×73; garçonete 84×59; ascensorista 45×91 | mesma escala S |

