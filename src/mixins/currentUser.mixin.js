import router from "../router/index"
import store from "@/store/store.js"
import membershipService from "../services/membership/membershipservice";

const currentUser = {
    methods: {
        getCurrentUser() {
            membershipService.getSignedInUser()
                .then(res => {
                    store.dispatch("setCurrentUser", res);

                    // If subscription plan is below the churchsize
                    if (res.churchSize >= res.subscribedChurchSize) {
                        return router.push("/errorpage/member-capacity-reached")
                    }

                    // If subscrition is expired
                    if (res.subStatus.toLowerCase() === 'expired') {
                        return router.push('/errorpage/expiredSubscription')
                    }
                }).catch((err) => {
                    // If the user is unauthorized
                    if (err.response && err.response.status === 401) {
                        localStorage.setItem("token", "");
                        router.push("/");
                    }
                })
        }

    },
}

export default currentUser;