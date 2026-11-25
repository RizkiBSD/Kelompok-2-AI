@echo off
title Bantugambar - Server
cd /d "%~dp0"

echo ============================================
echo   BANTUGAMBAR - MENYALAKAN WEBSITE
echo ============================================
echo.

if not exist "node_modules" (
  echo [1/3] Memasang dependency pertama kali...
  call npm install
  if errorlevel 1 goto gagal
)

echo [2/3] Membangun situs dari file terbaru (+- 30 detik)...
echo       Ini juga menerapkan perubahan portofolio yang baru kamu tambah.
call npm run build
if errorlevel 1 goto gagal

echo [3/3] Menyalakan server...
echo.
echo   Alamat  : http://localhost:3100
echo   Matikan : tutup jendela ini, atau tekan Ctrl+C
echo.

start "" cmd /c "timeout /t 2 >nul & start http://localhost:3100"
call npx next start -p 3100

echo.
echo Server berhenti.
pause
exit /b 0

:gagal
echo.
echo GAGAL: ada error di atas. Periksa pesan errornya.
pause
exit /b 1
