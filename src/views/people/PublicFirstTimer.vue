<template>
  <div class="my-con container container-top">
    <div class="row">
      <div class="col-md-12 d-flex justify-content-center my-3">
        <div class="col-md-3 mt-4 d-flex align-items-center">
          <div class="pl-2">
            <img
              :src="churchLogo2"
              v-if="churchLogo2"
              class="link-image"
              alt=""
              style="width: 60px"
            />
            <img
              src="../../assets/dashboardlinks/churchcloud.png"
              v-else
              class="link-image"
              alt=""
            />
          </div>
          <span
            ><h4 class="font-weight-bold mt-3">
              {{ churchName ? churchName : "Churchplus" }}
            </h4></span
          >
        </div>
      </div>

      <div class="row">
        <h3 class="col-12 head-text font-weight-bold">Add First timers</h3>
        <div class="mt-3 col-12">Bio:</div>
      </div>
    </div>
    <!-- <div class="my-con container-top" @click="closeManualModalIfOpen"> -->
    <el-container>
      <el-row :gutter="15" class="w-100 m-0">
        <el-col class="d-block d-md-none">
          <div class="grey-bg">
            <div class="">
              <!-- <ImageForm @pictureurl="setImageToUrl" /> -->
              <div class="person-img">
                <img
                  v-if="!url"
                  src="../../assets/people/phone-import.svg"
                  alt="Uploaded Image"
                />
                <img
                  v-else
                  :src="url"
                  alt="Uploaded Image"
                  style="
                    width: 110px;
                    height: 110px;
                    border-radius: 50%;
                    object-fit: cover;
                  "
                />
              </div>
            </div>
            <div>
              <div class="cs-input">
                <label for="imgUpload" class="choose-file">
                  Choose image
                  <input
                    type="file"
                    class="input file-input"
                    placeholder=""
                    id="imgUpload"
                    @change="imageSelected"
                  />
                </label>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :sm="16" :md="16" :lg="16" :xl="16" class="p-0">
          <el-form
            :model="firstTimersObj"
            ref="ruleForm"
            :rules="validateRules"
            style="width: 100%"
          >
            <el-form-item>
              <div
                class="d-flex flex-column flex-lg-row justify-content-end w-100"
              >
                <label for="firstName" class="mr-3 font-weight-600"
                  >Firstname<span style="color: red"> *</span></label
                >
                <el-input
                  type="text"
                  class="input-width"
                  v-model="firstTimersObj.firstName"
                  placeholder="First name"
                />
              </div>
            </el-form-item>
            <el-form-item>
              <div
                class="d-flex flex-column flex-lg-row justify-content-end w-100"
              >
                <label for="firstName" class="mr-3 font-weight-600"
                  >Surname</label
                >
                <el-input
                  type="text"
                  class="input-width"
                  v-model="firstTimersObj.lastName"
                  placeholder="Last name"
                />
              </div>
            </el-form-item>
            <el-form-item prop="phoneNumber" class="validate-phone">
              <div
                class="d-flex flex-column flex-lg-row justify-content-end w-100"
              >
                <label for="firstName" class="mr-3 font-weight-600"
                  >Phone number</label
                >
                <el-input
                  type="number"
                  ref="validatePhone"
                  @blur="checkForDuplicatePhone"
                  class="input-width"
                  v-model="firstTimersObj.phoneNumber"
                  placeholder="Phone number"
                />
              </div>
            </el-form-item>
            <el-form-item prop="email" class="validate-email">
              <div
                class="d-flex flex-column flex-lg-row justify-content-end w-100"
              >
                <label for="firstName" class="mr-3 font-weight-600"
                  >Email</label
                >
                <el-input
                  type="text"
                  class="input-width"
                  v-model="firstTimersObj.email"
                  placeholder="Email"
                />
              </div>
            </el-form-item>
            <el-form-item>
              <div
                class="d-flex flex-column flex-lg-row justify-content-end w-100"
              >
                <div class="input-width d-flex">
                  <el-select-v2
                    v-model="maritalStatusId"
                    @change="setSelectedMaritalStatus"
                    :options="
                      maritalStatusArr.map((i) => ({
                        label: i.value,
                        value: i.id,
                      }))
                    "
                    placeholder="Marital status"
                    size="large"
                    class="w-100 mr-1"
                  />
                  <el-select-v2
                    v-model="genderId"
                    @change="setSelectedGender"
                    :options="
                      genderArr && genderArr.length > 0
                        ? genderArr.map((i) => ({
                            label: i.value,
                            value: i.id,
                          }))
                        : []
                    "
                    placeholder="Gender"
                    size="large"
                    class="w-100 ml-1"
                  />
                </div>
              </div>
            </el-form-item>
            <el-form-item>
              <div
                class="d-flex flex-column flex-lg-row justify-content-end w-100"
              >
                <label for="firstName" class="mr-3 font-weight-600"
                  >Event or service attended</label
                >
                <div class="input-width">
                  <el-dropdown class="w-100" trigger="click">
                    <el-input
                      class="w-100"
                      placeholder="Search for events"
                      v-model="selectedEventAttended.name"
                    />
                    <template #dropdown>
                      <el-dropdown-menu class="menu-height">
                        <el-dropdown-item
                          v-for="(event, index) in filteredEvents"
                          :key="index"
                          @click="eventAttendedSelected(event)"
                          >{{ event.name }}</el-dropdown-item
                        >
                        <!-- <el-dropdown-item
                          class="d-flex justify-content-center text-primary font-weight-700"
                          data-toggle="modal"
                          data-target="#eventModal"
                          divided
                          ><el-icon>
                            <CirclePlus />
                          </el-icon>
                          Create new event</el-dropdown-item
                        > -->
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                </div>
              </div>
            </el-form-item>
            <el-form-item>
              <div
                class="d-flex flex-column flex-lg-row justify-content-end w-100"
              >
                <label for="firstName" class="mr-3 font-weight-600"
                  >Address</label
                >
                <el-input
                  type="text"
                  class="input-width"
                  v-model="firstTimersObj.address"
                  placeholder="Address"
                />
              </div>
            </el-form-item>
            <el-form-item>
              <div
                class="d-flex flex-column flex-lg-row justify-content-end w-100"
              >
                <div class="mr-3 font-weight-600">Birthday</div>
                <div class="input-width d-flex">
                  <el-select-v2
                    v-model="firstTimersObj.birthday"
                    :options="day.map((i) => ({ label: i, value: i }))"
                    placeholder="Day"
                    size="large"
                    class="w-100 mr-1"
                  />
                  <el-select-v2
                    v-model="birthMonth"
                    :options="month.map((i) => ({ label: i, value: i }))"
                    placeholder="Month"
                    size="large"
                    class="w-100 ml-1"
                  />
                  <el-select-v2
                    v-model="firstTimersObj.birthYear"
                    :options="year.map((i) => ({ label: i, value: i }))"
                    placeholder="Year"
                    size="large"
                    class="w-100 ml-1"
                  />
                </div>
              </div>
            </el-form-item>
            <!-- <el-form-item>
              <div
                class="d-flex flex-column flex-lg-row justify-content-end w-100"
              >
                <label for="firstName" class="mr-3 font-weight-600"
                  >Person to follow-up</label
                >
                <div class="input-width">
                  <SearchMembers
                    @memberdetail="setContact"
                    :currentMember="firstTimersObj"
                  />
                </div>
              </div>
            </el-form-item> -->
            <el-form-item>
              <div
                class="d-flex flex-column flex-lg-row justify-content-end w-100"
              >
                <label for="firstName" class="mr-3 font-weight-600"
                  >Which Group[s] Do You Belong To?</label
                >
                <div class="input-width  border">
                  <div class="p-2  add-group bg-white">
                    <div
                      v-for="(item, index) in firstTimerInGroup"
                      :key="index"
                    >
                      <div class="pt-1">{{ index + 1 }}. {{ item.name }}</div>
                    </div>
                    <div v-if="firstTimerInGroup.length === 0">
                      No group added yet
                    </div>
                    <div
                      class="font-weight-700 primary--text  border-top text-center c-pointer"
                      data-toggle="modal"
                      data-target="#addToGroup"
                    >
                      Choose group
                    </div>
                  </div>
                </div>
              </div>
            </el-form-item>
            <el-form-item
              v-for="(item, index) in dynamicCustomFields"
              :key="index"
            >
              <div
                class="d-flex flex-column flex-lg-row justify-content-end w-100"
              >
                <label for="occupation" class="mr-3 font-weight-600">{{
                  item.label
                }}</label>
                <div class="input-width d-flex" v-if="item.controlType == 1">
                  <el-select-v2
                    v-model="item.data"
                    :options="
                      item.parameterValues
                        .split(',')
                        .map((i) => ({ label: i, value: i }))
                    "
                    :placeholder="item.label"
                    size="large"
                    class="w-100 mr-1"
                  />
                </div>
                <el-input
                  type="text"
                  class="input-width"
                  v-model="item.data"
                  :placeholder="item.label"
                  v-if="item.controlType == 0"
                />
                <el-input
                  type="number"
                  class="input-width"
                  v-model="item.data"
                  :placeholder="item.label"
                  v-if="item.controlType == 7"
                />
                <el-input
                  type="email"
                  class="input-width"
                  v-model="item.data"
                  :placeholder="item.label"
                  v-if="item.controlType == 4"
                />
                <div class="input-width" v-if="item.controlType == 2">
                  <el-checkbox v-model="item.data" size="large" />
                </div>
                <el-date-picker
                  v-model="item.data"
                  class="input-width"
                  type="date"
                  :placeholder="item.label"
                  size="default"
                  v-if="item.controlType == 3"
                />
                <div
                  class="d-flex align-items-center"
                  v-if="item.controlType == 6"
                >
                  <input
                    type="file"
                    class="form-control input-width"
                    @change="uploadImage($event, index)"
                    :placeholder="item.label"
                  />
                  <el-icon class="is-loading ml-2" v-if="customFileLoading">
                    <Loading />
                  </el-icon>
                </div>
              </div>
            </el-form-item>
            <div class="d-flex align-items-center">
              <div class="font-weight-700">Insights:</div>
              <el-divider> </el-divider>
              <span>
                <el-icon
                  class="angle-icon tb-icon-span"
                  @click="showAddInfo = !showAddInfo"
                >
                  <ArrowDownBold />
                </el-icon>
              </span>
            </div>
            <el-collapse-transition>
              <div v-show="showAddInfo">
                <el-form-item>
                  <div
                    class="d-flex flex-column flex-lg-row justify-content-end w-100"
                  >
                    <div class="input-width">
                      <el-select-v2
                        v-model="sourceId"
                        @change="setSelectedSource"
                        :options="
                          howDidYouAboutUs.map((i) => ({
                            label: i.name,
                            value: i.id,
                          }))
                        "
                        placeholder="How did you hear about us?"
                        size="large"
                        class="w-100 mr-1"
                      />
                    </div>
                  </div>
                </el-form-item>
                <el-form-item>
                  <div
                    class="d-flex flex-column flex-lg-row justify-content-end w-100"
                  >
                    <div class="input-width">
                      <el-select-v2
                        v-model="selectedCommunicationMeans"
                        :options="
                          comMeansArr.map((i) => ({ label: i, value: i }))
                        "
                        placeholder="Means of communication"
                        size="large"
                        class="w-100 mr-1"
                      />
                    </div>
                  </div>
                </el-form-item>
                <el-form-item>
                  <div
                    class="d-flex flex-column flex-lg-row justify-content-end w-100"
                  >
                    <div class="input-width">
                      <el-select-v2
                        v-model="selectedJoinInterest"
                        :options="
                          joinInterestArr.map((i) => ({ label: i, value: i }))
                        "
                        placeholder="Interested in joining us?"
                        size="large"
                        class="w-100 mr-1"
                      />
                    </div>
                  </div>
                </el-form-item>
                <el-form-item>
                  <div
                    class="d-flex flex-column flex-lg-row justify-content-end w-100"
                  >
                    <div class="input-width">
                      <el-select-v2
                        v-model="selectedVisitOption"
                        :options="
                          wantVisitArr.map((i) => ({ label: i, value: i }))
                        "
                        placeholder="Want to be visited?"
                        size="large"
                        class="w-100 mr-1"
                      />
                    </div>
                  </div>
                </el-form-item>
              </div>
            </el-collapse-transition>
            <el-form-item>
              <div
                class="d-flex flex-column flex-lg-row justify-content-end w-100"
              >
                <div class="input-width">
                  <div class="d-flex flex-column">
                    <!-- <el-button
                      class="secondary-button"
                      @click.prevent="onCancel"
                      round
                      >Cancel</el-button
                    > -->
                    <!-- <el-button
                      @click.prevent="onSubmit"
                      :loading="loading"
                      class="secondary-button my-3 mx-0"
                      round
                      >Save and add another</el-button
                    > -->
                    <el-button
                      class="mx-0 mx-sm-2 text-white"
                      :color="primarycolor"
                      :loading="loading"
                      :disabled="loading || !firstTimersObj.firstName"
                      @click.prevent="onSubmit"
                      round
                      >Save</el-button
                    >
                  </div>
                </div>
              </div>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
          <div class="grey-bg d-none d-md-block">
            <div class="grey-bg">
              <div>
                <div class="person-img ">
                  <!-- <ImageForm @pictureurl="setImageToUrl" /> -->
                  <img
                    v-if="!url"
                    src="../../assets/people/phone-import.svg"
                    alt="Uploaded Image"
                  />
                  <img
                    v-else
                    :src="url"
                    alt="Uploaded Image"
                    style="
                      width: 110px;
                      height: 110px;
                      border-radius: 50%;
                      object-fit: cover;
                    "
                  />
                </div>
              </div>
              <div>
                <div class="cs-input">
                  <label for="imgUpload" class="choose-file">
                    Choose image
                    <input
                      type="file"
                      class="input file-input"
                      placeholder=""
                      id="imgUpload"
                      @change="imageSelected"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-container>

    <!-- <div
      class="modal fade"
      id="eventModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="eventModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content py-2 px-2">
          <div class="modal-header">
            <h5 class="modal-title font-weight-bold" id="exampleModalLabel">
              Create New Event
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
          <div class="modal-body new-event-modal">
            <div class="row my-4">
              <div class="col-md-4 text-md-right align-self-center">
                <label for="" class="label font-weight-bold">Event name</label>
              </div>
              <div class="col-md-7">
                <div class="input-width">
                  <el-dropdown class="w-100" trigger="click">
                    <el-input
                      class="w-100"
                      placeholder="Search for events"
                      v-model="selectEvent"
                    />
                    <template #dropdown>
                      <el-dropdown-menu class="menu-height">
                        <el-dropdown-item
                          v-for="(eventCategory, index) in filterEventCategory"
                          :key="index"
                          @click="individualEvent(eventCategory)"
                          >{{ eventCategory.name }}</el-dropdown-item
                        >
                        <el-dropdown-item
                          class="d-flex justify-content-center text-primary font-weight-700"
                          v-if="filterEventCategory.length >= 1"
                          @click="openModal"
                          divided
                          ><el-icon>
                            <CirclePlus />
                          </el-icon>
                          Add new event</el-dropdown-item
                        >
                        <el-dropdown-item
                          class="text-primary font-weight-700"
                          v-else
                          @click="createNewCat(1)"
                          divided
                          ><el-icon>
                            <CirclePlus />
                          </el-icon>
                          Create "{{ selectEvent }}" event</el-dropdown-item
                        >
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                </div>

                <el-dialog
                  v-model="displayModal"
                  title="Add New Event"
                  :width="mdAndUp || lgAndUp || xlAndUp ? `50%` : `90%`"
                >
                  <div class="row">
                    <div class="col-sm-3 align-self-center text-sm-right">
                      Event Name
                    </div>
                    <div class="col-sm-9">
                      <el-input type="text" v-model="newEventCategoryName" />
                    </div>
                  </div>
                  <template #footer>
                    <span
                      class="dialog-footer d-flex justify-content-end text-center"
                    >
                      <el-button
                        class="secondary-button"
                        @click="displayModal = false"
                        round
                        >Cancel</el-button
                      >
                      <el-button
                        :color="primarycolor"
                        :loading="createCatLoading"
                        @click="createNewCat(2)"
                        round
                      >
                        Save
                      </el-button>
                    </span>
                  </template>
                </el-dialog>
              </div>
            </div>
            <div class="row mt-4 mb-4">
              <div class="col-md-4 text-md-right align-self-center">
                <label for="" class="label font-weight-bold">Event date</label>
              </div>
              <div class="col-md-7 pr-0">
                <input
                  type="date"
                  class="form-control"
                  v-model="newEvent.activity.date"
                />
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <div class="container">
              <div class="row">
                <div class="col-md-4"></div>
                <div class="col-md-7">
                  <div class="row">
                    <div class="col-md-12 text-md-right">
                      <p class="mb-1 text-danger" v-if="invalidEventDetails">
                        Enter event name and date
                      </p>
                    </div>
                    <div class="pr-0 col-md-12 d-md-flex justify-content-end">
                      <el-button
                        class="secondary-button"
                        data-dismiss="modal"
                        round
                        >Cancel</el-button
                      >
                      <el-button
                        :color="primarycolor"
                        data-dismiss="modal"
                        @click="createNewEvent"
                        round
                      >
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
    </div> -->

    <!-- Modal -->
    <div
      class="modal fade"
      id="addToGroup"
      tabindex="-1"
      role="dialog"
      aria-labelledby="addToGroup"
      aria-hidden="true"
      @click="hideGroupModal"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header" style="background: #ebeff4">
            <h5 class="modal-title font-weight-bold" id="addToGroup">
              Group Membership
            </h5>
            <el-button
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
            <el-icon class="mt-0"><Close /></el-icon>
              <!-- <span aria-hidden="true">&times;</span> -->
            </el-button>
          </div>
          <div class="modal-body">
            <div class="row my-4">
              <div class="col-md-4 text-md-right">
                <label for="" class="font-weight-600">Name</label>
              </div>
              <div class="col-md-7">
                <el-tree-select
                  v-model="selectedTree"
                  class="w-100"
                  placeholder="Select group"
                  :data="groupMappedTree"
                  :render-after-expand="false"
                  :filter-node-method="filterNodeMethod"
                  @change="setGroupValue"
                  filterable
                  check-strictly
                />
              </div>
            </div>

            <div class="row">
              <div class="col-md-4 text-md-right">
                <label for="" class="font-weight-600">Position</label>
              </div>
              <div class="col-md-7">
                <el-input
                  type="text"
                  v-model="position"
                  class="w-100"
                  placeholder="e.g Member"
                />
              </div>
            </div>

            <div class="row">
              <div class="col-md-4">
                <label for="" class="font-weight-600"></label>
              </div>

              <div class="col-md-7">
                <div class="col-md-12 mt-3 text-center">
                  <p class="my-1 text-danger" v-if="addToGroupError">
                    Please select a group
                  </p>
                </div>
                <div class="row mt-2 d-md-flex justify-content-end">
                  <el-button class="secondary-button" data-dismiss="modal" round
                    >Cancel</el-button
                  >
                  <el-button
                    :color="primarycolor"
                    class="text-white"
                    :data-dismiss="dismissAddToGroupModal"
                    @click="addMemberToGroup"
                    round
                    >Save</el-button
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <div class="container container-top">
    <div class="col-md-12 d-flex justify-content-center my-3">
      <div class="col-md-3 mt-4 d-flex align-items-center">
        <div class="pl-2">
          <img
            :src="churchLogo2"
            v-if="churchLogo2"
            class="link-image"
            alt=""
            style="width: 60px"
          />
          <img
            src="../../assets/dashboardlinks/churchcloud.png"
            v-else
            class="link-image"
            alt=""
          />
        </div>
        <span
          ><h4 class="font-weight-bold mt-3">
            {{ churchName ? churchName : "Churchplus" }}
          </h4></span
        >
      </div>
    </div>

    <div class="row">
      <h3 class="col-12 header-text font-weight-bold">Add First timers</h3>
      <div class="mt-3 col-12">Bio:</div>
    </div>
    <div class="row">
      <div class="col-md-8 mt-3">
        <div>
          <div class="d-md-flex justify-content-md-end">
            <label for="" class="label">Event or Service Attended</label>
            <Dropdown
              v-model="selectedEventAttended"
              :options="eventsAttended"
              optionLabel="name"
              placeholder="Select event"
              class="input dd small-text widen p-0"
            />
          </div>
        </div>
        <div>
          <div class="d-md-flex justify-content-md-end mt-3">
            <label for="" class="label"
              >Firstname<span style="color: red"> *</span></label
            >
            <input
              type="text"
              class="input form-control"
              v-model="firstTimersObj.firstName"
              name=""
              id="firstname"
              required
            />
          </div>
        </div>
        <div>
          <div class="d-md-flex justify-content-md-end mt-3">
            <label for="" class="label">Surname</label>
            <input
              type="text"
              class="input form-control"
              placeholder=""
              v-model="firstTimersObj.lastName"
              name=""
            />
          </div>
        </div>
        <div>
          <div class="d-md-flex justify-content-md-end mt-3">
            <label for="" class="label">Phone number</label>
            <input
              class="input form-control"
              placeholder=""
              v-model="firstTimersObj.phoneNumber"
              type="text"
              :class="{ 'is-invalid': !isPhoneValid }"
              id="phone number"
              ref="validatePhone"
              @blur="checkForDuplicatePhone"
            />
          </div>
        </div>
        <div>
          <div class="d-md-flex justify-content-md-end mt-3">
            <div class="status-n-gender">
              <div class="status cstm-select">
                <div class="cs-select">
                  <Dropdown
                    v-model="selectedMaritalStatus"
                    :options="maritalStatusArr"
                    optionLabel="value"
                    placeholder="Marital status"
                    style="width: 100%"
                  />
                </div>
              </div>
              <div class="gender cstm-select">
                <div class="cs-select">
                  <Dropdown
                    v-model="selectedGender"
                    :options="genderArr"
                    optionLabel="value"
                    placeholder="Gender"
                    style="width: 100%"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="d-md-flex justify-content-md-end mt-3">
            <label for="" class="label">Email</label>
            <input
              class="input form-control"
              placeholder=""
              v-model="firstTimersObj.email"
              type="email"
              :class="{ 'is-invalid': !isEmailValid }"
              id="email"
              ref="validateEmail"
              @blur="checkForDuplicateEmail"
            />
          </div>
        </div>
        <div>
          <div class="d-md-flex justify-content-md-end mt-3">
            <label for="" class="label">Address</label>
            <input
              type="text"
              class="input form-control"
              placeholder=""
              v-model="firstTimersObj.address"
            />
          </div>
        </div>
        <div>
          <div class="d-md-flex justify-content-md-end mt-3 ">
            <label for="" class="label">Which Group[s] Do You Belong To?</label>
              <div class="p-2 border   add-group bg-white">
                <div v-for="(item, index) in firstTimerInGroup" :key="index">
                  <div class="pt-1">{{ index + 1 }}. {{ item.name }}</div>
                </div>
                <div v-if="firstTimerInGroup.length === 0">
                  No group added yet
                </div>
                <div class="
                  font-weight-700
                  text-primary
                  border-top
                  text-center
                  c-pointer
                " data-toggle="modal" data-target="#addToGroup">
                  Choose group
                </div>
              </div>
          </div>
        </div>
        <div v-for="item in dynamicCustomFields" :key="item.id">
          <div class="d-md-flex flex-wrap justify-content-md-end mt-3">
            <label for="" class="label">{{ item.label }}</label>
            <input
              v-if="item.controlType == 0"
              class="input form-control"
              type="text"
              aria-required=""
              v-model="item.data"
            />
            <Dropdown
              v-else-if="item.controlType == 1"
              v-model="item.data"
              :options="item.parameterValues.split(',')"
              placeholder="Select option"
              class="input dd small-text widen p-0"
            />
            <div v-else-if="item.controlType == 2" style="width: 330px">
              <Checkbox
                v-model="item.data"
                :binary="true"
                style="width: 100%"
              />
            </div>
            <Calendar
              v-if="item.controlType == 3"
              id="time24"
              v-model="item.data"
              :showTime="true"
              :showSeconds="true"
              class="input border-0 dd small-text widen p-0"
            />

            <input
              v-if="item.controlType == 4"
              class="input form-control"
              type="email"
              aria-required=""
              v-model="item.data"
            />
            <input
              v-if="item.controlType == 6"
              class="input"
              type="file"
              aria-required=""
            />
            <input
              v-if="item.controlType == 7"
              class="input form-control"
              :class="{ 'is-invalid': !isPhoneValid }"
              type="number"
              aria-required=""
              v-model="item.data"
            />
          </div>
        </div>
        <div>
          <div class="d-md-flex justify-content-md-end mt-3">
            <label for="" class="label">Birthday</label>
            <div class="status-n-gender">
              <div class="cstm-select">
                <div class="cs-select" style="width: 87px">
                  <Dropdown
                    v-model="firstTimersObj.birthday"
                    :options="day"
                    placeholder="Day"
                    style="width: 100%"
                  />
                </div>
              </div>
              <div class="cstm-select">
                <div class="cs-select" style="width: 111px">
                  <Dropdown
                    v-model="birthMonth"
                    :options="month"
                    placeholder="Month"
                    style="width: 100%"
                  />
                </div>
              </div>

              <div class="cstm-select mr-0">
                <div class="cs-select" style="width: 113px">
                  <Dropdown
                    v-model="firstTimersObj.birthYear"
                    :options="year"
                    placeholder="Year"
                    style="width: 100%"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4 img-parent">
        <div style="width: 225px; margin: 0 auto">
          <ImageForm @pictureurl="setImageToUrl" />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 mt-3">
        <div class="mt-2">
          <div class="d-flex justify-content-center">
            <button
              class="
                primary-bg
                px-md-4
                outline-none
                default-btn
                text-white
                border-0
              "
              @click.prevent="onSubmit"
              :disabled="loading || !firstTimersObj.firstName"
            >
              <i
                class="pi pi-spin pi-spinner text-white mr-2"
                v-if="loading"
              ></i>
              Save
            </button>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-md-6 text-center align-item-center px-md-4 mb-4 mt-5">
            <a href="/" class="text-decoration-none">
              <div class="">Powered by</div>
              <div class="img-fluid col-6 offset-3 col-md-4 offset-md-4 px-0">
                <img
                  src="../../assets/logoblue.png"
                  alt="churchplus Logo"
                  class="w-50 mx-2"
                />
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  <div
      class="modal fade"
      id="addToGroup"
      tabindex="-1"
      role="dialog"
      aria-labelledby="addToGroup"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header" style="background: #ebeff4">
            <h5 class="modal-title font-weight-bold" id="addToGroup">
              Group Membership
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
            <div class="row my-4">
              <div class="col-md-4 text-md-right">
                <label for="" class="font-weight-600">Name</label>
              </div>
              <div class="col-md-7">
                <div class="dropdown show">
                  <button
                    class="btn border w-100 d-flex justify-content-between align-items-center"
                    type="button"
                    id="dropdownMenuLink"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    @click="focusInput"
                  >
                    <div>
                      {{
                        Object.keys(groupToAddTo).length > 0
                          ? groupToAddTo.name
                          : "Select a group"
                      }}
                    </div>
                    <i class="pi pi-chevron-down"></i>
                  </button>
                  <div
                    class="dropdown-menu w-100 scroll-card"
                    aria-labelledby="dropdownMenuLink"
                  >
                    <input
                      type="text"
                      v-model="searchGroupText"
                      class="form-control input-width-adjust"
                      placeholder="Search groups"
                      ref="searchRef"
                    />
                    <a
                      class="dropdown-item"
                      v-for="item in searchAllGroups"
                      :key="item.id"
                    >
                      <div class="c-pointer" @click="selectGroup(item)">
                        {{ item.name }}
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-4 text-md-right">
                <label for="" class="font-weight-600">Position</label>
              </div>
              <div class="col-md-7">
                <input
                  type="text"
                  v-model="position"
                  class="form-control"
                  placeholder="e.g Member"
                />
              </div>
            </div>

            <div class="row">
              <div class="col-md-4">
                <label for="" class="font-weight-600"></label>
              </div>

              <div class="col-md-7">
                <div class="col-md-12 mt-3 text-center">
                  <p class="my-1 text-danger" v-if="addToGroupError">
                    Please select a group
                  </p>
                </div>
                <div class="row mt-2">
                  <div class="col-md-6 d-md-flex justify-content-end">
                    <button class="default-btn" data-dismiss="modal">
                      Cancel
                    </button>
                  </div>
                  <div class="col-md-6">
                    <button
                      class="default-btn primary-bg border-0 text-white"
                      :data-dismiss="dismissAddToGroupModal"
                      @click="addMemberToGroup"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div> -->

  <!-- <div class="row">
      <span class="celeb-tab col-12 my-3" @click="showCelebTab">
        <span class="tab-header">More:</span>
        <span class="w-100"><hr class="hr w-100" /></span>
        <span>
          <span class="tb-icon-span"
            ><i
              class="pi pi-angle-down tbb-icon"
              :class="{ 'tb-icon': !hideCelebTab }"
            ></i
          ></span>
        </span>
      </span>

      <div
        class="col-12"
        :class="{ 'hide-tab': hideCelebTab, 'show-tab': !hideCelebTab }"
      >
        <div class="col-md-8 mt-3 p-0 p-sm-1">
          <div>
            <div class="d-md-flex justify-content-md-end">
              <Dropdown
                v-model="selectedAboutUsSource"
                :options="howDidYouAboutUs"
                optionLabel="name"
                placeholder="How did you hear about us?"
                class="input p-0"
              />
            </div>
          </div>
          <div>
            <div class="d-md-flex justify-content-md-end mt-3">
              <Dropdown
                v-model="selectedCommunicationMeans"
                :options="comMeansArr"
                placeholder="Means of communication"
                class="input p-0"
              />
            </div>
          </div>
          <div>
            <div class="d-md-flex justify-content-md-end mt-3">
              <Dropdown
                v-model="selectedJoinInterest"
                :options="joinInterestArr"
                placeholder="Interested in joining us?"
                class="input p-0"
              />
            </div>
          </div>
          <div>
            <div class="d-md-flex justify-content-md-end mt-3">
              <Dropdown
                v-model="selectedVisitOption"
                :options="wantVisitArr"
                placeholder="Want to be visited?"
                class="input p-0"
              />
            </div>
          </div>
        </div>
        <div class="col-4 mt-3"></div>
      </div>
    </div> -->
