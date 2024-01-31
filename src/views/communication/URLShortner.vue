<template>
  <div>
    <Header headerName="URL Shortner" />
    <el-main>
      <div class="d-flex justify-content-end">
        <div class="mt-3 mt-sm-0">
          <el-button
            :color="primarycolor"
            class="ml-2 header-btn"
            size="large"
            @click="createURLDialog = true"
            >Create link</el-button
          >
        </div>
      </div>
      <div class="mt-5">
        <Table
          :headers="linkHeaders"
          :checkMultipleItem="false"
          v-loading="gettingURLs"
          :data="shortenedURLs"
        >
          <template #title="{ item }">
            <span>{{ item.title }}</span>
          </template>
          <template #source="{ item }">
            <span>{{ item.source }}</span>
          </template>
          <template #dateEntered="{ item }">
            <span>{{ formatDate(item.dateEntered) }}</span>
          </template>
          <template #shortUrl="{ item }">
            <span ref="textToCopy">{{
              item.shortUrl
            }}</span>
          </template>
          <template #copy>
            <span class="c-pointer" @click="copyToClipboard">
              <el-icon><CopyDocument /></el-icon></span>
          </template>
          <!-- <template v-slot:email="{ item }"> 
                  <span>{{ item.email }}</span>
                </template>
                <template v-slot:phone="{ item }">
                  <span>{{ item.phone }}</span>
                </template>
                <template v-slot:action="{ item }">
                  <el-dropdown>
                    <el-icon id="dropdownMenuButton" data-toggle="dropdown">
                      <MoreFilled />
                    </el-icon>
                    <template #dropdown>
                      <el-dropdown-menu>
                        <el-dropdown-item>
                          <a @click="displaySMSDialog(item)"> Send SMS</a>
                        </el-dropdown-item>
                        <el-dropdown-item>
                          <a @click="displayEmailDialog(item)">Send Email</a>
                        </el-dropdown-item>
                        <el-dropdown-item>
                          <a @click="archive(item.personID, 'single')"> Archive </a>
                        </el-dropdown-item>
                        <el-dropdown-item>
                          <a @click="confirmDelete(item.id, index)">Remove</a>
                        </el-dropdown-item>
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                </template> -->
        </Table>
      </div>
    </el-main>
    <el-dialog
      v-model="createURLDialog"
      title="Create short link"
      :width="mdAndUp || lgAndUp || xlAndUp ? `75%` : `90%`"
    >
      <div class="row">
        <div class="col-md-12">
          <div class="font-weight-700">Destination URL</div>
          <el-input
            type="text"
            v-model="preShort.longUrl"
            placeholder="https://example.com/"
            class="mt-2"
          />
        </div>
        <div class="col-md-12 mt-3">
          <div class="font-weight-700">Title</div>
          <el-input
            type="text"
            v-model="preShort.title"
            placeholder="Event campaigne"
            class="mt-2"
          />
        </div>
        <div class="col-md-12 mt-3">
          <div class="d-flex align-items-center">
            <el-switch v-model="toggleSources" size="large" />
            <div class="ml-2">Add UTMs to track web traffic in analytics tools</div>
          </div>
          <transition name="el-zoom-in-top">
            <div
              style="background: #f4f6fa; border-radius: 5px"
              class="mt-3 p-3"
              v-show="toggleSources"
            >
              <div class="row">
                <div class="col-12 col-md-6 mt-3 mt-md-0">
                  <div class="font-weight-700">Source</div>
                  <el-input
                    type="text"
                    placeholder="e.g., google, whatsapp, sms"
                    v-model="preShort.source"
                  />
                </div>
                <div class="col-12 col-md-6 mt-3 mt-md-0">
                  <div class="font-weight-700">Medium</div>
                  <el-input
                    type="text"
                    placeholder="e.g., social, banner, email"
                    v-model="preShort.medium"
                  />
                </div>
                <div class="col-12 col-md-6 mt-3">
                  <div class="font-weight-700">Campaign</div>
                  <el-input
                    type="text"
                    placeholder="e.g., event_promo, spring_sale"
                    v-model="preShort.campaign"
                  />
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button
            @click="createURLDialog = false"
            size="large"
            class="secondary-button"
            >Cancel</el-button
          >
          <el-button
            :color="primarycolor"
            size="large"
            @click="shortenUrl"
            :loading="shorteningURL"
            >Shorten</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import Header from "@/components/header/Header.vue";
