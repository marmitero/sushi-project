# Checklist de Publicação (Play Store + integrações)

## Integrações (exigem credenciais do diretor)

- [ ] Conta Google Play Console + app criado.
- [ ] AdMob: app ID + IDs de rewarded (Android) — configurar via env/Capacitor, não no repo.
- [ ] Play Billing: produtos/SKUs criados e testados em licença de teste.
- [ ] (Opcional) Backend p/ saves/nuvem (Supabase ou equivalente) com RLS.

## Técnica

- [ ] Build Android release (AAB) assinado.
- [ ] Fontes/assets offline empacotados.
- [ ] Ícone/splash no estilo do kit (usar logo embutido `Cashiers/*`).
- [ ] Política de privacidade + declaração de anúncios/ID.
- [ ] Classificação etária (questionário Play).
- [ ] Teste em dispositivo físico (toque, safe-area, pause/resume).

## Conformidade de assets

- [ ] Créditos CraftPix incluídos; não redistribuir pack; sem uso p/ treino de IA.

## Validação de integridade

- [ ] Compras verificadas server-side; recompensas idempotentes; offline com cap.

Nada acima é declarado "funcionando" sem evidência (regra 5 da Constituição).
