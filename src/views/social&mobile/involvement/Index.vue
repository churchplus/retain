<template>
    <div>
        <div class="container">
            <div class="row mt-5 d-flex justify-content-between">
                <div class="col-md-4 col-sm-12 col-12 involve1">Involvement</div>
                <div class="col-md-4 col-sm-12 col-12 text-sm-center text-center involve2 mb-4 mt-1 pt-2 text-md-center">
                    <span class=""> 
                        <input
                        placeholder="7/26/2020"
                        v-model="eventDate"
                        type="date"
                        class="border-0 calendar1 time1"
                        required
                        />
                    </span>
                    <span>
                        <input
                        placeholder=""
                        v-model="eventDate"
                        type="date"
                        class="border-0 calendar1 time1"
                        required
                        />
                </span>
                </div>
                <div class="col-md-4 col-sm-12 text-sm-center text-center">
                    <div class="">
                    <span class="">
                       <button class="btn btn-outline-none"> <i class="pi pi-search mr-3"></i></button>
                     
                     <input type="text" placeholder="search" class="border-none">
                     </span>
                    <hr>
                    </div>
                </div>
            </div>
            <!-- Heatmap-->
            <div class="row d-flex justify-content-between mt-5">
                <div class="col-md-8 heatmap1 text-center mb-sm-5 mb-lg-0 mb-md-0 mb-xl-0 mb-5">
                    <div class="row d-flex justify-content-between mt-3">
                        <div class="col-md-4 header4">Heatmap</div>
                        <div class="col-md-4">
                            <button class="btn button1"> All Countries</button>
                        </div>
                    </div>
                    <!-- <div class="vue-world-map">
                          <Map />
                    </div> -->
                </div>
                <!-- Engagement By Country-->
                <div class="col-md-3 heatmap1">
                    <h4 class="mt-4 header4 text-center">Engagement by Country</h4>
                    <div class="row mt-4">
                        <div class="col-md ">
                            <div class="row d-flex justify-content-between">
                                <div class="col-md-2"><img src="../../../assets/social/germany.png" alt=""></div>
                                <div class="col-md-4"><span class="">Germany</span></div>
                                <div class="col-md-5 d-flex justify-content-end">50%</div>
                            </div>
                            
                        </div>
                    </div>
                     <div class="row mt-4">
                        <div class="col-md ">
                            <div class="row d-flex justify-content-between">
                                <div class="col-md-2"><img src="../../../assets/social/canada.png" alt=""></div>
                                <div class="col-md-4"><span class="">Canada</span></div>
                                <div class="col-md-5 d-flex justify-content-end">40%</div>
                            </div>
                            
                        </div>
                    </div>
                     <div class="row mt-4">
                        <div class="col-md ">
                            <div class="row d-flex justify-content-between">
                                <div class="col-md-2"><img src="../../../assets/social/nigeria.png" alt=""></div>
                                <div class="col-md-4"><span class="">Nigeria</span></div>
                                <div class="col-md-5 d-flex justify-content-end">30%</div>
                            </div>
                            
                        </div>
                    </div>
                     <div class="row mt-4">
                        <div class="col-md ">
                            <div class="row d-flex justify-content-between">
                                <div class="col-md-2"><img src="../../../assets/social/united-states-of-america.png" alt=""></div>
                                <div class="col-md-4"><span class="">USA</span></div>
                                <div class="col-md-5 d-flex justify-content-end">23%</div>
                            </div>
                            
                        </div>
                    </div>
                     <div class="row mt-4">
                        <div class="col-md ">
                            <div class="row d-flex justify-content-between">
                                <div class="col-md-2"><img src="../../../assets/social/france.png" alt=""></div>
                                <div class="col-md-4"><span class="">France</span></div>
                                <div class="col-md-5 d-flex justify-content-end">11%</div>
                            </div>
                            
                        </div>
                    </div>
                     <div class="row mt-4">
                        <div class="col-md ">
                            <div class="row d-flex justify-content-between">
                                <div class="col-md-2"><img src="../../../assets/social/ghana.png" alt=""></div>
                                <div class="col-md-4"><span class="">Ghana</span></div>
                                <div class="col-md-5 d-flex justify-content-end">1%</div>
                            </div>
                            
                        </div>
                    </div>
                    
                   
                    
                    
                </div>
            </div>
            <!--Age Stats-->
            <div class="row d-flex justify-content-between mb-5">
                <div class="col-md-8 age1 mt-5">
                    <h4 class="mt-4 header42">Age Stats</h4>
                     <Chart type="bar" :data="multiAxisData" class="mt-5" :options="multiAxisOptions"/>

                </div>
                <div class="col-md-3 mt-5">
                <div class="row">
                    <div class="col-md-12 age2">
                        <h4 class="mt-5 mt-sm-2 header42">Gender</h4>
                        <div class="mt-0 mt-sm-0 mt-md-5 mt-lg-5 mt-xl-5 text-center">
                        <Chart type="doughnut" width="100%" :data="chartData" />
                        </div>
                        <!-- <div class="row">
                            <div class="col-md-9">
                                <h4>DownLoad Full Statistic</h4>
                            </div>
                            <div class="col-md-3">

                            </div>
                        </div> -->
                    </div>
                    <div class="col-md-12">
                         <div class="row d-flex justify-content-between download mt-5">
                                    <div class="col-md-8 col-sm-6 col-6 pt-4">
                                        <h4>Download Full Statistics</h4>

                                    </div>
                                    <div class="col-md-3 col-sm-6 col-6 pt-5">
                                       <i class="pi pi-arrow-right" style="fontSize: 2rem"></i>
                                    </div>
                        </div>
                        
                    </div>
                </div>
                </div>
                

            </div>

        </div>

    </div>
