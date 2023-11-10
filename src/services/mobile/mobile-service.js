import axios from "@/gateway/backendapi";

const validateColor = (color) => {
    return new Promise((resolve, reject) => {
        console.log(color, color.length, typeof(color))
        let url = `/mobile/v1/Profile/CheckColorSaturation?backGroundColor=${color.slice(1, color.length)}`;
        axios.get(url)
            .then(res => {
                resolve(res.data);
            })
            .catch(error => {
                 /*eslint no-undef: "warn"*/
                 NProgress.done();
                if (error.response) {
                    reject(error.response);
                } else {
                    reject(error);
                }
            })
    })
}

export default {
    validateColor
}