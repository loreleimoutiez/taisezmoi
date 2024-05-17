<template>
    <NavMenu />
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

        <!-- Static sidebar for desktop -->
        <div class="hidden lg:fixed lg:z-50 lg:flex lg:w-72 lg:flex-col">
            <!-- Sidebar component, swap this element with another sidebar if you like -->
            <div class="flex grow flex-col gap-y-5 bg-base-300 px-6 h-screen rounded-tr-3xl">
                <div class="flex my-10 shrink-0 items-center pt-5 justify-center">
                    <img class="h-20 w-auto" src="../../assets/images/quack.webp" alt="Logo canard" />
                </div>
                <nav class="flex flex-1 flex-col">
                    <ul role="list" class="flex flex-1 flex-col gap-y-7">
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

        <main class="lg:pl-72 md:h-screen flex flex-col">
            <div class="flex flex-col justify-end items-center h-full">
                <div class="px-4 pt-32 md:py-10 sm:px-6 lg:px-8 lg:mb-10 lg:ml-[20%]">
                    <div class="md:w-[70%] px-5 flex flex-col justify-between">
                        <div class="flex flex-col mt-5">
                            <div class="flex justify-start mb-4">
                                <div class="flex h-18 shrink-0 items-center mr-4">
                                    <img src="../../assets/images/quack.webp" class="object-cover h-8 w-auto"
                                        alt="logo canard" />
                                </div>
                                <div
                                    class="ml-2 py-3 px-4 bg-yellow-200 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-black">
                                    Bienvenue à toi, étranger·ère ! Je suis Quack. Je vais te permettre de faire quelque chose dont je vais pas parler tout de suite.
                                </div>
                            </div>
                            <div class="flex justify-end mb-4">
                                <div>
                                    <div
                                        class="mr-2 py-3 px-4 bg-white rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-black">
                                        Salut Quack, y'a un couac ?
                                    </div>
                                </div>
                                <div class="flex h-18 shrink-0 items-center ml-4">
                                    <img src="../../assets/images/dino.webp" class="object-cover h-8 w-auto"
                                        alt="logo canard" />
                                </div>
                            </div>
                            <div class="flex justify-start mb-4">
                                <div class="flex h-18 shrink-0 items-center mr-4">
                                    <img src="../../assets/images/quack.webp" class="object-cover h-8 w-auto"
                                        alt="logo canard" />
                                </div>
                                <div
                                    class="ml-2 py-3 px-4 bg-yellow-200 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-black">
                                    Arrête de faire le clown au lieu de bosser !
                                </div>
                            </div>
                        </div>
                        <div class="py-5">
                            <input class="w-full bg-base-200 py-5 px-3 rounded-xl text-slate-200" type="text"
                                placeholder="Écris ton message ici !" />
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
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import NavMenu from '../Components/NavMenu.vue'
import {
    Bars3Icon,
    XMarkIcon,
} from '@heroicons/vue/24/outline'

const sidebar = [
    { name: 'Quack', href: '#/quack', current: true },
    { name: 'Historique', href: '#/quack', current: false },
    { name: 'Charger un document', href: '#/quack', current: false },
    { name: 'Liste des documents disponibles', href: '#/quack', current: false },
    { name: 'Comment ça marche ?', href: '#/quack', current: false },
]

const sidebarOpen = ref(false)
</script>