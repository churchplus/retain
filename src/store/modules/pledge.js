import pledge from "../../services/pledgemodule/pledgemodule";

const defaultState = (() => ({
    pledge: [],
    pledgeSummary: {},
    pledgeDefinition: []
}))

export default {
    namespaced: true,
    state: defaultState(),
    mutations: {
        SET_PLEDGE (state, payload) {
            state.pledge = payload
        },
        SET_PLEDGESUMMARY (state, payload) {
            state.pledgeSummary = payload
        },
        SET_PLEDGEDEFINITION (state, payload) {
            state.pledgeDefinition = payload
        },

        addPledge(state, payload) {
            state.pledge.push(payload);
          },
        addPledgeItem(state, payload) {
            state.pledgeDefinition.push(payload);
          },
        removePledge(state, payload) {
        state.pledge = state.pledge.filter(
            (item) => item.id !== payload
        );
        },
        removePledgeItem(state, payload) {
        state.pledgeDefinition = state.pledgeDefinition.filter(
            (item) => item.id !== payload
        );
        },
        clearState(state) {
            Object.assign(state, defaultState())
          }
    },
    actions: {
        getPledges ({ commit }) {
            return pledge.getPledges().then(response => {  
                commit('SET_PLEDGE', response.returnObject)
                return response.returnObject
            })
        },
        getPledgeSummary ({ commit }) {
            return pledge.getPledgeSummary().then(response => {  
                commit('SET_PLEDGESUMMARY', response.returnObject)
                return response.returnObject
            })
        },
        getPledgeDefinition ({ commit }) {
            return pledge.getPledgeDefinition().then(response => {  
                commit('SET_PLEDGEDEFINITION', response.returnObject)
                return response.returnObject
            })
        },
        addPledge({ commit }, payload) {
            commit("addPledge", payload);
          },
        addPledgeItem({ commit }, payload) {
        commit("addPledgeItem", payload);
        },
        removePledgeFromStore ({ commit }, payload) {
            commit("removePledge", payload)
        },
        removePledgeItemFromStore ({ commit }, payload) {
            commit("removePledgeItem", payload)
        },

        clearState ({ commit }) {
            commit('clearState')
        }
    },
    getters: {
        getpledges: (state) => {
            return state.pledge
        },
        getpledgesummary: (state) => {
            return state.pledgeSummary
        },
        getpledgedefinition: (state) => {
            return state.pledgeDefinition
        },
    }

}