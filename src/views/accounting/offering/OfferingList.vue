<template>
  <div class="pb-4">
    <div class="row mt-5">
      <div class="col-12 p-0 col-md-4">
        <div class="col-12 p-0 mb-5">
          <el-select-v2
            v-model="selectedPeriodId"
            :options="periods.map((i) => ({ label: i.name, value: i.name }))"
            @change="setSelectedPeriod"
            placeholder="Select a period"
            size="large"
            class="w-100"
          />
        </div>
        <div class="col-12 w-100">
          <h2 class="font-weight-bold py-3 mb-3">
            {{ tenantCurrency.currency }}
            {{ chartData ? amountWithCommas(Math.round(chartData.income)) : 0 }}
          </h2>
        </div>
      </div>

      <div class="col-12 col-md-4">
        <ContributionPieChart
          domId="chart"
          distance="5"
          :titleMargin="10"
          :summary="pieChart"
        />
      </div>
      <div class="col-12 col-md-4">
        <ContributionAreaChart
          elemId="chart"
          domId="areaChart3"
          title="So Far"
          lineColor="#002044"
          :subtitle="chartData.name"
          :series="
            chartData && chartData.barChart ? chartData.barChart.data : {}
          "
          :attendanceSeries="attendanceSeries"
          :xAxis="LineGraphXAxis"
        />
      </div>
    </div>

    <div class="row">
      <div class="col-12 p-0 mt-5">
        <div class="table-top p-3 mt-5">
          <div
            class="row d-flex flex-column flex-sm-row justify-content-sm-end"
          >
            <span
              ><el-icon
                :size="20"
                class="c-pointer"
                v-if="marked.length > 0"
                @click="modal"
              >
                <Delete /> </el-icon
            ></span>
            <div
              class="filter col-md-2"
              @click="
                printJS({
                  ignoreElements: ['ignore1', 'ignore2'],
                  maxWidth: 867,
                  header: 'OFFERING TRANSACTIONS',
                  printable: printContribution,
                  properties: ['DATE', 'OFFERING', 'AMOUNT', 'DONOR'],
                  type: 'json',
                  headerStyle:
                    'font-family: Nunito Sans, Calibri; text-align: center;',
                  gridHeaderStyle:
                    'border: 1.5px solid #6d6d6d19; font-family: Nunito Sans, calibri; padding: 7px; text-align: left;',
                  gridStyle:
                    'border: 1.5px solid #6d6d6d19; font-family: Nunito Sans, calibri; padding: 7px; font-weight: 300',
                })
              "
            >
              <p class="mb-0 mr-3 d-flex my-3 my-sm-0">
                <el-icon :size="20"><Printer /></el-icon>
                <span class="ml-1"> PRINT</span>
              </p>
            </div>
            <div class="col-md-2">
              <p
                @click="toggleFilterFormVissibility"
                class="mb-0 mr-3 d-flex my-3 my-sm-0 c-pointer"
              >
                <el-icon :size="20">
                  <Filter />
                </el-icon>
                <span class="ml-1"> FILTER</span>
              </p>
            </div>
            <div class="col-md-5">
              <el-input
                size="small"
                v-model="searchText"
                placeholder="Search..."
                @input="searchOfferingInDB"
                @keyup.enter.prevent="searchOfferingInDB"
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
                  <el-button @click.prevent="searchOfferingInDB">
                    <el-icon :size="13">
                      <Search />
                    </el-icon>
                  </el-button>
                </template>
              </el-input>
            </div>
          </div>
          <div
            class="filter-options mt-3"
            :class="{ 'filter-options-shown': filterFormIsVissible }"
            id="ignore1"
          >
            <div class="container-fluid">
              <div class="row">
                <div class="col-md-9">
                  <div class="row">
                    <div
                      class="col-12 col-sm-6 col-md-4 offset-sm-3 offset-md-0 form-group inp w-100"
                    >
                      <el-input
                        type="text"
                        class="w-100"
                        placeholder="Offering"
                        v-model="filter.contribution"
                      />
                    </div>

                    <div class="col-12 col-md-4 form-group d-none d-md-block">
                      <el-input
                        type="text"
                        class="w-100"
                        placeholder="donor"
                        v-model="filter.donor"
                      />
                    </div>
                  </div>
                </div>

                <div class="col-md-3 d-flex flex-column align-items-center">
                  <el-button
                    round
                    :color="primarycolor"
                    class="text-white"
                    @click="applyFilter"
                  >
                    Apply
                  </el-button>
                  <span class="mt-2">
                    <a class="clear-link mr-2" @click="clearAll">Clear all</a>
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
        <div v-if="searchContribution.length > 0">
          <Table
            :data="searchContribution"
            :headers="offeringHeaders"
            :checkMultipleItem="true"
            v-loading="loading"
            @checkedrow="handleSelectionChange"
          >
            <template v-slot:date="{ item }">
              <div class="c-pointer" @click="offeringDetails(item.id)">
                {{ date(item.date) }}
              </div>
            </template>
            <template v-slot:offering="{ item }">
              <div class="c-pointer" @click="offeringDetails(item.id)">
                {{ item.contribution }}
              </div>
            </template>
            <template v-slot:amount="{ item }">
              <div class="c-pointer" @click="offeringDetails(item.id)">
                {{ item.currencyName
                }}{{ Math.abs(item.amount).toLocaleString() }}.00
              </div>
            </template>
            <template v-slot:source="{ item }">
              <div class="c-pointer" @click="offeringDetails(item.id)">
                {{ item.channel }}
              </div>
            </template>
            <template v-slot:donor="{ item }">
              <div class="c-pointer" @click="offeringDetails(item.id)">
                {{ item.donor }}
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
                      <router-link
                        class="text-decoration-none"
                        :to="
                          !item.activityId ||
                          item.activityId ===
                            '00000000-0000-0000-0000-000000000000'
                            ? {
                                name: 'OfferingReport',
                                query: {
                                  report: item.date.split('T')[0],
                                },
                              }
                            : {
                                name: 'OfferingReport',
                                query: {
                                  report: item.date.split('T')[0],
                                  activityID: item.activityId,
                                },
                              }
                        "
                      >
                        View Report
                      </router-link>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <router-link
                        :to="{
                          name: 'AddOffering',
                          params: { offId: item.id },
                        }"
                      >
                        Edit
                      </router-link>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <div
                        @click="showConfirmModal(item.id, index)"
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
        </div>
        <div class="text-danger d-flex justify-content-center" v-else>
          No records found
        </div>
        <!-- <div class="table-footer">
          <Pagination
            @getcontent="getPeopleByPage"
            :itemsCount="totalOfferingCount"
            :currentPage="currentPage"
          />
        </div> -->
        <div class="d-flex justify-content-end my-3">
          <el-pagination
            v-model:current-page="serverOptions.page"
            v-model:page-size="serverOptions.rowsPerPage"
            background
            layout="total, prev, pager, next, jumper"
            :total="totalOfferingCount"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch, inject } from "vue";
