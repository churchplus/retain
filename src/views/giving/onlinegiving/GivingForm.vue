
<template>
<!-- This component is not currently in use in production environment, it will be removed in the future eventually -->

  <div class="bg">
    <!-- start of nav-header area -->
    <section class="header hcolor sticky-top">
      <div class="container">
        <div class="row">
          <div class="col-4 align-self-center mt-2">
            <img
              class="logo img-fluid"
              src="../../../assets/ChurchplusLogo.png"
              alt=""
            />
          </div>

          <div
            class="col-4 mt-3 d-flex justify-content-end text-white mb-0 mr-n5"
          >
            <p>English</p>
          </div>

          <div class="col-4 mt-3 d-flex justify-content-center">
            <a href="#"
              ><span class="d-md-inline text-white d-none mb-0"
                >Your Account</span
              ><i class="fas fa-user text-white ml-2 mb-0"></i
            ></a>
          </div>
        </div>
      </div>
    </section>
    <!-- end of nav-header area -->

    <!-- start of hero-image area -->
    <section>
      <div class="container-fluid">
        <div class="row">
          <div class="col-12 px-0">
            <img
              class="w-100"
              style="height: 30vh"
              src="../../../assets/churchplusimage.png"
              alt=""
            />
          </div>
        </div>

        <div class="row mt-n5">
          <div
            class="col-12 mt-n5 text-nowrap text-center text-sm-center position-absolute"
          >
            <p class="givep mt-n5">GIVING</p>
            <p class="text-white mt-n3">Give and you shall recieve</p>
          </div>
        </div>
      </div>
    </section>
    <!-- end of hero image area -->

    <!-- section - house -->
    <section class="container-fluid" style="background: yellow">
      <!-- container for midlle componnent -->

      <!-- section form -->
      <section>
        <div>
          <div class="col-md-4 offset-md-4">
            <div class="row mild shadow p-3 mb-5 bg-body rounded">
              <div class="col-md-8 offset-md-2">
                <div class="row">
                  <div class="col-md-12 text-center mb-0 clean">
                    <p class="hfont">ENTER AMOUNT</p>
                  </div>
                </div>
                <!-- figure area -->
                <div class="row d-flex flex-column mt-n4">
                  <sup class="ash">#</sup>
                  <div class="col-12">
                    <input
                      class="input1 col-md-12 text-center"
                      type="text"
                      value="0.00"
                    />
                  </div>
                </div>

                <div class="row d-flex mt-n2">
                  <div class="col-6 bord offset-3"></div>
                </div>
                <!--end of figure area -->
              </div>

              <section class="col-10 offset-1 mt-3 px-0">
                <p class="col-4 hfont px-0 mb-1">Gift type</p>

                <div class="col-12 mt-1">
                  <div class="row border rounded">
                    <div
                      class="col-6 fone p-2 text-center borderl default-color1"
                      :class="{ 'default-color': !hideTabOne }"
                      @click="toggleTabOne"
                    >
                      <span><i class="fas fa-donate"></i></span>&nbsp; Give One
                      Time
                    </div>
                    <div
                      class="col-6 p-2 fone text-center btn-default default-color1"
                      :class="{ 'default-color': hideTabOne }"
                      @click="toggleTabTwo"
                    >
                      <span
                        ><i class="fas fa-redo-alt"></i> &nbsp; Set up
                        recurring</span
                      >
                    </div>
                  </div>
                </div>
              </section>

              <section class="col-10 offset-1 mt-3 px-0" v-if="hideTabOne">
                <p class="col-10 hfont px-0 mb-1">
                  How often do you want to give?
                </p>

                <div class="col-12 mt-1">
                  <div class="row border rounded">
                    <div
                      :class="{ 'default-color': oftenGive1 }"
                      class="col-3 fone p-2 text-center default-color1 borderl"
                      @click="givingOften"
                    >
                      Every Week
                    </div>
                    <div
                      :class="{ 'default-color': oftenGive2 }"
                      class="col-3 fone p-2 default-color1 text-center borderl"
                      @click="givingOften"
                    >
                      Every 2 Week
                    </div>
                    <div
                      :class="{ 'default-color': oftenGive3 }"
                      class="col-3 fone p-2 default-color1 text-center borderl"
                      @click="givingOften"
                    >
                      Every month
                    </div>
                    <div
                      class="col-3 p-2 fone text-center default-color1"
                      @click="givingOften"
                      :class="{ 'default-color': oftenGive4 }"
                    >
                      1st and 15th monthly
                    </div>
                  </div>
                </div>
              </section>

              <section class="col-10 offset-1 mt-3 px-0" v-if="hideTabOne">
                <div class="row">
                  <p class="col-6 py-0 ml-1 hfont">Starting</p>
                  <div class="col-md-6 d-flex flex-row mt-n2">
                    <input
                      type="date"
                      class="form-control fone"
                      v-model="date"
                    />
                  </div>
                </div>
              </section>

              <section
                class="col-10 offset-1 mt-3 px-0"
                v-if="!hideTabOne || hideTabOne"
              >
                &nbsp; Fountain of Grace
                <!-- button section -->
                <div class="row">
                  <div class="col-md-12 text-center mt-4 pin">
                    <button class="btn btn-default btngive hfont">
                      Give Now
                    </button>
                  </div>
                </div>
                <!--end of button section -->
                <!-- payment method section -->
                <div class="row mt-2">
                  <div class="col-md-12 text-center pin my-2">
                    <section class="col-9 offset-3">
                      <div class="row"></div>

                      <div class="row">
                        <div class="col-1 px-1 ml-2">
                          <img
                            class="w-100"
                            src="../../../assets/2flutterwave.png"
                            alt=""
                          />
                        </div>
                        <div class="col-1 px-1">
                          <img
                            class="w-100"
                            src="../../../assets/1s519863150871.png"
                            alt=""
                          />
                        </div>
                        <div class="col-3 px-1">
                          <img
                            class="imgg w-100"
                            src="../../../assets/4PaystackLogo.png"
                            alt=""
                          />
                        </div>
                        <div class="col-1 px-0">
                          <img
                            class="w-100"
                            src="../../../assets/5visa_PNG30.png"
                            alt=""
                          />
                        </div>
                        <div class="col-1 px-1">
                          <img
                            class="w-100"
                            src="../../../assets/3MasterCard500.png"
                            alt=""
                          />
                        </div>
                        <div class="col-2"></div>
                      </div>
                    </section>
                  </div>
                </div>
                <!--end of payment method section -->
              </section>
            </div>
          </div>
        </div>
      </section>
      <!--end of section form -->

      <!-- footer -->
      <section>
        <div class="col-md-4 offset-md-4 footer-area mig">
          <div class="row hfont">
            <p class="text-nowrap">
              Churchplus <span><u>Terms & Conditions</u></span
              >and
              <span><u>Privacy Policy</u> </span>
            </p>
            <p class="mt-n2 text-wrap">
              Organization Legal Name: Porters House Assembly | Address:Iponri
              Lagos
            </p>
            <div class="col-12 px-0">
              <hr />
            </div>
            <div class="col-7 px-0">
              <img
                class="logo img-fluid mb-5"
                src="../../../assets/logoblue.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
      <!-- end of footer -->

      <!-- container for midlle componnent -->
    </section>
    <!--end of section - house -->
  </div>
