<template>
    <div class="container-fluid px-0">
        <div class="row mt-1">
            <div class="col-12 col-md-4 mt-3 mt-md-0">
                <div class="row ">
                    <div @click="toggleSMS(singleBranchInfo.id)" class=" cursor-pointer col-md-11 d-flex align-items-center  justify-content-center border  rounded" style="height: 17em;">
                       <div>
                         <div class="d-flex  justify-content-center my-4 primary--text">
                            <el-icon class=" com-color " :size="40"><ChatDotRound /></el-icon>
                        </div>
                        <div class="h4 font-weight-bold text-center my-3"   >
                            Send SMS
                        </div>
                        <div class="text-center">
                            Quickly Send SMS to all in easy steps
                        </div>
                       </div>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-4 mt-4 mt-md-0">
                <div class="row">
                     <div @click="toggleEMAIL(singleBranchInfo.id)" class=" cursor-pointer col-md-11 d-flex align-items-center justify-content-center  border  rounded" style="height: 17em;">
                       <div>
                         <div class="d-flex  justify-content-center my-4 primary--text">
                            <el-icon class=" com-color " :size="40"><Message /></el-icon>
                        </div>
                        <div class="h4 font-weight-bold text-center my-3"  @click="toggleEMAIL(singleBranchInfo.id)" >
                          Send Email
                        </div>
                        <div class="text-center">
                            Quick Email to all contacts in Few Clicks
                        </div>
                       </div>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-4 mt-4 mt-md-0">
                <div class="row">
                    <div @click="displayWhatsappDrawer(singleBranchInfo)" class="cursor-pointer col-md-11 d-flex align-items-center justify-content-center  border  rounded" style="height: 17em;">
                       <div>
                         <div class="d-flex  justify-content-center my-4 primary--text">
                            <el-icon class=" com-color " :size="40"><ChatRound /></el-icon>
                        </div>
                        <div class="h4 font-weight-bold text-center my-3"  @click="displayWhatsappDrawer(singleBranchInfo)" >
                          Send Whatsapp
                        </div>
                        <div class="text-center">
                            Members can receive updates on their Whatsapp
                        </div>
                       </div>
                    </div>
                </div>
            </div>
        </div>
        <el-drawer
      v-model="showSMS"
      :size="mdAndUp || lgAndUp || xlAndUp ? '70%' : '100%'"
      direction="rtl"
    >
      <template #header>
        <h4>Send SMS</h4>
      </template>
      <template #default>
        <div>
          <smsComponent @closesidemodal="() => (showSMS = false)" />
          <!-- <smsComponent :phoneNumbers="contacts" @closesidemodal="() => showSMS = false" /> -->
        </div>
      </template>
    </el-drawer>
    <el-drawer
      v-model="showEmail"
      :size="mdAndUp || lgAndUp || xlAndUp ? '70%' : '100%'"
      direction="rtl"
    >
      <template #header>
        <h4>Send Email</h4>
      </template>
      <template #default>
        <div>
          <emailComponent @closesidemodal="() => (showEmail = false)" />
          <!-- <emailComponent :selectedGroupMembers="markedMembers" @closesidemodal="() => showEmail = false" /> -->
        </div>
      </template>
    </el-drawer>
    <el-drawer
      v-model="showWhatsapp"
      :size="mdAndUp || lgAndUp || xlAndUp ? '70%' : '100%'"
      direction="rtl"
    >
      <template #default>
        <div>
          <whatSappComponent @closesidemodal="() => (showWhatsapp = false)" />
          <!-- <emailComponent :selectedGroupMembers="markedMembers" @closesidemodal="() => showEmail = false" /> -->
        </div>
      </template>
    </el-drawer>
    </div>
</template>

<script>
import { ref, watchEffect } from "vue";
import axios from "@/gateway/backendapi";
import deviceBreakpoint from "../../../mixins/deviceBreakpoint";
// import router from "../../router";
import smsComponent from "../../groups/component/smsComponent.vue";
import emailComponent from "../../groups/component/emailComponent.vue";
import whatSappComponent from "../../groups/component/whatSappComponent.vue";
import { socket } from "@/socket";
// import { ElMessage } from "element-plus";
import swal from "sweetalert";
import AuthenticateWhatsapp from "../../../components/whatsapp/AuthenticateWhatsapp.vue";
export default {
     components: {
    whatSappComponent,
    emailComponent,
    smsComponent,
    AuthenticateWhatsapp,
  },
    setup() {

    const { lgAndUp, mdAndUp, xlAndUp } = deviceBreakpoint();
    const showSMS = ref(false);
    const showEmail = ref(false);
    const loading = ref(false);
    const showWhatsapp = ref(false);
    const singleBranchInfo = ref({});
    const sendWhatsappToMultiple = ref(false);
    const sendingwhatsappmessage = ref(false);


     const toggleSMS = (id) => {
      showSMS.value = true;
      console.log(id, "id 1");
    };
    const toggleEMAIL = (id) => {
      showEmail.value = true;
      console.log(id, "id 2");
    };

    const geSingleBranchInfo = async () => {
      const singleBranchID = localStorage.getItem("branchId");
      loading.value = true;
      try {
        let { data } = await axios.get(
          `/api/Branching/GetBranchInformation?Id=${singleBranchID}`
        );
        singleBranchInfo.value = data.returnObject;

        loading.value = false;
      } catch (error) {
        loading.value = false;
        console.log(error);
      }
    };
    geSingleBranchInfo();

    watchEffect(() => {
      socket.on("messagesent", (data) => {
        console.log(data, "status");
        // ElMessage({
        //   type: 'success',
        //   message: 'Whatsapp message sent successfully 🎉',
        //   duration: 8000
        // })

        swal(" Success", "Whatsapp message sent successfully!", "success");
        showWhatsapp.value = false;
        sendingwhatsappmessage.value = false;
      });
    });
    const displayWhatsappDrawer = (item) => {
      showWhatsapp.value = true;
      if (item) {
        // whatsappRecipient.value = item;
        sendWhatsappToMultiple.value = false;
      } else {
        // marked.value = marked.value.filter(i => i.mobilePhone).splice(0, 10)
        sendWhatsappToMultiple.value = true;
      }
    };

    return {
        lgAndUp, mdAndUp, xlAndUp,
        showSMS,
        showEmail,
        showWhatsapp,
        singleBranchInfo,
        sendingwhatsappmessage,
        loading,
        toggleEMAIL,
        toggleSMS,
        sendWhatsappToMultiple,
        displayWhatsappDrawer

    }
        
    },
}
</script>

<style scoped>

.com-color{
    background: #F7F7F7;
    border-radius: 50%;
    height: 70px;
    width: 70px;
}

</style>