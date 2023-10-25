<template>
  <div class="row">
    <div class="col-12 px-0">
      <!-- <div class="top-con" id="ignore2"> -->
        <!-- <div class="table-top mt-4">
          <div class="filter col-2">
            <p @click="toggleFilterFormVissibility" class="mt-2">
              <i class="fas fa-filter"></i>
              FILTER
            </p>
          </div>
          <div class="col-2">
            <p @click="toggleSearch" class="search-text w-100 mt-2">
              <i class="pi pi-search"></i> SEARCH
            </p>
          </div>

          <div class="search d-flex ml-2">
            <label
              class="label-search d-flex"
              :class="{
                'show-search': searchIsVisible,
                'hide-search': !searchIsVisible,
              }"
            >
              <input
                type="text"
                placeholder="Search by name"
                v-model="searchText"
              />
              <span class="empty-btn">x</span>
              <span class="search-btn">
                <i class="pi pi-search"></i>
              </span>
            </label>
          </div>
        </div> -->
        <div class="table-top p-3 mt-5">
          <div class="d-flex flex-column flex-sm-row justify-content-sm-between">
            <div>
              <p @click="toggleFilterFormVissibility" class="mb-0 mr-3 d-flex my-3 my-sm-0 c-pointer">
                <el-icon :size="13">
                  <Filter />
                </el-icon>
                <span class="ml-1"> FILTER</span>
              </p>
            </div>
            <el-input size="small" v-model="searchText" placeholder="Search..."  @keyup.enter.prevent="searchContributionInDB"
              class="input-with-select">
              <template #suffix>
              <el-button style="padding: 5px; height: 22px;" @click.prevent="searchText = ''">
                <el-icon :size="13">
                  <Close />
                </el-icon>
              </el-button>
            </template>
              <template #append>
                <el-button @click.prevent="searchContributionInDB">
                  <el-icon :size="13">
                    <Search />
                  </el-icon>
                </el-button>
              </template>
            </el-input>
          </div>
      </div>
      <!-- </div> -->
      <div
        class="filter-options"
        :class="{ 'filter-options-shown': filterFormIsVissible }"
      >
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-9">
              <div class="row">
                <div
                  class="col-12 col-sm-6 col-md-4 offset-sm-3 offset-md-0 form-group inp w-100"
                >
                  <el-input
                    type="text"
                    class=" w-100"
                    placeholder="Name"
                    v-model="filter.name"
                  />
                </div>

                <div class="col-12 col-md-4 form-group d-none d-md-block">
                  <el-input
                    type="text"
                    class=" w-100"
                    placeholder="Cash Account"
                    v-model="filter.cashAccount"
                  />
                </div>

                <div class="col-12 col-md-4 form-group d-none d-md-block">
                  <el-input
                    type="text"
                    class=" w-100"
                    placeholder="Income Account"
                    v-model="filter.incomeAccount"
                  />
                </div>
              </div>
            </div>

            <div class="col-md-3 d-flex flex-column align-items-center">
              <el-button round :color="primarycolor" class=" text-white" >
                Apply
              </el-button>
              <span class="mt-2">
                <a class="clear-link mr-2" @click="clearAll">Clear all</a>
                <span class="mx-2"
                  ><i class="fas fa-circle" style="font-size: 4px"></i></span
                ><a class="hide-link ml-2" @click="hide">Hide</a>
              </span>
            </div>
          </div>
        </div>
      </div>
        <Table
          :data="searchContribution"
          :headers="offeringItemsHeader"
          :checkMultipleItem="true"
          @checkedrow="handleSelectionChange"
          v-if="searchContribution.length > 0"
        >
          <template v-slot:name="{ item }">
            <div class="c-pointer" @click="contributionItemClick(item.id)">
              {{ item.name }}
            </div>
          </template>
          <template v-slot:cashaccount="{ item }">
            <div class="c-pointer" @click="contributionItemClick(item.id)">
              {{ item.cashBankAccount }}
            </div>
          </template>
          <template v-slot:incomeaccount="{ item }">
            <div class="c-pointer" @click="contributionItemClick(item.id)" >
              {{ item.incomeAccount }}
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
                    <router-link
                      class="remove-text-decoration text-decoration-none"
                      :to="{
                        name: 'OfferingCategory',
                        params: { offId: item.id },
                      }"
                    >
                      <div class="text-decoration-none text-color">Edit</div>
                    </router-link>
                  </el-dropdown-item>

                  <el-dropdown-item>
                    <div
                      class="text-decoration-none text-color"
                      @click="showConfirmModal(item.id, index)"
                    >
                      Delete
                    </div>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </template>
        </Table>
        <!-- <div
              class="col-12 parent-desc py-2 px-0 c-pointer tr-border-bottom"
              v-for="(item, index) in searchContribution"
              :key="item.id"
            >
                <div class="row w-100" style="margin:0">
                  <div class="col-md-1 d-flex d-md-block px-3 justify-content-end">
                    <input
                      type="checkbox"
                      v-model="item.check"
                      class="form-check"
                    />
                  </div>

                  <router-link class="desc small-text col-md-3 remove-text-decoration"
                  :to="{ name: 'OfferingCategory', params: { offId: item.id } }">
                    <p class="mb-0 d-flex justify-content-between">
                      <span class="text-dark font-weight-bold d-flex d-md-none">Name</span>
                      <span>{{ item.name }}</span>
                    </p>
                  </router-link>

                  <router-link class="col-md-3 remove-text-decoration" :to="{ name: 'OfferingCategory', params: { offId: item.id } }">
                    <div class="d-flex justify-content-between">
                      <span class="text-dark font-weight-bold d-flex d-md-none">Cash Account</span>
                    <div>
                      <div class="desc small-text text-right text-md-left">{{ item.cashBankAccount }}</div>
                    </div>
                    </div>
                  </router-link>

                  <router-link  :to="{ name: 'OfferingCategory', params: { offId: item.id } }" class="desc-head small-text col-md-3 remove-text-decoration">
                    <p class="mb-0 d-flex justify-content-between">
                      <span class="text-dark font-weight-bold d-flex d-md-none">Income Account</span>
                      <span>{{ item.incomeAccount}}</span>
                    </p>
                  </router-link>



                  <div class="small-text col-md-2">
                    <div class="action data action-icon">
                      <div class="dropdown">
                        <i
                          class="fas fa-ellipsis-v cursor-pointerfas fa-ellipsis-v cursor-pointer d-flex d-md-block justify-content-end "
                          id="dropdownMenuButton"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        ></i>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                          <router-link class="remove-text-decoration" :to="{ name: 'OfferingCategory', params: { offId: item.id } }">
                            <a class="dropdown-item elipsis-items" >
                            Edit
                            </a>
                          </router-link>
                            <a
                              class="dropdown-item elipsis-items cursor-pointer"
                              @click="showConfirmModal(item.id, index)"
                              >Delete</a
                            >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> -->

      <div class="col-12">
        <!-- <div class="table-footer">
          <Pagination
            @getcontent="getPeopleByPage"
            :itemsCount="offeringCount"
            :currentPage="currentPage"
          />
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { ref, inject, computed } from "vue";
import axios from "@/gateway/backendapi";
import store from "../../../store/store"
import Pagination from "../../../components/pagination/PaginationButtons";
import moment from "moment";
import Table from "@/components/table/Table";
import { ElMessage, ElMessageBox } from 'element-plus'
import finish from "../../../services/progressbar/progress";

