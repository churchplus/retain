<template>
<!-- v-if="churchSetupSaved -->
    <div class="container container-top">
        <div class="row">
            <div class="col-6 mt-2 col-md-3 d-flex justify-content-between align-items-center cursor-pointer" @click="showChurchSetup">
                    <div  v-if="churchSetup" :class="{ 'active-tab' : churchSetup, 'circle' : !churchSetup }">1</div>    
                    <div v-else-if="churchSetupSaved" class="success-bg"><i class="pi pi-check" style="font-weight: 900"></i></div>
                    <div v-else :class="{ 'active-tab' : churchSetup, 'circle' : !churchSetup }">1</div>    
                    <div class="font-weight-bold">Church setup</div> 
                    <hr class="hr">   
            </div>
            <div class="col-6  mt-2 col-md-3 d-flex justify-content-between align-items-center cursor-pointer" @click="showSocialMedia">
                    <div v-if="socialMedia" :class="{ 'active-tab' : socialMedia, 'circle' : !socialMedia }">2</div>    
                    <div v-else-if="socialMediaSaved" class="success-bg"><i class="pi pi-check" style="font-weight: 900"></i></div> 
                     <div v-else :class="{ 'active-tab' : socialMedia, 'circle' : !socialMedia }">2</div>
                    <div class="font-weight-bold">Social Media</div>    
                    <hr class="hr">
            </div>
            <div class="col-6  mt-2 col-md-3 d-flex justify-content-between align-items-center cursor-pointer" @click="showAppBranding">
                    <div v-if="appBranding" :class="{ 'active-tab' : appBranding, 'circle' : !appBranding }">3</div>    
                    <div v-else-if="appBrandingSaved" class="success-bg"><i class="pi pi-check" style="font-weight: 900"></i></div>
                    <div v-else :class="{ 'active-tab' : appBranding, 'circle' : !appBranding }">3</div>
                    <div class="font-weight-bold">App Branding</div>   
                    <hr class="hr"> 
            </div>
            <div class="col-6  mt-2 col-md-3 d-flex justify-content-between align-items-center cursor-pointer" @click="showOnlineDonation">
                    <div v-if="donationForm" :class="{ 'active-tab' : donationForm, 'circle' : !donationForm }">4</div>    
                    <div v-else-if="donationSaved" class="success-bg"><i class="pi pi-check" style="font-weight: 900"></i></div>
                    <div v-else :class="{ 'active-tab' : donationForm, 'circle' : !donationForm }">4</div>
                    <div class="font-weight-bold">Online Donation</div>  
            </div>
        </div>
        <div class="row">
            <div class="col-12" v-if="churchSetup">
                <ChurchSetup @saved-churchsetup="setChurchSuccessState"/>
            </div>
            <div class="col-12" v-if="socialMedia">
                <SocialMedia @saved-socialmedia="setSocialMediaSuccessState"/>
            </div>
            <div class="col-12" v-if="appBranding">
                <AppBranding @saved-appbranding="setAppBrandingSuccessState"/>
            </div>
            <div class="col-12" v-if="donationForm">
                <DonationForm @saved-donation="setDonationSuccessState"/>
            </div>
        </div>
    </div>
</template>

