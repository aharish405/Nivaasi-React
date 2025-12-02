import mongoose from 'mongoose';

const paymentHistorySchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    mode: {
        type: String,
        enum: ['Cash', 'UPI', 'Bank Transfer', 'Card'],
        required: true
    },
    status: {
        type: String,
        enum: ['Collected', 'Pending'],
        default: 'Collected'
    },
    remarks: String
});

const tenantSchema = new mongoose.Schema({
    personalDetails: {
        name: {
            type: String,
            required: true,
            trim: true
        },
        mobile: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            trim: true,
            lowercase: true
        },
        gender: {
            type: String,
            enum: ['Male', 'Female', 'Other'],
            required: true
        },
        dob: {
            type: Date
        },
        photoURL: {
            type: String,
            default: ''
        }
    },
    stayDetails: {
        propertyId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Property',
            required: true
        },
        floorName: {
            type: String,
            required: true
        },
        roomNumber: {
            type: String,
            required: true
        },
        bedId: {
            type: String,
            required: true
        },
        joinDate: {
            type: Date,
            required: true,
            default: Date.now
        },
        rentAmount: {
            type: Number,
            required: true
        },
        securityDeposit: {
            type: Number,
            default: 0
        },
        status: {
            type: String,
            enum: ['Active', 'Vacated', 'On Notice'],
            default: 'Active'
        },
        noticeDate: {
            type: Date
        }
    },
    paymentHistory: [paymentHistorySchema],
    appDownloaded: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

// Virtual for next due date (assuming monthly rent)
tenantSchema.virtual('nextDueDate').get(function () {
    if (this.paymentHistory.length === 0) {
        return this.stayDetails.joinDate;
    }

    const lastPayment = this.paymentHistory
        .filter(p => p.status === 'Collected')
        .sort((a, b) => b.date - a.date)[0];

    if (!lastPayment) {
        return this.stayDetails.joinDate;
    }

    const nextDue = new Date(lastPayment.date);
    nextDue.setMonth(nextDue.getMonth() + 1);
    return nextDue;
});

// Virtual for outstanding amount
tenantSchema.virtual('outstandingAmount').get(function () {
    const today = new Date();
    const joinDate = new Date(this.stayDetails.joinDate);
    const monthsDiff = (today.getFullYear() - joinDate.getFullYear()) * 12 +
        (today.getMonth() - joinDate.getMonth()) + 1;

    const totalDue = monthsDiff * this.stayDetails.rentAmount;
    const totalPaid = this.paymentHistory
        .filter(p => p.status === 'Collected')
        .reduce((sum, p) => sum + p.amount, 0);

    return Math.max(0, totalDue - totalPaid);
});

tenantSchema.set('toJSON', { virtuals: true });
tenantSchema.set('toObject', { virtuals: true });

const Tenant = mongoose.model('Tenant', tenantSchema);

export default Tenant;
