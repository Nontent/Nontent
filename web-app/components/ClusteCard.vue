<template>
	<div>
		<span class="text-lg my-5">{{ title }}</span>
		<div class="text-md font-light italic self-center">
			{{ content }}
		</div>
	</div>
</template>
<script>
export default {
	props: {
		title: {
			type: String,
			required: true,
		},
		content: {
			type: String,
			required: true,
		},
	},
};
</script>
<style></style>
