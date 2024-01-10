<template>
  <div class="my-con">
    <div>
      <!-- <div class="boards">
        <div class="board">
          <div class="board-top">
            <p class="total-text mb-0">TOTAL MEMBERS</p>
            <img
              class="trend-icon"
              src="../../assets/dashboardlinks/trend-icon.svg"
              alt=""
            />
          </div>
          <h4 class="total">{{ membershipSummary.totalMember }}</h4>
          <p>
            <span class="primary--text">+{{ membershipSummary.percentageGrowth }}% </span>
            <span> Since last month</span>
          </p>
        </div>
        <div class="chart-con">
          <div style="width: 45%" class="ml-md-4 chart1">
            <ByGenderChart
              domId="chart"
              title="By Gender"
              distance="5"
              :titleMargin="10"
              :summary="membershipSummary.genders"
            />
          </div>
          <div style="width: 45%" class="chart2">
            <ByMaritalStatusChart
              domId="second"
              title="By Marital Status"
              :titleMargin="5"
              :summary="membershipSummary.maritalStatus"
            />
          </div>
        </div>
      </div> -->
    </div>

    <el-dialog
      v-model="addToGroupDialog"
      title="Add all Contacts To Segment"
      :width="mdAndUp || lgAndUp || xlAndUp ? `50%` : `90%`"
      align-center
    >
      <el-select-v2
        v-model="chooseGrouptoMoveAllMembers"
        :options="getAllGroups"
        label="Select a segment"
        placeholder="Select a segment"
        size="large"
        class="w-100"
      />
      <template #footer>
        <span class="dialog-footer">
          <el-button class="secondary-button" @click="addToGroupDialog = false" round
            >Cancel</el-button
          >
          <el-button
            type="primary"
            :color="primarycolor"
            :loading="allGroupLoading"
            @click="getAllMembersAndAddToGroup"
            round
          >
            Add to segment
          </el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog
      v-model="addToGroupSingle"
      title="Add Contact(s) To Segment"
      :width="mdAndUp || lgAndUp || xlAndUp ? `50%` : `90%`"
      align-center
    >
      <el-select-v2
        v-model="chooseGrouptoMoveto"
        :options="getAllGroups"
        label="Select a segment"
        placeholder="Select a segment"
        size="large"
        class="w-100"
      />
      <template #footer>
        <span class="dialog-footer">
          <el-button class="secondary-button" @click="addToGroupSingle = false" round
            >Cancel</el-button
          >
          <el-button
            type="primary"
            :color="primarycolor"
            :loading="singleGroupLoading"
            @click="moveMemberToGroup"
            round
          >
            Add to segment
          </el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog
      v-model="displayPositionArchive"
      title="Archive member(s)"
      :width="mdAndUp || lgAndUp || xlAndUp ? `50%` : `90%`"
      align-center
    >
      <p class="p-m-0">
        You are about to archive your member(s). Do you want to continue ?
      </p>
      <template #footer>
        <span class="dialog-footer">
          <el-button
            class="secondary-button"
            @click="displayPositionArchive = false"
            round
            >No</el-button
          >
          <el-button
            :color="primarycolor"
            :loading="archiveLoading"
            @click="archive('', 'multiple')"
            round
          >
            Yes
          </el-button>
        </span>
      </template>
    </el-dialog>

    <div class="table-top p-3 mt-5">
      <div class="d-flex flex-column flex-sm-row justify-content-sm-between">
        <div>
          <el-tooltip
            class="box-item"
            effect="dark"
            content="Add all contact to a contact segment"
            placement="top-start"
          >
            <el-icon :size="20" class="c-pointer" @click="addToGroupDialog = true">
              <CirclePlus />
            </el-icon>
          </el-tooltip>
          <el-tooltip
            class="box-item"
            effect="dark"
            v-if="marked.length > 0"
            content="Add to contact segment"
            placement="top-start"
          >
            <el-icon class="ml-2 c-pointer" :size="20" @click="addToGroupSingle = true">
              <User />
            </el-icon>
          </el-tooltip>
          <el-tooltip
            class="box-item"
            effect="dark"
            v-if="marked.length > 0"
            content="Archive member(s)"
            placement="top-start"
          >
            <el-icon
              class="ml-2 c-pointer"
              :size="20"
              @click="displayPositionArchive = true"
              v-if="marked.length > 0"
            >
              <DocumentRemove />
            </el-icon>
          </el-tooltip>
          <el-tooltip
            class="box-item"
            effect="dark"
            v-if="marked.length > 0"
            content="Delete member(s)"
            placement="top-start"
          >
            <el-icon
              :size="20"
              class="ml-2 c-pointer"
              v-if="marked.length > 0"
              @click="showConfirmModal1"
            >
              <Delete />
            </el-icon>
          </el-tooltip>
          <el-tooltip
            class="box-item"
            effect="dark"
            v-if="marked.length > 0"
            content="Send SMS"
            placement="top-start"
          >
            <img
              src="../../assets/sms.png"
              style="width: 20px; margin-top: -13px"
              class="ml-2 c-pointer"
              @click="sendMarkedMemberSms"
              alt="Send SMS"
            />
          </el-tooltip>
          <el-tooltip
            class="box-item"
            effect="dark"
            v-if="marked.length > 0"
            content="Send Email"
            placement="top-start"
          >
            <el-icon
              :size="20"
              class="ml-2 c-pointer"
              v-if="marked.length > 0"
              @click="sendMarkedMemberEmail"
            >
              <Message />
            </el-icon>
          </el-tooltip>
          <el-tooltip
            class="box-item"
            effect="dark"
            v-if="marked.length > 0"
            content="Send Whatsapp message"
            placement="top-start"
          >
            <img
              src="../../assets/whatsappblackwhite.svg"
              style="width: 20px; margin-top: -13px"
              class="ml-2 c-pointer"
              @click="displayWhatsappDrawer(null)"
              alt="Send Whatsapp message"
            />
          </el-tooltip>
        </div>
        <div class="d-flex flex-column flex-sm-row justify-content-sm-between">
          <div>
            <p
              @click="toggleFilterFormVissibility"
              class="mb-0 mr-3 d-flex my-3 my-sm-0 c-pointer"
            >
              <el-icon :size="13">
                <Filter />
              </el-icon>
              <span class="ml-1"> FILTER</span>
            </p>
          </div>
          <el-input
            size="small"
            v-model="searchText"
            placeholder="Search..."
            @input="searchingMember = true"
            @keyup.enter.prevent="searchPeopleInDB($event)"
            class="input-with-select"
          >
            <template #suffix>
              <el-button
                style="padding: 5px; height: 22px"
                @click.prevent="searchText = ''"
              >
                <el-icon :size="13">
                  <Close />
                </el-icon>
              </el-button>
            </template>
            <template #append>
              <el-button @click.prevent="searchPeopleInDB($event)">
                <el-icon :size="13">
                  <Search />
                </el-icon>
              </el-button>
            </template>
          </el-input>
        </div>
      </div>
    </div>
    <div class="filter-options" :class="{ 'filter-options-shown': filterFormIsVissible }">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-9">
            <div class="row">
              <div class="col-12 col-sm-6 offset-sm-3 offset-md-0 form-group inp w-100">
                <el-input
                  placeholder="First name"
                  class="w-100"
                  v-model="filter.name"
                  @input="setFilteredValue"
                />
              </div>
              <div class="col-12 col-sm-6 form-group d-none d-md-block">
                <el-input
                  placeholder="Phone number"
                  class="w-100"
                  v-model="filter.phoneNumber"
                />
              </div>
            </div>
          </div>

          <div class="col-md-3 d-flex flex-column align-items-center">
            <el-button
              :color="primarycolor"
              @click="applyFilter"
              :loading="applyLoading"
              :disabled="disableBtn"
              round
              >Apply</el-button
            >
            <span class="mt-2">
              <el-button @click="clearAll" class="mr-2" text>Clear all</el-button>
              <el-button @click="hide" class="mx-2" text>Hide</el-button>
            </span>
          </div>
        </div>
      </div>
    </div>

    <Table
      :data="searchMember"
      :headers="memberHeaders"
      :checkMultipleItem="true"
      @checkedrow="handleSelectionChange"
      v-loading="paginatedTableLoading"
      v-if="searchMember.length > 0"
    >
      <template #pictureUrl="{ item }">
        <el-card
          shadow="hover"
          class="c-pointer person-image"
          v-if="item.pictureUrl"
          style="border-radius: 50%; height: 26px; width: 26px"
        >
          <el-tooltip
            class="box-item"
            effect="dark"
            content="Click to view"
            placement="top-start"
          >
            <el-image
              style="border-radius: 50%; height: 26px; width: 26px"
              :src="item.pictureUrl"
              fit="cover"
              @click="(selectedImage = item), (imageDialog = true)"
              :lazy="true"
            />
          </el-tooltip>
        </el-card>
        <el-avatar :size="25" v-else
          ><el-icon color="#000000">
            <UserFilled />
          </el-icon>
        </el-avatar>
      </template>
      <template v-slot:firstName="{ item }">
        <div class="c-pointer" @click="showMemberRow(item)">
          {{ item.firstName }}
        </div>
      </template>
      <template v-slot:lastName="{ item }">
        <div class="c-pointer" @click="showMemberRow(item)">
          {{ item.lastName }}
        </div>
      </template>
      <template v-slot:mobilePhone="{ item }">
        <div class="c-pointer" @click="showMemberRow(item)">
          {{ item.mobilePhone }}
        </div>
      </template>
      <template v-slot:action="{ item }">
        <div>
          <div class="dropdown">
            <el-icon data-toggle="dropdown" aria-expanded="false">
              <MoreFilled />
            </el-icon>
            <ul class="dropdown-menu">
              <li class="dropdown-item">
                <a>
                  <router-link
                    :to="
                      item.mobilePhone
                        ? `/tenant/sms/compose?phone=${item.mobilePhone}`
                        : ''
                    "
                    :class="{
                      'fade-text': !item.mobilePhone,
                      'text-color': item.mobilePhone,
                    }"
                    >Send SMS</router-link
                  >
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  <router-link
                    :to="item.email ? `/tenant/email/compose?phone=${item.email}` : ''"
                    :class="{
                      'fade-text': !item.email,
                      'text-color': item.email,
                    }"
                    >Send Email</router-link
                  >
                </a>
              </li>
              <li @click="displayWhatsappDrawer(item)">
                <a class="dropdown-item" href="#"> Send Whatsapp </a>
              </li>
              <li @click="archive(item.id, 'single')">
                <a class="dropdown-item" href="#">
                  <div class="text-color">Archive</div>
                </a>
              </li>
              <li>
                <!-- <a class="dropdown-item" href="#">
                  <router-link
                    :to="`/tenant/firsttimermanagement/${item.id}?memberType=1`"
                    class="text-color"
                  >
                    Follow Up
                  </router-link>
                </a> -->
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  <router-link :to="`/tenant/people/add/${item.id}`" class="text-color"
                    >Edit</router-link
                  >
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  <div
                    @click.prevent="showConfirmModal(item.id, index)"
                    class="text-color"
                  >
                    Delete
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </template>
    </Table>
    <div v-if="searchMember.length == 0">
      <el-alert
        title="Member not found"
        type="warning"
        description="Try searching with another keyword"
        show-icon
        center
      />
    </div>
    <div class="d-flex justify-content-end my-3" v-if="searchMember.length > 0">
      <el-pagination
        v-model:current-page="serverOptions.page"
        v-model:page-size="serverOptions.rowsPerPage"
        background
        layout="total, prev, pager, next, jumper"
        :total="totalItems"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>

    <el-dialog
      v-model="imageDialog"
      :width="mdAndUp || lgAndUp || xlAndUp ? `50%` : xsOnly ? `90%` : `70%`"
      align-center
      class="person-image-dialog"
    >
      <el-image class="w-100" :src="selectedImage.pictureUrl" fit="contain" />
      <template #footer>
        <span class="dialog-footer person-image-dialog-footer">
          <div class="font-weight-700">
            {{ selectedImage.firstName }} {{ selectedImage.lastName }}
          </div>
          <div class="text-secondary small">
            {{ selectedImage.mobilePhone }}
          </div>
          <div class="text-secondary small">{{ selectedImage.email }}</div>
          <div class="mt-2">
            <router-link
              :to="
                selectedImage.mobilePhone
                  ? `/tenant/sms/compose?phone=${selectedImage.mobilePhone}`
                  : ''
              "
              v-if="selectedImage.mobilePhone"
            >
              <el-button @click="imageDialog = false" round> Send SMS </el-button>
            </router-link>
            <router-link
              :to="
                selectedImage.email
                  ? `/tenant/email/compose?phone=${selectedImage.email}`
                  : ''
              "
              v-if="selectedImage.email"
            >
              <el-button @click="imageDialog = false" class="ml-2" round>
                Send Email
              </el-button>
            </router-link>
          </div>
        </span>
      </template>
    </el-dialog>

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
          <smsComponent
            :phoneNumbers="contacts"
            @closesidemodal="() => (showSMS = false)"
          />
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
          <emailComponent
            :selectedGroupMembers="markedMembers"
            @closesidemodal="() => (showEmail = false)"
          />
        </div>
      </template>
    </el-drawer>

    <el-drawer
      v-model="showWhatsapp"
      :size="mdAndUp || lgAndUp || xlAndUp ? '70%' : '100%'"
      direction="rtl"
      class="whatsappdrawer"
    >
      <template #header> </template>
      <template #default>
        <div v-if="whatsappClientState">
          <div class="d-flex justify-content-center align-items-center">
            <img src="../../assets/whatsappwhiteoutline.svg" />
            <h4 class="font-weight-700 text-dark mb-0 ml-2">Send Whatsapp message to</h4>
          </div>
          <h4 class="text-center text-secondary font-weight-600">
            {{
              sendWhatsappToMultiple ? "Selected Members" : whatsappRecipient.firstName
            }}
          </h4>
        </div>
        <div v-if="whatsappClientState">
          <div>
            <div>
              Recipient{{ sendWhatsappToMultiple ? "s" : "" }}
              <el-tooltip
                class="box-item"
                effect="customized"
                content="<div>Make sure that the numbers are correctly formatted.</div> <div>A correct format should include the country code with the phone number. E.g +2349059403948.</div> <div>It works either with the '+' symbol or without it.</div>"
                raw-content
                placement="top"
              >
                <el-icon>
                  <InfoFilled />
                </el-icon>
              </el-tooltip>
            </div>
            <div
              class="d-flex align-items-center flex-wrap"
              v-if="sendWhatsappToMultiple"
            >
              <el-tag
                class="mx-1"
                size="large"
                closable
                v-for="(item, index) in marked.filter((i) => i.mobilePhone).splice(0, 10)"
                :key="item.id"
                @close="marked.splice(index, 1)"
                >{{ item.mobilePhone }}</el-tag
              >
              <!-- <div class="multiple_numbers d-flex align-items-center mr-2 mt-2"
                v-for="(item, index) in marked.filter(i => i.mobilePhone).splice(0, 10)" :key="item.id">
                <span>{{ item.mobilePhone }}</span>
                <el-icon class="c-pointer ml-2" @click="marked.splice(index, 1)">
                  <CircleClose />
                </el-icon>
              </div> -->
            </div>
            <vue-tel-input
              class="mt-2"
              style="height: 40px"
              v-model="whatsappRecipient.mobilePhone"
              mode="international"
              v-else
            ></vue-tel-input>
            <div
              v-if="sendWhatsappToMultiple && marked.length > 10"
              class="text-secondary font-weight-600 mt-2"
            >
              and {{ marked.length - 10 }}
              {{ marked.length - 10 > 1 ? "others" : "other" }}
            </div>
          </div>
          <!-- <div class="mt-3">Message</div> -->
          <div class="mt-4">
            <el-input
              type="textarea"
              rows="8"
              placeholder="Enter your message"
              v-model="whatsappmessage"
            ></el-input>
          </div>
        </div>
        <div v-else class="mt-5">
          <AuthenticateWhatsapp />
        </div>
      </template>
      <template #footer v-if="whatsappClientState">
        <el-button
          :color="primarycolor"
          :loading="sendingwhatsappmessage"
          @click="sendWhatsapp()"
          round
          >Send <img src="../../assets/send-jet.svg" class="ml-2"
        /></el-button>
      </template>
    </el-drawer>
  </div>
