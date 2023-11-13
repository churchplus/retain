import axios from "@/gateway/backendapi";
// import stopProgressBar from "../../services/progressbar/progress"

const getContributionList = async () => {
    return new Promise((resolve, reject) => {
        axios.get("/api/Financials/Contributions/Transactions?page=1")
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
}
const getContributionItem = async () => {
    return new Promise((resolve, reject) => {
        axios.get("/api/financials/contributions/items")
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
}
export default { getContributionList, getContributionItem };
