# Licenças e Obrigações de Assets

## Pack CraftPix (sprites/, exceto fontes)

- **Fonte oficial:** https://craftpix.net/freebies/free-sushi-restaurant-game-asset-kit/
- **Licença:** https://craftpix.net/file-licenses/ — uso **royalty-free**, comercial e não-comercial, em produtos finais.
- **Obrigações / vedações relevantes:**
  - **Não redistribuir** o pack original (ou parte dele) como asset standalone / revenda.
  - Não revender os arquivos fonte (AI/EPS/PNG) isoladamente.
  - Não usar os recursos para **treinar modelos de IA**.
  - Créditos não obrigatórios, mas recomendados (mencionar CraftPix).
- **Impacto no projeto:** podemos embutir os sprites no jogo (web/Android) e publicar na Play Store. Não podemos publicar os PNGs/AI/EPS como um pacote de assets separado.

## Spine (Json Atlas/ + Spine/)

- Os **arquivos** `.spine/.json/.atlas/.png` do pack podem ser usados como conteúdo.
- O **runtime Spine** (biblioteca de execução) é produto da Esoteric Software com licença própria (grátis p/ desenvolvimento, paga p/ distribuição comercial em alguns casos). **Decisão (ADR-0001):** o MVP **não usa runtime Spine**; usa os frames PNG (royalty-free). Reavaliar Spine apenas se necessário, com licença verificada.

## Fontes (SIL Open Font License 1.1)

- **Lilita One** (© 2011 Juan Montoreano), **Passion One** (© 2011 Fontstage), **Bebas Neue** (© 2019 The Bebas Neue Project Authors) — as três recomendadas pelo kit em `sprites/FontLink.txt`.
- Desde 2026-10-12 são **empacotadas no jogo** via npm `@fontsource/lilita-one`, `@fontsource/passion-one`, `@fontsource/bebas-neue` (licença declarada `OFL-1.1`), não mais baixadas do Google Fonts (que falhava offline).
- A OFL permite uso comercial e redistribuição **desde que cada cópia leve o aviso de copyright e a licença**. Por isso os textos completos ficam em `public/licenses/fonts/*-OFL-1.1.txt`, que o Vite copia para todo build (`dist/licenses/fonts/`, `portable/www/licenses/fonts/`; futuramente no APK). Não vender as fontes isoladamente; não usar os "Reserved Font Names" em versões modificadas.

## Conteúdo gerado neste repositório

- Código e documentação: propriedade do projeto. Nenhum asset de terceiros além dos acima.

## Checklist de conformidade p/ publicação

- [ ] Manter `sprites/license.txt` e créditos.
- [ ] Não empacotar AI/EPS/PNG para revenda.
- [ ] Não usar assets p/ treino de IA.
- [ ] Incluir crédito a CraftPix nos créditos do jogo (recomendado).
- [x] Textos OFL das fontes distribuídos junto do build (`licenses/fonts/`).
- [ ] Tela de créditos no jogo listando CraftPix + fontes (FASE 4).
