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
          <h3 class="heading-text ml-2">Basic Expense Report</h3>
        </div>

        <div class="centered-items">
          <button class="default-btn font-weight-normal">
            Export &nbsp; &nbsp; <i class="pi pi-angle-down"></i>
          </button>
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
        <div class="col-md-2">
          <h4 class="small font-weight-bold ml-2">Date Range</h4>
        </div>

        <div class="col-md-7 d-sm-flex">
          <div class="p-field p-col-12 p-md-4 mt-1">
            <!-- <label for="icon">Start Date</label> -->
            <Calendar id="icon" v-model="startDate" :showIcon="true" dateFormat="dd/mm/yy"/>
          </div>
          <div class="p-field p-col-12 p-md-4 my-1">
            <!-- <label for="icon">End Date</label> -->
            <Calendar id="endDate" v-model="endDate" :showIcon="true" dateFormat="dd/mm/yy"/>
          </div>
        </div>

        <div class="col-md-3 d-sm-flex justify-content-end align-items-center">
          <button
            class="default-btn generate-report c-pointer font-weight-normal"
            @click="generateReport"
          >
            Generate
          </button>
        </div>
      </div>
    </div>
    <!--end of date area -->

    <section>
        <div>
            <h3 class="font-weight-bold mt-5 mb-3">EXPENSE REPORT</h3>
        </div>
      <!-- chart area -->
      <div class="row">
          <div class=" col-md-6 col-12 chart">
        <!-- <div style="width: 45%" class="ml-md-4 chart1">
          <ByGenderChart
            domId="chart"
            title="By Gender"
            distance="5"
            :titleMargin="10"
            :summary="firstTimerChart"
          />
        </div> -->
      </div>
      <div class=" col-md-6 col-12 chart">
        <div style="width: 45%" class="ml-md-4 chart1">
          <ByGenderChart
            domId="chart"
            title="Expense"
            distance="5"
            :titleMargin="10"
            :summary="firstTimerChart"
          />
        </div>
      </div>
      </div>
      <!--end of chart area -->
    </section>

    <section>
       <!-- table header -->
       
      <div class="container-fluid table-main px-0 remove-styles2 remove-border mb-5 mt-2" >
        <table class="table remove-styles mt-0 table-hover table-responsive-lg table-header-area">
          <thead class="table-header-area-main">
            <tr
              class="small-text text-capitalize text-nowrap"
              style=""
            >
              <th scope="col">Fund</th>
              <th scope="col">Account Name</th>
              <th scope="col">Description</th>
              <th scope="col">Amount</th>
              <th scope="col">Date</th>
            </tr>
          </thead>
          <tbody class="font-weight-normal text-nowrap">
            <tr>
              <td>General Fund-Fund Balance</td>
              <td>Salaries</td>
              <td>Purchase of Fuel</td>
              <td>400.00</td>
              <td>27-May-21</td>
            </tr>
            <tr>
              <td>General Fund-Fund Balance</td>
              <td>Salaries</td>
              <td>Purchase of Fuel</td>
              <td>400.00</td>
              <td>27-May-21</td>
            </tr>
            <tr>
             <td>General Fund-Fund Balance</td>
              <td>Salaries</td>
              <td>Purchase of Fuel</td>
              <td>400.00</td>
              <td>27-May-21</td>
            </tr>
            <tr class="bg-secondary">
              <td></td>
              <td></td>
              <td></td>
              <td class="">NGN
                  <span class="ml-3"> 438,729.00</span>
              </td>
              <!-- <td colspan="2" class="">438,729.00</td> -->
              <td></td>
            </tr>
          </tbody>
        </table>
        <div class="table-foot d-flex justify-content-end">
          <PaginationButtons />
        </div>
      </div>
      <!--end table header -->
    </section>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import Calendar from "primevue/calendar";
import ByGenderChart from "@/components/charts/PieChart.vue";
import PaginationButtons from "../../../components/pagination/PaginationButtons";
import axios from "@/gateway/backendapi";
import dateFormatter from  "../../../services/dates/dateformatter";

export default {
  components: {
    Calendar,
    ByGenderChart,
    PaginationButtons,
  },
  setup() {
    const startDate = ref("");
    const endDate = ref("");
    const firstTimerInChurch = ref([]);
    const firstTimerChart = ref([])
    const generateReport = () => {

      axios
        .get(`/api/Reports/people/getFirstTimersReport?startDate=${new Date(startDate.value).toLocaleDateString("en-US")}&endDate=${new Date(endDate.value).toLocaleDateString("en-US")}`)
        .then((res) => {

          console.log(res, "🎄🎄🎄");
          firstTimerInChurch.value = res.data;
          console.log(firstTimerInChurch.value, "✌️✌️");
        })
        .catch((err) => {
          console.log(err);
        });
    };

     const formatDate = (activityDate) => {
      return dateFormatter.monthDayYear(activityDate);
    };

    onMounted(() => {
      firstTimerChart.value = [{name: "Dapo", value: 77}]
    })


    return {
      Calendar,
      startDate,
      endDate,
      firstTimerInChurch,
      generateReport,
      formatDate,
      firstTimerChart
    };
  },
};
</script>

<style scoped>
.default-btn {
    font-weight: 600;
    white-space: initial;
    font-size: 1rem;
    border-radius: 3rem;
    /* border: 1px solid #002044; */
    padding: .5rem 1.25rem;
    width: auto;
	  border:none;
    /* outline: transparent !important; */
    max-height: 40px;
    background: #6c757d47 !important;
    color:#000;
    text-decoration: none;
    min-width: 121px;
}

.default-btn:hover {
  text-decoration: none;
}


.generate-report {
  font-size: 1rem;
  color: #fff;
  background-color: #136acd !important ;
  border: none;
  min-width: 7rem;
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
</style>