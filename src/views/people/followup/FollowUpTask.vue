<template>
    <div class="table" style="box-shadow: none" v-for="(item, index) in tasks" :key="index">
        <div class="container">
            <div class="row p-3">
                <div class="col-md-5">
                    <div class="font-weight-700">Instructions</div>
                    <div>{{ item.instructions }}</div>
                </div>
                <div class="col-md-4 mt-3 pt-2 pt-md-0">
                    <div class="font-weight-700">Due date</div>
                    <div>{{ getDueDate(item.dueDate) }}</div>
                </div>
                <div class="col-6 col-md-3 mt-3 pt-2 pt-md-0">
                    <div class="font-weight-700">Contact</div>
                    <div>{{ item.contacts }}</div>
                </div>
                <div class="col-6 d-block d-md-none"></div>
                <div class="col-md-5 pt-2 pt-md-0">
                    <div class="font-weight-700">Priority</div>
                    <div>{{ getPriority(item.priority).name }}</div>
                </div>
                <div class="col-md-4 pt-2 pt-md-0">
                    <div class="font-weight-700">Task type</div>
                    <div>{{ createdTypes(item.type) }}</div>
                </div>
                <div class="col-md-3 pt-2 pt-md-0">
                    <!-- <Checkbox id="binary" v-model="item.markAsCompleted" @click="markCompleted(item)" :binary="true"/> &nbsp; &nbsp; -->
                    <div class="font-weight-700">Set status</div>
                    <Dropdown v-model="item.selectedStatus" :filter="false" :options="statuses" optionLabel="name" class="mt-1 w-100" placeholder="Select status" @change="markCompleted(item, index)" />
                </div>
            </div>
        </div>
        <Toast />
    </div>
</template>

<script>
import { ref } from "vue"
import frm from "@/services/FRM/firsttimermanagement.js"
import dateFormatter from '../../../services/dates/dateformatter'
import lookupTable from "../../../services/lookup/lookupservice"
import { useToast } from "primevue/usetoast";
import Dropdown from "primevue/dropdown";

export default {
    props: ["tasks"],
    components: {
        Dropdown
    },
    setup (props) {
        const toast = useToast()
        const activityType = ref([])
        const statuses = ref([ { name: 'Pending', value: 0 }, { name: 'InProgress', value: 1 }, { name: 'Completed', value: 2 }, { name: 'Cancelled', value: 3 }, { name: 'Rescheduled', value: 4 }, { name: 'Stalled', value: 5 } ])


        const getPriority = (id) => {
            return frm.priority().find(i => i.id === id)
        }
        const getDueDate = (date) => {
            return dateFormatter.monthDayYear(date)
        }

        const getActivityType = async () => {
            try {
                let data = await lookupTable.getLookUps()
                console.log(data)
                activityType.value = data.activityType.filter(i => !i.value.toLowerCase().includes("update"))
            }
            catch (err) {
                console.log(err)
            }
        }
        getActivityType()

        const createdTypes = (id) => {
            if (activityType.value.length > 0) return activityType.value.find(i => i.id === id).value
            return ""
        }

        const markCompleted = async(item, index) => {
            console.log(item)
            const body = {
                id: item.id,
                instructions: item.instructions,
                dateCreated: item.dateCreated,
                dateUpdated: item.dateCreated,
                reminder: item.reminder,
                dueDate: item.dueDate,
                note: item.note,
                type: item.type,
                priority: item.priority,
                personID: item.personID,
                contacts: item.contacts,
                status: props.tasks[index].selectedStatus.value
                }

            try {
                const res = await frm.editTask(item.id, body)
                console.log(res)
                toast.add({
                    severity: "success",
                    summary: "Marked",
                    detail: "Task marked successfully",
                    life: 5000,
                });
            }
            catch (err) {
                console.log(err)
            }
        }
        

        return {
            getPriority,
            getDueDate,
            createdTypes,
            activityType,
            markCompleted,
            statuses
        }
    }
}
</script>

<style scoped>

</style>