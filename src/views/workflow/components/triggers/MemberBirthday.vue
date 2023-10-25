<template>
    <div class="container max-height px-0 scroll-div">
        <div class="row text-center dotted-border-bottom">
            <div class="col-md-12 my-3">
                <TriggerDescription :header="'Member - Birthday'" :description="description" @removetrigger="removeTrigger"  />
            </div>
        </div>

        <div class="row mt-4">
            <div class="col-md-12">
                <label for="" class="font-weight-600">Match an individual who is</label>
            </div>
            <div class="col-md-12 mb-2">
                <MultiSelect @change="handleSelectedGroups" v-model="selectedGroups" :options="groups" optionLabel="name"  placeholder="Select groups" class="w-100"  display="chip" />
            </div>
        </div>

        
    </div>
</template>

<script>
import MultiSelect from "primevue/multiselect"
import TriggerDescription from "../TriggerDescription.vue"
import { reactive, ref } from '@vue/reactivity';
import { computed } from '@vue/runtime-core';
export default {
    components: { MultiSelect, TriggerDescription },
    props: [ "groups", "selectedTriggerIndex" ],
    setup (props, { emit }) {
        const data = reactive({ })

        const selectedGroups = ref([ ]);
        const handleSelectedGroups = e => {
        const allGroupsIndex = selectedGroups.value.findIndex(i => i.id === "00000000-0000-0000-0000-000000000000");
        data.groups = allGroupsIndex < 0 ? e.value.map(i => i.id).join(',') : "00000000-0000-0000-0000-000000000000";
            emit('updatetrigger', JSON.stringify(data), props.selectedTriggerIndex)
        }

        const description = computed(() => {
            return {
                id: 5,
                selectedGroups: selectedGroups.value.length > 0 ? selectedGroups.value.map(i => i.name) : [ 'any' ]
            }
        })

        const removeTrigger = () => {
            emit("removetrigger")
        }

        // watch(() => {
        //     if (props.condition.jsonCondition) {
        //         parsedData.value = JSON.parse(props.condition.jsonCondition);

        //         selectedGroups.value = props.groups.length > 0 ? workflow_util.getGroups(parsedData.value.groups, props.groups) : [ ];
        //         data.groups = parsedData.value.groups;
        //     }
        // }) 

        return {
            handleSelectedGroups,
            selectedGroups,
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