<template>
  <div class="container-fluid">
    <!-- header area -->
    <div class="row flex-row justify-content-between align-items-center">
      <div class="centered-items">
        <h3 class="head-text">Income Statement Report</h3>
      </div>
      <div class="c-pointer my-sm-0 my-2">
        <el-dropdown trigger="click" class="w-100">
          <div
            class="d-flex justify-content-between default-btn text-dark w-100"
            size="large"
          >
            <span class="mt-1">Export</span>
            <div class="mt-1">
              <el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
            </div>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                v-for="(bookType, index) in bookTypeList"
                :key="index"
              >
                <a
                  class="no-decoration text-dark"
                  @click="downloadFile(bookType)"
                >
                  {{ bookType.name }}
                </a>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <div>
      <p class="">
        A detailed report of all incomes and expenses of the ministry in a given
        period.
      </p>
    </div>

    <!--end of header area -->
    <!-- date area -->
    <div class="row pl-1 pl-md-5 bg-area mt-sm-3">
      <div class="col-md-4 col-sm-12 px-md-0">
        <div class="p-field p-col-12 pt-md-2 pb-2">
          <div>
            <label for="icon" class="mb-0 font-weight-bold">Start Date</label>
          </div>
          <el-date-picker
            v-model="startDate"
            type="date"
            format="DD/MM/YYYY"
            size="large"
            class="w-100"
          />
        </div>
      </div>
      <div class="col-md-4 col-sm-12 pr-md-0">
        <div class="p-field p-col-12 pt-md-2">
          <div>
            <label for="icon" class="mb-0 font-weight-bold">End Date</label>
          </div>
          <el-date-picker
            v-model="endDate"
            type="date"
            format="DD/MM/YYYY"
            size="large"
            class="w-100"
          />
        </div>
      </div>
      <div class="col-md-4 col-sm-12 pr-md-0">
        <div class="p-field p-col-12 pt-md-2">
          <el-button
            class="c-pointer mt-4"
            :color="primarycolor"
            round
            :loading="loading"
            @click="generateReports"
          >
            Generate Report
          </el-button>
        </div>
      </div>
    </div>

  </div>
    <!--end of date area -->
    <div id="element-to-print" class="">
      <div
      class="container-fluid d-flex justify-content-center my-2"
      v-if="displayTitle"
    >
      <div class="head-text">{{fileName}}</div>
    </div>
      <section class="container-fluid  " :class="
            incomeStatement && incomeStatement.length > 0 ? 'graph-area' : ''
          ">
        <!-- chart area -->
        <div
          id=""
          class="  row"
          
        >
          <div class="col-12 col-md-6">
            <IncomeStatementChart
              domId="chart"
              title=""
              distance="5"
              :titleMargin="10"
              :summary="groupofIcomeAndExpense"
            />
          </div>

          <div
            class="col-12 col-md-6"
            :class="{ 'show-report': showReport, 'hide-report': !showReport }"
          >
            <IncomeStatmentColumnChart
              domId="chart1"
              title=""
              distance="5"
              :titleMargin="10"
              :data="columnChart"
              subtitle=""
              :series="['Income', 'Expense']"
              yAxisText="Amount"
            />
          </div>
        </div>
        <!--end of chart area-->
      </section>

      <section class="container-fluid ">
        <!-- table header -->
        <div class="row">
        <div
          id=""
          v-if="groupedIncomeItemToDisplay.length > 0"
          class="mt-2 container-fluid table-main remove-styles2 remove-border responsiveness"
        >
          <table id="table" class="table remove-styles mt-0 table-header-area">
            <thead class="table-header-area-main">
              <tr
                class="small-text text-capitalize text-nowrap font-weight-bold"
                style="border-bottom: 0; font-size: medium"
              >
              
                <th scope="col">Account Category</th>
                <th scope="col">Account Name</th>
                <th scope="col">Description</th>
                <th scope="col">Amount</th>
                <th scope="col">Date</th>
              </tr>
            </thead>

            <tbody
              class="font-weight-bold text-nowrap"
              style="font-size: small"
              v-for="(row, index) in tableRows"
              :key="index"
            >
              <tr>
                <td class="fundType-color" style="font-size: medium">
                  {{ row }}
                </td>
              
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr
                v-for="(account, indx) in tableData[row].expenses"
                :key="indx"
              >
             
                <td class="accounType-color">
                  {{ indx === 0 ? account.accountCategory : "" }}
                </td>
                <td>{{ account.accountName }}</td>
                <td>{{ account.description }}</td>
                <td>
                  {{
                    account.currency && account.currency.shortCode
                      ? account.currency.shortCode
                      : ""
                  }}
                  {{ Math.abs(account.amount).toLocaleString() }}.00
                </td>
                <td>{{ formatDate(account.date) }}</td>
              </tr>
              <tr class="answer-row" v-if="tableData[row].incomes.length > 0">
                <td class="subtotal">Subtotal</td>
       
                <td></td>
                <td></td>
                <td class="subtotal">
                  {{ currentUser.currency }}
                  {{ sum(tableData[row].expenses).toLocaleString() }}.00
                </td>
                <td></td>
              </tr>
              <tr v-for="(account, indx) in tableData[row].incomes" :key="indx">
          
                <td class="accounType-color">
                  {{ indx === 0 ? account.accountCategory : "" }}
                </td>
                <td>{{ account.accountName }}</td>
                <td>{{ account.description }}</td>
                <td>
                  {{
                    account.currency && account.currency.shortCode
                      ? account.currency.shortCode
                      : ""
                  }}
                  {{ Math.abs(account.amount).toLocaleString() }}.00
                </td>
                <td>{{ formatDate(account.date) }}</td>
              </tr>
              <tr class="answer-row" v-if="tableData[row].incomes.length > 0">
                <td class="subtotal">Subtotal</td>
  
                <td></td>
                <td></td>
                <td class="subtotal">
                  {{ currentUser.currency }}
                  {{ sum(tableData[row].incomes).toLocaleString() }}.00
                </td>
                <td></td>
              </tr>
              <tr class="answer-row" v-if="tableData[row].incomes.length > 0">
                <td class="total-answer">Total</td>
                
                <td></td>
                <td></td>
                <td class="total-answer">
                  {{ currentUser.currency }}
                  {{ sumOfDiffAcctInFunds(tableData[row]).toLocaleString() }}.00
                </td>
                <td></td>
              </tr>
              <tr style="background-color: #fff">
       
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
            </tbody>
            <tbody
              class="font-weight-bolder text-nowrap"
              style="font-size: small"
            >
              <tr class="answer-row2">
                <td class="gross-total">Net Total</td>
            
                <td></td>
                <td></td>
                <td class="gross-total responsive-horizontalrule">
                  <span
                    >{{ currentUser.currency }}
                    {{
                      Math.abs(diffBtwIncomeAndExpenses).toLocaleString()
                    }}.00</span
                  >
                  <hr class="horizontal-rule" />
                </td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>

        </div>

        <!--end table header -->
      </section>
    </div>
