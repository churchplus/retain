<template>
  <div> 
    <div class="container">
      <div class="row d-md-flex justify-content-between mt-3 mb-4">
        <div class="col-md-7 col-xl-8 col-lg-8 col-sm-12">
          <h2 class="font-weight-bolder churchHeader">{{churchProfile ? churchProfile.churchName : ""}}</h2>
        </div>
        <div class="col-lg-4 col-xl-4 col-md-5 col-sm-12 d-flex justify-content-sm-end  mt-2 link d-lg-flex justify-content-end">
          <router-link
            to="/tenant/settings/invitenewuser"
            class="grey-border primary-bg border-0 text-white addnew default-btn"
            >Add New User</router-link
          >
        </div>
      </div>
      <div class="col-md-12 px-0 my-4">
        <p class="small-text">
          You can invite a new user to access your Church account. Only give
          access to people you trust, since users can see your transactions and
          other business information.
        </p>
      </div>
        
 
 <div class="row table mt-5">
  <div class="col-12 px-0" id="table">
    <div class="top-con" id="ignore2">
        <div class="table-top">
          <div class="col-4">
            <p @click="toggleSearch" class="search-text w-100 mt-2 d-flex justify-content-center">
              <i class="pi pi-search"></i>SEARCH
            </p>
          </div>

          <div class="search d-flex ml-2 mr-3"
          >
            <label
              class="label-search d-flex"
              :class="{
                'show-search': searchIsVisible,
                'hide-search': !searchIsVisible,
              }"
            >
              <el-input
                type="text"
                class="w-100"
                placeholder="Search..."
                v-model="searchText"
              />
              <span class="empty-btn"
                    @click="clearInput">
                    <i class="pi pi-times"></i
            ></span>
              <span class="search-btn"
              @click="removeSearchText">
                <i class="pi pi-search"></i>
              </span>
            </label>
          </div>
        </div>
    </div>
  </div>
   <div class="col-md-12">
     <div class="border-0 bg-danger">
      <div class="row table-header-row py-2  small-text">
          <div class="col-md-4">
          <span class="py-3 font-weight-bold">Email</span>
        </div>
        <div class="col-md-4">
          <span class="py-2 font-weight-bold">Status</span>
        </div>
        <div class="col-md-3">
          <span class="py-2 font-weight-bold">Roles</span>
        </div>
        <div class="col-md-1">
          <span class="py-2 font-weight-bold"></span>
        </div>
      </div>
 </div>
   </div>
   <div class="col-md-12">
      <div class="row small-text tr-border-bottom py-1 header2" v-for="(churchMem, index) in searchChurchUser" :key="index">
             <div
              class="col-md-4 d-flex justify-content-between align-items-center"
            >
              <span class="py-2 hidden-header">EMAIL</span>
              <span class="py-2 text-xs-left"  v-if=" churchMem.email && churchMem.email.length<10"> <router-link class="route" :to="{path:'/tenant/settings/invitenewuser', query:{ email:churchMem.email } }">{{ churchMem.email}}</router-link></span>
              <el-tooltip v-else :content="`${churchMem.email}`" placement="top">
                <router-link class="route" :to="{path:'/tenant/settings/invitenewuser', query:{ email:churchMem.email } }" >{{ churchMem.email && churchMem.email}} </router-link>
              </el-tooltip>
            </div>
            <div
              class="col-md-4 d-flex justify-content-between align-items-center"
            >
              <span class="py-2 hidden-header">STATUS</span>
              <span class="py-2"><router-link class="route" :to="{path:'/tenant/settings/invitenewuser', query:{ email:churchMem.email } }" >{{churchMem.status}}</router-link></span>
            </div>
            <div
              class="col-md-3 d-flex justify-content-between align-items-center"
            >
              <span class="py-2 hidden-header">ROLES</span>
              <el-tooltip  class="py-2" :content="`${churchMem.roles.join(', ')}`" placement="top" >
                <router-link class="route" :to="{path:'/tenant/settings/invitenewuser', query:{ email:churchMem.email } }" >{{ `${churchMem && churchMem.roles[0] ? churchMem.roles[0].length > 10 ? churchMem.roles[0].substring(0,10)+ ".." : churchMem.roles[0] : ""}` }}</router-link>
              </el-tooltip>
            </div>
            <div
              class="col-sm-12 d-flex col-12 justify-content-sm-end col-md-1 col-lg-1 col-xl-1 d-flex justify-content-end align-items-center"
            >
              <div class="dropdown">
                <i
                  class="fas fa-ellipsis-v cursor-pointer"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                ></i>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a class="dropdown-item">
                    <router-link
                    :to="`/tenant/sms/compose?phone=${churchMem.phone}`"
                      >Send SMS</router-link>
                    </a>
                  <a class="dropdown-item" v-if="churchMem.email">
                    <router-link
                    :to="`/tenant/email/compose?phone=${churchMem.email}`"
                      >Send Email</router-link
                    >
                  </a>
                  <a class="dropdown-item"><router-link :to="{path:'/tenant/settings/invitenewuser', query:{ email:churchMem.email } }"> Edit</router-link></a>
                  <a class="dropdown-item" @click="deletePop(churchMem.email)"> <router-link to="" v-if="churchMem.email !== getCurrentUser.userEmail" > Delete  </router-link></a>
                  <a class="dropdown-item" @click="deactivateChurchUser(churchMem.email, index)"> <router-link to=""> Inactive </router-link></a>
                  <a class="dropdown-item" @click="activateChurchUser(churchMem.email, index)"> <router-link to=""> Active </router-link></a>
                </div>
              </div>
            </div>
          </div>
   </div>
   <div class=" col-12 text-center p-5" v-if="loading">
      <i class="pi pi-spin pi-spinner text-center text-primary" style="fontSize: 3rem"></i>
    </div>

 </div>
    </div>
  </div>
