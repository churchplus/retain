<template>
<div class="dropdown">
        <button v-if="tenantCurrency" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="converter-button cursor-pointer" >{{ selectedDestinationCurrencyRate ? selectedDestinationCurrencyRate.toString().length >  15 ? `${selectedDestinationCurrencyRate.slice(0, 15)}...` : selectedDestinationCurrencyRate : tenantCurrency }}</button>

    <!-- </div> -->
        <div class="dropdown-menu style-account" aria-labelledby="dropdownMenuButton">
    <div class="p-2">
        <input
        type="text"
        placeholder="Search"
        class="form-control close-modal ofering mb-1"
        v-model="currencyText"
        ref="search"
    />
    </div>
            <div class="manual-dd-item close-modal ofering" v-for="item in filterCurrency" :key="item.id">
                <div class="d-flex justify-content-between p-1 close-modal ofering">
                    <div class="close-modal offset-sm-1 ofering" @click="addCurrency($event, index, item)">{{ item.name }} - {{ item.country }}</div>      
                </div>                      
            </div>
              </div>
            </div>


</template>

<script>
import { ref, computed } from "vue"
import axios from "@/gateway/backendapi"
export default {
    components: {
        
    },
    props:  ['tenantCurrency', 'currencyList', 'currencyAmount'],
    setup (props, { emit }) {
        const showCurrency = ref(false)
        const currencyText = ref("")
        const selectedDestinationCurrencyRate = ref("")
        const search = ref("")
        const currencyRates = ref({})


        const fromCurrencyRate = computed(() => {
            if (props.selectedCurrency) return `usd${props.selectedCurrency.toLowerCase()}`
            return `usd${props.tenantCurrency ? props.tenantCurrency.toLowerCase() : ""}`
        })
        
        const toDestinationCurrencyRate = computed(() => {
            if (selectedDestinationCurrencyRate.value) return `usd${selectedDestinationCurrencyRate.value.toLowerCase()}`
            return `usd${props.tenantCurrency ? props.tenantCurrency.toLowerCase() : ""}`
        })

        // From Selected to tenant
        // Props attribute to remove
        // selectedCurrency

    

        const getConvertedCurrency = async() => {
            try {
                let { data } = await axios.get('/fxRates')
                console.log(data)
                currencyRates.value = data
                emit("currency-rate", data)
            }
            catch(error) {
                console.log(error)
            }
        }
        getConvertedCurrency()

        const listOfCurrency = computed(() => {
            if (props.currencyList.length > 0) return props.currencyList.map(i => `${i.name} - ${i.country}`)
            return []
        })

        const filterCurrency = computed(() => {
            if (currencyText.value !== "" && props.currencyList.length > 0) {
                return props.currencyList.filter((i) => {
                if (i.name) return i.name.toLowerCase().includes(currencyText.value.toLowerCase()) || i.country.toLowerCase().includes(currencyText.value.toLowerCase())
                })
            } else {
                return props.currencyList
            }
        })

        const addCurrency = (e, index, item) => {
            selectedDestinationCurrencyRate.value = `${item.name}`
            console.log(e, index, item)
            showCurrency.value = false

            let amount = +props.currencyAmount
            let propertyArr = Object.keys(currencyRates.value)
            let valueArr = Object.values(currencyRates.value)
            let fromIndex = propertyArr.indexOf(fromCurrencyRate.value)
            let fromRate = valueArr[fromIndex]
            let toIndex = propertyArr.indexOf(toDestinationCurrencyRate.value)
            let toRate = valueArr[toIndex]

            let result = ( amount / fromRate ) * toRate
            console.log(result)
            emit('conversion-result', result)

            
        }

        const showCurrencyList = () => {
            showCurrency.value = !showCurrency.value
                    search.value.focus()
            console.log(showCurrency.value)
        }


        return {
            fromCurrencyRate, listOfCurrency, showCurrency, filterCurrency, currencyText, selectedDestinationCurrencyRate, addCurrency, search, toDestinationCurrencyRate, currencyRates, showCurrencyList
        }
    }
}
</script>

<style scoped>
 .style-account {
    box-shadow: 0px 3px 15px #797e8159;
    position: absolute;
    background: white;
    z-index: 1;
    width: 160px;
    max-height: 14em;
    overflow-y: scroll;
    font-weight: 500;
    font-size: 15px;
    }
    .style-account div div:hover {
    background-color: #ecf0f3;
    cursor: pointer;
    }

    .converter-button {
        border: 1px solid #b2c2cd;
        padding: 6px 10px;
        border-radius: 5px;
        font-size: 16px;
        color: rgb(49, 49, 49);
        background: #fff;
    }
</style>