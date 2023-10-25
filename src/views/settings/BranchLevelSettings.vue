<template>
  <div>
    <div class="container">
      <div
        class="row d-md-flex justify-content-between mt-3 mb-5"
        v-if="
          !this.$router.currentRoute.value.fullPath.includes(
            'tenant/branch/branchsummary'
          )
        "
      >
        <div class="col-md-12">
          <h2 class="first">Branch Level Settings</h2>
        </div>
      </div>

      <div class="row grey-border pt-1 pb-3">
        <div class="col-md-12">
          <div class="row">
            <div class="col-md-12">
              <div class="row">
                <div class="col-md-12">
                  <h4 class="mt-2 mb-2 ml-5 first1">Add Branch Level</h4>
                </div>
              </div>

              <div class="row">
                <div class="col-md-12 py-5 grey-background">
                  <div class="row d-md-flex">
                    <div class="col-md-8 col-lg-9">
                      <el-input
                        type="text"
                        class="w-100"
                        placeholder="Add branch Level"
                        v-model="branchTypes"
                        size="large"
                      />
                    </div>
                    <div
                      class="col-md-3 d-flex justify-content-center mt-3 mt-md-0"
                    >
                      <el-button
                        class="font-weight-bold px-md-4 text-white border-0"
                        @click="saveBranch"
                        :loading="loading"
                        :color="primarycolor"
                        size="large"
                        round
                      >
                        Save
                      </el-button>
                    </div>
                  </div>
                  <div class="row mt-2 d-flex justify-content-around">
                    <div class="col-md-3"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12 mt-3">
              <!-- You can re-arrange your branch level by dragging to the position
              you desired -->
            </div>
          </div>

          <div class="row table-header-row py-2 mt-3">
            <div class="col-md-7">
              <span class="py-2 font-weight-bold">NAME</span>
            </div>
            <div class="col-md-5 text-center">
              <span class="py-2 font-weight-bold mr-md-5 mr-0">ACTION</span>
            </div>
          </div>
          <div class="row">
            <div class="col-12 text-center p-5" v-if="loading">
              <i
                class="pi pi-spin pi-spinner text-center text-primary"
                style="fontsize: 3rem"
              ></i>
            </div>
          </div>
          <!-- <div class="row mt-2">
            <el-timeline class="col-md-12">
              <el-timeline-item
                v-for="(branch, indx) in branchList"
                :key="indx"
                class="w-100"
                :timestamp="indx + 1 "
                :color="primarycolor"
                placement="top"
              >
                <el-card>
                  <div class="row pl-3">
                    <div
                      class="col-md-7 px-0 d-flex justify-content-between align-items-center mb-md-0 mb-3"
                    >
                      <span class="py-2 hidden-header">NAME</span>

                      <span class="py-2 text-xs-left mr-md-0 mr-4">{{
                        branch.name
                      }}</span>
                    </div>

                    <div
                      class="col-md-5 px-0 mb-md-0 mb-2 col-12 d-flex justify-content-end align-items-end"
                    >
                      <span class="py-md-4 hidden-header hidden-header1"
                        >ACTION</span
                      >
                      <div class="row">
                        <div
                          class="col-md-6 col-6 d-flex justify-content-center"
                        >
                          <el-button
                            class="secondary-btn py-1 px-4"
                            @click="openClassification(branch.index)"
                            round
                            color="#EBEFF4"
                          >
                            View
                          </el-button>
                        </div>
                        <div
                          class="col-md-6 col-6 d-flex justify-content-start"
                        >
                          <el-button
                            class="py-1 w-100 primary-btn delete-btn"
                            @click="deletePop(branch.id)"
                            round
                          >
                            Delete
                          </el-button>
                        </div>
                      </div>
                    </div>
                  </div>
                </el-card>
              </el-timeline-item>
            </el-timeline>
          </div> -->

          <div
            class="list-group-item list-group row"
            v-for="(branch, indx) in branchList"
            :key="indx"
            @drop="handleDrop"
          >
            <div class="col-md-12">
              <div class="row pl-3">
                <div
                  class="col-md-7 px-0 d-flex justify-content-between align-items-center mb-md-0 mb-3"
                >
                  <span class="py-2 hidden-header">NAME</span>

                  <span class="py-2 text-xs-left mr-md-0 mr-4">{{
                    branch.name
                  }}</span>
                </div>

                <div
                  class="col-md-5 px-0 mb-md-0 mb-2 col-12 d-flex justify-content-end align-items-end"
                >
                  <span class="py-md-4 hidden-header hidden-header1"
                    >ACTION</span
                  >
                  <div class="row">
                    <div class="col-md-6 col-6 d-flex justify-content-center">
                      <el-button
                        class="secondary-btn py-1 px-4"
                        @click="openClassification(branch.index)"
                        round
                        color="#EBEFF4"
                      >
                        View
                      </el-button>
                    </div>
                    <div class="col-md-6 col-6 d-flex justify-content-start">
                      <el-button
                        class="py-1 primary-btn delete-btn"
                        @click="deletePop(branch.id)"
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
                v-if="vissibleTab === `tab_${branch.index}`"
              >
                <div
                  class="col-md-7 d-flex justify-content-between align-items-center mb-md-0 mb-2"
                >
                  <label for="" class="d-flex mt-4">
                    <span class="mr-2">Name</span>
                    <el-input type="text" class="w-100" v-model="branch.name" />
                  </label>
                  <label for="" class="d-flex mt-4"> </label>
                </div>
                <div
                  class="col-md-5 d-flex justify-content-end align-items-center mt-0"
                >
                  <div class="row">
                    <div class="col-md-6 col-6 d-flex justify-content-start">
                      <el-button
                        class="primary-btn text-white save-btn py-1 px-4 ml-md-0 ml-5"
                        @click="updateBranch(branch, branch.index)"
                        round
                      >
                        Save
                      </el-button>
                    </div>
                    <div class="col-md-6 col-6 d-flex justify-content-end">
                      <el-button
                        class="secondary-btn py-1 px-3"
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
            </div>
          </div>
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

