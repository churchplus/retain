<template>
  <div class="container-top" :class="{ 'container-slim': lgAndUp || xlAndUp }">
          <div class="d-flex flex-column flex-sm-row justify-content-sm-between mb-3">
            <div class="head-text">
              <div>Attendance & Check-in</div>
            </div>
            <div class="actions">
              <router-link
                class="no-decoration"
                :to="{ name: 'AddCheckin' }"
                v-if="route.path === '/tenant/attendancecheckin'"
              >
                <el-button class="header-btn w-100 text-white" :color="primarycolor" round>
                  Add New Attendance
                </el-button>
              </router-link>
            </div>
          </div>
        <hr class="hr" />

        <div class="container-fluid">
            <router-view></router-view>
        </div>
  </div>
</template>

<script>
import { inject } from "vue";
import { useRoute } from "vue-router";
import deviceBreakpoint from "../../../mixins/deviceBreakpoint";
export default {
  setup() {
    const route = useRoute();
    const { lgAndUp, xlAndUp } = deviceBreakpoint();
    const primarycolor = inject('primarycolor')

    return {
      route,
      lgAndUp,
      xlAndUp,
      primarycolor
    };
  },
};
</script>

<style scoped>
* {
  color: #02172e;
  /* font: normal normal 600 ¿16px/22px Nunito Sans; */
  font-family: Nunito Sans !important;
}

.events {
  font: normal normal 800 29px Nunito sans;
}

.whole-con {
  display: flex;
  height: 100vh;
}

.main-con {
  width: 100%;
  height: 70%;
}

.main-body {
  height: 100%;
}

.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}

.buttonn {
  padding: 8px 20px;
  border: none;
  border-radius: 22px;
  font-size: 16px;
  font-weight: 600;
  margin: 0 8px;
  outline: none;
  text-decoration: none;
  box-sizing: border-box;
}

.buttonn:hover {
  cursor: pointer;
}

.no-person {
  height: 100%;
  display: flex;
  text-align: center;
}

.add-person-btn {
  background: #136acd;
  color: #fff;
}

.more-btn {
  background: #dde2e6;
}

.btn-icon {
  padding: 0 8px;
}

.empty-img {
  width: 30%;
  min-width: 397px;
  margin: auto;
}

.empty-img img {
  width: 100%;
  max-width: 200px;
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

  .top {
    height: 90px;
  }

  .no-person {
    height: calc(100% - 90px);
  }
}

@media (max-width: 640px) {
  .top {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .actions {
    margin-top: 15px;
  }
}

@media (max-width: 566px) {
  /* .button {
        width: 160px;
    } */
}

@media (max-width: 399px) {
  .button {
    margin-top: 10px;
  }
}

@media (max-width: 399px) {
  .attendanceResponsive {
    color: #02172e;
    font-family: Nunito Sans !important;
    font-size: 26px;
    padding-top: 20px;
  }
}
</style>