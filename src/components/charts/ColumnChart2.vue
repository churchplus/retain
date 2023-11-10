<template>
<div>
    <div class="chart-header" v-if="header">
          <div class="icon-div">
              <img src="../../assets/people/members-icon.svg" alt="">
          </div>
          <div class="header-text">
              <p>{{ header }}</p>
          </div>
      </div>
</div>
  <div class="wrapper">
    <div class="chart-div" :id="domId" style="height: 100%" ref="chartDiv"></div>
  </div>
</template>

<script>
import { onMounted, onUpdated, ref } from "vue";
import Highcharts from "highcharts";
export default {
  components: {},

  props: [ "domId", "title", "subtitle", "header", "data", "xaxis", "series", "attendanceSeries", "seriesText", "yAxisText" ],
  
  setup(props) {
    const chart = ref(null);
    const headerText = ref(null);

    onUpdated(() => {
        headerText.value = props.header;

      var highchartsOptions = {
        chart: {
          type: "column",
          renderTo: props.domId,
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
            text:  props.seriesText,
          },
          categories: props.series
        },
        yAxis: {
          title: {
            text: props.yAxisText,
          },
           min: 0,
          // categories: [1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000],
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
        //     name: "First Timer",
        //     color: "#002044",
        //     data: props.data ? props.data.data : props.data
        //   },
        //   {
        //     name: "New Convert",
        //     color: "#002044",
        //     data: props.data ? props.chartDataNewConvert.data : props.data
        //   }
        // //   {
        // //     name: "Others",
        // //     color: "#002044",
        // //     data: [59, 22, 51, 84, 61, 12],
        // //   },
        // ],
        //   credits: false,
      };
      chart.value = new Highcharts.chart(highchartsOptions);
    });

    onMounted(() => {
      console.log(props.series, "passed series")
      console.log(props.data, "passed data")
    //   console.log(props.attendanceSeries)
    })

    onUpdated(() => {
    //   console.log(props.series, "passed data")
    //   console.log(props.data, "passed data")
      
    })


    return {
      chart,
      headerText,
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
    margin-top: -66px;
}

.icon-div img {
    height: 108px;
    margin-left: -30px;
}

.chart-header p {
    font-size: 25px;
    font-weight: 600;
    margin: 0 0 10px 0;
}

.header-text {
    display: flex;
    align-items: center;
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

  @media (max-width: 575px) {
      /* .chart-div {
        margin-left: -46px
      } */
      .header-text p {
        font-size: 25px;
        font-weight: 600;
        margin: 5px 4px -13px -11px;
      }
      .icon-div {
      margin-left: -3rem!important;
      margin-top: 2rem;
      }
  }
</style>

<style>
    .chart-div {
         border: 1px solid #DDE2E6;
        border-radius: 30px;
        margin: 0 0 24px 0;
        box-shadow: 0px 1px 4px #02172E45;
        border: 1px solid #DDE2E6;
        padding: 25px 0;
    }
</style>