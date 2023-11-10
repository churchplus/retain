// import axios from "@/gateway/backendapi";

export default {
    state: {
        getRates: []

    },
    getters: {
        getRates: state => state.getRates, 

    },
    mutations: {
        getRates(state, payload) {
            state.getRates = payload
        },
        
    },
    actions: {
        getRates ({ commit }, payload) {
            commit("getRates", payload)
        }
    }
}