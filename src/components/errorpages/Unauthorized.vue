<template>
    <div class="container justify-content-center">
    <div class="row">

      <div class="col-md-12">
        <h1><i class="pi pi-key font-weight-bold"  style="font-size: 70px;" aria-hidden="true"></i> 401</h1>
        <h3>No Authorization Found!</h3>
        <div>This page is not publicly available</div>
        <div>For more info: Contact the administrator of your church.</div>
        
          <!-- <form action="#" method="post">
            <input type="text" placeholder="Search..." name="search">
            <button type="submit"><i class="pi pi-search" aria-hidden="true"></i></button>
          </form> -->
         

        <p style="margin-top: 20px">If you think you have arrived here by our mistake, please <a href="https://wa.me/+2348023739961" class="text-decoration-none" >contact us</a></p>
      </div>
      <!-- <div class="col-md-4 d-none d-md-block">
            <img src="../../assets/expired-sub.png" />
          </div> -->
      <div class="col-md-6"><button class="btn primary-bg default-btn border-0 text-white mt-4 "  @click.prevent="goBack">Go Back</button></div>
        <div class="col-md-6 text-right " > <button class="default-btn btn text-dark c-pointer hovar font-weight-bold  text-center  mt-4" @click="logout">Logout</button> </div>
        <div class="row d-flex justify-content-end w-100 mt-5">
          <div class="text-center">
            <div class="chat">Chat with us</div>
            <a class="mt-2" href="https://wa.me/+2348023739961"><img src="../../assets/WhatsApp.svg" style="width: 70px"/></a>
          </div>
        </div>

    </div>
  </div>
</template>

<script>
// import { useRoute } from "vue-router"
import router from "../../router/index"
import store from "@/store/store";
import setupService from '../../services/setup/setupservice';
export default {
    setup () {
        // const router = useRoute()

        const goBack = () => {
          router.push('/tenant')
            // router.go(-1)
        }
        const logout = () => {
        localStorage.clear()
        router.push('/')
        store.dispatch('clearCurrentUser', {})
        setupService.clearStore();
    }

        return {
            goBack,
            logout
        }
    }
}
</script>

<style scoped>
/* Base */
html, body {
  margin: 0;
  padding: 0;
  font-family: 'Ubuntu', sans-serif;
  line-height: 18px;
  color: #707070;
  background: url(../../assets/bg.jpg) no-repeat 50%;
  background-size: cover;
  background-attachment: fixed;
  text-align: center; }


.chat {
    font-weight: 600;
    font-size: 1.2em;
    color: #e9a063;
  }

.container {
  margin-top: 8%; }

a {
  color: #3498db; }

a:hover {
  color: #3498db;
  text-decoration: underline; }

h1 {
  color: #3498db;
  font-size: 100px; }

h2 {
  font-size: 35px; }

h3 {
  margin-top: 50px !important; }

p {
  font-size: 18px; }

form {
  margin: 50px 0; }

input[type="text"] {
  width: 50%;
  border: 1px solid #e8e8e8;
  padding: 10px;
  color: #858585;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  -ms-border-radius: 5px;
  border-radius: 5px; }

button[type="submit"] {
  background: none;
  border: none;
  color: #3498db;
  margin-left: -40px;
  font-size: 20px; }

.social-networks a {
  display: inline-block;
  font-size: 18px;
  margin: 5px; }

footer {
  font-size: 14px; }

  .btn-primary {
      background: #3498db;
      color: #eee;
  }

/* Modules */
/* Layouts */

/*# sourceMappingURL=style.css.map */

</style>