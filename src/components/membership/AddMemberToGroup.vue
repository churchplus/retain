<template>
  <div class="row">
            <div class="col-md-12">
                <div class="row my-3">
                <div
                    class="col-md-4 text-right d-flex align-items-center justify-content-md-end"
                >
                    <label class="font-weight-600"
                    >Select Members</label
                    >
                </div>
                <div class="col-md-7">
                    <div class="row">
                    <div
                        class="col-md-12 pl-0 grey-rounded-border"

                    >
                        <ul
                        class="d-flex flex-wrap px-1 mb-0 m-dd-item"
                        @click="() => memberSelectInput.focus()"
                        >
                        <!-- <li
                            style="
                            list-style: none;
                            min-width: 100px;
                            "
                            v-for="(
                            member, indx
                            ) in selectedMembers"
                            :key="indx"
                            class="email-destination d-flex justify-content-between m-1"
                        >
                            <span>{{ member.name }}</span>
                            <span
                            class="ml-2 remove-email"
                            @click="removeMember(indx)"
                            >x</span
                            >
                        </li> -->
                        <li
                            style="
                            list-style: none;
                            width: 100%;
                            "
                            v-if="Object.keys(selectedMember).length > 0"
                            class="email-destination d-flex justify-content-between m-1"
                        >
                            <span>{{ selectedMember.name }}</span>
                            <span
                            class="ml-2 remove-email"
                            @click="removeMember(indx)"
                            >x</span
                            >
                        </li>
                        <li
                            style="list-style: none"
                            class="m-dd-item"

                        >
                            <input
                            type="text"
                            class="border-0 m-dd-item text outline-none w-100"
                            ref="memberSelectInput"
                            @input="searchForMembers"
                            autocomplete="off"
                            @focus="showMemberList"
                            @click="showMemberList"
                            v-model="searchText"
                            style="padding: 0.5rem"
                            placeholder="Select from members"
                            @blur="() => (inputBlurred = true)"
                            v-if="Object.keys(selectedMember).length === 0"
                            />
                        </li>
                        </ul>
                        <div
                        class="col-md-12 px-0 select-groups-dropdown m-dd-item"
                        v-if="memberListShown"

                        >
                        <div
                            class="dropdownmenu pt-0 w-100 m-dd-item"

                        >
                            <a
                            class="dropdown-item px-1 c-pointer m-dd-item"
                            v-for="(
                                member, index
                            ) in memberSearchResults"
                            :key="index"
                            @click="selectMember(member, index)"
                            >{{ member.nameResult }}</a
                            >

                            <!-- <p
                            class="bg-secondary p-1 mb-0 m-dd-item "
                            v-if="
                                invalidSearchText && !inputBlurred
                            "
                            >
                            Enter 3 or more characters


                            </p>  -->
                            <p

                            class="bg-secondary p-1 mb-0  "

                            >
                            Enter 3 or more characters

                            </p>
                            <!-- v-if="
                                    wardSearchString.length < 3 &&
                                    wardSearchedMembers.length === 0
                                " -->

                            <p
                            aria-disabled="true"
                            class="btn btn-default p-1 mb-0 disable m-dd-item"
                            v-if="
                                memberSearchResults.length ===
                                0 &&
                                searchText.length >= 3 &&
                                !loading
                            "
                            >
                            No match found
                            </p>
                            <p
                            class="btn btn-default p-1 mb-0 disable m-dd-item"
                            v-if="
                                loading && searchText.length >= 3
                            "
                            >
                            <i
                                class="fas fa-circle-notch fa-spin m-dd-item"
                            ></i>
                            </p>
                            <a
                            class="font-weight-bold small-text d-flex justify-content-center py-2  text-decoration-none primary-text c-pointer"
                            style="border-top: 1px solid #002044; color: #136acd"
                            @click="showAddMemberForm"
                            data-dismiss="modal"

                            >
                            <i
                                class="pi pi-plus-circle mr-2 primary-text d-flex align-items-center"
                                style="color: #136acd"
                            ></i>
                                Add new member
                            </a>
                        </div>

                        </div>

                    </div>
                    </div>
                </div>
                </div>
                <!-- End -->

                <!-- <div class="row mb-3">
                <div
                    class="col-md-4 text-right d-flex align-items-center justify-content-md-end"
                >
                    <label class="font-weight-600"
                    >Position in group</label
                    >
                </div>
                <div class="col-md-7 px-0">
                    <input
                    type="text"
                    class="form-control"
                    placeholder="e.g Member"
                    v-model="position"
                    />
                </div>
                </div> -->
                     
                <!-- <div class="row">
                    <div class="col-6 d-flex mt-2" v-if="true">
  
                        <label for="description" class="font-weight-600">
                        Is Group Leader
                        </label>
                        <Checkbox v-model="isGroupLeader" :binary="true" class="ml-3"/>
            
                    </div>

                    <div class="col-6 d-flex mt-2">
             
                        <label for="description" class="font-weight-600">
                        Enable Login
                        </label>
                        <Checkbox v-model="enableLogin" :binary="true" class="ml-3"/>
              
                    </div>
                </div> -->
        
            </div>
            </div>
            <div class="row mt-4 justify-content-end">
                <button
                    type="button"
                    class="default-btn cancel bg-white text-dark"
                    data-dismiss="modal"
                    >
                    Cancel
                    </button>

                    <button
                    class="primary-btn default-btn primary-bg border-0 outline-none"
                    @click="addMemberToGroup"
                    data-dismiss="modal"
                    >
                    Add member
                    </button>
            </div>
            
