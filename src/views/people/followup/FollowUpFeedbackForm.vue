<template>
    <div class="container-top p-3">
        <h2 class="primary-text font-weight-bold text-center">Follow up Feedback</h2>
        <div class="text-center mt-4">
            <span class="text-secondary">Followup contact:</span>&nbsp;
            <span class="font-weight-bold">Adams Philip</span>
        </div>
        <div class="text-center">
            <span class="text-secondary">Followed up By:</span>&nbsp;
            <span class="font-weight-bold">Joseph Bargain</span>
        </div>
        <div class="row mt-5">
            <div class="col-md-3 text-md-right mb-2 mb-md-0">
                <div>Enter Feedback</div>
            </div>
            <div class="col-md-6">
                <el-input type="textarea" rows="6" v-model="form.message" placeholder="Enter your feedback here"></el-input>
            </div>
        </div>
        <div class="row mt-4">
            <div class="col-md-3 text-md-right mb-2 mb-md-0">
                <div>Life Cycle</div>
            </div>
            <div class="col-md-6">
                <el-select-v2 v-model="lifeCycleId" class="w-100 font-weight-normal" :options="lifeCycle.map((i) => ({
                    label: i.name,
                    value: i.id,
                }))
                    " placeholder="Update life cycle status" size="large" />
            </div>
        </div>
        <div class="row mt-5">
            <div class="col-md-6 offset-md-3">
                <el-button :color="primarycolor" round size="large" class="w-100">Submit</el-button>
            </div>
        </div>
        <div>
        </div>
        <div class="text-center mt-5 primary-text">
            Powered by CHURCHPLUS
        </div>
    </div>
</template>
<script setup>
import { ref, inject } from "vue"
import frmservice from "@/services/FRM/firsttimermanagement"

const primarycolor = inject('primarycolor')
const form = ref({})
const lifeCycle = ref([])
const lifeCycleId= ref(null)

const getLifeCycle = async () => {
    try {
        let res = await frmservice.getLifeCycle()
        lifeCycle.value = res.returnObject.sort((a, b) => a.order - b.order);
        console.log(lifeCycle.value);
    }
    catch (err) {
        console.log(err)
    }

}
getLifeCycle()
</script>
<style scoped>
div {
    font-family: 'Inter';
}
</style>