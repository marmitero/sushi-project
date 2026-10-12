# Inventário de Assets — Free Sushi Restaurant Game Asset Kit (CraftPix)

**Fonte:** https://craftpix.net/freebies/free-sushi-restaurant-game-asset-kit/
**Método:** varredura recursiva de `sprites/` com ImageMagick (`identify`) em 2026-10-12.
**Totais medidos:** 559 PNG · 10,09 MB (somente PNG) · 78 MB incluindo AI/EPS/Spine.

> Importante: os nomes abaixo foram **verificados visualmente** (folhas de contato). O conteúdo prevalece sobre o nome presumido.

## 1. Cenário / Fundo

| Arquivo | Dimensões | Função | Usado no MVP |
|---|---|---|---|
| `Png/Backgrounds/Backgrounds.png` | 1904×3118 | Céu + skyline + calçada + rua (cena da torre) | ✅ |
| `Png/Backgrounds/Clouds.png` | 791×283 | Nuvens p/ parallax | ✅ |

## 2. Andares da torre (11)

| Arquivo | Dimensões | Conteúdo verificado | Usado |
|---|---|---|---|
| `Png/Floors/Floor_Lv0.png` | 1056×340 | **Estado BLOQUEADO**: porta com placa "CLOSED" + faixa "ADD NEW FLOOR" | ✅ |
| `Png/Floors/Floor_Lv1.png` | 1056×341 | Sala quase vazia (nível 1) | ✅ |
| `Png/Floors/Floor_Lv2..Lv9.png` | 1056×341 | Mobília/equipamento progressivos | ✅ |
| `Png/Floors/Floor_Lv10.png` | 1056×341 | Cozinha completa (nível máx) | ✅ |

> Correção vs. `referencia_tecnica.md`: **Lv0 NÃO é a fundação** — é o sprite do andar **trancado** ("ADD NEW FLOOR"). Os andares jogáveis vão de Lv1 a Lv10.

## 3. Caixa / Storefront (6 níveis) + LOGO

| Arquivo | Dimensões | Conteúdo verificado | Usado |
|---|---|---|---|
| `Png/Cashiers/CashierL1.png` | 1040×412 | Térreo básico + **logo "SUSHI TOWER"** | ✅ |
| `Png/Cashiers/CashierL2..L6.png` | 1040×412 | Toldo, letreiro, postes, drive-thru progressivos | ✅ |

> O **logotipo "SUSHI TOWER"** está embutido nestes sprites (não há arquivo de logo separado).

## 4. Personagens (frames PNG, ~30 fps)

| Personagem | Pasta | Frames | Dim. frame | Animação | Usado |
|---|---|---|---|---|---|
| Cashier Girl | `Png/Cashier Girl/` | 40 (`ChashierGirl-animation_00..39`) | 92×73 | idle/trabalho | ✅ |
| Chef Guy (cooking) | `Png/Chef Guy/Cooking/` | 20 | 100×120 | cozinhar | ✅ |
| Chef Guy (walk) | `Png/Chef Guy/Walk/` | 20 | 100×120 | andar vazio | ⏳ FASE 3 |
| Chef Guy (walk full) | `Png/Chef Guy/Walk Full Order/` | 20 | 100×120 | andar c/ pedido | ⏳ FASE 3 |
| Floor Girl | `Png/Floor Girl/` | 20 | 84×59 | trabalhar | ✅ |
| Lift Guy | `Png/Lift Guy/` | 20 | 45×91 | idle/operar | ✅ |

> FPS: 30 (derivado das durações Spine: 20 frames / 0.667s ≈ 30).

## 5. Veículos de entrega (5 variantes)

| Variante | Idle | Move | Dim. | Usado |
|---|---|---|---|---|
| `Png/Cars/Car1..Car5/Idle/` | 20 frames | — | ~240×160 | ✅ (Car1 no MVP) |
| `Png/Cars/Car1..Car5/Move/` | — | 40 frames | ~240×160 | ✅ (Car1 no MVP) |

## 6. Mapa de cidades (Open Area Map)

| Arquivo | Dimensões | Função | Usado |
|---|---|---|---|
| `Area.png` | 1903×3118 | Mapa vertical da cidade | ⏳ FASE 6 |
| `Available Building.png` / `Locked Building.png` | ~260×250 | marcadores | ⏳ |
| `Lock.png` | 83×99 | cadeado | ⏳ |
| `NamePlate.png` | 193×73 | placa de nome | ⏳ |
| `Clouds.png` | 442×164 | nuvens do mapa | ⏳ |

## 7. UI e PopUps (`Png/Ui and PopUp/` — 44 arquivos)

Categorias verificadas: botões (Blue/Green/Orange/Boost/Up/Close + estados pressed/disabled), ícones (Coin, Gems, Boost/raio, Map, Shop, Settings, Ads/play, Music/Sound/Vibra on-off, Help, ArrowUpgrade), containers (Area Box, ContentBox, PopUp_Box, RequermentBox, ManyUpgradeBox[Green], HubAreaBar, HudCoinBar, GemsPlusBar), barras de volume, `Settings PopUp.png`, `Gams Image` (monte de dinheiro p/ ganhos offline).

> **Não existem** popups separados de "floor upgrade / cashier upgrade / offline earnings" como PNGs isolados — esses layouts vivem nos **Artboards da Shop Screen** (composição). A janela de ganhos offline do MVP usa `PopUp_Box` + `Gams Image`.

## 8. Shop Screen (12 artboards)

`Artboard 1..12.png` (1903×3118 e derivados) — layouts de loja/IAP e fundos (ex.: Artboard 1 = padrão de losangos azul). Usados como referência de layout; fundos reaproveitáveis. ⏳ loja real em FASE 9.

## 9. Formatos editáveis e Spine

- `Ai/*.ai` e `Eps/*.eps` — vetores editáveis (inclui **Lift/shaft** em `Lift.ai/eps`). Preservados; usar p/ gerar novas variantes.
- `Spine/*` + `Json Atlas/*` — Spine **4.2.43**. ⚠️ Os atlas PNG do Spine estão em **baixa resolução** (ex.: 256×64) — inadequados p/ render final; preferir os **frames PNG** (royalty-free) no MVP. Runtime Spine tem licença própria (Esoteric) — documentado em `ASSET_LICENSES.md`.

## 10. Fontes (FontLink.txt)

Bebas Neue · Passion One · Lilita One (Google Fonts). Carregadas via `<link>` no `index.html`.
