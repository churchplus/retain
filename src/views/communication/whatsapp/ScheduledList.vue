<template>
    <el-tooltip class="box-item" effect="dark" v-if="markedSchedules.length > 0" content="Delete schedule(s)" placement="top-start">
        <el-icon :size="20" class="mt-4 c-pointer" v-if="markedSchedules.length > 0" @click="showConfirmModal('','multiple')">
            <Delete />
        </el-icon>
    </el-tooltip>
    <Table :data="scheduledWhatsappList" :headers="scheduledListHeaders" :checkMultipleItem="true"
        @checkedrow="handleSelectionChange" v-loading="schedulesloading" class="mt-4">
        <template #date="{ item }">
            <span>
                {{ formatDate(item.date) }}
            </span>
        </template>
        <template #message="{ item }">
            <span class="small-text">{{ item.message.length > 20 ? `${item.message.substring(0, 20)}...` : item.message
            }}</span>
        </template>
        <template #chatRecipients="{ item }">
            <span class="small-text">
                <el-tag class="ml-2" type="info" v-for="(recipient, index) in item.chatRecipients" :key="index">{{ recipient
                }}</el-tag>
            </span>
        </template>
        <template #whatsappAttachment="{ item }">
            <span class="small-text">
                <span>{{ item.base64File ? item.whatsappAttachment.fileName : "-" }}</span>&nbsp;
                <sub class="text-grey">{{ item.base64File ? formatBytes(item.whatsappAttachment.fileSize) : "-" }}</sub>
            </span>
        </template>
        <template #action="{ item }">
            <el-dropdown trigger="click">
                <el-icon>
                    <MoreFilled />
                </el-icon>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>
                            View file
                        </el-dropdown-item>
                        <el-dropdown-item>
                            <div @click.prevent="showConfirmModal(item.id, 'single')" class="text-color">
                                Delete
                            </div>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </template>
    </Table>
</template>

<script>
import { ref } from "vue"
import Table from "@/components/table/Table";
import store from '../../../store/store';
import dateFormatter from "../../../services/dates/dateformatter";
import { ElMessage, ElMessageBox } from "element-plus";
import axios from '@/gateway/backendapi';

export default {
    components: {
        Table
    },
    setup() {
        const scheduledWhatsappList = ref(store.getters['communication/scheduledWhatsappList'])
        const scheduledListHeaders = ref([
            { name: 'DATE', value: 'date' },
            { name: 'MESSAGE', value: 'message' },
            { name: 'RECIPIENTS', value: 'chatRecipients' },
            { name: 'ATTACHMENTS', value: 'whatsappAttachment' },
            { name: 'ACTION', value: 'action' },
        ])
        const markedSchedules = ref([])
        const schedulesloading = ref(false)



        const whatsappScheduledList = async () => {
            schedulesloading.value = true
            try {
                store.dispatch('communication/setScheduledWhatsappMessages').then(response => {
                    console.log(response);
                    scheduledWhatsappList.value = response
                    schedulesloading.value = false
                })
            } catch (error) {
                console.error(error);
                schedulesloading.value = false
            }
        }
        if (scheduledWhatsappList.value.length == 0) whatsappScheduledList()
        
        const deleteWhatsappSchedule = async (id, type) => {
            let payload = type == 'single' ? id : markedSchedules.value.map(i => i.id).join(",")
            try {
                let { data } = await axios.delete(`/api/Messaging/DeleteWhatsAppScheduledMessages?scheduledMessageIdList=${payload}`)
                whatsappScheduledList()
                ElMessage({
                    type: "success",
                    message: data.message,
                    duration: 5000,
                });

            } catch (error) {
                console.error(error);
            }
        }

        const formatDate = (date) => {
            return dateFormatter.monthDayTime(date);
        }

        const formatBytes = (bytes, decimals = 2) => {
            if (!+bytes) return '0 Bytes'

            const k = 1024
            const dm = decimals < 0 ? 0 : decimals
            const sizes = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

            const i = Math.floor(Math.log(bytes) / Math.log(k))

            return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
        }

        const showConfirmModal = (id, type) => {
            ElMessageBox.confirm(
                "Are you sure you want to proceed?",
                "Confirm delete",
                {
                    confirmButtonText: "OK",
                    cancelButtonText: "Cancel",
                    type: "error",
                }
            )
                .then(() => {
                    deleteWhatsappSchedule(id, type);
                })
                .catch(() => {
                    ElMessage({
                        type: "info",
                        message: "Delete canceled",
                        duration: 5000,
                    });
                });
        };

        const handleSelectionChange = (value) => {
            markedSchedules.value = value
        }


        return {
            scheduledWhatsappList,
            scheduledListHeaders,
            formatDate,
            formatBytes,
            showConfirmModal,
            markedSchedules,
            handleSelectionChange,
            schedulesloading
        }
    }
}
</script>