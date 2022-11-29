<template>
	<div class="container flex h-16 mx-auto p-4 border-4 my-2 border-black">
		<!-- <div class="flex h-16 w-auto mx-2 p-4 border-4 my-2 border-black"> -->
		<span class="flex-none justify-center font-bold"> nontent. </span>
		<span class="grow"></span>
		<div class="grow-0 space-x-4">
			<div class="inline" v-for="link in links" :key="link.name">
				<nuxt-link :to="link.link">
					{{ link.name }}
				</nuxt-link>
			</div>
		</div>
		<span class="grow"></span>
		<div class="self-center flex space-x-2">
			<div class="bg-amber-400 h-10 w-10 btn">
				<CogIcon class="self-center h-8 w-8 text-white" />
			</div>
			<div class="bg-gray-700 h-10 w-10 btn">
				<ArrowLeftOnRectangleIcon
					class="h-8 w-8 self-center text-white"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import { CogIcon } from "@heroicons/vue/24/solid";
import { ArrowLeftOnRectangleIcon } from "@heroicons/vue/24/solid";

export default {
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
				{
					name: "profile",
					link: "/profile",
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
	components: {
		CogIcon,
		ArrowLeftOnRectangleIcon,
	},
};
</script>

<style></style>
