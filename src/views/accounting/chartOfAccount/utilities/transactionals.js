import chart_of_accounts from "../../../../services/financials/chart_of_accounts";
import transaction_service from "../../../../services/financials/transaction_service";
// import stopProgressBar from "../progressbar/progress";

const transactionals = {
    accountTypes: ["assets", "liability",  "equity", "income", "expense"],
    account: [],
    groupedAccounts: [],
    currencies: [],
    funds: [],

    getTransactionalAccounts(force) {
        return new Promise((resolve, reject) => {
            if (!this.accounts || this.accounts.length === 0 || force) {
                transaction_service.getAccountHeads()
                .then(res => {
                    console.log(res, "new heads");
                    const data = [];
                    for (let group of res) {
                        data.push(group.accountHeadsDTO);
                      }
                      this.accounts = data;
                    resolve(data)
                })
                .catch(err => {
                    reject(err)
                })
            } else {
                resolve(this.accounts)
            }
        })
    },

    getGroupedAccounts(force) {
        return new Promise((resolve, reject) => {
            if (!this.groupedAccounts || this.groupedAccounts.length === 0 || force) {
                transaction_service.getTransactionalAccounts()
                .then(res => {
                    const data = [];
                    for (let group of this.accountTypes) {
                        data.push(res.filter(i => i.accountType.toLowerCase() === group));
                      }
                      this.groupedAccounts = data;
                    resolve(data)
                })
                .catch(err => {
                    reject(err)
                })
            } else {
                resolve(this.groupedAccounts)
            }
        })
    },

    getCurrencies() {
        return new Promise((resolve, reject) => {
            if (!this.currencies || this.currencies.length === 0) {
                transaction_service.getCurrencies()
                    .then(res => {
                        const mapped = res.map(i => {
                            return {
                                name: i.shortCode,
                                id: i.id,
                                country: i.country,
                                displayName: `${i.shortCode} - ${i.country}`
                            };
                        })
                        this.currencies = mapped;
                        resolve(mapped);
                    })
                    .catch(err => {
                        reject(err);
                    })
            } else {
                resolve(this.currencies);
            }
        })
    },

    getFunds(force) {
        return new Promise((resolve, reject) => {
            if (!this.funds || this.funds.length === 0 || force) {
                chart_of_accounts.getFunds()
                .then(data => {
                    this.funds = data;
                    resolve(data);
                })
                .catch(error => {
                    reject(error);
                })
            } else {
                resolve(this.funds);
            }
        })
    }

}

export default transactionals;