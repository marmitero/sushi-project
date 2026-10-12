# Estratégia de Testes

Runner: **Vitest** (`npm run test`). Foco atual: núcleo econômico (puro, sem DOM).

## Cobertos hoje (`tests/core.test.ts`, 15 testes)

- `big`: soma/subtração, comparação de ordens de magnitude, formatação (K/M/T/Qi), precisão além de `MAX_SAFE_INTEGER`.
- economia: receita inicial = fórmula; `tick` proporcional ao tempo; **atomicidade** (compra desconta exatamente o custo); bloqueio sem saldo; desbloqueio aumenta andares+receita; caixa multiplica global; **offline não paga 2×** e **tempo negativo = 0**.
- save/migração: roundtrip preserva; save de versão futura → null; campos corrompidos saneados.

## Política

- Nenhuma compra/recompensa nova entra sem teste de integridade (idempotência/atomicidade).
- UI/Phaser: validação por execução (dev/preview) até introduzir testes de integração (FASE 10).
- Simulações econômicas prolongadas (progressão/renascimento) na FASE 10.
