import mongoose from 'mongoose';

const mealSchema = new mongoose.Schema({
    item: {
        type: String,
        required: true,
        trim: true
    },
    time: {
        type: String,
        required: true
    }
}, { _id: false });

const menuSchema = new mongoose.Schema({
    day: {
        type: String,
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        required: true,
        unique: true
    },
    meals: {
        breakfast: mealSchema,
        lunch: mealSchema,
        snacks: mealSchema,
        dinner: mealSchema
    }
}, {
    timestamps: true
});

const Menu = mongoose.model('Menu', menuSchema);

export default Menu;
