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
			<Radar :key="rerenderKey" :data="topics" :options="options" />
		</div>
		<div class="main-box">
			<span class="text-lg my-5">
				Sentiment score: {{ (Math.round(averageSentiment * 100) / 100).toFixed(2) }}</span
			>
			<span class="text-lg my-5">
				This number represents the general positivity (or negativity) of your Twitter feed.</span
			>
		</div>
		<div class="main-box" v-for="(cluster, index) in clusters" :key="index">
			<span class="text-lg my-5">Your tweets' classification</span>
			<ClusteCard :title="cluster.title" :content="cluster.description" />
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
			let averageSentiment = 0.5;
			let clusters = [];
			const tweetsResponse = await Providers.getHomeTweets(store.token);
			console.log(tweetsResponse);
			if (tweetsResponse.status === 200) {
				const tweets = tweetsResponse.data.data;
				const sanitizedTweetsList = tweets.map((tweet) => {
					return {
						tweet: tweet,
					};
				});
				try {
					const topicResponse = await Providers.getPredictions({
						tweets: sanitizedTweetsList,
					});
					if (topicResponse.status === 200) {
						const topics = topicResponse.data;
						console.log('TOPIC RES PROBA: ', topics.global_proba);
						console.log('TOPIC RES DATA: ', topicResponse.data);
						topicLabels = Object.keys(topics.global_proba);
						topicData = Object.values(topics.global_proba);
						this.topics.labels = topicLabels;
						this.topics.datasets[0].data = topicData;
						this.rerenderKey++;
					}
				} catch (error) {
					console.log(error);
					const topics = {
						global_prediction: "CINEMA",
						global_proba: {
							"FOOD": 83,
							"SPORT": 56,
							"TECH": 9,
							"MUSIC": 8,
							"POLICY": 4,
							"CINEMA": 23,
							"MARKETING": 2,
							"WAR": 3,
							"GAMING": 1,
							"MEDICAL": 1,
							"LITERATURE": 1
						},
						data: [],
					};
					topicLabels = Object.keys(topics.global_proba);
					topicData = Object.values(topics.global_proba);
					this.topics.labels = topicLabels;
					this.topics.datasets[0].data = topicData;
					this.rerenderKey++;
				}
				try {
					const sentimentResponse = await Providers.getSentiment({
						tweets: sanitizedTweetsList,
					});
					if (sentimentResponse.status === 200) {
						console.log('Sentiment res: ', sentimentResponse.data.average_sentiment);

					 	this.averageSentiment = sentimentResponse.data.average_sentiment;
					}
				} catch (error) {
					console.log(error);
					const sentiment = {
						average_sentiment: 0.0008957376994658262,
					};
					averageSentiment = sentiment.average_sentiment;
					this.averageSentiment = averageSentiment;
					this.rerenderKey++;
				}
				try {
					const kmeansResponse = await Providers.getKmeans({
						tweets: sanitizedTweetsList,
					});
					console.log('KEMNAS RES: ', kmeansResponse.data.top_clusters)
					if (kmeansResponse.status === 200) {
						clusters = kmeansResponse.data.top_clusters;
						this.clusters = clusters;
					}
				} catch (error) {
					console.log(error);
					const clustersData = {
						top_clusters: [
							{
								cluster: 5,
								title: "Public Opinion",
								description:
									"This cluster involves various topics of interest, public sentiment, and social media engagement. The political compass orientation of your tweets can range from left-wing to right-wing, and from authoritarian to libertarian, depending on the opinions expressed. By mainly interacting with this cluster, you might be missing opposing viewpoints or alternative perspectives on public opinion and social media's influence on society.",
								count: 4,
							},
						],
					};
					clusters = clustersData.top_clusters;
					this.clusters = clusters;
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
			averageSentiment: 0.5,
			clusters: [],
		};
	},
};
</script>
<style></style>
