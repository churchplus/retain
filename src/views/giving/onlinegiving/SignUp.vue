<template>
    <div class="col-12">
        <div class="row">
            <div class="col-md-6">
                <div class="row">
                    <div class="col-md-12 mx-auto my-2 px-0 px-2">
                    <label class="hfont">Full Name</label>
                    <el-input
                        class="text-left imp1"
                        type="text"
                        v-model="chosenName"              
                    />
                </div>
              </div>
            </div>
            
            <div class="col-md-6">
                <div class="row">
                    <div class="col-md-12 mx-auto my-2 px-0 px-2">
                    <label class="hfont">Phone Number</label>
                    <el-input
                        class="text-left imp1"
                        type="number"
                        v-model="chosenNumber"              
                    />
                </div>
              </div>
            </div>
           
            <div class="col-md-6">
                <div class="row">
                    <div class="col-md-12 mx-auto my-2 px-0 px-2">
                    <label class="hfont">Email Address</label>
                    <el-input
                        class="text-left imp1"
                        type="email"
                        v-model="chosenEmail"               
                    />
                </div>
              </div>
            </div>
            
            <div class="col-md-6">
                <div class="row">
                    <div class="col-md-12 mx-auto my-2 px-0 px-2">
                    <label class="hfont">Password</label>
                    <el-input
                        class="text-left imp1"
                        type="password"
                        v-model="chosenPassword"               
                    />
                </div>
              </div>
            </div>
            <div class="col-12 mt-3">
                <div class="d-flex justify-content-center">
                    <el-button color="#cecece" @click="signUp" round>
                        Sign Up
                    </el-button>
                </div>
                <div class="label mt-3 text-center hfont">
                    Already registered?
                    <a href="#" class="text-primary" @click.prevent="showSignIn">Sign In</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from "vue"
import { useToast } from "primevue/usetoast";
import finish from "../../../services/progressbar/progress"
import axios from "@/gateway/backendapi";
export default {
    props: ['tenantId'],
    setup (props, { emit }) {
        const toast = useToast()
        const chosenName = ref("");
        const chosenNumber = ref("");
        const chosenEmail = ref("");
        const chosenPassword = ref("");


    //     const paymentFormDetails = () => {
    //   axios
    //     .get(
    //       `/give?paymentFormID=${route.params.userId}`
    //     )
    //     .then((res) => {
    //       console.log(res.data);
    //       formResponse.value = res.data;
    //       selectedContributionType.value = formResponse.value.currencyId;
    //       console.log(formResponse.value);
    //       localStorage.setItem('tenantId', res.data.tenantID)
    //     })
    //     .catch((err) => {
    //       console.log(err.response)
    //       finish()
    //     });
    // };
    // paymentFormDetails();


        const signUp = async () => {
            let signupDetails = {
                name: chosenName.value,
                phoneNumber: chosenNumber.value,
                tenantId: props.tenantId,
                email: chosenEmail.value,
                password: chosenPassword.value,
            };

            try {
                let  { data } = await axios.post("/mobile/v1/Account/WebSignUp", signupDetails);

                console.log(data);

                if (!data.status) {
                    toast.add({
                        severity: "warn",
                        summary: "Something went wrong",
                        detail: `${data.response}`,
                        life: 3000,
                    });
                } else if (data && data.returnObject.token &&  data.status) {
    
                toast.add({
                    severity: "success",
                    summary: "Success",
                    detail: `${data.response}`,
                    life: 3000,
                });
                
                let giverDetails = {
                    giverToken: data.returnObject.token,
                    giverId: data.returnObject.userId,
                    email: data.returnObject.email,
                    name: data.returnObject.fullname,
                    phone: data.returnObject.phoneNumber,
                    setSignInStatus: true
                }

                localStorage.setItem("giverToken", JSON.stringify(giverDetails));
                emit('signed-up', giverDetails)
                
                }
                finish()
            } catch (error) {
                finish()
                // if (error.toString().includes('400')
                if (error.response) {
                    toast.add({
                    severity: "error",
                    summary: "Error signing up",
                    detail: `${error.response.data}`,
                    life: 3000,
                });
                } else if (error.response.toString().toLowercase().includes("network error")){
                    toast.add({
                    severity: "error",
                    summary: "Network Error",
                    detail: `Please ensure you have a strong internet connection`,
                    life: 3000,
                });
                } else if (error.response.toString().toLowercase().includes("timeout")){
                    toast.add({
                    severity: "error",
                    summary: "Request took too long to respond",
                    detail: `Please refresh the page`,
                    life: 3000,
                });
                }
            console.log(error.response);
            }

            };

            const showSignIn = () => {
                emit('show-signin', true)
            }

        return {
            chosenName, chosenNumber, chosenEmail, chosenPassword,  signUp, showSignIn
        }
    }
}
</script>

<style scoped>
.hfont {
  font-size: 12px;
  font-weight: 400;
  color: #020f1e;
}

.signin-color {
  background: rgba(206, 206, 206, 0.274);
  color: black;
}

</style>