</template>

<script>
import { ref } from "vue";
import Dropdown from "primevue/dropdown";
export default {
  components: {
    Dropdown,
  },
  setup() {
    const hideTabOne = ref(true);

    const toggleTabOne = () => {
      hideTabOne.value = false;
    };
    const toggleTabTwo = () => {
      hideTabOne.value = true;
    };
    const selectedContributionType = ref("");
    const funds = ref([
      { type: "Child Welfare" },
      { type: "Building Project" },
      { type: "Tithe" },
      { type: "Offering" },
      { type: "Holy Commission" },
    ]);
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
    };
  },
};
</script>

<style scoped>
.mig {
  margin-top: 2rem;
}

.footer-area {
  position: absolute;
  top: 50rem;
}
.bg {
  background: #eeeeee;
}

/* style for nav-header area */
.hcolor {
  background: #020f1e;
}

.logo {
  width: 40%;
  height: auto;
  object-fit: cover;
}
/*end of style for nav-header area */

/* start of style for card-area  */
.card-area {
  z-index: 1;
}

.givep {
  color: #f17c30;
  font-size: 20px;
  font-weight: 500;
}
/* end of style of hero-image area  */

.mild {
  position: absolute;
  top: -20px;
  z-index: 9;
  background: white;
  border-radius: 0.8rem;
}

.bord {
  background: #00000045;
  height: 1px;
}

.input1 {
  border: none;
  max-height: 20rem;
  font-size: 80px;
  font-weight: 500;
}
.input1:focus {
  border: none;
  outline: none;
  max-height: 20rem;
  font-size: 80px;
  font-weight: 500;
}

.clean {
  z-index: 1;
}

.ash {
  position: absolute;
  font-size: 25px;
  font-weight: 400;
  top: 3rem;
  left: 3rem;
  z-index: 1;
}

.fone {
  font-size: 10px;
  font-weight: 300;
  color: #80878d;
}

.hfont {
  font-size: 12px;
  font-weight: 400;
  color: #020f1e;
}

.borderl {
  border-right: 1px solid #dee2e6;
}

.btngive {
  width: 150px;
  background: #136acd;
  color: #fff;
}

.default-color {
  background: #136acd;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

.default-color1:hover {
  background: #0f58ac;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}
</style>