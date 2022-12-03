<template>
	<div>
		<TwitterBasicViewer
			:userName="fakeUser.name"
			:followers="fakeUser.followers"
			:subs="fakeUser.subs"
		/>
		<RedditBasicViewer
			:userName="fakeUser.name"
			:postedPost="fakeUser.posts"
			:likedPost="fakeUser.likedPost"
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
				likedPost: 1400,
				posts: 1008,
			},
		};
	},
};
</script>
<style></style>
