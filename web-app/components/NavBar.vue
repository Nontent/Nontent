<template>
	<div>
		<v-toolbar dense>
			<v-btn id="home-link" color="primary" text nuxt to="/">
				Nontent Web App</v-btn
			>

			<v-spacer></v-spacer>

			<div class="text-center">
				<v-menu
					open-on-hover
					bottom
					offset-y
					close-delay="500"
					open-delay="50"
					rounded
					transition="slide-y-transition"
				>
					<template v-slot:activator="{ on, attrs }">
						<v-btn color="primary" icon v-bind="attrs" v-on="on">
							<v-icon>mdi-menu</v-icon>
						</v-btn>
					</template>

					<v-list>
						<v-list-item
							v-for="(item, index) in this.$store.state
								.isConnected
								? connectedMenuItems
								: disconnectedMenuItems"
							:key="index"
						>
							<v-list-item-title>
								<v-btn
									color="primary"
									text
									nuxt
									block
									@click="item.action ? item.action() : null"
									:to="item.link"
								>
									<span class="mr-3">{{ item.title }}</span>
									<v-spacer></v-spacer>
									<v-icon color="primary">{{
										item.icon
									}}</v-icon>
								</v-btn>
							</v-list-item-title>
						</v-list-item>
					</v-list>
				</v-menu>
			</div>
		</v-toolbar>
	</div>
</template>
<script>
export default {
	name: 'navBar',
	data() {
		return {
			disconnectedMenuItems: [
				{
					title: 'Log-in/Register',
					link: '/connection',
					icon: 'mdi-account-key',
				},
			],
			connectedMenuItems: [
				{
					title: 'Profile',
					link: '/profile',
					icon: 'mdi-account',
				},
				{
					title: 'Log-out',
					link: '/connection',
					icon: 'mdi-logout',
					action: () => {
						this.$store.commit('incrementCounter')
						this.$store.commit('toggleConnection', false)
					},
				},
			],
		}
	},
}
</script>