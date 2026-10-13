# AI_STATE — Sushiventure Idle Tycoon

**Atualizado:** 2026-10-12 · **Fase atual:** 1/2 (MVP jogável) — correções do 1º teste manual do diretor
**Branch:** `arena/71ec9a3a-sushi-project` · **Base desta etapa:** `6585f25` · **Commit desta etapa:** `ad4a187` (fix: centralização, cortes, carros, dinheiro por cliente)
**Push:** ✅ `origin/arena/71ec9a3a-sushi-project` em 2026-10-12 (`6585f25..ad4a187`)

Estados usados (Constituição): Planejado · Em desenvolvimento · Implementado · Testado · Validado · Bloqueado · Publicado.

## Status dos sistemas

| Sistema | Estado |
|---|---|
| Auditoria de assets (FASE 0) | Validado |
| Arquitetura / ADR-0001 (Phaser 3 + TS + Vite) | Validado |
| Núcleo econômico (Big, atomicidade, compras) | Testado (31/31) |
| Receita **somente por cliente** (drive-thru → `sellToCustomer`) | Testado (unitário + navegador) — aguarda validação do diretor |
| Simulação do drive-thru (`src/core/drivethru.ts`) | Testado (8 testes) |
| Ganhos offline em clientes + aba oculta (`suspend/resume`, `pagehide`) | Testado |
| Save v2 + migração v1→v2 | Testado |
| Cena da torre: centralização, escala única, nada cortado | Testado (headless: celular, desktop, Full HD) — aguarda validação do diretor |
| Carros no sentido da arte (direita → esquerda) | Testado — aguarda validação do diretor |
| Rolagem (arraste + roda do mouse), compra só ao soltar | Testado |
| Fontes empacotadas (OFL) | Testado |
| Versão portátil Windows (JOGAR.bat + PowerShell) | Validado (abre no Windows, confirmado pelo diretor); rebuild desta etapa Testado |
| Funcionários com efeito econômico | Planejado (FASE 3) |
| Elevador/entregas como sistema | Planejado (FASE 3) |
| Configurações / acessibilidade / créditos | Planejado (FASE 4) |
| Receitas / reputação / missões | Planejado (FASE 5) |
| Cidades / renascimento / Pontos de Sucesso | Planejado (FASE 6) |
| Eventos / boosts | Planejado (FASE 7) |
| Contas / nuvem | Planejado (FASE 8) |
| Monetização real | Bloqueado (FASE 9 — exige credenciais do diretor) |

## Verificações desta etapa

- `npx tsc --noEmit` → limpo.
- `npx vitest run` → 31/31 (23 núcleo + 8 drive-thru).
- Chromium headless: canvas centralizado em 1366×768 (`left=467`), 1920×1080 (`left=656`), 412×915 (`top=91`); vendas 15→19→…→35 após 5 clientes; arrastar sobre botão não compra; recusa "Faltam $57"; caixa Nv2 (4,0→3,5 s); offline 45 min = 450 clientes; 3 h limitado a 2 h; rolagem até o topo com 7 andares.
- `npm run build:portable` → ok; `portable/www` servido estaticamente, todos os assets/fontes 200, sem erros; gancho de dev ausente no bundle.

## Problemas conhecidos

- Personagens em resolução nativa baixa (limitar upscale ou regenerar do vetor).
- `BootScene` pré-carrega o kit inteiro (inclusive telas futuras) — carregar por tela na FASE 10.
- Bundle JS ~1,5 MB (Phaser) — aviso de chunk do Vite; dividir na FASE 10.
- Sem atlas de UI (draw calls) — FASE 10.
- Relógio do dispositivo não é confiável para offline em modo 100% local (documentado; validação só com backend).

## Integrações pendentes (exigem diretor)

Play Console, AdMob, Play Billing, backend/nuvem. Nenhuma declarada como funcionando.

## Próximas tarefas (prioridade)

1. Diretor: testar de novo com `portable/JOGAR.bat` e validar as 4 correções (centro, cortes, carros, dinheiro por cliente).
2. FASE 3: funcionários com efeito mensurável + elevador/entregas reais (a venda no guichê continua sendo a entrada de dinheiro).
3. FASE 4: configurações (reduzir movimento, reset de save, créditos CraftPix/fontes) + estados "pressed" dos botões do kit.
4. Perf: carregamento por tela, atlas de UI, divisão do bundle.

## Como continuar

`npm ci && npm run dev` · docs em `docs/` · constituição `docs/master-prompt.md` · testes `npm run test` · medições de layout em `src/game/layout.ts` + PROJECT_AUDIT.md §9 · estado do jogo no console (dev): `__game.scene.getScene('Tower').model.state`.
