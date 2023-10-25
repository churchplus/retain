<template>
  <div :class="{ 'container-slim': lgAndUp || xlAndUp }" class="container-top h-100">
    <div class="d-flex flex-column flex-md-row justify-content-md-between botom mb-4">
      <div class=" c-pointer" @click="firttimerDetail">
        <div class="   head-text">First Timers</div>
        <div class="" :class="{ baseline: showFirsttimer, 'hide-base': !showFirsttimer }"></div>
      </div>
      <div class=" c-pointer" @click="newConvertDetail">
        <div class="  head-text">New Convert</div>
        <div class="" :class="{
          baselinetwo: showNewConvert,
          'hide-basetwo': !showNewConvert,
        }"></div>
      </div>
    </div>
    <div class="d-flex flex-column flex-md-row justify-content-md-end" v-if="showFirsttimer">
      <!-- <div class="head-text">
        <div>First Timers Analytics
        </div>
      </div> -->
      <div class="mt-3 mt-md-0 d-flex flex-sm-nowrap flex-wrap ">
        <el-button class="header-btn secondary-button w-100" @click="importFirstTimer" round>Import</el-button>
        <router-link :to="{ name: 'AddFirstTimer' }" class="no-decoration w-100">
          <el-button :color="primarycolor" class=" ml-sm-2 ml-0 mt-2 mt-sm-0 w-100 header-btn" round>Add First Timers</el-button>
        </router-link>
      </div>
    </div>
    <div v-if="showNewConvert" class="d-flex flex-column flex-md-row justify-content-md-end">
      <!-- <div class="head-text">
        <div>New Convert</div>
      </div> -->
      <div class="mt-3 mt-md-0 d-flex flex-sm-nowrap flex-wrap">
        <el-button class="header-btn secondary-button w-100" @click="importNewConvert" round>Import</el-button>
        <router-link :to="{ name: 'AddNewConvert' }" class="text-decoration-none w-100">
          <el-button :color="primarycolor" class="ml-sm-2 ml-0 mt-2 mt-sm-0 w-100  header-btn" round
            >Add New Convert</el-button
          >
        </router-link>
      </div>
    </div>
    <div class="row" v-if="showFirsttimer">
      <div class="col-md-2  ">
        <div class="font-weight-bold py-md-2 mt-4">QR Code</div>
        <div class=" image" @click="getQrCode" >
          <img
            src="../../assets/group2.svg"
            alt="First Timer image"
          />
        </div>
      </div>
      <div class="col-md-10 pl-0 ">
        <div class="font-weight-bold py-md-2 mt-4">Share the link to your first timers to enable them to add their
          details to your
          church.</div>
        <div class="p-inputgroup form-group mt-1">
          <el-input v-model="firstTimerLink" placeholder="Click the copy button when the link appears" ref="selectedLink"
            class="input-with-select w-100">
            <template #append>
              <el-button @click="copylink">
                <el-icon>
                  <CopyDocument />
                </el-icon>
              </el-button>
            </template>
          </el-input>
        </div>
      </div>
    </div>
    <div class="row" v-if="showNewConvert">
      <div class="col-md-2  ">
        <div class="font-weight-bold py-md-2 mt-4">QR Code</div>
        <div class=" image" @click="getQrCode" >
          <img
            src="../../assets/group2.svg"
            alt="First Timer image"
          />
        </div>
      </div>
      <div class="col-md-10 pl-0 ">
        <div class="font-weight-bold py-md-2 mt-4">Share the link to your new converts to enable them to add their
          details to your
          church.</div>
        <div class="p-inputgroup form-group mt-1">
          <el-input v-model="newConvertLink" placeholder="Click the copy button when the link appears" ref="selectedLink"
            class="input-with-select w-100">
            <template #append>
              <el-button @click="copylink2">
                <el-icon>
                  <CopyDocument />
                </el-icon>
              </el-button>
            </template>
          </el-input>
        </div>
      </div>
    </div>
    <div class="d-flex flex-column flex-md-row justify-content-md-center">
      <el-icon v-if="( loading )" class="is-loading" :size="30">
        <Loading />
      </el-icon>
    </div>
    <el-dialog v-model="displayModal" title="First Timers to import from file"
      :width="mdAndUp || lgAndUp || xlAndUp ? `50%` : `90%`" align-center>
      <div class="container">
        <div class="row">
          <div class="col-3 font-weight-700">Name</div>
          <div class="col-4 font-weight-700">Email</div>
          <div class="col-2 font-weight-700">Gender</div>
          <div class="col-2 font-weight-700">Phone Number</div>
        </div>
        <div class="row" v-for="(item, index) in firstTimerData" :key="index">
          <div class="col-3">{{ item.firstName ? item.firstName : "" }} {{ item.lastName ? item.lastName : "" }}</div>
          <div class="col-4">{{ item.email }}</div>
          <div class="col-2">{{ item.gender }}</div>
          <div class="col-2">{{ item.phoneNumber }}</div>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button class="secondary-button" @click="displayModal = false" round>Cancel</el-button>
          <el-button :color="primarycolor" :loading="allGroupLoading" @click="addToFirstTimers" round>
            Save
          </el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog v-if="showFirsttimer" v-model="QRCodeDialog" title="" :width="mdAndUp || lgAndUp || xlAndUp ? `30%` : xsOnly ? `90%` : `70%`" class="QRCodeDialog" align-center>
        
        <div class="d-flex align-items-center flex-column" >
          <h4 class="text-capitalize font-weight-bold"> First Timers QR Code For Registration</h4>
        </div>
        <div class=" d-flex justify-content-center "  >
            <div class="img-wrapper  " >
                <img  v-if="qrCode" :src="qrCode" class="image-wrapper w-100"  />
            </div>
        </div>
    </el-dialog>
    <el-dialog v-if="showNewConvert" v-model="QRCodeDialog" title="" :width="mdAndUp || lgAndUp || xlAndUp ? `30%` : xsOnly ? `90%` : `70%`" class="QRCodeDialog" align-center>
        
        <div class="d-flex align-items-center flex-column" >
          <h4 class="text-capitalize font-weight-bold"> New Converts QR Code For Registration</h4>
        </div>
        <div class=" d-flex justify-content-center "  >
            <div class="img-wrapper  " >
                <img  v-if="qrCode" :src="qrCode" class="image-wrapper w-100"  />
            </div>
        </div>
    </el-dialog>
    
    <div v-if="!loading && !networkError && showFirsttimer && firstTimersList && firstTimersList.length > 0" class="event-list">
      <FirstTimersList :firstTimersList="firstTimersList" :totalItems="totalItems" />
    </div>
    <div v-if="newConvertList.length > 0 && !loading && !networkError && showNewConvert" class="event-list">
      <NewConvertList :newConvertList="newConvertList" />
    </div>
    <div v-if="!loading && !networkError && showFirsttimerPage && firstTimersList && firstTimersList.length === 0" class="no-person">
      <div class="empty-img">
        <p><img src="../../assets/people/people-empty.svg" alt="" /></p>
         <p class="tip">You haven't added any First timer yet</p>
         <el-button :color="primarycolor" @click="addNewFirsttimer" class="ml-2 header-btn" round>Add First Timers</el-button>
      </div>
    </div>
    <div v-if="(newConvertList.length === 0) && !loading && !networkError " class="no-person">
      <div class="empty-img">
        <p><img src="../../assets/people/people-empty.svg" alt="" /></p>
        <p class="tip">You haven't added any New convert yet</p>
        <el-button :color="primarycolor" @click="addNewConvert"  class="ml-2 header-btn" round>Add New Convert</el-button>
      </div>
    </div>
    <div v-else-if="networkError && !loading" class="adjust-network">
      <img src="../../assets/network-disconnected.png">
      <div>Opps, Your internet connection was disrupted</div>
    </div>

    <el-skeleton class="w-100" animated v-if="loading && firstTimersList && firstTimersList.length === 0 ">
      <template #template>
        <div style="display: flex;
                align-items: center;
                justify-content: space-between;
                margin-top: 20px
              ">
          <el-skeleton-item variant="text" style="width: 240px; height: 240px" />
          <el-skeleton-item variant="text" style="width: 240px; height: 240px" />
        </div>
        <!-- <el-skeleton-item variant="text" class="w-100" style="height: 25px" :rows="10"/> -->
        <el-skeleton class="w-100 mt-5" style="height: 25px" :rows="20" animated />
      </template>
    </el-skeleton>
  </div>
