<!-- eslint-disable vue/multi-word-component-names -->

<template>
  <div class="bg-slate-800 flex flex-col justify-center items-center flex-center">
    <div class="w-[60vw]"> {{ playTrailer(movieId) }}
    <div class="trailer-player rounded-2xl flex items-center justify-center hover:shadow-2xl">
      <div class="player-wrapper rounded-xl ">
        <iframe :src="videoUrl" frameborder="0" ref="videoPlayer"></iframe>
      </div>
    </div>
  </div>

    <div class="mt-5 container mx-auto flex border-b border-gray-600 pb-4 mx-30 items-center justify-center">
      <div class="ml-5 flex flex-col items-center justify-center gap-10">
        <div class="flex justify-between mt-6 w-[62vw]">
          <div class="flex flex-col">
            <p class="text-4xl font-bold text-gray-300">{{ getMovieTitle(movieId) }}</p>
            <span class="text-gray-500 text-md">{{ getMovieDetails(movieId).votePercentage }}% | {{ getMovieDetails(movieId).releaseDate }} | {{ getMovieDetails(movieId).genre }}</span>
          </div>
          <a href="#" class="h-[6vh] rounded bg-yellow-600 px-5 py-4 flex justify-center items-center text-black">
          <span class="ml-3">Favourite</span>
          </a>
        </div>
        
        <p class="mt-5 text-gray-400 text-xl text-center w-[70vw]">
          {{ getMovieOverview(movieId) }}
        </p>
        <div class="mt-5 flex gap-3">
        </div>
      </div>
    </div>
    <div class="mt-12 mb-11 px-5 py-4 w-[80vw] text-center">
      <h1 class="font-bold text-gray-300 text-4xl">Cast</h1>
    </div>
    <div class="border-b border-gray-500 p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
      <div v-for="(image, index) in castImages" :key="index" class="flex flex-col text-center">
        <img :src="getImageUrl(image.image)" alt="Actor" class="rounded-t-xl shadow:lg hover:opacity-75 transition ease-in" />
        <p class="text-gray-300 bg-slate-500 font-semibold">{{ image.role }} :</p>
        <p class="text-gray-300 bg-slate-500 rounded-b-xl">{{ image.name }}</p>
      </div>
    </div>
    <div class="px-5 py-4 ">
      <h1 class="mt-12 mb-11 text-4xl font-bold text-gray-300">Images</h1>
    </div>
    <div class="w-[80vw] border-b border-gray-500 p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      <div v-for="(image, index) in movieImages" :key="index">
        <img :src="getImageUrl(image)" alt="Image" class="rounded-xl shadow:lg hover:opacity-75 transition ease-in" />
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
      Player: true,
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
        this.playTrailer(this.movieId);
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
      const videoPlayer = this.$refs.videoPlayer;
      if (trailer) {
        const videoKey = trailer.key;
        this.videoUrl = `https://www.youtube.com/embed/${videoKey}?autoplay=1&mute=1&loop=1&controls=1&modestbranding=1`;
        this.showPlayer = true;

        videoPlayer.onload = () => {
          const playerWindow = videoPlayer.contentWindow;
          if (playerWindow && playerWindow.postMessage) {
            playerWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
            playerWindow.postMessage('{"event":"command","func":"mute","args":""}', '*');
          }
        };
      } else {
        console.log('No trailer available for this movie.');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
},
  }
}
</script>

<style scoped>

.content {
  margin-top: 140px;
}
.trailer-player {
  margin-top: 160px;
  position: relative;
  padding-top: 56.25%; /* 16:9 aspect ratio */
  overflow: hidden;
}

.player-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.player-wrapper iframe {
  width: 100%;
  height: 100%;
}
</style>
