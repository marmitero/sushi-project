# Modelo de Dados

## Save (versão 1) — `GameState`

```ts
{
  version: 1,
  money: Big,            // {m,e}
  floors: number[],      // nível (1..10) de cada andar superior; length = nº andares
  cashierLevel: number,  // 1..6
  lastSaved: number,     // epoch ms (avançado p/ evitar double-grant offline)
  totalEarned: Big
}
```

Chave: `sushiventure.save.v1` (localStorage). Migração por `version` em `save.ts:migrate()`; valores saneados (clamp) e save de versão futura ignorado com segurança.

## Entidades planejadas (FASE 3+)

- `Staff { id, type, level, hired, hireCost, upgCost, effectBase, effectPerLevel, workSlot }`
- `Recipe { id, name, devCost, reqFloor, reqCashier, bonus, icon }`
- `Mission { id, cond, reward, claimed }` · `Achievement { id, claimed }`
- `Prestige { successPoints, permanentUpgrades: Record<nodeId, level>, cityIndex }`
- `City { id, name, costMult, goalMult, recipes, events }`
- `ActiveBuff { id, mult, expiresAt }`

Todas serializáveis em JSON seguro; `Big` sempre como `{m,e}`. Integridade: operações atômicas no núcleo; claims idempotentes por chave persistida.
