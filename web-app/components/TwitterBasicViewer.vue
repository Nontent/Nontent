<template>
	<div class="main-box relative z-0 mt-11">
		<div class="grid grid-cols-2 justify-self-start mb-5">
			<div>
				<Icon
					name="mingcute:twitter-line"
					class="h-10 w-10"
					color="#1DA1F2"
				/>
				-
				{{ account.userId }}
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
		<div class="grid grid-cols-2 place-items-center">
			<div>{{ account.followers }} followers(s)</div>
			<div>{{ account.subs }} subsription(s)</div>
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