import Table from "@/components/table/Table";
import deviceBreakpoint from "../../mixins/deviceBreakpoint";
import { ElMessage } from "element-plus";
import axios from "@/gateway/backendapi";
// import ElDropDown from "@/components/dropdown/ElDropDown";
import dateFormatter from "@/services/dates/dateformatter.js";

export default {
  components: {
    Header,
    Table,
    // ElDropDown,
  },
  inject: ["primarycolor"],
  name: "Test",
  created() {
    this.getShortenUrl();
  },
  data() {
    return {
      linkHeaders: [
        { name: "Title", value: "title" },
        { name: "Source", value: "source" },
        { name: "Short url", value: "shortUrl" },
        { name: "Date Created", value: "dateEntered" },
        { name: "Total Click", value: "totalClick" },
        { name: "Copy", value: "copy" },
      ],
      createURLDialog: false,
      mdAndUp: deviceBreakpoint().mdAndUp,
      lgAndUp: deviceBreakpoint().lgAndUp,
      xlAndUp: deviceBreakpoint().xlAndUp,
      longUrl: "",
      preShort: {},
      shorteningURL: false,
      gettingURLs: false,
      shortenedURLs: [],
      // sources: ["SMS", "WhatsApp", "Facebook", "Twitter", "Instagram", "Others"],
      toggleSources: false,
    };
  },
  props: {},
  methods: {
    async shortenUrl() {
      // this.preShort.longUrl = this.preShort.utm.source
      //   ? "?utm_source=" + this.preShort.utm.source
      //   : "" + this.preShort.utm.medium
      //   ? "&&utm_medium=" + this.preShort.utm.medium
      //   : "" + this.preShort.utm.campaigne
      //   ? "&&utm_campaigne=" + this.preShort.utm.campaigne
      //   : "";
      console.log(this.preShort);
      this.shorteningURL = true;
      try {
        let response = await axios.post(`/api/UrlShortner/ShortenUrl?url=${this.longUrl}`, this.preShort);
        this.shorteningURL = false;
        this.createURLDialog = false;
        this.getShortenUrl();
        ElMessage({
          type: "success",
          message: "Link created successfully",
          duration: 6000,
        });
        console.log(response);
      } catch (error) {
        this.shorteningURL = false;
        console.error(error);
      }
    },
    async getShortenUrl() {
      this.gettingURLs = true;
      try {
        let { data } = await axios.get(`/api/UrlShortner/GetAllShortenUrl`);
        this.shortenedURLs = data;
        this.gettingURLs = false;
        console.log(data);
      } catch (error) {
        this.gettingURLs = false;
        console.error(error);
      }
    },
    formatDate(date) {
      return dateFormatter.monthDayYear(date);
    },
    copyToClipboard() {
      // Get the text from the div
      const textToCopy = this.$refs.textToCopy.innerText;

      // Create a temporary textarea element
      const textarea = document.createElement("textarea");
      textarea.value = textToCopy;

      // Append the textarea to the document
      document.body.appendChild(textarea);

      // Select the text in the textarea
      textarea.select();
      textarea.setSelectionRange(0, 99999); // For mobile devices

      // Copy the selected text to the clipboard
      document.execCommand("copy");

      // Remove the textarea from the document
      document.body.removeChild(textarea);

      // Optionally, provide user feedback (e.g., show a tooltip or message)
      ElMessage({
      type: "success",
          message: "Copied",
          duration: 6000,
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
