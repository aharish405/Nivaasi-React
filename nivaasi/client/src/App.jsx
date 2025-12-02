import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PropertyProvider } from './contexts/PropertyContext';
import { TenantProvider } from './contexts/TenantContext';
import TopBar from './components/TopBar';
import BottomNav from './components/BottomNav';
import Dashboard from './pages/Dashboard';
import TenantList from './pages/TenantList';
import FoodMenu from './pages/FoodMenu';
import Transactions from './pages/Transactions';
import Profile from './pages/Profile';

function App() {
    return (
        <Router>
            <PropertyProvider>
                <TenantProvider>
                    <div className="min-h-screen bg-gray-50">
                        <TopBar />

                        {/* Main Content with padding for fixed top and bottom bars */}
                        <main className="pt-16 pb-20 px-4 max-w-7xl mx-auto">
                            <Routes>
                                <Route path="/" element={<Dashboard />} />
                                <Route path="/tenants" element={<TenantList />} />
                                <Route path="/menu" element={<FoodMenu />} />
                                <Route path="/transactions" element={<Transactions />} />
                                <Route path="/profile" element={<Profile />} />
                            </Routes>
                        </main>

                        <BottomNav />
                    </div>
                </TenantProvider>
            </PropertyProvider>
        </Router>
    );
}

export default App;
