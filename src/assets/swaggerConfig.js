const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Personal Expense Tracker API',
            version: '1.0.0',
            description: 'API pour la gestion des dépenses personnelles',
        },
        servers: [
            {
                url: 'http://localhost:3000/api',
                description: 'Serveur de développement',
            },
        ],
    },
    apis: ['./routes/*.js', './controllers/*.js'], // Adaptez selon votre structure
};

const specs = swaggerJsdoc(options);

module.exports = { specs, swaggerUi };