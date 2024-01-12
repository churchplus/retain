<template>
  <div>
    <div class="container-fluid" @click="closeDropdownIfOpen">
      <!-- <div class="container" @click="closeDropdownIfOpen"> -->
      <div class="row">
        <div class="col-md-12 mt-4 px-0">
          <h4 class="font-weight-bold">Send SMS</h4>
        </div>
      </div>

      <div class="row bg-white mt-3 mt-md-5">
        <div class="col-12">
          <div class="row">
            <div class="col-md-8 mt-3 mt-md-5">
              <ElDropDown
                :options="drafts"
                optionLabel="title"
                placeholder="Choose template"
                @selectedvalue="setSelectedDraft"
                :multiple="false"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-md-8 mt-3">
              <ElDropDown
                :options="senderIDs"
                placeholder="Choose sender id"
                optionLabel="mask"
                @selectedvalue="setSelectedSenderId"
                :multiple="false"
              />
              <div
                class="mt-2 d-flex flex-column flex-md-row small-text"
                v-if="senderIDs.length == 0"
              >
                <div>
                  <div>You do not have an approved sender ID.</div>
                  <div class="text-danger">Sender ID is required</div>
                </div>
                <el-button type="primary" size="large" text>Request here</el-button>
              </div>
            </div>
          </div>
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
                placeholder="Enter comma seperated phone numbers eg. 2349033246067,190392833348"
                v-model="phoneNumber"
              />
              <!-- <div class="text-danger small-text mt-1" v-if="phoneNumber.length == 0 || selectedGroups.value.length == 0">
                Phone Numbers is required
              </div> -->
              <el-upload
                class="upload-demo mt-3"
                :limit="1"
                :on-change="uploadFile"
                :on-remove="handleRemove"
                :auto-upload="false"
                accept="text/csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              >
                <div>
                  <el-button class="secondary-button" size="large">Import phone numbers</el-button></div>
                <template #tip>
                  <div class="el-upload__tip">
                    <a
                  href="/files/Upload_Contact Template.csv"
                  class="template-text text-decoration-none font-weight-bold"
                  download
                  >Download template</a
                >
                  </div>
                </template>
              </el-upload>
              <div class="mt-1">
               
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-8 mt-3">
              <div>
                <el-checkbox label="Track url" v-model="trackUrl" size="large" />
              </div>
              <transition name="el-zoom-in-center">
                <el-input
                  type="text"
                  placeholder="Paste your URL here"
                  v-model="shortUrl"
                  v-show="trackUrl"
                />
              </transition>
              <el-input
                type="textarea"
                placeholder="Enter your message"
                rows="6"
                class="mt-3"
                v-model="editorData"
              />
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-12">
              <div>
                <el-checkbox
                  label="Schedule"
                  v-model="scheduleCheck"
                  @change="showScheduleModal"
                  size="large"
                />
              </div>
              <div>
                <el-checkbox
                  label="Create a new template from this"
                  @change="draftModal = true"
                  v-model="draftCheck"
                  size="large"
                />
              </div>
              <div>
                <el-checkbox
                  label="Preview template"
                  size="large"
                  v-model="previewCheck"
                  @change="displayTrackUrl = true"
                />
              </div>
            </div>
            <div class="col-8 mt-4">
              <el-button
                :color="primarycolor"
                size="large"
                @click="sendSMSDialog = true"
                class="w-100"
                >Send</el-button
              >
            </div>
          </div>
        </div>
      </div>
      <div class="row" v-if="false">
        <div class="col-md-2 px-0 align-self-center">
          <span class="small-text font-weight-600">Send to :</span>
        </div>
        <div class="p-0 col-md-6 form-group mb-0">
          <el-dropdown trigger="click" class="w-100">
            <div
              class="d-flex justify-content-between border-contribution text-dark w-100 bg-white"
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
                  v-for="(destination, index) in possibleSMSDestinations"
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
      </div>

      <!-- Enter phone numbers -->
      <div class="col-md-12 mb-1 mt-2 px-0" v-if="phoneNumberSelectionTab">
        <div class="row">
          <div class="col-md-2"></div>
          <div class="col-md-10 py-2 px-0">
            <el-input
              type="textarea"
              class="w-100"
              rows="4"
              placeholder="Enter phone number(s)"
              v-model="phoneNumber"
            />
          </div>
        </div>
      </div>

      <div class="row mb-2" v-if="groupSelectionTab">
        <div class="col-md-2"></div>
        <div class="col-md-10 px-0 mt-1">
          <el-select
            v-model="groupMultipleIDs"
            placeholder="Select group"
            class="group-category w-100"
            @remove-tag="removeTag"
            filterable
            multiple
          >
            <el-option-group v-for="group in categories" :key="group" :label="group">
              <el-option
                v-for="item in allGroups"
                :key="item.id"
                :label="item.name"
                :value="item.id"
                @click="selectGroup(item.category, item.id, item.name)"
              />
            </el-option-group>
          </el-select>
        </div>
      </div>

      <!-- Start upload contact -->
      <div v-if="true" class="row mt-3 mb-1">
        <div class="offset-md-2 col-md-10 px-0 grey-rounded-border bg-white p-2">
          <div class="d-flex justify-content-between">
            <input type="file" class="form-control-file" @change="uploadFile" />
            <div>
              <i
                class="pi pi-times mr-2 c-pointer"
                @click="() => (contactUpload = false)"
              ></i>
            </div>
          </div>
          <div class="mt-1">
            <a
              href="/files/Upload_Contact Template.csv"
              class="template-text text-decoration-none font-weight-bold"
              download
              >Download template</a
            >
          </div>
        </div>
      </div>

      <div
        class="row mt-1"
        v-if="phoneNumberSelectionTab || membershipSelectionTab || groupSelectionTab"
      >
        <div class="col-md-12 pr-0">
          <hr class="hr my-1" />
        </div>
      </div>

      <!-- <div cla/ -->

      <div class="row my-3">
        <!-- <div class="col-md-12 form-group">
          <div class="row">
            <div class="col-md-2"></div>
            <div class="col-md-10 pl-0">
              <el-checkbox v-model="isPersonalized" class="mr-3" size="large" />
              <span class="font-weight-700 px-14">Personal Message</span>
            </div>
          </div>
        </div> -->
        <!-- <div class="col-md-12">
          <div class="row">
            <div class="col-md-2"></div>
            <div class="col-md-10 pl-0">
              <span class="hint"
                >Insert #name# any where you want the contact name to appear in the
                message, it will be replaced by the actual name of the member when sending
                the message.</span
              >
            </div>
          </div>
        </div> -->
      </div>

      <!-- <div class="row mt-4 mb-5">
        <div class="col-md-12">
          <p
            class="mb-1 text-danger text-right font-weight-700"
            v-if="invalidDestination"
          >
            Please select destination
          </p>
          <p class="mb-1 text-danger text-right font-weight-700" v-if="invalidMessage">
            Enter your message
          </p>
        </div>
        <div class="col-md-12 d-flex justify-content-end">
          <el-dropdown
            split-button
            :color="primarycolor"
            class="split-button"
            size="large"
            trigger="click"
            @click="sendSMSDialog = true"
          >
            Send
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="showScheduleModal">Schedule</el-dropdown-item>
                <el-dropdown-item @click="draftMessage">Save as draft</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>

          <router-link
            class="no-decoration"
            :to="
              route.fullPath.includes('/tenant/sms/compose')
                ? '/tenant/sms/sent'
                : '/errorpage/expiredSubscription'
            "
          >
            <el-button class="ml-3 secondary-button" size="large">Discard</el-button>
          </router-link>

      
          <router-link :to="
            route.fullPath.includes('/tenant/sms/compose')
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
          </router-link>
        </div>
      </div> -->

      <!-- Send SMS modal -->
      <el-dialog
        v-model="sendSMSDialog"
        title=""
        :width="mdAndUp || lgAndUp || xlAndUp ? `50%` : xsOnly ? `90%` : `70%`"
        align-center
        class="px-4"
      >
        <div class="row" v-if="!nigerian">
          <div class="col-md-12 text-center">
            <el-button
              :loading="loading"
              :disabled="disableBtn"
              :color="primarycolor"
              class="w-100"
              @click="contructScheduleMessageBody(1, '')"
              round
              >Send SMS now</el-button
            >
            <!-- <button class=" primary-btn default-btn px-4 my-2 border-0 primary-bg text-white outline-none extra-btn"
              data-dismiss="modal" @click="contructScheduleMessageBody(1, '')">
              Send SMS Now
            </button> -->
          </div>
        </div>

        <div class="row" v-else>
          <div class="col-md-12">
            <div class="row">
              <div class="col-md-12 px-1">
                <p>
                  <strong> Multi-Layered SMS Send:</strong> We leverage 3 channels to
                  ensure you get the best delivery for your SMS. 👏🥳
                </p>
              </div>
            </div>

            <!-- <div class="row">
              <div class="col-md-12 px-1">
                <hr class="hr" />
              </div>
            </div> -->

            <div class="row d-flex justify-content-between">
              <div class="col-md-12 px-1">
                <div class="container">
                  <div class="row">
                    <!-- <div class="col-md-12">
                      <label for="" class="small-text font-weight-600 py-2">NEW** HYBRID BULK SMS - 100% SMS DELIVERY
                        (SENDER ID AND DEDICATED)</label>
                    </div> -->
                    <div
                      class="col-md-12 send-now-div py-2 my-2 d-flex justify-content-center"
                    >
                      <el-button
                        :loading="loading"
                        :disabled="disableBtn"
                        :color="primarycolor"
                        class="w-100"
                        @click="contructScheduleMessageBody(1, 'hybridKonnect')"
                        round
                        >Send SMS now</el-button
                      >
                      <!-- <button class=" primary-btn default-btn border-0 primary-bg px-4 my-2 font-weight-600 outline-none"
                        data-dismiss="modal" @click="contructScheduleMessageBody(1, 'hybridKonnect')">
                        Send SMS Now
                      </button> -->
                    </div>
                    <!-- <div class="col-md-12 px-0">
                      <hr class="hr my-2" />
                    </div>
                    <div class="col-md-12 px-0 d-flex flex-column">
                      <span>Sender ID Customization - YES</span>
                      <span>Not Affected by DND.</span>
                      <span>Failed SMS are Retried with Other
                        Options.</span>
                    </div> -->
                  </div>
                </div>
              </div>
              <!-- <div class="col-md-6 px-1 mt-3 mt-md-0">
                <div class="container">
                  <div class="row">
                    <div class="col-md-12">
                      <label for="" class="small-text font-weight-600 py-2">DEDICATED NUMBER CHANNEL- USES NUMBER AS
                        SENDER ID</label>
                    </div>
                    <div class=" col-md-12 my-2 send-now-div py-2 d-flex justify-content-center">
                      <el-button type="info" @click="contructScheduleMessageBody(1, 'hostedsms')" round>Send SMS
                        now</el-button>
                    </div>
                    <div class="col-md-12 px-0">
                      <hr class="hr my-2" />
                    </div>
                    <div class="col-md-12 px-0 d-flex flex-column">
                      <span>Sender ID Customization - NO</span>
                      <span>Not Affected by DND.</span>
                      <span>Failed SMS are not retried with other
                        options.</span>
                    </div>
                  </div>
                </div>
              </div> -->
            </div>
            <!-- <div class="row mt-3">
              <div class="col-md-12 px-1">
                <hr class="hr" />
              </div>
            </div> -->
            <div class="row">
              <div class="col-md-12 small-text mt-2 notecolour font-weight-bold">
                <span class="text-dark font-weight-bold"> NB :</span>
                <span>
                  Messages should be sent between 8am to 8pm (By NCC). Messages sent after
                  8pm will be delivered the next day by 8am. This affects MTN, GLO and
                  9Mobile
                </span>
                <!-- <span>
                  Messages sent between <span class="text-secondary"> 8pm to 8am (Night
                  Messages)</span> will be delivered using the dedicated
                  phone number. If you wish to use sender ID, kindly
                  send messages between 8am in the morning to 8pm in
                  the evening.
                </span> -->
              </div>
            </div>
          </div>
        </div>
      </el-dialog>

      <!-- Schedudle SMS modal -->

      <el-dialog
        v-model="display"
        @close="scheduleCheck = false"
        title="Select date and time"
        :width="mdAndUp || lgAndUp || xlAndUp ? `50%` : xsOnly ? `90%` : `70%`"
        align-center
        class="p-4"
      >
        <div class="row">
          <!-- <el-date-picker v-model="executionDate" type="datetime" class="w-100" placeholder="Select date and time" /> -->
          <input
            type="datetime-local"
            class="form-control my-3"
            v-model="executionDate"
            placeholder="Select date and time"
          />
        </div>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="display = false" class="secondary-button" size="large"
              >Cancel</el-button
            >
            <el-button :color="primarycolor" :loading="scheduleLoading" @click="contructScheduleMessageBody(2, '')" size="large">
              Schedule
            </el-button>
          </span>
        </template>
      </el-dialog>

      <!-- Draft SMS modal -->

      <el-dialog
        v-model="draftModal"
        title="Create a template"
        @close="draftCheck = false"
        :width="mdAndUp || lgAndUp || xlAndUp ? `50%` : xsOnly ? `90%` : `70%`"
        align-center
      >
        <div class="row">
          <div class="col-md-12">
            <el-input
              type="text"
              class="my-3"
              v-model="draftTitle"
              placeholder="Enter a title for the template"
            />
          </div>
          <div class="col-md-12">
            <el-input
              v-model="editorData"
              id="description"
              :rows="3"
              type="textarea"
              disabled
            />
          </div>
        </div>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="draftModal = false" class="secondary-button" size="large"
              >Cancel</el-button
            >
            <el-button
              :color="primarycolor"
              :disabled="!draftTitle"
              @click="draftMessage"
              :loading="draftLoading"
              size="large"
              >Create template</el-button
            >
          </span>
        </template>
      </el-dialog>

      <!-- Preview Template modal -->

      <el-dialog
        v-model="displayTrackUrl"
        @close="previewCheck = false"
        title="Preview"
        :width="mdAndUp || lgAndUp || xlAndUp ? `50%` : xsOnly ? `90%` : `70%`"
        align-center
        class="p-4"
      >
        <div class="row">
          <div class="col-12">
            {{ editorData }}
          </div>
          <div class="col-12">
            {{ shortUrl }}
          </div>
        </div>
        <!-- <template #footer>
          <span class="dialog-footer">
            <el-button @click="display = false" class="secondary-button"
              >Cancel</el-button
            >
            <el-button :color="primarycolor" @click="contructScheduleMessageBody(2, '')">
              Schedule
            </el-button>
          </span>
        </template> -->
      </el-dialog>

      <!-- Create sender id modal -->
      <!-- Modal -->
      <div
        class="modal fade"
        id="senderIdModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">Request Sender ID</h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
                ref="closeModal"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="container">
                <div class="row">
                  <div class="col-12">Enter Sender ID</div>
                  <div class="col-12 mt-2">
                    <el-form
                      ref="ruleFormRef"
                      :model="senderIDValidateForm"
                      label-width="100px"
                      class="demo-ruleForm"
                      :rules="rules"
                    >
                      <el-form-item class="sender-id-input" prop="senderIdText">
                        <el-input
                          type="text"
                          placeholder="Enter sender id"
                          v-model="senderIDValidateForm.senderIdText"
                        />
                      </el-form-item>
                    </el-form>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <el-button class="secondary-button" data-dismiss="modal" round
                >Cancel</el-button
              >
              <el-button
                :color="primarycolor"
                :loading="senderidloading"
                @click="submitSenderForm(ruleFormRef)"
                round
                >Request</el-button
              >
              <!-- <button type="button" class="btn default-btn" data-dismiss="modal">
                Close
              </button>
              <button type="button" class="btn default-btn primary-bg border-0 text-white" data-dismiss="modal"
                >
                Request sender id
              </button> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref, inject, reactive, watchEffect } from "vue";
