
<template>
  <div class="container-fluid img">
    <div class="row">
      <div class="container">
        <div class="row mt-4">
          <div class="col-md-12 d-flex justify-content-end">
            <a class="text-white" href="#"
              >Your Account &nbsp;
              <i class="fas fa-user text-right"></i
            ></a>
          </div>
        </div>
      </div>
    </div>

    <div class="row mt-5">
      <div
        class="col-md-12 mt-5 d-flex justify-content-center align-items-center"
      >
        <img
          class="logo img-fluid mb-5"
          src="../../../assets/Group214.png"
          alt=""
        />
      </div>
    </div>

    <div class="row">
      <div class="container d-flex justify-content-center align-items-center">
        <main class="main">
          <div class="container currency-color border">
            <div class="row mx-5 border py-1">
              <div class="col-md-4 px-0">
                <p class=" d-flex">Select currency</p>
              </div>
              <div class="col-md-4">

                  <Dropdown
                    v-model="dfaultCurrency"
                    :options="currencyInput"
                    optionLabel="shortCode"
                    placeholder="Select"
                    class="w-50"
                  />

              </div>
              <div class="col-md-4"></div>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import Dropdown from "primevue/dropdown";
import axios from "@/gateway/backendapi";
export default {
  components:{
    Dropdown
  },
  
  setup() {
    const hideTabOne = ref(true);

    const toggleTabOne = () => {
      hideTabOne.value = false;
    };
    const toggleTabTwo = () => {
      hideTabOne.value = true;
    };

    const selectedContributionType = ref({});
    const funds = ref([]);

    const dfaultCurrency = ref({});
    const currencyInput = ref({});

    const date = ref(new Date().toISOString().substr(0, 10));
    const oftenGive1 = ref(false);
    const oftenGive2 = ref(false);
    const oftenGive3 = ref(false);
    const oftenGive4 = ref(false);

    const givingOften = (e) => {
      console.log(e.target.innerText);
      // e.target.classList.add("default-color");
      // console.log(e.target.siblingElement);
      if (e.target.innerText == "Every Week") {
        oftenGive1.value = true;
        oftenGive2.value = false;
        oftenGive3.value = false;
        oftenGive4.value = false;
      } else if (e.target.innerText == "Every 2 Week") {
        oftenGive2.value = true;
        oftenGive1.value = false;
        oftenGive3.value = false;
        oftenGive4.value = false;
      } else if (e.target.innerText == "Every month") {
        oftenGive3.value = true;
        oftenGive1.value = false;
        oftenGive2.value = false;
        oftenGive4.value = false;
      } else {
        oftenGive4.value = true;
        oftenGive1.value = false;
        oftenGive2.value = false;
        oftenGive3.value = false;
      }
    };

    // getting contribution items
    const addfunds = () => {
      axios
        .get(
          "/api/PaymentForm/GetOne?paymentFormID=4a276e37-a1e7-4077-a851-60b82180f4a0"
        )
        .then((res) => {
          funds.value = res.data.contributionItems;
          // console.log(funds.value, "kjjjhjjjje");
          console.log(res.data);
          console.log(res);
        })
        .catch((err) => console.log(err.response));
    };
    addfunds();

    // getting currency
    const tcurrency = () => {
      axios
        .get("/api/LookUp/GetAllCurrencies")
        .then((res) => {
          currencyInput.value = res.data;
          console.log(currencyInput.value, "i am awesome");
          console.log(res.data, "catch me if you can");
          console.log(res);
        })
        .catch((err) => console.log(err.response, "You know me! yes gang"));
    };
    tcurrency();

    return {
      hideTabOne,
      toggleTabOne,
      funds,
      toggleTabTwo,
      selectedContributionType,
      date,
      givingOften,
      oftenGive1,
      oftenGive2,
      oftenGive3,
      oftenGive4,
      dfaultCurrency,
      currencyInput,
    };
  },
};
</script>

<style scoped>
.currency-color{
    background: #020F1E33;
    border-radius: 10px  10px 0 0;
}


.container-fluid {
  background: #707070;
  height: 100vh;
}
.main {
  background: #fff;
  height: 35rem;
  width: 40rem;
  border-radius: 10px;
}

.logo {
  height: auto;
  object-fit: cover;
  max-width: 200px;
}

.img {
  /* width: 100vw; */
  /* height: 40vh; */
  background: url("../../../assets/Group 265.svg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  -o-object-fit: cover;
  object-fit: cover;
}

.pc {
  font-family: Nunito Sans !important;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
}
.pr {
  font-family: Nunito Sans !important;
  font-size: 20px;
  font-weight: bold;
}
.nationalty {
  font-family: Nunito Sans !important;
  font-size: 15px;
  font-weight: 400;
}

.circle {
  color: #136acd;
  font-size: 10px;
}
/* .circle {
    background:  #136acd;
    border-radius: 50%;
    width: 100px;
    height: 100px;
} */

.image {
  /* width: 50%; */
  max-width: 20%;
  min-width: 20%;
  height: auto;
  -o-object-fit: cover;
  object-fit: cover;
}

.hover-shadow {
  transition: box-shadow 0.3s;
}
.hover-shadow:hover {
  box-shadow: 0 0 11px rgba(33, 33, 33, 0.2);
  cursor: pointer;
}
</style>