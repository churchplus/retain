<template>
  <div class="container-wide">
    <div class="row">
      <div class="col-md-7 mt-5">
        <div class="row">
          <div class="col-12 col-md-10">
            <div class="row">
              <div class="col-12">
                <h5 class="appBranding">Customize Your App</h5>
                
                <div class="mt-3"><span class="font-weight-700">NB:</span> Please choose a dark shade color, click out of the color box, the system will verify your color, then click save to continue.</div>
              </div>

              <!-- MOBILE AREA -->
              <div class="my-2">
                <div class="container"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="row mt-1">
          <div class="col-12 col-md-10">
            <div
              class="row  align-items-center"
            >
              <div class="d-flex align-items-center col-8">
                <h5 class="primaryColour mb-0">Primary Colour</h5>
                <i
                  class="mt-1 pl-2 pi pi-question-circle c-pointer"
                  v-tooltip.top="'Choose brand color'"
                ></i>
              </div>

              <div class="col-4 color-picker">
                <img
                  class="c-pointer w-50"
                  src="../../../assets/mobileonboarding/colorpickericon.png"
                  alt="color-picker"
                  @click="showColorPallet"
                />

                <div class="col-4 col-sm-4 text-right">
                  <!-- <label for="colorpicker"></label> -->
                  <input
                    type="color"
                    id="colorpicker"
                    class="no-border form-control c-pointer"
                    v-model="colorPicked"
                    @change="saveAppBranding"
                    ref="colorBox"
                    style="width: 0; height: 0"
                  />
                </div>
              </div>
              <div class="col-md-3 col-12 col-sm-0"></div>
              <hr class="mt-2 d-none d-sm-none d-md-block" />
            </div>
          </div>
        </div>
        <div class="row mt-1">
          <div class="col-12 col-md-10">
            <div class="row">
              <div class="col-12 col-sm-6">
                <h5 class="logo mt-3">Ministry Logo</h5>
              </div>
              <Toast />
              <!-- testrun -->
              <!-- <div class="col-md-5 col-12">
                  <div class="container mx-auto mx-md-0 mx-lg-0 pt-2">
                    <div class="photo-box border ml-1">
                      <img src="" class="w-100 h-100 img-responsive">
                    </div>
                    <div class="custom-file">
                      <input
                        type="file"
                        class="custom-file-input"
                        id="customFile"
                        @change="uploadFile"
                      />
                      <label
                        class="custom-file-label px-4"
                        for="customFile"
                      ></label>
                    </div>
                  </div>
                </div> -->
              <!-- testrun -->
              <div class="col-12 col-sm-6">
                <!-- <div class="cs-input border-0 mt-2 ml-4">
                  Upload logo
                  <label
                    for="imgUpload"
                    class="choose-file mr-sm-4"
                    :class="{ 'hide-input': imageURL }"
                  >
                  </label> -->
                  <input
                      type="file"
                      class=" form-control"
                      id="imgUpload"
                      @change="imageSelected"
                    />
                <!-- </div> -->
              </div>
               <div class="row">
               <div class="col-12 mt-3 d-flex justify-content-center">
                  <img
                :src="imageURL"

                style="width: 50%"
              />
               </div>
             </div>
              <LoadingComponent :loading="loading" style="fontsize: 1rem" />

              <!-- <div class="col-md-3 col-12 col-sm-0"></div>
              <div class="col-4"></div> -->
              
            </div>
          </div>
         
        </div>
         <div class="row">
            <div
                class="col-6 offset-3 offset-md-2 btn primary-bg mt-5 mb-4 text-white default-btn border-0 px-0"
                @click="saveAppDetails"
              >
                Save and continue
              </div>
               <div
                  @click="skip"
                  class="btn my-3 mb-5 text-primary text-right col-12 col-sm-6 offset-sm-2">
                  Skip >>>
                </div>
          </div>
      </div>

      <div class="col-md-5 d-none d-md-block">
     
        <div class="smartphone">
          <div class="content">
            <iframe style="width: 100%; border: none; height: 100%" />
            <!-- MOBILE AREA CONTAINER-->
            <div class="mobile-container-holder">
              <!-- MOBILE AREA -->
              <div class="container mt-5">
                <div class="row">
                  <div class="col-12">
                    <h4 class="Header-text-small text-left">My Profile</h4>
                  </div>
                </div>
              </div>

              <!-- picture area -->
              <div class="container mb-2">
                <div class="row d-flex justify-content-center">
                  <div class="col-6">
                    <div
                      class="image-container-small"
                      style="
                        border: 1px solid #ebeff4;
                        height: 50px;
                        width: 50px;
                        border-radius: 50%;
                        background-color: #fff;
                      "
                      :style="{
                        color: colorPicked,
                        backgroundColor: colorPicked,
                      }"
                    >
                      <img
                        class="w-100 img-responsive"
                        :style="{ border: colorPicked }"
                        src="../../../assets/mobileonboarding/avatar-icon-images.png"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
              <!--end picture area -->

              <!--name & email area -->
              <div class="container">
                <div class="row">
                  <div
                    class="col-12 text-center d-flex flex-column align-items-center"
                  >
                    <span class="font-size-small">John Doe</span>
                    <span class="font-size-small">johndoee@gmail.com</span>
                  </div>
                </div>
              </div>
              <!--name & email area -->

              <!-- profile list -->
              <div class="container mt-1">
                <!-- user area -->
                <div class="row d-flex align-items-center">
                  <div class="col-2">
                    <i
                      class="pi pi-user text-center c-pointer reduced-icon-small"
                      :style="{ color: colorPicked }"
                    ></i>
                  </div>
                  <div class="col-8">
                    <p class="profile-text-small text-left c-pointer mb-0">
                      Profile
                    </p>
                  </div>
                </div>
                <!--end user area -->

                <!-- download area -->
                <div class="row d-flex align-items-center">
                  <div class="col-2">
                    <i
                      class="pi pi-download text-center c-pointer reduced-icon-small"
                      :style="{ color: colorPicked }"
                    ></i>
                  </div>
                  <div class="col-8">
                    <p class="profile-text-small text-left c-pointer mb-0">
                      My Downloads
                    </p>
                  </div>
                </div>
                <!--end download area -->

                <!-- attendance area -->
                <div class="row d-flex align-items-center">
                  <div class="col-2">
                    <i
                      class="pi pi-check-circle text-center c-pointer reduced-icon-small"
                      :style="{ color: colorPicked }"
                    ></i>
                  </div>
                  <div class="col-8">
                    <p class="profile-text-small text-left c-pointer mb-0">
                      Attendance
                    </p>
                  </div>
                </div>
                <!--end attendance area -->

                <!-- church-information area -->
                <div class="row d-flex align-items-center">
                  <div class="col-2">
                    <i
                      class="pi pi-home text-center c-pointer reduced-icon-small"
                      :style="{ color: colorPicked }"
                    ></i>
                  </div>
                  <div class="col-9">
                    <p class="profile-text-small text-left c-pointer mb-0">
                      Church Information
                    </p>
                  </div>
                </div>
                <!--end church-information area -->

                <!-- log-in area -->
                <div class="row d-flex align-items-center">
                  <div class="col-2">
                    <i
                      class="pi pi-sign-in text-center c-pointer reduced-icon-small"
                      :style="{ color: colorPicked }"
                    ></i>
                  </div>
                  <div class="col-8">
                    <p class="profile-text-small text-left c-pointer mb-0">
                      Log in
                    </p>
                  </div>
                </div>
                <!--end log-in area -->
              </div>
              <!-- end profile list -->

              <!-- Footer Area -->
              <div class="background-color-small mt-1">
                <div class="container">
                  <div class="row d-flex flex-row justify-content-center pt-1">
                    <div
                      class="col-2 text-center d-flex flex-column align-items-center"
                    >
                      <i
                        class="pi pi-home text-center c-pointer pi-font-small"
                      ></i>
                      <span class="font-size-small">Home</span>
                    </div>
                    <div
                      class="col-2 text-center d-flex flex-column align-items-center"
                    >
                      <i
                        class="pi pi-youtube text-center c-pointer pi-font-small"
                      ></i>
                      <span class="font-size-small">Media</span>
                    </div>
                    <div
                      class="col-2 text-center d-flex flex-column align-items-center"
                    >
                      <i
                        class="pi pi-money-bill text-center c-pointer pi-font-small"
                      ></i>
                      <span class="font-size-small">Give</span>
                    </div>
                    <div
                      class="col-2 text-center d-flex flex-column align-items-center"
                    >
                      <i
                        class="pi pi-comments text-center c-pointer pi-font-small"
                      ></i>
                      <span class="font-size-small"> Chat</span>
                    </div>
                    <div
                      class="col-2 text-center d-flex flex-column align-items-center"
                    >
                      <i
                        class="pi pi-tag text-center c-pointer pi-font-small"
                        :style="{ color: colorPicked }"
                      ></i>
                      <span
                        class="font-size-small"
                        :style="{ color: colorPicked }"
                        >More</span
                      >
                    </div>
                  </div>

                  <div class="row pt-1">
                    <div class="col-4 text-right px-0">
                      <i
                        class="pi pi-window-minimize text-center c-pointer pi-font-small"
                      ></i>
                    </div>
                    <div class="col-4 text-center">
                      <i
                        class="pi pi-circle-off text-center c-pointer pi-font-small"
                      ></i>
                    </div>
                    <div class="col-4 text-left px-0">
                      <i
                        class="pi pi-spinner text-center c-pointer pi-font-small"
                      ></i>
                    </div>
                  </div>
                </div>
              </div>

              <!--End of Footer Area -->

              <!--END MOBILE AREA -->
            </div>
            <!--END MOBILE AREA CONTAINER -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import router from "../../../router";