</template>

<script>
import { ref, computed, inject } from "vue";
import IncomeStatementChart from "@/components/charts/ReportPieChart.vue";
import IncomeStatmentColumnChart from "@/components/charts/ReportColumnChart.vue";
import axios from "@/gateway/backendapi";
import dateFormatter from "../../../../services/dates/dateformatter";
import printJS from "print-js";
import exportService from "../../../../services/exportFile/exportserviceforincomestatement.js";
import groupResponse from "../../../../services/groupArray/groupResponse.js";
import incomeExpenseHelper from "../../../Reports/Financialreport/Helper/Incomeexpenses-helper";
import { useStore } from "vuex";

export default {
  components: {
    IncomeStatementChart,
    IncomeStatmentColumnChart,
  },
  setup() {
    const store = useStore();
    const startDate = ref("");
    const endDate = ref("");
    const incomeStatement = ref([]);
    const groupedIncomeStatements = ref([]);
    const groupedExpenseStatements = ref([]);
    const groupedExpenseItemToDisplay = ref([]);
    const chartForIcomeAndExpense = ref([]);
    const groupofIcomeAndExpense = ref([]);
    // const mappedIncomeAndExpense = ref([])
    const allIncomeAndExpenses = ref([]);
    const incomeStatementData = ref([]);
    const primarycolor = inject("primarycolor");
    const loading = ref(false);
    const showExport = ref(false);
    const showReport = ref(false);
    const displayTitle = ref(false);
    const tenantId = ref(
      store.getters.currentUser && store.getters.currentUser.tenantId
        ? store.getters.currentUser.tenantId
        : 0
    );
    const fileName = ref(localStorage.getItem("branchName"));
    const bookTypeList = ref([
      { name: "xlsx" },
      { name: "csv" },
      { name: "txt" },
      { name: "pdf" },
    ]);
    const selectedFileType = ref("");
    const fileHeaderToExport = ref([]);
    const fileToExport = ref([]);
    const fundType = ref([]);
    const funds = ref([]);

    const currentUser = computed(() => {
      if (store && Object.keys(store.getters.currentUser).length > 0)
        return store.getters.currentUser;
      return "";
    });

    const tableData = ref({});
    const tableRows = computed(() => {
      if (!tableData.value) return [];
      return Object.keys(tableData.value);
    });

    const sum = (arr) => {
      if (!arr || arr.length <= 0) return 0;
      const amounts = arr.map((account) => account.amount);
      return Math.abs(amounts.reduce((a, b) => a + b));
    };

    const getSumOfIncomes = (type) => {
      let total = 0;
      for (let fund in tableData.value) {
        if (fund === "null") break;
        const amount = sum(tableData.value[fund][type]);
        total += amount;
      }
      return total;
    };

    const diffBtwIncomeAndExpenses = computed(() => {
      if (!tableData.value) return 0;
      const incomeTotal = getSumOfIncomes("incomes");
      const expenseTotal = getSumOfIncomes("expenses");

      return incomeTotal - expenseTotal;
    });

    const sumOfDiffAcctInFunds = (item) => {
      let incomeres = item.incomes.reduce((a, b) => {
        return { amount: +a.amount + +b.amount };
      });

      let expenseres =
        item.expenses.length > 0
          ? item.expenses.reduce((a, b) => {
              return { amount: +a.amount + +b.amount };
            })
          : 0;

      const subtractValue =
        Math.abs(incomeres.amount || 0) - Math.abs(expenseres.amount || 0);
      return subtractValue;
    };

    const generateReports= () => {
      loading.value = true;
      let branchID = localStorage.getItem("branchId")
      axios
        .get(
          `/api/BranchReports/financials/IncomeStatementReport?startDate=${new Date(
            startDate.value
          ).toLocaleDateString("en-US")}&endDate=${new Date(
            endDate.value
          ).toLocaleDateString("en-US")}&tenantID=${branchID}`
        )
        .then((res) => {
          tableData.value = incomeExpenseHelper.formatAccounts(res.data);
          incomeStatement.value = res.data.filter((i) => i !== null);
          if (incomeStatement.value.length > 0) {
            showReport.value = true;
          } else {
            showReport.value = false;
          }
          churchIncomes(incomeStatement.value, "accountCategory");
          churchExpense(incomeStatement.value, "accountCategory");
          pieChart(incomeStatement.value, "accountCategory");
          groupedFundType();
          groupAccountCategoery();
          setTimeout(() => {
            fileHeaderToExport.value = exportService.tableHeaderToJson(
              document.getElementsByTagName("th")
            );
            fileToExport.value = exportService.tableToJson(
              document.getElementById("table")
            );
          }, 1000);
          console.log(res, 'income');
          loading.value = false;
        })
        .catch((err) => {
          console.log(err);
          loading.value = false;
        });
    };

    const groupedFundType = () => {
      fundType.value = groupResponse.groupData(incomeStatement.value, "fund");
      for (const prop in fundType.value) {
        funds.value.push({ name: prop, value: fundType.value[prop] });
      }
    };
    groupedFundType();

    const groupAccountCategoery = (arr) => {
      if (!arr || arr.length === 0) return;
      const category = [];
      const categoryType = groupResponse.groupData(arr, "accountCategory");
      for (const prop in categoryType) {
        category.push({
          name: prop,
          value: categoryType[prop],
        });
      }
      return category;
    };
    groupAccountCategoery();

    /* Code For Exporting File */
    const downloadFile = (item) => {
      if (item.name === "pdf") {
        displayTitle.value = true;
      } else {
        displayTitle.value = false;
      }
      exportService.downLoadExcel(
        item.name,
        document.getElementById("element-to-print"),
        fileName.value,
        fileHeaderToExport.value,
        fileToExport.value
      );
    };
    /* End Code For Exporting File */

    /* Chart Area */
    const pieChart = (array, key) => {
      let result = array.reduce((result, currentValue) => {
        // If an array already present for key, push it to the array. Else create an array and push the object
        (result[currentValue[key]] = result[currentValue[key]] || []).push(
          currentValue
        );
        // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
        return result;
      }, {}); // empty object is the initial value for result object
      groupofIcomeAndExpense.value = [];
      for (const prop in result) {
        groupofIcomeAndExpense.value.push({
          name: prop,
          value: result[prop].reduce((acc, cur) => {
            return Math.abs(acc + cur.amount);
          }, 0),
        });
      }
    };

    const columnChart = computed(() => {
      if (groupofIcomeAndExpense.value.length === 0) return [];
      allIncomeAndExpenses.value.push({
        name: "Income",
        //  color: '#002044',
        data: [groupofIcomeAndExpense.value[0].value],
      });

      allIncomeAndExpenses.value.push({
        name: "Expense",
        //  color: '#002044',
        data: [groupofIcomeAndExpense.value[1].value],
      });
      return allIncomeAndExpenses.value;
    });
    /*End of Chart Area */

    let groupedIncomeItemToDisplay = ref([]);
    const churchIncomes = (array, key) => {
      let result = array.reduce((result, currentValue) => {
        // If an array already present for key, push it to the array. Else create an array and push the object
        (result[currentValue[key]] = result[currentValue[key]] || []).push(
          currentValue
        );
        // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate

        return result;
      }, {}); // empty object is the initial value for result object
      groupedIncomeStatements.value = [];
      for (const prop in result) {
        groupedIncomeStatements.value.push({
          name: prop,
          value: result[prop],
        });
      }
      groupedIncomeItemToDisplay.value = groupedIncomeStatements.value[0].value;
    };

    const churchExpense = (array, key) => {
      let result = array.reduce((result, currentValue) => {
        (result[currentValue[key]] = result[currentValue[key]] || []).push(
          currentValue
        );
        return result;
      }, {});
      groupedExpenseStatements.value = [];
      for (const prop in result) {
        groupedExpenseStatements.value.push({
          name: prop,
          value: result[prop],
        });
      }
      groupedExpenseItemToDisplay.value =
        groupedExpenseStatements.value[1].value;
    };

    const fundSum = computed(() => {
      if (incomeStatement.value.length === 0) return 0;
      return incomeStatement.value.reduce((a, b) => {
        return a + b.amount;
      }, 0);
    });

    const formatDate = (activityDate) => {
      return dateFormatter.monthDayYear(activityDate);
    };

    return {
      sumOfDiffAcctInFunds,
      groupAccountCategoery,
      primarycolor,
      loading,
      fundSum,
      startDate,
      endDate,
      incomeStatement,
      generateReports,
      formatDate,
      groupedIncomeStatements,
      groupedExpenseStatements,
      displayTitle,
      churchIncomes,
      churchExpense,
      groupedIncomeItemToDisplay,
      groupedExpenseItemToDisplay,
      chartForIcomeAndExpense,
      groupofIcomeAndExpense,
      pieChart,
      incomeStatementData,
      printJS,
      showExport,
      showReport,
      fileName,
      bookTypeList,
      selectedFileType,
      tenantId,
      downloadFile,
      fundType,
      funds,
      groupedFundType,
      tableRows,
      tableData,
      sum,
      diffBtwIncomeAndExpenses,
      columnChart,
      currentUser,
    };
  },
};
</script>

