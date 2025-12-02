import React, { useState } from 'react';
import { useProperty } from '../contexts/PropertyContext';

const RoomGrid = () => {
    const { currentProperty, loading } = useProperty();
    const [selectedFloor, setSelectedFloor] = useState(0);
    const [selectedBed, setSelectedBed] = useState(null);

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!currentProperty || !currentProperty.floors || currentProperty.floors.length === 0) {
        return (
            <div className="card text-center py-12">
                <p className="text-gray-500">No property data available</p>
            </div>
        );
    }

    const currentFloor = currentProperty.floors[selectedFloor];

    // Calculate stats for current floor
    const stats = {
        capacity: 0,
        available: 0,
        occupied: 0
    };

    currentFloor?.rooms?.forEach(room => {
        room.beds?.forEach(bed => {
            stats.capacity++;
            if (bed.status === 'Available') stats.available++;
            if (bed.status === 'Occupied') stats.occupied++;
        });
    });

    const getBedColor = (status) => {
        switch (status) {
            case 'Occupied':
                return 'bg-red-500';
            case 'Available':
                return 'bg-green-500';
            case 'Notice':
                return 'bg-yellow-500';
            case 'Blocked':
                return 'bg-gray-400';
            default:
                return 'bg-gray-300';
        }
    };

    const handleBedClick = (bed, roomNumber) => {
        setSelectedBed({ ...bed, roomNumber });
    };

    return (
        <div className="space-y-4">
            {/* Floor Tabs */}
            <div className="card">
                <div className="flex gap-2 overflow-x-auto pb-2">
                    {currentProperty.floors.map((floor, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedFloor(index)}
                            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${selectedFloor === index
                                    ? 'bg-primary text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            {floor.floorName}
                        </button>
                    ))}
                </div>
            </div>

            {/* Room Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentFloor?.rooms?.map((room, roomIndex) => (
                    <div key={roomIndex} className="card">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="font-semibold text-gray-900">Room {room.roomNumber}</h3>
                            <span className="text-sm text-gray-500">Capacity: {room.capacity}</span>
                        </div>

                        {/* Beds */}
                        <div className="grid grid-cols-4 gap-2 mb-3">
                            {room.beds?.map((bed, bedIndex) => (
                                <button
                                    key={bedIndex}
                                    onClick={() => handleBedClick(bed, room.roomNumber)}
                                    className={`aspect-square rounded-lg ${getBedColor(bed.status)} 
                    hover:opacity-80 transition-all flex items-center justify-center
                    ${selectedBed?.bedId === bed.bedId ? 'ring-2 ring-primary ring-offset-2' : ''}`}
                                    title={`${bed.bedId} - ${bed.status}`}
                                >
                                    <span className="text-white text-xs font-medium">{bed.bedId}</span>
                                </button>
                            ))}
                        </div>

                        {/* Room Stats */}
                        <div className="flex gap-2 text-xs">
                            <span className="flex items-center gap-1">
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                {room.beds?.filter(b => b.status === 'Available').length || 0}
                            </span>
                            <span className="flex items-center gap-1">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                {room.beds?.filter(b => b.status === 'Occupied').length || 0}
                            </span>
                            <span className="flex items-center gap-1">
                                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                {room.beds?.filter(b => b.status === 'Notice').length || 0}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Floor Stats Footer */}
            <div className="card bg-primary text-white">
                <div className="flex justify-around text-center">
                    <div>
                        <div className="text-2xl font-bold">{stats.capacity}</div>
                        <div className="text-sm opacity-90">Capacity</div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold">{stats.available}</div>
                        <div className="text-sm opacity-90">Available</div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold">{stats.occupied}</div>
                        <div className="text-sm opacity-90">Occupied</div>
                    </div>
                </div>
            </div>

            {/* Bed Details Modal (Simple) */}
            {selectedBed && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                    onClick={() => setSelectedBed(null)}>
                    <div className="card max-w-sm w-full" onClick={(e) => e.stopPropagation()}>
                        <h3 className="text-lg font-bold mb-4">Bed Details</h3>
                        <div className="space-y-2">
                            <p><span className="font-medium">Bed ID:</span> {selectedBed.bedId}</p>
                            <p><span className="font-medium">Room:</span> {selectedBed.roomNumber}</p>
                            <p><span className="font-medium">Status:</span>
                                <span className={`ml-2 badge ${selectedBed.status === 'Available' ? 'badge-success' :
                                        selectedBed.status === 'Occupied' ? 'badge-danger' :
                                            selectedBed.status === 'Notice' ? 'badge-warning' : 'bg-gray-200'
                                    }`}>
                                    {selectedBed.status}
                                </span>
                            </p>
                        </div>
                        <button
                            onClick={() => setSelectedBed(null)}
                            className="btn btn-primary w-full mt-4"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RoomGrid;
