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
    this.getLongUrl();
    this.getUserAgent();
    this.getIPAddress();
  },

  data() {
    return {
      route: this.$route,
    };
  },
  props: {},
  methods: {
    getUserAgent() {
      console.log(getDeviceInfo());
    },
    getIPAddress() {
      axiosII.get("https://checkip.amazonaws.com/").then((data) => console.log(data));
    },
    async getLongUrl() {
      let payload = {
        urlShort: "fff",
        toLocation: "bbb",
        fromLocation: "vv",
        device: "bbv",
        browser: "bbv",
        ip: "bbbq",
      };
      try {
        let response = await axios.get(
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
        console.log(response);
      } catch (error) {
        // this.shorteningURL = false;
        console.error(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
