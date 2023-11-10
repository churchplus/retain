<template>
  <div class="container-fluid px-5">
    <!-- header area -->
    <div class="container">
      <div
        class="
          row
          d-flex
          flex-row
          justify-content-between
          mt-5
          align-items-center
        "
      >
        <div class="centered-items">
          <h3 class="heading-text ml-1 text-secondary">Income Statement Report -[Statement of Activities]</h3>
          <p class="text-secondary">This reports provides a detailed report of all the income and expenses of the ministry in a given period, it also gives the margin of the two..</p>
        </div>
      </div>
    </div>
    <!--end of header area -->

    <!-- date area -->
    <div class="container-fluid my-3 px-0 bg-area">
      <div
        style="padding: 0.2rem 0 1.2rem 0"
        class="row d-flex flex-row justify-content-center align-items-center"
      >
        <!-- <div class="col-md-2">
          <h4 class="small font-weight-bold ml-2">Date Range</h4>
        </div> -->

        <div class="col-md-7 d-sm-flex">
          <div class="p-field p-col-12 p-md-4 mt-1">
            <!-- <label for="icon">Start Date</label> -->
            <Calendar id="icon" v-model="startDate" :showIcon="true" />
          </div>
          <div class="p-field p-col-12 p-md-4 my-1">
            <!-- <label for="icon">End Date</label> -->
            <Calendar id="endDate" v-model="endDate" :showIcon="true" />
          </div>
        </div>

        <div class="col-md-3 d-sm-flex justify-content-end align-items-center">
          <button
            class="default-btn generate-report c-pointer font-weight-normal"
            @click="showReport"
          >
            Generate &nbsp; &nbsp; <i class="pi pi-angle-down"></i>
          </button>
        </div>
      </div>
    </div>
    <section  :class="{'hideClass' : !toggleReport, 'showClass':toggleReport}"> 
        <!-- chart area -->
       
          <div class="row">
                <div class="col-12 ">
                    <div class="my-5 text-center text-secondary serviceAttendance">
                       <span class="heading-text">INCOME STATEMENT</span> <span class="statement">-[Statement of Activities]</span> 
                    </div>
                </div>
                <div class="col-12 col-sm-12  col-md-6 col-lg-6">
                    <div class="col-12 border  text-center" style="height: 50vh;">
                        <div class="col-12  font-weight-bold pt-3">Membership By Marital Status</div>
                        <div class="col-12">No Data Available</div>
                        <div class="col-12 " style="height: 50vh;">
                         <ByMaritalStatusChart
                            domId="chart"
                            title="Interested In Joining"
                            :titleMargin="10"
                            :summary="summary"
                         />
                        </div>
                    </div>
                </div>
                <div class="col-12 col-sm-12  col-md-6 col-lg-6">
                    <div class="col-12 border  text-center" style="height: 50vh;">
                        <div class="col-12  font-weight-bold pt-3">Membership By Marital Status</div>
                        <div class="col-12">No Data Available</div>
                        <div class="col-12 " style="height: 50vh;">
                         <ByMaritalStatusChart
                            domId="chart1"
                            title="Interested In Joining"
                            :titleMargin="10"
                            :summary="summary"
                         />
                        </div>
                    </div>
                </div>
                <!-- <div class="col-12 col-sm-12  col-md-6 col-lg-6">
                    <div class="col-12 border text-center mt-3" style="height: 60vh; ">
                        <div class="col-12  font-weight-bold ">Membership By Distribution</div>
                        <div class="col-12">No Data Available</div>
                        <div class="col-12 " style="height: 50vh;">
                            <ByMaritalStatusChart
                                domId="chart2"
                                title="Interested In Joining"
                                :titleMargin="10"
                                :summary="summary"
                            />
                        </div>
                    </div>
                </div> -->
                <!-- <div class="col-12 col-sm-12  col-md-6 col-lg-6">
                    <div class="col-12  border text-center mt-3 " style="height: 60vh;">
                        <div class="col-12 w-100  font-weight-bold">Membership By Age Group</div>
                        <div class="col-12">No Data Available</div>
                        <div class="col-12 " style="height: 50vh;">
                             <ByMaritalStatusChart
                                domId="chart3"
                                title="Interested In Joining"
                                :titleMargin="10"
                                :summary="summary"
                            />
                        </div>
                    </div>
                </div> -->
            </div>
      <!-- table header -->
      <div class="container-fluid table-main px-0 remove-styles2 remove-border my-5" >
        <table class="table remove-styles mt-0 table-responsive table-hover table-header-area">
          <thead class="table-header-area-main">
            <tr
              class="small-text text-capitalize text-nowrap"
              style="border-bottom: 0"
            >
              <th scope="col">Fund</th>
              <th scope="col">Account Category</th>
              <th scope="col">Account Name</th>
              <th scope="col">Description</th>
              <th scope="col">Amount</th>
              <th scope="col">Date</th>
            </tr>
          </thead>
          <tbody class="font-weight-normal text-nowrap">
            <tr>
              <td>Childrens Day Program</td>
              <td>Ajose Oluwatosin</td>
              <td>07090875463</td>
              <td>nonitosinajose7@gmail.com</td>
              <td>41 imam dauda Str. Lagos</td>
              <td>Female</td>
            </tr>        
          </tbody>
        </table>
        <div class="table-foot d-flex justify-content-end mt-n3">
          <PaginationButtons />
        </div>
      </div>
      <!--end table header -->
    </section>
  </div>
