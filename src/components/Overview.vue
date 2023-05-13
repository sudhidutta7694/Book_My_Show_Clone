<!-- eslint-disable vue/valid-v-for -->
<!-- eslint-disable vue/multi-word-component-names -->

<template>
    <div class="bg-slate-800 flex flex-col justify-center">
        <div class="mt-5 content container mx-auto flex border-b border-gray-600 pb-4 w-[60vw]">
            <img :src="getPosterUrl(640146)" alt="Poster" class="h-[60vh] rounded-lg shadow-xl" />
            <div class="ml-5">
                <h1 class="text-4xl font-semibold text-gray-300">{{ getMovieTitle(movieId) }}</h1>
                <span class="text-gray-500 text-sm">{{getMovieDetails(movieId).votePercentage}}% | {{getMovieDetails(movieId).releaseDate}} | {{getMovieDetails(movieId).genre}}</span>
                <p class="mt-5 text-gray-400">
                    {{ getMovieOverview(movieId) }}
                </p>
                <div v-if="showPlayer" class="trailer-player">
                  <div class="player-wrapper rounded-2xl hover:opacity-75 hover:shadow-2xl">
                    <iframe :src="videoUrl" frameborder="0" allowfullscreen></iframe>
                    <div class="bg-black p-2"><button class="remove-player w-6 rounded-7xl font-bold p-2 mx-6" @click="removePlayer">X</button></div>
                  </div>
                </div>                
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
            <div v-for="(image, index) in castImages" :key="index" class="flex flex-col text-center">
              <img :src="getImageUrl(image.image)" alt="Actor" class="rounded-t-xl shadow:lg hover:opacity-75 transition ease-in"/>
              <p class="text-gray-300 bg-slate-500 font-semibold">{{ image.role }} :</p>
              <p class="text-gray-300 bg-slate-500 rounded-b-xl">{{ image.name }}</p>
            </div>
        </div>
        <div class="px-5 py-4">
          <h1 class="text-3xl font-bold text-gray-300">Images</h1>
        </div>
        <div class="border-b border-gray-500 p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            <div v-for="(image, index) in movieImages" :key="index">
              <img :src="getImageUrl(image)" alt="Image" class="rounded-xl shadow:lg hover:opacity-75 transition ease-in"/>
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
      movieImages: [],
      showPlayer: false,
      videoUrl: '',
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
created() {
  const tag = document.createElement('script');
  tag.src = 'https://www.youtube.com/iframe_api';
  const firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
},
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
          role: member.character,
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
    playTrailer(id) {
      fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=1dc8f67cb5ee2d801ef91ff145b4c3a9`)
        .then((response) => response.json())
        .then((data) => {
          const trailer = data.results.find((video) => video.type === 'Trailer');
          if (trailer) {
            const videoKey = trailer.key;
            this.videoUrl = `https://www.youtube.com/embed/${videoKey}`;
            this.showPlayer = true;
          } else {
            console.log('No trailer available for this movie.');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    },
    removePlayer() {
      this.showPlayer = false;
      this.videoUrl = '';
    },
  }
}
</script>

<style scoped>
.content {
  padding-top: 140px;
}

.trailer-player {
  position: relative;
  width: 100%;
  padding: 2vw 8vw;
}

.player-wrapper {
  position: relative;
  padding-top: 56.25%; /* 16:9 */
}

.player-wrapper iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.remove-player {
  position: absolute;
  top: 5px;
  right: 5px;
  background: transparent;
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
}
</style>