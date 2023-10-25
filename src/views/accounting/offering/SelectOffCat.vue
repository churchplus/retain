<template>
  <!-- <div class="container-wide container-top"> -->
  <div class="top container-wide mt-3">
    <div class="row">
      <div class="col-sm-12">
        <div class="page-header">Offering Category</div>
        <hr class="hr" />
      </div>
    </div>
  </div>

  <el-dialog v-model="displayResponsive" :width="mdAndUp || lgAndUp || xlAndUp ? `50%` : xsOnly ? `90%` : `70%`" align-center>
      <p>
        You have no income account to create a offering item, go to Chart of
        Account and click 'Update Account' to update your accounts.
      </p>
      <template #footer>
        <el-button
         round
         :color="primarycolor"
        label="Go to Chart Of Accounts"
        icon="pi pi-check"
        @click="closeResponsive"
        autofocus
      />
      </template>
    </el-dialog>

  <!-- input area -->
  <div class="container-wide">
    <div class="row my-5 mx-auto">
      <div class="col-sm-4 mt-3 mt-sm-3 text-sm-right">
        <label for="" class="label">Name</label>
      </div>
      <div class="col-sm-5 mt-sm-3">
        <el-input
          type="text"
          class="w-100"
          placeholder=""
          v-model="name"
          required
        />
      </div>
      <div class="col-sm-4 mt-3 mt-sm-3 text-sm-right">
        <label for="" class="label">Income Account</label>
      </div>
      <div class="col-sm-5 mt-sm-3">
        <el-select-v2
                  v-model="selectedIncomeAccountID"
                  class="w-100 font-weight-normal"
                  placeholder="Select"
                  @change="setSelectedIncomeAccount"
                  :options="
                    incomeAccount.map((i) => ({
                      label: i.text,
                      value: i.id,
                    }))
                  "
                  size="large"
                />
        <!-- <Dropdown
          v-model="selectedIncomeAccount"
          class="w-100 p-0"
          :options="incomeAccount"
          optionLabel="text"
          :filter="false"
          placeholder="Select"
          :showClear="false"
        >
        </Dropdown> -->
      </div>
      <div class="col-sm-4 mt-3 mt-sm-3 text-sm-right">
        <label for="" class="label">Cash Account</label>
      </div>
      <div class="col-sm-5 mt-sm-3">
        <el-select-v2
                  v-model="selectedCashAccountID"
                  class="w-100 font-weight-normal"
                  placeholder="Select"
                  @change="setSelectedCashAccount"
                  :options="
                    cashBankAccount.map((i) => ({
                      label: i.text,
                      value: i.id,
                    }))
                  "
                  size="large"
                />
        <!-- <Dropdown
          v-model="selectedCashAccount"
          :options="cashBankAccount"
          optionLabel="text"
          :filter="false"
          placeholder="Select"
          class="w-100 p-0"
          :showClear="false"
        >
        </Dropdown> -->
      </div>

      <div class="col-sm-12 mt-4" @click="toggleRem">
        <div class="row">
          <div class="col-sm-12 d-flex">
            <i class="check-it mr-2">
              <span class="child" v-if="applyRem"></span>
            </i>
            <h6>Apply Split/Remitance</h6>
          </div>
        </div>
      </div>
      <div class="col-sm-12 mt-3" v-if="applyRem">
        <hr class="hr" />
      </div>
      <div class="col-12 pl-0" v-if="applyRem"></div>

      <div class="col-lg-6 offset-lg-4" v-if="applyRem">
        <div v-for="(item, index) in remitance" :key="index">
          <div class="row mt-3 mb-4">
            <div class="col-12 col-sm-6">
              <div class="">Account</div>
              <el-dropdown trigger="click" class="w-100 mt-2">
                    <span class="el-dropdown-link w-100">
                      <div
                        class="d-flex justify-content-between border-contribution  w-100"
                        size="large"
                      >
                       <div>
                          {{ item && item.account ? item.account.text : "Select account" }}
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
                        <el-dropdown-item v-for="(remitance, indexRemit) in remittanceResult"
                        :key="indexRemit">
                          <div class="col-md-12 px-2">
                            <div class="py-2 font-weight-700 border-bottom">
                              {{ remitance.name }}
                            </div>
                            <div
                              v-for="(value, indexValue) in remitance.value"
                              :key="indexValue"
                              class=" c-pointer py-2"
                              @click="setRemittance(value, index)"
                            >
                              {{ value.text }}
                            </div>
                          </div>
                        </el-dropdown-item>
                      </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>

            <div class="col-12 col-sm-5 ">
              <div class="">Percentage %</div>

              <div class="mt-2">
                <el-input
                  type="number"
                  v-model="item.percentage"
                  class="w-100"
                  placeholder=""
                />
              </div>
            </div>
            <div
              class="col-1 mt-4 align-self-center"
              @click="deleteItem(index)"
            >
              <i class="pi pi-trash"></i>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-10 mt-3 text-right">
            Percentage Remaining:
            <span class="font-weight-700"
              >{{
                sumPercentage
                  ? sumPercentage.percentage
                    ? 100 - +sumPercentage.percentage
                    : 0
                  : 0
              }}%</span
            >
          </div>
          <div class="col-10 mt-3 text-right" v-if="selectedCashAccount">
            The percentage remaining goes to
            <span class="font-weight-700">{{
              selectedCashAccount ? selectedCashAccount.text : ""
            }}</span>
          </div>
        </div>
      </div>

      <!--end of diisplay bottom area -->
    </div>
    <div class="row">
      <div class="col-2 mt-3 mb-3 offset-sm-4" v-if="applyRem">
        <el-button v-on:click="addRemittance" round  class=" text-primary bg-secondary">
          <el-icon><CirclePlus /></el-icon>
          Add
        </el-button>
      </div>
      <div
        class="col-5 mt-3 mb-3 offset-4"
        :class="{ 'col-sm-2 offset-sm-1': applyRem }"
      >
        <el-button
        :loading="loading"
          class=" w-100 text-white"
          :color="primarycolor"
          @click="save"
          round
        >
          Save
        </el-button>
      </div>
    </div>
  </div>
