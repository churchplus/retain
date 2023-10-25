<template>
  <div class="container-fluid  mx-0 tool">
    <div class="row d-flex justify-content-center align-items-center">
      <div class="col-11 col-sm-8 col-md-7 col-lg-5 d-flex justify-content-center ">
        <div class="d-flex    ">
            <div class=" mb-2  ">
              <img :src="churchLogo2" v-if="churchLogo2" class="link-image" alt="" style="width:45px" />
              <img src="../../assets/dashboardlinks/churchcloud.png" style="width:100px" v-else class="link-image "
                alt="" />
            </div>

            <!-- <span>
              <h4 class="font-weight-bold mt-3">{{ churchName ? churchName : "Churchplus" }}</h4>
            </span> -->
            
              <div class=" font-weight-bold  text-small mt-2  px-0 ">
                <!-- Moses Orimolade Education Foundation Pledge Portal -->
                {{ contributionDetail.name }} {{ !route.query.tenantID && contributionDetail.name ? 'Payment' : "" }}
              </div>
        </div>
      </div>
    </div>

    <div class="row d-flex justify-content-center">
      <div class="col-11 col-sm-8 col-md-7 col-lg-5 card pb-2" v-loading="cardLoading">
        <div class="container-fluid">
          <div class="row mt-2 justify-content-center">
            <div class="col-md-12  px-0">
              <div class="col-md-12 px-0 ">
                <label for="" class="text-small  m-0 ">Pledge Name<sup class="text-danger ">*</sup></label>
              </div>
              <div class="col-md-12 px-0">
                <select class="form-control  text-small input-adjust" v-model="selectPledgeItemID" :disabled="!route.query.tenantID"
                  @change="setSelectPledgeItem">
                  <option  v-for="(itm, index) in contributionDetail.pledgeItemDTOs" :key="index" :value="itm.id">
                    <p>{{ itm.name }}</p>
                  </option>
                </select>
                <!-- <div class="dropdown">
                      <button
                        class="btn btn-white w-100 border d-flex justify-content-between"
                        type="button"
                        id="dropdownMenuButton"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                        :disabled="!route.query.tenantID"
                      >
                        <span>
                          {{
                           selectedPledgeItem &&
                          Object.keys(selectedPledgeItem).length > 0
                            ? selectedPledgeItem.name
                            : "Select Pledge"
                          }}
                        </span>

                        <i class="pi pi-chevron-down"></i>
                      </button>
                      <div
                        class="dropdown-menu w-100"
                        style="max-height: 300px; overflow: auto"
                        aria-labelledby="dropdownMenuButton"
                      >
                        <div class="container">
                          <div
                            class="row"
                          >
                            <div class="col-md-12">
                              <a
                                class="dropdown-item px-1 px-14"
                                href="#"
                                v-for="(itm, indx) in contributionDetail.pledgeItemDTOs"
                                :key="indx"
                                @click="selectContribution(itm)"
                                >{{ itm.name }}</a
                              >
                            </div>
                          </div>
                        </div>
                      </div>
                    </div> -->
                <!-- <el-dropdown trigger="click" class="w-100" :disabled="!route.query.tenantID">
                    <span class="el-dropdown-link w-100" >
                      <div
                        class="d-flex justify-content-between border-contribution  w-100"
                        size="large"
                        
                      >
                        <span class="text-secondary">{{
                          selectedPledgeItem &&
                          Object.keys(selectedPledgeItem).length > 0
                            ? selectedPledgeItem.name
                            : "Select Pledge"
                        }}</span>
                        <div>
                          <el-icon class="el-icon--right">
                            <arrow-down />
                          </el-icon>
                        </div>
                      </div>
                    </span>
                    <template #dropdown>
                      <el-dropdown-menu class="w-100">
                        <el-dropdown-item
                          v-for="(itm, indx) in contributionDetail.pledgeItemDTOs"
                          :key="indx"
                          @click="selectContribution(itm)"
                          >{{ itm.name }}
                        </el-dropdown-item>
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown> -->
                <!-- <el-select-v2 v-model="selectPledgeItemID" @change="setSelectPledgeItem"
                  :options="contributionDetail.pledgeItemDTOs ? contributionDetail.pledgeItemDTOs.map(i => ({ label: i.name, value: i.id })) : []"
                  placeholder="Select Pledge" size="large" class="w-100" :disabled="!route.query.tenantID" /> -->
              </div>
            </div>
            <div class="col-md-12 mt-2 px-0 ">
              <!-- <div class="col-md-12">
                <label for="" >Phone Number<sup class="text-danger">*</sup></label>
              </div> -->
              <div class="col-md-12 px-0 ">
                <div class=" d-flex flex-column flex-sm-row">
                  <!-- <span class="w-100 border d-flex  text-right align-items-center  "><sup class=" border mt-2 text-danger ">*</sup></span> -->
                  <el-input @keyup.enter="checkContact"  @blur="checkContact" v-model="userSearchString" class=" input-adjustno"
                    placeholder="Enter phone number" type="number"
                    :disabled="route.query.pledgeID && route.query.pledgeID.length > 0">
                    <template #prefix>
                      <el-icon>
                        <Phone />
                      </el-icon>
                    </template>
                  </el-input>
                  <el-button  :disabled="route.query.pledgeID && route.query.pledgeID.length > 0"
                    class="ml-sm-2 mt-2 mt-sm-0 input-adjust" style="height: 42px" size="large" type="primary" plain>
                    <el-icon class="mr-1" style="vertical-align: middle">
                      <Search />
                    </el-icon>
                    Get my details
                  </el-button>
                </div>
                <div class="col-12 px-0 mt-1">
                  <p class="text-danger text-small" v-if="showNoPhoneError" :class="{ 'mt-1': showLoading }">
                    Please enter your phone number
                  </p>
                </div>
                <div class="col-md-12 px-0" v-if="showLoading">
                  <div class="loading-div my-1">
                    <el-icon class="is-loading">
                      <Loading />
                    </el-icon>
                    <p>Fetching your details...</p>
                  </div>
                </div>
              </div>
              
              <div class="col-12 d-flex px-0 "  v-if="contactDetail || maxName " >
                <div class="col-12  mx-0 px-0 d-flex  justify-content-between ">
                  <div
                  class="col-sm-6 mx-0 text-small text-lowercase px-0  ">
                  <div class="mr-1"> {{ maxName ? maxName : "" }}</div>
                </div>
                <div
                  class="col-sm-6  mx-0 px-0 text-small   text-lowercase   ">
                  <div> {{ contactDetail && contactDetail.email && maxEmail ? maxEmail : "" }}</div>
                </div>
                </div>
                
              </div>
              <div class=" col-md-12 p-0 text-center  small" style="color: #f59b47;"
                v-if="personToggle && Object.keys(contactDetail).length == 0" :class="{ 'mt-0': showLoading }">
                Please enter your details
              </div>
            </div>
            <div class="col-md-12 px-0 " v-if="personToggle && Object.keys(contactDetail).length == 0 && !showLoading">
              <div class="row">
                <div class="col-md-12">
                  <div class="row">
                    <!-- <div class="col-md-12">
                      <label for="">First Name</label>
                    </div> -->
                    <div class="col-md-12">
                      <el-input v-model="newContact.firstName" class="w-100 input-adjustno" placeholder="Enter name">
                        <template #prefix>
                          <el-icon>
                            <User />
                          </el-icon>
                        </template>
                      </el-input>
                    </div>
                  </div>
                </div>
                <!-- <div class="col-md-6">
                  <div class="row">
                    <div class="col-md-12">
                      <label for="">Last Name</label>
                    </div>
                    <div class="col-md-12">
                      <el-input v-model="newContact.lastName" class="w-100" placeholder="Enter name">
                        <template #prefix>
                          <el-icon>
                            <User />
                          </el-icon>
                        </template>
                      </el-input>
                    </div>
                  </div>
                </div> -->
                <!-- <div class="col-md-12 mt-3">
                  <label for="">Email</label>
                </div> -->
                <div class="col-md-12 mt-2">
                  <el-input v-model="newContact.email" class="w-100 input-adjustno" placeholder="Enter email">
                    <template #prefix>
                      <el-icon>
                        <Message />
                      </el-icon>
                    </template>
                  </el-input>
                </div>
              </div>
            </div>
            <!-- <div class="col-md-11 mt-2" v-if="personToggle && !route.query.pledgeID && !memberAlreadyPledgedToPledgeItem">
              <el-radio-group v-model="pledgeActionType">
                <el-radio label="1" size="large">Pledge and pay now</el-radio>
                <el-radio label="2" size="large">Pledge only</el-radio>
              </el-radio-group>
            </div> -->

            <div v-if="personToggle && !showLoading" class="  col-md-11 px-0">
              <hr class="w-100">
            </div>
            <div class="col-md-12 mt-2 px-0" v-if="donorDetail.donorPaymentType == 1 && personToggle
              ">
              <div class="col-md-12 text-center">
                <label for="">Pledge amount</label>
              </div>
              <div class="col-md-12 px-0">
                <h2 class="font-weight-700 text-center">{{ pledgeAmountWithComma }}</h2>
              </div>
            </div>
            <div class="col-md-12  px-0" v-if="donorDetail.donorPaymentType == 2 && personToggle
              ">
              <div class="col-md-12 px-0 text-center text-small">
                <div class="mb-1">Pledge amount range is within</div>
                <label for="">
                  <h5 class="font-weight-bold fontwght d-inline">{{
                    Math.abs(
                      donorDetail.donorPaymentRangeFromAmount
                    ).toLocaleString()
                  }}</h5>
                  -
                  <h5 class="font-weight-700 fontwght d-inline">{{
                    Math.abs(
                      donorDetail.donorPaymentRangeToAmount
                    ).toLocaleString()
                  }}</h5>
                </label>
              </div>
            </div>
            <div class="col-md-12  px-0" v-if="personToggle && !showLoading
                ">
              <div class="col-md-12 px-0 text-small font-weight-bold ">
                <label for="">{{ memberAlreadyPledgedToPledgeItem ? 'Amount pledged' : 'Amount to pay '
                }}</label>
              </div>
              <!-- For range -->
              <div class="col-md-12 px-0" v-if="donorDetail.donorPaymentType == 2">
                <el-input v-model="amountToPledge" :class="{ 'is-invalid': !withinRange }" type="number" placeholder="Enter amount"
                  @blur="validateRangeAmount" class="input-adjustno" :disabled="memberAlreadyPledgedToPledgeItem">
                  <template #prepend>
                    <el-select v-model="selectedCurrencyCode" class=" input-adjustnos  border-0" placeholder="Select" style="width: 115px"
                      @change="setSelectedCurrency" filterable>
                      <el-option v-for="item in FLWupportedCurrencies" :label="item.value" :value="item.value" :key="item.value" />
                    </el-select>
                  </template>
                </el-input>
                <div class="invalid-feedback ">
                  Please make sure the amount is within the range of
                  {{
                    Math.abs(
                      donorDetail.donorPaymentRangeFromAmount
                    ).toLocaleString()
                  }}
                  and
                  {{
                    Math.abs(
                      donorDetail.donorPaymentRangeToAmount
                    ).toLocaleString()
                  }}.
                </div>
              </div>
              <!-- For free will -->
              <div class="col-md-12 px-0" v-if="donorDetail.donorPaymentType == 0">
                <el-input v-model="amountToPledge" placeholder="Enter amount" type="number" class="input-adjustno"
                  :disabled="memberAlreadyPledgedToPledgeItem">
                  <template #prepend>
                    <el-select v-model="selectedCurrencyCode" placeholder="Select" class="input-adjustnos" style="width: 115px"
                      @change="setSelectedCurrency" filterable>
                      <el-option v-for="item in FLWupportedCurrencies" :label="item.value" :value="item.value" :key="item.value" />
                    </el-select>
                  </template>
                </el-input>
              </div>
              <div class="col-md-12 px-0" v-if="donorDetail.donorPaymentType == 1">
                <el-input v-model="amountToPledge" placeholder="Enter amount" class="input-with-select" disabled>
                  <template #prepend>
                    <el-select v-model="selectedCurrencyCode" placeholder="Select" style="width: 115px"
                      @change="setSelectedCurrency" filterable>
                      <el-option v-for="item in FLWupportedCurrencies" :label="item.value" :value="item.value"  :key="item.value" />
                    </el-select>
                  </template>
                </el-input>
              </div>
            </div>
            <!-- <div v-if="personToggle && !showLoading
              " class=" col-md-11">
              <hr class="w-100">
            </div> -->
            <div class=" col-md-11">
              <hr class="w-100">
            </div>
            <!-- <div class="col-md-12   px-0" v-if="personToggle && !showLoading"> -->
              <!-- <Transition name="slide-fade">
                <div class="col-md-12 font-weight-bold text-small" v-if="pledgeActionType == '1'">
                  <label for="">How much do you want to pay now ?</label>
                </div>
              </Transition> -->
              <!-- Range, Free will and Specific -->
              <!-- <Transition name="slide-fade">
                <div class="col-md-12 px-0 " v-if="pledgeActionType == '1'">
                  <el-input type="number"   class="input-adjust mb-1" v-model="amountToPayNow" placeholder="Enter amount to pay" />
                </div>
              </Transition> -->
            <!-- </div> -->
            <div class="col-md-11  px-0  d-flex justify-content-center">
              <div class="col-md-12">
                <el-button class="w-100  text-small  input-adjust" :color="primarycolor" :loading="loading" size="large"
                :disabled="!personToggle" @click="triggerPayment" round>{{ pledgeActionType
                    == '1' ? 'Pay' : 'Pledge'
                  }}</el-button>
                  <!-- <el-button class="w-100 secondary-button  ml-0" size="large" @click="cancelPledge" v-if="memberAlreadyPledgedToPledgeItem" round>
                    Cancel
                    pledge
                    </el-button> -->
              </div>

            </div>

            <div class=" row mt-1 d-flex justify-content-center">
              <div class="col-10 col-sm-8 col-md-7   pl-0">
                <div class="row justify-content-center">
                  <!-- <div class="col-3">
                    <img src="../../assets/VisaDebit.png" class="w-100">
                  </div> -->
                  <div class="col-md-10 col-12 text-small   d-flex">
                    <div class=" col-md-6 text-center ">
                      <img src="../../assets/Full-Flutterwave.png" class="w-100">
                    </div>
                    <div class=" col-md-6 text-center mt-1  ">
                      <img src="../../assets/paystack.png" class="w-100">
                    </div>
                  </div>
                  <!-- <div class="col-3 pl-0 text-right">
                    <img src="../../assets/paypal.png" class="w-50">
                  </div> -->
                </div>
              </div>
            </div>
            <div class="row justify-content-center ">
              <div class=" col-10 col-sm-8 col-md-7   ">
                <div class="row  justify-content-center"> 
                  <!-- <div class="col-md-12 d-flex    "> -->
                    <div class=" col-md-6 text-center text-small  image-adjust  ">Powered by <img src="../../assets/logoblue.png" alt="churchplus Logo"  /></div>
                    <!-- <div class="image-adjust col-md-5 border  ">
                      <img src="../../assets/logoblue.png" alt="churchplus Logo" class=" border " />
                    </div> -->
                  <!-- </div> -->
                </div>
              </div>
            </div>
            <!-- <div class="row justify-content-center">
              <div class="col-md-4  d-flex  align-item-center mb-4">
                <div class="  text-small border ">Powered by</div>
                <div class="image-adjust border  ">
                  <img src="../../assets/logoblue.png" alt="churchplus Logo" class=" border " />
                </div>
              </div>

            </div> -->
          </div>
        </div>
      </div>
    </div>
    <el-dialog v-model="paymentDialog" title="Payment methods"
      :width="mdAndUp || lgAndUp || xlAndUp ? `50%` : xsOnly ? `90%` : `70%`" align-top>
      <div class="row">
        <div class="col-sm-12 p-2 text-center text-small continue-text">
          Continue payment with
        </div>
      </div>
      <div class="row row-button c-pointer" v-if="paystackGate" @click="(initiatePayment(1))">
        <div class="d-flex justify-content-center w-100">
          <img style="width: 150px" src="../../assets/4PaystackLogo.png" alt="paystack" />
        </div>
      </div>
      <div class="row row-button c-pointer mt-3 " v-if="flutterwaveGate" @click="(initiatePayment(2))">
        <div class="d-flex justify-content-center w-100">
          <img style="width: 150px" src="../../assets/flutterwave_logo_color@2x.png" alt="flutterwave" />
        </div>
      </div>
      <div class="row">
        <div class=" col-md-11">
          <hr class="w-100">
        </div>
      </div>
      <div class="row">
        <div class="col-md-12 ">
          <span class="notecolour text-small col-md-12 px-0 font-weight-bold "> <span class="text-dark  font-weight-bold">NB: </span  >FlutterWave currently processes only Credit Cards</span>
        </div>
      </div>
    </el-dialog>
    <el-dialog v-model="paymentSuccessfulDialog" title=""
      :width="mdAndUp || lgAndUp || xlAndUp ? `50%` : xsOnly ? `90%` : `70%`" align-center>
      <div class="row">
        <div class="col-12">
          <div class="d-flex justify-content-center">
            <img src="../../assets/successful_payment.png" style="width: 250px; margin: auto" />
          </div>
          <h3 class="text-center mt-5 font-weight-bold success">Thank you</h3>
          <div class="text-center mt-2 font-weight-600 s-18">{{ pledgeActionType == '1' ? 'Payment completed successfully'
            : 'Your pledge has been recorded successfully' }}</div>
          <div class="d-flex justify-content-center mb-5">
            <el-button color="#70c043" class="text-white mt-2" @click="paymentSuccessfulDialog = false" round>Go
              back</el-button>
          </div>
        </div>
      </div>

    </el-dialog>
  </div>
