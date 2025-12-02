import React, { useState, useEffect } from 'react';
import { Coffee, Utensils, Cookie, Moon, Edit2 } from 'lucide-react';

const FoodMenu = () => {
    const [menus, setMenus] = useState([]);
    const [selectedDay, setSelectedDay] = useState('Monday');
    const [loading, setLoading] = useState(false);
    const [editMode, setEditMode] = useState(false);

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    useEffect(() => {
        fetchMenus();
    }, []);

    const fetchMenus = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/menu');
            if (response.ok) {
                const data = await response.json();
                setMenus(data);
            }
        } catch (error) {
            console.error('Failed to fetch menus:', error);
        } finally {
            setLoading(false);
        }
    };

    const currentMenu = menus.find(m => m.day === selectedDay);

    const getMealIcon = (mealType) => {
        const icons = {
            breakfast: Coffee,
            lunch: Utensils,
            snacks: Cookie,
            dinner: Moon
        };
        return icons[mealType] || Utensils;
    };

    const getMealColor = (mealType) => {
        const colors = {
            breakfast: 'from-orange-400 to-orange-500',
            lunch: 'from-green-400 to-green-500',
            snacks: 'from-purple-400 to-purple-500',
            dinner: 'from-blue-400 to-blue-500'
        };
        return colors[mealType] || 'from-gray-400 to-gray-500';
    };

    const renderMealCard = (mealType, mealData) => {
        if (!mealData) return null;

        const Icon = getMealIcon(mealType);
        const colorClass = getMealColor(mealType);

        return (
            <div className="card">
                <div className={`bg-gradient-to-br ${colorClass} text-white p-4 -m-4 mb-4 rounded-t-xl`}>
                    <div className="flex items-center gap-2">
                        <Icon className="w-5 h-5" />
                        <h3 className="font-semibold capitalize">{mealType}</h3>
                    </div>
                    <p className="text-sm opacity-90 mt-1">{mealData.time}</p>
                </div>
                <div className="space-y-2">
                    <p className="text-gray-900 font-medium">{mealData.item}</p>
                    {editMode && (
                        <button className="text-sm text-primary hover:underline flex items-center gap-1">
                            <Edit2 className="w-3 h-3" />
                            Edit
                        </button>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="card flex items-center justify-between">
                <h1 className="text-xl font-bold text-gray-900">Food Menu</h1>
                <button
                    onClick={() => setEditMode(!editMode)}
                    className={`btn ${editMode ? 'btn-primary' : 'btn-secondary'} flex items-center gap-2`}
                >
                    <Edit2 className="w-4 h-4" />
                    {editMode ? 'Done' : 'Edit'}
                </button>
            </div>

            {/* Day Tabs */}
            <div className="card">
                <div className="flex gap-2 overflow-x-auto pb-2">
                    {days.map((day) => (
                        <button
                            key={day}
                            onClick={() => setSelectedDay(day)}
                            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${selectedDay === day
                                    ? 'bg-primary text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            {day}
                        </button>
                    ))}
                </div>
            </div>

            {/* Meal Cards */}
            {loading ? (
                <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
            ) : currentMenu ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {renderMealCard('breakfast', currentMenu.meals?.breakfast)}
                    {renderMealCard('lunch', currentMenu.meals?.lunch)}
                    {renderMealCard('snacks', currentMenu.meals?.snacks)}
                    {renderMealCard('dinner', currentMenu.meals?.dinner)}
                </div>
            ) : (
                <div className="card text-center py-12">
                    <p className="text-gray-500">No menu available for {selectedDay}</p>
                    {editMode && (
                        <button className="btn btn-primary mt-4">
                            Add Menu for {selectedDay}
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default FoodMenu;
