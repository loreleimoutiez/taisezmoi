<template>
  <footer class="footer footer-center p-10 text-base-content rounded shrink-0 bg-gray-900">
    <nav class="grid grid-flow-col gap-4">
      <router-link to="/contact" class="link link-hover">Contact</router-link>
      <router-link to="/privacy-policy" class="link link-hover">Politique de Confidentialité</router-link>
      <a class="link link-hover animate-pulse" href="https://smartlink.ausha.co/code-nautilus" target="_blank"
        rel="noopener noreferrer">
        Code Nautilus <i class="fa-solid fa-arrow-up-right-from-square ml-1"></i>
      </a>
      <div>
        <button @click="dispatch(toggleTheme())" aria-label="toggle theme"
          class="p-2 rounded-md transition-all duration-300">
          <svg v-if="!isDarkMode" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" viewBox="0 0 384 512"
            fill="currentColor">
            <path
              d="M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" viewBox="0 0 512 512"
            fill="currentColor">
            <path
              d="M375.7 19.7c-1.5-8-6.9-14.7-14.4-17.8s-16.1-2.2-22.8 2.4L256 61.1 173.5 4.2c-6.7-4.6-15.3-5.5-22.8-2.4s-12.9 9.8-14.4 17.8l-18.1 98.5L19.7 136.3c-8 1.5-14.7 6.9-17.8 14.4s-2.2 16.1 2.4 22.8L61.1 256 4.2 338.5c-4.6 6.7-5.5 15.3-2.4 22.8s9.8 13 17.8 14.4l98.5 18.1 18.1 98.5c1.5 8 6.9 14.7 14.4 17.8s16.1 2.2 22.8-2.4L256 450.9l82.5 56.9c6.7 4.6 15.3 5.5 22.8 2.4s12.9-9.8 14.4-17.8l18.1-98.5 98.5-18.1c8-1.5 14.7-6.9 17.8-14.4s2.2-16.1-2.4-22.8L450.9 256l56.9-82.5c4.6-6.7 5.5-15.3 2.4-22.8s-9.8-12.9-17.8-14.4l-98.5-18.1L375.7 19.7zM269.6 110l65.6-45.2 14.4 78.3c1.8 9.8 9.5 17.5 19.3 19.3l78.3 14.4L402 242.4c-5.7 8.2-5.7 19 0 27.2l45.2 65.6-78.3 14.4c-9.8 1.8-17.5 9.5-19.3 19.3l-14.4 78.3L269.6 402c-8.2-5.7-19-5.7-27.2 0l-65.6 45.2-14.4-78.3c-1.8-9.8-9.5-17.5-19.3-19.3L64.8 335.2 110 269.6c5.7-8.2 5.7-19 0-27.2L64.8 176.8l78.3-14.4c9.8-1.8 17.5-9.5 19.3-19.3l14.4-78.3L242.4 110c8.2 5.7 19 5.7 27.2 0zM256 368a112 112 0 1 0 0-224 112 112 0 1 0 0 224zM192 256a64 64 0 1 1 128 0 64 64 0 1 1 -128 0z" />
          </svg>
        </button>
      </div>
    </nav>
    <nav>
      <div class="grid grid-flow-col gap-4">
        <a aria-label="bluesky" href="https://bsky.app/profile/taisezmoi.com" target="_blank" rel="noopener noreferrer"
          class="h-6 w-6"><i class="fa-brands fa-bluesky text-2xl h-6 -mt-1"></i></a>
        <a aria-label="github" href="https://github.com/loreleimoutiez" target="_blank" rel="noopener noreferrer"
          class="h-6 w-6"><i class="fa-brands fa-github text-2xl h-6 -mt-1"></i></a>
        <a aria-label="linkedin" href="https://www.linkedin.com/in/lorelei-moutiez/" target="_blank"
          rel="noopener noreferrer" class="h-6 w-6"><i class="fa-brands fa-linkedin text-2xl h-6 -mt-1"></i></a>
      </div>
    </nav>
    <aside>
      <p>© {{ currentDate() }} - taisezmoi - Tous droits réservés</p>
    </aside>
  </footer>
</template>

<script setup>
import { useSelector, useDispatch } from '@reduxjs/vue-redux'
import { toggleTheme } from '../../../features/theme/theme-slice'

const isDarkMode = useSelector((state) => state.theme.isDarkMode)
const dispatch = useDispatch()

const currentDate = () => {
  return new Date().getFullYear()
}
</script>
