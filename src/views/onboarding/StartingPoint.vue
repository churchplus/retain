<template>
  <div>
    <div class="main">
      <div class="greeting" :class="{ box1: processing }">
        <div class="welcome-onboard">
          <div class="welcome-intro">
            <div v-if="!processing">
              <h1>Hey {{ userDetails.firstName ? userDetails.firstName : "" }}</h1>
              <h2>What would you like to do in sendiT?</h2>
            </div>
          </div>
        </div>
      </div>

      <div class="options-div" :class="{ box2: processing }">
        <div class="options-container" v-if="screenWidth > 990 || !processing">
          <div class="step-count mt-4">
            <h3>STEP 2 OF 2</h3>
          </div>

          <div class="start-text hidden-sm-and-down">
            <h2>Choose a starting point</h2>
          </div>

          <div class="more-later hidden-sm-and-down">
            <span>You can do more later</span>
          </div>

          <div class="start-text hidden-md-and-up">
            <h2>Hey {{ userDetails.firstName ? userDetails.firstName : "" }}</h2>
          </div>

          <div class="more-later hidden-md-and-up">
            <span>What would you like to do in sendiT</span>
          </div>


          <div class="all-options">
            <div class=" w-100 ml-2 ">
              <el-dropdown class="w-100" trigger="click">
                <el-button type="primary" class="start-option">
                  <span class="icon  ">
                    <img class="link-icon " src="../../assets/claim-sms-offer.png" alt="Sms Icon" />
                  </span>
                  <span class="font-weight-bold text-warning">

                    <a class="start-link text-success">Claim your 500 unit now</a>
                  </span>
                  <span class="d-flex justify-content-end  font-weight-bold adjust-width">
                    <!-- <i class="fas fa-angle-down "></i> -->
                    <i class="fas fa-angle-right " :class="{ 'tbb-icon-rotate': smsOfferDropped }"></i>
                  </span>
                  <!-- Dropdown List<el-icon class="el-icon--right"><arrow-down /></el-icon> -->
                </el-button>
                <template #dropdown>
                  <el-dropdown-menu>
                    <p class="font-weight-bold px-3 pt-3" style="font-size: 1.2em">Terms and Conditions</p>
                    <p style="font-size: 1.2em" class="px-3">
                      <el-icon color="green">
                        <CircleCheck />
                      </el-icon> Buy 1000 units or above and get 500units free <br> <br>
                      <el-icon color="green">
                        <CircleCheck />
                      </el-icon> Offer is
                      open
                      to both new and existing customers <br> <br>
                      <el-icon color="green">
                        <CircleCheck />
                      </el-icon> This is a one time offer for the duration of this
                      campaign
                    </p>
                    <el-dropdown-item>
                      <router-link :to="{ name: 'BuyUnits', params: { option: '/tenant/units' } }"
                        class="d-flex justify-content-between text-primary font-weight-bold w-100 align-items-center">
                        <span>Buy SMS now</span>
                        <el-icon class="el-icon--right">
                          <arrow-right />
                        </el-icon>
                      </router-link>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
            <router-link :to="{ name: 'ProcessRequest', params: { option: '/tenant/sms/compose' } }"
              class="start-option">
              <div class="icon">
                <img class="link-icon" src="../../assets/sms-email.svg" alt="Sms Icon" />
              </div>
              <div class="link-n-icon">
                <a class="start-link">Send Email/SMS</a>
                <p class="my-auto"><i class="fas fa-angle-right"></i></p>
              </div>
            </router-link>

            <!-- <router-link class="start-option"
              :to="{ name: 'ProcessRequest', params: { option: '/tenant/people/add' } }">
              <div class="icon">
                <img class="link-icon link-icon-no-bg" src="../../assets/people/add-church-members.svg"
                  alt="Add member Icon" />
              </div>
              <div class="link-n-icon">
                <a class="start-link">Add church members</a>
                <p class="my-auto"><i class="fas fa-angle-right"></i></p>
              </div>
            </router-link> -->

            <!-- <router-link class="start-option"
              :to="{ name: 'ProcessRequest', params: { option: '/tenant/people/addfirsttimer' } }">
              <div class="icon">
                <img class="link-icon" src="../../assets/first-timers.svg" alt="First Timers Icon" />
              </div>
              <div class="link-n-icon">
                <a class="start-link">Add first timers</a>
                <p class="my-auto"><i class="fas fa-angle-right"></i></p>
              </div>
            </router-link> -->

            <router-link class="start-option" :to="{ name: 'ProcessRequest', params: { option: '/next' } }">
              <div class="icon">
                <img class="link-icon" src="../../assets/not-sure.svg" alt="Question Icon" />
              </div>
              <div class="link-n-icon">
                <a class="start-link">Not sure yet</a>
                <p class="my-auto"><i class="fas fa-angle-right"></i></p>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="logo">
      <img src="../../assets/sendit-logo.png" alt="" />
    </div>
  </div>
</template>

