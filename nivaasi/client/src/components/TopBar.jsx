import React from 'react';
import { Building2, QrCode, Bell } from 'lucide-react';

const TopBar = () => {
    return (
        <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50 safe-top">
            <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-2">
                    <Building2 className="w-6 h-6 text-primary" />
                    <h1 className="text-xl font-bold text-primary">Nivaasi</h1>
                </div>

                <div className="flex items-center gap-4">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <QrCode className="w-5 h-5 text-gray-700" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
                        <Bell className="w-5 h-5 text-gray-700" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TopBar;
