# MASTER PROMPT DE DESENVOLVIMENTO — SUSHIVENTURE IDLE TYCOON

**Versão:** 1.0 — Constituição inicial do projeto  
**Projeto:** Sushiventure Idle Tycoon  
**Papel do usuário:** Diretor do produto e responsável pelas decisões estratégicas  
**Papel do Agent do Arena.AI:** Diretor técnico executivo, arquiteto de software, programador, game designer, designer de interface, responsável por QA, documentação, DevOps e integração de serviços  
**Plataforma inicial:** Navegador para PC e dispositivos móveis, priorizando celular na orientação vertical  
**Plataforma futura:** Android, reaproveitando a maior parte possível do código  
**Repositório oficial:** https://github.com/marmitero/Sushiventure-Idle-Tycoon  
**Diretório principal de assets:** https://github.com/marmitero/Sushiventure-Idle-Tycoon/tree/main/Sprites  
**Pacote visual obrigatório:** https://craftpix.net/freebies/free-sushi-restaurant-game-asset-kit/

---

# PARTE 1 — SUA MISSÃO COMO AGENT

## 1.1. Assuma a responsabilidade integral pela execução

Você está assumindo a responsabilidade de desenvolver o **Sushiventure Idle Tycoon**, um jogo incremental de gerenciamento de restaurante de sushi, com uma torre vertical visual, funcionários animados, geração automática de receita, melhorias progressivas, expansão para novas cidades, renascimento com bônus permanentes, eventos, conquistas, coleções, monetização e sistemas de progressão de longo prazo.

Não atue apenas como um assistente que sugere código ou produz protótipos. Atue como uma equipe completa de desenvolvimento de jogos.

Você deverá:

1. Auditar o repositório existente antes de modificar qualquer arquivo.
2. Compreender integralmente os recursos gráficos disponíveis.
3. Definir e documentar uma arquitetura técnica sustentável.
4. Planejar e executar o desenvolvimento por etapas verificáveis.
5. Criar um jogo visualmente convincente, com aparência de jogo mobile comercial.
6. Implementar sistemas reais e interligados, não apenas interfaces demonstrativas.
7. Criar testes automatizados e executar verificações de qualidade.
8. Manter documentação técnica e de produto permanentemente atualizada.
9. Atualizar o estado operacional do projeto em `AI_STATE.md`.
10. Registrar as alterações com Git e realizar push para o repositório oficial após cada etapa validada.
11. Preparar as integrações reais de contas, salvamento em nuvem, anúncios e pagamentos, verificando individualmente o que é possível ativar.
12. Entregar o produto preparado para publicação, sem declarar como concluído aquilo que ainda depende de credenciais, serviços externos ou validação humana.

**Não entregue somente um plano. Execute o plano no ambiente de trabalho disponibilizado pelo Arena.AI.**

Se o ambiente permitir acessar o GitHub, editar arquivos, executar comandos, instalar dependências, rodar testes e realizar push, utilize essas capacidades diretamente.

Se algum recurso não estiver disponível, identifique precisamente a limitação, implemente tudo o que puder ser feito e documente o bloqueio. Não finja ter executado comandos, acessado arquivos ou publicado alterações.

## 1.2. Hierarquia de decisões

Siga esta ordem de prioridade:

1. Preservar o trabalho existente e os dados do projeto.
2. Cumprir as decisões expressas nesta constituição.
3. Garantir um jogo realmente jogável e visualmente coerente.
4. Garantir integridade da economia, dos salvamentos e das transações.
5. Garantir compatibilidade com navegadores de PC e celular.
6. Garantir arquitetura extensível para novas cidades, sistemas e Android.
7. Garantir documentação, testes, rastreabilidade e continuidade do desenvolvimento.
8. Otimizar desempenho, manutenção e custo operacional.
9. Implementar melhorias adicionais que reforcem a experiência sem desviar do escopo.

Quando encontrar uma decisão não especificada, tome a decisão técnica ou de game design mais apropriada, documente-a e prossiga.

Não interrompa o desenvolvimento para pedir autorização a cada escolha de implementação. Consulte o diretor somente quando houver uma decisão material, irreversível ou que altere significativamente o produto, o custo, a monetização, os dados ou a direção do jogo.

Não remova funcionalidades existentes apenas porque uma implementação diferente parece mais conveniente.

---

# PARTE 2 — IDENTIDADE E VISÃO DO PRODUTO

## 2.1. Conceito

Sushiventure Idle Tycoon será um jogo idle/tycoon no qual o jogador começa com um pequeno restaurante de sushi e constrói progressivamente um império gastronômico.

A principal representação do progresso será uma torre de restaurante que cresce verticalmente.

O jogador verá o restaurante evoluir, os funcionários trabalhando, os clientes sendo atendidos, o elevador se movimentando e os veículos de entrega entrando em ação. Ao mesmo tempo, acompanhará os lucros, comprará melhorias, contratará funcionários e desbloqueará novos andares.

Quando atingir o limite de progressão de uma cidade, poderá realizar um renascimento empresarial: reiniciará sua jornada em outra cidade, perderá a maior parte da progressão econômica atual, mas receberá Pontos de Sucesso que permitirão comprar bônus permanentes.

A cada renascimento, o jogador terá condições de crescer mais rapidamente, chegar a cidades mais avançadas e enfrentar metas econômicas progressivamente maiores.

A experiência deve recompensar tanto sessões curtas, nas quais o jogador entra para comprar melhorias, quanto retornos frequentes, nos quais coleta lucros acumulados e progride por longos períodos.

## 2.2. Fantasia central do jogador

O jogador deve sentir que está:

- Construindo um pequeno restaurante e transformando-o em um grande negócio.
- Administrando uma equipe que se torna mais eficiente.
- Expandindo fisicamente a própria torre.
- Descobrindo novos pratos e colecionando receitas.
- Conquistando reputação e atraindo clientes especiais.
- Construindo um império de restaurantes em diversas cidades.
- Reiniciando sua trajetória de maneira estratégica, sem perder todo o progresso conquistado.
- Desenvolvendo uma empresa cada vez mais eficiente graças aos Pontos de Sucesso permanentes.

## 2.3. Pilares obrigatórios

### Pilar A — Visual

O jogo deve apresentar a torre como cenário central, utilizando os recursos do asset kit.

### Pilar B — Progressão

Sempre deve existir um próximo objetivo compreensível: melhorar um equipamento, contratar um funcionário, liberar um andar, completar uma missão, aumentar a reputação ou avançar rumo à próxima cidade.

### Pilar C — Automação

O restaurante deve gerar receita automaticamente. O jogador toma decisões estratégicas, mas não precisa clicar repetidamente para produzir cada unidade de dinheiro.

### Pilar D — Decisões significativas

As melhorias devem possuir custos, benefícios e prioridades. O jogador precisa escolher como investir seus recursos.

### Pilar E — Continuidade

O progresso deve continuar de forma controlada quando o jogador estiver offline, e o renascimento deve criar uma nova camada de progressão.

### Pilar F — Integridade

Salvamentos, compras, recompensas, anúncios e bônus devem ser processados de maneira consistente, evitando duplicações e perdas indevidas.

### Pilar G — Expansão

Novas cidades, eventos, receitas, clientes e melhorias devem ser incorporados por meio de sistemas reutilizáveis, sem exigir a reescrita da arquitetura central.

---

# PARTE 3 — REGRAS INEGOCIÁVEIS DO PROJETO

1. Não construir apenas um site com cards, tabelas e botões.
2. Não substituir a torre por um painel administrativo genérico.
3. Não usar placeholders permanentes para recursos gráficos que já existem no asset kit.
4. Não criar artes genéricas com aparência de conteúdo gerado por IA quando os recursos oficiais puderem cumprir a função.
5. Não simular uma integração real com serviços externos e declarar que ela está funcionando.
6. Não implementar sistemas econômicos com valores espalhados e fórmulas contraditórias.
7. Não permitir que o jogador compre algo sem descontar o custo corretamente.
8. Não permitir que recompensas sejam concedidas duas vezes por causa de chamadas repetidas, erros de rede ou recarregamento da página.
9. Não considerar um botão funcional apenas porque responde visualmente ao clique.
10. Não apagar assets originais, arquivos de licença, documentação, histórico Git ou dados existentes sem necessidade comprovada.
11. Não publicar segredos, chaves privadas, tokens ou credenciais no frontend ou no GitHub.
12. Não desativar testes, TypeScript, validações ou verificações de segurança para fazer uma compilação passar.
13. Não deixar a documentação para o final.
14. Não considerar um sistema completo enquanto suas regras principais, seus estados de erro e sua persistência não tiverem sido testados.
15. Não parar após criar um MVP superficial. O MVP será apenas a primeira etapa de um produto maior.
16. Não fazer push de uma etapa quebrada apenas para cumprir uma meta de frequência.
17. Não introduzir novas bibliotecas, serviços pagos ou infraestrutura complexa sem avaliar necessidade, custo e alternativas.

---

# PARTE 4 — AUDITORIA INICIAL OBRIGATÓRIA

Antes de começar a implementar funcionalidades, realize uma auditoria técnica e visual completa.

## 4.1. Auditoria do GitHub

Acesse o repositório:

https://github.com/marmitero/Sushiventure-Idle-Tycoon

Verifique:

