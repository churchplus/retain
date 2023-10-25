<template>
  <div class="container ward-table-wrapper">
    <div class="row my-3">
      <div class="col-md-10 mx-auto d-flex justify-content-end">
        <!-- <button
          class="default-btn font-weight-bold border primary-text add-ward-btn c-pointer"
          ref="showModal"
          data-toggle="modal"
          data-target="#addWard"
          @click="addNewWard"
        >
          Add ward
        </button> -->
        <el-button
          size="large"
          @click="addNewWard"
          data-toggle="modal"
           data-target="#addWard"
          class=" font-weight-bold  primary-text "
          round
        >
          Add Ward
        </el-button>
      </div>
    </div>

    <div class="row th py-2" v-if="familyMembers.length > 0">
      <div class="col-md-1">
        <!-- <span class="py-2 font-weight-700">Picture</span> -->
      </div>
      <div class="col-6">
        <span class="py-2 font-weight-700">Name</span>
      </div>
      <div class="col-4">
        <span class="py-2 font-weight-700">Role</span>
      </div>
      <div class="col-md-1">
        <!-- <span class="py-2 font-weight-700">Role</span> -->
      </div>
    </div>
    <div v-else class="text-center border-top py-4 increase-font">
      When you add wards, they will show up here
    </div>

    <div class="row py-2" v-for="(member, index) in familyMembers" :key="index">
      <div class="col-md-1">
        <!-- <span class="py-2">
                    <img :src="member.pictureUrl" v-if="member.person.pictureUrl" class="member-image"/>
                </span> -->
      </div>
      <div class="col-6 align-self-center">
        <span class="py-2">{{ member.name ? member.name : "" }}</span>
      </div>
      <div class="col-3 align-self-center">
        <!-- <span class="py-2">{{ memberRoles.length > 0 ? memberRoles.find(i => i.id === member.familyRoleID).name : "" }}</span> -->
        <!-- <Dropdown class="p-0 w-100" :options="memberRoles" v-model="member.roleId" optionLabel="name" :filter="false" placeholder="Select role" :showClear="false">
                </Dropdown> -->
        {{ member.roleId ? member.roleId.name : "" }}
      </div>
      <div
        class="col-1 align-self-center"
        data-toggle="modal"
        data-target="#addWard"
        @click="editMember(member, index)"
      >
        <!-- <i class="pi pi-pencil text-primary c-pointer"></i> -->
        <el-icon class="text-primary"><EditPen /></el-icon>
      </div>
      <div
        class="col-1 align-self-center"
        @click="showConfirmModal(member.id, index)"
      >
        <!-- <i class="pi pi-trash text-danger c-pointer"></i> -->
        <el-icon class="text-danger"><Delete /></el-icon>
      </div>
    </div>
  </div>
  <!-- <ConfirmDialog /> -->
  <!-- <Toast /> -->
</template>

<script>
import { ref } from "vue";
import { watch } from "@vue/runtime-core";
import axios from "@/gateway/backendapi";
// import { useConfirm } from "primevue/useconfirm";
import { ElMessage, ElMessageBox } from "element-plus";

import { useToast } from "primevue/usetoast";

export default {
  props: ["familyMembers", "memberRoles", "showWardModal"],
  setup(props, { emit }) {
    const showModal = ref("");
    // const confirm = useConfirm();
    const toast = useToast();

    const editMember = (member, index) => {
      console.log(member);
      emit("edit-member", member);
      emit("member-index", index);
    };

    const addNewWard = () => {
      emit("clear-field", { name: "", roleId: new Object() });
    };

    watch(() => {
    //   console.log(props.showWardModal);
    //   console.log("what happen");
      if (props.showWardModal) {
        showModal.value.click();
      }
    });

    const deleteMember = async (id, index) => {
      console.log(id);
      if (id) {
        try {
          const res = await axios.delete(
            `/api/Family/removeAFamilyMember?id=${id}`
          );
          console.log(res);
        //   toast.add({
        //     severity: "success",
        //     summary: "Deleted",
        //     detail: "Deleted Successfully",
        //     life: 3000,
        //   });
         ElMessage({
          type: "success",
          message: "Delete Sucessfully",
          duration: 3000
        });

          emit("remove-ward", index);
          console.log(index);
        } catch (error) {
          console.log(error);
        }
      } else {
        // familyDetails.value.familyMembers.splice(index, 1)
        // toast.add({
        //         severity: "success",
        //         summary: "Deleted",
        //         detail: "Deleted Successfully",
        //         life: 3000,
        //     });
        ElMessage({
          type: "success",
          message: "Delete Sucessfully",
          duration: 3000
        });
      }
    };

    // const showConfirmModal = (id, index) => {
    //     confirm.require({
    //         message: "Are you sure you want to proceed?",
    //         header: "Confirmation",
    //         icon: "pi pi-exclamation-triangle",
    //         acceptClass: "confirm-delete",
    //         rejectClass: "cancel-delete",
    //         accept: () => {
    //         deleteMember(id, index);
    //         },
    //         reject: () => {
    //         toast.add({
    //             severity: "info",
    //             summary: "Discarded",
    //             detail: "Delete discarded",
    //             life: 3000,
    //         });
    //         },
    //     });
    //     };

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
          });
        });
    };
    return {
      editMember,
      addNewWard,
      showModal,
      deleteMember,
      showConfirmModal,
    };
  },
};
</script>

<style  scoped>
.th {
  background: #dde2e6 0% 0% no-repeat padding-box;
}

.ward-table-wrapper {
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 1px solid #dde2e6;
  border-radius: 30px;
  opacity: 1;
}

.add-ward-btn {
  border: 1px solid #2e67ce !important;
}

.member-image {
  height: 60px;
  width: 60px;
  border-radius: 50%;
}

.increase-font {
  font-size: 1.1em;
}
</style>