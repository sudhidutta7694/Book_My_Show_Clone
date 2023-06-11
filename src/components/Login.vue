<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="login-1 bg-white flex items-center relative h-screen">
    <div class="overlay absolute inset-0 z-0 bg-black opacity-75"></div>
    <div class="container px-4 mx-auto relative z-10">
      <div class="sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-5/12 mx-auto">
        <div class="box bg-slate-800 p-6 md:px-12 md:pt-12 border-t-10 border-solid border-red-700">
          <h2 class="text-3xl text-gray-200 text-center">Login</h2>

          <form @submit.prevent="handleLogin" class="login-form mt-6 md:mt-12">
            <div v-if="!showForgotPasswordSection" class="border-2 border-solid rounded flex items-center mb-4">
              <div class="w-10 h-10 flex justify-center items-center flex-shrink-0">
                <span class="far fa-envelope text-gray-200"></span>
              </div>
              <div class="flex-1">
                <input type="text"  v-model="email" placeholder="Enter your E-mail"
                  class="p-4 h-10 bg-slate-700 text-gray-200 py-1 pr-3 w-full" />
              </div>
            </div>

            <div  v-if="!showForgotPasswordSection" class="border-2 border-solid rounded flex items-center mb-4">
              <div class="w-10 h-10 flex justify-center items-center flex-shrink-0">
                <span class="fas fa-asterisk text-gray-200"></span>
              </div>
              <div class="flex-1">
                <input v-model="password"  placeholder="Enter your Password" :type="showPassword ? 'text' : 'password'"
                  class="p-4 h-10 bg-slate-700 text-gray-200 py-1 pr-3 w-full" />
              </div>
              <button type="button"  class="eye-button" @click="showPassword = !showPassword">
                <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
              </button>
            </div>

            <div v-if="showForgotPasswordSection" class="border-2 border-solid rounded flex items-center mb-4">
              <div class="w-10 h-10 flex justify-center items-center flex-shrink-0">
                <span class="fas fa-question-circle text-gray-200"></span>
              </div>
              <div class="flex-1">
                <input v-model="forgotEmail" placeholder="Enter your E-mail"
                  class="p-4 h-10 bg-slate-700 text-gray-200 py-1 pr-3 w-full" />
              </div>
            </div>

            <p v-if="!showForgotPasswordSection" class="text-sm text-center text-gray-200 mt-6">
              <a href="#" class="text-red-600 hover:underline" @click="toggleForgotPasswordSection">Forgot Password?</a>
            </p>

            <div v-if="showForgotPasswordSection" class="text-center mt-6">
              <button type="button"
                class="bg-red-700 hover:bg-red-800 text-gray-200 text-xl py-2 px-4 md:px-6 rounded transition-colors duration-300"
                @click="handleForgotPassword">
                Reset Password<span class="fas fa-key ml-2"></span>
              </button>
            </div>

            <div class="text-center mt-6 md:mt-12">
              <button type="submit" v-if="!showForgotPasswordSection"
                class="bg-red-700 hover:bg-red-800 text-gray-200 text-xl py-2 px-4 md:px-6 rounded transition-colors duration-300">
                Log In<span class="far fa-paper-plane ml-2"></span>
              </button>
            </div>

            <!-- Sign in with Google button -->
            <div class="text-center mt-6">
              <button v-if="!showForgotPasswordSection"
                class="bg-red-700 hover:bg-red-800 text-gray-200 text-xl py-2 px-4 md:px-6 rounded transition-colors duration-300"
                @click="handleSigninWithGoogle">
                Sign In with Google <span class="fab fa-google ml-2"></span>
              </button>
            </div>
          </form>

          <div class="border-t border-solid mt-6 md:mt-12 pt-4">
            <p class="text-gray-500 text-center">
              Don't have an account? <router-link to="/" class="text-red-600 hover:underline">Sign Up</router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/firebase'; // Assuming you have already set up Firebase in your project
import { GoogleAuthProvider, signInWithPopup, getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { useStore } from '@/store';

export default {
  data() {
    return {
    showPassword: false,
    };
  },
  setup() {
    const email = ref('');
    const password = ref('');
    const router = useRouter();
    const store = useStore();
    const showForgotPasswordSection = ref(false);
    const forgotEmail = ref('');

    const toggleForgotPasswordSection = () => {
      showForgotPasswordSection.value = !showForgotPasswordSection.value;
    };

    const handleForgotPassword = async () => {
      try {
        const auth = getAuth();
        await sendPasswordResetEmail(auth, forgotEmail.value);

        // Password reset email sent successfully
        alert('Password reset email sent. Please check your inbox.');

        // Clear the input field
        forgotEmail.value = '';

        // Hide the forgot password section
        showForgotPasswordSection.value = false;
      } catch (error) {
        console.error('Error sending password reset email:', error);
        alert('Failed to send password reset email. Please try again.');
      }
    };

    // On component mount, check if the username is stored in local storage
    onMounted(() => {
      const storedUsername = localStorage.getItem('username');
      if (storedUsername) {
        store.setUsername(storedUsername);
      }
    });

    const handleLogin = async () => {
      try {
        // Check if the user credentials exist in Firestore
        const usersCollection = collection(db, 'users');
        const q = query(usersCollection, where('email', '==', email.value));
        const querySnapshot = await getDocs(q);

        let foundUser = null;

        querySnapshot.forEach((doc) => {
          const user = doc.data();
          if (user.password === password.value) {
            foundUser = user;
          }
        });

        if (!foundUser) {
          // User credentials not found or password is incorrect
          if (querySnapshot.size > 0) {
            alert('Incorrect password. Please try again.');
          } else {
            alert('No user registered with this email. Please try again.');
          }
        } else if (!foundUser.email || foundUser.email.length === 0) {
          alert("The Email ID cannot be empty!");
        } else {
          // User credentials matched, route to movies page
          store.setUsername(foundUser.username, foundUser.uid);

          // Store the username in local storage
          localStorage.setItem('username', foundUser.username);

          router.push('/home');
        }
      } catch (error) {
        console.log('Error logging in:', error);
        alert('Failed to log in. Please try again.');
      }
    };


    const handleSigninWithGoogle = async () => {
      try {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();

        const result = await signInWithPopup(auth, provider);

        // Get the user data from the Google sign-in result
        const { displayName, email, uid } = result.user;

        // Check if the user already exists in Firestore
        const usersCollection = collection(db, 'users');
        const q = query(usersCollection, where('email', '==', email));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.size > 0) {
          // User already exists, update the store and route to movies page
          store.setUsername(displayName, uid);

          // Store the username in local storage
          localStorage.setItem('username', displayName);

          router.push('/home');
        } else {
          // User doesn't exist, show error message
          alert('No user registered with this Google account. Please try again.');
        }
      } catch (error) {
        console.error('Error signing in with Google:', error);
        alert('Failed to sign in with Google. Please try again.');
      }
    };

    return {
      email,
      password,
      handleLogin,
      handleSigninWithGoogle,
      showForgotPasswordSection,
      forgotEmail,
      toggleForgotPasswordSection,
      handleForgotPassword,
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

.eye-button {
  width: 40px;
}

.eye-button i {
  font-size: 1rem;
  color: #999;
}
</style>
