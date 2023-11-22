<template>
  <div class=" row w-100  text-dark " style="margin: 0">
    <div class="col-md-12 desc">
      <p class="">
        <span class="text-dark font-weight-bold d-flex d-md-none fontIncrease" style="font-size: 15px">Group Name</span>
      <ul class="p-0 w-100">
        <li v-for="(group, index) in items" :key="index" class="p-2  c-pointer parent-li border-top exempt-hide">
          <div class="row exempt-hide justify-content-between">
            <div class="text-primary exempt-hide">
              <span>
                <i class="pi pi-chevron-down roll-icon exempt-hide ml-4"
                  v-if="group.children && group.children.length > 0" @click="toggleItems(group, $event)"></i>
              </span>
              <span class="text-primary exempt-hide" @click="groupClick(group, $event)">
                <span class="p-3 exempt-hide">{{ group.name }}</span>
              </span>
            </div>

            <div class="col-3 text-primary" @click="groupClick(group.id)">
              <div @click="groupClick(group.id)">
                <div class="d-flex small justify-content-between text-primary">
                  <span class="text-dark font-weight-bold d-flex d-md-none fontIncrease" style="font-size:15px">Membership
                    Size</span>
                  <div class="small-text text-right text-md-center">
                    {{ group.peopleInGroupsCount }}
                  </div>
                </div>
              </div>
            </div>
            <div class=" d-flex justify-content-end">
              <div>
                <div class="dropdown">
                  <span class="d-flex justify-content-between">


                    <i class="
                                  fas
                                  fa-ellipsis-v
                                  cursor-pointer
                                  ml-2
                                  fontIncrease
                                " id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
                      aria-expanded="false"></i>

                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                      <a class="dropdown-item">
                        <a @click="sendGroupSms(group)">Send SMS</a>
                      </a>
                      <a class="dropdown-item" @click="sendGroupEmail(group)">
                        Send Email
                      </a>
                      <a class="dropdown-item" @click="confirmRemove(group.id, index)">Remove</a>
                      <a class="dropdown-item" @click="confirmDelete(group.id, index)">Delete</a>
                    </div>

                  </span>
                </div>
              </div>

            </div>
          </div>
          <div class="d-none" @click="checkForGroup(group, $event)">
            <GroupTree :items="group.children" v-if="group.children" :class="{ 'd-none': !showCheckBox }" />
          </div>
        </li>
        <li class="shadow-sm text-center border p-2 font-weight-700 c-pointer" @click="openCreateGroupModal"
          v-if="onDropDown">
          <i class="pi pi-plus-circle"></i>&nbsp;Add new group
        </li>
      </ul>
      </p>
    </div>
  </div>

  <Dialog header="Create group" v-model:visible="displayCreateGroup" style="width: 450px" :breakpoints="{ '960px': '75vw' }"
    :modal="true">
    <div class="row">
      <div class="col-12">
        <div class="mb-1">Group name<sup class="text-danger">*</sup></div>
        <input class="form-control" v-model="newGroup.name" required />
      </div>
      <div class="col-12 mt-4">
        <div class="mb-1">Description</div>
        <textarea class="form-control" rows="4" v-model="newGroup.description"></textarea>
      </div>
    </div>


    <template #footer>
      <div class="d-flex justify-content-end mt-3">
        <el-button class="text-center c-pointer" @click="displayCreateGroup = false" round>Cancel</el-button>
        <el-button class=" text-white primary-bg text-center c-pointer" @click="createGroup" round><el-icon
            v-if="createGroupLoading" :size="20">
            <Loading />
          </el-icon>Create group </el-button>
      </div>
    </template>

  </Dialog>
  <el-drawer v-model="showSMS" :size="mdAndUp || lgAndUp || xlAndUp ? '70%' : '100%'" direction="rtl">
    <template #default>
      <div>
        <smsComponent :groupData="groupListDetails" @closesidemodal="() => showSMS = false" />
      </div>
    </template>
  </el-drawer>

  <el-drawer v-model="showEmail" :size="mdAndUp || lgAndUp || xlAndUp ? '70%' : '100%'" direction="rtl">
    <template #default>
      <div>
        <emailComponent :groupData="groupListDetails" @closesidemodal="() => showEmail = false" />
      </div>
    </template>
  </el-drawer>
</template>

