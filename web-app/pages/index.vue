<template>
	<div>
		<TextCard :title="title" :subtitle="subtitle" :content="content" />
	</div>
</template>

<script>
export default {
	name: "home",
	data() {
		return {
			title: "Hello World",
			subtitle: "This is a subtitle",
			content: "This is a content",
		};
	},
};
</script>

<style></style>
