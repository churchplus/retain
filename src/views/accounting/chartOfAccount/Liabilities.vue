<template>
  <div class="container-fluid px-0" v-for="(item, index) in data.accountHeadsDTO" :key="index">
    <div class="col-md-12">
      <div class="row">
        <div class="col-12 py-2 mt-4 account-head">
          {{ item.name }} <small class="font-weight-normal">{{ item.groupSubHead }}</small
          ><el-icon :size="20"><QuestionFilled /></el-icon>
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
          <el-icon data-toggle="modal" data-target="#liabModal" :size="20" @click="editAccount(item, itm)" class="c-pointer mx-2"><EditPen /></el-icon>
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
              @click="setGroupId(item.name)"
              class="c-pointer text-decoration-none primary-text"
              data-toggle="modal"
              data-target="#liabModal"
              >
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
    <div class="col-md-12">
      <!-- BT MODAL -->
      <div
        class="modal fade"
        id="liabModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="liabModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title font-weight-bold" id="exampleModalLabel">
                Add an account
              </h5>
              <el-button
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true" class="mt-0" ref="closeAccountModalBtn"><el-icon :size="20"><Close /></el-icon></span>
              </el-button>
            </div>
            <div class="modal-body">
              <CreateAccountModal
                :transactionalAccounts="accounts"
                :accountTypes="accountTypes"
                :currencies="currencies"
                :financialAccountType="1"
                :index="1"
                :accountGroupId="accountGroupId"
                :account="accountToEdit"
                :currency="true"
                @save-account="closeAccountModal"
              />
            </div>

          </div>
        </div>
      </div>
      <!-- END BT -->
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import CreateAccountModal from "./components/CreateAccountForm";
import transactionals from "./utilities/transactionals";
import chart_of_accounts from '../../../services/financials/chart_of_accounts';
import { ElMessage, ElMessageBox } from "element-plus";


export default {
    components: { CreateAccountModal },
    props: [ "data" ],
  setup(props, { emit }) {
    const view = ref(true);
    const accounts = ref([]);
    const getAccounts = async () => {
      try {
        accounts.value = await transactionals.getTransactionalAccounts();
        console.log(accounts.value);
      } catch (error) {
        console.log(error);
      }
    };
    getAccounts();

    const currencyList = ref([]);
    const getCurrencies = async () => {
      try {
        const response = await transactionals.getCurrencies();
        currencyList.value = response;
      } catch (error) {
        console.log(error);
      }
    };
    getCurrencies();

    const currencies = computed(() => {
        if (!currencyList.value || currencyList.value.length === 0) return [ ];
        return currencyList.value;
    })

    const accountTypes = transactionals.accountTypes;

    const accountGroupId = ref("");
    const setGroupId = (groupId) => {
      accountGroupId.value = groupId;
      accountToEdit.value = { };
    }

    const closeAccountModalBtn = ref(null)
    const closeAccountModal = (data) => {
        closeAccountModalBtn.value.click();
        if (data.success) {
            emit("reload");
        }
    }

    const accountToEdit = ref({ });
    const editAccount = (group, account) => {
      accountToEdit.value = account;
      accountGroupId.value = group.name;
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
               emit("liability-deleted", index, indx);
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
      view,
      accountTypes,
      currencyList,
      accounts,
      currencies,
      setGroupId,
      accountGroupId,
      closeAccountModal,
      closeAccountModalBtn,
      deleteAccount,
      editAccount,
      accountToEdit,
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