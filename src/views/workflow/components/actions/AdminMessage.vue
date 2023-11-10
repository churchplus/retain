<template>
    <div class="container px-0 scroll-div" v-for="(item, index) in removeOthers"
    :key="index">
        <div class="row">
            <div class="col-md-12">
                <label for="" class="font-weight-600">Message</label>
            </div>

            <div class="col-md-12">
                <textarea name="" id="" class="w-100 form-control" v-model="item.message" @change="handleMessage" rows="4"></textarea>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, ref } from '@vue/reactivity';
import { watchEffect } from '@vue/runtime-core';
export default {
    props: [ "selectedActionIndex", "parameters", "selectAdminMessageList" ],
    setup (props, { emit }) {
        // const data = reactive({ ActionType: 6, JSONActionParameters: { } })
        const data = reactive([]);
        const actionType = reactive(6);
        const removeOthers = ref([]);
        const message = ref('');


        const handleMessage = () => {
            // data.JSONActionParameters.message = e.target.value;

            if (data[props.selectedActionIndex]) {
                data[props.selectedActionIndex].JSONActionParameters.message =
                removeOthers.value[0].message;
            } else {
                data[props.selectedActionIndex] = new Object();
                data[props.selectedActionIndex].JSONActionParameters = new Object();
                data[props.selectedActionIndex].JSONActionParameters.message =
                removeOthers.value[0].message;
            }
            emit('updateaction', data, props.selectedActionIndex, actionType);
        }

        const parsedData = ref({ })
        watchEffect(() => {
             console.log(props);
            if (props.selectAdminMessageList) {
                removeOthers.value = props.selectAdminMessageList.filter((i, index) => {
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

                data[props.selectedActionIndex] = new Object();
                data[props.selectedActionIndex].JSONActionParameters = new Object();

                removeOthers.value[0].message = parsedData.value.message;
                data[props.selectedActionIndex].JSONActionParameters.message = parsedData.value.message;
            }
        })

        return {
            handleMessage,
            message,
            removeOthers
        }
    }
}
</script>

<style scoped>

</style>