import axios from "@/gateway/backendapi";
import Table from "@/components/table/Table";
import router from "../../../router";
import Pagination from "../../../components/pagination/PaginationButtons";
import { useRoute } from "vue-router";
import moment from "moment";
import finish from "../../../services/progressbar/progress";
import monthDayYear from "../../../services/dates/dateformatter";
import printJS from "print-js";
import ContributionPieChart from "../../../components/charts/PieChart.vue";
import ContributionAreaChart from "../../../components/charts/AreaChart.vue";
import numbers_formatter from "../../../services/numbers/numbers_formatter";
import store from "../../../store/store";
import loadingComponent from "@/components/loading/LoadingComponent";
import stopProgressBar from "../../../services/progressbar/progress";
import { ElMessage, ElMessageBox } from "element-plus";
export default {
  props: ["contributionTransactions", "totalItem"],
  emits: ["marked"],
  components: {
    Table,
    Pagination,
    ContributionAreaChart,
    ContributionPieChart,
    loadingComponent,
  },
  setup(props, { emit }) {
    const filter = ref({});
    const primarycolor = inject("primarycolor");
    const selectedPeriodId = ref(null);
    const filterResult = ref([]);
    const noRecords = ref(false);
    const searchText = ref("");
    const tenantCurrency = ref({});
    const offeringHeaders = ref([
      { name: "Date", value: "date" },
      { name: "OFFERING", value: "offering" },
      { name: "AMOUNT", value: "amount" },
      { name: "SOURCE", value: "source" },
      { name: "DONOR", value: "donor" },
      { name: "ACTION", value: "action" },
    ]);
    const Allsummary = ref([
      { name: "Not Sure", y: 20 },
      { name: "Male", y: 16 },
      { name: "Female", y: 3 },
    ]);
    const serverOptions = ref({
      page: 1,
      rowsPerPage: 50,
    });

    watch(
      serverOptions.value,
      () => {
        getPeopleByPage();
      },
      { deep: true }
    );
    const handleSizeChange = (val) => {
      console.log(`${val} items per page`);
    };
    const handleCurrentChange = (val) => {
      console.log(`current page: ${val}`);
    };

    const totalOfferingCount = computed(() => {
      if (!props.totalItem) return 0;
      return props.totalItem;
    });

    const chartClass = ref(true);
    const periods = ref([
      { name: "One Week" },
      { name: "This Week" },
      { name: "Last Week" },
      { name: "This Month" },
      { name: "Last Month" },
      { name: "Last 30days" },
      { name: "Last 90days" },
      { name: "One Year" },
    ]);
    const selectedPeriod = ref({ name: "This Week" });
    const contributionSummary = ref({});
    const series = ref([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    const attendanceSeries = ref("");
    const route = useRoute();
    const filterFormIsVissible = ref(false);
    const toggleFilterFormVissibility = () =>
      (filterFormIsVissible.value = !filterFormIsVissible.value);
    const getRoute = () => {
      if (route.fullPath === "/tenant/offering") {
        chartClass.value = true;
      }
    };
    getRoute();

    const offeringDetails = (id) => {
      router.push(`/tenant/addoffering/${id}`);
    };
    selectedPeriodId.value = selectedPeriod.value.name;
    const setSelectedPeriod = () => {
      selectedPeriod.value = periods.value.find(
        (i) => i.name == selectedPeriodId.value
      );
    };

    const marked = ref([]);

    const convert = (x) => {
      return x.map((i) => i.id);
    };

    const deleteMarked = () => {
      let dft = convert(marked.value);
      axios
        .post(`/api/Financials/Contributions/Transactions/DeleteMultiple`, dft)
        .then((res) => {
          let incomingRes = res.data.response;
          ElMessage({
            type: "success",
            message: `Offering(s) deleted ${incomingRes}`,
            duration: 4000,
          });
          emit("marked", marked.value);
        })
        .catch((err) => {
          stopProgressBar();
          if (err.toString().toLowerCase().includes("network error")) {
            ElMessage({
              type: "warning",
              message:
                "Network Error,Please ensure you have a strong internet connection",
              duration: 5000,
            });
          } else if (err.toString().toLowerCase().includes("timeout")) {
            ElMessage({
              type: "warning",
              message: "Request took too long to respond",
              duration: 5000,
            });
          } else {
            ElMessage({
              type: "warning",
              message: "Unable to delete attendance",
              duration: 5000,
            });
          }
          console.log(err);
        });
    };

    const modal = () => {
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
          deleteMarked();
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "Rejected",
            duration: 5000,
          });
        });
    };
    const handleSelectionChange = (val) => {
      marked.value = val;
    };

    const markOne = (item) => {
      const offeringIdx = marked.value.findIndex((i) => i.id === item.id);
      if (offeringIdx < 0) {
        marked.value.push(item);
      } else {
        marked.value.splice(offeringIdx, 1);
      }
    };

    const markAll = () => {
      if (marked.value.length < props.contributionTransactions.length) {
        props.contributionTransactions.forEach((i) => {
          const memberInmarked = marked.value.findIndex((j) => j.id === i.id);
          if (memberInmarked < 0) {
            marked.value.push(i);
          }
        });
      } else {
        marked.value = [];
      }
    };

    const printContribution = computed(() => {
      if (props.contributionTransactions.length === 0) return [];
      return props.contributionTransactions.map((i) => {
        return {
          DATE: monthDayYear.monthDayYear(i.eventDate),
          OFFERING: i.contribution,
          AMOUNT: i.amount,
          DONOR: i.donor ? i.donor : "",
        };
      });
    });
    const deleteOffering = (id, index) => {
      axios
        .delete(`/api/Financials/Contributions/Transactions/Delete?ID=${id}`)
        .then((res) => {
          if (res.data.status) {
            ElMessage({
              type: "success",
              message: "Offering Transaction Deleted",
              duration: 5000,
            });
            emit("contri-transac", index);
            store.dispatch("contributions/removeContributionFromStore", id);
          } else {
            ElMessage({
              type: "warning",
              message: "Delete Failed, Please Try Again",
              duration: 5000,
            });
          }
        })
        .catch((err) => {
          finish();
          if (err.response) {
            ElMessage({
              type: "error",
              message: `${err.response}`,
              duration: 5000,
            });
          }
        });
    };
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
          deleteOffering(id, index);
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "Rejected",
            duration: 5000,
          });
        });
    };
    const currentPage = ref(0);
    const getPeopleByPage = async () => {
      try {
        const { data } = await axios.get(
          `/api/Financials/Contributions/Transactions?page=${serverOptions.value.page}`
        );
        console.log(data, 'bbb');
        if (data && data.data.length > 0) {
          emit("get-pages", data);
          currentPage.value = serverOptions.value.page;
        }
      } catch (error) {
        console.log(error);
      }
    };

    const offeringCount = computed(() => {
      if (
        !props.contributionTransactions ||
        props.contributionTransactions.length === 0
      )
        return 0;
      return props.contributionTransactions.length;
    });

    const date = (offDate) => {
      return monthDayYear.monthDayYear(offDate);
    };

    const applyFilter = () => {
      filter.value.contribution =
        filter.value.contribution == undefined ? "" : filter.value.contribution;
      filter.value.event =
        filter.value.event == undefined ? "" : filter.value.event;
      filter.value.donor =
        filter.value.donor == undefined ? "" : filter.value.donor;
      let url =
        "/api/Financials/Contributions/FilteredTransactions?contribution=" +
        filter.value.contribution +
        "&eventname=" +
        filter.value.event +
        "&donor=" +
        filter.value.donor;
      axios
        .get(url)
        .then((res) => {
          filterResult.value = res.data;
          if (res.data.length === 0) {
            noRecords.value = true;
          } else {
            noRecords.value = false;
          }
        })
        .catch((err) => console.log(err));
    };

    // Tosin
    const loading = ref(false);
    const searchOfferingsInDB = ref([]);
    const searchOfferingInDB = () => {
      loading.value = true;
      let url =
        "/api/Financials/Contributions/FilteredTransactions?contribution=" +
        searchText.value;
      axios
        .get(url)
        .then((res) => {
          loading.value = false;
          searchOfferingsInDB.value = res.data;
        })
        .catch((err) => {
          console.log(err);
          loading.value = false;
        });
    };

    const listOfOfferingItems = computed(() => {
      if (searchText.value !== "") return searchOfferingsInDB.value;
      return props.contributionTransactions;
    });

    const clearAll = () => {
      filter.value.contribution = "";
      filter.value.donor = "";
    };

    const hide = () => {
      filterFormIsVissible.value = false;
    };
    // Tosin

    const searchContribution = computed(() => {
      if (searchText.value !== "" && searchOfferingsInDB.value.length > 0) {
        return searchOfferingsInDB.value;
      } else if (
        filterResult.value.length > 0 &&
        (filter.value.contribution || filter.value.event || filter.value.donor)
      ) {
        return filterResult.value;
      } else {
        return props.contributionTransactions;
      }
    });

    const getContributionSummary = async () => {
      try {
        let { data } = await axios.get(
          "/api/financials/contributions/transactions/summary"
        );
        contributionSummary.value = data;
      } catch (err) {
        console.log(err);
      }
    };
    getContributionSummary();

    const getCurrentlySignedInUser = async () => {
      try {
        const res = await axios.get("/api/Membership/GetCurrentSignedInUser");
        axios
          .get(`/api/Lookup/TenantCurrency?tenantID=${res.data.tenantId}`)
          .then((res) => {
            tenantCurrency.value = res.data;
          })
          .catch((err) => console.log(err));
      } catch (err) {
        console.log(err);
      }
    };

    const getTenantCurrency = () => {
      if (
        store.getters.currentUser &&
        Object.keys(store.getters.currentUser).length > 0
      ) {
        tenantCurrency.value = store.getters.currentUser;
      } else {
        getCurrentlySignedInUser();
      }
    };
    getTenantCurrency();

    const chartData = computed(() => {
      if (
        contributionSummary.value &&
        contributionSummary.value.oneWeek &&
        selectedPeriod.value.name === "One Week"
      )
        return contributionSummary.value.oneWeek;
      if (
        contributionSummary.value &&
        contributionSummary.value.thisWeek &&
        selectedPeriod.value.name === "This Week"
      )
        return contributionSummary.value.thisWeek;
      if (
        contributionSummary.value &&
        contributionSummary.value.lastThirtyDays &&
        selectedPeriod.value.name === "Last 30days"
      )
        return contributionSummary.value.lastThirtyDays;
      if (
        contributionSummary.value &&
        contributionSummary.value.lastNinetyDays &&
        selectedPeriod.value.name === "Last 90days"
      )
        return contributionSummary.value.lastNinetyDays;
      if (
        contributionSummary.value &&
        contributionSummary.value.thisMonth &&
        selectedPeriod.value.name === "This Month"
      )
        return contributionSummary.value.thisMonth;
      if (
        contributionSummary.value &&
        contributionSummary.value.lastWeek &&
        selectedPeriod.value.name === "Last Week"
      )
        return contributionSummary.value.lastWeek;
      if (
        contributionSummary.value &&
        contributionSummary.value.lastMonth &&
        selectedPeriod.value.name === "Last Month"
      )
        return contributionSummary.value.lastMonth;
      if (
        contributionSummary.value &&
        contributionSummary.value.oneYear &&
        selectedPeriod.value.name === "One Year"
      )
        return contributionSummary.value.oneYear;
      return [];
      // contributionSummary.value.oneWeek.barChart.data
    });
    const pieChart = computed(() => {
      if (
        contributionSummary.value &&
        contributionSummary.value.oneWeek &&
        contributionSummary.value.oneWeek.pieChart.length > 0 &&
        selectedPeriod.value.name === "One Week"
      )
        return contributionSummary.value.oneWeek.pieChart;
      if (
        contributionSummary.value &&
        contributionSummary.value.thisWeek &&
        contributionSummary.value.thisWeek.pieChart.length > 0 &&
        selectedPeriod.value.name === "This Week"
      )
        return contributionSummary.value.thisWeek.pieChart;
      if (
        contributionSummary.value &&
        contributionSummary.value.lastThirtyDays &&
        contributionSummary.value.lastThirtyDays.pieChart.length > 0 &&
        selectedPeriod.value.name === "Last 30days"
      )
        return contributionSummary.value.lastThirtyDays.pieChart;
      if (
        contributionSummary.value &&
        contributionSummary.value.lastNinetyDays &&
        contributionSummary.value.lastNinetyDays.pieChart.length > 0 &&
        selectedPeriod.value.name === "Last 90days"
      )
        return contributionSummary.value.lastNinetyDays.pieChart;
      if (
        contributionSummary.value &&
        contributionSummary.value.thisMonth &&
        contributionSummary.value.thisMonth.pieChart.length > 0 &&
        selectedPeriod.value.name === "This Month"
      )
        return contributionSummary.value.thisMonth.pieChart;
      if (
        contributionSummary.value &&
        contributionSummary.value.lastWeek &&
        contributionSummary.value.lastWeek.pieChart.length > 0 &&
        selectedPeriod.value.name === "Last Week"
      )
        return contributionSummary.value.lastWeek.pieChart;
      if (
        contributionSummary.value &&
        contributionSummary.value.lastMonth &&
        contributionSummary.value.lastMonth.pieChart.length > 0 &&
        selectedPeriod.value.name === "Last Month"
      )
        return contributionSummary.value.lastMonth.pieChart;
      if (
        contributionSummary.value &&
        contributionSummary.value.oneYear &&
        contributionSummary.value.oneYear.pieChart.length > 0 &&
        selectedPeriod.value.name === "One Year"
      )
        return contributionSummary.value.oneYear.pieChart;
      return [];
    });
    const LineGraphXAxis = computed(() => {
      if (
        selectedPeriod.value.name === "This Week" ||
        selectedPeriod.value.name === "One Week" ||
        selectedPeriod.value.name === "Last Week" ||
        selectedPeriod.value.name === "This Month" ||
        selectedPeriod.value.name === "Last Month" ||
        selectedPeriod.value.name === "Last 30days" ||
        selectedPeriod.value.name === "Last 90days" ||
        selectedPeriod.value.name === "One Year"
      )
        return [1, 2, 3, 4, 5, 6, 7];
      return [];
    });

    const amountWithCommas = (amount) =>
      numbers_formatter.amountWithCommas(amount);

    return {
      deleteMarked,
      primarycolor,
      handleSizeChange,
      totalOfferingCount,
      handleCurrentChange,
      serverOptions,
      offeringDetails,
      offeringHeaders,
      setSelectedPeriod,
      selectedPeriodId,
      markAll,
      modal,
      markOne,
      marked,
      deleteOffering,
      filterFormIsVissible,
      toggleFilterFormVissibility,
      moment,
      applyFilter,
      filter,
      filterResult,
      noRecords,
      searchText,
      searchContribution,
      showConfirmModal,
      offeringCount,
      currentPage,
      getPeopleByPage,
      date,
      printJS,
      printContribution,
      Allsummary,
      chartData,
      chartClass,
      periods,
      selectedPeriod,
      contributionSummary,
      series,
      attendanceSeries,
      pieChart,
      handleSelectionChange,
      LineGraphXAxis,
      amountWithCommas,
      tenantCurrency,
      getCurrentlySignedInUser,
      loading,
      searchOfferingsInDB,
      searchOfferingInDB,
      listOfOfferingItems,
      clearAll,
      hide,
    };
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
  color: #02172e;
}

