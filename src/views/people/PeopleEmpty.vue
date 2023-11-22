<template>
  <PeopleList :list="peopleInStore" :totalItems="totalItems" v-if="!loading && (peopleInStore && peopleInStore.length > 0 || errorGettingPeople)" />
  <div class="no-person mt-5" v-else-if="!loading && peopleInStore && peopleInStore.length === 0 && !errorGettingPeople">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <ImportPeople />
        </div>
      </div>
    </div>
  </div>

  <el-skeleton class="w-100" animated v-if="loading && peopleInStore && peopleInStore.length === 0">
    <template #template>
      <div style="display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 20px
          "
        >
          <el-skeleton-item variant="text" style="width: 240px; height: 240px" />
          <el-skeleton-item variant="text" style="width: 240px; height: 240px" />
        </div>
        <!-- <el-skeleton-item variant="text" class="w-100" style="height: 25px" :rows="10"/> -->
        <el-skeleton class="w-100 mt-5" style="height: 25px"  :rows="20" animated />
    </template>
  </el-skeleton>
</template>

<script>
import { ref, onMounted } from "vue";
import PeopleList from "@/views/people/PeopleList.vue";
import ImportPeople from "@/views/people/ImportPeople.vue";
import { useStore } from 'vuex';
import store from '../../store/store'

export default {
  components: { PeopleList, ImportPeople },

  setup() {
    const people = ref([]);
    const loading = ref(false);
    const errorGettingPeople = ref(false);
    const dataStore = useStore();
    const totalItems = ref(dataStore.getters['membership/members'].totalItems)
    const peopleInStore = ref(dataStore.getters['membership/members'].data)

    const getMembers = async () => {
      loading.value = true
      store.dispatch('membership/setMembers').then(res => {
        peopleInStore.value = res.data
        totalItems.value = res.totalItems
        loading.value = false
      })
    }
    

    onMounted(() => {
      if ( (!peopleInStore.value) || (peopleInStore.value  && peopleInStore.value.length == 0)) {
        getMembers()
      }
    });


    return {
      people,
      peopleInStore,
      totalItems,
      loading,
      errorGettingPeople,
    };
  },
};
</script>

<style scoped>
.main-body {
  height: 100%;
}

.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}

.no-person {
  height: 100%;
  display: flex;
  text-align: center;
}

.empty-img {
  width: 30%;
  min-width: 397px;
  margin: auto;
}

.empty-img img {
  width: 100%;
  max-width: 200px;
}

.tip {
  color: #02172e;
  font-size: 20px;
  font-weight: 600;
}

@media screen and (min-width: 990px) {
  .main-body {
    width: 90%;
    /* max-width: 1200px; */
    margin: 0 auto;
  }
}

@media screen and (min-width: 1200px) {
  .main-con {
    width: 80%;
    margin: 0 auto;
  }

  .top {
    height: 90px;
  }

  .no-person {
    height: calc(100% - 90px);
  }
}
</style>