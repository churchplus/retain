<template>
  <div class="">
    <div class="row reset-row">
      <div class="col-10 offset-1 col-lg-5 d-flex align-items-center">
        <div class="container-top">
          <div class="row">
            <div
              class="col-xl-10 offset-xl-1 signup-header text-center text-lg-left"
            >
              Sign up to Churchplus payment
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-xl-10 offset-xl-1">
              <div class="label">Full Name</div>
              <div class="mt-2">
                <input
                  type="text"
                  placeholder="Enter your name"
                  v-model="chosenName"
                  class="form-control input-control"
                />
              </div>
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-xl-10 offset-xl-1">
              <div class="label">Phone Number</div>
              <div class="mt-2">
                <input
                  type="phone"
                  placeholder="Enter your phone Number"
                  v-model="chosenNumber"
                  class="form-control input-control"
                />
              </div>
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-xl-10 offset-xl-1">
              <div class="label">Email address</div>
              <div class="mt-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  v-model="chosenEmail"
                  class="form-control input-control"
                />
              </div>
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-xl-10 offset-xl-1">
              <div class="label">Password</div>
              <div class="mt-2">
                <input
                  type="password"
                  v-model="chosenPassword"
                  class="form-control input-control"
                />
              </div>
            </div>
          </div>
          <div class="row mt-5">
            <div class="col-xl-10 offset-xl-1">
              <div class="button w-100" @click="signUp">Sign up</div>
              <div class="label mt-4 text-center">
                Already created an account?
                <router-link :to="`/signinpayment`">Sign in now</router-link>
              </div>
              <div class="label mt-3 text-center hfont cursor-pointer">
                    Go back to
                    <span class="text-primary" @click="goBack">Give</span>
                </div>
            </div>
          </div>
          <div class="row mt-5">
            <div class="col-md-4">
              <hr />
            </div>
            <div class="col-md-4 signup-option">or sign up with</div>
            <div class="col-md-4"><hr /></div>
          </div>
          <div class="row d-flex justify-content-center">
            <div class="col-6 col-sm-3">
              <img src="../../assets/google.svg" />
            </div>
            <div class="col-6 col-sm-3 mt-1 text-right">
              <img src="../../assets/facebook.svg" />
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-5 offset-lg-1 px-0 d-none d-lg-block bg-wall">
        <!-- <img
          src="../../assets/Group2582.png"
          class="w-100"
          style="height: 100vh"
        /> -->
      </div>
    </div>
    <Toast />
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "@/gateway/backendapi";
 import { useRouter, useRoute } from "vue-router";
 import { useToast } from "primevue/usetoast";
 import finish from "../../services/progressbar/progress"

