# Segurança

## Ameaças relevantes (jogo idle client-side)

- **Manipulação de save/offline:** em modo local o relógio e o localStorage são do cliente → não são fonte de confiança. Mitigações atuais: cap de offline, `lastSaved` avança (sem double-grant), migração saneia campos, tempo negativo=0. Proteção forte só com backend (FASE 8) — não prometemos antifraude perfeita offline.
- **Duplicação de recompensas/compras:** operações atômicas no núcleo + claims idempotentes por chave persistida; verificação server-side de compras na FASE 9.
- **Segredos:** nenhum no frontend/GitHub; produção via env no host/CI.
- **XSS/inyección:** UI renderizada em Phaser (não HTML do usuário); sem `innerHTML` com dados externos.
- **Supply chain:** dependências mínimas (phaser, vite, typescript, vitest); lockfile commitado.

## Boas práticas mantidas

- TS `strict`; não desativar validações p/ passar build (regra 12 da Constituição).
- Não publicar chaves AdMob/IAP reais no repo (usar placeholders de config só em docs, nunca valores).
