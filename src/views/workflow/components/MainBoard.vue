<template>
  <div class="container-fluid  mb-4">
    <div class="row">
      <div class="col-md-12 mb-3 px-0">
          <div class="text-primary c-pointer px-0 col-md-2" @click="previousPage">
            <el-icon><DArrowLeft /></el-icon> Back
          </div>
      </div>
      <Toast></Toast>
      <div class="col-md-12">
        <div class="row">
          <div class="col-md-6 pl-md-0">
            <label for="name" class="font-weight-600">Name</label>
            <input type="text" class="form-control border" v-model="name" />
            <div class="row mt-2">
              <div class="col-md-12">
                <input
                  type="checkbox"
                  class="mr-2 border"
                  v-model="isActive"
                  name=""
                  id=""
                />
                Active
              </div>
            </div>
          </div>
          <div class="col-md-6 pr-md-0">
            <label for="name" class="font-weight-600">Description</label>
            <input type="text" class="form-control" />
            <!-- <textarea name="" id="" class="w-100 border" rows="3" 
                            style="border-color: #ced4da"
                        ></textarea> -->
          </div>
        </div>

        <div class="row mt-4">
          <div class="col-md-12">
            <div class="row">
              <div
                class="border animate col-4 scroll-div scr-height our-grey-bg"
                style="height: 400px"
                :class="{
                  'col-md-4':
                    showTriggers || done || selectedTriggerIndex === null,
                  'col-md-1': !showTriggers && workflow.triggers.length > 0,
                }"
              >
                <div class="row h-100" style="overflow-y: scroll">
                  <div
                    class="col-md-12 py-3 c-pointer border"
                    :class="{
                      'active-trigger': selectedTrigger.id === trigger.id,
                    }"
                    v-for="(trigger, index) in workflow.triggers"
                    :key="index"
                    @click="changeActiveTrigger(index)"
                  >
                    <div class="" style="height: fit-content">
                      <div
                        class="
                          container
                          text-center
                          d-flex
                          align-items-center
                          justify-content-center
                        "
                      >
                        <span
                          ><i
                            class="mr-3"
                            :class="[
                              trigger.icon,
                              {
                                'bigger-icon':
                                  !showTriggers && workflow.triggers.length > 0,
                              },
                            ]"
                            style="font-size: 1.5rem"
                          ></i
                        ></span>
                        <span
                          class="font-weight-700"
                          :class="{ 'd-none': selectedTriggerIndex !== null }"
                          >{{ trigger.name }}</span
                        >
                      </div>
                      <TriggerDescription
                        v-if="selectedTriggerIndex === null"
                        :description="
                          triggerDescriptions[trigger.triggerType]()
                        "
                        :hideHeader="true"
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div
                    class="col-md-12 trigger-btn-con"
                    :class="{ 'trigger-btn-con-height': showTriggers }"
                  >
                    <div class="row d-flex justify-content-around">
                      <div class="col-md-12">
                        <ul class="list-group w-100">
                          <li
                            class="list-group-item c-pointer"
                            :class="{ 'mb-4': j === triggers.length - 1 }"
                            v-for="(i, j) in triggers"
                            :key="j"
                            @click="selectTrigger(i)"
                          >
                            <h5 class="mb-0">
                              <span class="mr-2"
                                ><i
                                  :class="[i.icon]"
                                  style="font-size: 1rem"
                                ></i
                              ></span>
                              <span
                                :class="{
                                  'd-none':
                                    !showTriggers &&
                                    workflow.triggers.length > 0,
                                }"
                                >{{ i.name }}</span
                              >
                            </h5>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div
                    class="
                      col-md-12
                      trigger-btn-div
                      d-flex
                      justify-content-stretch
                    "
                  >
                    <button
                      class="
                        btn btn-secondary
                        w-100
                        trigger-btn
                        btn-100
                        ml-n3
                        font-weight-bold
                      "
                      @click="toggleTriggers"
                    >
                      <span><i class="pi pi-plus mx-2"></i></span>
                      <span
                        :class="{
                          'd-none':
                            !showTriggers && workflow.triggers.length > 0,
                        }"
                        >Add a trigger</span
                      >
                    </button>
                  </div>
                </div>
              </div>
              <div
                class="col-8 border animate"
                :class="{
                  'col-md-8': showTriggers || done,
                  'col-md-11':
                    !showTriggers &&
                    workflow.triggers.length > 0 &&
                    selectedTriggerIndex !== null,
                }"
              >
                <div
                  class="row"
                  :class="{
                    'd-none':
                      workflow.triggers.length === 0 ||
                      done ||
                      selectedTriggerIndex === null,
                  }"
                >
                  <div
                    class="col-12 animate border scr-height"
                    style="height: 400px"
                    :class="{
                      'col-md-4': actionSelected,
                      'col-md-6': !actionSelected,
                      'd-none': done,
                    }"
                  >
                    <GivingAmount
                      :selectedTriggerIndex="selectedTriggerIndex"
                      :groups="groups"
                      v-if="selectedTrigger.triggerType === 0"
                      @updatetrigger="updateTrigger"
                      @removetrigger="removeTrigger"
                      :contributionItems="contributionItems"
                      :condition="getTrigger(0)"
                    />
                    <GivingNewRegular
                      :selectedTriggerIndex="selectedTriggerIndex"
                      :groups="groups"
                      v-else-if="selectedTrigger.triggerType === 1"
                      @updatetrigger="updateTrigger"
                      @removetrigger="removeTrigger"
                      :contributionItems="contributionItems"
                      :condition="getTrigger(1)"
                    />
                    <NoLongerGiving
                      :groups="groups"
                      v-else-if="selectedTrigger.triggerType === 2"
                      :selectedTriggerIndex="selectedTriggerIndex"
                      @updatetrigger="updateTrigger"
                      @removetrigger="removeTrigger"
                      :contributionItems="contributionItems"
                      :condition="getTrigger(2)"
                    />
                    <PledgeCreation
                      :groups="groups"
                      :groupMappedTree="groupMappedTree"
                      :allPledgeDefinitionList="allPledgeDefinitionList"
                      v-else-if="selectedTrigger.triggerType === 3"
                      @updatetrigger="updateTrigger"
                      @removetrigger="removeTrigger"
                      :selectedTriggerIndex="selectedTriggerIndex"
                      :condition="getTrigger(3)"
                    />
                    <NewMember
                      :groups="groups"
                      v-else-if="selectedTrigger.triggerType === 6"
                      @updatetrigger="updateTrigger"
                      @removetrigger="removeTrigger"
                      :selectedTriggerIndex="selectedTriggerIndex"
                      :condition="getTrigger(6)"
                    />
                    <FirstTimer
                      :groups="groups"
                      v-else-if="selectedTrigger.triggerType === 9"
                      @updatetrigger="updateTrigger"
                      @removetrigger="removeTrigger"
                      :selectedTriggerIndex="selectedTriggerIndex"
                      :condition="getTrigger(9)"
                    />
                    <NewConvert
                      :groups="groups"
                      v-else-if="selectedTrigger.triggerType === 8"
                      @updatetrigger="updateTrigger"
                      @removetrigger="removeTrigger"
                      :selectedTriggerIndex="selectedTriggerIndex"
                      :condition="getTrigger(8)"
                    />
                    <MemberBirthday
                      :groups="groups"
                      v-else-if="selectedTrigger.triggerType === 55"
                    />
                    <GroupAddOrRemove
                      :groups="groups"
                      @updatetrigger="updateTrigger"
                      v-else-if="selectedTrigger.triggerType === 10"
                      :condition="getTrigger(11)"
                      :selectedTriggerIndex="selectedTriggerIndex"
                      @removetrigger="removeTrigger"
                    />
                    <GroupMembershipDuration
                      :groups="groups"
                      v-else-if="selectedTrigger.triggerType === 11"
                      @updatetrigger="updateTrigger"
                      @removetrigger="removeTrigger"
                      :selectedTriggerIndex="selectedTriggerIndex"
                      :condition="getTrigger(11)"
                    />
                    <AttendanceTrigger
                      :groups="groups"
                      v-else-if="selectedTrigger.triggerType === 12"
                      @updatetrigger="updateTrigger"
                      @removetrigger="removeTrigger"
                      :selectedTriggerIndex="selectedTriggerIndex"
                      :condition="getTrigger(12)"
                    />
                    <FromSubmission
                      v-else-if="selectedTrigger.triggerType === 13"
                    />
                    <Individual
                      v-else-if="selectedTrigger.triggerType === 7"
                      :groups="groups"
                      @updatetrigger="updateTrigger"
                      @removetrigger="removeTrigger"
                      :selectedTriggerIndex="selectedTriggerIndex"
                      :condition="getTrigger(7)"
                    />
                    <PledgeRedemption
                      v-else-if="selectedTrigger.triggerType === 5"
                      :groups="groups"
                      :groupMappedTree="groupMappedTree"
                      :allPledgeDefinitionList="allPledgeDefinitionList"
                      @updatetrigger="updateTrigger"
                      @removetrigger="removeTrigger"
                      :selectedTriggerIndex="selectedTriggerIndex"
                      :condition="getTrigger(5)"
                    />
                    <PledgeCancellation
                      v-else-if="selectedTrigger.triggerType === 4"
                      :groups="groups"
                      :groupMappedTree="groupMappedTree"
                      :allPledgeDefinitionList="allPledgeDefinitionList"
                      @updatetrigger="updateTrigger"
                      @removetrigger="removeTrigger"
                      :selectedTriggerIndex="selectedTriggerIndex"
                      :condition="getTrigger(4)"
                    />
                  </div>

                  <div
                    class="col-md-6 border scr-height animate"
                    :class="{
                      'col-md-8': actionSelected,
                      'col-md-6': !actionSelected,
                    }"
                  >
                    <div class="row ani">
                      <div
                        class="col-12 border px-0 scr-height our-grey-bg"
                        style="height: 400px"
                        :class="{ 'col-md-6': actionSelected }"
                      >
                        <div class="row h-100 scroll-div">
                          <div class="col-md-12">
                            <ul class="list-group w-100">
                              <li
                                class="list-group-item c-pointer py-4 border"
                                style="border: 2px solid red"
                                :class="{
                                  'bg-white':
                                    selectedAction &&
                                    i.id === selectedAction.id,
                                  'bg-transparent':
                                    selectedAction &&
                                    i.id !== selectedAction.id,
                                  'd-none': showActions,
                                }"
                                v-for="(i, j) in triggerActions"
                                :key="j"
                                @click="setActiveAction(i, j)"
                              >
                                <h5 class="mb-0">
                                  <span class="mr-2"
                                    ><i
                                      :class="[i.icon]"
                                      style="font-size: 1rem"
                                    ></i
                                  ></span>
                                  <span class="font-weight">{{ i.name }}</span>
                                </h5>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div
                          class="row"
                          style="overflow-y: scroll; max-height: 100%"
                        >
                          <div
                            class="col-md-12 trigger-btn-con"
                            :class="{ 'trigger-btn-con-height': showActions }"
                          >
                            <div class="row d-flex justify-content-around">
                              <div
                                class="col-md-5 card my-2"
                                v-for="(i, j) in actions"
                                :key="j"
                                @click="selectAction(i)"
                              >
                                <div class="row card-body c-pointer">
                                  <div class="col-md-12 text-center">
                                    <i :class="i.icon"></i>
                                  </div>
                                  <div class="col-md-12 text-center">
                                    <h6 class="mb-0">{{ i.name }}</h6>
                                  </div>
                                </div>
                              </div>
                              <div class="col-md-5 my-2">
                                <div class="row bottom-space my-3"></div>
                              </div>
                              <div class="col-md-5 bottom-space my-2">
                                <div class="row my-3"></div>
                              </div>
                            </div>
                          </div>
                          <div class="col-md-12 trigger-btn-div">
                            <button
                              class="
                                btn btn-secondary
                                w-100
                                trigger-btn
                                d-flex
                                justify-content-center
                                btn-100
                                font-weight-bold
                              "
                              @click="toggleActions"
                            >
                              Actions
                            </button>
                          </div>
                        </div>
                      </div>

                      <div
                        class="border scr-height"
                        :class="{
                          'col-md-6 ani': actionSelected,
                          'd-none':
                            !actionSelected ||
                            !selectedAction ||
                            !(selectedActionIndex >= 0) ||
                            triggerActions.length < 1,
                        }"
                      >
                        <div class="row h-100" style="overflow-y: scroll">
                          <div class="col-md-12">
                            <div class="row d-flex justify-content-end">
                              <div class="col-md-4">
                                <div class="dropdown text-right">
                                  <span
                                    class="font-weight-bold text-dark c-pointer"
                                    id="dropdownMenuButton"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                    ><i
                                      class="pi pi-ellipsis-h"
                                      style="font-size: 1.5rem"
                                    ></i
                                  ></span>
                                  <div
                                    class="dropdown-menu"
                                    aria-labelledby="dropdownMenuButton"
                                  >
                                    <a
                                      class="
                                        dropdown-item
                                        font-weight-700
                                        c-pointer
                                      "
                                      @click="removeActiveAction"
                                      >Remove</a
                                    >
                                  </div>
                                </div>
                              </div>
                            </div>

                            <EmailAction
                              @updateaction="updateAction"
                              v-if="
                                selectedAction &&
                                selectedAction.actionType === 0
                              "
                              :selectedActionIndex="selectedActionIndex"
                              :parameters="getAction(0, selectedTriggerIndex)"
                              :selectEmailList="triggerActions"
                            />
                            <GroupAction
                              v-else-if="
                                selectedAction &&
                                selectedAction.actionType === 4
                              "
                              :selectedActionIndex="selectedActionIndex"
                              @updateaction="updateAction"
                              :groups="groups"
                              :parameters="getAction(4, selectedTriggerIndex)"
                              :selectGroupList="triggerActions"
                            />
                            <AssignTask
                              v-else-if="
                                selectedAction &&
                                selectedAction.actionType === 5
                              "
                              :selectedActionIndex="selectedActionIndex"
                              @updateaction="updateAction"
                              :parameters="getAction(5, selectedTriggerIndex)"
                              :selectAssignTaskList="triggerActions"
                            />
                            <SMSAction
                              @updateaction="updateAction"
                              v-else-if="
                                selectedAction &&
                                selectedAction.actionType === 1
                              "
                              :selectedActionIndex="selectedActionIndex"
                              :parameters="getAction(1, selectedTriggerIndex)"
                              :selectSMSList="triggerActions"
                            />
                            <AdminMessage
                              v-else-if="
                                selectedAction &&
                                selectedAction.actionType === 6
                              "
                              :selectedActionIndex="selectedActionIndex"
                              @updateaction="updateAction"
                              :parameters="getAction(6, selectedTriggerIndex)"
                              :selectAdminMessageList="triggerActions"
                            />
                            <UpdateProgress
                              v-else-if="
                                selectedAction &&
                                selectedAction.actionType === 66
                              "
                            />
                            <VoiceAction
                              v-else-if="
                                selectedAction &&
                                selectedAction.actionType === 2
                              "
                              :selectedActionIndex="selectedActionIndex"
                              @updateaction="updateAction"
                              :parameters="getAction(2, selectedTriggerIndex)"
                              :selectVoiceList="triggerActions"
                            />
                            <TimerAction
                              v-else-if="
                                selectedAction &&
                                selectedAction.actionType === 8
                              "
                              :selectedActionIndex="selectedActionIndex"
                              @updateaction="updateAction"
                              :parameters="getAction(8, selectedTriggerIndex)"
                              :selectTimerList="triggerActions"
                            />
                            <MarkPresent
                              v-else-if="
                                selectedAction &&
                                selectedAction.actionType === 9
                              "
                              :selectedActionIndex="selectedActionIndex"
                              @updateaction="updateAction"
                              :parameters="getAction(9, selectedTriggerIndex)"
                              :selectMarkPresentList="triggerActions"
                            />
                            <Interactions
                              v-else-if="
                                selectedAction &&
                                selectedAction.actionType === 100
                              "
                            />
                            <WhatsAppAction
                              v-else-if="
                                selectedAction &&
                                selectedAction.actionType === 3
                              "
                              :selectedActionIndex="selectedActionIndex"
                              @updateaction="updateAction"
                              :parameters="getAction(3, selectedTriggerIndex)"
                              :selectWhatsappList="triggerActions"
                            />
                            <AddNoteAction
                              v-else-if="
                                selectedAction &&
                                selectedAction.actionType === 10
                              "
                              :selectedActionIndex="selectedActionIndex"
                              @updateaction="updateAction"
                              :parameters="getAction(10, selectedTriggerIndex)"
                              :selectNoteList="triggerActions"
                            />
                            <!-- <AdminMessage v-else  /> -->
                          </div>
                        </div>

                        <div
                          class="
                            col-md-12
                            trigger-btn-div
                            d-flex
                            justify-content-stretch
                          "
                          style="padding: 10px"
                        >
                          <button
                            @click="onDone"
                            class="
                              btn btn-success
                              w-100
                              trigger-btn
                              btn-100
                              ml-n4
                              font-weight-bold
                            "
                          >
                            Done
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row mt-3">
          <div class="col-md-12 px-0 d-flex justify-content-center my-3">
            <button
              class="default-btn border-0 primary-bg font-weight-700 text-white"
              @click="saveWorkflow"
            >
              <i class="pi pi-spin pi-spinner mr-1" v-if="loading"></i>Save
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import GivingAmount from "./triggers/GivingAmount";
import GroupMembershipDuration from "./triggers/GroupMembershipDuration";
import GroupAddOrRemove from "./triggers/GroupAddOrRemove";
import PledgeCreation from "./triggers/PledgeCreation";
import NoLongerGiving from "./triggers/NoLongerGiving.vue";
import GivingNewRegular from "./triggers/GivingNewRegular.vue";
import AttendanceTrigger from "./triggers/AttendanceTrigger.vue";
import FromSubmission from "./triggers/FromSubmission.vue";
import Individual from "./triggers/Individual.vue";
import NewMember from "./triggers/NewMember.vue";
import FirstTimer from "./triggers/FirstTimer.vue";
import NewConvert from "./triggers/NewConvert.vue";
import PledgeRedemption from "./triggers/PledgeRedemption.vue";
import PledgeCancellation from "./triggers/PledgeCancellation.vue";

