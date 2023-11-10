<template>
    <div>
        <div class="container">
            <div class="row mt-4">
                <div class="col-sm-12 py-2">
                    <a class="mx-2 tab-link" :class="{'active': activeTab === 'churchplus'}" @click="changeTab('churchplus')">Churchplus</a>
                    <a class="mx-2 tab-link" :class="{'active': activeTab === 'sharelink'}">Share link</a>
                    <a class="mx-2 tab-link" :class="{'active': activeTab === 'sms'}" @click="changeTab('sms')">SMS</a>
                </div>
            </div>
            <hr style="margin: 0">
            <div class="mt-4 main-row">
                <div class="row">
                    <div class="col-sm-4 d-flex justify-content-end align-items-center text-sm-right label-text">
                        <span>From</span>
                    </div>
                    <div class="col-sm-6 form-group">
                        <select name="" class="form-control inp" v-show="activeTab === 'churchplus'">
                            <option value="">test@example.com</option>
                        </select>
                        <select name="" class="form-control inp" v-show="activeTab === 'sms'">
                            <option value="">0123456789</option>
                        </select>
                    </div>
                    <div class="col-sm-2 text-center d-flex justify-content-center align-items-center icon-div">
                        <i class="pi pi-question-circle inp-icon my-1"></i>
                    </div>
                </div>
            </div>
            <div class="main-row">
                <div class="row">
                    <div class="col-sm-4 d-flex justify-content-end align-items-center text-sm-right label-text">
                        <span>To</span>
                    </div>
                    <div class="col-sm-6 form-group">
                        <input type="email" class="form-control inp" name="" id="" placeholder="test@example.com" v-show="activeTab === 'churchplus'">
                        <input type="text" class="form-control inp" name="" id="" placeholder="0123456789" v-show="activeTab === 'sms'">
                    </div>
                    <div class="col-sm-2 text-center d-flex justify-content-center align-items-center icon-div">
                        <i class="pi pi-plus-circle inp-icon plus-icon my-1" @click="addRecipient"></i>
                    </div>
                </div>
            </div>
            <div class="main-row">
                <div class="row" v-for="recipient in recipients" :key="recipient.id">
                    <div class="col-sm-4 d-flex justify-content-end align-items-center text-sm-right label-text">
                        <span>From</span>
                    </div>
                    <div class="col-sm-6 form-group">
                        <input type="email" v-model="recipient.to" class="form-control inp" name="" id="" placeholder="test@example.com" v-show="activeTab === 'churchplus'">
                        <input type="text" v-model="recipient.to" class="form-control inp" name="" id="" placeholder="0123456789" v-show="activeTab === 'sms'">
                        <span class="text-danger">Enter {{ activeTab === 'sms' ? 'phone number' : 'email address' }}</span>
                    </div>
                    <div class="col-sm-2 text-center d-flex justify-content-center align-items-center icon-div">
                        <i class="pi pi-times- inp-icon my-1 remove-icon" @click="removeRecipient(recipient)"></i>
                    </div>
                </div>
            </div>
            <!-- Subject -->
            <div class="main-row">
                <div class="row">
                    <div class="col-sm-4 d-flex justify-content-end align-items-center text-sm-right">
                        <span class="">Subject</span>
                    </div>
                    <div class="col-sm-5 form-group">
                        <input type="text" class="form-control border-0 inp" name="" id="" value="Event report from Grace chapel"
                            style="margin-top: -5px"
                        >
                    </div>
                    <div class="col-sm-3 d-flex justify-content-start align-items-center">
                        <a class="edit-sub-btn">Edit subject</a>
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
                        <textarea class="form-control" name="" id="" cols="30" rows="5" placeholder="Enter you message to Grace chapel"></textarea>
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
                                <input type="checkbox" name="" id="">
                            </div>
                            <div class="col-sm-10">
                                <span>Send a copy to myself at test@example.com</span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-1">
                                <input type="checkbox" name="" id="">
                            </div>
                            <div class="col-sm-10">
                                <span>Attach the report as a PDF</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-8 form-group" v-if="activeTab === 'sms'">
                        <div class="row">
                            <div class="col-sm-1">
                                <input type="checkbox" name="" id="">
                            </div>
                            <div class="col-sm-10">
                                <span>Send a copy to myself at 08132182990</span>
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
                    <div class="col-sm-12 d-flex justify-content-end">
                        <a class="action-btn mx-2 my-1">Cancel</a>
                        <a class="action-btn mx-2 my-1">Preview</a>
                        <a class="action-btn mx-2 my-1 save-action-btn mr-sm-5">Save</a>
                    </div>
                <!-- </div> -->
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
    export default {
        setup() {
            const activeTab = ref("churchplus");
            const recipients = ref([ { phone: "01234567890", email: "test@example.com" } ])
            const count = 0;

            const changeTab = (tab) => activeTab.value = tab;

            const addRecipient = () => {
                recipients.value.push({ id: count.value })
                count.value = count.value + 1;
            }
            const removeRecipient = (rep) => {
                const recipient = recipients.value.find(i => i.id === rep.id)
                const index = recipients.value.indexOf(recipient);
                recipients.value.splice(index, 1);
            }

            return { changeTab, activeTab,  recipients, removeRecipient, addRecipient }
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
    }

    .form-group {
        margin: 14px 0 0 0 !important;
    }

    .remove-icon:hover {
        color: red;
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