<template>
  <div class="container-top" @click="hideModals">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12 px-0">
          <div class="parent-table">
            <div class=" px-0 container-fluid mt-4" style="height: fit-content" :class="{ 'bordered': !showEditTransaction , 'removeTable': showEditTransaction}">
              <div class="container-fluid table-top  py-3">
                <div class="row justify-content-end">
                  <div class="col-md-3 col-lg-3 col-8  py-md-0 d-flex align-items-center justify-content-end">
                    <p
                      @click="toggleFilterFormVissibility"
                      class="mb-0 c-pointer mt-2 mt-sm-0 mt-md-0 mt-lg-0 font-weight-700"
                    >
                      <el-icon :size="13">
                        <Filter />
                      </el-icon>
                      <span class="ml-1"> FILTER</span>
                    </p>
                  </div>
                  <div class=" col-md-5  col-12  d-flex align-items-center justify-content-center mt-2 py-2 py-md-0">
                    <el-input
                      size="small"
                      v-model="searchText"
                      placeholder="Search..."
                      @input="searchingMember = true"
                      @keyup.enter.prevent="searchTrancInDB"
                      class="input-with-select"
                    >
                      <template #suffix>
                        <el-button
                          style="padding: 5px; height: 22px"
                          @click.prevent="searchText = ''"
                        >
                          <el-icon :size="13">
                            <Close />
                          </el-icon>
                        </el-button>
                      </template>
                      <template #append>
                        <el-button @click.prevent="searchTrancInDB">
                          <el-icon :size="13">
                            <Search />
                          </el-icon>
                        </el-button>
                      </template>
                    </el-input>
                  </div>
                </div>
                <div
                class="filter-options"
                :class="{ 'filter-options-shown': filterFormIsVissible }"
              >
                <div class="container-fluid">
                  <div class="row mt-3">
                    <div class="col-md-9 ">
                      <div class="row">
                        <div
                          class="col-12 col-sm-12 col-md-6 offset-sm-0 offset-md-0 inp w-100"
                        >
                          <el-input
                            type="text"
                            class="w-100"
                            placeholder="Category"
                          />
                        </div>

                        <div
                          class="col-12 col-sm-6  d-none d-md-block"
                        >
                        <el-date-picker
                          v-model="datete"
                          type="date"
                          placeholder="Date"
                          size="large"
                          class="w-100"
                          format="MM/DD/YYYY"
                          value-format="MM-DD-YYYY"
                        />
                        </div>
                      </div>

                      <div class="row">
                        <div
                          class="col-12 col-sm-6  d-none d-md-block"
                        >
                          <el-input
                            type="text"
                            class="w-100"
                            placeholder="Description"
                          />
                        </div>

                        <div
                          class="col-12 col-sm-6 d-none d-md-block"
                        >
                        </div>
                      </div>
                    </div>

                    <div class="col-md-3 d-flex flex-column align-items-center">
                      <button class="apply-btn text-white" @click="applyFilter">
                        Apply
                      </button>
                      <span class="mt-2">
                        <a class="clear-link mr-2" @click="clearAll"
                          >Clear all</a
                        >
                        <span class="mx-2"
                          ><i
                            class="fas fa-circle"
                            style="font-size: 4px"
                          ></i></span
                        ><a class="hide-link ml-2" @click="hide">Hide</a>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              </div>
              <div class="row mt-3" v-if="refreshing && !loading">
               <div class="col-md-12 d-flex justify-conter-center">
                  <el-icon class="is-loading" :size="20">
                  <Loading />
                  </el-icon>
               </div>
              </div>
              <Table :data="selectedTransactions" :headers="transactionHeaders" :checkMultipleItem="true"
                @checkedrow="handleSelectionChange" v-loading="loading" >
                  <template v-slot:date="{ item }">
                    <div @click="rowSelected(item)" class="c-pointer">{{ formatDate(item.date) }}</div>
                  </template>
                  <template v-slot:description="{ item }">
                    <div @click="rowSelected(item)" class="c-pointer">{{ item.narration }}</div>
                  </template>
                  <template v-slot:amount="{ item }">
                    <div @click="rowSelected(item)" class="c-pointer" :class="{ 'text-danger': item.amount < 0, 'text-success': item.amount > 0 }">{{ item.currency ? item.currency.symbol : "" }}{{ amountWithCommas(Math.abs(item.amount)) }}</div>
                  </template>
                  <template v-slot:category="{ item }">
                    <div @click="rowSelected(item)" class="c-pointer primary-text">{{ item.category }}</div>
                  </template>
                  <template v-slot:approve="{ item }">
                    <div class="c-pointer">
                        <div class="spinner-border text-primary" style="font-size: 10px; width: 26px; height: 26px;" role="status"
                          v-show="item.approvingServiceReport">
                          <span class="sr-only">Loading...</span>
                        </div>
                        <div v-if="!item.approved && !item.approvingServiceReport" @click="approveReport(item, 1)">
                          <el-icon size="27">
                            <CircleCheck />
                          </el-icon>
                        </div>
                        <video height="30" autoplay @click="approveReport(item, 2)" class="approveservicereport" v-if="item.approved && !item.approvingServiceReport">
                          <source src="../../assets/check_animated.mp4" type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                    </div>
                  </template>
                  <template v-slot:action="{ item }">
                    <el-dropdown trigger="click">
                      <el-icon>
                        <MoreFilled />
                      </el-icon>
                      <template #dropdown>
                        <el-dropdown-menu>
                          <el-dropdown-item>
                            <div
                              @click.prevent="showConfirmModal(item.id, index)"
                              class="text-color"
                            >
                              Delete
                            </div>
                          </el-dropdown-item>
                        </el-dropdown-menu>
                      </template>
                    </el-dropdown>
                  </template>
              </Table>
              <div class="d-flex justify-content-center my-2 " v-if="(allTransactions && allTransactions.length === 0)  && !loading">
                <div>No data</div>
              </div>
              <div class="d-flex justify-content-end my-3">
                <el-pagination v-model:current-page="serverOptions.page" v-model:page-size="serverOptions.rowsPerPage" background
                  layout="total, sizes, prev, pager, next, jumper" :total="totalTransaction" @size-change="handleSizeChange"
                  @current-change="handleCurrentChange" />
              </div>
            </div>

            <div class="table edit-transac col-12 border col-sm-10 col-md-8 w-100 w-sm-50 w-md-50 w-lg-50 col-lg-4 mobile-form mywidt " v-if="showEditTransaction">
              <TransactionForm
                v-if="transactionDetails.type !== 'ledger'"
                @close-it="closeIt"
                @transac-obj="transacObj"
                :transactionDetails="transactionDetails"
                :showEditTransaction="showEditTransaction"
                @reload="getTransactions"
                :gettingSelectedTrsn="gettingSelectedTrsn"
              />
              <LedgerForm
                v-else
                @entrysaved="journalEntrySaved"
                @close-ledger="closeLedgerForm"
                :journalEntry="journalEntry"
                :gettingSelectedTrsn="gettingSelectedTrsn"
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, computed, onMounted, watchEffect, watch } from "vue";
import axios from "@/gateway/backendapi";
import finish from "../../services/progressbar/progress";
import TransactionForm from "../../views/accounting/transaction/EditTransaction";
import transaction_service from "../../services/financials/transaction_service";
import dateFormatter from "../../services/dates/dateformatter";
// import transactionService from "../../services/financials/transaction_service";
import LedgerForm from "../../views/accounting/transaction/components/LedgerForm";
import numbers_formatter from "../../services/numbers/numbers_formatter"
import Table from "@/components/table/Table"
import store from "../../store/store";
import { ElMessage, ElMessageBox } from 'element-plus'

