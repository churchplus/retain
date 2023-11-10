<template>
  <div>
    <div :id="domId" style="width: 100%; height: 400px"></div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import Highcharts from "highcharts";

export default {
  props: ["elemId", "domId", "title", "subtitle", "lineColor", "series"],
  setup(props) {
    const chart = ref(null);
    onMounted(() => {
      console.log(props.series, "series");
      let highchartsOptions = {
        chart: {
          type: "line",
          renderTo: props.domId,
        },
        title: {
          text: `${props.title}`,
          align: "left",
          x: 20,
          y: 20,
        },
        xAxis: {
          categories: [
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
  
  },
};
</script>

<style scoped>
</style>