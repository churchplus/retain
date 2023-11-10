<template>
  <div>
    <div class="container-fluid mb-4">
      <div class="row d-md-flex justify-content-between mt-3 mb-5">
        <div class="col-md-12">
          <h2 class="memCat">Custom Field Setup</h2>
        </div>
      </div>

      <div class="row grey-border pt-1 pb-5">
        <div class="col-md-12">
          <div class="row">
            <div class="col-md-12">
              <div class="row">
                <div class="col-md-12">
                  <h4 class="mt-2 mb-2 ml-5 memCat1">Custom Field</h4>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12 py-5 grey-background">
                  <div class="row d-md-flex justify-content-center">
                    <div class="col-md-7">
                      <div class="col-md-12 col-sm-12">
                        <label for=""> Specify Your Label here..</label>
                        <el-input type="text" class="w-100" placeholder="Specify Your Label here.."
                          v-model="customFieldLabel" />
                      </div>
                      <div class="col-md-12 col-sm-12 mt-3">
                        <label for="">Select the type of control you want to use</label>
                        <el-select-v2 v-model="selectedControlID" @change="setselectedControl" :options="controlType.map((i) => ({
                          label: i.name,
                          value: i.id,
                        }))
                          " placeholder="Select type" class="w-100" size="large" />
                      </div>
                      <div class="col-md-12 col-sm-12 mt-3 w-100" v-if="selectedControl.name == 'DropdownList'">
                        <label for="">
                          Enter your Dropdown list here </label>
                        <div class="row  justify-content-center">
                          <div class="col-md-12">
                            <div class="chip-container col-md-12 p-0 m-0 ">
                              <div class="chip px-2  d-flex justify-content-between my-2 mx-1"
                                v-for="(chip, i) of dropdownList" :key="chip.label">
                                <span>{{ chip }}</span>
                                <i class=" pt-1 text-dark align-items-center" @click="deleteChip(i)"><el-icon>
                                    <CircleClose />
                                  </el-icon></i>
                              </div>
                              <input class="inputt  py-2 " v-model="currentInput" @keypress.enter="saveChip" @input="checkComma"
                                @keydown.delete="backspaceDelete">
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-12 col-sm-12 mt-3">
                        <label for="">Select the Entity Type you want to Extend
                        </label>
                        <el-select-v2 v-model="selectedEntityTypeID" @change="setselectedEntityType" :options="entityType.map((i) => ({
                          label: i.name,
                          value: i.id,
                        }))
                          " placeholder="Select type" class="w-100" size="large"
                          style="width: 100%; text-align: left" />
                      </div>
                    </div>

                    <div class="
                        col-md-12
                        d-flex
                        justify-content-center
                        mt-3
                        col-sm-3
                      " @click="saveCustomFields">
                      <el-button :color="primarycolor" round size="large" :loading="loading">
                        Save
                      </el-button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row table-header-row py-2 mt-5">
            <div class="col-md-2 ">
              <span class="py-2 font-weight-bold">LABEL</span>
            </div>
            <div class="col-md-3 text-center  ">
              <span class="py-2 font-weight-bold">CONTROL TYPE</span>
            </div>
            <div class="col-md-3 text-center ">
              <span class="py-2 font-weight-bold">ENTITY TYPE</span>
            </div>
            <div class="col-md-4 text-center ">
              <span class="py-2 font-weight-bold mr-md-3 mr-0">ACTION</span>
            </div>
          </div>
          <!-- :disabled="!enabled" -->
          <!-- <div> {{ index }} - {{ element.label }} </div> -->

          <draggable item-key="id" class="list-group" v-model="allCustomFieldList" ghost-class="ghost"
             @start="dragging = true" @end="(dragging = false),(reorderCustomField())" v-loading="reoderloading">
            <template #item="{ element, index }">
              <div class="row py-2 graggable">
                <div class="col-md-12">
                  <div class="row">
                    <div class="
                    col-md-3
                    d-flex
                    px-md-0 px-4
                    justify-content-between
                    align-items-center
                    mb-md-0 mb-5
                    flex-wrap
                  ">
                      <span class="py-2 hidden-header">LABEL:</span>
                      <span class="py-2 text-xs-left mr-md-0 ml-md-3 mr-4 font-text">{{ element.label }}</span>
                    </div>
                    <div class="
                    col-md-3
                    d-flex
                    px-md-0 px-4
                    justify-content-between
                    align-items-center
                    mb-md-0 mb-5
                    flex-wrap
                  ">
                      <span class="py-2 hidden-header small">CONTROL TYPE:</span>
                      <span class="py-2 text-sm-end font-text">{{
                        getControlName(element.controlType)
                      }}
                      </span>
                    </div>
                    <div class="
                    col-md-3
                    d-flex
                    px-md-0 
                    justify-content-between
                    align-items-center
                    mb-md-0 mb-5
                    flex-wrap
                  ">
                      <span class="py-2 hidden-header">ENTITY TYPE:</span>
                      <span class="py-2 text-sm-end font-text">{{
                        getEntityName(element.entityType)
                      }}</span>
                    </div>
                    <div class="
                    col-md-3
                    mb-md-0 mb-2
                    col-12
                    d-flex
                    justify-content-md-start
                    align-items-center
                  ">
                      <span class="py-md-4 hidden-header hidden-header1">ACTION</span>
                      <div class="
                      d-flex
                      justify-content-md-between w-100 fllexxwrap
                    ">
                    <el-dropdown class="w-100" trigger="click">
                      <span class="el-dropdown-link">
                        <el-icon>
                          <MoreFilled />
                        </el-icon>
                      </span>
                      <template #dropdown>
                        <el-dropdown-menu>
                          <el-dropdown-item @click="openClassification(index)">View</el-dropdown-item>
                          <el-dropdown-item @click="deleteCustomField(element.id, index)">Delete</el-dropdown-item>
                        </el-dropdown-menu>
                      </template>
                    </el-dropdown>
                    <img src="../../assets/drag-and-drop.png"/>
                        <!-- <el-button class="py-1 px-4 mb-md-3" color="#EBEFF4" round @click="openClassification(index)">
                          View
                        </el-button>
                        <el-button class="delbtn py-1 primary-btn px-3 mb-md-3"
                          @click="deleteCustomField(element.id, index)" round>
                          Delete
                        </el-button> -->
                      </div>
                    </div>
                  </div>
                  <div class="row grey-background  " v-if="vissibleTab === `tab_${index}`">
                    <div class="col-md-12" :class="{
                      'show-view-dropdown': toggleCustomList,
                      'hide-view-dropdown': !toggleCustomList,
                    }">
                      <div class="col-md-9 d-flex flex-wrap mt-3">
                        <div class="col-md-4 text-md-right text-left">
                          <label for="">Label</label>
                        </div>
                        <div class="col-md-8">
                          <el-input type="text" class="w-100" v-model="customLabel" size="large" />
                        </div>
                      </div>
                      <div class="col-md-9 d-flex flex-wrap mt-3">
                        <div class="col-md-4 text-md-right text-left">
                          <label for="">Control type</label>
                        </div>
                        <div class="col-md-8">
                          <el-select-v2 v-model="customControlTypeID" @change="setcustomControlType" :options="controlType.map((i) => ({
                            label: i.name,
                            value: i.id,
                          }))
                            " placeholder="Select type" class="w-100" size="large" style="width: 100%; text-align: left" />
                        </div>
                      </div>
  
                      <div class="col-md-9 d-flex flex-wrap my-3" v-if="customControlType.name == 'DropdownList'">
                        <div class="col-md-4 text-md-right text-left">
                  
                        </div>
                        <div class="col-md-8">
                          <el-input type="text" class="w-100" size="large" v-model="customDropdownList" />
                        </div>
                      </div>
  
                      <div class="col-md-9 d-flex flex-wrap my-3">
                        <div class="col-md-4 text-md-right text-left">
                          <label for="">Entity type</label>
                        </div>
                        <div class="col-md-8">
                          <el-select-v2 v-model="customEntityTypeID" @change="setcustomEntityType" :options="entityType.map((i) => ({
                            label: i.name,
                            value: i.id,
                          }))
                            " placeholder="Select type" class="w-100" size="large" style="width: 100%; text-align: left" />
                        </div>
                      </div>
                      <div class="col-md-12">
                        <div class="row mt-0 d-flex justify-content-center">
                          <div class="save-discard-btn">
                            <div class="">
                              <el-button class=" save-btn text-white py-1 px-4" round @click="
                                updateCustomField(element.id, index)
                                ">
                                Save
                              </el-button>
                            </div>
                            <div class="">
                              <el-button class=" secondary-btn py-1 px-3 m bor" round color="#EBEFF4" @click="discard">
                                Discard
                              </el-button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
  
                  <div class="row">
                    <div class="col-md-12 px-0">
                      <hr class="hr my-0" />
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </draggable>


          <div class="col-12 text-center p-5" v-if="loadingfields">
            <i class="pi pi-spin pi-spinner text-center text-primary" style="fontsize: 3rem"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, inject, watchEffect } from "vue";