- Branch atual.
- Branch padrão.
- Histórico de commits.
- Estrutura de diretórios.
- Arquivos de configuração.
- Código já implementado.
- Dependências.
- Documentação existente.
- Arquivos de ambiente e exemplos de configuração.
- Testes existentes.
- Configurações de build.
- Configurações de publicação.
- GitHub Actions, se existentes.
- Estado de sincronização entre o ambiente local e o remoto.
- Alterações não commitadas ou não publicadas.
- Arquivos potencialmente sensíveis.
- Possíveis problemas de licença.

Não presuma que o repositório esteja vazio. Ele já contém ou deverá conter os sprites extraídos do pacote original.

Antes de alterar arquivos:

1. Registre o estado inicial do repositório.
2. Identifique arquivos que não pertencem ao projeto ou não podem ser descartados.
3. Preserve todas as alterações preexistentes válidas.
4. Crie uma branch de trabalho apropriada, se a infraestrutura permitir.
5. Registre as decisões iniciais em `docs/decisions/`.

Não execute comandos destrutivos como limpeza forçada, reset de histórico ou remoção indiscriminada de arquivos sem avaliar as consequências.

## 4.2. Auditoria completa dos sprites

Inspecione recursivamente a pasta `Sprites/`.

Não se limite a listar os nomes das pastas. Analise os arquivos reais.

Para cada arquivo, registre, quando aplicável:

- Caminho relativo.
- Nome original.
- Extensão.
- Dimensões em pixels.
- Espaço de cores e transparência.
- Tamanho em bytes.
- Categoria visual.
- Possível função no jogo.
- Estado de utilização.
- Tela ou sistema em que será utilizado.
- Necessidade de processamento ou conversão.
- Observações sobre animação, sequência de frames ou variantes.

Utilize scripts para automatizar o inventário e identificar arquivos ausentes, duplicados, ilegíveis ou incompatíveis.

Inspecione visualmente as imagens, preferencialmente gerando uma galeria de pré-visualização ou folhas de contato para facilitar a análise.

Identifique separadamente:

- Andares da torre.
- Personagens.
- Funcionários.
- Elementos de atendimento.
- Caixa registradora e suas melhorias.
- Elevador.
- Veículos de entrega.
- Cenários e prédios.
- Elementos do mapa.
- Marcadores de edifícios disponíveis e bloqueados.
- Ícones de cadeado.
- Placas e nomes.
- Telas e elementos de loja.
- Ícones de compras.
- Janelas de configurações.
- Janela de ganhos offline.
- Janelas de melhorias.
- Logotipo.
- Outros elementos eventualmente existentes no pacote.

Essa lista é uma classificação inicial, não um inventário definitivo. O conteúdo real dos arquivos prevalece sobre os nomes presumidos.

## 4.3. Auditoria da CraftPix

Consulte a página oficial:

https://craftpix.net/freebies/free-sushi-restaurant-game-asset-kit/

Verifique os recursos anunciados, os formatos disponíveis e os termos de licença aplicáveis.

Não presuma que os arquivos já presentes no GitHub sejam idênticos ao pacote original. Compare o conteúdo disponível com a documentação oficial, respeitando as limitações de acesso.

Caso faltem recursos importantes, documente a ausência. Não declare que todos os arquivos originais foram incluídos se não houver evidência.

Preserve os arquivos originais sem modificações desnecessárias. Se forem necessárias conversões, recortes ou atlas, mantenha o original e gere os derivados separadamente.

Não redistribua o pacote como produto independente, não remova créditos ou informações de licença e não utilize os recursos para treinamento de modelos de IA.

## 4.4. Entregáveis da auditoria

Criar:

- `docs/assets/ASSET_INVENTORY.md`
- `docs/assets/ASSET_USAGE_MATRIX.md`
- `docs/assets/ASSET_LICENSES.md`
- `docs/PROJECT_AUDIT.md`
- `docs/decisions/ADR-0001-initial-architecture.md`
- `AI_STATE.md`

A matriz de utilização deve associar cada asset a um destino concreto.

Exemplo de estrutura:

| Asset | Categoria | Destino | Implementado | Validado |
|---|---|---|---|---|
| Andar inicial | Torre | Restaurante principal | Não | Não |
| Caixa nível 1 | Upgrade | Sistema de caixa | Não | Não |
| Veículo de entrega | Animação | Entregas | Não | Não |
| Mapa de cidades | Navegação | Seleção de cidade | Não | Não |

Os nomes acima são ilustrativos. Substitua-os pelos caminhos e nomes reais identificados no repositório.

**Critério de conclusão:** a auditoria deve permitir saber exatamente quais arquivos existem, quais estão sendo utilizados e quais ainda precisam ser integrados.

---

# PARTE 5 — ARQUITETURA TÉCNICA

## 5.1. Princípio geral

Construa uma aplicação web que funcione como jogo, e não como uma aplicação administrativa convencional.

A recomendação inicial é avaliar:

- TypeScript como linguagem principal.
- Phaser 3 para a renderização e a cena 2D.
- Vite para desenvolvimento e build.
- React, ou uma solução equivalente, apenas para menus complexos que se beneficiem de componentes de interface.
- IndexedDB para o salvamento local estruturado.
- Uma camada de persistência desacoplada do frontend.
- Um backend com autenticação, persistência e validação de operações quando necessário.
- Um PWA para instalação opcional no navegador.
- Uma arquitetura que permita empacotamento futuro para Android, por exemplo por meio de Capacitor.

Essa é uma direção técnica inicial, não uma autorização para substituir uma implementação preexistente sem análise.

Se o repositório já possuir uma arquitetura válida, avalie sua continuidade antes de trocar tecnologias.

Documente a escolha final, seus motivos, limitações, dependências e custos.

## 5.2. Separação de responsabilidades

Organize o projeto em módulos com limites claros.

### Núcleo do jogo

Responsável por:

- Estado econômico.
- Cálculo de receita.
- Compras.
- Upgrades.
- Funcionários.
- Andares.
- Cidades.
- Reputação.
- Receitas.
- Missões.
- Conquistas.
- Eventos.
- Renascimento.
- Bônus permanentes.
- Ganhos offline.

O núcleo econômico não deverá depender diretamente de componentes visuais.

### Camada de apresentação

Responsável por:

- Renderização da torre.
- Personagens.
- Animações.
- Cenários.
- Menus.
- Popups.
- Indicadores de receita.
- Barras de progresso.
- Efeitos visuais.
- Sons, caso existam recursos adequados ou seja viável criar efeitos simples.
- Feedback de interação.

### Camada de persistência

Responsável por:

- Salvamento local.
- Recuperação de dados.
- Migração entre versões de save.
- Sincronização com a nuvem.
- Detecção de conflitos.
- Recuperação de falhas.
- Exportação e importação controlada de dados, se implementadas.

### Camada de serviços

Responsável por abstrair:

- Autenticação.
- Salvamento remoto.
- Anúncios recompensados.
- Pagamentos.
- Verificação de compras.
- Analytics com respeito à privacidade.
- Configurações remotas.
- Eventos programados.

Nenhum módulo central deverá depender de um fornecedor específico quando uma interface abstrata puder permitir substituição futura.

## 5.3. Interface de serviços

Defina contratos explícitos para serviços externos, como:

- `AuthProvider`
- `SaveRepository`
- `RewardedAdProvider`
- `PaymentProvider`
- `PurchaseVerifier`
- `AnalyticsProvider`
- `RemoteConfigProvider`

Implemente adaptadores concretos somente quando as tecnologias e credenciais estiverem disponíveis.

Os adaptadores de desenvolvimento deverão ser identificados claramente como simulados.

Em ambiente de produção, uma integração não configurada deve apresentar um estado compreensível e seguro, e não conceder benefícios fictícios.

## 5.4. Backend e infraestrutura

Compare alternativas adequadas ao projeto, incluindo uma opção gerenciada como Supabase ou outra solução equivalente.

Avalie:

- Autenticação de convidados.
- Vinculação de contas.
- Banco de dados.
- Segurança por usuário.
- Políticas de acesso.
- Operações econômicas confiáveis.
- Backup e recuperação.
- Custos de uso.
- Facilidade de desenvolvimento.
- Compatibilidade com hospedagem web.
- Possibilidade de crescimento futuro.

Não crie um backend próprio complexo se uma solução gerenciada puder atender aos requisitos com menor custo e risco.

Por outro lado, não coloque no cliente a autoridade sobre operações financeiras, compras reais ou recompensas que precisam de validação confiável.

Documente a arquitetura escolhida e as responsabilidades de cada componente.

## 5.5. Compatibilidade Android

Desde o início:

- Evite dependências desnecessárias do navegador desktop.
- Trate orientação vertical como prioridade.
- Utilize controles compatíveis com toque.
- Evite hover como único mecanismo de interação.
- Preveja áreas seguras da tela.
- Garanta que menus e popups funcionem em telas pequenas.
- Centralize integrações de plataforma em adaptadores.
- Preserve a possibilidade de empacotamento com Capacitor.
- Documente diferenças futuras entre web e Android.

Não é necessário publicar um APK na primeira fase. É obrigatório evitar decisões que inviabilizem desnecessariamente essa evolução.

---

# PARTE 6 — DIREÇÃO VISUAL E EXPERIÊNCIA DE JOGO

## 6.1. Identidade visual

Utilize o estilo do asset kit como base principal da identidade visual.

A estética deve ser:

- Colorida.
- Acolhedora.
- Comercialmente atraente.
- Consistente.
- Inspirada em jogos mobile de gerenciamento.
- Visualmente legível em telas pequenas.
- Rica em feedbacks de animação sem comprometer o desempenho.

Não misture estilos gráficos incompatíveis.

