@echo off
REM ========================================
REM AccessNova - Windows Setup Script
REM ========================================

setlocal enabledelayedexpansion

echo.
echo ========================================
echo  AccessNova - Project Setup
echo ========================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed or not in PATH
    echo Please download and install Node.js from https://nodejs.org/
    echo Then run this script again.
    pause
    exit /b 1
)

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] npm is not installed
    echo Please reinstall Node.js
    pause
    exit /b 1
)

echo [INFO] Node.js and npm detected
node --version
npm --version
echo.

REM Install dependencies
echo [STEP 1/4] Installing dependencies...
echo ======================================
call npm install
if %errorlevel% neq 0 (
    echo [ERROR] Failed to install dependencies
    pause
    exit /b 1
)
echo [SUCCESS] Dependencies installed
echo.

REM Setup environment file
echo [STEP 2/4] Setting up environment configuration...
echo ======================================
if not exist .env.local (
    echo [INFO] Creating .env.local from .env.example
    copy .env.example .env.local
    echo [WARNING] Please edit .env.local with your configuration:
    echo   - GOOGLE_API_KEY: Get from https://makersuite.google.com/app/apikey
    echo   - SMTP settings: Configure email service
    echo.
) else (
    echo [INFO] .env.local already exists
)
echo [SUCCESS] Environment setup complete
echo.

REM Build the project
echo [STEP 3/4] Building project for production...
echo ======================================
call npm run build
if %errorlevel% neq 0 (
    echo [ERROR] Build failed
    pause
    exit /b 1
)
echo [SUCCESS] Build completed
echo.

REM Run linting
echo [STEP 4/4] Running linter...
echo ======================================
call npm run lint
if %errorlevel% neq 0 (
    echo [WARNING] Some lint issues found
    echo Review them with: npm run lint
    echo Fix them with: npm run format
) else (
    echo [SUCCESS] No lint issues
)
echo.

REM Summary
echo ========================================
echo  Setup Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Edit .env.local with your configuration
echo 2. Run development server: npm run dev
echo 3. Open http://localhost:3000
echo.
echo Useful commands:
echo   npm run dev          - Start development server
echo   npm run build        - Build for production
echo   npm start            - Start production server
echo   npm run lint         - Check code quality
echo   npm run format       - Auto-fix code formatting
echo.
echo For deployment instructions, see DEPLOYMENT.md
echo.
pause
