<template>
  <div class="container-fluid px-0" v-for="(item, index) in data.accountHeadsDTO" :key="index">
    <div class="col-md-12">
      <div class="row">
        <div class="col-12 py-2 mt-4 account-head">
          {{ item.name }} <small class="font-weight-normal">{{ item.groupSubHead }}</small
          > 
          <el-icon :size="20"><QuestionFilled /></el-icon>

        </div>
      </div>
      <div
        class="row row-border align-items-center py-2"
        v-for="(itm, indx) in item.accounts"
        :key="indx"
      >
        <div class="col-6 col-md-2">{{ itm.code }}</div>
        <div class="col-6 col-md-3">
          <div class="desc-head">{{ itm.name }}</div>
        </div>
        <div class="col-6 col-md-5">{{ itm.description }}</div>
        <div class="col-6 col-md-2 text-right">
          <el-icon data-toggle="modal" data-target="#fundModal" :size="20" @click="editAccount(item, itm)" class="c-pointer mx-2"><EditPen /></el-icon>
          <el-icon class="c-pointer" :size="20" @click="deleteAccount(itm.id, index, indx)"><Delete /></el-icon>
        </div>
      </div>
      <div class="row row-border align-items-center py-3" v-if="item.accounts.length === 0">
        <div class="col-10 offset-md-2 text-center text-md-left">
          You have not added any inventory yet.
        </div>
      </div>
      <div class="row">
        <div class="col-10 offset-md-2 text-center text-md-left">
          <div class="add-account py-2">
            <a
              @click="selectAccountType(item)"
              class="c-pointer text-decoration-none primary-text"
              data-toggle="modal"
              data-target="#fundModal"
              >
              <!-- <i class="pi pi-plus-circle"></i>
               -->
               <el-icon  :size="20"><CirclePlus /></el-icon>
              &nbsp; &nbsp; Add a new
              Account</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="row">
    <div
      class="modal fade"
      id="fundModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="fundModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title font-weight-bold" id="exampleModalLabel">
              Add Fund
            </h5>
            <el-button
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <!-- <span aria-hidden="true" class="mt-0" ><el-icon :size="20"><Close /></el-icon></span> -->
              <span aria-hidden="true" class="mt-1" ref="closeModalBtn"><el-icon :size="20"><Close /></el-icon></span>
            </el-button>
          </div>
          <div class="modal-body">
            <div class="row" v-if="!savingFund">
              <div class="col-md-12">
                <div class="row my-3">
                  <div class="col-md-3 text-md-right">
                    <label for="">Fund type</label>
                  </div>
                  <div class="col-md-8">
                     <el-dropdown trigger="click" class="w-100 mt-2">
                      <span class="el-dropdown-link w-100">
                        <div
                          class="d-flex justify-content-between border-contribution w-100"
                          size="large"
                        >
                          <div>
                            {{
                              selectedFundType ?  selectedFundType : 'Select account currency'
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
                            v-for="(itm, indx) in fundTypes" :key="indx"
                          >
                            <div @click="selectFundType(itm)" class="col-md-12 px-2">
                              {{itm}}
                            </div>
                          </el-dropdown-item>
                        </el-dropdown-menu>
                      </template>
                    </el-dropdown>
                    <!-- <el-select-v2
                      v-model="selectedFundTypeID"
                      class="w-100 font-weight-normal"
                      :options="
                        funds.map((i) => ({
                          label: i,
                          value: i,
                        }))
                      "
                      placeholder="Select account currency"
                      @change="selectFundType"
                      size="large"
                    /> -->
                    <!-- <button class="  btn d-flex justify-content-between  col-12 border  " type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          <span class="ofering">
                              &nbsp;&nbsp;&nbsp; {{ selectedFundType ?  selectedFundType : 'Select account currency' }}
                          </span>
                          <span>
                              <i class="pi pi-angle-down offset-sm-2 ofering"></i>
                          </span>
                      </button> -->
                      <!-- <div class="dropdown-menu scroll w-100 " aria-labelledby="dropdownMenuButton">
                          <a class="dropdown-item" v-for="(itm, indx) in fundTypes" :key="indx">
                              <div class="cursor-pointer" @click="selectFundType(itm)"> {{itm}}</div> 
                          </a>
                      </div> -->
                  </div>
                </div>
                <div class="row my-3">
                  <div class="col-md-3 text-md-right">
                    <label for="">Fund name</label>
                  </div>
                  <div class="col-md-8">
                    <el-input
                      type="text"
                      v-model="newFund.name"
                      class="w-100"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div class="row my-5" v-if="savingFund">
                <div class="col-md-12 text-center">
                  <el-icon :size="20" class="is-loading">
                    <Loading />
                  </el-icon>
                </div>
            </div>
          </div>

          <div class="modal-footer">
            <div class="container">
              <div class="row">
                <div class="col-md-12 d-flex justify-content-end">
                  <el-button  round class="mr-3" data-dismiss="modal">
                  Cancel
                </el-button>
                <el-button
                  @click="onSave"
                  round
                  :loading="savingFund"
                  :color="primarycolor"
                  :disabled="!selectedFundType || !newFund.name"
                  class="border-0 text-white"
                >
                  Save
                </el-button>
                  <!-- <button class="default-btn mr-3" data-dismiss="modal" ref="closeModalBtn">
                    Cancel
                  </button>
                  <button
                    @click="onSave"
                    class="default-btn primary-bg border-0 text-white"
                    
                  >
                    Save
                  </button> -->
                </div>
              </div>
            </div>
          </div>

          <!-- <Toast /> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, inject } from "vue";
import transactionUtil from "./utilities/transactionals";
import chart_of_accounts from "../../../services/financials/chart_of_accounts";
import transactionals from './utilities/transactionals';
import { ElMessage, ElMessageBox } from "element-plus";


export default {
    props: [ "data" ],
  components: {  },

  setup(props, { emit }) {
    const accounts = ref([]);
    const primarycolor = inject("primarycolor");
    const fundTypes = [
      "Unrestricted Funds",
      "Donor Restricted Funds",
    ];
    const selectedFundType = ref('');

    const selectFundType = (item) =>{
      selectedFundType.value = item
      console.log(selectedFundType.value, "jkhljkhlk");
    }

    const getAccounts = async () => {
      try {
        accounts.value = await transactionUtil.getTransactionalAccounts();
        console.log(accounts.value);
      } catch (error) {
        console.log(error);
      }
    };
    getAccounts();

    const currencyList = ref([]);
    const getCurrencies = async () => {
      try {
        currencyList.value = await transactionUtil.getCurrencies();
        console.log(currencyList.value);
      } catch (error) {
        console.log(error);
      }
    };
    getCurrencies();
    
    const  closeModalBtn = ref(null);
    const savingFund = ref(false);
    const saveFund = async (fund) => {
      try {
          savingFund.value = true;
        let response = { };
        if (accountToEdit.value.id) {
            accountToEdit.value.name = fund.name;
            response = await chart_of_accounts.editAccount(fund);
        } else {
            response = await chart_of_accounts.saveFund(fund);
        }
        savingFund.value = false;
        closeModalBtn.value.click();
        if (!response.status) {
            emit("save-fund", { success: false, message: "An error ocuurred, please try again" });
            ElMessage({
                  type: "error",
                  message: "Fund Creation Failed",
                  duration: 3000,
                });
        } else {
          ElMessage({
                  type: "success",
                  message: `The fund ${newFund.value.name} was created successfully`,
                  duration: 3000,
                });
            emit("save-fund", { success: true, message: "An error ocuurred, please try again" });
            transactionals.getFunds(true);
        }
      } catch (error) {
        savingFund.value = false;
        // ElMessage({
        //           type: "success",
        //           message: "Fund Successfully Saved",
        //           duration: 3000,
        //         });
        console.log(error);
      }
    };

    
    const newFund = ref({});
    const onSave = () => {
      if (!selectedFundType.value || !newFund.value.name) {
        return false;
      }
        newFund.value.fundType = fundTypes.indexOf(selectedFundType.value);
        newFund.value.financialAccountGroupID = selectedGroupId.value;
      saveFund(newFund.value);
    };

    const accountTypes = transactionUtil.accountTypes;

    const selectedGroupId = ref("");
    const selectAccountType = (group) => {
        selectedGroupId.value = group.id;
        selectedFundType.value = group.name;
    }

    const accountToEdit = ref({ });
    const editAccount = (group, account) => {
        console.log(group, "group");
        console.log(account, "accccc");
      accountToEdit.value = account;
      newFund.value.name = accountToEdit.value.name;
      newFund.value.code = accountToEdit.value.code;
      newFund.value.id = accountToEdit.value.id;
      newFund.value.fundType = fundTypes.indexOf(group.name);
      newFund.value.financialAccountGroupID = account.financialAccountGroupID;
      selectedFundType.value = group.name
    //   accountGroupId.value = group.name;
    }


    const deleteAccount = (id, index, indx) => {
      ElMessageBox.confirm(
        "Are you sure you want to proceed?",
        "Confirm delete",
        {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "error",
        }
      )
        .then( async () => {
          try {
                const response = await chart_of_accounts.deleteAccount(id);
                ElMessage({
                  type: "success",
                  message: `${response.response}`,
                  duration: 3000,
                });
                emit("equity-deleted", index, indx);
              } catch (error) {
                ElMessage({
                  type: "error",
                  message: "Account not deleted",
                  duration: 3000,
                });
                console.log(error);
              }
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "Delete canceled",
            duration: 5000,
          });
        });
    };

    return {
      accountTypes,
      selectFundType,
      primarycolor,
      currencyList,
      accounts,
      onSave,
      fundTypes,
      newFund,
      selectedFundType,
      savingFund,
      closeModalBtn,
      selectAccountType,
      editAccount,
      accountToEdit,
      deleteAccount,
    };
  },
};
</script>

<style scoped>
.row-border {
  border-bottom: 1px solid rgb(225, 225, 225);
}

.account-head {
  background: #e0e7eb;
  font-weight: 800;
}

.help {
  color: rgb(100, 100, 100);
  margin: 5px;
}

.desc {
  color: #190138;
  opacity: 0.6;
}

.desc-head {
  font-weight: 600;
}

.add-account {
  color: #136acd;
  font-weight: 800;
}

.modal-lg {
  max-width: 670px;
}
</style>