<template>
    <div class="container">
        <div class="row my-3">
            <div class="col-md-12 px-md-5 my-5">
                <h2 class="main-title font-weight-bold">Upload Media</h2>
            </div>
        </div>

        <div class="row my-3">
            <div class="col-md-4 text-md-right">
                <label for="">Name</label>
            </div>
            <div class="col-md-5">
                <input type="text" class="form-control">
            </div>
            <div class="col-md-3"></div>
        </div>

        <div class="row my-3">
            <div class="col-md-4 text-md-right">
                <label for="">Type</label>
            </div>
            <div class="col-md-5">
                <Dropdown :options="mediaTypes" style="width: 100%" v-model="uploadData.type" />
            </div>
            <div class="col-md-3"></div>
        </div>


        <div class="row my-3">
            <div class="col-md-4 text-md-right">
                <label for="">Category</label>
            </div>
            <div class="col-md-5">
                <input type="text" class="form-control" v-model="uploadData.category">
            </div>
            <div class="col-md-3"></div>
        </div>



        <div class="row my-3">
            <div class="col-md-4 text-md-right">
                <label for="">Price</label>
            </div>
            <div class="col-md-5">
                <input type="number" class="form-control" v-model="uploadData.price">
            </div>
            <div class="col-md-3"></div>
        </div>

        <div class="row my-3">
            <div class="col-md-4 text-md-right">
                <label for="">Cover photo</label>
            </div>
            <div class="col-md-5">
                <button class="cover-picker" @click="() => showImagePicker = !showImagePicker">{{ cover && cover.name ? cover.name : uploadData.mediaFileImageUrl ? uploadData.mediaFileImageUrl : "Choose cover image"}}</button>
                <!-- <input type="file" name="" class="form-control" id="" @change="coverUploaded"> -->
            </div>
            <div class="col-md-3"></div>
        </div>

        <div class="row my-3">
            <div class="col-md-4 text-md-right">
                <label for="">File</label>
            </div>
            <div class="col-md-5">
                <input type="file" name="" class="form-control" id="" @change="fileUploaded">
            </div>
            <div class="col-md-3"></div>
        </div>

        <div class="row my-3">
            <div class="col-md-4 text-md-right">
                <label for="">Description</label>
            </div>
            <div class="col-md-5">
                <textarea name="" id="" class="w-100 form-control" rows="5"></textarea>
            </div>
            <div class="col-md-3"></div>
        </div>

        <div class="row my-3">
            <div class="col-md-4 text-md-right">
            </div>
            <div class="col-md-5">
                <div class="row adjust-text d-flex justify-content-center">
                    <div class="col-md-4 col d-flex align-items-center ">
                        <p class="mb-0">Is free</p>
                        <Checkbox class="ml-2" id="binary" v-model="uploadData.isFree" :binary="true" />
                </div>
                <div class="col-md-4 col d-flex align-items-center p-0">
                    <p class="mb-0">Is Pushed</p>
                   <div> <Checkbox class="ml-2" id="binary" v-model="uploadData.isPushed" :binary="true" /></div>
                </div>
                <div class="col-md-4 col d-flex align-items-center p-md-0">
                    <p class="mb-0">Is Public</p>
                    <div><Checkbox class="ml-2" id="binary" v-model="uploadData.public" :binary="true" /></div>
                </div>
                </div>
            </div>
            <div class="col-md-3"></div>
        </div>

        <div class="row my-3">
            <div class="col-md-4 text-md-right">
            </div>
            <div class="col-md-5 text-center">
                <button class="default-btn primary-bg text-white border-0 mt-4" @click="uploadFile" :disabled="!file || !uploadData.type">Upload</button>
            </div>
            <div class="col-md-3"></div>
        </div>
        <Toast />
        <Dialog header="Uploading" v-model:visible="display"  :modal="true">
            <ProgressBar :value="percentCompleted" style="max-width: 600px;width: 100%;min-width:400px" />
        </Dialog>
        <Dialog
            header="Image Picker"
            v-model:visible="showImagePicker"
            :style="{ width: '70vw', maxWidth: '600px' }"
            :modal="true"
            position="top"
        >
            <ImagePicker @uploaded="imageSelected" />
        </Dialog>
    </div>
