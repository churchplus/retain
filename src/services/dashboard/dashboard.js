import axios from "@/gateway/backendapi";
const dashboard = {
    getDashboard () {
            return new Promise((resolve, reject) => {
                axios.get("/dashboard/basic")
                    .then(res => {
                        resolve(res.data);
                    })
                    .catch(error => {
                        // eslint-disable-next-line
                        NProgress.done();
                        if (error.response) {
                            reject(error.response);
                        } else {
                            reject(error);
                        }
                    })
            })
    },
    getCelebrations () {
            return new Promise((resolve, reject) => {
                axios.get("/dashboard/celebrations")
                    .then(res => {
                        resolve(res.data);
                    })
                    .catch(error => {
                        // eslint-disable-next-line
                        NProgress.done();
                        if (error.response) {
                            reject(error.response);
                        } else {
                            reject(error);
                        }
                    })
            })
    },
}

export default dashboard