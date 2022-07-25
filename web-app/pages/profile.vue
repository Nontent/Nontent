<template>
	<div>
		<span class="text-h2">
			Profil - {{ $store.state.currentUser.email }}
		</span>
		<v-card>
			<v-form>
				<v-container>
					<v-text-field
						v-model="$store.state.currentUser.email"
						label="Current email"
						type="email"
						disabled
					></v-text-field>
					<v-text-field
						v-model="$store.state.currentUser.password"
						label="Current password"
						:append-icon="showPwd ? 'mdi-eye' : 'mdi-eye-off'"
						:type="showPwd ? 'text' : 'password'"
						@click:append="showPwd = !showPwd"
						disabled
					></v-text-field>
					<v-text-field
						v-model="email"
						label="Change email"
						type="email"
						required
					></v-text-field>
					<v-text-field
						v-model="password"
						label="Change password"
						:append-icon="showPwd ? 'mdi-eye' : 'mdi-eye-off'"
						:type="showPwd ? 'text' : 'password'"
						@click:append="showPwd = !showPwd"
						required
					></v-text-field>
					<v-btn color="success" @click="updateUser">
						Mettre à jour
					</v-btn>
				</v-container>
			</v-form>
		</v-card>
	</div>
</template>
<script>
export default {
	name: 'profile',
	data() {
		return {
			email: '',
			password: '',
			showPwd: false,
		}
	},
	methods: {
		// TODO: @Samuel GALIERE - Add API call to update user
		updateUser() {
			this.$store.commit('incrementCounter')
			this.$store.commit('updateCurrentUser', {
				email: this.email,
				password: this.password,
			})
		},
	},
}
</script>
<style>
</style>