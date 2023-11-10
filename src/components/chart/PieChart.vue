<template>
  <div class="wrapper">
    <div class="chart-div pie" :id="elemId"  ref="chartDiv"></div>
  </div>
</template>

<script>
// import { onMounted, ref } from "vue";

// export default {
//     props: [ "domEL" ],
//   components: {},

//   setup(props) {
      /*eslint no-undef: 1*/
//     const chartDiv = ref(null)
//     const elemId = ref("");
//     console.log(elemId.value);
//     onMounted(() => {
//       elemId.value = props.domEL;
//       google.charts.load("current", { packages: ["corechart"] });
//       google.charts.setOnLoadCallback(drawChart);
//     });

//     const drawChart = () => {
//       var data = google.visualization.arrayToDataTable([
//         ["Task", "Hours per Day"],
//         ["Male", 11],
//         ["Female", 2],
//         ["Not sure", 2]
//       ]);

//       var options = {
//         title: "Offering Breakdown",
//         slices: {0: {color: '#002044'}, 1:{color: '#136acd'}, 2:{color: '#d5d7de'}},
        
//       };


//       var chart = new google.visualization.PieChart(
//         chartDiv.value
//       );


//       chart.draw(data, options);
//     };

//     return {
//         chartDiv,
//         drawChart,
//         elemId,
//     }
//   },
// };
</script>

<style scoped>
    .wrapper {
        display: flex;
        justify-content: center;
    }

    .pie {
        width: 100%;
        padding: 24px 0;
    }

    @media screen and (min-width: 800px) {
        .pie {
            height: 400px;
        }
    }
</style>