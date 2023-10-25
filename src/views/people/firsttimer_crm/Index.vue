<template>
    <div class="container-top container adjust-font">
        <canvas ref="confeti" width="300" height="300" class="active canvas-style" v-show="displayAnim"></canvas>
        <div class="row">
            <div class="col-12 col-md-4 p-0 side-bar">
                <SideActions @opennoteeditor="openNoteEditor" @openemailmodal="openEmailModal"
                    @opentaskeditor="openTaskEditor" :personDetails="personDetails" @calllogdesc="setCallLogDesc"
                    :smsLog="smsLog" @resetlog="resetLog" :activityType="activityType"
                    @updatelogtoview="updateLogToView" @displayanim="setDisplayAnim" />
            </div>
            <div class="col-12 col-md-8 main-view">
                <div class="row">
                    <div class="col-6 mt-3">
                        <div>
                            <el-input
                            type="text" 
                            placeholder="Search activities" 
                            v-model="searchActivitiesText"
                            >
                            <template #append>
                                <el-icon><Search /></el-icon>
                            </template>
                            </el-input>
                        </div>
            
                    </div>
                </div>
                <div class="row">
                    <div class="col-6 col-md-2 pr-0 c-pointer" @click="toggleActivity">
                        <div class="p-3">Activity</div>
                        <div :class="{ 'baseline': showActivity, 'hide-base': !showActivity }"></div>
                    </div>
                    <div class="col-6 col-md-2 pr-0 c-pointer" @click="toggleNotes">
                        <div class="p-3">Notes</div>
                        <div :class="{ 'baseline': showNotes, 'hide-base': !showNotes }"></div>
                    </div>
                    <div class="col-6 col-md-2 pr-0 c-pointer" @click="toggleEmails">
                        <div class="p-3">Emails</div>
                        <div :class="{ 'baseline': showEmails, 'hide-base': !showEmails }"></div>
                    </div>
                    <div class="col-6 col-md-2 pr-0 c-pointer" @click="toggleCalls">
                        <div class="p-3">SMS</div>
                        <div :class="{ 'baseline': showCalls, 'hide-base': !showCalls }"></div>
                    </div>
                    <div class="col-6 col-md-2 pr-0 c-pointer" @click="toggleTasks">
                        <div class="p-3">Tasks</div>
                        <div :class="{ 'baseline': showTasks, 'hide-base': !showTasks }"></div>
                    </div>
                </div>
                <div class="row">
                    <div class="border-top col-12 push-border-up"></div>
                </div>
                <div class="row mt-4">
                    <div class="col-12" v-if="showActivity" transition="bounce">
                        <Activity :activities="searchActivities" :addNotes="noteList" @individualtoggle="setIconProp"
                            :addTask="taskList" @individualtoggletask="setIconPropTask"
                            @individualcallicon="setIconPropLog" @edittask="setEditTaskProp"
                            @edittask2="setEditTaskProp2" @savetask="saveTaskItem" @hovertask="setHoverTaskProp"
                            @outhovertask="setOutHoverTaskProp" :loader="loader" :dueDate="dueDate"
                            :getReminder="getReminder" :activityType="activityType" :taskPriority="taskPriority"
                            :personDetails="personDetails" @commentindex="pushToComment"
                            @removecommetfromview="removeCommentFromView" @editcommentinview="editCommentInView"
                            @setduedate="setDueDateTask" @removelog="removeLogFromView" @setstatus="setTaskStatus"
                            @setcontact="setTaskContact" />
                    </div>
                    <div class="col-12 px-0" v-if="showNotes" transition="bounce">
                        <Notes :addNotes="noteList" @individualtoggle="setIconProp" @opennoteeditor="openNoteEditor" />
                    </div>
                    <div class="col-12 px-0" v-if="showEmails" transition="bounce">
                        <Emails @openemailmodal="openEmailModal" :emailList="emailList" @emaillicon="toggleEmailIcon"
                            :personDetails="personDetails" />
                    </div>
                    <div class="col-12 px-0" v-if="showCalls" transition="bounce">
                        <SMS :personDetails="personDetails" :logList="logList" @individualcallicon="setCallLogIcon"
                            @opensmslogpane="opensmslogpane" @hoverLog="setHoverLogProp"
                            @outhoverLog="setOutHoverLogProp" />
                    </div>
                    <div class="col-12 px-0" v-if="showTasks" transition="bounce">
                        <Tasks :addTask="taskList" @individualtoggletask="setIconMainTask"
                            @opentaskeditor="openTaskEditor" :dueDate="dueDate" :getReminder="getReminder"
                            :activityType="activityType" :taskPriority="taskPriority" @hovertask="setHoverPropForTask"
                            @outhovertask="setOutHoverPropForTask" @edittask="displayEditTaskField"
                            @hidetaskfield="hideTaskField" @removecommetfromview="removeCommentFromViewTask"
                            @editcommentinview="editCommentInViewTask" @setcontact="setTaskContactOnly"
                            @setactivitytypereset="setActivityTypeReset" @setresetpriority="setResetPriority"
                            @setduedate="setDueDateOnly" @newcommentindex="pushNewComment" />
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal for Note -->
    <el-drawer v-model="displayPosition" :size="xsOnly ? '100%' : '50%'" direction="rtl">
        <template #header>
            <h4>Create a note</h4>
        </template>
        <template #default>
            <el-input type="textarea" v-model="note" rows="12" class=" mt-4" placeholder="Type your note..." />
            <div class="d-flex justify-content-end mt-4">
                <el-button class="secondary-button" @click="displayPosition = false" round>Close</el-button>
                <el-button :color="primarycolor" :loading="noteLoading" @click="saveNote" round>Save</el-button>
            </div>
        </template>
    </el-drawer>

    <!-- Modal for email -->
    <el-drawer v-model="emailDisplayPosition" :size="xsOnly ? '100%' : '50%'" direction="rtl">
        <template #header>
            <h4>Compose email</h4>
        </template>
        <template #default>
            <div class="row p-2" v-if="!displayEmailPane">
                <div class="col-12 mt-3 font-weight-700 text-center">
                    Keep track of your email activity in your FRM
                </div>
                <div class="col-12 mt-3 text-center">
                    Send an email from your FRM to {{ personDetails.firstName }} {{ personDetails.lastName }}. All email
                    and conversations will appear in the activity and email tab.
                </div>
                <div class="offset-3 col-6 mt-5" @click="toggleDisplayEmailPane">
                    <div class="mail-connect">
                        <div>
                            <img src="../../../assets/unknown-email.svg" />
                        </div>
                        <div class="mt-3">Compose Email</div>
                    </div>
                </div>
            </div>
            <div class="row p-2" v-else>
                <div class="col-12 mt-3">
                    <span class="p-float-label">
                        <el-input v-model="personDetails.email"
                            style="border-radius: 0.25rem !important; border: 1px solid #ced4da !important;"
                            class="w-100" />
                    </span>
                </div>
                <div class="col-12 mt-4">
                    <el-input v-model="emailSubject" placeholder="Enter subject" class="w-100" />
                </div>
                <div class="col-12 mt-3">
                    <DecoupledEditor v-model="emailBody" />
                </div>
                <div class="d-flex justify-content-end mt-4 w-100">
                    <el-button class="secondary-button" @click="emailDisplayPosition = false" round>Close</el-button>
                    <el-button :color="primarycolor" :loading="emailLoading" @click="sendEmail" round>Save</el-button>
                </div>
            </div>

        </template>
    </el-drawer>


    <!-- Modal for task -->
    <el-drawer v-model="taskDisplayPosition" :size="xsOnly ? '100%' : '50%'" direction="rtl">
        <template #header>
            <h4>Create task</h4>
        </template>
        <template #default>
            <div class="row mt-3 p-2">
                <div class="row">
                    <div class="col-12">
                        <el-input v-model="theTask" type="textarea" placeholder="Enter your task" rows="6" />
                    </div>
                    <div class="col-6 label-text mt-3">Due date</div>
                    <div class="col-6 label-text mt-3">Reminder</div>
                    <div class="col-6 mt-2">
                        <el-dropdown trigger="click">
                            <span class="el-dropdown-link primary--text">
                                {{ Object.keys(selectedDueDate).length > 0 ? selectedDueDate.name : 'Select due date'
}}<el-icon class="el-icon--right"><arrow-down /></el-icon>
                            </span>
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item v-for="(item, index) in dueDate" :key="index"
                                        @click="setDueDate(item)">{{ item.name }}</el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                    </div>
                    <div class="col-6 mt-2">
                        <el-dropdown trigger="click">
                            <span class="el-dropdown-link primary--text">
                                {{ Object.keys(selectedReminder).length > 0 ? selectedReminder.name : 'Select reminder'
}}<el-icon class="el-icon--right"><arrow-down /></el-icon>
                            </span>
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item v-for="(item, index) in getReminder" :key="index"
                                        @click="setReminder(item)">{{ item.name }}</el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                    </div>
                    <div class="col-12 mt-3">
                        <hr />
                    </div>
                    <div class="col-4 label-text">Type</div>
                    <div class="col-4 label-text">Priority</div>
                    <div class="col-4 label-text">Assigned to</div>
                    <div class="col-4 mt-2">
                        <el-dropdown trigger="click">
                            <span class="el-dropdown-link primary--text">
                                {{ Object.keys(selectedTodo).length > 0 ? selectedTodo.value : 'Todo&nbsp;' }}<el-icon
                                    class="el-icon--right"><arrow-down /></el-icon>
                            </span>
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item v-for="(item, index) in activityType" :key="index"
                                        @click="setActivityType(item)">{{ item.value }}</el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                    </div>
                    <div class="col-4 mt-2">
                        <el-dropdown trigger="click">
                            <span class="el-dropdown-link primary--text">
                                {{ Object.keys(selectedPriority).length > 0 ? selectedPriority.name : 'Select priority'
}}<el-icon class="el-icon--right"><arrow-down /></el-icon>
                            </span>
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item v-for="(item, index) in taskPriority" :key="index"
                                        @click="setPriority(item)">{{ item.name }}</el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                    </div>
                    <div class="col-4 mt-2">
                        <span class="el-dropdown c-pointer" @click="toggleContact" style="color: #136acd">
                            {{ selectedContact && Object.keys(selectedContact).length > 0 ? selectedContact.name ?
        selectedContact.name : selectedContact.firstName ? `${selectedContact.firstName}
                            ${selectedContact.lastName}` : "Select contact" : "Select contact"
}}<el-icon
                                class="el-icon--right"><arrow-down /></el-icon>
                        </span>
                        <el-drawer v-model="searchmemberr" direction="btt" class="firsttimersearchmember">
                            <template #header>
                                <h4>Search member</h4>
                            </template>
                            <template #default>
                                <div>Enter the name of the person you want to assign this task to</div>
                                <SearchMember v-bind:currentMember="selectedContact" @memberdetail="chooseContact" />
                            </template>
                            <template #footer>
                                <div class="d-flex justify-content-start">
                                    <el-button @click="searchmemberr = false" :color="primarycolor" round>Done</el-button>
                                </div>
                            </template>
                        </el-drawer>

                    </div>

                    <div class="col-12">
                        <el-input v-model="taskNote" type="textarea" class="mt-3" placeholder="Leave a note..."
                            rows="4" />
                    </div>
                </div>
            </div>
            <div class="d-flex justify-content-end mt-3 w-100">
                <el-button class="secondary-button" @click="taskDisplayPosition = false" round>Close</el-button>
                <el-button :color="primarycolor" :loading="taskLoading" @click="saveTask" round>Save</el-button>
            </div>
        </template>
    </el-drawer>

    <!-- <Dialog header="Create New Member" v-model:visible="displayNewMemberModal"
        :style="{ width: '70vw', maxWidth: '600px' }" :modal="true" position="top">
        <div class="row">
            <div class="col-md-12">
                <NewPerson @cancel="() => (displayNewMemberModal = false)" @person-id="getPersonId($event)" />
            </div>
        </div>
    </Dialog> -->