import { ref, computed } from "vue";
// import store from "../../../store/store";
import axios from "@/gateway/backendapi";
import Tooltip from "primevue/tooltip";
import LoadingComponent from "../../../components/loading/LoadingComponent";
import { useToast } from "primevue/usetoast";
import mobile_service from "../../../services/mobile/mobile-service"

// import {ref} from 'vue'
export default {
  directives: {
    tooltip: Tooltip,
  },
  components: {
    LoadingComponent,
  },
  setup(props, context) {
    const image = ref("");
    const colorBox = ref("");
    const colorPicked = ref("");
    const colorValid = ref("");
    const toast = useToast();

    const changeColors = computed(() => {
      console.log(colorPicked);
      return { colorPicked: colorPicked.value };
    });

    const showColorPallet = () => {
      colorBox.value.click();
      console.log(colorBox);
    };

    const loading = ref(false);
    const saveAppBranding = () => {
      loading.value = true;
      let stringedColor = `${colorPicked.value}`
      mobile_service.validateColor(stringedColor)
        .then((res) => {
          console.log(res);
           colorValid.value = res.data ;
          loading.value = false;

            toast.add({
              severity: "success",
              summary: "Color Matched",
              detail: "Choose logo or click save button to continue",
              life: 6000,
            });



        })
        .catch((err) => {
               toast.add({
              severity: "info",
              summary: "",
              detail: "Choose darker shade of the color",
              life: 4000,
            });
          console.log(err);
          loading.value = false;
        });
    };

    const getSocialMediaDetails = () => {
      axios
        .get(`/mobile/v1/Profile/GetChurchProfile`)
        .then((res) => {
          console.log(res);
          imageURL.value = res.data.returnObject.logoUrl
          colorPicked.value = res.data.returnObject.churchAppBackgroundColor

            
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getSocialMediaDetails()

 const saveAppDetails = () => {
        const formData = new FormData();
        formData.append("Logo", image.value);
        formData.append("BackgroundColour", colorPicked.value);

        axios
          .put(`/mobile/v1/Profile/CustomizeApp`, formData)
          .then((res) => {
            console.log(res);
            let changeState = {
            tab: true,
            churchSetup: false,
            socialMedia: false,
            appBranding: false,
            donationForm: true
          }
          context.emit('saved-appbranding', changeState)
          })
          .catch((err) => {
            console.log(err);
          });
      };
      //saveAppDetails();
    const imageURL = ref("");
    const imageSelected = (e) => {
      image.value = e.target.files[0];
      imageURL.value = URL.createObjectURL(image.value);
      console.log(image.value);
      console.log(e)
    };

    const skip = () => {
      if (imageURL.value && colorPicked.value) {
        let changeState = {
            tab: true,
            churchSetup: false,
            socialMedia: false,
            appBranding: false,
            donationForm: true
          }
          context.emit('saved-appbranding', changeState)
          console.log('all filllted');
      } else {
        let changeState = {
          // tab: true,
            churchSetup: false,
            socialMedia: false,
            appBranding: false,
            donationForm: true
          }
          context.emit('saved-appbranding', changeState)
          console.log('not all')
      }

    //   let changeState = {
    //       // tab: true,
    //       churchSetup: false,
    //       socialMedia: false,
    //       appBranding: false,
    //       donationForm: true
    //     }
    //     context.emit('saved-appbranding', changeState)
    }

    return {
    saveAppDetails,
      saveAppBranding,
      colorPicked,
      changeColors,
      showColorPallet,
      colorBox,
      imageSelected,
      imageURL,
      colorValid,
      loading,
      skip
    };
  },
};
</script>

<style scoped>
.hide-input {
  height: 0;
  width: 0;
}

/* profile image area */
.image-container {
  border: 1px solid #ebeff4;
  height: 100px;
  width: 100px;
  border-radius: 50%;
}

.profile-text {
  color: #031c39;
  font: normal normal 300 15px/20px Nunito Sans;
}

.profile-heading-text {
  color: #031c39;
  font: normal normal 700 20px/30px Nunito Sans;
}

.icon-size {
  font-size: 2rem;
}

.footer-text {
  color: #031c39;
  font: normal normal 200 20px Nunito Sans;
}
/*end of  profile image area */

/*css for mobile frame */
/* style in iframe */
.mobile-container-holder {
  position: absolute;
  top: -16px;
  width: 194px
}

/* .image-container-small {
  border: 1px solid#ebeff4;
  height: 50px;
  width: 50px;
  border-radius: 50%;
} */

.Header-text-small {
  color: #031c39;
  font-family: Nunito Sans;
  font-size: 12px;
  font-weight: bold;
}

.profile-text-small {
  color: #031c39;
  font-family: Nunito Sans;
  font-size: 9px;
  font-weight: 500;
}

.font-size-small {
  font-size: 8px;
}

.pi-font-small {
  font-size: 12px;
}

.background-color-small {
  background-color: #ebeff4;
}

.reduced-icon-small {
  font-size: 12px;
}
/*end style in iframe */

/* The device with borders */
.smartphone {
  position: relative;
  width: 226px;
  height: 439px;
  margin: auto;
  top: 17.2rem;
  left: 13%;
  transform: translate(-50%, -50%);
  border: 16px black solid;
  border-top-width: 30px;
  border-bottom-width: 30px;
  border-radius: 36px;
}

/* The horizontal line on the top of the device */
.smartphone:before {
  content: "";
  display: block;
  width: 60px;
  height: 5px;
  position: absolute;
  top: -18px;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #333;
  border-radius: 10px;
}

/* The circle on the bottom of the device */
.smartphone:after {
  content: "";
  display: block;
  width: 18px;
  height: 18px;
  position: absolute;
  left: 50%;
  bottom: -35px;
  transform: translate(-50%, -50%);
  background: #333;
  border-radius: 50%;
}

/* The screen (or content) of the device */
.smartphone .content {
  position: relative;
  width: 169px;
  height: 290px;
  background: white;
}
/*end of css for mobile frame */

.backgroundImage {
  background-image: url("../../../assets/mobileonboarding/app1.svg");
  background-repeat: no-repeat, repeat;
  background-size: cover;
  background-color: #cccccc;
  /* max-height: 100%;*/
  height: 100vh;
  width: 100%;
  position: relative;
}
.appHeading1 {
  font: normal normal 800 20px/60px Nunito Sans;
  letter-spacing: 0px;
  color: #031c39;
  opacity: 1;
}

.no-border {
  border-radius: 20px;
  opacity: 1;
  cursor: pointer;
  border: none;
  box-shadow: none;
  outline-style: 0;
}

hr {
  width: 558px;
  height: 0px;
  margin: auto;
}
#logoBox {
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 1px solid #dde2e6;
  border-radius: 5px;
  opacity: 1;
  width: 437px;
  height: 45px;
}
.colourText {
  text-align: left;
  font: normal normal bold 18px/24px Nunito Sans;
  letter-spacing: 0px;
  color: #020e1c;
  opacity: 1;
}
.appBranding {
  color: #031c39;
  font: normal normal 800 30px/40px Nunito Sans;
}
/* #colorpicker{
text-align: left;
font: normal normal bold 18px/24px Nunito Sans;
letter-spacing: 0px;
color: #020E1C;
opacity: 1;
} */
#colorpicker {
  -webkit-appearance: none;
  padding: 0;
  border: none;
  border-radius: 10px;
  /* width: 20px;
  height: 20px; */
}
#colorpicker::-webkit-color-swatch {
  border: none;
  border-radius: 10px;
  padding: 0;
}
#colorpicker::-webkit-color-swatch-wrapper {
  border: none;
  border-radius: 10px;
  padding: 0;
}
.logo {
  text-align: left;
  /* font: normal normal bold 24px/32px Nunito Sans; */
  letter-spacing: 0px;
  color: #020e1c;
  opacity: 1;
}
.button1 {
  background: #f1faff 0% 0% no-repeat padding-box;
  border: 0.20000000298023224px solid #7894a6;
  border-radius: 23px;
  opacity: 1;
  width: 180px;
  height: 46px;
  color: #136acd;
}
.button2 {
  text-align: center;
  height: 0;
  position: absolute;
  top: 80%;
  right: 40%;
}
.dash {
  width: 41px;
  height: 4px;
  background: #136acd 0% 0% no-repeat padding-box;
  border-radius: 11px;
  opacity: 1;
}
.dash1 {
  width: 41px;
  height: 4px;
  background: #f7f8fa 0% 0% no-repeat padding-box;
  border-radius: 11px;
  opacity: 1;
}
.smallButton {
  background: #f1faff 0% 0% no-repeat padding-box;
  border: 0.20000000298023224px solid #7894a6;
  border-radius: 23px;
  opacity: 1;
  width: 180px;
  height: 46px;
}


.step {
  font: normal normal bold 18px/24px Nunito Sans;
  letter-spacing: 0px;
  color: #ffffff;
  opacity: 1;
}
</style>

