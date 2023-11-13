import axios from "@/gateway/backendapi";
import store from '../../store/store'

const userService = {
    getCurrentUser() {
        return new Promise((resolve, reject) => {
            axios.get("/api/Membership/GetCurrentSignedInUser")
                .then(res => {
                    resolve(res.data);
                    store.dispatch("setCurrentUser", res.data);
                })
                .catch(error => {
                     // eslint-disable-next-line
                     NProgress.done();
                    if (error.response) {
                        reject(error.response);
                    } else {
                        reject(error);
                    }
                })
        })
    }
}

export default userService;