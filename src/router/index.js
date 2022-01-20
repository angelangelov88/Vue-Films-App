import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import MovieDetail from '../views/MovieDetail.vue'
import SearchQuery from '../views/SearchQuery.vue'


const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home
	},
	{
		path: '/search-query/:query',
		name: 'Search',
		component: SearchQuery
	},
	{
		path: '/movie/:id',
		name: 'Movie Detail',
		component: MovieDetail
	}
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router
