const express = require('express');
const auth = require('../middleware/auth');
const Expense = require('../models/Expense');
const router = express.Router();

// Récupérer toutes les dépenses de l'utilisateur
router.get('/', auth, async (req, res) => {
    try {
        const expenses = await Expense.find({ userId: req.user._id }).sort({ date: -1 });
        res.json(expenses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Ajouter une nouvelle dépense
router.post('/', auth, async (req, res) => {
    try {
        const { amount, category, description, isRecurring, recurringPeriod } = req.body;

        const expense = new Expense({
            amount,
            category,
            description,
            isRecurring,
            recurringPeriod,
            userId: req.user._id
        });

        const savedExpense = await expense.save();
        res.status(201).json(savedExpense);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Modifier une dépense
router.put('/:id', auth, async (req, res) => {
    try {
        const { amount, category, description, isRecurring, recurringPeriod } = req.body;

        const expense = await Expense.findOne({ _id: req.params.id, userId: req.user._id });
        if (!expense) {
            return res.status(404).json({ message: 'Dépense non trouvée.' });
        }

        expense.amount = amount || expense.amount;
        expense.category = category || expense.category;
        expense.description = description || expense.description;
        expense.isRecurring = isRecurring !== undefined ? isRecurring : expense.isRecurring;
        expense.recurringPeriod = recurringPeriod || expense.recurringPeriod;

        const updatedExpense = await expense.save();
        res.json(updatedExpense);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Supprimer une dépense
router.delete('/:id', auth, async (req, res) => {
    try {
        const expense = await Expense.findOne({ _id: req.params.id, userId: req.user._id });
        if (!expense) {
            return res.status(404).json({ message: 'Dépense non trouvée.' });
        }

        await Expense.deleteOne({ _id: req.params.id });
        res.json({ message: 'Dépense supprimée avec succès.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Récupérer le résumé mensuel des dépenses
router.get('/summary/monthly', auth, async (req, res) => {
    try {
        const { year, month } = req.query;

        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0, 23, 59, 59);

        const expenses = await Expense.find({
            userId: req.user._id,
            date: { $gte: startDate, $lte: endDate }
        });

        const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
        const expensesByCategory = expenses.reduce((acc, expense) => {
            acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
            return acc;
        }, {});

        res.json({
            totalExpenses,
            expensesByCategory,
            count: expenses.length
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;