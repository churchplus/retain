<template>
    <div class="container px-0 max-height scroll-div">
        <div class="row text-center dotted-border-bottom">
            <div class="col-md-12 my-3">
                <TriggerDescription :header="'Pledge - Cancellation'" @removetrigger="removeTrigger" />
            </div>
        </div>

        <div class="row mt-4">
            <div class="col-md-12">
                <label for="" class="font-weight-600">Groups</label>
            </div>
            <div class="col-md-12 mb-2">
                <el-tree-select v-model="data.groups" :data="groupMappedTree" :render-after-expand="false" check-strictly
                    multiple show-checkbox check-on-click-node class="w-100" @change="handleSelectedGroups" />
            </div>
        </div>
        
        <div class="row mt-1">
            <div class="col-md-12">
                <label for="" class="font-weight-600">With pledges</label>
            </div>
            <div class="col-md-12 mb-2">
                <el-tree-select v-model="data.pledges" :data="allPledgeDefinitionList" :render-after-expand="false" check-strictly
                    multiple show-checkbox check-on-click-node class="w-100" @change="handleSelectedPledges" />
            </div>
        </div>

    </div>
</template>

<script>
import TriggerDescription from "../TriggerDescription.vue"
import { reactive, ref } from '@vue/reactivity'
import { watchEffect } from '@vue/runtime-core'
import workflow_util from '../../utlity/workflow_util'
export default {
    props: [ "groups", "selectedTriggerIndex", "condition", "groupMappedTree", "allPledgeDefinitionList" ],
    components: { TriggerDescription },

    setup (props, { emit }) {
        const data = reactive({ });
        const selectedGroups = ref('')
        const handleSelectedGroups = () => {
            
            // const allGroupsIndex = selectedGroups.value.findIndex(i => i.id === "00000000-0000-0000-0000-000000000000");
            // data.groups = allGroupsIndex < 0 ? e.value.map(i => i.id).join(',') : "00000000-0000-0000-0000-000000000000";
            emit('updatetrigger', JSON.stringify(data), props.selectedTriggerIndex);
        }


        const handleSelectedPledges = () => {
            emit('updatetrigger', JSON.stringify(data), props.selectedTriggerIndex)
        }

        // const description = computed(() => {
        //     return {
        //         selectedGroups: selectedGroups.value ? selectedGroups.value.map(i => i.name) : ['_____'],
        //         id: 4,
        //     };            
        // })

        const removeTrigger = () => {
            emit("removetrigger")
        }

        const parsedData = ref({ })
        watchEffect(() => {
            if (props.condition.jsonCondition) {
                parsedData.value = JSON.parse(props.condition.jsonCondition);
                data.groups = parsedData.value.groups ? parsedData.value.groups.split(",") : [];
                data.pledges = parsedData.value.pledges ? parsedData.value.pledges.split(",") : [];
                
                // selectedGroups.value = props.groups.length > 0 ? workflow_util .getGroups(parsedData.value.groups, props.groups) : [ ];
                // data.groups = parsedData.value.groups;
            }
        })

        return {
            handleSelectedGroups,
            selectedGroups,
            // description,
            removeTrigger,
            data,
            handleSelectedPledges
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