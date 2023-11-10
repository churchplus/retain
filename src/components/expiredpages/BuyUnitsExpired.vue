<template>
    <div class="container">
        <Buyunit />
        <router-view></router-view>
    </div>
</template>
 
<script>

import Buyunit  from "../../views/payment/BuyUnits"
export default {
    components: { Buyunit  },
    setup() {
        
    },
}
</script>