<template>
    <div class="container">
        <div class="row th py-2">
            <div class="col-md-2">
                <span class="py-2 font-weight-700">Picture</span>
            </div>
            <div class="col-md-3">
                <span class="py-2 font-weight-700">Name</span>
            </div>
            <div class="col-md-3">
                <span class="py-2 font-weight-700">Group</span>
            </div>
            <div class="col-md-2">
                <span class="py-2 font-weight-700">Check in</span>
            </div>
            <div class="col-md-2">
                <span class="py-2 font-weight-700">Check out</span>
            </div>
        </div>

        <div class="row">
            <div class="col-md-12 px-0">
                <!-- <CheckinRow :checkinList="registeredMembers"/> -->
                <div class="container">
                    <div class="row py-2" v-for="item in registeredMembers ? registeredMembers.registeredMember : []" :key="item.id">
                        <div class="col-md-2">
                            <div class="ward-img-box">
                                <img :src="item.person ? item.person.pictureUrl : ''" class="member-image" v-if="item.person ? item.person.pictureUrl : ''"/>
                            </div>
                        </div>
                        <div class="col-md-3  d-flex align-items-center">
                            <span class="py-2">{{ item.person.firstName }} {{ item.person.lastName }}</span>
                        </div>
                        <div class="col-md-3  d-flex align-items-center">
                            <span class="py-2">{{ item.group }}</span>
                        </div>
                        <div class="col-md-2  d-flex align-items-center">
                            <span class="py-2">
                                <Checkbox :binary="true" @change="checkIn(item)" v-model="item.isCheckedIn" />
                            </span>
                        </div>
                        <div class="col-md-2 d-flex align-items-center">
                            <span class="py-2">
                                <Checkbox :binary="true" @change="checkOut(item)" :disabled="!item.isCheckedIn" v-model="item.isCheckedOut"/>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Toast />
    </div>
</template>

<script>

import axios from "@/gateway/backendapi";
import { useToast } from "primevue/usetoast";
export default {
    props: ['registeredMembers', 'updatedGuardian'],
   
    
    setup (props, { emit }) {
        
        const toast = useToast()
        const checkIn = async(item) => {
            console.log(item)
            let checkInUser = {
                personAttendanceId: item.id,
                isPresent: true,
                isCheckedIn: true,
                checkInById: Object.keys(props.updatedGuardian).length > 0 ? props.updatedGuardian.person.id : item.checkedInBy,
            }

            console.log(checkInUser)

            try {
                let res = await axios.post('/api/CheckInAttendance/MarkAttendance', checkInUser)
                    console.log(res)
                    if (res.status === 200) {
                        toast.add({
                            severity: "success",
                            summary: "Success",
                            detail: `${res.data}`,
                            life: 4000,
                        });
                        emit('checkin-event', 'checkin')
                    }
            }
            catch (err) {
                console.log(err)
            }
        }
        
        
        const checkOut = async(item) => {
            console.log(item)
            let checkOutUser = {
                personAttendanceId: item.id,
                checkInAttendanceId: item.checkInAttendanceID
            }

            try {
                let res = await axios.post('/api/CheckInAttendance/CheckOut', checkOutUser)
                    console.log(res)
                    if (res.status === 200) {
                        toast.add({
                            severity: "success",
                            summary: "Success",
                            detail: `${res.data}`,
                            life: 4000,
                        });
                        emit('checkout-event', 'checkout')
                    }
            }
            catch (err) {
                console.log(err)
            }
        }

        return {
            checkIn,
            checkOut
        }
    }
}
</script>

<style scoped>
    .th {
        background: #DDE2E6 0% 0% no-repeat padding-box;
    }
.member-image {
    height: 60px;
    width: 60px;
    border-radius: 50%;
    object-fit: cover;
}
</style>