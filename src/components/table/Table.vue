<template>
  <el-dropdown trigger="click" class="el-dropdown w-100 py-2 d-flex justify-content-end">
    <span class="el-dropdown-link">
      <el-tooltip
        class="box-item"
        effect="dark"
        content="Export data on table to excel"
        placement="top-start"
      >
      <el-button type="" class="mr-3" text bg>
      Export to excel<el-icon class="el-icon--right"><Download /></el-icon>
    </el-button>
      </el-tooltip>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item v-for="(bookType, index) in bookTypeList" :key="index">
          <div @click="downloadFile(bookType)">
            {{ bookType.name }}
          </div>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <div ref="scrollRef">
    <div class="table-parent">
      <table class="table-border w-100">
        <thead class="table-head mobile">
          <tr>
            <th v-if="checkMultipleItem">
              <el-checkbox
                v-model="checked"
                @change="checkAllRows"
                :indeterminate="isIndeterminate"
                :checked="data.length > 0 && data.length === checkedRow.length"
                size="large"
              />
            </th>
          </tr>
        </thead>
        <thead class="table-head desktop">
          <tr>
            <th v-if="checkMultipleItem">
              <el-checkbox
                v-model="checked"
                @change="checkAllRows"
                :indeterminate="isIndeterminate"
                :checked="data.length > 0 && data.length === checkedRow.length"
                size="large"
              />
            </th>
            <th
              v-for="(head, index) in headers"
              :key="index"
              :class="{ 'py-3': !checkMultipleItem }"
            >
              <h2>{{ head.name }}</h2>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in dataInView" :key="index">
            <td v-if="checkMultipleItem">
              <el-checkbox
                v-model="item.check"
                @change="checkSingleRow(index)"
                size="large"
              />
            </td>
            <td
              v-for="(head, index) in headers"
              :key="index"
              :class="{ 'py-2': !checkMultipleItem }"
            >
              <span>
                <h2>{{ head.name }}</h2>
              </span>
              <slot :name="head.value" v-bind:item="item">-</slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="infinite-loader" v-if="tableInfiniteLoading">
      <el-icon class="is-loading">
        <Loading />
      </el-icon>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watchEffect } from "vue";
import getData from "@/services/loading/loading";
import exportService from "../../services/exportFile/exportservice";

