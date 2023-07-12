<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="signup-1 bg-white flex items-center relative h-screen">
    <div class="overlay absolute inset-0 z-0 bg-black opacity-75"></div>
    <div class="container px-4 mx-auto relative z-10">
      <div class="sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-5/12 mx-auto">
        <div class="box bg-slate-800 p-6 md:px-12 md:pt-12 border-t-10 border-solid border-red-700">
          <h2 class="text-3xl text-gray-200 text-center">Create Your Account</h2>

          <form @submit.prevent="handleSubmit" class="signup-form mt-6 md:mt-12">
            <div v-if="isUserAlreadyRegistered" class="text-center mt-6 md:mt-12">
              <p class="text-red-600">User is already registered. Please <router-link to="/login"
                  class="text-red-600 hover:underline">Log In</router-link>.</p>
            </div>

            <div class="border-2 border-solid rounded flex items-center mb-4">
              <div class="w-10 h-10 flex justify-center items-center flex-shrink-0">
                <span class="far fa-user text-gray-200"></span>
              </div>
              <div class="flex-1">
                <input type="text" v-model="username" placeholder="Username" pattern="^[A-Za-z0-9]{3,}$"
                  class="h-10 bg-slate-700 text-gray-200 py-1 pr-3 w-full" required>
              </div>
            </div>

            <div class="border-2 border-solid rounded flex items-center mb-4">

              <div class="w-10 h-10 flex justify-center items-center flex-shrink-0">
                <span class="far fa-envelope  text-gray-200"></span>
              </div>
              <div class="flex-1">
                <input type="text" v-model="email" placeholder="E-mail" pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
                  class="h-10 bg-slate-700 text-gray-200 py-1 pr-3 w-full" required>
              </div>
            </div>

            <div class="border-2 border-solid rounded flex items-center mb-4">
              <div class="w-10 h-10 flex justify-center items-center flex-shrink-0">
                <span class="fas fa-asterisk text-gray-200"></span>
              </div>
              <div class="flex-1">
                <input type="password" v-model="password" placeholder="Password"
                  pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
                  class="h-10 bg-slate-700 text-gray-200 py-1 pr-3 w-full" required>
              </div>
            </div>

            <div class="border-2 border-solid rounded flex items-center mb-4">
              <div class="w-10 h-10 flex justify-center items-center flex-shrink-0">
                <span class="fas fa-asterisk text-gray-200"></span>
              </div>
              <div class="flex-1">
                <input type="password" placeholder="Confirm Password" v-model="confirmPassword"
                  pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
                  class="h-10 bg-slate-700 text-gray-200 py-1 pr-3 w-full" required>
              </div>
            </div>

            <p class="text-sm text-center text-gray-200 mt-6">By signing up, you agree to our <RouterLink to="/terms"
                href="#" class="text-red-600 hover:underline">Terms</RouterLink> and <RouterLink to="/terms" href="#"
                class="text-red-600 hover:underline">Privacy Policy</RouterLink>
            </p>

            <div class="text-center mt-6 md:mt-12">
              <button
                class="bg-red-700 hover:bg-red-800 text-gray-200 text-xl py-2 px-4 md:px-6 rounded transition-colors duration-300">Sign
                Up <span class="far fa-paper-plane ml-2"></span></button>
            </div>

            <div class="text-center mt-6">
              <button
                class="bg-red-700 hover:bg-red-800 text-gray-200 text-xl py-2 px-4 md:px-6 rounded transition-colors duration-300"
                @click="handleSignupWithGoogle">
                Sign Up with Google <span class="fab fa-google ml-2"></span>
              </button>
            </div>
          </form>

          <div class="border-t border-solid mt-6 md:mt-12 pt-4">
            <p class="text-gray-500 text-center">Already have an account, <a href="#"
                class="text-red-600 hover:underline"><router-link to="/login">Log In</router-link></a></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/firebase';
import { GoogleAuthProvider, signInWithPopup, getAuth} from 'firebase/auth';
// import { storeToRefs } from 'pinia';
import { useStore } from '@/store';


const username = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const router = useRouter();
const isUserAlreadyRegistered = ref(false);
const store = useStore();

const handleSubmit = async () => {
  if (username.value !== '' && email.value !== '' && password.value !== '' && confirmPassword.value !== '' && password.value === confirmPassword.value) {
    try {
      const newUser = {
        username: username.value,
        email: email.value,
        password: password.value,
      };

      const querySnapshot = await getDocs(query(collection(db, 'users'), where('email', '==', email.value)));

      if (!querySnapshot.empty) {
        isUserAlreadyRegistered.value = true;
        return;
      }

      const docRef = await addDoc(collection(db, 'users'), newUser);
      console.log('User data stored successfully. Document ID:', docRef.id);

      router.push('/login');
    } catch (error) {
      console.error('Error storing user data:', error);
    }
  } else if (password.value !== confirmPassword.value) {
    alert("Password and confirm Password must be the same");
  } else if (username.value === '') {
    alert("Username must be provided");
  }
};

const handleSignupWithGoogle = async () => {
  try {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    const result = await signInWithPopup(auth, provider);

    const { displayName, email } = result.user;

    const newUser = {
      username: displayName,
      email: email,
      password: '',
    };

    const docRef = await addDoc(collection(db, 'users'), newUser);
    store.setUsername(displayName, email)
    console.log('User data stored successfully. Document ID:', docRef.id);

    router.push('/home');
  } catch (error) {
    console.error('Error signing up with Google:', error);
  }
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

.slide-in-out-enter-active,
.slide-in-out-leave-active {
  transition: transform 0.3s ease-out;
}

.slide-in-out-enter {
  transform: translateX(100%);
}

.slide-in-out-leave-to {
  transform: translateX(100%);
}</style>
