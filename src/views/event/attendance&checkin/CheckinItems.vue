<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12">
        <div class="no-person" v-if="(items && items.length === 0) && !errorOccurred  && !loading">
          <div class="empty-img mt-5">
            <p><img src="../../../assets/people/people-empty.svg" alt="" /></p>
            <p class="tip">You have no attendance yet</p>
          </div>
        </div>

        <div class="row" v-if="(items && items.length > 0 ) && !loading">
          <div class="col-md-12 px-0">
            <List
              :list="items"
              @checkedattendance="removeMultipleCheckin"
              :errorOcurred="errorOccurred"
              @attendance-checkin="removeCheckin"
              :totalItems="totalItems"
              @pagedattendance="setPagedAttendance"
            />
          </div>
        </div>
        <div class="row">
              <el-skeleton class="w-100" animated v-if="loading">
                <template #template>
                  <div
                    style="
                      display: flex;
                      align-items: center;
                      justify-content: space-between;
                      margin-top: 20px;
                    "
                  >
                    <el-skeleton-item
                      variant="text"
                      style="width: 240px; height: 240px"
                    />
                    <el-skeleton-item
                      variant="text"
                      style="width: 240px; height: 240px"
                    />
                  </div>
                  <el-skeleton
                    class="w-100 mt-5"
                    style="height: 25px"
                    :rows="20"
                    animated
                  />
                </template>
              </el-skeleton>
            </div>
        <div class="row" v-if="cantGetItems">
          <div class="col-md-12">
            <p>Error getting items, please reload</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import List from "../../../views/event/attendance&checkin/AttendanceAndCheckinList";
import store from "../../../store/store";
import { ref, onMounted } from "vue";

export default {
  components: { List },
  async setup() {
    const items = ref(store.getters["attendance/attendanceserviceitem"].data );
    const loading = ref(false);
    const errorOccurred = ref(false);
    const cantGetItems = ref(false);
    const totalItems = ref(store.getters["attendance/attendanceserviceitem"].totalItems  );
    const getAttendanceItems = async () => {
    try {
      loading.value = true;
      cantGetItems.value = false
      await store.dispatch("attendance/setAttendanceItemData").then((res) => {
        items.value = res.data
        totalItems.value = res.totalItems
        loading.value = false;
        cantGetItems.value = false;
      });
    } catch (error) {
      cantGetItems.value = true;
      console.log(error);
      loading.value = false;
      errorOccurred.value = true;
    }
    }
    const removeCheckin = (payload) => {
      items.value = items.value.filter((i) => i.id !== payload);
    };

    const removeMultipleCheckin = (payload) => {
      items.value = items.value.filter((item) => {
        const y = payload.findIndex((i) => i.id === item.id);
        if (y >= 0) return false;
        return true;
      });
    };

    const setPagedAttendance = (payload) => {
      items.value = payload.items;
    };
    onMounted(() => {
      if ((!items.value) || (items.value && items.value.items && items.value.items.length == 0)){
        getAttendanceItems();
      }
    });

    return {
      items,
      removeMultipleCheckin,
      loading,
      errorOccurred,
      cantGetItems,
      removeCheckin,
      totalItems,
      setPagedAttendance,
    };
  },
};
</script>

<style scoped>
.events {
  font-family: Nunito Sans !important;
}

.whole-con {
  display: flex;
  height: 100vh;
}

.main-con {
  width: 100%;
  height: 70%;
}

.main-body {
  height: 100%;
}

.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}

.buttonn {
  padding: 8px 20px;
  border: none;
  border-radius: 22px;
  font-size: 16px;
  font-weight: 600;
  margin: 0 8px;
  outline: none;
  text-decoration: none;
  box-sizing: border-box;
}

.buttonn:hover {
  cursor: pointer;
}

.no-person {
  height: 100%;
  display: flex;
  text-align: center;
}

.add-person-btn {
  background: #136acd;
  color: #fff;
}

.more-btn {
  background: #dde2e6;
}

.btn-icon {
  padding: 0 8px;
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

@media screen and (min-width: 990px) {
  .main-body {
    width: 95%;
    margin: 0 auto;
  }
}

@media screen and (min-width: 1400px) {
  .main-con {
    width: 90%;
    margin: 0 auto;
  }

  .top {
    height: 90px;
  }

  .no-person {
    height: calc(100% - 90px);
  }
}

@media (max-width: 640px) {
  .top {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .actions {
    margin-top: 15px;
  }
}

@media (max-width: 566px) {
  /* .button {
        width: 160px;
    } */
}

@media (max-width: 399px) {
  .actions {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .button {
    margin-top: 10px;
  }
}
</style>