<template>
	<div>
		<v-card>
			<v-card-title primary-title>
				{{ profile.provider }} - {{ profile.name }}
				<v-spacer></v-spacer>
				<v-icon color="primary">mdi-{{ profile.provider }} </v-icon>
			</v-card-title>
			<v-card-text>
				<v-avatar>
					<img :src="profile.avatar" />
				</v-avatar>
				<br />
				<span class="text-h4 mt-2"
					>{{ profile.followers }} followers |</span
				>
				<span class="text-h4 mt-2"
					>{{ profile.following }} following</span
				>
			</v-card-text>
		</v-card>
	</div>
</template>
<script>
export default {
	props: {
		profile: {
			type: Object,
			required: true,
		},
	},
}
</script>
<style>
</style>