</template>

<script>
import store from '@/store/store';
import { ElMessage, ElMessageBox } from 'element-plus';
import axios from "@/gateway/backendapi";
import finish from "../../services/progressbar/progress";
export default {
  data(){
    return{
      getCurrentUser: {},
      churchProfile: '',
      searchText: '',
      churchUsers: [],
      churchNames: {},
      loading: false,
      searchIsVisible: false
    }
  },

  computed:{

    searchChurchUser(){
      if (this.churchUsers && this.churchUsers.users && this.churchUsers.users.length > 0 && this.searchText == '' ) return this.churchUsers.users;
       this.churchUsers && this.churchUsers.users ? this.churchUsers.users.forEach((i, index) => {
         if (i.email == null) {
           this.churchUsers.users.splice(index,1)
         }
       }) : []
      return this.churchUsers && this.churchUsers.users ? this.churchUsers.users.filter(i => i.email.toLowerCase().includes(this.searchText.toLowerCase())) : []
    }
  },
  methods:{

      toggleSearch (){
       this.searchIsVisible = !this.searchIsVisible;
     },
      removeSearchText (){
        this.searchText = '';
    },
      clearInput (){
        this.searchText = '';
    },

    async churchUser(){
      this.loading = true
      try{
        const { data } = await axios.get('/api/Settings/ChurchUsers')
        this.churchUsers = data;
        console.log(this.churchUsers, 'church users')
        this.loading = false
      }catch(error){
        console.log(error)
      }
    },
    async activateChurchUser(email, index){
      try{
        let response = await axios.post(`/api/Settings/ActivateChurchUser?churchUserEmail=${email}`);
        console.log(response);
         this.churchUsers.users[index].status = "Active";
         ElMessage({
              type: 'success',
              message: 'Status Make Active',
              duration: 5000
            })
      }catch(error){
        finish()
        console.log(error);

      }
    }, 
      async deactivateChurchUser(email, index) {
      try{
         let response = await axios.post(`/api/Settings/DeactivateChurchUser?churchUserEmail=${email}`);
         console.log(response);
        this.churchUsers.users[index].status = "Inactive";
        ElMessage({
              type: 'success',
              message: 'Status Make Inactive',
              duration: 5000
            })

      }catch(error){
        finish()
        console.log(error);

      }
      
    },
     
     async deleteChurchUser(email){
      try {
        await axios.post(`/api/Settings/DeleteChurchUser?churchUserEmail=${email}`);
        this.churchUsers.users = this.churchUsers.users.filter(i => i.email !== email);
        ElMessage({
              type: 'success',
              message: 'Church User Deleted Successfully',
              duration: 5000
            })

      } catch (error){
        finish()
        console.log(error);
      }
    },
     deletePop(email) {
      ElMessageBox.confirm(
        'Are you sure you want to proceed?',
        'Confirm delete',
        {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'error',
        }
      )
      .then(() => {
          this.deleteChurchUser(email)
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: 'Delete canceled',
            duration: 5000
          })
        })
        },
        async currentUser () {
          if(!store.getters.currentUser || !this.getCurrentUser ){
             try{
                const { data } = await axios.get('/api/Membership/GetCurrentSignedInUser')
                this.getCurrentUser = data ;
              }catch(error){
                console.log(error)
              }    
            } else {
                this.getCurrentUser = store.getters.currentUser
                console.log(this.getCurrentUser)
            }
        }

  }, 
  mounted(){
    

  },
  created() {
    if(store.getters.currentUser === new Object()){
     
          this.churchProfile = store.getters.currentUser
          console.log(store.getters.currentUser)
          console.log("current user found");
        }else{
           axios
            .get(`/api/Membership/GetCurrentSignedInUser`)
            .then((response) =>{
                this.churchProfile = response.data;
                console.log(this.churchProfile.churchName);
                 console.log("no current user found");
        })
            .catch((error)=> console.log(error))
          
        }
    this.churchUser()
    this.currentUser()
     
  },
};
</script>

