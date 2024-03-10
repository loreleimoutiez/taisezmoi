/* eslint-disable */
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/user');
const articleRoutes = require('./routes/article');
const weatherRoutes = require('./routes/weather');

mongoose.connect(process.env.MONGODB,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();
app.use(express.json());

app.use(helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' }
}));

app.use(helmet.frameguard({ action: "SAMEORIGIN" }));

app.use(cors({
    origin: ['https://www.taisezmoi.com', 'http://localhost:5173']
}));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/api/auth', userRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/weather', weatherRoutes);

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