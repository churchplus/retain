<template>
  <div class="container-fluid" id="element-to-print">
    <!-- header area -->
    <!-- <div class="container"> -->
    <div class="row d-flex flex-row justify-content-between align-items-center">
      <div class="centered-items">
        <h3 class="head-text">Birthday Report</h3>
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
            @click="getBirthdayReport"
          >
            Generate Report
          </el-button>
        </div>
      </div>
    </div>
    <!-- </div> -->
    <!--end of header area -->

    <!-- date area -->
    <div id="element-to-print">
      <section>
        <!-- <div class="chart">
          <div style="width: 45%" class="ml-md-4 chart1">
            <ByGenderChart
              domId="chart"
              title="By Gender"
              distance="5"
              :titleMargin="10"
            />
          </div>
        </div> -->

        <div class="container-fluid px-0">
          <div
            class="row mt-4"
            :class="{ 'show-report': showReport, 'hide-report': !showReport }"
          >
            <!-- <div class="col-12">
              <div class="mb-3 text-center Display-1 heading-text">
                Birthday Report
              </div>
            </div> -->
            <!-- <div class="col-12 col-sm-12 col-md-6 col-lg-6"> -->
            <div
              class="row table"
              :class="birthdays && birthdays.length > 0 ? 'graph-area' : ''"
            >
              <div class="col-12 col-sm-12 col-md-6 col-lg-6 p-3 text-center">
                <div class="col-12 font-weight-bold">Membership By Gender</div>
                <div class="col-12" v-if="genderSummary.length === 0">
                  No Data Available
                </div>
                <div class="col-12">
                  <BirthdayChart
                    domId="chart1"
                    distance="5"
                    :titleMargin="10"
                    :summary="genderSummary"
                  />
                </div>
              </div>
              <div class="col-12 col-sm-12 col-md-6 col-lg-6 p-3 text-center">
                <div class="col-12 font-weight-bold">
                  Membership By Marital Status
                </div>
                <div class="col-12" v-if="maritalStatusSummary.length === 0">
                  No Data Available
                </div>
                <div class="col-12">
                  <BirthdayChart
                    domId="chart2"
                    distance="5"
                    :titleMargin="10"
                    :summary="maritalStatusSummary"
                  />
                </div>
              </div>
            </div>
            <!-- </div> -->
            <!-- <div class="col-12 col-sm-12  col-md-6 col-lg-6">
                      <div class="col-12 border p-3 mt-3 mt-sm-3 mt-md-0 mt-lg-0 text-center">
                          <div class="col-12  font-weight-bold">Membership By Marital Status</div>
                          <div class="col-12" :class="{ 'show-report': !showReport, 'hide-report' : showReport}">No Data Available</div>
                          <div class="col-12 " style="height: 30vh;"  :class="{ 'show-report': showReport, 'hide-report' : !showReport}">
                              <BirthdayChart
                                  domId="chart2"
                                  distance="5"
                                  :titleMargin="10"
                                  :summary="maritalStatusSummary"
                              />
                          </div>
                      </div>
                  </div> -->
          </div>
        </div>
      </section>
      <!--end of date area -->

      <section>
        <!-- table header -->
        <div v-if="birthdays.length > 0" class="row">
          <div
            class="container-fluid table-main px-0 remove-styles2 remove-border mt-5 scroll-table"
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
                  <th scope="col">Birthday</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Email</th>
                  <th scope="col">Gender</th>
                  <th scope="col">Marital Status</th>
                  <!-- <th scope="col">Age Group</th> -->
                  <!-- <th scope="col">Membership</th> -->
                  <!-- <th scope="col">Home Address</th> -->
                </tr>
              </thead>
              <tbody
                class="font-weight-bold text-nowrap"
                style="font-size: small"
              >
                <tr v-for="(item, index) in birthdays" :key="index">
                  <td>{{ item.firstName }}</td>
                  <td>{{ item.lastName }}</td>
                  <td>{{ item.birthDay }}</td>
                  <td>{{ item.mobilePhone }}</td>
                  <td>{{ item.email }}</td>
                  <td>{{ item.gender }}</td>
                  <td>{{ item.maritalStatus }}</td>
                  <!-- <td>{{ item.ageGroup }}</td> -->
                  <!-- <td>{{ item.membership }}</td> -->
                  <!-- <td>{{ item.homeAddress }}</td> -->
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
import { computed, ref, inject } from "vue";
// import ByGenderChart from "@/components/charts/PieChart.vue";
import BirthdayChart from "../../../components/charts/PieChart.vue";
import axios from "@/gateway/backendapi";
import printJS from "print-js";
import exportService from "../../../services/exportFile/exportservice";
import store from "../../../store/store";

