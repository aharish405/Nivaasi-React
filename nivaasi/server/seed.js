import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Property from './models/Property.js';
import Tenant from './models/Tenant.js';
import Menu from './models/Menu.js';
import Transaction from './models/Transaction.js';

dotenv.config();

// Sample data
const sampleProperty = {
    name: 'Sunrise PG & Hostel',
    address: '123 Main Street, Bangalore, Karnataka - 560001',
    contactNumber: '+91 98765 43210',
    floors: [
        {
            floorName: 'Ground Floor',
            rooms: [
                {
                    roomNumber: '101',
                    capacity: 4,
                    beds: [
                        { bedId: 'A1', status: 'Occupied' },
                        { bedId: 'A2', status: 'Occupied' },
                        { bedId: 'A3', status: 'Available' },
                        { bedId: 'A4', status: 'Available' }
                    ]
                },
                {
                    roomNumber: '102',
                    capacity: 4,
                    beds: [
                        { bedId: 'B1', status: 'Occupied' },
                        { bedId: 'B2', status: 'Notice' },
                        { bedId: 'B3', status: 'Available' },
                        { bedId: 'B4', status: 'Blocked' }
                    ]
                }
            ]
        },
        {
            floorName: 'First Floor',
            rooms: [
                {
                    roomNumber: '201',
                    capacity: 3,
                    beds: [
                        { bedId: 'C1', status: 'Occupied' },
                        { bedId: 'C2', status: 'Occupied' },
                        { bedId: 'C3', status: 'Available' }
                    ]
                },
                {
                    roomNumber: '202',
                    capacity: 3,
                    beds: [
                        { bedId: 'D1', status: 'Occupied' },
                        { bedId: 'D2', status: 'Available' },
                        { bedId: 'D3', status: 'Available' }
                    ]
                }
            ]
        }
    ]
};

const sampleMenus = [
    {
        day: 'Monday',
        meals: {
            breakfast: { item: 'Idli, Sambar, Chutney', time: '8:00 AM' },
            lunch: { item: 'Rice, Dal, Vegetable Curry, Roti', time: '1:00 PM' },
            snacks: { item: 'Tea, Biscuits', time: '5:00 PM' },
            dinner: { item: 'Chapati, Paneer Curry, Rice', time: '8:30 PM' }
        }
    },
    {
        day: 'Tuesday',
        meals: {
            breakfast: { item: 'Poha, Tea', time: '8:00 AM' },
            lunch: { item: 'Rice, Sambar, Vegetable Fry, Curd', time: '1:00 PM' },
            snacks: { item: 'Coffee, Pakora', time: '5:00 PM' },
            dinner: { item: 'Roti, Dal Tadka, Rice', time: '8:30 PM' }
        }
    },
    {
        day: 'Wednesday',
        meals: {
            breakfast: { item: 'Upma, Coffee', time: '8:00 AM' },
            lunch: { item: 'Rice, Rasam, Mixed Veg, Papad', time: '1:00 PM' },
            snacks: { item: 'Tea, Samosa', time: '5:00 PM' },
            dinner: { item: 'Chapati, Rajma Curry, Rice', time: '8:30 PM' }
        }
    },
    {
        day: 'Thursday',
        meals: {
            breakfast: { item: 'Dosa, Chutney, Sambar', time: '8:00 AM' },
            lunch: { item: 'Rice, Dal, Aloo Gobi, Roti', time: '1:00 PM' },
            snacks: { item: 'Tea, Bread Pakora', time: '5:00 PM' },
            dinner: { item: 'Roti, Chole, Rice', time: '8:30 PM' }
        }
    },
    {
        day: 'Friday',
        meals: {
            breakfast: { item: 'Paratha, Curd, Pickle', time: '8:00 AM' },
            lunch: { item: 'Rice, Kadhi, Bhindi Fry, Roti', time: '1:00 PM' },
            snacks: { item: 'Coffee, Vada', time: '5:00 PM' },
            dinner: { item: 'Chapati, Palak Paneer, Rice', time: '8:30 PM' }
        }
    },
    {
        day: 'Saturday',
        meals: {
            breakfast: { item: 'Puri, Aloo Curry', time: '8:00 AM' },
            lunch: { item: 'Biryani, Raita, Salad', time: '1:00 PM' },
            snacks: { item: 'Tea, Bonda', time: '5:00 PM' },
            dinner: { item: 'Roti, Mixed Dal, Rice', time: '8:30 PM' }
        }
    },
    {
        day: 'Sunday',
        meals: {
            breakfast: { item: 'Bread, Omelette, Tea', time: '9:00 AM' },
            lunch: { item: 'Rice, Chicken Curry, Roti, Salad', time: '1:30 PM' },
            snacks: { item: 'Coffee, Cake', time: '5:00 PM' },
            dinner: { item: 'Chapati, Veg Korma, Rice', time: '8:30 PM' }
        }
    }
];

