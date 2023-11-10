<template>
  <div>
    <div class="container-fluid px-0">
      <div class="row mb-3">
        <div class="col-md-12 px-0 first-timers-text">
          <h2 class="head-text">Branch Members</h2>
        </div>

        <!-- <div class="col-md-6 d-flex flex-row-reverse">
        <BranchSelect class="w-50" @selectedbranch="setSelectedBranch" />
      </div> -->
      </div>
      <div class="row">
        <div class="col-md-12 px-0">
          Here you can view and manage all member of your branch, select the
          branch you want to view its members from the dropdown at the top-right
          corner.
        </div>
      </div>
      <div class="row" v-if="loading && branchMembers.length == 0">
        <div class="col-md-12 d-flex justify-content-center mt-5">
          <el-icon
            :size="40"
            class="is-loading"
          >
            <Loading />
          </el-icon>
        </div>
      </div>
      <div class="row" v-if="branchMembers.length > 0">
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
              :data="searchBranchMember"
              :headers="branchMemberHeaders"
              v-loading="loading"
              :checkMultipleItem="false"
              @checkedrow="handleSelectionChange"
              v-if="searchBranchMember.length > 0"
            >
              <template #pictureUrl="{ item }">
                <el-card
                  shadow="hover"
                  class="c-pointer person-image"
                  v-if="item.pictureUrl"
                  style="border-radius: 50%; height: 26px; width: 26px"
                >
                  <el-tooltip
                    class="box-item"
                    effect="dark"
                    content="Click to view"
                    placement="top-start"
                  >
                    <el-image
                      style="border-radius: 50%; height: 26px; width: 26px"
                      :src="item.pictureUrl"
                      fit="cover"
                      :lazy="true"
                    />
                  </el-tooltip>
                </el-card>
                <el-avatar :size="25" v-else
                  ><el-icon color="#000000">
                    <UserFilled />
                  </el-icon>
                </el-avatar>
              </template>
              <template v-slot:firstname="{ item }">
                <div @click="showMemberRow(item)" class="c-pointer">
                  {{ item.firstName }}
                </div>
              </template>

              <template v-slot:lastname="{ item }">
                <div @click="showMemberRow(item)" class="c-pointer">
                  {{ item.lastName }}
                </div>
              </template>

              <template v-slot:phone="{ item }">
                <div @click="showMemberRow(item)" class="c-pointer">
                  {{ item.mobilePhone }}
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
                          class="text-color"
                          :to="{
                            name: 'AddPerson',
                            params: { personId: item.id },
                          }"
                        >
                          Edit
                        </router-link>
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <div
                          class="text-decoration-none text-color"
                          @click="showConfirmModal(item.id)"
                        >
                          Delete
                        </div>
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </template>
            </Table>
            <div
              class="d-flex justify-content-end my-3"
              v-if="searchBranchMember.length > 0"
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
import Table from "@/components/table/Table";
import store from "../../../store/store";
import axios from "@/gateway/backendapi";
import { ElMessage, ElMessageBox } from "element-plus";

