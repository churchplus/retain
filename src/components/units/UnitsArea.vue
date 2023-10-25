<template>
  <div class="">
    <div class="d-sm-flex align-items-center flex-column units-div mt-3">
      <div class="col-sm-12">
        <h4 class="font-weight-bold mb-0 center-flexed">{{ balance.toFixed(2) }}</h4>
        <p class="font-weight-bold mb-0 center-flexed">
          SMS Units
        </p>
      </div>
      <div class="col-sm-12 d-flex justify-content-center mt-2">
        <el-button class="btn buy-btn center-flexed" @click="goToBuyUnit">
          <span class="btn-text box-btn-text2"> BUY UNITS </span>
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import userService from "../../services/user/userservice"
import router from "@/router/index";
import { useStore } from "vuex"

export default {
  setup() {
    const store = useStore();
    const currentUser = ref(store.getters.currentUser && store.getters.currentUser.smsBalance ? store.getters.currentUser.smsBalance : 0)
    const getCurrentUserBalance = async () => {

      try {
        const data = await userService.getCurrentUser();
        currentUser.value = data.smsBalance;
      } catch (error) {
        console.log(error);
      }
    }
    if (!currentUser.value || currentUser.value === 0) getCurrentUserBalance();

    const balance = computed(() => {
      return currentUser.value;
    })

    const goToBuyUnit = () => {
      router.push("/tenant/units")
    };

    return {
      balance,
      goToBuyUnit,
      currentUser
    }
  }
}
</script>

<style scoped>
.units-div {
  border: 1px solid #dde2e6;
  border-radius: 7px;
  padding: 15px 0;
  background: #f5ebeb1c !important;
}

.buy-btn {
  font-weight: 700;
  /* background: rgb(112, 142, 177, 0.33); */
  background: rgba(255, 166, 0, 0.241);
  border-radius: 22px;
}

.btn-text {
  opacity: 1;
  font-size: 11px;
  font-weight: 700;
}

.box-btn-text2 {
  font-weight: 800;
  /* color: #ffe50f; */
  /* color: rgb(147, 95, 0) */
  color: #136acd;
}

.center-flexed {
  display: flex;
  justify-content: center;
}

@media screen and (max-width: 767px) {
  .hidden-header {
    display: inline-block;
    font-size: 12px;
  }

  .header-row {
    display: none;
  }

  #menu-items {
    flex-direction: row !important;
  }

  .search-div {
    width: 100%;
  }

  .units-div {
    width: 100%;
  }

  .units-container {
    margin-left: 0;
    margin: auto;
  }

  .center-flexed {
    text-align: center;
  }
}
</style>