<template>
	<div class="movie-detail">
<!-- This is the Back button which calls the goBack function in order to go to the previous page -->
		<button @click="goBack()">Back</button>
<!-- I render the data from the API to the screen here -->
		<div>
			<h1>{{ movie.Title }}</h1>
			<p class="subTitle">{{ movie.Year }}, {{ movie.Genre}}, {{ movie.Runtime}}</p>
<!-- I decided to add v-if clause here to make sure that either the poster is shown or an image saying that no poster is available is shown -->
			<img v-if="movie.Poster == 'N/A'" src="https://www.movienewz.com/img/films/poster-holder.jpg" alt="Movie poster" class="featured-img" />
			<img v-else :src="movie.Poster" alt="Movie poster" class="featured-img" />
		</div>
		<div>
			<h3>Film Info</h3>
			<p>Staring: {{ movie.Actors }}</p>
			<br>
			<p>Director: {{ movie.Director }}</p>
			<br>
			<p>Writer: {{ movie.Writer }}</p>
			<br>
			<p>Genre: {{ movie.Genre }}</p>
			<br>
<!-- I have added v-if in order to ensure that the rating is shown only if it exists. The reason for that is that the review data comes as an object and I used to get errors when no review is available. The reason being that I have to select the first item of the array -->
			<p v-if="movie && movie.Ratings && movie.Ratings[0]">IMDb Review: {{ movie.Ratings[0].Value }}</p>
			<p v-else>IMDb Review: N/A</p>
			<br>
			<p>BoxOffice: {{ movie.BoxOffice }}</p>
			<br>
			<p>Awards: {{ movie.Awards }}</p>
			<br>
			<p>Country: {{ movie.Country }}</p>
			<br>
			<p>Release date: {{ movie.Released }}</p>
			<br>
			<p>Film duration: {{ movie.Runtime }}</p>
		</div>
		<div class="plot">
			<h3>Plot</h3>
			<p>{{ movie.Plot }}</p>
		</div>
	</div>
</template>

<script>
import { ref, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
import env from '@/env.js'

export default {
	methods: {
		goBack() {
			this.$router.go(-1)
		}
	},
	setup(){
		const movie = ref({})
		const route = useRoute()

// This is the function that fetches the data from the API. It is to be called before the page is loaded
		onBeforeMount(() => {
			fetch(`http://www.omdbapi.com/?apikey=${env.apikey}&i=${route.params.id}&plot=full`)
				.then(response => response.json())
				.then(data => {
					movie.value = data
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
	padding: 16px 35px;
	max-width: 1250px;
	margin-left: auto;
	margin-right: auto;

	button ,
	.prevBtn {
		background-color: #42b883;
		padding: 13px;
		border-radius: 8px;
		color: #fff;
		font-size: 15px;
		text-transform: uppercase;
		transition: 0.4s;
		border: none;
		float: right;
}

	button:hover,
	.prevBtn:hover {
		cursor: pointer;
		background-color: darken($color: #42b883, $amount: 10);
}

	h2 {
		color: #fff;
		font-size: 28px;
		font-weight: 600;
		margin-bottom: 16px;
}

	h3 {
		color: white;
		background-color:  #42b883;
		border-radius: 10px;
		padding: 10px;
		margin: 30px -30px 20px -30px;
}

	.subTitle {
		font-size: 14px;
}

	.featured-img {
		display: block;
		max-width: 90%;
		margin: 20px 0 20px 0;
		border-radius: 10px;
		box-shadow: gray 16px 5px 36px;
}

	p {
		color: #fff;
		font-size: 18px;
		line-height: 1.4;
}
}
</style>