import axios from "@/gateway/backendapi";
import { ElMessage, ElMessageBox } from "element-plus";
import finish from "../../services/progressbar/progress";
import draggable from 'vuedraggable'

export default {
  components: {
    draggable
  },
  setup() {
    const primarycolor = inject('primarycolor')
    const selectedControl = ref({});
    const currentInput = ref("")
    const selectedControlID = ref(null);
    const customControlTypeID = ref(null);
    const customEntityTypeID = ref(null);
    const selectedEntityTypeID = ref(null);
    const dropdownList = ref([]);
    const customDropdownList = ref("");
    const vissibleTab = ref(false);
    const selectedEntityType = ref({});
    const loading = ref(false);
    const loadingfields = ref(false);
    const customEntityType = ref({});
    const customControlType = ref({});
    const customLabel = ref("");
    const customFieldLabel = ref("");
    const tenantId = ref("");
    const getAllcontrolType = ref([]);
    const getAllEntityType = ref([]);
    const allCustomFieldList = ref([]);
    const getCustomizableField = ref([]);
    const toggleCustomList = ref(false);
    const controlType = ref([
      { name: "Text", id: "0" },
      { name: "DropdownList", id: "1" },
      { name: "CheckBox", id: "2" },
      { name: "DateTime", id: "3" },
      { name: "Email", id: "4" },
      { name: "Image", id: "5" },
      { name: "Number", id: "6" },
    ]);
    const entityType = ref([
      { name: "Member", id: "0" },
      { name: "FirstTimers", id: "1" },
      { name: "NewConverts", id: "2" },
      { name: "Activity", id: "3" },
      { name: "EventRegistrationForm", id: "4" },
      { name: "CheckInAttendance", id: "5" },
    ]);
    const dragging = ref(false)
    const reoderloading = ref(false)
  

    const saveChip = () => {
      ((dropdownList.value.indexOf(currentInput.value) === -1)) && dropdownList.value.push(currentInput.value);
      currentInput.value = '';
    }
    const deleteChip = (index) => {
      dropdownList.value.splice(index, 1);
    }
    const backspaceDelete = ({ which }) => {
      which == 8 && currentInput.value === '' && dropdownList.value.splice(dropdownList.value.length - 1);
    }

    const checkComma = (e) => {
      if(e.data == ',') {
        saveChip();
      }
    }
    const setcustomEntityType = () => {
      setcustomControlType
      customEntityType.value = entityType.value.find((i) => {
        return i.id === customEntityTypeID.value;
      });
    };
    const setcustomControlType = () => {
      customControlType = controlType.value.find((i) => {
        return i.id === customControlTypeID.value;
      });
    };
    const setselectedEntityType = () => {
      selectedEntityType.value = entityType.value.find((i) => {
        return i.id === selectedEntityTypeID.value;
      });
    };
    const setselectedControl = () => {
      selectedControl.value = controlType.value.find((i) => {
        return i.id === selectedControlID.value;
      });
    };

    const discard = () => [
      (vissibleTab.value = ""),
      (toggleCustomList.value = !toggleCustomList.value),
    ];

    const getAllControls = async () => {
      try {
        const data = await axios.get("/api/CustomFields/GetAllControls");
        console.log(data, "getAllControls");
      } catch (error) {
        console.log(error);
      }
    };
    getAllControls();

    const deleteCustomField = (id) => {
      axios
        .delete(`/api/CustomFields/EditCustomFields?customAttributeID=${id}`)
        .then((res) => {
          console.log(res);
          ElMessage({
            type: "success",
            message: "Custom field deleted",
            duration: 5000
          });

          allCustomFieldList.value = allCustomFieldList.value.filter(
            (customFieldList) => customFieldList.id !== id
          );
        })
        .catch((err) => {
          finish();
          if (err.response.status === 400) {
            ElMessage({
              type: "error",
              message: "Ensure this is not in any group",
              duration: 5000
            });
          } else {
            ElMessage({
              type: "error",
              message: "An error occurred, please try again",
              duration: 5000
            });
          }
        });
    };

    const showConfirmModal = (id, index) => {
      ElMessageBox.confirm("Are you sure you want to Delete?", "Confirm delete",
        {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'error',
        })
        .then(() => {
          deleteCustomField(id, index);
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "Delete canceled",
            duration: 5000
          });
        });
    };

    const getCustomizable = async () => {
      try {
        const data = await axios.get(
          "/api/CustomFields/GetCustomizableObjects"
        );
        getCustomizableField.value = data.data;
      } catch (error) {
        console.log(error);
      }
    };
    getCustomizable();

    const getCurrentlySignedInUser = async () => {
      try {
        const res = await axios.get("/api/Membership/GetCurrentSignedInUser");
        tenantId.value = res.data.tenantId;
      } catch (err) {
        /*eslint no-undef: "warn"*/
        console.log(err);
      }
    };
    getCurrentlySignedInUser();
    const openClassification = (index) => {
      vissibleTab.value = `tab_${index}`;
      customLabel.value = allCustomFieldList.value[index].label;
      customDropdownList.value =
        allCustomFieldList.value[index].parameterValues;
      customEntityType.value = entityType.value.find(
        (i) => i.id == allCustomFieldList.value[index].entityType,
      );


      customControlType.value = controlType.value.find(
        (i) => i.id == allCustomFieldList.value[index].controlType
      );
      customControlTypeID.value = customControlType.value.id
      customEntityTypeID.value = customEntityType.value.id
      toggleCustomList.value = !toggleCustomList.value;


    };

    const updateCustomField = async () => {
      const customDetail = {
        id: allCustomFieldList.value.id,
        entityType: customEntityType.value.id,
        tenantID: tenantId.value,
        label: customLabel.value,
        controlType: customControlType.value.id,
        parameterValues: customDropdownList.value,
      };
      try {
        const res = await axios.put(
          "/api/CustomFields/EditCustomFields",
          customDetail
        );
        console.log(res.data, "updatecustomfield");
        ElMessage({
          type: "success",
          message: "Custom Field Updated successfully",
          duration: 5000
        });
      } catch (err) {
        /*eslint no-undef: "warn"*/
        console.log(err);
      }
      vissibleTab.value = "";
      toggleCustomList.value = !toggleCustomList.value;
    };

    const saveCustomFields = async () => {
      loading.value = true
      const body = {
        entityType: selectedEntityType.value.name,
        tenantID: tenantId.value,
        label: customFieldLabel.value,
        parameterValues: dropdownList.value ? dropdownList.value.join(",") : "",
        controlType: selectedControl.value.name,
      };

      try {
        const { data } = await axios.post(
          "/api/CustomFields/SaveCustomFields",
          body
        );

        loading.value = false
        allCustomFieldList.value.push(data);
        ElMessage({
          type: "success",
          message: "Custom Field created successfully",
          duration: 5000
        });
        customFieldLabel.value = "";
        selectedControl.value = new Object();
        selectedControlID.value = null;
        selectedEntityType.value = new Object();
        selectedEntityTypeID.value = null
        dropdownList.value = [];
      } catch (error) {
        console.log(error);
        loading.value = false
      }
    };

    const getAllCustomFields = async () => {
      loadingfields.value = true
      try {
        const res = await axios.get("/api/CustomFields/GetAllCustomFields");
        console.log(res.data, "allCustomFields");
        allCustomFieldList.value = res.data.sort((a, b) => a.order - b.order);
        getAllcontrolType.value = res.data.map((i) => {
          return {
            name: i.controlType,
            id: i.id,
          };
        });
        getAllEntityType.value = res.data.map((i) => {
          return {
            name: i.entityType,
            id: i.id,
          };
        });
        loadingfields.value = false
        console.log(getAllcontrolType.value, "allcontrol");
        console.log(getAllEntityType.value, "allEntity");
        console.log(allCustomFieldList.value, "allCustomFieldList");
      } catch (err) {
        /*eslint no-undef: "warn"*/
        console.log(err);
        loadingfields.value = false
      }
    };
    getAllCustomFields();

    const getEntityName = (id) => {
      return entityType.value.find((i) => i.id == id).name;
    };

    const getControlName = (id) => {
      return controlType.value && controlType.value.find((i) => i.id == id)
        ? controlType.value.find((i) => i.id == id).name
        : "";
    };

    const reorderCustomField = async () => {
      reoderloading.value = true
      let payload = allCustomFieldList.value.map((i, index) => {
        i.order = index
        return i
      })
      try {
        let data = await axios.post("/api/CustomFields/ReorderCustomFields", payload)
        console.log(data)
        reoderloading.value = false
        ElMessage({
          type: "success",
          message: "Custom fields reordered successfully",
          duration: 5000
        });
      }
      catch (error) {
        console.error(error)
        reoderloading.value = false
      }
    }
  

    return {
      controlType,
      deleteChip,
      backspaceDelete,
      currentInput,
      saveChip,
      setselectedControl,
      setcustomControlType,
      setcustomEntityType,
      setselectedEntityType,
      selectedControlID,
      customEntityTypeID,
      customControlTypeID,
      selectedEntityTypeID,
      getControlName,
      vissibleTab,
      saveCustomFields,
      showConfirmModal,
      deleteCustomField,
      updateCustomField,
      customEntityType,
      customControlType,
      getAllcontrolType,
      customLabel,
      loading,
      getAllEntityType,
      selectedControl,
      allCustomFieldList,
      getCustomizableField,
      selectedEntityType,
      entityType,
      dropdownList,
      openClassification,
      discard,
      getEntityName,
      customFieldLabel,
      customDropdownList,
      toggleCustomList,
      primarycolor,
      loadingfields,
      reorderCustomField,
      dragging,
      reoderloading,
      checkComma
    };
  },
};
</script>

