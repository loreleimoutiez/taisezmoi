/* eslint-disable */
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');
const articleCtrl = require('../controllers/article');

router.get('/', articleCtrl.getAllArticles);
router.post('/', auth, multer, articleCtrl.createArticle);
router.get('/:id', articleCtrl.getArticleById);
router.get('/:id/metadata', articleCtrl.getArticleMetadata);
router.put('/:id', auth, multer, articleCtrl.updateArticle);
router.delete('/:id', auth, articleCtrl.deleteArticle);

// Routes pour les likes
router.post('/:id/like', articleCtrl.likeArticle);
router.post('/:id/unlike', articleCtrl.unlikeArticle);
router.get('/:id/like-status', articleCtrl.checkUserLike);

module.exports = router;