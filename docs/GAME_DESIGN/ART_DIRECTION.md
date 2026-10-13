# Direção de Arte

Baseada **exclusivamente** no asset kit (nada de arte genérica/IA). Dados medidos na auditoria.

## 1. Estilo

Vetorial cartoon clean: madeira quente (marrons/âmbar), acentos vibrantes (vermelho/laranja do toldo, amarelo do logo), UI em verde/azul/laranja saturados, contornos escuros grossos. Personagens chibi estilizados.

## 2. Escala e proporção (regra de ouro)

Os assets do kit foram desenhados **na mesma escala** — prova medida: o poço do elevador tem 184 px de largura tanto no andar (x 136–320) quanto no caixa (x 122–306), e o chef (120 px) cabe exatamente na sala do andar (teto y≈126, piso y≈297). Por isso o jogo usa **uma única escala `S = 0.62` para tudo** (`src/game/layout.ts`):

- Andar 1056×341 → 655×211 px (margem de 32 px em 720). Empilhamento a cada 338 px nativos (2–3 px de sobreposição).
- Caixa 1040×412 → 645×255 px, deslocado 14 px nativos p/ alinhar o poço; o 1º andar encaixa no topo do poço do caixa (y=32 nativo), não no topo da imagem.
- Personagens e carros na **mesma** escala S: chef 62×74, garçonete 52×37, ascensorista 28×56, atendente 57×45, carros ~146×100.
- Fundo 1904×3118 escalado para a altura da tela (×0,4105); o prédio pousa nos ladrilhos da calçada e os carros na faixa de cima da rua.

> Erros corrigidos em 2026-10-12: caixa ×0,63 vs andares ×0,62 (poço desalinhado), personagens ~2,4× maiores que a sala, carro ×0,8 sobre a terra. Toda posição agora vem de uma medição nativa documentada no próprio `layout.ts`.

> Não upscale além de ~2× os personagens (a arte fica suave). Se precisar de mais definição no futuro, **regenerar do vetor** (`Ai/`, `Eps/`) em resolução maior — nunca inventar arte nova incompatível.

## 3. Paleta de referência (extraída dos sprites)

- Madeira/estrutura: `#6b4a2f`, `#8a5a33`, `#a9743f`
- Toldo/destaque: vermelho `#c0392b` / listras `#e74c3c`+`#ecf0f1`
- Logo: amarelo `#f6c445` ("SUSHI") + branco ("TOWER")
- UI primária: verde `#2ecc71`, laranja `#f39c12`, azul `#3498db`
- Céu/fundo: gradiente azul `#2ea3dd → #bfe8ff`
- HUD texto: creme `#ffe08a` com contorno marrom `#4a2c0a`

## 4. Tipografia

- **Lilita One** — números/botões do HUD (peso lúdico).
- **Passion One** — subtítulos/labels secundários.
- **Bebas Neue** — placas dos andares (nome/nível).

As três são as recomendadas pelo kit (`sprites/FontLink.txt`), **empacotadas localmente** via `@fontsource/*` (OFL-1.1) — funcionam offline e na versão portátil; antes vinham do Google Fonts e falhavam sem internet. `main.ts` pede o carregamento explícito (`document.fonts.load`, limite de 4 s) antes de iniciar o Phaser, porque texto em canvas não dispara o download sozinho. Sempre com contorno (stroke) escuro p/ legibilidade sobre arte.

## 5. Composição da cena da torre

**Mundo + câmera:** fundo, torre e rua vivem no mesmo espaço do mundo (x 0–720) e a câmera rola só na vertical (arrastar/roda do mouse). Assim a calçada fica sempre sob o prédio. HUD e popup usam `scrollFactor 0`. O canvas é centralizado **somente** pelo Phaser (`FIT` + `CENTER_BOTH`); o CSS não centraliza (antes, flex + Phaser somavam as margens e deslocavam o jogo).

Camadas (z-order, `DEPTH` em `TowerScene.ts`): fundo (0) → nuvens com parallax 0,6 (1) → andares (10, os de baixo por cima: o beiral cobre a base do andar de cima) → ascensorista no poço (11,5) → caixa (12; a placa "SUSHI TOWER" fica na frente da base do 1º andar) → personagens (20) → placas/botões diegéticos (30) → carros (40) → "+$" e moedas (50) → HUD fixa (100) → popup (200).

Posições diegéticas (todas medidas na arte): nome/nível do andar na **placa vazia do telhado**; botão de upgrade no telhado à direita; botão "CONSTRUIR ANDAR" cobrindo o letreiro em inglês "ADD NEW FLOOR" do `Floor_Lv0`; botão do caixa na faixa de terra abaixo da rua.

## 6. Animação

- Personagens e carros: frames PNG a **30 fps** (loop).
- **Carros:** a arte dos 5 modelos é desenhada **virada para a esquerda** → eles sempre andam da direita para a esquerda (sentido da placa "« DRIVE THRU"), nunca espelhados. `Move` enquanto andam, `Idle` parados na fila/guichê. (Antes andavam para a direita: "de ré".)
- **Chef:** `Cooking` (de costas, no fogão) → a cada 5–10 s leva o pedido até a garçonete com `Walk Full Order` (arte virada p/ esquerda) e volta com `Walk` espelhado.
- **Ascensorista:** uma cadeia de tweens persistente sobe e desce o poço parando em cada andar (recriada só quando o nº de andares muda; antes vazava tweens a cada compra).
- Nuvens: deriva horizontal lenta + parallax vertical.
- Feedback: venda = "+$valor" sobre o guichê + moeda voando até o contador (que pulsa); compra = "pop" no sprite trocado + mensagem; compra recusada = botão balança + "Faltam $X".
- Respeitar "reduzir movimento" (config) diminuindo tweens (FASE 4).

## 7. O que NÃO fazer

- Não misturar estilos externos nem fotos reais.
- Não esticar o fundo (usar cover mantendo âncora na rua).
- Não usar os atlas Spine de baixa resolução como arte final.
- Não redesenhar o logo — usar o embutido nos `Cashiers/*`.
- Não espelhar nem mover carros contra o sentido da arte (eles "andariam de ré").
- Não centralizar o canvas com CSS e com o Phaser ao mesmo tempo.
- Não usar escalas diferentes para peças que se encaixam (andar/caixa/personagens).
