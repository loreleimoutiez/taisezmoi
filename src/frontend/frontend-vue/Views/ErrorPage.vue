<script setup>
import LayoutComp from '@/frontend/frontend-vue/Components/LayoutComp.vue'
</script>

<template>
    <LayoutComp>
        <div class="flex flex-col items-center mt-10 mb-8 md:mb-72 md:mt-48">
            <h1 class="text-8xl text-warning">404</h1>
            <p class="mt-5 mx-3">Page introuvable, la page n'existe pas ou n'existe plus.</p>
            <router-link :to="'/'" class="text-lg text-white font-bold underline mt-5">Retourner à la page
                d'accueil</router-link>
            <img src="@/assets/images/dino.webp" class="h-20 md:mb-8 md:h-48 mt-14 md:mt-28 animate-bounce">
        </div>
    </LayoutComp>
</template>