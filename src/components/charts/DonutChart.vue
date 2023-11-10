<template>
  <div class="con">
    <div :id="domId" class="chart summary-chart" style="height: 100%"></div>
  </div>
</template>

<script>
import { onUpdated, ref } from "vue";
import Highcharts from "highcharts";
import axio from "axios";
export default {
  props: ["domId", "total", "data"],
  setup(props) {
    const chart = ref(null);
    const dataset = ref({});
    const inputValue = ref(props.total);
    const getSummary = ref([]);
    const summaryOutput = ref([])


    const nbr = ref(props.data.length);

    onUpdated(async () => {
      getSummary.value = props.data;
      const getData = () => {
        summaryOutput.value = getSummary.value.map((country) => {
          const countryName = country.name;
          const countryData = country.value;
          return [countryName, countryData];
        });
        if (summaryOutput.value) {
          return [summaryOutput.value, summaryOutput.value.slice(0, nbr.value)];
        } else {
          return summaryOutput.value;
        }
      };

      const getSubtitle = () => {
        return `
      <div class="text-center  row">
           <div class="col-md-12 ">
           <b class=" text-center">Total Value</b>
           <div class=" h2 font-weight-bold text-center">${props.total}</div>
           </div>
        </div>
        `;
      };
      getData()
      getSubtitle();
      try {
        const { data } = await axio.get(
          "https://cdn.jsdelivr.net/gh/highcharts/highcharts@88f2067/samples/data/nuclear-energy-production.json"
        );
        dataset.value = data;
      } catch (error) {}
      var highchartsOptions = {
        chart: {
          type: "donut",
          height: 350,
          renderTo: props.domId,
        },

        title: {
          text: "",
          align: "center",
        },
        subtitle: {
          useHTML: true,
          text: getSubtitle(),
          floating: true,
          // verticalAlign: "",
          y: 90,
        },

        legend: {
          enabled: true,
          layout: "horizontal",
        },

        tooltip: {
          valueDecimals: 2,
          valueSuffix: " ",
        },

        plotOptions: {
          series: {
            borderWidth: 0,
            colorByPoint: true,
            type: "pie",
            size: "100%",
            innerSize: "80%",
            dataLabels: {
              enabled: false,
              crop: false,
              distance: "-10%",
              style: {
                fontWeight: "bold",
                fontSize: "16px",
              },
              connectorWidth: 0,
            },
            showInLegend: true,
          },
        },
        colors: [
          "#136acd",
          "#dde2e6",
          "#969899",
          "#a7b8cc",
          "#4aaeed",
          "#88dfeb",
          "#9e73fa",
          "#666562",
          "#42c5f5",
        ],
        series: [
          {
            type: "pie",
            data: getData()[nbr.value],
          },
        ],
      };
      chart.value = new Highcharts.chart(highchartsOptions);
    })();

    return {
      chart,
      getSummary,
      inputValue,
      dataset,
      nbr,
      summaryOutput
    };
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
  /* border-radius: 22px; */
  color: #660792de;
  /* margin-bottom: 24px; */
}
</style>