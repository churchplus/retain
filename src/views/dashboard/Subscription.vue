<template>
  <div class="container-wide container-top">
    <div class="row mt-5">
      <div class="col-12 pl-md-0 header">Subscription</div>
      <div class="col-12 normal-text mt-3 pl-md-0">
        Select the subscription that suit your church and the additional tolls
        you need for your church growth.
      </div>

      <div
        class="col-md-4 col-lg-4 col-12 offset-md-1 sub mt-5 d-block d-md-none card-bg"
      >
        <div class="row rounded pb-2">
          <div class="col-12 col-sm-6">
            <div class="small-header">Current plan</div>
            <div class="normal-text mt-1">{{ currentPlan }}</div>
          </div>
          <div class="col-12 col-sm-6 mt-3 mt-sm-0">
            <div class="small-header">Expiry Date</div>
            <div class="normal-text mt-1">{{ expiryDate }}</div>
          </div>
        </div>
      </div>

      <div class="col-md-6 mt-5">
        <div class="row bg-white pb-4 sub">
          <div class="col-md-6 col-lg-6 col-12">
            <div class="py-2 small-header">
              Select Subscription Plan <span class="text-danger">*</span>
            </div>
            <el-select-v2
              :options="
                UserSubscriptionPlans.map((i) => ({
                  label: i.description,
                  value: i.id,
                }))
              "
              v-model="selectedPlanId"
              placeholder="Select plan"
              @change="setSelectedPlan"
              size="large"
              class="w-100"
            />
            <div
              class="mt-3 normal-text text-right text-md-left italic pl-md-0"
            >
              Membership:
              {{
                selectedPlan && selectedPlan.membershipSize
                  ? selectedPlan.membershipSize.toLocaleString()
                  : ""
              }}
            </div>
          </div>
          <div class="col-md-6 col-lg-6 col-12">
            <div class="py-2 small-header">Select Duration (month)</div>
            <el-select-v2
              :options="
                selectMonths.map((i) => ({ label: i.name, value: i.name }))
              "
              v-model="selectMonthId"
              placeholder="Select duration"
              @change="setSelectedDuration"
              size="large"
              class="w-100"
            />
            <div class="ml-1 mt-3 normal-text pl-md-0">
              {{
                selectedPlan &&
                Object.keys(selectedPlan).length > 0 &&
                selectedPlan.currency
                  ? selectedPlan.currency.symbol
                  : ""
              }}
              {{ subselectedDuratn.toLocaleString() }}
            </div>
          </div>
        </div>
      </div>

      <div
        class="col-md-4 col-lg-4 col-12 offset-md-1 sub mt-5 d-none d-md-block card-bg"
      >
        <div class="row rounded pb-2">
          <div class="col-12">
            <div class="small-header">Current plan</div>
            <div class="normal-text mt-1">{{ currentPlan }}</div>
          </div>
          <div class="col-12 mt-2">
            <div class="small-header">Expiry Date</div>
            <div class="normal-text mt-1">{{ expiryDate }}</div>
          </div>
        </div>
      </div>

      <!-- Add ons -->
      <div class="col-md-12 col-lg-12 pt-3 mt-3">ADD-ONS</div>

      <div v-if="false" class="col-md-6 col-lg-6 p-4 sub mt-3 bg-white">
        <div class="">
          <div class="small-header">Communication</div>
          <div class="row mt-3 normal-text">
            <div class="col-md-2 col-lg-2 col-4">SMS</div>
            <div class="col-md-6 offset-md-1 col-4 mb-2">
              <input
                type="number"
                v-model.number="smsValue"
                class="form-control w-50"
                placeholder="SMS Unit"
              />
            </div>
            <div class="col-md-2 col-4">
              {{ smsAmount }}
            </div>
          </div>
          <div class="row mt-2 normal-text">
            <div class="col-md-2 col-lg-2 col-4">Email</div>
            <div class="col-md-6 offset-md-1 col-4">
              <el-select-v2
                :options="
                  selectEmailUnit.map((i) => ({ label: i.name, value: i.name }))
                "
                v-model="selectEmail"
                placeholder="Email unit"
                size="large"
                class="w-100"
              />
            </div>
            <div class="col-md-2 col-4">
              {{ selectEmail.constValue ? emailAmount : 0 }}
            </div>
          </div>
          <div class="my-3 small-header">
            Accounting <br /><small
              >Product price is multiplied by subscrption duration</small
            >
          </div>
          <div
            class="row normal-text"
            v-for="item in productsList"
            :key="item.id"
          >
            <div class="col-12" v-if="item.type === 0">
              <div class="row">
                <div class="col-md-6 col-4">{{ item.name }}</div>
                <div class="col-md-2 col-4">
                  <input type="checkbox" @change="selectCheckbox(item)" />
                </div>
                <div class="col-md-4 text-center col-4">{{ item.price }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- payment summary -->
      <div class="col-md-6 bg-white col-12 sub mt-3">
        <div class="h-100 rounded">
          <div class="text-center small-header">
            Payment Summary({{ selectedCurrency.shortCode }})
          </div>
          <!-- Selected Products -->
          <div
            class="row mt-3 normal-text"
            v-for="item in checkedBoxArr"
            :key="item.id"
          >
            <div class="col-md-6 col-6">{{ item.name }}</div>
            <div class="col-md-6 col-6 text-right font-weight-bold">
              {{
                daysToEndOfSubscription > 0
                  ? (
                      item.price * subscriptionDuration +
                      (item.price / 30) * daysToEndOfSubscription
                    ).toFixed(2)
                  : (item.price * subscriptionDuration).toFixed(2)
              }}
            </div>
          </div>
          <hr />
          <div class="row mt-3 normal-text">
            <div class="col-md-6 col-6">Total</div>
            <div class="col-md-6 col-6 text-right font-weight-bold">
              {{ TotalAmount.toLocaleString() }}
            </div>
          </div>
          <div class="row mt-5">
            <div
              class="col-12"
              data-toggle="modal"
              data-target="#PaymentOptionModal"
            >
              <el-button
                :color="primarycolor"
                class="w-100"
                round
                :disabled="!selectedPlanId"
              >
                Pay Now
              </el-button>
            </div>
          </div>
        </div>
      </div>

      <el-dialog
        title="Payment status"
        v-model="display"
        :width="mdAndUp || lgAndUp || xlAndUp ? `50%` : xsOnly ? `90%` : `70%`"
        align-center
        :modal="true"
      >
        <div class="row">
          <div class="col-md-12" v-if="!paymentFailed">
            <div class="col-12">
              <div class="d-flex justify-content-center">
                <img
                  src="../../assets/successful_payment.png"
                  style="width: 250px; margin: auto"
                />
              </div>
              <h3 class="text-center mt-5 font-weight-bold success">
                Congrats
              </h3>
              <div class="text-center mt-2 font-weight-600 s-18">
                Your subscription payment is successful <br />Your account has
                been upgraded successfully <br />Click the button below to go to
                the dashboard
              </div>
              <div class="d-flex justify-content-center mb-5">
                <a :href="dashboardURL" class="no-decoration">
                  <el-button color="#70c043" class="text-white mt-3" round
                    >Go to dashboard</el-button
                  >
                </a>
              </div>
            </div>
          </div>
          <div class="col-md-12" v-else>
            <h4 class="text-danger">Oops,</h4>
            <p>
              Sorry, your subscription upgrade was not successful, please
              contact support at
              <span class="font-weight-bold">info@churchplus.co</span>
            </p>
          </div>
        </div>
      </el-dialog>
      <!-- payment summary end -->
      <!-- Modal -->
      <div
        class="modal fade"
        id="PaymentOptionModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header bg-modal">
              <h5 class="modal-title" id="exampleModalLongTitle">
                Payment methods
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true" ref="close">&times;</span>
              </button>
            </div>
            <div class="modal-body p-0 bg-modal pb-5">
              <div class="row">
                <div class="col-sm-12 p-4 text-center continue-text">
                  Continue payment with
                </div>
              </div>
              <div
                class="row row-button c-pointer d-flex justify-content-center"
                @click="initializePayment(0)"
                v-if="
                  currentUser.currency == 'NGN' || currentUser.currency == 'GHS'
                "
              >
                <div>
                  <img
                    style="width: 150px"
                    src="../../assets/4PaystackLogo.png"
                    alt="paystack"
                  />
                </div>
              </div>
              <div
                class="row row-button c-pointer d-flex justify-content-center"
                @click="initializePayment(1)"
              >
                <div>
                  <img
                    style="width: 150px"
                    src="../../assets/flutterwave_logo_color@2x.png"
                    alt="flutterwave"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/gateway/backendapi";
import { useStore } from "vuex";
import formatDate from "../../services/dates/dateformatter";
import { computed, ref, inject } from "vue";
import membershipService from "../../services/membership/membershipservice";
import productPricing from "../../services/user/productPricing";
import { ElMessage, ElMessageBox } from "element-plus";
import { ElLoading } from 'element-plus';
import deviceBreakpoint from "../../mixins/deviceBreakpoint";

export default {
  setup() {
    const primarycolor = inject("primarycolor");
    const store = useStore();
    const subscriptionPlans = ref([]);
    const productsList = ref([]);
    const selectMonth = ref({});
    const selectedPlan = ref({});
    const currentAmount = ref("");
    const currentPlan = ref("");
    const smsValue = ref();
    const selectAmount = ref("");
    const constValue = ref(0);
    const selectEmail = ref({});
    const emailPrice = ref("");
    const smsPrice = ref("");
    const expenseApp = ref("");
    const fixedAsset = ref("");
    const { mdAndUp, lgAndUp, xlAndUp, xsOnly } = deviceBreakpoint();
    const dashboardURL = ref(`${window.location.origin}/tenant`);

    const currentUser = computed(() => {
      if (
        !store.getters.currentUser ||
        (store.getters.currentUser &&
          Object.keys(store.getters.currentUser).length == 0)
      )
        return "";
      return store.getters.currentUser;
    });

    const setCurrentUser = async () => {
      membershipService.getSignedInUser().then((res) => {
        store.dispatch("setCurrentUser", res);
        getChurchProfile();
      });
    };
    if (
      !currentUser.value ||
      (currentUser.value && Object.keys(currentUser.value).length == 0)
    )
      setCurrentUser();

    const acctReceived = ref("");
    const paymentSummary = ref([]);
    const paymentSummObj = ref({});
    const isChecked = ref(false);
    const checkedBoxArr = ref([]);
    const selectCurrencyArr = ref([]);
    const Plans = ref({});
    const close = ref(null);

    const display = ref(false);
    const currencies = ref({});
    const emailSelectedValue = ref("");
    const subSelectedAmount = ref("");
    const isProduction = true;
    const initializedOrder = ref("");
    const churchLogo = ref("");

    const expiryDate = ref("");
    const selectMonths = ref([
      { name: "1", code: "NY" },
      { name: "2", code: "RM" },
      { name: "3", code: "LDN" },
      { name: "4", code: "IST" },
      { name: "5", code: "PRS" },
      { name: "6", code: "NY" },
      { name: "7", code: "RM" },
      { name: "8", code: "LDN" },
      { name: "9", code: "IST" },
      { name: "10", code: "PRS" },
      { name: "11", code: "IST" },
      { name: "12", code: "PRS" },
    ]);

    const selectEmailUnit = ref([
      { name: "1000-2000", constValue: 2 },
      { name: "2000-3000", constValue: 4 },
      { name: "3000-4000", constValue: 6 },
      { name: "4000-5000", constValue: 8 },
    ]);
    selectCurrencyArr.value = ["NGN", "USD", "GHS", "ZAR"];
    const existingPlan = ref({});
    const daysToEndOfSubscription = ref(0);
    const UserSubscriptionPricing = ref([]);
    const UserSubscriptionPlans = ref([]);
    const selectedPlanId = ref(null);
    const selectMonthId = ref(null);

    const getProductPricing = async (id) => {
      let { data } = await productPricing.getProductPricing(id);
      data.forEach((i) => {
        if (i.product.name.toLowerCase() === "subscription") {
          UserSubscriptionPricing.value.push(i);
        }
      });
      getTenantSubscription();
      UserSubscriptionPlans.value = UserSubscriptionPricing.value
        .sort((a, b) => a.order - b.order)
        .map((i) => {
          i.subscriptionPlan.amount = i.price;
          i.subscriptionPlan.currency = i.currency;
          return i.subscriptionPlan;
        });
      selectMonthId.value = 1;
      selectMonth.value = selectMonths.value.find(
        (i) => i.name == selectMonthId.value
      );
    };

    const getTenantSubscription = () => {
      axios.get("/api/Subscription/subscriptions").then((res) => {
        Plans.value = res.data;
        existingPlan.value.id = Plans.value.id;
        existingPlan.value.amount = Plans.value.amount;
        existingPlan.value.description = Plans.value.description;
        existingPlan.value.amountInDollar = Plans.value.amountInDollar;
        existingPlan.value.membershipSize = Plans.value.membershipSize;

        res.data.subscriptionPlans.forEach((i) => {
          if (i.membershipSize >= Plans.value.membershipSize) {
            subscriptionPlans.value.push(i);
          }
        });

        // Get current plan

        selectedPlan.value = UserSubscriptionPlans.value.find(
          (i) => i.id == Plans.value.id
        );

        selectedPlanId.value = UserSubscriptionPlans.value.find((i) => {
          return i.id == Plans.value.id;
        })
          ? UserSubscriptionPlans.value.find((i) => {
              return i.id == Plans.value.id;
            }).id
          : null;

        // Remove preceeding plans from list

        const joined = UserSubscriptionPlans.value.map((i) => i.id).join("");
        const splitted = joined.split(selectedPlan.value.id);
        UserSubscriptionPlans.value = UserSubscriptionPlans.value.splice(
          splitted[0].length
        );

        if (selectedPlanId.value == null) {
          ElMessageBox.confirm(
            "Subscription pricing is currently not available in your country, we will make it available as soon as possible, you can reach out to us by sending an email to info@churchplus.co for us to address your specific needs. Thank you for choosing Churchplus",
            "Notice",
            {
              confirmButtonText: "OK",
              cancelButtonText: "Cancel",
              type: "warning",
            }
          )
            .then(() => {
              ElMessage({
                type: "warning",
                message: "We await your feedback. Thank you",
              });
            })
            .catch(() => {
              ElMessage({
                type: "warning",
                message: "We await your feedback. Thank you",
              });
            });
        }

        currentAmount.value = res.data.amountInNaira;
        currentPlan.value = existingPlan.value.description;
        productsList.value = res.data.productsList;
        expiryDate.value = formatDate.monthDayYear(
          Plans.value.subscriptionExpiration
        );
        emailPrice.value =
          productsList.value && productsList.value.length > 0
            ? productsList.value.find((i) => i.name === "Email").price
            : [];
        smsPrice.value =
          productsList.value && productsList.value.length > 0
            ? productsList.value.find((i) => i.name === "SMS").price
            : [];

        daysToEndOfSubscription.value =
          calculateRemomainingMonthsOfSubscription(
            res.data.subscriptionExpiration
          );
      });
    };

    const setSelectedDuration = () => {
      selectMonth.value = selectMonths.value.find(
        (i) => i.name == selectMonthId.value
      );
    };

    const setSelectedPlan = () => {
      selectedPlan.value = UserSubscriptionPlans.value.find(
        (i) => i.id == selectedPlanId.value
      );
    };

    const getChurchProfile = async () => {
      try {
        let res = await axios.get(
          `/GetChurchProfileById?tenantId=${currentUser.value.tenantId}`
        );
        churchLogo.value = res.data.returnObject.logo;
        getProductPricing(res.data.returnObject.countryID);
      } catch (err) {
        console.log(err);
      }
    };
    if (currentUser.value && Object.keys(currentUser.value).length > 0)
      getChurchProfile();

    const paymentFailed = ref(false);

    const emailAmount = computed(() => {
      if (!selectEmail.value.name) return 0;
      return +selectEmail.value.name.split("-")[1] * emailPrice.value;
    });

    const smsAmount = computed(() => {
      if (!smsValue.value) return 0;
      return smsValue.value * smsPrice.value;
    });

    const subselectedDuratn = computed(() => {
      let multiValue = 1;
      if (selectedPlan.value && selectedPlan.value.amount)
        multiValue *= selectedPlan.value.amount;
      if (selectMonth.value.name) multiValue *= +selectMonth.value.name;
      return multiValue;
    });

    const TotalAmount = computed(() => {
      let sum = 0;
      if (subselectedDuratn.value && selectMonth.value.name > 0)
        sum += subselectedDuratn.value;
      if (smsValue.value) sum += smsValue.value * 2;
      sum += emailAmount.value;
      return sum + +sumCheckboxItem.value.toFixed(2);
    });
    const sumCheckboxItem = computed(() => {
      if (checkedBoxArr.value.length === 0) return 0;
      return checkedBoxArr.value
        .map((i) => calculatedProductPrice(i.price))
        .reduce((a, b) => a + b);
    });

    const selectCheckbox = (item) => {
      const index = checkedBoxArr.value.findIndex((i) => i.name === item.name);
      if (index < 0) {
        checkedBoxArr.value.push(item);
      } else {
        checkedBoxArr.value.splice(index, 1);
      }
    };

    const selectedCurrency = computed(() => {
      if (
        selectedPlan.value &&
        Object.keys(selectedPlan.value).length > 0 &&
        selectedPlan.value.currency
      )
        return selectedPlan.value.currency;
      return "";
    });

    const initializePayment = (paymentGateway) => {
      const loading = ElLoading.service({
        lock: true,
        text: "Please wait...",
        background: "rgba(255, 255, 255, 0.9)",
      });

      const payload = {
        subscriptionPlanID: selectedPlan.value.id,
        paymentGateway: paymentGateway === 0 ? "Paystack" : "Flutterwave",
        totalAmount: TotalAmount.value,
        durationInMonths: selectMonthId.value,
        currencyId: selectedCurrency.value.id,
      };
      axios
        .post("/api/Payment/InitializeSubscription", payload)
        .then(({ data }) => {
          console.log(data);
          close.value.click();
          // initializedOrder.value = res.data;
          loading.close();
          if (data.status) {
            if (paymentGateway == 0) {
              payWithPaystack(data);
            } else {
              payWithFlutterwave(data);
            }
          }
        });
    };

    const subscriptionPayment = async (trans_id, tx_ref) => {
      try {
        await axios
          .post(
            `/api/Payment/ConfirmSubscriptionPayment?id=${trans_id}&txnref=${tx_ref}`
          )
          .then((res) => {
            console.log(res);
            display.value = true;
            if (res.data) {
              paymentFailed.value = false;
            } else {
              paymentFailed.value = true;
            }
          })
          .catch((err) => {
            console.log(err);
            display.value = true;
            paymentFailed.value = true;
          });
      } catch (error) {
        console.log(error);
      }
    };

    const payWithPaystack = (responseObject) => {
      let handler = PaystackPop.setup({
        key: process.env.VUE_APP_PAYSTACK_PUBLIC_KEY_LIVE,
        // key: process.env.VUE_APP_PAYSTACK_API_KEY,
        email: "info@churchplus.co",
        amount: TotalAmount.value * 100,
        currency: selectedCurrency.value.shortCode,
        channels: [
          "card",
          "bank",
          "ussd",
          "qr",
          "mobile_money",
          "bank_transfer",
        ],
        ref: responseObject.transactionReference,
        onClose: function () {
          ElMessage({
            type: "info",
            showClose: true,
            message: "You have cancelled the transaction",
            duration: 5000,
          });
        },
        callback: function (response) {
          let trans_id = response.trxref;
          let tx_ref = response.trxref;
          subscriptionPayment(tx_ref, trans_id);
        },
      });
      handler.openIframe();
    };

    const getFlutterwaveModules = () => {
      const script = document.createElement("script");
      script.src = !isProduction
        ? "https://ravemodal-dev.herokuapp.com/v3.js"
        : "https://checkout.flutterwave.com/v3.js";
      document.getElementsByTagName("head")[0].appendChild(script);
    };
    getFlutterwaveModules();

    const payWithFlutterwave = (responseObject) => {
      console.log(responseObject, "flutterwave");

      let country = "";

      switch (selectedCurrency.value.shortCode) {
        case "KES":
          country = "KE";
          break;
        case "GHS":
          country = "GH";
          break;
        case "ZAR":
          country = "ZA";
          break;
        case "TZS":
          country = "TZ";
          break;

        default:
          country = "NG";
          break;
      }

      window.FlutterwaveCheckout({
        // public_key: process.env.VUE_APP_FLUTTERWAVE_TEST_KEY,
        public_key: process.env.VUE_APP_FLUTTERWAVE_PUBLIC_KEY_LIVE,
        tx_ref: responseObject.transactionReference,
        amount: TotalAmount.value,
        currency: selectedCurrency.value.shortCode,
        country: country,
        payment_options: "card,ussd",
        customer: {
          name: currentUser.value.churchName,
          email: currentUser.value.userEmail,
        },
        callback: (response) => {
          let trans_id = response.transaction_id;
          let tx_ref = response.tx_ref;
          subscriptionPayment(trans_id, tx_ref);
        },
        onclose: () => console.log("Payment closed"),
        customizations: {
          title: "Subscription",
          description: "Payment for Subcription ",
          logo: churchLogo.value,
        },
      });
    };
    const calculateRemomainingMonthsOfSubscription = (expiryDate) => {
      const endDate = new Date(expiryDate);
      const startDate = new Date(Date.now());

      const differenceInTime = Math.abs(endDate - startDate);
      const differenceInDays = Math.ceil(
        differenceInTime / (1000 * 60 * 60 * 24)
      );

      return differenceInDays;
    };

    const subscriptionDuration = computed(() => {
      if (selectMonth.value.name) return +selectMonth.value.name;
      return 0;
    });

    const calculatedProductPrice = (price) => {
      if (daysToEndOfSubscription.value < 1)
        return selectMonth.value.name ? price * +selectMonth.value.name : 0;
      return (
        (selectMonth.value.name ? price * +selectMonth.value.name : 0) +
        (price / 30) * daysToEndOfSubscription.value
      );
    };

    return {
      selectedPlan,
      getTenantSubscription,
      subscriptionPlans,
      currentAmount,
      currentPlan,
      constValue,
      smsValue,
      selectMonth,
      selectMonths,
      selectAmount,
      selectEmailUnit,
      selectEmail,
      emailPrice,
      productsList,
      emailAmount,
      emailSelectedValue,
      subSelectedAmount,
      TotalAmount,
      expiryDate,
      subselectedDuratn,
      expenseApp,
      fixedAsset,
      acctReceived,
      paymentSummary,
      paymentSummObj,
      isChecked,
      selectCheckbox,
      checkedBoxArr,
      sumCheckboxItem,
      smsPrice,
      smsAmount,
      currentUser,
      existingPlan,
      Plans,
      selectCurrencyArr,
      selectedCurrency,
      currencies,
      display,
      close,
      paymentFailed,
      daysToEndOfSubscription,
      subscriptionDuration,
      initializePayment,
      initializedOrder,
      UserSubscriptionPricing,
      UserSubscriptionPlans,
      selectedPlanId,
      selectMonthId,
      setSelectedDuration,
      setSelectedPlan,
      churchLogo,
      mdAndUp,
      lgAndUp,
      xlAndUp,
      xsOnly,
      dashboardURL,
      primarycolor,
    };
  },
};
</script>

<style scoped>
.header {
  font: normal normal 800 34px/46px Nunito Sans;
}

.normal-text {
  font: normal normal normal 18px/24px Nunito Sans;
}

.small-header {
  font: normal normal bold 16px/22px Nunito Sans;
}

.sub {
  background: #ffffff 0% 0% no-repeat padding-box;
  /* box-shadow: 4px 10px 35px #0000000d; */
  box-shadow: 0px 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  /* border: 1px solid #0f022021; */

  border-radius: 15px;
  opacity: 1;
  padding: 20px;
}

.plandropdown {
  text-align: left;
  font: normal normal normal 18px/24px Nunito Sans;
  letter-spacing: 0px;
  color: #02172e;
  opacity: 1;
}

.communication {
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 4px 10px 35px #0000000d;
  border: 1px solid #0f022021;
  border-radius: 15px;
  opacity: 1;
}

.payment {
  box-shadow: 4px 10px 35px #0000000d;
  border: 1px solid #0f022021;
  border-radius: 15px;
  opacity: 1;
}

.pay-now {
  background: #136acd 0% 0% no-repeat padding-box;
  border-radius: 22px;
}

.row-button {
  padding: 10px;
  border-radius: 25px;
  box-shadow: 0 4px 12px rgb(0 0 0 / 10%);
  background: #fff;
  margin: 12px 70px 15px 70px;
  transition: all 0.4s ease-in-out;
  max-height: 45px;
}

.continue-text {
  font-family: Nunito Sans !important;
  font-size: 24px;
  font-weight: 700;
  text-align: center;
}

.emailWidth {
  width: 60%;
}

.form-control {
  width: 60% !important;
}

.italic {
  font-style: italic;
}

.card-bg {
  background: #cae2ee49;
}
</style>
