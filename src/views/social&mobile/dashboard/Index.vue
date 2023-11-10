<template>
  <div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12   align-items-center d-flex justify-content-center" style="height: 50vh;">
          <div class="empty-img  text-center " >
            <p><img src="../../../assets/people/people-empty.svg" alt="" /></p>
            <h4 class="tip text-secondary font-weight-bold ">Social Media Intergration is coming soon </h4>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="container">
      <div class="row">
        <div
          class="mt-5 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 text-sm-center"
        >
          <h1 class="header1">Overview</h1>
        </div>
        <div class="mt-5 col-lg-6 col-md-6 col-sm-12">
          <div class="text-sm-center text-center">
            <span class="">
              <button class="btn btn-outline-none">
                <i class="pi pi-search mr-3"></i>
              </button>
            </span>
            <input type="text" placeholder="search" class="border-none" />
            <hr />
          </div>
        </div>
      </div>
      <div
        class="row d-lg-flex justify-content-lg-between d-md-flex justify-content-md-around mt-5"
      >
        <div
          class="col-lg-2 col-md-5 mb-md-4 mb-sm-4 mb-xl-0 mb-lg-0 mb-4 box1"
        >
          <div class="row mt-3 mb-5">
            <div class="col-md-6 text-sm-center text-center">
              <span>
                <img src="../../../assets/social/facebook.svg" alt="" />
              </span>
            </div>
            <div class="col-md-6 per text-sm-center text-center">+0%</div>
          </div>
          <div class="row mt-5">
            <div class="col-md-12 text-lg-center text-sm-center text-center">
              <h2 class=""></h2>
            </div>
          </div>
          <div class="row mb-4">
            <div class="col-md-6 text-sm-center text-center">
              <div>Followers</div>
            </div>
            <div class="col-md-6"></div>
          </div>
        </div>
        <div
          class="col-lg-2 col-md-5 box1 mb-md-4 mb-sm-4 mb-xl-0 mb-lg-0 mb-4"
        >
          <div class="row mt-3 mb-5">
            <div class="col-md-6 text-sm-center text-center">
              <span>
                <img src="../../../assets/social/instagram.svg" alt="" />
              </span>
            </div>
            <div class="col-md-6 per text-sm-center text-center">+0%</div>
          </div>
          <div class="row mt-5">
            <div class="col-md-12 text-lg-center text-sm-center text-center">
              <h2 class=""></h2>
            </div>
          </div>
          <div class="row mb-4">
            <div class="col-md-6 text-sm-center text-center">
              <div>Followers</div>
            </div>
            <div class="col-md-6"></div>
          </div>
        </div>
        <div class="col-lg-2 col-md-5 box1 mb-sm-4 mb-xl-0 mb-lg-0 mb-4">
          <div class="row mt-3 mb-5">
            <div class="col-md-6 text-sm-center text-center">
              <span>
                <img src="../../../assets/social/twitter.svg" alt="" />
              </span>
            </div>
            <div class="col-md-6 per text-sm-center text-center">+0%</div>
          </div>
          <div class="row mt-5">
            <div class="col-md-12 text-lg-center text-sm-center text-center">
              <h2 class=""></h2>
            </div>
          </div>
          <div class="row mb-4">
            <div class="col-md-6 text-sm-center text-center">
              <div>Followers</div>
            </div>
            <div class="col-md-6"></div>
          </div>
        </div>
        <div class="col-lg-2 col-md-5 box1 mb-sm-4 mb-xl-0 mb-lg-0 mb-4">
          <div class="row mt-3 mb-5">
            <div class="col-md-6 text-sm-center text-center">
              <span>
                <img src="../../../assets/social/whatsapp.svg" alt="" />
              </span>
            </div>
            <div class="col-md-6 per text-sm-center text-center">+0%</div>
          </div>
          <div class="row mt-5">
            <div class="col-md-12 text-lg-center text-sm-center text-center">
              <h2 class=""></h2>
            </div>
          </div>
          <div class="row mb-4">
            <div class="col-md-6 text-sm-center text-center">
              <div>Followers</div>
            </div>
            <div class="col-md-6"></div>
          </div>
        </div>
      </div>
      <div class="row mt-5">
        <div class="col-lg-3 col-md-3">
          <h2 class="range">Range Stats</h2>
        </div>
        <div
          class="col-lg-5 col-md-8 time1 text-lg-center text-sm-center text-center"
        >
          <span>
            <input
              placeholder="7/26/2020"
              v-model="eventDate"
              type="date"
              class="border-0 calendar1"
              required
            /> </span
          >-
          <span>
            <input
              placeholder=""
              v-model="eventDate"
              type="date"
              class="border-0 calendar1"
              required
            />
          </span>
        </div>
        <div class="col-lg-4 col-md-1"></div>
      </div>
      <div class="row mt-4">
        <div class="col-md-8">
          <Button
            label="Likes"
            badge="0"
            icon="pi pi-check"
            iconPos="right"
            class="p-button-raised p-button-rounded mt-5 mb-5"
          />
          <Chart type="bar" :data="multiAxisData" :options="multiAxisOptions" />
        </div>
        <div class="col-md-4 post mt-sm-5 mt-5">
          <div class="row">
            <div class="col-lg-6 col-md-5 text-sm-center p-3">
              <h5 class="las">Latest post</h5>
            </div>
            <div class="col-lg-6 col-md-5 p-3 text-sm-center">

              <i class="pi pi-calendar-plus text-light mt-2"></i>
              <span class="text-light"> 07/26/2020</span>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <img
                src="../../../assets/social/latestImage.png"
                class="w-100"
                alt=""
              />
            </div>
          </div>
          <div class="row mt-2">
            <div class="col-md-12">
              <p class="para1">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua. At vero eos et accusam et
                justo duo dolores et ea
              </p>
            </div>
          </div>
          <div
            class="row d-lg-flex d-md-flex d-flex justify-content-between justify-content-md-between justify-content-lg-around"
          >
            <div class="col-lg-3 col-md-3 col-sm-3 col-3">
              <div class="row">
                <div class="col-md-2 text-sm-center">
                  <span><i class="pi pi-comments text-light"></i></span>
                </div>
                <div class="col-md-2 text-sm-center">
                  <h5 class="num4">0</h5>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-3 col-3">
              <div class="row">
                <div class="row">
                  <div class="col-md-2 text-sm-center">
                    <span><i class="pi pi-heart text-light"></i></span>
                  </div>
                  <div class="col-md-2 text-sm-center">
                    <h5 class="num4">0</h5>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-3 col-3">
              <div class="row">
                <div class="col-md-2 text-sm-center">
                  <span><i class="pi pi-share-alt text-light"></i></span>
                </div>
                <div class="col-md-2 text-sm-center">
                  <h5 class="num4">0</h5>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-0 col-sm-0 col-0">
              <div class="row">
                <div class="col-md-2">
                </div>
                <div class="col-md-2">
                </div>
              </div>
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-md-12">
              <router-link to="">
                <h1 class="header3 text-center">
                  See all posts...
                </h1></router-link
              >
            </div>
          </div>
        </div>
      </div>
      <div class="row d-flex justify-content-between mt-5 mb-5">
        <div
          class="col-md-3 like px-4 py-4 mb-sm-4 mb-lg-0 mb-md-0 mb-xl-0 mb-4"
        >
          <div class="row">
            <div class="col-lg-4 col-md-12 text-sm-center text-center">
              <button class="btn btn-outline-none">
                <span><i class="pi pi-heart"></i></span>
              </button>
            </div>
            <div class="col-lg-7 col-md-12 mt-2 text-sm-center text-center">
              <h3 class="tot">Total likes</h3>
            </div>
            <div
              class="col-md-12 text-lg-center num mt-3 text-sm-center text-center"
            >
              <h3></h3>
            </div>
          </div>
        </div>
        <div
          class="col-md-3 like px-4 py-4 mb-sm-4 mb-lg-0 mb-md-0 mb-xl-0 mb-4"
        >
          <div class="row">
            <div class="col-lg-4 col-md-12 text-sm-center text-center">
              <button class="btn btn-primary">
                <span><i class="pi pi-share-alt"></i></span>
              </button>
            </div>
            <div class="col-lg-8 col-md-12 mt-2 text-sm-center text-center">
              <h3 class="tot">Total likes</h3>
            </div>
            <div
              class="col-md-12 text-lg-center num mt-3 text-sm-center text-center"
            >
              <h3></h3>
            </div>
          </div>
        </div>
        <div class="col-md-3 like px-4 py-4">
          <div class="row">
            <div class="col-lg-4 col-md-12 text-sm-center text-center">
              <button class="btn btn-success">
                <span><i class="pi pi-comments"></i></span>
              </button>
            </div>
            <div class="col-lg-8 col-md-12 mt-2 text-sm-center text-center">
              <h3 class="tot">Total likes</h3>
            </div>
            <div
              class="col-md-12 text-lg-center num mt-3 text-sm-center text-center"
            >
              <h3></h3>
            </div>
          </div>
        </div>
      </div>
    </div> -->

  </div>
