<template>
    <div class="container main">
        <div class="row">
            <div class="col-md-12">
                <div class="row">
                    <div class="col-md-12">
                        <div class="row my-3">   
                            <div class="col-md-12">
                                <el-input type="text" v-model="donor.firstName" placeholder="Enter first name" />
                            </div>
                        </div>
                        <div class="row my-3">
                            <div class="col-md-12">
                                <el-input type="text" v-model="donor.lastName" placeholder="Enter last name" />
                            </div>
                        </div>
                        <div class="row my-3">
                            <div class="col-md-12">
                                <el-input type="text" v-model="donor.mobilePhone" placeholder="Enter phone number" />
                            </div>
                        </div>
                        <div class="row my-3">
                            <div class="col-md-12">
                                <el-input type="text" v-model="donor.email" placeholder="Enter email" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12 mt-3">
                        <el-button @click="onCancel" class="secondary-button w-100" round>Cancel</el-button>
                        <el-button :color="primarycolor" :loading="loading" class="w-100 ml-0 mt-2" @click="saveDonor"
                            round>Save</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from "moment";
import { reactive, ref, computed, inject } from 'vue'
import { useRoute } from "vue-router";
// import router from "@/router/index";
import axios from "@/gateway/backendapi";
import { useStore } from "vuex";
// import ImageForm from './ImageForm'
export default {
    // components: { ImageForm },

    setup(props, { emit }) {
        const primarycolor = inject('primarycolor')
        const route = useRoute();
        const store = useStore();
        const loading = ref(false)
        const memberClassificationId = ref(null)
        const donor = reactive({});
        const image = ref('');
        let person = reactive({
            monthOfBirth: null,
            dayOfBirth: null,
            yearOfBirth: null,
        });
        const months = ref(["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]);
        const birthDate = moment();
        const birthMonth = ref("");
        const birthDay = ref("");
        const birthYear = ref("");
        const genderType = ref({});
        const selectedMembership = ref(null);
        const daysInBirthMonth = ref(birthDate.daysInMonth());
        let memberships = ref(store.getters["lookups/peopleClassifications"]);

        // const getPeopleClassifications = async () => {
        //     try {
        //         const response = await axios.get(
        //         "/api/Settings/GetTenantPeopleClassification"
        //         );
        //         const { data } = response;
        //         memberships.value = data;
        //         console.log(memberships.value, 'kkkhhh');
        //     } catch (err) {
        //         if (err.response && err.response.status === 401) {
        //         localStorage.removeItem("token");

        //         router.push("/");
        //         }
        //         console.log(err);
        //     }
        //     };
        //     getPeopleClassifications()

            const setSelectedMem = () => {
                selectedMembership.value = memberships.value.find((i) => i.id == memberClassificationId.value )
                // console.log(selectedMembership.value, 'hhhhh');
            }

        const addGenderType = (gender) => {
            genderType.value = gender;
        }
        const addbirthDays = (birthDays) => {
            birthDay.value = birthDays;
        }
        const addBirthMonth = (month) => {
            birthMonth.value = month;
        }
        const addBirthYears = (birthYears) => {
            birthYear.value = birthYears;
        }
        const birthYearsArr = computed(() => {
            const arrOfYears = [];
            let currentYear = new Date().getFullYear();
            while (arrOfYears.length <= 100) {
                arrOfYears.push(currentYear);
                currentYear = currentYear - 1;
            }
            return arrOfYears;
        });

        const birthDaysArr = computed(() => {
            const arrOfDays = [];
            for (let i = 1; i <= daysInBirthMonth.value; i++) {
                arrOfDays.push(i);
            }
            return arrOfDays;
        });



        const setImage = (payload) => {
            image.value = payload
            console.log(image.value, "weldone");
        }
        let genders = ref('');
        const getLookUps = () => {
            axios
                .get("/api/LookUp/GetAllLookUps")
                .then((res) => {
                    console.log(res, "lksa");
                    genders.value = res.data.find(
                        (i) => i.type.toLowerCase() === "gender"
                    ).lookUps;
                    console.log(genders.value, "gender")
                })
                .catch((err) => console.log(err.response));
        };
        getLookUps();


        const saveDonor = async () => {
            loading.value = true
            const formData = new FormData()
            formData.append("firstName", donor.firstName ? donor.firstName : "")
            formData.append("lastName", donor.lastName ? donor.lastName : "")
            formData.append("mobilePhone", donor.mobilePhone ? donor.mobilePhone : "")
            formData.append("email", donor.email ? donor.email : "")
            try {
                return new Promise((resolve, reject) => {
                    axios.post("/api/People/createPerson", formData)
                        .then(res => {
                            loading.value = false
                            emit("cancel");
                            if (route.fullPath.includes("/tenant/addfamily") || route.fullPath.includes("/tenant/createpeoplegroup") || route.fullPath.includes("/tenant/takeattendance")) {
                                emit("show-ward-modal", true)
                                emit("show-group-modal", true)
                            }
                            emit('person-id', {
                                personId: res.data.personId,
                                personFirstName: donor.firstName ? donor.firstName : "",
                                personLastName: donor.lastName ? donor.lastName : "",
                                personEmail: donor.email ? donor.email : "",
                                personNumber: donor.mobilePhone ? donor.mobilePhone : ""
                            })
                            resolve(res.data);

                        })
                        .catch(error => {
                            loading.value = false
                            console.log(error)
                            if (error.response) {
                                console.log(error.response)
                            } else {
                                reject(error);
                            }
                        })
                })

            } catch (error) {
                console.log(error);
            }
        }

        const onCancel = () => emit("cancel")

        return {
            donor,
            memberClassificationId,
            selectedMembership,
            memberships,
            setSelectedMem,
            saveDonor,
            onCancel,
            setImage,
            image,
            genders,
            birthMonth,
            birthDay,
            birthYear,
            months,
            person,
            birthDaysArr,
            birthYearsArr,
            addGenderType,
            genderType,
            addbirthDays,
            addBirthMonth,
            addBirthYears,
            loading,
            primarycolor

            // getLookUps
            // gendersArr,
            // getPersonGenderId
        }
    }
}
</script>

<style scoped>
/* .main{
    margin-top: 300px;
    margin-bottom: 300px;
} */
.flowY {
    height: 300px;
    overflow-y: scroll;
}

.hover-text:hover {
    background-color: rgb(248, 247, 247);
}

.cs-select.month {
    width: 111px;
}

.cs-select.day {
    width: 87px;
}

.arrow-icon {
    position: relative;
    right: 25px;
    top: 10px;
    /* margin-top: -31px; */
    font-size: 21px;
}

.cs-select.year {
    width: 113px;
}

@media (max-width: 376px) {
    /* .bio-info.celeb-info {
    margin-top: 80px;
  } */

    .cs-select.month {
        width: 85px;
    }

    .cs-select.day {
        width: 85px;
    }

    .cs-select.year {
        width: 90px;
    }
}

.p-button-outlined {
    background-color: #fff9f9 !Important;
    color: black !important;
    font: var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-bold) var(--unnamed-font-size-15)/20px var(--unnamed-font-family-nunito-sans) !important;
    letter-spacing: var(--unnamed-character-spacing-0) !important;
    font: normal normal bold 15px/20px Nunito Sans !important;
    letter-spacing: 0px !important;

}

.max {
    font: var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-bold) var(--unnamed-font-size-15)/20px var(--unnamed-font-family-nunito-sans) !important;
    letter-spacing: var(--unnamed-character-spacing-0) !important;
    font: normal normal bold 15px/20px Nunito Sans !important;
    letter-spacing: 0px !important;
    color: #FFFFFF !important;

}

.header4 {
    font: var(--unnamed-font-style-normal) normal normal 16px/22px var(--unnamed-font-family-nunito-sans);
    letter-spacing: var(--unnamed-character-spacing-0);
    text-align: left;
    font: normal normal normal 16px/22px Nunito Sans;
    letter-spacing: 0px;
    color: #02172E;
    opacity: 1;

}

.border-contribution {
    border: 1.6px solid rgb(229, 232, 237);
    border-radius: 4px;
    padding: 11px 7px;
}
</style>