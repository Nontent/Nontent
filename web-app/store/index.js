export const state = () => ({
  count: 0,
  isConnected: false,
  currentUser: {},
  connected_accounts: [],
})

export const mutations = {
  incrementCounter(state) {
    state.count++
  },

  initialiseStore(state) {
    // Check if the store has already been initialized.
    if (localStorage.getItem('store')) {
      // Replace the state object with the stored state.
      this.replaceState(
        Object.assign(state, JSON.parse(localStorage.getItem('store')))
      )
    }
  },

  // -------------------------------------------------
  // isConnected
  // set the connected status
  toggleConnection(state, isConnected) {
    state.isConnected = isConnected
  },

  // -------------------------------------------------
  // currentUser
  // set the current user
  setCurrentUser(state, user) {
    state.currentUser = user
  },

  // remove the current user
  removeCurrentUser(state) {
    state.currentUser = {}
    state.isConnected = false
    state.connected_accounts = []
  },

  // update the current user
  updateCurrentUser(state, user) {
    state.currentUser = user
  },

  // -------------------------------------------------
  // connected_accounts
  // add a new connected account to the list
  addConnectedAccount(state, account) {
    state.connected_accounts.push(account)
  },

  // remove a connected account from the list
  removeConnectedAccount(state, account) {
    state.connected_accounts.splice(
      state.connected_accounts.indexOf(account),
      1
    )
  },

  // empty the connected accounts list
  clearConnectedAccounts(state) {
    state.connected_accounts = []
  },
}