<script>
import { ref }  from "vue"
import ChurchSetup from "./ChurchSetUp"
import SocialMedia from "./SocialMedia"
import AppBranding  from "./AppBranding"
import DonationForm from "./DonationSetup"
import axios from "@/gateway/backendapi";
export default {
    components: {
        ChurchSetup, SocialMedia, AppBranding, DonationForm
    },
    setup () {
        const churchSetup = ref(true)
        const socialMedia = ref(false)
        const appBranding = ref(false)
        const donationForm = ref(false)
        const churchSetupSaved = ref(false)
        const socialMediaSaved = ref(false)
        const appBrandingSaved = ref(false)
        const donationSaved = ref(false)


        const showChurchSetup = () => {
            churchSetup.value = true
            socialMedia.value = false
            appBranding.value = false
            donationForm.value = false
        }
        const showSocialMedia = () => {
            churchSetup.value = false
            socialMedia.value = true
            appBranding.value = false
            donationForm.value = false
        }
        const showAppBranding = () => {
            churchSetup.value = false
            socialMedia.value = false
            appBranding.value = true
            donationForm.value = false
        }
        const showOnlineDonation = () => {
            churchSetup.value = false
            socialMedia.value = false
            appBranding.value = false
            donationForm.value = true
        }

        const setChurchSuccessState = (payload) => {
            churchSetupSaved.value = payload.tab
            churchSetup.value = payload.churchSetup
            socialMedia.value = payload.socialMedia
            appBranding.value = payload.appBranding
            donationForm.value = payload.donationForm
        }

        const setSocialMediaSuccessState = (payload) => {
            socialMediaSaved.value = payload.tab
            churchSetup.value = payload.churchSetup
            socialMedia.value = payload.socialMedia
            appBranding.value = payload.appBranding
            donationForm.value = payload.donationForm
        }

        const setAppBrandingSuccessState =  (payload) => {
            appBrandingSaved.value = payload.tab
            churchSetup.value = payload.churchSetup
            socialMedia.value = payload.socialMedia
            appBranding.value = payload.appBranding
            donationForm.value = payload.donationForm
        }

        const setDonationSuccessState = (payload) => {
            donationSaved.value = payload.tab
            churchSetup.value = payload.churchSetup
            socialMedia.value = payload.socialMedia
            appBranding.value = payload.appBranding
            donationForm.value = payload.donationForm
        }

        const getChurchProfile = () => {
            axios
        .get("/mobile/v1/Profile/GetChurchProfile")
        .then((response) => {
          console.log(response);
          if (response.data.returnObject.churchName && response.data.returnObject.phoneNumber && response.data.returnObject.address && response.data.returnObject.pastors.length > 0 && response.data.returnObject.customAbouts.length > 0) {
              churchSetupSaved.value = true
          }


          if (response.data.returnObject.churchSocialMedia.length > 0) {
            socialMediaSaved.value = true          
          }

          if (response.data.returnObject.churchAppBackgroundColor) {
              appBrandingSaved.value = true
          }

        })
        .catch((error) => {
          console.log(error);
        });
        }
        getChurchProfile()

        const getPaymentForm = () => {
      axios
        .get("/api/PaymentForm/GetAll")
        .then((res) => {
          console.log(res);
          if (res.data.length > 0) {
              donationSaved.value = true
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getPaymentForm();
        return  {
            showChurchSetup, showSocialMedia, showAppBranding, showOnlineDonation, churchSetup, socialMedia, appBranding, donationForm, churchSetupSaved, setChurchSuccessState, socialMediaSaved, setSocialMediaSuccessState, appBrandingSaved, setAppBrandingSuccessState, donationSaved, setDonationSuccessState
        }
    }
}
</script>

<style scoped>
.font {
  color: #031c39;
  font: normal normal normal 20px/27px Nunito Sans;
}
.circle {
    /* border-radius: 50%;
    background: rgba(175, 216, 238, 0.481);
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgb(20, 74, 253);
    margin-right: 10px; */

 background: rgba(175, 216, 238, 0.481);
     font-weight: 600;
    white-space: initial;
    font-size: 1rem;
    border-radius: 50%;
    padding: 0.6rem 2rem 1rem 1.3rem;
    /* width: auto; */
    outline: transparent !important;
    height: 50px;
    width: 50px;
    color: rgb(20, 74, 253);
}

.active-tab {
    /* background: rgb(0, 106, 220);
    color: #eee;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px; */

 background: rgb(0, 106, 220);
    color: #eee;
     font-weight: 600;
    white-space: initial;
    font-size: 1rem;
    border-radius: 50%;
    padding: 0.6rem 2rem 1rem 1.3rem;
    /* width: auto; */
    width: 50px;
    height: 50px;
    outline: transparent !important;
    /* max-height: 50px;
    min-width: 50px; */
}

.success-bg {
    background: rgba(0, 220, 51, 0.201);
    color: rgba(3, 120, 31, 0.729);
    /* border-radius: 50%;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px */
    font-weight: 600;
    white-space: initial;
    font-size: 1rem;
    border-radius: 50%;
    /* padding: 1rem 1.6rem 3rem 1.6rem; */
    padding: 0.6rem 2rem 1rem 1.3rem;

    /* width: auto; */
    outline: transparent !important;
    width: 50px;
    height: 50px;
}

.hr {
    width: 20%
}
</style>