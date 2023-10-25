<template>
  <div>
    <div class="container-fluid px-0">
      <div class="row mb-3">
        <div class="col-md-6 px-0 first-timers-text">
          <h2 class="head-text">Branch Transactions</h2>
        </div>

        <!-- <div class="col-md-6 d-flex flex-row-reverse">
        <BranchSelect class="w-50" @selectedbranch="setSelectedBranch" />
      </div> -->
      </div>
      <div class="row">
        <div class="col-md-12 px-0">
          Here you can view and manage the transactions of your branches, select
          the branch you want to view its transactions from the dropdown at the
          top-right corner.
        </div>
      </div>
      <div class="row" v-if="loading && branchTransactions.length == 0">
        <div class="col-md-12 d-flex justify-content-center mt-5">
          <el-icon
            :size="40"
            class="is-loading"
          >
            <Loading />
          </el-icon>
        </div>
      </div>
      <div class="row" v-if="branchTransactions.length > 0">
        <div class="col-12 px-0" id="table">
          <div class="top-con">
            <div class="table-top p-3 mt-5">
              <div
                class="d-flex flex-column flex-sm-row justify-content-sm-end"
              >
                <el-input
                  size="small"
                  v-model="searchText"
                  placeholder="Search..."
                  class="w-50"
                >
                  <template #suffix>
                    <el-button
                      style="padding: 5px; height: 22px"
                      @click.prevent="searchText = ''"
                    >
                      <el-icon :size="13">
                        <Close />
                      </el-icon>
                    </el-button>
                  </template>
                  <template #append>
                    <el-button>
                      <el-icon :size="13">
                        <Search />
                      </el-icon>
                    </el-button>
                  </template>
                </el-input>
              </div>
            </div>
          </div>
          <div>
            <Table
              :data="searchBranchTransactions"
              :headers="branchTransactionHeaders"
              v-loading="loading"
              :checkMultipleItem="false"
              @checkedrow="handleSelectionChange"
              v-if="searchBranchTransactions.length > 0"
            >
              <template v-slot:date="{ item }">
                {{ item.eventName }}
                <div class="c-pointer">
                  {{ formatDate(item.date) }}
                </div>
              </template>

              <template v-slot:description="{ item }">
                <div class="c-pointer">
                  {{ item.contribution }}
                </div>
              </template>

              <template v-slot:amount="{ item }">
                <div class="c-pointer">
                  {{ item.currencyName }} {{ item.amount }}
                </div>
              </template>
              <template v-slot:event="{ item }">
                <div class="c-pointer">
                  {{ item.eventName }}
                </div>
              </template>
              <template v-slot:donor="{ item }">
                <router-link
                  class="text-decoration-none fontIncrease"
                  :to="{
                    name: 'AddOffering',
                    params: { offId: item.id },
                  }"
                  >{{ item.donor }}</router-link
                >
              </template>
              <template v-slot:channel="{ item }">
                <div class="c-pointer">
                  {{ item.channel }}
                </div>
              </template>
            </Table>
            <div
              class="d-flex justify-content-end my-3"
              v-if="searchBranchTransactions.length > 0"
            >
              <el-pagination
                v-model:current-page="serverOptions.page"
                v-model:page-size="serverOptions.rowsPerPage"
                background
                layout="total, prev, pager, next, jumper"
                :total="totalItems"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from "@vue/runtime-core";
import BranchSelect from "../component/BranchSelect.vue";
import axios from "@/gateway/backendapi";
import dateFormatter from "../../../services/dates/dateformatter";
import Table from "@/components/table/Table";
import { ElMessage } from "element-plus";

