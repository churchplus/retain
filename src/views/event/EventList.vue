<template>
  <div>
    <div class="row">
      <div class="col-sm-12 text-center">
        <div class="avg">Overall Average</div>
      </div>
    </div>

    <div class="row mt-4 mobileResponsive">
      <div
        class="col-6 col-sm-1 text-center default-btn cursor-pointer monthRessponsive"
        :class="{ 'active-btn': monthlyActiveBtn }"
        @click="toggleMonthlyClass"
      >
        <div>Monthly</div>
      </div>
      <div
        class="col-6 col-sm-1 ml-sm-2 text-center default-btn cursor-pointer yearResponsive"
        :class="{ 'active-btn': yearlyActiveBtn }"
        @click="toggleYearlyClass"
      >
        <div>Yearly</div>
      </div>
      <div
        class="col-6 offset-3 offset-sm-0 col-sm-1 ml-sm-2 mt-3 mt-sm-0 text-center default-btn cursor-pointer"
        :class="{ 'active-btn': allTimeActiveBtn }"
        @click="toggleAllTimeClass"
      >
        <div>All Time</div>
      </div>
    </div>

    <!-- Monthly -->
    <div class="row avg-table mt-4" v-if="monthlyActiveBtn">
      <div class="col-6 col-md-3 first-row">
        <div>Attendance</div>
        <el-tooltip
          class="box-item"
          effect="dark"
          :content="eventSummary.attendanceAverage.monthly.toString()"
          placement="left-start"
        >
          <div>{{ convert(eventSummary.attendanceAverage.monthly) }}</div>
        </el-tooltip>
      </div>
      <div class="col-6 col-md-3">
        <div>
          Offering<span style="font-size: 15px" class="font-weight-700"
            >({{ userCurrency }})</span
          >
        </div>
        <el-tooltip
          class="box-item"
          effect="dark"
          :content="`${
            eventSummary &&
            eventSummary.offeringAverage &&
            eventSummary.offeringAverage.monthly
              ? eventSummary.offeringAverage.monthly.toString()
              : '-- --'
          }`"
          placement="left-start"
        >
          <div>
            {{
              eventSummary &&
              eventSummary.offeringAverage &&
              eventSummary.offeringAverage.monthly
                ? convert(eventSummary.offeringAverage.monthly)
                : "-- --"
            }}
          </div>
        </el-tooltip>
      </div>
      <div class="col-6 col-md-3">
        <div>First Timers</div>
        <el-tooltip
          class="box-item"
          effect="dark"
          :content="eventSummary.firstTimerAverage.monthly.toString()"
          placement="left-start"
        >
          <div>{{ convert(eventSummary.firstTimerAverage.monthly) }}</div>
        </el-tooltip>
      </div>
      <div class="col-6 col-md-3">
        <div>New Converts</div>
        <el-tooltip
          class="box-item"
          effect="dark"
          :content="eventSummary.newConvertAverage.monthly.toString()"
          placement="left-start"
        >
          <div>{{ convert(eventSummary.newConvertAverage.monthly) }}</div>
        </el-tooltip>
      </div>
    </div>

    <!-- yearly -->
    <div class="row avg-table mt-4" v-if="yearlyActiveBtn">
      <div class="col-6 col-md-3 first-row">
        <div>Attendance</div>
        <el-tooltip
          class="box-item"
          effect="dark"
          :content="eventSummary.attendanceAverage.yearly.toString()"
          placement="left-start"
        >
          <div>{{ convert(eventSummary.attendanceAverage.yearly) }}</div>
        </el-tooltip>
      </div>
      <div class="col-6 col-md-3">
        <div>
          Offering<span style="font-size: 15px" class="font-weight-700"
            >({{ userCurrency }})</span
          >
        </div>
        <el-tooltip
          class="box-item"
          effect="dark"
          :content="
            eventSummary &&
            eventSummary.offeringAverage &&
            eventSummary.offeringAverage.yearly
              ? eventSummary.offeringAverage.yearly.toString()
              : '-- --'
          "
          placement="left-start"
        >
          <div>
            {{
              eventSummary &&
              eventSummary.offeringAverage &&
              eventSummary.offeringAverage.yearly
                ? convert(eventSummary.offeringAverage.yearly)
                : "-- --"
            }}
          </div>
        </el-tooltip>
      </div>
      <div class="col-6 col-md-3">
        <div>First Timers</div>
        <el-tooltip
          class="box-item"
          effect="dark"
          :content="eventSummary.firstTimerAverage.yearly.toString()"
          placement="left-start"
        >
          <div>{{ convert(eventSummary.firstTimerAverage.yearly) }}</div>
        </el-tooltip>
      </div>
      <div class="col-6 col-md-3">
        <div>New Converts</div>
        <el-tooltip
          class="box-item"
          effect="dark"
          :content="`${eventSummary.newConvertAverage.yearly.toString()}`"
          placement="left-start"
        >
          <div>{{ convert(eventSummary.newConvertAverage.yearly) }}</div>
        </el-tooltip>
      </div>
    </div>

    <!-- All time -->
    <div class="row avg-table mt-4" v-if="allTimeActiveBtn">
      <div class="col-6 col-md-3 first-row">
        <div>Attendance</div>
        <el-tooltip
          class="box-item"
          effect="dark"
          :content="eventSummary.attendanceAverage.allTime.toString()"
          placement="top-start"
        >
          <div>{{ convert(eventSummary.attendanceAverage.allTime) }}</div>
        </el-tooltip>
      </div>
      <div class="col-6 col-md-3">
        <div>
          Offering<span style="font-size: 15px" class="font-weight-700"
            >({{ userCurrency }})</span
          >
        </div>
        <el-tooltip
          class="box-item"
          effect="dark"
          :content="
            eventSummary &&
            eventSummary.offeringAverage &&
            eventSummary.offeringAverage.allTime
              ? eventSummary.offeringAverage.allTime.toString()
              : '-- --'
          "
          placement="top-start"
        >
          <div>
            {{
              eventSummary &&
              eventSummary.offeringAverage &&
              eventSummary.offeringAverage.allTime
                ? convert(eventSummary.offeringAverage.allTime)
                : "-- --"
            }}
          </div>
        </el-tooltip>
      </div>
      <div class="col-6 col-md-3">
        <div>First Timers</div>
        <el-tooltip
          class="box-item"
          effect="dark"
          :content="eventSummary.firstTimerAverage.allTime.toString()"
          placement="top-start"
        >
          <div>{{ convert(eventSummary.firstTimerAverage.allTime) }}</div>
        </el-tooltip>
      </div>
      <div class="col-6 col-md-3">
        <div>New Converts</div>
        <el-tooltip
          class="box-item"
          effect="dark"
          :content="eventSummary.newConvertAverage.allTime.toString()"
          placement="top-start"
        >
          <div>{{ convert(eventSummary.newConvertAverage.allTime) }}</div>
        </el-tooltip>
      </div>
    </div>
    <!-- </div> -->
    <hr class="hr" />
    <!-- </div> -->
    <!-- <div class="container"> -->
    <div class="row">
      <div class="col-sm-12 p-0 mt-5">
        <div class="table-top p-3 mt-5">
          <div
            class="row d-flex flex-column flex-sm-row justify-content-sm-end"
          >
            <div class="col-md-2">
              <p
                @click="toggleFilterFormVissibility"
                class="mb-0 mr-3 d-flex my-3 my-sm-0 c-pointer"
              >
                <el-icon :size="13">
                  <Filter />
                </el-icon>
                <span class="ml-1"> FILTER</span>
              </p>
            </div>
            <div class="col-md-5">
              <el-input
                size="small"
                v-model="searchText"
                placeholder="Search..."
                @input="searchingMember = true"
                @keyup.enter.prevent="searchPeopleInDB($event)"
                class="input-with-select"
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
                  <el-button @click.prevent="searchPeopleInDB($event)">
                    <el-icon :size="13">
                      <Search />
                    </el-icon>
                  </el-button>
                </template>
              </el-input>
            </div>
          </div>

          <div
            class="filter-options mt-3"
            :class="{ 'filter-options-shown': filterFormIsVissible }"
          >
            <div class="container-fluid">
              <div class="row">
                <div class="col-md-9">
                  <div class="row">
                    <div
                      class="col-12 col-sm-6 offset-sm-3 offset-md-0 form-group inp w-100"
                    >
                      <el-input
                        type="text"
                        class="w-100"
                        placeholder="First Name"
                      />
                    </div>

                    <div class="col-12 col-sm-6 form-group d-none d-md-block">
                      <el-date-picker
                        type="date"
                        class="w-100"
                        size="large"
                        placeholder="Pick a Date"
                        format="MM/DD/YYYY"
                      />
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-12 col-sm-6 form-group d-none d-md-block">
                      <el-input
                        type="text"
                        class="w-100"
                        placeholder="Last Name"
                      />
                    </div>

                    <div class="col-12 col-sm-6 form-group d-none d-md-block">
                      <el-input
                        type="text"
                        class="w-100"
                        placeholder="Phone Number"
                      />
                    </div>
                  </div>
                </div>

                <div class="col-md-3 d-flex flex-column align-items-center">
                  <el-button round :color="primarycolor" class="text-white">
                    Apply
                  </el-button>
                  <span class="mt-2">
                    <a class="clear-link mr-2" @click="clearAll">Clear all</a>
                    <span class="mx-2"
                      ><i
                        class="fas fa-circle"
                        style="font-size: 4px"
                      ></i></span
                    ><a class="hide-link ml-2" @click="hide">Hide</a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Table
          :headers="eventHeaders"
          :checkMultipleItem="false"
          :data="filterEvents"
          v-if="filterEvents.length > 0"
        >
          <template v-slot:isSent="{ item }">
            <div class="c-pointer td-first">
              <router-link
                :to="`/tenant/event/${item.activityId}`"
                class="text-decoration-none text-color"
              >
                {{ item.isSent ? "Sent" : "Unsent" }}
              </router-link>
            </div>
          </template>
          <template v-slot:eventName="{ item }">
            <router-link
              :to="`/tenant/event/${item.activityId}`"
              class="text-decoration-none text-color"
            >
              <div class="c-pointer">{{ item.eventName }}</div>
            </router-link>
          </template>
          <template v-slot:title="{ item }">
            <div class="c-pointer">
              <router-link
                :to="`/tenant/event/${item.activityId}`"
                class="text-decoration-none text-color"
              >
                {{ item.title }}
              </router-link>
            </div>
          </template>
          <template v-slot:date="{ item }">
            <div class="c-pointer">
              <router-link
                :to="`/tenant/event/${item.activityId}`"
                class="text-decoration-none text-color"
              >
                <span>{{ date(item.activityDate) }}</span>
              </router-link>
            </div>
          </template>

          <template v-slot:attendances="{ item }">
            <div class="c-pointer">
              <router-link
                :to="`/tenant/event/${item.activityId}`"
                class="text-decoration-none text-color"
              >
                {{ item.attendances }}
              </router-link>
            </div>
          </template>
          <template v-slot:firstTimers="{ item }">
            <div class="c-pointer">
              <router-link
                :to="`/tenant/event/${item.activityId}`"
                class="text-decoration-none text-color"
              >
                {{ item.firstTimers }}
              </router-link>
            </div>
          </template>

          <template v-slot:newConverts="{ item }">
            <div class="c-pointer">
              <router-link
                :to="`/tenant/event/${item.activityId}`"
                class="text-decoration-none text-color"
              >
                {{ item.newConverts }}
              </router-link>
            </div>
          </template>

          <template v-slot:approve="{ item }">
            <div class="c-pointer">
              <div
                class="spinner-border text-primary"
                style="font-size: 10px; width: 26px; height: 26px"
                role="status"
                v-show="item.approvingServiceReport"
              >
                <span class="sr-only">Loading...</span>
              </div>
              <div
                v-if="!item.approved && !item.approvingServiceReport"
                @click="approveReport(item, 1)"
              >
                <el-icon size="27">
                  <CircleCheck />
                </el-icon>
              </div>
              <video
                height="30"
                autoplay
                @click="approveReport(item, 2)"
                class="approveservicereport"
                v-if="item.approved && !item.approvingServiceReport"
              >
                <source
                  src="../../assets/check_animated.mp4"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
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
                      :to="`/tenant/report/${item.activityId}`"
                      class="text-decoration-none text-color"
                    >
                      View Report
                    </router-link>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <router-link
                      :to="`/tenant/event/${item.activityId}`"
                      class="text-decoration-none text-color"
                    >
                      Edit
                    </router-link>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <div
                      @click.prevent="showConfirmModal(item.activityId, index)"
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
        <!-- {{membersCount}} {{currentPage}} -->

        <!-- <div class="table-footer">
          <PaginationButtons
            @getcontent="getPeopleByPage"
            :itemsCount="membersCount"
            :currentPage="currentPage"
          />
        </div> -->
        <div class="d-flex justify-content-end my-3">
          <el-pagination
            v-model:current-page="serverOptions.page"
            v-model:page-size="serverOptions.rowsPerPage"
            background
            layout="total, prev, pager, next, jumper"
            :total="totalItems"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/gateway/backendapi";
import { ref, computed, inject, watch } from "vue";
import moment from "moment";
import { useStore } from "vuex";
import userService from "../../services/user/userservice";
import monthDayYear from "../../services/dates/dateformatter";
import convertNumber from "../../services/numbershortener/numberfomatter";
import PaginationButtons from "../../components/pagination/PaginationButtons.vue";
import finish from "../../services/progressbar/progress";
import Table from "@/components/table/Table";
import { ElMessage, ElMessageBox } from "element-plus";
import eventsService from "../../services/events/eventsservice";
export default {
  components: {
    PaginationButtons,
    Table,
  },
  props: ["eventList", "eventSummary",  "totalItems"],
  setup(props, { emit }) {
    const primarycolor = inject("primarycolor");
    const filterFormIsVissible = ref(false);
    const searchIsVisible = ref(false);
    const store = useStore();
    const userCurrency = ref(store.getters.currency);
    const searchText = ref("");
    const monthlyActiveBtn = ref(true);
    const totalItems = ref(props.totalItems);
    const yearlyActiveBtn = ref(false);
    const allTimeActiveBtn = ref(false);
    const searchingMember = ref(true);
    const eventHeaders = ref([
      { name: "STATUS", value: "isSent" },
      { name: "EVENT NAME", value: "eventName" },
      { name: "TITLE", value: "title" },
      { name: "DATE", value: "date" },
      { name: "ATTENDANCES", value: "attendances" },
      { name: "FIRST TIMERS", value: "firstTimers" },
      { name: "NEW CONVERTS", value: "newConverts" },
      { name: "Approve", value: "approve" },
      { name: "ACTION", value: "action" },
    ]);
    const deleteEvent = (id, index) => {
      axios
        .delete(`/api/Events/DeleteActivity?activityId=${id}`)
        .then(() => {
          ElMessage({
            type: "success",
            message: "Delete Successful",
            duration: 4000,
          });
          store.dispatch("event/removeEventItemFromStore", id);
          emit("delete-event", index);
        })
        .catch((err) => {
          finish();
          if (err.toString().toLowerCase().includes("network error")) {
            ElMessage({
              type: "info",
              message: "Please ensure you have a strong internet connection",
              duration: 4000,
            });
          } else {
            ElMessage({
              type: "error",
              message: "Delete Failed",
              duration: 4000,
            });
          }
        });
    };

    const serverOptions = ref({
      page: 1,
      rowsPerPage: 50,
    });

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
          deleteEvent(id, index);
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "Rejected",
            duration: 5000,
          });
        });
    };
    const toggleFilterFormVissibility = () => {
      filterFormIsVissible.value = !filterFormIsVissible.value;
    };
    const toggleSearch = () => {
      searchIsVisible.value = !searchIsVisible.value;
    };
    const getUserCurrency = async () => {
      const user = await userService.getCurrentUser();
      console.log(user, "user");
      userCurrency.value = user.currency;
    };
    if (!userCurrency.value) getUserCurrency();
    const filterEvents = computed(() => {
      if (searchText.value !== "") {
        return props.eventList.filter((i) => {
          return i.eventName
            .toLowerCase()
            .includes(searchText.value.toLowerCase());
        });
      } else {
        return props.eventList;
      }
    });
    const deleteMember = (id) => {
      //  delete firtimer
      axios.delete(`/api/People/DeleteOnePerson/${id}`).then((res) => {
        console.log(res);
        ElMessage({
          type: "success",
          message: "Member Deleted",
          duration: 3000,
        });
        churchMembers.value = churchMembers.value.filter(
          (item) => item.id !== id
        );
        NProgress.done();
        if (err.response.status === 400) {
          ElMessage({
            type: "error",
            message: "Unable to delete, Ensure this member is not in any group",
            duration: 5000,
          });
        } else {
          ElMessage({
            type: "error",
            message: "Unable to delete",
            duration: 3000,
          });
        }
      });
    };
    const toggleMonthlyClass = () => {
      monthlyActiveBtn.value = !monthlyActiveBtn.value;
      yearlyActiveBtn.value = false;
      allTimeActiveBtn.value = false;
    };
    const toggleYearlyClass = () => {
      yearlyActiveBtn.value = !yearlyActiveBtn.value;
      allTimeActiveBtn.value = false;
      monthlyActiveBtn.value = false;
    };
    const toggleAllTimeClass = () => {
      allTimeActiveBtn.value = !allTimeActiveBtn.value;
      yearlyActiveBtn.value = false;
      monthlyActiveBtn.value = false;
    };
    const date = (offDate) => {
      return monthDayYear.monthDayYear(offDate);
    };
    const convert = (number) => {
      return convertNumber.convertNumber(number);
    };
    const currentPage = ref(0);
    const handleSizeChange = (val) => {
      console.log(`${val} items per page`);
    };
    const handleCurrentChange = (val) => {
      console.log(`current page: ${val}`);
    };

    watch(
      serverOptions.value,
      () => {
        getPeopleByPage();
      },
      { deep: true }
    );

    const getPeopleByPage = async () => {
      // if (page < 0) return false;
      try {
        const { data } = await axios.get(
          `/api/eventreports/eventReports?page=${serverOptions.value.page}`
        );
        if (data && data.data.length > 0) {
          filterEvents.value = [];
          emit("activity-per-page", data.data);
          currentPage.value = serverOptions.value.page;
        }
      } catch (error) {
        console.log(error);
      }
    };
    const membersCount = computed(() => {
      console.log(
        props.eventSummary.activities.length,
        "checking for pagination"
      );
      if (props.eventSummary.activities.length > 50)
        return Math.ceil(props.eventSummary.activities.length / 20);
      return 1;
    });
    const searchEventInDB = () => {
      if (searchText.value !== "" && props.eventList.length > 0) {
        return props.eventList.filter((i) => {
          if (i.name)
            return i.name
              .toLowerCase()
              .includes(searchText.value.toLowerCase());
        });
      } else {
        return props.eventList;
      }
    };

    const approveReport = async (item, type) => {
      const index = filterEvents.value.findIndex(
        (i) => i.activityId == item.activityId
      );
      filterEvents.value[index].approvingServiceReport = true;
      let payload = {
        preEvent: {
          preActivityId: item.activityId,
          approved: type == 1 ? true : false,
        },
      };
      try {
        await eventsService.approveServiceReport(payload);
        if (index >= 0) {
          filterEvents.value[index].approved = type == 1 ? true : false;
        }
        filterEvents.value[index].approvingServiceReport = false;
        ElMessage({
          type: "success",
          message: `Service report ${
            type == 1 ? "approved successfully" : "unapproved"
          }`,
          duration: 5000,
        });
      } catch (err) {
        filterEvents.value[index].approvingServiceReport = false;
        console.error(err);
        ElMessage({
          type: "error",
          message: `Report not successfully approved, please try again`,
          duration: 5000,
        });
      }
    };
    return {
      // sentEvent,
      searchEventInDB,
      handleSizeChange,
      handleCurrentChange,
      filterFormIsVissible,
      serverOptions,
      searchingMember,
      toggleFilterFormVissibility,
      searchIsVisible,
      toggleSearch,
      moment,
      userCurrency,
      filterEvents,
      totalItems,
      searchText,
      showConfirmModal,
      deleteMember,
      monthlyActiveBtn,
      yearlyActiveBtn,
      allTimeActiveBtn,
      toggleMonthlyClass,
      toggleYearlyClass,
      toggleAllTimeClass,
      date,
      convert,
      getPeopleByPage,
      currentPage,
      membersCount,
      deleteEvent,
      eventHeaders,
      primarycolor,
      approveReport,
    };
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

/* .events {
  font: normal normal 800 28px Nunito sans;
}
.btn-preview {
  border: 1px solid #797e81;
  border-radius: 22px;
}
.btn-save {
  background: #136acd 0% 0% no-repeat padding-box;
  border-radius: 22px;
  color: white;
  /* border: 2px solid red; 
} */
.whole-con {
  display: flex;
  /* background: #f1f5f8; */
  /* height: 100vh; */
}

.main-con {
  width: 100%;
  height: 70%;
}

.main-body {
  height: 100%;
}

.button {
  padding: 8px 10px;
  border: none;
  border-radius: 22px;
  width: 180px;
  font-size: 16px;
  font-weight: 600;
  margin: 0 8px;
  outline: none;
  text-decoration: none;
  box-sizing: border-box;
}

.button:hover {
  cursor: pointer;
}

.add-person-btn {
  background: #136acd;
  color: #fff;
}

.btn-icon {
  padding: 0 8px;
}

.text-color {
  color: #212529;
  text-decoration: none;
}

.text-color:hover {
  color: #007bff;
}

.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}

.page-header {
  font-weight: 800;
  font-size: 40px;
}

.more-btn {
  background: #dde2e6;
}

.my-con {
  /* display: flex; */
  justify-content: space-between;
  margin: 24px 0;
}

.summary {
  /* width: 20%; */
  border-radius: 30px;
  box-shadow: 0px 3px 6px #2c28281c;
  padding: 0px 20px 0 20px;
  background: #fff;
  margin-bottom: 24px;
}

.table {
  /* box-shadow: 0px 1px 4px #02172e45; */
  border: 1px solid #dde2e6;
  border-radius: 30px;
  text-align: left;
  width: 100%;
}

.summary-header {
  margin: 0 10px;
  color: #02172e;
  opacity: 0.8;
  font-size: 26px;
  font-weight: 600;
}

.boards {
  display: flex;
}

.board {
  width: 30%;
  border-radius: 10px;
  border: 0.4000000059604645px solid #dde2e6;
  /* padding: 0 8px; */
  box-shadow: 0px 1px 4px #02172e45;
  box-shadow: 0px 1px 4px #02172e45;
  border: 1px solid #dde2e6;
}

.chart-con {
  width: 70%;
  display: flex;
  justify-content: space-evenly;
}

.board-top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
  align-items: center;
  /* box-shadow: 0px 3px 6px #2c28281c; */
  padding: 0 4px;
}

.total {
  margin-bottom: 40px;
  font-size: 37px;
}

.total-text {
  font-size: 12px;
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

.data-value {
  display: flex;
  /* padding-left: 6px; */
}

.theader {
  margin: 0;
}

.filter-options {
  height: 0;
  overflow: hidden;
  transition: all 0.5s ease-in-out;
}

.filter-options-shown {
  height: 130px !important;
  overflow: hidden;
  transition: all 0.5s ease-in-out;
}

.apply-btn {
  background: #136acd;
  color: #fff;
  border-radius: 111px;
  width: 101px;
  height: 41px;
  border: none;
  font-weight: 700;
  outline: transparent;
}

.clear-link,
.hide-link {
  color: #136acd;
}

.clear-link,
.hide-link {
  color: #136acd;
}

.table-top {
  font-weight: 800;
  font-size: 12px;
  background: #fff;
  border: 1px solid #d4dde3;
  border-bottom: none;
}

.table-top label:hover,
.table-top p:hover {
  cursor: pointer;
}

.label-search {
  width: 0;
  background: transparent;
  padding: 4px;
  overflow: hidden;
  transition: all 0.5 ease-in-out;
}

.label-search input {
  border: transparent;
  background: transparent;
  width: 70%;
  outline: none;
}

.label-search .search-btn {
  display: flex;
  align-items: center;
  background: #7894a6;
  padding: 4px;
  border-radius: 5px;
}

.label-search .empty-btn {
  display: flex;
  align-items: center;
  padding: 0 5px;
}

.show-search {
  width: 174px;
  overflow: hidden;
  border: 1px solid #dde2e6;
  border-radius: 5px 0px 0px 5px;
  background: #ebeff4;
  transition: all 0.9s cubic-bezier(0.38, 0.77, 0.2, -0.54);
}

/* .filter,
.search {
    width: 25% !important
} */
.select-all input {
  margin: 0 8px 0 -5px !important;
}

.itemroute-color {
  color: #136acd;
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
}

.more {
  background: #dde2e6;
  border-radius: 22px;
  width: 180px;
  font-weight: bold;
  border: transparent;
  outline: transparent;
  height: 42px;
}

.average {
  box-shadow: 0px 1px 4px #02172e45;
  border: 1px solid #dde2e6;
  border-radius: 30px;
  padding: 10px;
}

/* .average  */
.avg {
  font: normal normal bold 24px/32px Nunito Sans;
  letter-spacing: 0px;
  color: #136acd;
  margin-top: 1em;
}

.avg-table {
  margin-top: 1em;
  border: 1px solid #dde2e6;
  /* box-shadow: 0px 3px 6px #2c28281c; */
  /* border-radius: 10px; */
  padding: 10px;
  /* border-radius: 30px; */
}

.avg-table > div > div:first-child {
  font: normal normal 600 16px/13px Nunito Sans;
  letter-spacing: 0px;
  color: #002044;
  padding: 15px;
}

.avg-table > div > div:nth-child(2) {
  font: normal normal normal 32px/13px Nunito Sans;
  letter-spacing: 0px;
  color: #002044;
  padding: 15px;
}

.avg-table > div:nth-child(5) {
  font: normal normal normal 14px/13px Nunito Sans;
  letter-spacing: 0px;
  color: #002044;
}

.thead {
  background: #f1f3f9;
  padding: 0 25px;
  font-size: 0.7em;
}

.td-first {
  font: normal normal 800 14px/19px Nunito Sans;
  letter-spacing: 0px;
  color: #313131;
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
  background: #cecbcb70;
  padding: 7px;
  /* margin-left: 10px; */
}

.top-con {
  padding: 0px 25px;
}

.default-btn {
  border: none;
  box-shadow: 0px 3px 6px #2c28281c;
  border: 1px solid #dde2e6;
}

.active-btn {
  background: #0e74c721;
}

@media screen and (max-width: 500px) {
  .picture,
  .firstname,
  .lastname,
  .phone {
    width: 100%;
  }

  .table-body .check {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin: 10px 0;
  }

  .data-text {
    display: inline-block;
  }

  .data-row {
    flex-direction: column;
  }

  .data-con {
    /* text-align: center; */
    display: flex;
    justify-content: space-between;
  }

  .action-icon {
    width: 100%;
    text-align: right;
  }

  .table-header {
    display: none;
  }
}

@media screen and (min-width: 500px) {
  /* .picture,
  .firstname,
  .lastname,
  .phone {
    width: 19%;
  } */
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

@media screen and (max-width: 768px) {
  .filter-options-shown {
    height: 300px !important;
    overflow: hidden;
    transition: all 0.5s ease-in-out;
  }

  .mobileResponsive {
    display: block !important;
    margin: auto !important;
  }

  .monthRessponsive {
    margin: auto !important;
    transition-timing-function: ease;
  }

  .yearResponsive {
    margin: auto !important;
    margin-top: 15px !important;
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
  padding: 10px 25px;
  border-radius: 0px 0px 22px 22px;
}

@media screen and (max-width: 1399px) {
  .boards {
    /* flex-direction: column; */
    flex-wrap: wrap;
    justify-content: space-around;
  }

  .board {
    width: 45%;
    margin: 8px;
    max-height: 310px;
  }

  .board.fig {
    box-shadow: none !important;
    border: none;
  }

  .board.members-count {
    padding: 24px;
  }

  .chart-con {
    flex-direction: column;
  }

  .summary {
    border-radius: none !important;
    box-shadow: none !important;
  }

  .board.fig {
    box-shadow: none !important;
    border: none;
  }
}

@media screen and (min-width: 1400px) {
  .table {
    margin-top: 2em;
  }

  .total-text {
    font-size: 18px;
  }

  .summary {
    width: 30%;
  }

  .my-con {
    display: flex;
    flex-direction: row-reverse;
  }

  .boards {
    display: flex;
    flex-direction: column;
  }

  .board {
    width: 100%;
    margin-bottom: 22px;
    padding: 0 8px;
  }

  .board.fig {
    padding: 24px 8px 0 8px;
    border: none;
    box-shadow: none;
  }

  .board.members-count {
    width: 95% !important;
    margin: auto;
  }

  .chart-con {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .chart-con div {
    width: 100% !important;
    margin-bottom: 10px !important;
    min-height: 390px !important;
  }
}

.table-header {
  padding: 12px;
  color: black;
  box-shadow: none;
  font-size: 11px;
  font-weight: 700;
}

.table-body {
  padding: 0px;
  border-bottom: 1.5px solid #6d6d6d19;
}

.fa-ellipsis-v {
  padding: 10px;
}
</style>