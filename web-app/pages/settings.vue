<script setup>
definePageMeta({ middleware: ["auth"] });
</script>
<template>
	<div>
		<div class="main-box relative z-0">
			<div class="text-xl mb-4 font-semibold">Your profile</div>
			<div class="input-form-box mb-8">
				<input
					id="email"
					type="text"
					class="outline-none w-full"
					placeholder="EMAIL"
				/>
			</div>
			<div class="input-form-box mb-8">
				<input
					id="email"
					type="text"
					class="outline-none w-full"
					placeholder="PASSWORD"
				/>
			</div>
			<div class="flex justify-center">
				<div class="group">
					<button
						type="button"
						@click="register"
						class="btn bg-amber-500 group-hover:bg-amber-600"
					>
						Save
					</button>
					<div class="drop-shadow-box"></div>
				</div>
			</div>
			<div class="text-xl mb-4 font-semibold mt-4">
				Your connected accounts
			</div>
			<div
				v-for="account in connectedAccounts"
				:key="account"
				class="grid grid-cols-3 gap-4 my-2 mx-4 place-items-center"
			>
				<div>
					<Icon
						:name="account.icon"
						class="w-8 h-8"
						:color="account.color"
					/>
					<span class="text-md mx-2">{{ account.name }}</span>
				</div>
				<div v-if="account.connected" class="text-green-800 font-bold">
					connected
				</div>
				<div v-else class="text-red-800 font-bold">disconnected</div>
				<div v-if="account.connected" class="group">
					<button
						type="button"
						@click="register"
						class="btn bg-amber-500 group-hover:bg-amber-600"
					>
						Disconnect
					</button>
					<div class="drop-shadow-box"></div>
				</div>
				<div v-else class="group">
					<button
						type="button"
						@click="register"
						class="btn bg-amber-500 group-hover:bg-amber-600"
					>
						Connect
					</button>
					<div class="drop-shadow-box"></div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: "Settings",
	data() {
		return {
			connectedAccounts: [
				{
					name: "@YoutubeAccount",
					icon: "mingcute:youtube-line",
					color: "red",
					connected: false,
				},
				{
					name: "@RedditAccount",
					icon: "mingcute:reddit-line",
					color: "#FF4500",
					connected: true,
				},
				{
					name: "@TwitterAccount",
					icon: "mingcute:twitter-line",
					color: "#1DA1F2",
					connected: true,
				},
			],
		};
	},
};
</script>
<style></style>
