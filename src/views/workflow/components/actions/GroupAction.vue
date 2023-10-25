<template>
  <div
    class="container max-height px-0 scroll-div"
    v-for="(item, index) in removeOthers"
    :key="index"
  >
    <div class="row">
      <div class="col-md-12 my-3">
        <Dropdown
          :options="['Add to', 'Remove from']"
          v-model="item.addOrRemove"
          @change="handleAddOrRemove"
          placeholder="Add the person to"
          class="w-100"
        />
      </div>

      <div class="col-md-12 my-3">
        <MultiSelect
          :options="groups"
          v-model="item.selectedGroups"
          optionLabel="name"
          @change="handleSelectedGroups"
          placeholder="Select groups"
          class="w-100"
          display="chip"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Dropdown from "primevue/dropdown";
import { reactive, ref } from "@vue/reactivity";
import MultiSelect from "primevue/multiselect";
import workflow_util from "../../utlity/workflow_util";
import { watch } from "@vue/runtime-core";
export default {
  components: { Dropdown, MultiSelect },
  props: ["groups", "selectedActionIndex", "parameters", "selectGroupList"],
  setup(props, { emit }) {
    const data = reactive([]);
    const actionType = reactive(4);

    const selectedGroups = ref([]);
    const removeOthers = ref([]);
    const handleSelectedGroups = (e) => {
      const allGroupsIndex = removeOthers.value[0].selectedGroups.findIndex(
        (i) => i.id === "00000000-0000-0000-0000-000000000000"
      );

      if (data[props.selectedActionIndex]) {
        data[props.selectedActionIndex].JSONActionParameters.groups =
          allGroupsIndex < 0
            ? e.value.map((i) => i.id).join(",")
            : "00000000-0000-0000-0000-000000000000";
      } else {
        data[props.selectedActionIndex] = new Object();
        data[props.selectedActionIndex].JSONActionParameters = new Object();
        data[props.selectedActionIndex].JSONActionParameters.groups =
          allGroupsIndex < 0
            ? e.value.map((i) => i.id).join(",")
            : "00000000-0000-0000-0000-000000000000";
      }
      emit("updateaction", data, props.selectedActionIndex, actionType);
    };
    const addOrRemove = ref("");
    const handleAddOrRemove = () => {
      if (data[props.selectedActionIndex]) {
        data[props.selectedActionIndex].JSONActionParameters.addOrRemove =
          removeOthers.value[0].addOrRemove;
      } else {
        data[props.selectedActionIndex] = new Object();
        data[props.selectedActionIndex].JSONActionParameters = new Object();
        data[props.selectedActionIndex].JSONActionParameters.addOrRemove =
          removeOthers.value[0].addOrRemove;
      }

      emit("updateaction", data, props.selectedActionIndex, actionType);
    };

    const parsedData = ref({});
    watch(() => {
      if (props.selectGroupList) {
        removeOthers.value = props.selectGroupList.filter((i, index) => {
          return index == props.selectedActionIndex;
        });
      }
      if (
        removeOthers.value &&
        removeOthers.value[0].action &&
        removeOthers.value[0].action.jsonActionParameters
      ) {
        parsedData.value = JSON.parse(
          removeOthers.value[0].action.jsonActionParameters
        );

        removeOthers.value[0].selectedGroups = workflow_util.getGroups(
          parsedData.value.groups,
          props.groups
        );
        data[props.selectedActionIndex] = new Object();
        data[props.selectedActionIndex].JSONActionParameters = new Object();
        data[props.selectedActionIndex].JSONActionParameters.groups =
          parsedData.value.groups;

        removeOthers.value[0].addOrRemove = parsedData.value.addOrRemove;
        data[props.selectedActionIndex].JSONActionParameters.addOrRemove =
          parsedData.value.addOrRemove;
      }
    });

    return {
      selectedGroups,
      handleSelectedGroups,
      handleAddOrRemove,
      addOrRemove,
      removeOthers,
    };
  },
};
</script>

<style scoped>
</style>