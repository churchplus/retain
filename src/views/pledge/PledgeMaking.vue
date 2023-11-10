<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12 px-0">
        <div class="row mt-4">
          <div class="col-md-6">
            <h2 class="head-text">Pledge Overview</h2>
          </div>
          <div class="col-md-6 d-flex justify-content-md-end">
            <el-button
              :color="primarycolor"
              class="header-btn text-white"
              data-toggle="modal"
              data-target="#exampleModalLong"
              round
            >
              Record Payment
            </el-button>
          </div>
        </div>
        <hr class="mb-4" />

        <div class="row mb-4 mt-3" v-loading="loadingSummary">
          <div class="col-sm-6 col-md-4">
            <span class="theader"> Pledge Name </span>
            <div class="my-3">
              <span class="evt-name">
                {{ pledgeName }}
              </span>
            </div>
          </div>
          <div class="col-sm-6 col-md-4">
            <span class="theader"> Donor </span>
            <div class="my-3">
              <span class="evt-name">
                {{ personName }}
              </span>
            </div>
          </div>
          <div class="col-sm-6 col-md-4">
            <span class="theader">Date</span>
            <div class="my-3">
              <span class="evt-name"> {{ date(pledgeDate) }}</span>
            </div>
          </div>
          <div class="col-sm-6 col-md-4">
            <span class="theader"> Pledge Amount</span>
            <div class="my-3">
              <span class="evt-name">
                {{ Math.abs(pledgeAmount).toLocaleString() }}.00
              </span>
            </div>
          </div>
          <div class="col-sm-6 col-md-4">
            <span class="theader">Total payment</span>
            <div class="my-3">
              <span class="evt-name">
                {{ Math.abs(pledgePaymentSum).toLocaleString() }}.00
              </span>
            </div>
          </div>

          <div class="col-sm-6 col-md-4">
            <span class="theader">Balance</span>
            <div class="my-3">
              <span class="evt-name">
                {{ Math.abs(pledgeBalance).toLocaleString() }}.00</span
              >
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <hr class="mb-0" />
            <div class="pg-content">
              <div class="row mb-3">
                <div class="col-md-12">
                  <span class="attendance-header">Payment link</span>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                      <div class="border p-3">
                        <div class="row">
                        <div
                          class="col-md-2 col-sm-2 d-flex justify-content-center image mt-2"
                        >
                          <img
                            src="../../assets/link.svg"
                            class="w-100"
                            style="width: 60px; height: 60px"
                          />
                        </div>
                        <div class="col-md-10 col-sm-10 mt-3">
                          <a class="text-decoration-none"
                            ><h4
                              class="header4 link-color c-pointer"
                              @click="copyRegLink"
                            >
                              Online Payment Link
                            </h4></a
                          >
                          <p class="mb-4">
                            <span
                              class="d-flex align-items-center justify-content-between"
                              ><el-input
                                type="text"
                                ref="selectedLink"
                                v-model="pledgePaymentLink"
                                class="border-0"
                                placeholder="Link"
                                
                              >
                              <template #append>
                                <el-button @click="copyLink">
                                  <el-icon>
                                    <CopyDocument />
                                  </el-icon>
                                </el-button>
                              </template>
                            </el-input>
                            </span>
                          </p>
                        </div>
                      </div>
                
                      </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row mt-3">
          <div class="col-md-6">
            <h2 class="head-text">Payments</h2>
          </div>
          <div class="col-md-6 d-flex justify-content-md-end">
            <el-button
              :color="primarycolor"
              class="header-btn text-white"
              data-toggle="modal"
              data-target="#exampleModalLong"
              round
            >
              Record Payment
            </el-button>
          </div>
          <div class="col-12">
            <div class="col-md-12 px-0">
              <hr class="my-3" />
            </div>
            <Table
              :data="searchPledgePayment"
              :headers="pledgeHeaders"
              :checkMultipleItem="false"
              v-loading="loading"
              v-if="allPledgePaymentList.length > 0"
            >
              <template v-slot:date="{ item }">
                <div class="c-pointer">{{ date(item.date) }}</div>
              </template>
              <template v-slot:channel="{ item }">
                <div class="c-pointer">{{ item.channel }}</div>
              </template>
              <template v-slot:amountPaid="{ item }">
                <div class="c-pointer">
                  {{ Math.abs(item.amount).toLocaleString() }}.00
                </div>
              </template>
              <template v-slot:action="{ item }">
                <el-dropdown trigger="click">
                  <el-icon>
                    <MoreFilled />
                  </el-icon>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item> </el-dropdown-item>
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
      <!-- Modal -->
      <div
        class="modal fade"
        id="exampleModalLong"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLongTitle"
        aria-hidden="true"
      >
        <div
          class="modal-dialog modal-lg modal-dialog-centered"
          role="document"
        >
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title font-weight-bold">
                Record a payment for this pledge
              </h5>
              <div class="btn-close" data-dismiss="modal" aria-label="Close" ref="closeRecordModal">
                <el-icon><Close /></el-icon>
              </div>
            </div>
            <div class="modal-body">
              <div class="container-fluid">
                <div class="row">
                  <div class="col-md-12">
                    Record a payment you've already received,such as cash,
                    cheque, or bank payment
                  </div>
                  <div class="col-md-12 mt-4">
                    <div class="row my-1 mt-3">
                      <div class="col-md-10">
                        <div class="row">
                          <div class="col-md-4 text-md-right align-self-center">
                            <label for="" class="font-weight-bold"
                              >Payment date <sup class="text-danger">*</sup>
                            </label>
                          </div>
                          <div class="col-md-8">
                            <el-input
                              type="date"
                              v-model="pledgeTime"
                              :disabled="checking"
                              size="large"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row my-2 mt-3">
                      <div class="col-md-10">
                        <div class="row">
                          <div class="col-md-4 text-md-right align-self-center">
                            <label for="" class="font-weight-bold"
                              >Donor <sup class="text-danger">*</sup>
                            </label>
                          </div>
                          <div class="col-md-8">
                            <el-input
                              type="text"
                              v-model="personName"
                              :disabled="checking"
                              size="large"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row my-2 mt-3">
                      <div class="col-md-10">
                        <div class="row">
                          <div class="col-md-4 text-md-right align-self-center">
                            <label for="" class="font-weight-bold">
                              Pledge Name <sup class="text-danger">*</sup>
                            </label>
                          </div>

                          <div class="col-md-8">
                            <el-input
                              type="text"
                              v-model="pledgeName"
                              :disabled="checking"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row my-2 mt-3">
                      <div class="col-md-10">
                        <div class="row">
                          <div class="col-md-4 text-md-right align-self-center">
                            <label for="" class="font-weight-bold">
                              Pledge Amount
                            </label>
                          </div>
                          <div class="col-md-8 d-flex">
                            <div class="col-12 col-md-8 col-lg-12 m-0 p-0">
                              <el-input
                                type="number"
                                v-model="pledgeBalance"
                                :disabled="false"
                                class="w-100"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row my-3 mt-3">
                      <div class="col-md-10">
                        <div class="row">
                          <div class="col-md-4 text-md-right align-self-center">
                            <label for="" class="font-weight-bold"
                              >Payment method <sup class="text-danger">*</sup>
                            </label>
                          </div>

                          <div class="col-md-8 d-flex flex-wrap">
                            <el-select-v2
                              v-model="SelectedChannelId"
                              class="w-100 font-weight-normal"
                              :options="
                                channel.map((i) => ({
                                  label: i.name,
                                  value: i.id,
                                }))
                              "
                              placeholder="Select a payment method"
                              @change="selectChannel"
                              size="large"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <el-button class="secondary-button" data-dismiss="modal" round>Cancel</el-button>
              <el-button
                :color="primarycolor"
                class="header-btn text-white"
                round
                @click="recordPayment"
              :loading="savingRecord"
              >
                Save</el-button
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/gateway/backendapi";
import ReportModal from "@/components/firsttimer/ReportModal.vue";
import { ref, computed, inject } from "vue";
import Loading from "../../components/loading/LoadingComponent";
import router from "../../router";
import { useRoute } from "vue-router";
import finish from "../../services/progressbar/progress";
import ToggleButton from "../donation/toggleButton.vue";
import PledgeTransaction from "./PledgeTransaction.vue";
import monthDayYear from "../../services/dates/dateformatter";
import Table from "@/components/table/Table";
import { ElMessage, ElMessageBox } from "element-plus";
export default {
  components: {
    ReportModal,
    Loading,
    ToggleButton,
    PledgeTransaction,
    Table,
  },
  directives: {},
  setup() {
    const primarycolor = inject('primarycolor')
    const selectedLink = ref(null);
    const SelectedChannelId = ref(null);
    const emaildata = ref(null);
    const tenantID = ref("");
    const selectedCurrency = ref("");
    const route = useRoute();
    const churchName = ref("");
    const Address = ref("");
    const loading = ref(false);
    const networkError = ref(false);
    const freewillAmount = ref("");
    const checking = ref(false);
    // const value = ref()
    const isNameValid = ref(true);
    const isEmailValid = ref(true);
    const selectedPledge = ref({});
    // const memberName = ref("");
    const allPledgeList = ref([]);
    const amountFrom = ref("");
    const selectedContact = ref({});
    const isActive = ref(null);
    const url = ref("");
    const amountTo = ref("");
    const selectedChannel = ref({});
    const allPledgePaymentList = ref([]);
    const currencyList = ref([]);
    const searchText = ref("");
    const closeRecordModal = ref(null)
    const savingRecord = ref(false)
    const loadingSummary = ref(false)

    const pledgeHeaders = ref([
      { name: "DATE", value: "date" },
      { name: "CHANNEL", value: "channel" },
      { name: "AMOUNT PAID", value: "amountPaid" },
      { name: "ACTION", value: "action" },
    ]);
    const pledgeCategory = ref([
      { name: "Free will" },
      { name: "Specific" },
      { name: "Range" },
    ]);
    const personName = ref("");
    const pledgeName = ref("");
    const pledgeID = ref(route.query.pledgeTypeID);
    const pledgePaymentSum = ref("");
    const pledgeBalance = ref("");
    const pledgeDate = ref("");
    const pledgeAmount = ref("");
    const pledgePaymentID = ref("");
    const pledgeContactID = ref("");
    const pledgeCurrencyID = ref("");

    const getAllpaymentList = async () => {
      try {
        const res = await axios.get("/api/Pledge/GetAllPledgePayments");
      } catch (error) {
        NProgress.done();
        console.log(error);
      }
    };

    getAllpaymentList();

    const pledgeTime = ref(new Date().toISOString().split("T")[0]);

    const getSinglePledge = async () => {
      checking.value = false;
      loadingSummary.value = true
      try {
        const res = await axios.get(
          `/api/Pledge/GetOnePledge?ID=${route.query.pledgeTypeID}`
        );

        pledgeName.value = res.data.returnObject.pledgeItemName;
        personName.value = res.data.returnObject.contact;
        pledgePaymentSum.value = res.data.returnObject.totalPaymentSum;
        pledgeBalance.value = res.data.returnObject.balance;
        pledgeDate.value = res.data.returnObject.date;
        pledgeAmount.value = res.data.returnObject.amount;
        pledgeContactID.value = res.data.returnObject.contactID;
        pledgePaymentID.value = res.data.returnObject.pledgeType.id;
        pledgeCurrencyID.value = res.data.returnObject.currency.id;
        selectedPledge.value = res.data.returnObject;
        allPledgePaymentList.value = res.data.returnObject.pledgePayments;

        checking.value = true;
        loadingSummary.value = false
      } catch (error) {
        NProgress.done();
        console.log(error);
        loadingSummary.value = false
      }
    };
    if (route.query.pledgeTypeID) getSinglePledge();

    const searchPledgePayment = computed(() => {
      if (searchText.value !== "" && allPledgePaymentList.value.length > 0) {
        return allPledgePaymentList.value.filter((i) => {
          if (i.pledge.person.firstName || i.pledge.pledgeType.name)
            return i.pledge.person.firstName
              .toLowerCase()
              .includes(searchText.value.toLowerCase());
        });
      } else {
        return allPledgePaymentList.value;
      }
    });

    const deletePledgePayment = (id) => {
      axios
        .delete(`/api/Pledge/DeletePledgePaymentPayment?ID=${id}`)
        .then((res) => {
          getSinglePledge();
          ElMessage({
            type: "success",
            message: "Pledge payment record deleted",
            duration: 5000,
          });

          allPledgePaymentList.value = allPledgePaymentList.value.filter(
            (paymentlist) => paymentlist.id !== id
          );
        })
        .catch((err) => {
          finish();
          if (err.response.status === 400) {
            ElMessage({
              type: "error",
              message: "Unable to delete",
              duration: 5000,
            });
          } else {
            ElMessage({
              type: "error",
              message: "Unable to delete, An error occurred, please try again",
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
          deletePledgePayment(id, index);
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "Delete canceled",
            duration: 5000,
          });
        });
    };

    const date = (offDate) => {
      return monthDayYear.monthDayYear(offDate);
    };

    const recordPayment = async () => {
      savingRecord.value = true
      let paymentData = {
        id: route.query.pledgeTypeID,
        pledgeID: route.query.pledgeTypeID,
        amount: pledgeBalance.value,
        channel: selectedChannel.value.name,
        currencyID: pledgeCurrencyID.value,
      };
      try {
        const res = await axios.post(
          "/api/Pledge/SavePledgePayment",
          paymentData
        );
        savingRecord.value = false
        closeRecordModal.value.click()
        
        ElMessage({
          type: "success",
          message: "Pledge Payment recorded successfully",
          duration: 5000,
        });
        getSinglePledge();
        router.push(
          `/tenant/pledge/pledgemaking?pledgeTypeID=${route.query.pledgeTypeID}`
          );
        } catch (error) {
          NProgress.done();
          console.log(error);
          savingRecord.value = false
      }
    };
    const channel = ref([
      { name: "Bank Transfer", id: "1" },
      { name: "Cash", id: "2" },
      { name: "Online", id: "3" },
      { name: "POS", id: "4" },
      { name: "USSD", id: "5" },
      { name: "Cheque", id: "6" },
    ]);
    const shareableLinkField = ref(null);
    const locationTwo = ref(window.location);
    const willCopyLink = ref(false);

    const selectChannel = () => {
      selectedChannel.value = channel.value.find(
        (i) => i.id == SelectedChannelId.value
      );
    };

    const copyLink2 = () => {
      try {
        willCopyLink.value = true;
        const a = shareableLinkField.value;
        a.select();
        a.setSelectionRange(0, 200); /* For mobile devices */

        /* Copy the text inside the text field */
        document.execCommand("copy");
        ElMessage({
          type: "info",
          message: "Shareable link copied to your clipboard",
          duration: 5000,
        });
      } catch (error) {
        console.log(error);
      }
    };
    url.value = `my.churchplus.co/tenant/pledge/pledgemaking/pledgeTypeID=${route.query.pledgeTypeID}&pledgeType=${pledgeName.value}&id=${route.query.id}&name=${route.query.name}`;

    const chooseContact = (payload) => {
      // contactRef.value.hide();
      selectedContact.value = payload;
    };

    const pledgePaymentLink = computed(() => {
      if (!route.query.pledgeTypeID) return "";
      return `${window.location.origin}/partnership/pay?pledgeID=${route.query.pledgeTypeID}`;
    });

    const copyLink = () => {
      selectedLink.value.input.setSelectionRange(0, selectedLink.value.input.value.length); /* For mobile devices */
      selectedLink.value.input.select();

      /* Copy the text inside the text field */
      document.execCommand("copy");
      ElMessage({
        type: "success",
        message: 'Copied to clipboard"',
        duration: 5000,
      });
    };
    const sendReport = (messageObj) => {
      const emailData = ref(emaildata.value.innerHTML);
      const message = `
                <!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
                <html xmlns="http://www.w3.org/1999/xhtml" style="box-sizing: border-box; font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; font-size: 14px; margin: 0; padding: 0;">
                  <head>
                    <meta name="viewport" content="width=device-width"/>
                    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
                    <title>#title#</title>
                    <style>
                      .topmost {
                        display: flex;
                      }

                      .topmost-box1 {
                        width: 70%;
                        height:133px;
                        display:flex;
                        align-items:center;
                        padding:10px
                      }

                      .topmost-box2{
                        width: 30%;display:flex; flex-direction:column; height:133px; align-items:center; justify-content:center
                      }
                    </style>
                  </head>
                  <body style="-webkit-font-smoothing: antialiased; -webkit-text-size-adjust: none; background: #f6f6f6; box-sizing: border-box; font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; font-size: 14px; height: 100%; line-height: 1.6; margin: 0; padding: 0; width: 100% !important;">
                  
                  ${`${messageObj.data.message}`} <br>

                  ${emailData.value}
                  </body>
                  `;
      const body = {
        ispersonalized: false,
        contacts: messageObj.data.contacts,
        subject: messageObj.data.subject,
        // user: "+2349086767765",
      };
      if (messageObj.medium === "sms") {
        body.gateWayToUse = "hostedsms";
        body.category = "";
        body.emailAddress = "";
        body.emailDisplayName = "";
        body.isoCode = messageObj.data.isoCode;
        body.toOthers = messageObj.data.toOthers;
      }

      body.message =
        messageObj.medium === "sms" ? messageObj.data.message : message;

      const url =
        messageObj.medium === "sms"
          ? "/api/Messaging/sendSms"
          : "/api/Messaging/sendEmail";

      composerObj
        .sendMessage(url, body)
        .then((res) => {
          btnState.value = "";

          if (res.status === false) {
            ElMessage({
              type: "error",
              message: 'Sending Failed"',
              duration: 5000,
            });
          } else {
            ElMessage({
              type: "success",
              message: "Your report has been sent",
              duration: 5000,
            });
            markAsSent();
          }
        })
        .catch((err) => {
          btnState.value = "";
          console.log(err);
          stopProgressBar();
          ElMessage({
            type: "error",
            message: 'Sending Failed"',
            duration: 5000,
          });
        });
      btnState.value = "modal";
    };
    const active = (payload) => {
      isActive.value = payload;
    };

    const checkNameValue = () => {
      if (churchName.value.length == 0) {
        isNameValid.value = false;
      } else {
        isNameValid.value = true;
      }
    };

    const checkEmailValue = () => {
      if (pastorEmail.value.length == 0) {
        isEmailValid.value = false;
      } else {
        isEmailValid.value = true;
      }
    };

    return {
      showConfirmModal,
      pledgeHeaders,
      pledgeTime,
      networkError,
      date,
      pledgePaymentID,
      pledgeContactID,
      pledgeCurrencyID,
      pledgeDate,
      pledgeBalance,
      pledgePaymentSum,
      selectedCurrency,
      allPledgePaymentList,
      searchText,
      searchPledgePayment,
      recordPayment,
      currencyList,
      url,
      channel,
      selectedChannel,
      selectChannel,
      allPledgeList,
      locationTwo,
      shareableLinkField,
      copyLink2,
      willCopyLink,
      emaildata,
      sendReport,
      pledgeID,
      personName,
      pledgeName,

      tenantID,
      checking,
      chooseContact,
      selectedPledge,
      pledgeCategory,
      amountTo,
      amountFrom,
      freewillAmount,
      pledgePaymentLink,

      checkEmailValue,
      churchName,
      selectedContact,
      Address,

      loading,
      checkNameValue,
      isNameValid,
      isEmailValid,
      selectedLink,
      isActive,
      active,
      copyLink,
      pledgeAmount,
      SelectedChannelId,
      closeRecordModal,
      savingRecord,
      loadingSummary,
      primarycolor
    };
  },
};
</script>

<style scoped>
.heading-text {
  font: normal normal 800 1.5rem Nunito sans;
}

.email-data {
  height: 0 !important;
  overflow: hidden !important;
}

.info-div {
  background: #f9f8db;
  border: 1px solid #dde2e6;
  border-radius: 5px 5px 0px 0px;
  text-align: center;
}
.file-icon {
  color: #136acd;
  border: 1px solid #136acd;
  padding: 10px;
  border-radius: 50%;
  height: 40px;
  width: 40px;
  text-align: center;
  font-size: 20px;
  display: flex;
  align-items: center;
}
* {
  color: #1c252c;
  box-sizing: border-box;
}

a {
  text-decoration: none;
  font-weight: 700;
}

.def-btn {
  height: 40px;
  border-radius: 22px;
  /* padding: 0 24px; */
  padding: 8px 10px;
  width: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #dde2e6;
}

.def-btn:hover {
  cursor: pointer;
}

.resend-btn {
  background: transparent !important;
  color: #4d6676 !important;
  border: 1px solid #dde2e6 !important;
}

.approve-btn {
  background: #136acd;
  color: white;
}

.edit-btn {
  border: 1px solid #dde2e6;
}

.unapproved {
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 15px #00000029;
  border: 1px solid #dde2e6;
  border-radius: 5px;
}

/* .analytics-container {
  
  width: 90%;
  margin: auto;
}

.first-con {
  margin-top: 50px;
} */

.theader {
  font-size: 14px;
  font-weight: 800;
  color: #0f0220;
}
.evt-name {
  color: #136acd;
  font-weight: 800;
  font-size: 22px;
}

.evt-report {
  font-size: 25px;
}
.grey-text {
  color: #8296ae;
}

.date {
  font-size: 20px;
  font-weight: 600;
  color: #1d262d;
}

.draft {
  border: 0.5px solid #252a2f;
  padding: 10px;
  border-radius: 22px 0 0 22px;
  background: grey;
}

.genarationg-report {
  min-height: calc(100vh - 200px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-weight: bold;
  font-size: 20px;
}

.analytics,
.attendance-header {
  background: #1c252c;
  color: #fff;
  width: 155px;
  height: 37px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
}

.hr-dark {
  border: 1px solid #000;
}

.header4 {
  font: var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-bold)
    18px/24px var(--unnamed-font-family-nunito-sans);
  letter-spacing: var(--unnamed-character-spacing-0);
  text-align: left;
  font: normal normal bold 18px/24px Nunito Sans;
  letter-spacing: 0px;
  color: #02172e;
  opacity: 0.8;
}

.recieve {
  font-size: 20px;
}
.bold-700 {
  font-weight: 700;
}

.dark-red-section {
  /* background: #980404; */
  background: #ff0000b5;
  color: #fff;
  height: 133px;
  display: flex;
  align-items: center;
  border-radius: 5px 0px 0px 0px;
  height: 133px;
  display: flex;
  align-items: center;
  border-radius: 5px 0px 0px 0px;
}
.bottom-section {
  box-shadow: 0px 3px 10px #00000029;
  border: 1px solid #dde2e6;
  border-radius: 5px;
}

.light-red-section {
  /* background: #ff0000b5; */
  background: #980404;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0px 5px 0px 0px;
}

.dark-red-section h2,
.light-red-section span {
  color: #fff;
  font-weight: 800;
}

@media screen and (max-width: 1000px) {
  .container {
    width: 100% !important;
  }

  .def-btn {
    max-width: 280px;
  }
}
</style>