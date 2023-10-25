
export default {
    state: {
        mobileAppUsersData: {
            "churchAppBackgroundColor": "string",
            "services": "string",
            "pastors": [
              {
                "name": "string",
                "bio": "string",
                "level": "string",
                "branch": "string",
                "socialMedia": [
                  {
                    "name": "string",
                    "profileUrl": "string"
                  }
                ]
              }
            ],
            "customAbouts": [
              {
                "title": "string",
                "details": "string",
                "order": 0
              }
            ],
            "banks": [
              {
                "bankName": "string",
                "accountName": "string",
                "accountNumber": "string",
                "bankLogoUrl": "string"
              }
            ],
          },
          formData: new FormData()
    },

    mutations: {
        setChurchProfileData(state, payload) {
            state.formData.append("churchName", payload.name)
            state.formData.append("address", payload.address)
            state.formData.append("phoneNumber", payload.phoneNumber)
            state.formData.append("abouts", payload.abouts)
            state.formData.append("pastors", payload.pastor)
            state.formData.append("logo", payload.logo)
        },

        setSocialMediaData(state, payload) {
            state.formData.append("churchSocialMedia", payload)
        },

        setChurchAppBackgroundColor(state, payload) {
            state.formData.append("churchAppBackgroundColor", payload)
        },

        completeSetUp(state, payload) {
            state.formData.append("banks", payload)
        }


    },

    actions: {
        setChurchProfileData({ commit }, payload) {
          commit("setChurchProfileData", payload)
        },

        setSocialMediaData({ commit }, payload) {
          commit("setSocialMediaData", payload)
        },

        setChurchAppBackgroundColor({ commit }, payload) {
          commit("setChurchAppBackgroundColor", payload)
          console.log(payload);
        },

        completeSetUp({ commit }, payload) {
          commit("completeSetUp", payload)
          console.log(payload);
        },
    },

    getters: {
        mobileAppUsersData: state => state.mobileAppUsersData,
        formData: state => state.formData,
    },
}