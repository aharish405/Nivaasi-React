import React from 'react';
import { User, Building2, Mail, Phone, LogOut, Settings } from 'lucide-react';

const Profile = () => {
    // Mock admin data (would come from auth context in production)
    const admin = {
        name: 'Admin User',
        email: 'admin@nivaasi.com',
        phone: '+91 98765 43210',
        role: 'Property Manager',
        propertyName: 'Sunrise PG'
    };

    return (
        <div className="space-y-4">
            {/* Profile Card */}
            <div className="card">
                <div className="flex flex-col items-center text-center">
                    <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                        <User className="w-12 h-12 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">{admin.name}</h2>
                    <p className="text-gray-600 mt-1">{admin.role}</p>
                </div>
            </div>

            {/* Information */}
            <div className="card space-y-4">
                <h3 className="font-semibold text-gray-900 mb-3">Account Information</h3>

                <div className="flex items-center gap-3 pb-3 border-b">
                    <Building2 className="w-5 h-5 text-gray-600" />
                    <div>
                        <p className="text-sm text-gray-600">Property</p>
                        <p className="font-medium text-gray-900">{admin.propertyName}</p>
                    </div>
                </div>

                <div className="flex items-center gap-3 pb-3 border-b">
                    <Mail className="w-5 h-5 text-gray-600" />
                    <div>
                        <p className="text-sm text-gray-600">Email</p>
                        <p className="font-medium text-gray-900">{admin.email}</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-gray-600" />
                    <div>
                        <p className="text-sm text-gray-600">Phone</p>
                        <p className="font-medium text-gray-900">{admin.phone}</p>
                    </div>
                </div>
            </div>

            {/* Settings */}
            <div className="card">
                <h3 className="font-semibold text-gray-900 mb-3">Settings</h3>
                <div className="space-y-2">
                    <button className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                        <Settings className="w-5 h-5 text-gray-600" />
                        <span className="text-gray-900">App Settings</span>
                    </button>
                    <button className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                        <User className="w-5 h-5 text-gray-600" />
                        <span className="text-gray-900">Edit Profile</span>
                    </button>
                </div>
            </div>

            {/* Logout */}
            <button className="w-full btn bg-red-500 text-white hover:bg-red-600 flex items-center justify-center gap-2">
                <LogOut className="w-5 h-5" />
                Logout
            </button>

            {/* App Info */}
            <div className="card text-center text-sm text-gray-500">
                <p>Nivaasi v1.0.0</p>
                <p className="mt-1">Property Management System</p>
            </div>
        </div>
    );
};

export default Profile;
