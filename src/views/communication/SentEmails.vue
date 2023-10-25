!<template>
  <div>
    <div class="container">
      <!-- Content Box -->
      <main id="main" class="mt-3">
        <div class="container-fluid px-0">
          <div class="row px-0">
            <div class="col-md-12 px-0">
              <div class="row d-md-flex align-items-center mt-3 mb-4">
                <div class="col-md-6 col-sm-12">
                  <div class="search-div d-flex align-items-center">
                    <span class="mr-2"
                      ><el-icon><Search /></el-icon
                    ></span>
                    <input
                      type="text"
                      class="w-100"
                      placeholder="Search here..."
                      v-model="searchMail"
                    />
                  </div>
                </div>
              </div>
              <div
                class="table-options"
                v-loading="loading"
                v-if="markedMail.length > 0"
              >
                <el-tooltip
                  class="box-item"
                  effect="dark"
                  v-if="markedMail.length > 0"
                  content="delete marked"
                  placement="top-start"
                >
                  <el-icon
                    :size="20"
                    class="color-deleteicon text-danger c-pointer"
                    style="font-size: 15px"
                    v-if="markedMail.length > 0"
                    @click="showConfirmModal(false)"
                  >
                    <Delete />
                  </el-icon>
                </el-tooltip>
              </div>
              <Table
                :data="searchEmails"
                :headers="EmailHeaders"
                :checkMultipleItem="true"
                @checkedrow="handleSelectionChange"
                v-loading="loading"
                v-if="searchEmails && searchEmails.length > 0"
              >
                <template #message="{ item }">
                  <div>
                    <router-link
                      :to="{
                        name: 'ComposeEmail',
                        query: { messageId: item.id },
                      }"
                      class="no-decoration primary--text"
                    >
                      <div class="font-weight-600">
                        {{
                          item.message && item.message.length > 25
                            ? `${item.message
                                .split("")
                                .slice(0, 25)
                                .join("")}...`
                            : item.message
                            ? item.message
                            : ""
                        }}
                      </div>
                      <!-- </el-tooltip> -->
                    </router-link>
                  </div>
                </template>
                <template #dateSent="{ item }">
                  <div>
                    <router-link
                      :to="{
                        name: 'ComposeEmail',
                        query: { messageId: item.id },
                      }"
                      class="text-decoration-none"
                    >
                      <span class="timestamp ml-1">{{ item.dateSent }}</span>
                    </router-link>
                  </div>
                </template>
                <template v-slot:smsUnitsUsed="{ item }">
                  <div>
                    <span class="small-text">{{ item.smsUnitsUsed }}</span>
                  </div>
                </template>
                <template #sentBy="{ item }">
                  <div>
                    <router-link
                      :to="{
                        name: 'ComposeEmail',
                        query: { messageId: item.id },
                      }"
                      class="no-decoration primary--text"
                    >
                      <span class="small-text">{{ item.sentByUser }}</span>
                    </router-link>
                  </div>
                </template>
                <template #delete="{ item }">
                  <span class="small-text">
                    <el-icon
                      :size="20"
                      class="ml-2 color-deleteicon pt-2 c-pointer"
                      style="font-size: 20px"
                      @click="showConfirmModal(item.id)"
                    >
                      <Delete />
                    </el-icon>
                  </span>
                </template>
              </Table>
              <div class="row" v-if="emails && emails.length === 0 && !loading">
                <div class="col-md-12 d-flex justify-content-center">
                  <span class="my-4 font-weight-bold">No sent mesages</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="conatiner">
          <div class="row">
            <div class="col-md-12 mb-3 pagination-container">
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
      </main>
    </div>
  </div>
</template>

<script>
import { computed, ref, onMounted, watch  } from "vue";
import axios from "@/gateway/backendapi";
import Loading from "../../components/loading/LoadingComponent";
import stopProgressBar from "../../services/progressbar/progress";
import store from "../../store/store";
import { Search } from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox } from "element-plus";
import Table from "@/components/table/Table";

