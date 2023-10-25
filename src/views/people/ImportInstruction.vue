<template>
    <div :class="{ 'container-slim': lgAndUp || xlAndUp }" class="container-top">
        <div class="row">
            <div class="col-12 col-md-12 col-lg-12 header">
                <div>Import members </div>
                <div class="border-bottom w-100 my-4 col-12  col-md-12 col-lg-12 "></div>
            </div>

            <div class="col-12 col-md-10  col-lg-11 col-xl-11">
                <p>You can easily import members from any spreadsheet with .xlsx or .csv file format. </p>
            </div>
            <div class="col-12 text-secondary font-weight-normal lead d-none d-md-block mb-3"> Members Excel/CSV
                template
                file </div>
            <div class="col-12 col-md-12 mb-3">
                <a href="/files/Template.csv" class="no-decoration primary--text font-weight-bold" download>Click here to
                    download and view
                    our members Excel/CSV template.</a>
                <span> You can use this as a template for creating your Excel/CSV file.</span>
            </div>
            <div class="col-12">
                <div class="py-2 rounded bg-white light-shadow">
                    <div class="col-md-12 col-12 col-lg-12 mt-3 ">
                        <input type="file" @change="imageSelected" class="form-control w-100 c-pointer">
                    </div>
                    <div class="col-12 d-flex justify-content-center text-center  my-4">
                        <el-button :color="primarycolor" :disabled="(image == '')" @click="uploadFile"
                            :loading="uploadLoading" round>Upload and preview members</el-button>
                    </div>
                    <div class="border-bottom w-100 my-2 col-md-12 "></div>
                    <div class="col-12 col-md-7 col-lg-7 my-3  small "> Maximum 5MB file size.</div>
                </div>
            </div>
            <div class="col-lg-12 col-md-12">
                <div class="mt-4">
                    <span>Need help creating your Excel or CSV file?</span>
                    <a href="#" @click="toggleInstruction" class="no-decoration primary--text font-weight-bold "> View
                        Instruction <i class="pi pi-angle-down"
                            :class="{ 'rollIcon': addInstructionClass, 'closeIcon': !addInstructionClass }"></i></a>
                </div>

            </div>
            <div class="col-12"
                :class="{ 'show-instruction': addInstructionClass, 'hide-instruction': !addInstructionClass }">
                <div class="row">
                    <div class="col-6 col-md-12 col-lg-12 text-secondary font-weight-normal lead my-3 "> File format
                    </div>
                    <div class="col-10 col-md-12">
                        <span>The first line of your members Excel/CSV must include all of the headers listed below,
                            which are included in the member Excel/CSV template</span>
                    </div>
                    <div class="row ml-1 bg-secondary my-3 mx-1 rounded h-100 w-100">
                        <div class="col-12 my-2 col-md-12 col-lg-12"><i class="pi pi-info-circle"></i><strong>
                                Reminder:</strong> All Excel/CSV file headers are case-sensitive.
                            <div class="col-12 col-md-12 col-lg-12 border-bottom  my-2"></div>
                        </div>
                        <div class="col-4 col-md-4 col-lg-4 font-weight-bold">
                            <p>FirstName</p>
                        </div>
                        <div class="col-8 col-md-8 col-lg-8">
                            <p>The first name of your member</p>
                        </div>
                        <div class="col-4 col-md-4 col-lg-4 font-weight-bold">
                            <p> LastName</p>
                        </div>
                        <div class="col-8 col-md-8 col-lg-8">
                            <p>The last name of your member.</p>
                        </div>
                        <div class="col-4 col-md-4 col-lg-4 font-weight-bold">
                            <p> Email</p>
                        </div>
                        <div class="col-8 col-md-8 col-lg-8">
                            <p>The email address of your member</p>
                        </div>
                        <div class="col-4 col-md-4 col-lg-4 font-weight-bold">
                            <p>PhoneNumber</p>
                        </div>
                        <div class="col-8 col-md-8 col-lg-8">
                            The phone number of your member.
                        </div>
                        <div class="col-4 col-md-4 col-lg-4 font-weight-bold">
                            <p> Address</p>
                        </div>
                        <div class="col-8 col-md-8 col-lg-8">
                            The address of the member.
                        </div>
                        <div class="col-4 col-md-4 col-lg-4 font-weight-bold">
                            <p>Birthday</p>
                        </div>
                        <div class="col-8 col-md-8 col-lg-8">
                            <p>The birthday of the member</p>
                        </div>
                        <div class="col-4 col-md-4 col-lg-4 font-weight-bold">
                            <p>BirthMonth</p>
                        </div>
                        <div class="col-8 col-md-8 col-lg-8">
                            <p>The birth month of the member</p>
                        </div>
                        <div class="col-4 col-md-4 col-lg-4 font-weight-bold">
                            <p>BirthYear</p>
                        </div>
                        <div class="col-8 col-md-8 col-lg-8">
                            <p>The birth year of the member</p>
                        </div>
                        <div class="col-4 col-md-4 col-lg-4 font-weight-bold">
                            <p>Gender</p>
                        </div>
                        <div class="col-8 col-md-8 col-lg-8">
                            <p>The gender of the member</p>
                        </div>
                        <div class="col-4 col-md-4 col-lg-4 font-weight-bold">
                            <p>MaritalStatus</p>
                        </div>
                        <div class="col-8 col-md-8 col-lg-8">
                            <p>The marital status of the member</p>
                        </div>
                        <div class="col-4 col-md-4 col-lg-4 font-weight-bold">
                            <p>CommunicationMeans</p>
                        </div>
                        <div class="col-8 col-md-8 col-lg-8">
                            <p>Preferred communcation means of the member</p>
                        </div>
                        <div class="col-4 col-md-4 col-lg-4 font-weight-bold">
                            <p>InterestedInJoining</p>
                        </div>
                        <div class="col-8 col-md-8 col-lg-8">
                            <p>If member is interested in joining</p>
                        </div>
                        <div class="col-4 col-md-4 col-lg-4 font-weight-bold">
                            <p>WantToBeVisited</p>
                        </div>
                        <div class="col-8 col-md-8 col-lg-8">
                            <p>If member wants to be visited.</p>
                        </div>
                    </div>
                </div>
            </div>

            <el-dialog v-model="displayModal" title="Members to import from file" :width="mdAndUp || lgAndUp || xlAndUp ? `50%` : `90%`">
                <div class="row">
                    <div class="col-3 font-weight-700">Name</div>
                    <div class="col-4 font-weight-700">Email</div>
                    <div class="col-2 font-weight-700">Gender</div>
                    <div class="col-2 font-weight-700">Phone Number</div>
                </div>
                <div class="row" v-for="(item, index) in memberData" :key="index">
                    <div class="col-3">{{ item.firstName ? item.firstName : "" }} {{ item.lastName ? item.lastName :
                            ""
                    }}</div>
                    <div class="col-4">{{ item.email }}</div>
                    <div class="col-2">{{ item.gender }}</div>
                    <div class="col-2">{{ item.phoneNumber }}</div>
                </div>
                <template #footer>
                    <span class="dialog-footer d-flex justify-content-end text-center">
                        <el-button class="secondary-button" @click="displayModal = false" round>Cancel</el-button>
                        <el-button :color="primarycolor" :loading="loading" @click="addToMembers" round>
                        Save
                        </el-button>
                    </span>
                </template>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import { ref, inject } from "vue"
