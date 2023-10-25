!<template>
  <div>
    <div class="container">
      <!-- Content Box -->
      <main id="main" class="mt-3">
        <div class="container-fluid px-0">
          <div class="row px-0">
            <div class="col-md-12 px-0">
              <div class="row d-md-flex align-items-center mt-2 mb-4">
                <div class="col-md-12">
                  <button class="create-btn font-weigth-bold border-0">
                    <span class="mr-2" style="font-size: 22px">+</span> Create
                    new group
                  </button>
                </div>
              </div>

              <div class="row">
                <div class="col-md-12">
                  <div class="row header-row">
                    <div class="col-md-12">
                      <div class="row light-grey-bg py-2">
                        <div class="col-md-1">
                          <input type="checkbox" />
                        </div>
                        <div class="col-md-2">
                          <span class="th">NAME</span>
                        </div>
                        <div class="col-md-5">
                          <span class="th">TOTAL PHONE NUMBER</span>
                        </div>
                        <div class="col-md-3">
                          <span class="th">DATE & TIME CREATED</span>
                        </div>
                        <div class="col-md-1">
                          <span class="th"></span>
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

                        <div class="col-md-2 d-md-flex justify-content-between">
                          <span class="hidden-header">SENDER: </span>
                          <span>message</span>
                        </div>

                        <div
                          class="col-md-5 col-ms-12 d-flex justify-content-between"
                        >
                          <span class="hidden-header font-weight-bold"
                            >MESSAGE:
                          </span>
                          <span>message</span>
                        </div>

                        <div
                          class="col-md-3 col-ms-12 d-flex justify-content-between"
                        >
                          <span class="hidden-header font-weight-bold"
                            >DATE CREATED
                          </span>
                          <span>message</span>
                        </div>

                        <div class="col-md-1 col-ms-12">
                          <span><i class="pi pi-trash delete-icon"></i></span>
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
                        <div class="col-md-2 d-md-flex justify-content-between">
                          <span class="hidden-header">SENDER: </span>
                          <span>message</span>
                        </div>
                        <div
                          class="col-md-5 col-ms-12 d-flex justify-content-between"
                        >
                          <span class="hidden-header">message: </span>
                          <span>message</span>
                        </div>
                        <div
                          class="col-md-3 col-ms-12 d-flex justify-content-between"
                        >
                          <span class="hidden-header">message: </span>
                          <span>message</span>
                        </div>
                        <div class="col-md-1 col-ms-12">
                          <span><i class="pi pi-trash delete-icon"></i></span>
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
export default {};
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

.create-btn {
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