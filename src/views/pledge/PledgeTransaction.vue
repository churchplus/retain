<template>
  <div class="container-fluid">
    <div class="container-fluid">
      <div class="row mt-5">
        <div class="col-md-6">
          <div class="fontfamily">Invoices</div>
          <Toast />
          <ConfirmDialog />
        </div>
        <div class="col-md-6 d-flex head-button mt-2 my-1 link">
          <div class="font-weight-bold pt-2 pr-1">What's new</div>
          <div
            class="
              cursor-pointer
              grey-border
              primary-btn
              default-btn
              primary-bg
              border-0
              small-screen
            "
          >
            Create an invoice
          </div>
        </div>
        <div class="col-md-12">
          <hr class="hr my-3" />
        </div>
      </div>
      <div class="container-fluid">
        <div class="row border py-3 px-2 mt-3 rounded">
          <div class="col-md-5">
            <div class="text-secondary font-weight-bold small">
              Total pledges Amount
            </div>
            <h3 class="font-weight-700 mt-3">
              N 1,439,700 <span class="text-secondary small">NGN</span>
            </h3>
            <div class="small text-secondary">
              Last updated on July 9, 2022 at 1:07PM GMT+1
            </div>
          </div>
          <div class="col-md-4 mt-3 mt-md-0">
            <div class="text-secondary font-weight-bold small">
              Payment within the last 30day
            </div>
            <h3 class="font-weight-700 mt-3">
              N 0.00 <span class="text-secondary small">NGN</span>
            </h3>
          </div>
          <div class="col-md-3 mt-3 mt-md-0">
            <div class="font-weight-bold small text-secondary">
              Average time to redemption
            </div>
            <h3 class="font-weight-700 mt-3">
              21<span class="text-secondary small">days</span>
            </h3>
          </div>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-md-12 mt-3 d-flex">
          <div>
            <span
              class="
                font-weight-bold
                bg-secondary
                rounded-circle
                py-1
                px-2
                border
              "
              >0</span
            >
          </div>
          <div class="col-md-5">active filters</div>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-md-3">
          <Dropdown
            v-model="selectedPledge"
            class="w-100 font-weight-normal"
            :options="allPledgeType"
            optionLabel="name"
            placeholder="All customers"
          />
        </div>
        <div class="col-md-2 mt-3 mt-md-0">
          <Dropdown
            v-model="selectedPledge"
            class="w-100 font-weight-normal"
            :options="allPledgeType"
            optionLabel="name"
            placeholder="All statuses"
          />
        </div>
        <div class="col-md-2 mt-3 mt-md-0">
          <Calendar
            dateFormat="dd/mm/yy"
            placeholder="From"
            class="w-100"
            id="icon"
            v-model="startDate"
            :showIcon="true"
          />
        </div>
        <div class="col-md-2 mt-3 mt-md-0">
          <Calendar
            dateFormat="dd/mm/yy"
            placeholder="To"
            class="w-100"
            id="icon"
            v-model="endDate"
            :showIcon="true"
          />
        </div>
        <div class="col-md-3 mt-3 d-flex mt-md-0">
          <input
            type="text"
            class="form-control"
            placeholder="Enter invoice #"
          />
          <span class="border cursor-pointer bg-secondary pt-2 px-3"
            ><i class="pi pi-search"></i
          ></span>
        </div>
      </div>
      <div class="row mt-4 mb-3">
        <div class="col-md-12 mt-3 d-flex flex-wrap text-center botom">
          <div class="col-12 col-sm-4 col-md-2 mt-2 mt-md-0" @click="upload">
            <div class="col-md-12 pb-2">
              Upload
              <span
                class="
                  font-weight-bold
                  bg-secondary
                  rounded-circle
                  py-1
                  px-2
                  border
                "
                >8</span
              >
            </div>
            <div
              :class="{ baseline: showUpload, 'hide-base': !showUpload }"
            ></div>
          </div>

          <div class="col-12 col-sm-4 col-md-2 mt-2 mt-md-0" @click="draft">
            <div class="col-md-12 pb-2">
              Draft
              <span
                class="
                  font-weight-bold
                  bg-secondary
                  rounded-circle
                  py-1
                  px-2
                  border
                "
                >1</span
              >
            </div>
            <div
              :class="{ baseline: showDraft, 'hide-base': !showDraft }"
            ></div>
          </div>
          <div class="col-12 col-sm-4 col-md-2 mt-2 mt-md-0" @click="invoice">
            <div class="col-12 pb-2">All invoice</div>
            <div
              :class="{ baseline: showInvoice, 'hide-base': !showInvoice }"
            ></div>
          </div>
        </div>
      </div>

      <div class="container-fluid d-none mt-4 d-md-block">
        <div class="row t-header mt-4 border-bottom pb-2">
          <div class="small-text text-capitalize col-md-1 font-weight-bold">
            Status
          </div>
          <div class="small-text text-capitalize col-md-2 font-weight-bold">
            Due
          </div>
          <div class="small-text text-capitalize col-md-2 font-weight-bold">
            Date
          </div>
          <div class="small-text text-capitalize col-md-1 font-weight-bold">
            Number
          </div>
          <div class="small-text text-capitalize col-md-2 font-weight-bold">
            Contact
          </div>
          <div
            class="
              small-text
              text-capitalize
              Text-center
              col-md-2
              font-weight-bold
            "
          >
            Amount Pledge
          </div>
          <div
            class="
              small-text
              text-capitalize
              Text-center
              col-md-2
              font-weight-bold
            "
          >
            Balance
          </div>

          <div
            class="
              small-text
              text-capitalize
              col-md-1
              text-right
              font-weight-bold
            "
          >
            Action
          </div>
        </div>
      </div>
      <div class="row" style="margin: 0">
        <div class="col-12 pb-2 px-0">
          <div
            class="
              row
              w-100
              c-pointer
              text-dark
              border-top
              py-2
              hover
              d-flex
              align-items-center
            "
            style="margin: 0"
          >
            <div class="col-md-1 p-2">
              <p
                class="
                  mb-0
                  d-flex
                  text-danger
                  font-weight-bold
                  justify-content-between
                "
              >
                <span
                  class="
                    text-dark
                    font-weight-bold
                    d-flex d-md-none
                    fontIncrease
                  "
                  style="font-size: 15px"
                  >Status</span
                >
                <span class="rounded small font-weight-bold statusbg py-1 px-2"
                  >Overdue</span
                >
              </p>
            </div>

            <div class="col-md-2 p-2">
              <p class="mb-0 d-flex text-danger justify-content-between">
                <span
                  class="
                    text-dark
                    font-weight-bold
                    d-flex d-md-none
                    fontIncrease
                  "
                  style="font-size: 15px"
                  >Due</span
                >
                1098 days ago
              </p>
            </div>
            <div class="col-md-2 p-2">
              <p class="mb-0 d-flex justify-content-between">
                <span
                  class="
                    text-dark
                    font-weight-bold
                    d-flex d-md-none
                    fontIncrease
                  "
                  style="font-size: 15px"
                  >Date
                </span>
                {{ date(pledgelist.pledgeType.dateEntered) }}
              </p>
            </div>
            <div class="col-md-1 p-2">
              <div class="d-flex small justify-content-between">
                <span
                  class="
                    text-dark
                    font-weight-bold
                    d-flex d-md-none
                    fontIncrease
                  "
                  style="font-size: 15px"
                  >Number</span
                >
                <div class="small-text text-right text-md-center">25</div>
              </div>
            </div>
            <div class="col-md-2 p-2">
              <div class="d-flex small justify-content-between">
                <span
                  class="
                    text-dark
                    font-weight-bold
                    d-flex d-md-none
                    fontIncrease
                  "
                  style="font-size: 15px"
                  >Customer</span
                >
                <div class="small-text text-right text-md-center">
                  Anderson Udokoro
                </div>
              </div>
            </div>
            <div class="col-md-2 p-2">
              <div class="d-flex small justify-content-between">
                <span
                  class="
                    text-dark
                    font-weight-bold
                    d-flex d-md-none
                    fontIncrease
                  "
                  style="font-size: 15px"
                  >Amount due</span
                >
                <div class="small-text text-right text-md-center">
                  NGN 111,000.00
                </div>
              </div>
            </div>

            <div class="col-md-2 p-2">
              <div class="d-flex">
                <span
                  class="text-primary font-weight-bold fontIncrease"
                  style="font-size: 15px"
                  >Send reminder</span
                >
                <div class="dropdown">
                  <span class="d-flex justify-content-between">
                    <span class="d-sm-flex small">
                      <i
                        class="
                          pt-1
                          px-2
                          text-primary
                          border border-primary
                          rounded-circle
                          dropdown-toggle
                          cursor-pointer
                          ml-2
                          fontIncrease
                          font-weight-blod
                        "
                        id="dropdownMenuButton"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      ></i>

                      <div
                        class="dropdown-menu"
                        aria-labelledby="dropdownMenuButton"
                      ></div>
                    </span>
                  </span>
                </div>
              </div>
            </div>
            <div class="col-md-1 p-2">
              <p
                class="
                  mb-0
                  d-flex
                  text-danger
                  font-weight-bold
                  justify-content-between
                "
              >
                <span
                  class="
                    text-dark
                    font-weight-bold
                    d-flex d-md-none
                    fontIncrease
                  "
                  style="font-size: 15px"
                  >Status</span
                >
                <span class="rounded small font-weight-bold statusbg py-1 px-2"
                  >Overdue</span
                >
              </p>
            </div>

            <div class="col-md-2 p-2">
              <p class="mb-0 d-flex text-danger justify-content-between">
                <span
                  class="
                    text-dark
                    font-weight-bold
                    d-flex d-md-none
                    fontIncrease
                  "
                  style="font-size: 15px"
                  >Due</span
                >
                1098 days ago
              </p>
            </div>
            <div class="col-md-2 p-2">
              <p class="mb-0 d-flex justify-content-between">
                <span
                  class="
                    text-dark
                    font-weight-bold
                    d-flex d-md-none
                    fontIncrease
                  "
                  style="font-size: 15px"
                  >Date
                </span>
                2020-07-16
              </p>
            </div>
            <div class="col-md-1 p-2">
              <div class="d-flex small justify-content-between">
                <span
                  class="
                    text-dark
                    font-weight-bold
                    d-flex d-md-none
                    fontIncrease
                  "
                  style="font-size: 15px"
                  >Number</span
                >
                <div class="small-text text-right text-md-center">25</div>
              </div>
            </div>
            <div class="col-md-2 p-2">
              <div class="d-flex small justify-content-between">
                <span
                  class="
                    text-dark
                    font-weight-bold
                    d-flex d-md-none
                    fontIncrease
                  "
                  style="font-size: 15px"
                  >Customer</span
                >
                <div class="small-text text-right text-md-center">
                  Anderson Udokoro
                </div>
              </div>
            </div>
            <div class="col-md-2 p-2">
              <div class="d-flex small justify-content-between">
                <span
                  class="
                    text-dark
                    font-weight-bold
                    d-flex d-md-none
                    fontIncrease
                  "
                  style="font-size: 15px"
                  >Amount due</span
                >
                <div class="small-text text-right text-md-center">
                  NGN 111,000.00
                </div>
              </div>
            </div>

            <div class="col-md-2 p-2">
              <div class="d-flex">
                <span
                  class="text-primary font-weight-bold fontIncrease"
                  style="font-size: 15px"
                  >Send reminder</span
                >
                <div class="dropdown">
                  <span class="d-flex justify-content-between">
                    <span class="d-sm-flex small">
                      <i
                        class="
                          pt-1
                          px-2
                          text-primary
                          border border-primary
                          rounded-circle
                          dropdown-toggle
                          cursor-pointer
                          ml-2
                          fontIncrease
                          font-weight-blod
                        "
                        id="dropdownMenuButton"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      ></i>

                      <div
                        class="dropdown-menu"
                        aria-labelledby="dropdownMenuButton"
                      ></div>
                    </span>
                  </span>
                </div>
              </div>
            </div>
            <div class="col-md-1 p-2">
              <p
                class="
                  mb-0
                  d-flex
                  text-danger
                  font-weight-bold
                  justify-content-between
                "
              >
                <span
                  class="
                    text-dark
                    font-weight-bold
                    d-flex d-md-none
                    fontIncrease
                  "
                  style="font-size: 15px"
                  >Status</span
                >
                <span class="rounded small font-weight-bold statusbg py-1 px-2"
                  >Overdue</span
                >
              </p>
            </div>

            <div class="col-md-2 p-2">
              <p class="mb-0 d-flex text-danger justify-content-between">
                <span
                  class="
                    text-dark
                    font-weight-bold
                    d-flex d-md-none
                    fontIncrease
                  "
                  style="font-size: 15px"
                  >Due</span
                >
                1098 days ago
              </p>
            </div>
            <div class="col-md-2 p-2">
              <p class="mb-0 d-flex justify-content-between">
                <span
                  class="
                    text-dark
                    font-weight-bold
                    d-flex d-md-none
                    fontIncrease
                  "
                  style="font-size: 15px"
                  >Date
                </span>
                2020-07-16
              </p>
            </div>
            <div class="col-md-1 p-2">
              <div class="d-flex small justify-content-between">
                <span
                  class="
                    text-dark
                    font-weight-bold
                    d-flex d-md-none
                    fontIncrease
                  "
                  style="font-size: 15px"
                  >Number</span
                >
                <div class="small-text text-right text-md-center">25</div>
              </div>
            </div>
            <div class="col-md-2 p-2">
              <div class="d-flex small justify-content-between">
                <span
                  class="
                    text-dark
                    font-weight-bold
                    d-flex d-md-none
                    fontIncrease
                  "
                  style="font-size: 15px"
                  >Customer</span
                >
                <div class="small-text text-right text-md-center">
                  Anderson Udokoro
                </div>
              </div>
            </div>
            <div class="col-md-2 p-2">
              <div class="d-flex small justify-content-between">
                <span
                  class="
                    text-dark
                    font-weight-bold
                    d-flex d-md-none
                    fontIncrease
                  "
                  style="font-size: 15px"
                  >Amount due</span
                >
                <div class="small-text text-right text-md-center">
                  NGN 111,000.00
                </div>
              </div>
            </div>

            <div class="col-md-2 p-2">
              <div class="d-flex">
                <span
                  class="text-primary font-weight-bold fontIncrease"
                  style="font-size: 15px"
                  >Send reminder</span
                >
                <div class="dropdown">
                  <span class="d-flex justify-content-between">
                    <span class="d-sm-flex small">
                      <i
                        class="
                          pt-1
                          px-2
                          text-primary
                          border border-primary
                          rounded-circle
                          dropdown-toggle
                          cursor-pointer
                          ml-2
                          fontIncrease
                          font-weight-blod
                        "
                        id="dropdownMenuButton"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      ></i>

                      <div
                        class="dropdown-menu"
                        aria-labelledby="dropdownMenuButton"
                      ></div>
                    </span>
                  </span>
                </div>
              </div>
            </div>
            <div class="col-md-1 p-2">
              <p
                class="
                  mb-0
                  d-flex
                  text-danger
                  font-weight-bold
                  justify-content-between
                "
              >
                <span
                  class="
                    text-dark
                    font-weight-bold
                    d-flex d-md-none
                    fontIncrease
                  "
                  style="font-size: 15px"
                  >Status</span
                >
                <span class="rounded small font-weight-bold statusbg py-1 px-2"
                  >Overdue</span
                >
              </p>
            </div>

            <div class="col-md-2 p-2">
              <p class="mb-0 d-flex text-danger justify-content-between">
                <span
                  class="
                    text-dark
                    font-weight-bold
                    d-flex d-md-none
                    fontIncrease
                  "
                  style="font-size: 15px"
                  >Due</span
                >
                1098 days ago
              </p>
            </div>
            <div class="col-md-2 p-2">
              <p class="mb-0 d-flex justify-content-between">
                <span
                  class="
                    text-dark
                    font-weight-bold
                    d-flex d-md-none
                    fontIncrease
                  "
                  style="font-size: 15px"
                  >Date
                </span>
                2020-07-16
              </p>
            </div>
            <div class="col-md-1 p-2">
              <div class="d-flex small justify-content-between">
                <span
                  class="
                    text-dark
                    font-weight-bold
                    d-flex d-md-none
                    fontIncrease
                  "
                  style="font-size: 15px"
                  >Number</span
                >
                <div class="small-text text-right text-md-center">25</div>
              </div>
            </div>
            <div class="col-md-2 p-2">
              <div class="d-flex small justify-content-between">
                <span
                  class="
                    text-dark
                    font-weight-bold
                    d-flex d-md-none
                    fontIncrease
                  "
                  style="font-size: 15px"
                  >Customer</span
                >
                <div class="small-text text-right text-md-center">
                  Anderson Udokoro
                </div>
              </div>
            </div>
            <div class="col-md-2 p-2">
              <div class="d-flex small justify-content-between">
                <span
                  class="
                    text-dark
                    font-weight-bold
                    d-flex d-md-none
                    fontIncrease
                  "
                  style="font-size: 15px"
                  >Amount due</span
                >
                <div class="small-text text-right text-md-center">
                  NGN 111,000.00
                </div>
              </div>
            </div>

            <div class="col-md-2 p-2">
              <div class="d-flex">
                <span
                  class="text-primary font-weight-bold fontIncrease"
                  style="font-size: 15px"
                  >Send reminder</span
                >
                <div class="dropdown">
                  <span class="d-flex justify-content-between">
                    <span class="d-sm-flex small">
                      <i
                        class="
                          pt-1
                          px-2
                          text-primary
                          border border-primary
                          rounded-circle
                          dropdown-toggle
                          cursor-pointer
                          ml-2
                          fontIncrease
                          font-weight-blod
                        "
                        id="dropdownMenuButton"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      ></i>

                      <div
                        class="dropdown-menu"
                        aria-labelledby="dropdownMenuButton"
                      ></div>
                    </span>
                  </span>
                </div>
              </div>
            </div>
            <div class="col-md-1 p-2">
              <p
                class="
                  mb-0
                  d-flex
                  text-danger
                  font-weight-bold
                  justify-content-between
                "
              >
                <span
                  class="
                    text-dark
                    font-weight-bold
                    d-flex d-md-none
                    fontIncrease
                  "
                  style="font-size: 15px"
                  >Status</span
                >
                <span class="rounded small font-weight-bold statusbg py-1 px-2"
                  >Overdue</span
                >
              </p>
            </div>

            <div class="col-md-2 p-2">
              <p class="mb-0 d-flex text-danger justify-content-between">
                <span
                  class="
                    text-dark
                    font-weight-bold
                    d-flex d-md-none
                    fontIncrease
                  "
                  style="font-size: 15px"
                  >Due</span
                >
                1098 days ago
              </p>
            </div>
            <div class="col-md-2 p-2">
              <p class="mb-0 d-flex justify-content-between">
                <span
                  class="
                    text-dark
                    font-weight-bold
                    d-flex d-md-none
                    fontIncrease
                  "
                  style="font-size: 15px"
                  >Date
                </span>
                2020-07-16
              </p>
            </div>
            <div class="col-md-1 p-2">
              <div class="d-flex small justify-content-between">
                <span
                  class="
                    text-dark
                    font-weight-bold
                    d-flex d-md-none
                    fontIncrease
                  "
                  style="font-size: 15px"
                  >Number</span
                >
                <div class="small-text text-right text-md-center">25</div>
              </div>
            </div>
            <div class="col-md-2 p-2">
              <div class="d-flex small justify-content-between">
                <span
                  class="
                    text-dark
                    font-weight-bold
                    d-flex d-md-none
                    fontIncrease
                  "
                  style="font-size: 15px"
                  >Customer</span
                >
                <div class="small-text text-right text-md-center">
                  Anderson Udokoro
                </div>
              </div>
            </div>
            <div class="col-md-2 p-2">
              <div class="d-flex small justify-content-between">
                <span
                  class="
                    text-dark
                    font-weight-bold
                    d-flex d-md-none
                    fontIncrease
                  "
                  style="font-size: 15px"
                  >Amount due</span
                >
                <div class="small-text text-right text-md-center">
                  NGN 111,000.00
                </div>
              </div>
            </div>

            <div class="col-md-2 p-2">
              <div class="d-flex">
                <span
                  class="text-primary font-weight-bold fontIncrease"
                  style="font-size: 15px"
                  >Send reminder</span
                >
                <div class="dropdown">
                  <span class="d-flex justify-content-between">
                    <span class="d-sm-flex small">
                      <i
                        class="
                          pt-1
                          px-2
                          text-primary
                          border border-primary
                          rounded-circle
                          dropdown-toggle
                          cursor-pointer
                          ml-2
                          fontIncrease
                          font-weight-blod
                        "
                        id="dropdownMenuButton"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      ></i>

                      <div
                        class="dropdown-menu"
                        aria-labelledby="dropdownMenuButton"
                      ></div>
                    </span>
                  </span>
                </div>
              </div>
            </div>
            <div class="col-md-1 p-2">
              <p
                class="
                  mb-0
                  d-flex
                  text-danger
                  font-weight-bold
                  justify-content-between
                "
              >
                <span
                  class="
                    text-dark
                    font-weight-bold
                    d-flex d-md-none
                    fontIncrease
                  "
                  style="font-size: 15px"
                  >Status</span
                >
                <span class="rounded small font-weight-bold statusbg py-1 px-2"
                  >Overdue</span
                >
              </p>
            </div>

            <div class="col-md-2 p-2">
              <p class="mb-0 d-flex text-danger justify-content-between">
                <span
                  class="
                    text-dark
                    font-weight-bold
                    d-flex d-md-none
                    fontIncrease
                  "
                  style="font-size: 15px"
                  >Due</span
                >
                1098 days ago
              </p>
            </div>
            <div class="col-md-2 p-2">
              <p class="mb-0 d-flex justify-content-between">
                <span
                  class="
                    text-dark
                    font-weight-bold
                    d-flex d-md-none
                    fontIncrease
                  "
                  style="font-size: 15px"
                  >Date
                </span>
                2020-07-16
              </p>
            </div>
            <div class="col-md-1 p-2">
              <div class="d-flex small justify-content-between">
                <span
                  class="
                    text-dark
                    font-weight-bold
                    d-flex d-md-none
                    fontIncrease
                  "
                  style="font-size: 15px"
                  >Number</span
                >
                <div class="small-text text-right text-md-center">25</div>
              </div>
            </div>
            <div class="col-md-2 p-2">
              <div class="d-flex small justify-content-between">
                <span
                  class="
                    text-dark
                    font-weight-bold
                    d-flex d-md-none
                    fontIncrease
                  "
                  style="font-size: 15px"
                  >Customer</span
                >
                <div class="small-text text-right text-md-center">
                  Anderson Udokoro
                </div>
              </div>
            </div>
            <div class="col-md-2 p-2">
              <div class="d-flex small justify-content-between">
                <span
                  class="
                    text-dark
                    font-weight-bold
                    d-flex d-md-none
                    fontIncrease
                  "
                  style="font-size: 15px"
                  >Amount due</span
                >
                <div class="small-text text-right text-md-center">
                  NGN 111,000.00
                </div>
              </div>
            </div>

            <div class="col-md-2 p-2">
              <div class="d-flex">
                <span
                  class="text-primary font-weight-bold fontIncrease"
                  style="font-size: 15px"
                  >Send reminder</span
                >
                <div class="dropdown">
                  <span class="d-flex justify-content-between">
                    <span class="d-sm-flex small">
                      <i
                        class="
                          pt-1
                          px-2
                          text-primary
                          border border-primary
                          rounded-circle
                          dropdown-toggle
                          cursor-pointer
                          ml-2
                          fontIncrease
                          font-weight-blod
                        "
                        id="dropdownMenuButton"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      ></i>

                      <div
                        class="dropdown-menu"
                        aria-labelledby="dropdownMenuButton"
                      ></div>
                    </span>
                  </span>
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
import { ref, computed } from "vue";
import Dropdown from "primevue/dropdown";
import Calendar from "primevue/calendar";
export default {
  components: {
    Dropdown,
    Calendar,
  },

  setup() {
    const startDate = ref("");
    const endDate = ref("");
    const showUpload = ref(true);
    const showDraft = ref(false);
    const showInvoice = ref(false);

    const upload = () => {
      showUpload.value = true;
      showDraft.value = false;
      showInvoice.value = false;
    };

    const draft = () => {
      showDraft.value = true;
      showUpload.value = false;
      showInvoice.value = false;
    };

    const invoice = () => {
      showInvoice.value = true;
      showDraft.value = false;
      showUpload.value = false;
    };


    return {
      upload,
      draft,
      invoice,
      startDate,
      endDate,
      showUpload,
      showDraft,
      showInvoice,
    };
  },
};
</script>

