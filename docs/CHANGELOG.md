# Changelog

Formato: data · fase · alteração · verificação.

## 2026-10-12 — FASE 0 + FASE 1/2 (MVP)

- Auditoria completa de `sprites/` (559 PNG, dimensões/fps verificados) + correções sobre `referencia_tecnica.md` (Lv0=trancado; atlas Spine baixa-res; logo embutido; sem popups separados).
- Docs: inventário, matriz de uso, licenças, auditoria, ADR-0001, GDD, direção de arte, economia, andares/equipe, prestígio, offline, missões/eventos, receitas/reputação, roadmap, arquitetura, data-model, constituição, testes, deploy, segurança, monetização.
- Stack: TypeScript + Phaser 3 + Vite + Vitest (ADR-0001).
- Pipeline de assets sem placeholders (`prepare-assets.mjs` + `manifest.json`, 509 refs validadas).
- Núcleo econômico: `Big`, balance central, operações atômicas, offline não-duplicado; 15 testes passando.
- MVP jogável: torre com andares Lv0–10, caixa L1–6 (logo), personagens e carro animados a 30 fps, HUD (+/s), compra de andar/andar-upgrade/caixa, scroll, persistência e popup de ganhos offline.
- Verificação: `vitest run` 15/15 · `tsc --noEmit` limpo · `vite build` ok · dev server 200 e módulos transformados.
