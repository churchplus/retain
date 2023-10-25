import axios from "@/gateway/backendapi";
import store from '../../store/store'
// import { useStore } from 'vuex';

// const store = useStore();

const lookupService = {
    lookupsSetUp() {
        try {
            this.getPeopleClassifications();
        } catch (error) {
            console.log(error);
        }
        try {
            this.getAgeGroups();
        } catch (error) {
            console.log(error);
        }
    },

    getPeopleClassifications() {
        return new Promise((resolve, reject) => {
            axios
                .get("/api/Settings/GetTenantPeopleClassification")
                .then((res) => {
                    store.dispatch("lookups/setPeopleClassifcations", res.data);
                    resolve(res.data)
                })
                .catch((err) => {
                    reject(err)
                    console.log(err.response)
                });
        })

    },

    getUserSource() {
        return new Promise((resolve, reject) => {
            axios.get("/api/membership/howyouheardaboutus").then((res) => {
                const howDidYouAboutUs = res.data.map((i) => {
                    return { name: i.name, id: i.id };
                });

                resolve(howDidYouAboutUs);
            })
                .catch(error => {
                    /*eslint no-undef: "warn"*/
                    // NProgress.done();
                    if (error.response) reject(error.response)
                    if (!error.response) reject(error)
                })
        });

    },

    getLookUps() {
        return new Promise((resolve, reject) => {
            axios
                .get("/api/LookUp/GetAllLookUps")
                .then((res) => {
                    const genders = res.data.find(
                        (i) => i.type.toLowerCase() === "gender"
                    ).lookUps;
                    const maritalStatus = res.data.find(
                        (i) => i.type.toLowerCase() === "maritalstatus"
                    ).lookUps;
                    const outcome = res.data.find(
                        (i) => i.type.toLowerCase() === "outcome"
                    ).lookUps;
                    const activityType = res.data.find(
                        (i) => i.type.toLowerCase() === "activitytype"
                    ).lookUps;
                    resolve({ genders, maritalStatus, outcome, activityType})
                })
                .catch((err) => {
                    console.log(err)
                    reject(err);
                });
        })
    },

    getAgeGroups() {
        return new Promise((resolve, reject) => {
            axios.get("/api/Settings/GetTenantAgeGroups").then((res) => {
                    resolve(res.data);
                    store.dispatch("lookups/setAgeGroups", res.data);
                }).catch((err) => {
                    console.log(err.response)
                    if (err.response) reject(err.response)
                    if (!err.response) reject(err)
                });
                })
    }
}

export default lookupService;