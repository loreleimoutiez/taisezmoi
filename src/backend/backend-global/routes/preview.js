/* eslint-disable */
const express = require('express');
const Article = require('../models/article');

const router = express.Router();

// Route pour générer un aperçu HTML d'un article (pour les crawlers sociaux)
router.get('/:id', async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        
        if (!article) {
            return res.status(404).send('Article non trouvé');
        }
        
        // Nettoyer le contenu HTML pour la description
        const plainTextContent = article.content.replace(/<[^>]*>/g, '').substring(0, 150) + '...';
        const articleUrl = `${process.env.FRONTEND_URL || 'https://www.taisezmoi.com'}/#/article/${article._id}`;
        
        const html = `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${article.title} - taisezmoi</title>
    <meta name="description" content="${plainTextContent}">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="article">
    <meta property="og:title" content="${article.title}">
    <meta property="og:description" content="${plainTextContent}">
    <meta property="og:image" content="${article.image}">
    <meta property="og:url" content="${articleUrl}">
    <meta property="og:site_name" content="taisezmoi">
    <meta property="article:published_time" content="${article.createdAt}">
    <meta property="article:modified_time" content="${article.updatedAt}">
    <meta property="article:author" content="taisezmoi">
    <meta property="article:section" content="${article.category}">
    
    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${article.title}">
    <meta name="twitter:description" content="${plainTextContent}">
    <meta name="twitter:image" content="${article.image}">
    <meta name="twitter:image:alt" content="${article.alt || `Image de l'article : ${article.title}`}">
    <meta name="twitter:creator" content="@taisezmoi">
    
    <!-- Redirection automatique vers l'article -->
    <script>
        // Rediriger vers l'article après 2 secondes si ce n'est pas un bot
        setTimeout(function() {
            if (!navigator.userAgent.match(/bot|crawler|spider/i)) {
                window.location.href = "${articleUrl}";
            }
        }, 2000);
    </script>
    
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            line-height: 1.6;
        }
        .preview-banner {
            background: #fd3f92;
            color: white;
            padding: 10px;
            text-align: center;
            border-radius: 5px;
            margin-bottom: 20px;
        }
        .article-image {
            width: 100%;
            height: 300px;
            object-fit: cover;
            border-radius: 8px;
            margin-bottom: 20px;
        }
        .article-meta {
            color: #666;
            font-size: 0.9em;
            margin-bottom: 20px;
        }
    </style>
</head>
<body>
    <div class="preview-banner">
        <p>Aperçu de l'article - Redirection en cours vers taisezmoi.com...</p>
    </div>
    
    <article>
        <h1>${article.title}</h1>
        
        <div class="article-meta">
            <p><strong>Publié le :</strong> ${new Date(article.createdAt).toLocaleDateString('fr-FR')}</p>
            <p><strong>Catégorie :</strong> ${article.category}</p>
        </div>
        
        <img src="${article.image}" alt="${article.alt}" class="article-image">
        
        <div class="article-excerpt">
            <p>${plainTextContent}</p>
            <p><a href="${articleUrl}">Lire l'article complet sur taisezmoi.com →</a></p>
        </div>
    </article>
    
    <!-- Lien vers l'article complet pour les bots -->
    <link rel="canonical" href="${articleUrl}">
</body>
</html>
        `;
        
        res.send(html);
    } catch (error) {
        console.error('Erreur lors de la génération de l\'aperçu:', error);
        res.status(500).send('Erreur serveur');
    }
});

module.exports = router;
