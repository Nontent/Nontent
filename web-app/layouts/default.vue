<template>
	<v-app dark>
		<NavBar />
		<v-main>
			<v-container>
				<Nuxt />
			</v-container>
		</v-main>
	</v-app>
</template>

<script>
import NavBar from '../components/NavBar.vue'
export default {
	name: 'DefaultLayout',
	components: { NavBar },
	mounted() {
		this.$store.subscribe((mutation, state) => {
			localStorage.setItem('store', JSON.stringify(state))
		})
	},
	beforeCreate() {
		this.$store.commit('initialiseStore')
	},
}
</script>
