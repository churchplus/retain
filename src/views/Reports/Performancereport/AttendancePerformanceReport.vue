<template>
  <div class="container-fluid">
    <div class="row flex-row justify-content-between align-items-center">
      <div class="mb-3">
        <div class="head-text">Church Activities Attendance Report</div>
        <div class="pl-1">
          This reports gives an indepth view of the growth and attendance
          pattern of the ministry
        </div>
      </div>
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
    <div style="background: #ebeff4" class="row py-5 mb-2">
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
        <div><label for="" class="font-weight-bold">End Date</label></div>
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
            @click="getActivityReport()"
            class=""
            round
            :color="primarycolor"
            :loading="loading"
          >
            <div class="text-white">Generate Report</div>
          </el-button>
        </div>
      </div>
    </div>
  </div>
  <div id="element-to-print" class="">
    <div
      class="container-fluid d-flex justify-content-center my-2"
      v-if="displayTitle"
    >
      <div class="head-text">Church Activities Attendance Report</div>
    </div>
    <div class="container-fluid">
      <div class="row">
        <div class="w-100 mb-2">
          <h5 class="ml-3 mt-4"></h5>
          <div
            class="round-border"
            v-show="activityReport.length > 0"
            :class="{ 'show-report': showReport, 'hide-report': !showReport }"
          >
            <PerformanceColumnChart
              domId="chart"
              title="Attendance Analysis Chart"
              distance="5"
              :titleMargin="10"
              :data="attendanceChart"
              :series="series"
              :seriesText="`Attendance analysis`"
            />
          </div>
        </div>
        <div
          class="area-chart w-100 mt-5 lineGrap"
          v-show="activityReport.length > 0"
          :class="{ 'show-report': showReport, 'hide-report': !showReport }"
        >
          <ReportAreaChart
            elemId="chart"
            domId="areaChart1"
            title="Attendance Analysis Line Graph"
            subtitle=""
            lineColor="#50AB00"
            :xAxis="series"
            :series="attendanceData"
          />
        </div>

        <div class="w-100 mt-5">
          <h5 class="ml-3 mt-4"></h5>
          <div
            class="round-border"
            v-show="activityReport.length > 0"
            :class="{ 'show-report': showReport, 'hide-report': !showReport }"
          >
            <PerformanceColumnChart
              domId="chart1"
              title="Attendance Analysis Chart By Category"
              distance="5"
              :titleMargin="10"
              :data="summaryChart"
              :series="attendanceSeries"
              :seriesText="`Attendance analysis`"
            />
          </div>
        </div>
        <section class="w-100">
          <!-- table header -->

          <div
            class="container-fluid table-main px-0 remove-styles2 remove-border responsiveness mb-5 mt-5"
            id="table"
            v-show="activityReport.length > 0"
            :class="{ 'show-report': showReport, 'hide-report': !showReport }"
          >
            <table
              class="table remove-styles mt-0 table-hover table-header-area"
            >
              <thead class="table-header-area-main">
                <tr
                  class="text-capitalize text-nowrap font-weight-bolder"
                  style="border-bottom: 0"
                >
                  <th scope="col">Event Name & Date</th>
                  <th scope="col">Category</th>
                  <th scope="col">Category Attendance</th>
                </tr>
              </thead>
              <tbody class="font-weight-bolder text-nowrap">
                <tr
                  v-for="(item, index) in groupedActivityService"
                  :key="index"
                >
                  <td>{{ item.name }}</td>
                  <td>{{ item.category }}</td>
                  <td>{{ item.amount }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <!--end table header -->
        </section>
      </div>
    </div>
  </div>
</template>


<script>
import { computed, ref, inject } from "vue";
import PerformanceColumnChart from "../../../components/charts/ReportColumnChart.vue";
import groupData from "../../../services/groupArray/groupResponse";
import ReportAreaChart from "../../../components/charts/AreaChart.vue";
import axios from "@/gateway/backendapi";
import dateFormatter from "../../../services/dates/dateformatter.js";
import exportService from "../../../services/exportFile/exportservice";
import printJS from "print-js";
import { ElMessage } from "element-plus";
export default {
  components: {
    PerformanceColumnChart,
    ReportAreaChart,
  },
  setup() {
    const showReport = ref(false);
    const loading = ref(false);
    const fileName = ref("Church Activities Attendance Report");
    const primarycolor = inject("primarycolor");
    const selectedFileType = ref({});
    const fileHeaderToExport = ref([]);
    const fileToExport = ref([]);
    const bookTypeList = ref([
      { name: "xlsx" },
      { name: "csv" },
      { name: "txt" },
      { name: "pdf" },
    ]);
    const showExport = ref(false);
    const displayTitle = ref(false);
    const allEvents = ref([]);
    const selectedEvents = ref([]);
    const series = ref([]);
    const activityReport = ref([]);
    const attendanceSeries = ref([]);
    const startDate = ref("");
    const endDate = ref("");
    const attendanceData = ref([]);
    const babiesData = ref([]);
    const womenData = ref([]);
    const maleData = ref([]);
    const boyData = ref([]);
    const girlData = ref([]);
    const ChildrenData = ref([]);
    const TeenagersData = ref([]);
    const SinglesData = ref([]);
    const mainAttendanceData = ref([]);
    const categoryData = ref([]);
    const attendanceGroup = ref({});
    const grousService = ref([]);
    const selectedEventID = ref(null);
    const groupedActivityService = ref([]);
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

    const setSelectedEvent = () => {
      selectedEvents.value = allEvents.value.find(
        (i) => i.id === selectedEventID.value
      );
      console.log(selectedEvents.value, "Events");
    };

    const getAllEvents = () => {
      axios
        .get("/api/Reports/events/getEvents")
        .then((res) => {
          allEvents.value = res.data;
        })
        .catch((err) => console.log(err));
    };
    getAllEvents();
    const getActivityReport = () => {
      activityReport.value = [];
      const eventId = selectedEvents.value ? selectedEvents.value.id : "";
      loading.value = true;
      axios
        .get(
          `/api/Reports/events/getActivityAttendanceReport?startDate=${new Date(
            startDate.value
          ).toLocaleDateString("en-US")}&endDate=${new Date(
            endDate.value
          ).toLocaleDateString("en-US")}&activityId=${eventId}`
        )
        .then((res) => {
          activityReport.value = res.data;
          mainAttendanceData.value = [];
          attendanceData.value = [];
          series.value = [];
          groupCategory();
          groupName();
          categoryData.value = [];
          getActivityServices();
          setTimeout(() => {
            fileHeaderToExport.value = exportService.tableHeaderToJson(
              document.getElementsByTagName("th")
            );
            fileToExport.value = exportService.tableToJson(
              document.getElementById("table")
            );
          }, 1000);
          showReport.value = true;
          loading.value = false;

          if (activityReport.value.length === 0) {
            ElMessage({
              type: "warning",
              showClose: true,
              message: "No data for this date range",
              duration: 5000,
            });
          }
        })
        .catch((err) => {
          console.log(err);
          loading.value = false;
        });
    };

    const groupCategory = () => {
      attendanceGroup.value = groupData.groupData(
        activityReport.value,
        "attendanceCategory"
      );
      const dateSeries = groupData.groupData(activityReport.value, "date");
      for (const prop in dateSeries) {
        attendanceSeries.value.unshift(dateFormatter.monthDayYear(prop));
      }
    };
    const groupName = () => {
      const result = groupData.groupData(activityReport.value, "name");
      for (const prop in result) {
        grousService.value.push({
          name: prop,
          value: result[prop],
        });
      }

      grousService.value.forEach((i) => {
        i.value.forEach((j) => {
          groupedActivityService.value.push({
            name: i.name.split(",").join(""),
            category: j.attendanceCategory,
            amount: j.attendance,
          });
        });
      });
    };

    const attendanceChart = computed(() => {
      if (activityReport.value.length === 0) return [];
      activityReport.value.forEach((i) => {
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
    const getActivityServices = () => {
      activityReport.value.forEach((i) => {
        let serviceIndex = Object.keys(i).findIndex((i) => i === "date");
        let serviceValue = Object.values(i)[serviceIndex];
        series.value.unshift(dateFormatter.monthDayYear(serviceValue));
      });
    };

    const summaryChart = computed(() => {
      if (Object.keys(attendanceGroup.value).length === 0) return new Object();
      Object.entries(attendanceGroup.value).forEach(([key, value]) => {
        let newArr = [];
        value.forEach((i) => {
          let valIndex = Object.keys(i).findIndex((i) => i === "attendance");
          let attValue = Object.values(i)[valIndex];
          newArr.unshift(attValue);
        });
        categoryData.value.push({
          name: key,
          color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
          data: newArr,
        });
      });
      //     attendanceGroup.value.Babies ? attendanceGroup.value.Babies.forEach(i => {
      //     let babiesIndex = Object.keys(i).findIndex(i => i === 'attendance')
      //     let babiesValue = Object.values(i)[babiesIndex]
      //     babiesData.value.unshift(babiesValue)
      //     console.log(babiesData.value)
      // }) : []

      //  categoryData.value.push({
      //         name: 'Babies',
      //         color: '#3f37c9',
      //         data: babiesData.value
      //     })

      //    attendanceGroup.value.FeMale ? attendanceGroup.value.FeMale.forEach(i => {
      //     let womenIndex = Object.keys(i).findIndex(i => i === 'attendance')
      //     let womenValue = Object.values(i)[womenIndex]
      //     womenData.value.unshift(womenValue)

      // }) : []

      //  categoryData.value.push({
      //         name: 'Women',
      //         color: '#43eb10',
      //         data: womenData.value
      //     })
      //     attendanceGroup.value.Male ? attendanceGroup.value.Male.forEach(i => {
      //     let maleIndex = Object.keys(i).findIndex(i => i === 'attendance')
      //     let maleValue = Object.values(i)[maleIndex]
      //     maleData.value.unshift(maleValue)
      //     console.log(maleData)
      // }) : []

      //  categoryData.value.push({
      //         name: 'male',
      //         color: '#a207f0',
      //         data: maleData.value
      //     })

      //     attendanceGroup.value.Boy ? attendanceGroup.value.Boy.forEach(i => {
      //     let boyIndex = Object.keys(i).findIndex(i => i === 'attendance')
      //     let boyValue = Object.values(i)[boyIndex]
      //     boyData.value.unshift(boyValue)
      // }) : []

      //  categoryData.value.push({
      //         name: 'Boy',
      //         color: '#e7f20c',
      //         data: boyData.value
      //     })
      //     attendanceGroup.value.Girl ? attendanceGroup.value.Girl.forEach(i => {
      //     let girlIndex = Object.keys(i).findIndex(i => i === 'attendance')
      //     let girlValue = Object.values(i)[girlIndex]
      //     girlData.value.unshift(girlValue)

      // }) : []

      //  categoryData.value.push({
      //         name: 'Girl',
      //         color: '#818182',
      //         data: girlData.value
      //     })

      //      attendanceGroup.value.Children ?  attendanceGroup.value.Children.forEach(i => {
      //     let ChildrenIndex = Object.keys(i).findIndex(i => i === 'attendance')
      //     let ChildrenValue = Object.values(i)[ChildrenIndex]
      //     ChildrenData.value.unshift(ChildrenValue)
      //     console.log(ChildrenData)
      // }) : []
      //  categoryData.value.push({
      //         name: 'Children',
      //         color: '#ed6109',
      //         data: ChildrenData.value
      //     })
      //      attendanceGroup.value.Teenagers ? attendanceGroup.value.Teenagers.forEach(i => {
      //     let TeenagersIndex = Object.keys(i).findIndex(i => i === 'attendance')
      //     let TeenagersValue = Object.values(i)[TeenagersIndex]
      //    TeenagersData.value.unshift(TeenagersValue)
      // }) : []

      //  categoryData.value.push({
      //         name: 'Teenagers',
      //         color: '#b01105',
      //         data: TeenagersData.value
      //     })

      //     attendanceGroup.value.singles ? attendanceGroup.value.singles.forEach(i => {
      //     let SinglesIndex = Object.keys(i).findIndex(i => i === 'attendance')
      //     let SinglesValue = Object.values(i)[SinglesIndex]
      //    SinglesData.value.unshift(SinglesValue)
      // }) : []
      //  categoryData.value.push({
      //         name: 'Singles',
      //         color: '#f7d68f',
      //         data: SinglesData.value
      //     })

      return categoryData.value;
    });

    const formatDate = (date) => {
      return dateFormatter.monthDayYear(date);
    };

    return {
      formatDate,
      loading,
      primarycolor,
      startDate,
      endDate,
      selectedEvents,
      displayTitle,
      allEvents,
      activityReport,
      getActivityReport,
      series,
      attendanceSeries,
      attendanceChart,
      womenData,
      maleData,
      setSelectedEvent,
      selectedEventID,
      boyData,
      girlData,
      ChildrenData,
      TeenagersData,
      SinglesData,
      attendanceData,
      mainAttendanceData,
      categoryData,
      babiesData,
      summaryChart,
      attendanceGroup,
      grousService,
      showExport,
      printJS,
      downloadFile,
      bookTypeList,
      selectedFileType,
      fileHeaderToExport,
      fileToExport,
      fileName,
      showReport,
      groupedActivityService,
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
.round-border {
  border-radius: 0.5rem;
  box-shadow: 0 0.063rem 0.25rem #02172e45;
  border: 0.063rem solid #dde2e6;
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
.lineGrap {
  border-radius: 0.5rem;
  box-shadow: 0 0.063rem 0.25rem #02172e45;
  border: 0.063rem solid #dde2e6;
  font-weight: bold;
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