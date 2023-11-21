<template>
  <div>
    <div class="main-section">
      <div class="logo-con">
        <a class="logo-link"><img src="https://retain.dochase.co/logo.png" alt="Retain Logo" /></a>
      </div>
      <div class="header">
        <h1>Sign in</h1>
      </div>
      <!-- <div class="row">
        <div class="col-md-12 kick-start d-flex justify-content-center ">
          <img src="../../assets/KickStart.jpg" alt="">
        </div>
      </div> -->

      <div class="form-container">
        <div class="error-div" v-if="state.showError && !state.notAUser">
          <p class="error-message">{{ state.errorMessage }}</p>
        </div>

        <div class="error-div" v-if="state.notAUser">
          <p class="error-message">
            Not a registered user,
            <a href="/register" class="primary-text font-weight-bold text-decoration-none">Register now</a>
          </p>
        </div>
        <el-form :model="state" class="mt-3" @keyup.enter="login">
          <el-form-item>
            <el-input type="email" placeholder="Email" v-model="state.credentials.userName" />
          </el-form-item>
          <el-form-item>
            <el-input type="password" placeholder="Password" v-model="state.credentials.password" show-password/>
          </el-form-item>
          <div class="f-password-div">
            <router-link to="/forgotpassword" class="forgot-password primary--textII">Forgot it?</router-link>
          </div>
          <el-form-item>
            <el-button size="large" :color="primarycolor" @click="login" class="w-100" :loading="signInLoading" round>Sign
              In</el-button>
            <!-- <el-divider>
              or
            </el-divider> -->
            <!-- <div class="facebook-btn btn-logo sign-in-btn" @click="facebookLogin">
              <img src="../../assets/facebook-small.png" class="fb-icon" alt="Facebook Icon" />
              <span>Sign in with Facebook</span>
              <span></span>
            </div> -->
          </el-form-item>
        </el-form>
      </div>

      <div class="bottom-container">
        <div>
          <p class="sign-up-prompt">
            Don't have an account yet?
            <router-link to="/register" class="sign-up primary--textII"><strong>Sign up now</strong></router-link>
          </p>
        </div>
      </div>
      <el-dialog v-model="displayModal" title="Please enter your email" width="80%" align-center>
        <div class="container">
          <div class="row mt-2">
            <div class="col-12"></div>
            <div class="col-sm-2 align-self-center">
              Email <span class="text-danger">*</span>
            </div>
            <div class="col-sm-10">
              <el-input type="text" label="Email" v-model="invalidEmailObj.email" />
            </div>
          </div>
        </div>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="displayModal = false" class="secondary-button" round>Cancel</el-button>
            <el-button type="primary" @click="saveEmail" :loading="emailLoading" :color="primarycolor" round>
              Confirm
            </el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import axios from "@/gateway/backendapi";
import { ElNotification } from 'element-plus'
import { reactive, ref, inject } from "vue";
import router from "../../router/index";
import setupService from "../../services/setup/setupservice";
import { useGtag } from "vue-gtag-next";
import FBlogin from "@/mixins/facebookLogin"

export default {
  setup() {
    const { event } = useGtag()
    const track = () => {
      event('aaa', {
        'event_category': 'login',
        'event_label': 'ccc'
      })
    };
    track();
    const signInLoading = ref(false)
    const primarycolor = inject('primarycolor')

    const state = reactive({
      passwordType: "password",
      credentials: {},
      showError: false,
      errorMessage: "",
      notAUser: false,
    });
    const loading = ref(false);
    const {facebookLogin, displayModal, saveEmail, emailLoading, invalidEmailObj} = FBlogin()

    const login = async () => {
      signInLoading.value = true
      localStorage.setItem("email", state.credentials.userName);
      state.showError = false;
      state.notUser = false;
      try {
        loading.value = true;
        const res = await axios.post("/login", state.credentials);
        const { data } = res;
        signInLoading.value = false
        if (!data || !data.token) {
          router.push({
            name: "EmailSent",
            params: { email: state.credentials.userName },
          });
          return false;
        }
        localStorage.setItem("token", data.token);
        localStorage.setItem("expiryDate", data.expiryTime);
        localStorage.setItem('roles', JSON.stringify(data.roles))
        if (data.roles.length > 0) {
          let roleIndex = data.roles.findIndex(i => {
            return i.toLowerCase() == "family" || i.toLowerCase() == "mobileuser"
          })

          let adminIndex = data.roles.findIndex(i => {
            return i.toLowerCase() == "admin"
          })

          if (adminIndex !== -1) {
            setTimeout(() => {
              setupService.setup();
            }, 5000);
            if (data.churchSize >= data.subscribedChurchSize) {
              router.push("/errorpage/member-capacity-reached")
            } else {
              if (data.churchSize > 0) {
                router.push("/tenant");
              } else {
                router.push("/next");
              }
            }
          } else if (adminIndex === -1 && roleIndex !== -1) {
            localStorage.clear()
            ElNotification({
              title: 'Unauthorized',
              message: 'You do not have access to this page, contact your church admin',
              type: 'error',
            })
          } else {
            if (data.churchSize >= data.subscribedChurchSize) {
              router.push("/errorpage/member-capacity-reached")
            } else {
              if (data.roles.indexOf("GroupLeader") !== -1) {
                router.push({
                  name: "GroupLeaderDashboard"
                });
              } else if (data.roles.length === 1 && data.roles[0] === 'FollowUp') {
                router.push("/tenant/followup");
              } else if (data.roles.indexOf("FinancialAccount") !== -1) {
                router.push("/tenant/offering");
              } else if (data.roles.indexOf("MobileAdmin") !== -1) {
                router.push("/tenant/social");
              } else if (data.roles.indexOf("Reports") !== -1) {
                router.push("/tenant/reports");
              } else {
                if (data.churchSize > 0) {
                  router.push("/tenant");
                } else {
                  router.push("/next");
                }
              }
            }
            setTimeout(() => {
              setupService.setup();
            }, 5000);
          }
        }
        loading.value = false
      } catch (err) {
        signInLoading.value = false
        console.log(err, "login error");
        // eslint-disable-next-line
        NProgress.done();
        loading.value = false;
        const { status } = err.response;
        const { onboarded } = err.response.data;

        if (status && status == 400 && onboarded === false) {
          router.push("/onboarding");
        } else {
          if (status === 404) {
            state.notAUser = true;
          } else {
            state.errorMessage = err.response.data.message;
          }
          state.showError = true;
        }
      }
    };
    

    return {
      signInLoading,
      state,
      login,
      loading,
      displayModal,
      invalidEmailObj,
      emailLoading,
      facebookLogin,
      saveEmail,
      primarycolor
    };
  },
};
</script>

