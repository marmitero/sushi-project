# Arquitetura Técnica

**Stack:** TypeScript + Phaser 3 + Vite (web) → Android via Capacitor. Testes: Vitest. (ADR-0001)

## Camadas (separação de responsabilidades)

1. **Núcleo (`src/core/`)** — puro, sem dependência visual, 100% testável:
   - `big.ts` números grandes · `balance.ts` parâmetros · `economy.ts` estado+operações atômicas+venda+offline · `drivethru.ts` simulação da fila de clientes (carros) · `save.ts` serialização/migração.
2. **Apresentação (`src/game/`)** — Phaser:
   - `BootScene` carrega `manifest.json` e cria animações; `layout.ts` concentra todas as medições da arte (posições/escala); `TowerScene` renderiza torre/drive-thru/HUD/interação; `model.ts` é a ponte observável entre núcleo e cena (compras, venda, suspend/resume, persist).
3. **Persistência** — `save.ts` (localStorage agora; interface `SaveRepository` p/ nuvem depois).
4. **Serviços** — adaptadores (`AuthProvider`, `RewardedAdProvider`, `PaymentProvider`, …) definidos na Constituição; implementações reais só com credenciais; dev = simulados rotulados.

## Pipeline de assets

`scripts/prepare-assets.mjs` copia `sprites/Png/**` → `public/assets/**` (originais intactos) e gera `public/assets/manifest.json` (animações/carros/estáticos/UI + validação de ausência). O jogo carrega **somente** via manifest → zero placeholders e zero caminho hardcoded inexistente.

## Fluxo de dados

- **Venda:** `DriveThru.update(dt, serviceSeconds)` devolve os carros que pagaram neste quadro → para cada um `GameModel.sell()` → `sellToCustomer()` (núcleo) → "+$" na tela.
- **Compra:** soltar o dedo num botão (sem arraste) → `GameModel.buyX()` (núcleo atômico) → persist + `emit()` → `TowerScene` atualiza **incrementalmente** (troca textura/cria só o andar novo) → HUD.
- **Persistência:** autosave a cada 3 s, após cada compra, ao ocultar a aba (`suspend`) e no `pagehide`.

## Simulação de tempo

Não existe mais renda passiva por quadro (`tick` removido). No jogo ativo o tempo só avança a fila do drive-thru (delta limitado a 0,25 s). Em segundo plano a simulação pausa e o período é creditado por `applyOffline` (em clientes) ao voltar — nunca os dois para o mesmo intervalo.

## Performance (plano)

Pooling de personagens/carros, futuro atlas de UI, `devicePixelRatio` limitado, opção de reduzir movimento (FASE 4/10).

## Build / publicação

`vite build` → `dist/` (13 MB c/ assets). Web estático primeiro; Capacitor empacota o mesmo `dist` p/ Android (FASE 11). Ver DEPLOYMENT.md.
