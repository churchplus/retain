<template>
    <div class="container px-0 max-height scroll-div">
        <div class="row text-center dotted-border-bottom">
            <div class="col-md-12 my-3">
                <TriggerDescription :description="description" :currency="currency" @removetrigger="removeTrigger" />
            </div>
        </div>

        <div class="row mt-4">
            <div class="col-md-12">
                <label for="" class="font-weight-600">Match an individual who is a member of</label>
            </div>
            <div class="col-md-12 mb-2">
                <MultiSelect @change="groupSelected" v-model="selectedGroup" :options="groups" optionLabel="name" placeholder="Select groups" class="w-100"  display="chip" />
            </div>
        </div>

        <div class="row mt-4">
            <div class="col-md-12">
                <label for="" class="font-weight-600">And who gives</label>
            </div>
            <div class="col-md-12 mb-2">
                <Dropdown @change="rangeSelected" v-model="selectedRange" :options="[ 'Greater than', 'Less than' ]" class="w-100" />
            </div>
        </div>

        <div class="row mt-4">
            <div class="col-md-12">
                <label for="" class="font-weight-600">{{ currency }}</label>
            </div>
            <div class="col-md-12 mb-2">
                <input type="text" class="form-control" @input="handleAmount" v-model="amount">
            </div>
        </div>

        <div class="row mt-4">
            <div class="col-md-12">
                <label for="" class="font-weight-600">To</label>
            </div>
            <div class="col-md-12 mb-2">
                <Dropdown :options="contributionItems" optionLabel="name" class="w-100" @change="categorySelected" v-model="category" />
            </div>
        </div>

        <div class="row mt-4">
            <div class="col-md-12">
                <label for="" class="font-weight-600">In</label>
            </div>
            <div class="col-md-12 mb-2">
                <Dropdown @change="givingTimeSelected" v-model="givingTime" :options="[ 'A single gift', 'The last' ]" class="w-100" />
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
import { useStore } from "vuex";
import workflow_util from '../../utlity/workflow_util'

export default {
    props: [ "groups", "selectedTriggerIndex", "contributionItems", "condition" ],
    components: { Dropdown, TriggerDescription, MultiSelect },

    setup (props, { emit }) {
        const store = useStore();

        const currentUser = ref(store.getters.currentUser);

        const data = reactive({ });
        const selectedGroup = ref([ ])
        const groupSelected = (e) => {
            const allGroupsIndex = selectedGroup.value.findIndex(i => i.id === "00000000-0000-0000-0000-000000000000");
            data.groups = allGroupsIndex < 0 ? e.value.map(i => i.id).join(',') : "00000000-0000-0000-0000-000000000000";
            emit('updatetrigger', JSON.stringify(data), props.selectedTriggerIndex);
        }

        const selectedRange = ref('')
        const rangeSelected = (e) => {
            // data.logicalOperator = e.value === 'Greater than' ? '>' : '<';
            data.logicalOperator = e.value;
            emit('updatetrigger', JSON.stringify(data), props.selectedTriggerIndex);
        }

        const amount = ref(0)
        const handleAmount = (e) => {
            data.amount = e.target.value;
            emit('updatetrigger', JSON.stringify(data), props.selectedTriggerIndex);
        }

        const parsedData = ref({ })
        

        const category = ref('')
        const categorySelected = (e) => {
            data.financialContributionID = e.value.id;
            emit('updatetrigger', JSON.stringify(data), props.selectedTriggerIndex);
        }

        const givingTime = ref('')
        const givingTimeSelected = (e) => {
            data.singleOrLast = e.value;
            emit('updatetrigger', JSON.stringify(data), props.selectedTriggerIndex);
        }

        const description = computed(() => {
            return {
                groups: selectedGroup.value ? selectedGroup.value.map(i => i.name) : ['_____'],
                range: selectedRange.value === 'Greater than' ? '>' : '<',
                category: category.value && category.value.name ? category.value.name : '____',
                amount: amount.value ? amount.value : '',
                time: givingTime.value ? givingTime.value : '____',
                id: 1,
            };            
        })

        const currency = computed(() => {
            if (!currentUser.value || !currentUser.value.currencySymbol) return "Amount";
            return currentUser.value.currencySymbol;
        })

        const removeTrigger = () => {
            emit("removetrigger")
        }

        watch(() => {
            if (props.condition.jsonCondition) {
                parsedData.value = JSON.parse(props.condition.jsonCondition);
                selectedRange.value = parsedData.value.logicalOperator;
                data.logicalOperator = parsedData.value.logicalOperator;

                amount.value = parsedData.value.amount;
                data.amount = parsedData.value.amount;

                selectedGroup.value = props.groups.length > 0 ? workflow_util.getGroups(parsedData.value.groups, props.groups) : [ ];
                data.groups = parsedData.value.groups;

                category.value = workflow_util.getGroup(parsedData.value.financialContributionID, props.contributionItems);
                data.financialContributionID = parsedData.value.financialContributionID;

                givingTime.value = parsedData.value.singleOrLast;
                data.singleOrLast = parsedData.value.singleOrLast;
            }
        }) 

        return {
            groupSelected,
            selectedGroup,
            selectedRange,
            rangeSelected,
            handleAmount,
            amount,
            categorySelected,
            category,
            givingTimeSelected,
            givingTime,
            description,
            currency,
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