# Modelo de Dados

## Save (versão 2) — `GameState`

```ts
{
  version: 2,               // SAVE_VERSION (src/core/economy.ts)
  money: Big,               // {m,e} — nunca negativo
  floors: number[],         // nível (1..10) de cada andar superior; length = nº andares
  cashierLevel: number,     // 1..6
  lastSaved: number,        // epoch ms: último instante JOGADO (base do offline; avançado ao aplicar)
  totalEarned: Big,
  customersServed: number   // NOVO na v2: clientes atendidos (inteiro ≥ 0)
}
```

Chave: `sushiventure.save.v1` (localStorage — o nome da chave é histórico e foi mantido para não perder saves; a versão real está no campo `version`).

### Migração (`save.ts:migrate()`)

- v1 → v2: adiciona `customersServed = 0`; demais campos preservados.
- Todos os campos são saneados: níveis com clamp, `money`/`totalEarned` não negativos, `customersServed` inteiro ≥ 0.
- Save de versão futura ou corrompido → ignorado com segurança (novo jogo), sem exceção. Testado.

### Carimbo de tempo ao salvar

`save(state, storage, savedAt)` grava `lastSaved = savedAt`. Em jogo ativo `savedAt = agora`; com o jogo suspenso (aba oculta) `savedAt = instante da suspensão` — ver OFFLINE_PROGRESS.md.

## Estado visual (não persistido)

A fila do drive-thru (`DriveThru` em `src/core/drivethru.ts`: carros, fases, posições) é **efêmera**: recomeça vazia a cada carregamento. Nenhum dinheiro depende dela fora do jogo ativo (offline usa a fórmula em clientes).

## Entidades planejadas (FASE 3+)

- `Staff { id, type, level, hired, hireCost, upgCost, effectBase, effectPerLevel, workSlot }`
- `Recipe { id, name, devCost, reqFloor, reqCashier, bonus, icon }`
- `Mission { id, cond, reward, claimed }` · `Achievement { id, claimed }`
- `Prestige { successPoints, permanentUpgrades: Record<nodeId, level>, cityIndex }`
- `City { id, name, costMult, goalMult, recipes, events }`
- `ActiveBuff { id, mult, expiresAt }`

Todas serializáveis em JSON seguro; `Big` sempre como `{m,e}`. Integridade: operações atômicas no núcleo; claims idempotentes por chave persistida.
