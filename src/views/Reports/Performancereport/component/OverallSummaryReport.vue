<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12 px-0">
          <div class="row mt-4">
            <div class="col-md-5">
              <h2 class="font-weight-bold page-hder">New Event and Report</h2>
            </div>
            <div class="col-md-7 d-sm-flex justify-content-md-end">
              <a class="def-btn mr-3 px-md-4 my-sm-1" v-if="false"
                >More Actions <i class="fad fa-caret-circle-down"></i
              ></a>
              <router-link :to="{ name: 'Event', path: '/tenant/event' }">
                <a class="def-btn px-sm-2 px-lg-4 my-sm-1"
                  >Create another report</a
                >
              </router-link>
            </div>
            <Toast />
          </div>
          <hr class="mb-4" />
        <div v-if="!isPending && !errorGettingReport">
          <div class="row mx-1 mb-4 mt-3">
            <div class="col-md-2 pl-0">
              <span class="theader mb-1">Status</span>
              <div class="my-3">
                <span class="draft font-weight-bold ">{{ stats.isSent ? 'Sent' : 'Unsent' }}</span>
              </div>
            </div>

            <div class="col-md-7">
              <span class="theader">Event</span>
              <div class="my-3">
                <span class="evt-name">
                  {{ stats.activityToday ? stats.activityToday.name : "" }}
                  <i class="pi pi-info-circle"></i>
                </span>
              </div>
            </div>

            <div class="col-md-3">
              <span class="theader">Date</span>
              <div class="my-3">
                <span class="date">{{
                  stats.activityToday
                    ? new Date(
                        stats.activityToday.activityDate
                      ).toLocaleDateString()
                    : ""
                }}</span>
              </div>
            </div>
          </div>

          <div class="row mx-1 mb-5">
            <div class="col-md-12">
              <!-- Unapproved -->
              <div class="row unapproved">
                <div class="col-md-12">
                  <div class="row" v-if="!reportApproved">
                    <div class="col-md-12 py-3 info-div">
                      <span class="px-2"
                        ><i class="pi pi-info-circle"></i
                      ></span>
                      <span class="font-weight-bold"
                        >This is a DRAFT event. You can take further actions
                        once you approve it.</span
                      >
                      <span class="px-2"
                        ><span style="color: #136acd">Learn more</span>
                        <i class="pi pi-external-link ml-2"></i
                      ></span>
                    </div>
                  </div>
                  <div class="row my-3">
                    <div class="col-md-1 d-flex align-items-center">
                      <span class="file-icon"
                        ><i class="pi pi-book" style="color: #136acd"></i
                      ></span>
                    </div>
                    <div class="col-md-5">
                      <span class="grey-text">Create </span>
                      <p>
                        <span class="dark-text">Created: </span>
                        <span class="grey-text">
                          just a moment ago
                          <!-- {{ moment(eventData.activity.date, "YYYYMMDD").fromNow() }} {{ moment().startOf('second').fromNow() }} -->
                        </span>
                      </p>
                    </div>
                    <div
                      class="col-md-6 d-sm-flex justify-content-end"
                      v-if="!reportApproved"
                    >
                    
                      <a
                        class="def-btn approve-btn mr-4"
                        @click="toggleReportState"
                        >Approve report</a
                      >
                      <router-link
                        :to="{ name: 'Event', params: { event: activityId } }"
                      >
                        <a class="def-btn edit-btn">Edit report</a>
                      </router-link>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Approved -->
              <div class="row unapproved mt-4">
                <div class="col-md-12">
                  <div class="row my-3">
                    <div class="col-md-1 d-flex align-items-center">
                      <span class="file-icon"
                        ><i
                          class="pi pi-arrow-down"
                          style="color: #136acd"
                        ></i
                      ></span>
                    </div>
                    <div class="col-md-5 grey-text">
                      <span class="grey-text">Send </span>
                      <p>
                        <span class="grey-text">Last sent: </span>
                        <span class="grey-text"> {{ lastSent }}</span>
                      </p>
                    </div>
                    <div class="col-md-6" v-if="reportApproved">
                      <div class="row">
                        <div class="col-md-12">
                          <div class="row">
                            <div class="col-6">
                              <a
                                class="def-btn approve-btn"
                                data-toggle="modal"
                                data-target="#sendReport"
                                :class="{ 'resend-btn': markedAsSent }"
                              >
                                {{ sendBtnText }}
                              </a>
                            </div>
                            <div class="row">
                              <div class="col-md-12">
                                <div
                                  class="modal fade"
                                  id="sendReport"
                                  tabindex="-1"
                                  aria-labelledby="exampleModalLabel"
                                  aria-hidden="true"
                                  :show="true"
                                >
                                  <div class="modal-dialog modal-lg"  >
                                    <div class="modal-content">
                                      <div class="modal-header">
                                        <h5 class="modal-title font-weight-bold" id="sendReport">
                                          Send this report
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
                                      <div class="modal-body pt-0 px-0"  :data-dismiss="btnState">
                                        <!-- <ReportModal :eventName="eventDataResponse.name"/> -->
                                        <ReportModal
                                          :eventName="
                                            stats.activityToday ? stats.activityToday.name : ''
                                          "
                                          @sendreport="sendReport"
                                          :stats="stats"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="col-6">
                              <a class="def-btn edit-btn" @click="copyLink"
                                >Get share link</a
                              >
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-6 offset-md-1" style="">
                          <span class="mr-2">or</span>
                          <a
                            style="color: #136acd; cursor: pointer"
                            @click="markAsSent"
                            >mark as sent</a
                          >
                        </div>
                      </div>
                    </div>
                    <div class="col-md-12 pt-2" v-if="willCopyLink">
                      <span class="d-flex" @click="copyLink">
                        <input
                          type="text"
                          name=""
                          @keydown="(e) => e.preventDefault()"
                          class="form-control mr-2"
                          :value="location"
                          ref="shareableLinkField"
                          style="width:90%"
                        />
                        <span><i class="pi pi-copy c-pointer" style="font-size: 1.5rem"></i></span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="container-fluid bottom-section px-0">
            <div class="row mx-0" ref="topmost">
              <div class="col-md-8 dark-red-section pl-5">
                <h2 class="evt-report">Event and Report</h2>
              </div>
              <div
                class="col-md-4 d-flex flex-column light-red-section pr-5 text-center"
              >
                <span>
                  <span class="mb-n3">Total Attendance: </span> <br />
                  <span class="recieve">{{ stats.todayAttendance }}</span>
                </span>
                <span>
                  <span>Total Offering: </span> <br />
                  <span class="recieve"
                    >{{ stats.tenantCurrencyName }}&nbsp;{{
                      stats.todayOffering
                    }}</span
                  >
                </span>
              </div>
            </div>

            <!-- <div class="row py-5 px-5" ref="middle">
              <div class="col-md-7">
                <span class="evt-label grey-text">Event Name</span>
                <h2 class="font-weight-bold mb-3" style="font-size: 25px">
                  {{ stats.activityToday ? stats.activityToday.name : "" }}
                </h2>
                <span class="evt-date text-danger">{{ eventDateString }}.</span>
              </div>
              <div class="col-md-5 pl-0">
                <div class="row">
                  <div class="col-md-6 d-md-flex justify-content-end">
                    <span class="bold-700">Preacher: </span>
                  </div>
                  <div class="col-md-6 pl-md-0">
                    <span>{{
                      stats.activityToday ? stats.activityToday.preacher : ""
                    }}</span>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6 d-md-flex justify-content-end">
                    <span class="bold-700">Topic: </span>
                  </div>
                  <div class="col-md-6 pl-md-0">
                    <span>{{
                      stats.activityToday ? stats.activityToday.topic : ""
                    }}</span>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6 d-md-flex justify-content-end">
                    <span class="bold-700">First timers: </span>
                  </div>
                  <div class="col-md-6 pl-md-0">
                    <span>{{
                      stats.todayFirstTimer ? stats.todayFirstTimer : 0
                    }}</span>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6 d-md-flex justify-content-end">
                    <span class="bold-700">New converts: </span>
                  </div>
                  <div class="col-md-6 pl-md-0">
                    <span>{{
                      stats.todayNewConvert ? stats.todayNewConvert : 0
                    }}</span>
                  </div>
                </div>
              </div>
            </div> -->

            <div class="row mb-5" ref="bottom">
              <div class="col-md-12">
                <div class="row mb-4">
                  <div class="col-md-12 mt-4">
                    <span class="attendance-header">Overview</span>
                  </div>
                </div>
                <div class="row px-5">
                  <div class="col-md-12">
                    <div class="row">
                      <div class="col-sm-3">
                        <span class="bold-700">Events</span>
                      </div>
                      <div class="col-sm-2">
                        <span class="bold-700">Attendance</span>
                      </div>
                      <div class="col-sm-2">
                        <span class="bold-700">Offering</span>
                      </div>
                      <div class="col-sm-2">
                        <span class="bold-700">First Timers</span>
                      </div>
                      <div class="col-sm-3">
                        <span class="bold-700">New Convert</span>
                      </div>


                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-12">
                    <hr class="hr-dark" />
                  </div>
                </div>
                            <!-- v-for="(attendance, index) in activityAttendances"
                    :key="index" -->
                <div class="row">
                  <div
                    class="col-sm-12 py-2"
                  >
                    <div class="row px-5">
                      <div class="col-sm-12">
                        <div class="row">
                          <div class="col-sm-3">
                            <span class="bold-400">1st service</span>
                          </div>
                          <div class="col-sm-2">
                            <span class="bold-400">765</span>
                          </div>
                          <div class="col-sm-2">
                            <span class="bold-400">321</span>
                          </div>
                          <div class="col-sm-2">
                            <span class="bold-400">9876</span>
                          </div>
                          <div class="col-sm-3">
                            <span class="bold-400">433</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-sm-12 pt-2">
                        <hr class="hr" />
                      </div>
                    </div>
                  </div>
                  <div
                    class="col-sm-12 py-2"
                  >
                    <div class="row px-5">
                      <div class="col-sm-12">
                        <div class="row">
                          <div class="col-sm-3">
                            <span class="bold-400">2nd service</span>
                          </div>
                          <div class="col-sm-2">
                            <span class="bold-400">765</span>
                          </div>
                          <div class="col-sm-2">
                            <span class="bold-400">321</span>
                          </div>
                          <div class="col-sm-2">
                            <span class="bold-400">9876</span>
                          </div>
                          <div class="col-sm-3">
                            <span class="bold-400">433</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-sm-12 pt-2">
                        <hr class="hr" />
                      </div>
                    </div>
                  </div>
                  <div
                    class="col-sm-12 py-2"
                  >
                    <div class="row px-5">
                      <div class="col-sm-12">
                        <div class="row">
                          <div class="col-sm-3">
                            <span class="bold-400">3rd service</span>
                          </div>
                          <div class="col-sm-2">
                            <span class="bold-400">765</span>
                          </div>
                          <div class="col-sm-2">
                            <span class="bold-400">321</span>
                          </div>
                          <div class="col-sm-2">
                            <span class="bold-400">9876</span>
                          </div>
                          <div class="col-sm-3">
                            <span class="bold-400">433</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-sm-12 pt-2">
                        <hr class="hr" />
                      </div>
                    </div>
                  </div>
                  <div
                    class="col-sm-12 py-2"
                  >
                    <div class="row px-5">
                      <div class="col-sm-12">
                        <div class="row">
                          <div class="col-sm-3">
                            <span class="bold-400">4th</span>
                          </div>
                          <div class="col-sm-2">
                            <span class="bold-400">765</span>
                          </div>
                          <div class="col-sm-2">
                            <span class="bold-400">321</span>
                          </div>
                          <div class="col-sm-2">
                            <span class="bold-400">9876</span>
                          </div>
                          <div class="col-sm-3">
                            <span class="bold-400">433</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-sm-12 pt-2">
                        <hr class="hr" />
                      </div>
                    </div>
                  </div>
                  <div
                    class="col-sm-12 py-2"
                  >
                    <div class="row px-5">
                      <div class="col-sm-12">
                        <div class="row">
                          <div class="col-sm-3">
                            <span class="bold-400">5th Service</span>
                          </div>
                          <div class="col-sm-2">
                            <span class="bold-400">765</span>
                          </div>
                          <div class="col-sm-2">
                            <span class="bold-400">321</span>
                          </div>
                          <div class="col-sm-2">
                            <span class="bold-400">9876</span>
                          </div>
                          <div class="col-sm-3">
                            <span class="bold-400">433</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-sm-12 pt-2">
                        <hr class="hr" />
                      </div>
                    </div>
                  </div>
                </div>
       
                <div class="row px-5">
                  <div class="col-sm-12">
                    <div class="row">
                      <div class="col-sm-8"></div>
                      <div class="col-sm-2">
                        <span class="bold-700">Total</span>
                      </div>
                      <div class="col-sm-1">
                        <span class="bold-700">{{
                          stats.todayAttendance
                        }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- <div class="row mb-5" ref="bottom">
              <div class="col-md-12">
                <div class="row mb-4">
                  <div class="col-md-12">
                    <span class="attendance-header">Attendance</span>
                  </div>
                </div>
                <div class="row px-5">
                  <div class="col-md-12">
                    <div class="row">
                      <div class="col-sm-10">
                        <span class="bold-700">Attendance Item</span>
                      </div>
                      <div class="col-sm-2">
                        <span class="bold-700">Count</span>
                      </div>

                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-12">
                    <hr class="hr-dark" />
                  </div>
                </div>
                <div class="row">
                  <div
                    class="col-sm-12 py-2"
                    v-for="(attendance, index) in activityAttendances"
                    :key="index"
                  >
                    <div class="row px-5">
                      <div class="col-sm-12">
                        <div class="row">
                          <div class="col-sm-10">
                            <span class="bold-400">{{
                              attendance.attendanceTypeName
                            }}</span>
                          </div>
                          <div class="col-sm-2">
                            <span class="bold-400">{{
                              attendance.number
                            }}</span>
                          </div>
                  
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-sm-12 pt-2">
                        <hr class="hr" />
                      </div>
                    </div>
                  </div>
                </div>
       
                <div class="row px-5">
                  <div class="col-sm-12">
                    <div class="row">
                      <div class="col-sm-8"></div>
                      <div class="col-sm-2">
                        <span class="bold-700">Total</span>
                      </div>
                      <div class="col-sm-1">
                        <span class="bold-700">{{
                          stats.todayAttendance
                        }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="row mb-5">
              <div class="col-md-12">
                <div class="row mb-4">
                  <div class="col-md-12">
                    <span class="attendance-header">Offering</span>
                  </div>
                </div>
                <div class="row px-5">
                  <div class="col-md-12">
                    <div class="row">
                      <div class="col-sm-5">
                        <span class="bold-700">Offering Item</span>
                      </div>
                      <div class="col-sm-5">
                        <span class="bold-700">Channel</span>
                      </div>
                      <div class="col-sm-2">
                        <span class="bold-700">Amount</span>
                      </div>

             
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-12">
                    <hr class="hr-dark" />
                  </div>
                </div>
                <div
                  class="row"
                  v-for="(offering, index) in activityOfferings"
                  :key="index"
                >
                  <div class="col-md-12 py-2">
                    <div class="row px-5">
                      <div class="col-sm-12">
                        <div class="row">
                          <div class="col-sm-5">
                            <span class="bold-400">{{
                              offering.contribution
                            }}</span>
                          </div>
                          <div class="col-sm-5">
                            <span class="bold-400">{{ offering.channel }}</span>
                          </div>
                          <div class="col-sm-2">
                            <span class="bold-400"
                              ><span class="bold-700">{{
                                offering.currencyName
                              }}</span
                              >&nbsp; {{ offering.amount }}</span
                            >
                          </div>
                   
                        </div>
                      </div>
                    </div>
                    <div class="row" v-if="index !== stats.todayOffering - 1">
                      <div class="col-sm-12 pt-2">
                        <hr class="hr" />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-12">
                    <hr class="hr-dark" v-if="stats.todayOffering > 0" />
                  </div>
                </div>
                <div class="row px-5" v-if="stats.todayOffering > 0">
                  <div class="col-sm-12">
                    <div class="row">
                      <div class="col-sm-8"></div>
                      <div class="col-sm-2">
                        <span class="bold-700">Total</span>
                      </div>
                      <div class="col-sm-2">
                        <span class="bold-700"
                          >{{ stats.tenantCurrencyName }}&nbsp;{{
                            stats.todayOffering
                          }}</span
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
      -->
            <div class="row">
              <div class="col-md-12">
                <div class="pg-content">
                  <h4 class="analytics">Analytics</h4>

                  <div class="analytics-container first-con">
                    <div class="ana-group">
                      <div class="ana-header">
                        <h5>
                          <span class="today-text">Today </span>
                          <span class="versus"> vs Lastweek</span>
                        </h5>
                        <hr class="hr" />
                      </div>
                      <div class="ana-items">
                        <div class="ana-item">
                          <div class="ana-item-text">
                            <p class="ana-item-header">Attendance</p>
                            <p class="ana-item-percentage">
                              {{
                                stats.todayVsLastWeekAttendancePercentage
                                  ? stats.todayVsLastWeekAttendancePercentage.toFixed(
                                      2
                                    )
                                  : 0
                              }}%
                            </p>
                            <p>
                              <span class="ana-item-value">{{
                                stats.todayAttendance
                              }}</span>
                              vs
                              <span class="ana-item-value">{{
                                stats.lastWeekAttendance
                              }}</span>
                            </p>
                          </div>
                          <div class="ana-item-icon">
                            <div class="item-image">
                              <div
                                v-if="
                                  stats.todayVsLastWeekAttendancePercentage < 0
                                "
                              >
                                <img
                                  src="../../../../assets/dashboardlinks/negative-icon.svg"
                                  alt=""
                                />
                              </div>
                              <div v-else>
                                <img
                                  src="../../../../assets/dashboardlinks/trend-icon.svg"
                                  alt=""
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="ana-item">
                          <div class="ana-item-text">
                            <p class="ana-item-header">Offering</p>
                            <p class="ana-item-percentage">
                              {{
                                stats.todayVsLastweekOfferingPercentage
                                  ? stats.todayVsLastweekOfferingPercentage.toFixed(
                                      2
                                    )
                                  : 0
                              }}%
                            </p>
                            <p>
                              <span class="ana-item-value">{{
                                stats.todayOffering
                              }}</span>
                              vs
                              <span class="ana-item-value">{{
                                stats.lastWeekOffering
                              }}</span>
                            </p>
                          </div>
                          <div class="ana-item-icon">
                            <div class="item-image">
                              <div
                                v-if="
                                  stats.todayVsLastweekOfferingPercentage < 0
                                "
                              >
                                <img
                                  src="../../../../assets/dashboardlinks/negative-icon.svg"
                                  alt=""
                                />
                              </div>
                              <div v-else>
                                <img
                                  src="../../../../assets/dashboardlinks/trend-icon.svg"
                                  alt=""
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="ana-item">
                          <div class="ana-item-text">
                            <p class="ana-item-header">First timers</p>
                            <p class="ana-item-percentage">
                              {{
                                stats.todayVsLastWeekFirstTimerPercentage
                                  ? stats.todayVsLastWeekFirstTimerPercentage.toFixed(
                                      2
                                    )
                                  : 0
                              }}%
                            </p>
                            <p>
                              <span class="ana-item-value">{{
                                stats.todayFirstTimer
                              }}</span>
                              vs
                              <span class="ana-item-value">{{
                                stats.lastWeekFirstTimer
                              }}</span>
                            </p>
                          </div>
                          <div class="ana-item-icon">
                            <div class="item-image">
                              <div
                                v-if="
                                  stats.todayVsLastWeekFirstTimerPercentage < 0
                                "
                              >
                                <img
                                  src="../../../../assets/dashboardlinks/negative-icon.svg"
                                  alt=""
                                />
                              </div>
                              <div v-else>
                                <img
                                  src="../../../../assets/dashboardlinks/trend-icon.svg"
                                  alt=""
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <hr class="hr" />
                    </div>
                  </div>
                  <div class="analytics-container">
                    <div class="ana-group">
                      <div class="ana-header">
                        <h5>
                          <span class="today-text">Today </span>
                          <span class="versus"> vs Same time last month</span>
                        </h5>
                        <hr class="hr" />
                      </div>
                      <div class="ana-items">
                        <div class="ana-item">
                          <div class="ana-item-text">
                            <p class="ana-item-header">Attendance</p>
                            <p class="ana-item-percentage">
                              {{
                                stats.todayVsLastMonthAttendancePercentage
                                  ? stats.todayVsLastMonthAttendancePercentage.toFixed(
                                      2
                                    )
                                  : 0
                              }}%
                            </p>
                            <p>
                              <span class="ana-item-value">{{
                                stats.todayAttendance
                              }}</span>
                              vs
                              <span class="ana-item-value">{{
                                stats.lastMonthAttendance
                              }}</span>
                            </p>
                          </div>
                          <div class="ana-item-icon">
                            <div class="item-image">
                              <div
                                v-if="
                                  stats.todayVsLastMonthAttendancePercentage < 0
                                "
                              >
                                <img
                                  src="../../../../assets/dashboardlinks/negative-icon.svg"
                                  alt=""
                                />
                              </div>
                              <div v-else>
                                <img
                                  src="../../../../assets/dashboardlinks/trend-icon.svg"
                                  alt=""
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="ana-item">
                          <div class="ana-item-text">
                            <p class="ana-item-header">Offering</p>
                            <p class="ana-item-percentage">
                              {{
                                stats.todayVsLastMonthOfferingPercentage
                                  ? stats.todayVsLastMonthOfferingPercentage.toFixed(
                                      2
                                    )
                                  : 0
                              }}%
                            </p>
                            <p>
                              <span class="ana-item-value">{{
                                stats.todayOffering
                              }}</span>
                              vs
                              <span class="ana-item-value">{{
                                stats.lastMonthOffering
                              }}</span>
                            </p>
                          </div>
                          <div class="ana-item-icon">
                            <div class="item-image">
                              <div
                                v-if="
                                  stats.todayVsLastMonthOfferingPercentage < 0
                                "
                              >
                                <img
                                  src="../../../../assets/dashboardlinks/negative-icon.svg"
                                  alt=""
                                />
                              </div>
                              <div v-else>
                                <img
                                  src="../../../../assets/dashboardlinks/trend-icon.svg"
                                  alt=""
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="ana-item">
                          <div class="ana-item-text">
                            <p class="ana-item-header">First timers</p>
                            <p class="ana-item-percentage">
                              {{
                                todayVsLastMonthFirstTimerPercentage
                                  ? todayVsLastMonthFirstTimerPercentage.toFixed(
                                      2
                                    )
                                  : 0
                              }}%
                            </p>
                            <p>
                              <span class="ana-item-value">{{
                                stats.todayFirstTimer
                              }}</span>
                              vs
                              <span class="ana-item-value">{{
                                stats.lastMonthFirstTimer
                              }}</span>
                            </p>
                          </div>
                          <div class="ana-item-icon">
                            <div class="item-image">
                              <div
                                v-if="
                                  stats.todayVsLastMonthFirstTimerPercentage < 0
                                "
                              >
                                <img
                                  src="../../../../assets/dashboardlinks/negative-icon.svg"
                                  alt=""
                                />
                              </div>
                              <div v-else>
                                <img
                                  src="../../../../assets/dashboardlinks/trend-icon.svg"
                                  alt=""
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <hr class="hr" />
                    </div>
                  </div>
                  <div class="analytics-container">
                    <div class="ana-group">
                      <div class="ana-header">
                        <h5>
                          <span class="today-text">Today </span>
                          <span class="versus"> vs Same time last year</span>
                        </h5>
                        <hr class="hr" />
                      </div>
                      <div class="ana-items">
                        <div class="ana-item">
                          <div class="ana-item-text">
                            <p class="ana-item-header">Attendance</p>
                            <p class="ana-item-percentage">
                              {{
                                stats.todayVsLastYearAttendancePercentage
                                  ? stats.todayVsLastYearAttendancePercentage.toFixed(
                                      2
                                    )
                                  : 0
                              }}%
                            </p>
                            <p>
                              <span class="ana-item-value">{{
                                stats.todayAttendance
                              }}</span>
                              vs
                              <span class="ana-item-value">{{
                                stats.lastYearAttendance
                              }}</span>
                            </p>
                          </div>
                          <div class="ana-item-icon">
                            <div class="item-image">
                              <div
                                v-if="
                                  stats.todayVsLastYearAttendancePercentage < 0
                                "
                              >
                                <img
                                  src="../../../../assets/dashboardlinks/negative-icon.svg"
                                  alt=""
                                />
                              </div>
                              <div v-else>
                                <img
                                  src="../../../../assets/dashboardlinks/trend-icon.svg"
                                  alt=""
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="ana-item">
                          <div class="ana-item-text">
                            <p class="ana-item-header">Offering</p>
                            <p class="ana-item-percentage">
                              {{
                                stats.todayVsLastYearOfferingPercentage
                                  ? stats.todayVsLastYearOfferingPercentage.toFixed(
                                      2
                                    )
                                  : 0
                              }}%
                            </p>
                            <p>
                              <span class="ana-item-value">{{
                                stats.todayOffering
                              }}</span>
                              vs
                              <span class="ana-item-value">{{
                                stats.lastYearOffering
                              }}</span>
                            </p>
                          </div>
                          <div class="ana-item-icon">
                            <div class="item-image">
                              <div
                                v-if="
                                  stats.todayVsLastYearOfferingPercentage < 0
                                "
                              >
                                <img
                                  src="../../../../assets/dashboardlinks/negative-icon.svg"
                                  alt=""
                                />
                              </div>
                              <div v-else>
                                <img
                                  src="../../../../assets/dashboardlinks/trend-icon.svg"
                                  alt=""
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="ana-item">
                          <div class="ana-item-text">
                            <p class="ana-item-header">First timers</p>
                            <p class="ana-item-percentage">
                              {{
                                todayVsLastYearFirstTimerPercentage
                                  ? todayVsLastYearFirstTimerPercentage.toFixed(
                                      2
                                    )
                                  : 0
                              }}%
                            </p>
                            <p>
                              <span class="ana-item-value">{{
                                stats.todayFirstTimer
                              }}</span>
                              vs
                              <span class="ana-item-value">{{
                                stats.lastYearFirstTimer
                              }}</span>
                            </p>
                          </div>
                          <div class="ana-item-icon">
                            <div class="item-image">
                              <div
                                v-if="
                                  stats.todayVsLastYearFirstTimerPercentage < 0
                                "
                              >
                                <img
                                  src="../../../../assets/dashboardlinks/negative-icon.svg"
                                  alt=""
                                />
                              </div>
                              <div v-else>
                                <img
                                  src="../../../../assets/dashboardlinks/trend-icon.svg"
                                  alt=""
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <hr class="hr" />
                    </div>
                  </div>

                  <div class="area-charts analytics-container mb-5">
                    <!-- <div id="chart" style="width:50%;height:500px"></div> -->
                      {{stats.attendanceSoFar}}
                    <div
                      class="area-chart mt-5"
                      v-if="
                        stats.attendanceSoFar &&
                        stats.attendanceSoFar.length > 0
                      "
                    >
                      <ReportAreaChart
                        elemId="chart"
                        domId="areaChart1"
                        title="ATTENDANCE"
                        subtitle="So far"
                        lineColor="#50AB00"
                        :series="stats.attendanceSoFar"
                      />
                    </div>
                  
                    <div
                      class="area-chart mt-5"
                      v-if="
                        stats.offeringSoFar && stats.offeringSoFar.length > 0
                      "
                    >
                      <ReportAreaChart
                        elemId="chart"
                        domId="areaChart2"
                        title="OFFERING"
                        subtitle="So Far"
                        lineColor="#1F78B4"
                        :series="stats.offeringSoFar"
                      />
                    </div>
                    <div
                      class="area-chart mt-5"
                      v-if="
                        stats.firstTimerSoFar &&
                        stats.firstTimerSoFar.length > 0
                      "
                    >
                      <ReportAreaChart
                        elemId="chart"
                        domId="areaChart3"
                        title="FIRST TIMERS"
                        subtitle="So Far"
                        lineColor="#E14A1B"
                        :series="stats.firstTimerSoFar"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          

          <div class="row email-data" ref="emaildata">
            <table
              align="center"
              style="
                border-collapse: collapse;
                max-width: 800px;
                padding: 0pt 0pt 0pt 0pt;
                box-shadow: 0px 3px 15px #00000029;
                border: 1px solid #dde2e6;
                border-radius: 5px;
              "
            >
              <tbody>
                <tr>
                  <td
                    colspan="3"
                    style="
                      width: 337.5pt;
                      padding: 0pt 5.4pt;
                      background: rgb(255, 27, 27);
                      vertical-align: top;
                    "
                  >
                    <p style="margin-bottom: 0pt; margin-top: 0pt">
                      <span style="font-weight: bold; font-size: 16px"
                        >&nbsp;</span
                      >
                    </p>
                    <p style="margin-bottom: 0pt; margin-top: 0pt">
                      <span
                        style="
                          color: rgb(255, 255, 255);
                          font-weight: bold;
                          font-size: 16px;
                        "
                        >&nbsp;</span
                      >
                    </p>
                    <p style="margin-bottom: 0pt; margin-top: 0pt">
                      <span style="font-weight: bold; font-size: 16px"
                        >&nbsp; &nbsp; &nbsp; &nbsp;</span
                      ><span style="font-weight: bold; font-size: 29px"
                        >&nbsp;</span
                      ><span
                        style="
                          color: rgb(255, 255, 255);
                          font-weight: bold;
                          font-size: 29px;
                        "
                        >Event&nbsp;and&nbsp;Report</span
                      >
                    </p>
                  </td>
                  <td
                    colspan="3"
                    style="
                      width: 203.3pt;
                      padding: 0pt 5.4pt;
                      background: rgb(175, 31, 31);
                      vertical-align: top;
                    "
                  >
                    <p style="margin-bottom: 0pt; margin-top: 0pt">
                      <span style="font-weight: bold; font-size: 16px"
                        >&nbsp;</span
                      >
                    </p>
                    <p style="margin-bottom: 0pt; margin-top: 0pt">
                      <span style="font-weight: bold; font-size: 16px"
                        >&nbsp;</span
                      >
                    </p>
                    <p style="margin-bottom: 0pt; margin-top: 0pt">
                      <span
                        style="
                          color: rgb(255, 255, 255);
                          font-weight: bold;
                          font-size: 16px;
                        "
                        >Total&nbsp;Attendance:
                        {{ stats.todayAttendance }}</span
                      >
                    </p>
                    <p style="margin-bottom: 0pt; margin-top: 0pt">
                      <span
                        style="
                          color: rgb(255, 255, 255);
                          font-weight: bold;
                          font-size: 16px;
                        "
                        >&nbsp;</span
                      >
                    </p>
                    <p style="margin-bottom: 0pt; margin-top: 0pt">
                      <span
                        style="
                          color: rgb(255, 255, 255);
                          font-weight: bold;
                          font-size: 16px;
                        "
                        >Total&nbsp;Offering: {{ stats.todayOffering }}</span
                      >
                    </p>
                  </td>
                </tr>
                <tr>
                  <td
                    colspan="3"
                    style="
                      width: 337.5pt;
                      padding: 0pt 5.4pt;
                      vertical-align: top;
                    "
                  >
                    <p style="margin-bottom: 0pt; margin-top: 0pt">
                      <span style="font-weight: bold; font-size: 16px"
                        >&nbsp;</span
                      >
                    </p>
                    <p
                      style="
                        text-indent: 20pt;
                        margin-bottom: 0pt;
                        margin-top: 0pt;
                      "
                    >
                      <span
                        style="
                          color: rgb(192, 192, 192);
                          font-weight: bold;
                          font-size: 13px;
                        "
                        >Event&nbsp;Name</span
                      >
                    </p>
                    <p style="margin-bottom: 0pt; margin-top: 0pt">
                      <span style="font-weight: bold; font-size: 24px"
                        >&nbsp;
                        {{
                          stats.activityToday ? stats.activityToday.name : ""
                        }}
                        <br />
                        <span
                          style="
                            font-size: 14px;
                            color: red;
                            padding-left: 20px;
                          "
                          >{{ eventDateString }}.</span
                        ></span
                      >
                    </p>
                  </td>
                  <td
                    colspan="3"
                    style="
                      width: 203.3pt;
                      padding: 0pt 5.4pt;
                      vertical-align: top;
                    "
                  >
                    <p style="margin-bottom: 0pt; margin-top: 0pt">
                      <span style="font-weight: bold; font-size: 16px"
                        >&nbsp;</span
                      >
                    </p>
                    <p style="margin-bottom: 0pt; margin-top: 0pt">
                      <span style="font-weight: bold; font-size: 16px"
                        >Preacher:
                        {{
                          stats.activityToday
                            ? stats.activityToday.preacher
                            : ""
                        }}</span
                      >
                    </p>
                    <p style="margin-bottom: 0pt; margin-top: 0pt">
                      <span style="font-weight: bold; font-size: 16px"
                        >Topic:
                        {{
                          stats.activityToday ? stats.activityToday.topic : ""
                        }}</span
                      >
                    </p>
                    <p style="margin-bottom: 0pt; margin-top: 0pt">
                      <span style="font-weight: bold; font-size: 16px"
                        >First&nbsp;timers: {{ stats.todayFirstTimer }}</span
                      >
                    </p>
                    <p style="margin-bottom: 0pt; margin-top: 0pt">
                      <span style="font-weight: bold; font-size: 16px"
                        >New&nbsp;Converts: {{ stats.todayNewConvert }}</span
                      >
                    </p>
                  </td>
                </tr>
                <tr>
                  <td
                    style="
                      width: 152.3pt;
                      padding: 0pt 5.4pt;
                      background: rgb(0, 0, 0);
                      vertical-align: top;
                    "
                  >
                    <p
                      style="
                        margin-bottom: 0pt;
                        margin-top: 0pt;
                        text-align: center;
                      "
                    >
                      <span
                        style="
                          font-weight: normal;
                          font-size: 21px;
                          color: rgb(255, 255, 255);
                        "
                        >Attendance</span
                      >
                    </p>
                  </td>
                  <td
                    colspan="5"
                    style="
                      width: 388.5pt;
                      padding: 0pt 5.4pt;
                      vertical-align: top;
                    "
                  >
                    <p style="margin-bottom: 0pt; margin-top: 0pt">
                      <span style="font-weight: bold; font-size: 16px"
                        >&nbsp;</span
                      >
                    </p>
                  </td>
                </tr>
                <tr>
                  <td
                    style="
                      width: 152.3pt;
                      padding: 0pt 5.4pt;
                      vertical-align: top;
                    "
                  >
                    <p
                      style="
                        margin-bottom: 0pt;
                        margin-top: 0pt;
                        text-align: center;
                      "
                    >
                      <span style="font-weight: normal; font-size: 21px"
                        >&nbsp;</span
                      >
                    </p>
                  </td>
                  <td
                    colspan="5"
                    style="
                      width: 388.5pt;
                      padding: 0pt 5.4pt;
                      vertical-align: top;
                    "
                  >
                    <p style="margin-bottom: 0pt; margin-top: 0pt">
                      <span style="font-weight: bold; font-size: 16px"
                        >&nbsp;</span
                      >
                    </p>
                  </td>
                </tr>
                <tr>
                  <td
                    style="
                      width: 152.3pt;
                      padding: 0pt 5.4pt;
                      border-bottom: 2.25pt solid rgb(0, 0, 0);
                      vertical-align: top;
                    "
                  >
                    <p
                      style="
                        text-indent: 21pt;
                        margin-bottom: 0pt;
                        margin-top: 0pt;
                        text-align: center;
                      "
                    >
                      <span
                        style="font-weight: bold; font-size: 18px; color: #000"
                        >Attendance&nbsp;item</span
                      >
                    </p>
                  </td>
                  <td
                    colspan="3"
                    style="
                      width: 188.2pt;
                      padding: 0pt 5.4pt;
                      border-bottom: 2.25pt solid rgb(0, 0, 0);
                      vertical-align: top;
                    "
                  >
                    <p
                      style="
                        margin-bottom: 0pt;
                        margin-top: 0pt;
                        text-align: center;
                      "
                    >
                      <span
                        style="
                          font-weight: bolder;
                          font-size: 18px;
                          color: #000;
                        "
                        >Count</span
                      >
                    </p>
                  </td>
                  <td
                    colspan="2"
                    style="
                      width: 200.3pt;
                      padding: 0pt 5.4pt;
                      border-bottom: 2.25pt solid rgb(0, 0, 0);
                      vertical-align: top;
                    "
                  >
                    <p
                      style="
                        margin-bottom: 0pt;
                        margin-top: 0pt;
                        text-align: center;
                      "
                    >
                      <span
                        style="font-weight: bold; font-size: 18px; color: #000"
                        >Total</span
                      >
                    </p>
                  </td>
                </tr>
                <tr
                  style="font-weight: normal"
                  v-for="(attendance, index) in activityAttendances"
                  :key="index"
                >
                  <td
                    style="
                      width: 152.3pt;
                      padding: 0pt 5.4pt;
                      border-top: none;
                      border-bottom: 31.875pt none rgb(255, 255, 255);
                      vertical-align: top;
                    "
                  >
                    <p
                      style="
                        text-indent: 21pt;
                        margin-bottom: 0pt;
                        margin-top: 0pt;
                        text-align: center;
                      "
                    >
                      <span style="font-weight: normal; font-size: 13px">{{
                        attendance.attendanceTypeName
                      }}</span>
                    </p>
                  </td>
                  <td
                    colspan="3"
                    style="
                      width: 188.2pt;
                      padding: 0pt 5.4pt;
                      border-top: none;
                      border-bottom: 31.875pt none rgb(255, 255, 255);
                      vertical-align: top;
                    "
                  >
                    <p
                      style="
                        margin-bottom: 0pt;
                        margin-top: 0pt;
                        text-align: center;
                      "
                    >
                      <span style="font-weight: normal; font-size: 13px">{{
                        attendance.number
                      }}</span>
                    </p>
                  </td>
                  <td
                    colspan="2"
                    style="
                      width: 200.3pt;
                      padding: 0pt 5.4pt;
                      border-top: none;
                      border-bottom: 31.875pt none rgb(255, 255, 255);
                      vertical-align: top;
                    "
                  >
                    <p
                      style="
                        margin-bottom: 0pt;
                        margin-top: 0pt;
                        text-align: center;
                      "
                    >
                      <span style="font-weight: normal; font-size: 13px">{{
                        attendance.number
                      }}</span>
                    </p>
                  </td>
                </tr>
                <tr style="border-top: 3px solid">
                  <td
                    style="
                      width: 152.3pt;
                      padding: 0pt 5.4pt;
                      border-top: none;
                      vertical-align: top;
                    "
                  >
                    <p
                      style="
                        text-indent: 21pt;
                        margin-bottom: 0pt;
                        margin-top: 0pt;
                        text-align: center;
                      "
                    >
                      <span style="font-weight: bold; font-size: 16px"
                        >&nbsp;</span
                      >
                    </p>
                  </td>
                  <td
                    colspan="3"
                    style="
                      width: 188.2pt;
                      padding: 0pt 5.4pt;
                      border-top: none;
                      vertical-align: top;
                    "
                  >
                    <p
                      style="
                        margin-bottom: 0pt;
                        margin-top: 0pt;
                        text-align: center;
                      "
                    >
                      <span style="font-weight: bold; font-size: 16px"
                        >Total</span
                      >
                    </p>
                  </td>
                  <td
                    colspan="2"
                    style="
                      width: 200.3pt;
                      padding: 0pt 5.4pt;
                      border-top: none;
                      vertical-align: top;
                    "
                  >
                    <p
                      style="
                        margin-bottom: 0pt;
                        margin-top: 0pt;
                        text-align: center;
                      "
                    >
                      <span style="font-weight: bold; font-size: 16px">{{
                        stats.todayAttendance
                      }}</span>
                    </p>
                  </td>
                </tr>

                <tr>
                  <td
                    style="
                      width: 152.3pt;
                      padding: 0pt 5.4pt;
                      border-top: none;
                      vertical-align: top;
                    "
                  >
                    <p
                      style="
                        text-indent: 21pt;
                        margin-bottom: 0pt;
                        margin-top: 0pt;
                        text-align: center;
                      "
                    >
                      <span style="font-weight: bold; font-size: 16px"
                        >&nbsp;</span
                      >
                    </p>
                  </td>
                  <td
                    colspan="3"
                    style="
                      width: 188.2pt;
                      padding: 0pt 5.4pt;
                      border-top: none;
                      vertical-align: top;
                    "
                  >
                    <p
                      style="
                        margin-bottom: 0pt;
                        margin-top: 0pt;
                        text-align: center;
                      "
                    >
                      <span style="font-weight: bold; font-size: 16px"
                        >&nbsp;</span
                      >
                    </p>
                  </td>
                  <td
                    colspan="2"
                    style="
                      width: 200.3pt;
                      padding: 0pt 5.4pt;
                      border-top: none;
                      vertical-align: top;
                    "
                  >
                    <p
                      style="
                        margin-bottom: 0pt;
                        margin-top: 0pt;
                        text-align: center;
                      "
                    >
                      <span style="font-weight: bold; font-size: 16px"
                        >&nbsp;</span
                      >
                    </p>
                  </td>
                </tr>
                <tr>
                  <td
                    style="
                      width: 152.3pt;
                      padding: 0pt 5.4pt;
                      background: rgb(0, 0, 0);
                      vertical-align: top;
                    "
                  >
                    <p
                      style="
                        margin-bottom: 0pt;
                        margin-top: 0pt;
                        text-align: center;
                      "
                    >
                      <span style="font-size: 21px; color: rgb(255, 255, 255)"
                        >Offering</span
                      >
                    </p>
                  </td>
                  <td
                    colspan="3"
                    style="
                      width: 188.2pt;
                      padding: 0pt 5.4pt;
                      vertical-align: top;
                    "
                  >
                    <p
                      style="
                        margin-bottom: 0pt;
                        margin-top: 0pt;
                        text-align: center;
                      "
                    >
                      <span style="font-weight: bold; font-size: 16px"
                        >&nbsp;</span
                      >
                    </p>
                  </td>
                  <td
                    colspan="2"
                    style="
                      width: 200.3pt;
                      padding: 0pt 5.4pt;
                      vertical-align: top;
                    "
                  >
                    <p
                      style="
                        margin-bottom: 0pt;
                        margin-top: 0pt;
                        text-align: center;
                      "
                    >
                      <span style="font-weight: bold; font-size: 16px"
                        >&nbsp;</span
                      >
                    </p>
                  </td>
                </tr>
                <tr>
                  <td
                    style="
                      width: 152.3pt;
                      padding: 0pt 5.4pt;
                      vertical-align: top;
                    "
                  >
                    <p
                      style="
                        margin-bottom: 0pt;
                        margin-top: 0pt;
                        text-align: center;
                      "
                    >
                      <span style="font-size: 21px">&nbsp;</span>
                    </p>
                  </td>
                  <td
                    colspan="3"
                    style="
                      width: 188.2pt;
                      padding: 0pt 5.4pt;
                      vertical-align: top;
                    "
                  >
                    <p
                      style="
                        margin-bottom: 0pt;
                        margin-top: 0pt;
                        text-align: center;
                      "
                    >
                      <span style="font-weight: bold; font-size: 16px"
                        >&nbsp;</span
                      >
                    </p>
                  </td>
                  <td
                    colspan="2"
                    style="
                      width: 200.3pt;
                      padding: 0pt 5.4pt;
                      vertical-align: top;
                    "
                  >
                    <p
                      style="
                        margin-bottom: 0pt;
                        margin-top: 0pt;
                        text-align: center;
                      "
                    >
                      <span style="font-weight: bold; font-size: 16px"
                        >&nbsp;</span
                      >
                    </p>
                  </td>
                </tr>
                <tr style="border-bottom: 3px solid">
                  <td
                    style="
                      width: 152.3pt;
                      padding: 0pt 5.4pt;
                      border-right: 31.875pt none rgb(255, 255, 255);
                      border-bottom: 31.875pt none rgb(255, 255, 255);
                      vertical-align: top;
                    "
                  >
                    <p
                      style="
                        margin-bottom: 0pt;
                        margin-top: 0pt;
                        text-align: center;
                      "
                    >
                      <span
                        style="font-weight: bold; font-size: 18px; color: #000"
                        >Offering&nbsp;Item</span
                      >
                    </p>
                  </td>
                  <td
                    style="
                      width: 126.75pt;
                      padding: 0pt 5.4pt;
                      border-left: none;
                      border-right: 31.875pt none rgb(255, 255, 255);
                      border-bottom: 31.875pt none rgb(255, 255, 255);
                      vertical-align: top;
                    "
                  >
                    <p
                      style="
                        margin-bottom: 0pt;
                        margin-top: 0pt;
                        text-align: center;
                      "
                    >
                      <span
                        style="font-weight: bold; font-size: 18px; color: #000"
                        >Channel</span
                      >
                    </p>
                  </td>
                  <td
                    colspan="3"
                    style="
                      width: 155.25pt;
                      padding: 0pt 5.4pt;
                      border-left: none;
                      border-right: 31.875pt none rgb(255, 255, 255);
                      border-bottom: 31.875pt none rgb(255, 255, 255);
                      vertical-align: top;
                    "
                  >
                    <p
                      style="
                        margin-bottom: 0pt;
                        margin-top: 0pt;
                        text-align: center;
                      "
                    >
                      <span
                        style="font-weight: bold; font-size: 18px; color: #000"
                        >Amount</span
                      >
                    </p>
                  </td>
                  <td
                    style="
                      width: 106.5pt;
                      padding: 0pt 5.4pt;
                      border-left: none;
                      border-bottom: 31.875pt none rgb(255, 255, 255);
                      vertical-align: top;
                    "
                  >
                    <p
                      style="
                        margin-bottom: 0pt;
                        margin-top: 0pt;
                        text-align: center;
                      "
                    >
                      <span
                        style="font-weight: bold; font-size: 18px; color: #000"
                        >Total</span
                      >
                    </p>
                  </td>
                </tr>
                <tr
                  style="font-weight: normal; font-size: 13px"
                  v-for="(offering, index) in activityOfferings"
                  :key="index"
                >
                  <td
                    style="
                      width: 152.3pt;
                      padding: 0pt 5.4pt;
                      border-right: 31.875pt none rgb(255, 255, 255);
                      border-top: none;
                      border-bottom: 31.875pt none rgb(255, 255, 255);
                      vertical-align: top;
                    "
                  >
                    <p
                      style="
                        margin-bottom: 0pt;
                        margin-top: 0pt;
                        text-align: center;
                      "
                    >
                      <span style="font-weight: normal; font-size: 13px">{{
                        offering.name
                      }}</span>
                    </p>
                  </td>
                  <td
                    style="
                      width: 126.75pt;
                      padding: 0pt 5.4pt;
                      border-left: none;
                      border-right: 31.875pt none rgb(255, 255, 255);
                      border-top: none;
                      border-bottom: 31.875pt none rgb(255, 255, 255);
                      vertical-align: top;
                    "
                  >
                    <p
                      style="
                        margin-bottom: 0pt;
                        margin-top: 0pt;
                        text-align: center;
                      "
                    >
                      <span style="font-weight: normal; font-size: 13px">{{
                        offering.channel
                      }}</span>
                    </p>
                  </td>
                  <td
                    colspan="3"
                    style="
                      width: 155.25pt;
                      padding: 0pt 5.4pt;
                      border-left: none;
                      border-right: 31.875pt none rgb(255, 255, 255);
                      border-top: none;
                      border-bottom: 31.875pt none rgb(255, 255, 255);
                      vertical-align: top;
                    "
                  >
                    <p
                      style="
                        margin-bottom: 0pt;
                        margin-top: 0pt;
                        text-align: center;
                      "
                    >
                      <span style="font-weight: normal; font-size: 13px">{{
                        offering.amount
                      }}</span>
                    </p>
                  </td>
                  <td
                    style="
                      width: 106.5pt;
                      padding: 0pt 5.4pt;
                      border-left: none;
                      border-top: none;
                      border-bottom: 31.875pt none rgb(255, 255, 255);
                      vertical-align: top;
                    "
                  >
                    <p
                      style="
                        margin-bottom: 0pt;
                        margin-top: 0pt;
                        text-align: center;
                      "
                    >
                      <span style="font-weight: normal; font-size: 13px">{{
                        offering.amount
                      }}</span>
                    </p>
                  </td>
                </tr>
                <tr style="border-top: 3px solid">
                  <td
                    style="
                      width: 152.3pt;
                      padding: 0pt 5.4pt;
                      border-right: 31.875pt none rgb(255, 255, 255);
                      border-top: none;
                      border-bottom: 31.875pt none rgb(255, 255, 255);
                      vertical-align: top;
                    "
                  >
                    <p
                      style="
                        margin-bottom: 0pt;
                        margin-top: 0pt;
                        text-align: center;
                      "
                    >
                      <span style="font-weight: bold; font-size: 16px"
                        >&nbsp;</span
                      >
                    </p>
                  </td>
                  <td
                    style="
                      width: 126.75pt;
                      padding: 0pt 5.4pt;
                      border-left: none;
                      border-right: 31.875pt none rgb(255, 255, 255);
                      border-top: none;
                      border-bottom: 31.875pt none rgb(255, 255, 255);
                      vertical-align: top;
                    "
                  >
                    <p
                      style="
                        margin-bottom: 0pt;
                        margin-top: 0pt;
                        text-align: center;
                      "
                    >
                      <span style="font-weight: bold; font-size: 16px"
                        >&nbsp;</span
                      >
                    </p>
                  </td>
                  <td
                    colspan="3"
                    style="
                      width: 155.25pt;
                      padding: 0pt 5.4pt;
                      border-left: none;
                      border-right: 31.875pt none rgb(255, 255, 255);
                      border-top: none;
                      border-bottom: 31.875pt none rgb(255, 255, 255);
                      vertical-align: top;
                    "
                  >
                    <p
                      style="
                        margin-bottom: 0pt;
                        margin-top: 0pt;
                        text-align: center;
                      "
                    >
                      <span style="font-weight: bold; font-size: 16px"
                        >Total</span
                      >
                    </p>
                  </td>
                  <td
                    style="
                      width: 106.5pt;
                      padding: 0pt 5.4pt;
                      border-left: none;
                      border-top: none;
                      border-bottom: 31.875pt none rgb(255, 255, 255);
                      vertical-align: top;
                    "
                  >
                    <p
                      style="
                        margin-bottom: 0pt;
                        margin-top: 0pt;
                        text-align: center;
                      "
                    >
                      <span style="font-weight: bold; font-size: 16px">{{
                        tottalOfferings
                      }}</span>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td
                    style="
                      width: 152.3pt;
                      padding: 0pt 5.4pt;
                      border-right: 31.875pt none rgb(255, 255, 255);
                      border-top: none;
                      border-bottom: 31.875pt none rgb(255, 255, 255);
                      vertical-align: top;
                    "
                  >
                    <p
                      style="
                        margin-bottom: 0pt;
                        margin-top: 0pt;
                        text-align: center;
                      "
                    >
                      <span style="font-weight: bold; font-size: 16px"
                        >&nbsp;</span
                      >
                    </p>
                  </td>
                  <td
                    style="
                      width: 126.75pt;
                      padding: 0pt 5.4pt;
                      border-left: none;
                      border-right: 31.875pt none rgb(255, 255, 255);
                      border-top: none;
                      border-bottom: 31.875pt none rgb(255, 255, 255);
                      vertical-align: top;
                    "
                  >
                    <p
                      style="
                        margin-bottom: 0pt;
                        margin-top: 0pt;
                        text-align: center;
                      "
                    >
                      <span style="font-weight: bold; font-size: 16px"
                        >&nbsp;</span
                      >
                    </p>
                  </td>
                  <td
                    colspan="3"
                    style="
                      width: 155.25pt;
                      padding: 0pt 5.4pt;
                      border-left: none;
                      border-right: 31.875pt none rgb(255, 255, 255);
                      border-top: none;
                      border-bottom: 31.875pt none rgb(255, 255, 255);
                      vertical-align: top;
                    "
                  >
                    <p
                      style="
                        margin-bottom: 0pt;
                        margin-top: 0pt;
                        text-align: center;
                      "
                    >
                      <span style="font-weight: bold; font-size: 16px"
                        >&nbsp;</span
                      >
                    </p>
                  </td>
                  <td
                    style="
                      width: 106.5pt;
                      padding: 0pt 5.4pt;
                      border-left: none;
                      border-top: none;
                      border-bottom: 31.875pt none rgb(255, 255, 255);
                      vertical-align: top;
                    "
                  >
                    <p
                      style="
                        margin-bottom: 0pt;
                        margin-top: 0pt;
                        text-align: center;
                      "
                    >
                      <span style="font-weight: bold; font-size: 16px"
                        >&nbsp;</span
                      >
                    </p>
                  </td>
                </tr>
                <tr>
                  <td
                    style="
                      width: 152.3pt;
                      padding: 0pt 5.4pt;
                      border-right: 31.875pt none rgb(255, 255, 255);
                      border-top: none;
                      border-bottom: 31.875pt none rgb(255, 255, 255);
                      vertical-align: top;
                    "
                  >
                    <p
                      style="
                        margin-bottom: 0pt;
                        margin-top: 0pt;
                        text-align: center;
                      "
                    >
                      <span style="font-weight: bold; font-size: 16px"></span>
                    </p>
                  </td>
                  <td
                    style="
                      width: 126.75pt;
                      padding: 0pt 5.4pt;
                      border-left: none;
                      border-right: 31.875pt none rgb(255, 255, 255);
                      border-top: none;
                      border-bottom: 31.875pt none rgb(255, 255, 255);
                      vertical-align: top;
                    "
                  >
                    <p
                      style="
                        margin-bottom: 0pt;
                        margin-top: 0pt;
                        text-align: center;
                      "
                    >
                      <span style="font-weight: bold; font-size: 16px"></span>
                    </p>
                  </td>
                  <td
                    colspan="3"
                    style="
                      width: 155.25pt;
                      padding: 0pt 5.4pt;
                      border-left: none;
                      border-right: 31.875pt none rgb(255, 255, 255);
                      border-top: none;
                      border-bottom: 31.875pt none rgb(255, 255, 255);
                      vertical-align: top;
                    "
                  >
                    <p
                      style="
                        margin-bottom: 0pt;
                        margin-top: 0pt;
                        text-align: center;
                      "
                    >
                      <span style="font-weight: bold; font-size: 16px"></span>
                    </p>
                  </td>
                  <td
                    style="
                      width: 106.5pt;
                      padding: 0pt 5.4pt;
                      border-left: none;
                      border-top: none;
                      border-bottom: 31.875pt none rgb(255, 255, 255);
                      vertical-align: top;
                    "
                  >
                    <p
                      style="
                        margin-bottom: 0pt;
                        margin-top: 0pt;
                        text-align: center;
                      "
                    >
                      <span style="font-weight: bold; font-size: 16px"
                        ><a :href="url" style="color: blue; font-weight: bold"
                          >View full report</a
                        ></span
                      >
                    </p>
                  </td>
                </tr>
                <tr style="height: 40px; background: #eee">
                  <td
                    style="
                      width: 152.3pt;
                      padding: 0pt 5.4pt;
                      border-right: 31.875pt none rgb(255, 255, 255);
                      border-top: none;
                      border-bottom: 31.875pt none rgb(255, 255, 255);
                      vertical-align: top;
                    "
                  >
                    <p
                      style="
                        margin-bottom: 0pt;
                        margin-top: 0pt;
                        text-align: center;
                      "
                    >
                      <span style="font-weight: bold; font-size: 16px"></span>
                    </p>
                  </td>
                  <td
                    colspan="3"
                    style="
                      width: 126.75pt;
                      padding: 0pt 5.4pt;
                      border-left: none;
                      border-right: 31.875pt none rgb(255, 255, 255);
                      border-top: none;
                      border-bottom: 31.875pt none rgb(255, 255, 255);
                      vertical-align: top;
                    "
                  >
                    <p
                      style="
                        margin-bottom: 0pt;
                        margin-top: 0pt;
                        text-align: center;
                      "
                    >
                      <span
                        style="
                          font-weight: bold;
                          font-size: 14px;
                          margin-top: 20px;
                        "
                        >Powered By ChurchPlus</span
                      >
                    </p>
                  </td>
                  <td
                    style="
                      width: 155.25pt;
                      padding: 0pt 5.4pt;
                      border-left: none;
                      border-right: 31.875pt none rgb(255, 255, 255);
                      border-top: none;
                      border-bottom: 31.875pt none rgb(255, 255, 255);
                      vertical-align: top;
                    "
                  >
                    <p
                      style="
                        margin-bottom: 0pt;
                        margin-top: 0pt;
                        text-align: center;
                      "
                    >
                      <span style="font-weight: bold; font-size: 16px"></span>
                    </p>
                  </td>
                  <td
                    style="
                      width: 106.5pt;
                      padding: 0pt 5.4pt;
                      border-left: none;
                      border-top: none;
                      border-bottom: 31.875pt none rgb(255, 255, 255);
                      vertical-align: top;
                    "
                  >
                    <p
                      style="
                        margin-bottom: 0pt;
                        margin-top: 0pt;
                        text-align: center;
                      "
                    >
                      <span style="font-weight: bold; font-size: 16px"
                        ><a
                          :href="url"
                          style="color: blue; font-weight: bold"
                        ></a
                      ></span>
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="row genarationg-report" v-if="isPending">
          <div class="col-md-12 text-center mb-n4">
            <span class="primary-text font-weight-bold"
              >Generating Your Report ...</span
            >
          </div>
          <div class="col-md-12">
            <Loading :loading="isPending" />
          </div>
        </div>

        <div class="row" v-if="errorGettingReport">
          <div class="col-md-12 text-center text-danger font-weight-bold">
            <p class="text-danger">Error generating report, please try reloading the page. </p>
            <p class="mb-0">If this link was copied ensure you copied the whole link</p>
            <p>Else if this continues, please contact us at <a href="mailto:info@churchplus.co" class="text-primary">info@churchplus.co</a></p>
          </div>
        </div>
      </div>
    </div>
  </div>

  
</template>


<script>
import ReportAreaChart from "@/components/charts/EventAreaChart.vue";
import ReportModal from "@/components/firsttimer/ReportModal.vue";
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import axios from "@/gateway/backendapi";
import composerObj from "../../../../services/communication/composer";
import stopProgressBar from "../../../../services/progressbar/progress";
// import EventReportStats from "@/components/eventreports/EventReportStats";
import { useToast } from "primevue/usetoast";
import moment from "moment";
import Loading from "../../../../components/loading/LoadingComponent";
import store from "../../../../store/store"

export default {
  components: { ReportAreaChart, ReportModal, Loading },
  setup() {
    const route = useRoute();
    const reportApproved = ref(false);
    const lastSent = ref("just a moment ago");
    const status = ref("Draft");
    // const markedAsSent = ref(false);
    const sendBtnText = ref("Send report");
    // const eventDataResponse = ref({});
    // const topmost = ref(null);
    const middle = ref(null);
    const emaildata = ref(null);
    const bottom = ref(null);
    const btnState = ref("");
    const toast = useToast();
    const url = ref("");
    const activityId = ref("");

    const toggleReportState = () => {
      reportApproved.value = !reportApproved.value;
      status.value = "Unsent";
    };

    const markAsSent = () => {
      axios.get(`/api/Events/markAsSent?activityId=${activityId.value}`)
                .then(res => {
                  stats.value.isSent = true;
              lastSent.value = "Marked as sent today";
              status.value = "Sent";
              // markedAsSent.value = true;
              sendBtnText.value = "Resend report";
                  console.log(res)
             
                }).catch(err => {
                  console.log(err)
                })
    };

    const stats = ref(store.getters.reportData);

    const innerWidth = computed(() => {
            return window.innerWidth;
        })

    const offeringArr = ref([]);

    const eventDateString = computed(() => {
      if (!stats.value || !stats.value.activityToday) return "";
      return new Date(stats.value.activityToday.activityDate)
        .toString()
        .split(" ")
        .slice(0, 4)
        .join(" ");
    });

    const sendReport = (messageObj) => {
      const emailData = ref(emaildata.value.innerHTML);
      const message = `
                <!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
                <html xmlns="http://www.w3.org/1999/xhtml" style="box-sizing: border-box; font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; font-size: 14px; margin: 0; padding: 0;">
                  <head>
                    <meta name="viewport" content="width=device-width"/>
                    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
                    <title>#title#</title>
                    <style>
                      .topmost {
                        display: flex;
                      }

                      .topmost-box1 {
                        width: 70%;
                        height:133px;
                        display:flex;
                        align-items:center;
                        padding:10px
                      }

                      .topmost-box2{
                        width: 30%;display:flex; flex-direction:column; height:133px; align-items:center; justify-content:center
                      }
                    </style>
                  </head>
                  <body style="-webkit-font-smoothing: antialiased; -webkit-text-size-adjust: none; background: #f6f6f6; box-sizing: border-box; font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; font-size: 14px; height: 100%; line-height: 1.6; margin: 0; padding: 0; width: 100% !important;">
                  
                  ${`${messageObj.data.message}`} <br>

                  ${emailData.value}
                  </body>
                  `;
      const body = {
        // message: topmost.value.innerHTMl.toString(),

        ispersonalized: false,
        contacts: messageObj.data.contacts,
        subject: messageObj.data.subject,
        // user: "+2349086767765",
      };
      if (messageObj.medium === "sms") {
        body.gateWayToUse = "hostedsms";
        body.category = "";
        body.emailAddress = "";
        body.emailDisplayName = "";
        body.isoCode = messageObj.data.isoCode;
        body.toOthers = messageObj.data.toOthers;
      }

      body.message =
        messageObj.medium === "sms" ? messageObj.data.message : message;

      const url =
        messageObj.medium === "sms"
          ? "/api/Messaging/sendSms"
          : "/api/Messaging/sendEmail";

      composerObj
        .sendMessage(url, body)
        .then((res) => {
          btnState.value = "";
          console.log(res, "report response");
          if (res.status === false) {
            toast.add({
              severity: "error",
              summary: "Sending Failed",
              detail: res.message,
              life: 3000,
            });
          } else {
            toast.add({
              severity: "success",
              summary: "Send Success",
              detail: "Your report has been sent",
              life: 3000,
            });
            markAsSent()
          }
        })
        .catch((err) => {
          btnState.value = "";
          console.log(err);
          stopProgressBar();
          toast.add({
            severity: "error",
            summary: "Sending Failed",
            detail: "Report was not sent, please try again",
            life: 3000,
          });
        });
      btnState.value = "modal";
    };

    const willCopyLink = ref(false);
    const shareableLinkField = ref(null);
    const location = ref(window.location);
    const copyLink = () => {
      try {
        willCopyLink.value = true;
        const a = shareableLinkField.value;
        a.select();
        a.setSelectionRange(0, 200); /* For mobile devices */

        /* Copy the text inside the text field */
        document.execCommand("copy");
        toast.add({
          severity: "info",
          summary: "Link Copied",
          detail: "Shareable link copied to your clipboard",
          life: 3000,
        });
      } catch (error) {
        console.log(error);
      }
    };

    activityId.value = route.params.id;
    url.value = `my.churchplus.co/tenant/report/${activityId.value}`;

    const isPending = ref(true);
    const errorGettingReport = ref(false);
    const getStats = async () => {
        errorGettingReport.value = false;
        try {
          const res = await axios.get(
            `/api/Events/GetAnalysis?activityId=${activityId.value}`
          );
          stats.value = res.data;
          console.log(stats.value)
          isPending.value = false;
          store.dispatch("setReportData", res.data);
        } catch (err) {
          isPending.value = false;
          errorGettingReport.value = true;
          console.log(err.response);
          stopProgressBar();
        }    
    };
    if (!stats.value || !stats.value.activityToday || stats.value.activityToday.id !== route.params.id || route.query.edit) {
      getStats();
    } else {
      isPending.value = false;
      reportApproved.value = stats.value.isSent
    }

    const activityOfferings = computed(() => {
      if (!stats.value || !stats.value.activityOfferings) return [];
      return stats.value.activityOfferings;
    });

    const activityAttendances = computed(() => {
      if (!stats.value || !stats.value.activityAttendances) return [];
      return stats.value.activityAttendances;
    });

    return {
      isPending,
      errorGettingReport,
      reportApproved,
      toggleReportState,
      markAsSent,
      status,
      lastSent,
      sendBtnText,
      stats,
      offeringArr,
      eventDateString,
      innerWidth,
      window,
      // topmost,
      middle,
      bottom,
      sendReport,
      btnState,
      emaildata,
      url,
      activityId,
      moment,
      copyLink,
      location,
      shareableLinkField,
      willCopyLink,
      activityOfferings,
      activityAttendances,
    };
  },
};
</script>

<style scoped>
/* .topmost {
  display: flex;
} */

.email-data {
  height: 0 !important;
  overflow: hidden !important;
}

/* .topmost-box {
  width: 50%;
} */

* {
  color: #1c252c;
  box-sizing: border-box;
}

a {
  text-decoration: none;
  font-weight: 700;
}

.page-hder {
  font-size: 28px;
}

/* Top */
.theader {
  font-size: 14px;
  font-weight: 800;
  color: #0f0220;
}

.draft {
  border: 0.5px solid #252a2f;
  padding: 10px;
  border-radius: 22px 0 0 22px;
  background: grey;
}

.evt-name {
  color: #136acd;
  font-weight: 800;
  font-size: 22px;
}

.evt-report {
  font-size: 25px;
}

.date {
  font-size: 20px;
  font-weight: 600;
  color: #1d262d;
}

.info-div {
  background: #f9f8db;
  border: 1px solid #dde2e6;
  border-radius: 5px 5px 0px 0px;
  text-align: center;
}

.unapproved {
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 15px #00000029;
  border: 1px solid #dde2e6;
  border-radius: 5px;
}

.file-icon {
  color: #136acd;
  border: 1px solid #136acd;
  padding: 10px;
  border-radius: 50%;
  height: 40px;
  width: 40px;
  text-align: center;
  font-size: 20px;
  display: flex;
  align-items: center;
}

.grey-text {
  color: #8296ae;
}

.dark-text {
  color: #1d262d;
  font-weight: 800;
}

.def-btn {
  height: 40px;
  border-radius: 22px;
  /* padding: 0 24px; */
  padding: 8px 10px;
  width: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #dde2e6;
}

.def-btn:hover {
  cursor: pointer;
}

.approve-btn {
  background: #136acd;
  color: white;
}

.edit-btn {
  border: 1px solid #dde2e6;
}

.dark-red-section {
  /* background: #980404; */
  background: #ff0000b5;
  color: #fff;
  height: 133px;
  display: flex;
  align-items: center;
  border-radius: 5px 0px 0px 0px;
  height: 133px;
  display: flex;
  align-items: center;
  border-radius: 5px 0px 0px 0px;
}

.light-red-section {
  /* background: #ff0000b5; */
  background: #980404;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0px 5px 0px 0px;
}

.dark-red-section h2,
.light-red-section span {
  color: #fff;
  font-weight: 800;
}

.recieve {
  font-size: 22px;
}

.bold-400 {
  font-weight: 400;
}

.bold-700 {
  font-weight: 700;
}

.hr-dark {
  border: 1px solid #000;
}

/* Analytics */
.analytics,
.attendance-header {
  background: #1c252c;
  color: #fff;
  width: 155px;
  height: 37px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
}

.first-con {
  margin-top: 50px;
}

.analytics-container {
  /* padding: 0 24px 24px 24px; */
  width: 90%;
  margin: auto;
}

.ana-items {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding-bottom: 24px;
}

.ana-item {
  width: 215px;
  display: flex;
  justify-content: space-between;
  box-shadow: 0px 3px 10px #00000029;
  border: 1px solid #dde2e6;
  border-radius: 5px;
  padding: 10px 4px 10px 10px;
  margin: 4px 0;
}

.ana-header {
  margin-bottom: 40px;
}

.ana-item p {
  margin-bottom: 0;
}

.ana-item-header {
  font-size: 14px;
  text-transform: uppercase;
}

.ana-item-percentage {
  color: #1c252c;
  font-weight: bold;
  font-size: 40px;
}

.ana-item-value,
.today-text {
  color: #136acd;
  font-weight: 700;
}

.versus {
  color: #1c252c;
  font-weight: 700;
}

/* .area-charts {
  width: 90%;
  display: flex;
  justify-content: space-between;
} */

.area-chart {
  width: 100%;
  border: 1px solid #ebeff4;
  border-radius: 5px;
}

.resend-btn {
  background: transparent !important;
  color: #4d6676 !important;
  border: 1px solid #dde2e6 !important;
}

.bottom-section {
  box-shadow: 0px 3px 10px #00000029;
  border: 1px solid #dde2e6;
  border-radius: 5px;
}

.genarationg-report {
  min-height: calc(100vh - 200px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-weight: bold;
  font-size: 20px;
}

@media screen and (max-width: 414px) {
  .ana-item {
    width: 100% !important;
  }
}

@media screen and (max-width: 507px) {
  .ana-item {
    width: 80%;
  }
}

@media screen and (max-width: 1000px) {
  .container {
    width: 100% !important;
  }

  .def-btn {
    max-width: 280px;
  }
}
</style>