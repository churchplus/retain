import dashboard from "../../services/dashboard/dashboard";
import useSubscription from "../../services/subscription/useSubscription";

const defaultState = (() => ({
    dashboard: {},
    hasMobileApp: false,
    hasOnlineGiving: false,
    hasWebsite: false,
    celebrations: [],
    subPlan: {}
}))

export default {
    namespaced: true,
    state: defaultState(),
    mutations: {
        SET_DASHBOARD (state, payload) {
            state.dashboard = payload
            state.hasMobileApp = payload.hasMobileApp
            state.hasOnlineGiving = payload.hasOnlineGiving
            state.hasWebsite = payload.hasWebsite
        },
        SET_CELEBRATION (state, payload) {
            state.celebrations = payload
        },
        SET_SUBPLAN (state, payload) {
            state.subPlan = payload
        },
        clearState(state) {
            Object.assign(state, defaultState())
          }
    },
    actions: {
        getDashboard ({ commit }) {
            return dashboard.getDashboard().then(response => {  
                commit('SET_DASHBOARD', response.returnObject)
                return response.returnObject
            })
        },
        getCelebration ({ commit }) {
            return dashboard.getCelebrations().then(response => {  
                commit('SET_CELEBRATION', response.returnObject.celebrations)
                return response.returnObject.celebrations
            })
        },
        getUserSubscriptionPlan ({ commit }) {
            return useSubscription.getPlan().then(response => {  
                commit('SET_SUBPLAN', response)
                return response
            })
        },
        clearState ({ commit }) {
            commit('clearState')
        }
    },
    getters: {
        getdashboard: (state) => {
            return state.dashboard
        },
        getcelebration: (state) => {
            return state.celebrations
        },
        hasMobileApp: (state) => {
            return state.hasMobileApp
        },
        hasOnlineGiving: (state) => {
            return state.hasOnlineGiving
        },
        hasWebsite: (state) => {
            return state.hasWebsite
        },
        getSubPlan: (state) => {
            return state.subPlan
        },
    }
}
