<template>
  <div class="container-fluid">
    <div class="row over-con">
      <div class="col-md-12">
        <div class="row py-2 tb-row" :class="{ 'kiosk-tb-size': isKioskMode }">
          <div class="col-md-2" :class="{ 'order-3': isKioskMode }">
            <span class="d-flex justify-content-between">
              <span class="hidden-header hide font-weight-700">Name</span>
              <span
                ><a>{{ person.name }}</a></span
              >
            </span>
          </div>
          <div class="col-md-2" :class="{ 'order-4': isKioskMode }">
            <span class="d-flex justify-content-between">
              <span class="hidden-header hide font-weight-700"
                >Phone Number</span
              >
              <span>{{ person.phone }}</span>
            </span>
          </div>
          <div class="col-md-2" :class="{ 'order-4': isKioskMode }">
            <span class="d-flex justify-content-between">
              <span class="hidden-header hide font-weight-700"
                >Registered</span
              >
              <span>{{ person.isRegistered ? "Yes" : "No" }}</span>
            </span>
          </div>
          <div class="col-md-2" :class="{ 'order-1': isKioskMode }">
            <span class="d-flex justify-content-between">
              <span class="hidden-header hide font-weight-700">Check in</span>
              <span>
                 <el-checkbox class="custom-checkbox"  :checked="person.isPresent" @change="checkin($event, 1)"
                  :disabled="checking"  />
              </span>
            </span>
          </div>
          <div
            class="col-md-2 d-none"
            :class="{ 'order-1 d-flex': isKioskMode }"
          >
            <span class="d-flex justify-content-between">
              <span class="hidden-header hide font-weight-700">Picture</span>
              <span
                style="
                  width: 35px;
                  height: 35px;
                  border: 1px solid;
                  border-radius: 50%;
                "
              ></span>
            </span>
          </div>
          <div class="col-md-2" :class="{ 'd-none': isKioskMode }">
            <span class="d-flex justify-content-between">
              <span class="hidden-header hide font-weight-700">Check out</span>
              <span>
                <!-- <Checkbox
                  id="binary"
                  :value="person.isCheckedOut"
                  :binary="true"/> -->
                  <el-checkbox class="custom-checkbox"  :checked="person.isCheckedOut" @change="checkin($event, 2)"
                  :disabled="checking"  />
              </span>
            </span>
          </div>
          <div class="col-md-2" :class="{ 'd-none': isKioskMode }">
            <span class="d-flex justify-content-between">
              <span class="hidden-header hide font-weight-700">Action</span>
              <span>
                <div
                      class="text-decoration-none"
                      @click="showConfirmModal(person)"
                    >
                     <el-icon class="text-danger" ><Delete /></el-icon>
                    </div>
              </span>
            </span>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <el-dialog v-model="display" title="Print Tag"
              :width="mdAndUp || lgAndUp || xlAndUp ? `50%` : `90%`">
              <div class="row">
                <div class="col-md-8">
                  <MemberTag />
                </div>
              </div>
            </el-dialog>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import MemberTag from "../../views/event/attendance&checkin/AttendanceTag";
import axios from "@/gateway/backendapi";
import attendanceservice from "../../services/attendance/attendanceservice";
import finish from "../../services/progressbar/progress";
import deviceBreakpoint from "../../mixins/deviceBreakpoint";
import { ElMessage, ElMessageBox } from 'element-plus'

