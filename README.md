# Sushiventure Idle Tycoon

Jogo idle/tycoon de restaurante de sushi com torre vertical. Web-first (retrato), Android depois.
Assets: [CraftPix Free Sushi Restaurant Game Asset Kit](https://craftpix.net/freebies/free-sushi-restaurant-game-asset-kit/) (royalty-free).

## Executar (web)

```bash
npm install
npm run dev        # http://localhost:5173 (também exposto p/ live preview)
```

## Build / testes

```bash
npm run build      # typecheck + vite build -> dist/
npm run test       # vitest (núcleo econômico)
npm run typecheck
```

## Estrutura

- `src/core/` — economia pura e testável (big, balance, economy, save).
- `src/game/` — Phaser (BootScene, TowerScene, model).
- `scripts/prepare-assets.mjs` — copia `sprites/Png` → `public/assets` + gera `manifest.json`.
- `sprites/` — assets originais (não modificar).
- `docs/` — constituição, auditoria, GDD, direção de arte, economia, roadmap, etc.
- `AI_STATE.md` — estado operacional do projeto.

## Documentação

Ver `docs/` (PROJECT_AUDIT, ARCHITECTURE, ROADMAP, GAME_DESIGN/*, assets/*). Constituição: `docs/master-prompt.md`.

## Licença dos assets

Royalty-free CraftPix (ver `docs/assets/ASSET_LICENSES.md`). Não redistribuir o pack.
