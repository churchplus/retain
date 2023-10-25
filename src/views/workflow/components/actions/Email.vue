<template>
    <div class="container max-height scroll-div" v-for="(item, index) in removeOthers" :key="index">
        <div class="row mt-4">
            <div class="col-md-12 px-0">
                <label for="" class="font-weight-600">Email</label>
            </div>
            <div class="col-md-12">
                <div class="row">
                    <div class="col-md-12">
                        <input type="checkbox" name="" id="" v-model="item.person" @change="handleSendPersonMail"> The person
                    </div>
                    <div class="col-md-12">
                        <input type="checkbox" name="" id="" v-model="item.parent" @change="handleSendPersonsParentMail"> The person's parent
                    </div>
                    <div class="col-md-12">
                        <input type="checkbox" name="" id="" v-model="item.spouse" @change="handleSendPersonsSpouseMail"> The person's spouse
                    </div>
                    <div class="col-md-12">
                        <input type="checkbox" name="" id="" v-model="item.groupLeader" @change="handleSendGroupLeaderMail"> The Group Leaders
                    </div>
                </div>
            </div>
        </div>

        <div class="row mt-4">
            <div class="col-md-12 px-0">
                <label for="" class="font-weight-600">Add BBC</label>
            </div>
            <div class="col-md-12">
                <div class="row">
                    <div class="col-md-12">
                        <input type="checkbox" name="" id="" v-model="item.parentBBC" @change="handleParentBBC"> The person's parent
                    </div>
                    <div class="col-md-12">
                        <input type="checkbox" name="" id="" v-model="item.spouseBBC" @change="handleSpouseBBC"> The person's spouse
                    </div>
                    <div class="col-md-12">
                        <input type="checkbox" name="" id="" v-model="item.BCCGroupLeader" @change="handleBCCGroupLeader"> The Group Leaders
                    </div>
                </div>
            </div>
        </div>

        <div class="row mt-4">
            <div class="col-md-12 px-0">
                <label for="" class="font-weight-600">And the following</label>
            </div>
            <div class="col-md-12">
                <input type="text" class="form-control" v-model="item.otherToContacts" @change="handleOtherAddresses">
                <span class="small-text">Separate the addresses with comma</span>
            </div>
        </div>

        <div class="row mt-4">
            <div class="col-md-12 px-0">
                <label for="" class="font-weight-600">Specify email for "Reply To"</label>
            </div>
            <div class="col-md-12">
                <input type="text" class="form-control" v-model="item.replyToEmailAddress" @change="handleReplyEmail">
            </div>
        </div>

        <div class="row mt-4">
            <div class="col-md-12 px-0">
                <label for="" class="font-weight-600">With the following subject</label>
            </div>
            <div class="col-md-12">
                <input type="text" class="form-control" v-model="item.subject" @change="handleSubject">
            </div>
        </div>

        <div class="row mt-4 mb-5">
            <div class="col-md-12 px-0">
                <label for="" class="font-weight-600">And message</label>
            </div>
            <div class="col-md-12">
              <!-- <div id="app">
              </div> -->
              <DecoupledEditor v-model="editorData" :loadedMessage="loadedMessage"  :label="'you find me'" />
                <!-- <textarea name="" id="" class="w-100 form-control" rows="3" v-model="item.message" @change="handleMessage"></textarea> -->
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, ref } from '@vue/reactivity';
import { watchEffect } from '@vue/runtime-core';
import DecoupledEditor from '@/components/RichEditor';
export default {
    props: [ "selectedActionIndex", "parameters", "selectEmailList" ],
    inheritAttrs: false,
    components: { 
    DecoupledEditor,
  },
    setup (props, { emit }) {
        const data = reactive([])
        const actionType = reactive(0)
        const person = ref(false);
        const removeOthers = ref([])
        const loadedMessage = ref("")
        const editorData = ref("")
        const handleSendPersonMail = () => {

            if (data[props.selectedActionIndex]) {
                data[props.selectedActionIndex].JSONActionParameters.person = removeOthers.value[0].person;
            }   else {
                data[props.selectedActionIndex] = new Object()
                data[props.selectedActionIndex].JSONActionParameters = new Object()
                data[props.selectedActionIndex].JSONActionParameters.person = removeOthers.value[0].person;
            }

            emit('updateaction', data, props.selectedActionIndex, actionType);
        }

        const parent = ref(false);
        const handleSendPersonsParentMail = () => {
            if (data[props.selectedActionIndex]) {
                console.log(data[props.selectedActionIndex])
                data[props.selectedActionIndex].JSONActionParameters.parent = removeOthers.value[0].parent;
            }   else {
                console.log(data[props.selectedActionIndex])
                data[props.selectedActionIndex] = new Object()
                data[props.selectedActionIndex].JSONActionParameters = new Object()
                data[props.selectedActionIndex].JSONActionParameters.parent = removeOthers.value[0].parent
            }

            emit('updateaction', data, props.selectedActionIndex, actionType);
        }

        const spouse = ref(false);
        const handleSendPersonsSpouseMail = () => {

            if (data[props.selectedActionIndex]) {
                data[props.selectedActionIndex].JSONActionParameters.spouse = removeOthers.value[0].spouse;
            }   else {
                data[props.selectedActionIndex] = new Object()
                data[props.selectedActionIndex].JSONActionParameters = new Object()
                data[props.selectedActionIndex].JSONActionParameters.spouse = removeOthers.value[0].spouse;
            }

            emit('updateaction', data, props.selectedActionIndex, actionType);
        }

        const groupLeader = ref(false);
        const handleSendGroupLeaderMail = () => {
            if (data[props.selectedActionIndex]) {
                data[props.selectedActionIndex].JSONActionParameters.groupLeader = removeOthers.value[0].groupLeader;
            }   else {
                data[props.selectedActionIndex] = new Object()
                data[props.selectedActionIndex].JSONActionParameters = new Object()
                data[props.selectedActionIndex].JSONActionParameters.groupLeader = removeOthers.value[0].groupLeader;
            }

            emit('updateaction', data, props.selectedActionIndex, actionType);
        }

        const otherToContacts = ref('');
        const handleOtherAddresses = () => {

            if (data[props.selectedActionIndex]) {
                data[props.selectedActionIndex].JSONActionParameters.otherToContacts = removeOthers.value[0].otherToContacts;
            }   else {
                data[props.selectedActionIndex] = new Object()
                data[props.selectedActionIndex].JSONActionParameters = new Object()
                data[props.selectedActionIndex].JSONActionParameters.otherToContacts = removeOthers.value[0].otherToContacts;
            }
            emit('updateaction', data, props.selectedActionIndex, actionType);
        }

        const BCCParent = ref('');
        const handleParentBBC = () => {


            if (data[props.selectedActionIndex]) {
                data[props.selectedActionIndex].JSONActionParameters.BCCParent = removeOthers.value[0].parentBBC;
            }   else {
                data[props.selectedActionIndex] = new Object()
                data[props.selectedActionIndex].JSONActionParameters = new Object()
                data[props.selectedActionIndex].JSONActionParameters.BCCParent = removeOthers.value[0].parentBBC;
            }
            
            // data.JSONActionParameters.BCCParent = e.target.checked;
            emit('updateaction', data, props.selectedActionIndex, actionType);
        }

        const BCCSpouse = ref('');
        const handleSpouseBBC = () => {

            if (data[props.selectedActionIndex]) {
                data[props.selectedActionIndex].JSONActionParameters.BCCSpouse = removeOthers.value[0].spouseBBC;
            }   else {
                data[props.selectedActionIndex] = new Object()
                data[props.selectedActionIndex].JSONActionParameters = new Object()
                data[props.selectedActionIndex].JSONActionParameters.BCCSpouse = removeOthers.value[0].spouseBBC;
            }


            emit('updateaction', data, props.selectedActionIndex, actionType);
        }

        const BCCGroupLeader = ref('');
        const handleBCCGroupLeader = () => {

            if (data[props.selectedActionIndex]) {
                data[props.selectedActionIndex].JSONActionParameters.BCCGroupLeader = removeOthers.value[0].BCCGroupLeader;
            }   else {
                data[props.selectedActionIndex] = new Object()
                data[props.selectedActionIndex].JSONActionParameters = new Object()
                data[props.selectedActionIndex].JSONActionParameters.BCCGroupLeader = removeOthers.value[0].BCCGroupLeader;
            }

            emit('updateaction', data, props.selectedActionIndex, actionType);
        }

        const otherBBC = ref('');

        const sendIndividualMails = ref(false);
        const handleSendIndividualMails = (e) => {
            data.JSONActionParameters.sendIndividualMails = e.target.checked;
            emit('updateaction', data, props.selectedActionIndex);
        }

        const replyToEmailAddress = ref('');
        const handleReplyEmail = () => {
            if (data[props.selectedActionIndex]) {
                data[props.selectedActionIndex].JSONActionParameters.replyToEmailAddress = removeOthers.value[0].replyToEmailAddress;
            }   else {
                data[props.selectedActionIndex] = new Object()
                data[props.selectedActionIndex].JSONActionParameters = new Object()
                data[props.selectedActionIndex].JSONActionParameters.replyToEmailAddress = removeOthers.value[0].replyToEmailAddress;
            }

            emit('updateaction', data, props.selectedActionIndex, actionType);
        }

        const subject = ref('');
        const handleSubject = () => {

            if (data[props.selectedActionIndex]) {
                data[props.selectedActionIndex].JSONActionParameters.subject = removeOthers.value[0].subject;
            }   else {
                data[props.selectedActionIndex] = new Object()
                data[props.selectedActionIndex].JSONActionParameters = new Object()
                data[props.selectedActionIndex].JSONActionParameters.subject = removeOthers.value[0].subject;
            }

            emit('updateaction', data, props.selectedActionIndex, actionType);
        }
        const message = ref('');
        const handleMessage = () => {
            
        }

        const parsedData = ref({ })
        watchEffect(() => {
            if (editorData.value) {
            if (data[props.selectedActionIndex]) {
                data[props.selectedActionIndex].JSONActionParameters.message = editorData.value;
            }   else {
                data[props.selectedActionIndex] = new Object()
                data[props.selectedActionIndex].JSONActionParameters = new Object()
                data[props.selectedActionIndex].JSONActionParameters.message = removeOthers.value[0].message;
            }

            emit('updateaction', data, props.selectedActionIndex, actionType);
            }

            if (props.selectEmailList) {
                removeOthers.value = props.selectEmailList.filter((i,index) => {
                    return index == props.selectedActionIndex
                })
            }
            if (removeOthers.value && removeOthers.value[0].action && removeOthers.value[0].action.jsonActionParameters) {
                parsedData.value = JSON.parse(removeOthers.value[0].action.jsonActionParameters);
                
                removeOthers.value[0].person = parsedData.value.person;
                data[props.selectedActionIndex] = new Object()
                data[props.selectedActionIndex].JSONActionParameters = new Object()
                data[props.selectedActionIndex].JSONActionParameters.person = parsedData.value.person;

                removeOthers.value[0].parent = parsedData.value.parent;
                data[props.selectedActionIndex].JSONActionParameters.parent = parsedData.value.parent;

                removeOthers.value[0].spouse = parsedData.value.spouse;
                data[props.selectedActionIndex].JSONActionParameters.spouse = parsedData.value.spouse;

                removeOthers.value[0].groupLeader = parsedData.value.groupLeader;
                data[props.selectedActionIndex].JSONActionParameters.groupLeader = parsedData.value.groupLeader;

                removeOthers.value[0].otherToContacts = parsedData.value.otherToContacts;
                data[props.selectedActionIndex].JSONActionParameters.otherToContacts = parsedData.value.otherToContacts;

                removeOthers.value[0].parentBBC = parsedData.value.BCCParent;
                data[props.selectedActionIndex].JSONActionParameters.BCCParent = parsedData.value.BCCParent;

                removeOthers.value[0].spouseBBC = parsedData.value.BCCSpouse;
                data[props.selectedActionIndex].JSONActionParameters.BCCSpouse = parsedData.value.BCCSpouse;

                removeOthers.value[0].BCCGroupLeader = parsedData.value.BCCGroupLeader;
                data[props.selectedActionIndex].JSONActionParameters.BCCGroupLeader = parsedData.value.BCCGroupLeader;

                removeOthers.value[0].otherBBC = parsedData.value.otherBBC;
                data[props.selectedActionIndex].JSONActionParameters.otherBBC = parsedData.value.otherBBC;

                removeOthers.value[0].sendIndividualMails = parsedData.value.sendIndividualMails;
                data[props.selectedActionIndex].JSONActionParameters.sendIndividualMails = parsedData.value.sendIndividualMails;

                removeOthers.value[0].replyToEmailAddress = parsedData.value.replyToEmailAddress;
                data[props.selectedActionIndex].JSONActionParameters.replyToEmailAddress = parsedData.value.replyToEmailAddress;

                removeOthers.value[0].subject = parsedData.value.subject;
                data[props.selectedActionIndex].JSONActionParameters.subject = parsedData.value.subject;

                removeOthers.value[0].message = parsedData.value.message;
                data[props.selectedActionIndex].JSONActionParameters.message = parsedData.value.message;
                loadedMessage.value = parsedData.value.message;

                console.log(parsedData.value, 'dataaaa')
            }

            
        })

        return {
            person,
            handleSendPersonMail,
            loadedMessage,
            parent,
            handleSendPersonsParentMail,
            spouse,
            groupLeader,
            handleSendGroupLeaderMail,
            handleSendPersonsSpouseMail,
            otherToContacts,
            handleOtherAddresses,
            BCCParent,
            handleParentBBC,
            BCCSpouse,
            handleSpouseBBC,
            handleBCCGroupLeader,
            otherBBC,
            BCCGroupLeader,
            sendIndividualMails,
            handleSendIndividualMails,
            replyToEmailAddress,
            handleReplyEmail,
            subject,
            handleSubject,
            message,
            handleMessage,
            removeOthers,
            editorData
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