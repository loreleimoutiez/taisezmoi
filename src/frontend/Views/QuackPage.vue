<template>
    <div class="md:h-4/5">
        <TransitionRoot as="template" :show="sidebarOpen">
            <Dialog class="relative z-50 lg:hidden" @close="sidebarOpen = false">
                <TransitionChild as="template" enter="transition-opacity ease-linear duration-300"
                    enter-from="opacity-0" enter-to="opacity-100" leave="transition-opacity ease-linear duration-300"
                    leave-from="opacity-100" leave-to="opacity-0">
                    <div class="fixed inset-0 bg-gray-900/80" />
                </TransitionChild>

                <div class="fixed inset-0 flex">
                    <TransitionChild as="template" enter="transition ease-in-out duration-300 transform"
                        enter-from="-translate-x-full" enter-to="translate-x-0"
                        leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0"
                        leave-to="-translate-x-full">
                        <DialogPanel class="relative mr-16 flex w-full max-w-xs flex-1">
                            <TransitionChild as="template" enter="ease-in-out duration-300" enter-from="opacity-0"
                                enter-to="opacity-100" leave="ease-in-out duration-300" leave-from="opacity-100"
                                leave-to="opacity-0">
                                <div class="absolute left-full top-0 flex w-16 justify-center pt-5">
                                    <button type="button" class="-m-2.5 p-2.5" @click="sidebarOpen = false">
                                        <span class="sr-only">Close sidebar</span>
                                        <XMarkIcon class="h-6 w-6 text-white" aria-hidden="true" />
                                    </button>
                                </div>
                            </TransitionChild>
                            <!-- Sidebar component, swap this element with another sidebar if you like -->
                            <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-base-300 px-6 pb-2">
                                <div class="flex h-16 shrink-0 items-center pt-5">
                                    <img class="h-8 w-auto" src="../../assets/images/quack.webp" alt="Logo canard" />
                                </div>
                                <nav class="flex flex-1 flex-col">
                                    <div class="py-5 flex flex-col gap-4">
                                        <input class="w-full bg-base-200 py-3 px-4 rounded-xl text-white focus:outline-none focus:ring focus:ring-yellow-200" v-model="urlInput" type="url"
                                            placeholder="Paste the URL here" />
                                        <button class="bg-yellow-200 text-black rounded-xl py-3 px-4"
                                                @click="submitUrlAndPlaySound">
                                            Load document
                                        </button>
                                    </div>
                                    <ul role="list" class="flex flex-1 flex-col gap-y-7">
                                        <li>
                                            <ul role="list" class="-mx-2 space-y-1">
                                                <li v-for="item in sidebar" :key="item.name">
                                                    <a :href="item.href"
                                                        :class="[item.current ? 'bg-base-100 text-white' : 'text-gray-400 hover:text-white hover:bg-base-100', 'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold']">
                                                        <component :is="item.icon"
                                                            :class="[item.current ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600', 'h-6 w-6 shrink-0']"
                                                            aria-hidden="true" />
                                                        {{ item.name }}
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </Dialog>
        </TransitionRoot>

        <!-- <TransitionRoot as="template" :show="modalOpen">
            <Dialog as="div" class="fixed inset-0 z-10 overflow-y-auto" @close="modalOpen = false">
            <div class="min-h-screen px-4 text-center flex items-center justify-center">
                <TransitionChild as="template" enter="ease-out duration-300" enter-start="opacity-0" enter-end="opacity-100" leave="ease-in duration-200" leave-start="opacity-100" leave-end="opacity-0">
                <div class="fixed inset-0 bg-base-200 bg-opacity-75 transition-opacity"></div>
                </TransitionChild>
                <TransitionChild as="template" enter="ease-out duration-300" enter-start="opacity-0 scale-95" enter-end="opacity-100 scale-100" leave="ease-in duration-200" leave-start="opacity-100 scale-100" leave-end="opacity-0 scale-95">
                <DialogPanel class="inline-block w-full max-w-2xl p-6 my-8 lg:ml-60 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                    <Dialog.Title as="h3" class="text-lg font-medium leading-6 text-gray-900">
                    Source Details
                    </Dialog.Title>
                    <div class="mt-2">
                    <p class="text-sm text-gray-500" v-html="modalContent"></p>
                    </div>
                    <div class="mt-4">
                    <button type="button" class="inline-flex justify-center px-4 py-2 text-sm font-medium text-black bg-orange-400 border border-transparent rounded-md hover:bg-yellow-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500" @click="modalOpen = false">
                        Close
                    </button>
                    </div>
                </DialogPanel>
                </TransitionChild>
            </div>
            </Dialog>
        </TransitionRoot> -->

        <!-- Static sidebar for desktop -->
        <div class="hidden lg:fixed lg:z-50 lg:flex lg:w-72 lg:flex-col">
            <div class="flex grow flex-col gap-y-5 bg-base-300 px-6 h-screen rounded-tr-3xl">
                <div class="flex my-10 shrink-0 items-center pt-5 justify-center">
                    <img class="h-20 w-auto" src="../../assets/images/quack.webp" alt="Logo canard" />
                </div>
                <nav class="flex flex-1 flex-col">
                    <ul role="list" class="flex flex-1 flex-col gap-y-7">
                        <div class="py-5 flex flex-col gap-4">
                            <input class="w-full bg-base-200 py-3 px-4 rounded-xl text-white focus:outline-none focus:ring focus:ring-yellow-200" v-model="urlInput" type="url"
                                placeholder="Paste the URL here" />
                            <button class="bg-yellow-200 text-black rounded-xl py-3 px-4"
                                    @click="submitUrlAndPlaySound">
                                Load document
                            </button>
                        </div>
                        <li>
                            <ul role="list" class="-mx-2 space-y-1">
                                <li v-for="item in sidebar" :key="item.name">
                                    <a :href="item.href"
                                        :class="[item.current ? 'bg-base-100 text-white' : 'text-gray-400 hover:text-white hover:bg-base-100', 'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold']">
                                        <component :is="item.icon"
                                            :class="[item.current ? 'text-base-300' : 'text-gray-400 group-hover:text-white', 'h-6 w-6 shrink-0']"
                                            aria-hidden="true" />
                                        {{ item.name }}
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>

        <div class="sticky top-0 z-40 flex items-center gap-x-6 bg-base-300 px-4 py-4 shadow-sm sm:px-6 lg:hidden">
            <button type="button" class="-m-2.5 p-2.5 text-gray-700 lg:hidden" @click="sidebarOpen = true">
                <span class="sr-only">Open sidebar</span>
                <Bars3Icon class="h-6 w-6 text-gray-400" aria-hidden="true" />
            </button>
            <div class="flex-1 text-base font-semibold leading-6 text-yellow-200">Quack</div>
        </div>

        <main class="lg:pl-72 h-screen flex flex-col relative">
            <div class="flex flex-col justify-end items-center flex-grow">
                <div class="px-4 sm:px-6 lg:px-8 md:ml-[10%] absolute bottom-1 mb-14 md:mb-12">
                    <div class="md:w-[80%] px-5 flex flex-col justify-between">
                        <div class="flex flex-col mt-5">
                            <!-- Messages fixes -->
                            <div class="flex justify-start mb-4">
                                <div class="flex h-18 shrink-0 items-center mr-4">
                                    <img src="../../assets/images/quack.webp" class="object-cover h-8 w-auto scale-x-[-1]" alt="logo canard" />
                                </div>
                                <div class="ml-2 py-3 px-4 bg-yellow-200 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-black">
                                    Welcome, stranger! I'm Quack.<br>I'm going to let you ask questions about a technical documentation you downloaded beforehand. Not bad, eh?
                                </div>
                            </div>
                            <div class="flex justify-end mb-4">
                                <div>
                                    <div class="mr-2 py-3 px-4 bg-white rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-black">
                                        Ok my turn!
                                    </div>
                                </div>
                                <div class="flex h-18 shrink-0 items-center ml-4">
                                    <img src="../../assets/images/dino.webp" class="object-cover h-8 w-auto" alt="logo canard" />
                                </div>
                            </div>
                            <!-- Messages dynamiques -->
                            <div v-for="(message, index) in messages" :key="index" class="mb-4 flex" :class="message.sender === 'user' ? 'justify-end' : 'justify-start'">
                                <div :class="message.sender === 'user' ? 'flex justify-end' : 'flex justify-start'">
                                    <!-- Conditionally render image if sender is not 'user' -->
                                    <div v-if="message.sender !== 'user'" class="flex h-18 shrink-0 items-center mr-4">
                                        <img src="../../assets/images/quack.webp" class="object-cover h-8 w-auto scale-x-[-1]" alt="logo" />
                                    </div>
                                    <div>
                                        <div :class="message.sender === 'user' ? 'mr-2 py-3 px-4 bg-white text-black rounded-bl-3xl rounded-tl-3xl rounded-tr-xl' : 'ml-2 py-3 px-4 bg-yellow-200 text-black rounded-br-3xl rounded-tr-3xl rounded-tl-xl'">
                                            {{ message.text }}
                                        </div>
                                        <!-- <button v-if="message.sender === 'bot' && message.chunkId" @click="loadContext(message.chunkId)" class="mt-4 ml-2 py-3 px-4 bg-orange-400 text-black rounded-br-3xl rounded-tr-3xl rounded-bl-xl">
                                            Source
                                        </button> -->
                                    </div>
                                    <!-- Conditionally render image if sender is 'user' -->
                                    <div v-if="message.sender === 'user'" class="flex h-18 shrink-0 items-center ml-4">
                                        <img src="../../assets/images/dino.webp" class="object-cover h-8 w-auto" alt="logo" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="py-5 flex flex-col">
                            <div class="flex">
                                <input v-model="userQuestion" class="w-full bg-base-200 py-5 px-3 rounded-l-xl text-slate-200 focus:outline-none focus:ring focus:ring-yellow-200" type="text" placeholder="Message Quack" @keyup.enter="askQuestion" />
                                <button class="text-slate-200 bg-base-200 rounded-r-xl px-4 justify-center flex items-center" @click="askQuestion">
                                    <i class="fas fa-paper-plane"></i>
                                </button>
                            </div>
                            <p class="text-xs md:text-sm mt-4 mx-auto">For now, Quack is more of an entertainment app than anything else.</p>
                        </div>
                    </div>
                    <!-- end message -->
                </div>
            </div>
        </main>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useSound } from '@vueuse/sound'
