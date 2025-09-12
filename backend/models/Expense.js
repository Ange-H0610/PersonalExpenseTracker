const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        required: true,
        enum: ['Food', 'Transport', 'Entertainment', 'Housing', 'Utilities', 'Healthcare', 'Other']
    },
    description: {
        type: String,
        trim: true,
        maxlength: 100
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
        enum: ['daily', 'weekly', 'monthly', null],
        default: null
    }
});

module.exports = mongoose.model('Expense', expenseSchema);