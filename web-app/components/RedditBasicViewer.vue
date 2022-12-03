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
				{{ userName }}
			</div>
			<div class="grow"></div>
			<div class="grid justify-items-end group">
				<button
					type="button"
					@click="home"
					class="btn bg-gray-700 group-hover:bg-gray-800"
				>
					Pint to home
				</button>
				<div class="drop-shadow-box"></div>
			</div>
		</div>
		<div class="grid grid-cols-3 place-items-center">
			<div>{{ subReddits.length }} sub-reddit(s) followed</div>
			<!--  nombre de sub-reddits suivis -->
			<div>{{ postedPost }} Posted post(s)</div>
			<!-- nombre de posts posté -->
			<div>{{ likedPost }} Liked post(s)</div>
			<!--  nombre de posts likés -->
		</div>
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
		postedPost: {
			type: Number,
			default: 0,
		},
		likedPost: {
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
