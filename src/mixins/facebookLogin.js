import axios from "@/gateway/backendapi";
import finish from "../services/progressbar/progress";
import router from "../router/index";
import { ElNotification } from 'element-plus'
import { ref } from 'vue'


function FBLogin() {
    const displayModal = ref(false)
    const emailLoading = ref(false)
    const invalidEmailObj = ref({});


    const facebookLogin = () => {
        FB.login(
            function (response) {
                let token = {
                    accessToken: response.authResponse.accessToken,
                };
                axios
                    .post("/Login/Facebook", token)
                    .then((res) => {
                        finish();
                        if (res.data.success === "Email Required") {
                            displayModal.value = true;
                            invalidEmailObj.value = res.data;
                        } else if (res.data.isOnboarded) {
                            localStorage.setItem("email", res.data.username);
                            localStorage.setItem("token", res.data.token);
                            router.push("/tenant");
                        } else {
                            localStorage.setItem("email", res.data.username);
                            localStorage.setItem("pretoken", res.data.token);
                            router.push("/onboarding");
                        }
                    })
                    .catch((err) => {
                        finish();
                        console.log(err);
                    });
            }
        )
    }

    const saveEmail = async () => {
        emailLoading.value = true
        try {
            const res = await axios.post(
                "/Register/Facebook",
                invalidEmailObj.value
            )
            displayModal.value = false;
            emailLoading.value = false
            ElNotification({
                title: 'Success',
                message: 'Email saved successfully',
                type: 'success',
            })
            if (res.data.isOnboarded) {
                localStorage.setItem("email", res.data.username);
                localStorage.setItem("token", res.data.token);
                router.push("/tenant");
            } else {
                localStorage.setItem("email", res.data.username);
                localStorage.setItem("pretoken", res.data.token);
                if (res.data.username) router.push("/onboarding");
            }
        } catch (err) {
            console.log(err);
            emailLoading.value = false
        }

    }
    return {
        facebookLogin,
        displayModal,
        saveEmail,
        emailLoading,
        invalidEmailObj
    }
}

// const FBLogin = {
//     methods: {
//         facebookLogin () {
//             console.log(this.displayModal, 'ffffff')
//             FB.login(
//               function (response) {
//                 let token = {
//                   accessToken: response.authResponse.accessToken,
//                 };
//                 axios
//                   .post("/Login/Facebook", token)
//                   .then((res) => {
//                     finish();
//                     if (res.data.success === "Email Required") {
//                       displayModal.value = true;
//                       invalidEmailObj.value = res.data;
//                     } else if (res.data.isOnboarded) {
//                       localStorage.setItem("email", res.data.username);
//                       localStorage.setItem("token", res.data.token);
//                       router.push("/tenant");
//                     } else {
//                       localStorage.setItem("email", res.data.username);
//                       localStorage.setItem("pretoken", res.data.token);
//                       router.push("/onboarding");
//                     }
//                   })
//                   .catch((err) => {
//                     finish();
//                     console.log(err);
//                   });
//               }
//             )
//           },
//           async saveEmail () {
//             emailLoading.value = true
//             try {
//               const res = await axios.post(
//                 "/Register/Facebook",
//                 invalidEmailObj.value
//               )
//               displayModal.value = false;
//               emailLoading.value = false
//               ElNotification({
//                 title: 'Success',
//                 message: 'Email saved successfully',
//                 type: 'success',
//               })
//               if (res.data.isOnboarded) {
//                 localStorage.setItem("email", res.data.username);
//                 localStorage.setItem("token", res.data.token);
//                 router.push("/tenant");
//               } else {
//                 localStorage.setItem("email", res.data.username);
//                 localStorage.setItem("pretoken", res.data.token);
//                 if (res.data.username) router.push("/onboarding");
//               }
//             } catch (err) {
//               console.log(err);
//               emailLoading.value = false
//             }
//           }       
//     }
// }

export default FBLogin