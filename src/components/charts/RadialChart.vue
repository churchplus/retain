<template>
  <div class="con">
    <div :id="domId" class="chart summary-chart h-100" ref="chart"></div>
  </div>
</template>

<script>
import { onMounted, onUpdated, ref } from "vue";
import Highcharts from "highcharts";

export default {
  props: ["domId"],
  setup(props) {
    const charts = ref(null);
    const getSummary = ref([]);

    onMounted(() => {
      var highchartsOptions = {
        colors: ["#FFD700", "#C0C0C0", "#CD7F32"],
        chart: {
          type: "column",
          inverted: true,
          polar: true,
          renderTo: props.domId
        },
        title: {
          text: "",
          align: "left",
        },
        subtitle: {
          text:
            "Source: " +
            '<a href="https://en.wikipedia.org/wiki/All-time_Olympic_Games_medal_table"' +
            'target="_blank">Wikipedia</a>',
          align: "left",
        },
        tooltip: {
          outside: true,
        },
        pane: {
          size: "85%",
          innerSize: "20%",
          endAngle: 270,
        },
        xAxis: {
          tickInterval: 1,
          labels: {
            align: "right",
            useHTML: true,
            allowOverlap: true,
            step: 1,
            y: 3,
            style: {
              fontSize: "13px",
            },
          },
          lineWidth: 0,
          gridLineWidth: 0,
          categories: [
            'Norway <span class="f16"><span id="flag" class="flag no">' +
              "</span></span>",
            'United States <span class="f16"><span id="flag" class="flag us">' +
              "</span></span>",
            'Germany <span class="f16"><span id="flag" class="flag de">' +
              "</span></span>",
            'Austria <span class="f16"><span id="flag" class="flag at">' +
              "</span></span>",
            'Canada <span class="f16"><span id="flag" class="flag ca">' +
              "</span></span>",
          ],
        },
        yAxis: {
          lineWidth: 0,
          tickInterval: 25,
          reversedStacks: false,
          endOnTick: true,
          showLastLabel: true,
          gridLineWidth: 0,
        },
        plotOptions: {
          column: {
            stacking: "normal",
            borderWidth: 0,
            pointPadding: 0,
            groupPadding: 0.15,
            borderRadius: "50%",
          },
        },
        series: [
          {
            name: "Gold medals",
            data: [148, 113, 104, 71, 77],
          },
          {
            name: "Silver medals",
            data: [113, 122, 98, 88, 72],
          },
          {
            name: "Bronze medals",
            data: [124, 95, 65, 91, 76],
          },
        ],
      };
      charts.value = new Highcharts.chart(highchartsOptions);
    });

    return { charts, getSummary };
  },
};
</script>

<style scoped>
.con {
  /* display: flex;
  justify-content: center;
  align-items: center;
  width: 100%; */
  height: 600px;
}
/* #container {
    height: 600px;
} */

.chart {
  display: flex;
  align-items: center;
  width: 100% !important;
}

.chart div {
  width: 100%;
}

.summary-chart {
  width: 100% !important;
  /* box-shadow: 0px 1px 4px #02172E45; */
  /* border: 1px solid #DDE2E6; */
  /* border-radius: 22px; */
  color: #660792de;
  /* margin-bottom: 24px; */
}
</style>