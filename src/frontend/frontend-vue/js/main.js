import { createApp } from 'vue'
import { createHead } from '@vueuse/head'
import App from '@/App.vue'
import '@/index.css'
import router from '@/frontend/frontend-vue/router'
import 'quill/dist/quill.snow.css'
import { provideStoreToApp } from '@reduxjs/vue-redux'
import store from '../../../app/store'

const head = createHead()

const app = createApp(App).use(router).use(head)
provideStoreToApp(app, { store })
app.mount('#app')