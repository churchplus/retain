<template>
    <div class="container-fluid px-0 ">
        <div class=" row" >
            <div class="head-text">Branch Reports</div>
        </div>
        <div class="row" style=" background: #f5f8fa;">
            <div class="col-12 col-sm-4 px-0 c-pointer " @click="toggleMember">
                <div class="p-3 header4"> Membership </div> 
                <div :class="{ 'baseline' : showMember, 'hide-base' : !showMember }"></div>
            </div>
            <div class="col-12 col-sm-4 px-0 c-pointer" @click="toggleService">
                <div class="p-3 header4">Church Activities</div> 
                <div :class="{ 'baseline' : showService, 'hide-base' : !showService }"></div>
            </div>
            <div class="col-12 col-sm-4 px-0 c-pointer" @click="toggleFinancial">
                <div class="p-3 header4">Financial</div> 
                <div :class="{ 'baseline' : showFinancial, 'hide-base' : !showFinancial }"></div>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-12 p-0" v-if="showMember">
                <Member/>
            </div>
            <div class="col-12 p-0" v-if="showService">
                <Service/> 
            </div>
            <div class="col-12 p-0" v-if="showFinancial">
                <Financial/> 
            </div>
        </div>
    </div>
</template>

<script>

import { ref } from "vue"
import Member from "./MembershipReport.vue"
import Service from "./ServiceReport.vue"
import Financial from "./financialReport/index.vue"

export default {
    components: {
        Member,
        Service,
        Financial
    },
    
    setup() {
        const showMember = ref(true)
        const showService = ref(false)
        const showFinancial = ref(false)
     

        // const route = useRoute()
        const toggleMember = () => {
            showMember.value = true
            showService.value = false
            showFinancial.value = false
        }
        const toggleService = () => {
            showMember.value = false
            showService.value = true
            showFinancial.value = false
        }
        const toggleFinancial = () => {
            showMember.value = false
            showService.value = false
            showFinancial.value = true
        }
       
       



        return{
            showMember,
            showService,
            showFinancial,
            toggleMember,
            toggleService,
            toggleFinancial
           
            // route
        }
    }
}
</script>


<style scoped>
.page-header {
    font: normal normal 800 29px Nunito sans;
}

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