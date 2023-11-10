<template>
  <div>
    <div class="d-flex flex-wrap flex-column flex-sm-row justify-content-between">
      <div class="">
        <div class="head-text">Dues, Pledges and Partnership</div>
      </div>
      <div class="d-flex flex-column flex-sm-row mt-2 my-1 link">
        <router-link class="mr-1" to="/tenant/pledge/pledgedefinitionlist">
          <el-button class="header-btn mr-3 w-100 secondary-button" round>
            Dues/Partnership/Pledge items
          </el-button>
        </router-link>
        <router-link class="" to="/tenant/pledge/makepledge">
          <el-button :color="primarycolor" class="header-btn w-100 mt-3 mt-sm-0" round>
            New Partnership/Pledge
          </el-button></router-link>
      </div>
    </div>
    <div class="d-flex flex-wrap flex-column flex-sm-row row" v-if="route.fullPath == '/tenant/pledge/pledgeslist'">
      <div class="col-12 py-md-4 mt-3">
        <div class="font-weight-bold">Copy and Share the link</div>
        <div class="p-inputgroup form-group mt-2">
          <el-input v-model="memberlink" placeholder="Click the copy button when the link appears" ref="selectedLink"
            class="input-with-select">
            <template #append>
              <el-button @click="copylink">
                <el-icon>
                  <CopyDocument />
                </el-icon>
              </el-button>
            </template>
          </el-input>
        </div>
      </div>
    </div>
    <div class="container-fluid" v-if="allPledgeList.length > 0 && !loading && !networkError">
      <div class="row border   mt-3 rounded">
        <div class="col-md-12 pt-3 py-2 border-remove px-0 d-flex flex-wrap" v-for="(item, index) in pledgesSummary"
          :key="index">
          <div class="col-sm-6 col-lg-4">
            <div class="text-secondary font-weight-bold small">
              Total pledge
            </div>
            <h3 class="font-weight-700 mt-3">
              {{
                Math.abs(
                  getAllPledgeAmount.length == 0
                    ? item.totalPledges
                    : getAllPledgeAmount
                ).toLocaleString()
              }}.00
              <span class="text-secondary small">{{
                item.symbol
              }}</span>
            </h3>
          </div>
          <div class="col-sm-6 col-lg-4 mt-3 mt-sm-0">
            <div class="font-weight-bold small text-secondary">
              Total Payments
            </div>
            <h3 class="font-weight-700 mt-3 text-success">
              {{
                Math.abs(
                  getAllTotalPayment.length == 0
                    ? item.totalPayments
                    : getAllTotalPayment
                ).toLocaleString()
              }}.00
              <span class="small">{{ item.symbol }}</span>
            </h3>
          </div>
          <div class="col-md-12 col-lg-4 mt-3 mt-md-0">
            <div class="text-secondary font-weight-bold small">
              Total Balance
            </div>
            <h3 class="font-weight-700 mt-3 text-danger">
              {{
                Math.abs(
                  getAllTotalBalance.length == 0
                    ? item.totalPledges - item.totalPayments
                    : getAllTotalBalance
                ).toLocaleString()
              }}.00
              <span class="small">
                {{ item.symbol }}
              </span>
            </h3>
          </div>
        </div>

      </div>
    </div>
    <div class="row mt-4 mb-4" v-if="allPledgeList.length > 0 && !loading && !networkError">
      <div class="col-12 col-md-6 col-lg-2 pr-lg-1">
        <div class="mb-1">Select Member</div>
        <MembersSearch @memberdetail="chooseContact" :currentMember="selectedContact" />
      </div>
      <div class="col-12 col-md-6 col-lg-2 mt-3 mt-md-0 mt-lg-0 px-lg-1">
        <div class="mb-1">Select Category</div>
        <div>
          <SelectAllDropdown :items="allPledgeDefinitionList" @selected-item="setSelectedCategory" />
        </div>
        <!-- <el-select-v2
          v-model="selectedCategoryID"
          @change="setSelectedCategory"
          :options="
            allPledgeDefinitionList.map((i) => ({ label: i.name, value: i.id }))
          "
          placeholder="Select category"
          size="large"
          class="w-100"
        /> -->
      </div>
      <div class="col-12 col-md-6 col-lg-2 mt-3 mt-lg-0 px-lg-1">
        <div class="mb-1">Select Status</div>
        <div>
          <SelectAllDropdown :items="allPledgeStatus" @selected-item="setSelectedStatus" />
        </div>
        <!-- <el-select-v2
          v-model="selectedStatusID"
          @change="setSelectedStatus"
          :options="
            allPledgeStatus.map((i) => ({ label: i.name, value: i.id }))
          "
          placeholder=" Select Status"
          size="large"
          class="w-100"
        /> -->
      </div>
      <div class="col-12 col-md-6 col-lg-2 mt-3 mt-lg-0 px-lg-1">
        <div class="mb-1">Start Date</div>
        <el-date-picker v-model="startDate" type="date" placeholder="From" format="DD/MM/YYYY" size="large"
          class="w-100" />
      </div>
      <div class="col-12 col-md-6 col-lg-2 mt-3 mt-lg-0 px-lg-1">
        <div class="mb-1">End Date</div>
        <el-date-picker v-model="endDate" type="date" placeholder="To" format="DD/MM/YYYY" size="large" class="w-100" />
      </div>
      <div class="col-12 col-md-6 d-flex col-lg-2 mt-3 pl-lg-0 text-sm-center mt-lg-0">
        <div @click="reSet" class="mt-2 c-pointer pr-2 mt-md-4 mt-0 pt-md-2 pt-0 text-primary">Reset</div>
        <el-button :loading="filterLoading" class=" mt-4" @click="filterPledge" round :color="primarycolor" size="large">
          Apply
        </el-button>
      </div>
    </div>
    <div v-if="searchPledges && searchPledges.length > 0 && !loading && !networkError
      ">
      <Table :data="searchPledges" :headers="pledgeHeaders" :checkMultipleItem="false" v-loading="loading">
        <template v-slot:status="{ item }">
          <div class="c-pointer" @click="pledgeListClick(item.id)">
            {{ item.status }}
          </div>
        </template>
        <template v-slot:pledgeNumber="{ item }">
          <div class="c-pointer" @click="pledgeListClick(item.id)">
            {{ item.pledgeNumber }}
          </div>
        </template>
        <template v-slot:pledgeName="{ item }">
          <div class="c-pointer" @click="pledgeListClick(item.id)">
            {{ item.pledgeItemName }}
          </div>
        </template>
        <template v-slot:contact="{ item }">
          <div class="c-pointer" @click="pledgeListClick(item.id)">
            {{ item.contact }}
          </div>
        </template>
        <template v-slot:amount="{ item }">
          <div class="c-pointer" @click="pledgeListClick(item.id)">
            {{ item && item.currency ? item.currency.symbol : "" }}
            {{ Math.abs(item.amount).toLocaleString() }}.00
          </div>
        </template>
        <template v-slot:redeemed="{ item }">
          <div class="c-pointer" @click="pledgeListClick(item.id)">
            {{ item.currencySymbol
            }}{{ Math.abs(item.totalPaymentSum).toLocaleString() }}.00
          </div>
        </template>
        <template v-slot:date="{ item }">
          <div class="c-pointer" @click="pledgeListClick(item.id)">
            {{ date(item.date) }}
          </div>
        </template>
        <template v-slot:action="{ item }">
          <el-dropdown trigger="click">
            <el-icon>
              <MoreFilled />
            </el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>
                  <router-link :to="`/tenant/pledge/pledgemaking?pledgeTypeID=${item.id}`" class="text-color">Make
                    Payment</router-link>
                </el-dropdown-item>
                <el-dropdown-item>
                  <router-link :to="`/tenant/pledge/makepledge?id=${item.id}`" class="text-color">Edit</router-link>
                </el-dropdown-item>
                <el-dropdown-item>
                  <div @click.prevent="showConfirmModal(item.id, index)" class="text-color">
                    Delete
                  </div>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </template>
      </Table>
    </div>
    <el-skeleton class="w-100" animated v-if="loading">
      <template #template>
        <div style="
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 20px;
          ">
          <el-skeleton-item variant="text" style="width: 240px; height: 240px" />
          <el-skeleton-item variant="text" style="width: 240px; height: 240px" />
        </div>
        <el-skeleton class="w-100 mt-5" style="height: 25px" :rows="20" animated />
      </template>
    </el-skeleton>
    <div class="no-person" v-if="searchPledges.length == 0 && !loading && !networkError">
      <div class="empty-img">
        <p><img src="../../assets/people/people-empty.svg" alt="" /></p>
        <p class="tip">You haven't added any pledge yet</p>
        <div class="c-pointer primary-bg col-sm-6 col-md-4 offset-sm-3 offset-md-4 default-btn border-0 text-white"
          @click="navigateToMakePledge">
          Add Pledge
        </div>
      </div>
    </div>

    <div class="adjust-network" v-else-if="networkError">
      <img src="../../assets/network-disconnected.png" />
      <div>Opps, Your internet connection was disrupted</div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, inject } from "vue";
