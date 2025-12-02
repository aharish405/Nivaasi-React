import express from 'express';
import Menu from '../models/Menu.js';

const router = express.Router();

// GET all menus (weekly)
router.get('/', async (req, res) => {
    try {
        const menus = await Menu.find().sort({ day: 1 });
        res.json(menus);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET menu for specific day
router.get('/:day', async (req, res) => {
    try {
        const menu = await Menu.findOne({
            day: req.params.day.charAt(0).toUpperCase() + req.params.day.slice(1).toLowerCase()
        });

        if (!menu) {
            return res.status(404).json({ message: 'Menu not found for this day' });
        }

        res.json(menu);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST create menu for a day
router.post('/', async (req, res) => {
    const menu = new Menu(req.body);

    try {
        const newMenu = await menu.save();
        res.status(201).json(newMenu);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// PUT update menu for a day
router.put('/:day', async (req, res) => {
    try {
        const dayCapitalized = req.params.day.charAt(0).toUpperCase() + req.params.day.slice(1).toLowerCase();

        const menu = await Menu.findOneAndUpdate(
            { day: dayCapitalized },
            { meals: req.body.meals },
            { new: true, runValidators: true, upsert: true }
        );

        res.json(menu);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE menu for a day
router.delete('/:day', async (req, res) => {
    try {
        const dayCapitalized = req.params.day.charAt(0).toUpperCase() + req.params.day.slice(1).toLowerCase();

        const menu = await Menu.findOneAndDelete({ day: dayCapitalized });

        if (!menu) {
            return res.status(404).json({ message: 'Menu not found' });
        }

        res.json({ message: 'Menu deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
