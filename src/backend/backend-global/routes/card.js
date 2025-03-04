/* eslint-disable */
const express = require('express');
const router = express.Router();
const cardCtrl = require('../controllers/card');
const multer = require('../middlewares/multer-config');

router.get('/', cardCtrl.getAllCards);
router.post('/import', multer, cardCtrl.importCards);
router.get('/:id', cardCtrl.getCardById);

router.get('/random', async (req, res) => {
    try {
        const count = await Card.countDocuments();
        const randomIndex = Math.floor(Math.random() * count);
        const randomCard = await Card.findOne().skip(randomIndex);
        res.status(200).json(randomCard);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération de la carte aléatoire' });
    }
});

module.exports = router;
