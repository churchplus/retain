<template>
  <div>
    <div class="container-fluid px-0">
      <div class="row mb-3">
        <div class="col-md-12 px-0 first-timers-text">
          <h2 class="head-text">Branch Attendance</h2>
        </div>

        <!-- <div class="col-md-6 d-flex flex-row-reverse">
        <BranchSelect class="w-50" @selectedbranch="setSelectedBranch" />
      </div> -->
      </div>
      <div class="row">
        <div class="col-md-12 px-0">
          Here you can view and manage the transactions of your branches, select
          the branch you want to view its transactions from the dropdown at the
          top-right corner.
        </div>
      </div>
      <div class="row" v-if="loading && branchAttendance.length == 0">
        <div class="col-md-12 d-flex justify-content-center mt-5">
          <el-icon
            :size="40"
            class="is-loading"
          >
            <Loading />
          </el-icon>
        </div>
      </div>
      <div class="row" v-loading="loading" v-if="branchAttendance.length > 0">
        <div class="col-12 px-0" id="table">
          <div class="top-con">
            <div class="table-top p-3 mt-5">
              <div
                class="d-flex flex-column flex-sm-row justify-content-sm-end"
              >
                <el-input
                  size="small"
                  v-model="searchText"
                  placeholder="Search..."
                  class="w-50"
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
                    <el-button>
                      <el-icon :size="13">
                        <Search />
                      </el-icon>
                    </el-button>
                  </template>
                </el-input>
              </div>
            </div>
          </div>
          <div>
            <Table
              :data="searchBranchAttendance"
              :headers="branchAtendanceHeaders"
              v-loading="loading"
              :checkMultipleItem="false"
              @checkedrow="handleSelectionChange"
              v-if="searchBranchAttendance.length > 0"
            >
              <template v-slot:event="{ item }">
                <div class="c-pointer">
                  <router-link
                    :to="{
                      name: 'CheckinType',
                      query: {
                        activityID: item.eventID,
                        activityName: item.fullEventName,
                        groupId: item.groupID,
                        groupName: item.fullGroupName,
                        id: item.id,
                        code: item.attendanceCode,
                        fromBranch: true,
                      },
                    }"
                    class="itemroute-color"
                  >
                    {{ item.fullEventName }}
                  </router-link>
                </div>
              </template>

              <template v-slot:date="{ item }">
                <div class="c-pointer">
                  <router-link
                    :to="{
                      name: 'CheckinType',
                      query: {
                        activityID: item.eventID,
                        activityName: item.fullEventName,
                        groupId: item.groupID,
                        groupName: item.fullGroupName,
                        id: item.id,
                        code: item.attendanceCode,
                        fromBranch: true,
                      },
                    }"
                    class="itemroute-color"
                  >
                    {{ formatDate(item.eventDate) }}
                  </router-link>
                </div>
              </template>

              <template v-slot:group="{ item }">
                <div class="c-pointer">
                  <router-link
                    :to="{
                      name: 'CheckinType',
                      query: {
                        activityID: item.eventID,
                        activityName: item.fullEventName,
                        groupId: item.groupID,
                        groupName: item.fullGroupName,
                        id: item.id,
                        code: item.attendanceCode,
                        fromBranch: true,
                      },
                    }"
                    class="itemroute-color"
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
                          class="itemroute-color"
                          :to="{
                            name: 'AttendanceReport',
                            params: { id: item.id },
                          }"
                        >
                          View details
                        </router-link>
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <router-link
                          class="text-decoration-none text-color"
                          :to="{
                            name: 'CheckinType',
                            query: {
                              activityID: item.eventID,
                              activityName: item.fullEventName,
                              groupId: item.groupID,
                              groupName: item.fullGroupName,
                              id: item.id,
                              code: item.attendanceCode,
                              fromBranch: true,
                            },
                          }"
                        >
                          Checkin
                        </router-link>
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <div
                          class="text-decoration-none text-color"
                          @click="showConfirmModal(item.id, index)"
                        >
                          Delete
                        </div>
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </template>
            </Table>
            <div
              class="d-flex justify-content-end my-3"
              v-if="searchBranchAttendance.length > 0"
            >
              <el-pagination
                v-model:current-page="serverOptions.page"
                v-model:page-size="serverOptions.rowsPerPage"
                background
                layout="total, prev, pager, next, jumper"
                :total="totalItem"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from "@vue/runtime-core";
import BranchSelect from "../component/BranchSelect.vue";
import axios from "@/gateway/backendapi";
import dateFormatter from "../../../services/dates/dateformatter";
import Table from "@/components/table/Table";
import { ElMessage, ElMessageBox } from "element-plus";

