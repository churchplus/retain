import axios from "@/gateway/backendapi";
import stopProgressBar from "../progressbar/progress"

const getChartOfAccounts = () => {
    return new Promise((resolve, reject) => {
        axios.get("/api/Financials/GetChartOfAccounts")
        .then(res => {
            console.log(res, "chats in service");
            resolve(res.data);
        })
        .catch(err => {
            if (err.response) {
                reject(err.response);
            } else {
                reject(err);
            }
        })
    })
}

const getCashBankAccounts = () => {
    return new Promise((resolve, reject) => {
        axios.get("/api/Financials/Accounts/GetCashBankAccounts")
        .then(res => {
            resolve(res.data);
        })
        .catch(err => {
            if (err.response) {
                reject(err.response);
            } else {
                reject(err);
            }
        })
    })
}

const getAssetsAccounts = () => {
    return new Promise((resolve, reject) => {
        axios.get("/api/Financials/Accounts/GetAssetAccounts")
        .then(res => {
            resolve(res.data);
        })
        .catch(err => {
            if (err.response) {
                reject(err.response);
            } else {
                reject(err);
            }
        })
    })
}
const getAccountHeads = () => {
    return new Promise((resolve, reject) => {
        axios.get("/api/Financials/Accounts/GetAccountHeads")
        .then(res => {
            resolve(res.data);
        })
        .catch(err => {
            if (err.response) {
                reject(err.response);
            } else {
                reject(err);
            }
        })
    })
}

const getFunds = () => {
    return new Promise((resolve, reject) => {
        axios.get("/api/Financials/Funds")
        .then(res => {
            resolve(res.data);
        })
        .catch(err => {
            if (err.response) {
                reject(err.response);
            } else {
                reject(err);
            }
        })
    })
}

const saveAccount = (body) => {
    return new Promise((resolve, reject) => {
        axios.post("/api/Financials/Accounts/Save", body)
        .then(res => {
            resolve(res.data);
        })
        .catch(err => {
            stopProgressBar();
            if (err.response) {
                reject(err.response);
            } else {
                reject(err);
            }
        })
    })
}

const deleteAccount = (id) => {
    return new Promise((resolve, reject) => {
        axios.delete(`/api/Financials/Accounts/Delete?id=${id}`)
        .then(res => {
            resolve(res.data);
        })
        .catch(err => {
            stopProgressBar();
            if (err.response) {
                reject(err.response);
            } else {
                reject(err);
            }
        })
    })
}

const editAccount = (body) => {
    return new Promise((resolve, reject) => {
        axios.put(`/api/Financials/Accounts/Save`, body)
        .then(res => {
            resolve(res.data);
        })
        .catch(err => {
            stopProgressBar();
            if (err.response) {
                reject(err.response);
            } else {
                reject(err);
            }
        })
    })
}

const deleteFund = (id) => {
    return new Promise((resolve, reject) => {
        axios.delete(`/api/Financials/Fund/Delete?id=${id}`)
        .then(res => {
            resolve(res.data);
        })
        .catch(err => {
            stopProgressBar();
            if (err.response) {
                reject(err.response);
            } else {
                reject(err);
            }
        })
    })
}

const saveFund = (body) => {
    return new Promise((resolve, reject) => {
        axios.post("/api/Financials/Funds/Save", body)
        .then(res => {
            resolve(res.data);
        })
        .catch(err => {
            stopProgressBar();
            if (err.response) {
                reject(err.response);
            } else {
                reject(err);
            }
        })
    })
}

export default { getChartOfAccounts, getCashBankAccounts, getAssetsAccounts, getFunds, saveAccount, saveFund, deleteAccount, deleteFund, getAccountHeads, editAccount }
