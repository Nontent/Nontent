<script setup>
import { useMainStore } from "../store/main";
definePageMeta({ middleware: ["auth"] });
const store = useMainStore();
</script>
<template>
	<div>
		<TextCard :title="title" :content="content" />
		<div class="main-box">
			<span class="text-lg">Your pinned profile</span>
			<div
				v-if="!store.pinnedAccount.userId"
				class="flex justify-center h-5/6"
			>
				<div class="text-lg font-medium italic self-center">
					That's so sad, this is a bit empty here. :(
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
		</div>
	</div>
</template>
<script>
export default {
	name: "home",
	data() {
		return {
			title: "Welcome to your nontent!",
			content:
				" On this page you will be able to see your overall information about the different social profile you have connected.",
		};
	},
};
</script>

<style></style>
