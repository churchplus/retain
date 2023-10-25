<template>
  <div class="col-md-12 p-0 scroll-table">
    <table class="table table-hover" style="border-radius: 0" id="table">
      <thead>
        <tr class="table-row-bg font-weight-bold">
          <th class="">Name</th>
          <th class="">Phone</th>
          <th class="">Email</th>
          <th class="">Group</th>
          <th
            class="centralize"
            v-for="(item, index) in dynamicCustomFields"
            :key="index"
          >
            {{ item.label }}
          </th>
          <th
            class="rotate-text"
            v-for="(item, index) in groupedReportByDate"
            :key="index"
          >
            {{ formatDate(item.value[0].activityDate) }}
          </th>
          <th class="rotate-text">Absent</th>
          <th class="rotate-text">Present</th>
          <th class="rotate-text">Percentages</th>
        </tr>
        <tr class="table-row-bg font-weight-bold">
          <th class=""></th>
          <th class="text-right text-primary" colspan="3">
            Total Present / Total absent
          </th>
          <th
            class="text-primary"
            v-for="(item, index) in groupedReportByDate"
            :key="index"
          >
            {{ item.value.filter((i) => i.attendance.toLowerCase() == "p").length }}
            /
            {{ item.value.filter((i) => i.attendance.includes("--")).length }}
          </th>

          <th class=""></th>
          <th class=""></th>
          <th class="" :colspan="dynamicCustomFields.length + 1"></th>
        </tr>
      </thead>
      <tbody class="small-text font-weight-bold text-nowrap">
        <tr v-for="(item, index) in groupedReport" :key="index">
          <td>{{ item.value[0].name }}</td>
          <td>{{ item.value[0].phone }}</td>
          <td>{{ item.value[0].email }}</td>
          <td>{{ item.value[0].groupName }}</td>
          <td
            v-show="item.value[0].customAttributeData.length > 0"
            v-for="(itemm, index) in dynamicCustomFields"
            :key="index"
          >
            {{ getMemberCustomAttributeData(item.value[0].customAttributeData, itemm) }}
          </td>
          <td
            v-show="item.value[0].customAttributeData.length === 0"
            v-for="(itemm, index) in dynamicCustomFields.length"
            :key="index"
          >
            {{ "--" }}
          </td>
          <td v-for="(itemm, index) in groupedReportByDate" :key="index">
            {{
              itemm.value.find((i) => i.personId === item.value[0].personId)
                ? itemm.value.find((i) => i.personId === item.value[0].personId)
                    .attendance
                : ""
            }}
          </td>
          <td class="text-danger">
            {{ attendance(item.value[0].personId, 1) }}
          </td>
          <td class="text-success">
            {{ attendance(item.value[0].personId, 2) }}
          </td>
          <td>{{ attendance(item.value[0].personId, 3) }}</td>

          <!-- <td class="text-success">
            {{(attendance(item.value[0].personId, 2)) + (attendance(item.value[0].personId, 2)) }}
          </td>
           <td class="text-danger">
            {{ (attendance(item.value[0].personId, 1)) + (attendance(item.value[0].personId, 1)) }} 
          </td> -->
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { onMounted, ref, watchEffect } from "vue";
import allCustomFields from "../../../services/customfield/customField";
import dateFormatter from "../../../services/dates/dateformatter"
export default {
  props: ["groupedReport", "groupedReportByDate"],
  emits: ["data-to-export", "data-header-to-export"],

  setup(props, { emit }) {
    const searchText = ref("");
    const searchIsVisible = ref(false);
    const filterFormIsVissible = ref(false);
    const filterGroupReport = ref([]);

    const toggleSearch = () => {
      searchIsVisible.value = !searchIsVisible.value;
    };

    const toggleFilterFormVissibility = () => {
      filterFormIsVissible.value = !filterFormIsVissible.value;
    };
    const holdThePresentee = ref([]);
    const holdAllAbsentee = ref([]);
    onMounted(() => {
      props.groupedReportByDate.forEach((i) => {
        let findPresentee = i.value.filter((i) => i.attendance.toLowerCase() === "p");
        console.log(findPresentee, "i love Jesus");
        const uniqueObjects = {};
        for (const object of findPresentee) {
          if (!uniqueObjects.hasOwnProperty(object.name)) {
            uniqueObjects[object.name] = object;
          }
        }
        return holdThePresentee.value.push(uniqueObjects);
      });

      props.groupedReportByDate.forEach((i) => {
        let findAbsentee = i.value.filter((i) => i.attendance.includes("--"));
        console.log(findAbsentee, "i love God");
        const uniqueObjects = {};
        for (const object of findAbsentee) {
          if (!uniqueObjects.hasOwnProperty(object.name)) {
            uniqueObjects[object.name] = object;
          }
        }
        return holdThePresentee.value.push(uniqueObjects);
      });
      console.log(holdThePresentee.value, "llllll");
    });

    const attendance = (personId, type) => {
      let attendance = [];
      let absentee = [];
      let presentee = [];
      props.groupedReportByDate.forEach((i) => {
        let findAbsentee = i.value.find((i) => {
          if (i.personId === personId) {
            return i;
          }
        });
        attendance.push(findAbsentee);
      });
      let filteredAttendance = attendance.filter((i) => i !== undefined);
      filteredAttendance.forEach((i) => {
        if (i.attendance === "--") {
          absentee.push(i);
        } else {
          presentee.push(i);
        }
      });

      // const getAttendance = () => {

      // }
      // getAttendance()

      let percentage = (+presentee.length / +filteredAttendance.length) * 100;
      // const letaArray =  []
      // letaArray.push(presentee)
      // console.log(letaArray, 'kkkkk');
      //  console.log(presentee, 'presentee');
      //   console.log(absentee, 'absentee');
      if (type === 1) return absentee.length;
      if (type === 2) return presentee.length;
      if (type === 3)
        return percentage.toString().includes(".")
          ? percentage.toFixed(2) + "%"
          : percentage + "%";
    };

    const formatDate = (date) => {
      return dateFormatter.monthDayYear(date);
    };

    const attendanceGrouped = (array, key) => {
      let result = array.reduce((result, currentValue) => {
        // If an array already present for key, push it to the array. Else create an array and push the object
        (result[currentValue[key]] = result[currentValue[key]] || []).push(currentValue);
        // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
        return result;
      }, {}); // empty object is the initial value for result object
      let attendanceGroup = [];
      for (const prop in result) {
        attendanceGroup.push({
          name: prop,
          value: result[prop],
        });
      }
      console.log(attendanceGroup);
      return attendanceGroup;
    };

    const tableHeaderToJson = () => {
      // let _htmlToJSON = function(){
      // let _tr = _table.getElementsByTagName("tr")[index];
      let _th = document.getElementsByTagName("th");
      let _arr = [].map
        .call(_th, function (th) {
          return th.innerHTML;
        })
        .join("|");
      let _data = _arr.split("|");
      console.log(_data);
      console.log("html to JSON", _data);
      emit("data-header-to-export", _data);
      // };
      // _htmlToJSON();
    };

    const tableToJson = () => {
      let _table = document.getElementById("table");
      let _trLength = _table.getElementsByTagName("tr").length;
      let _jsonData = [];
      let _obj = {};

      let _htmlToJSON = function (index) {
        let _tr = _table.getElementsByTagName("tr")[index];
        let _td = _tr.getElementsByTagName("td");
        let _arr = [].map
          .call(_td, function (td) {
            return td.innerHTML;
          })
          .join("|");
        let _data = _arr.split("|");
        // console.log(_data)

        _obj = Object.assign({}, _data);

        _jsonData.push(_obj);
      };
      for (var i = 1; i < _trLength; i++) {
        _htmlToJSON(i);
      }
      console.log("html to JSON", _jsonData);
      emit("data-to-export", _jsonData);
    };

    watchEffect(() => {
      if (props.groupedReport.length > 0) {
        setTimeout(() => {
          tableHeaderToJson();
          tableToJson();
        }, 1000);
      }
    });

    const dynamicCustomFields = ref([]);
    const getCustomFields = async () => {
      try {
        let data = await allCustomFields.allCustomFields();
        dynamicCustomFields.value = data.filter((i) => i.entityType === 4);
      } catch (err) {
        console.log(err);
      }
    };
    getCustomFields();

    const getMemberCustomAttributeData = (memberCustomData, singleCustomField) => {
      console.log(memberCustomData, 'er');
      if (memberCustomData && memberCustomData.length === 0) return "--";
      const findData = memberCustomData.findIndex(
        (i) => i.customAttribute.id === singleCustomField.id
      );
      if (findData >= 0) return memberCustomData[findData].data;
      return "--";
    };

    return {
      searchIsVisible,
      toggleSearch,
      holdThePresentee,
      searchText,
      filterFormIsVissible,
      toggleFilterFormVissibility,
      filterGroupReport,
      holdAllAbsentee,
      formatDate,
      attendanceGrouped,
      attendance,
      dynamicCustomFields,
      getMemberCustomAttributeData,
    };
  },
};
</script>

<style scoped>
.rotate-text {
  text-orientation: mixed;
  writing-mode: vertical-rl;
}

.table-row-bg {
  background: #ebeff4;
}

.scroll-table {
  overflow-x: auto;
}

.table thead th:nth-child(1),
.table thead th:nth-child(2),
.table thead th:nth-child(3),
.table thead th:nth-child(4),
.centralize {
  vertical-align: middle;
  border-bottom: 2px solid #dee2e6;
}
</style>
