<template>
    <div
      :id="domId"
      style="height: 100%"
      ref="chart"
    ></div>
</template>

<script>
import { onUpdated,  ref } from "vue";
import Highcharts from "highcharts";
export default {
  components: {},

  props: [
    "domId",
    "funneldata"
  ],

  setup(props) {
    const chart = ref(null);
    const headerText = ref(null);

    onUpdated(() => {
      headerText.value = props.header;

      let funnelchartsOptions = {
        chart: {
          type: "funnel",
          renderTo: props.domId
        },
        title: {
          text: "Lifecycle Summary",
        },
        plotOptions: {
          series: {
            dataLabels: {
              enabled: true,
              format: "<b>{point.name}</b> ({point.y:,.0f})",
              softConnector: true,
            },
            center: ["40%", "50%"],
            neckWidth: "30%",
            neckHeight: "25%",
            width: "80%",
          },
        },
        legend: {
          enabled: false,
        },
        series: [
          {
            name: "Person",
            data: props.funneldata
          },
        ],

        responsive: {
          rules: [
            {
              condition: {
                maxWidth: 500,
              },
              chartOptions: {
                plotOptions: {
                  series: {
                    dataLabels: {
                      inside: true,
                    },
                    center: ["50%", "50%"],
                    width: "100%",
                  },
                },
              },
            },
          ],
        },
      };
      chart.value = new Highcharts.chart(funnelchartsOptions);

    });

    return {
      chart,
      headerText,
    };
  },
};
</script>




<style>
/* .chart-div {
  border: 1px solid #dde2e6;
  border-radius: 30px;
  margin: 0 0 24px 0;
  box-shadow: 0px 1px 4px #02172e45;
  border: 1px solid #dde2e6;
  padding: 25px 0;
} */
</style>