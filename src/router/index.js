import { createRouter, createWebHistory } from 'vue-router'
import Movies from '../views/Movies.vue'
import Genres from '../views/Genres.vue'
import Actors from '../views/Actors.vue'
import Login from '../views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'movies',
      component: Movies
    },
    {
      path: '/genres',
      name: 'genres',
      component: Genres
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
  ]
})

export default router
