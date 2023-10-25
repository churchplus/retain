<template>
<div class="container-top" :class="{ 'container-slim': lgAndUp || xlAndUp }">
    <div class="">
      <div class=" d-flex flex-column flex-md-row justify-content-md-between my-3">
        <div class=" first-timers-text">
          <h2 class="page-header">Offerings</h2>
        </div>

        <div class="d-flex head-button ">
          <router-link to="/tenant/contributionCategory"  class=" mr-0 mr-md-2 w-100">
            <el-button round size="large" class=" w-100  ">View Offering Items</el-button>
          </router-link>
          <router-link to="/tenant/addoffering" class="w-100 mt-2 mt-sm-0">
          <el-button  round size="large" :color="primarycolor" class="header-btn w-100 ">Add Offering</el-button>
          </router-link>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <hr class="hr" />
      </div>
    </div>
    <div class="container-fluid">
      
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
    

    <div v-if="(contributionTransactions && contributionTransactions.length > 0 ) && !loading && !networkError">
        <OfferingList :contributionTransactions="contributionTransactions" @marked="removeMultipleOffering" @get-pages="getOfferingPages" @contri-transac="updateTransac" :totalItem="totalItem"/>
    </div> 
    <div class="no-person"  v-else-if="(contributionTransactions && contributionTransactions.length === 0 ) && !loading && !networkError">
        <div class="empty-img">
            <p><img src="../../../assets/people/people-empty.svg" alt="" /></p>
            <p class="tip">You haven't added any offering transaction yet</p>
        </div>
    </div>
    <div v-else-if="networkError" class="adjust-network">
      <img src="../../../assets/network-disconnected.png" >
      <div>Opps, Your internet connection was disrupted</div>
    </div>
  </div>
</div>
</template>

<script>
import { ref, onMounted, inject } from 'vue'
// import { useStore } from 'vuex'
import store from "../../../store/store";
// import axios from "@/gateway/backendapi"
import deviceBreakpoint from "../../../mixins/deviceBreakpoint";
import OfferingList from './OfferingList'
export default {
    components: {
        OfferingList
    },
    setup () {
        const contributionTransactions = ref(store.getters["contributions/contributionsList"].data)
        const { lgAndUp, xlAndUp } = deviceBreakpoint();
        const primarycolor = inject('primarycolor')
        const totalItem = ref(store.getters["contributions/contributionsList"].totalItems)
        const loading = ref(false)
        const networkError = ref(false)

        const removeMultipleOffering = (payload) => {
          contributionTransactions.value = contributionTransactions.value.filter((item) => {
                  const y = payload.findIndex(
                    (i) => i.id === item.id
                  );
                  if (y >= 0) return false;
                  return true;
                });
        }
        const getContributionTransactions = async () => {
                try {
                      loading.value = true
                      await store.dispatch("contributions/setContributionList").then((res) => {
                        contributionTransactions.value = res.data;
                        totalItem.value = res.totalItems
                        loading.value = false;
                      });
                    } catch (error) {
                      console.log(error);
                      loading.value = false;
                      if(err.toString().toLowerCase().includes("network error")) {
                          networkError.value = true
                        } else {
                          networkError.value = false
                        }
                    }
    };

    onMounted(() => {
      if ((!contributionTransactions.value) || (contributionTransactions.value && contributionTransactions.value.contribution && contributionTransactions.value.contribution.length == 0)){
        getContributionTransactions();
      }
    });

    const getOfferingPages = (payload) => {
      contributionTransactions.value = payload.data
    }

    const updateTransac = (payload) => {
      contributionTransactions.value.splice(payload, 1)
    }
        return {
            contributionTransactions, primarycolor, xlAndUp, lgAndUp, loading, getOfferingPages, updateTransac, totalItem, networkError, removeMultipleOffering
        }
    }
}
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
    margin-top: 10px
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

.no-person {
  height: 80vh;
  display: flex;
  text-align: center;
}

.empty-img {
  width: 30%;
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
    justify-content: center
  }
 }

</style>