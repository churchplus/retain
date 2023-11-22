<template>
  <div>
    <Header headerName="Contacts" />
    <el-main>
      <div>
        <div class="d-flex justify-content-end" v-if="!isFormPage">
          <div class="d-flex mt-3 mt-sm-0">
            <el-button
              @click="importMembers"
              class="header-btn secondary-button"
              size="large"
              >Import</el-button
            >
            <router-link :to="`/tenant/people/add`" class="no-decoration">
              <el-button :color="primarycolor" class="ml-2 header-btn" size="large"
                >Add Contact</el-button
              >
            </router-link>
          </div>
        </div>
      </div>
      <router-view />
    </el-main>
  </div>
</template>

<script>
import { computed, ref, watchEffect, inject } from "vue";
import router from "@/router/index";
import { useRoute } from "vue-router";
import { ElMessage } from "element-plus";
import deviceBreakpoint from "../../mixins/deviceBreakpoint";
import { useStore } from "vuex";
import Header from "@/components/header/Header.vue";

export default {
  components: {
    Header,
  },
  setup() {
    const store = useStore();
    const selectedLink = ref(null);
    const tenantID = ref("");
    const route = useRoute();
    // const QRCodeDialog = ref(false)
    // const qrCode = ref('')
    const { lgAndUp, xlAndUp, mdAndUp, xsOnly } = deviceBreakpoint();
    const primarycolor = inject("primarycolor");

    const isFormPage = computed(() => {
      if (route.path.includes("add")) return true;
      return false;
    });

    const getUser = computed(() => {
      if (
        !store.getters.currentUser ||
        (store.getters.currentUser && Object.keys(store.getters.currentUser).length == 0)
      )
        return "";
      return store.getters.currentUser;
    });

    watchEffect(() => {
      if (getUser.value) {
        tenantID.value = getUser.value.tenantId;
      }
    });

    const memberlink = computed(() => {
      if (!tenantID.value) return "";
      return `${window.location.origin}/createmember?tenantId=${tenantID.value}`;
    });
    // const getQrCode = async () => {
    //   try{
    //     const res = await axios.get(`/api/Settings/GetQRCode?link=${window.location.origin}/createmember?tenantId=${tenantID.value}`)
    //     QRCodeDialog.value = true
    //     qrCode.value = res.data
    //     // console.log(res, 'hhhh');
    //   }
    //   catch(error){
    //     console.log(error);
    //   }
    // }

    const copylink = () => {
      selectedLink.value.input.setSelectionRange(
        0,
        selectedLink.value.input.value.length
      ); /* For mobile devices */
      selectedLink.value.input.select();

      /* Copy the text inside the text field */
      document.execCommand("copy");
      ElMessage({
        showClose: true,
        message: "Copied to clipboard",
        type: "success",
      });
    };

    const addPersonClicked = () => {
      if (route.name === "ImportPeople") {
        router.push("/tenant/people/add");
      } else {
        router.push("/people/import");
      }
    };

    // const header = computed(() => {
    //   if (route.path.includes("/people/addfirsttimer")) return "First Timers";
    //   return "Members";
    // })

    const importMembers = () => {
      router.push({ name: "ImportInstruction", query: { query: "importpeople" } });
    };

    return {
      addPersonClicked,
      tenantID,
      mdAndUp,
      route,
      xsOnly,
      isFormPage,
      importMembers,
      memberlink,
      copylink,
      selectedLink,
      lgAndUp,
      xlAndUp,
      primarycolor,
    };
  },
};
// transition method
// methods: {

// }
// End of transition
</script>

<style scoped>
* {
  box-sizing: border-box;
}
.image img {
  height: 2.5rem;
}
/* .img-wrapper img{
  height: 40rem;
  width: 5px;
}
.img-wrapper{
  width: 60%;
} */

.events {
  font: normal normal 800 29px Nunito sans;
}

.whole-con {
  display: flex;
  /* background: #f1f5f8; */
  /* height: 100vh; */
}

.main-con {
  width: 100%;
  height: 70%;
}

.main-body {
  height: 100%;
}

/* .top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
} */

/* 
.button {
  padding: 8px 10px;
  border: none;
  border-radius: 22px;
  width: 180px;
  font-size: 16px;
  font-weight: 600;
  margin: 0 8px;
  outline: none;
  text-decoration: none;
  box-sizing: border-box;
} */

/* .button:hover {
  cursor: pointer;
} */

/* .more-btn {
  background: #dde2e6;
} */

/* .add-person-btn {
  background: #136acd;
  color: #fff;
} */

.btn-icon {
  padding: 0 8px;
}

@media (max-width: 545px) {
  /* .top {
    display: block;
    text-align: center;
  } */
}

@media screen and (min-width: 990px) {
  .main-body {
    width: 95%;
    /* max-width: 1021px; */
    margin: 0 auto;
  }
}

@media screen and (min-width: 1400px) {
  .main-con {
    width: 90%;
    margin: 0 auto;
  }

  /* .top {
    height: 90px;
  } */

  .no-person {
    height: calc(100% - 90px);
  }
}

/* Route Transition */
.btn-loading {
  display: flex;
  justify-content: space-between;
}

.fade-enter-active {
  transition: all 0.3s cubic-bezier(0.67, 0.01, 0.86, 0.65);
}

.fade-leave-active {
  transition: all 0.3s cubic-bezier(0.67, 0.01, 0.86, 0.65);
}

.fade-enter-from,
.fade-leave-to {
  transition: translateX(20px);
  opacity: 0;
}

/* 
.buttonDiv {
  display: flex;
} */
</style>
