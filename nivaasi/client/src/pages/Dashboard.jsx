import React, { useState, useEffect } from 'react';
import { useProperty } from '../contexts/PropertyContext';
import { useTenant } from '../contexts/TenantContext';
import { Bed, UserX, TrendingDown, ChevronDown, ChevronUp } from 'lucide-react';
import RoomGrid from '../components/RoomGrid';

const Dashboard = () => {
    const { currentProperty, getPropertyStats } = useProperty();
    const { getUnpaidTenants } = useTenant();
    const [stats, setStats] = useState(null);
    const [unpaidCount, setUnpaidCount] = useState(0);
    const [showFinancial, setShowFinancial] = useState(false);
    const [showOccupancy, setShowOccupancy] = useState(false);

    useEffect(() => {
        if (currentProperty?._id) {
            loadStats();
            loadUnpaidTenants();
        }
    }, [currentProperty]);

    const loadStats = async () => {
        const data = await getPropertyStats(currentProperty._id);
        setStats(data);
    };

    const loadUnpaidTenants = async () => {
        const unpaid = await getUnpaidTenants();
        setUnpaidCount(unpaid.length);
    };

    // Mock financial data (would come from API in production)
    const financialData = {
        currentRental: 125000,
        outstanding: 35000,
        securityDeposits: 250000,
        collected: 90000,
        pending: 35000
    };

    return (
        <div className="space-y-4">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="card bg-gradient-to-br from-red-500 to-red-600 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm opacity-90">Available Beds</p>
                            <p className="text-3xl font-bold mt-1">{stats?.available || 0}</p>
                        </div>
                        <Bed className="w-12 h-12 opacity-80" />
                    </div>
                </div>

                <div className="card bg-gradient-to-br from-green-500 to-green-600 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm opacity-90">Unpaid Tenants</p>
                            <p className="text-3xl font-bold mt-1">{unpaidCount}</p>
                        </div>
                        <UserX className="w-12 h-12 opacity-80" />
                    </div>
                </div>

                <div className="card bg-gradient-to-br from-yellow-500 to-yellow-600 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm opacity-90">Expenses</p>
                            <p className="text-3xl font-bold mt-1">₹15K</p>
                        </div>
                        <TrendingDown className="w-12 h-12 opacity-80" />
                    </div>
                </div>
            </div>

            {/* Financial Overview */}
            <div className="card">
                <button
                    onClick={() => setShowFinancial(!showFinancial)}
                    className="w-full flex items-center justify-between"
                >
                    <h2 className="text-lg font-bold text-gray-900">Financial Overview</h2>
                    {showFinancial ? <ChevronUp /> : <ChevronDown />}
                </button>

                {showFinancial && (
                    <div className="mt-4 space-y-3">
                        <div className="flex justify-between items-center pb-2 border-b">
                            <span className="text-gray-600">Current Rental Amount</span>
                            <span className="font-semibold text-green-600">₹{financialData.currentRental.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center pb-2 border-b">
                            <span className="text-gray-600">Outstanding Amount</span>
                            <span className="font-semibold text-red-600">₹{financialData.outstanding.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center pb-2 border-b">
                            <span className="text-gray-600">Security Deposits</span>
                            <span className="font-semibold text-blue-600">₹{financialData.securityDeposits.toLocaleString()}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <div className="text-center p-3 bg-green-50 rounded-lg">
                                <p className="text-sm text-gray-600">Collected</p>
                                <p className="text-xl font-bold text-green-600">₹{financialData.collected.toLocaleString()}</p>
                            </div>
                            <div className="text-center p-3 bg-red-50 rounded-lg">
                                <p className="text-sm text-gray-600">Pending</p>
                                <p className="text-xl font-bold text-red-600">₹{financialData.pending.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Occupancy Accordion */}
            <div className="card">
                <button
                    onClick={() => setShowOccupancy(!showOccupancy)}
                    className="w-full flex items-center justify-between"
                >
                    <h2 className="text-lg font-bold text-gray-900">Occupancy Status</h2>
                    {showOccupancy ? <ChevronUp /> : <ChevronDown />}
                </button>

                {showOccupancy && stats && (
                    <div className="mt-4 grid grid-cols-2 sm:grid-cols-5 gap-3">
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                            <p className="text-sm text-gray-600">Total Beds</p>
                        </div>
                        <div className="text-center p-3 bg-green-50 rounded-lg">
                            <p className="text-2xl font-bold text-green-600">{stats.available}</p>
                            <p className="text-sm text-gray-600">Vacant</p>
                        </div>
                        <div className="text-center p-3 bg-red-50 rounded-lg">
                            <p className="text-2xl font-bold text-red-600">{stats.occupied}</p>
                            <p className="text-sm text-gray-600">Occupied</p>
                        </div>
                        <div className="text-center p-3 bg-yellow-50 rounded-lg">
                            <p className="text-2xl font-bold text-yellow-600">{stats.notice || 0}</p>
                            <p className="text-sm text-gray-600">Notice</p>
                        </div>
                        <div className="text-center p-3 bg-gray-100 rounded-lg">
                            <p className="text-2xl font-bold text-gray-600">{stats.blocked || 0}</p>
                            <p className="text-sm text-gray-600">Blocked</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Room Grid */}
            <div>
                <h2 className="text-lg font-bold text-gray-900 mb-4">Room Overview</h2>
                <RoomGrid />
            </div>
        </div>
    );
};

export default Dashboard;
