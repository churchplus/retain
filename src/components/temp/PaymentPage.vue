<template>
  <div class="wrapper">
    <div class="container">
        <div class="row">
            <div class="col-md-10 offset-md-1 d-flex justify-content-end mt-3">
                <a class="text-decoration-none text-white c-pointer font-weight-700">Your ccount <span><i class="pi pi-user ml-2"></i></span></a>
            </div>
        </div>
      <div class="row">
        <div class="col-md-6 offset-md-3">
          <div class="row pt-5 d-flex align-items-center mx-auto">
            <div class="col-md-2">
              <div
                style="
                  height: 76px;
                  width: 69px;
                  border-radius: 50%;
                  border: 1px solid;
                "
              ></div>
            </div>
            <div class="col-md-9">
              <h2 class="font-weight-bold text-white">Fountain of Grace Ministry</h2>
            </div>
          </div>

          <div class="row mt-2 mb-4">
            <div class="col-md-12 text-center">
                <p class="spaced-text text-white">
                Give and you will receive - Luke 6:38
                </p>
            </div>
          </div>
        </div>
      </div>

      <div class="row mb-4" id="formArea">
        <div class="col-md-10 offset-md-1 bg-white py-4" style="border-radius: 8px;">
          <form action="">
            <div class="row my-3" v-for="(item, index) in givingTypes" :key="index">
              <div class="col-md-5" :class="{ 'col-md-6': givingTypes.length === 1 }">
                <select name="" id="" class="form-control">
                  <option value="">Option</option>
                  <option value="">Option</option>
                </select>
              </div>
              <div class="col-md-6 mt-2 mt-sm-0">
                <div class="row">
                  <div class="col-3 px-md-0 pr-0">
                    <select name="" id="" class="form-control" style="border-radius: .25rem 0 0 .25rem;">
                      <option value="">#</option>
                      <option value="">#</option>
                    </select>
                  </div>
                  <div class="col-9 pl-0">
                    <input type="text" class="form-control" style="border-radius: 0 0.25rem .25rem 0;"/>
                  </div>
                </div>
              </div>
              <div class="col-md-1 d-flex align-items-center">
                  <i class="pi pi-trash c-pointer" @click="deleteType(index)" v-if="givingTypes.length > 1"></i>
              </div>
            </div>

            <div class="row mt-2 mb-2 tr-border-bottom">
              <div class="col-md-12 mb-3">
                <a class="btn default border" @click.prevent="addGivingType"><span class="mr-2"><i class="pi pi-plus-circle"></i></span> Add more</a>
              </div>
            </div>

            <div class="row mt-2">
              <div class="col-md-12">
                  <table class="table table-bordered text-center my-2" style="box-shadow: none">
                      <tbody>
                          <tr>
                              <td @click="selectPaymentType(false)" class="c-pointer" :class="{ 'bg-dark text-white': !recurring }"><span class="mr-2"><i class="pi pi-dollar"></i></span> Give one time</td>
                              <td @click="selectPaymentType(true)" class="c-pointer" :class="{ 'bg-dark text-white': recurring }"><span><i class="pi pi-replay"></i></span> Set up recurring</td>
                          </tr>
                      </tbody>
                  </table>
              </div>
            </div>

            <div class="row" v-if="recurring">
              <div class="col-md-12">
                <div class="row">
                  <div class="col-md-12">
                    <label for="">Frequency:</label>
                  </div>
                  <div class="col-md-12">
                    <table
                      class="table table-bordered text-center mt-0 mb-2"
                      style="box-shadow: none"
                    >
                      <tbody>
                        <tr>
                          <td v-for="(time, index) in frequencies" :key="index" @click="selectFrequency(index)" class="c-pointer small-text" :class="{ 'bg-dark text-white': index === frequency }">{{ time }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-12">
                    <label for="">Starting</label>
                  </div>
                  <div class="col-md-5">
                    <input type="date" name="" class="form-control" id="" />
                  </div>
                </div>
              </div>
            </div>

            <div class="row mt-3">
              <div class="col-md-6">
                <div class="row">
                  <div class="col-md-12">
                    <label for="">Name:</label>
                  </div>
                  <div class="col-md-12">
                    <input type="text" class="form-control" />
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="row">
                  <div class="col-md-12">
                    <label for="">Phone Number:</label>
                  </div>
                  <div class="col-md-12 pl-md-0">
                    <input type="text" class="form-control" />
                  </div>
                </div>
              </div>
            </div>

            <div class="row mt-3">
              <div class="col-md-12 pl-md-0 d-flex justify-content-center">
                <button class="btn-warning font-weight-bold">Give now</button>
              </div>
            </div>
          </form>
        </div>

        <div class="col-md-10 offset-md-1 mt-3 tr-border-bottom">
            <p class="small-text text-white">
                Churchplus Terms & Conditions and Privacy Policy.
            </p>
            <p class="small-text text-white">
Organization Legal Name: Elevation Church | Address: 11416 E. Independence Blvd., Suite N, MATTHEWS NC 28105            </p>
        </div>

        <div class="col-md-10 offset-md-1 mt-3 mb-5">
            <div
                style="
                  height: 90px;
                  width: 90px;
                  border-radius: 50%;
                  border: 1px solid;
                "
            ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
export default {
    setup() {
        /* 
            recurring: default is false;
        */
        const recurring = ref(false);
        const givingTypes = ref([ {} ])

        const selectPaymentType = (val) => {
            recurring.value = val;
        }

        const frequencies = [ "Every week", "Every 2 weeks", "Every month", "Every 1st & 15th monthly"]
        const frequency = ref(0);
        const selectFrequency = (val) => {
            frequency.value = val;
        }

        const addGivingType = () => {
            givingTypes.value.push({ })
        }

        const deleteType = (index) => {
            givingTypes.value.splice(index, 1);
        }

        return {
            recurring,
            selectPaymentType,
            givingTypes,
            addGivingType,
            frequency,
            frequencies,
            selectFrequency,
            deleteType,
        }

    }
};
</script>

<style scoped>
.wrapper {
  min-height: 100vh;
  background: url("https://www.globallisteningcentre.org/wp-content/uploads/2014/07/section-BG-dark.jpg") no-repeat left top, linear-gradient(#eb01a5, #1a1d26a8);
  /* background: #eb01a5;
  background-image: url("https://www.globallisteningcentre.org/wp-content/uploads/2014/07/section-BG-dark.jpg");
  background-image: url("https://www.globallisteningcentre.org/wp-content/uploads/2014/07/section-BG-dark.jpg"), linear-gradient(#eb01a5, #d13531); */
}

.spaced-text {
  letter-spacing: 3.2px;
}

/* @media screen and (max-width: 1400px) { */
    #formArea {
        max-width: 802px;
        margin: auto;
    }
/* } */

@media screen and (max-width: 1400px) {
    #formArea {
        max-width: 690px;
        margin: auto;
    }
}
</style>