<style scoped>

.kick-start img{
  height: 10rem;
}
.logo-con {
  display: flex;
  margin-top: 24px;
}

.logo-link {
  width: 100%;
  text-align: center;
  margin-top: 36px;
}

.logo-link img{
  height: 4.2rem;
}


.header {
  text-align: center;
  margin-bottom: 10px;
  margin-top: 41px;
}

.header h1 {
  font-size: 30px;
}

.main-section {
  max-width: 400px;
  margin: auto;
  padding: 10px;
}

.input {
  /* font-family: Averta,sans-serif; */
  color: #1c252c;
  font-weight: normal;
  width: 100%;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 8px 10px 6px;
  min-height: 40px;
  appearance: none;
  outline: none;
  vertical-align: middle;
  transition: border 0.1s linear;
  border: 1px solid #b2c2cd;
  margin: 4px 0;
}

.forgot-password {
  /* font-family: Averta,sans-serif; */
  font-size: 14px;
  line-height: 1.4;
  text-decoration: none;
  font-weight: bold;
  cursor: pointer;
}

.input::placeholder {
  font-style: italic;
  font-weight: 600;
  color: #b2c2cd;
  letter-spacing: 1.5px;
}

.f-password-div {
  margin-bottom: 8px;
}

.submit-btn {
  background: #136acd;
  outline: none;
}

.submit-btn:hover {
  cursor: pointer;
}

.sign-in-btn {
  color: #fff;
  border: 1px solid transparent;
  margin-top: 8px;
  width: 100%;
  padding: 8px 8px;
  box-sizing: border-box;
  text-align: center;
  min-width: 100px;
  border-radius: 500px;
  vertical-align: middle;
  text-decoration: none;
  appearance: none;
  font-weight: 400;
  font-size: 16px;
  outline: none;
}

.input:focus {
  box-shadow: 0 0 0 3px rgba(19, 106, 205, 0.2);
}

/* .input:not(:focus) {
  font-style: italic;
   color: #b2c2cd;
   letter-spacing: 1.5px;
} */

.or {
  display: flex;
  flex-direction: row;
  color: #8b9ba5;
}

.or:before,
.or:after {
  content: "";
  flex: 1 1;
  border-bottom: 1px solid #8b9ba5;
  margin: auto;
}

.or:before {
  margin-right: 10px;
}

.or:after {
  margin-left: 10px;
}

.google-btn {
  background: #4285f4;
}

.facebook-btn {
  background: #3b5998;
  cursor: pointer;
}

.fb-icon {
  background: #fff;
  padding: 0.23rem 0.6rem;
  border-radius: 50%;
  margin: 0.25rem;
}

.btn-logo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1px;
}

.bottom-container {
  text-align: center;
  color: #4d6575;
  font-size: 14px;
  line-height: 1.4;
  margin-top: 30px;
}

.sign-up {
  text-decoration: underline;
}

.error-div {
  background: #fff8f8;
  border-color: #ffe9e9;
  padding: 10px 5px;
  margin-bottom: 24px;
  border-radius: 8px;
  border: 1px solid transparent;
  border-left: 5px solid #b52626;
}

.error-message {
  color: #b52626;
  margin-bottom: 0;
}

/* ._5h0i._88va {
    background-color: #3B5998 !important;
    border: 2px solid red !important;
} */

._5h0i._88va {
  border: 2px solid red !important;
}

.fb_iframe_widget iframe {
  opacity: 0;
}

.fb_iframe_widget {
  /* background-image: url(../../assets/facebook-small.png);
      background-repeat: no-repeat;  */
  /* background: #3B5998; */
  /* border: 2px solid #3b5998; */
  border-radius: 500px;
  position: relative;
  top: -155px;
  left: 1px;
  padding: 8px;
  width: 100%;
}

@media (max-width: 273px) {
  .fb_iframe_widget {
    top: -173px;
  }
}
</style>
