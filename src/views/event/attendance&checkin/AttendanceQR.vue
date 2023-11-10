<template>
  <div class="container">
    <div class="row">
      <div
        class="col-lg-8 offset-lg-2 d-flex align-items-center shadow-lg"
      >
        <!-- style="height: calc(100vh - 65px)" -->
        <div class="row print-area" ref="qrCodeArea" id="section-to-print ">
            <div class="col-md-12 text-center mt-3 mb-n4 mb-md-n5" style="z-index: 1">
                <h5 class="text-capitalize font-weight-700">{{ churchName.toString() }}</h5>
                <h4 class="text-capitalize font-weight-bold">{{ eventName }}</h4>
            </div>
          <div class="col-md-12">
            <div class="img-wrapper w-100 ml-auto">
              <img
                v-if="qrCode"
                :src="qrCode"
                alt=""
                class="image-wrapper w-100"
              />
              
            </div>
          </div>
          <div v-if="loading" class="col-md-12 py-5 text-center d-flex justify-content-center w-100">
            <span>Loading</span>
          </div>

          <div class="col-10 col-md-10 text-right mb-4 mt-n4 mt-md-n5" v-if="qrCode">
              <a class="primary-text font-weight-bold c-pointer text-decoration-none no-print" id="no-print" @click="print">Print</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import attendanceservice from "../../../services/attendance/attendanceservice";
import { computed, ref } from "vue";import membershipService from '../../../services/membership/membershipservice';

export default {
  setup() {
    const store = useStore();
    const route = useRoute();
    const loading = ref(false);

    const attendanceData = ref(store.getters["attendance/attendanceItemData"]);
    const user = ref(store.getters.currentUser);
    const qrCode = computed(() =>
      attendanceData.value && attendanceData.value.qrCode
        ? attendanceData.value.qrCode
        : ""
    );
    const eventName = computed(() => {
    //   attendanceData.value && attendanceData.value.fullEventName
    //     ? attendanceData.value.fullEventName
    //     : ""
            if (!attendanceData.value || !attendanceData.value.fullEventName) return "";
            let capitalized = "";
            const wordsInName = attendanceData.value.fullEventName.split(" ");
            for (let word of wordsInName) {
                capitalized += ` ${word.charAt(0)}${word.slice(1).toLowerCase()}`
            }
            return capitalized;
        }
    );

    const getUser = async () => {
        try {
            const response = await membershipService.getSignedInUser();
            user.value = response;
        } catch (error) {
            console.log(error);
        }
    }

    if (!user.value || !user.value.churchName) {
        getUser();
    }

    const churchName = computed(() => {
        if (!user.value || !user.value.churchName) return "";
        let capitalized = "";
        const wordsInName = user.value.churchName.split(" ");
        for (let word of wordsInName) {
            capitalized += ` ${word.charAt(0)}${word.slice(1).toLowerCase()}`
        }
        return capitalized;
    })

    const getAttendanceByCode = async () => {
      try {
        loading.value = true;
        const response = await attendanceservice.getItemByCode(route.query.id);
        loading.value = false;
        attendanceData.value = response;
      } catch (error) {
        loading.value = false;
        console.log(error);
      }
    };

    if (!attendanceData.value || !attendanceData.value.qrCode)
      getAttendanceByCode();

    const qrCodeArea = ref(null);
    const print = () => {
        window.print();
    }

    return {
      qrCode,
      eventName,

      churchName,
      print,
      qrCodeArea,
      loading,
    };
  },
};
</script>

<style>
    @media print {
        body * {
            visibility: hidden !important;
        }
        #section-to-print, #section-to-print * {
            visibility: visible !important;
            display: block !important;
        }
        #section-to-print {
            position: fixed !important;
            left: 0 !important;
            top: 0 !important;
        }
        #section-to-print, #section-to-print .no-print {
          visibility: hidden !important;
        }
        #section-to-print, #section-to-print #no-print {
          visibility: hidden !important;
        }
        .print-area, .print-area * {
            visibility: visible !important;
            display: block !important;
        }
        .print-area, .print-area #no-print {
        visibility: hidden !important;
      }
    }
</style>