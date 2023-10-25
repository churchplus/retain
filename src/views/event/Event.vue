<template>
  <div class="container-fluid container-top" @click="hideModals">
    <div class="col-md-12 px-0">
      <div class=" first-pane">
        <div class="row">
          <div class="text-center text-sm-left col-sm-5 head-text">Events</div>
          <div class="text-center text-sm-right col-sm-7">
            <div class="row">
              <div class="col-md-12 d-lg-flex justify-content-end">
                <el-button class="default-btn" v-if="false">Preview</el-button>
                <el-button class="text-white  border-0 ml-3" @click="post" round :color="primarycolor" :loading="loading">
                  <span class="text-white">Save and Continue</span>
                  <span></span>
                </el-button>
              </div>
            </div>
          </div>
        </div>
        <div class="row mt-1">
          <div class="col-md-12">
            <span class="float-right text-danger font-weight-bold">{{
              errorMessage
            }}</span>
          </div>
        </div>
      </div>

      <div class="form">
        <!-- <div class="container"> -->
        <div class="row second-form first-row">
          <div class="
              col-12 col-sm-8
              offset-sm-3 offset-md-0
              col-md-5
              dropdown-container
            ">
            <div class="select-elem-con pointer ofering" id="eventCategorySelectElem"
              @click="showCategory = !showCategory" v-if="!selectedEventCategoryId && !showEditEventCategory">
              <span class="ofering">
                <el-icon>
                  <Calendar />
                </el-icon>
                &nbsp;&nbsp;&nbsp;Select
                Category</span><span class="mt-1">
                <el-icon class="ofering offset-sm-2" :class="{ roll3: showForm3 }">
                  <ArrowDown />
                </el-icon>
              </span>
            </div>
            <div class="ofering" :class="{ 'style-category': showCategory }" v-if="showCategory" id="showEventCategory">
              <input type="text" placeholder="Search" class="form-control ofering mb-3" v-model="eventText" />
              <div v-for="(eventCategory, index) in filterEventCategory" :key="index" class="ofering">
                <div class="ofering p-1" @click="individualEvent(eventCategory, index)">
                  {{ eventCategory.name }}
                </div>
              </div>
              <div v-if="filterEventCategory.length >= 1" @click="addEvent" class="create cat ofering">
                Add New Event
              </div>
              <div v-else class="create mt-3" @click="createNewEvent">
                Create "{{ eventText }}" event
              </div>
            </div>
            <div class="selected-category" v-if="selectedEventCategoryId">
              <p><el-icon class="mr-2">
                  <Calendar />
                </el-icon> Events</p>
              <h4>{{ selectedEventCategoryName }}</h4>
              <div class="event-buttons">
                <a @click="changeSelectedEventCategory('edit')">Edit</a>
                <a @click="
                  deleteSelectedEventCategory(selectedEventCategoryId, index)
                  ">Delete</a>
                <a @click="changeSelectedEventCategory('change')">Change</a>
              </div>
            </div>
            <div class="edit-category" v-if="showEditEventCategory">
              <div class="edit-form">
                <div class="edit-input">
                  <el-input type="text" class="w-100" v-model="categoryNametoEdit" autofocus />
                </div>
                <div class="edit-input" @click="updateEventCategory">
                  <el-button round :loading="loading">Save</el-button>
                </div>
              </div>
            </div>
          </div>

          <div class="col-12 text-sm-right col-sm-10 col-md-7 mt-sm-2 mt-md-0">
            <div class="row nested-row">
              <div class="col-12 col-sm-5">
                <label for="date">Date</label>
              </div>
              <div class="col-12 col-sm-7">
                <el-date-picker v-model="eventDate" type="date" format="MM/DD/YYYY" size="large" class="w-100 mt-2"
                  required />
              </div>
              <div class="col-12 col-sm-5">
                <label for="topic">Topic</label>
              </div>
              <div class="col-12 col-sm-7">
                <el-input type="text" v-model="topic" class="w-100 mt-2" />
              </div>

              <div class="col-12 col-sm-5">
                <label for="preacher">Preacher</label>
              </div>
              <div class="col-12 col-sm-7">
                <el-input type="text" v-model="preacher" class="w-100 mt-2" />
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-12 offset-sm-1 add">Add Attendance</div>

        <div class="attendance-header d-none d-md-block">
          <div class="row">
            <div class="col-sm-3">Attendance Type</div>
            <div class="col-sm-3 offset-sm-2">Count</div>
            <div class="col-sm-2" style="margin-left: 74px">Total</div>
          </div>
        </div>
        <!-- Attendance Items -->
        <div class="attendance-body" id="attendanceBody" v-for="(item, indx) in attendanceItem" :key="indx">
          <div class="row">
            <div class="col-6 col-md-3 mt-1">
              <select class="form-control " v-if="item.attendanceTypeID && !routeParams" v-model="item.attendanceTypeID"
                @change="setSelectedAttendanceName($event, indx)">
                <option v-for="(newAttendance, index) in newAttendances" :key="index"
                  :value="newAttendance.attendanceTypeID">
                  {{ newAttendance.name }}
                </option>
              </select>
              <select class="form-control " v-if="item.attendanceTypeID && routeParams" v-model="item.attendanceTypeID"
                @change="updateAttendanceId">
                <option v-for="(newAttendance, index) in newAttendances" :key="index"
                  :value="newAttendance.attendanceTypeID">
                  {{ newAttendance.name }}
                </option>
              </select>
              <input type="text" class="form-control" name="" id="" v-else-if="!item.attendanceTypeID"
                v-model="item.attendanceTypeName" placeholder="Enter Attendance Item" ref="attendanceInput" />
            </div>
            <div class="col-5 col-md-3 offset-md-2">
              <el-input type="number" v-model.number="item.number" class="w-100 " placeholder="Enter Count" />
            </div>
            <div class="d-none d-md-block col-sm-1 offset-sm-1" style="margin-left: 74px">
              {{ item.number }}
            </div>
            <div class="col-1" @click="deleteAttendance(item.attendanceId, indx)">
              <el-icon class="mt-3">
                <Delete />
              </el-icon>
            </div>
          </div>
        </div>

        <div class="col-12 text-center add-attendance ofering" id="addAttendance" @click="addAttendance">
          <el-icon class="mr-2">
            <CirclePlus />
          </el-icon>Add Attendance Item
        </div>
        <div class="display ofering" id="showAttendance" ref="attendanceDrop">
          <input type="text" class="form-control mb-3 ofering" v-model="attendanceText"
            placeholder="Search attendance item" />
          <div class="ofering pointer" @click="attendance(filteredAttendance)"
            v-for="(filteredAttendance, index) in filterAttendance" :key="index">
            {{ filteredAttendance.name }}
          </div>
          <div v-if="filterAttendance.length >= 1" @click="attendance(null)" class="create ofering pointer">
            Create New Attendance Item
          </div>
          <div v-else class="create pointer" @click="attendance(null)">
            Create "{{ attendanceText }}" attendance item
          </div>
        </div>
        <div class="col-sm-12 empty">
          <div class="row justify-content-end">
            <div class="col-md-6 d-flex flex-wrap">
              <div class="col-12 col-sm-4 ">TOTAL</div>
              <div class="col-12 col-sm-6  ">
                <div>{{ addAttendanceTotal }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-12 offset-sm-1 add">Add Offering</div>
        <div class="attendance-header d-none d-lg-block">
          <div class="row">
            <div class="col-sm-3">Offering Item</div>
            <div class="col-sm-2">Channel</div>
            <div class="col-sm-4">Amount</div>
            <div class="col-sm-2">Total</div>
          </div>
        </div>
        <div class="attendance-body stretch" id="offeringBody" v-for="(item, index) in offeringItem" :key="index">
          <div class="row">
            <div class="col-12 col-sm-8 col-lg-3 mt-1">
              <select class="form-control" v-if="item.financialContributionID && !routeParams"
                v-model="item.financialContributionID" @change="setSelectedOfferingItem($event, index)">
                <option v-for="(newOffering, index) in newOfferings" :key="index" :value="newOffering.id">
                  {{ newOffering.name }}
                </option>
              </select>

              <select class="form-control" v-else-if="item.financialContributionID && routeParams"
                v-model="item.financialContributionID" @change="updateOfferingId">
                <option v-for="(newOffering, index) in newOfferings" :key="index" :value="newOffering.id">
                  <p>{{ newOffering.name }}</p>
                </option>
              </select>
              <input type="text" class="form-control" name="" id="" v-else-if="!item.financialContributionID"
                v-model="item.name" placeholder="Enter Offering Item" ref="offeringInput" />
            </div>
            <div class="col-3 col-sm-4 col-lg-2">
              <el-select-v2 v-model="item.paymentChannel" class="w-100 font-weight-normal" :options="paymentChannels.map((i) => ({
                label: i,
                value: i,
              }))
                " size="large" />
            </div>

            <div class="col-3 col-sm-2 col-lg-1">
              <div class="
                  currency
                  py-2
                  pointer
                  d-flex
                  justify-content-around
                  align-items-center
                  close-modal
                " @click="item.showCurrency = !item.showCurrency">
                <span class="ofering close-modal">{{
                  item.currencyName
                  ? item.currencyName
                  : tenantCurrency.currency
                }}</span><span style="margin-top: 4px">
                  <el-icon class="close-modal">
                    <ArrowDownBold />
                  </el-icon>
                </span>
              </div>
              <div class="ofering close-modal" :class="{ 'style-account': item.showCurrency }" v-if="item.showCurrency">
                <div class="">
                  <el-input type="text" placeholder="Search" class=" close-modal  mb-1" v-model="currencyText" />
                </div>
                <div class="header-border close-modal" v-if="filterCurrency.length > 0">
                  <div class="manual-dd-item close-modal" v-for="item in filterCurrency" :key="item.id">
                    <div class="d-flex justify-content-between p-1 close-modal">
                      <div class="close-modal offset-sm-1" @click="addCurrency($event, index, item)">
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
              <el-input type="text" class="w-100" v-model="item.amount" placeholder="Enter Amount"
                @input="sendAmount($event, index)" />
            </div>
            <div class="col-1 d-none d-lg-block">
              {{ item.amount }}
            </div>
            <div class="col-1 mt-2" @click="delOffering(item.id, index)">
              <el-icon>
                <Delete />
              </el-icon>
            </div>
            <div v-if="item.donor == ''" data-toggle="modal" data-target="#exampleModal" class="
                col-8 col-sm-3
                offset-sm-5
                donor-text
                pt-0
                align-self-center
              " @click="setAddToDonor(index)">
              Add Donor
            </div>
            <div v-else class="
                col-8 col-sm-5
                offset-sm-5
                donor-text-name
                pt-0
                align-self-center
                mt-1
              " @click="setAddToDonor(index)" data-toggle="modal" data-target="#exampleModal">
              {{ item.donor }} <span class="donor-text">edit</span>
            </div>
          </div>
        </div>

        <div class="col-sm-12 text-center add-attendance ofering" id="addOffering" @click="addOffering">
          <el-icon class="mr-2">
            <CirclePlus />
          </el-icon>Add Offering Item
        </div>
        <div class="display ofering" id="showList" ref="offeringDrop">
          <input type="text" class="form-control mb-3 ofering" v-model="offeringText"
            placeholder="Search Offering item" />

          <div class="ofering pointer" v-for="(newOffering, index) in filterOffering" :key="index"
            @click="offering(newOffering)">
            {{ newOffering.name }}
          </div>
          <div type="button" data-toggle="modal" data-target="#exampleModalCenter" class="create ofering pointer">
            Create New Offering Item
          </div>
        </div>
        <button hidden type="button" id="modalTogglerOffering" class="btn btn-primary" data-toggle="modal"
          data-target="#exampleModalOffering">
          Launch demo modal
        </button>

        <div class="col-sm-12 empty">
          <div class="row justify-content-end">
            <div class="col-md-6 d-flex flex-wrap">
              <div class="col-12 col-sm-3  col-sm-3 total-2 ">
                TOTAL
              </div>
              <div class="col-4 col-sm-2   ofering">
                <CurrencyConverter :tenantCurrency="tenantCurrency.currency" :selectedCurrency="selectedCurrencyName"
                  :currencyList="currencyList" :currencyAmount="addContributionTotal" @conversion-result="convertResult"
                  @currency-rate="setCurrencyRate" />
              </div>
              <div v-if="convertedAmount2"
                class=" col-8 col-sm-4  align-self-center text-right text-sm-left converted-amout ml-4">
                <!-- Make this a computed that displays the value whenever the value of these variable changes -->
                {{
                  convertedResult
                  ? convertedResult.toFixed(2)
                  : addContributionTotal && addContributionTotal.toString() !== "NaN"
                    ? addContributionTotal.toFixed(2)
                    : offeringItemsSum()
                }}
              </div>
            </div>

          </div>
        </div>
        <button hidden type="button" id="modalTogglerFirstTimers" class="btn btn-primary" data-toggle="modal"
          data-target="#exampleModalFirstTimers">
          Launch demo modal
        </button>






        <!-- ========================= -->
        <!-- {{ expenseItem }} -->
        <!-- {{
  {
    name, id, cashaccount, amount
  }
}} -->

        <div class="col-12 offset-sm-1 add">Add Expense</div>
        <div class="attendance-header d-none d-lg-block">
          <div class="row">
            <div class="col-sm-3">Expense Item</div>
            <div class="col-sm-2">Cash Account</div>
            <div class="col-sm-5">Amount</div>
            <div class="col-sm-2">Total</div>
          </div>
        </div>
        <div class="attendance-body stretch" id="offeringBody" v-for="(item, index) in expenseItem" :key="index">
          <div class="row">
            <div class="col-12 col-sm-8 col-lg-3 mt-1">
              <select class="form-control" v-if="item.debitSplitAccounts[0].accountID"
                v-model="item.debitSplitAccounts[0].accountID">
                <option v-for="(expense, index) in expenseList" :key="index" :value="expense.id">
                  {{ expense.text }}
                </option>
              </select>

              <!-- <select class="form-control" v-else-if="item.debitSplitAccounts[0].accountID && routeParams"
                v-model="item.debitSplitAccounts[0].accountID">
                <option v-for="(expense, index) in expenseList" :key="index" :value="expense.id">
                  <p>{{ expense.text }}</p>
                </option>
              </select> -->
              <!-- <input type="text" class="form-control" name="" id="" v-else-if="!item.debitSplitAccounts[0].accountID" v-model="item.text"
                placeholder="Enter Expense Item" ref="offeringInput" /> -->
            </div>
            <div class="col-3 col-sm-4 col-lg-2">
              <el-select-v2 v-model="item.creditAccountID" class="w-100 font-weight-normal" :options="cashAccounts.map((i) => ({ label: i.text, value: i.id }))
                " size="large" />
            </div>

            <!-- <div class="col-3 col-sm-2 col-lg-1">
              <div class="
                  currency
                  py-2
                  pointer
                  d-flex
                  justify-content-around
                  align-items-center
                  close-modal
                " @click="item.showCurrency = !item.showCurrency">
                <span class="ofering close-modal">{{
                  item.currencyName
                  ? item.currencyName
                  : tenantCurrency.currency
                }}</span><span style="margin-top: 4px">
                  <el-icon class="close-modal">
                    <ArrowDownBold />
                  </el-icon>
                </span>
              </div>
              <div class="ofering close-modal" :class="{ 'style-account': item.showCurrency }" v-if="item.showCurrency">
                <div class="">
                  <el-input type="text" placeholder="Search" class=" close-modal  mb-1" v-model="currencyText" />
                </div>
                <div class="header-border close-modal" v-if="filterCurrency.length > 0">
                  <div class="manual-dd-item close-modal" v-for="item in filterCurrency" :key="item.id">
                    <div class="d-flex justify-content-between p-1 close-modal">
                      <div class="close-modal offset-sm-1"
                        @click="(expenseItem[index].currencyID = item.id), (expenseItem[index].showCurrency = false)">
                        {{ item.name }} - {{ item.country }}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="header-border close-modal" v-else>
                  <div class="p-3 text-center text-danger">No Match Found</div>
                </div>
              </div>
            </div> -->
            <div class="col-6 col-lg-3">
              <el-input type="text" class="w-100" v-model="item.debitSplitAccounts[0].amount"
                @input="setAmountIndex($event, index)" placeholder="Enter Amount" />
            </div>
            <div class="col-2 d-none d-lg-block">
              {{ item.debitSplitAccounts[0].amount }}
            </div>
            <div class="col-1 mt-2" @click="delExpense(item.id, index)">
              <el-icon>
                <Delete />
              </el-icon>
            </div>
            <!-- <div v-if="item.donor == ''" data-toggle="modal" data-target="#exampleModal" class="
                col-8 col-sm-3
                offset-sm-5
                donor-text
                pt-0
                align-self-center
              " @click="setAddToDonor(index)">
              Add Donor
            </div>
            <div v-else class="
                col-8 col-sm-5
                offset-sm-5
                donor-text-name
                pt-0
                align-self-center
                mt-1
              " @click="setAddToDonor(index)" data-toggle="modal" data-target="#exampleModal">
              {{ item.donor }} <span class="donor-text">edit</span>
            </div> -->
          </div>
        </div>

        <div class="col-sm-12 text-center add-attendance ofering" id="addOffering" @click="displayExpenseCard">
          <el-icon class="mr-2">
            <CirclePlus />
          </el-icon>Add Expense Item
        </div>
        <div class="display ofering" ref="expenseCard">
          <input type="text" class="form-control mb-3 ofering" v-model="expenseText" placeholder="Search expense item" />

          <div class="ofering pointer" v-for="(expense, index) in filterExpense" :key="index"
            @click="addExpense(expense)">
            {{ expense.text }}
          </div>
          <!-- <div type="button" data-toggle="modal" data-target="#exampleModalCenter" class="create ofering pointer">
            Create New Expense Item
          </div> -->
        </div>
        <button hidden type="button" id="modalTogglerOffering" class="btn btn-primary" data-toggle="modal"
          data-target="#exampleModalOffering">
          Launch demo modal
        </button>

        <div class="col-sm-12 empty">
          <div class="row justify-content-end">
            <div class="col-md-6 d-flex flex-wrap">
              <div class="col-12 col-sm-3  col-sm-3 total-2 ">
                TOTAL
              </div>
              <div class="col-4 col-sm-2   ofering">
                {{ this.expenseItem.reduce((a, b) => { return a + +b.amount }, 0) }}
                <!-- <CurrencyConverter :tenantCurrency="tenantCurrency.currency" :selectedCurrency="selectedCurrencyName"
                  :currencyList="currencyList" :currencyAmount="addContributionTotal" @conversion-result="convertResult"
                  @currency-rate="setCurrencyRate" /> -->
              </div>
              <!-- <div v-if="convertedAmount2"
                class=" col-8 col-sm-4  align-self-center text-right text-sm-left converted-amout ml-4">
                 Make this a computed that displays the value whenever the value of these variable changes 
                {{
                  convertedResult
                  ? convertedResult.toFixed(2)
                  : addContributionTotal && addContributionTotal.toString() !== "NaN"
                    ? addContributionTotal.toFixed(2)
                    : offeringItemsSum()
                }}
              </div> -->
            </div>

          </div>
        </div>
        <button hidden type="button" id="modalTogglerFirstTimers" class="btn btn-primary" data-toggle="modal"
          data-target="#exampleModalFirstTimers">
          Launch demo modal
        </button>





        <!-- ================== -->





        <!-- <div class="col-sm-12 empty"></div> -->
        <el-input v-model="note" :rows="5" type="textarea" placeholder="Enter your notes ..." />
      </div>

      <div class="form col-12 col-sm-12 offset-md-0 col-md-12">
        <div class="row row-form form-header pointer" @click="toggleForm3">
          <div class="col-10">
            <div>First Timers and New Convert</div>
          </div>
          <div class="col-2 text-right">
            <el-icon :class="{ roll3: showForm3 }">
              <ArrowUp />
            </el-icon>
          </div>
        </div>
        <div class="row form-body close-slide3" :class="{ 'slide-down3': showForm3 }">
          <!-- @click="toggleForm3" -->
          <div class="col-12 col-sm-3 add-first-timer pointer" @click="createFirstTimers">
            Add First Timers
          </div>
          <div class="
              col-12
              mt-3 mt-sm-0
              col-sm-3
              offset-sm-1
              add-new-convert
              pointer
            " id="modalTogglerFirstTimers" data-toggle="modal" data-target="#exampleModalNewConvert">
            Add New Converts
          </div>
          <!-- First timer table -->
          <div class="col-sm-12 box-table" v-if="firstTimers.length > 0">
            <div class="row table-header">
              <div class="col-12 table-title">First Timers</div>
              <div class="col-sm-4 d-none d-sm-block">FIRSTNAME</div>
              <div class="col-sm-4 d-none d-sm-block">LASTNAME</div>
              <div class="col-sm-3 d-none d-sm-block">PHONE</div>
            </div>

            <div class="table-body row" v-for="(item, index) in firstTimers" :key="index">
              <div class="col-6 d-block d-sm-none">
                <div class="col-sm-3">FIRSTNAME</div>
                <div class="col-sm-2">LASTNAME</div>
                <div class="col-sm-2">PHONE</div>
              </div>
              <div class="col-6 col-sm-12">
                <div class="row">
                  <div class="col-sm-4">
                    <div>{{ item.firstName }}</div>
                  </div>
                  <div class="col-sm-4">
                    <div>{{ item.lastName }}</div>
                  </div>
                  <div class="col-sm-3">
                    <div>{{ item.phoneNumber }}</div>
                  </div>
                  <div class="col-sm-1" @click="deleteFirstTimer(index)">
                    <el-icon>
                      <Delete />
                    </el-icon>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- New convert table -->
          <div class="col-sm-12 box-table" v-if="newConverts.length > 0">
            <div class="row table-header">
              <div class="col-12 table-title">New Converts</div>
              <div class="col-sm-4 d-none d-sm-block">FIRSTNAME</div>
              <div class="col-sm-4 d-none d-sm-block">LASTNAME</div>
              <div class="col-sm-3 d-none d-sm-block">PHONE</div>
            </div>

            <div class="table-body row" v-for="(item, index) in newConverts" :key="index">
              <div class="col-6 d-block d-sm-none">
                <div class="col-sm-3">FIRSTNAME</div>
                <div class="col-sm-2">LASTNAME</div>
                <div class="col-sm-2">PHONE</div>
              </div>
              <div class="col-6 col-sm-12">
                <div class="row">
                  <div class="col-sm-4">
                    <div>{{ item.firstName }}</div>
                  </div>
                  <div class="col-sm-4">
                    <div>{{ item.lastName }}</div>
                  </div>
                  <div class="col-sm-3">
                    <div>{{ item.phoneNumber }}</div>
                  </div>
                  <div class="col-sm-1" @click="deleteNewConvert(index)">
                    <el-icon>
                      <Delete />
                    </el-icon>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container first-pane mt-3 mb-5">
        <div class="row">
          <div class="col-md-12">
            <span class="float-right text-danger font-weight-bold">{{
              errorMessage
            }}</span>
          </div>
        </div>

        <div class="row">
          <div class="
              col-md-12
              d-lg-flex
              justify-content-end
              text-center text-sm-right
            ">
            <el-button class="default-btn secondary-button" v-if="false">Preview</el-button>
            <el-button :loading="loading" round :color="primarycolor" class=" border-0 ml-3" @click="post">
              <span class="text-white">Save and Continue</span>
              <span></span>
            </el-button>
          </div>
        </div>
      </div>
    </div>

    <!-- Event Modal Button -->

    <button hidden type="button" id="modalTogglerEvent" class="btn btn-primary" data-toggle="modal"
      data-target="#exampleModalEvent">
      Launch demo modal
    </button>

    <!-- Event Modal -->
    <div class="modal fade" id="exampleModalEvent" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <div class="modal-title" id="exampleModalLabel">Add Event</div>
            <el-button class="close" data-dismiss="modal" aria-label="Close">
              <el-icon class="mt-3" :size="16">
                <CloseBold />
              </el-icon>
            </el-button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="offset-sm-1 col-sm-3 text-sm-right align-self-center">
                New Event
              </div>
              <div class="col-sm-7">
                <el-input type="text" v-model="eventCreate" class="w-100" />
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <el-button class="" data-dismiss="modal" round size="large">
              Cancel
            </el-button>
            <el-button class="" id="closeEvent" data-dismiss="modal" round :color="primarycolor" size="large"
              @click="createNewEvent">
              Save
            </el-button>
          </div>
        </div>
      </div>
    </div>

    <!-- Attendance Modal -->
    <div class="modal fade" id="exampleModalAttendance" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <div class="modal-title" id="exampleModalLabel">
              Add Attendance Item
            </div>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <!-- Create -->
          <div class="modal-body">
            <div class="row">
              <div class="offset-sm-1 col-sm-3">Attendance Item</div>
              <div class="col-sm-7">
                <input type="text" v-model="attendanceCreate" class="form-control" />
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-second" data-dismiss="modal">
              Cancel
            </button>
            <button type="button" class="apply-btn" id="closeAttendance" @click="createNewAttendance">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Offering Modal -->
    <div class="modal fade" id="exampleModalOffering" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <div class="modal-title" id="exampleModalLabel">Add Offering</div>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="offset-sm-1 col-sm-3">Add Item</div>
              <div class="col-sm-7">
                <input type="text" v-model="offeringCreate" class="form-control" />
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-second" data-dismiss="modal">
              Cancel
            </button>
            <button type="button" @click="createNewOffering" id="closeOffering" class="apply-btn">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Giver Modal Button -->
    <button hidden ref="modalTogglerGiver" type="button" id="modalTogglerGiver" class="btn btn-primary"
      data-toggle="modal" data-target="#exampleGiver">
      Launch demo modal
    </button>

    <!-- Giver Modal -->
    <div class="modal fade" id="exampleGiver" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <div class="modal-title" id="exampleModalLabel">Add Giver</div>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="offset-sm-1 col-sm-3 text-sm-right align-self-center">
                Name
              </div>
              <div class="col-sm-7">
                <input type="text" v-model="donorText" class="form-control" />
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-second" data-dismiss="modal">
              Cancel
            </button>
            <button type="button" class="apply-btn" id="closeEvent" @click="addDonor" ref="closeDonorModal">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- First Timers Modal -->
    <div class="modal fade" id="exampleModalFirstTimers" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <div class="modal-title" id="exampleModalLabel">
              Add First Timers
            </div>
            <el-button class="close mt-0" data-dismiss="modal" aria-label="Close">
              <el-icon>
                <CloseBold />
              </el-icon>
            </el-button>
          </div>
          <div class="modal-body">
            <div class="container">
              <form>
                <div class="form-group row">
                  <label for="Firstname" class="col-sm-3 text-sm-right col-form-label">Firstname<sup
                      class="text-danger">*</sup></label>
                  <div class="col-sm-6">
                    <el-input type="text" class="input-first w-100" v-model="firstTimersObj.firstName" id="Firstname"
                      required />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="LastName" class="col-sm-3 text-sm-right col-form-label">Last Name</label>
                  <div class="col-sm-6">
                    <el-input type="text" v-model="firstTimersObj.lastName" class="input-first w-100" id="surname"
                      required />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="phone number" class="col-sm-3 text-sm-right col-form-label">Phone number</label>
                  <div class="col-sm-6">
                    <el-input type="number" v-model="firstTimersObj.phoneNumber" class=" input-first w-100"
                      :class="{ 'is-invalid': !isPhoneValid }" id="phone number" ref="validatePhone"
                      @blur="checkForDuplicatePhone" />
                    <div class="invalid-feedback">
                      Phone number exist, type a unique phone number.
                    </div>
                  </div>
                </div>
                <div class="form-group row">
                  <label for="email" class="col-sm-3 text-sm-right col-form-label">Email</label>
                  <div class="col-sm-6">
                    <el-input type="email" class="input-first w-100" :class="{ 'is-invalid': !isEmailValid }"
                      v-model="firstTimersObj.email" id="email" ref="validateEmail" @blur="checkForDuplicateEmail" />
                    <div class="invalid-feedback">
                      Email exist, type a unique email.
                    </div>
                  </div>
                </div>
                <div class="form-group row">
                  <label for="address" class="col-sm-3 text-sm-right col-form-label">Address</label>
                  <div class="col-sm-6">
                    <el-input type="text" v-model="firstTimersObj.address" class="w-100 input-first" id="address" />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="address" class="col-sm-3 text-sm-right col-form-label">Contact owner</label>
                  <div class="col-sm-6">
                    <div class="p-0 border-0">
                      <SearchMembers @memberdetail="setContact" />
                    </div>
                  </div>
                </div>

                <div class="form-group row">
                  <label for="birthday" class="col-sm-3 text-sm-right col-form-label">Birthday</label>
                  <div class="col-sm-2 mb-4">
                    <el-select-v2 v-model="firstTimersObj.birthday" :options="day.map((i) => ({ label: i, value: i }))"
                      placeholder="Day" class="w-100" size="large" />
                  </div>
                  <div class="col-sm-2 mb-4 px-sm-0">
                    <el-select-v2 @change="dropDownMonth" v-model="valueMonth"
                      :options="months.map((i) => ({ label: i, value: i }))" placeholder="Month" class="w-100"
                      size="large" />
                  </div>
                  <div class="col-sm-2 mb-4">
                    <el-select-v2 v-model="firstTimersObj.birthYear"
                      :options="birthYearsArr.map((i) => ({ label: i, value: i }))" placeholder="Year" class="w-100"
                      size="large" />
                  </div>
                  <div class="col-sm-3 mb-4 offset-sm-3 pr-sm-0">
                    <el-select-v2 v-model="valueMarital" @change="dropDownMarital"
                      :options="maritalStatusArr.map((i) => ({ label: i.value, value: i.id }))"
                      placeholder="Marital Status" class="w-100" size="large" />
                  </div>
                  <div class="col-sm-3 mb-4">
                    <el-select-v2 v-model="valueGender" @change="dropDownGender"
                      :options="gender.map((i) => ({ label: i.value, value: i.id }))" placeholder="Gender" class="w-100"
                      size="large" />
                  </div>
                </div>

                <!-- <div class="col-sm-12 mt-4">Insights</div>-->
                <span class="d-flex justify-content-between align-items-center" @click="toggleForm1">
                  <span>Insights</span><span style="border: 0px solid red; width: 70%">
                    <hr />
                  </span><span><el-icon :class="{ roll: showForm1 }">
                      <ArrowUp />
                    </el-icon>
                  </span>
                </span>

                <div class="form-group row close-slide1" :class="{ 'slide-down1': showForm1 }">
                  <div class="col-sm-6 offset-sm-3 mb-4">
                    <div>How did you hear about us</div>
                    <el-select-v2 v-model="valueHeard" @change="dropDownHeard"
                      :options="howYouHeard.map((i) => ({ label: i, value: i }))" placeholder="Select" class="w-100"
                      size="large" />
                  </div>
                  <div class="col-sm-6 offset-sm-3 mb-4">
                    <div>Preferred means of communication</div>
                    <el-select-v2 v-model="valueComm" @change="dropDownComm"
                      :options="comMeansArr.map((i) => ({ label: i, value: i }))" placeholder="Select" class="w-100"
                      size="large" />
                  </div>
                  <div class="col-sm-6 offset-sm-3 mb-4">
                    <div>Interested in joining us</div>
                    <el-select-v2 v-model="valueInterest" @change="dropDownInterest"
                      :options="joinInterest.map((i) => ({ label: i, value: i }))" class="w-100" placeholder="Select"
                      size="large" />
                  </div>
                  <div class="col-sm-6 offset-sm-3 mb-4">
                    <div>Want to be visited?</div>
                    <el-select-v2 v-model="valueVisit" @change="dropDownVisit"
                      :options="wantVisitArr.map((i) => ({ label: i, value: i }))" placeholder="Select" class="w-100"
                      size="large" />
                  </div>
                </div>
                <span class="d-flex justify-content-between align-items-center" @click="toggleForm">
                  <span>Follow up and retention</span><span style="width: 60%">
                    <hr />
                  </span><span><el-icon :class="{ roll: showForm }">
                      <ArrowUp />
                    </el-icon>
                  </span>
                </span>
                <div class="form-group row close-slide" :class="{ 'slide-down': showForm }">
                  <div class="col-sm-3 offset-sm-3 mt-4 mb-4">
                    Send Welcome SMS
                  </div>
                  <div class="mt-3 mb-4">
                    <el-checkbox v-model="firstTimersObj.sendWelcomeSms" />
                  </div>

                  <div class="col-sm-3 mt-4 mb-4">Send Welcome Email</div>
                  <div class="mt-3 mb-4">
                    <el-checkbox v-model="firstTimersObj.sendWelcomeEmail" />
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <el-button round class="secondary-button" size="large" data-dismiss="modal">
              Cancel
            </el-button>
            <el-button :color="primarycolor" class="text-white" round size="large" ref="closeFirstTimers" @click="save">
              Save
            </el-button>
          </div>
        </div>
      </div>
    </div>

    <!-- New Convert Modal -->
    <div class="modal fade" id="exampleModalNewConvert" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <div class="modal-title" id="exampleModalLabel">
              Add New Convert
            </div>
            <el-button class="close mt-0" data-dismiss="modal" aria-label="Close">
              <el-icon>
                <CloseBold />
              </el-icon>
            </el-button>
          </div>
          <div class="modal-body">
            <div class="container">
              <form>
                <div class="form-group row">
                  <label for="Firstname" class="col-sm-3 text-sm-right col-form-label">Firstname<sup
                      class="text-danger">*</sup></label>
                  <div class="col-sm-6">
                    <el-input type="text" class="w-100 input-first" v-model="newConvertsObj.firstName" id="Firstname"
                      required />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="LastName" class="col-sm-3 text-sm-right col-form-label">Last Name</label>
                  <div class="col-sm-6">
                    <el-input type="text" v-model="newConvertsObj.lastName" class="w-100 input-first" id="surname"
                      required />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="phone number" class="col-sm-3 text-sm-right col-form-label">Phone number</label>
                  <div class="col-sm-6">
                    <el-input v-model="newConvertsObj.phoneNumber" class="w-100 input-first" id="phone number"
                      type="number" :class="{ 'is-invalid': !isPhoneValidNewConvert }" ref="validatePhoneNewConvert"
                      @blur="checkForDuplicatePhoneNewConvert" />
                    <div class="invalid-feedback">
                      Phone number exist, type a unique phone number.
                    </div>
                  </div>
                </div>
                <div class="form-group row">
                  <label for="email" class="col-sm-3 text-sm-right col-form-label">Email</label>
                  <div class="col-sm-6">
                    <el-input v-model="newConvertsObj.email" id="email" type="email" class="w-100 input-first"
                      :class="{ 'is-invalid': !isEmailValidNewConvert }" ref="validateEmailNewConvert"
                      @blur="checkForDuplicateEmailNewConvert" />
                    <div class="invalid-feedback">
                      Email exist, type a unique email.
                    </div>
                  </div>
                </div>
                <div class="form-group row">
                  <label for="address" class="col-sm-3 text-sm-right col-form-label">Address</label>
                  <div class="col-sm-6">
                    <el-input type="text" v-model="newConvertsObj.address" class="w-100 input-first" id="address" />
                  </div>
                </div>

                <div class="form-group row">
                  <label for="address" class="col-sm-3 text-sm-right col-form-label">Contact owner</label>
                  <div class="col-sm-6">
                    <div class="p-0 border-0">
                      <SearchMembers @memberdetail="setContactNewConvert" />
                    </div>
                  </div>
                </div>

                <div class="form-group row">
                  <label for="birthday" class="col-sm-3 text-sm-right col-form-label">Birthday</label>
                  <div class="col-sm-2 mb-4">
                    <el-select-v2 v-model="newConvertsObj.birthday" :options="day.map((i) => ({ label: i, value: i }))"
                      placeholder="Day" class="w-100" size="large" />
                  </div>

                  <div class="col-sm-2 mb-4 px-sm-0">
                    <el-select-v2 v-model="valueMonth" @change="dropDownMonthNewConvert"
                      :options="months.map((i) => ({ label: i, value: i }))" placeholder="Month" class="w-100"
                      size="large" />
                  </div>

                  <div class="col-sm-2 mb-4">
                    <el-select-v2 v-model="firstTimersObj.birthYear"
                      :options="birthYearsArr.map((i) => ({ label: i, value: i }))" placeholder="Year" class="w-100"
                      size="large" />
                  </div>

                  <div class="col-sm-3 mb-4 offset-sm-3 pr-sm-0">
                    <el-select-v2 v-model="firstTimersObj.valueMarital" @change="dropDownMaritalNewConvert"
                      :options="maritalStatusArr.map((i) => ({ label: i.value, value: i.id }))"
                      placeholder="Marital Status" class="w-100" size="large" />
                  </div>

                  <div class="col-sm-3 mb-4">
                    <el-select-v2 v-model="valueGender" @change="dropDownGenderNewConvert"
                      :options="gender.map((i) => ({ label: i.value, value: i.id }))" placeholder="Gender" class="w-100"
                      size="large" />
                  </div>
                </div>

                <span class="d-flex justify-content-between align-items-center" @click="toggleForm1">
                  <span>Insights</span><span style="border: 0px solid red; width: 70%">
                    <hr />
                  </span><span><el-icon :class="{ roll: showForm1 }">
                      <ArrowUp />
                    </el-icon>
                  </span>
                </span>

                <div class="form-group row close-slide1" :class="{ 'slide-down1': showForm1 }">
                  <div class="col-sm-6 offset-sm-3 mb-4">
                    <div>How did you hear about us</div>
                    <el-select-v2 v-model="valueHeard" @change="dropDownHeardNewConvert"
                      :options="howYouHeard.map((i) => ({ label: i, value: i }))" placeholder="Select" class="w-100"
                      size="large" />
                  </div>

                  <div class="col-sm-6 offset-sm-3 mb-4">
                    <div>Preferred means of communication</div>
                    <el-select-v2 v-model="valueComm" @change="dropDownCommNewConvert"
                      :options="comMeansArr.map((i) => ({ label: i, value: i }))" placeholder="Select" class="w-100"
                      size="large" />
                  </div>

                  <div class="col-sm-6 offset-sm-3 mb-4">
                    <div>Interested in joining us</div>
                    <el-select-v2 v-model="valueInterest" @change="dropDownInterestNewConvert"
                      :options="joinInterest.map((i) => ({ label: i, value: i }))" placeholder="Select" class="w-100"
                      size="large" />
                  </div>

                  <div class="col-sm-6 offset-sm-3 mb-4">
                    <div>Want to be visited?</div>
                    <el-select-v2 v-model="valueVisit" @change="dropDownVisitNewConvert"
                      :options="wantVisitArr.map((i) => ({ label: i, value: i }))" placeholder="Select" class="w-100"
                      size="large" />
                  </div>
                </div>
                <span class="d-flex justify-content-between align-items-center" @click="toggleForm">
                  <span>Follow up and retention</span><span style="width: 60%">
                    <hr />
                  </span><span><el-icon :class="{ roll: showForm }">
                      <ArrowUp />
                    </el-icon>
                  </span>
                </span>
                <div class="form-group row close-slide" :class="{ 'slide-down': showForm }">
                  <div class="col-sm-3 offset-sm-3 mt-4 mb-4">
                    Send Welcome SMS
                  </div>
                  <div class="mt-3 mb-4">
                    <el-checkbox v-model="firstTimersObj.sendWelcomeSms" />
                  </div>

                  <div class="col-sm-3 mt-4 mb-4">Send Welcome Email</div>
                  <div class="mt-3 mb-4">
                    <el-checkbox v-model="firstTimersObj.sendWelcomeEmail" />
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <el-button round size="large" class="secondary-button" data-dismiss="modal">
              Cancel
            </el-button>
            <el-button round :color="primarycolor" class="" size="large" ref="closeNewConverts" @click="saveNewConvert">
              Save
            </el-button>
          </div>
        </div>
      </div>
    </div>
    <!-- Add donor Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title font-weight-bold" id="exampleModalLabel">
              Add Donor
            </h5>
            <el-button class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true" class="mt-3"><el-icon>
                  <CloseBold />
                </el-icon></span>
            </el-button>
          </div>
          <div class="modal-body">
            <div class="row my-4">
              <div class="col-md-4 text-md-right">
                <label for="" class="font-weight-600">Search Name</label>
              </div>
              <div class="col-md-7">
                <div class="dropdown">
                  <div class="input-group" id="dropdownMenuButton" data-toggle="dropdown">
                    <input type="text" class="form-control" v-model="userSearchString" @input="searchForUsers"
                      autocomplete="off" />
                    <div class="input-group-append">
                      <span class="input-group-text">
                        <el-icon>
                          <ArrowDownBold />
                        </el-icon>
                      </span>
                    </div>
                  </div>
                  <div class="dropdown-menu w-100" aria-labelledby="dropdownMenuButton">
                    <div class="row w-100 mx-auto" v-if="false">
                      <div class="col-md-12">
                        <el-input type="text" class="w-100" placeholder="Find event" />
                      </div>
                    </div>

                    <a class="dropdown-item font-weight-700 small-text" href="#"
                      v-for="(member, index) in searchedMembers" :key="index" @click="addExistingMember(member)">{{
                        member.name }}</a>
                    <a class="dropdown-item font-weight-700 small-text" href="#"
                      v-if="searchingForMembers && searchedMembers.length === 0">
                      <el-icon class="is-loading ">
                        <Loading />
                      </el-icon>
                    </a>
                    <p class="modal-promt pl-1 bg-secondary m-0" v-if="userSearchString.length < 3 &&
                      searchedMembers.length === 0
                      ">
                      Enter 3 or more characters
                    </p>
                    <a class="
                        font-weight-bold
                        small-text
                        d-flex
                        justify-content-center
                        py-2
                        text-decoration-none
                        primary--text
                        c-pointer
                      " style="border-top: 1px solid #002044;" @click="showAddMemberForm" data-dismiss="modal">
                      <el-icon class="d-flex
                          align-items-center mr-1">
                        <CirclePlus />
                      </el-icon>
                      Add new donor
                    </a>
                  </div>
                </div>

                <div class="row mt-4 d-flex justify-content-between">
                  <div class="col-6">
                    <el-button round class="secondary-button" data-dismiss="modal" size="large">
                      Cancel
                    </el-button>
                  </div>
                  <div class="col-6">
                    <el-button class="border-0 text-white" size="large" data-dismiss="modal" @click="addDonor"
                      :color="primarycolor" round>
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

    <!-- Add contribution Item Modal -->
    <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true">
      <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header" style="border: none">
            <h5 class="modal-title" id="exampleModalLongTitle">Add Offering</h5>
            <el-button class="close mt-0" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true"><el-icon>
                  <CloseBold />
                </el-icon></span>
            </el-button>
          </div>
          <div class="modal-body">
            <div class="container">
              <div class="row">
                <div class="col-sm-4 text-right pr-0 align-self-center">
                  <label>Name</label>
                </div>
                <div class="col-lg-5 col-sm-12 my-auto">
                  <el-input type="text" class=" textbox-height w-100" placeholder="" v-model="contributionItemName"
                    required />
                </div>
                <div class="col-sm-4 mt-3 text-right pr-0 align-self-center">
                  <label>Income Account</label>
                </div>
                <div class="col-lg-5 col-sm-12 mt-3">
                  <el-select-v2 v-model="selectedIncomeAccount"
                    :options="incomeAccount.map((i) => ({ label: i.text, value: i.id }))" placeholder="Select"
                    size="large" class="w-100" />
                </div>
                <div class="col-sm-4 mt-3 text-right pr-0">
                  <label>Cash Account</label>
                </div>
                <div class="col-lg-5 col-sm-12 mt-3">
                  <el-select-v2 v-model="selectedCashAccount"
                    :options="cashBankAccount.map((i) => ({ label: i.text, value: i.id }))" placeholder="Select"
                    size="large" class="w-100" />
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
                <div class="row" v-for="(item, index) in remitance" :key="index">
                  <div class="col-sm-4 mt-5 text-right pr-0 align-self-center">
                    <label>Income Account</label>
                  </div>
                  <div class="col-lg-5 col-sm-12 mt-5">
                    <el-select-v2 v-model="itemAccountID" @change="setIncomeAccount(index)"
                      :options="incomeAccount.map((i) => ({ label: i.text, value: i.id }))" placeholder="Select"
                      size="large" class="w-100" />
                  </div>

                  <div class="col-sm-4 text-right align-self-center mt-3">
                    <label>Percentage %</label>
                  </div>
                  <div class="col-lg-5 col-sm-12 mt-3">
                    <el-input type="text" class="textbox-height w-100" placeholder="" v-model="item.percentage"
                      required />
                  </div>

                  <div class="col-sm-2 col-12 adjust-down">
                    <el-button v-on:click="addRemittance" round size="large" class="btnIcons text-primary">
                      <el-icon class="mr-2">
                        <CirclePlus />
                      </el-icon>
                      Add
                    </el-button>
                  </div>
                  <div class="col-sm-1 adjust-down" @click="deleteItem(index)">
                    <el-icon>
                      <Delete />
                    </el-icon>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer d-flex justify-content-center mt-4 ml-5" style="border: none">
            <el-button class=" secondary-button" color="#dde2e6" data-dismiss="modal" round size="large">
              Close
            </el-button>
            <el-button class="border-0" round size="large" :color="primarycolor" @click="createNewCon">
              Save
            </el-button>
          </div>
        </div>
      </div>
    </div>
    <el-dialog v-model="displayResponsive" :width="mdAndUp || lgAndUp || xlAndUp ? `50%` : `90%`">
      <p>
        You have no income account to create a offering item, go to Chart of
        Account and click 'Update Account' to update your accounts.
      </p>
      <div class="row">
        <div class="col-md-12">
          <el-button @click="closeResponsive" autofocus>
            Go to Chart Of Accounts
          </el-button>
        </div>
      </div>
    </el-dialog>

    <el-dialog v-model="display" title="Create New Member" :width="mdAndUp || lgAndUp || xlAndUp ? `50%` : `90%`">
      <div class="row">
        <div class="col-md-12">
          <NewDonor @cancel="() => (display = false)" @person-id="getPersonId($event)" />
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "@/gateway/backendapi";
import { ElMessage, ElMessageBox } from 'element-plus';
import store from "@/store/store.js";
import membershipService from "../../services/membership/membershipservice";
import CurrencyConverter from "./CurrencyConverter";
import CurrencyConverterService from "../../services/currency-converter/currencyConverter";
import finish from "../../services/progressbar/progress";
import SearchMembers from "../../components/membership/MembersSearch.vue";
import NewDonor from "../../components/membership/NewDonor.vue";
import deviceBreakpoint from "../../mixins/deviceBreakpoint";
export default {
  components: {
    CurrencyConverter,
    SearchMembers,
    NewDonor,
  },
  inject: ['primarycolor'],
  data() {
    return {
      currDate: "",
      type: null,
      //   currency: '',
      amount: null,
      preEventTopic: "",
      xsOnly: deviceBreakpoint(),
      mdAndUp: deviceBreakpoint(),
      lgAndUp: deviceBreakpoint(),
      xlAndUp: deviceBreakpoint(),
      details: "",
      eventRules: "",
      preActivityId: "",
      //   enableRegistration: '',
      eventRegistrationLink: "",
      venue: "",
      emailRegistration: "",
      SMSRegistration: "",
      banner: "",
      isPublic: false,
      offeringItem: [],
      category: null,
      count: null,
      attendanceItem: [],
      firstTimersObj: {},
      firstTimers: [],
      newConvertsObj: {},
      newConverts: [],
      selectedValue: null,
      check: false,
      offeringCreate: null,
      newOfferings: [],
      expenseList: [],
      expenseItem: [],
      cashAccounts: [],
      attendanceCreate: null,
      newAttendances: ["Adult", "Children"],
      paymentChannels: ['Cheque', 'Cash', 'Cheque', 'POS', 'Online', 'Bank Transfer', 'USSDText'],
      channel: "",
      eventCreate: null,
      newEvents: [],
      attendanceText: "",
      offeringText: "",
      expenseText: "",
      day: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
      ],
      months: [
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
      ],
      valueMonth: null,
      itemAccountID: null,
      valueMarital: null,
      valueGender: null,
      valueHeard: null,
      valueComm: null,
      valueInterest: null,
      valueVisit: null,
      showForm1: false,
      showForm: false,
      showForm2: false,
      showForm3: false,
      topic: "",
      preacher: "",
      preEventAmount: "",
      preEventName: "",
      updatePreEvent: {},
      eventCategories: [],
      selectedEventCategory: {},
      selectedEventCategoryId: "",
      selectedCategoryIndex: "",
      categoryNametoEdit: "",
      eventDate: new Date().toISOString().substr(0, 10),
      showEditEventCategory: false,
      gender: [],
      comMeansArr: ["Call", "Email", "Visit", "SMS"],
      wantVisitArr: ["Yes", "No", "Maybe", "On Transit"],
      joinInterest: ["Yes", "No", "Maybe", "On Transit"],
      maritalStatusArr: [],
      howDidYouAboutUsId: [],
      // 'Friend',
      // 'Social media',
      // 'Church Flyer',
      // 'Tv',
      // 'Radio',
      showCategory: false,
      eventText: "",
      toggleFocus: true,
      loading: false,
      errorMessage: "",
      firstTimerNameIsInValid: false,
      donorText: "",
      // addGiver: "Add Giver",
      donorBoolean: false,
      currencyList: [],
      showCode: false,
      currencyText: "",
      eventObj: {},
      routeParams: null,
      showCurrency: false,
      offeringToAddDonor: 0,
      userSearchString: "",
      searchingForMembers: false,
      searchedMembers: [],
      selectedCurrencyId: "",
      tenantId: "",
      tenantCurrency: {},
      selectedCurrencyName: "",
      currencyAmount: "",
      convertedAmount: [],
      convertedAmount2: [],
      currencyIndex: 0,
      applyRem: false,
      remitance: [{}],
      incomeAccount: [],
      selectedIncomeAccount: null,
      contributionItemName: "",
      selectedCashAccount: null,
      cashBankAccount: [],
      isPhoneValid: true,
      isEmailValid: true,
      isPhoneValidNewConvert: true,
      isEmailValidNewConvert: true,
      currencyRate: [],
      convertedResult: 0,
      displayResponsive: false,
      display: false,
      note: "",
      expenseAmountIndex: 0
    };
  },

  methods: {
    getCorrectDate(date) {
      // let myDate = new Date(date).toLocaleDateString();
      //   let arr = myDate.split('/');
      //   arr.unshift(arr.splice(2, 1)[0])
      //    return arr.join('-')
      return new Date(date).toLocaleDateString("en-US").replaceAll('/', '-')
    },
    currentDate() {
      this.currDate = this.eventDate;
    },

    hideModals(e) {
      if (!e.target.classList.contains("ofering")) {
        this.$refs.offeringDrop.classList.remove("offering-drop");
        this.$refs.attendanceDrop.classList.remove("offering-drop");
        this.showCategory = false;
      }
    },
    addAttendance() {
      const showAttendance = document.querySelector("#showAttendance");
      showAttendance.classList.toggle("offering-drop");
    },
    addOffering() {
      const showList = document.querySelector("#showList");
      showList.classList.toggle("offering-drop");
    },
    setSelectedOfferingItem(e, index) {
      const selectedOffering = this.newOfferings.find(i => i.id == e.target.value)
      this.offeringItem[index].name = selectedOffering.name
    },
    setSelectedAttendanceName(e, index) {
      const selectedAttendance = this.newAttendances.find(i => i.attendanceTypeID == e.target.value)
      this.attendanceItem[index].attendanceTypeName = selectedAttendance.name
    },
    offering(offObj) {
      if (offObj) {
        this.offeringItem.push({
          name: offObj.name,
          financialContributionID: offObj.id,
          paymentChannel:
            offObj.paymentChannel == undefined ||
              offObj.paymentChannel == "" ||
              offObj.paymentChannel == null
              ? "Cash"
              : offObj.paymentChannel,
          currencyID:
            offObj.currencyID == undefined ||
              offObj.currencyID == "" ||
              offObj.currencyID == null
              ? this.tenantCurrency.currencyId
              : offObj.currencyID,
          donor: "",
          fromCurrencyRate: `usd${this.tenantCurrency.currency
            ? this.tenantCurrency.currency.toLowerCase()
            : ""
            }`,
        });
      } else {
        this.offeringItem.push({
          currency: "NGN",
          paymentChannel: "Cash",
        });
        this.$nextTick(() => {
          this.$refs.offeringInput.focus();
        });
      }
      this.offeringText = "";
      const showList = document.querySelector("#showList");
      showList.classList.toggle("offering-drop");
    },
    displayExpenseCard() {
      this.$refs.expenseCard.classList.toggle("offering-drop")
    },
    addExpense(expense) {
      console.log(expense, 'expense')
      // this.expenseItem.push({
      //   name: expense.text,
      //   id: expense.id,
      //   currencyID:
      //     expense.currencyID == undefined ||
      //       expense.currencyID == "" ||
      //       expense.currencyID == null
      //       ? this.tenantCurrency.currencyId
      //       : expense.currencyID,
      // })

      const expensePayload = {
        debitSplitAccounts: [
          {
            accountID: expense.id,
            contactID: ""
          }
        ],
        date: this.eventDate,
        memo: expense.text,
        transactionNumber: "",
        category: "outflow",
        amount: 0
      }
      this.expenseItem.push(expensePayload)
      this.$refs.expenseCard.classList.remove("offering-drop")
    },
    setAmountIndex(e, index) {
      this.expenseItem[index].amount = e
    },
    attendance(attObj) {
      if (attObj) {
        this.attendanceItem.push({
          attendanceTypeName: attObj.name,
          attendanceTypeID: attObj.attendanceTypeID,
        });
      } else {
        this.attendanceItem.push({
          attendanceTypeName: this.attendanceText,
        });
        this.$nextTick(() => {
          this.$refs.attendanceInput.focus();
        });
      }
      this.attendanceText = "";
      const showAttendance = document.querySelector("#showAttendance");
      showAttendance.classList.remove("offering-drop");
    },
    addEvent(e) {
      this.selectedEventCategoryId = e.target.value;
      //   if (e.target.value == "Add New Event") {
      document.querySelector("#modalTogglerEvent").click();
      //   }
    },
    createOffering() {
      document.querySelector("#modalTogglerOffering").click();
    },
    createAttendance() {
      document.querySelector("#modalTogglerAttendance").click();
    },
    createFirstTimers() {
      document.querySelector("#modalTogglerFirstTimers").click();
    },
    save() {
      this.firstTimers.push({
        ...this.firstTimersObj,
      });
      ElMessage({
        type: "success",
        message: "First timer added",
        duration: 3000,
      });
      this.firstTimersObj = {};
      console.log(this.firstTimers);
      this.$refs.closeFirstTimers.setAttribute("data-dismiss", "modal");
    },
    saveNewConvert() {
      this.newConverts.push({
        ...this.newConvertsObj,
      });
      console.log(this.newConverts);
      this.newConvertsObj = {};
      this.$refs.closeNewConverts.setAttribute("data-dismiss", "modal");
    },
    changeValue(e) {
      this.selectedValue = e.target.value;
    },
    // Create Offering
    createNewOffering() {
      axios
        .post(`/api/offering`, JSON.stringify(this.offeringCreate))
        .then((res) => {
          this.newOfferings = res.data.map((i) => {
            return { id: i.id, name: i.name };
          });
        })
        .catch((err) => {
          NProgress.done();
          console.log(err);
        });
      this.offeringCreate = "";
      document
        .querySelector("#closeOffering")
        .setAttribute("data-dismiss", "modal");
    },
    createNewAttendance() {
      console.log("posted");
      /*eslint no-undef: "warn"*/
      axios
        .post(`/postAttendantType`, { name: this.attendanceCreate })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          NProgress.done();
          console.log(err.response);
        });
      document
        .querySelector("#closeAttendance")
        .setAttribute("data-dismiss", "modal");
    },
    createNewEvent() {
      if (this.eventCreate) {
        this.selectedEventCategoryName = this.eventCreate;
        axios
          .post(`/api/EventCategory?name=${this.eventCreate}`)
          .then((res) => {
            console.log(res);
            if (!res.data) {
              ElMessage({
                type: "info",
                message: "Event name already exist, please create the event category with a new name.",
                duration: 3000,
              });
            } else {
              let data = res.data.find((i) => i.name === this.eventCreate);
              this.newEvents.push({
                name: this.eventCreate,
                id: data.id,
              });
              console.log(data);
              this.selectedEventCategoryId = data.id;
              this.eventCreate = "";
              ElMessage({
                type: "success",
                message: "Event category saved successfully",
                duration: 3000,
              });
            }
          });

        this.showCategory = false;
        document
          .querySelector("#closeEvent")
          .setAttribute("data-dismiss", "modal");
      } else if (this.eventText) {
        this.selectedEventCategoryName = this.eventText;

        axios.post(`/api/EventCategory?name=${this.eventText}`).then((res) => {
          console.log(res);
          if (!res.data) {
            ElMessage({
              type: "info",
              message: "Event name already exist, please create the event category with a new name.",
              duration: 5000,
            });
          } else {
            let data = res.data.find((i) => i.name === this.eventText);
            this.newEvents.push({
              name: this.eventText,
              id: data.id,
            });
            console.log(data);
            this.selectedEventCategoryId = data.id;
            this.eventText = "";
            ElMessage({
              type: "success",
              message: "Event category saved successfully",
              duration: 5000,
            });
          }
        });
        this.showCategory = false;
      }
      console.log(this.eventText, this.eventCreate);
    },
    async addCurrency(e, index, item) {
      console.log(e.target.innerHTML, index);
      this.offeringItem[index].currencyID = item.id;
      this.offeringItem[index].showCurrency = false;
      this.offeringItem[index].currencyName = item.name;
      this.selectedCurrencyName = e.target.innerHTML.split(" ")[0];

      this.offeringItem[
        index
      ].fromCurrencyRate = `usd${item.name.toLowerCase()}`;

      let toDestinationCurrencyRate = `usd${this.tenantCurrency.currency.toLowerCase()}`;
      let fromCurrencyRate = this.offeringItem[index].fromCurrencyRate;

      let amount = this.offeringItem[index].amount.toString();
      const removeCharacters = amount.replace(/[^0-9.]/g, "");
      const toNumber = parseFloat(removeCharacters);

      let amountToConvert = toNumber ? toNumber : 0;

      try {
        let result = await CurrencyConverterService.currencyConverter(
          amountToConvert,
          fromCurrencyRate,
          toDestinationCurrencyRate
        );
        console.log(result);
        this.convertedAmount2[index] = result;
      } catch (err) {
        console.log(err);
      }
    },

    setCurrencyRate(payload) {
      this.currencyRate = payload;
    },

    delAttendance(id, index) {
      if (id) {
        axios
          .delete(`/deleteAttendance?ID=${id}`)
          .then((res) => {
            if (res.data) {
              ElMessage({
                type: "success",
                message: "Attendance Successfully Deleted",
                duration: 5000,
              });
              this.attendanceItem = this.attendanceItem.filter(
                (i) => id !== i.attendanceId
              );
            } else {
              ElMessage({
                type: "warning",
                message: "Delete Failed, Please Try Again",
                duration: 5000,
              });
            }
          })
          .catch((err) => {
            finish();
            if (err.response) {
              ElMessage({
                type: "error",
                message: err.response,
                duration: 5000,
              });
            }
          });
      } else {
        this.attendanceItem.splice(index, 1);
      }
      // this.convertedAmount2.splice(index, 1)
    },
    deleteAttendance(id, index) {
      ElMessageBox.confirm(
        'Are you sure you want to proceed?',
        "Confirm delete",
        {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'error',
        }
      )
        .then(() => {
          this.delAttendance(id, index);
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: 'Delete canceled',
          })
        })
    },

    delEventCategory(id, index) {
      if (id) {
        axios
          .delete(`/api/EventCategory?ID=${id}`)
          .then((res) => {
            if (res.data === true) {
              ElMessage({
                type: 'success',
                message: 'Event Category Successfully Deleted',
                duration: 5000
              })
              this.attendanceItem = this.attendanceItem.filter(
                (i) => id !== i.attendanceId
              );
            } else if (res.data === false) {
              ElMessage({
                type: 'warning',
                message: 'This event category has been used to create event or Attendance report, delete any of the report then proceed by deleting the event category',
                duration: 5000
              })
            } else {
              ElMessage({
                type: 'warning',
                message: 'Delete Failed, Try Again',
                duration: 5000
              })
            }
          })
          .catch((err) => {
            finish();
            if (err.response) {
              console.log(err.response);
              ElMessage({
                showClose: true,
                message: `Unable to delete ${err.response}`,
                type: 'error',
                duration: 5000
              })
            }
          });
      } else {
        this.attendanceItem.splice(index, 1);
      }
      // this.convertedAmount2.splice(index, 1)
    },

    deleteSelectedEventCategory(id, index) {
      ElMessageBox.confirm(
        'Are you sure you want to proceed?',
        'Confirm delete',
        {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'error',
        }
      )
        .then(() => {
          this.delEventCategory(id, index);
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: 'Delete canceled',
            duration: 3000
          })
        })

    },

    deleteOffering(id, index) {
      if (id) {
        axios
          .delete(`/api/Financials/Contributions/Transactions/Delete?ID=${id}`)
          .then((res) => {
            if (res.data.status) {
              ElMessage({
                type: 'success',
                message: 'Offering Successfully Deleted',
                duration: 5000
              })
              this.offeringItem = this.offeringItem.filter((i) => id !== i.id);
            } else {

              ElMessage({
                type: 'info',
                message: 'Delete Failed, Please Try Again',
                duration: 5000
              })
            }
          })
          .catch((err) => {
            finish();
            if (err.response) {
              ElMessage({
                type: 'error',
                message: err.response,
                duration: 5000
              })
            }
          });
      } else {
        this.offeringItem.splice(index, 1);
      }
    },
    deleteExpense(id, index) {
      if (id) {
      axios
        .delete(`/api/Financials/Accounts/Transactions/Delete?ID=${id}`)
        .then((res) => {
          if (res.data.status) {
            ElMessage({
              type: 'success',
              message: 'Expense Successfully Deleted',
              duration: 5000
            })
            this.expenseItem.splice(index, 1);
          } else {
            ElMessage({
              type: 'info',
              message: 'Delete Failed, Please Try Again',
              duration: 5000
            })
          }
        })
        .catch((err) => {
          finish();
          if (err.response) {
            ElMessage({
              type: 'error',
              message: err.response,
              duration: 5000
            })
          }
        });
      } else {
        this.expenseItem.splice(index, 1);
      }
    },

    delOffering(id, index) {
      ElMessageBox.confirm(
        'Are you sure you want to proceed?',
        'Confirm delete',
        {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'error',
        }
      )
        .then(() => {
          this.deleteOffering(id, index);
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: 'Delete canceled',
          })
        })
    },
    delExpense(id, index) {
      ElMessageBox.confirm(
        'Are you sure you want to proceed?',
        'Confirm delete',
        {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'error',
        }
      )
        .then(() => {
          this.deleteExpense(id, index);
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: 'Delete canceled',
          })
        })
    },

    toggleForm1() {
      this.showForm1 = !this.showForm1;
    },
    toggleForm() {
      this.showForm = !this.showForm;
    },
    toggleForm2() {
      this.showForm2 = !this.showForm2;
    },
    toggleForm3() {
      this.showForm3 = !this.showForm3;
    },
    post() {
      const invalidAttendanceItem = this.attendanceItem.find((i) => !i.number);
      if (invalidAttendanceItem) {
        ElMessage({
          type: 'warning',
          message: 'Enter count for all attendance item',
          duration: 5000
        })
        return false;
      }
      const invalidOfferingItem = this.offeringItem.find((i) => !i.amount);
      if (invalidOfferingItem) {
        ElMessage({
          type: 'warning',
          message: 'Enter amount for Offering item',
          duration: 5000
        })
        return false;
      }

      this.eventObj = {
        attendances: this.attendanceItem,
        offerings: this.offeringItem.map((i) => {
          delete i.showCurrency;
          delete i.fromCurrencyRate;
          if (i.amount.toString().includes(',')) {
            i.amount = i.amount.split(',').join('')
          }
          return i;
        }),
        expensesTransactions: this.expenseItem,
        activityFirstTimers: this.firstTimers,
        activityNewConverts: this.newConverts,
      };

      // If preactivity id is empty, dont send preevent as part of the event object, else send it
      if (this.preActivityId) {
        this.eventObj.preEvent = {
          name: this.preEventName,
          topic: this.preEventTopic,
          details: this.details,
          preActivityId:
            this.preActivityId === ""
              ? "00000000-0000-0000-0000-000000000000"
              : this.preActivityId,
          isPaidFor: this.selectedValue === "Yes" ? true : false,
          amount: this.preEventAmount,
          eventRules: this.eventRules,
          enableRegistration: this.check,
          venue: this.venue,
          emailRegistration: this.emailRegistration,
          smsRegistraion: this.SMSRegistration,
          banner: this.banner,
          isPublic: this.isPublic,
        };
      } else {
        this.eventObj.activity = {
          date: this.eventDate === "" ? "01.01.0001 00:00:00" : this.getCorrectDate(this.eventDate),
          topic: this.topic,
          preacher: this.preacher,
          note: this.note,
        };

        // If you chose an event activity, send the id in the event object, else if a new activity was created send the name
        if (
          this.selectedEventCategoryId ==
          "00000000-0000-0000-0000-000000000000" ||
          this.selectedEventCategoryId == this.newEvents.length
        ) {
          this.eventObj.activity.newEventCategoryName =
            this.selectedEventCategoryName;
        } else {
          this.eventObj.activity.eventCategoryId = this.selectedEventCategoryId;
        }
      }

      let updateEvent = {
        activity: {
          date: this.getCorrectDate(this.eventDate),
          topic: this.topic,
          preacher: this.preacher,
          eventCategoryId: this.selectedEventCategoryId,
          note: this.note
        },
        activityFirstTimers: this.firstTimers,
        activityNewConverts: this.newConverts,
        attendances: this.attendanceItem,
        offerings: this.offeringItem,
        expensesTransactions: this.expenseItem,
        preEvent: this.updatePreEvent,
      };

      let currentEvent = {
        name: this.selectedEventCategoryName,
        preacher: this.preacher,
        topic: this.topic,
        newConvertsCount: this.newConverts,
      };
      this.loading = true;
      if (this.$route.params.event) {
        axios
          .put("/api/events/updateActivity", updateEvent)
          .then((res) => {
            this.loading = false;
            const activityId = this.$route.params.event;
            localStorage.setItem("eventData", JSON.stringify(updateEvent));
            localStorage.setItem(
              "eventDataResponse",
              JSON.stringify(currentEvent)
            );
            this.$store.dispatch("event/setEventItems").then(() => {
              this.$router.push({
                name: "Report",
                params: { id: activityId },
                query: { edit: true },
              });
            });
            // this.$router.push({
            //   name: "Report",
            //   params: { id: activityId },
            //   query: { edit: true },
            // });
            console.log(res.data, currentEvent);
          })
          .catch((err) => {
            NProgress.done();
            this.loading = false;
            if (err.response) {
              const { data, status } = err.response;
              if (status === 400)
                this.errorMessage =
                  typeof data !== "string"
                    ? "Failed! ensure you provide activity name and date"
                    : data.length < 100
                      ? data
                      : "An error occurred, please check the fields and try again";
            }
            console.log(err);
          });
      } else {
        axios
          .post("api/Events/CreateActivity", this.eventObj)
          .then((res) => {
            this.loading = false;
            const activityId = res.data.currentEvent.id;
            localStorage.setItem("eventData", JSON.stringify(this.eventObj));
            localStorage.setItem(
              "eventDataResponse",
              JSON.stringify(res.data.currentEvent)
            );
            this.$store.dispatch("event/setEventItems").then(() => {
              this.$router.push({ name: "Report", params: { id: activityId } });
            });
            // this.$router.push({ name: "Report", params: { id: activityId } });
          })
          .catch((err) => {
            NProgress.done();
            this.loading = false;
            if (err.response) {
              const { data, status } = err.response;
              if (status === 400)
                this.errorMessage =
                  typeof data !== "string"
                    ? "Failed! ensure you provide activity name and date"
                    : data.length < 100
                      ? data
                      : "An error occurred, please check the fields and try again";
            }
          });
      }
    },
    getEventCategories() {
      axios.get("/api/EventCategory").then((res) => {
        this.newEvents = res.data.map((i) => {
          return { id: i.id, name: i.name };
        });
      });
    },
    getLookUps() {
      axios.get("/api/LookUp/GetAllLookUps").then((res) => {
        res.data.find((i) => {
          if (i.type.toLowerCase() === "gender") {
            this.gender = i.lookUps;
          }
          if (i.type.toLowerCase() === "marital status") {
            this.maritalStatusArr = i.lookUps;
          }
        });
      });
    },

    changeSelectedEventCategory(action) {
      if (action === "edit") {
        // do something
        // this.selectedEventCategoryId = "";
        this.showEditEventCategory = true;
        this.categoryNametoEdit = this.selectedEventCategoryName;
      }
      if (action === "change") {
        this.selectedEventCategoryId = false;
        this.showEditEventCategory = false;
      }
    },
    updateEventCategory() {
      const updatePayload = {
        eventID: this.selectedEventCategoryId,
        eventName: this.categoryNametoEdit,
      };
      axios
        .put(`/api/EventCategory`, updatePayload)
        .then((res) => {
          this.newEvents[this.selectedCategoryIndex].name =
            res.data[this.selectedCategoryIndex].name;
          // this.selectedEventCategoryName = res.data[this.selectedCategoryIndex].name
          // this.selectedEventCategoryId = res.data[this.selectedCategoryIndex].id
          this.showEditEventCategory = false;
          ElMessage({
            type: 'success',
            message: 'Updated successfully',
            duration: 5000
          })
        })
        .catch((err) => {
          console.log(err);
        });
    },

    setIncomeAccount(index) {
      this.remitance[index].account = this.incomeAccount.find((i) => {
        return i.id === this.itemAccountID
      })
    },

    dropDownMonth() {
      switch (this.valueMonth) {
        case "January":
          this.firstTimersObj.birthMonth = "1";
          break;
        case "February":
          this.firstTimersObj.birthMonth = "2";
          break;
        case "March":
          this.firstTimersObj.birthMonth = "3";
          break;
        case "April":
          this.firstTimersObj.birthMonth = "4";
          break;
        case "May":
          this.firstTimersObj.birthMonth = "5";
          break;
        case "June":
          this.firstTimersObj.birthMonth = "6";
          break;
        case "July":
          this.firstTimersObj.birthMonth = "7";
          break;
        case "August":
          this.firstTimersObj.birthMonth = "8";
          break;
        case "September":
          this.firstTimersObj.birthMonth = "9";
          break;
        case "October":
          this.firstTimersObj.birthMonth = "10";
          break;
        case "November":
          this.firstTimersObj.birthMonth = "11";
          break;
        case "December":
          this.firstTimersObj.birthMonth = "12";
          break;
        default:
          // firstTimersObj.value.birthMonth = "12";
          console.log("No month chosen");
          break;
      }
    },
    dropDownMarital() {
      this.firstTimersObj.maritalStatusId = this.maritalStatusArr.find((i) => {
        return i.id === this.valueMarital;
      }).id;
    },
    dropDownGender() {
      this.firstTimersObj.genderId = this.gender.find(
        (i) => i.id === this.valueGender
      ).id;
    },
    dropDownHeard() {
      this.firstTimersObj.howDidYouAboutUsId = this.howDidYouAboutUsId.find(
        (i) => i.name === this.valueHeard
      ).id;
    },
    dropDownComm() {
      this.firstTimersObj.communicationMeans = this.comMeansArr.indexOf(
        this.valueComm
      );
    },
    dropDownInterest() {
      this.firstTimersObj.interestedInJoining = this.joinInterest.indexOf(
        this.valueInterest
      );
    },
    dropDownVisit() {
      this.firstTimersObj.wantToBeVisited = this.wantVisitArr.indexOf(this.valueVisit);
    },
    deleteFirstTimer(index) {
      this.firstTimers.splice(index, 1);
    },

    dropDownMonthNewConvert() {
      switch (this.valueMonth) {
        case "January":
          this.firstTimersObj.birthMonth = "1";
          break;
        case "February":
          this.firstTimersObj.birthMonth = "2";
          break;
        case "March":
          this.firstTimersObj.birthMonth = "3";
          break;
        case "April":
          this.firstTimersObj.birthMonth = "4";
          break;
        case "May":
          this.firstTimersObj.birthMonth = "5";
          break;
        case "June":
          this.firstTimersObj.birthMonth = "6";
          break;
        case "July":
          this.firstTimersObj.birthMonth = "7";
          break;
        case "August":
          this.firstTimersObj.birthMonth = "8";
          break;
        case "September":
          this.firstTimersObj.birthMonth = "9";
          break;
        case "October":
          this.firstTimersObj.birthMonth = "10";
          break;
        case "November":
          this.firstTimersObj.birthMonth = "11";
          break;
        case "December":
          this.firstTimersObj.birthMonth = "12";
          break;
        default:
          // firstTimersObj.value.birthMonth = "12";
          console.log("No month chosen");
          break;
      }
    },
    dropDownMaritalNewConvert() {
      this.newConvertsObj.maritalStatusId = this.maritalStatusArr.find(
        (i) => i.id === this.firstTimersObj.valueMarital
      ).id;
    },
    dropDownGenderNewConvert() {
      this.newConvertsObj.genderId = this.gender.find(
        (i) => i.id === this.valueGender
      ).id;
    },
    dropDownHeardNewConvert() {
      this.newConvertsObj.howDidYouAboutUsId = this.howDidYouAboutUsId.find(
        (i) => i.name === this.valueHeard
      ).id;
    },
    dropDownCommNewConvert() {
      this.newConvertsObj.communicationMeans = this.comMeansArr.indexOf(
        this.valueComm
      );
    },
    dropDownInterestNewConvert() {
      this.newConvertsObj.interestedInJoining = this.joinInterest.indexOf(
        this.valueInterest
      );
    },
    dropDownVisitNewConvert() {
      this.newConvertsObj.wantToBeVisited = this.wantVisitArr.indexOf(this.valueVisit);
    },
    deleteNewConvert(index) {
      this.newConverts.splice(index, 1);
    },

    select2Value(data) {
      if (data.dataType === "automatedFollowUp") {
        this.firstTimersObj.autoMatedFollowUp = data.value;
      }
    },
    individualEvent(eventObj, index) {
      if (eventObj.id) {
        this.selectedEventCategoryName = eventObj.name;
        this.selectedEventCategoryId = eventObj.id
      } else {
        let arrLengthId = `${this.newEvents.length + 1}`;
        this.newEvents.push({
          name: this.eventText,
          id: arrLengthId,
        });
        this.selectedEventCategoryName = this.event;
        this.selectedEventCategoryId = arrLengthId;
      }
      this.eventText = "";
      this.showCategory = false;
      this.selectedCategoryIndex = index;
    },
    getPreActivityId() {
      if (this.check == false) {
        axios
          .post("/api/Events/EventPreRegistration", {
            eventCategoryName: this.preEventName,
            eventRegistrationLink: "",
          })
          .then((res) => {
            this.preActivityId = res.data.activityId;
            this.eventRegistrationLink = res.data.eventRegistrationLink;
          })
          .catch((err) => {
            NProgress.done();
            console.log(err.response);
          });
      }
    },
    getHowDidYouAboutUsId() {
      axios.get("/api/membership/howyouheardaboutus").then((res) => {
        this.howDidYouAboutUsId = res.data.map((i) => {
          return { name: i.name, id: i.id };
        });
      });
    },
    async getEventById() {
      if (this.$route.params.event) {
        try {
          let res = await axios.get(`/api/Events/${this.$route.params.event}`);
          this.routeParams = this.$route.params.event;
          this.eventDate = res.data.activity.date.substr(0, 10);
          this.topic = res.data.activity.topic;
          this.preacher = res.data.activity.preacher;
          this.selectedEventCategoryId = res.data.activity.eventCategoryId;
          this.attendanceItem = res.data.attendances;
          this.offeringItem = res.data.offerings.map((i) => {
            i.fromCurrencyRate = i.currency.name
            i.currencyName = i.currency.shortCode
            i.donor = i.personName
            return i
          });
          this.firstTimers = res.data.activityFirstTimers;
          if (this.firstTimers.length > 0) this.showForm3 = true;
          this.newConverts = res.data.activityNewConverts;
          if (this.newConverts.length > 0) this.showForm3 = true;
          this.updatePreEvent = res.data.preEvent;
          if (this.currencyList.length > 0) {
          }
          for (let index = 0; index < this.offeringItem.length; index++) {
            const i = this.offeringItem[index];

            let amount = i.amount.toString();
            const removeCharacters = amount.replace(/[^0-9.]/g, "");
            const toNumber = parseFloat(removeCharacters);

            let toDestinationCurrencyRate = `usd${this.tenantCurrency.currency.toLowerCase()}`;
            let fromCurrencyRate = i.fromCurrencyRate;
            let amountToConvert = toNumber ? +toNumber : 0;
            try {
              let result = await CurrencyConverterService.currencyConverter(
                amountToConvert,
                fromCurrencyRate,
                toDestinationCurrencyRate
              );
              this.convertedAmount2.push(result);
            } catch (err) {
              console.log(err);
            }
          }

          this.expenseItem = res.data.expensesTransactions
          // .map(i => {
          //   return {
          //     debitSplitAccounts: [
          //       {
          //         accountID: i.debitSplitAccounts.accoundID,
          //         contactID: i.debitSplitAccounts.contactID
          //       }
          //     ],
          //     date: i.date,
          //     memo: i.memo,
          //     transactionNumber: i.transactionNumber,
          //     category: i.category,
          //     amount: i.amount
          //   }
          // }
          // })
          this.note = res.data.activity.note
      } catch (err) {
        console.log(err);
      }
    }
  },
  convertCurrencyForExistingEvent() {
    console.log(this.offeringItem);
  },
  getCurrenciesFromCountries() {
    let url = "/api/getallcountries";
    axios
      .get(url)
      .then((res) => {
        this.currencyList = res.data.map((i) => {
          // return `${i.currency} ${i.name}`
          return {
            name: i.currency,
            id: i.currencyId,
            country: i.name,
          };
        });
      })
      .catch((err) => console.log(err));
  },
  toggleCode() {
    this.showCode = !this.showCode;
  },
  getCurrency(e) {
    console.log(e.target.innerHTML);
    this.showCode = false;
  },
  updateOfferingId(e) {
    let index = this.offeringItem.findIndex(
      (i) => i.financialContributionID === e.target.value
    );
    console.log(e.target.value, index, "target", e.target.textContent);
    let offText = this.newOfferings.find((i) => i.id === e.target.value).name;
    console.log(offText);
    this.offeringItem[index].name = offText;
  },
  updateAttendanceId(e) {
    let index = this.attendanceItem.findIndex(
      (i) => i.attendanceTypeID === e.target.value
    );
    let attText = this.newAttendances.find(
      (i) => i.attendanceTypeID === e.target.value
    ).name;

    this.attendanceItem[index].attendanceTypeName = attText;
  },
  setAddToDonor(index) {
    this.offeringToAddDonor = index;
  },
  addDonor() {
    let donorName = this.userSearchString;
    this.offeringItem[this.offeringToAddDonor].donor = donorName;
    this.donorBoolean = true;
    this.userSearchString = "";
  },
  searchForUsers() {
    if (this.userSearchString.length >= 3) {
      this.startSearch(this.userSearchString);
    }
  },

  async startSearch(str) {
    try {
      this.searchingForMembers = true;
      const response = await membershipService.searchMembers(str);
      this.searchingForMembers = false;
      this.searchedMembers = response;
    } catch (error) {
      this.searchingForMembers = false;
      console.log(error);
    }
  },
  addExistingMember(member) {
    this.userSearchString = member.name;
    this.offeringItem[this.offeringToAddDonor].personID = member.id;
  },
  getPersonId(payload) {
    this.offeringItem[this.offeringToAddDonor].donor =
      payload.personFirstName;
    this.offeringItem[this.offeringToAddDonor].personID = payload.personId;
  },
  async getCurrentlySignedInUser() {
    try {
      const res = await axios.get("/api/Membership/GetCurrentSignedInUser");
      this.tenantId = res.data.tenantId;
      // if(res.data.country == "Nigeria") {
      //     isPaystackChecked.value = true
      //     isFlutterwave.value = true
      //     isPaypal.value = true
      // } else {
      //     isPaypal.value = true
      //     isFlutterwave.value = true
      // }
      // let store = useStore()
      // if (store.getters.currentUser) {
      //   axios.get(`/api/Lookup/TenantCurrency?tenantID=${store.getters.currentUser.tenantId}`)
      //   .then(res => {
      //     this.tenantCurrency = res.data.currency
      //     console.log(res.data)
      //   })
      //   .catch(err => console.log(err))
      //   console.log(store.getters.currentUser)
      // } else {
      axios
        .get(`/api/Lookup/TenantCurrency?tenantID=${res.data.tenantId}`)
        .then((res) => {
          this.tenantCurrency = res.data;
          this.getEventById();
          this.convertCurrencyForExistingEvent();
          console.log(this.tenantCurrency);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      /*eslint no-undef: "warn"*/
      NProgress.done();
      console.log(err);
    }
  },
  async sendAmount(e, index) {
    let amount = this.offeringItem[index].amount.toString();
    let removeCharacters = amount.replace(/[^0-9.]/g, "");
    let toNumber = parseFloat(removeCharacters);

    this.currencyAmount = e;
    this.currencyIndex = index;

    let toDestinationCurrencyRate = `usd${this.tenantCurrency.currency.toLowerCase()}`;
    let fromCurrencyRate = this.offeringItem[index].fromCurrencyRate;

    let amountToConvert = toNumber ? toNumber : 0;

    console.log(amountToConvert, fromCurrencyRate, toDestinationCurrencyRate);

    try {
      let result = await CurrencyConverterService.currencyConverter(
        amountToConvert,
        fromCurrencyRate,
        toDestinationCurrencyRate
      );
      console.log(result);
      // if (!isNaN(result)) {
      this.convertedAmount2[index] = result;
      console.log(1)
      // } else {
      //   // this.convertedAmount2[index] = amount
      //   console.log(2, amount)
      // }
    } catch (err) {
      console.log(err);
    }
  },
  convertResult(payload) {
    this.convertedResult = payload;
  },
  toggleRem() {
    this.applyRem = !this.applyRem;
  },
  addRemittance() {
    this.remitance.push({});
  },
  deleteItem(index) {
    this.remitance.splice(index, 1);
  },
  getIncomeAccount() {
    axios
      .get("/api/Financials/Accounts/GetIncomeAccounts")
      .then((res) => {
        /*eslint no-undef: "warn"*/
        NProgress.done();
        this.incomeAccount = res.data;
        if (res.data.length < 1) {
          this.displayResponsive = true;
        }
      })
      .catch((err) => {
        NProgress.done();
        console.log(err);
      });
  },
  getCashBankAccount() {
    axios
      .get("/api/financials/accounts/getcashbankaccounts")
      .then((res) => {
        this.cashBankAccount = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  closeResponsive() {
    this.displayResponsive = false;
    this.$router.push({ name: "ChartOfAccount" });
  },
  createNewCon(e) {
    let contributionCategory = {
      name: this.contributionItemName,
      incomeAccountId: this.selectedIncomeAccount,
      cashAccountId: this.selectedCashAccount
    };
    if (this.remitance[0].account || this.remitance[0].percentage) {
      contributionCategory.incomeRemittance = this.remitance.map((i) => {
        return {
          financialFundID: i.account.financialFundID,
          distinationIncomeAccount: i.account.id,
          percentage: i.percentage,
        };
      });
    } else {
      contributionCategory.incomeRemittance = null;
    }
    axios
      .post("/api/financials/contributions/items/save", contributionCategory)
      .then((res) => {
        this.newOfferings.push({
          name: this.contributionItemName,
          id: res.data.id,
        });
        ElMessage({
          type: 'success',
          message: 'Contribution Saved',
          duration: 5000
        })
        console.log(res);

        this.offeringItem.push({
          name: res.data.name,
          financialContributionID: res.data.id,
          paymentChannel: "Cash",
          currencyID: this.tenantCurrency.currencyId,
          donor: "",
        });
      })
      .catch((err) => {
        ElMessage({
          type: 'error',
          message: 'Not Successful',
          duration: 5000
        })
        console.log(err);
      });
    e.target.setAttribute("data-dismiss", "modal");
  },
  async checkForDuplicatePhone() {
    try {
      let { data } = await axios.get(
        `api/People/checkDuplicate?email=${this.firstTimersObj.email}&phoneNumber=${this.firstTimersObj.phoneNumber}`
      );
      if (this.isPhoneValid !== "") {
        if (data === "phone number") {
          this.isPhoneValid = false;
        } else if (data === "email and phone number") {
          this.isPhoneValid = false;
          this.isEmailValid = false;
        } else {
          this.isPhoneValid = true;
          this.$refs.validatePhone.classList.add("is-valid");
        }
      } else {
        this.$refs.validatePhone.classList.remove("is-valid");
        this.$refs.validatePhone.classList.remove("is-invalid");
      }
    } catch (error) {
      console.log(error);
    }
  },
  async checkForDuplicateEmail() {
    try {
      let { data } = await axios.get(
        `api/People/checkDuplicate?email=${this.firstTimersObj.email}&phoneNumber=${this.firstTimersObj.phoneNumber}`
      );
      if (this.isEmailValid !== "") {
        if (data === "email") {
          this.isEmailValid = false;
        } else if (data === "email and phone number") {
          this.isEmailValid = false;
          this.isPhoneValid = false;
        } else {
          this.isEmailValid = true;
          this.$refs.validateEmail.classList.add("is-valid");
        }
      } else {
        this.$refs.validateEmail.classList.remove("is-valid");
        this.$refs.validateEmail.classList.remove("is-invalid");
      }
    } catch (error) {
      console.log(error);
    }
  },
  async checkForDuplicatePhoneNewConvert() {
    try {
      let { data } = await axios.get(
        `api/People/checkDuplicate?email=${this.newConvertsObj.email}&phoneNumber=${this.newConvertsObj.phoneNumber}`
      );
      if (this.isPhoneValidNewConvert !== "") {
        if (data === "phone number") {
          this.isPhoneValidNewConvert = false;
        } else if (data === "email and phone number") {
          this.isPhoneValidNewConvert = false;
          this.isEmailValidNewConvert = false;
        } else {
          this.isPhoneValidNewConvert = true;
          this.$refs.validatePhoneNewConvert.classList.add("is-valid");
        }
      } else {
        this.$refs.validatePhoneNewConvert.classList.remove("is-valid");
        this.$refs.validatePhoneNewConvert.classList.remove("is-invalid");
      }
    } catch (error) {
      console.log(error);
    }
  },
  async checkForDuplicateEmailNewConvert() {
    try {
      let { data } = await axios.get(
        `api/People/checkDuplicate?email=${this.newConvertsObj.email}&phoneNumber=${this.newConvertsObj.phoneNumber}`
      );
      if (this.isEmailValidNewConvert !== "") {
        if (data === "email") {
          this.isEmailValidNewConvert = false;
        } else if (data === "email and phone number") {
          this.isEmailValidNewConvert = false;
          this.isPhoneValidNewConvert = false;
        } else {
          this.isEmailValidNewConvert = true;
          this.$refs.validateEmailNewConvert.classList.add("is-valid");
        }
      } else {
        this.$refs.validateEmailNewConvert.classList.remove("is-valid");
        this.$refs.validateEmailNewConvert.classList.remove("is-invalid");
      }
    } catch (error) {
      console.log(error);
    }
  },
  async getRates() {
    try {
      let { data } = await axios.get("/fxRates");
      this.$store.dispatch("getRates", data);
    } catch (error) {
      console.log(error);
    }
  },
  setContact(payload) {
    if (!payload.email) {
      ElMessage({
        type: 'warning',
        message: 'This contact does not have any email, communicate with this person to create him as a user',
        duration: 5000
      })
    }
    this.firstTimersObj.contactOwnerId = payload.id;
  },
  setContactNewConvert(payload) {
    if (!payload.email) {
      ElMessage({
        type: 'warning',
        message: 'This contact does not have any email, communicate with this person to create him as a user',
        duration: 5000
      })
    }
    this.firstTimersObj.contactOwnerId = payload.id;
  },
  showAddMemberForm() {
    this.display = true;
  },
  offeringItemsSum() {
    let sum = 0
    if (this.offeringItem.length > 0) {
      this.offeringItem.filter(i => i.amount).forEach(element => {
        sum += +element.amount
      });
      return sum
    } else {
      return 0
    }
  }
},
  async created() {
  if (store.getters["lookups/maritalStatus"].length > 0) {
    this.maritalStatusArr = store.getters["lookups/maritalStatus"];
  } else {
    await axios
      .get("/api/LookUp/GetAllLookUps")
      .then((res) => {
        this.maritalStatusArr = res.data.find((i) => {
          return i.type.toLowerCase() === "maritalstatus";
        }).lookUps;
      })
      .catch((err) => console.log(err.response));
  }

  axios.get("/api/Financials/Contributions/Items").then((res) => {
    this.newOfferings = res.data.map((i) => {
      return { id: i.id, name: i.name };
    });
  });
  axios.get("/GetAttendanceType").then((res) => {
    this.newAttendances = res.data.map((i) => {
      return { attendanceTypeID: i.id, name: i.name };
    });
  });
  axios.get("/api/Financials/Accounts/GetExpenseAccounts").then((res) => {
    this.expenseList = res.data
  });
  axios.get("/api/Financials/Accounts/GetCashBankAccounts").then((res) => {
    this.cashAccounts = res.data
  });

  this.currentDate();
  this.getCurrentlySignedInUser();
  this.getEventCategories();
  this.getLookUps();
  this.getHowDidYouAboutUsId();

  this.getCurrenciesFromCountries();
  this.getIncomeAccount();
  this.getCashBankAccount();
  this.getRates();
},
computed: {
  filterAttendance() {
    if (this.attendanceText !== "" && this.newAttendances.length > 0) {
      return this.newAttendances.filter((i) => {
        return i.name
          .toLowerCase()
          .includes(this.attendanceText.toLowerCase());
      });
    } else {
      return this.newAttendances;
    }
  },
  birthYearsArr() {
    const arrOfYears = [];
    let currentYear = new Date().getFullYear();
    while (arrOfYears.length <= 100) {
      arrOfYears.push(currentYear);
      currentYear = currentYear - 1;
    }
    return arrOfYears;
  },
  filterOffering() {
    if (this.offeringText !== "" && this.newOfferings.length > 0) {
      return this.newOfferings.filter((i) => {
        return i.name.toLowerCase().includes(this.offeringText.toLowerCase());
      });
    } else {
      return this.newOfferings;
    }
  },
  filterExpense() {
    if (this.expenseText !== "" && this.expenseList.length > 0) {
      return this.expenseList.filter((i) => {
        return i.text.toLowerCase().includes(this.expenseText.toLowerCase());
      });
    } else {
      return this.expenseList;
    }
  },
  filterEventCategory() {
    // let x;
    let arr = [];
    if (this.newEvents.length > 0) {
      arr = this.newEvents.filter((i) => {
        return i.name.toLowerCase().includes(this.eventText.toLowerCase());
      });
    } else {
      return this.newEvents;
    }
    return arr;
  },
  addContributionTotal() {
    if (this.convertedAmount2.length <= 0) return 0;
    return this.convertedAmount2.reduce((a, b) => {
      return +a + +b;
    });
  },
  addAttendanceTotal() {
    if (this.attendanceItem.length <= 0) return 0;
    if (this.attendanceItem.length === 1)
      return this.attendanceItem[0].number;
    const number = this.attendanceItem.map((i) => +i.number);
    return number.reduce((a, b) => {
      return (a || 0) + (b || 0);
    });
  },
  selectedEventCategoryName() {
    if (!this.selectedEventCategoryId) return "";
    if (!this.newEvents.find((i) => i.id === this.selectedEventCategoryId))
      return "";
    return this.newEvents.find((i) => i.id === this.selectedEventCategoryId)
      .name;
  },
  eventCategoriesArr() {
    const arr = this.newEvents.map((i) => i.name);
    return arr;
  },
  genders() {
    return this.gender.map((i) => {
      return i.value;
    });
  },
  maritalStatuses() {
    return this.maritalStatusArr.map((i) => {
      return i.value;
    });
  },
  howYouHeard() {
    return this.howDidYouAboutUsId.map((i) => {
      return i.name;
    });
  },
  filterCurrency() {
    if (this.currencyText !== "" && this.currencyList.length > 0) {
      return this.currencyList.filter((i) => {
        if (i.name)
          return (
            i.name.toLowerCase().includes(this.currencyText.toLowerCase()) ||
            i.country.toLowerCase().includes(this.currencyText.toLowerCase())
          );
      });
    } else {
      return this.currencyList;
    }
  },
  fromCurrencyRate() {
    if (this.selectedCurrencyName)
      return `usd${props.selectedCurrency.toLowerCase()}`;
    return `usd${props.tenantCurrency ? props.tenantCurrency.toLowerCase() : ""
      }`;
  }
},
};
</script>

<style scoped>
.event {
  font-family: "Nunito sans";
  /* margin-top: 20px; */
}

.scroll {
  max-height: 200px;
  overflow-y: scroll;
  overflow-x: hidden;
}

.events {
  font: normal normal 800 28px Nunito sans;
}

.btn-preview {
  border: 1px solid #797e81;
  border-radius: 22px;
  margin-left: 46px;
}

.btn-save {
  background: #136acd 0% 0% no-repeat padding-box;
  margin-left: 26px;
  text-align: center;
}

.nested-row {
  font-size: 0.9em;
}

.nested-row label {
  color: #02172e;
  margin-top: 10px;
  width: 100%;
}

.nested-row input {
  margin: 5px;
  padding: 5px;
  width: 100%;
  border: 1px solid #b2c2cd;
  border-radius: 5px;
}

.event-category {
  display: inline-block;
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 1px solid #dde2e6;
  border-radius: 5px;
  font: normal normal bold 16px Nunito Sans;
  letter-spacing: 0px;
  /* color: #136ACD; */
  width: 100%;
  height: 100%;
  text-align: center;
  text-align-last: center;
}

.dropdown-container select {
  /* for Firefox */
  -moz-appearance: none;
  /* for Safari, Chrome, Opera */
  -webkit-appearance: none;
}

/* for IE10 */
.dropdown-container select::-ms-expand {
  display: none;
}

.new-category {
  text-align: center;
  padding: 30px;
  color: #136acd;
  font: normal normal bold 16px Nunito Sans;
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

.attendance-header {
  background-color: #ecf0f3;
  padding: 0 50px;
  border: none;
  border-bottom: 1px solid rgb(204, 204, 204);
}

.attendance-body {
  padding: 0 50px;
  background-color: #ecf0f3;
}

.attendance-body.stretch {
  height: 85px;
}

.attendance-type,
.count {
  background-color: rgb(255, 255, 255);
  width: 80%;
  border-radius: 5px;
  padding: 5px;
}

.attendance-header div,
.attendance-body div {
  padding: 5px;
}

.attendance-header div {
  color: #002044;
  font-weight: 700;
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
  align-self: center;
}

.edit {
  font: normal normal bold 13px Nunito Sans;
  letter-spacing: 0px;
  color: #136acd;
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
}

.offering-drop div {
  padding: 3px;
}

.offering-drop div:hover {
  padding: 3px;
  background: #ecf0f3;
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

.textarea {
  border: none;
  border-top: 1px solid rgb(231, 231, 231);
}

.modal-title {
  font: normal normal 800 23px/31px Nunito Sans;
  letter-spacing: 0px;
  color: #002044;
}

.modal-fade {
  background: #002044;
}

.modal-body {
  margin: 10px;
}

.modal-content {
  border: none;
  border-radius: 7px;
}

.btn-second {
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 1px solid #00204494;
  border-radius: 111px;
  height: 41px;
}

.btn-primary {
  background: #136acd 0% 0% no-repeat padding-box;
  border-radius: 111px;
}

.currency {
  margin-top: 6px;
  width: 123%;
  /* height: 100%; */
  font-size: 0.8em;
  background: rgba(207, 207, 207, 0.651);
  border: none;
  outline: none;
  /* margin-top: -4px; */
}

/* .p-dropdown .p-dropdown-label.p-placeholder {
  padding: 0;
} */

.drop-box {
  border: 2px dotted rgb(211, 211, 211);
  display: inline-block;
  padding: 15%;
  font-size: 0.9em;
}

.textarea-adjust {
  margin: 7px 10px 0px 7px;
}

.form-header {
  font: normal normal bold 18px/24px Nunito Sans;
  letter-spacing: 0px;
  color: #02172e;
  padding: 15px 30px;
  background: #ebeff4;
  border: 1px solid #00204430;
}

.make-public {
  font: normal normal bold 16px/22px Nunito Sans;
  color: #02172e;
}

.public {
  font: normal normal 600 14px/16px Nunito Sans;
  color: #136acd;
}

.push-down {
  margin-top: 5em;
}

.event-reg {
  font: normal normal bold 16px/22px Nunito Sans;
  /* color: #136ACD; */
}

.event-reg-dark {
  font: normal normal bold 16px/22px Nunito Sans;
  /* color: #02172E; */
}

.enable-reg {
  font: normal normal 600 16px/22px Nunito Sans;
  color: #02172e;
  margin-top: 3em;
}

.paid {
  margin-top: 2em;
  font: normal normal normal 16px/22px Nunito Sans;
  letter-spacing: 0px;
  color: #02172e;
}

.create {
  text-align: center;
  font: normal normal bold 16px/22px Nunito Sans;
  letter-spacing: 0px;
  color: #136acd;
}

.total {
  padding: 15px;
  width: 100%;
}

.header1 {
  margin-bottom: 20px;
  color: #136acd;
  font-size: 24px;
}

.attendance1 {
  width: 80%;
  margin: auto;
  padding: 20px;
  justify-content: space-between;
}

.attendance2 {
  display: inline-block;
  font-size: 15px;
}

.attendance3 {
  /* display: inline-block; */
  float: right;
  font-size: 15px;
}

.header2 {
  color: #02172e;
  font-size: 24px;
}

.header5 {
  margin-top: 0;
  color: rgb(77, 73, 73);
  font-size: 15px;
}

.header3 {
  color: #02172e;
  font-size: 42px;
}

.head5 {
  color: rgb(77, 73, 73);
}

hr {
  border-color: 0.01px rgba(158, 157, 157, 0.842);
}

div .maintext {
  font-size: 18px;
}

/* *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
} */
.table {
  padding: 20px 10px 0 10px;
}

.table {
  width: 100%;
  /* box-shadow: 0px 1px 4px #02172E45; */
  box-shadow: none;
  /* border: 1px solid #DDE2E6; */
  border: none;
  /* border-radius: 30px; */
  border-radius: 0;
  /* margin: 0 */
  margin: 24px 0 0 0;
}

.box-table {
  box-shadow: 0px 1px 4px #02172e45;
  /* border-radius: 30px; */
  margin-top: 30px;
  width: 100%;
}

/* @media (min-width: 500px) and (max-width: 600px) {
    .box-table {
        width: 58%
    }
} */
.table-header,
.table-body {
  padding: 10px;
  font-size: 15px;
}

.t-header {
  background-color: #f1f3f9;
}

#img {
  max-width: 30px;
}

tr.event-list th {
  color: #8898aa;
  /* font-size: 11px; */
  font-family: "Nunito Sans" Arial, sans-serif;
  letter-spacing: 1px;
  padding: 10px;
}

tr.event-list td {
  color: #02172e;
  /* padding: 5px; */
  vertical-align: middle;
}

.page-link {
  color: #136acd;
}

.page-link:hover {
  background-color: #136acd;
  color: #fff;
}

.page-link.active:hover {
  background-color: #136acd;
  color: #fff;
}

.add-first-timer {
  background: #ebeff4;
  padding: 10px;
  border-radius: 35px;
  font: normal normal bold 14px/19px Nunito Sans;
  letter-spacing: 0px;
  color: #136acd;
  text-align: center;
}

.add-new-convert {
  background: #ebeff4;
  padding: 10px;
  border-radius: 35px;
  font: normal normal bold 14px/19px Nunito Sans;
  letter-spacing: 0px;
  color: #136acd;
  text-align: center;
}

.close-slide1 {
  height: 0;
  overflow: hidden;
  transition: all 0.5s ease-in-out;
}

.slide-down1 {
  height: 365px;
  overflow: visible;
  transition: all 0.5s ease-in-out;
}

.roll1 {
  transition: all 0.5s ease-in-out;
  transform: rotate(180deg);
}

.close-slide {
  height: 0;
  overflow: hidden;
  transition: all 0.5s ease-in-out;
}

.slide-down {
  height: 195px;
  transition: all 0.5s ease-in-out;
}

.roll {
  transition: all 0.5s ease-in-out;
  transform: rotate(180deg);
}

.close-slide2 {
  padding: 0;
  height: 0;
  overflow: hidden;
  transition: all 0.5s ease-in-out;
}

.slide-down2 {
  height: 412px;
  transition: all 0.5s ease-in-out;
  /* padding: 30px */
}

.roll2 {
  transition: all 0.5s ease-in-out;
  transform: rotate(180deg);
}

.close-slide3 {
  padding: 0;
  height: 0;
  overflow: hidden;
  transition: all 0.5s ease-in-out;
}

.slide-down3 {
  height: auto;
  padding: 30px;
  transition: all 0.5s ease-in-out;
}

.roll3 {
  transition: all 0.5s ease-in-out;
  transform: rotate(180deg);
}

.selected-category h4 {
  font-weight: 700;
  font-size: 22px;
}

.event-buttons {
  display: flex;
  justify-content: flex-start;
}

.event-buttons a {
  color: #136acd;
  font-weight: 600;
  margin: 0 24px 0 0;
}

.event-buttons a:hover,
.pointer {
  cursor: pointer;
}

.select-elem-con {
  /* padding: 47px 0; */
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ebeff4;
  border-radius: 8px;
  font-size: 1.2em;
  font-weight: 600;
  background-color: #ECF0F3;
}

.select-elem-con:hover {
  background: rgba(166, 200, 232, 0.302);
  transition: all 0.4s ease-in-out;
}

.edit-category {
  border: 1px solid #ebeff4;
  border-radius: 8px;
  text-align: center;
}

.edit-form {
  margin: 10px 0 50px 0;
}

.edit-input {
  margin-bottom: 20px;
}

.edit-input input {
  border: 1px solid #ebeff4;
  border-radius: 8px;
  width: 95%;
  height: 40px;
  box-sizing: border-box;
}

.edit-form button {
  border-radius: 22px;
  background: #ebeff4;
  outline: transparent;
  padding: 4px;
  width: 80px;
  border: none;
}

.select-calendar-icon {
  position: absolute;
  left: 48px;
  top: 59px;
  z-index: 9;
}

.style-category {
  padding: 10px;
  box-shadow: 0px 3px 15px #797e8159;
  position: absolute;
  /* top: 10px; */
  background: white;
  z-index: 1;
  width: 90%;
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

.offering-drop {
  max-height: 300px;
  overflow: auto;
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

.modal-header,
.modal-footer {
  border: none;
}

.flagCode {
  width: 160px;
  max-height: 15em;
  overflow-y: scroll;
  overflow-x: hidden;
  box-shadow: -3px 3px 15px #797e8159;
  position: absolute;
  /* top: 49.5%; */
  background: white;
  z-index: 10;
  display: block;
  margin-top: -4px;
}

.flagCode div {
  width: 35em;
}

.flagCode div:hover {
  background: rgb(238, 238, 238);
}

.hide-code {
  display: none;
  height: 0;
  overflow: hidden;
  /* transition: all 0.4s ease-in-out */
}

input.codeInput {
  width: 80%;
  margin-left: 12px;
  margin-top: 5px;
}

.style-account {
  box-shadow: 0px 3px 15px #797e8159;
  position: absolute;
  background: white;
  z-index: 1;
  width: 284%;
  max-height: 14em;
  overflow-y: scroll;
}

.style-account div div:hover {
  background-color: #ecf0f3;
  cursor: pointer;
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
}

.btnIcons {

  background-color: #dde2e6;
  border: none;
}

.add-person-btn {
  background: #136acd;
  color: #fff;
}

.adjust-down {
  align-self: flex-end;
}

.converted-amount {
  margin-left: -16%;
}

.table-title {
  background: white;
  text-align: center;
  font-size: 25px;
  font-weight: 700;
  margin-bottom: 10px;
  border-radius: 25px;
}

.dropdown-menu {
  max-height: 400px;
  overflow: scroll;
}

@media (min-width: 576px) {
  .offset-sm-1 {
    margin-left: 4.333333%;
  }
}

@media (max-width: 575px) {

  .btn-preview,
  .btn-save {
    margin-top: 2em;
  }

  .nested-row label {
    text-align: left;
  }

  .nested-row {
    margin-top: 2em;
  }

  .push-public {
    margin-top: 2em;
  }

  .converted-amount {
    margin-left: -6%;
  }
}

@media (max-width: 991px) {
  .row.form-body.reg .row div {
    margin-top: 2em;
  }

  .attendance-body.stretch {
    height: 135px;
  }
}

@media (max-width: 600px) {
  .events {
    margin-top: 2rem;
  }
}

@media (max-width: 576px) {
  .select-elem-con {
    /* padding: 47px 0; */
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>