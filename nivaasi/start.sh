#!/bin/bash

echo "🚀 Starting Nivaasi Application..."
echo ""

# Check if MongoDB is running
if ! pgrep -x "mongod" > /dev/null; then
    echo "⚠️  MongoDB is not running!"
    echo "Please start MongoDB first:"
    echo "  brew services start mongodb-community"
    echo "  OR"
    echo "  mongod --dbpath /path/to/data/db"
    echo ""
    exit 1
fi

echo "✅ MongoDB is running"
echo ""

# Start backend
echo "📦 Starting Backend Server..."
cd server
npm run dev &
BACKEND_PID=$!
cd ..

# Wait for backend to start
sleep 3

# Start frontend
echo "🎨 Starting Frontend..."
cd client
npm run dev &
FRONTEND_PID=$!
cd ..

echo ""
echo "✅ Application started successfully!"
echo ""
echo "📍 Backend:  http://localhost:5000"
echo "📍 Frontend: http://localhost:5173"
echo ""
echo "Press Ctrl+C to stop all servers"
echo ""

# Wait for Ctrl+C
trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait
