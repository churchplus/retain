<template>
  <main :class="{ 'container-slim': lgAndUp || xlAndUp }" id="main">
    <div class="second-col container-top">
      <div class="create-btn-div">
        <div>
          <h2 class="head-text">Dashboard</h2>
        </div>
        <el-dropdown trigger="click">
          <el-button :color="primarycolor" class="header-btn w-100" round>
            Create new <el-icon class="el-icon--right"><arrow-down /></el-icon>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item v-for="(item, index) in createNew" :key="index" @click="router.push(item.to)">{{
                item.name
              }}</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>

      <div class="row mb-4">
        <div class="col-12">
          <div class="col-md-12 text-dark py-3 mb-2 day3" v-if="notifiedDays === 10">
            <div class="">
              10 days remaining before your subscription expires, kindly
              subscribe before
              {{
                moment
                  .parseZone(
                    new Date(getRenewalDate).toDateString(),
                    "YYYY MM DD HH ZZ"
                  )
                  ._i.substr(4, 11)
              }}
            </div>
            <div class="cursor-pointer " @click="subscribeNow">
              <el-button round>Subscribe now</el-button>
            </div>
          </div>
          <div class="col-md-12 text-dark py-3 mb-2 day3" v-if="notifiedDays === 9">
            <div class="">
              9 days remaining before your subscription expires, kindly
              subscribe before
              {{
                moment
                  .parseZone(
                    new Date(getRenewalDate).toDateString(),
                    "YYYY MM DD HH ZZ"
                  )
                  ._i.substr(4, 11)
              }}
            </div>
            <div class="cursor-pointer " @click="subscribeNow">
              <el-button round>Subscribe now</el-button>
            </div>
          </div>
          <div class="col-md-12 text-dark py-3 mb-2 day3" v-if="notifiedDays === 8">
            <div class="">
              8 days remaining before your subscription expires, kindly
              subscribe before
              {{
                moment
                  .parseZone(
                    new Date(getRenewalDate).toDateString(),
                    "YYYY MM DD HH ZZ"
                  )
                  ._i.substr(4, 11)
              }}
            </div>
            <div class="cursor-pointer " @click="subscribeNow">
              <el-button round>Subscribe now</el-button>
            </div>
          </div>
          <div class="col-md-12 text-dark py-3 mb-2 day3" v-if="notifiedDays === 7">
            <div class="">
              7 days remaining before your subscription expires, kindly
              subscribe before
              {{
                moment
                  .parseZone(
                    new Date(getRenewalDate).toDateString(),
                    "YYYY MM DD HH ZZ"
                  )
                  ._i.substr(4, 11)
              }}
            </div>
            <div class="cursor-pointer " @click="subscribeNow">
              <el-button round>Subscribe now</el-button>
            </div>
          </div>
          <div class="col-md-12 py-3 mb-1 day2" v-if="notifiedDays === 6">
            <div class="">
              6 days remaining before your subscription expires, kindly
              subscribe before
              {{
                moment
                  .parseZone(
                    new Date(getRenewalDate).toDateString(),
                    "YYYY MM DD HH ZZ"
                  )
                  ._i.substr(4, 11)
              }}
            </div>
            <div class="cursor-pointer " @click="subscribeNow">
              <el-button round>Subscribe now</el-button>
            </div>
          </div>
          <div class="col-md-12 py-3 mb-1 day2" v-if="notifiedDays === 5">
            <div class="">
              5 days remaining before your subscription expires, kindly
              subscribe before
              {{
                moment
                  .parseZone(
                    new Date(getRenewalDate).toDateString(),
                    "YYYY MM DD HH ZZ"
                  )
                  ._i.substr(4, 11)
              }}
            </div>
            <div class="cursor-pointer " @click="subscribeNow">
              <el-button round>Subscribe now</el-button>
            </div>
          </div>
          <div class="col-md-12 py-3 mb-1 day1" v-if="notifiedDays === 4">
            <div class="">
              4 days remaining before your subscription expires, kindly
              subscribe before
              {{
                moment
                  .parseZone(
                    new Date(getRenewalDate).toDateString(),
                    "YYYY MM DD HH ZZ"
                  )
                  ._i.substr(4, 11)
              }}
            </div>
            <div class="cursor-pointer " @click="subscribeNow">
              <el-button round>Subscribe now</el-button>
            </div>
          </div>
          <div class="col-md-12 py-3 mb-1 day1" v-if="notifiedDays === 3">
            <div class="">
              3 days remaining before your subscription expires, kindly
              subscribe before
              {{
                moment
                  .parseZone(
                    new Date(getRenewalDate).toDateString(),
                    "YYYY MM DD HH ZZ"
                  )
                  ._i.substr(4, 11)
              }}
            </div>
            <div class="cursor-pointer " @click="subscribeNow">
              <el-button round>Subscribe now</el-button>
            </div>
          </div>
          <div class="col-md-12 py-3 mb-1 day1" v-if="notifiedDays === 2">
            <div class="">
              2 days remaining before your subscription expires, kindly
              subscribe before
              {{
                moment
                  .parseZone(
                    new Date(getRenewalDate).toDateString(),
                    "YYYY MM DD HH ZZ"
                  )
                  ._i.substr(4, 11)
              }}
            </div>
            <div class="cursor-pointer " @click="subscribeNow">
              <el-button round>Subscribe now</el-button>
            </div>
          </div>
          <div class="col-md-12 py-3 m-0 day1" v-if="notifiedDays === 1">
            <div class="mt-0">
              1 day remaining before your subscription expires, kindly
              subscribe before
              {{
                moment
                  .parseZone(
                    new Date(getRenewalDate).toDateString(),
                    "YYYY MM DD HH ZZ"
                  )
                  ._i.substr(4, 11)
              }}
            </div>
            <div class="cursor-pointer " @click="subscribeNow">
              <el-button round>Subscribe now</el-button>
            </div>
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-between flex-column flex-md-row  px-0">
        <div class="help-text2">
          <img src="../../assets/thingstodo.svg" alt="" />
          <div class="can-do">
            <h4>Things You Can Do</h4>
            <div class="can-do-links can-do">
              <router-link class="primary--text" to="/tenant/people/add">Add Member</router-link>
              <router-link class="primary--text" to="/tenant/sms/compose">Send SMS</router-link>
              <router-link class="primary--text" to="/tenant/people/addfirsttimer">Add First Timer</router-link>
              <router-link class="primary--text" to="/tenant/addoffering">Record Offering</router-link>
              <router-link class="primary--text" to="/tenant/transactionlist">Record Expense</router-link>
            </div>
          </div>
        </div>

        <div v-if="tenantInfoBasic && tenantInfoBasic.memberCount && tenantInfoBasic.memberCount === 0"
          class="d-flex justify-content-center mt-4 justify-content-md-end mt-md-0">
          <img src="../../assets/welcome_user.svg" style="width: 250px" />
        </div>
        <div class="number-boxes" v-else>
          <div class="box mr-4" v-loading="dashboardLoading">
            <div class="top p-3">
              <div class="d-flex justify-content-between">
                <img src="../../assets/usergroup.svg" alt="" style="position: relative; top: -5px; left: -8px;">
                <div class="">
                  <p class="mb-0 s-8">FIRST TIMERS</p>
                  <h4 class="primary--text font-weight-700 mt-1 s-16">{{ tenantInfoBasic &&
                    tenantInfoBasic.firstTimerCount ? tenantInfoBasic.firstTimerCount : 0 }}</h4>
                </div>
              </div>
              <div>
                <h1 class="font-weight-700 s-30 mt-2">{{ tenantInfoBasic.memberCount }}</h1>
                <span class="size-text primary--text">Church Size</span>
              </div>
            </div>
            <div class="box-bottom px-3 py-2">
              <el-tooltip class="box-item" effect="dark" :content="planUserIs" placement="top-start">
                <div class="s-12 font-weight-bold">
                  {{ planUserIs }}
                </div>
              </el-tooltip>
              <router-link :to="{ name: 'Subscription' }" class="mt-1 no-decoration">
                <el-button :color="!buttonTextCheck.color ? primarycolor : ''" class="mt-2" style="height: 25px"
                  :class="[buttonTextCheck.color, { 'bg-warning': calculatedPercentage >= 90, 'border-0  bg-danger': notifiedDays <= 4 }]"
                  round>
                  <p class="mb-0 small" :class="[buttonTextCheck.color]">{{ buttonTextCheck.text }}</p>
                </el-button>
              </router-link>
            </div>
          </div>
          <div class="box" v-loading="dashboardLoading">
            <div class="top p-3">
              <img src="../../assets/inboxgroup.svg" alt="" style="position: relative; left: -8px;">
              <div>
                <h1 class="font-weight-700 s-30">{{ tenantInfoBasic.smsUnit }}</h1>
                <span class="size-text primary--text">SMS Units</span>
              </div>
            </div>
            <div class="box-bottom px-3 py-2">
              <router-link :to="{ name: 'BuyUnits', path: '/tenant/buyunits' }" class="no-decoration">
                <el-button type="info" class="push-down small" style="height: 25px" round>
                  <p class="mb-0 small">BUY UNITS</p>
                </el-button>
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-5" v-loading="dashboardLoading"></div>

      <div class="container-fluid">
        <div class="row">
          <div class="col-8 offset-2 offset-md-0 col-md-3 p-0" v-if="
            tenantInfoCeleb.length > 0 ||
            (tenantInfoFirstTimerWeekly[0] && tenantInfoFirstTimerWeekly[0].data.some(i => i > 0)) ||
            (tenantInfoAttendanceWeekly[0] && tenantInfoAttendanceWeekly[0].data.some(i => i > 0))
          ">
            <div class="more-things side p-3" v-if="!tenantInfoExtra.hasWebsite">

              <img src="../../assets/website2.svg" class="w-100" />
              <div class="mt-4">Website</div>
              <div class="more-body mt-2">
                Get a user engaging website for your church.
              </div>
              <a href="https://churchplus.co/awoofwebsite/" target="_blank" class="no-decoration">
                <el-button class="mt-1" round>Get one now</el-button>
              </a>
            </div>

            <div class="more-things side p-3 mt-4" v-if="!tenantInfoExtra.hasOnlineGiving">
              <img src="../../assets/onlinegiving2.svg" class="w-100" />
              <div class="mt-4">Online Giving</div>
              <div class="more-body mt-2">
                Make online donations to your church.
              </div>
              <router-link to="/tenant/payments" class="no-decoration">
                <el-button class="mt-1" round>Set up now</el-button>
              </router-link>
            </div>

            <!-- <div class="more-things side p-3 mt-4" v-if="!tenantInfoExtra.hasMobileApp">
              <img src="../../assets/mobileapp2.svg" class="w-100" />
              <div class="mt-4">Mobile App</div>
              <div class="more-body mt-2">
                Get a customized mobile app for your church.
              </div>
              <router-link :to="{ name: 'MobileOnboarding' }" class="no-decoration">
                <el-button class="mt-1" round>Set up now</el-button>
              </router-link>
            </div> -->
          </div>

          <div :class="{
            'col-12 col-md-9':
              !tenantInfoExtra.hasMobileApp ||
              !tenantInfoExtra.hasOnlineGiving ||
              !tenantInfoExtra.hasWebsite,
            'col-md-12 px-0':
              tenantInfoExtra.hasMobileApp &&
              tenantInfoExtra.hasOnlineGiving &&
              tenantInfoExtra.hasWebsite,
          }">

            <div v-if="tenantInfoCeleb && tenantInfoCeleb.length > 0">
              <div class="celeb-header">
                <div class="celeb-icon">
                  <img src="../../assets/celeb-icon.svg" alt="Celebration Icon" />
                </div>
                <div class="celeb-header-text">
                  <p>Celebrations</p>
                </div>
              </div>
              <Table :data="tenantInfoCeleb" :headers="celebHeaders" class="mt-3" :checkMultipleItem="false">
                <template #name="{ item }">
                  <div class="c-pointer" @click="showCelebrationDetail(item)">
                    <el-card shadow="hover" class="c-pointer person-image" v-if="item.photo"
                      style="border-radius: 50%; height: 26px; width: 26px;">
                      <img :src="item ? item.photo : ''" alt=""
                        style="border-radius: 50%; height: 26px; width: 26px; object-fit: cover" />
                    </el-card>
                    <el-avatar :size="25" class="mt-1" v-else><el-icon color="#000000">
                        <UserFilled />
                      </el-icon>
                    </el-avatar>
                    <span class="ml-3">{{ item.name }}</span>
                    <div class="celeb-badge-desc celeb-badge"
                      v-if="item.dayOfCelebration.toString().toLowerCase().includes('today')"></div>
                  </div>
                </template>
                <template #date="{ item }">
                  <div class="c-pointer" @click="showCelebrationDetail(item)">
                    {{ dateFormat(item.date) }}
                  </div>
                </template>
                <template v-slot:dayOfCelebration="{ item }">
                  <div class="c-pointer" @click="showCelebrationDetail(item)" >
                    {{ item.dayOfCelebration }}
                  </div>
                </template>
                <template v-slot:celebration="{ item }">
                  <div class="c-pointer" @click="showCelebrationDetail(item)">
                    {{ item.celebration }}
                  </div>
                </template>
                <template v-slot:phone="{ item }">
                  <div class="c-pointer" @click="showCelebrationDetail(item)">
                    {{ item.phone }}
                  </div>
                </template>
                <template v-slot:action="{ item }">
                  <div class="cursor-pointer" >
                    <el-dropdown trigger="click">
                      <el-icon>
                        <MoreFilled />
                      </el-icon>
                      <template #dropdown>
                        <el-dropdown-menu>
                          <el-dropdown-item>
                            <router-link :to="
                              item.phone
                                ? `/tenant/sms/compose?phone=${item.phone}`
                                : ''
                            " :class="{ 'fade-text': !item.phone, 'text-color': item.phone }">Send
                              SMS</router-link>
                          </el-dropdown-item>
                          <el-dropdown-item>
                            <router-link :to="
                              item.email
                                ? `/tenant/email/compose?phone=${item.email}`
                                : ''
                            " :class="{ 'fade-text': !item.email, 'text-color': item.email }">Send
                              Email</router-link>
                          </el-dropdown-item>
                        </el-dropdown-menu>
                      </template>
                    </el-dropdown>
                  </div>
                </template>
              </Table>
            </div>
            <div v-show="
              tenantInfoCeleb.length > 0 ||
              (tenantInfoFirstTimerWeekly[0] &&
                tenantInfoFirstTimerWeekly[0].data.length > 0) ||
              (tenantInfoFirstTimerWeekly[0] &&
                tenantInfoFirstTimerWeekly[0].data[0] > 0) ||
              (tenantInfoAttendanceWeekly[0] &&
                tenantInfoAttendanceWeekly[0].data.length > 0) ||
              (tenantInfoAttendanceWeekly[0] &&
                tenantInfoAttendanceWeekly[0].data[0] > 0)
            ">
              <div v-if="tenantInfoAttendanceWeekly && attendanceDataExist">
                <div class="adjust-view col-10 col-sm-3 offset-sm-9 mt-5 mt-md-0">
                  <div class="view-report">View Reports</div>
                  <div class="weekly">
                    <span @click="weeklyAttendance"
                      :class="{ active: attendanceBoolean }">Weekly</span>&nbsp;&nbsp;&nbsp;<span
                      @click="monthlyAttendance" :class="{ active: !attendanceBoolean }">Monthly</span>
                  </div>
                </div>
                <div v-if="attendanceBoolean" class="mt-4">
                  <ColumnChart domId="chart1" title="Event Attendance" subtitle="Weekly Attendance of Events"
                    header="Members Attendance" :data="chartData" :series="series" :attendanceSeries="attendanceSeries" />
                </div>
                <div v-else class="mt-4">
                  <ColumnChart domId="chart1" title="Event Attendance" subtitle="Monthly Attendance of Events"
                    header="Members Attendance" :data="monthlyAttendanceObj" :series="series"
                    :attendanceSeries="attendanceSeries" />
                </div>
              </div>

              <div v-if="tenantInfoFirstTimerWeekly && firstTimerDataExist">
                <div class="adjust-view col-10 col-sm-3 offset-sm-9">
                  <div class="view-report">View Reports</div>
                  <div class="weekly">
                    <span @click="weeklyFirstTimer"
                      :class="{ active: firstTimerBoolean }">Weekly</span>&nbsp;&nbsp;&nbsp;<span
                      @click="monthlyFirstTimer" :class="{ active: !firstTimerBoolean }">Monthly</span>
                  </div>
                </div>

                <div v-if="firstTimerBoolean">
                  <ColumnChart domId="chart3" title="First Timer Inflow" subtitle="How First Timers Come to Church"
                    header="First Timers Attendance" :data="chartData2" :series="series2"
                    :attendanceSeries="attendanceSeries" />
                </div>
                <div v-else class="ColumnChartDiv">
                  <ColumnChart domId="chart4" title="First Timer Inflow" subtitle="How First Timer Come to Church"
                    header="First Timers Attendance" :data="monthlyFirstTimerObj" :series="series2"
                    :attendanceSeries="attendanceSeries" />
                </div>
              </div>


              <div class="mt-4" v-show="firstTimerPieExist">
                <div class="">
                  <div class="row">
                    <div class="col-12 col-md-6 d-flex justify-content-center">
                      <ByGenderChart domId="source" title="Invitation Source" distance="5" :titleMargin="10" :summary="
                        tenantInfoInvitationSource
                          ? tenantInfoInvitationSource
                          : []
                      " />
                    </div>
                    <div class="col-12 col-md-6 mt-3 mt-md-0 d-flex justify-content-center">
                      <ByMaritalStatusChart domId="join" title="Interested In Joining" :titleMargin="10" :summary="
                        tenantInfoInterestedInJoining
                          ? tenantInfoInterestedInJoining
                          : []
                      " />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="
        tenantInfoCeleb.length === 0 &&
        (tenantInfoFirstTimerWeekly[0] && tenantInfoFirstTimerWeekly[0].data.every(i => i === 0)) &&
        (tenantInfoAttendanceWeekly[0] && tenantInfoAttendanceWeekly[0].data.every(i => i === 0))
      ">
        <div class="container-fluid mt-5">
          <div class="row">
            <div class="col-12 more-things">
              <div class="can-do">
                <h4>More Benefits You Can Get</h4>
              </div>
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-12 col-sm-6 col-md-4 more-things">
              <img src="../../assets/website2.svg" />
              <div class="mt-4">
                <div class="can-do">
                  <h4>Website</h4>
                </div>
              </div>
              <div class="more-body mt-2">
                Get a user engaging website for your church.
              </div>
              <a href="https://churchplus.co/awoofwebsite/" class="no-decoration" target="_blank">
                <el-button class="mt-1" round>Get one now</el-button>
              </a>
            </div>
            <div class="col-12 col-sm-6 col-md-4 mt-5 mt-sm-0 more-things second">
              <img src="../../assets/onlinegiving2.svg" />
              <div class="mt-4">
                <div class="can-do">
                  <h4>Online giving</h4>
                </div>
              </div>
              <div class="more-body mt-2">
                Allow members to make online donations to your church.
              </div>
              <router-link to="/tenant/payments" class="no-decoration">
                <el-button class="mt-1" round>Set up now</el-button>
              </router-link>
            </div>
            <!-- <div class="col-12 col-sm-6 col-md-4 mt-5 mt-md-0 more-things">
              <img src="../../assets/mobileapp2.svg" />
              <div class="mt-4">
                <div class="can-do">
                  <h4>Mobile app</h4>
                </div>
              </div>
              <div class="more-body mt-2">
                Get a customized mobile app for your church.
              </div>
              <router-link :to="{ name: 'MobileOnboarding' }" class="no-decoration">
                <el-button class="mt-1" round>Set up now</el-button>
              </router-link>
            </div> -->
          </div>
        </div>
      </div>
    </div>
    <el-dialog v-model="pastorsDialog" title="" class="pastorsDialog" :width="mdAndUp || lgAndUp || xlAndUp ? `50%` : `90%`" align-center>
      <div class="row">
        <div class="col-md-12">
          <div class="pastor-text text-center">
            Now that you have onboarded
          </div>
          <div class="text-center">
            Enter your pastor details below
          </div>

          <div class="row">
            <div class="col-md-12">
                <div class="row">
                    <div class="col-md-8 order-2 order-md-1">
                        <div class="row my-3">
                            <div class="col-md-4 text-md-right pr-md-0">
                                <label for="" class="font-weight-700">Name<span class="text-danger">*</span></label>
                            </div>
                            <div class="col-md-8">
                                <el-input type="text" v-model="pastordata.name" placeholder="Enter name" />
                            </div>
                        </div>

                        <div class="row my-3">
                            <div class="col-md-4 text-md-right pr-md-0">
                                <label for="" class="font-weight-700">Phone Number</label>
                            </div>
                            <div class="col-md-8">
                                <el-input type="text" v-model="pastordata.mobilePhone" placeholder="Enter phone number" />
                            </div>
                        </div>
                        <div class="row my-3">
                            <div class="col-md-4 text-md-right pr-md-0">
                                <label for="" class="font-weight-700">Email</label>
                            </div>
                            <div class="col-md-8">
                                <el-input type="text" v-model="pastordata.email" placeholder="Email" />
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 order-1 order-md-2 mt-3 mt-md-0">
                        <ImageForm @image="setImage" />
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-3 text-md-right">
                        <h4 class="header4 text-md-right"></h4>
                    </div>
                    <div class="col-md-5 px-0 mt-3 d-flex justify-content-end">
                        <el-button class="secondary-button" @click="pastorsDialog = false" round>Maybe later</el-button>
                        <el-button :color="primarycolor" :loading="savingPastorData" @click="savepastordata"
                            round>Save</el-button>
                    </div>
                </div>
            </div>
        </div>
        </div>
      </div>
    </el-dialog>
  </main>
