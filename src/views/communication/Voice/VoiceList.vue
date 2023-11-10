<template>
    <div>
        <div class="row d-md-flex align-items-center mt-3 mb-4">
            <div class="col-md-6 col-sm-12">
                <div class="search-div d-flex  align-items-center">
                    <span class="mr-2"><el-icon>
                            <Search />
                        </el-icon></span>
                    <input type="text" class="w-100" placeholder="Search here..." v-model="searchVoiceText" />
                </div>
            </div>
        </div>



        <!-- @checkedrow="handleSelectionChange" -->
        <Table :data="searchVoiceList" :headers="voiceHeaders" :checkMultipleItem="false" v-loading="voiceLoading">
            <template #subject="{ item }">
                <div>
                    <div class="font-weight-600">{{ item.subject }}</div>
                </div>
            </template>
            <template #message="{ item }">
                <div>
                    <div class="font-weight-600"><el-button type="success" @click="copyToClipBoard(item)" plain round>Copy
                            URL</el-button></div>
                </div>
            </template>
            <template #dateSent="{ item }">
                <div>
                    <div class="font-weight-600">{{ item.dateSent }}</div>
                </div>
            </template>
            <template #sentByUser="{ item }">
                <div>
                    <div class="font-weight-600">{{ item.sentByUser }}</div>
                </div>
            </template>
            <template #smsUnitsUsed="{ item }">
                <div>
                    <div class="font-weight-600">{{ item.smsUnitsUsed }}</div>
                </div>
            </template>
            <template #report="{ item }">
                <div>
                    <div class="font-weight-600 primary--text c-pointer" @click="$router.push(`/tenant/voice/report/${item.id}`)">View_report</div>
                </div>
            </template>
        </Table>
        <div class="d-flex justify-content-end my-3">
            <el-pagination v-model:current-page="serverOptions.page" v-model:page-size="serverOptions.rowsPerPage" background
                layout="total, sizes, prev, pager, next, jumper" :total="totalSentVoiceList" @size-change="handleSizeChange"
                @current-change="handleCurrentChange" />
        </div>
    </div>
</template>

<script>
import { ref, computed, watch } from "vue"
import Table from "@/components/table/Table"
import store from "../../../store/store"
import { ElMessage } from 'element-plus'
import axios from "@/gateway/backendapi";
export default {
    components: {
        Table
    },
    setup() {
        // const store  = useStore()
        const sentVoiceList = ref([])
        const searchVoiceText = ref("")
        const totalSentVoiceList = ref("");
        const paginationPage = ref("");
        const paginatedTableLoading = ref(false);
        const voiceHeaders = ref([
            { name: 'Subject', value: 'subject' },
            { name: 'Audio URL', value: 'message' },
            { name: 'Date Sent', value: 'dateSent' },
            { name: 'Sent By', value: 'sentByUser' },
            { name: 'Unit used', value: 'smsUnitsUsed' },
            { name: 'Report', value: 'report' }
        ])
        const voiceLoading = ref(false)
        const getAllSentVoice = async () => {
            voiceLoading.value = true
            await store.dispatch("communication/getAllSentVoice").then(res => {
                voiceLoading.value = false
                sentVoiceList.value = res.data
                totalSentVoiceList.value = res.totalItems
                paginationPage.value = res.page
                // console.log(sentVoiceList.value, "jhgjhgjkkgkjj")
            })
        }
        getAllSentVoice();

    const serverOptions = ref({
      page: 1,
      rowsPerPage: 50,
    });

     watch(serverOptions, () => {
      getTransactionByPage();
    },
      { deep: true }
    );

    const handleSizeChange = (val) => {
      console.log(`${val} items per page`)
    }
    const handleCurrentChange = (val) => {
      console.log(`current page: ${val}`)
    }

    const getTransactionByPage = async () => {
      paginatedTableLoading.value = true
      try {
         voiceLoading.value = true
        const { data } = await axios.get(
          `api/Messaging/getAllSentVoice?Page=${serverOptions.value.page}`
        );
        voiceLoading.value = false
        sentVoiceList.value = data.data;
        totalSentVoiceList.value = data.totalItems
        paginationPage.value = data.page
        console.log(sentVoiceList.value, "khkhkjhk");
        paginatedTableLoading.value = false
        getAllSentVoice()
      } catch (error) {
        paginatedTableLoading.value = false
        console.log(error);
      }
    };

        const copyToClipBoard = async (item) => {
            await navigator.clipboard.writeText(item.message).then(() => {
                ElMessage({
                    type: 'success',
                    message: "Copied to clipboard",
                    duration: 5000
                })
            })
        }

        const searchVoiceList = computed(() => {
            if (searchVoiceText.value === "" && sentVoiceList.value.length > 0) return sentVoiceList.value;
            return sentVoiceList.value.filter((i) => {
                return i.subject && i.subject.toLowerCase().includes(searchVoiceText.value.toLowerCase())
            });
        });
        return {
            sentVoiceList,
            serverOptions,
            paginatedTableLoading,
            paginationPage,
            handleSizeChange,
            totalSentVoiceList,
            handleCurrentChange,
            getTransactionByPage,
            voiceLoading,
            voiceHeaders,
            copyToClipBoard,
            searchVoiceList,
            searchVoiceText
        }
    }
}
</script>
<style scoped>
.search-div {
    /* width: fit-content; */
    padding: 10px;
    background: #f5f8f9;
    border-radius: 200px;
}

.search-div input {
    background: none;
    border: none;
    outline: transparent;
}

@media (max-width: 767px) {
    .search-div {
        width: 100%;
    }
}
</style>