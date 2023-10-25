<template>
  <div>
    <!-- BT MODAL -->
    <div class="container-fluid">
      <div class="row">
        <div class="modal-body">
          <div class="container-fluid">
            <div class="row" v-if="!savingAccount">
              <div class="col-md-12">
                <div class="row my-3">
                  <div class="col-md-4 text-md-right">
                    Account Type <span class="text-danger">*</span>
                  </div>
                  <div class="col-md-7">
                    <el-select-v2
                        v-model="selectedAccountTypeID"
                        class="w-100 font-weight-normal"
                        :options="
                          transactionalAccounts.map((i) => ({
                            label: i.name,
                            value: i.id,
                          }))
                        "
                        placeholder="Select account type"
                        @change="setSelectedAccountType"
                        size="large"
                      />
                      <!-- <button class="  btn d-flex justify-content-between  col-12 border  " type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          <span class="ofering">
                              &nbsp;&nbsp;&nbsp; {{ selectedAccountType.name ?  selectedAccountType.name : 'Select account type' }}
                          </span>
                          <span>
                              <i class="pi pi-angle-down offset-sm-2 ofering"></i>
                          </span>
                      </button>
                      <div class="dropdown-menu scroll w-100 " aria-labelledby="dropdownMenuButton">
                          <a class="dropdown-item" v-for="(itm, indx) in transactionalAccounts" :key="indx">
                              <div class="cursor-pointer" @click="selectAccountType(itm)"> {{itm.name}}</div> 
                          </a>
                      </div> -->
                  </div>
                </div>

                <div class="row my-3">
                  <div class="col-md-4 text-md-right">
                    Account Name <span class="text-danger">*</span>
                  </div>
                  <div class="col-md-7">
                    <el-input
                      type="text"
                      v-model="newAccount.name"
                      class="w-100"
                    />
                  </div>
                </div>

                <div
                  class="row my-3"
                  v-if="account.accountType == 0 || account.accountType == 1"
                >
                  <div class="col-md-4 text-md-right">Account Currency</div>
                  <div class="col-md-7" id="currencySelect">
                    <el-select-v2
                        v-model="selectedCurrencyID"
                        class="w-100 font-weight-normal"
                        :options="
                          accountCurrencies.map((i) => ({
                            label: i.displayName,
                            value: i.id,
                          }))
                        "
                        placeholder="Select account currency"
                        @change="setSelectedCurrency"
                        size="large"
                      />

                      <!-- <button class="  btn d-flex justify-content-between  col-12 border  " type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          <span class="ofering">
                              &nbsp;&nbsp;&nbsp; {{ selectedCurrency.name ?  selectedCurrency.name : 'Select account currency' }}
                          </span>
                          <span>
                              <i class="pi pi-angle-down offset-sm-2 ofering"></i>
                          </span>
                      </button>
                      <div class="dropdown-menu scroll w-100 " aria-labelledby="dropdownMenuButton">
                          <a class="dropdown-item" v-for="(itm, indx) in accountCurrencies" :key="indx">
                              <div class="cursor-pointer" @click="selectCurrency(itm)"> {{itm.name}}</div> 
                          </a>
                      </div> -->
                  </div>
                </div>
                <div
                  class="row my-3"
                  v-if="account.accountType === 2 || account.accountType === 3"
                >
                  <div class="col-md-4 text-md-right">Fund</div>
                  <div class="col-md-7">
                    <el-select-v2
                        v-model="selectedFundID"
                        class="w-100 font-weight-normal"
                        :options="
                          funds.map((i) => ({
                            label: i.name,
                            value: i.id,
                          }))
                        "
                        @change="setSelectedFund"
                        size="large"
                      />
                    <!-- <button
                      class="btn d-flex justify-content-between col-12 border"
                      type="button"
                      id="dropdownMenuButton"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <span class="ofering">
                        &nbsp;&nbsp;&nbsp;
                        {{
                          selectedFund.name
                            ? selectedFund.name
                            : "Select fund"
                        }}
                      </span>
                      <span>
                        <i class="pi pi-angle-down offset-sm-2 ofering"></i>
                      </span>
                    </button> -->
                    <!-- <div
                      class="dropdown-menu scroll w-100"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <a
                        class="dropdown-item"
                        v-for="(itm, indx) in funds"
                        :key="indx"
                      >
                        <div class="cursor-pointer" @click="selectFunds(itm)">
                          {{ itm.name }}
                        </div>
                      </a>
                    </div> -->
                  </div>
                </div>

                <div class="row my-3" v-if="account.accountType !== 4">
                  <div class="col-md-4 text-md-right">Description</div>
                  <div class="col-md-7">
                    <el-input
                      v-model="newAccount.description"
                      :rows="5"
                      type="textarea"
                      class="w-100"
                    />
                    <!-- <textarea
                      v-model="newAccount.description"
                      name=""
                      id=""
                      cols="30"
                      rows="5"
                      class="form-control"
                    ></textarea> -->
                  </div>
                </div>
              </div>
            </div>

            <div class="row my-4" v-if="savingAccount">
              <div class="col-md-12 text-center">
                <!-- <i class="pi pi-spin pi-spinner" style="fontsize: 3rem"></i> -->
                <el-icon :size="20" class="is-loading">
                  <Loading />
                </el-icon>
              </div>
            </div>

            <div class="row my-3">
              <div class="col-md-4 text-md-right"></div>
              <div class="col-md-7">
                <p class="text-danger" v-if="invalidAccountDetails">
                  Please select account type and provide account name
                </p>
              </div>
            </div>
            <div class="row" style="border-top: 1px solid #dee2e6">
              <div class="col-md-12 d-flex justify-content-end mt-3">
                <el-button round class=" mr-3" data-dismiss="modal">
                  Cancel
                </el-button>
                <el-button
                  @click="onSave"
                  round
                  :loading="savingAccount"
                  :color="primarycolor"
                  class=" border-0 text-white"
                >
                  Save
                </el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- END BT -->
  </div>
