<template>
    <div class="container-fluid">
        <!-- <div>{{attendanceId}}iughyuibui</div> -->
        <div class="row">
            <DataRow :isKioskMode="isKiosk" v-for="(person, index) in listOfPeople" :key="index" @attendancepersonid="attendancePersonId" :person="person" @togglecheckout="toggleCheckout" @togglecheckin="toggleCheckin" />
        </div>

        <div class="row pb-4" v-if="listOfPeople.length === 0" >
          <div class="col-md-12 text-center">
            <p class="my-2">No records found</p>
          </div>
          <div class="col-md-12 d-flex justify-content-center mt-4">
            <el-button
              class=" border-0 text-white"
              :color="primarycolor"
              data-toggle="modal"
              data-target="#exampleModal"
              size="large"
              round
            >
              Add member
            </el-button>
          </div>
        </div>
    </div>
</template>

<script>
import { computed, ref, inject } from 'vue';
import { useRoute } from 'vue-router';
import DataRow from "./MarkAttendanceRow";
import attendanceservice from '../../services/attendance/attendanceservice';
    
    export default {
        props: [ "isKiosk", "searchText", "fetchUsers","attendanceId" ],
        components: { DataRow },
        async setup(props, { emit }) {
            const primarycolor = inject('primarycolor')
            const route = useRoute();
            const people = ref([ ])
            const id = ref(route.query.id ? route.query.id : props.attendanceId)
            const response = await attendanceservice.getReport(id.value);
            people.value = response ? response.peopoleAttendancesDTOs : [ ];
            
            const listOfPeople = computed(() => {
                if (props.fetchUsers === true) {
                    
                    attendanceservice.getReport(id.value)
                    .then(res => {
                        people.value = res.peopoleAttendancesDTOs;
                        emit("refreshed")
                    })
                    .catch(err => console.log(err));

                }
                if (!props.searchText) return people.value;
                return people.value.filter(i => i.name.toLowerCase().includes(props.searchText.toLowerCase()))
            })

            const attendancePersonId = (payload) =>{
                people.value = people.value.filter((i) => i.id !== payload)
            }

            const toggleCheckin = data => {
                const userIndex = people.value.findIndex(i => i.id === data.id);
                if (userIndex >= 0) {
                    people.value[userIndex].isPresent = data.value;
                }
                
            }

            const toggleCheckout = data => {
                const userIndex = people.value.findIndex(i => i.id === data.id);
                if (userIndex >= 0) {
                    people.value[userIndex].isCheckedOut = data.value;
                }
                
                attendanceservice.getReport(route.query.id)
                    .then(res => {
                        people.value = res.peopoleAttendancesDTOs;
                    })
                    .catch(err => {
                        console.log(err);
                    })
                
            }

            return {
                primarycolor,
                people,
                listOfPeople,
                toggleCheckin,
                toggleCheckout,
                attendancePersonId,
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>