<template>
    <div class="container-top" :class="{ 'container-slim': lgAndUp || xlAndUp }">
        <div class="row">
            <div class="col-12  d-flex justify-content-between">
                <div class="page-header">{{ header ? header : "Payment Form" }}</div>
                <div v-if="!loadingEdit">
                   <ToggleButton @is-active="active" :active="isActive"/>
                </div>
                <div v-else-if="!routeParams">
                   <ToggleButton @is-active="active" :active="isActive"/>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12 col-md-12">
                    <hr class="mt-4"/>
                </div>
        </div>
        <form class="form">
            <div class="row">

            <div class="col-10 offset-sm-1 offset-md-0 col-md-3 col-lg-4 text-md-right align-self-center">
                    <div>Name</div>
                </div>
                <div class="pl-md-0 col-12 col-sm-10 offset-sm-1 offset-md-0 col-md-6 col-lg-5 pl-md-0 mt-3" style="height: 43px;">
                        <el-input class="w-100" placeholder="Enter name" v-model="newContribution.name" type="text" required />
                    </div>
               </div>
            <div class="row mt-2" v-for="(item, index) in newContribution.payment"  :key="index">
                <div class="col-10 offset-sm-1 offset-md-0 col-md-3 col-lg-4 text-md-right align-self-center">
                    <div>Contribution Item</div>
                </div>


                <div class="col-10 offset-sm-1 offset-md-0 col-md-6 col-lg-5 pl-md-0 mt-3">
                    <el-dropdown trigger="click" class="w-100">
                    <span class="el-dropdown-link w-100">
                      <div
                        class="d-flex justify-content-between border-contribution  w-100"
                        size="large"
                      >
                        <span class="text-secondary">{{
                         item && item.financialContribution ? item.financialContribution.name : "Select"
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
                          v-for="(itm, indx) in contributionItems"
                          :key="indx"
                          @click="selectContribution(itm, index)"
                          >{{ itm.name }}
                        </el-dropdown-item>
                        <el-dropdown-item
                          data-toggle="modal"
                          data-target="#exampleModalCenter"
                          class="text-center"
                          divided
                          ><a
                            class="font-weight-bold small-text d-flex justify-content-center py-2 text-decoration-none primary-text"
                            style="color: #136acd"
                          >
                            <el-icon size="large">
                              <CirclePlus />
                            </el-icon>
                            Create new contribution item
                          </a></el-dropdown-item
                        >
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                <!-- <button

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
                    {{ item && item.financialContribution ? item.financialContribution.name : "Select" }}
                <i class="pi pi-chevron-down manual-dd-icon float-right pr-1"></i>
              </button> -->
              <!-- <div
                class="dropdown-menu w-100"
                aria-labelledby="dropdownMenuButton"
              >
                <div class="row w-100 mx-auto">
                  <div class="col-md-12">
                    <input type="text" class="form-control" placeholder="Select contribution item" />
                  </div>
                </div>

                <a class="dropdown-item font-weight-700 small-text py-2 c-pointer"
                  v-for="(item, indx) in contributionItems" :key="indx"
                  @click="selectContribution(item, index)"
                  >{{ item.name }}</a
                >
                <a class="font-weight-bold small-text d-flex justify-content-center py-2 text-decoration-none primary-text" style="border-top: 1px solid #002044;color: #136ACD;" href="#"
                  type="button" data-toggle="modal" data-target="#exampleModalCenter"
                >
                    <i class="pi pi-plus-circle mr-2 d-flex align-items-center" style="color: #136ACD;"></i>
                  Create new Contribution Item
                  </a>
              </div> -->
                </div>

                <!-- Modal -->
        <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header" style="border: none">
                <h5 class="modal-title" id="exampleModalLongTitle">Add Contribution</h5>
                <el-button round class="close mt-0" data-dismiss="modal" aria-label="Close">
                  <el-icon  :size="20"><Close /></el-icon>
                </el-button>
              </div>
              <div class="modal-body">
                <ContributionItems @item-name="newConItems" @show-update-modal="toggleDisplayModal"/>
            </div>

            </div>
          </div>
        </div>
                <div class="col-1 align-self-center">
                    <el-tooltip
                        class="box-item"
                        effect="dark"
                        content="Delete"
                        placement="bottom"
                    >
                        <el-icon :size="18" @click="showConfirmModal(item.id, index)"><Delete /></el-icon>
                    </el-tooltip>
                </div>
            </div>
            <div class="col-8 col-md-5 offset-sm-1 offset-md-3 pl-0 offset-lg-4 mt-3">
                    <el-button
                        style="margin-left: -3px"
                        round
                        v-on:click.prevent="addContribution"
                        class=" btnIcons btn-secondary"
                        >
                        <el-icon size="large">
                            <CirclePlus />
                        </el-icon>
                        <!-- <i class="pi pi-plus-circle icons" aria-hidden="true"></i> -->

                        &nbsp;
                        Add
                    </el-button>
                </div>
            <div class="row">
                <div class="col-12">
                    <hr class="mt-4"/>
                </div>

                <div class="mt-3 col-10 offset-sm-1 offset-md-0 col-md-3 col-lg-4 text-md-right align-self-center">
                    <div>Choose Bank</div>
                </div>
                <div class="col-12 col-sm-10 offset-sm-1 offset-md-0 col-md-6 col-lg-5 pl-md-0 mt-3" style="height: 43px;">
                     <el-dropdown trigger="click" class="w-100">
                      <span class="el-dropdown-link w-100">
                        <el-input
                          type="text"
                          placeholder='Select Bank'
                          v-model="bankSearchText"
                        />
                      </span>
                      <template #dropdown>
                        <el-dropdown-menu>
                          <el-dropdown-item
                            v-for="item in filteredBanks"
                            :key="item.id"
                            @click="setBank(item)"
                          >
                            {{ item ? item.name : "" }}
                          </el-dropdown-item>
                        </el-dropdown-menu>
                      </template>
                    </el-dropdown>
                </div>
                <div class="col-2 d-none d-sm-block"></div>

                <div class="mt-3 col-10 offset-sm-1 offset-md-0 col-md-3 col-lg-4 text-md-right align-self-center">
                    <div>Enter account number</div>
                </div>
                <!-- <div class="col-12 col-sm-10 offset-sm-1 offset-md-0 col-md-6 col-lg-5 pl-md-0 mt-3" style="height: 43px;">
                    <el-input class="w-100" type="text" v-model="accountNumber" @blur="resolveCustomerDetail" />
                </div> -->
                <div class="col-2 d-none d-sm-block"></div>

                <div class="mt-3 col-10 offset-sm-1 offset-md-0 col-md-3 col-lg-4 text-md-right align-self-center">
                    <div>Account Name</div>
                </div>
                <div class="col-12 col-sm-10 offset-sm-1 offset-md-0 col-md-6 col-lg-5 pl-md-0 mt-3" style="height: 43px;">
                    <el-input type="text" v-model="accountName" placeholder="Account name" ref="accNameRef" class="w-100" disabled/>
                    <div class="mt-1">
                        <em class="mt-1">This will automatically come up, kindly confirm before clicking on save.</em>
                    </div>

                </div>
                <div
                    class="col-sm-2 col-lg-3 align-self-center mt-4"
                    v-if="loading"
                  >
                    <div style="width: 3rem; height: 3rem" role="status">
                      <el-icon :size="20" class="is-loading">
                        <Loading />
                      </el-icon>
                    </div>
                  </div>

                <div class="col-10 col-md-12 mt-5">
                    <hr class="mt-4"/>
                </div>
                <div class="col-10 offset-sm-1 offset-md-0 col-md-3 col-lg-4 text-md-right mb-3 mb-md-0">
                    <div>Select Payment Gateway</div>
                </div>
                <div class=" col-10 offset-sm-1 offset-md-0 col-md-6 col-lg-5 align-self-center">
                  <div class="row">
                      <div class="col-sm-4 d-flex" v-for="(item, index) in gateways" :key="item.id">
                        <i class=" mr-2 check-box" @click="toggleCheckBox(item, index)">
                           <img v-if="item.isChecked" src="../../assets/check.png" class="child w-100">
                        </i>
                        <h6>{{ item.name }}</h6>
                      </div>
                  </div>
                </div>
            </div>

            <div class="row" v-if="false">
                <div class="col-10 col-md-12 mt-2">
                    <hr class="mt-1"/>
                </div>
            </div>
        <div class="row" v-if="false">
            <div class="col-10 col-md-12 mt-4">
                    <div class="d-flex">
                        <h5 class="header-contri my-3">Choose the form template you desire</h5>
                        <hr style="width: 60%"/>
                        <el-icon :class="{ 'rollIcon' : templateDisplay, 'closeIcon' : !templateDisplay }" @click="toggleTemplate"><ArrowUp /></el-icon>
                        <!-- <i class="pi pi-angle-up angle-icon mt-3" :class="{ 'rollIcon' : templateDisplay, 'closeIcon' : !templateDisplay }" @click="toggleTemplate" ></i> -->
                    </div>

                    <div class="row img-row hide-tem mt-4" :class="{ 'show-tem': templateDisplay, 'hide-tem' : !templateDisplay }">
                        <div class="col-sm-6 col-lg-4 mt-3">
                            <img src="../../assets/giving1.png" class="w-100"  ref="myImg" id="myImg" @click="togglePopup"/>
                            <div class="col-sm-12 d-flex justify-content-between mt-4">
                                <i class="check-it mr-2" @click="toggleFirstTemplate">
                                <span class="child" v-if="firstTemplate"></span>
                                </i>
                                <h6 class="preview" @click="togglePopup">Preview</h6>
                            </div>
                        </div>
                        <ImageModal :src="sourceModal" :booleanModal="booleanModal" @close-modal="closeModal"/>
                        <!-- <div ref="modal" class="modal">
                            <span class="close">&times;</span>
                            <img class="modal-conent" ref="img01">
                            <div ref="caption"></div>
                        </div> -->
                        <div class="col-sm-6 col-lg-4 mt-3">
                            <img src="../../assets/giving2.png" class="w-100" style="height: 83%" ref="myImg" id="myImg" @click="togglePopup"/>
                            <div class="col-sm-12 d-flex justify-content-between mt-4">
                                <i class="check-it mr-2" @click="toggleSecondTemplate">
                                <span class="child" v-if="secondTemplate"></span>
                                </i>
                                <h6 class="preview" @click="togglePopup">Preview</h6>
                            </div>
                        </div>
                        <div class="col-sm-6 col-lg-4 mt-3">
                            <img src="../../assets/giving3.png" class="w-100"  ref="myImg" id="myImg" @click="togglePopup"/>
                            <div class="col-sm-12 d-flex justify-content-between mt-4">
                                <i class="check-it mr-2" @click="toggleThirdTemplate">
                                <span class="child" v-if="thirdTemplate"></span>
                                </i>
                                <h6 class="preview" @click="togglePopup">Preview</h6>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
            <div class="row">
                <div class="col-10 col-md-12 mt-2">
                    <hr class="mt-1"/>
                </div>
            </div>

            <div class="row">

                <div class="col-12 col-sm-10 col-md-6 col-lg-5 offset-sm-1 offset-md-3 offset-lg-4 pl-0 mt-3">
                <el-button
                  class="button border-0 w-100 text-white"
                  round
                  :loading="loadingSave"
                  :class="{ 'disabled-bg' : disabled, 'primary-bg' : !disabled }"
                  @click.prevent="saveAndContinue"
                  style="margin-left: 2px"

                >
                  Save and Continue
                </el-button>

            </div>
            <div class="col-12 col-sm-10 col-md-6 col-lg-5 offset-sm-1 offset-md-3 offset-lg-4 pl-0 mt-5">
                    <div class="row">
                        <div class="col-4">
                            <img src="../../assets/paystack.png" class="w-100">
                        </div>
                        <div class="col-5 pr-0">
                            <img src="../../assets/flutterwave.png" class="w-100">
                        </div>
                        <div class="col-3 pl-0 text-right">
                            <img src="../../assets/paypal.png" class="w-50">
                        </div>
                    </div>
            </div>
            </div>
        </form>
        <el-dialog v-model="displayResponsive" title="" 
          :width="mdAndUp || lgAndUp || xlAndUp ? `50%` : `90%`">
            <div class="row">
                <div class="col-md-12">
                    <p>You have no income account to create a offering item, go to Chart of Account and click 'Update Account' to update your accounts.</p>
                </div>
            </div>
            <template #footer>
                <!-- <Button label="No" icon="pi pi-times" @click="closeResponsive" class="p-button-text"/> -->
                <el-button round class="w-100 text-white primary-bg" label="Go to Chart Of Accounts" @click="closeResponsive" autofocus >Go to Chart Of Accounts<el-icon><Check /></el-icon> </el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import { ref,  computed } from 'vue'
import axios from "@/gateway/backendapi";
import finish from '../../services/progressbar/progress'

// import axio from  'axios'
import { useStore } from 'vuex'
import router from "@/router/index";
import { useRoute } from "vue-router"
// import Store from "../../store/store"
import deviceBreakpoint from "../../mixins/deviceBreakpoint";
import store from '../../store/store';
import ContributionItems from "@/components/firsttimer/contributionItemModal"
import ImageModal from './ImageModal'
import ToggleButton from './toggleButton'
import { ElMessage, ElMessageBox } from "element-plus";

export default {
    components: {
        ContributionItems, ImageModal, ToggleButton
    },
    props: [ "header"],
    setup (prop, { emit }) {
        const contributionItems = ref([])
        const newContribution = ref({ payment: [{}]})
        const nigerianBanks = ref([])
        const { lgAndUp, xlAndUp, mdAndUp } = deviceBreakpoint()
        const selectedBank = ref("")
        const bankSearchText = ref("")
        const accountNumber = ref("")
        const selectedContribution = ref("")
        const accountName = ref("")
        const accNameRef = ref("")
        const loading = ref(false)
        const disabled = ref(true)
        const route = useRoute()
        const firstTemplate = ref(true)
        const secondTemplate = ref(false)
        const thirdTemplate = ref(false)
        const sourceModal = ref("")
        const booleanModal = ref(false)
        const paymentGateWaysDb = ref([])
        const paymentGateWays = ref([])
        const loadingSave = ref(false)
        const loadingEdit = ref(false)
        const removeContributionIDs = ref([])
        const removePaymentGatewayIDs = ref([])
        const isActive = ref(null)
        const routeParams = ref(route.params.editPayment)
        const theContributionItems = ref([])
        const templateDisplay = ref(false)
        const displayResponsive = ref(false)
        const subAccounts = ref([])


        const addContribution = () => {
            newContribution.value.payment.push({
                financialContribution: {}
            })
            console.log(newContribution.value)
        }



        const getContributionItems = async() => {
            // To get from store use useStore, to save to store use the path that leads to store
            const store = useStore()
            console.log(store.getters['contributions/contributionItems'])
            let storedItems = store.getters['contributions/contributionItems']
            if (storedItems.length > 0 ) {
                contributionItems.value = store.getters['contributions/contributionItems']
            }   else {
                    try {
                        const { data } = await axios.get("/api/financials/contributions/items");
                        console.log(data)
                        contributionItems.value = data
                    } catch (error) {
                        finish()
                        console.log(error)
                    }
            }
        }
        getContributionItems()


        const getBanks = () => {
            axios.get('/api/Financials/GetBanks')
                .then(res => {
                console.log(res)
                nigerianBanks.value = res.data
                getEditPayment()
                })
                .catch(err => {

                    console.log(err)
                })

        }
        getBanks()

        const getGateWays = () => {
                axios.get('/api/Financials/GetPaymentGateways')
                .then(res => {
                    console.log(res)
                    paymentGateWaysDb.value = res.data.map(i => {
                        return {
                            countryCoverageArea: i.countryCoverageArea,
                            id: i.id,
                            isActive: i.isActive,
                            isSubAccountSupported: i.isSubAccountSupported,
                            name: i.name,
                            isChecked: false
                        }
                    })
                finish()
                })
                .catch(err => {
                    finish()
                    console.log(err)
                    ElMessage({
                        type: "info",
                        message: "Please ensure you have a strong internet connection and reload the  page",
                        duration: 3000,
                        })
                })
            }
        //   }
        getGateWays()

    const showConfirmModal = (id, index) => {
        ElMessageBox.confirm(
        "Are you sure you want to proceed?",
        "Confirm delete",
        {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "error",
        }
      )
        .then(() => {
          deleteContribution(id, index);
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "Delete canceled",
          });
        });
    };

    const deleteContribution = (id, index) => {
        console.log(id)
      if (id) {
          axios
        .delete(`/mobile/v1/PaymentForm/contributionItem?contributionItemID=${id}`)
        .then((res) => {
          console.log(res);
          newContribution.value.payment.splice(index, 1)
          if (res.data) {
             ElMessage({
              type: "success",
              message: "Contribution item deleted",
              duration: 3000,
            });
          } else {
             ElMessage({
              type: "warning",
              message: "Delete Failed",
              duration: 3000,
            })
          }
        })
        .catch((err) => {
          finish()
          if (err.response) {
             ElMessage({
              type: "warning",
              message: err.response,
              duration: 3000,
            })
          } else if (err.toString().toLowerCase().includes('network error')) {
            ElMessage({
              type: "warning",
              message: "Network Error, Please Ensure you have a strong internet connection",
              duration: 3000,
            })
          } else if (err.toString().toLowerCase().includes('timeout')) {
            ElMessage({
              type: "warning",
              message: "Request Delayed,Make sure you have a strong internet connection",
              duration: 3000,
            })
          } else {
             ElMessage({
              type: "warning",
              message: "Delete Failed",
              duration: 3000,
            })
          }
        console.log(err)
        });
      } else {
          newContribution.value.payment.splice(index, 1)
          ElMessage({
              type: "success",
              message: "Contribution item deleted",
              duration: 3000,
            });
      }
    };

        // const resolveCustomerDetail = async() => {
        //     console.log(accountNumber.value)
        //     loading.value = true
        //     try {
        //         let header = { headers: { Authorization: `Bearer ${process.env.VUE_APP_PAYSTACK_SECRET_KEY}` }}
        //         console.log(header, "header");

        //         let { data } = await axio.get(`https://api.paystack.co/bank/resolve?account_number=${accountNumber.value}&bank_code=${selectedBank.value.code}`, header)
        //         console.log(data)
        //     }
        //     catch (error) {
        //         finish()
        //         console.log(error)
        //         loading.value = false

                
        //     }
            
        //     try {

        //         let { data } = await axio.post(`https://api.ravepay.co/flwv3-pug/getpaidx/api/resolve_account`, {
        //             recipientaccount: accountNumber.value,
        //             destbankcode: selectedBank.value.code,
        //             PBFPubKey: process.env.VUE_APP_FLUTTERWAVE_PUBLIC_KEY_LIVE
        //         })
        //         console.log(data)
        //         accountName.value = data.data.data.accountname
        //         disabled.value = false

        //         loading.value = false

        //         if (data.data.data.responsemessage.toLowerCase().includes('sorry')) {
        //             ElMessage({
        //                 type: "warning",
        //                 message: data.data.data.responsemessage,
        //                 duration: 3000,
        //             });
        //         }   else {
        //             ElMessage({
        //                 type: "success",
        //                 message: "Account Check Successful",
        //                 duration: 3000,
        //             });
        //         }

        //     }
        //     catch (error) {
        //         finish()
        //         console.log(error)

        //         loading.value = false
        //             if (!accountNumber.value || accountNumber.value === "") {
        //                 ElMessage({
        //                 type: "warning",
        //                 message: "Please enter your account number",
        //                 duration: 3000,
        //             });
        //             }   else {
        //                  ElMessage({
        //                 type: "error",
        //                 message: "Please check your banks details again",
        //                 duration: 3000,
        //                 });
        //             }
        //         // }

                
        //     }
        // }


        const toggleCheckBox = (item) => {
            item.isChecked = !item.isChecked

            if (item.isChecked && paymentGateWays.value.findIndex(i => i.id === item.id) < 0) {

                if (item.name.toLowerCase().includes('flutterwave')) {
                        try {
                            axios.get(`/api/PaymentForm/subaccounts?accountNumber=${accountNumber.value}`).then(res => {
                                if (res.data.length > 0) {
                                    ElMessageBox.confirm(
                                                `This account details has been recorded with Flutterwave as ${res.data[0].meta[0].meta_name}, Do you want to use it?`,
                                                // "Confirm delete",
                                                {
                                                confirmButtonText: "OK",
                                                cancelButtonText: "Cancel",
                                                type: "info",
                                                }
                                            )
                                                .then(() => {
                                                ElMessage({
                                                    type: "success",
                                                    message: "Confirmed, The selected acount is now in use",
                                                    duration: 3000,
                                                    });
                                                    item.subAccountID = res.data[0].subaccount_id
                                                    paymentGateWays.value.push(item)
                                                })
                                                .catch(() => {
                                                ElMessage({
                                                    type: "info",
                                                    message: "Please enter another bank account details to enable Flutterwave subaccount integration",
                                                    duration: 3000,
                                                });
                                                    accountNumber.value = ""
                                                    accountName.value = ""
                                                    selectedBank.value = new Object()
                                                });
                                }   else {
                                    paymentGateWays.value.push(item)
                                }
                            })                   
                        }
                        catch (err) {
                            console.log(err)
                        }
                    }   else {
                        paymentGateWays.value.push(item)
                    }
            } else {
                paymentGateWays.value = paymentGateWays.value.filter(i => {
                    return i.id !== item.id
                })
                    removePaymentGatewayIDs.value.push(item.id)
            }
        }

        const filteredBanks = computed(() => {
            if (!bankSearchText.value) return nigerianBanks.value;
            return nigerianBanks.value.filter((i) =>
                i.name.toLowerCase().includes(bankSearchText.value.toLowerCase())
            );
            });
            const setBank = (item) => {
                bankSearchText.value = item.name;
                selectedBank.value = item;
            };

        const saveAndContinue = async() => {
            loadingSave.value = true

            let removeEmptyObj = newContribution.value.payment.filter((i) => {
                return Object.keys(i.financialContribution).length > 0
                })

            let paymentForm = {
                name: newContribution.value.name,
                bankCode: selectedBank.value.code,
                accountName: accountName.value,
                accountNumber: accountNumber.value,
                isActive: isActive.value,
                contributionItems: removeEmptyObj.map(i => {
                    let id = i.financialContribution.id;
                    return { financialContributionID: id }
                }),
                 paymentGateWays: paymentGateWays.value.map(i => {
                     return {
                        paymentGateWayID: i.id,
                        subAccountID: i.subAccountID,
                        updateId: i.updateId
                     }
                 })
            }
            emit('form-details', paymentForm)
            console.log(newContribution.value.payments)

            console.log(paymentForm)
                console.log(route.fullPath)
                if (route.fullPath === "/donationsetup") {
                        console.log('PaymentCreated')
                        emit('payment-form', true)
                    }

            if (!route.params.editPayment) {

                try {
                    const res = await axios.post("/api/PaymentForm/newpaymentform", paymentForm);
                    console.log(res)
                    loadingSave.value = false
                    store.dispatch('contributions/paymentData', res.data)


                    if (route.fullPath === "/tenant/payments") {
                        store.dispatch("payment/getPayments").then(() => {
                           router.push({ name: 'PaymentOption', params: { paymentId: res.data.id } })
                        });
                        // router.push({ name: 'PaymentOption', params: { paymentId: res.data.id } })
                    } else if (route.fullPath === "/donationsetup") {
                         store.dispatch("payment/getPayments").then(() => {
                          router.push({ name: 'OnboardingSuccessful' })
                        });
                        // router.push({ name: 'OnboardingSuccessful' })
                    }
                    finish()
                }
                catch (err) {
                    finish()
                    console.log(err)
                    loadingSave.value = false
                }
            } else {
                paymentForm.contributionItems = newContribution.value.payment.map(i => {
                    return { financialContributionID: i.financialContribution.id }
                }),
                paymentForm.id = route.params.editPayment
                paymentForm.removeContributionIDs = removeContributionIDs.value
                paymentForm.removePaymentGatewayIDs = removePaymentGatewayIDs.value
                try {
                    const res = await axios.put(`/api/PaymentForm/update`, paymentForm);
                    console.log(res)
                    loadingSave.value = false
                    store.dispatch('contributions/paymentData', res.data)
                    router.push({ name: 'PaymentOption', params: { paymentId: res.data.id } })
                    finish()
                }
                catch (err) {
                    console.log(err)
                    loadingSave.value = false
                    finish()
                }
            }
        }
        const selectContribution = (item, index) => {
                newContribution.value.payment[index].financialContribution = item
        }

        const active = (payload) => {
            isActive.value = payload
        }

        const getEditPayment = async() => {
            loadingEdit.value = true
            if (route.params.editPayment) {
                try {
                    const res = await axios.get(`/api/PaymentForm/GetOne?paymentFormID=${route.params.editPayment}`);
                    console.log(res)
                    loadingEdit.value = false
                    newContribution.value.name = res.data.name
                    theContributionItems.value = res.data.contributionItems
                    newContribution.value.payment = res.data.contributionItems.map(i => i)
                    accountNumber.value = res.data.accountNumber
                    accountName.value = res.data.accountName
                    bankSearchText.value = nigerianBanks.value.find(i => i.code == res.data.bankCode).name, 
                    isActive.value = res.data.isActive
                    paymentGateWays.value = res.data.paymentGateWays.map(i => {
                        return {
                            name: i.paymentGateway.name,
                            countryCoverageArea: i.paymentGateway.countryCoverageArea,
                            id: i.paymentGateway.id,
                            isActive: i.paymentGateway.isActive,
                            isSubAccountSupported: i.paymentGateway.isSubAccountSupported,
                            subAccountID: i.subAccountID,
                            updateId: i.updateId
                        }
                    })
                    console.log(newContribution.value.payment)

                    disabled.value = false
                }
                catch (err) {
                    console.log(err)
                    finish()
                    ElMessage({
                        type: "error",
                        message: "Network Error, Please ensure you have a strong internet connection",
                        duration: 3000,
                    });
                }
            }else {
                isActive.value = true
            }
        }

        const gateways = computed(() => {
            // if (!route.params.editPayment) return paymentGateWaysDb.value;
            const x = paymentGateWaysDb.value.filter(i => {
                const index = paymentGateWays.value.findIndex(j => j.id === i.id);
                if (index >= 0) {
                    // alert(j)
                    // console.log(i)
                    i.isChecked = true;
                }

                // alert(i)
                return i.name.toLowerCase().includes("paystack") || i.name.toLowerCase().includes("flutterwave")
            })

            return x;
        })

        const newConItems = (payload) => {
            console.log(payload)
            contributionItems.value.push(payload)
            newContribution.value.payment[newContribution.value.payment.length - 1] = payload
        }


        const toggleFirstTemplate = () => {
                firstTemplate.value = !firstTemplate.value
                secondTemplate.value = false
                thirdTemplate.value = false
            }

            const toggleSecondTemplate = () => {
                secondTemplate.value = !secondTemplate.value
                firstTemplate.value = false
                thirdTemplate.value = false
            }

            const toggleThirdTemplate = () => {
                thirdTemplate.value = !thirdTemplate.value
                firstTemplate.value = false
                secondTemplate.value = false
            }

            const togglePopup = (e) => {
                if (e.target.localName == "img") {
                    booleanModal.value = true
                    sourceModal.value = e.target.src
                }   else {
                    booleanModal.value = true
                    sourceModal.value = e.target.parentElement.previousElementSibling.currentSrc
                }
                // console.log(e)
            }

            const closeModal = (payload) => {
                booleanModal.value = payload
            }

            const toggleTemplate = () => {
                templateDisplay.value = !templateDisplay.value
            }

            const toggleDisplayModal = (payload) => {
                displayResponsive.value = payload
            }

            const closeResponsive = () => {
            displayResponsive.value = false;
                router.push({ name: "ChartOfAccount" })
            }

            const getSubAccounts = async() => {
                try {
                    let { data } = await axios.get("/api/PaymentForm/subaccounts")
                    console.log(data)
                    subAccounts.value = data.filter(i => i.meta[0].meta_value !== null)
                    console.log(subAccounts.value)
                }
                catch (err) {
                    console.log(err)
                }
            }
            getSubAccounts()

        return {
            contributionItems, newContribution, addContribution, lgAndUp, mdAndUp, xlAndUp,filteredBanks, setBank,
            deleteContribution, nigerianBanks, selectedBank, bankSearchText,
            accountNumber, saveAndContinue, selectContribution, selectedContribution, accountName,
            accNameRef, loading, loadingSave, loadingEdit, disabled,  newConItems, firstTemplate,
            secondTemplate, thirdTemplate, toggleFirstTemplate, toggleSecondTemplate,
            toggleThirdTemplate, sourceModal, togglePopup, booleanModal, closeModal,
            paymentGateWaysDb, paymentGateWays, toggleCheckBox, gateways, removeContributionIDs,
            removePaymentGatewayIDs, isActive, active, routeParams, theContributionItems,
            templateDisplay, toggleTemplate, showConfirmModal, displayResponsive, toggleDisplayModal, closeResponsive,subAccounts
        }
    }
}
</script>

