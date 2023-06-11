<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <h1>Currently Streaming Movies</h1>
    <ul>
      <li v-for="movie in movies" :key="movie.id">
        <h2>{{ movie.title }}</h2>
        <p>Showtimes:</p>
        <ul>
          <li v-for="showtime in movie.showtimes" :key="showtime.cinema_id">
            <span>{{ showtime.start_at }}</span>
            <span>{{ showtime.cinema_name }}</span>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

const API_ENDPOINT = 'https://api.internationalshowtimes.com/v4/movies';

export default {
  data() {
    return {
      movies: [],
    };
  },
  async mounted() {
    try {
      const response = await axios.get(API_ENDPOINT, {
        params: {
          location: 'New York', // Replace with your desired location
          fields: 'id,title,showtimes',
        },
        headers: {
          'X-API-Key': 'YourAPIKeyHere', // Replace with your actual API key
        },
      });

      this.movies = response.data.movies;
    } catch (error) {
      console.error(error);
    }
  },
};
</script>

<style>
h1 {
  color: #333;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin-bottom: 20px;
}

h2 {
  margin-bottom: 5px;
}

span {
  margin-right: 10px;
}
</style>
