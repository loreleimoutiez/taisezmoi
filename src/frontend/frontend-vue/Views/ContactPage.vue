<template>
    <LayoutComp>
        <div v-if="showModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
            id="my-modal">
            <div class="relative top-36 md:top-96 mx-auto p-5 border w-80 md:w-96 shadow-lg rounded-md bg-white">
                <div class="mt-3 text-center">
                    <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                        <svg class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h3 class="text-lg leading-6 font-medium text-gray-900 mt-4">Merci</h3>
                    <div class="mt-2 px-7 py-3">
                        <p class="text-sm text-gray-500">Votre message a bien été envoyé.</p>
                    </div>
                    <div class="items-center px-4 py-3">
                        <button @click="showModal = false"
                            class="px-4 py-2 bg-info text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-base-100 focus:outline-none focus:ring-2 focus:ring-green-300">
                            Fermer
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <section class="md:h-5/6 py-10 md:py-28">
            <div class="py-8 md:py-16 px-4 mx-auto max-w-screen-md mb-3">
                <h2 class="mb-4 text-2xl md:text-3xl tracking-tight font-extrabold text-center">Me
                    contacter</h2>
                <p class="mb-8 lg:mb-16 pt-3 font-light md:text-center md:text-lg">Vous avez des
                    suggestions, des idées à partager ? Ce formulaire est là pour ça. N'hésitez pas à m'écrire pour
                    échanger, ou simplement pour laisser un message encourageant 🙂</p>
                <form @submit.prevent="handleSubmit" class="space-y-8">
                    <div>
                        <label for="fromName" class="block mb-2 text-sm font-medium">Votre email</label>
                        <input v-model="formData.fromName" type="email" id="fromName" name="from_name"
                            class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                            placeholder="exemple@gmail.com" required>
                    </div>
                    <div>
                        <label for="subject" class="block mb-2 text-sm font-medium">Sujet</label>
                        <input v-model="formData.subject" type="text" id="subject" name="subject"
                            class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500"
                            placeholder="Sujet de votre message" required>
                    </div>
                    <div class="sm:col-span-2">
                        <label for="message" class="block mb-2 text-sm font-medium">Votre message</label>
                        <textarea v-model="formData.message" id="message" name="message" rows="6"
                            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                            placeholder="Écrivez ici votre message"></textarea>
                    </div>
                    <button type="submit"
                        class="py-3 px-5 text-sm font-medium text-center rounded-lg bg-info sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300">Envoyer</button>
                </form>
            </div>
        </section>
    </LayoutComp>
</template>

<script setup>
import LayoutComp from '@/frontend/frontend-vue/Components/LayoutComp.vue'
import { ref } from 'vue'
import emailjs from '@emailjs/browser'

const showModal = ref(false);

emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY)

const serviceId = import.meta.env.VITE_EMAILJS_ID;
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const userId = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const formData = ref({
    fromName: '',
    email: '',
    subject: '',
    message: ''
})

const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const result = await emailjs.sendForm(serviceId, templateId, e.target, userId);

        formData.value = {
            fromName: '',
            email: '',
            subject: '',
            message: ''
        };

        showModal.value = true;
        setTimeout(() => {
            showModal.value = false;
        }, 4000);

        console.log(result.text);
    } catch (error) {
        console.error('Failed to send email:', error);
    }
};
</script>