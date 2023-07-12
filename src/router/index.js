import { createRouter, createWebHistory } from 'vue-router';
import { getAuth } from 'firebase/auth';
import Home from '../views/Movies.vue';
import Movies from '../components/All.vue';
import Chosen from '../components/Chosen.vue';
import Bookings from '../views/Bookings.vue';
import Login from '../views/LoginView.vue';
import Register from '../views/RegisterView.vue';
import Overview from '../components/Overview.vue';
import terms from '../components/terms.vue';
import MovieBook from '../components/moviebook.vue';
import theatres from '../components/theater.vue';
import hall from '../components/Hall.vue';
import payment from '../components/payment.vue';
import paySuccess from '../components/paySuccess.vue';

const isAuthenticated = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  return user !== null;
};


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: { requiresAuth: true },
    },
    {
      path: '/movies',
      name: 'movies',
      component: Movies,
      meta: { requiresAuth: true },
    },
    {
      path: '/bookings',
      name: 'bookings',
      component: Bookings,
      meta: { requiresAuth: true },
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: () => import('../components/Favorites.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/chosen',
      name: 'chosen',
      component: Chosen,
      props: (route) => ({
        languages: route.query.languages.split(','),
        city: route.query.city,
        state: route.query.state,
      }),
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { requiresAuth: false },
    },
    {
      path: '/',
      name: 'register',
      component: Register,
      meta: { requiresAuth: false },
    },
    {
      path: '/overview/:id',
      name: 'overview',
      component: Overview,
      props: true,
      meta: { requiresAuth: true },
    },
    {
      path: '/movie',
      name: 'moviebook',
      component: MovieBook,
      props: (route) => ({
        id: route.query.id,
        language: route.query.language,
        city: route.query.city,
        state: route.query.state,
      }),
      meta: { requiresAuth: true },
    },
    {
      path: '/theater',
      name: 'theater',
      component: theatres,
      props: (route) => ({
        movie: route.query.movie,
        language: route.query.language,
        city: route.query.city,
        state: route.query.state,
      }),
      meta: { requiresAuth: true },
    },
    {
      path: '/hall',
      name: 'hall',
      component: hall,
      props: (route) => ({
        date: route.query.date,
        theater: route.query.theater ? JSON.parse(route.query.theater) : null,
        movie: route.query.movie,
        language: route.query.language,
        city: route.query.city,
        state: route.query.state,
      }),
      meta: { requiresAuth: true },
    },
    {
      path: '/payment',
      name: 'payment',
      component: payment,
      props: (route) => ({
        payment: parseInt(route.query.payment),
        seats: route.query.seats ? route.query.seats.split(',') : [],
        date: route.query.date,
        theater: route.query.theater ? JSON.parse(route.query.theater) : null,
        movie: route.query.movie,
        language: route.query.language,
        city: route.query.city,
        state: route.query.state,
      }),
      meta: { requiresAuth: true },
    },
    {
      path: '/paySuccess',
      name: 'paySuccess',
      component: paySuccess,
      props: (route) => ({
        token: route.query.token,
        cardNumber: route.query.cardNumber,
        payment: parseInt(route.query.payment),
        date: route.query.date,
        seatLength: parseInt(route.query.seatLength),
        seats: route.query.seats ? route.query.seats : [],
        theater: JSON.parse(route.query.theater),
        movie: route.query.movie,
        language: route.query.language,
        city: route.query.city,
        state: route.query.state,
        seas: route.query.seats,
      }),
      meta: { requiresAuth: true },
    },
    {
      path: '/terms',
      name: 'terms',
      component: terms,
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (requiresAuth && !isAuthenticated()) {
    next('/login');
  } else {
    next();
  }
});

export default router;