<style scoped>
.default-btn {
  font-weight: 600;
  white-space: initial;
  font-size: 1rem;
  border-radius: 3rem;
  border: 1px solid #002044;
  padding: 0.5rem 1.25rem;
  width: auto;
  /* border:none; */
  /* outline: transparent !important; */
  max-height: 40px;
  /* background: #6c757d47 !important; */
  min-width: 121px;
}

.generate-report {
  font-size: 1rem;
  color: #fff;
  background-color: #136acd !important;
  border: none;
  min-width: 7rem;
}

.heading-text {
  font: normal normal 800 1.5rem Nunito sans;
}

.bg-area {
  background-color: #ebeff4;
  border-radius: 0.5rem;
  padding: 0.2rem 0 1.2rem 0;
}

.table {
  width: 100% !important;
  box-shadow: 0 0.063rem 0.25rem #02172e45;
  border: 0.063rem solid #dde2e6;
  border-radius: 30px;
  text-align: left;
  margin-bottom: auto !important;
  padding-bottom: 0.5rem;
}

.table-header-area {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.table-header-area-main {
  background-color: #ebeff4;
}
.show-report {
  display: block;
}
.hide-report {
  display: none;
}

.table-main {
  width: 100% !important;
  box-shadow: 0 0.063rem 0.25rem #02172e45 !important;
  border: 0.063rem solid #dde2e6 !important;
  /* border-radius: 30px !important; */
  text-align: left !important;
  margin-bottom: auto !important;
  padding-bottom: 0.5rem !important;
}

.remove-styles {
  border: none !important;
  box-shadow: none !important;
  border-bottom: 0 !important;
  border-bottom-left-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
}

.remove-styles2 {
  padding-right: 0;
  padding-left: 0;
  border-top-left-radius: 0 !important;
  border-top-right-radius: 0 !important;
}

.remove-border {
  box-shadow: none !important;
}

.tablerow-style {
  min-width: 100%;
  border-bottom: 0px;
}

.graph-area {
  border: 1px solid #dde2e6;
  border-radius: 0.5rem;
  padding: 1rem 0rem;
  margin: 2rem 0rem;
}

.responsiveness {
  max-width: 100%;
  overflow-x: scroll;
  /* overflow-y: scroll; */
}

.subtotal {
  font-weight: 700;
  font-size: large;
  color: #136acd;
}

.total-answer {
  font-weight: 900;
  font-size: large;
  color: #136acd;
}

.answer-row {
  background-color: #ebeff4;
}

.answer-row:hover {
  background-color: none;
}

.fundType-color {
  color: #136acd;
  font-size: larger;
}

.accounType-color {
  font-size: medium;
}

.horizontal-rule {
  border-radius: 5px;
  margin: 0.125rem 0;
  background: white;
  height: 1px;
}

.responsive-horizontalrule {
  display: inline-block;
}

.answer-row2 {
  background-color: #136acd;
}

.gross-total {
  font-weight: bolder;
  font-size: large;
  color: #fff;
}

/* .move-enter-active {
  animation: move-in .8s;
}
.move-leave-active {
  animation: move-in .8s reverse;
}
@keyframes move-in {
  0% {
    transform: translateX(-100px);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }

} */

/* .fade-enter-active {
  animation: fade-in .5s;
}
.fade-leave-active {
  animation: fade-in .5s reverse;
}
@keyframes fade-in {
  0% {
    transform: translateX(50px);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }

} */
</style>
