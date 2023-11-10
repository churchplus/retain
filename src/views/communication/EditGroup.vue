<template>
  <div>
    <div class="container">
      <div class="row mainHeada mt-5">
        <div class="col-md-6 col-sm-10">
          <h1>Contact List</h1>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <hr class="hr mb-md-5" />
        </div>
      </div>

      <!-- Content of the Box -->
      <main class="">
        <div id="main" class="container-fluid col-sm-12">
          <div class="row mb-4">
            <!-- Group Name row -->
            <div class="col-md-12">
              <div class="row d-md-flex align-items-center mt-2">
                <div class="col-md-12">
                  <div class="row">
                    <div class="col-md-12 gName">
                      <h3 class="ml-md-n3 mb-n2">Group Name</h3>
                    </div>
                  </div>

                  <!-- Context Area -->
                  <div
                    class="row amazing mt-lg-3 mb-4"
                  >
                    <!-- <h4 class="ml-md-n3 mt-lg-1">Amazing Group</h4> -->
                    <div class="col-sm-9 form-group px-0">
                      <input
                        type="text"
                        class="p-0"
                        :class="{ 'form-control' : !groupNameDisabled, 'inputWithDisable' : groupNameDisabled }"
                        id="groupName"
                        v-model="groupNameValue"
                        v-bind:disabled="groupNameDisabled"
                        ref="groupName"
                      />
                    </div>

                    <div class="col-sm-2 amazingE">
                      <button
                        v-on:click="enableGroupName"
                        class="btnIcons btn-secondary"
                      >
                        <i class="pi pi-pencil-alt icons"></i>
                        Edit
                      </button>
                    </div>
                  </div>

                  <div class="row mb-lg-1">
                    <h3>Phone Numbers</h3>
                  </div>
                  <div class="row mdiv">
                    <div class="col-sm-9 form-group px-0">
                      <textarea class="form-control" v-model="groupNumbers" rows="4" ref="iframeLink"></textarea>
                    </div>
                    <div class="col-sm-2 addIconarea">
                      <button
                        v-on:click="copyIframeLink"
                        class="btnIcons align-self-end btn-secondary mb-2"
                      >
                        <i class="pi pi-copy icon" aria-hidden="true"></i>
                        Copy
                      </button>
                    </div>
                  </div>
                  <div class="row mt-md-5">
                    <div class="col-md-11 ml-4">
                      <div class="row d-flex align-items-center justify-content-end">
 
                          <button
                            v-on:click="resetInputFields"
                            class="btn default-btn"
                          >
                            cancel
                          </button>
                          <button
                            v-on:click="saveDetails"
                            class="btn default-btn border-0 primary-bg ml-md-4"
                          >
                            <i
                              class="fas fa-circle-notch fa-spin mr-2 text-white"
                              v-if="loading"
                            ></i>
                            <span class="text-white">Save</span>
                            <span></span>
                          </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
    <Toast />
  </div>
</template>

<script>
import axios from "@/gateway/backendapi";
import communicationService from "../../services/communication/communicationservice"

