<template>
  <div
    class="container-top"
    :class="{ 'container-slim': lgAndUp || xlAndUp }"
    @click="hideModals"
  >
    <div class="col-md-12 px-0">
      <div class="row">
        <div class="text-center text-sm-left col-sm-5 page-header">
          Offering
        </div>
        <div class="text-center text-sm-right col-sm-7">
          <div class="row">
            <div class="col-md-12 d-lg-flex justify-content-end">
              <div class="dropdown" v-if="false">
                <router-link to="/tenant/offeringcategory">
                  <el-button
                    class="more-btn header-btn button"
                    round
                    size="large"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    More
                    <span>
                      <el-icon><ArrowDown /></el-icon>
                    </span> </el-button
                ></router-link>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a class="dropdown-item">
                    <router-link to="/tenant/addoffering"
                      >Add Offering Category</router-link
                    ></a
                  >
                </div>
              </div>
              <el-button
                class="header-btn border-0"
                @click="post"
                :loading="loading"
                :color="primarycolor"
                size="large"
                round
              >
                <span class="text-white">Save and Continue</span>
                <span></span>
              </el-button>
            </div>
          </div>
        </div>
      </div>

      <div class="form">
        <div class="row second-form first-row">
          <div class="col-12 col-md-6">
            <div class="row nested-row d-flex align-items-end">
              <div class="col-2 col-md-2 text-right px-0">
                <label for="date">Event</label>
              </div>
              <div class="col-10 col-md-9">
                <el-dropdown class="w-100" trigger="click">
                <el-input class="w-100" placeholder="Select Events " v-model="selectedEventAttended.name" />
                <template #dropdown>
                  <el-dropdown-menu class="menu-height">
                    <el-dropdown-item v-for="(event, index) in filteredEvents" :key="index" @click="eventAttendedSelected(event)">{{
                      event.name }}</el-dropdown-item>
                    <el-dropdown-item class="d-flex justify-content-center text-primary font-weight-700"
                      data-toggle="modal" data-target="#eventModal" ref="openModalBtn" divided><el-icon>
                        <CirclePlus />
                      </el-icon>
                      Create new event
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
                <!-- <button
                  @click.prevent="selectEventAttended"
                  class="form-control dd text-left close-modal"
                >
                  {{
                    selectedEventAttended.name
                      ? selectedEventAttended.name.length > 20
                        ? `${selectedEventAttended.name.slice(0, 20)}...`
                        : selectedEventAttended.name
                      : "Select Event"
                  }}
                </button> -->
                <!-- <el-icon :size="17" @click="selectEventAttended" class="cursor-pointer manual-dd-icon align-self-center close-modal"><ArrowDown /></el-icon> -->
                <!-- <div
                  class="input-field manual-dd-con close-modal"
                  v-if="showEventList"
                >
                  <div class="manual-dd dd close-modal">
                    <div
                      class="container-fluid dd dd-search-con close-modal"
                      v-if="eventsAttended.length > 5"
                    >
                      <div class="row dd close-modal">
                        <div class="col-md-12 dd px-0 py-1 close-modal">
                          <input
                            type="text"
                            class="form-control close-modal"
                            v-model="eventsSearchString"
                            placeholder="search for event"
                          />
                        </div>
                      </div>
                    </div>

                    <div class="container-fluid dd-list-con">
                      <div class="row">
                        <div class="col-md-12 px-0">
                          <p
                            class="px-1 manual-dd-item mb-0 py-2 px-3 dd"
                            v-for="(event, index) in filteredEvents"
                            :key="index"
                            @click="eventAttendedSelected(event)"
                          >
                            {{ event.name }}
                          </p>
                          <p
                            class="text-center mb-1 mt-1"
                            v-if="
                              eventsSearchString &&
                              eventsAttended.length > 0 &&
                              filteredEvents.length === 0
                            "
                          >
                            No match found
                          </p>
                        </div>
                      </div>
                      <div class="row">
                        <div
                          class="col-md-12 py-2 px-0"
                          v-if="eventsAttended.length > 0"
                        >
                          <hr class="hr" />
                        </div>
                        <div class="col-md-12 create-event py-2 text-center">
                          <a
                            class="craete-event-btn font-weight-bold"
                            data-toggle="modal"
                            data-target="#eventModal"
                            >Create new event</a
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div> -->
              </div>
            </div>
          </div>

          <div class="col-12 col-md-6 mt-md-0 mt-3">
            <div class="row nested-row align-items-end">
              <div class="col-2 col-md-1 px-0">
                <label for="date">Date</label>
              </div>
              <div class="col-10 col-md-9">
                <el-date-picker
                  v-model="eventDate"
                  type="date"
                  size="large"
                  class="w-100"
                  format="MM/DD/YYYY"
                />
              </div>
            </div>
          </div>
        </div>

        <div
          class="modal fade"
          id="eventModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="eventModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered" role="document">
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
                    <label for="" class="label font-weight-bold"
                      >Event name</label
                    >
                  </div>
                  <div class="col-md-7">
                    <el-dropdown class="w-100" trigger="click">
                      <el-input class="w-100" placeholder="Select Events " v-model="selectEvent" />
                      <template #dropdown>
                        <el-dropdown-menu class="menu-height">
                          <el-dropdown-item v-for="(eventCategory, index) in filterEventCategory" :key="index" @click="individualEvent(eventCategory)">{{
                            eventCategory.name }}</el-dropdown-item>
                          <el-dropdown-item class="d-flex justify-content-center text-primary font-weight-700"
                            data-toggle="modal" data-target="#exampleModalEvent"  divided><el-icon>
                              <CirclePlus />
                            </el-icon>
                            Add New Event
                          </el-dropdown-item>
                        </el-dropdown-menu>
                      </template>
                    </el-dropdown>
                    <!-- <div
                      class="select-elem-con pointer d-flex justify-content-space-between"
                      @click="showCategory = !showCategory"
                    >
                      <span class="ofering">{{ selectEvent }}</span
                      ><span>
                        <el-icon :size="17"><ArrowDown /></el-icon>
                        </span>
                    </div> -->
                    <!-- <div
                      class="ofering"
                      :class="{ 'style-category': showCategory }"
                      v-if="showCategory"
                    >
                      <input
                        type="text"
                        placeholder="Search..."
                        class="form-control ofering mb-3"
                        v-model="eventText"
                      />
                      <div
                        v-for="(eventCategory, index) in filterEventCategory"
                        :key="index"
                        class="ofering"
                      >
                        <div
                          class="ofering py-1"
                          @click="individualEvent(eventCategory)"
                        >
                          {{ eventCategory.name }}
                        </div>
                      </div>
                      <div
                        v-if="filterEventCategory.length >= 1"
                        class="create cat ofering text-decoration-none"
                      >
                        <a
                          class="text-decoration-none"
                          href=""
                          data-toggle="modal"
                          data-target="#exampleModalEvent"
                        >
                          Add New Event
                        </a>
                      </div>
                      <div v-else class="create mt-3" @click="createNewCat(1)">
                        Create "{{ eventText }}" event
                      </div>
                    </div> -->

                    <!---- Event Modal---->
                  </div>
                </div>
                <div class="row mt-4 mb-4">
                  <div class="col-md-4 text-md-right align-self-center">
                    <label for="" class="label font-weight-bold"
                      >Event date</label
                    >
                  </div>
                  <div class="col-md-7"> 
                    <!-- {{newEvent.activity.date}} -->
                    <el-date-picker
                      v-model="newEvent.activity.date"
                      type="date"
                      size="large"
                      class="w-100"
                      format="MM/DD/YYYY"
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
                          <p
                            class="mb-1 text-danger"
                            v-if="invalidEventDetails"
                          >
                            Enter event name and date
                          </p>
                        </div>
                        <div class="col-md-12 d-md-flex  justify-content-sm-center justify-content-md-end">
                          <el-button
                            class="w-100 px-4"
                            data-dismiss="modal"
                            color="#EBEFF4"
                            round
                            size="large"
                          >
                            Close
                          </el-button>
                          <el-button
                            class="w-100 px-4 mx-0 mt-md-0 mt-2 text-white"
                            data-dismiss="modal"
                            round
                            size="large"
                            :color="primarycolor"
                            @click="createNewEvent"
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
        </div>

        <div
          class="modal fade"
          id="exampleModalEvent"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel2"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content border-bottom-0 shadow">
              <div class="modal-header border-bottom-0">
                <div
                  class="modal-title font-weight-bold"
                  id="exampleModalLabel2"
                >
                  Add Event
                </div>
                <el-button
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <el-icon class="mt-3" :size="16"><CloseBold /></el-icon>
                </el-button>
              </div>
              <div class="modal-body">
                <div class="row">
                  <div
                    class="offset-sm-1 col-sm-3 text-sm-right align-self-center"
                  >
                    Event Name
                  </div>
                  <div class="col-sm-7">
                    <el-input
                      type="text"
                      v-model="newEventCategoryName"
                      class="w-100"
                    />
                  </div>
                </div>
              </div>
              <div class="modal-footer border border-danger border-top-0">
                <el-button class="" data-dismiss="modal" round size="large">
                  Cancel
                </el-button>
                <el-button
                  class=""
                  id="closeEvent"
                  data-dismiss="modal"
                  round
                  :color="primarycolor"
                  size="large"
                  @click="createNewCat(2)"
                >
                  Save
                </el-button>
              </div>
            </div>
          </div>
        </div>

        <div class="col-12 offset-sm-1 add">Offering</div>
        <div class="attendance-header d-none d-lg-block">
          <div class="row">
            <div class="col-sm-3">Offering Item</div>
            <div class="col-sm-2">Channel</div>
            <div class="col-sm-3">Amount</div>
            <div class="col-sm-2 offset-sm-2" style="margin-left: 74px">
              Total
            </div>
          </div>
        </div>
        <div
          class="attendance-body stretch"
          id="offeringBody"
          v-for="(item, index) in offeringItem"
          :key="index"
        >
          <div class="row">
            <div class="col-12 col-sm-8 col-lg-3">
              <select
                class="form-control"
                v-if="item.financialContributionID && !routeParams"
              >
                <option
                  v-for="(newOffering, index) in newOfferings"
                  :key="index"
                  :value="newOffering.id"
                  :selected="newOffering.id === item.financialContributionID"
                >
                  {{ newOffering.name }}
                </option>
              </select>

              <select
                class="form-control"
                v-else-if="item.financialContributionID && routeParams"
                v-model="item.financialContributionID"
                @change="updateOfferingId"
              >
                <option
                  v-for="(newOffering, index) in newOfferings"
                  :key="index"
                  :value="newOffering.id"
                >
                  <p>{{ newOffering.name }}</p>
                </option>
              </select>
              <el-input
                type="text"
                class="w-100"
                name=""
                id=""
                v-else-if="!item.financialContributionID"
                v-model="item.name"
                placeholder="Enter Offering Item"
                ref="offeringInput"
              />
            </div>
            <div class="col-3 col-sm-4 col-lg-2">
              <el-select-v2
                  v-model="item.paymentChannel"
                  class="w-100 font-weight-normal"
                  :options="
                    paymentChannels.map((i) => ({
                      label: i,
                      value: i,
                    }))
                  "
                  size="large"
                />
            </div>
            <div class="col-3 col-sm-2 col-lg-1">
              <div
                class="currency pointer d-flex justify-content-around align-items-center close-modal"
                @click="item.showCurrency = !item.showCurrency"
              >
                <span class="ofering close-modal">{{
                  currencyList
                    ? currencyList.find((i) => i.id == item.currencyID)
                      ? currencyList.find((i) => i.id == item.currencyID).name
                      : tenantCurrency
                    : ""
                }}</span
                ><span style="margin-top: 4px">
                  <el-icon class="close-modal" :size="13"
                    ><ArrowDown
                  /></el-icon>
                </span>
              </div>
              <div
                class="ofering close-modal"
                :class="{ 'style-account': item.showCurrency }"
                v-if="item.showCurrency"
              >
                <div class="p-2">
                  <el-input
                    type="text"
                    placeholder="Search"
                    class="w-100 close-modal ofering mb-1"
                    v-model="currencyText"
                  />
                </div>
                <div
                  class="header-border close-modal"
                  v-if="filterCurrency.length > 0"
                >
                  <div
                    class="manual-dd-item close-modal"
                    v-for="item in filterCurrency"
                    :key="item.id"
                  >
                    <div class="d-flex justify-content-between p-1 close-modal">
                      <div
                        class="close-modal"
                        @click="addCurrency($event, index, item)"
                      >
                        {{ item.name }} - {{ item.country }}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="header-border close-modal" v-else>
                  <div class="p-3 text-center text-danger">No Match Found</div>
                </div>
              </div>
            </div>
            <div class="col-6 col-lg-3">
              <el-input
                type="text"
                class="w-100"
                v-model="item.amount"
                placeholder="Enter Amount"
                @input="sendAmount($event, index)"
              />
            </div>
            <div class="col-1 d-none d-lg-block">
              {{ item.amount }}
            </div>
            <div class="col-md-2 mt-1" @click="delOffering(index)">
              <el-icon :size="20"><Delete /></el-icon>
            </div>

            <div
              v-if="item.donor == ''"
              data-toggle="modal"
              data-target="#exampleModal"
              class="col-8 col-sm-3 offset-sm-5 donor-text pt-0 align-self-center"
              @click="setAddToDonor(index)"
            >
              Add Donor
            </div>
            <div
              v-else
              class="col-8 col-sm-5 offset-sm-5 donor-text-name pt-0 align-self-center mt-1"
              @click="setAddToDonor(index)"
              data-toggle="modal"
              data-target="#exampleModal"
            >
              {{ item.donor }} <span class="donor-text">edit</span>
            </div>
          </div>
        </div>

        <div
          class="col-sm-12 text-center add-attendance ofering"
          id="addOffering"
          @click="addOffering"
        >
          <el-icon :size="20" class="mr-2"><CirclePlus /></el-icon>Add Offering
          Item
        </div>
        <div class="display ofering" id="showList" ref="offeringDrop">
          <input
            type="text"
            class="form-control mb-3 ofering"
            v-model="offeringText"
            placeholder="Search Offering item"
            ref="focusInp"
          />
          <el-icon style="position: absolute; right: 20px; margin-top: -42px"
            ><Search
          /></el-icon>

          <div
            class="ofering pointer"
            v-for="(newOffering, index) in filterOffering"
            :key="index"
            @click="offering(newOffering)"
          >
            {{ newOffering.name }}
          </div>
          <div
            type="button"
            data-toggle="modal"
            data-target="#exampleModalCenter"
            class="create ofering pointer"
          >
            Create New Offering Item
          </div>
        </div>
        <button
          hidden
          type="button"
          id="modalTogglerOffering"
          class="btn btn-primary"
          data-toggle="modal"
          data-target="#exampleModalOffering"
        >
          Launch demo modal
        </button>

        <!-- Modal -->
        <div
          class="modal fade"
          id="exampleModalCenter"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div
            class="modal-dialog modal-lg modal-dialog-centered"
            role="document"
          >
            <div class="modal-content">
              <div class="modal-header" style="border: none">
                <h5 class="modal-title" id="exampleModalLongTitle">
                  Add Offering
                </h5>
                <el-button
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <el-icon class="mt-3" :size="20"><CloseBold /></el-icon>
                </el-button>
              </div>
              <div class="modal-body">
                <div class="container">
                  <div class="row">
                    <div class="col-sm-4 text-right pr-0 align-self-center">
                      <label>Name</label>
                    </div>
                    <div class="col-lg-5 col-sm-12 my-auto">
                      <el-input
                        type="text"
                        class="w-100 textbox-height w-100"
                        placeholder=""
                        v-model="name"
                        required
                      />
                    </div>
                    <div
                      class="col-sm-4 mt-3 text-right pr-0 "
                    >
                      <label>Income Account</label>
                    </div>
                    <div class="col-lg-5 col-sm-12 mt-3">
                      <el-dropdown trigger="click" class="w-100">
                        <span class="el-dropdown-link w-100">
                          <div
                            class="d-flex justify-content-between border-contribution w-100"
                            size="large"
                          >
                            <span class="text-secondary">{{
                              selectedIncomeAccount.text
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
                            <el-dropdown-item
                              v-for="(itm, indx) in incomeAccount"
                              :key="indx"
                              @click="selectIncomeAccount(itm)"
                              >{{ itm.text }}
                            </el-dropdown-item>
                          </el-dropdown-menu>
                        </template>
                      </el-dropdown>
                    </div>
                    <div class="col-sm-4 mt-3 text-right pr-0">
                      <label>Cash Account</label>
                    </div>
                    <div class="col-lg-5 col-sm-12 mt-3">
                      <el-dropdown trigger="click" class="w-100">
                        <span class="el-dropdown-link w-100">
                          <div
                            class="d-flex justify-content-between border-contribution w-100"
                            size="large"
                          >
                            <span class="text-secondary">{{
                              selectedCashAccount.text
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
                            <el-dropdown-item
                              v-for="(itm, indx) in cashBankAccount"
                              :key="indx"
                              @click="selectCashBankAccount(itm)"
                              >{{ itm.text }}
                            </el-dropdown-item>
                          </el-dropdown-menu>
                        </template>
                      </el-dropdown>
                    </div>
                    <div class="col-sm-12 d-flex" @click="toggleRem">
                      <i class="check-it mr-2">
                        <span class="child" v-if="applyRem"></span>
                      </i>
                      <h6>Apply Remitance</h6>
                    </div>
                    <div class="col-sm-12 mt-3" v-if="applyRem">
                      <hr class="hr" />
                    </div>
                  </div>

                  <div v-if="applyRem">
                    <div
                      class="row"
                      v-for="(item, index) in remitance"
                      :key="index"
                    >
                      <div
                        class="col-sm-4 mt-5 text-right pr-0 align-self-center"
                      >
                        <label>Income Account</label>
                      </div>
                      <div class="col-lg-5 col-sm-12 mt-5">
                        <el-dropdown trigger="click" class="w-100">
                        <span class="el-dropdown-link w-100">
                          <div
                            class="d-flex justify-content-between border-contribution w-100"
                            size="large"
                          >
                            <span class="text-secondary">{{
                              item && item.account
                                ? item.account.text
                                : "Select Account"
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
                              v-for="(itm, indx) in incomeAccount"
                              :key="indx"
                              @click="selectIncomeAccount2(itm, index)"
                              >{{ itm.text }}
                            </el-dropdown-item>
                          </el-dropdown-menu>
                        </template>
                      </el-dropdown>
                      </div>

                      <div class="col-sm-4 text-right align-self-center mt-3">
                        <label>Percentage %</label>
                      </div>
                      <div class="col-lg-5 col-sm-12 mt-3">
                        <el-input
                          type="text"
                          class="textbox-height w-100"
                          placeholder=""
                          v-model="item.percentage"
                          required
                        />
                      </div>

                      <div class="col-sm-2 col-12 adjust-down">
                        <el-button
                          v-on:click="addRemittance"
                          class="text-primary"
                          round
                          color="#dde2e6"
                          size="large"
                        >
                          <el-icon :size="20" class="mr-1" ><CirclePlus /></el-icon>
                          Add
                        </el-button>
                      </div>
                      <div
                        class="col-sm-1 adjust-down"
                        @click="deleteItem(index)"
                      >
                        <el-icon  :size="20"><Delete /></el-icon>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="modal-footer d-flex justify-content-center mt-4 ml-5"
                style="border: none"
              >
                <el-button
                  color="#EBEFF4"
                  round
                  class=" px-5"
                  size="large"
                  data-dismiss="modal"
                >
                  Close
                </el-button>
                <el-button
                  class=" px-5 border-0"
                  @click="createNewCon"
                  :color="primarycolor"
                  round
                  size="large"
                >
                  Save
                </el-button>
              </div>
            </div>
          </div>
        </div>
        <!-- Event Modal Button -->

        <!-- Modal -->
        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title font-weight-bold" id="exampleModalLabel">
                  Add Donor
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
                    <label for="" class="font-weight-600">Search Name</label>
                  </div>
                  <div class="col-md-7">
                    <el-dropdown class="w-100" trigger="click">
                      <span class="el-dropdown-link w-100">
                        <el-input 
                        type="text"
                        v-model="userSearchString"
                        @input="searchForUsers"
                        autocomplete="off"
                        />
                      </span>
                      <template #dropdown>
                        <el-dropdown-menu>
                          <el-icon class="is-loading" v-if="loading && userSearchString.length >= 3">
                            <Loading />
                          </el-icon>
                          <el-dropdown-item v-for="(member, index) in searchedMembers" :key="index" @click="addExistingMember(member)">{{ member.name }} - {{ member.phone }}</el-dropdown-item>
                          <el-dropdown-item v-if="userSearchString.length < 3" disabled>Enter 3 or more characters</el-dropdown-item>
                          <el-dropdown-item @click="showAddMemberForm"    divided><el-icon  :size="20" class="text-primary "><CirclePlus /></el-icon> <span class="text-primary font-weight-bold">Add new donor</span> </el-dropdown-item>
                        </el-dropdown-menu>
                      </template>
                    </el-dropdown>

                    <div class="row mt-4 d-flex justify-content-between">
                      <div class="col-md-6">
                        <el-button round size="large" class="w-100" data-dismiss="modal">
                          Cancel
                        </el-button>
                      </div>
                      <div class="col-md-6">
                        <el-button
                          class="w-100 border-0 text-white"
                          data-dismiss="modal"
                          @click="addDonor"
                          size="large"
                          round
                          :color="primarycolor"
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
        <el-dialog v-model="display" title="Create New Member" 
          :width="mdAndUp || lgAndUp || xlAndUp ? `50%` : `90%`">
         <div class="row">
            <div class="col-md-12">
              <NewDonor
                @cancel="() => (display = false)"
                @person-id="getPersonId($event)"
              />
            </div>
          </div>
        </el-dialog>

        <!-- Giver Modal Button -->
        <el-button
          hidden
          ref="modalTogglerGiver"
          id="modalTogglerGiver"
          class=" btn-primary"
          data-toggle="modal"
          data-target="#exampleGiver"
          size="large"
          round
        >
          Launch demo modal
        </el-button>

        <div class="col-sm-12 empty">
          <div class="row">
            <div class="col-2 col-md-6"></div>
            <div class="col-3 col-md-3 total-2">TOTAL</div>
            <div class="col-3 col-md-1">
              <CurrencyConverter
                :tenantCurrency="tenantCurrency"
                :selectedCurrency="selectedCurrencyName"
                :currencyList="currencyList"
                :currencyAmount="addOfferingTotal"
                @conversion-result="convertResult"
                @currency-rate="setCurrencyRate"
              />
            </div>
            <div class="col-4 col-md-2 align-self-center">
              {{
                convertedResult
                  ? convertedResult.toFixed(2)
                  : addOfferingTotal
                  ? addOfferingTotal.toFixed(2)
                  : 0.0
              }}
            </div>
          </div>
        </div>
        <el-button
          hidden
          id="modalTogglerFirstTimers"
          class=" btn-primary"
          round
          size="large"
          data-toggle="modal"
          data-target="#exampleModalFirstTimers"
        >
          Launch demo modal
        </el-button>
        <el-input
          :rows="5"
          class="w-100"
          type="textarea"
          placeholder="Notes..."
        />
      </div>
      <div class="col-md-12 mt-3 mb-2 justify-content-end d-flex px-0">
        <el-button
          class="header-btn border-0"
          @click="post"
          :loading="loading"
          :color="primarycolor"
          size="large"
          round
        >
          <span class="text-white">Save and Continue</span>
          <span></span>
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watchEffect, computed, inject } from "vue";
import axios from "@/gateway/backendapi";
import NewDonor from "../../../components/membership/NewDonor.vue";
import membershipService from "../../../services/membership/membershipservice";
import router from "../../../router";
import { useStore } from "vuex";
import CurrencyConverter from "../../event/CurrencyConverter";
import CurrencyConverterService from "../../../services/currency-converter/currencyConverter";
import { useRoute } from "vue-router";
import dateFormatter from "../../../services/dates/dateformatter";
import finish from "../../../services/progressbar/progress";
import deviceBreakpoint from "../../../mixins/deviceBreakpoint";
import { ElMessage } from 'element-plus'
export default {
  components: {
    NewDonor,
    CurrencyConverter,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const { lgAndUp, xlAndUp, mdAndUp } = deviceBreakpoint();
    const offeringDrop = ref(null);
    const showEventList = ref(false);
    const eventsAttended = ref([]);
    const eventsSearchString = ref("");
    const newEvents = ref([]);
    const selectedEventAttended = ref({});
    const selectEvent = ref("");
    const primarycolor = inject("primarycolor");
    const showCategory = ref(false);
    const eventText = ref("");
    const eventDate = ref("");
    const newEventCategoryName = ref("");
    const displayModal = ref(false);
    const invalidEventDetails = ref(false);
    const savingNewEvent = ref(false);
    const newOfferings = ref([]);
    const offeringText = ref("");
    const offeringItem = ref([]);
    const offeringInput = ref("");
    const currencyText = ref("");
    const currencyList = ref([]);
    const routeParams = ref("");
    const remitance = ref([{}]);
    const incomeAccount = ref([]);
    const applyRem = ref(false);
    const selectedIncomeAccount = ref("");
    const name = ref("");
    const selectedCashAccount = ref("");
    const cashBankAccount = ref([]);
    const offeringToAddDonor = ref(0);
    const donorBoolean = ref(false);
    const modalTogglerGiver = ref("");
    const donorText = ref("");
    const userSearchString = ref("");
    const searchedMembers = ref([]);
    const searchingForMembers = ref(false);
    const display = ref(false);
    const personId = ref("");
    const tenantCurrency = ref("");
    const loading = ref(false);
    const focusInp = ref("");
    const tenantId = ref("");
    const selectedCurrencyName = ref("");
    const currencyAmount = ref("");
    const convertedAmount = ref([]);
    const convertedAmount2 = ref([]);
    const currencyIndex = ref(0);
    const currencyRate = ref("");
    const convertedResult = ref(0);
    const iSoStringFormat = ref("")
    const paymentChannels = ref(['Cheque', 'Cash', 'Cheque', 'POS', 'Online', 'Bank Transfer' , 'USSDText'],)

    const addOffering = () => {
      offeringDrop.value.classList.toggle("offering-drop");
      focusInp.value.focus();
    };

    

    const hideModals = (e) => {
      if (!e.target.classList.contains("ofering")) {
        offeringDrop.value.classList.remove("offering-drop");
      }
      if (!e.target.classList.contains("close-modal")) {
        showEventList.value = false;
      }
    };

    const selectIncomeAccount = (income) => {
      selectedIncomeAccount.value = income;
    };

    const selectCashBankAccount = (cashacount) => {
      selectedCashAccount.value = cashacount;
    };
    const selectIncomeAccount2 = (item, index) => {
      remitance.value[index].account = item;
    };

    const selectEventAttended = () => {
      showEventList.value = !showEventList.value;
    };

    const filteredEvents = computed(() => {
      if (!selectedEventAttended.value.name) return eventsAttended.value;
      return eventsAttended.value.filter((i) =>
        i.name.toLowerCase().includes(selectedEventAttended.value.name.toLowerCase())
      );
    });

    onMounted(() => {
      axios.get("/api/Events/EventActivity").then((res) => {
        eventsAttended.value = res.data;
      });

      axios.get("/api/EventCategory").then((res) => {
        newEvents.value = res.data.map((i) => {
          return { id: i.id, name: i.name };
        });
      });
    });

    const closeManualModalIfOpen = (e) => {
      if (!e.target.classList.contains("dd")) {
        showEventList.value = false;
        eventsSearchString.value = "";
      }
    };

    const eventAttendedSelected = (eventObj) => {
      // console.log(eventObj);
      selectedEventAttended.value = eventObj;
      showEventList.value = false;
      eventsSearchString.value = "";
    };

    const newEvent = ref({
      activity: {},
    });

    

    const individualEvent = (obj) => {
      selectEvent.value = obj.name;
      newEvent.value.activity.eventCategoryId = obj.id;
      showCategory.value = false;
      console.log(obj);
    };

    const filterEventCategory = computed(() => {
      let arr = [];
      if (newEvents.value.length > 0) {
        console.log(newEvents.value, "new events");
        arr = newEvents.value.filter((i) => {
          return i.name.toLowerCase().includes(selectEvent.value.toLowerCase());
        });
      } else {
        return newEvents.value;
      }
      return arr;
    });

    // const openModal = () => {
    //   displayModal.value = true;
    // };

    const closeModal = () => {
      displayModal.value = false;
    };

    const createNewCat = async (eventParams) => {
      try {
        let data;
        const theText =
          eventParams === 1 ? selectEvent.value : newEventCategoryName.value;
          // eventParams === 1 ? eventText.value : newEventCategoryName.value;
        data = await axios.post(`/api/EventCategory?name=${theText}`);
        console.log(data.data);
        newEvents.value = data.data;
        ElMessage({
            type: "success",
            message: "Your new event was created successfully",
            duration: 5000,
          });
        
      } catch (error) {
        ElMessage({
            type: "error",
            message: error.response.data,
            duration: 5000,
          });
      }
      displayModal.value = false;
      console.log(newEventCategoryName.value);
      newEventCategoryName.value = "";
    };

    const createNewEvent = async () => {
      invalidEventDetails.value = false;
      if (newEvent.value.activity.date) {
        try {
          savingNewEvent.value = true;
          console.log(newEvent.value);
          const { data } = await axios.post(
            "/api/Events/CreateActivity",
            newEvent.value
          );
          selectedEventAttended.value.activityID = data.currentEvent.id;
          selectedEventAttended.value.name =
            `${data.currentEvent.name} (${data.currentEvent.id})`
              ? data.currentEvent.name
              : "New event selected";
           ElMessage({
            type: "success",
            message: "Your new event was created successfully",
            duration: 5000,
          });
        } catch (error) {
          console.log(error);
          /*eslint no-undef: "warn"*/
          NProgress.done();
          savingNewEvent.value = false;
        }
      } else {
        invalidEventDetails.value = true;
      }

      displayModal.value = false;
    };

    watchEffect(() =>{
      // console.log(newEvent.value, "jjkjjl");/
      if(eventDate.value){
       iSoStringFormat.value = dateFormatter.getISOStringGMT(eventDate.value)
      }
  })

    const getOffering = () => {
      axios.get("/api/financials/contributions/items").then((res) => {
        newOfferings.value = res.data;
      });
    };
    getOffering();

    const filterOffering = computed(() => {
      if (offeringText.value !== "" && newOfferings.value.length > 0) {
        return newOfferings.value.filter((i) => {
          return i.name
            .toLowerCase()
            .includes(offeringText.value.toLowerCase());
        });
      } else {
        return newOfferings.value;
      }
    });

    const offering = (offObj) => {
      if (offObj) {
        offeringItem.value.push({
          name: offObj.name,
          financialContributionID: offObj.id,
          paymentChannel:
            offObj.paymentChannel == undefined ||
            offObj.paymentChannel == "" ||
            offObj.paymentChannel == null
              ? "Cash"
              : offObj.paymentChannel,
          donor: "",
          date: iSoStringFormat.value,
          activityID: selectedEventAttended.value.activityID,
          currencyID:
            currencyList.value && tenantCurrency.value
              ? currencyList.value.find((i) => i.name === tenantCurrency.value)
                  .id
              : "",
          fromCurrencyRate: `usd${
            tenantCurrency.value ? tenantCurrency.value.toLowerCase() : ""
          }`,
        });
      }

      offeringDrop.value.classList.remove("offering-drop");
    };

    const delOffering = (index) => {
      offeringItem.value.splice(index, 1);
    };

    const getCurrentlySignedInUser = async () => {
      try {
        const res = await axios.get("/api/Membership/GetCurrentSignedInUser");
        tenantId.value = res.data.tenantId;
        console.log(store.getters.currentUser);
        if (store.getters.currentUser === undefined) {
          axios
            .get(`/api/Lookup/TenantCurrency?tenantID=${res.data.tenantId}`)
            .then((res) => {
              tenantCurrency.value = res.data.currency;
              getOneContribution();
              console.log(res.data);
            })
            .catch((err) => console.log(err));
        } else {
          axios
            .get(
              `/api/Lookup/TenantCurrency?tenantID=${store.getters.currentUser.tenantId}`
            )
            .then((res) => {
              tenantCurrency.value = res.data.currency;
              getOneContribution();
            })
            .catch((err) => console.log(err));
        }
      } catch (err) {
        /*eslint no-undef: "warn"*/
        NProgress.done();
        console.log(err);
      }
    };
    getCurrentlySignedInUser();

    onMounted(() => {});

    const getAllCurrencies = () => {
      axios
        .get("/api/lookup/getallcurrencies")
        .then((res) => {
          currencyList.value = res.data.map((i) => {
            return {
              name: i.shortCode,
              id: i.id,
              country: i.country,
            };
          });
        })
        .catch((err) => console.log(err));
    };
    getAllCurrencies();

    const filterCurrency = computed(() => {
      if (currencyText.value !== "" && currencyList.value.length > 0) {
        return currencyList.value.filter((i) => {
          if (i.name)
            return (
              i.name.toLowerCase().includes(currencyText.value.toLowerCase()) ||
              i.country.toLowerCase().includes(currencyText.value.toLowerCase())
            );
        });
      } else {
        return currencyList.value;
      }
    });

    const addOfferingTotal = computed(() => {
      if (convertedAmount.value.length <= 0) return 0;
      return convertedAmount.value.reduce((a, b) => {
        return (a || 0) + (b || 0);
      });
    });

    const addRemittance = () => {
      remitance.value.push({});
    };

    const deleteItem = (index) => {
      remitance.value.splice(index, 1);
    };

    const getIncomeAccount = () => {
      axios
        .get("/api/Financials/Accounts/GetIncomeAccounts")
        .then((res) => {
          finish();
          console.log(res);
          incomeAccount.value = res.data;
        })
        .catch((err) => {
          NProgress.done();
          console.log(err);
        });
    };
    getIncomeAccount();

    const getCashBankAccount = () => {
      axios
        .get("/api/financials/accounts/getcashbankaccounts")
        .then((res) => {
          console.log(res.data);
          cashBankAccount.value = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getCashBankAccount();

    const toggleRem = () => {
      applyRem.value = !applyRem.value;
    };

    const createNewCon = (e) => {
      let contributionCategory = {
        name: name.value,
        incomeAccountId: selectedIncomeAccount.value.id,

        cashAccountId: selectedCashAccount.value.id,
      };
      if (remitance.value[0].account || remitance.value[0].percentage) {
        contributionCategory.incomeRemittance = remitance.value.map((i) => {
          return {
            financialFundID: i.account.financialFundID,
            distinationIncomeAccount: i.account.id,
            percentage: i.percentage,
          };
        });
      } else {
        contributionCategory.incomeRemittance = null;
      }
      console.log(contributionCategory);
      axios
        .post("/api/financials/contributions/items/save", contributionCategory)
        .then((res) => {
          newOfferings.value.push({
            name: name.value,
            id: res.data.id,
          });
          ElMessage({
            type: "success",
            message: "Offering Saved",
            duration: 5000,
          });
        })
        .catch((err) => {
          ElMessage({
            type: "error",
            message: "Not Successful",
            duration: 5000,
          });
          console.log(err);
        });
      e.target.setAttribute("data-dismiss", "modal");
    };

    const post = () => {
      let invalidOfferingItem = offeringItem.value.find((i) => !i.amount);
      if (invalidOfferingItem) {
        ElMessage({
            type: "warning",
            message: "Enter amount for Offering item",
            duration: 5000,
          });
        return false;
      }

      loading.value = true;
      let contributions = offeringItem.value.map((i) => {
        let amount = i.amount.toString();
        const removeCharacters = amount.replace(/[^0-9.]/g, "");
        const toNumber = parseFloat(removeCharacters);
        return {
          name: i.name,
          financialContributionID: i.financialContributionID,
          date: i.date,
          amount: toNumber ? toNumber : 0,
          paymentChannel: i.paymentChannel,
          activityID: i.activityID,
          personID: i.personID ? i.personID : "",
          currencyID: i.currencyID,
        };
      });

      console.log(contributions);

      if (!route.params.offId) {
        axios
          .post(
            "/api/Financials/Contributions/Transactions/Save",
            contributions
          )
          .then((res) => {
            console.log(res, 'ffff');
            localStorage.setItem(
              "contriTransact",
              JSON.stringify(res.data.returnObject)
            );
            loading.value = false;
             store.dispatch('contributions/setContributionList').then(() =>{
              if (Object.keys(selectedEventAttended.value).length > 0) {
              router.push({
                name: "OfferingReport",
                query: {
                  report: iSoStringFormat.value,
                  activityID: selectedEventAttended.value.activityID,
                },
              });
            } else {
              store.dispatch('contributions/setContributionList').then(() =>{
                  router.push({
                  name: "OfferingReport",
                  query: { report: iSoStringFormat.value },
                });
              })
            }
             })

            // if (Object.keys(selectedEventAttended.value).length > 0) {
            //   router.push({
            //     name: "OfferingReport",
            //     query: {
            //       report: eventDate.value,
            //       activityID: selectedEventAttended.value.activityID,
            //     },
            //   });
            // } else {
            //   router.push({
            //     name: "OfferingReport",
            //     query: { report: eventDate.value },
            //   });
            // }

            let contriTransact = res.data.returnObject.map((i) => {
              return {
                amount: i.amount,
                contribution: i.contribution.name,
                date: i.date,
                donor: `${
                  i.person && i.person.firstName ? i.person.firstName : ""
                } ${i.person && i.person.lastName ? i.person.lastName : ""}`,
                eventDate: selectedEventAttended.value.name,
                eventName: selectedEventAttended.value.name,
                id: i.id,
                channel: i.paymentChannel,
                currencyName: currencyList.value.find(
                  (j) => j.id === i.currencyID
                ).name,
              };
            });
            console.log(contriTransact);
            store.dispatch(
              "contributions/newlyAddedContribution",
              contriTransact
            );
          })
          .catch((err) => {
            loading.value = false;
            ElMessage({
            type: "error",
            message: "Error, Please try again",
            duration: 5000,
          });
            console.log(err);
          });
      } else {
        contributions[0].id = route.params.offId;

        console.log(contributions);

        axios
          .put(`/api/Financials/Contributions/Transactions/Edit`, contributions)
          .then((res) => {
            console.log(res);
            localStorage.setItem(
              "contriTransact",
              JSON.stringify(res.data.returnObject)
            );
            loading.value = false;
            store.dispatch('contributions/setContributionList').then(() =>{
              if (Object.keys(selectedEventAttended.value).length > 0) {
              router.push({
                name: "OfferingReport",
                query: {
                  report: iSoStringFormat.value,
                  activityID: selectedEventAttended.value.activityID,
                },
              });
            } else {
              store.dispatch('contributions/setContributionList').then(() =>{
                router.push({
                name: "OfferingReport",
                query: { report: iSoStringFormat.value },
              });
              })
            }
            })
            
          })
          .catch((err) => {
            loading.value = false;
            ElMessage({
            type: "error",
            message: "Error, Please try again",
            duration: 5000,
          });
            console.log(err);
          });
      }
    };

    const addCurrency = async (e, index, item) => {
      offeringItem.value[index].currencyID = item.id;
      offeringItem.value[index].showCurrency = false;
      console.log(item, index);
      selectedCurrencyName.value = e.target.innerHTML.split(" ")[0];
      offeringItem.value[
        index
      ].fromCurrencyRate = `usd${item.name.toLowerCase()}`;

      let toDestinationCurrencyRate = `usd${tenantCurrency.value.toLowerCase()}`;
      let fromCurrencyRate = offeringItem.value[index].fromCurrencyRate;

      let amount = offeringItem.value[index].amount
        ? +offeringItem.value[index].amount
        : 0;

      try {
        let result = await CurrencyConverterService.currencyConverter(
          amount,
          fromCurrencyRate,
          toDestinationCurrencyRate
        );
        console.log(result);
        convertedAmount.value[index] = result;
      } catch (err) {
        console.log(err);
      }
    };

    const setAddToDonor = (index) => {
      offeringToAddDonor.value = index;
    };

    const addDonor = () => {
      let donorName = userSearchString.value;
      offeringItem.value[offeringToAddDonor.value].donor = donorName;
      donorBoolean.value = true;
      userSearchString.value = "";
    };

    const searchForUsers = () => {
      if (userSearchString.value.length >= 3) {
        startSearch(userSearchString.value);
      }
    };

    const startSearch = async (str) => {
      try {
        searchingForMembers.value = true;
        const response = await membershipService.searchMembers(str);
        searchingForMembers.value = false;
        searchedMembers.value = response;
      } catch (error) {
        searchingForMembers.value = false;
        console.log(error);
      }
    };

    const showAddMemberForm = () => {
      display.value = true;
    };

    const addExistingMember = (member) => {
      userSearchString.value = member.name;
      offeringItem.value[offeringToAddDonor.value].personID = member.id;
      console.log(userSearchString.value, member);
    };

    const getPersonId = (payload) => {
      personId.value = payload;
      offeringItem.value[offeringToAddDonor.value].donor =
        payload.personFirstName;
      offeringItem.value[offeringToAddDonor.value].personID = payload.personId;
    };

    const getRates = async () => {
      try {
        let { data } = await axios.get("/fxRates");
        store.dispatch("getRates", data);
      } catch (error) {
        console.log(error);
      }
    };
    getRates();

    const sendAmount = async (e, index) => {
      let amount = offeringItem.value[index].amount.toString();
      let removeCharacters = amount.replace(/[^0-9.]/g, "");
      let toNumber = parseFloat(removeCharacters);

      currencyAmount.value = e;
      currencyIndex.value = index;

      let toDestinationCurrencyRate = `usd${tenantCurrency.value.toLowerCase()}`;
      let fromCurrencyRate = offeringItem.value[index].fromCurrencyRate;
      let amountToConvert = toNumber ? toNumber : 0;

      console.log(amountToConvert, fromCurrencyRate, toDestinationCurrencyRate)

      try {
        let result = await CurrencyConverterService.currencyConverter(
          amountToConvert,
          fromCurrencyRate,
          toDestinationCurrencyRate
        );
        convertedAmount.value[index] = result;
      } catch (err) {
        console.log(err);
      }
    };

    const convertResult = (payload) => {
      convertedResult.value = payload;
    };

    const setCurrencyRate = (payload) => {
      currencyRate.value = payload;
    };

    const getOneContribution = async () => {
      if (route.params.offId) {
        try {
          let { data } = await axios.get(
            `/api/Financials/Contributions/Transactions/One?ID=${route.params.offId}`
          );
          console.log(data);
          selectedEventAttended.value = {
            name: data && data.activity ? data.activity.name : "",
            activityID: data.activityID,
          };
          eventDate.value = data.date.split("T")[0];
          offeringItem.value = [
            {
              name: data && data.contribution ? data.contribution.name : "",
              financialContributionID: data.financialContributionID,
              date: data.date.split("T")[0],
              activityID: data.activityID,
              paymentChannel: data.paymentChannel,
              currencyID: data.currencyID,
              amount: data.amount,
              currencyName: data.currency.shortCode,
              fromCurrencyRate: `usd${data.currency.shortCode.toLowerCase()}`,
            },
          ];

          getOnePerson(data.personID);

          for (let index = 0; index < offeringItem.value.length; index++) {
            const i = offeringItem.value[index];
            let toDestinationCurrencyRate = `usd${tenantCurrency.value.toLowerCase()}`;
            let fromCurrencyRate = i.fromCurrencyRate;
            let amount = i.amount ? +i.amount : 0;

            try {
              let result = await CurrencyConverterService.currencyConverter(
                amount,
                fromCurrencyRate,
                toDestinationCurrencyRate
              );
              console.log(result);
              convertedAmount.value.push(result);
            } catch (err) {
              console.log(err);
            }
          }
        } catch (error) {
          console.log(error);
        }
      }
    };

    const getOnePerson = async (personId) => {
      if (route.params.offId && personId) {
        try {
          let { data } = await axios.get(
            `/api/People/GetPersonInfoWithAssignments/${personId}`
          );
          console.log(data);
          offeringItem.value[offeringToAddDonor.value].donor = `${
            data.firstName ? data.firstName : ""
          } ${data.lastName ? data.lastName : ""}`;

          offeringItem.value[offeringToAddDonor.value].personID = personId;
        } catch (error) {
          console.log(error);
        }
      }
    };

    return {
      addOffering,
      primarycolor,
      offeringDrop,
      hideModals,
      selectEventAttended,
      showEventList,
      eventsAttended,
      filteredEvents,
      selectIncomeAccount,
      closeManualModalIfOpen,
      eventAttendedSelected,
      newEvents,
      selectedEventAttended,
      eventsSearchString,
      selectEvent,
      individualEvent,
      newEvent,
      showCategory,
      filterEventCategory,
      eventText,
      eventDate,
      createNewCat,
      newEventCategoryName,
      displayModal,
      // openModal,
      xlAndUp,
      lgAndUp,
      mdAndUp,
      closeModal,
      createNewEvent,
      invalidEventDetails,
      savingNewEvent,
      newOfferings,
      filterOffering,
      offeringText,
      offering,
      offeringItem,
      offeringInput,
      delOffering,
      currencyText,
      filterCurrency,
      currencyList,
      addOfferingTotal,
      routeParams,
      addRemittance,
      paymentChannels,
      remitance,
      deleteItem,
      incomeAccount,
      selectedIncomeAccount,
      selectCashBankAccount,
      applyRem,
      toggleRem,
      post,
      name,
      selectedCashAccount,
      selectIncomeAccount2,
      cashBankAccount,
      createNewCon,
      addCurrency,
      addDonor,
      offeringToAddDonor,
      donorBoolean,
      modalTogglerGiver,
      donorText,
      userSearchString,
      searchedMembers,
      searchForUsers,
      searchingForMembers,
      showAddMemberForm,
      display,
      setAddToDonor,
      addExistingMember,
      getPersonId,
      personId,
      tenantCurrency,
      loading,
      focusInp,
      tenantId,
      selectedCurrencyName,
      currencyAmount,
      sendAmount,
      convertedAmount,
      convertedAmount2,
      setCurrencyRate,
      currencyRate,
      convertResult,
      convertedResult,
      iSoStringFormat
    };
  },
};
</script>

<style scoped>
.page-header {
  font: normal normal 800 29px Nunito sans;
}

.scroll {
  max-height: 200px;
  overflow-y: scroll;
  overflow-x: hidden;
}

.form {
  margin-top: 50px;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 15px #797e8159;
  border: 1px solid #dde2e6;
  border-radius: 7px;
}
.form .second-form.row.first-row {
  padding: 50px;
}
.form-body {
  padding: 30px;
}

.add {
  font: normal normal bold 16px Nunito Sans;
  letter-spacing: 0px;
  color: #136acd;
  display: inline;
  padding: 10px 15px;
  background: #ecf0f3;
  border-radius: 10px 10px 0px 0px;
  position: relative;
  top: -8px;
}

.attendance-header {
  background-color: #ecf0f3;
  padding: 0 50px;
  border: none;
  border-bottom: 1px solid rgb(204, 204, 204);
}

.attendance-header div,
.attendance-body div {
  padding: 2px;
}
.attendance-header div {
  color: #002044;
  font-weight: 700;
}

.add-attendance {
  color: #136acd;
  font-weight: 600;
  border: none;
  border-top: 1px solid rgb(231, 231, 231);
  padding: 20px;
  cursor: pointer;
}

.display {
  display: none;
}

.offering-drop {
  box-shadow: 0px 3px 15px #797e8159;
  z-index: 1;
  position: absolute;
  left: 5%;
  margin-top: -50px;
  padding: 10px 10px;
  width: 90%;
  background: white;
  display: block;
  max-height: 300px;
  overflow: auto;
}
.offering-drop div {
  padding: 3px;
}
.offering-drop div:hover {
  padding: 3px;
  background: #ecf0f3;
}

.empty {
  border: none;
  border-top: 1px solid rgb(231, 231, 231);
  width: 100%;
  padding: 20px;
  font: normal normal 600 18px/24px Nunito Sans;
}

.total-2 {
  font: normal normal 600 20px/27px Nunito Sans;
  letter-spacing: 0px;
  color: #02172eb9;
  text-align: right;
  align-self: center;
}

.manual-dd-icon {
  position: absolute;
  top: 28%;
  right: 10%;
}

.manual-dd-con {
  position: relative;
}

.manual-dd {
  width: 100%;
  border: 1px solid #b9c5cf;
  position: absolute;
  background: white;
  z-index: 2;
  top: 0px;
  /* margin-right: 0.5rem; */
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
  margin: 10px;
  width: calc(100% - 20px);
}

.form-control.input.dd {
  text-align: left;
}

.dd-list-con {
  max-height: 360px;
  overflow: auto;
}

.create {
  text-align: center;
  font: normal normal bold 16px/22px Nunito Sans;
  letter-spacing: 0px;
  color: #136acd;
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

.modal-body.new-event-modal {
  padding: 0;
}

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

.attendance-body {
  padding: 0 50px;
  background-color: #ecf0f3;
}

.attendance-body.stretch {
  height: 85px;
}

@media (max-width: 991px) {
  .row.form-body.reg .row div {
    margin-top: 2em;
  }
  .attendance-body.stretch {
    height: 135px;
  }
}

.currency {
  width: 100%;
  height: 90%;
  font-size: 0.8em;
  background: rgba(207, 207, 207, 0.651);
  border: none;
  outline: none;
  /* margin-top: -4px; */
}

.more-btn {
  background: #dde2e6;
}

.style-account {
  box-shadow: 0px 3px 15px #797e8159;
  position: absolute;
  background: white;
  z-index: 1;
  width: 382%;
  max-height: 16em;
  overflow-y: auto;
}
.style-account div div:hover {
  background-color: #ecf0f3;
  cursor: pointer;
}

.btnIcons {
  width: 110px;
  height: 41px;
  color: #136acd;
  background-color: #dde2e6;
  border-radius: 40px;
  border: none;
}

.textbox-height {
  height: 42px;
  margin-top: -4px;
  width: 176px;
}

.check-it {
  border: 2px solid #136acd;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-top: -1px;
}

.check-it .child {
  /* border: 2px solid red; */
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #136acd;
  position: relative;
  left: 3px;
  top: -4px;
}

.hr {
  border: 0.8px solid #0020440a;
  /* margin: 0 45px; */
}

.adjust-down {
  align-self: flex-end;
}

.add-person-btn {
  background: #136acd;
  color: #fff;
}

.donor-text {
  height: 28px;
  color: #136acd;
  cursor: pointer;
  font-weight: 600px;
  font-size: 0.9em;
}
.donor-text-name {
  color: black;
  text-decoration: none;
  font-weight: 700;
}

.dropdown-menu {
  max-height: 400px;
  overflow: scroll;
}
.border-contribution {
  border: 1.6px solid rgb(229, 232, 237);
  border-radius: 4px;
  padding: 11px 7px;
}
</style>