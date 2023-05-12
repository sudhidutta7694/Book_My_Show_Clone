<!-- eslint-disable vue/valid-v-for -->
<!-- eslint-disable vue/multi-word-component-names -->

<template>
    <div class="bg-slate-800">
        <div class="content container mx-auto flex border-b border-gray-600 pb-4">
            <img :src="getPosterUrl(640146)" alt="Poster" class="w-[20vw] rounded-lg shadow-xl" />
            <div class="ml-5">
                <h1 class="text-4xl font-semibold text-gray-300">{{ getMovieTitle(movieId) }}</h1>
                <span class="text-gray-500 text-sm">{{getMovieDetails(movieId).votePercentage}}% | {{getMovieDetails(movieId).releaseDate}} | {{getMovieDetails(movieId).genre}}</span>
                <p class="mt-5 text-gray-400">
                    {{ getMovieOverview(movieId) }}
                </p>
                <div class="mt-5">
                    <span class="mt-5 font-semibold text-gray-500">Featured Cast</span>  
                    <div class="flex gap-4">
                        <div class="flex flex-col mt-5">
                            <span>{{ getWriter(movieId) }}</span>
                            <span class="text-gray-500">Writer</span>
                        </div>
                        <div class="flex flex-col mt-5">
                            <span>{{ getExecutiveProducer(movieId) }}</span>
                            <span class="text-gray-500">Executive Producer</span>
                        </div>
                    </div>              
                </div>
                <div class="mt-5 flex gap-3">
                    <a href="#" class="rounded bg-yellow-600 px-5 py-4 inline-flex text-black" @click="playTrailer(movieId)">
                        <span class="ml-3">Play Trailer</span> 
                    </a>
                    <a href="#" class="rounded bg-yellow-600 px-5 py-4 inline-flex text-black">
                        <span class="ml-3">Favourite</span> 
                    </a>
                </div>
            </div>
        </div>
        <div class="px-5 py-4">
            <h1 class="text-3xl font-bold text-gray-300">Cast</h1>
        </div>
        <div class="border-b border-gray-500 p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            <div v-for="(image, index) in castImages" :key="index" class="flex flex-col bg-slate-500 rounded-xl text-center">
              <img :src="getImageUrl(image.image)" alt="Actor" />
              <p class="text-gray-300">{{ image.name }}</p>
            </div>
        </div>
        <div class="px-5 py-4">
          <h1 class="text-3xl font-bold text-gray-300">Images</h1>
        </div>
        <div class="border-b border-gray-500 p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            <div v-for="(image, index) in movieImages" :key="index" class="flex flex-col bg-slate-500 rounded-xl text-center">
              <img :src="getImageUrl(image)" alt="Image" />
              <p class="text-gray-300">Image</p>
            </div>
        </div>
    </div>