</template>

<script>
import axios from "@/gateway/backendapi";
import { ref, computed, inject } from "vue";
import { useToast } from "primevue/usetoast";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import finish from "../../services/progressbar/progress";
import { ElMessage, ElMessageBox } from 'element-plus';
import mask from "../../services/dates/maskText";
import supportedCurrencies from "../../services/user/flutterwaveSupportedCurrency"
import deviceBreakpoint from "../../mixins/deviceBreakpoint";
import { ElLoading } from 'element-plus'
import swal from "sweetalert";
import router from "../../router";
export default {
  setup() {
    const primarycolor = inject('primarycolor')
    const toast = useToast();
    const searchID = ref('')
    const selectPledgeItemID = ref(null)
    const selectedPledgeItem = ref({})
    const selectedee = ref({ name: "Selected" })
    const appltoggle = ref(false);
    const personToggle = ref(false);
    const associationLogo = ref("")
    const churchLogo2 = ref("")
    let newContact = ref({})
    const store = useStore();
    const withinRange = ref(true);
    const searchRef = ref("");
    const currentUser = ref(store.getters.currentUser);
    const tenantId = ref(currentUser.tenantId);
    const selectedCurrency = ref({});
    const selectedCurrencyCode = ref();
    const userSearchString = ref("");
    const route = useRoute();
    const members = ref([]);
    const churchName = ref("");
    const memberName = ref("");
    const contactDetail = ref({});
    const autosearch = ref(false);
    const showNoPhoneError = ref(false);
    const Address = ref("");
    const loading = ref(false);
    const freewillAmount = ref("");
    const checking = ref(false);
    const value = ref();
    const contributionDetail = ref({});
    const amountFrom = ref("");
    const amountTo = ref("");
    const isProduction = true;
    const searchedContact = ref({});
    const selectedContact = ref({});
    const donorDetail = ref({})
    const donorDetails = ref({})
    const amountToPledge = ref("");
    const amountToPayNow = ref("");
    const pledgeAmount = ref("");
    const pledgeActionType = ref("1");
    const maxName = ref("")
    const maxEmail = ref("")
    const pledgeCategory = ref([
      { name: "Free will" },
      { name: "Specific" },
      { name: "Range" },
    ]);
    const memberAlreadyPledgedToPledgeItem = ref(false)
    const pledgedData = ref({})
    const currencyList = ref([])
    const FLWupportedCurrencies = ref(supportedCurrencies);
    const paymentDialog = ref(false)
    const paymentSuccessfulDialog = ref(false)
    const { mdAndUp, lgAndUp, xlAndUp, xsOnly } = deviceBreakpoint();
    const cardLoading = ref(false);
    const pledgePaymentForm = ref({})
    FLWupportedCurrencies.value = FLWupportedCurrencies.value.filter(i => i.value === "NGN" || i.value === "GBP" || i.value === "USD" || i.value === "EUR");
    const pledgeAmountWithComma = computed(() => {
      if (amountToPledge.value) return amountToPledge.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    })
    const disabled = computed(() => {
      if (contactDetail.value.personId) return true;
      return false;
    });

    const showLoading = computed(() => {
      return autosearch.value;
    });
    const setSelectPledgeItem = () => {
      selectedPledgeItem.value = contributionDetail.value.pledgeItemDTOs.find(i => {
        return i.id == selectPledgeItemID.value
      })
      pledgePaymentForm.value = selectedPledgeItem.value.fillPaymentFormDTO
      selectedCurrency.value = selectedPledgeItem.value.currency;
      selectedCurrencyCode.value = selectedCurrency.value.shortCode

      if (userSearchString.value) {
        checkContact();
      }
    }
    const selectContribution = (item) => {
      console.log(item, 'lklklkl');
      selectedPledgeItem.value = item;
      pledgePaymentForm.value = selectedPledgeItem.value.fillPaymentFormDTO
      selectedCurrency.value = selectedPledgeItem.value.currency;
      selectedCurrencyCode.value = selectedCurrency.value.shortCode

      if (userSearchString.value) {
        checkContact();
      }
    };

    const setSelectedCurrency = () => {
      selectedCurrency.value = currencyList.value.find(i => i.shortCode == selectedCurrencyCode.value);
    }

    const checkContact = async () => {
      if (!userSearchString.value) {
        showNoPhoneError.value = true;
        return false;
      } else {
        showNoPhoneError.value = false
      }
      if (route.query.tenantID) {
        searchID.value = selectedPledgeItem.value.id
      } else if (route.query.pledgeDefinitionID) {
        searchID.value = route.query.pledgeDefinitionID
      } else if (route.query.pledgeID) {
        searchID.value = route.query.pledgeID
      }
      loading.value = true;
      autosearch.value = true;
      // personToggle.value = true
      try {
        const { data } = await axios.get(
          `/SearchContributionByPhoneOrMemberID?searchText=${userSearchString.value}&Id=${searchID.value}`
        );

        personToggle.value = true
        contactDetail.value = data.person ? data.person : {};
        donorDetail.value = data.pledgeItemDTO ? data.pledgeItemDTO : {};
        amountToPledge.value = donorDetail.value.donorPaymentSpecificAmount
        maxEmail.value = contactDetail.value.email ? mask.maskEmail2(contactDetail.value.email) : ""
        maxName.value = `${contactDetail.value.firstName ? mask.maskText(contactDetail.value.firstName) : ""} ${contactDetail.value.lastName ? mask.maskText(contactDetail.value.lastName) : ""}`
        pledgeActionType.value = "1"


        if (data.pledgeResponseDTO && Object.keys(data.pledgeResponseDTO).length > 0) {
          memberAlreadyPledgedToPledgeItem.value = true
          amountToPledge.value = data.pledgeResponseDTO.amount
          amountToPayNow.value = data.pledgeResponseDTO.balance
          // amountToPayNow.value = data.pledgeResponseDTO.balance
          pledgedData.value = data.pledgeResponseDTO
          selectedCurrency.value = data.pledgeResponseDTO.currency
          selectedCurrencyCode.value = data.pledgeResponseDTO.currency.shortCode

        } else {
          memberAlreadyPledgedToPledgeItem.value = false
          pledgedData.value = new Object();
          amountToPayNow.value = ""
        }

        // if (!data.person) {
        //   ElMessage({
        //     type: 'warning',
        //     showClose: true,
        //     message: 'Your details were not found kindly enter them below',
        //     duration: 10000
        //   })
        // } else {
        //   ElMessage({
        //     type: 'success',
        //     showClose: true,
        //     message: 'Member details found, kindly proceed to make your pledge',
        //     duration: 10000
        //   })
        // }
        loading.value = false;
        autosearch.value = false;

        if (contactDetail.value) appltoggle.value = true;
      } catch (error) {
        console.log(error);
        loading.value = false;
        autosearch.value = false;
      }
    };

    const pledgeDefineID = ref(route.params.id);
    const setContact = (payload) => {
      selectedContact.value = payload;
    };
    const validateRangeAmount = () => {
      if (
        amountToPledge.value <
        donorDetail.value.donorPaymentRangeFromAmount ||
        amountToPledge.value > donorDetail.value.donorPaymentRangeToAmount
      ) {
        withinRange.value = false;
        ElMessage({
          type: 'warning',
          showClose: true,
          message: 'The amount is not within the specific range, please enter a value within the range',
          duration: 10000
        })
      } else {
        withinRange.value = true;
      }
    };

    const validatePaidAmount = () => {
      if (amountToPledge.value == 0 || amountToPledge.value < 0) {
        withinRange.value = false;
        toast.add({
          severity: "warn",
          summary: "info",
          detail: `Amount is less than ${Math.abs(
            pledgeAmount.value
          ).toLocaleString()}`,
          life: 4000,
        });
      } else {
        withinRange.value = true;
      }
    };

    const getContribution = async () => {
      cardLoading.value = true
      try {
        checking.value = false;
        let pledgeURL = route.query.tenantID ? `TenantID=${route.query.tenantID}` : route.query.pledgeID ? `PledgeID=${route.query.pledgeID}` : route.query.pledgeDefinitionID ? `pledgeDefinitionID=${route.query.pledgeDefinitionID}` : ""
        const res = await axios.get(
          `/Contribution/Pay?${pledgeURL}`
        );
        cardLoading.value = false
        finish();
        if (route.query.pledgeDefinitionID) {
          console.log(1)
          // For pledge definition
          contributionDetail.value = res.data.pledgeItemDTO;
          contributionDetail.value.pledgeItemDTOs = [res.data.pledgeItemDTO]
          selectPledgeItemID.value = contributionDetail.value.id
          // selectedPledgeItem.value.name = contributionDetail.value.name
          // selectedPledgeItem.value = contributionDetail.value.id
          churchLogo2.value = res.data.pledgeItemDTO.logo
          churchName.value = res.data.pledgeItemDTO.tenantName
          selectedCurrency.value = contributionDetail.value.currency
          selectedCurrencyCode.value = contributionDetail.value.currency.shortCode
          pledgePaymentForm.value = contributionDetail.value.fillPaymentFormDTO
        } else if (route.query.pledgeID) {
          // For pledge
          console.log(2)
          console.log(res.data)
          let decomposedPledgeList = [{ ...res.data.pledgeItemDTO }]
          contributionDetail.value = res.data.pledgeItemDTO;
          contributionDetail.value.pledgeItemDTOs = decomposedPledgeList
          selectPledgeItemID.value = contributionDetail.value.id
          // selectedPledgeItem.value.name = contributionDetail.value.name
          // selectedPledgeItem.value = contributionDetail.value.id
          churchLogo2.value = res.data.pledgeItemDTO.logo
          churchName.value = res.data.pledgeItemDTO.tenantName
          contactDetail.value = res.data.person
          maxEmail.value = contactDetail.value && contactDetail.value.email ? mask.maskEmail2(contactDetail.value.email) : "";
          maxName.value = `${contactDetail.value.firstName ? mask.maskText(contactDetail.value.firstName) : ""} ${contactDetail.value.lastName ? mask.maskText(contactDetail.value.lastName) : ""}`
          userSearchString.value = contactDetail.value ? contactDetail.value.mobilePhone : ""
          personToggle.value = true
          donorDetail.value = res.data.pledgeItemDTO
          amountToPledge.value = res.data.pledgeResponseDTO.amount
          pledgedData.value = res.data.pledgeResponseDTO
          memberAlreadyPledgedToPledgeItem.value = true
          selectedCurrency.value = res.data.pledgeResponseDTO.currency
          selectedCurrencyCode.value = res.data.pledgeResponseDTO.currency.shortCode
          pledgePaymentForm.value = contributionDetail.value.fillPaymentFormDTO
        } else {
          console.log(3)
          // Generic page
          contributionDetail.value.pledgeItemDTOs = res.data.pledgeItemDTOs;
          churchLogo2.value = res.data.pledgeItemDTOs[0].logo
          churchName.value = res.data.pledgeItemDTOs[0].tenantName
          contributionDetail.value.name = `${churchName.value} Pledge Portal`;
        }
        checking.value = true;
      } catch (error) {
        console.log(error);
        cardLoading.value = false;
      }
    };
    getContribution();

    const getAllCurrencies = (id) => {
      axios
        .get("/api/lookup/getallcurrencies")
        .then((res) => {
          currencyList.value = res.data
          if (id) {
            selectedCurrency.value = currencyList.value.find((i) => i.id == id);
          }
        })
        .catch((err) => console.log(err));
    };
    getAllCurrencies();


    const paystackGate = computed(() => {
      if (!pledgePaymentForm.value || !pledgePaymentForm.value.paymentGateWays || (selectedCurrencyCode.value.toLowerCase() !== 'ngn')) return false
      return pledgePaymentForm.value.paymentGateWays.find(i => i.paymentGateway.name === "Paystack")
    })

    const flutterwaveGate = computed(() => {
      if (!pledgePaymentForm.value || !pledgePaymentForm.value.paymentGateWays) return false
      return pledgePaymentForm.value.paymentGateWays.find(i => i.paymentGateway.name === "FlutterWave")
    })


    const payWithPaystack = (responseObject) => {
      /*eslint no-undef: "warn"*/
      let handler = PaystackPop.setup({
        key: process.env.VUE_APP_PAYSTACK_PUBLIC_KEY_LIVE,
        // key: process.env.VUE_APP_PAYSTACK_API_KEY,
        email: contactDetail.value.email ? contactDetail.value.email : newContact.value.email,
        // amount: amountToPayNow.value * 100,
        amount: amountToPledge.value * 100,
        currency: selectedCurrencyCode.value,
        channels: ['card', 'bank', 'ussd', 'qr', 'mobile_money', 'bank_transfer'],
        subaccount: pledgePaymentForm.value.paymentGateWays.find(i => i.paymentGateway.name === "Paystack").subAccountID,
        ref: responseObject.transactionReference,
        onClose: function () {
          ElMessage({
            type: 'info',
            showClose: true,
            message: "You have cancelled the transaction",
            duration: 5000
          })
        },
        callback: function (response) {
          let trans_id = response.trxref
          let tx_ref = response.trxref
          confirmPayment(tx_ref, trans_id);
        },
      });
      handler.openIframe();
    };

    const getFlutterwaveModules = () => {
      const script = document.createElement("script");
      script.src = !isProduction
        ? "https://ravemodal-dev.herokuapp.com/v3.js"
        : "https://checkout.flutterwave.com/v3.js";
      document.getElementsByTagName("head")[0].appendChild(script);
      // console.log(process.env.VUE_APP_FLUTTERWAVE_TEST_KEY)
    };
    getFlutterwaveModules();

    const confirmPayment = async (trans_id, tx_ref) => {

      try {
        const res = await axios.post(
          `/ConfirmInitializeContributionAndPledgePayment?id=${trans_id}&txnref=${tx_ref}`
        );
        if (res.data.status) {
          paymentSuccessfulDialog.value = true;
          personToggle.value = false;
          userSearchString.value = "";
          if (route.query.tenantID) {
            selectPledgeItemID.value = null;
          }
          contactDetail.value = new Object();
          newContact.value = new Object();
          maxName.value = "";
          maxEmail.value = ""
        } else {
          swal({
            title: "Oops",
            text: res.data.statusMessage,
            icon: "error",
            dangerMode: true,
          })
        }
      } catch (error) {
        console.log(error);
      }
    };

    const payWithFlutterwave = (responseObject) => {
      let country = "";

      switch (selectedCurrencyCode.value) {
        case "KES":
          country = "KE";
          break;
        case "USD":
          country = "US";
          break;
        case "GHS":
          country = "GH";
          break;
        case "ZAR":
          country = "ZA";
          break;
        case "TZS":
          country = "TZ";
          break;
        case "NGN":
          country = "NG";
          break;
        default:
          country = "";
          break;
      }

      window.FlutterwaveCheckout({
        public_key: process.env.VUE_APP_FLUTTERWAVE_PUBLIC_KEY_LIVE,
        // public_key: process.env.VUE_APP_FLUTTERWAVE_TEST_KEY_TEST,
        tx_ref: responseObject.transactionReference,
        amount: amountToPledge.value,
        // amount: amountToPayNow.value,
        currency: selectedCurrencyCode.value,
        country: country,
        payment_options: "card,ussd",
        subaccounts: [
          {
            id: pledgePaymentForm.value.paymentGateWays.find(i => i.paymentGateway.name === "FlutterWave").subAccountID,
          }
        ],
        customer: {
          name: contactDetail.value && Object.keys(contactDetail.value).length > 0 ? `${contactDetail.value.firstName} ${contactDetail.value.lastName}` : `${newContact.value.firstName} ${newContact.value.lastName}`,
          phone_number: userSearchString.value,
          email: contactDetail.value.email ? contactDetail.value.email : newContact.value.email,
        },
        callback: (response) => {
          let trans_id = response.transaction_id
          let tx_ref = response.tx_ref
          confirmPayment(trans_id, tx_ref);
        },
        onclose: () => console.log("Payment closed"),
        customizations: {
          title: churchName.value,
          description: `Pledge payment to ${churchName.value}`,
          logo: churchLogo2.value,
        },
      });
    };

    const triggerPayment = () => {
      if (pledgeActionType.value == '1') {
        // if (!amountToPayNow.value) {
        if (!amountToPledge.value) {
          ElMessage({
            type: 'warning',
            showClose: true,
            message: "Please enter amount ",
            duration: 5000
          })
        } else {
          paymentDialog.value = true
        }
      } else {
        initiatePayment(3)
      }

    }

    const initiatePayment = async (gatewayType) => {
      paymentDialog.value = false
      const loading = ElLoading.service({
        lock: true,
        text: 'Please wait...',
        background: 'rgba(255, 255, 255, 0.9)',
      })
      let gatewayService = gatewayType === 1 ? 'Paystack' : gatewayType == 2 ? 'Flutterwave' : null

      newContact.value = { ...newContact.value, mobilePhone: userSearchString.value }
      let payload = {
        person: contactDetail.value && Object.keys(contactDetail.value).length > 0 && contactDetail.value.id ? { id: contactDetail.value.id } : newContact.value,
        pledgeItemDTO: donorDetail.value,
        pledgeResponseDTO: pledgedData.value && Object.keys(pledgedData.value).length > 0 ? pledgedData.value : { currency: selectedCurrency.value, amount: amountToPledge.value },
        pledgePaymentDTO: pledgeActionType.value == 1 ? { currency: selectedCurrency.value, amount: amountToPayNow.value } : null,
        pledgePaymentDTO: pledgeActionType.value == 1 ? { currency: selectedCurrency.value, amount: amountToPledge.value } : null,
        // pledgePaymentDTO: pledgedData.value && Object.keys(pledgedData.value).length > 0 ? pledgedData.value : { currency: selectedCurrency.value, amount: amountToPledge.value },
      }
      if (gatewayService) payload.gateway = gatewayService

      try {
        let { data } = await axios.post('/InitializeContributionAndPledgePayment', payload);
        loading.close();
        if (data.status) {
          if (gatewayType == 1) {
            payWithPaystack(data)
          } else if (gatewayType == 2) {
            payWithFlutterwave(data)
          } else {
            // Block for users that pledges only
            ElMessage({
              type: 'success',
              showClose: true,
              message: 'Congrats, Your pledge is saved successfully',
              duration: 10000
            })
            paymentSuccessfulDialog.value = true;
            personToggle.value = false;
            userSearchString.value = "";
            if (route.query.tenantID) {
              selectPledgeItemID.value = null;
            }
            contactDetail.value = new Object();
            newContact.value = new Object();
            maxName.value = "";
            maxEmail.value = ""
          }
        } else {
          ElMessage({
            type: 'warning',
            showClose: true,
            message: data.statusMessage,
            duration: 8000
          })
        }
      }
      catch (error) {
        console.error(error)
        // paymentDialog.value = true
        loading.close();
        ElMessage({
          type: 'error',
          showClose: true,
          message: "Couldn't initialise payment service, please try again",
          duration: 5000
        })
      }
    }

    const cancelPledge = () => {
      ElMessageBox.confirm(
        'You are about to cancel this pledge. Are you sure?',
        'Confirm delete',
        {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'error',
        }
      )
        .then(async () => {
          try {
            let { data } = await axios.put(`/api/Pledge/CancelPledge?pledgeID=${pledgedData.value.id}`);
            console.log(data);
            if (data.status) {
              swal({
                title: "Success",
                text: 'Pledge cancelled successfully',
                icon: "success",
                button: 'OK',
                closeOnClickOutside: false,
              }).then(() => {
                window.location.replace(`${window.location.origin}/partnership/pay?tenantID=${data.returnObject.pledgeType.tenantID}`);
              })
            }
          }
          catch (err) {
            console.error(err);
          }
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: 'Action discarded',
          })
        })
    }

    return {
      selectPledgeItemID,
      setSelectPledgeItem,
      searchID,
      maxEmail,
      associationLogo,
      churchLogo2,
      personToggle,
      donorDetail,
      donorDetails,
      disabled,
      appltoggle,
      //   toggleBase,
      contactDetail,
      showNoPhoneError,
      autosearch,
      //   enteredValue,
      showLoading,
      // CheckAfterEleven,
      validateRangeAmount,
      validatePaidAmount,
      withinRange,
      setContact,
      pledgeDefineID,
      searchRef,
      members,
      userSearchString,
      contributionDetail,
      currentUser,
      tenantId,
      pledgeCategory,
      payWithPaystack,
      amountTo,
      amountFrom,
      churchName,
      Address,
      value,
      loading,
      checking,
      freewillAmount,
      memberName,
      payWithFlutterwave,
      searchedContact,
      //   setEmptyValue,
      selectedContact,
      pledgeAmount,
      amountToPledge,
      amountToPayNow,
      checkContact,
      selectedPledgeItem,
      route,
      selectContribution,
      pledgeAmountWithComma,
      pledgeActionType,
      memberAlreadyPledgedToPledgeItem,
      pledgedData,
      initiatePayment,
      maxName,
      newContact,
      selectedCurrency,
      selectedCurrencyCode,
      currencyList,
      FLWupportedCurrencies,
      setSelectedCurrency,
      paymentDialog,
      xsOnly,
      mdAndUp,
      lgAndUp,
      xlAndUp,
      paymentSuccessfulDialog,
      cardLoading,
      triggerPayment,
      primarycolor,
      pledgePaymentForm,
      paystackGate,
      flutterwaveGate,
      selectedee,
      cancelPledge
    };
  },
};
</script>

