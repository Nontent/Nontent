<template>
	<div class="main-box">
		<div class="text-xl font-bold">{{ title }}</div>
		<span v-if="subtitle" class="text-lg font-light italic">{{
			subtitle
		}}</span>
		<p class="break-words text-sm">
			{{ content }}
		</p>
	</div>
</template>
<script>
export default {
	name: "TextCard",
	props: {
		title: {
			type: String,
			required: true,
		},
		subtitle: {
			type: String,
			required: false,
		},
		content: {
			type: String,
			required: true,
		},
	},
};
</script>
<style></style>
