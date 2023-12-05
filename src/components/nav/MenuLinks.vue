<template>
  <el-row @click="linkClicked">
    <el-col :span="24">
      <div class="ml-4 mt-4 head-text s-24">Retain</div>
      <el-menu
        default-active="1"
        :active-text-color="primarycolor"
        background-color="#ffffff"
        class="el-menu-vertical-demo mt-3"
        text-color="#02172e"
        :unique-opened="true"
      >
        <div
          v-for="(item, index) in menuLink"
          :key="index"
          class="font-weight-700 secondary-text"
        >
          <el-sub-menu :index="`${index + 1}`" v-if="item.submenu.length > 0">
            <template #title>
              <el-icon>
                <img
                  :src="item.logo"
                  class="link-icon"
                  width="30"
                  alt=""
                  v-if="item.logo"
                />
                <More color="#76787A" v-else />
              </el-icon>
              <span>{{ item.name }}</span>
            </template>
            <div v-for="(x, indexe) in item.submenu" :key="indexe">
              <el-sub-menu
                :index="`${index + 1}-${indexe + 1}`"
                v-if="x.submenu && x.submenu.length > 0"
              >
                <template #title>{{ x.name }}</template>
                <el-menu-item
                  :index="`${index + 1}-${indexe + 1}-${indexee + 1}`"
                  v-for="(y, indexee) in x.submenu"
                  :key="indexee"
                  @click="routeToPage(y)"
                  >{{ y.name }}</el-menu-item
                >
              </el-sub-menu>
              <el-menu-item-group @click="routeToPage(x)" v-else>
                <el-menu-item :index="`${index + 1}-${indexe + 1}`"
                  >{{ x.name }}
                </el-menu-item>
              </el-menu-item-group>
            </div>
          </el-sub-menu>
          <el-menu-item
            :index="`${index + 1}`"
            class="w-100"
            @click="routeToPage(item)"
            v-else
          >
            <el-icon>
              <img :src="item.logo" class="link-icon" width="30" alt="" />
            </el-icon>
            <span>{{ item.name }}</span>
          </el-menu-item>
        </div>
      </el-menu>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="24">
      <div class="nav">
        <div class="w-100 align-self-end">
          <hr class="hr" />
          <div class="d-flex ml-3">
            <el-icon class="mt-1">
              <TopLeft />
            </el-icon>
            <div class="ml-3 c-pointer" @click="logout">Logout</div>
          </div>
        </div>
        <a class="link routelink" v-if="false"> Integration </a>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { computed, ref, watchEffect, inject } from "vue";
