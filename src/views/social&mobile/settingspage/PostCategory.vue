<template>
    <div class="container">
        <div class="row my-3">
            <div class="col-md-12">
                <h2 class="main-title" style="font-size:1.5rem">
                    Create Post Category
                </h2>
            </div>
        </div>

        <div class="row my-3">
            <div class="col-md-3 text-md-right">
                <label for="">Name</label>
            </div>
            <div class="col-md-7">
                <input type="text" class="form-control" v-model="category.name">
            </div>
            <div class="col-md-2"></div>
        </div>

        <div class="row my-3">
            <div class="col-md-3 text-md-right">
                <label for="">Image</label>
            </div>
            <div class="col-md-7">
                <button class="text-decoration-none text-left c-pointer text-dark border w-100 bg-transparent p-2" @click="chooseImage">Choose category image</button>
                <!-- <input type="text" class="form-control" v-model="category.categoryImageUrl"> -->
            </div>
            <div class="col-md-2"></div>
        </div>

        <div class="row my-3">
            <div class="col-md-3 text-md-right">
            </div>
            <div class="col-md-7 text-center">
                <span><img style="border-radius:15px;max-width:100%;max-height:200px" class="mx-auto h-100" :src="fileUrl" alt=""></span>
            </div>
            <div class="col-md-2"></div>
        </div>

        <div class="row my-3">
            <div class="col-md-3 text-md-right">
            </div>
            <div class="col-md-7 text-center">
                <button class="default-btn primary-bg text-white border-0" :disabled="!category.name" @click="createCategory">Create</button>
            </div>
            <div class="col-md-2"></div>
        </div>
        <Dialog
            header="Image Picker"
            v-model:visible="display"
            :style="{ width: '70vw', maxWidth: '600px' }"
            :modal="true"
            position="top"
        >
            <ImagePicker @uploaded="fileUploaded" />
        </Dialog>
        <Toast />
    </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { useStore } from "vuex";
import membershipService from '../../../services/membership/membershipservice';
import social_service from '../../../services/social/social_service';
import { useToast } from "primevue/usetoast";
import ImagePicker from '@/components/image-picker/ImagePicker';
// import Dialog from "primevue/dialog";

    export default {
        components: { ImagePicker },
        setup() {
            const store = useStore();
            const toast = useToast();

            const display = ref(false);

            const category = ref({ });
            const tenantId = ref("");
            console.log(tenantId.value, "outside");
            const categoryImageUrl = ref("")

            const createCategory = async () => {
                try {
                    const formData = new FormData();
                    
                    if (file.value) {
                        formData.append("categoryImage", file.value ? file.value : "");
                    }

                    if (categoryImageUrl.value) {
                        formData.append("categoryImageUrl", categoryImageUrl.value ? categoryImageUrl.value : "");
                    }
                    formData.append("name", category.value.name);
                    formData.append("tenantId", tenantId.value);

                    const response = await social_service.createPostCategory(formData);
                    console.log(response);
                    toast.add({severity:'success', summary:'Category Created', detail:`${category.value.name} category has been created`, life: 3000});
                } catch (error) {
                    toast.add({severity:'error', summary:'Creation Failed', detail:'Category was not created', life: 3000});
                    console.log(error);
                }
            }

            const getTenantId = async () => {
                if (store.getters && store.getters.currentUser) {
                    tenantId.value = store.getters.currentUser.tenantId
                }   else {
                    try {
                    const response = await membershipService.getSignedInUser()
                        tenantId.value = response.tenantId;
                    } catch (error) {
                        console.log(error);
                    }
                }
                
            }

            const chooseImage = () => {
                display.value = true;
            }

            const fileUrl = ref("");
            const file = ref("");
            const fileUploaded = (payload) => {
                if (payload.isUrl) {
                    fileUrl.value = payload.data;
                    categoryImageUrl.value = payload.data;
                    file.value = '';
                } else {
                    file.value = payload.data;
                    fileUrl.value = URL.createObjectURL(payload.data);
                    categoryImageUrl.value = ""
                }
                display.value = false;
            }

            if (!tenantId.value) getTenantId();

            return {
                category,
                createCategory,
                display,
                chooseImage,
                fileUploaded,
                fileUrl,
            }
        }
    }
</script>

<style scoped>

</style>