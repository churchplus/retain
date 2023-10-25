<template>
  <div class="container-fluid">
    <!-- header area -->
    <!-- <div class="container"> -->
    <div class="row flex-row justify-content-between align-items-center">
      <div class="centered-items">
        <div class="head-text">Wedding Anniversary Report</div>
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
    <!-- </div> -->
    <!--end of header area -->

    <!-- date area -->
    <!-- <div class="container-fluid bg-area my-3"> -->
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
            round
            :color="primarycolor"
            :loading="loading"
            @click="generateWeddingAnniversaryReport"
          >
            Generate Report
          </el-button>
        </div>
      </div>
    </div>
    <!-- </div> -->
    <!--end of date area -->
    <div id="element-to-print">
      <section class="row">
        <!-- chart area -->
        <div
          class="chart container-fluid"
          :class="
            weddingAnniversary && weddingAnniversary.length > 0
              ? 'graph-area'
              : ''
          "
        >
          <div class="row">
            <div class="chart1 col-12 col-md-6">
              <ByGenderChart
                domId="chart"
                title="Gender"
                distance="5"
                :titleMargin="10"
                :summary="membershipByGender"
              />
            </div>
            <div class="chart1 col-12 col-md-6">
              <ByGenderChart
                domId="chart2"
                title="Marital Status"
                distance="5"
                :titleMargin="10"
                :summary="membershipMaritalStatus"
              />
            </div>
          </div>
        </div>
        <!-- <div
          class="chart row my-1"
          :class="
            weddingAnniversary && weddingAnniversary.length > 0
              ? 'graph-area'
              : ''
          "
        >
          <div class="chart1 col-12 col-md-6">
            <ByGenderChart
              domId="chart3"
              title="Membership Status"
              distance="5"
              :titleMargin="10"
              :summary="membershipDistribution"
            />
          </div>
          <div class="chart1 col-12 col-md-6">
            <ByGenderChart
              domId="chart4"
              title="Age Group"
              distance="5"
              :titleMargin="10"
              :summary="membershipAgeGroup"
            />
          </div>
        </div> -->
        <!--end of chart area -->
      </section>

      <section>
        <!-- table header -->
        <div v-if="weddingAnniversary.length > 0" class="row">
          <div
            class="mt-2 container-fluid table-main px-0 remove-styles2 remove-border responsiveness"
          >
            <table
              id="table"
              class="table remove-styles mt-0 table-hover table-header-area"
            >
              <thead class="table-header-area-main">
                <tr
                  class="small-text text-capitalize text-nowrap font-weight-bold"
                  style="border-bottom: 0; font-size: medium"
                >
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Wedding Day</th>
                  <th scope="col">Mobile Phone</th>
                  <th scope="col">Email</th>
                  <th scope="col">Gender</th>
                  <th scope="col">Marital Status</th>
                  <!-- <th scope="col">Age Group</th>
                  <th scope="col">Membership</th>
                  <th scope="col">Home Address</th> -->
                </tr>
              </thead>
              <tbody
                class="font-weight-bold text-nowrap"
                style="font-size: small"
              >
                <tr
                  v-for="(anniversary, index) in weddingAnniversary"
                  :key="index"
                >
                  <td>{{ anniversary.firstName }}</td>
                  <td>{{ anniversary.lastName }}</td>
                  <td>{{ formatDate(anniversary.weddingDay) }}</td>
                  <td>{{ anniversary.mobilePhone }}</td>
                  <td>{{ anniversary.email }}</td>
                  <td>{{ anniversary.gender }}</td>
                  <td>{{ anniversary.maritalStatus }}</td>
                  <!-- <td>{{ anniversary.ageGroup }}</td>
                  <td>{{ anniversary.membership }}</td>
                  <td>{{ anniversary.homeAddress }}</td> -->
                </tr>
              </tbody>
            </table>
            <div class="table-foot d-flex justify-content-end mt-3">
              <!-- <PaginationButtons /> -->
            </div>
          </div>
        </div>
        <!--end table header -->
      </section>
    </div>
  </div>
</template>

<script>
import { ref, inject } from "vue";

import ByGenderChart from "@/components/charts/PieChart.vue";

import axios from "@/gateway/backendapi";
import dateFormatter from "../../../services/dates/dateformatter";
import { ElMessage } from "element-plus";

import printJS from "print-js";
import exportService from "../../../services/exportFile/exportservice";

