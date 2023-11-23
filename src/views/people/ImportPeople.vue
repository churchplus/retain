<template>
  <div class="options-container">
    <div class="header">
      <p class="header-text">You haven't added any contact yet</p>
    </div>
    <div class="options">
      <router-link class="option text-decoration-none" to="/tenant/people/add">
        <div class="option-img">
          <img src="../../assets/people/phone-import.svg" alt="Phone Import" />
        </div>
        <div class="option-desc">
          <!-- <p class="option-header">Add members</p> -->
          <p class="option-text">Stay compliant by keeping accurate records</p>
        </div>
      </router-link>

      <div class="option" @click="importMembers">
        <div class="option-img">
          <img src="../../assets/people/file-import.svg" alt="File Import" />
        </div>
        <div class="option-desc">
          <p class="option-header">Import from Excel</p>
          <p class="option-text">Choose an excel file (.xlsx/.xls/.csv) to import from</p>
        </div>
        <input type="file" ref="importFile" @change="imageSelected" hidden />
      </div>

      <!-- <div class="option">
        <div class="option-img">
          <img src="../../assets/people/file-import.svg" alt="File Import" />
        </div>
        <div class="option-desc">
          <p class="option-header">Import from Other Source</p>
          <p class="option-text">Stay compliant by keeping accurate records</p>
        </div>
      </div> -->
      <Dialog
        header="Members to import from file"
        v-model:visible="displayModal"
        :style="{ width: '80vw' }"
        :modal="true"
      >
        <div class="container">
          <div class="row">
            <div class="col-3 font-weight-700">Name</div>
            <div class="col-4 font-weight-700">Email</div>
            <div class="col-2 font-weight-700">Gender</div>
            <div class="col-2 font-weight-700">Phone Number</div>
          </div>
          <div class="row" v-for="(item, index) in memberData" :key="index">
            <div class="col-3">
              {{ item.firstName ? item.firstName : "" }}
              {{ item.lastName ? item.lastName : "" }}
            </div>
            <div class="col-4">{{ item.email }}</div>
            <div class="col-2">{{ item.gender }}</div>
            <div class="col-2">{{ item.phoneNumber }}</div>
          </div>
        </div>
        <template #footer>
          <div class="container">
            <div class="row d-flex justify-content-end text-center">
              <el-button class="secondary-button" @click="closeModal" round
                >Cancel</el-button
              >
              <el-button
                :color="primarycolor"
                :loading="loading"
                @click="addToMembers"
                round
              >
                Save
              </el-button>
            </div>
          </div>
        </template>
      </Dialog>
      <Toast />
    </div>
  </div>
</template>

<script>
import { ref, inject } from "vue";
import axios from "@/gateway/backendapi";
import Dialog from "primevue/dialog";
import finish from "../../services/progressbar/progress";
import { useToast } from "primevue/usetoast";
import router from "@/router/index";
export default {
  components: {
    Dialog,
  },
  props: [],
  setup(props, { emit }) {
    // const addPerson = (path) => router.push(path);
    const toast = useToast();
    const primarycolor = inject("primarycolor");
    const memberData = ref([]);
    const image = ref("");
    const displayModal = ref(false);
    const importFile = ref("");
    const loading = ref(false);

    // const fileUpload = () => {
    //   importFile.value.click()
    // }

    const imageSelected = async (e) => {
      image.value = e.target.files[0];
      const formData = new FormData();
      formData.append("file", image.value ? image.value : "");
      try {
        let { data } = await axios.post("/api/People/UploadFirstTimerFile", formData);
        console.log(data);
        // if (!data.response.toString().includes('0')) {
        toast.add({
          severity: "success",
          summary: "Confirmed",
          detail: data.response,
          life: 4000,
        });
        memberData.value = data.returnObject;
        displayModal.value = true;
        emit("people-list", data.returnObject);
      } catch (err) {
        finish();
        if (err.status === 404 || err.response.status === 404) {
          toast.add({
            severity: "warn",
            summary: "Upload not successful",
            detail: "Ensure that there isn't any empty row or field and try again",
            // life: 4000,
          });
        } else if (err.toString().toLowerCase().includes("network error")) {
          toast.add({
            severity: "warn",
            summary: "Network Error",
            detail: "Please ensure you have strong internet connection",
            life: 4000,
          });
        } else if (err.toString().toLowerCase().includes("timeout")) {
          toast.add({
            severity: "warn",
            summary: "Request took too long to respond",
            detail: "Please try again by refreshing the page",
            life: 3000,
          });
        }
        console.log(err);
      }
    };

    const closeModal = () => {
      displayModal.value = false;
    };

    const addToMembers = async () => {
      loading.value = true;
      try {
        let { data } = await axios.post(
          "/api/People/CreateMultipleFirstTimer",
          memberData.value
        );
        console.log(data);
        memberData.value = data.returnObject;
        displayModal.value = false;
        loading.value = false;
        if (data.returnObject.returnList.length > 0) {
          toast.add({
            severity: "info",
            summary: data.returnObject.createdRecord,
            detail: `There are ${data.returnObject.returnList} members that have been added already`,
          });
        } else {
          toast.add({
            severity: "success",
            summary: "Created Successfully",
            detail: data.createdRecord,
            life: 4000,
          });
        }
      } catch (err) {
        finish();
        loading.value = false;
        console.log(err);
        if (err.toString().toLowerCase().includes("network error")) {
          toast.add({
            severity: "warn",
            summary: "Network Error",
            detail: "Please ensure you have strong internet connection",
            life: 4000,
          });
        } else if (err.toString().toLowerCase().includes("timeout")) {
          toast.add({
            severity: "warn",
            summary: "Request took too long to respond",
            detail: "Please try again by refreshing the page",
            life: 3000,
          });
        }
        displayModal.value = false;
      }
    };

    const importMembers = () => {
      // <router-link :to="{ name: 'ImportInstruction' }">
      router.push({ name: "ImportInstruction", query: { query: "importpeople" } });
    };

    return {
      // addPerson,
      // userId,
      // fileUpload,
      imageSelected,
      memberData,
      image,
      displayModal,
      importFile,
      addToMembers,
      closeModal,
      loading,
      importMembers,
      primarycolor,
    };
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
  color: #02172e;
}

.options-container .header .header-text {
  margin-left: 10px;
  font-size: 17px;
  font-weight: 600;
}

.header {
  text-align: center;
  padding: 20px 0;
}

.options {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.option {
  min-width: 200px;
  background: green;
  padding: 20px;
  background: #ffffff;
  margin: 8px;
  font-weight: normal;
  transition: all 0.4s ease-in;
  border-radius: 10px;
  box-shadow: 0px 2px 15px #0000000f;
}

.option-header {
  font-size: 17px;
  font-weight: 600;
}

.option-text {
  font-size: 14px;
}

.option:hover {
  cursor: pointer;
  box-shadow: 0px 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.options .option .option-img {
  width: 70%;
  margin: auto;
}

.option .option-img img {
  width: 100%;
}

.options .option .option-desc {
  text-align: center;
}

@media screen and (min-width: 900px) {
  .option {
    width: 28%;
  }
}
</style>
