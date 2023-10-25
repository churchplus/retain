<template>
  <!-- This component is not currently in use in production environment, it will be removed in the future eventually -->
  
  <div>
    <!-- navigation section -->
    <div class="row trowc mx-0 py-2 sticky-top">
      <div class="container">
        <div class="row p-2">
          <div
            class="col-md-4 col-sm-6 col-6 d-flex justify-content-start align-self-center"
          >
            <img
              class="img"
              src="../../../assets/ChurchplusLogo2-highres.png"
              alt=""
            />
          </div>
          <div
            class="col-md-2 col-sm-4 offset-3 text-white d-flex justify-content-center align-self-center"
          >
            About the Church
          </div>
          <div
            class="col-1 text-white d-flex justify-content-center align-self-center"
          >
            FAQs
          </div>
          <div class="col-2 justify-content-center align-self-center">
            <a href="#">
              <span class="d-md-inline text-white d-none">
                Your Account &nbsp; <i class="fas fa-user text-white ml-2"></i>
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
    <!--end navigation section -->
    <div class="container-fluid">
      <div class="hero-img">
        <!-- Text area  -->
        <div>
          <div class="row py-3">
            <div
              class="col-12 mb-5 d-flex flex-column justify-content-center text-nowrap text-center text-white py-5"
            >
              <p class="bh">GIVING</p>
              <p class="sh mt-n1">
                Every man according as he purposeth in his heart, <br />
                so let him give, not grudgingly or of necessity for <br />
                God loveth a cheerful giver.
              </p>
            </div>
          </div>
        </div>
        <!--End of Text area -->

        <!-- Form area  -->

        <!-- Form area  -->
        <div class="container">
          <!-- form -header -->
          <div class="row trowc2">
            <div
              class="col-md-12 d-flex py-2 justify-content-center align-self-center text-nowrap text-center text-white"
            >
              <p
                class="col-md-6 d-flex justify-content-start my-0 align-self-center"
              >
                Churchplus International church
              </p>
              <p
                class="col-md-4 my-0 d-flex align-self-center justify-content-end"
              >
                Select currency
              </p>
              <button
                class="px-md-4 outline-none default-btn text-white border-0 but"
              >
                Naira &nbsp; <i class="pi pi-angle-down"></i>
              </button>
            </div>
          </div>
          <!--end of form -header -->

          <!-- form body -->
          <div class="row trowc3 px-5">
            <div
              class="col-md-5 d-flex py-2 justify-content-start align-self-center text-nowrap text-center text-black"
            >
              <div class="col-12 pt-3">
                <div class="row">
                  <div
                    class="col-12 pl-md-0 align-self-start justify-content-center"
                  >
                    <p class="mt-1 d-flex align-self-startmt-2 text-start">
                      Choose an amount
                    </p>
                  </div>
                  <div class="col-md-12 pl-md-0">
                    <div class="row">
                      <div class="col-3 d-flex fon justify-content-center">
                        <button type="button" class="btn-tabs p-2 border">
                          #1000
                        </button>
                      </div>

                      <div class="col-3 d-flex fon justify-content-center">
                        <button type="button" class="btn-tabs p-2 border">
                          #2000
                        </button>
                      </div>

                      <div class="col-3 d-flex fon justify-content-center">
                        <button type="button" class="btn-tabs p-2 border">
                          #5000
                        </button>
                      </div>

                      <div class="col-3 d-flex fon justify-content-center">
                        <button type="button" class="btn-tabs p-2 border bt">
                          #10,000
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              class="col-md-2 d-flex flex-column justify-content-center align-items-center"
            >
              <div class="row">
                <div class="col-12 line mt-n3">
                  <hr />
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <strong>OR</strong>
                </div>
              </div>
              <div class="row">
                <div class="col-12 line mt-3">
                  <hr />
                </div>
              </div>
            </div>

            <div class="col-md-5 pt-3">
              <div class="row d-flex flex-column">
                <div class="col-md-12 pl-md-0">
                  <p class="my-2 text-right pr-4">Enter any amount</p>
                </div>
                <div class="col-md-12 text-right py-2">
                  <input
                    class="input1 px-0 text-center border"
                    type="text"
                    value="#50,000"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- input area -->
          <div class="row trowc3 p-5">
            <div class="col-12">
              <p class=""></p>
              <div class="col-12 border d-flex flex-column mt-n2 mb-3">
                <span class="mb-n2 mt-1 show fone"
                  >How often do you want to give?</span
                >
                <Dropdown
                  class="fone w-100 py-0 border-0 nooutline"
                  v-model="selectedPeriodOptions"
                  :options="periods"
                  optionLabel="type"
                  placeholder="Select"
                />
              </div>
            </div>
            <div class="col-12 py-3">
              <p class=""></p>
              <div class="col-12 border d-flex flex-column mt-n2">
                <span class="mb-n2 mt-1 show fone">Start date</span>
                <input
                  type="date"
                  class="form-control border-0 nooutline text-left"
                  v-model="date"
                />
              </div>
            </div>

            <!-- <div class="col-12 py-3">
              <section>
                <div class="row d-flex">
                  <p class="col-4 hfont mb-1">Choose Offering type</p>
                  <p class="col-4 hfont offset-1 mb-1">Enter Amount</p>
                </div>

                <div class="col-12 mt-1">
                  <div class="row border rounded">
                    <div class="col-5 fone p-2 text-left borderl">
                      <Dropdown
                        class="fone w-100 py-0 border-0 nooutline borderl"
                        v-model="selectedContributionType"
                        :options="funds"
                        optionLabel="type"
                        placeholder="Select"
                      />
                    </div>

                    <div class="col-5 p-2 fone text-center btn-default borderl">
                      <input
                        class="input2 px-0 col-md-12 text-left border-0"
                        type="text"
                        value="#50,000"
                        placeholder="Enter amount"
                      />
                    </div>

                    <div
                      class="col-2 d-flex align-items-center align-middle justify-content-end"
                    >
                      <i class="fas fa-trash-alt pr-3"></i>
                    </div>
                  </div>
                </div>
              </section>
            </div> -->

            <div class="col-12 py-3">
              <section>
                <div class="row d-flex">
                  <p class="col-4 hfont mb-1">Choose Contribution Type</p>
                  <p class="col-4 hfont offset-2 mb-1">Enter Amount</p>
                </div>

                <div class="col-12 mt-1 py-2">
                  <div
                    class="row rounded py-2"
                    v-for="(item, index) in contributionType"
                    :key="index"
                  >
                    <div class="col-5 fone p-2 text-left border">
                      <Dropdown
                        class="fone w-100 py-0 nooutline border-0"
                        v-model="item.selectedContributionType"
                        :options="funds"
                        optionLabel="type"
                        placeholder="Select"
                      />
                    </div>

                    <div
                      class="col-5 p-2 fone text-center offset-1 btn-default border"
                    >
                      <input
                        class="input2 px-0 py-1 col-md-12 text-left border-0"
                        type="text"
                        v-model="item.amount"
                        placeholder="Enter amount"
                      />
                    </div>

                    <div
                      class="col-1 d-flex align-items-center align-middle justify-content-end"
                      v-if="contributionType.length > 1"
                    >
                      <i
                        class="fas fa-trash pr-3 trash x3"
                        @click="putInTrash(index)"
                      ></i>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <div class="col-12 py-3">
              <section>
                <div class="col-12 mt-1">
                  <div class="row rounded">
                    <div class="col-5 fone p-2 text-left">
                      <button
                        class="px-md-4 outline-none default-btn border"
                        @click="addMore()"
                      >
                        <i class="pi pi-plus-circle"></i> &nbsp; Add More
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <div class="col-12 py-4 md">
              <section>
                <div class="col-12 mt-1">
                  <div class="row rounded">
                    <div class="col-5 p-2 text-left borderr">
                      <span class="mb-n2 mt-1 hfont show">Name</span>
                      <input
                        class="input2 py-1 col-md-12 text-left border-0 mi px-0"
                        type="text"
                        placeholder="tosin Ajose"
                      />
                    </div>

                    <div class="col-5 p-2 offset-1 btn-default borderr">
                      <span class="mb-n2 mt-1 hfont show">Email</span>
                      <input
                        class="input2 py-1 col-md-12 text-left border-0 mi px-0"
                        type="text"
                        placeholder="@gmail.com"
                      />
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <div class="col-12 py-1">
              <section>
                <div class="col-12 mt-1">
                  <div class="row">
                    <div class="col-12 text-center fs">
                      <p>
                        All Donation and Contributions will be converted to
                        naira before processing however your cards will be
                        charged the equivalent in your currency.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <!-- button section -->
            <div class="col-12 py-1">
              <section>
                <div class="col-12 mt-1">
                  <div class="row">
                    <div class="col-12 text-center">
                      <div class="row">
                        <div class="col-md-12 text-center mt-4">
                          <button class="btn btn-default bt btt">
                            GIVE NOW
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <!--end of button section -->
          </div>

          <div class="row py-5">
            <div class="col-md-2 text-white text-nowrap px-0">
              <p>Payment Channels</p>
            </div>
            <div class="col-md-6 offset-1">
              <img
                class="img"
                src="../../../assets/Imageofpaymethod.png"
                alt=""
              />
            </div>
            <div class="row">
              <div class="col-md-12">
                <img
                  class="img"
                  src="../../../assets/ChurchplusLogo2-highres.png"
                  alt=""
                />
              </div>
            </div>
          </div>
          <!--end of input area -->
        </div>
        <!--end of form body -->

        <!--End of Form area -->
      </div>
    </div>
  </div>
