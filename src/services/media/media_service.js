import axios from "@/gateway/backendapi";
import stopProgressBar from "../../services/progressbar/progress";

const uploadMedia = (body) => {
    return new Promise((resolve, reject) => {
        axios.post(`/api/Media/UploadMedia`, body)
        .then(res => {
            resolve(res.data);
        })
        .catch(err => {
            stopProgressBar();
            if (err.response) {
                reject(err.response);
            } else {
                reject(err);
            }
        })
    })
}

const getMedia = (tenantId) => {
    return new Promise((resolve, reject) => {
        axios.get(`/api/Media/GetAllMedia?tenantId=${tenantId}`)
        .then(res => {
            console.log(res, "medai")
            resolve(res.data);
          
        })
        .catch(err => {
            if (err.response) {
                reject(err.response);
            } else {
                reject(err);
            }
        })
    })
}

const getMediaById = (mediaId) => {
    return new Promise((resolve, reject) => {
        axios.get(`/api/Media/GetMediaById?mediaId=${mediaId}`)
        .then(res => {
            resolve(res.data);
        })
        .catch(err => {
            if (err.response) {
                reject(err.response);
            } else {
                reject(err);
            }
        })
    })
}

const getImageGallery = (page) => {
    return new Promise((resolve, reject) => {
        axios.get(`/api/Media/ImageGallery/${page}`)
        .then(res => {
            resolve(res.data);
        })
        .catch(err => {
            if (err.response) {
                reject(err.response);
            } else {
                reject(err);
            }
        })
    })
}

const deleteMedia = (mediaId) => {
    return new Promise((resolve, reject) => {
        axios.delete(`/api/Media/DeleteMedia?mediaid=${mediaId}`)
        .then(res => {
            resolve(res.data);
        })
        .catch(err => {
            if (err.response) {
                reject(err.response);
            } else {
                reject(err);
            }
        })
    })
}

export default {
    uploadMedia,
    getMedia,
    getMediaById,
    getImageGallery,
    deleteMedia,
}