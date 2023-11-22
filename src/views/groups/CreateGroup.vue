<template>
  <div>
    <Header :headerName="!route.params.groupId ? 'Create segment' : `${groupData.name}`" />

    <el-main>
      <div class="row py-3">
        <div class="col-md-12">
          <div class="row">
            <div class="col-md-12 col-12">

              <div class="d-flex justify-content-end">
                <el-button
                class="c-pointer secondary-button"
                :data-toggle="route.params.groupId ? 'modal' : ''"
                data-target="#importgroup"
                @click="importMember"
                size="large"
              >
                Import
              </el-button>
              <el-button
                class="secondary-button"
                data-toggle="modal"
                data-target="#exampleModal"
                ref="modalBtn"
                size="large"
              >
                Add contact
              </el-button>
              </div>
            </div>
          </div>
          <div class="py-4 my-4 bg-white">
            <div class="col-md-12">
              <div class="row">
                <div class="col-md-12">
                  <div class="row">
                    <!-- <div class="col-md-2 text-lg-right">
                    <label for="groupName" class="font-weight-600">Group name</label>
                  </div> -->
                    <div class="col-md-8">
                      <el-input
                        type="text"
                        v-model="groupData.name"
                        class="w-100"
                        id="formGroup"
                        placeholder="Enter contact segment name"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <!-- <div class="row mb-2 mt-4">
                <div class="col-md-12">
                  <div class="row">
                    <div class="col-md-2 text-lg-right">
                    <label for="description" class="font-weight-600">Description</label>
                  </div>
                    <div class="col-md-8">
                      <el-input
                        v-model="groupData.description"
                        name="description"
                        id="description"
                        :rows="3"
                        type="textarea"
                        placeholder="Enter segment description {optional}"
                      />

                      <div class="d-flex mt-3">
                      <div class="input-width">
                        <el-checkbox
                          v-model="groupData.isMobileGroup"
                          size="large"
                          class="align-checkbox-totop"
                          :disabled="groupData.isMobileGroup"
                        />
                      </div>
                      <label for="description" class="font-weight-600 ml-3">
                        Enable on Mobile App
                      </label>
                    </div>
                    </div>
                  </div>
                </div>
              </div> -->
            </div>
          </div>
         

          <!-- <div class="row">
            <div class="col-12">
              <div>
                <div class="collapse" id="collapseExample">
                  <div class="row">
                    <div class="col-12 col-md-12 mt-2">
                      <div
                        class="mb-3 border outline-none font-weight-bold mr-3 text-center"
                        style="border-radius: 3rem; padding: 0.5rem 1.25rem; width: 167px"
                        type="button"
                        data-toggle="collapse"
                        data-target="#addsubgroup"
                        aria-expanded="false"
                        aria-controls="collapseExample"
                      >
                        Add sub-group
                      </div>

                      <div class="collapse" id="addsubgroup">
                        <div class="card card-body">
                          <div class="font-weight-700 mb-3">
                            Select the group or sub-group you want to be a child of this
                            group.
                          </div>

                          <div class="row w-100">
                            <div class="col-12 col-sm-6 col-md-4">
                              <div class="">
                                <div class="mb-1 font-weight-600 w-100">Parent Group</div>

                                <el-input
                                  type="text"
                                  v-model="groupData.name"
                                  size="large"
                                  disabled
                                />
                              </div>
                            </div>
                            <div class="col-12 col-sm-6 col-md-5 mt-3 mt-sm-0">
                              <div class="mb-1 font-weight-600 w-100">Child group</div>
                              <div>
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
                                <div
                                  class="border-contribution d-flex justify-content-between align-items-center exempt-hide"
                                  @click="setGroupProp"
                                >
                                  <span class="exempt-hide">
                                    <el-tag
                                      type="info"
                                      v-for="item in selectedTree"
                                      :key="item.id"
                                      >{{ item && item.name }}</el-tag
                                    >
                                    <span v-if="selectedTree.length === 0"
                                      >Select group</span
                                    >
                                  </span>
                                  <el-icon class="el-icon--right pr-1">
                                    <arrow-down />
                                  </el-icon>
                                </div>
                                <div
                                  class="div-card p-2 exempt-hide"
                                  :class="{
                                    'd-none': hideDiv,
                                    'd-block': !hideDiv,
                                  }"
                                >
                                  <el-icon
                                    class="is-loading"
                                    v-if="grouploading && getAllGroup.length === 0"
                                  >
                                    <Loading />
                                  </el-icon>
                                  <el-input
                                    type="text"
                                    class="w-100 exempt-hide"
                                    v-model="searchGroupText"
                                    ref="searchGroupRef"
                                    placeholder="Search for group"
                                  />
                                  <GroupTree2
                                    :items="searchForGroups"
                                    :addGroupValue="true"
                                    @filteredGroup="setFilterGroups"
                                    @newgroup="setNewGroup"
                                  />
                                </div>
                              </div>
                            </div>

                            <div class="col-12 col-md-3">
                              <div class="mb-1 mt-3 mt-md-4">
                                <el-button
                                  class="default-btn primary-bg border-0 text-white align-self-center mt-2"
                                  size="large"
                                  @click="addSubGroup"
                                  round
                                >
                                  Add sub group
                                </el-button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-12">
                      <GroupTree
                        :items="groupData.children"
                        @removesubgroup="removeSubGroup"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> -->

          <div class="row pb-4">
            <!-- <div class="col-md-2" v-if="route.params.groupId">
              <div class="font-weight-bold py-md-2 mt-4">QR Code</div>
              <div class="image" @click="getQrCode">
                <img src="../../assets/group2.svg" alt="Member image" />
              </div>
            </div>
            <div class="col-md-10" v-if="route.params.groupId">
              <div class="font-weight-bold py-md-2 mt-4">Copy and Share the link</div>
              <div class="p-inputgroup form-group mt-1">
                <el-input
                  v-model="groupLink"
                  placeholder="Click the copy button when the link appears"
                  ref="selectedLink"
                  class="input-with-select border-0 w-100"
                >
                  <template #append>
                    <el-button @click="copylink">
                      <el-icon>
                        <CopyDocument />
                      </el-icon>
                    </el-button>
                  </template>
                </el-input>
              </div>
            </div> -->
            <div class="col-md-12">
              <div class="d-flex flex-column flex-sm-row justify-content-sm-between py-3">
                <el-input
                  v-model="searchGroupMemberText"
                  placeholder="Search for contact member by name"
                  class="input-with-select"
                  type="text"
                  v-if="groupMembers.length > 0"
                >
                  <template #append>
                    <el-button>
                      <el-icon :size="13">
                        <Search />
                      </el-icon>
                    </el-button>
                  </template>
                </el-input>
              </div>

              <div class="row">
                <div class="col-md-12">
                  <!-- Add Member To Group Modal -->
                  <div
                    class="modal fade"
                    id="exampleModal"
                    tabindex="-1"
                    role="dialog"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div class="modal-dialog" role="document" ref="modal">
                      <div class="modal-content pr-2">
                        <div class="modal-header py-3">
                          <h5 class="modal-title font-weight-700" id="exampleModalLabel">
                            Add a contact
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
                          <div class="row">
                            <div class="col-md-12">
                              <div class="row my-3">
                                <div
                                  class="col-md-4 align-items-center justify-content-md-end"
                                >
                                  <label class="font-weight-600">Select contact</label>
                                </div>

                                <div class="col-md-7 col-sm-12 px-1">
                                  <ul
                                    class="px-1 mb-0 m-dd-item d-flex border rounded-lg flex-wrap"
                                    @click="() => memberSelectInput.focus()"
                                  >
                                    <li
                                      style="list-style: none; min-width: 100px"
                                      v-for="(member, indx) in selectedMembers"
                                      :key="indx"
                                      class="email-destination d-flex justify-content-between m-1"
                                    >
                                      <span>{{ member.name }}</span>
                                      <span
                                        class="ml-2 remove-email"
                                        @click="removeMember(indx)"
                                        >x</span
                                      >
                                    </li>
                                    <li style="list-style: none" class="m-dd-item">
                                      <input
                                        type="text"
                                        class="border-0 m-dd-item text outline-none"
                                        ref="memberSelectInput"
                                        @input="searchForMembers"
                                        autocomplete="off"
                                        :class="{
                                          'w-100': selectedMembers.length === 0,
                                          'minimized-input-width':
                                            selectedMembers.length > 0,
                                        }"
                                        @focus="showMemberList"
                                        @click="showMemberList"
                                        v-model="searchText"
                                        style="padding: 0.5rem"
                                        :placeholder="`${
                                          selectedMembers.length > 0
                                            ? ''
                                            : 'Select from contacts'
                                        }`"
                                        @blur="() => (inputBlurred = true)"
                                      />
                                    </li>
                                  </ul>
                                  <div
                                    class="col-md-12 px-0 select-groups-dropdown m-dd-item"
                                    v-if="memberListShown"
                                  >
                                    <div class="dropdownmenu pt-0 w-100 m-dd-item">
                                      <a
                                        class="dropdown-item px-1 c-pointer m-dd-item"
                                        v-for="(member, index) in memberSearchResults"
                                        :key="index"
                                        @click="selectMember(member, index)"
                                        >{{ member.nameResult }}</a
                                      >

                                      <p class="bg-secondary p-1 mb-0">
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
                                          memberSearchResults.length === 0 &&
                                          searchText.length >= 3 &&
                                          !loading
                                        "
                                      >
                                        No match found
                                      </p>
                                      <p
                                        class="btn btn-default p-1 mb-0 disable m-dd-item"
                                        v-if="loading && searchText.length >= 3"
                                      >
                                        <i
                                          class="fas fa-circle-notch fa-spin m-dd-item"
                                        ></i>
                                      </p>
                                      <a
                                        class="font-weight-bold small-text d-flex justify-content-center py-2 text-decoration-none primary--text c-pointer"
                                        style="
                                          border-top: 1px solid #002044;
                                          color: #136acd;
                                        "
                                        @click="showAddMemberForm"
                                        data-dismiss="modal"
                                      >
                                        <el-icon
                                          class="primary--text d-flex align-self-center mr-2"
                                        >
                                          <CirclePlusFilled />
                                        </el-icon>
                                        Add new contact
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <!-- <div class="row mb-3 px-1">
                                <div
                                  class="col-md-4 text-right d-flex align-items-center justify-content-md-end"
                                >
                                  <label class="font-weight-600">Position in group</label>
                                </div>
                                <div class="col-md-7 col-sm-12 px-1">
                                  <el-input
                                    type="text px-1"
                                    placeholder="e.g Member"
                                    v-model="position"
                                  />
                                </div>
                              </div>
                              <div class="row ml-4">
                                <div class="col-sm-6 d-flex mt-2">
                                  <label for="description" class="font-weight-600">
                                    Is Group Leader
                                  </label>
                                  <el-checkbox
                                    v-model="isGroupLeader"
                                    :binary="true"
                                    class="ml-3"
                                  />
                                </div>

                                <div class="col-sm-6 d-flex mt-2">
                                  <label for="description" class="font-weight-600">
                                    Enable Login
                                  </label>
                                  <el-checkbox
                                    v-model="enableLogin"
                                    :binary="true"
                                    class="ml-3"
                                  />
                                </div>
                              </div> -->
                            </div>
                          </div>
                        </div>
                        <div class="modal-footer mb-2">
                          <el-button class="secondary-button" data-dismiss="modal" round>
                            Cancel
                          </el-button>

                          <el-button
                            :color="primarycolor"
                            @click="addSelectedMembersToGroup"
                            :data-dismiss="modalStatus"
                            round
                          >
                            Add member
                          </el-button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Import Member To Group Modal -->

                  <div
                    class="modal fade"
                    id="importgroup"
                    tabindex="-1"
                    role="dialog"
                    aria-labelledby="importgroupModalLabel"
                    aria-hidden="true"
                  >
                    <div
                      class="modal-dialog modal-lg modal-dialog-centered"
                      role="document"
                      ref="modal"
                    >
                      <div class="modal-content pr-2">
                        <div class="modal-header py-3">
                
                          <button
                            type="button"
                            class="close"
                            data-dismiss="modal"
                            aria-label="Close"
                            ref="closeGroupModal"
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div class="modal-body">
                          <div class="row">
                            <div class="col-md-12">
                              <ImportToGroup @uploadtogroup="uploadToGroup" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Modal -->
              <div class="container">
                <!-- Button to Open the Modal -->

                <!-- The Modal -->
                <div class="modal fade" id="myModal">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <!-- Modal Header -->
                      <div class="modal-header">
                        <h4 class="modal-title">
                          <label class="font-weight-900 w-100"
                            >Move Members To Groups</label
                          >
                        </h4>
                        <button type="button" class="close" data-dismiss="modal">
                          &times;
                        </button>
                      </div>

                      <!-- Modal body -->
                      <div class="modal-body">
                        <div class="col-md-12"></div>
                        <div class="col-md-12 form-group w-100">
                          <el-tree-select
                            v-model="moveSelectedTree"
                            class="w-100"
                            placeholder="Select group"
                            :data="groupMappedTree"
                            :render-after-expand="false"
                            :filter-node-method="filterNodeMethod"
                            @change="setSelectedGroupToMove"
                            filterable
                            check-strictly
                          />
                        </div>
                      </div>

                      <!-- Modal footer -->
                      <div class="modal-footer">
                        <el-button
                          class="secondary-button"
                          data-dismiss="modal"
                          ref="dismissMoveModal"
                          round
                          >Close</el-button
                        >
                        <el-button
                          :color="primarycolor"
                          @click="moveMembers"
                          :loading="moveLoading"
                          round
                          >Move</el-button
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Modal -->
              <div class="container">
                <!-- Button to Open the Modal -->
                <!-- The Modal2 -->
                <div class="modal fade" id="myModal1">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <!-- Modal Header -->
                      <div class="modal-header">
                        <h4 class="modal-title">
                          <label class="font-weight-900 w-100"
                            >Copy Members To Groups</label
                          >
                        </h4>
                        <button type="button" class="close" data-dismiss="modal">
                          &times;
                        </button>
                      </div>

                      <!-- Modal body2 -->
                      <div class="modal-body">
                        <div class="col-md-12"></div>
                        <div class="col-md-12 form-group w-100">
                          <button
                            @click="setCopyGroupProp"
                            class="btn border d-flex justify-content-between align-items-center w-100"
                          >
                            <div>
                              {{
                                copyGroupTo && Object.keys(copyGroupTo).length > 0
                                  ? copyGroupTo.name
                                  : "Select group"
                              }}
                            </div>
                            <i class="pi pi-chevron-down"></i>
                          </button>
                          <div
                            class="move-card p-2 exempt-hide"
                            :class="{
                              'd-none': copyHideDiv,
                              'd-block': !copyHideDiv,
                            }"
                          >
                            <i
                              class="pi pi-spin pi-spinner text-center exempt-hide"
                              v-if="grouploading && getAllGroup.length === 0"
                            ></i>
                            <input
                              type="text"
                              class="form-control exempt-hide"
                              v-model="searchGroupText"
                              ref="searchGroupRef"
                              placeholder="Search for group"
                            />
                            <GroupTree
                              :items="searchForGroups"
                              :addGroupValue="true"
                              @group="setSelectedGroupToCopy"
                            />
                          </div>
                        </div>
                      </div>

                      <!-- Modal footer2 -->
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn primary-bg default-btn border-0 text-white"
                          data-dismiss="modal"
                          @click="copyMemberToGroup"
                        >
                          Copy
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row" v-if="marked.length > 0 && groupMembers.length > 0">
                <div class="col-md-12 d-flex align-content-between pb-2">
                  <div class="c-pointer" @click="confirmMultipleDelete">
                    <el-tooltip
                      class="box-item"
                      effect="dark"
                      content="Remove member(s) from group"
                      placement="top-start"
                    >
                      <el-icon :size="20">
                        <Delete />
                      </el-icon>
                    </el-tooltip>
                  </div>

                  <div data-toggle="modal" data-target="#myModal" class="ml-2 c-pointer">
                    <el-tooltip
                      class="box-item"
                      effect="dark"
                      content="Move to group"
                      placement="top-start"
                    >
                      <el-icon :size="20">
                        <Rank />
                      </el-icon>
                    </el-tooltip>
                  </div>

                  <div class="ml-2 c-pointer" data-toggle="modal" data-target="#myModal1">
                    <el-tooltip
                      class="box-item"
                      effect="dark"
                      content="Copy to group"
                      placement="top-start"
                    >
                      <el-icon :size="20">
                        <CopyDocument />
                      </el-icon>
                    </el-tooltip>
                  </div>

                  <div class="ml-2 c-pointer" @click="openPositionArchive('center')">
                    <el-tooltip
                      class="box-item"
                      effect="dark"
                      content="Archive member(s)"
                      placement="top-start"
                    >
                      <el-icon :size="20">
                        <DocumentRemove />
                      </el-icon>
                    </el-tooltip>
                  </div>

                  <div class="ml-2 c-pointer" @click="sendMarkedMemberSms">
                    <el-tooltip
                      class="box-item"
                      effect="dark"
                      content="Send SMS"
                      placement="top-start"
                    >
                      <img
                        src="../../assets/sms.png"
                        style="width: 18px; margin-top: -5px"
                        class="ml-2 c-pointer"
                        alt="Send SMS"
                      />
                    </el-tooltip>
                  </div>

                  <div class="ml-2 c-pointer" @click="sendMarkedMemberEmail">
                    <el-tooltip
                      class="box-item"
                      effect="dark"
                      content="Send Email"
                      placement="top-start"
                    >
                      <el-icon :size="20" class="ml-2 c-pointer">
                        <Message />
                      </el-icon>
                    </el-tooltip>
                  </div>
                </div>
              </div>

        
              <Table
                :data="searchGroupMembers"
                :headers="createGroupHeaders"
                :checkMultipleItem="true"
                @checkedrow="handleSelectionChange"
                v-loading="loadingMembers"
                v-if="groupMembers.length > 0 || loadingMembers == true"
              >
                <template #name="{ item }">
                  <span>{{ item.name }}</span>
                </template>
                <template v-slot:email="{ item }">
                  <span>{{ item.email }}</span>
                </template>
                <template v-slot:phone="{ item }">
                  <span>{{ item.phone }}</span>
                </template>
                <template v-slot:action="{ item }">
                  <el-dropdown>
                    <el-icon id="dropdownMenuButton" data-toggle="dropdown">
                      <MoreFilled />
                    </el-icon>
                    <template #dropdown>
                      <el-dropdown-menu>
                        <el-dropdown-item>
                          <a @click="displaySMSDialog(item)"> Send SMS</a>
                        </el-dropdown-item>
                        <el-dropdown-item>
                          <a @click="displayEmailDialog(item)">Send Email</a>
                        </el-dropdown-item>
                        <el-dropdown-item>
                          <a @click="archive(item.personID, 'single')"> Archive </a>
                        </el-dropdown-item>
                        <el-dropdown-item>
                          <a @click="confirmDelete(item.id, index)">Remove</a>
                        </el-dropdown-item>
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                </template>
              </Table>

              <div class="row" v-if="awaitingApprovals.length > 0">
                <div class="col text-center p-3 text-warning font-weight-700">
                  Waiting Approval
                </div>
              </div>
              <Table
                :data="awaitingApprovals"
                :headers="createGroupHeaders"
                :checkMultipleItem="true"
                @checkedrow="handleSelectionChange"
                v-if="awaitingApprovals.length > 0"
              >
                <template #name="{ item }">
                  <span>{{ item.name }}</span>
                </template>
                <template v-slot:position="{ item }">
                  <span>{{ item.position }}</span>
                </template>
                <template v-slot:email="{ item }">
                  <span>{{ item.email }}</span>
                </template>
                <template v-slot:phone="{ item }">
                  <span>{{ item.phone }}</span>
                </template>
                <template v-slot:action="{ item }">
                  <el-dropdown>
                    <el-icon id="dropdownMenuButton" data-toggle="dropdown">
                      <MoreFilled />
                    </el-icon>
                    <template #dropdown>
                      <el-dropdown-menu>
                        <el-dropdown-item>
                          <a @click="displaySMSDialog(item)"> Send SMS</a>
                        </el-dropdown-item>
                        <el-dropdown-item>
                          <a @click="displayEmailDialog(item)">Send Email</a>
                        </el-dropdown-item>
                        <el-dropdown-item>
                          <a @click="archive(item.personID, 'single')"> Archive </a>
                        </el-dropdown-item>
                        <el-dropdown-item>
                          <a @click="confirmDelete(item.id, index)">Remove</a>
                        </el-dropdown-item>
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                </template>
              </Table>

              <div
                class="row"
                v-if="loadingMembers == false && groupMembers.length === 0"
              >
                <div class="col-md-12">
                  <div class="row">
                    <div
                      class="col-md-12 d-flex align-items-center justify-content-center"
                    >
                      <p class="text-center font-weight-bold py-2">No contacts yet</p>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12 px-0">
                      <hr class="hr my-0" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row py-3 my-3">
        <div class="col-md-12">
          <p
            class="text-right text-danger font-weight-bold pr-2"
            v-if="groupNameIsInvalid"
          >
            Please enter group name
          </p>
        </div>
        <div class="col-md-12 d-flex justify-content-end action-btns">
          <router-link to="/tenant/peoplegroups" class="no-decoration">
            <el-button class="mr-2 secondary-button" size="large">Discard</el-button>
          </router-link>
          <el-button
            :color="primarycolor"
            :loading="savingGroup"
            @click="saveGroupData"
            :disabled="savingGroup"
            size="large"
            >{{ buttonText }}</el-button
          >
        </div>
      </div>
    </el-main>

    <el-dialog
      v-model="display"
      title="Create new contact"
      :width="lgAndUp || xlAndUp ? `50%` : `90%`"
    >
      <NewPerson
        @cancel="() => (display = false)"
        @person-id="newPersonData($event)"
        @show-group-modal="setGroupModal"
      />
    </el-dialog>
    <el-dialog
      v-model="QRCodeDialog"
      title=""
      :width="mdAndUp || lgAndUp || xlAndUp ? `30%` : xsOnly ? `90%` : `70%`"
      class="QRCodeDialog"
      align-center
    >
      <div class="d-flex align-items-center flex-column">
        <h4 class="text-capitalize font-weight-bold">Scan to Add member to group</h4>
      </div>
      <div class="d-flex justify-content-center">
        <div class="img-wrapper">
          <img v-if="qrCode" :src="qrCode" class="image-wrapper w-100" />
        </div>
      </div>
    </el-dialog>
    <el-dialog
      v-model="displayPositionArchive"
      title="Archive member(s)"
      :width="mdAndUp || lgAndUp || xlAndUp ? `50%` : `90%`"
    >
      <p class="p-m-0">
        You are about to archive your member(s). Do you want to continue ?
      </p>
      <template #footer>
        <div class="d-flex justify-content-end">
          <el-button class="secondary-button" @click="closeArchiveModal" round
            >No</el-button
          >
          <el-button :color="primarycolor" @click="archive('', 'multiple')" round
            >Yes</el-button
          >
        </div>
      </template>
    </el-dialog>

    <el-drawer
      v-model="showSMS"
      :size="mdAndUp || lgAndUp || xlAndUp ? '70%' : '100%'"
      direction="rtl"
    >
      <template #header>
        <h4>Send SMS</h4>
      </template>
      <template #default>
        <div>
          <smsComponent
            :phoneNumbers="contacts"
            @closesidemodal="() => (showSMS = false)"
          />
        </div>
      </template>
    </el-drawer>

    <el-drawer
      v-model="showEmail"
      :size="mdAndUp || lgAndUp || xlAndUp ? '70%' : '100%'"
      direction="rtl"
    >
      <template #header>
        <h4>Send Email</h4>
      </template>
      <template #default>
        <div>
          <emailComponent
            :selectedGroupMembers="selectedGroupMembers"
            @closesidemodal="() => (showEmail = false)"
          />
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script>
import { computed, nextTick, watchEffect, ref, inject } from "vue";
import composeService from "../../services/communication/composer";
import axios from "@/gateway/backendapi";
import router from "@/router/index";
import { useRoute } from "vue-router";
import groupsService from "../../services/groups/groupsservice";
import Tooltip from "primevue/tooltip";
import NewPerson from "../../components/membership/NewDonor.vue";
import finish from "../../services/progressbar/progress.js";
import smsComponent from "./component/smsComponent.vue";
import emailComponent from "./component/emailComponent.vue";
// import Attendancecheckin from "../event/attendance&checkin/AttendanceAndCheckinList.vue";
// import attendanceservice from "../../services/attendance/attendanceservice";
import ImportToGroup from "../people/ImportInstruction";
import GroupTree from "./component/GroupTree.vue";
// import GroupTree2 from "./component/GroupTreeCheckboxParent.vue";
import collector from "../../services/groupArray/mapTree";
import { ElMessage, ElMessageBox } from "element-plus";
import { useStore } from "vuex";
import grousService from "../../services/groups/groupsservice";
import flatten from "../../services/groupArray/flatTree";
import Table from "@/components/table/Table";
import deviceBreakpoint from "../../mixins/deviceBreakpoint";
import dateFormatter from "../../services/dates/dateformatter";
import Header from "@/components/header/Header.vue";

export default {
  directives: {
    tooltip: Tooltip,
  },
  components: {
    NewPerson,
    // Attendancecheckin,
    smsComponent,
    emailComponent,
    ImportToGroup,
    GroupTree,
    // GroupTree2,
    Table,
    Header,
  },
  setup() {
    const primarycolor = inject("primarycolor");
    const store = useStore();
    const route = useRoute();
    const display = ref(false);
    const selectedLink = ref(null);
    const QRCodeDialog = ref(false);
    const hideDiv = ref(true);
    const memberDia = ref(true);
    const selectedTree = ref([]);
    const moveSelectedTree = ref();
    const groupMappedTree = ref([]);
    const addGroupBtn = ref([{ label: "Add Group", value: 1 }]);
    const modalBtn = ref(null);
    const groupData = ref({});
    const searchText = ref("");
    const loading = ref(false);
    const loadingMembers = ref(false);
    const memberSearchResults = ref([]);
    const position = ref("");
    const memberSelectInput = ref(null);
    const marked = ref([]);
    let selectMembers = ref("");
    const getAllGroup = ref([]);
    const selectGroupTo = ref({});
    const copyGroupTo = ref({});
    const awaitingApprovals = ref([]);
    const contacts = ref([]);
    const attendanceData = ref([]);
    const selectedGroupMembers = ref([]);
    const tenantID = ref("");
    const showSMS = ref(false);
    const isGroupLeader = ref(false);
    const enableLogin = ref(false);
    const showEmail = ref(false);
    const totalItems = ref("");
    const positionArchive = ref("center");
    const displayPositionArchive = ref(false);
    const searchGroupMemberText = ref("");
    const field = ref();
    const groups = ref([]);
    const selectedIntendedSubGroup = ref("");
    const searchGroupText = ref("");
    const grouploading = ref(false);
    const moveLoading = ref(false);
    const searchGroupRef = ref();
    const closeGroupModal = ref();
    const lastGroupChild = ref({});
    const copyHideDiv = ref(true);
    const flattenedTree = ref([]);
    const qrCode = ref("");
    const { mdAndUp, lgAndUp, xlAndUp, xsOnly } = deviceBreakpoint();
    const dismissMoveModal = ref(null);
    const createGroupHeaders = ref([
      { name: "NAME", value: "name" },
      { name: "EMAIL", value: "email" },
      { name: "PHONE", value: "phone" },
      { name: "ACTION", value: "action" },
    ]);

    const getGroups = async () => {
      grouploading.value = true;
      try {
        let data = await grousService.getGroups();
        getAllGroup.value = data.response.groupResonseDTO;
        grouploading.value = false;
        flattenedTree.value = flattenTree(getAllGroup.value);
      } catch (error) {
        console.log(error);
        grouploading.value = false;
      }
    };
    getGroups();
    const getUser = computed(() => {
      if (
        !store.getters.currentUser ||
        (store.getters.currentUser && Object.keys(store.getters.currentUser).length == 0)
      )
        return "";
      return store.getters.currentUser;
    });

    watchEffect(() => {
      if (getUser.value) {
        tenantID.value = getUser.value.tenantId;
      }
    });
    const setGroupProp = () => {
      hideDiv.value = !hideDiv.value;
      nextTick(() => {
        searchGroupRef.value.focus();
      });
    };

    const groupLink = computed(() => {
      if (!tenantID.value) return "";
      return `${window.location.origin}/createmember?tenantId=${tenantID.value}&groupID=${route.params.groupId}`;
    });

    const getQrCode = async () => {
      try {
        const res = await axios.get(
          `/api/Settings/GetQRCode?link=${window.location.origin}/createmember?tenantId=${tenantID.value}&groupID=${route.params.groupId}`
        );
        QRCodeDialog.value = true;
        qrCode.value = res.data;
      } catch (error) {
        console.log(error);
      }
    };

    const copylink = () => {
      selectedLink.value.input.setSelectionRange(
        0,
        selectedLink.value.input.value.length
      ); /* For mobile devices */
      selectedLink.value.input.select();

      /* Copy the text inside the text field */
      document.execCommand("copy");
      ElMessage({
        showClose: true,
        message: "Copied to clipboard",
        type: "success",
      });
    };

    const flattenTree = (tree) => {
      let treevalue = { children: tree };
      const { children } = collector(treevalue);
      // let arrayOfObj = [
      //               {label: "Add Group", id : 3}
      //               ]

      groupMappedTree.value = children;
      // groupMappedTree.value.concat(arrayOfObj)
      if (groupMappedTree.value && groupMappedTree.value.length > 0) {
        return groupMappedTree.value.flatMap(flatten());
      }
    };

    const displaySMSDialog = (member) => {
      if (member.phone) {
        showSMS.value = true;
        showEmail.value = false;
        contacts.value = member.phone;
      } else {
        alert("No phone number");
      }
    };
    const displayEmailDialog = (member) => {
      if (member.email) {
        showEmail.value = true;
        showSMS.value = false;
        selectedGroupMembers.value.push({ id: member.personID });
      }
    };
    const selectedAttendanceId = ref("");
    const showAddMemberForm = () => {
      display.value = true;
    };

    const moveMembers = () => {
      moveLoading.value = true;
      let memberMove = {
        memberIDList: marked.value.map((i) => i.personID),
        groupTo: selectGroupTo.value.id,
        groupFrom: route.params.groupId,
      };
      axios
        .post(`/api/Group/MoveMembers`, memberMove)
        .then(() => {
          moveLoading.value = false;
          ElMessage({
            message: "Member(s) Moved Successfully",
            type: "success",
            duration: 4000,
          });
          store.dispatch("groups/updateGroupPeopleCount", {
            groupId: selectGroupTo.value.id,
            count: marked.value.length,
            operation: "add",
          });
          store.dispatch("groups/updateGroupPeopleCount", {
            groupId: route.params.groupId,
            count: marked.value.length,
            operation: "remove",
          });

          // Remove from view
          groupMembers.value = groupMembers.value.filter((i) => {
            let match = marked.value.findIndex((j) => j.personID == i.personID);
            if (match >= 0) return false;
            return true;
          });

          // Close modal
          dismissMoveModal.value.ref.click();
        })
        .catch((err) => {
          moveLoading.value = false;
          finish();
          if (err.toString().toLowerCase().includes("network error")) {
            ElMessage({
              message: "Please ensure you have a strong internet",
              type: "warning",
              duration: 4000,
            });
          } else if (err.toString().toLowerCase().includes("timeout")) {
            ElMessage({
              message: "Request timeout, Please refresh the page and try again",
              type: "warning",
              duration: 4000,
              showClose: true,
            });
          }
        });
    };
    const copyMemberToGroup = () => {
      let copyMember = {
        memberIDList: marked.value.map((i) => i.personID),
        groupTo: copyGroupTo.value.id,
        groupFrom: route.params.groupId,
      };
      axios
        .post(`/api/Group/CopyMembers`, copyMember)
        .then(() => {
          ElMessage({
            message: "Member(s) Copy Successfully",
            type: "success",
            duration: 4000,
            showClose: true,
          });
          store.dispatch("groups/updateGroupPeopleCopy", {
            groupId: copyGroupTo.value.id,
            count: marked.value.length,
          });
        })
        .catch((err) => {
          finish();
          if (err.toString().toLowerCase().includes("network error")) {
            ElMessage({
              message: "Please ensure you have a strong internet",
              type: "warning",
              duration: 4000,
              showClose: true,
            });
          } else if (err.toString().toLowerCase().includes("timeout")) {
            ElMessage({
              message: "Please refresh the page",
              type: "warning",
              duration: 4000,
            });
          }
        });
    };

    const handleSelectionChange = (val) => {
      marked.value = val;
    };

    const setFilterGroups = (payload) => {
      selectedTree.value = payload;
      selectedIntendedSubGroup.value = payload.map((i) => i.id).join(",");
    };

    const setNewGroup = (payload) => {
      getAllGroup.value.push(payload);
    };

    const confirmDelete = (id, index) => {
      ElMessageBox.confirm(
        "This action will permanently delete this item. Continue?",
        "Confirm delete",
        {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "error",
        }
      ).then(() => {
        groupsService
          .removeFromGroup(route.params.groupId, {
            groupId: route.params.groupId,
            personIds: [`${id}`],
          })
          .then((res) => {
            if (res !== false) {
              groupMembers.value.splice(index, 1);
              ElMessage({
                message: "The member was removed",
                type: "success",
                duration: 5000,
              });
              groupsService.editGroupInStore(
                { name: groupData.value.name, id: route.params.groupId },
                groupMembers.value.length
              );
            }
          })
          .catch(() => {
            ElMessage({
              type: "info",
              message: "Discarded",
              duration: 3000,
            });
          });
      });
    };

    const removeMultipleMembers = async () => {
      try {
        const res = await groupsService.removeMultipleMemberFromGroup(
          route.params.groupId,
          marked.value.map((i) => i.id)
        );
        if (res.status == 200) {
          ElMessage({
            type: "success",
            message: res.message,
            duration: 5000,
          });

          store.dispatch("groups/updateGroupPeopleCount", {
            groupId: route.params.groupId,
            count: marked.value.length,
            operation: "remove",
          });

          // Remove from view
          groupMembers.value = groupMembers.value.filter((i) => {
            let match = marked.value.findIndex((j) => j.personID == i.personID);
            if (match >= 0) return false;
            return true;
          });
        }
      } catch (err) {
        console.error(err);
      }
    };

    const confirmMultipleDelete = () => {
      ElMessageBox.confirm(
        "This action will permanently remove marked member(s). Continue?",
        "Confirm delete",
        {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "error",
        }
      )
        .then(() => {
          removeMultipleMembers();

          // if (res !== false) {
          //   groupMembers.value.splice(index, 1);

          //   groupsService.editGroupInStore(
          //     { name: groupData.value.name, id: route.params.groupId },
          //     groupMembers.value.length
          //   );
          // }
        })
        .catch(() => {
          ElMessage({
            type: "error",
            message: "Please try again",
            duration: 3000,
          });
        });
    };

    const sendMarkedMemberSms = () => {
      contacts.value = marked.value
        .filter((i) => i.phone)
        .map((i) => i.phone)
        .join();
      showSMS.value = true;
    };
    const sendMarkedMemberEmail = () => {
      selectedGroupMembers.value = marked.value.map((i) => {
        i.id = i.personID;
        return i;
      });
      showEmail.value = true;
    };
    const searchForMembers = (e) => {
      if (e.target.value.length >= 3) {
        memberSearchResults.value = [];
        loading.value = true;
        composeService
          .searchMemberDB("/api/Membership/GetSearchedUSers", e.target.value)
          .then((res) => {
            loading.value = false;
            // memberSearchResults.value = res;
            memberSearchResults.value = res.filter((i) => {
              const memberInExistingMembers = selectedMembers.value.findIndex(
                (j) => j.id === i.id
              );
              if (
                memberInExistingMembers >= 0 ||
                groupMembers.value.findIndex((k) => k.personID === i.id) >= 0
              )
                return false;
              return true;
            });
          });
      } else {
        memberSearchResults.value = [];
      }
    };

    const memberListShown = ref(false);
    const inputBlurred = ref(true);
    const showMemberList = () => {
      memberListShown.value = true;
      inputBlurred.value = false;
    };

    const selectedMembers = ref([]);
    const selectMember = (member, index) => {
      selectedMembers.value.push(member);
      memberSearchResults.value.splice(index, 1);
      searchText.value = "";
      memberListShown.value = false;
      memberSearchResults.value = [];
    };

    const removeMember = (index) => {
      selectedMembers.value.splice(index, 1);
    };

    const modalStatus = ref("");
    const groupMembers = ref([]);

    const newPersonData = (payload) => {
      let body = {
        name: payload.personFirstName + " " + payload.personLastName,
        id: payload.personId,
        email: payload.personEmail,
        phone: payload.personNumber,
      };
      selectedMembers.value.push(body);
    };
    const addSelectedMembersToGroup = () => {
      if (selectedMembers.value.length === 0) {
        modalStatus.value = "modal";
        return false;
      }
      selectedMembers.value.forEach((i) => {
        i.position = position.value;
        i.personID = i.id;
        i.enableLogin = enableLogin.value;
        i.isGroupLeader = isGroupLeader.value;
        groupMembers.value.push(i);
      });

      if (route.params.groupId) {
        groupData.value.peopleInGroups = groupMembers.value;
        updateGroup(groupData.value, false);
      }
      modalStatus.value = "modal";
      position.value = "";
      memberSearchResults.value = [];
      selectedMembers.value = [];
    };

    const invalidSearchText = computed(() => {
      const searchTextIsValid =
        searchText.value.length < 3 &&
        loading.value == false &&
        memberSearchResults.value.length === 0;
      return searchTextIsValid;
    });

    const groupNameIsInvalid = ref(false);
    const savingGroup = ref(false);

    const setGroupModal = () => {
      modalBtn.value.ref.click();
    };

    const saveGroupData = () => {
      if (!groupData.value.name) {
        groupNameIsInvalid.value = true;
        return false;
      }

      groupData.value.peopleInGroups = groupMembers.value;
      if (!route.params.groupId) {
        savingGroup.value = true;
        createGroup(groupData.value);
      } else {
        savingGroup.value = true;
        updateGroup(groupData.value, true);
      }
    };

    const updateGroup = (data, redirect) => {
      axios
        .put(`/api/UpdateGroup/${route.params.groupId}`, data)
        .then((res) => {
          savingGroup.value = false;
          groupsService.editGroupInStore(res.data, groupMembers.value.length);

          groupMembers.value.map((i) => {
            const findData = res.data.peopleInGroups.findIndex(
              (j) => j.personID == i.personID
            );
            if (findData >= 0) {
              i.id = res.data.peopleInGroups[findData].id;
            }
            return i;
          });

          if (redirect) {
            router.push("/tenant/peoplegroups");
          } else {
            ElMessage({
              type: "success",
              message: "Contact added to this segment",
              duration: 5000,
            });
          }
        })
        .catch((err) => {
          finish();
          savingGroup.value = false;
          console.log(err);
          ElMessage({
            message: "Failed updating group",
            type: "error",
            duration: 5000,
          });
        });
    };

    const createGroup = (data) => {
      axios
        .post("/api/CreateGroup", data)
        .then(() => {
          savingGroup.value = false;
          store.dispatch("groups/setGroups").then(() => {
            router.push("/tenant/peoplegroups");
          });
        })
        .catch((err) => {
          finish();
          savingGroup.value = false;
          console.log(err);
          ElMessage({
            message: "Failed saving group",
            type: "error",
            duration: 5000,
          });
        });
    };

    const getGroupById = async () => {
      try {
        loadingMembers.value = true;

        const { data } = await axios.get(
          `/api/GetGroupsFromId/${route.params.groupId}`,
          groupData.value
        );
        loadingMembers.value = false;
        groupData.value.name = data.name;
        groupData.value.description = data.description;
        groupData.value.isMobileGroup = data.isMobileGroup;
        groupData.value.children = data.children;

        data.peopleInGroups.forEach((i) => {
          const person = {
            id: i.id,
            personID: i.person.id,
            address: i.person.address,
            email: i.person.email,
            name: `${i.person.firstName ? i.person.firstName : ""} ${
              i.person.lastName ? i.person.lastName : ""
            }`,
            phone: i.person.phoneNumber,
            position: i.position,
          };
          groupMembers.value.push(person);
        });

        awaitingApprovals.value = data.awaitingApprovals
          ? data.awaitingApprovals.map((i) => {
              return {
                personID: i.person.id,
                address: i.person.address,
                email: i.person.email,
                name: `${i.person.firstName ? i.person.firstName : ""} ${
                  i.person.lastName ? i.person.lastName : ""
                }`,
                phone: i.person.phoneNumber,
                position: i.position,
                groupID: i.groupID,
              };
            })
          : [];
      } catch (error) {
        finish();
        loadingMembers.value = false;
        console.log(error);
        if (error.toString().toLowerCase().includes("network error")) {
          ElMessage({
            message: "Please ensure you have a strong internet",
            type: "warning",
            duration: 4000,
          });
        } else if (error.toString().toLowerCase().includes("timeout")) {
          ElMessage({
            message: "Please refresh the page",
            type: "warning",
            duration: 4000,
          });
        }
      }
    };

    const buttonText = computed(() => {
      if (route.params.groupId) return "Update";
      return "Save";
    });

    if (route.params.groupId) getGroupById();

    const importMember = () => {
      if (!route.params.groupId) {
        ElMessage({
          message: "Please ensure you create the group first before you import",
          type: "warning",
          duration: 5000,
        });
      }
    };
    const requestApproval = async (member) => {
      const memberToApprove = {
        groupId: member.groupID,
        email: member.email,
        personId: member.personID,
        approvalName: member.name,
        position: member.position,
        phone: member.phone,
      };
      try {
        await axios.post("/api/ApproveMemberFromApp", memberToApprove);
        ElMessage({
          message: "Member approved successfully",
          type: "Success",
          duration: 4000,
        });
        awaitingApprovals.value = awaitingApprovals.value.filter((i) => {
          return i.personID !== member.personID;
        });

        groupMembers.value.push(member);
      } catch (error) {
        finish();
        if (error.toString().toLowerCase().includes("network error")) {
          ElMessage({
            message: "Please ensure you have a strong internet",
            type: "warning",
            duration: 4000,
          });
        } else if (error.toString().toLowerCase().includes("timeout")) {
          ElMessage({
            message: "Please refresh the page",
            type: "warning",
            duration: 4000,
          });
        }
        console.log(error);
      }
    };

    const uploadToGroup = (payload) => {
      payload.forEach((i) => {
        groupMembers.value.push({
          personID: i.person.id,
          address: i.person.address,
          email: i.person.email,
          name: `${i.person.firstName ? i.person.firstName : ""} ${
            i.person.lastName ? i.person.lastName : ""
          }`,
          phone: i.person.mobilePhone,
          position: i.position,
        });
      });
      closeGroupModal.value.click();
    };

    const openPositionArchive = (pos) => {
      positionArchive.value = pos;
      displayPositionArchive.value = true;
    };

    const closeArchiveModal = () => {
      displayPositionArchive.value = false;
    };

    const archive = async (id, type) => {
      let archiveBody = type == "single" ? [id] : marked.value.map((i) => i.personID);
      try {
        const { data } = await axios.post("/api/People/archive", archiveBody);
        if (data && type == "single") {
          groupMembers.value = groupMembers.value.filter((item) => {
            return item.personID !== id;
          });
          ElMessage({
            message: "Member archived successfully",
            type: "success",
            duration: 5000,
          });
        }
        if (data && type == "multiple") {
          groupMembers.value = groupMembers.value.filter((item) => {
            let y = marked.value.findIndex((j) => j.personID == item.personID);
            if (y >= 0) return false;
            return true;
          });
          ElMessage({
            message: "Member(s) archived successfully",
            type: "success",
            duration: 5000,
          });
          displayPositionArchive.value = false;
        }
      } catch (err) {
        console.log(err);
      }
    };

    const innerWidth = computed(() => {
      return window.innerWidth;
    });

    const searchGroupMembers = computed(() => {
      if (groupMembers.value.length > 0 && searchGroupMemberText.value == "")
        return groupMembers.value;
      return groupMembers.value.filter((i) =>
        i.name.toLowerCase().includes(searchGroupMemberText.value.toLowerCase())
      );
    });

    const addSubGroup = async () => {
      try {
        const { data } = await axios.post(
          `/api/Group/AddSubGroupsToGroup?SuperGroupID=${route.params.groupId}&SubGroupID=${selectedIntendedSubGroup.value}`
        );
        ElMessage({
          message:
            data.returnObject.length > 1
              ? "Subgroups added successfully"
              : "Subgroup added successfully",
          type: "success",
          duration: 4000,
        });
        data.returnObject.forEach((i) => {
          groupData.value.children.push(i);
        });
      } catch (error) {
        console.log(error.response);
        if (error.response) {
          ElMessage({
            message: `${error.response}`,
            type: "error",
            duration: 4000,
          });
        }
      }
    };

    const setCopyGroupProp = () => {
      copyHideDiv.value = !copyHideDiv.value;
      nextTick(() => {
        searchGroupRef.value.focus();
      });
    };

    const searchForGroups = computed(() => {
      if (!searchGroupText.value && getAllGroup.value.length > 0)
        return getAllGroup.value;
      return getAllGroup.value.filter((i) =>
        i.name.toLowerCase().includes(searchGroupText.value.toLowerCase())
      );
    });

    const setSelectedGroupToMove = () => {
      let flattenGroupTree = flattenTree(getAllGroup.value);
      const selectedLabelTree = flattenGroupTree.find(
        (i) => i.value === moveSelectedTree.value
      );
      selectGroupTo.value = {
        name: selectedLabelTree.label,
        id: selectedLabelTree.value,
      };
    };

    const filterNodeMethod = (value, data) =>
      data.label.toLowerCase().includes(value.toLowerCase());

    const setSelectedGroupToCopy = (payload) => {
      if (payload.iconElement.classList.contains("p-3")) {
        copyGroupTo.value = payload.selectedGroup
          ? payload.selectedGroup
          : lastGroupChild.value;
        copyHideDiv.value = true;
      }
    };

    const showConfirmModal = (id) => {
      ElMessageBox.confirm(
        "This action will permanently delete this item. Continue?",
        "Confirm delete",
        {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "error",
        }
      )
        .then(() => {
          deleteAttendance(id);
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "Delete discarded",
            duration: 3000,
          });
        });
    };

    const deleteAttendance = (id) => {
      axios
        .delete(`/api/CheckInAttendance/checkout?attendanceId=${id}`)
        .then((res) => {
          if (res.status === 200) {
            ElMessage({
              type: "success",
              message: "Delete successful",
              duration: 5000,
            });
          } else {
            ElMessage({
              type: "error",
              message: "Delete failed, please try again",
              duration: 3000,
            });
          }
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response);
            ElMessage({
              type: "info",
              message: "Unable to delete, please try again",
              duration: 3000,
            });
          } else if (err.response.toString().toLowerCase().includes("network error")) {
            ElMessage({
              type: "warning",
              message: "Please ensure you have a strong internet and try again",
              duration: 3000,
            });
          }
        });
    };
    const formatDate = (date) => {
      return dateFormatter.monthDayYear(date);
    };

    const removeSubGroup = (payload) => {
      groupData.value.children = groupData.value.children.filter((i) => i.id !== payload);
    };

    return {
      groupData,
      addGroupBtn,
      selectedAttendanceId,
      searchForMembers,
      searchText,
      loading,
      memberSearchResults,
      selectMember,
      removeMember,
      selectedMembers,
      groupMembers,
      addSelectedMembersToGroup,
      showAddMemberForm,
      invalidSearchText,
      position,
      modalStatus,
      groupNameIsInvalid,
      saveGroupData,
      buttonText,
      loadingMembers,
      groupLink,
      route,
      getQrCode,
      setNewGroup,
      savingGroup,
      memberSelectInput,
      showMemberList,
      memberListShown,
      inputBlurred,
      confirmDelete,
      marked,
      handleSelectionChange,
      selectMembers,
      memberDia,
      display,
      getAllGroup,
      selectGroupTo,
      moveMembers,
      copyGroupTo,
      copyMemberToGroup,
      setGroupProp,
      hideDiv,
      awaitingApprovals,
      requestApproval,
      setGroupModal,
      modalBtn,
      contacts,
      displaySMSDialog,
      groupMappedTree,
      filterNodeMethod,
      copylink,
      selectedLink,
      newPersonData,
      totalItems,
      attendanceData,
      displayEmailDialog,
      selectedGroupMembers,
      showSMS,
      showEmail,
      isGroupLeader,
      enableLogin,
      tenantID,
      sendMarkedMemberSms,
      sendMarkedMemberEmail,
      uploadToGroup,
      closeGroupModal,
      archive,
      openPositionArchive,
      positionArchive,
      displayPositionArchive,
      closeArchiveModal,
      importMember,
      window,
      innerWidth,
      searchGroupMemberText,
      searchGroupMembers,
      field,
      groups,
      copyHideDiv,
      selectedIntendedSubGroup,
      addSubGroup,
      searchGroupText,
      searchForGroups,
      searchGroupRef,
      grouploading,
      setSelectedGroupToMove,
      lastGroupChild,
      setSelectedGroupToCopy,
      setCopyGroupProp,
      selectedTree,
      // setGroupValue,
      flattenedTree,
      mdAndUp,
      lgAndUp,
      xlAndUp,
      xsOnly,
      createGroupHeaders,
      QRCodeDialog,
      qrCode,
      moveSelectedTree,
      flattenTree,
      showConfirmModal,
      deleteAttendance,
      formatDate,
      moveLoading,
      dismissMoveModal,
      confirmMultipleDelete,
      primarycolor,
      setFilterGroups,
      removeSubGroup,
    };
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.botom {
  border-bottom: 7px solid rgb(252, 248, 248);
  border-radius: 2px;
  position: relative;
  /* border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px; */

  /* height: 4px; */
}

.add-person-btn {
  background: #136acd;
  color: #fff;
}

.buttonn {
  padding: 8px 20px;
  border: none;
  border-radius: 22px;
  font-size: 16px;
  font-weight: 600;
  margin: 0 8px;
  outline: none;
  text-decoration: none;
  box-sizing: border-box;
}

.mid-header-row {
  border-bottom: 1px solid #dde2e6;
}

.events {
  font: normal normal 800 29px Nunito sans;
}

.baseline {
  transition: all 150ms ease-in-out;
  background-color: #136acd;
  position: relative;
  border-radius: 10px;
  height: 4px;
  top: 5px;
  left: 0px;
  /* width: 35%; */
  opacity: 1;
}

.hide-base {
  transition: all 150ms ease-in-out;
  background-color: #136acd;
  position: relative;
  border-radius: 10px;
  z-index: 175;
  height: 4px;
  top: 35px;
  left: 0px;
  opacity: 0;
}

.baselinetwo {
  transition: all 150ms ease-in-out;
  background-color: #136acd;
  position: relative;
  border-radius: 10px;
  height: 4px;
  top: 5px;
  left: 0px;
  opacity: 1;
}

.m-wrapper {
  background-color: white !important;
  width: 875px;
  position: absolute;
  right: 0px;
  top: 0;
  height: 100%;
  padding: 70px;
}

.m-wrapper2 {
  background-color: white !important;
  width: 875px;
  position: absolute;
  right: 0px;
  top: 0;
  /* height: 100%; */
  padding: 70px;
}

.hide-basetwo {
  transition: all 150ms ease-in-out;
  background-color: #136acd;
  position: absolute;
  /* background-color: #33475b; */
  /* color: #136acd" */
  border-radius: 10px;
  /* bottom: -2.5px; */
  z-index: 175;
  height: 4px;
  top: 36px;
  left: 0px;
  width: 50%;
  opacity: 0;
}

.btnn {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.label-sub {
  width: 100px;
}

/* .dropdown {
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  width: 100%;
} */

/* .check-box{
     vertical-align:middle;
  } */
@media screen and (max-width: 947px) {
  .m-wrapper,
  .m-wrapper2 {
    width: 700px;
    padding: 50px;
  }
}

@media screen and (max-width: 767px) {
  /* .baseline {
            width: 40%;
        }
        .hide-base {
            width: 40%;
        } */
  .m-wrapper,
  .m-wrapper2 {
    width: 400px;
    padding: 40px;
  }
}

@media screen and (max-width: 575px) {
  /* .baseline {
            width: 20%;
        }
        .hide-base {
            width: 20%;
        } */
  .events {
    padding-bottom: 22px;
    font: normal normal 800 29px Nunito sans;
    font-size: x-large;
    /* padding-top: -10px; */
  }

  .botom {
    display: flex;
    gap: 1.5rem;
  }

  .c-pointer {
    cursor: pointer;
    flex: 1;
  }

  .m-wrapper,
  .m-wrapper2 {
    width: 350px;
    padding: 20px;
  }
}

@media (max-width: 399px) {
  .actions {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}

.remove-btn {
  background: red !important;
  padding: 10px 20px;
}

.mid-header-text {
  color: #136acd;
  font-weight: bold;
}

.table-header-row {
  background: #ebeff4;
  border-top: 1px solid #dde2e6;
  border-radius: 8px 8px 0 0;
}

.hidden-header {
  display: none;
}

.default-btn {
  background: #ebeff4;
}

/* .bottom-box {
  border: 1px solid #dde2e6;
  border-radius: 10px;
} */

.action-btns a {
  text-decoration: none;
}

.modal-header {
  border-bottom: none !important;
}

.modal-footer {
  border-top: none !important;
}

.select-member {
  padding: 0.1rem 0.4rem;
  border: 1px solid #02172e30;
  border-radius: 30px;
}

.remove-member {
  color: #a9adb1;
  font-weight: bold;
}

.remove-member:hover {
  cursor: pointer;
}

.dropdown-toggle::after {
  margin-left: auto;
  vertical-align: 0.255em;
  content: "";
  border-top: 0.3em solid;
  border-right: 0.3em solid transparent;
  border-bottom: 0;
  border-left: 0.3em solid transparent;
  text-align: right !important;
  right: 10px;
  top: 20px;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.dropdown-toggle:focus {
  outline: none !important;
  border: none;
}

.cancel {
  border: 1px solid #dde2e6;
}

/* .group-form { */
/* box-shadow: 0px 5px 15px #00000017;
  border: 1px solid #dde2e6;
  border-radius: 10px; */
/* } */

.grey-background {
  background: #ebeff4;
}

.text-grey {
  color: grey;
}

.send-dropdown {
  border: 1px solid #ddd;
  width: 124px;
  position: absolute;
  background: #fff;
}

.send-dropdown a {
  color: #190138;
  font-size: 14px;
  text-decoration: none;
}

.hide {
  display: none;
}

.dd-item:hover {
  cursor: pointer;
}

.hint {
  font-size: 14px;
  font-weight: 600;
}

.amber {
  background: #ffbf00 !important;
}

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

.btn-primary {
  background: #136acd !important;
}

@media screen and (max-width: 767px) {
  .hidden-header {
    display: inline-block;
    font-weight: bold;
  }

  .table-header-row {
    display: none;
  }
}

.fa-ellipsis-v {
  padding: 10px;
}

.div-card {
  position: absolute;
  background: white;
  z-index: 1;
  width: 100%;
  box-shadow: 0 0 11px rgba(33, 33, 33, 0.2);
  max-height: 400px;
  overflow: scroll;
}

.move-card {
  position: absolute;
  background: white;
  z-index: 1;
  width: 100%;
  top: 40px;
  box-shadow: 0 0 11px rgba(33, 33, 33, 0.2);
  max-height: 400px;
  overflow: scroll;
}

@media (max-width: 600px) {
  .btnn {
    flex-wrap: wrap;
    gap: 0.6rem;
  }
}
</style>
