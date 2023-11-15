<template>
  <div>
    <Header headerName="Contact List" />
    <div class="">
      <el-main id="main">
        <div class="d-flex justify-content-end">
          <router-link to="/tenant/addgroup">
            <el-button :color="primarycolor" size="large" class="">
              Create contact group
            </el-button>
          </router-link>
        </div>
        <div class="row mt-5">
          <div class="col-md-12">
            <div class="table-options bg-white" v-if="markedContact.length > 0">
              <el-icon class="text-danger c-pointer" @click="showConfirmModal1">
                <Delete />
              </el-icon>
            </div>
            <Table
              :data="groups"
              :headers="contactListHeaders"
              :checkMultipleItem="true"
              @checkedrow="handleSelectionChange"
              v-loading="loading"
            >
              <template #name="{ item }">
                <span>
                  <router-link
                    class="font-weight-600 table-link"
                    :to="{
                      name: 'EditContactList',
                      params: { groupId: item.id },
                    }"
                    >{{ item.name }}</router-link
                  >
                </span>
              </template>
              <template #numbers="{ item }">
                <span class="small-text">{{ item.numbers }}</span>
              </template>
              <template #dateEntered="{ item }">
                <span class="small-text">{{ formatDate(item.dateEntered) }}</span>
              </template>
              <template v-slot:action="{ item }">
                <span @click="showConfirmModal(item.id)">
                  <el-icon class="text-danger c-pointer">
                    <Delete />
                  </el-icon>
                </span>
              </template>
            </Table>
          </div>
        </div>
      </el-main>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, inject } from "vue";
import axios from "@/gateway/backendapi";
import dateFormatter from "../../services/dates/dateformatter";
import finish from "../../services/progressbar/progress";
import { ElMessage, ElMessageBox } from "element-plus";
import Table from "@/components/table/Table";
import Header from "@/components/header/Header.vue";

export default {
  components: {
    Table,
    Header,
  },
  setup() {
    const primarycolor = inject("primarycolor");
    const groups = ref([]);
    const loading = ref(false);
    const contactListHeaders = ref([
      { name: "NAME", value: "name" },
      { name: "TOTAL NUMBERS", value: "numbers" },
      { name: "DATE CREATED", value: "dateEntered" },
      { name: "ACTION", value: "action" },
    ]);

    const getGroups = async () => {
      try {
        loading.value = true;
        const res = await axios.get("/api/Messaging/getPhoneGroups");
        finish();
        loading.value = false;
        groups.value = res.data;
      } catch (error) {
        finish();
        console.log(error);
      }
    };

    const deletePhoneGroup = async (id) => {
      try {
        await axios.delete(`/api/Messaging/DeletePhoneGroup?phoneGroupIdList=${id}`);
        groups.value = groups.value.filter((i) => i.id !== id);
        ElMessage({
          type: "success",
          message: "Phone group deleted",
          duration: 5000,
        });
      } catch (err) {
        finish();
        console.log(err);
        if (err.toString().toLowerCase().includes("network error")) {
          ElMessage({
            type: "error",
            message: "Network error, please ensure you have a strong internet",
            duration: 5000,
          });
        } else if (err.toString().toLowerCase().includes("timeout")) {
          ElMessage({
            type: "warning",
            message: "Response took too long to respond",
            duration: 5000,
          });
        }
      }
    };

    const showConfirmModal = (id) => {
      ElMessageBox.confirm(
        "This delete action cannot be reversed. do you want to continue?",
        "Confirm delete",
        {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "error",
        }
      )
        .then(() => {
          deletePhoneGroup(id);
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "Delete canceled",
          });
        });
    };

    const formatDate = (date) => {
      return dateFormatter.monthDayYear(date);
    };

    onMounted(() => {
      getGroups();
    });

    // Function to delete contact groups
    const remy = (v) => {
      return v.map((i) => i.id).join(",");
    };
    const deleteContactList = () => {
      let rem = remy(markedContact.value);
      axios
        .delete(`/api/Messaging/DeletePhoneGroup?PhoneGroupIdList=${rem}`)
        .then(() => {
          groups.value = groups.value.filter((item) => {
            const w = markedContact.value.findIndex((i) => i.id === item.id);
            if (w >= 0) return false;
            return true;
          });
          markedContact.value = [];
          ElMessage({
            type: "success",
            message: "Phone group deleted",
            duration: 5000,
          });
        })
        .catch((err) => {
          ElMessage({
            type: "error",
            message: "Phone group delete failed, please try again",
            duration: 5000,
          });
          console.log(err);
        });
    };

    // code to mark single contact in group
    const markedContact = ref([]);

    const showConfirmModal1 = () => {
      ElMessageBox.confirm(
        "This delete action cannot be reversed. do you want to continue?",
        "Confirm delete",
        {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "error",
        }
      )
        .then(() => {
          deleteContactList();
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "Delete canceled",
          });
        });
    };

    const handleSelectionChange = (val) => {
      markedContact.value = val;
    };

    return {
      groups,
      loading,
      deletePhoneGroup,
      showConfirmModal,
      formatDate,
      markedContact,
      deleteContactList,
      showConfirmModal1,
      contactListHeaders,
      handleSelectionChange,
      primarycolor,
    };
  },
};
</script>

