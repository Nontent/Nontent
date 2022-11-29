<template>
	<div class="container mx-auto border-black border-4 p-4">
		<div class="text-xl font-bold">{{ title }}</div>
		<span class="text-lg font-light italic">{{ subtitle }}</span>
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
