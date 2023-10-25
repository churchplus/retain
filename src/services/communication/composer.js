import axios from "@/gateway/backendapi";

const composerObj = {
    searchingMembers: true,

    possibleEmailDestinations: [
        "All contacts",
        "Select group from database",
        "Select person from membership database",
        "Emails",
        
    ],
    possibleBranchSMSDestinations: [
        "All branches",
        "Choose branch(s)",
        "Phone numbers",
        "Upload contacts",
    ],
    
    possibleBranchEMAIlDestinations: [
        "All branch",
        "Choose branch(s)",
        "Emails",
        
        
    ],

    possibleSMSDestinations: [
        "All contacts",
        "Select group from database",
        "Select person from membership database",
        "Phone numbers",
        "Upload contacts",
    ],

    getCommunicationGroups() {
        return new Promise((resolve, reject) => {
            axios.get("/api/Messaging/getCommunicationGroups")
                .then(res => {
                    resolve(res.data);
                })
                .catch(err => reject(err))
        })
    },

    sendMessage(url, data) {
        return new Promise((resolve, reject) => {
            axios.post(url, data)
                .then(res => {
                    console.log(res, "send sms response");
                    resolve(res);
                })
                .catch(err => reject(err))
        })
    },

    schduleMessage(url, data) {
        return new Promise((resolve, reject) => {
            axios.post(url, data)
                .then(res => {
                    console.log(res, "schedule sms response");
                    resolve(res.data);
                })
                .catch(err => reject(err))
        })
    },

    async searchMemberDB(url, query) {
        let members = [ ];
        try {
            this.searchingMembers = true;
            console.log(this.searchingMembers);
            const res = await axios.get(`${url}?searchText=${query}`);
            this.searchingMembers = false;
            members = res.data;
            return members;
        } catch (error) {
            this.searchingMembers = false;
            console.log(error);
        }
        console.log(members, "members");
        // return members;
    },

    saveDraft(data, url) {
        return new Promise((resolve, reject) => {
            axios.post(url, data)
                .then(res => {
                    resolve(res.data);
                })
                .catch(error => {
                    if (error.response) reject(error.response);
                    if (!error.response) reject(error);
                })
        })
    },

    getSMSById(id) {
        return new Promise((resolve, reject) => {
            axios.get(`/api/Messaging/getSentSMSbyId?CommReportId=${id}`)
                .then(res => {
                    console.log(res);
                    resolve(res.data);
                })
                .catch(error => {
                    if (error.response) reject(error.response);
                    if (!error.response) reject(error);
                })
        })
    }
}

export default composerObj;