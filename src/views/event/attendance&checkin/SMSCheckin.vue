<template>
    <div class="container">
        <div class="row my-5">
            <div class="col-md-12">
                <h4 class="font-weight-bold">SMS</h4>
                <p class="small-tex">Members Check-in using mobile phones by sending the code specified below to the phone number also specified below</p>
            </div>
        </div>

        <div class="row">
            <div class="col-md-12">
                <div class="row">
                    <div class="ccol-md-12 col-lg-8 offset-lg-2">
                        <div class="row">
                            <div class="col-md-3 image-box px-0 d-none d-md-block">
                                <img src="../../../assets/attendance/attendance-sms.svg" class="mobile-img" alt="">
                            </div>
                            <div class="col-md-8 px-0 d-flex align-items-center ml-n5">
                                <div class="card border-0 w-100">
                                    <div class="card-body shadow-lg border-0 pl-5 text-center">
                                        <p class="my-3 text-color">Send <span class="font-weight-700 text-color">{{ code }}</span> to   08085538320</p> 
                                        <!-- 08089622349 -->
                                        <!-- <p class="my-3 text-color">Send <span class="font-weight-700 text-color">{{ code }}</span> to {{ smsNumber }}</p> -->
                                    </div>
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
    import { useStore } from "vuex";
    import { useRoute } from "vue-router"
import attendanceservice from '../../../services/attendance/attendanceservice';
import { computed, ref } from 'vue';
    export default {
        setup() {
            const store = useStore();
            const route = useRoute();

            const attendanceData = ref(store.getters["attendance/attendanceItemData"]);
            // const smsNumber = attendanceData ? attendanceData.smsNumber : "";
            // const code = attendanceData ? attendanceData.attendanceCode : "";

            const code = computed(() => attendanceData.value && attendanceData.value.attendanceCode ? attendanceData.value.attendanceCode : "")
            const smsNumber = computed(() => attendanceData.value && attendanceData.value.attendanceCode ? attendanceData.value.smsNumber : "")

            const getDetails = async () => {
                try {
                    const response = await attendanceservice.getItemByCode(route.query.id);
                    console.log(response, "Item details");
                    attendanceData.value = response;
                } catch (error) {
                    console.log(error);
                }
            }

            if (!attendanceData.value || !attendanceData.value.smsNumber) getDetails();

            return {
                smsNumber,
                code,
            }
        }
    }
</script>

<style scoped>
 * {
    color: #02172E;
    font-family: Nunito Sans !important;
 }

 .image-box {
     z-index: 100;
     
 }

 .mobile-img {
    width: 100%;
    height: 173px;
    width: 173px;
 }

 .text-color {
    color: #0F529F;
    font-size: 22px;
 }
</style>