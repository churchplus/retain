<template>
    <div class="container  container-top container-wide ">
        <div class="row d-flex justify-content-between px-3">
                <div class="heading-text"> Pledge Making </div>
                <!-- <div><ToggleButton @is-active="isActive" :active="isActive" /></div> -->
        </div>
        <div class="container border rounder  sub-con ">
            <div class="row">
                <div class="col-md-12 border-bottom mt-4 " >
                     <div class="row my-1 mt-3 d-flex justify-content-center ">
                        <div class="col-md-7  ">
                            <div class="row ">
                                <div class="col-md-4 text-md-right align-self-center">
                                    <label for="" class=""> Person <sup class="text-danger">*</sup> </label>
                                </div>
                                <div class="col-md-8">
                                    <input type="text" v-model="memberName" :disabled="checking" class="form-control w-100" />
                                    <!-- <MembersSearch @memberdetail="chooseContact" />
                                     -->
                                    <!-- <Dropdown v-model="selectMember" class="w-100 font-weight-normal" :options="MembersType"  optionLabel="name" placeholder="Select Member" /> -->
                                </div>
                            </div>
                        </div>
                    </div>
                     <div class="row my-1 mt-3 d-flex justify-content-center">
                        <div class="col-md-7  ">
                            <div class="row">
                                <div class="col-md-4 text-md-right align-self-center">
                                    <label for="" class="">Pledge Type <sup class="text-danger">*</sup> </label>
                                </div>
                                <!-- <div>{{allPledgeList}}</div> -->
                                <div class="col-md-8">
                                    <Dropdown v-model="selectedPledge" class="w-100 font-weight-normal" :disabled="checking" :options="allPledgeList"  optionLabel="name" placeholder="Select Pledge" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row my-1 mt-3 d-flex justify-content-center">
                        <div class="col-md-7  " v-if="selectedPledge.donorPaymentType == 0 " >
                            <div class="row">
                                <div class="col-md-4 text-md-right align-self-center">
                                    <label for="" class=""> Pledge Amount </label>
                                </div>
                        
                                <div class="col-md-8">
                                    <input type="text" v-model="freewillAmount" class="form-control" />
                                </div>
                            </div>
                        </div>
                    </div>  
                    <div class="row my-1 mt-2 d-flex justify-content-center">
                        <div class="col-md-7  " v-if="selectedPledge.donorPaymentType == 1 ">
                            <div class="row">
                                <div class="col-md-4 text-md-right align-self-center">
                                    <label for="" class=""> Pledge Amount </label>
                                </div>
                        
                                <div class="col-md-8">
                                    <input type="text" v-model="selectedPledge.donorPaymentSpecificAmount" :disabled="checking" class="form-control" />
                                </div>
                            </div>
                        </div>
                    </div>  
                    <div class="row my-1 mt-2 d-flex justify-content-center  ">
                         <div class="col-md-7 " v-if="selectedPledge.donorPaymentType == 2 "  >
                            <div class="row">
                                <div class="col-12 col-md-4 col-lg-4 text-sm-left text-lg-right align-self-center">
                                    <label for="" class="">Pledge Amount </label>
                                </div>
                                <div class="d-flex flex-wrap col-12  col-md-8 ">
                                    <div class=" col-sm-6 ">
                                        <div class="font-weight-bold" > <span>From:</span>  {{Math.abs(selectedPledge.donorPaymentRangeFromAmount).toLocaleString()}}.00 </div>
                                    <!-- <input type="text" v-model="selectedPledge.donorPaymentRangeFromAmount" class="form-control" :disabled="checking" placeholder="From" /> -->
                                    </div>
                                    <div class="col-12  col-sm-6   ">
                                        <div class="font-weight-bold  " ><span>To:</span> {{Math.abs(selectedPledge.donorPaymentRangeToAmount).toLocaleString()}}.00 </div>
                                    </div>

                                </div>
                                
                                <!-- <div class="col-12 d-flex justify-content-end mt-3 ">
                                    <div class="col-12 col-sm-12  col-lg-8  ">
                                        <input type="text" v-model="amountInRange" class="form-control" placeholder="Enter Amount" />
                                    </div>
                                </div> -->
                                
                            </div>
                        </div>
                    </div>  
                    <!-- <div class="row w-100" v-if="eventRegLink"> -->
             
                </div>

                    <!-- <div class="container mt-4">
                         <div class="row d-flex justify-content-center" >
                            <div
                                class="col-md-10 col-sm-11  col-lg-8  border rounded"
                            >
                                <div class="row">
                                <div class="col-md-2 col-sm-2 d-flex align-self-center image mt-3">
                                    <img
                                    src="../../assets/link.svg" class="w-100"
                                    alt="marked Attendance image"
                                    style="width: 60px; height: 60px"
                                    />
                                </div>
                                <div class="col-md-10 col-sm-10 mt-3">
                                    <a class="text-decoration-none"
                                    ><h4 class="header4 link-color c-pointer" @click="copyRegLink">Online Payment Link</h4></a
                                    >                                
                                    <p class="para">
                                    <span class="d-flex align-items-center"
                                        ><input
                                        type="text"
                                        ref="selectedLink"
                                        v-model="pledgePaymentLink"
                                        class="form-control"
                                        placeholder="Link"
                                        style="width: 95%" />
                                        <i
                                        class="pi pi-copy ml-2 c-pointer"
                                        @click="copyLink"
                                        style="font-size: 22px"
                                        ></i>
                                        <span class="font-weight-bold small ml-1 c-pointer" style="width: 20%">Send Email</span>
                                        <span class="font-weight-bold small c-pointer" style="width: 20%">Send Sms</span>
                                    </span>
                                    </p>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="container ">
                        <div class="row  mt-3 d-flex justify-content-center">
                            <div
                                class="col-md-10  col-sm-11  col-lg-8  border rounded"
                            >
                                <div class="row">
                                <div class="col-md-2 col-sm-2 d-flex justify-content-center image mt-3">
                                    <img
                                    src="../../assets/link.svg" 
                                    alt="marked Attendance image"
                                    style="width: 60px; height: 60px"
                                    />
                                </div>
                                <div class="col-md-10 col-sm-10 mt-3">
                                    <a class="text-decoration-none"
                                    ><h4 class="header4 link-color c-pointer" @click="copyLink">Virtual payment Link</h4></a
                                    >
                                    <p class="para">
                                    <span class="d-flex align-items-center"
                                        ><input
                                        type="text"
                                        ref="checkinLink"
                                        @click="copyLink"
                                        class="form-control"
                                        style="width: 95%" />
                                        <i
                                        class="pi pi-copy ml-2 c-pointer"
                                        @click="copyLink"
                                        style="font-size: 22px"
                                        ></i>
                                        <span class="font-weight-bold small ml-1 c-pointer" style="width: 20%" >Send Email</span>
                                        <span class="font-weight-bold small c-pointer" style="width: 20%" >Send Sms</span>
                                    </span>
                                    </p>
                                </div>
                                </div>
                            </div>
                        </div>   
                    </div>       -->

                    <div class="col-md-12  mt-4">
                        <div class="row  ">
                            <div class=" col-md-12 d-flex justify-content-center mb-2  ">
                                <button class="default-btn primary-bg border-0 text-white" type="button" data-toggle="modal" data-target="#exampleModalCente" data-dismiss="modal" @click="makePayment">
                                    <i class="pi pi-spin pi-spinner"  v-if="loading"></i> Make Payment
                                </button>
                            </div>
                        </div>
                    </div>
                
            </div>
        </div>
    </div>
    <Toast />
