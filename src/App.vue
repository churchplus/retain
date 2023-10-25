<template>
  <div class="container-fluid connectionbar">
      <div class="row">
        <div class="col-md-12 px-0">
          <ConnectionBar />
        </div>
      </div>
    </div>
  <router-view />
</template>

<script>
import ConnectionBar from "@/components/connectivity/ConnectionStatus.vue";
import setupService from "./services/setup/setupservice"
import mixin from "@/mixins/currentUser.mixin.js"

export default {
  name: "App",

  components: { ConnectionBar },
  mixins: [mixin],
  data() {
    return {
      transitionName: null,
    };
  },
  created() {
    if (localStorage.getItem("token")) {
      
      const expiryDate = localStorage.getItem("expiryDate");
      if (expiryDate && new Date(expiryDate) < Date.now()) {
        localStorage.removeItem("token")
        localStorage.removeItem("expiryDate")
        setupService.clearStore();
      }   
      this.getCurrentUser();
      setupService.setup();
    }
  },
};
</script>

<style>
@import "./styles/style.css";
@import "./styles/styles2.css";

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.btn-loading {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

html {
  scroll-behavior: smooth;
}

.connectionbar {
  position: fixed;
  z-index: 9;
}
</style>
