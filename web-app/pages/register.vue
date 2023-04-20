<template>
	<div class="flex h-screen">
		<div class="grow self-center mb-20">
			<h1 class="flex justify-center font-bold mt-11 text-5xl mb-11">
				nontent.
			</h1>
			<div class="mb-11">
				<div class="input-form-box">
					<input
						id="register_email"
						type="text"
						class="outline-none w-full"
						placeholder="email."
						v-model="registerEmail"
					/>
				</div>
				<div
					v-if="!isEmailValid"
					class="mt-1 text-sm text-red-500 container flex mx-auto"
				>
					Please enter a valid email address (example@domain.com).
				</div>
			</div>
			<div class="mb-11">
				<div class="input-form-box flex">
					<input
						id="register_password"
						:type="showPassword ? 'text' : 'password'"
						class="outline-none w-full"
						placeholder="password."
						v-model="registerPassword"
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
			</div>
			<div class="input-form-box flex">
				<input
					id="register_password_repeat"
					:type="showPassword ? 'text' : 'password'"
					class="outline-none w-full"
					placeholder="confirm password."
					v-model="registerPasswordRepeat"
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
				v-if="!isConfirmPasswordValid"
				class="mt-1 text-sm text-red-500 container flex mx-auto"
			>
				The two passwords do not match.
			</div>
			<div class="flex justify-center">
				<div class="group mt-9">
					<button
						id="register_button"
						type="button"
						@click="register"
						class="btn bg-amber-500 group-hover:bg-amber-600"
					>
						Register
					</button>
					<div class="invisible md:visible drop-shadow-box"></div>
				</div>
			</div>
			<div class="flex justify-center">
				<div class="group mt-9">
					<button
						id="login_button"
						type="button"
						@click="toLogin"
						class="btn bg-cyan-800 group-hover:bg-cyan-900"
					>
						Login
					</button>
					<div class="invisible md:visible drop-shadow-box"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { useMainStore } from "../store/main";
import Providers from "../services/providers";
export default {
	name: "Register",
	setup() {
		const store = useMainStore();
		return { store };
	},
	data() {
		return {
			registerEmail: "",
			registerPassword: "",
			registerPasswordRepeat: "",
			isEmailValid: true,
			isPasswordValid: true,
			isConfirmPasswordValid: true,
			showPassword: false,
			showConfirmPassword: false,
		};
	},
	methods: {
		toLogin() {
			this.$router.push("/login");
		},
		verifyRegister() {
			if (
				this.registerEmail == "" ||
				this.registerPassword == "" ||
				this.registerPasswordRepeat == ""
			) {
				this.isEmailValid = false;
				this.isPasswordValid = false;
				this.isConfirmPasswordValid = false;
				return false;
			} else {
				this.isEmailValid = true;
				this.isPasswordValid = true;
				this.isConfirmPasswordValid = true;
			}
			if (
				!this.registerEmail.includes("@") ||
				!this.registerEmail.includes(".")
			) {
				this.isEmailValid = false;
				return false;
			} else {
				this.isEmailValid = true;
			}
			if (this.registerPassword.length < 6) {
				this.isPasswordValid = false;
				return false;
			} else {
				this.isPasswordValid = true;
			}
			if (this.registerPassword != this.registerPasswordRepeat) {
				this.isConfirmPasswordValid = false;
				return false;
			} else {
				this.isConfirmPasswordValid = true;
			}
			this.isEmailValid = true;
			this.isPasswordValid = true;
			return true;
		},
		async register() {
			if (!this.verifyRegister()) {
				return;
			}
			const user = {
				email: this.registerEmail,
				password: this.registerPassword,
			};
			try {
				const response = await Providers.register(user);
				if (response.status === 200) {
					this.$router.push("/login");
				}
			} catch (error) {
				console.error(error);
			}
		},
	},
};
</script>

<style></style>