import { useRoute } from "vue-router";
import store from "@/store/store";
import axios from "@/gateway/backendapi";
import { useRouter } from "vue-router";
import setupService from "../../services/setup/setupservice";
export default {
  components: {},
  emits: ["tenantname", "linkclicked"],
  setup(props, { emit }) {
    const primarycolor = inject("primarycolor");
    const route = useRoute();
    const router = useRouter();
    const churchLogo = ref("");
    const roleOfCurrentUser = computed(() => {
      if (!localStorage.getItem("roles")) return [];
      return JSON.parse(localStorage.getItem("roles"));
    });

    const admin = ref(roleOfCurrentUser.value.some((i) => i.toLowerCase() === "admin"));
    const followup = ref(
      roleOfCurrentUser.value.some((i) => i.toLowerCase() === "followup")
    );
    const basicUser = ref(
      !admin.value && roleOfCurrentUser.value.some((i) => i.toLowerCase() === "basicuser")
    );
    const financialAccount = ref(
      !admin.value &&
        roleOfCurrentUser.value.some((i) => i.toLowerCase() === "financialaccount")
    );
    const mobileAdmin = ref(
      !admin.value &&
        roleOfCurrentUser.value.some((i) => i.toLowerCase() === "mobileadmin")
    );
    const report = ref(
      !admin.value && roleOfCurrentUser.value.some((i) => i.toLowerCase() === "reports")
    );
    const groupLeader = ref(
      !admin.value &&
        roleOfCurrentUser.value.some((i) => i.toLowerCase() === "groupleader")
    );
    const canAccessFirstTimers = ref(
      !admin.value &&
        roleOfCurrentUser.value.some((i) => i.toLowerCase() === "canaccessfirsttimers")
    );

    const tenantInfo = ref({});

    const getChurchProfile = async () => {
      try {
        let res = await axios.get(
          `/GetChurchProfileById?tenantId=${tenantInfo.value.tenantId}`
        );
        churchLogo.value = res.data.returnObject.logo;
      } catch (err) {
        console.log(err);
      }
    };

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
        tenantInfo.value = getUser.value;
        getChurchProfile();
        emit("tenantname", tenantInfo.value);
      }
    });

    const tenantDisplayName = computed(() => {
      if (!tenantInfo.value.churchName) return "";
      const name =
        tenantInfo.value.churchName.length < 15
          ? tenantInfo.value.churchName
          : `${tenantInfo.value.churchName.slice(0, 15)}...`;
      return name;
    });

    const logout = () => {
      localStorage.clear();
      router.push("/");
      store.dispatch("clearCurrentUser", {});
      setupService.clearStore();
    };

    const menuLink = ref([]);

    const displayRoleMenu = () => {
      const adminIndex = roleOfCurrentUser.value.findIndex(
        (i) => i.toLowerCase() == "admin"
      );
      if (adminIndex >= 0) {
        roleOfCurrentUser.value.unshift(roleOfCurrentUser.value.splice(adminIndex, 1)[0]);
      }

      const basicIndex = roleOfCurrentUser.value.findIndex(
        (i) => i.toLowerCase() == "basicuser"
      );
      if (basicIndex >= 0) {
        roleOfCurrentUser.value.unshift(roleOfCurrentUser.value.splice(basicIndex, 1)[0]);
      }

      const dashboard = {
        name: "Dashboard",
        logo: require("../../assets/retain/home.png"),
        route: "/tenant",
        submenu: [],
        id: 1,
      };
      // const sms = {
      //   name: "SMS",
      //   logo: require("../../assets/dashboardlinks/com-icon.svg"),
      //   route: "/tenant/sms/sent",
      //   submenu: [],
      //   id: 2,
      // };
      // const whatsapp = {
      //   name: "Whatsapp",
      //   logo: require("../../assets/dashboardlinks/whatsapp-icon.svg"),
      //   route: "/tenant/whatsapp",
      //   submenu: [],
      //   id: 3,
      // };

      // const email = {
      //   name: "Email",
      //   logo: require("../../assets/dashboardlinks/email-icon.svg"),
      //   route: "/tenant/email",
      //   submenu: [],
      //   id: 4,
      // };
      // const voice = {
      //   name: "Voice",
      //   logo: require("../../assets/dashboardlinks/voice-icon.svg"),
      //   route: "/tenant/voice/voicelist",
      //   submenu: [],
      //   id: 5,
      // };
      // const contactlist = {
      //   name: "Contact-list",
      //   logo: require("../../assets/dashboardlinks/contact-list.svg"),
      //   route: "/tenant/contacts",
      //   submenu: [],
      //   id: 6,
      // };

      // const people = {
      //   id: 2,
      //   name: 'People',
      //   logo: require('../../assets/dashboardlinks/people.svg'),
      //   route: '/',
      //   submenu: []
      // }

      const contacts = {
        id: 2,
        name: "Contacts",
        logo: require("../../assets/retain/usergroup.png"),
        route: "/",
        submenu: [
          {
            name: "Contacts",
            logo: "/",
            route: "/tenant/people",
          },
          {
            name: "Contact Segment",
            logo: "/",
            route: "/tenant/peoplegroups",
          },
        ],
      };

      const reports = {
        id: 3,
        name: "Reports",
        logo: require("../../assets/retain/report.png"),
        route: "/",
        submenu: [
          {
            name: "SMS Report",
            logo: "/",
            // route: "/tenant/report/sms",
            route: "/tenant/sms/sent",
          },
          {
            name: "Email Report",
            logo: "/",
            route: "/tenant/email",
            // route: "/tenant/report/email",
          },
          {
            name: "Voice Report",
            logo: "/",
            route: "/tenant/voice/voicelist",
          },
        ],
      };

      const campaigns = {
        id: 4,
        name: "Campaigns",
        logo: require("../../assets/retain/campaign.png"),
        route: "/",
        submenu: [
          {
            name: "SMS",
            logo: "/",
            route: "/tenant/sms/compose",
          },
          {
            name: "Email",
            logo: "/",
            route: "/tenant/email/compose",
          },
          {
            name: "Voice",
            logo: "/",
            route: "/tenant/voice/sendvoicemessage",
          },
          {
            name: "Whatsapp",
            logo: "/",
            route: "/tenant/whatsapp",
          },
          // {
          //   name: "Templates",
          //   logo: "/",
          //   route: "/tenant/smstemplate",
          // },
          // {
          //   name: "Sender IDs",
          //   logo: "/",
          //   route: "/tenant/senderid",
          // },
          {
            name: "URLs",
            logo: "/",
            route: "/tenant/url",
          },
          // {
          //   name: "Manage Campaigns",
          //   logo: "/",
          //   route: "/tenant/attendancecheckin",
          // },
        ],
      };

      const wallets = {
        name: "Wallets",
        logo: require("../../assets/retain/wallet.png"),
        route: "/tenant/wallets",
        submenu: [],
        id: 5,
      };

      // const profile = {
      //   name: "Account Profile",
      //   logo: require("../../assets/dashboardlinks/contact-list.svg"),
      //   route: "/tenant/contacts",
      //   submenu: [],
      //   id: 10,
      // };

      const settings = {
        id: 6,
        name: "Settings",
        logo: require("../../assets/retain/settings.png"),
        route: "/",
        submenu: [
          {
            name: "Account Profile",
            logo: "/",
            route: "/tenant/settings/profile",
          },
          {
            name: "Change Password",
            logo: "/",
            route: "/tenant/settings/changepassword",
          },
          {
            name: "API Settings",
            logo: "/",
            route: "/tenant/settings/apisetting",
          },
        ],
      };

      menuLink.value.push(
        dashboard,
        contacts,
        campaigns,
        reports,
        wallets,
        settings
      );
    };
    displayRoleMenu();

    const routeToPage = (item) => {
      router.push(item.route);
    };

    const linkClicked = (e) => {
      if (
        e.target.classList.contains("el-menu-item") &&
        e.target.classList.contains("is-active")
      ) {
        emit("linkclicked", true);
      }

      if (
        e.target.parentElement.classList.contains("el-menu-item") &&
        e.target.parentElement.classList.contains("is-active")
      ) {
        emit("linkclicked", true);
      }
    };

    return {
      route,
      tenantDisplayName,
      churchLogo,
      logout,
      roleOfCurrentUser,
      followup,
      admin,
      basicUser,
      financialAccount,
      mobileAdmin,
      report,
      groupLeader,
      canAccessFirstTimers,
      menuLink,
      routeToPage,
      linkClicked,
      tenantInfo,
      getUser,
      primarycolor,
    };
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.nav .link {
  justify-content: start;
  color: #02172e;
  text-decoration: none;
  opacity: 0.8;
  margin: 0 0 0 10px;
  font-size: 0.9em;
  cursor: pointer;
}

.link-icon {
  padding-right: 10px;
}

.link-icon.branch {
  opacity: 0.6;
}

.link-image {
  width: 25px;
  height: 24px;
  padding-right: 0;
  object-fit: cover;
}

.hr {
  border: 1px solid #00204412;
  margin: 10px 0;
  opacity: 0.5;
}

@media screen and (max-width: 1100px) {
  .nav {
    width: 266px;
    position: absolute;
    z-index: 10;
  }

  /* .nav .link {
    opacity: 1;
  } */
}
</style>
