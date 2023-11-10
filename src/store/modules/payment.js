import paymentService from "../../services/financials/paymentservice";

const defaultState = (() => ({
    payment: []
}))

export default {
    namespaced: true,
    state: defaultState(),
    mutations: {
        SET_PAYMENT (state, payload) {
            state.payment = payload
        },

        addPayment(state, payload) {
            state.payment.push(payload);
          },
        removePaymentItem(state, payload) {
        state.payment = state.payment.filter(
            (item) => item.id !== payload
        );
        },
        clearState(state) {
            Object.assign(state, defaultState())
          }
    },
    actions: {
        getPayments ({ commit }) {
            return paymentService.getPayments().then(response => {  
                commit('SET_PAYMENT', response)
                return response
            })
        },
        addPayment({ commit }, payload) {
            commit("addPayment", payload);
          },
        removePaymentFromStore ({ commit }, payload) {
            commit("removePaymentItem", payload)
        },
        

        clearState ({ commit }) {
            commit('clearState')
        }
        
    },
    getters: {
        getpayments: (state) => {
            return state.payment
        },
    }

}