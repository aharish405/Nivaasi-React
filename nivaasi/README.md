# Nivaasi - Property Management PWA

A mobile-first, PWA-enabled property management platform for PGs and Hostels built with the MERN stack.

## 🚀 Features

- **Property Management**: Manage properties with floors, rooms, and beds
- **Tenant Tracking**: Complete tenant information with payment history
- **Occupancy Visualization**: Color-coded bed status (Available, Occupied, Notice, Blocked)
- **Financial Management**: Track rent, deposits, and expenses
- **Food Menu**: Weekly meal planning
- **PWA Support**: Installable app with offline capabilities
- **Mobile-First Design**: Optimized for mobile devices

## 📁 Project Structure

```
nivaasi/
├── server/                 # Backend (Express + MongoDB)
│   ├── models/            # Mongoose schemas
│   ├── routes/            # API routes
│   ├── server.js          # Express server
│   └── seed.js            # Sample data seeder
└── client/                # Frontend (React + Vite)
    ├── public/            # Static assets & PWA files
    ├── src/
    │   ├── components/    # Reusable components
    │   ├── pages/         # Page components
    │   ├── contexts/      # React contexts
    │   └── App.jsx        # Main app component
    └── vite.config.js     # Vite configuration
```

## 🛠️ Tech Stack

**Backend:**
- Node.js & Express.js
- MongoDB & Mongoose
- CORS & dotenv

**Frontend:**
- React 18
- Vite
- Tailwind CSS
- React Router DOM
- Lucide React (icons)
- Vite PWA Plugin

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (running locally or connection string)

### Backend Setup

```bash
cd server
npm install
```

Create a `.env` file (or use the existing one):
```env
MONGODB_URI=mongodb://localhost:27017/nivaasi
PORT=5000
JWT_SECRET=nivaasi_dev_secret_2024
```

Seed the database with sample data:
```bash
node seed.js
```

Start the server:
```bash
npm run dev
```

Server will run on `http://localhost:5000`

### Frontend Setup

```bash
cd client
npm install
```

Start the development server:
```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

## 🎯 Usage

1. **Start MongoDB** (if running locally)
2. **Start Backend**: `cd server && npm run dev`
3. **Start Frontend**: `cd client && npm run dev`
4. **Open Browser**: Navigate to `http://localhost:5173`

## 📱 PWA Installation

1. Open the app in a browser (Chrome/Edge recommended)
2. Look for the "Install" button in the address bar
3. Click to install as a standalone app
4. App will work offline after first load

## 🔌 API Endpoints

### Properties
- `GET /api/properties` - List all properties
- `GET /api/properties/:id` - Get property details
- `POST /api/properties` - Create property
- `PUT /api/properties/:id` - Update property
- `GET /api/properties/:id/stats` - Get occupancy stats

### Tenants
- `GET /api/tenants` - List all tenants
- `GET /api/tenants/:id` - Get tenant details
- `POST /api/tenants` - Create tenant
- `PUT /api/tenants/:id` - Update tenant
- `POST /api/tenants/:id/payment` - Add payment
- `GET /api/tenants/status/unpaid` - Get unpaid tenants

### Menu
- `GET /api/menu` - Get weekly menu
- `GET /api/menu/:day` - Get menu for specific day
- `PUT /api/menu/:day` - Update menu for day

### Transactions
- `GET /api/transactions` - List all transactions
- `POST /api/transactions` - Create transaction
- `GET /api/transactions/summary/all` - Get financial summary

## 🎨 Design System

**Colors:**
- Primary: Sky Blue (#0ea5e9)
- Success: Green
- Warning: Yellow
- Danger: Red

**Bed Status Colors:**
- Available: Green
- Occupied: Red
- Notice: Yellow
- Blocked: Gray

## 📄 License

MIT

## 👨‍💻 Author

Built with ❤️ using the MERN stack
