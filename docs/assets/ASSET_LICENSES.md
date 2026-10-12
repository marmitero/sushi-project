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

## Fontes (Google Fonts)

- Bebas Neue, Passion One, Lilita One — licenciadas sob **SIL Open Font License** (Google Fonts). Uso livre no produto, inclusive comercial.

## Conteúdo gerado neste repositório

- Código e documentação: propriedade do projeto. Nenhum asset de terceiros além dos acima.

## Checklist de conformidade p/ publicação

- [ ] Manter `sprites/license.txt` e créditos.
- [ ] Não empacotar AI/EPS/PNG para revenda.
- [ ] Não usar assets p/ treino de IA.
- [ ] Incluir crédito a CraftPix nos créditos do jogo (recomendado).
