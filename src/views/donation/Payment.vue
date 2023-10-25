<template>
<div class="container-top" :class="{ 'container-slim': lgAndUp || xlAndUp }">
      <div class="row my-3">
      <div class="col-md-4 first-timers-text">
        <h2 class="head-text">Payment Forms</h2>
      </div>

      <div class="col-md-8 d-flex head-button">
        <!-- <router-link to="/tenant/offeringcategory"> -->
          <button class="more-btn h-100 button align-items-center default-btn border-0" v-if="false">
            More
            <span><i class="pi pi-angle-down btn-icon"></i></span>
          </button>
        <!-- </router-link> -->
        <router-link to="/tenant/payments" class="text-decoration-none ml-3">
           <el-button :color="primarycolor" class="ml-2 header-btn" round>Add Payment Form</el-button>
        </router-link>
      </div>
    </div>

    <div class="row">
        <div class="col-md-12">
            <hr class="hr" />
        </div>
      </div>
    <el-skeleton class="w-100" animated v-if="loading ">
      <template #template>
        <div style="display: flex;
                align-items: center;
                justify-content: space-between;
                margin-top: 20px
              ">
          <el-skeleton-item variant="text" style="width: 240px; height: 240px" />
          <el-skeleton-item variant="text" style="width: 240px; height: 240px" />
        </div>
        <el-skeleton class="w-100 mt-5" style="height: 25px" :rows="20" animated />
      </template>
    </el-skeleton>

    <div v-if="paymentList.length > 0 && !loading && !networkError">
        <PaymentList :paymentList="paymentList" @delete-payment="deletePayment"/>
    </div>
    <div class="no-person" v-else-if="paymentList.length === 0 && !loading && !networkError">
        <div class="empty-img">
            <p><img src="../../assets/people/people-empty.svg" alt="" /></p>
            <p class="tip">You haven't added any payment forms yet</p>
        </div>
    </div>
    <div v-else-if="networkError" class="adjust-network">
      <img src="../../assets/network-disconnected.png" >
      <div>Opps, Your internet connection was disrupted</div>
    </div>
</div>

</template>

<script>
import { ref, inject, onMounted } from 'vue'
// import { useStore } from 'vuex'
import store from "../../store/store"
// import axios from "@/gateway/backendapi"
import deviceBreakpoint from "../../mixins/deviceBreakpoint";
import PaymentList from './PaymentList'
// import Loader from '../accounting/offering/SkeletonLoader'
export default {
    components: {
         PaymentList
    },
    setup () {
        const paymentList = ref(store.getters["payment/getpayments"]);
        const loading = ref(false)
        const networkError = ref(false)
        const primarycolor = inject('primarycolor')
        const { lgAndUp, xlAndUp } = deviceBreakpoint()


        const getPaymentList = async () => {
              try {
                loading.value = true
                      store.dispatch('payment/getPayments').then(response => {
                      paymentList.value = response
                      console.log(paymentList.value, "kljk");
                      loading.value = false
                })
              } catch (error) {
                console.log(error);
                 loading.value = false
                        if(error.toString().toLowerCase().includes("network error")) {
                          networkError.value = true
                        } else {
                          networkError.value = false
                        }
              }
            // let store = useStore()
            // console.log(store.getters['contributions/paymentList'])
            // if (store.getters['contributions/paymentList'].length > 0) {
            //     paymentList.value = store.getters['contributions/paymentList']
            // } else {
                // axios
                //     .get("/api/PaymentForm/GetAll")
                    // .then((res) => {
                    //     loading.value = false
                    // paymentList.value = res.data;
                    // console.log(res.data);
                    // })
            // }
    
    // get from  to store
    
    // savev to sstore
    // store.dispatch('contributions/contributionList')
    };

    const deletePayment = (payload) => {
      paymentList.value = paymentList.value.filter(
                  (item) => item.id !== payload
                );
    }
    onMounted(() => {
      if (paymentList.value && paymentList.value.length == 0)
       getPaymentList()
    });
        return  {
            paymentList, loading, deletePayment, networkError, primarycolor, lgAndUp, xlAndUp
        }
    }
}
</script>

<style scoped>
.page-header {
    font: normal normal 800 29px Nunito sans;
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

  .add-btn {
    margin-top: 10px
  } 
}

@media (max-width: 575px) {
  .head-button {
    display: flex;
    justify-content: center;
  }
}

@media (max-width: 767px) {
   .first-timers-text {
    text-align: center;
  }
  .head-button {
    display: flex;
    justify-content: center
  }
 }

 /* .add-btn {
  width: 180px;
  background: #136acd;
  border-radius: 22px;
  color: #ffffff;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 42px;
  text-decoration: none;
} */

.add-person-btn {
  background: #136acd;
  color: #fff;
}


 .more-btn {
  background: #dde2e6;
  width: 160px
}

.no-person {
  height: 80vh;
  display: flex;
  text-align: center;
}

.empty-img {
  width: 30%;
  min-width: 397px;
  margin: auto;
}

.empty-img img {
  width: 100%;
  max-width: 200px;
}
.btn-icon {
  padding: 0 8px;
}

.no-underline {
  text-decoration: none
}
</style>