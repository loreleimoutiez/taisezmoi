<template>
  <LayoutComp>
    <LatestNews />
    <div class="py-10">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto">
          <h1 class="w-full text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tight text-center mb-6">
            Projets
          </h1>
        </div>
        <div
          class="mx-auto pt-10 md:px-6 grid max-w-2xl auto-rows-fr grid-cols-1 gap-6 lg:max-w-none lg:grid-cols-3 md:mb-44 text-white">
          <article v-for="post in posts" :key="post.id"
    class="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-indigo-400 px-6 pb-3 h-auto md:h-[350px] lg:h-[400px] transition-transform duration-300 hover:scale-105 hover:shadow-lg">
            <img :src="post.imageSrc" :alt="post.title" class="absolute inset-0 -z-10 h-full w-full object-cover" />
            <div class="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/70 to-gray-900/30" />
            <div class="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
            <div class="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
              <time class="mr-8 text-white">{{ post.date }}</time>
            </div>
            <h3 class="mt-2 text-lg font-semibold leading-6 text-white">
              <template v-if="post.link.startsWith('http')">
                <a :href="post.link" target="_blank" rel="noopener noreferrer" class="absolute inset-0"></a>
              </template>
              <template v-else>
                <router-link :to="post.link">
                  <span class="absolute inset-0"></span>
                </router-link>
              </template>
              {{ post.title }}
            </h3>
            <p class="mt-2 text-sm">
              {{ post.description }}
            </p>
          </article>
        </div>
      </div>
    </div>
  </LayoutComp>
</template>

<script setup>
import LayoutComp from '@/frontend/frontend-vue/Components/LayoutComp.vue'
import LatestNews from '@/frontend/frontend-vue/Components/LatestNews.vue'
import tarotReadingImage from '@/assets/images/tarotreading.webp'
import homebirdImage from '@/assets/images/homebird.webp'
import Quack from '@/assets/images/quack.webp'
import { useHead } from '@vueuse/head'

// Configuration des métadonnées pour la page Projets
useHead({
  title: 'Projets - taisezmoi',
  meta: [
    { name: 'description', content: 'Découvrez mes projets de développement web : applications RAG, jeux Phaser.js, sites vitrine et bien plus encore.' },
    { property: 'og:title', content: 'Projets - taisezmoi' },
    { property: 'og:description', content: 'Découvrez mes projets de développement web : applications RAG, jeux Phaser.js, sites vitrine et bien plus encore.' },
    { property: 'og:image', content: 'https://www.taisezmoi.com/assets/dino-XqyuFW9r.webp' },
    { property: 'og:url', content: 'https://www.taisezmoi.com/#/projects' },
    { property: 'og:type', content: 'website' },
  ]
})

const posts = [
  {
    id: 1,
    title: 'Tarot Reading',
    link: '/tarot-reading',
    description:
      'Le tout premier site que j\'ai mis en ligne, et le tout premier site que j\'ai fait, tout court. HTML CSS JS vanilla, à l\'époque (pour ce que je voulais en faire c\'était bien suffisant).',
    imageSrc: tarotReadingImage,
    date: 'Mai 2022'
  },
  {
    id: 1,
    title: 'Homebird',
    link: 'https://www.homebird.fr/',
    description:
      'Mini jeu réalisé en 7 jours dans le but d\'en parler lors des mini conférences organisées par Lior Chamla. J\'ai pu découvrir Phaser.js de cette façon. Le jeu n\'est jouable que sur Chrome sur ordi pour le moment (je n\'ai encore pas du tout retouché le code depuis 2022, avant reconversion), en utilisant les flèches du clavier, la touche espace ainsi que la touche M.',
    imageSrc: homebirdImage,
    date: 'Août 2022'
  },
  {
    id: 2,
    title: 'Quack Vue - Plus fonctionnel (service backend résilié jusqu\'à nouvel ordre)',
    link: '/quack',
    description:
      'Création d\'une app RAG (Retrieval-Augmented Generation) : un chatbot qui permet de questionner une documentation technique préalablement chargée en BDD, pour illustrer mon talk Tech&Wine (Lyon, France) du 18 juin 2024: "TLDR".',
    imageSrc: Quack,
    date: 'Juin 2024'
  },
  {
    id: 3,
    title: 'Quack React - Refonte en cours',
    link: '/quack-react',
    description:
      'Refonte de mon projet Quack Vue.js vers un Quack en React, pour illustrer mon talk "Interopérabilité et gestion des états entre Vue.js et React" à l\'event React Montréal le 12 février 2025.',
    imageSrc: Quack,
    date: 'Janvier 2025'
  }
]
</script>