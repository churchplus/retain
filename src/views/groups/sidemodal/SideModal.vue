<template>
    <div class="container container-wide container-top">
        <div class="row">
            <div class="container">
                <div :class="{ 'show-Times' : show, 'hide-Times' : !show }" class="border"> 
                    <span class=" pl-2 text-center" @click="closeModal"><i class="times cursor-pointer pt-2 mt-2 rounded pi pi-times"></i></span>
                    <slot />
                </div>
            </div>
                
        </div>
    </div>
</template>

<script>
// import { ref } from "vue";

export default {
    props: [ 'show', 'title' ],
    setup(props, { emit }) {

        // const show = ref(false)
        // const Times = () =>{
        //     show.value = !show.value
        // }

        const closeModal = () => {
            emit('closesidemodal')
            
        }

        return {
            // Times ,
            // show,
            closeModal,
            
        }
    },
}
</script>

<style scoped>
.show-Times{
   width: 100%;
   height: 100%;
   overflow: scroll;
   overflow-x: hidden;
    position: fixed;
    right: 0;
    top: 0;
    z-index: 0;
    background: #a0a3a7;
    box-shadow: 5px 10px 18px #888888;
    border-radius: 10px;
    transform: translate(0px, 0px);
    transition: transform  0.8s cubic-bezier(0.645, 0.045, 0.355, 1);
}
.hide-Times{
   width: 100%;
   height: 100%;
   overflow: scroll;
   overflow-x: hidden;
    position: fixed;
    right: 0;
    top: 0;
    z-index: 0;
    background: #a0a3a7;
    box-shadow: 5px 10px 18px #888888;
    border-radius: 10px;
    transform: translate(2000px, 0px);
    transition: transform  0.8s cubic-bezier(0.645, 0.045, 0.355, 1);
}
.main-container {
    background: salmon;

}
.times{
 height: 2rem;
 width: 40px;
 background-color: rgb(231, 231, 231);
}



/* .mydiv{
    height: 90vh;
    width: 1000px;
    border-radius: 0.5rem;
    box-shadow: 0 0.063rem 0.25rem #02172e45;

} */

</style>