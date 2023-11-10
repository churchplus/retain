<template>
    <div class="container max-height scroll-div" v-for="(item, index) in removeOthers" :key="index">

        <div class="row mt-4">
            <div class="col-md-12 px-0">
                <label for="" class="font-weight-600">Delay</label>
            </div>
            <div class="col-md-12 px-0">
                <Dropdown v-model="item.delay" @change="handleDelay" optionLabel="name" :options="daysArr" class="w-100" placeholder="Choose delay" />
            </div>
        </div>

        <div class="row mt-4 mb-5">
            <div class="col-md-12 px-0">
                <label for="" class="font-weight-600">Execute Time</label>
            </div>
            <div class="col-md-12 px-0">
                <input type="datetime-local" class="form-control" v-model="item.executeTime" @change="handleExecuteTime">
            </div>
        </div>

    </div>
</template>

<script>
import { reactive, ref } from '@vue/reactivity';
import Dropdown from "primevue/dropdown"
import { watchEffect } from '@vue/runtime-core';

export default {
    props: [ "selectedActionIndex", "parameters", "selectTimerList" ],
    components: { Dropdown },
    setup (props, { emit }) {
        const data = reactive([])
        const actionType = reactive(8)
        // const data = reactive({ ActionType: 8, JSONActionParameters: { } })

        const delay = ref({});
        const removeOthers = ref([])
        const handleDelay = (e) => {
            // data.JSONActionParameters.delay = e.value.type.includes('day') ? e.value.length : e.value.type.includes('week') ? e.value.length * 7 : e.value.length * 30;

            if (data[props.selectedActionIndex]) {
                data[props.selectedActionIndex].JSONActionParameters.delay =  e.value.length;
            } else {
                data[props.selectedActionIndex] = new Object();
                data[props.selectedActionIndex].JSONActionParameters = new Object();
                data[props.selectedActionIndex].JSONActionParameters.delay = e.value.length;
            }
            
            emit('updateaction', data, props.selectedActionIndex, actionType);
        }

        const executeTime = ref('');
        const handleExecuteTime = (e) => {
            // data.JSONActionParameters.executeAt = e.target.value;

            if (data[props.selectedActionIndex]) {
                data[props.selectedActionIndex].JSONActionParameters.executeAt =
                removeOthers.value[0].executeTime;
            } else {
                data[props.selectedActionIndex] = new Object();
                data[props.selectedActionIndex].JSONActionParameters = new Object();
                data[props.selectedActionIndex].JSONActionParameters.executeAt =
                removeOthers.value[0].executeTime;
            }


            emit('updateaction', data, props.selectedActionIndex, actionType);
        }

        const daysArr = ref([
            { type: 'day', length: 0, name: 'Today' },
            { type: 'day', length: 1, name: '1 day' },
            { type: 'days', length: 2, name: '2 day' },
            { type: 'days', length: 3, name: '3 day' },
            { type: 'days', length: 5, name: '5 day' },
            { type: 'week', length: 7, name: '1 week' },
            { type: 'weeks', length: 14, name: '2 weeks' },
            { type: 'weeks', length: 21, name: '3 weeks' },
            { type: 'month', length: 30, name: '1 month' },
            { type: 'months', length: 60, name: '2 months' },
            { type: 'months', length: 90, name: '3 months' }
        ])

        // const daysOptions = computed(() => {
        //     return daysArr.map(i => {
        //         i.name = i.name ? i.name : `${i.length} ${i.type}`;
        //         return i;
        //     })
        // })

        const parsedData = ref({ })
        watchEffect(() => {
                console.log(props.selectTimerList)
            if (props.selectTimerList) {
                console.log(props.selectTimerList)
                removeOthers.value = props.selectTimerList.filter((i,index) => {
                    return index == props.selectedActionIndex
                })
            }

            // if (props.parameters.Action) {
            //     const actn = JSON.parse(props.parameters.Action);
            //     parsedData.value = JSON.parse(actn.JSONActionParameters);

            //     delay.value = parsedData.value.delay;
            //     data.JSONActionParameters.delay= parsedData.value.delay;

            //     executeTime.value = parsedData.value.executeAt;
            //     data.JSONActionParameters.executeAt = parsedData.value.executeAt;
            // } else 
            if (removeOthers.value && removeOthers.value[0].action && removeOthers.value[0].action.jsonActionParameters) {
            // } else if (props.parameters.action && props.parameters.action.jsonActionParameters) {
                // parsedData.value = JSON.parse(props.parameters.action.jsonActionParameters);
                data[props.selectedActionIndex] = new Object();
                data[props.selectedActionIndex].JSONActionParameters = new Object();

                parsedData.value = JSON.parse(removeOthers.value[0].action.jsonActionParameters);
                removeOthers.value[0].delay = daysArr.value.find(i => i.length == parsedData.value.delay);
                data[props.selectedActionIndex].JSONActionParameters.delay= parsedData.value.delay;

                removeOthers.value[0].executeTime = parsedData.value.executeAt;
                data[props.selectedActionIndex].JSONActionParameters.executeAt = parsedData.value.executeAt;

                console.log(data, 'dataaaaaa')
            }
        })

        return {
            delay,
            handleDelay,
            executeTime,
            handleExecuteTime,
            // daysOptions,
            removeOthers,
            daysArr
        }
    }
}
</script>

<style lang="scss" scoped>

</style>