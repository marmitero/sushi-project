# Arquitetura Técnica

**Stack:** TypeScript + Phaser 3 + Vite (web) → Android via Capacitor. Testes: Vitest. (ADR-0001)

## Camadas (separação de responsabilidades)

1. **Núcleo (`src/core/`)** — puro, sem dependência visual, 100% testável:
   - `big.ts` números grandes · `balance.ts` parâmetros · `economy.ts` estado+operações atômicas+offline · `save.ts` serialização/migração.
2. **Apresentação (`src/game/`)** — Phaser:
   - `BootScene` carrega `manifest.json` e cria animações; `TowerScene` renderiza torre/HUD/interação; `model.ts` é a ponte observável entre núcleo e cena.
3. **Persistência** — `save.ts` (localStorage agora; interface `SaveRepository` p/ nuvem depois).
4. **Serviços** — adaptadores (`AuthProvider`, `RewardedAdProvider`, `PaymentProvider`, …) definidos na Constituição; implementações reais só com credenciais; dev = simulados rotulados.

## Pipeline de assets

`scripts/prepare-assets.mjs` copia `sprites/Png/**` → `public/assets/**` (originais intactos) e gera `public/assets/manifest.json` (animações/carros/estáticos/UI + validação de ausência). O jogo carrega **somente** via manifest → zero placeholders e zero caminho hardcoded inexistente.

## Fluxo de dados

Evento de toque → `GameModel.buyX()` (núcleo atômico) → `emit()` → `TowerScene` reconstrói torre/HUD → autosave periódico + `beforehide`.

## Simulação de tempo

Economia por `tick(dt)` acumulado (não por frame fixo); funciona em aba lenta/segundo plano; offline via `applyOffline`.

## Performance (plano)

Pooling de personagens/carros, futuro atlas de UI, `devicePixelRatio` limitado, opção de reduzir movimento (FASE 4/10).

## Build / publicação

`vite build` → `dist/` (13 MB c/ assets). Web estático primeiro; Capacitor empacota o mesmo `dist` p/ Android (FASE 11). Ver DEPLOYMENT.md.
