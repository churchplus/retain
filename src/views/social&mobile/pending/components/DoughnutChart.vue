<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-12">
                <Chart type="doughnut" width="100%" :data="chartData" :options="pieOptions" />
            </div>
        </div>
    </div>
</template>

<script>
    // import Chart from 'primevue/chart';
    export default {
        props: [ 'approved', 'pending' ],
        // components: { Chart },
        setup(props) {
            const chartData = {
				labels: ['Approved','Pending'],
                legend: {display: false},
				datasets: [
					{
                        legend: {display: false},
						data: [props.approved, props.pending],
						backgroundColor: [
                            "#66BB6A",
                            "#ffc107"
                        ],
                        hoverBackgroundColor: [
                            "#66bb91",
                            "#ff9407",
                        ]
					}
				]
			}

            const pieOptions = {
                legend: {
                    display: false,
                    position: 'right'
                }
            };

            return {
                chartData,
                pieOptions,
            }
        }
    }
</script>

<style scoped>

</style>