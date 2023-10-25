<template>
  <div>
    <div class="container">
      <!-- Content Box -->
      <main id="main" class="mt-3">
        <div class="container-fluid px-0">
          <div class="row px-0">
            <div class="col-md-12 px-0">
              <div class="row d-md-flex justify-content-between align-items-center mt-3 mb-4">
                <div class="col-md-8 col-sm-12">
                  <div class="search-div">
                    <el-icon style="vertical-align: middle" class="search-sms mr-1">
                      <Search />
                    </el-icon>
                    <input type="text" placeholder="Search here..." v-model="searchSms" class="w-100 pl-4" />
                  </div>
                </div>
                <div class="col-sm-5 col-md-4 mt-sm-2 units-container">
                  <UnitsArea />
                </div>
              </div>
              <div class="table-options" v-if="markedInboxMssg.length > 0">
                <el-icon class="text-danger c-pointer" @click="showConfirmModal">
                  <Delete />
                </el-icon>
              </div>
              <Table :data="searchSMS" :headers="repliesHeader" :checkMultipleItem="true"
                @checkedrow="handleSelectionChange" v-loading="loading">
                <template #message="{ item }">
                  <div class="d-md-flex flex-column">
                    <span class="d-flex justify-content-end justify-content-md-between">
                      <span class="font-weight-bold">
                        <router-link class="text-decoration-none text-dark" :to="{
                          name: 'MessageDetails',
                          params: { messageId: item.id },
                        }">
                          {{ item.subject }}
                        </router-link></span>
                    </span>
                    <span class="small-text">
                      <router-link class="no-decoration primary--text" :to="{
                        name: 'MessageDetails',
                        params: { messageId: item.id },
                      }">
                        {{
                          item.message && item.message.length > 25
                            ? `${item.message
                              .split("")
                              .slice(0, 25)
                              .join("")}...`
                            : item.message
                        }}
                      </router-link>
                    </span>
                  </div>
                </template>
                <template v-slot:dateSent="{ item }">
                  <span class="timestamp" style="font-size:13px">{{ item.dateSent }}</span>
                </template>
                <template v-slot:sentByUser="{ item }">
                  <span class="small-text">
                    <span class="small-text">{{ item.sentByUser }}</span>
                  </span>
                </template>
                <template v-slot:smsUnitsUsed="{ item }">
                  <span class="small-text">{{
                    item.smsUnitsUsed
                  }}</span>
                </template>
                <template v-slot:report="{ item }">
                  <span>
                    <router-link :to="{
                      name: 'MessageDetails',
                      params: { messageId: item.id },
                    }"
                    class="c-pointer small-text primary--text"
                    > View
                    </router-link>
                  </span>
                </template>
              </Table>
              <div class="conatiner">
                <div class="row">
                  <div class="col-md-12 mb-3 pagination-container">
                    <PaginationButtons @getcontent="getRepliesByPage" :itemsCount="itemsCount"
                      :currentPage="currentPage" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import UnitsArea from "../../components/units/UnitsArea";
import communicationService from "../../services/communication/communicationservice";
import PaginationButtons from "../../components/pagination/PaginationButtons";
import { useStore } from "vuex";
import Tooltip from "primevue/tooltip";
import axios from "@/gateway/backendapi";
import stopProgressBar from "../../services/progressbar/progress";
import { ElMessage, ElMessageBox } from 'element-plus'
import Table from "@/components/table/Table"