export default {
  props: ["contributionItems"],
  components: {
    Table,
    Pagination,
  },

  setup(props, { emit }) {
    const searchIsVisible = ref(false);
    const primarycolor = inject('primarycolor')
    const marked = ref([]);
    const searchText = ref("");
    const filter = ref({});
    const filterFormIsVissible = ref(false);
    const toggleFilterFormVissibility = () =>
      (filterFormIsVissible.value = !filterFormIsVissible.value);

    const toggleSearch = () => {
      searchIsVisible.value = !searchIsVisible.value;
    };

    const searchContributionInDB = () => {
      if (searchText.value !== "" && props.contributionItems.length > 0) {
        return props.contributionItems.filter((i) => {
          if (i.name)
            return i.name
              .toLowerCase()
              .includes(searchText.value.toLowerCase());
        });
      } else {
        return props.contributionItems;
      }
    };

    const contributionItemClick = (id) => {
      router.push(`/tenant/offeringcategory/${id}`);
    };

    const handleSelectionChange = (val) => {
      marked.value = val;
    };

    const offeringItemsHeader = ref([
      { name: "NAME", value: "name" },
      { name: "CASH ACCOUNT", value: "cashaccount" },
      { name: "INCOME ACCOUNT", value: "incomeaccount" },
      { name: "ACTION", value: "action" },
    ]);

    const searchContribution = computed(() => {
      if (searchText.value !== "") {
        return props.contributionItems.filter((i) => {
          return i.name.toLowerCase().includes(searchText.value.toLowerCase());
        });
      } else {
        return props.contributionItems;
      }
    });

    const deleteOffering = (id, index) => {
      axios
        .delete(`/api/Financials/Contributions/Delete?ID=${id}`)
        .then((res) => {
          if (res.data.status) {
            ElMessage({
              type: 'success',
              showClose: true,
              message: `${res.data.response}`,
              duration: 5000
            })
            store.dispatch("contributions/removeContributionItemFromStore", id);
            emit("contri-items", index);
          } else {
            ElMessage({
              type: 'warning',
              showClose: true,
              message: `${res.data.response}`,
              duration: 5000
            })
          }
        })
        .catch((err) => {
          finish();
          if (err.response) {
            ElMessage({
              type: 'error',
              showClose: true,
              message: `${res.response}`,
              duration: 5000
            })
          }
        });
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
          deleteOffering(id, index);
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "Delete canceled",
            duration: 5000,
          });
        });
    };
    const currentPage = ref(1);

    const getPeopleByPage = async (page) => {
      if (page < 1) return false;
      try {
        const { data } = await axios.get(
          `/api/people/getPaginatedFirstTimer?page=${page}`
        );
        emit("get-pages", data);
        currentPage.value = page;
      } catch (error) {
        console.log(error);
      }
    };

    const offeringCount = computed(() => {
      if (props.contributionItems.length > 100)
        return Math.ceil(props.contributionItems.length / 100);
      return 1;
    });

    const clearAll = () => {
      filter.value = {};
    };

    const hide = () => {
      filterFormIsVissible.value = false;
    };

    return {
      offeringItemsHeader,
      primarycolor,
      searchContributionInDB,
      contributionItemClick,
      deleteOffering,
      filterFormIsVissible,
      toggleFilterFormVissibility,
      moment,
      marked,
      clearAll,
      // applyFilter,
      filter,
      toggleSearch,
      searchIsVisible,
      searchText,
      searchContribution,
      handleSelectionChange,
      showConfirmModal,
      offeringCount,
      currentPage,
      getPeopleByPage,
      hide,
    };
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
  color: #02172e;
}

