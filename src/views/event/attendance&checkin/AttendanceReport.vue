<template>
  <div class="container-fluid">

    <div class="row mt-4">
        <div class="col-md-3">
            <h6 class="font-weight-bold">Status</h6>
            <p><span class="small-text status-p font-weight-700">
                {{ reportData.status }}
            </span></p>
        </div>
        <div class="col-md-7">
            <h6 class="font-weight-bold">Event</h6>
            <p class="small-text font-weight-bold d-flex align-items-center" style="color: #136ACD;">{{ reportData.eventName }} <i class="pi pi-info-circle ml-2"></i></p>
        </div>
        <div class="col-md-2">
            <h6 class="font-weight-bold">Date</h6>
            <p class="small-text">{{ formatDate(reportData.date) }}</p>
        </div>
    </div>

    <div class="row mt-3 mb-4 stats-box d-flex align-items-center">
        <div class="col-md-3">
            <h2 class="font-weight-600">{{ totalAttendance }}</h2>
            <p class="small-text font-weight-700" style="color: #136ACD;">
                Total registered
            </p>
        </div>
        <div class="col-md-3">
            <h2 class="font-weight-700">{{ attendees }}</h2>
            <p class="small-text font-weight-700" style="color: #136ACD;">Attendees</p>
        </div>
        <div class="col-md-2">
            <h2>{{ absentees}}</h2>
            <p class="small-text font-weight-700" style="color: #136ACD;">Absentees</p>
        </div>
        <div class="col-md-4">
           <ReportChart domId="reportChart" title="" height="180" :summary="chartData" />
        </div>
    </div>

    <div class="row over-con" id="table">
      <div class="col-md-12 py-4">
        <div class="row" id="ignore1">
          <div class="col-md-7">
            <p class=" px-2">
              <el-input
                v-model="searchText"
                class="w-100 m-2"
                placeholder="Search"
                :prefix-icon="Search"
              />
            </p>
          </div>
          <div class="col-md-3 offset-sm-2 ">
            <div class="row">
              <div class="col-md-5 mt-3 d-flex cursor-pointer small-text font-weight-700" @click="sortAttendanceDataByPresent">
                <el-icon class="text-primary" ><Sort /></el-icon>
                <el-tooltip
                  class=""
                  effect="dark"
                  content="Sort column"
                  placement="top-start"
                >
                  <div>SORT</div>
                </el-tooltip>
              </div>

            <div class="dropdown col-sm-7 mt-3 mt-3">
              <div class="cursor-pointer d-flex small-text font-weight-700" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
                <el-icon  class="text-primary"><Printer /></el-icon>
                <el-tooltip
                  class=""
                  effect="dark"
                  content="Print Attendance"
                  placement="top-start"
                >
                  <div class="ml-1">PRINT</div>
                </el-tooltip>
              </div>
                
                <div class="dropdown-menu style-account" aria-labelledby="dropdownMenuButton">
                <!-- Print Those Present -->
                <a class="dropdown-item elipsis-items cursor-pointer"  @click="printJS({ 
                ignoreElements: ['ignore1'], 
                maxWidth: 867, 
                header: 'ATTENDANCE', 
                printable: presentAttendance, 
                properties: ['NAME', 'ADDRESS','PHONE', 'PRESENT', 'CHANNEL'], 
                type: 'json', 
                headerStyle: 'font-family: Nunito Sans, Calibri; text-align: center;', 
                gridHeaderStyle: 'border: 1.5px solid #6d6d6d19; font-family: Nunito Sans, calibri; padding: 7px; text-align: left;', 
                gridStyle: 'border: 1.5px solid #6d6d6d19; font-family: Nunito Sans, calibri; padding: 7px; font-weight: 300' 
                })"> Present </a>


                <!-- Print Those Absent -->
                <a class="dropdown-item elipsis-items cursor-pointer" @click="printJS({ 
                ignoreElements: ['ignore1'], 
                maxWidth: 867, 
                header: 'ATTENDANCE', 
                printable: absentAttendance, 
                properties: ['NAME', 'ADDRESS','PHONE', 'PRESENT', 'CHANNEL'], 
                type: 'json', 
                headerStyle: 'font-family: Nunito Sans, Calibri; text-align: center;', 
                gridHeaderStyle: 'border: 1.5px solid #6d6d6d19; font-family: Nunito Sans, calibri; padding: 7px; text-align: left;', 
                gridStyle: 'border: 1.5px solid #6d6d6d19; font-family: Nunito Sans, calibri; padding: 7px; font-weight: 300' 
                })" data-v-26c77059=""> Absent </a>

                <!-- Print All -->
                <a class="dropdown-item elipsis-items cursor-pointer" @click="printJS({ 
                ignoreElements: ['ignore1'], 
                maxWidth: 867, 
                header: 'ATTENDANCE', 
                printable: printAttendance, 
                properties: ['NAME', 'ADDRESS','PHONE', 'PRESENT', 'CHANNEL'], 
                type: 'json', 
                headerStyle: 'font-family: Nunito Sans, Calibri; text-align: center;', 
                gridHeaderStyle: 'border: 1.5px solid #6d6d6d19; font-family: Nunito Sans, calibri; padding: 7px; text-align: left;', 
                gridStyle: 'border: 1.5px solid #6d6d6d19; font-family: Nunito Sans, calibri; padding: 7px; font-weight: 300' 
                })" data-v-26c77059=""> All </a>
              </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row mt-2 main-th font-weight-700 py-2 small-text grey-rounded-bg">
          <div class="col-md-4">Name</div>
          <div class="col-md-3">Address</div>
          <div class="col-md-2">Phone</div>
          <div class="col-md-2 c-pointer">Present </div>
          <div class="col-md-1">Channel</div>
        </div>

        <div class="row py-2 tb-row small-text" v-for="(person, index) in people" :key="index">
          <div class="col-md-4">
            <span class="d-flex justify-content-between">
              <span class="hidden-header hide font-weight-700">Name</span>
              <span class="small-text">{{ person.name }}</span>
            </span>
          </div>
          <div class="col-md-3">
            <span class="d-flex justify-content-between">
              <span class="hidden-header hide font-weight-700">Address</span>
              <span class="small-text">{{ person.address }}</span>
            </span>
          </div>
          <div class="col-md-2">
            <span class="d-flex justify-content-between">
              <span class="hidden-header hide font-weight-700"
                >Phone Number</span
              >
              <span class="small-text" v-if="person.phone">{{ person.phone }}</span>
              <a class="small-text text-primary" href="#" @click="toggle(person, index)" v-else>{{ person.phoneNumber ? person.phoneNumber : 'view phone' }}</a>
            </span>
          </div>
          <div class="col-md-2">
            <span class="d-flex justify-content-between">
              <span class="hidden-header hide font-weight-700">Checked-in</span>
              <span>
                <el-icon class="attended" v-if="person.isPresent"><Check /></el-icon>
                <el-icon v-else><Close /></el-icon>
              </span>
            </span>
          </div>
          <div class="col-md-1" style="overflow-x:hidden">
            <span class="d-flex justify-content-between">
              <span class="hidden-header hide font-weight-700">Option</span>
              <span>
                {{ person.isPresent ? person.checkedinOption : '---'  }}
              </span>
            </span>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12 text-center py-3">
            <p class="text-danger font-weight-700" v-if="errorMessage">{{ errorMessage }}</p>
          </div>
        </div>

        <LoadingComponent :loading="loading" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import ReportChart from "../../../components/charts/SecondReportPie";
