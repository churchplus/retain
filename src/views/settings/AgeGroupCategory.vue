<template>
  <div>
    <div class="container">
      <div class="row d-md-flex justify-content-between mt-3 mb-5">
        <div class="col-md-12">
          <h2 class="ageGroup">Age Group Category</h2>
        </div>
      </div>
      <div class="row grey-border pt-1 pb-5">
        <div class="col-md-12">
          <div class="row">
            <div class="col-md-12">
              <div class="row">
                <div class="col-md-12">
                  <h4 class="mt-2 mb-2 ml-5 ageGroup1">Age Group Categories</h4>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12 py-5 grey-background">
                  <div class="row d-md-flex justify-content-around">
                    <div class="col-md-7">
                      <el-input
                        v-model="ageGroup"
                        :rows="2"
                        type="text"
                        placeholder="Age Group category"
                        style="border-radius: 5px; width: 100%"
                        size="large"
                      />
                    </div>
                    <div class="col-md-3 d-flex justify-content-end">
                       <el-button @click="saveAge" size="large" :loading="loading" class="font-weight-bold px-md-4 px-3 py-1 mt-sm-3 mt-lg-0 mt-xl-0 mt-md-0 mt-3  " :color="primarycolor"  round> Save </el-button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row table-header-row py-2 mt-5">
            <div class="col-md-7">
              <span class="py-2 font-weight-bold">NAME</span>
            </div>
            <div class="col-md-5 text-center">
              <span class="py-2 font-weight-bold mr-md-5 mr-0">ACTION</span>
            </div>
          </div>

          <draggable item-key="id" class="list-group" v-model="types" ghost-class="ghost"
             @start="dragging = true" @end="(dragging = false),(reorderAgeGroups())" v-loading="reorderloading">
            <template #item="{ element, index }">
              <div class="col-md-12 graggable">
                <div class="row">
                  <div
                    class="
                      col-md-5
                      col-lg-7
                      d-flex
                      px-md-0 px-5
                      justify-content-between
                      align-items-center
                      mb-md-0 mb-5
                    "
                  >
                    <span class="py-2 hidden-header">NAME</span>
                    <span
                      class="py-2 text-xs-left mr-md-0 mr-4 mr-md-0 ml-md-3 mr-4"
                      >{{ element.name }}</span
                    >
                  </div>
                  <div
                    class="
                      col-md-7
                      col-lg-5
                      mb-md-0 mb-2
                      col-12
                      d-flex
                      justify-md-content-end justify-content-start
                      align-items-end
                    "
                  >
                    <span class="py-md-4 hidden-header hidden-header1"
                      >ACTION</span
                    >
                    <div class="d-flex justify-content-between py-2 w-100">
                      <div class="d-flex">
                        <div class="">
                        <el-button
                          class=" secondary-btn  py-1 px-4"
                          color="#EBEFF4"
                          @click="openType(index)"
                          round
                        >
                          View
                        </el-button>
                      </div>
                      <div class="">
                        <el-button
                          class="delbtn   py-1 px-3 primary-btn"
                          @click="deletePop(element.id)"
                          round
                        >
                          Delete
                        </el-button>
                      </div>
                      </div>
                      <img src="../../assets/drag-and-drop.png" />
                    </div>
                  </div>
                </div>
    
                <div
                  class="row grey-background mt-2 py-2"
                  v-if="vissibleTab === `tab_${index}`"
                >
                  <div
                    class="
                      col-md-7
                      d-flex
                      justify-content-between
                      align-items-center
                    "
                  >
                    <label for="" class="d-flex mt-4">
                      <span class="mr-2">Name</span>
                      <el-input
                        type="text"
                        class="w-100  "
                        v-model="typeName"
                      />
                    </label>
                  </div>
                  <div
                    class="
                      col-md-5
                      d-flex
                      justify-content-end
                      align-items-center
                      mt-0
                    "
                  >
                    <div class="row">
                      <div class="col-md-6 col-6">
                        <el-button
                          class="save-btn text-white  py-1 px-4 ml-md-0 ml-5"
                          @click="updateAge(element.id, index)"
                          round
                          :loading="loading"
                        >
                          Save
                        </el-button>
                      </div>
                      <div class="col-md-6 col-6">
                        <el-button
                          class=" secondary-btn py-1 px-3"
                          @click="discard"
                          color="#EBEFF4"
                          round
                        >
                          Discard
                        </el-button>
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
            </template>
          </draggable>
          <!-- <div class="row py-2" v-for="(type, index) in types" :key="index">
          </div>
          <div class="col-12 text-center p-5" v-if="loading">
            <i
              class="pi pi-spin pi-spinner text-center text-primary"
              style="fontsize: 3rem"
            ></i>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/gateway/backendapi";
import { ElMessage, ElMessageBox } from "element-plus";
import membershipService from "../../services/membership/membershipservice";
import finish from "../../services/progressbar/progress";
import draggable from 'vuedraggable'

