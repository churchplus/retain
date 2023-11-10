<template>
  <div>
    <div class="container">
      <div class="row d-md-flex justify-content-between mt-3 mb-5">
        <div class="col-md-12">
          <h2 class="follow">Follow Up Status</h2>
        </div>
      </div>
      <div class="row grey-rounded-border pt-1 pb-5">
        <div class="col-md-12">
          <div class="row">
            <div class="col-md-12">
              <div class="row">
                <div class="col-md-12">
                  <h4 class="mt-2 mb-2 ml-5 follow1">Follow up Status</h4>
                </div>
              </div>

              <div class="row">
                <div class="col-md-12 py-5 grey-background">
                  <div class="row d-md-flex justify-content-around">
                    <div class="col-md-7">
                      <el-input
                        type="text"
                        class="w-100"
                        size="large"
                        placeholder="Add follow up status name"
                      />
                    </div>
                    <div class="col-md-3">
                      <el-button :color="primarycolor" :loading="loading" class="primary-btn px-5 text-white" size="large" round >Save</el-button>
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
            <div class="col-md-5">
              <span class="py-2 font-weight-bold">ACTION</span>
            </div>
          </div>

          <div class="row py-2" v-for="(classification, index) in classifications" :key="index">
            <div class="col-md-12">
              <div class="row">
                <div
                  class="col-md-7 d-flex justify-content-between align-items-center"
                >
                  <span class="py-2 hidden-header">NAME</span>
                  <span class="py-2 text-xs-left">{{ classification.name }}</span>
                </div>
                <div
                  class="col-md-5 d-flex justify-content-between align-items-center"
                >
                  <span class="py-4 hidden-header">ACTION</span>
                  <div class="row">
                    <div class="col-md-6">
                      <el-button round size="large" color="#EBEFF4"  class=" secondary-btn py-1 px-4" @click="openClassification(index)">View</el-button>
                    </div>
                    <div class="col-md-6">
                      <el-button round size="large" class=" btn-danger py-1 primary-btn">Delete</el-button>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row grey-background py-2" v-if="vissibleTab === `tab_${index}`">
                <div
                  class="col-md-7 d-flex justify-content-between align-items-center"
                >
                  <label for="" class="d-flex">
                    <span class="mr-2">Name</span>
                    <el-input type="text" class="w-100" round size="large" v-model="classificationName" />
                  </label>
                </div>
                <div
                  class="col-md-5 d-flex justify-content-between align-items-center"
                >
                  <div class="row">
                    <div class="col-md-6">
                      <el-button round  class=" primary-btn save-btn py-1 px-4">Save</el-button>
                    </div>
                    <div class="col-md-6">
                      <el-button round color="#EBEFF4" class=" secondary-btn py-1 px-4" @click="discard">Discard</el-button>
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/gateway/backendapi";
export default {
  inject: ['primarycolor'],
  data() {
    return {
      classifications: [ ],
      vissibleTab: "",
      classificationName: "",
      loading: false
    }
  },
  


  methods: {
    async getClassifications() {
      try {
        const { data } = await axios.get("");
        this.classifications = data;
      } catch (error) {
        console.log(error);
      }
    },

    openClassification(index) {
      this.vissibleTab = `tab_${index}`;
      this.classificationName = this.classifications[index].name;
    },

    discard() {
      this.vissibleTab = "";
    }
  },

  created() {
    // this.getClassifications();
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
    background: #DDE2E6;
}

.save-btn {
  background: #50AB00;
}
.follow{
    font: var(--unnamed-font-style-normal) normal 800 34px/46px var(--unnamed-font-family-nunito-sans);
    letter-spacing: var(--unnamed-character-spacing-0);
    text-align: left;
    font: normal normal 800 34px/46px Nunito Sans;
    letter-spacing: 0px;
    color: #02172E;
    opacity: 1;
}
.follow1{
    font: var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-bold) 24px/32px var(--unnamed-font-family-nunito-sans);
    letter-spacing: var(--unnamed-character-spacing-0);
    text-align: left;
    font: normal normal bold 24px/32px Nunito Sans;
    letter-spacing: 0px;
    color: #02172E;
    opacity: 1;
}

@media screen and (max-width: 767px) {
  .hidden-header {
    display: inline-block;
    font-weight: bold;
  }

  .table-header-row {
    display: none;
  }
}
</style>