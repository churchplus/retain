<template>
  <div>
    <div class="chart-header" v-if="header">
      <div class="icon-div">
        <img src="../../assets/people/members-icon.svg" alt="" />
      </div>
      <div class="header-text">
        <p>{{ header }}</p>
      </div>
    </div>
  </div>
  <div class="wrapper">
    <div
      class=""
      :id="domId"
      style="height: 100%"
      ref="chart"
    ></div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import Highcharts from "highcharts";
export default {
  components: {},

  props: [ "domId" ],

  setup(props) {
    const chart = ref(null);
    const headerText = ref(null);

    onMounted(() => {
        headerText.value = props.header;

      var highchartsOptions = {
             chart: {
        type: 'column',
        renderTo: props.domId,
    },
    title: {
        text: 'Browser market shares. January, 2018'
    },
    subtitle: {
        text: 'Click the columns to view versions. Source: <a href="http://statcounter.com" target="_blank">statcounter.com</a>'
    },
    accessibility: {
        announceNewData: {
            enabled: true
        }
    },
    xAxis: {
        type: 'category'
    },
    yAxis: {
        title: {
            text: 'Total percent market share'
        }

    },
    legend: {
        enabled: false
    },
    plotOptions: {
        series: {
            borderWidth: 0,
            dataLabels: {
                enabled: true,
                format: '{point.y:.1f}%'
            }
        }
    },

    tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
    },

    series: [
        {
            name: "Browsers",
            colorByPoint: true,
            data: [
                {
                    name: "Chrome",
                    y: 62.74,
                    drilldown: "Chrome"
                },
                {
                    name: "Firefox",
                    y: 10.57,
                    drilldown: "Firefox"
                },
                {
                    name: "Internet Explorer",
                    y: 7.23,
                    drilldown: "Internet Explorer"
                },
                {
                    name: "Safari",
                    y: 5.58,
                    drilldown: "Safari"
                },
                {
                    name: "Edge",
                    y: 4.02,
                    drilldown: "Edge"
                },
                {
                    name: "Opera",
                    y: 1.92,
                    drilldown: "Opera"
                },
                {
                    name: "Other",
                    y: 7.62,
                    drilldown: null
                }
            ]
        }
    ],
    drilldown: {
        series: [
            {
                name: "Chrome",
                id: "Chrome",
                data: [
                    [
                        "v65.0",
                        0.1
                    ],
                    [
                        "v64.0",
                        1.3
                    ],
                    [
                        "v63.0",
                        53.02
                    ],
                    [
                        "v62.0",
                        1.4
                    ],
                    [
                        "v61.0",
                        0.88
                    ],
                    [
                        "v60.0",
                        0.56
                    ],
                    [
                        "v59.0",
                        0.45
                    ],
                    [
                        "v58.0",
                        0.49
                    ],
                    [
                        "v57.0",
                        0.32
                    ],
                    [
                        "v56.0",
                        0.29
                    ],
                    [
                        "v55.0",
                        0.79
                    ],
                    [
                        "v54.0",
                        0.18
                    ],
                    [
                        "v51.0",
                        0.13
                    ],
                    [
                        "v49.0",
                        2.16
                    ],
                    [
                        "v48.0",
                        0.13
                    ],
                    [
                        "v47.0",
                        0.11
                    ],
                    [
                        "v43.0",
                        0.17
                    ],
                    [
                        "v29.0",
                        0.26
                    ]
                ]
            },
            {
                name: "Firefox",
                id: "Firefox",
                data: [
                    [
                        "v58.0",
                        1.02
                    ],
                    [
                        "v57.0",
                        7.36
                    ],
                    [
                        "v56.0",
                        0.35
                    ],
                    [
                        "v55.0",
                        0.11
                    ],
                    [
                        "v54.0",
                        0.1
                    ],
                    [
                        "v52.0",
                        0.95
                    ],
                    [
                        "v51.0",
                        0.15
                    ],
                    [
                        "v50.0",
                        0.1
                    ],
                    [
                        "v48.0",
                        0.31
                    ],
                    [
                        "v47.0",
                        0.12
                    ]
                ]
            },
            {
                name: "Internet Explorer",
                id: "Internet Explorer",
                data: [
                    [
                        "v11.0",
                        6.2
                    ],
                    [
                        "v10.0",
                        0.29
                    ],
                    [
                        "v9.0",
                        0.27
                    ],
                    [
                        "v8.0",
                        0.47
                    ]
                ]
            },
            {
                name: "Safari",
                id: "Safari",
                data: [
                    [
                        "v11.0",
                        3.39
                    ],
                    [
                        "v10.1",
                        0.96
                    ],
                    [
                        "v10.0",
                        0.36
                    ],
                    [
                        "v9.1",
                        0.54
                    ],
                    [
                        "v9.0",
                        0.13
                    ],
                    [
                        "v5.1",
                        0.2
                    ]
                ]
            },
            {
                name: "Edge",
                id: "Edge",
                data: [
                    [
                        "v16",
                        2.6
                    ],
                    [
                        "v15",
                        0.92
                    ],
                    [
                        "v14",
                        0.4
                    ],
                    [
                        "v13",
                        0.1
                    ]
                ]
            },
            {
                name: "Opera",
                id: "Opera",
                data: [
                    [
                        "v50.0",
                        0.96
                    ],
                    [
                        "v49.0",
                        0.82
                    ],
                    [
                        "v12.1",
                        0.14
                    ]
                ]
            }
        ]
    }
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
      console.log(props.series, "series")
      console.log(props.data, "data")
    //   console.log(props.attendanceSeries)
    })

    // onUpdated(() => {
    //   console.log(props.series, "passed data")
    //   console.log(props.data, "passed data")

    // })


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
    margin-left: -3rem !important;
    margin-top: 2rem;
  }
}
</style>

<style>
.chart-div {
  border: 1px solid #dde2e6;
  border-radius: 30px;
  margin: 0 0 24px 0;
  box-shadow: 0px 1px 4px #02172e45;
  border: 1px solid #dde2e6;
  padding: 25px 0;
}
</style>