export default {
  components: {
    ByGenderChart,
  },
  setup() {
    const startDate = ref("");
    const endDate = ref("");
    const weddingAnniversary = ref([]);
    const membershipByGender = ref([]);
    const membershipMaritalStatus = ref([]);
    const membershipDistribution = ref([]);
    const primarycolor = inject("primarycolor");
    const membershipAgeGroup = ref([]);
    const showExport = ref(false);
    const loading = ref(false);
    const fileName = ref("Wedding Anniversary Report");
    // const bookTypeList = ref(["xlsx", "csv", "txt"]);
    const bookTypeList = ref([
      { name: "xlsx" },
      { name: "csv" },
      { name: "txt" },
      { name: "" },
    ]);
    const selectedFileType = ref({});
    const fileHeaderToExport = ref([]);
    const fileToExport = ref([]);
    const generateWeddingAnniversaryReport = () => {
      loading.value = true;
      axios
        .get(
          `/api/Reports/people/getWeddingsReport?startDate=${new Date(
            startDate.value
          ).toLocaleDateString("en-US")}&endDate=${new Date(
            endDate.value
          ).toLocaleDateString("en-US")}`
        )
        .then((res) => {
          console.log(res);
          weddingAnniversary.value = res.data;
          membershipByGender.value = getMembershipGenderChart(res.data);
          membershipMaritalStatus.value = membershipMaritalStatusChart(
            res.data
          );
          if (weddingAnniversary.value.length == 0) {
            ElMessage({
              type: "warning",
              showClose: true,
              message: "No data for this date range",
              duration: 5000,
            });
          }
          membershipDistribution.value = membershipStatusChart(res.data);
          membershipAgeGroup.value = membershipAgeGroupChart(res.data);
          /* function to call service and populate table */
          setTimeout(() => {
            fileHeaderToExport.value = exportService.tableHeaderToJson(
              document.getElementsByTagName("th")
            );
            fileToExport.value = exportService.tableToJson(
              document.getElementById("table")
            );
          }, 1000);

          /* End function to call service and populate table */
          loading.value = false;
        })
        .catch((err) => {
          console.log(err);
          loading.value = false;
          ElMessage({
            type: "error",
            showClose: true,
            message: "Failed, please try again",
            duration: 5000,
          });
        });
    };

    /* Code For Exporting File */
    const downloadFile = (item) => {
      exportService.downLoadExcel(
        // selectedFileType.value.name,
        item.name,

        document.getElementById("element-to-print"),
        fileName.value,
        fileHeaderToExport.value,
        fileToExport.value
      );
    };
    /* End Code For Exporting File */

    const getAllItemsInWeddingReport = (arr, key, value) => {
      return {
        name: value,
        value: weddingAnniversary.value.filter((i) => i[key] === value).length,
      };
    };

    const getMembershipGenderChart = (arr) => {
      return [
        getAllItemsInWeddingReport(arr, "gender", "Male"),
        getAllItemsInWeddingReport(arr, "gender", "Female"),
        getAllItemsInWeddingReport(arr, "gender", null),
        getAllItemsInWeddingReport(arr, "gender", "Other"),
      ];
    };

    const membershipMaritalStatusChart = (arr) => {
      return [
        getAllItemsInWeddingReport(arr, "maritalStatus", "Married"),
        getAllItemsInWeddingReport(arr, "maritalStatus", "Single"),
      ];
    };

    const membershipStatusChart = (arr) => {
      return [
        getAllItemsInWeddingReport(arr, "membership", "Full Member"),
        getAllItemsInWeddingReport(arr, "membership", "Friend"),
        getAllItemsInWeddingReport(arr, "membership", "Not Member"),
      ];
    };

    const membershipAgeGroupChart = (arr) => {
      return [
        getAllItemsInWeddingReport(arr, "agegroup", "None"),
        getAllItemsInWeddingReport(arr, "agegroup", "20-30"),
        getAllItemsInWeddingReport(arr, "agegroup", "30-40"),
        getAllItemsInWeddingReport(arr, "agegroup", "40-60"),
      ];
    };

    const formatDate = (activityDate) => {
      return dateFormatter.monthDayYear(activityDate);
    };

    return {
      startDate,
      primarycolor,
      loading,
      endDate,
      weddingAnniversary,
      generateWeddingAnniversaryReport,
      formatDate,
      membershipByGender,
      membershipMaritalStatus,
      membershipDistribution,
      membershipAgeGroup,
      printJS,
      showExport,
      fileName,
      bookTypeList,
      selectedFileType,
      downloadFile,
    };
  },
};
</script>

<style scoped>
/* .default-btn {
  font-weight: 800;
  font-size: 1rem;
  white-space: initial;
  border-radius: 3rem;
  border: 1px solid #136acd;
  padding: 0.5rem 1.25rem;
  color: #136acd;
  width: auto;
  outline: transparent !important;
  max-height: 2.5rem;
  background: #fff;
  min-width: 7.6rem;
} */

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
  border-bottom: 0;
}

.graph-area {
  border: 1px solid #dde2e6;
  border-radius: 0.5rem;
  padding: 1rem 0rem;
  margin: 2rem 0rem !important;
  width: 100% !important;
  box-shadow: 0 0.063rem 0.25rem #02172e45;
}

.responsiveness {
  max-width: 100%;
  /* overflow-y: scroll; */
  overflow-x: scroll;
}

.move-enter-active {
  animation: move-in 0.8s;
}
.move-leave-active {
  animation: move-in 0.8s reverse;
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
}
</style>