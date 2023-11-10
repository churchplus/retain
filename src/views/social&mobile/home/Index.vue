
<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-12 py-4">
                <h1 class="font-weight-bold main-title pt-4">Social and Mobile</h1>
            </div>
        </div>
        <div class="row main-con">
            <div class="col-md-3">
                <NavLinks />
            </div>
            <div class="col-md-9">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
    import NavLinks from "./components/NavLinks";
    export default {
        components: { NavLinks },
        
    }
</script>

<style scoped>
    .main-con {
        border: 0.20000000298023224px solid #e9eef0;
        border-radius: 30px;
    }

    .main-color {
        color: #02172e;
    }

    .main-title {
        font-size: 2.2rem;
    }

</style>