export default {
  data() {
    return {
      groupNameValue: "",
      groupNameDisabled: true,
      groupNumbers: "",
      loading: false,
      phoneNumbers: []
    };
  },

  methods: {
    enableGroupName() {
      this.groupNameDisabled = false;
      this.$nextTick(() => {
        this.$refs.groupName.focus()
      })
      console.log(this.$refs.groupName)
    },

    saveDetails() {
      if (this.groupNumbers.includes(',')) {
          this.groupNumbers.split(',').forEach(i => {
            
            let match = /\r|\n/.exec(i);
            if (match) {
              i.split('\n').forEach(j => {
                this.phoneNumbers.push(j)
              })
          } 
          else {
            this.phoneNumbers.push(i)
          }
            })
          } else {
            let match = /\r|\n/.exec(this.groupNumbers);
            if (match) {
              this.groupNumbers.split('\n').forEach(i => {
                this.phoneNumbers.push(i)
            })
          } else {
            this.phoneNumbers.push(this.groupNumbers)
          }
            
          }

      let details = {
        id: this.$route.params.groupId,
        groupName: this.groupNameValue,
        phoneNumbers: this.phoneNumbers.join(","),
      };
      console.log(details);
        this.loading = true;
      axios
        .put("/api/Messaging/editPhoneGroups", details)
        .then((res) => {
            this.loading = false;
            console.log(res);
            this.$router.push({ name: "ContactList" })
        })
        .catch((err) => {
            this.loading = false;
            console.log(err);
        });
    },

    resetInputFields() {
      this.$router.push({ name: "ContactList" })
    },
    copyIframeLink () {
          this.$refs.iframeLink.select();
          this.$refs.iframeLink.setSelectionRange(0, this.$refs.iframeLink.value.length); /* For mobile devices */

          /* Copy the text inside the text field */
          document.execCommand("copy");
          this.$toast.add({
              severity: "info",
              summary: "Number Copied",
              detail: "Group phone numbers copied to your clipboard",
              life: 3000,
          });
      }
  },

  created() {
    const groupId = this.$route.params.groupId;
    console.log(groupId);
    communicationService.getOnePhoneGroup(`/api/Messaging/getPhoneGroupById?phoneGroupId=${groupId}`)
      .then((res) => {
        console.log(res)
        this.groupNameValue = res.name
        this.groupNumbers = res.numbers
        
      })
      .catch((err) => {
        console.log(err)
      })
  },
};
</script>

<style scoped>
:root {
  --font-color: #02172e;
  --hrule-color: #708eb15c;
  --primary-color: #000000;
}

.container {
  outline: none;
  overflow: hidden;
}

#groupName:focus {
  border: none;
}

.inputWithDisable {
  /* background-color: rgba(252, 252, 252, 0.932); */
  border: none;
  outline: transparent;
  display: block;
  width: 100%;
  height: calc(1.5em + .75rem + 2px);
  padding: .375rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-clip: padding-box;
}

.inputWithDisable:disabled {
  background: transparent;
}

h1,
h3,
h4 {
  font-family: "Nunito Sans";
  color: var(--font-color);
}

h1 {
  font-size: 24px;
  font-weight: bold;
}

h3 {
  font-size: 16px;
  font-weight: bold;
}

h4 {
  font-size: 16px;
}

.hr {
  color: #708eb15c;
}

.addContent {
  border: 1px solid #02172e30;
  border-radius: 5px;
  height: 40px;
}

.btn {
  display: inline-block;
}

.btnIcons {
  width: 110px;
  height: 35px;
  color: var(--primary-color);
  background-color: #dde2e6;
  border-radius: 40px;
  border: none;
  outline: none;
}

.btnBase1 {
  color: var(--primary-color);
  background-color: transparent;
  /* border: 1px var(--primary-color) solid; */
  border: 1px solid #000000;
}

.btnBase {
  box-sizing: border-box;
  width: 108px;
  height: 44px;
  border-radius: 50px;
}

.icons {
  color: var(--primary-color);
  margin-right: 10px;
}

@media only screen and (max-width: 500px) {
  .mainHeada {
    margin-top: 1rem;
  }

  .gName {
    margin: 0 0 1rem -1rem;
  }

  h3 {
    font-size: 17px;
    font-weight: bold;
  }

  .amazing {
    margin: 0 0 2rem -2rem;
    display: flex;
    flex-direction: row;
  }

  .amazingG {
    width: 50%;
    margin-top: 0.5rem;
  }

  .amazingE {
    padding: 0;
    width: 50%;
    margin-left: 1rem;
    /* display: flex; */
    justify-content: flex-end;
  }

  .spanArea1 {
    position: relative;
    margin-top: 1rem;
    display: flex;
  }

  .spanArea2 {
    position: absolute;
    top: 0;
    right: -13.5rem;
  }

  .spanArea {
    width: 40%;
    position: absolute;
  }

  .addIconarea {
    padding: 0;
  }

  .basebtns {
    margin: 2.5rem auto;
    width: 40%;
  }

  #groupName {
    margin-left: 1rem;
  }
}
</style>