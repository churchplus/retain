<template>
  <div class="container-fluid main">
    <div
      class="container-fluid bg-white child col-lg-12 col-sm-6 shadow-sm p-3 mb-5 bg-body rounded"
    >
      <!--  top area -->
      <div class="col-lg-12 p-0 d-flex">
        <div class="col-lg-6 col-sm-3 p-0 text-left font f1">Print Tag</div>

        <div class="col-lg-6 col-sm-3 p-0 text-right">
          <i class="fas fa-times justify-content-end font f1"></i>
        </div>
      </div>
      <hr />
      <!-- end of top area -->

      <!-- church name -->
      <div class="col-lg-12 p-0 d-flex">
        <div class="col-lg-6 col-sm-3 p-0 text-left">
          <p class="font-sm">Church Name</p>
          <h4 class="font">Fountain of Grace</h4>
        </div>

        <div class="col-lg-6 col-sm-3 p-0 text-left">
          <p class="font-sm">Event Name and Date</p>
          <h4 class="font">
            Sunday Service - <small class="font-s">12.22.2021</small>
          </h4>
        </div>
      </div>
      <hr class="mt-2" />
      <!--end of church area -->

      <!-- start of photo area -->
      <div class="col-lg-7 col-sm-4 mx-auto parent">
        <img
          class="img shadow-sm p-1 mb-5 bg-body rounded"
          src="../../../assets/best-Copy.jpg"
          alt="holder picture"
          srcset=""
        />
      </div>
      <div>
        <h4 class="fonts text-center mt">Olayemi Samuel</h4>
        <p class="fontsi text-center mt-n2">Tag No: 11111100</p>
      </div>
      <!-- end of photo area -->

      <!-- qrcode -->
      <div>
        <i class="fas fa-qrcode qrcode d-flex justify-content-end"></i>
      </div>
      <!--end of qrcode -->

      <!--below tag line -->
      <div class="mt-4">
        <p class="fontsii text-center mt-n2">
          Parent Name & Phone No: Mr and Mrs Tejuosho Adesola. 08051175341
        </p>
      </div>
      <hr class="mt-n2" />
      <!--end of below tag line -->

      <!-- button area -->
      <div class="d-flex justify-content-center">
        <button
          class="more-btn font-sm align-items-center mr-2 default-btn border-1 btn-sm"
        >
          Cancel
        </button>
        <button class="check-out-btn font-sm default-btn border-0">
          Confirm Checkout
        </button>
      </div>
      <!--end of  button area -->
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
* {
  font-size: 62.5%;
}

.main {
  width: 100%;
}

.child {
  /* background: rgb(243, 241, 241); */
  background: #ffffff;
  margin: 6rem auto;
  border-radius: 0.8rem;
  position: relative;
  height: 50rem;
}

.font {
  font-size: 12px;
  font-weight: bolder;
  margin-top: -0.5rem;
}

.font-sm {
  font-size: 10px;
  font-weight: 600;
  color: #a6a8aa;
}

.font-s {
  font-size: 8px;
}

.f1 {
  margin-top: 1rem;
  margin-bottom: -2rem;
}

.img {
  width: 100%;
  border-radius: 0.5rem;
}

.fonts {
  font-size: 16px;
  font-weight: 600;
}
.fontsi {
  font-size: 12px;
}
.fontsii {
  font-size: 0.55rem;
}
.mt {
  margin-top: -2.5rem;
}

.qrcode {
  font-size: 3.5rem;
  font-weight: 550;
  margin-top: -2.9rem;
}

.button:hover {
  cursor: pointer;
}

.more-btn {
  /* background: #dde2e6; */
  width: 3rem;
  background: none;
  outline: black;
  color: black;
}

.check-out-btn {
  background: #136acd;
  color: #fff;
}

@media screen and (min-width: 500px) {
  .child {
    background: rgb(255, 251, 251);
    margin: 4rem auto;
    border-radius: 0.8rem;
    position: relative;
    height: 30rem;
    width: 20rem;
  }
}
</style>




