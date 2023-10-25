<template>
  <div class="container-fluid container-top">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-8">
          <div class="heading-text">Add branch</div>
          <div class="row my-2 mt-2">
            <div class="col-md-10 offset-md-2">
              <div class="row">
                <div class="col-md-4 text-md-right align-self-center">
                  <label for="" class=""
                    >Branch name <sup class="text-danger">*</sup>
                  </label>
                </div>

                <div class="col-md-8">
                  <el-input
                    type="text"
                    v-model="churchName"
                    class="w-100"
                    :class="{ 'is-invalid': !isNameValid }"
                    @blur="checkNameValue"
                  />
                  <div class="invalid-feedback">Please enter branch name.</div>
                </div>
              </div>
            </div>
          </div>
          <div class="row my-1 mt-2">
            <div class="col-md-10 offset-md-2">
              <div class="row">
                <div class="col-md-4 text-md-right align-self-center">
                  <label for="" class="">Address </label>
                </div>

                <div class="col-md-8">
                  <el-input type="text" v-model="Address" class="w-100" />
                </div>
              </div>
            </div>
          </div>
          <div class="row my-1 mt-2">
            <div class="col-md-10 offset-md-2">
              <div class="row">
                <div class="col-md-4 text-md-right align-self-center">
                  <label for="" class=""
                    >Parent Branch <sup class="text-danger">*</sup>
                  </label>
                </div>
                <div class="col-md-8">
                  <el-tree-select
                    v-model="value"
                    class="w-100"
                    :data="branches"
                    :check-strictly="false"
                    :render-after-expand="false"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="heading-text">Pastor</div>
          <div class="row my-1 mt-2">
            <div class="col-md-10 offset-md-2">
              <div class="row">
                <div class="col-md-4 text-md-right align-self-center">
                  <label for="" class="">Pastor name </label>
                </div>

                <div class="col-md-8">
                  <el-input
                    type="text"
                    v-model="pastorName"
                    class="w-100"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="row my-1 mt-2">
            <div class="col-md-10 offset-md-2">
              <div class="row">
                <div class="col-md-4 text-md-right align-self-center">
                  <label for="" class=""
                    >Pastor email <sup class="text-danger">*</sup>
                  </label>
                </div>

                <div class="col-md-8">
                  <el-input
                    type="text"
                    v-model="pastorEmail"
                    class="w-100"
                    :class="{ 'is-invalid': !isEmailValid }"
                    @blur="checkEmailValue"
                  />
                  <div class="invalid-feedback">Please enter your email.</div>
                </div>
              </div>
            </div>
          </div>
          <div class="row my-1 mt-2">
            <div class="col-md-10 offset-md-2">
              <div class="row">
                <div class="col-md-4 text-md-right align-self-center">
                  <label for="" class="">Pastor phone </label>
                </div>

                <div class="col-md-8">
                  <el-input
                    type="text"
                    v-model="pastorPhone"
                    class="w-100"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-10 offset-md-2">
              <div class="row">
                <div class="col-4"></div>
                <div class="col-8">
                  <div class="row">
                    <div class="col-12 mt-2">
                      <el-checkbox  v-model="replicateAttendance" />
                      <!-- <Checkbox
                        id="binary"
                        v-model="replicateAttendance"
                        :binary="true"
                      /> -->
                      Replicate attendance
                    </div>
                    <div class="col-12 mt-2">
                      <el-checkbox  v-model="replicateFinancial" />
                      <!-- <Checkbox
                        id="binary"
                        v-model="replicateFinancial"
                        :binary="true"
                      /> -->
                      Replicate financial
                    </div>
                    <div class="col-12 mt-2">
                      <el-checkbox  v-model="replicateEvent" />
                      <!-- <Checkbox
                        id="binary"
                        v-model="replicateEvent"
                        :binary="true"
                      /> -->
                      Replicate event
                    </div>
                    <div class="col-12 mt-2">
                      <el-checkbox  v-model="replicateGroup" />
                      <!-- <Checkbox
                        id="binary"
                        v-model="replicateGroup"
                        :binary="true"
                      /> -->
                      Replicate group
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="image-div other">
            <div class="grey-bg">
              <div>
                <div class="person-img">
                  <img
                    v-if="!url"
                    src="../../assets/people/phone-import.svg"
                    alt="Uploaded Image"
                  />
                  <img
                    v-else
                    :src="url"
                    alt="Uploaded Image"
                    style="
                      width: 110px;
                      height: 110px;
                      border-radius: 50%;
                      object-fit: cover;
                    "
                  />
                </div>
              </div>
              <div>
                <div class="cs-input">
                  <label for="imgUpload" class="choose-file">
                    Choose image
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

              <!-- <div>
                        <button
                            class="upload-btn outline-none"
                            @click.prevent="uploadImage"
                        >
                            Upload
                        </button>
                        </div> -->
            </div>
          </div>
          <div class="container-fluid hierarchy-bg rounded">
            <div class="header-color mt-2">
              <h4>Hierarchical Flow</h4>
            </div>

            <div class="content">
              <div class="next-item" v-if="hierarchies[0]">
                {{ hierarchies[0].name }}
              </div>
              <div v-for="(item, index) in hierarchies" :key="index">
                <div class="d-flex" v-if="index > 0">
                  <span :class="`ml-${index + 1}`" class="border-style"></span>
                  <span class="mt-4 ml-1 d-flex"
                    ><el-icon class="mt-2 px-0 ml-0 mr-1 primary--text"><ArrowRightBold /></el-icon>{{ item.name }}</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="row my-1 pt-4"> -->
        <div class="col-md-6 offset-md-3 mt-4">
          <div class="row d-flex justify-content-between">
            <div class="mt-4">
              <el-button class="" round  size="large" data-dismiss="modal">Cancel</el-button>
            </div>
            <div class="mt-4">
              <el-button
                class=""
                round
                size="large"
                data-toggle="modal"
                data-target="#codemodal"
              >
                Generate branch join code
              </el-button>
            </div>
            <div class="mt-4">
              <el-button
              :loading="loading"
              :color="primarycolor"
              round
              size="large"
                class=" border-0 text-white"
                data-dismiss="modal"
                @click="addBranch"
              >
                Save
              </el-button>
            </div>
          </div>
        </div>
        <!-- </div>  -->
      </div>
    </div>
  </div>
  <!-- Generate Join Branch Code Modal -->

  <div
    class="modal fade"
    id="codemodal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="codemodalModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document" ref="modal">
      <div class="modal-content pr-2">
        <div class="modal-header py-3">
          <h5 class="modal-title font-weight-700" id="codemodalModalLabel">
            Generate your branch code.
          </h5>
          <el-button
            class="close d-flex"
            data-dismiss="modal"
            aria-label="Close"
            ref="closeGroupModal"
          >
            <el-icon :size="16" class="mt-4"><CloseBold /></el-icon>
          </el-button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-12 mb-2">
              Select the branch level you want your code to be generated with,
              then copy the generated code.
            </div>
            
            <div class="col-9 mt-2">
              <el-tree-select
                    v-model="value"
                    class="w-100"
                    :data="branches"
                    :check-strictly="false"
                    :render-after-expand="false"
                  />
            </div>
            <el-button
              round
             :color="primarycolor"
             :loading="loadingCode"
             size="large"
              class="mt-2 mb-3 col-2  text-white font-weight-bold c-pointer border-0 text-center"
              @click="generateCode"
            >
             Generate
            </el-button>
            <div class=" col-md-9 d-flex mb-3 " v-if="requestedCode">
              <el-input
                type="text"
                class="w-100"
                placeholder="Heres your code"
                :value="requestedCode"
                ref="code"
                aria-describedby="basic-addon1"
              />
              <div class="input-group-prepend">
                <span
                  class="input-group-text c-pointer"
                  id="basic-addon1"
                  @click="copyCode"
                  >
                  <el-icon><CopyDocument /></el-icon>
              </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/gateway/backendapi";
