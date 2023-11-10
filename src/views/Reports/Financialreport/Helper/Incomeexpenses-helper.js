const groupByFund = accounts => {
    if (!accounts || accounts.length <= 0) return []
    return accounts.filter(account => account && account.fund)
      .map(account => account.fund)
  }

  const formatAccounts = accounts => {
    const funds = Array.from(new Set(groupByFund(accounts)))

    let data = { }
    for (let fund of funds) {
      const fundAccounts = accounts.filter(account => account && account.fund === fund);

      data[fund] = {
        incomes: fundAccounts.filter(account => account && account.accountCategory === "Income"),
        expenses: fundAccounts.filter(account => account && account.accountCategory === "Expense"),
      }
    }

    return data;
  }

  export default {
      formatAccounts
  }
