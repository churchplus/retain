<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12 px-0">
                <div class="dropdown">
                    <input type="text" class="form-control"
                        id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                        @input="searchForPerson"
                    >
                    <div class="dropdown-menu w-100 our-grey-bg" aria-labelledby="dropdownMenuButton"
                        style="max-height: 300px;overflow-y:scroll"
                    >
                        <div class="row" v-if="!loading && memberSearchResults.length === 0">
                            <div class="col-md-11 mx-auto">
                                <p class="mb-0">Enter 3 or more characters</p>
                            </div>
                        </div>
                        <div class="row" v-if="loading">
                            <div class="col-md-11 mx-auto">
                                <i class="pi pi-spin pi-spinner" style="fontSize: 1rem"></i>
                            </div>
                        </div>
                        <a class="dropdown-item c-pointer" v-for="member in memberSearchResults" :key="member.id" @click="selectMember(member)">{{ member.nameResult }}</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import axios from "@/gateway/backendapi";
import { ref } from '@vue/reactivity';
import composerObj from '../../services/communication/composer';

export default {
    props: [ "index" ],
    setup (props, { emit }) {
        const memberSearchResults = ref([ ])
        const selectedMember = ref({ })
        const loading = ref(false)
        const searchForPerson = (e) => {
            if (e.target.value.length >= 3) {
                memberSearchResults.value = [];
                loading.value = true;
                composerObj
                .searchMemberDB("/api/Membership/GetSearchedUSers", e.target.value)
                .then((res) => {
                    loading.value = false;
                    memberSearchResults.value = res;
                    console.log(memberSearchResults.value, "res");
                })
                .catch(err => {
                    loading.value = false;
                    console.log(err)
                })
            } else {
                memberSearchResults.value = [];
            }
        };
        const selectMember = member => {
            selectedMember.value = member;
            emit("selectmember", { member: member, index: props.index });
        };

        return {
            searchForPerson,
            loading,
            memberSearchResults,
            selectedMember,
            selectMember,
        }
    }
}
</script>

<style scoped>

</style>