<template>
    <div class="container main">
        <!-- import word -->
        <div class="row">
           <div class="col-md-12 px-0">
                    <div class="row">
                        <div class="col-md-8">
                            <div class="row my-3">
                                <div class="col-md-4 text-md-right pr-md-0">
                                    <label for="" class="font-weight-700">Firstname<span class="text-danger">*</span></label>
                                </div>
                                <div class="col-md-8">
                                    <input type="text" v-model="donor.firstName" placeholder="First Name" class="form-control">
                                </div>
                            </div>
                            <div class="row my-3">
                                <div class="col-md-4 text-md-right pr-md-0">
                                    <label for="" class="font-weight-700">Last Name</label>
                                </div>
                                <div class="col-md-8">
                                    <input type="text" v-model="donor.lastName" placeholder="Last Name" class="form-control">
                                </div>
                            </div>
                            <div class="row my-3">
                                <div class="col-md-4 text-md-right pr-md-0">
                                    <label for="" class="font-weight-700">Phone Number</label>
                                </div>
                                <div class="col-md-8">
                                    <input type="text" v-model="donor.mobilePhone" placeholder="Phone Number" class="form-control">
                                </div>
                            </div>
                            <div class="row my-3">
                                <div class="col-md-4 text-md-right pr-md-0">
                                    <label for="" class="font-weight-700">Email</label>
                                </div>
                                <div class="col-md-8">
                                    <input type="text" v-model="donor.email" placeholder="Email" class="form-control">
                                </div>
                            </div>
                            <div class="row my-3">
                                <div class="col-md-4 text-md-right pr-md-0">
                                    <label for="" class="font-weight-700">Gender</label>
                                </div>
                                <div class="col-md-8"> 
                                    
                                    <div class="dropdown w-100 ">
                                        <div id="dropdownMenuButton"  class="w-100  border py-2 pl-3 rounded" data-toggle="dropdown">{{ Object.keys(genderType).length > 0 ? genderType.value : 'Gender'}}</div>
                                        <div class="dropdown-menu w-100" aria-labelledby="dropdownMenuButton" >
                                            <a
                                                     class="dropdown-item  " href="#"
                                                       v-for="(gender, index) in genders" :key="index" 
                                                        @click="addGenderType(gender)">
                                                   
                                                <div class="hover-text cursor-pointer" >{{gender.value}}</div>
                                            </a>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row my-3">
                                <div class="col-md-4 text-md-right pr-md-0">
                                    <label for="" class="font-weight-700">Date of birth</label>
                                </div>
                                <div class="col-md-8  d-flex justify-content-between flex-wrap">
                                    <div class="mt-2 col-12 col-md-5 border cursor-pointer py-2 rounded col-lg-5">
                                        <div class="dropdown col-12">
                                            <div id="dropdownMenuButton"  class="w-100   " data-toggle="dropdown">{{ birthDay ? birthDay: 'Days'}}</div>
                                            <div class="dropdown-menu flowY  w-100" aria-labelledby="dropdownMenuButton" >
                                                <div
                                                        class="dropdown-item"
                                                        v-for="(birthDays, index) in birthDaysArr" :key="index" 
                                                            @click="addbirthDays(birthDays)">
                                                    
                                                    <div class="hover-text cursor-pointer" >{{birthDays}}</div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </div>
                                    <div class="mt-2 col-12 col-md-6 border cursor-pointer py-2 rounded col-lg-6">
                                        <div class="dropdown col-12  ">
                                            <div id="dropdownMenuButton"  class=" w-100  " data-toggle="dropdown">{{ birthMonth ? birthMonth : 'Month'}}</div>
                                            <div class="dropdown-menu flowY w-100"  aria-labelledby="dropdownMenuButton" >
                                                <div
                                                        class="dropdown-item"
                                                        v-for="(month, index) in months" :key="index" 
                                                            @click="addBirthMonth(month)">
                                                    
                                                    <div class="hover-text cursor-pointer " >{{month}}</div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </div>
                                    <div class=" col-12 cursor-pointer mt-2 mx-md-auto border rounded ">
                                        <div class="col-12  py-2 rounded text-md-center ">
                                            <div   class="w-100" data-toggle="dropdown">{{ birthYear ? birthYear: 'Year'}} </div>
                                            <!-- <i class="pi pi-angle-down arrow-icon  "></i> -->
                                            <div class="dropdown-menu flowY  w-100"  aria-labelledby="dropdownMenuButton" >
                                                <div
                                                        class="dropdown-item"
                                                        v-for="(birthYears, index) in birthYearsArr" :key="index" 
                                                            @click="addBirthYears(birthYears)">
                                                    
                                                    <div class="hover-text cursor-pointer" >{{birthYears}}</div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <!-- <div class="p-field cs-select day p-col-12">
                                            <Dropdown
                                            v-model="donor.yearOfBirth"
                                            :options="birthYearsArr"
                                            placeholder="Year"
                                            style="width: 100%"
                                            />
                                        </div> -->
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-4">
                            <ImageForm @image="setImage"/>
                        </div>
                    </div>
                <div class="row">
                <div class="col-md-3 text-md-right">
                    <h4 class="header4 text-md-right"></h4>
                 </div>
                 <div class="col-md-7 px-0">
                     <Button label="Cancel" class="p-button-outlined p-button-secondary mr-3 px-5 p-button-rounded" @click="onCancel" />
                     <Button label="Save"  class="p-button-primary p-button-rounded px-5 mr-3 max" @click="saveDonor" />
                 </div>
            </div>
           </div>
       </div>
        <!-- import word -->

    </div>
    
