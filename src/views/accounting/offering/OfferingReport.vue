<template>
  <div>
    <div class="container">
      <div class="row mt-4">
        <div class="col-md-5">
          <h2 class="font-weight-bold page-hder">New Offerings and Report</h2>
        </div>
        <div class="col-md-7 d-sm-flex justify-content-md-end">
          <a class="def-btn mr-3 px-md-4 my-sm-1" v-if="false"
            >More Actions <i class="fad fa-caret-circle-down"></i
          ></a>
          <router-link
            :to="{ name: 'AddOffering', path: '/tenant/addoffering' }"
          >
            <a class="def-btn px-sm-2 px-lg-4 my-sm-1">Create another report</a>
          </router-link>
        </div>
      </div>
      <hr class="mb-4" />
    </div>

    <div class="container" style="width: 80%">
      <div class="row mx-1 mb-4 mt-3">
        <div class="col-md-7">
          <span class="theader">{{
            contributionReport.activityName ? "Event" : ""
          }}</span>
          <div class="my-3">
            <span class="evt-name">
              {{
                contributionReport.activityName
                  ? contributionReport.activityName
                  : ""
              }}
              <el-icon class="mt-2 ml-1" v-if="contributionReport.activityName" ><InfoFilled /></el-icon>
            </span>
          </div>
        </div>

        <div class="col-md-3">
          <span class="theader">Date</span>
          <div class="my-3">
            <span class="date">{{ format(routeParams) }}</span>
          </div>
        </div>
      </div>

      <div class="row mx-1 mb-5">
        <div class="col-md-12">
          <div class="row unapproved">
            <div class="col-md-12">
              <div class="row" v-if="!reportApproved">
                <div class="col-md-12 py-3 info-div">
                  <span class="px-2"><el-icon><InfoFilled /></el-icon></span>
                  <span class="font-weight-bold"
                    >This is a DRAFT report. You can take further actions once
                    you approve it.</span
                  >
                  <span class="px-2"
                    ><span style="color: #136acd">Learn more</span>
                    <el-icon class="border-secondary p-0 ml-1 border"><TopRight /></el-icon>
                    </span>
                </div>
              </div>
              <div class="row my-3">
                <div class="col-md-1 d-flex align-items-center">
                  <span class="file-icon"
                    >
                    <el-icon  :color="primarycolor"  ><Document /></el-icon>
                   
                  </span>
                </div>
                <div class="col-md-5">
                  <span class="grey-text">Create </span>
                  <p>
                    <span class="dark-text">Created: </span>
                    <span class="grey-text"> just a moment ago</span>
                  </p>
                </div>
                <div
                  class="col-md-6 d-sm-flex justify-content-end"
                  v-if="!reportApproved"
                >
                  <a class="def-btn approve-btn mr-4" @click="toggleReportState"
                    >Approve report</a
                  >
                </div>
              </div>
            </div>
          </div>

          <div class="row unapproved mt-4">
            <div class="col-md-12">
              <div class="row my-3">
                <div class="col-md-1 d-flex align-items-center">
                  <span class="file-icon"
                    >
                  <el-icon><Bottom /></el-icon>
                  </span>
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
                              <div class="modal-dialog modal-lg">
                                <div class="modal-content">
                                  <div class="modal-header">
                                    <h5
                                      class="modal-title font-weight-bold"
                                      id="sendReport"
                                    >
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
                                  <div
                                    class="modal-body pt-0 px-0"
                                    :data-dismiss="btnState"
                                  >
                                    <!-- <ReportModal :eventName="eventDataResponse.name"/> -->
                                    <ReportModal
                                      :eventName="
                                        contributionReport.activityName
                                          ? contributionReport.activityName
                                          : ''
                                      "
                                      @sendreport="sendReport"
                                      :stats="contributionReport"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="col-6" @click="copyLink">
                          <a class="def-btn edit-btn">Get share link</a>
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
                    <el-input
                      type="text"
                      name=""
                      @keydown="(e) => e.preventDefault()"
                      class="w-100 mr-2"
                      :value="location"
                      ref="shareableLinkField"
                      style="width: 90%"
                    >
                      <template #append>
                        <el-button class="c-pointer" @click="copyLink">
                          <el-icon>
                            <CopyDocument />
                          </el-icon>
                        </el-button>
                      </template>
                    </el-input>
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
            <h2 class="evt-report">Offering Report</h2>
          </div>

          <div
            class="
              col-md-4
              d-flex
              flex-column
              light-red-section
              pr-5
              text-center
            "
          >
            <span>
              <span>Total Offering: </span> <br />
              <span class="recieve"
                >{{ contributionReport.tenantCurrency }}
                {{
                  contributionReport &&
                  Object.keys(contributionReport).length > 0
                    ? Math.abs(contributionReport.totalToday).toLocaleString()
                    : 0
                }}
              </span>
            </span>
          </div>
        </div>

        <div class="row pt-5 px-5" ref="middle">
          <div class="col-md-8">
            <h2 class="font-weight-bold mb-3" style="font-size: 25px">
              {{
                contributionReport.activityName
                  ? contributionReport.activityName
                  : "Offering Details"
              }}
            </h2>
          </div>
          <div class="col-md-4">
            <span class="evt-date text-danger">{{ format(routeParams) }}</span>
          </div>
        </div>

        <!-- <div class="row mb-3" ref="bottom">
        <div class="col-md-12">
        </div>
      </div> -->

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
                  <div class="col-sm-4">
                    <span class="bold-700">Offering Item</span>
                  </div>
                  <div class="col-sm-3">
                    <span class="bold-700">Channel</span>
                  </div>
                  <div class="col-sm-3">
                    <span class="bold-700">Amount</span>
                  </div>

                  <div class="col-sm-2">
                    <span class="bold-700 fs-1 fw-bolder">Total</span>
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
              v-for="(item, index) in contributionReport.todayContributions"
              :key="index"
            >
              <div class="col-md-12">
                <div class="row px-5">
                  <div class="col-sm-12">
                    <div class="row">
                      <div class="col-sm-4 py-2">
                        <span class="font-weight-700">{{
                          item.contribution
                        }}</span>
                      </div>
                      <div class="col-sm-3 py-2">
                        <span class="bold-400">{{ item.channel }}</span>
                      </div>
                      <div class="col-sm-3 py-2">
                        <span class="bold-400"
                          >{{ item.currencyName }}
                          {{ Math.abs(item.amount).toLocaleString() }}</span
                        >
                      </div>
                      <div class="col-sm-2 py-2">
                        <span class="bold-400"
                          >{{ item.currencyName }}
                          {{ Math.abs(item.amount).toLocaleString() }}</span
                        >
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="row"
                  v-if="
                    index !== contributionReport.todayContributions.length - 1
                  "
                >
                  <div class="col-sm-12">
                    <hr class="hr" />
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-6 offset-sm-6 mt-3">
                <hr
                  class="hr-total"
                  v-if="
                    contributionReport && contributionReport.todayContributions
                      ? contributionReport.todayContributions.length > 0
                      : ''
                  "
                />
              </div>
            </div>
            <div
              class="row px-5"
              v-if="
                contributionReport && contributionReport.todayContributions
                  ? contributionReport.todayContributions.length > 0
                  : ''
              "
            >
              <div class="col-sm-12">
                <div class="row">
                  <div class="col-sm-4"></div>
                  <div class="col-sm-3"></div>
                  <div class="col-sm-1">
                    <span class="text-style">Total</span>
                  </div>
                  <div class="col-sm-3 total-text">
                    <span class="text-danger"
                      >{{ contributionReport.tenantCurrency }}&nbsp;{{
                        contributionReport
                          ? amountWithCommas(
                              Math.round(contributionReport.totalToday)
                            )
                          : ""
                      }}</span
                    >
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-6 offset-sm-6">
                <hr
                  class="hr-total"
                  v-if="
                    contributionReport && contributionReport.todayContributions
                      ? contributionReport.todayContributions.length > 0
                      : ''
                  "
                />
              </div>
            </div>
          </div>
        </div>
        <div class="row email-data" ref="emaildata" v-show="false">
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
                        padding-bottom: 20px;
                      "
                      >Offering&nbsp;Report</span
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
                      >Total&nbsp;Offering:
                      {{ contributionReport.totalToday }}</span
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

                  <p style="margin-bottom: 0pt; margin-top: 0pt">
                    <span style="font-weight: bold; font-size: 24px"
                      >&nbsp; OFFERING DETAILS
                      <br />
                    </span>
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
                  <p style="margin-bottom: 0pt; margin-top: 15pt">
                    <span
                      style="font-size: 14px; color: red; padding-left: 20px"
                      >{{ format(routeParams) }}.</span
                    >
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
                v-for="(
                  offering, index
                ) in contributionReport.todayContributions"
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
                    <span style="font-weight: normal; font-size: 16px">{{
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
                    <span style="font-weight: normal; font-size: 16px">{{
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
                    <span style="font-weight: normal; font-size: 16px">{{
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
                    <span style="font-weight: normal; font-size: 16px">{{
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
                      contributionReport.totalToday
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
                      ><a
                        :href="url"
                        target="_blank"
                        style="color: blue; font-weight: bold"
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
                      ><a :href="url" style="color: blue; font-weight: bold"></a
                    ></span>
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- <div class="stats">
          <EventReportStats />
      </div> -->
        <div class="row" v-if="routeActivityId">
          <div class="col-md-12">
            <div class="pg-content">
              <h4 class="analytics min">Offering Performance</h4>

              <div class="analytics-container first-con">
                <div class="ana-group">
                  <div class="ana-header"></div>
                  <div class="ana-items">
                    <div>
                      <h5>
                        <span class="today-text">Today </span>
                        <span class="versus"> vs Last</span>
                      </h5>
                      <div class="ana-item mt-5">
                        <div class="ana-item-text">
                          <p class="ana-item-header">Offering</p>
                          <p class="ana-item-percentage">
                            {{
                              contributionReport.todayVsLastWeek
                                ? contributionReport.todayVsLastWeek.toString()
                                    .length > 4
                                  ? `${contributionReport.todayVsLastWeek
                                      .toString()
                                      .slice(0, 4)}..%`
                                  : contributionReport.todayVsLastWeek.toFixed(
                                      2
                                    )
                                : 0
                            }}
                          </p>
                          <p>
                            <span class="ana-item-value">
                              {{ contributionReport.totalToday }}
                            </span>
                            vs
                            <span class="ana-item-value">
                              {{ contributionReport.totalLastWeek }}
                            </span>
                          </p>
                        </div>
                        <div class="ana-item-icon">
                          <div class="item-image">
                            <div v-if="contributionReport.todayVsLastWeek > 0">
                              <img
                                src="../../../assets/dashboardlinks/trend-icon.svg"
                                alt=""
                              />
                            </div>
                            <div v-else>
                              <img
                                src="../../../assets/dashboardlinks/negative-icon.svg"
                                alt=""
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h5>
                        <span class="today-text">Today </span>
                        <span class="versus"> vs Same Time Last Month</span>
                      </h5>
                      <div class="ana-item mt-5">
                        <div class="ana-item-text">
                          <p class="ana-item-header">Offering</p>
                          <p class="ana-item-percentage">
                            {{
                              contributionReport.todayVsLastMonth
                                ? contributionReport.todayVsLastMonth.toString()
                                    .length > 4
                                  ? `${contributionReport.todayVsLastMonth
                                      .toString()
                                      .slice(0, 4)}..%`
                                  : contributionReport.todayVsLastMonth.toFixed(
                                      2
                                    )
                                : 0
                            }}
                          </p>
                          <p>
                            <span class="ana-item-value">
                              {{ contributionReport.totalToday }}
                            </span>
                            vs
                            <span class="ana-item-value">
                              {{ contributionReport.totalLastMonth }}
                            </span>
                          </p>
                        </div>
                        <div class="ana-item-icon">
                          <div class="item-image">
                            <div v-if="contributionReport.todayVsLastMonth > 0">
                              <img
                                src="../../../assets/dashboardlinks/trend-icon.svg"
                                alt=""
                              />
                            </div>
                            <div v-else>
                              <img
                                src="../../../assets/dashboardlinks/negative-icon.svg"
                                alt=""
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h5>
                        <span class="today-text">Today </span>
                        <span class="versus"> vs Same Time Last Year</span>
                      </h5>
                      <div class="ana-item mt-5">
                        <div class="ana-item-text">
                          <p class="ana-item-header">Offering</p>
                          <p class="ana-item-percentage">
                            {{
                              contributionReport.todayVsLastYear
                                ? contributionReport.todayVsLastYear.toString()
                                    .length > 4
                                  ? `${contributionReport.todayVsLastYear
                                      .toString()
                                      .slice(0, 4)}..%`
                                  : contributionReport.todayVsLastYear.toFixed(
                                      2
                                    )
                                : 0
                            }}
                          </p>
                          <p>
                            <span class="ana-item-value">
                              {{ contributionReport.totalToday }}
                            </span>
                            vs
                            <span class="ana-item-value">
                              {{ contributionReport.totalLastYear }}
                            </span>
                          </p>
                        </div>
                        <div class="ana-item-icon">
                          <div class="item-image">
                            <div v-if="contributionReport.todayVsLastYear > 0">
                              <img
                                src="../../../assets/dashboardlinks/trend-icon.svg"
                                alt=""
                              />
                            </div>
                            <div v-else>
                              <img
                                src="../../../assets/dashboardlinks/negative-icon.svg"
                                alt=""
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr class="hr" />
                </div>
              </div>

              <div class="area-charts analytics-container mb-5">
                <div class="area-chart mt-5">
                  <ReportAreaChart
                    elemId="chart"
                    domId="areaChart3"
                    title="OFFERING"
                    subtitle="This Month"
                    lineColor="#1F78B4"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, inject } from "vue";
// import ReportAreaChart from "@/components/charts/AreaChart.vue";
// import eventsService from '../../../services/events/eventsservice';
import ReportModal from "@/components/firsttimer/ReportModal.vue";
import composerObj from "../../../services/communication/composer";
import stopProgressBar from "../../../services/progressbar/progress";
import axios from "@/gateway/backendapi";
// // import { useStore } from 'vuex'
import { useRoute } from "vue-router";
import formatDate from "../../../services/dates/dateformatter";
import { ElMessage } from "element-plus";
import numbers_formatter from "../../../services/numbers/numbers_formatter";

export default {
  components: {
    ReportModal,
  },
  setup() {
    const route = useRoute();
    const reportApproved = ref(false);
    const contributionReport = ref([]);
    const emaildata = ref(null);
    const btnState = ref("");
    const churchName = ref("");
    const routeParams = ref(route.query.report);
    const routeActivityId = ref(route.query.activityID);
    const primarycolor = inject("primarycolor");
    const url = ref(`my.churchplus.co/tenant/report/${route.params.report}`);
    const sendBtnText = ref("Send Report");
    // const markedAsSent =  ref('mark as sent')
    const lastSent = ref("just a moment ago");
    const markedAsSent = ref(false);
    const willCopyLink = ref(false);
    // const status = ref("Draft");
    const shareableLinkField = ref(null);
    const location = ref(cation);

    const toggleReportState = () => {
      reportApproved.value = !reportApproved.value;
      // status.value = "Unsent";
    };

    // const getContributionReport = async() => {
    //   contributionReport.value = JSON.parse(localStorage.getItem('contriTransact'))
    //   console.log(contributionReport.value)

    //   try {
    //     await eventsService.getEventsByActivity(contributionReport.value[0].activityID)
    //     .then(res => console.log(res))
    //     .catch(err => console.log(err))
    //   }
    //   catch (err) {
    //     console.log(err)
    //   }
    // }
    // getContributionReport()

    // try {
    //         await eventsService.getEventsByActivity(contributionReport.value.todayContributions[0].id)
    //         .then(res => console.log(res))
    //         .catch(err => console.log(err))
    //       }
    //       catch (err) {
    //         console.log(err)
    //       }

    const getReport = () => {
      if (route.query.activityID) {
        axios
          .get(
            `/api/Offering/contributionReport?date=${route.query.report}&activityId=${route.query.activityID}`
          )
          .then((res) => {
            console.log(res);
            contributionReport.value = res.data.returnObject;
            console.log(contributionReport);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        axios
          .get(`/api/Offering/contributionReport?date=${route.query.report}`)
          .then((res) => {
            console.log(res);
            contributionReport.value = res.data.returnObject;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    };
    getReport();

    const sendReport = (messageObj) => {
      console.log(messageObj);
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
                        width: 30%;display:flex;flex-direction:column;height:133px;align-items:center;justify-content:center
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
            ElMessage({
                type: "error",
                message: res.message,
                duration: 3000,
              });
          } else {
            ElMessage({
                type: "success",
                message: "Send Success",
                duration: 3000,
              });
          }
        })
        .catch((err) => {
          btnState.value = "";
          console.log(err);
          stopProgressBar();

          ElMessage({
                type: "error",
                message: "Sending Failed",
                duration: 3000,
              });
        });
      btnState.value = "modal";
    };

    const getChurchName = (payload) => {
      churchName.value = payload;
    };

    const format = (date) => {
      return formatDate.monthDayYear(date);
    };

    const markAsSent = () => {
      lastSent.value = "Marked as sent today";
      status.value = "Sent";
      markedAsSent.value = true;
      sendBtnText.value = "Resend Report";
      // markedAsSent.value = "marked as sent"
    };

    const amountWithCommas = (amount) =>
      numbers_formatter.amountWithCommas(amount);

    const copyLink = () => {
      try {
        willCopyLink.value = true;
        const a = shareableLinkField.value.input;
        a.select();
        a.setSelectionRange(0, 200); /* For mobile devices */
        /* Copy the text inside the text field */
        document.execCommand("copy");
        ElMessage({
                type: "info",
                message: "Shareable link copied to your clipboard",
                duration: 3000,
              });
      } catch (error) {
        console.log(error);
      }
    };

    return {
      reportApproved,
      primarycolor,
      lastSent,
      status,
      toggleReportState,
      contributionReport,
      sendReport,
      emaildata,
      btnState,
      churchName,
      getChurchName,
      routeParams,
      format,
      url,
      sendBtnText,
      markAsSent,
      markedAsSent,
      routeActivityId,
      amountWithCommas,
      copyLink,
      shareableLinkField,
      location,
      willCopyLink,
    };
  },
};
</script>

<style scoped>
* {
  /* color: #1c252c; */
  box-sizing: border-box;
}

a {
  text-decoration: none;
  font-weight: 700;
}

.page-hder {
  font-size: 28px;
}

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

.def-btn {
  height: 40px;
  border-radius: 22px;
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

@media screen and (max-width: 1000px) {
  .container {
    width: 100% !important;
  }

  .def-btn {
    max-width: 280px;
  }
}
@media screen and (max-width: 640px) {
  .page-hder {
    font-size: 26px;
    padding-top: 20px;
  }
}

.unapproved {
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 15px #00000029;
  border: 1px solid #dde2e6;
  border-radius: 5px;
}

.info-div {
  background: #f9f8db;
  border: 1px solid #dde2e6;
  border-radius: 5px 5px 0px 0px;
  text-align: center;
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

.edit-btn {
  border: 1px solid #dde2e6;
}

.bottom-section {
  box-shadow: 0px 3px 10px #00000029;
  border: 1px solid #dde2e6;
  border-radius: 5px;
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

.evt-report {
  font-size: 25px;
}

.recieve {
  font-size: 22px;
}

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

.analytics-container {
  /* padding: 0 24px 24px 24px; */
  width: 90%;
  margin: auto;
}

.analytics.min {
  width: 230px;
  font-size: 17px;
}

.ana-items {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding-bottom: 24px;
}

.ana-item {
  width: 200px;
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

.ana-items h5 {
  font-size: 16px;
}

.versus {
  color: #1c252c;
  font-weight: 700;
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

.approve-btn {
  background: #136acd;
  color: white;
}

.resend-btn {
  background: transparent !important;
  color: #4d6676 !important;
  border: 1px solid #dde2e6 !important;
}

.text-style {
  font: normal normal bold 17px/16px Nunito Sans;
}

.total-text {
  font: normal normal normal 30px/24px Nunito Sans;
}

.hr-total {
  border: 1px solid #dde2e6;
}
</style>
