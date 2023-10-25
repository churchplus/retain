<template>
    <div class="container px-0 max-height scroll-div">
        <div class="row text-center dotted-border-bottom">
            <div class="col-md-12 my-3">
                <TriggerDescription :description="description" :header="'Member - New Firsttimer'" @removetrigger="removeTrigger" />
            </div>
        </div>

        <div class="row mt-4">
            <div class="col-md-12">
                <label for="" class="font-weight-600">Groups</label>
            </div>
            <div class="col-md-12 mb-2">
                <MultiSelect @change="groupSelected" v-model="selectedGroups" :options="groups" optionLabel="name" placeholder="Select groups" class="w-100"  display="chip" />
            </div>
        </div>

    </div>
</template>

<script>
import MultiSelect from "primevue/multiselect"
import TriggerDescription from "../TriggerDescription.vue"
import { reactive, ref } from '@vue/reactivity'
import { computed, watch } from '@vue/runtime-core'
import workflow_util from '../../utlity/workflow_util'
export default {
    props: [ "groups", "selectedTriggerIndex", "condition" ],
    components: { TriggerDescription, MultiSelect },

    setup (props, { emit }) {
        const data = reactive({ });
        const selectedGroups = ref('')
        const groupSelected = (e) => {
            const allGroupsIndex = selectedGroups.value.findIndex(i => i.id === "00000000-0000-0000-0000-000000000000");
            data.groups = allGroupsIndex < 0 ? e.value.map(i => i.id).join(',') : "00000000-0000-0000-0000-000000000000";
            emit('updatetrigger', JSON.stringify(data), props.selectedTriggerIndex);
        }

        const description = computed(() => {
            return {
                selectedGroups: selectedGroups.value && selectedGroups.value.length > 0 ? selectedGroups.value.map(i => i.name) : ['_____'],
                id: 6,
            };            
        })

        const removeTrigger = () => {
            emit("removetrigger")
        }

        const parsedData = ref({ })
        watch(() => {
            if (props.condition.jsonCondition) {
                parsedData.value = JSON.parse(props.condition.jsonCondition);
                selectedGroups.value = props.groups.length > 0 ? workflow_util.getGroups(parsedData.value.groups, props.groups) : [ ];
                data.groups = parsedData.value.groups;
            }
        }) 

        return {
            groupSelected,
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