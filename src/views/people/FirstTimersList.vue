<template>
  <div>
    <div class="my-con">
      <div>
        <FirstTimersChartArea @firsttimers="setFirsttimer" @totalfirstimer="setTotalFirstTimer" />
      </div>
      <div class="table-top p-3 mt-5">
        <div class="d-flex flex-column flex-sm-row justify-content-sm-between">
          <div>
            <el-tooltip class="box-item" effect="dark" v-if="false" content="Delete member(s)" placement="top-start">
              <el-icon :size="20" class=" c-pointer" v-if="checkedFirstTimer.length > 0" @click="showConfirmModal1">
                <Delete />
              </el-icon>
            </el-tooltip>
            <el-tooltip class="box-item" effect="dark" v-if="checkedFirstTimer.length > 0" content="Send SMS"
              placement="top-start">
              <img src="../../assets/sms.png" style="width: 20px; margin-top: -10px" class="ml-2 c-pointer"
                @click="sendMarkedMemberSms" alt="Send SMS" />
            </el-tooltip>
            <el-tooltip class="box-item" effect="dark" v-if="checkedFirstTimer.length > 0" content="Send Email"
              placement="top-start">
              <el-icon :size="20" class="ml-2 c-pointer" v-if="checkedFirstTimer.length > 0"
                @click="sendMarkedMemberEmail">
                <Message />
              </el-icon>
            </el-tooltip>
          </div>
          <div class="d-flex flex-column flex-sm-row justify-content-sm-between">
            <div>
              <p @click="toggleFilterFormVissibility" class="mb-0 mr-3 d-flex my-3 my-sm-0 c-pointer">
                <el-icon :size="13">
                  <Filter />
                </el-icon>
                <span class="ml-1"> FILTER</span>
              </p>
            </div>
            <el-input size="small" v-model="searchText" placeholder="Search..." @input="searchingMember = true" @keyup.enter.prevent="searchMemberInDB"
              class="input-with-select">
              <template #suffix>
              <el-button style="padding: 5px; height: 22px;" @click.prevent="searchText = ''">
                <el-icon :size="13">
                  <Close />
                </el-icon>
              </el-button>
            </template>
              <template #append>
                <el-button @click.prevent="searchMemberInDB">
                  <el-icon :size="13">
                    <Search />
                  </el-icon>
                </el-button>
              </template>
            </el-input>
          </div>
        </div>
      </div>
      <div class="filter-options" :class="{ 'filter-options-shown': filterFormIsVissible }">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-9">
              <div class="row">
                <div class="
                      col-12 col-sm-6
                      offset-sm-3 offset-md-0
                      form-group
                      inp
                      w-100
                    ">
                  <el-input placeholder="First name" class="w-100" v-model="filter.name" />
                </div>
                <div class="col-12 col-sm-6 form-group d-none d-md-block">
                  <el-input placeholder="Phone number" class="w-100" v-model="filter.phoneNumber" />
                </div>
              </div>
            </div>

            <div class="col-md-3 d-flex flex-column align-items-center">
              <el-button :color="primarycolor" @click="applyFilter" :loading="applyLoading" :disabled="disableBtn"
                round>Apply</el-button>
              <span class="mt-2">
                <el-button @click="clearAll" class="mr-2" text>Clear all</el-button>
                <el-button @click="hide" class="mx-2" text>Hide</el-button>
              </span>
            </div>
          </div>
        </div>
      </div>
      <Table :data="searchMember" :headers="firstTimerHeaders" :checkMultipleItem="true"
        @checkedrow="handleSelectionChange" v-loading="paginatedTableLoading" v-if="searchMember.length > 0">
        <template #imageURL="{ item }">
          <el-card shadow="hover" class="c-pointer person-image" v-if="item.imageURL"
            style="border-radius: 50%; height: 26px; width: 26px;">
            <el-tooltip class="box-item" effect="dark" content="Click to view" placement="top-start">
              <img :src="item.imageURL" alt="" @click="(selectedImage = item), (imageDialog = true)"
                style="border-radius: 50%; height: 26px; width: 26px; object-fit: cover" />
            </el-tooltip>
          </el-card>
          <el-avatar :size="25" v-else><el-icon color="#000000">
              <UserFilled />
            </el-icon>
          </el-avatar>
        </template>
        <template v-slot:fullName="{ item }">
          <div @click="showMemberRow(item)" class="c-pointer">{{ item.firstName }} {{ item.lastName }}</div>
        </template>
        <template v-slot:phoneNumber="{ item }">
          <div @click="showMemberRow(item)" class="c-pointer">{{ item.phoneNumber }}</div>
        </template>
        <template v-slot:howDidYouAboutUsName="{ item }">
          <div @click="showMemberRow(item)" class="c-pointer">{{ item.howDidYouAboutUsName }}</div>
        </template>
        <template v-slot:interestedInJoining="{ item }">
          <div @click="showMemberRow(item)" class="c-pointer">{{ item.interestedInJoining }}</div>
        </template>
        <template v-slot:date="{ item }">
          <div @click="showMemberRow(item)" class="c-pointer">{{ formatDate(item.date) }}</div>
        </template>
        <!-- <template v-slot:date="{ item }">
          <div @click="showMemberRow(item)" class="c-pointer">{{ moment
            .parseZone(
              new Date(item.date).toDateString(),
              "YYYY MM DD HH ZZ"
            )
            ._i.substr(4, 11).replaceAll(" ", "_") }}</div>
        </template> -->
        <template v-slot:movement="{ item }">
          <div @click="showMemberRow(item)" class="c-pointer">{{ item.movement }}</div>
        </template>
        <template v-slot:interactions="{ item }">
          <div @click="showMemberRow(item)" class="c-pointer">{{ item.interactions }}</div>
        </template>
        <template v-slot:action="{ item }">
          <div>
            <div class="dropdown">
              <el-icon data-toggle="dropdown" aria-expanded="false">
                <MoreFilled />
              </el-icon>
              <ul class="dropdown-menu">
                <li class="dropdown-item"><a>
                    <router-link :to="
                      item.phoneNumber
                        ? `/tenant/sms/compose?phone=${item.phoneNumber}`
                        : ''
                    " :class="{ 'fade-text': !item.phoneNumber, 'text-color': item.phoneNumber }">Send
                      SMS</router-link>
                  </a></li>
                <li><a class="dropdown-item" href="#">
                    <router-link :to="
                      item.email
                        ? `/tenant/email/compose?phone=${item.email}`
                        : ''
                    " :class="{ 'fade-text': !item.email, 'text-color': item.email }">Send Email</router-link>
                  </a></li>
                <li><a class="dropdown-item" href="#">
                    <router-link :to="`/tenant/firsttimermanagement/${item.id}?memberType=0`" class="text-color">
                      Follow Up
                    </router-link>
                  </a></li>
                <li><a class="dropdown-item">
                    <el-popover placement="top-start" :width="200" trigger="hover">
                      <template #reference>
                        <span class="el-dropdown-link">
                          Convert to member<el-icon class="el-icon--right"><arrow-down /></el-icon>
                        </span>
                      </template>
                      <el-icon v-if="(membershipCategory.length == 0)" class="is-loading" :size="20">
                        <Loading />
                      </el-icon>
                      <div v-for="i in membershipCategory" :key="i.id">
                        <div class="dropdown-item px-0 c-pointer" @click="chooseCategory(item.id, i.id)">{{ i.name }}
                        </div>
                      </div>
                    </el-popover>
                  </a></li>
                <li><a class="dropdown-item" href="#">
                    <div @click.prevent="showConfirmModal(item.id, index)" class="text-color">Delete</div>
                  </a></li>
              </ul>
            </div>
          </div>
        </template>
      </Table>
      <div v-if="searchMember.length == 0">
      <el-alert
        title="First Timer not found"
        type="warning"
        description="Try searching with another keyword"
        show-icon
        center
      />
    </div>
      <div class="d-flex justify-content-end my-3">
        <el-pagination v-model:current-page="serverOptions.page" v-model:page-size="serverOptions.rowsPerPage" background
          layout="total, sizes, prev, pager, next, jumper" :total="totalItems" @size-change="handleSizeChange"
          @current-change="handleCurrentChange" />
      </div>
    </div>

    <el-dialog v-model="imageDialog" :width="mdAndUp || lgAndUp || xlAndUp ? `50%` : xsOnly ? `90%` : `70%`" align-center>
      <el-image class="w-100" :src="selectedImageUrl" fit="contain" />
      <template #footer>
        <span class="dialog-footer">
          <el-button :color="primarycolor" @click="imageDialog = false" round>
            Done
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>

  <el-drawer v-model="showSMS" :size="mdAndUp || lgAndUp || xlAndUp ? '70%' : '100%'" direction="rtl">
    <template #header>
      <h4>Send SMS</h4>
    </template>
    <template #default>
      <div>
        <smsComponent :phoneNumbers="contacts" @closesidemodal="() => showSMS = false" />
      </div>
    </template>
  </el-drawer>

  <el-drawer v-model="showEmail" :size="mdAndUp || lgAndUp || xlAndUp ? '70%' : '100%'" direction="rtl">
    <template #header>
      <h4>Send Email</h4>
    </template>
    <template #default>
      <div>
        <emailComponent :selectedGroupMembers="markedFirsttimers" @closesidemodal="() => showEmail = false" />
      </div>
    </template>
  </el-drawer>


  <!-- <SideBar :show="showSMS" :title="'Compose SMS'" @closesidemodal="() => showSMS = false">
    <div class="m-wrapper" :class="{ 'm-wrapper': showSMS, 'no-show': !showSMS }">
      <smsComponent :phoneNumbers="contacts" @closesidemodal="() => showSMS = false" />
    </div>
  </SideBar>
  <SideBar :show="showEmail" :title="'Compose Email'" @closesidemodal="() => showEmail = false">
    <div class="m-wrapper2">
      <emailComponent :selectedGroupMembers="markedFirsttimers" @closesidemodal="() => showEmail = false" />
    </div>
  </SideBar> -->
