<template>
    <div class="container-fluid"  v-lazy-container="{ selector: 'img' }">
        <div class="row my-5">
            <!-- <div class="col-md-12 text-center my-4">
                <span><img :src="file.imagePath" style="height:100%;width:auto;max-height:300px;max-width:100%" alt="Media File"></span>
            </div> -->

            <div class="col-md-12 my-3">
                <div class="row">
                    <div class="col-md-8 mx-auto">
                        <h5 class="primary-text">{{ fileName(file) }}</h5>
                        <span>{{ formatDate(file.dateAdded) }}</span>
                    </div>
                </div>
            </div>


            <div class="col-md-12" v-if="Number(route.query.t) === 0">
                <div class="row">
                    <div class="col-md-8 mx-auto">
                        <video
                            style="width: 100%"
                            height="340"
                            controls
                            >
                            <source :src="route.query.f" />
                            <!-- <source src="movie.mp4" type="video/mp4"> -->
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>
            </div>

            <div class="col-md-12" v-if="route.query.t === '1'">
                <div class="row">
                    <div class="col-md-8 mx-auto">
                        <audio controls class="w-100 outline-none">
                            <!-- <source :src="file.filePath" type="audio/ogg"> -->
                            <source :src="route.query.f" >
                            Your browser does not support the audio element.
                        </audio>
                    </div>
                </div>
            </div>
            <div class="col-md-12" v-if="route.query.t === '2'">
                <div class="row">
                    <div class="col-md-8 mx-auto">
                        <iframe
                            :src="`https://drive.google.com/viewerng/viewer?embedded=true&url=${route.query.f}#toolbar=0&scrollbar=0`"
                            frameBorder="0"
                            scrolling="auto"
                            height="700px"
                            width="100%"
                        ></iframe>
                    </div>
                </div>
            </div>
            <div class="col-md-12" v-if="route.query.t === '3'">
                <div class="row">
                    <div class="col-md-8 mx-auto">
                        <span><img :data-src="`${route.query.f}?nocache${uniqueId()}`" style="height:100%;width:auto;max-height:300px;max-width:100%" alt="Media File"></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { useRoute } from "vue-router"
import media_service from '../../../services/media/media_service';
import dateFormatter from '../../../services/dates/dateformatter';
import { v4 as uuidv4 } from 'uuid';

    export default {
        setup() {
            const file = ref({ });
            const route = useRoute();

            const getFileById = async () => {
                try {
                    file.value = await media_service.getMediaById(route.query.id);
                    console.log(file.value, "by id");
                } catch (error) {
                    console.log(error);
                }
            }

            const fileName = (item) => {
                if (!item.name) return item.fileBlobName;
                if (!item.name.includes('https')) return item.name;
                const splitted = item.name.split('/');
                const derived = splitted[splitted.length - 1];
                if (!derived.includes('_')) return derived;
                return derived.split('_')[0];
            }

            const formatDate = (date) => {
                return dateFormatter.monthDayYear(date);
            }

            const uniqueId = () => {
                return uuidv4();
            }

            getFileById();

            return {
                file,
                route,
                fileName,
                formatDate,
                uniqueId,
            }
        }
    }
</script>

<style scoped>

</style>