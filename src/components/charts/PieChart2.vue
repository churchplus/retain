<template>
  <div id="chart"></div>
</template>

<script>
import { onUpdated, ref } from "vue";
import Highcharts from "highcharts";

export default {
    name: "Chart1",
    // props: ["chartType", "data"],
  setup(props) {
    const chart = ref(null);
    onUpdated(() => {
      var highchartsOptions = {
        chart: {
          type: "pie",
          renderTo: "chart",
          height: 250,
        },
        credits: {
          enabled: false,
        },
        // tooltip: {
        //   enabled: false,
        // },
        title: {
          text: "The title",
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
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
          //   column: {
          //     pointPadding: 0.02,
          //     borderWidth: 0,
          //     groupPadding: 0.1,
          //     pointWidth: 2,
          //   },
          // bar: {
          //   pointPadding: 0,
          //   borderWidth: 1,
          //   groupPadding: 0.0,
          // },
          pie: {
            allowPointSelect: true,
            cursor: "pointer",
            colors: ["#136acd", "#dde2e6", '#67a9cf', '#708eb1', '#61915e', '#1f06ffc0', "#078292de", "#660792de", '#927d07c2'],
            dataLabels: {
                enabled: false,
                format: '<b>{point.name}</b><br>{point.percentage:.1f} %',
                distance: -40,
                filter: {
                    property: 'percentage',
                    operator: '>',
                    value: 4
                }
            },
            showInLegend: true
          }
        },
        series: [
          {
            name: "Brands",
            colorByPoint: true,
            data: [
              {
                name: "Chrome",
                y: 61.41,
                sliced: true,
                selected: true,
              },
              {
                name: "Internet Explorer",
                y: 11.84,
              },
              {
                name: "Firefox",
                y: 10.85,
              },
              {
                name: "Edge",
                y: 4.67,
              },
            ],
          },
        ],
        //   credits: false,
      };
      chart.value = new Highcharts.chart(highchartsOptions);
    });

    return { chart };
  },
};
</script>

<style lang="scss" scoped>
</style>