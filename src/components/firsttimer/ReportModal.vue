<template>
    <div>
        <div class="container-fluid">
            <div class="row mt-4">
                <div class="col-sm-12 py-2">
                    <a class="mx-2 tab-link" :class="{'active': activeTab === 'churchplus'}" @click="changeTab('churchplus')">Churchplus</a>
                    <a class="mx-2 tab-link" :class="{'active': activeTab === 'sms'}" @click="changeTab('sms')" >SMS</a>
                    <a class="mx-2 tab-link" :class="{'active': activeTab === 'sharelink'}" @click="changeTab('sharelink')">Share link</a>
                    <div class="col-md-12 pt-2" v-if=" activeTab === 'sharelink'">
                        <span class="d-flex" @click="linkcopy">
                            <input type="text"
                            @keydown="(e) => e.preventDefault()"
                            class="form-control mr-2"
                            :value="location"
                            ref="linkShareable"
                            style="width:90%"
                            />
                            <span><i class="pi pi-copy c-pointer" style="font-size: 1.5rem"></i></span>
                        </span>
                         <Toast />
                    </div>
                </div>
            </div>
            <hr style="margin: 0">
        <div class="row" v-if="activeTab !== 'sharelink'">
            <div class="col-md-12">
                    <div class="mt-4 main-row">
                <div class="row">  
                    <div class="col-sm-4 d-flex justify-content-end align-items-center text-sm-right label-text">
                        <span>From</span>
                    </div>
                    <div class="col-sm-6 form-group">
                        <select name="" class="form-control inp" v-show="activeTab === 'churchplus'">
                            <option value="">{{ userEmail }}</option>
                        </select>
                        <select name="" class="form-control inp" v-show="activeTab === 'sms'">
                            <option value="">{{ churchName }}</option>
                        </select>
                    </div>
                    <div class="col-sm-2 text-center d-flex justify-content-center align-items-center icon-div">
                        <i class="pi pi-question-circle inp-icon my-1"></i>
                    </div>
                </div>
            </div>
            <div class="main-row">
                <div class="row" v-for="(recipient, index) in recipients" :key="index">
                    <div class="col-sm-4 d-flex justify-content-end align-items-center text-sm-right label-text">
                        <span>To</span>
                    </div>
                    <div class="col-sm-6 form-group" >
                        <input type="email" class="form-control inp"  v-model="recipient.email" name="" id="" v-show="activeTab === 'churchplus'" @input="hideErrorMessage">
                        <input type="text" class="form-control inp" v-model="recipient.phone" name="" id="" v-show="activeTab === 'sms'" @input="hideErrorMessage">
                    </div>
                    <div class="col-sm-2 text-center d-flex justify-content-center align-items-center icon-div">
                        <i class="pi pi-plus-circle inp-icon plus-icon my-1" @click="addRecipient"></i>
                        <i class="pi pi-minus plus-icon ml-1 my-1 c-pointer text-danger" @click="removeRecipient(index)" v-if="recipients.length > 1"></i>
                    </div>
                </div>
            </div>
           
            <!-- Subject -->
            <div class="main-row">
                <div class="row">
                    <div class="col-sm-4 d-flex justify-content-end align-items-center text-sm-right">
                        <span class="">Subject</span>
                    </div>
                    <div class="col-sm-6 form-group">
                        <input type="text" class="form-control border-0 inp pr-0" :class="{ 'evt-name': !subjectFieldIsActive}" :disabled="!subjectFieldIsActive" name="" :value="`Report For ${eventName}`"
                            style="margin-top: -5px"
                            ref="subject"
                        >
                    </div>
                    <div class="col-sm-2 d-flex justify-content-start align-items-center">
                        <a class="edit-sub-btn c-pointer" @click="enableSubjectField">edit</a>
                    </div>
                </div>
            </div>

            <!-- Message -->
            <div class="main-row">
                <div class="row">
                    <div class="col-sm-4 d-flex justify-content-end align-items-center text-sm-right">
                        <span class="">Message</span>
                    </div>
                    <div class="col-sm-6 form-group">
                        <textarea class="form-control" name="" id="" cols="30" rows="5" placeholder="Enter your message" v-model="message"></textarea>
                    </div>
                    <div class="col-sm-2">
                        
                    </div>
                </div>
            </div>

            <!-- Checkboxes -->
            <div class="main-row">
                <div class="row mb-5">
                    <div class="col-sm-4 d-flex justify-content-end align-items-center text-sm-right">
                        
                    </div>
                    <div class="col-sm-8 form-group" v-show="activeTab === 'churchplus'">
                        <div class="row">
                            <div class="col-sm-1">
                                <Checkbox id="binary" v-model="sendToMysef" :binary="true"/>
                            </div>
                            <div class="col-sm-10">
                                <span>Send a copy to myself at {{ userEmail }}</span>
                            </div>
                        </div>
                        <div class="row">
                        </div>
                    </div>
                    <div class="col-sm-8 form-group" v-if="activeTab === 'sms'">
                        <div class="row">
                            <div class="col-sm-1">
                                 <Checkbox id="binary" v-model="sendCopy" :binary="true"/>
                            </div>
                            <div class="col-sm-10">
                                <span>Send a copy to myself at {{ churchName }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-sm-12">
                    <hr class="hr">
                </div>
                <!-- <div class="row"> -->
                    <div class="col-md-12 text-right py-2" v-if="invalidDestination">
                        <p class="text-danger mb-0 pr-md-5">Enter at least a destination for the report</p>
                    </div>
                    <div class="col-sm-12 d-flex justify-content-end">
                        <a class="action-btn mx-2 my-1" data-dismiss="modal">Cancel</a>
                        <a class="action-btn mx-2 my-1" @click="reportPreview">Preview</a>
                        <a class="action-btn mx-2 my-1 save-action-btn mr-sm-5" @click="sendReport">Send</a>
                    </div>
                <!-- </div> -->
            </div>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
import { ref, watch } from 'vue'
import axios from "@/gateway/backendapi";
import attendanceservice from '../../services/attendance/attendanceservice';
import { useToast } from "primevue/usetoast";
import { useRoute } from "vue-router"


    
    export default {
        props: ['eventName', 'stats'],
        setup(props, { emit }) {
            const toast = useToast();
            const route = useRoute()
            const activeTab = ref("churchplus");
            const userEmail = ref("")
            const message = ref("");
            const sendToMysef = ref(false);
            const subject = ref(null);
            const invalidDestination = ref(false);
            const recipients = ref([  ])
            const churchName = ref("")
            const sendCopy = ref("")
            const attachReport = ref(false)
            const copyMyLink = ref(false);   
            const linkShareable = ref(null);
            const location = ref(window.location);
             const activityToday = ref("");

            watch(() => {
                if (props.stats) {
                    
                    message.value = attendanceservice.generateEventReportDefaultMessage(props.stats)
                }
                console.log(message.value, "Godstar")
                console.log(message.value, "Ogba")
            })

            const changeTab = (tab) => activeTab.value = tab;

            const addRecipient = () => {
                recipients.value.push({ email: ""})
                console.log(recipients);
            }

            const test = (e) => {
                console.log(e.target.value, "bool");
            }

            const hideErrorMessage = () => {
                if (invalidDestination.value) invalidDestination.value = false;
            }

           
          
            const sendReport = () => {
                if (!route.fullPath.includes("/tenant/offeringreport")) {
                    axios.get(`/api/Events/markAsSent?activityId=${props.stats.activityToday.id}`)
                    .then(res =>{
                        console.log(res)
                    }).catch(err => {
                        console.log(err)
                    })
                }
                
                const messageObj = {
                    contacts: [],
                    // contacts: recipients.value,
                    message: message.value,
                    subject: subject.value.value,
                    isoCode: isoCode.value,
                }

                if (activeTab.value === 'sms') {
                    messageObj.contacts = recipients.value;
                    messageObj.toOthers = recipients.value.map(i => i.phone).join();
                } else {
                    messageObj.contacts = recipients.value;
                }

                const validDestination = messageObj.contacts.find(i => i.phone);
                console.log(invalidDestination.value, "validDestination");
                if (activeTab.value === "sms" && !validDestination) {
                    invalidDestination.value = true;
                    return false;
                }

                if (sendToMysef.value) {
                    messageObj.contacts.push({ email: userEmail.value });
                }
                console.log(messageObj, activeTab.value)
                emit("sendreport", { data: messageObj, medium: activeTab.value });
            }

            const isoCode = ref("");
            const getUserEmail = () => {
                axios.get("/api/Membership/GetCurrentSignedInUser")
                    .then(res => {
                        console.log(res.data)
                        userEmail.value = res.data.userEmail
                        churchName.value = res.data.churchName
                        emit("get-church-name", res.data.churchName)
                        isoCode.value = res.data.isoCode
                        recipients.value.push({ email: "", phone: "" })
                    })
                    .catch(err => console.log(err))
            }
            getUserEmail()

             const linkcopy = () => {
              try {
                copyMyLink.value = true;
                const b = linkShareable.value;
                b.select();
                b.setSelectionRange(0, 200); /* For mobile devices */

                /* Copy the text inside the text field */
                document.execCommand("copy");
                toast.add({
                  severity: "info",
                  summary: "Link Copied",
                  detail: "Shareable link copied to your clipboard",
                  life: 4000,
                });
              } catch (error) {
                console.log(error);
              }
            };

            const subjectFieldIsActive = ref(false);

            const enableSubjectField = () => {
                subjectFieldIsActive.value = true;
                setTimeout(() => {
                    subject.value.focus();
                }, 100)
            }

            const removeRecipient = (index) => {
                if (recipients.value && recipients.value.length > 1) {
                    recipients.value.splice(index, 1)
                }
            }


            return { changeTab, activeTab, linkcopy, recipients, removeRecipient, addRecipient, userEmail, getUserEmail, sendReport,
                linkShareable,
                copyMyLink,
                message,
                sendToMysef,
                subject,
                test,
                invalidDestination,
                hideErrorMessage,
                churchName,
                sendCopy,
                subjectFieldIsActive,
                enableSubjectField,
                attachReport,
                location,
                activityToday 
            }
        }
    }
</script>

<style scoped>
    * {
        color: #1C252C;
        box-sizing: border-box;
        font-weight: 600;
    }

    .action-btn {
        border: 1px solid #DDE2E6;
        border-radius: 20px;
        /* padding: 6px 19px; */
        width: 98px;
        height: 39px;
        display: flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
    }

    .action-btn:hover {
        cursor: pointer;
    }

    .save-action-btn {
        background: #136ACD;
        color: #fff;
        font-weight: 700;
    }

    .tab-link {
        color: #002044;
        text-decoration: none;
        padding: .6rem;
        opacity: .5;
    }

    .tab-link:hover {
        cursor: pointer;
    }

    .tab-link.active {

        opacity: 1;
        border-bottom: 2px solid  #0F529F;
    }

    .inp {
        height: 40px;
        outline: none;
    }

    .inp-icon {
        font-size: 15px;
        color: #02172E;
        opacity: 0.81;
    }

    .plus-icon {
        color: #136ACD;
    }

    .inp-icon:hover {
        cursor: pointer;
    }

    .edit-sub-btn {
        color:  #136ACD;
        text-decoration: none;
    }

    .form-group {
        margin: 14px 0 0 0 !important;
    }

    .remove-icon:hover {
        color: red;
    }

    /* .evt-name {
        outline: none !important;
        box-shadow: none;
    } */

    input:disabled {
        background: transparent;
    }

    @media screen and (max-width: 577px) {
        .label-text,
        .icon-div {
            justify-content: left !important;
        }

        .main-row {
            margin: 20px 0 !important;
        }
    }
</style>