</template>

<script>
import { ref, watch, inject } from "vue";
import transactionals from "../utilities/transactionals";
import chart_of_accounts from "../../../../services/financials/chart_of_accounts";
import { ElMessage } from "element-plus";
import { useStore } from "vuex";
import membershipService from "../../../../services/membership/membershipservice";

export default {
  props: [
    "transactionalAccounts",
    "accountTypes",
    "currencies",
    "showFundsField",
    "financialAccountType",
    "accountGroupId",
    "index",
    "account",
    "currency",
  ],
  components: {  },
  setup(props, { emit }) {
    const store = useStore();
    const selectedAccountType = ref({});
    const primarycolor = inject("primarycolor");
    const selectedCurrency = ref({});
    const selectedFund = ref({});
    const newAccount = ref({});
    const selectedCurrencyID = ref(null)
    const selectedAccountTypeID = ref(null)
    const selectedFundID = ref(null)
    const userCurrency = ref(store.getters.currentUser.currency);

    const selectFunds = (item) => {
      selectedFund.value = item;
    };

    const setSelectedCurrency = () => {
      selectedCurrency.value = accountCurrencies.value.find((i) => i.id == selectedCurrencyID.value)
    }
    
    const setSelectedFund = () => {
      selectFunds.value = funds.value.find((i) => i.id == selectedFundID.value)
    }
    const selectCurrency = (item) => {
      selectedCurrency.value = item;
    };

    const selectAccountType = (account) => {
      selectedAccountType.value = account;
    };
    const setSelectedAccountType = () => {
      selectedAccountType.value = transactionalAccounts.value.find((i) => i.id == selectedAccountTypeID.value)
      console.log(selectedAccountType.value, "jlkjkljiouiuoo");
    }

    const funds = ref([]);
    const getFunds = async () => {
      try {
        const response = await transactionals.getFunds();
        funds.value = response;
      } catch (error) {
        console.log(error);
      }
    };
    getFunds();

    const edit = async (body) => {
      try {
        savingAccount.value = true;
        const response = await chart_of_accounts.editAccount(body);
        savingAccount.value = false;
        ElMessage({
          type: "success",
          message: `${response.response}`,
          duration: 3000,
        });
        newAccount.value = {};
        emit("save-account", {
          success: true,
          type: props.financialAccountType,
        });
      } catch (error) {
        savingAccount.value = false;
        ElMessage({
          type: "error",
          message: "Account Update Failed",
          duration: 3000,
        });
        newAccount.value = {};
        emit("save-account", {
          success: true,
          type: props.financialAccountType,
        });
        transactionals.getTransactionalAccounts(true);
        console.log(error);
      }
    };

    const savingAccount = ref(false);
    const saveAccount = async (body) => {
      try {
        let response = {};
        if (props.account && props.account.name) {
          const x = {
            name: body.name,
            code: props.account.code,
            accountType: props.account.accountType,
            description: body.description,
            id: props.account.id,
            financialAccountGroupID: selectedAccountType.value.id,
            currencyID: selectedCurrency.value.id,
          };
          response = edit(x);
        } else {
          savingAccount.value = true;
          response = await chart_of_accounts.saveAccount(body);
          savingAccount.value = false;
          if (!response.status) {
            emit("save-account", {
              success: false,
              type: props.financialAccountType,
            });
             ElMessage({
              type: "error",
              message: "Account Creation Failed",
              duration: 3000,
            });
          } else {
            ElMessage({
              type: "success",
              message: `The account ${newAccount.value.name} was created successfully`,
              duration: 3000,
            });
            newAccount.value = {};
            emit("save-account", {
              success: true,
              type: props.financialAccountType,
            });
            transactionals.getTransactionalAccounts(true);
          }
        }
      } catch (error) {
        savingAccount.value = false;
        console.log(error);
      }
    };

    const invalidAccountDetails = ref(false);
    const onSave = () => {
      invalidAccountDetails.value = false;
      if (
        !selectedAccountType.value ||
        !selectedAccountType.value.name ||
        !newAccount.value.name
      ) {
        invalidAccountDetails.value = true;
        return false;
      }

      newAccount.value.financialAccountGroupID = selectedAccountType.value.id;

      if (selectedFund.value && selectedFund.value.id) {
        newAccount.value.financialFundID = selectedFund.value.id;
      }
      saveAccount(newAccount.value);
    };

    watch(() => {
      if (props.accountGroupId) {
        selectedAccountType.value = props.transactionalAccounts[
          props.index
        ].find((i) => i.name === props.accountGroupId);
      }
      if (props.account) {
        newAccount.value.name = props.account ? props.account.name : "";
        newAccount.value.description = props.account
          ? props.account.description
          : "";
      }
    });

    const accountCurrencies = ref([]);
    const getCurrencies = async () => {
      try {
        const response = await transactionals.getCurrencies();
        accountCurrencies.value = response;
        if (!userCurrency.value) {
          membershipService
            .getSignedInUser()
            .then((res) => {
              selectedCurrency.value = accountCurrencies.value.find(
                (i) => i.name === res.currency
              );
            })
            .catch((err) => console.log(err));
        } else {
          selectedCurrency.value = accountCurrencies.value.find((i) => {
            return i.name.includes(userCurrency.value);
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    getCurrencies();

    return {
      selectFunds,
      selectedFundID,
      setSelectedFund,
      selectedCurrencyID,
      setSelectedCurrency,
      selectedAccountTypeID,
      setSelectedAccountType,
      selectCurrency,
      selectAccountType,
      selectedAccountType,
      funds,
      primarycolor,
      newAccount,
      selectedCurrency,
      selectedFund,
      onSave,
      invalidAccountDetails,
      savingAccount,
      accountCurrencies,
    };
  },
};
</script>

<style scoped>
.p-dropdown-items {
  width: 100px !important;
}

.scroll {
  max-height: 200px;
  overflow-y: scroll;
  overflow-x: hidden;
}
</style>