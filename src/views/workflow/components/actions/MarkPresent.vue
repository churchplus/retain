<template>
    <div class="container scroll-div" v-for="(item, index) in removeOthers"
    :key="index">
        <div class="row">
            <div class="col-md-12 mt-4 mb-2">
                <label for="" class="mb-0 font-weight-600">Mark the Individual Present in the following Group(s):</label>
            </div>
            <div class="col-md-12">
                <MultiSelect @change="handleSelectedGroups" v-model="item.selectedGroups" :options="attendanceItems" optionLabel="name"  class="w-100"  display="chip" placeholder="Select group" />
            </div>
        </div>
    </div>
</template>

<script>
import MultiSelect from "primevue/multiselect"
import attendanceservice from '../../../../services/attendance/attendanceservice'
import { reactive, ref } from '@vue/reactivity'
import { watchEffect } from '@vue/runtime-core'
import workflow_util from '../../utlity/workflow_util'

export default {
    components: { MultiSelect },
    props: [ "selectedActionIndex", "parameters", "selectMarkPresentList" ],
    setup (props, { emit }) {
        // const data = reactive({ ActionType: 9, JSONActionParameters: { } })
        const data = reactive([]);
        const actionType = reactive(9);

        // const selectedGroups = ref([ ]);
        const removeOthers = ref([]);


        const handleSelectedGroups = (e) => {
            // data.JSONActionParameters.listOfAttendanceCheckins = e.value.map(i => i.id).join(',');
            if (data[props.selectedActionIndex]) {
                data[props.selectedActionIndex].JSONActionParameters.listOfAttendanceCheckins =
                removeOthers.value[0].selectedGroups.map(i => i.id).join(',');
            } else {
                data[props.selectedActionIndex] = new Object();
                data[props.selectedActionIndex].JSONActionParameters = new Object();
                data[props.selectedActionIndex].JSONActionParameters.listOfAttendanceCheckins =
                removeOthers.value[0].selectedGroups.map(i => i.id).join(',');
            }
            
            emit('updateaction', data, props.selectedActionIndex, actionType);
        }

        const attendanceItems = ref([ ]);
        const getAttendanceItems = async () => {
            try {
                const response = await attendanceservice.getItems();
                console.log(response);
                attendanceItems.value = response.items.map(i => {
                    return { id: i.id, name: i.fullEventName }
                });
            } catch (error) {
                console.log(error);
            }
        }
        getAttendanceItems();

        const parsedData = ref({ })
        watchEffect(() => {
            if (props.selectMarkPresentList) {
                removeOthers.value = props.selectMarkPresentList.filter((i, index) => {
                return index == props.selectedActionIndex;
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

                let selectedGroupList = []
                parsedData.value.listOfAttendanceCheckins.split(",").forEach(i => {
                    const checkGroup = attendanceItems.value.find(j => i == j.id)
                    if (checkGroup) {
                        selectedGroupList.push(checkGroup)
                    }
                })

                removeOthers.value[0].selectedGroups = selectedGroupList
                data[props.selectedActionIndex] = new Object();
                data[props.selectedActionIndex].JSONActionParameters = new Object();
                data[props.selectedActionIndex].JSONActionParameters.listOfAttendanceCheckins =
                parsedData.value.listOfAttendanceCheckins;
            }
            
            // if (props.parameters.Action) {
            //     const actn = JSON.parse(props.parameters.Action);
            //     parsedData.value = JSON.parse(actn.JSONActionParameters);

            //     selectedGroups.value = workflow_util.getGroups(parsedData.value.listOfAttendanceCheckins, attendanceItems.value);
            //     data.JSONActionParameters.groups = parsedData.value.groups;
            // } else if (props.parameters.action && props.parameters.action.jsonActionParameters) {
            //     parsedData.value = JSON.parse(props.parameters.action.jsonActionParameters);
                
            //     selectedGroups.value = workflow_util.getGroups(parsedData.value.listOfAttendanceCheckins, attendanceItems.value);
            //     data.JSONActionParameters.groups = parsedData.value.groups;
            // }
        })

        return {
            attendanceItems,
            handleSelectedGroups,
            // selectedGroups,
            removeOthers
        }
    }
}
</script>

<style lang="scss" scoped>

</style>