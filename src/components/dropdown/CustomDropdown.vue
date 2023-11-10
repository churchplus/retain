<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12">
        <div class="row">
          <div class="input-field col-md-12 pl-md-0">
            <i class="pi pi-chevron-down manual-dd-icon"></i>
            <input
              type="text"
              class="input dd w-100"
              placeholder=""
              @click="selectEventAttended"
            />

            <div class="input-field manual-dd-con col-md-12" v-if="showEventList">
            <div class="manual-dd dd">
              <div class="container-fluid dd dd-search-con">
                <div class="row dd">
                  <div class="col-md-12 py-1">
                    <input
                      type="text"
                      class="form-control dd dd-search-field"
                      v-model="eventsSearchString"
                      placeholder="search for event"
                    />
                  </div>
                </div>
              </div>

              <div class="container-fluid dd-list-con">
                <div class="row">
                  <div class="col-md-12" style="max-width:100px;overflow:scroll">
                    <p>Hello</p>
                    <p>Hello</p>
                    <p>Hello</p>
                    <p>Hello</p>
                    <p>Hello</p>
                    <p>Hello</p>
                    <!-- <p
              class="px-1 manual-dd-item mb-0 py-2 dd"
              v-for="(event, index) in filteredEvents"
              :key="index"
              @click="eventAttendedSelected(event)"
            >
              {{ event.name }}
            </p>
            <p
              class="text-center mb-1 mt-1"
              v-if="
                eventsSearchString &&
                eventsAttended.length > 0 &&
                filteredEvents.length === 0
              "
            >
              No match found
            </p> -->
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12 py-2 px-0">
                    <hr class="hr" />
                  </div>
                  <div class="col-md-12 create-event py-2 text-center">
                    <a
                      class="craete-event-btn font-weight-bold"
                      data-toggle="modal"
                      data-target="#eventModal"
                      @click="() => (display = !display)"
                      >Create new event</a
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    const showEventList = ref(false);
    const selectEventAttended = () => {
      showEventList.value = !showEventList.value;
    };

    const display = ref(false);

    return {
      showEventList,
      selectEventAttended,
      display,
    };
  },
};
</script>

<style scoped>
.manual-dd-con {
  position: relative;
}

.manual-dd {
  width: 330px;
  border: 1px solid #b9c5cf;
  position: absolute;
  background: white;
  z-index: 2;
  top: -13px;
  margin-right: 0.5rem;
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14),
    0 1px 10px 0 rgba(0, 0, 0, 0.12);
  max-height: 400px;
  overflow: auto;
}

.manual-dd::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.manual-dd {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.manual-dd-item {
  color: #495057;
}

.manual-dd-item:hover {
  background: #e9ecef;
  cursor: pointer;
}

.dd-search-field {
  border-radius: 20px;
}

.create-event a {
  color: #136acd !important;
  text-decoration: none;
}

.create-event a:hover {
  cursor: pointer;
  padding: 8px;
}

.manual-dd-icon {
  position: absolute;
  margin-right: 1rem;
}

.dd-search-con {
  max-height: 40px;
}

.dd-list-con {
  max-height: 360px;
  overflow: auto;
}
</style>