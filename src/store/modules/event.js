import axios from "@/gateway/backendapi";
import eventitems from '../../services/events/eventsservice';


const defaultState = (() => ({
          eventData: {},
          eventList: [],
          reportData: {},
          eventItems : {},
          eventReportSummary : {}
      }))

export default {
  namespaced: true,
  state: defaultState(),
  
  mutations: {
    setEventData(state, payload) {
      state.eventData = payload;
    },
    SET_EVENTITEMS (state, payload) {
      state.eventItems = payload
    },
    SET_EVENTREPORTSUMMARY (state, payload) {
      state.eventReportSummary = payload
    },
    eventList(state, payload) {
      state.eventList = payload
    },
    addEventItem(state, payload) {
      state.eventItems.data.push(payload);
    },
    removeEventItem(state, payload) {
      state.eventItems.data = state.eventItems.data.filter(
        (item) => item.id !== payload
      );
    },
    clearState(state) {
      Object.assign(state, defaultState())
    },
    // clearState(state) {
    //   state.eventData = {}
    //   state.eventList = []
    //   state.reportData = {}
    //   state.geteventitems = {}
    // },

    setReportData(state, payload) {
      state.reportData = payload;
    }
  },

  actions: {
    setEventData({ commit }, payload) {
      commit("setEventData", payload)
    },
    setEventItems ({ commit }) {
      return eventitems.getEventItems().then(response => {  
          commit('SET_EVENTITEMS', response)
          return response
      })
    },
    setEventReportSummary ({ commit }) {
      return eventitems.getEventReportSummary().then(response => {  
          commit('SET_EVENTREPORTSUMMARY', response)
          return response
      })
    },
    removeEventItemFromStore({ commit }, payload) {
      commit("removeEventItem", payload)
  },
  addEventItem({ commit }, payload) {
      commit("addEventItem", payload);
    },
    async eventList({ commit }) {
      try {
        const { data } = await axios.get("/api/EventReports/EventReports?page=1");
        commit("eventList", data);
      } catch (error) {
        console.log(error);
      }
    },
    clearState({ commit }) {
      commit("clearState")
    },

    setReportData({ commit }, payload) {
      commit("setReportData", payload);
    }
  },

  getters: {
    geteventitems: (state) => {
      return state.eventItems
  },
    geteventreportsummary: (state) => {
      return state.eventReportSummary
  },
    eventData: state => state.currentUser,
    eventList: state => state.eventList,
    reportData: state => state.reportData,
  },

}