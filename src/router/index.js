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
import payment from "../components/payment.vue"
import paySuccess from "../components/paySuccess.vue"

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
      path: '/favorites',
      name: 'favorites',
      component: () => import('../components/Favorites.vue')
    },
    {
      path: '/chosen',
      name: 'chosen',
      component: Chosen,
      props: (route) => ({
        languages: route.query.languages.split(','),
        city: route.query.city,
        state: route.query.state})
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
      path: '/movie',
      name: 'moviebook',
      component: MovieBook,
      props: (route) => ({
        id: route.query.id,
        language: route.query.language,
        city: route.query.city,
        state: route.query.state})
    },
    {
      path: '/theater',
      name: 'theater',
      component: theatres,
      props: (route) => ({ 
        movie: route.query.movie,
        language: route.query.language,
        city: route.query.city,
        state: route.query.state})
    },
    {
      path: '/hall',
      name: 'hall',
      component: hall,
      props: route => ({
        theater: route.query.theater ? JSON.parse(route.query.theater) : null,
        movie: route.query.movie,
        language: route.query.language,
        city: route.query.city,
        state: route.query.state
      })
    },    
    {
      path: '/payment',
      name: 'payment',
      component: payment,
      props: route => ({
        payment: parseInt(route.query.payment),
        seats: route.query.selectedSeats ? route.query.selectedSeats.split(',') : [],
        theater: route.query.theater ? JSON.parse(route.query.theater) : null,
        movie: route.query.movie,
        language: route.query.language,
        city: route.query.city,
        state: route.query.state
      })
    },
    {
      path: '/paySuccess',
      name: 'paySuccess',
      component: paySuccess,
      props: route => ({
        token: route.query.token,
        cardNumber: route.query.cardNumber,
        payment: parseInt(route.query.payment),
        seatLength: parseInt(route.query.seatLength),
        seats: route.query.seats ? route.query.seats : [],
        theater: JSON.parse(route.query.theater),
        movie: route.query.movie,
        language: route.query.language,
        city: route.query.city,
        state: route.query.state
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
