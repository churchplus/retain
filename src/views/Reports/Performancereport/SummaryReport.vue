<template>
  <div class="container-fluid">
    <div class="row justify-content-between">
      <div class="head-text">Church Activities Performance Summary Report</div>
      <div class="my-sm-0 my-2 c-pointer">
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
    <div style="background: #ebeff4" class="row mt-3 py-5">
      <div class="col-12 col-md-6 col-lg-3">
        <div><label for="" class="font-weight-bold">Select Event</label></div>
        <div>
          <el-select-v2
            v-model="selectedEventID"
            class="w-100 font-weight-normal"
            :options="
              allEvents.map((i) => ({
                label: i.text,
                value: i.id,
              }))
            "
            placeholder="Select event"
            @change="setSelectedEvent"
            size="large"
          />
        </div>
      </div>
      <div class="col-12 col-md-6 col-lg-3">
        <div class="">
          <label for="" class="ml-2 font-weight-bold">Start Date</label>
        </div>
        <div>
          <div>
            <el-date-picker
              v-model="startDate"
              type="date"
              format="DD/MM/YYYY"
              size="large"
              class="w-100"
            />
          </div>
        </div>
      </div>
      <div class="col-12 col-md-6 col-lg-3">
        <div><label for="" class="font-weight-bold w-100">End Date</label></div>
        <div>
          <el-date-picker
            v-model="endDate"
            type="date"
            format="DD/MM/YYYY"
            size="large"
            class="w-100"
          />
        </div>
      </div>
      <div class="col-12 col-md-6 col-lg-3">
        <label for=""></label>
        <div class="mt-2">
          <el-button
            @click="getAnalysisReport()"
            round
            :color="primarycolor"
            :loading="loading"
            class=" "
            >Generate Report</el-button
          >
        </div>
      </div>
    </div>
  </div>
  <div id="element-to-print">
    <div
      class="container-fluid d-flex justify-content-center my-2"
      v-if="displayTitle"
    >
      <div class="head-text">Church Activities Performance Summary Report</div>
    </div>
    <div class="container-fluid">
      <div class="row">
        <div
          class="borderInner mb-2"
          :class="{ 'show-report': showReport, 'hide-report': !showReport }"
        >
          <h5 class="ml-3 mt-5"></h5>
          <div class="round-border" v-show="analysisReport.length > 0">
            <PerformanceColumnChart
              domId="chart"
              title="Service Performance Chart"
              distance="5"
              :titleMargin="10"
              :data="FTNCChart"
              :series="series"
              :seriesText="`First timer and new convert analysis`"
            />
          </div>
        </div>
        <div
          class="borderInner mb-2"
          :class="{ 'show-report': showReport, 'hide-report': !showReport }"
        >
          <h5 class="ml-3 mt-5"></h5>
          <div class="round-border" v-show="analysisReport.length > 0">
            <PerformanceColumnChart
              domId="chart1"
              title=" Attendance Analysis Chart"
              distance="5"
              :titleMargin="10"
              :data="attendanceChart"
              :series="series"
              :seriesText="`Attendance analysis`"
            />
          </div>
        </div>
        <div
          class="borderInner mb-2"
          :class="{ 'show-report': showReport, 'hide-report': !showReport }"
        >
          <h5 class="ml-3 mt-5"></h5>
          <div class="round-border" v-show="analysisReport.length > 0">
            <PerformanceColumnChart
              domId="chart2"
              title="First Timers Analysis Chart"
              distance="5"
              :titleMargin="10"
              :data="firstTimerChart"
              :series="series"
              :seriesText="`First Timers Analysis Chart`"
            />
          </div>
        </div>
        <div
          class="borderInner mb-2"
          :class="{ 'show-report': showReport, 'hide-report': !showReport }"
        >
          <h5 class="ml-3 mt-5"></h5>
          <div class="round-border" v-show="analysisReport.length > 0">
            <PerformanceColumnChart
              domId="chart3"
              title="New Converts Analysis Chart"
              distance="5"
              :titleMargin="10"
              :data="newConvertsChart"
              :series="series"
              :seriesText="`New Converts Analysis Chart`"
            />
          </div>
        </div>

        <section class="container-fluid">
          <!-- table header -->
          <div class="row">
            <div
              class="container-fluid table-main px-0 remove-styles2 remove-border responsiveness mb-5 mt-5"
              id="table"
              v-show="analysisReport.length > 0"
              :class="{ 'show-report': showReport, 'hide-report': !showReport }"
            >
              <table
                class="table remove-styles mt-0 table-hover table-header-area"
              >
                <thead class="table-header-area-main">
                  <tr
                    class="font-weight-bold text-capitalize text-nowrap"
                    style="border-bottom: 0"
                  >
                    <th scope="col">Event Name</th>
                    <th scope="col">Date</th>
                    <th scope="col">Description</th>
                    <th scope="col">Topic</th>

                    <th scope="col">First Timers</th>
                    <th scope="col">New Converts</th>
                    <th scope="col">Testimonies</th>
                  </tr>
                </thead>
                <tbody class="font-weight-bold small-text text-nowrap">
                  <tr
                    v-for="(analysisTable, index) in analysisReport"
                    :key="index"
                  >
                    <td>
                      {{
                        selectedSummary.length > 1 ||
                        (selectedSummary.length == 1 && index == 0)
                          ? analysisTable.eventName
                          : ""
                      }}
                    </td>
                    <td>{{ formatDate(analysisTable.date) }}</td>
                    <td>{{ analysisTable.description }}</td>
                    <td>{{ analysisTable.topic }}</td>

                    <td>{{ analysisTable.firstTimers }}</td>
                    <td>{{ analysisTable.newConverts }}</td>
                    <td>{{ analysisTable.testmonies }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <!--end table header -->
        </section>
      </div>
    </div>
  </div>
</template>


<script>
import { ref, computed, inject } from "vue";
import PerformanceColumnChart from "../../../components/charts/ReportColumnChart.vue";
import exportService from "../../../services/exportFile/exportservice";
import printJS from "print-js";
import axios from "@/gateway/backendapi";
import dateFormatter from "../../../services/dates/dateformatter.js";
import { ElMessage } from "element-plus";

export default {
  components: {
    PerformanceColumnChart,
  },

  setup() {
    const formatDate = (date) => {
      return dateFormatter.normalDate(date);
    };
    const showExport = ref(false);
    const selectedEventID = ref(null);
    const showReport = ref(false);
    const loading = ref(false);
    const displayTitle = ref(false);
    const primarycolor = inject("primarycolor");
    const fileName = ref("Church Activities  Summary Report");
    const bookTypeList = ref([
      { name: "xlsx" },
      { name: "csv" },
      { name: "txt" },
      { name: "pdf" },
    ]);
    const selectedFileType = ref("");
    const fileHeaderToExport = ref([]);
    const fileToExport = ref([]);
    const colunmChartAttendance = ref([
      {
        name: "First Timers",
        color: "",
        data: [1, 67, 89, 67, 80, 66, 80, 67, 789, 7, 80, 47, 90],
      },
    ]);
    const colunmChartNewCovert = ref([
      {
        name: "New Convert",
        color: "",
        data: [1, 67, 89, 67, 80, 56, 70, 67, 79, 7, 80, 89, 80],
      },
    ]);
    const series = ref([]);
    const series1 = ref([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    const allEvents = ref([]);
    const analysisReport = ref([]);
    const startDate = ref("");
    const endDate = ref("");
    const selectedSummary = ref([]);
    const selectedSummaryChart = ref([]);
    const report = ref([]);
    const attendanceData = ref([]);
    const firstTimerData = ref([]);
    const newConvertData = ref([]);
    const newConvert1Data = ref([]);
    const firstTimer1Data = ref([]);
    const testmoniesData = ref([]);
    const mainAttendanceData = ref([]);
    const mainFirstTimerData = ref([]);
    const mainNewConvertData = ref([]);
    const mainFirsttimerNewCovertData = ref([]);

    const getAllEvents = () => {
      axios
        .get("/api/Reports/events/getEvents")
        .then((res) => {
          allEvents.value = res.data;
        })
        .catch((err) => console.log(err));
    };
    getAllEvents();
    const setSelectedEvent = () => {
      selectedSummary.value = allEvents.value.find(
        (i) => i.id === selectedEventID.value
      );
    };
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
    const getAnalysisReport = () => {
      loading.value = true;
      analysisReport.value = [];
      const activityId = selectedSummary.value ? selectedSummary.value.id : "";
      axios
        .get(
          `/api/Reports/events/getActivityAnalysisReport?startDate=${new Date(
            startDate.value
          ).toLocaleDateString("en-US")}&endDate=${new Date(
            endDate.value
          ).toLocaleDateString("en-US")}&eventId=${activityId}`
        )
        .then((res) => {
          analysisReport.value = res.data;

          mainAttendanceData.value = [];
          mainFirstTimerData.value = [];
          mainNewConvertData.value = [];
          mainFirsttimerNewCovertData.value = [];

          getEventServices();
          setTimeout(() => {
            fileHeaderToExport.value = exportService.tableHeaderToJson(
              document.getElementsByTagName("th")
            );
            fileToExport.value = exportService.tableToJson(
              document.getElementById("table")
            );
          }, 1000);
          showReport.value = true;
          if (analysisReport.value.length === 0) {
            ElMessage({
              type: "warning",
              showClose: true,
              message: "No data for this date range",
              duration: 5000,
            });
          }
          loading.value = false;
        })
        .catch((err) => {
          loading.value = false;
          console.log(err);
        });
    };

    const attendanceChart = computed(() => {
      if (analysisReport.value.length === 0) return [];
      analysisReport.value.forEach((i) => {
        let attendanceIndex = Object.keys(i).findIndex(
          (i) => i === "attendance"
        );
        let attendanceValue = Object.values(i)[attendanceIndex];
        attendanceData.value.unshift(attendanceValue);
      });

      mainAttendanceData.value.push({
        name: "Attendance",
        color: "#f94144",
        data: attendanceData.value,
      });
      return mainAttendanceData.value;
    });

    const colunmChart = ref(attendanceChart.value);

    const firstTimerChart = computed(() => {
      if (analysisReport.value.length === 0) return [];
      analysisReport.value.forEach((i) => {
        let firstTimersIndex = Object.keys(i).findIndex(
          (i) => i === "firstTimers"
        );
        let firstTimersValue = Object.values(i)[firstTimersIndex];
        firstTimer1Data.value.unshift(firstTimersValue);
      });

      mainFirstTimerData.value.push({
        name: "first Timers",
        color: "#3f37c9",
        data: firstTimer1Data.value,
      });
      return mainFirstTimerData.value;
    });
    const colunmChart1 = ref(firstTimerChart.value);

    const newConvertsChart = computed(() => {
      if (analysisReport.value.length === 0) return [];
      analysisReport.value.forEach((i) => {
        let newConvertsIndex = Object.keys(i).findIndex(
          (i) => i === "newConverts"
        );
        let newConvertsValue = Object.values(i)[newConvertsIndex];
        newConvert1Data.value.unshift(newConvertsValue);
      });
      mainNewConvertData.value.push({
        name: "New Converts",
        color: "#fca311",
        data: newConvert1Data.value,
      });

      return mainNewConvertData.value;
    });

    const getEventServices = () => {
      analysisReport.value.forEach((i) => {
        let serviceIndex = Object.keys(i).findIndex((i) => i === "date");
        let serviceValue = Object.values(i)[serviceIndex];
        series.value.unshift(dateFormatter.monthDayYear(serviceValue));
      });
    };

    const FTNCChart = computed(() => {
      if (analysisReport.value.length === 0) return [];
      analysisReport.value.forEach((i) => {
        let firstTimersIndex = Object.keys(i).findIndex(
          (i) => i === "firstTimers"
        );
        let firstTimersValue = Object.values(i)[firstTimersIndex];
        firstTimerData.value.unshift(firstTimersValue);

        let newConvertIndex = Object.keys(i).findIndex(
          (i) => i === "newConverts"
        );
        let newConvertValue = Object.values(i)[newConvertIndex];
        newConvertData.value.unshift(newConvertValue);

        let testmoniesIndex = Object.keys(i).findIndex(
          (i) => i === "testmonies"
        );
        let testmoniesValue = Object.values(i)[testmoniesIndex];
        testmoniesData.value.unshift(testmoniesValue);
      });

      mainFirsttimerNewCovertData.value.push({
        name: "First Timers",
        color: "#3f37c9",
        data: firstTimerData.value,
      });

      mainFirsttimerNewCovertData.value.push({
        name: "New Converts",
        color: "#fca311",
        data: newConvertData.value,
      });
      mainFirsttimerNewCovertData.value.push({
        name: "Testimonies",
        color: "#d00000",
        data: testmoniesData.value,
      });
      return mainFirsttimerNewCovertData.value;
    });

    return {
      formatDate,
      primarycolor,
      displayTitle,
      loading,
      startDate,
      endDate,
      selectedSummary,
      setSelectedEvent,
      selectedSummaryChart,
      selectedEventID,
      allEvents,
      analysisReport,
      getAnalysisReport,
      colunmChart,
      colunmChart1,
      series,
      series1,
      colunmChartAttendance,
      colunmChartNewCovert,
      attendanceChart,
      firstTimerChart,
      attendanceData,
      mainAttendanceData,
      mainFirstTimerData,
      mainFirsttimerNewCovertData,
      mainNewConvertData,
      FTNCChart,
      firstTimerData,
      newConvertData,
      newConvert1Data,
      testmoniesData,
      firstTimer1Data,
      newConvertsChart,
      printJS,
      showExport,
      fileName,
      bookTypeList,
      selectedFileType,
      fileHeaderToExport,
      fileToExport,
      downloadFile,
      showReport,
    };
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}
.table {
  width: 100% !important;
  box-shadow: 0 0.063rem 0.25rem #02172e45;
  border: 0.063rem solid #dde2e6;
  border-radius: 30px;
  text-align: left;
  margin-bottom: auto !important;
  padding-bottom: 0.9rem;
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
  border-radius: 30px !important;
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
  overflow-y: scroll;
}

.p-multiselect {
  width: 18rem;
}

.multiselect-custom {
  padding-top: 0.1rem;
  padding-bottom: 0.1rem;
}

.country-item-value {
  padding: 0.25rem 0.5rem;
  border-radius: 3px;
  display: inline-flex;
  margin-right: 0.5rem;
  /* background-color:  */
  /* background-color: var(--primary-color); */
  /* color: var(--primary-color-text); */
}
.border {
  border-color: #b0b2b5 !important;
  border-radius: 15px !important;
}
.round-border {
  /* border-radius: 0.5rem; */
  box-shadow: 0 0.063rem 0.25rem #02172e45;
  border: 0.063rem solid #dde2e6;
}
.borderInner {
  width: 100%;
  /* height: 700px; */
}
img.flag {
  width: 17px;
}
.primary-bg {
  background-color: rgb(19, 106, 205) !important;
  border-style: none !important;
}
.p-button.p-button-icon-only {
  background-color: red !important;
}

@media screen and (max-width: 640px) {
  .p-multiselect {
    width: 100%;
  }
}
</style>