import GroupAction from "./actions/GroupAction";
import VoiceAction from "./actions/VoiceAction";
import AddNoteAction from "./actions/AddNoteAction";
import SMSAction from "./actions/SMSAction";
import TimerAction from "./actions/TimerAction";
import AdminMessage from "./actions/AdminMessage";
import MarkPresent from "./actions/MarkPresent";
import UpdateProgress from "./actions/UpdateProgress";
import Interactions from "./actions/InteractionsAction";
import { computed } from "@vue/runtime-core";
import EmailAction from "./actions/Email";
import WhatsAppAction from "./actions/WhatsappAction";
import AssignTask from "./actions/AssignTask";
import MemberBirthday from "./triggers/MemberBirthday.vue";
import grousService from "../../../services/groups/groupsservice";
import workflow_service from "../utlity/workflow_service";
import { useToast } from "primevue/usetoast";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import collector from "../../../services/groupArray/mapTree";
import { useStore } from "vuex"

import descriptionHelper from "../helper/description";
import TriggerDescription from "./TriggerDescription.vue";
import { v4 as uuidv4 } from "uuid";

export default {
  components: {
    GivingAmount,
    GivingNewRegular,
    GroupMembershipDuration,
    GroupAddOrRemove,
    PledgeCreation,
    NoLongerGiving,
    AttendanceTrigger,
    FromSubmission,
    NewMember,
    FirstTimer,
    NewConvert,
    PledgeRedemption,
    PledgeCancellation,
    AdminMessage,
    AddNoteAction,
    TimerAction,
    WhatsAppAction,
    AssignTask,
    VoiceAction,
    GroupAction,
    EmailAction,
    MarkPresent,
    UpdateProgress,
    MemberBirthday,
    Interactions,
    Individual,
    SMSAction,
    TriggerDescription,
  },
  setup() {
    const toast = useToast();
    const route = useRoute();
    const router = useRouter();
    const loading = ref(false);
    const store = useStore();

    const showTriggers = ref(false);
    const showActions = ref(false);
    // const triggersIsVissible = ref(false);
    const triggers = [
      {
        name: "Giving- amount",
        icon: "pi pi-money-bill",
        triggerType: 0,
      },
      {
        name: "Giving - new regular giver",
        icon: "pi pi-money-bill",

        triggerType: 1,
      },
      {
        name: "Giving - no longer giving",
        icon: "pi pi-money-bill",
        triggerType: 2,
      },
      {
        name: "Pledge creation",
        icon: "pi pi-money-bill",
        triggerType: 3,
      },
      {
        name: "Pledge - Redemption",
        icon: "pi pi-book",

        triggerType: 5,
      },
      {
        name: "Pledge - Cancellation",
        icon: "pi pi-book",

        triggerType: 4,
      },
      {
        name: "Member - new member",
        icon: "pi pi-user",
        triggerType: 6,
      },
      // {
      //     name: "Member - birthday",
      //     icon: "pi pi-user",
      //     id: 5
      // },
      {
        name: "Member - new convert",
        icon: "pi pi-user",
        triggerType: 8,
      },
      {
        name: "Member - first timer",
        icon: "pi pi-user",
        triggerType: 9,
      },
      {
        name: "Group - add/remove",
        icon: "pi pi-users",
        triggerType: 10,
      },
      {
        name: "Group - membership duration",
        icon: "pi pi-users",
        triggerType: 11,
      },
      {
        name: "Attendance",
        icon: "pi pi-calendar",
        triggerType: 12,
      },
      {
        name: "Individual - Event",
        icon: "pi pi-book",
        triggerType: 7,
      },
    ];

    const actions = [
      {
        name: "Email",
        icon: "pi pi-envelope",
        // id: 1,
        actionType: 0,
      },
      {
        name: "SMS",
        icon: "pi pi-comment",
        id: 2,
        actionType: 1,
      },
      {
        name: "Add to group",
        icon: "pi pi-users",
        // id: 3,
        actionType: 4,
      },
      {
        name: "Assign task",
        icon: "pi pi-users",
        // id: 4,
        actionType: 5,
      },
      {
        name: "Message admin",
        icon: "pi pi-users",
        // id: 5,
        actionType: 6,
      },
      // {
      //     name: "Update progress",
      //     icon: "pi pi-chart-line",
      //     id: 6
      // },
      {
        name: "Send voice note",
        icon: "pi pi-volume-up",
        // id: 7,
        actionType: 2,
      },
      {
        name: "Timer",
        icon: "pi pi-clock",
        // id: 8,
        actionType: 8,
      },
      {
        name: "Present In Group",
        icon: "pi pi-clock",
        // id: 9,
        actionType: 9,
      },
      // {
      //     name: "Interactions",
      //     icon: "pi pi-users",
      //     id: 10
      // },
      {
        name: "WhatsApp",
        icon: "pi pi-volume-up",
        // id: 11,
        actionType: 3,
      },
      {
        name: "Add Note",
        icon: "pi pi-volume-up",
        // id: 12,
        actionType: 10,
      },
    ];

    const workflow = ref({ triggers: [] });

    const selectedTriggers = ref([]);
    const selectedActions = ref([]);
    const groupMappedTree = ref([]);

    const toggleTriggers = () => {
      showTriggers.value = !showTriggers.value;
    };

    const toggleActions = () => {
      showActions.value = !showActions.value;
    };

    const checkIfAlreadySelected = (trigger) => {
      const index = workflow.value.triggers.findIndex(
        (t) => t.name === trigger.name
      );
      return index >= 0 ? true : false;
    };
    // const checkIfActionIsAlreadySelected = trigger => {
    //     if (!workflow.value.triggers[selectedTriggerIndex.value].triggerActions) return false;
    //     const index = workflow.value.triggers[selectedTriggerIndex.value].triggerActions.findIndex(t => t.name === trigger.name);
    //     return index >= 0 ? true : false;
    // }

    const selectTrigger = (trigger) => {
      if (!checkIfAlreadySelected(trigger)) {
        workflow.value.triggers.push(trigger);
        selectedTriggerIndex.value = workflow.value.triggers.findIndex(
          (i) => i.triggerType === trigger.triggerType
        );
        selectedActionIndex.value = 0;
      }
      showTriggers.value = false;
      done.value = false;
    };
    const selectAction = (trigger) => {
      // console.log(workflow.value)

      const triggerRecreate = {
        actionType: trigger.actionType,
        icon: trigger.icon,
        id: uuidv4(),
        name: trigger.name,
      };

      // if (!checkIfActionIsAlreadySelected(trigger)) {
      if (
        !workflow.value.triggers[selectedTriggerIndex.value] ||
        !workflow.value.triggers[selectedTriggerIndex.value].triggerActions
      ) {
        workflow.value.triggers[selectedTriggerIndex.value].triggerActions = [
          trigger,
        ];
        selectedActionIndex.value = 0;
      } else {
        workflow.value.triggers[selectedTriggerIndex.value].triggerActions.push(
          triggerRecreate
        );
        const index = workflow.value.triggers[
          selectedTriggerIndex.value
        ].triggerActions.findIndex((i) => i.id === triggerRecreate.id);
        selectedActionIndex.value = index > 0 ? index : 0;
      }
      // }
      showActions.value = false;
      actionSelected.value = true;
    };

    const actionSelected = ref(false);

    const selectedTriggerIndex = ref(0);
    const selectedTrigger = computed(() => {
      if (workflow.value.triggers.length === 0) return {};
      if (selectedTriggerIndex.value !== 0 && !selectedTriggerIndex.value)
        return {};
      return workflow.value.triggers[selectedTriggerIndex.value];
    });
    const selectedActionIndex = ref(0);
    const selectedAction = computed(() => {
      if (workflow.value.triggers.length === 0) return {};
      if (selectedTriggerIndex.value !== 0 && !selectedTriggerIndex.value)
        return {};
      if (
        !workflow.value.triggers[selectedTriggerIndex.value].triggerActions ||
        workflow.value.triggers[selectedTriggerIndex.value].triggerActions
          .length === 0
      )
        return {};
      return workflow.value.triggers[selectedTriggerIndex.value].triggerActions[
        selectedActionIndex.value
      ];
    });

    const changeActiveTrigger = (index) => {
      selectedTriggerIndex.value = index;
      selectedActionIndex.value = null;
      done.value = false;
    };

    const updateTrigger = (data, selectedTriggerIndex) => {
      let parsed = JSON.parse(data)
      let foo;
      if (parsed.pledges && parsed.pledges.length > 0) parsed.pledges = parsed.pledges.join(",")
      if (typeof parsed.groups !== 'string') {
        parsed.groups = parsed.groups.join(",")
        foo = JSON.stringify(parsed)
      } else {
        foo = data
      }
      workflow.value.triggers[selectedTriggerIndex].jsonCondition = foo;
    };

    const allSelectedActions = ref([]);
    const updateAction = (data, activeAction, actionType) => {
      // allSelectedActions.value[activeAction] =
      workflow.value.triggers[selectedTriggerIndex.value].triggerActions[
        activeAction
      ].Action = JSON.stringify({
        ActionType: actionType,
        JSONActionParameters: JSON.stringify(
          data[activeAction].JSONActionParameters
        ),
      });
    };

    const setActiveAction = (item, index) => {
      selectedActionIndex.value = index;
      // workflow.value.triggers[selectedTriggerIndex].JSONActionParameters = selectedTriggers[selectedActionIndex];
    };

    const triggerActions = computed(() => {
      if (
        !workflow.value.triggers[selectedTriggerIndex.value] ||
        !workflow.value.triggers[selectedTriggerIndex.value].triggerActions ||
        workflow.value.triggers[selectedTriggerIndex.value].triggerActions
          .length === 0
      )
        return [];
      return workflow.value.triggers[
        selectedTriggerIndex.value
      ].triggerActions.sort((a, b) => a.order - b.order);
    });

    const groups = ref([]);
    const getGroups = async () => {
      try {
        const response = await grousService.getGroups();
        groups.value = response.response.groupResonseDTO
        groups.value.unshift({
          id: "0000-000-0000-0000-0000-0000",
          name: "Entire ministry",
        });

        let data = { children: groups.value };
        const { children } = collector(data);
        groupMappedTree.value = children;

      } catch (error) {
        console.log(error);
      }
    };
    getGroups();

    const contributionItems = ref([]);
    const getFinancialCOntributions = async () => {
      try {
        const response = await workflow_service.getContributionItems();
        contributionItems.value = response.map((i) => {
          return { id: i.id, name: i.name };
        });
      } catch (error) {
        console.log(error);
      }
    };
    getFinancialCOntributions();

    const allPledgeDefinitionList = ref([])
    const getAllPledgeDefinition = async () => {
      try {
          await store.dispatch("pledge/getPledgeDefinition").then((res) => {

          let data = { children: res };
        const { children } = collector(data);
        allPledgeDefinitionList.value = children;

          });
      } catch (error) {
          console.log(error);
      }
      };
      getAllPledgeDefinition();

    const name = ref("");
    const isActive = ref(false);
    const saveWorkflow = async () => {
      console.log(workflow.value, 'dddpppp');
      const data = workflow.value.triggers.map((i) => {
        return {
          // JSONCondition: i.JSONCondition,
          // triggerType: i.triggerType,
          ...i,
          triggerActions: i.triggerActions && i.triggerActions.length > 0 ? i.triggerActions.map((item, index) => {
            return {
              order: index,
              action: item.Action,
            };
          }) : [],
        };
      });

      console.log(data, 'klkjkllk');

      const reqBody = {
        id: workflow.value.id,
        triggers: data,
        name: name.value,
        isActive: isActive.value,
      };
      if (route.query.workflowId) {
        await editWorkflow(reqBody);
      } else {
        await saveNewWorkflow(reqBody);
      }
    };

    const saveNewWorkflow = async (reqBody) => {
        loading.value = true
      try {
        const { status, response } = await workflow_service.saveWorkflow(
          reqBody
        );
        loading.value = false
        if (status) {
          toast.add({
            severity: "success",
            summary: "Workflow Saved",
            detail: "Workflow was created successfully",
            life: 2000,
          });
          setTimeout(() => {
            router.push("/tenant/workflow/list");
          }, 2200);
        } else {
          toast.add({
            severity: "error",
            summary: "Workflow Error",
            detail: `${
              response && response.length < 50
                ? response
                : "Workflow could not be created"
            }`,
            life: 2000,
          });
        }
      } catch (error) {
          loading.value = false
        console.log(error);
      }
    };

    const editWorkflow = async (reqBody) => {
        loading.value = true
      try {
        const { status, response } = await workflow_service.editWorkflow(
          reqBody
        );
        loading.value = false
        if (status) {
          toast.add({
            severity: "success",
            summary: "Workflow Saved",
            detail: "Workflow was update successfully",
            life: 2000,
          });
          setTimeout(() => {
            router.push("/tenant/workflow/list");
          }, 2200);
        } else {
          toast.add({
            severity: "error",
            summary: "Workflow Error",
            detail: `${
              response && response.length < 50
                ? response
                : "Workflow could not be update"
            }`,
            life: 2000,
          });
        }
      } catch (error) {
          loading.value = false
        console.log(error);
      }
    };

    const done = ref(false);
    const completed = () => {
      selectedActionIndex.value = null;
      selectedTriggerIndex.value = null;
      done.value = true;
    };

    const removeTrigger = () => {
      if (selectedTriggerIndex.value >= 0) {
        workflow.value.triggers.splice(selectedTriggerIndex.value, 1);
        if (workflow.value.triggers.length === 0) {
          selectedTriggerIndex.value = null;
        } else {
          selectedTriggerIndex.value = 0;
        }
      }
    };

    const removeActiveAction = () => {
      if (selectedActionIndex.value >= 0) {
        workflow.value.triggers[
          selectedTriggerIndex.value
        ].triggerActions.splice(selectedActionIndex.value, 1);
        if (
          workflow.value.triggers[selectedTriggerIndex.value].triggerActions &&
          workflow.value.triggers[selectedTriggerIndex.value].triggerActions
            .length === 0
        ) {
          selectedActionIndex.value = null;
        } else {
          selectedActionIndex.value = 0;
        }
      }
    };

    const getWorkflowById = async (id) => {
      try {
        const { returnObject: data, status } = await workflow_service.getById(
          id
        );
        if (!status) {
          toast.add({
            severity: "error",
            summary: "Workflow Saved",
            detail: "Error getting workflow",
            life: 2000,
          });
          return false;
        }
        name.value = data.name;
        isActive.value = data.isActive;
        workflow.value = {
          ...data,
          triggers: data.triggers.map((i) => {
            const t = triggers.find((j) => j.triggerType === i.triggerType);
            return {
              ...i,
              icon: t.icon ? t.icon : "",
              triggerActions: i.triggerActions.map((i) => {
                const actn = actions.find(
                  (j) => j.actionType === i.action.actionType
                );
                return {
                  ...i,
                  icon: actn ? actn.icon : "",
                  name: actn.name ? actn.name : "",
                  actionType: i.action.actionType,
                  Action: JSON.stringify({
                    ActionType: i.action.actionType,
                    JSONActionParameters: i.action.jsonActionParameters,
                  }),
                };
              }),
            };
          }),
        };

        selectedActionIndex.value = 0;
        actionSelected.value = true;
      } catch (error) {
        console.log(error);
      }
    };

    if (route.query.workflowId) {
      getWorkflowById(route.query.workflowId);
    }

    const getTrigger = (type) => {
      const trigger = workflow.value.triggers.find(
        (i) => i.triggerType === type
      );
      return trigger && trigger.jsonCondition ? trigger : {};
    };

    const getAction = (type, index) => {
      const triggerAction = workflow.value.triggers[index].triggerActions.find(
        (i) => i.actionType === type
      );
      return triggerAction && (triggerAction.Action || triggerAction.action)
        ? triggerAction
        : {};
    };

    const triggerDescriptions = ref(
      descriptionHelper(
        workflow.value.triggers,
        groups.value,
        contributionItems.value
      )
    );
    const onDone = () => {
      selectedActionIndex.value = null;
      actionSelected.value = false;
      showTriggers.value = false;
      done.value = false;
      // selectedTriggerIndex.value = null          // selectedTriggerIndex.value = 0;
      // done.value = false;
      // triggerDescriptions.value = descriptionHelper(workflow.value.triggers, groups.value, contributionItems.value)
    };
    const previousPage = () =>{
        router.push("/tenant/workflow/list")
     }


    return {
      showTriggers,
      previousPage,
      // triggersIsVissible,
      toggleTriggers,
      triggers,
      selectedTriggers,
      selectTrigger,

      showActions,
      selectedActions,
      toggleActions,
      selectAction,

      actionSelected,
      actions,
      selectedTrigger,
      selectedAction,
      changeActiveTrigger,
      selectedTriggerIndex,
      updateTrigger,
      selectedActionIndex,

      updateAction,
      setActiveAction,

      groups,
      workflow,
      triggerActions,
      contributionItems,
      saveWorkflow,
      name,
      isActive,

      done,
      completed,
      removeTrigger,
      removeActiveAction,
      getTrigger,
      getAction,
      onDone,
      triggerDescriptions,
      allSelectedActions,
      loading,
      groupMappedTree,
      allPledgeDefinitionList
    };
  },
};
</script>

