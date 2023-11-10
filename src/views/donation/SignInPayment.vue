<template>
  <div class="">
    <div class="row reset-row">
      <div class="col-10 offset-1 col-lg-5 d-flex align-items-center">
        <div class="container-top">
          <div class="row">
            <div class="col-xl-10 offset-xl-1 signup-header text-center text-lg-left">
              Sign in to Churchplus payment
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-xl-10 offset-xl-1">
              <div class="label">Email address</div>
              <div class="mt-2">
                <input type="email" placeholder="Enter your email" v-model="email" class="form-control input-control" />
              </div>
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-xl-10 offset-xl-1">
              <div class="label">Password</div>
              <div class="mt-2">
                <input type="password" v-model="password" class="form-control input-control" />
              </div>
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-xl-10 offset-xl-1 d-flex justify-content-between">
              <div class="label">Keep me signed in</div>
              <a href="#">Forgot Password?</a>
            </div>
          </div>
          <div class="row mt-5">
            <div class="col-xl-10 offset-xl-1">
              <div class="button w-100" @click="signin">Sign in</div>
              <div class="label mt-4 text-center">
                Not registered yet?
                <router-link :to="{ name: 'SignUpPayment', params: { userId: routeParams } }">Create a new
                  account</router-link>
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
            <div class="col-md-4 signup-option">or sign in with</div>
            <div class="col-md-4">
              <hr />
            </div>
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
      <div class="col-lg-4 offset-lg-2 px-0 d-none d-lg-block bg-wall">
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "@/gateway/backendapi";
import { useRouter, useRoute } from "vue-router";
import finish from "../../services/progressbar/progress"
import { ElMessage } from 'element-plus'
export default {
  setup() {
    const route = useRoute()
    const email = ref("");
    const password = ref("");
    const token = ref("");
    const router = useRouter();
    const routeParams = ref(`${route.params.userId}`)


    const signin = async () => {
      let userdetails = {
        email: email.value,
        password: password.value,
      };

      try {
        let { data } = await axios.post(
          "/mobile/v1/Account/SignIn",
          userdetails
        );
        if (!data.returnObject) {
          ElMessage({
            type: 'warning',
            message: "Incorrect details, " + data.response,
            duration: 5000
          })
        } else if (data && data.returnObject.token && data.status) {
          let giverDetails = {
            giverToken: data.returnObject.token,
            giverId: data.returnObject.userId,
            tenantId: data.returnObject.tenantID
          }
          localStorage.setItem("giverToken", JSON.stringify(giverDetails));
          localStorage.setItem("token", JSON.stringify(data.returnObject.token));

          ElMessage({
            type: 'success',
            message: data.response,
            duration: 5000
          })

          router.push({
            name: "OnlineGiving4",
            params: { userId: route.params.userId },
          });
        }
        finish()
      } catch (error) {
        finish()
        console.log(error);
        if (error.response && error.response.data.message) {
          ElMessage({
            type: 'warning',
            message: error.response.data.message,
            duration: 5000
          })
        } else if (error.response && error.response.toString().includes('network error')) {
          ElMessage({
            type: 'error',
            message: "Please ensure you  have a strong internet connection",
            duration: 5000
          })
        } else {
          ElMessage({
            type: 'error',
            message: "Not successful, please try again",
            duration: 5000
          })
        }
      }

      // try {
      //   let { data } = await axios.post(
      //     "/mobile/v1/Account/SignIn",
      //     userdetails
      //   );
      //   if (data && data.returnObject.token) {
      //       let giverDetails = {
      //           giverToken: data.returnObject.token,
      //           giverId: data.returnObject.userId
      //       }
      //     localStorage.setItem("giverToken", JSON.stringify(giverDetails));

      //     router.push({
      //       name: "OnlineGiving4",
      //       params: { userId: route.params.userId },
      //     });
      //   }
      //   finish()

      //   console.log(data);
      // } catch (error) {
      //     finish()
      //   console.log(error.response);
      //   if (error.response) {
      //     toast.add({
      //       severity: "info",
      //       summary: "Error Signing In",
      //       detail: `${error.response.data.message}`,
      //       life: 3000,
      //     });
      //   } else {
      //     toast.add({
      //       severity: "info",
      //       summary: "Network Error",
      //       detail: `Please ensure you have a strong internet connection`,
      //       life: 3000,
      //     });
      //   }
      // }
      // console.log(userdetails.value);
    };

    const goBack = () => {
      router.go(-1)
    }
    return {
      email,
      password,
      signin,
      token,
      routeParams,
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
  background-image: url('../../assets/Group257.png');
  height: 100vh;
}
</style>