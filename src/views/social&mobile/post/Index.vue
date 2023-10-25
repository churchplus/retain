<template>
  <div class="container-fluid" style="max-width: 500px">
    <div class="row">
      <div class="col-md-12 py-4 pl-md-0">
        <h1 class="font-weight-bold main-title">New Post</h1>
      </div>
    </div>

    <div class="row my-3">
      <div class="col-md-12">
        <div class="row">
          <div class="col-md-12 pl-md-0">
            <label for="" class="small-text mb-0 label-color font-weight-700"
              >Post type <span class="text-danger">*</span></label
            >
          </div>
        </div>
        <div class="row input-border">
          <div class="col-md-12 px-0" id="post-icon">
            <Dropdown
              :options="postCategories"
              v-model="postCategory"
              optionLabel="name"
              placeholder="Select category"
              style="width: 100%"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="row bordered">
      <div class="col-md-12 pt-3 pt-2 main-post">
        <div class="row">
          <div class="col-md-12 d-flex align-items-center">
            <textarea
              name=""
              id=""
              :rows="rowsCount"
              class="w-100 border-0 textarea"
              v-model="message"
              placeholder="What's on your mind?"
            ></textarea>
          </div>

          <div class="col-md-12 text-center py-2" style="max-height: 300px">
            <span class="remove-file" @click="removeFile" v-if="file">X</span>
            <span
              ><img
                v-if="file || isUrl"
                style="border-radius: 15px; max-width: 100%"
                class="mx-auto h-100"
                :src="fileUrl"
                alt=""
            /></span>
            <video
              v-if="file && file.type && file.type.includes('video')"
              style="width: 100%; border-radius: 10px"
              height="240"
              class="border"
            >
              <source :src="fileUrl" />
              <!-- <source src="movie.mp4" type="video/mp4"> -->
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>

      <div class="col-md-12">
        <div class="row"></div>
      </div>

      <!-- <div class="col-md-12 post-add-ons py-2" v-if="!route.query.postId"> -->
      <div class="col-md-12 post-add-ons py-2">
        <div class="row">
          <div class="col-md-12">
            <a class="text-decoration-none px-md-2 c-pointer">
              <!-- <input name=""  ref="fileInput" @change="fileSelected" type="file" style="width: 0;heiight:0"> -->
              <span @click="selectFile"><i class="pi pi-video mr-1"></i></span>
              <span class="text-dark" @click="selectFile">Video</span>
            </a>
            <a class="text-decoration-none px-md-2 c-pointer ml-3">
              <span @click="selectFile"><i class="pi pi-images mr-1"></i></span>
              <span class="text-dark" @click="selectFile">Photo/Video</span>
            </a>
            <a class="text-decoration-none px-md-2 c-pointer" v-if="false">
              <span><i class="pi pi-video mr-1"></i></span>
              <span class="text-dark">Feeling/Activity</span>
            </a>
          </div>
        </div>
      </div>
    </div>

    <div class="row my-4">
      <div class="col-md-12">
        <a
          class="
            primary-text
            text-decoration-none
            font-weight-700
            mb-3
            d-flex
            align-items-center
          "
        >
          <!-- <input type="checkbox" class="c-pointer" name="" id="" /> -->
          <Checkbox id="binary" v-model="showOnMainThread" :binary="true"/>
          <span class="mx-1">Show on main feed</span>
        </a>
      </div>
      <div class="col-md-12">
        <div class="row input-border">
          <div class="col-md-12 mt-2">
            <label for="" class="small-text mb-0 label-color font-weight-700"
              >Post to
            </label>
          </div>
          <div class="col-md-12 mb-2 d-flex flex-wrap">
            <a
              class="
                primary-text
                text-decoration-none
                font-weight-700
                my-2
                px-2
                d-flex
                align-items-center
              "
            >
              <span class="c-pointer"
                ><img
                  class="icon-height"
                  src="../../../assets/social/mobile-icon.svg"
                  alt="Whatsapp icon"
              /></span>
              <span class="mx-1">Mobile App</span>
              <input type="checkbox" class="c-pointer" checked name="" id="" />
            </a>
            <a
              class="
                primary-text
                text-decoration-none
                font-weight-700
                my-2
                px-2
                d-flex
                align-items-center
              "
              style="opacity: 0.4"
            >
              <span class="c-pointer"
                ><img
                  class="icon-height"
                  src="../../../assets/social/twitter.svg"
                  alt="Whatsapp icon"
              /></span>
              <span class="mx-1">Twitter</span>
              <input
                type="checkbox"
                class="c-pointer"
                :disabled="true"
                name=""
                id=""
              />
            </a>
            <a
              class="
                primary-text
                text-decoration-none
                font-weight-700
                my-2
                px-2
                d-flex
                align-items-center
              "
              style="opacity: 0.4"
            >
              <span class="c-pointer"
                ><i class="pi pi-microsoft" style="font-size: 20px"></i
              ></span>
              <span class="mx-1">All Platforms</span>
              <input
                type="checkbox"
                class="c-pointer"
                :disabled="true"
                name=""
                id=""
              />
            </a>
            <a
              class="
                primary-text
                text-decoration-none
                font-weight-700
                my-2
                px-2
                d-flex
                align-items-center
              "
            >
              <span class="c-pointer"
                ><img
                  class="icon-height"
                  src="../../../assets/social/facebook.svg"
                  alt="Whatsapp icon"
              /></span>
              <span class="mx-1">Facebook</span>
              <input
                type="checkbox"
                v-model="toFacebook"
                class="c-pointer"
                :disabled="false"
                name=""
                id=""
              />
            </a>
            <a
              class="
                primary-text
                text-decoration-none
                font-weight-700
                my-2
                px-2
                d-flex
                align-items-center
              "
              style="opacity: 0.4"
            >
              <span class="c-pointer"
                ><img
                  class="icon-height"
                  src="../../../assets/social/instagram.svg"
                  alt="Whatsapp icon"
              /></span>
              <span class="mx-1">Instagram</span>
              <input
                type="checkbox"
                class="c-pointer"
                :disabled="true"
                name=""
                id=""
              />
            </a>
          </div>
        </div>
      </div>

      <div class="col-md-12">
        <a
          class="
            primary-text
            text-decoration-none
            font-weight-700
            my-2
            px-2
            d-flex
            align-items-center
          "
        >
          <input type="checkbox" class="c-pointer" name="" id="" />
          <span class="mx-1">Send push notification</span>
        </a>
      </div>

      <div
        class="
          col-md-12
          d-flex
          align-items-center
          justify-content-end
          my-4
          px-0
        "
      >
        <!-- <button
          class="
            default-btn
            primary-bg
            text-white
            border-0
            w-100
            font-weight-bold
          "
          :disabled="!message || !postCategory.postCategoryId"
          style="border-radius: 10px"
          @click="makePost"
        >
          Post
        </button> -->
        <SplitButton
          label="Post"
          class="w-100"
          :model="sendOptions"
          :disabled="!message || !postCategory.postCategoryId"
          @click="makePost"
        ></SplitButton>
      </div>
      <Dialog header="Posting..." v-model:visible="display" :modal="true">
        <ProgressBar
          :value="uploadProgress"
          style="max-width: 600px; width: 100%; min-width: 400px"
        />
      </Dialog>
      <Dialog
        header="Select Image"
        v-model:visible="showImagePicker"
        :style="{ width: '70vw', maxWidth: '600px' }"
        :modal="true"
        position="top"
      >
        <ImagePicker @uploaded="fileUploaded" />
         <!-- @uploadimage="imageUpload" -->
      </Dialog>
      <Dialog
        header="Select Date and Time"
        v-model:visible="displayScheduleModal"
        :style="{ width: '50vw', maxWidth: '600px' }"
        :modal="true"
      >
        <div class="row">
          <div class="col-md-12">
            <input
              type="datetime-local"
              id="birthdaytime"
              class="form-control"
              name="birthdaytime"
              v-model="executionDate"
            />
          </div>
        </div>
        <template #footer>
          <Button
            label="Cancel"
            icon="pi pi-times"
            @click="() => (displayScheduleModal = false)"
            class="p-button-raised p-button-text p-button-plain mr-3"
            style="
              color: #136acd;
              background: #fff !important;
              border-radius: 22px;
            "
          />
          <Button
            label="Schedule"
            class="p-button-rounded"
            style="background: #136acd"
            @click="schedulePost()"
          />
        </template>
      </Dialog>
    </div>
  </div>
