<template>
  <div>
    <ul>
      <!-- :class="{ 'd-block' : itemDisplay, 'd-none' : !itemDisplay }"  -->
      <li v-for="i of items" :key="i.name">
        <span @click="toggleItems(i, $event)"><i class="pi pi-chevron-down"></i>{{i.name}}</span>
        <Tree :items="i.children" v-if="i.children" class="d-none" />
      </li>
    </ul>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
export default {
  name: "Tree",
  props: {
    items: Array
  },
  setup () {
    const count = ref(1)
    const itemDisplay = ref(false)

    const toggleItems = (i, e) => {
      itemDisplay.value = !itemDisplay.value
      console.log(i, count.value + 1, 'value')
      console.log(e.target.nextElementSibling.classList.toggle('d-none'))
    }

    return {
      count,
      toggleItems,
      itemDisplay
    }
  }
};
</script>
<style scoped>
/* ul {
  padding: 0
} */
li {
  list-style-type: none;
}
.display-item {
  display: block !important;
  border: 2px solid blue;
};

.hide-item {
  display: none !important;
  border: 2px solid red;
}
</style>