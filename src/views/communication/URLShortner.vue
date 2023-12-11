<template>
  <div>
    <Header headerName="URL Manager" />
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
          <template #shortUrl="{ item }">
            <span>{{ item.shortUrl }}</span>
          </template>
          <template #dateEntered="{ item }">
            <span>{{ item.dateEntered }}</span>
          </template>
          <template #longUrl="{ item }">
            <span>{{
              item.longUrl
                ? item.longUrl.length > 30
                  ? `${item.longUrl.substring(0, 30)}...`
                  : item.longUrl
                : ""
            }}</span>
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
      :width="mdAndUp || lgAndUp || xlAndUp ? `50%` : `90%`"
    >
      <div class="row">
        <div class="col-md-12">
          <div class="font-weight-700">Enter the url you wanted to shorten</div>
          <el-input
            type="text"
            v-model="longUrl"
            placeholder="https://example.com/"
            class="mt-2"
          />
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="createURLDialog = false" class="secondary-button"
            >Cancel</el-button
          >
          <el-button :color="primarycolor" @click="shortenUrl" :loading="shorteningURL"
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

export default {
  components: {
    Header,
    Table,
  },
  inject: ["primarycolor"],
  name: "Test",
  created() {
    this.getShortenUrl();
  },
  data() {
    return {
      linkHeaders: [
        { name: "NAME", value: "shortUrl" },
        { name: "Long Url", value: "longUrl" },
        { name: "Date Created", value: "dateEntered" },
        { name: "Total Click", value: "totalClick" },
        { name: "Action", value: "action" },
      ],
      createURLDialog: false,
      mdAndUp: deviceBreakpoint().mdAndUp,
      lgAndUp: deviceBreakpoint().lgAndUp,
      xlAndUp: deviceBreakpoint().xlAndUp,
      longUrl: "",
      shorteningURL: false,
      gettingURLs: false,
      shortenedURLs: [],
    };
  },
  props: {},
  methods: {
    async shortenUrl() {
      this.shorteningURL = true;
      try {
        let response = await axios.get(`/api/UrlShortner/ShortenUrl?url=${this.longUrl}`);
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
  },
};
</script>

<style lang="scss" scoped></style>
