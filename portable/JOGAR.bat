@echo off
title Sushiventure Idle Tycoon
chcp 65001 >nul
echo.
echo  Iniciando Sushiventure Idle Tycoon...
echo  (usa apenas o PowerShell nativo do Windows - nada para instalar)
echo.
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0server.ps1"
echo.
echo  O servidor foi encerrado.
pause
