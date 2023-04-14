<template>
	<div class="flex justify-center">test</div>
</template>
<script>
import { useMainStore } from "../store/main";
import Providers from "../services/providers";
export default {
	name: "TwitterCallback",
	setup() {
		const store = useMainStore();
		const urlParams = new URLSearchParams(window.location.search);
		const code = urlParams.get("code");
		const state = urlParams.get("state");
		const updateUserResponse = Providers.updateUser(store.user.id, {
			twitterCodeVerifier: code,
			twitterSessionState: state,
		});
		if (updateUserResponse.status === 200) {
			const getTokenResponse = Providers.getTokenTwitter();
		}
		console.log(updateUserResponse);
		console.log(getTokenResponse);
		return { store };
	},
};
</script>
<style></style>
