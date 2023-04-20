<script setup>
import { useMainStore } from "../store/main";
definePageMeta({ middleware: ["auth"] });
const store = useMainStore();
</script>
<template>
	<div>
		<div v-for="account in store.accounts" :key="account.provider">
			<TwitterBasicViewer
				v-if="account.provider === 'Twitter'"
				:account="account"
			/>
			<RedditBasicViewer
				v-if="account.provider === 'Reddit'"
				:account="account"
			/>
		</div>
	</div>
</template>
<script>
export default {
	name: "SocialReports",
};
</script>
<style></style>