export default {
  components: {
    BranchSelect,
    Table,
  },

  setup() {
    const selectedBranch = ref({});
    const branchAttendance = ref([]);
    const marked = ref([]);
    const filterFormIsVissible = ref(false);
    const searchIsVisible = ref(false);
    const searchText = ref("");
    const loading = ref(false);
    const branchId = ref("");
    const totalItem = ref();
    const branchID = ref(localStorage.getItem("branchId"));
    const branchAtendanceHeaders = ref([
      { name: "EVENT", value: "event" },
      { name: "DATE", value: "date" },
      { name: "GROUP", value: "group" },
      { name: "ACTION", value: "action" },
    ]);

    const setSelectedBranch = async (payload) => {
      loading.value = true;
      branchId.value = payload.id;
      try {
        let { data } = await axios.get(
          `/api/checkinattendance/allcheckinattendances?branchId=${payload.id}`
        );
        loading.value = false;

        branchAttendance.value = data.data;
        if (data && data.data.length === 0) {
          ElMessage({
            type: "warning",
            message: "There are no checkin attendance in this branch yet.",
            duration: 5000,
          });
        }
      } catch (err) {
        loading.value = false;
        console.log(err);
      }
    };

    const handleSizeChange = (val) => {
      console.log(`${val} items per page`);
    };
    const handleCurrentChange = (val) => {
      console.log(`current page: ${val}`);
    };
    const handleSelectionChange = (val) => {
      marked.value = val;
    };

    const getAttendanceList = async () => {
      loading.value = true;
      try {
        let { data } = await axios.get(
          `/api/checkinattendance/allcheckinattendances?page=1&branchId=${branchID.value}`
        );
        branchAttendance.value = data.data;
        totalItem.value = data.totalItems;
        loading.value = false;
        if (data && data.data.length === 0) {
          ElMessage({
            type: "warning",
            message: "There are no checkin attendance in this branch yet.",
            duration: 5000,
          });
        }
      } catch (err) {
        loading.value = false;
        console.log(err);
      }
    };
    getAttendanceList();

    const toggleFilterFormVissibility = () =>
      (filterFormIsVissible.value = !filterFormIsVissible.value);
    const toggleSearch = () => {
      searchIsVisible.value = !searchIsVisible.value;
    };

    const searchBranchAttendance = computed(() => {
      if (branchAttendance.value.length > 0 && !searchText.value)
        return branchAttendance.value;
      return branchAttendance.value.filter((i) => {
        return i.contribution
          .toLowerCase()
          .includes(searchText.value.toLowerCase());
      });
    });

    const formatDate = (date) => {
      return dateFormatter.monthDayYear(date);
    };
    const serverOptions = ref({
      page: 1,
      rowsPerPage: 50,
    });

    watch(serverOptions.value, () => {
      getAttendanceByPage();
    },
      { deep: true }
    );

    const getAttendanceByPage = async () => {
      loading.value = true;
      try {
        const { data } = await axios.get(
          `/api/checkinattendance/allcheckinattendances?page=${serverOptions.value.page}&branchId=${branchID.value}`
        );  
        if (data && data.data.length > 0) {
          branchAttendance.value = data.data;
        } else {
          ElMessage({
          type: 'warning',
          message: `Page ${serverOptions.value.page} cannot be found`,
          duration: 5000
        })
        }
        loading.value = false;
      } catch (error) {
        console.log(error);
        loading.value = false;
        ElMessage({
          type: 'error',
          message: `Could not generate page ${serverOptions.value.page}, please try again`,
          duration: 5000
        })
      }
    };

    const deleteAttendance = (id, index) => {
      axios
        .delete(`/api/CheckInAttendance/checkout?attendanceId=${id}`)
        .then((res) => {
          if (res.status === 200) {
            ElMessage({
              type: "success",
              message: res.data,
              duration: 5000,
            });
            branchAttendance.value.splice(index, 1);
          } else {
            ElMessage({
              type: "warning",
              message: "Delete Failed",
              duration: 5000,
            });
          }
        })
        .catch((err) => {
          //     finish()
          if (err.response) {
            ElMessage({
              type: "error",
              message: err.response,
              duration: 5000,
            });
          } else if (
            err &&
            err.response &&
            err.response.toString().toLowerCase().includes("network error")
          ) {
            ElMessage({
              type: "warning",
              message: "Please ensure you have a strong internet connection",
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
          deleteAttendance(id, index);
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "Delete canceled",
          });
        });
    };

    return {
      setSelectedBranch,
      branchAtendanceHeaders,
      handleSizeChange,
      handleSelectionChange,
      marked,
      handleCurrentChange,
      selectedBranch,
      serverOptions,
      branchAttendance,
      filterFormIsVissible,
      searchIsVisible,
      toggleFilterFormVissibility,
      toggleSearch,
      searchBranchAttendance,
      searchText,
      showConfirmModal,
      deleteAttendance,
      loading,
      branchID,
      formatDate,
      branchId,
      totalItem,
    };
  },
};
</script>

<style scoped>
.page-header {
  font: normal normal 800 29px Nunito sans;
}

.filter-options-shown {
  height: 80px;
  overflow: hidden;
  transition: all 0.5s ease-in-out;
}

.filter-options {
  height: 0;
  overflow: hidden;
  transition: all 0.5s ease-in-out;
}
.table-top {
  font-weight: 800;
  font-size: 12px;
  background: #fff;
  border: 1px solid #d4dde3;
  border-bottom: none;
  cursor: pointer;
}

.img-resize {
  border-radius: 50%;
  height: 26px;
  width: 26px;
  object-fit: cover;
}

.t-header {
  background: #dde2e6 0% 0% no-repeat padding-box;
  font-size: 16px;
  padding: 0.5rem 0;
}

.desc-head {
  font-weight: 700;
}

.hover:hover {
  background: #eee;
}

.itemroute-color {
  color: #136acd;
  cursor: pointer;
  text-decoration: none;
}

@media (max-width: 767px) {
  .filter-options-shown {
    height: 150px;
  }
}
</style>