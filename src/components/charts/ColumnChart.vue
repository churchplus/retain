<template>
<div>
  <div class="d-flex">
    <img src="../../assets/people/members-icon.svg" alt="" style="margin-left: -30px;" />
    <div class="chart-header-text">
              <p>{{ header }}</p>
          </div>
  </div>
    <!-- <div class="chart-header" v-if="header">
          <div class="icon-div">
              <img src="../../assets/people/members-icon.svg" alt="">
          </div>
          <div class="chart-header-text">
              <p>{{ header }}</p>
          </div>
      </div> -->
</div>
  <div class="wrapper">
    <div :class="{ 'chart-div' :  !fullPath.includes('/checkin'), 'no-chart-class' : fullPath.includes('/checkin') }" :id="domId" :style="!fullPath.includes('/checkin') ? 'height: 502px' : 'height: 100%'" ref="chartDiv"></div>
    <!-- :class="{ 'chart-div' : !route.fullPath.includes('/checkin'), 'no-chart-div' : route.fullPath.includes('/checkin') }" -->
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import Highcharts from "highcharts";
import { useRoute } from 'vue-router'
export default {
  components: {},

  props: [ "domId", "title", "subtitle", "header", "data", "xaxis", "series", "attendanceSeries" ],

  setup(props) {
    const chart = ref(null);
    const headerText = ref(null);
    const route = useRoute()
    const fullPath = ref("")


    onMounted(() => {
        headerText.value = props.header;

      var highchartsOptions = {
        chart: {
          type: "column",
          renderTo: props.domId,
          height: fullPath.value.includes('/checkin') ? '300px' : '500px'
        },
        credits: {
          enabled: false,
        },
        tooltip: {
          enabled: false,
        },
        title: {
          text: `<b>${props.title}<b>`,
          align: 'left',
            x: 70,
            margin: 50,
        },
        subtitle: {
          text: props.subtitle,
          align: 'left',
            x: 70,
            y: 50,
        },
        xAxis: {
          allowDecimals: false,
          title: {
            text: props && props.series ? props.series[0] == 1 ? "Weekly" : "Monthly" : "No series",
          },
          categories: props.series
        },
        yAxis: {
          title: {
            text: "Attendance",
          },
          labels: {
            formatter: function () {
              return this.value
            },
          },
          opposite: false,
        },
        plotOptions: {
        series: {
            groupPadding: 0.4,
            borderRadius: 4
        },
        column: {
          borderWidth: 1,
        }
    },
        series: props.data
        //  [
        //   {
        //     name: props.microtitle,
        //     color: "#002044",
        //     // data: props.data.data
        //     data: props.data ? props.data.data : props.data
        //     // data: [127, 335, 400, 345, 307, 0, 0]
        //       //  data: [2, 6, 3, 1, 1, 6],
        //   },
        //   {
        //     name: "Female",
        //     color: "#EBEFF4",
        //     data: [10, 34, 21, 16, 15, 4],
        //   },
        //   {
        //     name: "Others",
        //     color: "#002044",
        //     data: [5, 12, 25, 4, 16, 2],
        //   },
        // ],
        //   credits: false,
      };
      chart.value = new Highcharts.chart(highchartsOptions);
    });

const getRoute = () => {
      fullPath.value = route.fullPath
    }
    getRoute()

    return {
      chart,
      headerText,
      route,
      fullPath
    }
  },
};
</script>

<style scoped>
.wrapper {
    width: 100%;
    display: flex;
    justify-content: space-around;
}

.chart-div {
    width: 100%;
}

.chart-header {
    display: flex;
    /* margin-top: -66px; */
}

.icon-div img {
    height: 108px;
    margin-left: -30px;
}

/* .chart-header p {
    font-size: 25px;
    font-weight: 600;
    margin: 0 0 10px 0;
} */

.chart-header-text {
    display: flex;
    align-items: center;
    font-weight: 700;
    font-size: 20px;
}

@media screen and (min-width: 1100px) {
    #chart1 div {
        position: relative;
        left: auto;
        top: auto;
        width: 100%;
        z-index: -1;
    }

    .wrapper div {
      width: 100% !important;
    }
}

  /* @media (max-width: 575px) {
      .wrapper {
          margin-left: -1.4rem!important;
      }
  } */

  @media (max-width: 767px) {
    /* .chart-header p {
    font-size: 23px;
    font-weight: 600;
    margin: 0px 0px -25px -10px;
    } */
    .icon-div img {
    height: 108px;
    margin-left: -30px;
    margin-top: 32px;
}
  }
.no-chart-div {
     border: none;
    border-radius: 0px;
    box-shadow: none;
}
.chart-div {
     /* border: 1px solid #DDE2E6; */
    /* border-radius: 30px;
    margin: 0 0 24px 0;
    box-shadow: 0px 1px 4px #02172E45;
    border: 1px solid #DDE2E6;*/
    /* padding: 10px 0;  */
}
</style>
