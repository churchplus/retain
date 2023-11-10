<template>
<div class="row" v-if="loader">
    <div class="col-12">
       <div class="col-12 card-bg p-3 py-4">
            <div class="row">
                <div class="col-12">
                    <Skeleton width="100%" height="1rem" borderRadius="16px" />
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-12">
                    <Skeleton width="100%" height="1rem" borderRadius="16px" />
                </div>
            </div>
       </div>
    </div>
</div>
    <div class="row" v-for="(item, index) in activities" :key="index">
        <div class="col-12">
            <div class="row mt-4">
                <div class="col-12 date-style">{{ item.name }}</div>
            </div>
            <div class="row" v-for="(item, indx) in item.value" :key="indx">
 
                <div class="col-12 mt-4" v-if="item.type === 96">
                <!-- Card for Notes -->
                    <div class="col-12 card-bg p-4">
                        <div class="row d-flex justify-content-between">
                            <div>
                                <div class="col align-self-center font-weight-700">Note</div>
                            </div>
                            <div>
                                <div class="col text-right"><span class="small-text">{{ formatDate(item.date) }} {{ item.time }}</span></div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col mt-4 enlargen-font">{{ item.description }}</div>
                        </div>
                        <div class="text-right c-pointer">
                            <el-icon class="c-pointer text-danger" @click="showConfirmModal(item, index, indx)">
                                <Delete />
                            </el-icon>
                        </div>
                        <transition name="fade">
                            <div class="row mt-4" v-if="item.noteIcon">
                                <div class="col font-weight-700 uniform-primary-color">Add Comment</div>
                                <div class="col text-right font-weight-700 uniform-primary-color">1 Association</div>
                            </div>
                        </transition>
                    </div>
                </div>


            <!-- Card for tasks (visit/sms ...) -->
            <div class="col-12 mt-4 " v-if="(item.type === 87 || item.type === 88 || item.type === 90 || item.type === 91 || item.type === 92) && item.loggedTask">
                <div class="col-12 card-bg p-4 shadow-overlay">
                <div class="row d-flex justify-content-between">
                    <div>
                        <div class="col align-self-center"><span class="font-weight-700 c-pointer">
                            <el-icon class="uniform-primary-color" :class="{'roll-note-icon' : item.taskIcon, 'unroll-note-icon' : !item.taskIcon}" @click="toggleTaskIcon(index, indx)"><ArrowUp /></el-icon>&nbsp;&nbsp;{{ item.selectedActivity && Object.keys(item.selectedActivity).length > 0 ? item.selectedActivity.value : item.loggedTask && item.loggedTask.type && activityType.find(i => i.id === item.loggedTask.type) ? activityType.find(i => i.id === item.loggedTask.type).value : item.typeText }} {{ item.person ? 'task' : 'logged' }}</span> {{ item.person ? `assigned to ` : '' }} <span class="font-weight-700">{{ item.person ? item.person : "" }}</span></div>                        
                    </div>
                    <div>
                        <div class="col text-right"><span class="small-text">{{ formatDate(item.date) }} {{ item.time }}</span></div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 mt-4 enlargen-font" v-if="!item.taskIcon">
                        <div class="row">
                            <div class="col-1 align-self-center">
                                <div class="checked-first" v-if="item.loggedTask.status == 2">
                                    <el-icon style="font-size: 10px; color: #ffffff"><Check /></el-icon>
                                </div>
                                <div class="checked-inprogress" v-if="item.loggedTask.status == 1"></div>
                                <div class="checked-pending" v-if="item.loggedTask.status == 0"></div>
                                <div class="checked-cancel" v-if="item.loggedTask.status == 3"></div>
                            </div>
                            <div class="col-11">
                                <div>{{ item.loggedTask ? item.loggedTask.instructions : "Create your task" }} </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12">
                        <transition name="fade">
                            <div class="row mt-4" v-if="item.taskIcon">
                                <div class="col-1 align-self-center" v-if="item.loggedTask.status == 2">
                                    <div class="checked">
                                        <el-icon style="font-size: 15px; color: #ffffff"><Check /></el-icon></div>
                                </div>
                            <div class="col-11 p-2 d-flex task-border justify-content-between" :class="{ 'hover-border' : item.hoverTask, 'mx-2' : item.loggedTask.status !== 2 }" @mouseover="onHoverBorderTask(index, indx)" @mouseleave="outHoverBorderTask(index, indx)" v-if="!item.editTask" @click="toggleEditTask(index, indx)">
                                <div v-if="!item.loggedTask.instructions">Create a task here</div>
                                <div v-else>{{ item.loggedTask.instructions }}</div>
                                <div>
                                    <el-icon :class="{ 'uniform-primary-color' : item.hoverTask, 'text-white' : !item.hoverTask }" class="c-pointer">
                                        <Edit />
                                    </el-icon>
                            </div>
                            </div>
                            <div class="col-12">
                                <el-input type="textarea" rows="3" v-model="item.loggedTask.instructions" v-if="item.editTask" @blur="saveTask(index, indx)"/>
                                <hr />
                            </div>
                            <div class="col-4 col-md-8 label-text mt-3">Due date</div>

                            <div class="col-4 col-md-4 label-text mt-3 d-none d-md-block">Set status</div>

                            <div class="col-8 col-md-12 d-block d-md-none mt-3 text-right">
                                <el-dropdown trigger="click">
                                    <span class="el-dropdown-link primary--text">
                                            <div>
                                                {{ item.selectedDueDate && Object.keys(item.selectedDueDate).length > 0 ? item.selectedDueDate.name : getDueDate(item.loggedTask.dueDate) }}&nbsp;<el-icon>
                                                    <arrow-down />
                                                </el-icon>
                                            </div>
                                    </span>
                                    <template #dropdown>
                                        <el-dropdown-menu>
                                            <el-dropdown-item  v-for="(item, dueDateIndex) in dueDate" :key="dueDateIndex"
                                            @click="setDueDate(index, indx, item)">{{ item.name }}</el-dropdown-item>
                                        </el-dropdown-menu>
                                    </template>
                                </el-dropdown>
                            </div>

                            <div class="col-md-8 mt-2 d-none d-md-block mb-4">
                                <el-dropdown trigger="click">
                                    <span class="el-dropdown-link primary--text">
                                            <div>
                                                {{ item.selectedDueDate && Object.keys(item.selectedDueDate).length > 0 ? item.selectedDueDate.name : getDueDate(item.loggedTask.dueDate) }}&nbsp;<el-icon>
                                                    <arrow-down />
                                                </el-icon>
                                            </div>
                                    </span>
                                    <template #dropdown>
                                        <el-dropdown-menu>
                                            <el-dropdown-item  v-for="(item, dueDateIndex) in dueDate" :key="dueDateIndex"
                                            @click="setDueDate(index, indx, item)">{{ item.name }}</el-dropdown-item>
                                        </el-dropdown-menu>
                                    </template>
                                </el-dropdown>
                            </div>

                            

                            <div class="col-md-4 mt-2 d-none d-md-block mb-4">
                                <el-dropdown trigger="click">
                                    <span class="el-dropdown-link primary--text">
                                            <div>
                                                {{ selectedTask && selectedTask.name ? selectedTask.name : statuses.find(j => j.value == item.loggedTask.status).name }}&nbsp;<el-icon>
                                                    <arrow-down />
                                                </el-icon>
                                            </div>
                                    </span>
                                    <template #dropdown>
                                        <el-dropdown-menu>
                                            <el-dropdown-item  v-for="(taskItem, taskStatusIndex) in statuses" :key="taskStatusIndex"
                                            @click="setTaskStatus(taskItem, item.loggedTask, index, indx)">{{ taskItem.name }}</el-dropdown-item>
                                        </el-dropdown-menu>
                                    </template>
                                </el-dropdown>
                            </div>
                   
                            <div class="col-4 label-text mt-3 mt-md-0">Type</div>

                            <div class="col-8 d-block d-md-none mt-3 mt-md-0 text-right">
                                <el-dropdown trigger="click">
                                    <span class="el-dropdown-link primary--text">
                                            <div>
                                                {{ item.selectedActivity && Object.keys(item.selectedActivity).length > 0 ? item.selectedActivity.value : item.loggedTask && item.loggedTask.type ? activityType.find(i => i.id === item.loggedTask.type).value : "" }}&nbsp;
                                                <el-icon>
                                                    <arrow-down />
                                                </el-icon>
                                            </div>
                                    </span>
                                    <template #dropdown>
                                        <el-dropdown-menu>
                                            <el-dropdown-item  v-for="(item, todoIndex) in activityType" :key="todoIndex"
                                            @click="resetActivityType(todoIndex, index, indx)">{{ item.value }}</el-dropdown-item>
                                        </el-dropdown-menu>
                                    </template>
                                </el-dropdown>
                            </div>

                            <div class="col-4 label-text mt-3 mt-md-0">Priority</div>

                            <div class="col-8 d-block d-md-none mt-3 mt-md-0 text-right">
                                <el-dropdown trigger="click">
                                    <span class="el-dropdown-link primary--text">
                                            <div>
                                                {{ item.selectedPriority ? item.selectedPriority.name : taskPriority.find(i => i.id === item.loggedTask.priority).name }}&nbsp;
                                                <el-icon>
                                                    <arrow-down />
                                                </el-icon>
                                            </div>
                                    </span>
                                    <template #dropdown>
                                        <el-dropdown-menu>
                                            <el-dropdown-item v-for="(item, priorityIndex) in taskPriority" :key="priorityIndex"
                                            @click="resetPriority(priorityIndex, index, indx)">{{ item.name }}</el-dropdown-item>
                                        </el-dropdown-menu>
                                    </template>
                                </el-dropdown>
                            </div>

                            <div class="col-4 label-text mt-3 mt-md-0">Assigned to</div>

                            <div class="col-8 d-block d-md-none mt-3 mt-md-0 text-right">
                                <span class="el-dropdown c-pointer" @click="toggleContact" style="color: #136acd">
                                        {{ item.selectedContact ? `${item.selectedContact.name}` : item.person }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
                                    </span>
                            </div>
                            
                            <div class="col-4 label-text mt-3 mt-md-0 d-block d-md-none">Set status</div>

                            <div class="col-8 d-block d-md-none mt-3 mt-md-0 text-right">
                                <el-dropdown trigger="click">
                                    <span class="el-dropdown-link primary--text">
                                            <div>
                                                {{ selectedTask && selectedTask.name ? selectedTask.name : statuses.find(j => j.value == item.loggedTask.status).name }}&nbsp;<el-icon>
                                                    <arrow-down />
                                                </el-icon></div>
                                    </span>
                                    <template #dropdown>
                                        <el-dropdown-menu>
                                            <el-dropdown-item  v-for="(taskItem, taskStatusIndex) in statuses" :key="taskStatusIndex"
                                            @click="setTaskStatus(taskItem, item.loggedTask, index, indx)">{{ taskItem.name }}</el-dropdown-item>
                                        </el-dropdown-menu>
                                    </template>
                                </el-dropdown>
                            </div>

                            <div class="col-4 mt-2 d-none d-md-block">
                                <el-dropdown trigger="click">
                                    <span class="el-dropdown-link primary--text">
                                            <div>
                                                {{ item.selectedActivity && Object.keys(item.selectedActivity).length > 0 ? item.selectedActivity.value : item.loggedTask && item.loggedTask.type ? activityType.find(i => i.id === item.loggedTask.type).value : "" }}&nbsp;
                                                <el-icon>
                                                    <arrow-down />
                                                </el-icon>
                                            </div>
                                    </span>
                                    <template #dropdown>
                                        <el-dropdown-menu>
                                            <el-dropdown-item  v-for="(item, todoIndex) in activityType" :key="todoIndex"
                                            @click="resetActivityType(todoIndex, index, indx)">{{ item.value }}</el-dropdown-item>
                                        </el-dropdown-menu>
                                    </template>
                                </el-dropdown>
                            </div>
                            <div class="col-4 mt-2 d-none d-md-block">
                                <el-dropdown trigger="click">
                                    <span class="el-dropdown-link primary--text">
                                            <div>
                                                {{ item.selectedPriority ? item.selectedPriority.name : taskPriority.find(i => i.id === item.loggedTask.priority).name }}&nbsp;
                                                <el-icon>
                                                    <arrow-down />
                                                </el-icon>
                                            </div>
                                    </span>
                                    <template #dropdown>
                                        <el-dropdown-menu>
                                            <el-dropdown-item v-for="(item, priorityIndex) in taskPriority" :key="priorityIndex"
                                            @click="resetPriority(priorityIndex, index, indx)">{{ item.name }}</el-dropdown-item>
                                        </el-dropdown-menu>
                                    </template>
                                </el-dropdown>
                            </div>
                            <div class="col-4 mt-2 d-none d-md-block">
                                    <span class="el-dropdown c-pointer" @click="toggleContact" style="color: #136acd">
                                        {{ item.selectedContact ? `${item.selectedContact.name}` : item.person }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
                                    </span>
                            </div>
                            <el-drawer v-model="searchmemberr" direction="btt" class="text-left">
                                <template #header>
                                    <h4>Search member</h4>
                                </template>
                                <template #default>
                                    <div>Enter the name of the person you want to assign this task to</div>
                                    <SearchMember @memberdetail="chooseContact($event, index, indx)"/>
                                </template>
                                <template #footer>
                                <div class="d-flex justify-content-start">
                                    <el-button @click="searchmemberr = false" :color="primarycolor" round>Done</el-button>
                                </div>
                                </template>
                            </el-drawer>
                            <div class="col-12">
                            <el-input class="mt-3" type="textarea" rows="4" v-model="item.loggedTask.note" />
                            <div class="d-flex justify-content-start">
                                <div class="p-2 col-4 col-sm-2 mt-3 save-btn btn-btn c-pointer" @click="editTask(index, indx)" >Save</div>
                            <div class="cancel-btn btn-btn col-4 col-sm-2 ml-3 p-2 mt-3 c-pointer" @click="cancelTaskEdit2">Cancel</div>
                            </div>
                            </div>
                        </div>
                        </transition>
                    </div>
                </div>
                <div class="text-right">
                    <el-icon class="c-pointer text-danger" @click="showConfirmModal(item, index, indx)">
                        <Delete />
                    </el-icon>
                </div>
            <transition name="fade">
                <div class="container" v-if="item.taskIcon">
                    <div class="row mt-4" v-if="item.loggedTask.comments && item.loggedTask.comments.length == 0">
                        <el-button class="font-weight-700" @click="toggleDisplayComment" text>Add comment</el-button>
                    </div>
                    <div class="row" v-if="displayComment || item.loggedTask.comments.length > 0">
                        <div class="col-12 mt-4">
                            <div class="row comment-bg border py-3 mt-2" v-for="(comment, indexx) in item.loggedTask.comments" :key="indexx">
                                <div class="col-2">
                                    <img src="../../../../assets/checkin-assets/Icon-ionic-ios-person.svg"  class="user-img"/>
                                </div>
                                <div class="col-10">
                                    <div class="row">
                                        <div class="col-12 col-sm-8"><strong>{{ comment.personName }}</strong> left a comment</div>
                                        <div class="col-10 col-sm-3 small-text">{{ formatDate(comment.date) }}</div>
                                        <div class="dropdown col-2 col-sm-1">
                                            <i
                                            class="fas fa-ellipsis-v cursor-pointer alignLeft"
                                            id="dropdownMenuButton"
                                            data-toggle="dropdown"
                                            aria-haspopup="true"
                                            aria-expanded="false"
                                            ></i>
                                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                <a class="dropdown-item elipsis-items c-pointer" @click="setToEditComment(comment, index, indx, indexx)">
                                                   Edit 
                                                </a>
                                                <a class="dropdown-item elipsis-items c-pointer" @click="deleteComment(comment.id, index, indx, indexx)">
                                                   Delete 
                                                </a>
                                            </div>
                                        </div>
                                        <div class="col-12 mt-2">{{ comment.message }}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                
                            </div>
                        </div>
                        <div class="col-12 px-0 mt-3">
                            <el-input type="textarea" class="comment-bg" rows="7" placeholder="Write a comment..." v-model="taskComment" />
                        </div>
                        <div class="p-2 col-4 col-sm-2 mt-3 save-btn btn-btn c-pointer" @click="postComment(item, index, indx)">Post</div>
                        <div class="cancel-btn btn-btn col-4 col-sm-2 ml-3 p-2 mt-3 c-pointer" @click="() => displayComment = false">Cancel</div>
                    </div>
                </div>
            </transition>
            </div>
            </div>


            <!-- Card for Call and Email Logs -->

            <div class="col-12 mt-4" v-if="(item.type === 87 || item.type === 88 || item.type === 90 || item.type === 91 || item.type === 92) && !item.loggedTask">
                <div class="col-12 card-bg p-4">
                    <div class="row d-flex justify-content-between">
                        <div>
                            <div class="col align-self-center">
                                <span class="font-weight-700 c-pointer">
                                    <el-icon class="uniform-primary-color" :class="{'roll-note-icon' : item.logIcon, 'unroll-note-icon' : !item.logIcon}" @click="toggleLogIcon(index, indx)"><ArrowUp /></el-icon>&nbsp;&nbsp;{{ item.person ? `${item.typeText} task assigned to` : `${item.typeText} logged` }}
                                </span> {{ item.person }}
                            </div>
                        </div>
                        <div>
                            <div class="col text-right"><span class="ml-2 small-text">{{ formatDate(item.date) }} {{ item.time }}</span></div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 mt-4 enlargen-font"  :class="{ 'hover-border' : item.hoverLog, 'log-border' : !item.hoverLog }" v-if="!item.editLog">
                            <div>{{ condenseEmailText(item.description) }}</div>
                        </div>
                    </div>
                    <div class="text-right c-pointer">
                        <el-icon class="c-pointer text-danger" @click="showConfirmModal(item, index, indx)">
                            <Delete />
                        </el-icon>
                        <!-- <i class="pi pi-trash text-danger" @click="showConfirmModal(item, index, indx)"></i> -->
                    </div>
                    <transition name="fade">
                        <div class="row" v-if="item.logIcon">
                            <div class="col-12">
                                <hr />
                            </div>
                                <div class="col-6">
                                    <div class="label-text">Contacted</div>
                                    <div class="uniform-primary-color font-weight-700 mt-1 c-pointer">{{ `${personDetails.firstName} ${personDetails.lastName}` }}</div>
                                </div>
                                <div class="col-6">
                                    <div class="label-text">{{ item.typeText }} Outcome</div>
                                    <div class="mt-1 uniform-primary-color font-weight-700 c-pointer">{{ item.outcomeText }}</div>
                                </div>
                        </div>
                    </transition>
                </div>
            </div>
            
            <!-- Log for contactowner, lifecycle, leadstatus -->
            <transition name="fade">
                <div class="col-12 mt-4" v-if="item.type === 93 || item.type === 94 || item.type === 95">
                    <div class="col-12 card-bg lifecycle-bg p-4 " :style="`background: ${item.type === 94 ? item.color : 'white'}`">
                        <div class="row d-flex justify-content-between">
                            
                                <div class="col-12 col-md-6 align-self-center"><span class="font-weight-700">{{ item.type === 94 ? "Lifecycle changed" : item.type === 95 ? "Lead status changed" : "Contact's owner changed" }}</span><span class="font-weight-700 uniform-primary-color"></span></div>
                                <div class="col-12 col-md-6 text-md-right"><span class="small-text">{{ formatDate(item.date) }} {{ item.time }}</span>
                            </div>
                        </div>
                        <div class="row mt-2">
                            <div class="col-12 enlargen-font">
                                {{ item.description }}
                            </div>
                        </div>
                    
                    </div>
                </div>
            </transition>

        </div>
        </div>
    </div>
    <div class="row" v-if="activities.length === 0 && !loader" >
        <div class="col-12 mt-3 no-activity">
            You have not performed any activities yet
        </div>
    </div>
</template>


<script>
import { ref, inject } from "vue"
import dateFormatter from '../../../../services/dates/dateformatter';
import frmservice from "@/services/FRM/firsttimermanagement";
import { useRoute } from "vue-router"
import SearchMember from "../../../../components/membership/MembersSearch.vue"
import axios from "@/gateway/backendapi";
import { ElMessage, ElMessageBox } from 'element-plus'
export default {
    components: {
        SearchMember
    },
    props: ['personDetails', 'addNotes', 'addTask', 'dueDate', 'activities', 'loader', 'getReminder', 'activityType', 'taskPriority'],
    emits: ['individualtoggle', 'individualtoggletask', 'individualcallicon', 'edittask', 'edittask2', 'savetask', 'hovertask', 'outhovertask', "commentindex", "removecommetfromview", "editcommentinview", "setduedate", "removelog", "setstatus", "setcontact"],
    setup(props, { emit }) {
        const primarycolor = inject('primarycolor')
        const route = useRoute()
        const noteIcon = ref(false)
        const taskIcon = ref(false)
        const selectedTaskTime = ref("")
        const reminderOp = ref()
        const searchmemberr = ref(false)
        const displayComment = ref(false)
        const taskComment = ref("")
        const editCommentVar = ref(false)
        const commentId = ref("")
        const commentIndexToEdit = ref({})
        const selectedTask = ref({})
        const statuses = ref([ { name: 'Pending', value: 0 }, { name: 'InProgress', value: 1 }, { name: 'Completed', value: 2 }, { name: 'Cancelled', value: 3 }, { name: 'Rescheduled', value: 4 }, { name: 'Stalled', value: 5 } ])

        const toggleNoteIcon = (index) => {
            emit('individualtoggle', index)
        }
        
        const toggleTaskIcon = (index, indx) => {
            let indexes = {
                parentIndex: index,
                mainIndex: indx
            }
            emit("individualtoggletask", indexes)
        }
        
        const toggleEditTask = (index, indx) => {
            let indexes = {
                parentIndex: index,
                mainIndex: indx
            }
            emit('edittask', indexes)
        }
        
        const toggleEditTask2 = (index) => {

            emit('edittask2', index)
        }

        const onHoverBorderTask = (index, indx) => {
            let indexes = {
                parentIndex: index,
                mainIndex: indx
            }
            emit('hovertask', indexes)
        }
        
        const outHoverBorderTask = (index, indx) => {
            let indexes = {
                parentIndex: index,
                mainIndex: indx
            }
            emit('outhovertask', indexes)
        }
        

        const saveTask = (index, indx) => {
            let indexes = {
                parentIndex: index,
                mainIndex: indx
            }
            emit('savetask', indexes)
            editTask(index, indx)
        }
        
        const cancelTaskEdit2 = () => {
            editTask2.value = false
        }

        const toggleReminder = (event) => {
            reminderOp.value.toggle(event);
        };
        
        const toggleContact = () => {
            searchmemberr.value = true;
        };

        const toggleLogIcon = (index, indx) => {
            let indexes = {
                parentIndex: index,
                mainIndex: indx
            }
            emit('individualcallicon', indexes)
        }

        const formatDate = (date) => {
            return dateFormatter.monthDayYear(date)
        }

        const condenseEmailText = (text) => {
            if (text !== null) {
                if (text.toLowerCase().includes('<!doctype')) {
                    return 'Email sent successfully.'
                }   else {
                    return text
                }
            }
        }

        const toggleDisplayComment = () => {
            displayComment.value = !displayComment.value
        }

        const postComment = async(task, index, indx) => {  
            if (editCommentVar.value) {
                editComment()
                editCommentVar.value = false
            }   else {
                let body = {
                    comment: taskComment.value,
                    taskID:task.id
                }
                try {
                    let res = await frmservice.comment(task.loggedTask.id, body)
                    let indexes = {
                        parentIndex: index,
                        mainIndex: indx,
                        body: res.returnObject
                    }
                    emit("commentindex", indexes)
                    taskComment.value = ""
                }
                catch (err) {
                    console.log(err)
                }
            }
        }

        const deleteComment = async(id, index, indx, indexx) => {
            try {
                await frmservice.deleteComment(id)
                let body = {
                    parentIndex: index,
                    mainIndex: indx,
                    index: indexx
                }
                emit("removecommetfromview", body)
                
            }
            catch (err) {
                console.log(err)
            }
        }
       
       const setToEditComment = (comment, index, indx, indexx) => {
           editCommentVar.value = true
           commentId.value = comment.id
           taskComment.value = comment.message
           let body = {
                parentIndex: index,
                mainIndex: indx,
                index: indexx
            }
            commentIndexToEdit.value = body
        }

        const editComment = async() => {
            let payload = {
               comment: taskComment.value
           }
            try {
                let res = await frmservice.editComment(commentId.value, payload)
                commentIndexToEdit.value.body = res.returnObject
                emit("editcommentinview", commentIndexToEdit.value)
                taskComment.value = ""
            }
            catch (err) {
                console.log(err)
            }
        }

        const getDueDate = (date) => {
             return frmservice.dueDate().find(i => new Date(i.value).toDateString() == new Date(date).toDateString()) ? frmservice.dueDate().find(i => new Date(i.value).toDateString() == new Date(date).toDateString()).name : "Select due date"
        }
    

        const resetActivityType = (todoIndex, index, indx) => {
            props.activities[index].value[indx].selectedActivity = props.activityType[todoIndex]
        }

        const resetPriority = (priorityIndex, index, indx) => {
            props.activities[index].value[indx].selectedPriority = props.taskPriority[priorityIndex]
        }

        const chooseContact = (data, index, indx) => {
            // props.activities[index].value[indx].selectedContact = payload
            let payload = {
                parentIndex: index,
                mainIndex: indx,
                value: data
            }
            emit('setcontact', payload)
        }

        const editTask = async(index, indx) => {
            let body = {
                id: props.activities[index].value[indx].loggedTask.id,
                instructions: props.activities[index].value[indx].loggedTask.instructions,
                reminder: props.activities[index].value[indx].loggedTask.reminder, // Still hard coded
                dueDate: props.activities[index].value[indx].selectedDueDate ? props.activities[index].value[indx].selectedDueDate.value : props.activities[index].value[indx].loggedTask.dueDate,
                note: props.activities[index].value[indx].loggedTask.note,
                type: props.activities[index].value[indx].selectedActivity ? props.activities[index].value[indx].selectedActivity.id : props.activities[index].value[indx].type,
                priority: props.activities[index].value[indx].selectedPriority ? props.activities[index].value[indx].selectedPriority.id : props.activities[index].value[indx].loggedTask.priority,
                personID: props.activities[index].value[indx].selectedContact ? props.activities[index].value[indx].selectedContact.id : props.activities[index].value[indx].loggedTask.personID,
                contacts: route.params.personId
                }

                try {
                    await frmservice.editTask(props.activities[index].value[indx].loggedTask.id, body)
                    ElMessage({
                        type: 'success',
                        showClose: true,
                        message: "Task updated successfully",
                        duration: 5000
                    })
                }
                catch (err) {
                    console.log(err)
                }
        }

        const setDueDate = (index, indx, item) => {
            let body = {
                parentIndex: index,
                mainIndex: indx,
                body: item
            }
            emit("setduedate", body)
        }

        const setTaskStatus = async(item, task, index, indx) => {
            selectedTask.value = item

            let payload = {
                parentIndex: index,
                mainIndex: indx,
                value: item.value
            }
            emit('setstatus', payload)
       
            const body = {
                id: task.id,
                instructions: task.instructions,
                dateCreated: task.dateCreated,
                dateUpdated: task.dateCreated,
                reminder: task.reminder,
                dueDate: task.dueDate,
                note: task.note,
                type: task.type,
                priority: task.priority,
                personID: task.personID,
                contacts: task.contacts,
                status: item.value
                }

            try {
                await frmservice.editTask(task.id, body)
                ElMessage({
                    type: 'success',
                    showClose: true,
                    message: "Task status updated successfully",
                    duration: 5000
                })
            }
            catch (err) {
                console.log(err)
            }
        }

        const deleteLog = async(item, index, indx) => {
            try {
                await axios.delete(`/api/FirsttimerManager/activity/log/${item.id}`)
                let body = {
                    parentIndex: index,
                    childIndex: indx
                }
                emit("removelog", body)
                ElMessage({
                    type: 'success',
                    showClose: true,
                    message: "Deleted successfully",
                    duration: 5000
                })
            }
            catch (err) {
                console.log(err)
            }
        }

         const showConfirmModal = (item, index, indx) => {
                ElMessageBox.confirm(
                    'This action will permanently delete this item. Continue?',
                    'Confirm delete',
                    {
                    confirmButtonText: 'OK',
                    cancelButtonText: 'Cancel',
                    type: 'error',
                    }
                )
                    .then(() => {
                        deleteLog(item, index, indx);
                    })
                    .catch(() => {
                    ElMessage({
                        type: 'info',
                        message: 'Delete canceled',
                    })
                })
        };
        

    
        return {
            noteIcon,
            toggleNoteIcon,
            taskIcon,
            toggleTaskIcon,
            selectedTaskTime,
            toggleEditTask,
            toggleEditTask2,
            saveTask,
            onHoverBorderTask,
            outHoverBorderTask,
            cancelTaskEdit2,
            toggleLogIcon,
            formatDate,
            condenseEmailText,
            reminderOp,
            toggleReminder,
            toggleContact,
            searchmemberr,
            displayComment,
            toggleDisplayComment,
            postComment,
            taskComment,
            deleteComment,
            editComment,
            editCommentVar,
            setToEditComment,
            commentId,
            commentIndexToEdit,
            getDueDate,
            resetActivityType,
            resetPriority,
            chooseContact,
            editTask,
            setDueDate,
            selectedTask,
            statuses,
            setTaskStatus,
            deleteLog,
            showConfirmModal,
            primarycolor
        }
    }
}
</script>

<style scoped>
.activity-date {
    font-size: 23px;
}

.card-bg {
    background-color: rgb(255, 255, 255);
    box-shadow: rgb(45 62 80 / 12%) 0px 1px 5px 0px;
    border-radius: 8px;
}

.roll-note-icon {
    transition: all 0.5s ease-in-out;
    transform: rotateZ(180deg);
}
.unroll-note-icon {
    transition: all 0.5s ease-in-out;
    transform: rotateZ(90deg);
}

.fade {
    transition: all 0.5s ease-in-out;
    opacity: 0;
}
.fade-enter-active {
  animation: fade-in .3s;
}
.fade-leave-active {
  animation: fade-in .3s reverse;
}
@keyframes fade-in {
  0% {
    transform: translateY(-30px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }

}

.checked {
    width: 25px;
    height: 25px;
    background-color: rgb(0, 189, 165);
    border: 2px solid rgb(0, 189, 165);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.checked-first {
    width: 15px;
    height: 15px;
    background-color: rgb(0, 189, 165);
    border-radius: 50%;
    margin-right: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.checked-inprogress {
    width: 15px;
    height: 15px;
    background-color: rgb(213, 206, 3);
    border-radius: 50%;
    margin-right: 20px;
}

.checked-pending {
    width: 15px;
    height: 15px;
    background-color: rgb(211, 145, 3);
    border-radius: 50%;
    margin-right: 20px;
}

.checked-cancel {
    width: 15px;
    height: 15px;
    background-color: rgb(189, 19, 0);
    border-radius: 50%;
    margin-right: 20px;
}

.adjust-icon {
    position: relative;
    top: -3px;
    left: 4px;
}

.task-border {
    border: 2px solid white;
    border-radius: 3px;
}
.hover-border {
    border: 2px solid #1269cea6;
    border-radius: 3px;
}

.uniform-primary-color {
    color: #136acd
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

.cancel-btn {
    background-color: #eaf0f6;
    border-color: #cbd6e2;
    color: #506e91; 
}

.label-text {
    color: #506e91;
    font-size: 0.9em;
}

.enlargen-font {
    font-size: 1.2em
}

.no-activity {
    font-size: 1.1em;
    font-weight: 500;
    color: rgb(156, 156, 156);
}

.date-style {
    color: rgb(51, 71, 91);
    font-size: 19px
}

.lifecycle-card {
    /* border-right: 4px solid #0a75cc;
    border-left: 4px solid #0a75cc; */
    background: #88ff001e
}

.comment-bg {
    background: #fef8f0;
}

.hover-log:hover {
    background: rgba(202, 202, 202, 0.356);
    cursor: pointer
}

.make-scrollable {
    height: 800px;
    overflow: scroll;
    margin-top: 100px
}

.user-img {
    border-radius: 50%;
    width: 35px;
    height: 35px;
    background: #eee;
}
/* 
.shadow-overlay {
    position: absolute;
    margin-top: 44px;
    font-size: 34px;
    color: white;
    z-index: 1;
    opacity: 0;
    -webkit-transition: opacity 0.3s ease;
    -moz-transition: opacity 0.3s ease;
    -ms-transition: opacity 0.3s ease;
    -o-transition: opacity 0.3s ease;
    transition:  opacity 0.3s ease-in-out;
} */

/* .shadow-overlay {
    overflow: hidden;
    position: relative;
    transition: all 3s ease-in-out
}

.shadow-overlay > div {
    position: relative;
    z-index: 0;
    inset: 0;
    width: 130;
    height: 130px;
    object-fit: cover;
    transition: all 3s ease-in-out
}

.shadow-overlay::before,
.shadow-overlay::after {
    content: '';
    position: absolute;
    inset: 0;
    transition: all 3s ease-in-out
}

.shadow-overlay:before {
    z-index: 1;
    background: black;
    border-radius: 50%;
    position: absolute;
    margin: 0 auto;
    opacity: .3;
    width: 130px;
    opacity: 0;
    -webkit-transition: opacity 0.3s ease;
    -moz-transition: opacity 0.3s ease;
    -ms-transition: opacity 0.3s ease;
    -o-transition: opacity 0.3s ease;
    transition:  opacity 0.3s ease-in-out;
    
}

.shadow-overlay:hover:before {
    opacity: .6;
} */

</style>