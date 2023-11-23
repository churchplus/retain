<template>
  <div>
    <Header headerName="Dashboard">
      <template #button>
        <div class="seperation-bar ml-3"></div>
        <router-link :to="{ name: 'BuyUnitSms', path: '/tenant/sms/buyunit' }">
          <el-button :color="primarycolor" size="large" class="py-3 ml-3 w-100">
            Buy SMS Unit
          </el-button>
        </router-link>
      </template>
    </Header>
  </div>
  <el-main>
    <div class="row">
      <div class="col-12 mb-4">
        <div class="d-flex justify-content-between">
          <div class="thick-secondary head-text">{{ dashboardData.userName ? `Welcome, ${dashboardData.userName}` : "" }}</div>
          
          <div>
            <ElDropDown :options="dateRange" optionLabel="name"  placeholder="Choose date range" @selectedvalue="setSelectedDateRange" :setcurrentvalue="setcurrentvalue" />
          </div>
        </div>
      </div>
      <div
        class="col-12 col-sm-6 col-lg-3 mt-2"
        v-for="(item, index) in accountUtil"
        :key="index"
      >
        <div class="d-flex align-items-center rounded-lg bg-white px-3 py-4 card-shadow">
          <div
            class="d-flex justify-content-center align-items-center"
            :style="`background: ${item.color}; border-radius: 50%; width: 40px; height: 40px`"
          >
            <img :src="item.icon" width="20" alt="logo" />
          </div>
          <div class="ml-2">
            <div class="font-weight-600 thick-secondary">{{ item.name }}</div>
            <div class="s-24 font-weight-700">{{ item.value }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="row chart-parent">
      <div class="col-md-7">
        <div class="bg-white p-3 card-shadow stretch-card" v-loading="dashboardLoading">
          <div class="font-weight-700">SMS</div>
          <ApexArea :series="smsSeries" :xaxis="smsXaxis" v-if="smsSeries.length > 0" />
        </div>
      </div>
      <div class="col-md-5 mt-3 mt-md-0">
        <div
          class="bg-white p-3 card-shadow stretch-card d-flex flex-column align-items-center justify-content-center"
          v-loading="dashboardLoading"
        >
          <div
            class="font-weight-700 align-self-start"
            v-if="donutOption && donutOption.labels.length > 0"
          >
            Delivery Status
          </div>
          <apexchart
            width="100%"
            height="100%"
            type="donut"
            :options="donutOption"
            :series="donutSeries"
            v-if="donutOption && donutOption.labels.length > 0"
          ></apexchart>
          <div class="font-weight-700 thick-secondary" v-else>No data</div>
        </div>
      </div>
      <div class="col-md-12 mt-3 align-items-center">
        <div class="bg-white p-3 card-shadow stretch-card" v-loading="dashboardLoading">
          <div class="font-weight-700">Contact</div>
          <ApexArea
            :series="contactSeries"
            :xaxis="contactXaxis"
            v-if="contactSeries.length > 0"
          />
        </div>
      </div>
    </div>
  </el-main>
</template>

<script>
import { computed, onMounted, ref, inject, watchEffect } from "vue";
import mixin from "@/mixins/currentUser.mixin.js";
import router from "@/router/index";
import axios from "@/gateway/backendapi";
import moment from "moment";
// import stopProgressBar from "../../services/progressbar/progress";
// import setupService from "../../services/setup/setupservice";
import formatDate from "../../services/dates/dateformatter";
import deviceBreakpoint from "../../mixins/deviceBreakpoint";
import store from "../../store/store";
import swal from "sweetalert";
import { ElMessage } from "element-plus";
import Header from "@/components/header/Header.vue";
import ApexArea from "@/components/chart/AreaChart.vue";
import ElDropDown from "@/components/dropdown/ElDropDown";
import dateFormatter from "@/services/dates/dateformatter";

export default {
  mixins: [mixin],
  components: {
    Header,
    ApexArea,
    ElDropDown,
  },
  data() {
    return {};
  },
  created() {
    this.getCurrentUser();
  },

  setup() {
    const primarycolor = inject("primarycolor");
    const moreLinksVissible = ref(false);
    const offering = ref([23, 45, 65, 78, 89]);
    const attendanceBoolean = ref(true);
    const firstTimerBoolean = ref(true);
    const attendanceDataExist = ref(false);
    const firstTimerDataExist = ref(false);
    const firstTimerPieExist = ref(false);
    const notifiedDays = ref();
    const planUserIs = ref(
      store.getters["dashboard/getSubPlan"]
        ? store.getters["dashboard/getSubPlan"].description
        : "loading plan"
    );

    const toggleMoreLinkVissibility = () => {
      moreLinksVissible.value != moreLinksVissible.value;
    };
    const showCelebrationDetail = (item) => {
      router.push(`/tenant/people/add/${item.id}`);
    };

    const subscribeNow = () => {
      router.push("/tenant/subscription");
    };
    const celebrations = [];
    const tenantInfo = ref({});
    const tenantInfoBasic = ref(store.getters["dashboard/getdashboard"]);
    const celeb = ref(store.getters["dashboard/getcelebration"]);
    const attendanceSeries = ref("weekly");
    const firstTimerSeries = ref("weekly");
    const tenantInfoAttendanceWeekly = ref([]);
    const tenantInfoAttendanceMonthly = ref([]);
    const tenantInfoFirstTimerWeekly = ref([]);
    const tenantInfoFirstTimerMonthly = ref([]);
    const tenantInfoInvitationSource = ref([]);
    const tenantInfoInterestedInJoining = ref([]);
    const tenantInfoExtra = ref({
      hasMobileApp: store.getters["dashboard/hasMobileApp"],
      hasOnlineGiving: store.getters["dashboard/hasOnlineGiving"],
      hasWebsite: store.getters["dashboard/hasWebsite"],
    });
    const subscriptionPlan = ref([]);
    const dashboardLoading = ref(false);
    /* eslint-disable */

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

    const { mdAndUp, lgAndUp, xlAndUp } = deviceBreakpoint();

    const celebHeaders = ref([
      { name: "NAME", value: "name" },
      { name: "DATE", value: "date" },
      { name: "DAY", value: "dayOfCelebration" },
      { name: "TYPE", value: "celebration" },
      { name: "PHONE", value: "phone" },
      { name: "ACTION", value: "action" },
    ]);

    const createNew = ref([
      { name: "Member", to: "/tenant/people/add" },
      { name: "First timer", to: "/tenant/people/addfirsttimer" },
      { name: "Event", to: "/tenant/event" },
      { name: "Attendance and registration", to: "/tenant/attendancecheckin/add" },
      { name: "Social media post", to: "/tenant/social/post" },
      { name: "Mobile app post", to: "/tenant/social/post" },
    ]);
    const pastorsDialog = ref(false);
    const pastordata = ref({});
    const savingPastorData = ref(false);

    const series = computed(() => {
      if (attendanceSeries.value === "weekly") return xAxis.value;
      return monthXaxis.value;
    });

    const series2 = computed(() => {
      if (firstTimerSeries.value === "weekly") return xAxis.value;
      return monthXaxis.value;
    });

    const dashboardData = ref({});
    const smsSeries = ref([]);
    const smsXaxis = ref([]);
    const contactSeries = ref([]);
    const contactXaxis = ref([]);
    const setcurrentvalue = ref({});

    onMounted(() => {
      getBasicDashboard();
    });

    const getBasicDashboard = (payload) => {
      console.log(moment().format('l'))
      dashboardLoading.value = true;
      let url = payload ? `/dashboard/retain?startDate=${payload.value}&&endDate=${moment().format('l')}` : "/dashboard/retain"
      axios
        .get(url)
        .then(({ data }) => {
          dashboardLoading.value = false;
          console.log(data);
          dashboardData.value = data.returnObject;

          donutOption.value.labels = dashboardData.value.deliveryTrend.map((i) => i.name);
          smsSeries.value.push({
            name: "SMS",
            data: dashboardData.value.smsTrend.map((i) => i.value),
          });
          smsXaxis.value = dashboardData.value.smsTrend.map((i) =>
            dateFormatter.monthDayYear(i.name.split(" ")[0])
          );

          contactSeries.value.push({
            name: "Contacts",
            data: dashboardData.value.contactsTrend.map((i) => i.value),
          });
          contactXaxis.value = dashboardData.value.contactsTrend.map((i) =>
            dateFormatter.monthDayYear(i.name.split(" ")[0])
          );

          // Set date range value
          setcurrentvalue.value = { name: moment(`${returnDates(3)}`, "DDMMYYYY").fromNow(), value: moment(returnDates(3), "DDMMYYYY").format("l") }
          console.log(setcurrentvalue.value)

          // tenantInfoBasic.value = res.data.returnObject;
          // tenantInfoExtra.value.hasMobileApp = res.data.returnObject.hasMobileApp;
          // tenantInfoExtra.value.hasOnlineGiving = res.data.returnObject.hasOnlineGiving;
          // tenantInfoExtra.value.hasWebsite = res.data.returnObject.hasWebsite;
          // let sum = 0;
          // tenantInfo.value.firstTimerSummary.invitationSource.forEach((i) => {
          //   sum += +i.value;
          // });
          // summed.value = sum;
        })
        .catch((err) => {
          // stopProgressBar();
          // if (err.response && err.response.status === 401) {
          dashboardLoading.value = false;
          //   localStorage.removeItem("token");
          //   setupService.clearStore();
          //   router.push("/");
          // }
        });
    };

    // function getCelebDashboard() {
    //   store.dispatch("dashboard/getCelebration").then((response) => {
    //     celeb.value = response;
    //   });
    // }

    // let tenantInfoCeleb = computed(() => {
    //   if (celeb.value.length === 0) return [];
    //   return celeb.value.sort((b, a) => new Date(b.date) - new Date(a.date));
    // });

    // const getDashboard = async () => {
    //   try {
    //     dashboardLoading.value = true;
    //     await store.dispatch("dashboard/getDashboard").then((response) => {
    //       tenantInfoBasic.value = response;
    //       dashboardLoading.value = false;
    //       tenantInfoExtra.value.hasMobileApp = response.hasMobileApp;
    //       tenantInfoExtra.value.hasOnlineGiving = response.hasOnlineGiving;
    //       tenantInfoExtra.value.hasWebsite = response.hasWebsite;
    //     });
    //   } catch (error) {
    //     stopProgressBar();
    //     dashboardLoading.value = false;

    //     if (error.response && error.response.status === 401) {
    //       localStorage.removeItem("token");
    //       setupService.clearStore();
    //       router.push("/");
    //     }
    //   }
    // };

    // onMounted(() => {
    //   if (tenantInfoBasic.value && Object.keys(tenantInfoBasic.value).length == 0)
    //     getDashboard();
    //   if (celeb.value && celeb.value.length == 0) getCelebDashboard();
    //   getSubscriptionData();
    // });

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

    // const showPieChart = computed(() => {
    //   if (!tenantInfo.value || tenantInfo.value.firstTimerSummary) return [];
    //   return tenantInfo.value.firstTimerSummary;
    // });

    // onMounted(() => {
    //   for (let i = 1; i <= 52; i++) {
    //     xAxis.value.push(i);
    //   }
    // });

    // const weeklyAttendance = () => {
    //   attendanceSeries.value = "weekly";
    //   attendanceBoolean.value = true;
    // };

    // const monthlyAttendance = () => {
    //   attendanceBoolean.value = false;
    //   attendanceSeries.value = "monthly";
    // };

    // const weeklyFirstTimer = () => {
    //   firstTimerSeries.value = "weekly";
    //   firstTimerBoolean.value = true;
    // };

    // const monthlyFirstTimer = () => {
    //   firstTimerBoolean.value = false;
    //   firstTimerSeries.value = "monthly";
    // };

    // const chartData = computed(() => {
    //   if (!tenantInfoAttendanceWeekly.value) return [];
    //   let chartWeekly = [];
    //   let chartObj = tenantInfoAttendanceWeekly.value.find(
    //     (i) => i.name === "Attendance"
    //   );
    //   chartObj["color"] = "#002044";
    //   chartWeekly.push(chartObj);
    //   return chartWeekly;
    // });
    // const monthlyAttendanceObj = computed(() => {
    //   if (!tenantInfoAttendanceMonthly.value) return [];
    //   let chartMonthly = [];
    //   let chartObj = tenantInfoAttendanceMonthly.value.find(
    //     (i) => i.name === "Attendance"
    //   );
    //   chartObj["color"] = "#002044";
    //   chartMonthly.push(chartObj);
    //   return chartMonthly;
    // });

    // const chartData2 = computed(() => {
    //   if (!tenantInfoFirstTimerWeekly.value) return [];
    //   tenantInfoFirstTimerWeekly.value[0].color = "#002044";
    //   return tenantInfoFirstTimerWeekly.value;
    // });

    // const monthlyFirstTimerObj = computed(() => {
    //   if (!tenantInfoFirstTimerMonthly.value) return [];
    //   tenantInfoFirstTimerMonthly.value[0].color = "#002044";
    //   return tenantInfoFirstTimerMonthly.value;
    // });

    // const chartDataNewConvert = computed(() => {
    //   if (!tenantInfo.value.eventAttendanceChartData) return [];
    //   return tenantInfo.value.eventAttendanceChartData[2];
    // });

    const dateFormat = (payload) => {
      return formatDate.monthDayYear(payload);
    };

    const retrieveSubscriptionInfo = () => {};

    const useSubscriptionResponse = ref(store.getters["dashboard/getSubPlan"]);
    const getRenewalDate = ref(
      store.getters["dashboard/getSubPlan"]
        ? store.getters["dashboard/getSubPlan"].subscriptionExpiration
        : ""
    );
    const countDownDate = () => {
      // Set the date we're counting down to
      let countDownDates = new Date(getRenewalDate.value).getTime();
      // Get today's date and time
      let now = new Date().getTime();
      // Find the distance between now and the count down date
      let distance = countDownDates - now;
      notifiedDays.value = Math.floor(distance / (1000 * 60 * 60 * 24));
    };

    const getSubscriptionData = () => {
      store.dispatch("dashboard/getUserSubscriptionPlan").then((response) => {
        planUserIs.value = response.description;
        getRenewalDate.value = response.subscriptionExpiration;
        useSubscriptionResponse.value = response;
        countDownDate();
      });
    };

    const calculatedPercentage = computed(() => {
      if (!useSubscriptionResponse.value || !useSubscriptionResponse.value.id) return 0;
      return calculatePercentage(tenantInfoBasic.value.memberCount);
    });

    const checkRenewalDate = computed(() => {
      if (!getRenewalDate.value) return false;
      return new Date(Date.now()) > new Date(getRenewalDate.value);
    });

    const buttonTextCheck = computed(() => {
      if (checkRenewalDate.value && planUserIs.value === "TRIAL")
        return {
          text: "SUBSCRIBE",
          color: "btn-danger-upgrade",
        };

      if (checkRenewalDate.value && planUserIs.value !== "FREE PLAN")
        return {
          text: "RENEW",
          color: "renew-btn-color",
        };

      if (checkRenewalDate.value && planUserIs.value === "FREE PLAN")
        return {
          text: "SUBSCRIBE",
          color: "btn-danger-upgrade",
        };

      if (planUserIs.value === "UNLIMITED") return { text: "PRODUCT" };
      return { text: "UPGRADE" };
    });

    let currentPlan;
    const calculatePercentage = (totalMembers) => {
      currentPlan = useSubscriptionResponse.value.subscriptionPlans.find((i) => {
        return i.id === useSubscriptionResponse.value.id;
      });
      return (totalMembers / currentPlan.membershipSize) * 100;
    };

    const setImage = (payload) => {
      pastordata.value.image = payload;
    };

    const getUser = computed(() => {
      if (
        !store.getters.currentUser ||
        (store.getters.currentUser && Object.keys(store.getters.currentUser).length == 0)
      )
        return "";
      return store.getters.currentUser;
    });

    const savepastordata = async () => {
      savingPastorData.value = true;
      let formData = new FormData();
      formData.append("pastorName", pastordata.value.name);
      formData.append("pastorEmail", pastordata.value.email);
      formData.append("pastorPhone", pastordata.value.mobilePhone);
      formData.append(
        "pastorPicture",
        pastordata.value.image ? pastordata.value.image : ""
      );
      formData.append("id", "");

      try {
        let { data } = await axios.put("/api/Dashboard/UpdateTenantPastors", formData);
        console.log(data, "saved");
        savingPastorData.value = false;
        pastorsDialog.value = false;
        swal("Success!", "Pastor's data saved successfully!", "success");
      } catch (err) {
        console.error(err);
        savingPastorData.value = false;
        ElMessage({
          type: "error",
          message: "Unable to add pastors data, please try again",
          duration: 5000,
        });
      }
    };

    const getChurchProfile = async () => {
      try {
        let { data } = await axios.get(
          `/GetChurchProfileById?tenantId=${getUser.value.tenantId}`
        );
        console.log(data);
        if (!data.returnObject.pastorName) {
          pastorsDialog.value = true;
        }
      } catch (err) {
        console.error(err);
      }
    };

    watchEffect(() => {
      if (getUser.value) {
        getChurchProfile();
      }
    });

    const accountUtil = computed(() => {
      return [
        {
          name: "Total Contacts",
          icon: require("../../assets/retain/user.png"),
          color: "#F9AFB4",
          value: dashboardData.value.totalContacts ? dashboardData.value.totalContacts : 0,
        },
        {
          name: "Total Spending",
          icon: require("../../assets/retain/money.png"),
          color: "#D1FAE5",
          value: dashboardData.value.totalSpending ? dashboardData.value.totalSpending : 0,
        },
        {
          name: "Unit Balance",
          icon: require("../../assets/retain/money.png"),
          color: "#D1FAE5",
          value: dashboardData.value.unitBalance ? dashboardData.value.unitBalance : 0,
        },
        {
          name: "SMS sent",
          icon: require("../../assets/retain/envelop.png"),
          color: "#DBEAFE",
          value: dashboardData.value.totalSMSSent ? dashboardData.value.totalSMSSent : 0,
        },
      ];
    });

    // const donutOption = ref({
    //   chart: {
    //     id: "vuechart-example",
    //   },
    //   xaxis: {},
    //   // labels: ["sent", "delivered", "failed", "rejected"],
    //   labels: [],
    // });
    const donutOption = ref({
      chart: { type: "donut" },
      labels: [],
      legend: { position: "bottom" },
      responsive: [
        {
          // breakpoint: 480
          // options: { chart: { width: 200 }, legend: { position: "bottom" } },
        },
      ],
    });

    const donutSeries = computed(() => {
      if (
        dashboardData.value.deliveryTrend &&
        dashboardData.value.deliveryTrend.length > 0
      ) {
        return dashboardData.value.deliveryTrend.map((i) => i.value);
      } else {
        return [];
      }
    });

    const returnDoubleDigits = (str) => {
      return str.length === 1 ? '0' + str : str;
    }

    const returnDates = (str) => {
      if (str == 1) return returnDoubleDigits(new Date().getDate().toString()) + returnDoubleDigits(((new Date().getMonth() + 1) - 3).toString()) + new Date().getFullYear();
      if (str == 2) return returnDoubleDigits(new Date().getDate().toString()) + returnDoubleDigits(((new Date().getMonth() + 1) - 6).toString()) + new Date().getFullYear();
      if (str == 3) return returnDoubleDigits(new Date().getDate().toString()) + returnDoubleDigits(((new Date().getMonth() + 1)).toString()) + (new Date().getFullYear() - 1);
      if (str == 4) return returnDoubleDigits(new Date().getDate().toString()) + returnDoubleDigits(((new Date().getMonth() + 1)).toString()) + (new Date().getFullYear() - 2);
      if (str == 5) return returnDoubleDigits(new Date().getDate().toString()) + returnDoubleDigits(((new Date().getMonth() + 1)).toString()) + (new Date().getFullYear() - 5);
      if (str == 6) return returnDoubleDigits(new Date().getDate().toString()) + returnDoubleDigits(((new Date().getMonth() + 1)).toString()) + (new Date().getFullYear() - 10);
    }


    const dateRange = ref([
      { name: moment(`${returnDates(1)}`, "DDMMYYYY").fromNow(), value: moment(returnDates(1), "DDMMYYYY").format("l") },
      { name: moment(`${returnDates(2)}`, "DDMMYYYY").fromNow(), value: moment(returnDates(2), "DDMMYYYY").format("l") },
      { name: moment(`${returnDates(3)}`, "DDMMYYYY").fromNow(), value: moment(returnDates(3), "DDMMYYYY").format("l") },
      { name: moment(`${returnDates(4)}`, "DDMMYYYY").fromNow(), value: moment(returnDates(4), "DDMMYYYY").format("l") },
      { name: moment(`${returnDates(5)}`, "DDMMYYYY").fromNow(), value: moment(returnDates(5), "DDMMYYYY").format("l") },
      { name: moment(`${returnDates(6)}`, "DDMMYYYY").fromNow(), value: moment(returnDates(6), "DDMMYYYY").format("l") },
    ]);

    const setSelectedDateRange = (payload) => {
      console.log(payload)
      getBasicDashboard(payload);
    }

    return {
      celebrations,
      showCelebrationDetail,
      notifiedDays,
      subscribeNow,
      getRenewalDate,
      tenantInfo,
      tenantInfoBasic,
      // tenantInfoCeleb,
      moreLinksVissible,
      toggleMoreLinkVissibility,
      offering,
      moment,
      attendanceBoolean,
      // weeklyAttendance,
      // monthlyAttendance,
      firstTimerBoolean,
      // weeklyFirstTimer,
      // monthlyFirstTimer,
      // chartData,
      // monthlyAttendanceObj,
      xAxis,
      monthXaxis,
      series,
      // showPieChart,
      // chartData2,
      series2,
      // monthlyFirstTimerObj,
      // chartDataNewConvert,
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
      setImage,
      accountUtil,
      donutOption,
      donutSeries,
      dateRange,
      dashboardData,
      smsXaxis,
      smsSeries,
      contactXaxis,
      contactSeries,
      setSelectedDateRange,
      setcurrentvalue
    };
  },
};
</script>

<style scoped>
.day3 {
  background-color: #ecf4ff;
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
  background-color: #fef8f8;
  color: #e09579;
  border-left: solid #b3282d 5px;
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
  background-color: #e60023 !important;
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
  padding: 15px 0;
  justify-content: space-between;
  align-items: center;
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
  background: #ffffff;
  box-shadow: 0px 2px 7.5px rgba(0, 0, 0, 0.0588235);
  border-radius: 15px;
}

.box-bottom {
  background: #f1f5f8;
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
    border: 1px solid #dde2e6 !important;
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
  margin-left: -14px;
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

@media (max-width: 305px) {
}

@media (min-width: 509px) and (max-width: 515px) {
}

@media (min-width: 516px) and (max-width: 576px) {
}

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

@media (min-width: 1101px) and (max-width: 1231px) {
}

@media screen and (min-width: 1300px) {
}

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

@media screen and (max-width: 500px) {
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

.chart-parent {
  margin-top: 50px;
}

.stretch-card {
  min-height: 400px;
}
@media (max-width: 500px) {
  .stretch-card {
    min-height: 250px;
  }
}
</style>
