<template>
  <el-dropdown trigger="click" class="w-100">
    <div class="d-flex justify-content-between border-contribution text-dark w-100">
      <span class="medium-secondary font-weight-600 s-16">{{
        selectedValue ? selectedValue : placeholder
      }}</span>
      <div class="d-flex align-items-center">
        <div class="seperation-bar2 mr-1"></div>
        <el-icon color="#CCCCCC" size="20" class="el-icon--right">
          <arrow-down />
        </el-icon>
      </div>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item v-for="(item, index) in options" :key="index">
          <div @click="onValueSelect(item)">
            {{ optionLabel ? item[optionLabel] : item }}
          </div>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script>
import { ref } from "vue";

export default {
  props: {
    options: {
      type: Array,
      required: true,
    },
    placeholder: {
      type: String,
      required: false,
    },
    optionLabel: {
      type: String,
      required: false,
    },
  },
  emits: ["selectedvalue"],
  setup(props, { emit }) {
    const selectedValue = ref("");

    const onValueSelect = (item) => {
      if (props.optionLabel) {
        selectedValue.value = item[props.optionLabel];
      } else {
        selectedValue.value = item;
      }
      //   Emit selected value to parent component
      emit("selectedvalue", item);
    };
    return {
      selectedValue,
      onValueSelect,
    };
  },
};
</script>
