<template>
  <div class="constainer-fluid">
    <div class="row blue-bg" :class="currentRoute">
      <div class="col-md-12 bg-blue"></div>
    </div>
    <div class="row px-1">
      <div class="col-md-3">
        <div class="row">
          <div class="col-md-12 my-5">
            <h2 class="text-white font-weight-700">Feeds</h2>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12 all-platforms py-3">
            <router-link to="/tenant/social/feed" class="row text-white text-decoration-none">
              <div class="col-md-2">
                <i
                  class="pi pi-microsoft text-white"
                  style="font-size: 1.5rem"
                ></i>
              </div>
              <div class="col-md-10">
                <span class="font-weight-700">All Platforms</span>
              </div>
            </router-link>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12 facebook py-3">
            <router-link to="/tenant/social/feed/facebook" class="row text-white text-decoration-none">
              <div class="col-md-2">
                <i
                  class="pi pi-facebook text-white"
                  style="font-size: 1.5rem"
                ></i>
              </div>
              <div class="col-md-10">
                <span class="font-weight-700">Facebook</span>
              </div>
            </router-link>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12 twitter py-3">
            <router-link to="/tenant/social/feed/twitter" class="row text-white text-decoration-none">
              <div class="col-md-2">
                <i
                  class="pi pi-twitter text-white"
                  style="font-size: 1.5rem"
                ></i>
              </div>
              <div class="col-md-10">
                <span class="font-weight-700">Twitter</span>
              </div>
            </router-link>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12 instagram py-3">
            <router-link to="/tenant/social/feed/instagram" class="row text-white text-decoration">
              <div class="col-md-2">
                <i
                  class="pi pi-instagram text-white"
                  style="font-size: 1.5rem"
                ></i>
              </div>
              <div class="col-md-10">
                <span class="font-weight-700">Instagram</span>
              </div>
            </router-link>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12 whatsapp py-3">
            <router-link to="/tenant/social/feed/whatsapp" class="row text-white text-decoration-none">
              <div class="col-md-2">
                <i
                  class="pi pi-instagram text-white"
                  style="font-size: 1.5rem"
                ></i>
              </div>
              <div class="col-md-10">
                <span class="font-weight-700">Whatsapp</span>
              </div>
            </router-link>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12 mobile py-3">
            <router-link to="/tenant/social/feed/mobile" class="row text-white text-decoration/feed">
              <div class="col-md-2">
                <i
                  class="pi pi-mobile text-white"
                  style="font-size: 1.5rem"
                ></i>
              </div>
              <div class="col-md-10">
                <span class="font-weight-700">Mobile Apps</span>
              </div>
            </router-link>
          </div>
        </div>
      </div>

      <!-- Feed -->
      <div class="col-md-9 col-lg-8 mx-auto py-4">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import social_service from "../../../services/social/social_service";
import membershipService from "../../../services/membership/membershipservice";
import dateFormatter from "../../../services/dates/dateformatter";
import { useRoute } from "vue-router";
import { computed } from '@vue/runtime-core';
// import Skeleton from "primevue/skeleton";

export default {
  // components: { Skeleton },
  setup() {
    const route = useRoute();

    const feed = ref([]);
    const tenantId = ref("");
    const previewLenth = 300;
    membershipService
      .getSignedInUser()
      .then((res) => {
        tenantId.value = res.tenantId;
        getFeed(res.tenantId);
      })
      .catch((err) => console.log(err));

    const loaded = ref(true);
    const getFeed = async (tenantId) => {
      try {
        const response = await social_service.getFeed(tenantId);
        feed.value = response.map(i => {
          i.showFullMessage = false;
          i.briefMessage = i.content.slice(0, previewLenth);
          return i;
        })
        loaded.value = false;
        console.log(feed.value);
      } catch (error) {
        console.log(error);
        loaded.value = false;
      }
    };

    const comment = ref({});
    const postComment = async (e, postId, index) => {
      if (!comment.value.message) return false;
      if (e.keyCode == 13) {
        e.preventDefault();
        try {
          const response = await social_service.postComment({
            postId: postId,
            commentMessage: comment.value.message,
            commenterName: "Church Admin",
          });
          feed.value[index].comments.push(response);
          console.log(feed.value);
          comment.value.message = "";
        } catch (error) {
          console.log(error);
        }
      }
    };

    const formatDate = (date) => {
      return dateFormatter.monthDayTime(date);
    };

    const currentRoute = computed(() => {
      if (route.path.includes("facebook")) return 'facebook-bg';
      if (route.path.includes("twitter")) return 'twitter-bg';
      if (route.path.includes("instagram")) return 'instagram-bg';
      if (route.path.includes("whatsapp")) return 'whatsapp-bg';
      return 'blue-bg';
    })

    return {
      feed,
      postComment,
      comment,
      formatDate,
      loaded,
      previewLenth,
      currentRoute,
    };
  },
};
</script>

<style scoped>
.blue-bg {
  height: 500px;
  position: absolute;
  background: #136acd;
  /* background: #0f529f; */
  width: 100%;
}

/* .bg-blue {
  background: #0f529f;
} */

.blue-bg:before {
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  width: 100%;
  height: 70%;
  content: "";
  background-color: red;
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
  border-radius: 0 0 10px 10px;
}

/* .main-post {
        background: #fbfbfb;
    } */

.bordered {
  border: 0.20000000298023224px solid #e9eef0;
  border-radius: 15px;
  background: #fff;
}

.post-action-link {
  color: #4b5257cc;
}

.small-border-radius {
  border-radius: 10px;
}

.medium-border-radius {
  border-radius: 15px;
}

.comment-field {
  width: calc(100% - 60px);
}

.all-platforms {
  background: #136acd;
}

.facebook {
  background: #0f529f;
}

.twitter {
  background: #1a91da;
}

.instagram {
  background: transparent
    linear-gradient(81deg, #e90263 0%, #fd0604 49%, #ff5d00 100%) 0% 0%
    no-repeat padding-box;
}

.whatsapp {
  background: transparent linear-gradient(256deg, #48c658 0%, #2ab540 100%) 0%
    0% no-repeat padding-box;
}

.mobile {
  background: #e87109 0% 0% no-repeat padding-box;
}

.whatsapp-bg {
  background: #2ab540;
}

.facebook-bg {
  background: #0f529f;
}

.twitter-bg {
  background: #1a91da;
}

.mobile-bg {
  background: #e87109;
}

.instagram-bg {
  background: #fd0604;
}

@media screen and (min-width: 768px) {
  .b-right {
    border-right: 0.20000000298023224px solid #e9eef0;
  }
}
</style>