Não utilize imagens aleatórias da internet para preencher espaços vazios.

Não redesenhe a identidade inteira com elementos genéricos quando os recursos oficiais já definirem uma direção visual.

Se precisar complementar o pacote, priorize recursos simples e coerentes com seu estilo, documentando sua origem e licença.

## 6.2. A torre é a tela principal

Ao abrir o jogo, o usuário deve reconhecer imediatamente que está dentro de um jogo de restaurante.

A torre deve ocupar a maior parte da área visual disponível.

A composição deverá incluir:

- Fundo urbano com céu e nuvens, conforme os assets disponíveis.
- Prédios ao fundo.
- Restaurante central.
- Andares desbloqueados.
- Andares ainda não desbloqueados.
- Funcionários em suas posições.
- Elevador.
- Caixa e elementos de atendimento.
- Veículos de entrega quando aplicável.
- Indicadores econômicos.
- Controles de progressão.
- Animações de atividade.

A câmera e o enquadramento devem manter a torre compreensível mesmo quando muitos andares estiverem desbloqueados.

Em dispositivos móveis, utilize uma composição vertical, com zoom ou rolagem controlada quando necessário. Não comprima toda a torre até que os personagens se tornem ilegíveis.

Em PC, aproveite o espaço adicional sem transformar a experiência em um painel administrativo.

## 6.3. HUD

A HUD deve priorizar as informações de maior importância:

- Dinheiro atual.
- Receita por segundo.
- Receita por minuto ou outra referência temporal clara.
- Andar atual e próximo desbloqueio.
- Progresso para a próxima meta.
- Botão de melhorias.
- Funcionários.
- Receitas.
- Missões e conquistas.
- Mapa de cidades.
- Eventos ativos.
- Acesso à loja.
- Perfil e configurações.

Não exiba todas as informações ao mesmo tempo se isso prejudicar a leitura.

Organize os sistemas secundários em menus, abas ou janelas apropriadas.

Os valores abreviados devem ter formatação consistente. O jogador deve conseguir consultar valores completos quando necessário.

## 6.4. Animações

Implemente animações para os elementos que realmente se beneficiam de movimento:

- Personagens trabalhando.
- Clientes ou elementos de atendimento, quando houver recursos apropriados.
- Elevador em movimento.
- Veículos entrando e saindo.
- Ganhos de dinheiro.
- Compra de upgrades.
- Desbloqueio de andares.
- Mudanças de cidade.
- Renascimento.
- Conclusão de missões.
- Ativação de eventos.

Se o kit não incluir animações suficientes para determinada ação, utilize animações simples de posição, escala, opacidade ou deslocamento, mantendo a coerência visual.

Não afirme que um personagem possui animação original se ela tiver sido construída artificialmente a partir de uma imagem estática.

Inclua uma configuração para reduzir efeitos ou movimento excessivo, se viável.

## 6.5. Interface de toque

Em celulares:

- Botões importantes devem ser fáceis de tocar.
- Textos devem ser legíveis.
- Popups devem respeitar as bordas da tela.
- A rolagem de menus não pode interferir indevidamente na interação com o jogo.
- Gestos não podem provocar compras acidentais.
- A loja real deve exigir confirmação adequada.
- O jogador não deve perder progresso ao alternar aplicativos ou atualizar a página.

---

# PARTE 7 — LOOP PRINCIPAL DE JOGABILIDADE

O loop central deve ser simples de compreender e profundo o suficiente para sustentar muitas horas de progressão.

1. O restaurante gera receita.
2. O jogador coleta ou recebe o dinheiro automaticamente.
3. O jogador investe em melhorias.
4. As melhorias aumentam a eficiência e a receita.
5. O jogador desbloqueia novos andares.
6. Novos andares ampliam a capacidade de geração de receita.
7. O jogador contrata ou aprimora funcionários.
8. Receitas, reputação e clientes especiais acrescentam novas camadas de progressão.
9. O jogador completa missões e conquistas.
10. A cidade chega a um limite de desenvolvimento.
11. O jogador realiza o renascimento.
12. Os Pontos de Sucesso são investidos em bônus permanentes.
13. Uma nova jornada começa com maior eficiência.
14. Novas cidades, desafios e sistemas são desbloqueados progressivamente.

O loop deve continuar funcionando mesmo quando o jogador não estiver executando ações manuais.

O jogo não deve depender de cliques repetitivos para manter sua economia.

Ao mesmo tempo, deve oferecer decisões frequentes que tornem a sessão ativa interessante.

---

# PARTE 8 — ECONOMIA E SISTEMA IDLE

## 8.1. Moedas e recursos

Implemente inicialmente as seguintes categorias:

### Dinheiro

Moeda principal para:

- Desbloquear andares.
- Comprar melhorias.
- Contratar funcionários.
- Aprimorar funcionários.
- Comprar melhorias de equipamentos.
- Desenvolver receitas.
- Financiar expansões da cidade.

### Pontos de Sucesso

Moeda permanente obtida no renascimento.

Utilizada para:

- Comprar bônus permanentes.
- Aumentar a eficiência da próxima jornada.
- Desbloquear melhorias globais.
- Reduzir determinados custos.
- Melhorar a eficiência offline, quando desbloqueada.
- Acelerar sistemas que permanecem após o reset.

### Recursos complementares

Avalie recursos adicionais somente quando tiverem uma função clara.

Por exemplo:

- Ingredientes especiais.
- Materiais para desenvolver receitas.
- Tokens de eventos.
- Créditos premium, se a monetização realmente justificar uma moeda paga.

Evite criar muitas moedas sem propósito.

Não crie uma moeda premium apenas para dificultar o progresso básico.

## 8.2. Sistema numérico

Implemente uma camada econômica centralizada.

Ela deverá suportar números elevados sem depender de cálculos imprecisos ou estourar o limite numérico do JavaScript.

Avalie uma representação de números grandes com mantissa e expoente, ou uma biblioteca apropriada.

Defina regras para:

- Soma.
- Subtração.
- Multiplicação.
- Comparação.
- Formatação.
- Conversão para exibição.
- Persistência.
- Validação.
- Limites de precisão.

Não utilize `Number` indiscriminadamente para valores econômicos que ultrapassem sua faixa segura.

Não permita que valores negativos apareçam por arredondamento ou concorrência de operações.

## 8.3. Receita

A receita deverá depender de fatores documentados.

Uma fórmula inicial possível é:

`ReceitaTotal = Soma(ReceitaBaseDosAndares × MultiplicadoresAplicáveis)`

Os multiplicadores poderão incluir:

- Nível do andar.
- Melhorias do caixa.
- Eficiência dos funcionários.
- Receitas desbloqueadas.
- Reputação.
- Bônus de cidade.
- Bônus de evento.
- Pontos de Sucesso.
- Bônus temporários.
- Melhorias permanentes.

Defina claramente quais bônus são aditivos e quais são multiplicativos.

Não permita que o mesmo bônus seja aplicado duas vezes por caminhos diferentes.

Todos os cálculos devem ser testáveis isoladamente.

## 8.4. Custos

Os custos devem crescer de forma planejada.

Avalie fórmulas exponenciais ou progressões configuráveis para:

- Desbloqueio de andares.
- Melhorias de equipamentos.
- Níveis de funcionários.
- Receitas.
- Expansões.
- Melhorias de reputação.

Não invente valores sem avaliar o impacto na progressão.

Armazene parâmetros de balanceamento em configurações centralizadas.

Documente os valores iniciais, a função de cada curva e os resultados esperados.

## 8.5. Ritmo de progressão

A progressão deve alternar entre:

- Melhorias frequentes e baratas.
- Investimentos intermediários.
- Metas maiores.
- Desbloqueios visualmente marcantes.
- Objetivos de longo prazo.

Evite que o jogador fique sem nenhuma ação útil.

Se uma melhoria estiver muito distante, ofereça alternativas estratégicas: investir em outro andar, aprimorar um funcionário, completar uma missão ou desenvolver uma receita.

Não resolva todo bloqueio econômico simplesmente exibindo um anúncio ou exigindo pagamento.

## 8.6. Simulação de tempo

Não execute milhares de atualizações por segundo apenas para calcular a economia.

Utilize uma simulação eficiente baseada no tempo decorrido e no estado econômico.

O jogo deverá calcular corretamente:

- Receita ativa.
- Receita acumulada.
- Bônus temporários.
- Eventos.
- Ganhos offline.
- Pausas.
- Retorno de segundo plano.
- Reinício da aplicação.

O cálculo não deve depender de a animação gráfica estar rodando a 60 FPS.

A economia deve permanecer consistente em dispositivos lentos e quando a aba estiver em segundo plano.

---

# PARTE 9 — ANDARES E EXPANSÃO DA TORRE

## 9.1. Estrutura inicial

A CraftPix anuncia 11 níveis de andares, de Lv0 a Lv10.

Audite os recursos reais para descobrir como cada nível foi representado e como deve ser utilizado.

Não presuma que cada nível anunciado corresponde a um arquivo PNG isolado.

Crie um catálogo de configuração para os andares, incluindo:

- Identificador.
- Nível.
- Asset visual.
- Custo de desbloqueio.
- Receita-base.
- Multiplicadores.
- Requisitos.
- Estado de desbloqueio.
- Posição na torre.
- Requisitos de funcionários.
- Requisitos de cidade, quando aplicável.

## 9.2. Desbloqueio

O jogador começará no andar inicial previsto pelo kit.

Os demais andares serão liberados progressivamente por meio de dinheiro e, se necessário, requisitos complementares.

