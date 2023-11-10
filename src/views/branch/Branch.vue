<template>
    <div class="container-top" :class="{ 'container-slim': lgAndUp || xlAndUp }">
        <router-view  />
    </div>
</template>

<script>
import deviceBreakpoint from "../../mixins/deviceBreakpoint";
export default {
    setup() {
         const { lgAndUp, xlAndUp } = deviceBreakpoint()
        
        return{
            lgAndUp,
            xlAndUp,
        }
    },
}
</script>

<style scoped>

</style>