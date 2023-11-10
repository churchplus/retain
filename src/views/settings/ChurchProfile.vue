<template>
  <el-form>
    <div class="container my-content">
      <div class="row page-header">
        <div class="col-12">
          <h3
            class="
              header-text
              font-weight-bold
              text-md-left text-lg-left text-xl-left text-sm-center text-center
            "
          >
            Church Profile
          </h3>
        </div>
      </div>

      <div class="row form-container">
        <div
          class="
            col-10
            offset-1 offset-sm-0
            col-sm-12
            text-md-left text-lg-left text-xl-left text-sm-center text-center
          "
        >
          <span class="sub-header">Church Details </span>
          <div class="row first-row">
            <div class="col-12 col-md-3 text-md-right pr-0">
              <label for="firstname" class="small-text lb lb font-weight-600"
                >Name</label
              >
            </div>
            <div class="col-12 col-md-5 form-group">
              <el-input
                type="text"
                placeholder="name()"
                class="w-100 ml-0 "
                id="firstname"
                size="large"
                v-model="churchData.churchName"
                required
              />
            </div>
            <div class="col-md-4">
              <div class="grey-bg light-grey-bg mt-0 py-2">
                <div class="person-img">
                  <img v-if="url" :src="url" alt="Uploaded Image" />
                  <img
                    v-else-if="!churchData.logoUrl"
                    src="../../assets/people/phone-import.svg"
                    alt="Uploaded Image"
                  />
                  <img v-else :src="churchData.logoUrl" alt="Uploaded Image" />
                </div>
                <div>
                  <div class="cs-input">
                    <label for="imgUpload" class="choose-file">
                      Choose file
                      <input
                        type="file"
                        class="input file-input"
                        placeholder=""
                        id="imgUpload"
                        @change="imageSelected"
                      />
                    </label>
                  </div>
                </div>
                <div></div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-12 col-md-3 text-md-right pr-0">
              <label class="small-text lb font-weight-600" for=""
                >Aka/Parish</label
              >
            </div>
            <div class="col-12 col-md-5 form-group">
              <el-input
                type="text"
                placeholder="Aka/Parish"
                v-model="churchData.aka"
                class=" w-100 ml-0"
                size="large"
              />
            </div>
            <div class="col-md-4"></div>
          </div>

          <div class="row">
            <div class="col-12 col-md-3 text-md-right pr-0">
              <label class="small-text lb font-weight-600">Address</label>
            </div>
            <div class="col-12 col-md-5 form-group">
              <el-input
                type="text"
                placeholder="Address"
                v-model="churchData.address"
                class=" w-100 ml-0"
                size="large"
              />
            </div>
            <div class="col-md-4"></div>
          </div>

          <div class="row">
            <div class="col-12 col-md-3 text-md-right pr-0">
              <label class="small-text lb font-weight-600" for=""
                >Phone number</label
              >
            </div>
            <div class="col-12 col-md-5 form-group">
              <el-input
                type="text"
                placeholder="Phone Number"
                v-model="churchData.phoneNumber"
                class="w-100 ml-0 "
                size="large"
              />
            </div>
            <div class="col-md-4"></div>
          </div>

          <div class="row">
            <div class="col-12 col-md-3 text-md-right pr-0">
              <label class="small-text lb font-weight-600" for="">Email</label>
            </div>
            <div class="col-12 col-md-5 form-group">
              <el-input
                type="text"
                placeholder="Email"
                class="w-100 ml-0 "
                disabled
                v-model="churchData.email"
                size="large"
              />
            </div>
            <div class="col-md-4"></div>
          </div>

          <div class="row select-elem">
            <div class="col-12 col-md-3 text-md-right pr-0">
              <label class="small-text lb font-weight-600">Country</label>
            </div>
            <div class="col-12 col-md-5 form-group">
                <el-select-v2
                  v-model="selectCountryID"
                  @change="setSelectedCountry"
                  :options="countries.map((i) =>({label: i.name , value: i.id }))"
                  placeholder="Select Country"
                  class="w-100"
                  size="large"
                  style="width: 100%"
                />
            </div>
            <div class="col-md-4"></div>
          </div>
          <div class="row select-elem">
            <div class="col-12 col-md-3 text-md-right pr-0">
              <label class="small-text lb font-weight-600">Time zone</label>
            </div>
            <div class="col-12 col-md-5 form-group">
              <el-select-v2
                  v-model="selectTimeID"
                  @change="setSelectTimeZone"
                  :options="timeZone.map((i) =>({label: i.name , value: i.value }))"
                  placeholder="Select time zone"
                  class="w-100"
                  size="large"
                  style="width: 100%"
                />
            </div>
            <div class="col-md-4"></div>
          </div>

          <div class="row">
            <div class="col-12 col-md-3 text-md-right pr-0">
              <label class="small-text lb font-weight-600" for=""
                >Website URL</label
              >
            </div>
            <div class="col-12 col-md-5 form-group">
              <el-input
                type="text"
                placeholder="Website URL"
                class=" ml-0 "
                v-model="churchData.websiteUrl"
                size="large"
              />
            </div>
            <div class="col-md-4"></div>
          </div>
          <div class="row">
            <div class="col-md-12 px-">
              <hr class="hr" />
            </div>
          </div>

          <!-- Event attended -->
          <div class="row">
            <div class="col-sm-12 mt-2">
              <span class="sub-header">Pastor's Detail</span>
            </div>
          </div>

          <div class="row">
            <div class="col-12 col-md-3 text-md-right pr-0">
              <label class="small-text lb font-weight-600" for="">Name</label>
            </div>
            <div class="col-12 col-md-5 form-group">
              <el-input
                type="text"
                placeholder="Name"
                v-model="churchData.headPastorName"
                class="w-100  ml-0"
                size="large"
              />
            </div>
            <div class="col-md-4"></div>
          </div>

          <div class="row">
            <div class="col-12 col-md-3 text-md-right pr-0">
              <label class="small-text lb font-weight-600" for="">Email</label>
            </div>
            <div class="col-12 col-md-5 form-group">
              <el-input
                type="text"
                placeholder="Email"
                class="w-100 ml-0 "
                v-model="churchData.headPastorEmail"
                size="large"
              />
            </div>
            <div class="col-md-4"></div>
          </div>

          <div class="row">
            <div class="col-12 col-md-3 text-md-right pr-0">
              <label class="small-text" for=""></label>
            </div>
            <div class="col-12 col-md-5 ">
              <el-button class="primary-btn font-weight-bold text-white px-4" @click.prevent="churchProfile"  :color="primarycolor" size="large" :loading="loading" round>Save</el-button>
            </div>
            <div class="col-md-4"></div>
          </div>
        </div>
      </div>
    </div>
  </el-form>
