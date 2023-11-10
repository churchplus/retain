<template>
  <div>
    <div class="container-fluid" @click="closeDropdownIfOpen">
      <div class="row">
        <div class="col-12 col-md-12 mt-3 px-0">
          <h4 class="font-weight-bold text-center text-md-left mb-0">
            Compose voice message
          </h4>
          <!-- <Toast /> -->
          <el-dialog title="Select Date and Time" v-model="display" :width="
            mdAndUp || lgAndUp || xlAndUp ? `50%` : xsOnly ? `90%` : `70%`
          " align-center>
            <div class="row">
              <div class="col-md-12">
                <!-- <el-date-picker type="datetime" id="birthdaytime" placeholder="Select date and time" class="w-100"
                  v-model="executionDate" /> -->
                  <input type="datetime-local" class="form-control my-3" v-model="executionDate" placeholder="Select date and time" />
              </div>
            </div>
            <template #footer>
              <span class="dialog-footer">
                <el-button class="secondary-button" round @click="() => (display = false)">Cancel</el-button>
                <el-button round :color="primarycolor" :loading="loadingSchedule"
                  @click="contructScheduleMessageBody(2, 'dotgovoice')">
                  Schedule
                </el-button>
              </span>
            </template>
          </el-dialog>
          <!-- <Dialog
            header="Select Date and Time"
            v-model:visible="display"
            :style="{ width: '50vw', maxWidth: '600px' }"
            :modal="true"
          >
            <div class="row">
              <div class="col-md-12">
                <input
                  type="datetime-local"
                  id="birthdaytime"
                  class="form-control"
                  name="birthdaytime"
                  v-model="executionDate"
                />
              </div>
            </div>
            <template #footer>
              <Button
                label="Cancel"
                icon="pi pi-times"
                @click="() => (display = false)"
                class="p-button-raised p-button-text p-button-plain mr-3"
                style="
                  color: #136acd;
                  background: #fff !important;
                  border-radius: 22px;
                "
              />
              <Button
                label="Schedule"
                class="p-button-rounded"
                style="background: #136acd"
                @click="contructScheduleMessageBody(2, '')"
              />
            </template>
          </Dialog> -->
        </div>
      </div>

      <div class="row my-3">
        <div class="col-md-12 px-0">
          <hr class="hr my-1" />
        </div>
      </div>

      <div class="row">
        <div class="col-md-2 px-0 col-lg-2 align-self-center">
          <span class="small-text">Send to :</span>
        </div>
        <div class="p-0 col-md-10 col-lg-10 form-group mb-0">
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
          <!-- <div class="dropdown">
            <button class="btn btn-default border dropdown-toggle small-text" type="button" id="dropdownMenuButton"
              data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" @click="closeDropdownIfOpen">
              Select Destination
            </button>
            <div class="dropdown-menu w-100" aria-labelledby="dropdownMenuButton">
              <a class="dropdown-item c-pointer small-text" v-for="(destination, index) in possibleSMSDestinations"
                :key="index" @click="showSection(index)">{{ destination }}</a>
            </div>
          </div> -->
        </div>
      </div>

      <!-- <div class="row" v-if="sendToAll">
        <div class="col-12 col-md-2 px-0"></div>
        <div class="col-12 col-md-10 px-0">
          <span>
            <el-input class="w-100 my-2 small-text" id="dropdownMenu" value="All Contacts" disabled />
            <span class="close-allcontacts c-pointer" @click="() => (sendToAll = false)"><el-icon class="mx-2 mt-2">
                <Close />
              </el-icon>
            </span>
          </span>
        </div>
      </div> -->

      <!-- Start TEst -->
      <div class="row mb-2" v-if="groupSelectionTab">
        <div class="col-md-2"></div>
        <div class="col-md-10 px-0 grey-rounded-border mt-3">
          <ul class="d-flex flex-wrap pl-1 mb-0 dd-item small-text" @click="() => groupSelectInput.focus()">
            <li style="list-style: none; min-width: 100px" v-for="(group, index) in selectedGroups" :key="index"
              class="email-destination d-flex justify-content-between m-1">
              <!-- <span
              class="email-destination m-1"
              
            > -->
              <span>{{ group.name }}</span>
              <span class="ml-2 remove-email" @click="removeGroup(index)">x</span>
              <!-- </span> -->
            </li>
            <li style="list-style: none" class="">
              <input type="text" class="border-0 dd-item" ref="groupSelectInput" :class="{
                'w-100': selectedGroups.length === 0,
                'minimized-input-width': selectedGroups.length > 0,
              }" @focus="showGroupList" @click="showGroupList" style="padding: 0.5rem"
                :placeholder="`${selectedGroups.length > 0 ? '' : 'Select groups'}`" />
            </li>
          </ul>
          <div class="col-md-12 px-2 select-groups-dropdown dd-item pt-2" v-if="groupListShown">
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
          </div>
        </div>
      </div>

      <div class="col-12 my-1 px-0">
        <div class="row" v-if="membershipSelectionTab">
          <div class="col-12 col-md-2"></div>
          <div class="col-12 col-md-10 grey-rounded-border">
            <ul class="d-flex flex-wrap px-1 mb-0 m-dd-item" @click="() => memberSelectInput.focus()">
              <li style="list-style: none; min-width: 100px" v-for="(member, indx) in selectedMembers" :key="indx"
                class="email-destination d-flex justify-content-between m-1">
                <!-- <span
              class="email-destination m-1"
              
            > -->
                <span>{{ member.name }}</span>
                <span class="ml-2 remove-email" @click="removeMember(indx)">x</span>
                <!-- </span> -->
              </li>
              <li style="list-style: none" class="m-dd-item">
                <input type="text" class="border-0 m-dd-item text" ref="memberSelectInput" @input="searchForPerson"
                  :class="{
                    'w-100': selectedMembers.length === 0,
                    'minimized-input-width': selectedMembers.length > 0,
                  }" @focus="showMemberList" @click="showMemberList" v-model="searchText" style="padding: 0.5rem"
                  :placeholder="`${selectedMembers.length > 0 ? '' : 'Select from members'
                    }`" />
              </li>
            </ul>
            <div class="col-md-12 px-0 select-groups-dropdown m-dd-item" v-if="memberListShown">
              <div class="dropdownmenu pt-0 w-100 m-dd-item">
                <a class="dropdown-item px-1 c-pointer m-dd-item" v-for="(member, index) in memberSearchResults"
                  :key="index" @click="selectMember(member, index)">{{ member.name }}</a>
                <p class="bg-secondary p-1 mb-0 disable m-dd-item" v-if="
                  searchText.length < 3 &&
                  loading == false &&
                  memberSearchResults.length === 0
                ">
                  Enter 3 or more characters
                </p>
                <p aria-disabled="true" class="btn btn-default p-1 mb-0 disable m-dd-item" v-if="
                  memberSearchResults.length === 0 &&
                  searchText.length >= 3 &&
                  !loading
                ">
                  No match found
                </p>
                <p class="btn btn-default p-1 mb-0 disable m-dd-item" v-if="loading && searchText.length >= 3">
                  <i class="fas fa-circle-notch fa-spin m-dd-item"></i>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>



      <!-- Enter phone numbers -->
      <div class="col-12 my-1 px-0" v-if="phoneNumberSelectionTab">
        <div class="row">
          <div class="col-12 col-md-2"></div>
          <div class="col-12 col-md-10 px-0">
            <textarea class="form-control w-100 px-1 grey-rounded-border" placeholder="Enter phone number(s)"
              v-model="phoneNumber"></textarea>
          </div>
          <div class="col-md-12 grey-rounded-border groups" :class="{ hide: !groupsAreVissible }">
            <div class="row" v-for="(category, index) in categories" :key="index">
              <div class="col-md-12">
                <div class="row">
                  <div class="col-md-12">
                    <h4 class="px-14">{{ category }}</h4>
                    <p v-for="(group, indx) in allGroups[index]"
                      @click="selectGroup(group.category, group.id, group.name)" :key="indx" class="small-text">
                      {{ group.name }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Start upload contact -->
      <div v-if="contactUpload" class="row my-1">
        <div class="col-12 col-md-2"></div>
        <div class="col-12 col-md-10 grey-rounded-border p-2">
          <div class="d-flex justify-content-between">
            <input type="file" class="form-control-file" @change="uploadFile" />
            <div>
              <i class="pi pi-times mr-2 c-pointer" @click="() => (contactUpload = false)"></i>
            </div>
          </div>
          <div class="mt-1">
            <a href="/files/Upload_Contact Template.csv" class="template-text text-decoration-none font-weight-bold"
              download>Download template</a>
          </div>
        </div>
      </div>


      <div class="row mt-3">
        <div class="col-md-2 px-0 col-lg-2 align-self-center">
          <span class="small-text">Subject :</span>
        </div>
        <div class="p-0 col-md-10 col-lg-10 form-group mb-0">
          <el-input type="text" pleaceholder="Enter your subject" v-model="subject" />
        </div>
      </div>
      <div class="row mt-3">
        <div class="px-0 col-md-2 mb-sm-2">
          <span class="small-text">Select audio source :</span>
        </div>
        <div class="col-md-10 px-0">
          <el-dropdown trigger="click" class="w-100">
            <div class="d-flex justify-content-between border-contribution text-dark w-100" size="large">
              <span>{{ voiceActionType && selectedVoiceType && Object.keys(voiceActionType.find(i => i.id == selectedVoiceType)).length > 0 ? voiceActionType.find(i => i.id == selectedVoiceType).name : 'Choose audio file source'
              }} </span>
              <div>
                <el-icon class="el-icon--right">
                  <arrow-down />
                </el-icon>
              </div>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item v-for="(item, index) in voiceActionType" :key="index"
                  @click="selectedVoiceType = item.id">
                  <a class="no-decoration text-dark">
                    {{ item.name }}
                  </a>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>

          <el-dropdown trigger="click" class="w-100 mt-3" v-if="selectedVoiceType == 1">
            <div class="d-flex justify-content-between border-contribution text-dark w-100" size="large">
              <span>{{ Object.keys(selectedVoiceaudio).length > 0 ? selectedVoiceaudio.fileBlobName : 'Select uploaded audio file'
              }} </span>
              <div>
                <el-icon class="el-icon--right">
                  <arrow-down />
                </el-icon>
              </div>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item v-for="(item, index) in voiceAudioList" :key="index" @click="chooseVoiceAudio(item)">
                  <a class="no-decoration text-dark">
                    {{ item.fileBlobName }}
                  </a>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>

          <el-upload class="upload-demo w-100 mt-3" drag multiple :on-change="chooseVoiceFile" accept="audio/*"
            :auto-upload="false" v-else-if="selectedVoiceType == 2">
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text">
              Drop file here or <em>click to upload</em>
            </div>
            <template #tip>
              <div class="el-upload__tip">
                {{ [".m4a", ".mp2", ".mp3", ".ogg", ".wav", ".wma", ".webm"].join(", ") }} files are accepted
              </div>
            </template>
          </el-upload>
          <audio controls ref="audioPlayer" class="mt-2" style="width: 100%; display: none">
            <source src="" type="audio/mpeg">
            Your browser does not support the audio element.
          </audio>
        </div>

        <!-- <div class="col-md-10 mb-0 px-0" style="background: #ffffff">
          <div class="col-md-12 border rounded mt-1 d-flex flex-column flex-md-row">
            <div class="col-md-4 px-0 mx-0">
              <button
                class="border-none rounded outline-none my-2"
                style="background: #ebeff4"
                @click="uploadVoice"
              >
                Upload File
                <input
                  type="file"
                  class="border-none outline-line mt-2 mb-2"
                  hidden
                  ref="uploadButton"
                  @change="audioSelected"
                  accept=".mp3, .wav"
                />
              </button>
            </div>
            <div class="col-md-8 px-0 mx-0">
              <input
                type="file "
                class="form-control mt-2 bg-white border-none px-0"
                v-model="voice.name"
                disabled="true"
              />
            </div>
          </div>
        </div> -->
        <!-- <div class="col-md-2"></div>
        <div class="col-md-10"><div>Maximum 5mb file size</div></div> -->
        <!-- action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" -->


      </div>

      <div class="row mt-4 mb-5">
        <div class="col-md-12">
          <p class="mb-1 text-danger text-right font-weight-700" v-if="invalidDestination">
            Please select destination
          </p>
          <p class="mb-1 text-danger text-right font-weight-700" v-if="invalidMessage">
            Enter your message
          </p>
        </div>
        <div class="w-100 d-flex justify-content-end ml-4">
          <span :class="{ 'cursor-close': disableBtn }">
            <el-dropdown size="large" trigger="click" class="split-button mr-3" @click="checkFileType" split-button>
              Send
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="showScheduleModal"><el-icon>
                      <Clock />
                    </el-icon>Schedule</el-dropdown-item>
                  <!-- <el-dropdown-item @click="draftMessage"><el-icon>
                      <MessageBox />
                    </el-icon>Save as draft</el-dropdown-item> -->
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </span>
          <!-- <router-link :to="
            route.fullPath === '/tenant/sms/compose'
              ? '/tenant/sms/sent'
              : '/errorpage/expiredSubscription'
          " class="
                      default-btn
                      d-flex
                      justify-content-center
                      short-btn
                      align-items-center
                      ml-3
                      text-decoration-none text-dark
                    ">
            Discard
          </router-link> -->
          <router-link class="no-decoration" to="/tenant/Voice">
            <el-button class="secondary-button" size="large" round>Discard</el-button>
          </router-link>
        </div>
        <!-- <div class="row">
          <div class="col-md-12">
            <div class="modal fade" id="sendsmsbtn" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                  <div class="modal-header grey-background">
                    <h5 class="modal-title" id="exampleModalLabel">
                      <i class="pi pi-user mr-2"></i>
                      {{ sendModalHeader }}
                    </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <div class="row" v-if="!nigerian">
                      <div class="col-md-12 text-center">
                        <button class="
                                    primary-btn
                                    default-btn
                                    border-0
                                    px-4
                                    my-2
                                    primary-bg
                                    text-white
                                    outline-none
                                    extra-btn
                                  " data-dismiss="modal" @click="contructScheduleMessageBody(1, '')">
                          Send SMS Now
                        </button>
                  
                      </div>
                    </div>

                    <div class="row" v-else>
                      <div class="col-md-12">
                        <div class="row">
                          <div class="col-md-12 px-1">
                            <p>
                              We are providing more options to reach and
                              communicate with your members
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref, inject, watchEffect } from "vue";
import composeService from "../../../services/communication/composer";
import composerObj from "../../../services/communication/composer";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import store from "../../../store/store";
import axios from "@/gateway/backendapi";
import communicationService from "../../../services/communication/communicationservice";
import dateFormatter from "../../../services/dates/dateformatter";
import deviceBreakpoint from "../../../mixins/deviceBreakpoint";
import { ElMessage } from 'element-plus'
import moment from "moment";
// import audio from "../helper/audio"
// import { blobMethod } from "../helper/audio";

// console.log(audio , 'audio');
export default {
  components: {},
  setup() {
    const router = useRouter();
    const editorData = ref("");
    const disableBtn = ref(false);
    const file = ref(null)
    const audioPlayer = ref(null)
    const editorConfig = {
      // The configuration of the editor.
      height: "800",
    };
    const primarycolor = inject('primarycolor')

    const possibleSMSDestinations = composeService.possibleSMSDestinations;
    const groupsAreVissible = ref(false);
    const groupSelectionTab = ref(false);
    const membershipSelectionTab = ref(false);
    const phoneNumberSelectionTab = ref(false);
    const iSoStringFormat = ref('')
    const selectedGroups = ref([]);
    // const sendToAll = ref(false);
    const executionDate = ref("");
    const contactUpload = ref(false);
    const multipleContact = ref({});
    const uploadButton = ref(null);
    const url = ref("");
    const voiceToEdit = ref("");
    const voiceName = ref("");
    const recMode = ref("");
    const canvas = ref(null);
    const { mdAndUp, lgAndUp, xlAndUp, xsOnly } = deviceBreakpoint();
    const voiceAudioList = ref([])
    const selectedVoiceaudio = ref({})
    const voiceActionType = ref([
      { name: 'Choose from uploaded audio files', id: 1 },
      { name: 'Upload a new audio file', id: 2 },
    ])
    const selectedVoiceType = ref(0)





    const uploadVoice = () => {
      console.log(uploadButton.value);
      uploadButton.value.click();
    };

    const onStream = (data) => {
      console.log("The blob data:", data);
    };

    const onResult = (data) => {
      console.log("The blob data:", data);
      console.log("Downloadable audio", window.URL.createObjectURL(data));
    };

    // function that selects the file
    // const audioSelected = (e) => {
    //   console.log(e);
    //   voice.value = e.target.files[0];
    //   voiceName.value = e.target.files[0].name;
    // };

    const formatPhoneNumber = (phoneNumber) => {
      const numbers = [];
      phoneNumber.split(",").forEach((i) => {
        i.split("\n").forEach((j) => {
          if (j) numbers.push(j);
        });
      });
      return numbers;
    };

    // audio start
    //       const recordAudio = () =>
    //         new Promise(async resolve => {
    //           const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    //           const mediaRecorder = new MediaRecorder(stream);
    //           const audioChunks = [];

    //           mediaRecorder.addEventListener("dataavailable", event => {
    //             audioChunks.push(event.data);
    //        });

    //   const start = () => mediaRecorder.start();

    //   const stop = () =>
    //     new Promise(resolve => {
    //       mediaRecorder.addEventListener("stop", () => {
    //         const audioBlob = new Blob(audioChunks);
    //         const audioUrl = URL.createObjectURL(audioBlob);
    //         const audio = new Audio(audioUrl);
    //         const play = () => audio.play();
    //         resolve({ audioBlob, audioUrl, play });
    //       });

    //       mediaRecorder.stop();
    //     });

    //   resolve({ start, stop });
    // });

    // const sleep = time => new Promise(resolve => setTimeout(resolve, time));

    // const handleAction = async () => {
    //   const recorder = await recordAudio();
    // //   const actionButton = document.getElementById('action');
    // //   actionButton.disabled = true;
    //   recorder.start();
    //   await sleep(3000);
    //   const audio = await recorder.stop();
    //   audio.play();
    //   await sleep(3000);
    // //   actionButton.disabled = false;
    // }
    // recordAudio();
    // handleAction();
    // start();
    // audio end
    const checkFileType = () => {
      if (Object.keys(selectedVoiceaudio.value).length === 0 && !(file.value instanceof File)) {
        ElMessage({
          type: 'warning',
          message: "Please choose an audio file to send as voice messages to your contacts",
          duration: 8000
        })
        return false;
      }
      if (multipleContact.value instanceof File) {
        sendSMSToUploadedContacts();
      } else {
        detailsForVoice();
      }
    }

    const chooseVoiceFile = (e) => {
      console.log(audioPlayer.value)
      const mediaPlayer = audioPlayer.value
      file.value = e.raw;
      const reader = new FileReader();

      reader.addEventListener("load", function () {
        mediaPlayer.src = reader.result;
        mediaPlayer.style.display = "block";
      });

      if (file.value) {
        reader.readAsDataURL(file.value);
      }
    }


    const detailsForVoice = async () => {
      console.log(selectedMembers.value)
      let formData = new FormData();
      selectedVoiceType.value === 2 ? formData.append("VoiceMessageFile", file.value) : null;
      selectedVoiceType.value === 1 ? formData.append("VoiceMessageUrl", selectedVoiceaudio.value.filePath) : null;
      formData.append("subject", subject.value);
      formData.append("ToContacts", selectedMembers.value.map(i => i.id).join(","));
      formData.append("GateWayToUse", "dotgovoice");
      formData.append('GroupedContacts', selectedGroups.value.map((i) => i.data))
      formData.append("ToOthers", formatPhoneNumber(phoneNumber.value).join(","));

      for (var pair of formData.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
      }

      try {
        let { data } = await axios.post(
          "/api/Messaging/SendVoiceMessage",
          formData
        );
        console.log(data, 'LLLKKK')
        if(data.status){
          ElMessage({
          type: 'success',
          message: 'You have successfully sent a voice note',
          duration: 5000
        })
        router.push("/tenant/voice/voicelist")
        }else if(data && !data.status){
          ElMessage({
              message: data.message || "An error Occur" ,
              type: "warning",
              duration: 6000,
            });

        }else{
           ElMessage({
              type: 'error',
              message: "Voice not sent, please try again",
              duration: 5000,
            })
        }
      } catch (err) {
        console.log(err);
        ElMessage({
          type: 'error',
          message: 'Sending failed, please try again',
          duration: 5000
        })
      }
    };
    const toggleGroupsVissibility = () => {
      groupsAreVissible.value = !groupsAreVissible.value;
    };

    const showSection = (index) => {
      if (index === 1) groupSelectionTab.value = true;
      if (index === 2) membershipSelectionTab.value = true;
      if (index === 3) phoneNumberSelectionTab.value = true;
      if (index === 4) contactUpload.value = true;
      if (index === 0) {
        groupSelectionTab.value = true;
        selectedGroups.value.push({
          data: "membership_00000000-0000-0000-0000-000000000000",
          name: "All Contacts",
        });
      }
    };

    const sendOptionsIsShown = ref(false);
    const toggleSendOptionsDisplay = () =>
      (sendOptionsIsShown.value = !sendOptionsIsShown.value);

    const closeDropdownIfOpen = (e) => {
      if (!e.target.classList.contains("dd-item")) {
        sendOptionsIsShown.value = false;
        groupListShown.value = false;
      }

      if (!e.target.classList.contains("m-dd-item")) {
        memberListShown.value = false;
      }
    };

    const selectGroup = (
      category,
      id,
      name,
      indexInCategories,
      indexInGroup
    ) => {
      selectedGroups.value.push({ data: `${category}_${id}`, name });
      groupsAreVissible.value = false;
      allGroups.value[indexInCategories].splice(indexInGroup, 1);
      groupListShown.value = false;
      console.log(selectedGroups);
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
      console.log(memberSearchResults.value, "search members");
      memberSearchResults.value.splice(index, 1);
      memberListShown.value = false;
      searchText.value = "";
      memberSearchResults.value = [];
      console.log(selectedMembers, "selected members");
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

    const subject = ref("");
    const phoneNumber = ref("");
    const loading = ref(false);
    const loadingSchedule = ref(false);
    // const isPersonalized = ref(false);

    const isoCode = ref("");
    const isPersonalized = ref(false);
    const invalidMessage = ref(false);
    const invalidDestination = ref(false);

    // const sendSMS = (data) => {
    //   invalidDestination.value = false;
    //   invalidMessage.value = false;

    //   if (
    //     selectedGroups.value.length === 0 &&
    //     !phoneNumber.value &&
    //     selectedMembers.value.length === 0 &&
    //     !sendToAll.value &&
    //     !multipleContact.value instanceof File
    //   ) {
    //     invalidDestination.value = true;
    //     return false;
    //   }

    //   if (!editorData.value) {
    //     invalidMessage.value = true;
    //     return false;
    //   }
    //   ElMessage({
    //     type: 'info',
    //     message: 'SMS is being sent....',
    //     duration: 5000
    //   })
    //   console.log(data);
    //   disableBtn.value = true;
    //   composeService
    //     .sendMessage("/api/Messaging/sendSms", data)
    //     .then((res) => {
    //       disableBtn.value = false;
    //       if (res.data.message.includes("You do not have")) {
    //         ElMessage({
    //           type: 'warning',
    //           message: res.data.message,
    //           duration: 5000
    //         })
    //       } else {
    //         ElMessage({
    //           type: 'success',
    //           message: 'SMS Sent successfully',
    //           duration: 5000
    //         })

    //         store.dispatch("removeSMSUnitCharge", pageCount.value * 1.5);
    //         console.log(pageCount, "Page count ");

    //         console.log(res);
    //         // Save the res to store in other to get it in the view sent sms page
    //         let sentObj = {
    //           message: res.data.message,
    //           id: res.data.returnObjects
    //             ? res.data.returnObjects[0].communicationReportID
    //             : "",
    //           smsUnitsUsed: res.data.unitsUsed,
    //           dateSent: res.data.returnObjects
    //             ? `Today | ${moment.parseZone(
    //               new Date(
    //                 res.data.returnObjects[0].communicationReport.date
    //               ).toLocaleDateString(),
    //               "YYYY MM DD HH ZZ"
    //             )._i
    //             }`
    //             : "",
    //           deliveryReport: [{ report: res.data.messageStatus }],
    //         };
    //         console.log(sentObj);
    //         store.dispatch("communication/addSmsToSentList", sentObj);
    //         setTimeout(() => {
    //           router.push({ name: "SentMessages" });
    //         }, 3500);
    //       }
    //     })
    //     .catch((err) => {
    //       stopProgressBar();
    //       disableBtn.value = false;
    //       // toast.removeAllGroups();
    //       console.log(err);
    //       if (err.toString().toLowerCase().includes("network error")) {
    //         ElMessage({
    //           type: 'warning',
    //           message: "Please ensure you have internet access",
    //           duration: 5000
    //         })
    //       } else if (err.toString().toLowerCase().includes("timeout")) {
    //         ElMessage({
    //           type: 'warning',
    //           message: "SMS took too long, please check your network and try again",
    //           duration: 5000
    //         })
    //       } else {
    //         ElMessage({
    //           type: 'warning',
    //           message: "SMS sending failed, Please try again",
    //           duration: 5000
    //         })
    //       }
    //     });
    // };

    const draftMessage = async () => {
      // Api to save draft voice messages not yet available

      // try {
      //   const response = await composerObj.saveDraft(
      //     {
      //       body: editorData.value,
      //       isDefaultBirthDayMessage: false,
      //     },
      //     "/api/Messaging/PostSmsDraft"
      //   );
      //   store.dispatch("communication/getSMSDrafts");
      //   console.log(response, "draft response");
      //   ElMessage({
      //     type: 'success',
      //     message: "Message saved as draft",
      //     duration: 5000
      //   })
      // } catch (error) {
      //   console.log(error, "drafting error");
      //   ElMessage({
      //     type: 'warning',
      //     message: "Message not saved as draft",
      //     duration: 5000
      //   })
      // }
    };

    const contructScheduleMessageBody = (sendOrSchedule, gateway) => {
      const data = {
        subject: subject.value,
        // message: editorData.value,
        // contacts: [],
        isPersonalized: isPersonalized.value,
        groupedContacts: selectedGroups.value.map((i) => i.data),
        toContacts: selectedMembers.value.map(i => i.id).join(","),
        isoCode: isoCode.value,
        toOthers: formatPhoneNumber(phoneNumber.value).join(","),
        gateWayToUse: gateway,
        voiceMessageFile: selectedVoiceType.value === 2 ? file.value : null,
        voiceMessageUrl: selectedVoiceType.value === 1 ? selectedVoiceaudio.value.filePath : null
      };

      // selectedVoiceType.value === 2 ? formData.append("VoiceMessageFile", file.value) : null;
      // selectedVoiceType.value === 1 ? formData.append("VoiceMessageUrl", selectedVoiceaudio.value.filePath) : null;
      // formData.append("subject", subject.value);
      // formData.append("ToContacts", selectedMembers.value.map(i => i.id).join(","));
      // formData.append("GateWayToUse", "dotgovoice");
      // formData.append('GroupedContacts', selectedGroups.value.map((i) => i.data))
      // formData.append("ToOthers", formatPhoneNumber(phoneNumber.value));

      // const numbers = [];
      // phoneNumber.value.split(",").forEach((i) => {
      //   i.split("\n").forEach((j) => {
      //     if (j) numbers.push(j);
      //   });
      // });

      // data.toOthers = numbers.join();

      // if (selectedMembers.value.length > 0) {
      //   data.ToContacts =
      //     data && data.ToContacts
      //       ? data.ToContacts.length > 0
      //         ? ","
      //         : ""
      //       : "";
      //   data.ToContacts += selectedMembers.value
      //     .map((i) => {
      //       console.log(i, "person");
      //       if (i.id) return i.id;
      //     })
      //     .join();
      // }

      if (multipleContact.value instanceof File) {
        sendSMSToUploadedContacts(gateway);
      } else if (sendOrSchedule == 2) {
          data.executionDate = iSoStringFormat.value
          data.date = iSoStringFormat.value
          data.time = iSoStringFormat.value.split("T")[1];
        scheduleMessage(data);
      }
      //  else {
      //   sendSMS(data);
      // }
    };

    const showScheduleModal = () => {
      // Set display to be true when voice schedule api is ready
      display.value = true;
    };
    watchEffect(() =>{
      if(executionDate.value){
       iSoStringFormat.value = dateFormatter.getISOStringGMT(executionDate.value)
      }
  })

    const scheduleMessage = async (data) => {
      loadingSchedule.value = true
      const formattedDate = dateFormatter.monthDayTime(data.executionDate);
      console.log(formattedDate, "Formatted Date");
      console.log(data.executionDate);

      console.log(data);
      try {
        const response = await composerObj.sendMessage(
          "/api/Messaging/saveVoiceSchedule",
          data
        );
        loadingSchedule.value = false
        display.value = false;
        ElMessage({
          type: 'success',
          message: `Voice message scheduled for ${new Date(data.date).toLocaleTimeString()}`,
          duration: 6000
        })
        console.log(response, "Schedule response");
      } catch (error) {
        console.log(error);
        loadingSchedule.value = false
        ElMessage({
          type: 'error',
          message: 'Could not schedule message',
          duration: 5000
        })
      }
    };

    const sendSMSToUploadedContacts = async () => {
      let formData = new FormData();
      formData.append("file", multipleContact.value);
      formData.append("message", editorData.value);
      formData.append("category", "");
      formData.append("isoCode", isoCode.value);

      try {
        let { data } = await axios.post("/api/messaging/upload", formData);
        console.log(data);
        ElMessage({
          type: 'success',
          message: data.response,
          duration: 5000
        })
      } catch (err) {
        console.log(err);
        ElMessage({
          type: 'error',
          message: 'Sending failed, please try again',
          duration: 5000
        })
      }
    };

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
          for (let prop in res) {
            categories.value.push(prop);
            allGroups.value.push(res[prop]);
          }
          console.log(allGroups.value);
        })
        .catch((err) => console.log(err));
    });

    const display = ref(false);
    const showDateTimeSelectionModal = () => {
      display.value = !display.value;
    };

    const groupListShown = ref(false);
    const showGroupList = () => {
      groupListShown.value = true;
      console.log(groupSelectInput.value);
    };

    const memberListShown = ref(false);
    const showMemberList = () => {
      memberListShown.value = true;
    };
    const groupSelectInput = ref(null);
    const memberSelectInput = ref(null);

    // const data = () => {
    //   const data = {
    //     subject: subject.value,
    //     message: editorData.value,
    //     contacts: [],
    //     isPersonalized: isPersonalized.value,
    //     groupedContacts: selectedGroups.value.map((i) => i.data),
    //     toContacts: sendToAll.value
    //       ? "allcontacts_00000000-0000-0000-0000-000000000000"
    //       : "",
    //     isoCode: isoCode.value,
    //     category: "",
    //     emailAddress: "",
    //     emailDisplayName: "",
    //     // gateWayToUse: gateway,
    //   };

    //   console.log(data);
    // };

    const getDefaultMessage = async (messageId) => {
      try {
        const {
          returnObject: { message },
        } = await communicationService.getDefaultMessage(messageId);
        editorData.value = message;
      } catch (error) {
        console.log(error);
      }
    };

    if (route.query.defaultId) getDefaultMessage(route.query.defaultId);

    const getMessage = async (messageId) => {
      try {
        const { message, subject: subj } = await composeService.getSMSById(
          messageId
        );
        editorData.value = message;
        subject.value = subj;
      } catch (error) {
        console.log(error);
        ElMessage({
          type: 'error',
          message: 'Could not load message!',
          duration: 5000
        })
      }
    };

    if (route.query.messageId) {
      getMessage(route.query.messageId);
    }

    const uploadFile = (e) => {
      multipleContact.value = e.target.files[0];
    };

    const getAllVoiceAudio = async () => {
      try {
        let data = await communicationService.getAllUploadedVoiceAudio();
        console.log(data)
        voiceAudioList.value = data
      }
      catch (err) {
        console.error(err)
      }
    }
    getAllVoiceAudio();

    const chooseVoiceAudio = (item) => {
      selectedVoiceaudio.value = item
      const mediaPlayer = audioPlayer.value
      mediaPlayer.src = item.filePath;
      mediaPlayer.style.display = "block";
    }



    return {
      editorData,
      iSoStringFormat,
      showScheduleModal,
      mdAndUp,
      lgAndUp,
      xlAndUp,
      xsOnly,
      loadingSchedule,
      editorConfig,
      possibleSMSDestinations,
      groupsAreVissible,
      toggleGroupsVissibility,
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
      // sendSMS,
      phoneNumber,
      searchForPerson,
      loading,
      memberSearchResults,
      subject,
      sendOptionsIsShown,
      toggleSendOptionsDisplay,
      closeDropdownIfOpen,
      display,
      showDateTimeSelectionModal,
      scheduleMessage,
      draftMessage,
      groupListShown,
      showGroupList,
      groupSelectInput,
      memberListShown,
      showMemberList,
      memberSelectInput,
      invalidDestination,
      invalidMessage,
      // sendToAll,
      contructScheduleMessageBody,
      executionDate,
      moment,
      isPersonalized,
      route,
      disableBtn,
      contactUpload,
      uploadFile,
      multipleContact,
      sendSMSToUploadedContacts,
      uploadButton,
      uploadVoice,
      // audioSelected,
      url,
      voiceToEdit,
      voiceName,
      recMode,
      onStream,
      onResult,
      canvas,
      checkFileType,
      chooseVoiceFile,
      file,
      audioPlayer,
      voiceAudioList,
      selectedVoiceaudio,
      chooseVoiceAudio,
      voiceActionType,
      selectedVoiceType,
      primarycolor
    };
  },
};
</script>

