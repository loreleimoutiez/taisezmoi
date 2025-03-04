<template>
  <LayoutComp>
    <div class="py-10 bg-white md:h-4/5">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
          <div class="md:p-6 bg-white md:py-24">
            <h1 class="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8 md:mb-12">Nouvel
              article
            </h1>
            <form @submit.prevent="handleSubmit" method="POST" class="pt-10">
              <div class="mb-6">
                <label class="md:text-xl text-gray-600">Titre <span class="text-red-500">*</span></label>
                <input v-model="title" id="title" name="title" required type="text"
                  class="mt-5 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5">
              </div>

              <div class="mb-6">
                <label class="md:text-xl text-gray-600">Catégorie <span class="text-red-500">*</span></label>
                <select v-model="category" required
                  class="mt-5 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5">
                  <option disabled value="">Sélectionnez une catégorie</option>
                  <option v-for="cat in defaultCategories" :key="cat" :value="cat">{{ cat }}</option>
                </select>
              </div>

              <div class="mb-6">
                <label class="md:text-xl text-gray-600">Image de l'article <span class="text-red-500">*</span></label>
                <input @change="handleImageUpload" type="file" accept="image/*" required
                  class="mt-5 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
              </div>

              <div class="mb-6">
                <label class="md:text-xl text-gray-600">Description de l'image (alt) <span
                    class="text-red-500">*</span></label>
                <input v-model="imageAlt" type="text" placeholder="Description de l'image pour l'accessibilité" required
                  class="mt-5 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5">
              </div>

              <div class="mb-10">
                <label class="md:text-xl text-gray-600">Contenu <span class="text-red-500">*</span></label>
                <div id="editor"
                  class="mt-2 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full h-60 p-2.5">
                </div>
              </div>

              <div class="flex text-gray-600 mb-6">
                <button role="submit"
                  class="md:w-32 flex w-full justify-center rounded-md bg-success px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-info">Poster</button>
                <button type="button" @click="resetForm"
                  class="ml-4 md:w-32 flex w-full justify-center rounded-md bg-secondary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500">Réinitialiser</button>
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
import { ref, nextTick, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Quill from 'quill'

const title = ref('')
const content = ref('')
const imageUrl = ref(null)
const imageAlt = ref('')
const category = ref('')
const isEditing = ref(false)
const route = useRoute()

// Charger l'article existant pour édition
const loadArticle = async (id) => {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/articles/${id}`, {
    credentials: 'include'
  });
  const data = await response.json()
  title.value = data.title
  content.value = data.content
  imageAlt.value = data.alt
  category.value = data.category
  imageUrl.value = data.image
}

onMounted(async () => {
  if (route.params.id) {
    isEditing.value = true;
    await loadArticle(route.params.id);
  }
  initializeQuill();
})

const defaultCategories = [
  'Frontend & UI',
  'Backend & API',
  'Architecture logicielle',
  'Communauté',
  'System Design & Scalabilité',
  'Data & Stockage',
  'Devops & Cloud',
  'Hobbies',
  'Divers'
]

let quill;
const initializeQuill = async () => {
  await nextTick()
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
  quill.root.innerHTML = content.value

  quill.on('text-change', () => {
    content.value = quill.root.innerHTML
  })
}

const resetForm = () => {
  title.value = ''
  category.value = ''
  imageAlt.value = ''
  imageUrl.value = null
  if (quill) {
    quill.setContents([])
  }
}

const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    imageUrl.value = file
  }
}

const handleSubmit = async () => {
  try {
    if (!title.value || !content.value || !imageAlt.value || !category.value) {
      throw new Error('Tous les champs sont obligatoires')
    }

    const formData = new FormData()
    formData.append('title', title.value)
    formData.append('content', content.value)
    formData.append('alt', imageAlt.value)
    formData.append('category', category.value)

    // Ajoute une nouvelle image seulement si on en sélectionne une
    if (imageUrl.value instanceof File) {
      formData.append('image', imageUrl.value)
    }

    // Définit la méthode et l'URL en fonction de `isEditing`
    const method = isEditing.value ? 'PUT' : 'POST';
    const url = isEditing.value
      ? `${import.meta.env.VITE_BACKEND_URL}/api/articles/${route.params.id}`
      : `${import.meta.env.VITE_BACKEND_URL}/api/articles`

    const response = await fetch(url, {
      method,
      credentials: 'include',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Erreur lors de l\'enregistrement')
    }

    console.log(isEditing.value ? 'Article mis à jour' : 'Article publié')
    resetForm()
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement de l\'article:', error)
  }
}
</script>

<style>
.ql-toolbar.ql-snow {
  border-radius: 5px;
  margin-top: 1rem;
}
</style>
