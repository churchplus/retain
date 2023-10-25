<template>
    <div class="d-flex justify-content-end mx-3">
        <div class="col-12 col-sm-6 col-md-3 mt-3 save-btn btn-btn c-pointer" @click="toggleSMSPane">Send an SMS</div>
    </div>
    <div class="col-12 mt-4" v-for="(item, index) in logList" :key="index">
        <div class="col-12 card-bg p-4" v-if="!item.loggedTask">
            <div class="row d-flex justify-content-between">
                <div>
                    <div class="col align-self-center"><span class="font-weight-700 c-pointer">
                        <el-icon class="uniform-primary-color" :class="{ 'roll-note-icon': item.logIcon, 'unroll-note-icon': !item.logIcon }" @click="toggleLogIcon(index, indx)"><ArrowUp /></el-icon>&nbsp;&nbsp;{{ item.person ? `${item.typeText}
                            task assigned to` : `${item.typeText} logged` }}</span> {{ item.person }} </div>
                </div>
                <div>
                    <div class="col text-right"><span class="ml-2 small-text">{{ formatDate(item.date) }} {{ item.time }}</span></div>
                </div>
            </div>
            <div class="row">
                <div class="col-12 mt-4 enlargen-font"
                    :class="{ 'hover-border': item.hoverLog, 'log-border': !item.hoverLog }" v-if="!item.editLog">
                    <div>{{ item.description }}</div>
                </div>

            </div>
            <transition name="fade">
                <div class="row" v-if="item.logIcon">
                    <div class="col-12">
                        <hr />
                    </div>
                    <div class="col-6">
                        <div class="label-text">Contacted</div>
                        <div class="uniform-primary-color font-weight-700 mt-1 c-pointer">{{ `${personDetails.firstName}
                            ${personDetails.lastName}` }}</div>
                    </div>
                    <div class="col-6">
                        <div class="label-text">{{ item.typeText }} Outcome</div>
                        <div class="mt-1 uniform-primary-color font-weight-700 c-pointer">{{ item.outcomeText }}</div>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>


<script>
import { ref } from "vue";
import dateFormatter from '../../../../services/dates/dateformatter';
export default {
    emits: ['individualcallicon', 'opensmslogpane'],
    props: ['personDetails', 'logList'],
    setup(props, { emit }) {
        const hoverLog = ref(false)
        const editLog = ref(false)
        const loggedDesc = ref("")
        const contactRef = ref(false)
        const outcomeRef = ref(false)
        const date = ref("")
        const timeRef = ref(false)
        const logIcon = ref(false)

        const toggleEditLog = () => {
            editLog.value = true
        }

        const saveLogDesc = () => {
            editLog.value = false
            hoverLog.value = false
        }

        const toggleContact = (event) => {
            contactRef.value.toggle(event);
        }

        const toggleOutcome = (event) => {
            outcomeRef.value.toggle(event);
        }

        const toggleTime = (event) => {
            timeRef.value.toggle(event);
        }

        const toggleLogIcon = (index) => {
            emit('individualcallicon', index)
        }

        const toggleSMSPane = () => {
            emit('opensmslogpane', true)
        }

        const formatDate = (date) => {
            return dateFormatter.monthDayYear(date)
        }

        return {
            editLog,
            toggleEditLog,
            saveLogDesc,
            loggedDesc,
            contactRef,
            outcomeRef,
            timeRef,
            toggleContact,
            toggleOutcome,
            toggleTime,
            date,
            logIcon,
            toggleLogIcon,
            formatDate,
            toggleSMSPane
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

.uniform-primary-color {
    color: #136acd
}

.enlargen-font {
    font-size: 1.2em
}

.log-btn {
    background-color: #eaf0f6;
    border: 1px solid #cbd6e2;
    color: #506e91;
}

.hover-border {
    border: 2px solid #1269cea6;
    border-radius: 3px;
}

.log-border {
    border: 2px solid white;
    border-radius: 3px;
}
</style>