<template>
  <div class="head-text">
    <div>Add New Converts</div>
  </div>
  <div class="my-con container-top" @click="closeManualModalIfOpen">
    <el-container>
      <el-row :gutter="15" class="w-100 m-0">
        <el-col class="d-block d-md-none">
            <div class="grey-bg">
            <div>
              <div class="person-img">
                <img v-if="!url" src="../../assets/people/phone-import.svg" alt="Uploaded Image" />
                <img v-else :src="url" alt="Uploaded Image"
                  style="width: 110px; height: 110px; border-radius: 50%; object-fit: cover" />
              </div>
            </div>
            <div>
              <div class="cs-input">
                <label for="imgUpload" class="choose-file">
                  Choose image
                  <input type="file" class="input file-input" placeholder="" id="imgUpload" @change="imageSelected" />
                </label>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :sm="16" :md="16" :lg="16" :xl="16" class="p-0">
          <el-form :model="newConvertObj" ref="ruleForm" :rules="validateRules" style="width: 100%">
            <el-form-item>
              <div class="d-flex flex-column flex-lg-row justify-content-end w-100">
                <label for="firstName" class="mr-3 font-weight-600">Firstname<span style="color: red"> *</span></label>
                <el-input type="text" class="input-width" v-model="newConvertObj.firstName" placeholder="First name" />
              </div>
            </el-form-item>
            <el-form-item>
              <div class="d-flex flex-column flex-lg-row justify-content-end w-100">
                <label for="firstName" class="mr-3 font-weight-600">Surname</label>
                <el-input type="text" class="input-width" v-model="newConvertObj.lastName" placeholder="Last name" />
              </div>
            </el-form-item>
            <el-form-item prop="phoneNumber" class="validate-phone">
              <div class="d-flex flex-column flex-lg-row justify-content-end w-100">
                <label for="firstName" class="mr-3 font-weight-600">Phone number</label>
                <el-input type="number" ref="validatePhone" @blur="checkForDuplicatePhone" class="input-width"
                  v-model="newConvertObj.phoneNumber" placeholder="Phone number" />
              </div>
            </el-form-item>
            <el-form-item prop="email" class="validate-email">
              <div class="d-flex flex-column flex-lg-row justify-content-end w-100">
                <label for="firstName" class="mr-3 font-weight-600">Email</label>
                <el-input type="text" class="input-width" v-model="newConvertObj.email" placeholder="Email" />
              </div>
            </el-form-item>
            <el-form-item>
              <div class="d-flex flex-column flex-lg-row justify-content-end w-100">
                <div class="input-width d-flex">
                  <el-select-v2 v-model="maritalStatusId" @change="setSelectedMaritalStatus"
                    :options="maritalStatusArr.map(i => ({ label: i.value, value: i.id }))" placeholder="Marital status"
                    size="large" class="w-100 mr-1" />
                  <el-select-v2 v-model="genderId" @change="setSelectedGender"
                    :options="genderArr && genderArr.length > 0 ? genderArr.map(i => ({ label: i.value, value: i.id })) : []"
                    placeholder="Gender" size="large" class="w-100 ml-1" />
                </div>
              </div>
            </el-form-item>
            <el-form-item>
              <div class="d-flex flex-column flex-lg-row justify-content-end w-100">
                <label for="firstName" class="mr-3 font-weight-600">Event or service attended</label>
                <div class="input-width">
                  <el-dropdown class="w-100" trigger="click">
                    <el-input class="w-100" placeholder="Search for events" v-model="selectedEventAttended.name" />
                    <template #dropdown>
                      <el-dropdown-menu class="menu-height">
                        <el-dropdown-item v-for="(event, index) in filteredEvents" :key="index"
                          @click="eventAttendedSelected(event)">{{ event.name }}</el-dropdown-item>
                        <el-dropdown-item class="d-flex justify-content-center text-primary font-weight-700"
                          data-toggle="modal" data-target="#eventModal" divided><el-icon>
                            <CirclePlus />
                          </el-icon> Create new event</el-dropdown-item>
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                </div>
              </div>
            </el-form-item>
            <el-form-item>
              <div class="d-flex flex-column flex-lg-row justify-content-end w-100">
                <label for="firstName" class="mr-3 font-weight-600">Address</label>
                <el-input type="text" class="input-width" v-model="newConvertObj.address" placeholder="Address" />
              </div>
            </el-form-item>
            <el-form-item>
              <div class="d-flex flex-column flex-lg-row justify-content-end w-100">
                <div class="mr-3 font-weight-600">Birthday</div>
                <div class="input-width d-flex">
                  <el-select-v2 v-model="newConvertObj.birthday" :options="day.map(i => ({ label: i, value: i }))"
                    placeholder="Day" size="large" class="w-100 mr-1" />
                  <el-select-v2 v-model="birthMonth" :options="month.map(i => ({ label: i, value: i }))"
                    placeholder="Month" size="large" class="w-100 ml-1" />
                  <el-select-v2 v-model="newConvertObj.birthYear" :options="year.map(i => ({ label: i, value: i }))"
                    placeholder="Year" size="large" class="w-100 ml-1" />
                </div>
              </div>
            </el-form-item>
            <el-form-item>
              <div class="d-flex flex-column flex-lg-row justify-content-end w-100">
                <label for="firstName" class="mr-3 font-weight-600">Person to follow-up</label>
                <div class="input-width">
                  <SearchMembers @memberdetail="setContact" :currentMember="newConvertObj" />
                </div>
              </div>
            </el-form-item>
            <el-form-item>
              <div class="d-flex flex-column flex-lg-row justify-content-end w-100">
                <label for="firstName" class=" font-weight-600">Which Group[s] Do You Belong To?</label>
                <div class="input-width">
                  <div class="p-2 border add-group bg-white">
                    <div v-for="(item, index) in NewConvertInGroup" :key="index">
                      <div class="pt-1">{{ index + 1 }}. {{ item.name }}</div>
                    </div>
                    <div v-if="NewConvertInGroup.length === 0">
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

            </el-form-item>
            <el-form-item v-for="(item, index) in dynamicCustomFields" :key="index">
              <div class="d-flex flex-column flex-lg-row justify-content-end w-100">
                <label for="occupation" class="mr-3 font-weight-600">{{ item.label }}</label>
                <div class="input-width d-flex" v-if="(item.controlType == 1)">
                  <el-select-v2 v-model="item.data"
                    :options="item.parameterValues.split(',').map(i => ({ label: i, value: i }))"
                    :placeholder="item.label" size="large" class="w-100 mr-1" />
                </div>
                <el-input type="text" class="input-width" v-model="item.data" :placeholder="item.label"
                  v-if="(item.controlType == 0)" />
                <el-input type="number" class="input-width" v-model="item.data" :placeholder="item.label"
                  v-if="(item.controlType == 7)" />
                <el-input type="email" class="input-width" v-model="item.data" :placeholder="item.label"
                  v-if="(item.controlType == 4)" />
                <div class="input-width" v-if="(item.controlType == 2)">
                  <el-checkbox v-model="item.data" size="large" />
                </div>
                <el-date-picker v-model="item.data" class="input-width" type="date" :placeholder="item.label"
                  size="default" v-if="(item.controlType == 3)" />
                <div class="d-flex align-items-center" v-if="(item.controlType == 6)">
                  <input type="file" class="form-control input-width" @change="uploadImage($event, index)"
                    :placeholder="item.label" />
                  <el-icon class="is-loading ml-2" v-if="customFileLoading">
                    <Loading />
                  </el-icon>
                </div>
              </div>
            </el-form-item>
            <div class="d-flex align-items-center">
              <div class="font-weight-700">Insights: </div>
              <el-divider>
              </el-divider>
              <span>
                <el-icon class="angle-icon tb-icon-span" @click="(showAddInfo = !showAddInfo)">
                  <ArrowDownBold />
                </el-icon>
              </span>
            </div>
            <el-collapse-transition>
              <div v-show="showAddInfo">
                <el-form-item>
                  <div class="d-flex flex-column flex-lg-row justify-content-end w-100">
                    <div class="input-width">
                      <el-select-v2 v-model="sourceId" @change="setSelectedSource"
                        :options="howDidYouAboutUs.map(i => ({ label: i.name, value: i.id }))"
                        placeholder="How did you hear about us?" size="large" class="w-100 mr-1" />
                    </div>
                  </div>
                </el-form-item>
                <el-form-item>
                  <div class="d-flex flex-column flex-lg-row justify-content-end w-100">
                    <div class="input-width">
                      <el-select-v2 v-model="selectedCommunicationMeans"
                        :options="comMeansArr.map(i => ({ label: i, value: i }))" placeholder="Means of communication"
                        size="large" class="w-100 mr-1" />
                    </div>
                  </div>
                </el-form-item>
                <el-form-item>
                  <div class="d-flex flex-column flex-lg-row justify-content-end w-100">
                    <div class="input-width">
                      <el-select-v2 v-model="selectedJoinInterest"
                        :options="joinInterestArr.map(i => ({ label: i, value: i }))"
                        placeholder="Interested in joining us?" size="large" class="w-100 mr-1" />
                    </div>
                  </div>
                </el-form-item>
                <el-form-item>
                  <div class="d-flex flex-column flex-lg-row justify-content-end w-100">
                    <div class="input-width">
                      <el-select-v2 v-model="selectedVisitOption"
                        :options="wantVisitArr.map(i => ({ label: i, value: i }))" placeholder="Want to be visited?"
                        size="large" class="w-100 mr-1" />
                    </div>
                  </div>
                </el-form-item>
              </div>
            </el-collapse-transition>
            <el-form-item>
              <div class="d-flex flex-column flex-lg-row justify-content-end w-100">
                <div class="input-width">
                  <div class="d-flex flex-column">
                    <el-button class="secondary-button" @click.prevent="onCancel" round>Cancel</el-button>
                    <el-button @click.prevent="onSubmit" :loading="loading" class="secondary-button my-3 mx-0"
                      round>Save and add another</el-button>
                    <el-button class="mx-0 mx-sm-2" :color="primarycolor" :loading="loadingtwo" @click.prevent="saveAndRoute"
                      round>Save</el-button>
                  </div>
                </div>
              </div>
            </el-form-item>

          </el-form>

        </el-col>
        <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
          <div class="grey-bg d-none d-md-block">
            <div class="grey-bg">
            <div>
              <div class="person-img">
                <img v-if="!url" src="../../assets/people/phone-import.svg" alt="Uploaded Image" />
                <img v-else :src="url" alt="Uploaded Image"
                  style="width: 110px; height: 110px; border-radius: 50%; object-fit: cover" />
              </div>
            </div>
            <div>
              <div class="cs-input">
                <label for="imgUpload" class="choose-file">
                  Choose image
                  <input type="file" class="input file-input" placeholder="" id="imgUpload" @change="imageSelected" />
                </label>
              </div>
            </div>
          </div>
          </div>
        </el-col>
      </el-row>
    </el-container>

    <div class="modal fade" id="eventModal" tabindex="-1" role="dialog" aria-labelledby="eventModalLabel"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content py-2 px-2">
          <div class="modal-header">
            <h5 class="modal-title font-weight-bold" id="exampleModalLabel">
              Create New Event
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body new-event-modal">
            <div class="row my-4">
              <div class="col-md-4 text-md-right align-self-center">
                <label for="" class="label font-weight-bold">Event name</label>
              </div>
              <div class="col-md-7">
                <div class="input-width">
                  <el-dropdown class="w-100" trigger="click">
                    <el-input class="w-100" placeholder="Search for events" v-model="selectEvent" />
                    <template #dropdown>
                      <el-dropdown-menu class="menu-height">
                        <el-dropdown-item v-for="(eventCategory, index) in filterEventCategory" :key="index"
                          @click="individualEvent(eventCategory)">{{ eventCategory.name }}</el-dropdown-item>
                        <el-dropdown-item class="d-flex justify-content-center text-primary font-weight-700"
                          v-if="filterEventCategory.length >= 1" @click="openModal" divided><el-icon>
                            <CirclePlus />
                          </el-icon> Add new event</el-dropdown-item>
                        <el-dropdown-item class="text-primary font-weight-700" v-else @click="createNewCat(1)"
                          divided><el-icon>
                            <CirclePlus />
                          </el-icon> Create "{{ selectEvent }}" event</el-dropdown-item>
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                </div>

                <el-dialog v-model="displayModal" title="Add New Event"
                  :width="mdAndUp || lgAndUp || xlAndUp ? `50%` : `90%`">
                  <div class="row">
                    <div class="col-sm-3 align-self-center text-sm-right">
                      Event Name
                    </div>
                    <div class="col-sm-9">
                      <el-input type="text" v-model="newEventCategoryName" />
                    </div>
                  </div>
                  <template #footer>
                    <span class="dialog-footer d-flex justify-content-end text-center">
                      <el-button class="secondary-button" @click="displayModal = false" round>Cancel</el-button>
                      <el-button :color="primarycolor" :loading="createCatLoading" @click="createNewCat(2)" round>
                        Save
                      </el-button>
                    </span>
                  </template>
                </el-dialog>
              </div>
            </div>
            <div class="row mt-4 mb-4">
              <div class="col-md-4 text-md-right align-self-center">
                <label for="" class="label font-weight-bold">Event date</label>
              </div>
              <div class="col-md-7 pr-0">
                <input type="date" class="form-control" v-model="newEvent.activity.date" />
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <div class="container">
              <div class="row">
                <div class="col-md-4"></div>
                <div class="col-md-7">
                  <div class="row">
                    <div class="col-md-12 text-md-right">
                      <p class="mb-1 text-danger" v-if="invalidEventDetails">
                        Enter event name and date
                      </p>
                    </div>
                    <div class="pr-0 col-md-12 d-md-flex justify-content-end">
                      <el-button class="secondary-button" data-dismiss="modal" round>Cancel</el-button>
                      <el-button :color="primarycolor" data-dismiss="modal" @click="createNewEvent" round>
                        Save
                      </el-button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="addToGroup" tabindex="-1" role="dialog" aria-labelledby="addToGroup" aria-hidden="true"
      @click="hideGroupModal">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header" style="background: #ebeff4">
            <h5 class="modal-title font-weight-bold" id="addToGroup">
              Group Membership
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row my-4">
              <div class="col-md-4 text-md-right">
                <label for="" class="font-weight-600">Name</label>
              </div>
              <div class="col-md-7">
                <el-tree-select v-model="selectedTree" class="w-100" placeholder="Select group" :data="groupMappedTree"
                  :render-after-expand="false" :filter-node-method="filterNodeMethod" @change="setGroupValue" filterable
                  check-strictly />
              </div>
            </div>

            <div class="row">
              <div class="col-md-4 text-md-right">
                <label for="" class="font-weight-600">Position</label>
              </div>
              <div class="col-md-7">
                <input type="text" v-model="position" class="form-control" placeholder="e.g Member" />
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
                <div class="row mt-2 d-md-flex justify-content-end">
                  <el-button class="secondary-button" data-dismiss="modal" round>Cancel</el-button>
                  <el-button :color="primarycolor" :data-dismiss="dismissAddToGroupModal" @click="addMemberToGroup"
                    round>Save</el-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted, computed, nextTick, inject } from "vue";
