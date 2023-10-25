<template>
    <div class="container max-height px-0 scroll-div">
        <div class="row text-center dotted-border-bottom">
            <div class="col-md-12 my-3">
                <TriggerDescription :header="'Form Submission'" />
            </div>
        </div>

        <div class="row mt-4">
            <div class="col-md-12">
                <label for="" class="font-weight-600 mb-0">When the following form is submitted</label>
            </div>
            <div class="col-md-12 mb-2 mt-3">
                <MultiSelect @change="handleStatus" v-model="selectedStatus" :options="[ 'Present', 'Excused', 'Unexcused' ]"  class="w-100"  display="chip" />
            </div>

            <div class="col-md-12 mt-4">
                <label for="" class="font-weight-600">Map</label>
            </div>
            <div class="col-md-12 mb-2">
                <div class="row">
                    <div class="col-md-6">
                        <Dropdown :options="[ '1 day', '1 week', '4 weeks' ]" class="w-100" v-model="timesInLastWeek" @change="handleTimesInLastWeek" />
                    </div>
                    <div class="col-md-6">
                        to Full Name
                    </div>
                </div>
            </div>

            <div class="col-md-12 mt-4">
                <label for="" class="font-weight-600 mb-0 primary-text">Map more fields</label>
            </div>
            <div class="col-md-12 mt-2">
                <label for="" class="font-weight-600">An match individuals based on</label>
            </div>
            <div class="col-md-12 mb-2">
                <Dropdown :options="[ 'Name', 'Name and Email', 'Name and Birthday' ]" class="w-100" v-model="timesInLastWeek" @change="handleTimesInLastWeek" />
            </div>

            <div class="col-md-12 mt-4">
                <label for="" class="font-weight-600">And</label>
            </div>
            <div class="col-md-12 mb-2">
                <Dropdown :options="[ 'Create people who do not match', 'Do not create people who do not match' ]" class="w-100" v-model="timesInLastWeek" @change="handleTimesInLastWeek" />
            </div>

            <div class="col-md-12 mt-4">
                <label for="" class="font-weight-600">And</label>
            </div>
            <div class="col-md-12 mb-2">
                <Dropdown :options="[ 'Replace data in matched fields with form data', 'Do not' ]" class="w-100" v-model="timesInLastWeek" @change="handleTimesInLastWeek" />
            </div>
        </div>
        
    </div>
</template>

<script>
import Dropdown from "primevue/dropdown"
import MultiSelect from "primevue/multiselect"
import TriggerDescription from "../TriggerDescription.vue"
export default {
    components: { Dropdown, TriggerDescription, MultiSelect },

    setup () {

        return {

        }
    }
}
</script>

<style scoped>
    .dotted-border-bottom {
        border-bottom: dotted 2px #ddd;
    }

    .max-height {
        max-height: calc(100vh - 300px);
    }
</style>