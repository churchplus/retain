<template>
    <div class="container-fluid">
         <div class="row py-5" v-if="loading">
            <div class="col-md-12 text-center">
                <i class="pi pi-spin pi-spinner primary-text" style="fontSize: 3rem"></i>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: [ "loading" ]
    }
</script>

<style scoped>

</style>