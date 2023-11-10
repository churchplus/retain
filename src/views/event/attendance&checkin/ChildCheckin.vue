<template>
  <div class="container-fluid">
    <div class="row my-5">
      <div class="col-md-12">
        <h4 class="font-weight-bold">Child Check-in</h4>
        <p class="small-text">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua
        </p>
      </div>
    </div>

    <div class="row over-con">
      <div class="col-md-12 py-4">
        <div class="row">
          <div class="col-md-8">
            <p class="search-span px-2">
              <i class="pi pi-search p-2" style="height: 30px; width: 30px"></i>
              <input
                type="text"
                class="search-control"
                placeholder="Type name to filter list..."
              />
            </p>
          </div>
          <div class="col-md-4 d-md-flex justify-content-end d-none">
          </div>
        </div>

        <div class="row mt-4 main-th font-weight-700 py-2 grey-rounded-bg">
          <div class="col-md-3">Name</div>
          <div class="col-md-3">Address</div>
          <div class="col-md-2">Phone</div>
          <div class="col-md-2">Check-in</div>
          <div class="col-md-2">Check-out</div>
        </div>

        <div class="row py-2 tb-row small-text">
          <div class="col-md-3">
            <span class="d-flex justify-content-between">
              <span class="hidden-header hide font-weight-700"
                >Name</span
              >
              <span>name</span>
            </span>
          </div>
          <div class="col-md-3">
            <span class="d-flex justify-content-between">
              <span class="hidden-header hide font-weight-700">Address</span>
              <span>address</span>
            </span>
          </div>
          <div class="col-md-2">
            <span class="d-flex justify-content-between">
              <span class="hidden-header hide font-weight-700"
                >Phone Number</span
              >
              <span>09887654434444</span>
            </span>
          </div>
          <div class="col-md-2">
            <span class="d-flex justify-content-between">
              <span class="hidden-header hide font-weight-700"
                >Check-in</span
              >
              <span>
                  <Checkbox id="binary" :binary="true"/>
              </span>
            </span>
          </div>
          
          <div class="col-md-2">
            <span class="d-flex justify-content-between">
              <span class="hidden-header hide font-weight-700"
                >Check-out</span
              >
              <span><Checkbox id="binary" :binary="true"/></span>
            </span>
          </div>
        </div>

        <div class="row py-4">
            <div class="col-md-12 text-center">
                <p class="my-2">No records found</p>
            </div>
            <div class="col-md-12 d-flex justify-content-center mt-4">
                <button class="default-btn primary-bg border-0 text-white">Add member</button>
            </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import { useRoute } from "vue-router";

export default {
    setup() {
        const isKioskMode = ref(true);
        const route = useRoute();

        const enterKioskMode = () => {
            isKioskMode.value = !isKioskMode.value;
            route.query.mode = "kiosk";
        }

        const kioskButtonText = computed(() => {
            return isKioskMode.value ? "Disable" : "Launch";
        })

        return {
            isKioskMode,
            enterKioskMode,
            kioskButtonText,
        }
    }
};
</script>

<style scoped>
* {
  color: #02172e;
  /* font-family: Nunito Sans !important; */
}

.hide {
  display: none !important;
}

@media screen and (max-width: 767px) {
  .main-th {
    display: none;
  }

  .hide {
    display: flex !important;
  }
}

.search-control {
  width: calc(100% - 30px);
  padding: 0.38rem;
  border: none;
  background: transparent;
  outline: transparent;
}

.search-span {
  background: #f5f8f9;
  border-radius: 200px;
  width: 100%;
}

.kiosk-mode {
  background: #dde2e6;
  border-radius: 20px;
  border: transparent;
}

.main-th {
  background: #f5f8f9;
  border: 1px solid #4762f01f;
}

.tb-row {
  border-bottom: 1px solid #4762f01f;
}

.over-con {
  border: 1px solid #4762f01f;
}

.kiosk-th-size {
    font-size: 20px;
}

.kiosk-tb-size {
    font-size: 18px;
}
</style>