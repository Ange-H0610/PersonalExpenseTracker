import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function isValidPassword(password) {
  const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password);
}

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: "Email invalide !" });
  }

  if (!isValidPassword(password)) {
    return res.status(400).json({
      error:
        "Mot de passe invalide ! Min 8 caractères, une maj, un chiffre, un symbole spécial",
    });
  }

  res.json({ token: "fake-jwt-token", message: "Connexion réussie !" });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(` Backend running on http://localhost:${PORT}`);
});
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Charger les variables d'environnement
dotenv.config();

// Importer les routes
const authRoutes = require('./routes/auth');
const expenseRoutes = require('./routes/expenses');
const incomeRoutes = require('./routes/incomes');

// Initialiser l'application Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connexion à la base de données
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/expense-tracker', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
    .then(() => console.log('Connecté à MongoDB'))
    .catch(err => console.error('Erreur de connexion à MongoDB:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/incomes', incomeRoutes);

// Route de test
app.get('/api/health', (req, res) => {
  res.json({ message: 'Serveur fonctionne correctement' });
});

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Quelque chose s\'est mal passé!' });
});

// Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});