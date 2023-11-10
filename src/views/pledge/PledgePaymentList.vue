<template>
    <div class="container-fluid">
        <div class="container-fluid">
          <div class="row  yu mt-5">
            <div class="col-md-6">
              <div class="events">Pledge Payment Form </div>
              <Toast />
              <ConfirmDialog />
              
            </div>
            <div class="col-md-6 d-flex head-button mt-2 my-1 link">
            </div>
            <div class="col-md-12 px-0">
              <hr class="hr my-3" />
            </div>
            
          </div>

          <div class="row table"  v-if=" allPledgePaymentList.length > 0 && !loading && !networkError">
            <div class="col-12 px-0" id="table">
              <div class="top-con" id="ignore2">
                <div class="table-top">
                  <div class="col-4">
                    <p @click="toggleSearch" class="search-text w-100 mt-2 d-flex justify-content-center">
                      <i class="pi pi-search"></i>SEARCH
                    </p>
                  </div>

                  <div class="search d-flex ml-2 mr-3"
                  >
                    <label
                      class="label-search d-flex"
                      :class="{
                        'show-search': searchIsVisible,
                        'hide-search': !searchIsVisible,
                      }"
                    >
                      <input
                        type="text"
                        placeholder="Search..."
                        v-model="searchText"
                      />
                      <span class="empty-btn"
                            @click="clearInput">
                            <i class="pi pi-times"></i
                    ></span>
                      <span class="search-btn"
                      @click="removeSearchText">
                        <i class="pi pi-search"></i>
                      </span>
                    </label>
                  </div>
                </div>
              </div>
              <div>
                <div class="container-fluid d-none d-md-block">
                  <div class="row t-header">
                  
                    <div
                      class="small-text text-capitalize col-md-2 font-weight-bold"
                    >
                      Date
                    </div>
                    <!-- <div
                      class="small-text text-capitalize col-md-2 font-weight-bold"
                    >
                      Number
                    </div> --> 
                    <div
                      class="small-text text-capitalize col-md-3 font-weight-bold"
                    >
                      Contact
                    </div>
                    <div
                      class="small-text text-capitalize col-md-3 font-weight-bold"
                    >
                      Pledge
                    </div>
                    <div
                      class="small-text text-capitalize col-md-3 font-weight-bold"
                    >
                      Amount
                    </div>
                    
                    <div
                      class="small-text text-capitalize col-md-1 font-weight-bold"
                    >
                      Action
                    </div>
                  </div>
                </div>

                <div class="row" style="margin: 0">

                  <div
                    class=" col-12 parent-desc pb-2 px-0">
                    <div class="row" v-if="loading">
                      <div class="col-md-12">
                        <div class="row">
                          <div
                            class="
                              col-md-12
                              d-flex
                              align-items-center
                              justify-content-center
                            "
                          >
                            <i
                              class="pi pi-spin pi-spinner py-4"
                              v-if="loading"
                            ></i>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-md-12 px-0">
                            <hr class="hr my-0" />
                          </div>
                        </div>
                      </div>
                    </div>

                


                    <div class="row w-100 c-pointer text-dark border-top py-2 hover d-flex align-items-center" style="margin: 0" v-for="(pledgePaymnetList, index) in searchPledgePayment" :key="index" >

                      <div class="col-md-2 desc" @click="pledgeClick(pledgePaymnetList.id)">
                        <p class="mb-0 d-flex justify-content-between text-primary">
                          <span
                            class=" text-dark font-weight-bold d-flex d-md-none fontIncrease"
                          style="font-size:15px">Date</span>
                            {{ date(pledgePaymnetList.date) }}
                        </p>
                      </div>
                      <!-- <div class="col-md-2 desc" @click="pledgeClick(pledgePaymnetList.id)">
                        <p class="mb-0 d-flex justify-content-between text-primary">
                          <span
                            class=" text-dark font-weight-bold d-flex d-md-none fontIncrease"
                          style="font-size:15px">Number</span>
                            {{ pledgePaymnetList.person.mobilePhone }}
                        </p>
                      </div> -->
                      <div class="col-md-3 desc" @click="pledgeClick(pledgePaymnetList.id)">
                        <p class="mb-0 d-flex justify-content-between text-primary">
                          <span
                            class=" text-dark font-weight-bold d-flex d-md-none fontIncrease"
                          style="font-size:15px">Contact</span>
                            {{ pledgePaymnetList.pledge.person.firstName }} {{ pledgePaymnetList.pledge.person.lastName }}
                        </p>
                      </div>
                      <div class="col-md-3 desc" @click="pledgeClick(pledgePaymnetList.id)">
                        <p class="mb-0 d-flex justify-content-between text-primary">
                          <span
                            class=" text-dark font-weight-bold d-flex d-md-none fontIncrease"
                          style="font-size:15px">Pledge </span>
                            {{ pledgePaymnetList.pledge.pledgeType.name }}
                        </p>
                      </div>
                      <div class="col-md-3" @click="pledgeClick(pledgePaymnetList.id)">
                        <div class="d-flex small justify-content-between text-primary">
                          <span class="text-dark font-weight-bold d-flex d-md-none fontIncrease" style="font-size:15px">Amount</span>
                            <div class="small-text text-right text-md-center">
                              NGN {{Math.abs(pledgePaymnetList.amount).toLocaleString()}}.00
                            </div>
                        </div>
                      </div>

                      <div class="col-md-1">
                        <div>
                          <div class="dropdown">
                            <span class="d-flex justify-content-between">
                              <span class="d-md-none d-sm-flex"></span>
                              <span class="d-sm-flex small">
                                <i
                                  class="
                                    fas
                                    fa-ellipsis-v
                                    cursor-pointer
                                    ml-2
                                    fontIncrease
                                  "
                                  id="dropdownMenuButton"
                                  data-toggle="dropdown"
                                  aria-haspopup="true"
                                  aria-expanded="false"
                                ></i>

                                <div
                                  class="dropdown-menu"
                                  aria-labelledby="dropdownMenuButton"
                                >
                                  <a
                                    class="dropdown-item"
                                    @click="showConfirmModal(pledgePaymnetList.id, index)"
                                    >Delete</a
                                  >
                                  <a
                                    class="dropdown-item"
                                    ><router-link
                                      :to="`/tenant/pledge/pledgepayment?id=${pledgePaymnetList.id}`"
                                      class="text-color"
                                      >Edit</router-link
                                    ></a
                                  >
                                </div>
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                  
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
          <div class="no-person" v-else-if="allPledgePaymentList.length === 0 && !loading && !networkError">
              <div class="empty-img">
                  <p><img src="../../assets/people/people-empty.svg" alt="" /></p>
                  <p class="tip">You haven't added any Payment yet</p>
                  <!-- <div class="c-pointer primary-bg col-sm-6 col-md-4 offset-sm-3 offset-md-4 default-btn border-0 text-white" @click="navigateToPledgePayment">Make a new Pledge </div> -->
              </div>
          </div>
    
          <div  class="adjust-network" v-else-if="networkError">
            <img src="../../assets/network-disconnected.png" >
            <div>Opps, Your internet connection was disrupted</div>
          </div>
        </div>
    </div>
