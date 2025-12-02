import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Receipt, UserCircle } from 'lucide-react';

const BottomNav = () => {
    const navItems = [
        { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
        { to: '/tenants', icon: Users, label: 'Tenants' },
        { to: '/transactions', icon: Receipt, label: 'Transactions' },
        { to: '/profile', icon: UserCircle, label: 'Profile' }
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 safe-bottom">
            <div className="flex items-center justify-around px-2 py-2">
                {navItems.map(({ to, icon: Icon, label }) => (
                    <NavLink
                        key={to}
                        to={to}
                        className={({ isActive }) =>
                            `flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all ${isActive
                                ? 'text-primary bg-primary/10'
                                : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                            }`
                        }
                    >
                        {({ isActive }) => (
                            <>
                                <Icon className={`w-5 h-5 ${isActive ? 'scale-110' : ''}`} />
                                <span className="text-xs font-medium">{label}</span>
                            </>
                        )}
                    </NavLink>
                ))}
            </div>
        </nav>
    );
};

export default BottomNav;