</template>

<script>
import axios from '@/gateway/backendapi'
import FirstTimersList from './FirstTimersList'
import NewConvertList from './NewConvert.vue'
import { ref, inject, computed, watchEffect, onMounted } from 'vue';
import finish from '../../services/progressbar/progress'
import router from "@/router/index";
import deviceBreakpoint from "../../mixins/deviceBreakpoint";
import store from '../../store/store';
import { ElMessage, ElMessageBox } from 'element-plus'


export default {
  components: { FirstTimersList, NewConvertList },
  setup() {
    const primarycolor = inject('primarycolor')
    const firstTimersList = ref(store.getters['membership/allFirstTimers'].data)
    const totalItems = ref(store.getters['membership/allFirstTimers'].totalItems)
    const loading = ref(false)
    const tenantID = ref("")
    const selectedLink = ref(null)
    const showFirsttimer = ref(true)
    const showFirsttimerPage = ref(true)
    const showNewConvert = ref(false)
    const showNewConverPage = ref(false)
    const newConvertList = ref(store.getters['membership/allNewConverts'])
    const importFile = ref("")
    const image = ref("");
    const QRCodeDialog = ref(false)
    const displayModal = ref(false)
    const firstTimerData = ref([])
    const networkError = ref(false)
    const qrCode = ref("");
    const { mdAndUp, lgAndUp, xlAndUp, xsOnly } = deviceBreakpoint()

    const addNewFirsttimer = () => {
      router.push('/tenant/people/addfirsttimer')
    }
    const addNewConvert = () => {
      router.push('/tenant/people/addnewconvert')
    }

    const getFirstTmersList = async () => {
      try {
        loading.value = true
        store.dispatch('membership/setFirstTimerData').then(response => {
          firstTimersList.value = response.data
          totalItems.value = response.totalItems
          loading.value = false
        })
      } catch (error) {
        finish()
        if (err.toString().toLowerCase().includes("network error")) {
          networkError.value = true
        } else {
          networkError.value = false
        }
        loading.value = false
      }
    }
    

    const getAllNewConvert = async () =>{
      loading.value = true

        try{
          store.dispatch('membership/setNewConvertData').then(response => {
          newConvertList.value = response
          loading.value = false
        })
        }
        catch(err){
            finish();
        loading.value = false;
        if (err.toString().toLowerCase().includes("network error")) {
          networkError.value = true;
        } else {
          networkError.value = false;
        }

        }
    }
  //  if (newConvertList.value.length == 0) getAllNewConvert()

    const fileUpload = () => {
      importFile.value.click()
    }

    const closeModal = () => {
      displayModal.value = false
    }

    const firttimerDetail = async () => {
      showFirsttimer.value = true;
      showNewConvert.value = false;
    };

    const newConvertDetail = async () => {
      showFirsttimer.value = false;
      showNewConvert.value = true;
    };
    
    


    const imageSelected = async (e) => {
      image.value = e.target.files[0];
      const formData = new FormData();
      formData.append("file", image.value ? image.value : "")
      try {
        let { data } = await axios.post("/api/People/UploadFirstTimerFile", formData)
        if (!data.response.toString().includes('0')) {
          ElMessage({
            type: 'success',
            message: data.response,
            duration: 5000
          })
          firstTimerData.value = data.returnObject
          displayModal.value = true;
        } else {
          ElMessage({
            type: 'info',
            message: "No first timer found, download our template and add first timers before you upload",
            duration: 8000
          })
        }
      }
      catch (err) {
        finish()
        if (err.status === 404 || err.response.status === 404) {
          ElMessage({
            type: 'warning',
            message: "Upload not successful, ensure that there isn't any empty row or field and try again ",
            duration: 8000
          })
        } else if (err.toString().toLowerCase().includes("network error")) {
          ElMessage({
            type: 'warning',
            message: "Network error, please ensure that you have a network connection",
            duration: 5000
          })
        } else if (err.toString().toLowerCase().includes("timeout")) {
          ElMessage({
            type: 'warning',
            message: "Request took too long to respond, Please try again by refreshing the page",
            duration: 8000
          })
        }
      }
    };

    const addToFirstTimers = async () => {
      try {
        let { data } = await axios.post("/api/People/CreateMultipleFirstTimer", firstTimerData.value)
        displayModal.value = false
        if (data.returnObject.returnList.length > 0) {
          ElMessage({
            type: 'info',
            message: data.returnObject.createdRecord + ` There are ${data.returnObject.returnList.length} members that have been added already`,
            duration: 8000
          })
        } else {
          ElMessage({
            type: 'success',
            message: "Created successfully, " + data.createdRecord,
            duration: 5000
          })
        }
        firstTimersList.value = firstTimerData.value

      }
      catch (err) {
        finish()
        if (err.toString().toLowerCase().includes("network error")) {
          ElMessage({
            type: 'warning',
            message: "Network error, please ensure that you have a network connection",
            duration: 8000
          })
        } else if (err.toString().toLowerCase().includes("timeout")) {
          ElMessage({
            type: 'warning',
            message: "Request took too long to respond, Please try again by refreshing the page",
            duration: 8000
          })
        }
      }
    }

    const copylink = () => {
      selectedLink.value.input.setSelectionRange(0, selectedLink.value.input.value.length); /* For mobile devices */
      selectedLink.value.input.select();

      /* Copy the text inside the text field */
      document.execCommand("copy");
      ElMessage({
        showClose: true,
        message: 'Copied to clipboard',
        type: 'success',
      })
    }

    const copylink2 = () => {
      selectedLink.value.input.setSelectionRange(0, selectedLink.value.input.value.length); /* For mobile devices */
      selectedLink.value.input.select();

      /* Copy the text inside the text field */
      document.execCommand("copy");
      ElMessage({
        showClose: true,
        message: 'Copied to clipboard',
        type: 'success',
      })
    }

    const importFirstTimer = () => {
      router.push({ name: 'ImportInstruction', query: { query: 'importfirsttimer' } })
    }

    const setFirsttimer = (payload) => {
      firstTimersList.value = payload
    }
    const getUser = computed(() => {
      if (!store.getters.currentUser || (store.getters.currentUser && Object.keys(store.getters.currentUser).length == 0)) return ''
      return store.getters.currentUser
    })

     watchEffect(() => {
      if (getUser.value) {
        tenantID.value = getUser.value.tenantId
      }
    })

    const firstTimerLink = computed(() => {
      if (!tenantID.value) return ""
      return `${window.location.origin}/createfirsttimer/${tenantID.value}`
    })
    const newConvertLink = computed(() => {
      if (!tenantID.value) return ""
      return `${window.location.origin}/createnewconvert/${tenantID.value}`
    })

    const getQrCode = async () => {
      try{
        const res = await axios.get(`/api/Settings/GetQRCode?link=${window.location.origin}/createfirsttimer/${tenantID.value}`)
        QRCodeDialog.value = true
        qrCode.value = res.data
      }
      catch(error){
        console.log(error);
      }
    }
    const getQrCode2 = async () => {
      try{
        const res = await axios.get(`/api/Settings/GetQRCode?link=${window.location.origin}/createnewconvert/${tenantID.value}`)
        QRCodeDialog.value = true
        qrCode.value = res.data
      }
      catch(error){
        console.log(error);
      }
    }
      const importNewConvert = () => {
      router.push({ name: 'ImportInstruction', query: { query: 'importnewconvert' } })
    }
    onMounted(() => {
      if (newConvertList.value && newConvertList.value.length == 0)
        getAllNewConvert();
      if ((!firstTimersList.value) || (firstTimersList.value && firstTimersList.value.data && firstTimersList.value.data.length == 0))
         getFirstTmersList()
    });

    // const setLoading = (payload) => {
    //   loading.value = payload
    // }

    // const setLoaded = (payload) => {
    //   loading.value = payload
    // }

    return { firstTimersList, showNewConverPage,  showNewConverPage, totalItems, showFirsttimerPage, newConvertLink, copylink2,  importNewConvert, getQrCode2, newConvertList, QRCodeDialog, xsOnly, qrCode, getQrCode, copylink, selectedLink, tenantID, getUser, firstTimerLink,  addNewFirsttimer, addNewConvert,  newConvertDetail, firttimerDetail, showFirsttimer, showNewConvert, getFirstTmersList, loading, fileUpload, imageSelected, image, displayModal, importFile, firstTimerData, addToFirstTimers, closeModal, importFirstTimer, networkError, setFirsttimer, mdAndUp, lgAndUp, xlAndUp, primarycolor };
  },
};

