export const state = () => (
  {
	isConnected: false,
	currentUser: {},
	connected_accounts: [],
});

export const mutations = {
	initialiseStore(state) {
		// Check if the store has already been initialized.
		if (localStorage.getItem('store')) {
			// Replace the state object with the stored state.
			this.replaceState(
				Object.assign(state, JSON.parse(localStorage.getItem('store')))
			);
		}
	},

	toggleConnection(state, isConnected) {
		state.isConnected = isConnected;
	},


}