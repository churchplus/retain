<template>
  <div>
    <Header headerName="SMS" />
  </div>

  <main class="mt-md-3" :class="{ main: mdAndUp || lgAndUp || xlAndUp }">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-3 col-12 mt-4">
          <router-link to="/tenant/sms/compose" class="no-decoration">
            <el-button
              color="#f9243932"
              class="font-weight-bold w-100 mb-3 text-dark"
              size="large"
            >
              Compose SMS
            </el-button>
          </router-link>
        </div>
        <!-- Side mennu -->
        <div
          class="col-md-9 col-12 mt-4 mb-5"
          :class="{ 'side-menu': mdAndUp || lgAndUp || xlAndUp }"
        >
          <div class="row mt-1">
            <div class="col-md-12 d-flex flex-wrap">
              <div
                class="row menu-item-con"
                :class="{
                  'active-link': route.path.includes('/tenant/sms/sent'),
                }"
              >
                <div class="col-md-12 menu-item-div m-auto">
                  <a class="btn btn-default font-weight-bold">
                    <span class="menu-item">
                      <router-link
                        class="r-link text-decoration-none d-flex align-items-center"
                        to="/tenant/sms/sent"
                      >
                        <el-button type="primary" class="active" size="large" text
                          >Sent</el-button
                        >
                        <!-- <span class="active">Sent</span> -->
                      </router-link>
                    </span>
                  </a>
                </div>
              </div>

              <div
                class="row menu-item-con"
                :class="{
                  'active-link': route.path === '/tenant/sms/scheduled',
                }"
              >
                <div class="col-md-12 menu-item-div m-auto">
                  <a class="btn btn-default font-weight-bold">
                    <span class="menu-item">
                      <router-link
                        class="r-link text-decoration-none d-flex align-items-center"
                        to="/tenant/sms/scheduled"
                      >
                        <el-button type="primary" class="active" size="large" text
                          >Scheduled</el-button
                        >
                      </router-link>
                    </span>
                  </a>
                </div>
              </div>
              <div class="row menu-item-con">
                <div class="col-md-12 menu-item-div m-auto">
                  <a class="btn btn-default font-weight-bold">
                    <span class="menu-item">
                      <router-link
                        class="r-link text-decoration-none d-flex align-items-center"
                        :to="{ name: 'BuyUnitSms', path: '/tenant/sms/buyunit' }"
                      >
                        <el-button type="primary" class="active" size="large" text
                          >Buy SMS Units</el-button
                        >
                      </router-link>
                    </span>
                  </a>
                </div>
              </div>
              <div class="row menu-item-con">
                <div class="col-md-12 menu-item-div m-auto">
                  <a class="btn btn-default font-weight-bold">
                    <span class="menu-item">
                      <router-link
                        class="r-link text-decoration-none d-flex align-items-center"
                        :to="{ name: 'SenderIDSms', path: '/tenant/sms/senderids' }"
                      >
                        <el-button type="primary" class="active" size="large" text
                          >Sender IDs</el-button
                        >
                      </router-link>
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Bigger row -->
        <div class="col-md-12">
          <router-view> </router-view>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { inject } from "vue";
import { useRoute } from "vue-router";
import deviceBreakpoint from "../../mixins/deviceBreakpoint";
import Header from "@/components/header/Header.vue";

export default {
  components: { Header },
  setup() {
    const route = useRoute();
    const { xsOnly, smAndUp, mdAndUp, lgAndUp, xlAndUp } = deviceBreakpoint();
    const primarycolor = inject("primarycolor");

    return {
      route,
      xlAndUp,
      lgAndUp,
      mdAndUp,
      xsOnly,
      smAndUp,
      primarycolor,
    };
  },
};
</script>

<style scoped>
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
  color: #136acd !important;
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
  /* color: #136acd; */
  color: #002044;
  opacity: 1;
}

@media screen and (max-width: 765px) {
  .show {
    overflow: hidden;
    height: 270px;
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
    padding-left: 40px;
  }
}
</style>