</template>

<script>
import { ref } from '@vue/reactivity'
import composeService from "../../services/communication/composer";
import { watchEffect } from '@vue/runtime-core';
import { useRoute } from "vue-router"
// import axios from "@/gateway/backendapi";
import attendanceservice from '../../services/attendance/attendanceservice';

export default {
    props: ["newPerson"],
    emits: ["reloadmembers"],
    setup (props, { emit }) {
        const route = useRoute()
        const selectedMember = ref({});
        const memberSelectInput = ref(null);
        const memberListShown = ref(false);
        const inputBlurred = ref(true);
        const memberSearchResults = ref([]);
        const searchText = ref("");
        const loading = ref(false);
        const position = ref("");
        const isGroupLeader = ref(false)
        const enableLogin = ref(false)
        const groupMembers = ref([])

        const showMemberList = () => {
            memberListShown.value = true;
            inputBlurred.value = false;
        };

        const searchForMembers = (e) => {
            if (e.target.value.length >= 3) {
                memberSearchResults.value = [];
                loading.value = true;
                composeService
                .searchMemberDB("/api/Membership/GetSearchedUSers", e.target.value)
                .then((res) => {
                    console.log(res, "res");
                    loading.value = false;
                    memberSearchResults.value = res
                });
            } else {
                memberSearchResults.value = [];
            }
        };

        const selectMember = (member, index) => {
            console.log(member, "member");
            selectedMember.value = member;
            memberSearchResults.value.splice(index, 1);
            searchText.value = "";
            memberListShown.value = false;
            memberSearchResults.value = [];
            };

         const removeMember = () => {
          selectedMember.value = new Object()
        };

        const showAddMemberForm = () => {
            emit("displayForm", true)
        };

        watchEffect(() => {
            if(props.newPerson && Object.keys(props.newPerson).length > 0) {
                let body = {
                    name: props.newPerson.personFirstName,
                    id: props.newPerson.personId,
                    email: props.newPerson.personEmail,
                    phoneNumber: props.newPerson.personNumber
                }
                selectedMember.value = body
        
            }
        })

        const addMemberToGroup = async() => {
            let data = {
                person: {
                    personId: selectedMember.value.id
                },
                checkInAttendanceID: route.params.id
            }
            console.log(data)

           try {
                let  res  = await attendanceservice.checkin(data);
                console.log(res)
                emit("reloadmembers")
                selectedMember.value = new Object()
           }
           catch (err) {
               console.log(err)
           }
        }


        return {
            selectedMember,
            memberSelectInput,
            showMemberList,
            memberListShown,
            inputBlurred,
            memberSearchResults,
            searchText,
            loading,
            isGroupLeader,
            position,
            enableLogin,
            searchForMembers,
            groupMembers,
            selectMember,
            removeMember,
            showAddMemberForm,
            addMemberToGroup
        }
    }
}
</script>

<style scoped>
.email-destination {
  padding: 0.1rem 0.4rem;
  border: 1px solid #02172e0d;
  border-radius: 8px;
  background: #02172e14;
}

.remove-email {
  color: #000;
  font-weight: bold;
}

.remove-email:hover {
  cursor: pointer;
}
</style>