<template>
  {{ series }} {{ xaxis }}lll
  <apexchart
    width="100%"
    height="100%"
    type="area"
    :options="areaOptions"
    :series="seriesarea"
  ></apexchart>
</template>

<script>
import { ref } from "vue";

export default {
  props: {
    series: {
      type: Array,
      required: true,
    },
    xaxis: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const areaOptions = ref({
      chart: {
        height: 280,
        type: "area",
      },
      dataLabels: {
        enabled: false,
      },

      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.9,
          stops: [0, 90, 100],
        },
      },
      xaxis: {
        categories: props.xaxis,
      },
    });

    const seriesarea = ref(
      props.series && props.series.length > 0 ? [...props.series] : []
    );
    return {
      areaOptions,
      seriesarea,
    };
  },
};
</script>
