# Matriz de Utilização de Assets

Associa cada recurso a um destino concreto no jogo. `Implementado` = já carregado/renderizado no código atual; `Validado` = confirmado visualmente em execução.

| Asset | Categoria | Destino no jogo | Implementado | Validado |
|---|---|---|---|---|
| `Backgrounds/Backgrounds.png` | Cenário | Fundo da cena da torre | ✅ | ✅ |
| `Backgrounds/Clouds.png` | Cenário | Parallax de nuvens | ✅ | ✅ |
| `Floors/Floor_Lv0.png` | Torre | Andar bloqueado ("ADD NEW FLOOR") | ✅ | ✅ |
| `Floors/Floor_Lv1..10.png` | Torre | Andares por nível de upgrade | ✅ | ✅ |
| `Cashiers/CashierL1..6.png` | Torre/Upgrade | Térreo + logo por nível de caixa | ✅ | ✅ |
| `Cashier Girl` (40f) | Personagem | Atendente no caixa | ✅ | ✅ |
| `Chef Guy/Cooking` (20f) | Personagem | Chef por andar | ✅ | ✅ |
| `Chef Guy/Walk*` | Personagem | Pathfinding de entregas | ⏳ F3 | — |
| `Floor Girl` (20f) | Personagem | Funcionária por andar | ✅ | ✅ |
| `Lift Guy` (20f) | Personagem | Operador do elevador | ✅ | ✅ |
| `Cars/Car1` Idle/Move | Veículo | Entrega na rua | ✅ | ✅ |
| `Cars/Car2..5` | Veículo | Variedades de entrega | ⏳ | — |
| `Open Area Map/*` | Navegação | Mapa de cidades/renascimento | ⏳ F6 | — |
| `Ui/CoinIcon`, `GemsIcon` | HUD | Contadores de moeda | ✅ (coin) | ✅ |
| `Ui/Btn_Green/Orange/Blue` | UI | Botões de compra | ✅ | ✅ |
| `Ui/ArrowUpgrade` | UI | Indicador de upgrade de andar | ✅ | ✅ |
| `Ui/PopUp_Box` + `Gams Image` | UI | Janela de ganhos offline | ✅ | ✅ |
| `Ui/Btn_Close`, `Settings PopUp` | UI | Configurações | ⏳ F4 | — |
| `Ui/Btn_Boost`, `Boost_Icon`, `Ads_Icon` | Monetização | Boost / anúncio recompensado | ⏳ F7/F9 | — |
| `Ui/MapIcon`, `ShopIcon` | HUD | Acesso a mapa e loja | ⏳ | — |
| `Shop Screen/Artboard*` | Loja | Layouts IAP | ⏳ F9 | — |
| Fontes (Bebas/Passion/Lilita) | Tipografia | HUD/títulos | ✅ | ✅ |

Legenda: ✅ feito · ⏳ planejado (fase indicada) · — não validado ainda.
