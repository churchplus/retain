<template>
  <el-dropdown class="w-100" trigger="click">
        <span class="el-dropdown-link w-100">
          <el-input 
          type="text"
          :class="{ 'phone-input': stylesidebarinput }"
          v-model="userSearchString"
          @input="searchForUsers"
          ref="searchRef"
          placeholder="Search from members"
          autocomplete="off"
          />
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-icon class="is-loading" v-if="loading && userSearchString.length >= 3">
              <Loading />
            </el-icon>
            <el-dropdown-item v-for="(member, index) in members" :key="index" @click="selectMember(member)">{{ member.name }} - {{ member.phone }}</el-dropdown-item>
            <el-dropdown-item v-if="userSearchString.length < 3" disabled>Enter 3 or more characters</el-dropdown-item>
            <el-dropdown-item @click="() => (display = true)" divided><el-icon><CirclePlus /></el-icon>Add new member</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
  <!-- <div class="dropdown">
    <div
      class="input-group mb-3"
      id="dropdownMenuButton"
      data-toggle="dropdown"
    >
      <input
        type="text"
        class="form-control"
        :class="{ 'phone-input': stylesidebarinput }"
        v-model="userSearchString"
        @input="searchForUsers"
        ref="searchRef"
        placeholder="Search from members"
        autocomplete="off"
      />
      <div class="input-group-append c-pointer">
        <span class="input-group-text"><i class="pi pi-chevron-down"></i></span>
      </div>
    </div>
    <div
      class="dropdown-menu w-100 dropdown-height"
      aria-labelledby="dropdownMenuButton"
    >
      <i
        class="pl-1 m-0 pi pi-spin pi-spinner"
        v-if="loading && userSearchString.length >= 3"
      ></i>
      <a
        class="dropdown-item c-pointer"
        v-for="(member, index) in members"
        :key="index"
        @click="selectMember(member)"
        >{{ member.name }} - {{ member.phone }}</a
      >
      <p class="pl-1 bg-secondary m-0" v-if="userSearchString.length < 3">
        Enter 3 or more characters
      </p>

      <a
        class="
          dropdown-item
          font-weight-bold
          small-text
          d-flex
          justify-content-center
          py-2
          text-decoration-none
          primary-text
          c-pointer
        "
        style="border-top: 1px solid rgb(0, 32, 68); color: rgb(19, 106, 205)"
        @click="() => (display = true)"
        >Add new member</a
      >
    </div>
  </div> -->
  <Dialog
    header="Create New Member"
    v-model:visible="display"
    :style="{ width: '70vw', maxWidth: '600px' }"
    :modal="true"
    position="top"
  >
    <div class="row">
      <div class="col-md-12">
        <NewPerson
          @cancel="() => (display = false)"
          @person-id="getPersonId($event)"
        />
      </div>
    </div>
  </Dialog>
</template>

<script>
import { ref, watchEffect } from "vue";
import axios from "@/gateway/backendapi";
import NewPerson from "./NewDonor.vue";
import Dialog from "primevue/dialog";
export default {
  emits: ["memberdetail", "resetclearpersonvalue"],
  props: ["currentMember", "stylesidebarinput", "reportBranchID", "clearPersonValue"],
  components: {
    NewPerson,
    Dialog,
  },
  setup(props, { emit }) {
    const userSearchString = ref("");
    const searchRef = ref("");
    const members = ref([]);
    const loading = ref(false);
    const display = ref(false);
    console.log(props.reportBranchID, 'llllll');

    const searchForUsers = async () => {
      loading.value = true;
      if (props.reportBranchID) {
        let reportBranchId = props.reportBranchID
        if (userSearchString.value.length >= 3) {
        try {
          const { data } = await axios.get(
            `/api/BranchNetwork/GetSearchedUSers?searchText=${userSearchString.value}&BranchdId=${reportBranchId}`
          );
          members.value = data;
          loading.value = false;
        } catch (error) {
          console.log(error);
          loading.value = false;
        }
      } else if (userSearchString.value === "") {
        members.value = new Array();
      }
      } else {
        if (userSearchString.value.length >= 3) {
        try {
          const { data } = await axios.get(
            `/api/Membership/GetSearchedUSers?searchText=${userSearchString.value}`
          );
          members.value = data;
          loading.value = false;
        } catch (error) {
          console.log(error);
          loading.value = false;
        }
      } else if (userSearchString.value === "") {
        members.value = new Array();
      }
      }
    };

    const selectMember = (member) => {
      userSearchString.value = member.name;
      emit("memberdetail", member);
    };

    watchEffect(() => {
      if (
        props.currentMember &&
        Object.keys(props.currentMember).length > 0 &&
        Object.keys(props.currentMember).find((i) => i == "id") &&
        props.currentMember.id !== "00000000-0000-0000-0000-000000000000"
      ) {
        userSearchString.value = props.currentMember.name
          ? props.currentMember.name
          : `${
              props.currentMember.firstName ? props.currentMember.firstName : ""
            } ${
              props.currentMember.lastName ? props.currentMember.lastName : ""
            }`;
      }

      if (props.clearPersonValue) {
        userSearchString.value = "";
        emit("resetclearpersonvalue", false);
      }
    });

    const getPersonId = ({
      personEmail,
      personFirstName,
      personLastName,
      personId,
      personNumber,
    }) => {
      const formatPayload = {
        email: personEmail ? personEmail : "",
        id: personId,
        name: `${personFirstName ? personFirstName : ""} ${
          personLastName ? personLastName : ""
        }`,
        nameResult: `${personFirstName ? personFirstName : ""} ${
          personLastName ? personLastName : ""
        } - ${personNumber ? personNumber : ""}`,
        phone: personNumber ? personNumber : "",
      };
      userSearchString.value = formatPayload.name;
      emit("memberdetail", formatPayload);
    };

    return {
      userSearchString,
      selectMember,
      members,
      searchRef,
      searchForUsers,
      loading,
      getPersonId,
      display,
    };
  },
};
</script>

<style scoped>
.contact {
  background: transparent;
  border: 0;
  border-bottom: 1px solid #cbd6e2;
  border-radius: 0;
}

.dropdown-height {
  max-height: 200px;
  overflow: scroll;
}

/* .phone-input {
  background: transparent;
  border: 0;
  border-bottom: 1px solid #cbd6e2;
  border-radius: 0;
} */
</style>