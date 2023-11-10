<template>
  <div class="container-fluid">
  <!-- <div class="container-fluid" v-lazy-container="{ selector: 'img' }"> -->
    <div class="row bordered">
      <div class="col-md-12">
        <div class="row bordered-bottom">
          <div class="col-sm-6 py-3 text-center btn-div" @click="() => willUpload = false">
            <a class="text-decoration-none text-dark font-weight-bold"
              >Images</a
            >
          </div>
          <div class="col-sm-6 py-3 text-center btn-div" @click="selectFile">
            <a class="text-decoration-none text-dark font-weight-bold"
              >Upload</a
            >
            <input type="file" name="" id="" @change="fileSelected" style="height: 0;width:0" ref="fileInput">
          </div>
        </div>

        <div class="row py-5" v-if="loading">
            <div class="col-md-12 text-center">
                <i class="pi pi-spin pi-spinner primary-text" style="fontSize: 3rem"></i>
            </div>
        </div>

        <div class="row d-flex flex-wrap py-4" v-if="!willUpload">
          <div class="col-sm-4 my-2" v-for="(image, index) in gallery" :key="index" style="max-height: 200px" @click="uploaded(true, image)">
              <div class="row">
                  <div class="col-md-11 mx-auto c-pointer img-box">
                      <img v-lazy="image" style="height:100%;width:100%" alt="">
                      <!-- <img :data-src="image" style="height:100%;width:100%" alt=""> -->
                  </div>
              </div>
          </div>
          <div class="col-md-12 text-center" v-if="gallery.length === 0 && !loading">
            <p class="py-3 font-weight-700">No images found</p>
          </div>
        </div>

        <div class="row" v-else>
            <div class="col-md-12 text-center my-4">
                <span>
                  <img v-if="file && (file.type && file.type.includes('image'))" style="border-radius:15px;max-width:100%;max-height:300px" 
                  class="mx-auto h-100 no-lazyload" :src="fileUrl" alt="">
                  <video
                    v-if="file && (file.type && file.type.includes('video'))"
                    style="width: 100%;border-radius:10px"
                    height="240"
                    class="border"
                    >
                    <source :src="fileUrl" />
                    <!-- <source src="movie.mp4" type="video/mp4"> -->
                    Your browser does not support the video tag.
                    
                  </video>
                </span>
            </div>
            <div class="col-md-12 text-center py-4">
                <button class="default-btn border-0 text-white primary-bg" @click="uploaded(false, '')">Continue</button>
            </div>
        </div>
      </div>

      <!-- <div class="col-md-12 d-flex justify-content-end py-2" v-if="!loading && gallery.length > 0">
        <Pagination :itemsCount="50" :currentPage="currentPage" @getcontent="getImagesByPage" />
      </div> -->
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity';
import media_service from '../../services/media/media_service';
import Pagination from "../pagination/PaginationButtons";

export default {
  components: { Pagination },
    setup(props, { emit }) {
        const fileInput = ref(null);
        const file = ref("");
        const willUpload = ref(false);
        const loading = ref(true);

        const currentPage = ref(0)
        const gallery = ref([])
        const getImagesByPage = async (page) => {
            try {
              const response = await media_service.getImageGallery(page);
              loading.value = false;
              if (response.returnObject.images.length > 0) {
                gallery.value = [ ]
                gallery.value = response.returnObject.images;
                currentPage.value = page;
              }
            } catch (error) {
              loading.value = false;
                console.log(error);
            }
        }
        const getImages = async (page) => {
            try {
              const response = await media_service.getImageGallery(page);
              loading.value = false;
              gallery.value = response.returnObject.images;
            } catch (error) {
              loading.value = false;
                console.log(error);
            }
        }
        getImages(currentPage.value);

        const fileUrl = ref("");
        const fileSelected = (e) => {
            fileUrl.value = "";
            file.value = null;
            if (e.target.files[0]) {
                file.value = e.target.files[0];
                // console.log(file.value,  'jjjjjj');
                // emit('uploadimage', { data: file.value })
                fileUrl.value = URL.createObjectURL(file.value);
                console.log(fileUrl.value, "url");
                
                willUpload.value = true;
            }
        }

        const selectFile = () => {
            fileInput.value.click();
        }

        const uploaded = (isUrl, selectedImageUrl) => {
            if (!isUrl) {
                emit('uploaded', { isUrl, data: file.value })
                console.log({isUrl, data: file.value}, 'kjkjkjk')
            } else {
                emit('uploaded', { isUrl, data: selectedImageUrl })
                console.log({isUrl, data: selectedImageUrl}, 'kjk')
            }
        }

        return {
            fileInput,
            fileSelected,
            selectFile,
            fileUrl,
            willUpload,
            uploaded,
            gallery,
            loading,
            currentPage,
            getImagesByPage,
            file,
        }
    }
};
</script>

<style scoped>
.bordered {
  border: 0.20000000298023224px solid #e9eef0;
  border-radius: 15px;
}

.bordered-bottom {
  border-bottom: 0.20000000298023224px solid #e9eef0;
}

.btn-div:hover {
    background: #e9eef0;
    cursor: pointer;
    border-radius: 15px 15px 0 0;
}

.img-box:hover {
  /* border: 0.20000000298023224px solid #e9eef0; */
  box-shadow: 0 1rem 3rem rgba(0,0,0,.175)!important;
}
</style>