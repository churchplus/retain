<template>
    <div class="" :class="{ 'container-slim': lgAndUp || xlAndUp }">
    <div class="container-fluid container-top " >
      <div class=" row mb-2 d-flex flex-column flex-sm-row justify-content-sm-between ">
        <div class="head-text">
          Offering Items
        </div>
        <router-link to="/tenant/offeringcategory" class="  no-decoration">
            <el-button class="header-btn" :color="primarycolor" round>
              Add Offering Category
            </el-button>
          </router-link>
      </div>
    

    <div class="container-fluid px-0">
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


    <div v-if="contributionItems.length > 0 && !loading && !networkError">
        <ContributionCategoryList :contributionItems="contributionItems" @get-pages="getOfferingPages" @contri-items="updateItems"/>
    </div>
    <div class="no-person"  v-if="contributionItems.length === 0 && !loading && !networkError">
        <div class="empty-img">
            <p><img src="../../../assets/people/people-empty.svg" alt="" /></p>
            <p class="tip">You haven't added any offering category yet</p>
        </div>
    </div>
    <div v-else-if="networkError" class="adjust-network">
      <img src="../../../assets/network-disconnected.png" >
      <div>Opps, Your internet connection was disrupted</div>
    </div>
    </div>
    </div>
    </div>      
</template>

<script>
import { ref, inject, onMounted } from 'vue'
import store from "../../../store/store"
import ContributionCategoryList from './ContributionCategoryList'
import Loader from './SkeletonLoader'
import finish from '../../../services/progressbar/progress'
import deviceBreakpoint from "../../../mixins/deviceBreakpoint";
export default {
    components: {
        ContributionCategoryList, Loader
    },
    setup () {
        const contributionItems = ref(store.getters["contributions/contributionsItem"])
        const loading = ref(false);
        const primarycolor = inject("primarycolor");
        const { lgAndUp, xlAndUp } = deviceBreakpoint();
        const networkError = ref(false)


        const getContributionCategory = async () => {
              try {
                      loading.value = true
                      await store.dispatch("contributions/setContributionItem").then((res) => {
                        contributionItems.value = res;
                        loading.value = false;
                      });
                    } catch (error) {
                      console.log(error);
                       finish()
                      loading.value = false;
                      if(err.toString().toLowerCase().includes("network error")) {
                          networkError.value = true
                        } else {
                          networkError.value = false
                        }
                    }
    };

    onMounted(() => {
      if (contributionItems.value && contributionItems.value.length == 0) getContributionCategory();;
    });

    const getOfferingPages = (payload) => {
      console.log(payload, 'kjhkjhk');
      contributionItems.value = payload
    }

    const updateItems = (payload) => {
      contributionItems.value.splice(payload, 1)
    }
        return {
            contributionItems, loading, lgAndUp, xlAndUp, primarycolor,  getOfferingPages, updateItems, networkError
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
  width: 260px;
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
    text-align: center;
  }
  .head-button {
    display: flex;
    justify-content: center
  }
 }

</style>