<template>
	<div class="main-box relative z-0">
		<div class="grid grid-cols-2 justify-self-start mb-5">
			<div>
				<Icon
					name="mingcute:twitter-line"
					class="h-10 w-10"
					color="#1DA1F2"
				/>
				-
				<b>{{ account.userId ? "@" + account.userId : "@nontent." }}</b>
			</div>
			<div class="grid justify-items-end group">
				<button
					v-if="store.pinnedAccount.provider !== 'Twitter'"
					id="pinToHomeBtnTwitter"
					type="button"
					@click="pinToHome(account)"
					class="btn bg-gray-700 group-hover:bg-gray-800"
				>
					Pin to home
				</button>
				<button
					v-else
					id="pinToHomeBtnTwitter"
					type="button"
					@click="unpinFromHome()"
					class="btn bg-gray-700 group-hover:bg-gray-800"
				>
					Unpin
				</button>
				<div class="invisible md:visible drop-shadow-box"></div>
			</div>
		</div>
		<div class="grid grid-cols-3 place-items-center">
			<div>
				<b
					>{{
						account.followers ? account.followers : 9836
					}}
					followers(s)</b
				>
			</div>
			<div>
				<b
					>{{
						account.following ? account.following : 2890
					}}
					subsription(s)</b
				>
			</div>
			<div>
				<b>{{ account.tweets ? account.tweets : 6541 }} tweet(s)</b>
			</div>
		</div>
	</div>
</template>
<script>
import { useMainStore } from "../store/main";
export default {
	name: "TwitterBasicViewer",
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
