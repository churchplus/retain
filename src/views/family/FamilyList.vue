<template>
  <div class="col-12">
    <div class="row">
      <div class="col-12 px-0">
        <div class="top-con">
          <div class="">
            <div class="table-top p-3 mt-5">
              <div class="col-md-5 justify-content-flex-end">
                <el-input
                  size="small"
                  v-model="searchText"
                  placeholder="Search..."
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
        </div>

        <Table
          :data="searchFamily"
          :headers="familyHeaders"
          :checkMultipleItem="false"
          v-if="searchFamily.length > 0"
        >
          <template v-slot:date="{ item }">
            <div class="c-pointer">
              {{ formatDate(item.dateCreated) }}
            </div>
          </template>
          <template v-slot:familyName="{ item }">
            <div class="c-pointer">
              {{ item.familyName }}
            </div>
          </template>

          <template v-slot:email="{ item }">
            <div class="c-pointer">
              {{ item.email }}
            </div>
          </template>

          <template v-slot:phone="{ item }">
            <div class="c-pointer">
              {{ item.homePhone }}
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
                      :to="{
                        name: 'AddFamily',
                        params: {
                          familyId: item.fatherID
                            ? item.fatherID
                            : item.motherID,
                        },
                      }"
                    >
                      <div class="text-decoration-none text-color">Edit</div>
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

        <div class="col-12">
          <div class="table-footer"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import dateFormatter from "../../services/dates/dateformatter";
import axios from "@/gateway/backendapi";
import finish from "../../services/progressbar/progress";
import router from "../../router";
import { ElMessage, ElMessageBox } from "element-plus";
import store from "../../store/store";
import Table from "@/components/table/Table";

export default {
  props: ["familyList"],
  components: {
    Table,
  },
  setup(props, { emit }) {
    const searchText = ref("");
    const formatDate = (date) => {
      return dateFormatter.monthDayYear(date);
    };

    const searchFamily = computed(() => {
      if (props.familyList.length === 0 && searchText.value === "")
        return props.familyList;
      return props.familyList.filter((i) =>
        i.familyName.toLowerCase().includes(searchText.value.toLowerCase())
      );
    });

    const searchGroupInDB = () => {
      if (searchText.value !== "" && props.familyList.length > 0) {
        return props.familyList.filter((i) => {
          i.familyName.toLowerCase().includes(searchText.value.toLowerCase());
        });
      } else {
        return props.familyList.value;
      }
    };

    const deleteFamily = (id) => {
      axios
        .delete(`/api/Family/deleteFamily?id=${id}`)
        .then((res) => {
          console.log(res);

          ElMessage({
            type: "success",
            message: "Family Deleted",
            duration: 3000
          });
          let listFiltered = props.familyList.filter((i) => i.id !== id);
          emit("list-filtered", listFiltered);
           store.dispatch('family/removeFamilyFromStore', id)
        })
        .catch((err) => {
          console.log(err);
          finish();
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
          deleteFamily(id);
          
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "Delete canceled",
          });
        });
    };
    const familyHeaders = ref([
      { name: "DATE", value: "date" },
      { name: "FAMILY NAME", value: "familyName" },
      { name: "EMAIL", value: "email" },
      { name: "PHONE", value: "phone" },
      { name: "ACTION", value: "action" },
    ]);

    const moveToEdit = (id) => {
      router.push({ name: "AddFamily", params: { familyId: id } });
    };

    return {
      formatDate,
      searchFamily,
      searchText,
      // toggleSearch,
      showConfirmModal,
      deleteFamily,
      moveToEdit,
      familyHeaders,
      searchGroupInDB,
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
  justify-content: flex-end;
  display: flex;
}
.table-top label:hover,
.table-top p:hover {
  cursor: pointer;
}

.parent-desc.first {
  color: #8898aa;
  font-size: 14px;
  font-weight: 600;
  box-shadow: 0px 3px 6px #2c28281c;
  background: #dde2e6 0% 0% no-repeat padding-box;
}

.tr-border-bottom {
  border-bottom: 1px solid #4762f01f;
}

.fa-ellipsis-v {
  padding: 10px;
}
</style>