export default {
  components: {
    BranchSelect,
    Table,
  },

  setup() {
    const selectedBranch = ref({});
    const branchTransactions = ref([]);
    const marked = ref([]);
    const filterFormIsVissible = ref(false);
    const searchIsVisible = ref(false);
    const searchText = ref("");
    const loading = ref(false);
    const branchId = ref("");
    const totalItems = ref();
    const branchID = ref(localStorage.getItem("branchId"));
    const branchTransactionHeaders = ref([
      { name: "DATE", value: "date" },
      { name: "DESCRIPTION", value: "description" },
      { name: "AMOUNT", value: "amount" },
      { name: "EVENT", value: "event" },
      { name: "DONOR", value: "donor" },
      { name: "CHANNEL", value: "channel" },
    ]);

    const setSelectedBranch = async (payload) => {
      loading.value = true;
      branchId.value = payload.id;
      try {
        let { data } = await axios.get(
          `/api/Branching/${payload.id}/transactions?page=1`
        );
        loading.value = false;
        branchTransactions.value = data.data;
        totalItems.value = data.totalItems;
        if (data.data.length === 0) {
          ElMessage({
            type: "warning",
            message: "There are no transaction in this branch yet.",
            duration: 5000,
          });
        }
      } catch (err) {
        loading.value = false;
        console.log(err);
      }
    };
    const handleSizeChange = (val) => {
      console.log(`${val} items per page`);
    };
    const handleCurrentChange = (val) => {
      console.log(`current page: ${val}`);
    };
    const handleSelectionChange = (val) => {
      marked.value = val;
    };
    const serverOptions = ref({
      page: 1,
      rowsPerPage: 50,
    });

     watch(serverOptions.value, () => {
      getTransactionByPage();
    },
      { deep: true }
    );

    const getTransactionList = async () => {
      loading.value = true;
      try {
        let { data } = await axios.get(
          `/api/Branching/${branchID.value}/transactions?page=1`
        );
        loading.value = false;
        console.log(data);
        branchTransactions.value = data.data;
        totalItems.value = data.totalItems;
        if (data.data.length === 0) {
          ElMessage({
            type: "warning",
            message: "There are no transaction in this branch yet.",
            duration: 5000,
          });
        }
      } catch (err) {
        loading.value = false;
        console.log(err);
      }
    };
    getTransactionList();

    const toggleFilterFormVissibility = () =>
      (filterFormIsVissible.value = !filterFormIsVissible.value);
    const toggleSearch = () => {
      searchIsVisible.value = !searchIsVisible.value;
    };

    const searchBranchTransactions = computed(() => {
      if (branchTransactions.value.length > 0 && !searchText.value)
        return branchTransactions.value;
      return branchTransactions.value.filter((i) => {
        return i.contribution
          .toLowerCase()
          .includes(searchText.value.toLowerCase());
      });
    });

    const formatDate = (date) => {
      return dateFormatter.monthDayYear(date);
    };

    const currentPage = ref(0);
    const getTransactionByPage = async () => {
      // if (page < 0) return false;
      try {
        const { data } = await axios.get(
          `/api/Branching/${branchID.value}/transactions?page=${serverOptions.value.page}`
        );
        if (data && data.data.length > 0) {
          branchTransactions.value = data.data;
           totalItems.value = data.totalItems
        } else {
          ElMessage({
          type: 'warning',
          message: `Page ${serverOptions.value.page} cannot be found`,
          duration: 5000
        })
        }
        loading.value = false;
      } catch (error) {
        console.log(error);
        loading.value = false;
        ElMessage({
          type: 'error',
          message: `Could not generate page ${serverOptions.value.page}, please try again`,
          duration: 5000
        })
      }
    };

    // const deleteMember = (id) => {
    //   axios
    //     .delete(`/api/People/DeleteOnePerson/${id}`)
    //     .then((res) => {
    //       console.log(res);
    //       branchTransactions.value = branchTransactions.value.filter(
    //         (item) => item.id !== id
    //       );
    //       if (res.data.response.includes("@")) {
    //         let disRes = res.data.response.split("@")
    //         toast.add({
    //           severity: "info",
    //           summary: "Info",
    //           detail: disRes[0],
    //           life: 10000,
    //         });
    //       } else {
    //         toast.add({
    //           severity: "success",
    //           summary: "Confirmed",
    //           detail: "Member Deleted",
    //           life: 5000,
    //         });
    //       }
    //     })
    //     .catch((err) => {
    //       toast.add({
    //         severity: "error",
    //         summary: "Delete Error",
    //         detail: "Deleting member failed",
    //         life: 3000,
    //       });
    //       console.log(err);
    //     });
    // };

    // const showConfirmModal = (id) => {
    //   confirm.require({
    //     message: "Are you sure you want to proceed?",
    //     header: "Confirmation",
    //     icon: "pi pi-exclamation-triangle",
    //     acceptClass: "confirm-delete",
    //     rejectClass: "cancel-delete",
    //     accept: () => {
    //       deleteMember(id);
    //       // toast.add({severity:'info', summary:'Confirmed', detail:'Member Deleted', life: 3000});
    //     },
    //     reject: () => {
    //       toast.add({
    //         severity: "info",
    //         summary: "Rejected",
    //         detail: "You have rejected",
    //         life: 3000,
    //       });
    //     },
    //   });
    // };

    return {
      setSelectedBranch,
      branchTransactionHeaders,
      handleSizeChange,
      handleCurrentChange,
      handleSelectionChange,
      serverOptions,
      marked,
      selectedBranch,
      branchTransactions,
      filterFormIsVissible,
      searchIsVisible,
      toggleFilterFormVissibility,
      toggleSearch,
      searchBranchTransactions,
      searchText,
      // showConfirmModal,
      // deleteMember,
      loading,
      formatDate,
      branchID,
      branchId,
      currentPage,
      totalItems,
    };
  },
};
</script>

<style scoped>
.page-header {
  font: normal normal 800 29px Nunito sans;
}

.filter-options-shown {
  height: 80px;
  overflow: hidden;
  transition: all 0.5s ease-in-out;
}
.table-top {
  font-weight: 800;
  font-size: 12px;
  background: #fff;
  border: 1px solid #d4dde3;
  border-bottom: none;
  cursor: pointer;
}

.filter-options {
  height: 0;
  overflow: hidden;
  transition: all 0.5s ease-in-out;
}

.img-resize {
  border-radius: 50%;
  height: 26px;
  width: 26px;
  object-fit: cover;
}

.t-header {
  background: #dde2e6 0% 0% no-repeat padding-box;
  font-size: 16px;
  padding: 0.5rem 0;
}

.desc-head {
  font-weight: 700;
}

.hover:hover {
  background: #eee;
}

.itemroute-color {
  color: #136acd;
  cursor: pointer;
}

@media (max-width: 767px) {
  .filter-options-shown {
    height: 150px;
  }
}
</style>