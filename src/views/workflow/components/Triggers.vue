<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12" v-for="(trigger, index) in selectedTriggers" :key="index">
                {{ trigger.name }}
            </div>
        </div>
        <div class="row h-100" >
            <div class="col-md-12 trigger-btn-con" :class="{ 'trigger-btn-con-height': showTriggers }">
                <div class="row d-flex justify-content-around">
                    <div class="col-md-5 card my-2" v-for="(i, j) in triggers" :key="j" @click="selectTrigger(i)">
                        <div class="row card-body">
                            <div class="col-md-12 text-center">
                                <i class="pi pi-users"></i>
                            </div>
                            <div class="col-md-12 text-center">
                                <h4 class="mb-0">{{ i.name }}</h4>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-5 my-2">
                        <div class="row bottom-space my-3">
                            
                        </div>
                    </div>
                    <div class="col-md-5 bottom-space my-2">
                        <div class="row my-3">
                            
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-12 trigger-btn-div">
                <button class="btn btn-secondary w-100 trigger-btn"
                    @click="toggleTriggers">
                    Add a trigger
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from '@vue/reactivity';
export default {
    props: [ 'triggers' ],
    setup () {
         const showTriggers = ref(false);
        const showActions = ref(false);
        

        const selectedTriggers = ref([ ]);
        const selectedActions = ref([ ]);

        const toggleTriggers = () => {
            showTriggers.value = !showTriggers.value;
        }

        const toggleActions = () => {
            showActions.value = !showActions.value;
        }

        const checkIfAlreadySelected = trigger => {
            const index = selectedTriggers.value.findIndex(t => t.name === trigger.name);
            return index >= 0 ? true : false;
        }
        const checkIfActionIsAlreadySelected = trigger => {
            const index = selectedActions.value.findIndex(t => t.name === trigger.name);
            return index >= 0 ? true : false;
        }

        const selectTrigger = (trigger) => {
            if (!checkIfAlreadySelected(trigger)) {
                selectedTriggers.value.push(trigger)
            }
            showTriggers.value = false
        }
        const selectAction = (trigger) => {
            if (!checkIfActionIsAlreadySelected(trigger)) {
                selectedActions.value.push(trigger)
            }
            showActions.value = false
            actionSelected.value = true;
        }

        const actionSelected = ref(false);

        return {
            showTriggers,
            toggleTriggers,
            selectedTriggers,
            selectTrigger,

            showActions,
            selectedActions,
            toggleActions,
            selectAction,

            actionSelected,
        }
    }
}
</script>

<style scoped>
    .trigger-btn-con {
        position: absolute;
        bottom: 0;
        width: 100%;
        /* background-color: #ddd; */
        transition: all .5s ease-in-out;
        height: 0;
        overflow: hidden;
    }

    .trigger-btn-con-height {
        transition: all .5s ease-in-out;
        height: calc(100% - 0px);
        overflow: scroll;
        background: #00000008;
    }

    .trigger-btn {
        position: absolute;
        bottom: 0;
        width: 190px !important;
        max-width: 100% !important;
    }

    .trigger-btn-div {
        position: absolute;
        bottom: 0;
        max-width: 100% !important;
    }
</style>