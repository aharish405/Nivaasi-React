import express from 'express';
import Property from '../models/Property.js';

const router = express.Router();

// GET all properties
router.get('/', async (req, res) => {
    try {
        const properties = await Property.find();
        res.json(properties);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET single property by ID
router.get('/:id', async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }
        res.json(property);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST create new property
router.post('/', async (req, res) => {
    const property = new Property(req.body);

    try {
        const newProperty = await property.save();
        res.status(201).json(newProperty);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// PUT update property
router.put('/:id', async (req, res) => {
    try {
        const property = await Property.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }

        res.json(property);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE property
router.delete('/:id', async (req, res) => {
    try {
        const property = await Property.findByIdAndDelete(req.params.id);

        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }

        res.json({ message: 'Property deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET property statistics
router.get('/:id/stats', async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);

        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }

        let stats = {
            total: 0,
            available: 0,
            occupied: 0,
            notice: 0,
            blocked: 0
        };

        property.floors.forEach(floor => {
            floor.rooms.forEach(room => {
                room.beds.forEach(bed => {
                    stats.total++;
                    stats[bed.status.toLowerCase()]++;
                });
            });
        });

        res.json(stats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