</template>

<script>
import axios from "@/gateway/backendapi";
import { ref, computed } from "vue";
import Dropdown from "primevue/dropdown";
import InputText from "primevue/inputtext";
import { useToast } from "primevue/usetoast";
import MembersSearch from "../../components/membership/MembersSearch.vue"
import router from '../../router';
import { useRoute } from "vue-router"
import finish from '../../services/progressbar/progress';
// import store from "../../store/store";
import CascadeSelect from 'primevue/cascadeselect';
import ToggleButton from '../donation/toggleButton.vue'
export default {
    components: {
        MembersSearch,
        Dropdown,
        InputText,
        CascadeSelect,
        ToggleButton
    },
    setup() {
        const toast = useToast()
        const selectedLink = ref(null)
        const tenantID = ref('')
        const route = useRoute();
        const churchName = ref('');
        const Address = ref('');
        const loading = ref(false)
        const freewillAmount = ref('');
        const checking = ref(false);
        const value = ref()
        const isNameValid = ref(true)
        const isEmailValid = ref(true)
        const selectedPledge = ref('')
        const memberName = ref('')
        const allPledgeList = ref([]);
        const amountFrom = ref('')
        const selectedContact = ref({})
        const isActive = ref(null)
        const amountTo = ref('')
        const pledgeCategory = ref(
            [
                {name: 'Free will'},
                {name: 'Specific'},
                {name: 'Range'}
            ]
        )

        
        // const savePledge = async () => {

        // }

        const makePayment = () =>{
            // router.push('/pledge/pledgepayment')
            router.push(`/pledge/publicpledgepayment?pledgeTypeID=${route.query.pledgeTypeID}&id=${route.query.id}&name=${route.query.name}`)
        }

         const chooseContact = (payload) => {
            // contactRef.value.hide();
            selectedContact.value = payload

            // console.log(payload, 'my allll')
         }

         const pledgePaymentLink = computed(() => {
                if (!route.query.id) return ""
                return `${window.location.origin}/pledge/publicpledgepayment?pledgeTypeID=${route.query.pledgeTypeID}&id=${route.query.id}&name=${route.query.name}`
        })

        const copyLink = () => {
            console.log(selectedLink.value.value, "jkjjhkj");
                selectedLink.value.setSelectionRange(0, selectedLink.value.value.length); /* For mobile devices */
                selectedLink.value.select();

                /* Copy the text inside the text field */
                document.execCommand("copy");
            toast.add({
                    severity: "info",
                    summary: "Link Copied",
                    detail: "copied to your clipboard",
                    life: 3000,
                });
            }

        const getCurrentlySignedInUser = async () => {
            try {
                const res = await axios.get("/api/Membership/GetCurrentSignedInUser");
                tenantID.value = res.data.tenantId
            } catch (err) {
                console.log(err);
            }
            };

        getCurrentlySignedInUser();
        

        const active = (payload) => {
            isActive.value = payload
        }
        const getAllPledgeDefinition = async () =>{
                try{
                    checking.value = false;
                    const res = await axios.get('/api/Pledge/GetAllPledgeDefinitions')
                    finish()
                    allPledgeList.value = res.data.returnObject

                    getDetails()
                    
                    isActive.value = res.data.returnObject.map( i => {
                        return {
                            isActive : i.isActive
                        }
                    })
                    console.log(allPledgeList.value,'getPledgeList');
                    checking.value = true;
                    
                }
                catch (error){
                    console.log(error)
                }
            }
            getAllPledgeDefinition()

            const getDetails = () =>{
            selectedPledge.value = allPledgeList.value.find(i => i.id === route.query.id)
            memberName.value = route.query.name

                }
            

            const makePledge = async () =>{

                 const makePledgeDetails = {
                    personID: selectedContact.value.id,
                    pledgeTypeID: selectedPledge.value.id,
                    amountBase: selectedPledge.value.donorPaymentRangeFromAmount,
                    amountTop: selectedPledge.value.donorPaymentRangeToAmount,
                    amountBase: selectedPledge.donorPaymentSpecificAmount,
                    amountBase:  freewillAmount.value                  
                }

                try{
                    const res = await axios.post('api/Pledge/SavePledge', makePledgeDetails)
                    finish()
                    console.log(res,'getSinglePledge');
                    router.push(`/pledge/publicpledgepayment?ID=${route.query.id}&name=${route.query.name}`)
                    
                }
                catch (error){
                    console.log(error)
                }
            }

        // const getSinglePledgeDefinition = async () =>{
        //         try{
        //             const res = await axios.get(`/api/Pledge/GetSinglePledgeDefinitions?ID${allPledgeList.value.id}`)
        //             finish()
        //             console.log(res,'getSinglePledge');
        //         }
        //         catch (error){
        //             console.log(error)
        //         }
        //     }
        //     getSinglePledgeDefinition()


        

        const checkNameValue = () => {
            if(churchName.value.length == 0) {
                isNameValid.value = false
            }   else {
                isNameValid.value = true
            }
        }
        
        const checkEmailValue = () => {
            if(pastorEmail.value.length == 0) {
                isEmailValid.value = false
            }   else {
                isEmailValid.value = true
            }
        }

        return {
            allPledgeList,
            memberName,
            tenantID,
            checking,
            makePledge,
            chooseContact,
            selectedPledge,
            makePayment,
            pledgeCategory,
            amountTo,
            amountFrom,
            freewillAmount,
            pledgePaymentLink,
            // savePledge,
            checkEmailValue,
            churchName,
            selectedContact,
            Address,
            value,
            loading,
            checkNameValue,
            isNameValid,
            isEmailValid,
            selectedLink,
            isActive,
            active,
            copyLink
        }
    },
}
</script>

<style scoped>
       .heading-text {
        font: normal normal 800 1.5rem Nunito sans;
}

.header4 {
  font: var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-bold)
    18px/24px var(--unnamed-font-family-nunito-sans);
  letter-spacing: var(--unnamed-character-spacing-0);
  text-align: left;
  font: normal normal bold 18px/24px Nunito Sans;
  letter-spacing: 0px;
  color: #02172e;
  opacity: 0.8;
}

</style>