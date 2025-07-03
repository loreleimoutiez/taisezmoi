<template>
  <LayoutComp>
    <LatestNews />
    <div class="py-14 md:py-24">
      <div class="mx-auto max-w-7xl md:max-w-full px-6 lg:px-8">
        <div class="mx-auto max-w-2xl lg:text-center">
          <h1 class="text-2xl font-semibold leading-7 text-success">Développeuse</h1>
          <p class="mt-6 text-xl tracking-tight"><span class="font-bold">Technos</span> : Vue.js • React • TailwindCSS •
            Node.js (Express) • Python
            (Flask)</p>
          <p class="mt-6 text-xl font-bold tracking-tight">Je me lance aussi dans l’exploration de Rust 🦀 et d’autres
            technologies pour sortir de ma zone de confort, évoluer
          </p>
          <p class="text-xl font-bold tracking-tight">et m’ouvrir à de nouveaux horizons.
          </p>
          <p class="mt-6 text-lg leading-8">Je vous invite à découvrir ce qui m’anime (au-delà du café) et ce qui me
            motive
            à me lever chaque matin (hormis mon chat qui miaule).</p>
        </div>
        <div class="mx-auto mt-10 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-6xl">
          <dl class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-20 lg:gap-x-20">
            <div v-for="feature in features" :key="feature.name" class="relative pl-16">
              <dt class="text-base font-semibold leading-7">
                <div class="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-success">
                  <component :is="feature.icon" class="h-6 w-6" aria-hidden="true" />
                </div>
                {{ feature.name }}
              </dt>
              <dd class="mt-2 text-base leading-7">{{ feature.description }}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
    <div class="overflow-hidden py-14 sm:py-24">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div
          class="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div class="lg:pr-8 lg:pt-4">
            <div class="lg:max-w-lg">
              <h2 class="text-base font-semibold leading-7 text-info mb-2">En parlant d'histoire de l'informatique et de
                partage</h2>
              <a href="https://smartlink.ausha.co/code-nautilus" target="_blank" rel="noopener noreferrer"
                class="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Podcast<i
                  class="fa-solid fa-arrow-up-right-from-square ml-2 text-xs"></i></a>
              <p class="mt-6 mb-6 text-lg text-info">Oui je sais il faut que je m'y remette...</p>
              <p><i class="fa-solid fa-quote-left text-info mr-2"></i>Bienvenue à bord de code
                Nautilus, le podcast qui vous emmène dans un voyage au cœur des profondeurs du développement
                web.<br><br>À bord de ce sous-marin, nous allons explorer les fonds océaniques de l'Histoire de la
                technologie, pour y découvrir des anecdotes et des faits passionnants sur l'évolution du web. Je vous
                guiderai à travers les différentes époques du développement web, les différentes thématiques de
                l'univers de la programmation et vous ferais découvrir des personnages qui ont changé à tout jamais ces
                domaines là.<br><br>Embarquez avec moi pour un voyage sous-marin passionnant à la découverte de
                l'Histoire et des histoires du développement web.<i class="fa-solid fa-quote-right ml-2 text-info"></i>
              </p>
              <dl class="mt-10 max-w-xl space-y-8 text-base leading-7 lg:max-w-none">
                <div v-for="episode in episodes" :key="episode.name" class="relative pl-9">
                  <dt class="inline font-semibold text-info">
                    <component :is="episode.icon" class="absolute left-1 top-1 h-5 w-5" aria-hidden="true" />
                    {{ episode.name }}
                  </dt>
                  {{ ' ' }}
                  <dd class="inline">{{ episode.description }}</dd>
                </div>
              </dl>
            </div>
          </div>
          <img src="@/assets/images/codenautilus.webp" alt="Podcast screenshot"
            class="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
            width="2432" height="1442" />
        </div>
      </div>
    </div>
  </LayoutComp>
</template>

