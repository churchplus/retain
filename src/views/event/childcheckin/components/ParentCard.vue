<template>
    <div class="container">
        <div class="row pt-4 pb-2 my-5">
            <div class="col-md-8 offset-md-2 border p-0 parent-img-box">
                <img :src="guardian && guardian.person ? guardian.person.pictureUrl : ''" class="w-100 img-box" v-if="guardian && guardian.person ? guardian.person.pictureUrl : ''"/>
            </div>
        </div>

        <div class="row">
            <div class="col-md-12 px-0">
                <div class="row py-2 parent-info">
                    <div class="col-md-3">
                        <span class="font-weight-700">
                            Name:
                        </span>
                    </div>
                    <div class="col-md-9">
                        <span class="font-weight-600">
                            {{ guardian && guardian.person ? guardian.person.firstName : "" }} {{ guardian && guardian.person ? guardian.person.lastName : "" }}
                        </span>
                    </div>
                </div>

                <div class="row py-2 parent-info">
                    <div class="col-md-3">
                        <span class="font-weight-700">
                            Email:
                        </span>
                    </div>
                    <div class="col-md-9">
                        <span class="font-weight-600">
                            {{ guardian && guardian.person ? guardian.person.email : "" }}
                        </span>
                    </div>
                </div>
                <div class="row py-2 parent-info">
                    <div class="col-md-3">
                        <span class="font-weight-700">
                            Phone:
                        </span>
                    </div>
                    <div class="col-md-9">
                        <span class="font-weight-600">
                           {{ phone }}
                        </span>
                    </div>
                </div>

                <div class="row py-2 parent-info">
                    <div class="col-md-3">
                        <span class="font-weight-700">
                            Role:
                        </span>
                    </div>
                    <div class="col-md-9">
                        <span class="font-weight-600">
                            {{ roles.length > 0 && guardian && guardian.familyRoleID ? roles.find(i => i.id === guardian.familyRoleID).name : "" }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
import axios from "@/gateway/backendapi";
export default {
    props: ['guardian', 'phone'],
    setup () {
        const roles = ref([])
        
        const getFamilyRoles = async () => {
            try {
                let { data } = await axios.get('/getfamilyroles')
                console.log(data)
                roles.value = data.result
            }
            catch (err) {
                console.log(err)
            }
        }
        getFamilyRoles()
        return {
            roles
        }
    }
}
</script>

<style scoped>
    .parent-img-box {
        height: 150px;
        width:150px;
        border-radius: 22px;
    }
    .img-box {
        height: 100%;
        border-radius: 22px;
        object-fit: cover;
    }

    .parent-info:nth-child(odd) {
        background: #dde2e65c 0% 0% no-repeat padding-box;
    }
</style>