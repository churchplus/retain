<template>
    <div class="d-flex justify-content-end mx-3">
        <div class="mt-3 save-btn btn-btn c-pointer col-12 col-sm-6 col-md-3" @click="openNoteEditor">Create note</div>
    </div>
    <div class="col-12 mt-4" v-for="(item, index) in addNotes" :key="index">
        <div class="col-12 card-bg p-4">
            <div class="row d-flex justify-content-between">
                <div>
                    <div class="col align-self-center font-weight-700">Note</div>
                </div>
                <div>
                    <div class="col text-right"><span class="ml-2 small-text">{{ formatDate(item.date) }} {{ item.time }}</span></div>
                </div>
            </div>
            <div class="row">
                <div class="col mt-4 enlargen-font">{{ item.description }}</div>
            </div>
        </div>
    </div>
    <div class="row" v-if="!addNotes || addNotes.length === 0">
        <div class="col-12 mt-3 no-activity">
            You have not added any note yet
        </div>
    </div>
</template>


<script>
import dateFormatter from '../../../../services/dates/dateformatter'
export default {
    props: ['addNotes'],
    emits: ['individualtoggle', 'opennoteeditor'],
    setup(props, { emit }) {


        const toggleNoteIcon = (index) => {
            emit('individualtoggle', index)
        }

        const openNoteEditor = () => {
            emit('opennoteeditor', true)
        }

        const formatDate = (date) => {
            return dateFormatter.monthDayYear(date)
        }

        return {
            toggleNoteIcon,
            openNoteEditor,
            formatDate
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

.no-activity {
    font-size: 1.1em;
    font-weight: 500;
    color: rgb(156, 156, 156);
}
</style>