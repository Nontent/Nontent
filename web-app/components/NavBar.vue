<template>
	<div
		v-if="$route.name != 'login' && $route.name != 'register'"
		class="flex h-16 container mx-auto border-black border-4 p-4 my-2 relative z-0 bg-white"
	>
		<!-- <div class="flex h-16 w-auto mx-2 p-4 border-4 my-2 border-black"> -->
		<span class="flex-none justify-center font-bold">
			<a href="/">nontent.</a>
		</span>
		<span class="grow"></span>
		<div class="grow-0 space-x-4">
			<div class="inline" v-for="link in links" :key="link.name">
				<nuxt-link
					:to="link.link"
					class="transition-colors ease-in-out delay-75 hover:text-amber-400 nuxt-link-active"
				>
					{{ link.name }}
				</nuxt-link>
			</div>
		</div>
		<span class="grow"></span>
		<div class="self-center flex space-x-4">
			<div class="group">
				<nuxt-link
					to="/settings"
					class="bg-amber-400 transition delay-100 ease-in-out h-10 w-10 btn-nav-bar group-hover:bg-amber-500"
				>
					<Icon
						name="mingcute:settings-1-fill"
						color="#ffffff"
						class="h-8 w-8 self-center"
					/>
				</nuxt-link>
				<div class="drop-shadow-box-navbar"></div>
			</div>
			<div class="group">
				<nuxt-link
					@click="logout"
					class="bg-gray-700 transition ease-in-out h-10 w-10 btn-nav-bar delay-100 group-hover:bg-gray-800"
				>
					<Icon
						name="mingcute:exit-line"
						color="#ffffff"
						class="h-8 w-8 self-center"
					/>
				</nuxt-link>
				<div class="drop-shadow-box-navbar"></div>
			</div>
		</div>
	</div>
</template>

<script>
import { useMainStore } from "../store/main";

export default {
	name: "NavBar",
	setup() {
		const store = useMainStore();
		return { store };
	},
	data() {
		return {
			links: [
				{
					name: "home",
					link: "/",
				},
				{
					name: "social reports",
					link: "/social-reports",
				},
			],
			listButtons: [
				{
					name: "settings",
					link: "/settings",
				},
				{
					name: "sign out",
					link: "/sign-out",
				},
			],
		};
	},
	methods: {
		logout() {
			this.store.connected = false;
			this.$router.push("/login");
		},
	},
};
</script>

<style>
.active {
	color: #fbbf24;
}

.exact-active {
	color: #fbbf24;
}
</style>
