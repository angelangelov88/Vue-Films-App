<template>
  <div class="movie-detail">
    <h2>{{ movie.Title }}</h2>
    <p>{{ movie.Year }}</p>
    <img v-if="movie.Poster == 'N/A'" src="https://www.movienewz.com/img/films/poster-holder.jpg" alt="Movie poster" class="featured-img" />
    <img v-else :src="movie.Poster" alt="Movie poster" class="featured-img" />
    <p>Staring: {{ movie.Actors }}</p>
    <br>
    <p>Director: {{ movie.Director }}</p>
    <p>Writer: {{ movie.Writer }}</p>
    <br>
    <p>Genre: {{ movie.Genre }}</p>
    <br>
    <div>
      {{ typeof(movie.Ratings) }}
      <p v-if="typeof(movie.Ratings) != 'undefined'">IMDb Review: {{ movie.Ratings[0].Value }}</p>
      <p v-else>IMDb REVIEW: N/A</p>
    </div>
    <br>
    <p>BoxOffice: {{ movie.BoxOffice }}</p>
    <br>
    <p>Country: {{ movie.Country }}</p>
    <br>
    <p>Release date: {{ movie.Released }}</p>
    <br>
    <p>Film duration: {{ movie.Runtime }}</p>
    <br>
    <p>Plot: <br> {{ movie.Plot }}</p>
  </div>
</template>

<script>
import { ref, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
import env from '@/env.js'

export default {
  setup(){
    const movie = ref({})
    const route = useRoute()

    onBeforeMount(() => {
      fetch(`http://www.omdbapi.com/?apikey=${env.apikey}&i=${route.params.id}&plot=full`)
        .then(response => response.json())
        .then(data => {
          movie.value = data
          console.log(data)
         
          // console.log(movie.value)
          // console.log(data.Actors)
          // console.log(data.Value)
})
          .catch(err => console.log(err.message))
})

      return {
        movie,
        route
      }
    }
  }

</script>

<style lang="scss">
.movie-detail {
  padding: 16px;
  max-width: 1250px;
  margin-left: auto;
  margin-right: auto;

  h2 {
    color: #fff;
    font-size: 28px;
    font-weight: 600;
    margin-bottom: 16px;
  }

  .featured-img {
    display: block;
    max-width: 90%;
  }

  p {
    color: #fff;
    font-size: 18px;
    line-height: 1.4;
  }
}


</style>