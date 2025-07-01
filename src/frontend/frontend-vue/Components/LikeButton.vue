<template>
  <div class="flex items-center space-x-2 text-sm text-gray-600">
    <button 
      @click="toggleLike" 
      :disabled="isLoading"
      class="flex items-center space-x-1 hover:text-red-500 transition-colors duration-200 focus:outline-none"
      :class="{ 'text-red-500': hasLiked, 'text-gray-600': !hasLiked }"
    >
      <!-- Icône cœur -->
      <svg 
        class="w-5 h-5 transition-all duration-200" 
        :class="{ 'fill-red-500': hasLiked, 'fill-none': !hasLiked }"
        viewBox="0 0 24 24" 
        stroke="currentColor" 
        stroke-width="2"
      >
        <path 
          stroke-linecap="round" 
          stroke-linejoin="round" 
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
        />
      </svg>
    </button>
    
    <!-- Compteur de likes -->
    <span class="font-medium">{{ likesCount }}</span>
    <span class="text-xs text-gray-500">{{ likesCount === 1 ? 'like' : 'likes' }}</span>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  articleId: {
    type: String,
    required: true
  }
})

const hasLiked = ref(false)
const likesCount = ref(0)
const isLoading = ref(false)

// Générer un hash unique pour l'utilisateur (version simplifiée)
const generateUserHash = () => {
  // Vérifier d'abord si les cookies sont acceptés
  const consent = localStorage.getItem('cookie_consent')
  if (consent !== 'accepted') {
    return null // Pas de hash si pas de consentement
  }

  let userHash = localStorage.getItem('user_like_hash')
  
  if (!userHash) {
    // Créer un hash simple basé sur des données disponibles
    const timestamp = Date.now()
    const random = Math.random().toString(36).substring(2)
    const userAgent = navigator.userAgent.slice(0, 50) // Limiter la taille
    const language = navigator.language
    
    // Fonction de hash simple
    const simpleHash = (str) => {
      let hash = 0
      for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i)
        hash = ((hash << 5) - hash) + char
        hash = hash & hash // Convertir en 32bits
      }
      return Math.abs(hash).toString(36)
    }
    
    userHash = simpleHash(`${timestamp}-${random}-${userAgent}-${language}`)
    localStorage.setItem('user_like_hash', userHash)
  }
  
  return userHash
}

const userHash = generateUserHash()

// Charger le statut initial des likes
const loadLikeStatus = async () => {
  try {
    if (!userHash) {
      // Si pas de consentement, on affiche juste le nombre de likes sans interactivité
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/articles/${props.articleId}`
      )
      if (response.ok) {
        const data = await response.json()
        likesCount.value = data.likes || 0
        hasLiked.value = false
      }
      return
    }

    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/articles/${props.articleId}/like-status?userHash=${userHash}`
    )
    
    if (response.ok) {
      const data = await response.json()
      hasLiked.value = data.hasLiked
      likesCount.value = data.likes
    }
  } catch (error) {
    console.error('Erreur lors du chargement du statut des likes:', error)
  }
}

// Toggle like/unlike
const toggleLike = async () => {
  if (isLoading.value) return
  
  // Vérifier le consentement avant d'autoriser l'action
  if (!userHash) {
    alert('Veuillez accepter les cookies pour utiliser le système de likes.')
    return
  }
  
  isLoading.value = true
  
  try {
    const endpoint = hasLiked.value ? 'unlike' : 'like'
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/articles/${props.articleId}/${endpoint}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userHash })
      }
    )
    
    if (response.ok) {
      const data = await response.json()
      hasLiked.value = data.hasLiked
      likesCount.value = data.likes
    } else {
      const errorData = await response.json()
      console.error('Erreur:', errorData.error)
    }
  } catch (error) {
    console.error('Erreur lors du toggle like:', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  loadLikeStatus()
})
</script>
