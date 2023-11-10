<template>
  <div class="container-wide">
    <Toast />
    <ConfirmDialog />
    <!-- write up part -->
    <div class="row">
      <div class="col-md-12 mt-5" :class="{ 'slide-right': slide }">
        <div class="row">
          <div class="col-md-7">
            <h2 class="events">Online Donation</h2>
          </div>
          <div class="col-md-5 d-flex justify-content-end">
            <button
              class="default-btn primary-bg border-0 font-weight-700 text-white"
              data-toggle="modal"
              data-target="#paymentModal"
              style="font-size: 13px"
            >
              Add Donation Form
            </button>
          </div>
          <!-- <div class="col-12">
              <Paymentonboarding/>
          </div> -->
          <div class="col-12">
            <p>Enter bank details to set up online donation</p>
          </div>
        </div>
        <div class="row">
          <div class="col-md-7">
            <div class="col-md-7 mt-3 px-md-0 col-9">Bank Details</div>
          </div>
          <div class="col-md-5 d-flex justify-content-end">
            <button
              class="col-4 mt-2 col-md-4 mr-2 btnIcons c-pointer"
              data-toggle="modal"
              data-target="#paymentOnBoardingModal"
              style="font-size: 18px"
            >
              Add
            </button>
          </div>
        </div>
        <!-- List for the bank details -->

        <table class="table table-striped">
          <thead>
            <tr>
              <th>Account Name</th>
              <th>Account Number</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(bankAccount, index) in bankAccounts" :key="index">
              <td>{{ bankAccount.accountName }}</td>
              <td>{{ bankAccount.accountNumber }}</td>
              <td>{{ bankAccount.description }}</td>
              <td>
                <div
                  class="col-2 align-self-center cursor-pointer"
                  @click="showConfirmModalBank(bankAccount.id)"
                >
                  <i class="pi pi-trash"></i>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- <div class="row table table-border">
          <div class="col-md-12 px-0">
            <div class="row">
              <div class="col-md-4">Account Name</div>
              <div class="col-md-3">Account Number</div>
              <div class="col-md-2">Description</div>
              <div class="col-md-1"></div>
            </div>
            <div class="row" v-for="(bankAccount, index) in bankAccounts" :key="index">
              <div class="col-md-4">{{bankAccount.bankName}}</div>
              <div class="col-md-3">{{bankAccount.bankNumber}}</div>
              <div class="col-md-2">{{bankAccount.description}}</div>
              <div class="col-md-1"></div>
            </div>
          </div>
        </div> -->

        <table class="table table-border">
          <thead class="thead-light">
            <tr>
              <th scope="col-3">Name</th>
              <th scope="col-3"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(form, index) in formsArr" :key="index">
              <td>{{ form.name }}</td>
              <td></td>
            </tr>
          </tbody>
        </table>

        <!-- Modal -->
        <div
          class="modal fade"
          id="paymentModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-lg" style="max-width: 600px">
            <div class="modal-content">
              <div class="modal-header pb-0">
                <h5
                  class="modal-title"
                  style="font: normal normal 800 28px Nunito sans"
                  id="exampleModalLabel"
                >
                  Online donation form
                </h5>
                <button
                  type="button"
                  class="btn-close border-0"
                  data-dismiss="modal"
                  aria-label="Close"
                  ref="closeModalButtonForm"
                >
                  X
                </button>
              </div>
              <div class="modal-body pt-0">
                <paymentform @formcreated="formCreated" />
              </div>
            </div>
          </div>
        </div>
        <!-- Modal -->
        <div
          class="modal fade"
          id="paymentOnBoardingModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-lg" style="max-width: 600px">
            <div class="modal-content">
              <div class="modal-header pb-0">
                <h5
                  class="modal-title"
                  style="font: normal normal 800 28px Nunito sans"
                  id="exampleModalLabel"
                >
                  Bank Details
                </h5>
                <button
                  type="button"
                  class="btn-close border-0"
                  data-dismiss="modal"
                  aria-label="Close"
                  ref="closeModalButton"
                >
                  X
                </button>
              </div>
              <div class="modal-body pt-0">
                <paymentonboarding
                  @formcreated="formCreated"
                  @closemodal="closeModal"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="row mt-4">
          <div
            class="
              col-11
              ml-3
              btn
              primary-bg
              my-2
              text-white
              default-btn
              border-0
            "
            @click="completeSetUp"
          >
            <i
              class="pi pi-spin pi-spinner text-white mr-2"
              v-show="setupSpinner"
              style="fontsize: 16px"
            ></i>
            Finish Setup
          </div>
          <div
            @click="skip"
            class="
              btn
              my-3
              mb-5
              text-primary text-right
              col-12 col-sm-6
              offset-sm-3
            "
          >
            Skip >>>
          </div>
        </div>
      </div>
    </div>

    <!-- <Toast /> -->
  </div>
