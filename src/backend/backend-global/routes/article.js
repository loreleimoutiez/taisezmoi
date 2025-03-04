/* eslint-disable */
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');
const articleCtrl = require('../controllers/article');

router.get('/', articleCtrl.getAllArticles);
router.post('/', auth, multer, articleCtrl.createArticle);
router.get('/:id', articleCtrl.getArticleById);
router.put('/:id', auth, multer, articleCtrl.updateArticle);
router.delete('/:id', auth, articleCtrl.deleteArticle);

module.exports = router;