<template>
	<div class="flex h-screen">
		<div class="grow self-center mb-20">
			<h1 class="flex justify-center font-bold mt-11 text-5xl mb-11">
				nontent.
			</h1>
			<div class="input-form-box mb-11">
				<input
					id="email_login"
					type="text"
					class="outline-none w-full"
					placeholder="EMAIL"
				/>
			</div>
			<div class="input-form-box">
				<input
					id="password_login"
					type="text"
					class="outline-none w-full"
					placeholder="PASSWORD"
				/>
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
					<div class="drop-shadow-box"></div>
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
					<div class="drop-shadow-box"></div>
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
	methods: {
		toRegister() {
			this.$router.push("/register");
		},
		async login() {
			const email = document.getElementById("email_login").value;
			const password = document.getElementById("password_login").value;
			const user = { email: email, password: password };
			try {
				const response = await Providers.login(user);
				if (response.status === 200) {
					this.store.increment();
					this.store.token = response.data.token;
					this.store.increment();
					this.store.userId = response.data.userId;
					this.store.increment();
					this.store.connected = true;
					this.$router.push("/");
					this.store.increment();
					this.store.addAccount({
						userId: "@" + response.data.userId,
						provider: "Twitter",
						profileId: response.data.userId,
						followers: "157",
						subs: "1249",
					});
					this.store.increment();
					this.store.addAccount({
						userId: "@" + response.data.userId,
						provider: "Reddit",
						profileId: response.data.userId,
						subReddits: "45",
						posts: "1249",
						upvotes: "15472",
					});
				}
			} catch (error) {
				console.error(error);
			}
		},
	},
};
</script>

<style></style>
