import axios from "@/gateway/backendapi";
import stopProgressBar from "../../services/progressbar/progress"
import store from '../../store/store';

const grousService = {
    async getGroups() {
        try {
            const { data } = await axios.get("/api/GetAllGroupBasicInformation");
            return data;
        } catch (error) {
            stopProgressBar();
            console.log(error);
        }
    },

    getGroupById(groupId) {
        return new Promise((resolve, reject) => {
            axios.get(`/api/GetGroupsFromId/${groupId}`)
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
    },

    async removeFromGroup(id, body) {
        try {
            const { data } = await axios.put(`/api/RemovePeopleFromGroup/${id}`, body);
            return data;
        } catch (error) {
            stopProgressBar();
            console.log(error);
            return false;
        }
    },

    async deleteGroup(id) {
        try {
            const { data } = await axios.delete(`/api/DeleteGroup/${id}`);
            return data;
        } catch (error) {
            stopProgressBar();
            console.log(error);
            return false;
        }
    },
    
    async removeGroup({ superGroupID, subGroupID }) {
        try {
            const { data } = await axios.post(`/api/Group/RemoveSubGroupFromGroup?superGroupID=${superGroupID}&subGroupID=${subGroupID}`);
            return data;
        } catch (error) {
            stopProgressBar();
            console.log(error);
            return false;
        }
    },

    async editGroupInStore(data, peopleCount) {
        try {
            const group = {
                id: data.id,
                name: data.name,
                peopleInGroupsCount: peopleCount,
            }
            store.dispatch("groups/updateGroup", group);
        } catch (error) {
            console.log(error);
        }
    },

    async removeGroupFromStore(index) {
        try {
            store.dispatch("groups/removeGroup", index);
        } catch (error) {
            console.log(error);
        }
    },

    async removeMultipleMemberFromGroup(groupId, personIds) {
        try {
            const { data } = await axios.put("/api/RemoveMultiplePeopleFromGroup", {
                groupId: groupId,
                personIds: personIds
            });
            return data;
        } catch (error) {
            stopProgressBar();
            console.log(error);
        }
    }
}

export default grousService;