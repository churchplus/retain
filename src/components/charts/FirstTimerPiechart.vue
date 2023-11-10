<template>
  <div class="con">
    <div :id="domId" class="chart summary-chart" style="height: 100%" ref="chart"></div>
  </div>
</template>

<script>
import { onUpdated, ref } from "vue";
import Highcharts from "highcharts";

export default {
  props: ["domId", "piedata1", "data"],
  setup(props) {
    const chart = ref(null);

    onUpdated(() => {
      var highchartsOptions = {
        chart: {
          type: 'pie',
          renderTo: props.domId,
              height: 400,
        },
        title: {
          text: props.data,
        },

        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },

        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                }
            }
        },

        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        series:  [
          {
            // name: 'Browser',
            colorPoint: true,
            data: props.piedata1.map(i => {
              return {
                name: i.name,
                y: i.value,
              }
            })
          }
        ]
      }
      chart.value = new Highcharts.chart(highchartsOptions);
    });

    (props);

    return { chart }
  },
};
</script>

<style scoped>


</style>