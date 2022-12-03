<template>
	<div class="flex h-screen">
		<div class="grow self-center mb-20">
			<h1 class="flex justify-center font-bold mt-11 text-5xl mb-11">
				nontent.
			</h1>
			<div class="input-form-box mb-11">
				<label for="email"></label
				><input
					id="email"
					type="text"
					class="outline-none w-full"
					placeholder="EMAIL"
				/>
			</div>
			<div class="input-form-box">
				<label for="email"></label
				><input
					id="email"
					type="text"
					class="outline-none w-full"
					placeholder="PASSWORD"
				/>
			</div>
			<div class="flex justify-center">
				<div class="group mt-11">
					<button
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
		login() {
			this.store.connected = true;
			this.$router.push("/");
		},
	},
};
</script>

<style></style>
