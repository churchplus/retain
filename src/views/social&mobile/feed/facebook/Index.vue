<template>
  <div class="constainer-fluid">
    <div class="row">
      <div class="col-md-12"></div>
    </div>
    <div class="row px-1">
      <!-- Feed -->
      <div class="col-md-12 mx-auto py-4">
        <div class="row bordered">
          <div class="col-md-12 pt-3 pt-2 main-post">
            <div class="row">
              <div class="col-2 d-md-flex justify-content-center">
                <img :src="churchData.logoUrl" alt="Uploaded Image" class="img-holder bg-secondary"/>
              </div>
              
              <div class="col-10 pl-md-0 d-flex align-items-center">
                <textarea
                  name=""
                  id=""
                  rows="4"
                  class="w-100 border-0 textarea"
                  :value= "churchData.churchName"
                >
                </textarea>
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
                  <span><i class="pi pi-images mr-3"></i></span>
                  <span class="text-dark">Photo/Video</span>
                </a>
                <!-- <a class="text-decoration-none px-md-4">
                  <span><i class="pi pi-video mr-3"></i></span>
                  <span class="text-dark">Feeling/Activity</span>
                </a> -->
              </div>
            </div>
          </div>
        </div>

        <div
          class="row bordered my-5"
          v-for="(post, index) in feed"
          :key="index"
        >
          <div class="col-md-12 py-3">
            <!-- User details -->
            <div class="row">
              <div class="col-2 d-md-flex justify-content-center">
                <div class="img-holder bg-secondary">
                    <!-- <img :src="post.posterDetails.posterImageUrl" alt="User Image" style="height:40px;width:100%"> -->
                </div>
              </div>
              <div class="col-10 pl-md-0">
                <p
                  class="mb-0 font-weight-700 mb-n2 d-flex justify-content-between"
                >
                  <!-- <span>{{ post.posterDetails.posterName }}</span> -->
                  <span><i class="pi pi-ellipsis-h c-pointer"></i></span>
                </p>
                <small class="mb-0">{{ formatDate(post.created_time) }}</small>
              </div>
            </div>

            <!-- Post message -->
            <div class="row">
              <div class="col-md-12 pt-3">
                <h5 class="font-weight-bold mb-0">
                  <!-- {{ post.postCategoryName }} -->
                </h5>
                <p class="mb-0 text-justify">
                  <span>{{ post.message }}</span>
                   <!-- v-if="post.showFullMessage || post.content.length < previewLenth" -->
                  <!-- <span v-else>{{ post.briefMessage }}...</span> -->
                  <!-- <span v-if="post.content.length > previewLenth" class="font-weight-700 primary-text c-pointer ml-3" @click="() => post.showFullMessage = !post.showFullMessage">{{ post.showFullMessage ? 'See less' : 'See more' }}</span> -->
                  </p>
              </div>
            </div>

            <!-- Post media -->
            <!-- <div class="row">
              <div class="col-md-12">
                <img
                  v-if="post.type === 'Picture'"
                  :src="post.mediaUrl"
                  class="w-100"
                  alt=""
                />
                <video
                  v-if="post.type === 'Video'"
                  style="width: 100%"
                  height="240"
                  controls
                >
                  <source :src="post.mediaUrl" />
                
                  Your browser does not support the video tag.
                </video>
              </div>
            </div> -->

            <!-- Post Extras -->
            <!-- <div class="row my-3">
              <div class="col-md-12">
                <h6 class="mb-0 font-weight-700">
                  Bodacious and awesome dragon warrior
                </h6>
                <p class="mb-0">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Perspiciatis obcaecati laboriosam adipisci esse autem nisi
                  natus magnam omnis, ut quibusdam?
                </p>
                <a class="text-decoration-none font-weight-700 c-pointer"
                  >KungFu.Panda</a
                >
              </div>
            </div> -->

            <!-- Post Actions -->
            <div class="row my-3">
              <div class="col-md-12">
                <a
                  class="text-decoration-none c-pointer post-action-link px-3 px-md-4"
                >
                  <span><i class="pi pi-thumbs-up mr-2"></i></span>
                  <span>Like</span>
                  <span class="ml-2 text-primary" @click="viewLikes(post.id, index)">{{ post && (post.like || post.like == 0) ? post.like : "view likes" }}</span>
                </a>
                <a
                  class="text-decoration-none c-pointer post-action-link px-3 px-md-4"
                >
                  <span><i class="pi pi-comment mr-2"></i></span>
                  <span>Comment</span>
                  <span class="ml-2"></span>
                </a>
                <!-- <a
                  class="text-decoration-none c-pointer post-action-link px-3 px-md-4"
                >
                  <span><i class="pi pi-share-alt mr-2"></i></span>
                  <span>Share</span>
                </a> -->
              </div>
            </div>

            <div
              class="row my-3"
              v-for="(comment, indx) in post.comments.data"
              :key="indx"
            >
              <div class="col-2 d-md-flex justify-content-center">
                <!-- <div class="img-holder bg-secondary"></div> -->
              </div>
              <div>
                <div
                  class="py-2 px-3 small-border-radius"
                  style="background: #ebeef0"
                >
                  <h6 class="mb-0 font-weight-600">
                    {{ comment && comment.from ?  comment.from.name : "" }}
                  </h6>
                  <p class="mb-0 small-text">
                    {{ comment.message }}
                  </p>
                </div>
                <div class="px-2">
                  <p class="mb-0">
                    <!-- <small>{{
                      formatDate(comment.commentDate).toLowerCase()
                    }}</small> -->
                  </p>
                </div>
              </div>
            </div>

            <div class="row my-2">
              <div class="col-2 d-md-flex justify-content-center">
                <!-- <div class="img-holder bg-secondary"></div> -->
              </div>
              <div class="pl-0 col-10 d-flex align-items-center">
                <!-- <form class="w-100">
                  <p class="border mb-0 w-100 medium-border-radius">
                    <textarea
                      rows="1"
                      class="border-0 textarea mt-0 px-2 comment-field"
                      @keyup="postComment($event, post.postId, index)"
                      v-model="comment.message"
                      placeholder="Comment..."
                    ></textarea>
                  </p>
                </form> -->
              </div>
            </div>
          </div>
        </div>

        <!-- SKELETON LOADER -->
        <div class="row mt-3" v-if="loaded">
          <div class="col-md-12">
            <div class="row my-4">
              <div class="col-md-12">
                <div class="row">
                  <div class="col-2 my-2">
                    <Skeleton
                      shape="circle"
                      style="width: 100%; height: 70px"
                      class="p-mr-2 small-border-radius"
                    ></Skeleton>
                  </div>
                  <div class="col-10 my-2">
                    <Skeleton
                      style="width: 100%; height: 70px"
                      class="small-border-radius"
                    ></Skeleton>
                  </div>
                </div>
              </div>
              <div class="col-md-12 my-2">
                <Skeleton
                  style="width: 100%; height: 200px"
                  class="p-mb-2 small-border-radius"
                ></Skeleton>
              </div>
              <div class="col-md-12 d-flex">
                <Skeleton
                  width="4rem"
                  class="mr-2 small-border-radius"
                  height="2rem"
                ></Skeleton>
                <Skeleton
                  width="4rem"
                  height="2rem"
                  class="mr-2 small-border-radius"
                ></Skeleton>
              </div>
            </div>

            <div class="row my-4">
              <div class="col-md-12">
                <div class="row">
                  <div class="col-2 my-2">
                    <Skeleton
                      shape="circle"
                      style="width: 100%; height: 70px"
                      class="p-mr-2 small-border-radius"
                    ></Skeleton>
                  </div>
                  <div class="col-10 my-2">
                    <Skeleton style="width: 100%; height: 70px"></Skeleton>
                  </div>
                </div>
              </div>
              <div class="col-md-12 my-2">
                <Skeleton
                  style="width: 100%; height: 200px"
                  class="p-mb-2"
                ></Skeleton>
              </div>
              <div class="col-md-12 d-flex">
                <Skeleton
                  width="4rem"
                  class="mr-2 small-border-radius"
                  height="2rem"
                ></Skeleton>
                <Skeleton
                  width="4rem"
                  height="2rem"
                  class="mr-2 small-border-radius"
                ></Skeleton>
              </div>
            </div>

            <div class="row my-4">
              <div class="col-md-12">
                <div class="row">
                  <div class="col-2 my-2">
                    <Skeleton
                      shape="circle"
                      style="width: 100%; height: 70px"
                      class="p-mr-2 small-border-radius"
                    ></Skeleton>
                  </div>
                  <div class="col-10 my-2">
                    <Skeleton
                      style="width: 100%; height: 70px"
                      class="small-border-radius"
                    ></Skeleton>
                  </div>
                </div>
              </div>
              <div class="col-md-12 my-2">
                <Skeleton
                  style="width: 100%; height: 200px"
                  class="p-mb-2 small-border-radius"
                ></Skeleton>
              </div>
              <div class="col-md-12 d-flex">
                <Skeleton
                  width="4rem"
                  class="mr-2 small-border-radius"
                  height="2rem"
                ></Skeleton>
                <Skeleton
                  width="4rem"
                  height="2rem"
                  class="mr-2 small-border-radius"
                ></Skeleton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import Skeleton from "primevue/skeleton";