import MembersSearch from "../../components/membership/MembersSearch.vue";
import SelectAllDropdown from "../Reports/ReportsDropdown.vue";
import axios from "@/gateway/backendapi";
import pledge from "../../services/pledgemodule/pledgemodule";
import { useRoute } from "vue-router";
import monthDayYear from "../../services/dates/dateformatter";
import { ElMessage, ElMessageBox } from "element-plus";
import Table from "@/components/table/Table";
import router from "../../router";
import store from "../../store/store";

export default {
  components: {
    MembersSearch,
    SelectAllDropdown,
    Table,
  },
  setup() {
    const primarycolor = inject("primarycolor");
    const networkError = ref(false);
    const route = useRoute();
    const selectedStatusID = ref(null);
    const selectedCategoryID = ref(null);
    const filterLoading = ref(false);
    const allPledgeStatus = ref([
      { name: "Paid", id: '1' },
      { name: "Over Due", id: '2' },
      { name: "No Payment", id: '3' },
      { name: "Partial", id: '4' },
      { name: "---", id: '5' },
    ]);
    const allPledgeDefinitionList = ref([]);
    const selectedCategory = ref([]);
    const filterResult = ref([]);
    const selectedStatus = ref([]);
    const loading = ref(false);
    const searchText = ref("");
    const selectedPledge = ref("");
    const tenantID = ref("");
    const allPledgeType = ref([]);
    const selectedPerson = ref("");
    const allPledgeList = ref(store.getters["pledge/getpledges"]);
    const pledgesSummary = ref(store.getters["pledge/getpledgesummary"]);
    const startDate = ref("");
    const endDate = ref("");
    const showUpload = ref(true);
    const showDraft = ref(false);
    const showInvoice = ref(false);
    const selectedLink = ref(null);
    const selectedContact = ref({});
    const selectedContact2 = ref("");
    const pledgeHeaders = ref([
      { name: "STATUS", value: "status" },
      { name: "PLEDGE NO.", value: "pledgeNumber" },
      { name: "PLEDGE NAME", value: "pledgeName" },
      { name: "CONTACT", value: "contact" },
      { name: "AMOUNT", value: "amount" },
      { name: "REDEEMED", value: "redeemed" },
      { name: "DATE", value: "date" },
      { name: "ACTION", value: "action" },
    ]);

    const upload = () => {
      showUpload.value = true;
      showDraft.value = false;
      showInvoice.value = false;
    };

    const draft = () => {
      showDraft.value = true;
      showUpload.value = false;
      showInvoice.value = false;
    };

    const invoice = () => {
      showInvoice.value = true;
      showDraft.value = false;
      showUpload.value = false;
    };

    const setSelectedCategory = (payload) => {
      console.log(payload, 'ggggg');
      selectedCategory.value = payload

      // selectedCategory.value = allPledgeDefinitionList.value.find((i) => {
      //   return i.id == selectedCategoryID.value;
      // });
    };
    const copylink = () => {
      selectedLink.value.input.setSelectionRange(
        0,
        selectedLink.value.input.value.length
      ); /* For mobile devices */
      selectedLink.value.input.select();

      /* Copy the text inside the text field */
      document.execCommand("copy");
      ElMessage({
        showClose: true,
        message: "Copied to clipboard",
        type: "success",
      });
    };

    const setSelectedStatus = (payload) => {
      console.log(payload, 'kkkkkk');
      selectedStatus.value = payload;
      // selectedStatus.value = allPledgeStatus.value.find((i) => {
      //   return i.id == selectedStatusID.value;
      // });
    };

    const navigateToMakePledge = () => {
      router.push("/tenant/pledge/makepledge");
    };

    const pledgeListClick = (id) => {
      router.push(`/tenant/pledge/pledgemaking?pledgeTypeID=${id}`);
    };
    const pledgeBalance = computed(() => {
      return (
        pledgesSummary.value.totalPledges - pledgesSummary.value.totalPayments
      );
    });

    const getAllPledgeDefinition = async () => {
      try {
        const res = await pledge.getPledgeDefinition();
        allPledgeDefinitionList.value = res.returnObject;
      } catch (error) {
        console.log(error);
      }
    };
    getAllPledgeDefinition();
    const getAllPledgeAmount = ref([]);
    const getAllTotalPayment = ref([]);
    const getAllTotalBalance = ref([]);
    const filterPledge = async () => {
      filterLoading.value = true;
      // let selectedContactValue =
      //   selectedContact.value && selectedContact.value.id
      //     ? selectedContact.value.id
      //     : "";
      // let selectedCategoryValue = selectedCategory.value.map((i) => i.id);

      // let selectedCategoryValue =
      //   selectedCategory.value && selectedCategory.value.id
      //     ? selectedCategory.value.id
      //     : "";
      // let selectedStatusValue =
      //   selectedStatus.value && selectedStatus.value.name
      //     ? selectedStatus.value.name
      //     : "";
      // let selectedStatusValue =  selectedStatus.value.map((i) => i.name);
      // let startDateValue = startDate.value
      //   ? new Date(startDate.value).toLocaleDateString("en-US")
      //   : "";
      // let endDateValue = endDate.value
      //   ? new Date(endDate.value).toLocaleDateString("en-US")
      //   : "";

      const payload = {
        personId: selectedContact.value && selectedContact.value.id ? selectedContact.value.id : "",
        status: selectedStatus.value.map((i) => i.name),
        // status :  selectedStatus.value && selectedStatus.value.length > 0  ? selectedStatus.value.map((i) => i.name) : "",
        pledgeItemIDs: selectedCategory.value.map((i) => i.id),
        // pledgeItemIDs : selectedCategory.value && selectedCategory.value.length > 0 ? selectedCategory.value.map((i) => i.id) : '' ,
        startDate: startDate.value ? new Date(startDate.value).toLocaleDateString("en-US") : "",
        endDate: endDate.value ? new Date(endDate.value).toLocaleDateString("en-US") : ""



      }
      try {
        const res = await axios.post(
          '/api/Pledge/GetAllPledgesSearch', payload
        );
        // const res = await axios.get(
        //   `/api/Pledge/GetAllPledgesSearch?personId=${selectedContactValue}&status=${selectedStatusValue}&pledgeItemID=${selectedCategoryValue}&startDate=${startDateValue}&endDate=${endDateValue}`
        // );
        console.log(res.data, 'gjhgjhfhg');
        if (res.data && res.data.returnObject.length == 0) {
          ElMessage({
            type: "warning",
            message: "No Data Found",
            duration: 5000,
          });
        }
        filterResult.value = res.data.returnObject;
        getAllPledgeAmount.value = res.data.returnObject
          .map((i) => i.amount)
          .reduce((b, a) => b + a, 0);
        getAllTotalPayment.value = res.data.returnObject
          .map((i) => i.totalPaymentSum)
          .reduce((b, a) => b + a, 0);
        getAllTotalBalance.value = res.data.returnObject
          .map((i) => i.balance)
          .reduce((b, a) => b + a, 0);
        console.log(getAllPledgeAmount.value, "jkkj");
        filterLoading.value = false;
      } catch (error) {
        filterLoading.value = false;
        console.log(error);
      }
    };
    const reSet = () => {
      if (
        startDate.value ||
        endDate.value ||
        selectedCategory.value ||
        selectedContact.value ||
        selectedStatus.value
      ) {
        startDate.value = "";
        endDate.value = "";
        selectedCategory.value = [];
        // selectedCategory.value = new Object();
        selectedContact.value = new Object();
        selectedStatus.value = [];
        // selectedStatus.value = new Object();
        selectedCategoryID.value = null;
        selectedStatusID.value = null;
        getAllTotalBalance.value = [];
        getAllTotalPayment.value = [];
        getAllPledgeAmount.value = [];
      }
    };
    const getCurrentlySignedInUser = async () => {
      try {
        const res = await axios.get("/api/Membership/GetCurrentSignedInUser");
        tenantID.value = res.data.tenantId;
      } catch (err) {
        console.log(err);
      }
    };

    getCurrentlySignedInUser();

    const memberlink = computed(() => {
      if (!tenantID.value) return "";
      return `${window.location.origin}/partnership/pay?tenantID=${tenantID.value}`;
    });

    const searchPledges = computed(() => {
      if (searchText.value !== "" && allPledgeList.value.length > 0) {
        return allPledgeList.value.filter((i) => {
          if (i.pledgeType.name)
            return i.pledgeType.name
              .toLowerCase()
              .includes(searchText.value.toLowerCase());
        });
      } else if (
        filterResult.value.length > 0 &&
        (selectedContact.value.name ||
          selectedStatus.value.length > 0 ||
          selectedCategory.value.length > 0 ||
          endDate.value ||
          startDate.value)
      ) {
        return filterResult.value;
      } else {
        return allPledgeList.value;
      }
    });

    const date = (offDate) => {
      return monthDayYear.monthDayYear(offDate);
    };
    const chooseContact = (payload) => {
      selectedContact.value = payload;
    };

    const searchIsVisible = ref(false);

    const toggleSearch = () => {
      searchIsVisible.value = !searchIsVisible.value;
    };

    const getAllPledgesSummary = async () => {
      try {
        await store.dispatch("pledge/getPledgeSummary").then((res) => {
          pledgesSummary.value = res;
        });
      } catch (error) { }
    };

    const getAllPledges = async () => {
      loading.value = true;
      try {
        await store.dispatch("pledge/getPledges").then((res) => {
          allPledgeList.value = res;
          loading.value = false;
        });
      } catch (error) {
        console.log(error);
        loading.value = false;
        networkError.value = true;

        if (error.toString().toLowerCase().includes("network error")) {
          networkError.value = true;
        } else {
          networkError.value = false;
        }
      }
    };

    const pledgeClick = (id) => {
      router.push(`/tenant/pledge/makepledge?id=${id}`);
    };

    const deletePledge = (id) => {
      axios
        .delete(`/api/Pledge/DeletePledge?ID=${id}`)
        .then((res) => {
          console.log(res);
          ElMessage({
            type: "success",
            message: "Pledge form deleted",
            duration: 5000,
          });
          allPledgeList.value = allPledgeList.value.filter(
            (pledgelist) => pledgelist.id !== id
          );
          store.dispatch("pledge/removePledgeFromStore", id);
          getAllPledgesSummary()
        })
        .catch((err) => {
          if (err.response.status === 400) {
            ElMessage({
              type: "error",
              message: "Unable to delete",
              duration: 5000,
            });
          } else {
            ElMessage({
              type: "error",
              message: "Unable to delete",
              duration: 5000,
            });
          }
        });
    };
    const removeSearchText = () => {
      searchText.value = "";
    };
    const clearInput = () => {
      searchIsVisible.value = !searchIsVisible.value;
    };

    const showConfirmModal = (id, index) => {
      ElMessageBox.confirm(
        "Are you sure you want to proceed?",
        "Confirm delete",
        {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "error",
        }
      )
        .then(() => {
          deletePledge(id, index);
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "Delete canceled",
            duration: 5000,
          });
        });
    };

    onMounted(() => {
      if (allPledgeList.value && allPledgeList.value.length == 0)
        getAllPledges();
      if (pledgesSummary.value && Object.keys(pledgesSummary.value).length == 0)
        getAllPledgesSummary();
    });

    return {
      upload,
      getAllTotalPayment,
      getAllTotalBalance,
      getAllPledgeAmount,
      reSet,
      route,
      selectedLink,
      copylink,
      setSelectedStatus,
      filterLoading,
      setSelectedCategory,
      selectedCategoryID,
      pledgeHeaders,
      selectedStatusID,
      allPledgeDefinitionList,
      filterResult,
      pledgeBalance,
      filterPledge,
      pledgeListClick,
      selectedContact2,
      selectedCategory,
      selectedContact,
      draft,
      invoice,
      startDate,
      endDate,
      showUpload,
      showDraft,
      showInvoice,
      allPledgeList,
      navigateToMakePledge,
      networkError,
      tenantID,
      memberlink,
      pledgeClick,
      clearInput,
      searchPledges,
      pledgesSummary,
      toggleSearch,
      startDate,
      endDate,
      chooseContact,
      showConfirmModal,
      deletePledge,
      loading,
      searchText,
      searchIsVisible,
      selectedPledge,
      selectedPerson,
      removeSearchText,
      allPledgeType,
      allPledgeStatus,
      selectedStatus,
      date,
      primarycolor,
      // singlePledge
    };
  },
};
</script>

