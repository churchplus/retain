<template>
  <div class="container-top"
      :class="{ 'container-slim': lgAndUp || xlAndUp }">
    <div>
      <div
        class="d-flex flex-column flex-md-row justify-content-md-between my-3"
      >
        <div class="first-timers-text">
          <h2 class="page-header">Online Donation</h2>
        </div>

        <div class="d-flex head-button">
          <router-link to="/tenant/payment" class="mr-0 mr-md-2 w-100">
            <el-button round size="large" class="w-100"
              >View Payment form</el-button
            >
          </router-link>
          <router-link to="/tenant/payments" class="w-100 mt-2 mt-sm-0">
            <el-button
              round
              size="large"
              :color="primarycolor"
              class="header-btn w-100"
              >Add Payment form</el-button
            >
          </router-link>
        </div>
      </div>
    </div>

    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12 px-0">
          <hr class="hr" />
        </div>
      </div>

      <el-skeleton class="w-100" animated v-if="loading">
        <template #template>
          <div
            style="
              display: flex;
              align-items: center;
              justify-content: space-between;
              margin-top: 20px;
            "
          >
            <el-skeleton-item
              variant="text"
              style="width: 240px; height: 240px"
            />
            <el-skeleton-item
              variant="text"
              style="width: 240px; height: 240px"
            />
          </div>

          <el-skeleton
            class="w-100 mt-5"
            style="height: 25px"
            :rows="20"
            animated
          />
        </template>
      </el-skeleton>

      <div
        v-if="
          donationTransactions &&
          donationTransactions.length > 0 &&
          !loading &&
          !networkError
        "
      >
        <OnlineDonation
          :donationTransactions="donationTransactions"
          @get-pages="getOfferingPages"
          @contri-transac="updateTransac"
          :totalItem="totalItem"
        />
      </div>
      <div
        class="no-person"
        v-else-if="
          donationTransactions &&
          donationTransactions.length === 0 &&
          !loading &&
          !networkError
        "
      >
        <div class="empty-img">
          <p><img src="../../../assets/people/people-empty.svg" alt="" /></p>
          <p class="tip">
            You have not added any online donation yet, Set up now to enable
            your church to recieve online donation
          </p>
          <div>
            <router-link to="/tenant/payments" class="set-up py-2 px-3">
              Set up now
            </router-link>
          </div>
        </div>
      </div>
      <div v-else-if="networkError" class="adjust-network">
        <img src="../../../assets/network-disconnected.png" />
        <div>Opps, Your internet connection was disrupted</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, inject, onMounted } from "vue";
import store from "../../../store/store";
// import axios from "@/gateway/backendapi";
// import OfferingList from './OfferingList'
import OnlineDonation from "./components/OnlineDonation";
import deviceBreakpoint from "../../../mixins/deviceBreakpoint";
export default {
  components: {
    OnlineDonation,
  },
  setup() {
    const donationTransactions = ref(
      store.getters["donation/donationItem"].data
    );
    const totalItem = ref(store.getters["donation/donationItem"].totalItems);
    const loading = ref(false);
    const networkError = ref(false);
    const { lgAndUp, xlAndUp } = deviceBreakpoint();
    const primarycolor = inject("primarycolor");

    const getDonationTransaction = () => {
      loading.value = true;
      store
        .dispatch("donation/setDonationTransaction")
        .then((res) => {
          loading.value = false;
          donationTransactions.value = res.data;

          totalItem.value = res.totalItems;
        })

        .catch((err) => {
          loading.value = false;
          console.log(err);
          if (err.toString().toLowerCase().includes("network error")) {
            networkError.value = true;
          } else {
            networkError.value = false;
          }
        });
    };

    onMounted(() => {
      if (
        !donationTransactions.value ||
        (donationTransactions.value &&
          donationTransactions.value.data &&
          donationTransactions.value.data.length == 0)
      ) {
        getDonationTransaction();
      }
    });

    const getOfferingPages = (payload) => {
      donationTransactions.value = payload.data
    };

    const updateTransac = (payload) => {
      donationTransactions.value.splice(payload, 1);
    };
    return {
      donationTransactions,
      loading,
      getOfferingPages,
      updateTransac,
      totalItem,
      networkError,
      xlAndUp,
      lgAndUp,
      primarycolor,
    };
  },
};
</script>

<style scoped>
.page-header {
  font: normal normal 800 29px Nunito sans;
}

.head-button {
  display: flex;
  justify-content: flex-end;
}

@media (max-width: 577px) {
  .head-button {
    flex-direction: column;
    align-items: center;
  }

  .more {
    margin-right: 0;
  }

  .add-btn {
    margin-top: 10px;
  }
  .set-up {
    margin-top: 10px;
  }
}

@media (max-width: 575px) {
  .head-button {
    display: flex;
    /* flex-direction: row; */
    /* align-items: center; */
    justify-content: center;
  }

  /* .add-btn,
  .more {
    margin-top: 10px;
  } */
}

.add-btn {
  width: 180px;
  background: #136acd;
  border-radius: 22px;
  color: #ffffff;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 42px;
  text-decoration: none;
}
.set-up {
  width: 250px;
  background: #136acd;
  border-radius: 22px;
  color: #ffffff;
  font-weight: bold;
  /* display: flex; */
  align-items: center;
  justify-content: center;
  height: 42px;
  text-decoration: none;
}

.no-person {
  height: 80vh;
  display: flex;
  text-align: center;
}

.empty-img {
  width: 70%;
  min-width: 397px;
  margin: auto;
}

.empty-img img {
  width: 100%;
  max-width: 200px;
}

@media (max-width: 767px) {
  .first-timers-text {
    text-align: start;
  }
  .head-button {
    display: flex;
    justify-content: center;
  }
}
</style>