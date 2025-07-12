#!/bin/bash

echo "🚀 Setting up Eurodiesel Garage Management System..."
echo "=================================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v14 or higher first."
    exit 1
fi

echo "✅ Node.js found: $(node --version)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ npm found: $(npm --version)"

# Backend setup
echo ""
echo "📦 Setting up Backend..."
cd BackEnd
npm install
if [ $? -eq 0 ]; then
    echo "✅ Backend dependencies installed successfully"
else
    echo "❌ Failed to install backend dependencies"
    exit 1
fi
cd ..

# Frontend setup
echo ""
echo "📦 Setting up Frontend..."
cd FrontEnd
npm install
if [ $? -eq 0 ]; then
    echo "✅ Frontend dependencies installed successfully"
else
    echo "❌ Failed to install frontend dependencies"
    exit 1
fi
cd ..

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "Next steps:"
echo "1. Configure your database in BackEnd/config/db.config.js"
echo "2. Run the SQL queries from BackEnd/services/sql/initial-queries.sql"
echo "3. Start the backend: cd BackEnd && npm start"
echo "4. Start the frontend: cd FrontEnd && npm start"
echo ""
echo "Backend will run on: http://localhost:5000"
echo "Frontend will run on: http://localhost:3000" 