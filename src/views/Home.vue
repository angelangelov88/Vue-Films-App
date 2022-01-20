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
			<input type="submit" value="search" id="submit-btn" />
        </form>
	</div>
</template>

<script>
import { ref } from 'vue'
import env from '@/env.js'
import routes from '../router/index'

export default {
  setup () {
    const search = ref("")
    const movies = ref([])

// This is the function that fetches the data from the API and routes to the SearchQuery component
	const SearchMovies = () => {
//Here I check that the user hsa typed something in the input field and then fetch
		if (search.value != "") {
			fetch(`http://www.omdbapi.com/?apikey=${env.apikey}&s=${search.value}`)
				.then(response => response.json())
				.then(data => {
					movies.value = data.Search
					let query = search.value
//I added this if statement to check if the movies array has any value and if it does it pushes the route. If it does not have a value I show the error message to the user - line 7
					if (movies.value) {
						routes.push({ path: '/search-query/' + query })
						}
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
		border-radius: 10px;
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
}

</style>
