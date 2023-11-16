<template>
  <!-- Content Box -->
  <el-main>
    <div class="container-fluid px-0">
      <div class="row px-0">
        <div class="col-md-12 px-0">
          <div
            class="d-flex flex-wrap flex-column flex-sm-row justify-content-between align-items-center mt-2 mb-4"
          >
            <div class="head-text">Sender ID</div>
            <div class="">
              <el-button
                :color="primarycolor"
                round
                data-toggle="modal"
                data-target="#senderIdModal"
                class="header-btn"
                >Add SenderId</el-button
              >
            </div>
          </div>
          <div></div>
          <Table
            :data="senderIdList"
            :headers="sendIDHeaders"
            :checkMultipleItem="false"
            @checkedrow="handleSelectionChange"
            v-loading="loading"
          >
            <template #name="{ item }">
              <span>{{ item.mask }}</span>
            </template>
            <template #status="{ item }">
              <span class="small-text">{{ item.status }}</span>
            </template>
            <template v-slot:action="{ item }">
              <el-dropdown trigger="click">
                <el-icon>
                  <MoreFilled />
                </el-icon>
                <template #dropdown>
                  <el-dropdown-menu>
                    <!-- <el-dropdown-item>
                                                    <router-link :to="`/tenant/pledge/makepledge?id=${item.id}`"
                                                        class="text-color">Edit</router-link>
                                                </el-dropdown-item> -->
                    <el-dropdown-item>
                      <div
                        @click.prevent="showConfirmModal(item.id, index)"
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
      </div>
    </div>
    <div
      class="modal fade"
      id="senderIdModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Request Sender ID</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              ref="closeModal"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="container">
              <div class="row">
                <div class="col-12">Enter Sender ID</div>
                <div class="col-12 mt-2">
                  <el-form
                    ref="ruleFormRef"
                    :model="senderIDValidateForm"
                    label-width="100px"
                    class="demo-ruleForm"
                    :rules="rules"
                  >
                    <el-form-item class="sender-id-input" prop="senderIdText">
                      <el-input
                        type="text"
                        placeholder="Enter sender id"
                        v-model="senderIDValidateForm.senderIdText"
                      />
                    </el-form-item>
                  </el-form>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <el-button class="secondary-button" data-dismiss="modal" round
              >Cancel</el-button
            >
            <el-button
              :color="primarycolor"
              :loading="senderidloading"
              @click="submitSenderForm(ruleFormRef)"
              round
              >Request</el-button
            >
          </div>
        </div>
      </div>
    </div>
    <!-- <el-dialog title="Select Date and Time" v-model="display" :width="mdAndUp || lgAndUp || xlAndUp ? `50%` : xsOnly ? `90%` : `70%`
                    " align-center>
                    <div class="row">
                        <div class="col-md-12">
                            <SenderID @setselectedsenderid="setSelectedSenderIdCheckin" />
                        </div>
                    </div>
                </el-dialog> -->
  </el-main>
</template>

<script>
import { reactive, ref, inject } from "vue";
import axios from "@/gateway/backendapi";
import { ElMessage, ElMessageBox } from "element-plus";
import Table from "@/components/table/Table";
export default {
  components: {
    Table,
  },
  setup() {
    const senderIdList = ref([]);
    const loading = ref(false);
    const senderidloading = ref(false);
    const ruleFormRef = ref();
    const closeModal = ref();
    const display = ref(false);
    const primarycolor = inject("primarycolor");

    const sendIDHeaders = ref([
      { name: "NAME", value: "name" },
      { name: "STATUS", value: "status" },
      { name: "ACTION", value: "action" },
    ]);

    const senderIDValidateForm = reactive({
      senderIdText: "",
    });

    const validateSenderId = async (rule, value, callback) => {
      var regExp = /^[a-zA-Z0-9]{3,11}$/;
      var testString = senderIDValidateForm.senderIdText;
      if (!regExp.test(testString)) {
        return callback(
          new Error(
            "Should not contain any special characters AND Should not be less than 3 characters and more than 11 characters"
          )
        );
      }
    };

    const rules = reactive({
      senderIdText: [{ validator: validateSenderId, required: true, trigger: "blur" }],
    });

    const submitSenderForm = async (formEl) => {
      if (!formEl) return;
      await formEl.validate((valid, fields) => {
        if (valid) {
          saveSenderId();
        } else {
          console.log("error submit!", fields);
        }
      });
    };

    const saveSenderId = async () => {
      senderidloading.value = true;
      let payload = {
        mask: senderIDValidateForm.senderIdText,
      };
      try {
        let { data } = await axios.post(`/api/Messaging/RequestSenderID`, payload);
        senderidloading.value = false;
        closeModal.value.click();
        if (data.status === 0) {
          ElMessage({
            type: "warning",
            message:
              "PENDING, Sender id is pending for approval, when it is approved, you will see it among the sender id list",
            duration: 6000,
          });
        } else if (data.status === 1) {
          ElMessage({
            type: "warning",
            message:
              "PROCESSING, Sender id is processing for approval, when it is approved, you will see it among the sender id list",
            duration: 6000,
          });
        } else if (data.status === 2) {
          ElMessage({
            type: "success",
            message: "APPROVED, Sender id is approved!",
            duration: 6000,
          });
        } else {
          ElMessage({
            type: "error",
            message: "NOT APPROVED, Sender id is not approved, create another one.",
            duration: 6000,
          });
        }
        senderIDValidateForm.senderIdText = "";

        getSenderId();
      } catch (err) {
        senderidloading.value = false;
        console.log(err);
      }
    };

    const getSenderId = async () => {
      loading.value = true;
      try {
        const { data } = await axios.get("/api/Messaging/RetrieveTenantSenderIDs");
        console.log(data, "ddgdfdg");
        senderIdList.value = data.returnObject;
        loading.value = false;
      } catch (error) {
        console.log(error);
        loading.value = false;
      }
    };
    getSenderId();
    const showSendIdModal = async () => {
      display.value = true;
    };

    const deleteSenderId = async (id) => {
      senderIdList.value = senderIdList.value.filter((i) => i.id !== id);
      ElMessage({
        type: "success",
        message: "SenderId deleted",
        duration: 5000,
      });
      // try {
      //     await axios.delete(`/api/Messaging/DeletePhoneGroup?phoneGroupIdList=${id}`);
      //     senderIdList.value = senderIdList.value.filter(i => i.id !== id)
      //     ElMessage({
      //         type: 'success',
      //         message: 'SenderId deleted',
      //         duration: 5000
      //     })
      // }
      // catch (err) {
      //     finish()
      //     console.log(err)
      //     if (err.toString().toLowerCase().includes('network error')) {
      //         ElMessage({
      //             type: 'error',
      //             message: 'Network error, please ensure you have a strong internet',
      //             duration: 5000
      //         })
      //     } else if (err.toString().toLowerCase().includes('timeout')) {
      //         ElMessage({
      //             type: 'warning',
      //             message: 'Response took too long to respond',
      //             duration: 5000
      //         })
      //     }
      // }
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
          deleteSenderId(id);
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "Delete canceled",
          });
        });
    };

    return {
      senderIdList,
      ruleFormRef,
      showConfirmModal,
      loading,
      sendIDHeaders,
      primarycolor,
      display,
      showSendIdModal,
      submitSenderForm,
      saveSenderId,
      rules,
      closeModal,
      senderidloading,
      senderIDValidateForm,
    };
  },
};
</script>

<style scoped>
.text-color {
  color: #212529;
  text-decoration: none;
}

.text-color:hover {
  color: #007bff;
}
</style>
