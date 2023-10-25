<template>
  <div class="container-fluid">
    <!-- header area -->
    <div class="row flex-row justify-content-between align-items-center">
      <div class="centered-items">
        <div class="head-text">First Timers Report</div>
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
            :loading="loading"
            round
            @click="generateReport"
          >
            Generate Report
          </el-button>
        </div>
      </div>
    </div>
  </div>
    <!--end of date area -->
    <div id="element-to-print">
      <div
          class="container-fluid d-flex justify-content-center my-2"
          v-if="displayTitle"
        >
          <div class="head-text">People Report</div>
      </div>
        <!-- chart area -->
      <div
        class="chart container-fluid"
        :class="
          firstTimerInChurch && firstTimerInChurch.length > 0
            ? 'graph-area'
            : ''
        "
      >
        <div class="row">
          <div class="chart1 col-12 col-md-6">
            <ByGenderChart
              domId="chart"
              title="By Gender"
              distance="5"
              :titleMargin="10"
              :summary="data"
            />
          </div>
          <div class="chart1 col-12 col-md-6">
            <ByGenderChart
              domId="chartid"
              title="Marital Status"
              distance="5"
              :titleMargin="10"
              :summary="maritalChartInfo"
            />
          </div>
        </div>
      </div>
        <!--end of chart area -->

      <section class="container-fluid">
        <!-- table header -->
        <div v-if="firstTimerInChurch.length > 0" class="row">
          <div
            class="container-fluid table-main remove-styles2 remove-border responsiveness"
          >
            <table
              id="table"
              class="table remove-styles mt-0 table-hover table-header-area"
            >
              <thead class="table-header-area-main">
                <tr
                  class="text-capitalize text-nowrap font-weight-bold"
                  style="border-bottom: 0; font-size: medium"
                >
    
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Email</th>
                  <th scope="col">Home Address</th>
                  <th scope="col">Gender</th>
                  <th scope="col">Current Status</th>
                  <th
                    scope="col"
                    v-for="(item, index) in dynamicCustomFields"
                    :key="index"
                  >
                    {{ item.label }}
                  </th>

                </tr>
              </thead>
              <tbody class="small-text font-weight-bold text-nowrap">
                <tr
                  v-for="(firstTimer, index) in firstTimerInChurch"
                  :key="index"
                >
                  <td>{{ firstTimer.firstName }}</td>
                  <td>{{ firstTimer.lastName }}</td>
                  <td>{{ firstTimer.mobilePhone }}</td>
                  <td>{{ firstTimer.email }}</td>
                  <td>{{ firstTimer.homeAddress }}</td>
                  <td>{{ firstTimer.gender }}</td>
                  <td>{{ firstTimer.status }}</td>
                  <td
                    v-show="firstTimer.customAttributeData.length > 0"
                    v-for="(item, index) in dynamicCustomFields"
                    :key="index"
                  >
                    {{
                      getMemberCustomAttributeData(
                        firstTimer.customAttributeData,
                        item
                      )
                    }}
                  </td>
                  <td
                    v-show="firstTimer.customAttributeData.length === 0"
                    v-for="(item, index) in dynamicCustomFields.length"
                    :key="index"
                  >
                    {{ "--" }}
                  </td>
               
                </tr>
              </tbody>
            </table>
            <div class="table-foot d-flex justify-content-end mt-3">
              <!-- mt-n3" -->
              <!-- <PaginationButtons /> -->
            </div>
          </div>
        </div>
        <!--end table header  -->
      </section>
    </div>

</template>

<script>
import { ref, inject } from "vue";
import ByGenderChart from "@/components/charts/PieChart.vue";
import axios from "@/gateway/backendapi";
import dateFormatter from "../../../services/dates/dateformatter";
import printJS from "print-js";
import exportService from "../../../services/exportFile/exportservice";
import allCustomFields from "../../../services/customfield/customField";

export default {
  components: {
    ByGenderChart,
  },
  setup() {
    const startDate = ref("");
    const endDate = ref("");
    const firstTimerInChurch = ref([]);
    const genderChartResult = ref([]);
    const data = ref([]);
    const primarycolor = inject("primarycolor");
    const maritalChartInfo = ref([]);
    const showExport = ref(false);
    const loading = ref(false);
    const displayTitle = ref(false);
    const fileName = ref("First Timers(M) Report");
    const bookTypeList = ref([
      { name: "xlsx" },
      { name: "csv" },
      { name: "txt" },
      { name: "" },
    ]);
    const selectedFileType = ref({});
    const fileHeaderToExport = ref([]);
    const fileToExport = ref([]);
    const dynamicCustomFields = ref([]);
    const generateReport = () => {
      loading.value = true;
      axios
        .get(
          `/api/Reports/people/getFirstTimersReport?startDate=${new Date(
            startDate.value
          ).toLocaleDateString("en-US")}&endDate=${new Date(
            endDate.value
          ).toLocaleDateString("en-US")}`
        )
        .then((res) => {
          firstTimerInChurch.value = res.data;
          data.value = getGenderChart(res.data);
          maritalChartInfo.value = maritalChart(res.data);
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
        });
    };

    const getGenderChart = (arr) => {
      return [
        getSumOfItems(arr, "gender", "Male"),
        getSumOfItems(arr, "gender", "Female"),
     
      ];
    };

    const maritalChart = (arr) => {
      return [
        getSumOfItems(arr, "maritalStatus", "Married"),
        getSumOfItems(arr, "maritalStatus", "Single"),
     
      ];
    };

    const getSumOfItems = (arr, key, value) => {
      return {
        name: value,
        value: firstTimerInChurch.value.filter((i) => i[key] === value).length,
      };
    };

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

    const formatDate = (activityDate) => {
      return dateFormatter.monthDayTime(activityDate);
    };

    const getAllCustomFields = async () => {
      try {
        let data = await allCustomFields.allCustomFields();
        dynamicCustomFields.value = data.filter((i) => i.entityType === 1);
      } catch (err) {
        console.log(err);
      }
    };
    getAllCustomFields();

    const getMemberCustomAttributeData = (
      memberCustomData,
      singleCustomField
    ) => {
      if (memberCustomData && memberCustomData.length === 0) return "--";
      const findData = memberCustomData.findIndex(
        (i) => i.customAttribute.id === singleCustomField.id
      );
      if (findData >= 0) return memberCustomData[findData].data;
      return "--";
    };

    return {
      startDate,
      primarycolor,
      endDate,
      firstTimerInChurch,
      generateReport,
      formatDate,
      loading,
      genderChartResult,
      data,
      maritalChartInfo,
      displayTitle,
      fileName,
      downloadFile,
      showExport,
      bookTypeList,
      printJS,
      selectedFileType,
      dynamicCustomFields,
      getMemberCustomAttributeData,
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
  color: #000;
  text-decoration: none;
  min-width: 121px;
}

.default-btn:hover {
  text-decoration: none;
}

.generate-report {
  font-size: 1rem;
  color: #fff;
  background-color: #136acd !important ;
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

/* .move-enter-active {
  animation: move-in .8s;
}
.move-leave-active {
  animation: move-in .8s reverse;
}
@keyframes move-in {
  0% {
    transform: translateY(-100px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }

} */
</style>