import axios from "@/gateway/backendapi"

let productPricing = {
    getProductPricing (id) {
        return new Promise((resolve, reject) => {
            axios.get(`/Public/ProductPricingByCountryID?CountryID=${id}`)
                .then(res => {
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }
}

export default productPricing