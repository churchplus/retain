<template>
    <div class="container max-height px-0 scroll-div">
        <div class="row text-center dotted-border-bottom">
            <div class="col-md-12 my-3">
                <TriggerDescription :header="'Pledge - Redemption'" @removetrigger="removeTrigger" />
            </div>
        </div>

        <div class="row mt-4">
            <div class="col-md-12">
                <label for="" class="font-weight-600">Match an individual who is a member of</label>
            </div>
            <div class="col-md-12 mb-2">
                <el-tree-select v-model="data.groups" :data="groupMappedTree" :render-after-expand="false"  check-strictly
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


        <div class="row mt-1">
            <div class="col-md-12">
                <label for="" class="font-weight-600">That the amount are</label>
            </div>
            <div class="col-md-12 mb-2">
                <el-dropdown trigger="click" class="w-100">
                    <span class="el-dropdown-link w-100">
                        <div class="d-flex justify-content-between border-eldropdown  w-100" size="large">
                            <span class="text-secondary">{{
                                selectedLogicalOperator &&
                                Object.keys(selectedLogicalOperator).length > 0
                                ? selectedLogicalOperator.name
                                : "Select amount range"
                            }}</span>
                            <div>
                                <el-icon class="el-icon--right">
                                    <arrow-down />
                                </el-icon>
                            </div>
                        </div>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item v-for="(item, index) in logicalOperatorList" :key="index"
                                @click="handleLogicalOperator(item)">{{ item.name }}
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>


        <div class="row mt-1">
            <div class="col-md-12">
                <label for="" class="font-weight-600">Amount</label>
            </div>
            <div class="col-md-12 mb-2">
                <el-input type="text" v-model="amount" @input="handleAmount" />
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
    components: { TriggerDescription },
    props: [ "groups", "selectedTriggerIndex", "condition", "groupMappedTree", "allPledgeDefinitionList"],
    setup (props, { emit}) {
        const data = reactive({});
        const logicalOperatorList = ref([
            { name: 'Greater than', id: 1 },
            { name: 'Less than', id: 2 },
            { name: 'Any amount', id: 3 },
            { name: 'Payment completed', id: 4 },
        ])


        const selectedGroups = ref([ ]);
        const handleSelectedGroups = () => {
            // const allGroupsIndex = selectedGroups.value.findIndex(i => i.id === "00000000-0000-0000-0000-000000000000");
            // data.groups = allGroupsIndex < 0 ? e.value.map(i => i.id).join(',') : "00000000-0000-0000-0000-000000000000";
            emit('updatetrigger', JSON.stringify(data), props.selectedTriggerIndex)
        }

        const logicalOperator = ref([ ]);
        const selectedLogicalOperator = ref({})
        const handleLogicalOperator = (item) => {
            selectedLogicalOperator.value = item
            data.logicalOperator = logicalOperatorList.value.find(i => i.id == item.id).name;
            emit('updatetrigger', JSON.stringify(data), props.selectedTriggerIndex)
        }

        const handleSelectedPledges = () => {
            console.log(data)
            emit('updatetrigger', JSON.stringify(data), props.selectedTriggerIndex)
        }

        const amount = ref([ ]);
        const handleAmount = () => {
            data.amount = amount.value
            emit('updatetrigger', JSON.stringify(data), props.selectedTriggerIndex)
        }

        const removeTrigger = () => {
            emit("removetrigger")
        }

        const parsedData = ref({ })
        watchEffect(() => {
            if (props.condition.jsonCondition) {
                parsedData.value = JSON.parse(props.condition.jsonCondition);
                logicalOperator.value = parsedData.value.logicalOperator;
                selectedLogicalOperator.value = logicalOperator.value ? logicalOperatorList.value.find(i => i.name == logicalOperator.value) : {}
                data.logicalOperator = selectedLogicalOperator.value.name;

                amount.value = parsedData.value.amount;
                data.amount = parsedData.value.amount;

                data.groups = parsedData.value.groups ? parsedData.value.groups.split(",") : [];
                data.pledges = parsedData.value.pledges ? parsedData.value.pledges.split(",") : [];

                // selectedGroups.value = props.groups.length > 0 ? workflow_util .getGroups(parsedData.value.groups, props.groups) : [ ];
                // data.groups = parsedData.value.groups;

                // console.log(parsedData.value)
            }
        }) 

        return {
            handleSelectedGroups,
            selectedGroups,
            handleLogicalOperator,
            logicalOperator,
            amount,
            handleAmount,
            removeTrigger,
            data,
            logicalOperatorList,
            selectedLogicalOperator,
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