<script setup>
import { ShareIcon, CommandLineIcon, ArrowDownOnSquareIcon, SparklesIcon, ChevronDoubleRightIcon } from '@heroicons/vue/24/outline'
import LayoutComp from '@/frontend/frontend-vue/Components/LayoutComp.vue'
import LatestNews from '@/frontend/frontend-vue/Components/LatestNews.vue'
import { useHead } from '@vueuse/head'

// Configuration des métadonnées pour la page d'accueil
useHead({
  title: 'taisezmoi - Développeuse web',
  meta: [
    { name: 'description', content: 'Développeuse web reconvertie, ce site a pour vocation de documenter mon exploration du métier. Apprenez à me connaître à travers mon portfolio et en parcourant mon blog.' },
    { property: 'og:title', content: 'taisezmoi - Développeuse web' },
    { property: 'og:description', content: 'Développeuse web reconvertie, ce site a pour vocation de documenter mon exploration du métier. Apprenez à me connaître à travers mon portfolio et en parcourant mon blog.' },
    { property: 'og:image', content: 'https://www.taisezmoi.com/assets/dino-XqyuFW9r.webp' },
    { property: 'og:url', content: 'https://www.taisezmoi.com/' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'taisezmoi - Développeuse web' },
    { name: 'twitter:description', content: 'Développeuse web reconvertie, ce site a pour vocation de documenter mon exploration du métier.' },
    { name: 'twitter:image', content: 'https://www.taisezmoi.com/assets/dino-XqyuFW9r.webp' },
  ]
})

const features = [
  {
    name: 'L\'histoire de l\'informatique',
    description:
      'Je m’intéresse à l’histoire de l’informatique, notamment aux choix et aux innovations qui ont marqué le développement des technologies actuelles. Pour moi, comprendre le passé aide à mieux envisager l’avenir, que ce soit dans le code, dans l’architecture logicielle ou dans la vie.',
    icon: SparklesIcon,
  },
  {
    name: 'Apprendre',
    description:
      'L’apprentissage continu est une de mes priorités : j’aime approfondir mes compétences techniques, explorer de nouvelles technologies, et comprendre des concepts complexes pour les appliquer efficacement dans mes projets.',
    icon: ArrowDownOnSquareIcon,
  },
  {
    name: 'Partager',
    description:
      'Partager mes connaissances (à mon humble niveau) et mes expériences fait partie intégrante de ma démarche. Que ce soit à travers des talks, des projets ou des discussions avec d’autres devs, je crois en l’importance de la collaboration et de la communication pour progresser.',
    icon: ShareIcon,
  },
  {
    name: 'Devenir une développeuse confirmée',
    description:
      'Mon objectif est de renforcer mes compétences pour m’épanouir pleinement en tant que développeuse web. Je privilégie les projets qui suscitent ma curiosité ou ma créativité, tout en misant sur le travail en équipe et une progression constante, aussi bien technique que personnelle.',
    icon: CommandLineIcon,
  },
]

const episodes = [
  {
    name: 'Spacewar!',
    description:
      'Dans cet épisode de Code Nautilus, nous plongeons dans l\'histoire de Spacewar!, un des premiers jeux vidéo de l\'histoire, développé par Steve Russell (dit le "Slug"), en collaboration avec Martin Graetz et Wayne Wiitanen en 1961. Nous explorons les caractéristiques du jeu, un shoot \'em up multidirectionnel en deux dimensions qui met en scène deux vaisseaux dans un combat spatial où il ne peut en rester qu\'un.',
    icon: ChevronDoubleRightIcon,
  },
  {
    name: 'Épisode 0 - Le Prélude',
    description: 'Bonjour à toutes et à tous. Voici le prélude d\'un podcast dédié au développement et à la programmation. Il est un peu particulier, mais j\'espère qu\'il vous plaira d\'explorer avec moi les profondeurs du développement web. C\'est parti.',
    icon: ChevronDoubleRightIcon,
  }
]
</script>