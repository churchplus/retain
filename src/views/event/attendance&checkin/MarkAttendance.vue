<template>
  <div class="container-fluid">
    <el-dialog v-model="display" title="Create New Member" :width="mdAndUp || lgAndUp || xlAndUp ? `50%` : `90%`">
      <div class="row">
        <div class="col-md-8">
          <NewMember @cancel="() => display = false" @refresh="refresh" />
        </div>
      </div>
    </el-dialog>
    <!-- <Dialog
      header="Create New Member"
      v-model:visible="display"
      :style="{ width: '70vw', maxWidth: '600px' }"
      :modal="true"
      position="top"
    >
      <div class="row">
        <div class="col-md-8">
          <NewMember @cancel="() => display = false" @refresh="refresh"/>
        </div>
      </div>
    </Dialog> -->
    <div class="row my-5" :class="{ 'd-none': isKioskMode }">
      <div class="col-md-12">
        <h4 class="font-weight-bold">Manual Check-in and Checkout</h4>
        <p class="small-text">
          Checkin members by clicking on the check-in box and check-out box to checkout, search for members in group and
          use kiosk mode on mobile phones and tablets
        </p>
      </div>
    </div>
    <div class="row over-con">
      <div class="col-md-12 py-4">
        <div class="row">
          <div class="col-md-8">
            <el-input v-model="searchText" class="w-100 m-md-2" placeholder="Search" :prefix-icon="Search" v-if="groupDetail && groupDetail.peopoleAttendancesDTOs && groupDetail.peopoleAttendancesDTOs.length > 0 && !attendanceTableLoading" />
            <!-- <p class="search-span px-2">
              <i class="pi pi-search p-2" style="height: 30px; width: 30px"></i>
              <input
                type="text"
                class="search-control"
                placeholder="Search"
                v-model="searchText"
              />
            </p> -->
          </div>
          <div class="col-md-4">
            <!-- <el-button round size="large" class=" kiosk-mode mt-2 " @click="enterKioskMode">
              {{ kioskButtonText }} kiosk mode
            </el-button> -->
            <transition name="el-fade-in-linear">
              <div
                v-show="marked.length > 0 && groupDetail && groupDetail.peopoleAttendancesDTOs && groupDetail.peopoleAttendancesDTOs.length > 0"
                class="transition-box">
                <el-dropdown trigger="click" class="mt-2 w-100">
                  <span class="el-dropdown-link w-100">
                    <div class="d-flex justify-content-between border-contribution" size="large">
                      <div>
                        {{ selectedCheckinoption ? selectedCheckinoption : 'Check members in/out' }}
                      </div>
                      <div>
                        <el-icon class="el-icon--right">
                          <arrow-down />
                        </el-icon>
                      </div>
                    </div>
                  </span>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item v-for="(item, index) in checkinoption" :key="index"
                        @click="checkinAllMembers(index)">
                        {{ item }}
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </div>
            </transition>
          </div>
        </div>

        <!-- <div class="row mt-4 main-th font-weight-700 py-2 grey-rounded-bg" :class="{ 'kiosk-th-size': isKioskMode }">

          <div class="col-md-2" :class="{ 'order-3': isKioskMode }">Name</div>
          <div class="col-md-2" :class="{ 'order-4': isKioskMode }">Phone</div>
          <div class="col-md-2" :class="{ 'order-5': isKioskMode }">Registered</div>


          <div class="col-md-2 d-none" :class="{ 'd-flex order-2': isKioskMode }">
            Picture
          </div>
          
          <div class="col-md-2" :class="{ 'order-1': isKioskMode }">
            Check in
            <div><el-checkbox class="custom-checkbox"  /> Select all</div>
          </div>
          <div class="col-md-2" :class="{ 'd-none': isKioskMode }">
            Check out
            <div><el-checkbox class="custom-checkbox"  /> Select all</div>
          </div>
          <div class="col-md-2" :class="{ 'd-none': isKioskMode }">
            Action
          </div>


        </div> -->

        <div class="row pt-2" :class="{ 'kiosk-tb-size': isKioskMode }">
          <Suspense>
            <template #default>
              <div class="w-100">
                <!-- <TableData :isKiosk="isKioskMode" @refreshed="refreshed" :fetchUsers="fetchUsers"
                  :attendanceId="attendanceID" :searchText="searchText" /> -->
                <Table :data="listOfPeople" :headers="attendanceHeader" :checkMultipleItem="true"
                  @checkedrow="handleSelectionChange" v-loading="attendanceTableLoading"
                  v-if="groupDetail && groupDetail.peopoleAttendancesDTOs && groupDetail.peopoleAttendancesDTOs.length > 0">
                  <template v-slot:name="{ item }">
                    <div class="c-pointer">{{ item.name }}</div>
                  </template>
                  <template v-slot:phone="{ item }">
                    <div class="c-pointer">{{ item.phone }}</div>
                  </template>
                  <template v-slot:isRegistered="{ item }">
                    {{ item.isRegistered ? "Yes" : "No" }}
                    <!-- <div class="c-pointer">{{ item.isRegistered }}</div> -->
                  </template>
                  <template v-slot:isPresent="{ item }">
                    <el-checkbox class="custom-checkbox" v-model="item.isPresent" @change="checkin($event, 1, item)"
                      :disabled="checking" />
                    <!-- <div class="c-pointer">{{ item.isPresent }}</div> -->
                  </template>
                  <template v-slot:isCheckedOut="{ item }">
                    <el-checkbox class="custom-checkbox" v-model="item.isCheckedOut" @change="checkin($event, 2, item)"
                      :disabled="checking" />
                    <!-- <div class="c-pointer">{{ item.isCheckedOut }}</div> -->
                  </template>
                  <template v-slot:action="{ item }">
                    <div class="text-decoration-none" @click="showConfirmModal(item)">
                      <el-icon class="text-danger">
                        <Delete />
                      </el-icon>
                    </div>
                  </template>
                </Table>
                <div class="row pb-4" v-if="listOfPeople.length === 0 && !attendanceTableLoading">
                  <div class="col-md-12 text-center">
                    <p class="my-2">No records found</p>
                  </div>
                  <div class="col-md-12 d-flex justify-content-center">
                    <el-button class=" border-0 text-white" :color="primarycolor" data-toggle="modal"
                      data-target="#exampleModal" size="large" round>
                      Add member
                    </el-button>
                  </div> 
                  </div>
                  <AttendanceCheckinUpdate :contributionItems="contributionItems" :attendanceType="attendanceType"
                    :groupDetail="groupDetail" />
                </div>
            </template>
            <template #fallback>
              <div class="row">
                <!-- <div class="col-md-12 pl-4">Loading...</div> -->
                <el-icon class="is-loading">
                  <Loading />
                </el-icon>
              </div>
            </template>
          </Suspense>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
          aria-hidden="true">
          <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title font-weight-bold" id="exampleModalLabel">
                  Add Member
                </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close" ref="close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="row my-4">
                  <div class="col-md-4 text-md-right">
                    <label for="" class="font-weight-600">Name</label>
                  </div>
                  <div class="col-md-7">
                    <div class="dropdown">

                      <input type="text" class="form-control" id="dropdownMenuButton" data-toggle="dropdown"
                        v-model="userSearchString" @input="searchForUsers" />
                      <div class="dropdown-menu w-100" aria-labelledby="dropdownMenuButton">
                        <div class="row w-100 mx-auto" v-if="false">
                          <div class="col-md-12">
                            <el-input type="text" class="w-100" placeholder="Find event" />
                          </div>
                        </div>

                        <a class="dropdown-item font-weight-700 small-text"
                          v-for="(member, index) in searchedMembers" :key="index" @click="addExistingMember(member)">{{
                            member.name }}</a>
                        <a class="dropdown-item font-weight-700 small-text" href="#" v-if="searchingForMembers && searchedMembers.length === 0
                          ">
                          <el-icon class="is-loading ">
                            <Loading />
                          </el-icon>
                        </a>
                        <p class="modal-promt pl-1 bg-secondary m-0" v-if="userSearchString.length < 3 &&
                          searchedMembers.length === 0
                          ">
                          Enter 3 or more characters
                        </p>
                        <a class="font-weight-bold small-text d-flex justify-content-center py-2 text-decoration-none primary--text c-pointer"
                          style="border-top: 1px solid #002044; color: #136acd" @click="showAddMemberForm"
                          data-dismiss="modal">
                          <el-icon size="large" class="mr-2 primary-text d-flex align-items-center">
                            <CirclePlus />
                          </el-icon>
                          <!-- <i
                            class="pi pi-plus-circle mr-2 primary-text d-flex align-items-center"
                            style="color: #136acd"
                          ></i> -->
                          Add new member
                        </a>
                      </div>
                    </div>

                    <div class="row mt-4">
                      <div class="col-md-6 d-md-flex justify-content-end">
                        <el-button class="secondary-button" round data-dismiss="modal">Cancel</el-button>
                      </div>
                      <div class="col-md-6">
                        <el-button round :loading="loading" class="text-white" :color="primarycolor" data-dismiss="modal"
                          @click="sendExistingUser">
                          Save
                        </el-button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, inject } from "vue";
