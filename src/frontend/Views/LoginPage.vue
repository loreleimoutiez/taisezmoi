<template>
    <LayoutComp>
      <div class="bg-white h-5/6 py-10 md:py-28">
        <div class="py-4 md:py-16 px-4 mx-auto max-w-screen-md mb-3">
          <h2 class="mb-4 text-2xl md:text-3xl tracking-tight font-extrabold text-center text-gray-900">Connexion</h2>
        </div>

        <div class="mx-auto w-full max-w-[480px] md:mb-28">
            <div class="bg-white py-10 md:shadow sm:rounded-lg px-6 md:px-12">
            <form class="space-y-6" @submit.prevent="handleSubmit" method="POST">
                <div>
                <p v-if="errorMessage" class="text-red-500 text-sm mb-4">{{ errorMessage }}</p>
                <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email</label>
                <div class="mt-2">
                    <input v-model="email" id="email" name="email" type="email" autocomplete="email" required="true" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5" />
                </div>
                </div>
    
                <div>
                <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Mot de passe</label>
                <div class="mt-2">
                    <input v-model="password" id="password" name="password" type="password" autocomplete="current-password" required="true" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5" />
                </div>
                </div>
    
                <div class="flex items-center justify-between text-gray-400">
                <div class="flex items-center">
                    <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 rounded border-gray-100" />
                    <label for="remember-me" class="ml-3 block text-sm leading-6">Se souvenir de moi</label>
                </div>
    
                <div class="text-sm leading-6 text-gray-400">
                    <a href="#/login" class="">Mot de passe oublié ?</a>
                </div>
                </div>
    
                <div>
                <button type="submit" class="flex w-full justify-center rounded-md bg-success px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-info focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Se connecter</button>
                </div>
            </form>
    
            <div>
                <div class="relative mt-10">
                <div class="absolute inset-0 flex items-center" aria-hidden="true">
                    <div class="w-full border-t border-gray-200" />
                </div>
                <div class="relative flex justify-center text-sm font-medium leading-6">
                    <span class="bg-white px-6 text-gray-300">Ou continuer avec</span>
                </div>
                </div>
    
                <div class="mt-6 grid grid-cols-2 gap-4">
                <a href="#/login" class="flex w-full items-center justify-center gap-3 rounded-md bg-gray-300 px-3 py-1.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D9BF0]"><!--bg-[#1D9BF0]-->
                    <svg class="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                    <span class="text-sm font-semibold leading-6">Twitter</span>
                </a>
    
                <a href="#/login" class="flex w-full items-center justify-center gap-3 rounded-md bg-gray-300 px-3 py-1.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#24292F]"><!--bg-[#24292F]-->
                    <svg class="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clip-rule="evenodd" />
                    </svg>
                    <span class="text-sm font-semibold leading-6">GitHub</span>
                </a>
                </div>
            </div>
            </div>
        </div>
        </div>
    </LayoutComp>
</template>

<script setup>
  import LayoutComp from '@/frontend/Components/LayoutComp.vue'
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { setToken } from '@/frontend/js/authentication.js'

  const router = useRouter()
  const email = ref('')
  const password = ref('')
  const errorMessage = ref('')

  const handleSubmit = async () => {
  try {
    //const response = await fetch('http://localhost:3000/api/auth/login', { // LOCAL
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, { // PROD
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    });

    if (!response.ok) {
      throw new Error('Erreur de connexion')
    }
    const data = await response.json();
    setToken(data.token);

    router.push({ name: 'Tableau de bord' })
  } catch (error) {
    console.error('Erreur de connexion', error)
    errorMessage.value = 'Informations de connexion incorrectes, veuillez réessayer.'
  }
};

</script>