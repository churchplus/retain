import axios from "@/gateway/backendapi";
import stopProgressBar from "../../services/progressbar/progress"

const startCheckinProces = async () => {
    return new Promise((resolve, reject) => {
        axios.get("/api/People/GetPeopleBasicInfo")
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

const saveCheckAttendanceItem = async (body) => {
    return new Promise((resolve, reject) => {
        axios.post("/api/CheckInAttendance/CheckInAttendanceItem", body)
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

const getItems = async () => {
    return new Promise((resolve, reject) => {
        axios.get(`/api/CheckInAttendance/AllCheckInAttendances?page=1`)
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
}

const getItemByCode = async (code) => {
    return new Promise((resolve, reject) => {
        axios.get(`/api/CheckInAttendance/AttendanceItem?attendanceCode=${code}`)
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
}

const getReport = async (id) => {
    return new Promise((resolve, reject) => {
        axios.get(`/api/CheckInAttendance/AttendanceReport?id=${id}`)
            .then(res => {
                console.log(res, "'in service");
                resolve(res.data);
            })
            .catch(error => {
                console.log(error, "'error in service");
                if (error.response) {
                    reject(error.response);
                } else {
                    reject(error);
                }
            })
    })
}

const checkin = async (body) => {
    return new Promise((resolve, reject) => {
        axios.post(`/api/CheckInAttendance/MarkAttendance`, body)
        // axios.post(`/api/CheckInAttendance/MarkAttendance?CheckInAttendanceID=${id}`, body)
            .then(res => {
                resolve(res.data);
            })
            .catch(error => {
                stopProgressBar();
                if (error.response) {
                    reject(error.response);
                } else {
                    reject(error);
                }
            })
    })
}

const checkout = async (body) => {
    return new Promise((resolve, reject) => {
        axios.post(`/api/CheckInAttendance/CheckOut`, body)
            .then(res => {
                resolve(res.data);
            })
            .catch(error => {
                stopProgressBar();
                if (error.response) {
                    reject(error.response);
                } else {
                    reject(error);
                }
            })
    })
}

const getAttendanceItemsByGroupID = async (id) => {
    return new Promise((resolve, reject) => {
        axios.get(`/api/CheckInAttendance/GetAttendanceItemsByGroupID?groupID=${id}`)
            .then(res => {
                resolve(res.data);
            })
            .catch(error => {
                stopProgressBar();
                if (error.response) {
                    reject(error.response);
                } else {
                    reject(error);
                }
            })
    })
}

const checkinAllMembers = async (payload) => {
    return new Promise((resolve, reject) => {
        axios.post(`/api/CheckinAttendance/MarkAllAttendance`, payload)
            .then(res => {
                resolve(res.data);
            })
            .catch(error => {
                stopProgressBar();
                if (error.response) {
                    reject(error.response);
                } else {
                    reject(error);
                }
            })
    })
}

const generateEventReportDefaultMessage = (eventAnalysisData) => {
    console.log(eventAnalysisData, "data");
    if (eventAnalysisData.activityToday) {
    let message = `SERVICE REPORT\n          ======\n${eventAnalysisData.activityToday.name}\nDate: ${new Date(eventAnalysisData.activityToday.activityDate).toLocaleDateString()}\n\nTotal Attendance: ${eventAnalysisData.todayAttendance}\nTotal Offering: ${eventAnalysisData.tenantCurrencyName} ${eventAnalysisData.todayOffering}`;

    if (eventAnalysisData.todayVsLastWeekAttendancePercentage > 0) {
        message += `\n\nWe recorded a ${eventAnalysisData.todayVsLastWeekAttendancePercentage.toFixed(2)}% increase in attendance since last week.`;
    } else if (eventAnalysisData.todayVsLastWeekAttendancePercentage < 0) {
        message += `\n\nThere was a ${Math.abs(eventAnalysisData.todayVsLastWeekAttendancePercentage).toFixed(2)}% decrease in attendance since last week.`;
    } else {
        message += `\n\nNo increase or decrease in attendance since last week`;
    }

    if (eventAnalysisData.todayVsLastweekOfferingPercentage > 0) {
        message += `\n\nWe recorded ${eventAnalysisData.todayVsLastweekOfferingPercentage.toFixed(2)}% increase in offering since last week.`;
    } else if (eventAnalysisData.todayVsLastweekOfferingPercentage < 0) {
        message += `\n\nThere was a ${Math.abs(eventAnalysisData.todayVsLastweekOfferingPercentage).toFixed(2)}% decrease in offering since last week.`;
        // message += `\nThere was a ${Number.parseFloat(Math.abs(eventAnalysisData.todayVsLastweekOfferingPercentage)).toPrecision(4)}% decrease in offering since last week`;
    } else {
        message += `\n\nOffering was the same with last week.`;
    }
    message += `\n          ------------\nPowered by churchplus.co`
    return message;
    }
    if (eventAnalysisData.todayContributions) {
        // let message = `OFFERING REPORT\n          ======\n\nTotal Offering: ${eventAnalysisData.totalToday}`
        let message = `OFFERING REPORT\n          ======\n${eventAnalysisData.todayContributions[0].eventName}\nDate: ${new Date(eventAnalysisData.todayContributions[0].date).toLocaleDateString()}\n\nTotal Offering: ${eventAnalysisData.tenantCurrency} ${Math.abs(eventAnalysisData.totalToday).toLocaleString()}`;


    if (eventAnalysisData.totalToday > 0) {
        message += `\n\nWe recorded ${eventAnalysisData.todayVsLastWeek.toFixed(2)}% increase in offering since last week.`;
    } else if (eventAnalysisData.totalToday < 0) {
        message += `\n\nThere was a ${Math.abs(eventAnalysisData.todayVsLastWeek).toFixed(2)}% decrease in offering since last week.`;
        // message += `\nThere was a ${Number.parseFloat(Math.abs(eventAnalysisData.todayVsLastweekOfferingPercentage)).toPrecision(4)}% decrease in offering since last week`;
    } else {
        message += `\n\nOffering was the same with last week.`;
    }
    message += `\n          ------------\nPowered by churchplus.co`
    return message;
    }
}


export default { saveCheckAttendanceItem, startCheckinProces, getItems, getItemByCode, getReport, checkin, checkout, checkinAllMembers, generateEventReportDefaultMessage, getAttendanceItemsByGroupID };