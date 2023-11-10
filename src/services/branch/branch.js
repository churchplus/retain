import axios from "@/gateway/backendapi";

const branchService = {
    getBranches() {
        return new Promise((resolve, reject) => {
            axios.get("/api/Branching")
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                     /*eslint no-undef: "warn"*/
                     NProgress.done();
                    if (error.response) {
                        reject(error.response);
                    } else {
                        reject(error);
                    }
                })
        })
    },

    // createNewEventCategory(name) {
    //     return new Promise((resolve, reject) => {
    //         axios.post(`/api/EventCategory?name=${name}`)
    //             .then(res => {
    //                 resolve(res.data);
    //             })
    //             .catch(error => {
    //                  /*eslint no-undef: "warn"*/
    //                  NProgress.done();
    //                 if (error.response) {
    //                     reject(error.response);
    //                 } else {
    //                     reject(error);
    //                 }
    //             })
    //     })
    // },
}

export default branchService;