<template>
    <div class="container main">
        <div class="row">
            <div class="col-md-12 px-0">
                <div class="row">
                    <div class="col-md-8">
                        <div class="row my-3">
                            <div class="col-md-4 text-md-right pr-md-0">
                                <label for="" class="font-weight-700">Membership</label>
                            </div>
                            <div class="col-md-8">
                                <el-select-v2 v-model="memberClassificationId" @change="setSelectedMem"
                                    :options="memberships.map(i => ({ label: i.name, value: i.id }))" placeholder="--Select membership--"
                                    size="large" class="w-100" />
                            </div>
                        </div>
                        <div class="row my-3">
                            <div class="col-md-4 text-md-right pr-md-0">
                                <label for="" class="font-weight-700">Firstname<span class="text-danger">*</span></label>
                            </div>
                            <div class="col-md-8">
                                <el-input type="text" v-model="donor.firstName" placeholder="Enter first name" />
                            </div>
                        </div>
                        <div class="row my-3">
                            <div class="col-md-4 text-md-right pr-md-0">
                                <label for="" class="font-weight-700">Last Name</label>
                            </div>
                            <div class="col-md-8">
                                <el-input type="text" v-model="donor.lastName" placeholder="Enter last name" />
                            </div>
                        </div>
                        <div class="row my-3">
                            <div class="col-md-4 text-md-right pr-md-0">
                                <label for="" class="font-weight-700">Phone Number</label>
                            </div>
                            <div class="col-md-8">
                                <el-input type="text" v-model="donor.mobilePhone" placeholder="Enter phone number" />
                            </div>
                        </div>
                        <div class="row my-3">
                            <div class="col-md-4 text-md-right pr-md-0">
                                <label for="" class="font-weight-700">Email</label>
                            </div>
                            <div class="col-md-8">
                                <el-input type="text" v-model="donor.email" placeholder="Email" />
                            </div>
                        </div>
                        <div class="row my-3">
                            <div class="col-md-4 text-md-right pr-md-0">
                                <label for="" class="font-weight-700">Gender</label>
                            </div>
                            <div class="col-md-8">
                                <el-dropdown trigger="click" class="w-100">
                                    <div class="d-flex justify-content-between border-contribution text-dark w-100"
                                        size="large">
                                        <span>{{ Object.keys(genderType).length > 0 ? genderType.value : 'Gender'
                                        }} </span>
                                        <div>
                                            <el-icon class="el-icon--right">
                                                <arrow-down />
                                            </el-icon>
                                        </div>
                                    </div>
                                    <template #dropdown>
                                        <el-dropdown-menu>
                                            <el-dropdown-item v-for="(gender, index) in genders" :key="index">
                                                <a class="no-decoration text-dark" @click="addGenderType(gender)">
                                                    {{ gender.value }}
                                                </a>
                                            </el-dropdown-item>
                                        </el-dropdown-menu>
                                    </template>
                                </el-dropdown>
                            </div>
                        </div>
                        <div class="row my-3">
                            <div class="col-md-4 text-md-right pr-md-0">
                                <label for="" class="font-weight-700">Date of birth</label>
                            </div>
                            <div class="col-md-8 ">
                                <div class="row">
                                    <div class="col-12 col-md-4">
                                        <el-dropdown trigger="click" class="w-100">
                                            <div class="d-flex justify-content-between border-contribution text-dark w-100"
                                                size="large">
                                                <span>{{ birthDay ? birthDay : 'Day' }}</span>
                                                <div>
                                                    <el-icon class="el-icon--right">
                                                        <arrow-down />
                                                    </el-icon>
                                                </div>
                                            </div>
                                            <template #dropdown>
                                                <el-dropdown-menu>
                                                    <el-dropdown-item v-for="(birthDay, index) in birthDaysArr"
                                                        :key="index">
                                                        <a class="no-decoration text-dark" @click="addbirthDays(birthDay)">
                                                            {{ birthDay }}
                                                        </a>
                                                    </el-dropdown-item>
                                                </el-dropdown-menu>
                                            </template>
                                        </el-dropdown>
                                    </div>
                                    <div class="col-12 col-md-4 px-md-0 my-2 my-md-0">
                                        <el-dropdown trigger="click" class="w-100">
                                            <div class="d-flex justify-content-between border-contribution text-dark w-100"
                                                size="large">
                                                <span>{{ birthMonth ? birthMonth : 'Month' }}</span>
                                                <div>
                                                    <el-icon class="el-icon--right">
                                                        <arrow-down />
                                                    </el-icon>
                                                </div>
                                            </div>
                                            <template #dropdown>
                                                <el-dropdown-menu>
                                                    <el-dropdown-item v-for="(month, index) in months" :key="index">
                                                        <a class="no-decoration text-dark" @click="addBirthMonth(month)">
                                                            {{ month }}
                                                        </a>
                                                    </el-dropdown-item>
                                                </el-dropdown-menu>
                                            </template>
                                        </el-dropdown>
                                    </div>
                                    <div class="col-12 col-md-4">
                                        <el-dropdown trigger="click" class="w-100">
                                            <div class="d-flex justify-content-between border-contribution text-dark w-100"
                                                size="large">
                                                <span>{{ birthYear ? birthYear : 'Year' }}</span>
                                                <div>
                                                    <el-icon class="el-icon--right">
                                                        <arrow-down />
                                                    </el-icon>
                                                </div>
                                            </div>
                                            <template #dropdown>
                                                <el-dropdown-menu>
                                                    <el-dropdown-item v-for="(birthYear, index) in birthYearsArr"
                                                        :key="index">
                                                        <a class="no-decoration text-dark"
                                                            @click="addBirthYears(birthYears)">
                                                            {{ birthYear }}
                                                        </a>
                                                    </el-dropdown-item>
                                                </el-dropdown-menu>
                                            </template>
                                        </el-dropdown>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-4">
                        <ImageForm @image="setImage" />
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-3 text-md-right">
                        <h4 class="header4 text-md-right"></h4>
                    </div>
                    <div class="col-md-5 px-0 mt-3">
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
import router from "@/router/index";
import axios from "@/gateway/backendapi";
import { useStore } from "vuex";
import ImageForm from './ImageForm'
export default {
    components: { ImageForm },

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

        const getPeopleClassifications = async () => {
            try {
                const response = await axios.get(
                "/api/Settings/GetTenantPeopleClassification"
                );
                const { data } = response;
                memberships.value = data;
                console.log(memberships.value, 'kkkhhh');
            } catch (err) {
                if (err.response && err.response.status === 401) {
                localStorage.removeItem("token");

                router.push("/");
                }
                console.log(err);
            }
            };
            getPeopleClassifications()

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
            formData.append("gender", genderType.value.id ? genderType.value.id : "")
            formData.append("peopleClassificationID", selectedMembership.value ? selectedMembership.value.id : "" );
            formData.append("dayOfBirth", birthDay.value ? birthDay.value : "")
            formData.append("monthOfBirth", months.value.indexOf(birthMonth.value) + 1 ? months.value.indexOf(birthMonth.value) + 1 : "")
            formData.append("yearOfBirth", birthYear.value ? birthYear.value : "")
            formData.append("picture", image.value ? image.value : "")
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
                                personFirstName: donor.firstName,
                                personLastName: donor.lastName,
                                personEmail: donor.email,
                                personNumber: donor.mobilePhone
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