export default {
  components: { Loading, Table },
  setup() {
    const emails = ref(store.getters["communication/getSentEmail"].data);
    const totalItems = ref( store.getters["communication/getSentEmail"].totalItems);
    const loading = ref(false);
    const searchMail = ref("");
    const EmailHeaders = ref([
      { name: " MESSAGE", value: "message" },
      { name: " DATE", value: "dateSent" },
      { name: " UNIT", value: "smsUnitsUsed" },
      { name: " SENTBY", value: "sentBy" },
      { name: "", value: "delete" },
    ]);

    const getSentEmails = async () => {
      loading.value = true;
      try {
        await store.dispatch("communication/getAllSentEmails").then((res) => {
          emails.value = res.data;
          totalItems.value = res.totalItems;
          loading.value = false;
        });
      } catch (error) {
        loading.value = false;
        console.log(error);
      }
    };

    

    const serverOptions = ref({
      page: 1,
      rowsPerPage: 50,
    });
    watch(serverOptions.value, () => {
      getEmailsByPage();
    },
      { deep: true }
    );

    const handleSelectionChange = (val) => {
      markedMail.value = val;
    };

    const formatMessage = (message) => {
      const formatted =
        message && message.length > 25
          ? `${createElementFromHTML(message)
              .split("")
              .slice(0, 25)
              .join("")}...`
          : createElementFromHTML(message);

      return `${formatted}`;
    };

    const getEmailsByPage = async () => {
      try {
        const  { data } = await  axios.get(`/api/Messaging/getAllSentEmails?page=${ serverOptions.value.page}`) 
        if (data) {
          emails.value = data.data;
          totalItems.value = data.totalItems;
        }
      } catch (error) {
        console.log(error);
      }
    };

    // const itemsCount = computed(() => {
    //   const allEmails = emails.value;
    //   if (!allEmails.value || allEmails.value.length === 0) return 0;
    //   return allEmails.value.length;
    // });

    const createElementFromHTML = (htmlString) => {
      var div = document.createElement("div");
      div.innerHTML = htmlString;
      return div.textContent;
    };
   

    const searchEmails = computed(() => {
      if (searchMail.value !== "" && emails.value &&  emails.value.length > 0) {
        return emails.value.filter((i) => {
          if (i.subject)
            return i.subject
              .toLowerCase()
              .includes(searchText.value.toLowerCase());
        });
      } else {
        return emails.value;
      }
    });

    // Function to check a single item
    const markedMail = ref([]);
    const mark1Email = (mailId) => {
      const mailIdx = markedMail.value.findIndex((i) => i.id === mailId.id);
      if (mailIdx < 0) {
        markedMail.value.push(mailId);
      } else {
        markedMail.value.splice(mailIdx, 1);
      }
    };

    // Function to check a multiple item
    const markAllMails = () => {
      if (markedMail.value.length < emails.value.length) {
        emails.value.forEach((i) => {
          const emailsInMarked = markedMail.value.findIndex(
            (e) => e.id === i.id
          );
          if (emailsInMarked < 0) {
            markedMail.value.push(i);
          }
        });
      } else {
        markedMail.value = [];
      }
    };

    // Function to delete emails
    const getIdsOfEmailsToDelete = (markedEmails) => {
      return markedEmails.map((i) => i.id).join(",");
    };

    const deleteEmails = async (id) => {
      try {
        let stringOfEmailIds = id
          ? id
          : getIdsOfEmailsToDelete(markedMail.value);

        const { data } = await axios.delete(
          `/api/Messaging/DeleteSentEmails?SentEmailIdList=${stringOfEmailIds}`
        );
        if (data.deleted) {
          ElMessage({
            type: "success",
            message: `${
              markedMail.value.length > 1 ? "" : "Email has"
            } been deleted successfully`,
            duration: 5000,
          });
          emails.value = !id
            ? removeDeletedEmailsFromEmailList(markedMail.value)
            : emails.value.filter((i) => i.id !== id);
          if (id) {
            store.dispatch("communication/removeSentEmails", id);
          } else {
            removeDeletedEmailsFromStore(markedMail.value);
          }
          markedMail.value = [];
        } else {
          ElMessage({
            type: "error",
            message: data.message,
          });
        }
      } catch (error) {
        console.log(error);
        ElMessage({
          type: "error",
          message: `${
            markedMail.value.length > 1 ? "Selected Emails" : "Email"
          } could not be deleted, Please try reloading`,
          duration: 5000,
        });
        stopProgressBar();
      }
    };

    const removeDeletedEmailsFromEmailList = (deletedEmailsArr) => {
      return emails.value.filter((i) => {
        const emailIndexInMarked = deletedEmailsArr.findIndex(
          (j) => j.id === i.id
        );
        if (emailIndexInMarked < 0) return true;
        return false;
      });
    };

    const removeDeletedEmailsFromStore = (deletedEmails) => {
      for (let email of deletedEmails) {
        store.dispatch("communication/removeSentEmails", email.id);
      }
    };

    const showConfirmModal = (id) => {
      ElMessageBox.confirm(
        "Are you sure you want to proceed? This operation can't be reversed ",
        "Confirm delete",
        {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "error",
        }
      )
        .then(() => {
          deleteEmails(id);
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "Delete discarded",
          });
        });
    };

    const handleSizeChange = (val) => {
      console.log(`${val} items per page`);
    };
    const handleCurrentChange = (val) => {
      console.log(`current page: ${val}`);
    };
    
    onMounted(() => {
      if ((!emails.value) || (emails.value && emails.value.data && emails.value.data.length == 0)){
        getSentEmails();
      }
    })

    return {
      handleSizeChange,
      handleCurrentChange,
      emails,
      EmailHeaders,
      handleSelectionChange,
      Search,
      totalItems,
      formatMessage,
      // currentPage,
      loading,
      serverOptions,
      createElementFromHTML,
      searchMail,
      searchEmails,
      markedMail,
      mark1Email,
      markAllMails,
      deleteEmails,
      showConfirmModal,
    };
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}
.table-options {
  border: 1px solid rgb(212, 221, 227);
  border-bottom: none;
  padding: 7px 7px 0 7px;
}
.search-div {
  /* width: fit-content; */
  padding: 10px;
  background: #f5f8f9;
  border-radius: 200px;
}

.search-div input {
  background: none;
  border: none;
  outline: transparent;
}
.table-top {
  font-weight: 800;
  font-size: 12px;
  background: #fff;
  border: 1px solid #e0e0e0;
  border-bottom: none;
}

.brief-message {
  color: #4762f0;
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
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
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