export default {
  props: [
    "showEditTransaction",
    "transactionDetails",
    "selectedTransactionType",
    "journalEntry"
  ],
  components: {
    TransactionForm,
    LedgerForm,
    Table
  },
  setup(props, { emit }) {
    const transactions = ref([]);
    const allTransactions = ref(store.getters["transaction/gettransactions"].records);
    const totalTransaction = ref(store.getters["transaction/gettransactions"].totalItems);
    const datete = ref('');
    const searchingMember = ref(true);
    const paginatedTableLoading = ref(false);
    // const totalTransaction = ref(0)
    const transactionHeaders = ref([
      { name: 'DATE', value: 'date' },
      { name: 'DESCRIPTION', value: 'description' },
      { name: 'AMOUNT', value: 'amount' },
      { name: 'CATEGORY', value: 'category' },
      { name: 'Approve', value: 'approve' },
      { name: 'ACTION', value: 'action' },
    ])
    // const types = ["assets", "liability", "income", "expense", "equity"];
    const handleSelectionChange = (val) => {
      // checkedFirstTimer.value = val
    }
    

    const serverOptions = ref({
      page: 1,
      rowsPerPage: 50,
    });

     watch(serverOptions.value, () => {
      getTransactionByPage();
    },
      { deep: true }
    );

    const getTransactionByPage = async () => {
      paginatedTableLoading.value = true
      try {
        const { data } = await axios.get(
          `/api/Financials/Accounts/v2/Transactions?page=${serverOptions.value.page}`
        );
        allTransactions.value = data.records;
        paginatedTableLoading.value = false
      } catch (error) {
        paginatedTableLoading.value = false
        console.log(error);
      }
    };

    const searchTrancInDB = () => {
      if (searchText.value !== "" && allTransactions.value.length > 0) {
        return allTransactions.value.filter((i) => {
          if (i.narration)
            return i.narration
              .toLowerCase()
              .includes(searchText.value.toLowerCase());
        });
      } else {
        return allTransactions.value;
      }
    };
    const cashAndBank = ref([
      {
        name: {
          type: "akin",
          amount: "N2.00",
        },
      },
      {
        name: {
          type: "dapo",
          amount: "N5.00",
        },
      },
      {
        name: {
          type: "emma",
          amount: "N3.00",
        },
      },
    ]);
    const creditCard = ref([
      { name: { type: "tobi", amount: "N2.10" } },
      { name: { type: "afe", amount: "N5.21" } },
      { name: { type: "tosin", amount: "3.42" } },
    ]);
    const accountType = ref(["Cash and Bank", "Money in Transit"]);
    const liabilities = ref(["Credit Card", "Loan and Line of Credit"]);

    const filterFormIsVissible = ref(false);
    const searchIsVisible = ref(false);
    const accountDisplay = ref(false);
    const selectedTransaction = ref({
      type: "All acounts",
      amount: "N0.00",
    });
    const displayModal = ref(false);
    const showAccount = ref(false);
    const currencyList = ref([]);
    const showCurrency = ref(false);
    const selectAccount = ref("");
    const currencyText = ref("");
    const accountText = ref("");
    // const transacPropsValue = ref({});

    const toggleFilterFormVissibility = () =>
      (filterFormIsVissible.value = !filterFormIsVissible.value);

    const toggleSearch = () => {
      searchIsVisible.value = !searchIsVisible.value;
    };

    const toggleAccount = () => {
      accountDisplay.value = !accountDisplay.value;
    };

    const hideModals = (e) => {
      if (!e.target.classList.contains("close-modal")) {
        accountDisplay.value = false;
        showAccount.value = false;
        showCurrency.value = false;
      }
    };

    const transactionItem = (e) => {
      selectedTransaction.value = {
        type: e.target.children[0].innerHTML,
        amount: e.target.children[0].nextElementSibling.innerHTML,
      };
      accountDisplay.value = false;
    };

    const openModal = () => {
      displayModal.value = true;
    };

    const closeModal = () => {
      displayModal.value = false;
    };

    const getCurrenciesFromCountries = () => {
      let url = "/api/getallcountries";
      axios
        .get(url)
        .then((res) => {
          currencyList.value = res.data.map((i) => {
            return {
              name: i.currency,
              id: i.id,
              country: i.name,
            };
          });
        })
        .catch((err) => console.log(err));
    };
    getCurrenciesFromCountries();

    const filterCurrency = computed(() => {
      if (currencyText.value !== "" && currencyList.value.length > 0) {
        return currencyList.value.filter((i) => {
          if (i.name)
            return (
              i.name.toLowerCase().includes(currencyText.value.toLowerCase()) ||
              i.country.toLowerCase().includes(currencyText.value.toLowerCase())
            );
        });
      } else {
        return currencyList.value;
      }
    });

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
    const closeIt = (payload) => {
      emit("toggle-edit-form", payload);
    };

    const transacObj = (payload) => {
      transactions.value.push(payload);
    };

    const loading = ref(false);
    const refreshing = ref(false);
    const getTransactions = async () => {
      loading.value = true;
      emit("tableloading", loading.value)
         try {
            refreshing.value = true;
              await store.dispatch("transaction/getTransaction").then((res) => {
          finish();
            loading.value = false;
            emit("tableloading", loading.value)
            refreshing.value = false;
            allTransactions.value = res.records;
            totalTransaction.value = res.totalItems
        });
      } catch (error) {
        console.log(error);
        loading.value = false;
        emit("tableloading", loading.value)
        refreshing.value = false;
      }
    };

    const searchText = ref("");

    const selectedTransactions = computed(() => {
      if (!allTransactions.value || allTransactions.value.length === 0)
        return [];
      const targeted = allTransactions.value;
      if (!searchText.value) return targeted;
      return targeted.filter((i) => {
        return (
          (i.narration &&
            i.narration
              .toLowerCase()
              .includes(searchText.value.toLowerCase())) ||
          (i.amount && i.amount.toString().includes(searchText.value))
        );
      });
    });

    const formatDate = (date) => {
      // return dateFormatter.monthDayTime(date);
      return dateFormatter.monthDayYear(date);
    };

    const gettingSelectedTrsn = ref(false);
    const rowSelected = async (item) => {
      try {
        gettingSelectedTrsn.value = true;
        if (item.category === "Journal") {
          emit("select-journal", { });
        } else {
          emit("select-row", { });
        }
        const response = await transaction_service.getEditTransactions(item.transactionNumber);
        gettingSelectedTrsn.value = false;
        if (item.category === "Journal") {
          emit("select-journal", response.data);
        } else {
          emit("select-row", response.data);
        }
      } catch (error) {
        console.log(error);
        gettingSelectedTrsn.value = false;
      }
    };

    const getGroupedTransactions = async accountGroupId => {
      try {
        refreshing.value = true;
        const { data } = await transaction_service.getTransactionsByAccount(accountGroupId);
        refreshing.value = false;
        allTransactions.value = data;
      } catch (error) {
        console.log(error);
        refreshing.value = false;
      }
    }

    watch(
      () => props.selectedTransactionType,
      (data) => {
        if (data) getGroupedTransactions(data);
        if (!data) getTransactions();
      }
    );

    const closeLedgerForm = () => {
      emit("toggle-edit-form", false);
    }

    const amountWithCommas = amount => numbers_formatter.amountWithCommas(amount);


    const delTransaction = async (id, index) => {
       refreshing.value = true;
      try {
        const response = await transaction_service.deleteTransaction(id);
        if (response.data.status) {
          // allTransactions.value.splice(index, 1);
          allTransactions.value = allTransactions.value.filter(
            (item) => item.id !== id
          );
          emit("reload-accounts")
          ElMessage({
            type: "success",
            message: response.data.response,
            duration: 3000,
          });
           refreshing.value = false;
        store.dispatch('transaction/removeTransactionFromStore', id)
        } else {
          ElMessage({
            type: "error",
            message: "Delete Failed",
            duration: 3000,
          });
        }
      } catch (error) {
         refreshing.value = false;
        console.log(error);
         ElMessage({
            type: "error",
            message: "Delete Failed",
            duration: 3000,
          });
      }
    }

    const showConfirmModal = (id, index) => {
      ElMessageBox.confirm(
        "Are you sure you want to proceed?",
        "Confirm delete",
        {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "error",
        }
      )
        .then(() => {
          delTransaction(id, index);
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "Rejected",
            duration: 5000,
          });
        });
    };
    const handleSizeChange = (val) => {
      console.log(`${val} items per page`)
    }
    const handleCurrentChange = (val) => {
      console.log(`current page: ${val}`)
    }

    const journalEntrySaved = () => {
      getTransactions();
      emit('reload-accounts');
    }
    onMounted(() => {
      if ((!allTransactions.value) || (allTransactions.value && allTransactions.value.records && allTransactions.value.records.length == 0)){
        getTransactions();
      }
    });
  
    const approveReport = async (item, type) => {
      const index = selectedTransactions.value.findIndex(i => i.id == item.id)
      selectedTransactions.value[index].approvingServiceReport = true
      let payload = {
        id: item.id,
        approved: type == 1 ? true : false,
        memo: item.narration
      }
      
      try {
        await transaction_service.approveFinancialReport(payload)       
        if (index >= 0) {
          selectedTransactions.value[index].approved = type == 1 ? true : false
        }
        selectedTransactions.value[index].approvingServiceReport = false
        ElMessage({
          type: "success",
          message: `Transaction ${type == 1 ? "approved successfully" : "unapproved"}`,
          duration: 5000,
        });
      }
      catch (err) {
          selectedTransactions.value[index].approvingServiceReport = false
          console.error(err);
          ElMessage({
            type: "error",
            message: `Report not successfully approved, please try again`,
            duration: 5000,
          });
        }
    }
    

    return {
      transactions,
      allTransactions,
      handleCurrentChange,
      handleSizeChange,
      serverOptions,
      handleSelectionChange,
      paginatedTableLoading,
      datete,
      transactionHeaders,
      filterFormIsVissible,
      toggleFilterFormVissibility,
      getTransactionByPage,
      toggleSearch,
      searchIsVisible,
      cashAndBank,
      creditCard,
      accountDisplay,
      toggleAccount,
      hideModals,
      searchingMember,
      selectedTransaction,
      transactionItem,
      displayModal,
      openModal,
      closeModal,
      showAccount,
      totalTransaction,
      accountType,
      liabilities,
      getCurrenciesFromCountries,
      currencyList,
      showCurrency,
      selectAccount,
      filterCurrency,
      currencyText,
      accountText,
      filterAccount,
      filterLiabilities,
      searchTrancInDB,
      //   showEditTransaction,
      closeIt,
      transacObj,
      selectedTransactions,
      formatDate,
      rowSelected,
      searchText,
      getTransactions,
      closeLedgerForm,
      loading,
      amountWithCommas,
      delTransaction,
      showConfirmModal,
      refreshing,
      gettingSelectedTrsn,
      journalEntrySaved,
      approveReport
    };
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}


