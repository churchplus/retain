
<template>
  <!-- tosin working on tables -->
  <div class="row mt-4 ">
    <div class="col-md-12 px-0" id="table"> 
      <div class="top-con" id="ignore2">
        <div class="table-top p-3 ">
          <div class="d-flex flex-column flex-sm-row justify-content-end ">
              <div>
                <el-input
                size="small"
                v-model="searchText"
                placeholder="Search..."
                @keyup.enter.prevent="searchAttendanceInDB"
                class="input-with-select"
              >
                <template #append>
                  <el-button @click.prevent="searchAttendanceInDB">
                    <el-icon :size="13">
                      <Search />
                    </el-icon>
                  </el-button>
                </template>
              </el-input>
              </div>
            </div>
            <div class="d-flex flex-column flex-sm-row justify-content-start" v-if="checkedAttendance.length > 0">
              <div class="">
                <el-tooltip class="box-item" effect="dark" content="Delete attendance(s)" placement="top-start">
              <el-icon :size="20" class=" c-pointer" v-if="checkedAttendance.length > 0" @click="modal">
                <Delete />
              </el-icon>
            </el-tooltip>
              </div>
            </div>
        </div>
        <Table
          :data="searchAttendance"
          :headers="attendanceHeaders"
          :checkMultipleItem="true"
          v-loading="loading"
          @checkedrow="handleSelectionChange"
        >
        <template v-slot:eventName="{ item }">
          <div class="c-pointer">
            <router-link
              class="text-decoration-none font-weight-500 itemroute-color"
              :to="{
                name: 'CheckinType',
                query: {
                  activityID: item.eventID,
                  activityName: item.fullEventName,
                  groupId: item.groupID,
                  groupName: item.fullGroupName,
                  id: item.id,
                  code: item.attendanceCode,
                },
              }"
            >
              {{ item.fullEventName }}
            </router-link>
          </div>
        </template>
        <template v-slot:date="{ item }">
          <div class="c-pointer">
            <router-link
              class="
                text-decoration-none
                font-weight-500
                itemroute-color
              "
              :to="{
                name: 'CheckinType',
                query: {
                  activityID: item.eventID,
                  activityName: item.fullEventName,
                  groupId: item.groupID,
                  groupName: item.fullGroupName,
                  id: item.id,
                  code: item.attendanceCode,
                },
              }"
            >
              {{ formatDate(item.eventDate) }}
            </router-link>
          </div>
        </template>
        <template v-slot:groupName="{ item }">
          <div class="c-pointer" >
            <router-link
              class="
                text-decoration-none
                font-weight-500
                itemroute-color
              "
              :to="{
                name: 'CheckinType',
                query: {
                  activityID: item.eventID,
                  activityName: item.fullEventName,
                  groupId: item.groupID,
                  groupName: item.fullGroupName,
                  id: item.id,
                  code: item.attendanceCode,
                },
              }"
            >
              {{ item.fullGroupName }}
            </router-link>
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
                    class="text-decoration-none text-dark"
                    :to="{
                      name: 'AttendanceReport',
                      params: { id: item.id },
                    }"
                    >View Details</router-link
                  >
                </el-dropdown-item>
                <el-dropdown-item>
                  <router-link
                    class="text-decoration-none text-dark"
                    :to="{
                      name: 'CheckinType',
                      query: {
                        activityID: item.eventID,
                        activityName: item.fullEventName,
                        groupId: item.groupID,
                        groupName: item.fullGroupName,
                        id: item.id,
                        code: item.attendanceCode,
                      },
                    }"
                    >Checkin</router-link
                  >
                </el-dropdown-item>
                <!-- <el-dropdown-item>
                 <router-link
                    class="text-decoration-none text-dark"
                    :to="{
                      name: 'AddAttendance',
                      params: {
                        id: item.id,
                      },
                    }"
                    >Edit</router-link
                  >
                </el-dropdown-item> -->
                <el-dropdown-item>
                  <div
                    @click.prevent="showConfirmModal(item.id)"
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
      <div class="d-flex justify-content-end my-3">
        <el-pagination
          v-model:current-page="serverOptions.page"
          v-model:page-size="serverOptions.rowsPerPage"
          background
          layout="total, prev, pager, next, jumper"
          :total="serverItemsLength"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
    <!-- {{totalItems}} -->
    <div class="row" v-if="errorOccurred">
      <div class="col-md-12 text-center">
        <p>Error getting items</p>
      </div>
    </div>
  </div>
  <!-- tosin working on tables -->
  <!-- end of table area -->
</template>

<script>
import { ref, computed, watch, watchEffect } from "vue";
import dateFormatter from "../../../services/dates/dateformatter";
import stopProgressBar from "../../../services/progressbar/progress";
import axios from "@/gateway/backendapi";
import store from "../../../store/store";
import Table from "@/components/table/Table";
import { ElMessage, ElMessageBox } from "element-plus";

