<template>
<div class="container container-top">
        <div class="row">
          <div class=" col-12 page-header">Group Management</div>
        </div>
        <div class="row mt-3">
            <div class="col-12">Welcome👋, As a group leader, here are things you can do</div>
          </div>
        <div class="row mt-5">
          <div class="d-flex justify-content-around flex-column flex-md-row align-items-center w-100">
            <router-link to="/tenant/peoplegroups">
              <div class="boxes border font-weight-700 mt-3 mt-md-0 bor-radius"><i class="pi pi-list text-center pi-icons mr-3"></i>View Groups</div>
            </router-link>
            <router-link to="/tenant/groupleaderattendance">
            <div class="boxes border font-weight-700 mt-3 mt-md-0 bor-radius"><i class="pi pi-check text-center pi-icons mr-3"></i>Report & Attendance</div>
            </router-link>
          </div>
          <div class="d-flex justify-content-around flex-column flex-md-row align-items-center w-100 mt-md-4">
            <router-link to="/tenant/peoplegroups?actionType=sendsms">
            <div class="boxes border font-weight-700 mt-3 mt-md-0 bor-radius"><i class="pi pi-comment text-center pi-icons mr-3"></i>Send SMS</div>
            </router-link>
            <router-link to="/tenant/peoplegroups?actionType=sendemail">
            <div class="boxes border font-weight-700 mt-3 mt-md-0 bor-radius"><i class="pi pi-envelope text-center pi-icons mr-3"></i>Send Email</div>
            </router-link>
          </div>
          <!-- <div class="col-12 col-md-6 boxes">Groups</div>
          <div class="col-12 col-md-6 boxes">Mark Attendance</div>
          <div class="col-12 col-md-6 boxes">Send SMS</div>
          <div class="col-12 col-md-6 boxes">Send Email</div> -->
        </div>
    </div>
</template>

<script>
</script>

<style>
.page-header {
    font: normal normal 800 29px Nunito sans;
}

.boxes {
    width: 300px;
    box-shadow: 0px 3px 6px #2c28281c;
    border: 1px solid #00204424;
    padding: 50px;
    color: #136acd;
}

.pi-icons {
  background: #f1f5f8;
  width: 25px;
  border-radius: 50%;
  padding: 3px;
}

.bor-radius {
  border-radius: 25px
}
</style>