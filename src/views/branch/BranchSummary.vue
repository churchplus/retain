<template>
    <div class="container container-top container-wide">
        <div class="row d-flex justify-content-between px-3 mb-3">
            <div class="heading-text">Branch</div>
            <div class="mb-3">
                <div class="default-btn primary-bg text-white font-weight-bold c-pointer border-0" data-toggle="modal" data-target="#statusmodal" ref="statusmodalBtn">
                    Add Branch
                </div>
            </div>
        </div>
        <div class="contanier-fluid">
            <div class="row mb-4">
                <div class="col-12 d-flex p-0 flex-wrap justify-content-end">
                    <div class="mb-2 col-12 col-sm-3">
                        <Dropdown  :options="periods" optionLabel="name" placeholder="Select Period" class="w-100" v-model="selectedPeriod" @change="getPeriod" />
                    </div>
                    <div class="col-12 col-sm-4">
                        <CascadeSelect :options="branches" optionLabel="clabel" optionGroupLabel="label" :optionGroupChildren="['children']" class="w-100" placeholder="Select a branch" v-model="selectedBranch" @change="getBranchAnalytics"/>
                    </div>
                </div>
            </div>
        </div>
        <div class="container-fluid mb-3">
            <!-- <div class="container-fluid"> -->
            <div class="row justify-content-between mother-row">
                <div class="col-md-2 item-Area mb-4">
                    <div class="row p-2 mb-2 d-flex justify-content-between">
                        <div class="top-icon-div d-flex justify-content-center align-items-center ml-2">
                            <!-- <img class="trend-icon" src="/img/trend-icon.b63f0d8d.svg" alt=""> -->
                            <i class="pi pi-home text-center"></i>
                        </div>
                        <div class="col d-flex justify-content-end font-weight-bold align-items-center item-total">{{ branchAnalytics.totalBranches ? branchAnalytics.totalBranches : 0 }}</div>
                    </div>
                    <div class="row p-2">
                        <p class="item-text ml-2">Total Branches </p>
                    </div>
                </div>

                <div class="col-md-2 item-Area mb-4">
                    <div class="row p-2 mb-2 d-flex justify-content-between">
                        <div class="top-icon-div d-flex justify-content-center align-items-center ml-2">
                            <i class="pi pi-users text-center"></i>

                            <!-- <img class="trend-icon" src="/img/trend-icon.b63f0d8d.svg" alt=""> -->
                            <!-- <img class="trend-icon " src="../../assets/dashboardlinks/people.svg" alt=""> -->
                        </div>
                        <div class="col d-flex justify-content-end font-weight-bold align-items-center item-total pl-0">{{ branchAnalytics.totalMembers ? branchAnalytics.totalMembers : 0 }}</div>
                    </div>
                    <div class="row p-2 ">
                        <p class="item-text ml-2 text-truncate">Total People</p>
                    </div>
                </div>

                <div class="col-md-2 item-Area mb-4">
                    <div class="row p-2 mb-2 d-flex justify-content-between">
                        <div class="top-icon-div d-flex justify-content-center align-items-center ml-2">
                            <i class="pi pi-list text-center"></i>
                            <!-- <img class="trend-icon " src="../../assets/dashboardlinks/people.svg" alt=""> -->
                        </div>
                        <div class="col d-flex justify-content-end font-weight-bold align-items-center item-total">{{ branchAnalytics.averageAttendance ? branchAnalytics.averageAttendance : 0 }}</div>
                    </div>
                    <div class="row p-2">
                        <p class="item-text ml-2 text-truncate">Average Attendance</p>
                    </div>
                </div>

                <div class="col-md-2 item-Area mb-4">
                    <div class="row p-2 mb-2 d-flex justify-content-between">
                        <div class="top-icon-div d-flex justify-content-center align-items-center ml-2">
                            <i class="pi pi-money-bill text-center"></i>
                        </div>
                        <div class="col d-flex justify-content-end font-weight-bold align-items-center item-total">{{ branchAnalytics.averageIncome ? branchAnalytics.averageIncome : 0 }}</div>
                    </div>
                <div class="row p-2">
                    <p class="item-text ml-2 text-truncate">Average income</p>
                </div>
            </div>
      <!-- </div> -->
    </div>
        </div>
        <div class="container-fluid mb-3 ">
            <div class="row">
                <div class="col-12 domId p-3" v-show="mappedBranch.length > 0">
                    <OrganizationChart :value="data1" :collapsible="true" class="company" selectionMode="single" v-model:selectionKeys="selection">
                        <template #person="slotProps">
                            <div class="node-content">
                                <img :src="slotProps.node.data.label.logo" width="32">
                                <div>{{slotProps.node.data.name}}</div>
                            </div>
                        </template>
                        <template #default="slotProps">
                            <span>{{slotProps.node && slotProps.node.data ? slotProps.node.data.name : ''}}</span>
                        </template>
                    </OrganizationChart>
                </div>
                <div class="col-12 border p-3" style="height: 100%; border-radius: 5px; font-size: 1.5em" v-show="mappedBranch.length === 0"><div>👋 Hey!</div>
                <div class="mt-3"> Welcome to the branching feature in Churchplus.</div>
                <div class="mt-3"> Manage your ministry branches easily via this branch feature. Start by setting up your ministry's hierarchies in <router-link to="/tenant/settings/branchlevelsettings">Settings</router-link>, then create your branches.</div></div>
            </div>
        </div>
    </div>
     <!-- Branch Status Level Modal -->
    <div class="modal fade" id="statusmodal" tabindex="-1" role="dialog" aria-labelledby="importgroupModalLabel" aria-hidden="true" >
    <div class="modal-dialog modal-dialog-centered" role="document" ref="modal">
        <div class="modal-content pr-2">
        <div class="modal-header py-3">
            <h5 class="modal-title font-weight-700">
            Which of these option best suit your intentions?
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" ref="closeStatusModal" >
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <div class="row">
            <div class="col-md-10 offset-1">
                <div class="default-btn border mb-3 text-center c-pointer" @click="setUpBranch">Setup branch network</div>
                <div class="default-btn border mb-3 text-center c-pointer" data-dismiss="modal" @click="joinBranch">Join branch network</div>
            </div>
            </div>
        </div>
        </div>
    </div>
    
    </div>
     <!-- Branch Status Level Modal -->
     <div data-toggle="modal" data-target="#levelmodal" ref="levelmodalBtn" hidden>
        Show modal
    </div>
    <div class="modal fade" id="levelmodal" tabindex="-1" role="dialog" aria-labelledby="importgroupModalLabel" aria-hidden="true" >
    <div class="modal-dialog modal-dialog-centered" role="document" ref="modal">
        <div class="modal-content pr-2">
        <div class="modal-header py-3">
            <h5 class="modal-title font-weight-700" id="importgroupModalLabel" >
            Set up your branch level
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" ref="closeGroupModal" >
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <div class="row">
            <div class="col-md-12">
                <div class="mb-3" style="font-size: 1.2em">You dont have branch hierarchies set up yet, create the hierarchies, then you can proceed to create your branch</div>
                <BranchSettings/>
                <button class="mt-3 mb-3 offset-5 col-4 default-btn primary-bg text-white font-weight-bold c-pointer border-0 text-center" data-dismiss="modal"  @click="goToAddBranch">Proceed</button>
            </div>
            </div>
        </div>
        </div>
    </div>
    
    </div>
     <!-- Join Branch Modal -->
     <div data-toggle="modal" data-target="#joinmodal" ref="joinmodalBtn" hidden>
        Show modal
    </div>
    <div class="modal fade" id="joinmodal" tabindex="-1" role="dialog" aria-labelledby="importgroupModalLabel" aria-hidden="true" >
    <div class="modal-dialog modal-dialog-centered" role="document" ref="modal">
        <div class="modal-content pr-2">
        <div class="modal-header py-3">
            <h5 class="modal-title font-weight-700" id="importgroupModalLabel" >
            Enter your code to join a branch network
            </h5>
            <button type="button" ref="closeJoinNetworkModal" class="close" data-dismiss="modal" aria-label="Close" >
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <div class="row">
            <div class="col-md-12">
                <div class="p-field p-col-12 p-md-4">
                    <span class="p-float-label">
                        <InputText class="w-100" id="inputtext" type="text" v-model="code" />
                        <label for="inputtext">Enter your code</label>
                    </span>
                </div>
                <button class="mt-3 mb-3 offset-5 col-4 default-btn primary-bg text-white font-weight-bold c-pointer border-0 text-center" @click="joinNetwork">Join network</button>
            </div>
            </div>
        </div>
        </div>
    </div>
    </div>
    <Toast />
