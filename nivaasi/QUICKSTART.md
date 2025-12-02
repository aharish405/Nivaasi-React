# Quick Start Guide - Nivaasi PWA

## 🚀 Quick Start (5 minutes)

### Step 1: Start MongoDB
```bash
# If using Homebrew
brew services start mongodb-community

# OR manually
mongod --dbpath /path/to/data/db
```

### Step 2: Seed Database
```bash
cd /Users/harish/Dev/App/nivaasi/server
node seed.js
```

Expected output:
```
✅ Connected to MongoDB
🗑️  Cleared existing data
✅ Created sample property
✅ Created sample tenants
✅ Updated bed assignments
✅ Created weekly menu
✅ Created sample transactions
🎉 Database seeded successfully!
```

### Step 3: Start Application
```bash
cd /Users/harish/Dev/App/nivaasi

# Option 1: Use the start script
./start.sh

# Option 2: Manual start (two terminals)
# Terminal 1:
cd server && npm run dev

# Terminal 2:
cd client && npm run dev
```

### Step 4: Open Application
Open your browser and navigate to:
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000

## 📱 Testing the App

### Dashboard
1. View summary cards (Available Beds, Unpaid Tenants, Expenses)
2. Expand Financial Overview accordion
3. Expand Occupancy Status accordion
4. Navigate between floors using tabs
5. Click on beds to see details

### Tenants
1. Search for "Rajesh" or "9876543210"
2. Click Call or Message buttons
3. View tenant details and payment status

### Food Menu
1. Switch between days (Monday-Sunday)
2. View meal times and items
3. Click Edit button to enable edit mode

### Transactions
1. View summary cards
2. Filter by type (All, Rent, Deposit, Expense)
3. View transaction details

### Profile
1. View admin information
2. Access settings

## 🔧 Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:** Start MongoDB first
```bash
brew services start mongodb-community
```

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution:** Kill the process using the port
```bash
lsof -ti:5000 | xargs kill -9
lsof -ti:5173 | xargs kill -9
```

### Dependencies Not Installed
```
Error: Cannot find module 'express'
```
**Solution:** Install dependencies
```bash
cd server && npm install
cd client && npm install
```

## 📱 PWA Installation

### On Desktop (Chrome/Edge)
1. Open http://localhost:5173
2. Look for install icon (⊕) in address bar
3. Click "Install Nivaasi"
4. App opens in standalone window

### On Mobile
1. Open http://localhost:5173 in mobile browser
2. Tap browser menu (⋮)
3. Select "Add to Home Screen"
4. App icon appears on home screen

### Test Offline Mode
1. Open DevTools (F12)
2. Go to Network tab
3. Select "Offline" from dropdown
4. Refresh page - app still works!

## 🎯 What to Explore

### Sample Data
- **Property:** Sunrise PG & Hostel
- **Floors:** Ground Floor, First Floor
- **Rooms:** 101, 102, 201, 202
- **Tenants:** Rajesh Kumar, Priya Sharma, Amit Patel
- **Menu:** Complete weekly menu (Mon-Sun)
- **Transactions:** Rent, deposits, expenses

### Features to Test
✅ Room grid with color-coded beds  
✅ Tenant search functionality  
✅ Payment tracking  
✅ Weekly menu management  
✅ Transaction filtering  
✅ PWA installation  
✅ Offline mode  

## 🚀 Next Steps

1. **Customize Data:** Modify seed.js to add your own property data
2. **Add Authentication:** Implement JWT login
3. **Deploy:** Host on Vercel (frontend) + Railway (backend)
4. **Enhance:** Add features like notifications, reports, etc.

---

**Need Help?** Check the full [README.md](./README.md) or [walkthrough.md](../.gemini/antigravity/brain/d38e8bb6-82ec-4a95-a774-7bd1a4048af4/walkthrough.md)
