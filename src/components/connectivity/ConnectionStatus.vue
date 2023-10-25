<template>
  <div>
      <div class="container-fluid">
          <div class="row">
              <div class="col-md-12 px-0 text-center" :class="{ 'minimized online-bar': onLine && !showBackOnline, 'maximized offline-bar': !onLine}">
                  <p class="mb-0 font-weight-bold" v-if="!onLine">You 're not connected</p>
                  <p class="mb-0 font-weight-700 text-white" v-if="showBackOnline">You're back online</p>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  data() {
     return {
        onLine: navigator.onLine ? true : false,
        showBackOnline: false,
    }
 },

 methods: {
     checkStatus() {
         this.onLine = navigator.onLine;
     }
 },

 watch: {
    onLine: function () {
        if(this.onLine === true){
            this.showBackOnline = true;
            setTimeout(()=>{ this.showBackOnline = false; }, 1000);
        }
    },
},

created() {
    setInterval(() => this.checkStatus(), 1000)
}
};
</script>

<style scoped>

    .offline-bar {
        background: #E60023;
        color: #fff;
        /* background: #00204412; */
    }

    online-bar {
        background: rgb(3, 150, 11);
        color: #fff
    }

    .minimized {
        height: 0;
        transition: all .5s ease-in-out;
        overflow: hidden;
    }

    .maximized {
        height: 25px;
        transition: all .5s ease-in-out;
        overflow: hidden;
    }
</style>