</template>

<script>
import { computed, ref } from "vue";
import Dropdown from "primevue/dropdown";
import Organisation from "../../components/charts/OrgChart2.vue"
import BranchSettings from "../settings/BranchLevelSettings.vue"
import axios from "@/gateway/backendapi";
import router from '../../router';
import InputText from "primevue/inputtext";
import { useToast } from "primevue/usetoast";
import CascadeSelect from 'primevue/cascadeselect';
import OrganizationChart from 'primevue/organizationchart';
import { useStore } from "vuex";
import userService from "../../services/user/userservice";

export default {
    inheritAttrs: false,
    components: {
        Organisation,
        Dropdown,
        BranchSettings,
        InputText,
        CascadeSelect,
        OrganizationChart
    },
    setup() {
        const toast = useToast()
        const store = useStore();
        const periods = ref([
            {name: 'Last 30days', code:  new Date(new Date().setDate(new Date().getDate() - 30)).toLocaleDateString("en-US")},
			{name: 'Last 90days', code:  new Date(new Date().setDate(new Date().getDate() - 90)).toLocaleDateString("en-US")},
			{name: 'Last 120days', code: new Date(new Date().setDate(new Date().getDate() - 120)).toLocaleDateString("en-US")},
			{name: 'One Year', code: new Date(new Date().setDate(new Date().getDate() - 365)).toLocaleDateString("en-US")},
      ]);
        const data1 = ref({});
        const hierarchies = ref([])
        const levelmodalBtn = ref()
        const joinmodalBtn = ref()
        const closeStatusModal = ref()
        const code = ref("")
        const closeJoinNetworkModal = ref()
        const editor = ref()
        const editorr = ref(null)
        const mappedBranch = ref([])
        const branches = ref([])
        const selectedBranch = ref({})
        const selectedPeriod = ref({})
        const branchAnalytics = ref({})
        const selection = ref({});
         const currentUserID = ref(store.getters.currentUser && store.getters.currentUser.tenantId ? store.getters.currentUser.tenantId : 0)

        const getBranches = async() => {
            try {
                let { data } = await axios.get('/api/Branching')
                console.log(data)
                mappedBranch.value = data.returnObject.map(i => {
                    return {
                        mainID: i.id,
                        // title: 'CEO',
                        // name: i.name,
                        data: { name: i.name, avatar: i.logo, label: 'CEO' },
                        // image: i.logo,
                        parent: i.parentID,
                        styleClass: 'p-person',
                    }
                })
                console.log(mappedBranch.value)
                let matchedValues = []

                const allIDs = mappedBranch.value.map(i => i.mainID)
                let sum = 0
                allIDs.forEach(i => {
                    mappedBranch.value.forEach((j, ind) => {
                        if (i == j.parent) {
                            j.id = ind
                            j.parentid = sum
                            matchedValues.push(j)
                        }
                    })
                    sum++
                })

                const unflatten = function ( array, parent, tree ){
                    tree = typeof tree !== 'undefined' ? tree : [];
                    parent = typeof parent !== 'undefined' ? parent : { id: 0 };
                    var children = _.filter( array, function(child){ return child.parentid == parent.id; });
                    if( !_.isEmpty( children )  ){
                        if( parent.id == 0 ){
                        tree = children;   
                        }else{
                        parent['children'] = children
                        }
                        _.each( children, function( child ){ unflatten( array, child ) } );                    
                    }
                    return tree;
                }

                let treeConstruted = unflatten(matchedValues)
                const HQ = data.returnObject.find(i => i.parentID.includes('00000000-000'))
                const belowHQ = data.returnObject[0]
                let treeData = {
                        key: '0',
                        type: 'person',
                        styleClass: 'p-hq',
                        data: {label: HQ ? HQ : belowHQ, name: HQ && HQ.name ? HQ.name : belowHQ.name, avatar: HQ && HQ.logo? HQ.logo : belowHQ.logo},
                        children: treeConstruted
                    }
                    data1.value = treeData
            }
            catch (err) {
                console.log(err)
            }
        }
        getBranches()

        const b  = computed(() => {
            console.log(selectedBranch.value, "SELECTED BRANCH")
        })

        const getCurrentUserID = async () =>{
            try {
                  const data = await userService.getCurrentUser();
                  currentUserID.value = data.tenantId;
                  // alert(currentUser.value)
                //   console.log(data, "daataaaaa")
                  } catch (error) {
                      console.log(error);
                  }
        }

        


        const showBranchItem = async () => {
            if (!currentUserID.value) await  getCurrentUserID()
             const x = branches.value.find(i => {
                 let a = i.children.find(j => j.id === currentUserID.value);
                 if (a) return i;
                //  return i;
             })
             if (x)  {
                 selectedBranch.value = x.children.find(j => j.id === currentUserID.value)

             }
         }
         

        const getAllBranchList = async () => {
                    try {
                        axios
                        .get("/api/Branching/hierarchieswithbranches")
                        .then( async (res) => {
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
                            await showBranchItem()
                            getBranchAnalytics()
                        })
                        .catch((err) => console.log(err));
                    } catch (err) {
                        console.log(err);
                    }
                    };
        getAllBranchList();

        const getHierarchies = async() => {
            try {
                let { data } = await axios.get('/branching/hierarchies')
                console.log(data)
                hierarchies.value = data.returnObject
            }
            catch (err) {
                console.log(err)
            }
        }
        getHierarchies()

        const setUpBranch = () => {
            if (hierarchies.value.length === 0) {
                levelmodalBtn.value.click()
            }   else {
                closeStatusModal.value.click()
                router.push('/tenant/branch/addbranch')
            }
        }

        const joinBranch = () => {
            joinmodalBtn.value.click()
        }

        const goToAddBranch = () => {
            closeStatusModal.value.click()
            router.push('/tenant/branch/addbranch')
        }

        const joinNetwork = async() => {
            try {
                let { data } = await axios.post('/api/Branching/joinnetwork', { code: code.value })
                console.log(data)
                closeJoinNetworkModal.value.click()
                    toast.add({
                        severity: "success",
                        summary: "Success",
                        detail: data.response,
                        life: 5000,
                    });
            }
            catch (err) {
                console.log(err)
            }
        }

        const getBranchAnalytics = async() => {
            try {
                let { data } = await axios.get(`/api/Branching/analytics?startDate=${selectedPeriod.value.code}&endDate=${new Date().toLocaleDateString("en-US")}&branchID=${selectedBranch.value.id}`)
                branchAnalytics.value = data
            }
            catch (err) {
                console.log(err)
            }
            
        }
         
            

         const showPeriod = () =>{
             selectedPeriod.value = periods.value.find(i => i.name.includes('30'))
             axios.get(`/api/Branching/analytics?startDate=${selectedPeriod.value.code}&endDate=${new Date().toLocaleDateString("en-US")}&branchID=${selectedBranch.value.id}`)
             .then((res) =>{
                 console.log(res)
                branchAnalytics.value = res.data
             }) 
            .catch((err) =>{
                console.log(err)
            }) 
             
         }
            showPeriod()

    
         

        const getPeriod = () => {
            console.log(selectedPeriod.value)
        }

        return {
            periods,
            branches,
            hierarchies,
            setUpBranch,
            levelmodalBtn,
            goToAddBranch,
            closeStatusModal,
            joinBranch,
            joinmodalBtn,
            code,
            joinNetwork,
            closeJoinNetworkModal,
            editor,
            editorr,
            mappedBranch,
            data1,
            getBranchAnalytics,
            selectedBranch,
            selectedPeriod,
            getPeriod,
            branchAnalytics,
            selection,
            currentUserID
        }
    },
}
</script>
<style scoped>
    .heading-text {
        font: normal normal 800 1.5rem Nunito sans;
}
.item-Area{
border-radius: 5px;
/* margin-left: 1.5rem; */
padding: 0px 10px;
background: #fff;
border: 1px solid #00204424;
}
.top-icon-div{
color: #136acd;
font-size: 24px;
width:50px;
height:50px;
background: #f1f5f8;
padding: 4px;
border-radius: 50%;
}
.item-text{
font-size: 1rem;
font-weight: 400;
line-height: 1.5;
color: #212529;
}

.item-total{
font-size: 20px;
font-weight: 500;
line-height: 1.2;
}

.pi{
font-size: 1.5rem;
}

.domId {
  height: 530px; 
  border-radius: 5px;
  min-width: 300px;
  overflow: scroll !important;
  background: #ebeff4
  /* background: -webkit-linear-gradient(90deg, rgba(22,34,42,1) 4%, rgba(58,96,115,1) 50%);
  background: -moz-linear-gradient(90deg, rgba(22,34,42,1) 4%, rgba(58,96,115,1) 50%);
  background: -o-linear-gradient(90deg, rgba(22,34,42,1) 4%, rgba(58,96,115,1) 50%);
  background: -ms-linear-gradient(90deg, rgba(22,34,42,1) 4%, rgba(58,96,115,1) 50%);
  background: -khtml-linear-gradient(90deg, rgba(22,34,42,1) 4%, rgba(58,96,115,1) 50%); */
}

::v-deep(.p-person) {
     background-color: #ffffffd0;
    color: #000000;
}

::v-deep(.p-hq) {
     background-color: #ffffffd0;
    color: #000000;
}
</style>