</template>

<script>
export default {
  components: {
  },

  data() {
    return {
      eventDate: new Date().toISOString().substr(0, 10),
      multiAxisData: {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        datasets: [
          {
            label: "100%",
            backgroundColor: [
              "#CCD0D4",
              "#CCD0D4",
              "#CCD0D4",
              "#CCD0D4",
              "#CCD0D4",
              "#CCD0D4",
              "#CCD0D4",
              "#CCD0D4",
              "#CCD0D4",
              "#CCD0D4",
              "#CCD0D4",
              "#CCD0D4",
            ],
            yAxisID: "y-axis-1",
            data: [65, 59, 80, 81, 100, 55, 10, 30, 40, 50, 39, 70],
          },
          // {
          // 	label: 'Dataset 2',
          // 	backgroundColor: '#78909C',
          // 	yAxisID: 'y-axis-2',
          // 	data: [28, 48, 40, 19, 86, 27, 90, 10, 30,40,50,39,70]
          // }
        ],
      },
      multiAxisOptions: {
        responsive: true,
        tooltips: {
          mode: "index",
          intersect: true,
        },
        scales: {
          yAxes: [
            {
              type: "linear",
              display: false,
              position: "left",
              id: "y-axis-1",
              ticks: {
                min: 0,
                max: 100,
              },
            },
            {
              type: "linear",
              display: false,
              position: "right",
              id: "y-axis-2",
              gridLines: {
                drawOnChartArea: false,
              },
              ticks: {
                min: 0,
                max: 100,
              },
            },
          ],
        },
      },
      facebook : '',
      instagram : '',
      twitter : '',
      whatsapp : '',
      like : '',
    };
  },
};
</script>