</template>
<script>
import axios from "@/gateway/backendapi";
// import Dropdown from "primevue/dropdown";
import { ref } from "vue";
import router from "../../../router";
import finish from "../../../services/progressbar/progress";
// import { useToast } from "primevue/usetoast";
import axio from "axios";
// import store from "../../../store/store";
import paymentform from "../../../components/genericmobile/paymentform";
import store from "../../../store/store";
import { useToast } from "primevue/usetoast";
import Paymentonboarding from "./PaymentOnBoarding";
import { useConfirm } from "primevue/useconfirm";
// import paymentonboarding from './PaymentOnBoarding';
export default {
  components: {
    paymentform,
    Paymentonboarding,
    // DonationSetup,
    // Dropdown,
  },
  setup(props, context) {
    const toast = useToast();
    const confirm = useConfirm();
    const nigerianBanks = ref([]);
    const bankAccounts = ref([]);
    const selectedBank = ref("");
    const accountNumber = ref("");
    const accountName = ref("");
    const loading = ref(false);
    const accNameRef = ref("");
    const closeModalButtonForm = ref(null);
    // const toast = useToast();

    // const pastors = ref([{}]);
    const slide = ref(false);
    const banks = ref([
      {
        accountName: accountName.value,
        accountNumber: accountNumber.value,
        banks: selectedBank.value,
      },
    ]);
    const setupSpinner = ref(false);

    const completeSetUp = () => {
      let changeState = {
        tab: true,
        churchSetup: false,
        socialMedia: false,
        appBranding: false,
        donationForm: true,
      };
      context.emit("saved-donation", changeState);

      const currentUser = store.getters.currentUser;
      setupSpinner.value = true;
      axios
        .post(
          `/mobile/v1/Feeds/SetupChurchPostCategories?tenantID=${currentUser.tenantId}`
        )
        .then((res) => {
          console.log(res);
          setupSpinner.value = false;

          setTimeout(() => {
            router.push({ name: "OnboardingSuccessful" });
          }, 1000);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const getBanks = () => {
      axios
        .get("/api/Financials/GetBanks")
        .then((res) => {
          console.log(res);
          nigerianBanks.value = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getBanks();

    const resolveCustomerDetail = async () => {
      loading.value = true;
      try {
        let header = {
          headers: {
            Authorization: `Bearer ${process.env.VUE_APP_PAYSTACK_SECRET_KEY}`,
          },
        };
        console.log(header, "header");

        let { data } = await axio.get(
          `https://api.paystack.co/bank/resolve?account_number=${accountNumber.value}&bank_code=${selectedBank.value.code}`,
          header
        );
        console.log(data);
        accountName.value = data.data.account_name;
        accNameRef.value.focus();

        loading.value = false;
      } catch (error) {
        finish();
        console.log(error);
        loading.value = false;
      }
      console.log(selectedBank.value.code, accountNumber.value);
    };

    const closeModalButton = ref(null);
    const formsArr = ref([]);
    const formCreated = (data) => {
      closeModalButton.value.click();
      closeModalButtonForm.value.click();
      console.log(data);
      formsArr.value.push({
        name: data.name,
        accountName: data.accountName,
        bank: data.bank,
      });
    };

    const closeModal = (bankDetails) => {
      toast.add({
        severity: "success",
        summary: "Bank Details Successfully Added",
        detail: "The account was added successful",
        life: 4000,
      });
      closeModalButton.value.click();
      console.log(bankDetails, "bankDetails list");
      bankAccounts.value.push({
        accountName: bankDetails.bankName,
        accountNumber: bankDetails.bankNumber,
        description: bankDetails.description
      });
    };

    const getPaymentForm = () => {
      axios
        .get("/api/PaymentForm/GetAll")
        .then((res) => {
          formsArr.value = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getPaymentForm();

    const getAllChurchBank = () => {
      axios
        .get("/getAllChurchBanks")
        .then((res) => {
          console.log(res, "all bank details");
          bankAccounts.value = res.data.returnObject;
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getAllChurchBank();

    const showConfirmModalBank = (id) => {
      confirm.require({
        message: "Are you sure you want to proceed?",
        header: "Confirmation",
        icon: "pi pi-exclamation-triangle",
        acceptClass: "confirm-delete",
        rejectClass: "cancel-delete",
        accept: () => {
          deleteBankUser(id);
          // toast.add({severity:'info', summary:'Confirmed', detail:'Member Deleted', life: 3000});
        },
        reject: () => {
          toast.add({
            severity: "info",
            summary: "Rejected",
            detail: "You have rejected",
            life: 3000,
          });
        },
      });
    };
    const deleteBankUser = (id) => {
      axios
        .delete(`deleteTenantBank?Id=${id}`)
        .then((res) => {
          // alert('deleted');
          console.log(res, "deleted bank user");
          toast.add({
            severity: "success",
            summary: "Confirmed",
            detail: `${res.data.response}`,
            life: 4000,
          });
          bankAccounts.value = bankAccounts.value.filter(
            (tenant) => tenant.id !== id
          );
        })
        .catch((err) => {
          console.log(err);
          toast.add({
            severity: "error",
            summary: "Unable to delete",
            detail: "An error occurred, please try again",
            life: 4000,
          });
        });
    };

    const skip = () => {
      setupSpinner.value = true;
      const currentUser = store.getters.currentUser;
      axios
        .post(
          `/mobile/v1/Feeds/SetupChurchPostCategories?tenantID=${currentUser.tenantId}`
        )
        .then((res) => {
          console.log(res);
          setTimeout(() => {
            router.push({ name: "OnboardingSuccessful" });
          }, 1000);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    return {
      nigerianBanks,
      selectedBank,
      accountNumber,
      completeSetUp,
      slide,
      accountName,
      resolveCustomerDetail,
      loading,
      accNameRef,
      banks,
      formCreated,
      closeModalButton,
      formsArr,
      skip,
      setupSpinner,
      closeModal,
      bankAccounts,
      deleteBankUser,
      showConfirmModalBank,
      closeModalButtonForm,
    };
  },
};
</script>
<style scoped>
.table-header1 {
  background: #f1f3f9;
  color: #8898aa;
  font-size: 11px;
  text-align: left;
  box-shadow: 0px 3px 6px #2c28281c;
  width: 25vw;
  padding: 0.5rem 0;
  max-width: 0;
}

.table-border {
  border-radius: 0;
}

.setup {
  color: #031c39;
  font: normal normal 800 30px/40px Nunito Sans;
}
.check-icon {
  height: 30px;
  width: 30px;
  border-radius: 50%;
  background-color: #136acd;
}
.pi {
  color: #fff;
  margin-top: 6px;
  margin-left: 2px;
}
.btn-button {
  border-radius: 25px !important;
  width: 40%;
  height: 25px;
  line-height: 10px;
}

.bg-image {
  background-image: url("../../../assets/mobileonboarding/onlineDonation.svg");
  background-repeat: no-repeat, repeat;
  background-size: cover;
  height: 100vh;
  width: 100%;
}
.image-dis {
  display: flex;
  justify-content: center;
  align-items: center;
}
.next-btn {
  background: #f1faff 0% 0% no-repeat padding-box;
  border: 0.20000000298023224px solid #7894a6;
  border-radius: 23px;
  opacity: 1;
}
.next-text {
  font: normal normal bold 16px/22px Nunito Sans;
  letter-spacing: 0px;
  color: #136acd;
  opacity: 1;
}
.step {
  font: normal normal bold 18px/24px Nunito Sans;
  letter-spacing: 0px;
  color: #ffffff;
  opacity: 1;
}
/* Add pastor style */
.modal-title {
  margin-left: 2rem;
}
.form-cover {
  margin-left: 1.5rem !important;
  width: 100%;
}
.form-group {
  margin-top: 0rem !important;
}
.form-group label {
  padding-top: 0;
  font-weight: bold;
}

.form-control {
  width: 98%;
}

.select option {
  width: 150px;
}

.upload-Btn {
  border-radius: 25px;
  height: 30px;
  width: 90px;
  line-height: 15px;
}

.container {
  width: 100%;
  height: 35vh;

  border-radius: 27px !important;
  background: rgb(248, 248, 249);
  margin-top: 0.3rem;
}

.photo-box {
  border-radius: 27px;
  width: 95%;
  height: 55%;
  background-color: rgb(100%, 100%, 100%);
  margin-bottom: 0.75rem;
  margin-top: 0.75rem;
}

.social-input {
  display: block;
  width: 100%;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  /* end add pastor detail */
}
.bg-mission {
  background: #dedede61 0% 0% no-repeat padding-box;
  border: 1px solid #d2cfcf5c;
  border-radius: 24px;
  opacity: 0.64;
  height: 30px;
  padding-right: 50px;
}
.mission {
  font: normal normal bold 16px/22px Nunito Sans;
  letter-spacing: 0px;
  color: #002044;
}
.edit {
  font: normal normal bold 16px/22px Nunito Sans;
  letter-spacing: 0px;
  color: #136acd;
  cursor: pointer;
}

.pastors-name {
  font: normal normal 600 16px/22px Nunito Sans;
}

.edit-pastor-details {
  font: normal normal bold 16px/22px Nunito Sans;
  letter-spacing: 0px;
  color: #136acd;
  cursor: pointer;
}

.btnIcons {
  color: #136acd;
  background-color: #dde2e6;
  border-radius: 40px;
  border: none;
  padding: 7px;
  text-align: center;
}

.slide-left {
  transition: all 1s ease-in-out;
  transform: translateX(-100%);
}

.slide-right {
  transition: all 1s ease-in-out;
  transform: translateX(100%);
}

.events {
  font: normal normal 800 28px Nunito sans;
}

.dropdown-menu {
  max-height: 300px;
  overflow: auto;
}

.skip-text {
  background: rgba(0, 0, 0, 0.707);
  position: fixed;
  top: 32em;
  width: 20%;
}
</style>
