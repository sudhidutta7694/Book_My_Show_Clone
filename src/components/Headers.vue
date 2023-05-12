<!-- eslint-disable vue/multi-word-component-names -->
<template>
<nav class="bg-gray-900">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6 md:py-8">
            <div class="flex items-center">
                <router-link to="/" class="flex items-center mr-6">
                  <img class="w-[20vw] md:w-[12vw] lg:w-[8vw] lg:h-[7vh] mx-4" src="../../favicon.ico" alt="Logo" />

                </router-link>
                <div class="hidden md:block">
                    <router-link to="/" class="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300" active-class="text-white bg-gray-800">
                        Movies
                    </router-link>
                    <router-link to="/genres" class="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300" active-class="text-white bg-gray-800">
                        Genres
                    </router-link>
                    <router-link to="/actors" class="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300" active-class="text-white bg-gray-800">
                        Actors
                    </router-link>
                </div>
            </div>
            <div class="flex items-center">
                <form class="relative mr-6">
                    <input type="text" placeholder="Search here" class="border border-gray-300 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors duration-300" />
                    <button type="submit" class="absolute right-0 top-0 bottom-0 px-4 py-2 text-gray-400 hover:text-gray-100 transition-colors duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17l-5-5m0 0l5-5m-5 5h12" />
                        </svg>
                    </button>
                    <div v-if="false" class="lg:absolute mx-1 mt-1 ml-2 rounded bg-gray-300">
                        <ul>
                            <li class="flex justify-around items-center p-2 pb-3 space-x-2 border-b border-black w-64">
                                <img src="../../favicon.ico" class="w-10" />
                                <span>Movie name</span>
                            </li>
                        </ul>
                    </div>
                </form>
                <button type="button" class="block md:hidden text-gray-400 hover:text-white focus:text-white focus:outline-none" @click="isMenuOpen = !isMenuOpen">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
                <router-link to="/login" class="bg-gray-800 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ml-4">
                  Login
                </router-link>
                <button type="button" class="block md:hidden text-gray-400 hover:text-white focus:text-white focus:outline-none" @click="isMenuOpen = !isMenuOpen">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                </button>
                <router-link to="/register" class="bg-gray-800 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ml-4">
                 Register
              </router-link>
            </div>
        </div>
    </div>
    <div class="md:hidden bg-gray-900">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <router-link to="/" class="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                Movies
            </router-link>
            <router-link to="/genres" class="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                Genres
            </router-link>
            <router-link to="/actors" class="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                Actors
            </router-link>
        </div>
    </div>
</nav>
</template>

  
  
<script>
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
};
</script>
  
  
<style scoped>
nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 100;
  }
.navbar {
    background-color: #141414;
}

.navbar a:hover {
    text-decoration: underline;
}

.nav-link-active {
    font-weight: bold;
}
</style>
