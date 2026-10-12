# GDD — Sushiventure Idle Tycoon

**Versão:** 0.1 (MVP) · **Plataformas:** Web (retrato primeiro) → Android (Capacitor) · **Engine:** Phaser 3 + TypeScript (ver ADR-0001)

## 1. Conceito em uma frase

Construa e automatize uma torre de restaurante de sushi que cresce verticalmente, gera receita sozinho e se expande por cidades através de renascimentos que concedem bônus permanentes.

## 2. Fantasia do jogador

Você é o dono de um império de sushi: vê funcionários trabalhando, o elevador subindo, entregas saindo, e toma decisões de investimento — não clica repetidamente para produzir.

## 3. Pilares (da Constituição)

Visual (torre central) · Progressão (sempre um próximo objetivo) · Automação (receita idle) · Decisões significativas · Continuidade (offline + prestígio) · Integridade (saves/compras consistentes) · Expansão (sistemas reutilizáveis).

## 4. Loop principal

1. Restaurante gera receita → 2. dinheiro acumula → 3. jogador investe (andar novo / upgrade de andar / caixa) → 4. receita sobe → 5. desbloqueia mais andares → 6. contrata/melhora equipe → 7. receitas/reputação/missões → 8. cidade satura → 9. renasce → 10. Pontos de Sucesso → bônus permanentes → nova cidade.

## 5. Tela principal (Torre)

Composição vertical: fundo urbano + nuvens (parallax) → térreo/caixa com logo → andares empilhados → elevador à esquerda → personagens animados → carro de entrega na rua. HUD no topo (dinheiro, +/s) e botões de ação. Scroll vertical p/ ver andares altos.

## 6. Entidades jogáveis (MVP)

- **Andar superior:** nível 1..10 (arte Lv1..10), gera receita base × multiplicadores. Upgrade troca o sprite.
- **Próximo andar:** representado por `Floor_Lv0` (trancado) com botão de desbloqueio.
- **Caixa (térreo):** nível 1..6 (arte CashierL1..6), multiplicador global.
- **Equipe (visual no MVP):** Cashier Girl, Chef (cooking), Floor Girl, Lift Guy. Efeitos econômicos de equipe entram na FASE 3.
- **Entregas:** carro na rua (visual no MVP; economia de entregas na FASE 3).

## 7. Controles

Toque/arraste: arrastar = rolar a torre; tocar em botões/setas = comprar. Sem hover-dependente. Áreas de toque ≥ 44px efetivas.

## 8. Fora do escopo do MVP (mas planejado)

Receitas/coleção, reputação/clientes especiais, missões/conquistas, eventos/boosts, mapa de cidades, renascimento/Pontos de Sucesso, ganhos offline avançados, contas/nuvem, monetização real, PWA/Android. Ver ROADMAP.

## 9. Métricas de sucesso do MVP

- App inicia sem erro e mostra a torre com assets reais.
- Receita automática visível (+/s) e dinheiro crescente.
- Comprar andar/upgrade/caixa desconta custo e troca o sprite.
- Progresso persiste após recarregar; ganhos offline corretos e não-duplicados.
- Funciona em retrato mobile e em desktop.
