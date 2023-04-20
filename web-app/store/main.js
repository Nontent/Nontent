import * as core from "@vueuse/core";
import { defineStore } from "pinia";

export const useMainStore = defineStore('main', {
	  state: () => ({
			counter: 0,
			connected: core.useLocalStorage('connected', false),
			accounts: core.useLocalStorage('accounts', []),
			token: core.useLocalStorage('token', ''),
			user: core.useLocalStorage('user', { "id": "", "email": "" }),
			pinnedAccount: core.useLocalStorage('pinnedAccount', {}),
	  }),

	  getters: {
			getConnected: (state) => state.connected,

			getAccounts: (state) => state.accounts,

			getToken: (state) => state.token,

			getCounter: (state) => state.counter,
			
			getUser: (state) => state.user,
	  },

	  actions: {

			reset() {
				  this.counter = 0;
			},

			increment() {
				  this.counter++;
			},

			addAccount(account) {
				  this.accounts.push(account);
			},

			removeAccount(account) {
				if (account === this.pinnedAccount) {
					this.pinnedAccount = {};
				}
				this.accounts.splice(this.accounts.indexOf(account), 1);

			},

			setUserId(userId) {
				this.user.id = userId;
			},

			setEmail(email) {
				this.user.email = email;
			},

			logout() {
				  this.connected = false;
				  this.accounts = [];
				  this.token = '';
				  this.email = '';
				  this.pinnedAccount = {};
			}
		},
});