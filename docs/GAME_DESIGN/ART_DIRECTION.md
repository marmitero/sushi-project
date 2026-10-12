# Direção de Arte

Baseada **exclusivamente** no asset kit (nada de arte genérica/IA). Dados medidos na auditoria.

## 1. Estilo

Vetorial cartoon clean: madeira quente (marrons/âmbar), acentos vibrantes (vermelho/laranja do toldo, amarelo do logo), UI em verde/azul/laranja saturados, contornos escuros grossos. Personagens chibi estilizados.

## 2. Escala e proporção (regra de ouro)

Os assets têm escalas **nativas coerentes entre si**; o jogo deve mantê-las para não distorcer:

- Andar: 1056×340 (≈3.1:1). No MVP usamos `FLOOR_SCALE=0.62` → ~655×211 px na tela de 720 de largura.
- Térreo/caixa: 1040×412, `CASHIER_SCALE=0.63`.
- Personagens: Chef 100×120, Cashier Girl 92×73, Floor Girl 84×59, Lift Guy 45×91 — renderizados ~1.4–1.6× dentro de um andar de 211px de altura (ocupam ~⅔ da altura interna), legíveis em mobile.
- Carros ~240×160 na rua, escala 0.8.

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
- **Bebas Neue** — títulos grandes / logo de tela (quando houver).
Carregadas via Google Fonts (OFL). Sempre com contorno (stroke) escuro p/ legibilidade sobre arte.

## 5. Composição da cena da torre

Camadas (z-order): fundo (céu+skyline) → nuvens (parallax) → rua/carro → térreo/caixa → andares (baixo→cima) → personagens → shaft/elevador + Lift Guy → botões diegéticos (setas de upgrade, botão de novo andar) → HUD fixa → popups por cima.

## 6. Animação

- Personagens e carros: frames PNG a **30 fps** (loop).
- Nuvens e elevador: tweens de posição (parallax/trajeto), coerentes com o estilo.
- Feedback de compra: scale-bounce curto + troca de sprite com fade (FASE 2+).
- Respeitar "reduzir movimento" (config) diminuindo tweens (FASE 4).

## 7. O que NÃO fazer

- Não misturar estilos externos nem fotos reais.
- Não esticar o fundo (usar cover mantendo âncora na rua).
- Não usar os atlas Spine de baixa resolução como arte final.
- Não redesenhar o logo — usar o embutido nos `Cashiers/*`.
