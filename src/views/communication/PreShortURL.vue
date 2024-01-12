<template>
  <div></div>
</template>

<script>
import axios from "@/gateway/backendapi";
import axiosII from "axios";
import { getDeviceInfo } from "@/services/deviceInformation/userAgent.js";

export default {
  name: "PreShortURL",
  created() { 
    this.getUserAgent();
    
  },
  data() {
    return {
      route: this.$route,
      device: "",
      browser: "",
      ip: "",
      country: ""
    };
  },
  props: {},
  methods: {
    getUserAgent() {
      console.log(getDeviceInfo());
      this.device = getDeviceInfo().device.vendor;
      this.browser = getDeviceInfo().browser.name;
      this.getGeolocationData();
    },
    getGeolocationData() {
      axiosII.get(`https://ipgeolocation.abstractapi.com/v1/?api_key=bac6ccc8cd56499dbd1385017983a52c`).then(({ data }) => {
        console.log(data)
        this.ip = data.ip_address;
        this.country = data.country
        this.getLongUrl();

      }).catch(err => console.log(err))
    },
    async getLongUrl() {
      let payload = {
        urlShort: {
          // "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          // "tenantID": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          // "longUrl": "string",
          shortUrl: `https://retain-psi.vercel.app/${this.route.params.token}`,
          // "dateEntered": "2023-12-13T12:45:53.135Z",
          // "token": "string"
        },
        // urlShort: window.location.origin + this.route.fullPath,
        // toLocation: "bbb",
        fromLocation: document.referrer ? document.referrer : "",
        device: this.device,
        browser: this.browser,
        ip: this.ip,
        country: this.country
      };
      try {
        let { data } = await axios.post(
          `/ResolveShortenUrl?url=https://retain-psi.vercel.app/${this.route.params.token}`, payload);
        console.log(data, 'herrr');
        const source = data.source ? data.source : ""
        const medium = data.medium ? data.medium : ""
        const campaign = data.campaign ? data.campaign : ""
        window.location.href = `${data.longUrl}?source=${source}&&medium=${medium}&&campaign=${campaign}`
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
