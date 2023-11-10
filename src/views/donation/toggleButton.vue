<template>
<div class="d-flex justify-content-between align-items-center">
    <div class="mr-3 mt-1" style="font-size: 1.1em">{{ isActive ? "Active" : "Inactive" }}</div>
    <label class="switch mt-1">
        <input type="checkbox" v-model="isActive" @click="toggleIsActive">
        <span class="slider round"></span>
 </label>
</div>
 
</template>

<script>
import { ref } from 'vue'
export default {
    props: ['active'],
    setup (props, { emit }) {
        const isActive = ref(props.active)

        const toggleIsActive = () => {
            isActive.value = !isActive.value
            emit('is-active', isActive.value)
        }
        return {
            isActive, toggleIsActive
        }
    }
}
</script>

<style scoped>
/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 27px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 7px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2195f3e5;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>