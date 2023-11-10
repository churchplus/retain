<template>
<div class="body-bg">
    <div class="container">
        <div class="row">
            <div class="col-12 container-top">
                <img src="../../../../assets/sendit-logo.png">
            </div>
        </div>
        <div class="row align-content-center">
            <div class="col-sm-6">
                <div class="header-label mt-3">Churchplus Child Checkin System</div>
                <div class="mt-2">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tenetur in accusamus possimus doloremque, expedita dolor? Ducimus, voluptatibus? Eaque quod voluptates magnam rem neque ipsam nihil fuga! Odit iusto laborum quos!</div>
            </div>
            <div class="col-sm-6 checkin-form container">
            <div class="event-name">Sunday Service - Mar 29, 09:00</div>
            <div class="row mt-4">
                <div class="col-sm-12 font-weight-700">Phone Number</div>
                <div class="col-sm-12 mt-2">
                    <span class="p-input-icon-left w-100">
                        <i class="pi pi-phone icon" />
                        <InputText
                            class="w-100"
                            type="number"
                            aria-required=""
                        />
                    </span>
                </div>
            </div>
            <!-- <div class="row">
                <div class="col-12 text-center mt-5">
                    <ProgressSpinner />
                </div>
            </div> -->
            <div class="row mt-4">
                <div class="col-sm-12 font-weight-700">Name</div>
                <div class="col-sm-12 mt-2">
                    <span class="p-input-icon-left w-100">
                        <i class="pi pi-users icon" />
                        <InputText
                            class="w-100"
                            type="text"
                            aria-required=""
                        />
                    </span>
                </div>
            </div>
            
            <div class="row mt-4">
                <div class="col-sm-12 font-weight-700">Email</div>
                <div class="col-sm-12 mt-2">
                    <span class="p-input-icon-left w-100">
                        <i class="pi pi-envelope icon" />
                        <InputText
                            class="w-100"
                            type="text"
                            aria-required=""
                        />
                    </span>
                </div>
            </div>
            
            <div class="row mt-4">
                <div class="col-sm-12 font-weight-700">Address</div>
                <div class="col-sm-12 mt-2">
                    <span class="p-input-icon-left w-100">
                        <i class="pi pi-map-marker icon" />
                        <InputText
                            class="w-100"
                            type="text"
                            aria-required=""
                        />
                    </span>
                </div>
            </div>
            <div class="row mt-4">
                <div class="col-6 offset-3">
                    <div class="bg-primary default-btn border-0 text-white text-center">Save and Continue</div>
                </div>
            </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import InputText from "primevue/inputtext";
import ProgressSpinner from 'primevue/progressspinner';
export default {
    setup () {
        return {
            InputText, ProgressSpinner
        }
    }
}
</script>

<style scoped>
.body-bg {
    background: #F7FAFB 0% 0% no-repeat padding-box;
    height: 100vh;
    font: normal normal normal 18px Nunito Sans
}

.header-label {
    font: normal normal 800 35px Nunito Sans;
    letter-spacing: 0px;
    color: #252A2F;
}

.checkin-form {
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 1px 35px 70px #DFE7F0F2;
    border: 1px solid #F1FAFF;
    border-radius: 32px;
    opacity: 1;
    padding: 50px
}

.event-name {
    font: normal normal bold 26px/35px Nunito Sans;
    letter-spacing: 0px;
    color: #252A2F;
    border-bottom: 1px solid #ced4da;
    padding-bottom: 20px;
}
</style>