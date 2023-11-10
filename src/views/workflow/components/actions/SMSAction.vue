<template>
  <div
    class="container max-height scroll-div"
    v-for="(item, index) in removeOthers"
    :key="index"
  >
    <div class="row mt-4">
      <div class="col-md-12 px-0">
        <label for="" class="font-weight-600">SMS</label>
      </div>
      <div class="col-md-12">
        <div class="row">
          <div class="col-md-12">
            <input
              type="checkbox"
              name=""
              id=""
              v-model="item.person"
              @change="handleSendPersonMail"
            />
            The person
          </div>
          <div class="col-md-12">
            <input
              type="checkbox"
              name=""
              id=""
              v-model="item.parent"
              @change="handleSendPersonsParentMail"
            />
            The person's parent
          </div>
          <div class="col-md-12">
            <input
              type="checkbox"
              name=""
              id=""
              v-model="item.spouse"
              @change="handleSendPersonsSpouseMail"
            />
            The person's spouse
          </div>
          <div class="col-md-12">
            <input
              type="checkbox"
              name=""
              id=""
              v-model="item.groupLeader"
              @change="handleSendGroupLeaderMail"
            />
            The Group Leaders
          </div>
        </div>
      </div>
    </div>

    <div class="row mt-4">
      <div class="col-md-12 px-0">
        <label for="" class="font-weight-600">And the following</label>
      </div>
      <div class="col-md-12">
        <input
          type="text"
          class="form-control"
          v-model="item.otherToContacts"
          @change="handleOtherAddresses"
        />
        <span class="small-text">Separate the addresses with comma</span>
      </div>
    </div>

    <div class="row mt-4">
      <div class="col-md-12 px-0">
        <label for="" class="font-weight-600">With the following subject</label>
      </div>
      <div class="col-md-12">
        <div class="dropdown">
          <button
            class="
              btn btn-default
              border
              w-100
              d-flex
              justify-content-between
              align-items-center
            "
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <div>
              {{
                item.selectedSender &&
                Object.keys(item.selectedSender).length > 0
                  ? item.selectedSender.mask
                  : "Select Sender Id"
              }}
            </div>
            <i class="pi pi-chevron-down"></i>
          </button>
          <div
            class="dropdown-menu w-100 pb-0 overflow-card"
            aria-labelledby="dropdownMenuButton"
          >
            <div class="px-2"></div>
            <a
              v-for="(i, index) in searchSenderIDs"
              :key="index"
              class="dropdown-item c-pointer small-text font-weight-700 py-2"
              @click="setIdToSubject(i)"
              >{{ i.mask }}
            </a>
            <a
              class="
                dropdown-item
                c-pointer
                font-weight-700
                text-center
                create-new-bg
                border-top
                py-2
              "
              data-toggle="modal"
              data-target="#senderIdModal"
              ><i class="pi pi-plus-circle"></i>&nbsp;Request new sender id
            </a>
          </div>
        </div>
        <!-- <input type="text" class="form-control" v-model="subject" @change="handleSubject"> -->
      </div>
    </div>

    <div class="row mt-4 mb-5">
      <div class="col-md-12 px-0">
        <label for="" class="font-weight-600">And message</label>
      </div>
      <div class="col-md-12">
        <textarea
          name=""
          id=""
          class="w-100 form-control"
          rows="3"
          v-model="item.message"
          @change="handleMessage"
        ></textarea>
      </div>
    </div>
  </div>

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
          <h5 class="modal-title" id="exampleModalLongTitle">
            Create sender id
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
          <div class="container">
            <div class="row">
              <div class="col-12">Enter sender id</div>
              <div class="col-12 mt-2">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter sender id"
                  v-model="senderIdText"
                  @input="validateSenderId"
                  ref="senderIdRef"
                />
                <div class="invalid-feedback text-danger pl-2">
                  <ul>
                    <li>Should not contain any special characters</li>
                    <li>
                      Should not be less than 3 characters and more than 11
                      characters
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn default-btn" data-dismiss="modal">
            Close
          </button>
          <button
            type="button"
            class="btn default-btn primary-bg border-0 text-white"
            data-dismiss="modal"
            @click="saveSenderId"
            :disabled="requestbtn"
          >
            Request sender id
          </button>
        </div>
      </div>
    </div>
  </div>
  <Toast />