</template>

<script>
import { ref, computed, watch, watchEffect, inject } from "vue";
import SideBar from "../groups/sidemodal/SideModal.vue";
import smsComponent from "../groups/component/smsComponent.vue";
import emailComponent from "../groups/component/emailComponent.vue";
import FirstTimersChartArea from "./FirstTimersChartArea.vue"
import axios from "@/gateway/backendapi";
import { useRoute } from "vue-router";
import dateFormatter from "../../services/dates/dateformatter";
import moment from "moment";
import stopProgressBar from "../../services/progressbar/progress";
import { useStore } from 'vuex'
import { ElMessage, ElMessageBox } from 'element-plus'
import router from "../../router";
import deviceBreakpoint from "../../mixins/deviceBreakpoint";
import Table from "@/components/table/Table"

export default {
  props: [ 'firstTimersList', 'totalItems' ],
  components: {
    FirstTimersChartArea,
    smsComponent,
    emailComponent,
    SideBar,
    Table
  },

  setup(props, { emit }) {
    const store = useStore()
    const primarycolor = inject('primarycolor')
    const churchMembers = ref([]);
    const filter = ref({});
    const searchIsVisible = ref(false);
    const filterResult = ref([]);
    const markedFirsttimers = ref([]);
    const searchText = ref("");
    const membershipCategory = ref([]);
    const contacts = ref([]);
    const tenantID = ref("")
    const selectedLink = ref(null)
    const totalFirstTimer = ref("")
    const totalItems = ref(props.totalItems)
    const showSMS = ref(false)
    const showEmail = ref(false)
    const paginatedTableLoading = ref(false)
    const selectedImageUrl = ref("")
    const imageDialog = ref(false)
    const { xsOnly, mdAndUp, lgAndUp, xlAndUp } = deviceBreakpoint()
    const applyLoading = ref(false)
    const searchingMember = ref(true)

    const route = useRoute();
    const filterFormIsVissible = ref(false);
    const toggleFilterFormVissibility = () =>
      (filterFormIsVissible.value = !filterFormIsVissible.value);

    const toggleSearch = () => {
      searchIsVisible.value = !searchIsVisible.value;
    };

    const firstTimerHeaders = ref([
      { name: 'PICTURE', value: 'imageURL' },
      { name: 'FULLNAME', value: 'fullName' },
      { name: 'PHONE', value: 'phoneNumber' },
      { name: 'SOURCE', value: 'howDidYouAboutUsName' },
      { name: 'INTERESTED', value: 'interestedInJoining' },
      { name: 'DATE', value: 'date' },
      { name: 'MOVEMENT', value: 'movement' },
      { name: 'INTERACTION', value: 'interactions' },
      { name: 'ACTION', value: 'action' },
    ])

    const serverOptions = ref({
      page: 1,
      rowsPerPage: 50,
    });


    watch(serverOptions.value, () => {
      getPeopleByPage();
    },
      { deep: true }
    );

    const getPeopleByPage = async () => {
      paginatedTableLoading.value = true
      try {
        const { data } = await axios.get(
          `/api/People/GetAllFirstTimers?page=${serverOptions.value.page}`
          // `/api/people/getPaginatedFirstTimer?page=${serverOptions.value.page}`
        );
        if(data && data.response.data.length > 0 ) {
          churchMembers.value = data.response.data;
        }else{
          ElMessage({
              type: 'warning',
              message: "Page not Found, Pls Go back to the Previous one",
              duration: 5000
            })
        }  
        paginatedTableLoading.value = false
      } catch (error) {
        paginatedTableLoading.value = false
        console.log(error);
      }
    };
    const handleSelectionChange = (val) => {
      checkedFirstTimer.value = val
    }

    const handleSizeChange = (val) => {
      console.log(`${val} items per page`)
    }
    const handleCurrentChange = (val) => {
      console.log(`current page: ${val}`)
    }


    const showMemberRow = (item) => {
      router.push(`/tenant/firsttimermanagement/${item.id}?memberType=0`)
    }

    const totalFirsttimersCount = computed(() => {
      if (
        !totalFirstTimer.value
      //  !totalItems.value
      )
        return 0;
      return totalFirstTimer.value;
      // return totalItems.value;
    });

    const deleteMember = (id) => {
      axios
        .delete(`/api/People/DeleteOnePerson/${id}`)
        .then(() => {
          ElMessage({
            type: 'success',
            showClose: true,
            message: "Member deleted successfully",
            duration: 5000
          })
          churchMembers.value = churchMembers.value.filter(
            (item) => item.id !== id
          );
          store.dispatch('membership/removeFirstTimerFromStore', id)
          store.dispatch('dashboard/getDashboard');
        })
        .catch((err) => {
          /eslint no-undef: "warn"/
          NProgress.done();
          if (err.response.status === 400) {
            ElMessage({
              type: 'success',
              showClose: true,
              message: "Unable to delete, Ensure this member is not in any group",
              duration: 5000
            })
          } else {
            ElMessage({
              type: 'success',
              showClose: true,
              message: "Unable to delete, an error occured,please try again",
              duration: 5000
            })
          }
        });
    };

    const showConfirmModal = (id, index) => {
      ElMessageBox.confirm(
        'Are you sure you want to proceed?',
        'Confirm delete',
        {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'error',
        }
      )
        .then(() => {
          deleteMember(id, index);
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: 'Delete canceled',
          })
        })
    };


    watchEffect(() => {
      if (props.firstTimersList) {
        churchMembers.value = props.firstTimersList
      }
    })

    const applyFilter = () => {
      applyLoading.value = true
      filter.value.name =
        filter.value.name == undefined ? "" : filter.value.name;
      filter.value.phoneNumber =
        filter.value.phoneNumber == undefined ? "" : filter.value.phoneNumber;

      let url =
        "/api/People/FilterFirstTimers?firstname=" +
        filter.value.name +
        "&lastname=" +
        filter.value.name +
        "&phone_number=" +
        filter.value.phoneNumber +
        "&page=1";
      axios
        .get(url)
        .then((res) => {
          // noRecords.value = true;
          filterResult.value = res.data;
          applyLoading.value = false
        })
        .catch((err) => (console.log(err)), (applyLoading.value = false));
    };

    const searchNamesInDB = ref([]);
    const searchMemberInDB = () => {
      searchingMember.value = true
      paginatedTableLoading.value = true
      let url = `/api/People/FilterFirstTimers?firstname=${searchText.value}&&phone_number=${searchText.value}`
      axios
      .get(url)
      .then((res) => {
        searchingMember.value = false
        paginatedTableLoading.value = false
        searchNamesInDB.value = res.data;
        if (res.data.length === 0) {
          ElMessage({
            type: 'warning',
            message: `${searchText.value} not found, please to try add a new firsttimer and search again`,
            duration: 5000
          })
        }
      })
      .catch((err) => {
        console.log(err);
        searchingMember.value = false
          paginatedTableLoading.value = false
        });
    };

    const listOfFirsttimers = computed(() => {
      if (searchText.value !== "") return searchNamesInDB.value;
      return churchMembers.value;
    });
    // Tosin

    const searchMember = computed(() => {
      if (searchText.value !== "" && searchNamesInDB.value.length > 0) {
        return searchNamesInDB.value;
      } else if (searchNamesInDB.value.length == 0 && searchText.value !== "" && !paginatedTableLoading.value && !searchingMember.value) {
        return []
      } else if (filterResult.value.length > 0 && (filter.value.name || filter.value.phoneNumber)) {
        return filterResult.value;
      } else {
        return churchMembers.value;
      }
    });

    const hide = () => {
      filterFormIsVissible.value = false;
    };

    const disableBtn = computed(() => {
      if (!filter.value.name && !filter.value.phoneNumber) return true;
      return false;
    });

    const membersCount = computed(() => {
      if (totalFirstTimer.value > 100)
        return Math.ceil(totalFirstTimer.value / 100);
      return 1;
    });

    const formatDate = (date) => {
      return dateFormatter.monthDayYear(date);
    };

    const clearInput = () => {
      searchText.value = "";
    };

    const clearAll = () => {
      filter.value.name = "";
      filter.value.phoneNumber = "";
    };

    // function to checkmark a single first timer
    const checkedFirstTimer = ref([]);

    const check1item = (ft) => {
      const firstTimerIdx = checkedFirstTimer.value.findIndex(
        (i) => i.id === ft.id
      );
      if (firstTimerIdx < 0) {
        checkedFirstTimer.value.push(ft);
      } else {
        checkedFirstTimer.value.splice(firstTimerIdx, 1);
      }
    };

    // function to check all first timer
    const markAllFirsttimer = () => {
      if (checkedFirstTimer.value.length < churchMembers.value.length) {
        churchMembers.value.forEach((i) => {
          const ftInMarked = checkedFirstTimer.value.findIndex(
            (f) => f.id === i.id
          );
          if (ftInMarked < 0) {
            checkedFirstTimer.value.push(i);
          }
        });
      } else {
        checkedFirstTimer.value = [];
      }
    };

    // Function to delete first timer
    const convert = (x) => {
      return x.map((i) => i.id);
    };
    const deleteMessage = ref("");
    const display = ref(false);
    const deleteFirstTimer = () => {
      let dft = convert(checkedFirstTimer.value);
      axios
        .post(`/api/People/DeletePeople`, dft)
        .then((res) => {
          let incomingRes = res.data.response;
          if (incomingRes.toString().toLowerCase().includes("all")) {
            ElMessage({
              type: 'success',
              showClose: true,
              message: "First Timer(s) deleted successfully.",
              duration: 5000
            })
            churchMembers.value = churchMembers.value.filter((item) => {
              const y = checkedFirstTimer.value.findIndex(
                (i) => i.id === item.id
              );
              if (y >= 0) return false;
              return true;
            });
          } else {
            let resArr = incomingRes.split("@");
            ElMessage({
              type: 'info',
              showClose: true,
              message: resArr[0],
              duration: 5000
            })

            if (resArr[1] !== "") {
              if (!resArr[1].includes(",")) {
                churchMembers.value = churchMembers.value.filter((item) => {
                  return !item.id.includes(resArr[1]);
                });
              } else {
                let IdArr = resArr[1].split(",");
                churchMembers.value = churchMembers.value.filter((item) => {
                  const y = IdArr.findIndex((i) => i === item.id);
                  if (y >= 0) return false;
                  return true;
                });
              }
            }
          }
          checkedFirstTimer.value = [];
        })
        .catch((err) => {
          stopProgressBar();
          if (err.toString().toLowerCase().includes("network error")) {
            ElMessage({
              type: 'warning',
              showClose: true,
              message: "Network error, please ensure you have a strong internet connection",
              duration: 5000
            })
          } else if (err.toString().toLowerCase().includes("timeout")) {
            ElMessage({
              type: 'warning',
              showClose: true,
              message: "Request took too long to respond, please try again",
              duration: 5000
            })
          } else {
            ElMessage({
              type: 'warning',
              showClose: true,
              message: "Unable to delete first timer",
              duration: 5000
            })
          }
        });
    };

    const sendMarkedMemberSms = () => {
      contacts.value = checkedFirstTimer.value.filter((i) => i.phoneNumber).map((i) => i.phoneNumber).join()
      showSMS.value = true;
    }

    const sendMarkedMemberEmail = () => {
      showEmail.value = true;
      markedFirsttimers.value = checkedFirstTimer.value.map((i) => {
        i.id = i.id
        return i
      });

    }

    const modal = () => {
      ElMessageBox.confirm(
        'Are you sure you want to proceed?',
        'Warning',
        {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning',
        }
      )
        .then(() => {
          deleteFirstTimer();
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: 'Delete canceled',
          })
        })
    };

    const getMembershipCategory = async () => {
      try {
        let { data } = await axios.get(
          "/api/Settings/GetTenantPeopleClassification"
        );
        membershipCategory.value = data;
      } catch (err) {
        console.log(err);
      }
    };
    getMembershipCategory();

    const chooseCategory = async (personId, categoryId) => {
      try {
        let { data } = await axios.post(
          `/api/People/ConvertFirstTimerToMember?personId=${personId}&membershipCategoryId=${categoryId}`
        );
        churchMembers.value = churchMembers.value.filter((i) => {
          return i.id !== personId;
        });
        if (data.response) {
          ElMessage({
            type: 'success',
            showClose: true,
            message: data.response,
            duration: 5000
          })
        } else {
          ElMessage({
            type: 'success',
            showClose: true,
            message: "Moved succesfully",
            duration: 5000
          })
        }
      } catch (err) {
        console.log(err);
        if (err.response) {
          ElMessage({
            type: 'warning',
            showClose: true,
            message: "Moved failed, " + err.response,
            duration: 5000
          })
        } else if (err.toString().toLowerCase().includes("timeout")) {
          ElMessage({
            type: 'warning',
            showClose: true,
            message: "Request took too long to respond, please try again",
            duration: 5000
          })
        } else if (err.toString().toLowerCase().includes("network error")) {
          ElMessage({
            type: 'warning',
            showClose: true,
            message: "Please ensure that you have a strong internet",
            duration: 5000
          })
        } else {
          ElMessage({
            type: 'warning',
            showClose: true,
            message: "Couldn't move successfully, check your connection and try again",
            duration: 5000
          })
        }
      }
    };


    const setFirsttimer = (payload) => {
      churchMembers.value = payload
    }

    const getUser = computed(() => {
      if (!store.getters.currentUser || (store.getters.currentUser && Object.keys(store.getters.currentUser).length == 0)) return ''
      return store.getters.currentUser
    })

    watchEffect(() => {
      if (getUser.value) {
        tenantID.value = getUser.value.tenantId
      }
    })

    const firstTimerLink = computed(() => {
      if (!tenantID.value) return ""
      return `${window.location.origin}/createfirsttimer/${tenantID.value}`
    })

    const copylink = () => {
      selectedLink.value.input.setSelectionRange(0, selectedLink.value.input.value.length); /* For mobile devices */
      selectedLink.value.input.select();

      /* Copy the text inside the text field */
      document.execCommand("copy");
      ElMessage({
        showClose: true,
        message: 'Copied to clipboard',
        type: 'success',
      })
    }

    const setTotalFirstTimer = (payload) => {
      totalFirstTimer.value = payload
    }

    return {
      churchMembers,
      handleSelectionChange,
      handleCurrentChange,
      handleSizeChange,
      filterFormIsVissible,
      toggleFilterFormVissibility,
      moment,
      formatDate,
      applyFilter,
      filter,
      toggleSearch,
      searchIsVisible,
      filterResult,
      searchText,
      showConfirmModal,
      deleteMember,
      membersCount,
      getPeopleByPage,
      clearInput,
      checkedFirstTimer,
      check1item,
      markAllFirsttimer,
      deleteFirstTimer,
      modal,
      deleteMessage,
      display,
      sendMarkedMemberSms,
      sendMarkedMemberEmail,
      membershipCategory,
      chooseCategory,
      totalFirsttimersCount,
      searchMemberInDB,
      searchNamesInDB,
      listOfFirsttimers,
      searchMember,
      clearAll,
      contacts,
      disableBtn,
      hide,
      totalItems,
      setFirsttimer,
      firstTimerLink,
      markedFirsttimers,
      tenantID,
      selectedLink,
      showSMS,
      showEmail,
      copylink,
      setTotalFirstTimer,
      totalFirstTimer,
      getUser,
      serverOptions,
      paginatedTableLoading,
      firstTimerHeaders,
      selectedImageUrl,
      imageDialog,
      showMemberRow,
      xsOnly,
      mdAndUp,
      lgAndUp,
      xlAndUp,
      applyLoading,
      searchingMember,
      primarycolor
    };
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.text-color:hover {
  color: #007bff;
}

