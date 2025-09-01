const express = require('express');
const { specs, swaggerUi } = require('./swaggerConfig');

const app = express();

// Middlewares
app.use(express.json());

// Routes Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Vos routes existantes
app.use('/api/users', require('./routes/users'));
app.use('/api/expenses', require('./routes/expenses'));

// Exemple de route avec documentation
/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: Vérifier l'état de l'API
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: API fonctionnelle
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 */
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString()
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});