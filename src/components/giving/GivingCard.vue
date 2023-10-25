<template>
    <div
                  class="col-sm-10 col-md-8 mx-auto form-area shadow p-5 mb-5 bg-white rounded MIDDLE"
                  v-if="!paymentSuccessful"
                  key="form"
                >
                  <div class="row">
                    <div class="col-md-4 my-3 pr-md-0">
                      <label class="hfont">Purpose</label>

                      <Dropdown
                        v-model="selectedContributionType"
                        :options="formResponse.contributionItems"
                        optionLabel="financialContribution.name"
                        placeholder="Select"
                        class="w-100 px-0"
                      />
                    </div>
                    <div class="col-md-4 my-3">
                      <label class="hfont">Currency</label>
                       <Dropdown
                            v-model="dfaultCurrency"
                            :options="currencyInput"
                            optionLabel="shortCode"
                            :placeholder="dfaultCurrency.shortCode"
                            class="w-100 px-0"
                          />
                    </div>
                    <div class="col-md-4 my-3 pl-md-0">
                      <label class="hfont">Amount</label>

                      <input
                            class="form-control col-md-12 text-left imp1 border"
                            type="text"
                            v-model="amount"
                            placeholder="Amount"
                          />
                    </div>
                  </div>


                  <!-- start of dynamic Area 1-->
                  <div class="row">
                    <div class="col-md-12">
                      <section>
                        <p class="col-12 hfont px-0 mb-1">
                          How often do you give:
                        </p>

                        <div class="col-12 mt-1 imp1">
                          <div class="row border rounded">
                            <div
                              class="col-md-6 fone p-3 text-center borderl header-color1"
                              :class="{ 'header-color': hideTabOne }"
                              @click="toggleTabOne"
                            >
                              <span><i class="fas fa-donate"></i></span>&nbsp;
                              Give One Time
                            </div>
                            <div
                              class="col-md-6 p-3 fone text-center btn-default header-color1"
                              :class="{ 'header-color': !hideTabOne }"
                              @click="toggleTabTwo"
                            >
                              <span
                                ><i class="fas fa-redo-alt"></i> &nbsp; Set Up
                                Recurring</span
                              >
                            </div>
                          </div>
                        </div>
                      </section>
                    </div>
                  </div>
                  <!-- end of dynamic Area 1-->

                  <!-- start of dynamic Area 2-->
                  <div class="row">
                    <div class="col-md-12">
                      <section class="col-md-12 mt-3 px-0" v-if="!hideTabOne">
                        <p class="col-10 hfont px-0 mb-1">Frequency:</p>

                        <div class="col-12 mt-1">
                          <div class="row border rounded">
                            <div
                              :class="{ 'header-color': oftenGive1 }"
                              class="col-md-3 fone p-2 text-center header-color1 borderl"
                              @click="givingOften"
                            >
                              Every Week
                            </div>
                            <div
                              :class="{ 'header-color': oftenGive2 }"
                              class="col-md-3 fone p-2 header-color1 text-center borderl"
                              @click="givingOften"
                            >
                              Every 2 Week
                            </div>
                            <div
                              :class="{ 'header-color': oftenGive3 }"
                              class="col-md-3 fone p-2 header-color1 text-center borderl"
                              @click="givingOften"
                            >
                              Every month
                            </div>
                            <div
                              class="col-md-3 p-2 fone text-center header-color1"
                              @click="givingOften"
                              :class="{ 'header-color': oftenGive4 }"
                            >
                              1st and 15th monthly
                            </div>
                          </div>
                        </div>
                      </section>
                    </div>
                  </div>
                  <!-- end of dynamic Area 2 -->

                  <!-- start of date area -->
                  <section class="col-md-12 mt-3 px-0" v-if="!hideTabOne">
                    <div class="row">
                      <p class="col-6 py-0 ml-1 hfont">Starting</p>
                      <div class="col-md-6 d-flex flex-row mt-n2">
                        <input
                          type="date"
                          class="form-control fone p-3 imp1"
                          v-model="date"
                        />
                      </div>
                    </div>
                  </section>
                  <!-- end of date area -->
                  <div class="col-12">
                  <div class="row mt-4 stroke" v-if="!signedIn" >
                    <!-- <div class="col-1">
                     
                    </div> -->
                    <div class="col-6 align-self-center pointer" :class="{ 'active-tab' : activeTab1 }" @click="toggleActive1">
                    <div class="p-2 fone">Give Now</div>
                    </div>
                    <div class="col-6 align-self-center pointer" :class="{ 'active-tab' : activeTab2 }" @click="toggleActive2">
                      <div class="p-2 fone">Sign In</div>
                    </div>
                  </div>
                  </div>

                  <div class="col-12 d-flex align-items-center mt-3 p-0" v-if="!signedIn && !activeTab2">
                    <Checkbox id="binary" v-model="checked" :binary="true" />
                    <label for="binary" class="mb-0 pl-3">
                      Give as anonymous
                    </label>
                  </div>
                  <!-- start of user credentials area -->
          
                    <transition name="fade">
                      
                  <div class="col-12" v-if="!checked">
                    <div class="row d-flex">
                    
                    <div class="col-md-6">
                      <div class="row">
                        <div class="col-md-12 mx-auto my-2 px-0 px-2">
                          <label class="hfont">Name</label>
                          <input
                            class="form-control col-md-12 text-left border imp1"
                            type="text"
                            placeholder="Enter your name"
                            v-model="name"
                          />
                      </div>
                      </div>
                    </div>


                    <div class="col-md-6">
                      <div class="row">
                        <div class="col-md-12 mx-auto my-2 px-0 px-2">
                          <label class="hfont">Phone Number</label>
                          <input
                            class="form-control col-md-12 text-left border imp1"
                            type="text"
                            v-model="phone"

                          />
                        </div>
                      </div>
                      </div>
                    </div>
                  </div>
                  </transition>
  
                   <div class="col-12" v-if="activeTab2 && !signedIn">
                    <div class="row d-flex" v-if="showSignInForm">
                    
                    <div class="col-md-6">
                      <div class="row">
                        <div class="col-md-12 mx-auto my-2 px-0 px-2">
                          <label class="hfont">Email</label>
                          <input
                            class="form-control col-md-12 text-left border imp1"
                            type="email"
                            v-model="signInEmail"                     
                          />
                      </div>
                      </div>
                    </div>


                    <div class="col-md-6">
                      <div class="row">
                        <div class="col-md-12 mx-auto my-2 px-0 px-2">
                          <label class="hfont">Password</label>
                          <input
                            class="form-control col-md-12 text-left border imp1"
                            type="password"
                            v-model="signInPassword"
                           />
                        </div>
                      </div>
                      </div>
                      <div class="col-sm-12 mt-3">
                        <div class="d-flex justify-content-center">
                          <div class="button signin-color text-center w-25" @click="signin">Sign in</div>
                        </div>
                        <div class="label mt-3 text-center hfont">
                          Not registered yet?
                          <a href="#" class="text-primary" @click.prevent="showSignInForm = false">Create a new account</a>
                        </div>
                      </div>
                    </div>
                    <div class="row" v-else>
                      <SignUp :tenantId="formResponse.tenantID" @signed-up="signedUp" @show-signin="displaySignInForm"/>
                    </div>
                  </div>
  
                  
                  
                    <div class="col-md-12">
                      <section
                        class="col-10 offset-1 mt-3 px-0"
                        v-if="!hideTabOne || hideTabOne"
                      >
                        <!-- button section -->
                        <div class="row my-3" @click="donation">
                          <div class="col-md-12 text-center mt-4">
                            <button
                              data-toggle="modal"
                              data-target="#PaymentOptionModal"
                              class="btn btn-default btngive default-color hfontb btt"
                            >
                              Give Now
                            </button>
                          </div>
                        </div>
                        <!--end of button section -->
                      </section>
                      <!-- <button type="button" class="btn btn-primary" >
            Launch demo modal
          </button> -->
                    <!-- Modal -->
                    <div class="modal fade" id="PaymentOptionModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                      <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                          <div class="modal-header bg-modal">
                            <h5 class="modal-title" id="exampleModalLongTitle">Payment methods</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true" ref="close">&times;</span>
                            </button>
                          </div>
                          <div class="modal-body p-0 bg-modal pb-5">
                            <PaymentOptionModal :orderId="formResponse.orderId" :donation="donationObj" :close="close" :name="name" :amount="amount" :converted="convertedAmount" :email="email" @payment-successful="successfulPayment" :gateways="formResponse.paymentGateWays" :currency="dfaultCurrency.shortCode" @selected-gateway="gatewaySelected"/>
                          </div>
                          <!-- <div class="modal-footer bg-modal">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                          </div> -->
                          </div>
                        </div>
                      </div>
                    </div>

        
                  <!-- end of dynamic Area 3 -->
                </div>
</template>

<script>
export default {
    setup () {
        return {}
    }
}
</script>

<style></style>