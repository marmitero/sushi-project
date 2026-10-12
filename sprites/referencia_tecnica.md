Vou analisar o repositório e o asset-pack completo. Primeiro, examino o GitHub e o site de referência.O repositório tem a pasta `sprites`. Vou mapear a estrutura completa e o conteúdo do site do asset-pack.Vou explorar cada subpasta em detalhe (Png, Spine, Json Atlas etc.).Agora aprofundo nas subpastas principais de PNG, Spine e Atlas.Continuando a varredura nos personagens, carros e arquivos Spine/Atlas.Vou extrair detalhes de animações dos JSONs do Spine e listar o restante dos assets de UI.# Documento de Referência Completa — Free Sushi Restaurant Game Asset Kit (CraftPix)

**Fonte do pack:** [CraftPix Free Sushi Restaurant Game Asset Kit](https://craftpix.net/freebies/free-sushi-restaurant-game-asset-kit/)  
**Repositório analisado:** https://github.com/marmitero/sushi-project (pasta `sprites`)  
**Licença:** Royalty-free para uso comercial e não-comercial ilimitado (detalhes em https://craftpix.net/file-licenses/). Não redistribuir o pack original.  
**Estilo:** Vetorial cartoon clean (tons de madeira quentes, cores vibrantes de UI, personagens estilizados). Ideal para jogos idle/incremental, tycoon, time-management, restaurant sim, mobile casual.  
**Formatos principais:** PNG (sprites prontos), AI/EPS (editáveis vetoriais), Spine 4.2.43 (animações esqueléticas + atlas JSON/PNG).  
**Fontes recomendadas (FontLink.txt):**  
- Bebas Neue  
- Passion One  
- Lilita One  
(Todas no Google Fonts)

Este documento serve como **referência técnica completa** para integrar o pack em engines como Unity, Godot, Construct, Phaser, Cocos, etc. Ele cobre localização de arquivos, atribuição de funções, tratamento de animações (frame-by-frame e Spine), composição de cenas e boas práticas.

---

## 1. Estrutura Geral da Pasta `sprites`

```
sprites/
├── Ai/                          # Arquivos Adobe Illustrator (.ai) — fontes editáveis
├── Eps/                         # Arquivos Encapsulated PostScript (.eps) — fontes editáveis
├── Json Atlas/                  # Spine runtime: .json + .atlas + .png (por personagem/carro)
├── Png/                         # Sprites PNG prontos para uso (principal para desenvolvimento)
│   ├── Backgrounds/
│   ├── Cars/ (Car1 a Car5)
│   ├── Cashier Girl/
│   ├── Cashiers/
│   ├── Chef Guy/
│   ├── Floor Girl/
│   ├── Floors/
│   ├── Lift Guy/
│   ├── Open Area Map/
│   ├── Shop Screen/
│   └── Ui and PopUp/
├── Spine/                       # Projetos Spine originais (.spine + Images/)
├── FontLink.txt
├── Free Assets Craftpix!.url
└── license.txt
```

**Como localizar:**  
- Use `Png/` para assets runtime (mais leves e prontos).  
- Use `Json Atlas/` + `Spine/` para animações esqueléticas de alta qualidade (recomendado).  
- Use `Ai/` ou `Eps/` para editar cores, partes, adicionar variantes ou exportar novas resoluções.  
- O elevador/shaft (`Lift.ai` / `Lift.eps`) está nos arquivos vetoriais; nos PNG ele costuma estar integrado nos floors ou backgrounds.

---

## 2. Backgrounds e Ambiente (Parallax / Céu)

**Localização PNG:** `sprites/Png/Backgrounds/`  
- `Backgrounds.png` — fundo principal (céu + elementos de cidade/parallax).  
- `Clouds.png` — nuvens separadas (para animação de scroll ou parallax).

**Vetorial:** `Ai/Background.ai`, `Eps/Background.eps`.

**Como atribuir e tratar:**  
- Camada mais atrás: `Backgrounds.png` (stretch ou tile conforme resolução do jogo; geralmente 1080p+ mobile).  
- Camada intermediária: elementos de cidade (extraia do AI/EPS se necessário — o pack menciona “parallax city buildings”).  
- Camada frontal de atmosfera: `Clouds.png` com scroll horizontal lento (ex.: velocidade 0.2–0.5× da câmera).  
- No mapa da cidade (`Open Area Map`): há `Clouds.png` adicional.  
- Função: fundo estático ou com parallax multi-camada para sensação de torre alta.  
- Tratamento: adicione fade ou tint para dia/noite se quiser extensão. Mantenha aspect ratio para evitar distorção.

---

## 3. Floors (Andares da Torre — 11 níveis)

**Localização PNG:** `sprites/Png/Floors/`  
- `Floor_Lv0.png` … `Floor_Lv10.png` (11 arquivos).

**Vetorial:** `Ai/Floors.ai`, `Eps/Floors.eps` (contém todos + lift shaft).

**Como localizar/atribuir:**  
- Lv0 = base/fundação (mais simples).  
- Lv1–Lv10 = upgrades progressivos (mais decoração, sushi stations, clientes, etc.).  
- O **lift/elevator shaft** está nos arquivos AI/EPS (`Lift.ai` / `Lift.eps`) e deve ser posicionado verticalmente no centro ou lateral de cada floor para conectar os andares.

**Tratamento e função:**  
- Empilhe verticalmente (Y crescente) para formar a torre.  
- Use sprite swapping ou fade/scale animation ao upgrade (ex.: de LvN para LvN+1).  
- Cada floor tem altura consistente (analise dimensões no AI para snapping preciso).  
- Função de jogo: cada floor gera income, tem slots para funcionários (Floor Girl), e pode ser upgradado via popup.  
- Integração: coloque o shaft do elevador por trás ou na frente dos floors; anime o Lift Guy subindo/descendo ao longo do shaft.  
- Boas práticas: use sorting layers (background floors → characters → UI). Adicione colliders ou waypoints para pathfinding de chefs/funcionários.

---

## 4. Cashiers (Caixa — 6 upgrades)

**Localização PNG:** `sprites/Png/Cashiers/`  
- `CashierL1.png` … `CashierL6.png`.

**Vetorial:** `Ai/Cashier.ai`, `Eps/Cashier.eps`.

**Como atribuir:**  
- L1 = versão básica.  
- L6 = versão máxima (mais visualmente rica).  

**Tratamento:**  
- Posicione no térreo ou floor principal.  
- Sprite swap no upgrade.  
- Função: ponto de venda/interação com clientes + geração de money.  
- Combine com a Cashier Girl (personagem animada na frente ou ao lado).

---

## 5. Personagens Animados

Todos têm versões **frame-by-frame PNG** e **Spine** (recomendado). Spine usa versão 4.2.43.

### 5.1 Cashier Girl
- **PNG frames:** `Png/Cashier Girl/ChashierGirl-animation_00.png` … (sequência longa, ~20+ frames; idle/trabalho).  
- **Spine/Json Atlas:** `Json Atlas/Cashier Girl/` (`ChashierGirl.json`, `.atlas`, `.png`) + `Spine/Cashier Girl/CashierGirl.spine` + Images/.  
- **Bones principais:** root, Body, HandB, HairB, HandF.  
- **Slots/Attachments:** Cashier_Girl, Cashier_Machine, Cashier_Order, HairB, HandB.  
- **Animação:** `"animation"` (loop ~1.333s) — balanço do corpo, movimento de mãos (passando pedido), cabelo.  
- **Função:** fica no caixa, processa pedidos, idle animado.  
- **Tratamento:**  
  - Spine: carregue skeleton + atlas; play `"animation"` em loop.  
  - PNG: sprite sheet ou AnimationPlayer com frames sequenciais (FPS ~12–15).  
  - Posicione na frente do Cashier Lx.  
  - Eventos Spine: use para spawn de order icons ou sound (caixa registradora).

### 5.2 Chef Guy
- **PNG:** `Png/Chef Guy/` com subpastas:  
  - `Cooking/` (frames de cozinhar)  
  - `Walk/` (andar vazio)  
  - `Walk Full Order/` (andar com pedido/caixa de sushi)  
- **Spine/Json Atlas:** `Json Atlas/Chef Guy/ChefGuy.json` + atlas/png + `Spine/Chef Guy/`.  
- **Bones:** AllBones, Body, Head, HandF, pernas (LegF1–4), FullBox (caixa de sushi), e set secundário (Body2 etc. para variantes).  
- **Animações principais:**  
  - `"Cooking"` (~0.666s loop) — balanço, mãos mexendo, cabeça, troca de attachments (corpo/mãos).  
  - Walk e Walk Full Order (pathfinding + holding SushiBox).  
- **Função:** cozinha nos floors, carrega pedidos para o caixa ou elevador.  
- **Tratamento:**  
  - Use pathfinding (A*) entre stations.  
  - Troque animação: Cooking (parado na station) → Walk Full Order (carregando) → idle.  
  - Attachment SushiBox aparece quando “full order”.  
  - Scale/flip para direção.

### 5.3 Floor Girl
- **PNG frames:** `Png/Floor Girl/FloorGirl-animation_00.png` … (sequência de idle/trabalho).  
- **Spine:** `Json Atlas/Floor Girl/FloorGirl.json` + `Spine/Floor Girl/`.  
- **Bones:** root, Body, Head, Hand, Hand2.  
- **Slots:** Hair_Back, Body, Head, Hand/Hand2, Machine.  
- **Animação:** `"animation"` (~0.666s) — balanço de cabeça e mãos (trabalhando em máquina/estação).  
- **Função:** funcionária de floor (atende, limpa, opera estações).  
- **Tratamento:** spawn por floor upgradado; idle loop na station; walk simples se necessário (use frames ou adicione no Spine).

### 5.4 Lift Guy
- **PNG frames:** `Png/Lift Guy/Lift Guy-animation_00.png` … (sequência).  
- **Spine:** `Spine/Lift Guy/` + correspondente em Json Atlas (nome similar a LiftGuy).  
- **Função:** opera o elevador, sobe/desce andares.  
- **Tratamento:**  
  - Anime verticalmente ao longo do shaft (`Lift.ai/eps`).  
  - Frames ou Spine para idle dentro do elevador + movimento de portas se disponível.  
  - Sincronize com pedidos (leva Chef/Floor Girl ou deliveries).

**Dica geral de personagens:**  
- Prefira Spine runtime (Unity Spine, Godot spine-godot, etc.) para suavidade e menor footprint.  
- Eventos de animação: trigger sounds, particle (steam de cooking), UI feedback.  
- Sorting: characters acima dos floors.  
- Variações: edite Parts.ai para recolorir cabelo/roupa.

---

## 6. Delivery Cars (5 variantes)

**Localização PNG:** `Png/Cars/Car1/` … `Car5/`  
Cada um tem:  
- `Idle/` (frames)  
- `Move/` (frames)

**Spine/Json Atlas:** `Json Atlas/Cars/Cars.json` + atlas/png + `Spine/Cars/Cars.spine`.  
**Bones:** Cars, Shade, Tire1/Tire2, Fx/Fx2.  
**Attachments:** Car1–Car5, Shade, Tire, TireFx.  

**Animações (por carro):**  
- `CarX_Idle` (~0.666s) — bounce suave + scale da sombra.  
- `CarX_Move` (~1.333s) — bounce + rotação/scale dos TireFx (efeito de movimento/poeira), sombra dinâmica.  

**Como atribuir:**  
- Troque attachment `Car1`→`Car5` via skin ou slot para variantes de cor/design.  
- Função: deliveries na city map ou saindo da torre (income offline ou pedidos).  

**Tratamento:**  
- Idle quando parado no mapa.  
- Move + translate horizontal (ou path) quando em delivery.  
- Parallax ou layer na city map.  
- Spawn random de Car1–5.

---

## 7. Open Area Map (City Map Screen)

**Localização PNG:** `Png/Open Area Map/`  
- `Area.png` (mapa principal grande)  
- `Available Building.png`  
- `Locked Building.png`  
- `Lock.png`  
- `NamePlate.png`  
- `Clouds.png`

**Vetorial:** `Ai/Open Area Map.ai`, `Eps/...`.

**Função:** tela de mapa da cidade para expandir/construir novos edifícios (markers available/locked).  

**Tratamento:**  
- Background = `Area.png`.  
- Overlay markers: Available (clicável para unlock) vs Locked + `Lock.png`.  
- `NamePlate.png` para labels de edifícios.  
- Clouds com scroll.  
- Integração: botões levam a popups de upgrade/compra.  
- UI: adicione zoom/pan se o mapa for grande.

---

## 8. Shop Screen (Loja / IAP)

**Localização PNG:** `Png/Shop Screen/`  
- `Artboard 1.png` … `Artboard 12.png` (layouts de loja, pacotes IAP, ícones).

**Vetorial:** `Ai/Shop Screen.ai`, `Eps/...`.

**Função:** tela de compras (upgrades, boosts, IAP packages).  

**Tratamento:**  
- Use Artboards como backgrounds de painéis ou extraia ícones individuais no AI.  
- Combine com botões de `Ui and PopUp`.  
- Ícones de IAP packages estão aqui e na UI.

---

## 9. UI e PopUps (Elementos de Interface)

**Localização PNG:** `Png/Ui and PopUp/` (dezenas de arquivos)  

**Principais categorias e exemplos:**  
- **Botões:**  
  - `Btn_Blue.png` / `Btn_Blue_Off.png`  
  - `Btn_Green Pressed.png` (e variantes)  
  - `Btn_Boost.png` / `Btn_Boost Pressed.png` / `Btn_Boost Disable.png`  
  - `BtnUp.png` / `BtnUpPressed.png`  
  - `Btn_Close.png`  
- **Ícones:** `Ads_Icon.png`, `Boost_Icon.png`, `ArrowUpgrade.png`  
- **Containers:** `Area Box.png`  
- Outros: settings icons, offline earnings elements, floor/cashier upgrade panels, logo “Sushi Tower”, progress bars, coins, etc. (explore a pasta completa — há muitos estados: normal/pressed/disabled).

**Vetorial:** `Ai/PopUp and Ui.ai`, `Eps/PopUp and Ui.eps` (melhor para extrair/recolorir).

**Popups mencionados no pack:**  
- Settings popup  
- Offline earnings popup  
- Floor upgrade popup  
- Cashier upgrade popup  

**Como tratar:**  
- Use 9-slice/sliced sprites para botões e boxes (escaláveis).  
- Estados: normal → pressed → disabled (troca de sprite ou modulate).  
- Hierarquia UI: Canvas/Overlay → Popup background → conteúdo → botões.  
- Animações de UI: scale bounce no open, fade, slide.  
- Função:  
  - Boost = multiplicador temporário.  
  - Ads_Icon = rewarded ads.  
  - ArrowUpgrade = indicador de upgrade disponível.  
  - Close = fechar popup.  
- Logo: procure “Sushi Tower” ou similar nos Artboards/UI (extraia do AI se necessário).  
- Integração com fontes: use Bebas Neue/Passion One/Lilita One para títulos e números.

---

## 10. Como Integrar Animações (Detalhado)

### Opção A — Spine (Recomendado)
1. Importe runtime Spine na engine.  
2. Carregue `.json` + `.atlas` + `.png` de `Json Atlas/XXX/`.  
3. Crie SkeletonAnimation / SpineSprite.  
4. Play animações pelo nome (`"animation"`, `"Cooking"`, `"Car1_Idle"`, `"Car1_Move"`, etc.).  
5. Controles:  
   - `setAnimation(track, name, loop)`  
   - Mix duration para blends suaves.  
   - Listeners de eventos (complete, event keys).  
6. Skins/Attachments: troque Car1–Car5 ou estados de holding.  
7. Performance: atlas já empacotado; use mipmaps se necessário.

### Opção B — Frame-by-Frame PNG
1. Importe sequência (ex.: `ChashierGirl-animation_00` a `_N`).  
2. Crie AnimationClip / AnimatedSprite / SpriteFrames.  
3. FPS sugerido: 10–15 para idle, 12–20 para walk/move.  
4. Loop + ping-pong se quiser.  
5. Para cars: Idle e Move separados; alterne com velocity.

### Transições e Lógica de Jogo
- Chef: Cooking (station) → Walk Full Order (path to cashier/lift) → deliver → return.  
- Lift Guy: idle no floor atual → move vertical no shaft → arrive.  
- Cars: Idle no mapa → Move para delivery point → return.  
- Upgrade: fade out old sprite → fade in new (floor/cashier) + particle confetti.  
- Offline earnings: popup com cálculo baseado em tempo + floors ativos.

---

## 11. Fluxo de Desenvolvimento Recomendado (Projeto Usando o Pack)

1. **Setup de cena principal (Tower View):**  
   - Backgrounds + Clouds (parallax).  
   - Stack de Floors_LvX + Lift shaft.  
   - Cashier + Cashier Girl.  
   - Spawn de Floor Girls e Chef Guys por floor.  

2. **City Map View:**  
   - Area.png + markers + cars.  

3. **UI Layer (sempre on top):**  
   - HUD (money, boost, settings).  
   - Popups (upgrade, shop, offline, settings).  
   - Shop Screen Artboards.  

4. **Sistemas:**  
   - Economy (income por floor/cashier level).  
   - Upgrade system (troca de sprites + stats).  
   - Delivery/offline.  
   - Pathfinding para characters.  
   - Save/load (níveis de floors/cashiers).  

5. **Edição avançada:**  
   - Abra AI/EPS no Illustrator → recolor, adicione props, exporte novos PNG/Spine.  
   - Parts.ai dos characters para custom skins.  

6. **Otimização:**  
   - Atlas de UI.  
   - Object pooling para cars/characters.  
   - Compressão PNG (etc1/astc mobile).  
   - Spine binary se a engine suportar.  

7. **Extensões possíveis:**  
   - Mais floors (clone e edite).  
   - Clientes adicionais (não inclusos — crie a partir dos Parts).  
   - Sons (não inclusos).  
   - Dia/noite via tint no background.

---

## 12. Checklist de Assets por Função

| Função                  | Arquivos Principais                          | Animação                  | Notas |
|-------------------------|----------------------------------------------|---------------------------|-------|
| Fundo/Parallax         | Backgrounds.png, Clouds.png                 | Scroll                    | Multi-layer |
| Torre/Andares          | Floor_Lv0–10.png + Lift                     | Swap no upgrade           | Empilhar Y |
| Caixa                  | CashierL1–6.png                             | Swap                      | + Cashier Girl |
| Cashier Girl           | PNG frames + Spine ChashierGirl             | "animation"               | Idle/trabalho |
| Chef Guy               | Cooking/Walk/Walk Full + Spine              | Cooking, Walk*            | Path + holding |
| Floor Girl             | PNG frames + Spine                          | "animation"               | Por floor |
| Lift Guy               | PNG frames + Spine                          | Idle/move vertical        | No shaft |
| Deliveries             | Cars Car1–5 Idle/Move + Spine               | CarX_Idle / CarX_Move     | 5 skins |
| Mapa Cidade            | Area.png + markers + Lock + NamePlate       | —                         | Expandir |
| Loja/IAP               | Shop Screen Artboards                       | —                         | Pacotes |
| UI/Popups/Botões       | Ui and PopUp/* (Btn_*, icons, boxes)        | Pressed states            | 9-slice |
| Logo                   | Em UI/Shop ou AI                            | —                         | Sushi Tower |
| Fontes                 | FontLink.txt                                | —                         | Google Fonts |

---

## 13. Dicas Finais e Boas Práticas

- **Resolução:** Assets são high-res vetoriais exportados; redimensione conforme target (mobile 1080p, tablet higher).  
- **Pivot/Origin:** Personagens geralmente pivot no pé (ajuste no Spine ou engine). Cars no centro/bottom.  
- **Cores e Tema:** Madeira + vermelho/laranja vibrante + azul de UI. Mantenha consistência.  
- **Performance mobile:** Prefira Spine + atlases; evite muitos frames soltos.  
- **Testes:** Comece com 1 floor + Cashier Girl + 1 Chef + UI básica.  
- **Créditos:** Opcional, mas bom mencionar CraftPix.  
- **Limitações do pack:** Sem áudio, sem clientes genéricos extras, sem tileset de interior detalhado além dos floors. Use AI para expandir.  
- **Engine-specific:**  
  - Unity: Spine-Unity + SpriteRenderer / UI Toolkit.  
  - Godot: spine-godot ou AnimatedSprite2D + Control nodes.  
  - Outros: equivalente de atlas + skeletal.

Este documento cobre **todas** as partes localizadas na varredura completa da pasta `sprites` + informações oficiais do CraftPix. Use-o como guia vivo: atualize com offsets/exatos de pivot após importar na sua engine.

Se precisar de trechos de código de exemplo (Unity/Godot), breakdown de um JSON específico, ou ajuda para montar a hierarquia de cena, é só pedir! Bom desenvolvimento do seu Sushi Tower idle game. 🍣