<style scoped>
.form {
  padding: 25px;
}

.btnIcons {
  width: 140px;
  height: 35px;
  color: #136acd;
  background-color: #dde2e6;
  border-radius: 40px;
  border: none;
}

.page-header {
  font: normal normal 800 29px Nunito sans;
}

.contri-item {
    padding: 20px 0 0 0;
    font: normal normal 700 20px Nunito Sans;
}

.disabled-bg {
    background: #136acda8;
    cursor: not-allowed;
}

.dropdown-menu {
    max-height: 300px;
    overflow: auto;
}

.check-box {
  border: 2px solid #136acdcc;
  min-width: 20px;
  max-width: 20px;
  height: 20px;
  /* border-radius: 50%; */
  margin-top: -1px;
}

.check-box .child {
  /* border: 2px solid red; */
  /* display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #136acd;
  position: relative;
  left: 3px;
  top: -3px; */
  margin-top: -8px;
}


.img-row img {
    box-shadow: 0px 3px 6px #2c28281c;
    /* border: 2px solid red; */
    border-radius: 15px;
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

#myImg {
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
}

#myImg:hover {opacity: 0.7;}

.preview {
    font-size: 0.8em;
    color: #136acd;
    font-style: italic;
    cursor: pointer;
}

.header-contri {
     font-size: 20px;
     font-weight: 700;
}

.angle-icon {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    border: 1px solid  rgb(73, 73, 73);
    padding: 3px
}

.hide-tem {
    height: 0;
    overflow: hidden;
    transition: all 0.5s ease-in-out
}

.show-tem {
    height: 335px;
    overflow: hidden;
    transition: all 0.5s ease-in-out
}

.rollIcon {
    transform: rotateZ(180deg);
    transition: all 0.5s ease-in-out
}

.closeIcon {
    transform: rotateZ(0deg);
    transition: all 0.5s ease-in-out
}

</style>