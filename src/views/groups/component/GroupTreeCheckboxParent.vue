<template>
  <div>
    <div class="py-3 px-2">
      <div class="row">
        <div class="col-12">
          <div>
            <div>
              <Checkbox
                id="binary"
                v-model="allChecked"
                :binary="true"
                class="exempt-hide"
                @change="checkAll"
              />
              <span class="font-weight-700">&nbsp; &nbsp;Select all</span>
            </div>
            
            <div v-if="false">
              <Checkbox
                id="binary"
                v-model="autoCheck"
                :binary="true"
                class="exempt-hide"
              />
              <span class="font-weight-700">&nbsp; &nbsp;Auto check</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <GroupTreeCheckbox
      :items="items"
      :addGroupValue="addGroupValue"
      :allChecked="allChecked"
      @setcheckval="setCheckValue"
      :checked="checked"
      @resetchecked="(payload) => (checked = payload)"
      :autoCheck="autoCheck"
      @newgroup="setNewGroup"
    />
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import GroupTreeCheckbox from "./GroupTreeCheckbox.vue";
import { useStore } from "vuex";
import { watchEffect } from "@vue/runtime-core";
import { onBeforeRouteLeave } from 'vue-router';
export default {
  props: ["items", "addGroupValue"],
  emits: ["filteredGroup"],
  components: {
    GroupTreeCheckbox,
  },
  setup(props, { emit }) {
    const allChecked = ref(false);
    const checked = ref(false);
    const multipleGroupsSelected = ref([]);
    const store = useStore();
    const streamlineGroup = ref([])
    const autoCheck = ref(false)

    const setCheckValue = (payload) => {
      allChecked.value = payload;
    };

    const checkAll = () => {
      checked.value = true;
    };

    watchEffect(() => {
      if (store.getters["groups/checkedGroupChildren"].length > 0) {
        const selectedGroup = store.getters["groups/checkedGroupChildren"];
        selectedGroup.forEach((i) => {
          const getIndex = multipleGroupsSelected.value.findIndex(
            (j) => j.id === i.id
          );
          if (getIndex < 0) {
            multipleGroupsSelected.value.push(i);
          }
        });
        multipleGroupsSelected.value = multipleGroupsSelected.value.filter((i) => i.displayCheck)
        console.log(multipleGroupsSelected.value)
        emit('filteredGroup', multipleGroupsSelected.value)
      }
    });

    onBeforeRouteLeave(() => {
        store.dispatch("groups/setCheckedGroupChildren", []);
        multipleGroupsSelected.value = []
    });

    const setNewGroup = (payload) => {
      emit("newgroup", payload)
    }


    return {
      allChecked,
      setCheckValue,
      checked,
      checkAll,
      multipleGroupsSelected,
      streamlineGroup,
      autoCheck,
      setNewGroup
    };
  },
};
</script>

<style>
</style>