const express = require('express');
const auth = require('../middleware/auth');
const Income = require('../models/Income');
const router = express.Router();

// Récupérer tous les revenus de l'utilisateur
router.get('/', auth, async (req, res) => {
    try {
        const incomes = await Income.find({ userId: req.user._id }).sort({ date: -1 });
        res.json(incomes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Ajouter un nouveau revenu
router.post('/', auth, async (req, res) => {
    try {
        const { amount, source, isRecurring, recurringPeriod } = req.body;

        const income = new Income({
            amount,
            source,
            isRecurring,
            recurringPeriod,
            userId: req.user._id
        });

        const savedIncome = await income.save();
        res.status(201).json(savedIncome);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Modifier un revenu
router.put('/:id', auth, async (req, res) => {
    try {
        const { amount, source, isRecurring, recurringPeriod } = req.body;

        const income = await Income.findOne({ _id: req.params.id, userId: req.user._id });
        if (!income) {
            return res.status(404).json({ message: 'Revenu non trouvé.' });
        }

        income.amount = amount || income.amount;
        income.source = source || income.source;
        income.isRecurring = isRecurring !== undefined ? isRecurring : income.isRecurring;
        income.recurringPeriod = recurringPeriod || income.recurringPeriod;

        const updatedIncome = await income.save();
        res.json(updatedIncome);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Supprimer un revenu
router.delete('/:id', auth, async (req, res) => {
    try {
        const income = await Income.findOne({ _id: req.params.id, userId: req.user._id });
        if (!income) {
            return res.status(404).json({ message: 'Revenu non trouvé.' });
        }

        await Income.deleteOne({ _id: req.params.id });
        res.json({ message: 'Revenu supprimé avec succès.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Récupérer le résumé mensuel des revenus
router.get('/summary/monthly', auth, async (req, res) => {
    try {
        const { year, month } = req.query;

        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0, 23, 59, 59);

        const incomes = await Income.find({
            userId: req.user._id,
            date: { $gte: startDate, $lte: endDate }
        });

        const totalIncomes = incomes.reduce((sum, income) => sum + income.amount, 0);
        const incomesBySource = incomes.reduce((acc, income) => {
            acc[income.source] = (acc[income.source] || 0) + income.amount;
            return acc;
        }, {});

        res.json({
            totalIncomes,
            incomesBySource,
            count: incomes.length
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;