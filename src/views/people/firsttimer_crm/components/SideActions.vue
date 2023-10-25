<template>
    <div class="container">
        <div class="row mt-5">
            <div class="col-6 offset-3 d-flex justify-content-center c-pointer profile-overlay" @click="uploadPicture"
                @mouseover="setHover" @mouseleave="setLeave">
                <img :src="url" class="contact-image " v-if="url" />
                <img :src="personDetails.pictureUrl" class="contact-image " v-else-if="personDetails.pictureUrl" />
                <img src="../../../../assets/people/phone-import.svg" class="contact-image" v-else />
                <i class="pi pi-upload" :class="{ 'adjust-icon': !hoverImage, 'fade-icon': hoverImage }"></i>

            </div>
            <input type="file" @change="choosePicture" ref="image" hidden />
            <div class="col-12 text-center">
                <div class="contact-name">{{ `${personDetails.firstName ? personDetails.firstName : ""}
                                    ${personDetails.lastName ? personDetails.lastName : ""}`
                }}</div>
                <div>{{ personDetails.email }}

                    <el-popover placement="bottom" title="Update name" :width="370" trigger="click"
                        content="this is content, this is content, this is content">
                        <template #reference>
                            <el-icon class="uniform-primary-color c-pointer">
                                <Edit />
                            </el-icon>
                        </template>
                        <div class="row">
                            <div class="col-12 mt-3">
                                <div class="row">
                                    <div class="col-6">
                                        First Name
                                        <div class="mt-2">
                                            <el-input type="text" v-model="personDetails.firstName" />
                                        </div>
                                    </div>

                                    <div class="col-6">
                                        Last Name
                                        <div class="mt-2">
                                            <el-input type="text" v-model="personDetails.lastName" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="offset-1 p-2 col-2 mt-3 ml-3 save-btn btn-btn c-pointer" @click="editBasicDetails">
                                Save
                            </div>
                        </div>
                    </el-popover>
                </div>
            </div>
        </div>
        <div class="row  d-flex justify-content-center mt-5">
            <el-tooltip class="box-item" effect="dark" content="Create a note" placement="top-start">
                <div @click="openNoteEditor" class="c-pointer text-center">
                    <div class="icon-bg"><el-icon>
                            <Notebook />
                        </el-icon></div>
                    <div>Note</div>
                </div>
            </el-tooltip>
            <el-tooltip class="box-item" effect="dark" content="Create an email" placement="top-start">
                <div class="ml-2 ml-sm-3 text-center" @click="openEmailModal">
                    <div class="icon-bg c-pointer"><el-icon>
                            <Message />
                        </el-icon></div>
                    <div>Email</div>
                </div>
            </el-tooltip>
            <el-tooltip class="box-item" effect="dark" content="Send an SMS" placement="top-start">
                <div class="ml-2 ml-sm-3 c-pointer text-center" @click="toggleCallSmsPane($event)">
                    <div class="icon-bg"><img src="../../../../assets/sms-svgrepo-com.svg" style="width: 17px" /></div>
                    <div>SMS</div>
                </div>
            </el-tooltip>
            <el-tooltip class="box-item" effect="dark" content="Create a task" placement="top-start">
                <div class="ml-2 ml-sm-3 c-pointer text-center" @click="openTaskEditor">
                    <div class="icon-bg"><el-icon>
                            <Tickets />
                        </el-icon></div>
                    <div>Task</div>
                </div>
            </el-tooltip>
            <div class="ml-2 ml-sm-3 c-pointer text-center">
                <el-dropdown trigger="click">
                    <span class="el-dropdown-link primary--text">
                        <el-tooltip class="box-item" effect="dark" content="Log activity performed" placement="top-start">
                            <div class="icon-bg"><el-icon>
                                    <Plus />
                                </el-icon></div>
                        </el-tooltip>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item v-for="(item, index) in activityLogs" :key="index"
                                @click="toggleLogPane(item)">{{ item.value }}</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
                <div>Log</div>

            </div>
        </div>
    </div>
    <hr class="mt-4" />
    <div class="container mt-4">
        <div class="row">
            <div class="col-12">
                <el-icon :class="{ 'unroll-icon': !contactIcon, 'roll-icon': contactIcon }" @click="toggleContactIcon"
                    class="el-icon--right uniform-primary-color"><arrow-up /></el-icon>
                &nbsp;&nbsp;&nbsp;&nbsp;<span class="font-weight-700">About This
                    Contact</span>
            </div>
        </div>
        <el-collapse-transition>
            <div v-show="contactIcon">
                <div class="row mt-4">
                    <div class="col-12 label-text">Email</div>
                    <div class="col-12 mt-2 ">
                        <el-popover placement="bottom" title="Update email" :width="370" trigger="click">
                            <template #reference>
                                <div class="task-border border-transparent d-flex justify-content-between p-2"
                                    :class="{ 'hover-border': hoverTask }" @mouseover="onHoverBorder"
                                    @mouseleave="outHoverBorder">
                                    <div>{{ personDetails.email }}</div>
                                    <el-icon class="align-self-center uniform-primary-color"
                                        :class="{ 'text-white': !hoverTask }">
                                        <Edit />
                                    </el-icon>
                                </div>
                            </template>
                            <div class="row">
                                <div class="col-12">
                                    <div>Email</div>
                                    <el-input v-model="personDetails.email" class="mt-3" />
                                </div>
                            </div>
                            <div class="row">
                                <div class="offset-1 p-2 col-2 mt-3 ml-3 save-btn btn-btn c-pointer"
                                    @click="editBasicDetails">Save
                                </div>
                            </div>
                        </el-popover>

                    </div>
                </div>
                <div class="row mt-4">
                    <div class="col-12 label-text">Phone Number</div>
                    <div class="col-12 mt-2 ">
                        <el-popover placement="bottom" title="Update email" :width="370" trigger="click"
                            content="this is content, this is content, this is content">
                            <template #reference>
                                <div class="task-border border-transparent d-flex justify-content-between p-2"
                                    :class="{ 'hover-border': hoverPhone }" @mouseover="toggleHoverPhone"
                                    @mouseleave="OutHoverPhone">
                                    <div>{{ personDetails.phoneNumber }}</div>
                                    <el-icon class="align-self-center uniform-primary-color"
                                        :class="{ 'text-white': !hoverPhone }">
                                        <Edit />
                                    </el-icon>
                                </div>
                            </template>
                            <div class="row">
                                <div class="col-12">
                                    <div>Phone Number</div>
                                    <el-input v-model="personDetails.phoneNumber" class="mt-3" />
                                </div>
                            </div>
                            <div class="row">
                                <div class="offset-1 p-2 col-2 mt-3 ml-3 save-btn btn-btn c-pointer"
                                    @click="editBasicDetails">Save
                                </div>
                            </div>
                        </el-popover>

                    </div>
                </div>
                <div class="row">
                    <div class="col-12 mt-4 label-text">Contact owner</div>
                    <div class="col-12 mt-2">
                        <SearchMember v-bind:currentMember="selectedContact" @memberdetail="updateOwner($event, 1)"
                            :stylesidebarinput="true" :clearPersonValue="clearPersonValue"
                            @resetclearpersonvalue="resetClearPersonValue" />
                        <div @click="updateOwner($event, 2)" class="text-danger remove-contact mt-2 c-pointer"
                            v-if="Object.keys(selectedContact).length > 0 && selectedContact.id !== null || hasContactOwner">
                            Remove contact owner</div>
                    </div>
                </div>

                <div class="row" v-if="route.query.memberType == 0">
                    <div class="col-12 mt-4 label-text">Lifecycle stage</div>
                    <div class="col-12">
                        <!-- <div class="dropdown">
                                <div class="phone-input form-control d-flex justify-content-between c-pointer"
                                    id="dropdownMenuButton" data-toggle="dropdown">
                                    <div>{{ selectedLifeCycle && Object.keys(selectedLifeCycle).length > 0 ?
                                            selectedLifeCycle.name : "Select lifecycle"
                                    }}</div>
                                    <i class="pi pi-chevron-down"></i>
                                </div>
                                <div class="dropdown-menu w-100 dropdown-height border-0"
                                    aria-labelledby="dropdownMenuButton">
                                    <a class="dropdown-item c-pointer" v-for="(item, index) in lifeCycle" :key="index" @click="updateLifeCycle(item)">{{ item.name }}</a>
                                    <a class="dropdown-item font-weight-bold small-text d-flex justify-content-center py-2 text-decoration-none primary-text c-pointer"
                                        style="border-top: 1px solid rgb(0, 32, 68); color: rgb(19, 106, 205);"
                                        data-toggle="modal" data-target="#convertToMemberModal">Convert to member</a>
                                    
                                </div>
                            </div> -->
                        <el-dropdown class="w-100" trigger="click">
                            <div class="w-100 p-2 mt-2 phone-input d-flex justify-content-between c-pointer">
                                <div>{{ selectedLifeCycle && Object.keys(selectedLifeCycle).length > 0 ?
                                    selectedLifeCycle.name : "Select lifecycle"
                                }}</div>
                                <el-icon class="el-icon--right"><arrow-down /></el-icon>
                            </div>
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item v-for="(item, index) in lifeCycle" :key="index"
                                        @click="updateLifeCycle(item)">{{ item.name }}</el-dropdown-item>
                                    <el-dropdown-item data-toggle="modal" data-target="#convertToMemberModal"
                                        class="font-weight-700" divided>Convert to member</el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                    </div>
                </div>
                <div class="row" v-if="route.query.memberType == 0">
                    <div class="col-12 label-text mt-4">Lead Status</div>
                    <div class="col-12 mt-2">
                        <el-select-v2 v-model="leadStatusId"
                            :options="leadStatus.map(i => ({ label: i.name, value: i.id }))" placeholder="Select status"
                            size="large" class="phone-input w-100" @change="updateLeadStatus" />
                    </div>
                </div>
            </div>
        </el-collapse-transition>
    </div>
    <div class="container">
        <div class="row">
            <div class="col-12 mt-4 font-weight-700">
                <el-icon :class="{ 'unroll-icon': !moreIcon, 'roll-icon': moreIcon }" @click="toggleMoreIcon"
                    class="el-icon--right uniform-primary-color"><arrow-up /></el-icon>
                &nbsp;&nbsp;&nbsp;&nbsp;More
            </div>
            <el-collapse-transition>
                <div v-show="moreIcon">
                    <div class="col-12">
                        <div class="row">
                            <div class="col-12 mt-4 label-text">Gender</div>
                            <div class="col-12 mt-2">
                                <el-select-v2 v-model="genderId"
                                    :options="genders.map(i => ({ label: i.value, value: i.id }))"
                                    placeholder="Select option" size="large" class="phone-input w-100"
                                    @change="updateSelectedGender" />
                            </div>
                            <div class="col-12 mt-4 label-text">Marital Status</div>
                            <div class="col-12 mt-2">
                                <el-select-v2 v-model="maritalStatusId"
                                    :options="maritalStatus.map(i => ({ label: i.value, value: i.id }))"
                                    placeholder="Select option" size="large" class="phone-input w-100"
                                    @change="updateSelectedMaritalStatus" />
                            </div>
                            <div class="col-12 mt-4 label-text">Date of birth</div>
                            <div class="col-4 p-0 mt-2">
                                <el-select-v2 v-model="selectedBirthday" :options="day.map(i => ({ label: i, value: i }))"
                                    placeholder="Select option" size="large" class="phone-input w-100" />
                            </div>
                            <div class="col-4 p-0 mt-2">
                                <el-select-v2 v-model="selectedBirthMonth"
                                    :options="month.map(i => ({ label: i, value: i }))" placeholder="Select option"
                                    size="large" class="phone-input w-100" />
                            </div>
                            <div class="col-4 p-0 mt-2">
                                <el-select-v2 v-model="selectedBirthYear" :options="year.map(i => ({ label: i, value: i }))"
                                    placeholder="Select option" size="large" class="phone-input w-100" />
                            </div>
                            <div class="col-12 mt-4 label-text">Address</div>
                            <div class="col-12 mt-2">


                                <el-popover placement="bottom" title="Update address" :width="370" trigger="click"
                                    content="this is content, this is content, this is content">
                                    <template #reference>
                                        <div class="task-border border-transparent d-flex justify-content-between p-2"
                                            :class="{ 'hover-border': hoverPhone }" @mouseover="toggleHoverPhone"
                                            @mouseleave="OutHoverPhone" @click="editAddress">
                                            <div>{{ personDetails.address }}</div>
                                            <el-icon class="uniform-primary-color c-pointer"
                                                :class="{ 'uniform-primary-color': hoverTask, 'text-white': !hoverPhone }">
                                                <Edit />
                                            </el-icon>
                                        </div>
                                    </template>
                                    <div class="row">
                                        <div class="col-12">
                                            <div>Address</div>
                                            <el-input v-model="personDetails.address" class="mt-3" />
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="offset-1 p-2 col-2 mt-3 ml-3 save-btn btn-btn c-pointer"
                                            @click="editBasicDetails">Save
                                        </div>
                                    </div>
                                </el-popover>

                            </div>
                            <div class="col-12 mt-4 label-text" v-if="route.query.memberType == 0">Event of service
                                attended
                            </div>
                            <div class="col-12 mt-2" v-if="route.query.memberType == 0">
                                <el-dropdown trigger="click" class="w-100">
                                    <span class="el-dropdown-link w-100">
                                        <div class="phone-input py-2 w-100 d-flex justify-content-between">
                                            <div>{{ Object.keys(selectedEventAttended).length > 0 ?
                                                selectedEventAttended.name :
                                                personDetails.activityID && eventsAttended.length > 0 ?
                                                    eventsAttended.find(i => {
                                                        if (i.activityID == personDetails.activityID) return i
                                                        return 'no id'
                                                    }).name : "Select event attended"
                                            }}</div>
                                            <el-icon class="el-icon--right"><arrow-down /></el-icon>
                                        </div>
                                    </span>
                                    <template #dropdown>
                                        <el-input class="w-100" v-model="eventsSearchString" placeholder="Search event" />
                                        <el-dropdown-menu>

                                            <el-dropdown-item v-for="(event, index) in filteredEvents" :key="index"
                                                @click="eventAttendedSelected(event)">{{ event.name
                                                }}</el-dropdown-item>
                                            <el-dropdown-item
                                                v-if="eventsSearchString && eventsAttended.length > 0 && filteredEvents.length === 0"
                                                disabled>No match found</el-dropdown-item>
                                        </el-dropdown-menu>
                                    </template>
                                </el-dropdown>
                            </div>
                        </div>
                        <div class="row" v-for="(item, index) in dynamicCustomFields" :key="index">
                            <div class="col-12 mt-4 label-text" v-if="route.query.memberType == 0">{{ item.label }}
                                attended
                            </div>
                            <div class="col-12 mt-2" v-if="route.query.memberType == 0">
                                <el-select-v2 v-model="item.data"
                                    :options="item.parameterValues.split(',').map(i => ({ label: i, value: i }))"
                                    :placeholder="item.label" size="large" class="phone-input"
                                    v-if="(item.controlType == 1)" />
                                <el-input type="text" class="phone-input" v-model="item.data" :placeholder="item.label"
                                    v-if="(item.controlType == 0)" />
                                <el-input type="number" class="phone-input" v-model="item.data" :placeholder="item.label"
                                    v-if="(item.controlType == 7)" />
                                <el-input type="email" class="phone-input" v-model="item.data" :placeholder="item.label"
                                    v-if="(item.controlType == 4)" />
                                <div class="phone-input" v-if="(item.controlType == 2)">
                                    <el-checkbox v-model="item.data" size="large" />
                                </div>
                                <el-date-picker v-model="item.data" class="phone-input" type="date"
                                    :placeholder="item.label" size="default" v-if="(item.controlType == 3)" />
                                <input type="file" class="form-control phone-input" @change="uploadImage($event, index)"
                                    :placeholder="item.label" v-if="(item.controlType == 6)" />
                            </div>
                        </div>
                    </div>
                </div>
            </el-collapse-transition>
            <!-- </div> -->


        </div>
    </div>
    <div class="container">
        <div class="row" v-if="route.query.memberType == 0">
            <div class="col-12 mt-4 font-weight-700">
                <el-icon :class="{ 'unroll-icon': !insightIcon, 'roll-icon': insightIcon }" @click="toggleInsightIcon"
                    class="el-icon--right p uniform-primary-color"><arrow-up /></el-icon>
                &nbsp;&nbsp;&nbsp;&nbsp;Insights
            </div>
            <el-collapse-transition>
                <div v-show="insightIcon">
                    <div class="col-12">
                        <div class="row">
                            <div class="col-12 mt-4 label-text">How did you hear about us</div>
                            <div class="col-12 mt-2">
                                <el-select-v2 v-model="aboutUsId"
                                    :options="aboutUsSource.map(i => ({ label: i.name, value: i.id }))"
                                    placeholder="Select option" size="large" class="phone-input w-100"
                                    @change="updateSelectedAboutUs" />
                            </div>
                            <div class="col-12 mt-4 label-text">Preferred means of communication</div>
                            <div class="col-12 mt-2">
                                <el-select-v2 v-model="comMeansId"
                                    :options="communicationMeans.map(i => ({ label: i.name, value: i.id }))"
                                    placeholder="Select option" size="large" class="phone-input w-100"
                                    @change="updateSelectedComMeans" />
                            </div>
                            <div class="col-12 mt-4 label-text">Are you interested in joining us?</div>
                            <div class="col-12 mt-2">
                                <el-select-v2 v-model="joinInterestId"
                                    :options="joinInterestArr.map(i => ({ label: i.name, value: i.id }))"
                                    placeholder="Select option" size="large" class="phone-input w-100"
                                    @change="updateSelectedJoinInterest" />
                            </div>
                            <div class="col-12 mt-4 label-text">Would you like to be visited?</div>
                            <div class="col-12 mt-2">
                                <el-select-v2 v-model="visitId"
                                    :options="wantVisitArr.map(i => ({ label: i.name, value: i.id }))"
                                    placeholder="Select option" size="large" class="phone-input w-100"
                                    @change="updateSelectedWantVisit" />
                            </div>
                        </div>
                    </div>
                </div>
            </el-collapse-transition>
        </div>
        <div class="row">
            <div class="p-2 offset-3 col-6 mt-3 save-btn btn-btn c-pointer" @click="editBasicDetails">Update</div>
        </div>
    </div>
    <div class="container">
        <div class="row">
            <div class="col-12 mt-2 pb-5">

            </div>
        </div>
    </div>

    <!-- Log Pane -->
    <el-drawer v-model="displayLogPane" :size="xsOnly ? '100%' : '50%'" direction="rtl">
        <template #header>
            <h4>{{ 'Log ' + selectedLog.value }}</h4>
        </template>
        <template #default>
            <div class="container-fluid pa-2">
                <div class="row">
                    <div class="col-6 pl-0">
                        <div class="label-text">Contacted</div>
                        <el-dropdown trigger="click">
                            <span class="el-dropdown-link primary--text">
                                {{ selectedContactLog }} <el-icon class="el-icon--right"><arrow-down /></el-icon>
                            </span>
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item disabled>{{ `${personDetails.firstName}
                                                                            ${personDetails.lastName}(${selectedLog.value === 'email' ? personDetails.email
                                            :
                                            personDetails.phoneNumber})`
                                    }}</el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                    </div>
                    <div class="col-6 pr-0">
                        <div class="label-text">{{ selectedLog.value }} Outcome</div>
                        <el-dropdown trigger="click">
                            <span class="el-dropdown-link primary--text">
                                {{ Object.keys(selectedCallOutcome).length > 0 ? selectedCallOutcome.value :
                                    "Select an outcome"
                                }} <el-icon class="el-icon--right"><arrow-down /></el-icon>
                            </span>
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item v-for="(item, index) in outcomeList" :key="index"
                                        @click="chooseCallOutcome(item)">{{ item.value }}</el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-12 p-0">
                        <el-input type="textarea" :placeholder="`Describe the ${selectedLog.value}...`" rows="6"
                            v-model="callLogDesc" class="w-100" />
                    </div>
                </div>
                <div class="d-flex justify-content-end mt-3">
                    <el-button class="secondary-button" @click="displayLogPane = false" round>Close</el-button>
                    <el-button :color="primarycolor" :loading="logLoading" @click="saveLog" round>Save</el-button>
                </div>
            </div>
        </template>
    </el-drawer>

    <!-- SMS Pane -->
    <el-drawer v-model="displaySMSPane" :size="xsOnly ? '100%' : '50%'" direction="rtl">
        <template #header>
            <h4>Send SMS</h4>
        </template>
        <template #default>
            <div class="row mt-3 p-2">
                <div class="p-0 col-md-12">
                    <el-dropdown class="w-100">
                        <el-button class="w-100">
                            {{ Object.keys(selectedSender).length > 0 ? selectedSender.mask : "Select Sender Id"
                            }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
                        </el-button>

                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item v-for="(item, index) in senderIDs" :key="index"
                                    @click="setIdToSubject(item)">{{ item.mask }}</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </div>
                <div class="col-12 p-0 mt-3">
                    <el-input v-model="smsMessage" type="textarea" placeholder="Type your message here ..." class="w-100"
                        rows="12" />
                </div>
            </div>
            <div class="d-flex justify-content-end mt-4">
                <el-button class="secondary-button" @click="displaySMSPane = false" round>Close</el-button>
                <el-button :color="primarycolor" :loading="smsLoading" @click="sendSms" round>Send</el-button>
            </div>
        </template>
    </el-drawer>

    <Dialog header="Confirm" v-model:visible="displayConfirm" :breakpoints="{ '960px': '75vw' }"
        :style="{ width: window.innerWidth > 767 ? '50vw' : '100vw' }" :modal="true">
        <p>You are about to convert this first timer to a member, this action cannot be undone, do you want to continue?
        </p>
        <div class="dropdown w-100 ">
            <div id="dropdownMenuButton" class="w-100  border py-2 pl-3 rounded" data-toggle="dropdown">{{
                Object.keys(genderType).length > 0 ? genderType.value : 'Gender'
            }}</div>
            <div class="dropdown-menu w-100" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item  " href="#" v-for="(gender, index) in genders" :key="index"
                    @click="addGenderType(gender)">

                    <div class="hover-text cursor-pointer">{{ gender.value }}</div>
                </a>

            </div>
        </div>
        <template #footer>
            <div class="d-flex justify-content-end">
                <div class="default-btn text-center c-pointer" @click="() => displayConfirm = false">No</div>
                <div class="primary-bg default-btn border-0 text-white text-center ml-3 c-pointer"
                    @click="convertToMember($event)"><i class="pi pi-spin pi-spinner" v-if="loading"></i> Yes</div>
            </div>
        </template>
    </Dialog>

    <!-- Convert to member modal -->
    <div class="modal fade" id="convertToMemberModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">Convert to member</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="container">
                        <div class="row">
                            <div class="col-12">
                                <p>To continue, you have to select the membership category you want to convert this
                                    first timer to.</p>
                            </div>
                            <div class="col-12">
                                <el-dropdown class="w-100" trigger="click">
                                    <span class="el-dropdown-link primary--text w-100">
                                        <button
                                            class="btn w-100 phone-input d-flex justify-content-between align-items-center"
                                            aria-haspopup="true" aria-expanded="false">
                                            <div>
                                                {{ selectedMembershipClassification &&
                                                    Object.keys(selectedMembershipClassification).length > 0 ?
                                                    selectedMembershipClassification.name : 'Select membership category'
                                                }}
                                            </div>
                                            <el-icon class="el-icon--right"><arrow-down /></el-icon>
                                        </button>
                                    </span>
                                    <template #dropdown>
                                        <el-dropdown-menu>
                                            <el-dropdown-item v-for="item in membershipCategory" :key="item.id"
                                                @click="setMemCat(item)">{{ item.name }}</el-dropdown-item>
                                        </el-dropdown-menu>
                                    </template>
                                </el-dropdown>
                            </div>

                        </div>
                    </div>
                </div>
                <div class="modal-footer border-0">
                    <div class="d-flex justify-content-end">
                        <el-button class="secondary-button" data-dismiss="modal" round>Close</el-button>
                        <el-button :color="primarycolor" :loading="loading" @click="convertToMember($event)"
                            :disabled="Object.keys(selectedMembershipClassification).length === 0" round>Proceed</el-button>
                        <!-- <div class="default-btn text-center c-pointer" data-dismiss="modal">Close</div>
                        <button class="primary-bg default-btn border-0 text-white text-center ml-3 c-pointer"
                            :disabled="Object.keys(selectedMembershipClassification).length === 0"
                            @click="convertToMember($event)"><i class="pi pi-spin pi-spinner" v-if="loading"></i>
                            Proceed</button> -->
                    </div>
                    <!-- <button type="button" class="btn default-btn " data-dismiss="modal">Close</button>
                <button type="button" class="btn default-btn primary-bg border-0 text-white" data-dismiss="modal" @click="saveSenderId" :disabled="requestbtn">Request sender id</button> -->
                </div>
            </div>
        </div>
    </div>

    <!-- Create sender id modal -->
    <div class="modal fade" id="senderIdModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">Create sender id</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="container">
                        <div class="row">
                            <div class="col-12">Enter sender id</div>
                            <div class="col-12 mt-2">
                                <input type="text" class="form-control" placeholder="Enter sender id" v-model="senderIdText"
                                    @input="validateSenderId" ref="senderIdRef" />
                                <div class="invalid-feedback text-danger pl-2">
                                    <ul>
                                        <li>Should not contain any special characters</li>
                                        <li>Should not be less than 3 characters and more than 11 characters</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer border-0">
                    <button type="button" class="btn default-btn " data-dismiss="modal">Close</button>
                    <button type="button" class="btn default-btn primary-bg border-0 text-white" data-dismiss="modal"
                        @click="saveSenderId" :disabled="requestbtn">Request sender id</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { computed, ref, watchEffect, inject } from "vue"
import axios from "@/gateway/backendapi";
import lookupTable from "../../../../services/lookup/lookupservice"
import { useRoute } from "vue-router"
import frmservice from "@/services/FRM/firsttimermanagement"
import { useStore } from "vuex";
// import SinchClient from 'sinch-rtc/sinch.min.js'
import SearchMember from "../../../../components/membership/MembersSearch.vue"
import party from "party-js";
import swal from "sweetalert";
import { ElMessage } from 'element-plus'
import deviceBreakpoint from "../../../../mixins/deviceBreakpoint";
import allCustomFields from "../../../../services/customfield/customField"
export default {
    components: {
        SearchMember
    },
    emits: ["opennoteeditor", "openemailmodal", "opentaskeditor", "calllogdesc", "resetlog", "allcontact", "updatelogtoview", "displayanim",],
    props: ["personDetails", "smsLog", "activityType"],
    setup(props, { emit }) {
        const route = useRoute()
        const store = useStore()
        const primarycolor = inject('primarycolor')
        const selectedContact = ref({})
        const lifeCycle = ref([])
        const selectedLifeCycle = ref({})
        const leadStatus = ref(frmservice.leadStatus())
        const outcomeList = ref([])
        const selectedLeadStatus = ref({})
        const hoverTask = ref(false)
        const hoverPhone = ref(false)
        const phoneNumber = ref(8076543254)
        const email = ref('olad@gamil.com')
        const callDropDown = ref(false)
        const position = ref('bottomright')
        const displayLogPane = ref(false)
        const displaySMSPane = ref(false)
        const selectedCallOutcome = ref({})
        const date = ref("")
        const timeRef = ref(false)
        const callLogDesc = ref("")
        const contactIcon = ref(true)
        const insightIcon = ref(false)
        const moreIcon = ref(false)
        const aboutUsSource = ref([])
        const selectedAboutUsSource = ref({})
        const communicationMeans = ref([{ name: "Call", id: 0 }, { name: "Email", id: 1 }, { name: "Visit", id: 2 }, { name: "SMS", id: 3 }]);
        const selectedCommunicationMeans = ref(null);
        const joinInterestArr = ref([{ name: "Yes", id: 0 }, { name: "No", id: 1 }, { name: "Maybe", id: 2 }, { name: "On Transit", id: 3 }]);
        const selectedJoinInterest = ref(null);
        const wantVisitArr = ref([{ name: "Yes", id: 0 }, { name: "No", id: 1 }, { name: "Maybe", id: 2 }, { name: "On Transit", id: 3 }]);
        const selectedVisitOption = ref(null);
        const selectedLog = ref({})
        const smsMessage = ref("")
        const isoCode = ref("")
        const eventsSearchString = ref("")
        const eventsAttended = ref([])
        const selectedEventAttended = ref({})
        const genders = ref([])
        const maritalStatus = ref([])
        const selectedGender = ref({})
        const selectedMaritalStatus = ref({})
        const day = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]);
        const month = ref(["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]);
        const selectedBirthday = ref("")
        const selectedBirthMonth = ref("")
        const selectedBirthYear = ref("")
        const activityLogs = ref([])
        const selectedSender = ref({})
        const senderIDs = ref([])
        const subject = ref("")
        const image = ref('')
        const pictureUrl = ref("")
        const url = ref("")
        const hoverImage = ref(false)
        const confeti = ref()
        const membershipCategory = ref([])
        const displayConfirm = ref(false)
        const loading = ref(false)
        const senderIdText = ref("")
        const senderIdRef = ref()
        const requestbtn = ref(false)
        const tenantId = ref("")
        const selectedMembershipClassification = ref({})
        const clearPersonValue = ref(false)
        const hasContactOwner = ref(false)
        const smsLoading = ref(false)
        const { xsOnly } = deviceBreakpoint()
        const logLoading = ref(false)
        const leadStatusId = ref(null)
        const genderId = ref(null)
        const maritalStatusId = ref(null)
        const aboutUsId = ref(null)
        const comMeansId = ref(null)
        const joinInterestId = ref(null)
        const visitId = ref(null)
        const dynamicCustomFields = ref([]);


        const selectedContactLog = computed(() => {
            if (!props.personDetails) return "Select a contact"
            return `${props.personDetails.firstName} ${props.personDetails.lastName}`
        })

        const onHoverBorder = () => {
            hoverTask.value = true
        }

        const outHoverBorder = () => {
            hoverTask.value = false
        }

        const toggleHoverPhone = () => {
            hoverPhone.value = true
        }

        const OutHoverPhone = () => {
            hoverPhone.value = false
        }

        const openNoteEditor = () => {
            emit('opennoteeditor', true)
        }

        const openEmailModal = () => {
            emit('openemailmodal', true)
        }

        const openTaskEditor = () => {
            emit('opentaskeditor', true)
        }

        const call = () => {
            // let sinchClient = new SinchClient({
            //     applicationKey: 'b1392f96-6a4b-4e44-bdf1-0e1f4dd2d1a0',
            //     capabilities: { calling: true },
            // })
            // var signUpObj = {};
            //     signUpObj.username = 'oladapo'

            //         sinchClient.start(signUpObj, function () {
            //             global_username = signUpObj.username;
            //             // console.log(ticket)
            //             //On success, show the UI
            //         })
            // let error = function (error) {
            //     console.log(error)
            // }
            // console.log(error)

        }

        const toggleCallSms = (event) => {
            callDropDown.value.toggle(event);
        }

        const innerWidth = computed(() => {
            return window.innerWidth;
        })

        const toggleLogPane = (item) => {
            displayLogPane.value = true;
            selectedLog.value = item
        }

        const toggleCallSmsPane = () => {
            toggleSMSPane()
        }


        const toggleSMSPane = () => {
            displaySMSPane.value = true;
        }

        const toggleTime = (event) => {
            timeRef.value.toggle(event);
        }

        const saveLog = async () => {
            logLoading.value = true;

            let body = {
                outcome: selectedCallOutcome.value.id,
                description: callLogDesc.value,
                firsttimerID: route.params.personId,
                type: selectedLog.value.id
            }

            try {
                await frmservice.createLog(body)
                logLoading.value = false;
                displayLogPane.value = false;
                ElMessage({
                    type: 'success',
                    showClose: true,
                    message: selectedLog.value.value + ' logged successfully',
                    duration: 5000
                })
                emit('updatelogtoview')
                callLogDesc.value = ""
            }
            catch (err) {
                logLoading.value = false;
                console.log(err)
            }
        }

        const getIsoCode = () => {
            if (store.getters.currentUser && store.getters.currentUser.isoCode) {
                isoCode.value = store.getters.currentUser.isoCode;
                tenantId.value = store.getters.currentUser.tenantId
            } else {
                axios
                    .get("/api/Membership/GetCurrentSignedInUser")
                    .then((res) => {
                        isoCode.value = res.data.isoCode;
                        tenantId.value = res.data.tenantId
                    })
                    .catch((err) => console.log(err));
            }
        }
        getIsoCode()

        const setIdToSubject = (item) => {
            subject.value = item.mask
            selectedSender.value = item
        }

        const sendSms = async () => {
            let body = {
                subject: subject.value,
                message: smsMessage.value,
                toOthers: props.personDetails.phoneNumber,
                isoCode: isoCode.value,
                gateWayToUse: "hybridKonnect",
                ispersonalized: true,
                category: "",
                contacts: [],
                emailAddress: "",
                emailDisplayName: "",
                groupedContacts: [],
            }

            smsLoading.value = true
            try {
                await frmservice.sendSms(route.params.personId, body)
                smsLoading.value = false
                ElMessage({
                    type: 'success',
                    showClose: true,
                    message: "Message sent successfully",
                    duration: 5000
                })
                displaySMSPane.value = false
                emit("updatelogtoview")
            }
            catch (err) {
                smsLoading.value = false
                console.log(err)
            }
        }

        watchEffect(() => {
            if (props.smsLog) {
                displaySMSPane.value = true
                emit('resetlog', false)
            }
        })

        const toggleContactIcon = () => {
            contactIcon.value = !contactIcon.value
        }

        const toggleInsightIcon = () => {
            insightIcon.value = !insightIcon.value
        }

        const toggleMoreIcon = () => {
            moreIcon.value = !moreIcon.value
        }

        const getKnowlegdeSource = async () => {
            try {
                let { data } = await axios.get("/api/membership/howyouheardaboutus")
                aboutUsSource.value = data
            } catch (error) {
                console.log(error)
            }
        }
        getKnowlegdeSource()

        const getCallOutcome = async () => {
            try {
                let data = await lookupTable.getLookUps()
                outcomeList.value = data.outcome
                genders.value = data.genders
                maritalStatus.value = data.maritalStatus
            }
            catch (err) {
                console.log(err)
            }
        }
        getCallOutcome()

        const chooseCallOutcome = (outcome) => {
            selectedCallOutcome.value = outcome
        }

        const updateOwner = async (payload, type) => {
            const body = {
                firstTimerID: route.params.personId,
                ownerID: type === 1 ? payload.id : null
            }
            try {
                let res = await frmservice.updateContactOwner(route.params.personId, body)
                if (type === 1) {
                    hasContactOwner.value = true
                }
                emit('updatelogtoview')
                if (type === 2) {
                    ElMessage({
                        type: 'success',
                        message: 'Contact owner removed successfully',
                        duration: 5000
                    })
                    clearPersonValue.value = true
                }
            }
            catch (err) {
                console.log(err)
            }

        }

        const resetClearPersonValue = (payload) => {
            clearPersonValue.value = payload
            selectedContact.value = new Object()
            hasContactOwner.value = false
        }

        const getLifeCycle = async () => {
            try {
                let res = await frmservice.getLifeCycle()
                lifeCycle.value = res.returnObject.sort((a, b) => a.order - b.order);
            }
            catch (err) {
                console.log(err)
            }

        }
        getLifeCycle()

        const updateLifeCycle = async (item) => {
            selectedLifeCycle.value = item
            const payload = {
                firstTimerID: route.params.personId,
                stageID: selectedLifeCycle.value.id
            }
            try {
                await frmservice.updateLifeCycle(route.params.personId, payload)
                emit('updatelogtoview')
            }
            catch (err) {
                console.log(err)
            }

        }

        const year = computed(() => {
            const arrOfYears = [];
            let currentYear = new Date().getFullYear();
            while (arrOfYears.length <= 100) {
                arrOfYears.push(currentYear);
                currentYear = currentYear - 1;
            }
            return arrOfYears;
        });

        const filteredEvents = computed(() => {
            if (!eventsSearchString.value) return eventsAttended.value;
            return eventsAttended.value.filter((i) =>
                i.name.toLowerCase().includes(eventsSearchString.value.toLowerCase())
            );
        });

        const unwatch = watchEffect(() => {
            if (props.personDetails && lifeCycle.value.length > 0) {
                selectedLifeCycle.value = lifeCycle.value.find(i => i.id === props.personDetails.firstTimerCycleStageID)
            }

            if (props.personDetails && route.query.memberType == 1) {
                selectedContact.value = {
                    name: props.personDetails.followupPersonName,
                    id: props.personDetails.followupPersonID
                }
            }

            if (props.personDetails && route.query.memberType == 0) {
                selectedContact.value = {
                    name: props.personDetails.followUpPersonName,
                    id: props.personDetails.contactOwnerID
                }
            }

            if (props.personDetails && leadStatus.value.length > 0) {
                selectedLeadStatus.value = leadStatus.value.find(i => i.id === props.personDetails.leadStatus)
                if (selectedLeadStatus.value) leadStatusId.value = selectedLeadStatus.value.id

            }

            if (props.personDetails) {
                selectedCommunicationMeans.value = communicationMeans.value.find(i => i.id === props.personDetails.communicationMeans)
                selectedAboutUsSource.value = aboutUsSource.value.find(i => i.id === props.personDetails.howDidYouAboutUsId)
                selectedJoinInterest.value = joinInterestArr.value.find(i => i.id === props.personDetails.interestedInJoining)
                selectedVisitOption.value = wantVisitArr.value.find(i => i.id === props.personDetails.wantsToBeVisited)
                selectedGender.value = genders.value.find(i => i.id === props.personDetails.genderId)
                selectedMaritalStatus.value = maritalStatus.value.find(i => i.id === props.personDetails.maritalStatusId)
                selectedBirthday.value = day.value.find(i => i == props.personDetails.birthday)
                selectedBirthMonth.value = month.value[Number(props.personDetails.birthMonth) - 1]
                selectedBirthYear.value = year.value.find(i => i == props.personDetails.birthYear)

                if (selectedGender.value) genderId.value = selectedGender.value.id
                if (selectedMaritalStatus.value) maritalStatusId.value = selectedMaritalStatus.value.id
                if (selectedAboutUsSource.value) aboutUsId.value = selectedAboutUsSource.value.id
                if (selectedCommunicationMeans.value) comMeansId.value = selectedCommunicationMeans.value.id
                if (selectedJoinInterest.value) joinInterestId.value = selectedJoinInterest.value.id
                if (selectedVisitOption.value) visitId.value = selectedVisitOption.value.id
            }
        })






        const updateLeadStatus = async () => {
            unwatch()
            selectedLeadStatus.value = leadStatus.value.find(i => i.id == leadStatusId.value)
            try {
                await frmservice.updateLeadStatus(route.params.personId, selectedLeadStatus.value.id)
                emit('updatelogtoview')
                ElMessage({
                    type: 'success',
                    showClose: true,
                    message: 'Lead status updated successfully',
                    duration: 5000
                })
            }
            catch (err) {
                console.log(err)
            }
        }

        const updateSelectedGender = () => {
            unwatch()
            selectedGender.value = genders.value.find(i => i.id == genderId.value)
        }

        const updateSelectedMaritalStatus = () => {
            unwatch()
            selectedMaritalStatus.value = maritalStatus.value.find(i => i.id == maritalStatusId.value)
        }

        const updateSelectedAboutUs = () => {
            unwatch()
            selectedAboutUsSource.value = aboutUsSource.value.find(i => i.id == aboutUsId.value)
        }

        const updateSelectedComMeans = () => {
            unwatch()
            selectedCommunicationMeans.value = communicationMeans.value.find(i => i.id == comMeansId.value)
        }

        const updateSelectedJoinInterest = () => {
            unwatch()
            selectedJoinInterest.value = joinInterestArr.value.find(i => i.id == joinInterestId.value)
        }

        const updateSelectedWantVisit = () => {
            unwatch()
            selectedVisitOption.value = wantVisitArr.value.find(i => i.id == visitId.value)
        }

        const getEvents = () => {
            axios.get("/api/Events/EventActivity").then((res) => {
                eventsAttended.value = res.data;
            });
        }
        getEvents()

        const eventAttendedSelected = (event) => {
            selectedEventAttended.value = event
        }

        const editBasicDetails = async () => {
            if (route.query.memberType == 0) {
                let payload = {
                    personId: route.params.personId,
                    email: props.personDetails.email,
                    firstName: props.personDetails.firstName,
                    lastName: props.personDetails.lastName,
                    phoneNumber: props.personDetails.phoneNumber,
                    address: props.personDetails.address,
                    activityID: selectedEventAttended.value && Object.keys(selectedEventAttended.value).length > 0 ? selectedEventAttended.value.activityID : props.personDetails.activityID,
                    howDidYouAboutUsId: selectedAboutUsSource.value ? selectedAboutUsSource.value.id : "00000000-0000-0000-0000-000000000000",
                    communicationMeans: selectedCommunicationMeans.value ? selectedCommunicationMeans.value.id : 0,
                    interestedInJoining: selectedJoinInterest.value ? selectedJoinInterest.value.id : 0,
                    wantsToBeVisited: selectedVisitOption.value ? selectedVisitOption.value.id : 0,
                    genderId: selectedGender.value && Object.keys(selectedGender.value).length > 0 ? selectedGender.value.id : props.personDetails.genderId,
                    maritalStatusId: selectedMaritalStatus.value && Object.keys(selectedMaritalStatus.value).length > 0 ? selectedMaritalStatus.value.id : props.personDetails.maritalStatusId,
                    birthday: selectedBirthday.value ? selectedBirthday.value : props.personDetails.birthday,
                    birthMonth: selectedBirthMonth.value ? month.value.findIndex(i => i == selectedBirthMonth.value) + 1 : props.personDetails.birthMonth,
                    birthYear: selectedBirthYear.value ? selectedBirthYear.value : props.personDetails.birthYear,
                    firstTimerId: route.params.personId,
                    pictureUrl: pictureUrl.value,
                    customAttributeDataString: JSON.stringify(dynamicCustomFields.value.map(i => {
                        if (route.params.personId) {
                            return {
                                customAttributeID: i.id,
                                data: i.data,
                                entityID: i.entityID
                            }
                        }
                    }))
                }

                try {
                    await frmservice.editBasicDetails(payload)
                    ElMessage({
                        type: 'success',
                        showClose: true,
                        message: "Updated successfully",
                        duration: 5000
                    })
                    store.dispatch('membership/setFirstTimerData');
                    store.dispatch('dashboard/getDashboard')
                }
                catch (err) {
                    console.log(err)
                    if (err.status === 400) {
                        ElMessage({
                            type: 'warning',
                            message: 'Please fill empty fields',
                            duration: 5000
                        })
                    }
                }
            } else {
                const formData = new FormData()
                formData.append("firstName", props.personDetails.firstName)
                formData.append("lastName", props.personDetails.lastName)
                formData.append("mobilePhone", props.personDetails.phoneNumber)
                formData.append("email", props.personDetails.email)
                formData.append("dayOfBirth", selectedBirthday.value ? selectedBirthday.value : props.personDetails.birthday)
                formData.append("monthOfBirth", selectedBirthMonth.value ? month.value.findIndex(i => i == selectedBirthMonth.value) + 1 : props.personDetails.birthMonth)
                formData.append("yearOfBirth", selectedBirthYear.value ? selectedBirthYear.value : props.personDetails.birthYear)
                formData.append("homeAddress", props.personDetails.address)
                formData.append("followupPersonID", props.personDetails.followupPersonID)
                formData.append("genderID", selectedGender.value && Object.keys(selectedGender.value).length > 0 ? selectedGender.value.id : props.personDetails.genderId)

                try {
                    let { data } = await axios.put(`/api/People/UpdatePerson/${route.params.personId}`, formData)
                    console.log(data)
                } catch (err) {
                    console.log(err)
                }
            }
        }

        watchEffect(() => {
            activityLogs.value = props.activityType.filter(i => i.id !== 96)
        })

        const getSenderId = async () => {
            try {
                let { data } = await axios.get(`/api/Messaging/RetrieveTenantSenderIDs`)
                senderIDs.value = data.returnObject
            }
            catch (err) {
                console.log(err)
            }
        }
        getSenderId()

        const uploadPicture = () => {
            image.value.click()
        }

        const choosePicture = (e) => {
            let formData = new FormData()
            formData.append("mediaFileImage", e.target.files[0])
            url.value = URL.createObjectURL(e.target.files[0]);

            axios.post("/api/Media/UploadProfilePicture", formData)
                .then(res => {
                    pictureUrl.value = res.data.pictureUrl
                    emit("pictureurl", pictureUrl.value)
                })
                .catch(err => {
                    console.log(err)
                })
        }

        const setHover = () => {
            hoverImage.value = true
        }

        const setLeave = () => {
            hoverImage.value = false
        }


        const convertToMember = async (element) => {
            loading.value = true
            try {
                let { data } = await axios.post(
                    `/api/People/ConvertFirstTimerToMember?personId=${route.params.personId}&membershipCategoryId=${selectedMembershipClassification.value.id}`
                );
                party.confetti(element.target);
                emit("displayanim", true)
                swal(
                    "Congratulations!",
                    `${props.personDetails.firstName ? props.personDetails.firstName : ""} ${props.personDetails.lastName ? props.personDetails.lastName : ""} is now a member of your church.`,
                    "success"
                );
                displayConfirm.value = false;
                loading.value = false

                if (data.response) {
                    ElMessage({
                        type: 'success',
                        showClose: true,
                        message: data.response,
                        duration: 5000
                    })
                } else {
                    ElMessage({
                        type: 'success',
                        showClose: true,
                        message: 'Moved successfully',
                        duration: 5000
                    })
                }
            } catch (err) {
                console.log(err);
                loading.value = false
                if (err.response) {
                    ElMessage({
                        type: 'warning',
                        showClose: true,
                        message: ' Moving failed, ' + err.response,
                        duration: 5000
                    })
                } else if (err.toString().toLowerCase().includes("timeout")) {
                    ElMessage({
                        type: 'warning',
                        showClose: true,
                        message: 'Request took too long to respond, please try again',
                        duration: 5000
                    })
                } else if (err.toString().toLowerCase().includes("network error")) {
                    ElMessage({
                        type: 'warning',
                        showClose: true,
                        message: 'Please ensure that you have a strong internet and try again',
                        duration: 5000
                    })
                } else {
                    ElMessage({
                        type: 'warning',
                        showClose: true,
                        message: 'Couldn\'t move successfully, check your connection and try again',
                        duration: 5000
                    })
                }
            }
        }

        const getMembershipCategory = async () => {
            try {
                let { data } = await axios.get(
                    "/api/Settings/GetTenantPeopleClassification"
                );
                membershipCategory.value = data;
            } catch (err) {
                console.log(err);
            }
        };
        getMembershipCategory();

        const openConfirm = () => {
            displayConfirm.value = true
        }

        const validateSenderId = (e) => {
            var regExp = /^[a-zA-Z0-9]{3,11}$/;
            var testString = e.target.value;

            if (regExp.test(testString)) {
                /* do something if letters are found in your string */
                senderIdRef.value.classList.add('is-valid')
                senderIdRef.value.classList.remove('is-invalid')
                requestbtn.value = false
            } else {
                /* do something if letters are not found in your string */
                senderIdRef.value.classList.add('is-invalid')
                senderIdRef.value.classList.remove('is-valid')
                requestbtn.value = true
            }
        }

        const saveSenderId = async () => {
            let payload = {
                tenantID: tenantId.value,
                mask: senderIdText.value
            }
            try {
                let { data } = await axios.post(`/api/Messaging/RequestSenderID`, payload)
                if (data.status === 0) {
                    ElMessage({
                        type: 'warning',
                        message: `Sender ID is pending for approval, when it is approved, you will see it among the Sender ID list`,
                        duration: 8000
                    })
                } else if (data.status === 1) {
                    ElMessage({
                        type: 'warning',
                        message: `Sender ID is processing for approval, when it is approved, you will see it among the Sender ID list`,
                        duration: 8000
                    })
                } else if (data.status === 2) {
                    selectedSender.value = payload
                    ElMessage({
                        type: 'success',
                        message: `Sender ID is approved!`,
                        duration: 6000
                    })
                } else {
                    ElMessage({
                        type: 'warning',
                        message: `Sender ID is approved, create another one`,
                        duration: 5000
                    })
                }
                senderIdText.value = ""
                senderIdRef.value.classList.remove('is-invalid')
                senderIdRef.value.classList.remove('is-valid')
                getSenderId()
            }
            catch (err) {
                console.log(err)
            }
        }

        const setMemCat = (payload) => {
            selectedMembershipClassification.value = payload
        }

        const getCustomFields = async () => {
            try {
                let data = await allCustomFields.allCustomFields()
                dynamicCustomFields.value = data.filter(i => i.entityType === 1)
            }
            catch (err) {
                console.log(err)
            }
        }
        if (props.personDetails && props.personDetails.customAttributeData && props.personDetails.customAttributeData.length === 0) getCustomFields();

        watchEffect(() => {
            console.log(props.personDetails);
            if (props.personDetails && props.personDetails.customAttributeData && props.personDetails.customAttributeData.length > 0) {
                dynamicCustomFields.value = props.personDetails.customAttributeData.map(i => {
                    i.customAttribute.data = i.data == "true" ? true : i.data == "false" ? false : i.data
                    i.customAttribute.entityID = i.entityID
                    return i.customAttribute
                })

                if (dynamicCustomFields.value.length === 0) {
                    getCustomFields()
                }
            } else {
                getCustomFields()
            }
        })

        return {
            selectedContact,
            lifeCycle,
            selectedLifeCycle,
            selectedLeadStatus,
            leadStatus,
            onHoverBorder,
            outHoverBorder,
            hoverTask,
            hoverPhone,
            toggleHoverPhone,
            OutHoverPhone,
            phoneNumber,
            email,
            openNoteEditor,
            openEmailModal,
            openTaskEditor,
            call,
            toggleLogPane,
            position,
            displayLogPane,
            date,
            toggleTime,
            timeRef,
            outcomeList,
            selectedCallOutcome,
            chooseCallOutcome,
            selectedContactLog,
            callLogDesc,
            saveLog,
            toggleContactIcon,
            contactIcon,
            insightIcon,
            moreIcon,
            toggleInsightIcon,
            toggleMoreIcon,
            aboutUsSource,
            selectedAboutUsSource,
            communicationMeans,
            selectedCommunicationMeans,
            joinInterestArr,
            selectedJoinInterest,
            wantVisitArr,
            selectedVisitOption,
            updateOwner,
            updateLifeCycle,
            selectedLog,
            updateLeadStatus,
            callDropDown,
            toggleCallSms,
            toggleCallSmsPane,
            displaySMSPane,
            sendSms,
            smsMessage,
            isoCode,
            editBasicDetails,
            eventsAttended,
            eventsSearchString,
            selectedEventAttended,
            eventAttendedSelected,
            genders,
            maritalStatus,
            selectedMaritalStatus,
            selectedGender,
            day,
            month,
            year,
            selectedBirthday,
            selectedBirthMonth,
            selectedBirthYear,
            activityLogs,
            selectedSender,
            senderIDs,
            setIdToSubject,
            subject,
            uploadPicture,
            image,
            choosePicture,
            pictureUrl,
            url,
            hoverImage,
            setLeave,
            setHover,
            convertToMember,
            confeti,
            membershipCategory,
            openConfirm,
            displayConfirm,
            loading,
            validateSenderId,
            senderIdText,
            senderIdRef,
            saveSenderId,
            requestbtn,
            tenantId,
            route,
            window,
            innerWidth,
            selectedMembershipClassification,
            clearPersonValue,
            resetClearPersonValue,
            hasContactOwner,
            setMemCat,
            smsLoading,
            xsOnly,
            logLoading,
            leadStatusId,
            genderId,
            updateSelectedGender,
            updateSelectedMaritalStatus,
            maritalStatusId,
            filteredEvents,
            updateSelectedAboutUs,
            aboutUsId,
            updateSelectedComMeans,
            comMeansId,
            updateSelectedJoinInterest,
            joinInterestId,
            updateSelectedWantVisit,
            visitId,
            primarycolor,
            dynamicCustomFields
        }

    }
}
</script>

<style scoped>
.contact-name {
    font-size: 30px;
    font-weight: 200
}

.contact-image {
    width: 130px;
    height: 130px;
    object-fit: cover;
    border-radius: 50%
}

.icon-bg {
    border: 2px solid #cbd6e2;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #506e91;
    background: #eaf0f6;
}

.label-text {
    color: #506e91;
    font-size: 0.9em;
}

.details-btn {
    background-color: #eaf0f6;
    border: 1px solid #cbd6e2;
    color: #506e91;
    border-radius: 3px;
    padding: 5px 12px;
    font-size: 12px;
}

.icon-edit {
    color: #506e91;
}

.uniform-primary-color {
    color: #136acdd5
}

.btn-btn {
    font-size: 12px;
    line-height: 14px;
    padding: 5px 12px;
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

.task-border {
    border: 2px solid transparent;
    border-radius: 3px;
    /* background: #ffffff7a */
}

/* .task-border.border-transparent {
    border: transparent
} */
.hover-border {
    border: 2px solid #1269cea6;
    border-radius: 3px;
}

.phone-input {
    background: transparent;
    border: 0;
    border-bottom: 1px solid #cbd6e2;
    border-radius: 0
}

/* .phone-details {
    position: absolute;
    top: 30em;
    right: 2em;
    z-index: 1;
} */

.hover-log:hover {
    background: rgba(202, 202, 202, 0.356);
    cursor: pointer
}

.hover-cursor-cancel:hover {
    cursor: not-allowed;
}

.roll-icon {
    transition: all 0.5s ease-in-out;
    transform: rotateZ(180deg);
}

.unroll-icon {
    transition: all 0.5s ease-in-out;
    transform: rotateZ(0deg);
}

/* .hide-contact {
    height: 0;
    transition: all 0.5s ease-in-out;
    overflow: hidden;
}

.show-contact {
    height: 520px;
    transition: all 0.5s ease-in-out;

} */

.reduce-contact-height {
    height: 296px;
    transition: all 0.5s ease-in-out;
    /* overflow: hidden; */
}


.dropdown-menu {
    max-height: 300px;
    overflow: scroll;
    box-shadow: 0 2px 4px -1px rgb(0 0 0 / 20%), 0 4px 5px 0 rgb(0 0 0 / 14%), 0 1px 10px 0 rgb(0 0 0 / 12%);
}

.create-new-bg {
    background: #dadada;
    color: rgb(15, 71, 134)
}

.create-new-bg:hover {
    background: #dadadad2;
    color: rgb(15, 71, 134)
}

.profile-overlay {
    overflow: hidden;
    position: relative;
    transition: all 3s ease-in-out
}

.profile-overlay img {
    position: relative;
    z-index: 0;
    inset: 0;
    width: 130;
    height: 130px;
    object-fit: cover;
    transition: all 3s ease-in-out
}

.profile-overlay::before,
.profile-overlay::after {
    content: '';
    position: absolute;
    inset: 0;
    transition: all 3s ease-in-out
}

.profile-overlay:before {
    z-index: 1;
    background: black;
    border-radius: 50%;
    position: absolute;
    margin: 0 auto;
    opacity: .3;
    width: 130px;
    opacity: 0;
    -webkit-transition: opacity 0.3s ease;
    -moz-transition: opacity 0.3s ease;
    -ms-transition: opacity 0.3s ease;
    -o-transition: opacity 0.3s ease;
    transition: opacity 0.3s ease-in-out;
    /* mix-blend-mode: soft-light */
}

.profile-overlay:hover:before {
    opacity: .6;
}

/* .profile-overlay::after {
    z-index: 1;
    background: blue;
    border-radius: 50%;
    mix-blend-mode: screen;
} */

.adjust-icon {
    position: absolute;
    margin-top: 44px;
    font-size: 34px;
    color: white;
    z-index: 1;
    opacity: 0;
    -webkit-transition: opacity 0.3s ease;
    -moz-transition: opacity 0.3s ease;
    -ms-transition: opacity 0.3s ease;
    -o-transition: opacity 0.3s ease;
    transition: opacity 0.3s ease-in-out;
}

.fade-icon {
    position: absolute;
    margin-top: 44px;
    font-size: 34px;
    color: white;
    z-index: 1;
    opacity: .6;
    -webkit-transition: opacity 0.3s ease;
    -moz-transition: opacity 0.3s ease;
    -ms-transition: opacity 0.3s ease;
    -o-transition: opacity 0.3s ease;
    transition: opacity 0.3s ease-in-out;
}

.remove-contact {
    font-size: 0.9em;
    text-decoration: underline;
}
</style>