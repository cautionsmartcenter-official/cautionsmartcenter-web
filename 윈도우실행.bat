@echo off
chcp 65001 > nul
title 코션스마트센터 웹페이지 로컬 서버
echo ========================================================
echo   코션스마트센터 웹페이지 로컬 실행기 (Windows)
echo ========================================================
echo.

:: 1. Node.js 설치 확인
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [오류] Node.js가 설치되어 있지 않습니다.
    echo https://nodejs.org 에 접속하여 Node.js LTS 버전을 설치한 후 다시 실행해 주세요.
    echo.
    pause
    exit /b
)

:: 2. node_modules 폴더가 없으면 자동으로 npm install 실행
if not exist node_modules (
    echo [안내] 윈도우 환경에 필요한 모듈을 설치합니다. (최초 1회 실행, 1~2분 소요)
    call npm install
    if %errorlevel% neq 0 (
        echo [오류] 모듈 설치 중 문제가 발생했습니다.
        pause
        exit /b
    )
    echo.
    echo [완료] 모듈 설치가 완료되었습니다!
    echo.
)

:: 3. 로컬 개발 서버 실행
echo [시작] 로컬 개발 서버를 실행합니다...
echo 브라우저에서 아래 주소로 접속하시면 맥에서 보던 것과 똑같이 확인하실 수 있습니다:
echo -> http://localhost:5173
echo.
call npm run dev
pause
