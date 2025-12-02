import React, { createContext, useContext, useState, useEffect } from 'react';

const TenantContext = createContext();

export const useTenant = () => {
    const context = useContext(TenantContext);
    if (!context) {
        throw new Error('useTenant must be used within TenantProvider');
    }
    return context;
};

export const TenantProvider = ({ children }) => {
    const [tenants, setTenants] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const API_URL = '/api/tenants';

    // Fetch all tenants
    const fetchTenants = async (filters = {}) => {
        setLoading(true);
        try {
            const queryParams = new URLSearchParams(filters).toString();
            const url = queryParams ? `${API_URL}?${queryParams}` : API_URL;
            const response = await fetch(url);
            if (!response.ok) throw new Error('Failed to fetch tenants');
            const data = await response.json();
            setTenants(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Fetch single tenant
    const fetchTenant = async (id) => {
        try {
            const response = await fetch(`${API_URL}/${id}`);
            if (!response.ok) throw new Error('Failed to fetch tenant');
            return await response.json();
        } catch (err) {
            setError(err.message);
            return null;
        }
    };

    // Create tenant
    const createTenant = async (tenantData) => {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(tenantData)
            });
            if (!response.ok) throw new Error('Failed to create tenant');
            const data = await response.json();
            setTenants([...tenants, data]);
            return data;
        } catch (err) {
            setError(err.message);
            return null;
        }
    };

    // Update tenant
    const updateTenant = async (id, tenantData) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(tenantData)
            });
            if (!response.ok) throw new Error('Failed to update tenant');
            const data = await response.json();
            setTenants(tenants.map(t => t._id === id ? data : t));
            return data;
        } catch (err) {
            setError(err.message);
            return null;
        }
    };

    // Add payment
    const addPayment = async (id, paymentData) => {
        try {
            const response = await fetch(`${API_URL}/${id}/payment`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(paymentData)
            });
            if (!response.ok) throw new Error('Failed to add payment');
            const data = await response.json();
            setTenants(tenants.map(t => t._id === id ? data : t));
            return data;
        } catch (err) {
            setError(err.message);
            return null;
        }
    };

    // Get unpaid tenants
    const getUnpaidTenants = async () => {
        try {
            const response = await fetch(`${API_URL}/status/unpaid`);
            if (!response.ok) throw new Error('Failed to fetch unpaid tenants');
            return await response.json();
        } catch (err) {
            setError(err.message);
            return [];
        }
    };

    // Search tenants
    const searchTenants = (query) => {
        setSearchQuery(query);
        if (query) {
            fetchTenants({ search: query });
        } else {
            fetchTenants();
        }
    };

    useEffect(() => {
        fetchTenants();
    }, []);

    const value = {
        tenants,
        loading,
        error,
        searchQuery,
        fetchTenants,
        fetchTenant,
        createTenant,
        updateTenant,
        addPayment,
        getUnpaidTenants,
        searchTenants
    };

    return (
        <TenantContext.Provider value={value}>
            {children}
        </TenantContext.Provider>
    );
};
