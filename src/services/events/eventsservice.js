import axios from "@/gateway/backendapi";

const eventsService = {
    getEvents() {
        return new Promise((resolve, reject) => {
            axios.get("/api/Events/EventActivity")
                .then(res => {
                    resolve(res.data);
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
    },
    getEventsByActivity(id) {
        return new Promise((resolve, reject) => {
            axios.get(`/api/events/${id}`)
                .then(res => {
                    resolve(res.data);
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
    },

    createNewEventCategory(name) {
        return new Promise((resolve, reject) => {
            axios.post(`/api/EventCategory?name=${name}`)
                .then(res => {
                    resolve(res.data);
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
    },

    getEventCategories() {
        return new Promise((resolve, reject) => {
            axios.get(`/api/EventCategory`)
                .then(res => {
                    const data = res.data.map(i => {
                        return { id: i.id, name: i.name }
                    })
                    resolve( data );
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
    },

    createNewActivity(body) {
        return new Promise((resolve, reject) => {
            axios.post(`/api/Events/CreateActivity`, body)
                .then(res => {
                    resolve( res.data );
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
    },
    getEventItems() {
        return new Promise((resolve, reject) => {
            axios.get('/api/EventReports/EventReports?page=1')
                .then(res => {
                    resolve( res.data );
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
    },

    getEventReportSummary() {
        return new Promise((resolve, reject) => {
            axios.get('/api/EventReports/EventReportDashboard?page=1')
                .then(res => {
                    resolve( res.data );
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
    },

    approveServiceReport(body) {
        return new Promise((resolve, reject) => {
            axios.put('/api/Events/approveservicetoggle', body)
                .then(res => {
                    resolve( res.data );
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

export default eventsService;