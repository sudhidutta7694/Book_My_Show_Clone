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
                @click="googleSignUp">
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
import { app } from '@/firebase';
import { useRouter } from 'vue-router';
import { collection, addDoc, getDocs, query, where, doc, setDoc, getFirestore, getDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
// import { storeToRefs } from 'pinia';
// import { useStore } from '@/store';


const username = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const router = useRouter();
const isUserAlreadyRegistered = ref(false);
const auth = getAuth(app)
// const store = useStore();

const handleSubmit = async () => {
  if (username.value !== '' && email.value !== '' && password.value !== '' && confirmPassword.value !== '' && password.value === confirmPassword.value) {
    try {
      const newUser = {
        displayName: username.value,
        email: email.value,
        password: password.value,
      };

      const querySnapshot = await getDocs(query(collection(db, 'Users'), where('email', '==', email.value)));

      if (!querySnapshot.empty) {
        isUserAlreadyRegistered.value = true;
        return;
      }

      const docRef = await addDoc(collection(db, 'Users'), newUser);
      localStorage.setItem('user', JSON.stringify(newUser))
      console.log('User data stored successfully. Document ID:', docRef.id);
      localStorage.setItem("access_token", docRef.id)
      const gender = Math.random() < 0.5 ? "men" : "women";
      const randomIndex = Math.floor(Math.random() * 100) + 1;
      localStorage.setItem('userImage', `https://randomuser.me/api/portraits/${gender}/${randomIndex}.jpg`)
      router.push('/home');
    } catch (error) {
      console.error('Error storing user data:', error);
    }
  } else if (password.value !== confirmPassword.value) {
    alert("Password and confirm Password must be the same");
  } else if (username.value === '') {
    alert("Username must be provided");
  }
};


const googleSignUp = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    localStorage.setItem("access_token", JSON.stringify(token));
    const user = result.user;
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("userImage", JSON.parse(localStorage.getItem("user")).photoURL);
    // Redirect or perform other actions
    router.push("/home");

    const firestore = getFirestore();
    const usersCollectionRef = collection(firestore, "Users");
    const userDocRef = doc(usersCollectionRef, user.uid);

    const userDocSnap = await getDoc(userDocRef);
    if (!userDocSnap.exists()) {
      // Create the user document in Firestore if it doesn't exist
      await setDoc(userDocRef, {
        name: user.displayName,
        email: user.email,
        // Add more fields as needed
      });
    }
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, ": ", errorMessage);
    const email = error.customData.email;
    console.log("Email: ", email);
    const credential = GoogleAuthProvider.credentialFromError(error);
    console.log("AuthCredential: ", credential);
    // Handle error
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
}
</style>
