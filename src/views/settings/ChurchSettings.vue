<template>
  <div>
    <div class="container">
      <div class="row">
        <!-- Sidebar -->
        <div class="col-md-3 col-12 pt-3 sidebar">
          <div class="row">
            <div class="col-md-12">
              <h2 class="mb-5 mt-5 font-weight-700">Settings</h2>
            </div>
          </div>
          <div class="nav-show" @click="toggleSettingDropDown">
            <div>
              <span class="small-text1 dd-list-item"
                >{{ dropDownText }}...</span
              >
              <i
                v-if="settingLinkDropped"
                class="pi pi-angle-up more-icon1 ml-2 pt-2"
                :class="{ 'tbb-icon-rotate': !settingsIcon }"
              ></i>
              <i
                v-if="!settingLinkDropped"
                class="pi pi-angle-down more-icon1 ml-2 pt-2"
                :class="{ 'tbb-icon-rotate': settingsIcon }"
              ></i>
            </div>

            <transition-group name="fade" tag="div" >
              <div
                key="show-modal"
                class="show-modal"
                :class="{ 'dd-hide-list': !settingLinkDropped }"
              >
                <div class="row mb-3" v-if="!basicUser">
                  <div class="col-md-12 my-2">
                    <span class="small-text dd-list-item"
                      >User Management
                    </span>
                  </div>
                  <div
                    class="col-md-12 py-2 my-2 link-con dd-list-item"
                    :class="{ 'active-link': route.path.endsWith('/settings') }"
                  >
                    <router-link
                      class="font-weight-bold primary--text"
                      to="/tenant/settings"
                      >Users</router-link
                    >
                  </div>
                </div>

                <div class="row mb-3">
                  <div class="col-md-12 my-2">
                    <span class="small-text dd-list-item"
                      >Organisation profile</span
                    >
                  </div>
                  <div
                    class="col-md-12 py-2 my-2"
                    :class="{
                      'active-link': route.path.endsWith('/settings/profile'),
                    }"
                  >
                    <router-link
                      class="font-weight-bold primary--text dd-list-item"
                      to="/tenant/settings/profile"
                      >Profile</router-link
                    >
                  </div>
                </div>

                <div class="row mb-3">
                  <div class="col-md-12 my-2">
                    <span class="small-text dd-list-item">System setting</span>
                  </div>
                  <div
                    class="col-md-12 py-2 my-2"
                    :class="{
                      'active-link': route.path.endsWith(
                        '/settings/defaultmessage'
                      ),
                    }"
                  >
                    <router-link
                      class="font-weight-bold primary--text dd-list-item"
                      to="/tenant/settings/defaultmessage"
                      >Default message</router-link
                    >
                  </div>
                  <div
                    class="col-md-12 py-2 my-2"
                    :class="{
                      'active-link': route.path.endsWith(
                        '/tenant/settings/membership'
                      ),
                    }"
                  >
                    <router-link
                      class="font-weight-bold primary--text dd-list-item"
                      to="/tenant/settings/membership"
                      >Membership Category</router-link
                    >
                  </div>
                  <div class="col-md-12 my-2">
                    <router-link
                      class="font-weight-bold primary--text dd-list-item"
                      to="/tenant/settings/ageGroup"
                      >Age Group Category</router-link
                    >
                  </div>
                  <div class="col-md-12 my-2">
                    <router-link
                      class="font-weight-bold primary--text dd-list-item"
                      to="/tenant/settings/attendance"
                      >Attendance Category</router-link
                    >
                  </div>
                  <div class="col-md-12 my-2" v-if="false">
                    <router-link
                      class="font-weight-bold primary--text dd-list-item"
                      to="/tenant/settings/followupstatus"
                      >Follow Up Status</router-link
                    >
                  </div>
                  <div class="col-md-12 my-2">
                    <router-link
                      class="font-weight-bold primary--text dd-list-item"
                      to="/tenant/settings/firsttimersettings"
                      >New Guest Life Cycle Settings</router-link
                    >
                  </div>
                  <div class="col-md-12 my-2">
                    <router-link
                      class="font-weight-bold primary--text dd-list-item"
                      to="/tenant/workflow/list"
                      >Workflow</router-link
                    >
                  </div>
                  <div class="col-md-12 my-2">
                    <router-link
                      class="font-weight-bold primary--text dd-list-item"
                      to="/tenant/settings/archivedpeople"
                      >Archived People</router-link
                    >
                  </div>

                  <div class="col-md-12 my-2">
                    <router-link
                      class="font-weight-bold primary--text dd-list-item"
                      to="/tenant/settings/branchlevelsettings"
                      >Branch Level Settings</router-link
                    >
                  </div>
                  <div class="col-md-12 my-2">
                    <router-link
                      class="font-weight-bold primary--text dd-list-item"
                      to="/tenant/settings/customfieldsetup"
                      >Custom Field Setup</router-link
                    >
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-md-12 my-2">
                    <span class="small-text dd-list-item"
                      >Social & Mobile Setting
                    </span>
                  </div>
                  <div class="col-md-12 my-2">
                    <router-link
                      class="font-weight-bold primary--text dd-list-item"
                      to="/tenant/settings/social"
                      >Post Category</router-link
                    >
                  </div>
                </div>
                <div class="col-md-12 my-2" v-if="false">
                  <router-link
                    class="font-weight-bold primary--text"
                    to="/tenant/settings/giving"
                    >Online Giving Setup</router-link
                  >
                </div>
              </div>
            </transition-group>

            <div class="row mb-3" v-if="false">
              <div class="col-md-12 my-2">
                <span class="small-text">Accounting</span>
              </div>
              <div class="col-md-12 my-2">
                <router-link class="font-weight-bold link" to=""
                  >Sales and Currency</router-link
                >
              </div>
            </div>
          </div>
        </div>

        <!-- main content -->
        <div class="col-md-9  col-12">
          <router-view> </router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import { ref, computed } from "vue";
