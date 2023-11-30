<template>
  <div>
    <div class="container-fluid" @click="closeDropdownIfOpen">
      <div class="row">
        <div class="col-md-12 mt-4 px-0">
          <h4 class="font-weight-bold">Compose Email</h4>
          <el-dialog
            title="Select Date and Time"
            v-model="display"
            :width="mdAndUp || lgAndUp || xlAndUp ? `50%` : xsOnly ? `90%` : `70%`"
            align-center
          >
            <div class="row">
              <div class="col-md-12">
                <input
                  type="datetime-local"
                  class="form-control my-3"
                  v-model="executionDate"
                  placeholder="Select date and time"
                />
              </div>
            </div>
            <template #footer>
              <span class="dialog-footer">
                <el-button round @click="() => (display = false)"
                  ><el-icon><Close /></el-icon>Cancel</el-button
                >
                <el-button
                  round
                  color="#136acd"
                  :loading="loading"
                  @click="contructScheduleMessageBody(2)"
                >
                  Schedule
                </el-button>
              </span>
            </template>
          </el-dialog>
        </div>
      </div>

      <div class="row bg-white mt-3 mt-md-5 pb-3">
        <div class="col-md-12">
          <div class="row">
            <div class="col-md-8 mt-3">
              <ElDropDown
                :options="contactSegment"
                placeholder="Choose contact segment"
                optionLabel="name"
                @selectedvalue="setSelectedGroup"
                :multiple="true"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-md-8 mt-3">
              <el-input
                type="textarea"
                class="w-100"
                rows="4"
                placeholder="Enter comma seperated email address eg. johndoe@gmail.com,aliciakeys@outlook.co"
                v-model="email"
              />
              <div
                class="text-danger small-text mt-1"
                v-if="email.length == 0 && selectedGroups.length == 0"
              >
                Email address is required
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-8 mt-3">
              <el-input
                type="text"
                class="w-100"
                placeholder="Enter the subject"
                v-model="subject"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-md-8 mt-3">
              <DecoupledEditor
                v-model="editorData"
                :loadedMessage="loadedMessage"
                label=""
              />
            </div>
          </div>
          <div class="row">
            <div class="col-md-8 mt-3">
              <span class="hint small-text"
                >Insert #name# any where you want the contact name to appear in the
                message, it will be replaced by the actual name of the member when sending
                the message.</span
              >
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-12">
              <div>
                <el-checkbox label="Schedule" @change="showScheduleModal" size="large" />
              </div>
              <!-- <div>
                <el-checkbox
                  label="Create a new template from this"
                  @change="draftModal = true"
                  size="large"
                />
              </div> -->
            </div>
            <div class="col-md-8 mt-4">
              <!-- @click="sendSMSDialog = true" -->
              <el-button
                :color="primarycolor"
                size="large"
                class="w-100"
                @click="contructScheduleMessageBody(1)"
                >Send</el-button
              >
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="row">
        <div class="col-md-2 pr-md-0 col-lg-2 align-self-center">
          <span class="small-text">Send to : </span>
        </div>
        <div class="p-0 col-md-10 col-lg-10 form-group mb-0">
          <div class="dropdown">
            <button
              class="btn btn-default border dropdown-toggle small-text"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              @click="closeDropdownIfOpen"
            >
              Select Destination
            </button>
            <div
              class="dropdown-menu w-100"
              aria-labelledby="dropdownMenuButton"
            >
              <a
                class="dropdown-item c-pointer small-text"
                v-for="(destination, index) in possibleEmailDestinations"
                :key="index"
                @click="showSection(index)"
                >{{ destination }}</a
              >
            </div>
          </div>
          <el-dropdown trigger="click" class="w-100">
            <div
              class="d-flex justify-content-between border-contribution text-dark w-100"
              size="large"
            >
              <span>Select Destination</span>
              <div>
                <el-icon class="el-icon--right">
                  <arrow-down />
                </el-icon>
              </div>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item
                  v-for="(destination, index) in possibleEmailDestinations"
                  :key="index"
                >
                  <a class="no-decoration text-dark" @click="showSection(index)">
                    {{ destination }}
                  </a>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div> -->

      <!-- <div class="row mb-1">
        <div class="col-md-12 pr-0">
          <hr class="hr my-1" />
        </div>
      </div> -->

      <!-- End TEst -->

      <!-- Start member TEst -->
      <div class="row" v-if="membershipSelectionTab">
        <div class="col-md-2"></div>
        <div class="col-md-10 pl-0 grey-rounded-border">
          <ul
            class="d-flex flex-wrap px-1 mb-0 m-dd-item small-text"
            @click="() => memberSelectInput.focus()"
          >
            <li
              style="list-style: none; min-width: 100px"
              v-for="(member, indx) in selectedMembers"
              :key="indx"
              class="email-destination d-flex justify-content-between m-1"
            >
              <span>{{ member.name }}</span>
              <span class="ml-2 remove-email" @click="removeMember(indx)">x</span>
            </li>
            <li style="list-style: none" class="m-dd-item">
              <input
                type="text"
                class="border-0 m-dd-item text"
                ref="memberSelectInput"
                @input="searchForPerson"
                :class="{
                  'w-100': selectedMembers.length === 0,
                  'minimized-input-width': selectedMembers.length > 0,
                }"
                @focus="showMemberList"
                @click="showMemberList"
                v-model="searchText"
                style="padding: 0.5rem"
                :placeholder="`${
                  selectedMembers.length > 0 ? '' : 'Select from members'
                }`"
              />
            </li>
          </ul>
          <div
            class="col-md-12 px-0 select-groups-dropdown m-dd-item small-text"
            v-if="memberListShown"
          >
            <div class="dropdownmenu pt-0 w-100 m-dd-item">
              <a
                class="dropdown-item px-1 c-pointer m-dd-item"
                v-for="(member, index) in memberSearchResults"
                :key="index"
                @click="selectMember(member, index)"
                >{{ member.name }}</a
              >
              <p
                class="bg-secondary p-1 mb-0 disable m-dd-item"
                v-if="
                  searchText.length < 3 &&
                  loading == false &&
                  memberSearchResults.length === 0
                "
              >
                Enter 3 or more characters
              </p>
              <p
                aria-disabled="true"
                class="btn btn-default p-1 mb-0 disable m-dd-item"
                v-if="
                  memberSearchResults.length === 0 && searchText.length >= 3 && !loading
                "
              >
                No match found
              </p>
              <p
                class="btn btn-default p-1 mb-0 disable m-dd-item"
                v-if="loading && searchText.length >= 3"
              >
                <i class="fas fa-circle-notch fa-spin m-dd-item"></i>
              </p>
            </div>
          </div>
        </div>
      </div>
      <!-- End member TEst -->

      <!-- Select Person from DB -->
      <div class="col-md-12 my-1 px-0" v-if="false">
        <div class="row">
          <div class="col-md-2"></div>
          <div class="col-md-10 py-2 px-0 grey-rounded-border">
            <span
              class="email-destination m-1"
              v-for="(member, indx) in selectedMembers"
              :key="indx"
            >
              <span class="small-text">{{ member.name }}</span>
              <span class="ml-2 remove-email" @click="removeMember(indx)">x</span>
            </span>

            <div class="dropdown">
              <div class="dropdown-menu pt-0 w-100" aria-labelledby="dropdownMenu">
                <a
                  class="dropdown-item px-1 c-pointer small-text"
                  v-for="(member, index) in memberSearchResults"
                  :key="index"
                  @click="selectMember(member, index)"
                  >{{ member.name }}</a
                >
                <p
                  class="bg-secondary p-1 mb-0 disable small-text"
                  v-if="
                    searchText.length < 3 &&
                    loading == false &&
                    memberSearchResults.length === 0
                  "
                >
                  Enter 3 or more characters
                </p>
                <p
                  aria-disabled="true"
                  class="btn btn-default p-1 mb-0 disable small-text"
                  v-if="
                    memberSearchResults.length === 0 && searchText.length >= 3 && !loading
                  "
                >
                  No match found
                </p>
                <p
                  class="btn btn-default p-1 mb-0 disable"
                  v-if="loading && searchText.length >= 3"
                >
                  <i class="fas fa-circle-notch fa-spin"></i>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Enter phone numbers -->
      <div class="col-md-12 my-1 px-0" v-if="phoneNumberSelectionTab">
        <div class="row">
          <div class="col-md-2"></div>
          <div class="col-md-10 py-2 px-0">
            <textarea
              class="form-control w-100 px-1 grey-rounded-border"
              placeholder="Enter phone number(s)"
              v-model="phoneNumber"
            ></textarea>
          </div>
        </div>
      </div>

      <!-- Enter your Emails -->
      <div class="col-md-12 my-1 px-0" v-if="emailSelectionTab">
        <div class="row">
          <div class="col-md-2"></div>
          <div class="col-md-10 py-2 px-0">
            <el-input
              class="w-100"
              :rows="2"
              type="textarea"
              placeholder="Enter email(s)"
              v-model="email"
            />
          </div>
        </div>
      </div>

      <!-- <div class="row">
        <div class="col-md-2">
          <span class="font-weight-600 small-text">Subject: </span>
        </div>
        <div class="col-md-10 px-0">
          <el-input
            class="w-100 p-0 mx-0 mb-2 px-14"
            style="border-radius: 4px"
            v-model="subject"
          />
        </div>
      </div>

      <div class="row">
        <div class="col-md-2">
          <span class="font-weight-600 small-text">Message: </span>
        </div>
        <div class="col-md-10 px-0">
          <div class="row">
            <div class="col-md-12">
              <div id="app"></div>
              <DecoupledEditor
                v-model="editorData"
                :loadedMessage="loadedMessage"
                :label="'you find me'"
              />
            </div>
          </div>
        </div>
      </div> -->

      <!-- <div class="row my-3"> -->
      <!-- <div class="col-md-12 form-group">
          <div class="row">
            <div class="col-md-2"></div>
            <div class="col-md-10 pl-0">
              <el-checkbox  v-model="isPersonalized" class="mr-3" />
              <span class="font-weight-700 px-14">Personal Message</span>
            </div>
          </div>
        </div> -->
      <!-- <div class="col-md-12">
          <div class="row">
            <div class="col-md-2"></div>
            <div class="col-md-10 pl-0">
              <span class="hint small-text"
                >Insert #name# any where you want the contact name to appear in the
                message, it will be replaced by the actual name of the member when sending
                the message.</span
              >
            </div>
          </div>
        </div> -->
      <!-- </div> -->

      <!-- <div class="row mt-4 mb-5"> -->
      <!-- <div class="col-md-12">
          <p
            class="mb-1 text-danger text-right font-weight-700"
            v-if="invalidDestination"
          >
            Please select destination
          </p>
          <p class="mb-1 text-danger text-right font-weight-700" v-if="invalidMessage">
            Enter your message
          </p>
        </div> -->
      <!-- <div class="col-md-12 d-flex justify-content-end">
          <span>
            <el-dropdown
              size="large"
              trigger="click"
              class="split-button"
              @click="contructScheduleMessageBody(1)"
              split-button
            >
              Send
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="showScheduleModal"
                    ><el-icon><Clock /></el-icon>Schedule</el-dropdown-item
                  >
                  <el-dropdown-item @click="draftMessage"
                    ><el-icon><MessageBox /></el-icon>Safe as Draft</el-dropdown-item
                  >
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </span>
          <router-link to="/tenant/email/sent" class="no-decoration">
            <el-button class="ml-3 secondary-button" size="large" round
              >Discard</el-button
            >
          </router-link>
        </div> -->

      <!-- <div class="row">
          <div class="col-md-12">
            <div
              class="modal fade"
              id="sendsmsbtn"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                  <div class="modal-header grey-background">
                    <h5 class="modal-title" id="exampleModalLabel">
                      <i class="pi pi-user mr-2"></i>
                      {{ sendModalHeader }}
                    </h5>
                    <button
                      type="button"
                      class="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <div class="row" v-if="!nigerian">
                      <div class="col-md-12 text-center">
                        <button
                          class="primary-btn default-btn border-0 px-4 my-2 primary-bg text-white outline-none extra-btn"
                          data-dismiss="modal"
                          @click="sendSMS('')"
                        >
                          Send SMS Now {{ `${nigerian}` }}
                        </button>
                      </div>
                    </div>

                    <div class="row" v-else>
                      <div class="col-md-12">
                        <div class="row">
                          <div class="col-md-12 px-1">
                            <p>
                              We are providing more options to reach and communicate with
                              your members
                            </p>
                          </div>
                        </div>

                        <div class="row">
                          <div class="col-md-12 px-1">
                            <hr class="hr" />
                          </div>
                        </div>

                        <div class="row d-flex justify-content-between">
                          <div class="col-md-6 px-1">
                            <div class="container">
                              <div class="row">
                                <div class="col-md-12">
                                  <label for="" class="small-text font-weight-600 py-2"
                                    >NEW** BULK SMS - 100% SMS DELIVERY</label
                                  >
                                </div>
                                <div
                                  class="col-md-12 send-now-div py-2 my-2 d-flex justify-content-center"
                                >
                                  <button
                                    class="primary-btn default-btn primary-bg border-0 px-4 my-2 font-weight-600 outline-none"
                                    data-dismiss="modal"
                                    @click="sendSMS('hostedsms')"
                                  >
                                    Send SMS Now
                                  </button>
                                </div>
                                <div class="col-md-12 px-0">
                                  <hr class="hr my-2" />
                                </div>
                                <div class="col-md-12 px-0 d-flex flex-column">
                                  <span>Please note:</span>
                                  <span>100% delivery to all valid phone numbers.</span>
                                  <span>Not Affected by DND.</span>
                                  <span
                                    >Dedicated phone number: No sender
                                    customization.</span
                                  >
                                </div>
                              </div>
                            </div>
                          </div>

                          <div class="col-md-6 px-1">
                            <div class="container">
                              <div class="row">
                                <div class="col-md-12">
                                  <label for="" class="small-text font-weight-600 py-2"
                                    >REGULAR BULK SMS- PROVIDER</label
                                  >
                                </div>
                                <div
                                  class="col-md-12 my-2 send-now-div py-2 d-flex justify-content-center"
                                >
                                 
                                  <button
                                    class="primary-btn default-btn border-0 px-4 my-2 grey-background text-grey outline-none"
                                    data-dismiss="modal"
                                    @click="sendSMS('')"
                                  >
                                    Send SMS Now
                                  </button>
                                </div>
                                <div class="col-md-12 px-0">
                                  <hr class="hr my-2" />
                                </div>
                                <div class="col-md-12 px-0 d-flex flex-column">
                                  <span>Please note:</span>
                                  <span>Uses the regular bulk sms engine</span>
                                  <span
                                    >Delivery rate varies and is affected by DND
                                    number.</span
                                  >
                                  <span>Sender Name can be customized.</span>
                                </div>
                              </div>
                            </div>
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
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref, watchEffect, inject } from "vue";
import composeService from "../../services/communication/composer";
import composerObj from "../../services/communication/composer";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";
import store from "../../store/store";
import axios from "@/gateway/backendapi";
import stopProgressBar from "../../services/progressbar/progress";
import communicationService from "../../services/communication/communicationservice";
import dateFormatter from "../../services/dates/dateformatter";
import deviceBreakpoint from "../../mixins/deviceBreakpoint";
import swal from "sweetalert";
import MyUploadAdapter from "../../services/editor/editor_uploader";
import { ElMessage } from "element-plus";
import DecoupledEditor from "@/components/RichEditor";
import ElDropDown from "@/components/dropdown/ElDropDown";

export default {
  components: {
    DecoupledEditor,
    ElDropDown,
  },
  setup() {
    const primarycolor = inject("primarycolor");
    const router = useRouter();
    const toast = useToast();
    const editorData = ref("");
    const { mdAndUp, lgAndUp, xlAndUp, xsOnly } = deviceBreakpoint();

    const onReady = (editor) => {
      // Customize upload picture plugin
      editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
        return new MyUploadAdapter(loader);
      };
    };

    const possibleEmailDestinations = composeService.possibleEmailDestinations;
    const groupSelectionTab = ref(false);
    const membershipSelectionTab = ref(false);
    const phoneNumberSelectionTab = ref(false);
    const emailSelectionTab = ref(false);
    const email = ref("");
    const selectedGroups = ref([]);
    const executionDate = ref("");
    const iSoStringFormat = ref("");

    watchEffect(() => {
      if (executionDate.value) {
        iSoStringFormat.value = dateFormatter.getISOStringGMT(executionDate.value);
      }
    });

    const showSection = (index) => {
      if (index === 1) groupSelectionTab.value = true;
      if (index === 2) membershipSelectionTab.value = true;
      if (index === 3) emailSelectionTab.value = true;
      if (index === 4) phoneNumberSelectionTab.value = true;
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
      }

      if (!e.target.classList.contains("m-dd-item")) {
        memberListShown.value = false;
      }
    };

    const selectGroup = (category, payload) => {
      selectedGroups.value = payload.map((i) => ({
        data: `${category}_${i.id}`,
        name: i.name,
      }));
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

    const subject = ref("");
    const phoneNumber = ref("");
    const loading = ref(false);
    // const isPersonalized = ref(false);

    const isoCode = ref("");
    const isPersonalized = ref(false);
    const invalidMessage = ref(false);
    const invalidDestination = ref(false);

    const sendSMS = (data) => {
      console.log(data, "DATA");
      invalidDestination.value = false;
      invalidMessage.value = false;

      if (
        selectedGroups.value.length === 0 &&
        !phoneNumber.value &&
        !email.value &&
        selectedMembers.value.length === 0
      ) {
        invalidDestination.value = true;
        return false;
      }

      if (!editorData.value) {
        invalidMessage.value = true;
        return false;
      }

      ElMessage({
        type: "info",
        message: "Email is being sent....",
        duration: 5000,
      });

      composeService
        .sendMessage("/api/Messaging/sendEmail", data)
        .then((res) => {
          if (res.data.status) {
            // store.dispatch('communication/addToSentEmail', res.data.mail)
            swal({
              title: "Success!",
              text: res.data.response,
              icon: "success",
              buttons: ["Good"],
              confirmButtonColor: "#8CD4F5",
              dangerMode: true,
            }).then((willDelete) => {
              if (willDelete) {
                store.dispatch("communication/addToSentEmail").then(() => {
                  router.push({ name: "SentEmails" });
                });
              }
            });
          } else if (res.data && !res.data.status) {
            ElMessage({
              message: res.data.message || "An error Occur",
              type: "warning",
              duration: 6000,
            });
          } else {
            ElMessage({
              type: "warning",
              message: "Message not sent, please try again",
              duration: 6000,
            });
          }
        })
        .catch((err) => {
          stopProgressBar();
          toast.removeAllGroups();
          if (err.toString().toLowerCase().includes("network error")) {
            ElMessage({
              type: "warning",
              message: "Please ensure you have internet access",
              duration: 5000,
            });
          } else {
            ElMessage({
              type: "error",
              message: "Email sending failed",
              duration: 5000,
            });
            console.log(err);
          }
        });
    };

    const contructScheduleMessageBody = (sendOrSchedule) => {
      const data = {
        subject: subject.value,
        message: `<!DOCTYPE html>
        <html lang="en">
            <head>
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width,initial-scale=1.0">
              <style>
                
              </style>
            </head>
            <body>
              <div id="email-body">${editorData.value} </div>
            </body>
          </html>`,
        isPersonalized: isPersonalized.value,
        groupedContacts: selectedGroups.value.map((i) => i.data),
      };

      const emails = [];
      email.value.split(",").forEach((i) => {
        i.split("\n").forEach((j) => {
          if (j) emails.push(j);
        });
      });

      data.toOthers = emails.join();

      if (selectedMembers.value.length > 0) {
        data.ToContacts =
          data && data.ToContacts ? (data.ToContacts.length > 0 ? "," : "") : "";
        data.ToContacts += selectedMembers.value
          .map((i) => {
            if (i.id) return i.id;
          })
          .join();
      }

      if (sendOrSchedule == 2) {
        data.executionDate = iSoStringFormat.value;
        data.date = iSoStringFormat.value;
        data.time = iSoStringFormat.value.split("T")[1];
        scheduleMessage(data);
      } else {
        sendSMS(data);
      }
    };

    const showScheduleModal = () => {
      display.value = true;
    };

    const scheduleMessage = async (data) => {
      display.value = false;
      const formattedDate = dateFormatter.monthDayTime(data.executionDate);
      try {
        await composerObj.sendMessage("/api/Messaging/saveEmailSchedule", data);
        router.push("/tenant/email/scheduled");
        ElMessage({
          type: "success",
          message: `message Scheduled for  ${formattedDate}`,
          duration: 5000,
        });
      } catch (error) {
        console.log(error);
        ElMessage({
          type: "error",
          message: "Could not Schedule message",
          duration: 5000,
        });
      }
    };

    const draftMessage = async () => {
      try {
        await composerObj.saveDraft("/api/Messaging/saveEmaillDraft", {
          subject: subject.value,
          body: editorData.value,
          isDefaultBirthDayMessage: false,
        });
        store.dispatch("communication/getEmailDrafts");
        ElMessage({
          type: "success",
          message: "Message saved as draft",
          duration: 5000,
        });
      } catch (error) {
        console.log(error, "drafting error");
        ElMessage({
          type: "warning",
          message: "Message not saved as draft",
          duration: 5000,
        });
      }
    };

    const userCountry = ref("");

    const route = useRoute();
    if (route.query.phone) {
      phoneNumber.value = route.query.phone;
      phoneNumberSelectionTab.value = true;
    }
    if (route.query.email) {
      email.value = route.query.email;
      emailSelectionTab.value = true;
    }

    if (route.query.group) {
      groupSelectionTab.value = true;
      selectedGroups.value.push({
        data: `group_~${route.query.group}`,
        name: route.query.group,
      });
      phoneNumberSelectionTab.value = true;
      emailSelectionTab.value = true;
    }

    const onEditorReady = () => {
      if (route.query.emaildraft) {
        communicationService.getEmailDraftById(route.query.emaildraft).then((res) => {
          console.log(res);
          if (res) {
            subject.value = res.subject;
            editorData.value = res.body;
          }
        });
      }
    };
    onEditorReady();

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

    const sendModalHeader = computed(() => {
      if (userCountry.value !== "Nigeria") return "Confirm Send";
      return "Send SMS Alternative";
    });

    const nigerian = computed(() => {
      if (userCountry.value === "Nigeria") return true;
      return false;
    });
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
        })
        .catch((err) => console.log(err));
    });

    const display = ref(false);
    const showDateTimeSelectionModal = () => {
      display.value = !display.value;
    };

    const memberListShown = ref(false);
    const showMemberList = () => {
      memberListShown.value = true;
    };
    const groupSelectInput = ref(null);
    const memberSelectInput = ref(null);

    const loadedMessage = ref("");
    const getMessage = async (messageId) => {
      try {
        const { message, subject: subj } = await composeService.getSMSById(messageId);
        loadedMessage.value = message;
        subject.value = subj;
      } catch (error) {
        console.log(error);
        ElMessage({
          type: "error",
          message: "Could not load email",
          duration: 5000,
        });
      }
    };

    if (route.query.messageId) {
      getMessage(route.query.messageId);
    }

    const contactSegment = ref([]);
    const getContactList = async () => {
      try {
        const res = await axios.get("/api/GetAllGroupBasicInformation");
        contactSegment.value = res.data.response.groupResonseDTO;
      } catch (error) {
        console.log(error);
      }
    };
    getContactList();

    const setSelectedGroup = (payload) => {
      selectGroup("group", payload);
    };

    return {
      loadedMessage,
      iSoStringFormat,
      showScheduleModal,
      editorData,
      possibleEmailDestinations,
      selectedGroups,
      selectGroup,
      removeGroup,
      showSection,
      groupSelectionTab,
      membershipSelectionTab,
      phoneNumberSelectionTab,
      emailSelectionTab,
      email,
      categories,
      allGroups,
      selectedMembers,
      removeMember,
      selectMember,
      searchText,
      filteredMembers,
      sendSMS,
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
      groupSelectInput,
      memberListShown,
      showMemberList,
      memberSelectInput,
      invalidDestination,
      invalidMessage,
      sendModalHeader,
      nigerian,
      onEditorReady,
      contructScheduleMessageBody,
      executionDate,
      isPersonalized,
      mdAndUp,
      lgAndUp,
      xlAndUp,
      xsOnly,
      onReady,
      contactSegment,
      setSelectedGroup,
      primarycolor,
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
  -ms-overflow-style: none; /* IE and Edge */
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
</style>
