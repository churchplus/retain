import axios from "@/gateway/backendapi";

const workflowFunctions = {
    getContributionItems() {
        return new Promise((resolve, reject) => {
            axios.get(`/api/Financials/Contributions/Items`)
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                   // eslint-disable-next-line
                    NProgress.done();
                    if (error.response) {
                        reject(error.response)
                    } else {
                        reject(error)
                    }
                })
        })
    },

    getWorkflows() {
        return new Promise((resolve, reject) => {
            axios.get(`/api/Workflow/workflows`)
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    // eslint-disable-next-line
                    NProgress.done();
                    if (error.response) {
                        reject(error.response)
                    } else {
                        reject(error)
                    }
                })
        })
    },

    getById(id) {
        return new Promise((resolve, reject) => {
            axios.get(`/api/Workflow/workflowById?id=${id}`)
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    // eslint-disable-next-line
                    NProgress.done();
                    if (error.response) {
                        reject(error.response)
                    } else {
                        reject(error)
                    }
                })
        })
    },

    saveWorkflow(body) {
        return new Promise((resolve, reject) => {
            axios.post(`/api/Workflow/save`, body)
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                   // eslint-disable-next-line
                    NProgress.done();
                    if (error.response) {
                        reject(error.response)
                    } else {
                        reject(error)
                    }
                })
        })
    },

    editWorkflow(body) {
        return new Promise((resolve, reject) => {
            axios.post(`/api/workflow/editworkflow`, body)
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    // eslint-disable-next-line
                    NProgress.done();
                    if (error.response) {
                        reject(error.response)
                    } else {
                        reject(error)
                    }
                })
        })
    }
}

export default workflowFunctions;