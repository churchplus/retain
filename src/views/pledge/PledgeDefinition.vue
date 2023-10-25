<template>
  <div>
    <div class="container-fluid">
      <div class="row">
        <div class="head-text">Create Pledge Item</div>
        <div class="col-12 mt-3 px-0">
          <div class="text-primary c-pointer col-md-2" @click="previousPage"> 
            <el-icon><DArrowLeft /></el-icon> Back
          </div>
        </div>
      </div>
      <div class="mt-4 d-block d-md-none text-center" v-if="groupLoading">
        <el-icon class="s-20">
            <Loading />
          </el-icon>
      </div>
      <div class="row">
        <div class="col-md-10 col-lg-8">
          <!-- Contribution item -->
          <div class="row mt-5">
            <div class="col-md-10 offset-md-2">
              <div class="row">
                <div
                  class="col-12 col-sm-12 col-lg-4 text-sm-left text-lg-right align-self-center"
                >
                  <label for="" class=""
                    >Contribution <sup class="text-danger">*</sup>
                  </label>
                </div>

                <div class="col-12 col-sm-12 col-lg-8">
                  <el-dropdown trigger="click" class="w-100">
                    <span class="el-dropdown-link w-100">
                      <div
                        class="d-flex justify-content-between border-contribution  w-100"
                        size="large"
                      >
                        <span class="text-secondary">{{
                          selectedContribution &&
                          Object.keys(selectedContribution).length > 0
                            ? selectedContribution.name
                            : "Select contribution"
                        }}</span>
                        <div>
                          <el-icon class="el-icon--right">
                            <arrow-down />
                          </el-icon>
                        </div>
                      </div>
                    </span>
                    <template #dropdown>
                      <el-dropdown-menu>
                        <el-dropdown-item
                          v-for="(itm, indx) in contributionItems"
                          :key="indx"
                          @click="selectContribution(itm)"
                          >{{ itm.name }}
                        </el-dropdown-item>
                        <el-dropdown-item
                          data-toggle="modal"
                          data-target="#exampleModalCenter"
                          class="text-center"
                          divided
                          ><a
                            class="font-weight-bold small-text d-flex justify-content-center py-2 text-decoration-none primary-text"
                            style="color: #136acd"
                          >
                            <el-icon size="large">
                              <CirclePlus />
                            </el-icon>
                            Create new contribution item
                          </a></el-dropdown-item
                        >
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                </div>
              </div>
            </div>
            <!-- Modal -->
            <div
              class="modal fade"
              id="exampleModalCenter"
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalCenterTitle"
              aria-hidden="true"
            >
              <div
                class="modal-dialog modal-lg modal-dialog-centered"
                role="document"
              >
                <div class="modal-content">
                  <div class="modal-header" style="border: none">
                    <h5 class="modal-title" id="exampleModalLongTitle">
                      Add Contribution
                    </h5>
                    <button
                      type="button"
                      class="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <ContributionItems @item-name="newConItems" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Name -->
          <div class="row my-1 mt-4">
            <div class="col-md-10 offset-md-2">
              <div class="row">
                <div
                  class="col-12 col-sm-12 col-lg-4 text-sm-left text-lg-right align-self-center"
                >
                  <label for="" class=""
                    >Name <sup class="text-danger">*</sup>
                  </label>
                </div>

                <div class="col-12 col-sm-12 col-lg-8">
                  <el-input
                    type="text"
                    v-model="pledgeName"
                    :class="{ 'is-invalid': !isNameValid }"
                    @blur="checkNameValue"
                    placeholder="Enter pledge name"
                  />
                  <div class="invalid-feedback">
                    Please enter your pledge name.
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-10 offset-md-2 mt-3">
              <div class="row">
                <div
                  class="col-12 col-sm-12 col-lg-4 text-sm-left text-lg-right align-self-center"
                >
                  <label for="" class=""
                    >Currency <sup class="text-danger">*</sup>
                  </label>
                </div>

                <div class="col-12 col-sm-12 col-lg-8">
                  <el-dropdown trigger="click" class="w-100">
                    <span class="el-dropdown-link w-100">
                      <div
                        class="d-flex justify-content-between border-contribution  w-100"
                        size="large"
                      >
                        <span class="text-secondary">{{
                          selectedCurrency &&
                          Object.keys(selectedCurrency).length > 0
                            ? selectedCurrency.name
                            : "Select Currency"
                        }}</span>
                        <div>
                          <el-icon class="el-icon--right">
                            <arrow-down />
                          </el-icon>
                        </div>
                      </div>
                    </span>
                    <template #dropdown>
                      <el-dropdown-menu>
                        <el-dropdown-item
                          v-for="(itm, indx) in currencyList"
                          :key="indx"
                          @click="setSelectedCurrency(itm)"
                          >{{ itm.name }}  -  {{itm.country}}
                        </el-dropdown-item>
                        <el-dropdown-item
                          class="text-center"
                          divided
                          ></el-dropdown-item
                        >
                      
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                  <!-- <el-select-v2
                    v-model="selectedCurrencyId"
                    class="w-100 font-weight-normal"
                    :options="
                      currencyList.map((i) => ({
                            label: i.name,
                            value: i.id,
                          }))
                    "
                    placeholder="Select Currency"
                    size="large"
                    @change="setSelectedCurrency"
                  >
                    <template #default="{ item }">
                      <span style="margin-right: 8px"
                        >{{ item.label }} - {{ countryCurrency(item) }}</span
                      >
                    </template>
                  </el-select-v2> -->
                </div>
              </div>
            </div>
          </div>

          <!-- Pledge type -->
          <div class="row my-1 mt-4">
            <div class="col-md-10 mt-1 offset-md-2">
              <div class="row">
                <div
                  class="col-12 col-sm-12 col-lg-4 text-sm-left text-lg-right align-self-center"
                >
                  <label for="" class="">Pledge type </label>
                </div>
                <div
                  class="col-12 col-sm-12 col-lg-8 d-flex justify-content-between flex-wrap"
                >
                  <div
                    class="col-md-4 border py-2 c-pointer free-will"
                    :class="{ 'show-free-will': pledgeCategory == 'freewill' }"
                    @click="freeWill"
                  >
                    Free Will
                  </div>
                  <div
                    class="col-md-4 mt-4 mt-md-0 border py-2 c-pointer"
                    :class="{ 'show-specific': pledgeCategory == 'specific' }"
                    @click="specific"
                  >
                    Specific
                  </div>
                  <div
                    class="col-md-4 mt-4 mt-md-0 border py-2 c-pointer"
                    :class="{ 'show-range': pledgeCategory == 'range' }"
                    @click="range"
                  >
                    Range
                  </div>
                </div>
                <div class="col-md-12 mt-3" v-if="pledgeCategory == 'specific'">
                  <div class="row">
                    <div
                      class="col-12 col-sm-12 col-lg-4 text-sm-left text-lg-right align-self-center"
                    >
                      <label for="" class=""> Amount </label>
                    </div>
                    <div class="col-12 col-sm-12 col-lg-8">
                      <el-input
                        type="text"
                        v-model="specificAmount"
                        placeholder="Enter specific amount"
                      />
                    </div>
                  </div>
                </div>
                <div class="col-md-12 mt-3" v-if="pledgeCategory == 'range'">
                  <div class="row">
                    <div
                      class="col-12 col-sm-12 col-lg-4 text-sm-left text-lg-right align-self-center"
                    >
                      <label for="" class="d-none d-lg-block"> Amount </label>
                    </div>
                    <div class="col-12 col-lg-4">
                      <label for="" class="d-block d-lg-none">
                        Amount From
                      </label>

                      <el-input
                        type="text"
                        v-model="amountFrom"
                        placeholder="From"
                      />
                    </div>
                    <div class="col-12 mt-3 mt-md-0 mt-lg-0 col-lg-4 pl-lg-0">
                      <label for="" class="d-block d-lg-none">
                        Amount To
                      </label>

                      <el-input
                        type="text"
                        v-model="amountTo"
                        placeholder="To"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Frequency -->
          <div class="row my-1 mt-4">
            <div class="col-md-10 offset-md-2">
              <div class="row">
                <div
                  class="col-12 col-sm-12 col-lg-4 text-sm-left text-lg-right align-self-center"
                >
                </div>

                <div class="col-12 col-sm-12 col-lg-8 d-flex flex-wrap">
                  <div
                    class="col-12 col-sm-12 col-lg-6 border py-2 c-pointer"
                    :class="{ 'show-one-time': pledgeFrequency == 'onetime' }"
                    @click="oneTime"
                  >
                    One time
                  </div>
                  <div
                    class="col-12 mt-4 mt-lg-0 col-sm-12 col-lg-6 border py-2 c-pointer"
                    :class="{
                      'show-reoccuring': pledgeFrequency == 'reoccuring',
                    }"
                    @click="reOccuring"
                  >
                    Reoccuring
                  </div>
                </div>
                <div class="col-md-12 mt-3" v-if="pledgeFrequency == 'onetime'">
                  <div class="row">
                    <div
                      class="col-12 col-sm-12 col-lg-4 text-sm-left text-lg-right align-self-center"
                    >
                      <label for="" class=""> Start Date </label>
                    </div>
                    <div class="col-12 col-sm-12 col-lg-8">
                      <el-date-picker
                        v-model="dateRangeValue"
                        type="daterange"
                        unlink-panels
                        range-separator="To"
                        start-placeholder="Start date"
                        end-placeholder="End date"
                        :shortcuts="shortcuts"
                        size="large"
                        class="w-100"
                        @change="setDatePicker"
                      />
                    </div>
                  </div>
                </div>
                <div
                  class="col-md-12 mt-3"
                  v-if="pledgeFrequency == 'reoccuring'"
                >
                  <div class="row">
                    <div
                      class="col-12 col-sm-12 col-lg-4 text-sm-left text-lg-right align-self-center"
                    >
                      <label for="" class="">Frequency</label>
                    </div>
                    <div class="col-12 col-sm-12 col-lg-8">
                      <el-select-v2
                        v-model="setSelectedRange"
                        class="w-100 font-weight-normal"
                        :options="
                          reOccuringRange.map((i) => ({
                            label: i.name,
                            value: i.id,
                          }))
                        "
                        placeholder="Frequency"
                        @change="rangeSelected"
                        size="large"
                      />
                    </div>
                  </div>
                </div>

                <div class="col-md-12 mt-3">
                  <div class="row">
                    <div
                      class="col-12 col-sm-12 col-lg-4 text-sm-left text-lg-right align-self-center"
                    >
                      <label for="" class=""> Choose group(s) </label>
                    </div>
                    <div class="col-12 col-sm-12 col-lg-8">
                      <el-tree-select
                        v-model="selectedGroupTree"
                        :data="groupMappedTree"
                        :render-after-expand="false"
                        check-strictly
                        multiple
                        show-checkbox
                        check-on-click-node
                        class="w-100"
                      />
                    </div>
                  </div>
                </div>

                <div class="col-md-12 mt-3">
                  <div class="row">
                    <div
                      class="col-12 col-sm-12 col-lg-4 text-sm-left text-lg-right align-self-center"
                    >
                      <label for="" class="">Notify members</label>
                    </div>
                    <div class="col-12 col-sm-12 col-lg-8">
                      <el-checkbox v-model="notify" size="large" />
                    </div>
                  </div>
                </div>
                <div class="col-md-12">
                  <Transition name="slide-fade">
                    <div class="row" v-if="notify">
                      <div
                        class="col-12 col-sm-12 col-lg-4 text-sm-left text-lg-right align-self-center"
                      >
                        <label for="" class="">Notify via</label>
                      </div>
                      <div class="col-12 col-sm-12 col-lg-8">
                        <el-checkbox
                          v-model="SMSnotify"
                          label="SMS"
                          size="large"
                        />
                        <el-checkbox
                          v-model="emailNotify"
                          label="Email"
                          size="large"
                        />
                      </div>
                    </div>
                  </Transition>
                </div>
                <div class="col-md-12">
                  <div class="row">
                    <div
                      class="col-12 col-sm-12 col-lg-4 text-sm-left text-lg-right align-self-center"
                    >
                      <label for="" class="">Make mandatory</label>
                    </div>
                    <div class="col-12 col-sm-12 col-lg-8">
                      <el-checkbox v-model="makeMandatory" size="large" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row my-1 mt-4">
            <div class="col-md-10 offset-md-2">
              <div class="row">
                <div class="col-md-12">
                  <hr class="hr my-3" />
                </div>
              </div>
            </div>
          </div>

          <!-- Bank -->
          <div class="row my-1 mt-4">
            <div class="col-md-10 offset-md-2">
              <div class="row">
                <div
                  class="col-12 col-sm-12 col-lg-4 text-sm-left text-lg-right align-self-center"
                >
                  <label for="" class="">Bank </label>
                </div>

                <div class="col-12 col-sm-12 col-lg-8">
                  <div class="dropdown w-100">
                    <el-dropdown trigger="click" class="w-100">
                      <span class="el-dropdown-link w-100">
                        <el-input
                          type="text"
                          placeholder='Select Bank'
                          v-model="bankSearchText"
                        />
                      </span>
                      <template #dropdown>
                        <el-dropdown-menu>
                          <el-dropdown-item
                            v-for="item in filteredBanks"
                            :key="item.id"
                            @click="setBank(item)"
                          >
                            {{ item ? item.name : "" }}
                          </el-dropdown-item>
                        </el-dropdown-menu>
                      </template>
                    </el-dropdown>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Account number -->
          <div class="row my-1 mt-4">
            <div class="col-md-10 offset-md-2">
              <div class="row">
                <div
                  class="col-12 col-sm-12 col-lg-4 text-sm-left text-lg-right"
                >
                  <label for="" class="">Account Number </label>
                </div>

                <div class="col-12 col-sm-12 col-lg-8">
                  <el-input
                    type="text"
                    placeholder="Enter account number"
                    v-model="accountNumber"
                    @blur="resolveCustomerDetail"
                  />
                  <div
                    class="col-sm-2 col-lg-3 align-self-center mt-4"
                    v-if="accountResolving"
                  >
                    <div style="width: 3rem; height: 3rem" role="status">
                      <el-icon class="is-loading">
                        <Loading />
                      </el-icon>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Account name -->
          <div class="row my-1 mt-4">
            <div class="col-md-10 offset-md-2">
              <div class="row">
                <div
                  class="col-12 col-sm-12 col-lg-4 text-sm-left text-lg-right"
                >
                  <label for="" class="">Account Name </label>
                </div>

                <div class="col-12 col-sm-12 col-lg-8">
                  <input
                    type="text"
                    v-model="accountName"
                    placeholder="Account name"
                    class="form-control"
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="row my-1 mt-5">
            <div class="col-md-10 offset-md-2">
              <div class="row">
                <div class="col-12 col-sm-12 col-lg-8 offset-lg-4">
                  <el-button
                    :color="primarycolor"
                    class="w-100"
                    round
                    :loading="loading"
                    @click="savePledge"
                    >Save</el-button
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="mt-4 d-none d-md-block" v-loading="groupLoading" >
          </div>
        </div>
      </div>
      <div class="mt-3">
        <Table
          :data="pledgesBoundToItem"
          :headers="pledgeDefinitionHeaders"
          :checkMultipleItem="false"
          v-if="pledgesBoundToItem.length > 0"
        >
          <template #pledgeType="{ item }">
            <span>{{ item.pledgeType.name }}</span>
          </template>
          <template v-slot:person="{ item }">
            <span> {{ item.person ? item.person.firstName : "" }}</span>
            <span>{{ item.person ? item.person.lastName : "" }}</span>
          </template>
          <template v-slot:amount="{ item }">
            <span
              >{{
                item && item.pledgeType && item.pledgeType.currency
                  ? item.pledgeType.currency.symbol
                  : ""
              }}
              {{ item.amount }}</span
            >
          </template>
          <template v-slot:redeemed="{ item }">
            <span
              >{{
                item && item.pledgeType && item.pledgeType.currency
                  ? item.pledgeType.currency.symbol
                  : ""
              }}
              {{ item.amount }}</span
            >
          </template>
          <template v-slot:date="{ item }">
            <span>{{ dateFormat(item.date) }}</span>
          </template>
          <template v-slot:pledgeItemID>
            <div class="small-text">
              <router-link
                :to="`/partnership/pay?pledgeDefinitionID=${pledgeItemID}`"
                class="text-color text-primary text-decoration-none"
              >
                PaymentLink
              </router-link>
            </div>
          </template>
        </Table>
      </div>

      <div class="row d-flex justify-content-center my-4" v-if="pledgeLoader">
        <el-icon class="s-20">
            <Loading />
          </el-icon>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/gateway/backendapi";
