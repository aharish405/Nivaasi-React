import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Rent', 'Deposit', 'Expense'],
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['Collected', 'Pending'],
        default: 'Pending'
    },
    tenantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tenant'
    },
    propertyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property'
    },
    description: {
        type: String,
        trim: true
    },
    mode: {
        type: String,
        enum: ['Cash', 'UPI', 'Bank Transfer', 'Card', 'N/A'],
        default: 'N/A'
    }
}, {
    timestamps: true
});

// Index for faster queries
transactionSchema.index({ date: -1 });
transactionSchema.index({ type: 1, status: 1 });

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;
