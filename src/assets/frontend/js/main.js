import { createApp } from 'vue'
import App from '@/App.vue'
import '@/index.css'
import router from '@/assets/frontend/router'

createApp(App).use(router).mount('#app')
