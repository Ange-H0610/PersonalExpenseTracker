const mongoose = require('mongoose');

const incomeSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    source: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50
    },
    date: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    isRecurring: {
        type: Boolean,
        default: false
    },
    recurringPeriod: {
        type: String,
        enum: ['weekly', 'monthly', 'yearly', null],
        default: null
    }
});

module.exports = mongoose.model('Income', incomeSchema);