export default {
  components: { UnitsArea, PaginationButtons, Table },
  directives: {
    tooltip: Tooltip,
  },
  setup() {
    const store = useStore();
    const replies = ref(store.getters["communication/smsReplies"].data);
    const currentPage = ref(1);
    const loading = ref(false);
    const searchSms = ref("");
    const repliesHeader = ref([
      { name: "MESSAGE", value: "message" },
      { name: "DATE", value: "dateSent" },
      { name: "SENT BY", value: "sentByUser" },
      { name: "UNIT", value: "smsUnitsUsed" },
      { name: "REPORT", value: "report" },
    ])

    const getSMSReplies = async () => {
      try {
        loading.value = true;
        const data = await communicationService.getSMSReplies(
          currentPage.value
        );
        loading.value = false;
        if (data) {
          replies.value = data.data;
          store.dispatch("communication/getSMSReplies");
        }
      } catch (error) {
        console.log(error);
      }
    };

    if ( (!replies.value) || (replies.value && replies.value.data && replies.value.data.length == 0)) getSMSReplies();

    const getRepliesByPage = async (page) => {
      try {
        const data = await communicationService.getSMSReplies(page);
        if (data) {
          replies.value = data;
          currentPage.value = page;
        }
      } catch (error) {
        console.log(error);
      }
    };

    const itemsCount = computed(() => {
      if (!replies.value || replies.value.length === 0) return 0;
      return replies.value.length;
    });

    const searchSMS = computed(() => {
      if (searchSms.value === ""  ) {
        return replies.value;
      }
      return replies.value.filter((i) =>
        i.message.toLowerCase().includes(searchSms.value.toLowerCase())
      );
    });



    const showConfirmModal = () => {
      ElMessageBox.confirm(
        'This delete action cannot be reversed. do you want to continue?',
        'Confirm delete',
        {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'error',
        }
      )
        .then(() => {
          deleteRepliesMsg();
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: 'Delete canceled',
          })
        })
    };


    // code to mark single item
    const markedInboxMssg = ref([]);

    const handleSelectionChange = (val) => {
      markedInboxMssg.value = val
    }

    // Function to delete replies sms
    const retain = (m) => {
      return m.map((i) => i.id).join(",");
    };
    const deleteRepliesMsg = () => {
      let repliesArr = retain(markedInboxMssg.value);
      axios
        .delete(`/api/messaging/deletesmsreplies?smsreplyidlist=${repliesArr}`)
        .then(() => {
          replies.value = replies.value.filter((item) => {
            const z = markedInboxMssg.value.findIndex((i) => i.id === item.id);
            if (z >= 0) return false;
            return true;
          });

          ElMessage({
            type: 'success',
            message: 'Reply deleted',
            duration: 5000
          })
          markedInboxMssg.value.forEach((i) => {
            store.dispatch("communication/removeSentReplies", i.id);
          });
          markedInboxMssg.value = [];
        })
        .catch((err) => {
          stopProgressBar();
          ElMessage({
            type: 'error',
            message: 'Delete replies failed, please try again',
            duration: 5000
          })
          console.log(err);
        });
    };


    return {
      replies,
      getRepliesByPage,
      itemsCount,
      currentPage,
      loading,
      searchSms,
      searchSMS,
      markedInboxMssg,
      handleSelectionChange,
      retain,
      deleteRepliesMsg,
      showConfirmModal,
      repliesHeader
    };
  },
};
</script>

<style scoped>
.search-div {
  /* width: fit-content; */
  padding: 10px;
  background: #f5f8f9;
  border-radius: 200px;
}

.search-sms {
  position: absolute;
  top: 14px;
}

.search-div input {
  background: none;
  border: none;
  outline: transparent;
}

.brief-message {
  color: #4762f0;
}

.table-options {
  border: 1px solid rgb(212, 221, 227);
  border-bottom: none;
  padding: 7px 7px 0 7px
}

.compose-btn {
  background: #136acd;
  box-shadow: 0px 6px 12px #708eb170;
  border-radius: 22px;
  color: #fff;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.menu-icon {
  font-size: 20px;
}

.units-div {
  border: 1px solid #dde2e6;
  border-radius: 20px;
  padding: 15px 0;
  background: #f9a9a933 !important;
}

.hidden-header {
  display: none;
}

.th {
  font-size: 12px;
  font-weight: 700;
}

.inbox-count {
  background: rgba(19, 106, 205, 0.3);
  padding: 4px 8px;
  border-radius: 22px;
}

.menu-item-con {
  color: #002044;
  opacity: 0.5;
}

.menu-item-con.active {
  background: rgba(19, 106, 205, 0.05);
  border-left: 2px solid #136acd;
  opacity: 1;
}

.buy-btn {
  background: rgb(112, 142, 177, 0.33);
  border-radius: 22px;
}

.btn-text {
  opacity: 1;
  font-size: 11px;
  font-weight: 700;
}

.timestamp {
  font-size: 14px;
  color: #333333;
  opacity: 0.5;
}

.view-btn {
  background: #ebeff4;
  border-radius: 21px;
  padding: 4px 18px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.center-flexed {
  display: flex;
  justify-content: center;
}

.table-box {
  border: 1px solid #4762f01f;
}

.hr {
  border: 1px solid #4762f01f;
}

@media screen and (max-width: 767px) {
  .hidden-header {
    display: inline-block;
    font-size: 12px;
  }

  .header-row {
    display: none;
  }

  #menu-items {
    flex-direction: row !important;
  }

  .search-div {
    width: 100%;
  }

  .units-div {
    width: 100%;
  }

  .units-container {
    margin-left: 0;
    margin: auto;
  }
}

@media screen and (max-width: 1000px) {
  .msg-n-time {
    flex-direction: column;
    margin-bottom: 8px;
  }
}

@media screen and (min-width: 1000px) {
  #menu-items {
    min-width: 100% !important;
  }
}
</style>