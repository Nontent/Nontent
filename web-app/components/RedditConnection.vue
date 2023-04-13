<template>
	<div class="grid justify-items-end group">
		<button
			class="btn bg-red-500 hover:bg-red-600 w-auto h-auto px-1 md:z-50"
			@click="loginReddit"
		>
			Login with
			<Icon name="mingcute:reddit-line" class="h-10 w-10" color="white" />
		</button>
		<div
			class="invisible md:visible drop-shadow-box translate-x-1 translate-y-2 w-32 md:z-10"
		></div>
	</div>
</template>
<script>
import { useMainStore } from "../store/main";
import Api from "../services/providers";
export default {
	name: "redditConnection",
	// setup() {
	// 	const store = useMainStore();

	// }
	methods: {
		async loginReddit() {
			const response = (await Api.connectReddit()).data;
			console.log(response);
		},
	},
};
</script>
<style></style>
