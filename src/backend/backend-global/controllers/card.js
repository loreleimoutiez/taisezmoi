/* eslint-disable */
const fs = require('fs');
const path = require('path');
const Card = require('../models/card');
const csv = require('csv-parser');

const importCards = async (req, res) => {
    try {
        const filePath = path.join(__dirname, '../data/tarot_cards.csv');

        const cards = [];
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', async (row) => {
                console.log('Ligne lue:', row);

                const { Name, Description, Image, Alt } = row;

                if (!Image || Image.trim() === '') {
                    console.error('Image non définie ou vide pour la carte:', Name);
                    return;
                }

                const imageUrl = `https://${req.get('host')}/images/${row.Image}.webp`;

                cards.push({
                    title: Name,
                    description: Description,
                    alt: Alt,
                    image: imageUrl,
                });
            })
            .on('end', async () => {
                try {
                    await Card.insertMany(cards);
                    res.status(200).json({ message: 'Cartes importées avec succès.' });
                } catch (error) {
                    console.error('Erreur lors de l\'insertion des cartes :', error);
                    res.status(500).json({ error: 'Erreur serveur lors de l\'importation' });
                }
            });
    } catch (error) {
        console.error('Erreur lors de l\'importation du fichier CSV :', error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
};

const getAllCards = async (req, res) => {
    try {
        const cards = await Card.find();
        res.status(200).json(cards);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getCardById = async (req, res) => {
    try {
        const card = await Card.findById(req.params.id);
        if (!card) {
            return res.status(404).json({ error: 'Carte non trouvée' });
        }
        res.status(200).json(card);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { importCards, getAllCards, getCardById };