import social_service from '../../../../services/social/social_service';
// import membershipService from '../../../../services/membership/membershipservice';
import dateFormatter from '../../../../services/dates/dateformatter';
import axios from "@/gateway/backendapi";
import fb from 'axios';
// import store from '@/store/store';

export default {
  components: { Skeleton },
  setup() {
    // const getCurrentUser= ref([store.getters.currentUser.churchName]);
    // console.log(getCurrentUser);
    //Get AllChurchProfile
  const churchData =ref('');
  const postLike = ref([]);
  const facebookAuth = ref({});
  const comment = ref({});
    const getChurchProfile= async()=>{
      try{
        const {data} = await axios.get("/mobile/v1/Profile/GetChurchProfile");
        churchData.value =  data.returnObject;
        console.log(churchData);
        

      }catch(error){
        console.log(error)
      }
    }
     getChurchProfile()
    const feed = ref([]);
    // const tenantId = ref("");
    const previewLenth = 300;
    // membershipService
    //   .getSignedInUser()
    //   .then((res) => {
    //     tenantId.value = res.tenantId;
    //     getFeed(res.tenantId);
    //   })
    //   .catch((err) => console.log(err));

    const loaded = ref(true);
    // const getFeed = async (pId, accTkn) => {
    //   try {
        
    //         // const pageDetail = JSON.parse(localStorage.getItem('authResponse'))
    //         // console.log(pageDetail);
    //         const {data} = await fb.get(`https://graph.facebook.com/${pId}/feed?access_token=${accTkn}`)
    //           feed.value = data.data

    //           loaded.value = false;
    //           console.log(feed.value);
    //         } catch (error) {
    //           console.log(error);
    //           loaded.value = false;
    //         }
    // };
    const getFeed = async(pageId, accessToken) => {
      try{
        const{ data } = await fb.get(`https://graph.facebook.com/${pageId}/feed?fields=message,comments.limit(10).summary(true){message,from,likes.limit(0).summary(true)}&access_token=${accessToken}`)
        feed.value = data.data
        console.log(feed.value);
      }catch(error){
        console.log(error);
      }
    }

    const viewLikes = async(objectId, index) => {
      try{
        const{data} = await fb.get(`https://graph.facebook.com/${objectId}?fields=likes.summary(true)&access_token=${facebookAuth.value.accessToken}`)
        postLike.value = data
        console.log(postLike.value);
        feed.value[index].like = data.likes.summary.total_count
      }catch(error){
        console.log(error);
      }

    }
    
    const getSocialDetails = async() =>{
      try{
        let {data} = await axios.get('/api/SocialMedia/getSocialDetails?handle=facebook')
        facebookAuth.value = data.returnObject;
        console.log(data);
        getFeed(facebookAuth.value.pageId, facebookAuth.value.accessToken)
      }catch(error){
        console.log(error);
      }
    }
    getSocialDetails()

    
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
    // const getPagePost = async() =>{
    //   try{
    //     const pageDetail = JSON.parse(localStorage.getItem('authResponse'))
    //     console.log(pageDetail);
    //     const {data} = await axios.get(`https://graph.facebook.com/${pageDetail.id}/feed
    //  ?access_token=${pageDetail.access_token}`)
    //  feed.value = data
    //   }catch(error){
    //     console.log(error);
    //   }
    // }

    const formatDate = (date) => {
      return dateFormatter.monthDayTime(date);
    };

    return {
      feed,
      postComment,
      comment,
      formatDate,
      loaded,
      previewLenth,
      churchData,
      facebookAuth,
      postLike,
      viewLikes
    };
  },
};
</script>

<style scoped>
.blue-bg {
  height: 500px;
  position: absolute;
  background: #0f529f;
  width: 100%;
}

.bg-blue {
  background: #0f529f;
}

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

@media screen and (min-width: 768px) {
  .b-right {
    border-right: 0.20000000298023224px solid #e9eef0;
  }
}
</style>