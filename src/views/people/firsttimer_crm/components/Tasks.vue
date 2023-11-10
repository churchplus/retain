<template>
   <div class="d-flex justify-content-end mx-3">
        <div class="col-12 col-sm-6 col-md-3 mt-3 save-btn btn-btn pointer-cursor" @click="openTaskEditor">Create task</div>
   </div>
            <div class="col-12 mt-4" v-for="(item, index) in addTask" :key="index">
                <div class="col-12 card-bg p-4">
                <div class="row d-flex justify-content-between">
                    <div>
                        <div class="col align-self-center"><span class="font-weight-700 c-pointer">
                            <el-icon class="uniform-primary-color" :class="{'roll-note-icon' : item.taskIcon, 'unroll-note-icon' : !item.taskIcon}" @click="toggleTaskIcon(index)"><ArrowUp /></el-icon>&nbsp;&nbsp;{{ item.selectedActivity && Object.keys(item.selectedActivity).length > 0 ? item.selectedActivity.value : item.loggedTask && item.loggedTask.type ? activityType.find(i => i.id === item.loggedTask.type).value : item.typeText }} {{ item.person ? 'task' : 'logged' }}</span> {{ item.loggedTask.person ? `assigned to ` : '' }} <span class="font-weight-700">{{ item.loggedTask.person ? item.loggedTask.person : "" }}</span></div>         
                    </div>
                    <div>
                        <div class="col text-right"><span class="ml-2 small-text">{{ formatDate(item.date) }} {{ item.time }}</span></div>
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
                                            <el-dropdown-item  v-for="(date, dueDateIndex) in dueDate" :key="dueDateIndex"
                                            @click="setDueDate(date, index)">{{ date.name }}</el-dropdown-item>
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
                                            <el-dropdown-item  v-for="(date, dueDateIndex) in dueDate" :key="dueDateIndex"
                                            @click="setDueDate(date, index)">{{ date.name }}</el-dropdown-item>
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
                                            @click="setTaskStatus(taskItem, item.loggedTask)">{{ taskItem.name }}</el-dropdown-item>
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
                                            @click="resetActivityType(index, todoIndex)">{{ item.value }}</el-dropdown-item>
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
                                            @click="resetPriority(priorityIndex, index)">{{ item.name }}</el-dropdown-item>
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
                                            @click="setTaskStatus(taskItem, item.loggedTask)">{{ taskItem.name }}</el-dropdown-item>
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
                                            @click="resetActivityType(index, todoIndex)">{{ item.value }}</el-dropdown-item>
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
                                            @click="resetPriority(priorityIndex, index)">{{ item.name }}</el-dropdown-item>
                                        </el-dropdown-menu>
                                    </template>
                                </el-dropdown>
                            </div>
                            <div class="col-4 mt-2 d-none d-md-block">
                                    <span class="el-dropdown c-pointer" @click="toggleContact" style="color: #136acd">
                                        {{ item.selectedContact ? `${item.selectedContact.name}` : item.person }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
                                    </span>
                            </div>
                            <el-drawer v-model="searchmemberr" direction="btt">
                                <template #header>
                                    <h4>Search member</h4>
                                </template>
                                <template #default>
                                    <div>Enter the name of the person you want to assign this task to</div>
                                    <SearchMember @memberdetail="chooseContact($event, index)"/>
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
            <transition name="fade">
                <div class="container" v-if="item.taskIcon">
                    <div class="row mt-4" v-if="item.loggedTask.comments && item.loggedTask.comments.length == 0">
                        <el-button class="font-weight-700" @click="toggleDisplayComment" text>Add Comment</el-button>
                    </div>
                    <div class="row" v-if="displayComment || item.loggedTask.comments.length > 0">
                        <div class="col-12 mt-4">
                            <div class="row comment-bg border py-3 mt-2" v-for="(comment, indexx) in item.loggedTask.comments" :key="indexx">
                                <div class="col-2">
                                    <img src="../../../../assets/checkin-assets/Icon-ionic-ios-person.svg"  class="user-img"/>
                                </div>
                                <div class="col-10">
                                    <div class="row">
                                        <div class="col-8"><strong>{{ comment.personName ? comment.personName : "" }}</strong> left a comment</div>
                                        <div class="col-3 small-text">{{ formatDate(comment.date) }}</div>
                                        <div class="dropdown col-1">
                                            <i
                                            class="fas fa-ellipsis-v cursor-pointer alignLeft"
                                            id="dropdownMenuButton"
                                            data-toggle="dropdown"
                                            aria-haspopup="true"
                                            aria-expanded="false"
                                            ></i>
                                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                <a class="dropdown-item elipsis-items c-pointer" @click="setToEditComment(comment, index, indexx)">
                                                   Edit 
                                                </a>
                                                <a class="dropdown-item elipsis-items c-pointer" @click="deleteComment(comment.id, index, indexx)">
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
                        <div class="p-2 col-4 col-sm-2  mt-3 save-btn btn-btn c-pointer" @click="postComment(item, index, indx)">Post</div>
                        <div class="cancel-btn btn-btn col-4 col-sm-2  ml-3 p-2 mt-3 c-pointer" @click="() => displayComment = false">Cancel</div>
                    </div>
                </div>
            </transition>
        </div>
        </div>
         <div class="row" v-if="addTask.length === 0">
            <div class="col-12 mt-3 no-activity">
                You have not added any task yet
            </div>
        </div>
</template>


<script>
import { ref, inject } from "vue"
import dateFormatter from '../../../../services/dates/dateformatter'
import frmservice from "@/services/FRM/firsttimermanagement"
import SearchMember from "../../../../components/membership/MembersSearch.vue"
import { useRoute } from "vue-router"
import { ElMessage } from 'element-plus'
export default {
    inheritAttrs: false,
    props: ['addTask', 'activityType', 'dueDate', 'taskPriority', 'getReminder'],
    emits: ['individualtoggletask', 'opentaskeditor', 'hovertask', 'outhovertask', 'edittask', 'hidetaskfield', 'removecommetfromview', 'setcontact', 'editcommentinview', 'setactivitytypereset', 'setresetpriority', 'setduedate', 'newcommentindex'],
    components: {
        SearchMember
    },
    setup(props, { emit }) {
        const route = useRoute()
        const primarycolor = inject('primarycolor')
        const reminder = ref([])
        const displayComment = ref(false)
        const taskComment = ref("")
        const editCommentVar = ref(false)
        const commentId = ref("")
        const commentIndexToEdit = ref({})
        const selectedTask = ref({})
        const statuses = ref([ { name: 'Pending', value: 0 }, { name: 'InProgress', value: 1 }, { name: 'Completed', value: 2 }, { name: 'Cancelled', value: 3 }, { name: 'Rescheduled', value: 4 }, { name: 'Stalled', value: 5 } ])
        const searchmemberr = ref(false)

        const toggleTaskIcon = (index) => {
            emit("individualtoggletask", index)
        }

        const toggleEditTask = (index) => {
            emit("edittask", index)
        }

        const onHoverBorder = () => {
            hoverTask.value = true
        }
        
        const outHoverBorder = () => {
            hoverTask.value = false
        }

        const toggle = (event) => {
            op.value.toggle(event);
        };

        const openTaskEditor = () => {
            emit('opentaskeditor', true)
        }

        const formatDate = (date) => {
            return dateFormatter.monthDayYear(date)
        }

        const getDueDate = (date) => {
             return frmservice.dueDate().find(i => new Date(i.value).toDateString() == new Date(date).toDateString()) ? frmservice.dueDate().find(i => new Date(i.value).toDateString() == new Date(date).toDateString()).name : "Select due date"
        }

        const resetActivityType = (index, todoIndex) => {
            let payload = { index, todoIndex }
            emit('setactivitytypereset', payload)
        }

        const onHoverBorderTask = (index) => {
            emit('hovertask', index)
        }
        
        const outHoverBorderTask = (index) => {
            emit('outhovertask', index)
        }


        const resetPriority = (priorityIndex, index) => {
            let payload = { index, priorityIndex }
            emit('setresetpriority', payload)
        } 

        const toggleContact = () => {
            searchmemberr.value = true;
        };

        const chooseContact = (payload, index) => {
            let data  = { index, payload }
            emit("setcontact", data)
        }

        const setDueDate = (item, index) => {
            let payload = { index, item }
            emit('setduedate', payload)

        }


        const saveTask = (index) => {
            emit("hidetaskfield", index)
        };

        const editTask = async(index) => {
            let body = {
                id: props.addTask[index].loggedTask.id,
                instructions: props.addTask[index].loggedTask.instructions,
                reminder: props.addTask[index].selectedReminder ? props.addTask[index].selectedReminder.value : props.addTask[index].loggedTask.reminder, // Still hard coded
                dueDate: props.addTask[index].selectedDueDate ? props.addTask[index].selectedDueDate.value : props.addTask[index].loggedTask.dueDate,
                note: props.addTask[index].loggedTask.note,
                type: props.addTask[index].selectedActivity ? props.addTask[index].selectedActivity.id : props.addTask[index].type,
                priority: props.addTask[index].selectedPriority ? props.addTask[index].selectedPriority.id : props.addTask[index].loggedTask.priority,
                personID: props.addTask[index].selectedContact ? props.addTask[index].selectedContact.id : props.addTask[index].loggedTask.personID,
                contacts: route.params.personId
                }
                console.log(body)

                try {
                    await frmservice.editTask(props.addTask[index].loggedTask.id, body)
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

        const toggleDisplayComment = () => {
            displayComment.value = true
        }

        const postComment = async(task, index) => {  
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
                    emit('newcommentindex', { index, data: res.returnObject } )
                    taskComment.value = ""
                    ElMessage({
                        type: 'success',
                        showClose: true,
                        message: "Comment posted successfully",
                        duration: 5000
                    })
                }
                catch (err) {
                    console.log(err)
                }
            }
        }

        const setToEditComment = (comment, index, indexx) => {
           editCommentVar.value = true
           commentId.value = comment.id
           taskComment.value = comment.message
           let body = {
                parentIndex: index,
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
                ElMessage({
                    type: 'success',
                    showClose: true,
                    message: "Comment updated successfully",
                    duration: 5000
                })
            }
            catch (err) {
                console.log(err)
            }
        }

        const deleteComment = async(id, index, indexx) => {
            try {
                await frmservice.deleteComment(id)
                let body = {
                    parentIndex: index,
                    index: indexx
                }
                emit("removecommetfromview", body)
                ElMessage({
                    type: 'success',
                    showClose: true,
                    message: "Comment deleted successfully",
                    duration: 5000
                })
            }
            catch (err) {
                console.log(err)
            }
        }

        const setTaskStatus = async(item, task) => {
            selectedTask.value = item
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

        return {
            toggleTaskIcon,
            toggleEditTask,
            onHoverBorder,
            outHoverBorder,
            toggle,
            openTaskEditor,
            formatDate,
            resetActivityType,
            getDueDate,
            onHoverBorderTask,
            outHoverBorderTask,
            resetPriority,
            toggleContact,
            chooseContact,
            setDueDate,
            saveTask,
            editTask,
            reminder,
            displayComment,
            toggleDisplayComment,
            taskComment,
            postComment,
            editCommentVar,
            setToEditComment,
            commentId,
            editComment,
            commentIndexToEdit,
            deleteComment,
            selectedTask,
            setTaskStatus,
            statuses,
            searchmemberr,
            primarycolor
        }
    }
}
</script>

<style scoped>
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

.uniform-primary-color {
    color: #136acd
}

.btn-btn {
    font-size: 13px;
    line-height: 14px;
    padding: 9px 15px;
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

.enlargen-font {
    font-size: 1.2em
}

.no-activity {
    font-size: 1.1em;
    font-weight: 500;
    color: rgb(156, 156, 156);
}

.hover-log:hover {
    background: rgba(202, 202, 202, 0.356);
    cursor: pointer
}

.task-border {
    border: 2px solid white;
    border-radius: 3px;
}

.hover-border {
    border: 2px solid #1269cea6;
    border-radius: 3px;
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

.comment-bg {
    background: #fef8f0;
}

.user-img {
    border-radius: 50%;
    width: 35px;
    height: 35px;
    background: #eee;
}

</style>