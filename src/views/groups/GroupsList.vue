<template>
  <div>
    <Header headerName="Contact Segment" />
    <el-main>
      <div class="d-flex justify-content-end">
        <div class="mt-2 my-1 link">
          <el-button
            class="header-btn"
            @click="router.push('/tenant/createpeoplegroup')"
            :color="primarycolor"
            size="large"
          >
            Add contact segment
          </el-button>
        </div>
      </div>
      <div class="row">
        <div class="col-12 table-container" id="table">
          <div class="top-con" id="ignore2">
            <div class="table-top p-3 mt-3 mt-md-5">
              <div class="col-md-5">
                <el-input
                  size="small"
                  v-model="searchText"
                  placeholder="Search..."
                  @keyup.enter.prevent="searchGroupInDB"
                  class="input-with-select"
                >
                  <template #append>
                    <el-button @click.prevent="searchGroupInDB">
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
            <!-- <el-table
              :data="searchGroup"
              v-loading="loading"
              stripe
              class="groupTree"
              lazy
              style="width: 100%"
              row-key="id"
              :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
            >
              <el-table-column width="40%" label="Group">
                <template #default="scope">
                  <div @click="groupClick(scope.row.id)" class="c-pointer">
                    {{ scope.row.name }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column width="40%" label="Membership Size">
                <template #default="scope">
                  <div @click="groupClick(scope.row.id)" class="c-pointer">
                    {{ scope.row.peopleInGroupsCount }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column width="20%" label="Action">
                <template #default="scope">
                  <div class="c-pointer">
                    <el-dropdown trigger="click">
                      <el-icon>
                        <MoreFilled />
                      </el-icon>
                      <template #dropdown>
                        <el-dropdown-menu>
                          <el-dropdown-item>
                            <a
                              class="no-decoration text-dark"
                              @click="sendGroupSms(scope.row)"
                              >Send SMS</a
                            >
                          </el-dropdown-item>
                          <el-dropdown-item>
                            <a
                              class="no-decoration text-dark"
                              @click="sendGroupEmail(scope.row)"
                            >
                              Send Email
                            </a>
                          </el-dropdown-item>
                          <el-dropdown-item>
                            <a
                              class="no-decoration text-dark"
                              @click="confirmDelete(scope.row.id)"
                              >Delete</a
                            >
                          </el-dropdown-item>
                        </el-dropdown-menu>
                      </template>
                    </el-dropdown>
                  </div>
                </template>
              </el-table-column>
            </el-table> -->
            <Table
              :data="searchGroup"
              :headers="groupHeaders"
              :checkMultipleItem="false"
              v-loading="loading"
              v-if="searchGroup.length > 0"
            >
              <template #name="{ item }">
                <div class="c-pointer" @click="groupClick(item.id)">
                  {{ item.name }}
                </div>
              </template>
              <template v-slot:peopleInGroupsCount="{ item }">
                <div class="c-pointer" @click="groupClick(item.id)">
                  {{ item.peopleInGroupsCount }}
                </div>
              </template>
              <template v-slot:action>
                <div>
                  <!-- <div class="dropdown">
                    <el-icon data-toggle="dropdown" aria-expanded="false">
                      <MoreFilled />
                    </el-icon>
                    <ul class="dropdown-menu">
                      <li class="dropdown-item">
                        <a>
                          <router-link
                            :to="
                              item.mobilePhone
                                ? `/tenant/sms/compose?phone=${item.mobilePhone}`
                                : ''
                            "
                            :class="{
                              'fade-text': !item.mobilePhone,
                              'text-color': item.mobilePhone,
                            }"
                            >Send SMS</router-link
                          >
                        </a>
                      </li>
                      <li>
                        <a class="dropdown-item" href="#">
                          <router-link
                            :to="
                              item.email
                                ? `/tenant/email/compose?phone=${item.email}`
                                : ''
                            "
                            :class="{
                              'fade-text': !item.email,
                              'text-color': item.email,
                            }"
                            >Send Email</router-link
                          >
                        </a>
                      </li>
                       <li @click="displayWhatsappDrawer(item)">
                        <a class="dropdown-item" href="#"> Send Whatsapp </a>
                      </li>
                     <li @click="archive(item.id, 'single')">
                        <a class="dropdown-item" href="#">
                          <div class="text-color">Archive</div>
                        </a>
                      </li>
                      <li>
                        <a class="dropdown-item" href="#">
                          <router-link
                            :to="`/tenant/firsttimermanagement/${item.id}?memberType=1`"
                            class="text-color"
                          >
                            Follow Up
                          </router-link>
                        </a>
                      </li>
                      <li>
                        <a class="dropdown-item" href="#">
                          <router-link
                            :to="`/tenant/people/add/${item.id}`"
                            class="text-color"
                            >Edit</router-link
                          >
                        </a>
                      </li>
                      <li>
                        <a class="dropdown-item" href="#">
                          <div
                            @click.prevent="showConfirmModal(item.id, index)"
                            class="text-color"
                          >
                            Delete
                          </div>
                        </a>
                      </li>
                    </ul>
                  </div> -->
                  <el-dropdown trigger="click">
                    <el-icon>
                      <MoreFilled />
                    </el-icon>
                    <template #dropdown>
                      <el-dropdown-menu>
                        <el-dropdown-item>
                          <a
                            class="no-decoration text-dark"
                            @click="sendGroupSms(scope.row)"
                            >Send SMS</a
                          >
                        </el-dropdown-item>
                        <el-dropdown-item>
                          <a
                            class="no-decoration text-dark"
                            @click="sendGroupEmail(scope.row)"
                          >
                            Send Email
                          </a>
                        </el-dropdown-item>
                        <el-dropdown-item>
                          <a
                            class="no-decoration text-dark"
                            @click="confirmDelete(scope.row.id)"
                            >Delete</a
                          >
                        </el-dropdown-item>
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                </div>
              </template>
            </Table>
            <div class="d-flex justify-content-end my-3">
              <el-pagination
                v-model:current-page="serverOptions.page"
                v-model:page-size="serverOptions.rowsPerPage"
                background
                layout="total, prev, pager, next, jumper"
                :total="serverItemsLength"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
              />
            </div>
          </div>
        </div>
      </div>
    </el-main>

    <el-drawer
      v-model="showSMS"
      :size="mdAndUp || lgAndUp || xlAndUp ? '70%' : '100%'"
      direction="rtl"
    >
      <template #default>
        <div>
          <smsComponent
            :groupData="groupListDetails"
            @closesidemodal="() => (showSMS = false)"
          />
        </div>
      </template>
    </el-drawer>

    <el-drawer
      v-model="showEmail"
      :size="mdAndUp || lgAndUp || xlAndUp ? '70%' : '100%'"
      direction="rtl"
    >
      <template #default>
        <div>
          <emailComponent
            :groupData="groupListDetails"
            @closesidemodal="() => (showEmail = false)"
          />
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script>
import { ref, computed, watch, watchEffect, inject } from "vue";
import { useRoute, useRouter } from "vue-router";
import groupsService from "../../services/groups/groupsservice";
import { useStore } from "vuex";
import smsComponent from "./component/smsComponent.vue";
import emailComponent from "./component/emailComponent.vue";
import deviceBreakpoint from "../../mixins/deviceBreakpoint";
import { ElMessage, ElMessageBox } from "element-plus";
import axios from "@/gateway/backendapi";
import Header from "@/components/header/Header.vue";
import Table from "@/components/table/Table";

