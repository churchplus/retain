<template>
    <div class="container ward-table-wrapper">
        <div class="row my-3">
            <div class="col-md-10 mx-auto d-flex justify-content-end">
                <button class="default-btn font-weight-bold border primary-text add-ward-btn c-pointer" ref="showModal"
                    data-toggle="modal" data-target="#addWard">Add ward</button>
            </div>
        </div>
        <div class="row th py-2" v-if="family && family.familyMembers && family.familyMembers.length > 0">
            <div class="offset-1 col-1">
            </div>
            <div class="col-5">
                <span class="py-2 font-weight-700">Name</span>
            </div>
            <div class="col-4">
                <span class="py-2 font-weight-700">Relationship</span>
            </div>
            <div class="col-md-1">
            </div>
        </div>
        <div v-else class="text-center border-top py-4 increase-font">
            When you add wards, they will show up here
        </div>

        <div class="row py-2" v-for="(member, index) in family.familyMembers" :key="index">
            <div class="offset-1 col-1">
                <el-checkbox v-model="member.checkMember" size="large" />
            </div>
            <div class="col-5 align-self-center">
                <span class="py-2">{{ member.person ? member.person.firstName : "" }} {{ member.person &&
                    member.person.lastName ? member.person.lastName : "" }}</span>
            </div>
            <div class="col-3 align-self-center">
                {{ memberRoles.find(i => i.id === member.familyRoleID).name }}
            </div>
            <div class="col-1 align-self-center" @click="showConfirmModal(member.id, index)">
            </div>
        </div>
    </div>
    <div class="modal fade" id="addWard" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered " role="document">
            <div class="modal-content">
                <div class="modal-header py-4">
                    <h4 class="modal-title font-weight-bold" id="exampleModalLabel">Add New Ward</h4>
                    <button type="button" ref="close" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true"><i class="pi pi-times"></i>
                        </span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row pb-3">
                        <div class="col-sm-12 align-self-center">Name <span class="text-danger">*</span></div>
                        <div class="col-sm-12">
                            <el-input type="text" v-model="memberName" placeholder="Enter your name" />
                        </div>

                        <div class="col-sm-12 align-self-center mt-3">Phone Number</div>
                        <div class="col-sm-12">
                            <el-input type="text" v-model="memberPhone" placeholder="Enter phone number" />
                            <div class="small-text mt-1"><span class="font-weight-700">Note</span>: <em>Phone number is
                                    optional</em></div>
                        </div>

                        <div class="col-sm-12 align-self-center mt-3">Relationship</div>
                        <el-dropdown trigger="click" class="col-12">
                            <div class="d-flex justify-content-between border-contribution text-dark w-100" size="large">
                                <span>{{ roleId.name ? roleId.name : 'Select role' }} </span>
                                <div>
                                    <el-icon class="el-icon--right">
                                        <arrow-down />
                                    </el-icon>
                                </div>
                            </div>
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item v-for="(item, index) in memberRoles" :key="index">
                                        <a class="no-decoration text-dark" @click="selectRoleId(item)"> {{ item.name }}
                                        </a>
                                    </el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                    </div>
                    <div class="col-12">
                        <div class="row d-flex justify-content-end">
                            <el-button class="mr-2 secondary-button" data-dismiss="modal" round>Cancel</el-button>
                            <el-button :color="primarycolor" data-dismiss="modal" @click="createPerson"
                                round>Save</el-button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, inject } from "vue"
