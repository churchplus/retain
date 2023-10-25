<template>
  <div
    class="spinner-border"
    style="width: 4rem; height: 4rem"
    role="status"
    v-if="loading"
  >
    <span class="sr-only">Loading...</span>
  </div>
  <div class="container border borderline pt-3 pb-2">
    <div class="row">
      <div class="container">
        <div class="row my-5 d-flex align-items-center">
          <div class="col-md-4 pl-3">
            <p class="search-span px-2">
              <input
                type="text"
                class="search-control"
                placeholder="Search Transactions"
                v-model="userInputs"
              />
              <i class="pi pi-search p-2" style="height: 30px; width: 30px"></i>
            </p>
          </div>

          <div class="col-md-3 col-6 offset-md-4">
            <!-- Example split danger button -->
            <!-- <div class="btn-group">
              <button type="button" class="btn htext2">{{ name }}</button>
              <button
                type="button"
                class="btn dropdown-toggle dropdown-toggle-split"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span class="sr-only">Toggle Dropdown</span>
              </button>
              <div class="dropdown-menu">
                <a class="dropdown-item" href="#">Settings</a>
                <a class="dropdown-item" href="#">Log Out</a>
              </div>
            </div> -->
          </div>
  
          <div class="col-md-1 col-2">
            <i
              @click="printJS({ 
                  ignoreElements: ['ignore1', 'ignore2'], 
                  maxWidth: 867, 
                  header: 'YOUR TRANSACTIONS', 
                  printable: printTransactions, 
                  properties: ['MEMO', 'DATE','PAYMENTGATEWAY', 'AMOUNT'], 
                  type: 'json', 
                  headerStyle: 'font-family: Nunito Sans, Calibri; text-align: center;', 
                  gridHeaderStyle: 'border: 1.5px solid #6d6d6d19; font-family: Nunito Sans, calibri; padding: 7px; text-align: left;', 
                  gridStyle: 'border: 1.5px solid #6d6d6d19; font-family: Nunito Sans, calibri; padding: 7px; font-weight: 300' })"
              class="pi pi-download bell-shadow bell p-3 d-flex justify-content-center align-items-center"
            ></i>
          </div>
        </div>

        <div class="row d-flex justify-content-center align-items-centergit">
          <div class="col-md-5 px-4">
            <p class="htext">Your Transactions</p>
          </div>

          <div class="col-md-3 col-4">
            <input
              type="date"
              class="form-control fone p-3 border-0 date-area w-100"
              v-model="startDate"
            />
          </div>
          <div class="col-md-3 col-4">
            <input
              type="date"
              class="form-control fone p-3 border-0 date-area w-100"
              v-model="endDate"
            />
          </div>
          <!-- end of date area -->
          <!-- </div> -->

          <div class="col-md-1 col-2" @click="searchRange">
            <i
              class="pi pi-search p-3 bell-shadow bell d-flex justify-content-center align-items-center"
            ></i>
          </div>
        </div>
        <!-- End of Top Section -->

        <!-- table content -->
        <div class="row mt-4">
          <div class="px-4 mt-4 new">
            <label for="timestamp">Sort by Newest</label>
          </div>
        </div>
        <div v-if="!displayMessage" class="text-danger">You have not made any transactions</div>
        <div v-else>
        <div
          ref="downloadArea"
          class="row mt-2 py-2 d-md-flex justify-content-center align-items-center belw"
          v-for="(item, searchInputs) in userTransaction"
          :key="searchInputs"
        >
          <div class="col-md-2">
            <div class="d-flex justify-content-between">
              <span class="font-weight-700 d-flex d-md-none">PICTURE</span>
              <span class="text-right">
                <i
                  class="pi pi2 pi-check-circle p-3 bell-shadow bell d-flex justify-content-center align-items-center"
                ></i
              ></span>
            </div>
          </div>

          <div class="col-md-3 htext3 d-md-flex align-items-cente">
            <p class="d-flex justify-content-between">
              <span class="htext2 d-flex d-md-none">DONATIONS</span>
              <span class="text-right">{{ item.memo }}</span>
            </p>
          </div>
          <div class="col-md-3 htext3 d-md-flex align-items-cente">
            <p class="d-flex justify-content-between">
              <span class="htext2 d-flex d-md-none">DATE</span>
              <span class="text-right">{{ item.date }}</span>
            </p>
          </div>

          <div class="col-md-2 d-md-flex align-items-center">
            <div class="d-flex justify-content-between">
              <span class="font-weight-700 d-flex d-md-none"
                >PAYMENT OPTION</span
              >
              <span
                class="text-right"
                v-if="item.paymentGatewayName === 'Paystack'"
              >
                <img
                  class="imgee"
                  src="../../assets/paystackLogo.png"
                  :alt="item.paymentGatewayName"
                />
              </span>
              <span
                class="text-right"
                v-else-if="item.paymentGatewayName === 'Flutterwave'"
              >
                <img
                  class="imgee"
                  src="../../assets/2flutterwave.png"
                  :alt="item.paymentGatewayName"
                />
              </span>
              <span class="text-right" v-else>
                <img
                  class="imgee"
                  src="../../assets/2flutterwave.png"
                  :alt="item.paymentGatewayName"
                />
              </span>
            </div>
          </div>
          <div class="col-md-1 htext3">
            <p class="d-flex justify-content-between">
              <span class="htext2 d-flex d-md-none">AMOUNT</span>
              <span class="text-right">{{ item.amount }}</span>
            </p>
          </div>
          <hr />
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import axios from "@/gateway/backendapi";
import Dropdown from "primevue/dropdown";
// import { useRoute } from "vue-router"
import finish from "../../services/progressbar/progress";
import printJS from 'print-js'
export default {
  setup() {
    // const date = ref(new Date().toISOString().substr(0, 10));
    // const route = useRoute()
    const startDate = ref("1/1/0001 00:00:00");
    const endDate = ref("1/1/0001 00:00:00");
    const loading = ref(false);
    const userInputs = ref("");
    const downloadArea = ref(null)
    const userTransaction = ref([])
    const displayMessage = ref(false)


    const searchInputs = computed(() => {
      if (!userInputs.value) {
        return userTransaction.value;
      } else {
        return userTransaction.value.filter((i) => {
          return `${i.memo}${i.date}${i.amount}${i.paymentGatewayName}`
            .toLowerCase()
            .includes(userInputs.value.toLowerCase());
        });
      }
    });

    let storedDetails = JSON.parse(localStorage.getItem("giverToken"));
    const getPaymentDetails = () => {
      let tenantId = localStorage.getItem("tenantId");
      let initialData = {
        startDate: startDate.value,
        endDate: endDate.value,
        userId: storedDetails.giverId,
        tenantId: tenantId,
      };

      loading.value = true;

      axios
        .post("/mobile/v1/PaymentForm/contributions", initialData)
        .then((res) => {
          finish();
          console.log(res);
          console.log(res.data);
          if (res.data.length > 0) {
            userTransaction.value = res.data;
          }
          else {
            displayMessage.value = true
          }
          loading.value = false;
        })
        .catch((err) => {
          finish();
          console.log(err.response);
          loading.value = false;
        });
      // console.log(route.params.userId, tenantId)
    };
    getPaymentDetails();

    const searchRange = () => {
      let tenantId = localStorage.getItem("tenantId");
      let initialData = {
        startDate: startDate.value,
        endDate: endDate.value,
        userId: storedDetails.giverId,
        tenantId: tenantId,
      };

      axios
        .post("/mobile/v1/PaymentForm/contributions", initialData)
        .then((res) => {
          finish();
          console.log(res);
          console.log(res.data);
          userTransaction.value = res.data;
          loading.value = false;
        })
        .catch((err) => {
          finish();
          console.log(err.response);
          loading.value = false;
        });
    }

    const printTransactions = computed(() => {
      if (userTransaction.value.length === 0) return []
      return userTransaction.value.map(i => {
        return {
          MEMO: i.memo,
          DATE: i.date,
          PAYMENTGATEWAY: i.paymentGatewayName,
          AMOUNT: i.amount,
        }
      })
    })



    return {
      Dropdown,
      userTransaction,
      startDate,
      endDate,
      loading,
      userInputs,
      searchInputs,
      downloadArea,
      searchRange,
      displayMessage,
      printJS,
      printTransactions
    };
  },
};
</script>

