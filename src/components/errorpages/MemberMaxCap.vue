<template>
    <div class="container">
      <div class="row d-flex justify-content-center d-block d-md-none">
        <div class="col-12">
          <img src="../../assets/expired-sub.png" class="w-100"/>
        </div>
      </div>
    <div class="row" d-md-flex justify-content-md-between>
      <div class="col-12 d-flex justify-content-center mb-3">
        <img src="https://retain.dochase.co/logo.png" class="link-image" />
        <!-- <img src="../../assets/dashboardlinks/churchcloud.png" class="link-image" /> -->
      </div>
      <div class="col-md-8 mb-md-5"><h2 class="font-weight-700">Member Capacity Exceeded</h2></div>
      <div class="col-md-4 mb-md-5 mt-2 mb-3 d-md-flex justify-content-md-end text-primary text-center" ><router-link to="/subexpired" class="text-decoration-none default-btn primary-bg text-white border-0">Click here to Subscibe</router-link></div>  
      <div class="col-md-8">
        <div class="mb-3">Sorry, you have reached you membership capacity limit, you'll have to upgrage to continue using the software.</div>
        <div class="mt-md-2">
          <div>Things you can still do:</div>
          <ul class="list-unstyled mt-3">
            <li> <i class="pi pi-arrow-right text-primary mr-2 "></i><router-link class="text-primary" to="/subexpired">Subscribe</router-link></li>
            <li> <i class="pi pi-arrow-right text-primary mr-2"></i><router-link class="text-primary" to="/sendsmsexpired">Send SMS</router-link></li>
            <li> <i class="pi pi-arrow-right text-primary mr-2 "></i><router-link to="/buyunitsexpired" class="text-primary">Buy Unit</router-link></li>
            <!-- <a href="" @click.prevent="plsSubscribe">Subscribe</a> -->
          </ul>
        </div>
        <div class="mt-4">For more info: Contact the administrator of your church.</div>
        <div class="default-btn text-dark c-pointer text-center col-2 mt-4" @click="logout">Logout</div>
        <!-- <div>If you think you have arrived here by our mistake, please <a href="#" class="text-decoration-none">contact us</a></div> -->
        
      </div>
      <div class="col-md-4 d-none d-md-block">
        <img src="../../assets/expired-sub.png" class="w-100" />
      </div>
    </div>
    <div class="row d-flex justify-content-sm-end">
      <div class="text-center">
        <div class="chat">Chat with us</div>
        <a class="mt-2" href="https://wa.me/+2348023739961"><img src="../../assets/WhatsApp.svg" style="width: 70px"/></a>
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

        // const plsSubscribe = () => {
        //     router.push('/tenant/subscription')
        // }
      const logout = () => {
        localStorage.clear()
        router.push('/')
        store.dispatch('clearCurrentUser', {})
        setupService.clearStore();
    }

        return {
            // plsSubscribe,
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

.container {
  margin-top: 3%;
  font-size: 20px ;
  color: #707070;}

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

  .chat {
    font-weight: 600;
    font-size: 1.2em;
    color: #e9a063;
  }

  .link-image {
    width: 300px
  }

/* Modules */
/* Layouts */

/*# sourceMappingURL=style.css.map */

</style>