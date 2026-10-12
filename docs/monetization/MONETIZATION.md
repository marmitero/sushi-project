# Monetização

**Princípio:** nunca bloquear o progresso básico atrás de pagamento; anúncios apenas **recompensados** e opcionais; sem moeda premium artificial.

## Adaptadores (Constituição 5.3)

`RewardedAdProvider`, `PaymentProvider`, `PurchaseVerifier`, `AnalyticsProvider`, `RemoteConfigProvider`. Implementações **reais** somente com credenciais (FASE 9). Em dev, adaptadores **simulados e rotulados** que NÃO concedem benefício em produção não configurada.

## Anúncios recompensados

- Ex.: "30 min de lucro dobrado" (exemplo obrigatório da Constituição) e "2× ganhos offline".
- Recompensa só após callback de conclusão **real** do provider; nunca por simples clique.

## Microtransações

- Pacotes de boost/removedor de anúncios usando os artboards da Shop Screen.
- Compra só é concedida após `PurchaseVerifier` validar o receipt (Play Billing no Android; none/simulado na web dev).

## Estado atual

Nenhuma integração real configurada. Web MVP é 100% gratuito. Ver `RELEASE_CHECKLIST.md` p/ ativar.
