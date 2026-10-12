# Missões, Conquistas e Eventos

Estado: **projetado** (FASE 5 e 7). Reconhecerão eventos **reais** do jogo (nunca fake).

## Missões

Cadeias guiadas ("desbloqueie 2 andares", "caixa nível 3", "acumule X"). Cada missão: id, descrição, condição mensurável (consulta o estado), recompensa, estado. Conclui 1× (idempotente).

## Conquistas

Marcos permanentes (globais, sobrevivem a renascimento): nº de andares, total earned, renascimentos, entregas. Ícones reusam UI do kit (setas/coin/gems).

## Eventos aleatórios / bônus temporários

- Cliente especial: multiplicador temporário de receita enquanto ativo.
- **Exemplo obrigatório da Constituição:** "assista anúncio → 30 min de lucro dobrado". Só concede via `RewardedAdProvider` **real**; em dev, adaptador simulado claramente rotulado e sem conceder em produção não configurada.
- Boost do kit (`Btn_Boost`, `Boost_Icon`) = multiplicador temporário.

## Integridade

Recompensas de missão/evento são idempotentes (chave de claim persistida) → não duplicam em reload. Bônus temporários têm timestamp de expiração persistido.
