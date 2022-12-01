<template>
	<div class="main-box grid grid-cols-3 grid-rows-2 justify-items-center">
		<div class="col-span-3">
			<Icon
				name="mingcute:reddit-line"
				class="h-10 w-10"
				color="#FF4500"
			/>
			-
			{{ userName }}
		</div>
		<div>{{ followers }} followers(s)</div>
		<div>{{ subs }} subscribtion(s)</div>
		<div>{{ subReddits.length }} sub-reddit(s) followed</div>
	</div>
</template>
<script>
export default {
	name: "RedditBasicViewer",
	props: {
		userName: {
			type: String,
			default: "userName",
		},
		followers: {
			type: Number,
			default: 0,
		},
		subs: {
			type: Number,
			default: 0,
		},
		subReddits: {
			type: Array,
			default: [],
		},
	},
};
</script>
<style></style>
