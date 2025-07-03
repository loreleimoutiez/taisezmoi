<template>
    <LayoutComp>
        <!--The whole page-->
        <div
            class="flex md:mx-40 bg-neutral md:rounded-lg md:shadow-2xl md:my-10 md:max-w-[80%] break-words min-h-screen">
            <!--Left column-->
            <div
                class="hidden md:flex flex-col md:w-1/3 md:border-r md:border-gray-700 text-white pl-12 overflow-hidden break-words">
                <i class="fa-solid fa-kiwi-bird text-3xl my-5"></i>
                <ol class="mb-14">
                    <li v-for="(title, index) in titles" :key="index" class="my-9 flex items-center text-xl">
                        <i :class="title.icon"></i>
                        <span class="ml-5">{{ title.name }}</span>
                    </li>
                </ol>
                <span
                    class="bg-info py-3 -mt-12 -ml-5 flex justify-center text-base font-bold rounded-3xl md:w-60">Poster</span>
            </div>

            <!--Middle column-->
            <div class="w-full md:w-1/3 flex flex-col h-full">
                <div class="ml-5 my-2 flex">
                    <i class="fa-solid fa-arrow-left my-4 mr-5"></i>
                    <span>
                        <h1 class="text-white text-lg md:text-xl">Loreleï 🦕</h1>
                        <p class="text-sm text-gray-400">177,6 k posts</p>
                    </span>
                </div>

                <div class="border-b border-gray-700 relative">
                    <img src="@/assets/images/bg-profile-pic.webp" alt="photo d'un paysage eneigé de campagne"
                        class="mb-14 md:mb-16">
                    <img src="@/assets/images/profile-pic.webp" alt="photo de profil, moi enfant"
                        class="rounded-full absolute w-20 md:w-32 top-20 left-5 border-2 md:border-4 border-neutral">
                    <span class="w-full">
                        <p class="text-white text-lg md:text-xl ml-5">Loreleï 🦕</p>
                        <p class="text-sm text-gray-400 ml-5">@taisezmoi <span
                                class="text-xs ml-1 bg-gray-700 py-0.5 px-1 rounded-md">Vous suit</span></p>

                        <div class="my-5 text-sm ml-5 text-white">
                            <p>❤️ J'aime bien apprendre des choses</p>
                            <p>💻 Développeuse web (sois plus vague encore stp)</p>
                            <p>💾 Floppy disks and NES fan account !</p>
                            <p class="mt-4">✨ Ma dernière ITW dans cette newsletter : <a
                                    href="https://happytodev.substack.com/p/quoi-de-neuf-les-devs-numero-108"
                                    target="_blank" rel="noopener noreferrer" class="text-info underline">Interview
                                    HappyToDev</a>
                            </p>
                            <p class="mt-4">🗒️ Plus d'infos ici : <a
                                    href="https://avocadogrowth.com/fr/blog/interview/interview-with-lorelei"
                                    target="_blank" rel="noopener noreferrer" class="text-info underline">Interview
                                    Avocado Growth</a>
                            </p>
                            <p>🎧 Et ici : <a
                                    href="https://podcast.ausha.co/punkindev/s03e08-parcours-de-reconversion-entre-malchance-et-perseverance-avec-lorelei"
                                    target="_blank" rel="noopener noreferrer" class="text-info underline">Podcast
                                    PunkinDev</a>
                            </p>
                            <p class="mt-4">📺 Mon compte tiktok tech : <a
                                    href="https://www.tiktok.com/@taisezmoitech"
                                    target="_blank" rel="noopener noreferrer" class="text-info underline">taisezmoiTECH</a>
                            </p>
                            <div class="mt-5 text-gray-400 flex items-center">
                                <i class="fa-solid fa-location-dot mr-2"></i>
                                <p>France</p>
                                <i class="fa-solid fa-cake-candles ml-4 mr-2"></i>
                                <p>1988</p>
                            </div>
                            <div class="text-gray-400 flex items-center">
                                <i class="fa-solid fa-calendar-days mr-2"></i>
                                <p>A créé ce site en décembre 2023</p>
                            </div>
                            <div class="text-gray-400 flex items-center mt-4">
                                <i class="fa-solid fa-person-walking mr-2"></i>
                                <div class="flex-col">
                                    <p>Quitte Twitter pour de vrai en décembre 2024</p>
                                    <p>Retrouvez-moi sur Bsky @ taisezmoi.com</p>
                                </div>
                            </div>
                            <div class="mt-8">
                                <p class="text-white font-bold text-base ml-1">Posts</p>
                                <div class="bg-info h-1 w-16 mt-3 -ml-1 rounded-xl"></div>
                            </div>
                        </div>
                        <div class="border-t border-gray-700 -mt-5">
                            <!--Insert tweet component-->
                            <TweetComp />
                        </div>
                    </span>
                </div>
            </div>

            <!--Right column-->
            <div
                class="hidden md:flex md:flex-col text-white md:w-1/3 md:border-l md:border-gray-700 pt-11 overflow-hidden">
                <span class="bg-accent mx-5 p-5 rounded-2xl">
                    <!--Recommandations ?-->
                    <p class="text-white text-lg font-bold mb-5">Vous pourriez aimer <i
                            class="fa-solid fa-link text-gray-400 animate-pulse"></i></p>
                    <ol>
                        <li v-for="(recommendation, index) in recommendations" :key="index" class="mt-5">
                            <a :href="recommendation.link" target="_blank" rel="noopener noreferrer" class="flex">
                                <img :src="recommendation.profilePic" alt="photo de profil d'un compte"
                                    class="rounded-full w-12">
                                <div class="flex flex-col ml-3 text-sm">
                                    <span class="font-bold">{{ recommendation.name }}<i
                                            class="fa-solid fa-arrow-up-right-from-square text-gray-400 ml-2 animate-pulse"></i></span>
                                    <p class="text-gray-400">{{ recommendation.username }}</p>
                                </div>
                            </a>
                        </li>
                    </ol>
                </span>
                <span class="bg-accent m-5 p-5 rounded-2xl">
                    <!--Tools and technos ?-->
                    <p class="text-white text-lg font-bold mb-5">Tendances : France</p>
                    <ol>
                        <li v-for="(trend, index) in trends" :key="index" class="mt-5">
                            <div class="flex items-center justify-between text-sm text-gray-400">
                                <span>{{ trend.index }} · {{ trend.category }}</span>
                                <i class="fa-solid fa-ellipsis"></i>
                            </div>
                            <span>#{{ trend.name }}</span>
                        </li>
                    </ol>
                </span>
            </div>
        </div>
    </LayoutComp>