export default {
  components: {
    BirthdayChart,
  },
  setup() {
    const startDate = ref();
    const endDate = ref("");
    const birthdays = ref("");
    const membersInChurch = ref([]);
    const genderResult = ref([]);
    const maritalStatusResult = ref([]);
    const showExport = ref(false);
    const loading = ref(false);
    const primarycolor = inject("primarycolor");
    const showReport = ref(false);
    const fileName = ref("Birthday Report");
    const bookTypeList = ref([
      { name: "xlsx" },
      { name: "csv" },
      { name: "txt" },
    ]);
    const selectedFileType = ref({});
    const fileHeaderToExport = ref([]);
    const fileToExport = ref([]);
    const allMembersInChurch = () => {
      store.dispatch("membership/setMembershipSummary").then((response) => {
        membersInChurch.value = response;
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

    // onMounted(() => {
    //   genderSummary.value =  [ { name: 'male', value: 4 }, { name: "female", value: 1 } ];
    // })
    const genderSummary = computed(() => {
      if (genderResult.value.length === 0) return [];
      return genderResult.value;
    });

    const maritalStatusSummary = computed(() => {
      if (maritalStatusResult.value.length === 0) return [];
      return maritalStatusResult.value;
    });
    const groupByGender = (array, key) => {
      let result = array.reduce((result, currentValue) => {
        // If an array already present for key, push it to the array. Else create an array and push the object
        (result[currentValue[key]] = result[currentValue[key]] || []).push(
          currentValue
        );
        // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
        return result;
      }, {}); // empty object is the initial value for result object
      genderSummary.value = [];
      for (const prop in result) {
        genderResult.value.push({
          name: prop,
          value: result[prop].length,
        });
      }
    };

    const groupByMaritalStatus = (array, key) => {
      let result = array.reduce((result, currentValue) => {
        // If an array already present for key, push it to the array. Else create an array and push the object
        (result[currentValue[key]] = result[currentValue[key]] || []).push(
          currentValue
        );
        // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
        return result;
      }, {}); // empty object is the initial value for result object
      maritalStatusSummary.value = [];
      for (const prop in result) {
        maritalStatusResult.value.push({
          name: prop,
          value: result[prop].length,
        });
      }
    };

    const getBirthdayReport = async () => {
      let start = new Date(startDate.value).toLocaleDateString("en-US");
      let end = new Date(endDate.value).toLocaleDateString("en-US");
      loading.value = true;
      try {
        let data = await axios.get(
          `/api/Reports/people/getBirthdaysReport?startdate=${start}&enddate=${end}`
        );
        birthdays.value = data.data;
        groupByGender(data.data, "gender");
        groupByMaritalStatus(data.data, "maritalStatus");
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
      } catch (err) {
        console.log(err);
        loading.value = false;
      }
    };

    // const exportReport = () => {
    //   var element = document.getElementById("element-to-print");
    //   var opt = {
    //     // margin:       1,
    //     filename: `file.pdf`,
    //     image: { type: "jpeg", quality: 0.98 },
    //     html2canvas: { scale: 2 },
    //     jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    //     pagebreak: { mode: ["avoid-all", "css", "legacy"] },
    //   };

    //   // New Promise-based usage:
    //   html2pdf().set(opt).from(element).save();
    // };

    return {
      startDate,
      endDate,
      birthdays,
      membersInChurch,
      allMembersInChurch,
      getBirthdayReport,
      loading,
      primarycolor,
      genderSummary,
      groupByGender,
      genderResult,
      groupByMaritalStatus,
      maritalStatusResult,
      maritalStatusSummary,
      // exportReport,
      printJS,
      showExport,
      fileName,
      bookTypeList,
      selectedFileType,
      downloadFile,
      showReport,
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
.show-report {
  display: block;
}
.hide-report {
  display: none;
}
.default-btn {
  font-weight: 600;
  white-space: initial;
  font-size: 1rem;
  border-radius: 3rem;
  border: 1px solid #002044;
  padding: 0.5rem 1.25rem;
  width: auto;
  /* border: none; */
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

.graph-area {
  border: 1px solid #dde2e6;
  border-radius: 0.5rem;
  padding: 1rem 0rem;
  margin: 2rem 0rem !important;
  width: 100% !important;
  box-shadow: 0 0.063rem 0.25rem #02172e45;
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

.scroll-table {
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