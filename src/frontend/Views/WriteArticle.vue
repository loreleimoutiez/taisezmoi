<template>
  <LayoutComp>
    <div class="py-10 bg-white md:h-4/5">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
          <div class="md:p-6 bg-white md:py-24">
            <h1 class="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-6 md:mb-10">Nouvel
              article
            </h1>
            <form @submit.prevent="handleSubmit" method="POST" class="pt-10">
              <div class="mb-4">
                <label class="md:text-xl text-gray-600">Titre <span class="text-red-500">*</span></label>
                <input v-model="title" id="title" name="title" autocomplete="title" required="true" type="text"
                  class="mt-5 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5">
              </div>

              <div class="mb-4">
                <label class="md:text-xl text-gray-600">Description <span class="text-red-500">*</span></label>
                <textarea v-model="description" id="description" name="description" autocomplete="description"
                  required="true" type="text"
                  class="mt-5 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full h-10 p-2.5">
                </textarea>
              </div>

              <div class="mb-8">
                <label class="md:text-xl text-gray-600">Contenu <span class="text-red-500">*</span></label>
                <div id="editor" class="mt-1 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full h-60 p-2.5"></div>
              </div>

              <div class="flex text-gray-600 mb-4">
                <button role="submit" class="md:w-32 flex w-full justify-center rounded-md bg-success px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-info focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Poster</button>
                <button type="button" @click="resetForm" class="ml-4 md:w-32 flex w-full justify-center rounded-md bg-secondary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Réinitialiser</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </LayoutComp>
</template>

<script setup>
import LayoutComp from '../Components/LayoutComp.vue'
import { ref, onMounted } from 'vue'
import { getToken } from '@/frontend/js/authentication.js'
import Quill from 'quill'

const title = ref('')
const content = ref('')
const description = ref('')
const token = getToken()

let quill
const initialData = {
  title: '',
  description: '',
  content: [
    {
      insert: '',
    },
  ],
}

const resetForm = () => {
  title.value = initialData.title
  description.value = initialData.description
  quill.setContents(initialData.content)
}

onMounted(() => {
  quill = new Quill('#editor', {
    modules: {
      toolbar: [
        [{ header: [2, 3, 4, false] }],
        ['bold', 'italic', 'underline'],
        ['link', 'blockquote', 'code-block'],
        [{ list: 'ordered' }, { list: 'bullet' }],
      ],
    },
    theme: 'snow',
  })

  quill.on('text-change', () => {
    content.value = quill.root.innerHTML
  })

  resetForm()
})

const handleSubmit = async () => {
  try {
    if (!title.value || !content.value || !description.value) {
      throw new Error('Tous les champs sont obligatoires')
    }

    //const response = await fetch('http://localhost:3000/api/articles', { // LOCAL
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/articles`, { // PROD
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        title: title.value,
        content: content.value,
        description: description.value
      }),
    })

    if (!response.ok) {
      throw new Error('Erreur de publication')
    }

    console.log('Article publié')
    resetForm()
  } catch (error) {
    console.error('Erreur lors de la publication :', error)
  }
}
</script>

<style>
  .ql-toolbar.ql-snow {
    border-radius: 5px;
    margin-top: 1rem;
  }
</style>