<style scoped>
.lab {
  font-size: 14px;
  font-weight: 800;
  background-color: rgb(236, 230, 230);
}

.btn:hover {
  border: none !important;
}

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
  padding: 0.1rem 0.4rem;
  border: 1px solid #02172e0d;
  border-radius: 8px;
  background: #02172e14;
}

/* drag and drop */
.drag-area {
  /* border: 2px dashed #fff; */
  height: 100px;
  width: 540px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.drag-area.active {
  border: 2px solid #fff;
}

.drag-area .icon {
  font-size: 40px;
  color: #fff;
}

.drag-area header {
  font-size: 20px;
  font-weight: 500;
  color: #000;
}

.drag-area span {
  font-size: 18px;
  font-weight: 500;
  color: #fff;
  /* margin: 10px 0 15px 0; */
}

.upload-btn {
  padding: 8px 13px;
  font-size: 15px;
  font-weight: 500;
  background: #fff;
  color: #000;
  border: 3px;
  /* border-radius: 30px; */
  cursor: pointer;
}

.drag-area img {
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: 5px;
}

.drag-area-body {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 30vh;
  background: rgb(236, 234, 234);
  border-radius: 12px;
}

/* End of drag and drop */
/* .vl {
  border-left: 3px solid green;
  height: 50px;
} */
.vertical-line {
  float: left;
  height: 100px;
  /* width:1px; */
  border-right: 1px solid #000;
}

.vertical-line span {
  display: block;
  background: white;
  padding: 10px;
  margin: 30px -20px;
  z-index: 10;
}

.row-audio {
  display: flex;
  align-items: center;
  justify-items: center;
  flex-direction: column;
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

/* audio css */
#msg {
  visibility: hidden;
  color: red;
  font-weight: bold;
  font-size: 22px;
  font-family: Verdana;
}

/* button {
  padding: 5px 10px;
  border: 1px solid grey;
  font-size: 18px;
  background: white;
} */

.audio-controls {
  display: flex;
  align-items: center;
  padding-top: 20px;
  justify-content: center;
}

.audio-controls button {
  margin: 0px 5px;
}

canvas {
  margin-top: -23px;
  background-color: black;
  margin-right: 10px;
}

.controlAudio {
  /* background :rgb(236, 234, 234); */
  border-radius: 12px;
  padding: 10px;
}

select {
  height: 25px;
  margin: 0px 5px;
}

.app {
  text-align: center;
  padding-top: 20px;
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

.ck-editor__editable {
  min-height: 300px;
}

.cursor-close {
  cursor: not-allowed;
}

.template-text {
  color: rgb(15, 71, 134);
}</style>