<template>
	<div>
		<div
			v-if="$route.name != 'login' && $route.name != 'register'"
			class="px-5 pt-2 flex"
		>
			<span class="flex-none font-bold self-center">
				<a href="/">nontent.</a>
			</span>
			<span class="grow"></span>
			<div>
				<button
					class="bg-amber-400 transition delay-100 ease-in-out h-10 w-10 btn-nav-bar group-hover:bg-amber-500"
					@click="toggleMenu"
				>
					<Icon
						name="mingcute:menu-fill"
						color="#ffffff"
						class="h-8 w-8 self-center"
					/>
				</button>
			</div>
		</div>
		<div
			v-if="showMenu"
			class="fixed w-screen h-screen bg-white bg-opacity-95 z-10 flex flex-col items-center justify-center"
			@click="toggleMenu"
		>
			<div>
				<div v-for="link in links" :key="link.name" class="my-3">
					<nuxt-link
						:to="link.link"
						class="transition-colors ease-in-out delay-75 hover:text-amber-400 nuxt-link-active"
					>
						{{ link.name }}
					</nuxt-link>
				</div>
				<div class="self-center flex space-x-4 mt-12">
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
		</div>
	</div>
</template>
<script>
import { useMainStore } from "../store/main";

export default {
	name: "MobileMenu",
	setup() {
		const store = useMainStore();

		function logout() {
			store.logout();
			window.location.reload();
		}

		return { store, logout };
	},
	data() {
		return {
			showMenu: false,
			links: [
				{
					name: "Home",
					link: "/",
				},
				{
					name: "Social Reports",
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
		toggleMenu() {
			this.showMenu = !this.showMenu;
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
