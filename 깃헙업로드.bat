@echo off
setlocal
title GitHub Upload - Caution Smart Center

set "PATH=%LOCALAPPDATA%\MinGit\cmd;%LOCALAPPDATA%\MinGit\bin;%PATH%"

echo ======================================================
echo    GitHub Uploading: Caution Smart Center
echo ======================================================
echo.

echo [1/3] Adding changes...
git.exe add .

echo [2/3] Committing changes...
git.exe commit -m "update: latest code for Caution Smart Center"

echo [3/3] Pushing to GitHub (cautionsmartcenter-official/cautionsmartcenter-web)...
echo * If browser popup appears, please click Sign In / Authorize.
echo.

git.exe push -u origin main

echo.
echo ======================================================
echo    Upload Process Finished!
echo ======================================================
pause
