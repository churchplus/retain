<template>

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
    setup () {
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
           categories: [
             "01 Jan",
             "02 Jan",
             "03 Jan",
             "04 Jan",
             "05 Jan",
             "06 Jan",
             "07 Jan",
           ],
         },
       });
    
       const seriesarea = ref([
         {
           name: "Series 1",
           data: [45, 52, 38, 45, 19, 23, 2],
         },
         // {
         //   name: "Series 2",
         //   data: [35, 12, 53, 9, 15, 33, 20],
         // },
       ]);
        return {
            areaOptions,
            seriesarea
        }
    }
}
</script>