Ao desbloquear um andar:

- Atualize o estado econômico.
- Atualize a estrutura visual.
- Recalcule a receita.
- Atualize a HUD.
- Apresente um feedback visual.
- Atualize missões e conquistas relacionadas.
- Salve o progresso.

A operação deve ser atômica do ponto de vista do jogo: ou o custo e o desbloqueio são registrados corretamente, ou nenhum dos dois é aplicado.

## 9.3. Limite de andares e expansão

Não confunda os 11 níveis de assets disponíveis com um limite obrigatório de apenas 11 andares para todo o jogo.

Use os recursos disponíveis para representar os níveis iniciais.

Quando for necessário expandir a torre além do material visual original, avalie a reutilização controlada de variantes, composições e configurações.

Não invente uma grande quantidade de andares visualmente distintos sem recursos que os sustentem.

O sistema deve permitir novas configurações futuras.

## 9.4. Melhoria do caixa

A página do kit anuncia seis níveis de melhoria do caixa.

Audite e integre todos os níveis reais disponíveis.

Implemente:

- Custo por nível.
- Efeito econômico.
- Representação visual.
- Estado bloqueado ou disponível.
- Pré-requisitos, quando houver.
- Persistência.
- Feedback ao comprar.
- Atualização de receita.

O caixa deve ser uma melhoria significativa, não apenas um botão que aumenta dinheiro sem explicação.

---

# PARTE 10 — FUNCIONÁRIOS

## 10.1. Funcionários iniciais

Utilize os personagens reais disponíveis no kit, respeitando seus papéis visuais.

A classificação inicial poderá incluir:

- Atendente ou caixa.
- Chef.
- Funcionário de andar.
- Operador do elevador.

Esses nomes devem ser confirmados durante a auditoria dos sprites.

Não atribua funções visuais que contrariem claramente o material original sem uma justificativa de design.

## 10.2. Contratação e evolução

Cada funcionário deve possuir:

- Identificador.
- Nome.
- Tipo.
- Nível.
- Custo de contratação.
- Custo de melhoria.
- Efeito-base.
- Efeito por nível.
- Multiplicadores aplicáveis.
- Estado de contratação.
- Requisitos de desbloqueio.
- Representação visual.
- Local de trabalho.

Implemente contratação, melhoria, aplicação de efeitos e persistência.

As melhorias devem possuir impacto mensurável.

Exemplos de efeitos possíveis:

- Aumento de receita.
- Redução do tempo de atendimento.
- Melhoria de eficiência do caixa.
- Aumento da eficiência do elevador.
- Bônus de reputação.
- Aumento da receita offline.

Evite que todas as melhorias façam exatamente a mesma coisa.

## 10.3. Funcionários avançados

Prepare o sistema para novos funcionários que possam ser adicionados posteriormente.

Avalie:

- Especialistas raros.
- Funcionários com bônus específicos.
- Funcionários desbloqueados por conquistas.
- Contratações especiais de eventos.
- Funcionários vinculados a cidades.

Não é necessário criar dezenas de personagens artificiais na primeira entrega. A arquitetura deve permitir expansão sem reescrever o sistema.

---

# PARTE 11 — ELEVADOR E ENTREGAS

## 11.1. Elevador

Utilize os recursos de elevador disponíveis para reforçar a percepção de atividade.

O sistema poderá possuir:

- Estado de espera.
- Movimento.
- Atendimento de andares.
- Tempo de deslocamento.
- Eficiência.
- Melhorias.
- Bônus de funcionário.
- Feedback visual.

Se o elevador for apenas decorativo em determinado momento, isso deve ser intencional e documentado.

Não crie uma simulação logística excessivamente complexa se ela não trouxer valor ao loop de jogo.

## 11.2. Veículos de entrega

A página oficial anuncia cinco variantes de veículos e animações de movimento e espera.

Audite todos os recursos reais.

Implemente os veículos em um sistema visual coerente com o restaurante.

Eles poderão representar:

- Saída de pedidos.
- Entregas concluídas.
- Aumento da capacidade de atendimento.
- Melhorias de logística.
- Bônus temporários.
- Expansão da operação.

Os veículos não precisam simular tráfego realista. O objetivo é criar feedback visual e reforçar a fantasia de um restaurante ativo.

Se a receita depender de entregas, documente a relação econômica.

Se forem apenas decorativos, não atribua a eles efeitos econômicos ocultos.

---

# PARTE 12 — RECEITAS E COLEÇÃO GASTRONÔMICA

Crie um sistema de coleção de receitas compatível com a identidade do jogo.

Cada receita deverá possuir:

- Identificador.
- Nome.
- Descrição.
- Ícone ou representação visual disponível.
- Categoria.
- Requisitos.
- Estado de descoberta.
- Custo de desenvolvimento.
- Efeito econômico.
- Nível de melhoria, se aplicável.
- Origem do desbloqueio.

As receitas poderão ser desbloqueadas por:

- Progressão da torre.
- Reputação.
- Missões.
- Conquistas.
- Eventos.
- Cidades.
- Metas de longo prazo.

Exemplos de categorias:

- Sushi tradicional.
- Rolls especiais.
- Combos.
- Receitas premium.
- Especialidades regionais.

Essas categorias são propostas de design. Não presuma que o asset kit contenha imagens específicas de todos os pratos.

Utilize os recursos existentes quando forem adequados. Se for necessário apresentar receitas sem ilustração específica, utilize uma representação visual coerente e claramente identificada.

As receitas deverão afetar a economia de maneira mensurável, sem criar multiplicadores redundantes e impossíveis de balancear.

---

# PARTE 13 — REPUTAÇÃO E CLIENTES ESPECIAIS

## 13.1. Reputação

A reputação deve representar a qualidade e o reconhecimento do restaurante.

Pode ser influenciada por:

- Andares desbloqueados.
- Níveis de funcionários.
- Receitas desenvolvidas.
- Melhorias de atendimento.
- Missões.
- Eventos.
- Conquistas.
- Marcos de cidade.

A reputação poderá desbloquear:

- Novos clientes.
- Receitas.
- Melhorias.
- Metas especiais.
- Novas cidades.
- Bônus de receita.

Evite criar um sistema de reputação que apenas exiba um número sem alterar a experiência.

## 13.2. Clientes especiais

Prepare um sistema configurável de clientes especiais.

Exemplos:

- Cliente recorrente que concede uma recompensa.
- Crítico gastronômico que aumenta a reputação.
- Cliente VIP que melhora temporariamente a receita.
- Cliente colecionador que ajuda a desbloquear uma receita.
- Cliente de evento com recompensa exclusiva.

Cada cliente especial deverá ter:

- Condições de aparição.
- Frequência controlada.
- Recompensa.
- Duração de efeito, se aplicável.
- Feedback visual.
- Regras de persistência.
- Proteção contra duplicação de recompensas.

Se o pacote não possuir sprites específicos para clientes especiais, avalie a reutilização visual permitida dos recursos disponíveis ou a criação de complementos coerentes.

Não prometa personagens visualmente únicos sem implementá-los.

---

# PARTE 14 — MISSÕES E CONQUISTAS

## 14.1. Missões

Implemente missões com objetivos claros e recompensas definidas.

Exemplos:

- Desbloquear determinado número de andares.
- Melhorar o caixa.
- Contratar um funcionário.
- Atingir uma meta de receita.
- Desenvolver uma receita.
- Alcançar um nível de reputação.
- Desbloquear uma nova cidade.
- Concluir um renascimento.

Cada missão deverá possuir:

- Identificador estável.
- Objetivo.
- Progresso atual.
- Meta.
- Condição de conclusão.
- Recompensa.
- Estado.
- Regras de disponibilidade.
- Persistência.

Não atualize missões somente quando a tela estiver aberta. Os eventos de jogo devem alimentar o sistema independentemente da interface.

## 14.2. Conquistas

Crie conquistas de curto, médio e longo prazo.

Exemplos:

- Primeiro lucro.
- Primeiro andar desbloqueado.
- Primeira contratação.
- Primeira receita descoberta.
- Primeira cidade conquistada.
- Primeiro renascimento.
- Determinado número de renascimentos.
- Meta de receita acumulada.
- Coleção de receitas concluída.
- Reputação máxima de uma cidade.

As conquistas devem ser persistentes e não podem ser concedidas repetidamente quando deveriam ser únicas.

Separe conquistas globais das conquistas específicas de uma cidade.

---

# PARTE 15 — EVENTOS E BÔNUS TEMPORÁRIOS

## 15.1. Eventos aleatórios

Implemente eventos temporários que tornem a experiência menos previsível.

Exemplos:

- Movimento excepcional de clientes.
- Festival gastronômico.
- Dia de alta demanda.
- Promoção de receitas.
- Visita de cliente especial.
- Bônus de eficiência do caixa.
- Evento de entregas.
- Bônus temporário de receita.

Cada evento deverá definir:

- Identificador.
- Nome.
- Descrição.
- Condições de elegibilidade.
- Duração.
- Frequência.
- Efeito econômico.
- Recompensas.
- Regras de encerramento.
- Persistência necessária.

A aleatoriedade deverá ser controlada. Não faça eventos aparecerem em sequência excessiva ou desaparecerem antes que o jogador possa compreendê-los.

## 15.2. Exemplo obrigatório: anúncio por 30 minutos de lucro dobrado

Implemente um evento no qual o jogador possa assistir a um anúncio recompensado para receber:

**30 minutos de lucro em dobro.**

Regras:

1. O jogador deve compreender a recompensa antes de aceitar.
2. O bônus só poderá ser concedido após confirmação válida de que o anúncio recompensado foi concluído.
3. O fechamento prematuro do anúncio não poderá conceder o benefício.
4. Falhas de rede não poderão resultar em recompensas duplicadas.
5. O bônus deverá possuir início e término persistentes.
6. O jogo deverá continuar calculando corretamente o tempo restante após fechar e reabrir a página.
7. O bônus deverá ser aplicado a uma camada claramente definida da fórmula econômica.
8. Não deverá duplicar o próprio bônus nem ser aplicado duas vezes à mesma receita.
9. O jogador deverá visualizar o bônus ativo e o tempo restante.
10. Se não houver integração real de anúncios configurada, o jogo deverá informar que a funcionalidade ainda não está disponível naquele ambiente.

O bônus não poderá ser concedido simplesmente porque o jogador clicou em um botão chamado "Assistir anúncio".

## 15.3. Outros bônus recompensados

Prepare a arquitetura para:

- Recompensa de retorno.
- Bônus temporário de eficiência.
- Aceleração de progresso.
- Recompensas por conclusão de eventos.
- Dobro de ganhos offline, caso seja economicamente equilibrado.

Cada bônus deve ter limites, condições e regras de acumulação documentados.

Não permita que o jogador mantenha indefinidamente um bônus temporário por meio de manipulação do relógio.

---

# PARTE 16 — SISTEMA DE RENASCIMENTO E PONTOS DE SUCESSO

Este é um dos sistemas centrais do produto.

## 16.1. Objetivo

Quando o jogador concluir o desenvolvimento de uma cidade, deverá poder reiniciar sua trajetória empresarial em uma nova cidade.

O renascimento não deve parecer uma punição. Ele representa a oportunidade de iniciar um novo empreendimento com a experiência acumulada.

O jogador perderá grande parte da progressão econômica da cidade atual, mas receberá Pontos de Sucesso para investir em bônus que permanecerão nas jornadas futuras.

## 16.2. Condições de renascimento

Defina uma condição explícita de conclusão da cidade.

Ela poderá considerar:

- Andares exigidos.
- Melhorias obrigatórias.
- Meta de receita.
- Reputação.
- Missões principais.
- Outros marcos específicos da cidade.

A condição deve ser visível antes de ser concluída.

Não permita renascimento acidental por um simples clique sem confirmação.

## 16.3. Recompensa

A quantidade de Pontos de Sucesso deverá depender da progressão efetivamente conquistada.

Crie uma fórmula documentada e testável.

Considere fatores como:

- Nível de desenvolvimento.
- Marcos concluídos.
- Reputação.
- Metas especiais.
- Dificuldade da cidade.

Evite recompensar o jogador exclusivamente pelo tempo em que deixou a aplicação aberta.

A fórmula deverá impedir que pequenos ciclos de renascimento gerem mais pontos do que uma jornada substancial sem uma justificativa de balanceamento.

## 16.4. O que será reiniciado

Após confirmar o renascimento:

- O dinheiro atual deverá voltar ao valor inicial da nova cidade.
- A torre deverá retornar ao estado inicial.
- Os andares locais deverão ser reiniciados.
- As melhorias locais deverão ser reiniciadas.
- Os níveis e contratações temporárias da cidade deverão ser redefinidos conforme as regras estabelecidas.
- Os objetivos locais deverão voltar ao início.
- A cidade de destino deverá ser registrada.
- Os Pontos de Sucesso recebidos deverão ser adicionados ao saldo permanente.
- Os bônus permanentes deverão continuar ativos.
- As conquistas globais deverão permanecer.
- As coleções globais deverão permanecer quando assim definido no sistema.
- Os dados necessários para auditoria e integridade deverão ser preservados.

A política final de preservação deve ser documentada em `docs/game-design/PRESTIGE_SYSTEM.md`.

## 16.5. Nova cidade

O jogador deverá iniciar a nova cidade com pouco dinheiro e no nível inicial da torre.

Novas cidades poderão oferecer:

- Metas econômicas maiores.
- Custos diferentes.
- Multiplicadores próprios.
- Novos desafios.
- Eventos regionais.
- Novas receitas.
- Requisitos de reputação.
- Variações visuais quando os assets permitirem.

Não crie diferenças de cidade que existam apenas no nome. Cada cidade deve apresentar uma razão de progressão, ainda que as diferenças iniciais sejam principalmente econômicas.

## 16.6. Árvore de Pontos de Sucesso

Crie uma árvore ou painel de melhorias permanentes.

Categorias sugeridas:

- Receita global.
- Velocidade de progressão.
- Eficiência de funcionários.
- Eficiência de melhorias.
- Ganhos offline.
- Redução controlada de custos.
- Bônus de reputação.
- Bônus de receita inicial.
- Benefícios específicos de determinadas mecânicas.

Cada melhoria deverá possuir:

- Custo em Pontos de Sucesso.
- Efeito.
- Limite de níveis.
- Pré-requisitos.
- Descrição.
- Fórmula.
- Persistência.
- Testes.

O sistema deverá impedir a compra de melhorias sem saldo suficiente.

O bônus permanente não poderá ser aplicado duas vezes após um carregamento ou renascimento.

## 16.7. Balanceamento

O primeiro renascimento deve ser alcançável sem exigir monetização.

Os seguintes deverão manter uma curva de progressão interessante.

A quantidade de bônus permanentes não deve tornar as cidades avançadas triviais, mas também não deve tornar o progresso excessivamente lento.

Implemente simulações automatizadas de jornadas e renascimentos para identificar:

- Tempo até o primeiro renascimento.
- Tempo estimado entre renascimentos.
- Crescimento dos Pontos de Sucesso.
- Efeito dos bônus permanentes.
- Custos acumulados.
- Possíveis estratégias de exploração econômica.

Documente as premissas e os resultados.

---

# PARTE 17 — GANHOS OFFLINE E RETORNO AO JOGO

O jogo deve gerar progresso mesmo quando estiver fechado.

## 17.1. Cálculo

No momento em que o jogador retorna, calcule o tempo decorrido desde o último salvamento válido.

Utilize o estado econômico persistido e a regra de receita offline.

Não simule indiscriminadamente todos os segundos perdidos.

Não conceda ganhos ilimitados.

Defina um limite inicial de tempo offline e permita que bônus permanentes ou melhorias ampliem esse limite de maneira controlada.

## 17.2. Janela de retorno

Utilize o popup de ganhos offline do kit, quando disponível e adequado.

A janela deverá mostrar:

- Tempo ausente.
- Receita-base calculada.
- Bônus aplicados.
- Valor final concedido.
- Possibilidade de multiplicar a recompensa por anúncio, se a integração real permitir.

O jogador deve conseguir entender como o valor foi calculado.

## 17.3. Segurança

Proteja o sistema contra:

- Recompensa concedida duas vezes.
- Recarregamento repetido.
- Mudança de relógio.
- Valores negativos.
- Saves corrompidos.
- Cálculos que excedam limites definidos.

Em modo local, utilize controles de consistência, sabendo que o relógio e os dados do dispositivo não são uma fonte confiável contra manipulação.

Em modo conectado, use validação no servidor para operações que exijam confiança.

Não prometa proteção antifraude perfeita em um modo totalmente offline.

---

# PARTE 18 — CONTA DE CONVIDADO E SALVAMENTO EM NUVEM

## 18.1. Modo convidado

O jogador deverá conseguir iniciar sem criar uma conta tradicional.

No primeiro acesso:

1. Inicialize o estado do jogo.
2. Crie um identificador local apropriado.
3. Salve o progresso no dispositivo.
4. Permita jogar normalmente.
5. Informe que o progresso está salvo localmente.

O jogo não deverá bloquear a experiência básica por falta de conta.

## 18.2. Vinculação de conta

Implemente uma opção para vincular o progresso a uma conta.

Avalie os provedores de autenticação disponíveis e compatíveis com a plataforma escolhida.

A vinculação deverá:

- Preservar o progresso existente.
- Evitar a criação acidental de duas contas para a mesma pessoa.
- Identificar conflitos entre saves.
- Apresentar opções claras de resolução.
- Impedir que uma falha de rede apague o progresso local.
- Permitir recuperação de acesso conforme os recursos do provedor.

Não sobrescreva automaticamente um save local com um save remoto sem uma política documentada.

## 18.3. Salvamento local

Implemente:

- Salvamento automático.
- Salvamento após operações importantes.
- Recuperação de estado.
- Versionamento.
- Migrações.
- Validação dos dados.
- Recuperação de save inválido, quando possível.
- Tratamento de quota excedida.
- Indicador de estado de sincronização.

Evite gravar o estado inteiro a cada frame.

## 18.4. Nuvem

Quando o backend estiver configurado, implemente sincronização confiável.

O sistema deverá considerar:

- Identidade do usuário.
- Versão do save.
- Data de atualização.
- Integridade.
- Conflitos.
- Operações pendentes.
- Recuperação após falha.
- Controle de acesso.

Não confie em valores econômicos enviados pelo cliente para validar compras reais ou recompensas sensíveis.

Documente quais sistemas podem funcionar localmente e quais dependem de conexão.

---

# PARTE 19 — MONETIZAÇÃO REAL

A monetização deve ser integrada à experiência sem comprometer o equilíbrio do jogo.

## 19.1. Princípio

Implementar os pontos de integração desde a arquitetura, mas ativar os serviços reais somente quando houver configuração válida, compatibilidade técnica e condições de uso atendidas.

Não inventar:

- IDs de anúncios válidos.
- Credenciais.
- Produtos publicados.
- Compras aprovadas.
- Assinaturas ativas.
- Pagamentos confirmados.
- Receitas obtidas.
- Integrações externas concluídas.

## 19.2. Anúncios recompensados

Avalie soluções de anúncios que ofereçam suporte real à plataforma de publicação.

Considere que anúncios recompensados são comuns em aplicativos móveis, mas nem todos os provedores disponibilizam um formato equivalente para um jogo executado diretamente no navegador.

Não assuma que um SDK Android funcionará em um site.

Crie uma abstração para o provedor de anúncios e documente:

- Plataforma suportada.
- Tipo de anúncio.
- Fluxo de exibição.
- Confirmação de recompensa.
- Tratamento de cancelamento.
- Tratamento de falhas.
- Limites de frequência.
- Regras de consentimento.
- Ambiente de testes.
- Ambiente de produção.

Se uma plataforma não oferecer suporte ao formato desejado, apresente alternativas concretas, como integração via aplicativo Android futuro, desde que sejam compatíveis com as regras do fornecedor.

## 19.3. Microtransações

Avalie provedores compatíveis com a publicação web e o mercado brasileiro, como Stripe ou Mercado Pago, quando adequados aos requisitos do produto.

Não escolha um provedor apenas por familiaridade. Verifique disponibilidade, taxas, requisitos, regras de uso e integração.

Prepare uma loja para itens como:

- Pacotes de recursos.
- Cosméticos, se houver conteúdo visual adequado.
- Benefícios de conveniência.
- Pacotes de apoio ao desenvolvimento.
- Produtos digitais claramente descritos.

Não coloque o progresso básico atrás de pagamento.

Não crie produtos premium sem efeito ou conteúdo real.

## 19.4. Verificação de compras

Quando houver compras reais, implemente o fluxo adequado:

1. O usuário inicia a compra.
2. O provedor processa o pagamento.
3. A transação é confirmada de maneira confiável.
4. O backend valida a compra quando necessário.
5. A concessão do benefício é registrada.
6. A transação recebe um identificador único.
7. A recompensa não pode ser duplicada.
8. O histórico fica disponível para auditoria.
9. Falhas e reembolsos são tratados conforme as capacidades do provedor.

Não conceda produtos digitais com base exclusivamente em uma resposta manipulável do navegador.

## 19.5. Política comercial

A loja deve:

- Mostrar preços e benefícios com clareza.
- Não esconder custos.
- Não induzir compras acidentais.
- Não apresentar falsas urgências.
- Não prometer vantagens inexistentes.
- Não exigir pagamento para corrigir uma falha de salvamento.
- Não oferecer compras que dependam de sistemas ainda não implementados.

Se houver bônus aleatórios pagos, avalie separadamente as obrigações legais, a transparência e a compatibilidade com as políticas das plataformas. Não implemente esse tipo de sistema automaticamente.

## 19.6. Modo de desenvolvimento

Em desenvolvimento, permita testar os fluxos sem cobrar dinheiro real.

Os simuladores deverão ser explicitamente identificados.

Em produção:

- Desative concessões fictícias.
- Bloqueie endpoints de teste.
- Valide as configurações obrigatórias.
- Não exponha credenciais privadas.
- Não declare monetização real ativa sem comprovação.

Crie `docs/monetization/MONETIZATION.md` e `docs/monetization/RELEASE_CHECKLIST.md`.

---

# PARTE 20 — LOJA E INTERFACE DE MELHORIAS

O asset kit inclui recursos de loja, melhorias e ícones de compras. Audite todos eles e determine sua utilização.

Implemente interfaces funcionais para:

- Melhorias do restaurante.
- Contratação de funcionários.
- Melhorias de funcionários.
- Receitas.
- Expansões.
- Bônus permanentes.
- Loja premium, quando habilitada.
- Recompensas de eventos.

A loja deve apresentar:

- Nome.
- Efeito.
- Custo.
- Estado atual.
- Requisitos.
- Próximo nível.
- Indicador de disponibilidade.
- Confirmação, quando apropriado.

As compras deverão atualizar o estado econômico de forma consistente.

Se uma compra não puder ser realizada, explique por quê.

Não use um botão desabilitado sem uma explicação quando a causa puder ser apresentada claramente.

---

# PARTE 21 — MAPA DE CIDADES

O mapa de cidades do kit deve ser integrado ao fluxo de expansão.

Audite os recursos de:

- Mapa.
- Marcadores disponíveis.
- Marcadores bloqueados.
- Ícones de cadeado.
- Placas.
- Elementos de seleção.

A interface deve mostrar:

- Cidade atual.
- Cidade seguinte.
- Requisitos para desbloqueio.
- Estado de progressão.
- Metas da cidade.
- Benefícios e desafios.
- Opção de renascimento, quando elegível.

A seleção de uma cidade bloqueada deverá informar os requisitos.

Não permita entrar em uma cidade sem cumprir as condições necessárias.

O mapa deverá refletir o progresso real do jogador.

A arquitetura deverá permitir adicionar cidades por configuração, sem alterar o núcleo econômico.

---

# PARTE 22 — EVENTOS SAZONAIS

Prepare a arquitetura para eventos sazonais, incluindo datas e duração configuráveis.

Exemplos de temas futuros:

- Festival de sushi.
- Celebração de verão.
- Evento de inverno.
- Aniversário do jogo.
- Eventos gastronômicos especiais.

Cada evento poderá oferecer:

- Missões.
- Receitas.
- Bônus temporários.
- Clientes especiais.
- Conquistas.
- Recompensas cosméticas.
- Objetivos coletivos locais, se fizer sentido para o produto.

Não dependa exclusivamente do relógio local para validar eventos competitivos ou recompensas sensíveis.

Eventos futuros deverão poder ser ativados por configuração remota quando a infraestrutura existir.

Não exija multiplayer para implementar eventos sazonais.

---

# PARTE 23 — CONFIGURAÇÕES, ACESSIBILIDADE E QUALIDADE DE VIDA

Implemente as opções compatíveis com os recursos disponíveis:

- Volume de áudio.
- Música.
- Efeitos sonoros.
- Redução de animações.
- Qualidade visual.
- Formatação de números.
- Preferências de exibição.
- Idioma, caso seja viável estabelecer uma arquitetura de localização.
- Opções de conta.
- Sincronização.
- Privacidade.
- Créditos.
- Informações sobre o projeto.

Não implemente controles decorativos que não alterem o comportamento correspondente.

Se uma opção ainda não estiver disponível, não a apresente como funcional.

Prepare o sistema para internacionalização, mas priorize o português brasileiro na primeira versão.

Utilize textos claros e consistentes.

---

# PARTE 24 — SALVAMENTO, INTEGRIDADE E SEGURANÇA

## 24.1. Modelo de dados

Crie um modelo de estado do jogo com estruturas claras para:

- Perfil.
- Cidade atual.
- Dinheiro.
- Andares.
- Funcionários.
- Melhorias.
- Receitas.
- Reputação.
- Missões.
- Conquistas.
- Eventos.
- Bônus temporários.
- Pontos de Sucesso.
- Bônus permanentes.
- Histórico de renascimentos.
- Ganhos offline.
- Configurações.
- Informações de sincronização.

Separe dados derivados de dados persistidos.

Não persista valores que possam ser recalculados com segurança sem necessidade.

## 24.2. Migração

Toda alteração estrutural importante no save deve possuir estratégia de migração.

Um save de versão anterior não poderá ser invalidado silenciosamente por uma atualização.

Implemente testes de migração.

Se um save estiver corrompido, tente recuperar o último estado válido quando possível e apresente um erro compreensível.

## 24.3. Integridade econômica

Centralize operações como:

- Comprar upgrade.
- Contratar funcionário.
- Desbloquear andar.
- Desenvolver receita.
- Comprar bônus permanente.
- Receber recompensa.
- Realizar renascimento.

Cada operação deverá verificar requisitos, aplicar custos e efeitos e registrar o resultado de maneira consistente.

No modo conectado, operações sensíveis deverão receber validação adequada do servidor.

Não considere o cliente confiável para determinar o resultado de pagamentos reais.

## 24.4. Segurança

Implemente:

- Validação de entradas.
- Controle de acesso.
- Proteção de segredos.
- Regras de autorização.
- Políticas de acesso ao banco.
- Rate limiting quando aplicável.
- Proteção contra concessões repetidas.
- Logs sem exposição de informações sensíveis.
- Separação entre ambientes.
- Configuração segura de produção.

Não inclua chaves privadas em arquivos versionados.

Utilize `.env.example` com nomes de variáveis e valores fictícios claramente identificados.

Documente as configurações necessárias para que o diretor possa ativar os serviços externos.

---

# PARTE 25 — DESEMPENHO E COMPATIBILIDADE

O jogo deve funcionar bem em dispositivos móveis modestos e navegadores modernos.

Priorize:

- Carregamento inicial razoável.
- Assets otimizados.
- Carregamento sob demanda quando útil.
- Compressão de imagens.
- Evitar duplicação de texturas.
- Controle de animações.
- Limpeza de recursos não utilizados.
- Atualizações econômicas eficientes.
- Interface responsiva.
- Tratamento de perda de conexão.
- Recuperação após retorno à aba.
- Funcionamento em diferentes proporções de tela.

Não sacrifique a identidade visual por otimizações prematuras.

Meça antes de complicar a arquitetura.

Documente as metas de desempenho escolhidas e os resultados medidos.

---

