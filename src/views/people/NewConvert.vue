<template>
  <div
    class="container-fluid px-0"
  >
    <div class="">
      <div class="top-con">
          <div class="">
            <div class="table-top p-3 mt-5">
              <div class="d-flex flex-column flex-sm-row justify-content-sm-between">
                 <div>
                    <el-tooltip class="box-item" effect="dark" v-if="marked.length > 0" content="Send SMS" placement="top-start">
                      <img src="../../assets/sms.png" style="width: 20px; margin-top: -13px" class="ml-2 c-pointer"
                        @click="sendMarkedMemberSms" alt="Send SMS" />
                    </el-tooltip>
                    <el-tooltip class="box-item" effect="dark" v-if="marked.length > 0" content="Send Email" placement="top-start">
                      <el-icon :size="20" class="ml-2 c-pointer" v-if="marked.length > 0" @click="sendMarkedMemberEmail">
                        <Message />
                      </el-icon>
                    </el-tooltip>
                  </div>
                  <div class="d-flex flex-column flex-sm-row justify-content-sm-end">
                    <el-input
                      size="small"
                      v-model="searchText"
                      placeholder="Search..."
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
          </div>
        </div>
      <Table
          :data="searchNewConvert"
          :headers="NewConvertHeaders"
          :checkMultipleItem="true" @checkedrow="handleSelectionChange"
          v-if="searchNewConvert.length > 0 "
        >
          <template v-slot:fullname="{ item }">
            <div @click="showMemberRow(item)" class="c-pointer">
              {{ item.fullName }}
            </div>
          </template>

          <template v-slot:phone="{ item }">
            <div @click="showMemberRow(item)" class="c-pointer">
              {{ item.phoneNumber }}
            </div>
          </template>

          <template v-slot:date="{ item }">
            <div @click="showMemberRow(item)" class="c-pointer">
              {{ formatDate(item.date) }}
            </div>
          </template>
          <template v-slot:howDidYouAboutUsName="{ item }">
            <div @click="showMemberRow(item)" class="c-pointer">
              {{ item.howDidYouAboutUsName }}
            </div>
          </template>
          <template v-slot:interactions="{ item }">
            <div @click="showMemberRow(item)"  class="c-pointer">
              {{ item.interactions }}
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
                      :to="`/tenant/people/addnewconvert?id=${item.id}`"
                      class="text-color"
                      >Edit</router-link
                    >
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <div
                      class="text-decoration-none text-color"
                      @click="showConfirmModal(item.id)"
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
    <div
      v-if="allNewConvert.length ===  0  && !loading && !networkError"
      class="no-person"
    >
      <div class="empty-img">
        <p><img src="../../assets/people/people-empty.svg" alt="" /></p>
        <p class="tip">You haven't added any first timer yet</p>
      </div>
    </div>
    <div v-else-if="networkError && !loading" class="adjust-network">
      <img src="../../assets/network-disconnected.png" />
      <div>Opps, Your internet connection was disrupted</div>
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
          <emailComponent :selectedGroupMembers="markedMembers" @closesidemodal="() => showEmail = false" />
        </div>
      </template>
    </el-drawer>

    <el-skeleton class="w-100" animated v-if="loading">
      <template #template>
        <div
          style="
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 20px;
          "
        >
          <el-skeleton-item
            variant="text"
            style="width: 240px; height: 240px"
          />
          <el-skeleton-item
            variant="text"
            style="width: 240px; height: 240px"
          />
        </div>
        <el-skeleton
          class="w-100 mt-5"
          style="height: 25px"
          :rows="20"
          animated
        />
      </template>
    </el-skeleton>
  </div>
</template>

<script>
import { ref, inject, computed, watchEffect } from "vue";
import axios from "@/gateway/backendapi";
import router from "@/router/index";
import dateFormatter from "../../services/dates/dateformatter";
import deviceBreakpoint from "../../mixins/deviceBreakpoint";
import Table from "@/components/table/Table";
import finish from "../../services/progressbar/progress";
import { ElMessage, ElMessageBox } from "element-plus";
import smsComponent from "../groups/component/smsComponent.vue";
import emailComponent from "../groups/component/emailComponent.vue";

export default {
  props: ['newConvertList'],
  components: {
    Table,
    smsComponent,
    emailComponent
  },
  setup(props) {
    const { mdAndUp, lgAndUp, xlAndUp } = deviceBreakpoint()
    const primarycolor = inject('primarycolor')
    const loading = ref(false)
    const networkError = ref(false)
    const showSMS = ref(false)
    const marked = ref([])
    const markedMembers = ref([])
    const showEmail = ref(false)
    const contacts = ref([])
    const searchText = ref('')
    const allNewConvert = ref([])
    const NewConvertHeaders = ref([
      { name: "NAME", value: "fullname" },
      { name: "PHONE", value: "phone" },
      { name: "DATE", value: "date" },
      { name: "SOURCE", value: "howDidYouAboutUsName" },
      { name: "INTERESTED", value: "interestedInJoining" },
      { name: "INTERACTIONS", value: "interactions" },
      { name: "ACTION", value: "action" },
    ]);

    const formatDate = (date) => {
      return dateFormatter.monthDayYear(date);
    };
    const showMemberRow = (item) => {
      router.push(`/tenant/people/addnewconvert?id=${item.id}`)
    }
    const searchNewConvert = computed(() => {
      if (allNewConvert.value === 0 && searchText.value === "")
        return allNewConvert.value;
      return allNewConvert.value.filter((i) =>
        i.fullName.toLowerCase().includes(searchText.value.toLowerCase())
      );
    });
    const sendMarkedMemberSms = () => {
      contacts.value = marked.value.filter((i) => i.phoneNumber).map((i) => i.phoneNumber).join()
      showSMS.value = true;
    }

    const sendMarkedMemberEmail = () => {
      showEmail.value = true;
      markedMembers.value = marked.value.map((i) => {
        i.id = i.id
        return i
      });

    }
    const handleSelectionChange = (val) => {
      marked.value = val
    }

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
          deleteNewConvert(id);
          
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "Delete canceled",
          });
        });
    };
    const deleteNewConvert = (id) => {
      axios.delete(`api/People/DeleteNewConvert/${id}`)
        .then((res) => {
          console.log(res);

          ElMessage({
            type: "success",
            message: "New Convert Deleted",
            duration: 3000
          });
          allNewConvert.value = allNewConvert.value.filter((i) => i.id !== id);
           store.dispatch('membership/removeNewConvertFromStore', id)
        })
        .catch((err) => {
          console.log(err);
          finish();
        });
    };

    watchEffect(() => {
      if (props.newConvertList) {
        allNewConvert.value = props.newConvertList
      }
    })

    return {
    mdAndUp, lgAndUp ,xlAndUp, primarycolor, loading, NewConvertHeaders, formatDate, networkError, 
    showConfirmModal,
    showSMS,
    contacts,
    showEmail,
    markedMembers,
    marked,
    handleSelectionChange,
    deleteNewConvert,
    sendMarkedMemberEmail,
    sendMarkedMemberSms,
    allNewConvert,
    showMemberRow,
    searchNewConvert,
    searchText
    }
  },
};
</script>

<style scoped>
.table-top {
  font-weight: 800;
  font-size: 12px;
  background: #fff;
  border: 1px solid #e0e0e0;
  border-bottom: none;
}
</style>