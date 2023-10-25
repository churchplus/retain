<template>
    <div class="container-fluid " >
        <div class=" row" >
            <div class="head-text"> Reports</div>
        </div>
        <div class="row mt-2" style=" background: #f5f8fa;">
            <div class="col-12 px-0 c-pointer" v-if="!financialAccount" :class="{ 'col-sm-6' : !canAccessFinancial, 'col-sm-4' : canAccessFinancial }" @click="togglePeople">
                <div class="p-3 header4"> Membership </div> 
                <div :class="{ 'baseline' : showPeople, 'hide-base' : !showPeople }"></div>
            </div>
            <div class="col-12 px-0 c-pointer" v-if="!financialAccount" :class="{ 'col-sm-6' : !canAccessFinancial, 'col-sm-4' : canAccessFinancial }" @click="togglePerformance">
                <div class="p-3 header4"> Attendance </div> 
                <div :class="{ 'baseline' : showPerformance, 'hide-base' : !showPerformance }"></div>
            </div>
            <div class="col-12  px-0 col-sm-4 c-pointer"  @click="toggleFinancial" v-if="canAccessFinancial || financialAccount">
                <div class="p-3 header4 "> Financial </div> 
                <div :class="{ 'baseline' : showFinancial, 'hide-base' : !showFinancial }"></div>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-12" v-if="showPeople">
                <People/>
            </div>
            <div class="col-12" v-if="showPerformance">
                <Performance/> 
            </div>
            <div class="col-12" v-if="showFinancial">
                <Financial/>
            </div>
            <div class="col-12" v-if="showMobile">
                <MobileUsage/>
            </div>
            <div class="col-12" v-if="showFollowup">
                <FollowUp/>
            </div>
            <div class="col-12" v-if="showOthers">
                <Others/>
            </div>
        </div>
    </div>
</template>

<script>

import { ref, computed } from "vue"
import People from "./Membershipreport/Index.vue"
import Performance from "./Performancereport/Index.vue"
import Financial from "./Financialreport/Index.vue"
import MobileUsage from "./Mobileusagereport/Index.vue"
import FollowUp from "./Followup/Index.vue"
import Others from "./Others/Index.vue"
// import { useRoute }  from "vue-router"
// import router from "@/router/index";
export default {
    components: {
        People,
        Performance,
        Financial,
        MobileUsage,
        FollowUp,
        Others
    },
    
    setup() {

        const roleOfCurrentUser = computed(() => {
        if (!localStorage.getItem('roles')) return []
        return JSON.parse(localStorage.getItem('roles'))
        })
       
       const canAccessFinancial = ref(roleOfCurrentUser.value.some(i => i.toLowerCase() == 'admin' || i.toLowerCase() == 'reports'))
       const financialAccount = ref(roleOfCurrentUser.value.length  == 1 && roleOfCurrentUser.value.some(i => i.toLowerCase() == 'financialaccount'))


        const showPeople = ref(!financialAccount.value ? true : false)
        const showPerformance = ref(false)
        const showFinancial = ref(financialAccount.value ? true : false)
        const showMobile = ref(false)
        const showFollowup = ref(false)
        const showOthers = ref(false)
        

        // const route = useRoute()
        const togglePeople = () => {
            showPeople.value = true
            showPerformance.value = false
            showFinancial.value = false
            showMobile.value = false
            showFollowup.value = false
            showOthers.value = false
        }
        const togglePerformance = () => {
            showPeople.value = false
            showPerformance.value = true
            showFinancial.value = false
            showMobile.value = false
            showFollowup.value = false
            showOthers.value = false
        }
        const toggleFinancial = () => {
            showPeople.value = false
            showPerformance.value = false
            showFinancial.value = true
            showMobile.value = false
            showFollowup.value = false
            showOthers.value = false
        }
        const toggleFollowup = () => {
            showPeople.value = false
            showPerformance.value = false
            showFinancial.value = false
            showMobile.value = false
            showFollowup.value = true
            showOthers.value = false
        }
        const toggleMobile = () => {
            showPeople.value = false
            showPerformance.value = false
            showFinancial.value = false
            showMobile.value = true
            showFollowup.value = false
            showOthers.value = false
        }
        const toggleOthers = () => {
            showPeople.value = false
            showPerformance.value = false
            showFinancial.value = false
            showMobile.value = false
            showFollowup.value = false
            showOthers.value = true
        }

       



        return{
            showPeople,
            showPerformance,
            showFinancial,
            showMobile,
            showFollowup,
            showOthers,
            togglePeople,
            togglePerformance,
            toggleFinancial,
            toggleFollowup,
            toggleMobile,
            toggleOthers,
            roleOfCurrentUser,
            canAccessFinancial,
            financialAccount
        }
    }
}
</script>

<style scoped>

.header4{
    font-size: 20px;
    font-weight: 700;
    color: #136acd;
}
.baseline {
    transition: all 150ms ease-in-out;
    background-color: #136acd;
    /* background-color: #33475b; */
    /* color: #136acd" */
    border-radius: 24px;
    bottom: -2.5px;
    height: 4px;
    left: 0px;
    /* width: 50%; */
    opacity: 1;
}

.hide-base {
    transition: all 150ms ease-in-out;
    background-color: #136acd;
    /* background-color: #33475b; */
    border-radius: 24px;
    bottom: -2.5px;
    height: 4px;
    left: 0px;
    /* width: 50%; */
    opacity: 0;
}
    /* @media screen and (max-width: 767px ){
        .baseline {
            width: 40%;
        }
        .hide-base {
            width: 40%;
        }
    }
    @media screen and (max-width: 575px ){
        .baseline {
            width: 20%;
        }
        .hide-base {
            width: 20%;
        }
    } */
</style>