</template>

<script>
  import { ref } from "vue";
  import Dropdown from "primevue/dropdown";
  import axios from "@/gateway/backendapi";

  export default {
    components: {
      Dropdown
    },
    setup() {
      const date = ref(new Date().toISOString().substr(0, 10));
      const selectedPeriodOptions = ref("");
      const inputFields = ref([]);
      const contributionType = ref([{ type: "Welfare & Benevolent" }]);

      const addMore = () => {
        contributionType.value.push({});
        inputFields.value = "";
      };

      const putInTrash = (index) => {
        contributionType.value.splice(index, 1);
      };

      const periods = ref([
        { type: "Weekly" },
        { type: "Every two weeks" },
        { type: "Monthly" },
        { type: "1st & 15th Monthly" },
        { type: "Once" },
      ]);

      const selectedContributionType = ref({});
      const funds = ref([]);

      const addfunds = () => {
        axios
          .get(
            "/api/PaymentForm/GetOne/give?paymentFormID=75C7C529-D2E3-467B-938D-1B48B0B5EB76"
          )
          .then((res) => {
            funds.value = res.data;
            console.log(funds.value, "kjjjhjjjje");
            console.log(res);
          })
          .catch((err) => console.log(err.response));
      };
      addfunds();

      return {
        periods,
        funds,
        selectedPeriodOptions,
        selectedContributionType,
        date,
        addMore,
        inputFields,
        contributionType,
        putInTrash,
        axios,
      };
    },
  };