import composeService from "../../services/communication/composer";
import composerObj from "../../services/communication/composer";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import store from "../../store/store";
import axios from "@/gateway/backendapi";
import stopProgressBar from "../../services/progressbar/progress";
import communicationService from "../../services/communication/communicationservice";
import dateFormatter from "../../services/dates/dateformatter";
import moment from "moment";
import swal from "sweetalert";
import deviceBreakpoint from "../../mixins/deviceBreakpoint";
import { ElMessage } from "element-plus";
import ElDropDown from "@/components/dropdown/ElDropDown";

export default {
  components: {
    ElDropDown,
  },
  setup() {
    const primarycolor = inject("primarycolor");
    const router = useRouter();
    const editorData = ref("");
    const disableBtn = ref(false);
    const loading = ref(false);
    const editorConfig = {
      // The configuration of the editor.
      height: "800",
    };
    const ruleFormRef = ref();
    const senderIDValidateForm = reactive({
      senderIdText: "",
    });
    const closeModal = ref();
    const senderidloading = ref(false);

    const possibleSMSDestinations = composeService.possibleSMSDestinations;
    const groupsAreVissible = ref(false);
    const groupSelectionTab = ref(false);
    const membershipSelectionTab = ref(false);
    const phoneNumberSelectionTab = ref(false);
    const selectedGroups = ref([]);
    // const sendToAll = ref(false);
    const executionDate = ref("");
    const contactUpload = ref(false);
    const multipleContact = ref({});
    const tenantId = ref("");
    const senderIDs = ref([]);
    const selectedSender = ref({});
    const searchSenderText = ref("");
    const senderIdRef = ref();
    const iSoStringFormat = ref("");
    const requestbtn = ref(false);
    const sendSMSDialog = ref(false);
    const { mdAndUp, lgAndUp, xlAndUp, xsOnly } = deviceBreakpoint();
    const groupMultipleIDs = ref([]);
    const checkList = ref([]);
    const draftModal = ref(false);
    const draftTitle = ref("");
    const draftLoading = ref(false);
    const trackUrl = ref(false);
    const shortUrl = ref("");
    const draftCheck = ref(false);
    const scheduleCheck = ref(false);
    const displayTrackUrl = ref(false);
    const previewCheck = ref(false);
    const scheduleLoading = ref(false);
    const gateway = ref("")

    const toggleGroupsVissibility = () => {
      groupsAreVissible.value = !groupsAreVissible.value;
    };

    watchEffect(() => {
      if (executionDate.value) {
        iSoStringFormat.value = dateFormatter.getISOStringGMT(executionDate.value);
      }
    });

    const showSection = (index) => {
      if (index === 0) phoneNumberSelectionTab.value = true;
      if (index === 1) groupSelectionTab.value = true;
      if (index === 2) contactUpload.value = true;
      // if (index === 2) membershipSelectionTab.value = true;
      // if (index === 0) {
      //   groupSelectionTab.value = true;
      //   selectedGroups.value.push({
      //     data: "membership_00000000-0000-0000-0000-000000000000",
      //     name: "All Contacts",
      //   });
      // }
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
              if (memberInExistingCollection && memberInExistingCollection.id)
                return false;
              return true;
            });
          });
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

    // const isPersonalized = ref(false);

    const isoCode = ref("");
    const isPersonalized = ref(false);
    const invalidMessage = ref(false);
    const invalidDestination = ref(false);

    const setSelectedSenderId = (payload) => {
      subject.value = payload;
      if (searchSenderIDs.value || subject.value) {
        disableBtn.value = false;
      } else {
        disableBtn.value = true;
      }
    };

    const sendSMS = (data) => {
      // disableBtn.value = true;

      invalidDestination.value = false;
      invalidMessage.value = false;
      loading.value = true;

      if (
        selectedGroups.value.length === 0 &&
        !phoneNumber.value &&
        selectedMembers.value.length === 0 &&
        !(multipleContact.value instanceof File)
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
        message: "SMS is being sent...",
        duration: 3000,
      });

      // if (selectedMembers.value.length > 0) data.contacts = selectedMembers.value;
      // disableBtn.value = true;
      composeService
        .sendMessage("/api/Messaging/sendSms", data)
        .then((res) => {
          loading.value = false;
          sendSMSDialog.value = false;
          if (res.data.status) {
            swal({
              title: "Success!",
              text: "Your sms has been sent successfully!",
              icon: "success",
              buttons: ["Good"],
              confirmButtonColor: "#8CD4F5",
              dangerMode: true,
            });

            // Route to sent SMS list after successfully sent
            setTimeout(() => {
              if (route.fullPath === "/sendsmsexpired") {
                router.push("/errorpage/expiredSubscription");
              } else {
                router.push({ name: "SentMessages" });
              }
            }, 3500);

            disableBtn.value = false;
          } else if (res.data && !res.data.status) {
            ElMessage({
              message: res.data.message || "Message not sent, please try again",
              type: "warning",
              duration: 6000,
            });
            // ElMessage({
            //   message: "Insufficient unit" + ", " + res.data.message,
            //   type: "warning",
            //   duration: 6000,
            // });
          } else {
            ElMessage({
              type: "warning",
              message: "Message not sent, please try again",
              duration: 6000,
            });
          }

          store.dispatch("removeSMSUnitCharge", res.data.unitsUsed);

          // Save the res to store in other to get it in the view sent sms page
          let sentObj = {
            message: res.data.sentMessageDTO ? res.data.sentMessageDTO.message : "",
            id:
              res.data && res.data.sentMessageDTO && res.data.sentMessageDTO.id
                ? res.data.sentMessageDTO.id
                : "",
            smsUnitsUsed: res.data.sentMessageDTO
              ? res.data.sentMessageDTO.smsUnitsUsed
              : "",
            dateSent: "",
            deliveryReport: [{ report: "-" }],
            report: res.data.sentMessageDTO ? res.data.sentMessageDTO.report : "",
          };
          store.dispatch("communication/addSmsToSentList", sentObj);
        })
        .catch((err) => {
          stopProgressBar();
          disableBtn.value = false;
          loading.value = false;
          console.log(err);
          if (err.toString().toLowerCase().includes("network error")) {
            ElMessage({
              type: "warning",
              message: "Please ensure you have internet access",
              duration: 6000,
            });
          } else if (err.toString().toLowerCase().includes("timeout")) {
            ElMessage({
              type: "warning",
              message: "SMS took too long, please check your network and try again",
              duration: 6000,
            });
          } else {
            ElMessage({
              type: "warning",
              message: "SMS sending failed, Please try again",
              duration: 6000,
            });
          }
        });
    };

    const draftMessage = async () => {
      draftLoading.value = true;
      try {
        await composerObj.saveDraft(
          {
            title: draftTitle.value,
            sender: subject.value.mask,
            body: editorData.value,
            isDefaultBirthDayMessage: false,
            dateModified: new Date().toISOString()
          },
          "/api/Messaging/PostSmsDraft"
        );
        draftModal.value = false;
        draftLoading.value = false;
        store.dispatch("communication/getSMSDrafts");
        ElMessage({
          type: "success",
          message: "Template created successfully",
          duration: 6000,
        });
      } catch (error) {
        draftModal.value = false;
        draftLoading.value = false;
        ElMessage({
          type: "warning",
          message: "Template not created, please try again",
          duration: 6000,
        });
      }
    };

    const contructScheduleMessageBody = (sendOrSchedule, gateway) => {
      gateway.value = gateway
      disableBtn.value = true;
      console.log(disableBtn.value, "disablesd");
      const data = {
        subject: subject.value.mask,
        message: editorData.value,
        contacts: [],
        isPersonalized: isPersonalized.value,
        groupedContacts: selectedGroups.value.map((i) => i.data),
        isoCode: isoCode.value,
        category: "",
        emailAddress: "",
        emailDisplayName: "",
        gateWayToUse: gateway,
      };

      const numbers = [];
      phoneNumber.value.split(",").forEach((i) => {
        i.split("\n").forEach((j) => {
          if (j) numbers.push(j);
        });
      });

      data.toOthers = numbers.join();

      if (selectedMembers.value.length > 0) {
        data.ToContacts =
          data && data.ToContacts ? (data.ToContacts.length > 0 ? "," : "") : "";
        data.ToContacts += selectedMembers.value
          .map((i) => {
            if (i.id) return i.id;
          })
          .join();
      }

      if (subject.value) {
        // if (multipleContact.value instanceof File) {
          
        // }
        if (sendOrSchedule == 2) {
          data.executionDate = iSoStringFormat.value;
          data.date = iSoStringFormat.value;
          data.time = iSoStringFormat.value.split("T")[1];
          if (data.date) {
            scheduleMessage(data);
          } else {
            ElMessage({
              type: "warning",
              message: "Please choose the date and time for this campaign to be scheduled",
              duration: 6000,
            });
          }
        } else {
          sendSMS(data);
        }
      } else {
        ElMessage({
          type: "warning",
          message: "No sender id selected, Kindly select a sender id and try again",
          duration: 7000,
        });
      }
    };

    const showScheduleModal = () => {
      display.value = true;
    };

    const scheduleMessage = async (data) => {
      scheduleLoading.value = true;
      const formattedDate = dateFormatter.monthDayTime(data.date);
      try {
        await composerObj.sendMessage("/api/Messaging/saveSmsSchedule", data);
        router.push("/tenant/sms/scheduled");
        ElMessage({
          type: "success",
          message: `Message scheduled for ${formattedDate}`,
          duration: 6000,
        });
        scheduleLoading.value = false
        display.value = false
      } catch (error) {
        console.log(error);
        ElMessage({
          type: "error",
          message: "Schedule failed, please try again",
          duration: 6000,
        });
      }
    };

    const sendSMSToUploadedContacts = async (gateway) => {
      console.log('reaching')
      let formData = new FormData();
      formData.append("contactUploadedFile", multipleContact.value);
      formData.append("message", editorData.value);
      formData.append("category", "");
      formData.append("gatewayToUse", gateway);
      formData.append("isoCode", isoCode.value);

      try {
        await axios.post("/api/messaging/upload", formData);
        ElMessage({
          type: "success",
          message: "Message sent to uploaded contacts",
          duration: 6000,
        });
      } catch (err) {
        console.log(err);
        ElMessage({
          type: "error",
          message: "Sending failed, please try again",
          duration: 6000,
        });
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
          editorData.value = res.body;
        } else {
          console.log(res, "error response");
        }
      });
    }

    if (store.getters.currentUser && store.getters.currentUser.isoCode) {
      isoCode.value = store.getters.currentUser.isoCode;
      userCountry.value = store.getters.currentUser.country;
      tenantId.value = store.getters.tenantId;
    } else {
      axios
        .get("/api/Membership/GetCurrentSignedInUser")
        .then((res) => {
          isoCode.value = res.data.isoCode;
          userCountry.value = res.data.country;
          tenantId.value = res.data.tenantId;
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

    // const sendOptions = [
    //   {
    //     label: "Schedule",
    //     icon: "pi pi-clock",
    //     command: () => {
    //       showScheduleModal();
    //     },
    //   },
    //   {
    //     label: "Save as Draft",
    //     icon: "pi pi-save",
    //     command: () => {
    //       draftMessage();
    //     },
    //   },
    //   // {
    //   //   label: "Upload",
    //   //   icon: "pi pi-upload",
    //   //   to: "/fileupload",
    //   // },
    // ];

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
          allGroups.value = allGroups.value[6];
          categories.value = [categories.value[6]];
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
    };

    const memberListShown = ref(false);
    const showMemberList = () => {
      memberListShown.value = true;
    };
    const groupSelectInput = ref(null);
    const memberSelectInput = ref(null);

    // const data = () => {
    //   // displays.value = true
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
        const { message, subject: subj } = await composeService.getSMSById(messageId);
        editorData.value = message;
        subject.value = subj;
      } catch (error) {
        console.log(error);
        ElMessage({
          type: "error",
          message: "Could not load message",
          duration: 6000,
        });
      }
    };

    if (route.query.messageId) {
      getMessage(route.query.messageId);
    }

    const uploadFile = (e) => {
      multipleContact.value = e.raw;

      sendSMSToUploadedContacts(gateway.value);
    };

    const getSenderId = async () => {
      try {
        let { data } = await axios.get(`/api/Messaging/RetrieveTenantSenderIDs`);
        senderIDs.value = data.returnObject;
      } catch (err) {
        console.log(err);
      }
    };
    getSenderId();

    const submitSenderForm = async (formEl) => {
      if (!formEl) return;
      await formEl.validate((valid, fields) => {
        if (valid) {
          saveSenderId();
        } else {
          console.log("error submit!", fields);
        }
      });
    };

    const saveSenderId = async () => {
      senderidloading.value = true;
      let payload = {
        tenantID: tenantId.value,
        mask: senderIDValidateForm.senderIdText,
      };
      try {
        let { data } = await axios.post(`/api/Messaging/RequestSenderID`, payload);
        senderidloading.value = false;
        closeModal.value.click();
        if (data.status === 0) {
          ElMessage({
            type: "warning",
            message:
              "PENDING, Sender id is pending for approval, when it is approved, you will see it among the sender id list",
            duration: 6000,
          });
        } else if (data.status === 1) {
          ElMessage({
            type: "warning",
            message:
              "PROCESSING, Sender id is processing for approval, when it is approved, you will see it among the sender id list",
            duration: 6000,
          });
        } else if (data.status === 2) {
          ElMessage({
            type: "success",
            message: "APPROVED, Sender id is approved!",
            duration: 6000,
          });
        } else {
          ElMessage({
            type: "error",
            message: "NOT APPROVED, Sender id is not approved, create another one.",
            duration: 6000,
          });
        }
        setIdToSubject({ mask: senderIDValidateForm.senderIdText });
        senderIDValidateForm.senderIdText = "";

        getSenderId();
      } catch (err) {
        senderidloading.value = false;
        console.log(err);
      }
    };

    const searchSenderIDs = computed(() => {
      if (!searchSenderText.value) return senderIDs.value;
      return senderIDs.value.filter((i) => {
        return i.mask.toLowerCase().includes(searchSenderText.value.toLowerCase());
      });
    });

    const setIdToSubject = (item) => {
      searchSenderText.value = item.mask;
      subject.value = item.mask;
      selectedSender.value = item;
    };

    const validateSenderId = async (rule, value, callback) => {
      var regExp = /^[a-zA-Z0-9]{3,11}$/;
      var testString = senderIDValidateForm.senderIdText;
      if (!regExp.test(testString)) {
        // requestbtn.value = true
        return callback(
          new Error(
            "Should not contain any special characters AND Should not be less than 3 characters and not more than 11 characters"
          )
        );
      } else {
        // requestbtn.value = false
      }
    };

    const rules = reactive({
      senderIdText: [{ validator: validateSenderId, required: true, trigger: "blur" }],
    });

    const removeTag = (value) => {
      selectedGroups.value = selectedGroups.value.filter((i) => !i.data.includes(value));
    };

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

    const drafts = ref([]);
    const getSMSDrafts = async () => {
      await store
        .dispatch("communication/getSMSDrafts")
        .then((response) => {
          drafts.value = response;
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getSMSDrafts();

    const setSelectedDraft = (payload) => {
      editorData.value = payload.body;
      ElMessage({
        type: "success",
        showClose: true,
        message: `${payload.title} ${payload.title.toLowerCase().includes('template') ? "" : "template"} selected`,
        duration: 4000
      })
    };

    const setSelectedGroup = (payload) => {
      selectGroup("group", payload);
    };

    const handleRemove = () => {
      multipleContact.value = new Object();
    };

    return {
      primarycolor,
      iSoStringFormat,
      setSelectedSenderId,
      editorData,
      // displays,
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
      groupListShown,
      showGroupList,
      groupSelectInput,
      memberListShown,
      showMemberList,
      memberSelectInput,
      invalidDestination,
      invalidMessage,
      // sendToAll,
      sendModalHeader,
      nigerian,
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
      saveSenderId,
      tenantId,
      senderIDs,
      setIdToSubject,
      selectedSender,
      searchSenderText,
      validateSenderId,
      senderIdRef,
      searchSenderIDs,
      requestbtn,
      sendSMSDialog,
      showScheduleModal,
      mdAndUp,
      lgAndUp,
      xlAndUp,
      xsOnly,
      ruleFormRef,
      rules,
      senderIDValidateForm,
      closeModal,
      senderidloading,
      submitSenderForm,
      removeTag,
      groupMultipleIDs,
      contactSegment,
      checkList,
      drafts,
      setSelectedDraft,
      draftModal,
      draftTitle,
      draftLoading,
      setSelectedGroup,
      trackUrl,
      shortUrl,
      draftCheck,
      scheduleCheck,
      displayTrackUrl,
      previewCheck,
      scheduleLoading,
      handleRemove,
      gateway
    };
  },
};
</script>

<style scoped>
.notecolour {
  /* color: rgb(199, 129, 23);; */
  color: rgb(249, 174, 34);
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

/* .send-now-div {
  border: 1px solid #ddd;
} */

.modal-lg {
  max-width: 680px;
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
  color: rgb(15, 71, 134);
}

.create-new-bg {
  background: #dadada;
  color: rgb(15, 71, 134);
}

.create-new-bg:hover {
  background: #dadadad2;
  color: rgb(15, 71, 134);
}
</style>
