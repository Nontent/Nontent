<template>
    <div class="text-display mb-6">
      <h3 class="text-xl font-semibold mb-2">{{ cluster.title }}</h3>
      <p class="text-base mb-1">Cluster Number: {{ cluster.cluster }}</p>
      <p class="text-base mb-1">{{ cluster.description }}</p>
      <p class="text-base mb-1">Count: {{ cluster.count }}</p>
    </div>
  </template>
  
  <script>
  import TextDisplay from '@/components/TextDisplay.vue';

export default {
  components: {
    TextDisplay
  },
  data() {
    return {
      top_clusters: [
        {
          cluster: 5,
          title: "Public Opinion",
          description: "This cluster involves various topics of interest, public sentiment, and social media engagement. The political compass orientation of your tweets can range from left-wing to right-wing, and from authoritarian to libertarian, depending on the opinions expressed. By mainly interacting with this cluster, you might be missing opposing viewpoints or alternative perspectives on public opinion and social media's influence on society.",
          count: 4
        } // UNRECORD
      ]
    }
  }
}
  </script>