</template>

<script>
import Dropdown from "primevue/dropdown";
import Checkbox from "primevue/checkbox";
import { ref } from '@vue/reactivity';
import { useStore } from "vuex";
import membershipService from '../../../services/membership/membershipservice';
// import media_service from "../../../services/media/media_service";
import axios from "@/gateway/backendapi";
import { useToast } from "primevue/usetoast";
import Dialog from "primevue/dialog";
import ProgressBar from 'primevue/progressbar';
import ImagePicker from "../../../components/image-picker/ImagePicker";

    export default {
        components: { Dropdown, Checkbox, Dialog, ProgressBar, ImagePicker },

        setup() {
            const store = useStore();
            const toast = useToast();
            const display = ref(false);

            const mediaTypes = [ 'Video', 'Audio', 'Ebook', 'Picture'];
            const uploadData = ref({ });

            const tenantId = ref(store.getters.currentUser.tenantId);

            const onUpload = (e) => {
                console.log(e, "e");
            }

            const cover = ref(null)
            const coverUploaded = (e) => {
                cover.value = e.target.files[0];
            }

            const file = ref(null)
            const fileUploaded = (e) => {
                file.value = e.target.files[0];
            }

            const percentCompleted = ref(0)
            const uploadFile = () => {
                const formData = new FormData();
                formData.append("mediaFileImage", cover.value ? cover.value : "");
                formData.append("mediaFileImageUrl", uploadData.value.mediaFileImageUrl ? uploadData.value.mediaFileImageUrl : "");
                formData.append("mediaFile", file.value ? file.value : "");
                formData.append("name", uploadData.value.name ? uploadData.value.name : "");
                formData.append("mediaType", uploadData.value.type ? mediaTypes.indexOf(uploadData.value.type) : "");
                formData.append("description", uploadData.value.description ? uploadData.value.description : "");
                formData.append("category", uploadData.value.category ? uploadData.value.category : "");
                formData.append("price", uploadData.value.price ? uploadData.value.price : "");
                formData.append("isFree", uploadData.value.isFree ? uploadData.value.isFree : false);
                formData.append("public", uploadData.value.public ? uploadData.value.public : false);
                formData.append("isPushed", uploadData.value.isPushed ? uploadData.value.isPushed : false);
                formData.append("tenantId", tenantId.value);
                display.value = true;
                axios.post("/api/Media/UploadMedia", formData,
                    {
                        onUploadProgress: function(progressEvent) {
                            percentCompleted.value = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                        }
                    }
                )
                    .then(res => {
                        toast.add({severity:'success', summary:'File Uploaded', detail:'Your file was uploaded successfully', life: 3000});
                        display.value = false;
                        console.log(res);
                    })
                    .catch(err => {
                        toast.add({severity:'error', summary:'Upload Failed', detail:'The file upload failed, please reload and try again', life: 3000});
                        console.log(err);
                        display.value = false;
                    })
            }

            const getTenantId = () => {
                membershipService.getSignedInUser()
                    .then(res => {
                        tenantId.value = res.tenantId;
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }

            if (!tenantId.value) {
                getTenantId();
            }

            const showImagePicker = ref(false);

            const imageSelected = (e) => {
                if (e.isUrl) {
                    uploadData.value.mediaFileImageUrl = e.data;
                } else {
                    cover.value = e.data;
                }
                showImagePicker.value = false;
            }

            return {
                mediaTypes,
                uploadData,
                onUpload,
                fileUploaded,
                coverUploaded,
                uploadFile,
                file,
                display,
                percentCompleted,
                showImagePicker,
                imageSelected,
                cover,
            }
        }
    }
</script>

<style scoped>

button:disabled {
    opacity: .3;
}

.cover-picker {
    border: 1px solid #ced4da;
    width: 100%;
    padding: .3rem;
    text-align: left;
    background: transparent;
    overflow-x: hidden;
}

/* @media Queries */
@media (max-width: 966px) {
  .adjust-text {
    font-size: 12px;
  }
}
</style>