</template>

<script>

import { ref, computed } from 'vue'
import finish from '../../services/progressbar/progress';
import MembersSearch from "../../components/membership/MembersSearch.vue";
import axios from "@/gateway/backendapi";
import Calendar from "primevue/calendar";
import Dropdown from "primevue/dropdown";
import { useToast } from "primevue/usetoast";
import { useRoute } from "vue-router";
import InputText from "primevue/inputtext";
import { useConfirm } from "primevue/useconfirm";
import monthDayYear from "../../services/dates/dateformatter";

export default {
  components:{
    Dropdown,
    Calendar,
    MembersSearch,
    InputText 
  },
    setup() {

      
        const networkError = ref(false);
        const toast = useToast()
        const startDate = ref("");
        const endDate = ref("");
        // const Address = ref('');
        const loading = ref(false)
        const searchText = ref('')
        const route = useRoute();
        const selectedPledge = ref('')
        const allPledgeType = ref([])
        const selectedPerson = ref('')
        const allPledgePaymentList = ref([]);
        // const singlePledge = ref([]);
        const confirm = useConfirm();


        const navigateToPledgePayment = () =>{
          router.push('/tenant/pledge/pledgepayment')
        }

        const searchPledgePayment = computed(() => {
          if (searchText.value !== "" && allPledgePaymentList.value.length > 0)  {
            return allPledgePaymentList.value.filter((i) => {
                  if (i.pledge.person.firstName || i.pledge.pledgeType.name ) return i.pledge.person.firstName.toLowerCase().includes(searchText.value.toLowerCase())
            })
          }  else {
            return allPledgePaymentList.value;
          }

          });

         const date = (offDate) => {
            return monthDayYear.monthDayYear(offDate);
          };
          const chooseContact = (payload) => {
            // contactRef.value.hide();
            selectedContact.value = payload

            // console.log(payload, 'my allll')
         }
        
        const searchIsVisible = ref(false);

            const toggleSearch = () => {
            searchIsVisible.value = !searchIsVisible.value;
          };

          const pledgeClick = (id) => {
              router.push(`/tenant/pledge/pledgepaymentlist/${id}`)
          }

        // const getAllPledges = async () =>{
        //         try{
        //             const res = await axios.get('/api/Pledge/GetAllPledges')
        //             finish()
        //             allPledgeList.value = res.data.returnObject
        //             allPledgeType.value = res.data.returnObject.map(i => ({
        //               name : i.pledgeType.name,
        //               id : i.pledgeType.id,
        //             })) 
        //             console.log(allPledgeList.value,'getPledgeList');
        //         }
        //         catch (error){
        //             console.log(error)
        //         }
        //     }
        //     getAllPledges()

            const getAllPledgePaymentList = async () => {
                loading.value = true
                  try{
                    const res = await axios.get('/api/Pledge/GetAllPledgePaymentsForTenant')
                    // const res = await axios.get(`/api/Pledge/GetAllPledgePayments?ID=${id}`)
                    finish()
                    allPledgePaymentList.value = res.data.returnObject
                    console.log(allPledgePaymentList.value,'getPledgepayment😁😁');
                    loading.value = false
                }
                catch (error){
                    console.log(error)
                    loading.value = false;

                    if(error.toString().toLowerCase().includes("network error")) {
                    networkError.value = true
                  } else {
                    networkError.value = false
                  }
                }
            }
            getAllPledgePaymentList()

            const deletePledgePayment = (id) => {

            axios
                .delete(`/api/Pledge/DeletePledge?ID=${id}`)
                // .delete(`/api/Pledge/DeletePledgeDefinition?ID=${id}`)
                .then((res) => {
                console.log(res);
                toast.add({
                    severity: "success",
                    summary: "Confirmed",
                    detail: "Pledge form deleted",
                    life: 3000,
                });

                allPledgePaymentList.value = allPledgePaymentList.value.filter( (paymentlist) => paymentlist.id !== id
          );

                })
                .catch((err) => {
                finish()
                if (err.response.status === 400) {
                    toast.add({
                    severity: "error",
                    summary: "Unable to delete",
                    detail: "Ensure this member is not in any group",
                    life: 3000,
                    });
                } else {
                    toast.add({
                    severity: "error",
                    summary: "Unable to delete",
                    detail: "An error occurred, please try again",
                    life: 3000,
                    });
                }
                });
            };
              const removeSearchText = () => {
                  searchText.value = "";
                }
              const clearInput = () => {
                  searchIsVisible.value = !searchIsVisible.value;
                }

            const showConfirmModal = (id, index) => {
                confirm.require({
                    message: "Are you sure you want to proceed?",
                    header: "Confirmation",
                    icon: "pi pi-exclamation-triangle",
                    acceptClass: "confirm-delete",
                    rejectClass: "cancel-delete",
                    accept: () => {
                    deletePledgePayment(id, index);
                    // toast.add({severity:'info', summary:'Confirmed', detail:'Member Deleted', life: 3000});
                    },
                    reject: () => {
                    toast.add({
                        severity: "info",
                        summary: "Rejected",
                        detail: "You have rejected",
                        life: 3000,
                    });
                    },
                });
            };

            return {
                allPledgePaymentList,
                navigateToPledgePayment,
                networkError,
                pledgeClick,
                clearInput,
                searchPledgePayment,
                toggleSearch,
                startDate,
                endDate,
                chooseContact,
                showConfirmModal,
                deletePledgePayment,
                // deletePledge,
                loading,
                searchText,
                searchIsVisible,
                selectedPledge,
                selectedPerson,
                removeSearchText,
                allPledgeType,
                date
                // singlePledge
            }
    },
}
</script>

