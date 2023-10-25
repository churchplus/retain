import axios from "@/gateway/backendapi";
const payment = {
    getPayments() {
        return new Promise((resolve, reject) => {
            axios.get("/api/PaymentForm/GetAll")
            .then(res =>{
                resolve(res.data)
                console.log(res.data);
            })
            .catch(error =>{
                NProgress.done()
                if (error.response) {
                    reject(error.response)
                }  else {
                    reject(error);
                }
            })
        })
    },
}
export default payment