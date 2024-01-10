<template>
  <div>getting and redirecting to long url {{ route.params.token }}</div>
</template>

<script>
import axios from "@/gateway/backendapi";
import axiosII from "axios";
import { getDeviceInfo } from "@/services/deviceInformation/userAgent.js";

export default {
  name: "PreShortURL",
  created() {
    // this.getLongUrl();
    this.getUserAgent();
  },

  data() {
    return {
      route: this.$route,
      device: "",
      browser: "",
      ip: "",
    };
  },
  props: {},
  methods: {
    getUserAgent() {
      console.log(getDeviceInfo());
      this.device = getDeviceInfo().device.vendor;
      this.browser = getDeviceInfo().browser.name;
      this.getIPAddress();
    },
    getIPAddress() {
      axiosII.get("https://www.cloudflare.com/cdn-cgi/trace/").then(({ data }) => {
        let ipRegex = /[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}/;
        let ip = data.match(ipRegex)[0];
        this.ip = ip;
        this.getLongUrl();
      });
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
      };
      console.log(payload);
      try {
        let { data } = await axios.post(
          `/ResolveShortenUrl?url=https://retain-psi.vercel.app/${this.route.params.token}`,
          payload
        );
        // this.shorteningURL = false;
        // this.createURLDialog = false;
        // this.getShortenUrl();
        // ElMessage({
        //   type: "success",
        //   message: "Link created successfully",
        //   duration: 6000,
        // });
        console.log(data);
        // window.location.href = data.longUrl;
      } catch (error) {
        // this.shorteningURL = false;
        console.error(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