import { ref , inject  } from "vue";
import router from "../../router";
import store from "../../store/store";
import { ElMessage, ElMessageBox } from "element-plus";
export default {
  setup() {
    const primarycolor = inject("primarycolor");
    const churchName = ref("");
    const Address = ref("");
    const selectedLevel = ref("");
    const pastorName = ref("");
    const pastorEmail = ref("");
    const pastorPhone = ref("");
    const hierarchies = ref([]);
    const url = ref("");
    const image = ref("");
    const memberToEdit = ref("");
    const branches = ref([]);
    const replicateAttendance = ref(true);
    const replicateFinancial = ref(true);
    const replicateEvent = ref(true);
    const replicateGroup = ref(true);
    const requestedCode = ref("");
    const code = ref(null);
    const isoCode = ref("");
    const loading = ref(false);
    const loadingCode = ref(false);
    const value = ref(null);
    const branchValue = ref(null);
    const isNameValid = ref(true);
    const isEmailValid = ref(true);


    const imageSelected = (e) => {
      image.value = e.target.files[0];
      url.value = URL.createObjectURL(image.value);
    };
    const getHierarchies = async () => {
      try {
        let { data } = await axios.get("/branching/hierarchies");
        hierarchies.value = data.returnObject;
      } catch (err) {
        console.log(err);
      }
    };
    getHierarchies();
    const getAllBranchList = async () => {
      try {
        axios
          .get("/api/Branching/hierarchieswithbranches")
          .then((res) => {
            branches.value = res.data.returnObject.map((i) => {
              return {
                label: i.name,
                value: i.id,
                children: i.teanants
                  ? i.teanants.map((j) => {
                      return {
                        label: j.name,
                        value: j.id,
                      };
                    })
                  : "",
              };
            });
          })
          .catch((err) => console.log(err));
      } catch (err) {
        console.log(err);
      }
    };
    getAllBranchList();


    if (store.getters.currentUser && store.getters.currentUser.isoCode) {
      isoCode.value = store.getters.currentUser.isoCode;
    } else {
      axios
        .get("/api/Membership/GetCurrentSignedInUser")
        .then((res) => {
          isoCode.value = res.data.isoCode;
        })
        .catch((err) => console.log(err));
    }

    const addBranch = async () => {
      if (value.value) {
        const formData = new FormData();
        formData.append("churchName", churchName.value ? churchName.value : "");
        formData.append("address", Address.value ? Address.value : "");
        formData.append("parentID", value.value ? value.value: "");
        formData.append("pastorName", pastorName.value ? pastorName.value : "");
        formData.append("email", pastorEmail.value ? pastorEmail.value : "");
        formData.append(
          "pastorPhone",
          pastorPhone.value ? pastorPhone.value : ""
        );
        formData.append("image", image.value ? image.value : "");
        formData.append("duplicateAttendances", replicateAttendance.value);
        formData.append("duplicateFinancials", replicateFinancial.value);
        formData.append("duplicateEvents", replicateEvent.value);
        formData.append("duplicateGroups", replicateGroup.value);
        try {
          loading.value = true;
          let { data } = await axios.post("/api/Branching", formData);
          loading.value = false;


          let SMSBody = {
            category: "",
            contacts: [],
            emailAddress: "",
            emailDisplayName: "",
            gateWayToUse: "hybridKonnect",
            groupedContacts: [],
            isPersonalized: true,
            isoCode: isoCode.value,
            message: `YOU HAVE BEEN ADDED AS A BRANCH ON CHURCHPLUS, \n You are on the right place and track, take control of your ministry, know the key information that will help you make better decision and become an effective manager. Use your credentials below to login and get started now \n Email: ${pastorEmail.value} \n Password: Branch@123 please do well to change your password after you login`,
            toOthers: pastorPhone.value,
          };
          if (data.status) {
            axios
              .post("/api/Messaging/sendSms", SMSBody)
              .then((res) => console.log(res))
              .catch((err) => console.log(err));
            toast.add({
              severity: "success",
              summary: "Branch created",
              detail: data.message,
              life: 3000,
            });
            setTimeout(() => {
              router.push("/tenant/branch/mainbranchsummary");
              // router.push("/tenant/branch/branchsummary");
            }, 3000);
          }
        } catch (err) {
          let resData = err.response.data.Message;
          ElMessage({
            type: "error",
            message: resData,
          });
          loading.value = false;
        }
      } else {
        ElMessage({
            type: "warning",
            message: "Choose the level you want to create this branch under, then click Save.",
            duration: 5000,
          });
      }
    };

    const generateCode = async () => {
      let getHierarchyId = branches.value.find((i) => {
        return i.children.some((j) => j.value == value.value);
      });
      let body = {
        parentId: value.value,
        hierarchyID: getHierarchyId.value,
      };
      loadingCode.value = true;
      try {
        let { data } = await axios.post("/api/Branching/requestcode", body);
        loadingCode.value = false;
        requestedCode.value = data.code;
        ElMessage({
            type: "success",
            message: "Code generated successfully, you can copy to share to the branch",
            duration: 5000,
          });
      } catch (err) {
        console.log(err);
        loadingCode.value = false;
      }
    };

    const copyCode = () => {
      code.value.input.select();
      code.value.input.setSelectionRange(
        0,
        code.value.input.value.length
      ); /* For mobile devices */

      /* Copy the text inside the text field */
      document.execCommand("copy");
      ElMessage({
            type: "success",
            message: "Code copied to your clipboard",
            duration: 5000,
          });
    };

    const checkNameValue = () => {
      if (churchName.value.length == 0) {
        isNameValid.value = false;
      } else {
        isNameValid.value = true;
      }
    };

    const checkEmailValue = () => {
      if (pastorEmail.value.length == 0) {
        isEmailValid.value = false;
      } else {
        isEmailValid.value = true;
      }
    };

    return {
      addBranch,
      churchName,
      Address,
      selectedLevel,
      pastorName,
      pastorEmail,
      pastorPhone,
      imageSelected,
      url,
      image,
      memberToEdit,
      branches,
      replicateAttendance,
      replicateFinancial,
      replicateEvent,
      replicateGroup,
      value,
      branchValue,
      generateCode,
      requestedCode,
      hierarchies,
      primarycolor,
      code,
      copyCode,
      isoCode,
      loading,
      loadingCode,
   
      checkNameValue,
      isNameValid,
      isEmailValid,
      checkEmailValue,
    };
  },
};
</script>

<style scoped>
.heading-text {
  font: normal normal 800 1.5rem Nunito sans;
}
.border-style {
  border-left: 1px solid #132acd;
  border-bottom: 1px solid #132acd;
  margin-top: 10px;
  height: 2rem !important;
  width: 2rem !important;
}

.header-color {
  color: #a4a5a7;
}
.hierarchy-bg {
  background: #f9f9f9;
  overflow-x: scroll;
}

.next-item {
  font-weight: bolder;
  /* border: none !important; */
}

.content {
  padding: 1em;
}
</style>