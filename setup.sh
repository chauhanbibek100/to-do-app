#!/bin/bash

echo "========================================"
echo "TaskMaster Pro - Setup Script"
echo "========================================"
echo ""

echo "[1/4] Setting up Backend..."
cd backend
npm install
echo "✓ Backend dependencies installed"

echo ""
echo "[2/4] Backend setup complete!"
echo ""

cd ..
echo "[3/4] Setting up Frontend..."
cd frontend
npm install
echo "✓ Frontend dependencies installed"

echo ""
echo "[4/4] Setup complete!"
echo ""
echo "========================================"
echo "Setup Instructions Complete!"
echo "========================================"
echo ""
echo "To run the application:"
echo ""
echo "Step 1: Make sure MongoDB is running"
echo "Step 2: Open terminal in backend folder and run: npm start"
echo "Step 3: Open another terminal in frontend folder and run: npm start"
echo ""
echo "Backend: http://localhost:5000"
echo "Frontend: http://localhost:3000"
echo ""
echo "========================================"