<style scoped>
.heading-text {
  font: normal normal 700 1.5rem Nunito sans;
  font-weight: 700;
  font-size: 19px;
}


.input-border {
  border: 1px solid #3c7e58 !important;
}

.pay {
  border-radius: 5px;
  padding: 10px 17px;
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
  flex-direction: column
}

.loading-div .is-loading {
  font-size: 2rem
}

.notecolour {
  /* color: rgb(199, 129, 23);; */
  color: rgb(0, 0, 0);
}

.phone-input {
  background: transparent;
  border: 0;
  border-bottom: 1px solid #cbd6e2;
  border-radius: 0;
}

#walletpana {
  background: #3c7e58;
  background: #f59b47;
}

#walletpana img {
  width: 70%;
  height: 100%;
}

.image-adjust img {
  width: 40% !important;
  /* height: 100%; */
}

.continue-text {
  font-family: Nunito Sans !important;
  font-size: 24px;
  font-weight: 700;
  text-align: center;
}

.row-button {
  padding: 5px;
  border-radius: 25px;
  box-shadow: 0 4px 12px rgb(0 0 0 / 10%);
  background: #fff;
  margin: 12px 20px;
  transition: all 0.4s ease-in-out;
  max-height: 40px;
}

.row-button:hover {
  cursor: pointer;
  transform: scale(1.05, 1.05)
}

