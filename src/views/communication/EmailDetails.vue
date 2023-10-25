<template>
  <article>
    <div class="container">
      
      <div class="main mx-3">
        <div class="row mt-lg-5" v-if="false">
          <div class="col-md-5 ml-md-5 mt-2">
            <h3 class="ml-md-5 lasikText">
              Lasik surgery frequently asked questions
            </h3>
          </div>
          <div class="col-md-4 d-md-flex smview1">
            <div class="d-flex mx-md-3">
              <button class="btn btn1 btn-outline-primary">
                Team
                <i class="fas fa-times icons px-2"></i>
              </button>
            </div>
            <div class="d-flex mx-md-3">
              <button class="btn btn2 btn-outline-primary">
                <i class="fas fa-times icons px-2"></i>
              </button>
            </div>
          </div>
          <div class="col-md-2 d-md-flex mx-md-2 ispa justify-content-end">
            <span
              ><i class="fas fa-long-arrow-alt-right icons mx-md-2"></i
            ></span>
            <span
              ><i class="fas fa-print icons mx-md-2" aria-hidden="true"></i
            ></span>
            <span
              ><i
                class="fas fa-trash icons mx-md-2 mr-md-3"
                aria-hidden="true"
              ></i
            ></span>
          </div>
        </div>

        <!-- Section two -->
        <div class="row">
          <div class="col-md-1"></div>
          <div class="col-md-11 mt-3">
            <h4 class="font-weight-600">{{message ? message.subject : "" }}</h4>
          </div>
        </div>
        <div class="row main2 pt-md-3 mb-4 bg-white rounded" v-if="!loading && message">
          <div class="col-md-1 px-0 img">
            <img src="../../assets/add-member-big.svg" alt="" class="img" />
          </div>
          <div class="col-md-10">
            <div class="name">
              <h4 class="font-weight-700 pl-md-2">{{ message && message.sentByUser ? message.sentByUser : "" }}</h4>
              <p class="nam mb-0 font-weight-600">To Me <i class="pi pi-caret-down to-icon"></i></p>
            </div>
          </div>

          <div class="col-md-12 d-md-flex">
            <div class="row w-100">
              <div class="col-md-1">

              </div>
              <div class="col-lg-8 d-md-flex justify-content-start small-text">
                <p class="">{{ message && message.dateSent ? message.dateSent : "" }}</p>
              </div>
              <div class="col-lg-3">
                <div class="icons d-md-flex justify-content-end">
                  <span><i class="fas fa-star mx-2 icons"></i></span>
                  <span><i class="fas fa-trash mx-2 icons"></i></span>
                  <span><i class="fas fa-ellipsis-v mx-2 icons"></i></span>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div class="row">
          <div class="col-md-1">

          </div>
          <div class="col-md-11" ref="body" style="overflow-x:hidden">
            <!-- <p class="">Hello Madam</p> -->
            <p class="ptext text-justify" style="line-height: 2.5rem;" ref="messageText">
              
            </p>
          </div>
        </div>

        <!-- section three -->
        <div class="row mt-md-3 main2 shadow pt-md-3 mb-5 bg-white rounded" v-if="false">
          <div class="col-md-5 ml-lg-5 img mt-2">
            <span
              ><i
                class="fas fa-long-arrow-alt-left 7x icons1 icons2 icons mx-md-2"
              ></i
              >A</span
            >
          </div>
          <div class="name">
            <h4 class="fw-bold">Molle Houston</h4>
          </div>

          <div class="row d-md-flex flex-md-column mailText mailtex3">
            <p class="mt-md-3 ptext">
              Sure i will get in touch and don't forget to
              <br />
              accept the skype request.
            </p>
            <p class="mt-md-3 ptext">
              Thank you.
              <br />
              <br />
              <span><i class="fas fa-ellipsis-h mx-2 icons"></i></span>
              <br />
              <br />
              Best Regards,
              <br />
              <br />
              Mollie.
            </p>
          </div>

          <button class="btn btnbase btnbase2 btn-outline-primary text-white">
            SEND
          </button>
        </div>

        <!-- <div class="row mt-md-n4 main3 shadow pt-md-3 mb-5 bg-white rounded">
          <div class="col-md-5 ml-lg-5 img mt-2">
           
          </div>
          <div class="name2">
            <h4 class="fw-bold">Molle Houston</h4>
            <p class="nam"></p>
            <p class="nam">
            
            </p>
            <br />
            <br />
            <p class="nam">
              
            </p>
            <p class="nam">Best Regards,</p>
            <p class="nam">Mollie</p>
            
          </div>
        </div> -->
      </div>
    </div>
  </article>
</template>

<script>
import { onMounted, ref } from 'vue';
import composeService from "../../services/communication/composer";
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';


export default {
  setup() {
    const message = ref({ });
    const loading = ref(false);
    const route = useRoute();
    const store = useStore();
    const body = ref(null)
    const messageText = ref(null)

    if (route.params.messageId) {
      loading.value = true;
      message.value = store.getters["communication/getById"](route.params.messageId);
      console.log(message.value, "Details");
    }

    if (route.params.messageId) {
      loading.value = true;
      composeService.getSMSById(route.params.messageId)
        .then(res => {
          loading.value = false;
          message.value = res;
          messageText.value.innerHTML = res.message;
          console.log(res, "on load");
        })
        .catch(err => {
          loading.value = false;
          console.log(err);
        })
    }

    onMounted(() => {
      setTimeout(() => console.log(body.value.innerText, "text"), 5000)
    })

    return {
      message,
      loading,
      body,
      messageText,
    }
  }
};
</script>

<style scoped>
:root {
  --font-color: #02172e;
  --hrule-color: #708eb15c;
  --primary-color: #000000;
  --icons-color: #dde2e6;
}

.to-icon {
  font-size: 10px;
  margin-top: 10px;
  position: absolute;
  color: var(--icons-color);
  padding-left: 2px;
}

.img {
  width: 40px;
  height: 40px;
}

.icons {
  font-size: 14px;
}


</style>
