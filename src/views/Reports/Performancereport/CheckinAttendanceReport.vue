<template>
  <div class="container-fluid" @click="closeDropdownIfOpen">
    <div class="row flex-row justify-content-between align-items-center">
      <div class="head-text">Attendance Report</div>
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
                  @click="downLoadExcel(bookType)"
                >
                  {{ bookType.name }}
                </a>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <div
      class="row mt-4 py-4 px-3"
      style="background: #ebeff4; border-radius: 0.5rem"
    >
      <div class="col-sm-9">
        <div class="row">
          <div class="col-sm-6">
            <div class="font-weight-600">Select Event</div>
            <div class="mt-2">
              <el-select-v2
                v-model="selectedEventID"
                class="w-100 font-weight-normal"
                :options="
                  events.map((i) => ({
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
          <div class="col-sm-6 mt-3 mt-sm-0">
            <div class="font-weight-600">Select Group</div>
            <div class="mt-2">
              <button
                class="form-control d-flex justify-content-between align-items-center exempt-hide"
                @click="setGroupProp"
              >
                <span class="exempt-hide">
                  <span
                    v-if="checkedGroup.length > 0 && checkedGroup.length <= 2"
                  >
                    <span v-for="item in checkedGroup" :key="item.id"
                      ><span class="eachGroup">{{ item.name }}</span></span
                    >
                  </span>
                  <span
                    v-if="checkedGroup.length > 0 && checkedGroup.length > 2"
                  >
                    <span
                      v-for="item in checkedGroup.slice(0, 2)"
                      :key="item.id"
                      ><span class="eachGroup">{{ item.name }}</span></span
                    >
                    ...
                  </span>
                  <span v-if="checkedGroup.length === 0">Select group</span>
                </span>
                <el-icon class="exemple-hide"><ArrowDown /></el-icon>
              </button>
              <div
                class="div-card p-2 exempt-hide"
                :class="{
                  'd-none': hideDiv,
                  'd-block': !hideDiv,
                }"
              >
                <el-icon
                  v-if="grouploading && groups.length === 0"
                  class="is-loading text-center exempt-hide"
                >
                  <Loading />
                </el-icon>
                <!-- <i
                  class="pi pi-spin pi-spinner text-center exempt-hide"
                  v-if="grouploading && groups.length === 0"
                ></i> -->
                <input
                  type="text"
                  class="form-control exempt-hide"
                  v-model="searchGroupText"
                  ref="searchGroupRef"
                  placeholder="Search for group"
                />
                <GroupTree
                  :items="searchForGroups"
                  :addGroupValue="true"
                  @filteredGroup="setFilterGroups"
                />
              </div>
            </div>
          </div>
          <div class="col-sm-6 mt-3">
            <div class="font-weight-600">Start Date</div>
            <div class="mt-2">
              <el-date-picker
                v-model="startDate"
                type="date"
                format="DD/MM/YYYY"
                size="large"
                class="w-100"
              />
            </div>
          </div>
          <div class="col-sm-6 mt-3">
            <div class="font-weight-600">End Date</div>
            <div class="mt-2">
              <el-date-picker
                v-model="endDate"
                type="date"
                format="DD/MM/YYYY"
                size="large"
                class="w-100"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-2 col-md-3 d-flex align-items-center">
        <!-- <div style="height: 33%"></div> -->
        <div class="mt-2 text-center c-pointer" @click="getAttendanceReport">
          <el-button class="" round :loading="loading" :color="primarycolor">
            Generate Report
          </el-button>
        </div>
      </div>
    </div>
  </div>  
  <div
    class=" mt-4 "
    id="element-to-print"
    v-if="groupedReport.length > 0 && searched"
  >
  <div
      class="container-fluid d-flex justify-content-center my-2"
      v-if="displayTitle"
    >
    <div class="head-text">Attendance Report</div>
  </div>
  <div class="container-fluid">
    <div class="row">
      <GroupReportTable
      :groupedReport="groupedReport"
      :groupedReportByDate="groupedReportByDate"
      @data-to-export="setDataToExport"
      @data-header-to-export="setTableHeaderData"
    />
    </div>
  </div>
  </div>
  
</template>

<script>
import { ref, computed, nextTick, inject } from "vue";
import GroupReportTable from "./CheckinAttendanceReportTable.vue";
import axios from "@/gateway/backendapi";
import ExcelExport from "../../../services/exportFile/exportToExcel";
import { ElMessage } from "element-plus";
import html2pdf from "html2pdf.js";
import GroupTree from "../../groups/component/GroupTreeCheckboxParent.vue";
import grousService from "../../../services/groups/groupsservice";
export default {
  components: {
    GroupReportTable,
    GroupTree,
  },
  setup() {
    const startDate = ref("");
    const endDate = ref("");
    const events = ref([]);
    const primarycolor = inject("primarycolor");
    const groups = ref([]);
    const displayTitle = ref(false);
    const selectedEvent = ref({});
    const selectedEventID = ref(null);
    const selectedGroups = ref({});
    const attendanceReport = ref([]);
    const groupedReport = ref([]);
    const groupedReportByDate = ref([]);
    const bookTypeList = ref([
      { name: "xlsx" },
      { name: "csv" },
      { name: "txt" },
      { name: "pdf" },
    ]);
    const selectedFileType = ref({});
    const fileName = ref("Attendance Report");
    const showExport = ref(false);
    const fileToExport = ref([]);
    const fileHeaderToExport = ref([]);
    const searched = ref(false);
    const loading = ref(false);
    const searchGroupRef = ref();
    const searchGroupText = ref("");
    const hideDiv = ref(true);
    const grouploading = ref(false);
    const checkedGroup = ref([]);

    const getEvents = async () => {
      try {
        let { data } = await axios.get(`/api/Reports/events/getEvents`);
        events.value = data;
      } catch (err) {
        console.log(err);
      }
    };
    getEvents();
    const setSelectedEvent = () => {
      selectedEvent.value = events.value.find(
        (i) => i.id === selectedEventID.value
      );
    };

    const getGroups = async () => {
      grouploading.value = true;
      try {
        let data = await grousService.getGroups();
        groups.value = data.response.groupResonseDTO;
        grouploading.value = false;
      } catch (err) {
        console.log(err);
        grouploading.value = false;
      }
    };
    getGroups();

    const getAttendanceReport = async () => {
      let start = new Date(startDate.value).toLocaleDateString("en-US");
      let end = new Date(endDate.value).toLocaleDateString("en-US");
      loading.value = true;

      const payload = {
        groupIDs: checkedGroup.value,
        eventID: selectedEvent.value.id,
        startDate: start,
        endDate: end,
      };

      try {
        let { data } = await axios.post(
          `/api/Reports/events/getCheckInAttendanceReport`,
          payload
        );
        searched.value = true;
        loading.value = false;
        attendanceReport.value = data;
        groupReport(data, "personId");
        groupReportByDate(data, "activityID");

        if (data.length === 0 && searched.value) {
          ElMessage({
            type: "warning",
            showClose: true,
            message: "No data for this date range",
            duration: 5000,
          });
        }
      } catch (err) {
        console.log(err);
        loading.value = false;
      }
    };

    const groupReport = (array, key) => {
      let result = array.reduce((result, currentValue) => {
        // If an array already present for key, push it to the array. Else create an array and push the object
        (result[currentValue[key]] = result[currentValue[key]] || []).push(
          currentValue
        );
        // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
        return result;
      }, {}); // empty object is the initial value for result object
      groupedReport.value = [];
      for (const prop in result) {
        groupedReport.value.push({
          name: prop,
          value: result[prop],
        });
      }
    };

    const groupReportByDate = (array, key) => {
      let result = array.reduce((result, currentValue) => {
        // If an array already present for key, push it to the array. Else create an array and push the object
        (result[currentValue[key]] = result[currentValue[key]] || []).push(
          currentValue
        );
        // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
        return result;
      }, {}); // empty object is the initial value for result object
      groupedReportByDate.value = [];
      for (const prop in result) {
        groupedReportByDate.value.push({
          name: prop,
          value: result[prop],
        });
      }
    };

    // const getIPDetails = async() => {
    //     try {
    //         let data = await axio.get('http://www.geoplugin.net/json.gp?ip=52.25.109.230')
    //         console.log(data)
    //     }
    //     catch (err) {
    //         console.log(err)
    //     }
    // }

    // getIPDetails()

    const downLoadExcel = (item) => {
      if (item.name === "pdf") {
        displayTitle.value = true;
        var element = document.getElementById("element-to-print");
        var opt = {
          // margin:       1,
          filename: `${fileName.value}.pdf`,
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
          pagebreak: { mode: ["avoid-all"] },
        };

        // New Promise-based usage:
        html2pdf().set(opt).from(element).save();
        // html2pdf(element);
      } else {
        displayTitle.value = false;
        const filterVal = fileHeaderToExport.value.map((i, index) => index);
        const list = fileToExport.value;
        const header = fileHeaderToExport.value;
        ExcelExport.exportToExcel(
          filterVal,
          list,
          header,
          fileName.value,
          item.name
        );
      }
    };

    const setDataToExport = (payload) => {
      fileToExport.value = payload;
    };

    const setTableHeaderData = (payload) => {
      fileHeaderToExport.value = payload;
    };

    const setGroupProp = () => {
      hideDiv.value = !hideDiv.value;
      nextTick(() => {
        searchGroupRef.value.focus();
      });
    };

    const searchForGroups = computed(() => {
      if (!searchGroupText.value && groups.value.length > 0)
        return groups.value;
      return groups.value.filter((i) =>
        i.name.toLowerCase().includes(searchGroupText.value.toLowerCase())
      );
    });
    const closeDropdownIfOpen = (e) => {
      if (
        !e.target.classList.contains("exempt-hide") &&
        !e.target.classList.contains("p-hidden-accessible") &&
        !e.target.classList.contains("p-checkbox-box") &&
        !e.target.classList.contains("p-checkbox-icon")
      ) {
        hideDiv.value = true;
      }
    };

    const setFilterGroups = (payload) => {
      checkedGroup.value = payload;
    };

    return {
      startDate,
      displayTitle,
      endDate,
      events,
      groups,
      setSelectedEvent,
      selectedEvent,
      getAttendanceReport,
      selectedEventID,
      startDate,
      endDate,
      selectedGroups,
      attendanceReport,
      groupReport,
      groupedReport,
      groupReportByDate,
      groupedReportByDate,
      downLoadExcel,
      selectedFileType,
      bookTypeList,
      fileName,
      showExport,
      setDataToExport,
      fileToExport,
      setTableHeaderData,
      fileHeaderToExport,
      primarycolor,
      searched,
      loading,
      setGroupProp,
      searchGroupRef,
      searchGroupText,
      searchForGroups,
      hideDiv,
      grouploading,
      checkedGroup,
      closeDropdownIfOpen,
      setFilterGroups,
    };
  },
};
</script>

<style scoped>
.header {
  font: normal normal 800 29px Nunito sans;
}
/* .default-btn {
    font-weight: 600;
    white-space: initial;
    font-size: 1rem;
    border-radius: 3rem;
    padding: .5rem 1.25rem;
    width: auto;
	border:none;
    max-height: 40px;
    background: #6c757d47 !important;
    color:#000;
    text-decoration: none;
    min-width: 121px;
} */

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

.div-card {
  position: absolute;
  background: white;
  z-index: 1;
  width: 100%;
  top: 70px;
  box-shadow: 0 0 11px rgba(33, 33, 33, 0.2);
  max-height: 400px;
  overflow: scroll;
}

.eachGroup {
  padding: 5px 10px;
  background: #eee;
  border-radius: 25px;
  margin: 0 3px;
}
</style>