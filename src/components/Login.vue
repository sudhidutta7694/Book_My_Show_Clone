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
                <input type="text" v-model="email" placeholder="Enter your E-mail" pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
                  class="p-4 h-10 bg-slate-700 text-gray-200 py-1 pr-3 w-full" required />
              </div>
            </div>

            <div v-if="!showForgotPasswordSection" class="border-2 border-solid rounded flex items-center mb-4">
              <div class="w-10 h-10 flex justify-center items-center flex-shrink-0">
                <span class="fas fa-asterisk text-gray-200"></span>
              </div>
              <div class="flex-1">
                <input v-model="password" placeholder="Enter your Password" :type="showPassword ? 'text' : 'password'"
                  class="p-4 h-10 bg-slate-700 text-gray-200 py-1 pr-3 w-full"
                  pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$" required />
              </div>
              <button type="button" class="eye-button" @click="showPassword = !showPassword">
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
import { collection, query, where, getDocs, setDoc, getDoc, doc, getFirestore } from 'firebase/firestore';
import { db, app } from '@/firebase'; // Assuming you have already set up Firebase in your project
import { GoogleAuthProvider, signInWithPopup, getAuth, sendPasswordResetEmail } from 'firebase/auth';
import Swal from 'sweetalert2';
// import { useStore } from '@/store';

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
    // const store = useStore();
    const showForgotPasswordSection = ref(false);
    const forgotEmail = ref('');
    const auth = getAuth(app)

    const toggleForgotPasswordSection = () => {
      showForgotPasswordSection.value = !showForgotPasswordSection.value;
    };
    const handleForgotPassword = async () => {
      try {
        const auth = getAuth(app);
        const email = forgotEmail.value;

        // Send the password reset email
        await sendPasswordResetEmail(auth, email);

        // Password reset email sent successfully
        const resetLink = 'https://mail.google.com'; // Replace with your actual password reset link

        // Display SweetAlert with a clickable link
        Swal.fire({
          title: 'Password Reset Email Sent',
          html: `Password reset email sent. Please check your inbox. Click <a href="${resetLink}" target="_blank" style="color: blue; text-decoration: underline;">here</a> to reset your password.`,
          icon: 'success',
        });

        // Clear the input field
        forgotEmail.value = '';

        // Hide the forgot password section
        showForgotPasswordSection.value = false;
      } catch (error) {
        console.error('Error sending password reset email:', error);
        // alert('Failed to send password reset email. Please try again.');
        Swal.fire({
          title: 'Failed to send password reset email.',
          html: 'Please crosscheck the email',
          icon: 'error',
        })

        forgotEmail.value = '';
      }
    };


    // On component mount, check if the username is stored in local storage
    onMounted(() => {
      if (localStorage.getItem('user')) {
        router.push('/home');
      }
    });

    const handleLogin = async () => {
      try {
        // Check if the user credentials exist in Firestore
        const usersCollection = collection(db, 'Users');
        const q = query(usersCollection, where('email', '==', email.value));
        const querySnapshot = await getDocs(q);

        let foundUser = null;
        // let access_token = null

        querySnapshot.forEach((doc) => {
          const user = doc.data();
          if (user.password === password.value) {
            foundUser = user;
            user['uid'] = doc.id;
          }
        });

        if (!foundUser) {
          // User credentials not found or password is incorrect
          if (querySnapshot.size > 0) {
            Swal.fire({
              title: 'Incorrect Password',
              html: 'Please crosscheck the password',
              icon: 'error',
            })
          } else {
            Swal.fire({
              title: 'No User registered with this Email',
              html: 'Please crosscheck the Email',
              icon: 'error',
            })
          }
        } else if (!foundUser.email || foundUser.email.length === 0) {
          alert("The Email ID cannot be empty!");
        } else {
          // User credentials matched, route to movies page
          // store.setUsername(foundUser.username, foundUser.uid);

          // Store the username in local storage
          localStorage.setItem('user', JSON.stringify(foundUser));
          // localStorage.setItem('access_token', access_token);

          router.push('/home');
        }
      } catch (error) {
        console.log('Error logging in:', error);
        alert('Failed to log in. Please try again.');
      }
    };


    const handleSigninWithGoogle = async () => {
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
