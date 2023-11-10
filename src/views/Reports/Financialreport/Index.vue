<template>
  <div class="container-fluid px-0">
    <div class="row mt-5">
      <div class="col-md-12 col-12 px-0 text-center">
        <div
          class="row tabl border-0 report d-flex justify-content-between p-2 p-md-4"
        >
          <div class="col-md-6 col-12 pr-md-4 p-0">
            <h4 class="ju header4">Statement of activities</h4>
            <p class="ju paragraph1">Have an Overview of your cash flow.</p>
          </div>
          <!-- border-bottom -->
          <div class="col-md-5 border-bottom col-12 mt-4">
            <div
              class="row d-md-flex justify-content-md-between d-flex justify-content-between"
            >
              <router-link
                to="/tenant/reports/incomestatementreport"
                class="linked"
              >
                <h4
                  class="ju header4 d-md-flex justify-content-md-start"
                  style="color: #136acd"
                >
                  Income Statement
                </h4>
              </router-link>
              <router-link
                to="/tenant/reports/incomestatementreport"
                class="linked"
              >
                <span
                  ><el-icon :color="primarycolor" :size="24"
                    ><ArrowRightBold /></el-icon
                ></span>
              </router-link>
            </div>
            <div class="row">
              <p class="ju mb-3 paragraph1">
                Snapshot of income statement activitites for your church
              </p>
            </div>
          </div>

          <div class="col-md-6 col-12 pr-md-4 p-0"></div>
          <div class="col-md-5 border-bottom col-12 mt-4">
            <div
              class="row d-md-flex justify-content-md-between d-flex justify-content-between"
            >
              <router-link to="/tenant/reports/incomereport" class="linked">
                <h4
                  class="ju header4 d-md-flex justify-content-md-start"
                  style="color: #136acd"
                >
                  Income [Inflow] Report
                </h4>
              </router-link>
              <router-link to="/tenant/reports/incomereport" class="linked">
                <span
                  ><el-icon :color="primarycolor" :size="24"
                    ><ArrowRightBold /></el-icon
                ></span>
              </router-link>
            </div>
            <div class="row">
              <p class="ju mb-3 paragraph1">
                Snapshot of income inflow report for your church
              </p>
            </div>
          </div>

          <div class="col-md-6 col-12 pr-md-4 p-0"></div>

          <div class="col-md-5 col-12">
            <div
              class="row pt-3 d-md-flex justify-content-md-between d-flex justify-content-between"
            >
              <router-link to="/tenant/reports/expensereport" class="linked">
                <h4
                  class="ju header4 d-md-flex justify-content-md-start"
                  style="color: #136acd"
                >
                  Expense Report
                </h4>
              </router-link>
              <router-link to="/tenant/reports/expensereport">
                <span
                  ><el-icon :color="primarycolor" :size="24"
                    ><ArrowRightBold /></el-icon></span
              ></router-link>
            </div>
            <div class="row">
              <p class="ju mb-3 paragraph1">
                Snapshot of what your church owes to others.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--border 2-->
    <div class="row mt-5">
      <div class="col-md-12 col-12 px-0 text-center">
        <div
          class="row tabl border-0 report d-flex justify-content-between p-2 p-md-4"
        >
          <div class="col-md-6 col-12 pr-md-4 p-0">
            <h4 class="ju header4">Contributions</h4>
            <p class="ju paragraph1">
              See an overview of how contributions are made in your ministry
            </p>
          </div>
          <div class="col-md-5 col-12">
            <router-link :to="{ name: 'FinancialOfferingReport' }">
              <div
                class="row d-md-flex justify-content-md-between d-flex justify-content-between"
              >
                <h4
                  class="ju header4 d-md-flex justify-content-md-start"
                  style="color: #136acd"
                >
                  Offering [Contribution] Report
                </h4>
                <span
                  ><el-icon :color="primarycolor" :size="24"
                    ><ArrowRightBold /></el-icon
                ></span>
              </div>
            </router-link>
            <div class="row">
              <p class="ju mb-3 paragraph1">
                Snapshot of contribution(offering) made to your church
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-5">
      <div class="col-md-12 col-12 px-0 text-center">
        <div
          class="row tabl border-0 report d-flex justify-content-between p-2 p-md-4"
        >
          <div class="col-md-6 col-12 pr-md-4 p-0">
            <h4 class="ju header4">Pledges and Partnership</h4>
            <p class="ju paragraph1">
              See an overview of how pledges are made in your ministry
            </p>
          </div>
          <div class="col-md-5 col-12">
            <router-link :to="{ name: 'FinancialPledgesReport' }">
              <div
                class="row d-md-flex justify-content-md-between d-flex justify-content-between"
              >
                <h4
                  class="ju header4 d-md-flex justify-content-md-start"
                  style="color: #136acd"
                >
                  Pledges/Partnership Report
                </h4>
                <span
                  ><el-icon :color="primarycolor" :size="24"
                    ><ArrowRightBold /></el-icon
                ></span>
              </div>
            </router-link>
            <div class="row">
              <p class="ju mb-3 paragraph1">
                Snapshot of pledges/partnership  made to your church
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--border 2-->
    <!--border 3-->
    <div class="row mt-5 mb-5">
      <div class="col-md-12 col-12 px-0 text-center">
        <div
          class="row tabl border-0 report d-flex justify-content-between p-2 p-md-4"
        >
          <div class="col-md-6 col-12 pr-md-4 p-0">
            <h4 class="ju header4">Transactions</h4>
            <p class="ju paragraph1">
              See an overflow of transactions performed in your church
            </p>
          </div>
          <div class="col-md-5 col-12 border-bottom">
            <div
              class="row d-md-flex justify-content-md-between d-flex justify-content-between"
            >
              <router-link
                to="/tenant/reports/accountingtransactionreport"
                class="linked"
              >
                <h4
                  class="ju header4 d-md-flex justify-content-md-start"
                  style="color: #136acd"
                >
                  Account Transactions
                </h4></router-link
              >
              <router-link to="/tenant/reports/accountingtransactionreport">
                <span
                  ><el-icon :color="primarycolor" :size="24"
                    ><ArrowRightBold /></el-icon></span
              ></router-link>
            </div>
            <div class="row">
              <p class="ju mb-3 paragraph1">
                Snapshot of account transactions. and what you
              </p>
            </div>
          </div>
          <div class="col-md-6 col-12 pr-md-4 p-0"></div>
          <div class="col-md-5 col-12 mt-4">
            <div
              class="row d-md-flex justify-content-md-between d-flex justify-content-between"
            >
              <router-link
                to="/tenant/reports/financialactivitiesbalance"
                class="linked"
              >
                <h4
                  class="ju header4 d-md-flex justify-content-md-start"
                  style="color: #136acd"
                >
                  Account Activites and Balance
                </h4>
              </router-link>
              <router-link to="/tenant/reports/financialactivitiesbalance">
                <span
                  ><el-icon :color="primarycolor" :size="24"
                    ><ArrowRightBold /></el-icon
                ></span>
              </router-link>
            </div>
            <div class="row">
              <p class="ju mb-3 paragraph1">
                Snapshot of account activities and balance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--border 3-->
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