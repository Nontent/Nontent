<template>
	<div class="grid justify-items-end group">
		<button
			class="btn bg-blue-500 hover:bg-blue-600 w-auto h-auto px-1 md:z-40"
			@click="loginTwitter"
		>
			Login with
			<Icon
				name="mingcute:twitter-line"
				class="h-10 w-10"
				color="white"
			/>
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
	name: "TwitterConnection",
	// setup() {
	// 	const store = useMainStore();

	// }
	methods: {
		async loginTwitter() {
			const response = (await Api.connectTwitter()).data;
			console.log(response);
			window.location.href = response.url;
		},
	},
};
</script>
<style></style>
