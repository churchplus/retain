<template>
  <div class="container-fluid">
    <form class="form px-0 pt-2">
      <div class="row">
        <div
          class="
            col-10
            offset-sm-1 offset-md-0
            col-md-3 col-lg-4
            text-md-right
            align-self-center
          "
        >
          <div>Name</div>
        </div>
        <div
          class="
            pl-md-0
            col-12 col-sm-10
            offset-sm-1 offset-md-0
            col-md-6
            pl-md-0
            mt-3
          "
          style="height: 43px"
        >
          <input
            class="form-control h-100"
            placeholder="Enter name"
            v-model="newContribution.name"
            type="text"
            required
          />
        </div>
      </div>
      <div
        class="row mt-2"
        v-for="(item, index) in newContribution.payment"
        :key="index"
      >
        <div
          class="
            col-10
            offset-sm-1 offset-md-0
            col-md-3 col-lg-4
            text-md-right
            align-self-center
          "
        >
          <div>Contribution Item</div>
        </div>

        <div class="col-10 offset-sm-1 offset-md-0 col-md-6 pl-md-0 mt-3">
          <button
            class="default-btn w-100 text-left pr-1"
            type="button"
            style="
              border-radius: 4px;
              border: 1px solid #ced4da;
              color: #6c757d;
            "
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {{
              item && item.financialContribution
                ? item.financialContribution.name
                : "Select"
            }}
            <i class="pi pi-chevron-down manual-dd-icon float-right pr-1"></i>
          </button>
          <div class="dropdown-menu w-100" aria-labelledby="dropdownMenuButton">
            <div class="row w-100 mx-auto">
              <div class="col-md-12">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Select contribution item"
                />
              </div>
            </div>

            <a
              class="dropdown-item font-weight-700 small-text py-2 c-pointer"
              v-for="(itm, indx) in contributionItems"
              :key="indx"
              @click="selectContribution(itm, index)"
              >{{ itm.name }}</a
            >
            <a
              class="
                font-weight-bold
                small-text
                d-flex
                justify-content-center
                py-2
                text-decoration-none
                primary-text
              "
              style="border-top: 1px solid #002044; color: #136acd"
              href="#"
              type="button"
              data-toggle="modal"
              data-target="#exampleModalCenter"
            >
              <i
                class="pi pi-plus-circle mr-2 d-flex align-items-center"
                style="color: #136acd"
              ></i>
              Create new Contribution Item
            </a>
          </div>
        </div>

        <!-- Modal -->
        <div
          class="modal fade"
          id="exampleModalCenter"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div
            class="modal-dialog modal-lg modal-dialog-centered"
            role="document"
          >
            <div class="modal-content">
              <div class="modal-header" style="border: none">
                <h5 class="modal-title" id="exampleModalLongTitle">
                  Add Contribution
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <ContributionItems @item-name="newConItems" />
              </div>
            </div>
          </div>
        </div>
        <div class="col-1 align-self-center">
          <i
            class="pi pi-trash"
            v-tooltip.bottom="'delete'"
            @click="showConfirmModal(item.financialContribution.id, index)"
          ></i>
        </div>
      </div>
      <div class="col-8 col-md-5 offset-sm-1 offset-md-3 pl-0 offset-lg-4 mt-3">
        <button
          style="margin-left: -3px"
          v-on:click.prevent="addContribution"
          class="btn btnIcons btn-secondary"
        >
          <i class="pi pi-plus-circle icons" aria-hidden="true"></i>
          Add
        </button>
      </div>
      <div class="row">
        <div class="col-12">
          <hr class="mt-4" />
        </div>

        <div
          class="
            mt-3
            col-10
            offset-sm-1 offset-md-0
            col-md-3 col-lg-4
            text-md-right
            align-self-center
          "
        >
          <div>Choose Bank</div>
        </div>
        <div
          class="col-12 offset-sm-1 offset-md-0 col-md-6 pl-md-0 mt-3"
          style="height: 43px"
        >
          <div class="dropdown">
            <button
              class="
                btn
                border
                w-100
                phone-input
                default-btn
                d-flex
                justify-content-between
                align-items-center
              "
              style="border-radius: 4px;"
              type="button"
              id="dropdownBankList"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <div>
                {{
                  selectedBank && Object.keys(selectedBank).length > 0
                    ? selectedBank.name
                    : "Select bank"
                }}
              </div>
              <i class="pi pi-chevron-down"></i>
            </button>
            <div class="dropdown-menu w-100" aria-labelledby="dropdownBankList">
              <a
                class="dropdown-item c-pointer"
                v-for="item in nigerianBanks"
                :key="item.id"
              >
                <div @click="setSelectedBank(item)">{{ item.name }}</div>
              </a>
            </div>
          </div>
        </div>
        <div class="col-2 d-none d-sm-block"></div>

        <div
          class="
            mt-3
            col-10
            offset-sm-1 offset-md-0
            col-md-3 col-lg-4
            text-md-right
            align-self-center
          "
        >
          <div>Enter account number</div>
        </div>
        <div
          class="col-12 col-sm-10 offset-sm-1 offset-md-0 col-md-6 pl-md-0 mt-3"
          style="height: 43px"
        >
          <el-input
            class="w-100"
            size="large"
            v-model="accountNumber"
            @blur="resolveCustomerDetail"
          />
        </div>
        <div class="col-2 d-none d-sm-block">
          <div
            class="spinner-border text-primary"
            style="width: 3rem; height: 3rem"
            role="status"
            v-if="loading"
          >
            <span class="sr-only">Loading...</span>
          </div>
        </div>

        <div
          class="
            mt-3
            col-10
            offset-sm-1 offset-md-0
            col-md-3 col-lg-4
            text-md-right
            align-self-center
          "
        >
          <div>Account Name</div>
        </div>
        <div
          class="col-12 col-sm-10 offset-sm-1 offset-md-0 col-md-6 pl-md-0 mt-3"
          style="height: 43px"
        >
          <input
            type="text"
            v-model="accountName"
            placeholder="Account name"
            ref="accNameRef"
            class="form-control h-100"
            disabled
          />
          <div class="mt-1">
            <em class="mt-1"
              >This will automatically come up, kindly confirm before clicking
              on save.</em
            >
          </div>
        </div>
        <div class="col-sm-3 align-self-end"></div>

        <div
          class="col-12 mt-5 d-flex align-items-center c-pointer"
          @click="showPaymentSection"
        >
          <p class="mb-0" style="width: 100px">Payment</p>
          <hr class="mt-4" style="width: calc(100% - 80px)" />
          <span><i class="pi pi-angle-down"></i></span>
        </div>

        <!-- <div class="mt-3 col-10 offset-sm-1 offset-md-0 col-md-3 col-lg-4 text-md-right align-self-center">
                    <div>Payment Gateway</div>
                </div> -->
        <div
          class="
            d-flex
            justify-content-center
            col-12 col-sm-10
            offset-sm-3
            col-md-6 col-lg-5
            pl-md-0
            mt-3
          "
          style="height: 43px"
          v-if="paymentGatewayNeeded.name"
          :class="{
            'payment-section': paymentSectionIsShown,
            'payment-section-hidden': !paymentSectionIsShown,
          }"
        >
          <input type="checkbox" class="px-2" checked />
          <h6 class="px-2">{{ paymentGatewayNeeded.name }}</h6>
        </div>
      </div>

      <div class="row" v-if="false">
        <div class="col-10 col-md-12 mt-4">
          <div class="d-flex">
            <h5 class="header-contri my-3">
              Choose the form template you desire
            </h5>
            <hr style="width: 60%" />
            <i
              class="pi pi-angle-up angle-icon mt-3"
              :class="{
                rollIcon: templateDisplay,
                closeIcon: !templateDisplay,
              }"
              @click="toggleTemplate"
            ></i>
          </div>

          <div
            class="row img-row hide-tem mt-4"
            :class="{
              'show-tem': templateDisplay,
              'hide-tem': !templateDisplay,
            }"
          >
            <div class="col-sm-6 col-lg-4 mt-3">
              <img
                src="../../assets/giving1.png"
                class="w-100"
                ref="myImg"
                id="myImg"
                @click="togglePopup"
              />
              <div class="col-sm-12 d-flex justify-content-between mt-4">
                <i class="check-it mr-2" @click="toggleFirstTemplate">
                  <span class="child" v-if="firstTemplate"></span>
                </i>
                <h6 class="preview" @click="togglePopup">Preview</h6>
              </div>
            </div>
            <ImageModal
              :src="sourceModal"
              :booleanModal="booleanModal"
              @close-modal="closeModal"
            />
            <!-- <div ref="modal" class="modal">
                            <span class="close">&times;</span>
                            <img class="modal-conent" ref="img01">
                            <div ref="caption"></div>
                        </div> -->
            <div class="col-sm-6 col-lg-4 mt-3">
              <img
                src="../../assets/giving2.png"
                class="w-100"
                style="height: 83%"
                ref="myImg"
                id="myImg"
                @click="togglePopup"
              />
              <div class="col-sm-12 d-flex justify-content-between mt-4">
                <i class="check-it mr-2" @click="toggleSecondTemplate">
                  <span class="child" v-if="secondTemplate"></span>
                </i>
                <h6 class="preview" @click="togglePopup">Preview</h6>
              </div>
            </div>
            <div class="col-sm-6 col-lg-4 mt-3">
              <img
                src="../../assets/giving3.png"
                class="w-100"
                ref="myImg"
                id="myImg"
                @click="togglePopup"
              />
              <div class="col-sm-12 d-flex justify-content-between mt-4">
                <i class="check-it mr-2" @click="toggleThirdTemplate">
                  <span class="child" v-if="thirdTemplate"></span>
                </i>
                <h6 class="preview" @click="togglePopup">Preview</h6>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div
          class="
            col-12 col-sm-10 col-md-6 col-lg-5
            offset-sm-1 offset-md-3 offset-lg-4
            pl-0
            mt-3
          "
        >
          <button
            class="button border-0 w-100"
            :class="{ 'disabled-bg': disabled, 'primary-bg': !disabled }"
            @click.prevent="saveAndContinue"
            style="margin-left: 2px"
          >
            <i
              class="fas fa-circle-notch fa-spin mr-2 text-white"
              v-if="loadingSave"
            ></i>
            <span class="text-white">Save and Continue</span>
            <span></span>
          </button>
        </div>
      </div>
    </form>
    <ConfirmDialog />
    <Toast />
  </div>
