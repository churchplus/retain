<template>
    <div class="container">
        <div class="row my-5">
            <div class="col-md-12">
                <h4 class="font-weight-bold">USSD</h4>
                <p class="small-text">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua</p>
            </div>
        </div>

        <div class="row">
            <div class="col-md-12">
                <div class="row">
                    <div class="col-md-12 col-lg-8 offset-lg-2">
                        <div class="row">
                            <div class="col-md-3 image-box px-0 d-none d-md-block">
                                <img src="../../../assets/attendance/attendance-ussd.svg" class="mobile-img" alt="">
                            </div>
                            <div class="col-md-9 px-0 d-flex align-items-center ml-md-n5">
                                <div class="card border-0 w-100">
                                    <div class="card-body shadow-lg border-0 pl-5 text-center">
                                        <p class="my-3 text-color">Dial <span class="font-weight-700 text-color">{{ ussd }} </span> to mark attendance</p>
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
import attendanceservice from '../../../services/attendance/attendanceservice';
import { useRoute } from "vue-router";
import { computed, ref } from 'vue';

    export default {
        setup() {
            const store = useStore();
            const route = useRoute();

            const attendanceData = ref(store.getters["attendance/attendanceItemData"]);
            const ussd = computed(() => attendanceData.value && attendanceData.value.ussdCode ? attendanceData.value.ussdCode : "")

            const getDetails = async () => {
                try {
                    const response = await attendanceservice.getItemByCode(route.query.id);
                    console.log(response, "Item details");
                    attendanceData.value = response;
                } catch (error) {
                    console.log(error);
                }
            }

            if (!attendanceData.value || !attendanceData.value.ussdCode) getDetails();

            return {
                ussd,
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