// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: ['@nuxtjs/tailwindcss','nuxt-icon', '@pinia/nuxt'],
	css: ['~/assets/css/main.css'],
	router: {
		options: {
			linkActiveClass: 'active',
			linkExactActiveClass: 'exact-active',
		},
	},
})
