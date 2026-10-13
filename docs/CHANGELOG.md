# Changelog

Formato: data · fase · alteração · verificação.

## 2026-10-12 — Correções do teste manual: centralização, cortes, carros e economia por cliente

- **Visual:** fim da centralização dupla (CSS + Phaser); mundo com câmera (fundo e torre rolam juntos); escala única `S=0.62` medida na arte (`src/game/layout.ts`); prédio na calçada, poço do elevador contínuo, personagens nos pontos medidos; botão do caixa e popup offline cabem na tela; rolagem por arraste e roda do mouse.
- **Carros:** andam da direita para a esquerda, como a arte (antes "de ré"); são os clientes do drive-thru (5 modelos, fila de até 4, `Move`/`Idle`).
- **Economia:** removida a renda passiva por quadro (`tick`). Dinheiro entra **somente** quando um carro paga no guichê (`sellToCustomer`); ticket = `incomePerSec × serviceSeconds`; caixa melhor = mais clientes/min. Offline em clientes (≥ 30 s, 50%, máx. 2 h). Save v2 (`customersServed`) com migração da v1.
- **Robustez:** compra só ao soltar e sem arraste; "Faltam $X" na recusa; atualização incremental (sem vazamento de tweens); `suspend/resume` com aba oculta e `pagehide`; HUD retém o ganho offline até "COLETAR"; `fmt` sem resíduo de ponto flutuante.
- **Fontes:** Lilita One / Passion One / Bebas Neue empacotadas (`@fontsource`, OFL-1.1) com licenças em `public/licenses/fonts/` — funciona offline.
- Verificação: typecheck limpo · 31/31 testes (23 núcleo + 8 drive-thru) · screenshots antes/depois e leitura do estado em Chromium headless (TESTING.md) · `npm run build:portable` servido estaticamente sem erros. Auditoria completa: PROJECT_AUDIT.md §8–9.

## 2026-10-12 — Versão portátil p/ testes manuais no Windows

- `npm run build:portable` → `portable/www/`; `portable/JOGAR.bat` + `server.ps1` servem o jogo via PowerShell nativo (sem instalar nada) e abrem o navegador.
- Manifest de assets agora **embutido no bundle** (`src/generated/manifest.json`), sem `fetch` em runtime.
- Verificação: typecheck limpo · 15/15 testes · build portátil ok · `portable/www` servido localmente (index/js/png 200).

## 2026-10-12 — FASE 0 + FASE 1/2 (MVP)

- Auditoria completa de `sprites/` (559 PNG, dimensões/fps verificados) + correções sobre `referencia_tecnica.md` (Lv0=trancado; atlas Spine baixa-res; logo embutido; sem popups separados).
- Docs: inventário, matriz de uso, licenças, auditoria, ADR-0001, GDD, direção de arte, economia, andares/equipe, prestígio, offline, missões/eventos, receitas/reputação, roadmap, arquitetura, data-model, constituição, testes, deploy, segurança, monetização.
- Stack: TypeScript + Phaser 3 + Vite + Vitest (ADR-0001).
- Pipeline de assets sem placeholders (`prepare-assets.mjs` + `manifest.json`, 509 refs validadas).
- Núcleo econômico: `Big`, balance central, operações atômicas, offline não-duplicado; 15 testes passando.
- MVP jogável: torre com andares Lv0–10, caixa L1–6 (logo), personagens e carro animados a 30 fps, HUD (+/s), compra de andar/andar-upgrade/caixa, scroll, persistência e popup de ganhos offline.
- Verificação: `vitest run` 15/15 · `tsc --noEmit` limpo · `vite build` ok · dev server 200 e módulos transformados.