<style scoped>
.chip-container {
  /* width: 425px; */
  border: 1px solid #ccc;
  background: #ffffff;
  min-height: 34px;
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
}

.chip {
  padding: 0.3rem 0.3rem;
  border: 1px solid #02172e0d;
  border-radius: 25px;
  background: #02172e14;
  /* margin:4px;
    background: #e0e0e0;
    padding:0px 4px;
    border: 1px solid #ccc;
    border-radius: 3px;
    display:flex;
    align-items: center; */
}

i {
  cursor: pointer;
  opacity: .56;
  margin-left: 8px;
}

.inputt {
  /* flex: 1 1 auto;
    width: 30px; */
  border: none;
  outline: none;
  padding: 4px;
}

.table-header-row {
  background: #ebeff4;
  border-top: 1px solid #dde2e6;
  border-radius: 8px 8px 0 0;
}

.save-discard-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 !important;
  /* gap: rem; */
}

.show-view-dropdown {
  height: 340px;
  overflow: hidden;
  transition: all 0.5s ease-in-out;
}

.hide-view-dropdown {
  height: 0px;
  overflow: hidden;
  transition: all 0.5s ease-in-out;
}

.hidden-header {
  display: none;
}

.grey-background {
  background: #dde2e6;
}

.email-destination {
  padding: 0.1rem 0.4rem;
  border: 1px solid #02172e0d;
  border-radius: 8px;
  background: #02172e14;
}

