<template>
    <div class="container"  style="border: 2px solid red">
        <div class="row py-2">
            <div class="col-md-2">
                <div class="ward-img-box">

                </div>
            </div>
            <div class="col-md-6  d-flex align-items-center">
                <span class="py-2">Longest Names</span>
            </div>
            <div class="col-md-2  d-flex align-items-center">
                <span class="py-2">
                    <input type="checkbox" name="" id="">
                </span>
            </div>
            <div class="col-md-2 d-flex align-items-center">
                <span class="py-2">
                    <input type="checkbox" name="" id="">
                </span>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    setup () {
        

        return {}
    }
}
</script>

<style scoped>
    .ward-img-box {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 1px solid;
    }
</style>