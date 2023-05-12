<!-- eslint-disable vue/valid-v-for -->
<!-- eslint-disable vue/multi-word-component-names -->

<template>
    <div class="bg-slate-600">
        <div class="content container mx-auto flex border-b border-gray-600 pb-4">
            <img :src="getPosterUrl(640146)" alt="Poster" class="w-64" />
            <div class="ml-5">
                <h1 class="text-4xl font-semibold">{{ getMovieTitle(640146) }}</h1>
                <!-- <span class="text-gray-500 text-sm">{{getMovieDetails(758323).votePercentage}}% | {{getMovieDetails(758323).releaseDate}} | {{getMovieDetails(758323).genre}}</span> -->
                <p class="mt-5">
                    {{ getMovieOverview(640146) }}
                </p>
                <div class="mt-5">
                    <span class="mt-5 font-semibold">Featured Cast</span>  
                    <div class="flex gap-4">
                        <div class="flex flex-col mt-5">
                            <span>{{ getWriter(640146) }}</span>
                            <span class="text-gray-500">Writer</span>
                        </div>
                        <div class="flex flex-col mt-5">
                            <span>{{ getExecutiveProducer(640146) }}</span>
                            <span class="text-gray-500">Executive Producer</span>
                        </div>
                    </div>              
                </div>
                <div class="mt-5 flex gap-3">
                    <a href="#" class="rounded bg-yellow-600 px-5 py-4 inline-flex text-black">
                        <span class="ml-3">Play Trailer</span> 
                    </a>
                    <a href="#" class="rounded bg-yellow-600 px-5 py-4 inline-flex text-black">
                        <span class="ml-3">Favourite</span> 
                    </a>
                </div>
            </div>
        </div>
        <div class="px-5 py-4">
            <h1 class="text-3xl font-bold">Cast</h1>
        </div>
        <div class="border-b border-gray-500 p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            <div v-for="(image, index) in castImages" :key="index" class="flex flex-col bg-slate-500 rounded-xl text-center">
              <img :src="getImageUrl(image)" alt="Actor" />
              <p class="text-gray-300">Actor</p>
            </div>
        </div>
        <div class="px-5 py-4">
            <h1 class="text-3xl font-bold">Images</h1>
        </div>
        <div class="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            <div class="flex flex-col bg-slate-500 rounded-xl text-center"><img src="#" alt="Actor" /><p class="text-gray-300">Actor</p></div>
        </div>
    </div>

</template>

<script>
export default {
  data() {
    return {
        movieId: 640146,
        movies: [],
    // movie: null,
    castImages: [] 
    }
  },
  mounted() {
    fetch(`https://api.themoviedb.org/3/movie/640146?api_key=1dc8f67cb5ee2d801ef91ff145b4c3a9&language=en-US`)
    .then(response => response.json())
    .then(data => {
        this.movies = data;
    console.log(data); // Display the response in the console
  })
  .catch(error => {
    console.error('Error:', error);
  });
}
,
methods: {
  getPosterUrl(movieId) {
    const movie = this.movies;
    if (movie && movie.poster_path) {
      return `https://image.tmdb.org/t/p/w780${movie.poster_path}`;
    }
    return 'https://via.placeholder.com/500x750.png?text=No+Poster+Available';
  },
  getMovieDetails(movieId) {
    const movie = this.movies;
    if (movie) {
      const votePercentage = movie.vote_average * 10;
      const releaseDate = movie.release_date;
      const genre = movie.genres.map(genre => genre.name).join(', ');
      return {
        votePercentage,
        releaseDate,
        genre
      };
    }
    return {
      votePercentage: '',
      releaseDate: '',
      genre: ''
    };
  },
  getMovieTitle(movieId) {
    const movie = this.movies;
    return movie ? movie.original_title : '';
  },
  getMovieOverview(movieId) {
    const movie = this.movies;
    return movie ? movie.overview : '';
  },
  getWriter(movieId) {
    const movie = this.movies;
    if (movie && movie.writer) {
      return movie.writer;
    }
    return '';
  },
  getExecutiveProducer(movieId) {
    const movie = this.movies;
    if (movie && movie.executive_producer) {
      return movie.executive_producer;
    }
    return '';
  }
},
getCastImages(movieId) {
  fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=1dc8f67cb5ee2d801ef91ff145b4c3a9`
  )
    .then((response) => response.json())
    .then((data) => {
      const cast = data.cast;
      const castImages = cast.map((member) => member.profile_path);
      // Do something with the castImages array (e.g., store it in a data property)
    })
    .catch((error) => {
      console.error('Error:', error);
    });
},
getImageUrl(imagePath) {
    if (imagePath) {
      return `https://image.tmdb.org/t/p/w780${imagePath}`;
    }
    return 'https://via.placeholder.com/500x750.png?text=No+Image+Available';
  }

}
</script>

<style scoped>
/* Add padding to body equal to header height */
.content {
  padding-top: 140px; /* Replace with actual header height */
}
</style>