<template>
  <div @click="hideModals">
    <!-- <div>{{ transacObj }}</div> -->
    <!-- <div>{{ splitCategories }}</div> -->
    <!-- <div>{{ showEditTransaction }}</div> -->
    <div class="col-12 parent-desc d-flex justify-content-between first p-3">
      <div>Edit Transaction Details</div>
      <el-icon @click="closeTransac" class="mt-0" ><Close /></el-icon>
    </div>
    <div class="container">
      <div class="row mt-3" v-if="gettingExpenseAccounts || gettingSelectedTrsn">
        <div class="col-md-12 text-center">
          <el-icon class="is-loading " >
            <Loading />
          </el-icon>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-12">
        </div>
        <div class="col-12">
          <div class="label-text">Write a Description <span class="text-danger">*</span></div>
          <el-input
            class="w-100"
            id="description"
            ref="descrp"
            v-model="transacObj.memo"
            placeholder="Description"
            :autofocus="showEditTransaction"
            
          />
        </div>
        <div class="col-12 mt-1">
          <div class="label-text">Date <span class="text-danger">*</span></div>
          <el-date-picker
            v-model="transacObj.date"
            type="date"
            id="date"
            class="w-100"
            size="large"
            ref="dateField"
            format="MM/DD/YYYY"
          />
        </div>
      </div>
      <div class="row mt-3"><div class="col-7 pr-0">
          <div class="label-text">Cash Account</div>
          <div
            class="select-elem-con pointer form-control d-flex justify-content-space-between align-items-center close-modal c-pointer"
            @click="showAccount = !showAccount"
          >
            <span class="ofering close-modal">{{
              selectedCashAccount && selectedCashAccount.name ? selectedCashAccount.name : selectedCashAccount && selectedCashAccount.text ? selectedCashAccount.text : "Select"
            }}</span
            ><span>
              <i class="pi pi-angle-down close-modal" aria-hidden="true"></i
            ></span>
          </div>
          <div
            class="ofering close-modal"
            :class="{ 'style-account': showAccount }"
            v-if="showAccount"
            ref="selectAccount"
          >
            <div class="px-3 pt-3 close-modal">
              <input
                type="text"
                placeholder="Search"
                class="form-control ofering mb-1 close-modal"
                v-model="accountText"
              />
            </div>

            <div class="container-fluid">
              <div class="row">
                <div class="  col-md-12 px-0" v-for="(account, index) in filteredCashandBank" :key="index" @click="accountFlow($event, account)">
                  <div class="header-border hover-text close-modal">
                    <div v-if="account">
                      <div class="close-modal offset-sm-1  py-2 small-text" >{{ account.text }}</div>
                    </div>
                    <div v-else>
                      <div class="text-center px-3 py-2 text-danger">
                        No Match Found
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-12" v-if="filteredCashandBank.length === 0">
                  <div class="text-center px-3 py-2 text-danger">
                      No Match Found
                    </div>
                </div>
              </div>
            </div>

           
          </div>
        </div>
        <!-- <div class="col-7 pr-0">
          <div class="label-text">Cash Account</div>
          <div class="input-width">
            <el-dropdown class="w-100" trigger="click">
              <el-input class="w-100" placeholder="Select" v-model="selectedCashAccount" />
              <template #dropdown>
                <el-dropdown-menu class="menu-height">
                  <el-dropdown-item v-for="(account, index) in filteredCashandBank" :key="index"
                   @click="accountFlow($event, account)">{{ account.text }}</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div> -->
        <div class="col-sm-5 col-md-5 col-lg-5 col-12 ">
          <div class="label-text">Amount</div>
          <el-input
            type="number"
            class=" w-100"
            v-model="transacObj.amount"
            placeholder="0.00"
          />
        </div>
      </div>

      <div>
        <div class="row mt-3">
          <div class="col-12" v-for="(i, index) in splittedTransactions" :key="index">
            <div class="label-text">{{ transactionDetails.id && transactionDetails.debitSplitAccounts && transactionDetails.debitSplitAccounts.length > 0 ? "Expense Account" : transactionDetails.id ? "Income Account" : transactionDetails.account }}</div>

            <div class="dropdown cursor-pointer">
              <button class="btn cursor-pointer btn-default text-left bg-light col-7" :class="{ 'col-12': splittedTransactions.length === 1 }" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                style="border: 1px solid #ced4da;border-radius: 4px;background: rgb(253, 253, 253)"
              >
                <span class="text-left">{{ splittedTransactions.length === 0 || !splittedTransactions[index].text ? "Select" : splittedTransactions[index].text }}</span>
                <span class="float-right"><el-icon :size="16"><ArrowUp /></el-icon></span> 
              </button><input type="text" placeholder="amount" :class="{ 'col-4': splittedTransactions.length > 1 }" class="form-control d-inline" v-model="i.amount" v-if="splittedTransactions.length > 1"><span v-if="splittedTransactions.length > 1" class="col-1 px-1" @click="removeSplit(index)"><el-icon><Delete /></el-icon></span>
              <div class="dropdown-menu cursor-pointer w-100" id="noTransfrom" aria-labelledby="dropdownMenuButton">
                <div class="row">
                  <div class="col-md-11 mx-auto">
                    <input
                      type="text"
                      placeholder="Search..."
                      class="form-control ofering mb-1 close-modal"
                      v-model="incomeExpenseSearchText"
                    />
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-11 ">
                    <a class="dropdown-item cursor-pointer" v-for="(item, indx) in expenseIncomeAccounts" :key="indx" @click="categories(item, index)">{{ item.text }}</a>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-12">
              <div class="d-flex justify-content-end">
                <div class="mt-2 vendor c-pointer" @click="() => i.showDonorField = !i.showDonorField">{{ i.donor ? i.donor : transactionDetails.account === "Income Account" || (transactionDetails.creditSplitAccounts && transactionDetails.creditSplitAccounts.length) > 0 ? "Add donor" : "" }}</div>
                <div class="dot ml-2"></div>
                <div class="mt-2 ml-2 vendor">Include Tax Sales</div>
              </div>
            </div>
            <div class="col-md-12 px-0" v-if="i.showDonorField">
              <!-- Hello -->
              <SearchMember @selectmember="donorSelected" :index="index" />
            </div>
          </div>
        </div>

      </div>
     

      <div>{{ totalAmount.amount }}</div>
      <div class="row mt-2">
        <div class="col-3 line pr-0"><hr /></div>
        <div
          class="col-6 mt-2 text-center split"
          @click="splitTransaction"
        >
         <el-tooltip
        class="box-item"
        effect="dark"
        content='Create multiple categories to associate(split) this trasaction between different accounts.'
        placement="top"
      >
         <div>Split this {{ transactionDetails.account === 'Expense Account' ? 'expense' : 'income' }} <el-icon><InfoFilled /></el-icon></div> 
         </el-tooltip>
         
        </div>
        <div class="col-3 line pl-0"><hr /></div>
        <div
          class="error-div col-10 offset-1 mt-3"
         v-if="parseInt(totalAmount.amount) > transacObj.amount" 
        >
          <div class="row">
            <div class="col-1"><el-icon><Warning /></el-icon></div>
            <p class="error-message col-10 pl-0">
              The sum of the above lines should not exceed the total deposit
              amount of {{ transacObj.amount }}
            </p>
          </div>
        </div>
        <div class="col-12 mt-4">
          <el-input  v-model="transacObj.note" type="textarea" :rows="3" class="w-100" />
        </div>
        <div class="col-12 mt-1 modified">
          Transaction last modified on {{ new Date(Date.now()).toLocaleDateString() }}
        </div>
        <div class="col-6 offset-sm-3 mb-2 mt-3">
          <div class=" text-center cpon">
            <el-button class=" primary-bg text-white border-0 d-flex justify-content-center" :loading="savingAccount" :color="primarycolor" round size="large" :disabled="!formIsValid || savingAccount" @click="saveIncome">
              <span>
                {{ transactionDetails.id ? 'Update' : 'Save' }}
              </span>
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, nextTick, inject, watch, watchEffect, proxyRefs } from "vue";
import transaction_service from "../../../services/financials/transaction_service";
import chart_of_accounts from '../../../services/financials/chart_of_accounts';
import SearchMember from "../../../components/search/SearchMember"
import dateFormatter from "../../../services/dates/dateformatter";
import store from "../../../store/store";
import { ElMessage } from 'element-plus'
export default {
  components: { SearchMember },
  props: ["transactionDetails", "showEditTransaction", "gettingSelectedTrsn"],
  setup(props, { emit }) {
    const showAccount = ref(false);
    const accountText = ref("");
    const accountType = ref([ ]);
    const primarycolor = inject('primarycolor')
    const liabilities = ref(["Credit Card", "Loan and Line of Credit"]);
    const showUncategorized = ref(false);
    const uncategorizedText = ref("");
    const transacObj = ref(props.transactionDetails);
    const splittedTransactions = ref([ { ...props.transactionDetails }])
    const savingAccount = ref(false);

    const amountRef = ref("");
    const descrp = ref("");
    const selectedCashAccount = ref({ });
    const selectedIncomeOrExpenseAccount = ref({ });
    const iSoStringFormat = ref('')
     watchEffect(() =>{
      if(transacObj.value.date){
       iSoStringFormat.value = dateFormatter.getISOStringGMT(transacObj.value.date)
      }
  })

    const filterAccount = computed(() => {
      if (accountText.value !== "" && accountType.value.length > 0) {
        return accountType.value.filter((i) => {
          if (i)
            return i.toLowerCase().includes(accountText.value.toLowerCase());
        });
      } else {
        return accountType.value;
      }
    });

    const filterLiabilities = computed(() => {
      if (accountText.value !== "" && liabilities.value.length > 0) {
        return liabilities.value.filter((i) => {
          if (i)
            return i.toLowerCase().includes(accountText.value.toLowerCase());
        });
      } else {
        return liabilities.value;
      }
    });

    const hideModals = (e) => {
      if (!e.target.classList.contains("close-modal")) {
        showAccount.value = false;
        showUncategorized.value = false;
      }
    };

    const filterUncategorizedAsset = computed(() => {
      if (uncategorizedText.value !== "" && accountType.value.length > 0) {
        return accountType.value.filter((i) => {
          if (i)
            return i
              .toLowerCase()
              .includes(uncategorizedText.value.toLowerCase());
        });
      } else {
        return accountType.value;
      }
    });

    const filterUncategorizedLiabilities = computed(() => {
      if (uncategorizedText.value !== "" && liabilities.value.length > 0) {
        return liabilities.value.filter((i) => {
          if (i)
            return i
              .toLowerCase()
              .includes(uncategorizedText.value.toLowerCase());
        });
      } else {
        return liabilities.value;
      }
    });

    const categoryAccount = (e) => {
      transacObj.value.splitCategories[
        transacObj.value.splitCategories.length - 1
      ].category = e.target.innerHTML;
      transacObj.value.splitCategories[
        transacObj.value.splitCategories.length - 1
      ].showUncategorized = false;
      // let index = splitCategories.findIndex(i => )
    };

    const categories = (account, index) => {
      // transacObj.value.category = e.target.innerText;
      showUncategorized.value = !showUncategorized.value;
      // selectedIncomeOrExpenseAccount.value = account;
      splittedTransactions.value[index].accountID = account.id;
      splittedTransactions.value[index].text = account.text;
    };

    const accountFlow = (e, account) => {
      // transacObj.value.accountFlow = e.target.innerText;
      showAccount.value = !showAccount.value;
      selectedCashAccount.value = account;
    };

    const splitWithdrawal = () => {
      transacObj.value.splitCategories.push({
        amount: 0,
      });
      nextTick(() => {
        amountRef.value.select();
      });
    };

    const deleteSplit = (index) => {
      transacObj.value.splitCategories.splice(index, 1);
    };

    const totalAmount = computed(() => {
      if (transacObj.value.splitCategories && transacObj.value.splitCategories.length > 0) {
        return transacObj.value.splitCategories.reduce((a, b) => {
          return { amount: parseInt(a.amount) + parseInt(b.amount) };
        });
      } else {
        return 0;
      }
    });

    const incomeExpenseSearchText = ref("");

    const expenseIncomeAccounts = computed(() => {
      let data = [ ];
        if (!props.transactionDetails.account) {
          data = [ ...expenseAccounts.value, accountType.value ];
        }
        if (props.transactionDetails.id && props.transactionDetails.debitSplitAccounts && props.transactionDetails.debitSplitAccounts.length > 0) {
          data = expenseAccounts.value;
        }
        if (props.transactionDetails.id && props.transactionDetails.creditSplitAccounts && props.transactionDetails.creditSplitAccounts.length > 0) {
          data = accountType.value ? accountType.value : [ ];
        }
        if (props.transactionDetails.account === "Income Account") {
          data = accountType.value ? accountType.value : [ ];
        }
        if (props.transactionDetails.account === "Expense Account") {
          data = expenseAccounts.value;
        }
        if (!incomeExpenseSearchText.value) return data;
        return data.filter(i => i.text.toLowerCase().includes(incomeExpenseSearchText.value));
    })

    const closeTransac = () => {
      emit("close-it", false);
    };

    const gettingIncomeAccounts = ref(false);
    const getIncomeAccounts = async () => {
      try {
        gettingIncomeAccounts.value = true;
        const response = await transaction_service.getIncomeAccounts();
        accountType.value = response;
        gettingIncomeAccounts.value = false;
      } catch (error) {
        console.log(error);
        gettingIncomeAccounts.value = false;
      }
    };

    const expenseAccounts = ref([ ]);
    const gettingExpenseAccounts = ref(false);
    const getExpenseAccounts = async () => {
      try {
        gettingExpenseAccounts.value = true;
        const response = await transaction_service.getExpenseAccounts();
        expenseAccounts.value = response;
        gettingExpenseAccounts.value = false;
      } catch (error) {
        console.log(error);
        gettingExpenseAccounts.value = false;
      }
    };

    getExpenseAccounts();
    getIncomeAccounts();

    const accountTypes = ["assets", "liability", "income", "expense", "equity"];
    const accTypes = ["assets", "liability", "equity", "income", "expense" ];

    const transactionalAccounts = computed(() => {
      if (!accountHeads.value || accountHeads.value.length === 0) return [ ];
      let accounts = [ ];
      for (let group of accountHeads.value) {
        accounts.push(group.accountHeadsDTO)
      }
      return accounts;
    })

    const constructSaveTransactionReqBody = () => {
      const reqBody = {
        // id: props.transactionDetails.id ? props.transactionDetails.id : "",
        amount: Math.abs(+transacObj.value.amount),
        // amount: Math.abs(+transacObj.value.amount),
        creditSplitAccounts: splittedTransactions.value.map(i => {
          return {
            accountID: i.accountID,
            amount: Math.abs(splittedTransactions.value.length ===1 ? +transacObj.value.amount : i.amount ? +i.amount : +transacObj.value.amount),
            // amount: Math.abs(i.amount ? +i.amount : +transacObj.value.amount),
            contactID: i.donorId ? i.donorId : "",
            transactionID: i.transactionID
          }
        }),
        date: iSoStringFormat.value,
        debitAccountID: selectedCashAccount.value.id,
        memo: transacObj.value.memo,
        transactionNumber: props.transactionDetails.transactionNumber ? props.transactionDetails.transactionNumber : ""
      }
      if (props.transactionDetails.id) {
        reqBody.id = props.transactionDetails.id;
      }
      return reqBody;
    }

    const toastMessage = (response) => {
      if (response.status) {
        ElMessage({
          type: "success",
          message: "Transaction saved successfully",
          duration: 3000,
        });
          store.dispatch("transaction/getTransaction")
          emit("reload")
        } else {
          ElMessage({
          type: "error",
          message: "The operation was not successful",
          duration: 3000,
        });
        }
    }

    const newIncome = ref({ });
    const saveIncome = async () => {
        try {
          let reqBody = { };
          savingAccount.value = true;
          if (props.transactionDetails.account === "Income Account" || (props.transactionDetails.creditSplitAccounts && props.transactionDetails.creditSplitAccounts.length >   0)) {
            transacObj.value.creditAccountID = selectedIncomeOrExpenseAccount.value.id;
            transacObj.value.debitAccountID = selectedCashAccount.value.id;
            reqBody = constructSaveTransactionReqBody();
            reqBody.category = "inflow";
            const response = await transaction_service.saveIncome(reqBody);
            savingAccount.value = false;
            toastMessage(response);
          } else {
            const body = {
              debitSplitAccounts: splittedTransactions.value.map(i => {
                return {
                  accountID: i.accountID,
                  amount: Math.abs(splittedTransactions.value.length ===1 ? transacObj.value.amount : i.amount ? +i.amount : +transacObj.value.amount),
                  // amount: Math.abs(i.amount ? +i.amount : +transacObj.value.amount),
                  contactID: i.donorId ? i.donorId : "",
                  transactionID: i.transactionID
                }
              }),
              creditAccountID: selectedCashAccount.value.id,
              date: iSoStringFormat.value,
              memo: transacObj.value.memo,
              transactionNumber: props.transactionDetails.transactionNumber ? props.transactionDetails.transactionNumber : "",
              amount: Math.abs(+transacObj.value.amount),
              // amount: Math.abs(+transacObj.value.amount),
              category: "outflow"
            }

            if (props.transactionDetails.id) {
              body.id = props.transactionDetails.id;
            }
            const response = await transaction_service.saveExpense(body);
            savingAccount.value = false;
            toastMessage(response)
          }
        } catch (error) {
          savingAccount.value = false;
          console.log(error);
        }
    }

    const getSplittedAccountNames = () => {
      splittedTransactions.value = splittedTransactions.value.map(i => {
        const accIncome = accountType.value.find(j => j.id === i.accountID);
        const accExpense = expenseAccounts.value.find(j => j.id === i.accountID);
        i.text = accIncome ? accIncome.text : accExpense ? accExpense.text : "Income Account";
        return i;
      })
    }

    const dateField = ref(null);
    watch(() => props.transactionDetails, (data) => {
      transacObj.value.date = data.date;
      transacObj.value.amount = Math.abs(data.amount);
      transacObj.value.memo = data.memo;
      splittedTransactions.value = [ { }]
      selectedCashAccount.value = data.account;

      if (props.transactionDetails.id) {
        transacObj.value.date = data.date;
        // transacObj.value.date = data.date && data.date.toLocaleString().includes('T') ? data.date.toLocaleString().split('T')[0] : data.date.toLocaleString();
        // transacObj.value.date = new Date(data.date).toISOString().substr(0, 10)
        if (data.debitSplitAccounts && data.debitSplitAccounts.length > 0) {
          splittedTransactions.value = data.debitSplitAccounts.map(i => {
            i.amount = Math.abs(i.amount);
            return i;
          });
        } else {
          splittedTransactions.value = data.creditSplitAccounts.map(i => {
            i.amount = Math.abs(i.amount);
            return i;
          });
        }
        getSplittedAccountNames()
      }

    })

    const accountHeads = ref([ ]);
    const getAccountHeads = async () => {
      try {
        const response = await chart_of_accounts.getAccountHeads();
        accountHeads.value = response;
      } catch (error) {
        console.log(error);
      }
    }
    getAccountHeads();

    const cashandbank = ref([ ]);
    const getCashAndBank = async () => {
      try {
        const response = await transaction_service.getCashAndBank();
        cashandbank.value = response;
      } catch (error) {
        console.log(error);
      }
    }
    getCashAndBank();

    const filteredCashandBank = computed(() => {
        if (!cashandbank.value || cashandbank.value.length === 0) return [ ];
        return cashandbank.value.filter(i => i.text.toLowerCase().includes(accountText.value));
    })

    const splitTransaction = () => {
      splittedTransactions.value.push({ })
    }

    const showDonorField = ref(false);
    const addDonor = () => {

    }

    const donorSelected = (memberData) => {
      splittedTransactions.value[memberData.index].donorId = memberData.member.id;
      splittedTransactions.value[memberData.index].donor = memberData.member.name;
      splittedTransactions.value[memberData.index].showDonorField = false;
    }

    const formIsValid = computed(() => {
      if (!transacObj.value.amount) return false;
      if (splittedTransactions.value.length === 1) return true;
      const result = splittedTransactions.value.map(i => {
        return i.amount ? Math.abs(+i.amount) : 0;
      }).reduce((a, b) => a + b);
      const amount = transacObj.value.amount ? +transacObj.value.amount : 0;
      return Math.abs(amount) === result;
    })

    const removeSplit = index => {
      splittedTransactions.value.splice(index, 1);
    }

    return {
      showAccount,
      iSoStringFormat,
      accountText,
      filterAccount,
      accountType,
      filterLiabilities,
      liabilities,
      hideModals,
      showUncategorized,
      uncategorizedText,
      filterUncategorizedAsset,
      filterUncategorizedLiabilities,
      closeTransac,
      transacObj,
      categoryAccount,
      splitWithdrawal,
      deleteSplit,
      accountFlow,
      totalAmount,
      amountRef,
      descrp,
      categories,
      primarycolor,
      transactionalAccounts,
      accountTypes,
      expenseIncomeAccounts,
      saveIncome,
      newIncome,
      selectedCashAccount,
      selectedIncomeOrExpenseAccount,
      gettingIncomeAccounts,
      gettingExpenseAccounts,
      accountHeads,
      accTypes,
      cashandbank,
      filteredCashandBank,
      incomeExpenseSearchText,
      splitTransaction,
      splittedTransactions,
      donorSelected,
      showDonorField,
      addDonor,
      formIsValid,
      removeSplit,
      dateField,
      savingAccount
    };
  },
};
</script>