</template>

<script>
import axios from "@/gateway/backendapi";
import { ElMessage } from "element-plus";
import store from "@/store/store";
import { ref, inject } from "vue";
import router from "../../router";
import TimeZone from "@/services/user/timeZone";
export default {
  components: { },
  setup() {
    const primarycolor = inject('primarycolor')
    const churchData = ref({});
    let filterFields = ref([]);
    const loading = ref(false)
    const timeZone = ref(TimeZone.timeZones);
    const selectCountryID = ref(null)
    const selectTimeID = ref(null)
    let url = ref("");
    let a = ref("");
    let b = ref("b");
    let selectCountry = ref({});
    let selectTime = ref({});
    let image;

    const setSelectedCountry = () => {
      selectCountry.value = countries.value.find((i) => {
        return i.id === selectCountryID.value
      })
    }
    const setSelectTimeZone = () => {
      selectTime.value = timeZone.value.find((i) => {
        return i.value === selectTimeID.value
      })
    }
    const imageSelected = (e) => {
      image = e.target.files[0];
      url.value = URL.createObjectURL(image);
    };

    const uploadImage = () => {};
    let countries = ref([]);
    const currentUser = ref({});
    //Get AllCountry
    const getCountries = async () => {
      try {
        const { data } = await axios.get("/api/GetAllCountries");
        data.sort((a, b) => a.data - b.data);
        console.log(data);
        countries.value = data;
        getChurchProfile();
      } catch (error) {getChurchProfile
        console.log(error);
      }
    };
    getCountries();
    //Get AllChurchProfile
    const getChurchProfile = async () => {
      try {
        const { data } = await axios.get("/mobile/v1/Profile/GetChurchProfile");
        churchData.value = data.returnObject;
        
          selectCountry.value = countries.value.find((i) => {
            return i.id === churchData.value.countryID;
          });
          selectCountryID.value = selectCountry.value ? selectCountry.value.id : selectCountry.value

        selectTime.value = TimeZone.timeZones.find(
          (i) => i.value == churchData.value.timeZone
        );
         selectTimeID.value = selectTime.value ? selectTime.value.value : selectTime.value

        console.log(churchData.value);
      } catch (error) {
        console.log(error);
      }
    };

    const uploadData = ref({});
    const display = ref(false);
    const churchProfile = () => {
      loading.value = true
      let formData = new FormData();
      formData.append("ChurchName", churchData.value.churchName);
      formData.append("AKA", churchData.value.aka);
      formData.append("Address", churchData.value.address);
      formData.append("PhoneNumber", churchData.value.phoneNumber);
      formData.append("CountryID", selectCountry.value ? selectCountry.value.id : "" );
      formData.append("TimeZone", selectTime.value ? selectTime.value.value : "" );
      formData.append("WebsiteUrl", churchData.value.websiteUrl);
      formData.append("HeadPastorName", churchData.value.headPastorName);
      formData.append("HeadPastorEmail", churchData.value.headPastorEmail);
      formData.append("HeadPastorPhone", churchData.value.headPastorPhone);
      formData.append("ChurchLogo", image);
      axios
        .put("/api/Settings/ChurchProfileSettings", formData)
        .then((res) => {
          ElMessage({
            type: "success",
            message: res.data.response,
            duration: 5000
          });
          router.push("/tenant/settings/defaultmessage");
          loading.value = false
        })
        .catch((error) => {
          console.log(error);
          loading.value = false
        });
    };

    const getCurrentUser = () => {
      if (!store.getters.currentUser) {
        axios
          .get(`/api/Membership/GetCurrentSignedInUser`)
          .then((response) => {
            currentUser.value = response.data;
            console.log(response.data);
          })
          .catch((error) => console.log(error));
      } else {
        currentUser.value = store.getters.currentUser;
      }
    };
    getCurrentUser();

    return {
      churchData,
      loading,
      selectCountryID,
      selectTimeID,
      setSelectTimeZone,
      setSelectedCountry,
      url,
      imageSelected,
      timeZone,
      uploadImage,
      currentUser,
      countries,
      getCountries,
      getChurchProfile,
      selectCountry,
      selectTime,
      uploadData,
      display,
      churchProfile,
      a,
      b,
      filterFields,
      primarycolor
    };
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
  color: #02172e;
}

.page-header {
  margin-bottom: 21px;
  margin-top: 15px;
}

.page-header h2 {
  color: #02172e;
  font-weight: 800;
  font-size: 30px;
}

.sub-header {
  color: #002044;
  font-size: 20px;
  font-weight: 700;
}

.form-container {
  margin-bottom: 44px;
}

.input {
  width: 100%;
  height: 40px;
  border: 1px solid #b9c5cf;
}

.first-row {
  margin-top: 10px;
}

.day-inp {
  border-radius: 8px 0 0 8px;
}

.month-inp {
  border-radius: 0;
}

.year-inp {
  border-radius: 0 8px 8px 0;
}

#welcomeSms,
#welcomeEmail {
  margin-top: 6px;
  margin-left: 10px;
}

