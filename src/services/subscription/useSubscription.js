import axios from "@/gateway/backendapi";

let userPlan = {}
const getPlan = async () => {
    try {
        const response = await axios.get(`/api/Subscription/GetSubscription`)
        userPlan = response.data.returnObject.subscriptionPlans.find((i) => {
            return i.id === response.data.returnObject.id
        })
        if (userPlan.id) return response.data.returnObject;
    } catch (error) {

        console.log(error)
    }
}

export default {
    userPlan, getPlan
}