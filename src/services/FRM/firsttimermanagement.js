import axios from "@/gateway/backendapi";

const frm = {
    getLifeCycle () {
        return new Promise((resolve, reject) => {
            axios.get(`/firstimercycle`)
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    if (error.response) {
                        reject(error.response);
                    } else {
                        reject(error);
                    }
                })
        })   
    },
    updateContactOwner (firstTimerID, body) {
        return new Promise((resolve, reject) => {
            axios.put(`/api/FirsttimerManager/${firstTimerID}/owner/change`, body)
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    if (error.response) {
                        reject(error.response);
                    } else {
                        reject(error);
                    }
                })
        })   
    },
    updateLifeCycle (firstTimerID, body) {
        return new Promise((resolve, reject) => {
            axios.put(`/api/FirsttimerManager/${firstTimerID}/lifecycle/update`, body)
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    if (error.response) {
                        reject(error.response);
                    } else {
                        reject(error);
                    }
                })
        })   
    },
    updateLeadStatus (firstTimerID, statusID) {
        return new Promise((resolve, reject) => {
            axios.put(`/api/FirsttimerManager/${firstTimerID}/status/update?status=${statusID}`)
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    if (error.response) {
                        reject(error.response);
                    } else {
                        reject(error);
                    }
                })
        })   
    },
    priority () {
        let priority = [{ name: 'High', id: 0 }, { name: 'Low', id: 1 }]
        return priority
    },
    leadStatus () {
        let leadStatus = [{ name: 'Active', id: 0 }, { name: 'Paused', id: 1 }, { name: 'Converted', id: 2 }]
        return leadStatus
    },
    dayOfTheWeek (day) {
        switch (day) {
            case 0 : 
            return "Sunday";

            case 1 :
            return "Monday";

            case 2 :
            return "Tuesday";

            case 3 :
            return "Wednesday";

            case 4 :
            return "Thursday";

            case 5 :
            return "Friday";

            case 6 :
            return "Saturday";
        }
    },
    dueDate () {
        const dueDate = [];
        const todayDate = new Date()
        const tomorrowDate = new Date()
        const twoDays = new Date()
        const threeDays = new Date()
        const oneWeek = new Date()
        const twoWeeks = new Date()
        const oneMonth = new Date()
        let numberOfWeeks;

        const today = {
            name: 'Today',
            value: todayDate.toISOString()
        }
        dueDate.push(today)

        tomorrowDate.setDate(tomorrowDate.getDate() + 1)
        const tomorrow = {
            name: 'Tomorrow',
            value: tomorrowDate.toISOString()
        }
        dueDate.push(tomorrow)
        
        twoDays.setDate(twoDays.getDate() + 2)
        const inTwoDays = {
            name: `In 2 days (${this.dayOfTheWeek(twoDays.getDay())})`,
            value: twoDays.toISOString()
        }
        dueDate.push(inTwoDays)
        
        threeDays.setDate(threeDays.getDate() + 3)
        const inThreeDays = {
            name: `In 3 days (${this.dayOfTheWeek(threeDays.getDay())})`,
            value: threeDays.toISOString()
        }
        dueDate.push(inThreeDays)
        
        
        oneWeek.setDate(oneWeek.getDate() + 7)
        const inOneWeek = {
            name: `In One Week (${oneWeek.toString().substring(4, 10)})`,
            value: oneWeek.toISOString()
        }
  
        dueDate.push(inOneWeek)
        
        numberOfWeeks = 2;
        twoWeeks.setDate(twoWeeks.getDate() + numberOfWeeks * 7)
        const inTwoWeeks = {
            name: `In Two Weeks (${twoWeeks.toString().substring(4, 10)})`,
            value: twoWeeks.toISOString()
        }
  
        dueDate.push(inTwoWeeks)
        
        numberOfWeeks = 4;
        oneMonth.setDate(oneMonth.getDate() + numberOfWeeks * 7)
        const inOneMonth = {
            name: `In One Month (${oneMonth.toString().substring(4, 10)})`,
            value: oneMonth.toISOString()
        }
  
        dueDate.push(inOneMonth)
        return dueDate
    },
    reminder (payload) {
        console.log(payload)
        const reminder = []
        const thirtyMins = payload ? new Date(payload) : new Date()
        const oneHour =  payload ? new Date(payload) : new Date()
        const aDayBefore = payload ? new Date(payload) : new Date()

        thirtyMins.setTime(payload ? new Date(payload).getTime() - (30 * 60 * 1000) : new Date().getTime() - (30 * 60 * 1000));
        const thirtyMinsBefore = {
            name: '30 minutes before',
            value: thirtyMins.toISOString()
        }
        reminder.push(thirtyMinsBefore)


        oneHour.setHours(oneHour.getHours() - 1)
        const oneHourBefore = {
            name: '1 hour before',
            value: oneHour.toISOString()
        }
        reminder.push(oneHourBefore)

        aDayBefore.setDate(aDayBefore.getDate() - 1)
        const oneDayBefore = {
            name: '1 day before',
            value: aDayBefore.toISOString()
        }
        reminder.push(oneDayBefore)

        return reminder

    },
    saveTask (body) {
        return new Promise((resolve, reject) => {
            axios.post('/api/FirsttimerManager/tasks/create', body)
                .then(res => {
                    resolve(res.data)
                })
                .catch(error => {
                    if (error.response) {
                        reject(error.response)
                    }   else {
                        reject(error)
                    }
                })
        })
    },
    getAllLogs (id) {
        return new Promise((resolve, reject) => {
            axios.get(`/api/FirsttimerManager/logs?firsttimerID=${id}`)
                .then(res => {
                    resolve(res.data)
                })
                .catch(error => {
                    if (error.response) {
                        reject(error.response)
                    }   else {
                        reject(error)
                    }
                })
        })
    },
    createLog (body) {
        return new Promise((resolve, reject) => {
            axios.post(`/api/FirsttimerManager/activity/log`, body)
                .then(res => {
                    resolve(res.data)
                })
                .catch(error => {
                    if (error.response) {
                        reject(error.response)
                    }   else {
                        reject(error)
                    }
                })
        })
    },
    sendEmail (firsttimerID, body) {
        return new Promise((resolve, reject) => {
            axios.post(`/api/FirsttimerManager/${firsttimerID}/sendemail`, body)
                .then(res => {
                    resolve(res.data)
                })
                .catch(error => {
                    if (error.response) {
                        reject(error.response)
                    }   else {
                        reject(error)
                    }
                })
        })
    },
    saveNote (firsttimerID, body) {
        return new Promise((resolve, reject) => {
            axios.post(`/api/FirsttimerManager/${firsttimerID}/notes/add`, body)
                .then(res => {
                    resolve(res.data)
                })
                .catch(error => {
                    if (error.response) {
                        reject(error.response)
                    }   else {
                        reject(error)
                    }
                })
        })
    },
    sendSms (firsttimerID, body) {
        return new Promise((resolve, reject) => {
            axios.post(`/api/FirsttimerManager/${firsttimerID}/sendsms`, body)
                .then(res => {
                    resolve(res.data)
                })
                .catch(error => {
                    if (error.response) {
                        reject(error.response)
                    }   else {
                        reject(error)
                    }
                })
        })
    },
    comment (taskId, body) {
        return new Promise((resolve, reject) => {
            axios.post(`/api/FirsttimerManager/task/${taskId}/comment`, body)
                .then(res => {
                    resolve(res.data)
                })
                .catch(error => {
                    if (error.response) {
                        reject(error.response)
                    }   else {
                        reject(error)
                    }
                })
        })
    },
    deleteComment (commentId) {
        return new Promise((resolve, reject) => {
            axios.delete(`/api/FirsttimerManager/comment/${commentId}/delete`)
                .then(res => {
                    resolve(res.data)
                })
                .catch(error => {
                    if (error.response) {
                        reject(error.response)
                    }   else {
                        reject(error)
                    }
                })
        })
    },
    editComment (commentId, body) {
        return new Promise((resolve, reject) => {
            axios.put(`/api/FirsttimerManager/comment/${commentId}/edit`, body)
                .then(res => {
                    resolve(res.data)
                })
                .catch(error => {
                    if (error.response) {
                        reject(error.response)
                    }   else {
                        reject(error)
                    }
                })
        })
    },
    editTask (taskId, body) {
        return new Promise((resolve, reject) => {
            axios.put(`/api/FirsttimerManager/task/${taskId}/edit`, body)
                .then(res => {
                    resolve(res.data)
                })
                .catch(error => {
                    if (error.response) {
                        reject(error.response)
                    }   else {
                        reject(error)
                    }
                })
        })
    },
    editBasicDetails (body) {
        return new Promise((resolve, reject) => {
            axios.put(`/api/People/EditFirstTimer`, body)
                .then(res => {
                    resolve(res.data)
                })
                .catch(error => {
                    if (error.response) {
                        reject(error.response)
                    }   else {
                        reject(error)
                    }
                })
        })
    }
}

export default frm