import { createRouter, createWebHashHistory } from 'vue-router'

import { getToken } from './js/authentication'

import HomePage from '@/frontend/Views/HomePage.vue'
import AboutPage from '@/frontend/Views/AboutPage.vue'
import ProjectsPage from '@/frontend/Views/ProjectsPage.vue'
import BlogPage from '@/frontend/Views/BlogPage.vue'
import ContactPage from '@/frontend/Views/ContactPage.vue'
import LoginPage from '@/frontend/Views/LoginPage.vue'
import DashboardPage from '@/frontend/Views/DashboardPage.vue'
import WriteArticle from '@/frontend/Views/WriteArticle.vue'
import MeteoProject from '@/frontend/Views/MeteoProject.vue'
import ErrorPage from '@/frontend/Views/ErrorPage.vue'

const routes = [
    {
      path: '/',
      name: 'Accueil',
      component: HomePage,
    },
    {
      path: '/about',
      name: 'À propos',
      component: AboutPage,
    },
    {
      path: '/projects',
      name: 'Projets',
      component: ProjectsPage,
    },
    {
      path: '/blog',
      name: 'Blog',
      component: BlogPage,
    },
    {
      path: '/contact',
      name: 'Contact',
      component: ContactPage,
    },
    {
      path: '/login',
      name: 'Se connecter',
      component: LoginPage,
    },
    {
      path: '/dashboard',
      name: 'Tableau de bord',
      component: DashboardPage,
    },
    {
      path: '/write',
      name: 'Écrire un article',
      component: WriteArticle,
    },
    {
      path: '/meteo',
      name: 'Projet météo',
      component: MeteoProject,
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: ErrorPage,
    }
]

const router = createRouter({
    history: createWebHashHistory('/'),
    routes
})

const authRequiredRoutes = ['Tableau de bord', 'Écrire un article', 'Projet météo']

router.beforeEach((to, from, next) => {
  const isAuthenticated = getToken();
  
  if (authRequiredRoutes.includes(to.name) && !isAuthenticated) {
    next({ name: 'Se connecter' })
  } else {
    next()
  }
})

export default router
