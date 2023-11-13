import axios from "@/gateway/backendapi";
// import router from "@/router/index"


export default {
    state: {
        userEmail: "",
        onboardingData: {},
        userRole: "",
        userData: {},
        currentUser: {},
        userStartPoint: "",
        settingUserUp: false,
        churchMembers: {},
        smsBalance: 0,
        postToEdit: { },
    },

    mutations: {
    setCurrentUser(state, payload) {
        state.currentUser = payload;
    },
    
    setUserEmail(state, payload) {
      state.userEmail = payload;
    },

    set(state, payload) {
      state.userData = payload;
    },

    setOnboardingData(state, payload) {
      state.onboardingData = payload;
    },

    setStartPoint(state, payload) {
      state.userStartPoint = payload;
    },

    setUserUp(state, payload) {
      state.settingUserUp = payload;
    },

    getMembers(state, payload) {
      state.churchMembers = payload;
    },

    removeSMSUnitCharge(state, payload) {
      console.log();
      if(state.currentUser && state.currentUser.smsBalance){
        state.currentUser.smsBalance = state.currentUser.smsBalance - payload;
      }
      
    },

    addPurchasedUnits(state, payload) {
      state.currentUser.smsBalance = state.currentUser.smsBalance + payload;
    },
    clearCurrentUser(state, payload) {
      state.currentUser = payload
    },
    setPost(state, payload) {
      state.postToEdit = payload
    },

    clearState(state) {
      for (var prop in state) delete state[prop];
    }
  },

  actions: {
    setCurrentUser({ commit }, payload) {
      commit("setCurrentUser", payload)
    },
    clearCurrentUser ({ commit }, payload) {
      commit("clearCurrentUser", payload)
    },
    async getUserData({ commit }) {
      try {
        const res = await axios.get("/api/Membership/GetCurrentSignedInUser");
        commit("setCurrentUser", res.data)
      } catch (err) {
        // eslint-disable-next-line
        NProgress.done();
        console.log(err, "in store");
      }

    },

    // async getMembers({ commit }) {
    //   try {
    //     const res = await axios.get("/api/People/FirstTimer");
    //     commit("setCurrentUser", res.data)
    //   } catch (err) {
    //     console.log(err);
    //   }

    // },

    setUserEmail({ commit }, payload) {
      commit("setUserEmail", payload)
    },

    setUserData({ commit }, payload) {
      commit("setUserData", payload)
    },

    setOnboardingData({ commit }, payload) {
      commit("setOnboardingData", payload)
    },

    setStartPoint({ commit }, payload) {
      commit("setStartPoint", payload)
    },

    setUserUp({ commit }, payload) {
      commit("setUserUp", payload)
    },

    removeSMSUnitCharge({ commit }, payload) {
      commit("removeSMSUnitCharge", payload)
    },

    addPurchasedUnits({ commit }, payload) {
      commit("addPurchasedUnits", payload)
    },

    setPost({ commit }, payload) {
      commit("setPost", payload)
    },

    clearState({ commit }) {
      commit("clearState")
    },
  },

  getters: {
    currentUser: state => state.currentUser,
    userEmail: state => state.userEmail,
    email: state => state.currentUser.email,
    onboardingData: state => state.onboardingData,
    userRole: state => state.userRole,
    userData: state => state.userData,
    initialSignUpDetails: state => state.initialSignUpDetails,
    userStartPoint: state => state.userStartPoint,
    settingUserUp: state => state.settingUserUp,
    smsBalance: state => state.currentUser.smsBalance,
    currency: state => { if (state.currentUser) return state.currentUser.currency },
    postToEdit: state => state.postToEdit,
  },
}