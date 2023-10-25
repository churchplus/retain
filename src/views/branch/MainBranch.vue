<template>
  <div class="container-fluid px-0">
    <div class="d-flex flex-column flex-sm-row justify-content-sm-between mb-3">
      <div class="head-text">Manage Branches</div>
      <div class="mb-3">
        <div class="c-pointer">
          <!-- <router-link to="/tenant/branch/addbranch"> -->
          <el-button round class="header-btn" data-toggle="modal" data-target="#statusmodal" :color="primarycolor"
            ref="statusmodalBtn">
            Add Branch
          </el-button>
          <!-- </router-link> -->
        </div>
      </div>
    </div>
    <div class="container-fluid">
      <div class="py-5 px-3 pl-3 pl-md-0 row justify-content-between branch-corner">
        <div class="col-md-3 col-sm-12 px-0 d-flex align-items-start">
          <img src="../../assets/thingstodo.svg" class="" alt="" />
          <div class="font-weight-bold col-md-12 px-0">
            <div class="font-weight-bold h5">Things You Can Do</div>
            <div class="mt-2">
              <router-link class="primary--text text-decoration-none" to="/tenant/people/add">Add Member</router-link>
            </div>
            <div class="mt-2 h6 font-weight-bold ">
              <router-link class="primary--text text-decoration-none cursor-pointer "
                to="/tenant/people/addfirsttimer">Add First Timer</router-link>
            </div>
            <div class="mt-2 h6 font-weight-bold primary--text cursor-pointer" @click="sendMarkedMemberSms">
              <!-- <router-link class="primary--text" to="/tenant/sms/compose"
                > -->
              Send SMS
              <!-- </router-link
              > -->
            </div>
            <div class="mt-2 h6 font-weight-bold primary--text cursor-pointer" @click="sendMarkedBranchEmail">
              Send Email
            </div>
            <div class="mt-2 h6 font-weight-bold cursor-pointer">
              <div @click="displayWhatsappDrawer" class="primary--text">
                Send Whatsapp
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-2 col-sm-6 mt-3 mt-md-0 font-weight-bold">
          <div class="row justify-content-center" style="min-width: 100%">
            <div class="col-md-12 col-sm-11 card-summary px-0 shadow">
              <div class="col-md-12">
                <div class="row">
                  <div class="col-md-2 mt-2 text-color">
                    <img src="../../assets/git-branch.png" class="rounded-circle px-1 py-1 icon" alt="" />
                    <!-- <el-icon :size="35" class="rounded-circle p-1 icon"
                    ><Share
                  /></el-icon> -->
                  </div>
                </div>
              </div>
              <div class="col-md-12 mt-4 pt-2 font-weight-bold h4 text-right" v-loading="branchLoading">
                {{ allBranchDetail.length }}
              </div>
              <div class="total-bg col-md-12 py-3 font-weight-bold px-0 box-bottom text-center">
                Total Branches
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-2 col-sm-6 mt-3 mt-md-0 font-weight-bold">
          <div class="row justify-content-center" style="min-width: 100%">
            <div class="col-md-12 col-sm-11 card-summary px-0 shadow">
              <div class="col-md-12">
                <div class="row">
                  <div class="primary--text col-md-2 mt-2">
                    <img src="../../assets/users4.png" alt="" class="rounded-circle p-1 icon" />
                    <!-- <el-icon :size="35" class="rounded-circle p-1 icon"
                    ><User
                  /></el-icon> -->
                  </div>
                </div>
              </div>
              <div class="col-md-12 mt-4 pt-2 font-weight-bold h4 text-right" v-loading="loading">
                {{ getTotalPeopleBch }}
              </div>
              <div class="total-bg col-md-12 py-3 font-weight-bold px-0 box-bottom text-center">
                Total People
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-2 col-sm-6 mt-3 mt-md-0 font-weight-bold">
          <div class="row justify-content-center" style="min-width: 100%">
            <div class="col-md-12 col-sm-11 card-summary px-0 shadow">
              <div class="col-md-12">
                <div class="row">
                  <div class="text-primary col-md-2 mt-2">
                    <img src="../../assets/Vector.png" class="rounded-circle py-1 px-2 icon" alt="" />
                  </div>
                </div>
              </div>
              <div class="col-md-12 mt-4 pt-2 font-weight-bold h4 text-right" v-loading="loading">
                {{ getAllAverageAttendance }}
              </div>
              <div class="total-bg col-md-12 py-3 font-weight-bold px-0 box-bottom text-center">
                {{ averageAttendace }}
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-2 col-sm-6 mt-3 mt-md-0 font-weight-bold">
          <div class="row justify-content-center" style="min-width: 100%">
            <div class="col-md-12 col-sm-11 card-summary px-0 shadow">
              <div class="col-md-12">
                <div class="row">
                  <div class="col-md-2 mt-2">
                    <img src="../../assets/money.png" class="rounded-circle p-1 icon" alt="" />
                  </div>
                </div>
              </div>
              <div class="col-md-12 mt-4 pt-2 font-weight-bold h4 text-right" v-loading="loading" v-if="openHideAmonut">
                {{ getAllAverageIncome }}
              </div>
              <div class="col-md-12 mt-4 pt-2 font-weight-bold text-secondary h4 text-right" v-if="!openHideAmonut">
                **********
              </div>
              <div class="total-bg col-md-12 py-3 font-weight-bold px-0 box-bottom text-center">
                Average Income
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-show="allBranchDetail && allBranchDetail.length > 0 && !loading && !networkError">
      <div class="container-fluid mt-3">
        <div class="row justify-content-between">
          <div class="col-md-7 col-12 rounded shadow" v-loading="loading">
            <div class="row">
              <div class="col-md-12 mt-3 d-flex justify-content-between">
                <div class="font-weight-bold">Total Attendance Chart</div>
                <div>view All</div>
              </div>
              <div class="col-md-12 d-flex justify-content-center">
                <div class="w-100">
                  <DonutChart domId="charts" :data="mappedAverageAttendanceItem" :total="getAllAverageAttendance" />
                </div>
              </div>
            </div>
            <!-- <div class="row">
            <div class="col-md-12 mt-4">
              <div class="font-weight-bold">Top Performing Branches</div>
            </div>
            <div class="col-md-12 mt-3">
              <div class="row">
                <div class="col-md-12">
                  <div class="font-weight-bold">First Timers</div>
                  <div class="mt-3 col-md-12">
                    <RadialChart domId="view2" />
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="font-weight-bold">Finance</div>
                  <div class="mt-3"><RadialChart domId="view4" /></div>
                </div>
                <div class="col-md-4">
                  <div class="font-weight-bold">New Convert</div>
                  <div class="mt-3" style=""><RadialChart domId="view1" /></div>
                </div>
              </div>
            </div>
          </div> -->
          </div>
          <div class="col-md-4 px-0 mx-0 col-12 mt-3 mt-md-0 shadow rounded" v-loading="loading">
            <div class="row">
              <div class="col-md-12 pl-4">
                <div class="mt-2">Average income</div>
                <div @click="hideOpen">
                  <div class="mt-2" v-if="openHideAmonut">
                    <el-icon :size="25">
                      <View />
                    </el-icon>
                  </div>
                  <div class="mt-2" v-if="!openHideAmonut">
                    <el-icon :size="25">
                      <Hide />
                    </el-icon>
                  </div>
                </div>

                <div class="font-weight-bold h5 mt-2" v-if="openHideAmonut">
                  {{ getAllAverageIncome }}
                </div>
                <div class="font-weight-bold mt-2 text-secondary h5" v-if="!openHideAmonut">
                  HIDDEN
                </div>
              </div>
              <div class="col-md-12 px-0 d-flex justify-content-center mb-3">
                <PieChart domId="view" distance="5" :titleMargin="10" :summary="mappedAverageIncomeChart" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container-fluid mt-4" v-loading="loading">
        <div class="row border">
          <!-- <div class="col-md-12 d-flex justify-content-end py-3">
          <div>
            <el-dropdown trigger="click" class="w-100">
              <span class="el-dropdown-link w-100">
                <div
                  class="d-flex justify-content-between h5 text-secondary w-100"
                  size="large"
                >
                  <span>{{
                    selectedBranches && selectedBranches.name
                      ? selectedBranches.name
                      : selectedBranches
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
                  <el-dropdown-item
                    v-for="(itm, indx) in chartItemdropdown"
                    :key="indx"
                    @click="selectedType3(itm)"
                    >{{ itm.name }}
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div> -->
          <div class="col-md-12">
            <ColumnChart domId="chart2" :data="firstTimerChart" :series="series" :header="firstTimerHeader" />
          </div>
        </div>
      </div>
      <div class="container-fluid mt-4" v-loading="loading">
        <div class="row border">
          <!-- <div class="col-md-12 mt-2 d-flex justify-content-end py-3">
          <div>
            <el-dropdown trigger="click" class="w-100">
              <span class="el-dropdown-link w-100">
                <div
                  class="d-flex justify-content-between h5 text-secondary w-100"
                  size="large"
                >
                  <span>{{
                    selectedWeekly && selectedWeekly.name
                      ? selectedWeekly.name
                      : selectedWeekly
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
                  <el-dropdown-item
                    v-for="(itm, indx) in chartItemdropdown"
                    :key="indx"
                    @click="selectedType2(itm)"
                    >{{ itm.name }}
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div> -->
          <div class="col-md-12">
            <ColumnChart domId="chart4" :data="membersAttendanceChart" :series="series" :header="membersHeader" />
          </div>
        </div>
      </div>
      <div class="container-fluid mt-4" v-loading="loading">
        <div class="row border">
          <!-- <div class="col-md-12 d-flex justify-content-end py-3">
          <div>
            <el-dropdown trigger="click" class="w-100">
              <span class="el-dropdown-link w-100">
                <div
                  class="d-flex justify-content-between h5 text-secondary w-100"
                  size="large"
                >
                  <span>{{
                    selectedMonthly && selectedMonthly.name
                      ? selectedMonthly.name
                      : selectedMonthly
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
                  <el-dropdown-item
                    v-for="(itm, indx) in chartItemdropdown"
                    :key="indx"
                    @click="selectedType1(itm)"
                    >{{ itm.name }}
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div> -->
          <div class="col-md-12">
            <ColumnChart domId="chart1" :data="incomeExpenseChart" :series="series" :header="IncomeExpHeader" />
          </div>
        </div>
      </div>


      <div class="container-fluid mt-4">
        <div class="row border ">
          <div class="col-md-6">
            <div class="row">
              <div class="col-md-12 py-3 text-center" :class="{
                'primary-bg text-white': showBranchDetail,
                'total-bg': !showBranchDetail,
              }" @click="branchDetail">
                <el-icon :size="20">
                  <List />
                </el-icon>
                Branch list
              </div>
              <div class="col-md-12 d-flex justify-content-end mt-3">
                <div class="font-weight-bold">
                  <img src="../../assets/users4.png" alt="" class=" " /> Member
                  Size
                </div>
              </div>
              <div class="col-md-12 mt-3  " style="height: 30rem; overflow: auto;">
                <div class="row border" v-for="(item, index) in allBranchDetail" :key="index">
                  <div class="col-md-12 py-2 border border-bottom-0 c-pointer d-flex justify-content-between"
                    :class="{ 'branch-bg': colorChange }" @click="branchItem(item)">
                    <div class="font-weight-bold h6">{{ item.name }}</div>
                    <div>{{ item.membershipSize }}</div>
                  </div>
                </div>
                <div class="col-md-12 d-block d-md-none" :class="{
                  'branchItem-section-hidden': !branchItemSection,
                  'branchItem-section': branchItemSection,
                }">
                  <div class="row">
                    <div class="col-md-12 d-flex justify-content-between mt-3">
                      <div class="font-weight-bold">
                        {{ branchProfile.name }}
                      </div>
                      <div class="small text-primary cursor-pointer" @click="viewBranch(branchProfile.id)">
                        View Branch
                      </div>
                    </div>
                    <div class="col-md-12 mt-3">
                      <div class="mt-2">
                        First Timer :
                        <span class="font-weight-bold">{{
                          branchProfile.firstTimerCount
                        }}</span>
                      </div>
                      <div class="mt-2">
                        Member Size :
                        <span class="font-weight-bold">{{
                          branchProfile.membershipSize
                        }}</span>
                      </div>
                      <div class="mt-2">
                        Average Income :
                        <span class="font-weight-bold"> {{ branchProfile.currentYearAverageIncome }}</span>
                      </div>
                      <div class="mt-2">
                        Average Expenses :
                        <span class="font-weight-bold"> {{ branchProfile.currentYearAverageExpense }}</span>
                      </div>
                    </div>
                    <div class="col-md-12">
                      <hr class="w-100" />
                    </div>
                    <div class="col-md-12 d-flex justify-content-center">
                      <div class="small">Pastor's Profile</div>
                    </div>
                    <div class="col-md-12 d-flex justify-content-center pastor-picture">
                      <img v-if="branchProfile.logo" :src="branchProfile.logo" alt="" />
                      <img v-else src="../../assets/people/avatar-male.png" alt="" />
                    </div>
                    <div class="col-md-12 d-flex justify-content-center">
                      <div class="font-weight-bold">
                        {{ branchProfile.pastorName }}
                      </div>
                    </div>
                    <div class="col-md-12 d-flex justify-content-center">
                      <div>{{ branchProfile.phoneNumber }}</div>
                    </div>
                    <div class="col-md-12 d-flex justify-content-center">
                      <div>{{ branchProfile.pastorEmail }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6 ">
            <div class="row" style="height: 37rem; overflow: auto;">
              <div class="col-md-12 bg-secondary text-center py-3" :class="{
                'primary-bg text-white': showbranchHierachy,
                'total-bg': !showbranchHierachy,
              }" @click="branchHierachy">
                <el-icon :size="20" class="">
                  <Expand />
                </el-icon> Branch Hierarchy
              </div>
              <div class="col-md-12 d-none d-md-block" v-if="viewBranchDetail">
                <div class="row">
                  <div class="col-md-12 d-flex justify-content-between mt-3">
                    <div class="font-weight-bold h5">
                      <img src="../../assets/git-branch.png" class="pr-2" alt="" />{{ branchProfile.name }}
                    </div>
                    <div class="text-primary font-weight-bold cursor-pointer" @click="viewBranch(branchProfile)">
                      View Branch
                    </div>
                  </div>
                  <div class="col-md-12 mt-3">
                    <div class="mt-2">
                      First Timer :
                      <span class="font-weight-bold">{{
                        branchProfile.firstTimerCount
                      }}</span>
                    </div>
                    <div class="mt-2">
                      Member Size :
                      <span class="font-weight-bold">{{
                        branchProfile.membershipSize
                      }}</span>
                    </div>
                    <div class="mt-2">
                      Average Income :
                      <span class="font-weight-bold"> {{ branchProfile.currency.symbol }} {{
                        branchProfile.currentYearAverageIncome }}</span>
                    </div>
                    <div class="mt-2">
                      Average Expenses :
                      <span class="font-weight-bold"> {{ branchProfile.currency.symbol }} {{
                        branchProfile.currentYearAverageExpense }}</span>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <hr class="w-100" />
                  </div>
                  <div class="col-md-12 d-flex justify-content-center">
                    <div class="small">Pastor's Profile</div>
                  </div>
                  <div class="col-md-12 d-flex justify-content-center pastor-picture">
                    <img v-if="branchProfile.logo" :src="branchProfile.logo" alt="" />
                    <img v-else src="../../assets/people/avatar-male.png" alt="" />
                  </div>
                  <div class="col-md-12 d-flex justify-content-center">
                    <div class="font-weight-bold">
                      {{ branchProfile.pastorName }}
                    </div>
                  </div>
                  <div class="col-md-12 d-flex justify-content-center">
                    <div>{{ branchProfile.phoneNumber }}</div>
                  </div>
                  <div class="col-md-12 d-flex justify-content-center">
                    <div>{{ branchProfile.email }}</div>
                  </div>
                </div>
              </div>
              <div class="col-md-12" v-if="!viewBranchDetail">
                <div class="row">
                  <div class="col-md-12 domId d-flex justify-content-center align-items-center"
                    v-show="mappedBranch.length > 0">
                    <OrganizationChart :value="data1" :collapsible="true" class="company" selectionMode="single"
                      v-model:selectionKeys="selection">
                      <template #person="slotProps">
                        <div class="node-content">
                          <img :src="slotProps.node.data.label.logo" width="32" />
                          <div>{{ slotProps.node.data.name }}</div>
                        </div>
                      </template>
                      <template #default="slotProps">
                        <span>{{
                          slotProps.node && slotProps.node.data
                          ? slotProps.node.data.name
                          : ""
                        }}</span>
                      </template>
                    </OrganizationChart>
                  </div>
                  <div class="col-12 border p-3" style="height: 100%; border-radius: 5px; font-size: 1.5em"
                    v-show="mappedBranch.length === 0">
                    <div>👋 Hey!</div>
                    <div class="mt-3">
                      Welcome to the branching feature in Churchplus.
                    </div>
                    <div class="mt-3">
                      Manage your ministry branches easily via this branch
                      feature. Start by setting up your ministry's hierarchies in
                      <router-link to="/tenant/settings/branchlevelsettings">Settings</router-link>, then create your
                      branches.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div data-toggle="modal" data-target="#levelmodal" ref="levelmodalBtn" hidden>
        Show modal
      </div>
      <div class="modal fade" id="levelmodal" tabindex="-1" role="dialog" aria-labelledby="importgroupModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document" ref="modal">
          <div class="modal-content pr-2">
            <div class="modal-header py-3">
              <h5 class="modal-title font-weight-700" id="importgroupModalLabel">
                <!-- Set up your branch level -->
                Church Hierarchies and Organisation Structure
              </h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close" ref="closeGroupModal">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-md-12">
                  <div class="mb-3" style="font-size: 1.2em">
                    Set up your branch hierarchies, your branch hierarchies represent the church organisation structure,
                    Fill the form below to create yours. For example Headquarter, Region etc.
                    <!-- You dont have branch hierarchies set up yet, create the
                  hierarchies, then you can proceed to create your branch -->
                  </div>
                  <BranchSettings />
                  <button
                    class="mt-3 mb-3 offset-5 col-4 default-btn primary-bg text-white font-weight-bold c-pointer border-0 text-center"
                    data-dismiss="modal" @click="goToAddBranch">
                    Proceed
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div data-toggle="modal" data-target="#joinmodal" ref="joinmodalBtn" hidden>
        Show modal
      </div>
      <div class="modal fade" id="joinmodal" tabindex="-1" role="dialog" aria-labelledby="importgroupModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document" ref="modal">
          <div class="modal-content pr-2">
            <div class="modal-header py-3">
              <h5 class="modal-title font-weight-700" id="importgroupModalLabel">
                Enter your code to join a branch network
              </h5>
              <el-button ref="closeJoinNetworkModal" class="close d-flex" size="large" data-dismiss="modal"
                aria-label="Close">
                <el-icon :size="16" class=" mt-3">
                  <CloseBold />
                </el-icon>
              </el-button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-md-12">
                  <div class="p-field p-col-12 p-md-4">
                    <!-- <span class="p-float-label"> -->
                    <el-input class="w-100" id="inputtext" placeholder="Enter your code" type="text" v-model="code" />
                    <!-- <label for="inputtext">Enter your code</label> -->
                    <!-- </span> -->
                  </div>
                </div>
                <div class="col-md-12 d-flex justify-content-center ">
                  <el-button class="mt-3 mb-3  col-4  text-white font-weight-bold c-pointer border-0 text-center"
                    :color="primarycolor" size="large" round @click="joinNetwork">
                    Join network
                  </el-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal fade" id="statusmodal" tabindex="-1" role="dialog" aria-labelledby="importgroupModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document" ref="modal">
          <div class="modal-content pr-2">
            <div class="modal-header py-3">
              <h5 class="modal-title font-weight-700">
                Which of these option best suit your intentions?
              </h5>
              <el-button class="close  d-flex" data-dismiss="modal" aria-label="Close" ref="closeStatusModal">
                <el-icon :size="16" class="mt-4">
                  <CloseBold />
                </el-icon>
              </el-button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-md-10 offset-1">
                  <div class="default-btn border mb-3 text-center c-pointer" @click="setUpBranch">
                    Setup branch network
                  </div>
                  <div class="default-btn border mb-3 text-center c-pointer" data-dismiss="modal" @click="joinBranch">
                    Join branch network
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="no-person" v-if="!loading && allBranchDetail && allBranchDetail.length === 0 && !networkError">
      <div class="empty-img">
        <p><img src="../../assets/people/people-empty.svg" alt="" /></p>
        <p class="tip">You haven't added any Branch yet</p>
        <el-button round class="header-btn" data-toggle="modal" data-target="#statusmodal" :color="primarycolor"
          ref="statusmodalBtn">
          Add Branch
        </el-button>
      </div>
    </div>
    <div class="adjust-network" v-else-if="networkError">
      <img src="../../assets/network-disconnected.png" />
      <div>Opps, Your internet connection was disrupted</div>
    </div>

    <el-drawer v-model="showSMS" :size="mdAndUp || lgAndUp || xlAndUp ? '70%' : '100%'" direction="rtl">
      <template #header>
        <h4>Send SMS</h4>
      </template>
      <template #default>
        <div>
          <smsComponent @closesidemodal="() => (showSMS = false)" />
          <!-- <smsComponent :phoneNumbers="contacts" @closesidemodal="() => showSMS = false" /> -->
        </div>
      </template>
    </el-drawer>
    <el-drawer v-model="showEmail" :size="mdAndUp || lgAndUp || xlAndUp ? '70%' : '100%'" direction="rtl">
      <template #header>
        <h4>Send Email</h4>
      </template>
      <template #default>
        <div>
          <emailComponent @closesidemodal="() => (showEmail = false)" />
          <!-- <emailComponent :selectedGroupMembers="markedMembers" @closesidemodal="() => showEmail = false" /> -->
        </div>
      </template>
    </el-drawer>
    <el-drawer v-model="showWhatsapp" :size="mdAndUp || lgAndUp || xlAndUp ? '70%' : '100%'" direction="rtl">
      <template #default>
        <div>
          <whatSappComponent :allBranchDetail="allBranchDetail" @closesidemodal="() => (showWhatsapp = false)" />
          <!-- <emailComponent :selectedGroupMembers="markedMembers" @closesidemodal="() => showEmail = false" /> -->
        </div>
      </template>

    </el-drawer>
    <el-skeleton class="w-100" animated v-if="loading">
      <template #template>
        <div style="
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 20px;
          ">
          <el-skeleton-item variant="text" style="width: 240px; height: 240px" />
          <el-skeleton-item variant="text" style="width: 240px; height: 240px" />
        </div>
        <el-skeleton class="w-100 mt-5" style="height: 25px" :rows="20" animated />
      </template>
    </el-skeleton>
  </div>
</template>

<script>
import { ref, inject, onMounted, onUpdated, watchEffect, computed } from "vue";
import { socket } from "@/socket";
import AuthenticateWhatsapp from "../../components/whatsapp/AuthenticateWhatsapp.vue";
import PieChart from "../../components/charts/BranchPieChart.vue";
import BranchSettings from "../settings/BranchLevelSettings.vue";
import router from "../../router";
import deviceBreakpoint from "../../mixins/deviceBreakpoint";
import axios from "@/gateway/backendapi";
import DonutChart from "../../components/charts/DonutChart.vue";
import RadialChart from "../../components/charts/RadialChart.vue";
import ColumnChart from "@/components/charts/BranchColumnChart.vue";
import whatSappComponent from "../groups/component/whatSappComponent.vue";
import smsComponent from "../groups/component/smsComponent.vue";
import emailComponent from "../groups/component/emailComponent.vue";
import store from "../../store/store";
import OrganizationChart from "primevue/organizationchart";
import { ElMessage } from "element-plus";
import { useRoute } from "vue-router";
export default {
  components: {
    PieChart,
    DonutChart,
    BranchSettings,
    emailComponent,
    whatSappComponent,
    AuthenticateWhatsapp,
    smsComponent,
    RadialChart,
    ColumnChart,
    OrganizationChart,
  },
  setup() {
    const primarycolor = inject("primarycolor");
    const data1 = ref({});
    const openHideAmonut = ref(true);
    const route = useRoute();
    const code = ref("");
    const selectedMonthly = ref("Branches");
    const firstTimerHeader = ref("First Timer Attendance");
    const membersHeader = ref("Members Attendance");
    const IncomeExpHeader = ref("Income & Expenses");
    const selectedBranches = ref("Branches");
    const selectedWeekly = ref("Branches");
    const attendance = ref("Average Attendance");
    const { mdAndUp, lgAndUp, xlAndUp, xsOnly } = deviceBreakpoint();
    const showbranchHierachy = ref(false);
    const sendWhatsappToMultiple = ref(false);
    const branchItemSection = ref(false);
    const showBranchDetail = ref(true);
    const viewBranchDetail = ref(false);
    const showSMS = ref(false);
    const networkError = ref(false);
    const branchesAnalytics = ref({});
    const averageIncomeChartResult = ref([]);
    const colorChange = ref(false);
    const loading = ref(false);
    const branchLoading = ref(false);
    const branchChatDetail = ref([]);
    const allBranchDetail = ref(store.getters["branch/getbranches"]);
    console.log(allBranchDetail.value, 'ddgagsg')
    const series = ref([]);
    const joinmodalBtn = ref();
    const firstTimerData = ref([]);
    const mainMembersData = ref([]);
    const mainIncomeExpenseData = ref([]);
    const expenseData = ref([]);
    const incomeData = ref([]);
    const membersData = ref([]);
    const firstTimerAttendanceData = ref([]);
    const mappedBranch = ref([]);
    const branchProfile = ref({});
    const closeJoinNetworkModal = ref();
    const selection = ref({});
    const getAverageIncomeChart = ref([]);
    const hierarchies = ref([]);
    const closeStatusModal = ref();
    const levelmodalBtn = ref();
    const sendingwhatsappmessage = ref(false);
    const branchSideShow = ref(false);
    const showWhatsapp = ref(false);
    const showEmail = ref(false);
    const getAverageAttendanceItem = ref([]);
    const tenantId = ref(
      store.getters.currentUser && store.getters.currentUser.tenantId
        ? store.getters.currentUser.tenantId
        : 0
    );
    const averageAttendace = ref("");

    const getRoute = () => {
      if (route.fullPath === "/tenant/branch/mainbranchsummary") {
        branchSideShow.value = true;
      }
    };
    getRoute();

    const getTotalPeopleBch = computed(() => {
      if (allBranchDetail.value && allBranchDetail.value.length > 0) {
        loading.value = false;
        return allBranchDetail.value.map((i) => i.membershipSize)
          .reduce((b, a) => b + a, 0);
      } else {
        return 0;
      }
    })
    const getAllAverageAttendance = computed(() => {
      if (allBranchDetail.value && allBranchDetail.value.length > 0) {
        loading.value = false;
        return allBranchDetail.value
          .map((i) => i.currentYearAverageAttendance)
          .reduce((b, a) => b + a, 0)
          .toFixed(0);
      } else {
        return 0;
      }
    })
    const getAllAverageIncome = computed(() => {
      if (allBranchDetail.value && allBranchDetail.value.length > 0) {
        return allBranchDetail.value.map((i) => i.currentYearAverageIncome)
          .reduce((b, a) => b + a, 0);
      } else {
        return 0;
      }
    })
    const sendMarkedMemberSms = () => {
      // contacts.value = marked.value.filter((i) => i.mobilePhone).map((i) => i.mobilePhone).join()
      showSMS.value = true;
    };
    const sendMarkedBranchEmail = () => {
      // contacts.value = marked.value.filter((i) => i.mobilePhone).map((i) => i.mobilePhone).join()
      showEmail.value = true;
    };

    const viewBranch = (item) => {
      console.log(item, "mmmmmmmm");
      localStorage.setItem("branchId", item.id);
      localStorage.setItem("branchName", item.name);
      router.push("/tenant/branches/summary");
    };

    const branchItem = (item) => {
      viewBranchDetail.value = true;
      branchItemSection.value = !branchItemSection.value;
      branchProfile.value = item;
      colorChange.value = true;
      showBranchDetail.value = true;
      showbranchHierachy.value = false;
      store.dispatch("setCurrentBranch", item);
      console.log(item, 'jjkjk');
    };

    onMounted(() => {
      const lastCharacters = attendance.value.slice(-3);
      averageAttendace.value = attendance.value.replace(lastCharacters, "...");
    });
    const chartItemdropdown = ref([
      { name: "Branches", id: 1 },
      { name: "Weekly", id: 2 },
      { name: "Monthly", id: 3 },
    ]);



    // const sendWhatsapp = () => {
    //   sendingwhatsappmessage.value = true
    //   if (sendWhatsappToMultiple.value) {
    //     socket.emit('sendwhatsappmessage', {
    //       id: clientSessionId.value,
    //       phone_number: marked.value.map(i => i.mobilePhone),
    //       message: whatsappmessage.value
    //     })
    //   }
    //   else {
    //     socket.emit('sendwhatsappmessage', {
    //       id: clientSessionId.value,
    //       phone_number: whatsappRecipient.value.mobilePhone,
    //       message: whatsappmessage.value
    //     })
    //   }
    // }
    const getallBracnches = async () => {
      try {
        let { data } = await axios.get(
          `/api/Branching/getallbranches/${tenantId.value}`
        );
        console.log(data, ",lklkll");
      } catch (error) {
        console.log(error);
      }
    };
    getallBracnches();

    const getHierarchies = async () => {
      try {
        let { data } = await axios.get("/branching/hierarchies");
        console.log(data);
        hierarchies.value = data.returnObject;
      } catch (err) {
        console.log(err);
      }
    };
    getHierarchies();

    const setUpBranch = () => {
      if (hierarchies.value.length === 0) {
        levelmodalBtn.value.click();
      } else {
        closeStatusModal.value.ref.click();
        router.push("/tenant/branch/addbranch");
      }
    };

    const joinBranch = () => {
      joinmodalBtn.value.click();
    };

    const membersAttendanceChart = computed(() => {
      if (branchChatDetail.value.length === 0) return [];
      branchChatDetail.value.forEach((i) => {
        let membersIndex = Object.keys(i).findIndex(
          (i) => i === "membershipSize"
        );
        let membersValue = Object.values(i)[membersIndex];
        membersData.value.unshift(membersValue);
      });

      console.log(membersData.value, "allMemberss");

      mainMembersData.value.push({
        name: " Members ",
        color: "#01058A",
        data: membersData.value,
      });

      return mainMembersData.value;
    });
    watchEffect(() => {
      socket.on("messagesent", (data) => {
        console.log(data, "status");

        swal(" Success", "Whatsapp message sent successfully!", "success");
        showWhatsapp.value = false;
        sendingwhatsappmessage.value = false;
      });
    });
    const displayWhatsappDrawer = (item) => {
      showWhatsapp.value = true;
      if (item) {
        // whatsappRecipient.value = item;
        sendWhatsappToMultiple.value = false;
      } else {
        // marked.value = marked.value.filter(i => i.mobilePhone).splice(0, 10)
        sendWhatsappToMultiple.value = true;
      }
    };

    const incomeExpenseChart = computed(() => {
      if (branchChatDetail.value.length === 0) return [];
      branchChatDetail.value.forEach((i) => {
        let incomeIndex = Object.keys(i).findIndex(
          (i) => i === "currentYearIncome"
        );
        let incomeValue = Object.values(i)[incomeIndex];
        incomeData.value.unshift(Math.abs(incomeValue));

        let expenseIndex = Object.keys(i).findIndex(
          (i) => i === "currentYearExpense"
        );
        let expenseValue = Object.values(i)[expenseIndex];
        expenseData.value.unshift(expenseValue);
      });

      mainIncomeExpenseData.value.push({
        name: " Income ",
        color: "#01058A",
        data: incomeData.value,
      });
      mainIncomeExpenseData.value.push({
        name: " Expenses ",
        color: "#1AA8E9",
        data: expenseData.value,
      });

      return mainIncomeExpenseData.value;
    });

    const firstTimerChart = computed(() => {
      if (branchChatDetail.value.length === 0) return [];
      branchChatDetail.value.forEach((i) => {
        let firstTimersIndex = Object.keys(i).findIndex(
          (i) => i === "firstTimerCount"
        );
        let firstTimersValue = Object.values(i)[firstTimersIndex];
        firstTimerData.value.unshift(firstTimersValue);
      });

      firstTimerAttendanceData.value.push({
        name: "First Timer",
        color: `#1AA8E9`,
        // color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
        data: firstTimerData.value,
      });
      return firstTimerAttendanceData.value;
    });

    const getFirtTimerSeris = () => {
      branchChatDetail.value.forEach((i) => {
        let serviceIndex = Object.keys(i).findIndex((i) => i === "name");
        let serviceValue = Object.values(i)[serviceIndex];
        // let serviceValue = serviceIndex
        series.value.unshift(serviceValue);
      });
    };

    const averageIncomeChart = (array, key) => {
      // Accepts the array and key
      // Return the end result
      averageIncomeChartResult.value = [];
      let result = array.reduce((result, currentValue) => {
        // If an array already present for key, push it to the array. Else create an array and push the object
        (result[currentValue[key]] = result[currentValue[key]] || []).push(
          currentValue
        );
        return result;
      }, []); // empty object is the initial value for result object
      for (const prop in result) {
        averageIncomeChartResult.value.push({
          name: prop,
          value: result[prop].length,
        });
      }
    };

    // const mappAllBranchDetail = computed(() => {

    // })

    // onMounted(() => {
    //   if(allBranchDetail.value.length === 0) return []
    //   return allBranchDetail.value
    // })
    const mappedAverageIncome = computed(() => {
      if (averageIncomeChartResult.value.length === 0) return [];
      return averageIncomeChartResult.value.map((i) => i);
    });

    const mappedAverageIncomeChart = computed(() => {
      if (getAverageIncomeChart.value.length === 0) return [];
      return getAverageIncomeChart.value.map((i) => i);
    });
    const mappedAverageAttendanceItem = computed(() => {
      if (getAverageAttendanceItem.value.length === 0) return [];
      return getAverageAttendanceItem.value.map((i) => i);
    });

    const whatsappClientState = computed(() => {
      return store.getters["communication/isWhatsappClientReady"];
    });



    const getBranches = async () => {
      branchLoading.value = true;

      try {
        // let { data } = await axios.get("/api/Branching");
        await store.dispatch("branch/getBranches").then((res) => {
          console.log(res, "kkkek");
          allBranchDetail.value = res;
          branchLoading.value = false;
        });
      } catch (error) {
        console.log(error, 'sssddsd');
        branchLoading.value = false;
        networkError.value = true;
        if (error.toString().toLowerCase().includes("network error")) {
          networkError.value = true;
        } else {
          networkError.value = false;
        }
      }
    };

    const getBranchChartDetail = async () => {
      loading.value = true;

      try {
        let { data } = await axios.get("/api/Branching");
        console.log(data, "kkkk");
        branchChatDetail.value = data.returnObject
        getAverageIncomeChart.value = data.returnObject.map((i) => ({
          name: i.name,
          value: i.currentYearAverageIncome,
        }));
        getAverageAttendanceItem.value = data.returnObject.map((i) => ({
          name: i.name,
          value: i.currentYearAverageAttendance,
        }));
        mappedBranch.value = branchChatDetail.value.map((i) => {
          return {
            mainID: i.id,
            data: { name: i.name, avatar: i.logo, label: "CEO" },
            parent: i.parentID,
            styleClass: "p-person",
          };
        });
        let matchedValues = [];

        const allIDs = mappedBranch.value.map((i) => i.mainID);
        let sum = 0;
        allIDs.forEach((i) => {
          mappedBranch.value.forEach((j, ind) => {
            if (i == j.parent) {
              j.id = ind;
              j.parentid = sum;
              matchedValues.push(j);
            }
          });
          sum++;
        });
        const unflatten = function (array, parent, tree) {
          tree = typeof tree !== "undefined" ? tree : [];
          parent = typeof parent !== "undefined" ? parent : { id: 0 };
          var children = _.filter(array, function (child) {
            return child.parentid == parent.id;
          });
          if (!_.isEmpty(children)) {
            if (parent.id == 0) {
              tree = children;
            } else {
              parent["children"] = children;
            }
            _.each(children, function (child) {
              unflatten(array, child);
            });
          }
          return tree;
        };
        let treeConstruted = unflatten(matchedValues);
        const HQ = branchChatDetail.value.find((i) =>
          i.parentID.includes("00000000-000")
        );
        const belowHQ = branchChatDetail.value[0];
        let treeData = {
          key: "0",
          type: "person",
          styleClass: "p-hq",
          data: {
            label: HQ ? HQ : belowHQ,
            name: HQ && HQ.name ? HQ.name : belowHQ.name,
            avatar: HQ && HQ.logo ? HQ.logo : belowHQ.logo,
          },
          children: treeConstruted,
        };
        data1.value = treeData;
        getFirtTimerSeris();
        averageIncomeChart(data.returnObject, "currentYearAverageIncome");
        loading.value = false;
      } catch (error) {
        console.log(error, 'sssddsd');
        loading.value = false;
        networkError.value = true;
        if (error.toString().toLowerCase().includes("network error")) {
          networkError.value = true;
        } else {
          networkError.value = false;
        }
      }
    };
    getBranchChartDetail();


    const getBranchesAnalytics = async () => {
      try {
        let { data } = await axios.get(
          `/api/Branching/analytics?branchID=${tenantId.value}`
        );
        console.log(data, "tttttyui");
        branchesAnalytics.value = data;
      } catch (error) {
        console.log(error);
      }
    };
    getBranchesAnalytics();

    const goToAddBranch = () => {
      closeStatusModal.value.ref.click();
      router.push("/tenant/branch/addbranch");
    };
    const joinNetwork = async () => {
      try {
        let { data } = await axios.post("/api/Branching/joinnetwork", {
          code: code.value,
        });
        closeJoinNetworkModal.value.ref.click();
        ElMessage({
          type: "success",
          message: data.response,
          duration: 5000,
        });
      } catch (err) {
        console.log(err);
      }
    };

    onMounted(() => {
      if (allBranchDetail.value && allBranchDetail.value.length == 0)
        getBranches();
    });

    const hideOpen = () => {
      openHideAmonut.value = !openHideAmonut.value;
    };
    const branchHierachy = () => {
      showbranchHierachy.value = true;
      showBranchDetail.value = false;
      viewBranchDetail.value = false;
      branchItemSection.value = false;
    };
    const branchDetail = () => {
      showBranchDetail.value = true;
      showbranchHierachy.value = false;
    };
    const selectedType1 = (item) => {
      selectedMonthly.value = item;
    };
    const selectedType2 = (item) => {
      selectedWeekly.value = item;
    };
    const selectedType3 = (item) => {
      selectedBranches.value = item;
    };

    return {
      primarycolor,
      mappedBranch,
      membersAttendanceChart,
      // mappAllBranchDetail,
      joinNetwork,
      mdAndUp,
      lgAndUp,
      xlAndUp,
      xsOnly,
      selection,
      incomeExpenseChart,
      route,
      branchSideShow,
      firstTimerChart,
      branchItemSection,
      colorChange,
      branchProfile,
      viewBranch,
      networkError,
      loading,
      branchLoading,
      firstTimerHeader,
      selectedBranches,
      showbranchHierachy,
      mappedAverageIncome,
      mappedAverageIncomeChart,
      mappedAverageAttendanceItem,
      branchItem,
      firstTimerData,
      sendWhatsappToMultiple,
      firstTimerAttendanceData,
      mainIncomeExpenseData,
      incomeData,
      showWhatsapp,
      setUpBranch,
      joinBranch,
      hierarchies,
      showSMS,
      code,
      branchChatDetail,
      expenseData,
      averageIncomeChartResult,
      getAllAverageIncome,
      getAllAverageAttendance,
      getTotalPeopleBch,
      mainMembersData,
      allBranchDetail,
      branchHierachy,
      showBranchDetail,
      whatsappClientState,
      series,
      branchesAnalytics,
      branchDetail,
      sendMarkedBranchEmail,
      selectedMonthly,
      selectedWeekly,
      selectedType1,
      selectedType2,
      branchSideShow,
      selectedType3,
      joinmodalBtn,
      viewBranchDetail,
      membersData,
      IncomeExpHeader,
      membersHeader,
      tenantId,
      hideOpen,
      data1,
      levelmodalBtn,
      sendMarkedMemberSms,
      closeStatusModal,
      chartItemdropdown,
      openHideAmonut,
      goToAddBranch,
      attendance,
      displayWhatsappDrawer,
      closeJoinNetworkModal,
      sendingwhatsappmessage,
      showEmail,
      averageAttendace,
      getAverageIncomeChart,
    };
  },
};
</script>

<style scoped>
.branch-corner {
  border-radius: 0.5rem;
  background: #f3f3f3;
}

.text-color img {
  color: #136acd !important;
}

.domId {
  height: 530px;
  border-radius: 5px;
  min-width: 300px;
  overflow: scroll !important;
  background: #ebeff4;
}

.pastor-picture img {
  height: 10rem;
}

.no-person {
  height: 80vh;
  display: flex;
  text-align: center;
}

.empty-img {
  width: 85%;
  /* min-width: 397px; */
  margin: auto;
}

.empty-img img {
  width: 100%;
  max-width: 200px;
}

.branchItem-section-hidden {
  transition: all 0.8s ease-in-out;
  height: 0 !important;
  overflow: hidden !important;
}

.branchItem-section {
  transition: all 0.8s ease-in-out;
  height: 30rem !important;
  overflow: hidden !important;
}

.box-bottom {
  background: #f1f5f8;
  box-shadow: 0px 11px 17px rgba(206, 205, 205, 0.360784);
  border-radius: 0px 0px 15px 15px;
}

.icon {
  background: #c0dbfacc;
  /* padding: 1rem; */
  height: 2.1rem;
}

.total-bg {
  background: #f1f5f8;
}

.branch-bg {
  background: #ffffff;
}

.branch-bg:hover {
  background: #ebeff4;
}

.card-summary {
  background: #ffff;
  border-radius: 0.5rem;
  /* width: 100% !important; */
}
</style>