export default {
  props: ["isKioskMode", "person"],
  components: { MemberTag },
  setup(props, { emit }) {
    const checkedIn = ref(false);
    const checkedOut = ref(false);
    const display = ref(false);
    const checking = ref(false);
    const { mdAndUp, lgAndUp, xlAndUp, xsOnly } = deviceBreakpoint()

    const checkin = async (e, option) => {
      console.log(option, "hhjjjjj");
      let response = {};
      if (option === 1) {
        try {
          response = await attendanceservice.checkin({
            checkInAttendanceID: props.person.attendanceID,
            personAttendanceID: props.person.id,
          });
          emit("togglecheckin", {
            value: !props.person.isPresent,
            id: props.person.id,
          });

          ElMessage({
            type: `${e ? "success" : "info"}`,
            message: `${ e ? "Checked" : "Unchecked" } Successfully`,
            duration: 5000,
          });
          ElMessage({
            type: `${e ? "success" : "info"}`,
            message: `Member marked ${e ? "present" : "absent"}`,
            duration: 5000,
          });
        } catch (error) {
          ElMessage({
            type: "error",
            message: "Checkin was not successful",
            duration: 5000,
          });
          emit("togglecheckin", {
            value: props.person.isPresent,
            id: props.person.id,
          });
        }
      } else {
        try {
          checking.value = true;
          response = await attendanceservice.checkout({
            checkInAttendanceID: props.person.attendanceID,
            personAttendanceID: props.person.id,
          });
          checking.value = false;

          if (response.trim() === "User Was Not Checked In Earlier") {
             ElMessage({
              type: "info",
              message: response,
              duration: 5000,
            });

            emit("togglecheckout", { value: false, id: props.person.id });
          } else {
            emit("togglecheckout", {
              value: !props.person.isCheckedOut,
              id: props.person.id,
            });
            ElMessage({
              type: `${e ? "success" : "info"}`,
              message: `${response} , Member has ${ e ? "checked out" : "not checked out" }`,
              duration: 5000,
            });
          }
        } catch (error) {
          checking.value = false;
          ElMessage({
              type: "error",
              message: "Checkin was not successful",
              duration: 5000,
            });
          emit("togglecheckout", {
            value: props.person.isCheckedOut,
            id: props.person.id,
          });
        }
      }
      console.log(response, "rrr");
    };
    const showConfirmModal = (item) => {
      console.log(item, "nnjnnjnjk");
       ElMessageBox.confirm(
        "Are you sure you want to proceed?",
        "Confirm delete",
        {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "error",
        }
      )
        .then(() => {
          deleteCheckinAttendance(item);
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "Rejected",
            duration: 5000,
          });
        });
    };

    const deleteCheckinAttendance = (item) => {
      axios
        .delete(`/api/CheckInAttendance/DeletePersonEventAttendance?id=${item.id}&checkInAttendanceId=${item.attendanceID}`)
        .then((res) => {
          if (res.data) {
            ElMessage({
                type: "success",
                message: "CheckInAttendance Deleted",
                duration: 5000,
              });
              // props.person.filter((i) => i.id !== item.id);
            emit("attendancepersonid", item.id);
          } else {
            ElMessage({
                type: "warning",
                message: "Delete Failed, Please Try Again",
                duration: 5000,
              });
          }
        })
        .catch((err) => {
          console.log(err)
          finish();
          // if (err.response)
          //  {
            ElMessage({
                type: "error",
                message:  "Delete Failed, Please Try Again",
                duration: 5000,
              });
          // }
        });
    };

    const checkout = () => {
      console.log(checkedOut.value, "checked in");
    };


    return {
      checkedIn,
      deleteCheckinAttendance,
      showConfirmModal,
      mdAndUp, 
      lgAndUp, 
      xlAndUp, 
      xsOnly,
      checkin,
      checkedOut,
      checkout,
      display,
      checking,
    };
  },
};
</script>

<style scoped>
/* * {
  color: #02172e;
  font-family: Nunito Sans !important;
} */

.hide {
  display: none !important;
}

@media screen and (max-width: 767px) {
  .main-th {
    display: none;
  }

  .hide {
    display: flex !important;
  }
}

.search-control {
  width: calc(100% - 30px);
  padding: 0.38rem;
  border: none;
  background: transparent;
  outline: transparent;
}

.search-span {
  background: #f5f8f9;
  border-radius: 200px;
  width: 100%;
}

.kiosk-mode {
  background: #dde2e6;
  border-radius: 20px;
  border: transparent;
}

.main-th {
  background: #f5f8f9;
  border: 1px solid #4762f01f;
}

.tb-row {
  border-bottom: 1px solid #4762f01f;
}

.over-con {
  border: 1px solid #4762f01f;
}

.kiosk-th-size {
  font-size: 20px;
}

.kiosk-tb-size {
  font-size: 18px;
}

.modal-lg {
  max-width: 600px;
}

.custom-checkbox {
  /* border: 2px solid red !important; */
  background: #ffffff;
  width: 20px !important;
  height: 20px;
  color: #495057;
  border-radius: 3px;
  transition: background-color 0.2s, color 0.2s, border-color 0.2s,
    box-shadow 0.2s;
}
</style>