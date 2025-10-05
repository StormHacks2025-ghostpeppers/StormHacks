const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors'); // Add this import
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const inventoryRoutes = require('./routes/inventory');
const aiRecipeRoutes = require('./routes/airecipe');
const { PrismaClient } = require('@prisma/client');

dotenv.config();

const app = express();
const prisma = new PrismaClient();

// Temporary simple CORS for debugging
app.use(cors({
    origin: true, // Allow all origins temporarily
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/inventory', inventoryRoutes);
app.use('/airecipe', aiRecipeRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = { app, prisma };