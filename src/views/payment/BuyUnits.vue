<template>
  <div class="px-sm-2 slim-container">
    <div class="container">
      <div class="row text-center">
        <div class="col-md-12 mb-4 mt-3" id="successDialog">
          <h2 class="font-weight-bold intro-text">
            Choose a plan that's right for your church
          </h2>
          <el-dialog v-model="purchaseIsSuccessful" class="smsUnitSuccess"
            :width="mdAndUp || lgAndUp || xlAndUp ? '60%' : '100%'" align-center>
            <PaymentSuccessModal @close-modal="closeModal" :amount="amount" />
          </el-dialog>
        </div>
      </div>

      <div class="row text-center mb-4">
        <div class="col-lg-8 offset-lg-2">
          <p class="font-weight-noraml small-text">
            There is no maximum limit or expiry date for your units which you
            may purchase at any time. With our pricing system you get more SMS
            units the more you buy.
          </p>
        </div>
      </div>

      <div class="row mb-4">
        <div class="col-lg-8 offset-lg-2 buy-box">
          <div class="row mb-5">
            <div class="col-md-12 calc-con">
              <h2 class="font-weight-700 plan-header text-white">
                Buy SMS Units
              </h2>
            </div>
          </div>

          <div class="row my-3">
            <div class="col-md-12">
              <div class="row">
                <div class="col-md-3 d-flex align-items-center justify-content-md-end">
                  <label for="">Amount: <el-icon class="is-loading" v-show="checkingCoutryData">
                      <Loading />
                    </el-icon></label>
                </div>
                <div class="col-md-6">
                  <div class="row">
                    <div class="col-12">
                      <el-input v-model="amount" placeholder="Enter amount" class="input-with-select"
                        :disabled="checkingCoutryData">
                        <template #prepend>
                          <el-select v-model="selectedCurrency" placeholder="Select" style="width: 115px"
                            @change="resetCountryPricing" filterable>
                            <el-option v-for="item in FLWupportedCurrencies" :label="item.value" :value="item.value" />
                          </el-select>
                        </template>
                      </el-input>
                    </div>
                  </div>
                </div>
                <div class="col-md-3"></div>
              </div>
            </div>
          </div>

          <div class="row my-3">
            <div class="col-md-12">
              <div class="row">
                <div class="col-md-3 d-flex align-items-center justify-content-md-end">
                  <label for="">SMS Units:</label>
                </div>
                <div class="col-md-6">
                  <el-input type="text" v-model="totalSMSUnits" disabled class="flat-left-border" />
                </div>
                <div class="col-md-3"></div>
              </div>
            </div>
          </div>

          <div class="row my-3">
            <div class="col-md-12">
              <div class="row">
                <div class="col-md-3 d-flex align-items-center justify-content-md-end">
                  <label for="">Total:</label>
                </div>
                <div class="col-md-6">
                  <el-input type="text" v-model="totalAmount" disabled class="flat-left-border"
                    @input="userCurrencyConversion()" />
                </div>
                <div class="col-md-3"></div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-12 py-3 d-flex flex-column align-items-center">
              <p class="text-danger font-weight-700 mb-1" v-if="invalidAmount">
                Please enter amount
              </p>
              <el-button :color="primarycolor" class="px-4" style="height: 43px; font-size: 1.06em" data-toggle="modal"
                data-target="#PaymentOptionModal" round>Buy SMS Unit</el-button>
            </div>
          </div>
        </div>
      </div>

      <!-- payment modal for paystack and flutterwave  -->
      <div class="modal fade" id="PaymentOptionModal" tabindex="-1" role="dialog"
        aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header bg-modal">
              <h5 class="modal-title" id="exampleModalLongTitle">
                Payment methods
              </h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true" ref="close">&times;</span>
              </button>
            </div>
            <div class="modal-body p-0 bg-modal pb-5">
              <div class="row">
                <div class="col-sm-12 p-4 text-center continue-text">
                  Continue payment with
                </div>
              </div>
              <div class="row row-button c-pointer d-flex justify-content-center" @click="initializePayment(0)"
                v-if="selectedCurrency == 'NGN' || selectedCurrency == 'GHS'">
                <div>
                  <img style="width: 150px" src="../../assets/4PaystackLogo.png" alt="paystack" />
                </div>
              </div>
              <div class="row row-button c-pointer d-flex justify-content-center" @click="initializePayment(1)">
                <div>
                  <img style="width: 150px" src="../../assets/flutterwave_logo_color@2x.png" alt="flutterwave" />
                </div>
              </div>
              <div class="row row-button mb-1 c-pointer d-flex justify-content-center">
                <div class="font-weight-bold" @click="directTransfer">
                  Direct Transfer
                </div>
              </div>
              <div class="row justify-content-center">
                
                <div class="col-md-8 rounded  shadow" :class="{ 'showDropdownMenu': showTransferDetail, 'hideDropdownMenu': !showTransferDetail }">
                  <div class="col-md-12 d-flex justify-content-center"> <el-icon :size="18"><Bottom /></el-icon> </div>
                  <div class="row   ">
                    <div class="col-md-12 d-flex justify-content-between ">
                      <div>Account Name: </div> <span class="font-weight-bold ">Complustech Limited</span>
                    </div>
                    <div class="col-md-12 d-flex justify-content-between">
                      <div>Account Number: </div> <span class="font-weight-bold ">0017934252</span>
                    </div>
                    <div class="col-md-12 d-flex justify-content-between ">
                      <div>Bank: </div> <span class="font-weight-bold ">Access</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-8 offset-lg-2 py-3 d-sm-flex justify-content-start">
          <h4 class="font-weight-700">Bank Payment</h4>
        </div>
        <div class="col-12 col-lg-8 offset-lg-2 pb-3">
          <img src="../../assets/payment-type.jpeg" class="px-1 w-100" alt="Image" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, inject } from "vue";
