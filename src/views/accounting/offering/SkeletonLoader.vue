<template>
    <div>
        <div class="row">
    <div class="col-md-12">
      <div class="row my-2 d-md-flex justify-content-between">
        <div class="col-6 col-sm-4">
          <Skeleton width="100%" height="200px" shape="circle" />
        </div>
        <div class="col-6 col-sm-4">
          <Skeleton width="100%" height="200px" shape="circle" />
        </div>
        <div class="col-6 col-sm-4">
          <Skeleton width="100%" height="200px" shape="circle" />
        </div>
      </div>

      <div
        class="row my-2 d-md-flex justify-content-center"
        v-for="i in 10"
        :key="i"
      >
        <div class="col-md-2 my-2">
          <Skeleton width="100%" height="2rem" borderRadius="16px" />
        </div>
        <div class="col-md-2 my-2">
          <Skeleton width="100%" height="2rem" borderRadius="16px" />
        </div>
        <div class="col-md-2 my-2">
          <Skeleton width="100%" height="2rem" borderRadius="16px" />
        </div>
        <div class="col-md-2 my-2">
          <Skeleton width="100%" height="2rem" borderRadius="16px" />
        </div>
        <div class="col-md-2 my-2">
          <Skeleton width="100%" height="2rem" borderRadius="16px" />
        </div>
        <div class="col-md-2 my-2">
          <Skeleton width="100%" height="2rem" borderRadius="16px" />
        </div>
      </div>
    </div>
  </div>
    </div>
</template>

<script>
export default {
    setup () {
        return {}
    }
}
</script>

<style scoped>

</style>