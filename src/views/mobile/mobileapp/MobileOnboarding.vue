<template>
  <div class="wave">
    <div class="container">
      <div class="row d-flex align-items-center containerheight">
        <div class="col-lg-6 col-sm-12">
          <div class="col">
              <!-- track 1 -->
            <div class="row">
              <div class="col-lg-12 fss align-text-main">
                <h2 class="font-weight-bold font-size-small-screen slideInFromLeft mainheader">
                  All in one app to effectively manage your church
                </h2>
              </div>
            </div>
                <!-- end track 1 -->

                <!-- track 2 -->
            <div class="row mt-3 align-text">
              <div class="col-lg-12">
                <h5 class="text-wrap h6 slideInFromLeft2 line-height">
                  Church management with excellence, our mobile app will help manage your church activities, events and increase first timer retention rate with our automation flow by 90% and many more.
            </h5>
              </div>
            </div>
             <!-- end track 2 -->

                <!-- track 3 -->
            <div class="row mt-3 align-text">
              <div class="col-lg-12">
                 <h4 class="slideInFromLeft3">Get started for FREE!</h4>
              </div>
            </div>
             <!-- end track 3 -->

                <!-- track 4 -->
            <div class="row mt-3 align-text">
              <div class="col-lg-12" style="position: absolute; z-index: 90;">
               <router-link :to="{ name: 'OnboardingProcess' }"><button class="btn default-btn cta c-pointer">Start Now</button></router-link>
              </div>
            </div>
             <!-- end track 4 -->


          </div>
        </div>

        <div class="col-lg-6 col-sm-12">
          <div class="col text-center">
            <div class="image mt-3">
              <img
                class="w-100 mt-5"
                src="../../../assets/mobileonboarding/phone1.png"
                alt="phone image"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- wave area -->
      <div class="row">
        <div class="custom-shape-divider-bottom-1620296099">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
              class="shape-fill"
            ></path>
          </svg>
        </div>
      </div>
      <!-- end wave area -->
    </div>
  </div>

  <!-- footer Area -->
  <!-- <div class="container mt-5 footer-area">
    <div class="row">
      <div class="col-12 text-center mt-5 mb-4">
        <h5 class="copyright mb-5">Powered By Churchplus</h5>
      </div>
    </div>
  </div> -->
  <!-- end footer Area -->
</template>

<script>
import { useRoute } from "vue-router"
export default {
  setup () {
    const route = useRoute()
    const getRoute = () => {
      console.log(route.fullPath)
    }
    getRoute()
    return {

    }
  }
}
</script>


<style scoped>
/* Animation Area */
/* @keyframes slideInFromLeft{
  0% {
    transform: translateX(-100%)
  }

  100% {
transform:translateX(0)
  }
}

h2{
  animation: 1s ease-in-out 0s 1 slideInFromLeft;
}

@keyframes slideInFromLeft2{
  0% {
    transform: translateX(-100%)
  }

  100% {
transform:translateX(0)
  }
}

h5{
  animation: 2s ease-in-out 0s 1 slideInFromLeft2;
}
@keyframes slideInFromLeft3{
  0% {
    transform: translateX(-100%)
  }

  100% {
transform:translateX(0)
  }
}

h4{
  animation: 3s ease-in-out 0s 1 slideInFromLeft3;
} */
/* Animation Area */







.copyright {
  color: #020e1c9f;
  font: normal normal 800 18px/36px Nunito Sans;
}

.containerheight {
  height: 80vh;
}
.wave {
    position: relative;
  background: linear-gradient(
45deg
, #ffffff, transparent);
  height: 80vh;
  width: 83vw;
}

.mainheader {
  font: normal normal 800 40px/54px Nunito Sans;
  font-family: Nunito Sans;
   color: #020e1c9f;
}

.subheader {
  font: normal normal normal 20px/36px Nunito Sans;
  font-family: Nunito Sans;
  font-size: 18px;
  /* color: #fff; */
  color: #020e1c9f;
}

.line-height{
  line-height: 1.5rem;
}

.ctatext {
  font: normal normal bold 34px/27px Nunito Sans;
  font-family: Nunito Sans;
  color: #fff;
}

.cta {
  color:#f1faff ;
  background-color: #2e67ce ;
  border: none;
  outline: none;
}

.image {
    position: relative;
  z-index: 1;
}

.custom-shape-divider-bottom-1620296099 {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
}

.custom-shape-divider-bottom-1620296099 svg {
  position: relative;
  display: block;
  width: calc(161% + 1.3px);
  height: 160px;
  transform: rotateY(180deg);
}


.custom-shape-divider-bottom-1620296099 .shape-fill {
  fill: #fff;
}

@media only screen and (max-width: 360px){
.fss{
    margin-top:1.5rem;
}

.mainheader {
  font: normal normal 500 30px/30px Nunito Sans;
  font-family: Nunito Sans;
  color: #fff;
}

.align-text{
    text-align: center;
}

.align-text-main{
    text-align: center;
    font-weight: normal;
}

.footer-area{
  height: 100vh;
}

}


.custom-shape-divider-bottom-1620296099 .shape-fill {
  fill: #fff;
}

@media only screen and (max-width: 576px){
.fss{
    margin-top:3rem;
}

.mainheader {
  font: normal normal 500 30px/30px Nunito Sans;
  font-family: Nunito Sans;
  color: #fff;
}

.align-text{
    text-align: center;
}

.align-text-main{
    text-align: center;
    font-weight: normal;
}

.footer-area{
  height: 100vh;
}

}

@media only screen and (max-width: 992px){
.fss{
    margin-top:3rem;
}

.mainheader {
  font: normal normal 500 30px/30px Nunito Sans;
  font-family: Nunito Sans;
  color: #fff;
}

.align-text{
    text-align: center;
}

.align-text-main{
    text-align: center;
    font-weight: normal;
}

.footer-area{
  height: 100vh;
    position: fixed;
}
}

.main-con {
  margin: 0;
}
</style>


