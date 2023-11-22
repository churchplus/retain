<template>
  <div>
    <div class="head-text">
      <div>Add Contact</div>
    </div>

    <el-row class="mt-4 bg-white p-3">
      <el-col :md="16">
        <el-form :model="person" @keyup.enter="addPerson" style="width: 100%">
          <el-form-item>
            <el-input
              type="text"
              class="w-100"
              v-model="person.firstName"
              placeholder="Enter first name"
            />
          </el-form-item>
          <el-form-item>
            <el-input
              type="text"
              class=""
              v-model="person.lastName"
              placeholder="Enter last name"
            />
          </el-form-item>
          <el-form-item>
            <vue-tel-input
              style="height: 40px"
              class="w-100"
              v-model="person.mobilePhone"
              mode="international"
            ></vue-tel-input>
          </el-form-item>
          <el-form-item>
            <el-input
              type="text"
              class=""
              v-model="person.email"
              placeholder="Enter email address"
            />
          </el-form-item>
          <el-form-item>
            <div class="d-flex flex-column w-100">
              <div class="d-flex">
                <el-tabs class="card-border w-100">
                  <div class="add-group bg-white">
                    <div v-for="(item, index) in peopleInGroupIDs" :key="index">
                      <div class="d-flex justify-content-between align-items-center">
                        <div class="pt-1">
                          <span class="text-secondary">{{ index + 1 }}.</span> &nbsp;
                          <span class="font-weight-700">{{ item.name }}</span>
                        </div>
                        <el-icon
                          class="text-danger"
                          @click="showConfirmModal(index, item)"
                          ><CircleClose
                        /></el-icon>
                      </div>
                    </div>
                    <div v-if="peopleInGroupIDs.length === 0">
                      No segment selected yet
                    </div>
                    <div
                      class="pt-2 mt-2 font-weight-700 text-primary border-top text-center c-pointer"
                      data-toggle="modal"
                      data-target="#addToGroup"
                    >
                      Add contact to segment
                    </div>
                  </div>
                </el-tabs>
              </div>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button
              :loading="loading"
              :disabled="loading || !person.firstName"
              :color="primarycolor"
              class="w-100"
              @click="addPerson"
              size="large"
              >Save</el-button
            >
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <!-- Group Modal -->
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
              Add to contact segment
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              ref="closeAddToGroup"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row my-4"></div>
            <div class="row my-4">
              <div class="col-md-4 text-md-right">
                <label for="" class="font-weight-600">Name</label>
              </div>
              <div class="col-md-7">
                <el-tree-select
                  v-model="selectedTree"
                  class="w-100"
                  placeholder="Select segment"
                  :data="groupMappedTree"
                  :render-after-expand="false"
                  :filter-node-method="filterNodeMethod"
                  @change="setGroupValue"
                  filterable
                  check-strictly
                />
              </div>
            </div>
            <!-- <div class="row">
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
            </div> -->

            <div class="row">
              <div class="col-md-4">
                <label for="" class="font-weight-600"></label>
              </div>

              <div class="col-md-7">
                <div class="col-md-12 mt-3 text-center">
                  <p class="my-1 text-danger" v-if="addToGroupError">
                    Please select a segment
                  </p>
                </div>
                <div class="col-12 p-0">
                  <div class="d-flex justify-content-end">
                    <el-button
                      ref="closegroupmodal"
                      class="secondary-button"
                      data-dismiss="modal"
                      round
                      >Cancel</el-button
                    >
                    <el-button
                      :color="primarycolor"
                      :loading="addToGroupLoading"
                      :data-dismiss="dismissAddToGroupModal"
                      @click="addMemberToGroup"
                      round
                      >Save</el-button
                    >
                  </div>
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
import moment from "moment";
import { ref, reactive, computed, inject } from "vue";
import router from "@/router/index";
import axios from "@/gateway/backendapi";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import membershipService from "../../services/membership/membershipservice";
import grousService from "../../services/groups/groupsservice";
import allCustomFields from "../../services/customfield/customField";
import { ElMessage, ElMessageBox } from "element-plus";
import collector from "../../services/groupArray/mapTree";
import flatten from "../../services/groupArray/flatTree";
export default {
  setup() {
    const primarycolor = inject("primarycolor");
    const store = useStore();
    const hideCelebTab = ref(false);
    const hideAddInfoTab = ref(true);
    const showCelebTab = () => (hideCelebTab.value = !hideCelebTab.value);
    const showAddInfoTab = () => (hideAddInfoTab.value = !hideAddInfoTab.value);
    const routeParams = ref("");
    const peopleInGroupIDs = ref([]);
    const followupPerson = ref({});
    const currentContact = ref({});
    const personNotes = ref([]);
    const noteDetails = ref({});
    const searchGroupText = ref("");
    const closeAddToGroup = ref(null);
    const memberClassificationId = ref(null);
    const maritalStatusId = ref(null);
    const genderId = ref(null);
    const showCelebration = ref(true);
    const showAddInfo = ref(false);
    const ageGroupId = ref(null);
    const customFileLoading = ref(false);
    const selectedTree = ref();
    const groupMappedTree = ref([]);
    const flattenedTree = ref([]);
    const addToGroupLoading = ref(false);
    const loading = ref(false);
    const months = [
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
    ];
    const birthMonth = ref(1);
    const birthDay = ref(1);
    const birthYear = ref(1922);
    const startingYear = 1920;
    const numberofYears = 100;
    const birthDate = moment();
    const daysInBirthMonth = ref(birthDate.daysInMonth());
    const daysinMonth = ref([
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23,
      24,
      25,
      26,
      27,
      28,
      29,
      30,
      31,
    ]);
    const birthDaysArr = computed(() => {
      return daysinMonth.value;
    });
    const birthYearsArr = computed(() => {
      const arrOfYears = [];
      let currentYear = new Date().getFullYear();
      while (arrOfYears.length <= 100) {
        arrOfYears.push(currentYear);
        currentYear = currentYear - 1;
      }
      return arrOfYears;
    });

    const editBirthDateValue = (unit, val) => {
      birthDate.set(unit, val);
      daysInBirthMonth.value = birthDate.daysInMonth();
      updateBirthDateElements();
    };

    const updateBirthDateElements = () => {
      birthMonth.value = birthDate.month();
      birthDay.value = birthDate.date();
      birthYear.value = birthDate.format("YYYY");
    };

    const annMonth = ref(null);
    const annDay = ref(null);
    const annYear = ref(null);

    const anniversaryDate = moment();
    const daysInAnnMonth = ref(anniversaryDate.daysInMonth());
    const annDaysArr = computed(() => {
      return daysinMonth.value;
    });

    const editAnnDateValue = (unit, val) => {
      anniversaryDate.set(unit, val);
      daysInAnnMonth.value = anniversaryDate.daysInMonth();
      updateAnnDateElements();
    };

    const updateAnnDateElements = () => {
      annMonth.value = anniversaryDate.month();
      annDay.value = anniversaryDate.date();
      annYear.value = anniversaryDate.format("YYYY");
    };

    let url = ref("");
    let image = ref("");
    const imageSelected = (e) => {
      image.value = e.target.files[0];
      url.value = URL.createObjectURL(image.value);
      memberToEdit.value.pictureUrl = URL.createObjectURL(image.value);
    };

    //Person
    const peopleClassifications = ref([]); //null
    const selectedMembership = ref(null);
    let person = reactive({
      monthOfBirth: null,
      dayOfBirth: null,
      yearOfBirth: null,
      monthOfWedding: null,
      dayOfWedding: null,
      yearOfWedding: null,
    });

    const errMessage = ref("");
    const showError = ref(false);

    const addPerson = async () => {
      const personObj = { ...person };
      errMessage.value = "";

      const formData = new FormData();
      formData.append("firstName", personObj.firstName ? personObj.firstName : "");
      formData.append("lastName", personObj.lastName ? personObj.lastName : "");
      formData.append(
        "mobilePhone",
        personObj.mobilePhone ? personObj.mobilePhone.trim().replaceAll(" ", "") : ""
      );
      formData.append("email", personObj.email ? personObj.email : "");

      formData.append(
        "personGroups",
        peopleInGroupIDs.value.length > 0
          ? JSON.stringify(
              peopleInGroupIDs.value.map((i) => {
                delete i.name;
                return i;
              })
            )
          : []
      );

      if (route.params.personId) {
        try {
          loading.value = true;
          const response = await axios.put(
            `/api/People/UpdatePerson/${route.params.personId}`,
            formData
          );
          if (response.status === 200 || response.status === 201) {
            loading.value = false;
            store.dispatch("dashboard/getDashboard");
            store.dispatch("membership/setMembers").then(() => {
              router.push("/tenant/people");
            });
          }
        } catch (err) {
          console.log(err);
          loading.value = false;
          if (err.toString().toLowerCase().includes("network error")) {
            ElMessage({
              type: "warning",
              message: "Please ensure you have internet access",
              duration: 5000,
            });
          } else if (err.toString().toLowerCase().includes("timeout")) {
            ElMessage({
              type: "warning",
              message: "Request took too long to respond",
              duration: 5000,
            });
          } else {
            showError.value = true;
            errMessage.value =
              err.response && err.response.data.messsage
                ? err.response.data.messsage
                : "Update operation was not succesfull";
            ElMessage({
              type: "warning",
              message: errMessage.value ? errMessage.value : "Update operation failed",
              duration: 5000,
            });
          }
          showError.value = true;
          console.log(err.response);
        }
      } else {
        try {
          loading.value = true;
          let response = await axios.post("/api/people/createperson", formData);

          if (response.status === 200 || response.status === 201) {
            // membershipService.addPersonToStore(response.data.person);

            loading.value = false;
            store.dispatch("dashboard/getDashboard");
            store.dispatch("membership/setMembers").then(() => {
              router.push("/tenant/people");
            });
          }
        } catch (err) {
          console.log(err);
          loading.value = false;
          // NProgress.done();
          if (err.toString().toLowerCase().includes("network error")) {
            ElMessage({
              type: "warning",
              message: "Please ensure you have internet access",
              duration: 5000,
            });
          } else {
            showError.value = true;
            loading.value = false;
            if (err.response && err.response.status === 400) {
              errMessage.value = err.response.data.message;
              ElMessage({
                type: "warning",
                message: errMessage.value ? errMessage.value : "Save operation failed",
                duration: 5000,
              });
            }
          }
        }
      }
    };

    let genders = ref(store.getters["lookups/genders"]);
    let maritalStatus = ref(store.getters["lookups/maritalStatus"]);
    let ageGroups = ref(store.getters["lookups/ageGroups"]);
    let memberships = ref(store.getters["lookups/peopleClassifications"]);

    const selectedMaritalStatus = ref(null);
    const selectedGender = ref(null);
    const selectedAgeGroup = ref(null);

    const dynamicCustomFields = ref([]);

    const getLookUps = () => {
      axios
        .get("/api/LookUp/GetAllLookUps")
        .then((res) => {
          genders.value = res.data.find((i) => i.type.toLowerCase() === "gender").lookUps;

          maritalStatus.value = res.data.find(
            (i) => i.type.toLowerCase() === "maritalstatus"
          ).lookUps;
        })
        .catch((err) => console.log(err.response));
    };

    const getPeopleClassifications = async () => {
      try {
        const response = await axios.get("/api/Settings/GetTenantPeopleClassification");
        const { data } = response;
        memberships.value = data;
        peopleClassifications.value = data.map((i) => i.name);
        getPersonPeopleClassificationId();
      } catch (err) {
        if (err.response && err.response.status === 401) {
          localStorage.removeItem("token");

          router.push("/");
        }
        console.log(err);
      }
    };

    const getAgeGroups = () => {
      axios
        .get("/api/Settings/GetTenantAgeGroups")
        .then((res) => {
          ageGroups.value = res.data.sort((a, b) => a.order - b.order);
          getPersonAgeGroupId();
        })
        .catch((err) => console.log(err.response));
    };

    if (!genders.value || genders.value.length === 0) getLookUps();
    if (!ageGroups.value || ageGroups.value.length === 0) getAgeGroups();

    const gendersArr = computed(() => {
      return genders.value.map((i) => i.value);
    });
    const maritalStatusArr = computed(() => {
      return maritalStatus.value.map((i) => i.value);
    });

    const route = useRoute();
    const memberToEdit = ref({});

    const getPersonGenderId = () => {
      if (memberToEdit.value && memberToEdit.value.personId) {
        if (genders.value && genders.value.length > 0) {
          selectedGender.value = genders.value.find(
            (i) => i.id === memberToEdit.value.genderID
          );
          if (memberToEdit.value.genderID) {
            genderId.value = genders.value.find(
              (i) => i.id === memberToEdit.value.genderID
            ).id;
          }
        } else {
          getLookUps();
        }
      }
    };

    const getPersonMaritalStatusId = () => {
      if (memberToEdit.value && memberToEdit.value.personId) {
        selectedMaritalStatus.value = maritalStatus.value.find(
          (i) => i.id === memberToEdit.value.maritalStatusID
        );

        if (memberToEdit.value.maritalStatusID) {
          maritalStatusId.value = maritalStatus.value.find(
            (i) => i.id === memberToEdit.value.maritalStatusID
          ).id;
        }
      }
    };

    const getPersonPeopleClassificationId = () => {
      if (memberToEdit.value && memberToEdit.value.personId) {
        if (memberships.value && memberships.value.length > 0) {
          selectedMembership.value = memberships.value.find(
            (i) => i.id === memberToEdit.value.peopleClassificationID
          );
          if (memberToEdit.value.peopleClassificationID) {
            memberClassificationId.value = memberships.value.find(
              (i) => i.id === memberToEdit.value.peopleClassificationID
            ).id;
          }
        } else {
          getPeopleClassifications();
        }
      }
    };

    const getPersonAgeGroupId = () => {
      if (memberToEdit.value && memberToEdit.value.personId) {
        if (ageGroups.value && ageGroups.value.length > 0) {
          selectedAgeGroup.value = ageGroups.value.find(
            (i) => i.id === memberToEdit.value.ageGroupID
          );
          if (memberToEdit.value.ageGroupID) {
            ageGroupId.value = ageGroups.value.find(
              (i) => i.id === memberToEdit.value.ageGroupID
            ).id;
          }
        } else {
          getAgeGroups();
        }
      }
    };

    const populatePersonDetails = async (data) => {
      person.firstName = data.firstName;
      person.email = data.email;
      person.lastName = data.lastName;
      person.firstName = data.firstName;
      person.mobilePhone = data.mobilePhone ? data.mobilePhone : "";
      person.address = data.homeAddress;
      person.occupation = data.occupation;
      person.dayOfBirth = data.dayOfBirth == 0 ? null : data.dayOfBirth;
      person.monthOfBirth = data.monthOfBirth ? months[data.monthOfBirth - 1] : null;
      person.dayOfWedding = data.dayOfWedding == 0 ? null : data.dayOfWedding;
      person.yearOfBirth = data.yearOfBirth == 0 ? null : data.yearOfBirth;
      person.monthOfWedding = data.monthOfWedding
        ? months[data.monthOfWedding - 1]
        : null;
      person.yearOfWedding = data.yearOfWedding == 0 ? null : data.yearOfWedding;
      peopleInGroupIDs.value = data.personSpecificGroups.map((i) => {
        return {
          groupId: i.id,
          name: i.name,
          personInGroupID: i.personInGroupID,
        };
      });
      currentContact.value = {
        name: `${data.followupPersonName}`,
        id: data.followupPersonID,
      };
      dynamicCustomFields.value = data.customAttributeData.map((i) => {
        i.customAttribute.data =
          i.data == "true" ? true : i.data == "false" ? false : i.data;
        i.customAttribute.entityID = i.entityID;
        return i.customAttribute;
      });

      if (dynamicCustomFields.value.length === 0) {
        getCustomFields();
      }
    };

    const getMemberToEdit = () => {
      membershipService.getMemberById(route.params.personId).then((res) => {
        memberToEdit.value = res;
        populatePersonDetails(res);
        getPersonGenderId();
        getPersonMaritalStatusId();
        getPersonPeopleClassificationId();
        getPersonAgeGroupId();
        routeParams.value = route.params.personId;
      });
    };

    if (route.params.personId) {
      getMemberToEdit(route.params.personId);
    }

    const areaInView = ref("groups");
    const position = ref("");
    const groupToAddTo = ref({});
    const allGroups = ref([]);

    const setGroupValue = () => {
      const response = flattenedTree.value.find((i) => i.value == selectedTree.value);
      groupToAddTo.value = {
        name: response.label,
        id: response.value,
      };
    };

    const getGroups = async () => {
      try {
        let groups = store.getters["groups/groups"];
        if (groups && groups.length > 0) {
          allGroups.value = groups;
        } else {
          let group = await grousService.getGroups();
          if (group.response && group.response.groupResonseDTO) {
            allGroups.value = group.response.groupResonseDTO;
          }
        }
        let data = { children: allGroups.value };
        const { children } = collector(data);
        groupMappedTree.value = children;
        if (groupMappedTree.value && groupMappedTree.value.length > 0) {
          flattenedTree.value = groupMappedTree.value.flatMap(flatten());
        }
      } catch (error) {
        console.log(error);
      }
    };

    getGroups();

    const addToGroupError = ref(false);
    const dismissAddToGroupModal = ref("");
    const closegroupmodal = ref(null);

    const addMemberToGroup = async () => {
      let groupObj = groupToAddTo.value;
      addToGroupError.value = false;
      if (!groupToAddTo.value || !groupToAddTo.value.id) {
        addToGroupError.value = true;
        return false;
      }
      if (route.params.personId) {
        addToGroupLoading.value = true;
        let personInfo = {
          people: [
            {
              groupId: groupToAddTo.value.id,
              // position: position.value,
              personId: route.params.personId,
            },
          ],
        };

        try {
          await membershipService.addMemberToGroup(personInfo, groupToAddTo.value.id);
          ElMessage({
            type: "success",
            message: `${person.firstName} is added to ${groupToAddTo.value.name}`,
            duration: 5000,
          });
          addToGroupLoading.value = false;
          dismissAddToGroupModal.value = "modal";
          closegroupmodal.value.ref.click();

          peopleInGroupIDs.value.push({
            name: groupObj.name,
            groupId: groupObj.id,
            position: position.value,
          });

          selectedTree.value = "";
          groupToAddTo.value = {};
          position.value = "";
        } catch (error) {
          console.log(error);
          addToGroupLoading.value = false;
        }
      } else {
        peopleInGroupIDs.value.push({
          name: groupObj.name,
          groupId: groupObj.id,
          // position: position.value,
        });
        groupToAddTo.value = {};
        groupObj = {};
        position.value = "";
        dismissAddToGroupModal.value = "modal";
      }
    };

    const setContact = (payload) => {
      if (!payload.email) {
        ElMessage({
          type: "warning",
          message:
            "This contact does not have any email, communicate with this person to create him as a user",
          duration: 10000,
        });
      }
      followupPerson.value = payload;
    };

    const removeFromGroup = (index, item) => {
      if (!route.params.personId) {
        peopleInGroupIDs.value.splice(index, 1);
      } else {
        let body = {
          groupId: item.groupId,
          personIds: [item.personInGroupID],
        };

        grousService
          .removeFromGroup(item.groupId, body)
          .then((res) => {
            if (res !== false) {
              peopleInGroupIDs.value.splice(index, 1);
              ElMessage({
                type: "success",
                message: `${person.firstName} is removed from ${item.name} group`,
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    };

    const showConfirmModal = (index, item) => {
      ElMessageBox.confirm("Are you sure you want to proceed?", "Confirm delete", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        type: "error",
      })
        .then(() => {
          removeFromGroup(index, item);
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "Delete canceled",
          });
        });
    };

    const savePersonNote = () => {
      personNotes.value.push({
        title: noteDetails.value.noteTitle,
        description: noteDetails.value.noteDesc,
      });
      noteDetails.value = {};
      dismissAddToGroupModal.value = "modal";
    };

    const searchAllGroups = computed(() => {
      if (!searchGroupText.value && allGroups.value > 0) return allGroups.value;
      return allGroups.value.filter((i) => {
        if (i.name)
          return i.name.toLowerCase().includes(searchGroupText.value.toLowerCase());
      });
    });

    const getCustomFields = async () => {
      try {
        let data = await allCustomFields.allCustomFields();
        dynamicCustomFields.value = data
          .filter((i) => i.entityType === 0)
          .sort((a, b) => a.order - b.order);
      } catch (err) {
        console.log(err);
      }
    };
    if (!route.params.personId) getCustomFields();

    const setCloseGroupModal = () => {
      closeAddToGroup.value.click();
    };

    const setSelectedMem = () => {
      selectedMembership.value = memberships.value.find((i) => {
        return i.id == memberClassificationId.value;
      });
    };

    const setSelectedMaritalStatus = () => {
      selectedMaritalStatus.value = maritalStatus.value.find((i) => {
        return i.id == maritalStatusId.value;
      });
    };

    const setSelectedGender = () => {
      selectedGender.value = genders.value.find((i) => {
        return i.id == genderId.value;
      });
    };

    const setSelectedAgeGroup = () => {
      selectedAgeGroup.value = ageGroups.value.find((i) => {
        return i.id == ageGroupId.value;
      });
    };

    const uploadImage = (e, index) => {
      customFileLoading.value = true;
      let formData = new FormData();
      formData.append("mediaFileImage", e.target.files[0]);

      axios
        .post("/api/Media/UploadProfilePicture", formData)
        .then((res) => {
          customFileLoading.value = false;
          dynamicCustomFields.value[index].data = res.data.pictureUrl;
        })
        .catch((err) => {
          customFileLoading.value = false;
          console.log(err);
        });
    };

    const filterNodeMethod = (value, data) =>
      data.label.toLowerCase().includes(value.toLowerCase());

    return {
      months,
      numberofYears,
      startingYear,
      daysInBirthMonth,
      daysInAnnMonth,
      editBirthDateValue,
      editAnnDateValue,
      birthMonth,
      birthDay,
      birthYear,
      annMonth,
      annDay,
      annYear,
      areaInView,
      person,
      addPerson,
      peopleClassifications,
      url,
      memberToEdit,
      imageSelected,
      uploadImage,
      loading,
      birthDaysArr,
      birthYearsArr,
      annDaysArr,
      daysinMonth,
      errMessage,
      hideCelebTab,
      showCelebTab,
      hideAddInfoTab,
      showAddInfoTab,
      genders,
      maritalStatus,
      gendersArr,
      maritalStatusArr,
      selectedMaritalStatus,
      selectedGender,
      selectedMembership,
      memberships,
      selectedAgeGroup,
      ageGroups,
      getAgeGroups,
      showError,
      groupToAddTo,
      position,
      allGroups,
      addMemberToGroup,
      addToGroupError,
      dismissAddToGroupModal,
      closegroupmodal,
      routeParams,
      peopleInGroupIDs,
      setContact,
      followupPerson,
      currentContact,
      removeFromGroup,
      personNotes,
      noteDetails,
      savePersonNote,
      searchGroupText,
      searchAllGroups,
      showConfirmModal,
      closeAddToGroup,
      setCloseGroupModal,
      dynamicCustomFields,
      memberClassificationId,
      setSelectedMem,
      maritalStatusId,
      genderId,
      setSelectedMaritalStatus,
      setSelectedGender,
      showCelebration,
      showAddInfo,
      setSelectedAgeGroup,
      ageGroupId,
      customFileLoading,
      groupMappedTree,
      selectedTree,
      filterNodeMethod,
      setGroupValue,
      flattenedTree,
      addToGroupLoading,
      primarycolor,
    };
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.modal-lg {
  max-width: 600px;
}

.input-width {
  width: 100%;
}

@media (min-width: 992px) {
  .input-width {
    width: 350px;
  }

  .related-info {
    width: 137px;
  }
}

.angle-icon {
  border: 1px solid #dde2e6;
  padding: 2px;
  border-radius: 50%;
  height: 30px;
  width: 30px;
  color: #91949c;
}
</style>
