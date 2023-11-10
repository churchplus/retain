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
                    <el-dropdown trigger="click" class="w-100 mt-2">
                      <span class="el-dropdown-link w-100">
                        <div
                          class="d-flex justify-content-between border-contribution w-100"
                          size="large"
                        >
                          <div>
                            {{
                              !selectedAccountType || !selectedAccountType.name
                                ? "Select account type"
                                : selectedAccountType.name
                            }}
                          </div>
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
                            v-for="(accounts, index) in transactionalAccounts"
                            :key="index"
                          >
                            <div class="col-md-12 px-2">
                              <div
                                v-if="accounts.length > 0"
                                class="py-2 font-weight-700 border-bottom"
                              >
                                {{ accountTypes[index] }}
                              </div>
                              <div
                                v-for="(account, indx) in accounts"
                                :key="indx"
                                @click="selectAccountType(account)"
                                class="c-pointer py-2"
                              >
                                {{ account.name }}
                              </div>
                            </div>
                          </el-dropdown-item>
                        </el-dropdown-menu>
                      </template>
                    </el-dropdown>
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

                <div class="row my-3" v-if="currency">
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
                  </div>
                </div>

                <div class="row my-3" v-if="showFundsField">
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
                  </div>
                </div>

                <div class="row my-3">
                  <div class="col-md-4 text-md-right">Description</div>
                  <div class="col-md-7">
                    <el-input
                      v-model="newAccount.description"
                      :rows="5"
                      type="textarea"
                      class="w-100"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="row my-4" v-if="savingAccount">
              <div class="col-md-12 text-center">
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
                <el-button round class="mr-3" data-dismiss="modal">
                  Cancel
                </el-button>
                <el-button
                  @click="onSave"
                  round
                  :loading="savingAccount"
                  :color="primarycolor"
                  class="border-0 text-white"
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
import { computed, ref, inject, watch } from "vue";
import transactionals from "../utilities/transactionals";
import chart_of_accounts from "../../../../services/financials/chart_of_accounts";
import membershipService from "../../../../services/membership/membershipservice";
import { useStore } from "vuex";
import { ElMessage } from "element-plus";

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
  components: {},
  setup(props, { emit }) {
    const store = useStore();
    const loading = ref(false);
    const primarycolor = inject("primarycolor");

    const selectedAccountType = ref({});
    const selectedCurrency = ref({});
    const selectedFund = ref({});
    const newAccount = ref({});
    const selectedCurrencyID = ref(null);
    const selectedFundID = ref(null);
    const userCurrency = ref(
      store.getters.currentUser ? store.getters.currentUser.currency : ""
    );

    const selectAccountType = (account) => {
      selectedAccountType.value = account;
    };

    const setSelectedCurrency = () => {
      selectedCurrency.value = accountCurrencies.value.find(
        (i) => i.id == selectedCurrencyID.value
      );
    };

    const setSelectedFund = () => {
      selectedFund.value = funds.value.find(
        (i) => i.id == selectedFundID.value
      );
    };

    const filteredCurrencies = computed(() => {
      if (!props.currencies) return [];
      return props.currencies.map((i) => {
        return { name: `${i.name} - ${i.country}`, id: i.id };
      });
    });

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
        const response = await chart_of_accounts.editAccount(body);
        savingAccount.value = false;
        loading.value = false;
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
        loading.value = false;
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
        savingAccount.value = true;
        loading.value = true;
        let response = {};
        if (props.account && props.account.name) {
          const x = {
            name: body.name,
            code: props.account.code,
            accountType: props.account.accountType,
            description: body.description,
            id: props.account.id,
            financialAccountGroupID: selectedAccountType.value.id,
            // financialFundID: body.financialFundID
          };
          response = edit(x);
        } else {
          response = await chart_of_accounts.saveAccount(body);
          savingAccount.value = false;
          loading.value = false;
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
            savingAccount.value = false;
            loading.value = false;
            emit("save-account", {
              success: true,
              type: props.financialAccountType,
            });
            transactionals.getTransactionalAccounts(true);
            selectedFund.value = {};
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
      if (selectedCurrency.value && selectedCurrency.value.id) {
        newAccount.value.currencyID = selectedCurrency.value.id;
      }

      // if (selectedFund.value && selectedFund.value.id) {
      newAccount.value.financialFundID =
        selectedFund.value && selectedFund.value.id
          ? selectedFund.value.id
          : "";
      // }
      saveAccount(newAccount.value);
    };

    const initializeCurrency = () => {
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
    };

    const updateSelectedCurrency = () => {
      selectedCurrency.value = accountCurrencies.value.find(
        (i) => i.id === props.account.id
      );
    };

    const accountCurrencies = ref([]);
    const getCurrencies = async () => {
      try {
        const response = await transactionals.getCurrencies();
        accountCurrencies.value = response;
        if (!props.account || !props.account.name) {
          initializeCurrency();
        } else {
          updateSelectedCurrency();
        }
      } catch (error) {
        console.log(error);
      }
    };
    getCurrencies();

    watch(() => {
      if (props.accountGroupId && props.transactionalAccounts && props.index) {
        selectedAccountType.value = props.transactionalAccounts[
          props.index
        ].find((i) => i.name === props.accountGroupId);
      }
      if (props.account) {
        newAccount.value.name = props.account ? props.account.name : "";
        newAccount.value.description = props.account
          ? props.account.description
          : "";
        selectedFund.value = funds.value.find(
          (i) => i.id === props.account.financialFundID
        );
      }
    });

    const setFundValue = (item) => {
      selectedFund.value = item;
    };

    const setCurrencyValue = (item) => {
      selectedCurrency.value = item;
    };

    return {
      selectAccountType,
      setSelectedFund,
      selectedFundID,
      selectedCurrencyID,
      setSelectedCurrency,
      selectedAccountType,
      filteredCurrencies,
      funds,
      newAccount,
      selectedCurrency,
      selectedFund,
      onSave,
      invalidAccountDetails,
      savingAccount,
      accountCurrencies,
      setFundValue,
      setCurrencyValue,
      primarycolor,
      loading,
    };
  },
};
</script>

<style scoped>
.p-dropdown-items {
  width: 100px !important;
}

.dropdown-menu {
  max-height: 400px;
  overflow: scroll;
}
</style>