import { watchEffect } from '@vue/runtime-core'
import axios from "@/gateway/backendapi";
import { ElMessage, ElMessageBox } from "element-plus";
export default {
    props: ['family', 'memberRoles', 'showWardModal', 'fullEventData'],
    emits: ['newmember', 'nofamilynewmember'],
    setup(props, { emit }) {
        const primarycolor = inject('primarycolor')
        const showModal = ref("")
        const memberName = ref("")
        const memberPhone = ref("")
        const roleId = ref({})
        watchEffect(() => {
            if (props.showWardModal) {
                showModal.value.click()
            }
        })
        const selectRoleId = (item) => {
            roleId.value = item
        }

        const createPerson = () => {
            if (props.family.id) {
                const createPerson = {
                    firstName: memberName.value,
                    mobilePhone: memberPhone.value,
                    tenantId: props.fullEventData.tenantID
                }
                try {
                    return new Promise((resolve, reject) => {
                        axios.post("/createPublicPerson", createPerson)
                            .then(res => {
                                console.log(res)
                                if (res && res.data && res.data.status === true) {
                                    ElMessage({
                                        type: "success",
                                        message: "Ward Created Sucessfully",
                                        duration: 3000
                                    });
                                } else {
                                    ElMessage({
                                        type: "warning",
                                        message: res.data.response,
                                        duration: 3000
                                    });
                                }

                                resolve(res.data);
                                let newPerson = {
                                    name: res.data.returnObject.firstName,
                                    id: res.data.returnObject.id,
                                    checkMember: true
                                }
                                addMembers(newPerson)
                            })
                            .catch(error => {
                                console.log(error)
                                if (error.response) {
                                    reject(error.response);
                                } else {
                                    reject(error);
                                }
                            })
                    })

                } catch (error) {
                    console.log(error);
                }
            } else {
                const createPerson = {
                    firstName: memberName.value,
                    mobilePhone: memberPhone.value,
                    tenantId: props.fullEventData.tenantID
                }
                try {
                    return new Promise((resolve, reject) => {
                        axios.post("/createPublicPerson", createPerson)
                            .then(res => {
                                console.log(res)
                                if (res && res.data && res.data.status === true) {
                                    ElMessage({
                                        type: "success",
                                        message: "Ward Created Sucessfully",
                                        duration: 3000
                                    });
                                } else {
                                    ElMessage({
                                        type: "warning",
                                        message: res.data.response,
                                        duration: 3000
                                    });
                                }
                                resolve(res.data);
                                let newPerson = {
                                    name: res.data.returnObject.firstName,
                                    personId: res.data.returnObject.id,
                                    familyRoleId: roleId.value.id,
                                    checkMember: true
                                }
                                emit('nofamilynewmember', newPerson)

                                memberPhone.value = ""
                                memberName.value = ""
                                roleId.value = {}

                            })
                            .catch(error => {
                                console.log(error)
                                if (error.response) {
                                    reject(error.response);
                                } else {
                                    reject(error);
                                }
                            })
                    })

                } catch (error) {
                    console.log(error);
                }
            }
        }

        const addMembers = async (personDetails) => {
            let memberDetails = {
                familyId: props.family.id,
                familyRoleId: roleId.value.id,
                personId: personDetails.id,
                tenantId: props.fullEventData.tenantID
            }
            try {
                let { data } = await axios.post('/addFamilyMember', memberDetails)
                console.log(data)
                let newMember = {
                    person: {
                        firstName: memberName.value,
                        phone: memberPhone.value
                    },
                    familyRoleID: roleId.value.id,
                    checkMember: true
                }
                emit('newmember', newMember)
            }
            catch (error) {
                console.log(error)
            }
        }

        return {
            showModal,
            selectRoleId,
            memberPhone,
            memberName,
            createPerson,
            addMembers,
            roleId,
            primarycolor
        }
    }
}
</script>

<style  scoped>
.th {
    background: #DDE2E6 0% 0% no-repeat padding-box;
}

.scroll {
    max-height: 200px;
    overflow-y: scroll;
    overflow-x: hidden;
}

.ward-table-wrapper {
    background: #FFFFFF 0% 0% no-repeat padding-box;
    border: 1px solid #DDE2E6;
    border-radius: 30px;
    opacity: 1;
}

.add-ward-btn {
    border: 1px solid #2E67CE !important;
}

.member-image {
    height: 60px;
    width: 60px;
    border-radius: 50%;
}

.increase-font {
    font-size: 1.1em
}
</style>