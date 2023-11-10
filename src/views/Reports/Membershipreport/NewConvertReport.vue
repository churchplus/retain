<template>
  <div class="container-fluid">
    <!-- header area -->
    <!-- <div class="container"> -->
    <div class="row flex-row justify-content-between align-items-center">
      <div class="centered-items">
        <div class="head-text">New Convert Report</div>
        <p class="">
          This reports provides a detailed report of new converts in your
          ministry.
        </p>
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

    <!-- date area -->
    <!-- <div class="container-fluid  my-3"> -->
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
            class="mt-4"
            :color="primarycolor"
            :loading="loading"
            round
            @click="allMembersInChurch"
          >
            Generate Report
          </el-button>
        </div>
      </div>
    </div>
    <!-- </div> -->
    <!--end of date area -->

    <section>
      <!-- chart area -->
      <div class="chart">
        <div style="width: 45%" class="ml-md-4 chart1">
          <ByGenderChart
            domId="chart"
            title="By Gender"
            distance="5"
            :titleMargin="10"
          />
        </div>
      </div>
      <!--end of chart area -->
    </section>

    <section>
      <!-- table header -->
      <div v-if="newConvertsInChurch.length > 0" class="mt-5 row">
        <div
          class="container-fluid table-main px-0 remove-styles2 remove-border responsiveness"
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
                <!-- <th scope="col">Title</th> -->
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
            <tbody
              class="font-weight-bold text-nowrap"
              style="font-size: small"
            >
              <tr
                v-for="(newConvert, index) in newConvertsInChurch"
                :key="index"
              >
                <!-- <td>{{ newConvert.title }}</td> -->
                <td>{{ newConvert.firstName }}</td>
                <td>{{ newConvert.lastName }}</td>
                <td>{{ newConvert.mobilePhone }}</td>
                <td>{{ newConvert.email }}</td>
                <td>{{ newConvert.homeAddress }}</td>
                <td>{{ newConvert.gender }}</td>
                <td>{{ newConvert.contactStatus }}</td>
                <td
                  v-show="newConvert.customAttributeData.length > 0"
                  v-for="(item, index) in dynamicCustomFields"
                  :key="index"
                >
                  {{
                    getMemberCustomAttributeData(
                      newConvert.customAttributeData,
                      item
                    )
                  }}
                </td>
                <td
                  v-show="newConvert.customAttributeData.length === 0"
                  v-for="(item, index) in dynamicCustomFields.length"
                  :key="index"
                >
                  {{ "--" }}
                </td>
              </tr>
            </tbody>
          </table>
          <div class="table-foot d-flex justify-content-end mt-3">
          </div>
        </div>
      </div>
      <!--end table header -->
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
    const newConvertsInChurch = ref([]);
    const showExport = ref(false);
    const loading = ref(false);
    const fileName = ref("New Convert(M) Report");
    const primarycolor = inject("primarycolor");
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
    const allMembersInChurch = () => {
      loading.value = true;
      axios
        .get(
          `/api/Reports/people/getNewConvertsReport?startDate=${new Date(
            startDate.value
          ).toLocaleDateString("en-US")}&endDate=${new Date(
            endDate.value
          ).toLocaleDateString("en-US")}`
        )
        .then((res) => {
          newConvertsInChurch.value = res.data;
          /* function to call service and populate table */
          setTimeout(() => {
            fileHeaderToExport.value = exportService.tableHeaderToJson(
              document.getElementsByTagName("th")
            );
            fileToExport.value = exportService.tableToJson(
              document.getElementById("table")
            );
          }, 1000);
          loading.value = false;
          /* End function to call service and populate table */
        })
        .catch((err) => {
          console.log(err);
          loading.value = false;
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

    const formatDate = (activityDate) => {
      return dateFormatter.monthDayYear(activityDate);
    };

    const getCustomFields = async () => {
      try {
        let data = await allCustomFields.allCustomFields();
        dynamicCustomFields.value = data.filter((i) => i.entityType === 2);
      } catch (err) {
        console.log(err);
      }
    };
    getCustomFields();

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
      loading,
      startDate,
      endDate,
      newConvertsInChurch,
      allMembersInChurch,
      formatDate,
      printJS,
      showExport,
      fileName,
      bookTypeList,
      selectedFileType,
      downloadFile,
      dynamicCustomFields,
      getMemberCustomAttributeData,
      primarycolor,
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
  overflow: scroll;
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
  /* overflow-x: scroll; */
  /* overflow-y: scroll; */
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