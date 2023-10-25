<template>
  <div class="row pt-3 my-4">
    <div class="col-md-12">
      <div class="row">
        <div class="col-md-12">
          <div class="row">
            <div class="col-md-2 text-lg-right">
              <label for="groupName" class="font-weight-600">Group name</label>
            </div>
            <div class="col-md-8">
              <el-input
                type="text"
                v-model="name"
                class="w-100 ml-0"
                id="formGroup"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="row mb-2 mt-4">
        <div class="col-md-12">
          <div class="row">
            <div class="col-md-2 text-lg-right">
              <label for="description" class="font-weight-600"
                >Description</label
              >
            </div>
            <div class="col-md-8">
              <el-input
                v-model="description"
                name="description"
                id="description"
                :rows="3"
                type="textarea"
              />

              <div class="d-flex mt-3">
                <div class="input-width">
                  <el-checkbox
                    v-model="isMobileGroup"
                    size="large"
                    class="align-checkbox-totop"
                    :disabled="isMobileGroup"
                  />
                </div>
                <label for="description" class="font-weight-600 ml-3">
                  Enable on Mobile App
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12 d-flex justify-content-end action-btns">
          <router-link to="/tenant/peoplegroups" class="no-decoration">
            <el-button class="mr-2 secondary-button" round>Discard</el-button>
          </router-link>
          <el-button
            :color="primarycolor"
            :loading="savingGroup"
            @click="saveGroupData"
            :disabled="savingGroup"
            round
            >Save</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, nextTick, ref, inject } from "vue";
export default {
  setup() {
    const name = ref("");
    const description = ref("");
    const savingGroup = ref(false);
    const primarycolor = inject('primarycolor')
    const isMobileGroup = ref("")


    const saveGroupData = () => {
        let groupData = {
            name: name.value,
            description: description.value,
            isMobileGroup:  isMobileGroup.value
        }
        axios.post("/api/CreateGroup", groupData)
        .then(() => {
          savingGroup.value = false;
          store.dispatch("groups/setGroups").then(() => {
            router.push("/tenant/peoplegroups");
          })
        })
        .catch((err) => {
          finish();
          savingGroup.value = false;
          console.log(err);
          ElMessage({
            message: "Failed saving group",
            type: "error",
            duration: 5000,
          });
        });
    }

    

    return {
      name,
      saveGroupData,
      savingGroup,
      description,
      primarycolor
    };
  },
};
</script>

<style scoped>
</style>