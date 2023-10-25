// import router from "../router/index"
// import store from "@/store/store.js"
// import membershipService from "../services/membership/membershipservice";

// const expiredSubMixin = {
//     // beforeCreate() {
//     //     const token = localStorage.getItem("token");
//     //     if (token) return router.push('/tenant')
//     // },
//     created() {
//         //  Route users to Expiry subscription page if subscription is expired
//         const currentUser = store.getters.currentUser;
//         if (!currentUser || !currentUser.subStatus) {
//             membershipService.getSignedInUser()
//                 .then(res => {
//                     if (res.subStatus === 'Expired'){
//                         return router.push('/errorpage/expiredSubscription')
//                     }
//                 })
//         } else {
//             if (currentUser.subStatus === 'Expired'){
//                 return router.push('/errorpage/expiredSubscription')
//             }
//         }
        
//     },
// }

// export default expiredSubMixin;