import { useRoute } from "vue-router";
import { Search } from '@element-plus/icons-vue'
import NewMember from "../../../views/event/attendance&checkin/NewMember";
import TableData from "../../../components/attendance/EventAttendanceList";
import membershipService from "../../../services/membership/membershipservice";
import attendanceservice from '../../../services/attendance/attendanceservice';
import AttendanceCheckinUpdate from "../../../components/attendance/updateAttendanceChekin.vue"
import deviceBreakpoint from "../../../mixins/deviceBreakpoint";
import axios from "@/gateway/backendapi";
import { ElMessage, ElMessageBox } from "element-plus";
import Table from "@/components/table/Table"

export default {
  props: ["attendanceID"],
  components: {
    NewMember,
    TableData,
    AttendanceCheckinUpdate,
    Table
  },
  setup() {
    const { mdAndUp, lgAndUp, xlAndUp, xsOnly } = deviceBreakpoint()
    const primarycolor = inject('primarycolor')
    const isKioskMode = ref(false);
    const route = useRoute();
    const display = ref(false);
    const searchingForMembers = ref(false);
    const searchText = ref("");
    const fetchUsers = ref(false);
    const contributionItems = ref([]);
    const attendanceType = ref([]);
    const groupDetail = ref({});
    const loading = ref(false);
    const attendanceTableLoading = ref(false);
    const checking = ref(false);
    const attendanceHeader = ref([
      { name: 'NAME', value: 'name' },
      { name: 'Phone', value: 'phone' },
      { name: 'Registered', value: 'isRegistered' },
      { name: 'Checkin', value: 'isPresent' },
      { name: 'Checkout', value: 'isCheckedOut' },
      { name: 'Action', value: 'action' },
    ])
    const marked = ref([]);
    const checkinoption = ref(['Checkin all group members', 'Checkout all group members']);
    const selectedCheckinoption = ref("");
    const close = ref(null);

    const enterKioskMode = () => {
      isKioskMode.value = !isKioskMode.value;
      route.query.mode = "kiosk";
    };

    const kioskButtonText = computed(() => {
      return isKioskMode.value ? "Exit" : "Launch";
    });

    const showAddMemberForm = () => {
      display.value = true;
    };

    const searchedMembers = ref([]);

    const userSearchString = ref("");
    const searchForUsers = () => {
      if (userSearchString.value.length >= 3) {
        startSearch(userSearchString.value);
      }
    };

    const startSearch = async (str) => {
      try {
        searchingForMembers.value = true;
        const response = await membershipService.searchMembers(str);
        searchingForMembers.value = false;
        searchedMembers.value = response;
      } catch (error) {
        searchingForMembers.value = false;
        console.log(error);
      }
    };

    const personData = ref({});
    const addExistingMember = (member) => {
      userSearchString.value = member.name;
      personData.value = {
        person: {
          personId: member.id
        },
        checkInChannel: 0,
        checkInAttendanceID: route.query.id
      }
      console.log(personData);
    }

    const sendExistingUser = async () => {
      loading.value = true
      try {
        const response = await attendanceservice.checkin(personData.value);
        loading.value = false
        if (response) {
          searchText.value = "";
          ElMessage({
            type: "success",
            message: "Member added to this group and checkin was successful",
            duration: 5000,
          });
          getGroupDetails();
          console.log(close.value);
          close.value.click();
        } else {
          ElMessage({
            type: "error",
            message: "Checkin was not successful",
            duration: 5000,
          });
        }
      } catch (err) {
        loading.value = false
        console.err(err)
      }
    }

    const refresh = () => {
      searchText.value = "";
      fetchUsers.value = true;
    }

    const refreshed = () => {
      fetchUsers.value = false;
    }

    const getContributionsItem = async () => {
      try {
        let { data } = await axios.get("/api/Financials/Contributions/Items")
        contributionItems.value = data
      }
      catch (err) {
        console.log(err)
      }
    }
    getContributionsItem()

    const getAttendanceType = async () => {
      try {
        let { data } = await axios.get("/GetAttendanceType")
        attendanceType.value = data
      }
      catch (err) {
        console.log(err)
      }
    }
    getAttendanceType()

    const getGroupDetails = async () => {
      attendanceTableLoading.value = true
      try {
        let data = await attendanceservice.getReport(route.query.id)
        groupDetail.value = data
        console.log(data, 'reaching');
        attendanceTableLoading.value = false
      }
      catch (err) {
        attendanceTableLoading.value = false
        console.log(err)
      }
    }
    getGroupDetails()

    const listOfPeople = computed(() => {
      if (groupDetail.value && groupDetail.value.peopoleAttendancesDTOs && groupDetail.value.peopoleAttendancesDTOs.length > 0 && !searchText.value) return groupDetail.value.peopoleAttendancesDTOs;
      if (groupDetail.value && groupDetail.value.peopoleAttendancesDTOs && groupDetail.value.peopoleAttendancesDTOs.length > 0 && searchText.value) return groupDetail.value.peopoleAttendancesDTOs.filter(i => i.name.toLowerCase().includes(searchText.value.toLowerCase()))
      return []
    })

    const handleSelectionChange = (val) => {
      console.log(val);
      marked.value = val
    }

    const checkin = async (e, option, item) => {
      console.log(option, "hhjjjjj");
      let response = {};
      if (option === 1) {
        try {
          response = await attendanceservice.checkin({
            checkInAttendanceID: item.attendanceID,
            personAttendanceID: item.id,
          });
          ElMessage({
            type: `${e ? "success" : "info"}`,
            message: `${e ? "Checked" : "Unchecked"} Successfully, member marked ${e ? "present" : "absent"}`,
            duration: 5000,
          });
        } catch (error) {
          console.log(error)
          ElMessage({
            type: "error",
            message: "Checkin was not successfulll",
            duration: 5000,
          });
        }
      } else {
        try {
          checking.value = true;
          response = await attendanceservice.checkout({
            checkInAttendanceID: item.attendanceID,
            personAttendanceID: item.id,
          });
          checking.value = false;

          if (response.trim() === "User Was Not Checked In Earlier") {
            ElMessage({
              type: "info",
              message: response,
              duration: 5000,
            });
          } else {
            ElMessage({
              type: `${e ? "success" : "info"}`,
              message: `${response} , Member has ${e ? "checked out" : "not checked out"}`,
              duration: 5000,
            });
          }
        } catch (error) {
          console.log(error)
          checking.value = false;
          ElMessage({
            type: "error",
            message: "Checkin was not successful",
            duration: 5000,
          });
        }
      }
      console.log(response, "rrr");
    };

    const showConfirmModal = (item) => {
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
          deleteCheckinAttendance(item);
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "Rejected",
            duration: 5000,
          });
        });
    };

    const deleteCheckinAttendance = (item) => {
      axios
        .delete(`/api/CheckInAttendance/DeletePersonEventAttendance?id=${item.id}&checkInAttendanceId=${item.attendanceID}`)
        .then((res) => {
          if (res.data) {
            ElMessage({
              type: "success",
              message: "CheckIn attendance Deleted",
              duration: 5000,
            });
            groupDetail.value.peopoleAttendancesDTOs = groupDetail.value.peopoleAttendancesDTOs.filter(i => i.id !== item.id)
          } else {
            ElMessage({
              type: "warning",
              message: "Delete Failed, Please Try Again",
              duration: 5000,
            });
          }
        })
        .catch((err) => {
          console.log(err)
          finish();
          ElMessage({
            type: "error",
            message: "Delete Failed, Please Try Again",
            duration: 5000,
          });
          // }
        });
    };

    const checkinAllMembers = async (index) => {
      index == 0 ? selectedCheckinoption.value = "Checkin all members" : selectedCheckinoption.value = "Checkout all members"
      attendanceTableLoading.value = true
      try {
        await attendanceservice.checkinAllMembers({
          checkInAttendanceID: route.query.id,
          checkin: index == 0 ? true : false,
          personAttendanceIDs: marked.value.map(i => i.id),
        });
        getGroupDetails()
        ElMessage({
          type: "success",
          message: `${index == 0 ? 'All members successfully checked in' : 'All members successfully checked out'}`,
          duration: 5000,
        });
      }
      catch (err) {
        attendanceTableLoading.value = false
        console.log(err);
      }
    }

    return {
      mdAndUp,
      lgAndUp,
      xlAndUp,
      xsOnly,
      primarycolor,
      isKioskMode,
      enterKioskMode,
      kioskButtonText,
      display,
      showAddMemberForm,
      searchForUsers,
      userSearchString,
      searchedMembers,
      searchingForMembers,
      searchText,
      addExistingMember,
      sendExistingUser,
      refresh,
      fetchUsers,
      refreshed,
      contributionItems,
      attendanceType,
      Search,
      groupDetail,
      loading,
      attendanceHeader,
      handleSelectionChange,
      attendanceTableLoading,
      checkin,
      checking,
      showConfirmModal,
      checkinAllMembers,
      marked,
      checkinoption,
      selectedCheckinoption,
      listOfPeople,
      close
    };
  },
};
</script>

<style scoped>
* {
  color: #02172e;
  /* font-family: Nunito Sans !important; */
}

.hide {
  display: none !important;
}

@media screen and (max-width: 767px) {
  .main-th {
    display: none;
  }

  .hide {
    display: flex !important;
  }
}

.search-control {
  width: calc(100% - 30px);
  padding: 0.38rem;
  border: none;
  background: transparent;
  outline: transparent;
}

.search-span {
  background: #f5f8f9;
  border-radius: 200px;
  width: 100%;
}

.kiosk-mode {
  background: #dde2e6;
  border-radius: 20px;
  border: transparent;
}

.main-th {
  background: #f5f8f9;
  border: 1px solid #4762f01f;
}

.tb-row {
  border-bottom: 1px solid #4762f01f;
}

.over-con {
  border: 1px solid #4762f01f;
}

.kiosk-th-size {
  font-size: 20px;
}

.kiosk-tb-size {
  font-size: 18px;
}

.modal-lg {
  max-width: 600px;
}
</style>