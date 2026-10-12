# AI_STATE — Sushiventure Idle Tycoon

**Atualizado:** 2026-10-12 · **Fase atual:** 1/2 (MVP jogável) — FASE 0 concluída
**Branch:** `arena/71ec9a3a-sushi-project` · **Último commit:** `bf8b78b`
**Push:** ✅ `origin/arena/71ec9a3a-sushi-project` em 2026-10-12

## Status dos sistemas

| Sistema | Estado |
|---|---|
| Auditoria de assets | ✅ Validado |
| Arquitetura/ADR-0001 | ✅ Validado |
| Núcleo econômico (Big/atomicidade/offline) | ✅ Implementado + Testado (15/15) |
| Cena da torre + HUD + assets reais | ✅ Implementado |
| Compras (andar/upgrade/caixa) | ✅ Implementado + Testado |
| Persistência local + offline | ✅ Implementado + Testado |
| Versão portátil Windows (JOGAR.bat + PowerShell) | ✅ Implementado + Verificado |
| Funcionários c/ efeito econômico | ⏳ FASE 3 |
| Elevador/entregas como sistema | ⏳ FASE 3 |
| Configurações/acessibilidade | ⏳ FASE 4 |
| Receitas/reputação/missões | ⏳ FASE 5 |
| Cidades/renascimento/PS | ⏳ FASE 6 |
| Eventos/boosts | ⏳ FASE 7 |
| Contas/nuvem | ⏳ FASE 8 |
| Monetização real | ⏳ FASE 9 (bloqueado por credenciais) |

## Verificações desta etapa

- `npx vitest run` → 15/15 passam.
- `npx tsc --noEmit` → limpo.
- `npm run build` → ok (dist ~13 MB).
- Dev server → HTTP 200; `/assets/manifest.json` 200; módulos Phaser transformados; host do preview liberado (`allowedHosts:true`).

## Problemas conhecidos

- Personagens em resolução nativa baixa (limitar upscale ou regenerar do vetor).
- Sem atlas de UI (draw calls) — otimizar na FASE 10.
- Fontes via CDN — empacotar p/ Android na FASE 11.

## Integrações pendentes (exigem diretor)

Play Console, AdMob, Play Billing, backend/nuvem. Nenhuma declarada como funcionando.

## Próximas tarefas (prioridade)

1. FASE 3: funcionários com efeito mensurável + elevador/entregas reais.
2. FASE 4: configurações (reduzir movimento, reset de save) + qualidade de vida.
3. Atlas de UI + pooling (perf).

## Como continuar

`npm run dev` · docs em `docs/` · constituição `docs/master-prompt.md` · testes `npm run test`.