<style scoped>
#noTransfrom {
  transform:none !important;
  max-height: 300px;
  overflow: auto;
  top: inherit !important;
}
.hover-text{
  background-color: white;
}
.hover-text:hover{
  background-color: rgb(248, 247, 247);
}
.parent-desc.first {
  color: #8898aa;
  font-size: 15px;
  font-weight: 600;
  box-shadow: 0px 3px 6px #2c28281c;
  background: #dde2e6 0% 0% no-repeat padding-box;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
}

.select-elem-con {
  padding: 5px 10px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  justify-content: space-between;
  background: rgb(253, 253, 253);
}

.style-account {
  box-shadow: 0px 3px 15px #797e8159;
  position: absolute;
  background: white;
  z-index: 1;
  width: 130%;
  max-height: 14em;
  overflow-y: scroll;
}
.style-account div div div:hover {
  /* background-color: #ecf0f3; */
  cursor: pointer;
}

/* .input-width {
  width: 100%
}

.input-width {
  width: 100%
}

@media (min-width: 992px) {
  .input-width {
    width: 350px
  }

} */

.style-uncategorized {
  box-shadow: 0px 3px 15px #797e8159;
  position: absolute;
  background: white;
  z-index: 1;
  width: 90%;
  max-height: 14em;
  overflow-y: scroll;
}
.style-uncategorized div div div:hover {
  /* background-color: #ecf0f3; */
  cursor: pointer;
}
.menu-height {
  max-height: 400px;
  overflow: scroll;
}

.desc-head {
  font-weight: 700;
}

.desc {
  color: #9b9a9c;
  /* opacity: 0.7; */
}

.vendor {
  color: #136acd;
  font-weight: 700;
  font-size: 0.8em;
}

.dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  align-self: center;
  background: #686868;
  margin-top: 5px;
}

.split {
  /* border: 2px solid #bebebe; */
  border-radius: 30px;
  font-size: 0.8em;
  font-weight: 700;
  padding: 4px;
  box-shadow: 0px 2px 6px 2px #2c28281c;
  cursor: pointer;
}

.line {
  position: relative;
  top: 5px;
  color: #686868;
}

.modified {
  font-size: 0.9em;
}

.label-text {
  font-size: 0.8em;
  font-weight: 700;
  margin-bottom: 5px;
}

.error-div {
  background: #fff8f8;
  border-color: #ffe9e9;
  padding: 10px 5px;
  margin-bottom: 24px;
  border-radius: 8px;
  border: 1px solid transparent;
  border-left: 5px solid #b52626;
}

.error-message {
  margin-bottom: 0;
  font-size: 0.9em;
}

.adjust-left {
  margin-left: 78px;
}
</style>