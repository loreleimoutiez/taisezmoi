<template>
  <LayoutComp>
    <LatestNews />
    <div class="py-10">
      <div v-if="post" class="mx-auto max-w-5xl px-6 lg:px-8">
        <!-- Options de modification et suppression visibles uniquement si l'utilisateur est connecté -->
        <div v-if="isAuthenticated" class="flex gap-2 mb-4">
          <button
            @click="editPost"
            class="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
          >
            Modifier
          </button>
          <button
            @click="deletePost"
            class="bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-red-600 transition duration-200"
          >
            Supprimer
          </button>
        </div>

        <Breadcrumb />

        <!-- Titre principal de l'article avec bordure similaire à la page blog -->
        <h1 class="w-full text-3xl md:text-4xl font-extrabold tracking-tight text-left mb-6">
          {{ post.title }}
        </h1>

        <div class="mb-2 pt-4"></div>

        <div class="text-sm mb-6">
          <p><strong>Publié le :</strong> {{ new Date(post.createdAt).toLocaleDateString('fr-FR') }}</p>
          <p v-if="post.updatedAt && post.updatedAt !== post.createdAt">
            <strong>Modifié le :</strong> {{ new Date(post.updatedAt).toLocaleDateString('fr-FR') }}
          </p>
          
          <!-- Composant de likes -->
          <div class="mt-4">
            <LikeButton :articleId="post._id" />
          </div>
        </div>

        <!-- Image de l'article -->
        <img
          v-if="post.image"
          :src="post.image"
          :alt="post.alt || `Image de l'article : ${post.title}`"
          class="w-full h-60 md:h-[30rem] object-cover rounded-lg mb-6 border-4 border-white"
        />

        <!-- Section pour le contenu de l'article -->
        <div class="mx-auto article-content ql-editor">
          <div v-if="post.content" v-html="post.content" class="formatted-content text-base leading-relaxed"></div>
        </div>
      </div>
      <div v-else>
        <div class="mx-auto max-w-7xl px-6 lg:px-8 h-screen">
          <div class="mx-auto md:py-24">
            <p class="text-lg font-bold">Chargement de l'article...</p>
          </div>
        </div>
      </div>
    </div>
  </LayoutComp>
</template>

<script setup>
import LayoutComp from '../Components/LayoutComp.vue'
import LatestNews from '@/frontend/frontend-vue/Components/LatestNews.vue'
import Breadcrumb from '../Components/BreadCrumb.vue'
import LikeButton from '../Components/LikeButton.vue'
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { checkAuthStatus } from '@/frontend/frontend-vue/js/authentication.js'
import { useSEO } from '@/frontend/frontend-vue/composables/useSEO.js'

const route = useRoute()
const router = useRouter()
const post = ref(null)
const isAuthenticated = ref(false)

onMounted(async () => {
  isAuthenticated.value = await checkAuthStatus();
  await fetchPost()
})

const fetchPost = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/articles/${route.params.id}`);
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération de l'article");
    }
    const data = await response.json()
    post.value = data

    // Nettoyer le contenu HTML pour la description
    const plainTextContent = data.content.replace(/<[^>]*>/g, '').substring(0, 150) + '...';
    const articleUrl = `${import.meta.env.VITE_FRONTEND_URL || 'https://www.taisezmoi.com'}/#/article/${data._id}`;

    // Utiliser le composable SEO pour gérer les métadonnées
    useSEO({
      title: `${data.title} - taisezmoi`,
      description: plainTextContent,
      image: data.image || 'https://www.taisezmoi.com/assets/dino-XqyuFW9r.webp',
      url: articleUrl,
      type: 'article',
      publishedTime: data.createdAt,
      modifiedTime: data.updatedAt,
      author: 'taisezmoi',
      section: data.category,
      imageAlt: data.alt || `Image de l'article : ${data.title}`
    })
  } catch (error) {
    console.error('Erreur :', error)
  }
}

const editPost = () => {
  router.push({ name: 'Modifier un article', params: { id: post.value._id } });
}

const deletePost = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/articles/${route.params.id}`, {
      method: 'DELETE',
      credentials: 'include',
    });

    if (!response.ok) throw new Error('Erreur lors de la suppression');
    
    const result = await response.json();
    console.log(result);

    router.push({ name: 'Blog' });
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'article:', error);
  }
}

onMounted(fetchPost)
</script>

<style>
  /* Styles pour les citations */
  .article-content blockquote {
    display: flex;
    align-items: center;
    color: #4b5563;
    margin-bottom: 1rem;
    background-color: transparent;
    border-radius: 0;
  }

  .article-content blockquote::before {
    content: "";
    flex-shrink: 0;
    width: 7px;
    height: 1.5em;
    background-color: #d1d5db;
    margin-right: 1rem;
  }

  .article-content blockquote > p {
    margin: 0;
  }

  /* Style pour le conteneur de bloc de code */
  .article-content .ql-code-block-container,
  .article-content .ql-code-block-container .ql-code-block {
      background-color: #1f2937;
      color: #ffffff;
      padding: 0.5rem;
      border-radius: 0.375rem;
      overflow-x: auto;
      margin-bottom: 1rem;
      font-family: 'Courier New', Courier, monospace;
      white-space: pre-wrap;
  }

  /* Pour les listes */
  .article-content ol,
  .article-content ul {
      padding-left: 1.5rem;
      margin-bottom: 1rem;
  }

  .article-content li {
      margin-bottom: 0.5rem;
  }
</style>
