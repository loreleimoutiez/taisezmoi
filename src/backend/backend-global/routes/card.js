/* eslint-disable */
const express = require('express');
const router = express.Router();
const cardCtrl = require('../controllers/card');
const multer = require('../middlewares/multer-config');
const Card = require('../models/card');

router.get('/random', async (req, res) => {
    try {
        const count = await Card.countDocuments();
        if (count === 0) {
            return res.status(404).json({ error: 'Aucune carte trouvée' });
        }

        const randomIndex = Math.floor(Math.random() * count);
        const randomCard = await Card.findOne().skip(randomIndex);

        if (!randomCard) {
            return res.status(404).json({ error: 'Carte non trouvée' });
        }

        res.status(200).json(randomCard);
    } catch (error) {
        console.error('Erreur lors de la récupération d\'une carte aléatoire:', error);
        res.status(500).json({ error: 'Erreur serveur lors de la récupération de la carte aléatoire' });
    }
});

router.get('/', cardCtrl.getAllCards);
router.post('/import', multer, cardCtrl.importCards);
router.get('/:id', cardCtrl.getCardById);

module.exports = router;
