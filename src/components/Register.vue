<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="signup-1 bg-white flex items-center relative h-screen">
        <div class="overlay absolute inset-0 z-0 bg-black opacity-75"></div>
        <div class="container px-4 mx-auto relative z-10">
            <div class="sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-5/12 mx-auto">
            <div class="box bg-slate-800 p-6 md:px-12 md:pt-12 border-t-10 border-solid border-red-700">
                <h2 class="text-3xl text-gray-200 text-center">Create Your Account</h2>
        
                <form @submit.prevent="handleSubmit" class="signup-form mt-6 md:mt-12">
        
                <div class="border-2 border-solid rounded flex items-center mb-4">
                    <div class="w-10 h-10 flex justify-center items-center flex-shrink-0">
                    <span class="far fa-user text-gray-200"></span>
                    </div>
                    <div class="flex-1">
                    <input type="text" v-model="username" placeholder="Username" class="h-10 bg-slate-700 text-gray-200 py-1 pr-3 w-full">
                    </div>
                </div>
        
                <div class="border-2 border-solid rounded flex items-center mb-4">
                    <div class="w-10 h-10 flex justify-center items-center flex-shrink-0">
                    <span class="far fa-envelope  text-gray-200"></span>
                    </div>
                    <div class="flex-1">
                    <input type="text" v-model="email" placeholder="E-mail" class="h-10 bg-slate-700 text-gray-200 py-1 pr-3 w-full">
                    </div>
                </div>
        
                <div class="border-2 border-solid rounded flex items-center mb-4">
                    <div class="w-10 h-10 flex justify-center items-center flex-shrink-0">
                    <span class="fas fa-asterisk text-gray-200"></span>
                    </div>
                    <div class="flex-1">
                        <input type="password" v-model="password" placeholder="Password" class="h-10 bg-slate-700 text-gray-200 py-1 pr-3 w-full">
                    </div>
                </div>

                <div class="border-2 border-solid rounded flex items-center mb-4">
                    <div class="w-10 h-10 flex justify-center items-center flex-shrink-0">
                    <span class="fas fa-asterisk text-gray-200"></span>
                    </div>
                    <div class="flex-1">
                        <input type="password" placeholder="Confirm Password" class="h-10 bg-slate-700 text-gray-200 py-1 pr-3 w-full">
                    </div>
                </div>
        
                <p class="text-sm text-center text-gray-200 mt-6">By signing up, you agree to our <a href="#" class="text-red-600 hover:underline">Terms</a> and <a href="#" class="text-red-600 hover:underline">Privacy Policy</a></p>
        
                <div class="text-center mt-6 md:mt-12">
                    <button class="bg-red-700 hover:bg-red-800 text-gray-200 text-xl py-2 px-4 md:px-6 rounded transition-colors duration-300">Sign Up <span class="far fa-paper-plane ml-2"></span></button>
                </div>
        
            </form>
    2
                <div class="border-t border-solid mt-6 md:mt-12 pt-4">
                <p class="text-gray-500 text-center">Already have an account, <a href="#" class="text-red-600 hover:underline"><router-link to="/login">Log In</router-link></a></p>
                </div>
        
            </div>
            </div>
        </div>
    </div>
</template>

<!-- <script>
import {
    ref
} from 'vue';

export default {
    setup() {
        const isOpen = ref(false);

        return {
            isOpen
        };
    },
    data() {
        return {
            username: '',
            email: '', 
            password: '',
            confirm_password: ''
        }
    },
    methods: {
        
    }
};
</script> -->

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const username = ref('');
    const email = ref('');
    const password = ref('');
    const router = useRouter();

    const handleSubmit = () => {
      // Retrieve existing user data from local storage
      const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

      // Create a new user object
      const newUser = {
        username: username.value,
        email: email.value,
        password: password.value,
      };

      // Push the new user to the existing users array
      existingUsers.push(newUser);

      // Store the updated user data in local storage
      localStorage.setItem('users', JSON.stringify(existingUsers));

      console.log('User data stored successfully.');
      alert("You are registered")
      router.push('/login')
    };

    return {
      username,
      email,
      password,
      handleSubmit,
    };
  },
};
</script>


<style scoped>

    .signup-1 {
        z-index: 1000;
    }
  .box {
        border-radius: 2rem;
    }
    
  .border-t-10 {
    border-top-width: 10px;
  }
  
</style>