</template>

<script>
import { ref, onMounted, reactive, computed, inject } from "vue";
import axios from "@/gateway/backendapi";
import router from "@/router/index";
import InputText from "primevue/inputtext";
import Dropdown from "primevue/dropdown";
import { useRoute } from "vue-router";
import Calendar from "primevue/calendar";
import Dialog from "primevue/dialog";
import finish from "../../services/progressbar/progress";
import setupService from "../../services/setup/setupservice";
import ImageForm from "../../components/membership/ImageForm.vue";
import grousService from "../../services/groups/groupsservice";
import collector from "../../services/groupArray/mapTree";
import flatten from "../../services/groupArray/flatTree";
import deviceBreakpoint from "../../mixins/deviceBreakpoint";
import { useStore } from "vuex";
import swal from "sweetalert";
import { ElMessage } from 'element-plus'

export default {
  components: { Dropdown, Dialog, ImageForm, InputText, Calendar },

  setup() {
    const store = useStore();
    const showError = ref(false);
    const churchLogo2 = ref("");
    const churchName = ref("");
    const newEvents = ref([]);
    const flattenedTree = ref([])
    const groupMappedTree = ref([])

    const day = ref([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
    ]);
    const month = ref([
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ]);
    const primarycolor = inject('primarycolor')
    const maritalStatusArr = ref([]);
    const selectedMaritalStatus = ref(null);
    const genderArr = ref([]);
    const selectedGender = ref(null);
    const comMeansArr = ref(["Call", "Email", "Visit", "SMS"]);
    const selectedCommunicationMeans = ref(null);
    const joinInterestArr = ref(["Yes", "No", "Maybe", "On Transit"]);
    const selectedJoinInterest = ref(null);
    const wantVisitArr = ref(["Yes", "No", "Maybe", "On Transit"]);
    const selectedVisitOption = ref(null);
    const eventsAttended = ref([]);
    const selectedEventAttended = ref({});
    const searchGroupText = ref("");
    const howDidYouAboutUs = ref([]);
    const selectedAboutUsSource = ref('');
    const searchRef = ref(null);
    const selectedFollowUp = ref(null);
    const maritalStatusId = ref(null);
    const genderId = ref(null);
    const sourceId = ref(null);
    const firstTimersObj = ref({
      sendWelcomeSMS: false,
      sendWelcomeEmail: true,
    });
    const showCategory = ref(false);
    const formdatImage = ref("");
    const eventText = ref("");
    const displayModal = ref(false);
    const selectEvent = ref("Select Event");
    const isPhoneValid = ref(true);
    const isEmailValid = ref(true);
    const customFileLoading = ref(false)
    const validatePhone = ref("");
    const validateEmail = ref("");
    const firstTimerPhone = ref("");
    const firstTimerEmail = ref("");
    const firstTimerInGroup = ref([]);
    const dynamicCustomFields = ref([]);
    const allGroups = ref([]);
    const selectedTree = ref();
    const groupToAddTo = ref({});
    const position = ref("");
    const addToGroupError = ref(false);
    const showAddInfo = ref(false);
    const dismissAddToGroupModal = ref("");
    const route = useRoute();
    const { mdAndUp, lgAndUp, xlAndUp, xsOnly } = deviceBreakpoint()

    const eventName = computed(() => {
      return newEvents.value.map((i) => i.name);
    });

    const getCustomFields = async () => {
      try {
        let { data } = await axios.get(
          `/GetAllCustomFields?entityType=1&&tenantID=${route.params.id}`
        );
        dynamicCustomFields.value = data.sort((a, b) => a.order - b.order);
      } catch (err) {
        console.log(err);
      }
    };
    getCustomFields();

    

    const getFirstTimer = async () => {
      try {
        const res = await axios.get(`/TenantInfo?tenantID=${route.params.id}`);

        churchLogo2.value = res.data.logo;
        churchName.value = res.data.name;
      } catch (error) {
        console.log(error);
      }
    };
    getFirstTimer();

    const setSelectedMaritalStatus = () => {
      selectedMaritalStatus.value = maritalStatusArr.value.find(i => {
        return i.id == maritalStatusId.value
      })
    }

    const setSelectedGender = () => {
      selectedGender.value = genderArr.value.find(i => {
        return i.id == genderId.value
      })
    }

    const setSelectedSource = () => {
      selectedAboutUsSource.value = howDidYouAboutUs.value.find(i => {
        return i.id === sourceId.value
      })
    }  
    
     const closeManualModalIfOpen = (e) => {
      if (!e.target.classList.contains("dd")) {
        // showEventList.value = false;
        eventsSearchString.value = "";
      }
    };

    const eventsSearchString = ref("");

    const filteredEvents = computed(() => {
      if (!selectedEventAttended.value.name) return eventsAttended.value;
      return eventsAttended.value.filter((i) =>
        i.name.toLowerCase().includes(selectedEventAttended.value.name.toLowerCase())
      );
    });

    const eventAttendedSelected = (eventObj) => {
      selectedEventAttended.value = eventObj;
      // showEventList.value = false;
      eventsSearchString.value = "";
    };

    const setGroupValue = () => {
      const response = flattenedTree.value.find(i => i.value == selectedTree.value)
      groupToAddTo.value = {
        name: response.label,
        id: response.value
      }
    }

    const filterEventCategory = computed(() => {
      // let x;
      let arr = [];
      if (newEvents.value.length > 0) {
        arr = newEvents.value.filter((i) => {
          return i.name.toLowerCase().includes(eventText.value.toLowerCase());
        });
      } else {
        return newEvents.value;
      }
      return arr;
    });

    const openModal = () => {
      displayModal.value = true;
    };

    const closeModal = () => {
      displayModal.value = false;
    };
    const focusInput = () => {
      setTimeout(() => {
        searchRef.value.focus();
      }, 1000);
    };

    const newEventCategoryName = ref("");

    const individualEvent = (obj) => {
      selectEvent.value = obj.name;
      newEvent.value.activity.eventCategoryId = obj.id;
      showCategory.value = false;
    };
    const filterNodeMethod = (value, data) => data.label.toLowerCase().includes(value.toLowerCase())

    const birthMonth = ref(null);
    const hideCelebTab = ref(true);
    const hideAddInfoTab = ref(true);
    const showCelebTab = () => (hideCelebTab.value = !hideCelebTab.value);
    const showAddInfoTab = () => (hideAddInfoTab.value = !hideAddInfoTab.value);

    const loading = ref(false);
    const url = ref("")

    const uploadImage = async (e, index) => {
      customFileLoading.value = true
      let formData = new FormData()
      formData.append("mediaFileImage", e.target.files[0])

      try {
        await axios.post("/api/Media/UploadProfilePicture", formData).then(res => {
          if (index) {
              customFileLoading.value = false
              dynamicCustomFields.value[index].data = res.data.pictureUrl
            }
            firstTimersObj.value.imageUrl = res.data.pictureUrl;
        })
      }
      catch (err) {
        console.error(err)
        customFileLoading.value = false
      }
    }

    const imageSelected = async(e) => {
      url.value = URL.createObjectURL(e.target.files[0]);
      await uploadImage(e)
    }

    const onSubmit = async () => {
      const formData = new FormData();
      formData.append(
        "genderId",
        selectedGender.value ? selectedGender.value.id : 0
      );

      formData.append(
        "maritalStatusId",
        selectedMaritalStatus.value ? selectedMaritalStatus.value.id : 0
      );
      formData.append(
        "activityID",
        selectedEventAttended.value && selectedEventAttended.value.activityID
          ? selectedEventAttended.value.activityID
          : ""
      );
      formData.append(
        "howDidYouAboutUsId",
        selectedAboutUsSource.value
          ? selectedAboutUsSource.value.id
          : "00000000-0000-0000-0000-000000000000"
      );

      formData.append(
        "communicationMeans",
        selectedCommunicationMeans.value
          ? comMeansArr.value.indexOf(selectedCommunicationMeans.value) + 1
          : 0
      );

      formData.append(
        "interestedInJoining",
        selectedJoinInterest.value
          ? joinInterestArr.value.indexOf(selectedJoinInterest.value) + 1
          : 0
      );
      formData.append(
        "wantToBeVisited",
        selectedVisitOption.value
          ? wantVisitArr.value.indexOf(selectedVisitOption.value) + 1
          : 0
      );
      formData.append("tenantId", route.params.id);
      formData.append("imageUrl", firstTimersObj.value && firstTimersObj.value.imageUrl ? firstTimersObj.value.imageUrl : "");
      // formData.append("imageUrl", formdatImage.value ? formdatImage.value : "");
      formData.append(
        "phoneNumber",
        firstTimersObj.value.phoneNumber ? firstTimersObj.value.phoneNumber : ""
      );
      formData.append(
        "email",
        firstTimersObj.value.email ? firstTimersObj.value.email : ""
      );
      formData.append(
        "lastName",
        firstTimersObj.value.lastName ? firstTimersObj.value.lastName : ""
      );
      formData.append(
        "firstName",
        firstTimersObj.value.firstName ? firstTimersObj.value.firstName : ""
      );
      formData.append(
        "birthYear",
        firstTimersObj.value.birthYear ? firstTimersObj.value.birthYear : ""
      );
      formData.append(
        "birthday",
        firstTimersObj.value.birthday ? firstTimersObj.value.birthday : ""
      );
      formData.append(
        "groupsString",
        firstTimerInGroup.value.length > 0
          ? JSON.stringify(
              firstTimerInGroup.value.map((i) => ({
                groupId: i.groupId,
                position: i.position,
              }))
            )
          : []
      );
      formData.append(
        "customAttributeDataString",
        JSON.stringify(
          dynamicCustomFields.value.map((i) => ({
            customAttributeID: i.id,
            data: i.data,
            entityID: route.params.personId,
          }))
        )
      );
      switch (birthMonth.value) {
        case "January":
          formData.append("birthMonth", "1");
          break;
        case "February":
          formData.append("birthMonth", "2");
          break;
        case "March":
          formData.append("birthMonth", "3");
          break;
        case "April":
          formData.append("birthMonth", "4");
          break;
        case "May":
          formData.append("birthMonth", "5");
          break;
        case "June":
          formData.append("birthMonth", "6");
          break;
        case "July":
          formData.append("birthMonth", "7");
          break;
        case "August":
          formData.append("birthMonth", "8");
          break;
        case "September":
          formData.append("birthMonth", "9");
          break;
        case "October":
          formData.append("birthMonth", "10");
          break;
        case "November":
          formData.append("birthMonth", "11");
          break;
        case "December":
          formData.append("birthMonth", "12");
          break;
        default:
          break;
      }

      loading.value = true;
      axios
        .post("/api/PublicContents/FirstTimer", formData)
        .then((res) => {
          finish();
          loading.value = false;
          swal("Successful", "First timer created successfully!", "success");

          firstTimersObj.value = {};
          birthMonth.value = "";
          selectedVisitOption.value = "";
          selectedJoinInterest.value = "";
          selectedCommunicationMeans.value = "";
          selectedAboutUsSource.value = "";
          selectedEventAttended.value = {};
          selectedMaritalStatus.value = "";
          selectedGender.value = "";
        })
        .catch((err) => {
          finish();
          loading.value = false;
          if (err.response) {
            ElMessage({
              type: 'warning',
              message: err.response.data,
              duration: 3000
            })
          } else {
            ElMessage({
              type: 'error',
              message: "Please ensure you have a strong internet  connection",
              duration: 3000
            })
          }
        });
      // router.push('/onboarding')
    };

    const onCancel = () => {
      router.back();
    };

    const newEvent = ref({
      activity: {},
    });
    const selectGroup = (item) => {
      groupToAddTo.value = item;
    };
    const searchAllGroups = computed(() => {
      if (!searchGroupText.value && allGroups.value.length > 0) {
        return allGroups.value;
      } else {
        return allGroups.value.filter((i) => {
          if (i.name)
            return i.name
              .toLowerCase()
              .includes(searchGroupText.value.toLowerCase());
        });
      }
    });

    const invalidEventDetails = ref(false);
    const savingNewEvent = ref(false);
    const firstTimer = ref({});

    

    const createNewCat = async (eventParams) => {
      try {
        let data;
        const theText =
          eventParams === 1 ? eventText.value : newEventCategoryName.value;
        data = await axios.post(`/api/EventCategory?name=${theText}`);
        newEvents.value = data.data;

        ElMessage({
              type: 'success',
              message: "Your new event was created successfully",
              duration: 3000
            })
      } catch (error) {
        ElMessage({
              type: 'error',
              message: error.response.data,
              duration: 3000
            })
      }
      displayModal.value = false;
      newEventCategoryName.value = "";
    };

    // const createNewEvent = async () => {
    //   // console.log(eventsAttended.value);
    //   invalidEventDetails.value = false;
    //   if (newEvent.value.activity.date) {
    //     try {
    //       savingNewEvent.value = true;
    //       console.log(newEvent.value);
    //       const { data } = await axios.post(
    //         "/api/Events/CreateActivity",
    //         newEvent.value
    //       );
    //       console.log(data);
    //       selectedEventAttended.value.activityID = data.currentEvent.id;
    //       selectedEventAttended.value.name = data.currentEvent.name
    //         ? data.currentEvent.name
    //         : "New event selected";
    //       // console.log(selectedEventAttended, "SAE");

    //       toast.add({
    //         severity: "success",
    //         summary: "Event created",
    //         detail: "Your new event was created successfully",
    //         life: 2500,
    //       });
    //       // newEvent.value.date = "";
    //       // newEvent.value.preEvent.name = "";

    //       console.log(data, "data");
    //     } catch (error) {
    //       if (error.response.data == "An Event with this name already exist") {
    //         toast.add({
    //           severity: "error",
    //           summary: "Event exist already",
    //           detail: error.response.data,
    //           life: 2500,
    //         });
    //       }
    //       /*eslint no-undef: "warn"*/
    //       NProgress.done();
    //       savingNewEvent.value = false;
    //       console.log(error.response);
    //     }
    //   } else {
    //     invalidEventDetails.value = true;
    //   }

    //   displayModal.value = false;
    // };
    const ftimerId = ref("");

    onMounted(() => {
      axios.get(`/EventActivity?tenantId=${route.params.id}`).then((res) => {
        eventsAttended.value = res.data.filter((i, index) => index < 5);
      });

      axios.get("/api/EventCategory").then((res) => {
        newEvents.value = res.data.map((i) => {
          return { id: i.id, name: i.name };
        });
      });

      axios
        .get("/api/LookUp/GetAllLookUps")
        .then((res) => {
          res.data.find((i) => {
            if (i.type.toLowerCase() === "gender") {
              genderArr.value = i.lookUps;
            }
            if (i.type.toLowerCase() === "maritalstatus") {
              maritalStatusArr.value = i.lookUps;
              if (ftimerId.value) {
                selectedMaritalStatus.value = maritalStatusArr.value.find(
                  (i) => i.id === firstTimersObj.value.maritalStatusId
                );
                selectedGender.value = genderArr.value.find(
                  (i) => i.id === firstTimersObj.value.genderId
                );
              }
            }
          });
        })
        .catch((err) => {
          finish();
          if (err.response && err.response.status === 401) {
            localStorage.setItem("token", "");
            setupService.clearStore();
            router.push("/");
          }
        });

      axios
        .get(`/howYouHeardAboutUs?tenantId=${route.params.id}`)
        .then((res) => {
          howDidYouAboutUs.value = res.data.map((i) => {
            return { name: i.name, id: i.id };
          });
        });
    });

    const year = computed(() => {
      const arrOfYears = [];
      let currentYear = new Date().getFullYear();
      while (arrOfYears.length <= 100) {
        arrOfYears.push(currentYear);
        currentYear = currentYear - 1;
      }
      return arrOfYears;
    });

    const checkForDuplicatePhone = async (rule, value, callback) => {
      if (route.params.firstTimerId) {
        try {
          let { data } = await axios.get(
            `/api/People/firstTimer/${route.params.firstTimerId}`
          );
          firstTimerPhone.value = data.phoneNumber;
          firstTimerEmail.value = data.email;
        } catch (err) {
          console.log(err);
        }
      }
      if (firstTimersObj.value.phoneNumber !== firstTimerPhone.value) {
        try {
          let { data } = await axios.get(
            `api/People/checkDuplicate?phoneNumber=${firstTimersObj.value.phoneNumber}`
          );
          if (data === "phone number") {
            return callback(new Error('Phone number already exist, try another'))
          } else if (data === "email and phone number") {
            return callback(new Error('Phone number and email already exist, try another'))
          }
          // if (data === "phone number") {
          //   isPhoneValid.value = false;
          // } else if (data === "email and phone number") {
          //   isPhoneValid.value = false;
          //   isEmailValid.value = false;
          // } else {
          //   isPhoneValid.value = true;
          //   validatePhone.value.classList.add("is-valid");
          // }
        } catch (error) {
          console.log(error);
        }
      }
    };

    const checkForDuplicateEmail = async (rule, value, callback) => {
      if (route.params.firstTimerId) {
        try {
          let { data } = await axios.get(
            `/api/People/firstTimer/${route.params.firstTimerId}`
          );
          firstTimerEmail.value = data.email;
        } catch (err) {
          console.log(err);
        }
      }

      if (firstTimersObj.value.email !== firstTimerEmail.value) {
        try {
          let { data } = await axios.get(
            `api/People/checkDuplicate?email=${firstTimersObj.value.email}`
          );
          if (data === "email") {
            return callback(new Error('Email already exist, try another'))
          } else if (data === "email and phone number") {
            return callback(new Error('Email and phone number already exist, try another'))
          }
          // if (data === "email") {
          //   isEmailValid.value = false;
          // } else if (data === "email and phone number") {
          //   isEmailValid.value = false;
          //   isPhoneValid.value = false;
          // } else {
          //   isEmailValid.value = true;
          //   validateEmail.value.classList.add("is-valid");
          // }
        } catch (error) {
          console.log(error);
        }
      }
    };

    const validateRules = reactive({
      email: [
        { validator: checkForDuplicateEmail, required: false, trigger: 'blur' },
      ],
      phoneNumber: [
        { validator: checkForDuplicatePhone, required: true, trigger: 'blur' },
      ],
    })
    const setImageToUrl = (payload) => {
      firstTimersObj.value.imageUrl = payload;
      formdatImage.value = payload;
    };

    const setContact = (payload) => {
      if (!payload.email) {
        ElMessage({
              type: 'warning',
              message: "This contact does not have any email records, communicate with this person to create him as a user",
              duration: 3000
            })
      }
      firstTimersObj.value.contactOwnerId = payload.id;
    };

    const getGroups = async () => {
      try {
        let groups = store.getters["groups/groups"];

        if (groups && groups.length > 0) {
          allGroups.value = groups;
          let data = { children: allGroups.value }
          const { children } = collector(data);
          groupMappedTree.value = children
          if (groupMappedTree.value && groupMappedTree.value.length > 0) {
            flattenedTree.value = groupMappedTree.value.flatMap(flatten());
          }
          return true;
        } else {
          let group = await grousService.getGroups();
          if (group) {
            allGroups.value = group.response.groupResonseDTO;
             let data = { children: allGroups.value }
            const { children } = collector(data);
            groupMappedTree.value = children
            if (groupMappedTree.value && groupMappedTree.value.length > 0) {
              flattenedTree.value = groupMappedTree.value.flatMap(flatten());
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    getGroups();

    const addMemberToGroup = async () => {
      addToGroupError.value = false;
      if (!groupToAddTo.value || !groupToAddTo.value.id) {
        addToGroupError.value = true;
        return false;
      }
      dismissAddToGroupModal.value = "modal";
      firstTimerInGroup.value.push({
        name: groupToAddTo.value.name,
        groupId: groupToAddTo.value.id,
        position: position.value,
      });

      groupToAddTo.value = {};
      position.value = "";
    };

    return {
      onSubmit,
      searchGroupText,
      setSelectedMaritalStatus,
      setSelectedGender,
      onCancel,
      firstTimersObj,
      day,
      month,
      customFileLoading,
      year,
      maritalStatusArr,
      genderArr,
      eventsAttended,
      howDidYouAboutUs,
      joinInterestArr,
      wantVisitArr,
      comMeansArr,
      loading,
      imageSelected,
      selectedGender,
      selectedMaritalStatus,
      selectedEventAttended,
      selectedAboutUsSource,
      sourceId,
      selectedCommunicationMeans,
      selectedJoinInterest,
      selectedVisitOption,
      selectedFollowUp,
      hideCelebTab,
      showCelebTab,
      showAddInfoTab,
      formdatImage,
      closeManualModalIfOpen,
      hideAddInfoTab,
      birthMonth,
      churchLogo2,
      url,
      churchName,
      newEvent,
      searchAllGroups,
      selectGroup,

      //   createNewEvent,
      invalidEventDetails,
      groupMappedTree,
      savingNewEvent,
      route,
      firstTimer,
      filteredEvents,
      showError,
      newEvents,
      eventName,
      flattenedTree,
      searchRef,
      focusInput,
      showCategory,
      eventAttendedSelected,
      primarycolor,
      filterEventCategory,
      filterNodeMethod,
      maritalStatusId,
      genderId,
      setGroupValue,
      mdAndUp, lgAndUp, xlAndUp, xsOnly,
      eventText,
      displayModal,
      openModal,
      closeModal,
      showAddInfo,
      createNewCat,
      validateRules,
      newEventCategoryName,
      selectEvent,
      individualEvent,
      checkForDuplicatePhone,
      checkForDuplicateEmail,
      isPhoneValid,
      isEmailValid,
      validatePhone,
      validateEmail,
      firstTimerPhone,
      firstTimerEmail,
      setImageToUrl,
      setContact,
      firstTimerInGroup,
      allGroups,
      groupToAddTo,
      eventsSearchString,
      position,
      dynamicCustomFields,
      addToGroupError,
      selectedTree,
      dismissAddToGroupModal,
      addMemberToGroup,
      setSelectedSource
    };
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
  color: #02172e;
}
.contn-btn:disabled {
  opacity: 0.3;
}

.tb-icon-span {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #dde2e6;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  opacity: 0.5;
}

.show-tab {
  transition: all 0.5s ease-in-out;
  height: 220px;
  /* overflow: hidden; */
}

.show-occ-tab {
  transition: all 0.5s ease-in-out;
  height: 100px;
  /* overflow: hidden; */
}

@media (max-width: 620px) {
  .show-occ-tab {
    height: 144px;
  }
}

@media (min-width: 621px) and (max-width: 767px) {
  .manual-dd-icon[data-v-24c46d98] {
    position: absolute;
    right: 12px;
    margin-top: 3rem;
  }
}

.submit-div {
  /* margin-left: 14em; */
  display: flex;
  justify-content: end;
}

.inputs {
  width: 70%;
}

.manual-dd-con {
  position: relative;
}

.manual-dd {
  width: 330px;
  border: 1px solid #b9c5cf;
  position: absolute;
  background: white;
  z-index: 2;
  top: -13px;
  margin-right: 0.5rem;
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14),
    0 1px 10px 0 rgba(0, 0, 0, 0.12);
  max-height: 400px;
  overflow: auto;
}

.manual-dd::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.manual-dd {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.manual-dd-item {
  color: #495057;
}

.manual-dd-item:hover {
  background: #e9ecef;
  cursor: pointer;
}

.dd-search-field {
  border-radius: 20px;
}

.create-event a {
  color: #136acd !important;
  text-decoration: none;
}

.create-new-event {
  text-align: center;
  font: normal normal bold 16px/22px Nunito Sans;
  letter-spacing: 0px;
  color: #136acd;
}

.create-event a:hover {
  cursor: pointer;
  padding: 8px;
}

.create {
  text-align: center;
  font: normal normal bold 16px/22px Nunito Sans;
  letter-spacing: 0px;
  color: #136acd;
}

/* .select-dropdown option{
  padding: 20px 10px;
  border: none
}

.select-dropdown option:hover{
  background: rgb(162, 197, 238)
} */

.select-elem-con {
  padding: 5px 10px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  justify-content: space-between;
}

.pointer {
  cursor: pointer;
}

.style-category {
  padding: 10px;
  box-shadow: 0px 3px 15px #797e8159;
  position: absolute;
  /* top: 10px; */
  background: white;
  z-index: 1;
  width: 80%;
  max-height: 20em;
  overflow-y: scroll;
}
.style-category div:hover {
  background-color: #ecf0f3;
  cursor: pointer;
}

.cat {
  padding: 5px;
  border-top: 1px solid #ecf0f3;
}

.form-control.input.dd.inputCal {
  text-align: left;
}

.manual-dd-icon {
  position: absolute;
  margin-right: 1rem;
  margin-top: 16px;
}

.dd-search-con {
  max-height: 40px;
}

.dd-list-con {
  max-height: 360px;
  overflow: auto;
}

.modal-footer {
  border-top: none !important;
}

.add-group {
  width: 330px;
  /* margin: 4px 8px; */
  border-radius: 3px;
}

.input-dropdown {
  width: 330px;
}

.status-n-gender {
  justify-content: space-between;
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

@media (max-width: 620px) {
  .submit-div {
    /* margin-left: 1em; */
    flex-direction: column-reverse;
  }

  .manual-dd-icon {
    margin-top: 3rem;
    right: 10px;
  }

  .widen {
    width: 100%;
  }

  .add-group {
    width: 100%;
  }

  .input-dropdown {
    width: 100%;
  }
}

@media (min-width: 621px) and (max-width: 900px) {
  /* .submit-div {
    margin-left: 9em;
  } */
}

.page-header {
  margin-bottom: 21px;
  margin-top: 15px;
}

.page-header h2 {
  color: #02172e;
  font-weight: 800;
  font-size: 30px;
}

.sub-header {
  color: #002044;
  font-size: 20px;
  font-weight: 700;
}

.form-container {
  margin-bottom: 44px;
}

.input {
  height: 40px;
  border: 1px solid #b9c5cf;
  margin: 0;
}
.inputCal {
  height: 40px;
  /* border: 1px solid #b9c5cf; */
  margin: 0;
}

.first-row {
  margin-top: 10px;
}

.day-inp {
  border-radius: 8px 0 0 8px;
}

.month-inp {
  border-radius: 0;
}

.year-inp {
  border-radius: 0 8px 8px 0;
}

/* .select-elem {
  height: 50px !important;
} */

#welcomeSms,
#welcomeEmail {
  margin-top: 6px;
  margin-left: 10px;
}

.check-box {
  width: 1.2em;
  height: 1em;
  background-color: white;
  border-radius: 50%;
  vertical-align: middle;
  border: 1px solid #b9c5cf;
  -webkit-appearance: none;
  outline: none;
  cursor: pointer;
}

.action-btn {
  background: #fff;
  border: 1px solid #002044;
  border-radius: 22px;
  width: 104px;
  /* height: 49px; */
  outline: transparent;
}

.save-btn {
  background: #136acd;
  border: none;
  outline: transparent;
  /* padding: 8px 10px; */
  /* color: #fff; */
  /* width: 40px; */
  /* min-width: 104px; */
  color: #fff;
  font-size: 16px;
  border-radius: 22px;
}

.drop-it.placeholder {
  /* Chrome/Opera/Safari */
  /* color: pink; */
  border: 2px solid red;
}

template.p-dropdown-parent {
  border: 2px solid red;
}

.roll1 {
  transition: all 0.5s ease-in-out;
  transform: rotate(180deg);
}

.slide-down1 {
  height: 200px;
  transition: all 0.5s ease-in-out;
}
.close-slide1 {
  height: 0;
  overflow: hidden;
  transition: all 0.5s ease-in-out;
}

.required {
  color: #ef0535;
}

.modal-body.new-event-modal {
  padding: 0;
}

.gender.cstm-select {
  margin: 0;
}

@media screen and (max-width: 767px) {
  .select-elem {
    height: auto !important;
  }

  .select-div {
    padding: 0.8rem !important;
  }

  .img-parent {
    order: -1;
  }

  .input {
    width: 100%;
  }
  .inputCal {
    width: 100%;
  }
}

.check-box:checked {
  background-color: #0f529f;
}

@media screen and (max-width: 770px) {
  .follow-up-header {
    flex-direction: column;
    justify-content: flex-start;
  }

  .followup-hr-span,
  .hr-span {
    width: 100% !important;
  }

  .sub-header {
    width: 100%;
  }
}

@media screen and (min-width: 770px) and (max-width: 1190px) {
  .followup-hr-span {
    width: 60% !important;
  }
}

@media (min-width: 576px) {
  .modal-dialog {
    max-width: 650px;
    margin: 1.75rem auto;
    /* padding: 32px; */
  }
}
</style>