</template>

<script>
import { ref, computed } from "vue";
import Dropdown from "primevue/dropdown";
import Tooltip from "primevue/tooltip";
import axios from "@/gateway/backendapi";
import finish from "../../services/progressbar/progress";
import axio from "axios";
import { useStore } from "vuex";
import router from "@/router/index";
import { useRoute } from "vue-router";
// import Store from "../../store/store"
import { useToast } from "primevue/usetoast";
import store from "../../store/store";
import ContributionItems from "@/components/firsttimer/contributionItemModal";
import ImageModal from "../../views/donation/ImageModal";
// import ToggleButton from  '../../views/donation/toggleButton'
import { useConfirm } from "primevue/useconfirm";

export default {
  components: {
    Dropdown,
    ContributionItems,
    ImageModal,
  },
  props: ["header"],
  emits: ["formcreated"],
  directives: {
    tooltip: Tooltip,
  },
  setup(prop, { emit }) {
    const contributionItems = ref([]);
    const newContribution = ref({ payment: [{}] });
    const nigerianBanks = ref([]);
    const selectedBank = ref("");
    const accountNumber = ref("");
    const selectedContribution = ref("");
    const accountName = ref("");
    const accNameRef = ref("");
    const toast = useToast();
    const loading = ref(false);
    const disabled = ref(true);
    const route = useRoute();
    const firstTemplate = ref(true);
    const secondTemplate = ref(false);
    const thirdTemplate = ref(false);
    const sourceModal = ref("");
    const booleanModal = ref(false);
    const paymentGateWaysDb = ref([]);
    const paymentGateWays = ref([]);
    const loadingSave = ref(false);
    const loadingEdit = ref(false);
    const removeContributionIDs = ref([]);
    const removePaymentGatewayIDs = ref([]);
    const isActive = ref(null);
    const routeParams = ref(route.params.editPayment);
    const theContributionItems = ref([]);
    const templateDisplay = ref(false);
    const paymentSectionIsShown = ref(false);

    const showPaymentSection = () => {
      paymentSectionIsShown.value = !paymentSectionIsShown.value;
    };

    const addContribution = () => {
      newContribution.value.payment.push({
        financialContribution: {},
      });
      console.log(newContribution.value);
    };

    const getContributionItems = async () => {
      // To get from store use useStore, to save to store use the path that leads to store
      const store = useStore();
      let storedItems = store.getters["contributions/contributionItems"];
      if (storedItems.length > 0) {
        contributionItems.value =
          store.getters["contributions/contributionItems"];
      } else {
        try {
          const { data } = await axios.get(
            "/api/financials/contributions/items"
          );
          console.log(data);
          contributionItems.value = data;
        } catch (error) {
          finish();
          console.log(error);
        }
      }
    };
    getContributionItems();

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

    const paymentGatewayNeeded = ref({});
    const getGateWays = () => {
      // if (!route.params.editPayment) {
      axios
        .get("/api/Financials/GetPaymentGateways")
        .then((res) => {
          console.log(res);
          paymentGateWaysDb.value = res.data.map((i) => {
            return {
              countryCoverageArea: i.countryCoverageArea,
              id: i.id,
              isActive: i.isActive,
              isSubAccountSupported: i.isSubAccountSupported,
              name: i.name,
              isChecked: false,
            };
          });
          paymentGatewayNeeded.value = paymentGateWaysDb.value.find(
            (i) => i.name === "Paystack"
          );
          console.log(paymentGatewayNeeded.value, "God is Good");
          console.log(paymentGateWaysDb.value);
          // nigerianBanks.value = res.data.data
          finish();
        })
        .catch((err) => {
          finish();
          console.log(err);
          toast.add({
            severity: "info",
            summary: "Unable to get banks",
            detail:
              "Please ensure you have a strong internet connection and reload the  page",
            life: 5000,
          });
        });
    };
    //   }
    getGateWays();

    // const deleteContribution = (item, index) => {
    //
    // if (route.params.editPayment) {
    //     console.log(item)
    //     removeContributionIDs.value.push(item.id)

    //     console.log(removeContributionIDs.value)
    // }

    // }

    const confirm = useConfirm();
    const showConfirmModal = (id, index) => {
      confirm.require({
        message: "Are you sure you want to proceed?",
        header: "Confirmation",
        icon: "pi pi-exclamation-triangle",
        acceptClass: "confirm-delete",
        rejectClass: "cancel-delete",
        accept: () => {
          console.log(id, index);
          deleteContribution(id, index);
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

    const deleteContribution = (id, index) => {
      console.log(id, index);
      newContribution.value.payment.splice(index, 1);
      //   axios
      //     .delete(
      //       `/mobile/v1/PaymentForm/contributionItem?contributionItemID=${id}`
      //     )
      //     .then((res) => {
      //       console.log(res);
      //       if (res.data) {
      //         toast.add({
      //           severity: "success",
      //           summary: "Delete Successful",
      //           detail: `Contribution Transaction Deleted`,
      //           life: 3000,
      //         });
      //       } else {
      //         toast.add({
      //           severity: "warn",
      //           summary: "Delete Failed",
      //           detail: `Please Try Again`,
      //           life: 3000,
      //         });
      //       }
      //     })
      //     .catch((err) => {
      //       finish();
      //       if (err.response) {
      //         console.log(err.response);
      //         toast.add({
      //           severity: "warn",
      //           summary: "Unable to delete",
      //           detail: `${err.response}`,
      //           life: 3000,
      //         });
      //       } else if (err.toString().toLowerCase().includes("network error")) {
      //         toast.add({
      //           severity: "warn",
      //           summary: "Network Error",
      //           detail: `Please Ensure you have a strong internet connection`,
      //           life: 3000,
      //         });
      //       } else if (err.toString().toLowerCase().includes("timeout")) {
      //         toast.add({
      //           severity: "warn",
      //           summary: "Request Delayed",
      //           detail: "Make sure you have a strong internet connection",
      //           life: 3000,
      //         });
      //       } else {
      //         toast.add({
      //           severity: "warn",
      //           summary: "Delete Failed",
      //           detail: `Please Try Again`,
      //           life: 3000,
      //         });
      //       }
      //       console.log(err);
      //     });
    };

    const resolveCustomerDetail = async () => {
      loading.value = true;

      try {
        let { data } = await axio.post(
          `https://api.ravepay.co/flwv3-pug/getpaidx/api/resolve_account`,
          {
            recipientaccount: accountNumber.value,
            destbankcode: selectedBank.value.code,
            PBFPubKey: process.env.VUE_APP_FLUTTERWAVE_PUBLIC_KEY_LIVE,
          }
        );
        console.log(data);
        accountName.value = data.data.data.accountname;
        disabled.value = false;

        loading.value = false;

        if (data.data.data.responsemessage.toLowerCase().includes("sorry")) {
          toast.add({
            severity: "warn",
            summary: "Unable to verify",
            detail: data.data.data.responsemessage,
            life: 8000,
          });
        } else {
          toast.add({
            severity: "success",
            summary: "Account Check Successful",
            detail: "The account check was successful",
            life: 8000,
          });
        }
      } catch (error) {
        finish();
        console.log(error);

        loading.value = false;

        if (!accountNumber.value || accountNumber.value === "") {
          toast.add({
            severity: "warn",
            summary: "No account number found",
            detail: "Please enter your account number",
            life: 4000,
          });
        } else {
          toast.add({
            severity: "error",
            summary: "Account Check Error",
            detail: "Please check your banks details again",
            life: 4000,
          });
        }
      }
    };

    const toggleCheckBox = (item) => {
      item.isChecked = !item.isChecked;

      if (
        item.isChecked &&
        paymentGateWays.value.findIndex((i) => i.id === item.id) < 0
      ) {
        paymentGateWays.value.push(item);
      } else {
        paymentGateWays.value = paymentGateWays.value.filter((i) => {
          return i.id !== item.id;
        });
        // console.log(item.id)
        // if (removePaymentGatewayIDs.value.findIndex(i => i.id === item.id) > 0) {
        removePaymentGatewayIDs.value.push(item.id);
        // }
        // console.log(removePaymentGatewayIDs.value)
      }
      // console.log(item, paymentGateWaysDb.value)
    };

    const saveAndContinue = async () => {
      loadingSave.value = true;

      let removeEmptyObj = newContribution.value.payment.filter((i) => {
        return Object.keys(i.financialContribution).length > 0;
      });

      let paymentForm = {
        name: newContribution.value.name,
        bankCode: selectedBank.value.code,
        accountName: accountName.value,
        accountNumber: accountNumber.value,
        isActive: isActive.value,
        contributionItems: removeEmptyObj.map((i) => {
          let id = i.financialContribution.id;
          return { financialContributionID: id };
        }),
        paymentGateWays: [{ paymentGateWayID: paymentGatewayNeeded.value.id }],
      };

      if (!route.params.editPayment) {
        try {
          const res = await axios.post(
            "/api/PaymentForm/newpaymentform",
            paymentForm
          );
          console.log(res);
          loadingSave.value = false;
          // toast.add({severity:'success', summary: 'Account Check Error', detail:'Please check your banks details again', life: 3000});
          // store.dispatch('contributions/paymentData', res.data)

          finish();
          paymentForm.bank = selectedBank.value.name;
          emit("formcreated", paymentForm);
        } catch (err) {
          finish();
          console.log(err);
          loadingSave.value = false;

          // toast.add({severity:'error', summary: '', detail:'Please check your banks details again', life: 3000});
        }
      } else {
        (paymentForm.contributionItems = newContribution.value.payment.map(
          (i) => {
            return { financialContributionID: i.financialContribution.id };
          }
        )),
          // paymentForm.contributionItems = theContributionItems.value.map(i => {
          //     return {
          //         financialContributionID: i.financialContributionID,
          //         id: i.id,
          //         paymentFormID: i.paymentFormID
          //     }
          // })
          (paymentForm.id = route.params.editPayment);
        paymentForm.removeContributionIDs = removeContributionIDs.value;
        paymentForm.removePaymentGatewayIDs = removePaymentGatewayIDs.value;
        try {
          const res = await axios.put(`/api/PaymentForm/update`, paymentForm);
          console.log(res);
          loadingSave.value = false;
          store.dispatch("contributions/paymentData", res.data);
          router.push({
            name: "PaymentOption",
            params: { paymentId: res.data.id },
          });

          finish();
        } catch (err) {
          console.log(err);
          loadingSave.value = false;
          finish();

          // toast.add({severity:'error', summary: '', detail:'Please check your banks details again', life: 3000});
        }
      }
    };
    const selectContribution = (item, index) => {
      // if (newContribution.value.payment.findIndex(i => i.id === item.id) < 0) {
      // newContribution.value.payment[newContribution.value.payment.length - 1] = item
      newContribution.value.payment[index].financialContribution = item;
      // }   else {
      console.log("Youve selected this, please select another");
      // }
      // newContribution.value.offType = e.target.innerText
      // newContribution.value.payment.push(item)
      console.log(item, index, newContribution.value.payment);
    };

    // const getSavedPayments = async () => {
    //     try {
    //         const res = await axios.get("/api/PaymentForm/GetAll");
    //         console.log(res)
    //     }
    //     catch (err) {
    //         console.log(err)
    //     }
    // }
    // getSavedPayments()

    const active = (payload) => {
      isActive.value = payload;
    };

    const getEditPayment = async () => {
      loadingEdit.value = true;
      if (route.params.editPayment) {
        try {
          const res = await axios.get(
            `/api/PaymentForm/GetOne?paymentFormID=${route.params.editPayment}`
          );
          console.log(res);
          loadingEdit.value = false;
          newContribution.value.name = res.data.name;
          theContributionItems.value = res.data.contributionItems;
          newContribution.value.payment = res.data.contributionItems.map(
            (i) => i
          );
          accountNumber.value = res.data.accountNumber;
          accountName.value = res.data.accountName;
          (selectedBank.value = {
            name:
              nigerianBanks.value.length > 0
                ? nigerianBanks.value.find((i) => i.id === res.data.bankID).name
                : [],
            id: res.data.bankID,
          }),
            (isActive.value = res.data.isActive);
          paymentGateWays.value = res.data.paymentGateWays.map((i) => {
            return {
              name: i.paymentGateway.name,
              countryCoverageArea: i.paymentGateway.countryCoverageArea,
              id: i.paymentGateway.id,
              isActive: i.paymentGateway.isActive,
              isSubAccountSupported: i.paymentGateway.isSubAccountSupported,
            };
          });
          console.log(newContribution.value.payment);

          disabled.value = false;
        } catch (err) {
          console.log(err);
          finish();
          toast.add({
            severity: "error",
            summary: "Network Error",
            detail: "Please ensure you have a strong internet connection",
            life: 6000,
          });
        }
      } else {
        isActive.value = true;
      }
    };
    getEditPayment();

    const gateways = computed(() => {
      // if (!route.params.editPayment) return paymentGateWaysDb.value;
      const x = paymentGateWaysDb.value.filter((i) => {
        const index = paymentGateWays.value.findIndex((j) => j.id === i.id);
        if (index >= 0) {
          i.isChecked = true;
        }

        // alert(i)
        return i;
      });
      // const x = paymentGateWaysDb.value.filter(i => (paymentGateWays.value.findIndex(j => j.paymentGateWayID === i.id)) >= 0)
      // console.log(x, "XXX");

      return x;
    });

    const newConItems = (payload) => {
      console.log(payload);
      contributionItems.value.push(payload);
      newContribution.value.payment[newContribution.value.payment.length - 1] =
        payload;
    };

    const toggleFirstTemplate = () => {
      firstTemplate.value = !firstTemplate.value;
      secondTemplate.value = false;
      thirdTemplate.value = false;
    };

    const toggleSecondTemplate = () => {
      secondTemplate.value = !secondTemplate.value;
      firstTemplate.value = false;
      thirdTemplate.value = false;
    };

    const toggleThirdTemplate = () => {
      thirdTemplate.value = !thirdTemplate.value;
      firstTemplate.value = false;
      secondTemplate.value = false;
    };

    const togglePopup = (e) => {
      if (e.target.localName == "img") {
        booleanModal.value = true;
        sourceModal.value = e.target.src;
      } else {
        booleanModal.value = true;
        sourceModal.value =
          e.target.parentElement.previousElementSibling.currentSrc;
      }
      // console.log(e)
    };

    const closeModal = (payload) => {
      booleanModal.value = payload;
    };

    const toggleTemplate = () => {
      templateDisplay.value = !templateDisplay.value;
    };

    const setSelectedBank = (payload) => {
      selectedBank.value = payload;
    };

    return {
      contributionItems,
      newContribution,
      addContribution,
      deleteContribution,
      nigerianBanks,
      selectedBank,
      resolveCustomerDetail,
      accountNumber,
      saveAndContinue,
      selectContribution,
      selectedContribution,
      accountName,
      accNameRef,
      loading,
      loadingSave,
      loadingEdit,
      disabled,
      newConItems,
      firstTemplate,
      secondTemplate,
      thirdTemplate,
      toggleFirstTemplate,
      toggleSecondTemplate,
      toggleThirdTemplate,
      sourceModal,
      togglePopup,
      booleanModal,
      closeModal,
      paymentGateWaysDb,
      paymentGateWays,
      toggleCheckBox,
      gateways,
      removeContributionIDs,
      removePaymentGatewayIDs,
      isActive,
      routeParams,
      theContributionItems,
      templateDisplay,
      toggleTemplate,
      showConfirmModal,
      paymentGatewayNeeded,
      showPaymentSection,
      paymentSectionIsShown,
      setSelectedBank,
    };
  },
};
</script>

<style scoped>
.payment-section-hidden {
  transition: all 0.8s ease-in-out;
  height: 0 !important;
  overflow: hidden !important;
}

.payment-section {
  transition: all 0.8s ease-in-out;
  height: 25px !important;
  overflow: hidden !important;
}

.form {
  padding: 25px;
}

.btnIcons {
  width: 140px;
  height: 35px;
  color: #136acd;
  background-color: #dde2e6;
  border-radius: 40px;
  border: none;
}

.page-header {
  font: normal normal 800 29px Nunito sans;
}

.contri-item {
  padding: 20px 0 0 0;
  font: normal normal 700 20px Nunito Sans;
}

.disabled-bg {
  background: #136acda8;
  cursor: not-allowed;
}

.dropdown-menu {
  max-height: 300px;
  overflow: auto;
}

.check-box {
  border: 2px solid #136acdcc;
  min-width: 20px;
  max-width: 20px;
  height: 20px;
  /* border-radius: 50%; */
  margin-top: -1px;
}

.check-box .child {
  /* border: 2px solid red; */
  /* display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #136acd;
  position: relative;
  left: 3px;
  top: -3px; */
  margin-top: -8px;
}

.img-row img {
  box-shadow: 0px 3px 6px #2c28281c;
  /* border: 2px solid red; */
  border-radius: 15px;
}

.check-it {
  border: 2px solid #136acd;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-top: -1px;
}

.check-it .child {
  /* border: 2px solid red; */
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #136acd;
  position: relative;
  left: 3px;
  top: -4px;
}

#myImg {
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
}

#myImg:hover {
  opacity: 0.7;
}

.preview {
  font-size: 0.8em;
  color: #136acd;
  font-style: italic;
  cursor: pointer;
}

.header-contri {
  font-size: 20px;
  font-weight: 700;
}

.angle-icon {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  border: 1px solid rgb(73, 73, 73);
  padding: 3px;
}

.hide-tem {
  height: 0;
  overflow: hidden;
  transition: all 0.5s ease-in-out;
}

.show-tem {
  height: 335px;
  overflow: hidden;
  transition: all 0.5s ease-in-out;
}

.rollIcon {
  transform: rotateZ(180deg);
  transition: all 0.5s ease-in-out;
}

.closeIcon {
  transform: rotateZ(0deg);
  transition: all 0.5s ease-in-out;
}

.dropdown-menu {
  max-height: 300px;
  overflow: scroll;
  box-shadow: 0 2px 4px -1px rgb(0 0 0 / 20%), 0 4px 5px 0 rgb(0 0 0 / 14%),
    0 1px 10px 0 rgb(0 0 0 / 12%);
}
</style>