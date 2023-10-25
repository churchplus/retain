import axios from "@/gateway/backendapi";
const pledge = {
    getPledges() {
        return new Promise((resolve, reject) => {
            axios.get("/api/Pledge/GetAllPledges")
            .then(res =>{
                resolve(res.data)
            })
            .catch(error =>{
                NProgress.done()
                if (error.response) {
                    reject(error.response)
                }  else {
                    reject(error);
                }
            })
        })
    },
    getPledgeSummary() {
        return new Promise((resolve, reject) => {
            axios.get("/api/Pledge/GetAllPledgesSummary")
            .then(res =>{
                resolve(res.data)
            })
            .catch(error =>{
                NProgress.done()
                if (error.response) {
                    reject(error.response)
                }  else {
                    reject(error);
                }
            })
        })
    },
    getPledgeDefinition() {
        return new Promise((resolve, reject) => {
            axios.get("/api/Pledge/GetAllPledgeDefinitions")
            .then(res =>{
                resolve(res.data)
            })
            .catch(error =>{
                NProgress.done()
                if (error.response) {
                    reject(error.response)
                }  else {
                    reject(error);
                }
            })
        })
    }

}
export default pledge