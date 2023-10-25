<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12 p-4 text-center continue-text">Continue payment with</div>
    </div>
    <div class="row row-button d-flex justify-content-center" @click="initializePayment(0)" v-if="paystackGate">
      <img class="img-pay" src="../../assets/4PaystackLogo.png" alt="paystack" />
    </div>


    <div class="row row-button d-flex justify-content-center" v-if="flutterwaveGate" @click="initializePayment(1)">
      <div>
        <img class="img-pay" src="../../assets/flutterwave_logo_color@2x.png" alt="flutterwave" />
      </div>
    </div>


    <div class="row row-button d-flex justify-content-center" v-if="paypalGate">
      <div class="col-8 col-sm-6">
        <img class="w-100 img-height" src="../../assets/paypal-logo-2@2x.png" alt="paypal" />
      </div>
    </div>

    <div class="row row-button d-flex justify-content-center" v-if="stripe">
      <div class="col-7 col-sm-4">
        <img class="w-100 img-height" src="../../assets/Stripe_logo.jpg" alt="stripe" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watchEffect } from 'vue'
import axios from "@/gateway/backendapi";
import { ElMessage } from 'element-plus';
export default {
  props: ['formData', 'donation', 'close', 'amount', 'converted', 'name', 'email', 'currency', 'callPayment', 'initializePaymentResponse'],
  emits: ['selected-gateway', 'transaction-reference', 'paystack-amount', 'payment-successful', 'resetcallpaymentprops'],
  setup(props, { emit }) {
    const isProduction = true
    const selectedGateway = ref("")


    const paystackGate = computed(() => {
      if (!props.formData.paymentGateWays || props.currency !== 'NGN') return false
      return props.formData.paymentGateWays.find(i => i.paymentGateway.name === "Paystack")
    })

    const flutterwaveGate = computed(() => {
      if (!props.formData.paymentGateWays) return false
      return props.formData.paymentGateWays.find(i => i.paymentGateway.name === "FlutterWave")
    })

    const paypalGate = computed(() => {
      if (!props.formData.paymentGateWays) return false
      return props.formData.paymentGateWays.find(i => i.paymentGateway.name === "PayPal")
    })

    const stripe = computed(() => {
      if (!props.formData.paymentGateWays) return false
      return props.formData.paymentGateWays.find(i => i.paymentGateway.name === "Stripe")
    })

    const initializePayment = (paymentType) => {
      selectedGateway.value = paymentType == 0 ? 'Paystack' : 'Flutterwave';
      emit('selected-gateway', selectedGateway.value)
    }

    const confirmDonationPayment = async (trans_id, tx_ref) => {
      try {
        let { data } = await axios.post(`/ConfirmDonationPayment?id=${trans_id}&txnref=${tx_ref}`);
        if (data.status) {
          emit('payment-successful', true)
        } else {
          ElMessage({
            type: 'error',
            showClose: true,
            message: "Confirmation failed, Confirming your purchase failed, please contact support at info@churchplus.co",
            duration: 8000
          })
        }
      }
      catch (error) {
        console.error(error)
        ElMessage({
          type: 'error',
          showClose: true,
          message: "Confirmation failed, Confirming your purchase failed, please contact support at info@churchplus.co",
          duration: 8000
        })
      }
    }

    const payWithPaystack = (initializePaymentResponse) => {
      props.close.click()
      /*eslint no-undef: "warn"*/
      let handler = PaystackPop.setup({
        key: process.env.VUE_APP_PAYSTACK_PUBLIC_KEY_LIVE,
        // key: process.env.VUE_APP_PAYSTACK_API_KEY,
        email: props.email,
        amount: props.converted * 100 ? props.converted * 100 : props.amount * 100,
        firstname: props.name,
        ref: initializePaymentResponse.transactionReference,
        channels: ['card', 'bank', 'ussd', 'qr', 'mobile_money', 'bank_transfer'],
        subaccount: props.formData.paymentGateWays.find(i => {
          return i.paymentGateway.name.toLowerCase() === selectedGateway.value.toLowerCase()
        }).subAccountID,
        bearer: 'subaccount',
        onClose: function () {
          ElMessage({
            type: 'info',
            showClose: true,
            message: "You have cancelled the transaction",
            duration: 5000
          })
        },
        callback: function (response) {
          //Route to where you confirm payment status
          emit('transaction-reference', response.trxref)
          emit('paystack-amount')
          let trans_id = response.trxref
          let tx_ref = response.trxref
          confirmDonationPayment(tx_ref, trans_id);
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
    }
    getFlutterwaveModules()

    const payWithFlutterwave = (initializePaymentResponse) => {
      // Close payment modal
      props.close.click()

      window.FlutterwaveCheckout({
        public_key: process.env.VUE_APP_FLUTTERWAVE_PUBLIC_KEY_LIVE,
        // public_key: process.env.VUE_APP_FLUTTERWAVE_TEST_KEY_TEST,
        tx_ref: initializePaymentResponse.transactionReference,
        amount: props.amount,
        currency: props.currency,
        payment_options: 'card,ussd',
        customer: {
          name: props.name,
          email: props.email,
        },
        subaccounts: [
          {
            id: props.formData.paymentGateWays.find(i => {
              return i.paymentGateway.name.toLowerCase() === selectedGateway.value.toLowerCase()
            }).subAccountID
          }
        ],
        callback: (response) => {
          emit('transaction-reference', response.transaction_id);
          let trans_id = response.transaction_id
          let tx_ref = response.tx_ref
          confirmDonationPayment(trans_id, tx_ref);
        },
        onclose: () => console.log('Payment closed'),
        customizations: {
          title: props.formData.churchName,
          description: "Payment for contribution items",
          logo: props.formData.churchLogo,
        },
      });
    }

    watchEffect(() => {
      if (props.callPayment && Object.keys(props.initializePaymentResponse).length > 0) {
        if (selectedGateway.value == 'Paystack') {
          payWithPaystack(props.initializePaymentResponse);
        } else {
          payWithFlutterwave(props.initializePaymentResponse);
        }
        emit('resetcallpaymentprops', false)
      }
    })

    return {
      paystackGate, flutterwaveGate, paypalGate, stripe, selectedGateway, initializePayment
    }
  }

}

</script>

<style scoped>
.continue-text {
  font-family: Nunito Sans !important;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
}

.option-text {
  font-family: Nunito Sans !important;
  font-weight: 800;
}

.circle {
  color: #136acd;
  font-size: 8px;
}

/* .circle {
    background:  #136acd;
    border-radius: 50%;
    width: 100px;
    height: 100px;
} */

.hover-shadow:hover {
  box-shadow: 0 0 11px rgba(33, 33, 33, 0.2);
  cursor: pointer;
}

.row-button {
  padding: 10px;
  border-radius: 25px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  background: white;
  margin: 12px 70px 15px 70px;
  transition: all 0.4s ease-in-out;
  max-height: 45px;
}

.img-height {
  max-height: 36px
}

.row-button:hover {
  cursor: pointer;
  transform: scale(1.05, 1.05)
}

.img-pay {
  width: 125px
}
</style>