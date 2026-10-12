# Ganhos Offline e Retorno ao Jogo

Implementado no núcleo (`applyOffline` em `src/core/economy.ts`) e popup na `TowerScene`.

## Cálculo

`gain = incomePerSec * min(elapsed, cap) * efficiency` — não simula segundo a segundo; usa estado persistido + receita atual. `cap=7200s`, `efficiency=0.5` (MVP).

## Janela de retorno

Popup com: tempo ausente (min), valor ganho, e (FASE 7) opção de multiplicar via anúncio recompensado **real**. Usa `PopUp_Box` + `Gams Image` do kit.

## Segurança

- `lastSaved` é avançado ao aplicar → reload/recarregar **não paga de novo** (testado).
- Tempo negativo (relógio voltou) → 0 (testado).
- Cap impede ganhos ilimitados; bônus permanentes poderão ampliar cap (FASE 6).
- Save corrompido → `load()` retorna null → novo jogo seguro (migração saneada).
- Em modo 100% local o relógio do dispositivo não é confiável — documentado; validação server-side apenas quando houver backend (FASE 8).