</template>

<script setup>
import LayoutComp from '@/frontend/frontend-vue/Components/LayoutComp.vue'
import TweetComp from '@/frontend/frontend-vue/Components/TweetComp.vue'
import { useHead } from '@vueuse/head'

// Configuration des métadonnées pour la page À propos
useHead({
  title: 'À propos - taisezmoi',
  meta: [
    { name: 'description', content: 'Apprenez à me connaître : développeuse web reconvertie, passionnée d\'histoire de l\'informatique et de partage de connaissances.' },
    { property: 'og:title', content: 'À propos - taisezmoi' },
    { property: 'og:description', content: 'Apprenez à me connaître : développeuse web reconvertie, passionnée d\'histoire de l\'informatique et de partage de connaissances.' },
    { property: 'og:image', content: 'https://www.taisezmoi.com/assets/dino-XqyuFW9r.webp' },
    { property: 'og:url', content: 'https://www.taisezmoi.com/#/about' },
    { property: 'og:type', content: 'website' },
  ]
})

const titles = [
    {
        name: "Accueil",
        icon: "fa-solid fa-house"
    },
    {
        name: "Explorer",
        icon: "fa-solid fa-magnifying-glass"
    },
    {
        name: "Notifications",
        icon: "fa-regular fa-bell"
    },
    {
        name: "Messages",
        icon: "fa-regular fa-envelope"
    },
    {
        name: "Listes",
        icon: "fa-regular fa-rectangle-list"
    },
    {
        name: "Signets",
        icon: "fa-regular fa-bookmark"
    },
    {
        name: "Communautés",
        icon: "fa-solid fa-user-group"
    },
    {
        name: "Premium",
        icon: "fa-solid fa-kiwi-bird"
    },
    {
        name: "Profil",
        icon: "fa-solid fa-user"
    },
    {
        name: "Plus",
        icon: "fa-regular fa-circle"
    }
]

const recommendations = [
    {
        name: "Noether Tech' Blog",
        username: "@NoetherTechBlog",
        profilePic: "https://pbs.twimg.com/profile_images/1665452304122748931/Pkp9EA4R_400x400.jpg",
        link: "https://blog.noether.fr/"
    },
    {
        name: "akawaka",
        username: "@Akawakaweb",
        profilePic: "https://pbs.twimg.com/profile_images/1465716621381570571/rx1-X0Pz_400x400.png",
        link: "https://www.akawaka.fr/"
    },
    {
        name: "Cataas",
        username: "@apicataas",
        profilePic: "https://pbs.twimg.com/profile_images/799598933303586816/Lb7L0tND_400x400.jpg",
        link: "https://cataas.com/"
    }
]

const trends = [
    {
        index: 1,
        category: "Langage de programmation",
        name: "Javascript"
    },
    {
        index: 2,
        category: "Framework JS",
        name: "Vue.js"
    },
    {
        index: 3,
        category: "Framework CSS",
        name: "Tailwind"
    },
    {
        index: 4,
        category: "Outil",
        name: "Github"
    },
    {
        index: 5,
        category: "Outil",
        name: "Docker"
    },
    {
        index: 6,
        category: "Les incontournables",
        name: "HTML&CSS"
    },
    {
        index: 7,
        category: "On lâche rien",
        name: "Python"
    },
    {
        index: 8,
        category: "On lâche rien",
        name: "SQL"
    },
    {
        index: 9,
        category: "Un jour je m'y remettrai",
        name: "Phaser.js"
    },
    {
        index: 10,
        category: "Je dois m'y remettre sérieusement",
        name: "Three.js"
    },
]
</script>