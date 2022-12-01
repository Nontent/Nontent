<template>
	<div>
		<TwitterBasicViewer
			:userName="fakeUser.name"
			:followers="fakeUser.followers"
			:subs="fakeUser.subs"
		/>
		<RedditBasicViewer
			:userName="fakeUser.name"
			:followers="fakeUser.followers"
			:subs="fakeUser.subs"
			:subReddits="fakeUser.subReddits"
		/>
	</div>
</template>
<script>
export default {
	name: "SocialReports",
	data() {
		return {
			fakeUser: {
				name: "@fakeNontentUser",
				followers: 110,
				subs: 1200,
				subReddits: [
					"r/nontent",
					"r/nontent",
					"r/nontent",
					"r/nontent",
					"r/nontent",
				],
			},
		};
	},
};
</script>
<style></style>
