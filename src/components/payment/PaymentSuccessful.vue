<template>
    <div>
        <div class="over-con">
            <div class="row main m-0">
                <div class="col-md-12 primary-bg py-5 main-top">
                    <i class="pi pi-times close-icon"  @click="closeModal"></i>
                    <p class="text-center"><i class="pi pi-check check-icon" style="fontSize: 2rem"></i></p>
                    <!-- <p class="text-center"><i class="pi pi-facebook check-icon"></i></p> -->
                    <p class="text-center font-weight-700 text-white mt-5">Payment was Successful</p>
                </div>
                <div class="col-md-12 py-5 main-bottom">
                    <div class="row">
                        <div class="col-md-12">
                            <p class="text-center d-flex flex-column primary-text"><span class="stylish-text">Thank You!</span> <span class="font-weight-700">For Choosing Retain</span></p>
                        </div>
                    </div>
                    <div class="row action-message py-4">
                        <div class="col-md-12 font-weight-600">
                            <p class="text-center">{{ currency }} {{ amount }} worth of SMS units have been successfully added to your SMS unit balance</p>
                        </div>
                        <div class="col-md-12 text-center">
                            <p>Current Units Balance: <span class="font-weight-700" style="font-size: 20px">{{ balance }}</span></p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12 d-flex justify-content-center mt-5">
                            <router-link to="/tenant/sms/compose" class="default-btn primary-bg border-0 text-white text-decoration-none">Send SMS Now!</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { computed, ref } from 'vue'
import userService from "../../services/user/userservice"
import { useStore } from "vuex";
    export default {
        props: [ "amount" ],

        setup(props, { emit }) {
            const store = useStore();
            const currency = ref(store.getters.currency);
            const currentUnits = ref(store.getters.smsBalance)

            const getUserCurrency = async () => {
                try {
                    const user = await userService.getCurrentUser();
                    currency.value = user.currency;
                } catch (error) {
                    console.log(error);
                }
            }

            if (!currency.value) getUserCurrency();

            const getCurrentUserBalance = async () => {
                try {
                    
                    const data = await userService.getCurrentUser();
                    currentUnits.value = data.smsBalance;
                    // currentUser.value = data;
                } catch (error) {
                    console.log(error);
                }
            }

            if (!currentUnits.value || currentUnits.value === 0) getCurrentUserBalance();
            
            const balance = computed(() => {
                if (!currentUnits.value) return 0;
                return currentUnits.value;
            })

            const closeModal = () => emit("close-modal");

            return {
                currency,
                closeModal,
                balance,
            }
        }
    }
</script>

<style scoped>
    .main {
        border: 1px solid #EBEFF4;
        border-radius: 20px;
    }

    .main-top {
        border-radius: 20px 20px 0 0;
    }

    .main-bottom {
        border-radius: 0 0 20px 20px;
        background: #fff;
    }

    .check-icon {
        background: #fff;
        padding: 10px;
        border-radius: 50%;
    }

    .action-message {
        background: #ebeff433;
    }

    .stylish-text {
        font-size: 55px;
        font-family: cursive;
    }

    .over-con {
        background: #797979;
    }

    .p-dialog-titlebar-close {
        font-size: 100px;
    }

    .close-icon {
        position: absolute;
        top: .5rem;
        right: 1rem;
        font-size: 20px;
        color: wheat;
        cursor: pointer;
    }
</style>