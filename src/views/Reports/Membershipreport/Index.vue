<template>
  <div class="container-fluid px-0">
    <div class="row mt-5">
      <div class="col-md-12 px-0 col-12 text-center">
        <div
          class="row tabl border-0 report d-flex justify-content-between p-2 p-md-4"
        >
          <div class="col-md-6 col-12 pr-md-4 p-0">
            <h4 class="ju header4">Membership</h4>
            <p class="ju paragraph1">
              Generate your membership report and know the progress of your
              church members.
            </p>
          </div>
          <div class="col-md-5 col-12 border-bottom">
            <div
              class="row d-md-flex justify-content-md-between d-flex justify-content-between"
            >
              <router-link to="/tenant/reports/membershipreport" class="linked"
                ><h4
                  class="ju header4 d-md-flex justify-content-md-start"
                  style="color: #136acd"
                >
                  Membership Report
                </h4></router-link
              >
              <router-link to="/tenant/reports/membershipreport">
                <span
                  ><el-icon :color="primarycolor" :size="24"
                    ><ArrowRightBold /></el-icon
                ></span>
              </router-link>
            </div>
            <div class="row">
              <p class="ju mb-3 paragraph1">
                This reports provides a detailed report of the Membership in
                your ministry.
              </p>
            </div>
          </div>

          <div class="col-md-6 col-12 pr-md-4 p-0"></div>
          <div class="col-md-5 col-12 mt-4">
            <div
              class="row d-md-flex justify-content-md-between d-flex justify-content-between"
            >
              <router-link to="/tenant/reports/firsttimersreport" class="linked"
                ><h4
                  class="ju header4 d-md-flex justify-content-md-start"
                  style="color: #136acd"
                >
                  First Timer Report
                </h4></router-link
              >
              <router-link to="/tenant/reports/firsttimersreport">
                <span
                  ><el-icon :color="primarycolor" :size="24"
                    ><ArrowRightBold /></el-icon></span
              ></router-link>
            </div>
            <div class="row">
              <p class="ju mb-3 paragraph1">
                This reports provides a detailed report of the first timers in
                your ministry.
              </p>
            </div>
          </div>

          <div class="col-md-6 col-12 pr-md-4 p-0"></div>
          <div class="col-md-5 col-12 mt-4">
            <div
              class="row d-md-flex justify-content-md-between d-flex justify-content-between"
            >
              <router-link to="/tenant/reports/newconvertreport" class="linked"
                ><h4
                  class="ju header4 d-md-flex justify-content-md-start"
                  style="color: #136acd"
                >
                  New Convert
                </h4></router-link
              >
              <router-link to="/tenant/reports/newconvertreport">
                <span
                  ><el-icon :color="primarycolor" :size="24"
                    ><ArrowRightBold /></el-icon></span
              ></router-link>
            </div>
            <div class="row">
              <p class="ju mb-3 paragraph1">
                This reports provides a detailed report of new converts in your
                ministry.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-5 mb-5">
      <div class="col-md-12 col-12 px-0 text-center">
        <div
          class="row tabl border-0 report d-flex justify-content-between p-2 p-md-4"
        >
          <div class="col-md-6 col-12 pr-md-4 p-0">
            <h4 class="ju header4">Celebrations</h4>
            <p class="ju paragraph1">
              Send your Members Automated message on thier birthday and wedding
              event
            </p>
          </div>
          <div class="col-md-5 col-12 border-bottom">
            <div
              class="row d-md-flex justify-content-md-between d-flex justify-content-between"
            >
              <router-link
                to="/tenant/reports/celebrationsreport"
                class="linked"
                ><h4
                  class="ju header4 d-md-flex justify-content-md-start"
                  style="color: #136acd"
                >
                  Birthday Report
                </h4></router-link
              >
              <router-link to="/tenant/reports/celebrationsreport"
                ><span
                  ><el-icon :color="primarycolor" :size="24"
                    ><ArrowRightBold /></el-icon></span
              ></router-link>
            </div>
            <div class="row">
              <p class="ju mb-3 paragraph1">
                This reports provides a detailed list of all the church contacts
                celebrating their birthday within the selected period
              </p>
            </div>
          </div>
          <div class="col-md-6 col-12 pr-md-4 p-0"></div>
          <div class="col-md-5 col-12 mt-4">
            <div
              class="row d-md-flex justify-content-md-between d-flex justify-content-between"
            >
              <router-link
                to="/tenant/reports/weddinganniversaryreport"
                class="linked"
                ><h4
                  class="ju header4 d-md-flex justify-content-md-start"
                  style="color: #136acd"
                >
                  Wedding Anniversary Report
                </h4></router-link
              >
              <router-link to="/tenant/reports/weddinganniversaryreport"
                ><span
                  ><el-icon :color="primarycolor" :size="24"
                    ><ArrowRightBold /></el-icon></span
              ></router-link>
            </div>
            <div class="row">
              <p class="ju mb-3 paragraph1">
                This reports provides a detailed list of all the church contacts
                celebrating their weddings within the selected period.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { inject } from "vue";
export default {
  setup() {
    const primarycolor = inject("primarycolor");

    return {
      primarycolor,
    };
  },
};
</script>

<style scoped>
.report {
  width: 100%;
  margin: auto;
}
.ju {
  text-align: start;
}
.header4 {
  font-size: 20px;
  font-weight: 700;
}
.paragraph1 {
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  background-color: #fff;
}
.rounded {
  border-color: #b0b2b5 !important;
  border-radius: 15px !important;
}
.linked {
  text-decoration: none !important;
}
</style>