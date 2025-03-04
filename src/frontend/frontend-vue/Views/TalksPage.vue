<template>
    <LayoutComp>
        <LatestNews />
        <div class="py-10">
            <div class="mx-auto max-w-7xl px-6 lg:px-8">
                <div class="mx-auto">
                    <h1 class="w-full text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tight text-center mb-6">
                        Talks
                    </h1>
                </div>
                <div class="mx-auto pt-4 pb-20 md:px-6">
                    <ul date="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        <li v-for="talk in talks" :key="talk.slides"
                            class="col-span-1 lg:col-span-2 flex flex-col text-center rounded-lg">
                            <div class="flex flex-1 flex-col p-8">
                                <img class="mx-auto size-32 shrink-0 rounded-full" :src="talk.imageUrl" alt="" />
                                <h3 class="mt-6 text-xl font-medium">{{ talk.name }}</h3>
                                <dl class="mt-1 flex grow flex-col justify-between">
                                    <dt class="sr-only">Lieu</dt>
                                    <dd class="">{{ talk.location }}</dd>
                                    <dd class="flex flex-col items-center">
                                        <span class="inline-flex items-center rounded-full px-2 py-1">{{ talk.date
                                            }}</span>
                                        <span class="inline-flex items-center rounded-full px-2 py-1">{{
                                            talk.description }}</span>
                                    </dd>
                                    <dt class="sr-only">Date</dt>
                                </dl>
                            </div>
                            <div>
                                <div class="-mt-px flex">
                                    <div class="flex w-0 flex-1">
                                        <a :href="`${talk.slides}`" rel="noopener noreferrer" target="_blank"
                                            class="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg py-4 font-semibold">
                                            <i class="fa-solid fa-chalkboard-user"></i>
                                            Slides
                                        </a>
                                    </div>
                                    <div class="-ml-px flex w-0 flex-1">
                                        <a :href="talk.youtube || '#'" rel="noopener noreferrer" target="_blank"
                                            :class="{ 'opacity-50 cursor-not-allowed pointer-events-none': !talk.youtube }"
                                            class="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg py-4 font-semibold">
                                            <i class="fa-brands fa-youtube"></i>
                                            Regarder
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </LayoutComp>
</template>

<script setup>
import LayoutComp from '@/frontend/frontend-vue/Components/LayoutComp.vue'
import LatestNews from '@/frontend/frontend-vue/Components/LatestNews.vue'

const talks = [
    {
        name: 'Interopérabilité et gestion des états entre Vue.js et React',
        location: 'Montréal, CA',
        date: 'Février 2025',
        description: '',
        slides: 'https://www.canva.com/design/DAGezSTtcQc/nhQFelt1yp9LU4x1dmUS9Q/view?utm_content=DAGezSTtcQc&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h493e61fd10',
        youtube: 'https://youtu.be/QXTbUqecZlA?si=szrgxH84IkkJiAxy',
        imageUrl:
            'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNmtqOWlqOGJ0NDJ0ajB2cWcybjR0MXd5czgyZGZ0bTc1c3owZ2IzbSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/eNAsjO55tPbgaor7ma/giphy.gif',
    },
    {
        name: 'NES : d\'une architecture contrainte à la gestion moderne de la mémoire et des ressources',
        location: 'En ligne - Open Tech Con',
        date: 'Septembre 2024',
        description: '',
        slides: 'https://www.canva.com/design/DAGR8VEuNlA/pFXZsfH7FOPGRA7E4HfkmQ/view?utm_content=DAGR8VEuNlA&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=hd6dfa87518',
        youtube: 'https://www.youtube.com/watch?v=2J7KVqHGCUE',
        imageUrl:
            'https://upgifs.com//img/gifs/1PY8NUxZBnNx6.gif',
    },
    {
        name: 'Too Long Didn\'t Read - Quack',
        location: 'Lyon, FR',
        date: 'Juin 2024',
        description: '',
        slides: 'https://www.canva.com/design/DAGHW2eweWE/Td2vPiZ7yZ0ReqoTQxx9zg/view?utm_content=DAGHW2eweWE&utm_campaign=designshare&utm_medium=link&utm_source=editor',
        youtube: '',
        imageUrl:
            'https://media.tenor.com/y98Q1SkqLCAAAAAM/chat-gpt.gif',
    },
    {
        name: 'Comment raconter une histoire dans son navigateur ?',
        location: 'En ligne - WebDevMe',
        date: 'Août 2022',
        description: '',
        slides: 'https://www.canva.com/design/DAFKOrLBU_E/nmX9iMl1L88J5uKpshgwig/view?utm_content=DAFKOrLBU_E&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h13d5601e68',
        youtube: 'https://youtu.be/DI8RDEED3RA?si=CEvhw1mV4PGqaKGx',
        imageUrl:
            'https://cdn.phaser.io/devlogs/12/spacedancer4x.gif',
    },
]
</script>