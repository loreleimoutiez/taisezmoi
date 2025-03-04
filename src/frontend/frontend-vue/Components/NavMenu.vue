<template>
  <Disclosure as="nav" class="bg-base-100" v-slot="{ open }">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button-->
          <DisclosureButton
            class="relative inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-gray-700 focus:outline-none z-20">
            <span class="absolute -inset-0.5" />
            <span class="sr-only">Ouvrir le menu principal</span>
            <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
            <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
        <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start relative">
          <div class="flex flex-shrink-0 items-center">
            <img class="h-8 w-auto" src="../../../assets/images/dino.webp" alt="logo petit dinosaure" />
          </div>
          <div class="hidden sm:ml-6 sm:block">
            <div class="flex space-x-4">
              <router-link v-for="item in navigation" :key="item.name" :to="{ name: item.name }"
                :class="[($route.name === item.name) ? 'bg-gray-900 text-white' : 'text-white hover:bg-gray-700', 'rounded-md px-3 py-2 text-sm font-medium']"
                :aria-current="item.current ? 'page' : undefined">{{ item.name }}</router-link>
              <router-link v-if="isAuthenticated" to="/write"
                class="text-white hover:bg-info hover:text-black rounded-md px-2 py-2 text-sm font-medium">
                Écrire un article
              </router-link>
              <router-link v-if="isAuthenticated" @click="logout" to="/"
                class="text-white hover:bg-gray-700 rounded-md px-2 py-2 text-sm font-medium absolute md:right-14 lg:right-3 sm:right-10">Déconnexion</router-link>
              <router-link v-else to="/login"
                class="text-white hover:bg-gray-700 rounded-md px-2 py-2 text-sm font-medium absolute md:right-14 lg:right-3 sm:right-10">Se
                connecter</router-link>
            </div>
          </div>
        </div>
        <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
        </div>
      </div>
    </div>

    <DisclosurePanel class="sm:hidden">
      <div class="space-y-1 px-2 pb-3 pt-2">
        <router-link v-for="item in navigation" :key="item.name" :to="{ name: item.name }"
          :class="[($route.name === item.name) ? 'bg-gray-900 text-white' : 'text-white hover:bg-gray-700', 'block rounded-md px-3 py-2 text-base font-medium']"
          :aria-current="item.current ? 'page' : undefined">{{ item.name }}</router-link>
        <router-link v-if="isAuthenticated" to="/write"
          class="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-gray-700">
          Écrire un article
        </router-link>
        <div class="flex flex-col">
          <span class="border-t border-green-200 mt-3 opacity-65"></span>
          <router-link v-if="isAuthenticated" @click="logout" to="/"
            class="text-green-200 font-bold hover:bg-success hover:text-white block rounded-md px-3 mt-3 py-2 text-base">Déconnexion</router-link>
          <router-link v-else to="/login"
            class="text-green-200 font-bold hover:bg-success hover:text-white block rounded-md px-3 mt-3 py-2 text-base">Se
            connecter</router-link>
        </div>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isAuthenticated = ref(false)

const checkAuthStatus = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/status`, {
    //const response = await fetch('http://localhost:3000/api/auth/status', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.ok) {
      const data = await response.json()
      isAuthenticated.value = data.isAuthenticated
    } else if (response.status === 401) {
      isAuthenticated.value = false
      //console.clear()
    } else {
      throw new Error('Erreur inattendue')
    }
  } catch (error) {
    if (error.message !== 'Erreur inattendue' && error.message !== 'Non authentifié') {
      console.error('Erreur lors de la vérification de l\'authentification :', error)
    }
    isAuthenticated.value = false
  }
}

const logout = async () => {
    try {
        await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`, {
        //await fetch('http://localhost:3000/api/auth/logout', { // Local
            method: 'POST',
            credentials: 'include',
        })
        isAuthenticated.value = false
        router.push({ name: 'Accueil' })
    } catch (error) {
        console.error("Erreur lors de la déconnexion :", error)
    }
}

onMounted(checkAuthStatus)

const navigation = [
  { name: 'Accueil' },
  { name: 'À propos' },
  { name: 'Projets' },
  { name: 'Blog' }
]
</script>
