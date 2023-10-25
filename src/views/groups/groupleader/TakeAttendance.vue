<template>
   <div class="container container-top">
        <div class="row d-flex justify-content-center justify-content-sm-between">
          <div class="col-12 col-sm-6 page-header text-center text-sm-left">Mark attendance</div>
          <div class="default-btn mt-3 mt-sm-0 c-pointer" ref="modalBtn" data-toggle="modal" data-target="#addMemberModal">Add member</div><!-- //setDisplayForm -->
          
        </div>
        <div class="row mt-5 box-boundary">
            <div class="col-12 border-bottom"> 
                <div class="row p-3">
                    <div class="input-group mb-3">
                        <input type="text" class="form-control w-25"  placeholder="Search for group member by name" v-model="searchText">
                        <div class="input-group-append">
                            <span class="input-group-text"><i class="pi pi-search"></i></span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12">
                <div class="row border-bottom p-3">
                    <div class="col-8 font-weight-700">Name</div>
                    <div class="col-4 font-weight-700">Mark</div>
                </div>
                <div class="row p-3" v-for="item in searchMembers" :key="item.id">
                    <div class="col-8 mt-2">{{ item.name }}</div>
                    <div class="col-4 mt-2">
                        <Checkbox id="binary" v-model="item.isPresent" :binary="true" @change="markAttendance(item)"/>
                    </div>
                </div>
                <div class="row my-3" v-if="searchMembers.length == 0 && loading">
                    <div class="col-12 text-center">
                        <i class="pi pi-spin pi-spinner primary-text" style="fontSize: 3rem"></i>
                    </div>
                </div>
                <div class="row my-3" v-if="searchMembers.length == 0 && !loading && !searchText">
                    <div class="col-12 text-center font-weight-700">
                        <div class="mt-3">There are no members in this group yet, start by adding members</div>
                        <div class="mt-3 default-btn border-0 text-white primary-bg" data-toggle="modal" data-target="#addMemberModal" ref="modalBtn">Add member</div>
                    </div>
                </div>
                <div class="row my-3" v-if="searchMembers.length == 0 && !loading && searchText">
                    <div class="col-12 text-center font-weight-700">
                        <div class="mt-3">There is no member in this group with that name</div>
                    </div>
                </div>
            </div>
        </div>

        <AttendanceCheckinUpdate :contributionItems="contributionItems" :attendanceType="attendanceType" :groupDetail="groupDetail"/>
        <!-- <div class="row mt-5 border box-boundary py-3 c-pointer" v-if="contributionItems.length > 0" data-toggle="collapse" data-target="#collapseExampleOffering">
            <div class="col-6 font-weight-700" style="font-size: 1.5em">
                Contributions
            </div>
            <div class="col-6 text-right align-self-center">
                <i class="pi pi-chevron-down"></i>
            </div>
        </div>
        <div class="row mt-4 p-3">
            <div class="col-12">
                <div class="collapse" id="collapseExampleOffering">
                <div class="box-boundary card-body py-5">
                    <div class="col-12 py-2 border-top" v-for="item in churchContributionItems" :key="item.id">
                        <div class="row">
                            <div class="col-md-8 mt-3 align-self-center font-weight-700">{{ item.name }}</div>
                            <div class="col-md-4 mt-3 mt-md-0">
                                <input type="text" class="form-control" placeholder="amount" v-model="item.amount"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
        <div class="row mt-3 border box-boundary py-3 c-pointer"  data-toggle="collapse" data-target="#collapseExampleAttendance" v-if="attendanceType.length > 0" @click="toggleAttendance">
            <div class="col-10 font-weight-700" style="font-size: 1.5em">
                Summary attendance
            </div>
            <div class="col-2 text-right align-self-center">
                <i class="pi pi-chevron-down"></i>
            </div>
        </div>
        <div class="row  mt-4">
            <div class="col-12">
                <div class="collapse" id="collapseExampleAttendance">
                <div class="box-boundary card-body py-5">
                    <div class="col-12 py-2 border-top" v-for="item in churchAttendanceCategory" :key="item.id">
                    <div class="row">
                        <div class="col-md-8 mt-3 align-self-center font-weight-700">{{ item.name }}</div>
                        <div class="col-md-4 mt-3 mt-md-0">
                            <input type="text" class="form-control" placeholder="Enter count" v-model="item.number"/>
                        </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        <div class="row mt-2">
            <textarea class="form-control" rows="5" placeholder="Enter your note here" v-model="note"></textarea>
        </div>
        <div class="row d-flex justify-content-center justify-content-md-end my-4">
            <div class="default-btn primary-bg border-0 text-white text-center" @click="updateAttendanceCheckin">Save</div>
        </div> -->
   </div>

   <div
    class="modal fade"
    id="addMemberModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    >
    <div class="modal-dialog" role="document" ref="modal">
        <div class="modal-content pr-2">
        <div class="modal-header py-3">
            <h5
            class="modal-title font-weight-700"
            id="exampleModalLabel"
            >
            Group membership
            </h5>
            <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
            
            >
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <AddToGroup @displayForm="setDisplayForm" :newPerson="newPerson" @reloadmembers="reloadMembers"/>
        </div>
        <!-- <div class="modal-footer mb-2">
            
        </div> -->
        </div>
    </div>
    </div>
    <Dialog 
        header="Create New Member"
        v-model:visible="display"
        :style="{ width: '70vw', maxWidth: '600px' }"
        :modal="true"
        position="top"
        >
        <div class="row">
            <div class="col-md-12">
            <NewPerson @cancel="() => display = false" @person-id="setNewPerson($event)"  @show-group-modal="setGroupModal" />
            </div>
        </div>
    </Dialog>
    <Toast />