.check-box {
  width: 1.2em;
  height: 1em;
  background-color: white;
  border-radius: 50%;
  vertical-align: middle;
  border: 1px solid #b9c5cf;
  -webkit-appearance: none;
  outline: none;
  cursor: pointer;
}

.action-btn {
  background: #fff;
  border: 1px solid #002044;
  border-radius: 111px;
  width: 121px;
  height: 49px;
  outline: transparent;
}

.save-btn {
  color: #fff;
  background: #136acd;
  border-radius: 111px;
  width: 121px;
  height: 49px;
  outline: transparent;
  /* margin-left: 40px; */
}

.required {
  color: #ef0535;
}

.light-grey-bg {
  border-radius: 10px;
}

@media screen and (max-width: 767px) {
  .select-elem {
    height: auto !important;
  }

  .select-div {
    padding: 0.8rem !important;
  }

  .lb {
    display: none !important;
  }

  .first-row {
    flex-flow: column-reverse;
  }
}

.check-box:checked {
  background-color: #0f529f;
}

@media screen and (min-width: 768px) {
  .light-grey-bg {
    position: absolute;
    width: 100%;
    z-index: 900;
  }

  .input::placeholder {
    color: white !important;
  }
}

.check-box:checked {
  background-color: #0f529f;
}

@media screen and (max-width: 770px) {
  .follow-up-header {
    flex-direction: column;
    justify-content: flex-start;
  }

  .followup-hr-span,
  .hr-span {
    width: 100% !important;
  }

  .sub-header {
    width: 100%;
  }
}

@media screen and (min-width: 770px) and (max-width: 1190px) {
  .followup-hr-span {
    width: 60% !important;
  }
}
</style>