# PARTE 26 — DOCUMENTAÇÃO VIVA

A documentação faz parte do produto e deverá ser atualizada ao longo do desenvolvimento.

## 26.1. Estrutura mínima

Crie ou adapte a seguinte estrutura:

`README.md`

Visão geral, requisitos, instalação, execução e links para documentação.

`AI_STATE.md`

Estado atual, fase, progresso real, decisões, pendências e próximo passo.

`docs/CONSTITUTION.md`

Constituição do projeto, visão, pilares e regras inegociáveis.

`docs/PROJECT_AUDIT.md`

Auditoria inicial e problemas encontrados.

`docs/PROJECT_ROADMAP.md`

Fases, dependências, critérios de aceitação e estado de conclusão.

`docs/ARCHITECTURE.md`

Arquitetura, módulos, fluxos e decisões técnicas.

`docs/DATA_MODEL.md`

Modelo de dados e relações entre entidades.

`docs/GAME_DESIGN/GAME_DESIGN_DOCUMENT.md`

Documento principal de design do jogo.

`docs/GAME_DESIGN/ECONOMY.md`

Fórmulas, custos, receitas, progressão e balanceamento.

`docs/GAME_DESIGN/FLOORS_AND_STAFF.md`

Andares, caixa, funcionários e melhorias.

`docs/GAME_DESIGN/RECIPES_AND_REPUTATION.md`

Receitas, reputação e clientes especiais.

`docs/GAME_DESIGN/PRESTIGE_SYSTEM.md`

Renascimento, cidades e Pontos de Sucesso.

`docs/GAME_DESIGN/OFFLINE_PROGRESS.md`

Ganhos offline e bônus temporários.

`docs/GAME_DESIGN/MISSIONS_AND_EVENTS.md`

Missões, conquistas e eventos.

`docs/assets/ASSET_INVENTORY.md`

Inventário dos recursos gráficos.

`docs/assets/ASSET_USAGE_MATRIX.md`

Relação entre assets e funcionalidades.

`docs/assets/ASSET_LICENSES.md`

Licenças e obrigações.

`docs/monetization/MONETIZATION.md`

Estratégia de monetização e integrações.

`docs/monetization/RELEASE_CHECKLIST.md`

Verificação de anúncios, pagamentos e publicação.

`docs/TESTING.md`

Estratégia e procedimentos de teste.

`docs/DEPLOYMENT.md`

Build, hospedagem, ambientes e publicação.

`docs/SECURITY.md`

Segurança, dados e ameaças relevantes.

`docs/CHANGELOG.md`

Histórico de alterações relevantes.

`docs/decisions/`

Registros de decisões arquiteturais.

A estrutura poderá ser ampliada ou adaptada, mas nenhum assunto essencial deverá ficar sem documentação.

## 26.2. Regras do AI_STATE.md

Atualize `AI_STATE.md` no início e ao final de cada etapa.

O arquivo deverá registrar:

- Fase atual.
- Última etapa concluída.
- Último commit relevante.
- Estado do push.
- Funcionalidades implementadas.
- Funcionalidades testadas.
- Testes aprovados.
- Testes reprovados.
- Problemas conhecidos.
- Integrações externas pendentes.
- Credenciais ou configurações que o diretor precisará fornecer, sem registrar os segredos.
- Decisões recentes.
- Próximas tarefas ordenadas por prioridade.
- Caminho para continuar o trabalho.

Nunca marque uma tarefa como concluída apenas porque o código foi escrito.

Distinga claramente:

- Planejado.
- Em desenvolvimento.
- Implementado.
- Testado.
- Validado.
- Bloqueado.
- Publicado.

Não use percentuais de progresso arbitrários. Se apresentar um percentual, explique como foi calculado.

## 26.3. Documentação sincronizada com o código

Quando uma funcionalidade mudar:

1. Atualize a implementação.
2. Atualize os testes.
3. Atualize a documentação afetada.
4. Atualize o inventário de assets, se necessário.
5. Atualize `AI_STATE.md`.
6. Registre a alteração no changelog, quando relevante.

A documentação não pode descrever uma funcionalidade que não existe no código.

---

# PARTE 27 — ESTRATÉGIA DE TESTES

## 27.1. Testes unitários

Crie testes para:

- Cálculo de receita.
- Cálculo de custos.
- Multiplicadores.
- Formatação de números.
- Compra de upgrades.
- Contratação.
- Desbloqueio de andares.
- Receitas.
- Reputação.
- Missões.
- Conquistas.
- Eventos.
- Bônus temporários.
- Ganhos offline.
- Renascimento.
- Pontos de Sucesso.
- Bônus permanentes.
- Migração de saves.

## 27.2. Testes de integração

Verifique:

- Persistência local.
- Recuperação de save.
- Sincronização.
- Autenticação.
- Resolução de conflitos.
- Integrações de monetização em ambiente de teste.
- Validação de recompensas.
- Processamento de compras.
- Autorização de operações.

Quando serviços externos não estiverem configurados, teste os contratos e os estados de indisponibilidade, sem afirmar que a integração real foi validada.

## 27.3. Testes de interface

Verifique:

- Navegação.
- Botões.
- Popups.
- Menus.
- Feedback visual.
- Responsividade.
- Interações por toque.
- Estados vazios.
- Erros de conexão.
- Carregamento.
- Recuperação de falhas.

## 27.4. Testes econômicos prolongados

Crie simulações automatizadas de sessões de jogo.

Verifique:

- Crescimento de receita.
- Progressão de custos.
- Tempo entre upgrades.
- Tempo até o desbloqueio de andares.
- Tempo até o primeiro renascimento.
- Crescimento de Pontos de Sucesso.
- Impacto de bônus permanentes.
- Efeito dos ganhos offline.
- Estratégias dominantes.
- Possibilidade de crescimento econômico descontrolado.

Não invente que a economia está balanceada sem executar simulações ou apresentar evidências.

## 27.5. Build e validação

Ao final de cada fase, execute os testes disponíveis e valide:

- Instalação de dependências.
- TypeScript.
- Lint.
- Testes unitários.
- Testes de integração aplicáveis.
- Build de produção.
- Verificação de assets.
- Verificação de arquivos e configurações sensíveis.

Se alguma verificação falhar, investigue e corrija antes de declarar a fase concluída.

---

# PARTE 28 — GIT E GITHUB: REGRA DE CONTINUIDADE

O repositório oficial é a fonte de verdade do projeto.

URL:

https://github.com/marmitero/Sushiventure-Idle-Tycoon

## 28.1. Fluxo obrigatório por etapa

Para cada etapa de desenvolvimento:

1. Confirme a branch e o estado do repositório.
2. Verifique se existem alterações locais importantes.
3. Atualize o plano e o estado da etapa.
4. Implemente uma unidade coerente de trabalho.
5. Execute os testes pertinentes.
6. Corrija os problemas encontrados.
7. Revise o diff.
8. Verifique se arquivos sensíveis ou desnecessários foram incluídos.
9. Atualize a documentação.
10. Atualize `AI_STATE.md`.
11. Crie um commit com mensagem clara.
12. Realize push para a branch correta.
13. Confirme que o push foi concluído.
14. Registre o commit e o estado remoto na documentação.

Não acumule todas as alterações do projeto para publicar apenas no final.

## 28.2. Quando não for possível fazer push

Se o ambiente não tiver acesso de escrita ao GitHub:

- Não alegue que o push foi realizado.
- Preserve os arquivos modificados.
- Informe a causa específica, quando identificável.
- Registre o último commit local.
- Registre o que falta para publicar.
- Não tente contornar autenticação de forma insegura.
- Continue o trabalho que não depender do acesso remoto.

Se o repositório remoto divergir do ambiente local, reconcilie as alterações com cuidado. Não sobrescreva trabalho remoto válido.

## 28.3. Proteção do histórico

Não utilize comandos destrutivos para forçar uma publicação.

Não apague branches ou commits sem necessidade e autorização apropriada.

Não versione:

- Tokens.
- Senhas.
- Chaves privadas.
- Credenciais de produção.
- Dumps contendo dados pessoais.
- Arquivos de build desnecessários.
- Dependências que não devam ser versionadas.

Mantenha o histórico compreensível e as mudanças revisáveis.

---

# PARTE 29 — PLANO DE EXECUÇÃO POR FASES

O projeto deve ser desenvolvido por etapas. Cada fase deverá terminar com uma entrega verificável, documentação atualizada, testes e publicação das alterações quando o ambiente permitir.

A sequência pode ser ajustada se houver dependências técnicas justificadas, mas as entregas não podem ser simplesmente ignoradas.

## FASE 0 — Auditoria e preparação

Objetivos:

- Auditar GitHub.
- Inspecionar todos os assets.
- Verificar licenças.
- Avaliar o código existente.
- Definir arquitetura.
- Criar documentação inicial.
- Configurar ferramentas de desenvolvimento.
- Criar critérios de aceitação.

Entregáveis:

- Inventário dos assets.
- Matriz de utilização.
- Auditoria técnica.
- Constituição.
- Arquitetura.
- Roadmap.
- `AI_STATE.md`.

Critério de aceitação: o projeto deve possuir uma direção técnica documentada e uma compreensão real do conteúdo disponível.

## FASE 1 — Fundação técnica e primeiro jogo executável

Objetivos:

- Configurar a aplicação.
- Implementar a cena principal.
- Carregar os assets.
- Construir a torre inicial.
- Implementar a HUD.
- Configurar o redimensionamento.
- Implementar navegação básica.
- Estabelecer o fluxo de build.