</template>

<script>
import Dropdown from "primevue/dropdown";
import Dialog from "primevue/dialog";
import { ref } from "@vue/reactivity";
import social_service from "../../../services/social/social_service";
import membershipService from "../../../services/membership/membershipservice";
import axios from "@/gateway/backendapi";
// import fbClient from "@/gateway/backendapi";
import ProgressBar from "primevue/progressbar";
import { useRouter } from "vue-router";
import ImagePicker from "../../../components/image-picker/ImagePicker";
import { computed } from "@vue/runtime-core";
import { useRoute } from "vue-router";

export default {
  components: { Dropdown, ProgressBar, Dialog, ImagePicker },
  setup() {
    const router = useRouter();
    const postCategory = ref({});
    const postDestination = ref("Facebook");
    const toFacebook = ref(true);
    const socialData = ref({});
    const fBPhotoVideoId = ref([]);
    const showOnMainThread = ref(false);
    const fbVideoToPost = ref(null);
    const displayScheduleModal = ref(false);

    // const store = useStore();
    const route = useRoute();
    const sendOptions = ref([
      {
        label: "Schedule",
        icon: "pi pi-clock",
        command: () => {
            showScheduleModal();
        },
      }
    ]);

    const message = ref("");
    const fileInput = ref(null);
    const selectFile = () => {
      // fileInput.value.click();
      showImagePicker.value = true;
    };

    const postToEdit = ref({});
    const getPostById = async () => {
      try {
        const postData = await social_service.getPostById(route.query.postId);
        console.log(postData, 'lijhkjk');
        postToEdit.value.content = postData.content;
        postToEdit.value.mediaUrl = postData.mediaUrl;
        postToEdit.value.postId = postData.postId;
        message.value = postData.content;
        fileUrl.value = postData.mediaUrl;
        mediaUrl.value = postData.mediaUrl;
        showOnMainThread.value = postData.showOnMainThread;
        isUrl.value = true;
        getPostCategoryById(postData.postCategoryId);
      } catch (error) {
        console.log(error);
      }
    };

    if (route.query.postId) {
      getPostById(route.query.postId);
    }

    const file = ref("");
    const mediaUrl = ref("");
    const fileUrl = ref("");
    const fileSelected = (e) => {
      fileUrl.value = "";
      file.value = null;
      if (e.target.files[0]) {
        file.value = e.target.files[0];
        fileUrl.value = URL.createObjectURL(file.value);
        console.log(fileUrl.value, "url");
      }
    };

    const tenantId = ref("");
    membershipService
      .getSignedInUser()
      .then((res) => {
        tenantId.value = res.tenantId;
        getPostCategories(res.tenantId);
      })
      .catch((err) => console.log(err));

    const uploadProgress = ref("");
    const display = ref(false);

    const makePost = () => {
      if (route.query.postId) {
        const formData = new FormData();
        console.log(file.value, "jjnkjk");
        // formData.append("mediaFile", file.value ? file.value : "");
        formData.append("content", message.value ? message.value : "");
        formData.append("mediaUrl", mediaUrl.value ? mediaUrl.value : "");
        formData.append("postId", route.query.postId);
        formData.append("title", postCategory.value.name );
        formData.append("showOnMainThread", showOnMainThread.value ? showOnMainThread.value : false );
        // const body = {
        //   content: message.value,
        //   mediaUrl: postToEdit.value.mediaUrl,
        //   title: postCategory.value.name,
        //   postId: route.query.postId,
        //   showOnMainThread: showOnMainThread.value ? showOnMainThread.value : false
        // };
        updatePost(formData);
        // updatePost(body);
      } else {
        craetePost();
      }
    };

    const getFacebookPhotoId = async (pictureUrl) => {
      try {
        let { data } = await axios.post(
          `https://graph.facebook.com/${socialData.value.pageId}/photos?url=${pictureUrl}&access_token=${socialData.value.accessToken}&published=false`
        );
        console.log(data);
        fBPhotoVideoId.value.push(data);
      } catch (err) {
        console.log(err);
      }
    };

    const getFacebookVideoId = async (videoObject) => {
      const formDataPayload = new FormData();
      formDataPayload.append("source", videoObject);
      try {
        let { data } = await axios.post(
          `https://graph-video.facebook.com/${socialData.value.pageId}/videos?access_token=${socialData.value.accessToken}&published=true&description=${message.value}`,
          formDataPayload
        );
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };

    const uploadPicture = async (payload) => {
      console.log(payload);
      if (payload instanceof File) {
        console.log("uploaded image or video");
        let formData = new FormData();
        formData.append("mediaFileImage", payload);
        if (payload.type.includes("video")) {
          fbVideoToPost.value = payload;
        } else {
          try {
            let { data } = await axios.post(
              "/api/Media/UploadProfilePicture",
              formData
            );
            console.log(data, 'hhjlkdata');
            mediaUrl.value = data.pictureUrl;
            getFacebookPhotoId(data.pictureUrl);
          } catch (err) {
            console.log(err);
          }
        }
      } else {
        getFacebookPhotoId(payload);
      }
    };

    const postToFbPage = async () => {
      fBPhotoVideoId.value = fBPhotoVideoId.value.map((i) => {
        return { media_fbid: `${i.id}` };
      });
      const arrStr = encodeURIComponent(JSON.stringify(fBPhotoVideoId.value));
      await axios
        .post(
          `https://graph.facebook.com/${socialData.value.pageId}/feed?message=${message.value}&access_token=${socialData.value.accessToken}&attached_media=${arrStr}`
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const craetePost = () => {
      if (!message.value) return false;
      const formData = new FormData();
      console.log(file.value, "file");
      formData.append("mediaFile", file.value ? file.value : "");
      formData.append("content", message.value ? message.value : "");
      formData.append("mediaUrl", mediaUrl.value ? mediaUrl.value : "");
      formData.append("title", "Anouncement");
      formData.append("tenantId", tenantId.value);
      formData.append("showOnMainThread", showOnMainThread.value ? showOnMainThread.value : false );
      formData.append(
        "postCategoryId",
        postCategory.value ? postCategory.value.postCategoryId : ""
      );
      formData.append(
        "socialData.value.pageId",
        socialData.value.pageId ? socialData.value.pageId : ""
      );
      formData.append(
        "socialData.value.accessToken",
        socialData.value.accessToken ? socialData.value.accessToken : ""
      );
      formData.append(
        "toFacebook",
        toFacebook.value ? toFacebook.value : false
      );
       console.log(formData, "gjhhjjjhhg");
      display.value = true;
      axios
        .post("/mobile/v1/Feeds/CreatePost", formData, {
          onUploadProgress: function (progressEvent) {
            var percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            console.log(percentCompleted, "loaded");
            uploadProgress.value = percentCompleted;
          },
        })
        .then((res) => {
          console.log(res, "upload res");
          display.value = false;

          console.log(fbVideoToPost.value);
          if (fbVideoToPost.value !== null) {
            getFacebookVideoId(fbVideoToPost.value);
          } else {
            postToFbPage();
          }
          if (res) router.push("/tenant/social/feed");
        })
        .catch((err) => {
          console.log(err);
          display.value = false;
        });
    };

    //get facebookDetail
    //         const getSocialDetails = async() =>{
    //   try{
    //     let {data} = await axios.get('/api/SocialMedia/getSocialDetails?handle=facebook')
    //     facebookDetail.value = data;
    //     console.log(data);
    //     getFeed(data.pageId, data.accessToken)
    //   }catch(error){
    //     console.log(error);
    //   }
    // }
    // getSocialDetails()

    const updatePost = async (body) => {
      try {
        await social_service.updatePost(body);
        router.push("/tenant/social/feed");
      } catch (error) {
        console.log(error);
      }
    };

    const createCategory = () => {
      social_service.createPostCategory({
        name: "Anouncement",
        tenantId: tenantId.value,
        categoryImageUrl:
          "https://buildingsmart-1xbd3ajdayi.netdna-ssl.com/wp-content/uploads/2020/03/feat_important-.jpg",
      });
    };

    const postCategories = ref([]);
    const getPostCategories = async (tenantId) => {
      try {
        postCategories.value = await social_service.getPostCategory(tenantId);
      } catch (error) {
        console.log(error);
      }
    };

    const removeFile = () => {
      file.value = "";
      fileUrl.value = "";
    };

    const isUrl = ref(false);
    const showImagePicker = ref(false);
    // const imageUpload = (payload) => {
    //          isUrl.value = true;
    //   console.log(payload.data, 'hjyhju')
    //   file.value = payload.data
    //   mediaUrl.value = payload.data;
    //   fileUrl.value = URL.createObjectURL(payload.data);
    //   showImagePicker.value = false;
    // }

    const fileUploaded = (payload) => {
      console.log(payload, "payloads");
      isUrl.value = false;
      if (payload.isUrl) {
        isUrl.value = true;
        fileUrl.value = payload.data;
        mediaUrl.value = payload.data;
        file.value = "";
        console.log(fileUrl.value, "url");
      } else {
        // imageUpload()
        file.value = payload.data;
        fileUrl.value = URL.createObjectURL(payload.data);
        console.log(fileUrl.value, 'jhjhjhj');
        console.log(file.value, 'oooooj');
        mediaUrl.value = payload.data;
      }
      showImagePicker.value = false;

      // Upload to get image url
      uploadPicture(payload.data);
    };
    

    const rowsCount = computed(() => {
      if (!message.value) return 2;
      return message.value.split("\n").length + 1;
    });

    const getPostCategoryById = async (postCategoryId) => {
      try {
        postCategory.value = await social_service.getPostCategoryById(
          postCategoryId
        );
      } catch (error) {
        console.log(error);
      }
    };
    const getSocialDetails = async () => {
      try {
        // /api/SocialMedia/getSocialDetails?handle=facebook
        const { data } = await axios.get(
          "/api/SocialMedia/getSocialDetails?handle=facebook"
        );
        socialData.value = data.status ? data.returnObject : {};
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    getSocialDetails();

    const showScheduleModal = () => {
      displayScheduleModal.value = true;
    };

    const executionDate = ref("")
    const schedulePost = () => {
        console.log('Post Scheduled')
        displayScheduleModal.value = false
    }

    return {
      toFacebook,
      showOnMainThread,
      postDestination,
      getSocialDetails,
      postCategory,
      selectFile,
      fileInput,
      file,
      fileSelected,
      message,
      makePost,
      uploadProgress,
      display,
      createCategory,
      postCategories,
      fileUrl,
      removeFile,
      showImagePicker,
      fileUploaded,
      // imageUpload,
      isUrl,
      rowsCount,
      route,
      uploadPicture,
      getFacebookPhotoId,
      fBPhotoVideoId,
      postToFbPage,
      getFacebookVideoId,
      fbVideoToPost,
      sendOptions,
      showScheduleModal,
      displayScheduleModal,
      schedulePost,
      executionDate
    };
  },
};
</script>

<style scoped>
.main-color {
  color: #02172e;
}

.bordered {
  border: 0.20000000298023224px solid #e9eef0;
  border-radius: 15px;
}

.input-border {
  border: 0.20000000298023224px solid #e9eef0;
  border-radius: 8px;
}

.main-title {
  font-size: 2rem;
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
}

.main-post {
  background: #fbfbfb;
}

.label-color {
  color: #a5a0ab;
}

.icon-height {
  height: 25px;
}

.remove-file {
  position: absolute;
  right: 2rem;
  z-index: 100;
  color: red;
  cursor: pointer;
  font-weight: bold;
  background: #fff;
  height: 23px;
  width: 23px;
  border-radius: 50%;
  margin-top: 4px;
}

/* .textarea::placeholder {
        padding: 10px;
    } */
</style>