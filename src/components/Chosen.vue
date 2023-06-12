<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="bg-slate-700">
    <div class="mt-32 p-6 movies-container">
      <!-- <h2 class="text-3xl text-gray-100 font-bold mb-4">Movies</h2> -->

      <div v-if="loading" class="text-gray-200 text-lg">Loading...</div>

      <div v-else>
        <div v-if="error" class="text-red-500 text-lg">{{ error }}</div>

        <div v-else-if="Object.keys(movies).length > 0">
          <div class=" flex flex-col gap-12">
            <div class="language-row" v-for="(languageMovies, language) in movies" :key="language">
              <h3 class="ml-4 text-2xl text-gray-200 font-semibold mb-2">{{ getLanguageName(language) }} Movies:</h3>
              <div class="content p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
                <div class="flex flex-col justify-center items-center bg-slate-800 rounded-xl hover:opacity-70 transition-all ease-in-out duration-400"
                  v-for="movie in languageMovies" :key="movie.id" @click="showDetails(movie.id)">
                  <router-link :to="{ name: 'moviebook', params: { id: movie.id } }"><div class="movie-poster">
                    <img :src="getMoviePosterURL(movie.poster_path)" :alt="movie.title"
                      class="rounded-lg h-max hover:shadow-xl" />
                  </div></router-link>
                  <div class="movie-details text-center text-white flex flex-col items-center justify-center">
                    <h4 class="text-xl font-semibold mb-1">{{ movie.title }}</h4>
                    <p>IMDb Rating: {{ movie.vote_average }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-else>
          <p class="text-lg">No movies found.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    languages: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      movies: {},
      loading: true,
      error: null,
      apiKey: '1dc8f67cb5ee2d801ef91ff145b4c3a9',
      languageList: {
        bn: 'Bengali',
        hi: 'Hindi',
        en: 'English'
        // Add more languages and their codes here
      }
    };
  },
  mounted() {
    this.fetchMovies();
  },
  methods: {
    async fetchMovies() {
      try {
        const languageMoviesList = {};

        for (const language of this.languages) {
          const currentDate = new Date();
          const twoMonthsAgo = new Date(currentDate.getFullYear(), currentDate.getMonth() - 2, currentDate.getDate());
          const formattedDate = twoMonthsAgo.toISOString().split('T')[0];

          const response = await axios.get('https://api.themoviedb.org/3/discover/movie', {
            params: {
              api_key: this.apiKey,
              language: 'en-US',
              sort_by: 'popularity.desc',
              include_adult: true,
              include_video: true,
              page: 1,
              with_original_language: language,
              'primary_release_date.gte': formattedDate
            }
          });

          const languageMovies = response.data.results.slice(0, 5);
          languageMoviesList[language] = languageMovies;
        }

        this.movies = languageMoviesList;
        this.loading = false;
      } catch (error) {
        this.error = 'Failed to fetch movies.';
        console.error('Error:', error);
        this.loading = false;
      }
    },
    getMoviePosterURL(posterPath) {
      if (posterPath) {
        return `https://image.tmdb.org/t/p/w780${posterPath}`;
      } else {
        return 'https://via.placeholder.com/w780?text=No+Poster';
      }
    },
    showDetails(movieId) {
      // Implement your logic to show movie details based on the movie ID
      console.log(`Showing details for movie with ID: ${movieId}`);
    },
    getLanguageName(languageCode) {
      return this.languageList[languageCode] || 'Unknown';
    }
  }
};
</script>