</template>

<script>
//  import Map from 'vue-world-map';
// import Chart from 'primevue/chart';
    export default {
        components:{
            // Chart,
            // Map
        },
        data(){
            return{
                eventDate: new Date().toISOString().substr(0, 10),
                multiAxisData: {
				labels: ['10 - 17', '18 - 24', '25 - 34', '35 - 44', '45 - 54', '55 - 64', '65+'],
				datasets: [
					{
						label: 'Male',
						backgroundColor: [
                            '#136ACD',
                            '#136ACD',
                            '#136ACD',
                            '#136ACD',
                            '#136ACD',
                            '#136ACD',
                            '#136ACD',
                            '#136ACD',
                            '#136ACD',
                            '#136ACD',
                            '#136ACD',
                            '#136ACD',
						],
						yAxisID: 'y-axis-1',
						data: [65, 59, 80, 81, 56, 55, 10]
					},
					{
						label: 'Female',
						backgroundColor: '#F76F6F',
						yAxisID: 'y-axis-2',
						data: [28, 48, 40, 19, 86, 27, 90]
					}
				]
			},
			multiAxisOptions: {
				responsive: true,
				tooltips: {
					mode: 'index',
					intersect: true
				},
				scales: {
					yAxes: [
						{
							type: 'linear',
							display: false,
							position: 'left',
							id: 'y-axis-1',
							ticks: {
								min: 0,
								max: 100
							}
						},
						{
							type: 'linear',
							display: false,
							position: 'right',
							id: 'y-axis-2',
							gridLines: {
								drawOnChartArea: false
							},
							ticks: {
								min: 0,
								max: 100
							}
						}
					]
				}
			},
            chartData: {
				labels: ["Male", "Female"],
				datasets: [
					{
						data: [150, 100,],
						backgroundColor: [
                            "#136ACD",
                             "#F76F6F"
                        ],
                        hoverBackgroundColor: [
                            "#136ACD",
                            "#F76F6F"
                        ]
					}
				]
			},

            }
        }
        
    }
</script>

<style scoped>
.involve1{
font: normal normal bold 34px/46px Nunito Sans;
letter-spacing: 0px;
color: #02172E;
opacity: 1;

}
.involve2{
background: #F7F7F9 0% 0% no-repeat padding-box;
border-radius: 29px;
opacity: 1;
}
.time1{
background-color: #F7F7F9 ;
}
.heatmap1{
background: #FFFFFF 0% 0% no-repeat padding-box;
border: 1px solid #708EB152;
border-radius: 15px;
opacity: 1;
height: 490px
}
.header4{
font: normal normal bold 22px/30px Nunito Sans;
letter-spacing: 0px;
color: #02172E;
opacity: 1;
}
.button1{
border: 1px solid #70707038;
border-radius: 29px;
opacity: 1;
text-align: center;
font: normal normal bold 12px/16px Nunito Sans;
letter-spacing: 0px;
color: #020F1E;
opacity: 1;
}
.age1{
background: #FFFFFF 0% 0% no-repeat padding-box;
border: 1px solid #708EB152;
border-radius: 15px;
opacity: 1;
height: 503px;
}
.age2{
background: #FFFFFF 0% 0% no-repeat padding-box;
border: 1px solid #708EB152;
border-radius: 15px;
opacity: 1;
height: 334px;

}
.header42{
font: normal normal bold 22px/30px Nunito Sans;
letter-spacing: 0px;
color: #020F1E;
opacity: 1;
}
.download{
background: #F8F8FA 0% 0% no-repeat padding-box;
border-radius: 15px;
opacity: 1;
height: 125px;
}


</style>