.events {
  font: normal normal 800 29px Nunito sans;
}
.whole-con {
  display: flex;
  /* background: #f1f5f8; */
  /* height: 100vh; */
}

.main-con {
  width: 100%;
  height: 70%;
}

.main-body {
  height: 100%;
}

.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 8px 10px;
  border: none;
  border-radius: 22px;
  width: 180px;
  font-size: 16px;
  font-weight: 600;
  margin: 0 8px;
  outline: none;
  text-decoration: none;
  box-sizing: border-box;
}

.button:hover {
  cursor: pointer;
}

.more-btn {
  background: #dde2e6;
}

.more-btn:first-child,
.more-btn:nth-child(2) {
  margin-right: 20px;
}

.btn-icon {
  padding: 0 8px;
}

.hr {
  border: 0.8px solid #0020440a;
  margin: 0 4px;
}

/* .table-top {
  font-weight: 800;
  font-size: 12px;
} */
.table-top {
  font-weight: 800;
  font-size: 12px;
  background: #fff;
  border: 1px solid #E0E0E0;
  border-bottom: none;
}

.table-top label:hover,
.table-top p:hover {
  cursor: pointer;
}

.select-all input {
  margin: 0 8px 0 -5px !important;
}

.label-search {
  width: 0;
  background: transparent;
  padding: 4px;
  overflow: hidden;
  transition: all 0.5 ease-in-out;
}
.label-search input {
  border: transparent;
  background: transparent;
  width: 70%;
  outline: none;
}

