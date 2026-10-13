# Matriz de Utilização de Assets

Associa cada recurso a um destino concreto no jogo, com os estados da Constituição:
**Planejado** (fase indicada) · **Implementado** (carregado/renderizado no código) · **Testado** (conferido em execução real: screenshots automatizados em Chromium headless + leitura do estado do jogo, ver TESTING.md) · **Validado** (confirmado pelo diretor em teste manual).

Revisado em 2026-10-12, após a correção de layout/economia (PROJECT_AUDIT.md §8). Os itens visuais voltam a "Testado" até a nova validação manual do diretor.

| Asset | Categoria | Destino no jogo | Estado |
|---|---|---|---|
| `Backgrounds/Backgrounds.png` | Cenário | Fundo no **mundo** (rola com a torre; prédio na calçada, carros na rua) | Testado |
| `Backgrounds/Clouds.png` | Cenário | 4 nuvens com deriva + parallax vertical | Testado |
| `Floors/Floor_Lv0.png` | Torre | Próximo andar bloqueado; letreiro "ADD NEW FLOOR" coberto pelo botão "CONSTRUIR ANDAR" | Testado |
| `Floors/Floor_Lv1..10.png` | Torre | Andares por nível; placa vazia do telhado recebe "ANDAR N · NV L" | Testado |
| `Cashiers/CashierL1..6.png` | Torre/Upgrade | Térreo/drive-thru por nível de caixa (guichê "CASHIER" é o ponto de venda) | Testado (L1–L3 em tela; L4–L6 medidos na arte) |
| `Cashier Girl` (40f) | Personagem | Atendente dentro da janela do guichê | Testado |
| `Chef Guy/Cooking` (20f) | Personagem | Chef de costas no fogão de cada andar | Testado |
| `Chef Guy/Walk Full Order` + `Walk` | Personagem | Chef leva o pedido à garçonete e volta (visual) | Testado |
| `Floor Girl` (20f) | Personagem | Garçonete atrás do balcão de cada andar | Testado |
| `Lift Guy` (20f) | Personagem | Ascensorista no poço, parando em cada andar | Testado |
| `Cars/Car1..5` Idle/Move | Veículo | **Clientes do drive-thru**: fila, atendimento, pagamento (Move andando, Idle parado) | Testado |
| `Ui/HudCoinBar` + `CoinIcon` | HUD | Contador de dinheiro; moeda que voa a cada venda/coleta | Testado |
| `Ui/Btn_Orange` | UI | Melhoria do caixa (cinza quando sem saldo) | Testado |
| `Ui/Btn_Orange_Small` + `_Off` | UI | Upgrade de andar no telhado (`_Off` sem saldo / nível máximo) | Testado |
| `Ui/ArrowUpgrade` | UI | Ícone do botão de upgrade de andar | Testado |
| `Ui/Btn_Green` | UI | "CONSTRUIR ANDAR" e "COLETAR" | Testado |
| `Ui/PopUp_Box` | UI | Popup de ganhos offline (×0,56, cabe em 720×1280) | Testado |
| `Ui/Gams Image` | UI | Multiplicar ganho offline via anúncio real | Planejado (F7) |
| `Ui/Btn_Orange_Pressed`, `Btn_Green Pressed` | UI | Estado pressionado (hoje: escala 0,95) | Planejado (F4) |
| `Ui/Btn_Blue` + `_Off` | UI | Ações secundárias | Planejado (F4) |
| `Ui/Btn_Close`, `Settings PopUp`, `Btn_Music/Sound/Vibra(+Off)`, `VolumeBar_*`, `SettingIcon*` | UI | Configurações | Planejado (F4) |
| `Ui/Btn_Boost*`, `Boost_Icon`, `Ads_Icon` | Monetização | Boost / anúncio recompensado | Planejado (F7/F9) |
| `Ui/GemsIcon`, `GemsPlusBar` | HUD | Moeda premium | Planejado (F9) |
| `Ui/MapIcon`, `ShopIcon`, `HubAreaBar`, `Area Box`, `ContentBox`, `ManyUpgradeBox*`, `RequermentBox`, `BtnUp*`, `Btn_Help` | UI | Mapa, loja, painéis de melhoria em lote | Planejado (F4–F9) |
| `Open Area Map/*` | Navegação | Mapa de cidades/renascimento | Planejado (F6) |
| `Shop Screen/Artboard*` | Loja | Layouts IAP | Planejado (F9) |
| Fontes Lilita One / Passion One / Bebas Neue | Tipografia | HUD e botões / textos secundários / placas dos andares — **empacotadas** (`@fontsource`, OFL-1.1) | Testado |

Observação de desempenho: o `BootScene` ainda pré-carrega o kit inteiro do manifest (inclusive itens "Planejado"). Carregar só o necessário por tela fica para a FASE 10 (perf).