import axio from "axios";
import { ref, computed, watchEffect, inject } from "vue";
import finish from "../../services/progressbar/progress";
import monthDayYear from "../../services/dates/dateformatter";
import { useRoute } from "vue-router";
import ContributionItems from "@/components/firsttimer/contributionItemModal";
import router from "../../router";
import { ElMessage } from "element-plus";
import store from "../../store/store";
import ToggleButton from "../donation/toggleButton.vue";
import grousService from "../../services/groups/groupsservice";
import datePickerShortcut from "@/mixins/el-datepicker-shortcut.vue";
import collector from "../../services/groupArray/mapTree";
import Table from "@/components/table/Table";
export default {
  components: {
    ContributionItems,
    ToggleButton,
    Table,
  },
  inheritAttrs: false,
  setup() {
    const route = useRoute();
    const primarycolor = inject('primarycolor')
    const startDate = ref("");
    const pledgeItemID = ref(route.query.id);
    const endDate = ref("");
    const Address = ref("");
    const loading = ref(false);
    const value = ref();
    const pledgeCategory = ref("freewill");
    const pledgeFrequency = ref("");
    const showRange = ref(false);
    const selectedRange = ref({});
    const selectedContribution = ref({});
    const selectedCurrencyId = ref(null);
    const selectedCurrency = ref({ name: "Select currency" });
    const isNameValid = ref(true);
    const pledgeName = ref("");
    const amountFrom = ref();
    const amountTo = ref();
    const specificAmount = ref("");
    const pledgeType = ref(0);
    const currencyList = ref([]);
    const contributionItems = ref([]);
    const singlePledge = ref({});
    const targetAmount = ref("");
    const setSelectedRange = ref(null);
    const reOccuringRange = ref([
      { name: "Daily", id: 0 },
      { name: "Weekly", id: 1 },
      { name: "Monthly", id: 2 },
      { name: "Quarterly", id: 3 },
      { name: "SemiAnnually", id: 4 },
      { name: "Yearly", id: 5 },
    ]);
    const pledgeDefinitionHeaders = ref([
      { name: "NAME", value: "pledgeType" },
      { name: "CONTACT", value: "person" },
      { name: "PLEDGE AMOUNT", value: "amount" },
      { name: "REDEMEED", value: "redeemed" },
      { name: "DATE", value: "date" },
      { name: "LINK", value: "pledgeItemID" },
    ]);
    const selectedBank = ref("");
    const bankSearchText = ref("");
    const nigerianBanks = ref([]);
    const accountNumber = ref("");
    const accountName = ref("");
    const accountResolving = ref(false);
    const selectedIncomeAccount = ref({});
    const incomeAccount = ref([]);
    const selectedCashAccount = ref({});
    const cashBankAccount = ref([]);
    const selectedGroups = ref([]);
    const checked = ref(false);
    const pledgesBoundToItem = ref([]);
    const compulsoryCondition = ref("");
    const pledgeLoader = ref(false);
    const groupLoading = ref(false);
    const paymentFormId = ref("");
    const dateRangeValue = ref(null);
    const { shortcuts } = ref(datePickerShortcut());
    const groupMappedTree = ref([]);
    const selectedGroupTree = ref();
    const notify = ref(false);
    const SMSnotify = ref(false);
    const emailNotify = ref(false);
    const makeMandatory = ref(false);

    const date = (offDate) => {
      return monthDayYear.normalDate(offDate);
    };

    const getBanks = () => {
      axios
        .get("/api/Financials/GetBanks")
        .then((res) => {
          nigerianBanks.value = res.data;
          if (route.query.id) getSinglePledgeDefinition();
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getBanks();

    const getSinglePledgeDefinition = async () => {
      pledgeLoader.value = true;
      try {
        const res = await axios.get(
          `/api/Pledge/GetSinglePledgeDefinitions?ID=${route.query.id}`
        );
        finish();
        groupLoading.value = false;
        pledgeLoader.value = false;
        getAllCurrencies(res.data.returnObject.currency.id);
        getContributionCategory(res.data.returnObject.financialContributionID);
        selectedGroupTree.value = res.data.returnObject.compulsoryCondition ? res.data.returnObject.compulsoryCondition.split(",") : [];
        targetAmount.value = res.data.returnObject.totalTargetAmount;
        pledgeName.value = res.data.returnObject.name;
        specificAmount.value = res.data.returnObject.donorPaymentSpecificAmount;
        accountName.value = res.data.returnObject.paymentForm.accountName;
        accountNumber.value = res.data.returnObject.paymentForm.accountNumber;
        bankSearchText.value =  nigerianBanks.value.find(i => i.code == res.data.returnObject.paymentForm.bankCode).name, 
                                 
        amountFrom.value = res.data.returnObject.donorPaymentRangeFromAmount;
        amountTo.value = res.data.returnObject.donorPaymentRangeToAmount;
        dateRangeValue.value = [ res.data.returnObject.pledgeTypeFrequencyOneTimeStartDate, res.data.returnObject.pledgeTypeFrequencyOneTimeEndDate ];
        console.log(res.data.returnObject.name, "kkkkk");
        setDatePicker();
        
        setSelectedRange.value = res.data.returnObject.pledgeTypeFrequencyReOccuring
        selectedRange.value = reOccuringRange.value.find(i => i.id == setSelectedRange.value);
        if (dateRangeValue.value ) {
          pledgeFrequency.value = "onetime";
        }

        if (selectedRange.value) {
          pledgeFrequency.value = "reoccuring";
        }

        if (res.data.returnObject.donorPaymentType === 0) {
          pledgeCategory.value = "freewill";
          pledgeType.value = 0;
        } else if (res.data.returnObject.donorPaymentType === 1) {
          pledgeCategory.value = "specific";
          pledgeType.value = 1;
        } else if (res.data.returnObject.donorPaymentType === 2) {
          pledgeCategory.value = "range";
          pledgeType.value = 2;
        } else {
          res.data.returnObject.donorPaymentType;
        }

        pledgesBoundToItem.value = res.data.returnObject.pledges;
        console.log(pledgesBoundToItem.value, "pledgesBoundToItem");
        paymentFormId.value = res.data.returnObject.paymentFormID;
      } catch (error) {
        pledgeLoader.value = false;
        groupLoading.value = false;
      }
    };
    

    const newConItems = (payload) => {
      contributionItems.value.push(payload)
      selectedContribution.value = payload
    };

    const selectContribution = (item) => {
      selectedContribution.value = item;
    };

    const getContributionCategory = (id) => {
      axios
        .get("/api/financials/contributions/items")
        .then((res) => {
          contributionItems.value = res.data;

          if (id) {
            selectedContribution.value = contributionItems.value.find(
              (i) => i.id == id
            );
          }
        })
        .catch((err) => {
          finish();
          if (err.toString().toLowerCase().includes("network error")) {
            networkError.value = true;
          } else {
            networkError.value = false;
          }
        });
    };
    getContributionCategory();

    const savePledge = async () => {
      console.log(selectedGroupTree.value)
      let pledgeDetails = {
        contributionID: selectedContribution.value.id,
        totalTargetAmount: targetAmount.value,
        donorPaymentType: pledgeType.value,
        name: pledgeName.value,
        donorPaymentSpecificAmount: specificAmount.value,
        donorPaymentRangeFromAmount: amountFrom.value,
        donorPaymentRangeToAmount: amountTo.value,
        pledgeTypeFrequencyOneTimeStartDate: startDate.value,
        pledgeTypeFrequencyOneTimeEndDate: endDate.value,
        pledgeTypeFrequencyReOccuring: selectedRange.value ? selectedRange.value.name : "",
        currencyID: selectedCurrency.value.id,
        compulsoryCondition: selectedGroupTree.value.join(","),
        bankName: selectedBank.value.name,
        bankCode: selectedBank.value.code,
        accountName: accountName.value,
        accountNumber: accountNumber.value,
        notifyMembers: notify.value,
        smsNotify: SMSnotify.value,
        emailNotify: emailNotify.value,
        isCompulsory: makeMandatory.value,
      };
      loading.value = true;
      if (route.query.id) {
        pledgeDetails.id = route.query.id;
        pledgeDetails.paymentFormID = paymentFormId.value;
        try {
           await axios.put(
            "/api/Pledge/UpdatePledgeDefinition",
            pledgeDetails
          );
          ElMessage({
            type: "success",
            message: "Pledge definition updated successfully",
            duration: 3000,
          });
          store.dispatch("pledge/getPledgeDefinition").then(() => {
            router.push("/tenant/pledge/pledgedefinitionlist");
          });

          loading.value = false;
        } catch (error) {
          loading.value = false;
        }
      } else {
        try {
          const res = await axios.post(
            "/api/Pledge/CreatePledgeDefinition",
            pledgeDetails
          );
          finish();
          loading.value = false;
          ElMessage({
            type: "success",
            message: "Pledge definition created successfully",
            duration: 2000,
          });

          store.dispatch("pledge/getPledgeDefinition").then(() => {
            router.push("/tenant/pledge/pledgedefinitionlist");
          });

          targetAmount.value = "";
          amountTo.value = "";
          amountFrom.value = "";
          selectedCurrency.value = {};
          pledgeName.value = "";
          selectedContribution.value = {};
          specificAmount.value = "";
          selectedRange.value = {};
          startDate.value = "";
          endDate.value = "";
        } catch (error) {
          loading.value = false;
        }
      }
    };
    const getAllCurrencies = (id) => {
      axios
        .get("/api/lookup/getallcurrencies")
        .then((res) => {
          currencyList.value = res.data.map((i) => {
            return {
              name: i.shortCode,
              id: i.id,
              country: i.country,
            };
          });
          if (id) {
            selectedCurrency.value = currencyList.value.find((i) => i.id == id);
          }
        })
        .catch((err) => console.log(err));
    };
    getAllCurrencies();

    const specific = () => {
      pledgeCategory.value = "specific";

      pledgeType.value = 1;
    };
    const range = () => {
      pledgeCategory.value = "range";
      pledgeType.value = 2;
    };
    const freeWill = () => {
      pledgeCategory.value = "freewill";
      pledgeType.value = 0;
    };
    const oneTime = () => {
      pledgeFrequency.value = "onetime";
    };
    const reOccuring = () => {
      pledgeFrequency.value = "reoccuring";
    };

    const checkNameValue = () => {
      if (pledgeName.value.length == 0) {
        isNameValid.value = false;
      } else {
        isNameValid.value = true;
      }
    };

    const filteredBanks = computed(() => {
      if (!bankSearchText.value) return nigerianBanks.value;
      return nigerianBanks.value.filter((i) =>
        i.name.toLowerCase().includes(bankSearchText.value.toLowerCase())
      );
    });

    const setBank = (item) => {
      bankSearchText.value = item.name;
      selectedBank.value = item;
    };

    const resolveCustomerDetail = async () => {
      accountResolving.value = true;

      try {
        let { data } = await axio.post(
          `https://api.ravepay.co/flwv3-pug/getpaidx/api/resolve_account`,
          {
            recipientaccount: accountNumber.value,
            destbankcode: selectedBank.value.code,
            PBFPubKey: process.env.VUE_APP_FLUTTERWAVE_PUBLIC_KEY_LIVE,
          }
        );
        accountName.value = data.data.data.accountname;

        accountResolving.value = false;

        if (data.data.data.responsemessage.toLowerCase().includes("sorry")) {

          ElMessage({
            type: "warn",
            message: data.data.data.responsemessage,
            duration: 8000,
          });
        } else {
          ElMessage({
            type: "success",
            message: "Account Check Successful",
            duration: 8000,
          });
        }
      } catch (error) {
        finish();
        console.log(error);

        accountResolving.value = false;

        if (!accountNumber.value || accountNumber.value === "") {
          ElMessage({
            type: "warn",
            message: "No account number found",
            duration: 4000,
          });
        } else {
          ElMessage({
            type: "error",
            message: "Please check your banks details again",
            duration: 4000,
          });
        }
      }
    };

    const getIncomeAccount = () => {
      axios
        .get("/api/Financials/Accounts/GetIncomeAccounts")
        .then((res) => {
          incomeAccount.value = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getIncomeAccount();

    const getCashBankAccount = () => {
      axios
        .get("/api/financials/accounts/getcashbankaccounts")
        .then((res) => {
          cashBankAccount.value = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getCashBankAccount();

    const groups = ref([]);
    const getGroups = async () => {
      groupLoading.value = true;
      try {
        const { response } = await grousService.getGroups();
        groups.value = response.groupResonseDTO.map((i) => {
          return { id: i.id, name: i.name, children: i.children };
        });
        groups.value.unshift({
          id: "0000-000-0000-0000-0000-0000",
          name: "Entire ministry",
        });
        let data = { children: groups.value };
        const { children } = collector(data);
        groupMappedTree.value = children;
        
        groupLoading.value = false;
      } catch (error) {
        console.log(error);
        groupLoading.value = false;
      }
    };
    getGroups();

    const dateFormat = (offDate) => {
      return monthDayYear.monthDayYear(offDate);
    };

    const getTenantCurrency = (tenantId) => {
      axios
        .get(`/api/Lookup/TenantCurrency?tenantID=${tenantId}`)
        .then((res) => {
          selectedCurrency.value = {
            name: res.data.currency,
            id: res.data.currencyId,
            country: res.data.tenantCountry,
          };
        })
        .catch((err) => console.log(err));
    };

    watchEffect(() => {
      if (
        store.getters.currentUser &&
        Object.keys(store.getters.currentUser).length > 0 &&
        !route.query.id
      ) {
        getTenantCurrency(store.getters.currentUser.tenantId);
      }
    });

    const countryCurrency = (item) => {
      if (currencyList.value.length > 0)
        return currencyList.value.find((i) => i.id == item.value)
          ? currencyList.value.find((i) => i.id == item.value).country
          : "";
    };

    const rangeSelected = () => {
      selectedRange.value = reOccuringRange.value.find(
        (i) => i.id == setSelectedRange.value
      );
    };

    const setSelectedCurrency = (item) => {
      selectedCurrency.value = item;
    };

    const setDatePicker = () => {
      startDate.value = dateRangeValue.value[0];
      endDate.value = dateRangeValue.value[1];
    };
     const previousPage =() =>{
      router.push("/tenant/pledge/pledgedefinitionlist")
    }

    const filterNodeMethod = (value, data) =>
      data.label.toLowerCase().includes(value.toLowerCase());

    return {
      newConItems,
      previousPage,
      pledgeItemID,
      date,
      currencyList,
      selectContribution,
      contributionItems,
      targetAmount,
      isNameValid,
      pledgeName,
      amountFrom,
      amountTo,
      specificAmount,
      checkNameValue,
      selectedCurrencyId,
      selectedCurrency,
      selectedContribution,
      startDate,
      endDate,
      showRange,
      freeWill,
      oneTime,
      reOccuring,
      range,
      specific,
      pledgeCategory,
      pledgeFrequency,
      pledgeType,
      savePledge,
      Address,
      value,
      loading,
      reOccuringRange,
      selectedRange,
      singlePledge,
      selectedBank,
      bankSearchText,
      filteredBanks,
      nigerianBanks,
      setBank,
      accountNumber,
      resolveCustomerDetail,
      accountName,
      accountResolving,
      selectedIncomeAccount,
      incomeAccount,
      selectedCashAccount,
      cashBankAccount,
      groups,
      selectedGroups,
      checked,
      pledgesBoundToItem,
      dateFormat,
      compulsoryCondition,
      pledgeLoader,
      paymentFormId,
      groupLoading,
      countryCurrency,
      setSelectedCurrency,
      shortcuts,
      dateRangeValue,
      setDatePicker,
      groupMappedTree,
      selectedGroupTree,
      filterNodeMethod,
      setSelectedRange,
      rangeSelected,
      notify,
      SMSnotify,
      emailNotify,
      makeMandatory,
      pledgeDefinitionHeaders,
      primarycolor
    };
  },
};
</script>

<style scoped>
.p-dropdown {
  width: 14rem;
}

.country-item {
  width: 17px;
  margin-right: 0.5rem;
}

.scroll {
  max-height: 200px;
  overflow-y: scroll;
  overflow-x: hidden;
}

.heading-text {
  font: normal normal 800 1.5rem Nunito sans;
}

.show-specific {
  background-image: linear-gradient(to top, #accbee 0%, #e7f0fd 100%);
  font-weight: bold;
}

.show-range {
  background-image: linear-gradient(to top, #accbee 0%, #e7f0fd 100%);
  font-weight: bold;
}

.show-free-will {
  background-image: linear-gradient(to top, #accbee 0%, #e7f0fd 100%);
  font-weight: bold;
}

.show-one-time {
  background-image: linear-gradient(to top, #accbee 0%, #e7f0fd 100%);
  font-weight: bold;
}

.show-reoccuring {
  background-image: linear-gradient(to top, #accbee 0%, #e7f0fd 100%);
  font-weight: bold;
}

.hover:hover {
  background: #eee;
}

.desc-head {
  font-weight: 700;
}

.pi-spinner {
  color: #136acd;
}

.fa-ellipsis-v {
  padding: 10px;
}

.border-contribution {
  border: 1.6px solid rgb(229, 232, 237);
  border-radius: 4px;
  padding: 11px 7px;
}


</style>