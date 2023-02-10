<template>
	<div class="main-box relative z-0 mt-8">
		<div class="grid grid-cols-3 justify-self-start mb-5">
			<div>
				<Icon
					name="mingcute:reddit-line"
					class="h-10 w-10"
					color="#FF4500"
				/>
				-
				{{ account.userId }}
			</div>
			<div class="grow"></div>
			<div class="grid justify-items-end group">
				<button
					v-if="store.pinnedAccount.provider !== 'Reddit'"
					id="pinToHomeBtnReddit"
					type="button"
					@click="pinToHome(account)"
					class="btn bg-gray-700 group-hover:bg-gray-800"
				>
					Pin to home
				</button>
				<button
					v-else
					id="pinToHomeBtnReddit"
					type="button"
					@click="unpinFromHome()"
					class="btn bg-gray-700 group-hover:bg-gray-800"
				>
					Unpin
				</button>
				<div class="drop-shadow-box"></div>
			</div>
		</div>
		<div class="grid grid-cols-3 place-items-center">
			<div>{{ account.subReddits }} sub-reddit(s) followed</div>
			<!--  nombre de sub-reddits suivis -->
			<div>{{ account.posts }} Posted post(s)</div>
			<!-- nombre de posts posté -->
			<div>{{ account.upvotes }} Liked post(s)</div>
			<!--  nombre de posts likés -->
		</div>
	</div>
</template>

<script>
import { useMainStore } from "../store/main";
export default {
	name: "RedditBasicViewer",
	setup() {
		const store = useMainStore();

		function pinToHome(account) {
			store.pinnedAccount = account;
		}
		function unpinFromHome() {
			store.pinnedAccount = {};
		}

		return {
			store,
			pinToHome,
			unpinFromHome,
		};
	},
	props: {
		account: {
			type: Object,
			required: true,
		},
	},
};
</script>
<style></style>
