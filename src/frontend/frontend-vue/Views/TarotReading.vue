<template>
  <NavMenu />
  <div class="bg-black py-10 min-h-screen"> 
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="flex justify-center">
        <h1 class="text-[#E1CA98] rock-salt text-2xl md:text-4xl font-bold tracking-tight sm:text-4xl my-10">
          Tarot Reading
        </h1>
      </div>

      <button 
        @click="getRandomCard" 
        class="flex m-auto text-black bg-[#E1CA98] py-3 px-6 rounded-xl hover:bg-red-900 hover:text-white transition-colors duration-300 ease-in-out mt-6"
      >
        Click here
      </button>

      <div v-if="card" class="flex flex-col items-center mt-10">
        <img 
          :src="card.image" 
          :alt="card.alt" 
          class="w-2/3 sm:w-1/2 md:w-1/3 lg:w-1/4 rounded-lg shadow-lg mb-4"
        />
        <h2 class="text-[#E1CA98] rock-salt text-xl md:text-3xl font-bold mb-4">{{ card.title }}</h2>
        <p class="text-white text-left sm:text-lg md:text-xl px-4 pt-8 md:px-6 max-w-md md:max-w-lg lg:max-w-3xl">
          {{ card.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import NavMenu from '@/frontend/frontend-vue/Components/NavMenu.vue'

const card = ref(null)

const getRandomCard = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/cards/random`)
    const data = await response.json()
    card.value = data
  } catch (error) {
    console.error('Error fetching random card:', error)
  }
}
</script>

<style>
.rock-salt {
  font-family: 'Rock Salt', cursive;
}
</style>
