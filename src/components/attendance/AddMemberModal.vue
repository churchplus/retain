<template>
  <div class="container-fluid mt-5">
    <div class="row">
      <div class="col-lg-9 col-md-11">

        <div class="row my-4">
          <div class="col-md-5 text-md-right">
            <label for="" class="font-weight-600">Event</label>
          </div>
          <div class="col-md-6">
            <div class="dropdown">
              <button
                class="default-btn w-100 text-left pr-1"
                type="button"
                style="
                  border-radius: 4px;
                  border: 1px solid #ced4da;
                  color: #6c757d;
                "
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Select from events and activities
                <div class="pi pi-chevron-down manual-dd-icon float-right pr-1"></div>
              </button>
              <div
                class="dropdown-menu w-100"
                aria-labelledby="dropdownMenuButton"
              >
                <div class="row w-100 mx-auto">
                  <div class="col-md-12">
                    <input type="text" class="form-control" placeholder="Find event" />
                  </div>
                </div>
  
                <a class="dropdown-item font-weight-700 small-text" href="#"
                  >Action</a
                >
                <a class="dropdown-item font-weight-700 small-text" href="#"
                  >Another action</a
                >
                <a class="dropdown-item font-weight-700 small-text" href="#"
                  >Something else here</a
                >
                <a class="font-weight-bold small-text d-flex justify-content-center py-2 text-decoration-none primary-text" style="border-top: 1px solid #002044;color: #136ACD;" href="#">
                    <i class="pi pi-plus-circle mr-3"></i>
                  Create new event
                  </a>
              </div>
            </div>

            
          </div>
        </div>
      </div>

      <div class="col-lg-3 col-md-1"></div>
    </div>
  </div>
</template>

<script>
import Dropdown from "primevue/dropdown";
import { ref } from "vue";

export default {
  components: { Dropdown },

  setup() {
    const selectedEVent = ref("");
    return {
      selectedEVent,
    };
  },
};
</script>

<style scoped>
* {
    color: #02172e;
    /* font-family: Nunito Sans !important; */
}
</style>