export default {
  props: ["list", "errorOccurred", "totalItems"],
  components: { Table },
  emits: ["pagedattendance", "checkedattendance"],
  setup(props, { emit }) {
    const expose = ref(false);
    const loading = ref(false);
    const attendanceList = ref([]);
    const checkedAttendance = ref([]);
    const attendanceHeaders = ref([
      { name: "EVENT NAME", value: "eventName" },
      { name: "DATE", value: "date" },
      { name: "GROUP NAME", value: "groupName" },
      { name: "ACTION", value: "action" },
    ]);
    const serverOptions = ref({
      page: 1,
      rowsPerPage: 50,
    });

    const serverItemsLength = ref(0);
    const toggleEllips = () => {
      toggleEllips.value = !toggleEllips.value;
    };

    const getPeopleList = () => {
      attendanceList.value = props.list;
    };
    getPeopleList();

    const formatDate = (date) => {
      return dateFormatter.monthDayYear(date);
    };
    const handleSelectionChange = (val) => {
      checkedAttendance.value = val
    }

    const convert = (x) => {
      return x.map((i) => i.id);
    };

    const getAttendancePage = async () => {
      paginatedTableLoading.value = true;
      try {
        const { data } = await axios.get(
          `api/CheckInAttendance/AllCheckInAttendances?page=${serverOptions.value.page}`
        );
  
        // attendanceList.value = data;
        if (data && data.data.length > 0) {
          emit("pagedattendance", data);
        }
        paginatedTableLoading.value = false;
      } catch (error) {
        paginatedTableLoading.value = false;
        console.log(error);
      }
    };
    watch(
      serverOptions.value,
      () => {
        getAttendancePage();
      },
      { deep: true }
    );

    watchEffect(() => {
      serverItemsLength.value = props.totalItems;
      // if (props.list) {
      //   churchMembers.value = props.firstTimersList
      // }
    });
    
    const handleSizeChange = (val) => {
      `${val} items per page`
    };

    const handleCurrentChange = (val) => {
      `current page: ${val}`;
    };
    const paginatedTableLoading = ref(false);

    const checkOutAttendance = () => {
      
      let dft = convert(checkedAttendance.value);
     
      axios
        .post(`/api/CheckInAttendance/Delete/Multiple`, dft)
        .then((res) => {
          let incomingRes = res.data;
        
          if (incomingRes.toString().toLowerCase().includes("attendance")) {
            ElMessage({
            type: "success",
            message: "Attendance(s) deleted successfully.",
            duration: 5000,
          });
            emit("checkedattendance", checkedAttendance.value);
          }
         
        })
        .catch((err) => {
          stopProgressBar();
          if (err.toString().toLowerCase().includes("network error")) {
            ElMessage({
            type: "warning",
            message: "Please ensure you have a strong internet connection",
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

    const deleteAttendance = (id) => {
      axios
        .delete(`/api/CheckInAttendance/checkout?attendanceId=${id}`)
        .then((res) => {
          if (res.status === 200) {
            ElMessage({
            type: "success",
            message: res.data,
            duration: 5000,
          });
            emit("attendance-checkin", id);
            store.dispatch('attendance/removeAttendanceFromStore', id)
          } else {
            ElMessage({
            type: "warning",
            message: 'Delete Failed, Please Try Again',
            duration: 5000,
          });
          }
        })
        .catch((err) => {
          
          if (err.response) {
             ElMessage({
            type: "error",
            message: err.response,
            duration: 5000,
          });
          } else if (
            err.response.toString().toLowerCase().includes("network error")
          ) {
             ElMessage({
            type: "warning",
            message: 'Please ensure you have a strong internet connection',
            duration: 5000,
          });
          }
        });
    };

    const check1item = (ft) => {
      const attendanceIdx = checkedAttendance.value.findIndex(
        (i) => i.id === ft.id
      );
      if (attendanceIdx < 0) {
        checkedAttendance.value.push(ft);
      } else {
        checkedAttendance.value.splice(attendanceIdx, 1);
      }
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
          checkOutAttendance();
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "You have rejected",
            duration: 5000,
          });
        });
    };

    const markAllAttendance = () => {
      if (checkedAttendance.value.length < props.list.length) {
        props.list.forEach((i) => {
          const ftInMarked = checkedAttendance.value.findIndex(
            (f) => f.id === i.id
          );
          if (ftInMarked < 0) {
            checkedAttendance.value.push(i);
          }
        });
      } else {
        checkedAttendance.value = [];
      }
    };

    const showConfirmModal = (id) => {
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
          deleteAttendance(id);
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "You have rejected",
            duration: 5000,
          });
        });
    };
    let searchText = ref("");
    const searchAttendanceInDB = () => {
      if (searchText.value !== "" && props.list.length > 0) {
        return props.list.filter((i) => {
          if (i.fullEventName)
            return i.fullEventName
              .toLowerCase()
              .includes(searchText.value.toLowerCase());
        });
      } else {
        return props.list;
      }
    };
    const searchAttendance = computed(() => {
      if (searchText.value !== "" && props.list.length > 0) {
        return props.list.filter((i) => {
          return i.fullEventName
            .toLowerCase()
            .includes(searchText.value.toLowerCase());
        });
      } else {
        return props.list;
      }
    });

    const currentPage = ref(0);

    return {
      modal,
      attendanceHeaders,
      searchAttendanceInDB,
      handleSelectionChange,
      attendanceList,
      checkOutAttendance,
      loading,
      check1item,
      markAllAttendance,
      expose,
      checkedAttendance,
      toggleEllips,
      formatDate,
      showConfirmModal,
      deleteAttendance,
      searchText,
      searchAttendance,
      currentPage,
      serverOptions,
      getAttendancePage,
      serverItemsLength,
      handleSizeChange,
      handleCurrentChange,
      paginatedTableLoading,
    };
  },
};
</script>

