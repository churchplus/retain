<template>
  <div>
    <div class="container-fluid">
      <!-- Content Box -->
      <main id="main" class="mt-3">
        <div class="container-fluid px-0">
          <div class="row px-0">
            <div class="col-md-12 px-0">
              <div class="row d-md-flex align-items-center justify-content-between mt-3 mb-4">
                <div class="col-md-8 col-sm-12">
                  <div class="search-div">
                    <el-icon style="vertical-align: middle" class="search-sms mr-1">
                      <Search />
                    </el-icon>
                    <input type="text" placeholder="Search here..." v-model="searchText" class="w-100 pl-4" />
                  </div>
                </div>
                <div class="col-sm-5 col-md-4 mt-sm-2 units-container">
                  <UnitsArea />
                </div>
              </div>
              <div class="table-options" v-if="marked.length > 0">
                <el-icon class="text-danger c-pointer" @click="showConfirmModal">
                  <Delete />
                </el-icon>
              </div>

              <Table :data="searchedMessages" :headers="SMSHeaders" :checkMultipleItem="true"
                @checkedrow="handleSelectionChange" v-loading="loading">
                <template #message="{ item }">
                  <div>
                    <router-link :to="{
                      name: 'SendMessage',
                      query: { messageId: item.id },
                    }" class="text-decoration-none">
                      <!-- <el-tooltip class="box-item" effect="dark" :content="item.message" placement="top-start"> -->
                      <span class="font-weight-600">{{
                        item.message && item.message.length > 25
                        ? `${item.message
                          .split("")
                          .slice(0, 25)
                          .join("")}...`
                        : item.message
                          ? item.message
                          : ""
                      }}</span>
                      <!-- </el-tooltip> -->
                    </router-link>
                  </div>
                </template>
                <template #dateSent="{ item }">
                  <div>
                    <router-link :to="{
                      name: 'SendMessage',
                      query: { messageId: item.id },
                    }" class="text-decoration-none">

                      <span class="timestamp ml-1">{{
                        item.dateSent
                      }}</span>
                    </router-link>
                  </div>
                </template>
                <template v-slot:status="{ item }">
                  <div>
                    <span class="small-text">{{
                      item.report.filter((i) =>
                        i.status.includes("sent")
                      ).length
                    }}
                      |
                      {{
                        item.report.filter((i) =>
                          i.status.includes("processed")
                        ).length
                      }}
                      |
                      {{
                        item.report.filter((i) =>
                          i.status.includes("failed")
                        ).length
                      }}</span>
                  </div>
                </template>
                <template v-slot:smsUnitsUsed="{ item }">
                  <div>
                    <span class="small-text">{{ item.smsUnitsUsed }}</span>
                  </div>
                </template>
                <template v-slot:report="{ item }">
                  <div>
                    <router-link :to="{
                      name: 'DeliveryReport',
                      params: { messageId: item.id },
                      query: { units: item.smsUnitsUsed },
                    }" class="small-text no-decoration primary--text">View report</router-link>
                  </div>
                </template>
                <template v-slot:action="{ item }">
                  <div>
                    <el-dropdown trigger="click">
                      <el-icon>
                        <MoreFilled />
                      </el-icon>
                      <template #dropdown>
                        <el-dropdown-menu>
                          <el-dropdown-item>
                            <router-link :to="
                              item.phone
                                ? `/tenant/sms/compose?phone=${item.phone}`
                                : ''
                            " :class="{ 'fade-text': !item.phone, 'text-color': item.phone }">Send
                              SMS</router-link>
                          </el-dropdown-item>
                          <el-dropdown-item>
                            <router-link :to="
                              item.email
                                ? `/tenant/email/compose?phone=${item.email}`
                                : ''
                            " :class="{ 'fade-text': !item.email, 'text-color': item.email }">Send
                              Email</router-link>
                          </el-dropdown-item>
                        </el-dropdown-menu>
                      </template>
                    </el-dropdown>
                  </div>
                </template>
              </Table>
            </div>
          </div>
        </div>

        <div class="conatiner-fluid">
          <div class="row">
            <div class="col-md-12 mb-3 pagination-container">
              <!-- <PaginationButtons @getcontent="getSMSByPage" :itemsCount="itemsCount" :currentPage="currentPage"
                :totalItems="sentSMS.totalItems" /> -->
                <el-pagination v-model:current-page="serverOptions.page" v-model:page-size="serverOptions.rowsPerPage"
                background layout="total, prev, pager, next, jumper" :total="totalItems" @size-change="handleSizeChange"
                @current-change="handleCurrentChange"/>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import axios from "@/gateway/backendapi";
import { computed, ref, onMounted, watch } from "vue";
import { useStore } from "vuex";
// import store from "../../store/store";
import UnitsArea from "../../components/units/UnitsArea";
import stopProgressBar from "../../services/progressbar/progress";
import { ElMessage, ElMessageBox } from 'element-plus'
import Table from "@/components/table/Table"

