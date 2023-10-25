<template>
  <div>
    <div class="container">
      <!-- Content Box -->
      <main id="main" class="mt-3">
        <div class="container-fluid px-0">
          <div class="row px-0">
            <div class="col-md-12 px-0">
              <div class="row d-md-flex align-items-center mt-3 mb-4">
                <div class="col-md-8 col-sm-12">
                  <div class="search-div">
                    <el-icon style="vertical-align: middle" class="search-sms mr-1">
                      <Search />
                    </el-icon>
                    <input type="text" placeholder="Search here..." v-model="searchDrafts" class="w-100 pl-4" />
                  </div>
                </div>
                <div class="col-sm-5 col-md-4 mt-sm-2 units-container">
                  <UnitsArea />
                </div>
              </div>

              <div class="table-options" v-if="markedDraft.length > 0">
                <el-icon class="text-danger c-pointer" @click="showConfirmModal">
                  <Delete />
                </el-icon>
              </div>
              <Table :data="searchDraftMessage" :headers="DraftHeaders" :checkMultipleItem="true"
                @checkedrow="handleSelectionChange" v-loading="loading">
                <template #body="{ item }">
                  <div>
                    <router-link class="font-weight-600 no-decoration primary--text" :to="{
                      name: 'SendMessage',
                      query: { draftId: item.id },
                    }">{{ item.body.length > 50 ? `${item.body.slice(0, 50)}...` : item.body }}</router-link>
                  </div>
                </template>
                <template #dateModified="{ item }">
                  <div class="small-text">
                    {{ formatDate(item.dateModified) }}
                  </div>
                </template>
                <template v-slot:action="{ item }">
                  <div>
                    <span class="small-text">
                      <el-icon class="text-danger c-pointer" @click="showConfirmModal(item)">
                        <Delete />
                      </el-icon>
                    </span>
                  </div>
                </template>
              </Table>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import UnitsArea from "../../components/units/UnitsArea";
import axios from "@/gateway/backendapi";
import communicationService from "../../services/communication/communicationservice";
import store from "../../store/store";
import stopProgressBar from "../../services/progressbar/progress";
import Loading from "../../components/loading/LoadingComponent"
import { ElMessage, ElMessageBox } from 'element-plus'
import dateFormatter from "../../services/dates/dateformatter";
import Table from "@/components/table/Table"

export default {
  components: { UnitsArea, Loading, Table },

  setup() {
    const loading = ref(true);
    const searchDrafts = ref("");
    const drafts = ref([]);
    const DraftHeaders = ref([
      { name: 'MESSAGE', value: 'body' },
      { name: 'DATE', value: 'dateModified' },
      { name: 'ACTION', value: 'action' },
    ])

    const getDrafts = async () => {
      try {
        const data = await communicationService.getDrafts();
        loading.value = false;
        if (data) {
          drafts.value = data;
        }
      } catch (error) {
        console.log(error);
      }
    };

    drafts.value = store.getters["communication/smsDrafts"];
    if (!drafts.value || drafts.value.length === 0) {
      getDrafts();
    } else {
      loading.value = false;
    }

    const searchDraftMessage = computed(() => {
      if (searchDrafts.value === "" && drafts.value.length > 0) {
        return drafts.value;
      }
      return drafts.value.filter((i) =>
        i.body.toLowerCase().includes(searchDrafts.value.toLowerCase())
      );
    });

    // Function to delete messages
    const handler = (f) => {
      return f.map((i) => i.id).join(",");
    };

    const deleteDraft = (draft) => {
      let holder = handler(markedDraft.value);
      let url = "";

      if (!draft || !draft.id) url = `/api/Messaging/DeleteSmsDraft?SMSDraftIdList=${holder}`;
      if (draft && draft.id) url = `/api/Messaging/DeleteSmsDraft?SMSDraftIdList=${draft.id}`;
      axios
        .delete(url)
        .then(() => {
          if (!draft || !draft.id) {
            drafts.value = drafts.value.filter((item) => {
              const t = markedDraft.value.findIndex((i) => i.id === item.id);
              if (t >= 0) return false;
              return true;
            });
            markedDraft.value.forEach((i) => {
              store.dispatch("communication/removeSmsDrafts", i.id);
            });
          } else {
            drafts.value = drafts.value.filter(i => i.id !== draft.id);
            store.dispatch("communication/removeSmsDrafts", draft.id);
          }

          ElMessage({
            type: 'success',
            message: 'Draft deleted successfully',
            duration: 5000
          })

          markedDraft.value = [];

        })
        .catch((err) => {
          stopProgressBar();
          ElMessage({
            type: 'error',
            message: 'Draft delete failed',
            duration: 5000
          })
          console.log(err);
        });
    };

    const showConfirmModal = (id) => {
      ElMessageBox.confirm(
        'This delete action cannot be reversed. do you want to continue?',
        'Confirm delete',
        {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'error',
        }
      )
        .then(() => {
          if (!id) {
            deleteDraft()
          } else {
            deleteDraft(id)
          }
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: 'Delete canceled',
          })
        })
    };

    // code to mark single item in draft
    const markedDraft = ref([]);

    const formatDate = (date) => {
      return dateFormatter.monthDayYear(date);
    };

    const handleSelectionChange = (val) => {
      markedDraft.value = val
    }

    return {
      drafts,
      getDrafts,
      searchDraftMessage,
      searchDrafts,
      markedDraft,
      handler,
      deleteDraft,
      showConfirmModal,
      loading,
      DraftHeaders,
      formatDate,
      handleSelectionChange
    };
  },
};
</script>

<style scoped>
.search-div {
  /* width: fit-content; */
  padding: 10px;
  background: #f5f8f9;
  border-radius: 200px;
}

.search-sms {
  position: absolute;
  top: 14px;
}

.search-div input {
  background: none;
  border: none;
  outline: transparent;
}

.table-options {
  border: 1px solid rgb(212, 221, 227);
  border-bottom: none;
  padding: 7px 7px 0 7px
}

.brief-message {
  color: #4762f0;
  font-size: 14px;
}

.compose-btn {
  background: #136acd;
  box-shadow: 0px 6px 12px #708eb170;
  border-radius: 22px;
  color: #fff;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.menu-icon {
  font-size: 20px;
}

.units-div {
  border: 1px solid #dde2e6;
  border-radius: 20px;
  padding: 15px 0;
  background: #f9a9a933 !important;
}

.hidden-header {
  display: none;
}

.th {
  font-size: 12px;
  font-weight: 700;
}

.inbox-count {
  background: rgba(19, 106, 205, 0.3);
  padding: 4px 8px;
  border-radius: 22px;
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

.view-btn {
  background: #ebeff4;
  border-radius: 21px;
  padding: 4px 18px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.center-flexed {
  display: flex;
  justify-content: center;
}

.table-box {
  border: 1px solid #4762f01f;
}

@media screen and (max-width: 767px) {
  .hidden-header {
    display: inline-block;
    font-size: 12px;
  }

  .header-row {
    display: none;
  }

  #menu-items {
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
  }
}

@media screen and (max-width: 1000px) {
  .msg-n-time {
    flex-direction: column;
    margin-bottom: 8px;
  }
}

@media screen and (min-width: 1000px) {
  #menu-items {
    min-width: 100% !important;
  }
}
</style>