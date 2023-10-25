import attendanceservice from '../../services/attendance/attendanceservice';

const defaultState = (() => ({
    attendanceService: {},
    attendanceItemData: { },
    eventRegItemData: { }
}))

export default {
    namespaced: true,
    state: defaultState(),

    // state: {
        
    // },

    mutations: {
        setItemData(state, payload) {
            state.attendanceItemData = payload;
        },
        SET_ATTENDANCEDATA (state, payload) {
            state.attendanceService = payload
        },
        
        setEventReg(state, payload) {
            state.eventRegItemData = payload;
        },
        removeAttendance(state, payload) {
            state.attendanceService.data = state.attendanceService.data.filter(
              (item) => item.id !== payload
            );
          },
          addAttendanceCheckin(state, payload) {
            state.attendanceService.data.push(payload);
          },

        // clearState(state) {
        //     for (var prop in state) delete state[prop];
        // }
        clearState(state) {
            Object.assign(state, defaultState())
          }
    },

    actions: {
        setItemData({ commit }, payload) {
          commit("setItemData", payload)
        },
        
        setEventReg({ commit }, payload) {
          commit("setEventReg", payload)
        },
        setAttendanceItemData ({ commit }) {
            return attendanceservice.getItems().then(response => {  
                commit('SET_ATTENDANCEDATA', response)
                return response
            })
        },
        removeAttendanceFromStore({ commit }, payload) {
            commit("removeAttendance", payload)
        },
        addAttendanceCheckin({ commit }, payload) {
            commit("addAttendanceCheckin", payload);
          },

        clearState({ commit }) {
            commit("clearState")
        },
    },

    getters: {
        attendanceserviceitem: (state) => {
            return state.attendanceService
        },
        attendanceItemData: state => state.attendanceItemData,
        eventRegItemData: state => state.eventRegItemData
    },
}