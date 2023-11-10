<template>
    <div>dapo</div>

</template>

<script>
import paystack from 'vue-paystack';
export default {
  name: "App",
  components: {
    paystack
  },
  data: () => {
    return {
      paystackKey: process.env.VUE_APP_PAYSTACK_API_KEY,
      amount: 10,
      full_name: 'Oladapo',
      email: 'oladapodaniel10@gmail.com'
    };
  },
  computed: {
      reference() {
      let text = "";
      let possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for (let i = 0; i < 10; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      return text;
    }
  },
  methods: {
    processPayment: () => {
      window.alert("Payment recieved")
    },
    close: () => {
     console.log("You closed checkout page")
    }
  },
};
</script>

<style scoped>

</style>