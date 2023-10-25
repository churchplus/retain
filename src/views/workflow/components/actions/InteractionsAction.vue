<template>
    <div class="container scroll-div">
        <div class="row">
            <div class="col-md-10 my-3">
                <label for="" class="mb-0 font-weight-600">Assign a</label>
            </div>
            <div class="col-md-2 text-md-right d-flex align-items-center">
                <i class="pi pi-trash" style="font-size:1.5rem"></i>
            </div>
        </div>

        <div class="row my-3">
            <div class="col-md-12">
                <Dropdown :options="[ 'Email', 'Phone Call', 'Visit' ]" class="w-100" v-model="timesInLastWeek" @change="handleTimesInLastWeek" />
            </div>
        </div>

        <div class="row my-3">
            <div class="col-md-12">
                <label for="" class="font-weight-600 mb-0">To</label>
            </div>

            <div class="col-md-12">
                <input type="checkbox" class="check-control ml-3" name="" id=""> The group leader
            </div>
        </div>

        <div class="row my-3">
            <div class="col-md-12">
                <label for="" class="font-weight-600 mb-0">And the following people</label>
            </div>

            <div class="col-md-12">
                <input type="text" class="form-control" name="" placeholder="Search..." id="">
            </div>
        </div>

        <div class="row my-3">
            <div class="col-md-12">
                <label for="" class="font-weight-600 mb-0">With the following instructions</label>
            </div>

            <div class="col-md-12">
                <textarea name="" id="" class="w-100 border" rows="4"></textarea>
            </div>
        </div>
    </div>
</template>

<script>
import Dropdown from "primevue/dropdown"
export default {
    components: {
        Dropdown
    },
    setup () {
        

        return {}
    }
}
</script>

<style lang="scss" scoped>

</style>