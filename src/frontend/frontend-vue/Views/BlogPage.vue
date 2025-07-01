<template>
  <LayoutComp>
    <LatestNews />
    <div class="py-10">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">

        <!-- Titre principal Taiseznews -->
        <h1 class="w-full text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tight text-center mb-6">
          taiseznews
        </h1>

        <!-- Barre de catégories et de recherche -->
        <nav class="flex flex-col md:flex-row md:justify-between items-center pb-4 mb-8 pt-4 space-y-4">
          <div class="flex space-x-4 md:space-x-6 overflow-x-auto scrollbar-hide md:overflow-visible w-full 
           flex-nowrap md:flex-wrap md:justify-center gap-x-4 gap-y-2">

            <!-- Bouton "Toutes les catégories" -->
            <span @click="filterByCategory(null)" :class="{ 'text-fuchsia': selectedCategory === null }"
              class="border cursor-pointer whitespace-nowrap px-3 py-1 rounded-full hover:border-fuchsia">
              Toutes les catégories
            </span>

            <!-- Catégories disponibles (celles qui ont au moins un article) -->
            <span v-for="cat in availableCategories" :key="cat"
              @click="filterByCategory(cat)" :class="{ 'text-fuchsia': selectedCategory === cat }"
              class="border cursor-pointer whitespace-nowrap px-3 py-1 rounded-full hover:border-fuchsia">
              {{ cat }}
            </span>
          </div>
        </nav>

        <div class="mt-14 mb-4 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Dernier article en grand format carré à gauche -->
          <div v-if="filteredPosts.length" class="w-full relative">
            <router-link :to="`/article/${filteredPosts[0]._id}`" class="block group">
              <div class="relative">
                <img v-if="filteredPosts[0].image" :src="filteredPosts[0].image"
                  :alt="filteredPosts[0].alt || `Image de l'article : ${filteredPosts[0].title}`"
                  class="w-full md:h-[30rem] object-cover rounded-lg border-4 border-fuchsia" />
                <!-- Pastille de catégorie en bas à droite -->
                <span
                  class="absolute bottom-4 right-4 bg-fuchsia text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {{ filteredPosts[0].category }}
                </span>
              </div>
              <div class="text-sm mt-5">
                <p><strong>Publié le :</strong> {{ new Date(filteredPosts[0].createdAt).toLocaleDateString('fr-FR') }}
                </p>
                <p v-if="filteredPosts[0].updatedAt && filteredPosts[0].updatedAt !== filteredPosts[0].createdAt">
                  <strong>Modifié le :</strong> {{ new Date(filteredPosts[0].updatedAt).toLocaleDateString('fr-FR') }}
                </p>
              </div>
              <h3 class="mt-4 text-2xl font-semibold group-hover:text-fuchsia">
                {{ filteredPosts[0].title }}
              </h3>
            </router-link>
          </div>

          <!-- Liste des autres articles en format plus petit à droite avec deux colonnes -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <article v-for="post in filteredPosts.slice(1)" :key="post._id" class="relative isolate flex flex-col">
              <router-link :to="`/article/${post._id}`" class="block group">
                <div class="relative">
                  <img v-if="post.image" :src="post.image" :alt="post.alt || `Image de l'article : ${post.title}`"
                    class="w-full h-36 object-cover rounded-lg mb-2 border-2 border-white" />
                  <!-- Pastille de catégorie en bas à droite -->
                  <span
                    class="absolute bottom-2 right-2 bg-fuchsia text-white text-xs font-semibold px-2 py-1 rounded-full">
                    {{ post.category }}
                  </span>
                </div>
                <h3 class="text-lg font-semibold group-hover:text-fuchsia">
                  {{ post.title }}
                </h3>
              </router-link>
            </article>
          </div>
        </div>
      </div>
    </div>
  </LayoutComp>
</template>

<script setup>
import LayoutComp from '@/frontend/frontend-vue/Components/LayoutComp.vue'
import LatestNews from '@/frontend/frontend-vue/Components/LatestNews.vue'
import { ref, onMounted, computed } from 'vue'

const posts = ref([])
const selectedCategory = ref(null) // La catégorie sélectionnée

// Obtenir dynamiquement les catégories qui ont au moins un article
const availableCategories = computed(() => {
  const categories = [...new Set(posts.value.map(post => post.category))]
  return categories.sort()
})

// Fonction pour filtrer les posts en fonction de la catégorie sélectionnée
const filteredPosts = computed(() => {
  if (selectedCategory.value) {
    return posts.value.filter(post => post.category === selectedCategory.value)
  }
  return posts.value
})

// Fonction pour définir la catégorie sélectionnée
const filterByCategory = (category) => {
  selectedCategory.value = category
}

onMounted(async () => {
  await fetchPosts()
})

const fetchPosts = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/articles`)
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des articles")
    }
    let articles = await response.json()
    posts.value = articles.reverse() // Inverse l'ordre pour afficher les plus récents en premier
  } catch (error) {
    console.error("Erreur :", error)
  }
}
</script>
