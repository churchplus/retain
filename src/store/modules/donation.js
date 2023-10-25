import donationTransaction from "../../services/financials/transaction_service"

const defaultState = (() => ({
    donationTransactionList: {},
}))

export default {
  namespaced: true,
  state: defaultState(),

  getters: {
    donationItem: (state) => {
        return state.donationTransactionList
    },
},
  
  mutations: {
    SET_DONATION(state, payload) {
        state.donationTransactionList = payload
      },
    removeDonation(state, payload) {
      state.donationTransactionList = state.donationTransactionList.filter(
        (item) => item.id !== payload
      );
    },
    clearState(state) {
      Object.assign(state, defaultState())
    }

  },
  actions: {
    setDonationTransaction({ commit }) {
        return donationTransaction.getDonationTransaction().then(response => {
            commit('SET_DONATION', response)
          return response
        })
      },
   
    clearState({ commit }) {
      commit('clearState')
    }
  },
}
