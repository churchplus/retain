<template>
  <div class="container-fluid mt-5 mb-4 p-0">
    <div class="row d-flex justify-content-between px-3 mb-3">
      <div class="head-text">Member Report</div>
      <div class="my-sm-0 my-2 c-pointer">
        <el-dropdown trigger="click" class="w-100">
          <div
            class="d-flex justify-content-between default-btn text-dark w-100"
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
    <div class="container-fluid mt-2">
      <div class="row py-5" style="background: #ebeff4">
        <!-- <div class="col-6 mb-3">
                <div class="font-weight-bold">Select branch</div>
                <BranchSelect class="w-100" @selectedbranch="setSelectedBranch"  />
              </div> -->
        <div
          class="col-md-12 d-flex justify-content-center "
          v-if="loading"
        >
          <el-icon :size="35" class="is-loading">
            <Loading />
          </el-icon>
        </div>
        <div
          class="col-12 col-md-6 col-lg-3 mt-2 mt-sm-0 mt-md-0 mt-lg-0"
          :class="{
            'show-dropdown': showDropDown,
            'hide-dropdown': !showDropDown,
          }"
        >
          <div>
            <label for="" class="font-weight-bold">Select Members</label>
          </div>
          <div>
            <div class="">
              <SelectAllDropdown
                :items="memberShips"
                @selected-item="setSelectedMember"
              />
            </div>
          </div>
        </div>
        <div
          class="col-12 col-md-6 col-lg-3 mt-2 mt-sm-0 mt-md-0 mt-lg-0"
          :class="{
            'show-dropdown': showDropDown,
            'hide-dropdown': !showDropDown,
          }"
        >
          <div class="">
            <label for="" class="ml-2 font-weight-bold">Gender</label>
          </div>
          <div>
            <SelectAllDropdown
              :items="memberGender"
              @selected-item="setSelectedGender"
            />
          </div>
        </div>
        <div
          class="col-12 col-md-6 col-lg-3 mt-2 mt-sm-0 mt-md-0 mt-lg-0"
          :class="{
            'show-dropdown': showDropDown,
            'hide-dropdown': !showDropDown,
          }"
        >
          <div>
            <label for="" class="font-weight-bold">Marital Status</label>
          </div>
          <div>
            <SelectAllDropdown
              :items="memberMaritalStatus"
              @selected-item="setSelectedMaritalStatus"
            />
          </div>
        </div>
        <div
          class="col-12 col-md-6 col-lg-3"
          :class="{
            'show-dropdown': showDropDown,
            'hide-dropdown': !showDropDown,
          }"
        >
          <label for=""></label>
          <div class="mt-2" @click="genarateReport">
            <el-button
              round
              :color="primarycolor"
              :loading="loading"
              size="large"
              class="text-white c-pointer"
              >Generate Report
            </el-button>
          </div>
        </div>
      </div>
    </div>
    <div id="element-to-print">
      <div
        class="container-fluid d-flex justify-content-center my-2"
        v-if="displayTitle"
      >
        <div class="head-text">{{fileName}}</div>
      </div>
      <div class="container-fluid">
        <div
          class="row"
          :class="{ 'show-report': showReport, 'hide-report': !showReport }"
        >
          <div class="col-12 mt-4 round-border d-flex flex-wrap">
            <div class="col-12 col-sm-12 col-md-6 col-lg-6">
              <div class="col-12 mt-sm-3 mt-md-0 mt-lg-2 text-center">
                <div class="col-12 font-weight-bold">Membership By Gender</div>
                <div class="col-12">
                  <MembershipPieChart
                    domId="chart1"
                    distance="5"
                    :titleMargin="10"
                    :summary="mappedGender"
                  />
                </div>
              </div>
            </div>
            <div class="col-12 col-sm-12 col-md-6 col-lg-6">
              <div class="col-12 mt-3 mt-sm-3 mt-md-0 mt-lg-2 text-center">
                <div class="col-12 font-weight-bold">
                  Membership By Marital Status
                </div>
                <div class="col-12">
                  <MembershipPieChart
                    domId="chart2"
                    distance="5"
                    :titleMargin="10"
                    :summary="mappedMaritalStatus"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section>
        <div
          class="mt-4 container-fluid table-main px-0 remove-styles2 remove-border responsiveness"
          :class="{ 'show-report': showReport, 'hide-report': !showReport }"
        >
          <table
            class="table remove-styles mt-0 table-hover table-header-area"
            id="table"
          >
            <thead class="table-header-area-main">
              <tr class="text-capitalize text-nowrap" style="border-bottom: 0">
                <th scope="col">Membership</th>
                <th scope="col">Name</th>
                <th scope="col">Phone</th>
                <th scope="col">Email</th>
                <th scope="col">Home Address</th>
                <th scope="col">Gender</th>
              </tr>
            </thead>
            <tbody class="small-text font-weight-bold text-nowrap">
              <tr v-for="(member, index) in membersInChurch" :key="index">
                <td>{{ member.membership }}</td>
                <td>{{ member.name }}</td>
                <td>{{ member.mobilePhone }}</td>
                <td>{{ member.email }}</td>
                <td>{{ member.homeAddress }}</td>
                <td>{{ member.gender }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { computed, ref, inject } from "vue";
import axios from "@/gateway/backendapi";
import BranchSelect from "../component/BranchSelect.vue";
import MembershipPieChart from "../../../components/charts/ReportPieChart.vue";
import SelectAllDropdown from "../../Reports/ReportsDropdown.vue";
import printJS from "print-js";
import exportService from "../../../services/exportFile/exportservice";

export default {
  components: {
    BranchSelect,
    MembershipPieChart,
    SelectAllDropdown,
  },
  setup() {
    const selectedMember = ref([]);
    const primarycolor = inject("primarycolor");
    const selectedGender = ref([]);
    const selectedMaritalStatus = ref([]);
    const showReport = ref(false);
    const showDropDown = ref(false);
    const displayTitle = ref(false);
    const memberShips = ref([]);
    const memberMaritalStatus = ref([]);
    const memberGender = ref([]);
    const membersInChurch = ref([]);
    const genderChartResult = ref([]);
    const memberChartResult = ref([]);
    const maritalStatusChartResult = ref([]);
    const ageGroupChartResult = ref([]);
    const showExport = ref(false);
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
    const branchMemberID = ref([]);
    const branchID = ref(localStorage.getItem("branchId"));
    const loading = ref(false);

    const setSelectedMember = (payload) => {
      selectedMember.value = payload;
    };
    const setSelectedGender = (payload) => {
      selectedGender.value = payload;
    };
    const setSelectedMaritalStatus = (payload) => {
      selectedMaritalStatus.value = payload;
    };

    const genderChart = (array, key) => {
      // Accepts the array and key
      // Return the end result
      genderChartResult.value = [];
      let result = array.reduce((result, currentValue) => {
        // If an array already present for key, push it to the array. Else create an array and push the object
        (result[currentValue[key]] = result[currentValue[key]] || []).push(
          currentValue
        );
        return result;
      }, []); // empty object is the initial value for result object

      for (const prop in result) {
        genderChartResult.value.push({
          name: prop,
          value: result[prop].length,
        });
      }
    };

    const mappedGender = computed(() => {
      if (genderChartResult.value.length === 0) return [];
      return genderChartResult.value.map((i) => i);
    });
    const memberChart = (array, key) => {
      // Accepts the array and key
      // Return the end result
      memberChartResult.value = [];
      let result = array.reduce((result, currentValue) => {
        // If an array already present for key, push it to the array. Else create an array and push the object
        (result[currentValue[key]] = result[currentValue[key]] || []).push(
          currentValue
        );
        return result;
      }, []); // empty object is the initial value for result object
      // genderChartResult.value

      for (const prop in result) {
        memberChartResult.value.push({
          name: prop,
          value: result[prop].length,
        });
      }
    };

    const mappedMember = computed(() => {
      if (memberChartResult.value.length === 0) return [];
      return memberChartResult.value.map((i) => i);
    });
    const maritalStatusChart = (array, key) => {
      // Accepts the array and key
      // Return the end result
      maritalStatusChartResult.value = [];
      let result = array.reduce((result, currentValue) => {
        // If an array already present for key, push it to the array. Else create an array and push the object
        (result[currentValue[key]] = result[currentValue[key]] || []).push(
          currentValue
        );
        return result;
      }, []); // empty object is the initial value for result object
      // genderChartResult.value
      for (const prop in result) {
        maritalStatusChartResult.value.push({
          name: prop,
          value: result[prop].length,
        });
      }
    };

    const mappedMaritalStatus = computed(() => {
      if (maritalStatusChartResult.value.length === 0) return [];
      return maritalStatusChartResult.value.map((i) => i);
    });
    const ageGroupChart = (array, key) => {
      // Accepts the array and key
      // Return the end result
      let result = array.reduce((result, currentValue) => {
        // If an array already present for key, push it to the array. Else create an array and push the object
        (result[currentValue[key]] = result[currentValue[key]] || []).push(
          currentValue
        );
        return result;
      }, []); // empty object is the initial value for result object

      for (const prop in result) {
        ageGroupChartResult.value.push({
          name: prop,
          value: result[prop].length,
        });
      }
    };

    const mappedAgeGroup = computed(() => {
      if (ageGroupChartResult.value.length === 0) return [];
      return ageGroupChartResult.value.map((i) => i);
    });

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

    const genarateReport = () => {
      loading.value = true;
      const memberID = selectedMember.value.map((i) => i.id);
      const genderID = selectedGender.value.map((i) => i.id);
      const maritalStatusID = selectedMaritalStatus.value.map((i) => i.id);
      let body = {
        gender: genderID,
        maritalStatus: maritalStatusID,
        membershipStatus: maritalStatusID,
        membershipType: memberID,
      };
      axios
        .post(
          `/api/BranchReports/persons/getAllContactsByParameterReport?tenantID=${branchID.value}`,
          body
        )
        .then((res) => {
          membersInChurch.value = res.data;

          genderChart(res.data, "gender");
          memberChart(res.data, "membership");
          maritalStatusChart(res.data, "maritalStatus");
          ageGroupChart(res.data, "ageGroup");
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
        })
        .catch((error) => {
          console.log(error);
          loading.value = false;
        });

      showReport.value = true;
    };

    const getMaritalStatus = async () => {
      try {
        axios
          .get("/api/BranchReports/persons/getMaritalStatus")
          .then((res) => {
            memberMaritalStatus.value = res.data;
          })
          .catch((err) => console.log(err));
      } catch (err) {
        console.log(err);
      }
    };
    getMaritalStatus();

    const getGender = async () => {
      try {
        axios
          .get("/api/BranchReports/persons/getGender")
          .then((res) => {
            memberGender.value = res.data;
          })
          .catch((err) => console.log(err));
      } catch (err) {
        console.log(err);
      }
    };
    getGender();

    const setSelectedBranch = async (payload) => {
      loading.value = true;
      branchMemberID.value = payload.id;
      try {
        let { data } = await axios.get(
          `/api/BranchReports/persons/getMemberClassification?tenantID=${payload.id}`
        );
        loading.value = false;

        memberShips.value = data;
        showDropDown.value = true;
      } catch (err) {
        loading.value = false;
        console.log(err);
      }
    };

    const getMembershipData = async () => {
      loading.value = true;
      try {
        let { data } = await axios.get(
          `/api/BranchReports/persons/getMemberClassification?tenantID=${branchID.value}`
        );
        loading.value = false;

        memberShips.value = data;
        showDropDown.value = true;
      } catch (err) {
        loading.value = false;
        console.log(err);
      }
    };
    getMembershipData();

    return {
      loading,
      setSelectedBranch,
      setSelectedGender,
      setSelectedMaritalStatus,
      setSelectedMember,
      branchID,
      branchMemberID,
      genarateReport,
      genderChartResult,
      memberChartResult,
      maritalStatusChartResult,
      ageGroupChartResult,
      genderChart,
      memberChart,
      displayTitle,
      maritalStatusChart,
      ageGroupChart,
      showReport,
      showDropDown,
      //  genderSummary,
      memberShips,
      memberMaritalStatus,
      memberGender,
      membersInChurch,
      mappedGender,
      mappedMember,
      mappedMaritalStatus,
      primarycolor,
      mappedAgeGroup,
      selectedMember,
      selectedGender,
      selectedMaritalStatus,
      showExport,
      fileName,
      bookTypeList,
      selectedFileType,
      fileToExport,
      fileHeaderToExport,
      printJS,
      // downLoadExcel,
      downloadFile,
    };
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}
.show-report {
  display: block;
}
.hide-report {
  display: none;
}
.show-dropdown {
  display: block;
}
.hide-dropdown {
  display: none;
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
.round-border {
  border-radius: 0.5rem;
  box-shadow: 0 0.063rem 0.25rem #02172e45;
  border: 0.063rem solid #dde2e6;
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

.remove-border {
  box-shadow: none !important;
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
}
img.flag {
  width: 17px;
}

@media screen and (max-width: 640px) {
  .p-multiselect {
    width: 100%;
  }
}
</style>