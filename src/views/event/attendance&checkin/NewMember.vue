<template>
    <div>
        <div class="container main">
         <div class="row">
             <div class="col">
                <div class="row">
                        <div class="col-md-4 text-md-right">
                            <h4 class="header4 text-md-right">Surname</h4>
                        </div>
                        <div class="col-md-7 px-0">
                            <input type="text" class="form-control" v-model="personDetails.lastName">
                            <!-- <InputText type="text" style="border-radius:8px" class="w-100 rounded" v-model="value" required /> -->
                        </div>
                </div> 
                <div class="mt-4">
                </div> 
             <div class="row">
                <div class="col-md-4 text-md-right">
                    <h4 class="header4 text-md-right">Firstname</h4>
                 </div>
                 <div class="col-md-7 px-0">
                     <input type="text" class="form-control" v-model="personDetails.firstName">
                     <!-- <InputText type="text" class="w-100 rounded" v-model="value" required /> -->
                 </div>
            </div> 
            <div class="mt-4">
            </div> 
             <div class="row">
                <div class="col-md-4 text-md-right">
                    <h4 class="header4 text-md-right">Phone number</h4>
                 </div>
                 <div class="col-md-7 px-0">
                     <input type="text" class="form-control" v-model="personDetails.mobilePhone">
                     <!-- <InputText type="number" class="w-100 rounded" v-model="value" required /> -->
                 </div>
            </div> 
            <div class="mt-4">
            </div> 
             <div class="row">
                <div class="col-md-4 text-md-right">
                    <h4 class="header4 text-md-right">Email</h4>
                 </div>
                 <div class="col-md-7 px-0">
                     <input type="text" class="form-control"  v-model="personDetails.email">
                     <!-- <InputText type="email" class="w-100 rounded" v-model="value" required /> -->
                 </div>
            </div>
            <div class="mt-4">
            </div> 
             <div class="row">
                <div class="col-md-4 text-md-right">
                    <h4 class="header4 text-md-right"></h4>
                 </div>
                 <div class="col-md-7 px-0 d-flex justify-content-center">
                     <button class="default-btn mr-3" @click="onCancel">Cancel</button>
                     <Button label="Save"  class="p-button-primary p-button-rounded px-5 mr-3 max" @click="savePerson" />
                 </div>
            </div>
             </div>
             </div> 
        </div>

    </div>
</template>

<script>
// import InputText from 'primevue/inputtext';
import Button from 'primevue/button'
import { reactive } from 'vue'
import attendanceservice from '../../../services/attendance/attendanceservice';
import { useRoute } from "vue-router";
import { useToast } from 'primevue/usetoast';

    export default {
        components:{ Button },

        setup(props, { emit }) {
            const route = useRoute();
            const personDetails = reactive({ });
            const toast = useToast();

            const savePerson = async () => {
                console.log(personDetails.lastName, personDetails.firstName, "before");
                if (!personDetails.lastName && !personDetails.firstName) {
                    return false;
                } else {
                    emit("cancel");
                    try {
                        console.log({ person: personDetails, checkInAttendanceID: route.query.id, checkInChannel: 0 }, "body");
                        const response = await attendanceservice.checkin({ person: personDetails, checkInAttendanceID: route.query.id, checkInChannel: 0 });
                        toast.add({severity:'success', summary:'Check-in Successful', detail:'Member added and checked-in was successful', life: 3000});
                        console.log(response, "create person");
                        emit("refresh")
                    } catch (error) {
                        console.log(error);
                        toast.add({severity:'error', summary:'Check-in Failed', detail:'Member adding and checked-in was not successful', life: 3000});
                    }
                }
                console.log(personDetails.lastName, personDetails.firstName, "afetr");
                
            }

            const onCancel = () => emit("cancel")

            return {
                personDetails,
                savePerson,
                onCancel,
            }
        }
    }
</script>

<style scoped>
/* .main{
    margin-top: 300px;
    margin-bottom: 300px;
} */
/* .p-button-outlined{
    background-color:#fff9f9!Important;
    color: black!important;
    font: var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-bold) var(--unnamed-font-size-15)/20px var(--unnamed-font-family-nunito-sans)!important;
    letter-spacing: var(--unnamed-character-spacing-0)!important;
    font: normal normal bold 15px/20px Nunito Sans!important;
    letter-spacing: 0px!important;
   
} */
.max{
font: var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-bold) var(--unnamed-font-size-15)/20px var(--unnamed-font-family-nunito-sans)!important;
letter-spacing: var(--unnamed-character-spacing-0)!important;
font: normal normal bold 15px/20px Nunito Sans!important;
letter-spacing: 0px!important;
color: #FFFFFF!important;

}
.header4{
font: var(--unnamed-font-style-normal) normal normal 16px/22px var(--unnamed-font-family-nunito-sans);
letter-spacing: var(--unnamed-character-spacing-0);
text-align: left;
font: normal normal normal 16px/22px Nunito Sans;
letter-spacing: 0px;
color: #02172E;
opacity: 1;

}

</style>