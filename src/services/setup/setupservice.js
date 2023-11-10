// import { useStore } from "vuex";
import store from "../../store/store"
// const store = useStore();

const setupService = {
    setup() {
        // store.dispatch("communication/getAllSentSMS");
        store.dispatch("communication/getAllSMS");
        store.dispatch("communication/getSMSReplies");
        store.dispatch("communication/getAllSentEmails");
        store.dispatch("communication/getEmailDrafts");
        store.dispatch("communication/getSMSDrafts");
        store.dispatch("lookups/setup");
        store.dispatch("lookups/getPeopleClassifications");
        store.dispatch("lookups/getUserSources");
        store.dispatch("membership/setMembers");
        store.dispatch("membership/setMembers");
        // store.dispatch("membership/getFirstTimers");
        store.dispatch('contributions/contributionList')
        store.dispatch("communication/addSmsToSentList");
        // store.dispatch("communication/addToSentEmail");
    },

    clearStore() {
        store.dispatch("clearState");
        store.dispatch("attendance/clearState");
        store.dispatch("communication/clearState");
        store.dispatch("contributions/clearState");
        store.dispatch("dashboard/clearState");
        store.dispatch('membership/clearMember')
        store.dispatch("clearPeopleInStore");
        store.dispatch('groups/clearGroup')
        store.dispatch('pledge/clearState')
        store.dispatch('payment/clearState')
        store.dispatch('event/clearState')
        store.dispatch('transaction/clearState')
        store.dispatch('family/clearState')
        store.dispatch("donation/clearState")
        store.dispatch("branch/clearState")

    }
}

export default setupService;