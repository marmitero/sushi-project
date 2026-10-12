# Build, Hospedagem e Publicação

## Web

- `npm run build` → `dist/` (~13 MB c/ assets; JS ~1.5 MB min, gzip ~345 KB).
- Hospedagem estática (qualquer CDN/host). Sem backend no MVP.
- Live preview de desenvolvimento: Vite `--host 0.0.0.0` + `allowedHosts:true` (necessário p/ proxy do Arena).

## PWA (opcional, FASE 11)

- Manifest + service worker p/ instalação no navegador (offline do shell; assets cacheados).

## Android (FASE 11)

- **Capacitor** empacota o mesmo `dist/` (webview). Passos previstos:
  1. `npm i @capacitor/core @capacitor/android` · `npx cap add android`.
  2. Configurar `capacitor.config.ts` (webDir=`dist`, orientação retrato, safe-area).
  3. Fontes e assets locais (sem CDN) p/ offline.
  4. Integrar AdMob/Billing via plugins Capacitor **reais** (FASE 9) — nunca simulados em produção.
  5. Build APK/AAB p/ Play Store; checklist em `docs/monetization/RELEASE_CHECKLIST.md`.
- Diferenças web→Android documentadas: input de toque, safe-area, ciclo de vida (pause/resume p/ offline), sem hover.

## Segredos

Nenhuma chave no frontend/GitHub. Config de produção (AdMob/IAP/backend) via variáveis de ambiente no CI/host, nunca commitadas.
