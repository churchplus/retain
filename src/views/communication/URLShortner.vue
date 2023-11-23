<template>
  <div>
    <Header headerName="URL Manager" />
    <el-main>
      <div class="d-flex justify-content-end">
        <div class="mt-3 mt-sm-0">
          <router-link :to="`/tenant/people/add`" class="no-decoration">
            <el-button :color="primarycolor" class="ml-2 header-btn" size="large"
              >Create link</el-button
            >
          </router-link>
        </div>
      </div>
      <div class="mt-5">
        <!-- @checkedrow="handleSelectionChange"
                v-loading="loadingMembers"
                v-if="groupMembers.length > 0 || loadingMembers == true" -->

        <Table :headers="linkHeaders" :checkMultipleItem="false" :data="[]">
          <!-- <template #name="{ item }">
                  <span>{{ item.name }}</span>
                </template>
                <template v-slot:email="{ item }">
                  <span>{{ item.email }}</span>
                </template>
                <template v-slot:phone="{ item }">
                  <span>{{ item.phone }}</span>
                </template>
                <template v-slot:action="{ item }">
                  <el-dropdown>
                    <el-icon id="dropdownMenuButton" data-toggle="dropdown">
                      <MoreFilled />
                    </el-icon>
                    <template #dropdown>
                      <el-dropdown-menu>
                        <el-dropdown-item>
                          <a @click="displaySMSDialog(item)"> Send SMS</a>
                        </el-dropdown-item>
                        <el-dropdown-item>
                          <a @click="displayEmailDialog(item)">Send Email</a>
                        </el-dropdown-item>
                        <el-dropdown-item>
                          <a @click="archive(item.personID, 'single')"> Archive </a>
                        </el-dropdown-item>
                        <el-dropdown-item>
                          <a @click="confirmDelete(item.id, index)">Remove</a>
                        </el-dropdown-item>
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                </template> -->
        </Table>
      </div>
    </el-main>
  </div>
</template>

<script>
import Header from "@/components/header/Header.vue";
import Table from "@/components/table/Table";

export default {
  components: {
    Header,
    Table,
  },
  inject: ["primarycolor"],
  name: "Test",
  created() {},
  data() {
    return {
      linkHeaders: [
        { name: "NAME", value: "name" },
        { name: "Date Created", value: "dateCreated" },
        { name: "Total Click", value: "totalClick" },
        { name: "Action", value: "action" },
      ],
    };
  },
  props: {},
  methods: {},
};
</script>

<style lang="scss" scoped></style>
