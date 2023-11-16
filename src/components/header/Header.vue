<template>
  <div class="header-wrapper px-3 bg-white">
    <div class="d-flex align-items-center">
      <h2 class="">{{ headerName }}</h2>
      <slot name="button" />
    </div>

    <div class="d-flex align-items-center">
      <div class="secondary-text font-weight-600">{{ todayDate }}</div>
      <div class="seperation-bar ml-3"></div>
      <el-icon class="ml-3"><Bell /></el-icon>
    </div>
  </div>
</template>

<script>
import { computed, inject } from "vue";
import moment from "moment";

export default {
  props: ["headerName"],
  setup() {
    const primarycolor = inject("primarycolor");
    const todayDate = computed(() => {
      return moment().format("MMMM Do, YYYY");
    });
    return {
      todayDate,
      primarycolor,
    };
  },
};
</script>

<style scoped>
.header-wrapper {
  display: flex;
  padding: 15px 0;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

@media(max-width: 500px) {
    .header-wrapper {
        flex-direction: column;
    }
}
</style>
