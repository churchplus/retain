
<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-6">
        <!-- top Address -->
        <div
          class="row vh-100 justify-content-center align-items-md-center align-items-start"
        >
          <div class="col-md-12">
            <div
              class="row eventpictbg justify-content-center d-block d-md-none"
            >
              <div class="col-md-12 d-flex justify-content-center mb-4">
                <img :src="bannerUrl" class="col-10 col-md-12" />
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-md-12 mb-3 text-center">
                <span class="font-weight-bold h4 primary--text">
                  {{ eventData.name }}
                </span>
                <span v-if="fullEventData.registrationAmount">
                  - {{ tenantCurrency }}
                  {{ fullEventData.registrationAmount }}</span
                >
                <div class="font-weight-bold">Event Registration</div>
                <div class="italicize">{{ eventData.date }}</div>
              </div>
            </div>

            <div
              class="row d-flex justify-content-center"
              v-if="
                fullEventData.registrationCutOffTime &&
                new Date().toISOString() >=
                  new Date(fullEventData.registrationCutOffTime).toISOString()
              "
            >
              <img
                src="../../assets/registration_closed.jpeg"
                class="event-closed"
              />
            </div>

            <!--end top Address -->

            <!-- top area -->
            <div class="row">
              <div class="col-md-3"></div>
              <div class="col-md-7">
                <p
                  class="font-weight-600 text-center primary-text"
                  v-if="person.personId && loaded && !showLoading"
                >
                  Your details were found, please confirm to register.
                </p>
                <p
                  class="font-weight-600 text-center primary-text"
                  v-if="
                    !person.personId &&
                    !showLoading &&
                    loaded &&
                    !fetchingFailed
                  "
                >
                  Please fill the form and confirm the registration
                </p>
              </div>
            </div>

            <div
              class="row"
              v-if="
                !fullEventData.registrationCutOffTime ||
                new Date().toISOString() <=
                  new Date(fullEventData.registrationCutOffTime).toISOString()
              "
            >
              <div
                class="col-md-3 d-md-flex align-items-center justify-content-end text-md-right mt-1 font-weight-700"
              >
                <label for="">Phone Number</label>
              </div>
              <div class="col-md-7">
                <span class="p-input-icon-left w-100">
                  <!-- <i class="pi pi-phone icon" /> -->
                  <!-- <input @blur="checkCharacter" @input="CheckXterAfterEleven" class="form-control w-100" type="text"
                  v-model="enteredValue" aria-required="" placeholder="Enter your phone number" /> -->
                  <el-input
                    @blur="checkCharacter"
                    class="w-100"
                    type="number"
                    v-model="enteredValue"
                    aria-required=""
                    placeholder="Enter your phone number"
                  >
                    <template #prefix>
                      <el-icon class="el-input__icon">
                        <PhoneFilled />
                      </el-icon>
                    </template>
                  </el-input>
                </span>
                <!-- v-if="autosearch && !person.name" -->
              </div>
              <div
                class="col-3 offset-3 offset-sm-4 offset-md-5 mt-4"
                v-if="!names"
              >
                <el-button
                  size="large"
                  round
                  :color="primarycolor"
                  class="w-100 text-white border-0 text-center c-pointer"
                  >Register</el-button
                >
              </div>
            </div>

            <div class="row mb-4">
              <div class="col-md-3"></div>
              <div class="col-md-5 offset-1">
                <div class="loading-div my-5" v-if="showLoading">
                  <div style="width: 3rem; height: 3rem" role="status">
                    <el-icon class="is-loading">
                      <Loading />
                    </el-icon>
                  </div>
                  <p>Fetching your details...</p>
                </div>
                <!-- v-if="autosearch && !person.name" -->
              </div>
            </div>
            <!-- end of top area -->

            <!--start of top area button -->
            <div class="row" :class="{ 'mb-4': showLoading }" v-if="false">
              <div class="col-md-3 text-md-right"></div>
              <div
                class="col-md-5 text-center col-sm-2"
                :class="{ 'mt-4': showLoading }"
              >
                <p
                  class="text-danger"
                  v-if="showNoPhoneError"
                  :class="{ 'my-1': showLoading }"
                >
                  Please enter your phone number
                </p>
                <el-button
                  class="default-btn add-btn"
                  @click="checkCharacter"
                  ref="submitBtn"
                  v-if="!appltoggle && !showLoading"
                  round
                >
                  <!-- <i class="fas fa-circle-notch fa-spin" v-if="loading"></i> -->
                  Submit
                </el-button>
              </div>
            </div>
            <!--end of top area button -->

            <!-- start of bottom area -->
            <div class="row" v-if="appltoggle && !showLoading">
              <div class="col-md-12">
                <div
                  class="row"
                  v-if="
                    selectedCustomField.find(
                      (i) => i.toLowerCase() == 'card/checkin number'
                    )
                  "
                >
                  <div
                    class="col-md-3 d-md-flex align-items-center justify-content-end text-md-right mt-2 font-weight-700"
                  >
                    <label for="">Card number</label>
                  </div>
                  <div class="col-md-7">
                    <el-input
                      class="w-100 border"
                      placeholder="Card Number"
                      type="text"
                      aria-required=""
                      v-model="checkinCode"
                    />
                  </div>
                </div>

                <div class="row mt-2 my-2">
                  <div
                    class="col-md-3 d-md-flex align-items-center justify-content-end text-md-right mt-2 font-weight-700"
                  >
                    <label for="">Name</label>
                  </div>
                  <div class="col-md-7">
                    <span class="p-input-icon-left w-100">
                      <el-input
                        class="w-100"
                        type="text"
                        v-model="person.name"
                        aria-required=""
                        :disabled="disabled"
                        placeholder="Name"
                      >
                        <template #prefix>
                          <el-icon class="el-input__icon">
                            <User />
                          </el-icon>
                        </template>
                      </el-input>
                    </span>
                  </div>
                </div>
                <div class="row">
                  <div
                    class="col-md-3 d-md-flex align-items-center justify-content-end text-md-right mt-2 font-weight-700"
                  >
                    <label for="">Email</label>
                  </div>
                  <div class="col-md-7">
                    <span class="p-input-icon-left w-100 my-md-3">
                      <el-input
                        class="w-100"
                        type="text"
                        v-model="person.email"
                        aria-required=""
                        :disabled="
                          (person.personId && personData.email) ||
                          (personData.email !== '' && personData.email !== null)
                        "
                        placeholder="Email"
                      >
                        <template #prefix>
                          <el-icon class="el-input__icon">
                            <Message />
                          </el-icon>
                        </template>
                      </el-input>
                    </span>
                  </div>
                </div>

                <div
                  class="row my-2"
                  v-if="
                    selectedCustomField.find(
                      (i) => i.toLowerCase() == 'address'
                    )
                  "
                >
                  <div
                    class="col-md-3 d-md-flex align-items-center justify-content-end text-md-right mt-2 font-weight-700"
                  >
                    <label for="">Address</label>
                  </div>
                  <div class="col-md-7">
                    <span class="p-input-icon-left w-100">
                      <el-input
                        class="w-100 border"
                        type="text"
                        v-model="person.address"
                        aria-required=""
                        :disabled="personHasAddress"
                        placeholder="Address"
                      >
                        <template #prefix>
                          <el-icon class="el-input__icon">
                            <Location />
                          </el-icon>
                        </template>
                      </el-input>
                    </span>
                  </div>
                </div>

                <div
                  class="row my-3"
                  v-if="
                    selectedCustomField.find(
                      (i) => i.toLowerCase() == 'birthday'
                    )
                  "
                >
                  <div
                    class="col-md-3 d-md-flex align-items-center justify-content-end text-md-right mt-2 font-weight-700"
                  >
                    <label for="">Birthday</label>
                  </div>
                  <div class="col-md-7">
                    <div class="row">
                      <div class="col-6">
                        <el-select-v2
                          v-model="birthDay"
                          class="w-100"
                          placeholder="Day"
                          :options="[
                            { label: 'Day', value: 0 },
                            ...days.map((i) => ({ label: i, value: i })),
                          ]"
                          size="large"
                        />
                      </div>
                      <div class="col-6">
                        <el-select-v2
                          v-model="birthMonth"
                          class="w-100"
                          placeholder="Month"
                          :options="[
                            { label: 'Month', value: 0 },
                            ...months.map((i) => ({ label: i, value: i })),
                          ]"
                          size="large"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="row my-3"
                  v-if="
                    selectedCustomField.find(
                      (i) => i.toLowerCase() == 'wedding'
                    )
                  "
                >
                  <div
                    class="col-md-3 d-md-flex align-items-center justify-content-end text-md-right mt-2 font-weight-700"
                  >
                    <label for="">Wedding</label>
                  </div>
                  <div class="col-md-7">
                    <div class="row">
                      <div class="col-4">
                        <el-select-v2
                          v-model="dayOfWedding"
                          class="w-100"
                          placeholder="Day"
                          :options="[
                            { label: 'Day', value: 0 },
                            ...days.map((i) => ({ label: i, value: i })),
                          ]"
                          size="large"
                        />
                      </div>
                      <div class="col-4">
                        <el-select-v2
                          v-model="monthOfWedding"
                          class="w-100"
                          placeholder="Month"
                          :options="[
                            { label: 'Month', value: 0 },
                            ...months.map((i) => ({ label: i, value: i })),
                          ]"
                          size="large"
                        />
                      </div>
                      <div class="col-4">
                        <el-select-v2
                          v-model="yearOfWedding"
                          class="w-100"
                          placeholder="Year"
                          :options="[
                            { label: 'Year', value: 0 },
                            ...weddingYearsArr.map((i) => ({
                              label: i,
                              value: i,
                            })),
                          ]"
                          size="large"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="row my-3"
                  v-if="
                    selectedCustomField.find(
                      (i) => i.toLowerCase() == 'marital status'
                    )
                  "
                >
                  <div
                    class="col-md-3 d-md-flex align-items-center justify-content-end text-md-right mt-2 font-weight-700"
                  >
                    <label for="">Marital Status</label>
                  </div>
                  <div class="col-md-7">
                    <el-select-v2
                      v-model="maritalStatusId"
                      @change="setSelectedMaritalStatus"
                      :options="
                        maritalStatus.map((i) => ({
                          label: i.value,
                          value: i.id,
                        }))
                      "
                      placeholder="Marital status"
                      size="large"
                      class="w-100"
                    />
                  </div>
                </div>
                <div
                  class="row my-3"
                  v-if="
                    selectedCustomField.find((i) => i.toLowerCase() == 'gender')
                  "
                >
                  <div
                    class="col-md-3 d-md-flex align-items-center justify-content-end text-md-right mt-2 font-weight-700"
                  >
                    <label for="">Gender</label>
                  </div>
                  <div class="col-md-7">
                    <el-select-v2
                      v-model="genderId"
                      @change="setSelectedGender"
                      :options="
                        gender && gender.length > 0
                          ? gender.map((i) => ({ label: i.value, value: i.id }))
                          : []
                      "
                      placeholder="Gender"
                      size="large"
                      class="w-100"
                    />
                  </div>
                </div>
                <div
                  class="row my-3"
                  v-for="item in dynamicCustomFields"
                  :key="item.id"
                >
                  <div
                    class="col-md-3 d-md-flex align-items-center justify-content-end text-md-right mt-2 font-weight-700"
                  >
                    <label for="">{{ item.label }}</label>
                  </div>
                  <div class="col-md-7">
                    <el-input
                      v-if="item.controlType == 0"
                      class="w-100"
                      type="text"
                      aria-required=""
                      v-model="item.data"
                    />
                    <el-select-v2
                      v-else-if="item.controlType == 1"
                      v-model="item.data"
                      :options="
                        item.parameterValues
                          .split(',')
                          .map((i) => ({ label: i, value: i }))
                      "
                      placeholder="Select option"
                      size="large"
                      class="w-100"
                    />
                    <el-checkbox
                      v-else-if="item.controlType == 2"
                      v-model="item.data"
                    />
                    <el-date-picker
                      v-if="item.controlType == 3"
                      v-model="item.data"
                      type="datetime"
                      format="DD/MM/YYYY hh:mm:ss"
                      size="large"
                      class="w-100"
                    />
                    <el-input
                      v-if="item.controlType == 4"
                      class="w-100 border"
                      type="email"
                      aria-required=""
                      v-model="item.data"
                    />
                    <input
                      v-if="item.controlType == 5"
                      class="w-100 border"
                      type="file"
                      aria-required=""
                    />
                    <el-input
                      v-if="item.controlType == 6"
                      class="w-100 border"
                      type="number"
                      aria-required=""
                      v-model="item.data"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-8 offset-md-3 mt-3 align-self-center">
                    <el-checkbox v-model="displayFamily" />
                    <span class="ml-3"
                      >Do you want to register your family for this event?</span
                    >
                  </div>
                </div>

                <div class="row mt-4" v-if="displayFamily">
                  <FamilyWards
                    :family="familyWards"
                    :memberRoles="memberRoles"
                    :fullEventData="fullEventData"
                    @newmember="setNewMember"
                    @nofamilynewmember="setMemberDetails"
                  />
                </div>

                <div class="row my-2">
                  <div class="col-md-12">
                    <div class="row justify-content-center">
                      <div
                        class="col-md-5 d-flex justify-content-center cursor-pointer"
                      >
                        <div class="font-weight-bold" round @click="notme">
                          <u>Not Me</u>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-12 py-3 text-center">
                    <div class="row justify-content-center">
                      <div class="col-md-6">
                        <el-button
                          data-toggle="modal"
                          class="w-100"
                          data-target="#PaymentOptionModal"
                          :color="primarycolor"
                          @click="confirmCheck()"
                          v-if="fullEventData.paymentFormId"
                          :disabled="
                            !person.name ||
                            person.name.length < 1 ||
                            !person.email ||
                            disableClick
                          "
                          round
                        >
                          Make payment to register
                        </el-button>
                        <el-button
                          size="large"
                          class="mt-3 w-100 mt-sm-0 text-white"
                          :color="primarycolor"
                          @click="confirmToRegister"
                          :disabled="
                            !person.name ||
                            person.name.length < 1 ||
                            disableClick
                          "
                          round
                          v-else
                        >
                          Confirm to register
                        </el-button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="row justify-content-center"
              v-if="
                fullEventData.registrationCutOffTime &&
                new Date().toISOString() <=
                  new Date(fullEventData.registrationCutOffTime).toISOString()
              "
            >
              <div class="col-10  col-md-5 text-center ">
                <!-- Button code -->
                <div title="Add to Calendar" class="addeventatc w-100">
                  Add to Calendar
                  <span class="start">{{ fullEventData.eventDate }}</span>
                  <span class="timezone">{{
                    Intl.DateTimeFormat().resolvedOptions().timeZone
                  }}</span>
                  <span class="title">{{ eventData.name }}</span>
                  <span class="description">{{
                    fullEventData.eventDetails
                  }}</span>
                </div>
              </div>
            </div>

            <div class="row mt-3">
              <div
                class="col-md-3 d-md-flex align-items-center justify-content-end text-md-right mt-3 font-weight-700"
              ></div>
              <div class="col-md-7 mt-2">
                <p class="text-center fw-normal" style="color: #136acd">
                  Powered by CHURCHPLUS
                </p>
              </div>
              <!-- Modal -->
              <div
                class="modal fade"
                id="PaymentOptionModal"
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModalCenterTitle"
                aria-hidden="true"
              >
                <div class="modal-dialog modal-dialog-centered" role="document">
                  <div class="modal-content">
                    <div class="modal-header bg-modal">
                      <h5 class="modal-title" id="exampleModalLongTitle">
                        Payment methods
                      </h5>
                      <button
                        type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true" ref="close">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body p-0 bg-modal pb-5">
                      <PaymentOptionModal
                        :formData="eventPaymentForm"
                        :close="close"
                        :donation="donationObj"
                        @selectedgateway="setGateway"
                        :currency="paymentFormCurrency"
                        @donationconfirmed="setConfirmDonation"
                        :initializePaymentResponse="initializePaymentResponse"
                        :callPayment="callPayment"
                        @resetcallpaymentprops="resetCallPayment"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6 eventpictbg d-none d-md-block">
        <div class="row vh-100 justify-content-center align-items-center">
          <div class="col-md-11">
            <img :src="bannerUrl" class="w-100" />
          </div>
        </div>
      </div>
    </div>
  </div>

  <pre ref="content" style="white-space: pre-wrap"></pre>
