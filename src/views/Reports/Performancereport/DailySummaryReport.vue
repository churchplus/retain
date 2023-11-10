<template>
   <div class="container-wide container-top mb-5">
        <div class="d-flex justify-content-between">
            <div class="header">Overall summary service report</div>
            <div class="default-btn  d-flex align-items-center justify-content-center"><div>Export</div>&nbsp;&nbsp;<i class="pi pi-sort-down"></i></div>
        </div>
        <div class="row mt-4" style="background: #ebeff4;">
            <!-- <div class="col-sm-2">Date Range</div> -->
            <div class="col-sm-12">
               <div class="row p-4">
                   <div class="col-sm-9">
                    <div class="font-weight-600">Pick event date</div>
                    <div class="mt-2">
                        <Calendar id="icon" v-model="endDate" class="w-50" :showIcon="true" />
                    </div>
                </div>
                <div class="offset-sm-1 col-sm-2">
                    <div style="height: 33%"></div>
                    <div class="mt-2 default-btn primary-bg text-center border-0 text-white" @click="getAttendanceReport">Generate</div>
                </div>
               </div>
        </div>


        </div>
        <div class="row mt-4">
            <overall-summary-report />
        </div>
    </div>
  <div>
</div>
</template>

<script>
import OverallSummaryReport from "./component/OverallSummaryReport.vue"
import Calendar from 'primevue/calendar';
export default {
    components: {
        OverallSummaryReport,
        Calendar
    }

}
</script>

<style scoped>
.header {
    font: normal normal 800 29px Nunito sans;
}
</style>