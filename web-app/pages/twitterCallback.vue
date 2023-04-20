<template>
	<div class="flex justify-center">You're now connected to Twitter!</div>
</template>
<script>
import { useMainStore } from "../store/main";
import Providers from "../services/providers";
export default {
	name: "TwitterCallback",
	async setup() {
		const store = useMainStore();
		const userId = useCookie("nontentUserId");
		const token = useCookie("nontentToken");
		const urlParams = new URLSearchParams(window.location.search);
		const code = urlParams.get("code");
		const state = urlParams.get("state");
		const updateUserResponse = await Providers.updateUser(
			userId.value,
			{
				twitterSessionState: state,
			},
			token.value
		);
		if (updateUserResponse.status === 200) {
			await Providers.getTokenTwitter(
				{
					code: code,
					state: state,
				},
				store.token
			);
		}
		try {
			const user = await Providers.getUser(userId.value, store.token);
			const twitterAccount = await Providers.getUserTwitter(store.token);
			if (user.status === 200 && twitterAccount.status === 200) {
				if (user.data.socialNetworks.length > 0) {
					store.addAccount({
						provider: "Twitter",
						userId: user.data.twitterUsername,
						followers: twitterAccount.data.followers_count,
						following: twitterAccount.data.following_count,
						tweetCount: twitterAccount.data.tweet_count,
					});
				}
			}
		} catch (error) {
			console.log(error);
		}
		window.location.href = "http://www.localhost:1390";
	},
};
</script>
<style></style>
