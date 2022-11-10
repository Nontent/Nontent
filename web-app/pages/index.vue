<template>
	<div>
		<h1>Bienvenue!</h1>
		<v-card class="mb-4">
			<v-card-text>
				Connecte toi à tes différents profils!
				<v-icon>mdi-arrow-right</v-icon>
				<v-btn color="primary" icon>
					<v-icon>mdi-twitter</v-icon>
				</v-btn>
				<v-btn color="primary" icon>
					<v-icon v-on:click="reddit">mdi-reddit</v-icon>
				</v-btn>
				<v-btn color="primary" icon>
					<v-icon>mdi-facebook</v-icon>
				</v-btn>
				<v-btn color="primary" icon>
					<v-icon>mdi-instagram</v-icon>
				</v-btn>
				<v-btn color="primary" icon>
					<v-icon>mdi-linkedin</v-icon>
				</v-btn>
			</v-card-text>
		</v-card>
		<span class="text-h4">Tes profils connectés</span>
		<SocialProfileViewer
			v-for="(profile, index) in profiles"
			:key="index"
			:profile="profile"
		/>
	</div>
</template>

<script>
import SocialProfileViewer from '../components/SocialProfileViewer.vue'
export default {
	components: { SocialProfileViewer },
	name: 'IndexPage',
	methods: {
		reddit: function () {
			window.open(
            "https://www.reddit.com/api/v1/authorize?client_id=TN6bnT8p1cfnwH7hkZTZuw&response_type=code&state=test&redirect_uri=http://localhost:3000&duration=permanent&scope=identity,mysubreddits,read,vote,history",
            "_self"
        )
    	}
	},
	data() {
		return {
			profiles: [
				{
					provider: 'twitter',
					name: '@nyx_nim',
					avatar: 'https://static.wikia.nocookie.net/hades_gamepedia_en/images/8/8e/Nyx.png',
					followers: 3246132162510,
					following: 2115,
				},
			],
		}
	},
}
</script>
