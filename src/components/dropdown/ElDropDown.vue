<template>
  <el-dropdown trigger="click" class="w-100">
    <div
      class="d-flex justify-content-between border-contribution text-dark w-100"
      ref="dropdownToggle"
    >
      <span class="medium-secondary font-weight-600 s-16">{{
        selectedValue ? selectedValue : placeholder
      }}</span>
      <div class="d-flex align-items-center">
        <div class="seperation-bar2 ml-3 mr-1"></div>
        <el-icon color="#CCCCCC" size="20" class="el-icon--right">
          <arrow-down />
        </el-icon>
      </div>
    </div>
    <template class="w-100" #dropdown>
      <el-dropdown-menu class="w-100">
        <el-dropdown-item v-for="(item, index) in options" :key="index" @click="onValueSelect(item)">
          <div>
            {{ optionLabel ? item[optionLabel] : item }}
          </div>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script>
import { ref, watchEffect } from "vue";

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
    setcurrentvalue: {
      required: false
    }
  },
  emits: ["selectedvalue"],
  setup(props, { emit }) {
    const selectedValue = ref("");
    const dropdownToggle = ref("");

    const onValueSelect = (item) => {
      if (props.optionLabel) {
        selectedValue.value = item[props.optionLabel];
      } else {
        selectedValue.value = item;
      }
      //   Emit selected value to parent component
      emit("selectedvalue", item);
    };


    watchEffect(() => {
      let childElement = dropdownToggle.value;
      // Create a style tag
      var styleTag = document.createElement("style");

      // Append the style tag to the document head
      document.head.appendChild(styleTag);

      // Define the CSS rule with the desired style
      var cssRule = `.el-popper.el-dropdown__popper {width: ${childElement.offsetWidth}px}`;

      // Add the CSS rule to the style tag
      styleTag.textContent = cssRule;

      // set current value
   if (props.setcurrentvalue) {
      if (props.optionLabel) {
      selectedValue.value = props.setcurrentvalue[props.optionLabel]
    } else {
        selectedValue.value = props.setcurrentvalue
      }
   }
    });
    return {
      selectedValue,
      onValueSelect,
      dropdownToggle,
    };
  },
};
</script>
