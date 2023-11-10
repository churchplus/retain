
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


  </div>
</template>

<script>
import { ref, watchEffect, computed } from 'vue'
import axios from "@/gateway/backendapi";
import { ElMessage } from 'element-plus';
export default {
  props: ['formData', 'close', 'donation', 'donorEmail', 'currency', 'initializePaymentResponse', 'callPayment'],
  emits: ['selectedgateway', 'paymentsuccessful', 'donationconfirmed', 'resetcallpaymentprops'],
  setup(props, { emit }) {
    const email = ref("info@churchplus.com")
    const selectedGateway = ref("")

    const paystackGate = computed(() => {
      if ((!props.donation || !props.donation.donation || !props.donation.donation.paymentGateWays)  || (props.currency && props.currency.shortCode !== 'NGN')) return false
      return props.donation.donation.paymentGateWays.find(i => i.paymentGateway.name === "Paystack")
    })

    const flutterwaveGate = computed(() => {
      if (!props.donation || !props.donation.donation || !props.donation.donation.paymentGateWays) return false
      return props.donation.donation.paymentGateWays.find(i => i.paymentGateway.name === "FlutterWave")
    })

    const initializePayment = (paymentType) => {
      selectedGateway.value = paymentType == 0 ? 'Paystack' : 'Flutterwave';
      emit('selectedgateway', selectedGateway.value)
    }

    const confirmDonationPayment = async (trans_id, tx_ref) => {
      try {
        let { data } = await axios.post(`/ConfirmEventRegistrationPayment?id=${trans_id}&txnref=${tx_ref}`);
        if (data.status) {
          emit("donationconfirmed")
        } else {
          ElMessage({
            type: 'error',
            showClose: true,
            message: data.message ? data.message : "Confirmation failed, Confirming your purchase failed, please contact support at info@churchplus.co",
            duration: 10000
          })
        }
      }
      catch (error) {
        console.error(error)
        ElMessage({
          type: 'error',
          showClose: true,
          message: error.message ? error.message : "Confirmation failed, Confirming your purchase failed, please contact support at info@churchplus.co",
          duration: 8000
        })
      }
    }

    const getFlutterwaveModules = () => {
      let isProduction = true
      const script = document.createElement("script");
      script.src = !isProduction
        ? "https://ravemodal-dev.herokuapp.com/v3.js"
        : "https://checkout.flutterwave.com/v3.js";
      document.getElementsByTagName("head")[0].appendChild(script);
    }
    getFlutterwaveModules()

    const payWithPaystack = (initializePaymentResponse) => {
      props.close.click()

      /*eslint no-undef: "warn"*/
      let handler = PaystackPop.setup({
        key: process.env.VUE_APP_PAYSTACK_PUBLIC_KEY_LIVE,
        // key: process.env.VUE_APP_PAYSTACK_API_KEY,
        email: props.donation.person.email.trim(),
        currency: props.currency.shortCode,
        amount: props.donation.donation.amount * 100,
        firstname: props.donation.person.firstName,
        phone_number: props.donation.person.mobilePhone,
        ref: initializePaymentResponse.transactionReference,
        subaccount: props.donation.donation.paymentGateWays.find(i => {
          return i.paymentGateway.name.toLowerCase() === selectedGateway.value.toLowerCase()
        }).subAccountID,
        bearer: 'subaccount',
        onClose: function () {
          ElMessage({
            type: 'error',
            showClose: true,
            message: "You have cancelled the transaction",
            duration: 8000
          })
          console.log('closed')
        },
        callback: function (response) {
          let trans_id = response.trxref
          let tx_ref = response.trxref
          confirmDonationPayment(tx_ref, trans_id);
        },
      });
      handler.openIframe();
    };

    const payWithFlutterwave = (initializePaymentResponse) => {
      // Close payment modal
      props.close.click()
      console.log(props, initializePaymentResponse)

      window.FlutterwaveCheckout({
        public_key: process.env.VUE_APP_FLUTTERWAVE_PUBLIC_KEY_LIVE,
        // public_key: process.env.VUE_APP_FLUTTERWAVE_TEST_KEY_TEST,
        tx_ref: initializePaymentResponse.transactionReference,
        amount: props.donation.donation.amount,
        currency: props.currency.shortCode,
        payment_options: 'card,ussd',
        customer: {
          name: props.donation.person.firstName,
          email: props.donation.person.email.trim(),
        },
        subaccounts: [
          {
            id: props.donation.donation.paymentGateWays.find(i => {
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
      console.log(props.donation)
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
      initializePayment,
      payWithPaystack,
      selectedGateway,
      email,
      paystackGate,
      flutterwaveGate
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
  margin: 12px 20px 15px 20px;
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