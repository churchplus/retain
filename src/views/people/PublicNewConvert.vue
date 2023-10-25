<template>
  <div class="container container-top">
    <div class="col-md-12 d-flex justify-content-center my-3">
      <div class="col-md-3 mt-4 d-flex align-items-center">
        <div class="pl-2">
          <img
            :src="churchLogo2"
            v-if="churchLogo2"
            class="link-image"
            alt=""
            style="width: 60px"
          />
          <img
            src="../../assets/dashboardlinks/churchcloud.png"
            v-else
            class="link-image"
            alt=""
          />
        </div>
        <span
          ><h4 class="font-weight-bold mt-3">
            {{ churchName ? churchName : "Churchplus" }}
          </h4></span
        >
      </div>
    </div>

    <div class="row">
      <h3 class="col-12 header-text font-weight-bold">Add New Converts </h3>
      <div class="mt-3 col-12">Bio:</div>
    </div>
    <div class="row">
      <div class="col-md-8 mt-3">
        <div>
          <div class="d-md-flex justify-content-md-end">
            <label for="" class="label">Event or Service Attended</label>
            <Dropdown
              v-model="selectedEventAttended"
              :options="eventsAttended"
              optionLabel="name"
              placeholder="Select event"
              class="input dd small-text widen p-0"
            />
          </div>
        </div>
        <div>
          <div class="d-md-flex justify-content-md-end mt-3">
            <label for="" class="label"
              >Firstname<span style="color: red"> *</span></label
            >
            <input
              type="text"
              class="input form-control"
              v-model="newConvertObj.firstName"
              name=""
              id="firstname"
              required
            />
          </div>
        </div>
        <div>
          <div class="d-md-flex justify-content-md-end mt-3">
            <label for="" class="label">Surname</label>
            <input
              type="text"
              class="input form-control"
              placeholder=""
              v-model="newConvertObj.lastName"
              name=""
            />
          </div>
        </div>
        <div>
          <div class="d-md-flex justify-content-md-end mt-3">
            <label for="" class="label">Phone number</label>
            <input
              class="input form-control"
              placeholder=""
              v-model="newConvertObj.phoneNumber"
              type="text"
              :class="{ 'is-invalid': !isPhoneValid }"
              id="phone number"
              ref="validatePhone"
              @blur="checkForDuplicatePhone"
            />
          </div>
        </div>
        <div>
          <div class="d-md-flex justify-content-md-end mt-3">
            <div class="status-n-gender">
              <div class="status cstm-select">
                <div class="cs-select">
                  <Dropdown
                    v-model="selectedMaritalStatus"
                    :options="maritalStatusArr"
                    optionLabel="value"
                    placeholder="Marital status"
                    style="width: 100%"
                  />
                </div>
              </div>
              <div class="gender cstm-select">
                <div class="cs-select">
                  <Dropdown
                    v-model="selectedGender"
                    :options="genderArr"
                    optionLabel="value"
                    placeholder="Gender"
                    style="width: 100%"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="d-md-flex justify-content-md-end mt-3">
            <label for="" class="label">Email</label>
            <input
              class="input form-control"
              placeholder=""
              v-model="newConvertObj.email"
              type="email"
              :class="{ 'is-invalid': !isEmailValid }"
              id="email"
              ref="validateEmail"
              @blur="checkForDuplicateEmail"
            />
          </div>
        </div>
        <div>
          <div class="d-md-flex justify-content-md-end mt-3">
            <label for="" class="label">Address</label>
            <input
              type="text"
              class="input form-control"
              placeholder=""
              v-model="newConvertObj.address"
            />
          </div>
        </div>
        <div>
          <div class="d-md-flex justify-content-md-end mt-3 ">
            <label for="" class="label">Which Group[s] Do You Belong To?</label>
              <div class="p-2 border   add-group bg-white">
                <div v-for="(item, index) in firstTimerInGroup" :key="index">
                  <div class="pt-1">{{ index + 1 }}. {{ item.name }}</div>
                </div>
                <div v-if="firstTimerInGroup.length === 0">
                  No group added yet
                </div>
                <div class="
                  font-weight-700
                  text-primary
                  border-top
                  text-center
                  c-pointer
                " data-toggle="modal" data-target="#addToGroup">
                  Choose group
                </div>
              </div>
          </div>
        </div>
        <!-- Additional field -->
        <div v-for="item in dynamicCustomFields" :key="item.id">
          <div class="d-md-flex flex-wrap justify-content-md-end mt-3">
            <label for="" class="label">{{ item.label }}</label>
            <input
              v-if="item.controlType == 0"
              class="input form-control"
              type="text"
              aria-required=""
              vz-model="item.data"
            />
            <Dropdown
              v-else-if="item.controlType == 1"
              v-model="item.data"
              :options="item.parameterValues.split(',')"
              placeholder="Select option"
              class="input dd small-text widen p-0"
            />
            <!-- <div class="cstm-select"  v-else-if="item.controlType == 2"> -->
            <div v-else-if="item.controlType == 2" style="width: 330px">
              <Checkbox
                v-model="item.data"
                :binary="true"
                style="width: 100%"
              />
            </div>
            <!-- </div> -->
            <!-- <Checkbox class="" v-else-if="item.controlType == 2" v-model="item.data" :binary="true"/> -->
            <Calendar
              v-if="item.controlType == 3"
              id="time24"
              v-model="item.data"
              :showTime="true"
              :showSeconds="true"
              class="input border-0 dd small-text widen p-0"
            />

            <input
              v-if="item.controlType == 4"
              class="input form-control"
              type="email"
              aria-required=""
              v-model="item.data"
            />
            <input
              v-if="item.controlType == 6"
              class="input"
              type="file"
              aria-required=""
            />
            <input
              v-if="item.controlType == 7"
              class="input form-control"
              :class="{ 'is-invalid': !isPhoneValid }"
              type="number"
              aria-required=""
              v-model="item.data"
            />
          </div>
        </div>
        <div>
          <div class="d-md-flex justify-content-md-end mt-3">
            <label for="" class="label">Birthday</label>
            <div class="status-n-gender">
              <div class="cstm-select">
                <div class="cs-select" style="width: 87px">
                  <Dropdown
                    v-model="newConvertObj.birthday"
                    :options="day"
                    placeholder="Day"
                    style="width: 100%"
                  />
                </div>
              </div>
              <div class="cstm-select">
                <div class="cs-select" style="width: 111px">
                  <Dropdown
                    v-model="birthMonth"
                    :options="month"
                    placeholder="Month"
                    style="width: 100%"
                  />
                </div>
              </div>

              <div class="cstm-select mr-0">
                <div class="cs-select" style="width: 113px">
                  <Dropdown
                    v-model="newConvertObj.birthYear"
                    :options="year"
                    placeholder="Year"
                    style="width: 100%"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4 img-parent">
        <div style="width: 225px; margin: 0 auto">
          <ImageForm @pictureurl="setImageToUrl" />
        </div>
      </div>
    </div>
    <div class="row">
      <span class="celeb-tab col-12 my-3" @click="showCelebTab">
        <span class="tab-header">More:</span>
        <span class="w-100"><hr class="hr w-100" /></span>
        <span>
          <span class="tb-icon-span"
            ><i
              class="pi pi-angle-down tbb-icon"
              :class="{ 'tb-icon': !hideCelebTab }"
            ></i
          ></span>
        </span>
      </span>

      <div
        class="col-12"
        :class="{ 'hide-tab': hideCelebTab, 'show-tab': !hideCelebTab }"
      >
        <div class="col-md-8 mt-3 p-0 p-sm-1">
          <div>
            <div class="d-md-flex justify-content-md-end">
              <Dropdown
                v-model="selectedAboutUsSource"
                :options="howDidYouAboutUs"
                optionLabel="name"
                placeholder="How did you hear about us?"
                class="input p-0"
              />
            </div>
          </div>
          <div>
            <div class="d-md-flex justify-content-md-end mt-3">
              <Dropdown
                v-model="selectedCommunicationMeans"
                :options="comMeansArr"
                placeholder="Means of communication"
                class="input p-0"
              />
            </div>
          </div>
          <div>
            <div class="d-md-flex justify-content-md-end mt-3">
              <Dropdown
                v-model="selectedJoinInterest"
                :options="joinInterestArr"
                placeholder="Interested in joining us?"
                class="input p-0"
              />
            </div>
          </div>
          <div>
            <div class="d-md-flex justify-content-md-end mt-3">
              <Dropdown
                v-model="selectedVisitOption"
                :options="wantVisitArr"
                placeholder="Want to be visited?"
                class="input p-0"
              />
            </div>
          </div>
        </div>
        <div class="col-4 mt-3"></div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 mt-3">
        <div class="mt-2">
          <div class="d-flex justify-content-center">
            <!-- <button class="default-btn cancel-btn btn ml-sm-3 mt-3" @click.prevent="onCancel">
                    Cancel
                    </button> -->
            <button
              class="
                primary-bg
                px-md-4
                outline-none
                default-btn
                text-white
                border-0
              "
              @click.prevent="onSubmit"
              :disabled="loading || !newConvertObj.firstName"
            >
              <i
                class="pi pi-spin pi-spinner text-white mr-2"
                v-if="loading"
              ></i>
              Save
            </button>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-md-6 text-center align-item-center px-md-4 mb-4 mt-5">
            <a href="/" class="text-decoration-none">
              <div class="">Powered by</div>
              <div class="img-fluid col-6 offset-3 col-md-4 offset-md-4 px-0">
                <img
                  src="../../assets/logoblue.png"
                  alt="churchplus Logo"
                  class="w-50 mx-2"
                />
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
      <div
      class="modal fade"
      id="addToGroup"
      tabindex="-1"
      role="dialog"
      aria-labelledby="addToGroup"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header" style="background: #ebeff4">
            <h5 class="modal-title font-weight-bold" id="addToGroup">
              Group Membership
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row my-4">
              <div class="col-md-4 text-md-right">
                <label for="" class="font-weight-600">Name</label>
              </div>
              <div class="col-md-7">
                <div class="dropdown show">
                  <button
                    class="btn border w-100 d-flex justify-content-between align-items-center"
                    type="button"
                    id="dropdownMenuLink"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    @click="focusInput"
                  >
                    <div>
                      {{
                        Object.keys(groupToAddTo).length > 0
                          ? groupToAddTo.name
                          : "Select a group"
                      }}
                    </div>
                    <i class="pi pi-chevron-down"></i>
                  </button>
                  <div
                    class="dropdown-menu w-100 scroll-card"
                    aria-labelledby="dropdownMenuLink"
                  >
                    <input
                      type="text"
                      v-model="searchGroupText"
                      class="form-control input-width-adjust"
                      placeholder="Search groups"
                      ref="searchRef"
                    />
                    <a
                      class="dropdown-item"
                      v-for="item in searchAllGroups"
                      :key="item.id"
                    >
                      <div class="c-pointer" @click="selectGroup(item)">
                        {{ item.name }}
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-4 text-md-right">
                <label for="" class="font-weight-600">Position</label>
              </div>
              <div class="col-md-7">
                <input
                  type="text"
                  v-model="position"
                  class="form-control"
                  placeholder="e.g Member"
                />
              </div>
            </div>

            <div class="row">
              <div class="col-md-4">
                <label for="" class="font-weight-600"></label>
              </div>

              <div class="col-md-7">
                <div class="col-md-12 mt-3 text-center">
                  <p class="my-1 text-danger" v-if="addToGroupError">
                    Please select a group
                  </p>
                </div>
                <div class="row mt-2">
                  <div class="col-md-6 d-md-flex justify-content-end">
                    <button class="default-btn" data-dismiss="modal">
                      Cancel
                    </button>
                  </div>
                  <div class="col-md-6">
                    <button
                      class="default-btn primary-bg border-0 text-white"
                      :data-dismiss="dismissAddToGroupModal"
                      @click="addMemberToGroup"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Toast />
