<template>
  <Toast></Toast>
  <div class="row">
    <div class="col-md-12">
      <div
        class="
          mt-3
          p-0
          col-10
          offset-sm-1 offset-md-0
          col-md-3 col-lg-4
          align-self-center
        "
      >
        <div>Choose Bank</div>
      </div>
      <div
        class="
          col-12 col-sm-10
          offset-sm-1 offset-md-0
          col-md-6 col-lg-12
          pl-md-0
          mt-3
        "
        style="height: 43px"
      >
        <!-- <Dropdown v-model="selectedBank" class="w-100" :options="nigerianBanks" optionLabel="name" :filter="false" :placeholder="selectedBank ? selectedBank.name : 'Select'" :showClear="false">
                    </Dropdown> -->
        <div class="dropdown">
          <button
            class="
              btn
              border
              w-100
              phone-input
              d-flex
              justify-content-between
              align-items-center
            "
            type="button"
            id="dropdownBankList"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <div>
              {{
                selectedBank && Object.keys(selectedBank).length > 0
                  ? selectedBank.name
                  : "Select bank"
              }}
            </div>
            <i class="pi pi-chevron-down"></i>
          </button>
          <div class="dropdown-menu w-100" aria-labelledby="dropdownBankList">
            <a
              class="dropdown-item c-pointer"
              v-for="item in nigerianBanks"
              :key="item.id"
            >
              <div @click="setSelectedBank(item)">{{ item.name }}</div>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="col-2 d-none d-sm-block"></div>

    <div class="col-md-12">
      <div
        class="
          mt-3
          p-0
          col-10
          offset-sm-1 offset-md-0
          col-md-3 col-lg-6
          align-self-center
        "
      >
        <div>Enter account number</div>
      </div>
      <div
        class="
          col-12 col-sm-10
          offset-sm-1 offset-md-0
          col-md-6 col-lg-12
          pl-md-0
          mt-3
        "
        style="height: 43px"
      >
        <el-input
          class="w-100"
          size="large"
          v-model="form.accountNumber"
          @blur="resolveCustomerDetail"
        />
      </div>
    </div>

    <div class="col-2">
      <div
        class="spinner-border text-primary"
        style="width: 3rem; height: 3rem"
        role="status"
        v-if="loading"
      >
        <span class="sr-only">Loading...</span>
      </div>
    </div>

    <div class="col-md-12">
      <div
        class="
          mt-3
          p-0
          col-10
          offset-sm-1 offset-md-0
          col-md-3 col-lg-4
          align-self-center
        "
      >
        <div>Account Name</div>
      </div>
      <div
        class="
          col-12 col-sm-10
          offset-sm-1 offset-md-0
          col-md-6 col-lg-12
          pl-md-0
          mt-3
        "
        style="height: 43px"
      >
        <input
          type="text"
          v-model="form.accountName"
          placeholder="Account name"
          ref="accNameRef"
          class="form-control h-100"
          disabled
        />
        <div class="mt-1">
          <em class="mt-1"
            >This will automatically come up, kindly confirm before clicking on
            save.</em
          >
        </div>
      </div>
    </div>
    <div class="col-sm-3 align-self-end"></div>

    <!-- <div class="col-10 col-md-12 mt-5 d-flex align-items-center c-pointer" >
            <p class="mb-0" style="width:100px">Payment</p><hr class="mt-4" style="width: calc(100% - 80px)"/><span><i class="pi pi-angle-down"></i></span>
        </div> -->
    <!-- <div class="mt-3 col-10 offset-sm-1 offset-md-0 col-md-3 col-lg-4  align-self-center">
            <div>Payment Gateway</div>
        </div> -->
    <!-- <div class="d-flex justify-content-center   col-12 col-sm-10 offset-sm-1 offset-md-0 col-md-6 col-lg-5 pl-md-0 mt-3">
            <input type="checkbox" class="px-2" checked  >
     
        </div> -->
    <div class="text-left col-md-12 offset-md-8 mt-5">
      <button
        type="button"
        @click="submitForm"
        class="
          btn-primary
          default-btn
          primary-bg
          border-0
          font-weight-700
          text-white
        "
      >
        Save
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import Dropdown from "primevue/dropdown";
import axios from "@/gateway/backendapi";
import axio from "axios";
import finish from "../../../services/progressbar/progress";
import { useToast } from "primevue/usetoast";

export default {
  components: {
    Dropdown,
  },
  setup(props, context) {
    const toast = useToast();
    const selectedBank = ref({});
    const nigerianBanks = ref([]);
    const form = ref({});
    const loading = ref(false);
    const getBanks = () => {
      axios
        .get("/api/Financials/GetBanks")
        .then((res) => {
          console.log(res, "bank lists");
          nigerianBanks.value = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getBanks();

    const submitForm = () => {
      form.value.bank = {
        code: selectedBank.value.code,
      };
      axios
        .post("/saveTenantBank", form.value)
        .then((res) => {
          console.log(res, "posted successfully");
          if (res.data.status) {
              context.emit("closemodal", {
                id: res.data.returnObject.id,
                bankName: res.data.returnObject.accountName,
                bankNumber: res.data.returnObject.accountNumber,
                description: res.data.returnObject.description,
              });
          } else {
              toast.add({
                    severity: "warn",
                    summary: "Unsuccessful",
                    detail: res.data.response,
                    life: 4000,
                });
          }
        })
        .catch((error) => {
          console.log(error);
          toast.add({
            severity: "error",
            summary: "Account Check Error",
            detail: "Please check your banks details again",
            life: 4000,
          });
        });
    };

    const resolveCustomerDetail = async () => {
      loading.value = true;
      try {
        let header = {
          headers: {
            Authorization: `Bearer ${process.env.VUE_APP_PAYSTACK_SECRET_KEY}`,
          },
        };
        console.log(header, "header");

        let { data } = await axio.get(
          `https://api.paystack.co/bank/resolve?account_number=${form.value.accountNumber}&bank_code=${selectedBank.value.code}`,
          header
        );
        console.log(data, "show data");
        form.value.accountName = data.data.account_name;
        console.log(data.data.account_name, "account name ogbara");
        // accNameRef.value.focus()
        // disabled.value = false

        loading.value = false;

        toast.add({
          severity: "success",
          summary: "Account Check Successful",
          detail: "The account check was successful",
          life: 4000,
        });
      } catch (error) {
        finish();
        console.log(error);

        loading.value = false;

        if (!form.value.accountNumber || form.value.accountNumber === "") {
          toast.add({
            severity: "warn",
            summary: "No account number found",
            detail: "Please enter your account number",
            life: 4000,
          });
        } else if (!selectedBank.value.code) {
          toast.add({
            severity: "warn",
            summary: "No bank selected",
            detail: "Please select your bank",
            life: 4000,
          });
        } else {
          toast.add({
            severity: "error",
            summary: "Account Check Error",
            detail: "Please check your banks details again",
            life: 4000,
          });
        }
      }
      console.log(
        selectedBank.value.code,
        form.value.accountNumber,
        "Acount Name"
      );
    };

     const setSelectedBank = (payload) => {
        selectedBank.value = payload;
        };
        
    return {
      selectedBank,
      nigerianBanks,
      resolveCustomerDetail,
      loading,
      form,
      submitForm,
      setSelectedBank
    };
  },
};
</script>

<style scoped>
.dropdown-menu {
    max-height: 300px;
    overflow: scroll;
    box-shadow: 0 2px 4px -1px rgb(0 0 0 / 20%), 0 4px 5px 0 rgb(0 0 0 / 14%), 0 1px 10px 0 rgb(0 0 0 / 12%);
}
</style>

   