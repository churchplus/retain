<template>
    <div class="container max-height px-0 scroll-div">
        <div class="row text-center dotted-border-bottom">
            <div class="col-md-12 my-3">
                <TriggerDescription :header="'Group — Membership Duration'" :description="description" @removetrigger="removeTrigger" />
            </div>
        </div>

        <div class="row mt-4">
            <div class="col-md-12">
                <label for="" class="font-weight-600">Match an individual who has been in</label>
            </div>
            <div class="col-md-12 mb-2 mt-3">
                <MultiSelect v-model="selectedGroups" optionLabel="name" @change="handleSelectedGroups" :options="groups"  placeholder="Select groups" class="w-100"  display="chip" />
            </div>

            <div class="col-md-12 mt-4">
                <label for="" class="font-weight-600">For</label>
            </div>
            <div class="col-md-12 mb-2">
                <Dropdown :options="daysOptions" optionLabel="name" v-model="days" @change="handleDays" class="w-100" />
            </div>
        </div>
        
    </div>
</template>

<script>
import Dropdown from "primevue/dropdown"
import TriggerDescription from "../TriggerDescription.vue"
import { computed, reactive, ref, watch } from '@vue/runtime-core';
import MultiSelect from "primevue/multiselect";
import workflow_util from '../../utlity/workflow_util';
export default {
    components: { Dropdown, TriggerDescription, MultiSelect },
    props: [ "groups", "selectedTriggerIndex", "condition" ],
    setup (props, { emit }) {
        const data = reactive({ })

        const selectedGroups = ref([ ]);
        const handleSelectedGroups = e => {
        const allGroupsIndex = selectedGroups.value.findIndex(i => i.id === "00000000-0000-0000-0000-000000000000");
        data.groups = allGroupsIndex < 0 ? e.value.map(i => i.id).join(',') : "00000000-0000-0000-0000-000000000000";
            emit('updatetrigger', JSON.stringify(data), props.selectedTriggerIndex)
        }

        const days = ref('');
        const handleDays = e => {
        const selectedDuration = e.value;
        data.days = selectedDuration.type.includes('day') ? selectedDuration.length : selectedDuration.type.includes('week') ? selectedDuration.length * 7 : selectedDuration.length * 30;
            emit('updatetrigger', JSON.stringify(data), props.selectedTriggerIndex)
        }

        const daysArr = [
            { type: 'day', length: 0, name: 'Today' },
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

        const description = computed(() => {
            return {
                selectedGroups: selectedGroups.value && selectedGroups.value.length > 0 ? selectedGroups.value.map(i => i.name) : ['_____'],
                days: data.days ? data.days : '____',
                id: 9,
            };            
        })

        const removeTrigger = () => {
            emit("removetrigger")
        }
        
        const parsedData = ref({ })
        watch(() => {
            console.log(props.condiction);
            if (props.condition.jsonCondition) {
                parsedData.value = JSON.parse(props.condition.jsonCondition);
                days.value = parsedData.value.days;
                data.days = parsedData.value.days;

                selectedGroups.value = props.groups.length > 0 ? workflow_util.getGroups(parsedData.value.groups, props.groups) : [ ];
                data.groups = parsedData.value.groups;
            }
        }) 

        return {
            daysOptions,
            selectedGroups,
            handleSelectedGroups,
            days,
            handleDays,
            description,
            removeTrigger,
        }
    }
}
</script>

<style scoped>
    .dotted-border-bottom {
        border-bottom: dotted 2px #ddd;
    }

    .max-height {
        max-height: calc(100vh - 300px);
    }
</style>