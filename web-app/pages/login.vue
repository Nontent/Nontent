<template>
	<div class="flex h-screen">
		<div class="grow self-center mb-20">
			<h1 class="flex justify-center font-bold mt-11 text-5xl mb-11">
				nontent.
			</h1>
			<div class="mb-11">
				<div class="input-form-box">
					<input
						id="email_login"
						type="text"
						class="outline-none w-full"
						placeholder="email."
						v-model="loginEmail"
					/>
				</div>
				<div
					v-if="!isEmailValid"
					class="mt-1 text-sm text-red-500 container flex mx-auto"
				>
					Please enter a valid email address (example@domain.com).
				</div>
			</div>
			<div class="input-form-box flex">
				<input
					id="password_login"
					:type="showPassword ? 'text' : 'password'"
					class="outline-none w-full"
					placeholder="password."
					v-model="loginPassword"
				/>
				<div
					class="flex items-center pr-2 ml-auto"
					@click="showPassword = !showPassword"
				>
					<Icon
						:name="
							showPassword
								? 'ant-design:eye-invisible-filled'
								: 'ant-design:eye-filled'
						"
						class="w-6 h-6"
						color="#FFB100"
					/>
				</div>
			</div>
			<div
				v-if="!isPasswordValid"
				class="mt-1 text-sm text-red-500 container flex mx-auto"
			>
				Please enter a valid password (min. 6 characters)
			</div>
			<div
				v-if="loginError"
				class="mt-1 text-sm text-red-500 container flex mx-auto"
			>
				Wrong email or password. Please try again.
			</div>

			<div class="flex justify-center">
				<div class="group mt-11">
					<button
						id="login_button"
						type="button"
						@click="login"
						class="btn bg-amber-500 group-hover:bg-amber-600"
					>
						Login
					</button>
					<div class="invisible md:visible drop-shadow-box"></div>
				</div>
			</div>
			<div class="flex justify-center mt-4 font-bold">
				<p>OR</p>
			</div>
			<div class="flex justify-center">
				<div class="group mt-4">
					<button
						id="register_button"
						type="button"
						@click="toRegister"
						class="btn bg-cyan-800 group-hover:bg-cyan-900"
					>
						Register
					</button>
					<div class="invisible md:visible drop-shadow-box"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Providers from "../services/providers";
import { useMainStore } from "../store/main";
export default {
	name: "Login",
	setup() {
		const store = useMainStore();
		return { store };
	},
	data() {
		return {
			showPassword: false,
			loginEmail: "",
			loginPassword: "",
			isEmailValid: true,
			isPasswordValid: true,
			loginError: false,
		};
	},
	methods: {
		toRegister() {
			this.$router.push("/register");
		},
		verifyLogin() {
			if (this.loginEmail == "" || this.loginPassword == "") {
				this.isEmailValid = false;
				this.isPasswordValid = false;
				return false;
			} else {
				this.isEmailValid = true;
				this.isPasswordValid = true;
			}
			if (
				!this.loginEmail.includes("@") ||
				!this.loginEmail.includes(".")
			) {
				this.isEmailValid = false;
				return false;
			} else {
				this.isEmailValid = true;
			}
			if (this.loginPassword.length < 6) {
				this.isPasswordValid = false;
				return false;
			} else {
				this.isPasswordValid = true;
			}
			this.isEmailValid = true;
			this.isPasswordValid = true;
			return true;
		},
		async login() {
			const isValid = this.verifyLogin();
			if (!isValid) {
				return;
			}
			const user = {
				email: this.loginEmail,
				password: this.loginPassword,
			};
			try {
				const response = await Providers.login(user);
				if (response.status === 200) {
					this.store.increment();
					this.store.token = response.data.token;
					this.store.increment();
					this.store.setUserId(response.data.userId);
					this.store.increment();
					this.store.connected = true;
					const userResponse = await Providers.getUser(
						response.data.userId,
						response.data.token
					);
					this.store.increment();
					this.store.setEmail(userResponse.data.email);
					this.store.increment();
					if (userResponse.data.socialNetworks.length > 0) {
						this.store.increment();
						this.store.addAccount({
							provider: "Twitter",
							username: userResponse.data.twitterUsername
								? userResponse.data.twitterUsername
								: "",
						});
					}
					this.$router.push("/");
				}
			} catch (error) {
				this.loginError = true;
			}
		},
	},
};
</script>

<style></style>
