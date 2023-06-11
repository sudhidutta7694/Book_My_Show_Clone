import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Movies.vue'
import Movies from '../components/All.vue'
import Actors from '../views/Actors.vue'
import Login from '../views/LoginView.vue'
import Register from '../views/RegisterView.vue'
import Overview from '../components/Overview.vue'
import terms from '../components/terms.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/movies',
      name: 'movies',
      component: Movies
    },
    {
      path: '/actors',
      name: 'actors',
      component: Actors
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'register',
      component: Register
    },
    {
      path: '/overview/:id',
      name: 'overview',
      component: Overview,
      props: true
    },
    {
      path: '/terms',
      name: 'terms',
      component: terms
    }
  ]
})

export default router
