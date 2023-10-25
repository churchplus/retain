<template>
  <div class="container-fluid container-top">
    <div class="row">
      <div class="col-12 my-2 head-text">Archived People</div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="table-top p-3 mt-5">
      <div class="d-flex flex-column flex-sm-row justify-content-sm-between">
        <div>
          <!-- <el-tooltip
            class="box-item"
            effect="dark"
            v-if="marked.length > 0"
            content="Add to group"
            placement="top-start"
          >
            <el-icon
              class="ml-2 c-pointer"
              :size="20"
              @click="addToGroupSingle = true"
            >
              <User />
            </el-icon>
          </el-tooltip> -->
          <el-tooltip
            class="box-item"
            effect="dark"
            v-if="marked.length > 0"
            content="Unarchive member(s)"
            placement="top-start"
          >
            <el-icon
              class="c-pointer"
              :size="20"
              @click="displayPositionArchive = true"
              v-if="marked.length > 0"
            >
              <DocumentAdd />
            </el-icon>

            
          </el-tooltip>
          <!-- <el-tooltip
            class="box-item"
            effect="dark"
            v-if="marked.length > 0"
            content="Delete member(s)"
            placement="top-start"
          >
            <el-icon
              :size="20"
              class="ml-2 c-pointer"
              v-if="marked.length > 0"
              @click="showConfirmModal1"
            >
              <Delete />
            </el-icon>
          </el-tooltip> -->
        </div>
        <div class="d-flex flex-column flex-sm-row justify-content-sm-end">
          
          <el-input
            size="small"
            v-model="searchText"
            placeholder="Search..."
            @keyup.enter.prevent="searchArchiveInDB"
            class="input-with-select"
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
              <el-button @click.prevent="searchArchiveInDB">
                <el-icon :size="13">
                  <Search />
                </el-icon>
              </el-button>
            </template>
          </el-input>
        </div>
        
      </div>
    </div>
        <Table
          :data="searchArchive"
          :headers="archivedHeaders"
          :checkMultipleItem="true"
          @checkedrow="handleSelectionChange"
          v-loading="paginatedTableLoading"
          v-if="searchArchive.length > 0"
        >
          <template v-slot:name="{ item }">
            <div class="c-pointer">
              {{ item.firstName }} {{ item.lastName }}
            </div>
          </template>
          <template v-slot:phoneNumber="{ item }">
            <div class="c-pointer">
              {{ item.mobilePhone }}
            </div>
          </template>
          <template v-slot:email="{ item }">
            <div class="c-pointer">
              {{ item.email }}
            </div>
          </template>
          <template v-slot:homeAddress="{ item }">
            <div class="c-pointer">
              {{ item.homeAddress }}
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
                    <div
                      class="text-color"
                      @click="showConfirmModall(item.id, index)"
                    >
                      Unarchive
                    </div>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <router-link
                      class="text-color text-decoration-none"
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
                      @click.prevent="showConfirmModal(item.id, index)"
                      class="text-color"
                    >
                      Delete
                    </div>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </template>
        </Table>
      </div>
      <el-dialog
      v-model="displayPositionArchive"
      title="Archive member(s)"
      :width="mdAndUp || lgAndUp || xlAndUp ? `50%` : `90%`"
      align-center
    >
      <p class="p-m-0">
        You are about to archive your member(s). Do you want to continue ?
      </p>
      <template #footer>
        <span class="dialog-footer">
          <el-button
            class="secondary-button"
            @click="displayPositionArchive = false"
            round
            >No</el-button
          >
          <el-button
            :color="primarycolor"
            :loading="archiveLoading"
            @click="unArchiveAll"
            round
          >
            Yes
          </el-button>
        </span>
      </template>
    </el-dialog>

      <!-- <div class="container-fluid  d-none d-md-block">
          <div class="row t-header mt-5   font-weight-bold">
            <div class="col-md-1 " ></div>
            <div class="col-2 d-none d-md-block small-text text-dark font-weight-bold" >NAME</div>
            <div class="col-2 d-none d-md-block small-text text-dark font-weight-bold" >PHONE</div>
            <div class="col-3 d-none d-md-block small-text text-dark font-weight-bold" >EMAIL</div>
            <div class="col-3 d-none d-md-block small-text text-dark font-weight-bold" >HOME ADDRESS</div>
            <div class="col-1 d-none d-md-block small-text text-dark font-weight-bold" >ACTION</div>
          </div>
        </div> -->
      <!-- <div class="container-fluid">
        <div class="row">
          <div
            class="col-12 py-2 tr-border-bottom hover c-pointer"
            v-for="(archived, index) in archivedMember"
            :key="index"
          >
            <div class="row w-100" style="margin: 0">
              <div class="col-md-1 d-flex d-md-block justify-content-end"></div>
              <div class="desc-head col-md-2">
                <div class="d-flex justify-content-between">
                  <span
                    class="text-dark font-weight-bold d-flex d-md-none fontIncrease"
                  >
                    Name</span
                  >
                  <div>
                    <div
                      class="desc small-text font-weight-bold text-right itemroute-color text-md-left"
                    >
                      {{ archived.firstName }} {{ archived.lastName }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="desc-head col-md-2">
                <div class="d-flex justify-content-between">
                  <span
                    class="text-dark font-weight-bold d-flex d-md-none fontIncrease"
                  >
                    PHONE</span
                  >
                  <div>
                    <div
                      class="desc small-text font-weight-bold text-right text-md-left itemroute-color"
                    >
                      {{ archived.mobilePhone }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="desc-head col-md-3">
                <div class="d-flex justify-content-between">
                  <span
                    class="text-dark font-weight-bold d-flex d-md-none fontIncrease"
                  >
                    Email</span
                  >
                  <div>
                    <div
                      class="desc small-text font-weight-bold text-right itemroute-color text-md-left"
                    >
                      {{ archived.email }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="desc-head col-md-3">
                <div class="d-flex justify-content-between">
                  <span
                    class="text-dark font-weight-bold d-flex d-md-none fontIncrease"
                  >
                    Home Address</span
                  >
                  <div>
                    <div
                      class="desc small-text font-weight-bold itemroute-color text-right text-md-left"
                    >
                      {{ archived.homeAddress }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-1">
                <div class="dropdown">
                  <span class="d-flex justify-content-between">
                    <span class="d-md-none d-sm-flex"></span>
                    <span class="d-sm-flex small ml-2">
                      <i
                        class="fas fa-ellipsis-v cursor-pointer ml-3 fontIncrease"
                        id="dropdownMenuButton"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      ></i>
                      <div
                        class="dropdown-menu"
                        aria-labelledby="dropdownMenuButton"
                      >
                        <a
                          class="dropdown-item cursor-pointer elipsis-items"
                          @click="showConfirmModall(archived.id, index)"
                        >
                          Unarchive
                        </a>
                        <div class="dropdown-item cursor-pointer elipsis-items">
                          <router-link
                            class="text-dark text-decoration-none"
                            :to="{
                              name: 'AddPerson',
                              params: { personId: archived.id },
                            }"
                          >
                            Edit
                          </router-link>
                      
                        </div>
                        <a
                          class="dropdown-item elipsis-items text-color cursor-pointer"
                          @click.prevent="showConfirmModal(archived.id, index)"
                          >Delete</a
                        >
                      </div>
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div> -->
      <!-- <div class="col-12">
        <div class="table-footer">
          <Pagination
              @getcontent="getPeopleByPage"
              :itemsCount="50"
              :currentPage="currentPage"
     
            />
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import { ref, inject, computed } from "vue";
import axios from "@/gateway/backendapi";
import store from "../../store/store";
import Table from "@/components/table/Table";
import deviceBreakpoint from "../../mixins/deviceBreakpoint";
import { ElMessage, ElMessageBox } from "element-plus";
// import { useRoute } from "vue-router";
export default {
  components: {
    Table,
  },
  setup() {
    // const ArchivedMember = ref([]);
    const archivedMember = ref([]);
    const churchMembers = ref([]);
    const searchText = ref("");
    const unarchiveMembers = ref([]);
    const membershipSummary = ref([]);
    const marked = ref([]);
    const paginatedTableLoading = ref(false);
    const displayPositionArchive = ref(false);
    const { mdAndUp, lgAndUp, xlAndUp, xsOnly } = deviceBreakpoint();
    const primarycolor = inject("primarycolor");
    const archiveLoading = ref(false);
    const archivedHeaders = ref([
      { name: "NAME", value: "name" },
      { name: "PHONE", value: "phoneNumber" },
      { name: "EMAIL", value: "email" },
      { name: "HOME ADDRESS", value: "homeAddress" },
      { name: "ACTION", value: "action" },
    ]);

    // const handleSelectionChange = (val) => {
    //   checkedFirstTimer.value = val
    // };

    const handleSelectionChange = (val) => {
      console.log(val, 'jjjjj');
      marked.value = val
      // marked.value = val.map((i) => {
      //   i.mobilePhone =
      //     i.mobilePhone && i.mobilePhone.substring(0, 1) == "0"
      //       ? `+${tenantCountry.value.phoneCode}${i.mobilePhone.substring(1)}`
      //       : `${i.mobilePhone}`;
      //   return i;
      // });
    };

    const getArchivedPeople = () => {
      paginatedTableLoading.value = true;
      axios
        .get("/api/People/archivedmembers")
        .then((res) => {
          archivedMember.value = res.data;
          paginatedTableLoading.value = false;
          console.log(res.data, "🎄🎄🎄");
        })
        .catch((err) => {
          paginatedTableLoading.value = false;
          console.log(err);
        });
    };
    getArchivedPeople();

    const searchArchive = computed(() => {
      if (searchText.value !== "" && archivedMember.value.length > 0) {
        return archivedMember.value.filter((i) => {
          if (i.firstName)
            return i.firstName
              .toLowerCase()
              .includes(searchText.value.toLowerCase());
        });
      } else {
        return archivedMember.value;
      }
    });

    const searchArchiveInDB = () => {
      if (searchText.value !== "" && archivedMember.value.length > 0) {
        return archivedMember.value.filter((i) => {
          if (i.firstName)
            return i.firstName
              .toLowerCase()
              .includes(searchText.value.toLowerCase());
        });
      } else {
        return archivedMember.value;
      }
    };

    const unArchiveAll = async () => {
      archiveLoading.value = true;
      let archiveBody = marked.value.map((i) => i.id);
      try {
        const { data } = await axios.post("api/People/unarchiveall", archiveBody);
        archiveLoading.value = false;
        displayPositionArchive.value = false;
        if (data) {
          archivedMember.value = archivedMember.value.filter((item) => {
            let y = marked.value.findIndex((j) => j.id == item.id);
            if (y >= 0) return false;
            return true;
          });
          ElMessage({
            message: "Members Unarchived succesfully",
            type: "success",
            duration: 7000,
          });
        }
      } catch (err) {
        archiveLoading.value = false;
        displayPositionArchive.value = false;
        console.log(err);
      }
    };

    const showConfirmModall = (id, index) => {
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
          unarchiveMember(id, index);
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "Delete canceled",
            duration: 5000,
          });
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
          deleteMember(id, index);
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "Delete canceled",
            duration: 5000,
          });
        });
    };

    const deleteMember = (id) => {
      axios
        .delete(`/api/People/DeleteOnePerson/${id}`)
        .then((res) => {
          console.log(res);
          archivedMember.value = archivedMember.value.filter(
            (item) => item.id !== id
          );
          if (res.data.response.includes("@")) {
            let disRes = res.data.response.split("@");
            ElMessage({
              type: "info",
              message: disRes[0],
              duration: 5000,
            });
          } else {
            ElMessage({
              type: "success",
              message: "Member Deleted",
              duration: 5000,
            });
          }
          store.dispatch("membership/removeMember", id);
          store.dispatch("membership/setMembershipSummary").then((response) => {
            membershipSummary.value = response;
          });
        })
        .catch((err) => {
          stopProgressBar();
          ElMessage({
            type: "error",
            message: "Deleting member failed",
            duration: 5000,
          });
          console.log(err);
        });
    };
    const unarchiveMember = (id) => {
      axios
        .post(`/api/People/unarchive/${id}`)
        .then((res) => {
          console.log(res);
          archivedMember.value = archivedMember.value.filter(
            (item) => item.id !== id
          );
          ElMessage({
            type: "success",
            message: "Member Unarchive",
            duration: 5000,
          });
        })
        .catch((err) => {
          stopProgressBar();
          ElMessage({
            type: "error",
            message: "Delete Error",
            duration: 5000,
          });
          console.log(err);
        });
    };

    return {
      showConfirmModall,
      unarchiveMembers,
      paginatedTableLoading,
      displayPositionArchive,
      archiveLoading,
      archivedHeaders,
      searchArchiveInDB,
      searchArchive,
      unarchiveMember,
      deleteMember,
      churchMembers,
      showConfirmModal,
      mdAndUp, 
      lgAndUp, 
      xlAndUp, 
      xsOnly,
      unArchiveAll,
      primarycolor,
      archivedMember,
      membershipSummary,
      searchText,
      marked,
      handleSelectionChange,
      // ArchivedMember,
    };
  },
};
</script>

<style scoped>
.t-header {
  background: #dde2e6 0% 0% no-repeat padding-box;
  font-size: 16px;
  padding: 0.5rem 0;
}
.table-header {
  background: #f1f3f9 !important;
  color: #8898aa !important;
  font-size: 11px !important;
  text-align: left !important;
  /* box-shadow: 0px 3px 6px #2c28281c!important; */
}

.heading-text {
  font: normal normal 800 1.5rem Nunito sans;
}

.itemroute-color {
  color: #136acd;
  cursor: pointer;
}
.table-top {
  font-weight: 800;
  font-size: 12px;
  background: #fff;
  border: 1px solid #d4dde3;
  border-bottom: none;
}

.table-top label:hover,
.table-top p:hover {
  cursor: pointer;
}
.hover:hover {
  background: #eee;
}
</style>
