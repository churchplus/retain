<template>
  <div class="container-fluid px-0 mt-5" @click="closeDropdownIfOpen">
    <div class="row mb-4">
      <div class="col-md-12">
        <h4>Add Attendance</h4>
      </div>
      <el-dialog v-model="display" title="Create Event Category" :width="mdAndUp || lgAndUp || xlAndUp ? `50%` : `90%`">
        <div class="row">
          <div class="col-md-12">
            <CreateEventModal @new-created="newCategoryCreated" @closeeventmodal="closeModal" />
          </div>
        </div>
      </el-dialog>
    </div>

    <div class="row">
      <div class="col-md">
        <div class="modal" tabindex="-1" role="dialog" id="newActModal" :data-toggle="showBtModal">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Create Event</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body" data-toggle="modal">
                <div class="row my-4">
                  <div class="col-md-4 text-md-right">
                    <label for="" class="font-weight-600">Event category</label>
                  </div>
                  <div class="col-md-7">
                    <div class="dropdown">
                      <button class="default-btn w-100 text-left pr-1" type="button" style="
                          border-radius: 4px;
                          border: 1px solid #ced4da;
                          color: #6c757d;
                        " id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {{ selectedCategoryName }}
                        <el-icon class="el-icon--right float-right
                            pr-1 ">
                          <arrow-down />
                        </el-icon>

                      </button>
                      <div class="dropdown-menu w-100" aria-labelledby="dropdownMenuButton"
                        style="max-height: 350px; overflow-y: auto">
                        <div class="row w-100 mx-auto">
                          <div class="col-md-12">
                            <el-input type="text" class="w-100" placeholder="Find event" v-model="categorySearchText" />
                          </div>
                        </div>

                        <a class="
                            dropdown-item
                            font-weight-700
                            small-text
                            py-2
                            c-pointer
                          " v-for="(category, index) in filteredCategories" :key="index"
                          @click="selectCategory(category)">{{ category.name }}</a>

                        <!-- Hidden -->
                        <a class="
                            font-weight-bold
                            small-text
                            d-flex
                            justify-content-center
                            py-2
                            text-decoration-none
                            primary-text
                            c-pointer
                          " style="border-top: 1px solid #002044; color: #136acd" data-dismiss="modal"
                          @click="() => (display = true)">
                          <el-icon class="mr-2">
                            <CirclePlus />
                          </el-icon>
                          Create new event
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-4 text-md-right">
                    <label for="">Event date</label>
                  </div>
                  <div class="col-md-7">
                    <el-date-picker v-model="newAcctivityDate" type="date" format="MM/DD/YYYY" size="large"
                      class="w-100" />
                    <!-- <input
                      type="date"
                      class="form-control"
                      v-model="newAcctivityDate"
                    /> -->
                  </div>
                </div>

                <div class="row py-2 mt-4">
                  <div class="col-md-4 text-md-right">
                    <label for=""></label>
                  </div>
                  <div class="col-md-7 d-flex justify-content-center">
                    <el-button class="default-btn mr-2 secondary-button" data-dismiss="modal" round>
                      Cancel
                    </el-button>
                    <el-button class=" border-0 ml-2 text-white" :color="primarycolor" round @click="createNewActivity"
                      data-dismiss="modal" :data-toggle="showBtModal" ref="popModal">
                      Save
                    </el-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <div class="row my-4">
          <div class="col-sm-3 col-md-4 col-lg-4 text-sm-right">
            <label for="" class="font-weight-600">Event</label>
          </div>
          <div class="col-sm-7 col-md-6 col-lg-5">
            <div class="col-md-12 px-0">
              <!-- Find event -->
              <el-dropdown class="w-100" trigger="click">
                <el-input class="w-100" placeholder="Select from events and activities" v-model="selectedEvent.name" />
                <template #dropdown>
                  <el-dropdown-menu class="menu-height">
                    <el-dropdown-item v-for="(event, index) in filteredEvents" :key="index" @click="selectEvent(event)">{{
                      event.name }}</el-dropdown-item>
                    <el-dropdown-item class="d-flex justify-content-center text-primary font-weight-700"
                      data-toggle="modal" data-target="#newActModal" ref="openModalBtn" divided><el-icon>
                        <CirclePlus />
                      </el-icon>
                      Create new event
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
            <!-- <div class="dropdown">
              <button
                class="default-btn w-100 text-left pr-1"
                type="button"
                style="
                  border-radius: 4px;
                  border: 1px solid #ced4da;
                  color: #6c757d;
                "
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {{
                  !selectedEvent.name
                    ? "Select from events and activities"
                    : selectedEvent.name.length > 27
                    ? `${selectedEvent.name.slice(0, 27)}...`
                    : selectedEvent.name
                }}
               <el-icon class="el-icon--right float-right
                  pr-1 ">
                  <arrow-down />
                </el-icon>
              </button>
              <div
                class="dropdown-menu w-100"
                aria-labelledby="dropdownMenuButton"
                style="max-height: 350px; overflow-y: auto"
              >
                <div class="row w-100 mx-auto" v-if="events.length > 5">
                  <div class="col-md-12">
                    <el-input
                      type="text"
                      class="w-100"
                      placeholder="Find event"
                      v-model="eventSearchText"
                    />
                  </div>
                </div>

                <a
                  class="
                    dropdown-item
                    font-weight-700
                    small-text
                    py-2
                    c-pointer
                  "
                  v-for="(event, index) in filteredEvents"
                  :key="index"
                  @click="selectEvent(event)"
                  >{{ event.name }}</a
                >
                <a
                  class="
                    font-weight-bold
                    small-text
                    d-flex
                    justify-content-center
                    py-2
                    text-decoration-none
                    primary-text
                  "
                  style="border-top: 1px solid #002044; color: #136acd"
                  href="#"
                  data-toggle="modal"
                  data-target="#newActModal"
                  ref="openModalBtn"
                >
                  <el-icon class="mr-2"><CirclePlus /></el-icon>
                  Create new event
                </a>
              </div>
            </div> -->
          </div>
        </div>
        <div class="row my-3">
          <div class="col-sm-3 col-md-4 col-lg-4 text-sm-right">
            <label for="" class="font-weight-600">Group</label>
          </div>
          <div class="col-sm-7 col-md-6 col-lg-5">
            <!-- <el-tree-select
                v-model="selectedGroups"
                :data="groupMappedTree"
                :render-after-expand="false"
                :filter-node-method="filterNodeMethod"
                check-strictly
                multiple
                show-checkbox
                @change="setGroupValue" 
                filterable
                check-on-click-node
                class="w-100"
              /> -->
            <button class="
                form-control
                d-flex
                justify-content-between
                align-items-center
                exempt-hide
              " @click="setGroupProp">
              <span class="exempt-hide">
                <span v-if="selectedGroups.length > 0 && selectedGroups.length <= 2">

                  <span v-for="item in selectedGroups" :key="item.id"><span class="eachGroup">{{ item && item.name
                  }}</span></span>
                </span>
                <span v-if="selectedGroups.length > 0 && selectedGroups.length > 2">
                  <span v-for="item in selectedGroups.slice(0, 2)" :key="item.id">
                    <span class="eachGroup">{{ item.name }}</span></span>
                </span>
                <span v-if="selectedGroups.length === 0">Select group</span>
              </span>
              <el-icon class="el-icon--right
                  pr-1 ">
                <arrow-down />
              </el-icon>
            </button>
            <div class="div-card p-2 exempt-hide" :class="{
                'd-none': hideDiv,
                'd-block': !hideDiv,
              }">
              <el-icon class="is-loading " v-if="grouploading && groups.length === 0">
                <Loading />
              </el-icon>
              <el-input type="text" class="w-100 exempt-hide" v-model="searchGroupText" ref="searchGroupRef"
                placeholder="Search for group" />
              <GroupTree :items="searchForGroups" :addGroupValue="true" @filteredGroup="setFilterGroups"
                @newgroup="setNewGroup" />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <div class="d-flex justify-content-between align-items-center">
              <h5 class="mt-2">More</h5>
              <!-- <hr style="width: 80%" /> -->
              <el-divider></el-divider>
              <div>
              <el-icon
                  class="angle-icon"
                  @click="toggleTemplate"
                >
                  <ArrowDownBold />
                </el-icon>
                </div>

              <!-- <span class="mt-2" :class="{
                  rollIcon: templateDisplay,
                  closeIcon: !templateDisplay,
                }" @click="toggleTemplate"><el-icon>
                  <ArrowUp />
                </el-icon></span> -->
            </div>
          </div>
        </div>

        <div class="row">
          <el-collapse-transition>
            <div v-show="templateDisplay">
              <div class="container-fluid">
                <div class="row my-3">
                  <div class="
                      col-sm-3 col-md-4 col-lg-4
                      text-sm-right
                      align-self-center
                    ">
                    <label for="" class="font-weight-600">Event Banner</label>
                  </div>
                  <div v-if="imageUrl" class="col-sm-6 col-md-5" :class="{ 'img-border ': imageUrl === '' }">
                    <div class="d-flex">
                      <img :src="imageUrl" class="w-50 mx-auto mb-2" />
                    </div>
                    <div class="
                        col-12 col-sm-12 col-md-12
                        px-0
                        mx-0
                        d-flex
                        text-center
                        cursor-pointer
                      ">
                      <div class="d-flex col-md-12 px-0 mx-0">
                        <input type="text" class="form-control border-right-0" v-model="image.name" />
                        <div class="
                            upload-button
                            align-self-center
                            text-center
                            cursor-pointer
                          " @click="altClick">
                          Upload
                          <input type="file" @change="chooseFile" ref="binImage" hidden />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-if="!imageUrl" class="
                      col-12 col-sm-7 col-md-6
                      px-0
                      mx-0
                      d-flex
                      text-center
                      cursor-pointer
                    ">
                    <div class="d-flex col-12 col-lg-10">
                      <input type="text" class="form-control" v-model="image.name" />
                      <div class="upload-button text-center cursor-pointer" @click="altClick">
                        Upload
                        <input type="file" @change="chooseFile" ref="binImage" hidden />
                      </div>
                    </div>
                  </div>
    
                  <!-- <div class="col-sm-3 col-md-4"></div> -->
                  <div class="
                      col-sm-12 col-md-12 col-lg-12
                      d-flex
                      justify-content-center
                      mt-2
                    ">
                    <div class="col-sm-7 col-md-4">
                      <small><code>Click to upload your banner.</code></small>
                    </div>
                  </div>
                </div>
    
                <div class="row my-3">
                  <div class="
                      col-sm-3 col-md-4 col-lg-4
                      text-sm-right
                      align-self-center
                    ">
                    <label for="" class="font-weight-600">Event Details</label>
                  </div>
                  <div class="col-sm-7 col-md-6 col-lg-5">
                    <el-input v-model="eventDetails" :rows="2" type="textarea" />
                    <!-- <textarea
                      name=""
                      id=""
                      cols="30"
                      rows="4"
                      class="form-control"
                      v-model="eventDetails"
                    ></textarea> -->
                  </div>
                </div>
    
                <div class="row my-3">
                  <div class="
                      col-sm-3 col-md-4 col-lg-4
                      text-sm-right
                      align-self-center
                    ">
                    <label for="" class="font-weight-600">Slot</label>
                  </div>
                  <div class="col-sm-7 col-md-6 col-lg-5">
                    <el-input type="number" class="w-100" v-model="slot" placeholder="slot available" />
                  </div>
                </div>
    
                <div class="row mt-4">
                  <div class="col-sm-3 col-md-4 col-lg-4 text-sm-right"></div>
                  <div class="col-sm-7 col-md-6 col-lg-5">
                    <div class="row">
                      <div class="col-sm-4 align-self-center">
                        <span class="font-weight-700 cursor-pointer" @click="showFreeTab"
                          :class="{ 'active-tab': addFreeClass }">Free</span>&nbsp;&nbsp;<span class="text-secondary">|</span>&nbsp;&nbsp;<span
                          class="font-weight-700 cursor-pointer" @click="showPaidTab"
                          :class="{ 'active-tab': addPaidClass }">Paid</span>
                      </div>
                      <div class="col-sm-8 mt-3 mt-sm-0" :class="{
                          'show-amount': addPaidClass,
                          'hide-amount': !addPaidClass,
                        }">
                        <el-input type="text" class="w-100" placeholder="Enter amount" v-model="amount" />
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-2 col-lg-3"></div>
    
                  <el-collapse-transition>
                    <div v-show="addPaidClass">
                      <div class="col-12">
                        <div class="row">
                          <div class="
                              col-sm-3 col-md-4 col-lg-4
                              text-sm-right
                              mt-4
                              font-weight-600
                            ">
                            Select Bank
                          </div>
                          <div class="col-sm-7 col-md-6 col-lg-5">
                            <div class="dropdown w-100 mt-4">
                              <button class="default-btn w-100 text-left pr-1" type="button" style="
                                  border-radius: 4px;
                                  border: 1px solid #ced4da;
                                  color: #6c757d;
                                " id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {{
                                  !selectedBank
                                  ? "Select"
                                  : selectedBank.name.length > 27
                                    ? `${selectedBank.name.slice(0, 27)}...`
                                    : selectedBank.name
                                }}
                                <el-icon class="manual-dd-icon
                                    float-right
                                    pr-1">
                                  <ArrowDown />
                                </el-icon>
                              </button>
                              <div class="dropdown-menu p-2" aria-labelledby="dropdownMenuButton"
                                style="max-height: 350px; overflow-y: auto">
                                <el-input type="text" class="w-100" placeholder="Search bank" v-model="bankSearchText" />
                                <a class="dropdown-item elipsis-items cursor-pointer" v-for="item in filteredBanks"
                                  :key="item.id">
                                  <div @click="setBank(item)">
                                    {{ item ? item.name : "" }}
                                  </div>
                                </a>
                              </div>
                            </div>
                          </div>
                          <div class="col-sm-2 col-lg-3"></div>
                          <div class="
                              col-sm-3 col-md-4 col-lg-4
                              text-sm-right
                              mt-4
                              font-weight-600
                            ">
                            Account Number
                          </div>
                          <div class="col-sm-7 col-md-6 col-lg-5">
                            <el-input type="text" class="w-100 mt-4 input-height" placeholder="Enter account number"
                              v-model="accountNumber" @blur="resolveCustomerDetail" />
                          </div>
                          <div class="col-sm-2 col-lg-3"></div>
        
                          <div class="
                              col-sm-3 col-md-4 col-lg-4
                              text-sm-right
                              mt-4
                              font-weight-600
                            ">
                            Account Name
                          </div>
                          <div class="col-sm-7 col-md-6 col-lg-5">
                            <el-input type="text" class="w-100 mt-4 input-height" placeholder="account name" v-model="accountName"
                              ref="accNameRef" disabled />
                          </div>
                          <div class="col-sm-2 col-lg-3 align-self-center mt-4" v-if="loading">
                            <div class="spinner-border text-primary" style="width: 3rem; height: 3rem" role="status">
                              <span class="sr-only">Loading...</span>
                            </div>
                          </div>
        
                          <div class="
                              col-sm-3 col-md-4 col-lg-4
                              text-sm-right
                              mt-4
                              font-weight-600
                            ">
                            Income Account
                          </div>
                          <div class="col-sm-7 col-md-6 col-lg-5">
                            <el-dropdown trigger="click" class="w-100 mt-4">
                              <span class="el-dropdown-link w-100">
                                <div class="d-flex justify-content-between border-contribution text-secondary w-100" size="large">
                                  <span>{{
                                    selectedIncomeAccount &&
                                    Object.keys(selectedIncomeAccount).length > 0
                                    ? selectedIncomeAccount.text
                                    : "Select"
                                  }}</span>
                                  <div>
                                    <el-icon class="el-icon--right">
                                      <arrow-down />
                                    </el-icon>
                                  </div>
                                </div>
                              </span>
                              <template #dropdown>
                                <el-dropdown-menu>
                                  <el-dropdown-item v-for="(itm, indx) in incomeAccount" :key="indx"
                                    @click="setIncomeAccount(itm)">{{ itm.text }}
                                  </el-dropdown-item>
                                </el-dropdown-menu>
                              </template>
                            </el-dropdown>
                          </div>
                          <div class="col-sm-2 col-lg-3"></div>
        
                          <div class="
                              col-sm-3 col-md-4 col-lg-4
                              text-sm-right
                              mt-4
                              font-weight-600
                            ">
                            Cash Account
                          </div>
                          <div class="col-sm-7 col-md-6 col-lg-5">
                            <el-dropdown trigger="click" class="w-100 mt-4">
                              <span class="el-dropdown-link w-100">
                                <div class="d-flex justify-content-between border-contribution text-secondary w-100" size="large">
                                  <span>{{
                                    selectedCashAccount &&
                                    Object.keys(selectedCashAccount).length > 0
                                    ? selectedCashAccount.text
                                    : "Select"
                                  }}</span>
                                  <div>
                                    <el-icon class="el-icon--right">
                                      <arrow-down />
                                    </el-icon>
                                  </div>
                                </div>
                              </span>
                              <template #dropdown>
                                <el-dropdown-menu>
                                  <el-dropdown-item v-for="(itm, indx) in cashBankAccount" :key="indx"
                                    @click="setcashBankAccount(itm)">{{ itm.text }}
                                  </el-dropdown-item>
                                </el-dropdown-menu>
                              </template>
                            </el-dropdown>
                          </div>
                          <div class="col-sm-2 col-lg-3"></div>
                        </div>
                      </div>
                    </div>
                  </el-collapse-transition>
                </div>
    
                <div class="row mt-3">
                  <div class="
                      col-sm-3 col-md-4 col-lg-4
                      text-sm-right
                      align-self-center
                    ">
                    <label for="" class="font-weight-600">SMS</label>
                  </div>
                  <div class="col-sm-7 col-md-6 col-lg-5 mt-2">
                    <el-tabs type="border-card">
                      <el-tab-pane label="Checkin">
                        <SenderIdVue @setselectedsenderid="setSelectedSenderIdCheckin" />
                        <el-input v-model="checkinSMS" :rows="4" type="textarea" class="mt-2" />
                      </el-tab-pane>
                      <el-tab-pane label="Registration">
                        <SenderIdVue @setselectedsenderid="setSelectedSenderIdRegistration" />
                        <el-input v-model="registrationSMS" :rows="4" type="textarea" class="mt-2" />
                      </el-tab-pane>
                    </el-tabs>
                    <!-- <ul class="nav nav-tabs" id="myTab" role="tablist">
                      <li class="nav-item">
                        <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab"
                          aria-controls="home" aria-selected="true">Checkin</a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab"
                          aria-controls="profile" aria-selected="false">Registration</a>
                      </li>
                    </ul> -->
                    <!-- <div class="tab-content" id="myTabContent">
                      <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                        <SenderIdVue @setselectedsenderid="setSelectedSenderIdCheckin" />
                        <el-input v-model="checkinSMS" :rows="4" type="textarea" class="mt-2" />
                      </div>
                      <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                        <SenderIdVue @setselectedsenderid="setSelectedSenderIdRegistration" />
                        <el-input v-model="registrationSMS" :rows="4" type="textarea" class="mt-2" />
                      </div>
                    </div> -->
                  </div>
                  
                  <div class="col-sm-2 col-lg-3"></div>
    
                  <div class="
                      col-sm-3 col-md-4 col-lg-4
                      text-sm-right
                      mt-3
                      align-self-center
                      ">
                      <label for="" class="font-weight-600">Email</label>
                    </div>
                    <div class="col-sm-7 col-md-6 col-lg-5 mt-3">
                    <el-tabs type="border-card">
                      <el-tab-pane label="Checkin">
                        <el-input v-model="checkinEmailSubject" type="text" placeholder="Enter subject" class="mt-2" />
                        <el-input v-model="checkinEmail" :rows="4" type="textarea" class="mt-2" />
                      </el-tab-pane>
                      <el-tab-pane label="Registration">
                        <el-input v-model="registrationEmailSubject" placeholder="Enter subject" type="text" class="mt-2" />
                        <el-input v-model="registrationEmail" :rows="4" type="textarea" class="mt-2" />
                      </el-tab-pane>
                    </el-tabs>
                    <!-- <ul class="nav nav-tabs" id="myTab" role="tablist">
                      <li class="nav-item">
                        <a class="nav-link active" id="home-tab" data-toggle="tab" href="#first" role="tab"
                        aria-controls="home" aria-selected="true">Checkin</a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" id="profile-tab" data-toggle="tab" href="#second" role="tab"
                        aria-controls="profile" aria-selected="false">Registration</a>
                      </li>
                    </ul>
                    <div class="tab-content" id="myTabContent">
                      <div class="tab-pane fade show active" id="first" role="tabpanel" aria-labelledby="home-tab">
                        <el-input v-model="checkinEmailSubject" type="text" placeholder="Enter subject" class="mt-2" />
                        <el-input v-model="checkinEmail" :rows="4" type="textarea" class="mt-2" />
                      </div>
                      <div class="tab-pane fade" id="second" role="tabpanel" aria-labelledby="profile-tab">
                        <el-input v-model="registrationEmailSubject" placeholder="Enter subject" type="text" class="mt-2" />
                        <el-input v-model="registrationEmail" :rows="4" type="textarea" class="mt-2" />
                      </div>
                    </div> -->
                  </div>
    
                  <div class="col-sm-2 col-lg-3"></div>
    
                  <div class="
                      col-sm-3 col-md-4 col-lg-4
                      text-sm-right
                      mt-3
                      align-self-center
                      ">
                      <label for="" class="font-weight-600">Cut-off time</label>
                    </div>
                    <div class="col-sm-7 col-md-6 col-lg-5 mt-3">
                    <el-tabs type="border-card">
                      <el-tab-pane label="Checkin">
                        <input type="datetime-local" class="form-control my-3" v-model="checkinCutOffTime" />
                      </el-tab-pane>
                      <el-tab-pane label="Registration">
                        <input type="datetime-local" class="form-control my-3" v-model="regCutOffTimer" />
                      </el-tab-pane>
                    </el-tabs>
                    <!-- <ul class="nav nav-tabs" id="myTab" role="tablist">
                      <li class="nav-item">
                        <a class="nav-link active" id="home-tab" data-toggle="tab" href="#checkintime" role="tab"
                          aria-controls="home" aria-selected="true">Checkin</a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" id="profile-tab" data-toggle="tab" href="#regTime" role="tab"
                          aria-controls="profile" aria-selected="false">Registration</a>
                      </li>
                    </ul>
                    <div class="tab-content" id="myTabContent">
                      <div class="tab-pane fade show active" id="checkintime" role="tabpanel" aria-labelledby="home-tab">
                        
                        <input type="datetime-local" class="form-control my-3" v-model="checkinCutOffTime" />
                      </div>
                      <div class="tab-pane fade" id="regTime" role="tabpanel" aria-labelledby="profile-tab">
                        <input type="datetime-local" class="form-control my-3" v-model="regCutOffTimer" />
                      </div>
                    </div> -->
                  </div>
    
                  <div class="col-sm-2 col-lg-3"></div>
                </div>
              </div>
              <!-- <div class="transition-box">el-collapse-transition</div>
              <div class="transition-box">el-collapse-transition</div> -->
            </div>
          </el-collapse-transition>
        </div>
        

        <div class="row my-3">
          <div class="col-sm-3 col-md-4 col-lg-4 text-sm-right">
          </div>
          <div class="col-sm-7 col-md-6 col-lg-5">
            <div class="row">
              <div class="col-md-12 d-flex justify-content-center">
                <el-button :color="primarycolor" class=" text-white border-0 " round :loading="loadingsave" size="large"
                  @click="onContinue" :disabled="!selectedEvent.id ||
                    selectedGroups.length === 0 ||
                    !selectedEvent.name
                    ">
                  <!-- <i
                    class="fas fa-circle-notch fa-spin mr-2 text-white"
                    v-if="loading"
                  ></i> -->
                  <span class="text-white">Save and Continue</span>
                  <span></span>
                </el-button>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
        </div>
      </div>

      <div class="col-lg-3 col-md-1"></div>
    </div>
  </div>
