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

## Jogar no Windows sem instalar nada (portátil)

```bash
npm run build:portable   # gera portable/www (jogo compilado + assets)
```

Depois, na sua máquina Windows, basta **duplo clique em `portable/JOGAR.bat`**:
ele usa o PowerShell nativo para servir `portable/www/` em `http://localhost:8080/`
e abre o navegador. Detalhes em `portable/LEIA-ME.txt`.
(Observação: não há toolchain aqui para gerar um `.exe` Windows nativo; o `.bat`+PowerShell
cumpre o papel de executável sem exigir nenhuma instalação.)

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