export default {
  setup() {
    const showp = ref(false);
    const route = useRoute();
    const settingLinkDropped = ref(false);
    const settingsIcon = ref(false);
    const toggleSettingDropDown = () => {
      settingLinkDropped.value = !settingLinkDropped.value;
      settingsIcon.value = !settingsIcon.value;
    };
    const moreShown = ref(false);
    const showMore = () => {
      moreShown.value = !moreShown.value;
    };
    const dropDownText = computed(() => {
      return settingLinkDropped.value ? "Hide menu" : "Show menu";
    });

    const roleOfCurrentUser = computed(() => {
      if (!localStorage.getItem('roles')) return []
      return JSON.parse(localStorage.getItem('roles'))
    })
    const admin = ref(roleOfCurrentUser.value.some(i => i.toLowerCase() === 'admin'))
    const basicUser = ref(!admin.value && roleOfCurrentUser.value.some(i => i.toLowerCase() === 'basicuser'))

        return {
            route,
            settingLinkDropped,
            toggleSettingDropDown,
            showMore,
            dropDownText,
            moreShown,
            showp,
            settingsIcon,
            admin,
            basicUser,
            roleOfCurrentUser,
        }
    }

};
</script>

<style scoped>
* {
  box-sizing: border-box;
  color: #02172e;
}

.small-text {
  font-size: 14px;
}
.small-text1 {
  display: none;
}

.active-link {
  background: #ebeff4;
  border-radius: 5px;
  width: 100%;
}
.fa-angle-up {
  display: none !important;
}
/* .tbb-icon-rotate{
  display: none;
} */

.more-icon1 {
  display: none;
}

@media screen and (min-width: 767px) {
  .sidebar {
    min-height: 100vh;
    border-right: 1px solid #4762f01f;
  }
}

@media screen and (max-width: 1280px) {
  .small-text {
    font-size: 13px;
  }

  .link {
    font-size: 14px;
  }
}
@media screen and (max-width: 767px) {
  .dd-hide-list {
    height: 0;
    overflow: hidden;
    transition: all 0.5s ease-in-out;
    display: none;
  }
  .more-icon1 {
    display: inline-block;
  }

  .dd-list-item {
    list-style: none;
    padding-top: 19px;
  }
  .tbb-icon-rotate {
    transition: all 0.5s ease-in-out;
    transform: rotate(180deg);
    color: #190138;
    font-size: 20px;
  }
  .fade-enter-from {
    opacity: 0;
    transform: Scale(0.6);
  }
  .fade-enter-to {
    opacity: 1;
    transform: scale(1);
  }
  .fade-enter-active {
    transition: all 0.2s ease;
  }
  .fade-leave-from {
    opacity: 1;
    transform: translate(0);
  }
  .fade-leave-to {
    opacity: 0;
    transform: translate(-60px);
  }
  .fade-leave-active {
    transition: all 0.3s ease;
  }
  .fa-angle-up {
    display: inline !important;
    margin-left: 60%;
  }
  .small-text1 {
    font-size: 15px !important;
    font-weight: bold;
  }
  .small-text1 {
    display: inline;
  }
}
</style>