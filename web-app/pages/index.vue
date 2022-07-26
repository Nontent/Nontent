<template>
	<div>
		<v-card class="mb-4">
			<v-card-title>
			<span>Bienvenue!</span> <v-spacer></v-spacer>
					<span>Connecte toi à tes différents profils!
				<v-icon>mdi-arrow-right</v-icon>
				<v-btn color="primary" icon>
					<v-icon>mdi-twitter</v-icon>
				</v-btn>
				<v-btn color="primary" icon>
					<v-icon>mdi-reddit</v-icon>
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
					</span>
			</v-card-title>
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
	methods: {},
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
<style>

.Welcome {
	text-align: left;
 }

</style>