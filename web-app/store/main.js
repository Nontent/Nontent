import { useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";

export const useMainStore = defineStore('main', {
	  state: () => ({
			counter: 0,
			connected: useLocalStorage('connected', false),
			accounts: useLocalStorage('accounts', []),
			token: useLocalStorage('token', ''),
	  }),

	  getters: {
			getConnected: (state) => state.connected,

			getAccounts: (state) => state.accounts,

			getToken: (state) => state.token,

			getCounter: (state) => state.counter,

	  },

	  actions: {
			setConnected: (state, connected) => {
				  state.connected = connected;
			},

			setAccounts: (state, accounts) => {
				  state.accounts = accounts;
			},

			setToken: (state, token) => {
				  state.token = token;
			},

			reset() {
				  this.counter = 0;
			},

			increment() {
				  this.counter++;
			},

		},
});