import axios from "@/gateway/backendapi";
import PaymentSuccessModal from "@/components/payment/PaymentSuccessful.vue"
import store from '../../store/store'
import stopProgressBar from "../../services/progressbar/progress"
import supportedCurrencies from "../../services/user/flutterwaveSupportedCurrency"
import productPricing from "../../services/user/productPricing";
import { ElMessage, ElMessageBox } from 'element-plus'
import deviceBreakpoint from "../../mixins/deviceBreakpoint";
import { ElLoading } from 'element-plus';
import membershipService from "../../services/membership/membershipservice";

export default {
  components: { PaymentSuccessModal },
  setup() {
    const primarycolor = inject('primarycolor')
    const amount = ref(0);
    const smsUnits = ref(0);
    const invalidAmount = ref(false);
    const purchaseIsSuccessful = ref(false);
    const isProduction = true
    const churchLogo = ref('');
    const close = ref(null);
    const pricePerUnitSMS = ref(0);
    const FLWupportedCurrencies = ref(supportedCurrencies);
    const selectedCurrency = ref(null)
    const UserSMSPricing = ref({})
    const UserProductPricing = ref({})
    const countries = ref([])
    const checkingCoutryData = ref(false)
    const showTransferDetail = ref(false)
    const { mdAndUp, lgAndUp, xlAndUp } = deviceBreakpoint()


    const currentUser = computed(() => {
      if (!store.getters.currentUser || (store.getters.currentUser && Object.keys(store.getters.currentUser).length == 0)) return ''
      return store.getters.currentUser
    })

    const directTransfer = () => {
      showTransferDetail.value = !showTransferDetail.value
    }

    const setCurrentUser = async () => {
      membershipService.getSignedInUser()
        .then(res => {
          store.dispatch("setCurrentUser", res);
          setUserCurrency()
        })
    }
    if (!currentUser.value || (currentUser.value && Object.keys(currentUser.value).length == 0)) setCurrentUser();


    const totalSMSUnits = computed(() => {
      if (amount.value <= 0) return "";
      if (UserSMSPricing.value) return Math.round(amount.value / +UserSMSPricing.value.price);
      return ""
    });

    const totalAmount = computed(() => {
      if (amount.value <= 0) return "";
      return Math.ceil(amount.value);
    });

    const getAllCountries = () => {
      axios.get("/api/GetAllCountries").then((res) => {
        countries.value = res.data;
      })
        .catch(err => console.error(err))
    }

    const getProductPricing = async (id) => {
      let { data } = await productPricing.getProductPricing(id)
      UserProductPricing.value = data
      UserSMSPricing.value = data.find(i => i.product.name.toLowerCase() === 'sms')
      if (!UserSMSPricing.value) {
        ElMessageBox.confirm(
          'SMS Unit pricing is currently not available for this currency selected, we will make it available as soon as possible, you can reach out to us by sending an email to info@churchplus.co for us to address your specific needs. Thank you for choosing Churchplus',
          'Notice',
          {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',
          }
        )
          .then(() => {
            ElMessage({
              type: 'warning',
              message: 'We await your feedback. Thank you',
            })
          })
          .catch(() => {
            ElMessage({
              type: 'warning',
              message: 'We await your feedback. Thank you',
            })
          })
      }
      checkingCoutryData.value = false
    }


    const resetCountryPricing = () => {
      checkingCoutryData.value = true
      const countryIDObj = countries.value.find(i => i.currency == selectedCurrency.value)
      getProductPricing(countryIDObj.id)
    }

    const getChurchProfile = async () => {
      try {
        let res = await axios.get(`/GetChurchProfileById?tenantId=${currentUser.value.tenantId}`)
        churchLogo.value = res.data.returnObject.logo
        getProductPricing(res.data.returnObject.countryID)
      }
      catch (err) {
        console.log(err)
      }
    }

    const setUserCurrency = () => {
      const userCurrencySupported = FLWupportedCurrencies.value.find(i => i.value === currentUser.value.currency)
      selectedCurrency.value = userCurrencySupported ? userCurrencySupported.value : 'USD'
      getAllCountries();
      getChurchProfile();
    }
    if (currentUser.value && Object.keys(currentUser.value).length > 0) setUserCurrency()


    const payWithPaystack = (responseObject) => {
      let handler = PaystackPop.setup({
        key: process.env.VUE_APP_PAYSTACK_PUBLIC_KEY_LIVE,
        // key: process.env.VUE_APP_PAYSTACK_API_KEY,
        email: currentUser.value.userEmail,
        amount: totalAmount.value * 100,
        currency: selectedCurrency.value,
        channels: ['card', 'bank', 'ussd', 'qr', 'mobile_money', 'bank_transfer'],
        ref: responseObject.transactionReference,
        onClose: function () {
          ElMessage({
            type: 'info',
            showClose: true,
            message: "You have cancelled the transaction",
            duration: 5000
          })
        },
        callback: function (response) {
          let trans_id = response.trxref
          let tx_ref = response.trxref
          confirmSMSUnitPayment(tx_ref, trans_id);
          console.log(response);
        },
      });
      handler.openIframe();
    };

    // flutterwave setup function
    const getFlutterwaveModules = () => {
      const script = document.createElement("script");
      script.src = !isProduction
        ? "https://ravemodal-dev.herokuapp.com/v3.js"
        : "https://checkout.flutterwave.com/v3.js";
      document.getElementsByTagName("head")[0].appendChild(script);
    }
    getFlutterwaveModules()

    const payWithFlutterwave = (returnObject) => {
      window.FlutterwaveCheckout({
        public_key: process.env.VUE_APP_FLUTTERWAVE_PUBLIC_KEY_LIVE,
        // public_key: process.env.VUE_APP_FLUTTERWAVE_TEST_KEY,
        tx_ref: returnObject.transactionReference,
        amount: totalAmount.value,
        currency: selectedCurrency.value,
        payment_options: 'card,ussd',
        customer: {
          name: currentUser.value.churchName,
          email: currentUser.value.userEmail,
        },
        callback: (response) => {
          let trans_id = response.transaction_id
          let tx_ref = response.tx_ref
          confirmSMSUnitPayment(trans_id, tx_ref);
        },
        onclose: () => {
          ElMessage({
            type: 'info',
            showClose: true,
            message: "Payment window closed",
            duration: 5000
          })
        },
        customizations: {
          title: currentUser.value.churchName,
          description: "Payment for SMS Unit ",
          logo: churchLogo.value
        },
      });
    }

    const closeModal = () => purchaseIsSuccessful.value = false;

    const initializePayment = (paymentType) => {
      invalidAmount.value = false;
      if (amount.value <= 0) {
        invalidAmount.value = true;
        return false;
      }
      const loading = ElLoading.service({
        lock: true,
        text: 'Please wait...',
        background: 'rgba(255, 255, 255, 0.9)',
      })

      const payload = {
        smsUnit: totalSMSUnits.value,
        amount: totalAmount.value,
        paymentGateway: paymentType == 0 ? "Paystack" : "Flutterwave",
      }
      axios
        .post(`/api/Payment/InitializeSMSPayment`, payload)
        .then(({ data }) => {
          close.value.click();
          loading.close()
          console.log(data)
          if (data.status) {
            if (paymentType == 0) {
              payWithPaystack(data)
            } else {
              payWithFlutterwave(data)
            }
          }
        })
        .catch((err) => {
          console.error(err);
          loading.close();
        })
    }

    const confirmSMSUnitPayment = async (trans_id, tx_ref) => {
      await axios
        .post(`/api/Payment/ConfirmSMSPayment?id=${trans_id}&txnref=${tx_ref}`)
        .then((res) => {
          if (res.data) {
            close.value.click();
            purchaseIsSuccessful.value = true;
            store.dispatch("addPurchasedUnits", totalSMSUnits.value);
            // Reset SMS unit on dashboard
            store.dispatch('dashboard/getDashboard');

            // Reset SMS unit from current user in store
            store.dispatch("getUserData");

          } else {
            ElMessage({
              type: 'error',
              showClose: true,
              message: 'Confirming your SMS unit purchase failed, please contact support at info@churchplus.co',
              duration: 20000
            })

          }
        })
        .catch((err) => {
          stopProgressBar();
          ElMessage({
            type: 'error',
            showClose: true,
            message: 'Confirming your purchase failed, please contact support at info@churchplus.co',
            duration: 5000
          })
        });
    }


    return {
      primarycolor,
      amount,
      smsUnits,
      showTransferDetail,
      totalAmount,
      totalSMSUnits,
      invalidAmount,
      purchaseIsSuccessful,
      closeModal,
      currentUser,
      payWithFlutterwave,
      initializePayment,
      churchLogo,
      close,
      pricePerUnitSMS,
      directTransfer,
      FLWupportedCurrencies,
      selectedCurrency,
      UserSMSPricing,
      UserProductPricing,
      resetCountryPricing,
      countries,
      checkingCoutryData,
      mdAndUp,
      lgAndUp,
      xlAndUp
    };
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.plan-header {
  font-size: 20px;
  color: #000;
}

.showDropdownMenu {
  overflow: hidden;
  height: 100px;
  transition: all 0.8s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.hideDropdownMenu {
  overflow: hidden;
  height: 0px;
  transition: all 0.8s cubic-bezier(0.645, 0.045, 0.355, 1);
}



.plan-box {
  box-shadow: 7px 15px 25px #00000012;
  border: 1px solid #136acd33;
  border-radius: 25px;
  border-bottom: 10px solid #136acd;
}

.plan-items p:nth-child(odd) {
  background: #ebeff433;
}

.calc-con {
  background: #136acd;
  border-radius: 15px 15px 0 0;
  height: 66px;
  display: flex;
  align-items: center;
}

.inp-field {
  border: 1px solid #c5d9f2;
  border-radius: 5px;
  background: transparent;
  color: #fff;
  font-weight: 700;
}

.text-field {
  border-left: none;
  border-radius: 0 5px 5px 0;
  padding-left: 10px !important;
}

.bank-details {
  background: #ebeff4 0% 0% no-repeat padding-box;
  border: 1px solid #dde2e6;
  border-radius: 10px;
  height: fit-content;
}

.hidden-label {
  display: none;
}

.buy-box {
  border: 1px solid #dde2e6;
  border-radius: 15px;
}

.visa-card {
  max-height: 45px;
}

.master-card {
  max-height: 45px;
}

.flat-left-border {
  border-radius: 0px 4px 4px 0;
}

.flat-right-border {
  border-radius: 4px 0 0 4px;
}

.ui-dialog .ui-dialog-titlebar {
  display: none !important;
}

.container .p-dialog-header {
  background: olivedrab !important;
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

@media screen and (max-width: 501px) {
  .intro-text {
    font-size: 24px;
    margin-top: 20px;
  }
}

@media screen and (max-width: 767px) {
  .hidden-label {
    display: inline;
  }

  .labels-box {
    display: none;
  }
}
</style>