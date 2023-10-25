<template>
    <div class="container ward-table-wrapper pt-4">
        <div class="row th py-2">
            <div class="col-md-2">
                <span class="py-2 font-weight-700">Picture</span>
            </div>
            <div class="col-md-7">
                <span class="py-2 font-weight-700">Name</span>
            </div>
            <div class="col-md-3">
                <span class="py-2 font-weight-700">Age</span>
            </div>
        </div>

        <div class="row">
            <div class="col-md-12 px-0">
                <Ward />
            </div>
        </div>
    </div>
</template>

<script>
import Ward from "./Ward"
export default {
    components: { Ward },
    setup () {
        

        return {}
    }
}
</script>

<style  scoped>
    .th {
        background: #DDE2E6 0% 0% no-repeat padding-box;
    }

    .ward-table-wrapper {
        background: #FFFFFF 0% 0% no-repeat padding-box;
        border: 1px solid #DDE2E6;
        border-radius: 30px;
        opacity: 1;
    }
</style>