</script>

<style scoped>
  .trash {
    border-radius: 50%;
    padding: 14px;
    background-color: #6c04204d;
    color: #6c0420;
  }

  .trowc {
    background: #20080e;
  }
  .trowc2 {
    background: #6c0420;
  }
  .trowc3 {
    background: #fff;
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

  .img {
    max-width: 40%;
    height: auto;
    -o-object-fit: cover;
    object-fit: cover;
  }

  .hero-img {
    width: 100%;
    background-image: url(../../../assets/form2img.png);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    -o-object-fit: cover;
    object-fit: cover;
  }

  .po {
    position: absolute;
    top: 28%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
  }

  .bh {
    font-size: 6rem;
    font-weight: bold;
    font-kerning: inherit;
  }

  .sh {
    font-size: 1.5rem;
    font-weight: lighter;
    font-kerning: inherit;
  }

  .po2 {
    position: absolute;
    top: 108%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
  }

  /* style for card area */
  .but {
    background: #20080e;
    color: #fff;
  }
  /*end of style for card area */

  /* style for card body */
  .input1 {
    font-size: 25px;
    font-weight: bold;
    cursor: pointer;
  }
  .input1:focus {
    outline: none;
    font-size: 25px;
    font-weight: bold;
    cursor: pointer;
  }
  .input2 {
    font-size: 20px;
    font-weight: normal;
    cursor: pointer;
  }
  .input2:focus {
    outline: none;
    font-size: 20px;
    font-weight: normal;
    cursor: pointer;
  }

  .fon {
    font-size: 15px;
    font-weight: 200;
    color: #80878d;
  }

  .btn-tabs {
    outline: none;
    background-color: #fff;
    border-radius: 4px;
  }

  .bt {
    background: #6c0420;
    color: #fff;
  }

  .line {
    /* background-color: #c80000; */
    color: #020f1e;
    transform: rotate(90deg);
    -webkit-transform: rotate(90deg);
    position: absolute;
    width: 50px;
    height: 5px;
    left: 80px;
    border: 2px;
  }

  .show {
    z-index: 1;
  }

  .nooutline:focus {
    outline: none;
    border: none;
  }

  .borderl {
    border-right: 1px solid #dee2e6;
  }

  /* mid-bottompart color */

  .md {
    background: #70707029;
  }
  /* mid-bottompart color */
  .mi {
    background: transparent;
  }

  .borderr {
    border: 1px solid #70707029;
  }

  .btt {
    width: 236px;
    height: 67px;
    border-radius: 10px;
  }

  .fs {
    font-size: 15px;
    font-weight: 300;
  }
  /*end of style for card body */
</style>
