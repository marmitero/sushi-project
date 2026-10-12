# Renascimento, Cidades e Pontos de Sucesso (meta-progression)

Estado: **projetado** (FASE 6). Fórmulas serão implementadas e testadas então; premissas abaixo.

## Objetivo

Reiniciar a jornada em nova cidade, perdendo progressão econômica local, ganhando **Pontos de Sucesso (PS)** permanentes.

## Condição de conclusão da cidade

Março explícito e visível: todos os andares desbloqueados + níveis mínimos + meta de receita + reputação mínima. Nunca acidental (confirmação em 2 etapas).

## Recompensa (fórmula proposta)

`PS = floor( (log10(totalEarnedCidade) - baseLog) * cityDifficulty ) + marcosBonus`
- Penaliza ciclos curtos: `baseLog` alto e `cityDifficulty` crescente garantem que jornadas substanciais rendam mais que resets rápidos.
- Não premia apenas tempo aberto (usa `totalEarned`, que depende de progresso, não de AFK).

## O que reinicia vs. preserva

Reinicia: dinheiro, torre, andares, upgrades locais, contratações da cidade, objetivos locais.
Preserva: PS, bônus permanentes, conquistas globais, coleções globais, dados de integridade.

## Árvore de PS (categorias)

Receita global · velocidade de progressão · eficiência de funcionários · eficiência de upgrades · ganhos offline (cap/eficiência) · redução controlada de custos · bônus de reputação · receita inicial. Cada nó: custo PS, efeito, limite, pré-req, fórmula, persistência, teste. Bônus nunca aplicado 2× após load/renascimento.

## Cidades

Cada cidade = config (metas, custos, multiplicadores, eventos, receitas, requisitos). Diferenças devem ser econômicas/mecânicas reais, não só nome.

## Balanceamento

Simulações automatizadas de jornadas (FASE 10): tempo até 1º renascimento, PS/jornada, efeito dos bônus, detecção de exploits. 1º renascimento alcançável sem pagar.
