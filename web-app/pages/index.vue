<script setup>
import { useMainStore } from "../store/main";
definePageMeta({ middleware: ["auth"] });
const store = useMainStore();
</script>
<template>
	<div>
		<TextCard :title="mainContainerTitle" :content="mainContainerContent" />
		<div class="main-box">
			<span class="text-lg my-5">Your pinned profile</span>
			<div
				v-if="
					Object.keys(store.pinnedAccount).length === 0 &&
					store.accounts.length > 0
				"
				class="flex justify-center h-5/6 my-3"
			>
				<div class="text-lg font-medium italic self-center">
					That's so sad, this is a bit empty here. :( <br />
					Please pin a profile to see it here.
				</div>
			</div>
			<TwitterBasicViewer
				v-if="store.pinnedAccount.provider === 'Twitter'"
				:account="store.pinnedAccount"
				class="border-0"
			/>
			<RedditBasicViewer
				v-if="store.pinnedAccount.provider === 'Reddit'"
				:account="store.pinnedAccount"
				class="border-0"
			/>
			<div class="flex justify-center mt-2">
				<div
					class="mr-4"
					v-if="
						!store.accounts.some(
							(account) => account.provider == 'Twitter'
						)
					"
				>
					<TwitterConnection />
				</div>
				<div
					class="ml-4"
					v-if="
						!store.accounts.some(
							(account) => account.provider == 'Reddit'
						)
					"
				>
					<RedditConnection />
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: "home",
	data() {
		return {
			mainContainerTitle: "Welcome to your nontent!",
			mainContainerContent:
				" On this page you will be able to see your overall information about the different social profile you have connected.",
		};
	},
};
</script>

<style></style>
