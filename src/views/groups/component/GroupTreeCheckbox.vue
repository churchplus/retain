<template>
  <div
    class=" row w-100  text-dark "
    style="margin: 0"
    
  >
    <!-- class="d-block -->

    <div class="col-md-12 desc">
      <p class="">
        <span
          class="text-dark font-weight-bold d-flex d-md-none fontIncrease"
          style="font-size: 15px"
          >Group Name</span
          
        >
        <ul class="p-0 w-100">
        <li v-for="(group, index) in items" :key="index" class="p-2  c-pointer parent-li border-top exempt-hide">
          <div class="row exempt-hide">
            <div class="text-primary exempt-hide">
              <span>
                <Checkbox id="binary" v-model="group.displayCheck" :binary="true" class="exempt-hide all-check" @change="getCheckedGroup(group)" /> 
                <i class="pi pi-chevron-down roll-icon exempt-hide ml-4" v-if="group.children && group.children.length > 0"  @click="toggleItems(group, $event)"></i>
              </span>
            </div>
            <div class="text-primary exempt-hide">
              <span class="p-3 exempt-hide">{{ group.name }}</span>
            </div>
            <!-- <div class="col-3 text-primary" @click="groupClick(group.id)">
              <div @click="groupClick(group.id)">
                <div class="d-flex small justify-content-between text-primary">
                  <span class="text-dark font-weight-bold d-flex d-md-none fontIncrease" style="font-size:15px">Membership Size</span>
                    <div class="small-text text-right text-md-center">
                      {{ group.peopleInGroupsCount }}
                    </div>
                </div>
              </div>
            </div> -->
            <!-- <div class="col-2">
        
                      <div>
                        <div class="dropdown">
                          <span class="d-flex justify-content-between">
                            <span class="d-md-none d-sm-flex"></span>
                            <span class="d-sm-flex small">
                              <i
                                class="
                                  fas
                                  fa-ellipsis-v
                                  cursor-pointer
                                  ml-2
                                  fontIncrease
                                "
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              ></i>

                              <div
                                class="dropdown-menu"
                                aria-labelledby="dropdownMenuButton"
                              >
                                <a class="dropdown-item">
                                  <a
                                    @click="sendGroupSms(group)"
                                    >Send SMS</a>
                                </a>
                                <a class="dropdown-item" @click="sendGroupEmail(group)">
                                    Send Email
                                </a>
                                <a
                                  class="dropdown-item"
                                  @click="confirmDelete(group.id, index)"
                                  >Delete</a
                                >
                              </div>
                            </span>
                          </span>
                        </div>
                      </div>
                 
            </div> -->
          </div>
            <div class="d-none"  @click="checkForGroup(group, $event)">
            <GroupTree
                :items="group.children"
                v-if="group.children"
              /> 
            </div>                   
        </li>
        <li class="shadow-sm text-center border p-2 font-weight-700 c-pointer" @click="openCreateGroupModal" v-if="onDropDown">
          <i class="pi pi-plus-circle"></i>&nbsp;Add new group
        </li>
        </ul>
      </p>
    </div>
  </div>

  <Dialog header="Create group" v-model:visible="displayCreateGroup"  style="width: 450px" :breakpoints="{'960px': '75vw'}" :modal="true">
      <div class="row">
        <div class="col-12">
          <div>Group name</div>
          <input class="form-control" v-model="newGroup.name" />
        </div>
        <div class="col-12 mt-4">
          <div>Description</div>
          <textarea class="form-control" rows="4" v-model="newGroup.description"></textarea>
        </div>
      </div>
      <template #footer>
          <div class="d-flex justify-content-end">
            <div class="default-btn text-center c-pointer" @click="displayCreateGroup = false">Cancel</div>
            <div class="ml-3 default-btn border-0 text-white primary-bg text-center c-pointer" @click="createGroup">Create group</div>
          </div>
      </template>
  </Dialog>
  <Toast />
</template>

<script>
import Dialog from "primevue/dialog";
import { ref } from "@vue/reactivity";
import { useToast } from "primevue/usetoast";
import axios from "@/gateway/backendapi";
import { watchEffect } from "@vue/runtime-core";
import { useStore } from "vuex";
export default {
  name: "GroupTree",
  props: ["items", "addGroupValue", "allChecked", "checked", "autoCheck"],
  emits: ["group", "groupp", "setcheckval", "resetchecked", "newgroup"],
  components: {
    Dialog,
  },
  setup(props, { emit }) {
    const store = useStore();
    const displayCreateGroup = ref(false);
    const newGroup = ref({});
    const toast = useToast();
    const onDropDown = ref(false);
    const multipleGroupsSelected = ref([]);
    const markedItems = ref([]);

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

    watchEffect(() => {
      if (props.addGroupValue) {
        onDropDown.value = true;
      }
    });

    const checkForGroup = (group, e) => {
      let grouped = group.children.find((i) => i.name == e.target.textContent);
      // emit("group", grouped);
      emit("group", { selectedGroup: grouped, iconElement: e.target });
    };

    const openCreateGroupModal = () => {
      displayCreateGroup.value = true;
    };

    const createGroup = async () => {
      try {
        let { data } = await axios.post("/api/CreateGroup", newGroup.value);
        toast.add({
          severity: "success",
          summary: "Success",
          detail: "Group created successfully",
          life: 4000,
        });
        displayCreateGroup.value = false;
        console.log(data);
        emit("newgroup", data)
      } catch (err) {
        console.log(err);
      }
    };

    const getCheckedGroup = (item) => {
      const groupData = item;
      const getIndex = multipleGroupsSelected.value.findIndex(
        (j) => j.id === item.id
      );
      if (getIndex < 0) {
        multipleGroupsSelected.value.push(groupData);
      }
      if (props.autoCheck) {
        checkChildren(groupData, multipleGroupsSelected.value);
      }
      store.dispatch(
        "groups/setCheckedGroupChildren",
        multipleGroupsSelected.value
      );
      markedItems.value = props.items.filter((i) => i.displayCheck);
    };

    const checkChildren = (item, destArray) => {
      if (item && item.children && item.children.length > 0) {
        item.children.forEach((i) => {
          i.displayCheck = !i.displayCheck;
          if (item.displayCheck) {
            i.displayCheck = true;
            const getIndex = destArray.findIndex((j) => j.id === i.id);
            if (getIndex < 0) {
              destArray.push(i);
              console.log(destArray);
            }
          }
          if (!item.displayCheck) {
            i.displayCheck = false;
          }
          if (i.children && i.children.length > 0) {
            checkChildren(i, destArray);
          }
        });
      }
    };

    const checkAll = () => {
      props.items.forEach((i) => {
        if (props.allChecked) {
          i.displayCheck = true;
        } else {
          i.displayCheck = false;
        }
        getCheckedGroup(i);
      });
      markedItems.value = props.items.filter((i) => i.displayCheck);
    };

    watchEffect(() => {
      if (props.items.length !== markedItems.value.length) {
        emit("setcheckval", false);
      } else {
        emit("setcheckval", true);
      }

      if (props.checked) {
        checkAll();
        emit("resetchecked", false);
      }
    });

    return {
      toggleItems,
      checkForGroup,
      openCreateGroupModal,
      displayCreateGroup,
      newGroup,
      createGroup,
      onDropDown,
      getCheckedGroup,
      multipleGroupsSelected,
      checkAll,
      markedItems,
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
</style>