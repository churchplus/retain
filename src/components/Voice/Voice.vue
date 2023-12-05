<template>
  <div>
    <Header headerName="Voice" />
    <!-- Content Box -->
    <el-main class="mt-md-3" >
      <div class="container-fluid">
        <div class="row">
          <div
            class="col-6 col-md-2 pl-0"
            v-for="(item, index) in voiceMenu"
            :key="index"
          >
            <router-link :to="item.path" class="no-decoration">
              <el-button
                :class="{ 'active-link': route.path.includes(item.path) }"
                :color="route.path.includes(item.path) ? '#F68479' : '#D9D9D9'"
                class="font-weight-bold w-100 thick-secondary"
                size="large"
              >
                {{ item.name }}
              </el-button>
            </router-link>
          </div>

          <!-- Bigger row -->
          <div class="col-md-12 px-0">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </el-main>
  </div>

  <div></div>
</template>

<script>
import { ref, inject } from "vue";
import { useRoute } from "vue-router";
import deviceBreakpoint from "../../mixins/deviceBreakpoint";
import router from "../../router";
import Header from "@/components/header/Header.vue";
export default {
  components: {
    Header,
  },
  setup() {
    const primarycolor = inject("primarycolor");
    const route = useRoute();
    const menuShouldShow = ref(false);
    const { xsOnly, smAndUp, mdAndUp, lgAndUp, xlAndUp } = deviceBreakpoint();
    const toggleMenu = () => {
      menuShouldShow.value = !menuShouldShow.value;
    };

    const voiceMenu = ref([
      {
        name: "Compose Voice",
        path: "/tenant/voice/sendvoicemessage",
      },
      // {
      //   name: "Voice report",
      //   path: "/tenant/voice/voicelist",
      // }
    ]);

    return {
      route,
      router,
      toggleMenu,
      menuShouldShow,
      xsOnly,
      smAndUp,
      mdAndUp,
      lgAndUp,
      xlAndUp,
      primarycolor,
      voiceMenu
    };
  },
};
</script>

<style scoped>
.toggle {
  display: none;
  width: 20px;
  text-align: center;
  position: absolute;
  top: -40px;
  left: 4px;
  font-size: 30px;
}

.toggle:hover {
  cursor: pointer;
}

/* .main {
  border: 1px solid #02172e30;
  border-radius: 30px;
} */

#main-tool {
  display: flex;
  justify-content: space-between;
}

/* #side-menu {
  border-right: 1px solid #02172e30;
} */

.search-div {
  width: fit-content;
  padding: 10px;
  background: #f5f8f9;
  border-radius: 200px;
}

.search-div input {
  background: none;
  border: none;
  outline: transparent;
}

.brief-message {
  color: #4762f0;
}

.compose-btn {
  background: #136acd;
  box-shadow: 0px 6px 12px #708eb170;
  border-radius: 22px;
  color: #fff;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.menu-icon {
  font-size: 20px;
}

.units-div {
  border: 1px solid #dde2e6;
  border-radius: 20px;
  padding: 15px 0;
}

.hidden-header {
  display: none;
}

.th {
  font-size: 12px;
  font-weight: 700;
}

.inbox-count {
  background: rgba(19, 106, 205, 0.3);
  padding: 4px 8px;
  border-radius: 22px;
}

.menu-item-con {
  color: #002044;
}

.active {
  opacity: 0.5;
}

.active-link {
  /* background: rgba(19, 106, 205, 0.05); */
  /* border-bottom: 2px solid #136acd; */
  color: #ffffff !important;
}

.router-link-exact-active .active {
  opacity: 1 !important;
}

.buy-btn {
  background: rgb(112, 142, 177, 0.33);
  border-radius: 22px;
}

.btn-text {
  opacity: 1;
  font-size: 11px;
  font-weight: 700;
}

.timestamp {
  font-size: 14px;
  color: #333333;
  opacity: 0.5;
}

.view-btn {
  background: #ebeff4;
  border-radius: 21px;
  padding: 4px 18px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
}

.r-link {
  color: #136acd;
}

.router-link-exact-active i {
  color: #136acd;
  opacity: 1;
}

@media screen and (max-width: 765px) {
  .toggle {
    display: block;
  }

  .show {
    overflow: hidden;
    height: 45px;
    transition: all 0.5s cubic-bezier(0.645, 0.045, 0.355, 1);
  }

  .links-menu {
    height: 0;
    overflow: hidden;
    transition: all 0.5s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
}

@media screen and (max-width: 767px) {
  .hidden-header {
    display: inline-block;
    font-size: 12px;
  }

  .header-row {
    display: none;
  }

  #menu-items {
    flex-direction: row !important;
  }

  .search-div {
    width: 100%;
  }

  .units-div {
    width: 100%;
  }

  .units-container {
    margin-left: 0;
    margin: auto;
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  .compose-btn {
    font-size: 0.8em;
  }
}

@media screen and (max-width: 1000px) {
  .msg-n-time {
    flex-direction: column;
    margin-bottom: 8px;
  }
}

@media screen and (min-width: 1000px) {
  #menu-items {
    min-width: 100% !important;
  }
}

@media screen and (min-width: 1300px) {
  .menu-item-div {
    padding-left: 30px;
  }
}
</style>
