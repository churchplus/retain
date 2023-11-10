<template>
  <div class="">
    <div
      class=" border-contribution bg-white d-flex  justify-content-between align-items-center exempt-hide"
      @click="setGroupProp" :class="{ 'dropdown-height' : showHeight}"
    >
      <span class="exempt-hide">
        <span v-if="selectedMember.length > 0 && selectedMember.length <= 2">
        <el-tag class="mx-1 mt-1" type="info" v-for="item in selectedMember.slice(0, 3)" :key="item.id">
            <span v-if="item.name" class="">{{ item.name }}</span>
            <span v-else class="">{{ item.text }}</span>
        </el-tag>
        
        </span>
        <span v-if="selectedMember.length > 0 && selectedMember.length > 2">
          <el-tag class="mx-1 mt-1" type="info" v-for="item in selectedMember.slice(0, 3)" :key="item.id">
            <span v-if="item.name" class="">{{ item.name }}</span>
            <span v-else class="">{{ item.text }}</span>
          </el-tag>
          <!-- <span v-for="item in selectedMember.slice(0, 2)" :key="item.id">
            <span v-if="item.name" class="eachGroup">{{ item.name }}</span>
            <span v-else class="eachGroup">{{ item.text }}</span>
          </span> -->
          ...
        </span>
        <span v-if="selectedMember.length === 0">Select</span>
      </span>
      <el-icon class="exemple-hide"><ArrowDown /></el-icon>
    </div>
    <div
      class="div-card p-2 exempt-hide"
      :class="{
        'd-none': hideDiv,
        'd-block': !hideDiv,
      }"
    >
      <el-icon
        v-if="searchForMembers.length === 0"
        class="is-loading text-center exempt-hide"
      >
        <Loading />
      </el-icon>
      <input
        type="text"
        class="form-control exempt-hide"
        v-model="searchMemberText"
        ref="searchMemberRef"
        placeholder="Search"
      />
      <div class="row">
        <div class="col-12 px-3">
          <div>
            <div>
              <el-checkbox
                v-model="allChecked"
                @change="checkAll"
                class="exempt-hide"
              />
              <span class="font-weight-700">&nbsp; &nbsp;Select all</span>
            </div>
          </div>
        </div>
      </div>
      <ul class="px-2 w-100">
        <li
          v-for="(member, index) in searchForMembers"
          :key="index"
          class="px-2 pt-2 c-pointer parent-li border-top exempt-hide"
        >
          <div class="row exempt-hide">
            <div class="text-primary exempt-hide">
              <span>
                <el-checkbox
                  v-model="member.displayCheck"
                  @change="getCheckedGroup(member)"
                  class="exempt-hide all-check"
                />
              </span>
            </div>
            <div class="text-primary exempt-hide">
              <span v-if="member.name" class="p-3 exempt-hide">{{
                member.name
              }}</span>
              <span v-else class="p-3 exempt-hide">{{ member.text }}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { computed, ref, nextTick, inject } from "vue";
export default {
  //  name: "ReportDropdown",
  props: ["items"],
  emits: ["selected-item"],

  setup(props, { emit }) {
    const allChecked = ref(false);
    const displayCheck = ref(false);
    const searchMemberRef = ref();
    const selectedMember = ref([]);
    const showHeight = ref(true)
    const hideDiv = ref(true);
    const selectItem = ref([]);
    const searchMemberText = ref("");

    const setGroupProp = () => {
      hideDiv.value = !hideDiv.value;
      nextTick(() => {
        searchMemberRef.value.focus();
      });
      if(selectedMember.value.length > 0){
        showHeight.value = false
      }else{
        showHeight.value = true
      }
    };
    const checkAll = () => {
      props.items.forEach((i) => {
        if (allChecked.value) {
          i.displayCheck = true;
        } else {
          i.displayCheck = false;
        }
        getCheckedGroup(i);
      });
    };

    const getCheckedGroup = (item) => {
      if (item.displayCheck) {
        const memberIndex = selectedMember.value.findIndex(
          (i) => i.id === item.id
        );
        if (memberIndex < 0) {
          selectedMember.value.push(item);
          emit("selected-item", selectedMember.value);
        }
      } else {
        selectedMember.value = selectedMember.value.filter(
          (i) => i.id !== item.id
        );
        emit("selected-item", selectedMember.value);
      }

      // displayCheck.value = item
    };

    const searchForMembers = computed(() => {
      if (!searchMemberText.value && props.items.length > 0) return props.items;
      return props.items.filter((i) =>
        i.name.toLowerCase().includes(searchMemberText.value.toLowerCase())
      );
    });

    return {
      allChecked,
      checkAll,
      getCheckedGroup,
      setGroupProp,
      searchForMembers,
      searchMemberRef,
      searchMemberText,
      hideDiv,
      displayCheck,
      selectItem,
      selectedMember,
      showHeight,
    };
  },
};
</script>

<style scoped>
li {
  list-style-type: none;
}

li li:hover {
  /* border: 2px solid red; */
  background: rgba(224, 223, 223, 0.46);
}

.dropdown-height{
  height: 2.69rem;
}
.Hide-height{
  height: 0px;
}

.div-card {
  position: absolute;
  background: white;
  z-index: 1;
  width: 100%;
  top: 70px;
  box-shadow: 0 0 11px rgba(33, 33, 33, 0.2);
  max-height: 400px;
  overflow: scroll;
}

.eachGroup {
  padding: 5px 10px;
  background: #eee;
  border-radius: 25px;
  margin: 0 4px;
}
</style>