<template>
  <div>
    <v-carousel
      v-model="connectionCarouselModel"
      :show-arrows="false"
      hide-delimiter-background
      delimiter-icon="mdi-minus"
    >
      <v-carousel-item v-for="(item, index) in connectionItems" :key="index">
        <v-form v-model="formModel">
          <span class="text-h3">{{ item.title }}</span>
          <v-container grid-list-xs>
            <v-text-field
              v-model="email"
              :rules="item.nameMainBtn === 'Log-in' ? [] : emailRules"
              :required="item.nameMainBtn === 'Log-in' ? false : true"
              label="E-mail"
            ></v-text-field>
            <v-text-field
              v-if="item.nameMainBtn == 'Log-in'"
              v-model="password"
              :append-icon="showPwd ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPwd ? 'text' : 'password'"
              label="Password"
              @click:append="showPwd = !showPwd"
            ></v-text-field>
            <v-text-field
              v-if="item.nameMainBtn == 'Register'"
              v-model="password"
              required
              :rules="passwordRules"
              :append-icon="showPwd ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPwd ? 'text' : 'password'"
              label="Password"
              @click:append="showPwd = !showPwd"
            ></v-text-field>
            <v-text-field
              v-if="item.nameMainBtn == 'Register'"
              v-model="confirmPassword"
              required
              :rules="passwordRules"
              :append-icon="showPwd ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPwd ? 'text' : 'password'"
              label="Confirm Password"
              @click:append="showPwd = !showPwd"
            ></v-text-field>
            <v-btn color="success" @click="item.mainBtnClick">{{
              item.nameMainBtn
            }}</v-btn>
            <v-btn color="secondary" @click="item.secondaryBtnClick">{{
              item.nameSecondBtn
            }}</v-btn>
          </v-container>
        </v-form>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>
<script>
import Api from '../services/providers'
export default {
  name: 'connection',
  data() {
    return {
      connectionCarouselModel: 0,
      showPwd: false,
      formModel: false,
      email: '',
      password: '',
      confirmPassword: '',
      connectionItems: [
        {
          nameMainBtn: 'Log-in',
          nameSecondBtn: 'Register',
          title: 'Welcome back!',
          mainBtnClick: async () => {
            // TODO: @Samuel GALIERE - Add API call to log-in
            const user = await Api.login(this.email, this.password)
            console.log(user)
            this.$store.commit('incrementCounter')
            this.$store.commit('toggleConnection', true)

            this.$store.commit('incrementCounter')
            this.$store.commit('setCurrentUser', {
              email: this.connectionItems[0].email,
              password: this.connectionItems[0].password,
            })
            this.$router.push('/')
          },
          secondaryBtnClick: () => {
            this.connectionCarouselModel++
          },
        },
        {
          nameMainBtn: 'Register',
          nameSecondBtn: 'Log-in',
          title: 'Register now!',
          secondaryBtnClick: () => {
            this.connectionCarouselModel++
          },
          mainBtnClick: () => {
            // TODO: @Samuel GALIERE - Add API call to register
            this.$store.commit('incrementCounter')
            this.$store.commit('toggleConnection', true)

            this.$store.commit('incrementCounter')
            this.$store.commit('setCurrentUser', {
              email: this.connectionItems[0].email,
              password: this.connectionItems[0].password,
            })
            this.$router.push('/')
          },
        },
      ],
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          'E-mail must be valid',
      ],
      passwordRules: [
        (v) => !!v || 'Password is required',
        (v) => (v && v.length >= 6) || 'Password must be at least 6 characters',
        // verify password and confirm password are the same
        (v) =>
          this.connectionItems[1].confirmPassword === v ||
          'Passwords do not match',
      ],
    }
  },
}
</script>
<style></style>
