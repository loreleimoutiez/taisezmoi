/* eslint-disable */
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');

require('dotenv').config();

const userRoutes = require('./routes/user');
const articleRoutes = require('./routes/article');
const cardRoutes = require('./routes/card');

mongoose.connect(process.env.MONGODB)
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/images', express.static('/var/data/images'));
app.use(cookieParser());

app.use(helmet());

app.use(cors({
    origin: ['https://www.taisezmoi.com', 'http://localhost:5173'],
    credentials: true
}));

app.use('/api/auth', userRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/cards', cardRoutes);

app.use((err, req, res, next) => {
    console.error(err);

    if (err instanceof mongoose.Error.ValidationError) {
        const validationErrors = Object.values(err.errors).map(error => error.message);
        res.status(400).json({ error: validationErrors });
    } else {
        res.status(500).json({ error: 'Une erreur est survenue' });
    }
});

module.exports = app;