.fade-text {
  color: #a8a8a8;
  cursor: not-allowed;
}

.text-color {
  color: #212529;
}

.my-con {
  justify-content: space-between;
  margin: 24px 0;
}

.chart-con {
  width: 70%;
  display: flex;
  justify-content: space-between;
}

.total {
  margin-bottom: 40px;
  font-size: 37px;
}

.total-text {
  font-size: 15px;
  font-weight: 700;
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
  background: #ffffff;
  border-right: 1px solid #E0E0E0;
  border-left: 1px solid #E0E0E0;
}

a {
  text-decoration: none;
}

.clear-link,
.hide-link {
  color: #136acd;
}

.table-top {
  font-weight: 800;
  font-size: 12px;
  background: #fff;
  border: 1px solid #E0E0E0;
  border-bottom: none;
}

.m-wrapper {
  background-color: white !important;
  width: 875px;
  position: absolute;
  right: 0px;
  top: 0;
  height: 100%;
  padding: 70px;
  transition: all 3s ease-out;
}

.m-wrapper2 {
  background-color: white !important;
  width: 875px;
  position: absolute;
  right: 0px;
  top: 0;
  /* height: 100%; */
  padding: 70px;
}

.no-show {
  width: -875px;
  transition: all 3s ease-out;
  /* transition: all  8s cubic-bezier(0.645, 0.045, 0.355, 1); */
}