import buttonSfx from '../../assets/sounds/quack.wav'
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'

const urlInput = ref('')
const sidebarOpen = ref(false)
const userQuestion = ref('')
const messages = ref([])
// const modalOpen = ref(false)
// const modalContent = ref('')

const { play } = useSound(buttonSfx)

const sidebar = [
    { name: 'List of available documents', href: '#/quack', current: false },
    { name: 'How does it work ?', href: '#/quack', current: false },
]

const submitUrlAndPlaySound = async () => {
    play()
    if (urlInput.value) {
        try {
            const response = await fetch('http://localhost:5001/api/load-url', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ url: urlInput.value })
            })
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            urlInput.value = ''
        } catch (error) {
            console.error('Erreur lors du chargement du document:', error)
        }
    }
}

const askQuestion = async () => {
    if (userQuestion.value) {
        messages.value.push({
            text: userQuestion.value,
            sender: 'user'
        })

        try {
            const res = await fetch('http://localhost:5001/api/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ question: userQuestion.value })
            })
            if (!res.ok) {
                throw new Error('Network response was not ok')
            }
            const data = await res.json();
            messages.value.push({
                text: data.answer || 'No response found',
                sender: 'bot',
                chunkId: data.chunkId
            })
            userQuestion.value = ''
        } catch (error) {
            console.error('Erreur lors de la recherche:', error)
        }
    }
}

// const loadContext = async (chunkId) => {
//     try {
//         const response = await fetch('http://localhost:5001/api/get-window', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ chunkId })
//         })
//         if (!response.ok) {
//             throw new Error('Network response was not ok')
//         }
//         const data = await response.json();
//         modalContent.value = `Context before: ${data.chunk1}\n\n\nContext after: ${data.chunk3}`;
//         modalOpen.value = true;
//     } catch (error) {
//         console.error('Erreur lors du chargement du contexte:', error)
//     }
// }

</script>
