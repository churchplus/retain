<template>
  <div class="container max-height px-0 scroll-div">
    <div>
      <div class="row text-center dotted-border-bottom">
          <div class="col-md-12 my-3">
              <TriggerDescription :header="'Individual - Event'" :description="description" @removetrigger="removeTrigger" />
          </div>
      </div>

      <div class="row mt-5">
        <div class="col">
          <label for="" class="font-weight-700"
            >Match a Individual of</label
          >
        </div>
      </div>
      <div class="row">
        <div class="col">
          <MultiSelect v-model="selectedGroups" optionLabel="name" @change="handleSelectedGroups" :options="groups"  placeholder="Select groups" class="w-100"  display="chip" />
        </div>
      </div>
    </div>

    <div>
      <div class="row mt-4">
        <div class="col">
          <label for="" class="font-weight-700"
            >Who's</label
          >
        </div>
      </div>
      <div class="row">
        <div class="col">
          <Dropdown
            :options="[
              'Birthday',
              'Wedding Date',
              'Baptism',
              'Last Attended',
              'Last Contributed',
            ]"
            v-model="eventType"
            @change="handleEventType"
            placeholder="Birthday"
            style="width: 100%"
          />
        </div>
      </div>
    </div>

    <div>
      <div class="row mt-4">
        <div class="col">
          <label for="" class="font-weight-700"
            >is</label
          >
        </div>
      </div>
      <div class="row">
        <div class="col">
          <Dropdown
            :options="daysOptions"
            v-model="days"
            @change="handleDays"
            optionLabel="name"
            style="width: 100%"
          />
        </div>
      </div>
    </div>

      <div>
      <div class="row mt-4">
        <div class="col">
          <label for="" class="font-weight-700"
            >In the</label
          >
        </div>
      </div>
      <div class="row">
        <div class="col">
          <Dropdown
            :options="[
              'Past',
              'Future'
            ]"
            v-model="pastOrFuture"
            @change="handlePastOrFuture"
            placeholder=""
            style="width: 100%"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Dropdown from "primevue/dropdown";
import MultiSelect from "primevue/multiselect";
import { reactive, ref } from '@vue/reactivity';
import { computed, watch } from '@vue/runtime-core';
import TriggerDescription from '../TriggerDescription.vue'
import workflow_util from '../../utlity/workflow_util';

export default {
  props: [ "groups", "selectedTriggerIndex", "condition" ],
  components: {
    Dropdown, MultiSelect, TriggerDescription
  },
  setup(props, { emit }) {
    const data = reactive({ })

    const selectedGroups = ref([ ]);
    const handleSelectedGroups = e => {
      const allGroupsIndex = selectedGroups.value.findIndex(i => i.id === "00000000-0000-0000-0000-000000000000");
      data.groups = allGroupsIndex < 0 ? e.value.map(i => i.id).join(',') : "00000000-0000-0000-0000-000000000000";
      emit('updatetrigger', JSON.stringify(data), props.selectedTriggerIndex)
    }

    const eventType = ref('');
    const handleEventType = e => {
      data.event = e.value;
      emit('updatetrigger', JSON.stringify(data), props.selectedTriggerIndex)
    }

    const daysArr = [
      { type: 'day', length: 0, name: 'Today' },
      { type: 'day', length: 1 },
      { type: 'day', length: 1 },
      { type: 'days', length: 2 },
      { type: 'days', length: 3 },
      { type: 'days', length: 5 },
      { type: 'week', length: 1 },
      { type: 'weeks', length: 2 },
      { type: 'weeks', length: 3 },
      { type: 'month', length: 1 },
      { type: 'months', length: 2 },
      { type: 'months', length: 3 }
    ]
    const daysOptions = computed(() => {
      return daysArr.map(i => {
        i.name = i.name ? i.name : `${i.length} ${i.type}`;
        return i;
      })
    })
    const days = ref('');
    const handleDays = e => {
      const selectedDuration = e.value;
      data.days = selectedDuration.type.includes('day') ? selectedDuration.length : selectedDuration.type.includes('week') ? selectedDuration.length * 7 : selectedDuration.length * 30;
      emit('updatetrigger', JSON.stringify(data), props.selectedTriggerIndex)
    }

    const pastOrFuture = ref('');
    const handlePastOrFuture = e => {
      data.pastOrFuture = e.value === 'Past' ? 1 : 0;
      emit('updatetrigger', JSON.stringify(data), props.selectedTriggerIndex)
    }

    const description = computed(() => {
      return {
          id: 12,
          groups: selectedGroups.value && selectedGroups.value.length > 0 ? selectedGroups.value.map(i => i.name) : ['_____'],
          event: data.event  ? data.event : "____",
          days: data.days ? data.days : "____",
          pastOrFuture: pastOrFuture.value ? pastOrFuture.value : "____",
      }
    })

    const removeTrigger = () => {
      emit("removetrigger")
    }

    const parsedData = ref({ })
    watch(() => {
      console.log(props.condiction);
      if (props.condition.jsonCondition) {
          parsedData.value = JSON.parse(props.condition.jsonCondition);
          eventType.value = parsedData.value.event;
          data.event = parsedData.value.event;

          days.value = parsedData.value.days;
          data.days = parsedData.value.days;

          selectedGroups.value = props.groups.length > 0 ? workflow_util.getGroups(parsedData.value.groups, props.groups) : [ ];
          data.groups = parsedData.value.groups;

          pastOrFuture.value = parsedData.value.givenAtLeastTimes === 1 ? 'Past' : 'Future';
          data.givenAtLeastTimes = parsedData.value.givenAtLeastTimes;
      }
    }) 

    return {
      selectedGroups,
      handleSelectedGroups,
      eventType,
      handleEventType,
      daysOptions,
      days,
      handleDays,
      pastOrFuture,
      handlePastOrFuture,
      description,
      removeTrigger,
    };
  },
};
</script>