export default {
  components: {
    smsComponent,
    emailComponent,
    Header,
    Table,
  },

  setup() {
    const primarycolor = inject("primarycolor");
    const store = useStore();
    const loading = ref(false);
    const displayConfirmModal = ref(false);
    const paginatedTableLoading = ref(false);
    const { mdAndUp, lgAndUp, xlAndUp } = deviceBreakpoint();
    const groups = ref(store.getters["groups/groups"]);
    const groupListDetails = ref([]);
    const showSMS = ref(false);
    const showEmail = ref(false);
    const router = useRouter();
    const route = useRoute();
    const serverItemsLength = ref(0);
    const getGroupSummary = ref(0);
    const groupHeaders = ref([
      { name: "Name", value: "name" },
      { name: "Total Contact", value: "peopleInGroupsCount" },
      { name: "Actions", value: "action" },
    ]);

    const handleSizeChange = (val) => {
      console.log(`${val} items per page`);
    };
    const handleCurrentChange = (val) => {
      console.log(`current page: ${val}`);
    };
    const serverOptions = ref({
      page: 1,
      rowsPerPage: 100,
    });
    const getGroupByPage = async () => {
      loading.value = true;
      try {
        const { data } = await axios.get(
          `/api/GetAllGroupBasicInformation?page=${serverOptions.value.page}`
        );
        groups.value = data;
        loading.value = false;
      } catch (error) {
        loading.value = false;
        console.log(error);
      }
    };

    const confirmDelete = (id) => {
      ElMessageBox.confirm(
        "Are you sure you want to proceed? This operation can't be reversed ",
        "Confirm delete",
        {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "error",
        }
      );
      try {
        groupsService.deleteGroup(id).then(() => {
          const index = groups.value.findIndex((i) => i.id == id);
          groups.value.splice(index, 1);
          groupsService.removeGroupFromStore(index);
          ElMessage({
            type: "success",
            message: "Group deleted successfully",
            duration: 7000,
          });
        });
      } catch (error) {
        ElMessage({
          type: "info",
          message: "Delete discarded",
        });
        console.log(error);
      }
    };
    const getgroups = async () => {
      try {
        loading.value = true;
        store.dispatch("groups/setGroups").then((response) => {
          loading.value = false;
          getGroupSummary.value = response.response.totalItems;
          groups.value = response.response.groupResonseDTO.map((i) => {
            return {
              dateCreated: i.dateCreated,
              description: i.description,
              name: i.name,
              id: i.id,
              tenantID: i.tenantID,
              peopleInGroupsCount: i.peopleInGroupsCount,
              children: i.children,
            };
          });
        });
      } catch (error) {
        (loading.value = false), console.log(error.response);
      }
    };
    if (!groups.value || groups.value.length === 0) getgroups();

    const searchIsVisible = ref(false);
    const toggleSearch = () => {
      searchIsVisible.value = !searchIsVisible.value;
    };

    let searchText = ref("");
    const searchGroup = computed(() => {
      if (searchText.value !== "" && groups.value.length > 0) {
        return groups.value.filter((i) => {
          if (i.name)
            return i.name.toLowerCase().includes(searchText.value.toLowerCase());
        });
      } else {
        return groups.value;
      }
    });
    const searchGroupInDB = () => {
      if (searchText.value !== "" && groups.value.length > 0) {
        return groups.value.filter((i) => {
          if (i.name)
            return i.name.toLowerCase().includes(searchText.value.toLowerCase());
        });
      } else {
        return groups.value;
      }
    };
    const removeSearchText = () => {
      searchText.value = "";
    };
    const clearInput = () => {
      searchIsVisible.value = !searchIsVisible.value;
    };

    const sendGroupSms = (group) => {
      showSMS.value = true;
      if (group.id) {
        groupListDetails.value = [{ data: `group_${group.id}` }];
      }
    };
    const sendGroupEmail = (group) => {
      showEmail.value = true;
      if (group.id) {
        groupListDetails.value = [{ data: `group_${group.id}` }];
      }
    };
    const groupClick = (id) => {
      if (route && route.query && route.query.actionType == "sendsms") {
        let group = {
          id: id,
        };
        sendGroupSms(group);
      } else if (route && route.query && route.query.actionType == "sendemail") {
        let group = {
          id: id,
        };
        sendGroupEmail(group);
      } else {
        router.push(`/tenant/createpeoplegroup/${id}`);
      }
    };

    watchEffect(() => {
      serverItemsLength.value = getGroupSummary.value;
    });

    watch(
      serverOptions,
      () => {
        getGroupByPage();
      },
      { deep: true }
    );

    return {
      groupClick,
      getGroupSummary,
      getGroupByPage,
      serverItemsLength,
      paginatedTableLoading,
      handleCurrentChange,
      handleSizeChange,
      searchGroupInDB,
      serverOptions,
      mdAndUp,
      lgAndUp,
      xlAndUp,
      clearInput,
      showSMS,
      showEmail,
      groups,
      sendGroupSms,
      sendGroupEmail,
      groupListDetails,
      loading,
      displayConfirmModal,
      confirmDelete,
      searchIsVisible,
      searchText,
      toggleSearch,
      searchGroup,
      removeSearchText,
      route,
      router,
      primarycolor,
      groupHeaders,
    };
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.row-bg-color {
  background-color: #f1f3f9;
  border-radius: 30px 30px 0 0;
}

.grey-rounded-border2 {
  border: 1px solid #dde2e6 !important;
  box-shadow: 0 3px 6px rgba(44, 40, 40, 0.10980392156862745);
  border-radius: 30px;
  text-align: center;
  width: 100%;
}

.events {
  font: normal normal 800 29px Nunito sans;
}

.yu {
  margin-top: 5rem !important;
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

@media screen and (max-width: 600px) {
  .table-container {
    overflow: auto;
  }
}
@media screen and (min-width: 580px) {
  .hidden-header {
    display: none;
  }
}

@media screen and (max-width: 581px) {
  .main-header {
    display: none;
  }

  .yu {
    margin-top: 3rem !important;
  }

  .f-right {
    float: right;
  }
}

/* tosin working */
.myselectContr {
  height: 2.5rem;
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
  /* box-shadow: 0px 3px 6px #2c28281c; */
  padding: 24px 10px;
  background: #fff;
  box-shadow: 0px 3px 6px #2c28281c;
  border: 1px solid #00204424;
}

.table {
  width: 100% !important;
  /* box-shadow: 0px 1px 4px #02172e45;
  border: 1px solid #dde2e6;
  border-radius: 30px; */
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
  display: flex;
  justify-content: flex-end;
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
  background: #fafafa 0% 0% no-repeat padding-box;
  /* border: 1px solid #C5D9F2; */
  border-radius: 5px;
  letter-spacing: 0px;
  color: #1c252c;
  padding: 4px;
  font-weight: bold;
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

.fa-ellipsis-v {
  padding: 10px;
}

.board.members-count {
  padding: 24px;
}

.no-record {
  color: rgba(184, 5, 5, 0.726);
  font-size: 1.1em;
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
    justify-content: center;
  }
}

@media screen and (min-width: 501px) and (max-width: 768px) {
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
  font-size: 11px;
  font-weight: 700;
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

/* .desc {
  color: #9b9a9c;
} */

.hover:hover {
  background: #eee;
}

li {
  list-style-type: none;
}

li li:hover {
  /* border: 2px solid red; */
  background: rgba(224, 223, 223, 0.46);
}

.node-height {
  height: 0px;
  overflow: hidden;
  /* transition: all .5s ease-in-out; */
}

.node-height-open {
  height: 100%;
  overflow: hidden;
  /* transition: all .5s ease-in-out; */
}

.roll-icon {
  transform: rotate(-90deg);
  /* transition: all .5s ease-in-out; */
}
</style>