<style scoped>
.header1 {
  text-align: left;
  font: normal normal bold 34px/46px Nunito Sans;
  letter-spacing: 0px;
  color: #02172e;
  opacity: 1;
}
/* .empty-img {
  width: 30%;
  min-width: 397px;
  margin: auto;
} */

.empty-img img {
  width: 100%;
  max-width: 200px;
}
.box1 {
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 1px solid #708eb152;
  border-radius: 15px;
  opacity: 1;
}
.per {
  font: normal normal bold 14px/19px Nunito Sans;
  letter-spacing: 0px;
  color: #50ab00;
  opacity: 1;
}
.range {
  font: normal normal bold 22px/30px Nunito Sans;
  letter-spacing: 0px;
  color: #02172e;
  opacity: 1;
}
.post {
  width: 100%;
  height: auto;
  background: #1369cd 0% 0% no-repeat padding-box;
  border-radius: 10px;
  opacity: 1;
}
.like {
  background: #f8f8fa 0% 0% no-repeat padding-box;
  border-radius: 10px;
  opacity: 1;
}
.num {
  font: normal normal bold 38px/51px Nunito Sans;
  letter-spacing: 0px;
  color: #020f1e;
  opacity: 1;
}
.tot {
  font: normal normal 800 16px/22px Nunito Sans;
  letter-spacing: 0px;
  color: #020f1e;
  opacity: 0.6;
}
.las {
  font: normal normal bold 20px/32px Nunito Sans;
  letter-spacing: 0px;
  color: #ffffff;
  opacity: 1;
}
.para1 {
  font: normal normal normal 12px/16px Nunito Sans;
  letter-spacing: 0px;
  color: #fefeff;
  opacity: 1;
}
.header3 {
  text-decoration: underline;
  font: normal normal bold 12px/16px Nunito Sans;
  letter-spacing: 0px;
  color: #fefeff;
  opacity: 1;
}
.num4 {
  font: normal normal normal 12px/16px Nunito Sans;
  letter-spacing: 0px;
  color: #fefeff;
  opacity: 1;
}
.calendar1 {
  background-color: #f7f7f9 !important;
  /* color: white!important; */
}
.time1 {
  background: #f7f7f9 0% 0% no-repeat padding-box;
  border-radius: 29px;
  opacity: 1;
  padding-top: 10px;
  padding-left: 5px;
  padding-right: 0px;
  padding-bottom: 5px;
}
</style>