.remove-text-decoration {
  text-decoration: none;
}

.data-value a {
  color: #136acd;
  text-decoration: none;
  width: 241px;
}

.page-header {
  font-weight: 700;
  font-size: 1.7rem;
}

.summary {
  border-radius: 30px;
  padding: 24px 10px;
  background: #fff;
  box-shadow: 0px 3px 6px #2c28281c;
  border: 1px solid #00204424;
}

.table {
  width: 100% !important;
  box-shadow: 0px 1px 4px #02172e45;
  border: 1px solid #dde2e6;
  border-radius: 30px;
  text-align: left;
  margin-bottom: auto !important;
}

.boards {
  display: flex;
}

.board-top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
  align-items: center;
  box-shadow: 0px 3px 6px #2c28281c;
  padding: 4px;
}

.total {
  margin-bottom: 40px;
  font-size: 37px;
}

.total-text {
  font-size: 15px;
  font-weight: 700;
}

.percent {
  color: #136acd;
}

.hr {
  border: 1px solid #0020440a;
  margin: 0 4px 10px 0;
}

.tbl-footer-btn {
  background: transparent;
  padding: 4px;
  margin: 4px 8px;
  border-radius: 50%;
  width: 29px;
  border: none;
  border: 1px solid #8898aa80;
  outline: transparent;
}

.action-icon {
  text-align: center;
}

.list-body {
  padding: 0 21px;
}

.data-value {
  display: flex;
  padding-left: 6px;
}

.theader {
  padding-left: 2px;
  text-align: left;
}

.filter-options {
  height: 0;
  overflow: hidden;
  transition: all 0.5s ease-in-out;
}

.filter-options-shown {
  height: 80px !important;
  overflow: hidden;
  transition: all 0.5s ease-in-out;
  background: #ffffff;
  border-right: 1px solid #E0E0E0;
  border-left: 1px solid #E0E0E0;
}