<style scoped>
.trigger-btn-con {
  position: absolute;
  bottom: 0;
  width: 100%;
  /* background-color: #ddd; */
  transition: all 0.5s ease-in-out;
  height: 0;
  overflow: hidden;
}

.trigger-btn-con-height {
  transition: all 0.5s ease-in-out;
  height: calc(100% - 0px);
  overflow: scroll;
  background: #00000008;
}

.trigger-btn {
  position: absolute;
  bottom: 0;
  width: 190px !important;
  max-width: 100% !important;
}

.trigger-btn-div {
  position: absolute;
  bottom: 0;
  max-width: 100% !important;
}

.scr-height {
  height: calc(100vh - 373px) !important;
}

.animate {
  height: inherit;
  transition: all 0.2s ease-in-out;
}

/* .ani {
        height: inherit;
        transition: all .2s ease-in-out;
    } */

.btn-100 {
  width: 100% !important;
}

.active-trigger {
  border-left: 1px solid #007bff;
  background: #fff;
}

.bigger-icon {
  font-size: 2.5rem !important;
}

.border {
  border: 1px solid #d3d4dca6 !important;
}

.scroll-div {
  overflow-y: scroll;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.scr-height::-webkit-scrollbar,
.animate::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.scr-height,
.animate {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

/* Hide scrollbar for Chrome, Safari and Opera */
div::-webkit-scrollbar,
div::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
div,
div {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>