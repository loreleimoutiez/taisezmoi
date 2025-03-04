/* eslint-disable */
const Article = require('../models/article');
const fs = require('fs');
const path = require('path');

exports.createArticle = async (req, res) => {
  const { title, content, alt, category } = req.body;

  if (!title || !content || !req.file || !alt) {
    return res.status(400).json({ error: 'Tous les champs sont obligatoires : title, content, image et alt.' });
  }

  try {
    const imageUrl = `https://${req.get('host')}/images/${req.file.filename}`;
    const article = new Article({
      title,
      content,
      image: imageUrl,
      alt,
      category,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    await article.save();
    res.status(201).json(article);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllArticles = (req, res, next) => {
  Article.find()
    .then((article) => {
      res.status(200).json(article);
    })
    .catch((error) => {
      res.status(404).json({ error: error });
    });
};

exports.getArticleById = (req, res) => {
  Article.findById(req.params.id)
    .then(article => {
      if (!article) {
        return res.status(404).json({ error: 'Article not found' });
      }
      res.status(200).json(article);
    })
    .catch(error => res.status(500).json({ error: 'Server error' }));
};

exports.updateArticle = async (req, res) => {
  const { title, content, alt, category } = req.body;
  const updateData = { title, content, alt, category };

  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }

    const isModified = title !== article.title || content !== article.content || alt !== article.alt || category !== article.category;

    if (isModified) {
      updateData.updatedAt = new Date();
    }

    if (req.file) {
      const oldImagePath = path.join('/var/data/images', path.basename(article.image));

      fs.unlink(oldImagePath, (err) => {
        if (err) {
          console.error('Erreur lors de la suppression de l\'ancienne image:', err);
        }
      });

      updateData.image = `https://${req.get('host')}/images/${req.file.filename}`;
    }

    if (req.body.createdAt) {
      updateData.createdAt = new Date(req.body.createdAt);
    }

    const updatedArticle = await Article.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.status(200).json(updatedArticle);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteArticle = (req, res) => {
  Article.findById(req.params.id)
    .then((article) => {
      if (!article) {
        return res.status(404).json({ error: 'Article not found' });
      }

      const imagePath = path.join('/var/data/images', path.basename(article.image));
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error('Erreur lors de la suppression du fichier image:', err);
          return res.status(500).json({ error: 'Erreur lors de la suppression du fichier image' });
        }

        Article.findByIdAndDelete(req.params.id)
          .then(() => res.status(200).json({ message: 'Article et image supprimés avec succès' }))
          .catch((error) => res.status(500).json({ error: error.message }));
      });
    })
    .catch((error) => res.status(500).json({ error: error.message }));
};
