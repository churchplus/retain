<template>
  <div>
    <Header headerName="SMS" />
  </div>

  <main class="mt-md-3" :class="{ main: mdAndUp || lgAndUp || xlAndUp }">
    <div class="container-fluid">
      <div class="row">
        <div class="col-6 col-md-2 mt-4" v-for="(item, index) in smsMenu" :key="index">
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
        <div class="col-md-12">
          <router-view> </router-view>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { inject, ref } from "vue";
import { useRoute } from "vue-router";
import deviceBreakpoint from "../../mixins/deviceBreakpoint";
import Header from "@/components/header/Header.vue";

export default {
  components: { Header },
  setup() {
    const route = useRoute();
    const { xsOnly, smAndUp, mdAndUp, lgAndUp, xlAndUp } = deviceBreakpoint();
    const primarycolor = inject("primarycolor");

    const smsMenu = ref([
      {
        name: "Compose SMS",
        path: "/tenant/sms/compose",
      },
      // {
      //   name: "Sent",
      //   path: "/tenant/sms/sent",
      // },
      {
        name: "Scheduled",
        path: "/tenant/sms/scheduled",
      },
      {
        name: "Buy SMS Units",
        path: "/tenant/sms/buyunit",
      },
      // {
      //   name: "Templates",
      //   path: "/tenant/sms/template",
      // },\
      {
        name: "Templates",
        path: "/tenant/sms/draft",
      },
      {
        name: "Sender IDs",
        path: "/tenant/sms/senderids",
      },
      // {
      //   name: "URLs",
      //   path: "/tenant/sms/url",
      // }
    ]);

    return {
      route,
      xlAndUp,
      lgAndUp,
      mdAndUp,
      xsOnly,
      smAndUp,
      primarycolor,
      smsMenu,
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