import axios from "@/gateway/backendapi";
import router from "@/router/index";
import Dropdown from "primevue/dropdown";
import { useRoute } from "vue-router";
import Dialog from "primevue/dialog";
import finish from "../../services/progressbar/progress";
import setupService from "../../services/setup/setupservice";
import ImageForm from "../../components/membership/ImageForm.vue";
import SearchMembers from "../../components/membership/MembersSearch.vue";
import grousService from "../../services/groups/groupsservice";
import { useStore } from "vuex";
import allCustomFields from "../../services/customfield/customField";
import GroupTree from "../groups/component/GroupTree.vue";
import collector from "../../services/groupArray/mapTree";
import flatten from "../../services/groupArray/flatTree";
import deviceBreakpoint from "../../mixins/deviceBreakpoint";
import { ElMessage } from 'element-plus'

export default {
  components: {
    Dropdown,
    Dialog,
    ImageForm,
    SearchMembers,
    "group-tree": GroupTree,
  },

  setup() {
    const primarycolor = inject('primarycolor')
    const store = useStore();
    const showEventList = ref(false);
    const selectEventAttended = () => {
      showEventList.value = !showEventList.value;
    };
    const showError = ref(false);
    const newEvents = ref([]);

    const preventTying = (e) => {
      e.preventDefault();
    };

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
    const selectEvent = ref("");
    const validatePhone = ref("");
    const validateEmail = ref("");
    const newConvertPhone = ref("");
    const newConvertEmail = ref("");
    const routeToFRM = ref(false);
    const NewConvertInGroup = ref([]);
    const allGroups = ref([]);
    const groupToAddTo = ref({});
    const position = ref("");
    const addToGroupError = ref(false);
    const dismissAddToGroupModal = ref("");
    const dynamicCustomFields = ref([]);
    const searchGroupText = ref("");
    const searchRef = ref(null)
    const hideDiv = ref(true)
    const ruleForm = ref()
    const maritalStatusId = ref(null)
    const genderId = ref(null)
    const selectedTree = ref()
    const flattenedTree = ref([])
    const groupMappedTree = ref([])
    const sourceId = ref()
    const showAddInfo = ref(false)
    const customFileLoading = ref(false)
    const loadingtwo = ref(false)
    const { mdAndUp, lgAndUp, xlAndUp, xsOnly } = deviceBreakpoint()
    const createCatLoading = ref(false)

    const eventName = computed(() => {
      return newEvents.value.map((i) => i.name);
    });

    const filterEventCategory = computed(() => {
      let arr = [];
      if (newEvents.value.length > 0) {
        arr = newEvents.value.filter((i) => {
          return i.name.toLowerCase().includes(selectEvent.value.toLowerCase());
        });
      } else {
        return newEvents.value;
      }
      return arr;
    });

    const openModal = () => {
      displayModal.value = true;
    };

    const newEventCategoryName = ref("");

    const individualEvent = (obj) => {
      selectEvent.value = obj.name;
      newEvent.value.activity.eventCategoryId = obj.id;
      showCategory.value = false;
    };

    const birthMonth = ref();

    const hideCelebTab = ref(true);
    const hideAddInfoTab = ref(true);
    const showCelebTab = () => (hideCelebTab.value = !hideCelebTab.value);
    const showAddInfoTab = () => (hideAddInfoTab.value = !hideAddInfoTab.value);

    const loading = ref(false);

    const onSubmit = async () => {
      newConvertObj.value.genderId = selectedGender.value
        ? selectedGender.value.id
        : 0;
      newConvertObj.value.maritalStatusId = selectedMaritalStatus.value
        ? selectedMaritalStatus.value.id
        : 0;
      newConvertObj.value.activityId = selectedEventAttended.value
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
      newConvertObj.value.groups =
        NewConvertInGroup.value.length > 0
          ? NewConvertInGroup.value.map((i) => {
            return {
              groupId: i.groupId,
              position: i.position,
            };
          })
          : [];

      switch (birthMonth.value) {
        case "January":
          newConvertObj.value.birthMonth = "1";
          break;
        case "February":
          newConvertObj.value.birthMonth = "2";
          break;
        case "March":
          newConvertObj.value.birthMonth = "3";
          break;
        case "April":
          newConvertObj.value.birthMonth = "4";
          break;
        case "May":
          newConvertObj.value.birthMonth = "5";
          break;
        case "June":
          newConvertObj.value.birthMonth = "6";
          break;
        case "July":
          newConvertObj.value.birthMonth = "7";
          break;
        case "August":
          newConvertObj.value.birthMonth = "8";
          break;
        case "September":
          newConvertObj.value.birthMonth = "9";
          break;
        case "October":
          newConvertObj.value.birthMonth = "10";
          break;
        case "November":
          newConvertObj.value.birthMonth = "11";
          break;
        case "December":
          newConvertObj.value.birthMonth = "12";
          break;
        default:
          break;
      }

      newConvertObj.value.customAttributeDataString = JSON.stringify(dynamicCustomFields.value.map(
        (i) => {
          if (route.params.personId) {
            return {
              customAttributeID: i.id,
              data: i.data,
              entityID: route.params.personId,
              }
          } else {
            return {
              customAttributeID: i.id,
              data: i.data,
            }
          }
        }
      ));

      if (!routeToFRM.value) {
        loading.value = true;
      }

      if (route.query.id) {
        let updateMember = {
          firstName: newConvertObj.value.firstName,
          lastName: newConvertObj.value.lastName,
          phoneNumber: newConvertObj.value.phoneNumber,
          email: newConvertObj.value.email,
          activityId: newConvertObj.value.activityID,
          address: newConvertObj.value.address,
          birthday: newConvertObj.value.birthday,
          birthMonth: newConvertObj.value.birthMonth,
          birthYear: newConvertObj.value.birthYear,
          howDidYouAboutUsId: selectedAboutUsSource.value
            ? selectedAboutUsSource.value.id
            : "00000000-0000-0000-0000-000000000000",
          communicationMeans: newConvertObj.value.communicationMeans,
          interestedInJoining: newConvertObj.value.interestedInJoining,
          wantsToBeVisited: newConvertObj.value.wantToBeVisited,
          personId: newConvertObj.value.personId,
          sendEmail: newConvertObj.value.sendWelcomeEmail,
          sendSms: newConvertObj.value.sendWelcomeSMS,
        };

        if (newConvertObj.value.genderId)
          updateMember.genderId = newConvertObj.value.genderId;
        if (newConvertObj.value.maritalStatusId)
          updateMember.maritalStatusId = newConvertObj.value.maritalStatusId;

        try {
          const response = await axios.put(
            `/api/People/UpdateNewConvert`,
            updateMember
          );

          if (response.status === 200 || response.status === 201) {
            loading.value = false;
            loadingtwo.value = false;
            router.push("/tenant/firsttimerslist");
            ElMessage({
              type: 'success',
              message: "Your update was successful",
              duration: 3000
            })
            store.dispatch('membership/setNewConvertData');
          }
        } catch (err) {
          loading.value = false;
          loadingtwo.value = false;
          finish();
          if (err.toString().toLowerCase().includes("network error")) {
            ElMessage({
              type: 'warning',
              message: "Please ensure you have internet access",
              duration: 5000
            })
          } else {
            showError.value = true;
            ElMessage({
              type: 'warning',
              message: err.response && err.response.data.messsage ? err.response.data.messsage : "Update operation was not succesful",
              duration: 5000
            })
          }
          showError.value = true;
        }
      } else {
        axios
          .post("/api/People/AddNewConverts", newConvertObj.value)
          .then((res) => {
            console.log(res);
            finish();
            loading.value = false;
            loadingtwo.value = false;
            ElMessage({
              type: 'success',
              message: "New Convert created successfully",
              duration: 5000
            })
            store.dispatch('membership/setNewConvertData');
            store.dispatch('dashboard/getDashboard');

            if (!routeToFRM.value) {
              newConvertObj.value = {};
              selectedGender.value = {};
              selectedMaritalStatus.value = {};
              selectedEventAttended.value = {};
              selectedAboutUsSource.value = {};
              selectedCommunicationMeans.value = {};
              selectedJoinInterest.value = {};
              selectedVisitOption.value = {};
              birthMonth.value = "";

              validatePhone.value.classList.remove("is-valid");
              validateEmail.value.classList.remove("is-valid");
              validatePhone.value.classList.remove("is-invalid");
              validateEmail.value.classList.remove("is-invalid");
            } else {
              setTimeout(() => {
                router.push("/tenant/firsttimerslist");
                routeToFRM.value = false;
              }, 2000);
            }
          })
          .catch((err) => {
            finish();
            loading.value = false;
            loadingtwo.value = false;
            if (err.response && err.response.data) {
              ElMessage({
                type: 'warning',
                message: `${err.response.data}`,
                duration: 8000
              })
            } else {
              ElMessage({
                type: 'error',
                message: "Please ensure you have a strong internet connection",
                duration: 5000
              })
            }
            console.log(err.response);
          });
      }
    };

    const saveAndRoute = () => {
      loadingtwo.value = true
      routeToFRM.value = true;
      onSubmit();
    };

    const onCancel = () => {
      router.back();
    };

    const closeManualModalIfOpen = (e) => {
      if (!e.target.classList.contains("dd")) {
        showEventList.value = false;
        eventsSearchString.value = "";
      }
    };

    const eventsSearchString = ref("");
    const filteredEvents = computed(() => {
      if (!selectedEventAttended.value.name) return eventsAttended.value;
      return eventsAttended.value.filter((i) =>
        i.name.toLowerCase().includes(selectedEventAttended.value.name.toLowerCase())
      );
    });

    const eventAttendedSelected = (eventObj) => {
      selectedEventAttended.value = eventObj;
      showEventList.value = false;
      eventsSearchString.value = "";
    };

    const newEvent = ref({
      activity: {},
    });

    const invalidEventDetails = ref(false);
    const savingNewEvent = ref(false);
    const firstTimer = ref({});

    const createNewCat = async (eventParams) => {
      createCatLoading.value = true
      try {
        let data;
        const theText =
          eventParams === 1 ? selectEvent.value : newEventCategoryName.value;
        data = await axios.post(`/api/EventCategory?name=${theText}`);
        newEvents.value = data.data;

        createCatLoading.value = false
        displayModal.value = false;
        newEventCategoryName.value = "";

        ElMessage({
          type: 'success',
          message: 'Your event has been created succesfully',
          duration: 5000
        })
      } catch (error) {
        createCatLoading.value = false
        ElMessage({
          type: 'error',
          message: error.response.data,
          duration: 5000
        })
      }
    };

    const createNewEvent = async () => {
      invalidEventDetails.value = false;
      if (newEvent.value.activity.date) {
        try {
          savingNewEvent.value = true;
          const { data } = await axios.post(
            "/api/Events/CreateActivity",
            newEvent.value
          );
          selectedEventAttended.value.activityID = data.currentEvent.id;
          selectedEventAttended.value.name = data.currentEvent.name
            ? data.currentEvent.name
            : "New event selected";
          ElMessage({
            type: 'success',
            message: 'Your new event has been created successfully',
            duration: 5000
          })
        } catch (error) {
          if (error && error.response && error.response.data.includes("An Event with this name already exist")) {
            ElMessage({
              type: 'error',
              message: error.response.data,
              duration: 5000
            })
          }
          /*eslint no-undef: "warn"*/
          NProgress.done();
          savingNewEvent.value = false;
        }
      } else {
        invalidEventDetails.value = true;
      }

      displayModal.value = false;
    };
    const route = useRoute();
    const ftimerId = ref("");

    onMounted(() => {
      axios.get("/api/Events/EventActivity").then((res) => {
        eventsAttended.value = res.data;
      });

      axios.get("/api/EventCategory").then((res) => {
        newEvents.value = res.data.map((i) => {
          return { id: i.id, name: i.name };
        });
      });

      axios
        .get("/api/LookUp/GetAllLookUps")
        .then((res) => {
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

      axios.get("/api/membership/howyouheardaboutus").then((res) => {
        howDidYouAboutUs.value = res.data.map((i) => {
          return { name: i.name, id: i.id };
        });
      });

      if (route.query.id) {
        axios
          .get(`/api/People/NewConvert/${route.query.id}`)
          .then((res) => {
            ftimerId.value = res.data.personId;

            newConvertObj.value = res.data;
            newConvertObj.value.sendWelcomeSMS = res.data.sendSms;
            newConvertObj.value.sendWelcomeEmail = res.data.sendEmail;
            newConvertEmail.value = res.data.email
            newConvertPhone.value = res.data.phoneNumber

            selectedGender.value = res.data.genderId
              ? genderArr.value.find((i) => i.id === res.data.genderId)
              : {};

            selectedMaritalStatus.value = res.data.maritalStatusId
              ? maritalStatusArr.value.find(
                (i) => i.id === res.data.maritalStatusId
              )
              : {};

            selectedAboutUsSource.value = getUserSource(
              res.data.howDidYouAboutUsId
            );

            selectedCommunicationMeans.value = res.data.communicationMeans
              ? comMeansArr.value[res.data.communicationMeans - 1]
              : "";

            selectedJoinInterest.value = res.data.interestedInJoining
              ? joinInterestArr.value[res.data.interestedInJoining - 1]
              : "";

            selectedVisitOption.value = res.data.wantsToBeVisited
              ? wantVisitArr.value[res.data.wantsToBeVisited - 1]
              : "";

            newConvertObj.value.birthday = res.data.birthday
              ? Number(res.data.birthday)
              : "";

            newConvertObj.value.birthYear = res.data.birthYear
              ? +res.data.birthYear
              : "";

            birthMonth.value = res.data.birthMonth
              ? month.value[Number(res.data.birthMonth) - 1]
              : "";

            selectedEventAttended.value = getEventUserAttended(
              res.data.activityID
            );
          })
          .catch((err) => {
            finish();
            console.log(err);
            ElMessage({
              type: 'error',
              message: "Unable to get person details, ensure you have a strong network connection",
              duration: 6000
            })
          });
      }
    });

    const getUserSource = (sourceId) => {
      if (
        sourceId &&
        howDidYouAboutUs.value &&
        howDidYouAboutUs.value.length > 0
      )
        return howDidYouAboutUs.value.find((i) => i.id === sourceId);
      if (!sourceId) {
        axios.get("/api/membership/howyouheardaboutus").then((res) => {
          howDidYouAboutUs.value = res.data.map((i) => {
            return { name: i.name, id: i.id };
          });
          return howDidYouAboutUs.value.find(
            (i) => i.id === res.data.howDidYouAboutUsId
          );
        });
      } else {
        return null;
      }
    };

    const getEventUserAttended = (userEventId) => {
      if (!userEventId) return {};
      if (eventsAttended.value && eventsAttended.value.length > 0)
        return eventsAttended.value.find((i) => i.activityID === userEventId);
      axios.get("/api/Events/EventActivity").then((res) => {
        eventsAttended.value = res.data;
        return eventsAttended.value.find((i) => i.activityID === userEventId);
      });
    };

    const year = computed(() => {
      const arrOfYears = [];
      let currentYear = new Date().getFullYear();
      while (arrOfYears.length <= 100) {
        arrOfYears.push(currentYear);
        currentYear = currentYear - 1;
      }
      return arrOfYears;
    });

    const checkForDuplicatePhone = async (rule, value, callback) => {
      if (newConvertObj.value.phoneNumber !== newConvertPhone.value) {
        try {
          let { data } = await axios.get(
            `api/People/checkDuplicate?phoneNumber=${newConvertObj.value.phoneNumber}`
          );
          if (data === "phone number") {
            return callback(new Error('Phone number already exist, try another'))
          } else if (data === "email and phone number") {
            return callback(new Error('Phone number and email already exist, try another'))
          }
        } catch (error) {
          console.error(error);
        }
      }
    };

    const checkForDuplicateEmail = async (rule, value, callback) => {
      if (newConvertObj.value.email !== newConvertEmail.value) {
        try {
          let { data } = await axios.get(
            `api/People/checkDuplicate?email=${newConvertObj.value.email}`
          );
          if (data === "email") {
            return callback(new Error('Email already exist, try another'))
          } else if (data === "email and phone number") {
            return callback(new Error('Email and phone number already exist, try another'))
          }
        } catch (error) {
          console.log(error);
        }
      }
    };

    const validateRules = reactive({
      email: [
        { validator: checkForDuplicateEmail, required: false, trigger: 'blur' },
      ],
      phoneNumber: [
        { validator: checkForDuplicatePhone, required: true, trigger: 'blur' },
      ],
    })

    const imageSelected = async(e) => {
      url.value = URL.createObjectURL(e.target.files[0]);
      await uploadImage(e)
      console.log(url.value)
    }

    const setContact = (payload) => {
      if (!payload.email) {
        ElMessage({
          type: 'warning',
          message: "This contact does not have any email records, communicate with this person to create him as a user",
          duration: 15000
        })
      }
      newConvertObj.value.contactOwnerId = payload.id;
    };

    const getGroups = async () => {
      try {
        let groups = store.getters["groups/groups"];
        if (groups && groups.length > 0) {
          allGroups.value = groups;
          let data = { children: allGroups.value }
          const { children } = collector(data);
          groupMappedTree.value = children
          if (groupMappedTree.value && groupMappedTree.value.length > 0) {
            flattenedTree.value = groupMappedTree.value.flatMap(flatten());
          }
          return true;
        }
        else {
          let group = await grousService.getGroups();
          if (group.response.groupResonseDTO) {
            allGroups.value = group.response.groupResonseDTO;
            let data = { children: allGroups.value }
            const { children } = collector(data);
            groupMappedTree.value = children
            if (groupMappedTree.value && groupMappedTree.value.length > 0) {
              flattenedTree.value = groupMappedTree.value.flatMap(flatten());
            }
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
      NewConvertInGroup.value.push({
        name: groupToAddTo.value.name,
        groupId: groupToAddTo.value.id,
        position: position.value,
      });

      groupToAddTo.value = {};
      position.value = "";
    };

    const setSelectedGroup = (item) => {
      groupToAddTo.value = item;
    };

    const getAllCustomFields = async () => {
      try {
        let data = await allCustomFields.allCustomFields();
        dynamicCustomFields.value = data.filter((i) => i.entityType === 2);
      } catch (err) {
        console.log(err);
      }
    };
    getAllCustomFields();

    const searchAllGroups = computed(() => {
      if (!searchGroupText.value && allGroups.value > 0) return allGroups.value
      return allGroups.value.filter(i => {
        if (i.name) return i.name.toLowerCase().includes(searchGroupText.value.toLowerCase())
      })
    })

    const setGroupProp = () => {
      hideDiv.value = !hideDiv.value;
      nextTick(() => {
        searchRef.value.focus()
      })
    };

    const hideGroupModal = (e) => {
      if (!e.target.classList.contains("exempt-hide")) {
        hideDiv.value = true
      }
    }

    const setSelectedMaritalStatus = () => {
      selectedMaritalStatus.value = maritalStatusArr.value.find(i => {
        return i.id == maritalStatusId.value
      })
    }

    const setSelectedGender = () => {
      selectedGender.value = genderArr.value.find(i => {
        return i.id == genderId.value
      })
    }

    const setGroupValue = () => {
      const response = flattenedTree.value.find(i => i.value == selectedTree.value)
      groupToAddTo.value = {
        name: response.label,
        id: response.value
      }
    }

    const filterNodeMethod = (value, data) => data.label.toLowerCase().includes(value.toLowerCase())

    const setSelectedSource = () => {
      selectedAboutUsSource.value = howDidYouAboutUs.value.find(i => {
        return i.id === sourceId.value
      })
    }

    const url = ref("")

    const uploadImage = async (e, index) => {
      customFileLoading.value = true
      let formData = new FormData()
      formData.append("mediaFileImage", e.target.files[0])

      try {
        await axios.post("/api/Media/UploadProfilePicture", formData).then(res => {
          if (index) {
              customFileLoading.value = false
              dynamicCustomFields.value[index].data = res.data.pictureUrl
            }
            newConvertObj.value.imageUrl = res.data.pictureUrl;
        })
      }
      catch (err) {
        console.error(err)
        customFileLoading.value = false
      }
    }

    return {
      onSubmit,
      onCancel,
      newConvertObj,
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
      showAddInfoTab,
      hideAddInfoTab,
      birthMonth,
      showEventList,
      selectEventAttended,
      closeManualModalIfOpen,
      filteredEvents,
      eventsSearchString,
      eventAttendedSelected,
      preventTying,
      newEvent,
      createNewEvent,
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
      createNewCat,
      newEventCategoryName,
      selectEvent,
      individualEvent,
      checkForDuplicatePhone,
      checkForDuplicateEmail,
      validatePhone,
      validateEmail,
      newConvertPhone,
      newConvertEmail,
      routeToFRM,
      saveAndRoute,
      setContact,
      NewConvertInGroup,
      allGroups,
      groupToAddTo,
      position,
      addToGroupError,
      dismissAddToGroupModal,
      addMemberToGroup,
      setSelectedGroup,
      dynamicCustomFields,
      searchAllGroups,
      searchRef,
      setGroupProp,
      hideDiv,
      hideGroupModal,
      ruleForm,
      validateRules,
      maritalStatusId,
      genderId,
      setSelectedMaritalStatus,
      setSelectedGender,
      selectedTree,
      setGroupValue,
      flattenedTree,
      filterNodeMethod,
      groupMappedTree,
      sourceId,
      setSelectedSource,
      showAddInfo,
      uploadImage,
      customFileLoading,
      loadingtwo,
      xlAndUp,
      mdAndUp,
      lgAndUp,
      createCatLoading,
      imageSelected,
      url,
      primarycolor
    };
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.input-width {
  width: 100%
}

.input-width {
  width: 100%
}

@media (min-width: 992px) {
  .input-width {
    width: 350px
  }

}


@media (min-width: 576px) {
  .modal-dialog {
    max-width: 650px;
    margin: 1.75rem auto;
    /* padding: 32px; */
  }

  .dropdown-menu {
    max-height: 300px;
    overflow: scroll;
    box-shadow: 0 2px 4px -1px rgb(0 0 0 / 20%), 0 4px 5px 0 rgb(0 0 0 / 14%),
      0 1px 10px 0 rgb(0 0 0 / 12%);
  }
}

.div-card {
  position: absolute;
  background: white;
  z-index: 1;
  width: 100%;
  box-shadow: 0 0 11px rgba(33, 33, 33, 0.2);
  max-height: 400px;
  overflow: scroll;
}

.menu-height {
  max-height: 400px;
  overflow: scroll;
}

.tb-icon-span {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #dde2e6;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  opacity: 0.5;
}
</style>
