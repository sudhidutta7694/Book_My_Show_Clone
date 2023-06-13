import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Movies.vue'
import Movies from '../components/All.vue'
import Chosen from '../components/Chosen.vue'
import Bookings from '../views/Bookings.vue'
import Login from '../views/LoginView.vue'
import Register from '../views/RegisterView.vue'
import Overview from '../components/Overview.vue'
import terms from '../components/terms.vue'
import MovieBook from '../components/moviebook.vue'
import theatres from '../components/theater.vue'
import hall from "../components/Hall.vue"

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
      path: '/bookings',
      name: 'bookings',
      component: Bookings
    },
    {
      path: '/chosen',
      name: 'chosen',
      component: Chosen,
      props: (route) => ({ languages: route.query.languages.split(',') })
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
      path: '/movie/:id',
      name: 'moviebook',
      component: MovieBook,
      props: true
    },
    {
      path: '/theater',
      name: 'theater',
      component: theatres,
      props: (route) => ({ movie: route.query.movie })
    },
    {
      path: '/hall',
      name: 'hall',
      component: hall,
      props: route => ({
        theater: route.query.theater ? JSON.parse(route.query.theater) : null,
        movie: route.query.movie
      })
    },    
    {
      path: '/terms',
      name: 'terms',
      component: terms
    }
  ]
})

export default router