.myselectContr {
  height: 2.5rem;
}
.data-value a {
  color: #136acd;
  text-decoration: none;
  width: 241px;
}
.table-top {
  font-weight: 800;
  font-size: 12px;
  background: #fff;
  border: 1px solid #d4dde3;
  border-bottom: none;
}
.table-top label:hover,
.table-top p:hover {
  cursor: pointer;
}
.page-header {
  font-weight: 700;
  font-size: 1.7rem;
}
.summary {
  border-radius: 30px;
  padding: 24px 10px;
  background: #fff;
  box-shadow: 0px 3px 6px #2c28281c;
  border: 1px solid #00204424;
}
.table {
  width: 100% !important;
  box-shadow: 0px 1px 4px #02172e45;
  border: 1px solid #dde2e6;
  border-radius: 30px;
  text-align: left;
  margin-bottom: auto !important;
}
.boards {
  display: flex;
}
.board-top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
  align-items: center;
  box-shadow: 0px 3px 6px #2c28281c;
  padding: 4px;
}
.total {
  margin-bottom: 40px;
  font-size: 37px;
}
.total-text {
  font-size: 15px;
  font-weight: 700;
}
.percent {
  color: #136acd;
}
.hr {
  border: 1px solid #0020440a;
  margin: 0 4px 10px 0;
}
.tbl-footer-btn {
  background: transparent;
  padding: 4px;
  margin: 4px 8px;
  border-radius: 50%;
  width: 29px;
  border: none;
  border: 1px solid #8898aa80;
  outline: transparent;
}
.action-icon {
  text-align: center;
}
.list-body {
  padding: 0 21px;
}
.data-value {
  display: flex;
  padding-left: 6px;
}
.theader {
  padding-left: 2px;
  text-align: left;
}
.filter-options {
  height: 0;
  overflow: hidden;
  transition: all 0.5s ease-in-out;
}
.filter-options-shown {
  height: 80px !important;
  overflow: hidden;
  transition: all 0.5s ease-in-out;
}
.clear-link,
.hide-link {
  color: #136acd;
}

