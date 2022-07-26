<template>
	<div>
		<v-container grid-list-xs>
			<span class="text-h2">
				Profil - {{ $store.state.currentUser.email }}
			</span>
			<!-- User account info card -->
			<v-card class="mb-5 mt-3">
				<v-form>
					<v-container>
						<!-- Current user info -->
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
						<!-- New user info -->
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
			<!-- User linked account infos -->
			<!-- TODO: @Samuel GALIERE - this btn is solely for testing purpose -->
			<!-- <v-btn color="success" @click="addAccount()">ouais</v-btn> -->
			<v-row align="stretch">
				<v-col
					xs="12"
					sm="6"
					md="4"
					xl="3"
					v-for="(account, index) in linkedAccounts"
					:key="index"
				>
					<v-card
						align="center"
						min-height="100%"
						elevation="0"
						outlined
						class="d-flex flex-column"
					>
						<v-card-title>
							<v-icon color="primary"
								>mdi-{{ account.provider }}
							</v-icon>
							<v-spacer></v-spacer>
							<span class="text-h5">{{ account.provider }}</span>
							<v-spacer></v-spacer>
							<v-btn
								color="error"
								@click="unlinkAccount(account.provider)"
								icon
							>
								<v-icon>mdi-account-remove</v-icon>
							</v-btn>
						</v-card-title>
						<v-card-text>
							<v-text-field
								v-model="account.username"
								label="username"
								type="text"
								disabled
							>
							</v-text-field>
						</v-card-text>
					</v-card>
				</v-col>
			</v-row>
		</v-container>
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
			linkedAccounts: this.$store.state.connected_accounts,
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
		unlinkAccount(provider) {
			this.$store.commit('incrementCounter')
			const account = this.$store.state.connected_accounts.find(
				(account) => account.provider === provider
			)
			this.$store.commit('removeConnectedAccount', account)
		},
		// TODO: @Samuel GALIERE - this is solely for testing purposes
		addAccount() {
			this.$store.commit('incrementCounter')
			this.$store.commit('addConnectedAccount', {
				id: 1,
				provider: 'facebook',
				name: 'Facebook',
				icon: 'facebook',
				connected: true,
				token: 'token',
				username: 'username',
				email: 'zaeoih@zajk.com',
			})
		},
	},
}
</script>
<style>

</style>