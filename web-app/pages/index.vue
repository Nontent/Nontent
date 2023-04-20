<script setup>
import { useMainStore } from "../store/main";
definePageMeta({ middleware: ["auth"] });
const store = useMainStore();
const token = useCookie("nontentToken");
token.value = store.token;
const userId = useCookie("nontentUserId");
userId.value = store.user.id;
</script>
<template>
	<div>
		<TextCard :title="mainContainerTitle" :content="mainContainerContent" />
		<div class="main-box">
			<span class="text-lg my-5">Your pinned profile</span>
			<div
				v-if="
					Object.keys(store.pinnedAccount).length === 0 &&
					store.accounts.length > 0
				"
				class="flex justify-center h-5/6 my-3"
			>
				<div class="text-md font-light italic self-center">
					That's so sad, this is a bit empty here. :( <br />
					Please pin a profile to see it here.
				</div>
			</div>
			<TwitterBasicViewer
				v-if="store.pinnedAccount.provider === 'Twitter'"
				:account="store.pinnedAccount"
				class="border-0"
			/>
			<div class="flex justify-center mt-2">
				<div
					class="mr-4"
					v-if="
						!store.accounts.some(
							(account) => account.provider == 'Twitter'
						)
					"
				>
					<TwitterConnection />
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: "home",
	data() {
		return {
			mainContainerTitle: "Welcome to nontent!",
			mainContainerContent:
				" On this page you will be able to see your overall information about the different social profile you have connected.",
		};
	},
};
</script>

<style>
html { 
	overflow-y: scroll;
	min-height: 100%;
}
::-webkit-scrollbar {
  width: 8px; /* 1px wider than Lion. */
  /* This is more usable for users trying to click it. */
}
/* hover effect for both scrollbar area, and scrollbar 'thumb' */
::-webkit-scrollbar:hover {
  background-color: rgba(0, 0, 0, 0.09);
}

/* The scrollbar 'thumb' ...that marque oval shape in a scrollbar */
::-webkit-scrollbar-thumb:vertical {
  /* This is the EXACT color of Mac OS scrollbars. 
     Yes, I pulled out digital color meter */
  background: rgba(0,0,0,0.5);
  -webkit-border-radius: 100px;
}
::-webkit-scrollbar-thumb:vertical:active {
  background: rgba(0,0,0,0.61); /* Some darker color when you click it */
  -webkit-border-radius: 100px;
}


</style>
