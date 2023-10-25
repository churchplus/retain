<template>
  <div class="container-fluid">
    <div class="row bordered">
      <div class="col-md-12 pt-3 pt-2 main-post">
        <div class="row">
          <div class="col-md-2 d-md-flex justify-content-center">
            <div class="img-holder bg-secondary"></div>
          </div>
          <div class="col-md-10 d-flex align-items-center">
            <textarea
              name=""
              id=""
              rows="4"
              class="w-100 border-0 textarea"
              placeholder="What's on your mind, Complustech?"
            ></textarea>
          </div>
        </div>
      </div>
      <div class="col-md-12 post-add-ons py-2">
        <div class="row">
          <div class="col-md-1"></div>
          <div class="col-md-11">
            <a class="text-decoration-none px-md-4">
              <span><i class="pi pi-video mr-3"></i></span>
              <span class="text-dark">Video</span>
            </a>
            <a class="text-decoration-none px-md-4">
              <span><i class="pi pi-images mr-3 mobileRes"></i></span>
              <span class="text-dark">Photo/Video</span>
            </a>
            <a class="text-decoration-none px-md-4">
              <span><i class="pi pi-video mr-3 mobileRes"></i></span>
              <span class="text-dark">Feeling/Activity</span>
            </a>
          </div>
        </div>
      </div>
    </div>

    <div class="row">

        <div class="col-md-3 col-sm-4 my-3">
            <div class="row">
                <div class="col-md-11 col-sm-10 mx-auto input-border">
                    <!-- <div class="row">
                        <div class="col-md-3">

                        </div>
                        <div class="col-md-9">
                            <label for="" class="small-text mb-0 label-color font-weight-700">Post type</label>
                        </div>
                    </div> -->
                    <div class="row">
                        <div class="col-md-3 bordered">

                        </div>
                        <div class="col-md-9 px-0" id="post-icon">
                            <Dropdown :options="[ 'Facebook', 2, 3 ]" v-model="selectedDestination" aria-placeholder="Facebook" style="width:100%" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-md-3 col-sm-4 my-3">
            <div class="row">
                <div class="col-md-11 col-sm-10 mx-auto input-border">
                    <!-- <div class="row">
                        <div class="col-md-3">

                        </div>
                        <div class="col-md-9">
                            <label for="" class="small-text mb-0 label-color font-weight-700">Post type</label>
                        </div>
                    </div> -->
                    <div class="row">
                        <div class="col-md-3 bordered">

                        </div>
                        <div class="col-md-9 px-0" id="post-icon">
                            <Dropdown :options="[ 'Facebook', 2, 3 ]" v-model="selectedDestination" aria-placeholder="Facebook" style="width:100%" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-md-3 col-sm-4 my-3">
            <div class="row">
                <div class="col-md-11 col-sm-10 mx-auto input-border">
                    <!-- <div class="row">
                        <div class="col-md-3">

                        </div>
                        <div class="col-md-9">
                            <label for="" class="small-text mb-0 label-color font-weight-700">Post type</label>
                        </div>
                    </div> -->
                    <div class="row">
                        <div class="col-md-3 bordered py-1">

                        </div>
                        <div class="col-md-9 px-0" id="post-icon">
                            <Dropdown :options="[ 'Facebook', 2, 3 ]" placeholder="Facebook" style="width:100%" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-md-3 col-sm-4 my-3">
            <div class="row">
                <div class="col-md-11 col-sm-10 mx-auto d-flex align-items-center">
                    <button class="default-btn primary-bg text-white border-0" style="border-radius: 10px;" @click="facebook">Post</button>
                </div>
            </div>
        </div>

    </div>


    <div class="row my-4">
        <div class="col-md-12 d-flex justify-content-between">
            <a class="text-decoration-none c-pointer px-3 date py-2">Sep 16</a>
            <a class="text-decoration-none c-pointer px-3 date py-2">Sep 16</a>
            <a class="text-decoration-none c-pointer px-3 bg-primary date py-2 active-date">Sep 16</a>
            <a class="text-decoration-none c-pointer px-3 date py-2">Sep 16</a>
            <a class="text-decoration-none c-pointer px-3 date py-2">Sep 16</a>
            <a class="text-decoration-none c-pointer  date ">Sep 16</a>
        </div>
    </div>
  </div>
</template>

<script>
import Dropdown from "primevue/dropdown";
export default {
    components: { Dropdown },
    
    setup() {
        const selectedDestination = "Facebook";

        return {
            selectedDestination,
        }
    }
};
</script>

<style scoped>
.bordered {
  border: 0.20000000298023224px solid #e9eef0;
  border-radius: 15px;
}

.img-holder {
    width: 48px;
    height: 48px;
    border: 1px solid;
    border-radius: 50%;
}

.textarea {
  outline: none;
  margin-top: 10px;
  background: transparent;
}

.post-add-ons {
  background: #f5f6f7;
}

.main-post {
  background: #fbfbfb;
}

.label-color {
  color: #a5a0ab;
}


.input-border {
    border: 0.20000000298023224px solid #e9eef0;
    border-radius: 10px;
}

.date {
    color: #02162c80;
}

.active-date {
    box-shadow: 0px 10px 35px #136ACD38;
    border-radius: 10px;
}
@media (max-width: 751px) {
  .mobileRes {
    margin-left: 1rem!important;
  }
}
</style>