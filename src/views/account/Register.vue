<template>
  <div>
    <div class="main-section">
      <div class="logo-con">
        <a class="logo-link"><img src="../../assets/sendit-logo.png" alt="Churchplus Logo" /></a>
      </div>
      <div class="header">
        <div class="top-con">
          <div class="header">
            <!-- <h1>Your all in one church management solution</h1> -->
            <h1>Get started for <span class="free">FREE</span></h1>
            <!-- <h3 class="intro">
              A church software that automates your entire <br />
              church management processes.
            </h3> -->
          </div>
        </div>
      </div>

      <div class="form-container">
        <div class="error-div" v-if="showError">
          <p class="error-message">
            {{ errorMessage }}
            <span v-if="showResetLink">OR
              <span>
                <a class="font-weight-bold text-decoration-none c-pointer" @click="resetPassword">click here to reset
                  your password</a></span></span>
            <span v-else>
              <a href="mailto:support@churchplus.co" class="font-weight-700 primary-text">Contact Support</a>
            </span>
          </p>
        </div>
        <el-form :model="credentials" class="mt-3" @keyup.enter.native="register">
          <el-form-item>
            <el-input type="email" placeholder="Email" v-model="credentials.email" />
          </el-form-item>
          <el-form-item>
            <el-input type="password" placeholder="Password" v-model="credentials.password" show-password />
          </el-form-item>
          <div class="f-password-div">
            <span class="password-tip password-help">At least 6 characters, but longer is better.</span>
          </div>
          <el-form-item>
            <el-button size="large" color="#17c5cf" @click="register" class="w-100" :loading="loading" round>
              Get Started
            </el-button>
            <!-- <el-divider>
              or
            </el-divider>
            <div class="facebook-btn btn-logo sign-in-btn" @click="facebookLogin">
              <img src="../../assets/facebook-small.png" class="fb-icon" alt="Facebook Icon" />
              <span>Sign in with Facebook</span>
              <span></span>
            </div> -->
          </el-form-item>
        </el-form>

        <!-- <div class="terms">
          <p>
            By signing up, you are indicating that you have read and agree to
            the
            <router-link to="/termsofuse" class="terms-link">Terms of Use</router-link>
            and
            <router-link to="/termsofuse" class="terms-link">Privacy Policy.</router-link>
          </p>
        </div> -->

        <div class="bottom-container">
          <div>
            <p class="sign-up-prompt">
              Already have an account?
              <router-link to="/" class="sign-up"><span class="primary--text"> Sign in now</span></router-link>
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
  </div>
</template>

<script>
import axios from "@/gateway/backendapi";
import router from '../../router/index';
import FBlogin from "@/mixins/facebookLogin"
import store from "../../store/store";
import { reactive, ref, inject } from "vue";

export default {
  setup() {
    const primarycolor = inject('primarycolor')
    const credentials = reactive({
      ChurchName: "Default Church",
      firstName: "First name",
      lastName: "Last name",
    })
    const showError = ref(false)
    const errorMessage = ref("")
    const show = ref(false)
    const loading = ref(false)
    const showResetLink = ref(true)
    const {facebookLogin, displayModal, saveEmail, emailLoading, invalidEmailObj} = FBlogin()




    const register = () => {
      const routeQuery = router.currentRoute.value.query
      routeQuery.ref ? credentials.referrer = routeQuery.ref : ""
      loading.value = true;
      showError.value = false;
      axios
        .post("/initialsignup", credentials)
        .then((res) => {
          loading.value = false;
          console.log(res, "register response");
          store.dispatch("setUserEmail", credentials.email);
          localStorage.setItem("email", credentials.email);
          router.push("/onboarding");
        })
        .catch((err) => {
          /*eslint no-undef: "warn"*/
          NProgress.done();
          loading.value = false;
          console.log(err.response);
          localStorage.setItem("email", credentials.email)
          if (err.response && err.response.status === 400) {
            if (err.response.data === false) {
              router.push("/onboarding")
              return false;
            }
            const { message } = err.response.data;
            if (message.includes("Sequence contains more than one element")) {
              errorMessage.value = "There seems to be a problem with this account, please";
              showResetLink.value = false;
            } else {
              errorMessage.value = message ? message : "An error occurred";
            }
            showError.value = true;
          } else {
            errorMessage.value = "An error occurred, ensure you are connected to the internet";
          }
        });
    }

    const resetPassword = async() => {
      try {
        const { data } = await axios.post(
          `/forgotpassword/${credentials.email}`
        );
        router.push({
          name: "EmailSent",
          params: { email: credentials.email }
        });
      } catch (error) {
        NProgress.done();
        console.log(error);
      }
    }

    return {
      credentials,
      showError,
      errorMessage,
      show,
      loading,
      showResetLink,
      displayModal,
      invalidEmailObj,
      emailLoading,
      register,
      resetPassword,
      facebookLogin,
      saveEmail,
      primarycolor
    }
  }
  // data() {

};
</script>