.remove-email {
  color: #000;
  font-weight: bold;
}

.remove-email:hover {
  cursor: pointer;
}

.save-btn {
  background: #50ab00;
}

.delbtn:hover {
  background-color: red !important;
  color: white !important;
}

.delbtn {
  background-color: #f2bc9e !important;
  color: black !important;
}

.delbtn:focus {
  outline: none !important;
  border: none !important;
}

.memCat {
  font: var(--unnamed-font-style-normal) normal 800 34px/46px var(--unnamed-font-family-nunito-sans);
  letter-spacing: var(--unnamed-character-spacing-0);
  text-align: left;
  font: normal normal 800 34px/46px Nunito Sans;
  letter-spacing: 0px;
  color: #02172e;
  opacity: 1;
}

.memCat1 {
  font: var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-bold) 24px/32px var(--unnamed-font-family-nunito-sans);
  letter-spacing: var(--unnamed-character-spacing-0);
  text-align: left;
  font: normal normal bold 24px/32px Nunito Sans;
  letter-spacing: 0px;
  color: #02172e;
  opacity: 1;
}

@media screen and (max-width: 767px) {
  .hidden-header1 {
    display: none !important;
  }

  .hidden-header {
    display: inline-block;
    font-weight: 700;
    font-size: 13px;
  }

  .table-header-row {
    display: none;
  }

  .bold:hover {
    color: white !important;
  }

  .bold {
    color: rgb(187, 176, 176) !important;
  }

  .bor {
    border: #02172e !important;
  }
}

