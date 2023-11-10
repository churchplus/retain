<template>
  <div
    class="container max-height scroll-div"
    v-for="(item, index) in removeOthers"
    :key="index"
  >
    <div class="row mt-4">
      <div class="col-md-12 px-0">
        <label for="" class="font-weight-600">Task Type</label>
      </div>
      <div class="col-md-12 px-0">
        <Dropdown
          :options="taskTypes"
          optionLabel="name"
          class="w-100"
          placeholder="Task type"
          v-model="item.selectedTaskType"
          @change="handleSelectedTaskType"
        />
      </div>
    </div>

    <div class="row mt-4">
      <div class="col-md-12 px-0">
        <span class="d-flex align-items-center">
          <input
            type="checkbox"
            class="form-check mr-2"
            v-model="item.groupLeaders"
            @change="handleGroupLeaders"
          />
          <span>Group Leaders</span>
        </span>
      </div>
    </div>

    <div class="row mt-4">
      <div class="col-md-12 px-0">
        <label for="" class="font-weight-600">Other Contacts</label>
      </div>
      <div class="col-md-12 px-0">
        <div class="row">
          <div class="col-md-12">
            <span class="d-flex flex-wrap">
              <span
                v-for="(contact, index) in item.otherToContacts"
                :key="index"
                class="d-flex my-1 p-1 justify-content-between our-grey-bg mx-1"
                style="width: fit-content"
              >
                <span>{{ contact.name }}</span>
                <span
                  class="mx-2 font-weight-bold text-danger c-pointer"
                  @click="removeContact(index)"
                  >x</span
                >
              </span>
            </span>
          </div>
        </div>
        <SearchWithDropdown @selectmember="memberSelected" />
      </div>
    </div>

    <div class="row mt-4 mb-5">
      <div class="col-md-12 px-0">
        <label for="" class="font-weight-600">Instructions</label>
      </div>
      <div class="col-md-12 px-0">
        <textarea
          name=""
          id=""
          class="w-100 form-control"
          rows="4"
          v-model="item.instructions"
          @change="handleInstructions"
        ></textarea>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "@vue/reactivity";
import Dropdown from "primevue/dropdown";
import SearchWithDropdown from "@/components/search/SearchWithDropdown";
import { watch } from "@vue/runtime-core";

export default {
  components: { Dropdown, SearchWithDropdown },
  props: ["selectedActionIndex", "parameters", "selectAssignTaskList"],
  setup(props, { emit }) {
    const data = reactive([]);
    const actionType = reactive(5);

    const selectedTaskType = ref([]);
    const removeOthers = ref([
      {
        otherToContacts: [],
      },
    ]);

    const handleSelectedTaskType = () => {
      if (data[props.selectedActionIndex]) {
        data[props.selectedActionIndex].JSONActionParameters.taskType =
          removeOthers.value[0].selectedTaskType.index;
      } else {
        data[props.selectedActionIndex] = new Object();
        data[props.selectedActionIndex].JSONActionParameters = new Object();
        data[props.selectedActionIndex].JSONActionParameters.taskType =
          removeOthers.value[0].selectedTaskType.index;
      }

      // data.JSONActionParameters.taskType = e.value.index;
      emit("updateaction", data, props.selectedActionIndex, actionType);
    };

    const groupLeaders = ref(false);
    const handleGroupLeaders = () => {
      if (data[props.selectedActionIndex]) {
        data[props.selectedActionIndex].JSONActionParameters.groupLeaders =
          removeOthers.value[0].groupLeaders;
      } else {
        data[props.selectedActionIndex] = new Object();
        data[props.selectedActionIndex].JSONActionParameters = new Object();
        data[props.selectedActionIndex].JSONActionParameters.groupLeaders =
          removeOthers.value[0].groupLeaders;
      }

      // data.JSONActionParameters.groupLeaders = e.target.checked;
      emit("updateaction", data, props.selectedActionIndex, actionType);
    };

    const otherToContacts = ref([]);

    const instructions = ref("");
    const handleInstructions = () => {
      if (data[props.selectedActionIndex]) {
        data[props.selectedActionIndex].JSONActionParameters.instructions =
          removeOthers.value[0].instructions;
      } else {
        data[props.selectedActionIndex] = new Object();
        data[props.selectedActionIndex].JSONActionParameters = new Object();
        data[props.selectedActionIndex].JSONActionParameters.instructions =
          removeOthers.value[0].instructions;
      }

      emit("updateaction", data, props.selectedActionIndex, actionType);
    };

    const taskTypes = [
      { name: "Call", index: 0 },
      { name: "Email", index: 1 },
      { name: "Visit", index: 2 },
    ];

    const memberSelected = (memberData) => {
      if (
        memberData.member &&
        removeOthers.value[0] &&
        removeOthers.value[0].otherToContacts
      )
        removeOthers.value[0].otherToContacts.push(memberData.member);

      if (data[props.selectedActionIndex]) {
        data[props.selectedActionIndex].JSONActionParameters.otherToContacts =
          removeOthers.value[0].otherToContacts &&
          removeOthers.value[0].otherToContacts.length > 0
            ? removeOthers.value[0].otherToContacts.map((i) => i.id).join(",")
            : "";
      } else {
        data[props.selectedActionIndex] = new Object();
        data[props.selectedActionIndex].JSONActionParameters = new Object();
        data[props.selectedActionIndex].JSONActionParameters.otherToContacts =
          removeOthers.value[0].otherToContacts &&
          removeOthers.value[0].otherToContacts.length > 0
            ? removeOthers.value[0].otherToContacts.map((i) => i.id).join(",")
            : "";

        emit("updateaction", data, props.selectedActionIndex, actionType);
      }
    };

    const removeContact = (index) => {
      otherToContacts.value.splice(index, 1);
      data[props.selectedActionIndex].JSONActionParameters.otherToContacts =
        otherToContacts.value.length > 0
          ? otherToContacts.value.map((i) => i.id).join(",")
          : "";
    };

    const parsedData = ref({});
    watch(() => {
      if (props.selectAssignTaskList) {
        removeOthers.value = props.selectAssignTaskList
          .filter((i, index) => {
            return index == props.selectedActionIndex;
          })
          .map((i) => {
            i.otherToContacts = [];
            return i;
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

        removeOthers.value[0].selectedTaskType = taskTypes.find(
          (i) => i.index === parsedData.value.taskType
        );

        data[props.selectedActionIndex] = new Object();
        data[props.selectedActionIndex].JSONActionParameters = new Object();
        data[props.selectedActionIndex].JSONActionParameters.taskType =
          parsedData.value.taskType;

        removeOthers.value[0].groupLeaders = parsedData.value.groupLeaders;
        data[props.selectedActionIndex].JSONActionParameters.groupLeaders =
          parsedData.value.groupLeaders;

        removeOthers.value[0].instructions = parsedData.value.instructions;
        data[props.selectedActionIndex].JSONActionParameters.instructions =
          parsedData.value.instructions;
      }
    });

    return {
      taskTypes,
      selectedTaskType,
      handleSelectedTaskType,
      handleGroupLeaders,
      groupLeaders,
      otherToContacts,
      handleInstructions,
      instructions,
      memberSelected,
      removeContact,
      removeOthers,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>