.label-search .search-btn {
  display: flex;
  align-items: center;
  background: #7894a6;
  padding: 4px;
  border-radius: 5px;
}

.label-search .empty-btn {
  display: flex;
  align-items: center;
  padding: 0 5px;
}

.show-search {
  width: 174px;
  overflow: hidden;
  transition: all 0.5 ease-in-out;
  border: 1px solid #dde2e6;
  border-radius: 5px 0px 0px 5px;
  background: #ebeff4;
  transition: all 0.5s ease-in-out;
}

.filter-options {
  height: 0;
  overflow: hidden;
  transition: all 0.5s ease-in-out;
}

.filter-options-shown {
  height: 120px !important;
  overflow: hidden;
  transition: all 0.5s ease-in-out;
}

@media screen and (max-width: 768px) {
  .filter-options-shown {
    height: 150px !important;
    overflow: hidden;
    transition: all 0.5s ease-in-out;
  }
}
@media screen and (max-width: 991px) {

  .removeTable{
        display: none;
  }

}
@media screen and (max-width: 991px) {

  .table.edit-transac{
        border-radius: 22px;
  }

}

/* .parent-desc {
  display: grid;
  grid-template-columns: 0.5fr 2fr 3fr 1fr 2fr 1fr;
  align-items: center;
} */

