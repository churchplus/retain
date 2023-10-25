<template>
  <div class="container">
    <div class="row bordered mt-4">
      <div class="col-md-12">
        <div class="row bordered-bottom">
          <div
            class="col-sm-3 tab py-2 c-pointer"
            :class="{ active: tab === 0 }"
            @click="() => (tab = 0)"
          >
            <span
              class="d-flex flex-column justify-content-center align-items-center"
            >
              <span
                ><i class="pi pi-volume-up" style="font-size: 2rem"></i
              ></span>
              <span>Audio</span>
            </span>
          </div>
          <div
            class="col-sm-3 tab py-2 c-pointer"
            :class="{ active: tab === 1 }"
            @click="() => (tab = 1)"
          >
            <span
              class="d-flex flex-column justify-content-center align-items-center"
            >
              <span><i class="pi pi-video" style="font-size: 2rem"></i></span>
              <span>Video</span>
            </span>
          </div>
          <div
            class="col-sm-3 tab py-2 c-pointer"
            :class="{ active: tab === 2 }"
            @click="() => (tab = 2)"
          >
            <span
              class="d-flex flex-column justify-content-center align-items-center"
            >
              <span
                ><i class="pi pi-file-pdf" style="font-size: 2rem"></i
              ></span>
              <span>Docs</span>
            </span>
          </div>
          <div
            class="col-sm-3 tab py-2 c-pointer"
            :class="{ active: tab === 3 }"
            @click="() => (tab = 3)"
          >
            <span
              class="d-flex flex-column justify-content-center align-items-center"
            >
              <span><i class="pi pi-images" style="font-size: 2rem"></i></span>
              <span>Pictures</span>
            </span>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <div class="row">
              <div class="col-md-12 px-0" v-if="tab === 0">
                <VideoFiles @filedeleted="deleteMedia" :files="media.Audio" />
              </div>
            </div>

            <div class="row">
              <div class="col-md-12 px-0" v-if="tab === 1">
                <VideoFiles @filedeleted="deleteMedia" :files="media.Video" />
              </div>
            </div>

            <div class="row">
              <div class="col-md-12 px-0" v-if="tab === 2">
                <VideoFiles @filedeleted="deleteMedia" :files="media.Ebook" />
              </div>
            </div>

            <div class="row">
              <div class="col-md-12 px-0" v-if="tab === 3">
                <VideoFiles @filedeleted="deleteMedia" :files="media.Picture" />
              </div>
            </div>
          </div>
        </div>

        <div class="row py-5" v-if="loading">
            <div class="col-md-12 text-center">
                <i class="pi pi-spin pi-spinner primary-text" style="fontSize: 3rem"></i>
            </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import VideoFiles from "./VideoFiles";
import media_service from "../../../../services/media/media_service";
import membershipService from "../../../../services/membership/membershipservice";

export default {
  components: { VideoFiles },
  setup() {
    const files = ref([]);
    const tab = ref(3);
    const mediaTypes = ["Video", "Audio", "Ebook", "Picture"];
    const media = ref({});
    const loading = ref(true)
    const getMedia = async (tenantId) => {
      try {
        const response = await media_service.getMedia(tenantId);
        console.log(response);
        loading.value = false;
        for (let file of mediaTypes) {
          media.value[file] = response.returnObject.filter((i) => {
            return Number(i.mediaType) === mediaTypes.indexOf(file);
          });
        }
        files.value = response;
      } catch (error) {
        loading.value = false;
        console.log(error);
      }
    };

    membershipService
      .getSignedInUser()
      .then((res) => {
        getMedia(res.tenantId);
      })
      .catch((err) => console.log(err));

    const deleteMedia = mediaData => {
      if (mediaData.mediaId) {
        media.value[mediaTypes[mediaData.type]] = media.value[mediaTypes[mediaData.type]].filter(i => i.id !== mediaData.mediaId);
      }
    }

    return {
      files,
      mediaTypes,
      tab,
      media,
      loading,
      deleteMedia,
    };
  },
};
</script>

<style scoped>
.bordered {
  border: 0.20000000298023224px solid #e9eef0;
  border-radius: 8px;
  background: #fff;
}

.bordered-bottom {
  border-bottom: 0.20000000298023224px solid #e9eef0;
}

.active {
  background: #d7e0ea;
  /* background: #e9eef0; */
  border-radius: 8px;
}

.tab:hover {
  background: #d7e0ea;
}
</style>