</script>

<style scoped>
* {
  box-sizing: border-box;
}

.image img{
  height: 2.5rem;
}

.botom {
  border-bottom: 7px solid rgb(252, 248, 248);
  border-radius: 2px;
  position: relative;
  /* border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px; */

  /* height: 4px; */
}
.botom {
    display: flex;
    gap: 1.5rem;
  }
.baseline {
  transition: all 150ms ease-in-out;
  background-color: #136acd;
  position: relative;
  border-radius: 10px;
  height: 4px;
  top: 5px;
  left: 0px;
  /* width: 35%; */
  opacity: 1;
}

.hide-base {
  transition: all 150ms ease-in-out;
  background-color: #136acd;
  position: relative;
  border-radius: 10px;
  z-index: 175;
  height: 4px;
  top: 35px;
  left: 0px;
  opacity: 0;
}

.baselinetwo {
  transition: all 150ms ease-in-out;
  background-color: #136acd;
  position: relative;
  border-radius: 10px;
  height: 4px;
  top: 5px;
  left: 0px;
  opacity: 1;
}

.hide-basetwo {
  transition: all 150ms ease-in-out;
  background-color: #136acd;
  position: absolute;
  /* background-color: #33475b; */
  /* color: #136acd" */
  border-radius: 10px;
  /* bottom: -2.5px; */
  z-index: 175;
  height: 4px;
  top: 36px;
  left: 0px;
  width: 50%;
  opacity: 0;
}


