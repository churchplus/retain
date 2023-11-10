<template>
  <div>
    <div class="container-fluid">
      <h1 class="">Default Message</h1>
      <div class="add-container2">
        <h2 class="" style="font-weight: bold">Add Default Message</h2>
        <hr />
        <div class="container-form">
          <div class="row g-3 align-items-center">
            <div class="text-left text-sm-right col-12 col-sm-3">
              <label for="inputPassword6" class="col-form-label"
                >Category:</label
              >
            </div>
            <div class=" col-12  col-sm-9">
              <el-select-v2
                  v-model="selectCategoryID"
                  @change="setSelectCategory"
                  :options="Membership.map((i) =>({label: i.name , value: i.value }))"
                  placeholder="Select category"
                  class="w-100"
                  size="large"
                  style="width: 100%; text-align: left"
                />
            </div>
          </div>
          <div class="row g-3 align-items-center">
            <div class="text-left text-sm-right col-12 col-sm-3">
              <label for="inputPassword6" class="col-form-label">Type:</label>
            </div>
            <div class=" col-12  col-sm-9">
              <el-select-v2
                  v-model="selectTypeID"
                  @change="setSelectType"
                  :options="Sms.map((i) =>({label: i.name , value: i.value }))"
                  placeholder="Select type"
                  class="w-100"
                  size="large"
                  style="width: 100%; text-align: left"
                />
            </div>
          </div>
          <div class="row g-3 align-items-center">
            <div class="  text-left text-sm-right col-12 col-sm-3">
              <label for="inputPassword6" class="col-form-label"
                >Subject:</label
              >
            </div>
            <div class=" col-12  col-sm-9">
              
              <el-dropdown trigger="click" class="w-100" v-if="selectType.value === 0">
                <el-input v-model="subject" placeholder="Search sender id" />
                <el-icon class="el-icon--right"><arrow-down /></el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item v-for="(item, index) in searchSenderIDs" :key="index" @click="setIdToSubject(item)">
                  {{ item.mask }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <div v-else-if="selectType.value == 2">
            <!-- action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" -->
            <el-upload
              class="uploadvoice w-100"
              :on-change="chooseVoiceFile"
              accept="audio/*" 
              :auto-upload="false"
            >
              <el-button class="w-100" type="info" plain>Click to upload</el-button>
              <template #tip>
                <div class="el-upload__tip">
                  upload your audio file
                </div>
              </template>
            </el-upload>
            <audio controls ref="audioPlayer" class="mt-2" style="width: 100%; display: none">
              <source src="" type="audio/mpeg">
              Your browser does not support the audio element.
            </audio>

          </div>
          <el-input v-model="subject" type="text" class="" id="inputPassword6" v-else />
            </div>
          </div>
          <div class="row g-3 align-items-center" v-if="selectType.value !== 2">
            <div class="text-left text-sm-right col-12 col-sm-3">
              <label for="inputPassword6" class="col-form-label"
                >Message:</label
              >
            </div>
            <div class="col-12  col-sm-9">
              <el-input
                v-model="message"
                :rows="2"
                type="textarea"
                placeholder=""
                style="border-radius: 5px; width: 100%"
              />
            </div>
          </div>
          <div class="row align-items-center justify-content-center justify-content-sm-end">
              <router-link to="/tenant/settings/defaultmessage" class="no-decoration"
                >
                <el-button class="secondary-button" round size="large" >Discard</el-button>
                </router-link
              >
              <el-button :color="primarycolor" class="ml-2" :loading="loading" size="large" @click="callButton" round>Save</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import messageOptions from "../../services/defaultmessage/default_message_service";
import { ElMessage } from "element-plus";
import axios from "@/gateway/backendapi";

export default {
  inject: ['primarycolor'],
  data() {
    return {
      message: "",
      subject: "",
      file: null,
      selectCategory: {},
      selectCategoryID: null,
      loading: false,
      Membership: messageOptions.Membership,
      selectType: {},
      selectTypeID: null,
      Sms: messageOptions.Sms,
      defaultMessage: {},
      searchSenderText: "",
      senderIDs: [],
      selectedSender: {},
    };
  },
  methods: {
    setSelectType(){
      this.selectType = this.Sms.find((i) =>{
        return i.value === this.selectTypeID
      })
    },
    setSelectCategory(){
      this.selectCategory = this.Membership.find((i) =>{
        return i.value === this.selectCategoryID
      })
    },
    callButton () {
      this.loading = true
      if (!this.$route.query.messageId) {
        this.createDefaultMessage();
      } else {
        this.updateDefaultMessage();
      }
    },
    createDefaultMessage() {
      this.loading = true
      if (
        // this.subject === "" ||
        // this.message === "" ||
        // (this.selectType.value !== 2 && Object.keys(this.selectType).length === 0) ||
        // (this.selectType.value !== 2 && Object.keys(this.selectCategory).length === 0)
        (this.selectType.value !== 2 && this.subject == "") ||
        (this.selectType.value !== 2 && this.message == "") ||
        (Object.keys(this.selectCategory).length === 0) ||
        (Object.keys(this.selectType).length === 0)
      ) 
      {
        ElMessage({
          type: "error",
          message: "Kindly fill in all fields before saving",
          duration: 8000
        });
        return false;
      }

      const formData = new FormData();
      formData.append("category", this.selectCategory.value);
      formData.append("messageType", this.selectType.value);
      formData.append("subject", this.selectType.value !== 2 ? this.subject : "");
      formData.append("message", this.selectType.value !== 2 ? this.message : "");
      formData.append("voiceFile", this.file);
      axios
        .post(`/api/Settings/CreateDefaultMessage`, formData)
        .then((res) => {
          console.log(res);
          ElMessage({
            type: "success",
            message: "Default Message Created succesfully",
            duration: 5000
          });
          this.loading = false
          this.$router.push("/tenant/settings/defaultmessage");
        })
        .catch((error) => {
          ElMessage({
            type: "error",
            message: "Failed",
            duration: 5000
          });
          console.log(error);
          this.loading = false
        });
    },
    async updateDefaultMessage() {
      this.loading = true
      const formData = new FormData();
      formData.append("id", this.defaultMessage.returnObject.id);
      formData.append("category", this.selectCategory.value);
      formData.append("messageType", this.selectType.value);
      formData.append("subject", this.selectType.value !== 2 ? this.subject : "");
      formData.append("message", this.selectType.value !== 2 ? this.message : "");
      formData.append("voiceFile", this.file);

      axios
        .put(`/api/Settings/UpdateDefaultMessage`, formData)
        .then((res) => {
          console.log(res);
          this.$router.push("/tenant/settings/defaultmessage");
          this.loading = false
        })
        .catch((error) => {
          console.log(error);
          this.loading = false
        });
    },
    async getDefaultMessage() {
      if (this.$route.query.messageId) {
        try {
          const { data } = await axios.get(
            `/api/Settings/GetDefaultMessage/${this.$route.query.messageId}`
          );
          this.defaultMessage = data;
          this.message = data.returnObject.message;
          // this.searchSenderText = data.returnObject.subject;
          this.subject = data.returnObject.subject;
          this.selectCategory = this.Membership.find(
            (i) => i.value === data.returnObject.category
          );
         this.selectCategoryID = this.selectCategory.value
          this.selectType = this.Sms.find(
            (i) => i.value === data.returnObject.messageType
          );
          this.selectTypeID = this.selectType.value

          setTimeout(() => {
            // Display voice audio if available
          const audioPlayer = this.$refs.audioPlayer
              audioPlayer.src = data.returnObject.voiceUrl;
              audioPlayer.style.display = "block";
          }, 1000);
        } catch (error) {
          console.log(error);
        }
      }
    },
    async getSenderId () {
      try {
        let { data } = await axios.get(
          `/api/Messaging/RetrieveTenantSenderIDs`
        );
        this.senderIDs = data.returnObject;
      } catch (err) {
        console.log(err);
      }
    },
    setIdToSubject (item) {
      this.searchSenderText = item.mask;
      this.subject = item.mask
      this.selectedSender = item;
    },
    chooseVoiceFile (e) {
      const audioPlayer = this.$refs.audioPlayer
      this.file = e.raw;
        const reader = new FileReader();
        reader.addEventListener("load", function() {
          audioPlayer.src = reader.result;
          audioPlayer.style.display = "block";
        });

        if (this.file) {
          reader.readAsDataURL(this.file);
        }
    }
  },
  created() {
    this.getDefaultMessage();
    this.getSenderId();
  },
  computed: {
    searchSenderIDs () {
      if (!this.subject) return this.senderIDs;
      return this.senderIDs.filter((i) => {
        return i.mask
          .toLowerCase()
          .includes(this.subject.toLowerCase());
      });
    }
  }
};
</script>

<style scoped>
.pagination {
  padding: 10px;
}
* {
  box-sizing: border-box;
}
.container {
  width: 90%;
}
.container h1 {
  font-size: 34px;
  margin-top: 18px;
  text-align: left;
  margin-bottom: 40px;
  font-weight: bolder;
  letter-spacing: 0px;
  color: #02172e;
  opacity: 1;
}
.container-form {
  width: 90%;
  height: auto;
  margin: auto;
}
.add-container2 {
  border-style: solid;
  border-width: 1px;
  border-color: rgb(212, 210, 210);
  border-radius: 10px;
  margin-top: 60px;
}
.add-container2 h2 {
  font-size: 24px;
  padding: 20px 1px 1px 35px;
  text-align: left;
}

.row {
  margin: auto;
  margin-bottom: 20px;
}
.button-add button {
  width: 80px;
}
.col-auto {
  text-align: right;
}
.btn-outline-secondary:hover {
  background-color: white;
  color: rgb(110, 104, 104);
}
@media screen and (max-width: 992px) {
  .container {
    width: 100%;
  }
  .body {
    background-color: blue;
  }
  .container-form {
    width: 100%;
  }
}
@media screen and (max-width: 375px) {
  .container {
    width: 100%;
  }
  .container-form {
    width: 100%;
  }
  .row {
    width: 90% !important;
    margin: auto;
    margin-bottom: 20px;
  }
}
@media screen and (max-width: 320px) {
  .container {
    width: 100%;
  }

  @media screen and (max-width: 375px) {
    .mobileResp {
      float: left;
    }
  }

  .container h1 {
    font-size: 25px;
    margin-top: 18px;
    text-align: left;
    margin-bottom: 40px;
    font-weight: bolder;
    letter-spacing: 0px;
    color: #02172e;
    opacity: 1;
  }
  .add-container2 h2 {
    font-size: 20px;
    padding: 20px 1px 1px 35px;
    text-align: left;
  }
  .container-form {
    width: 100%;
  }
  .row {
    width: 100% !important;
    margin-bottom: 20px;
    font-size: 13px;
  }
  .saveButton {
    margin-left: 3px !important;
  }
  .row textarea {
    border-color: rgb(119, 119, 119);
  }
}
</style>