<style scoped>
.no-person {
  height: 80vh;
  display: flex;
  text-align: center;
}

.more-btn {
  background: #dde2e6;
}

.text-color {
  color: #212529;
  text-decoration: none;
}

.text-color:hover {
  color: #007bff;
}

.empty-img {
  width: 85%;
  /* min-width: 397px; */
  margin: auto;
}

.empty-img img {
  width: 100%;
  max-width: 200px;
}

.events {
  font: normal normal 800 29px Nunito sans;
}

.dropdown-menu a {
  color: #02172e;
}

.link a {
  text-decoration: none;
}

.link a:hover {
  color: #fff;
}

.border-remove {
  border-bottom: 1px solid rgb(189, 189, 189) !important;
}

.border-remove:last-child {
  border: none !important;
}

.table {
  width: 100% !important;
  box-shadow: 0px 1px 3px #02172e45;
  border: 1px solid #dde2e6;
  border-radius: 15px;
  text-align: left;
  margin-bottom: auto !important;
}

.table-top {
  font-weight: 800;
  font-size: 12px;
  display: flex;
  justify-content: flex-end;
}

.table-top label:hover,
.table-top p:hover {
  cursor: pointer;
}

@media screen and (min-width: 500px) {
  .theader {
    width: 23%;
  }

  .table-body .check {
    width: 3%;
  }

  .action {
    width: 5%;
  }
}

@media screen and (max-width: 1024px) {
  .my-con {
    flex-direction: column;
  }

  .table {
    width: 98%;
    margin: 24px auto;
  }

  .summary {
    width: 98%;
    margin: auto;
  }
}

.input-width {
  width: 100%;
}

@media (min-width: 992px) {
  .input-width {
    width: 350px;
  }
}

.table-footer {
  display: flex;
  justify-content: flex-end;
  background: #fff;
  padding: 10px 0;
  border-radius: 0px 0px 22px 22px;
}

.table-header {
  padding: 12px;
  color: black;
  box-shadow: none;
  font-size: 11px;
  font-weight: 700;
}

.table-body {
  padding: 12px;
  border-bottom: 1.5px solid #6d6d6d19;
}

.hover:hover {
  background: #eee;
}

.parent-desc.first {
  color: #8898aa;
  font-size: 14px;
  font-weight: 600;
  box-shadow: 0px 3px 6px #2c28281c;
  background: #dde2e6 0% 0% no-repeat padding-box;
}

.desc-head {
  font-weight: 700;
}

.desc {
  color: #9b9a9c;
}

.pi-spinner {
  color: #136acd;
}

.fa-ellipsis-v {
  padding: 10px;
}
</style>