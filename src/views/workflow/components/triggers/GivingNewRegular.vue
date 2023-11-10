<template>
    <div class="container max-height px-0 scroll-div">
        <div class="row text-center dotted-border-bottom">
            <div class="col-md-12 my-3">
                <TriggerDescription :description="description" :header="'Giving - New regular giver'" @removetrigger="removeTrigger" />
            </div>
        </div>

        <div class="row mt-4">
            <div class="col-md-12">
                <label for="" class="font-weight-600">Match an individual who is a member of</label>
            </div>
            <div class="col-md-12 mb-2">
                <MultiSelect @change="groupSelected" v-model="selectedGroups" :options="groups" optionLabel="name"  placeholder="Select groups" class="w-100"  display="chip" />
            </div>
        </div>

        <div class="row mt-4">
            <div class="col-md-12">
                <label for="" class="font-weight-600">And who gave less than</label>
            </div>
            <div class="col-md-12 mb-2">
                <div class="row">
                    <div class="col-3 pr-0">
                        <input type="text" class="form-control" placeholder="#" v-model="prevNumOfTimes" @change="handlePrevNumOfTimes">
                    </div>
                    <div class="col-8 border pl-0 text-center d-flex align-items-center justify-content-center bg-secondary">
                        <span>Times per month</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="row mt-4">
            <div class="col-md-12">
                <label for="" class="font-weight-600">For</label>
            </div>
            <div class="col-md-12 mb-2">
                <div class="row">
                    <div class="col-3 pr-0">
                        <input type="text" class="form-control" placeholder="#" v-model="prevNumOfMonths" @change="handlePrevNumOfMonths">
                    </div>
                    <div class="col-8 border pl-0 text-center d-flex align-items-center justify-content-center bg-secondary">
                        <span>Months</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="row mt-4">
            <div class="col-md-12">
                <label for="" class="font-weight-600">To</label>
            </div>
            <div class="col-md-12 mb-2">
                <Dropdown :options="contributionItems" optionLabel="name" class="w-100" v-model="category" @change="cantegorySelected" />
            </div>
        </div>

        <div class="row mt-4">
            <div class="col-md-12">
                <label for="" class="font-weight-600">And who has given at least</label>
            </div>
            <div class="col-md-12 mb-2">
                <div class="row">
                    <div class="col-3 pr-0">
                        <input type="text" class="form-control" placeholder="#" v-model="currentNumOfTimes" @change="handleCurrentNumOfTimes">
                    </div>
                    <div class="col-8 border pl-0 text-center d-flex align-items-center justify-content-center bg-secondary">
                        <span>Times per month</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="row mt-4">
            <div class="col-md-12">
                <label for="" class="font-weight-600">For the last</label>
            </div>
            <div class="col-md-12 mb-2">
                <div class="row">
                    <div class="col-3 pr-0">
                        <input type="text" v-model="currentNumOfMonths" @change="handleCurrentNumOfMonths" class="form-control" placeholder="#">
                    </div>
                    <div class="col-8 border pl-0 text-center d-flex align-items-center justify-content-center bg-secondary">
                        <span>Months</span>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import Dropdown from "primevue/dropdown"
import MultiSelect from "primevue/multiselect"
import TriggerDescription from "../TriggerDescription.vue"
import { reactive, ref } from '@vue/reactivity'
import { computed, watch } from '@vue/runtime-core'
import workflow_util from '../../utlity/workflow_util'
export default {
    props: [ "selectedTriggerIndex", "contributionItems", "groups", "condition" ],
    components: { Dropdown, TriggerDescription, MultiSelect },

    setup (props, { emit }) {
        
        const data = reactive({ });

        const selectedGroups = ref([ ]);
        const groupSelected = (e) => {
            const allGroupsIndex = selectedGroups.value.findIndex(i => i.id === "00000000-0000-0000-0000-000000000000");
            data.groups = allGroupsIndex < 0 ? e.value.map(i => i.id).join(',') : "00000000-0000-0000-0000-000000000000";
            emit('updatetrigger', JSON.stringify(data), props.selectedTriggerIndex)
        }

        const prevNumOfTimes = ref('');
        const handlePrevNumOfTimes = (e) => {
            data.gaveTimes = e.target.value;
            emit('updatetrigger', JSON.stringify(data), props.selectedTriggerIndex)
        }

        const prevNumOfMonths = ref('');
        const handlePrevNumOfMonths = (e) => {
            data.gaveMonth = e.target.value;
            emit('updatetrigger', JSON.stringify(data), props.selectedTriggerIndex)
        }

        const category = ref({ });
        const cantegorySelected = (e) => {
            data.financialContributionID = e.value.id;
            emit('updatetrigger', JSON.stringify(data), props.selectedTriggerIndex)
        }

        const currentNumOfTimes = ref('');
        const handleCurrentNumOfTimes = (e) => {
            data.givenAtLeastTimes = e.target.value;
            emit('updatetrigger', JSON.stringify(data), props.selectedTriggerIndex)
        }

        const currentNumOfMonths = ref('');
        const handleCurrentNumOfMonths = (e) => {
            data.givenForTheLastMonth = e.target.value;
            emit('updatetrigger', JSON.stringify(data), props.selectedTriggerIndex)
        }

        const description = computed(() => {
            return {
                groups: selectedGroups.value ? selectedGroups.value : ['_____'],
                prevTimes: prevNumOfTimes.value ? prevNumOfTimes.value + ' times' : '__ times',
                prevMonths: prevNumOfMonths.value ? prevNumOfMonths.value + ' months' : '__ months',
                category: category.value && category.value.name ? category.value.name : '____',
                currentTimes: currentNumOfTimes.value ? currentNumOfTimes.value + ' times' : '__ times',
                currentMonths: currentNumOfMonths.value ? currentNumOfMonths.value + ' months' : '__ months',
                id: 11,
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
                prevNumOfTimes.value = parsedData.value.gaveTimes;
                data.gaveTimes = parsedData.value.gaveTimes;

                prevNumOfMonths.value = parsedData.value.gaveMonth;
                data.gaveMonth = parsedData.value.gaveMonth;

                selectedGroups.value = props.groups.length > 0 ? workflow_util.getGroups(parsedData.value.groups, props.groups) : [ ];
                data.groups = parsedData.value.groups;

                category.value = workflow_util.getGroup(parsedData.value.financialContributionID, props.contributionItems);
                data.financialContributionID = parsedData.value.financialContributionID;

                currentNumOfTimes.value = parsedData.value.givenAtLeastTimes;
                data.givenAtLeastTimes = parsedData.value.givenAtLeastTimes;

                currentNumOfMonths.value = parsedData.value.givenForTheLastMonth;
                data.givenForTheLastMonth = parsedData.value.givenForTheLastMonth;
            }
        }) 

        return {
            selectedGroups,
            groupSelected,
            handlePrevNumOfTimes,
            prevNumOfTimes,
            handlePrevNumOfMonths,
            prevNumOfMonths,
            cantegorySelected,
            category,
            handleCurrentNumOfTimes,
            currentNumOfTimes,
            currentNumOfMonths,
            handleCurrentNumOfMonths,
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