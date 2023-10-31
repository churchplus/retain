<template>
  <div class="container-top" :class="{ 'container-slim': lgAndUp || xlAndUp }">
    <div class="create-btn-div">
      <div>
        <h2 class="head-text ">Voice</h2>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <hr class="hr" />
      </div>
    </div>

    <!-- Content Box -->
    <main :class="{ 'main': mdAndUp || lgAndUp || xlAndUp }" class="mt-3">
      <div class="container-fluid">
        <div class="row">

          <!-- <div class="row"> -->
          <div class="col-md-3 col-12 mt-4">
            <!-- <div class="mt-2" v-show="xsOnly || smAndUp">
              <i class="pi pi-bars" @click="toggleMenu"></i>
            </div> -->
            <el-button round class="font-weight-bold w-100" size="large" :color="primarycolor" @click="nextPage">
              Compose voice
            </el-button>
          </div>
          <!-- </div> -->
          <!-- Side menu -->
          <div class="col-md-9 col-12" id="side-menu">
            <div class="row mt-4">
            <!-- <div class="row mt-4" :class="{ 'show mb-3': menuShouldShow, 'links-menu': !menuShouldShow }"> -->
              <div class="col-md-12 d-flex flex-wrap">
                <div class="row menu-item-con " :class="{ 'active-link': route.path === '/tenant/voice/voicelist' }">
                  <div class="col-md-12 menu-item-div m-auto">
                    <a class="btn btn-default font-weight-bold">
                      <span class="menu-item">
                        <router-link class="r-link text-decoration-none d-flex align-items-center "
                          to="/tenant/voice/voicelist">
                          <el-icon class="mr-3  menu-icon">
                            <Tickets />
                          </el-icon>
                          <span class="active">All Sent Voice</span>
                        </router-link>
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Bigger row -->
          <div class="col-md-12 col-xl-12 " style="margin: auto">
            <router-view> </router-view>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { ref, inject } from "vue";
import { useRoute } from "vue-router";
import deviceBreakpoint from "../../mixins/deviceBreakpoint";
import router from "../../router";
export default {
  setup() {
    const primarycolor = inject('primarycolor')
    const route = useRoute();
    const menuShouldShow = ref(false);
    const { xsOnly, smAndUp, mdAndUp, lgAndUp, xlAndUp } = deviceBreakpoint()
    const toggleMenu = () => {
      menuShouldShow.value = !menuShouldShow.value
    };

    const nextPage = () => {
      router.push('/tenant/voice/sendvoicemessage')
    }
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
      nextPage
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

.main {
  border: 1px solid #02172e30;
  border-radius: 30px;
}

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
  border-bottom: 2px solid #136acd;
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
  color: #002044;
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