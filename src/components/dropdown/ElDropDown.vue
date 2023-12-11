<template>
  <el-dropdown trigger="click" class="w-100">
    <div
      class="d-flex justify-content-between border-contribution text-dark w-100"
      ref="dropdownToggle"
    >
      <span class="medium-secondary font-weight-600 s-16" v-if="multiple">
      <span v-if="multipleItems.length > 0">
        <el-tag
          class="m-1"
          size="large"
          @close="removeTag(index)"
          type="info"
          closable
          v-for="(item, index) in multipleItems"
          :key="index"
          >{{ optionLabel ? item[optionLabel] : item }}</el-tag
        >
      </span>
        <span v-else>{{ placeholder }}</span>
      </span>
      <span class="medium-secondary font-weight-600 s-16" v-else>{{
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
        <el-dropdown-item
          v-for="(item, index) in options"
          :key="index"
          @click="onValueSelect(item)"
        >
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
import { ElMessage } from "element-plus";

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
      required: false,
    },
    multiple: {
      type: Boolean,
      required: false,
    },
  },
  emits: ["selectedvalue"],
  setup(props, { emit }) {
    const selectedValue = ref("");
    const dropdownToggle = ref("");
    const multipleItems = ref([]);

    const onValueSelect = (item) => {
      if (props.multiple) {
        const find_value = multipleItems.value.findIndex(i => i.id == item.id);
        if (find_value < 0) {
          multipleItems.value.push(item);
        } else {
          ElMessage({
            type: "warning",
            message: "Item already selected",
            duration: 5000,
          });
        }
        //   Emit selected value to parent component
        emit("selectedvalue", multipleItems.value);
      } else {
        if (props.optionLabel) {
          selectedValue.value = item[props.optionLabel];
        } else {
          selectedValue.value = item;
        }
        //   Emit selected value to parent component
        emit("selectedvalue", item);
      }
    };
    
    const removeTag = (index) => {
      multipleItems.value.splice(index, 1);
      //   Emit selected value to parent component
      emit("selectedvalue", multipleItems.value);
    };

    watchEffect(() => {
      let childElement = dropdownToggle.value;
      // Create a style tag
      var styleTag = document.createElement("style");

      // Append the style tag to the document head
      document.head.appendChild(styleTag);

      // Define the CSS rule with the desired style
      var cssRule = `.el-popper.el-dropdown__popper {width: ${childElement.offsetWidth ? childElement.offsetWidth : 0}px}`;

      // Add the CSS rule to the style tag
      styleTag.textContent = cssRule;

      // set current value
      if (props.setcurrentvalue) {
        if (props.optionLabel) {
          selectedValue.value = props.setcurrentvalue[props.optionLabel];
        } else {
          selectedValue.value = props.setcurrentvalue;
        }
      }
    });
    return {
      selectedValue,
      onValueSelect,
      dropdownToggle,
      multipleItems,
      removeTag,
    };
  },
};
</script>