@media (max-width: 660px) {
  .select-all {
    display: none;
  }
}
.header {
  background: #dde2e6 0% 0% no-repeat padding-box;
  font: normal normal bold 13px/13px Nunito Sans;
  letter-spacing: 0px;
  color: #002044;
}
.header tr {
  color: #8898aa;
  font-size: 11px;
  box-shadow: 0px 3px 6px #2c28281c;
  background: #dde2e6 0% 0% no-repeat padding-box;
}
.select-all input {
  margin: 0 8px 0 -5px !important;
}
.currency {
  background: #fafafa 0% 0% no-repeat padding-box;
  border-radius: 5px;
  letter-spacing: 0px;
  color: #1c252c;
  padding: 4px;
  font-weight: bold;
}
.offering-amount {
  border: 1px solid #00204424;
  padding: 5px;
  border-radius: 5px;
}
.head-button {
  display: flex;
  justify-content: flex-end;
}
.add-btn {
  width: 180px;
  background: #136acd;
  border-radius: 22px;
  color: #ffffff;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 42px;
  text-decoration: none;
}
.more {
  background: #dde2e6;
  border-radius: 22px;
  width: 180px;
  font-weight: bold;
  border: transparent;
  outline: transparent;
  height: 42px;
  margin-right: 1rem;
}
.fa-ellipsis-v:hover {
  cursor: pointer;
}

