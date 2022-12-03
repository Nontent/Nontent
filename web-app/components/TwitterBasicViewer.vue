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
				{{ userName }}
			</div>
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
		<div class="grid grid-cols-2 place-items-center">
			<div>{{ followers }} followers(s)</div>
			<div>{{ subs }} subsription(s)</div>
		</div>
	</div>
</template>
<script>
export default {
	name: "TwitterBasicViewer",
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
	},
};
</script>
<style></style>
