<template>
    <div class="container">
        <div class="row my-4">
            <div class="col-md-4 text-md-right">
            <label for="" class="font-weight-600">Search Name</label>
            </div>
            <div class="col-md-7">
            <div class="dropdown">
                
                <input
                type="text"
                class="form-control"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                v-model="userSearchString"
                @input="searchForUsers"
                />
                <div
                class="dropdown-menu w-100"
                aria-labelledby="dropdownMenuButton"
                >
                <div class="row w-100 mx-auto" v-if="false">
                    <div class="col-md-12">
                    <input
                        type="text"
                        class="form-control"
                        placeholder="Find event"
                    />
                    </div>
                </div>

                <a
                    class="dropdown-item font-weight-700 small-text"
                    href="#"
                    v-for="(member, index) in searchedMembers"
                    :key="index"
                    @click="addExistingMember(member)"
                    >{{ member.name }}</a
                >
                <a
                    class="dropdown-item font-weight-700 small-text"
                    href="#"
                    v-if="
                    searchingForMembers && searchedMembers.length === 0
                    "
                    ><i class="pi pi-spin pi-spinner"></i
                ></a>
                <p
                    class="modal-promt pl-1 bg-secondary m-0"
                    v-if="
                    userSearchString.length < 3 &&
                    searchedMembers.length === 0
                    "
                >
                    Enter 3 or moore characters
                </p>
                <a
                    class="font-weight-bold small-text d-flex justify-content-center py-2 text-decoration-none primary--text c-pointer"
                    style="border-top: 1px solid #002044; color: #136acd"
                    @click="showAddMemberForm"
                    data-dismiss="modal"
                >
                    <i
                    class="pi pi-plus-circle mr-2 primary-text d-flex align-items-center"
                    style="color: #136acd"
                    ></i>
                    Add new donor
                </a>
                </div>
            </div>

            <!-- <div class="row mt-4">
                <div class="col-md-6 d-md-flex justify-content-end">
                <button class="default-btn" data-dismiss="modal">Cancel</button>
                </div>
                <div class="col-md-6">
                <button
                    class="default-btn primary-bg border-0 text-white"
                    data-dismiss="modal"
                    @click="addDonor"
                >
                    Save
                </button>
                </div>
            </div> -->
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['searchedMembers', 'userSearchString'],
    setup () {
        return {}
    }
}
</script>

<style scoped>

</style>