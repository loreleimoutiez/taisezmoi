<template>
  <LayoutComp>
    <div class="flex justify-center px-6 bg-fuchsia py-2.5 sm:px-3.5">
      <p class="text-sm leading-7 text-white md:text-base">
        <a href="https://opentechcon.fr/" target="_blank" rel="noopener noreferrer">
          <strong class="font-semibold animate-pulse">28 SEPTEMBRE 2024</strong><svg viewBox="0 0 2 2" class="mx-2 inline h-0.5 w-0.5 fill-current" aria-hidden="true"><circle cx="1" cy="1" r="1" /></svg>OpenTechCon <i class="fa-solid fa-arrow-pointer text-white ml-2"></i>
        </a>
      </p>
    </div>
    <div class="bg-white py-14 md:py-24">
      <div class="mx-auto max-w-7xl md:max-w-full px-6 lg:px-8">
        <div class="mx-auto max-w-2xl lg:text-center">
          <h1 class="text-2xl font-semibold leading-7 text-success">Développeuse web</h1>
          <p class="mt-2 text-xl font-bold tracking-tight text-gray-900">Mais pas seulement</p>
          <p class="mt-6 text-lg leading-8 text-gray-600">Je vous propose de découvrir ce qui m'anime (mis à part le
            café) et qui me donne envie de me lever le matin (mis à part mon chat qui miaule).</p>
        </div>
        <div class="mx-auto mt-10 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-6xl">
          <dl class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-20 lg:gap-x-20">
            <div v-for="feature in features" :key="feature.name" class="relative pl-16">
              <dt class="text-base font-semibold leading-7 text-gray-900">
                <div class="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-success">
                  <component :is="feature.icon" class="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                {{ feature.name }}
              </dt>
              <dd class="mt-2 text-base leading-7 text-gray-600">{{ feature.description }}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
    <div class="overflow-hidden bg-gradient-to-b from-base-300 to-base-100 py-14 sm:py-24">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div
          class="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div class="lg:pr-8 lg:pt-4">
            <div class="lg:max-w-lg">
              <h2 class="text-base font-semibold leading-7 text-info mb-2">En parlant d'histoire de l'informatique et de
                partage</h2>
              <a href="https://smartlink.ausha.co/code-nautilus" target="_blank" rel="noopener noreferrer"
                class="mt-2 text-3xl font-bold tracking-tight sm:text-4xl text-white">Podcast<i
                  class="fa-solid fa-arrow-up-right-from-square ml-2 text-xs text-gray-400"></i></a>
              <p class="mt-6 mb-6 text-lg text-info">Oui je sais il faut que je m'y remette...</p>
              <p class="text-white"><i class="fa-solid fa-quote-left text-info mr-2"></i>Bienvenue à bord de code
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
                    <component :is="episode.icon" class="absolute left-1 top-1 h-5 w-5 text-white" aria-hidden="true" />
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
import LayoutComp from '@/frontend/Components/LayoutComp.vue'

const features = [
  {
    name: 'L\'histoire de l\'informatique',
    description:
      'Je dis informatique, pour parler globalement, mais ça m\'intéresse de voir / savoir comment les choses étaient faites avant. Comment on a pu se lever un jour et se dire "ce matériau va stocker de la mémoire" (alors oui, je sais que ça ne s\'est pas fait en un matin).',
    icon: SparklesIcon,
  },
  {
    name: 'Apprendre',
    description:
      'C\'est lié au premier point et probablement à tous les autres, mais apprendre ça a toujours été quelque chose qui me porte et fait que je m\'épanouis. Évidemment, ça ne concerne pas que le monde de l\'informatique.',
    icon: ArrowDownOnSquareIcon,
  },
  {
    name: 'Partager',
    description:
      'Mon pseudo n\'est pas taisezmoi pour rien ! Un matin j\'me suis levée et je me suis dit "tiens, à partir de maintenant je vais raconter toute ma vie sur internet". Et au fil des années, évidemment ça a évolué et aujourd\'hui je parle de disquettes 5.25" sur Twitter.',
    icon: ShareIcon,
  },
  {
    name: 'Devenir une développeuse* confirmée',
    description:
      'Mine de rien c\'est juste mon objectif principal et ce qui fera que j\'aurais tout le loisir d\'apprendre encore et encore au travail tout comme sur mon temps de repos. Et puis je vous le dis à vous, on est entre nous, mais je ne me vois plus jamais faire autre chose de ma vie maintenant (* même si je m\'intéresse aussi au data engineering).',
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