.fa-ellipsis-v {
  padding: 10px;
}
#chart {
  width: 48%;
  max-height: 310px;
  border-radius: 10px;
}
.board.members-count {
  padding: 24px;
}
.no-record {
  color: rgba(184, 5, 5, 0.726);
  font-size: 1.1em;
}
.chart1,
.chart2 {
  border-radius: 10px;
}
.itemroute-color {
  color: #136acd;
}
@media (max-width: 767px) {
  .first-timers-text {
    text-align: center;
  }
  .head-button {
    display: flex;
    justify-content: center;
  }
}
@media screen and (max-width: 500px) {
  .board {
    width: 100% !important;
  }
}
@media screen and (min-width: 500px) {
  .theader {
    width: 23%;
  }
  .table-body .check {
    width: 3%;
  }
  .action {
    width: 5%;
  }
}
@media (max-width: 577px) {
  .head-button {
    flex-direction: column;
    align-items: center;
  }
  .more {
    margin-right: 0;
  }
  .add-btn {
    margin-top: 10px;
  }
}
@media (max-width: 575px) {
  .head-button {
    display: flex;
    justify-content: center;
  }
}
@media screen and (min-width: 501px) and (max-width: 768px) {
  .board {
    width: 50% !important;
    margin-bottom: 10px;
  }
  .summary-header {
    width: 50%;
    margin-left: 25%;
  }
}
@media screen and (max-width: 768px) {
  .filter-options-shown {
    height: 150px !important;
    overflow: hidden;
    transition: all 0.5s ease-in-out;
  }
  .boards {
    flex-wrap: nowrap;
  }
  .responsive-table {
    max-width: 100%;
    overflow-x: scroll;
  }
}
@media screen and (max-width: 1024px) {
  .my-con {
    flex-direction: column;
  }
  .table {
    width: 98%;
    margin: 24px auto;
  }
  .summary {
    width: 98%;
    margin: auto;
  }
}
.row-divider {
  border: 1px solid #0020440a;
  margin: 0;
}
.table-footer {
  display: flex;
  justify-content: flex-end;
  background: #fff;
  padding: 10px 0;
  border-radius: 0px 0px 22px 22px;
}
.board.members-count {
  max-height: 216px;
}
.table-header {
  padding: 12px;
  color: black;
  box-shadow: none;
  font-size: 11px;
  font-weight: 700;
}
.table-body {
  padding: 12px;
  border-bottom: 1.5px solid #6d6d6d19;
}
.itemroute-color {
  color: #136acd;
}
.itemroute-color:hover {
  text-decoration: none;
}
.t-header {
  background: #dde2e6 0% 0% no-repeat padding-box;
  font-size: 16px;
  padding: 0.5rem 0;
}
.parent-desc.first {
  color: #8898aa;
  font-size: 14px;
  font-weight: 600;
  box-shadow: 0px 3px 6px #2c28281c;
  background: #dde2e6 0% 0% no-repeat padding-box;
}
.desc-head {
  font-weight: 700;
}
.desc {
  color: #9b9a9c;
  /* opacity: 0.7; */
}

.hover:hover {
  background: #eee;
}
/* @media Queries */
@media (max-width: 771px) {
  .fontIncrease {
    /* color: red!important; */
    font-size: 20px;
  }
}
</style>