<style scoped>
.fontfamily {
  font: normal normal 800 29px Nunito sans;
}

.baseline {
  transition: all 150ms ease-in-out;
  background-color: #136acd;
  position: relative;
  border-radius: 24px;
  top: 5px;
  height: 4px;
  left: 0px;
  opacity: 1;
}

.hide-base {
  transition: all 150ms ease-in-out;
  background-color: #136acd;
  border-radius: 24px;
  bottom: -2.5px;
  height: 4px;
  left: 0px;
  opacity: 0;
}

.botom {
  border-bottom: 7px solid rgb(252, 248, 248);
  border-radius: 2px;
  position: relative;
  /* border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px; */

  /* height: 4px; */
}

.statusbg {
  background-color: #fce1e1;
}

.head-button {
  display: flex;
  justify-content: flex-end;
}
.table {
  width: 100% !important;
  box-shadow: 0px 1px 3px #02172e45;
  border: 1px solid #dde2e6;
  border-radius: 15px;
  text-align: left;
  margin-bottom: auto !important;
}

.default-bt {
  font-weight: 600;
  white-space: initial;
  font-size: 0.8rem;
  border-radius: 1.25rem;
  border: 1px solid #999fa5;
  padding: 0.3rem 0.1rem;
  width: auto;
  /* border: none; */
  /* outline: transparent !important; */
  max-height: 40px;
  background: #ffffff47 !important;
  min-width: 65px;
}

@media (max-width: 577px) {
  .head-button {
    flex-direction: column;
    align-items: center;
  }
}
@media (max-width: 767px) {
  .head-button {
    display: flex;
    justify-content: center;
  }
}

@media (max-width: 575px) {
  .head-button {
    display: flex;
    justify-content: center;
  }
}
</style>