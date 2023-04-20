<script setup>
import { useMainStore } from "../store/main";

definePageMeta({ middleware: ["auth"] });
const store = useMainStore();
</script>
<template>
	<div :key="reloadKey">
		<div v-for="account in store.accounts" :key="account.provider">
			<TwitterBasicViewer
				v-if="account.provider === 'Twitter'"
				:account="account"
			/>
		</div>
		<div class="main-box max-h-screen flex justify-center">
			<Radar :key="rerenderKey" :data="topics" :options="options" />
		</div>
	</div>
</template>
<script>
import Providers from "../services/providers";
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
	created() {
		this.initData();
	},
	methods: {
		async initData() {
			const store = useMainStore();
			let topicLabels = [];
			let topicData = [];
			const tweetsResponse = await Providers.getHomeTweets(store.token);
			console.log(tweetsResponse);
			if (tweetsResponse.status === 200) {
				const tweets = tweetsResponse.data.data;
				const sanitizedTweetsList = tweets.map((tweet) => {
					return {
						text: tweet.text,
					};
				});
				try {
					const topicResponse = await Providers.getPredictions({
						tweets: sanitizedTweetsList,
					});
					if (topicResponse.status === 200) {
						const topics = topicResponse.data.data;
						console.log(topics);
						topicLabels = Object.keys(topics.global_proba);
						topicData = Object.values(topics.global_proba);
					}
				} catch (error) {
					console.log(error);
					const topics = {
						global_prediction: "CINEMA",
						global_proba: {
							GAMING: 7,
							CINEMA: 8,
							SPORT: 4,
							TECH: 6,
							OTHER: 10,
						},
						data: [],
					};
					topicLabels = Object.keys(topics.global_proba);
					topicData = Object.values(topics.global_proba);
					this.topics.labels = topicLabels;
					this.topics.datasets[0].data = topicData;
					this.rerenderKey++;
				}
			}
		},
	},
	data() {
		return {
			topics: {
				labels: [],
				datasets: [
					{
						label: "Your tweets main topics score",
						backgroundColor: "rgba(255,99,132,0.2)",
						borderColor: "rgba(255,99,132,1)",
						pointBackgroundColor: "rgba(255,99,132,1)",
						pointBorderColor: "#fff",
						pointHoverBackgroundColor: "#fff",
						pointHoverBorderColor: "rgba(255,99,132,1)",
						data: [],
					},
				],
			},
			options: {
				responsive: true,
			},
			rerenderKey: 0,
		};
	},
};
</script>
<style></style>