<style scoped>
.logo-con {
  display: flex;
  margin-top: 42px 0;
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
  margin-bottom: 30px;
  margin-top: 3em;
}

.header h1 {
  color: #1d262d;
  font-size: 28px;
  margin-bottom: 22px;
}

.header .intro {
  font-size: 20px;
}

.main-section {
  margin: auto;
  padding: 10px;
}

.form-container {
  max-width: 400px;
  /* sign up*/
  margin: auto;
}

.input {
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

.input::placeholder {
  font-style: italic;
  color: #b2c2cd;
  letter-spacing: 1.5px;
}

.forgot-password {
  /* font-family: Averta, sans-serif; */
  font-size: 14px;
  line-height: 1.4;
  text-decoration: none;
  font-weight: bold;
  cursor: pointer;
}

.f-password-div {
  margin-bottom: 8px;
}

.submit-btn {
  background: #136acd;
  font-size: 16px;
  font-weight: bold;
}

.sign-in-btn {
  color: #fff;
  border: 1px solid transparent;
  margin-top: 8px;
  width: 100%;
  /* padding: 8px 20px; */
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

.sign-in-btn:hover {
  cursor: pointer;
}

.input:focus {
  box-shadow: 0 0 0 3px rgba(19, 106, 205, 0.2);
}

.input::placeholder {
  font-style: italic;
  color: #b2c2cd;
  font-weight: 600;
  letter-spacing: 1.5px;
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

.google-btn::before {
  content: "\e0e2";
  margin-right: auto;
}

.facebook-btn {
  background: #3b5998;
}

.bottom-container {
  text-align: center;
  color: #4d6575;
  font-size: 14px;
  line-height: 1.4;
  margin-top: 24px;
  font-weight: lighter;
}

.sign-up {
  color: #4d6575;
  font-weight: bold;
  text-decoration: underline;
  font-size: 13px;
}

.btn-logo {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.fb-icon {
  background: #fff;
  padding: 0.23rem 0.6rem;
  border-radius: 50%;
  margin: 0.25rem;
}

/* Signup */
.intro {
  color: #718fa2;
  font-weight: lighter;
  margin-bottom: 40px;
  font-size: 23px;
}

.show-password {
  float: right;
}

.password-help {
  margin-bottom: 24px;
  font-size: 14px;
  color: #718fa2;
  font-weight: lighter;
}

.show-password-link {
  text-decoration: none;
  color: #136acd;
  font-weight: bold;
}

.get-started {
  background: #17c5cf;
  color: #000;
}

.google-sign-up {
  background: #4285f4;
}

.google-sign-up:hover {
  background: #4266f4;
}

.terms {
  text-align: center;
  margin-top: 40px;
  color: #718fa2;
  font-weight: lighter;
}

.terms-link {
  color: #4d6575;
  font-weight: bold;
  font-size: 12px;
}

.terms-link:hover {
  text-decoration: none;
}

.sign-up:hover {
  text-decoration: none;
}

.show-password:hover {
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
}

.fb_iframe_widget iframe {
  /* opacity: 0; */
  border: 2px solid #3b5998;
}

.fb_iframe_widget {
  /* background-image: url(../../assets/facebook-small.png);
  background-repeat: no-repeat;  */
  /* background: #3B5998; */
  /* border: 2px solid #3b5998; */
  border-radius: 500px;
  position: relative;
  top: -196px;
  left: 1px;
  padding: 8px;
  width: 100%;
  max-height: 40px;
}

.free {
  font-weight: 800;
  color: #10898f;
}
</style>
