import express from 'express';
import Tenant from '../models/Tenant.js';
import Property from '../models/Property.js';

const router = express.Router();

// GET all tenants with optional filters
router.get('/', async (req, res) => {
    try {
        const { status, propertyId, search } = req.query;
        let query = {};

        if (status) {
            query['stayDetails.status'] = status;
        }

        if (propertyId) {
            query['stayDetails.propertyId'] = propertyId;
        }

        if (search) {
            query.$or = [
                { 'personalDetails.name': { $regex: search, $options: 'i' } },
                { 'personalDetails.mobile': { $regex: search, $options: 'i' } }
            ];
        }

        const tenants = await Tenant.find(query)
            .sort({ createdAt: -1 });

        res.json(tenants);
    } catch (error) {
        console.error('Tenant GET error:', error);
        res.status(500).json({ message: error.message });
    }
});

// GET single tenant by ID
router.get('/:id', async (req, res) => {
    try {
        const tenant = await Tenant.findById(req.params.id)
            .populate('stayDetails.propertyId');

        if (!tenant) {
            return res.status(404).json({ message: 'Tenant not found' });
        }

        res.json(tenant);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST create new tenant
router.post('/', async (req, res) => {
    const tenant = new Tenant(req.body);

    try {
        // Update bed status in property
        const property = await Property.findById(req.body.stayDetails.propertyId);

        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }

        // Find and update the bed
        let bedFound = false;
        property.floors.forEach(floor => {
            if (floor.floorName === req.body.stayDetails.floorName) {
                floor.rooms.forEach(room => {
                    if (room.roomNumber === req.body.stayDetails.roomNumber) {
                        room.beds.forEach(bed => {
                            if (bed.bedId === req.body.stayDetails.bedId) {
                                bed.status = 'Occupied';
                                bed.tenantId = tenant._id;
                                bedFound = true;
                            }
                        });
                    }
                });
            }
        });

        if (!bedFound) {
            return res.status(404).json({ message: 'Bed not found' });
        }

        await property.save();
        const newTenant = await tenant.save();

        res.status(201).json(newTenant);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// PUT update tenant
router.put('/:id', async (req, res) => {
    try {
        const tenant = await Tenant.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!tenant) {
            return res.status(404).json({ message: 'Tenant not found' });
        }

        res.json(tenant);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE tenant
router.delete('/:id', async (req, res) => {
    try {
        const tenant = await Tenant.findById(req.params.id);

        if (!tenant) {
            return res.status(404).json({ message: 'Tenant not found' });
        }

        // Update bed status in property
        const property = await Property.findById(tenant.stayDetails.propertyId);

        if (property) {
            property.floors.forEach(floor => {
                floor.rooms.forEach(room => {
                    room.beds.forEach(bed => {
                        if (bed.tenantId && bed.tenantId.toString() === tenant._id.toString()) {
                            bed.status = 'Available';
                            bed.tenantId = null;
                        }
                    });
                });
            });
            await property.save();
        }

        await Tenant.findByIdAndDelete(req.params.id);
        res.json({ message: 'Tenant deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST add payment to tenant
router.post('/:id/payment', async (req, res) => {
    try {
        const tenant = await Tenant.findById(req.params.id);

        if (!tenant) {
            return res.status(404).json({ message: 'Tenant not found' });
        }

        tenant.paymentHistory.push(req.body);
        await tenant.save();

        res.status(201).json(tenant);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// GET unpaid tenants
router.get('/status/unpaid', async (req, res) => {
    try {
        const tenants = await Tenant.find({ 'stayDetails.status': 'Active' });

        const unpaidTenants = tenants.filter(tenant => {
            return tenant.outstandingAmount > 0;
        });

        res.json(unpaidTenants);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
