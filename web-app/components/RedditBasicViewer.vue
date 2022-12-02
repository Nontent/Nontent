<template>
	<div class="main-box grid grid-cols-3 grid-rows-2 justify-self-start relative z-0 mt-8">
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
				<div class="grow"></div>
				<div class="grow"></div>
				<div class="grow"></div>
					<div>{{ subReddits.length }} sub-reddit(s) followed</div> <!--  nombre de sub-reddits suivis -->
					<div>{{ postedPost }} Posted post(s)</div> <!-- nombre de posts posté -->
					<div>{{ likedPost }} Liked post(s)</div> <!--  nombre de posts likés -->
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