.desc-head {
  font-weight: 700;
}

.desc {
  color: #9b9a9c;
  /* opacity: 0.7; */
}

.parent-desc.first {
  color: #8898aa;
  font-size: 14px;
  font-weight: 600;
  box-shadow: 0px 3px 6px #2c28281c;
  background: #dde2e6 0% 0% no-repeat padding-box;
}

.t-header div {
  background: #dde2e6 0% 0% no-repeat padding-box;
  font-size: 16px;
  padding: .5rem 0;
}

.manual-dd-item {
  color: #495057;
}

.manual-dd-item:hover {
  background: #ecf0f3;
  cursor: pointer;
}

.style-category {
  box-shadow: 0px 3px 15px #797e8159;
  position: absolute;
  background: white;
  z-index: 1;
  width: 130%;
  max-height: 20em;
  overflow-y: scroll;
  overflow-x: hidden;
}

/* .create-event {
    border: 1px solid #ced4da;
    padding: 10px
} */

.create-event a {
  color: #136acd !important;
  text-decoration: none;
}

.create-new-event {
  text-align: center;
  font: normal normal bold 16px/22px Nunito Sans;
  letter-spacing: 0px;
  color: #136acd;
  padding: 15px;
}

.create-event a:hover {
  cursor: pointer;
}

