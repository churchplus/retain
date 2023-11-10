<template>
  <div>
    <div class="container">
      <div class="row mt-4" style="margin-top: 10px">
        <div class="col-md-12 d-flex">
          <a class="p-2 mx-1 page-btn rounded-circle" @click="prevPage"
           :class="{ 'disable': currentPage === 0 }"
            ><i class="pi pi-angle-left"></i>
          </a>
          <a
            class="p-2 mx-1 rounded-circle"
            :class="{ 'primary-bg text-white': i === currentPage + 1, 'page-btn': i <= startButton + buttonsCount, 'd-none': i < startButton || i > startButton + buttonsCount }"
            v-for="i in pages"
            :key="i"
            @click="getPageContent(i)"
            
            ><span v-if="i >= startButton && i <= (startButton + buttonsCount)">{{ i }}</span></a
          >
          <a class="p-2 mx-1 page-btn rounded-circle" :class="{ 'disable': currentPage >= pages - 1 }"
            @click="nextPage"
            ><i class="pi pi-angle-right"></i
          ></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [ "itemsCount", "currentPage", "totalItems" ],

  data() {
    return {
      test: "",
      buttonsCount: 5,
    };
  },

  methods: {
    getPageContent(page) {
      if (page < 1) return false;
      // if(page = 1)return false;
      this.$emit("getcontent", page - 1);
      // this.$emit("getcontent", page + 3000);
    },

    nextPage() {
      const next = this.currentPage + 1;
      if (next < this.pages) this.getPageContent(next + 1);
    },

    prevPage() {
      const prev = this.currentPage - 1;
      // if(this.getPageContent<=this.nextPage)return this.getPageContent;
      this.getPageContent(prev + 1);
    }
  },

  computed: {
    startButton() {
      if (this.currentPage < this.buttonsCount) return 1;
      let start = 1;
      if (this.currentPage % this.buttonsCount === 0) start = this.currentPage;
      if (!this.currentPage % this.buttonsCount === 0) start = Math.floor(this.currentPage / this.buttonsCount) * this.buttonsCount;
      return start;
    },

    pages() {
      if (!this.totalItems) return this.itemsCount;
      return Math.ceil(this.totalItems / this.itemsCount);
    }
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
}

.page-btn {
  display: flex;
  height: 30px;
  width: 30px;
  border: 1px solid #8898aa80;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
}

.page-btn:hover {
  cursor: pointer;
}

.disable {
  pointer-events: none; 
  cursor: default !important;
  color: grey;
}
</style>