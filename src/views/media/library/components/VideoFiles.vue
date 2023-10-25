<template>
    <div class="container-fluid mt-2" v-lazy-container="{ selector: 'img' }">
        <div class="row">
            <div class="col-md-12">
                <ConfirmPopup></ConfirmPopup>
                <Toast></Toast>
                <div class="row d-flex jsutify-content-around" id="popUp">
                    <router-link :to="{ name: 'FileDetails', query: { id: file.id, f:file.filePath,t:file.mediaType }}" class="col-sm-4 my-3 c-pointer text-center text-decoration-none shadow-lg hover-con" v-for="(file, index) in files" :key="index" style="height:fit-content">
                        <span>
                            <img :data-src="file.imagePath" style="height:100%;width:auto;max-height:300px;max-width:100%" alt="Media File">
                            <span class="del-icon c-pointer d-none font-weight-bold" @click.prevent="confirmDelete($event, file)"><i class="pi pi-trash" style="font-size: 1.5rem"></i></span>
                        </span>
                        <div class="row">
                            <div class="col-md-6">
                                <h5 class="primary-text font-weight-bold">{{ fileName(file.name) }}</h5>
                                <span>{{ formatDate(file.dateAdded) }}</span>
                            </div>
                        </div>
                    </router-link>
                </div>
            </div>
            <div class="col-md-12 text-center" v-if="files && files.length === 0">
                <p class="py-3 font-weight-700">No files found</p>
            </div>
        </div>
    </div>
</template>

<script>
import dateFormatter from '../../../../services/dates/dateformatter';
import media_service from '../../../../services/media/media_service';
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'
import ConfirmPopup from 'primevue/confirmpopup';

    export default {
        props: [ "files" ],
        components: { ConfirmPopup },
        setup(props, { emit }) {
            const confirm = useConfirm();
            const toast = useToast();

            const fileName = (name) => {
                if (!name) return "Unknown"
                if (!name.includes('https')) return name;
                const splitted = name.split('/');
                const derived = splitted[splitted.length - 1];
                if (!derived.includes('_')) return derived;
                return derived.split('_')[0];
            }
            const formatDate = (date) => {
                return dateFormatter.monthDayYear(date);
            }

            const delecteMedia = async (mediaId, type) => {
                try {
                    const { status } = await media_service.deleteMedia(mediaId);
                    
                    if (status) {
                        emit('filedeleted', { mediaId, type: type})
                        toast.add({severity:'success', summary:'Confirmed', detail:'File deleted', life: 3000});
                    } else {
                        toast.add({severity:'error', summary:'Failed', detail:'File could not be deleted', life: 3000});
                    }
                } catch (error) {
                    console.log(error);
                    toast.add({severity:'error', summary:'Failed', detail:'File could not be deleted', life: 3000});
                }
            }

            const confirmDelete = (e, media) => {
                confirm.require({
                    target: e.currentTarget,
                    message: 'Do you want to delete this record?',
                    icon: 'pi pi-info-circle',
                    acceptClass: 'p-button-danger confirm-delete',
                    rejectClass: 'cancel-delete',
                    accept: () => {
                        delecteMedia(media.id, media.mediaType)
                    },
                    reject: () => {
                        // toast.add({severity:'error', summary:'Rejected', detail:'You have rejected', life: 3000});
                    }
                });
            }

            return {
                fileName,
                formatDate,
                confirmDelete,
            }
        }
    }
</script>

<style scoped>
.bordered {
  border: 0.20000000298023224px solid #e9eef0;
  border-radius: 8px;
  background: #fff;
}

.active {
    background: #e9eef0;
    border-radius: 8px 0 0 8px;
}

.tab:hover {
    background: #d7e0ea;
}

.del-icon {
    position: absolute;
    right: 1rem;
    top: .5rem;
    color: #000;
    background: #ffffff80;
    padding: .5rem;
    border-radius: 35%;
    font-size: 1.5rem;
    border: 1px solid #ffffff80;
}

.hover-con:hover .del-icon {
    display: block !important;
}

#popUp .p-confirm-popup.p-component:hover #popUp .del-icon {
    display: block !important;
}
</style>