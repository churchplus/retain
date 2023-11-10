import allFamilies from "../../services/membership/membershipservice"

const defaultState = (() => ({
  allFamilies: [],
}))

export default {
  namespaced: true,
  state: defaultState(),

  getters: {
    allFamilies: state => state.allFamilies,
  },

  mutations: {
    setAllFamilies(state, payload) {
      state.allFamilies = payload
    },
    removeFamily(state, payload) {
      state.allFamilies = state.allFamilies.filter(
        (item) => item.id !== payload
      );
    },
    addFamily(state, payload) {
      state.allFamilies.push(payload);
    },

    clearState(state) {
      Object.assign(state, defaultState())
    }

  },


  actions: {
    getAllFamilies({ commit }) {
      return allFamilies.getAllFamilies().then(response => {
        commit("setAllFamilies", response)
        return response
      })
    },
    removeFamilyFromStore({ commit }, payload) {
      commit("removeFamily", payload)
    },

    addFamily({ commit }, payload) {
      commit("addFamily", payload);
    },
    clearState({ commit }) {
      commit('clearState')
    }
  },
}
