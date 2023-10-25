import branchService from "../../services/branch/branch"

const defaultState = (() => ({
    currentBranch: {},
    allBranch: [],
}))

export default {
    // state: {
    //     currentBranch: {},
    // },
    namespaced: true,
    state: defaultState(),

    mutations: {
        setCurrentBranch(state, payload) {
            state.currentBranch = payload;
        },

        SET_BRANCH(state, payload) {
            state.allBranch = payload;
        },

        clearState(state) {
            Object.assign(state, defaultState())
        }
    },

    actions: {

        getBranches({ commit }) {
            return branchService.getBranches().then(response => {
                commit('SET_BRANCH', response.returnObject)
                return response.returnObject
            })
        },

        setCurrentBranch({ commit }, payload) {
            commit("setCurrentBranch", payload)
        },

        clearState({ commit }) {
            commit("clearState")
        },
    },

    getters: {
        currentBranch: state => state.currentBranch,
        getbranches: state => state.allBranch,
    },
}