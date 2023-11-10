import axios from "@/gateway/backendapi";
import stopProgressBar from "../progressbar/progress";

const getTransactionalAccounts = () => {
    return new Promise((resolve, reject) => {
        axios.get("/api/Financials/Accounts/GetTransactionalAccounts")
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                if (err.response) {
                    reject(err.response);
                } else {
                    reject(err)
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
                    reject(err)
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
                    reject(err)
                }
            })
    })
}

const testPoint = () => {
    return new Promise((resolve, reject) => {
        axios.get("/api/Financials/Accounts/GetCashBankAccounts")
            // axios.get("/api/Financials/Accounts/Transactions/GetIncomeAndExpense")\

            .then(res => {
                resolve(res.data);
            })
            .catch(err => {

                if (err.response) {
                    reject(err.response);
                } else {
                    reject(err)
                }
            })
    })
}

const getCurrencies = () => {
    return new Promise((resolve, reject) => {
        axios.get("/api/lookup/getallcurrencies")
            .then(res => {
                console.log(res, "CURRENCY");
                resolve(res.data);
            })
            .catch(err => {

                if (err.response) {
                    reject(err.response);
                } else {
                    reject(err)
                }
            })
    })
}

const getCashAndBank = () => {
    return new Promise((resolve, reject) => {
        axios.get("/api/Financials/Accounts/GetCashBankAccounts")
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                if (err.response) {
                    reject(err.response);
                } else {
                    reject(err)
                }
            })
    })
}

const getTransactions = () => {
    return new Promise((resolve, reject) => {
        // axios.get("/api/Financials/Accounts/Transactions?page=1")
        axios.get("/api/Financials/Accounts/v2/Transactions?page=1")
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                if (err.response) {
                    reject(err.response);
                } else {
                    reject(err)
                }
            })
    })
}

const getIncomeAccounts = () => {
    return new Promise((resolve, reject) => {
        axios.get("/api/Financials/Accounts/GetIncomeAccounts")
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                if (err.response) {
                    reject(err.response);
                } else {
                    reject(err)
                }
            })
    })
}

const getExpenseAccounts = () => {
    return new Promise((resolve, reject) => {
        axios.get("/api/Financials/Accounts/GetExpenseAccounts")
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                if (err.response) {
                    reject(err.response);
                } else {
                    reject(err)
                }
            })
    })
}

const saveExpense = (body) => {
    return new Promise((resolve, reject) => {
        axios.post("/api/Financials/Accounts/Transactions/Expense/Save", body)
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                if (err.response) {
                    reject(err.response);
                } else {
                    reject(err)
                }
            })
    })
}

const saveIncome = (body) => {
    return new Promise((resolve, reject) => {
        axios.post("/api/Financials/Accounts/Transactions/Income/Save", body)
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                if (err.response) {
                    reject(err.response);
                } else {
                    reject(err)
                }
            })
    })
}

const getCashAndBankAccountBalances = () => {
    return new Promise((resolve, reject) => {
        axios.get("/api/Financials/Accounts/GetCashBankAccountsBalances")
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                if (err.response) {
                    reject(err.response);
                } else {
                    reject(err)
                }
            })
    })
}

const saveJournalTransaction = (body) => {
    return new Promise((resolve, reject) => {
        axios.post("/api/Financials/Accounts/Transactions/SaveGeneralLedger", body)
            .then(res => {
                console.log(res, "LEDGER");
                resolve(res);
            })
            .catch(err => {
                if (err.response) {
                    reject(err.response);
                } else {
                    reject(err)
                }
            })
    })
}

const deleteTransaction = (id) => {
    return new Promise((resolve, reject) => {
        axios.delete(`/api/Financials/Accounts/Transactions/Delete?id=${id}`)
            .then(res => {
                resolve(res);
            })
            .catch(err => {
                if (err.response) {
                    reject(err.response);
                } else {
                    reject(err)
                }
            })
    })
}

const getEditTransactions = (ref) => {
    return new Promise((resolve, reject) => {
        axios.get(`/api/Financials/Accounts/GetEditFinancialTransaction?transactionNumber=${ref}`)
            .then(res => {
                resolve(res);
            })
            .catch(err => {
                if (err.response) {
                    reject(err.response);
                } else {
                    reject(err)
                }
            })
    })
}

const getTransactionsByAccount = (id) => {
    return new Promise((resolve, reject) => {
        axios.get(`/api/Financials/Accounts/Transactions/Account?id=${id}`)
            .then(res => {
                resolve(res);
            })
            .catch(err => {
                if (err.response) {
                    reject(err.response);
                } else {
                    reject(err)
                }
            })
    })

}

const getDonationTransaction = () => {
    return new Promise((resolve, reject) => {
        axios
            .get("/api/Financials/Donation/Transactions?page=1")
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                if (err.response) {
                    reject(err.response);
                } else {
                    reject(err)
                }
            })
    })
}

const approveFinancialReport = (payload) => {
    return new Promise((resolve, reject) => {
        axios
            .post("api/Financials/accounts/Transactions/ApproveTransactionToggle", payload)
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                if (err.response) {
                    reject(err.response);
                } else {
                    reject(err)
                }
            })
    })
}


export default {
    getTransactionalAccounts, 
    testPoint, 
    getTransactions,
     getCashAndBank, 
    saveAccount, 
    getIncomeAccounts, 
    getExpenseAccounts, 
    saveExpense, 
    saveIncome, 
    getCurrencies, 
    getAccountHeads, 
    getCashAndBankAccountBalances,
    saveJournalTransaction,
    deleteTransaction,
    getEditTransactions,
    getTransactionsByAccount, 
    getDonationTransaction,
    approveFinancialReport
};