.clear-link,
.hide-link {
  color: #136acd;
}

.table-top {
  font-weight: 800;
  font-size: 12px;
  background: #fff;
  border: 1px solid #e0e0e0;
  border-bottom: none;
  justify-content: flex-end;
  display: flex;
}

.table-top label:hover,
.table-top p:hover {
  cursor: pointer;
}

@media (max-width: 660px) {
  .select-all {
    display: none;
  }
}

.header {
  background: #dde2e6 0% 0% no-repeat padding-box;
  font: normal normal bold 13px/13px Nunito Sans;
  letter-spacing: 0px;
  color: #002044;
}

.header tr {
  color: #8898aa;
  font-size: 11px;
  box-shadow: 0px 3px 6px #2c28281c;
  background: #dde2e6 0% 0% no-repeat padding-box;
}

.select-all input {
  margin: 0 8px 0 -5px !important;
}

.currency {
  background: #dde2e6 0% 0% no-repeat padding-box;
  border: 1px solid #c5d9f2;
  border-radius: 5px;
  letter-spacing: 0px;
  color: #1c252c;
  padding: 5px;
}

.offering-amount {
  border: 1px solid #00204424;
  padding: 5px;
  border-radius: 5px;
}

.head-button {
  display: flex;
  justify-content: flex-end;
}

.add-btn {
  width: 180px;
  background: #136acd;
  border-radius: 22px;
  color: #ffffff;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 42px;
  text-decoration: none;
}

.more {
  background: #dde2e6;
  border-radius: 22px;
  width: 180px;
  font-weight: bold;
  border: transparent;
  outline: transparent;
  height: 42px;
  margin-right: 1rem;
}

.fa-ellipsis-v:hover {
  cursor: pointer;
}

#chart {
  width: 48%;
  max-height: 310px;
  border-radius: 10px;
}

.board.members-count {
  padding: 24px;
}

.no-record {
  color: rgba(184, 5, 5, 0.726);
  font-size: 1.1em;
}

.chart1,
.chart2 {
  border-radius: 10px;
}

.itemroute-color {
  color: #136acd;
}

@media (max-width: 767px) {
  .first-timers-text {
    text-align: center;
  }
  .head-button {
    display: flex;
    justify-content: center;
  }
}

@media screen and (max-width: 500px) {
  .board {
    width: 100% !important;
  }
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

@media (max-width: 577px) {
  .head-button {
    flex-direction: column;
    align-items: center;
  }

  .more {
    margin-right: 0;
  }

  .add-btn {
    margin-top: 10px;
  }
}

@media (max-width: 575px) {
  .head-button {
    display: flex;
    /* flex-direction: row; */
    /* align-items: center; */
    justify-content: center;
  }

  /* .add-btn,
  .more {
    margin-top: 10px;
  } */
}

@media screen and (min-width: 501px) and (max-width: 768px) {
  /* .boards {
    flex-direction: column;
    align-items: center !important;
    flex-wrap: nowrap !important;
  }

  .chart-con {
    width: 85% !important;
  }

  .chart-con div {
    width: 40%;
  } */

  .board {
    width: 50% !important;
    margin-bottom: 10px;
  }

  .summary-header {
    width: 50%;
    margin-left: 25%;
  }
}

@media screen and (max-width: 768px) {
  .filter-options-shown {
    height: 150px !important;
    overflow: hidden;
    transition: all 0.5s ease-in-out;
  }

  .boards {
    flex-wrap: nowrap;
  }

  .responsive-table {
    max-width: 100%;
    overflow-x: scroll;
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

.row-divider {
  border: 1px solid #0020440a;
  margin: 0;
}

.table-footer {
  display: flex;
  justify-content: flex-end;
  background: #fff;
  padding: 10px 0;
  border-radius: 0px 0px 22px 22px;
}

.board.members-count {
  max-height: 216px;
}

.table-header {
  padding: 12px;
  color: black;
  box-shadow: none;
  font-size: 16px;
}

.table-body {
  padding: 12px;
  border-bottom: 1.5px solid #6d6d6d19;
}

.itemroute-color {
  color: #136acd;
}

.itemroute-color:hover {
  text-decoration: none;
}

.t-header {
  background: #dde2e6 0% 0% no-repeat padding-box;
  font-size: 16px;
  padding: 0.5rem 0;
}
</style>