</template>

<script>
import { ref, onMounted, computed } from "vue";
import axios from "@/gateway/backendapi";
import router from "@/router/index";
import InputText from "primevue/inputtext";
import Dropdown from "primevue/dropdown";
import { useRoute } from "vue-router";
import { useToast } from "primevue/usetoast";
import Calendar from "primevue/calendar";
import Dialog from "primevue/dialog";
import finish from "../../services/progressbar/progress";
import setupService from "../../services/setup/setupservice";
import ImageForm from "../../components/membership/ImageForm.vue";
import grousService from "../../services/groups/groupsservice";
import { useStore } from "vuex";
import swal from "sweetalert";

export default {
  components: { Dropdown, Dialog, ImageForm, InputText, Calendar },

  setup() {
    const toast = useToast();
    const store = useStore();
    const showError = ref(false);
    const churchLogo2 = ref("");
    const churchName = ref("")
    const newEvents = ref([]);
    

    const day = ref([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
    ]);
    const month = ref([
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ]);
    const maritalStatusArr = ref([]);
    const selectedMaritalStatus = ref(null);
    const genderArr = ref([]);
    const selectedGender = ref(null);
    const comMeansArr = ref(["Call", "Email", "Visit", "SMS"]);
    const selectedCommunicationMeans = ref(null);
    const joinInterestArr = ref(["Yes", "No", "Maybe", "On Transit"]);
    const selectedJoinInterest = ref(null);
    const wantVisitArr = ref(["Yes", "No", "Maybe", "On Transit"]);
    const selectedVisitOption = ref(null);
    const eventsAttended = ref([]);
    const selectedEventAttended = ref({});
    const howDidYouAboutUs = ref([]);
    const selectedAboutUsSource = ref(null);
    const selectedFollowUp = ref(null);
    const newConvertObj = ref({
      sendWelcomeSMS: false,
      sendWelcomeEmail: true,
    });
    const showCategory = ref(false);
    const eventText = ref("");
    const displayModal = ref(false);
    const selectEvent = ref("Select Event");
    const isPhoneValid = ref(true);
    const isEmailValid = ref(true);
    const validatePhone = ref("");
    const validateEmail = ref("");
    const newConvertPhone = ref("");
    const newConvertEmail = ref("");
    const firstTimerInGroup = ref([]);
    const dynamicCustomFields = ref([]);
    const allGroups = ref([]);
    const groupToAddTo = ref({});
    const position = ref("");
    const addToGroupError = ref(false);
    const dismissAddToGroupModal = ref("");
    const searchRef = ref(null);
    const route = useRoute();

    const eventName = computed(() => {
      return newEvents.value.map((i) => i.name);
    });

    const getCustomFields = async () => {
      try {
        let { data } = await axios.get(
          `/GetAllCustomFields?entityType=2&&tenantID=${route.params.id}`
        );
        dynamicCustomFields.value = data.sort((a, b) => a.order - b.order);
      } catch (err) {
        console.log(err);
      }
    };
    getCustomFields();

    const getFirstTimer = async () => {
      try {
        const res = await axios.get(`/TenantInfo?tenantID=${route.params.id}`);
        console.log(res.data, "yamarita");
        churchLogo2.value = res.data.logo;
        churchName.value = res.data.name;
      } catch (error) {
        console.log(error);
      }
    };
    getFirstTimer();

    const filterEventCategory = computed(() => {
      // let x;
      let arr = [];
      if (newEvents.value.length > 0) {
        console.log(newEvents.value, "new events");
        arr = newEvents.value.filter((i) => {
          return i.name.toLowerCase().includes(eventText.value.toLowerCase());
        });
      } else {
        return newEvents.value;
      }
      return arr;
    });

    const openModal = () => {
      displayModal.value = true;
    };

    const closeModal = () => {
      displayModal.value = false;
    };
    const focusInput = () => {
      setTimeout(() => {
        searchRef.value.focus();
      }, 1000);
    };

    const newEventCategoryName = ref("");

    const individualEvent = (obj) => {
      selectEvent.value = obj.name;
      newEvent.value.activity.eventCategoryId = obj.id;
      showCategory.value = false;
      console.log(obj);
    };

    const birthMonth = ref(null);

    // const birthMonth = ref(null)

    const hideCelebTab = ref(true);
    const searchGroupText = ref('');
    const hideAddInfoTab = ref(true);
    const showCelebTab = () => (hideCelebTab.value = !hideCelebTab.value);
    const showAddInfoTab = () => (hideAddInfoTab.value = !hideAddInfoTab.value);

    const loading = ref(false);

    const searchAllGroups = computed(() => {
      if (!searchGroupText.value && allGroups.value.length > 0) {
        return allGroups.value;
      } else {
        return allGroups.value.filter((i) => {
          if (i.name)
            return i.name
              .toLowerCase()
              .includes(searchGroupText.value.toLowerCase());
        });
      }
    });
    const selectGroup = (item) => {
      groupToAddTo.value = item;
    };

    const onSubmit = async () => {
      newConvertObj.value.genderId = selectedGender.value
        ? selectedGender.value.id
        : 0;
      newConvertObj.value.maritalStatusId = selectedMaritalStatus.value
        ? selectedMaritalStatus.value.id
        : 0;
      newConvertObj.value.activityId = selectedEventAttended.value && selectedEventAttended.value.activityID
        ? selectedEventAttended.value.activityID
        : "00000000-0000-0000-0000-000000000000";
      newConvertObj.value.howDidYouAboutUsId = selectedAboutUsSource.value
        ? selectedAboutUsSource.value.id
        : "00000000-0000-0000-0000-000000000000";
      newConvertObj.value.communicationMeans = selectedCommunicationMeans.value
        ? comMeansArr.value.indexOf(selectedCommunicationMeans.value) + 1
        : 0;
      newConvertObj.value.interestedInJoining = selectedJoinInterest.value
        ? joinInterestArr.value.indexOf(selectedJoinInterest.value) + 1
        : 0;
      newConvertObj.value.wantToBeVisited = selectedVisitOption.value
        ? wantVisitArr.value.indexOf(selectedVisitOption.value) + 1
        : 0;

      switch (birthMonth.value) {
        case "January":
          newConvertObj.value.birthMonth = 1;
          break;
        case "February":
          newConvertObj.value.birthMonth = 2;
          break;
        case "March":
          newConvertObj.value.birthMonth = 3;
          break;
        case "April":
          newConvertObj.value.birthMonth = 4;
          break;
        case "May":
          newConvertObj.value.birthMonth = 5;
          break;
        case "June":
          newConvertObj.value.birthMonth = 6;
          break;
        case "July":
          newConvertObj.value.birthMonth = 7;
          break;
        case "August":
          newConvertObj.value.birthMonth = 8;
          break;
        case "September":
          newConvertObj.value.birthMonth = 9;
          break;
        case "October":
          newConvertObj.value.birthMonth = 10;
          break;
        case "November":
          newConvertObj.value.birthMonth = "11";
          break;
        case "December":
          newConvertObj.value.birthMonth = "12";
          break;
        default:
          // newConvertObj.value.birthMonth = "12";
          console.log("No month chosen");
          break;
      }

      newConvertObj.value.customAttributeData = dynamicCustomFields.value.map(
        (i) => ({
          customAttributeID: i.id,
          data: i.data,
          entityID: route.params.personId,
        })
      );
      newConvertObj.value.groups =
        firstTimerInGroup.value.length > 0
          ? firstTimerInGroup.value.map((i) => {
            return {
              groupId: i.groupId,
              position: i.position,
            };
          })
          : [];

      newConvertObj.value.tenantId = route.params.id;

      loading.value = true;
      axios
        .post("/api/PublicContents/NewConvert", newConvertObj.value)
        .then((res) => {
          finish();
          console.log(res.data);
          loading.value = false;

          // toast.add({
          //     severity: "success",
          //     summary: "Successful",
          //     detail: "First timer created successfully",
          //     life: 8000,
          //   });
          swal("Successful", "New Convert created successfully!", "success");
          newConvertObj.value = {};
          birthMonth.value = "";
          selectedVisitOption.value = "";
          selectedJoinInterest.value = "";
          selectedCommunicationMeans.value = "";
          selectedAboutUsSource.value = "";
          selectedEventAttended.value = {};
          selectedMaritalStatus.value = "";
          selectedGender.value = "";
        })
        .catch((err) => {
          finish();
          loading.value = false;
          if (err.response) {
            toast.add({
              severity: "warn",
              summary: "Not successful",
              detail: `${err.response.data}`,
              life: 8000,
            });
          } else {
            toast.add({
              severity: "error",
              summary: "Network Error",
              detail: `Please ensure you have a strong internet  connection`,
              life: 4000,
            });
          }
          console.log(err.response);
        });
      // router.push('/onboarding')
    };

    const onCancel = () => {
      router.back();
    };

    const newEvent = ref({
      activity: {},
    });

    const invalidEventDetails = ref(false);
    const savingNewEvent = ref(false);
    const firstTimer = ref({});

    const createNewCat = async (eventParams) => {
      try {
        let data;
        const theText =
          eventParams === 1 ? eventText.value : newEventCategoryName.value;
        data = await axios.post(`/api/EventCategory?name=${theText}`);
        console.log(data.data);
        newEvents.value = data.data;

        toast.add({
          severity: "success",
          summary: "Event created",
          detail: "Your new event was created successfully",
          life: 2500,
        });
      } catch (error) {
        toast.add({
          severity: "error",
          summary: "Event not created",
          detail: error.response.data,
          life: 5000,
        });
      }
      displayModal.value = false;
      console.log(newEventCategoryName.value);
      newEventCategoryName.value = "";
    };

    // const createNewEvent = async () => {
    //   // console.log(eventsAttended.value);
    //   invalidEventDetails.value = false;
    //   if (newEvent.value.activity.date) {
    //     try {
    //       savingNewEvent.value = true;
    //       console.log(newEvent.value);
    //       const { data } = await axios.post(
    //         "/api/Events/CreateActivity",
    //         newEvent.value
    //       );
    //       console.log(data);
    //       selectedEventAttended.value.activityID = data.currentEvent.id;
    //       selectedEventAttended.value.name = data.currentEvent.name
    //         ? data.currentEvent.name
    //         : "New event selected";
    //       // console.log(selectedEventAttended, "SAE");

    //       toast.add({
    //         severity: "success",
    //         summary: "Event created",
    //         detail: "Your new event was created successfully",
    //         life: 2500,
    //       });
    //       // newEvent.value.date = "";
    //       // newEvent.value.preEvent.name = "";

    //       console.log(data, "data");
    //     } catch (error) {
    //       if (error.response.data == "An Event with this name already exist") {
    //         toast.add({
    //           severity: "error",
    //           summary: "Event exist already",
    //           detail: error.response.data,
    //           life: 2500,
    //         });
    //       }
    //       /*eslint no-undef: "warn"*/
    //       NProgress.done();
    //       savingNewEvent.value = false;
    //       console.log(error.response);
    //     }
    //   } else {
    //     invalidEventDetails.value = true;
    //   }

    //   displayModal.value = false;
    // };
    const ftimerId = ref("");

    onMounted(() => {
      axios.get(`/EventActivity?tenantId=${route.params.id}`).then((res) => {
        eventsAttended.value = res.data.filter((i, index) => index < 5);
      });

      axios.get("/api/EventCategory").then((res) => {
        newEvents.value = res.data.map((i) => {
          return { id: i.id, name: i.name };
        });
      });

      axios
        .get("/api/LookUp/GetAllLookUps")
        .then((res) => {
          console.log(res.data, "all lkups");
          res.data.find((i) => {
            if (i.type.toLowerCase() === "gender") {
              genderArr.value = i.lookUps;
            }
            if (i.type.toLowerCase() === "maritalstatus") {
              maritalStatusArr.value = i.lookUps;
              if (ftimerId.value) {
                selectedMaritalStatus.value = maritalStatusArr.value.find(
                  (i) => i.id === newConvertObj.value.maritalStatusId
                );
                selectedGender.value = genderArr.value.find(
                  (i) => i.id === newConvertObj.value.genderId
                );
              }
            }
          });
        })
        .catch((err) => {
          finish();
          if (err.response && err.response.status === 401) {
            localStorage.setItem("token", "");
            setupService.clearStore();
            router.push("/");
          }
        });

      axios
        .get(`/howYouHeardAboutUs?tenantId=${route.params.id}`)
        .then((res) => {
          howDidYouAboutUs.value = res.data.map((i) => {
            return { name: i.name, id: i.id };
          });
          console.log(res.data, "HYH");
        });
    });
    const year = computed(() => {
      const arrOfYears = [];
      let currentYear = new Date().getFullYear();
      while (arrOfYears.length <= 100) {
        arrOfYears.push(currentYear);
        currentYear = currentYear - 1;
      }
      return arrOfYears;
    });

    const checkForDuplicatePhone = async () => {
      if (route.params.firstTimerId) {
        try {
          let { data } = await axios.get(
            `/api/People/NewConvert/${route.params.firstTimerId}`
          );
          newConvertPhone.value = data.phoneNumber;
          newConvertEmail.value = data.email;
        } catch (err) {
          console.log(err);
        }
      }
      if (newConvertObj.value.phoneNumber !== newConvertPhone.value) {
        try {
          let { data } = await axios.get(
            `api/People/checkDuplicate?phoneNumber=${newConvertObj.value.phoneNumber}`
          );
          console.log(data, validatePhone.value);
          if (data === "phone number") {
            isPhoneValid.value = false;
          } else if (data === "email and phone number") {
            isPhoneValid.value = false;
            isEmailValid.value = false;
          } else {
            isPhoneValid.value = true;
            validatePhone.value.classList.add("is-valid");
          }
        } catch (error) {
          console.log(error);
        }
      }
    };

    const checkForDuplicateEmail = async () => {
      if (route.params.firstTimerId) {
        try {
          let { data } = await axios.get(
            `/api/People/firstTimer/${route.params.firstTimerId}`
          );
          newConvertEmail.value = data.email;
        } catch (err) {
          console.log(err);
        }
      }

      if (newConvertObj.value.email !== newConvertEmail.value) {
        try {
          let { data } = await axios.get(
            `api/People/checkDuplicate?email=${newConvertObj.value.email}`
          );
          console.log(data);
          if (data === "email") {
            isEmailValid.value = false;
          } else if (data === "email and phone number") {
            isEmailValid.value = false;
            isPhoneValid.value = false;
          } else {
            isEmailValid.value = true;
            validateEmail.value.classList.add("is-valid");
          }
        } catch (error) {
          console.log(error);
        }
      }
    };

    const setImageToUrl = (payload) => {
      newConvertObj.value.imageUrl = payload;
    };

    const setContact = (payload) => {
      if (!payload.email) {
        toast.add({
          severity: "warn",
          summary: "No email associate with the person",
          detail:
            "This contact does not have any email records, communicate with this person to create him as a user",
          life: 15000,
        });
      }
      newConvertObj.value.contactOwnerId = payload.id;
    };

    const getGroups = async () => {
      try {
        let groups = store.getters["groups/groups"];

        if (groups && groups.length > 0) {
          allGroups.value = groups;
          return true;
        } else {
          let group = await grousService.getGroups();
          if (group) {
            allGroups.value = group.response.groupResonseDTO;
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    getGroups();

    const addMemberToGroup = async () => {
      addToGroupError.value = false;
      if (!groupToAddTo.value || !groupToAddTo.value.id) {
        addToGroupError.value = true;
        return false;
      }
      dismissAddToGroupModal.value = "modal";
      console.log(groupToAddTo.value);
      firstTimerInGroup.value.push({
        name: groupToAddTo.value.name,
        groupId: groupToAddTo.value.id,
        position: position.value,
      });

      groupToAddTo.value = {};
      position.value = "";
      console.log(firstTimerInGroup.value);
    };

    return {
      onSubmit,
      onCancel,
      newConvertObj,
      searchAllGroups,
      searchGroupText,
      day,
      month,
      year,
      maritalStatusArr,
      genderArr,
      eventsAttended,
      howDidYouAboutUs,
      joinInterestArr,
      wantVisitArr,
      comMeansArr,
      selectGroup,
      loading,
      selectedGender,
      selectedMaritalStatus,
      selectedEventAttended,
      selectedAboutUsSource,
      selectedCommunicationMeans,
      selectedJoinInterest,
      selectedVisitOption,
      selectedFollowUp,
      hideCelebTab,
      showCelebTab,
      focusInput,
      showAddInfoTab,
      hideAddInfoTab,
      birthMonth,
      churchLogo2,
      churchName,
      newEvent,

      //   createNewEvent,
      invalidEventDetails,
      savingNewEvent,
      route,
      firstTimer,
      showError,
      newEvents,
      eventName,
      showCategory,
      filterEventCategory,
      eventText,
      displayModal,
      openModal,
      closeModal,
      createNewCat,
      newEventCategoryName,
      selectEvent,
      individualEvent,
      checkForDuplicatePhone,
      checkForDuplicateEmail,
      isPhoneValid,
      isEmailValid,
      validatePhone,
      validateEmail,
      newConvertPhone,
      newConvertEmail,
      setImageToUrl,
      setContact,
      firstTimerInGroup,
      allGroups,
      groupToAddTo,
      position,
      dynamicCustomFields,
      searchRef,
      addToGroupError,
      dismissAddToGroupModal,
      addMemberToGroup,
    };
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
  color: #02172e;
}
.contn-btn:disabled {
  opacity: 0.3;
}

.show-tab {
  transition: all 0.5s ease-in-out;
  height: 220px;
  /* overflow: hidden; */
}

.show-occ-tab {
  transition: all 0.5s ease-in-out;
  height: 100px;
  /* overflow: hidden; */
}

@media (max-width: 620px) {
  .show-occ-tab {
    height: 144px;
  }
}

@media (min-width: 621px) and (max-width: 767px) {
  .manual-dd-icon[data-v-24c46d98] {
    position: absolute;
    right: 12px;
    margin-top: 3rem;
  }
}

.submit-div {
  /* margin-left: 14em; */
  display: flex;
  justify-content: end;
}

.inputs {
  width: 70%;
}

.manual-dd-con {
  position: relative;
}

.manual-dd {
  width: 330px;
  border: 1px solid #b9c5cf;
  position: absolute;
  background: white;
  z-index: 2;
  top: -13px;
  margin-right: 0.5rem;
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14),
    0 1px 10px 0 rgba(0, 0, 0, 0.12);
  max-height: 400px;
  overflow: auto;
}

.manual-dd::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.manual-dd {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.manual-dd-item {
  color: #495057;
}

.manual-dd-item:hover {
  background: #e9ecef;
  cursor: pointer;
}

.dd-search-field {
  border-radius: 20px;
}

.create-event a {
  color: #136acd !important;
  text-decoration: none;
}

.create-new-event {
  text-align: center;
  font: normal normal bold 16px/22px Nunito Sans;
  letter-spacing: 0px;
  color: #136acd;
}

.create-event a:hover {
  cursor: pointer;
  padding: 8px;
}

.create {
  text-align: center;
  font: normal normal bold 16px/22px Nunito Sans;
  letter-spacing: 0px;
  color: #136acd;
}

/* .select-dropdown option{
  padding: 20px 10px;
  border: none
}

.select-dropdown option:hover{
  background: rgb(162, 197, 238)
} */

.select-elem-con {
  padding: 5px 10px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  justify-content: space-between;
}

.pointer {
  cursor: pointer;
}

.style-category {
  padding: 10px;
  box-shadow: 0px 3px 15px #797e8159;
  position: absolute;
  /* top: 10px; */
  background: white;
  z-index: 1;
  width: 80%;
  max-height: 20em;
  overflow-y: scroll;
}
.style-category div:hover {
  background-color: #ecf0f3;
  cursor: pointer;
}

.cat {
  padding: 5px;
  border-top: 1px solid #ecf0f3;
}

.form-control.input.dd.inputCal {
  text-align: left;
}

.manual-dd-icon {
  position: absolute;
  margin-right: 1rem;
  margin-top: 16px;
}

.dd-search-con {
  max-height: 40px;
}

.dd-list-con {
  max-height: 360px;
  overflow: auto;
}

.modal-footer {
  border-top: none !important;
}

.add-group {
  width: 330px;
  margin: 4px 8px;
  border-radius: 3px;
}

.input-dropdown {
  width: 330px;
}

.status-n-gender {
  justify-content: space-between;
}

@media (max-width: 620px) {
  .submit-div {
    /* margin-left: 1em; */
    flex-direction: column-reverse;
  }

  .manual-dd-icon {
    margin-top: 3rem;
    right: 10px;
  }

  .widen {
    width: 100%;
  }

  .add-group {
    width: 100%;
  }

  .input-dropdown {
    width: 100%;
  }
}

@media (min-width: 621px) and (max-width: 900px) {
  /* .submit-div {
    margin-left: 9em;
  } */
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
  height: 40px;
  border: 1px solid #b9c5cf;
  margin: 0;
}
.inputCal {
  height: 40px;
  /* border: 1px solid #b9c5cf; */
  margin: 0;
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

/* .select-elem {
  height: 50px !important;
} */

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
  /* -webkit-appearance: none; */
  outline: none;
  cursor: pointer;
}

.action-btn {
  background: #fff;
  border: 1px solid #002044;
  border-radius: 22px;
  width: 104px;
  /* height: 49px; */
  outline: transparent;
}

.save-btn {
  background: #136acd;
  border: none;
  outline: transparent;
  /* padding: 8px 10px; */
  /* color: #fff; */
  /* width: 40px; */
  /* min-width: 104px; */
  color: #fff;
  font-size: 16px;
  border-radius: 22px;
}

.drop-it.placeholder {
  /* Chrome/Opera/Safari */
  /* color: pink; */
  border: 2px solid red;
}

template.p-dropdown-parent {
  border: 2px solid red;
}

.roll1 {
  transition: all 0.5s ease-in-out;
  transform: rotate(180deg);
}

.slide-down1 {
  height: 200px;
  transition: all 0.5s ease-in-out;
}
.close-slide1 {
  height: 0;
  overflow: hidden;
  transition: all 0.5s ease-in-out;
}

.required {
  color: #ef0535;
}

.modal-body.new-event-modal {
  padding: 0;
}

.gender.cstm-select {
  margin: 0;
}

@media screen and (max-width: 767px) {
  .select-elem {
    height: auto !important;
  }

  .select-div {
    padding: 0.8rem !important;
  }

  .img-parent {
    order: -1;
  }

  .input {
    width: 100%;
  }
  .inputCal {
    width: 100%;
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

@media (min-width: 576px) {
  .modal-dialog {
    max-width: 650px;
    margin: 1.75rem auto;
    /* padding: 32px; */
  }
}
</style>
