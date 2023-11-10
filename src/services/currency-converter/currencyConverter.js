import axios from "@/gateway/backendapi";
import store from "../../store/store";

let converter = {
  async currencyConverter(amount, fromCurrencyRate, toDestinationCurrencyRate) {
    let currencyRate = store.getters.getRates
    if (Object.keys(store.getters.getRates).length > 0) { 
      currencyRate = store.getters.getRates
      console.log(currencyRate)
    } else {
      await axios.get("/fxRates")
          .then((res) => {
            currencyRate = res.data;
          })
          .catch((err) => {
            console.log(err)
          });
    }
        
    
    let propertyArr = Object.keys(currencyRate);
    let valueArr = Object.values(currencyRate);
    let fromIndex = propertyArr.indexOf(fromCurrencyRate);
    let fromRate = valueArr[fromIndex];
    let toIndex = propertyArr.indexOf(toDestinationCurrencyRate);
    let toRate = valueArr[toIndex];
    let result = (amount / fromRate) * toRate;
    console.log(result, currencyRate, fromCurrencyRate, fromIndex, fromRate, toIndex, toRate);
    return result;
  },
  async convertCurrencyTo(amount, fromCurrencyRate, toDestinationCurrencyRate) {
    console.log(amount,fromCurrencyRate, toDestinationCurrencyRate, 'sucess');
    let currencyRate = {...store.getters.getRates};
    console.log(store.getters.getRates, "rates");
    if (currencyRate && currencyRate.length > 0) {
      currencyRate = store.getters.getRates;
    } else {
      currencyRate = await this.getConversionData();
    }
    console.log(currencyRate, 'currencyRate');
    let propertyArr = Object.keys(currencyRate);
    let valueArr = Object.values(currencyRate);
    console.log(propertyArr, 'propertyArr');
    console.log(valueArr, 'valueArr');
    let fromIndex = propertyArr.indexOf('usd'+fromCurrencyRate);
    let fromRate = valueArr[fromIndex];
    // console.log( fromRate, ' amountIinDol');

    // let toIndex = propertyArr.indexOf(toDestinationCurrencyRate);
    // let toRate = valueArr[toIndex];

    // let result = (amount / fromRate) * toRate;
    console.log(fromRate, 'fromRate');
    return fromRate * amount;
  },

  conversionData: {},

  getConversionData() {
    let vm = this;
    return new Promise((resolve, reject) => {
      if (vm.conversionData.usdngn) {
        resolve(vm.conversionData);
      } else {
        axios
          .get("/fxRates")
          .then((res) => {
            vm.conversionData = res.data;
            resolve(res.data);
          })
          .catch((err) => {
            if (err.response) {
              reject(err.response);
            } else {
              reject(err);
            }
          });
      }
    });
  },
};

export default converter;
