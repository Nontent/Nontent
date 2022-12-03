<template>
	<div>
		<TextCard :title="title" :content="content" />
		<div class="main-box h-96">
			<span class="text-lg">Your pinned profiles</span>
			<div class="flex justify-center h-5/6">
				<div class="text-lg font-medium italic self-center">
					That's so sad, this is a bit empty here. :(
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { useMainStore } from "../store/main";

export default {
	name: "home",
	setup() {
		const store = useMainStore();
		return { store };
	},
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
