<template>
  <div>profile</div>
</template>
<script>
export default {
  name: "profile",
  data() {
    return {
      email: "",
      password: "",
      showPwd: false,
      linkedAccounts: this.$store.state.connected_accounts,
    };
  },
  methods: {
    // TODO: @Samuel GALIERE - Add API call to update user
    updateUser() {
      this.$store.commit("incrementCounter");
      this.$store.commit("updateCurrentUser", {
        email: this.email,
        password: this.password,
      });
    },
    unlinkAccount(provider) {
      this.$store.commit("incrementCounter");
      const account = this.$store.state.connected_accounts.find(
        (account) => account.provider === provider
      );
      this.$store.commit("removeConnectedAccount", account);
    },
    // TODO: @Samuel GALIERE - this is solely for testing purposes
    addAccount() {
      this.$store.commit("incrementCounter");
      this.$store.commit("addConnectedAccount", {
        id: 1,
        provider: "facebook",
        name: "Facebook",
        icon: "facebook",
        connected: true,
        token: "token",
        username: "username",
        email: "zaeoih@zajk.com",
      });
    },
  },
};
</script>
<style></style>