@media screen and (max-width: 947px) {

  .m-wrapper,
  .m-wrapper2 {
    width: 700px;
    padding: 50px;
  }
}

@media screen and (max-width: 767px) {

  .m-wrapper,
  .m-wrapper2 {
    width: 400px;
    padding: 40px;
  }
}

@media screen and (max-width: 575px) {

  .m-wrapper,
  .m-wrapper2 {
    width: 350px;
    padding: 20px;
  }
}




@media (max-width: 414px) {
  .head-button {
    flex-direction: column;
    align-items: center;
  }

  .botom {
    border-bottom: 7px solid rgb(252, 248, 248);
    border-radius: 2px;
    position: relative;
    display: flex;
  }

  .more {
    margin-right: 0;
  }

  .baseline {
    position: relative;
    border-radius: 10px;
    z-index: 175;
    top: -4px;
    left: 0px;
    /* width: 35%; */
    opacity: 1;
  }
}

@media (max-width: 575px) {
  .head-button {
    display: flex;
    justify-content: center;
  }

  .add-btn,
  .more {
    margin-top: 10px;
  }

  .first-timers-text {
    text-align: center;
  }
}

@media screen and (max-width: 768px) {
  .filter-options-shown {
    height: 150px !important;
    overflow: hidden;
    transition: all 0.5s ease-in-out;
  }
}

@media screen and (max-width: 1024px) {
  .my-con {
    flex-direction: column;
  }
}



@media (max-width: 767px) {
  .filter-options-shown {
    height: 150px;
  }
}
</style>