</template>

<script>
// import { useStore } from "vuex";
// import InputText from 'primevue/inputtext';
import moment from "moment";
import Button from 'primevue/button'
import { reactive, ref,computed } from 'vue'
import { useRoute } from "vue-router";
import axios from "@/gateway/backendapi";
import ImageForm from '../../../components/membership/ImageForm'
import Dropdown from "primevue/dropdown";
    export default {
        components:{ Button, ImageForm, Dropdown  },

        setup(props, { emit }) {
            const route = useRoute();
            // const store = useStore();
            const donor = reactive({ });
            const image = ref('');
            let person = reactive({
                monthOfBirth: null,
                dayOfBirth: null,
                yearOfBirth: null,
                // monthOfWedding: null,
                // dayOfWedding: null,
                // yearOfWedding: null,
                });
            const months = ref([ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ]);
            const birthDate = moment();
            const birthMonth = ref("");
            const birthDay = ref("");
            const birthYear = ref("");
            const genderType = ref({});
            const daysInBirthMonth = ref(birthDate.daysInMonth());

            const addGenderType = (gender) => {
                genderType.value = gender;
            }
            const addbirthDays = (birthDays) => {
                birthDay.value = birthDays;
                console.log(birthDay.value, "Days");
            }
            const addBirthMonth = (month) => {
                birthMonth.value = month;
                console.log(birthMonth.value, 'month');

            }
            const addBirthYears = (birthYears) => {
                birthYear.value = birthYears;
                console.log(birthYear.value, 'Years');
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
            console.log(birthDate.month(), "month");
            const arrOfDays = [];
            console.log(daysInBirthMonth.value, "dm");
            for (let i = 1; i <= daysInBirthMonth.value; i++) {
                arrOfDays.push(i);
            }
            return arrOfDays;
            });



            const setImage = (payload) =>{
                     image.value = payload
                     console.log(image.value, "weldone");
                 }
            // let genders = ref(store.getters["lookups/genders"]);
            let genders = ref('');
            const getLookUps = () => {
            axios
                .get("/api/LookUp/GetAllLookUps")
                .then((res) => {
                console.log(res, "lksa");
                genders.value = res.data.find(
                    (i) => i.type.toLowerCase() === "gender"
                ).lookUps;
                console.log(genders.value , "gender")
                })
                .catch((err) => console.log(err.response));
            };
            getLookUps();


            const saveDonor = async () => {
                emit("cancel");
                console.log(route.fullPath)
                if (route.fullPath.includes("/tenant/addfamily") || route.fullPath.includes("/tenant/createpeoplegroup") || route.fullPath.includes("/tenant/takeattendance") ) {
                    emit("show-ward-modal", true)
                    emit("show-group-modal", true)
                }
                 console.log(birthMonth.value)
                console.log(months.value.indexOf(birthMonth.value) + 1)
                const formData = new FormData()
                formData.append("firstName", donor.firstName ? donor.firstName : "")
                formData.append("lastName", donor.lastName ? donor.lastName : "")
                formData.append("mobilePhone", donor.mobilePhone ? donor.mobilePhone : "")
                formData.append("email", donor.email ? donor.email : "")
                formData.append("gender", genderType.value.id ? genderType.value.id : "")

                formData.append("dayOfBirth", birthDay.value ? birthDay.value : "")
                formData.append("monthOfBirth", months.value.indexOf(birthMonth.value) + 1 ? months.value.indexOf(birthMonth.value) + 1 : "")
                formData.append("yearOfBirth", birthYear.value ? birthYear.value : "" )
                formData.append("picture", image.value ? image.value : "" )
                try {
                     return new Promise((resolve, reject) => {
                        axios.post("/api/People/createPerson", formData)
                            .then(res => {
                                console.log(res)
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
                                console.log(error)
                                /*eslint no-undef: "warn"*/
                                NProgress.done();
                                if (error.response) {
                                    reject(error.response);
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
                addBirthYears

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
.flowY{
    height: 300px;
    overflow-y: scroll;
} 

.hover-text:hover{
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

.p-button-outlined{
    background-color:#fff9f9!Important;
    color: black!important;
    font: var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-bold) var(--unnamed-font-size-15)/20px var(--unnamed-font-family-nunito-sans)!important;
    letter-spacing: var(--unnamed-character-spacing-0)!important;
    font: normal normal bold 15px/20px Nunito Sans!important;
    letter-spacing: 0px!important;
   
}
.max{
font: var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-bold) var(--unnamed-font-size-15)/20px var(--unnamed-font-family-nunito-sans)!important;
letter-spacing: var(--unnamed-character-spacing-0)!important;
font: normal normal bold 15px/20px Nunito Sans!important;
letter-spacing: 0px!important;
color: #FFFFFF!important;

}
.header4{
font: var(--unnamed-font-style-normal) normal normal 16px/22px var(--unnamed-font-family-nunito-sans);
letter-spacing: var(--unnamed-character-spacing-0);
text-align: left;
font: normal normal normal 16px/22px Nunito Sans;
letter-spacing: 0px;
color: #02172E;
opacity: 1;

}

</style>