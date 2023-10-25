<template>
  <div class="container max-height px-0 scroll-div">
    <div class="row text-center dotted-border-bottom">
      <div class="col-md-12 my-3">
        <TriggerDescription
          :header="'Attendance'"
          :description="description"
          @removetrigger="removeTrigger"
        />
      </div>
    </div>

    <div class="row mt-4">
      <div class="col-md-12">
        <label for="" class="font-weight-600">A member of</label>
      </div>
      <div class="col-md-12 mb-2 mt-1">
        <MultiSelect
          @change="groupSelected"
          v-model="selectedGroups"
          optionLabel="name"
          :options="groups"
          placeholder="Select group"
          class="w-100"
          display="chip"
        />
      </div>

      <div class="col-md-12 mt-3">
        <label for="" class="font-weight-600">Is marked</label>
      </div>
      <div class="col-md-12 mb-2 mt-1">
        <Dropdown
          @change="handleStatus"
          v-model="selectedStatus"
          :options="['Present', 'Absent']"
          placeholder="Select status"
          class="w-100"
        />
      </div>

      <div class="col-md-12 mt-3">
        <label for="" class="font-weight-600">In</label>
      </div>
      <div class="col-md-12 mb-2 mt-1">
        <Dropdown
          @change="handleEvent"
          v-model="selectedEvent"
          :options="eventCategories"
          optionLabel="name"
          placeholder="Select event"
          class="w-100"
        />
      </div>

      <div class="col-md-12 mt-3">
        <label for="" class="font-weight-600">Time(s)</label>
      </div>
      <div class="col-md-12 mb-2">
        <input
          type="text"
          v-model="times"
          @change="handleTimes"
          class="form-control"
        />
      </div>

      <div class="col-md-12 mt-4">
        <label for="" class="font-weight-600"
          >In the last (how many days?)</label
        >
      </div>
      <div class="col-md-12 mb-2">
        <input
          type="text"
          class="form-control"
          v-model.number="days"
          @change="handleDays"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Dropdown from "primevue/dropdown";
import MultiSelect from "primevue/multiselect";
import TriggerDescription from "../TriggerDescription.vue";
import { reactive, ref } from "@vue/reactivity";
import { computed, watchEffect } from "@vue/runtime-core";
import workflow_util from "../../utlity/workflow_util";
import eventsService from "../../../../services/events/eventsservice";

export default {
  components: { Dropdown, TriggerDescription, MultiSelect },
  props: ["groups", "contributionItems", "selectedTriggerIndex", "condition"],
  setup(props, { emit }) {
    const data = reactive({});
    const eventCategories = ref([]);

    const selectedStatus = ref([]);
    const handleStatus = (e) => {
      data.attendanceStatus = e.value;
      emit("updatetrigger", JSON.stringify(data), props.selectedTriggerIndex);
    };

    const days = ref(0);
    const handleDays = (e) => {
      data.days = e.target.value;
      emit("updatetrigger", JSON.stringify(data), props.selectedTriggerIndex);
    };

    const times = ref([]);
    const handleTimes = (e) => {
      data.times = e.target.value;
      emit("updatetrigger", JSON.stringify(data), props.selectedTriggerIndex);
    };

    const selectedGroups = ref([]);
    const groupSelected = (e) => {
      const allGroupsIndex = selectedGroups.value.findIndex(
        (i) => i.id === "00000000-0000-0000-0000-000000000000"
      );
      data.groups =
        allGroupsIndex < 0
          ? e.value.map((i) => i.id).join(",")
          : "00000000-0000-0000-0000-000000000000";

      emit("updatetrigger", JSON.stringify(data), props.selectedTriggerIndex);
    };

    const selectedEvent = ref({});
    const handleEvent = () => {
      data.eventID = selectedEvent.value.id;
      emit("updatetrigger", JSON.stringify(data), props.selectedTriggerIndex);
    };

    const description = computed(() => {
      return {
        id: 10,
        selectedStatus:
          data.attendanceStatus && data.attendanceStatus.length > 0
            ? data.attendanceStatus
            : ["____"],
        numOfTimes: data.times,
        timesInLastWeek: data.days,
        selectedGroups:
          selectedGroups.value.length > 0
            ? selectedGroups.value.map((i) => i.name)
            : ["___"],
      };
    });

    const removeTrigger = () => {
      emit("removetrigger");
    };

    const parsedData = ref({});
    watchEffect(() => {
      if (props.condition.jsonCondition) {
        parsedData.value = JSON.parse(props.condition.jsonCondition);
        selectedStatus.value = parsedData.value.attendanceStatus;
        data.attendanceStatus = parsedData.value.attendanceStatus;

        data.groups = parsedData.value.groups;
        selectedGroups.value =
          props.groups.length > 0
            ? workflow_util.getGroups(
                JSON.stringify(parsedData.value.groups),
                props.groups
              )
            : [];

        data.eventID = parsedData.value.eventID;
        selectedEvent.value = eventCategories.value.find(
          (i) => i.id === parsedData.value.eventID
        );

        data.times = parsedData.value.times;
        times.value = parsedData.value.times;

        data.days = parsedData.value.days;
        days.value = parsedData.value.days;
      }
    });

    const getEventCategories = async () => {
      const data = await eventsService.getEventCategories();
      eventCategories.value = data;
    };
    getEventCategories();

    return {
      handleStatus,
      selectedStatus,
      days,
      handleDays,
      times,
      handleTimes,
      selectedGroups,
      groupSelected,
      description,
      removeTrigger,
      eventCategories,
      selectedEvent,
      handleEvent,
    };
  },
};
</script>

<style scoped>
.dotted-border-bottom {
  border-bottom: dotted 2px #ddd;
}

.max-height {
  max-height: calc(100vh - 300px);
}
</style>