export default {
  components: {
    UnitsArea,
    Table
  },
  setup() {
    const loading = ref(false);
    const store = useStore();
    const sentSMS = ref(store.getters["communication/getSentSMS"].data);
    const searchText = ref("");
    const totalItems = ref(store.getters["communication/getSentSMS"].totalItems)
    const SMSHeaders = ref([
      { name: ' MESSAGE', value: 'message' },
      { name: ' DATE', value: 'dateSent' },
      { name: ' STATUS', value: 'status' },
      { name: ' UNIT', value: 'smsUnitsUsed' },
      { name: ' REPORT', value: 'report' },
    ])
    const serverOptions = ref({
      page: 1,
      rowsPerPage: 50,
    });

    watch(serverOptions.value, () => {
      getSMSByPage();
    },
      { deep: true }
    );



    const getSentSMS = async () => {
        loading.value = true
      try {
        await store.dispatch("communication/getAllSMS").then((res) => {
           loading.value = false;
          sentSMS.value = res.data;
          totalItems.value = res.totalItems
        });
      } catch (error) {
         loading.value = false;
        console.log(error);
      }
    };

    const getSMSByPage = async () => {
      loading.value = true;
      try {
        const data = await axios.get(`/api/Messaging/getAllSentSms?page=${serverOptions.value.page}`);
        loading.value = false;
        if (data) {
          sentSMS.value = data.data.data;
          totalItems.value = data.data.totalItems
          isSortedByStatus.value = true;
        }
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

    // const itemsCount = computed(() => {
    //   if (!sentSMS.value || sentSMS.value.length === 0) return 0;
    //   return sentSMS.value.length;
    // });

    const messages = computed(() => {
      if (!sentSMS.value || sentSMS.value.length === 0) return [];
      return sentSMS.value.filter((i) => {
        if (i && i.message)
          return !i.message.toLowerCase().startsWith("sms reply");
        return false;
      });
    });

    const searchedMessages = computed(() => {
      if (searchText.value === "" && messages.value.length > 0)
        return messages.value;
      return messages.value.filter((i) =>
        i.message.toLowerCase().includes(searchText.value.toLowerCase())
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
          deleteSingleItem();
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: 'Delete canceled',
          })
        })
    };

    // code to mark single item in draft
    const marked = ref([]);
    // const mark1Item = (messageid) => {
    //   const msgIndex = marked.value.findIndex((i) => i.id === messageid.id);
    //   if (msgIndex < 0) {
    //     marked.value.push(messageid);
    //   } else {
    //     marked.value.splice(msgIndex, 1);
    //   }
    // };

    // code to mark multiple item item in draft
    const markAllItem = () => {
      if (marked.value.length < sentSMS.value.length) {
        sentSMS.value.forEach((i) => {
          const smsInMarked = marked.value.findIndex((q) => q.id === i.id);
          if (smsInMarked < 0) {
            marked.value.push(i);
          }
        });
      } else {
        marked.value = [];
      }
    };

    // Function to delete sent sms
    const convert = (x) => {
      return x.map((i) => i.id).join(",");
    };
    const deleteSingleItem = () => {
      let bail = convert(marked.value);
      axios
        .delete(`/api/Messaging/DeleteSentSMS?SentSMSIdList=${bail}`)
        .then(() => {
          sentSMS.value = sentSMS.value.filter((item) => {
            const y = marked.value.findIndex((i) => i.id === item.id);
            if (y >= 0) return false;
            return true;
          });
          ElMessage({
            type: 'success',
            message: 'SMS deleted successfully',
            duration: 5000
          })
          marked.value.forEach((i) => {
            store.dispatch("communication/removeSentSMS", i.id);
          });
          marked.value = [];
        })
        .catch((err) => {
          stopProgressBar();
          ElMessage({
            type: 'error',
            message: 'SMS delete failed, please try again',
            duration: 5000
          })
          console.log(err);
        });
    };

    const isSortedByStatus = ref(true);
    const sortByStatus = () => {
      if (isSortedByStatus.value) {
        sentSMS.value.sort(x => x.deliveryReport.findIndex(i => i.report === "failed") >= 0 ? -1 : 1);
      } else {
        sentSMS.value.sort(x => x.deliveryReport.findIndex(i => i.report === "failed") >= 0 ? 1 : -1);
      }
      isSortedByStatus.value = !isSortedByStatus.value;
    }

    const handleSelectionChange = (val) => {
      marked.value = val
    }
    

    const handleSizeChange = (val) => {
      console.log(`${val} items per page`)
    }
    const handleCurrentChange = (val) => {
      console.log(`current page: ${val}`)
    }

    onMounted(() => {
      if ( (!sentSMS.value) || (sentSMS.value && sentSMS.value.length == 0)) {
         getSentSMS();
      }
    });

    return {
      sentSMS,
      loading,
      searchText,
      searchedMessages,
      marked,
      store,
      // mark1Item,
      markAllItem,
      deleteSingleItem,
      convert,
      showConfirmModal,
      sortByStatus,
      isSortedByStatus,
      SMSHeaders,
      handleSelectionChange,
      serverOptions,
      handleCurrentChange,
      handleSizeChange,
      totalItems
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
  font-size: 14px;
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

.deleteicon-color {
  color: rgba(184, 5, 5, 0.726);
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
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* .view-btn:hover {
  cursor: pointer;
  background-color: #136acd;
  color: #fff;
} */

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

.table-options {
  border: 1px solid rgb(212, 221, 227);
  border-bottom: none;
  padding: 7px 7px 0 7px
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