<template>
    <div class="container max-height scroll-div" v-for="(item, index) in removeOthers"
    :key="index">
        <div class="row mt-4">
            <div class="col-md-12 px-0">
                <label for="" class="font-weight-600">SMS</label>
            </div>
            <div class="col-md-12">
                <div class="row">
                    <div class="col-md-12 px-0">
                        <input type="checkbox" name="" id="" v-model="item.person" @change="handleSendPersonMail"> The person
                    </div>
                    <div class="col-md-12 px-0">
                        <input type="checkbox" name="" id="" v-model="item.parent" @change="handleSendPersonsParentMail"> The person's parent
                    </div>
                    <div class="col-md-12 px-0">
                        <input type="checkbox" name="" id="" v-model="item.spouse" @change="handleSendPersonsSpouseMail"> The person's spouse
                    </div>
                    <div class="col-md-12 px-0">
                        <input type="checkbox" name="" id="" v-model="item.groupLeader" @change="handleSendGroupLeaderMail"> The Group Leaders
                    </div>
                </div>
            </div>
        </div>

        <div class="row mt-4">
            <div class="col-md-12 px-0">
                <label for="" class="font-weight-600">And the following</label>
            </div>
            <div class="col-md-12 px-0">
                <input type="text" class="form-control" v-model="item.otherToContacts" @change="handleOtherAddresses">
                <span class="small-text">Separate the addresses with comma</span>
            </div>
        </div>

        <div class="row mt-4">
            <div class="col-md-12 px-0">
                <label for="" class="font-weight-600">Message</label>
            </div>
            <div class="col-md-12 px-0">
                <!-- <input type="text" class="form-control" > -->
                <textarea name="" id="" rows="4" class="form-control w-100" v-model="item.message" @input="handleMessage"></textarea>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, ref } from '@vue/reactivity';
import { watchEffect } from '@vue/runtime-core';
export default {
    props: [ "selectedActionIndex", "parameters", "selectWhatsappList" ],
    setup (props, { emit }) {
        // const data = reactive({ ActionType: 3, JSONActionParameters: { } })
        const data = reactive([]);
        const actionType = reactive(3);
        const removeOthers = ref([]);
        const person = ref(false);


        const handleSendPersonMail = () => {
            // data.JSONActionParameters.person = e.target.checked;
            if (data[props.selectedActionIndex]) {
                data[props.selectedActionIndex].JSONActionParameters.person =
                removeOthers.value[0].person;
            } else {
                data[props.selectedActionIndex] = new Object();
                data[props.selectedActionIndex].JSONActionParameters = new Object();
                data[props.selectedActionIndex].JSONActionParameters.person =
                removeOthers.value[0].person;
            }
            emit('updateaction', data, props.selectedActionIndex, actionType);
        }

        const parent = ref(false);
        const handleSendPersonsParentMail = () => {
            // data.JSONActionParameters.parent = e.target.checked;
            if (data[props.selectedActionIndex]) {
                console.log(data[props.selectedActionIndex]);
                data[props.selectedActionIndex].JSONActionParameters.parent =
                removeOthers.value[0].parent;
            } else {
                console.log(data[props.selectedActionIndex]);
                data[props.selectedActionIndex] = new Object();
                data[props.selectedActionIndex].JSONActionParameters = new Object();
                data[props.selectedActionIndex].JSONActionParameters.parent =
                removeOthers.value[0].parent;
            }
            emit('updateaction', data, props.selectedActionIndex, actionType);
        }

        const spouse = ref(false);
        const handleSendPersonsSpouseMail = () => {
            // data.JSONActionParameters.spouse = e.target.checked;
            if (data[props.selectedActionIndex]) {
                data[props.selectedActionIndex].JSONActionParameters.spouse =
                removeOthers.value[0].spouse;
            } else {
                data[props.selectedActionIndex] = new Object();
                data[props.selectedActionIndex].JSONActionParameters = new Object();
                data[props.selectedActionIndex].JSONActionParameters.spouse =
                removeOthers.value[0].spouse;
            }
            emit('updateaction', data, props.selectedActionIndex, actionType);
        }

        const groupLeader = ref(false);
        const handleSendGroupLeaderMail = () => {
            // data.JSONActionParameters.groupLeader = e.target.checked;
            if (data[props.selectedActionIndex]) {
                data[props.selectedActionIndex].JSONActionParameters.groupLeader =
                removeOthers.value[0].groupLeader;
            } else {
                data[props.selectedActionIndex] = new Object();
                data[props.selectedActionIndex].JSONActionParameters = new Object();
                data[props.selectedActionIndex].JSONActionParameters.groupLeader =
                removeOthers.value[0].groupLeader;
            }
            emit('updateaction', data, props.selectedActionIndex, actionType);
        }

        const otherToContacts = ref('');
        const handleOtherAddresses = () => {
            // data.JSONActionParameters.otherToContacts = e.target.value;
            if (data[props.selectedActionIndex]) {
                data[props.selectedActionIndex].JSONActionParameters.otherToContacts =
                removeOthers.value[0].otherToContacts;
            } else {
                data[props.selectedActionIndex] = new Object();
                data[props.selectedActionIndex].JSONActionParameters = new Object();
                data[props.selectedActionIndex].JSONActionParameters.otherToContacts =
                removeOthers.value[0].otherToContacts;
            }
            emit('updateaction', data, props.selectedActionIndex, actionType);
        }

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
            if (props.selectWhatsappList) {
                removeOthers.value = props.selectWhatsappList.filter((i, index) => {
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

                removeOthers.value[0].person = parsedData.value.person;
                data[props.selectedActionIndex] = new Object();
                data[props.selectedActionIndex].JSONActionParameters = new Object();
                data[props.selectedActionIndex].JSONActionParameters.person =
                parsedData.value.person;

                removeOthers.value[0].parent = parsedData.value.parent;
                data[props.selectedActionIndex].JSONActionParameters.parent =
                parsedData.value.parent;

                removeOthers.value[0].spouse = parsedData.value.spouse;
                data[props.selectedActionIndex].JSONActionParameters.spouse =
                parsedData.value.spouse;

                removeOthers.value[0].groupLeader = parsedData.value.groupLeader;
                data[props.selectedActionIndex].JSONActionParameters.groupLeader =
                parsedData.value.groupLeader;

                removeOthers.value[0].otherToContacts =
                parsedData.value.otherToContacts;
                data[props.selectedActionIndex].JSONActionParameters.otherToContacts =
                parsedData.value.otherToContacts;

                removeOthers.value[0].message = parsedData.value.message;
                data[props.selectedActionIndex].JSONActionParameters.message =
                parsedData.value.message;
            }
        })

        return {
            person,
            handleSendPersonMail,
            parent,
            handleSendPersonsParentMail,
            spouse,
            groupLeader,
            handleSendGroupLeaderMail,
            handleSendPersonsSpouseMail,
            otherToContacts,
            handleOtherAddresses,
            handleMessage,
            message,
            removeOthers
        }
    }
}
</script>

<style scoped>
    .max-height {
        max-height: calc(100vh - 300px);
        overflow-y: scroll;
    }
</style>