
<template>
  <div>
    <div container>
      <h1 class="mt-3 pl-3 mb-3 font-weight-bolder" style="font-size: 34px">
        {{ currentUser ? currentUser.churchName : "" }}
      </h1>
      <p class="pl-3" style="font-size: 16px">
        You can invite a new user to access your ChurchPlus account. Only give
        access to people you trust, since users can see your transactions and
        other business information.
      </p>
      <div class="invite-container" style="font-size: 14px">
        <h4 class="font-weight-bold ml-0 ml-md-3 ml-sm-0">
          {{ $route.query.email ? "Edit New User" : inviteNew }}
        </h4>
        <div class="row">
          <div
            class="col-lg-7 col-sm-12 pr-3 mt-3 mt-lg-3 pr-lg-5 pr-sm-3"
            style=""
          >
            <div class="row mb-3">
              <div class="col-lg-4 col-sm-12 text-lg-right text-sm-left">
                <label class="">Email</label>
              </div>
              <div class="col-lg-8 col-sm-12">
                <el-input
                  type="text"
                  required
                  v-model="mail"
                  class="w-100"
                  size="large"
                />
              </div>
            </div>
            <div class="row mb-3 mt-5">
              <div class="col-lg-4 col-sm-12 text-lg-right text-sm-left">
                <span class="">Phone Number</span>
              </div>
              <div class="col-lg-8 col-sm-12">
                <el-input
                  type="number"
                  class="w-100"
                  size="large"
                  required
                  v-model="phoneNumber"
                />
              </div>
            </div>
            <div class="row mb-3 mt-5" v-if="!disabled">
              <div class="col-lg-4 col-sm-12 text-lg-right text-sm-left">
                <span class="">Password</span>
              </div>
              <div class="col-lg-8 col-sm-12">
                <el-input
                  type="password"
                  autocomplete="new-password"
                  :disabled="disabled"
                  class="w-100"
                  size="large"
                  required
                  v-model="password1"
                />
              </div>
            </div>
            <div class="row mt-5" v-if="!disabled">
              <div class="col-lg-4 col-sm-12 text-lg-right text-sm-left">
                <span class="">Confirm Password</span>
              </div>
              <div class="col-lg-8 col-sm-12">
                <el-input
                  type="password"
                  class="w-100"
                  size="large"
                  autocomplete="new-password"
                  :disabled="disabled"
                  v-model="password2"
                  required
                />
              </div>
            </div>
            <div class="row">
              <div class="col-sm-12 mt-4">
                <div class="ml-5 mt-2 mt-lg-0">
                  <span class="col-lg-1 mb-lg-0 mb-3 font-weight-bold"
                    >Roles</span
                  >
                  <div
                    class="col-12 mt-2"
                    v-for="(item, index) in roles"
                    :key="index"
                  >
                    <div
                      v-if="
                        item !== 'FollowUp' &&
                        item !== 'FirsttimerFollowUp' &&
                        item !== 'CanAccessNewConverts' &&
                        item !== 'CanAccessFollowUps' &&
                        item !== 'GroupLeader'
                      "
                    >
                      <el-checkbox
                        v-model="selectedRole"
                        :label="item"
                        size="large"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-12 text-center p-5" v-if="loading">
                <i
                  class="pi pi-spin pi-spinner text-center text-primary"
                  style="fontsize: 3rem"
                ></i>
              </div>
            </div>
          </div>

          <div
            class="
              col-lg-5 col-sm-12
              mt-lg-0 mt-sm-5 mt-md-5 mt-lg-0 mt-5
              pl-lg-5
              pr-lg-5
              pl-sm-3
              pr-3 pr-sm-2
            "
          >
            <div class="row">
              <div class="col-12">
                <h4 class="adminPermission">Admin Permission</h4>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <p>
                  Best for a business partner, family member or trusted
                  accountant
                </p>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <table class="table border-none m-0">
                  <tbody>
                    <tr v-for="(item, index) in roles" :key="index">
                      <td
                        v-if="
                          item !== 'FollowUp' &&
                          item !== 'GroupLeader' &&
                          item !== 'FirsttimerFollowUp' &&
                          item !== 'CanAccessNewConverts' &&
                          item !== 'CanAccessFollowUps'
                        "
                      >
                        {{ item }}
                      </td>
                      <td
                        v-if="
                          item !== 'FollowUp' &&
                          item !== 'GroupLeader' &&
                          item !== 'FirsttimerFollowUp' &&
                          item !== 'CanAccessNewConverts' &&
                          item !== 'CanAccessFollowUps'
                        "
                        :class="{
                          'text-success':
                            selectedRole.find((i) => i == item) ||
                            selectedRole.some(
                              (i) => i.toLowerCase() == 'admin'
                            ),
                        }"
                      >
                        {{
                          selectedRole.find((i) => i == item) ||
                          selectedRole.some((i) => i.toLowerCase() == "admin")
                            ? "Full Access"
                            : "No Access"
                        }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="row mb-lg-5">
          <div class="col-lg-7"></div>
          <div
            class="
              col-lg-5 col-md-12 col-sm-12
              d-flex
              justify-content-around
              mt-3
            "
          >
            <router-link to="/tenant/settings">
              <el-button
                round
                class="secondary-button"
                size="large"
                >Discard</el-button
              ></router-link
            >
            <el-button
              round
              size="large"
              :color="primarycolor"
              :loading="loading"
              class="px-3 ml-3 text-white"
              @click="callButton"
              >Save User</el-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "@/gateway/backendapi";
import store from "@/store/store";
import { ElMessage } from "element-plus";
import userRoles from "../../services/user/userRoles";
export default {
  components: {},
  inject: ['primarycolor'],
  data() {
    return {
      inviteNew: "Invite New User",
      roles: [],
      selectedRole: [],
      userName: "",
      disabled: false,
      disable: false,
      mail: "",
      password1: "",
      password2: "",
      phoneNumber: "",
      name2: "",
      info: null,
      defaultEmail: {},
      currentUser: store.getters.currentUser,
      loading: false,
    };
  },
  methods: {
    callButton() {
      if (!this.$route.query.email) {
        this.createNewUser();
      } else {
        this.updateChurchUser();
      }
    },
    createNewUser() {
      if (this.mail === "") {
        ElMessage({
          type: "error",
          message: "Input Your Complete Details",
          duration: 5000
        });
        return false;
      }
      if (this.password1.length < 6) {
        ElMessage({
          type: "error",
          message: "Ensured Your Password is More than 6 character",
          duration: 5000
        });
        return false;
      }
      let createNew = {
        email: this.mail,
        password: this.password1,
        name: this.userName,
        roles: this.selectedRole,
        phone: this.phoneNumber,
      };
      axios
        .post(`/api/Settings/CreatNewUser`, createNew)
        .then((res) => {
          ElMessage({
            type: "success",
            message: "New User Saved Successfully",
          });
          console.log(res);
          this.$router.push("/tenant/settings");
        })
        .catch((error) => {
          if (error.response.data) {
            ElMessage({
              type: "warning",
              message: error.response.data,
              duration: 5000
            });
          } else {
            ElMessage({
              type: "warning",
              message: "Please check your network and try again",
              duration: 5000
            });
          }
        });
    },
    async updateChurchUser() {
      let newUpdate = {
        email: this.mail,
        phone: this.phoneNumber,
        password: this.password1,
        name: this.userName,
        roles: this.selectedRole,
      };
      axios
        .put(`/api/Settings/UpdateChurchUser`, newUpdate)
        .then((res) => {
          ElMessage({
            type: "success",
            message: "New User Saved Successfully",
            duration: 5000
          });
          console.log(res);
          this.$router.push("/tenant/settings");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async getEmail() {
      if (this.$route.query.email) {
        try {
          const { data } = await axios.get(
            `/api/Settings/GetChurchUserByEmail?email=${this.$route.query.email}`
          );
          // this.userName = data.name;
          this.mail = data.email;
          this.password1 = data.password;
          this.password2 = data.password;
          this.phoneNumber = data.phone;
          this.selectedRole = data.roles;
        } catch (error) {
          console.log(error);
        }
      }
    },
    async userRole() {
      this.loading = true;
      try {
        let roles = await userRoles();
        this.loading = false;
        this.roles = roles.data;
      } catch (err) {
        console.log(err);
        this.loading = false;
      }
    },
  },
  created() {
    if (this.$route.query.email) {
      this.disabled = true;
    }

    this.getEmail();
    if (!this.currentUser || !store.currentUser) {
      console.log("no current user found");
      axios
        .get(`/api/Membership/GetCurrentSignedInUser`)
        .then((response) => {
          this.currentUser = response.data;
          // console.log(this.getTypes());
        })
        .catch((error) => console.log(error));
    } else {
      console.log("current user found");
    }
    this.userRole();
  },
  mounted() {
    console.log(store.getters.currentUser);
    if (!store.getters.currentUser || store.getters.currentUser.churchName) {
      axios
        .get(`/api/Membership/GetCurrentSignedInUser`)
        .then((response) => {
          this.currentUser = response.data;
          console.log(response.data);
        })
        .catch((error) => console.log(error));
    }
  },
};
</script>

<style scoped>
.invite-container {
  width: 100%;
  margin-top: 20px;
  margin-left: 14px;
  height: 800px;
}
.bg-secondary {
  background-color: #00000063 !important;
}
.new span {
  text-align: right;
}
.table {
  border-radius: 0 !important;
}
.button-add button {
  width: 110px;
}
.btn-outline-secondary:hover {
  background-color: white;
  color: rgb(110, 104, 104);
}

.invite-container {
  width: 100%;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 15px 30px #00000029;
  border: 1px solid #dde2e6;
  border-radius: 10px;
  opacity: 1;
  height: auto;
  padding: 10px 10px;
}
.rolesBackground {
  color: green;
}

@media (max-width: 771px) {
  .adminPermission {
    margin-top: 4rem !important;
  }
}
</style>