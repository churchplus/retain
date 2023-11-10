<template>
  <div>
    <div class="container">
      <div class="row d-md-flex justify-content-between mt-3 mb-5">
        <div class="col-md-12">
          <h2 class="attend">Attendance Category</h2>
        </div>
      </div>
      <div class="row grey-border pt-1 pb-5">
        <div class="col-md-12">
          <div class="row">
            <div class="col-md-12">
              <div class="row">
                <div class="col-md-12">
                  <h4 class="mt-2 mb-2 ml-5 attend1">Attendance Categories</h4>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12 py-5 grey-background">
                  <div class="row d-md-flex justify-content-around">
                    <div class="col-md-7">
                      <el-input
                        type="text"
                        class="w-100 "
                        placeholder="Attendance category name"
                        v-model="attendanceName"
                        size="large"
                      />
                    </div>
                    <div class="col-md-3 d-flex justify-content-end">
                      <el-button
                        size="large"
                        :color="primarycolor"
                        round
                        @click="saveAttendant"
                        :loading="loading"
                      >
                        Save
                      </el-button>
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

          <div class="row py-2" v-for="(type, index) in types" :key="index">
            <div class="col-md-12">
              <div class="row">
                <div
                  class="
                    col-md-7
                    px-md-0 px-5
                    d-flex
                    justify-content-between
                    align-items-center
                    mb-md-0 mb-5
                  "
                >
                  <span class="py-2 hidden-header">NAME</span>
                  <span class="py-2 text-xs-left mr-md-0 ml-md-3 mr-4">{{
                    type.name
                  }}</span>
                </div>
                <div
                  class="
                    col-md-5
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
                  <div class="row py-2">
                    <div class="col-md-6 col-6 d-flex justify-content-center">
                      <el-button
                        class=" secondary-btn py-1 px-4"
                        @click="openType(index)"
                        color="#EBEFF4"
                        round
                      >
                        View
                      </el-button>
                    </div>
                    <div class="col-md-6 col-6 d-flex justify-content-start">
                      <el-button
                        class="py-1 primary-btn px-3 delbtn"
                        @click="deletePop(type.id)"
                        round
                      >
                        Delete
                      </el-button>
                    </div>
                  </div>
                </div>
              </div>

              <div
                class="row grey-background py-2 mt-2"
                v-if="vissibleTab === `tab_${index}`"
              >
                <div
                  class="
                    col-md-7
                    d-flex
                    justify-content-between
                    align-items-center
                    mb-md-0 mb-2
                  "
                >
                  <label for="" class="d-flex mt-4">
                    <span class="mr-2">Name</span>
                    <el-input
                      type="text"
                      class="w-100 "
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
                    <div class="col-md-6 col-6 ">
                      <el-button
                        class="text-white primary-btn save-btn px-4 ml-md-0 ml-5"
                        @click="updateAttendant(type.id, index)"
                        round
                        :loading="loading"
                      >
                        Save
                      </el-button>
                    </div>
                    <div class="col-md-6 col-6 ">
                      <el-button
                        class=" secondary-btn  px-3"
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
          </div>
          <div class="col-12 text-center p-5" v-if="loading">
            <i
              class="pi pi-spin pi-spinner text-center text-primary"
              style="fontsize: 3rem"
            ></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/gateway/backendapi";
import { ElMessage, ElMessageBox } from "element-plus";
import finish from "../../services/progressbar/progress";

export default {
  components: {},
  inject: ['primarycolor'],
  data() {
    return {
      types: [],
      vissibleTab: "",
      typeName: "",
      attendanceName: "",
      ageGroup: "",
      loading: false,
    };
  },

  methods: {
    async getTypes() {
      try {
        this.loading = true;
        const { data } = await axios.get(
          "/api/Settings/TenantAttentandaceTypes"
        );
        this.types = data;
        this.loading = false;
      } catch (error) {
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
          this.deleteAttendant(id);
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "Delete canceled",
            duration: 5000
          });
        });
    },

    async deleteAttendant(id) {
      try {
        await axios.delete("/api/Settings/DeleteAttendanceType/" + id);
        this.types = this.types.filter((i) => i.id !== id);
        ElMessage({
          type: "success",
          message: "Attendance Deleted Successfully",
          duration: 5000
        });
      } catch (error) {
        finish();
        console.log(error);
      }
    },
    async updateAttendant(id, index) {
      try {
        await axios.put("/api/Settings/UpdateAttendanceType", {
          attendanceTypeName: this.typeName,
          attendanceTypeId: id,
        });
        this.types[index].name = this.typeName;
        this.discard();
        ElMessage({
          type: "success",
          message: "Attendance Updated Successfully",
          duration: 5000
        });
      } catch (error) {
        finish();
        console.log(error);
      }
    },
    async saveAttendant() {
      try {
        await axios.post(
          "/api/Settings/NewAttendanceType/" + this.attendanceName
        );
        this.getTypes();
        this.attendanceName = "";
        ElMessage({
          type: "success",
          message: "Attendance Save Successfully",
          duration: 5000
        });
      } catch (error) {
        finish();
        console.log(error);
      }
    },
    openType(index) {
      this.vissibleTab = `tab_${index}`;
      this.typeName = this.types[index].name;
    },

    discard() {
      this.vissibleTab = "";
    },
    del(index) {
      this.types.splice(index, 1);
    },
  },

  created() {
    this.getTypes();
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
.attend {
  font: var(--unnamed-font-style-normal) normal 800 34px/46px
    var(--unnamed-font-family-nunito-sans);
  letter-spacing: var(--unnamed-character-spacing-0);
  text-align: left;
  font: normal normal 800 34px/46px Nunito Sans;
  letter-spacing: 0px;
  color: #02172e;
  opacity: 1;
}
.attend1 {
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
  .attend {
    font: var(--unnamed-font-style-normal) normal 500 20px/25px
      var(--unnamed-font-family-nunito-sans);
    letter-spacing: var(--unnamed-character-spacing-0);
    text-align: left;
    font: normal normal 800 20px/25px Nunito Sans;
    letter-spacing: 0px;
    color: #02172e;
    opacity: 1;
  }
  .attend1 {
    font: var(--unnamed-font-style-normal) normal
      var(--unnamed-font-weight-bold) 24px/32px
      var(--unnamed-font-family-nunito-sans);
    letter-spacing: var(--unnamed-character-spacing-0);
    text-align: left;
    font: normal normal bold 18px/20px Nunito Sans;
    letter-spacing: 0px;
    color: #02172e;
    opacity: 1;
  }
}
</style>