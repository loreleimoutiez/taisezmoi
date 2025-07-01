<template>
  <!-- Bannière cookies en bas de l'écran -->
  <Transition
    name="slide-up"
    enter-active-class="transition ease-out duration-300"
    enter-from-class="transform translate-y-full opacity-0"
    enter-to-class="transform translate-y-0 opacity-100"
    leave-active-class="transition ease-in duration-200"
    leave-from-class="transform translate-y-0 opacity-100"
    leave-to-class="transform translate-y-full opacity-0"
  >
    <div 
      v-if="showBanner" 
      class="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 shadow-lg z-50"
    >
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <!-- Message principal -->
        <div class="flex-1 text-sm md:text-base">
          <p>
            🍪 Ce site utilise des cookies et le stockage local pour permettre le système de likes. 
            <router-link 
              to="/privacy-policy" 
              class="text-blue-400 hover:text-blue-300 underline"
            >
              En savoir plus
            </router-link>
          </p>
        </div>
        
        <!-- Boutons d'action -->
        <div class="flex gap-3 flex-shrink-0">
          <button
            @click="rejectCookies"
            class="px-4 py-2 text-sm bg-gray-700 hover:bg-gray-600 rounded-md transition-colors duration-200"
          >
            Refuser
          </button>
          <button
            @click="acceptCookies"
            class="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-500 rounded-md transition-colors duration-200"
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const showBanner = ref(false)

// Vérifier si l'utilisateur a déjà fait un choix
const checkCookieConsent = () => {
  const consent = localStorage.getItem('cookie_consent')
  if (!consent) {
    showBanner.value = true
  }
}

// Accepter les cookies
const acceptCookies = () => {
  localStorage.setItem('cookie_consent', 'accepted')
  showBanner.value = false
}

// Refuser les cookies
const rejectCookies = () => {
  localStorage.setItem('cookie_consent', 'rejected')
  // Supprimer les données existantes si elles existent
  localStorage.removeItem('user_like_hash')
  showBanner.value = false
  
  // Optionnel : Rediriger ou afficher un message
  alert('Cookies refusés. Le système de likes ne fonctionnera pas.')
}

onMounted(() => {
  // Attendre un peu avant d'afficher la bannière pour ne pas gêner
  setTimeout(checkCookieConsent, 1000)
})

// Fonction utilitaire pour vérifier si les cookies sont acceptés
const areCookiesAccepted = () => {
  return localStorage.getItem('cookie_consent') === 'accepted'
}

// Exposer la fonction pour que d'autres composants puissent l'utiliser
defineExpose({
  areCookiesAccepted
})
</script>

<style scoped>
/* Transitions personnalisées si nécessaire */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>