import axios from "@/gateway/backendapi";
import finish from "../../services/progressbar/progress"
import { useRoute } from "vue-router"
import { useStore } from "vuex"
import deviceBreakpoint from "../../mixins/deviceBreakpoint";
import { ElMessage } from 'element-plus'
import router from '../../router/index'

export default {
    emits: ["uploadtogroup"],
    components: {
    },
    setup(props, { emit }) {
        const primarycolor = inject('primarycolor')
        const route = useRoute()
        const store = useStore();
        const image = ref("");
        const displayModal = ref(false)
        const memberData = ref([])
        const addInstructionClass = ref(false)
        const loading = ref(false)
        const { mdAndUp, lgAndUp, xlAndUp } = deviceBreakpoint()
        const uploadLoading = ref(false)







        const imageSelected = async (e) => {
            image.value = e.target.files[0];
        };

        const uploadFile = async () => {
            const formData = new FormData();
            formData.append("file", image.value ? image.value : "")
            console.log(formData)
            uploadLoading.value = true
            if (!route.fullPath.includes("createpeoplegroup")) {
                try {
                    let { data } = await axios.post("/api/People/UploadFirstTimerFile", formData)
                    console.log(data)
                    uploadLoading.value = false
                    ElMessage({
                        type: 'success',
                        message: data.response,
                        duration: 5000
                    })
                    memberData.value = data.returnObject
                    displayModal.value = true;      
                }
                catch (err) {
                    uploadLoading.value = false
                    finish()
                    console.log(err)
                    if (err.toString().toLowerCase().includes("network error")) {
                        ElMessage({
                            type: 'warning',
                            message: "Please ensure you have strong internet connection",
                            duration: 5000
                        })

                    } else if (err.toString().toLowerCase().includes("timeout")) {
                        ElMessage({
                            type: 'warning',
                            message: "Request took too long to respond, please refresh and try again",
                            duration: 5000
                        })
                    } else {
                        ElMessage({
                            type: 'warning',
                            message: "Upload not successful, please try again",
                            duration: 5000
                        })
                    }
                }
            } else {
                try {
                    let { data } = await axios.post(`/api/Groups/UploadGroupMembersFile?groupId=${route.params.groupId}`, formData)
                    console.log(data)
                    ElMessage({
                        type: 'success',
                        message: data.response,
                        duration: 5000
                    })
                    emit("uploadtogroup", data.returnObject)
                }
                catch (err) {
                    finish()
                    console.log(err)
                    if (err.toString().toLowerCase().includes("network error")) {
                        ElMessage({
                            type: 'warning',
                            message: "Please ensure you have strong internet connection",
                            duration: 5000
                        })
                    } else if (err.toString().toLowerCase().includes("timeout")) {
                        ElMessage({
                            type: 'warning',
                            message: "Request took too long to respond, please refresh and try again",
                            duration: 5000
                        })
                    } else {
                        ElMessage({
                            type: 'warning',
                            message: "Upload not successful, please try again",
                            duration: 5000
                        })
                    }
                }
            }
        }

        const closeModal = () => {
            displayModal.value = false
        }

        const addToMembers = async () => {
            loading.value = true
            if(route.query.query === "importnewconvert" ){
                try{
                     let { data } = await axios.post("/api/People/AddNewConverts", memberData.value)
                        console.log(data, 'hhhjhk');
                        displayModal.value = false
                        loading.value = false
                        ElMessage({
                        type: 'success',
                        message: `${data.returnObject.createdRecord}`,
                        duration: 8000
                    })
                     router.push("/tenant/firsttimerslist")
                }
                catch (err){
                     loading.value = false
                    finish()
                    if (err.toString().toLowerCase().includes("network error")) {
                        ElMessage({
                            type: 'warning',
                            message: "Please ensure you have strong internet connection",
                            duration: 5000
                        })
                    } else if (err.toString().toLowerCase().includes("timeout")) {
                        ElMessage({
                            type: 'warning',
                            message: "Request took too long to respond, please refresh and try again",
                            duration: 5000
                        })
                    }
                    console.log(err)

                }

            } else if (route.query.query === "importpeople") {
                try {
                    let { data } = await axios.post("/api/People/CreatePeople", memberData.value)
                    displayModal.value = false
                    loading.value = false
                    store.dispatch('dashboard/getDashboard');
                    store.dispatch('membership/setMembers').then(() => {
                        router.push("/tenant/people")
                    })
                    ElMessage({
                        type: 'success',
                        message: `${data.returnObject.createdRecord}`,
                        duration: 8000
                    })
                }
                catch (err) {
                    loading.value = false
                    finish()
                    if (err.toString().toLowerCase().includes("network error")) {
                        ElMessage({
                            type: 'warning',
                            message: "Please ensure you have strong internet connection",
                            duration: 5000
                        })
                    } else if (err.toString().toLowerCase().includes("timeout")) {
                        ElMessage({
                            type: 'warning',
                            message: "Request took too long to respond, please refresh and try again",
                            duration: 5000
                        })
                    }
                    console.log(err)
                }
            } else {
                try {
                    let { data } = await axios.post("/api/People/CreateMultipleFirstTimer", memberData.value)
                    console.log(data)
                    displayModal.value = false
                    loading.value = false
                    store.dispatch('dashboard/getDashboard');
                    store.dispatch('membership/setFirstTimerData').then(() => {
                        router.push("/tenant/firsttimerslist")
                    })
                    ElMessage({
                        type: 'success',
                        message: `${data.returnObject.createdRecord}`,
                        duration: 8000
                    })
                }
                catch (err) {
                    finish()
                    loading.value = false
                    if (err.toString().toLowerCase().includes("network error")) {
                        ElMessage({
                            type: 'warning',
                            message: "Please ensure you have strong internet connection",
                            duration: 5000
                        })
                    } else if (err.toString().toLowerCase().includes("timeout")) {
                        ElMessage({
                            type: 'warning',
                            message: "Request took too long to respond, please refresh and try again",
                            duration: 5000
                        })
                    }
                    console.log(err)
                }
            }
        }

        const toggleInstruction = () => {
            addInstructionClass.value = !addInstructionClass.value
        }

        const getImportType = () => {
            console.log(route.query.query)
        }
        getImportType()

        return {
            imageSelected, image, uploadFile, memberData, addToMembers, closeModal, displayModal, addInstructionClass, toggleInstruction, loading, mdAndUp, lgAndUp, xlAndUp, uploadLoading, primarycolor
        }
    }
}
</script>

<style scoped>
.header {
    font: normal normal 800 29px Nunito sans;
}

.show-instruction {
    height: 825px;
    overflow: hidden;
    transition: all 1s ease-in-out
}

.hide-instruction {
    height: 0;
    overflow: hidden;
    transition: all 1s ease-in-out
}

.rollIcon {
    transform: rotateZ(180deg);
    transition: all 1s ease-in-out
}

.closeIcon {
    transform: rotateZ(0deg);
    transition: all 0.5s ease-in-out
}
</style>