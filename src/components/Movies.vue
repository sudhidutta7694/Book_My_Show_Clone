<template>
  <div v-if="loading" class="bg-slate-800 h-[80vh] flex justify-center items-center">
    <!-- <svg class="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24"></svg> -->
    <img src="https://cdn.dribbble.com/users/121337/screenshots/916951/small-load.gif" alt="Loading ...">
  </div>
  <div class="bg-slate-800 content p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
    <div class="flex flex-col justify-center items-center bg-slate-700 rounded-xl hover:scale-105" v-for="movie in movies" :key="movie.id" @click="handleMovieClick(movie.id)">
      <router-link :to="{ name: 'overview', params: { id: movie.id } }"><img :src="getImageUrl(movie.poster_path)" :alt="movie.title" class="rounded-lg shadow-lg"></router-link>
      <div class="mt-4 text-center">
        <h3 class="text-gray-100 text-lg font-semibold">{{ movie.title }}</h3>
        <p class="text-gray-300">{{ movie.release_date }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      movies: [],
      loading: true
    };
  },
  mounted() {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=1dc8f67cb5ee2d801ef91ff145b4c3a9&language=en-US&page=1&total_pages=1000`)
      .then(response => response.json())
      .then(data => {
        this.movies = data.results;
        this.loading = false;
        console.log(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  },
  methods: {
    getImageUrl(posterPath) {
      if (!posterPath) {
        return 'https://via.placeholder.com/500x750.png?text=No+Poster+Available';
      }
      return `https://image.tmdb.org/t/p/w780${posterPath}`;
    },
    handleMovieClick(movieId) {
      console.log('Clicked movie ID:', movieId);
    }
  }
};
</script>

<style scoped>
/* Add padding to body equal to header height */
.content {
  padding-top: 140px; /* Replace with actual header height */
}
</style>
