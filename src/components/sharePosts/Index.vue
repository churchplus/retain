<template>
  <div>
    <div class="container">
   <!-- intro area -->
      <div class="row mb-3 mt-5">
        <div class="col-md-6">
          <div class="row">
            <div
              class="col-8 d-flex justify-content-start align-items-center post-type1"
            >
             Share Posts to
            </div>

            <div class="col-4 d-flex justify-content-end align-items-center">
              <i class="far fa-times-circle"></i>
            </div>
          </div>
             <hr />
        </div>
      </div>
      <!--end of intro area -->


      <!-- check box area  type 1-->
      <div class="row mb-3">
        <div class="col-md-6">
          <div class="row">
            <div class="col-2">
              <img
                src="../../assets/allPlatforms.svg"
                style="width: 32px; height: 32px"
                alt="All Platform image"
              />
            </div>

            <div
              class="col-6 d-flex justify-content-start align-items-center post-type1"
            >
              All Platform
            </div>

            <div class="col-4 d-flex justify-content-end align-items-center">
              <div class="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  class="custom-control-input"
                  id="customCheck1"
                />
                <label class="custom-control-label" for="customCheck1"></label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--end check box area type 1-->

      <!-- check box area  type 2-->
      <div class="row mb-3">
        <div class="col-md-6">
          <div class="row">
            <div class="col-2 d-flex align-items-center">
              <i class="pi pifb pi-facebook"></i>
            </div>

            <div
              class="col-4 d-flex justify-content-start align-items-center post-type2"
            >
              Facebook
            </div>

            <div class="col-6 d-flex justify-content-end align-items-center">
              <div class="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  class="custom-control-input"
                  id="customCheck2"
                />
                <label class="custom-control-label" for="customCheck2"></label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--end check box area type 2-->

      <!-- check box area  type 3-->
      <div class="row mb-3">
        <div class="col-md-6">
          <div class="row">
            <div class="col-2 d-flex align-items-center">
              <i class="pi pitwi pi-twitter"></i>
            </div>

            <div
              class="col-4 d-flex justify-content-start align-items-center post-type2"
            >
              Twitter
            </div>

            <div class="col-6 d-flex justify-content-end align-items-center">
              <div class="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  class="custom-control-input"
                  id="customCheck3"
                />
                <label class="custom-control-label" for="customCheck3"></label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--end check box area type 3-->

      <!-- check box area  type 4-->
      <div class="row mb-3">
        <div class="col-md-6">
          <div class="row">
            <div class="col-2 d-flex align-items-center">
              <i class="fa piinsta fa-instagram"></i>
            </div>

            <div
              class="col-4 d-flex justify-content-start align-items-center post-type3"
            >
              Instagram
            </div>

            <div class="col-6 d-flex justify-content-end align-items-center">
              <div class="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  class="custom-control-input"
                  id="customCheck4"
                />
                <label class="custom-control-label" for="customCheck4"></label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--end check box area type 4-->

      <!-- check box area  type 5-->
      <div class="row mb-3">
        <div class="col-md-6">
          <div class="row">
            <div class="col-2 d-flex align-items-center">
              <i class="pitwhatapp fab fa-whatsapp"></i>
            </div>

            <div
              class="col-4 d-flex justify-content-start align-items-center post-type4"
            >
              Whatsapp
            </div>

            <div class="col-6 d-flex justify-content-end align-items-center">
              <div class="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  class="custom-control-input"
                  id="customCheck5"
                />
                <label class="custom-control-label" for="customCheck5"></label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--end check box area type 5-->


      <!-- check box area  type 6-->
      <div class="row mb-3">
        <div class="col-md-6">
          <div class="row">
            <div class="col-2 d-flex align-items-center">
              <img
                src="../../assets/mobileapp.svg"
                style="width: 32px; height: 32px"
                alt="mobileApp"
              />
            </div>

            <div
              class="col-6 d-flex justify-content-start align-items-center post-type5"
            >
            Mobile App
            </div>

            <div class="col-4 d-flex justify-content-end align-items-center">
              <div class="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  class="custom-control-input"
                  id="customCheck6"
                />
                <label class="custom-control-label" for="customCheck6"></label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--end check box area type 6-->

      <!-- Button Area -->
      <div class="row my-5 d-flex justify-content-center">
        <div class="col-4">
 <button class="btn default-btn btn-Area">Connect</button>
        </div>
      </div>
      <!-- Button Area -->
    </div>
  </div>
</template>


<script>
export default {
  setup() {},
};
</script>

<style scoped>
.post-type1 {
  color: #136acd;
  font: normal normal bold 16px/22px Nunito Sans;
}

.post-type2 {
  color: #0f529f;
  font: normal normal bold 16px/22px Nunito Sans;
}

.pifb {
  font-size: 2rem;
  color: #0f529f;
}

.pitwi {
  color: #1a91da;
  font-size: 2rem;
}

.post-type2 {
  color: #1a91da;
  font: normal normal bold 16px/22px Nunito Sans;
}

.piinsta {
  color: #fd0704;
  font-size: 2rem;
}

.post-type3 {
  color: #fd0704;
  font: normal normal bold 16px/22px Nunito Sans;
}

.pitwhatapp {
  color: #2eb743;
  font-size: 2rem;
}

.post-type4 {
  color: #2eb743;
  font: normal normal bold 16px/22px Nunito Sans;
}


.post-type5 {
  color: #E87109;
  font: normal normal bold 16px/22px Nunito Sans;
}

.btn-Area {
  font-size: 0.7rem;
    background-color: #0F529F;
  color: #fff;
  border: none;
  outline: 0;
}
</style>