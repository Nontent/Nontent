// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	ssr: false,
	modules: ['@nuxtjs/tailwindcss','nuxt-icon', '@pinia/nuxt'],
	css: ['~/assets/css/main.css'],
	router: {
		options: {
			linkActiveClass: 'active',
			linkExactActiveClass: 'exact-active',
		},
	},
})
