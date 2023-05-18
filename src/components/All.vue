<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="content bg-slate-800 flex flex-col gap-4 justify-center items-center">
      <div class="mt-12 filters flex justify-end items-center gap-4">
        <label for="language" class="text-gray-200 font-semi-bold text-2xl self-center">Language:</label>
        <select id="language" v-model="selectedLanguage" class="w-32 border border-black">
          <option value="">All</option>
          <option v-for="language in languages" :key="language">{{ language }}</option>
        </select>
  
        <label for="genre" class="text-gray-200 font-semi-bold text-2xl self-center">Genre:</label>
        <select id="genre" v-model="selectedGenre" class="w-32 border border-black">
          <option value="">All</option>
          <option v-for="genre in genres" :key="genre.id" :value="genre.id">{{ genre.name }}</option>
        </select>
  
        <label for="year" class="text-gray-200 font-semi-bold text-2xl self-center">Year:</label>
        <input type="text" id="year" v-model="selectedYear" class="w-32 border border-black" />
  
        <button @click="applyFilters" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Apply Changes
        </button>
      </div>
      

      <div vif="!showButton" class="movies bg-slate-800 content p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
        <div class="movie flex flex-col justify-center items-center bg-slate-700 rounded-xl hover:opacity-70 transition-all ease-in-out duration-400" v-for="movie in filteredMovies" :key="movie.id">
            <router-link :to="{ name: 'overview', params: { id: movie.id } }">
                <img :src="getMoviePosterURL(movie.poster_path)" alt="Movie Poster" class="rounded-lg shadow-lg" />
            </router-link>
          <div class="movie-details text-center">
            <h3 class="text-gray-100 text-lg font-semibold">{{ movie.title }}</h3>
            <p class="text-gray-300">Rating: {{ movie.vote_average }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  const API_KEY = '1dc8f67cb5ee2d801ef91ff145b4c3a9';
  
  export default {
    data() {
      return {
        selectedLanguage: '',
        selectedGenre: '',
        selectedYear: '',
        movies: [],
        languages: ['en', 'bn', 'hi','es', 'fr', 'ja', 'ar', 'ru', 'de', 'ko', 'el'], // Use language codes
        genres: [],
        showButton: true,
      };
    },
    computed: {
      filteredMovies() {
        let filtered = this.movies;
  
        if (this.selectedLanguage) {
          filtered = filtered.filter(movie => movie.original_language === this.selectedLanguage);
        }
  
        if (this.selectedGenre) {
          filtered = filtered.filter(movie => movie.genre_ids.includes(Number(this.selectedGenre)));
        }
  
        if (this.selectedYear) {
          filtered = filtered.filter(movie => movie.release_date && movie.release_date.includes(this.selectedYear));
        }
  
        return filtered.slice(0, 20); // Limit results to a maximum of 20 movies
      },
    },
    methods: {
        async applyFilters() {
  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/discover/movie",
      {
        params: {
          api_key: API_KEY,
          language: this.selectedLanguage || "en-US",
          with_original_language: this.selectedLanguage || "",
          with_genres: this.selectedGenre || "",
          primary_release_year: this.selectedYear || "",
          sort_by: "popularity.desc",
          include_adult: false,
          include_video: false,
          page: 1,
        },
      }
    );

    this.movies = response.data.results.slice(0, 20);
    this.showButton = false; // Hide the button after applying filters
  } catch (error) {
    console.error(error);
  }
}
,
      getMoviePosterURL(posterPath) {
        if (!posterPath) {
          return ''; // Return a default image or placeholder if no poster path is available
        }
        return `https://image.tmdb.org/t/p/w780${posterPath}`;
      },
      async fetchGenres() {
        try {
          const response = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`);
          this.genres = response.data.genres;
        } catch (error) {
          console.error(error);
        }
      },
    },
    created() {
      this.fetchGenres();
    },
  };
  </script>
  
  <style scoped>
.content {
  margin-top: 133px;
}

</style>

  