@media screen and (max-width: 746px) {
  .show-view-dropdown {
    height: 400px;
    overflow: hidden;
    transition: all 0.5s ease-in-out;
  }
}

@media screen and (max-width: 348px) {
  .show-view-dropdown {
    height: 450px;
    overflow: hidden;
    transition: all 0.5s ease-in-out;
  }
}

@media screen and (max-width: 300px) {
  .fllexxwrap {
    flex-wrap: wrap;
    justify-content: center;
  }
}

@media screen and (max-width: 390px) {
  .memCat {
    font: var(--unnamed-font-style-normal) normal 500 20px/25px var(--unnamed-font-family-nunito-sans);
    letter-spacing: var(--unnamed-character-spacing-0);
    text-align: left;
    font: normal normal 800 20px/25px Nunito Sans;
    letter-spacing: 0px;
    color: #02172e;
    opacity: 1;
  }

  .memCat1 {
    font: var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-bold) 18px/20px var(--unnamed-font-family-nunito-sans);
    letter-spacing: var(--unnamed-character-spacing-0);
    text-align: left;
    font: normal normal bold 18px/20px Nunito Sans;
    letter-spacing: 0px;
    color: #02172e;
    opacity: 1;
  }

  .save-discard-btn {
    flex-wrap: wrap;
  }

  .font-text {
    font-size: 13px;
    font-weight: bold;
  }
}

.graggable {
    cursor: move; /* fallback if grab cursor is unsupported */
    cursor: grab;
    cursor: -moz-grab;
    cursor: -webkit-grab;
}
</style>