<style scoped>
.route{
  color: black!important;
  text-decoration: none!important;

}

.table {
  width: 100% !important;
  box-shadow: 0px 1px 4px #02172e45;
  border: 1px solid #dde2e6;
  border-radius: 30px;
  text-align: left;
  margin-bottom: auto !important;
}

.route:hover{
  color: #136acd!important;

}
.dropdown a{
  color: black!important;
  text-decoration: none;
}
.dropdown a:hover{
  color: #136acd!important;
}

.table-header-row {
  background: #dde2e6;
  border-top: 1px solid #dde2e6;
  border-radius: 8px 8px 0 0;
}
.header2{
  cursor: pointer;

}

.table-top {
  font-weight: 800;
  font-size: 12px;
  display: flex;
  justify-content: flex-end;
}
.table-top label:hover,
.table-top p:hover {
  cursor: pointer;
}

.header2:hover{
  background-color: #eee;
}
.header1{
  font-size: 14px;
  font-weight: 600;
  box-shadow: 0px 3px 6px #2c282821;
  border-radius: 8px;
}

.hidden-header {
  display: none;
}
.addnew{
  text-decoration: none!important;
}
.addnew:hover{
color: white!important;
}
@media screen and (max-width: 1280px) {
    .small-text {
        font-size: 13px;
    }
/* 
    .link {
        font-size: 14px;
    } */
}

@media screen and (max-width: 767px) {
  .hidden-header {
    display: inline-block;
    font-weight: bold;
  }

  .table-header-row {
    display: none;
  }
}
@media screen and (max-width: 402px) {
  .churchHeader{
  font-size: 20px;
}
  
}

@media screen and (max-width: 1024px) {
  .my-con {
    flex-direction: column;
  }
  .table {
    width: 98%;
    margin: 24px auto;
  }
  .summary {
    width: 98%;
    margin: auto;
  }
}

</style>