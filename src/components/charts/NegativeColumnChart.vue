

<script>
import { onUpdated, ref } from '@vue/runtime-core'
import Highcharts from "highcharts";
export default {
    props: ['data'],
    setup (props) {


        const chart = ref(null)

        onUpdated(() => {

            var highchartsOptions = {
                chart: {
                    type: 'column',
                    renderTo: "chart"
                },
                title: {
                    text: 'Income Statement Report'
                },
                xAxis: {
                    categories: ['Income', 'Expenses']
                },
                credits: {
                    enabled: false
                },
                series: props.data
                //  [{
                //     name: 'John',
                //     data: [5, 3, 4, 7, 2]
                // }, {
                //     name: 'Jane',
                //     data: [2, -2, -3, 2, 1]
                // }, {
                //     name: 'Joe',
                //     data: [3, 4, 4, -2, 5]
                // }]
      };
      chart.value = new Highcharts.chart(highchartsOptions);
        })
        return {
            chart
        }
    }
}
</script>

<style scoped>

</style>