<style scoped>

.no-person {
  height: 80vh;
  display: flex;
  text-align: center;
}

.empty-img {
  width: 85%;
  /* min-width: 397px; */
  margin: auto;
}

.empty-img img {
  width: 100%;
  max-width: 200px;
}

.events {
  font: normal normal 800 29px Nunito sans;
}
.dropdown-menu a {
  color: #02172e;
}
.link a {
  text-decoration: none;
}

.link a:hover {
  color: #fff;
}

.table {
  width: 100% !important;
  box-shadow: 0px 1px 3px #02172e45;
  border: 1px solid #dde2e6;
  border-radius: 15px;
  text-align: left;
  margin-bottom: auto !important;
}
.table-top {
  font-weight: 800;
  font-size: 12px;
  display: flex;
  justify-content: flex-end;
}
.table-top label:hover,
.table-top p:hover {
  cursor: pointer;
}

@media screen and (min-width: 500px) {
  .theader {
    width: 23%;
  }
  .table-body .check {
    width: 3%;
  }
  .action {
    width: 5%;
  }
}

@media screen and (max-width: 1024px) {
  .my-con {
    flex-direction: column;
  }
  .table {
    width: 98%;
    margin: 24px auto;
  }
  .summary {
    width: 98%;
    margin: auto;
  }
}

