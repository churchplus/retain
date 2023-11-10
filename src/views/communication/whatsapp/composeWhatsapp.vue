<template>
  <!-- <testing /> -->
  <div @click="hideEmojiWrapper">
    <div class="container">
      <!-- <div class="container" @click="closeDropdownIfOpen"> -->
      <div class="row">
        <div class="col-md-12 my-3 text-center text-md-left">
          <h4 class="font-weight-bold">Compose Whatsapp Message</h4>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12 p-0">
          <hr class="hr my-1" />
        </div>
      </div>

      <div class="row">
        <div class="col-12 p-0 col-sm-2 align-self-center">
          <span class="small-text">Send to: </span>
        </div>
        <div class="col-12 p-0 col-sm-10 form-group mb-0">
          <el-dropdown trigger="click" class="w-100">
            <div class="d-flex justify-content-between border-contribution text-dark w-100" size="large">
              <span>Select Destination</span>
              <div>
                <el-icon class="el-icon--right">
                  <arrow-down />
                </el-icon>
              </div>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item v-for="(destination, index) in possibleSMSDestinations" :key="index"
                  @click="showSection(index)">
                  <a class="no-decoration text-dark">
                    {{ destination }}
                  </a>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>

      <div class="row" v-if="sendToAll">
        <div class="col-md-2"></div>
        <div class="col-md-10 px-0">
          <span>
            <input class="form-control dropdown-toggle my-1 px-1 small-text" type="text" id="dropdownMenu"
              value="All Contacts" disabled />
            <span class="close-allcontacts c-pointer"
              @click="(sendToAll = false), (selectedGroups = selectedGroups.filter(i => i.data !== 'membership_00000000-0000-0000-0000-000000000000')), (getMemberPhoneNumber())"><i
                class="pi pi-times"></i></span>
          </span>
        </div>
      </div>
      <div class="row my-2" v-if="groupSelectionTab">
        <div class="pr-0 col-md-2 align-self-center">
        </div>
        <div class="px-0 col-md-10 form-group mb-0">
          <el-select v-model="groupMultipleIDs" placeholder="Select group" class="group-category w-100"
            @remove-tag="removeTag" filterable multiple>
            <el-option-group v-for="(group, index) in categories" :key="group" :label="group">
              <el-option v-for="(item, indx) in allGroups[index]" :key="item.id" :label="item.name" :value="item.id"
                @click="selectGroup(item.category, item.id, item.name, index, indx)" />
            </el-option-group>
          </el-select>
        </div>
      </div>





      <!-- <el-select-v2  
      v-if="categories"
        v-model="groupMultipleIDs"
        
        placeholder="Please select"
        style="width: 240px"
        filterable
        multiple
      /> -->

      <!-- <div class="row mb-2" v-if="groupSelectionTab">
        <div class="col-md-2"></div>
        <div class="col-md-10 px-0 grey-rounded-border"> -->
      <!-- <ul class="d-flex flex-wrap pl-1 mb-0 dd-item small-text" @click="() => groupSelectInput.focus()">
            <li style="list-style: none; min-width: 100px" v-for="(group, index) in selectedGroups" :key="index"
              class="email-destination d-flex justify-content-between m-1">
              <span>{{ group.name }}</span>
              <span class="ml-2 remove-email" @click="removeGroup(index)">x</span>
            </li>
            <li style="list-style: none" class="">
              <input type="text" class="border-0 dd-item" ref="groupSelectInput" :class="{
                'w-100': selectedGroups.length === 0,
                'minimized-input-width': selectedGroups.length > 0,
              }" @focus="showGroupList" @click="showGroupList" style="padding: 0.5rem" :placeholder="`${selectedGroups.length > 0 ? '' : 'Select groups'
  }`" />
            </li>
          </ul> -->
      <!-- <div class="col-md-12 px-2 select-groups-dropdown dd-item pt-2" v-if="groupListShown">
            <div class="row dd-item" v-if="categories.length === 0">
              <div class="col-md-12 dd-item">
                <p class="small-text">No groups yet</p>
              </div>
            </div>
            <div class="row dd-item" v-for="(category, index) in categories" :key="index">
              <div class="col-md-12 dd-item" v-if="allGroups[index].length > 0">
                <div class="row dd-item">
                  <div class="col-md-12 dd-item">
                    <h6 class="text-uppercase dd-item font-weight-bold">
                      {{ category }}
                    </h6>
                    <a class="dropdown-item px-1 c-pointer dd-item small-text" v-for="(group, indx) in allGroups[index]"
                      @click="
                        selectGroup(
                          group.category,
                          group.id,
                          group.name,
                          index,
                          indx
                        )
                        " :key="indx">
                      {{ group.name }}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div> -->
      <!-- </div>
      </div> -->

      <div class="row my-2" v-if="whatsappGroupSelectionTab">
        <div class="col-md-2"></div>
        <div class="col-md-10 px-0">
          <el-select-v2 v-model="userWhatsappGroupsId"
            :options="userWhatsappGroups.map(i => ({ value: i.id.user, label: i.name }))"
            placeholder="Select whatsapp group" size="large" class="w-100" filterable multiple />
          <el-icon class="is-loading" v-if="whatsappGroupsLoading">
            <Loading />
          </el-icon>
        </div>
      </div>

      <div class="row mt-2" v-if="membershipSelectionTab">
        <div class="col-md-2"></div>
        <div class="col-md-10 pl-0 grey-rounded-border">


          <el-dropdown trigger="click" class="w-100">
            <span class="el-dropdown-link w-100">
              <ul class="d-flex flex-wrap px-1 mb-0 w-100">
                <li style="list-style: none; min-width: 100px" v-for="(member, indx) in selectedMembers" :key="indx"
                  class="email-destination d-flex justify-content-between m-1">
                  <span>{{ member.name }}</span>
                  <span class="ml-2 remove-email" @click="removeMember(indx)">
                    <el-icon>
                      <CircleClose />
                    </el-icon></span>
                </li>
                <li style="list-style: none">
                  <input type="text" class="border-0 m-dd-item text" ref="memberSelectInput" @input="searchForPerson"
                    :class="{
                      'w-100': selectedMembers.length === 0,
                      'minimized-input-width': selectedMembers.length > 0,
                    }" @focus="showMemberList" @click="showMemberList" v-model="searchText" style="padding: 0.5rem"
                    :placeholder="`${selectedMembers.length > 0 ? '' : 'Select from membership database'
                      }`" />
                </li>
              </ul>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item v-for="(member, index) in memberSearchResults" :key="index"
                  @click="selectMember(member, index)">{{ member.name }}</el-dropdown-item>
                <el-dropdown-item v-if="memberSearchResults.length === 0 && searchText.length >= 3 && !loading">No match
                  found</el-dropdown-item>
                <el-dropdown-item divided>
                  <el-icon class="is-loading mr-1" v-if="loading">
                    <Loading />
                  </el-icon>
                  Enter 3 or more characters
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>




      <!-- Enter phone numbers -->
      <div class="col-md-12 my-1 px-0" v-if="phoneNumberSelectionTab">
        <div class="row">
          <div class="col-md-2"></div>
          <div class="col-md-10 py-2 px-0">
            <div class="d-flex flex-wrap">
              <el-tag class="mx-1" size="large" closable v-for="(item, index) in allSelectedNumbers" :key="index"
                @close="(allSelectedNumbers.splice(index, 1)), (toOthers.splice(index, 1)), (getMemberPhoneNumber())">{{
                  item }}</el-tag>
              <!-- <div class="multiple_numbers mr-2 mt-2 flex" v-for="(item, index) in allSelectedNumbers" :key="index">
                {{ item }}
                <el-icon class="c-pointer ml-2" @click="(allSelectedNumbers.splice(index, 1)),(toOthers.splice(index, 1)),(getMemberPhoneNumber())">
                  <CircleClose />
                </el-icon>
              </div> -->
            </div>
            <vue-tel-input style="height: 40px" class="input-width mt-3" v-model="phoneNumber"
              mode="international"></vue-tel-input>
            <el-button class="mt-2" type="primary"
              @click="(allSelectedNumbers.push(phoneNumber.replaceAll(' ', '').trim())), (toOthers.push(phoneNumber.replaceAll(' ', '').trim())), (getMemberPhoneNumber()), (phoneNumber = '')"
              plain>
              <el-icon>
                <CirclePlusFilled />
              </el-icon>&nbsp;Add
            </el-button>
            <div><code
                style="color: black;"><small>NB: Make sure you click the add button to include the number to the tray of recipient numbers.</small></code>
            </div>
          </div>
        </div>
      </div>

      <!-- Start upload contact -->
      <div v-if="contactUpload" class="row my-1">
        <div class="col-sm-2"></div>
        <div class="col-sm-10 px-0 grey-rounded-border p-2">
          <div class="d-flex justify-content-between">
            <input type="file" class="form-control-file" @change="uploadFile">
            <div><i class="pi pi-times mr-2 c-pointer" @click="() => contactUpload = false"></i></div>
          </div>
          <div class="mt-1"><a href="/files/Upload_Contact Template.csv"
              class="template-text text-decoration-none font-weight-bold" download>Download template</a></div>
        </div>
      </div>

      <div class="row mt-1" v-if="phoneNumberSelectionTab || membershipSelectionTab || groupSelectionTab
        ">
        <div class="col-md-12 pr-0">
          <hr class="hr my-1" />
        </div>
      </div>


      <div class="row">
        <div class="col-md-2 p-0">
          <span class="font-weight-600 small-text">Message: </span>
        </div>
        <div class="col-md-10 px-0">
          <!-- <textarea rows="10" class="text-area my-2 small-text" v-model="editorData"></textarea> -->
          <el-input v-model="editorData" :rows="10" class="w-100 my-2" type="textarea"
            placeholder="Type your message ..." />
          <div><span class="font-weight-bold">NB:</span> To personalise your message, type <span
              class="font-weight-bold">#name#</span> where you want the recipient's name to appear in your message content
          </div>
          <div class="d-flex align-items-start mt-3">
            <img src="../../../assets/smiling-face.png" width="20" class="c-pointer emoji-wrapper"
              @click="displayEmoji = !displayEmoji" />
            <transition name="el-fade-in-linear">
              <VuemojiPicker v-show="displayEmoji" @emojiClick="handleEmojiClick" class="mt-2 emoji-wrapper "
                style="position: absolute; z-index: 1000" />
            </transition>

            <!-- accept="image/*"  -->
            <el-upload class="upload-demo" multiple :limit="1" :on-change="chooseFile" :on-remove="handleRemove"
              :auto-upload="false">
              <el-icon class="ml-2" style="font-size: 20px; color: #7d7d7d;">
                <Paperclip />
              </el-icon>
            </el-upload>
          </div>

          <div class="row align-items-center">
            <div class="col-2">
              <el-progress type="circle" :percentage="chunkProgress" :width="60" v-if="chunkProgress > 0" />
            </div>
            <div class="col-10">
              <img :src="selectedFileUrl" v-show="fileImage" class="mt-2" style="width: 50%" />
              <audio ref="audioPlayer" controls class="mt-2" style="width: 100%;" v-show="fileAudio">
                <source src="" type="audio/mpeg">
                Your browser does not support the audio element.
              </audio>
              <video ref="videoPlayer" style="width: 100%" height="240" controls v-show="fileVideo">
                <source src="" />
                <!-- <source src="movie.mp4" type="video/mp4"> -->
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </div>

      <div class="row mt-4 mb-5">
        <!-- <div class="col-md-12">
          <p class="mb-1 text-danger text-right font-weight-700" v-if="invalidDestination">
            Please select destination
          </p>
          <p class="mb-1 text-danger text-right font-weight-700" v-if="invalidMessage">
            Enter your message
          </p>
        </div> -->
        <div class="w-100 mt-3 d-flex justify-content-end">
          <span>
            <el-dropdown split-button :color="primarycolor" size="large" @click="sendWhatsappMessage" class="split-button"
              :disabled="memberdataloading" trigger="click">
              Send Whatsapp message
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="whatsappScheduleDialog = true">Schedule</el-dropdown-item>
                  <!-- <el-dropdown-item >Save as draft</el-dropdown-item> -->
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            <!-- <el-button  round>Send Whatsapp
              message</el-button> -->
          </span>
        </div>
      </div>
    </div>

    <!-- Schedudle Whatsapp modal -->
    <el-dialog v-model="whatsappScheduleDialog" title=""
      :width="mdAndUp || lgAndUp || xlAndUp ? `50%` : xsOnly ? `90%` : `70%`" align-center class="p-4">
      <div class="row">
        <div class="s-18 font-weight-bold">Select date and time to schedule your message</div>
        <input type="datetime-local" class="form-control my-3" placeholder="Select date and time"
          v-model="scheduledWhatsappDate" />
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="whatsappScheduleDialog = false" class="secondary-button" round>Cancel</el-button>
          <el-button :color="primarycolor" :loading="scheduleloading" @click="scheduleWhatsappMessage" round>
            Schedule
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { computed, onMounted, ref, watchEffect, inject } from "vue";
import composeService from "../../../services/communication/composer";
import composerObj from "../../../services/communication/composer";
import { useRoute } from "vue-router";
import store from "../../../store/store";
import axios from "@/gateway/backendapi";
import communicationService from "../../../services/communication/communicationservice";
import moment from 'moment'
import VueQrcode from 'vue-qrcode';
import swal from 'sweetalert';
import { VuemojiPicker } from 'vuemoji-picker'
import { state } from "@/socket";
import { socket } from "@/socket";
import deviceBreakpoint from "../../../mixins/deviceBreakpoint";
// import testing from "./testing.vue"
import dateFormatter from "../../../services/dates/dateformatter";

export default {
  components: {
    VueQrcode,
    VuemojiPicker,
    // testing
  },
  beforeRouteEnter(to, from, next) {
    const whatsappClientState = computed(() => {
      return store.getters["communication/isWhatsappClientReady"]
    })
    if (!whatsappClientState.value && to.fullPath == '/tenant/whatsapp') {
      next({ path: '/tenant/whatsapp/auth' })
    } else {
      next()
    }
  },
  setup() {
    const session = ref("")
    const qrCode = ref("")
    const sessionId = ref("")
    const getSessionId = ref("")
    const primarycolor = inject('primarycolor')
    const editorData = ref("");
    const editorConfig = {
      height: "800",
    };
    const userWhatsappGroupsId = ref(null)

    const possibleSMSDestinations = [
      "All contacts",
      "Select group from database",
      "Select person from membership database",
      "Phone numbers",
      "Select from Whatsapp groups",
    ];
    const allSelectedNumbers = ref([])
    const sendToAll = ref(false);
    const groupSelectionTab = ref(false);
    const membershipSelectionTab = ref(false);
    const phoneNumberSelectionTab = ref(false);
    const whatsappGroupSelectionTab = ref(false);
    const selectedGroups = ref([]);
    const displayEmoji = ref(false);
    const fileImage = ref(false);
    const fileAudio = ref(false);
    const fileVideo = ref(false);
    const audioPlayer = ref(null);
    const videoPlayer = ref(null);
    const selectedFileUrl = ref("");
    const whatsappAttachment = ref({});
    const contactUpload = ref(false)
    const multipleContact = ref({})
    const base64String = ref("")
    const fileReady = ref(false)
    const groupMembersData = ref([])
    const whatsappScheduleDialog = ref(false)
    const { mdAndUp, lgAndUp, xlAndUp, xsOnly } = deviceBreakpoint();
    const scheduledWhatsappDate = ref("")
    const chatRecipients = ref([])
    const groupMultipleIDs = ref([])
    const scheduleloading = ref(false)
    const toOthers = ref([])
    const memberdataloading = ref(false)
    const chunkProgress = ref(0)


    const clientSessionId = computed(() => {
      if (!store.getters["communication/whatsappSessionId"]) return ""
      return store.getters["communication/whatsappSessionId"]
    })
    const userWhatsappGroups = computed(() => {
      if (store.getters["communication/allClientWhatsappChat"] && store.getters["communication/allClientWhatsappChat"].length > 0) {
        whatsappGroupsLoading.value = false
        return store.getters["communication/allClientWhatsappChat"].filter(i => i.isGroup)
      } else {
        return []
      }
    })
    // const toggleGroupsVissibility = () => {
    //   groupsAreVissible.value = !groupsAreVissible.value;
    // };

    const showSection = (index) => {
      if (index === 0) (sendToAll.value = true), (selectedGroups.value.push({ data: "membership_00000000-0000-0000-0000-000000000000", name: "All Contacts" })), (getMemberPhoneNumber());
      if (index === 1) (groupSelectionTab.value = true)
      if (index === 2) (membershipSelectionTab.value = true)
      if (index === 3) (phoneNumberSelectionTab.value = true)
      if (index === 4) (whatsappGroupSelectionTab.value = true)
      // if (index === 4) contactUpload.value = true;

    };

    const getMemberPhoneNumber = async () => {
      memberdataloading.value = true
      const payload = {
        subject: "",
        message: editorData.value,
        contacts: [],
        isPersonalized: false,
        groupedContacts: selectedGroups.value.map((i) => i.data),
        isoCode: "",
        category: "",
        emailAddress: "",
        emailDisplayName: "",
        gateWayToUse: "",
        toOthers: toOthers.value.length > 0 ? toOthers.value.join(",") : ""
      }

      try {
        let { data } = await axios.post("/api/Messaging/getCommunicationAudience", payload)
        memberdataloading.value = false
        groupMembersData.value = data.result.contacts
        console.log(data);
      }
      catch (err) {
        console.log(err);
        memberdataloading.value = false
      }
    }

    const allcountries = ref([])
    const tenantCountry = ref({})
    const whatsappGroupsLoading = ref(true)

    watchEffect(() => {
      socket.emit('connected', 'Hello From Client')
      socket.on('hello', (data) => {
        console.log('Hello Emittted from the server', data)
      })
      socket.on('ping', () => {
        socket.emit('pong', 'pong')
      })
      socket.on('qr', (data) => {
        console.log('QR RECEIVED', data)
        const { qr } = data
        console.log(qr, 'hweww')
        qrCode.value = qr
      })

      socket.on('ready', (data) => {
        console.log('READY', data)
        sessionId.value = data.id
      })

      socket.on('allchats', (data) => {
        whatsappGroupsLoading.value = false
        console.log(data, 'AllChats Here 🥰🎉')
      })

      socket.on('chunkprogress', (data) => {
        console.log(data, 'data')
        chunkProgress.value = data
      })

      socket.on('fileready', () => {
        fileReady.value = true
      })

      // if (!connected.value) {
      //   if (route.fullPath == '/tenant/whatsapp') {
      //         router.push('/tenant/whatsapp/auth')
      //         console.log('routed back because socket got disconnected');
      //     }
      // }
    })

    const connected = computed(() => {
      return state.connected;
    })

    const connect = () => {
      socket.connect();
    }

    const disconnect = () => {
      socket.disconnect();
    }

    const createSessionForWhatsapp = () => {
      socket.emit('createsession', { id: session.value })
    }

    const getAllChats = () => {
      console.log('reaching')
      socket.emit('getAllChats', sessionId.value)
    }

    const getSessionForWhatsapp = () => {
      console.log('getting session')
      socket.emit('getsession', { id: getSessionId.value })
    }

    const selectGroup = (
      category,
      id,
      name,
      indexInCategories,
      indexInGroup
    ) => {
      const group_index = selectedGroups.value.findIndex(i => i.data == `${category}_${id}`)
      if (group_index < 0) {
        selectedGroups.value.push({ data: `${category}_${id}`, name });
      } else {
        selectedGroups.value.splice(group_index, 1)
      }
      getMemberPhoneNumber()
    };

    const removeGroup = (index) => {
      selectedGroups.value.splice(index, 1);
    };

    const members = [
      { name: "Me", id: 1 },
      { name: "You", id: 2 },
    ];
    const selectedMembers = ref([]);
    const selectMember = (selectedMember, index) => {
      selectedMembers.value.push(selectedMember);
      memberSearchResults.value.splice(index, 1);
      searchText.value = "";
      memberSearchResults.value = [];
      console.log(selectedMember, "selected member");
      toOthers.value.push(selectedMember.phone);
      getMemberPhoneNumber()
    };
    const removeMember = (index) => {
      selectedMembers.value.splice(index, 1);
    };
    const searchText = ref("");
    const filteredMembers = computed(() => {
      if (!searchText.value) return [];
      const filtered = members.filter((i) => i.name.includes(searchText.value));
      return filtered;
    });
    const memberSearchResults = ref([]);
    const searchForPerson = (e) => {
      if (e.target.value.length >= 3) {
        memberSearchResults.value = [];
        loading.value = true;
        composerObj
          .searchMemberDB("/api/Membership/GetSearchedUSers", e.target.value)
          .then((res) => {
            loading.value = false;
            memberSearchResults.value = res.filter((i) => {
              const memberInExistingCollection = selectedMembers.value.find(
                (j) => j.id === i.id
              );
              console.log(memberInExistingCollection, "em");
              if (memberInExistingCollection && memberInExistingCollection.id)
                return false;
              return true;
            });
            console.log(memberSearchResults.value, "res");
          });
        console.log(memberSearchResults.value);
      } else {
        memberSearchResults.value = [];
      }
    };

    const charactersCount = computed(() => editorData.value.length);
    const pageCount = computed(() => {
      if (editorData.value.length <= 160) return 1;
      return Math.ceil(editorData.value.length / 153);
    });

    const phoneNumber = ref("");
    const loading = ref(false);
    // const isPersonalized = ref(false);

    const isoCode = ref("");
    // const isPersonalized = ref(false);
    const invalidMessage = ref(false);
    const invalidDestination = ref(false);



    // const sendSMSToUploadedContacts = async (gateway) => {
    //   let formData = new FormData()
    //   formData.append("file", multipleContact.value)
    //   formData.append("message", editorData.value)
    //   formData.append('category', '')
    //   formData.append('gatewayToUse', gateway)
    //   formData.append('isoCode', isoCode.value)

    //   try {
    //     let { data } = await axios.post('/api/messaging/upload', formData)
    //     console.log(data)
    //     toast.add({
    //       severity: "success",
    //       summary: "Success",
    //       detail: data.response,
    //       life: 5000
    //     });
    //   }
    //   catch (err) {
    //     console.log(err);
    //     toast.add({
    //       severity: "error",
    //       summary: "Not sent",
    //       detail: "Sending failed, please try again",
    //       life: 5000
    //     });
    //   }
    // }

    const userCountry = ref("");

    const route = useRoute();
    if (route.query.phone) {
      phoneNumber.value = route.query.phone;
      phoneNumberSelectionTab.value = true;
    }

    if (route.query.group) {
      groupSelectionTab.value = true;
      selectedGroups.value.push({
        data: `group_~${route.query.group}`,
        name: route.query.group,
      });
      phoneNumberSelectionTab.value = true;
    }

    if (route.query.draftId) {
      communicationService.getDraftsById(route.query.draftId).then((res) => {
        if (res) {
          console.log(res, "Draft");
          editorData.value = res.body;
        } else {
          console.log(res, "error response");
        }
      });
    }

    if (store.getters.currentUser && store.getters.currentUser.isoCode) {
      isoCode.value = store.getters.currentUser.isoCode;
      userCountry.value = store.getters.currentUser.country;
    } else {
      axios
        .get("/api/Membership/GetCurrentSignedInUser")
        .then((res) => {
          isoCode.value = res.data.isoCode;
          userCountry.value = res.data.country;
        })
        .catch((err) => console.log(err));
    }


    const allGroups = ref([]);
    const categories = ref([]);
    onMounted(() => {
      composeService
        .getCommunicationGroups()
        .then((res) => {
          console.log(res, 'ehehhe');
          for (let prop in res) {
            categories.value.push(prop);
            allGroups.value.push(res[prop]);
          }
        })
        .catch((err) => console.log(err));
    })


    const groupSelectInput = ref(null);
    const memberSelectInput = ref(null);


    const sendWhatsappMessage = () => {
      chatRecipients.value = new Array();

      // Send to selectedGroups || All contacts
      if (groupMembersData.value.length > 0) {
        const recipients = groupMembersData.value.map(i => ({
          phoneNumber: i.phone ? i.phone.substring(0, 1) == '0' ? `+${tenantCountry.value.phoneCode}${i.phone.substring(1)}` : `${i.phone}` : null,
          name: i.name ? i.name : ""
        })).filter(i => i.phoneNumber)
        chatRecipients.value = chatRecipients.value.concat(recipients)
      }

      // Phone Number
      if (phoneNumber.value) {
        const recipients = phoneNumber.value ? [{ name: "", phoneNumber: phoneNumber.value.replaceAll(" ", "").trim() }] : []
        chatRecipients.value = chatRecipients.value.concat(recipients)
      }

      // Selected members recipients
      if (selectedMembers.value.length > 0) {
        const recipients = selectedMembers.value.map(i => ({
          phoneNumber: i.phone ? i.phone.substring(0, 1) == '0' ? `+${tenantCountry.value.phoneCode}${i.phone.substring(1)}` : `${i.phone}` : null,
          name: i.name ? i.name : ""
        })).filter(i => i.phoneNumber)
        chatRecipients.value = chatRecipients.value.concat(recipients)
      }



      console.log(chatRecipients.value,);
      // Remove object with duplicate recipient numbers
      const ids = chatRecipients.value.map(o => o.phoneNumber)
      let removeDuplicate = chatRecipients.value.filter(({ phoneNumber }, index) => !ids.includes(phoneNumber, index + 1))
      console.log(removeDuplicate)
      // const uniqueNumbers = new Set(chatRecipients.value.phoneNumber);
      // console.log(Array.from(uniqueNumbers));

      socket.emit('sendwhatsappmessage', {
        id: clientSessionId.value,
        phone_number: removeDuplicate,
        message: editorData.value,
        whatsappAttachment: whatsappAttachment.value,
      })

      // Send to Whatsapp Groups
      if (userWhatsappGroupsId.value && userWhatsappGroupsId.value.length > 0) {
        socket.emit('sendtogroups', {
          id: clientSessionId.value,
          groups: userWhatsappGroupsId.value,
          whatsappAttachment: whatsappAttachment.value,
          message: editorData.value
        })
      }

      swal({
        title: "Success",
        text: "Your Whatsapp message is being sent!",
        icon: "success",
      })

      // Reset data on page
      phoneNumber.value = "";
      selectedMembers.value = new Array();
      editorData.value = "";
      userWhatsappGroupsId.value = new Array();
      allSelectedNumbers.value = new Array();
      chatRecipients.value = new Array();
      sendToAll.value = false;
      groupSelectionTab.value = false;
      membershipSelectionTab.value = false;
      phoneNumberSelectionTab.value = false;
      whatsappGroupSelectionTab.value = false;
      groupMultipleIDs.value = new Array();
      removeDuplicate = new Array()
      handleRemove();
    }

    const getAllCountries = async () => {
      try {
        let { data } = await axios.get('/api/getallcountries');
        console.log(data)
        allcountries.value = data
      }
      catch (error) {
        console.error(error)
      }
    }
    getAllCountries();

    const getUser = computed(() => {
      if (!store.getters.currentUser || (store.getters.currentUser && Object.keys(store.getters.currentUser).length == 0)) return ''
      return store.getters.currentUser
    })

    watchEffect(() => {
      if (allcountries.value.length > 0 && getUser.value && Object.keys(getUser.value).length > 0) {
        tenantCountry.value = allcountries.value.find(i => {
          return i.isoCode == getUser.value.isoCode
        })
      }
    })

    const uploadFile = (e) => {
      multipleContact.value = e.target.files[0]
    }

    const handleEmojiClick = (data) => {
      console.log(data)
      editorData.value += data.unicode
    }

    const chooseFile = (e) => {
      // uploadPicture(e.raw)
      if (e.raw.type.includes('image')) {
        console.log(e.raw)
        selectedFileUrl.value = URL.createObjectURL(e.raw);

        const file = e.raw;
        const reader = new FileReader();

        reader.onload = (f) => {
          base64String.value = f.target.result;
          const chunkSize = 1024; // Specify your desired chunk size

          socket.emit('resetmediaobject',
            {
              data: "",
              id: clientSessionId.value
            });

          sendBase64InChunks(base64String.value, chunkSize);
          whatsappAttachment.value = {
            mimeType: e.raw.type,
            fileName: e.raw.name,
            fileSize: e.raw.size
          }
        };

        reader.readAsDataURL(file);

        fileAudio.value = false
        fileVideo.value = false
        fileImage.value = true

      } else if (e.raw.type.includes('audio')) {
        const reader = new FileReader();
        reader.addEventListener("load", function (f) {
          audioPlayer.value.src = reader.result;
          base64String.value = f.target.result;
          const chunkSize = 1024; // Specify your desired chunk size

          socket.emit('resetmediaobject',
            {
              data: "",
              id: clientSessionId.value
            });

          sendBase64InChunks(base64String.value, chunkSize);
          whatsappAttachment.value = {
            mimeType: e.raw.type,
            fileName: e.raw.name,
            fileSize: e.raw.size
          }
          console.log(whatsappAttachment.value, "attachment");
          fileAudio.value = true
          fileVideo.value = false
          fileImage.value = false
        });

        if (e.raw) {
          reader.readAsDataURL(e.raw);
        }
        // console.log(whatsappAttachment.value, "attachment");
      } else if (e.raw.type.includes('video')) {
        const reader = new FileReader();
        reader.addEventListener("load", function (f) {
          videoPlayer.value.src = reader.result;
          base64String.value = f.target.result;
          const chunkSize = 1024; // Specify your desired chunk size

          socket.emit('resetmediaobject',
            {
              data: "",
              id: clientSessionId.value
            });

          sendBase64InChunks(base64String.value, chunkSize);
          whatsappAttachment.value = {
            // base64: base64String.value,
            mimeType: e.raw.type,
            fileName: e.raw.name,
            fileSize: e.raw.size
          }
          console.log(whatsappAttachment.value, "attachment");
          fileAudio.value = false
          fileVideo.value = true
          fileImage.value = false
        });

        if (e.raw) {
          reader.readAsDataURL(e.raw);
        }
      } else {
        const reader = new FileReader();
        reader.addEventListener("load", function (f) {
          // selectedFileUrl.value.src = reader.result;
          base64String.value = f.target.result;
          const chunkSize = 1024; // Specify your desired chunk size

          socket.emit('resetmediaobject',
            {
              data: "",
              id: clientSessionId.value
            });
          sendBase64InChunks(base64String.value, chunkSize);
          whatsappAttachment.value = {
            mimeType: e.raw.type,
            fileName: e.raw.name,
            fileSize: e.raw.size
          }
          console.log(whatsappAttachment.value, "attachment");
          fileAudio.value = false
          fileVideo.value = false
          fileImage.value = false
        });

        if (e.raw) {
          reader.readAsDataURL(e.raw);
        }
      }
      // console.log(whatsappAttachment.value, "attachmenthere");
    }

    const handleRemove = () => {
      fileAudio.value = false;
      fileVideo.value = false;
      fileImage.value = false
      selectedFileUrl.value = ""
      whatsappAttachment.value = {}
      fileReady.value = false
      chunkProgress.value = 0
      socket.emit('clearfile', {
        data: "",
        id: clientSessionId.value
      })
    }


    const sendBase64InChunks = (base64String, chunkSize) => {
      const totalChunks = Math.ceil(base64String.length / chunkSize);
      let uploadedChunks = 0;
      for (let i = 0; i < totalChunks; i++) {
        const start = i * chunkSize;
        const end = start + chunkSize;
        const chunk = base64String.substring(start, end);
        uploadedChunks++; // Increment the uploadedChunks count
        socket.emit('chunk',
          {
            chunk,
            uploadedChunks,
            totalChunks,
            id: clientSessionId.value
          });
      }
    }

    const hideEmojiWrapper = (e) => {
      console.log(e)
      if (e && e.target && e.target.className && !e.target.className.includes('emoji-wrapper') && (e && e.target && e.target.className && !e.target.className.includes('light') && (e.target.localName.toLowerCase() !== 'emoji-picker'))) {
        displayEmoji.value = false
      }
    }

    const scheduleWhatsappMessage = async () => {
      scheduleloading.value = true
      chatRecipients.value = new Array();
      // if (allSelectedNumbers.value.length > 0 || phoneNumber.value) {
      //   const recipients = allSelectedNumbers.value.length > 0 ? allSelectedNumbers.value : [phoneNumber.value.replaceAll(" ", "").trim()]
      //   chatRecipients.value = chatRecipients.value.concat(recipients)
      // }

      // if (selectedMembers.value.length > 0) {
      //   const recipients = selectedMembers.value.map(i => i.phone ? i.phone.substring(0, 1) == '0' ? `+${tenantCountry.value.phoneCode}${i.phone.substring(1)}` : `${i.phone}` : null).filter(i => i)
      //   chatRecipients.value = chatRecipients.value.concat(recipients)
      // }

      // if (groupMembersData.value.length > 0) {
      //   const recipients = groupMembersData.value.map(i => i.phone ? i.phone.substring(0, 1) == '0' ? `+${tenantCountry.value.phoneCode}${i.phone.substring(1)}` : `${i.phone}` : null).filter(i => i)
      //   chatRecipients.value = chatRecipients.value.concat(recipients)
      // }

      // Send to selectedGroups || All contacts
      if (groupMembersData.value && groupMembersData.value.length > 0) {
        const recipients = groupMembersData.value.map(i => ({
          phoneNumber: i.phone ? i.phone.substring(0, 1) == '0' ? `+${tenantCountry.value.phoneCode}${i.phone.substring(1)}` : `${i.phone}` : null,
          name: i.name ? i.name : ""
        })).filter(i => i.phoneNumber)
        chatRecipients.value = chatRecipients.value.concat(recipients)
      }

      // Phone Number
      if (phoneNumber.value) {
        const recipients = phoneNumber.value ? [{ name: "", phoneNumber: phoneNumber.value.replaceAll(" ", "").trim() }] : []
        chatRecipients.value = chatRecipients.value.concat(recipients)
      }


      // Selected members recipients
      if (selectedMembers.value.length > 0) {
        const recipients = selectedMembers.value.map(i => ({
          phoneNumber: i.phone ? i.phone.substring(0, 1) == '0' ? `+${tenantCountry.value.phoneCode}${i.phone.substring(1)}` : `${i.phone}` : null,
          name: i.name ? i.name : ""
        })).filter(i => i.phoneNumber)
        chatRecipients.value = chatRecipients.value.concat(recipients)
      }



      // console.log(chatRecipients.value, );
      // Remove object with duplicate recipient numbers
      const ids = chatRecipients.value.map(o => o.phoneNumber)
      let removeDuplicate = chatRecipients.value.filter(({ phoneNumber }, index) => !ids.includes(phoneNumber, index + 1))
      console.log(removeDuplicate)

      // console.log(chatRecipients.value);
      // const uniqueNumbers = new Set(chatRecipients.value);
      // console.log(Array.from(uniqueNumbers));
      const payload = {
        message: editorData.value,
        whatsappAttachment: whatsappAttachment.value,
        sessionId: clientSessionId.value,
        chatRecipients: removeDuplicate,
        groupRecipients: userWhatsappGroupsId.value ? userWhatsappGroupsId.value : [],
        base64File: base64String.value,
        date: scheduledWhatsappDate.value
      }
      console.log(payload);


      try {
        let { data } = await axios.post("/api/Messaging/saveWhatsAppSchedule", payload)
        console.log(data, 'schedule successful');
        whatsappScheduleDialog.value = false;
        scheduleloading.value = false
        swal({
          title: "Success",
          text: `Your Whatsapp message has been scheduled for\n${dateFormatter.monthDayTime(scheduledWhatsappDate.value)}`,
          icon: "success",
        })

        // Reset data on page
        phoneNumber.value = "";
        selectedMembers.value = new Array();
        editorData.value = "";
        userWhatsappGroupsId.value = new Array();
        allSelectedNumbers.value = new Array();
        chatRecipients.value = new Array();
        sendToAll.value = false;
        groupSelectionTab.value = false;
        membershipSelectionTab.value = false;
        phoneNumberSelectionTab.value = false;
        whatsappGroupSelectionTab.value = false;
        groupMultipleIDs.value = new Array();
        removeDuplicate = new Array()
        handleRemove();
      }
      catch (err) {
        scheduleloading.value = false
        console.error(err);
      }
    }


    const removeTag = (value) => {
      console.log(value);
      selectedGroups.value = selectedGroups.value.filter(i => !i.data.includes(value))
      getMemberPhoneNumber()
    }

    return {
      editorData,
      editorConfig,
      possibleSMSDestinations,
      sendToAll,
      // toggleGroupsVissibility,
      selectedGroups,
      selectGroup,
      removeGroup,
      showSection,
      groupSelectionTab,
      membershipSelectionTab,
      phoneNumberSelectionTab,
      categories,
      allGroups,
      selectedMembers,
      removeMember,
      selectMember,
      searchText,
      filteredMembers,
      charactersCount,
      pageCount,
      phoneNumber,
      searchForPerson,
      loading,
      memberSearchResults,
      // groupListShown,
      // showGroupList,
      groupSelectInput,
      memberSelectInput,
      invalidDestination,
      invalidMessage,
      moment,
      // isPersonalized,
      route,
      contactUpload,
      uploadFile,
      multipleContact,
      // sendSMSToUploadedContacts,
      session,
      qrCode,
      createSessionForWhatsapp,
      sessionId,
      getAllChats,
      getSessionId,
      getSessionForWhatsapp,
      connected,
      connect,
      disconnect,
      userWhatsappGroups,
      primarycolor,
      whatsappGroupSelectionTab,
      userWhatsappGroupsId,
      sendWhatsappMessage,
      allSelectedNumbers,
      allcountries,
      allcountries,
      getUser,
      tenantCountry,
      whatsappGroupsLoading,
      handleEmojiClick,
      displayEmoji,
      chooseFile,
      fileAudio,
      fileImage,
      fileVideo,
      audioPlayer,
      videoPlayer,
      selectedFileUrl,
      handleRemove,
      whatsappAttachment,
      clientSessionId,
      base64String,
      fileReady,
      hideEmojiWrapper,
      groupMembersData,
      whatsappScheduleDialog,
      scheduleWhatsappMessage,
      scheduledWhatsappDate,
      chatRecipients,
      mdAndUp,
      lgAndUp,
      xlAndUp,
      xsOnly,
      groupMultipleIDs,
      getMemberPhoneNumber,
      removeTag,
      scheduleloading,
      toOthers,
      memberdataloading,
      chunkProgress
    };
  },
};
</script>

<style scoped>
.input {
  display: block;
  width: 100%;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  /* border: none; */
  /* transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out; */
}

input:focus {
  outline: none;
}

.send-btn,
.discard-btn {
  background: #136acd;
  border-radius: 111px;
  color: #fff;
  outline: transparent;
  max-height: 40px;
}

.send-btn {
  border-radius: 111px 0 0 111px;
}

.send-btn-options {
  border-radius: 0 111px 111px 0;
  height: 30px;
  background: #136acd;
  padding: 1px 10px 8px;
  font-size: 22px;
  border-left: 1px solid #80808069;
}

.discard-btn {
  background: #fff;
  border: 1px solid #002044;
  border-radius: 111px;
  color: #000;
}

.dropdown-toggle {
  width: 100%;
  text-align: left;
  outline: transparent !important;
}

.dropdown-menu {
  width: 98%;
}

.dropdown-toggle::after {
  margin-left: auto;
  vertical-align: 0.255em;
  content: "";
  border-top: 0.3em solid;
  border-right: 0.3em solid transparent;
  border-bottom: 0;
  border-left: 0.3em solid transparent;
  text-align: right !important;
  right: 10px;
  top: 20px;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.dropdown-toggle:focus {
  outline: none !important;
  border: none;
}

.inp:focus {
  outline: none;
  border: none;
}

.email-destination {
  padding: 4px;
  border: 1px solid #02172e0d;
  border-radius: 4px;
  background: #02172e14;
  align-items: center;
  height: 30px;
}


.close-allcontacts {
  position: absolute;
  font-size: 18px;
  z-index: 100;
  top: 0;
  right: 0;
  padding: 0 10px;
  font-weight: bold;
  padding-top: 7px;
}

.remove-email {
  color: #000;
  font-weight: bold;
}

.remove-email:hover {
  cursor: pointer;
}

/* Hide scrollbar for Chrome, Safari and Opera */
::-webkit-scrollbar {
  display: none;
}

.groups {
  max-height: 165px;
  overflow: auto;
  -ms-overflow-style: none;
  /* IE and Edge */
  scrollbar-width: none;
}

.hide-dd {
  display: none !important;
}

.subject-text {
  width: 60px;
}

.subject-field {
  width: calc(100% - 70px);
  border: none;
  padding: 0.5rem;
  outline: transparent;
}

.text-area {
  width: 100%;
  border: 1px solid #02172e30;
  outline: none;
  padding: 0.5rem;
  margin-bottom: -5px !important;
}

.disable {
  pointer-events: none;
}

.c-pointer {
  cursor: pointer;
}

.dropdown-menu {
  max-height: 300px !important;
  overflow-y: auto;
}

.send-now-div {
  border: 1px solid #ddd;
}

.modal-lg {
  max-width: 680px;
}

.modal-body {
  padding: 2rem !important;
}

.grey-background {
  background: #ebeff4;
}

.text-grey {
  color: grey;
}

.send-dropdown {
  border: 1px solid #ddd;
  width: 124px;
  position: absolute;
  background: #fff;
}

.send-dropdown a {
  color: #190138;
  font-size: 14px;
  text-decoration: none;
}

.hide {
  display: none;
}

.dd-item:hover {
  cursor: pointer;
}

.hint {
  font-size: 13px;
}

.amber {
  background: #ffbf00 !important;
}

.extra-btn {
  width: 100%;
}

/* Start SplitButton */

/* End SplitButton */

@media screen and (max-width: 630px) {
  .send-btn-options {
    padding: 1px 10px 7px;
  }
}

@media screen and (min-width: 400px) {
  .extra-btn {
    width: 80%;
  }
}
</style>

<style>
.ck-editor__editable {
  min-height: 300px;
}

.cursor-close {
  cursor: not-allowed;
}

.template-text {
  color: rgb(15, 71, 134)
}

.multiple_numbers {
  padding: 10px;
  border-radius: 5px;
  background: #eee;
}
</style>