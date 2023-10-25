import axios from "@/gateway/backendapi";

const authService = {
    resetPassword(data) {
        return new Promise((resolve, reject) => {
            axios.post(`/PasswordReset`, data)
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    /*eslint no-undef: "warn"*/
                    NProgress.done();
                    if (error.response) {
                        reject(error.response)
                    } else {
                        reject(error)
                    }
                })
        })
    },

    forgotPassword(email) {
        return new Promise((resolve, reject) => {
            axios.post(`/forgotpassword/${email}`)
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    NProgress.done();
                    if (error.response) {
                        resolve(error.response)
                    } else {
                        /*eslint no-undef: "warn"*/
                        reject(error)
                    }
                })
        })
    }
}

export default authService;