<template>
    <!-- <div class="col-sm-6 col-lg-4 mt-3">
        <img src="../../assets/giving1.png" class="w-100" ref="myImg" id="myImg" @click="togglePopup"/>
        <div class="col-sm-12 d-flex mt-4" @click="toggleFirstTemplate">
            <i class="check-it mr-2">
            <span class="child"></span>
            </i>
            <h6>Preview</h6>
        </div>
    </div> -->
    <transition name="fade">
        <div ref="myModal"  v-if="booleanModal" class="modal" :class="{  'show-modal' : booleanModal }" @click="closeModal">
        <span class="close">&times;</span>
        <img class="modal-content" :src="src">
    </div>
    </transition>
</template>

<script>
import {  ref } from 'vue'
export default {
    props: ['src', 'booleanModal'],
    setup (props, { emit }) {
        const img01 = ref("")

        const closeModal = () => {
            // booleanModal.value = false
            emit('close-modal', false)
        }
        // onUpdated(()=> {
            //  console.log(props.src) 
             
        // })
       
          
  
            // nextTick(() => {
            //     booleanModal.value = true
            //     img01.value.src = props.src
            // })
                   
        
        return {
         img01, closeModal
        }
    }
}
</script>

<style scoped>
#myImg {
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
}

#myImg:hover {opacity: 0.7;}
/* The Modal (background) */
.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.9); /* Black w/ opacity */
}

.show-modal {
    display: block
}

/* Modal Content (image) */
.modal-content {
  margin: auto;
  display: block;
  width: 80%;
  /* max-width: 900px; */
}

/* Add Animation */
.modal-content{  
  -webkit-animation-name: zoom;
  -webkit-animation-duration: 0.6s;
  animation-name: zoom;
  animation-duration: 0.6s;
}

@-webkit-keyframes zoom {
  from {-webkit-transform:scale(0.5)} 
  to {-webkit-transform:scale(1)}
}

@keyframes zoom {
  from {transform:scale(0.5)} 
  to {transform:scale(1)}
}

/* The Close Button */
.close {
  position: absolute;
  top: 15px;
  right: 35px;
  color: #f1f1f1;
  font-size: 40px;
  font-weight: bold;
  transition: 0.3s;
}

.close:hover,
.close:focus {
  color: #bbb;
  text-decoration: none;
  cursor: pointer;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>