<template>
<!-- This is the Back button which calls the goBack function in order to go to the previous page -->
    <button @click="goBack()">Back</button>
<!-- As the user is in a new component with no info about their search term, I added this to show them what did they search for -->
    <div class="searchFor">Search for: {{ $route.params.query }}</div>
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
    <div class="pages">
        <div v-show="totalResults>10">
            <button @click="pagination(1), pageNumber = 1" :class="pageNumber == 1?'active':''">1</button>
        </div>
        <div v-show="totalResults>10">
            <button @click="pagination(2), pageNumber = 2"  :class="pageNumber == 2?'active':''">2</button>
        </div>
        <div v-show="totalResults>20">
            <button @click="pagination(3), pageNumber = 3" :class="pageNumber == 3?'active':''">3</button>
        </div>
        <div v-show="totalResults>30">
            <button @click="pagination(4), pageNumber = 4" :class="pageNumber == 4?'active':''">4</button>
        </div>
        <div v-show="totalResults>40">
            <button @click="pagination(5), pageNumber = 5" :class="pageNumber == 5?'active':''">5</button>
        </div>
    </div>
</template>

<script>
import { ref,onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
import env from '@/env.js'

export default {
    methods: {
        goBack() {
            this.$router.go(-1)
        }
    },
    setup () {
        const search = ref("")
        const movies = ref([])
        const movie = ref({})
        const route = useRoute()
        let pageNumber = 1
        let totalResults = ref()

// This is the function that fetches the data from the API and renders it to the screen
        onBeforeMount(() => {
            fetch(`http://www.omdbapi.com/?apikey=${env.apikey}&s=${route.params.query}`)
                .then(response => response.json())
                .then(data => {
                    movies.value = data.Search
                    // console.log(data.Search)
                    // console.log(data.totalResults)
                    // console.log(pageNumber)
                    totalResults.value = data.totalResults
                })        
// I have added the catch clause just in case but this API does not use any errors
                .catch(err => console.log(err.message))
        })
//I have added this function to add pagination to the page
        const pagination = (pageNumber) => {
            fetch(`http://www.omdbapi.com/?apikey=${env.apikey}&s=${route.params.query}&page=${pageNumber}`)
                .then(response => response.json())
                .then(data => {
                    movies.value = data.Search
                    // console.log(data.Search)
                    // console.log(data.totalResults)
                    // console.log(pageNumber)
                    // totalResults = data.totalResults
                })        
        }
        return {
            search,
            movies,
            movie,
            route,
            pagination,
            pageNumber,
            totalResults
        }
    }
}

</script>

<style lang="scss">
main {
    padding: 16px 35px;
    max-width: 1250px;
    margin-left: auto;
    margin-right: auto;
}

button {
    background-color: #42b883;
    padding: 13px;
    border-radius: 8px;
    color: #fff;
    font-size: 15px;
    text-transform: uppercase;
    transition: 0.4s;
    border: none;
    float: right;
    @media only screen and (min-width: 600px) {
}
}

button:hover {
    cursor: pointer;
    background-color: darken($color: #42b883, $amount: 10);
}

.searchFor {
    background-color: #2c3d4e;
    color: #fff;
    font-size: 15px;
    padding: 10px 16px;
    //   margin-top: 20px;
    margin-bottom: 15px;
    text-align: center;
    border-radius: 10px;
    @media only screen and (min-width: 600px) {
        font-size: 20px;
}
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

.pages {
    margin-top: 50px;
    display: flex;
    justify-content: center;
    color: white;
    padding: 8px;
    margin: 2px;
    border-radius: 3px;
    font-size: 1em;

}

.page {
    margin: 10px;
}

.pages button {
    padding: 8px;
    margin: 2px;
    border-radius: 3px;
    font-size: 1em;

}

.active {
    background-color: #35495E !important;
}

.active:hover {
    background-color: #35495E;
    cursor: context-menu;
}

</style>