export default {
  emits: ["checkedrow"],
  props: {
    data: {
      type: Array,
      required: true,
      default: () => ({}),
    },
    headers: {
      type: Array,
      required: true,
      default: () => ({}),
    },
    checkMultipleItem: {
      type: Boolean,
      required: false,
      default: () => ({}),
    },
  },
  setup(props, { emit }) {
    const table = ref("tbale");
    const checked = ref(false);
    const checkedRow = ref([]);
    const isIndeterminate = ref(false);
    const scrollRef = ref(null);
    const foo_data = ref([]);
    const dataInView = ref(getData(foo_data.value, 10));
    const initialNumber = ref(10);
    const tableInfiniteLoading = ref(false);
    const fileHeaderToExport = ref([]);
    const fileToExport = ref([]);
    const bookTypeList = ref([
      { name: "Excel (.xlsx)", value: "xlsx" },
      { name: "Comma Seperated Value (.csv)", value: "csv" },
      { name: "Text (.txt)", value: "txt" },
      // { name: "pdf" },
    ]);

    const checkSingleRow = (index) => {
      const currentRow = props.data[index];
      if (currentRow.check) {
        checkedRow.value.push(currentRow);
      } else {
        const findRow = checkedRow.value.findIndex((i) => i.id === currentRow.id);
        if (findRow >= 0) {
          checkedRow.value = checkedRow.value.filter((i) => i.id !== currentRow.id);
        }
      }
      isIndeterminate.value =
        checkedRow.value.length > 0 && checkedRow.value.length < props.data.length;
      emit("checkedrow", checkedRow.value);
    };

    const checkAllRows = () => {
      isIndeterminate.value = false;
      if (checked.value) {
        checkedRow.value = props.data;
        props.data.map((i) => {
          i.check = true;
          return i;
        });
      } else {
        checkedRow.value = new Array();
        props.data.map((i) => {
          i.check = false;
          return i;
        });
      }
      emit("checkedrow", checkedRow.value);
    };

    onMounted(() => {
      window.addEventListener("scroll", handleScroll);
    });

    const loadMoreData = () => {
      tableInfiniteLoading.value = true;
      initialNumber.value += 10;
      let getMoreData = getData(props.data, initialNumber.value);
      if (getMoreData.length <= props.data.length) {
        dataInView.value = getMoreData;
      }

      if (getMoreData.length === props.data.length) {
        tableInfiniteLoading.value = false;
      }
    };

    const handleScroll = (e) => {
      const element = scrollRef.value;
      setTimeout(() => {
        if (element !== null) {
          if (element.getBoundingClientRect().bottom < window.innerHeight) {
            tableInfiniteLoading.value = true;
            // Load more post
            loadMoreData();
          }
        }
      }, 1000);
    };

    const downloadFile = (item) => {
      exportService.downLoadExcel(
        item.value,
        null,
        "Table_Data",
        fileHeaderToExport.value,
        fileToExport.value
      );
    };

    watchEffect(() => {
      if (props.data && props.data.length > 0) {
        foo_data.value = props.data;
        dataInView.value = getData(foo_data.value, 10).filter((i) => i !== null);

        setTimeout(() => {
          fileHeaderToExport.value = props.headers.map(i => i.value)
          fileToExport.value = props.data.map(obj => {
            let newObj = {};
            props.headers.forEach((prop, index) => {
                newObj[index] = obj[prop.value];
            });
            return newObj;
        })
        }, 1000);
      }
    });

    return {
      table,
      checked,
      checkedRow,
      checkSingleRow,
      checkAllRows,
      isIndeterminate,
      scrollRef,
      dataInView,
      initialNumber,
      tableInfiniteLoading,
      foo_data,
      bookTypeList,
      downloadFile,
      fileHeaderToExport,
      fileToExport
    };
  },
};
</script>

<style scoped>
.table-parent {
  max-width: 100%;
  overflow-x: scroll;
}

.table-border {
  border: 1px solid rgb(212, 221, 227);
  color: #47545c;
  box-sizing: border-box;
}

/* .table-head {
    background: #ecf0f3;
    height: 56px;
} */

.table-head h2 {
  font-weight: 600;
  /* font-weight: bold; */
  font-size: 15px;
  font-style: normal;
  text-transform: lowercase;
  margin: 0;
  color: #646464;
  /* color: #172B4D; */
}
.table-head h2:first-letter,
.table-head h2:first-line {
  text-transform: capitalize;
}

tbody tr td {
  font-size: 14px;
  /* font-weight: 600; */
}
tbody h2 {
  font-weight: 600;
  font-size: 15px;
  font-style: normal;
  text-transform: lowercase;
  margin: 0;
  color: #646464;
}
tbody h2:first-letter,
tbody h2:first-line {
  text-transform: capitalize;
}

table td,
table th {
  padding: 0px 10px;
}

table tbody tr,
table thead tr {
  /* height: 60px; */
  border-bottom: 1px solid #d4dde3;
}

table tbody tr:hover {
  background-color: #fafafa;
}

table tbody tr:nth-child(even) {
  background-color: #fafafa;
}

table tbody tr td:first-child input {
  width: 20px;
}

tbody td span {
  display: none;
}

thead.mobile {
  display: none;
}

.infinite-loader {
  display: flex;
  justify-content: center;
  font-size: 30px;
  margin: 10px 0;
}

@media (max-width: 996px) {
  thead.desktop {
    display: none;
  }

  thead.mobile {
    display: flex;
  }

  tbody tr,
  thead tr {
    display: flex;
    flex-direction: column;
  }

  tbody td {
    display: flex;
    justify-content: space-between;
  }

  tbody td span {
    display: block;
  }

  table tbody tr {
    padding-bottom: 5px;
    padding-top: 5px;
  }

  table td {
    padding: 7px 10px;
  }
  table tbody tr td:nth-child(even) {
    background: #f1f5f8;
  }
}

div.el-dropdown {
    border: 1px solid #e0e0e0;
    border-bottom: none;
}
</style>
