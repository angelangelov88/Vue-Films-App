<template>
  <div class="home">
    <div class="feature-card">
<!-- I have added a paragraph to inform the user that they have to type a film name -->
      <p id="title" v-if="movies">Please type a film name</p>
<!-- I have added a v-if clause to show error message if the movies object is empty -->
      <p id="error" v-else>Please make sure you type the film name correctly</p>
    </div>
<!-- I have created a form for the search and on submit it calls the SearchMovies function -->
    <form @submit.prevent="SearchMovies()" class="search-box">
      <input type="text" placeholder="What are you looking for?" v-model="search" />
      <input type="submit" value="Search" id="submit-btn" />
    </form>
<!-- This is the movies container with the results from the search -->
   <div class="movies-list">
     <div class="movie" v-for="movie in movies" :key="movie.imdbID">
<!-- I have added a route to the film details page -->
       <router-link :to="'/movie/' + movie.imdbID" class="movie-link">
<!-- I have added the movie title, year, poster and type as part of its card -->
          <div class="product-image">
            <img v-if="movie.Poster == 'N/A'" src="https://www.movienewz.com/img/films/poster-holder.jpg" alt="Movie poster" />
            <img v-else :src="movie.Poster" alt="Movie poster" />
            <div class="type">{{ movie.Type }}</div>
          </div>
          <div class="detail">
            <p class="year">{{ movie.Year }}</p>
            <h3>{{ movie.Title}}</h3>
          </div>
       </router-link>
     </div>
   </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import env from '@/env.js'

export default {
  setup () {
    const search = ref("")
    const movies = ref([])

// This is the function that fetched the data from the API and returns it
    const SearchMovies = () => {
      if (search.value != "") {
        fetch(`http://www.omdbapi.com/?apikey=${env.apikey}&s=${search.value}`)
          .then(response => response.json())
          .then(data => {
             movies.value = data.Search
             search.value = ""
})        
// I have added the catch clause just in case but this API does not use any errors
          .catch(err => console.log(err.message))
}
}

    return {
      search,
      movies,
      SearchMovies, 
    }
  }
}
</script>

<style lang="scss">
  .home {
    .feature-card {
      position: relative;

      .featured-img {
        display: block;
        width: 100%;
        height: 300px;
        object-fit: cover;

        position: relative;
        z-index: 0;
      
}
    #title {
      background-color: #2c3d4e;
      color: #fff;
      font-size: 15px;
      padding: 10px 16px;
      margin-top: 20px;
      margin-bottom: 15px;
      text-align: center;
      @media only screen and (min-width: 600px) {
        font-size: 20px;
}
}

    #error {
      color: red;
      font-size: 20px;
      padding: 10px 16px;
      margin-top: 20px;
      margin-bottom: 15px;
      text-align: center;
    }

    .detail {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.6);
      padding: 16px;
      z-index: 1;

      h3 {
        color: #fff;
        margin-bottom: 16px;
}

      p {
        color: #fff;
}
}
}

  .search-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 16px;

      input {
        display: block;
        appearance: none;
        border: none;
        outline: none;
        background: none;

          &[type="text"] {
            width: 100%;
            color: #fff;
            background-color: #496583;
            font-size: 15px;
            padding: 10px 16px;
            border-radius: 8px;
            margin-bottom: 15px;
            transition: 0.4s;
            max-width: 700px;
            @media only screen and (min-width: 600px) {
              font-size: 20px;
}
            &::placeholder {
              color: #f3f3f3;
}
            &:focus {
              box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2);
}
}
              &[type="submit"] {
                width: 100%;
                max-width: 200px;
                background-color: #42b883;
                padding: 13px;
                border-radius: 8px;
                color: #fff;
                font-size: 15px;
                text-transform: uppercase;
                transition: 0.4s;
                @media only screen and (min-width: 600px) {
                  padding: 16px;
                  font-size: 20px;
                  max-width: 300px;
}
                  &:active {
                    background-color: #3b8070;
}
}
}
}

  #submit-btn:hover {
    cursor: pointer;
    background-color: darken($color: #42b883, $amount: 10);
  }
  
  .movies-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    max-width: 1250px;
    margin-left: auto;
    margin-right: auto;
      @media only screen and (min-width: 600px) {
        padding: 0 50px 0 50px;
}
    .movie {
       max-width: 214px;
      // flex: 1 1 50%;
      padding: 16px 8px;
      @media only screen and (min-width: 600px) {
        flex:none;
        min-width: 214px;
}

      .movie-link {
        display: flex;
        flex-direction: column;
        height: 100%;

        .product-image {
          position: relative;
          display: block;

          img{
              display: block;
              width: 100%;
              height: 275px;
              object-fit: cover;
              border-radius: 10px 10px 0 0;
            @media only screen and (min-width: 1000px) {

}
}
          .type {
            position: absolute;
            padding: 8px 16px;
            background-color: #42b883;
            color: #fff;
            top: 16px;
            right: 0;
            text-transform: capitalize;
}
}

      .detail {
        background-color: #496583;
        padding: 16px 8px;
        flex: 1 1 100%;
        border-radius: 0 0 8px 8px;
      
        .year {
          color: #aaa;
          font-size: 14px;
}

        h3{
          color: #fff;
          font-weight: 600;
          font-size: 18px;
}
}

}
}
      .movie:hover .detail {
        background-color: darken($color: #496583, $amount: 20) ;
}
}
}

</style>