<script>
import Dialog from "primevue/dialog";
import { ref } from "@vue/reactivity";
import axios from "@/gateway/backendapi";
import { watchEffect } from "@vue/runtime-core";
import { useStore } from "vuex";
import { onBeforeRouteLeave } from "vue-router";
import smsComponent from "../component/smsComponent.vue";
import emailComponent from "../component/emailComponent.vue";
import groupsService from "../../../services/groups/groupsservice";
import deviceBreakpoint from "../../../mixins/deviceBreakpoint";
import { ElMessage, ElMessageBox } from "element-plus";
import { useRoute } from "vue-router"
export default {
  name: "GroupTree",
  props: ["items", "addGroupValue", "showCheckBox"],
  emits: ["group", "groupp", "closemodal", "removesubgroup"],
  inheritAttrs: false,
  components: {
    Dialog,
    smsComponent,
    emailComponent,
  },
  setup(props, { emit }) {
    const store = useStore();
    const { mdAndUp, lgAndUp, xlAndUp } = deviceBreakpoint();
    const displayCreateGroup = ref(false);
    const newGroup = ref({});
    const onDropDown = ref(false);
    const createGroupLoading = ref(false);
    const showSMS = ref(false);
    const showEmail = ref(false);
    const groupListDetails = ref([]);
    const route = useRoute()

    const toggleItems = (i, e) => {
      e.target.classList.toggle("roll-icon");
      if (
        e.target.parentElement.parentElement.parentElement.nextElementSibling.classList.contains(
          "d-none"
        )
      ) {
        e.target.parentElement.parentElement.parentElement.nextElementSibling.classList.replace(
          "d-none",
          "d-block"
        );
      } else {
        e.target.parentElement.parentElement.parentElement.nextElementSibling.classList.replace(
          "d-block",
          "d-none"
        );
      }
    };

    const groupClick = (group, e) => {
      store.dispatch("groups/setSelectedTreeGroupList", group);
      store.dispatch("groups/setSelectedTreeGroup", group);
      emit("group", { selectedGroup: group, iconElement: e.target });
    };

    watchEffect(() => {
      if (props.addGroupValue) {
        onDropDown.value = true;
      }
    });

    const checkForGroup = (group, e) => {
      let grouped = group.children.find((i) => i.name == e.target.textContent);
      emit("group", { selectedGroup: grouped, iconElement: e.target });
    };

    const openCreateGroupModal = () => {
      displayCreateGroup.value = true;
      emit("closemodal");
    };

    const createGroup = async () => {
      createGroupLoading.value = true;
      try {
        await axios.post("/api/CreateGroup", newGroup.value);
        createGroupLoading.value = false;
        ElMessage({
          type: "success",
          message: "Group created successfully",
          duration: 5000,
        });
        displayCreateGroup.value = false;
      } catch (err) {
        createGroupLoading.value = false;
        console.log(err);
      }
    };

    onBeforeRouteLeave(() => {
      store.dispatch("groups/setSelectedTreeGroupList", {});
      store.dispatch("groups/setSelectedTreeGroup", {});
    });

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

    const confirmDelete = (id) => {
      ElMessageBox.confirm(
        "Your are about to delete this group, are you sure you want to proceed?",
        "Confirm delete",
        {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "error",
        }
      )
        .then(() => {
          try {
            groupsService.deleteGroup(id).then((res) => {
              if (res !== false) {
                emit('removesubgroup', id)
                ElMessage({
                  type: "success",
                  message: "Group was deleted",
                  duration: 5000,
                });
              }
            });
          } catch (error) {
            ElMessage({
              type: "info",
              message: "Delete discarded",
            });
            console.log(error);
          }
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "Rejected",
            duration: 5000,
          });
        });
      };
      const confirmRemove = (id) => {
        ElMessageBox.confirm(
          "You are about to remove this sub-group from this group, are you sure you want to proceed?",
          "Confirm removal",
          {
            confirmButtonText: "OK",
            cancelButtonText: "Cancel",
            type: "warning",
          }
          )
          .then(() => {
            try {
              groupsService.removeGroup({ superGroupID: route.params.groupId, subGroupID: id }).then((res) => {
                console.log(res)
                emit('removesubgroup', id)
                ElMessage({
                  type: "success",
                  message: "Sub-group was removed successfully",
                  duration: 5000,
                });
            });
          } catch (error) {
            ElMessage({
              type: "info",
              message: "Removal unsuccessful",
            });
            console.log(error);
          }
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "Removal discarded",
            duration: 5000,
          });
        });
    };

    return {
      toggleItems,
      mdAndUp,
      lgAndUp,
      xlAndUp,
      groupClick,
      checkForGroup,
      openCreateGroupModal,
      displayCreateGroup,
      newGroup,
      createGroup,
      onDropDown,
      createGroupLoading,
      sendGroupSms,
      sendGroupEmail,
      showSMS,
      showEmail,
      groupListDetails,
      confirmDelete,
      confirmRemove
    };
  },
};
</script>

<style scoped>
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

.fa-ellipsis-v:hover {
  cursor: pointer;
}

.fa-ellipsis-v {
  padding: 10px;
}
</style>