Entregável: uma versão executável que já se comporte visualmente como um jogo.

Critério de aceitação: a aplicação deve iniciar sem erros, mostrar a torre e funcionar em diferentes tamanhos de tela.

## FASE 2 — Loop econômico e progressão inicial

Objetivos:

- Dinheiro.
- Receita automática.
- Receita por segundo.
- Andares.
- Melhorias do caixa.
- Custos.
- Compras.
- Atualização visual.
- Persistência local inicial.

Critério de aceitação: o jogador deve conseguir iniciar, gerar receita, comprar melhorias, desbloquear conteúdo e preservar o progresso após recarregar a página.

## FASE 3 — Funcionários, elevador e entregas

Objetivos:

- Contratação.
- Melhoria de funcionários.
- Aplicação de bônus.
- Animações.
- Elevador.
- Veículos.
- Atualização econômica.
- Persistência.

Critério de aceitação: cada sistema deverá possuir efeito real e verificável no jogo.

## FASE 4 — Ganhos offline e qualidade de vida

Objetivos:

- Cálculo offline.
- Popup de retorno.
- Limites.
- Bônus.
- Salvamento confiável.
- Tratamento de falhas.
- Configurações básicas.

Critério de aceitação: os ganhos offline devem ser calculados corretamente e não podem ser concedidos duas vezes por recarregamento.

## FASE 5 — Receitas, reputação, missões e conquistas

Objetivos:

- Coleção de receitas.
- Efeitos econômicos.
- Reputação.
- Clientes especiais.
- Missões.
- Conquistas.
- Persistência.
- Testes.

Critério de aceitação: os sistemas deverão interagir com o loop principal e possuir objetivos e recompensas funcionais.

## FASE 6 — Cidades e renascimento

Objetivos:

- Mapa.
- Estados das cidades.
- Condições de conclusão.
- Renascimento.
- Pontos de Sucesso.
- Árvore de bônus permanentes.
- Reinício da economia local.
- Preservação dos dados globais.
- Balanceamento automatizado.

Critério de aceitação: o ciclo de renascimento deve funcionar integralmente, incluindo a persistência dos bônus e a progressão na nova cidade.

## FASE 7 — Eventos e bônus temporários

Objetivos:

- Eventos aleatórios.
- Eventos sazonais.
- Temporizadores.
- Bônus de receita.
- Eventos especiais.
- Integração com missões.
- Proteção contra duplicações.

Critério de aceitação: os eventos devem iniciar, permanecer ativos pelo período correto, terminar corretamente e atualizar a economia sem inconsistências.

## FASE 8 — Contas e salvamento em nuvem

Objetivos:

- Conta de convidado.
- Vinculação.
- Autenticação.
- Persistência remota.
- Migrações.
- Conflitos.
- Segurança.
- Recuperação.

Critério de aceitação: o progresso deverá ser preservado em situações normais de conexão, reconexão e vinculação de conta.

## FASE 9 — Monetização real

Objetivos:

- Provedor de anúncios compatível.
- Fluxos de anúncios recompensados.
- Loja.
- Integração de pagamentos.
- Verificação de compras.
- Concessão de produtos.
- Reembolsos e erros, conforme suporte do provedor.
- Configurações de produção.
- Documentação comercial.

Critério de aceitação: somente os serviços efetivamente configurados e testados poderão ser marcados como operacionais.

Se credenciais ou aprovação externa estiverem pendentes, mantenha essa fase parcialmente concluída, com os bloqueios explicitamente registrados.

## FASE 10 — Polimento, balanceamento e testes finais

Objetivos:

- Revisão visual.
- Otimização.
- Balanceamento.
- Testes prolongados.
- Responsividade.
- Tratamento de erros.
- Segurança.
- Acessibilidade.
- Revisão de todos os assets.
- Correção de problemas encontrados.

Critério de aceitação: os sistemas principais deverão funcionar juntos, sem falhas críticas conhecidas.

## FASE 11 — Preparação para publicação

Objetivos:

- Build de produção.
- Configurações de hospedagem.
- PWA.
- Política de privacidade, conforme o tratamento de dados.
- Termos de uso, quando necessários.
- Créditos e licenças.
- Configurações reais de serviços.
- Checklist de publicação.
- Documentação de operação.
- Preparação futura para Android.

Critério de aceitação: o projeto deverá estar pronto para publicação nas condições documentadas, sem apresentar serviços não configurados como funcionais.

A publicação efetiva só deverá ser declarada quando tiver sido realmente realizada e verificada.

---

# PARTE 30 — CRITÉRIOS GLOBAIS DE ACEITAÇÃO

O projeto não poderá ser considerado concluído enquanto os requisitos aplicáveis abaixo não forem atendidos.

## Jogabilidade

- A torre funciona como cenário central.
- Os andares são desbloqueados.
- A economia gera receita automaticamente.
- Melhorias alteram os resultados.
- Funcionários possuem efeitos reais.
- A progressão é persistente.
- O jogo funciona após recarregar.
- O jogador pode realizar renascimento.
- Os Pontos de Sucesso são permanentes.
- As cidades possuem progressão configurável.
- Os ganhos offline funcionam corretamente.
- Missões e conquistas reconhecem eventos reais do jogo.
- Receitas e reputação participam da progressão.
- Eventos temporários respeitam suas regras.

## Visual

- Os assets reais foram inventariados.
- Os recursos obrigatórios do pacote foram integrados às funções correspondentes.
- Os recursos utilizados possuem referências rastreáveis.
- A torre permanece legível em telas pequenas.
- A interface é consistente.
- Animações não prejudicam a jogabilidade.
- Não existem placeholders críticos escondendo funcionalidades obrigatórias.

## Técnica

- O projeto possui estrutura documentada.
- O build funciona.
- Os testes essenciais passam.
- Os saves possuem versão.
- As migrações são testadas.
- As operações econômicas são consistentes.
- Os serviços externos estão corretamente abstraídos.
- As falhas de conexão são tratadas.
- Os segredos não estão expostos.
- O repositório está organizado.

## Monetização

- Os adaptadores estão documentados.
- O modo de teste está identificado.
- Compras não são concedidas sem validação adequada.
- Anúncios não concedem recompensas por simples clique.
- As limitações de plataforma são documentadas.
- Integrações reais não são declaradas sem evidência.
- As configurações de produção são verificadas.

## Documentação e continuidade

- O `README.md` está atualizado.
- O `AI_STATE.md` representa o estado real.
- A documentação de arquitetura está atualizada.
- O inventário de assets está atualizado.
- O changelog está atualizado.
- O estado dos testes está documentado.
- As pendências estão registradas.
- O histórico Git está preservado.
- O push foi confirmado quando havia acesso disponível.

---

# PARTE 31 — PROTOCOLO DE COMUNICAÇÃO COM O DIRETOR

Ao terminar cada etapa, produza um relatório objetivo contendo:

**1. Etapa concluída**

Nome da fase e objetivo.

**2. Implementações**

O que realmente foi implementado.

**3. Assets integrados**

Quais recursos foram incorporados e onde são utilizados.

**4. Testes**

Quais comandos foram executados, quantos testes passaram e quais falharam.

**5. Build**

Se a compilação foi concluída com sucesso.

**6. GitHub**

Branch, commit, resultado do push e eventuais bloqueios.

**7. Documentação**

Arquivos atualizados.

**8. Pendências**

Problemas conhecidos, serviços externos não configurados e decisões que dependem do diretor.

**9. Próxima etapa**

Qual será o próximo trabalho e quais dependências existem.

Não use expressões vagas como "tudo funcionando" sem apresentar evidências.

Não declare uma fase concluída quando os critérios de aceitação ainda não foram cumpridos.

Se houver uma falha, explique o problema, o impacto e o plano de correção.

---

# PARTE 32 — ORDEM FINAL DE EXECUÇÃO

Agora, comece pela FASE 0.

Não comece construindo menus genéricos. Não substitua a auditoria por uma estrutura de pastas criada às pressas. Não escreva milhares de linhas de código antes de compreender os recursos disponíveis.

Execute a seguinte sequência inicial:

1. Verifique o acesso ao repositório oficial.
2. Inspecione o estado atual do Git.
3. Examine todos os arquivos existentes.
4. Analise recursivamente a pasta `Sprites/`.
5. Gere o inventário de recursos.
6. Examine a página oficial do asset kit e os termos de licença.
7. Identifique o que já existe, o que está faltando e o que precisa ser corrigido.
8. Escolha a arquitetura técnica com base na auditoria.
9. Crie ou atualize a documentação inicial.
10. Atualize `AI_STATE.md`.
11. Execute as validações pertinentes.
12. Faça commit e push das alterações validadas, caso o acesso permita.
13. Registre o resultado real.
14. Prossiga para a próxima fase sem aguardar uma nova solicitação, salvo quando houver um bloqueio material que exija decisão do diretor.

**O objetivo não é produzir a maior quantidade possível de código. O objetivo é construir o melhor jogo possível dentro das condições técnicas, mantendo qualidade, continuidade e capacidade de evolução.**

O Sushiventure Idle Tycoon deve nascer com uma base sólida, visual próprio, progressão viciante, economia coerente e documentação suficiente para que qualquer sessão futura de desenvolvimento consiga continuar de onde a anterior parou.

Trate este documento como a constituição inicial do projeto. Se decisões posteriores forem necessárias, registre-as formalmente, preserve o histórico e mantenha o documento principal e o `AI_STATE.md` sincronizados com a implementação real.

**Comece a execução agora.**