<template>
  <div class="con">
    <div :id="domId" class="chart summary-chart" style="height: 100%"></div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import Highcharts from "highcharts";

export default {
  props: [
    "title",
    "subtitle",
    "distance",
    "domId",
    "titleMargin",
    "titleMarginLeft",
    "height",
    "summary",
  ],
  setup(props) {
    const chart = ref(null);
    const getSummary = ref([]);
    // let elemId = "";

    // onMounted(() => {
    // elemId = props.domId;

    console.log(props);

    const datum = [
      {
        name: "Male",
        y: 50,
      },
      {
        name: "Female",
        y: 50,
      },
    ];

    onMounted(() => {

      var highchartsOptions = {
        chart: {
          type: "pie",
          renderTo: props.domId,
          height: props.height ? props.height : 216,
        },
        credits: {
          enabled: false,
        },
        tooltip: {
          enabled: false,
        },
        title: {
          text: `<b style="font-weight:normal;font-size:18px">${props.title}</b>`,
          align: "left",
          x: props.titleMarginLeft ? props.titleMarginLeft : 20,
          y: props.titleMargin ? props.titleMargin : 20,
          margin: 0,
        },
        subtitle: {
          text: props.subtitle,
          align: "left",
          x: props.titleMarginLeft ? props.titleMarginLeft : 20,
          y: 50,
        },
        xAxis: {
          allowDecimals: false,
          title: {
            text: "Age",
          },
        },
        yAxis: {
          title: {
            text: "Pot Value",
          },
          labels: {
            formatter: function () {
              return "£" + this.value / 1000 + "k";
            },
          },
          opposite: false,
        },
        plotOptions: {
          pie: {
            colors: ["#0f0221", "#136acd", "#dde2e6"],
            // allowPointSelect: true,
            cursor: "pointer",
            dataLabels: {
              enabled: true,
              formatter: function () {
                return (
                  this.point.name +
                  ": " +
                  Math.round(this.percentage * 100) / 100 +
                  " %"
                );
              },
              // format: '{point.name}: {point.y:.1f}%',
              distance: props.distance ? props.distance : 3,
            },
            size: 180,
          },
        },
        series: [
          {
            name: "Brands",
            colorByPoint: true,

            data: [
              {
                name: "Male",
                y: 50,
              },
              {
                name: "Female",
                y: 50,
              },
            ],
          },
        ],
        //   credits: false,
      };
      chart.value = new Highcharts.chart(highchartsOptions);
    });
    Highcharts.setOptions({
      colors: ["brown", "purple", "#DDDF00"],
    });
    // })

    return { chart, getSummary, datum };
  },
};
</script>

<style scoped>
.con {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

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
  border-radius: 22px;
  /* margin-bottom: 24px; */
}
</style>