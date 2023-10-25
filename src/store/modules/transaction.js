import transactionService from "../../services/financials/transaction_service";

const defaultState = (() => ({
    transaction: [],
}))

export default {
    namespaced: true,
    state: defaultState(),
    mutations: {
        SET_TRANSACTION (state, payload) {
            state.transaction = payload
        },

        addTransaction(state, payload) {
            state.transaction.push(payload);
          },
        removeTransaction(state, payload) {
        state.transaction.records = state.transaction.records.filter(
            (item) => item.id !== payload
        );
        },
        clearState(state) {
            Object.assign(state, defaultState())
          }
    },
    actions: {
        getTransaction ({ commit }) {
            return transactionService.getTransactions().then(response => {  
                commit('SET_TRANSACTION', response)
                return response
            })
        },
        addTransaction({ commit }, payload) {
            commit("addTransaction", payload);
          },
          removeTransactionFromStore ({ commit }, payload) {
            commit("removeTransaction", payload)
        },

        clearState ({ commit }) {
            commit('clearState')
        }
    },
    getters: {
        gettransactions: (state) => {
            return state.transaction
        },
    }

}