</template>

<script>
import ByMaritalStatusChart from "@/components/charts/PieChart";
import ByGenderChart from "@/components/charts/PieChart";
import ColumnChart from "@/components/charts/ColumnChart.vue";
import { computed, onMounted, ref, inject, watchEffect } from "vue";
import mixin from "@/mixins/currentUser.mixin.js"
import router from "@/router/index";
import axios from "@/gateway/backendapi";
import moment from "moment";
import stopProgressBar from "../../services/progressbar/progress";
import setupService from "../../services/setup/setupservice";
import formatDate from "../../services/dates/dateformatter";
import deviceBreakpoint from "../../mixins/deviceBreakpoint";
import Table from "@/components/table/Table"
import store from "../../store/store"
import ImageForm from "../../components/membership/ImageForm.vue"
import swal from "sweetalert";
import { ElMessage } from 'element-plus'
// import { useStore } from 'vuex';

export default {
  mixins: [mixin],
  components: {
    ColumnChart,
    ByMaritalStatusChart,
    ByGenderChart,
    Table,
    ImageForm
  },
  data() {
    return {}

  },
  created() {
    this.getCurrentUser()
  },

  setup() {
    const primarycolor = inject('primarycolor')
    const moreLinksVissible = ref(false);
    const offering = ref([23, 45, 65, 78, 89]);
    const attendanceBoolean = ref(true);
    const firstTimerBoolean = ref(true);
    const attendanceDataExist = ref(false);
    const firstTimerDataExist = ref(false);
    const firstTimerPieExist = ref(false);
    const notifiedDays = ref()
    const planUserIs = ref(store.getters['dashboard/getSubPlan'] ? store.getters['dashboard/getSubPlan'].description : 'loading plan') 





    const toggleMoreLinkVissibility = () => {
      moreLinksVissible.value != moreLinksVissible.value;
    };
    const showCelebrationDetail = (item) =>{
      router.push(`/tenant/people/add/${item.id}`)

    }

    const subscribeNow = () => {
      router.push('/tenant/subscription')
    }
    const celebrations = [];
    const tenantInfo = ref({});
    const tenantInfoBasic = ref(store.getters['dashboard/getdashboard']);
    const celeb = ref(store.getters['dashboard/getcelebration']);
    const attendanceSeries = ref("weekly");
    const firstTimerSeries = ref("weekly");
    const tenantInfoAttendanceWeekly = ref([]);
    const tenantInfoAttendanceMonthly = ref([]);
    const tenantInfoFirstTimerWeekly = ref([]);
    const tenantInfoFirstTimerMonthly = ref([]);
    const tenantInfoInvitationSource = ref([]);
    const tenantInfoInterestedInJoining = ref([]);
    const tenantInfoExtra = ref({
      hasMobileApp: store.getters['dashboard/hasMobileApp'],
      hasOnlineGiving: store.getters['dashboard/hasOnlineGiving'],
      hasWebsite: store.getters['dashboard/hasWebsite']
    });
    const subscriptionPlan = ref([]);
    const dashboardLoading = ref(false)

    const xAxis = ref([]);
    const monthXaxis = ref([
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ]);

    const { mdAndUp, lgAndUp, xlAndUp } = deviceBreakpoint()


    const celebHeaders = ref([
      { name: "NAME", value: "name" },
      { name: "DATE", value: "date" },
      { name: "DAY", value: "dayOfCelebration" },
      { name: "TYPE", value: "celebration" },
      { name: "PHONE", value: "phone" },
      { name: "ACTION", value: "action" }
    ]);

    const createNew = ref([
      { name: 'Member', to: '/tenant/people/add' },
      { name: 'First timer', to: '/tenant/people/addfirsttimer' },
      { name: 'Event', to: '/tenant/event' },
      { name: 'Attendance and registration', to: '/tenant/attendancecheckin/add' },
      { name: 'Social media post', to: '/tenant/social/post' },
      { name: 'Mobile app post', to: '/tenant/social/post' },
    ])
    const pastorsDialog = ref(false)
    const pastordata = ref({})
    const savingPastorData = ref(false)

    const series = computed(() => {
      if (attendanceSeries.value === "weekly") return xAxis.value;
      return monthXaxis.value;
    });

    const series2 = computed(() => {
      if (firstTimerSeries.value === "weekly") return xAxis.value;
      return monthXaxis.value;
    });

    // onMounted(() => {
    //   getBasicDashboard()
    // })

    // const getBasicDashboard = () => {
    //   dashboardLoading.value = true
    //   axios
    //     .get("/dashboard/basic")
    //     .then((res) => {
    //       dashboardLoading.value = false
    //       tenantInfoBasic.value = res.data.returnObject;
    //       tenantInfoExtra.value.hasMobileApp = res.data.returnObject.hasMobileApp;
    //       tenantInfoExtra.value.hasOnlineGiving = res.data.returnObject.hasOnlineGiving;
    //       tenantInfoExtra.value.hasWebsite = res.data.returnObject.hasWebsite;
    //       let sum = 0;
    //       tenantInfo.value.firstTimerSummary.invitationSource.forEach((i) => {
    //         sum += +i.value;
    //       });
    //       summed.value = sum;
    //     })
    //     .catch((err) => {
    //       stopProgressBar();
    //       if (err.response && err.response.status === 401) {
    //         dashboardLoading.value = false
    //         localStorage.removeItem("token");
    //         setupService.clearStore();
    //         router.push("/");
    //       }
    //     });
    // };

    function getCelebDashboard() {
      store.dispatch('dashboard/getCelebration').then((response) => {
        celeb.value = response;
      })
    }


    let tenantInfoCeleb = computed(() => {
      if (celeb.value.length === 0) return []
      return celeb.value.sort((b, a) => new Date(b.date) - new Date(a.date))
    })

    const getDashboard = async () => {
      try {
        dashboardLoading.value = true
        await store.dispatch('dashboard/getDashboard').then(response => {
          tenantInfoBasic.value = response
          dashboardLoading.value = false
          tenantInfoExtra.value.hasMobileApp = response.hasMobileApp;
          tenantInfoExtra.value.hasOnlineGiving = response.hasOnlineGiving;
          tenantInfoExtra.value.hasWebsite = response.hasWebsite;
        })
      }
      catch (error) {
        stopProgressBar();
        if (error.response && error.response.status === 401) {
          dashboardLoading.value = false
          localStorage.removeItem("token");
          setupService.clearStore();
          router.push("/");
        }
      }
    }

    onMounted(() => {
      if (tenantInfoBasic.value && Object.keys(tenantInfoBasic.value).length == 0) getDashboard();
      if (celeb.value && celeb.value.length == 0) getCelebDashboard();
      getSubscriptionData();
    })

    onMounted(() => {
      axios
        .get("/dashboard/attendance")
        .then((res) => {
          tenantInfoAttendanceWeekly.value =
            res.data.returnObject.eventAttendanceChartDataWeekly;
          tenantInfoAttendanceMonthly.value =
            res.data.returnObject.eventAttendanceChartDataMonthly;

          tenantInfoFirstTimerWeekly.value =
            res.data.returnObject.firstTimerSummary.firstTimerWeekly;
          tenantInfoFirstTimerMonthly.value =
            res.data.returnObject.firstTimerSummary.firstTimerMonthly;

          tenantInfoInvitationSource.value =
            res.data.returnObject.firstTimerSummary.invitationSource;
          tenantInfoInterestedInJoining.value =
            res.data.returnObject.firstTimerSummary.interestedInJoining;

          tenantInfoAttendanceWeekly.value[0].data.forEach((element) => {
            if (element > 0) {
              attendanceDataExist.value = true;
            }
          });

          tenantInfoFirstTimerWeekly.value[0].data.forEach((element) => {
            if (element > 0) {
              firstTimerDataExist.value = true;
            }
          });

          let sum = 0;
          tenantInfoInterestedInJoining.value.forEach((i) => {
            sum += +i.value;
          });
          if (sum > 0) {
            firstTimerPieExist.value = true;
          } else {
            firstTimerPieExist.value = false;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    });

    const showPieChart = computed(() => {
      if (!tenantInfo.value || tenantInfo.value.firstTimerSummary) return [];
      return tenantInfo.value.firstTimerSummary;
    });

    onMounted(() => {
      for (let i = 1; i <= 52; i++) {
        xAxis.value.push(i);
      }
    });

    const weeklyAttendance = () => {
      attendanceSeries.value = "weekly";
      attendanceBoolean.value = true;
    };

    const monthlyAttendance = () => {
      attendanceBoolean.value = false;
      attendanceSeries.value = "monthly";

    };

    const weeklyFirstTimer = () => {
      firstTimerSeries.value = "weekly";
      firstTimerBoolean.value = true;
    };

    const monthlyFirstTimer = () => {
      firstTimerBoolean.value = false;
      firstTimerSeries.value = "monthly";
    };

    const chartData = computed(() => {
      if (!tenantInfoAttendanceWeekly.value) return [];
      let chartWeekly = []
      let chartObj = tenantInfoAttendanceWeekly.value.find(i => i.name === "Attendance")
      chartObj['color'] = '#002044'
      chartWeekly.push(chartObj)
      return chartWeekly
    });
    const monthlyAttendanceObj = computed(() => {
      if (!tenantInfoAttendanceMonthly.value) return [];
      let chartMonthly = []
      let chartObj = tenantInfoAttendanceMonthly.value.find(i => i.name === "Attendance")
      chartObj['color'] = '#002044'
      chartMonthly.push(chartObj)
      return chartMonthly
    });

    const chartData2 = computed(() => {
      if (!tenantInfoFirstTimerWeekly.value) return [];
      tenantInfoFirstTimerWeekly.value[0].color = '#002044';
      return tenantInfoFirstTimerWeekly.value
    });

    const monthlyFirstTimerObj = computed(() => {
      if (!tenantInfoFirstTimerMonthly.value) return [];
      tenantInfoFirstTimerMonthly.value[0].color = '#002044';
      return tenantInfoFirstTimerMonthly.value
    });

    const chartDataNewConvert = computed(() => {
      if (!tenantInfo.value.eventAttendanceChartData) return [];
      return tenantInfo.value.eventAttendanceChartData[2];
    });


    const dateFormat = (payload) => {
      return formatDate.monthDayYear(payload);
    };

    const retrieveSubscriptionInfo = () => { };

    const useSubscriptionResponse = ref(store.getters['dashboard/getSubPlan']);
    const getRenewalDate = ref(store.getters['dashboard/getSubPlan'] ? store.getters['dashboard/getSubPlan'].subscriptionExpiration : '');
    const countDownDate = () => {
      // Set the date we're counting down to
      let countDownDates = new Date(getRenewalDate.value).getTime();
      // Get today's date and time
      let now = new Date().getTime();
      // Find the distance between now and the count down date
      let distance = countDownDates - now;
      notifiedDays.value = Math.floor(distance / (1000 * 60 * 60 * 24));
    }

    const getSubscriptionData = () => {
      store.dispatch("dashboard/getUserSubscriptionPlan").then(response => {
          planUserIs.value = response.description;
          getRenewalDate.value = response.subscriptionExpiration;
          useSubscriptionResponse.value = response
          countDownDate()
      })
    }

    const calculatedPercentage = computed(() => {
      if (!useSubscriptionResponse.value || !useSubscriptionResponse.value.id)
        return 0;
      return calculatePercentage(tenantInfoBasic.value.memberCount);
    });

    const checkRenewalDate = computed(() => {
      if (!getRenewalDate.value) return false;
      return new Date(Date.now()) > new Date(getRenewalDate.value);
    });

    const buttonTextCheck = computed(() => {
      if (checkRenewalDate.value && planUserIs.value === "TRIAL") return {
        text: "SUBSCRIBE",
        color: "btn-danger-upgrade"
      };

      if (checkRenewalDate.value && planUserIs.value !== "FREE PLAN") return {
        text: "RENEW",
        color: "renew-btn-color",
      };

      if (checkRenewalDate.value && planUserIs.value === "FREE PLAN") return {
        text: "SUBSCRIBE",
        color: "btn-danger-upgrade",
      };

      if (planUserIs.value === "UNLIMITED") return { text: "PRODUCT" };
      return { text: "UPGRADE" };

    });

    let currentPlan;
    const calculatePercentage = (totalMembers) => {
      currentPlan = useSubscriptionResponse.value.subscriptionPlans.find(
        (i) => {
          return i.id === useSubscriptionResponse.value.id;
        }
      );
      return (totalMembers / currentPlan.membershipSize) * 100;
    };

    const setImage = (payload) => {
      pastordata.value.image = payload
    }

    const getUser = computed(() => {
      if (!store.getters.currentUser || (store.getters.currentUser && Object.keys(store.getters.currentUser).length == 0)) return ''
      return store.getters.currentUser
    })

    const savepastordata = async () => {
      savingPastorData.value = true
      let formData = new FormData();
      formData.append("pastorName", pastordata.value.name)
      formData.append("pastorEmail", pastordata.value.email)
      formData.append("pastorPhone", pastordata.value.mobilePhone)
      formData.append("pastorPicture", pastordata.value.image ? pastordata.value.image : "")
      formData.append("id", "")

      try {
        let { data } = await axios.put("/api/Dashboard/UpdateTenantPastors", formData)
        console.log(data, 'saved');
        savingPastorData.value = false
        pastorsDialog.value = false
        swal(
            "Success!",
            "Pastor's data saved successfully!",
            "success"
          );
        }
        catch (err) {
          console.error(err);
          savingPastorData.value = false
          ElMessage({
            type: 'error',
            message: 'Unable to add pastors data, please try again',
            duration: 5000
          })
      }
    }

    
    const getChurchProfile = async () => {
      try {
        let { data } = await axios.get(`/GetChurchProfileById?tenantId=${getUser.value.tenantId}`)
        console.log(data);
        if (!data.returnObject.pastorName) {
          pastorsDialog.value = true
        }
      }
      catch (err) {
        console.error(err);
      }
    }

    watchEffect(() => {
      if (getUser.value) {
        getChurchProfile()
      }
    })




    return {
      celebrations,
      showCelebrationDetail,
      notifiedDays,
      subscribeNow,
      getRenewalDate,
      tenantInfo,
      tenantInfoBasic,
      tenantInfoCeleb,
      moreLinksVissible,
      toggleMoreLinkVissibility,
      offering,
      moment,
      attendanceBoolean,
      weeklyAttendance,
      monthlyAttendance,
      firstTimerBoolean,
      weeklyFirstTimer,
      monthlyFirstTimer,
      chartData,
      monthlyAttendanceObj,
      xAxis,
      monthXaxis,
      series,
      showPieChart,
      chartData2,
      series2,
      monthlyFirstTimerObj,
      chartDataNewConvert,
      firstTimerSeries,
      attendanceDataExist,
      firstTimerDataExist,
      firstTimerPieExist,
      dateFormat,
      tenantInfoAttendanceWeekly,
      tenantInfoAttendanceMonthly,
      tenantInfoFirstTimerWeekly,
      tenantInfoFirstTimerMonthly,
      tenantInfoInvitationSource,
      tenantInfoInterestedInJoining,
      tenantInfoExtra,
      subscriptionPlan,
      retrieveSubscriptionInfo,
      planUserIs,
      useSubscriptionResponse,
      calculatedPercentage,
      calculatePercentage,
      checkRenewalDate,
      buttonTextCheck,
      celeb,
      attendanceSeries,
      mdAndUp,
      lgAndUp,
      xlAndUp,
      celebHeaders,
      dashboardLoading,
      createNew,
      router,
      primarycolor,
      pastorsDialog,
      pastordata,
      savepastordata,
      savingPastorData,
      setImage
    };
  },
};
</script>

<style scoped>
.day3 {
  background-color: #ECF4FF;
  border-left: solid #136acd 5px;
  border-top-left-radius: 5px 5px;
  border-bottom-left-radius: 5px 5px;
  font-weight: 700;
  display: flex;
  justify-content: space-between;
}

.day2 {
  background-color: rgb(246, 246, 195);
  border-left: solid yellow 5px;
  border-top-left-radius: 5px 5px;
  border-bottom-left-radius: 5px 5px;
  font-weight: 700;
  display: flex;
  justify-content: space-between;
}

.day1 {
  background-color: #FEF8F8;
  color: #e09579;
  border-left: solid #B3282D 5px;
  border-top-left-radius: 5px 5px;
  border-bottom-left-radius: 5px 5px;
  font-weight: 700;
  display: flex;
  justify-content: space-between;
}

.renew-btn-color {
  background-color: #ffbf00 !important;
}

.btn-danger-upgrade {
  color: #fff !important;
  background-color: #E60023 !important;
}


#main {
  display: flex;
  justify-content: space-between;
}

.menu-links {
  width: 20%;
  min-width: 255px;
}

.main-content {
  display: flex;
  justify-content: space-around;
  width: 90%;
  margin: 0 auto;
  padding: 10px;
}

.second-col {
  width: 100%;
}

.charts {
  margin-bottom: 2rem;
}

.top-bar {
  display: flex;
  justify-content: space-between;
  padding: 10px;
}

.create-btn-div {
  display: flex;
  padding: 0 10px 10px 0;
  justify-content: space-between;
  margin-bottom: 24px;
}

.top-row {
  display: flex;
  padding: 10px;
  margin-bottom: 30px;
  justify-content: space-between;
}

.second-col .create-btn-div .create-btn {
  background: #136acd;
  color: #fff;
  border-radius: 22px;
  border: none;
  padding: 4px 14px;
  height: 40px;
  align-self: center;
  font-size: 16px;
  outline: none;
  display: flex;
  align-items: center;
}

.second-col .create-btn-div .create-btn:hover {
  cursor: pointer;
}

.top-icon-div {
  background: #f1f5f8;
  padding: 4px;
  border-radius: 50%;
}

.top-icon-div i {
  color: #136acd;
  font-size: 24px;
  padding: 4px;
}



.create-dd {
  padding: 0 9px;
  color: #fff;
}

.first-col {
  padding: 10px 30px;
}

.can-do h4 {
  margin: 0;
  font-weight: 700;
  font-size: 20px;
}

.can-do {
  display: flex;
  flex-direction: column;
}

.can-do-links a {
  margin-top: 10px;
  text-decoration: none;
  /* color: #2b6ecd; */
  font-weight: 700;
  font-size: 16px;
}

.celebrant {
  display: flex;
  justify-content: space-between;
  margin: 5px 0;
  text-decoration: none;
  color: #2b6ecd;
  font-weight: 600;
  opacity: 0.9;
}

.view-more {
  text-align: center;
  margin-top: 0.5rem;
}

.second-col .number-boxes {
  max-width: 450px;
  display: flex;
  justify-content: flex-end;
}

.box {
  width: 170px;
  background: #FFFFFF;
  box-shadow: 0px 2px 7.5px rgba(0, 0, 0, 0.0588235);
  border-radius: 15px;
}


.box-bottom {
  background: #F1F5F8;
  box-shadow: 0px 11px 17px rgba(206, 205, 205, 0.360784);
  border-radius: 0px 0px 15px 15px;
}



.celebrations {
  padding: 10px;
  /* border: 1px solid red; */
  border: 1px solid #e6e5f2;
  border-radius: 28px;
  margin-top: 80px;
}

.pie-con {
  margin: 24px 0;
}

/* Table */
.table-top {
  display: flex;
  justify-content: flex-end;
}

.view-all {
  padding: 10px;
  width: 120px;
  box-shadow: 0px 3px 6px #2c28281c;
  border: 1px solid #136acd;
  border-radius: 1000px;
  text-align: center;
  margin: 4px;
}

.celeb-header {
  display: flex;
  align-items: center;
  font-weight: 700;
  font-size: 20px;
  margin-top: 20px;
}

@media (max-width: 767px) {

  .top-row {
    display: flex;
    flex-direction: column;
  }

  .box {
    margin-top: 30px;
  }


  .adjust-view {
    display: none;
  }



  .container-fluid-mobile {
    border: 1px solid !important;
    width: 85% !important;
    box-shadow: 0px 1px 4px #b1bfce45 !important;
    border-radius: 30px;
    border: 1px solid #DDE2E6 !important;
  }
}

.celeb-header-text p {
  margin: 0;
}

.celeb-icon {
  height: 81px;
  margin-left: -33px;
}

.help-text2 {
  display: flex;
  align-items: flex-start;
}

.help-text2 img {
  width: 76px;
  margin-top: -9px;
  margin-left: -14px
}

.pies {
  margin-top: 50px;
}

tbody tr:nth-child(even) {
  background: #f7fafc;
}

.table-body {
  font-size: 14px;
}

.phone.one {
  margin-left: -20px;
}

.size-text {
  font-weight: 700;
}

.more-links {
  margin-top: -10px !important;
  background: transparent !important;
  border-top: none !important;
  position: absolute !important;
  width: inherit;
}

.table thead {
  background: #f1f3f9;
  color: #8898aa;
  font-size: 11px;
}

.table tr td img {
  width: 40px;
}

.table tbody {
  font-size: 14px;
  align-items: center;
}

.more-links a {
  text-decoration: none;
}

.pie-con {
  border: 0.4000000059604645px solid #dde2e6;
  box-shadow: 0px 1px 4px #02172e45;
  border-radius: 10px;
}

.project-name {
  margin-left: 10px;
  font-weight: 700;
}

.adjust-view {
  position: relative;
  top: 80px;
  right: 10px;
  z-index: 1;
}

.more-things {
  text-align: center;
  font: normal normal 800 26px/35px Nunito Sans;
  letter-spacing: 0px;
  color: #020e1c;
  opacity: 0.8;
}

.more-body {
  text-align: center;
  font: normal normal 600 16px/22px Nunito Sans;
  letter-spacing: 0px;
  color: #020e1c;
  opacity: 0.8;
}


.more-things.side {
  background: #ecf0f3 0% 0% no-repeat padding-box;
  border-radius: 15px;
  opacity: 1;
}


@media (max-width: 575px) {
  .adjust-view {
    left: 65px;
    top: 150px;
  }

  .view-report {
    display: none;
  }
}

@media (max-width: 705px) {
  .can-do-links {
    display: flex;
    flex-direction: column;

  }
}

@media (max-width: 305px) {}

@media (min-width: 509px) and (max-width: 515px) {}

@media (min-width: 516px) and (max-width: 576px) {}

.view-report {
  font: normal normal 800 16px/22px Nunito Sans;
  letter-spacing: 0px;
  color: #2b6ecd;
  cursor: pointer;
}

.weekly {

  cursor: pointer;
}

.active {
  color: #2b6ecd;
}

.chart-con {
  width: 100%;
  display: flex;
  justify-content: space-between;
  box-shadow: 0px 1px 4px #02172e45;
  border: 1px solid #dde2e6;
  border-radius: 30px;
  margin: 0 0 24px 0;
  padding: 25px 0;
}

.table td {
  vertical-align: baseline;
}


@media screen and (max-width: 940px) {

  .second-col .number-boxes {
    max-width: 100%;
    justify-content: space-between;
  }

  .box {
    /* width: 40%; */
    margin-left: 0;
  }

  .can-do {
    width: 100%;
  }

  .can-do-links {
    flex-direction: column;
    justify-content: space-around;
  }
}

@media (min-width: 1101px) and (max-width: 1231px) {}

@media screen and (min-width: 1300px) {}

@media (max-width: 556px) {
  .can-do-links {
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .can-do-links a {
    min-width: 100px;
  }
}

@media (max-width: 508px) {


  .second-col .create-btn-div .create-btn {
    margin-top: 10px;
  }

  .top-row {
    margin-top: 40px;
  }

}

.push-down {
  margin-top: 32px;
}

.fade-text {
  color: #a8a8a8;
  cursor: not-allowed;
}

.text-color {
  color: #212529;
}


@media screen and (max-width: 480px) {
  .firstTimerClass {
    padding-top: 9px;
    /* background-color: lightgreen; */
  }

}

@media screen and (max-width: 360px) {
  .number-boxes {
    flex-direction: column;
    /* width: 70%; */
    align-self: center;
    margin-top: 10px;
  }

  .create-btn-div {
    flex-direction: column;
  }

}

.celeb-badge {
  border-radius: 50%;
  border: 1px solid red;
  width: 10px;
  height: 10px;
  background: red;
}

.celeb-badge-desc {
  position: relative;
  left: 24px;
  top: -26px;
}

.celeb-img {
  width: 30px;
  height: 30px;
  object-fit: cover;
  border-radius: 50%;
}

.pastor-text {
  color: #124191;
  font-weight: 800;
  font-size: 18px;
}
</style>