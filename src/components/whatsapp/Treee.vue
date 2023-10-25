<template>
  <div id="app">
    <Tree :items="items"/>
  </div>
</template>

<script>
import Tree from "./Tree";

export default {
  name: "App",
  components: {
    Tree
  },
  props: ["items"],
  data() {
    return {
      // items: [
      //   {
      //     name: "foo",
      //     children: [
      //       { name: "bar", children: [{ name: "baz" }, { name: "qux" }] }
      //     ]
      //   },
      //   {
      //     name: "lorem",
      //     children: [{ name: "ipsum" }]
      //   },
      //   {
      //     name: "dolor"
      //   }
      // ]
    };
  }
};
</script>