export default {
  name: "simple",
  display: "Simple",
  components: {},
  directives: {},
  inject: ["primarycolor"],
  data() {
    return {
      branchList: [],
      vissibleTab: "",
      branchName: "",
      firstTimerOrder: "",
      branchTypes: "",
      level: 0,
      tenantId: "",
      loading: false,
      enabled: true,
      dragging: false,
    };
  },

  methods: {
    async getBranchCycles() {
      try {
        this.loading = true;
        const { data } = await axios.get("/branching/hierarchies");
        this.branchList = data.returnObject
          .map((item, index) => {
            item.index = index;
            return item;
          })
          .sort((a, b) => a.level - b.level);
        this.loading = false;
      } catch (error) {
        console.log(error);
      }
    },
    //handleDrop
    async handleDrop() {
      try {
        setTimeout(async () => {
          const ordered = this.branchList.map((i, j) => {
            return { id: i.id, level: j, name: i.name };
          });
          this.loading = true;
          const response = await axios.put("/branching/reorderlevels", ordered);
          console.log(response);
          this.loading = false;
          ElMessage({
            type: "success",
            message: "Branch Level Order Updated Successfully",
            duration: 5000,
          });
        }, 1000);
      } catch (error) {
        console.log(error);
      }
    },

    //First Timer save
    async saveBranch() {
      let mappedLevel = this.branchList.map((i) => i.level);
      const maxLevel =
        mappedLevel.length > 0 ? Math.max.apply(null, mappedLevel) + 1 : 0;
      try {
        let createBranchLevel = {
          name: this.branchTypes,
          level: maxLevel,
        };
        let branching = await axios.post(
          "/branching/newhierarchy",
          createBranchLevel
        );
        console.log(branching);
        this.getBranchCycles();
        this.branchTypes = "";
        ElMessage({
          type: "success",
          message: "Branch Save Successfully",
          duration: 5000,
        });
      } catch (error) {
        finish();
        console.log(error);
      }
    },
    //Update FirstTimer
    async updateBranch(item) {
      let body = { ...item, id: item.id, name: item.name, level: item.level };

      try {
        let response = await axios.put(`/branching/${item.id}/edit`, body);
        console.log(response);
        this.discard();
        ElMessage({
          type: "success",
          message: "New Branch Updated Successfully",
          duration: 5000,
        });
      } catch (error) {
        finish();
        console.log(error);
      }
    },
    async deleteBranch(id) {
      console.log(id);
      try {
        let data = await axios.delete(`/branching/${id}/delete`);
        console.log(data);
        this.branchList = this.branchList.filter((i) => i.id !== id);
        ElMessage({
          type: "success",
          message: "Delete Successfully",
          duration: 5000,
        });
      } catch (error) {
        finish();
        console.log(error);
      }
    },
    //pop Alert
    deletePop(id) {
      ElMessageBox.confirm(
        "Are you sure you want to Delete?",
        "Confirm delete",
        {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "error",
        }
      )
        .then(() => {
          this.deleteBranch(id);
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "Delete canceled",
            duration: 5000,
          });
        });
    },

    openClassification(index) {
      this.vissibleTab = `tab_${index}`;
      this.branchName = this.branchList[index].name;
      // this.singleBranch = this.branchList[index].name
    },

    discard() {
      this.vissibleTab = "";
    },
    checkMove: function (e) {
      window.console.log("Future index: " + e.draggedContext.futureIndex);
    },
  },

  created() {
    this.getBranchCycles();
    membershipService.getSignedInUser().then((res) => {
      this.tenantId = res.tenantId;
    });
  },
};
</script>

<style scoped>
.button {
  margin-top: 35px;
}
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #cbd1d3;
}
.list-group {
  min-height: 20px;
}
.list-group-item {
  padding: 0.75rem 0;
}
.list-group-item i {
  cursor: pointer;
}
input::placeholder {
  text-align: center;
}
.delete-btn {
  background: #f2bb9eab !important;
  color: black !important;
}
.delete-btn:hover {
  background-color: red !important;
  color: white !important;
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
.first {
  font: var(--unnamed-font-style-normal) normal 800 34px/46px
    var(--unnamed-font-family-nunito-sans);
  letter-spacing: var(--unnamed-character-spacing-0);
  text-align: left;
  font: normal normal 800 34px/46px Nunito Sans;
  letter-spacing: 0px;
  color: #02172e;
  opacity: 1;
}
.first1 {
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
  .first {
    font: var(--unnamed-font-style-normal) normal 500 20px/25px
      var(--unnamed-font-family-nunito-sans);
    letter-spacing: var(--unnamed-character-spacing-0);
    text-align: left;
    font: normal normal 800 20px/25px Nunito Sans;
    letter-spacing: 0px;
    color: #02172e;
    opacity: 1;
  }
  .first1 {
    font: var(--unnamed-font-style-normal) normal
      var(--unnamed-font-weight-bold) 24px/32px
      var(--unnamed-font-family-nunito-sans);
    letter-spacing: var(--unnamed-character-spacing-0);
    text-align: left;
    font: normal normal bold 15px/16px Nunito Sans;
    letter-spacing: 0px;
    color: #02172e;
    opacity: 1;
  }
}
</style>