</template>

<script>
import { ref, computed, watch, watchEffect, inject } from "vue";
// import ByGenderChart from "@/components/charts/PieChart.vue";
// import ByMaritalStatusChart from "@/components/charts/PieChart.vue";
import axios from "@/gateway/backendapi";
import { useRoute } from "vue-router";
import store from "../../store/store";
import stopProgressBar from "../../services/progressbar/progress";
import membershipservice from "../../services/membership/membershipservice";
import smsComponent from "../groups/component/smsComponent.vue";
import emailComponent from "../groups/component/emailComponent.vue";
// import SideBar from "../groups/sidemodal/SideModal.vue";
import deviceBreakpoint from "../../mixins/deviceBreakpoint";
import { ElMessage, ElMessageBox } from "element-plus";
import router from "../../router/index";
import Table from "@/components/table/Table";
import groupsService from "../../services/groups/groupsservice";
import { socket } from "@/socket";
import AuthenticateWhatsapp from "../../components/whatsapp/AuthenticateWhatsapp.vue";
import swal from "sweetalert";

export default {
  props: ["list", "totalItems"],
  components: {
    // ByGenderChart,
    // ByMaritalStatusChart,
    smsComponent,
    emailComponent,
    // SideBar,
    Table,
    AuthenticateWhatsapp,
  },

  setup(props) {
    const primarycolor = inject("primarycolor");
    const addClass = ref(false);
    const churchMembers = ref([]);
    const filterFormIsVissible = ref(false);
    const filter = ref({});
    const searchIsVisible = ref(false);
    const filterResult = ref([]);
    const selectAll = ref(false);
    const noRecords = ref(false);
    const searchText = ref("");
    const showSMS = ref(false);
    const showEmail = ref(false);
    const showWhatsapp = ref(false);
    const contacts = ref([]);
    const markedMembers = ref([]);
    const chooseGrouptoMoveAllMembers = ref();
    const currentUser = ref({});
    const route = useRoute();
    const displayPositionArchive = ref(false);
    const filtered = ref(false);
    const memberHeaders = ref([
      { name: "PICTURE", value: "pictureUrl" },
      { name: "FIRSTNAME", value: "firstName" },
      { name: "LASTNAME", value: "lastName" },
      { name: "PHONE", value: "mobilePhone" },
      { name: "ACTION", value: "action" },
    ]);
    const serverItemsLength = ref(0);
    const serverOptions = ref({
      page: 1,
      rowsPerPage: 50,
    });
    const paginatedTableLoading = ref(false);
    const selectedImage = ref({});
    const imageDialog = ref(false);
    const { mdAndUp, lgAndUp, xlAndUp, xsOnly } = deviceBreakpoint();
    const addToGroupDialog = ref(false);
    const allGroupLoading = ref(false);
    const addToGroupSingle = ref(false);
    const singleGroupLoading = ref(false);
    const archiveLoading = ref(false);
    const applyLoading = ref(false);
    const searchingMember = ref(true);
    const whatsappmessage = ref("");
    const whatsappRecipient = ref("");
    const sendWhatsappToMultiple = ref(false);
    const allcountries = ref([]);
    const tenantCountry = ref({});
    const sendingwhatsappmessage = ref(false);

    watch(
      serverOptions.value,
      () => {
        getPeopleByPage();
      },
      { deep: true }
    );

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

    const showMemberRow = (item) => {
      router.push(`/tenant/people/add/${item.id}`);
    };

    const toggleFilterFormVissibility = () =>
      (filterFormIsVissible.value = !filterFormIsVissible.value);

    const membershipSummary = ref(store.getters["membership/membershipSummary"]);

    const chooseGroupto = (items) => {
      chooseGrouptoMoveto.value = items;
    };

    const chooseGroupforAllmembers = (item) => {
      chooseGrouptoMoveAllMembers.value = item;
    };

    const deleteMember = (id) => {
      axios
        .delete(`/api/People/DeleteOnePerson/${id}`)
        .then((res) => {
          churchMembers.value = churchMembers.value.filter((item) => item.id !== id);
          if (res.data.response.includes("@")) {
            let disRes = res.data.response.split("@");

            ElMessage({
              type: "info",
              message: disRes[0],
            });
          } else {
            ElMessage({
              type: "success",
              message: "Member deleted successfully",
            });
          }
          store.dispatch("membership/removeMember", id);
          store.dispatch("dashboard/getDashboard");

          if (filterResult.value.length > 0 && filtered.value && filter.value.name) {
            filterResult.value = filterResult.value.filter((item) => item.id !== id);
          }

          if (searchText.value !== "" && searchPeopleNamesInDB.value.length > 0) {
            searchPeopleNamesInDB.value = searchPeopleNamesInDB.value.filter(
              (item) => item.id !== id
            );
          }
        })
        .catch((err) => {
          stopProgressBar();
          ElMessage.error("Delete failed, please try again");
          console.log(err);
        });
    };

    const hide = () => {
      filterFormIsVissible.value = false;
    };

    const disableBtn = computed(() => {
      if (!filter.value.name && !filter.value.phoneNumber) return true;
      return false;
    });

    const toggleSearch = () => {
      searchIsVisible.value = !searchIsVisible.value;
    };

    const showConfirmModal = (id, index) => {
      ElMessageBox.confirm("Are you sure you want to proceed?", "Confirm delete", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        type: "error",
      })
        .then(() => {
          deleteMember(id, index);
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "Delete canceled",
          });
        });
    };

    const getPeopleByPage = async () => {
      paginatedTableLoading.value = true;
      try {
        const { data } = await axios.get(
          `/api/People/GetPeopleBasicInfo?page=${serverOptions.value.page}`
        );
        churchMembers.value = data.data;
        paginatedTableLoading.value = false;
      } catch (error) {
        paginatedTableLoading.value = false;
        console.log(error);
      }
    };

    const getMemberSummary = () => {
      store.dispatch("membership/setMembershipSummary").then((response) => {
        membershipSummary.value = response;
        serverItemsLength.value = membershipSummary.value.totalMember;
      });
    };
    getMemberSummary();

    const marked = ref([]);
    const mark = (member) => {
      const memberIndex = marked.value.findIndex((i) => i.id === member.id);
      if (memberIndex < 0) {
        marked.value.push(member);
      } else {
        marked.value.splice(memberIndex, 1);
      }
    };

    //function to mark all item
    const markAll = () => {
      if (marked.value.length < churchMembers.value.length) {
        churchMembers.value.forEach((i) => {
          const memberInmarked = marked.value.findIndex((j) => j.id === i.id);
          if (memberInmarked < 0) {
            marked.value.push(i);
          }
        });
      } else {
        marked.value = [];
      }
    };

    const markOne = (person) => {
      const msgIndex = marked.value.findIndex((i) => i.id === person.id);
      if (msgIndex < 0) {
        marked.value.push(person);
      } else {
        marked.value.splice(msgIndex, 1);
      }
    };

    // Delete item
    const deleteMarked = async () => {
      try {
        // const IDs = marked.value.map((i) => i.id).join();
        const IDs = marked.value.map((i) => i.id);
        const response = await membershipservice.deletePeople(IDs);

        if (
          response &&
          response.response &&
          response.response.toString().toLowerCase().includes("all")
        ) {
          ElMessage({
            type: "success",
            message: "Delete successful",
            duration: 7000,
          });

          churchMembers.value = churchMembers.value.filter((item) => {
            const y = marked.value.findIndex((i) => i.id === item.id);
            if (y >= 0) return false;
            return true;
          });
        } else {
          let displayRes =
            response && response.response ? response.response.split("@") : "";
          ElMessage({
            type: "info",
            message: `${displayRes[0]}`,
            duration: 7000,
          });

          if (displayRes && displayRes[1] && displayRes[1] !== "") {
            if (!displayRes[1].includes(",")) {
              churchMembers.value = churchMembers.value.filter((item) => {
                return !item.id.includes(displayRes[1]);
              });
            } else {
              let IDs = displayRes[1].split(",");
              churchMembers.value = churchMembers.value.filter((item) => {
                const y = IDs.findIndex((i) => i === item.id);
                if (y >= 0) return false;
                return true;
              });
            }
          }
        }
        marked.value = [];
        store.dispatch("membership/setMembers");
        store.dispatch("dashboard/getDashboard");
      } catch (error) {
        console.log(error);
        ElMessage({
          type: "warning",
          message: "Delete failed, please try again",
          duration: 4000,
        });
        // }
      }
    };

    const showConfirmModal1 = () => {
      ElMessageBox.confirm(
        "This action will permanently delete the member(s). Continue?",
        "Confirm delete",
        {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "error",
        }
      )
        .then(() => {
          deleteMarked();
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "Delete canceled",
          });
        });
    };

    watchEffect(() => {
      churchMembers.value = props.list;
    });

    const toggleSelect = () => {
      selectAll.value = !selectAll.value;
    };

    const setFilteredValue = (e) => {
      if (e.length == 0) {
        filtered.value = false;
      }
    };

    const applyFilter = () => {
      applyLoading.value = true;
      filter.value.name = filter.value.name == undefined ? "" : filter.value.name;
      filter.value.phoneNumber =
        filter.value.phoneNumber == undefined ? "" : filter.value.phoneNumber;

      let url =
        "/api/People/FilterMembers?firstname=" +
        filter.value.name +
        "&lastname=" +
        filter.value.name +
        "&phone_number=" +
        filter.value.phoneNumber +
        "&page=1";
      axios
        .get(url)
        .then((res) => {
          filtered.value = true;
          noRecords.value = true;
          filterResult.value = res.data;
          applyLoading.value = false;
        })
        .catch((err) => {
          applyLoading.value = false;
          console.log(err);
        });
    };

    const clearAll = () => {
      filter.value.name = "";

      filter.value.filterDate = "";
      filter.value.phoneNumber = "";
    };

    const searchPeopleNamesInDB = ref([]);
    const searchPeopleInDB = (e) => {
      e.preventDefault();
      paginatedTableLoading.value = true;
      searchingMember.value = true;
      let url = `/api/Membership/GetSearchedUSers?searchText=${searchText.value}`;
      axios
        .get(url)
        .then((res) => {
          paginatedTableLoading.value = false;
          searchingMember.value = false;
          searchPeopleNamesInDB.value = res.data.map((i) => {
            return {
              firstName: i.name.split(" ")[0],
              lastName: i.name.split(" ")[1],
              mobilePhone: i.phone,
              email: i.email,
              id: i.id,
            };
          });
          if (res.data.length === 0) {
            ElMessage({
              type: "warning",
              message: `${searchText.value} not found, please to try add a new firsttimer and search again`,
              duration: 5000,
            });
          }
        })
        .catch((err) => {
          searchingMember.value = false;
          paginatedTableLoading.value = false;
          console.log(err);
        });
    };

    const listOfPeople = computed(() => {
      if (searchText.value !== "") return searchPeopleNamesInDB.value;
      return churchMembers.value;
    });
    // Tosin

    const searchMember = computed(() => {
      if (searchText.value !== "" && searchPeopleNamesInDB.value.length > 0) {
        return searchPeopleNamesInDB.value;
      } else if (
        searchText.value !== "" &&
        searchPeopleNamesInDB.value.length == 0 &&
        !paginatedTableLoading.value &&
        !searchingMember.value
      ) {
        return [];
      } else if (filterResult.value.length > 0 && filtered.value && filter.value.name) {
        return filterResult.value;
      } else if (filterResult.value.length == 0 && filtered.value && filter.value.name) {
        return [];
      } else {
        return churchMembers.value;
      }
    });

    const membersCount = computed(() => {
      if (membershipSummary.value.totalMember > 100)
        return Math.ceil(membershipSummary.value.totalMember / 100);
      return 1;
    });

    const clearInput = () => {
      searchText.value = "";
    };

    const getAllGroups = ref([]);
    const getGroups = async () => {
      try {
        const data = await groupsService.getGroups();
        getAllGroups.value = data.response.groupResonseDTO.map((i) => {
          return {
            label: i.name,
            value: i.id,
          };
        });
      } catch (error) {
        console.error(error);
      }
    };
    getGroups();

    const chooseGrouptoMoveto = ref();
    const moveMemberToGroup = () => {
      singleGroupLoading.value = true;
      let peopleMoved = marked.value.map((i) => {
        return {
          groupId: chooseGrouptoMoveto.value,
          position: "member",
          personId: i.id,
        };
      });
      axios
        .put(`/api/AssignPeopleToGroup/${chooseGrouptoMoveto.value}`, {
          people: peopleMoved,
        })
        .then(() => {
          singleGroupLoading.value = false;
          addToGroupSingle.value = false;

          ElMessage({
            message: "Member added successfully",
            type: "success",
          });

          store.dispatch("groups/updateGroupPeopleCount", {
            groupId: chooseGrouptoMoveto.value,
            count: marked.value.length,
            operation: "add",
          });

          marked.value = [];
        })
        .catch(() => {
          stopProgressBar();
          ElMessage({
            message: "Adding Member(s) failed, please try again",
            type: "error",
          });
          singleGroupLoading.value = false;
          addToGroupSingle.value = false;
        });
    };

    const sendMarkedMemberSms = () => {
      contacts.value = marked.value
        .filter((i) => i.mobilePhone)
        .map((i) => i.mobilePhone)
        .join();
      showSMS.value = true;
    };

    const sendMarkedMemberEmail = () => {
      showEmail.value = true;
      markedMembers.value = marked.value.map((i) => {
        return i.id;
      });
    };

    const getAllMembersAndAddToGroup = () => {
      allGroupLoading.value = true;
      axios
        .post(
          `/api/Group/AddAllMembersToGroup?groupId=${chooseGrouptoMoveAllMembers.value}&tenantId=${currentUser.value.tenantId}`
        )
        .then(() => {
          ElMessage({
            message: "All members have been added successfully",
            type: "success",
          });
          addToGroupDialog.value = false;
          allGroupLoading.value = false;
        })
        .catch((err) => {
          allGroupLoading.value = false;
          addToGroupDialog.value = false;
          console.log(err);
        });
    };

    const getUser = computed(() => {
      if (
        !store.getters.currentUser ||
        (store.getters.currentUser && Object.keys(store.getters.currentUser).length == 0)
      )
        return "";
      return store.getters.currentUser;
    });

    watchEffect(() => {
      if (getUser.value) {
        currentUser.value = getUser.value;
      }

      if (
        allcountries.value.length > 0 &&
        getUser.value &&
        Object.keys(getUser.value).length > 0
      ) {
        tenantCountry.value = allcountries.value.find((i) => {
          return i.isoCode == getUser.value.isoCode;
        });
      }
    });

    const openPositionArchive = () => {
      displayPositionArchive.value = true;
    };

    const archive = async (id, type) => {
      archiveLoading.value = true;
      let archiveBody = type == "single" ? [id] : marked.value.map((i) => i.id);
      try {
        const { data } = await axios.post("/api/People/archive", archiveBody);
        archiveLoading.value = false;
        displayPositionArchive.value = false;
        if (data && type == "single") {
          churchMembers.value = churchMembers.value.filter((item) => {
            return item.id !== id;
          });
          ElMessage({
            message: "Member archived succesfully",
            type: "success",
          });
        }
        if (data && type == "multiple") {
          churchMembers.value = churchMembers.value.filter((item) => {
            let y = marked.value.findIndex((j) => j.id == item.id);
            if (y >= 0) return false;
            return true;
          });
          ElMessage({
            message: "Members archived succesfully",
            type: "success",
          });
        }
      } catch (err) {
        archiveLoading.value = false;
        displayPositionArchive.value = false;
        console.log(err);
      }
    };

    const handleSelectionChange = (val) => {
      marked.value = val.map((i) => {
        i.mobilePhone =
          i.mobilePhone && i.mobilePhone.substring(0, 1) == "0"
            ? `+${tenantCountry.value.phoneCode}${i.mobilePhone.substring(1)}`
            : `${i.mobilePhone}`;
        return i;
      });
    };

    const handleSizeChange = (val) => {
      console.log(`${val} items per page`);
    };
    const handleCurrentChange = (val) => {
      console.log(`current page: ${val}`);
    };

    const clientSessionId = computed(() => {
      if (!store.getters["communication/whatsappSessionId"]) return "";
      return store.getters["communication/whatsappSessionId"];
    });

    const sendWhatsapp = () => {
      sendingwhatsappmessage.value = true;
      if (sendWhatsappToMultiple.value) {
        socket.emit("sendwhatsappmessage", {
          id: clientSessionId.value,
          phone_number: marked.value.map((i) => i.mobilePhone),
          message: whatsappmessage.value,
        });
      } else {
        socket.emit("sendwhatsappmessage", {
          id: clientSessionId.value,
          phone_number: whatsappRecipient.value.mobilePhone,
          message: whatsappmessage.value,
        });
      }
    };

    const displayWhatsappDrawer = (item) => {
      showWhatsapp.value = true;
      if (item) {
        whatsappRecipient.value = item;
        sendWhatsappToMultiple.value = false;
      } else {
        // marked.value = marked.value.filter(i => i.mobilePhone).splice(0, 10)
        sendWhatsappToMultiple.value = true;
      }
    };

    const whatsappClientState = computed(() => {
      return store.getters["communication/isWhatsappClientReady"];
    });

    const getAllCountries = async () => {
      try {
        let { data } = await axios.get("/api/getallcountries");
        console.log(data);
        allcountries.value = data;
      } catch (error) {
        console.error(error);
      }
    };

    getAllCountries();

    return {
      churchMembers,
      chooseGroupto,
      chooseGroupforAllmembers,
      getAllMembersAndAddToGroup,
      getPeopleByPage,
      filterFormIsVissible,
      toggleFilterFormVissibility,
      membershipSummary,
      deleteMember,
      filter,
      applyFilter,
      clearAll,
      hide,
      disableBtn,
      toggleSearch,
      searchIsVisible,
      showConfirmModal,
      filterResult,
      selectAll,
      toggleSelect,
      noRecords,
      searchText,
      membersCount,
      marked,
      mark,
      markAll,
      markOne,
      deleteMarked,
      clearInput,
      showConfirmModal1,
      getGroups,
      getAllGroups,
      chooseGrouptoMoveto,
      moveMemberToGroup,
      searchPeopleInDB,
      listOfPeople,
      searchMember,
      sendMarkedMemberSms,
      showSMS,
      sendMarkedMemberEmail,
      showEmail,
      showWhatsapp,
      contacts,
      markedMembers,
      chooseGrouptoMoveAllMembers,
      route,
      currentUser,
      addClass,
      archive,
      openPositionArchive,
      displayPositionArchive,
      filtered,
      setFilteredValue,
      memberHeaders,
      serverItemsLength,
      serverOptions,
      paginatedTableLoading,
      selectedImage,
      imageDialog,
      mdAndUp,
      lgAndUp,
      xlAndUp,
      xsOnly,
      showMemberRow,
      addToGroupDialog,
      allGroupLoading,
      addToGroupSingle,
      singleGroupLoading,
      archiveLoading,
      applyLoading,
      handleSelectionChange,
      handleSizeChange,
      handleCurrentChange,
      searchingMember,
      primarycolor,
      sendWhatsapp,
      whatsappmessage,
      displayWhatsappDrawer,
      whatsappRecipient,
      sendWhatsappToMultiple,
      whatsappClientState,
      getUser,
      allcountries,
      tenantCountry,
      sendingwhatsappmessage,
      clientSessionId,
    };
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.m-wrapper {
  background-color: white !important;
  width: 875px;
  position: absolute;
  right: 0px;
  top: 0;
  height: 100%;
  padding: 70px;
  transition: all 3s ease-out;
}

