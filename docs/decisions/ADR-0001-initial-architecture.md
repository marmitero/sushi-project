# ADR-0001 — Arquitetura inicial: Phaser 3 + TypeScript + Vite (web-first, Android via Capacitor)

**Status:** Aceito · **Data:** 2026-10-12

## Contexto

Precisamos de um jogo 2D idle/tycoon testável em web **agora** e publicável no Android **depois**, usando um pack de sprites PNG (frames) + Spine 4.2.43. A Constituição (master-prompt 5.1) recomenda avaliar TS+Phaser3+Vite+Capacitor. O diretor sugeriu Godot 4.7.2 como opção, delegando a decisão.

## Decisão

Adotar **TypeScript + Phaser 3 + Vite**, com economia em módulo puro testável e Android futuro via **Capacitor** sobre o mesmo build web. **Não** usar runtime Spine no MVP (frames PNG a 30 fps).

## Alternativas consideradas

- **Godot 4.7.2:** existe (GitHub, 2026-08-18) e exporta Web+Android nativo. Porém: (a) live-preview/iteração neste ambiente é muito mais simples com dev server web; (b) animação Spine exigiria GDExtension/build custom p/ web+android; (c) testes unitários e TypeScript strict são nativos no stack web; (d) o pack já fornece frames PNG suficientes. Válido revisitar se a performance 2D ou features de engine virarem gargalo.
- **Unity:** descartada (peso, licença, web frágil).
- **Canvas/manual sem engine:** descartada (reinventar input/anim/escala).
- **Runtime Spine:** licenciamento próprio da Esoteric p/ distribuição comercial → adiado; frames PNG são royalty-free e suficientes.

## Consequências

+ Iteração rápida + preview imediato + Vitest + TS strict. + Mesmo `dist/` serve web e Capacitor.
− Android será webview (aceitável p/ idle 2D; documentar diferenças). − Perf depende de WebGL/Canvas (mitigável com atlases/pooling).
− Fontes via CDN hoje → empacotar no Android depois.