</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      movieId: null,
      movies: [],
      castImages: [],
      movieImages: []
    };
  },
  mounted() {
    this.movieId = this.id;
    fetch(
      `https://api.themoviedb.org/3/movie/${this.movieId}?api_key=1dc8f67cb5ee2d801ef91ff145b4c3a9&language=en-US`
    )
      .then((response) => response.json())
      .then((data) => {
        this.movies = data;
        console.log(data); // Display the response in the console
        const movieDetails = this.getMovieDetails(this.movieId);
        console.log(movieDetails);
        this.getMovieImages(this.movieId); // Fetch cast images
        this.getWriter(this.movieId); // Fetch cast images
        this.getExecutiveProducer(this.movieId); // Fetch cast images
        this.getCastImages(this.movieId); // Fetch cast images
      })
      .catch((error) => {
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
  if (movie && movie.genres) { // Add a check for the existence of genres property
    const votePercentage = (movie.vote_average * 10).toFixed(2);
    const releaseDate = movie.release_date;
    const genre = movie.genres.map((genre) => genre.name).join(', ');
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
      if (movie && movie.credits && movie.credits.crew) {
        const writer = movie.credits.crew.find(
          (member) => member.job === 'Writer'
        );
        return writer ? writer.name : '';
      }
      return '';
    },

    getExecutiveProducer(movieId) {
      const movie = this.movies;
      if (movie && movie.credits && movie.credits.crew) {
        const executiveProducer = movie.credits.crew.find(
          (member) => member.job === 'Executive Producer'
        );
        return executiveProducer ? executiveProducer.name : '';
      }
      return '';
    },
    getCastImages(movieId) {
  fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=1dc8f67cb5ee2d801ef91ff145b4c3a9`
  )
    .then((response) => response.json())
    .then((data) => {
      const cast = data.cast;
      this.castImages = cast
        .filter((member) => member.profile_path !== null)
        .map((member) => ({
          name: member.name,
          image: `https://image.tmdb.org/t/p/w200/${member.profile_path}`
        }));
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

,
    getMovieImages(movieId) {
    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/images?api_key=1dc8f67cb5ee2d801ef91ff145b4c3a9`
    )
      .then((response) => response.json())
      .then((data) => {
        const images = data.backdrops.map((image) => image.file_path);
        // Store the images in the movieImages array
        this.movieImages = images;
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
    },
    playTrailer(movieId) {
    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=1dc8f67cb5ee2d801ef91ff145b4c3a9`
    )
      .then((response) => response.json())
      .then((data) => {
        const trailer = data.results.find(
          (video) => video.type === 'Trailer'
        );

        if (trailer) {
          const videoKey = trailer.key;
          window.open(`https://www.youtube.com/watch?v=${videoKey}`);
        } else {
          console.log('No trailer available for this movie.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  }
}
</script>

<style scoped>
.content {
  padding-top: 140px;
}

.bg-slate-600 {
  background-color: #374151;
}

.container {
  width: 100%;
  max-width: 1200px;
}

.mx-auto {
  margin-left: auto;
  margin-right: auto;
}

.border-b {
  border-bottom-width: 1px;
  border-bottom-style: solid;
}

.border-gray-600 {
  border-color: #4b5563;
}

.pb-4 {
  padding-bottom: 1rem;
}

.w-64 {
  width: 16rem;
}

.ml-5 {
  margin-left: 1.25rem;
}

.text-4xl {
  font-size: 2.25rem;
  line-height: 2.5rem;
}

.font-semibold {
  font-weight: 600;
}

.mt-5 {
  margin-top: 1.25rem;
}

.text-gray-500 {
  color: #9ca3af;
}

.text-sm {
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.mt-5 {
  margin-top: 1.25rem;
}

.font-semibold {
  font-weight: 600;
}

.rounded {
  border-radius: 0.25rem;
}

.bg-yellow-600 {
  background-color: #f59e0b;
}

.px-5 {
  padding-left: 1.25rem;
  padding-right: 1.25rem;
}

.py-4 {
  padding-top: 1rem;
  padding-bottom: 1rem;
}

.text-3xl {
  font-size: 1.875rem;
  line-height: 2.25rem;
}

.font-bold {
  font-weight: 700;
}

.border-gray-500 {
  border-color: #6b7280;
}

.grid {
  display: grid;
}

.grid-cols-1 {
  grid-template-columns: repeat(1, minmax(0, 1fr));
}

.sm\:grid-cols-2 {
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.md\:grid-cols-3 {
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.lg\:grid-cols-4 {
  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

.xl\:grid-cols-5 {
  @media (min-width: 1280px) {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }
}

.gap-4 {
  gap: 1rem;
}

.flex {
  display: flex;
}

.flex-col {
  flex-direction: column;
}

.justify-between {
  justify-content: space-between;
}

.text-center {
  text-align: center;
}

.text-gray-300 {
  color: #d1d5db;
}

.inline-flex {
  display: inline-flex;
}

.text-black {
  color: #000;
}

.mr-3 {
  margin-right: 0.75rem;
}

.p-4 {
  padding: 1rem;
}

.text-center {
  text-align: center;
}

.text-gray-300 {
  color: #d1d5db;
}

.bg-slate-500 {
  background-color: #4a5568;
}

.rounded-full {
  border-radius: 9999px;
}

.h-24 {
  height: 6rem;
}

.object-cover {
  object-fit: cover;
}

.overflow-hidden {
  overflow: hidden;
}

.transition {
  transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform;
  transition-duration: 150ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: 0ms;
}

.hover\:bg-gray-700:hover {
  background-color: #4b5563;
}

.hover\:text-gray-400:hover {
  color: #cbd5e0;
}

.hover\:scale-105:hover {
  transform: scale(1.05);
}

.hover\:scale-110:hover {
  transform: scale(1.1);
}

.hover\:scale-125:hover {
  transform: scale(1.25);
}

@media (min-width: 640px) {
  .sm\:rounded-lg {
    border-radius: 0.5rem;
  }
}

@media (min-width: 768px) {
  .md\:rounded-lg {
    border-radius: 0.5rem;
  }
}

@media (min-width: 1024px) {
  .lg\:rounded-lg {
    border-radius: 0.5rem;
  }
}

@media (min-width: 1280px) {
  .xl\:rounded-lg {
    border-radius: 0.5rem;
  }
}
</style>