.m-wrapper2 {
  background-color: white !important;
  width: 875px;
  position: absolute;
  right: 0px;
  top: 0;
  /* height: 100%; */
  padding: 70px;
}

.no-show {
  width: -875px;
  transition: all 3s ease-out;
}

.summary-header {
  margin: -0.8rem 10px 0.5rem 10px;
  opacity: 0.8;
  font-size: 22px;
  font-weight: 600;
}

.boards {
  display: flex;
}

.board {
  width: 28%;
  border-radius: 10px;
  padding: 0 8px;
}

.chart-con {
  width: 70%;
  display: flex;
  justify-content: space-between;
}

.board-top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
  align-items: center;
  box-shadow: 0px 3px 6px #2c28281c;
  padding: 4px;
}

.total {
  margin-bottom: 40px;
  font-size: 37px;
}

.total-text {
  font-size: 15px;
  font-weight: 700;
}

.table-top {
  font-weight: 800;
  font-size: 12px;
  background: #fff;
  border: 1px solid #d4dde3;
  border-bottom: none;
}

.filter-options {
  height: 0;
  overflow: hidden;
  transition: all 0.5s ease-in-out;
  background: #ffffff;
  border-left: 1px solid #d4dde3;
  border-right: 1px solid #d4dde3;
}

.filter-options-shown {
  height: 80px;
  overflow: hidden;
  transition: all 0.5s ease-in-out;
}

