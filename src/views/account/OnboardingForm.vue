<template>
  <div class="top-most">
    <div>
      <div id="onboarding">
        <div id="onboarding-form" :class="{ 'swap-box1': toggle }">
          <div class="onboarding-form-container">
            <div class="title-div">
              <div class="main-title">
                <h1>Welcome to Churchplus!</h1>
              </div>
              <div class="sub-title">
                <p>Tell us about you and your church</p>
              </div>
            </div>
            <el-form ref="ruleFormRef" :rules="rules" :model="userDetails" style="width: 100%">
              <div class="input-div">
                <label class="mb-0">What's your name?</label>
                <el-row :gutter="15">
                  <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item prop="firstName">
                      <el-input type="text" v-model="userDetails.firstName" placeholder="First name" />
                    </el-form-item>
                  </el-col>
                  <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item prop="lastName">
                      <el-input type="text" v-model="userDetails.lastName" placeholder="Last name" />
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>

              <div class="input-div">
                <label class="mb-0">What's the name of your ministry?</label>
                <el-form-item prop="churchName">
                  <el-input type="text" v-model="userDetails.churchName" placeholder="Name of church" />
                </el-form-item>
              </div>

              <div class="input-div">
                <label class="mb-0">What's your phone number?</label>
                <div class="w-100">
                  <!-- <vue-tel-input :value="userDetails.phoneNumber" @input="onInput" mode="international"
                    style="height: 40px" @blur="invalidResponse"></vue-tel-input> -->
                    <vue-tel-input style="height: 40px" @blur="invalidResponse" v-model="userDetails.phoneNumber" @input="onInput" mode="international"></vue-tel-input>
                </div>
              </div>
              
              <div class="input-div">
                <label class="mb-0">Select your country</label>
                <div class="w-100">
                  <el-select-v2 v-model="selectedCountryId" :options="countries.map(i => ({label: i.name, value: i.id}))" @change="setSelectedCountry" filterable
                    placeholder="Select country" size="large" class="w-100" />
                </div>
              </div>

              <div class="input-div cstm-select w-100">
                <label class="mb-0">What's the membership size of your ministry?</label>
                <el-form-item prop="churchSize">
                  <el-select-v2 v-model="userDetails.churchSize" :options="membershipSizeList"
                    placeholder="Select size range" size="large" class="w-100" />
                </el-form-item>
              </div>
              <el-button class="w-100" :color="primarycolor" size="large" :disabled="!disableNext" :loading="loading"
                @click="submitForm(ruleFormRef)" round>Next</el-button>
            </el-form>
          </div>
        </div>
        <div class="col-xs-12 col-md-6" id="onboarding-visuals" :class="{ 'swap-box2': toggle }" ref="box2">
          <div class="step">
            <h3>STEP 1 OF 2</h3>
          </div>

          <div>
            <div>
              <div class="onboarding-image-con">
                <img src="../../assets/onboarding.png" alt="Image" />
                <span class="reactive-text">{{ churchName }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/gateway/backendapi";
import router from "../../router/index";
// import { VueTelInput } from "vue3-tel-input";
// import "vue3-tel-input/dist/vue3-tel-input.css";
import { ref, reactive, inject } from "vue";
import finish from "../../services/progressbar/progress";
import { ElNotification } from 'element-plus'
export default {
  components: {
    // VueTelInput,
  },
  beforeRouteLeave() {
    const userEmail = localStorage.getItem("email");
    if (userEmail) localStorage.removeItem("email");
  },

  beforeRouteEnter() {
    if (localStorage.getItem("token")) router.push("/next");
  },

  setup() {
    const primarycolor = inject('primarycolor')
    const ruleFormRef = ref()
    const rules = reactive({
      firstName: [
        { required: true, message: 'Please input your first name', trigger: 'blur' },
      ],
      lastName: [
        { required: true, message: 'Please input your last name', trigger: 'blur' },
      ],
      churchName: [
        { required: true, message: 'Please input your church name', trigger: 'blur' },
      ],
      churchSize: [
        { required: true, message: 'Please input your church size', trigger: 'change' },
      ],
    })
    return {
      ruleFormRef,
      rules,
      primarycolor
    }
  },

  data() {
    return {
      toggle: false,
      zipCode: "",
      step1Completed: true,
      userDetails: {
        subscriptionPlanID: 1,
        countryId: 89,
        password: "password",
        phoneNumber: "",
      },

      selectedCountry: {},
      countries: [],
      loading: false,
      codeUrl: {},
      disableNext: false,
      membershipSizeList: ['1 - 100', '101 - 200', '201 - 500', '501 - 2000', '2001 - 10,000'].map(i => ({ value: i, label: i })),
      usersPhoneCode: '',
      selectedCountryId: null
    };
  },
  methods: {
    onInput(phone, phoneObject, input) {
      this.usersPhoneCode = phoneObject ? phoneObject.country.dialCode : ''
      if (phoneObject?.formatted) {
        this.userDetails.phoneNumber = phoneObject.formatted;
        this.selectedCountry = this.countries.find(
          (i) => i.phoneCode == phoneObject.countryCallingCode
        );
      }
    },

    async submitForm(formEl) {
      if (!formEl) return
      await formEl.validate((valid, fields) => {
        if (valid) {
          this.next();
        } else {
          console.log('error submit!', fields)
          ElNotification({
            title: 'Some fields empty',
            message: 'Fill all fields and submit again',
            type: 'warning',
          })
        }
      })
    },

    next() {
      if (!this.userDetails.email) return false;
      this.userDetails.countryId = this.selectedCountry.id;
      this.loading = true;
      axios
        .post("/api/onboarding", this.userDetails)
        .then((res) => {
          if (res.data.isOnboarded) {
            ElNotification({
              title: 'Well done',
              message: 'Onboarding successful',
              type: 'success',
            })
          }
          if (!res.data.token) {
            const preToken = localStorage.getItem("pretoken");
            localStorage.setItem("token", preToken);
            localStorage.removeItem("pretoken");
          } else {
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("roles", JSON.stringify(["Admin"]));
          }
          this.loading = false;
          this.$store.dispatch("setOnboardingData", this.userDetails);
          this.$router.push("/onboarding/step2");
        })
        .catch((err) => {
          finish()
          this.loading = false;
          console.log(err.response);
        });
    },

    invalidResponse() {
      if (!this.userDetails.phoneNumber) {
        this.disableNext = false;
      } else {
        this.disableNext = true;
      }
    },
    setSelectedCountry () {
      this.selectedCountry = this.countries.find(i => i.id === this.selectedCountryId)
    }
  },

  computed: {
    churchName() {
      if (!this.userDetails.churchName) return "";
      return this.userDetails.churchName.length < 21
        ? this.userDetails.churchName
        : this.userDetails.churchName.slice(0, 20) + "...";
    },
    valid() {
      let regex = /[0-9]{11}/;
      return regex.test(this.userDetails.phoneNumber);
    }
  },

  beforeCreate() {
    if (!localStorage.getItem("email")) router.push("/");
  },

  created() {
    this.userDetails.email = localStorage.getItem("email");
    setTimeout(() => {
      axios.get("/api/GetAllCountries").then((res) => {
      this.countries = res.data;
      this.selectedCountry = this.countries.find(
        (i) => i.phoneCode && i.phoneCode.toString() === this.usersPhoneCode.toString()
      );
      this.selectedCountryId = this.selectedCountry ? this.selectedCountry.id : this.selectedCountry
    });
    }, 2000);
  }
};
</script>

<style scoped>
.top-most {
  height: 100vh;
}

#onboarding {
  display: flex;
  height: 100vh;
}

