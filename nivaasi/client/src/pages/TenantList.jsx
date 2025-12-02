import React, { useEffect } from 'react';
import { useTenant } from '../contexts/TenantContext';
import { Search, Phone, MessageCircle, User } from 'lucide-react';

const TenantList = () => {
    const { tenants, loading, searchQuery, searchTenants } = useTenant();

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    const getStatusBadge = (status) => {
        const badges = {
            'Active': 'badge-success',
            'Vacated': 'badge-danger',
            'On Notice': 'badge-warning'
        };
        return badges[status] || 'badge-info';
    };

    return (
        <div className="space-y-4">
            {/* Search Bar */}
            <div className="card">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by name or number"
                        value={searchQuery}
                        onChange={(e) => searchTenants(e.target.value)}
                        className="input pl-10"
                    />
                </div>
            </div>

            {/* Tenant Cards */}
            {loading ? (
                <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
            ) : tenants.length === 0 ? (
                <div className="card text-center py-12">
                    <p className="text-gray-500">No tenants found</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {tenants.map((tenant) => (
                        <div key={tenant._id} className="card hover:shadow-lg transition-shadow">
                            <div className="flex items-start gap-4">
                                {/* Profile Picture */}
                                <div className="flex-shrink-0">
                                    {tenant.personalDetails.photoURL ? (
                                        <img
                                            src={tenant.personalDetails.photoURL}
                                            alt={tenant.personalDetails.name}
                                            className="w-16 h-16 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                                            <User className="w-8 h-8 text-primary" />
                                        </div>
                                    )}
                                </div>

                                {/* Tenant Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2">
                                        <div>
                                            <h3 className="font-semibold text-gray-900 truncate">
                                                {tenant.personalDetails.name}
                                            </h3>
                                            <p className="text-sm text-gray-600">
                                                {tenant.personalDetails.mobile}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-primary">₹{tenant.stayDetails.rentAmount}</p>
                                            <p className="text-xs text-gray-500">per month</p>
                                        </div>
                                    </div>

                                    {/* Room Info */}
                                    <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                                        <span className="bg-gray-100 px-2 py-1 rounded">
                                            {tenant.stayDetails.floorName}
                                        </span>
                                        <span className="bg-gray-100 px-2 py-1 rounded">
                                            Room {tenant.stayDetails.roomNumber}
                                        </span>
                                        <span className="bg-gray-100 px-2 py-1 rounded">
                                            Bed {tenant.stayDetails.bedId}
                                        </span>
                                    </div>

                                    {/* Next Due & Status */}
                                    <div className="mt-2 flex items-center justify-between">
                                        <div className="text-sm">
                                            <span className="text-gray-600">Next Due: </span>
                                            <span className="font-medium text-gray-900">
                                                {tenant.nextDueDate ? formatDate(tenant.nextDueDate) : 'N/A'}
                                            </span>
                                        </div>
                                        <span className={`badge ${getStatusBadge(tenant.stayDetails.status)}`}>
                                            {tenant.stayDetails.status}
                                        </span>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="mt-3 flex gap-2">
                                        <a
                                            href={`tel:${tenant.personalDetails.mobile}`}
                                            className="flex-1 btn btn-primary flex items-center justify-center gap-2"
                                        >
                                            <Phone className="w-4 h-4" />
                                            Call
                                        </a>
                                        <a
                                            href={`sms:${tenant.personalDetails.mobile}`}
                                            className="flex-1 btn btn-secondary flex items-center justify-center gap-2"
                                        >
                                            <MessageCircle className="w-4 h-4" />
                                            Message
                                        </a>
                                    </div>

                                    {/* App Status */}
                                    {!tenant.appDownloaded && (
                                        <div className="mt-2 text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded">
                                            ⚠️ Tenant did not download app
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TenantList;
