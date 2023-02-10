import { useMainStore } from "~~/store/main"

export default defineNuxtRouteMiddleware((to, from) => {
	const mainStore = useMainStore()
	console
	if (!mainStore.connected) {
		return navigateTo('/login')
	}
})