#onboarding-visuals {
  width: 45%;
  height: 100;
  background-image: -webkit-linear-gradient(top, #3362c9 0%, #582994 100%);
  transition: all 0.7s ease-in-out;
}

#onboarding-form {
  width: 55%;
  display: flex;
  padding: 10px;
  transition: all 0.7s ease-in-out;
}

.swap-box1 {
  transform: translateX(80%);
}

.swap-box2 {
  transform: translateX(-127%);
}

.sub-title {
  font-size: 20px;
  font-weight: lighter;
  color: #718fa2;
}

.onboarding-form-container {
  max-width: 560px;
  width: 90%;
  margin: auto;
}

.input-div {
  margin: 20px 0;
}

.input {
  font-family: Averta, sans-serif;
  color: #1c252c;
  font-weight: normal;
  width: 100%;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 8px 10px 6px;
  min-height: 40px;
  /* -webkit-appearance: button; */
  /* appearance: none; */
  outline: none;
  vertical-align: middle;
  transition: border 0.1s linear;
  border: 1px solid #b2c2cd;
  margin: 4px 0;
}


.step {
  text-align: center;
  color: #fff;
  margin: 30px 0;
  font-weight: bold;
}

.onboarding-image-con {
  width: 80%;
  margin-left: auto;
  position: relative;
}

.onboarding-image-con img {
  width: 100%;
  height: 100%;
}

.reactive-text {
  position: absolute;
  top: 8%;
  left: 24%;
  width: 70%;
  font-size: 23px;
  font-weight: 600;
  color: #4d6575;
  overflow: hidden;
  text-overflow: ellipsis;
}

span .select2-selection--single {
  padding: 0px 10px !important;
  height: 40px !important;
  margin-top: 4px !important;
  display: flex !important;
  align-items: center !important;
  border: 1px solid #b2c2cd;
}

@media screen and (max-width: 990px) {
  #onboarding {
    display: block !important;
  }

  #onboarding-form {
    width: 100% !important;
  }

  .main-title {
    margin-top: 20px;
  }

  #onboarding-visuals {
    display: none !important;
  }
}

@media screen and (min-width: 480) {
  .main-title {
    font-size: 33px;
  }
}
</style>