<template>
	<div class="group">
		<button
			class="btn bg-blue-500 group-hover:bg-blue-600 whitespace-nowrap w-auto p-1"
			@click="loginTwitter"
		>
			Login with Twitter
		</button>
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
		},
	},
};
</script>
<style></style>
