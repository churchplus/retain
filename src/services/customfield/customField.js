import axios from '@/gateway/backendapi'

export default {
    allCustomFields () {
        return new Promise ((resolve, reject) => {
            axios.get("/api/CustomFields/GetAllCustomFields")
                .then(res => {
                    resolve(res.data)
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