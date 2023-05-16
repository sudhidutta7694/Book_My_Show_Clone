<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="login-1 bg-white flex items-center relative h-screen">
      <div class="overlay absolute inset-0 z-0 bg-black opacity-75"></div>
      <div class="container px-4 mx-auto relative z-10">
          <div class="sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-5/12 mx-auto">
          <div class="box bg-slate-800 p-6 md:px-12 md:pt-12 border-t-10 border-solid border-red-700">
              <h2 class="text-3xl text-gray-200 text-center">Login</h2>
      
              <form @submit.prevent="handleLogin" class="login-form mt-6 md:mt-12">
      
              <!-- <div class="border-2 border-solid rounded flex items-center mb-4">
                  <div class="w-10 h-10 flex justify-center items-center flex-shrink-0">
                  <span class="far fa-user text-gray-200"></span>
                  </div>
                  <div class="flex-1">
                  <input type="text" v-model="username" placeholder="Username" class="h-10 bg-slate-700 text-gray-200 py-1 pr-3 w-full">
                  </div>
              </div> -->
      
              <div class="border-2 border-solid rounded flex items-center mb-4">
                  <div class="w-10 h-10 flex justify-center items-center flex-shrink-0">
                  <span class="far fa-envelope  text-gray-200"></span>
                  </div>
                  <div class="flex-1">
                  <input type="text" v-model="email" placeholder="Enter your E-mail" class="p-4 h-10 bg-slate-700 text-gray-200 py-1 pr-3 w-full">
                  </div>
              </div>
      
              <div class="border-2 border-solid rounded flex items-center mb-4">
                  <div class="w-10 h-10 flex justify-center items-center flex-shrink-0">
                  <span class="fas fa-asterisk text-gray-200"></span>
                  </div>
                  <div class="flex-1">
                      <input type="password" v-model="password" placeholder="Enter your Password" class="p-4 h-10 bg-slate-700 text-gray-200 py-1 pr-3 w-full">
                  </div>
              </div>

              <!-- <div class="border-2 border-solid rounded flex items-center mb-4">
                  <div class="w-10 h-10 flex justify-center items-center flex-shrink-0">
                  <span class="fas fa-asterisk text-gray-200"></span>
                  </div>
                  <div class="flex-1">
                      <input type="password" placeholder="Confirm Password" class="h-10 bg-slate-700 text-gray-200 py-1 pr-3 w-full">
                  </div>
              </div> -->
      
              <p class="text-sm text-center text-gray-200 mt-6"><a href="#" class="text-red-600 hover:underline">Forgot Password?</a></p>
      
              <div class="text-center mt-6 md:mt-12">
                  <button class="bg-red-700 hover:bg-red-800 text-gray-200 text-xl py-2 px-4 md:px-6 rounded transition-colors duration-300">Log In<span class="far fa-paper-plane ml-2"></span></button>
              </div>
      
          </form>
  2
              <div class="border-t border-solid mt-6 md:mt-12 pt-4">
              <p class="text-gray-500 text-center">Don't have an account, <a href="#" class="text-red-600 hover:underline"><router-link to="/">Sign Up</router-link></a></p>
              </div>
      
          </div>
          </div>
      </div>
  </div>
</template>

<!-- <script>
import Vue from 'vue';

export default Vue.component('LoginComponent', {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    login() {
      // your login logic here
    },
  },
});
</script> -->

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '../store';

export default {
  setup() {
    const email = ref('');
    const password = ref('');
    const router = useRouter();

    const store = useStore()

    const handleLogin = () => {
      // Retrieve user data from local storage
      const userData = JSON.parse(localStorage.getItem('users'))

      // Find the user with matching email and password
      const user = userData.find(user => user.email === email.value && user.password === password.value)

      // Check if user exists
      if (user) {
        // Set the username in the Pinia store
        store.setUsername(user.username)

        // Redirect to home page if the user exists
        router.push('/home')
        alert('You are logged in!')
      } else {
        // Show a prompt if the user doesn't exist
        alert('User does not exist')
      }
    }



    return {
      email,
      password,
      handleLogin,
    };
  },
};
</script>

<style scoped>

    .login-1 {
        z-index: 1000;
    }
  .box {
        border-radius: 2rem;
    }
    
  .border-t-10 {
    border-top-width: 10px;
  }
  
</style>