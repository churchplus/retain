<template>
    <div>
        <CascadeSelect v-model="value" :options="branches" optionLabel="clabel" optionGroupLabel="label" :optionGroupChildren="['children']" class="w-100" placeholder="Select a branch" @change="selectedBranch" />
    </div>
</template>

<script>
import { ref } from "vue"
import CascadeSelect from 'primevue/cascadeselect';
import axios from "@/gateway/backendapi";

export default {
    emits: ['selectedbranch'],
    components: {
        CascadeSelect
    },
    setup (props, { emit }) {
        const branches = ref([])
        const value = ref()


        const getAllBranchList = async () => {
                try {
                    axios
                    .get("/api/Branching/hierarchieswithbranches")
                    .then((res) => {
                        branches.value = res.data.returnObject.map(i => {
                            return {
                                label: i.name,
                                id: i.id,
                                children: i.teanants ? i.teanants.map(j => {
                                    return {
                                        clabel: j.name,
                                        id: j.id
                                    }
                                }) : ''
                            }
                        })
                    })
                    .catch((err) => console.log(err));
                } catch (err) {
                    console.log(err);
                }
        };
        getAllBranchList();

        const selectedBranch = () => {
            emit("selectedbranch", value.value)
        }

        return {
            branches,
            value,
            selectedBranch
        }
    }
}
</script>

<style scoped>

</style>