</template>









<script>
import { computed, inject, ref } from "vue";
import axios from "@/gateway/backendapi";
import store from "../../../store/store";
import Dropdown from "primevue/dropdown";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import groupData from "../../../services/groupArray/groupResponse";
import deviceBreakpoint from "../../../mixins/deviceBreakpoint";
import { ElMessage } from 'element-plus'
export default {
  components: {
    Dropdown,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const primarycolor = inject('primarycolor')
    const applyRem = ref(false);
    const cashBankAccount = ref([]);
    const remitance = ref([{}]);
    const incomeAccount = ref([]);
    const selectedIncomeAccountID = ref(null);
    const selectedCashAccountID = ref(null);
    const selectedIncomeAccount = ref(null);
    const selectedCashAccount = ref(null);
    const name = ref("");
    const displayResponsive = ref(false);
    const remittanceAccounts = ref([]);
    const remittanceResult = ref([]);
    const { xsOnly, mdAndUp, lgAndUp, xlAndUp } = deviceBreakpoint()
    const loading = ref(false);
    const ungroupedRemittanceResult = ref([])

    const toggleRem = () => {
      applyRem.value = !applyRem.value;
    };

    const getCashBankAccount = () => {
      axios
        .get("/api/financials/accounts/getcashbankaccounts")
        .then((res) => {
          cashBankAccount.value = res.data;
          x(route.params.offId);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getCashBankAccount();
    const setSelectedIncomeAccount  = () =>{
      selectedIncomeAccount.value = incomeAccount.value.find(i => i.id == selectedIncomeAccountID.value)
      console.log(selectedIncomeAccount.value, "jkhj");
    }
    const setSelectedCashAccount  = () =>{
      selectedCashAccount.value = cashBankAccount.value.find(i => i.id == selectedCashAccountID.value)
      console.log(selectedCashAccount.value, "jkhj");
    }

    const deleteItem = (index) => {
      if (remitance.value.length > 1) {
        remitance.value.splice(index, 1);
      } else {
        ElMessage({
              type: 'error',
              showClose: true,
              message: 'Cannot Delete, You must have at least one field to apply for remittance',
              duration: 5000
            })
      }
    };

    const addRemittance = () => {
      if (100 - +sumPercentage.value.percentage <= 0) {
        ElMessage({
              type: 'error',
              showClose: true,
              message: ` You have ${sumPercentage.value.percentage}% remittance percentage, The sum of the percentages should not exceed the 100%`,
              duration: 5000
            })
      } else {
        remitance.value.push({
          percentage: 0,
        });
      }
    };

    const getIncomeAccount = () => {
      axios
        .get("/api/Financials/Accounts/GetIncomeAccounts")
        .then((res) => {
          /*eslint no-undef: "warn"*/
          NProgress.done();
          incomeAccount.value = res.data;
          if (res.data.length < 1) {
            displayResponsive.value = true;
          }
        })
        .catch((err) => {
          NProgress.done();
          console.log(err);
        });
    };
    getIncomeAccount();

    const getRemittanceAccount = () => {
      axios
        .get("/api/Financials/Accounts/GetRemittanceAccounts")
        .then((res) => {
          ungroupedRemittanceResult.value = res.data
          let groupedRemittance = groupData.groupData(res.data, "accountType");
          for (const prop in groupedRemittance) {
            remittanceResult.value.push({
              name: prop,
              value: groupedRemittance[prop],
            });
          }
          getOffItems();
        })
        .catch((err) => {
          NProgress.done();
          console.log(err);
        });
    };
    getRemittanceAccount();

    const createOfferingItems = (contributionCategory) => {
      loading.value = true;
      axios
        .post("/api/financials/contributions/items/save", contributionCategory)
        .then((res) => {
          ElMessage({
              type: 'success',
              showClose: true,
              message: "Contribution Saved",
              duration: 5000
            })
          loading.value = false;
          store.dispatch('contributions/setContributionItem').then(() =>{
            router.push({ name: "ContributionCategory" });
          })
          
        })
        .catch((err) => {
          ElMessage({
              type: 'error',
              showClose: true,
              message: "Not Sucessful",
              duration: 5000
            })
          console.log(err);
          loading.value = false;
        });
    };

    const editOfferingItems = (contributionCategory) => {
      loading.value = true;
      contributionCategory.id = route.params.offId;
      axios
        .put(`/api/Financials/Contributions/Items/edit`, contributionCategory)
        .then((res) => {
          ElMessage({
              type: 'success',
              showClose: true,
              message: "Edit Succefully",
              duration: 5000
            })
          loading.value = false;
           store.dispatch('contributions/setContributionItem').then(() =>{
            router.push({ name: "ContributionCategory" });
          })
        })
        .catch((err) => {
          ElMessage({
              type: 'error',
              showClose: true,
              message: "Not Sucessful",
              duration: 5000
            })
          loading.value = false;
          console.log(err);
        });
    };

    const save = () => {
      let contributionCategory = {
        name: name.value,
        incomeAccountId: selectedIncomeAccount.value
          ? selectedIncomeAccount.value.id
          : "",
        cashAccountId: selectedCashAccount.value
          ? selectedCashAccount.value.id
          : "",
        incomeRemittance: remitance.value,
      };

      if (remitance.value[0].account || remitance.value[0].percentage) {
        contributionCategory.incomeRemittance = remitance.value.map((i) => {
          if (!i.account.financialFundID) delete i.account.financialFundID;
          let payload = {};
          if (i.account.accountType.toLowerCase().includes("assets"))
            payload.distinationCashBankAccount = i.account.id;
          if (i.account.accountType.toLowerCase().includes("income"))
            payload.distinationIncomeAccount = i.account.id;
          payload.percentage = i.percentage;
          return payload;
        });
      } else {
        contributionCategory.incomeRemittance = null;
      }
      if (selectedIncomeAccount.value && selectedCashAccount.value) {
        if (route.params.offId) {
          editOfferingItems(contributionCategory);
        } else {
          createOfferingItems(contributionCategory);
        }
      } else {
         ElMessage({
              type: 'error',
              showClose: true,
              message: "Please select an income and cash account",
              duration: 5000
            })
      }
    };
    const sumPercentage = computed(() => {
      if (remitance.value.length === 0) return 0;
      return remitance.value.reduce((a, b) => {
        return { percentage: +a.percentage + +b.percentage };
      });
    });

    const openResponsive = () => {
      displayResponsive.value = true;
    };
    const closeResponsive = () => {
      displayResponsive.value = false;
      router.push({ name: "ChartOfAccount" });
    };

    const x = (id) => {
      selectedCashAccount.value = cashBankAccount.value.find((i) => {
        return i.id === id;
      });
    };

    const getOffItems = async () => {
      if (route.params.offId) {
        try {
          let res = await axios.get(
            `/api/Financials/Contributions/Items/One?ID=${route.params.offId}`
          );
          name.value = res.data.name;
          selectedIncomeAccount.value = incomeAccount.value.find((i) => {
            return i.id === res.data.incomeAccountID;
          });
          x(res.data.cashAccountID);

          if (res.data.incomeRemittance && res.data.incomeRemittance.length > 0) applyRem.value = true
          remitance.value = res.data.incomeRemittance.map(i => {
            let data = {};
            data.percentage = i.percentage;
            if (i.distinationCashBankAccount == '00000000-0000-0000-0000-000000000000') {
              data.account = ungroupedRemittanceResult.value.find(j => {
                return j.id == i.distinationIncomeAccount
              })
            } else {
              data.account = ungroupedRemittanceResult.value.find(j => {
                return j.id == i.distinationCashBankAccount
              })
            }
            return data
          })
        } catch (err) {
          console.log(err);
        }
      }
    };

    const setRemittance = (data, index) => {
      remitance.value[index].account = data;
    };

    return {
      applyRem,
      setSelectedIncomeAccount,
      selectedIncomeAccountID,
      selectedCashAccountID,
      setSelectedCashAccount,
      primarycolor,
      toggleRem,
      cashBankAccount,
      remitance,
      addRemittance,
      incomeAccount,
      save,
      xsOnly, 
      mdAndUp, 
      lgAndUp, 
      xlAndUp,
      selectedIncomeAccount,
      name,
      selectedCashAccount,
      deleteItem,
      sumPercentage,
      openResponsive,
      closeResponsive,
      displayResponsive,
      createOfferingItems,
      editOfferingItems,
      remittanceAccounts,
      remittanceResult,
      setRemittance,
      loading,
    };
  },
};
</script>

<style scoped>
.btnIcons {
  width: 110px;
  /* height: 35px; */
  color: #136acd;
  background-color: #dde2e6;
  border-radius: 40px;
  border: none;
  padding: 0.5rem 1.25rem;
}

.check-it {
  border: 2px solid #136acd;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-top: -1px;
}

.icons {
  color: #136acd;
}
.check-it .child {
  /* border: 2px solid red; */
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #136acd;
  position: relative;
  left: 3px;
  top: -4px;
}

* {
  box-sizing: border-box;
  color: #02172e;
}
.page-header {
  font: normal normal 800 29px Nunito sans;
}

.hr {
  border: 0.8px solid #0020440a;
  /* margin: 0 45px; */
}

.add-person-btn {
  background: #136acd;
  color: #fff;
}

@media screen and (min-width: 1400px) {
  .main-con {
    width: 90%;
    margin: 0 auto;
  }
}
@media screen and (max-width: 360px) {
  .page-header {
    padding-top: 31px;
  }
}

.error-div {
  background: #fff8f8;
  border-color: #ffe9e9;
  padding: 25px 10px;
  margin-bottom: 24px;
  border-radius: 8px;
  border: 1px solid transparent;
  border-left: 5px solid #b52626;
}

.error-message {
  margin-bottom: 0;
  font-size: 0.9em;
}

.dropdown-height {
  max-height: 300px;
  overflow: scroll;
}
</style>


