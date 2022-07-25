<template>
	<div>
		<v-carousel
			v-model="connectionCarouselModel"
			:show-arrows="false"
			hide-delimiter-background
			delimiter-icon="mdi-minus"
		>
			<v-carousel-item
				v-for="(item, index) in connectionItems"
				:key="index"
			>
				<v-form v-model="formModel">
					<span class="text-h3">{{ item.title }}</span>
					<v-container grid-list-xs>
						<v-text-field
							v-model="item.email"
							:rules="
								item.nameMainBtn === 'Log-in' ? [] : emailRules
							"
							:required="
								item.nameMainBtn === 'Log-in' ? false : true
							"
							label="E-mail"
						></v-text-field>
						<v-text-field
							v-if="item.nameMainBtn == 'Log-in'"
							v-model="item.password"
							:append-icon="showPwd ? 'mdi-eye' : 'mdi-eye-off'"
							:type="showPwd ? 'text' : 'password'"
							label="Password"
							@click:append="showPwd = !showPwd"
						></v-text-field>
						<v-text-field
							v-if="item.nameMainBtn == 'Register'"
							v-model="item.password"
							required
							:rules="passwordRules"
							:append-icon="showPwd ? 'mdi-eye' : 'mdi-eye-off'"
							:type="showPwd ? 'text' : 'password'"
							label="Password"
							@click:append="showPwd = !showPwd"
						></v-text-field>
						<v-text-field
							v-if="item.nameMainBtn == 'Register'"
							v-model="item.confirmPassword"
							required
							:rules="passwordRules"
							:append-icon="showPwd ? 'mdi-eye' : 'mdi-eye-off'"
							:type="showPwd ? 'text' : 'password'"
							label="Confirm Password"
							@click:append="showPwd = !showPwd"
						></v-text-field>
						<v-btn color="success" @click="item.mainBtnClick">{{
							item.nameMainBtn
						}}</v-btn>
						<v-btn
							color="secondary"
							@click="item.secondaryBtnClick"
							>{{ item.nameSecondBtn }}</v-btn
						>
					</v-container>
				</v-form>
			</v-carousel-item>
		</v-carousel>
	</div>
</template>
<script>
export default {
	name: 'connection',
	data() {
		return {
			connectionCarouselModel: 0,
			showPwd: false,
			formModel: false,
			connectionItems: [
				{
					nameMainBtn: 'Log-in',
					nameSecondBtn: 'Register',
					title: 'Welcome back!',
					email: '',
					password: '',
					mainBtnClick: () => {
						this.$store.commit('toggleConnection', true)
						this.$router.push('/')
					},
					secondaryBtnClick: () => {
						this.connectionCarouselModel++
					},
				},
				{
					nameMainBtn: 'Register',
					nameSecondBtn: 'Log-in',
					title: 'Register now!',
					email: '',
					password: '',
					confirmPassword: '',
					secondaryBtnClick: () => {
						this.connectionCarouselModel++
					},
					mainBtnClick: () => {
						this.$router.push('/')
					},
				},
			],
			emailRules: [
				(v) => !!v || 'E-mail is required',
				(v) =>
					/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
					'E-mail must be valid',
			],
			passwordRules: [
				(v) => !!v || 'Password is required',
				(v) =>
					(v && v.length >= 6) ||
					'Password must be at least 6 characters',
				// verify password and confirm password are the same
				(v) =>
					this.connectionItems[1].confirmPassword === v ||
					'Passwords do not match',
			],
		}
	},
}
</script>
<style>
</style>