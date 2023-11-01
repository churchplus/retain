<template>
    <div>
        <el-dropdown trigger="click" class="w-100 mt-3">
            <el-input v-model="searchSenderText" placeholder="Search sender id">
                <template #suffix>
                    <el-button style="padding: 5px; height: 22px;" @click.prevent="searchSenderText = ''">
                        <el-icon :size="13">
                            <Close />
                        </el-icon>
                    </el-button>
                </template>
                <template #append>
                    <el-button>
                        <el-icon :size="15">
                            <ArrowDownBold />
                        </el-icon>
                    </el-button>
                </template></el-input>
            <el-icon class="el-icon--right"><arrow-down /></el-icon>
            <template #dropdown>
                <el-dropdown-menu class=" ">
                    <el-dropdown-item v-for="(item, index) in searchSenderIDs" :key="index" @click="setIdToSubject(item)">
                        {{ item.mask }}
                    </el-dropdown-item>
                    <el-dropdown-item class="primary--text" data-toggle="modal" data-target="#senderIdModal" divided>
                        <el-icon>
                            <CirclePlusFilled />
                        </el-icon> Request new sender ID
                    </el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>

        <!-- Create sender id modal -->
        <!-- Modal -->
        <div class="modal fade" id="senderIdModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle"
            aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">
                            Request Sender ID
                        </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close" ref="closeModal">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="container">
                            <div class="row">
                                <div class="col-12">Enter Sender ID</div>
                                <div class="col-12 mt-2">
                                    <el-form ref="ruleFormRef" :model="senderIDValidateForm" label-width="100px"
                                        class="demo-ruleForm" :rules="rules">
                                        <el-form-item class="sender-id-input" prop="senderIdText">
                                            <el-input type="text" placeholder="Enter sender id"
                                                v-model="senderIDValidateForm.senderIdText" />
                                        </el-form-item>
                                    </el-form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <el-button class="secondary-button" data-dismiss="modal" round>Cancel</el-button>
                        <el-button :color="primarycolor" :loading="senderidloading" @click="submitSenderForm(ruleFormRef)"
                            round>Request</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, reactive, inject } from 'vue';
import axios from "@/gateway/backendapi";
import { ElMessage } from "element-plus";

const primarycolor = inject('primarycolor')
const emit = defineEmits(['setselectedsenderid'])
const searchSenderText = ref("");
const senderIDs = ref([]);
const ruleFormRef = ref()
const closeModal = ref()
const senderidloading = ref(false)
const senderIDValidateForm = reactive({
    senderIdText: ''
})

const validateSenderId = async (rule, value, callback) => {
    var regExp = /^[a-zA-Z0-9]{3,11}$/;
    var testString = senderIDValidateForm.senderIdText;
    if (!regExp.test(testString)) {
        return callback(new Error('Should not contain any special characters AND Should not be less than 3 characters and more than 11 characters'))
    }
}

const rules = reactive({
    senderIdText: [
        { validator: validateSenderId, required: true, trigger: 'blur' },
    ],
})

const getSenderId = async () => {
    try {
        let { data } = await axios.get(
            `/api/Messaging/RetrieveTenantSenderIDs`
        );
        senderIDs.value = data.returnObject;
    } catch (err) {
        console.log(err);
    }
};
getSenderId();

const searchSenderIDs = computed(() => {
    if (!searchSenderText.value) return senderIDs.value;
    return senderIDs.value.filter((i) => {
        return i.mask
            .toLowerCase()
            .includes(searchSenderText.value.toLowerCase());
    });
});

const setIdToSubject = (item) => {
    console.log(item, 'LLll');
    searchSenderText.value = item.mask;
    emit('setselectedsenderid', item.mask)
};

const submitSenderForm = async (formEl) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            saveSenderId();
        } else {
            console.log('error submit!', fields)
        }
    })
}

const saveSenderId = async () => {
    senderidloading.value = true
    let payload = {
        mask: senderIDValidateForm.senderIdText,
    };
    try {
        let { data } = await axios.post(
            `/api/Messaging/RequestSenderID`,
            payload
        );
        senderidloading.value = false;
        closeModal.value.click();
        if (data.status === 0) {
            ElMessage({
                type: "warning",
                message: "PENDING, Sender id is pending for approval, when it is approved, you will see it among the sender id list",
                duration: 6000,
            });
        } else if (data.status === 1) {
            ElMessage({
                type: "warning",
                message: "PROCESSING, Sender id is processing for approval, when it is approved, you will see it among the sender id list",
                duration: 6000,
            });
        } else if (data.status === 2) {
            ElMessage({
                type: "success",
                message: "APPROVED, Sender id is approved!",
                duration: 6000,
            });
        } else {
            ElMessage({
                type: "error",
                message: "NOT APPROVED, Sender id is not approved, create another one.",
                duration: 6000,
            });
        }
        setIdToSubject({ mask: senderIDValidateForm.senderIdText })
        senderIDValidateForm.senderIdText = "";

        getSenderId();
    } catch (err) {
        senderidloading.value = false
        console.log(err);
    }
};

</script>