export default {
  components: {
    draggable
  },
  inject: ['primarycolor'],
  data() {
    return {
      types: [],
      vissibleTab: "",
      loading: false,
      typeName: "",
      ageGroup: "",
      tenantId: "",
      loading: false,
      dragging: false,
      reorderloading: false
    };
  },

  methods: {
    async getGroup() {
      this.loading = true;
      try {
        const { data } = await axios.get("/api/Settings/GetTenantAgeGroups");
        this.types = data;
        this.loading = false;
      } catch (error) {
        console.log(error);
      }
    },
    async saveAge() {
      this.loading = true
      try {
        await axios.post("/api/Settings/CreateTenantAgeGroup/" + this.ageGroup, {
          name: this.ageGroup,
          order: this.types.length + 1
        });
        this.getGroup();
        this.ageGroup = "";
        ElMessage({
          type: "success",
          message: "Age Group Save Successfully",
          duration: 5000
        });

        this.loading = false

      } catch (error) {
        finish();
        console.log(error);
        this.loading = false
      }
    },
    async deleteAge(id) {
      try {
        await axios.delete("/api/Settings/DeleteTenantAgeGroup/" + id);
        this.types = this.types.filter((i) => i.id !== id);
        ElMessage({
          type: "success",
          message: "Age Group Deleted Successfully",
          duration: 5000
        });
      } catch (error) {
        finish();
        console.log(error);
      }
    },
    deletePop(id) {
      ElMessageBox.confirm("Are you sure you want to Delete?", "Confirm delete", 
     {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'error',
        }
        )
        .then(() => {
          this.deleteAge(id);
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "Delete canceled",
            duration: 5000
          });
        });
    },
    async updateAge(id, index) {
      this.loading = true
      try {
        await axios.put("/api/Settings/UpdateTenantAgeGroup", {
          name: this.typeName,
          id: id,
        });
        this.types[index].name = this.typeName;
        this.discard();
        ElMessage({
          type: "success",
          message: "Age Group Updated Successfully",
          duration: 5000
        });
        this.loading = false
      } catch (error) {
        finish();
        console.log(error);
        this.loading = false
      }
    },
    openType(index) {
      this.vissibleTab = `tab_${index}`;
      this.typeName = this.types[index].name;
    },

    discard() {
      this.vissibleTab = "";
    },
     async reorderAgeGroups () {
      this.reorderloading = true
      let payload = this.types.map((i, index) => {
        i.order = index
        return i
      })
      try {
        let data = await axios.put("/api/Settings/updateAgeGroupOrder", payload)
        console.log(data)
        this.reorderloading = false
        ElMessage({
          type: "success",
          message: "Age groups reordered successfully",
          duration: 5000
        });
      }
      catch (error) {
        console.error(error)
        this.reorderloading = false
      }
    }
  },

  created() {
    this.getGroup();
    membershipService.getSignedInUser().then((res) => {
      this.tenantId = res.tenantId;
    });
  },
};
</script>

<style scoped>
input::placeholder {
  text-align: center;
}

.table-header-row {
  background: #ebeff4;
  border-top: 1px solid #dde2e6;
  border-radius: 8px 8px 0 0;
}

.hidden-header {
  display: none;
}

.grey-background {
  background: #dde2e6;
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
.ageGroup {
  font: var(--unnamed-font-style-normal) normal 800 34px/46px
    var(--unnamed-font-family-nunito-sans);
  letter-spacing: var(--unnamed-character-spacing-0);
  text-align: left;
  font: normal normal 800 34px/46px Nunito Sans;
  letter-spacing: 0px;
  color: #02172e;
  opacity: 1;
}
.ageGroup1 {
  font: var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-bold)
    24px/32px var(--unnamed-font-family-nunito-sans);
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
    font-weight: bold;
  }

  .table-header-row {
    display: none;
  }
}
@media screen and (max-width: 390px) {
  .ageGroup {
    font: var(--unnamed-font-style-normal) normal 500 20px/25px
      var(--unnamed-font-family-nunito-sans);
    letter-spacing: var(--unnamed-character-spacing-0);
    text-align: left;
    font: normal normal 800 20px/25px Nunito Sans;
    letter-spacing: 0px;
    color: #02172e;
    opacity: 1;
  }
  .ageGroup1 {
    font: var(--unnamed-font-style-normal) normal
      var(--unnamed-font-weight-bold) 24px/32px
      var(--unnamed-font-family-nunito-sans);
    letter-spacing: var(--unnamed-character-spacing-0);
    text-align: left;
    font: normal normal bold 20px/25px Nunito Sans;
    letter-spacing: 0px;
    color: #02172e;
    opacity: 1;
  }
}

.graggable {
    cursor: move; /* fallback if grab cursor is unsupported */
    cursor: grab;
    cursor: -moz-grab;
    cursor: -webkit-grab;
}
</style>