.text-color:hover {
  color: #007bff;
}

.color-deleteicon {
  color: rgba(184, 5, 5, 0.726);
}

.fade-text {
  color: #a8a8a8;
  cursor: not-allowed;
}

.text-color {
  color: #212529;
}

@media screen and (max-width: 500px) {
  .chart1,
  .chart2,
  .board,
  .chart-con {
    width: 100% !important;
  }

  .data-text {
    display: inline-block;
  }
}

@media screen and (min-width: 500px) {
  .picture > p {
    margin-left: 43px;
  }

  .table-body .check {
    width: 4%;
  }

  .action {
    width: 20%;
  }
}

@media (max-width: 767px) {
  .filter-options-shown {
    height: 150px;
  }

  .data-text {
    display: none;
  }

  .alignLeft {
    float: right;
  }
}

@media screen and (max-width: 768px) {
  .board-top {
    margin-bottom: 10px;
  }

  .total {
    margin-bottom: 0;
  }
}

@media screen and (min-width: 501px) and (max-width: 768px) {
  .board {
    width: 50% !important;
    margin-bottom: 10px;
  }

  .summary-header {
    width: 50%;
    margin-left: 26.5%;
  }
}

@media screen and (max-width: 1024px) {
  .my-con {
    flex-direction: column;
  }
}

.row-divider {
  border: 1px solid #0020440a;
  margin: 0;
}

.table-footer {
  display: flex;
  justify-content: flex-end;
  background: #fff;
  padding: 10px 0;
  border-radius: 0px 0px 22px 22px;
}

@media screen and (max-width: 947px) {
  .m-wrapper,
  .m-wrapper2 {
    width: 700px;
    padding: 50px;
  }
}

@media screen and (max-width: 767px) {
  .m-wrapper,
  .m-wrapper2 {
    width: 400px;
    padding: 40px;
  }
}

@media screen and (max-width: 575px) {
  .m-wrapper,
  .m-wrapper2 {
    width: 350px;
    padding: 20px;
  }
}

.fa-ellipsis-v {
  padding: 10px;
}

.multiple_numbers {
  padding: 10px;
  border-radius: 5px;
  background: #eee;
}
</style>
