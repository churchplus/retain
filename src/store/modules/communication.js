
import communicationService from "../../services/communication/communicationservice"

const defaultState = (() => ({
    allSentSMS: [],
    sentSMS: {},
    smsReplies: [],
    smsDrafts: [],
    emailDrafts: [],
    sentEmails: {},
    addSmsToSentList: {},
    addToSentEmail: {},
    sentVoiceList: [],
    whatsappSessionId: "",
    isWhatsappClientReady: false,
    allClientWhatsappChat: [],
    scheduledWhatsappList: []
}))

export default {
    namespaced: true,
    state: defaultState(),

    mutations: {
        setAllSentSMS(state, payload) {
            state.allSentSMS = payload;
        },
        

        setSMSReplies(state, payload) {
            state.smsReplies = payload;
        },

        setSMSDrafts(state, payload) {
            state.smsDrafts = payload;
        },

        addDraft(state, payload) {
            state.smsDrafts.push(payload);
        },

        SET_SENTEMAILS(state, payload) {
            state.sentEmails = payload;
        },
        SET_SENTSMS(state, payload) {
            state.sentSMS = payload;
        },

        setEmailDrafts(state, payload) {
            state.emailDrafts = payload;
        },
        addSmsToSentList(state, payload) {
            if (state.sentSMS.data) {
                state.sentSMS.data.unshift(payload)
            }
        },
        addToSentEmail(state, payload) {
            state.sentEmails.data.unshift(payload)
        },
        removeSentSMS(state, payload) {
            const x = state.sentSMS.data.findIndex(i => i.id === payload);
            if (x >= 0) {
                state.sentSMS.data.splice(x, 1);
            }
        },
        removeSentReplies(state, payload) {
            const b = state.smsReplies.findIndex(i => i.id === payload);
            if (b >= 0) {
                state.smsReplies.splice(b, 1)
            }
        },
        removeSmsDrafts(state, payload) {
            const d = state.smsDrafts.findIndex(i => i.id === payload);
            if (d >= 0) {
                state.smsDrafts.splice(d, 1)
            }
        },
        removeEmailDrafts(state, payload) {
            const m = state.emailDrafts.findIndex(i => i.id === payload);
            if (m >= 0) {
                state.emailDrafts.splice(m, 1)
            }
        },

        removeSentEmails(state, payload) {
            state.sentEmails.data = state.sentEmails.data.filter(i => i.id !== payload);

        },

        setSentVoiceList(state, payload) {
            state.sentVoiceList = payload
        },
        setSessionId(state, payload) {
            state.whatsappSessionId = payload
        },
        SET_WHATSAPP_STATE(state, payload) {
            state.isWhatsappClientReady = payload
        },
        SET_CLIENT_CHAT(state, payload) {
            state.allClientWhatsappChat = payload
        },
        setScheduledWhatsappMessage(state, payload) {
            state.scheduledWhatsappList = payload
        },

        // clearState(state) {
        //     state.allSentSMS = []
        //     state.smsReplies = []
        //     state.smsDrafts = []
        //     state.emailDrafts = []
        //     state.sentEmails = []
        //     state.addSmsToSentList = {}
        //     state.addToSentEmail = {}
        //     state.sentVoiceList = []
        //     state.whatsappSessionId = "",
        //         state.isWhatsappClientReady = false,
        //         state.allClientWhatsappChat = []
        // }
        clearState(state) {
            Object.assign(state, defaultState())
        }
    },

    actions: {
        setAllSentSMS({ commit }, payload) {
            commit("setAllSentSMS", payload)
        },

        setSMSReplies({ commit }, payload) {
            commit("setAllSentSMS", payload)
        },

        setSMSDrafts({ commit }, payload) {
            commit("setSMSDrafts", payload)
        },

        addDraft({ commit }, payload) {
            commit("addDraft", payload)
        },
        addSmsToSentList({ commit }, payload) {
            commit("addSmsToSentList", payload)
        },
        addToSentEmail({ commit }, payload) {
            commit("addToSentEmail", payload)
        },

        

        async getSMSReplies({ commit }) {
            try {
                const data = await communicationService.getSMSReplies(1);
                if (data) commit("setSMSReplies", data);
            } catch (error) {
                console.log(error);
            }
        },

        async getSMSDrafts({ commit }) {
            try {
                const data = await communicationService.getDrafts();
                if (data) commit("setSMSDrafts", data);
            } catch (error) {
                console.log(error);
            }
        },

        getAllSentEmails({ commit }) {
            return communicationService.getSentEmails().then(response => {
                commit('SET_SENTEMAILS', response)
                return response
            })
        },

        getAllSMS({ commit }) {
            return communicationService.getAllSentSMS().then(response => {
                commit('SET_SENTSMS', response)
                return response
            })
        },
        


        async getEmailDrafts({ commit }) {
            try {
                const data = await communicationService.getEmailDrafts(0);
                if (data) commit("setEmailDrafts", data);
            } catch (error) {
                console.log(error);
            }
        },

        removeSentSMS({ commit }, payload) {
            commit("removeSentSMS", payload);
        },

        removeSentReplies({ commit }, payload) {
            commit("removeSentReplies", payload)
        },

        removeSmsDrafts({ commit }, payload) {
            commit("removeSmsDrafts", payload)
        },
        removeEmailDrafts({ commit }, payload) {
            commit("removeEmailDrafts", payload)
        },
        removeSentEmails({ commit }, payload) {
            commit("removeSentEmails", payload)
        },
        getAllSentVoice({ commit }) {
            return communicationService.getAllSentVoice().then(response => {
                console.log(response)
                commit("setSentVoiceList", response)
                return response
            })
        },
        whatsappSessionId({ commit }, payload) {
            commit('setSessionId', payload)
        },
        isWhatsappClientReady({ commit }, payload) {
            commit('SET_WHATSAPP_STATE', payload)
        },
        allClientChat({ commit }, payload) {
            commit('SET_CLIENT_CHAT', payload)
            console.log(payload, 'hhhhh');
        },
        async setScheduledWhatsappMessages({ commit }) {
            return communicationService.getAllScheduledWhatsappMessage().then(response => {
                console.log(response)
                commit("setScheduledWhatsappMessage", response)
                return response
            })
        },
        clearState({ commit }) {
            commit("clearState")
        },
    },

    getters: {
        allSentSMS: state => state.allSentSMS,
        getSentSMS: (state) => {
            return state.sentSMS
        },
        getById: (state) => (id) => state.sentSMS.find(i => i && i.id === id),
        smsReplies: state => state.smsReplies,
        smsDrafts: state => state.smsDrafts,
        emailDrafts: state => state.emailDrafts,
        getSentEmail: (state) => {
            return state.sentEmails
        },
        getEmailDraftById: state => id => state.emailDrafts.find(i => i.id === id),
        addSmsToSentList: state => state.addSmsToSentList,
        addToSentEmail: state => state.addToSentEmail,
        sentVoiceList: state => state.sentVoiceList,
        whatsappSessionId: state => state.whatsappSessionId,
        isWhatsappClientReady: state => state.isWhatsappClientReady,
        allClientWhatsappChat: state => state.allClientWhatsappChat,
        scheduledWhatsappList: state => state.scheduledWhatsappList
    },
}