<script>
import axios from "@/gateway/backendapi";
export default {
  beforeRouteEnter(to, from, next) {
    if (localStorage.getItem("userSetup")) return next('/');
    return next(true);
  },

  data() {
    return {
      smsOfferDropped: false,
      processing: false,
      screenWidth: window.innerWidth,
      userId: "",
      userDetails: {}
    };
  },

  methods: {
    toggleSmsOffer() {
      this.smsOfferDropped = !this.smsOfferDropped
    },
    onboardUser(url) {
      const userData = this.$store.getters.onboardingData;
      axios
        .post("/api/onboarding", userData)
        .then((res) => {
          console.log(res, "onboarding response");
          localStorage.setItem("token", res.data.token);
          this.$store.dispatch("setStartPoint", url);
          this.$router.push("/processing");
        })
        .catch((err) => {
          console.log(err.response);
        });
    },

    onResize() {
      this.screenWidth = window.innerWidth;
    },
  },

  async created() {
    this.userDetails = this.$store.getters.onboardingData
  },

  mounted() {
    this.$store.dispatch("setUserUp", true);
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
  },
};
</script>

<style scoped>
.tbb-icon-rotate {
  transition: all 0.5s ease-in-out;
  transform: rotate(90deg);
  color: #190138;
  font-size: 20px;
}

.main {
  position: relative;
  height: 100vh;
  display: flex;
}

a {
  text-decoration: none;
}

.logo {
  position: absolute;
  top: 30px;
  left: 30px;
}

.greeting {
  width: 55%;
  transition: all 0.7s ease-in-out;
}

.options-div {
  width: 45%;
  background-image: -webkit-linear-gradient(top, #3362c9 0%, #582994 100%);
  transition: all 0.7s ease-in-out;
}

.welcome-onboard {
  min-height: 100%;
  display: flex;
  align-items: center;
}

.welcome-intro {
  max-width: 92%;
  margin: auto;
}

.welcome-intro h1 {
  line-height: 1.4;
  font-weight: bold;
  display: block;
  margin: 24px 0 16px;
  font-family: Averta, sans-serif;
  color: #1c252c;
  letter-spacing: -0.015em;
  font-size: 33px;
}

.welcome-intro h2 {
  color: #4d6575;
  font-weight: 400;
  margin-top: 0;
  font-size: 30px;
}

.start-text,
.step-count {
  text-align: center;
  color: #fff;
  font-weight: 900;
}

.step-count {
  margin: 30px 0;
}

.step-count h3 {
  font-size: 16px;
}

.more-later {
  text-align: center;
  color: #fff;
  margin: 16px 0;
  font-weight: bold;
}

.start-text h1 {
  font-size: 33px;
  font-weight: bold;
}

.start-text h2 {
  font-size: 30px;
}

.all-options {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
  max-width: 407px;
  margin: 34px auto;
}

.options-container {
  padding-top: 40px;
}

.start-option {
  display: flex;
  align-items: center;
  justify-content: start;
  justify-self: center;
  width: 97%;
  text-align: center;
  padding: 10px;
  margin-top: 8px;
  background: #fff;
  border-radius: 8px;
  box-sizing: border-box;
  height: 76px;
  opacity: 0.8;
  cursor: pointer;
}

.start-option:hover {
  background: #fff;
  opacity: 1;
}

.icon {
  width: 20%;
  max-width: 40px;
}

.link-n-icon {
  display: flex;
  justify-content: space-between;
  width: 80%;
  align-items: center;
}

.link-icon {
  width: 100%;
}

.link-icon-no-bg {
  border-radius: 50%;
}

.start-link {
  font-weight: 900;
  padding: 0 1rem;
  text-decoration: none;
  text-transform: capitalize;
  color: #215fc4;
}

.claim-offer {
  font-weight: 900;
  padding: 0 1rem;
  text-decoration: none;
  text-transform: capitalize;
  color: #f39d34;
}

.loading-div {
  max-width: 400px;
  margin: auto;
  text-align: center;
  height: 100%;
  display: flex;
  align-items: center;
}

.fa-angle-right {
  font-size: 25px;
  color: #707070;
}

@media screen and (max-width: 990px) {
  .main {
    display: block;
    box-sizing: border-box;
    margin-top: -40px;
  }

  .greeting {
    display: none;
  }

  .options-div {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }

  .all-options {
    width: 99%;
    margin: auto;
  }

  .step-count {
    padding-top: 30px;
  }

  .logo {
    display: none;
  }

  .options-container {
    display: flex;
    flex-direction: column;
  }

  .step-count {
    order: 1;
    padding: 0;
    margin: 0;
  }

  .main {
    margin-top: 0;
  }

  .adjust-width {
    font-size: 25px;
    width: 25%;
  }
}

@media screen and (min-width: 991px) {
  .box1 {
    transform: translateX(80%);
  }

  .box2 {
    transform: translateX(-127%);
  }

  .all-options {
    max-width: 330px;
  }

  .adjust-width {
    font-size: 25px;
    width: 13%;
  }
}
</style>