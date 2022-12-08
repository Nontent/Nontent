<template>
	<div class="flex h-screen">
		<div class="grow self-center mb-20">
			<h1 class="flex justify-center font-bold mt-11 text-5xl mb-11">
				nontent.
			</h1>
			<div class="input-form-box mb-11">
				<input
					id="register_email"
					type="text"
					class="outline-none w-full"
					placeholder="EMAIL"
				/>
			</div>
			<div class="input-form-box mb-11">
				<input
					id="register_password"
					type="text"
					class="outline-none w-full"
					placeholder="PASSWORD"
				/>
			</div>
			<div class="input-form-box">
				<input
					id="register_password_repeat"
					type="text"
					class="outline-none w-full"
					placeholder="CONFIRM PASSWORD"
				/>
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
					<div class="drop-shadow-box"></div>
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
					<div class="drop-shadow-box"></div>
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
	methods: {
		toLogin() {
			this.$router.push("/login");
		},
		async register() {
			const email = document.getElementById("register_email").value;
			const password = document.getElementById("register_password").value;
			const user = {
				email: email,
				password: password,
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