<style scoped>
.table {
  border-radius: 30px;
}

.table-header {
  padding: 10px;
  font-size: 14px;
  border-radius: 30px 30px 0 0;
  text-align: left;
  color: #000;
  font-weight: 700;
}

.t-body {
  padding: 0 10px;
}

.parent-element {
  box-shadow: 0px 1px 4px #02172e45;
}

.page-header {
  font-family: Nunito sans;
  font-size: 22px;
  font-weight: 800;
  color: #212529;
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
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 42px;
  text-decoration: none;
}

.dcreated,
.tattendance,
.alist {
  font-weight: 700;
  color: #212529;
}

.dropdown-item {
  font-weight: 600;
  color: #212529;
  cursor: pointer;
}

.dcreated2,
.tattendance2,
.alist2 {
  font-weight: 700;
  color: #212529;
  margin: 0.8rem 0.8rem;
}

.elist,
.eattendance,
.edate {
  font-weight: 500;
  color: #212529;
}

.elist2,
.eattendance2,
.edate2 {
  color: #212529;
  margin: 0.8rem 0.8rem;
}

.ion {
  font-weight: 600;
  display: flex;
  justify-content: start;
}

.ion2 {
  font-weight: 600;
  display: flex;
  justify-content: end;
  margin: 0.8rem 0.8rem;
}

.hr {
  margin-top: -2rem;
}

/* background: #0f529f; */

@media (max-width: 414px) {
  .head-button {
    flex-direction: column;
    align-items: center;
  }

  .page-header {
    font-family: Nunito sans;
    font-size: 22px;
    font-weight: 800;
    color: #212529;
    text-align: center;
    margin-top: 1.2rem;
    margin-bottom: -0.8rem;
  }

  .add-btn {
    width: 180px;
    background: #136acd;
    border-radius: 20px;
    color: #ffffff;
    font-weight: bold;
    outline: none;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    text-decoration: none;
    margin-top: 1rem;
  }

  .table-header {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    text-align: left;
    justify-items: left;
  }
}

@media (max-width: 575px) {
  .head-button {
    flex-direction: column;
    align-items: center;
  }

  .page-header {
    font-family: Nunito sans;
    font-size: 22px;
    font-weight: 800;
    color: #212529;
    text-align: center;
    margin-top: 1.2rem;
    margin-bottom: -0.8rem;
  }

  .add-btn {
    width: 180px;
    background: #136acd;
    border-radius: 20px;
    color: #ffffff;
    font-weight: bold;
    font-size: 0.8rem;
    outline: none;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    text-decoration: none;
    margin-top: 1rem;
  }

  .head-button {
    display: flex;
   
    justify-content: center;
  }
}

/* tosin working */
.myselectContr {
  height: 2.5rem;
}
.data-value a {
  color: #136acd;
  text-decoration: none;
  width: 241px;
}
.page-header {
  font-weight: 700;
  font-size: 1.7rem;
}
.summary {
  border-radius: 30px;
  /* box-shadow: 0px 3px 6px #2c28281c; */
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
.table-top {
  font-weight: 800;
  font-size: 12px;
  background: #fff;
  border: 1px solid #e0e0e0;
  border-bottom: none;
  /* display: flex;
  justify-content: flex-end; */
}

.table-top label:hover,
.table-top p:hover {
  cursor: pointer;
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
  /* border: 1px solid #C5D9F2; */
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
.board.members-count {
  padding: 24px;
}
.no-record {
  color: rgba(184, 5, 5, 0.726);
  font-size: 1.1em;
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
  /* border-radius: 0px 0px 22px 22px; */
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
  /* color: #136acd; */
  color: #02172e;
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
}

.hover:hover {
  background: #eee;
}
/* @media Queries */
@media (max-width: 771px) {
  .fontIncrease {
    font-size: 20px;
  }

  .itemroute-color {
    color: #136acd;
    /* color: #02172e; */
  }
}
/* tosin working */
</style>