.header-border {
  border-bottom: 1px solid #ebebeb;
}

.create-event {
  /* border: 2px solid red; */
  border-top: 1px solid #d4d4d4;
}

.create-event a:first-child {
  border-right: 1px solid #d4d4d4;
}

.transaction-button {
  font-size: 1.3em;
  display: flex;
  justify-content: space-around;
}

.arrow-icon {
  position: relative;
  right: 25px;
  top: 10px;
  /* margin-top: -31px; */
  font-size: 21px;
}

.select-elem-con {
  padding: 5px 10px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  justify-content: space-between;
}

.style-account {
  box-shadow: 0px 3px 15px #797e8159;
  position: absolute;
  background: white;
  z-index: 1;
  width: 92%;
  max-height: 14em;
  overflow-y: scroll;
}
.style-account div div:hover {
  /* background-color: #ecf0f3; */
  cursor: pointer;
}

.table.edit-transac {
  background: #dde2e6bb;
  /* margin-left: 15px; */
  width: 100%;
  height: fit-content;
  /* max-height: 518px;
        overflow-y: auto */
}

.table {
  border-radius: 22px;
}

.mobile-form {
  border-radius: 22px;
}

.slide-form {
  width: 50%;
  transition: all 0.6s cubic-bezier(0.445, 0.05, 0.55, 0.95);
  overflow: auto;
  transform: translateX(0);
  opacity: 1;
}

.hide-form {
  width: 50%;
  /*overflow: hidden;  */
  position: absolute;
  /* transition: all 0.6s cubic-bezier(0.445, 0.05, 0.55, 0.95); */
  transform: translateX(-100%);
  opacity: 0;
}

.parent-table {
  display: flex;
}

@media (max-width: 900px) {
  .parent-table {
    flex-direction: column;
  }
}

@media (max-width: 840px) {
  .top {
    flex-direction: column;
  }

  .actions {
    margin-top: 10px;
  }
}

@media (max-width: 600px) {
  .actions {
    display: flex;
    justify-content: end;
    /* flex-direction: column */
  }
}
@media screen and (max-width: 767px) {
  .action {
    display: flex;
    justify-content: space-between;
    /* justify-content: end; */
    /* flex-direction: column */
  }
  .mywidt{
    width: 100%;
    /* display: flex; */
  }
}

@media (min-width: 900px) {
  .table {
    border-radius: 22px 0 22px 22px;
  }

  .mobile-form {
    border-radius: 0 22px 22px 0;
  }

  .bordered {
    border-radius: 22px;
  }
}

/* @media (max-width: 750px) {
    .table {
      max-width: 617px;
      overflow-y: auto
    }
  } */
</style>