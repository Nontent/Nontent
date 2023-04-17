<script setup>
import { useMainStore } from "../store/main";
definePageMeta({ middleware: ["auth"] });
const store = useMainStore();
</script>
<template>
	<div>
		<div v-for="account in store.accounts" :key="account.provider">
			<TwitterBasicViewer
				v-if="account.provider === 'Twitter'"
				:account="account"
			/>
		</div>
		<div class="main-box max-h-screen flex justify-center">
			<Radar :data="data" :options="options" />
		</div>
	</div>
</template>
<script>
import {
	Chart as ChartJS,
	RadialLinearScale,
	PointElement,
	LineElement,
	Filler,
	Tooltip,
	Legend,
} from "chart.js";

ChartJS.register(
	RadialLinearScale,
	PointElement,
	LineElement,
	Filler,
	Tooltip,
	Legend
);

import { Radar } from "vue-chartjs";
export default {
	name: "SocialReports",
	components: {
		Radar,
	},
	data() {
		return {
			data: {
				labels: ["Happy", "Sad", "Funny", "Angry", "Sport", "Other"],
				datasets: [
					{
						label: "Your latest tweets sentiments",
						backgroundColor: "rgba(255,99,132,0.2)",
						borderColor: "rgba(255,99,132,1)",
						pointBackgroundColor: "rgba(255,99,132,1)",
						pointBorderColor: "#fff",
						pointHoverBackgroundColor: "#fff",
						pointHoverBorderColor: "rgba(255,99,132,1)",
						data: [0.5, 0.78, 0.89, 0.12, 0.23, 0.43],
					},
				],
			},
			options: {
				responsive: true,
			},
		};
	},
};
</script>
<style></style>