export default {
  components: {
    BranchSelect,
    Table,
  },

  setup() {
    const selectedBranch = ref({});
    const branchMembers = ref([]);
    const filterFormIsVissible = ref(false);
    const searchIsVisible = ref(false);
    const searchText = ref("");
    const marked = ref([]);
    const loading = ref(false);
    const branchId = ref("");
    const totalItems = ref();
    const branchID = ref(localStorage.getItem("branchId"));
    const branchMemberHeaders = ref([
      { name: "PICTURE", value: "pictureUrl" },
      { name: "FIRSTNAME", value: "firstname" },
      { name: "LASTNAME", value: "lastname" },
      { name: "PHONE", value: "phone" },
      { name: "ACTION", value: "action" },
    ]);

    const handleSelectionChange = (val) => {
      marked.value = val;
    };

    const serverOptions = ref({
      page: 1,
      rowsPerPage: 50,
    });

     watch(serverOptions.value, () => {
      getPeopleByPage();
    },
      { deep: true }
    );

    const handleSizeChange = (val) => {
      console.log(`${val} items per page`);
    };
    const handleCurrentChange = (val) => {
      console.log(`current page: ${val}`);
    };

    const showMemberRow = (item) => {
      router.push(`/tenant/people/add/${item.id}`)
    }

    const setSelectedBranch = async (payload) => {
      loading.value = true;
      branchId.value = payload.id;
      try {
        let { data } = await axios.get(
          `/api/BranchNetwork/People?page=1&branchID=${payload.id}`
        );
        loading.value = false;
        console.log(data);
        branchMembers.value = data.data;
        totalItems.value = data.totalItems
        if (data.length === 0) {
          ElMessage({
            type: "warning",
            message: "There are no members in this branch yet.",
            duration: 5000,
          });
        }
      } catch (err) {
        loading.value = false;
        console.log(err);
      }
    };

    const getBranchList = async () => {
      loading.value = true;
      // const branchID = localStorage.getItem('branchId')
      try {
        let { data } = await axios.get(
          `/api/BranchNetwork/People?page=1&branchID=${branchID.value}`
        );
        console.log(data);
        branchMembers.value = data.data;
        totalItems.value = data.totalItems;
         loading.value = false;
        if (data.length === 0) {
          ElMessage({
            type: "warning",
            message: "There are no members in this branch yet.",
            duration: 5000,
          });
        }
      } catch (err) {
        loading.value = false;
        console.log(err);
      }
    };
    getBranchList();

    const toggleFilterFormVissibility = () =>
      (filterFormIsVissible.value = !filterFormIsVissible.value);
    const toggleSearch = () => {
      searchIsVisible.value = !searchIsVisible.value;
    };

    const searchBranchMember = computed(() => {
      if (branchMembers.value.length > 0 && !searchText.value)
        return branchMembers.value;
      return branchMembers.value.filter((i) => {
        return i.firstName
          .toLowerCase()
          .includes(searchText.value.toLowerCase());
      });
    });

    const deleteMember = (id) => {
      axios
        .delete(`/api/People/DeleteOnePerson/${id}`)
        .then((res) => {
          console.log(res);
          
          if (res.data.response.includes("@")) {
            let disRes = res.data.response.split("@");
            ElMessage({
              type: "info",
              message: disRes[0],
              duration: 5000,
            });
          } else if(res.data.response.includes('record')){

            ElMessage({
              type: "warning",
              message: res.data.response,
              duration: 5000,
            });

          } else {

            branchMembers.value = branchMembers.value.filter(
            (item) => item.id !== id
          );
            
           ElMessage({
              type: "success",
              message: "Member deleted successfully",
            });
          }
          
          store.dispatch("membership/removeMember", id);
        })
        .catch((err) => {
          ElMessage({
            type: "error",
            message: "Deleting member failed",
            duration: 5000,
          });
          console.log(err);
        });
    };

    const showConfirmModal = (id) => {
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
          deleteMember(id);
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "Delete canceled",
          });
        });
    };

    const currentPage = ref(0);
    const getPeopleByPage = async () => {
      loading.value = true
      try {
        const { data } = await axios.get(
          `/api/BranchNetwork/People?branchID=${branchID.value}&page=${serverOptions.value.page}`
        );
        if (data && data.data.length > 0) {
          branchMembers.value = data.data;
           totalItems.value = data.totalItems
        } else {
          ElMessage({
          type: 'warning',
          message: `Page ${serverOptions.value.page} cannot be found`,
          duration: 5000
        })
        }
        loading.value = false
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

    return {
      setSelectedBranch,
      showMemberRow,
      selectedBranch,
      branchMembers,
      filterFormIsVissible,
      branchMemberHeaders,
      branchID,
      handleSelectionChange,
      totalItems,
      serverOptions,
      searchIsVisible,
      toggleFilterFormVissibility,
      handleSizeChange,
      handleCurrentChange,
      toggleSearch,
      searchBranchMember,
      searchText,
      showConfirmModal,
      deleteMember,
      loading,
      branchId,
      currentPage,
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