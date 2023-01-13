<template>
	<div>
		<div class="main-box relative z-0">
			<div class="text-xl mb-4 font-semibold">Your profile</div>
			<div class="input-form-box mb-8">
				<input
					id="email_settings"
					type="text"
					class="outline-none w-full disabled:opacity-40"
					placeholder="EMAIL"
					disabled
				/>
			</div>
			<div class="input-form-box mb-8">
				<input
					id="password_settings"
					type="text"
					class="outline-none w-full disabled:opacity-40"
					placeholder="PASSWORD"
					disabled
				/>
			</div>
			<div class="flex justify-center">
				<div class="group">
					<button
						disabled
						id="update_button"
						type="button"
						@click="register"
						class="btn bg-amber-500 group-hover:bg-amber-600 disabled:opacity-40"
					>
						Save
					</button>
					<button disabled class="drop-shadow-box"></button>
				</div>
			</div>
			<div class="text-xl mb-4 font-semibold mt-4">
				Your connected accounts
			</div>
			<div
				v-for="account in store.accounts"
				:key="account"
				class="grid grid-cols-3 gap-4 my-2 mx-4 place-items-center"
			>
				<div>
					<Icon
						:name="
							'mingcute:' +
							account.provider.toLowerCase() +
							'-line'
						"
						class="w-8 h-8"
						color="#FFB100"
					/>
					<span class="text-md mx-2">{{ account.userId }}</span>
				</div>
				<div v-if="account.connected" class="text-green-800 font-bold">
					connected
				</div>
				<div class="group">
					<button
						:id="'disconnect_button' + account.provider"
						type="button"
						@click="disconnect(account)"
						class="btn bg-amber-500 group-hover:bg-amber-600"
					>
						Disconnect
					</button>
					<div class="invisible md:visible drop-shadow-box"></div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { useMainStore } from "../store/main";

definePageMeta({
	middleware: "auth",
});

export default {
	name: "Settings",
	middleware: "auth",
	setup() {
		const store = useMainStore();

		function disconnect(account) {
			store.increment();
			store.removeAccount(account);
		}

		return { store, disconnect };
	},
};
</script>
<style></style>
