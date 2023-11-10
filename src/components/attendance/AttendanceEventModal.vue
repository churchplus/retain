<template>
    <div class="container-fluid">
        <!-- <Toast /> -->
        <div class="row py-4">
            <div class="col-md-3 text-md-right">
                <label for="name">Name</label>
            </div>
            <div class="col-md-7">
                <input type="text" name="name" v-model="eventName" class="form-control">
            </div>
        </div>
        <div class="row py-2">
            <div class="col-md-3 text-md-right">
                <label for=""></label>
            </div>
            <div class="col-md-7 d-flex justify-content-center">
                <button class="default-btn mr-2" @click="closeModal">Cancel</button>
                <button class="default-btn primary-bg border-0 ml-2 text-white" @click="createCategory">Save</button>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import eventsService from '../../services/events/eventsservice';
import { useToast } from 'primevue/usetoast';

    export default {
        setup(props, { emit }) {
            const eventName = ref("");
            const toast = useToast();

            const createCategory = async () => {
                try {
                    const response =  await eventsService.createNewEventCategory(eventName.value);
                    if (response) {
                        toast.add({severity:'success', summary:'Operation Successful', detail:'Category created successfully', life: 3000});
                        emit('new-created', response.map(i => {
                            return { id: i.id, name: i.name }
                        }), eventName.value);
                    } else {
                        closeModal();
                        toast.add({severity:'error', summary:'Operation Failed', detail:'Category could not be created', life: 3000});
                    }
                } catch (error) {
                    emit("closeeventmodal");
                    toast.add({severity:'error', summary:'Operation Failed', detail:'Category could not be created', life: 3000});
                    console.log(error);
                }
            }

            const closeModal = () => {
                emit("closeeventmodal");
            }

            return {
                closeModal,
                eventName,
                createCategory,
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>