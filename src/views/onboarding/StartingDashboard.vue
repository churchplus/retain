<template>
  <div>
    <div class="logo-con">
      <a class="logo-link"><img src="https://retain.dochase.co/logo.png" alt="Retain Logo" /></a>
    </div>
    <div class="main-con">
      <div class="main-section">
        <div class="intro-div">
          <h1 class="intro-header">Welcome {{ data && data.churchName ? data.churchName : "" }}</h1>
          <p class="intro-subtext">Where do you want to start ?</p>
        </div>
        <div class="boxes-con">
          <router-link class="box" to="/tenant/email" style="text-decoration: none">
            <el-card shadow="hover">
              <div class="inner-box">
              <div class="img-box">
                <img src="../../assets/sms-email-big.svg" alt="Add Member Icon" />
              </div>
              <div class="box-text can-dogi">
                <div class="box-header-text">
                  <h4>Send Email</h4>
                </div>
                <div class="box-small-text">
                  <p>Communicate with your client by sending sms with our seamless email.</p>
                </div>
              </div>
            </div>
            </el-card>
          </router-link>

          <router-link class="box can-do" to="/tenant/sms/compose" style="text-decoration: none">
            <el-card shadow="hover">
            <div class="inner-box">
              <div class="img-box">
                <img src="../../assets/sms-email-big.svg" alt="Add Member Icon" />
              </div>
              <div class="box-text can-do">
                <div class="box-header-text">
                  <h4>Send SMS</h4>
                </div>
                <div class="box-small-text">
                  <p>Communicate with your members by sending sms with our seamless sms.</p>
                </div>
              </div>
            </div>
            </el-card>
          </router-link>

          <router-link class="box" to="/tenant/voice/voicelist" style="text-decoration: none">
            <el-card shadow="hover">
            <div class="inner-box">
              <div class="img-box">
                <img src="../../assets/voice-icon.svg" alt="Add Member Icon" />
              </div>
              <div class="box-text can-do">
                <div class="box-header-text">
                  <h4>Send Voice</h4>
                </div>
                <div class="box-small-text">
                  <p>Communicate with your client by sending voice with our seamless sendiT app.</p>
                </div>

              </div>
            </div>
            </el-card>
          </router-link>
          <router-link class="box" to="/tenant/whatsapp/auth" style="text-decoration: none">
            <el-card shadow="hover">
            <div class="inner-box">
              <div class="img-box">
                <img src="../../assets/WhatsApp.svg" alt="Add Member Icon" />
              </div>
              <div class="box-text can-do">
                <div class="box-header-text">
                  <h4>Send Whatsapp</h4>
                </div>
                <div class="box-small-text">
                  <p>Communicate with your client by sending whatsapp message with our seamless whatsapp.</p>
                </div>

              </div>
            </div>
            </el-card>
          </router-link>
        </div>
      </div>
    </div>

    <div class="rcontainer">
      <div class="row">
        <div class="col-md-10 offset-2 text-center my-4 text-lg-right" style="max-width: 900px; margin: auto">
          <router-link to="/tenant" class="font-weight-bold text-decoration-none">
            <el-button class="font-weight-bold primary--text" text>Skip To Dashboard >>></el-button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import axios from "@/gateway/backendapi"
export default {
  setup() {
    const data = ref({})
    const churchData = () => {
      axios.get("/api/Membership/GetCurrentSignedInUser")
        .then(res => {
          data.value = res.data
        })
        .catch(err => console.log(err))
    }
    churchData()


    return {
      data,
      churchData
    };
  },

  mounted() {
    if (!localStorage.getItem("userSetup")) {
      localStorage.setItem("userSetup", true);
    }
  }
};
</script>

<style scoped>
.logo-con {
  display: flex;
  margin-top: 24px;
}

.can-do a:hover {
  text-decoration: none;
}

.logo-link {
  width: 100%;
  text-align: center;
  margin-top: 36px;
}

.logo-link img{
  height: 5.2rem;
}

.main-con {
  display: flex;
  margin-top: 3em;
}

.nav-con {
  width: 22%;
  height: 100vh;
  background: cyan;
}

.main-section {
  width: 100%;
}

.boxes-con {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 10px;
}

.boxes-con .box {
  width: 32%;
  min-width: 210px;
  max-width: 279px;
  max-height: 366px;
  border-radius: 10px;
  margin: 10px;
  transition: all 0.4s ease-in-out;
}

.img-box {
  width: 100px;
  margin: 37px auto;
}

.img-box img {
  width: 100%;
}

.box-text {
  text-align: center;
}

.box-small-text {
  color: #797e81;
}

.intro-div {
  text-align: center;
}

.intro-header {
  color: #1d262d;
}

.intro-subtext {
  color: #7894a6;
}

.box-header-text {
  color: #0f0220;
}

@media screen and (max-width: 500px) {
  .main-section {
    width: 100%;
  }

  .intro-header {
    font-size: 20px;
  }

  .boxes-con {
    width: 100%;
    margin: auto;
    max-width: 100%;
  }

  .boxes-con .box {
    width: 70%;
  }
}

@media screen and (min-width: 870px) {
  .inner-box {
    margin: auto;
  }
}

@media screen and (min-width: 1300px) {
  .intro-header {
    font-size: 30px;
  }

  .intro-subtext {
    font-size: 22px;
  }
}
</style>