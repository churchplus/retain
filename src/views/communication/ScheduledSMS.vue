<template>
  <div>
    <div class="container-fluid">
      <!-- Content Box -->
      <main id="main">
        <div class="container-fluid px-0">
          <div class="row px-0">
            <div class="col-md-12 px-0">
              <div class="row d-md-flex align-items-center justify-content-between mb-4">
                <div class="col-md-8 col-sm-12">
                  <div class="search-div">
                    <el-icon style="vertical-align: middle" class="search-sms mr-1">
                      <Search />
                    </el-icon>
                    <input
                      type="text"
                      placeholder="Search here..."
                      v-model="scheduledMssg"
                      class="pl-4 w-100"
                    />
                  </div>
                </div>
                <div class="col-sm-5 col-md-4 mt-sm-2 units-container">
                  <UnitsArea />
                </div>
              </div>

              <div class="table-options" v-if="markedSchedules.length > 0">
                <el-icon class="text-danger c-pointer" @click="showConfirmModal">
                  <Delete />
                </el-icon>
              </div>
              <Table
                :data="searchScheduleMssg"
                :headers="scheduledSMSHeader"
                :checkMultipleItem="true"
                @checkedrow="handleSelectionChange"
                v-loading="loading"
              >
                <template #subject="{ item }">
                  <span>
                    <span class="font-weight-600">{{
                      !item.subject ? "(no subject)" : item.subject
                    }}</span>
                  </span>
                </template>
                <template #message="{ item }">
                  <span class="font-weight-600">{{
                    `${
                      item.message ? item.message.split("").slice(0, 30).join("") : ""
                    }...`
                  }}</span>
                </template>
                <template #isExecuted="{ item }">
                  <span class="small-text">{{
                    item.isExecuted === false ? "No" : "Yes"
                  }}</span>
                </template>
                <template #executionDate="{ item }">
                  <span class="timestamp small-text">{{
                    formattedDate(item.executionDate)
                  }}</span>
                </template>
                <template v-slot:action="{ item }">
                  <span @click="showConfirmModal(item.id)">
                    <el-icon class="text-danger c-pointer">
                      <Delete />
                    </el-icon>
                  </span>
                </template>
              </Table>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, computed } from "vue";
import UnitsArea from "../../components/units/UnitsArea";
import communicationService from "../../services/communication/communicationservice";
import dateFormatter from "../../services/dates/dateformatter";
import axios from "@/gateway/backendapi";
import stopProgressBar from "../../services/progressbar/progress";
import { ElMessage, ElMessageBox } from "element-plus";
import Table from "@/components/table/Table";

export default {
  components: { UnitsArea, Table },
  setup() {
    const schedules = ref([]);
    const loading = ref(false);
    const scheduledMssg = ref("");
    const scheduledSMSHeader = ref([
      { name: "SUBJECT", value: "subject" },
      { name: "MESSAGE", value: "message" },
      { name: "IS EXECUTED", value: "isExecuted" },
      { name: "EXECUTION DATE", value: "executionDate" },
      { name: "ACTION", value: "action" },
    ]);

    const getScheduledSMS = async () => {
      try {
        loading.value = true;
        const res = await communicationService.getSchedules();
        loading.value = false;
        schedules.value = res;
      } catch (error) {
        console.log(error);
      }
    };

    const formattedDate = (date) => {
      return dateFormatter.monthDayTime(date);
    };

    onMounted(() => {
      getScheduledSMS();
    });

    const searchScheduleMssg = computed(() => {
      if (scheduledMssg.value === "" && schedules.value.length > 0) {
        return schedules.value;
      }
      return schedules.value.filter((i) =>
        i.message.toLowerCase().includes(scheduledMssg.value.toLowerCase())
      );
    });

    // code to mark single item in schedules
    const markedSchedules = ref([]);

    // function to delete schedules
    const mainone = (k) => {
      return k.map((i) => i.id).join(",");
    };

    const deleteSchedules = (id) => {
      let sub = mainone(markedSchedules.value);
      axios
        .delete(
          `/api/Messaging/DeleteSMSScheduledMessages?ScheduledMessageIdList=${
            sub ? sub : id
          }`
        )
        .then(() => {
          if (sub) {
            schedules.value = schedules.value.filter((item) => {
              const p = markedSchedules.value.findIndex((i) => i.id === item.id);
              if (p >= 0) return false;
              return true;
            });
            markedSchedules.value = [];
          } else {
            schedules.value = schedules.value.filter((del) => {
              return del.id != id;
            });
          }
          ElMessage({
            type: "success",
            message: "Draft deleted successfully",
            duration: 5000,
          });
        })
        .catch((err) => {
          stopProgressBar();
          ElMessage({
            type: "error",
            message: "Draft delete failed",
            duration: 5000,
          });
          console.log(err);
        });
    };

    const showConfirmModal = (id) => {
      ElMessageBox.confirm(
        "This delete action cannot be reversed. do you want to continue?",
        "Confirm delete",
        {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "error",
        }
      )
        .then(() => {
          deleteSchedules(id);
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "Delete canceled",
          });
        });
    };

    const handleSelectionChange = (val) => {
      markedSchedules.value = val;
    };

    return {
      schedules,
      loading,
      formattedDate,
      scheduledMssg,
      searchScheduleMssg,
      markedSchedules,
      deleteSchedules,
      showConfirmModal,
      scheduledSMSHeader,
      handleSelectionChange,
    };
  },
};
</script>

<style scoped>
.search-div {
  padding: 10px;
  background: white;
  border-radius: 200px;
}

.search-div input {
  background: none;
  border: none;
  outline: transparent;
}

.search-sms {
  position: absolute;
  top: 14px;
}

.table-options {
  border: 1px solid rgb(212, 221, 227);
  border-bottom: none;
  padding: 7px 7px 0 7px;
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
  font-size: 16px;
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

.center-flexed {
  display: flex;
  justify-content: center;
}

.table-box {
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
