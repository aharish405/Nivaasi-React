import React, { createContext, useContext, useState, useEffect } from 'react';

const PropertyContext = createContext();

export const useProperty = () => {
    const context = useContext(PropertyContext);
    if (!context) {
        throw new Error('useProperty must be used within PropertyProvider');
    }
    return context;
};

export const PropertyProvider = ({ children }) => {
    const [properties, setProperties] = useState([]);
    const [currentProperty, setCurrentProperty] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const API_URL = '/api/properties';

    // Fetch all properties
    const fetchProperties = async () => {
        setLoading(true);
        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error('Failed to fetch properties');
            const data = await response.json();
            setProperties(data);
            if (data.length > 0 && !currentProperty) {
                setCurrentProperty(data[0]);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Fetch single property
    const fetchProperty = async (id) => {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/${id}`);
            if (!response.ok) throw new Error('Failed to fetch property');
            const data = await response.json();
            setCurrentProperty(data);
            return data;
        } catch (err) {
            setError(err.message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    // Create property
    const createProperty = async (propertyData) => {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(propertyData)
            });
            if (!response.ok) throw new Error('Failed to create property');
            const data = await response.json();
            setProperties([...properties, data]);
            return data;
        } catch (err) {
            setError(err.message);
            return null;
        }
    };

    // Update property
    const updateProperty = async (id, propertyData) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(propertyData)
            });
            if (!response.ok) throw new Error('Failed to update property');
            const data = await response.json();
            setProperties(properties.map(p => p._id === id ? data : p));
            if (currentProperty?._id === id) {
                setCurrentProperty(data);
            }
            return data;
        } catch (err) {
            setError(err.message);
            return null;
        }
    };

    // Get property stats
    const getPropertyStats = async (id) => {
        try {
            const response = await fetch(`${API_URL}/${id}/stats`);
            if (!response.ok) throw new Error('Failed to fetch stats');
            return await response.json();
        } catch (err) {
            setError(err.message);
            return null;
        }
    };

    useEffect(() => {
        fetchProperties();
    }, []);

    const value = {
        properties,
        currentProperty,
        setCurrentProperty,
        loading,
        error,
        fetchProperties,
        fetchProperty,
        createProperty,
        updateProperty,
        getPropertyStats
    };

    return (
        <PropertyContext.Provider value={value}>
            {children}
        </PropertyContext.Provider>
    );
};