.btn-icon {
  padding: 0 8px;
}

.no-person {
  height: 100%;
  display: flex;
  text-align: center;
}

.empty-img {
  width: 30%;
  min-width: 397px;
  margin: auto;
}

.empty-img img {
  width: 100%;
  max-width: 200px;
}

.hr {
  border: 0.8px solid #0020440a;
  margin: 0 45px;
}

.actions {
  display: flex;
}

@media(max-width: 566px) {
  /* .button {
    width: 140px;
  } */
}

@media screen and (min-width: 990px) {
  .main-body {
    width: 95%;
    /* max-width: 1021px; */
    margin: 0 auto;
  }
}

@media screen and (min-width: 1400px) {
  .main-con {
    width: 90%;
    margin: 0 auto;
  }

  .top {
    height: 90px;
  }

  .no-person {
    height: calc(100% - 90px);
  }
}

@media (max-width: 640px) {
  .top {
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  .actions {
    flex-wrap: wrap;
  }

  .events {
    font: normal normal 800 29px Nunito sans;
    padding-top: 20px;
  }
}

@media (max-width: 566px) {
  /* .button {
        width: 160px;
    } */
}

@media (max-width: 399px) {

  /* .button {
        margin-top: 10px;
    } */
}

/* Route Transition */
.btn-loading {
  display: flex;
  justify-content: space-between;
}

.fade-enter-active {
  transition: all 1s cubic-bezier(0.67, 0.01, 0.86, 0.65);
}

.fade-leave-active {
  transition: all 0.6s cubic-bezier(0.67, 0.01, 0.86, 0.65);
}

.fade-enter-from,
.fade-leave-to {
  transition: translateX(20px);
  opacity: 0;
}
</style>

