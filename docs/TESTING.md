# Estratégia de Testes

Runner: **Vitest** (`npm run test`). Typecheck: `npm run typecheck`. Núcleo econômico e simulação do drive-thru são puros (sem DOM/Phaser) e testados diretamente.

## Cobertos hoje — 31 testes

### `tests/core.test.ts` (23)

- **big (6):** soma; subtração sem negativo indevido; comparação de ordens de magnitude; formatação K/M/T/Qi; **formatação sem resíduo de ponto flutuante e sem arredondar para cima** (`45596.15 − 45096.15 → "500"`, `11.99 → "11"`); precisão além de `MAX_SAFE_INTEGER`.
- **economia (13):** receita inicial = fórmula; **dinheiro só entra por venda** (cada cliente credita exatamente o ticket); **não existe receita passiva** (o núcleo não exporta `tick`); média de vendas = `incomePerSec` em todos os níveis de caixa; caixa melhor atende mais rápido e aumenta o ticket; atomicidade da compra; bloqueio sem saldo; desbloqueio aumenta andares+receita; caixa multiplica global; **offline não paga 2×** e respeita o limite; offline = clientes no ritmo reduzido × ticket; ausência < 30 s não gera ganho nem popup; tempo negativo = 0.
- **save/migração (4):** roundtrip; **migração v1 → v2** (`customersServed`); save adulterado com saldo negativo não gera saldo negativo; lixo/corrompido → `null`.

### `tests/drivethru.test.ts` (8)

Sem tempo decorrido não há venda · 1º pagamento só após o carro chegar e ser atendido · com fila cheia o intervalo entre pagamentos = `serviceSeconds` · caixa mais rápido atende mais clientes no mesmo tempo · **nenhum carro passa do guichê sem pagar** e carros na fila nunca se sobrepõem · cada carro paga exatamente uma vez e sai pela esquerda · atendimento nunca abaixo do mínimo legível · salto grande de tempo (aba oculta) é limitado e não gera rajada de vendas.

## Verificação visual automatizada (executada em 2026-10-12)

Como o ambiente de desenvolvimento não tem tela, a cena foi conferida em **Chromium headless** (puppeteer-core + `@sparticuz/chromium`, instalados fora do repositório para não pesar o projeto), com screenshots e leitura do estado real do jogo via o gancho **somente de desenvolvimento** `window.__game` (o build de produção não o contém — conferido com `grep`).

| Verificação | Resultado medido |
|---|---|
| Centralização desktop 1366×768 | canvas `left=467` = (1366−432)/2 ✓ (antes 701: metade do jogo fora da área central) |
| Centralização Full HD 1920×1080 | `left=656` = (1920−608)/2 ✓ |
| Centralização celular 412×915 | `top=91` = (915−732)/2 ✓ (antes 137) |
| Nada cortado | torre (655 px) com margem de 32 px; botão do caixa e popup dentro de 720×1280 ✓ |
| Dinheiro só por cliente | 15 → 19 → 23 … → 35 após 5 clientes (15 + 5×$4) ✓; parado sem carro no guichê |
| Ritmo | ~1 pagamento a cada 4,0 s no caixa Nv1 ✓ |
| Arrastar começando sobre botão | não compra (saldo inalterado) ✓ |
| Clique no upgrade | 15 → 3, andar Nv2; cliente seguinte paga 5,4 (= 1,35 × 4 s) ✓ |
| Compra recusada | mostra "Faltam $57" e não altera saldo ✓ |
| Upgrade do caixa | $100 → $40; atendimento 4,0 → 3,5 s; ticket 14,28 → 18,74 ✓ |
| Offline 45 min (caixa Nv3) | 450 clientes (2700 × 0,5 ÷ 3,0) × $348,26 ✓ |
| Offline 3 h | limitado a 2 h → 1028 clientes (7200 × 0,5 ÷ 3,5) ✓; HUD retém o valor até "COLETAR" ✓ |
| Rolagem (7 andares) | roda do mouse para no topo (`minScroll = −1029`), andar bloqueado logo abaixo da HUD ✓ |
| Build portátil (produção) | servido estaticamente: todos os assets e fontes 200, sem erros no console ✓ |

Para repetir manualmente no navegador (dev): `npm run dev`, abrir o console e usar `__game.scene.getScene('Tower').model.state`.

## Política

- Nenhuma compra/recompensa nova entra sem teste de integridade (idempotência/atomicidade).
- Nenhuma fonte de dinheiro nova sem teste que prove a origem (ex.: "dinheiro só entra por venda").
- UI/Phaser: verificação visual automatizada (acima) a cada mudança de layout até existir suíte e2e versionada (Playwright, FASE 10).
- Simulações econômicas prolongadas (progressão/renascimento) na FASE 10.