async function seedDatabase() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Clear existing data
        await Property.deleteMany({});
        await Tenant.deleteMany({});
        await Menu.deleteMany({});
        await Transaction.deleteMany({});
        console.log('🗑️  Cleared existing data');

        // Insert property
        const property = await Property.create(sampleProperty);
        console.log('✅ Created sample property');

        // Insert sample tenants
        const sampleTenants = [
            {
                personalDetails: {
                    name: 'Rajesh Kumar',
                    mobile: '9876543210',
                    email: 'rajesh@example.com',
                    gender: 'Male',
                    dob: new Date('1998-05-15'),
                    photoURL: ''
                },
                stayDetails: {
                    propertyId: property._id,
                    floorName: 'Ground Floor',
                    roomNumber: '101',
                    bedId: 'A1',
                    joinDate: new Date('2024-01-01'),
                    rentAmount: 8000,
                    securityDeposit: 16000,
                    status: 'Active'
                },
                paymentHistory: [
                    {
                        amount: 8000,
                        date: new Date('2024-01-05'),
                        mode: 'UPI',
                        status: 'Collected'
                    }
                ],
                appDownloaded: false
            },
            {
                personalDetails: {
                    name: 'Priya Sharma',
                    mobile: '9876543211',
                    email: 'priya@example.com',
                    gender: 'Female',
                    dob: new Date('1999-08-22'),
                    photoURL: ''
                },
                stayDetails: {
                    propertyId: property._id,
                    floorName: 'Ground Floor',
                    roomNumber: '101',
                    bedId: 'A2',
                    joinDate: new Date('2024-02-01'),
                    rentAmount: 8000,
                    securityDeposit: 16000,
                    status: 'Active'
                },
                paymentHistory: [],
                appDownloaded: true
            },
            {
                personalDetails: {
                    name: 'Amit Patel',
                    mobile: '9876543212',
                    email: 'amit@example.com',
                    gender: 'Male',
                    dob: new Date('1997-11-10'),
                    photoURL: ''
                },
                stayDetails: {
                    propertyId: property._id,
                    floorName: 'First Floor',
                    roomNumber: '201',
                    bedId: 'C1',
                    joinDate: new Date('2023-12-01'),
                    rentAmount: 9000,
                    securityDeposit: 18000,
                    status: 'Active'
                },
                paymentHistory: [
                    {
                        amount: 9000,
                        date: new Date('2024-01-05'),
                        mode: 'Bank Transfer',
                        status: 'Collected'
                    }
                ],
                appDownloaded: true
            }
        ];

        const tenants = await Tenant.create(sampleTenants);
        console.log('✅ Created sample tenants');

        // Update bed statuses with tenant IDs
        property.floors[0].rooms[0].beds[0].tenantId = tenants[0]._id;
        property.floors[0].rooms[0].beds[1].tenantId = tenants[1]._id;
        property.floors[1].rooms[0].beds[0].tenantId = tenants[2]._id;
        await property.save();
        console.log('✅ Updated bed assignments');

        // Insert menus
        await Menu.create(sampleMenus);
        console.log('✅ Created weekly menu');

        // Insert sample transactions
        const sampleTransactions = [
            {
                type: 'Rent',
                amount: 8000,
                date: new Date('2024-01-05'),
                status: 'Collected',
                tenantId: tenants[0]._id,
                propertyId: property._id,
                mode: 'UPI',
                description: 'January rent - Rajesh Kumar'
            },
            {
                type: 'Deposit',
                amount: 16000,
                date: new Date('2024-01-01'),
                status: 'Collected',
                tenantId: tenants[0]._id,
                propertyId: property._id,
                mode: 'Bank Transfer',
                description: 'Security deposit - Rajesh Kumar'
            },
            {
                type: 'Expense',
                amount: 5000,
                date: new Date('2024-01-10'),
                status: 'Collected',
                propertyId: property._id,
                mode: 'Cash',
                description: 'Electricity bill'
            },
            {
                type: 'Rent',
                amount: 8000,
                date: new Date('2024-02-05'),
                status: 'Pending',
                tenantId: tenants[1]._id,
                propertyId: property._id,
                mode: 'N/A',
                description: 'February rent - Priya Sharma'
            }
        ];

        await Transaction.create(sampleTransactions);
        console.log('✅ Created sample transactions');

        console.log('\n🎉 Database seeded successfully!');
        console.log(`Property ID: ${property._id}`);

        mongoose.connection.close();
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
}

seedDatabase();
