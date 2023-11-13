import axios from "@/gateway/backendapi";
import router from "@/router/index"
import lookupService from '../../services/lookup/lookupservice'


export default {
    namespaced: true,
    state: {
        gender: [],
        maritalStatus: [],
        peopleClassifcations: [],
        userSources: [],
        ageGroups: [],
    },

    mutations: {
        setGenders(state, payload) {
            state.genders = payload;
        },

        setMaritalStatus(state, payload) {
            state.maritalStatus = payload;
        },

        setPeopleClassifcations(state, payload) {
            state.peopleClassifcations = payload;
        },

        setUserSources(state, payload) {
            state.userSources = payload;
        },

        setAgeGroups(state, payload) {
            state.ageGroups = payload;
        },
    },

    actions: {

        async getUser({ commit }) {
            try {
                const res = await axios.get("/api/Membership/GetCurrentSignedInUser");
                commit("setCurrentUser", res.data)
                router.push(`/tenant/${res.data.tenantId}`)
            } catch (err) {
               // eslint-disable-next-line
                NProgress.done();
                console.log(err, "in store");
            }
        },

        setup({ commit }) {
            lookupService.getLookUps()
                .then(res => {
                    commit("setGenders", res.genders);
                    commit("setMaritalStatus", res.maritalStatus);
                })
                .catch(err => {
                    // eslint-disable-next-line
                    NProgress.done();
                    console.log(err);
                })
        },

        setPeopleClassifcations({ commit }, payload) {
            commit("setPeopleClassifiations", payload);
        },

        setUserSources({ commit }, payload) {
            commit("setPeopleClassifiation", payload);
        },

        setAgeGroups({ commit }, payload) {
            commit("setAgeGroups", payload);
        },

        getPeopleClassifications({ commit }) {
            axios.get("/api/Settings/GetTenantPeopleClassification")
                .then((res) => {
                    commit("setPeopleClassifcations", res.data);
                })
                .catch(error => {
                    if (error.response) console.log(error.response)
                    if (!error.response) console.log(error)
                })
        },

        getUserSources({ commit }) {
            axios.get("/api/membership/howyouheardaboutus")
                .then((res) => {
                    const howDidYouAboutUs = res.data.map((i) => {
                        return { name: i.name, id: i.id };
                    });
                    commit("setUserSources", howDidYouAboutUs);

                })
                .catch(error => {
                    if (error.response) console.log(error.response)
                    if (!error.response) console.log(error)
                })
        },

        getAgeGroups({ commit }) {
            axios
                .get("/api/Settings/GetTenantAgeGroups")
                .then((res) => {
                    commit("setAgeGroups", res.data);
                })
                .catch((err) => {
                    console.log(err.response)
                });
        },

    },

    getters: {
        genders: state => state.genders,
        maritalStatus: state => state.maritalStatus,
        peopleClassifications: state => state.peopleClassifcations,
        userSources: state => state.userSources,
        ageGroups: state => state.ageGroups,
    },
}