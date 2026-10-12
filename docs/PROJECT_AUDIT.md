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
- Fontes via CDN → prever bundle/offset p/ Android offline (FASE 11).
- Sem backend: operações que exigem confiança (compras reais, antifraude offline) só com adaptadores reais depois.

## 7. Entregáveis desta fase

`ASSET_INVENTORY.md`, `ASSET_USAGE_MATRIX.md`, `ASSET_LICENSES.md`, `PROJECT_AUDIT.md`, `ADR-0001`, `AI_STATE.md`, + GDD/direção de arte/roadmap/arquitetura/data-model e MVP jogável.
