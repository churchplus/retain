import axios from "@/gateway/backendapi";


    const userRoles = () => {
        return new Promise((resolve, reject) => {
            axios.get("/api/Settings/GetAllRoles")
                .then(res => {
                    console.log(res)
                    resolve(res);
                })
                .catch(error => {
                     NProgress.done();
                    if (error.response) {
                        reject(error.response);
                    } else {
                        reject(error);
                    }
                })
        })
    }

export default userRoles;