export default {
  setup() {
    let toast = useToast();
    const route = useRoute()
    const chosenName = ref("");
    const chosenNumber = ref("");
    const chosenEmail = ref("");
    const chosenPassword = ref("");
    const errorOccure = ref(false);
    const router = useRouter();
    const tenantId = ref("")


    const getTenantId = () => {
      axios
        .get(
          // "/api/PaymentForm/GetOne?paymentFormID=4a276e37-a1e7-4077-a851-60b82180f4a0"
          `/give?paymentFormID=${route.params.userId}`
        )
        .then((res) => {
          // funds.value = res.data.contributionItems;
          // console.log(funds.value, "kjjjhjjjje");
          console.log(res.data);
          tenantId.value = res.data.tenantID;
          // selectedContributionType.value = formResponse.value.currencyId;
          // console.log(formResponse.value);
          // localStorage.setItem('tenantId', res.data.tenantID)
        })
        .catch((err) => {
          console.log(err.response)
          finish()
        });
    };
    getTenantId();

    const signUp = async () => {
      let signupDetails = {
        name: chosenName.value,
        phoneNumber: chosenNumber.value,
        tenantId: tenantId.value,
        email: chosenEmail.value,
        password: chosenPassword.value,
      };

      try {
        let  { data }= await axios.post("/mobile/v1/Account/WebSignUp", signupDetails);
        console.log(data);

        if (!data.status) {
              toast.add({
                  severity: "warn",
                  summary: "Something went wrong",
                  detail: `${data.response}`,
                  life: 3000,
              });
          } else if (data && data.returnObject.token &&  data.status) {

          toast.add({
              severity: "success",
              summary: "Success",
              detail: `${data.response}`,
              life: 3000,
          });
          
          let giverDetails = {
              giverToken: data.returnObject.token,
              giverId: data.returnObject.userId,
              email: data.returnObject.email,
              name: data.returnObject.fullname,
              phone: data.returnObject.phoneNumber,
              setSignInStatus: true
          }

           localStorage.setItem("giverToken", JSON.stringify(giverDetails));
          router.push({
            name: "OnlineGiving4",
            params: { userId: route.params.userId }
          });          
        }
           finish()
            } catch (error) {
                finish()
                // if (error.toString().includes('400')
                if (error.response) {
                    toast.add({
                    severity: "error",
                    summary: "Error signing up",
                    detail: `${error.response.data}`,
                    life: 3000,
                });
                } else if (error.response.toString().toLowercase().includes("network error")){
                    toast.add({
                    severity: "error",
                    summary: "Network Error",
                    detail: `Please ensure you have a strong internet connection`,
                    life: 3000,
                });
                } else if (error.response.toString().toLowercase().includes("timeout")){
                    toast.add({
                    severity: "error",
                    summary: "Request took too long to respond",
                    detail: `Please refresh the page`,
                    life: 3000,
                });
                }
            console.log(error.response);
            }




      //   if (data && data.value.token) {
      //       //  localStorage.setItem("giverToken", data.token)
      //        let giverDetails = {
      //           giverToken: data.token,
      //           giverId: data.value.userId
      //       }
      //     localStorage.setItem("giverToken", JSON.stringify(giverDetails));
      //     router.push({
      //       name: "OnlineGiving4",
      //       params: { userId: route.params.userId }
      //     });
      //   }
      //   finish()
      // } catch (error) {
      //     finish()
      //   // if (error.toString().includes('400')
      //     if (error.response) {
      //       toast.add({
      //       severity: "error",
      //       summary: "Error signing up",
      //       detail: `${error.response.data}`,
      //       life: 3000,
      //     });
      //     } else {
      //       toast.add({
      //       severity: "error",
      //       summary: "Network Error",
      //       detail: `Please ensure you have a strong internet connection`,
      //       life: 3000,
      //     });
      //     }
      // console.log(error.response);
      // }

    };

    const goBack = () => {
      router.go(-2)
    }

    return {
      errorOccure,
      chosenName,
      chosenNumber,
      chosenEmail,
      chosenPassword,
      signUp,
      goBack
    };
  },
};
</script>

<style scoped>
.container-top {
  margin-top: 50px;
}

.signup-header {
  font: normal normal 900 52px/71px Nunito Sans;
  letter-spacing: 0px;
  color: #051048;
  opacity: 1;
  margin-top: 25px;
}

.label {
  font: normal normal bold 16px/22px Nunito Sans;
  letter-spacing: 0px;
  color: #020f1e;
}

.input-control {
  background: #eaf4fab2 0% 0% no-repeat padding-box;
  border-radius: 10px;
  height: 50px;
  border: none;
  color: #2c3949;
}

.button {
  background: #1351cd 0% 0% no-repeat padding-box;
  box-shadow: 0px 12px 45px #1351cd61;
  border-radius: 11px;
  opacity: 1;
  text-align: center;
  font: normal normal bold 18px/24px Nunito Sans;
  letter-spacing: 0px;
  color: #ffffff;
  opacity: 1;
  padding: 12px;
  align-items: center;
  margin: 0;
}

.signup-option {
  font: normal normal bold 18px/24px Nunito Sans;
  letter-spacing: 0px;
  color: #020f1e;
  opacity: 0.6;
  text-align: center;
}

.reset-row {
  margin-right: 0;
}

.bg-wall {
    background-image: url('../../assets/Group2582.png');
    background-size: 100%;
    height: 100vh;
    background-repeat: no-repeat;
}
</style>