<style scoped>
.search-control {
  width: calc(100% - 40px);
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

.imgee {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.bell {
  border-radius: 50%;
  background: #f7f7f9;
  transition: all 0.4s ease-in-out;
}

.bell-shadow:hover {
  background: #fff;
  box-shadow: 0 0 11px rgba(33, 33, 33, 0.2);
  cursor: pointer;
  transform: scale(1.05, 1.05);
}

.pi {
  font-size: 1rem;
  width: 40px;
  height: 40px;
}

.borderline {
  border: 1px solid #f5f8f9;
  box-shadow: 0 0 11px rgba(33, 33, 33, 0.2);
  border-radius: 0.5rem;
}

.pi2 {
  color: #54e38a;
}

.date-area {
  border-radius: 20px;
  background: #f5f8f9;
}

.htext {
  font: normal normal 800 25px Nunito Sans;
  letter-spacing: 2px;
  color: #020f1e;
}
.htext2 {
  font: normal normal 700 15px Nunito Sans;
  letter-spacing: 2px;
  color: #020f1e;
}

.htext3 {
  font: normal normal 500 15px Nunito Sans;
  letter-spacing: 2px;
  color: #020f1e;
}

.new {
  color: #c2c2c2;
  font-size: 15px;
  font-weight: bold;
}

.spinner-border {
  position: absolute;
  top: 50%;
  left: 50%;
}
</style>