</template>

<script>
import { computed, nextTick, ref, inject } from "vue";
import { useRoute } from "vue-router";
import router from "@/router/index";
import groupService from "../../../services/groups/groupsservice";
import eventsService from "../../../services/events/eventsservice";
import CreateEventModal from "../../../components/attendance/AttendanceEventModal";
// import attendanceservice from "../../../services/attendance/attendanceservice";
import { useStore } from "vuex";
import axios from "@/gateway/backendapi";
import finish from "../../../services/progressbar/progress";
import axio from "axios";
import moment from "moment";
import GroupTree from "../../groups/component/GroupTreeCheckboxParent.vue";
import deviceBreakpoint from "../../../mixins/deviceBreakpoint";
import collector from "../../../services/groupArray/mapTree";
import flatten from "../../../services/groupArray/flatTree";
import { ElMessage } from "element-plus";
import SenderIdVue from "../../../components/senderId/SenderId.vue";

export default {
  components: { CreateEventModal, GroupTree, SenderIdVue },
  setup() {
    const primarycolor = inject('primarycolor')
    const store = useStore();
    const route = useRoute();
    const groups = ref([]);
    const display = ref(false);
    const newActModal = ref(false);
    const showBtModal = ref("");
    const popModal = ref(null);
    const openModalBtn = ref(null);
    const addPaidClass = ref(false);
    const addFreeClass = ref(true);
    const templateDisplay = ref(false);
    const nigerianBanks = ref([]);
    const selectedBank = ref("");
    const accountNumber = ref("");
    const accountName = ref("");
    const accNameRef = ref("");
    const loading = ref(false);
    const loadingsave = ref(false);
    const eventDetails = ref("");
    const cashBankAccount = ref([]);
    const incomeAccount = ref([]);
    const selectedIncomeAccount = ref({});
    const selectedCashAccount = ref(null);
    const registrationSMS = ref("");
    const registrationEmail = ref("");
    const checkinSMS = ref("");
    const checkinEmail = ref("");
    const amount = ref("");
    const binImage = ref("");
    const image = ref("");
    const imageUrl = ref("");
    const slot = ref("");
    const hideDiv = ref(true);
    const searchGroupRef = ref(true);
    const searchGroupText = ref("");
    const grouploading = ref(false);
    const checkinCutOffTime = ref("");
    const regCutOffTimer = ref("");
    const { mdAndUp, lgAndUp, xlAndUp, xsOnly } = deviceBreakpoint()
    const checkinSMSSubject = ref("");
    const registrationSMSSubject = ref("");
    const registrationEmailSubject = ref("");
    const checkinEmailSubject = ref("");

    // const selectedGroup = ref({});
    const selectedGroups = ref([]);
    const selectedIncomeAccountID = ref(null)
    const selectedCashAccountID = ref(null)

    const attendanceCheID = ref(route.params.id);
    const eventNameDate = ref("");

    const setIncomeAccount = (item) => {
      selectedIncomeAccount.value = item;
    }
    const setGroupValue = () => {
      flattenedTree.value.find(i => i.value == selectedGroups.value)
    }
    const setcashBankAccount = (item) => {
      selectedCashAccount.value = item;
    }
    


    const getSingleCheckinAttendance = async () => {
      try {
        const res = await axios.get(
          `/api/CheckInAttendance/GetSingleAttendanceCheckIn?checkInAttendanceId=${attendanceCheID.value}`
        );
        // let groupArray = []
        // groupArray.push(res.data.returnObject.attendanceItem.fullGroupName)
        eventNameDate.value = `${res.data.returnObject.attendanceItem.fullEventName} (${new Date(
          res.data.returnObject.attendanceItem.eventDate
        ).toDateString()})`;
        selectedEvent.value.name = `${res.data.returnObject.attendanceItem.fullEventName} (${new Date(
          res.data.returnObject.attendanceItem.eventDate
        ).toDateString()})`;
      } catch (error) {
        console.log(error);
      }
    };
    if (attendanceCheID.value) getSingleCheckinAttendance();

    const groupMappedTree = ref([]);
    const flattenedTree = ref([])
    const getGroups = async () => {
      grouploading.value = true;
      try {
        const response = await groupService.getGroups();
        grouploading.value = false;
        if (response.response && response.response.groupResonseDTO.length > 0) {
          groups.value = response.response.groupResonseDTO;
        }
        let data = { children: groups.value };
        const { children } = collector(data);
        groupMappedTree.value = children;
        if (groupMappedTree.value && groupMappedTree.value.length > 0) {
          flattenedTree.value = groupMappedTree.value.flatMap(flatten());
        }

      } catch (error) {
        console.log(error);
        grouploading.value = false;
      }
    };

    const events = ref([]);
    const getEvents = async () => {
      try {
        const response = await eventsService.getEvents();
        if (response && response.length > 0) {
          events.value = response.map((i) => {
            return { id: i.activityID, name: i.name, date: i.date };
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    const filterNodeMethod = (value, data) => data.label.toLowerCase().includes(value.toLowerCase())
    const selectedEvent = ref({});
    const selectEvent = (selected) => {
      selectedEvent.value = selected;
      // eventSearchText.value = ''
    };

    const closeModal = () => {
      display.value = false;
    };

    const eventCategories = ref([]);
    const getEventCategories = async () => {
      try {
        const response = await eventsService.getEventCategories();
        eventCategories.value = response;
      } catch (error) {
        console.log(error);
      }
    };
    getEventCategories();

    const selectedCategory = ref({});
    const selectCategory = (category) => {
      selectedCategory.value = category;
      newActModal.value = false;
    };

    const newAcctivityDate = ref("");
    const getCorrectDate = (date) => {
      return new Date(date).toLocaleDateString("en-US").replaceAll('/', '-')
    }
    const createNewActivity = async () => {
      if (!newAcctivityDate.value && !selectedCategory.value) return false;
      try {
        const response = await eventsService.createNewActivity({
          activity: {
            date: getCorrectDate(newAcctivityDate.value),
            eventCategoryId: selectedCategory.value.id,
          },
        });
        const newActivity = {
          id: response.currentEvent.id,
          name: `${response.currentEvent.name} (${new Date(
            response.currentEvent.activityDate
          ).toDateString()})`,
          date: getCorrectDate(newAcctivityDate.value),
        };
        selectedEvent.value = newActivity;
        events.value.push(newActivity);
        ElMessage({
          type: "success",
          message: "Event created successfully",
          duration: 2000,
        });
      } catch (error) {
        ElMessage({
          type: "error",
          message: "Could not create event",
          duration: 2000,
        });
        console.log(error);
      }
    };

    const selectedCategoryName = computed(() => {
      if (!selectedCategory.value || !selectedCategory.value.name) return "";
      return selectedCategory.value.name.length > 17
        ? `${selectedCategory.value.name.slice(0, 16)}...`
        : selectedCategory.value.name;
    });

    const newCategoryCreated = (categories, eventName) => {
      eventCategories.value = categories;
      selectedCategory.value = categories.find(
        (i) => i.name.toLowerCase() === eventName.toLowerCase()
      );
      openModalBtn.value.click();
      display.value = false;
    };

    const categorySearchText = ref("");
    const filteredCategories = computed(() => {
      if (!categorySearchText.value) return eventCategories.value;
      return eventCategories.value.filter((i) =>
        i.name.toLowerCase().includes(categorySearchText.value.toLowerCase())
      );
    });

    const bankSearchText = ref("");
    const filteredBanks = computed(() => {
      if (!bankSearchText.value) return nigerianBanks.value;
      return nigerianBanks.value.filter((i) =>
        i.name.toLowerCase().includes(bankSearchText.value.toLowerCase())
      );
    });

    const eventSearchText = ref("");
    const filteredEvents = computed(() => {
      if (!selectedEvent.value.name) return events.value;
      return events.value.filter((i) =>
        i.name.toLowerCase().includes(selectedEvent.value.name.toLowerCase())
      );
    });

    getEvents();
    getGroups();

    const onContinue = async () => {
      loadingsave.value = true;
      // let checkinEvent2 = {
      //   id: attendanceCheID.value,
      //   eventId: selectedEvent.value.id,
      //   groupIDs: selectedGroups.value,
      //   eventDate: selectedEvent.value.date.split("T")[0],
      // };
      // let checkinEvent = {
      //   eventId: selectedEvent.value.id,
      //   groupIDs: selectedGroups.value,
      //   eventDate: selectedEvent.value.date.split("T")[0],
      // };
      // slot.value ? (checkinEvent.registrationSlot = slot.value) : "";
      // checkinSMS.value ? (checkinEvent.checkinSMS = checkinSMS.value) : "";
      // checkinEmail.value
      //   ? (checkinEvent.checkinEmail = checkinEmail.value)
      //   : "";
      // registrationSMS.value
      //   ? (checkinEvent.registrationSMS = registrationSMS.value)
      //   : "";
      // registrationEmail.value
      //   ? (checkinEvent.registrationEmail = registrationEmail.value)
      //   : "";
      // regCutOffTimer.value
      //   ? (checkinEvent.registrationCutOffTime = regCutOffTimer.value)
      //   : "";
      // checkinCutOffTime.value
      //   ? (checkinEvent.checkInCutOffTime = checkinCutOffTime.value)
      //   : "";

      const formData = new FormData();

      image.value ? formData.append("bannerPhoto", image.value) : "";
      formData.append("details", eventDetails.value);
      selectedBank.value
        ? formData.append(
          "bankCode",
          selectedBank.value ? selectedBank.value.code : ""
        )
        : "";
      accountName.value
        ? formData.append("accountName", accountName.value)
        : "";
      accountNumber.value
        ? formData.append("accountNumber", accountNumber.value)
        : "";
      formData.append("contributionItemName", selectedEvent.value.name);
      selectedCashAccount.value
        ? formData.append(
          "cashAccountId",
          selectedCashAccount.value ? selectedCashAccount.value.id : ""
        )
        : "";
      selectedIncomeAccount.value && selectedIncomeAccount.value.id
        ? formData.append(
          "incomeAccountId",
          selectedIncomeAccount.value && selectedIncomeAccount.value.id ? selectedIncomeAccount.value.id : ""
        )
        : "";
      registrationSMS.value
        ? formData.append("registrationSMS", registrationSMS.value)
        : "";
      registrationSMSSubject.value
        ? formData.append("registrationSMSSubject", registrationSMSSubject.value)
        : "";
      registrationEmail.value
        ? formData.append("registrationEmail", registrationEmail.value)
        : "";
      registrationEmailSubject.value
        ? formData.append("registrationEmailSubject", registrationEmailSubject.value)
        : "";
      checkinSMS.value ? formData.append("checkinSMS", checkinSMS.value) : "";
      checkinSMSSubject.value ? formData.append("checkInSMSSubject", checkinSMSSubject.value) : "";
      checkinEmail.value
        ? formData.append("checkinEmail", checkinEmail.value)
        : "";
      checkinEmailSubject.value
        ? formData.append("checkinEmailSubject", checkinEmailSubject.value)
        : "";
      selectedEvent.value
        ? formData.append(
          "activityDate", getCorrectDate(selectedEvent.value.date)
        )
        : "";
      formData.append("isPaidFor", addPaidClass.value);
      amount.value ? formData.append("amount", amount.value) : "";
      selectedEvent.value
        ? formData.append("activityId", selectedEvent.value.id)
        : "";

      formData.append("enableRegistration", true);
      slot.value ? formData.append("registrationSlot", slot.value) : "";
      regCutOffTimer.value
        ? formData.append("registrationCutOffTime", regCutOffTimer.value)
        : "";
      checkinCutOffTime.value
        ? formData.append("checkInCutOffTime", checkinCutOffTime.value)
        : "";
      selectedGroups.value
        ? formData.append("groupIDs", JSON.stringify(selectedGroups.value))
        : "";



      if (attendanceCheID.value) {
        attendanceCheID.value
          ? formData.append("Id", attendanceCheID.value)
          : "";
        loadingsave.value = true;
        try {
          const res = await axios.put(
            "/api/CheckInAttendance/EditAttendanceCheckIn",
            formData
          );
          console.log(res);
          store.dispatch("attendance/setItemData", res);
          ElMessage({
            type: "success",
            message: res.data.response,
            duration: 5000
          });
          store.dispatch('attendance/setAttendanceItemData');
          router.push({
            name: "CheckinType",
            query: {
              activityID: selectedEvent.value.id,
              activityName: selectedEvent.value.name,
              groupId: selectedGroups.value[0].id,
              groupName: selectedGroups.value[0].name,
              id: res.data.id,
              code: res.data.attendanceCode,
            },
          });
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          const response = await axios.post(
            "api/CheckInAttendance/CreateAttendanceCheckIn", formData
            // "/api/CheckinAttendance/MultipleCheckinAttendanceItem",
            // checkinEvent
          );
          for (let i = 0; i < response.data.returnObject.checkInAttendanceResult.length; i++) {
            const element = response.data.returnObject.checkInAttendanceResult[i];
            store.dispatch("attendance/setItemData", element);
          }
          store.dispatch('attendance/setAttendanceItemData');
          store.dispatch("groups/setCheckedTreeGroup", []);
          loadingsave.value = false;
          router.push({
            name: "CheckinType",
            query: {
              activityID: selectedEvent.value.id,
              activityName: selectedEvent.value.name,
              groupId: selectedGroups.value[0].id,
              groupName: selectedGroups.value[0].name,
              id: response.data.returnObject.checkInAttendanceResult[0].id,
              code: response.data.returnObject.checkInAttendanceResult[0].attendanceCode,
            },
          });
        } catch (error) {
          console.log(error);
          loadingsave.value = false;
        }
      }
      //         if (
      //   !attendanceCheID.value &&
      //   !amount.value &&
      //   !selectedBank.value &&
      //   !accountNumber.value &&
      //   !selectedCashAccount.value &&
      //   !selectedIncomeAccount.value &&
      //   !image.value
      // ) {
      //   console.log("free and no image");
      //   selectedGroups.value
      //     ? formData.append("groupIDs", JSON.stringify(selectedGroups.value))
      //     : "";
      //   loadingsave.value = true;
      //   try {
      //     const response = await axios.post( 
      //       "api/CheckInAttendance/CreateAttendanceCheckIn", formData
      //       // "/api/CheckinAttendance/MultipleCheckinAttendanceItem",
      //       // checkinEvent
      //     );
      //     for (let i = 0; i < response.data.returnObject.checkInAttendanceResult.length; i++) {
      //       const element = response.data.returnObject.checkInAttendanceResult[i];
      //       store.dispatch("attendance/setItemData", element);
      //     }
      //     store.dispatch('attendance/setAttendanceItemData');
      //     store.dispatch("groups/setCheckedTreeGroup", []);
      //     loadingsave.value = false;
      //     router.push({
      //       name: "CheckinType",
      //       query: {
      //         activityID: selectedEvent.value.id,
      //         activityName: selectedEvent.value.name,
      //         groupId: selectedGroups.value[0].id,
      //         groupName: selectedGroups.value[0].name,
      //         id: response.data.returnObject.checkInAttendanceResult[0].id,
      //         code: response.data.returnObject.checkInAttendanceResult[0].attendanceCode,
      //       },
      //     });
      //   } catch (error) {
      //     console.log(error);
      //     loadingsave.value = false;
      //   }
      //   console.log("Only Topppp");
      // } else if (
      //   attendanceCheID.value
      // ) {
      //   selectedGroups.value
      //     ? formData.append("groupIDs", JSON.stringify(selectedGroups.value))
      //     : "";
      //   attendanceCheID.value
      //     ? formData.append("Id", attendanceCheID.value)
      //     : "";
      //   loadingsave.value = true;
      //   try {
      //     const res = await axios.put(
      //       "/api/CheckInAttendance/EditAttendanceCheckIn",
      //       formData
      //     );
      //     console.log(res);
      //     store.dispatch("attendance/setItemData", res);
      //     ElMessage({
      //               type: "success",
      //               message: res.data.response,
      //               duration: 5000
      //               });
      //               store.dispatch('attendance/setAttendanceItemData');
      //     router.push({
      //       name: "CheckinType",
      //       query: {
      //         activityID: selectedEvent.value.id,
      //         activityName: selectedEvent.value.name,
      //         groupId: selectedGroups.value[0].id,
      //         groupName: selectedGroups.value[0].name,
      //         id: res.data.id,
      //         code: res.data.attendanceCode,
      //       },
      //     });
      //   } catch (error) {
      //     console.log(error);
      //   }
      // } else if (
      //   !amount.value &&
      //   !selectedBank.value &&
      //   !accountNumber.value &&
      //   !selectedCashAccount.value &&
      //   !selectedIncomeAccount.value &&
      //   image.value
      // ) {
      //   console.log("Free and image");
      //   selectedGroups.value
      //     ? formData.append("groupIDs", JSON.stringify(selectedGroups.value))
      //     : "";
      //   loadingsave.value = true;
      //   try {
      //     let { data } = await axios.post(
      //       // "/api/CheckInAttendance/create/multiple",
      //       "api/CheckInAttendance/CreateAttendanceCheckIn",
      //       formData
      //     );
      //     let firstGroup = data.returnObject.checkInAttendanceResult.find(
      //       (i) => i.groupID == selectedGroups.value[0].id
      //     );

      //     for (
      //       let i = 0;
      //       i < data.returnObject.checkInAttendanceResult.length;
      //       i++
      //     ) {
      //       const element = data.returnObject.checkInAttendanceResult[i];
      //       store.dispatch("attendance/setEventReg", element);
      //     }
      //     store.dispatch('attendance/setAttendanceItemData');
      //     loadingsave.value = false;
      //     router.push({
      //       name: "CheckinType",
      //       query: {
      //         activityID: selectedEvent.value.id,
      //         activityName: selectedEvent.value.name,
      //         groupId: firstGroup.id,
      //         groupName: selectedGroups.value[0].name,
      //         id: firstGroup.id,
      //         code: firstGroup.attendanceCode,
      //       },
      //     });
      //   } catch (err) {
      //     console.log(err);
      //     loadingsave.value = false;
      //   }
      // } else if (
      //   amount.value &&
      //   selectedBank.value &&
      //   accountNumber.value &&
      //   selectedCashAccount.value &&
      //   selectedIncomeAccount.value
      // ) {
      //   console.log("image and paid");
      //   selectedGroups.value
      //     ? formData.append("groupIDs", JSON.stringify(selectedGroups.value))
      //     : "";
      //   loadingsave.value = true;
      //   try {
      //     let { data } = await axios.post(
      //       "api/CheckInAttendance/CreateAttendanceCheckIn",
      //       // "/api/CheckInAttendance/create/multiple",
      //       formData
      //     );
      //     let firstGroup = data.returnObject.checkInAttendanceResult.find(
      //       (i) => i.groupID == selectedGroups.value[0].id
      //     );
      //     store.dispatch('attendance/setAttendanceItemData');

      //     for (
      //       let i = 0;
      //       i < data.returnObject.checkInAttendanceResult.length;
      //       i++
      //     ) {
      //       const element = data.returnObject.checkInAttendanceResult[i];
      //       store.dispatch("attendance/setEventReg", element);
      //     }
      //     loadingsave.value = false;
      //     router.push({
      //       name: "CheckinType",
      //       query: {
      //         activityID: selectedEvent.value.id,
      //         activityName: selectedEvent.value.name,
      //         groupId: firstGroup.id,
      //         groupName: selectedGroups.value[0].name,
      //         id: firstGroup.id,
      //         code: firstGroup.attendanceCode,
      //       },
      //     });
      //   } catch (err) {
      //     console.log(err);
      //     loading.value = false;
      //   }
      // } else {
      //   ElMessage({
      //             type: "warning",
      //             message: 'Cannot create this event attendance, kindly fill all fields before saving.',
      //             duration: 5000
      //           });
      //   loadingsave.value = false;
      // }
    };

    const showPaidTab = () => {
      addPaidClass.value = true;
      addFreeClass.value = false;
    };

    const showFreeTab = () => {
      addFreeClass.value = true;
      addPaidClass.value = false;
    };

    const toggleTemplate = () => {
      templateDisplay.value = !templateDisplay.value;
    };

    const getBanks = () => {
      axios
        .get("/api/Financials/GetBanks")
        .then((res) => {
          nigerianBanks.value = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getBanks();

    const resolveCustomerDetail = async () => {
      loading.value = true;
      try {
        let header = {
          headers: {
            Authorization: `Bearer ${process.env.VUE_APP_PAYSTACK_SECRET_KEY}`,
          },
        };

        let { data } = await axio.get(
          `https://api.paystack.co/bank/resolve?account_number=${accountNumber.value}&bank_code=${selectedBank.value.code}`,
          header
        );
        accountName.value = data.data.account_name;
        accNameRef.value.focus();
        // disabled.value = false

        loading.value = false;

        ElMessage({
          type: "success",
          message: 'Account Check Successful',
          duration: 5000
        });
      } catch (error) {
        finish();
        console.log(error);

        loading.value = false;

        ElMessage({
          type: "error",
          message: 'Account Check Error, Please check your banks details again ',
          duration: 5000
        });
      }
    };

    const getCashBankAccount = () => {
      axios
        .get("/api/financials/accounts/getcashbankaccounts")
        .then((res) => {
          cashBankAccount.value = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getCashBankAccount();

    const getIncomeAccount = () => {
      axios
        .get("/api/Financials/Accounts/GetIncomeAccounts")
        .then((res) => {
          incomeAccount.value = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getIncomeAccount();

    const altClick = () => {
      binImage.value.click();
    };

    const chooseFile = (e) => {
      image.value = e.target.files[0];
      imageUrl.value = URL.createObjectURL(image.value);
      // imageUrl.value = URL.createObjectURL(image.value);
    };

    const setBank = (item) => {
      selectedBank.value = item;
    };

    const setGroupProp = () => {
      hideDiv.value = !hideDiv.value;
      nextTick(() => {
        searchGroupRef.value.focus();
      });
    };

    const searchForGroups = computed(() => {
      if (!searchGroupText.value.name && groups.value.length > 0)
        return groups.value;
      return groups.value.filter((i) =>
        i.name.toLowerCase().includes(searchGroupText.value.toLowerCase())
      );
    });

    const closeDropdownIfOpen = (e) => {
      if (
        !e.target.classList.contains("exempt-hide") &&
        !e.target.classList.contains("p-hidden-accessible") &&
        !e.target.classList.contains("p-checkbox-box") &&
        !e.target.classList.contains("p-checkbox-icon")
      ) {
        // hideDiv.value = true;
      }
    };

    const setFilterGroups = (payload) => {
      selectedGroups.value = payload;
    };

    const setNewGroup = (payload) => {
      groups.value.push(payload);
    };

    const setSelectedSenderIdCheckin = (payload) => {
      checkinSMSSubject.value = payload
    }

    const setSelectedSenderIdRegistration = (payload) => {
      registrationSMSSubject.value = payload
    }

    return {
      selectedEvent,
      setGroupValue,
      flattenedTree,
      groupMappedTree,
      filterNodeMethod,
      setIncomeAccount,
      setcashBankAccount,
      selectedIncomeAccountID,
      selectedCashAccountID,
      mdAndUp,
      xlAndUp,
      xsOnly,
      lgAndUp,
      eventNameDate,
      attendanceCheID,
      onContinue,
      groups,
      events,
      selectEvent,
      display,
      closeModal,
      newActModal,
      eventCategories,
      selectCategory,
      selectedCategory,
      createNewActivity,
      selectedCategoryName,
      newAcctivityDate,
      newCategoryCreated,
      showBtModal,
      popModal,
      filteredCategories,
      categorySearchText,
      eventSearchText,
      filteredEvents,
      openModalBtn,
      addPaidClass,
      addFreeClass,
      showPaidTab,
      showFreeTab,
      toggleTemplate,
      templateDisplay,
      nigerianBanks,
      selectedBank,
      accountNumber,
      accountName,
      resolveCustomerDetail,
      accNameRef,
      loading,
      loadingsave,
      eventDetails,
      cashBankAccount,
      incomeAccount,
      selectedIncomeAccount,
      selectedCashAccount,
      moment,
      registrationSMS,
      registrationEmail,
      checkinSMS,
      checkinEmail,
      amount,
      binImage,
      altClick,
      chooseFile,
      image,
      imageUrl,
      setBank,
      bankSearchText,
      filteredBanks,
      slot,
      selectedGroups,
      setGroupProp,
      hideDiv,
      searchGroupRef,
      searchForGroups,
      searchGroupText,
      grouploading,
      closeDropdownIfOpen,
      regCutOffTimer,
      checkinCutOffTime,
      setFilterGroups,
      setNewGroup,
      primarycolor,
      checkinSMSSubject,
      registrationSMSSubject,
      setSelectedSenderIdCheckin,
      setSelectedSenderIdRegistration,
      registrationEmailSubject,
      checkinEmailSubject
    };
  },
};
</script>

<style scoped>
* {
  color: #02172e;
  /* font-family: Nunito Sans !important; */
}

.border-contribution {
  border: 1.6px solid rgb(229, 232, 237);
  border-radius: 4px;
  padding: 11px 7px;
}

.contn-btn:disabled {
  opacity: 0.3;
}

.menu-height {
  max-height: 400px;
  overflow: scroll;
}

.upload-button {
  background: rgba(206, 206, 206, 0.274);
  color: black;
  /* border-radius: 25px; */
  font-weight: 600;
  padding: 8px 10px;
}

.active-tab {
  border-bottom: 2px solid rgb(31, 87, 241);
}

.header-contri {
  font-size: 20px;
  font-weight: 700;
}

.input-height {
  height: 70%;
}

/* .img-border {
  border: 1px dotted rgb(206, 212, 218); 
  height: 150px;
} */

.show-paid {
  height: 327px;
  /* overflow: hidden; */
  transition: all 0.6s ease-in-out;
}

.hide-paid {
  height: 0;
  overflow: hidden;
  transition: all 0.6s ease-in-out;
}

.input-width {
  width: 100%
}

.input-width {
  width: 100%
}

@media (min-width: 992px) {
  .input-width {
    width: 350px
  }

}

@media (max-width: 576px) {
  .show-tem-free {
    height: 1241px;
  }

  .show-tem {
    height: 1774px;
    /* overflow: hidden; */
    transition: all 1s ease-in-out;
  }

  .show-paid {
    height: 560px;
    /* overflow: hidden; */
    transition: all 0.6s ease-in-out;
  }
}

.show-amount {
  /* width: 100%;
  overflow: hidden; */
  transform: translateX(0px);
  opacity: 1;
  transition: all 0.6s ease-in-out;
}

.hide-amount {
  opacity: 0;
  transition: all 0.6s ease-in-out;
}

#second {
  width: 100%;
}

.div-card {
  position: absolute;
  background: white;
  z-index: 1;
  width: 100%;
  top: 40px;
  box-shadow: 0 0 11px rgba(33, 33, 33, 0.2);
  max-height: 400px;
  overflow: scroll;
}

.eachGroup {
  padding: 5px 10px;
  background: #eee;
  border-radius: 25px;
  margin: 0 3px;
}

.angle-icon {
  border: 1px solid #dde2e6;
  padding: 2px;
  border-radius: 50%;
  height: 30px;
  width: 30px;
  color: #91949c;
}
</style>