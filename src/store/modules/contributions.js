import axios from "@/gateway/backendapi";
import contributionservice from  "../../services/financials/contributionservice"

const defaultState = (() => ({
    contributionList: [],
    contributionsList: {},
    contributionsItem: [],
    contributionItems: [],
    paymentData: {}
}))

export default {
    namespaced: true,
    state: defaultState(),
    // state: {
    //     contributionList: [],
    //     contributionItems: [],
    //     paymentData: {}
    // }
    mutations: {
        SET_CONTRIBUTION (state, payload) {
            state.contributionsList = payload
        },
        SET_CONTRIBUTIONITEM (state, payload) {
            state.contributionsItem = payload
        },
        saveList(state, payload) {
            state.contributionList = payload.data
        },
        contributionItems(state, payload) {
            state.contributionItems = payload
        },
        paymentData(state, payload) {
            state.paymentData = payload
        },
        newlyAddedContribution(state, payload) {
            payload.forEach(i => state.contributionList.unshift(i))
        },
        removeContribution(state, payload) {
            state.contributionsList = state.contributionsList.filter(
              (item) => item.id !== payload
            );
          },
        addContribution(state, payload) {
            state.contributionsList.push(payload);
        },
        removeContributionItem(state, payload) {
            state.contributionsItem = state.contributionsItem.filter(
                (item) => item.id !== payload
            );
            },
        addContributionItem(state, payload) {
        state.contributionsItem.push(payload);
        },

        // clearState(state) {
        //     state.contributionList = []
        //     state.contributionItems = []
        //     state.paymentData = {}
        // }
        clearState(state) {
            Object.assign(state, defaultState())
          }
    },
    actions: {
        setContributionList ({ commit }) {
            return contributionservice.getContributionList().then(response => {  
                commit('SET_CONTRIBUTION', response)
                return response
            })
        },
        setContributionItem ({ commit }) {
            return contributionservice.getContributionItem().then(response => {  
                commit('SET_CONTRIBUTIONITEM', response)
                return response
            })
        },

        removeContributionFromStore({ commit }, payload) {
            commit("removeContribution", payload)
        },
        addContribution({ commit }, payload) {
            commit("addContribution", payload);
          },
        removeContributionItemFromStore({ commit }, payload) {
            commit("removeContributionItem", payload)
        },
        addContributionItem({ commit }, payload) {
            commit("addContributionItem", payload);
          },

        async contributionList({ commit }) {
                try {
                    const { data } = await axios.get("/api/Financials/Contributions/Transactions?page=1");
                    commit("saveList", data);
                } catch (error) {
                    console.log(error);
                }
        },
        async contributionItems({ commit }) {
            try {
                const { data } = await axios.get("/api/financials/contributions/items");
                commit("contributionItems", data)
            } catch (error) {
                console.log(error)
            }
        },
         paymentData({ commit }, payload) {
            commit("paymentData", payload)
        },
         newlyAddedContribution({ commit }, payload) {
            commit("newlyAddedContribution", payload)
        },
        clearState({ commit }) {
            commit("clearState")
        },
    },
    getters: {
        contributionList: state => state.contributionList, 
        contributionItems: state => state.contributionItems,
        paymentData: state => state.paymentData,
        contributionsList: (state) => {
            return state.contributionsList
        },
        contributionsItem: (state) => {
            return state.contributionsItem
        },
    },
}