#!/bin/bash
# QuickRes Deployment Setup Script
# Run this from the quickr folder: bash deploy-setup.sh

echo "🚀 QuickRes Deployment Setup Script"
echo "===================================="
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo -e "${RED}❌ Git is not installed. Please install Git first.${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Git is installed${NC}"

# Initialize git repo if not already done
if [ ! -d ".git" ]; then
    echo ""
    echo -e "${YELLOW}📝 Initializing Git repository...${NC}"
    git init
    git config user.name "QuickRes Developer"
    git config user.email "developer@quickres.com"
    echo -e "${GREEN}✓ Git repository initialized${NC}"
else
    echo -e "${GREEN}✓ Git repository already initialized${NC}"
fi

# Check backend
echo ""
echo -e "${YELLOW}📦 Setting up Backend...${NC}"

if [ -d "backend" ]; then
    cd backend
    
    if [ ! -f ".env" ]; then
        if [ -f ".env.example" ]; then
            cp .env.example .env
            echo -e "${YELLOW}⚠️  Created .env from .env.example${NC}"
            echo -e "${YELLOW}   ⚠️  Update MONGO_URI in backend/.env with your MongoDB connection string${NC}"
        else
            echo -e "${RED}❌ No .env.example found in backend${NC}"
        fi
    else
        echo -e "${GREEN}✓ backend/.env already exists${NC}"
    fi
    
    if [ ! -d "node_modules" ]; then
        echo -e "${YELLOW}📥 Installing backend dependencies...${NC}"
        npm install
        echo -e "${GREEN}✓ Backend dependencies installed${NC}"
    else
        echo -e "${GREEN}✓ Backend dependencies already installed${NC}"
    fi
    
    cd ..
else
    echo -e "${RED}❌ backend folder not found${NC}"
fi

# Check admin-web
echo ""
echo -e "${YELLOW}🎨 Setting up Admin Web...${NC}"

if [ -d "admin-web" ]; then
    cd admin-web
    
    if [ ! -f ".env" ]; then
        if [ -f ".env.example" ]; then
            cp .env.example .env
            echo -e "${GREEN}✓ Created admin-web/.env${NC}"
        fi
    else
        echo -e "${GREEN}✓ admin-web/.env already exists${NC}"
    fi
    
    if [ ! -d "node_modules" ]; then
        echo -e "${YELLOW}📥 Installing admin-web dependencies...${NC}"
        npm install
        echo -e "${GREEN}✓ Admin web dependencies installed${NC}"
    else
        echo -e "${GREEN}✓ Admin web dependencies already installed${NC}"
    fi
    
    cd ..
else
    echo -e "${RED}❌ admin-web folder not found${NC}"
fi

# Check mobile-app1
echo ""
echo -e "${YELLOW}📱 Setting up Mobile App...${NC}"

if [ -d "mobile-app1" ]; then
    cd mobile-app1
    
    if [ ! -f ".env" ]; then
        if [ -f ".env.example" ]; then
            cp .env.example .env
            echo -e "${GREEN}✓ Created mobile-app1/.env${NC}"
        fi
    else
        echo -e "${GREEN}✓ mobile-app1/.env already exists${NC}"
    fi
    
    if [ ! -d "node_modules" ]; then
        echo -e "${YELLOW}📥 Installing mobile-app dependencies...${NC}"
        npm install
        echo -e "${GREEN}✓ Mobile app dependencies installed${NC}"
    else
        echo -e "${GREEN}✓ Mobile app dependencies already installed${NC}"
    fi
    
    cd ..
else
    echo -e "${RED}⚠️  mobile-app1 folder not found${NC}"
fi

# Summary
echo ""
echo "===================================="
echo -e "${GREEN}✓ Local setup complete!${NC}"
echo ""
echo -e "${YELLOW}📋 Next Steps:${NC}"
echo "1. Update MongoDB connection string in backend/.env"
echo "2. Verify all .env files are properly configured"
echo "3. Test locally: npm run dev"
echo "4. Push to GitHub: git add . && git commit -m 'Initial commit' && git push"
echo "5. Follow DEPLOYMENT_GUIDE.md for cloud deployment"
echo ""
echo -e "${GREEN}Happy deploying! 🚀${NC}"