@media (max-width: 500px) {
  .row-button {
    margin: 12px 10px
  }
}
@media (max-width: 400px) {
  .text-small{
  font-size: 13px;
}
.input-adjust{
  height: calc(1.2em + 0.81rem + 2px) !important;
  padding: 0.3rem 0.4rem !important ;
}
.input-adjustno{
  /* border: 1px solid red; */
  height: calc(1.2em + 0.895rem + 2px) !important;
  /* padding: 0.4rem 0.8rem !important ; */
}
.input-adjustnos{
  /* border: 1px solid red; */
  /* height: calc(1em + 0.5rem + 2px) !important; */
  /* padding: 0.4rem 0.1rem !important ; */
   /* width: 80% !important; */
   height: calc(1.2em + 0.895rem + 2px) !important;
   /* width: 30% !important; */
   border: none !important;
}
.fontwght{
  /* font-weight: 600 !important;
   */
   font-size: 18px !important;
}
}


.tool {
  background-image: url("../../assets/coloured-patterns.svg");
  height: 56rem;
  object-fit: cover;
  background-repeat: no-repeat;
  background-size: cover;
}

.input-width {
  width: 100%
}

@media (min-width: 992px) {
  .input-width {
    width: 350px
  }
}

/* .user image {
  width: 30px;
  padding-right: 0;
  object-fit: cover;
  
} */

.success {
  color: rgb(112, 192, 67);
  font-weight: 900;
  font-size: 30px;
}
</style>