</template>

<script>
import { reactive, ref } from "@vue/reactivity";
import { computed, watchEffect } from "@vue/runtime-core";
import axios from "@/gateway/backendapi";
import { useToast } from "primevue/usetoast";
export default {
  props: ["selectedActionIndex", "parameters", "selectSMSList"],
  setup(props, { emit }) {
    const data = reactive([]);
    const actionType = reactive(1);
    const person = ref(false);
    const searchSenderText = ref("");
    const senderIDs = ref([]);
    const selectedSender = ref({});
    const senderIdRef = ref();
    const senderIdText = ref("");
    const toast = useToast();
    const requestbtn = ref(false);
    const tenantId = ref("");
    const removeOthers = ref([]);

    const handleSendPersonMail = () => {
      if (data[props.selectedActionIndex]) {
        data[props.selectedActionIndex].JSONActionParameters.person =
          removeOthers.value[0].person;
      } else {
        data[props.selectedActionIndex] = new Object();
        data[props.selectedActionIndex].JSONActionParameters = new Object();
        data[props.selectedActionIndex].JSONActionParameters.person =
          removeOthers.value[0].person;
      }

      emit("updateaction", data, props.selectedActionIndex, actionType);
    };

    const parent = ref(false);
    const handleSendPersonsParentMail = () => {
      if (data[props.selectedActionIndex]) {
        console.log(data[props.selectedActionIndex]);
        data[props.selectedActionIndex].JSONActionParameters.parent =
          removeOthers.value[0].parent;
      } else {
        console.log(data[props.selectedActionIndex]);
        data[props.selectedActionIndex] = new Object();
        data[props.selectedActionIndex].JSONActionParameters = new Object();
        data[props.selectedActionIndex].JSONActionParameters.parent =
          removeOthers.value[0].parent;
      }
      emit("updateaction", data, props.selectedActionIndex, actionType);
    };

    const spouse = ref(false);
    const handleSendPersonsSpouseMail = () => {
      if (data[props.selectedActionIndex]) {
        data[props.selectedActionIndex].JSONActionParameters.spouse =
          removeOthers.value[0].spouse;
      } else {
        data[props.selectedActionIndex] = new Object();
        data[props.selectedActionIndex].JSONActionParameters = new Object();
        data[props.selectedActionIndex].JSONActionParameters.spouse =
          removeOthers.value[0].spouse;
      }
      emit("updateaction", data, props.selectedActionIndex, actionType);
    };

    const groupLeader = ref(false);
    const handleSendGroupLeaderMail = () => {
      if (data[props.selectedActionIndex]) {
        data[props.selectedActionIndex].JSONActionParameters.groupLeader =
          removeOthers.value[0].groupLeader;
      } else {
        data[props.selectedActionIndex] = new Object();
        data[props.selectedActionIndex].JSONActionParameters = new Object();
        data[props.selectedActionIndex].JSONActionParameters.groupLeader =
          removeOthers.value[0].groupLeader;
      }
      emit("updateaction", data, props.selectedActionIndex, actionType);
    };

    const otherToContacts = ref("");
    const handleOtherAddresses = () => {
      if (data[props.selectedActionIndex]) {
        data[props.selectedActionIndex].JSONActionParameters.otherToContacts =
          removeOthers.value[0].otherToContacts;
      } else {
        data[props.selectedActionIndex] = new Object();
        data[props.selectedActionIndex].JSONActionParameters = new Object();
        data[props.selectedActionIndex].JSONActionParameters.otherToContacts =
          removeOthers.value[0].otherToContacts;
      }

      emit("updateaction", data, props.selectedActionIndex, actionType);
    };

    const BCCParent = ref("");
    const handleParentBBC = (e) => {
      data.JSONActionParameters.BCCParent = e.target.checked;
      emit("updateaction", data, props.selectedActionIndex);
    };

    const BCCSpouse = ref("");
    const handleSpouseBBC = (e) => {
      data.JSONActionParameters.BCCSpouse = e.target.checked;
      emit("updateaction", data, props.selectedActionIndex);
    };

    const BCCGroupLeader = ref("");
    const handleBCCGroupLeader = (e) => {
      data.JSONActionParameters.BCCGroupLeader = e.target.checked;
      emit("updateaction", data, props.selectedActionIndex);
    };

    const otherBBC = ref("");
    const handleOtherBBC = (e) => {
      data.JSONActionParameters.otherBBC = e.target.checked;
      emit("updateaction", data, props.selectedActionIndex);
    };

    const sendIndividualMails = ref(false);
    const handleSendIndividualMails = (e) => {
      data.JSONActionParameters.sendIndividualMails = e.target.checked;
      emit("updateaction", data, props.selectedActionIndex);
    };

    const replyToEmailAddress = ref("");
    const handleReplyEmail = (e) => {
      data.JSONActionParameters.replyToEmailAddress = e.target.value;
      emit("updateaction", data, props.selectedActionIndex);
    };

    const subject = ref("");
    const handleSubject = () => {
      if (data[props.selectedActionIndex]) {
        data[props.selectedActionIndex].JSONActionParameters.subject =
          removeOthers.value[0].selectedSender.mask;
      } else {
        data[props.selectedActionIndex] = new Object();
        data[props.selectedActionIndex].JSONActionParameters = new Object();
        data[props.selectedActionIndex].JSONActionParameters.subject =
          removeOthers.value[0].selectedSender.mask;
      }
      emit("updateaction", data, props.selectedActionIndex, actionType);
    };
    const message = ref("");
    const handleMessage = () => {
      if (data[props.selectedActionIndex]) {
        data[props.selectedActionIndex].JSONActionParameters.message =
          removeOthers.value[0].message;
      } else {
        data[props.selectedActionIndex] = new Object();
        data[props.selectedActionIndex].JSONActionParameters = new Object();
        data[props.selectedActionIndex].JSONActionParameters.message =
          removeOthers.value[0].message;
      }
      emit("updateaction", data, props.selectedActionIndex, actionType);
    };

    const parsedData = ref({});
    watchEffect(() => {
      if (props.selectSMSList) {
        removeOthers.value = props.selectSMSList.filter((i, index) => {
          return index == props.selectedActionIndex;
        });
      }

      if (
        removeOthers.value &&
        removeOthers.value[0].action &&
        removeOthers.value[0].action.jsonActionParameters
      ) {
        parsedData.value = JSON.parse(
          removeOthers.value[0].action.jsonActionParameters
        );

        removeOthers.value[0].person = parsedData.value.person;
        data[props.selectedActionIndex] = new Object();
        data[props.selectedActionIndex].JSONActionParameters = new Object();
        data[props.selectedActionIndex].JSONActionParameters.person =
          parsedData.value.person;

        removeOthers.value[0].parent = parsedData.value.parent;
        data[props.selectedActionIndex].JSONActionParameters.parent =
          parsedData.value.parent;

        removeOthers.value[0].spouse = parsedData.value.spouse;
        data[props.selectedActionIndex].JSONActionParameters.spouse =
          parsedData.value.spouse;

        removeOthers.value[0].groupLeader = parsedData.value.groupLeader;
        data[props.selectedActionIndex].JSONActionParameters.groupLeader =
          parsedData.value.groupLeader;

        removeOthers.value[0].otherToContacts =
          parsedData.value.otherToContacts;
        data[props.selectedActionIndex].JSONActionParameters.otherToContacts =
          parsedData.value.otherToContacts;

        if (parsedData.value.subject) {
          removeOthers.value[0].selectedSender = senderIDs.value.find(
            (i) =>
              i.mask.toLowerCase() == parsedData.value.subject.toLowerCase()
          );
          data[props.selectedActionIndex].JSONActionParameters.subject =
            parsedData.value.subject;
        }

        removeOthers.value[0].message = parsedData.value.message;
        data[props.selectedActionIndex].JSONActionParameters.message =
          parsedData.value.message;
      }
    });

    const getCurrentUser = () => {
      axios
        .get("/api/Membership/GetCurrentSignedInUser")
        .then((res) => {
          tenantId.value = res.data.tenantId;
        })
        .catch((err) => console.log(err));
    };
    getCurrentUser();

    const getSenderId = async () => {
      try {
        let { data } = await axios.get(
          `/api/Messaging/RetrieveTenantSenderIDs`
        );
        senderIDs.value = data.returnObject;
      } catch (err) {
        console.log(err);
      }
    };
    getSenderId();

    const searchSenderIDs = computed(() => {
      if (!searchSenderText.value) return senderIDs.value;
      return senderIDs.value.filter((i) => {
        return i.mask
          .toLowerCase()
          .includes(searchSenderText.value.toLowerCase());
      });
    });

    const setIdToSubject = (item) => {
      // subject.value = item.mask
      // selectedSender.value = item
      removeOthers.value[0].selectedSender = item;
      handleSubject();
    };

    const validateSenderId = (e) => {
      var regExp = /^[a-zA-Z0-9]{3,11}$/;
      var testString = e.target.value;

      if (regExp.test(testString)) {
        /* do something if letters are found in your string */
        senderIdRef.value.classList.add("is-valid");
        senderIdRef.value.classList.remove("is-invalid");
        requestbtn.value = false;
      } else {
        /* do something if letters are not found in your string */
        senderIdRef.value.classList.add("is-invalid");
        senderIdRef.value.classList.remove("is-valid");
        requestbtn.value = true;
      }
    };

    const saveSenderId = async () => {
      let payload = {
        tenantID: tenantId.value,
        mask: senderIdText.value,
      };
      try {
        let { data } = await axios.post(
          `/api/Messaging/RequestSenderID`,
          payload
        );
        console.log(data);
        if (data.status === 0) {
          toast.add({
            severity: "warn",
            summary: "Pending",
            detail:
              "Sender id is pending for approval, when it is approved, you will see it among the sender id list",
            life: 5000,
          });
        } else if (data.status === 1) {
          toast.add({
            severity: "warn",
            summary: "Processing",
            detail:
              "Sender id is processing for approval, when it is approved, you will see it among the sender id list",
            life: 5000,
          });
        } else if (data.status === 2) {
          toast.add({
            severity: "success",
            summary: "Approved",
            detail: "Sender id is approved!",
            life: 6000,
          });
        } else {
          toast.add({
            severity: "warn",
            summary: "Not Approved",
            detail: "Sender id is not approved, create another one.",
            life: 4000,
          });
        }
        senderIdText.value = "";
        senderIdRef.value.classList.remove("is-invalid");
        senderIdRef.value.classList.remove("is-valid");
        getSenderId();
      } catch (err) {
        console.log(err);
      }
    };

    return {
      person,
      handleSendPersonMail,
      parent,
      handleSendPersonsParentMail,
      spouse,
      groupLeader,
      handleSendGroupLeaderMail,
      handleSendPersonsSpouseMail,
      otherToContacts,
      handleOtherAddresses,
      BCCParent,
      handleParentBBC,
      BCCSpouse,
      handleSpouseBBC,
      handleBCCGroupLeader,
      otherBBC,
      handleOtherBBC,
      BCCGroupLeader,
      sendIndividualMails,
      handleSendIndividualMails,
      replyToEmailAddress,
      handleReplyEmail,
      subject,
      handleSubject,
      message,
      handleMessage,
      searchSenderIDs,
      searchSenderText,
      senderIDs,
      selectedSender,
      setIdToSubject,
      validateSenderId,
      senderIdRef,
      saveSenderId,
      senderIdText,
      requestbtn,
      tenantId,
      removeOthers,
    };
  },
};
</script>

<style scoped>
.max-height {
  max-height: calc(100vh - 300px);
  overflow-y: scroll;
}

.overflow-card {
  max-height: 300px;
  overflow-y: scroll;
}
</style>