</template>

<script>
import { ref, computed } from '@vue/reactivity'
import axios from "@/gateway/backendapi";
import AddToGroup from "../../../components/membership/AddMemberToGroup.vue"
import Dialog from "primevue/dialog";
import NewPerson from '../component/AddNewMemberToGroup.vue';
import { useRoute } from 'vue-router'
import attendanceservice from '../../../services/attendance/attendanceservice';
import { useToast } from "primevue/usetoast";
// import router from '../../../router';
import AttendanceCheckinUpdate from "../../../components/attendance/updateAttendanceChekin.vue"
// import grousService from '../../../services/groups/groupsservice';
export default {
    components: {
        AddToGroup,
        Dialog,
        NewPerson,
        AttendanceCheckinUpdate
    },
    setup () {
        const contributionItems = ref([])
        const attendanceType = ref([])
        const display = ref(false)
        const modalBtn = ref(null);
        const newPerson = ref({})
        const route = useRoute()
        const toast = useToast()
        const groupDetail = ref({})
        const searchText = ref("")
        const loading = ref(false)
        const showOfferings = ref(false)
        // const showAttendance = ref(false)
        // const note = ref("")

        const getContributionsItem = async() => {
            try {
                let { data } = await axios.get("/api/Financials/Contributions/Items")
                contributionItems.value = data
                console.log(data)
            }
            catch (err) {
                console.log(err)
            }
        }
        getContributionsItem() 
       
       const getAttendanceType = async() => {
            try {
                let { data } = await axios.get("/GetAttendanceType")
                console.log(data)
                attendanceType.value = data
            }
            catch (err) {
                console.log(err)
            }
        }
        getAttendanceType() 

        const setGroupModal = () => {
            modalBtn.value.click()
        }

        const setDisplayForm = (payload) => {
            display.value = payload
        }

        const setNewPerson = (payload) => {
            newPerson.value = payload
        }

        const getGroupDetails = async() => {
            loading.value = true
            try {
                // let data = await grousService.getGroupById(route.query.groupId)
                let data = await attendanceservice.getReport(route.params.id)
                console.log(data)
                groupDetail.value = data

                console.log(contributionItems.value)
                loading.value = false
            }
            catch (err) {
                console.log(err)
                loading.value = false
            }
        }
        getGroupDetails()

        // const churchContributionItems = computed(() => {
        //      if (groupDetail.value && groupDetail.value.offerings && groupDetail.value.offerings.length > 0 && contributionItems.value.length > 0) return contributionItems.value.map(i => {
        //                 const y = groupDetail.value.offerings.findIndex(j => j.financialContributionID == i.id)
        //                 if (y >= 0) {
        //                     i.amount = groupDetail.value.offerings[y].amount
        //                     i.contributionAttendanceID = groupDetail.value.offerings[y].id
        //                 }
        //                 return i
        //         })
                
        //     return contributionItems.value
        // })
        
        // const churchAttendanceCategory = computed(() => {
        //     if (groupDetail.value && groupDetail.value.attendances && groupDetail.value.attendances.length > 0 && attendanceType.value.length > 0) return attendanceType.value.map(i => {
        //                 const y = groupDetail.value.attendances.findIndex(j => j.attendanceTypeID == i.id)
        //                 console.log(y, groupDetail.value.attendances[y].number)
        //                 if (y >= 0) {
        //                     i.number = groupDetail.value.attendances[y].number
        //                     i.attendanceTypeAttendanceID = groupDetail.value.attendances[y].id
        //                 }
        //                 return i
        //         })
        //     return attendanceType.value
        // })

        const searchMembers = computed(() => {
            if (groupDetail.value && groupDetail.value && groupDetail.value.peopoleAttendancesDTOs && groupDetail.value.peopoleAttendancesDTOs.length > 0 && searchText.value == "") return groupDetail.value.peopoleAttendancesDTOs
            return groupDetail.value && groupDetail.value.peopoleAttendancesDTOs && groupDetail.value.peopoleAttendancesDTOs ? groupDetail.value.peopoleAttendancesDTOs.filter(i => i.name.toLowerCase().includes(searchText.value.toLowerCase())) : []
        })

        const markAttendance = async(item) => {
            console.log(item);
                let body = {
                    checkInAttendanceID: route.params.id,
                    personAttendanceID: item.id
                }
            try {
                let data = await attendanceservice.checkin(body)
                toast.add({
                    severity: "success",
                    summary: "Success",
                    detail: data,
                    life: 5000,
                    });
            }
            catch (err) {
                console.log(err)
            }
        }

        const reloadMembers = () => {
            toast.add({
                severity: "success",
                summary: "Group Updated",
                detail: "Member updated and checkedin successfully",
                life: 5000,
            });
            getGroupDetails()
        }

        // const toggleOffering = () => {
        //     showOfferings.value = !showOfferings.value
        // }
        
        // const toggleAttendance = () => {
        //     showAttendance.value = !showAttendance.value
        // }

        // const updateAttendanceCheckin = async() => {
        //     let body = {
        //         eventName: groupDetail.value.eventName,
        //         eventDate: groupDetail.value.eventDate,
        //         details: groupDetail.value.details,
        //         status: groupDetail.value.status,
        //         title: groupDetail.value.title,
        //         bannerImage: groupDetail.value.bannerImage,
        //         id: groupDetail.value.id,
        //         offerings: contributionItems.value.map(i => {
        //         return {
        //                 id: i.contributionAttendanceID,
        //                 financialContributionID: i.id,
        //                 amount: i.amount ? Number(i.amount) : 0
        //             }
        //         }),
        //         attendances: attendanceType.value.map(i => {
        //         return {
        //                 id: i.attendanceTypeAttendanceID,
        //                 attendanceTypeID: i.id,
        //                 number: i.number ? Number(i.number) : 0
        //             }
        //         }),
        //         note: note.value
        //     }
        //     console.log(body)
        //     try {
        //         let data = await axios.put("/api/CheckInAttendance/UpdateCheckInAttendance", body)
        //         console.log(data)
        //         toast.add({
        //             severity: "success",
        //             summary: "Success",
        //             detail: "Saved successfully",
        //             life: 5000,
        //             });
        //             setTimeout(() => {
        //                 router.push("/tenant/groupleader")         
        //             }, 3000);
        //     }
        //     catch (err) {
        //         console.log(err)
        //     }
        // }

        

        return {
            contributionItems,
            display,
            modalBtn,
            setGroupModal,
            setDisplayForm,
            setNewPerson,
            newPerson,
            groupDetail,
            searchMembers,
            searchText,
            markAttendance,
            loading,
            reloadMembers,
            // toggleOffering,
            showOfferings,
            // toggleAttendance,
            // showAttendance,
            attendanceType,
            // updateAttendanceCheckin,
            // note,
            // churchContributionItems,
            // churchAttendanceCategory
        }
    }
}
</script>

<style scoped>
.page-header {
    font: normal normal 800 29px Nunito sans;
}

.box-boundary {
    /* box-shadow: 0px 3px 6px #2c28281c; */
    /* border: 1px solid #00204424; */
    /* box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset; */
    /* width: 100%; */
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
}

.show-offering {
    height: auto;
}

.hide-offering {
    display: none;
    /* height: 0;
    overflow: hidden; */
}
</style>