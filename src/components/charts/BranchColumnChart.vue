<template>
  <div>
    <div class="d-flex">
      <div class="head-text mb-3">
        <p>{{ headerText }}</p>
      </div>
    </div>
  </div>
  <div class="wrapper">
    <div
      :class="{
        'chart-div': !fullPath.includes('/checkin'),
        'no-chart-class': fullPath.includes('/checkin'),
      }"
      :id="domId"
      :style="!fullPath.includes('/checkin') ? 'height: 502px' : 'height: 100%'"
      ref="chartDiv"
    ></div>
  </div>
</template>

<script>
import { onMounted, onUpdated, ref } from "vue";
import Highcharts from "highcharts";
import { useRoute } from "vue-router";
export default {
  components: {},

  props: [
    "domId",
    "title",
    "subtitle",
    "header",
    "data",
    "xaxis",
    "series",
    "attendanceSeries",
  ],

  setup(props) {
    const chart = ref(null);
    const headerText = ref(null);
    const route = useRoute();
    const fullPath = ref("");

    onUpdated(() => {
      headerText.value = props.header;

      var highchartsOptions = {
        chart: {
          type: "column",
          renderTo: props.domId,
          height: fullPath.value.includes("/checkin") ? "300px" : "500px",
        },
        credits: {
          enabled: false,
        },
        tooltip: {
          enabled: false,
        },
        title: {
          // text: '',
          text: `<b>${props.title ? props.title : ""}<b>`,
          align: "left",
          x: 70,
          margin: 50,
        },
        subtitle: {
          text: props.subtitle,
          align: "left",
          x: 70,
          y: 50,
        },
        xAxis: {
          allowDecimals: false,
          title: {
            text:
              props && props.series
                ? props.series[0] == 1
                  ? "Weekly"
                  : "Monthly"
                : "Branches",
          },
          categories: props.series,
        },
        yAxis: {
          title: {
            text: "",
          },
          labels: {
            formatter: function () {
              return this.value;
            },
          },
          opposite: false,
        },
        plotOptions: {
          series: {
            groupPadding: 0.4,
            borderRadius: 4,
          },
          column: {
            borderWidth: 1,
          },
        },
        series: props.data,
      };
      chart.value = new Highcharts.chart(highchartsOptions);
    });

    const getRoute = () => {
      fullPath.value = route.fullPath;
    };
    getRoute();

    return {
      chart,
      headerText,
      route,
      fullPath,
    };
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

@media (max-width: 767px) {
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
</style>
