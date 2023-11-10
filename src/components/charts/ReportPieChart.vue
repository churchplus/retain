<template>
  <div class="con">
    <div :id="domId" class="chart summary-chart" style="height: 100%"></div>
  </div>
</template>

<script>
import { onMounted, onUpdated, ref } from "vue";
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

    console.log(props);

    onUpdated(() => {
      try {
        getSummary.value = [ ]
        props.summary.forEach((i) => {
          let summaryObj = {
            name: i.name === 'Not_Specified' ? `<div style="font-weight: 200;">Not Sure</div>` : i.name === null ? 'Not Sure' : `<div style="font-weight: 200;">${i.name}</div>`,
            y: i.value,
          };
          getSummary.value.push(summaryObj);
        });
      } catch (error) {
        console.log(error);
      }

var highchartsOptions = {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
        renderTo: props.domId,
        height: 300,
    },
    legend : {
        //   align: 'bottom',
        //   layout: 'horizontal',
          // verticalAlign: 'top',
        //   x: 10,
        //   y: 20
        },
    title: {
        text: props.title
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
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
            // colors: pieColors,
            colors: ["#136acd", "#dde2e6", '#67a9cf', '#708eb1', '#61915e', '#1f06ffc0', "#078292de", "#660792de", '#927d07c2'],
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b><br>{point.percentage:.1f} %',
                distance: -50,
                filter: {
                    property: 'percentage',
                    operator: '>',
                    value: 4
                }
            },
            // showInLegend: true
        }
    },
    series: [{
        name: 'Share',
        data: getSummary.value
    }]
}

      chart.value = new Highcharts.chart(highchartsOptions);
    });
    // Highcharts.setOptions({
    //   colors: ["brown", "purple", "#DDDF00"],
    // });
    // })

    onMounted(() => {
    //   getSummary.value = [
    //   {
    //     name: "Male",
    //     y: 50,
    //   },
    //   {
    //     name: "Female",
    //     y: 50,
    //   },
    // ];
    // console.log(props.summary)
    console.log(getSummary.value)
    });

    return { chart, getSummary }
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
  color: #660792de
  /* margin-bottom: 24px; */
}

</style>