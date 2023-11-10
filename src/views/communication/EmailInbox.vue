!<template>
  <div>
    <div class="container">
      <!-- Content Box -->
      <main id="main" class="mt-3">
        <div class="container-fluid px-0">
          <div class="row px-0">
            <div class="col-md-12 px-0">
              <div class="row d-md-flex align-items-center mt-3 mb-4">
                <div class="col-md-12 col-sm-12">
                  <div class="search-div">
                    <span><i class="pi pi-search mr-1"></i></span>
                    <input type="text" placeholder="Search here..." />
                    <span class="mx-2"> | </span>
                    <span class="mx-2">Sort By</span>
                    <span class="font-weight-bold"> Newest</span>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-12">
                  <div class="row header-row light-grey-bg py-2">
                    <div class="col-md-12 px-0">
                      <div class="row">
                        <div class="col-md-1 text-md-right text-lg-center px-0">
                          <input type="checkbox" />
                        </div>
                        <div class="col-md-7">
                          <span class="th">MESSAGE</span>
                        </div>
                        <div class="col-md-4">
                          <span class="th">SENT BY</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12">
                      <hr class="hr mt-0" />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12">
                      <div class="row">
                        <div class="col-md-1">
                          <input type="checkbox" />
                        </div>
                        <div class="col-md-7 d-md-flex flex-column">
                          <span
                            class="d-flex justify-content-between msg-n-time"
                          >
                            <span class="font-weight-bold">message</span>
                            <span class="timestamp">Today | 08:45 PM</span>
                          </span>
                          <span class="brief-message"
                            >Lorem ipsum dolor sit amet...</span
                          >
                        </div>
                        <div
                          class="col-md-4 col-ms-12 d-flex justify-content-between"
                        >
                          <span class="hidden-header font-weight-bold"
                            >SENT BY:
                          </span>
                          <span>test@example.com</span>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-12">
                          <hr class="hr" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-12">
                      <div class="row">
                        <div class="col-md-1">
                          <input type="checkbox" />
                        </div>
                        <div class="col-md-7 d-md-flex flex-column">
                          <span
                            class="d-flex justify-content-between msg-n-time"
                          >
                            <span class="font-weight-bold">message</span>
                            <span class="timestamp">Today | 08:45 PM</span>
                          </span>
                          <span class="brief-message"
                            >Lorem ipsum dolor sit amet...</span
                          >
                        </div>
                        <div
                          class="col-md-4 col-ms-12 d-flex justify-content-between"
                        >
                          <span class="hidden-header">message: </span>
                          <span>test@example.com</span>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-12">
                          <hr class="hr" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  
};
</script>

<style scoped>
.search-div {
  width: fit-content;
  padding: 10px;
  background: #f5f8f9;
  border-radius: 200px;
}

.search-div input {
  background: none;
  border: none;
  outline: transparent;
}

.brief-message {
  color: #4762f0;
}

.compose-btn {
  background: #136acd;
  box-shadow: 0px 6px 12px #708eb170;
  border-radius: 22px;
  color: #fff;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.menu-icon {
  font-size: 20px;
}

.units-div {
  border: 1px solid #dde2e6;
  border-radius: 20px;
  padding: 15px 0;
}

.hidden-header {
  display: none;
}

.th {
  font-size: 12px;
  font-weight: 700;
}

.inbox-count {
  background: rgba(19, 106, 205, 0.3);
  padding: 4px 8px;
  border-radius: 22px;
}

.menu-item-con {
  color: #002044;
  opacity: 0.5;
}

.menu-item-con.active {
  background: rgba(19, 106, 205, 0.05);
  border-left: 2px solid #136acd;
  opacity: 1;
}

.buy-btn {
  background: rgb(112, 142, 177, 0.33);
  border-radius: 22px;
}

.btn-text {
  opacity: 1;
  font-size: 11px;
  font-weight: 700;
}

.timestamp {
  font-size: 14px;
  color: #333333;
  opacity: 0.5;
}

.view-btn {
  background: #ebeff4;
  border-radius: 21px;
  padding: 4px 18px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media screen and (max-width: 767px) {
  .hidden-header {
    display: inline-block;
    font-size: 12px;
  }

  .header-row {
    display: none;
  }

  #menu-items {
    flex-direction: row !important;
  }

  .search-div {
    width: 100%;
  }

  .units-div {
    width: 100%;
  }

  .units-container {
    margin-left: 0;
    margin: auto;
  }
}

@media screen and (max-width: 1000px) {
  .msg-n-time {
    flex-direction: column;
    margin-bottom: 8px;
  }
}

@media screen and (min-width: 1000px) {
  #menu-items {
    min-width: 100% !important;
  }
}
</style>