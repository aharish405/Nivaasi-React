import express from 'express';
import Transaction from '../models/Transaction.js';

const router = express.Router();

// GET all transactions with optional filters
router.get('/', async (req, res) => {
    try {
        const { type, status, startDate, endDate } = req.query;
        let query = {};

        if (type) {
            query.type = type;
        }

        if (status) {
            query.status = status;
        }

        if (startDate || endDate) {
            query.date = {};
            if (startDate) query.date.$gte = new Date(startDate);
            if (endDate) query.date.$lte = new Date(endDate);
        }

        const transactions = await Transaction.find(query)
            .sort({ date: -1 });

        res.json(transactions);
    } catch (error) {
        console.error('Transaction GET error:', error);
        res.status(500).json({ message: error.message });
    }
});

// GET single transaction
router.get('/:id', async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id)
            .populate('tenantId')
            .populate('propertyId');

        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        res.json(transaction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST create new transaction
router.post('/', async (req, res) => {
    const transaction = new Transaction(req.body);

    try {
        const newTransaction = await transaction.save();
        res.status(201).json(newTransaction);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// PUT update transaction
router.put('/:id', async (req, res) => {
    try {
        const transaction = await Transaction.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        res.json(transaction);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE transaction
router.delete('/:id', async (req, res) => {
    try {
        const transaction = await Transaction.findByIdAndDelete(req.params.id);

        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        res.json({ message: 'Transaction deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET financial summary
router.get('/summary/all', async (req, res) => {
    try {
        const summary = await Transaction.aggregate([
            {
                $group: {
                    _id: '$type',
                    total: { $sum: '$amount' },
                    collected: {
                        $sum: {
                            $cond: [{ $eq: ['$status', 'Collected'] }, '$amount', 0]
                        }
                    },
                    pending: {
                        $sum: {
                            $cond: [{ $eq: ['$status', 'Pending'] }, '$amount', 0]
                        }
                    }
                }
            }
        ]);

        res.json(summary);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
