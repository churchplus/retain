<template>
    <div class="container ">
        <Subscription/>
        <router-view></router-view>
    </div>
</template>
 
<script>

import Subscription  from "../../views/dashboard/Subscription.vue"
export default {
    components: { Subscription },
    setup() {
        
    },
}
</script>