import attendanceservice from '../../../services/attendance/attendanceservice';
import { useRoute } from "vue-router";
import dateFormatter from '../../../services/dates/dateformatter';
import LoadingComponent from "../../../components/loading/LoadingComponent"
import printJS from 'print-js'
import { Search } from '@element-plus/icons-vue'
import axios from "@/gateway/backendapi";
import { ElMessage } from "element-plus";

export default {
    components: { ReportChart, LoadingComponent },
    setup() {
        const route = useRoute();
        const data = ref([]);
        const reportData = ref({ });
        const loading = ref(true);
        const op = ref()
        const phoneNumber = ref("")
        const noNumber = ref("")


        const errorMessage = ref("")
        const getReportData = async () => {
          try {
            const response = await attendanceservice.getReport(route.params.id);
            reportData.value = response;
            loading.value = false;
            sortAttendanceDataByPresent();
            console.log(response)
          } catch (error) {
            console.log(error);
            if (error.toString().toLowerCase().includes("network error")) {
              errorMessage.value = "Loading data failed, please check your internet connection and try reloading the page"
            }
            loading.value = false;
          }
        }

        const formatDate = (date) => {
          return dateFormatter.monthDayYear(date);
        }

        const absentees = computed(() => {
          if (!reportData.value || !reportData.value.peopoleAttendancesDTOs || reportData.value.peopoleAttendancesDTOs.length === 0) return 0;
          return reportData.value.peopoleAttendancesDTOs.filter(i => !i.isPresent).length;
        })

        const attendees = computed(() => {
          if (!reportData.value || !reportData.value.peopoleAttendancesDTOs || reportData.value.peopoleAttendancesDTOs.length === 0) return 0;
          return reportData.value.peopoleAttendancesDTOs.filter(i => i.isPresent).length;
        })

        const totalAttendance = computed(() => {
          if (!reportData.value || !reportData.value.peopoleAttendancesDTOs || reportData.value.peopoleAttendancesDTOs.length === 0) return 0;
          return reportData.value.peopoleAttendancesDTOs.length;
        })

        const chartData = computed(() => {
          return [
              {
                name: "Present",
                y: Math.floor(( attendees.value / totalAttendance.value ) * 100),
              },
              {
                name: "Absent",
                y: Math.floor(( absentees.value / totalAttendance.value ) * 100),
              },
            ]
        })

        getReportData();

        const isSorted = ref(false);
        const sortAttendanceDataByPresent = () => {
          if (isSorted.value) {
            reportData.value.peopoleAttendancesDTOs.sort(x => !x.isPresent ? -1 : 1)
          } else {
            reportData.value.peopoleAttendancesDTOs.sort(x => x.isPresent ? -1 : 1)
          }
          isSorted.value = !isSorted.value;
        }

        const searchText = ref("");
        const people = computed(() => {
          if (!searchText.value) return reportData.value.peopoleAttendancesDTOs;
          return reportData.value.peopoleAttendancesDTOs.filter(i => {
            return (i.name && i.name.toLowerCase().includes(searchText.value.toLowerCase())) || (i.checkedinOption && i.checkedinOption.toLowerCase().includes(searchText.value.toLowerCase())) || (i.email && i.email.toLowerCase().includes(searchText.value.toLowerCase())) || (i.phone && i.phone.toLowerCase().includes(searchText.value.toLowerCase()))
          })
        })

       const printAttendance = computed(() => {
         if (reportData.value.peopoleAttendancesDTOs.length === 0) return []
         return reportData.value.peopoleAttendancesDTOs.map(i => {
           return {
             NAME:  i.name ? i.name : "",
             ADDRESS: i.address ? i.address : "",
             PHONE: i.phone ? i.phone : "",
             PRESENT: i.isPresent === null ? "" : "Yes",
             CHANNEL: i.checkedinOption ? i.checkedinOption : ""
           }
         })
       })

       const filterPresentAttendance = computed (() => {
         if (reportData.value.peopoleAttendancesDTOs) {
           if (reportData.value.peopoleAttendancesDTOs.length === 0) return []
            return reportData.value.peopoleAttendancesDTOs.filter(i => {
              return i.isPresent
            })
         }         
       })

       const presentAttendance = computed (() => {
          if (filterPresentAttendance.value.length === 0) return []
          return  filterPresentAttendance.value.map(i => {
            return {
                    NAME:  i.name ? i.name : "",
                    ADDRESS: i.address ? i.address : "",
                    PHONE: i.phone ? i.phone : "",
                    PRESENT: !i.isPresent ? "No" : "Yes",
                    CHANNEL: i.checkedinOption ? i.checkedinOption : ""
                  }
          })
        })
       
       
       const filterAbsentAttendance = computed (() => {
         if (reportData.value.peopoleAttendancesDTOs) {
           if (reportData.value.peopoleAttendancesDTOs.length === 0) return []
            return reportData.value.peopoleAttendancesDTOs.filter(i => {
              return !i.isPresent
            })
         }         
       })

       const absentAttendance = computed (() => {
          if (filterAbsentAttendance.value.length === 0) return []
          return  filterAbsentAttendance.value.map(i => {
            return {
                    NAME:  i.name ? i.name : "",
                    ADDRESS: i.address ? i.address : "",
                    PHONE: i.phone ? i.phone : "",
                    PRESENT: !i.isPresent ? "No" : "Yes",
                    CHANNEL: i.checkedinOption ? i.checkedinOption : ""
                  }
          })
        })

        const toggle = async(people, index) => {
           
            try {
              const  data = await axios.get(`api/CheckInAttendance/revealParentNumber?personId=${people.personID}`)
              console.log(data)
              
                let reg = new RegExp('^[0-9]+$');
                let removePlus = data.data.includes('+') ? data.data.slice(1) : data.data
                if (reg.test(removePlus)) {
                  reportData.value.peopoleAttendancesDTOs[index].phoneNumber = data.data
                  } else {
                  reportData.value.peopoleAttendancesDTOs[index].phoneNumber = 'No phone'
                  ElMessage({
                        type: "info",
                        message: data.data,
                        duration: 2000,
                      });
                   
                    }
              
            } catch (err){
              console.log(err)
            }
        };

  
        return {
            data,
            reportData,
            formatDate,
            totalAttendance,
            absentees,
            attendees,
            chartData,
            sortAttendanceDataByPresent,
            isSorted,
            loading,
            errorMessage,
            people,
            searchText,
            printJS,
            printAttendance,
            presentAttendance,
            filterPresentAttendance,
            absentAttendance,
            filterAbsentAttendance,
            toggle,
            op,
            Search,
            phoneNumber,
            noNumber
        }
    }
};
</script>

<style scoped>
* {
  color: #02172e;
  /* font-family: Nunito Sans !important; */
}

.hide {
  display: none !important;
}

@media screen and (max-width: 767px) {
  .main-th {
    display: none;
  }

  .hide {
    display: flex !important;
  }
}

.search-control {
  width: calc(100% - 30px);
  padding: 0.38rem;
  border: none;
  background: transparent;
  outline: transparent;
}

.search-span {
  background: #f5f8f9;
  border-radius: 200px;
  width: 100%;
}

.kiosk-mode {
  background: #dde2e6;
  border-radius: 20px;
  border: transparent;
}

.main-th {
  background: #f5f8f9;
}

.tb-row {
  border-bottom: 1px solid #4762f01f;
}

.over-con {
    box-shadow: 0 .5rem 1rem rgba(0,0,0,.05)!important;
}

.stats-box {
  border: 1px solid #4762f01f;
}

.kiosk-th-size {
    font-size: 20px;
}

.kiosk-tb-size {
    font-size: 18px;
}

.status-p {
    padding: 8px 20px;
    background: #a5682a69;
    border-radius: 22px 0 0 22px;
}

.attended {
  color: #28a745bf;
}
</style>