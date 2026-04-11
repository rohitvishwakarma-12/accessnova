#!/bin/bash

# ========================================
# AccessNova - Linux/Mac Setup Script
# ========================================

set -e

echo ""
echo "========================================"
echo "  AccessNova - Project Setup"
echo "========================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "[ERROR] Node.js is not installed"
    echo "Please download from https://nodejs.org/"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "[ERROR] npm is not installed"
    echo "Please reinstall Node.js"
    exit 1
fi

echo "[INFO] Node.js and npm detected"
node --version
npm --version
echo ""

# Install dependencies
echo "[STEP 1/4] Installing dependencies..."
echo "========================================"
npm install
echo "[SUCCESS] Dependencies installed"
echo ""

# Setup environment file
echo "[STEP 2/4] Setting up environment configuration..."
echo "========================================"
if [ ! -f .env.local ]; then
    echo "[INFO] Creating .env.local from .env.example"
    cp .env.example .env.local
    echo "[WARNING] Please edit .env.local with your configuration:"
    echo "  - GOOGLE_API_KEY: Get from https://makersuite.google.com/app/apikey"
    echo "  - SMTP settings: Configure email service"
    echo ""
else
    echo "[INFO] .env.local already exists"
fi
echo "[SUCCESS] Environment setup complete"
echo ""

# Build the project
echo "[STEP 3/4] Building project for production..."
echo "========================================"
npm run build
echo "[SUCCESS] Build completed"
echo ""

# Run linting
echo "[STEP 4/4] Running linter..."
echo "========================================"
npm run lint || {
    echo "[WARNING] Some lint issues found"
    echo "Review them with: npm run lint"
    echo "Fix them with: npm run format"
}
echo ""

# Make scripts executable
chmod +x setup-linux.sh 2>/dev/null || true

# Summary
echo "========================================"
echo "  Setup Complete!"
echo "========================================"
echo ""
echo "Next steps:"
echo "1. Edit .env.local with your configuration"
echo "2. Run development server: npm run dev"
echo "3. Open http://localhost:3000"
echo ""
echo "Useful commands:"
echo "  npm run dev          - Start development server"
echo "  npm run build        - Build for production"
echo "  npm start            - Start production server"
echo "  npm run lint         - Check code quality"
echo "  npm run format       - Auto-fix code formatting"
echo ""
echo "For deployment instructions, see DEPLOYMENT.md"
echo ""
