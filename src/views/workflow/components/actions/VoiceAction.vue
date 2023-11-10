<template>{{ tenantId }}
    <div class="container max-height scroll-div" v-for="(item, index) in removeOthers"
    :key="index">
        <div class="row mt-4">
            <div class="col-md-12 px-0">
                <label for="" class="font-weight-600">Voice</label>
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
                <label for="" class="font-weight-600">Voice URL</label>
            </div>
            <!-- v-model="item.voiceURL"  -->
            <div class="col-md-12 px-0">
                <input type="file" class="form-control" @change="handleVoice">
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, ref } from '@vue/reactivity';
import { watchEffect } from '@vue/runtime-core';
import media_service from "../../../../services/media/media_service";
import membershipService from "../../../../services/membership/membershipservice"
export default {
    props: [ "selectedActionIndex", "parameters", "selectVoiceList" ],
    setup (props, { emit }) {
        // const data = reactive({ ActionType: 2, JSONActionParameters: { } })
        const data = reactive([]);
        const actionType = reactive(2);
        const person = ref(false);
        const removeOthers = ref([]);
        const tenantId = ref("")

        const handleSendPersonMail = (e) => {
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
        const handleSendPersonsParentMail = (e) => {
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
        const handleSendPersonsSpouseMail = (e) => {
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
        const handleSendGroupLeaderMail = (e) => {
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
        const handleOtherAddresses = (e) => {
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

        const getTenantId = () => {
            membershipService.getSignedInUser()
                .then(res => {
                    tenantId.value = res.tenantId;
                })
                .catch(err => {
                    console.log(err);
                })
            }
        getTenantId();


        const voiceURL = ref('');
        const handleVoice = async(e) => {
            console.log(e.target.files[0])
            let formData = new FormData()
            formData.append("mediaFile", e.target.files[0])
            formData.append("tenantId", tenantId.value);

            try {
                let data = await media_service.uploadMedia(formData)
                console.log(data)
            } catch (err) {
                console.log(err)
            }
            // data.JSONActionParameters.voiceUrl = e.target.value;

            // if (data[props.selectedActionIndex]) {
            //     data[props.selectedActionIndex].JSONActionParameters.voiceUrl =
            //     removeOthers.value[0].voiceURL;
            // } else {
            //     data[props.selectedActionIndex] = new Object();
            //     data[props.selectedActionIndex].JSONActionParameters = new Object();
            //     data[props.selectedActionIndex].JSONActionParameters.voiceUrl =
            //     removeOthers.value[0].voiceURL;
            // }
            // emit('updateaction', data, props.selectedActionIndex, actionType);
        }

        const parsedData = ref({ })
        watchEffect(() => {
            if (props.selectVoiceList) {
                removeOthers.value = props.selectVoiceList.filter((i, index) => {
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
                
                removeOthers.value[0].voiceURL =
                parsedData.value.voiceUrl;
                data[props.selectedActionIndex].JSONActionParameters.voiceUrl =
                parsedData.value.voiceUrl;
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
            voiceURL,
            handleVoice,
            removeOthers,
            tenantId
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