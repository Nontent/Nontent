<template>
  <div>
    <NavBar />
    <Nuxt />
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
export default {
  name: "DefaultLayout",
  components: { NavBar },
  mounted() {
    this.$store.subscribe((mutation, state) => {
      localStorage.setItem("store", JSON.stringify(state));
    });
  },
  beforeCreate() {
    this.$store.commit("incrementCounter");
    this.$store.commit("initialiseStore");
  },
};
</script>