</template>

<script>
import { computed, onMounted, ref, watchEffect, inject } from "vue"
import SideActions from "./components/SideActions"
import Activity from "./components/Activity"
import Notes from "./components/Notes"
import Emails from "./components/Emails"
import SMS from "./components/SMS"
import Tasks from "./components/Tasks"
import { useRoute } from "vue-router"
import axios from "@/gateway/backendapi";
import lookupTable from "../../../services/lookup/lookupservice"
import frmservice from "@/services/FRM/firsttimermanagement"
import groupResponse from '../../../services/groupArray/groupResponse'
import dateFormatter from '../../../services/dates/dateformatter'
import SearchMember from "../../../components/membership/MembersSearch.vue"
import celebAnim from "../../../services/celebration-animation/party"
import router from '../../../router'
import NewPerson from '../../../components/membership/NewDonor.vue'
import deviceBreakpoint from "../../../mixins/deviceBreakpoint";
import { ElMessage } from 'element-plus'
import DecoupledEditor from '@/components/RichEditor';
export default {
    inheritAttrs: false,
    components: {
        SideActions,
        Activity,
        Notes,
        Emails,
        SMS,
        Tasks,
        SearchMember,
        NewPerson,
        DecoupledEditor
    },
    setup() {
        const primarycolor = inject('primarycolor')
        const route = useRoute()
        const showActivity = ref(true)
        const showNotes = ref(false)
        const showEmails = ref(false)
        const showCalls = ref(false)
        const showTasks = ref(false)
        const displayPosition = ref(false)
        const position = ref('bottomright')
        const note = ref("")
        const noteList = ref([])
        const taskList = ref([])
        const emailDisplayPosition = ref(false)
        const emailBody = ref("")
        const emailSubject = ref("")
        const displayEmailPane = ref(false)
        const taskDisplayPosition = ref(false)
        const op = ref("")
        const theTask = ref("")
        const taskNote = ref("")
        const personDetails = ref({})
        const logList = ref([])
        const emailList = ref([])
        const activities = ref([])
        const smsLog = ref(false)
        const activityType = ref([])
        const selectedTodo = ref({})
        const taskPriority = ref(frmservice.priority())
        const selectedPriority = ref({})
        const dueDate = ref([])
        const selectedDueDate = ref({})
        const selectedReminder = ref({})
        const selectedContact = ref({})
        const loader = ref(false)
        const groupedActivities = ref([])
        const searchActivitiesText = ref("")
        const confeti = ref()
        const displayAnim = ref(false)
        const searchmemberr = ref(false)
        const positiondialog = ref('bottomright')
        const { xsOnly } = deviceBreakpoint()
        const noteLoading = ref(false)
        const emailLoading = ref(false)
        const taskLoading = ref(false)




        const toggleActivity = () => {
            showActivity.value = true
            showNotes.value = false
            showEmails.value = false
            showCalls.value = false
            showTasks.value = false
        }

        const toggleNotes = () => {
            showActivity.value = false
            showNotes.value = true
            showEmails.value = false
            showCalls.value = false
            showTasks.value = false
        }

        const toggleEmails = () => {
            showActivity.value =
                showNotes.value = false
            showEmails.value = true
            showCalls.value = false
            showTasks.value = false
        }

        const toggleCalls = () => {
            showActivity.value = false
            showNotes.value = false
            showEmails.value = false
            showCalls.value = true
            showTasks.value = false
        }

        const toggleTasks = () => {
            showActivity.value = false
            showNotes.value = false
            showEmails.value = false
            showCalls.value = false
            showTasks.value = true
        }

        const openPosition = () => {
            displayPosition.value = true;
        };
        const saveNote = async () => {
            noteLoading.value = true

            let body = {
                // title: "string",
                note: note.value,
                firsttimerID: route.params.personId,
                type: 96
            }
            try {
                await frmservice.saveNote(route.params.personId, body)
                noteLoading.value = false
                displayPosition.value = false;
                ElMessage({
                    type: 'success',
                    showClose: true,
                    message: "Note created successfully",
                    duration: 5000
                })
                getLogs()
            }
            catch (err) {
                noteLoading.value = false
                console.log(err)
            }

            note.value = ""
        };


        const openNoteEditor = (payload) => {
            displayPosition.value = payload
        }

        const openEmailModal = () => {
            emailDisplayPosition.value = true
        }

        const setIconProp = (payload) => {
            activities.value[payload].noteIcon = !activities.value[payload].noteIcon
        }

        const setIconPropTask = (payload) => {
            searchActivities.value[payload.parentIndex].value[payload.mainIndex].taskIcon = !searchActivities.value[payload.parentIndex].value[payload.mainIndex].taskIcon
        }

        const setIconMainTask = (payload) => {
            taskList.value[payload].taskIcon = !taskList.value[payload].taskIcon
        }

        const sendEmail = async () => {
            let data = {
                message: `<!DOCTYPE html>
                <html lang="en">
                    <head>
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width,initial-scale=1.0">
                    <style>
                        #email-body img {
                        width: 100% !important;
                        max-width: 1000px !important;
                        margin-left: auto;
                        margin-right: auto;
                        max-height: 300px;
                        object-fit: contain;
                        display: flex;
                        justify-content: center;
                        }
                        
                        #email-body img {
                        display: flex;
                        justify-content: center;
                        }
                        
                        #email-body figure {
                        margin: auto;
                        }
                    </style>
                    </head>
                    <body>
                    <div id="email-body" style="max-width: 1000px; margin: auto"> ${emailBody.value} </div>
                    </body>
                </html>`,
                subject: emailSubject.value
            }

            emailLoading.value = true

            try {
                await frmservice.sendEmail(route.params.personId, data)
                ElMessage({
                    type: 'success',
                    showClose: true,
                    message: "Email sent successfully",
                    duration: 5000
                })
                emailLoading.value = false
                emailDisplayPosition.value = false
                getLogs()

            }
            catch (err) {
                emailLoading.value = false
                console.log(err)
            }
        }

        const toggleDisplayEmailPane = () => {
            displayEmailPane.value = true
        }

        const openTaskEditor = (payload) => {
            taskDisplayPosition.value = payload
        }

        const toggle = (event) => {
            op.value.toggle(event);
        };

        const toggleTodo = (event) => {
            // todoTask.value.toggle(event);
        };

        const togglePriority = (event) => {
            // priorityRef.value.toggle(event);
        };

        const toggleDueDate = (event) => {
            // dueDateRef.value.toggle(event);
        };

        const toggleReminder = (event) => {
            // reminderRef.value.toggle(event);
        };

        const toggleContact = () => {
            // contactRef.value.toggle(event);
            // inputFocus.value = true
            searchmemberr.value = true
        };

        const setDueDate = (item) => {
            selectedDueDate.value = item
        }

        const setReminder = (item) => {
            // reminderRef.value.hide();
            selectedReminder.value = item
        }

        const saveTask = async () => {
            taskLoading.value = true

            let payload = {
                instructions: theTask.value,
                reminder: selectedReminder.value.value,
                dueDate: selectedDueDate.value.value,
                note: taskNote.value,
                type: selectedTodo.value.id,
                priority: selectedPriority.value.id,
                personID: selectedContact.value.id,
                contacts: route.params.personId
            }

            try {
                await frmservice.saveTask(payload)
                taskLoading.value = false
                taskDisplayPosition.value = false;
                ElMessage({
                    type: 'success',
                    showClose: true,
                    message: "Task created successfully",
                    duration: 5000
                })
                getLogs()
            }
            catch (err) {
                console.log(err)
                taskLoading.value = false
            }
            theTask.value = ""

        };

        const getPersonDetails = () => {
            axios
                .get(`/api/People/firstTimer/${route.params.personId}`)
                .then((res) => {
                    personDetails.value = res.data
                })
                .catch(err => {
                    console.log(err)
                })
        }
        if (route.query.memberType == 0) getPersonDetails()

        const getMemberPersonDetails = () => {
            axios
                .get(`/api/People/GetPersonInfoWithAssignments/${route.params.personId}`)
                .then((res) => {
                    personDetails.value = {
                        pictureUrl: res.data.pictureUrl,
                        firstName: res.data.firstName,
                        lastName: res.data.lastName,
                        email: res.data.email,
                        phoneNumber: res.data.mobilePhone,
                        address: res.data.homeAddress,
                        genderId: res.data.genderID,
                        maritalStatusId: res.data.maritalStatusID,
                        birthday: res.data.dayOfBirth,
                        birthMonth: res.data.monthOfBirth,
                        birthYear: res.data.yearOfBirth,
                        followupPersonID: res.data.followupPersonID,
                        followupPersonName: res.data.followupPersonName

                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }
        if (route.query.memberType == 1) getMemberPersonDetails()

        const setCallLogDesc = (payload) => {
            logList.value.unshift(payload)
            activities.value.unshift(payload)
        }

        const setCallLogIcon = (payload) => {
            logList.value[payload].logIcon = !logList.value[payload].logIcon
        }

        const opensmslogpane = (payload) => {
            smsLog.value = payload
        }

        const resetLog = (payload) => {
            smsLog.value = payload
        }

        const setIconPropLog = (payload) => {
            // activities.value[payload].logIcon = !activities.value[payload].logIcon
            searchActivities.value[payload.parentIndex].value[payload.mainIndex].logIcon = !searchActivities.value[payload.parentIndex].value[payload.mainIndex].logIcon

        }

        const setEditTaskProp = (payload) => {
            // activities.value[payload].editTask = true
            searchActivities.value[payload.parentIndex].value[payload.mainIndex].editTask = true
        }

        const setEditTaskProp2 = (payload) => {
            activities.value[payload].editTask2 = true
        }

        const saveTaskItem = (payload) => {
            // activities.value[payload].editTask = false
            searchActivities.value[payload.parentIndex].value[payload.mainIndex].editTask = false
        }

        // const saveTaskItem2 = (payload) => {
        //     activities.value[payload].editTask2 = false
        // }

        const setHoverTaskProp = (payload) => {
            // activities.value[payload].hoverTask = true
            searchActivities.value[payload.parentIndex].value[payload.mainIndex].hoverTask = true
        }

        const setOutHoverTaskProp = (payload) => {
            // activities.value[payload].hoverTask = false
            searchActivities.value[payload.parentIndex].value[payload.mainIndex].hoverTask = false
        }

        // const setHoverTaskProp2 = (payload) => {
        //     activities.value[payload].hoverTask2 = true
        // }

        // const setOutHoverTaskProp2 = (payload) => {
        //     activities.value[payload].hoverTask2 = false
        // }

        const setHoverLogProp = (payload) => {
            logList.value[payload].hoverLog = true
        }

        const setOutHoverLogProp = (payload) => {
            logList.value[payload].hoverLog = false
        }

        const getActivityType = async () => {
            try {
                let data = await lookupTable.getLookUps()
                activityType.value = data.activityType.filter(i => !i.value.toLowerCase().includes("update"))
            }
            catch (err) {
                console.log(err)
            }
        }
        getActivityType()

        const setActivityType = (activity) => {
            selectedTodo.value = activity
            // todoTask.value.hide()
        }

        const getDueDate = () => {
            try {
                let result = frmservice.dueDate()
                dueDate.value = result
            } catch (err) {
                console.log(err)
            }
        }
        getDueDate()

        const getReminder = computed(() => {
            if (Object.keys(selectedDueDate.value).length > 0) {
                let result = frmservice.reminder(selectedDueDate.value.value)
                return result
            } else {
                let result = frmservice.reminder()
                return result
            }
        })

        const reminder = ref(getReminder)

        const setPriority = (payload) => {
            // priorityRef.value.hide();
            selectedPriority.value = payload
        }

        const chooseContact = (payload) => {
            selectedContact.value = payload
        }

        watchEffect(() => {
            if (personDetails.value) {
                selectedContact.value = {
                    name: personDetails.value.followUpPersonName,
                    id: personDetails.value.contactOwnerID
                }
            }
        })

        const getLogs = async () => {
            loader.value = true
            try {
                let logs = await frmservice.getAllLogs(route.params.personId)
                activities.value = logs && logs.returnObject ? logs.returnObject.reverse() : []
                groupActivities()
                loader.value = false
            }
            catch (err) {
                console.log(err)
                loader.value = false
            }
        }
        getLogs()

        const formatDate = (date) => {
            return dateFormatter.monthDayYear(date)
        }

        const groupActivities = () => {
            // Group by type
            const type = groupResponse.groupData(activities.value, 'type')
            noteList.value = type[96]
            taskList.value = activities.value.filter(i => i.person)
            emailList.value = type[90]
            logList.value = type[92]

            let colors = ['rgba(148, 249, 192, 0.4)', 'rgba(148, 211, 249, 0.4)', 'rgba(232, 249, 148, 0.4)', 'rgba(249, 219, 148, 0.4)', 'rgba(249, 148, 239, 0.4)']
            let index = 0

            const mappedActivities = activities.value.map(i => {
                i.date = formatDate(i.date)
                i.color = colors[index]
                return i
            })
            for (let i = 0; i < mappedActivities.length; i++) {
                const element = mappedActivities[i];
                if (element.type == 94) {
                    element.color = colors[index]
                    if (index == colors.length - 1) {
                        index = 0;
                    } else {
                        index++;
                    }
                }


            }
            const date = groupResponse.groupData(mappedActivities, 'date')
            groupedActivities.value = []

            for (const prop in date) {
                groupedActivities.value.push({
                    name: prop,
                    value: date[prop]
                })
            }
        }

        const updateLogToView = () => {
            getLogs()
        }

        const searchActivities = computed(() => {
            if (searchActivitiesText.value == "") return groupedActivities.value
            let groupedArrResult = []
            groupedActivities.value.forEach(i => {
                let searchedResult = i.value.filter(j => {
                    if (j.description) return j.description.toLowerCase().includes(searchActivitiesText.value.toLowerCase())
                })
                groupedArrResult.push({
                    name: i.name,
                    value: searchedResult
                })
            })
            let resultFiltered = groupedArrResult.filter(i => i.value.length !== 0)
            return resultFiltered
        })

        const pushToComment = (payload) => {
            searchActivities.value[payload.parentIndex].value[payload.mainIndex].loggedTask.comments.push(payload.body)
        }

        const removeCommentFromView = (payload) => {
            searchActivities.value[payload.parentIndex].value[payload.mainIndex].loggedTask.comments.splice(payload.index, 1)
        }

        const editCommentInView = (payload) => {
            searchActivities.value[payload.parentIndex].value[payload.mainIndex].loggedTask.comments.splice(payload.index, 1, payload.body)
        }

        const removeCommentFromViewTask = ({ parentIndex, index }) => {
            taskList.value[parentIndex].loggedTask.comments.splice(index, 1)
        }

        const editCommentInViewTask = ({ parentIndex, index, body }) => {
            taskList.value[parentIndex].loggedTask.comments.splice(index, 1, body)
        }

        const toggleEmailIcon = (payload) => {
            emailList.value[payload].logIcon = !emailList.value[payload].logIcon
        }

        const setHoverPropForTask = (payload) => {
            taskList.value[payload].hoverTask = true
        }

        const setOutHoverPropForTask = (payload) => {
            taskList.value[payload].hoverTask = false
        }

        const displayEditTaskField = (payload) => {
            taskList.value[payload].editTask = true
        }

        const hideTaskField = (payload) => {
            taskList.value[payload].editTask = false
        }

        const setDueDateTask = ({ parentIndex, mainIndex, body }) => {
            searchActivities.value[parentIndex].value[mainIndex].selectedDueDate = body
        }

        onMounted(() => {
            celebAnim.party1(confeti.value)
        })

        const setDisplayAnim = () => {
            displayAnim.value = true
            setTimeout(() => {
                displayAnim.value = false
                router.push('/tenant/firsttimerslist')
            }, 8000);
        }

        const innerWidth = computed(() => {
            return window.innerWidth;
        })

        const removeLogFromView = ({ parentIndex, childIndex }) => {
            searchActivities.value[parentIndex].value.splice(childIndex, 1)
        }

        const setTaskStatus = ({ parentIndex, mainIndex, value }) => {
            searchActivities.value[parentIndex].value[mainIndex].loggedTask.status = value
        }

        const setTaskContact = ({ parentIndex, mainIndex, value }) => {
            searchActivities.value[parentIndex].value[mainIndex].selectedContact = value
        }

        // const toggleNewMember = () => {
        //     displayNewMemberModal.value = true
        // }

        const setTaskContactOnly = ({ index, payload }) => {
            taskList.value[index].selectedContact = payload
        }

        const setActivityTypeReset = ({ index, todoIndex }) => {
            taskList.value[index].selectedActivity = activityType.value[todoIndex]
        }

        const setResetPriority = ({ index, priorityIndex }) => {
            taskList.value[index].selectedPriority = taskPriority.value[priorityIndex]
        }

        const setDueDateOnly = ({ index, item }) => {
            taskList.value[index].selectedDueDate = item
        }
        
        const pushNewComment = ({ index, data }) => {
            taskList.value[index].loggedTask.comments.push(data)
        }

        return {
            toggleActivity,
            toggleNotes,
            toggleEmails,
            toggleCalls,
            toggleTasks,
            showActivity,
            showNotes,
            showEmails,
            showCalls,
            showTasks,
            // options,
            // value1
            openPosition,
            displayPosition,
            position,
            note,
            openNoteEditor,
            saveNote,
            noteList,
            emailDisplayPosition,
            openEmailModal,
            setIconProp,
            sendEmail,
            emailBody,
            emailSubject,
            toggleDisplayEmailPane,
            displayEmailPane,
            openTaskEditor,
            taskDisplayPosition,
            toggle,
            op,
            theTask,
            saveTask,
            taskList,
            setIconPropTask,
            personDetails,
            setCallLogDesc,
            logList,
            activities,
            setCallLogIcon,
            opensmslogpane,
            smsLog,
            resetLog,
            setIconPropLog,
            setEditTaskProp,
            setEditTaskProp2,
            saveTaskItem,
            setHoverTaskProp,
            setOutHoverTaskProp,
            setHoverLogProp,
            setOutHoverLogProp,
            // todoTask,
            toggleTodo,
            activityType,
            selectedTodo,
            setActivityType,
            taskPriority,
            // priorityRef,
            togglePriority,
            dueDate,
            // dueDateRef,
            toggleDueDate,
            setDueDate,
            selectedDueDate,
            reminder,
            // reminderRef,
            toggleReminder,
            selectedReminder,
            setReminder,
            taskNote,
            selectedPriority,
            setPriority,
            // allContacts,
            // setAllContacts,
            selectedContact,
            chooseContact,
            // contactRef,
            toggleContact,
            updateLogToView,
            loader,
            groupedActivities,
            searchActivitiesText,
            getReminder,
            emailList,
            searchActivities,
            pushToComment,
            removeCommentFromView,
            editCommentInView,
            toggleEmailIcon,
            setIconMainTask,
            setHoverPropForTask,
            setOutHoverPropForTask,
            displayEditTaskField,
            hideTaskField,
            removeCommentFromViewTask,
            editCommentInViewTask,
            setDueDateTask,
            confeti,
            displayAnim,
            setDisplayAnim,
            window,
            innerWidth,
            removeLogFromView,
            setTaskStatus,
            // displayNewMemberModal,
            // toggleNewMember,
            searchmemberr,
            positiondialog,
            xsOnly,
            noteLoading,
            emailLoading,
            taskLoading,
            setTaskContact,
            setTaskContactOnly,
            setActivityTypeReset,
            setResetPriority,
            setDueDateOnly,
            pushNewComment,
            primarycolor
        }
    }
}
</script>

<style scoped>
.baseline {
    transition: all 150ms ease-in-out;
    background-color: #33475b;
    border-radius: 24px;
    bottom: -2.5px;
    height: 6px;
    left: 0px;
    width: 100%;
    opacity: 1;
}

.hide-base {
    transition: all 150ms ease-in-out;
    background-color: #33475b;
    border-radius: 24px;
    bottom: -2.5px;
    height: 6px;
    left: 0px;
    width: 100%;
    opacity: 0;
}

.adjust-font {
    font-size: 14px;
    color: rgb(96, 98, 102)
}

.push-border-up {
    margin-top: -1px
}

.bounce-transition {
    display: inline-block;
    /* otherwise scale animation won't work */
}

.bounce-enter {
    animation: bounce-in .5s;
}

.bounce-leave {
    animation: bounce-out .5s;
}

@keyframes bounce-in {
    0% {
        transform: scale(0);
    }

    50% {
        transform: scale(1.5);
    }

    100% {
        transform: scale(1);
    }
}

@keyframes bounce-out {
    0% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.5);
    }

    100% {
        transform: scale(0);
    }
}

.side-bar {
    border: 1px solid #dfe3eb;
    border-right: 0;
    background: rgba(202, 202, 202, 0.096);
}

.main-view {
    background: #f5f8fa;
    border: 1px solid #dfe3eb
}

.uniform-primary-color {
    color: #136acd
}

.mail-connect {
    border-radius: 3px;
    background-color: #fff;
    border: 1px solid #136acd57;
    cursor: pointer;
    height: 250px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.mail-connect:hover {
    box-shadow: 0px 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    transition: all 0.3s ease-in-out
}

.label-text {
    color: #506e91;
    font-size: 0.9em;
}

.btn-btn {
    font-size: 13px;
    line-height: 14px;
    padding: 5px 12px;
    border-radius: 3px;
    -webkit-font-smoothing: auto;
    -moz-osx-font-smoothing: auto;
    font-weight: 400;
    text-align: center;
}

.save-btn {
    background-color: #425b76;
    border: 1px solid #425b76;
    color: #fff;
}

.hover-log:hover {
    background: rgba(249, 148, 239, 0.524);
    cursor: pointer
}

.canvas-style {
    position: absolute;
    z-index: 1;
}

/* canvas {
  width:100%;
  height:100%;
} */

/* .make-scrollable {
    height: 800px;
    overflow: scroll;
    margin-top: 100px
} */
</style>
