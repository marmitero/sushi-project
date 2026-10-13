# Ganhos Offline e Retorno ao Jogo

Implementado no núcleo (`applyOffline` em `src/core/economy.ts`), no modelo (`GameModel.suspend/resume/persist` em `src/game/model.ts`) e no popup da `TowerScene`.

## Cálculo (em clientes, coerente com o jogo ativo)

```
elapsed  = agora − lastSaved (s)
< 30 s   → nada, sem popup (offlineMinSeconds)
clientes = floor( min(elapsed, 7200) × 0.5 / serviceSeconds )
ganho    = clientes × ticket      (ticket = incomePerSec × serviceSeconds)
```

Não simula segundo a segundo; usa estado persistido + nível atual. Fora do jogo o drive-thru atende **metade** dos clientes do ritmo ativo, por no máximo **2 h**.

## Quando é aplicado

| Situação | Comportamento |
|---|---|
| Abrir o jogo (save existente) | `applyOffline` no construtor do `GameModel`; o save é gravado **imediatamente** com o ganho e `lastSaved = agora`. |
| Aba/app vai para segundo plano (`Phaser HIDDEN`) | `suspend()`: grava o save com o carimbo da suspensão e **pausa a simulação** (nenhuma venda enquanto oculto). Implementa `BALANCE.autosaveOnHide`. |
| Volta ao primeiro plano (`VISIBLE`) | `resume()`: credita os clientes do período oculto (mesma fórmula/limite) e mostra o popup se ≥ 30 s. |
| Fecha a aba enquanto oculta (`pagehide`) | `persist()` mantém o carimbo da **suspensão** → o tempo oculto é creditado no próximo carregamento (não se perde nem duplica). |
| Recarregar com o popup aberto | O ganho já está no save → não paga de novo e não perde. |

`resume()` sem `suspend()` anterior não faz nada (guarda contra contar tempo jogado como offline).

## Janela de retorno

Popup (`PopUp_Box` ×0,56 — cabe inteiro em 720×1280) com: tempo ausente, nº de clientes atendidos, valor pago, ritmo/limite aplicados e botão **COLETAR** (`Btn_Green`). A HUD **retém** o valor até o clique (o ganho já está salvo) e então as moedas voam até o contador. Se o jogador sair de novo com o popup aberto, o novo período é somado ao mesmo popup. FASE 7: opção de multiplicar via anúncio recompensado **real** (`Gams Image` do kit).

## Segurança

- `lastSaved` é avançado ao aplicar → reload **não paga de novo** (testado, inclusive com o mesmo `now`).
- Tempo negativo (relógio voltou) → 0 (testado).
- Cap impede ganhos ilimitados; bônus permanentes poderão ampliar cap (FASE 6).
- Save corrompido → `load()` retorna null → novo jogo seguro (migração saneada).
- Em modo 100% local o relógio do dispositivo não é confiável — documentado; validação server-side apenas quando houver backend (FASE 8).