</template>

<script>
import { ref,onMounted } from "vue";
import Calendar from "primevue/calendar";
import ByGenderChart from "@/components/charts/PieChart.vue";
import PaginationButtons from "../../../components/pagination/PaginationButtons";
import ByMaritalStatusChart from "@/components/charts/PieChart";

import axios from "@/gateway/backendapi";

export default {
  components: {
    ByMaritalStatusChart,
    Calendar,
    ByGenderChart,
    PaginationButtons,
  },
  setup() {
    const startDate = ref(new Date());
    const endDate = ref(new Date());
    const membersInChurch = ref([]);
    const toggleReport = ref(false);
    const summary = ref([]);
      onMounted (() => {
           summary.value = [
                {
                    name: "Male",
                    value: 50,
                },
                {
                    name: "Female",
                    value: 50,
                },
                {
                    name: "Both",
                    value: 30,
                },
              ];
     })

    const showReport = () => {
        toggleReport.value = true;
    }
   
    return {
      Calendar,
      startDate,
      endDate,
      membersInChurch,
      toggleReport,
      summary,
      showReport,
    };
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}
.default-btn {
  font-weight: 800;
  font-size: 1rem;
  white-space: initial;
  border-radius: 3rem;
  border: 1px solid #136acd;
  padding: 0.5rem 1.25rem;
  color: #136acd;
  width: auto;
  outline: transparent !important;
  max-height: 2.5rem;
  background: #fff;
  min-width: 7.6rem;
}

.generate-report {
  font-size: 1rem;
  color: #fff;
  background-color: #136acd;
  border: none;
  min-width: 7rem;
}
.statement {
    font-size: 1rem;
    font: normal normal 700 1.5rem Nunito sans;
 }
.heading-text {
  font: normal normal 800 1.5rem Nunito sans;
}

.bg-area {
  background-color: #ebeff4;
  border-radius: 0.5rem;
  padding: 0.2rem 0 1.2rem 0;
}

.table {
  width: 100% !important;
  box-shadow: 0 0.063rem 0.25rem #02172e45;
  border: 0.063rem solid #dde2e6;
  border-radius: 30px;
  text-align: left;
  margin-bottom: auto !important;
  padding-bottom: 0.5rem;
}

.table-header-area {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
.table-header-area-main {
  background-color: #ebeff4;
}

.table-main {
    width: 100% !important;
    box-shadow: 0 0.063rem 0.25rem #02172e45 !important;
    border: 0.063rem solid #dde2e6 !important;
    border-radius: 30px !important;
    text-align: left !important;
    margin-bottom: auto !important;
    padding-bottom: 0.5rem !important;
}

.remove-styles{
    border: none !important;
    box-shadow: none !important;
    border-bottom: 0 !important;
    border-bottom-left-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
}

.remove-styles2{
 padding-right: 0;
 padding-left: 0;
 border-top-left-radius: 0 !important;
 border-top-right-radius: 0 !important;
}

.remove-border{
    box-shadow: none !important;
}
.hideClass {
    display: none;
}
.showClass { 
    display: block;
}
</style>