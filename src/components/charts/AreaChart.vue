<template>
  <div>
    <div :id="domId" style="width: 100%;"></div>
  </div>
</template>

<script>
import { onUpdated, ref } from "vue";
import Highcharts from "highcharts";
import { useRoute } from "vue-router"

export default {
  props: ["elemId", "domId", "title", "subtitle", "lineColor", "series", "xAxis"],
  setup(props) {
    const chart = ref(null);
    const route = useRoute()
    onUpdated(() => {
      console.log(props.series, "series");
      let highchartsOptions = {
        chart: {
          type: "line",
          renderTo: props.domId,
          height: route.fullPath.includes("attendanceperformancereport") || route.fullPath.includes("branch_report") ? 500 : '250px'
        },
        title: {
          text: `${props.title}`,
          align: "left",
          x: 20,
          y: 20,
        },
        xAxis: {
          categories: props.xAxis ? props.xAxis : [
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
          ],
          tickInterval: 1,
          labels: {
            // enabled: false,
          },
        },
        subtitle: {
          text: `<span style="color: #136ACD;font-size:16px">${
            props.subtitle ? props.subtitle : " "
          }</span>`,
          align: "left",
          x: 20,
          y: 40,
        },
        // plotOptions: {
        //   series: {
        //     lineWidth: 2,
        //     shadow: true,
        //     marker: {
        //       enabled: false,
        //       symbol: "circle",
        //       states: {
        //         hover: {
        //           enabled: true,
        //         },
        //       },
        //     },
        //   },
        // },

        yAxis: {
          labels: {
            enabled: true,
          },
        },

        series: [
          {
            color: props.lineColor,
            name: "",
            data: props.series || [
              29.9,
              71.5,
              106.4,
              23,
              34,
              24,
              56,
              12,
              23,
              32,
              45,
              38,
            ],
            // data: [29.9, 71.5, 106.4, 23, 34, 24, 56, 12, 23, 32, 45, 38],
          },
        ],
      };
      chart.value = new Highcharts.chart(highchartsOptions);
    });
    onUpdated(() => {
      console.log(props.series);
    });
  },
};
</script>

<style scoped>
</style>