</template>


<script>
import { computed, ref, inject } from "vue";
import axios from "@/gateway/backendapi";
// import router from "../../router/index";
import { useRoute } from "vue-router";
import dateFormatter from "@/services/dates/dateformatter";
import stopProgressBar from "../../services/progressbar/progress";
import swal from "sweetalert";
import PaymentOptionModal from "../../components/paymentoption/EventRegPayment.vue";
import finish from "../../services/progressbar/progress";
import store from "../../store/store";
import FamilyWards from "./component/EventRegFamilyWards.vue";
import { ElMessage } from "element-plus";
import { ElLoading } from "element-plus";
export default {
  components: {
    PaymentOptionModal,
    FamilyWards,
  },
  setup() {
    const primarycolor = inject("primarycolor");
    const connectName = ref("");
    const yearOfWedding = ref(null);
    const monthOfWedding = ref(null);
    const dayOfWedding = ref(null);
    const selectedMaritalStatus = ref("");
    const selectedGender = ref("");
    const appltoggle = ref(false);
    const names = ref("");
    const emails = ref("");
    const address = ref("");
    const enteredValue = ref("");
    const loading = ref(false);
    const autosearch = ref(false);
    const noError = ref(true);
    const person = ref({});
    const maritalStatus = ref({});
    const route = useRoute();
    const submitBtn = ref(null);
    const loaded = ref(false);
    const close = ref("");
    const donationObj = ref({});
    const fullEventData = ref({});
    const selectedGateway = ref("");
    const currentUser = ref(store.getters.currentUser);
    const displayFamily = ref(false);
    const memberRoles = ref([]);
    const familyWards = ref({ familyMembers: [] });
    const familyMembers = ref([]);
    const authorizebutton = ref();
    const signout = ref();
    const content = ref();
    const disableClick = ref(false);
    const usedPaymentGateway = ref("");
    const donationNewProps = ref({});
    const maritalStatusId = ref(null);
    const birthMonth = ref("");
    const gender = ref({});
    const genderId = ref(null);
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const birthDay = ref("");
    const days = ref([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 22,
      23, 24, 25, 26, 27, 28, 29, 30, 31,
    ]);
    const eventPaymentForm = ref({});
    const callPayment = ref(false);
    const initializePaymentResponse = ref({});
    const paymentFormCurrency = ref({});

    const setSelectedMaritalStatus = () => {
      selectedMaritalStatus.value = maritalStatus.value.find((i) => {
        return i.id == maritalStatusId.value;
      });
    };

    const setSelectedGender = () => {
      selectedGender.value = gender.value.find((i) => {
        return i.id == genderId.value;
      });
    };
    const weddingYearsArr = computed(() => {
      const arrOfYears = [];
      let currentYear = new Date().getFullYear();
      while (arrOfYears.length <= 100) {
        arrOfYears.push(currentYear);
        currentYear = currentYear - 1;
      }
      return arrOfYears;
    });

    const toggleBase = () => {
      appltoggle.value = !appltoggle.value;
    };

    const email = computed(() => {
      if (person.value.email) return maskEmail(person.value.email);
      return "";
    });
    const name = computed(() => {
      if (person.value.name) return formatString(person.value.name);
      return "";
    });
    const userAddress = computed(() => {
      if (person.value.email) return formatString(address.value.name);
      return "";
    });

    // searching through the attendance details
    const showNoPhoneError = ref(false);
    const fetchingFailed = ref(false);
    const personHasAddress = ref(false);
    const personData = ref({});
    const bannerUrl = ref("");
    const tenantCurrency = ref("");
    const selectedCustomField = ref([]);
    const checkinCode = ref("");
    const dynamicCustomFields = ref([]);
    const date7 = ref();

    const getTenantCurrency = () => {
      axios
        .get(
          `/api/Lookup/TenantCurrency?tenantID=${fullEventData.value.tenantID}`
        )
        .then((res) => {
          tenantCurrency.value = res.data.currency;
        })
        .catch((err) => console.log(err));
    };

    const GetAllCurrencies = () => {
      axios
        .get("/api/LookUp/GetAllCurrencies")
        .then((res) => {
          // Get the payment form currency
          paymentFormCurrency.value = res.data.find(
            (i) => i.id == fullEventData.value.currencyID
          );

          console.log(paymentFormCurrency.value);
        })
        .catch((err) => console.log(err.response));
    };

    const checkCharacter = () => {
      loaded.value = false;
      personHasAddress.value = false;
      fetchingFailed.value = false;
      showNoPhoneError.value = false;
      if (!enteredValue.value) {
        showNoPhoneError.value = true;
        return false;
      }
      loading.value = true;
      autosearch.value = true;
      axios
        .get(
          `/searchregistrationbyphone?searchtext=${enteredValue.value}&id=${route.params.checkinId}`
        )

        .then((res) => {
          loading.value = false;
          autosearch.value = false;
          loaded.value = true;
          names.value = res.data;
          personData.value.firstName =
            res.data.length > 0 ? res.data[0].name.split(" ")[0] : "";
          personData.value.lastName =
            res.data.length > 0 ? res.data[0].name.split(" ")[1] : "";
          personData.value.email = res.data.length > 0 ? res.data[0].email : "";
          personData.value.homeAddress =
            res.data.length > 0 ? res.data[0].address : "";
          personData.value.personId =
            res.data.length > 0 ? res.data[0].personId : "";
          personData.value.dayOfBirth =
            res.data.length > 0 ? res.data[0].dayOfBirth : "";
          personData.value.monthOfBirth =
            res.data.length > 0 ? res.data[0].monthOfBirth : "";
          personData.value.mobilePhone =
            res.data.length > 0 ? res.data[0].phoneNumber : "";
          person.value = res.data.length > 0 ? res.data[0] : {};
          birthDay.value =
            res.data.length > 0 && res.data[0].dayOfBirth
              ? Number(res.data[0].dayOfBirth)
              : 0;
          birthMonth.value =
            res.data.length > 0 && res.data[0].monthOfBirth
              ? months[Number(res.data[0].monthOfBirth) - 1]
              : 0;

          getFamilyDetails(personData.value.personId);
          if (
            person.value.personId &&
            person.value.address &&
            person.value.address !== null &&
            person.value.address !== "" &&
            person.value.address.length >= 1
          ) {
            personHasAddress.value = true;
          }
          populateInputfields(person.value);
          if (person.value) appltoggle.value = true;
        })
        .catch((err) => {
          fetchingFailed.value = true;
          person.value = {};
          loaded.value = true;
          loading.value = false;
          autosearch.value = false;

          if (err.toString().toLowerCase().includes("network error")) {
            ElMessage({
              type: "error",
              message: "Ensure you have internet access and try again",
              duration: 5000,
            });
          } else if (err.message.includes("timeout")) {
            ElMessage({
              type: "error",
              message:
                "The request was taking too long, please reload and try again",
              duration: 5000,
            });
          } else {
            ElMessage({
              type: "error",
              message: "An error occurred, reload and try again",
              duration: 5000,
            });
          }
          console.log(err);
        });
    };
    //end of searching through the attendance details

    // populate input fields
    const populateInputfields = (obj) => {
      person.value = obj;
    };

    const disabled = computed(() => {
      if (person.value.personId) return true;
      return false;
    });

    // function to disable edit
    const disableEdit = (e) => {
      e.preventDefault();
    };

    // confirm status
    const confirm = (idOfNewPerson) => {
      // person.value.attendanceCode = +route.params.code;
      let newPerson = {};
      if (person.value.personId) {
        newPerson = {
          person: {
            personId: personData.value.personId,
            mobilePhone: enteredValue.value,
            homeAddress: personData.value.homeAddress
              ? personData.value.homeAddress
              : "",
            email: personData.value.email ? person.value.email : "",
          },
          id: route.params.checkinId,
        };
      } else {
        newPerson = {
          person: {
            firstName: person.value.name,
            email: person.value.email,
            homeAddress: person.value.address,
            mobilePhone: enteredValue.value,
          },
          id: route.params.checkinId,
        };
        newPerson.person.personId = idOfNewPerson ? idOfNewPerson : "";
      }
      newPerson.person.monthOfBirth = months.indexOf(birthMonth.value) + 1;
      newPerson.person.dayOfBirth = birthDay.value;
      newPerson.checkinCode = fullEventData.value.checkinCode;
      newPerson.person.maritalStatusID = selectedMaritalStatus.value.id;
      newPerson.person.genderID = selectedGender.value.id;
      newPerson.person.yearOfWedding = yearOfWedding.value;
      newPerson.person.monthOfWedding =
        months.indexOf(monthOfWedding.value) + 1;
      newPerson.person.dayOfWedding = dayOfWedding.value;
      newPerson.customAttributeData = dynamicCustomFields.value.map((i) => ({
        customAttributeID: i.id,
        data: i.data,
        entityID: person.value.personId ? person.value.personId : idOfNewPerson,
      }));
      loading.value = true;
      autosearch.value = true;
      noError.value = true;
      axios
        .post("/EventRegistration", newPerson)
        .then((res) => {
          loading.value = false;
          autosearch.value = false;
          disableClick.value = false;

          swal(
            "Registration Successful!",
            "You have registered for this event successfully!",
            "success"
          );
          appltoggle.value = false;
          loaded.value = false;
        })
        .catch((err) => {
          stopProgressBar();
          loading.value = false;
          autosearch.value = false;
          console.log(err);
          noError.value = false;

          if (err.toString().toLowerCase().includes("network error")) {
            ElMessage({
              type: "error",
              message:
                "Please ensure you have a strong internet connection and try again",
              duration: 5000,
            });
          } else if (err.toString().toLowerCase().includes("timeout")) {
            ElMessage({
              type: "warning",
              message:
                "Request took too long, Please reload the page and try again",
              duration: 5000,
            });
          }
        });
    };

    // confirm button check

    const confirmCheck = () => {
      donationObj.value = {
        attendanceCode: fullEventData.value.attendanceCode,
        activityId: fullEventData.value.eventID,
        phone: enteredValue.value,
        email: person.value.email,
        checkInCode: fullEventData.value.checkinCode,
        id: fullEventData.value.id,
        person: person.value.personId
          ? personData.value
          : {
              mobilePhone: enteredValue.value,
              firstName: person.value.name.split(" ")[0]
                ? person.value.name.split(" ")[0]
                : "",
              lastName: person.value.name.split(" ")[1]
                ? person.value.name.split(" ")[1]
                : "",
              email: person.value.email ? person.value.email : "",
            },
        customAttributeData: dynamicCustomFields.value.map((i) => ({
          customAttributeID: i.id,
          data: i.data,
          entityID: person.value.personId
            ? person.value.personId
            : "00000000-0000-0000-0000-000000000000",
        })),
        donation: {
          name: person.value.name,
          email: person.value.email,
          phone: enteredValue.value,
          paymentFormId: fullEventData.value.paymentFormId,
          tenantID: fullEventData.value.paymentForm.tenantID,
          orderID: fullEventData.value.paymentFormOrderID,
          currencyID: fullEventData.value.currencyID,
          paymentGateway: usedPaymentGateway.value,
          paymentGateWays: fullEventData.value.paymentForm.paymentGateWays,
          amount: fullEventData.value.registrationAmount,
          contributionItems:
            fullEventData.value.paymentForm.contributionItems.map((i) => {
              return {
                contributionItemId: i.financialContribution.id,
                contributionCurrencyId: fullEventData.value.currencyID,
                contributionItemName: i.financialContribution.name,
                amount: fullEventData.value.registrationAmount,
              };
            }),
        },
      };
    };

    const initializePayment = async () => {
      const loading = ElLoading.service({
        lock: true,
        text: "Please wait...",
        background: "rgba(255, 255, 255, 0.9)",
      });
      try {
        let { data } = await axios.post(
          "/initializeEventRegistrationPayment",
          donationObj.value
        );
        if (data.status) {
          initializePaymentResponse.value = data;
          callPayment.value = true;
        } else {
          ElMessage({
            type: "error",
            message: "Could not initialise payment, please try again",
            duration: 5000,
          });
        }
        loading.close();
        finish();
      } catch (error) {
        finish();
        loading.close();
        callPayment.value = false;
        console.log(error);
      }
    };

    const confirmToRegister = () => {
      disableClick.value = true;
      // Scenerio when the person exist and we want to create family
      if (personData.value.personId && !familyWards.value.id) {
        if (displayFamily.value) {
          // Create his family
          let familyDetails = {
            fatherId: personData.value.personId,
            familyName: personData.value.firstName,
            familyMembers: familyMembers.value.map((i) => {
              delete i.name;
              return i;
            }),
            tenantId: fullEventData.value.tenantID,
          };
          axios
            .post("/createFamily", familyDetails)
            .then((res) => console.log(res))
            .catch((err) => console.log(err));

          // Register Family members individually
          familyWards.value.familyMembers.forEach((i) => {
            if (i.checkMember) {
              let regFamMembers = {
                person: {
                  personId: i.person.id,
                },
                id: route.params.checkinId,
              };
              axios
                .post("/EventRegistration", regFamMembers)
                .then((res) => {
                  console.log(res);
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          });
          let newFamily = {
            person: {
              personId: personData.value.personId,
              mobilePhone: enteredValue.value,
              homeAddress: personData.value.homeAddress
                ? personData.value.homeAddress
                : "",
              email: personData.value.email
                ? personData.value.email
                : person.value.email,
            },
            id: route.params.checkinId,
          };
          registerMember(newFamily);

          // // Register Family members individually
          // familyWards.value.familyMembers.forEach(i => {
          //   if (i.checkMember) {
          //     let regFamMembers = {
          //       person: {
          //         personId: i.person.id
          //       },
          //       id: route.params.checkinId
          //     }
          //     axios.post("/EventRegistration", regFamMembers).then(res => {
          //       console.log(res)
          //     })
          //       .catch(err => {
          //         console.log(err)
          //       })
          //   }
          // })
          // let newFamily = {
          //   person: {
          //     personId: personData.value.personId,
          //     mobilePhone: enteredValue.value,
          //     homeAddress: personData.value.homeAddress ? personData.value.homeAddress : '',
          //     email: personData.value.email ? personData.value.email : person.value.email,
          //   },
          //   id: route.params.checkinId
          // };
          // registerMember(newFamily)
        } else {
          confirm();
        }
      } else if (personData.value.personId && familyWards.value.id) {
        if (displayFamily.value) {
          // Register Family members individually
          familyWards.value.familyMembers.forEach((i) => {
            if (i.checkMember) {
              let regFamMembers = {
                person: {
                  personId: i.person.id,
                },
                id: route.params.checkinId,
              };
              axios
                .post("/EventRegistration", regFamMembers)
                .then((res) => {
                  console.log(res);
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          });

          let newFamily = {
            person: {
              personId: personData.value.personId,
              mobilePhone: enteredValue.value,
              homeAddress: personData.value.homeAddress
                ? personData.value.homeAddress
                : "",
              email: personData.value.email
                ? personData.value.email
                : person.value.email,
            },
            id: route.params.checkinId,
          };
          registerMember(newFamily);
        } else {
          confirm();
        }
      } else {
        // If the person doesnt exist in the church's DB
        createNewPerson();
      }
    };

    const createNewPerson = async () => {
      let createNewPerson = {
        firstName: person.value.name,
        email: person.value.email,
        homeAddress: person.value.address,
        mobilePhone: enteredValue.value,
        tenantId: fullEventData.value.tenantID,
      };

      try {
        let { data } = await axios.post("/createPublicPerson", createNewPerson);
        if (displayFamily.value) {
          createNewFamily(data.returnObject.id);
        } else {
          confirm(data.returnObject.id);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const getGender = async () => {
      try {
        let { data } = await axios.get("/api/LookUp/GetAllLookUps");
        gender.value = data.find((i) => i.type === "Gender").lookUps;
      } catch (err) {
        console.log(err);
      }
    };
    getGender();

    const getMaritalStatus = async () => {
      try {
        let { data } = await axios.get("/api/LookUp/GetAllLookUps");
        maritalStatus.value = data.find(
          (i) => i.type === "MaritalStatus"
        ).lookUps;
      } catch (err) {
        console.log(err);
      }
    };
    getMaritalStatus();

    const createNewFamily = (id) => {
      disableClick.value = true;
      let familyDetails = {
        fatherId: id,
        familyName: person.value.name,
        familyMembers: familyMembers.value.map((i) => {
          delete i.name;
          return i;
        }),
        tenantId: fullEventData.value.tenantID,
      };
      axios
        .post("/createFamily", familyDetails)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));

      // Register Family members individually
      familyWards.value.familyMembers.forEach((i) => {
        if (i.checkMember) {
          let regFamMembers = {
            person: {
              personId: i.person.id,
            },
            id: route.params.checkinId,
          };
          axios
            .post("/EventRegistration", regFamMembers)
            .then((res) => {
              console.log(res);
              disableClick.value = false;
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });

      let newFamily = {
        person: {
          personId: id,
          mobilePhone: enteredValue.value,
          homeAddress: personData.value.homeAddress
            ? personData.value.homeAddress
            : "",
          email: personData.value.email
            ? personData.value.email
            : person.value.email,
        },
        id: route.params.checkinId,
      };
      registerMember(newFamily);
    };

    const registerMember = async (registerData) => {
      disableClick.value = true;
      try {
        let res = await axios.post("/EventRegistration", registerData);
        disableClick.value = false;
        swal(
          "Registration Successful!",
          "You have registered for this event successfully!",
          "success"
        );
        displayFamily.value = false;
        familyWards.value.familyMembers = [];
      } catch (error) {
        console.log(error);
      }
    };

    // function to clear input
    const clearNames = () => {
      names.value = [];
    };

    const notme = () => {
      person.value = {};
      enteredValue.value = "";
    };

    // getting events and date
    const eventData = ref({});
    const getDateAndEvent = () => {
      axios
        .get(
          `/api/publiccontent/WebRegistrationEventDetails?id=${route.params.checkinId}`
        )
        .then((res) => {
          eventData.value.name = res.data.fullEventName;
          eventData.value.date = dateFormatter.monthDayYear(res.data.eventDate);
          bannerUrl.value = res.data.bannerUrl;
          fullEventData.value = res.data;
          eventPaymentForm.value = fullEventData.value.paymentForm;
          getTenantCurrency();
          getCustomFields();
          GetAllCurrencies();
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getDateAndEvent();

    /* start masking functions */

    // function mask email
    const maskEmail = (str, numToShowInFront) => {
      if (str.length > 3) {
        const firstX = str.slice(0, numToShowInFront);
        const midPoint = str.split("").indexOf("@");
        let x = str.split("");
        x.forEach((i, j) => {
          if (j < midPoint) {
            x[j] = "*";
          }
        });
        x = x.join("");
        return firstX + x.slice(numToShowInFront);
      } else {
        return str[0] + "*" + str[2];
      }
    };

    const formatString = (str, numToShowInFront, numToHide) => {
      if (str.length > 3) {
        const firstX = str.slice(0, numToShowInFront);
        // const midPoint = str.split('').indexOf('@')
        const midPoint = numToShowInFront + numToHide;
        let x = str.split("");
        x.forEach((i, j) => {
          if (j < midPoint) {
            x[j] = "*";
          }
        });
        x = x.join("");
        return firstX + x.slice(numToShowInFront);
      } else {
        return str[0] + "*" + str[2];
      }
    };

    const showLoading = computed(() => {
      return autosearch.value && !person.value.name;
    });

    const setGateway = (payload) => {
      usedPaymentGateway.value = payload; // Get the gateway used
      confirmCheck(); // Update the donationObj with the used gateway
      initializePayment(); // make initialize payment call
    };

    const setConfirmDonation = () => {
      swal(
        "Registration Successful!",
        "You have registered for this event successfully!",
        "success"
      );
    };

    const getFamilyDetails = async (id) => {
      if (id) {
        try {
          const res = await axios.get(
            `/family?tenantID=${fullEventData.value.tenantID}&&personId=${id}`
          );
          familyWards.value = res.data;
          if (familyWards.value) {
            familyWards.value.familyMembers.map((i) => {
              i.checkMember = true;
              return i;
            });
          }
        } catch (error) {
          console.log(error);
        }
      }
    };

    const getFamilyRoles = async () => {
      try {
        let { data } = await axios.get("/getfamilyroles");
        memberRoles.value = data.result;
      } catch (err) {
        console.log(err);
      }
    };
    getFamilyRoles();

    const setNewMember = (payload) => {
      familyWards.value.familyMembers.push(payload);
    };

    const setMemberDetails = (payload) => {
      familyMembers.value.push(payload);
      let pushMemberToView = {
        person: {
          firstName: payload.name,
          id: payload.personId,
        },
        familyRoleID: payload.familyRoleId,
        checkMember: payload.checkMember,
      };
      familyWards.value.familyMembers.push(pushMemberToView);
    };

    // const setDonationProperties = (payload) => {
    //   donationNewProps.value = payload
    //   confirmCheck()
    // }

    const getAllRouteQueries = () => {
      for (let i in route.query) {
        if (route.query[i] == "true") {
          selectedCustomField.value.push(i);
        }
      }
    };
    getAllRouteQueries();

    const getCustomFields = async () => {
      try {
        let { data } = await axios.get(
          `/GetAllCustomFields?entityType=4&&tenantID=${fullEventData.value.tenantID}`
        );
        dynamicCustomFields.value = data.sort((a, b) => a.order - b.order);
      } catch (err) {
        console.log(err);
      }
    };

    const resetCallPayment = (payload) => {
      callPayment.value = payload;
    };

    return {
      primarycolor,
      paymentFormCurrency,
      disableClick,
      setSelectedGender,
      genderId,
      setSelectedMaritalStatus,
      maritalStatusId,
      toggleBase,
      checkCharacter,
      populateInputfields,
      appltoggle,
      names,
      emails,
      address,
      enteredValue,
      loading,
      person,
      autosearch,
      disableEdit,
      confirm,
      clearNames,
      getDateAndEvent,
      route,
      eventData,
      dateFormatter,
      confirmCheck,
      disabled,
      connectName,
      formatString,
      maskEmail,
      name,
      email,
      maritalStatus,
      userAddress,
      showNoPhoneError,
      notme,
      noError,
      submitBtn,
      showLoading,
      loaded,
      fetchingFailed,
      personHasAddress,
      months,
      gender,
      days,
      birthMonth,
      birthDay,
      personData,
      bannerUrl,
      close,
      fullEventData,
      donationObj,
      setGateway,
      selectedGateway,
      setConfirmDonation,
      confirmToRegister,
      currentUser,
      tenantCurrency,
      displayFamily,
      familyWards,
      getFamilyDetails,
      memberRoles,
      setNewMember,
      setMemberDetails,
      familyMembers,
      authorizebutton,
      signout,
      content,
      usedPaymentGateway,
      initializePayment,
      // setDonationProperties,
      donationNewProps,
      selectedCustomField,
      checkinCode,
      selectedMaritalStatus,
      selectedGender,
      weddingYearsArr,
      dayOfWedding,
      monthOfWedding,
      yearOfWedding,
      // controlType,
      dynamicCustomFields,
      date7,
      eventPaymentForm,
      callPayment,
      initializePaymentResponse,
      resetCallPayment,
    };
  },
};
</script>

<style scoped>
.add-btn {
  background: #136acd;
  color: #ffffff;
  font-weight: bold;
  font-size: 1rem;
  border: none;
}

.eventpictbg {
  background: #ebeff4;
}
.add-btn2 {
  background: none;
}

.loading-indicator {
  font-size: 76px;
  position: absolute;
  margin-top: 86px;
}

.loading-div {
  display: flex;
  justify-content: center;
  align-items: center;
}

.italicize {
  font-style: italic;
  font-size: 15px;
}

.event-closed {
  width: 50%;
}

@media (max-width: 400px) {
  .event-closed {
    width: 100%;
  }
}
</style>