.table-footer {
  display: flex;
  justify-content: flex-end;
  background: #fff;
  padding: 10px 0;
  border-radius: 0px 0px 22px 22px;
}

.table-header {
  padding: 12px;
  color: black;
  box-shadow: none;
  font-size: 11px;
  font-weight: 700;
}
.table-body {
  padding: 12px;
  border-bottom: 1.5px solid #6d6d6d19;
}

.t-header {
  background: #dde2e6 0% 0% no-repeat padding-box;
  font-size: 16px;
  padding: 0.5rem 0;
}
.hover:hover {
  background: #eee;
}

.parent-desc.first {
  color: #8898aa;
  font-size: 14px;
  font-weight: 600;
  box-shadow: 0px 3px 6px #2c28281c;
  background: #dde2e6 0% 0% no-repeat padding-box;
}
.desc-head {
  font-weight: 700;
}
.desc {
  color: #9b9a9c;
}
.default-bt {
  font-weight: 600;
  white-space: initial;
  font-size: 1rem;
  border-radius: 0.5rem;
  border: 1px solid #999fa5;
  padding: 0.5rem 1.25rem;
  width: auto;
  /* border: none; */
  /* outline: transparent !important; */
  max-height: 40px;
  background: #ffffff47 !important;
  min-width: 121px;
}
.head-button {
  display: flex;
  justify-content: flex-end;
}

@media (max-width: 577px) {
  .head-button {
    flex-direction: column;
    align-items: center;
  }
}
@media (max-width: 767px) {

  .head-button {
    display: flex;
    justify-content: center
  }
 }

 @media (max-width: 575px) {
  .head-button {
    display: flex;
    justify-content: center;
  }
}
</style>