<style scoped>
.table-box {
  border: 1px solid #4762f01f;
}

.table-options {
  border: 1px solid rgb(212, 221, 227);
  border-bottom: none;
  padding: 7px 7px 0 7px;
}

.search-div {
  width: fit-content;
  padding: 10px;
  background: #f5f8f9;
  border-radius: 200px;
}

#groupName:focus {
  border: none;
}

.inputWithDisable {
  /* background-color: rgba(252, 252, 252, 0.932); */
  border: none;
  outline: transparent;
}

.inputWithDisable:disabled {
  background: transparent;
}

h1,
h3,
h4 {
  font-family: "Nunito Sans";
  color: var(--font-color);
}

h1 {
  font-size: 24px;
  font-weight: bold;
}

h3 {
  font-size: 16px;
  font-weight: bold;
}

h4 {
  font-size: 16px;
}

.hr {
  color: #708eb15c;
}

.addContent {
  border: 1px solid #02172e30;
  border-radius: 5px;
  height: 40px;
}

.menu-item-con {
  color: #002044;
  opacity: 0.5;
}

.menu-item-con.active {
  background: rgba(19, 106, 205, 0.05);
  border-left: 2px solid #136acd;
  opacity: 1;
}

.buy-btn {
  background: rgb(112, 142, 177, 0.33);
  border-radius: 22px;
}

.btn-text {
  opacity: 1;
  font-size: 11px;
  font-weight: 700;
}

.timestamp {
  font-size: 14px;
  color: #333333;
  opacity: 0.5;
}

.create-btn {
  background: #ebeff4;
  border-radius: 21px;
  padding: 4px 18px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  text-decoration: none;
}

.link {
  text-decoration: none;
  color: #136acd !important;
}

.amazingG {
  width: 50%;
  margin-top: 0.5rem;
}

.amazingE {
  padding: 0;
  width: 50%;
  margin-left: 1rem;
  /* display: flex; */
  justify-content: flex-end;
}

.spanArea1 {
  position: relative;
  margin-top: 1rem;
  display: flex;
}

.spanArea2 {
  position: absolute;
  top: 0;
  right: -13.5rem;
}

.spanArea {
  width: 40%;
  position: absolute;
}

.addIconarea {
  padding: 0;
}

.basebtns {
  margin: 2.5rem auto;
  width: 40%;
}

#groupName {
  margin-left: 1rem;
}

.hidden-header {
  display: none;
}

@media screen and (max-width: 767px) {
  .hidden-header {
    display: inline-block;
    font-size: 12px;
  }

  .header-row {
    display: none;
  }

  /* #menu-items {
    flex-direction: row !important;
  }

  .search-div {
    width: 100%;
  }

  .units-div {
    width: 100%;
  }

  .units-container {
    margin-left: 0;
    margin: auto;
  } */
}

/* } */
</style>
