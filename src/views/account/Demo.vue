<template>
  <div>
    <div class="main-section">
      <div class="logo-con">
        <a href="" class="logo-link"><img src="https://retain.dochase.co/logo.png" alt="Retain Logo"></a>
      </div>
      <div class="header">
        <h1>Sign in</h1>
      </div>

      <div class="form-container">
        <div class="error-div" v-if="showError">
              <p class="error-message">{{ errorMessage }}</p>
          </div>

        <form action="">
          <div>
            <input type="text" v-model="credentials.email" class="input" placeholder="Email" required/>
          </div>
          <div>
            <input class="input" v-model="credentials.password" type="password" placeholder="Password" required/>
          </div>
          <div class="f-password-div">
            <router-link to="/forgotpassword" class="forgot-password">Forgot it?</router-link>
          </div>

          <button class="submit-btn sign-in-btn" @click="login">Sign in</button>
        </form>

        <div style="margin: 24px 0">
          <span class="or">or</span>
        </div>

        <div>
          <button type="submit" class="google-btn btn-logo sign-in-btn">
             <img src="../../assets/google.png" alt="Google Icon">
             <span>Sign in with Google</span>
             <span></span>
          </button>
        </div>
        <div>
          <button class="facebook-btn btn-logo sign-in-btn">
            <img src="../../assets/facebook-small.png" class="fb-icon" alt="Google Icon">
             <span>Sign in with Facebook</span>
             <span></span>
          </button>
        </div>
      </div>

      <div class="bottom-container">
        <div>
          <p class="sign-up-prompt">Don't have an account yet? <router-link to="/register" class="sign-up">Sign up now</router-link></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
    setup() {
      
    },
    data() {
        return {
            passwordType: 'password',
            credentials: { },
            showError: false,
            errorMessage: "",
        }
    },

    methods: {
      login(e) {
        e.preventDefault();
        console.log(this.credentials.email);
        this.$store.state.userEmail = this.credentials.email
        // this.$store.dispatch("setUserEmail", this.credentials.email)
        axios.post("/api/account/login", this.credentials)
          .then(res => {
            console.log(res);
            this.$store.dispatch("setUserData", res.data);
            localStorage.setItem("token", res.data.accessToken);
            this.$router.push("/next")
          })
          .catch(err => {
            const { status } = err.response;
            const { onboarding } = err.response.data;

            if (status == 400 && !onboarding)
            {
              this.$router.push('/onboarding');
            } else {
              this.errorMessage = err.response.data;
              this.showError = true;
            }
          })
      }
    }
};
</script>

<style scoped>
.logo-con {
  display: flex;
  margin-top: 24px;
}

.logo-link {
  width: 100%;
  text-align: center;
}

  .header {
    text-align: center;
    margin-bottom: 41px;
    margin-top: 41px;
  }

  .header h1 {
    font-size: 30px;
  }

  .main-section {
    max-width: 400px;
    margin: auto;
    padding: 10px;
  }

  .input {
    /* font-family: Averta,sans-serif; */
    color: #1c252c;
    font-weight: normal;
    width: 100%;
    box-sizing: border-box;
    border-radius: 4px;
    padding: 8px 10px 6px;
    min-height: 40px;
    appearance: none;
    outline: none;
    vertical-align: middle;
    transition: border .1s linear;
    border: 1px solid #b2c2cd;
    margin: 4px 0;
  }

  .forgot-password {
    /* font-family: Averta,sans-serif; */
    font-size: 14px;
    line-height: 1.4;
    text-decoration: none;
    color: #136acd;
    font-weight: bold;
    cursor: pointer;
  }

  .input::placeholder {
    font-style: italic;
    color: #b2c2cd;
    letter-spacing: 1.5px;
  }

  .f-password-div {
    margin-bottom: 8px;
  }

  .submit-btn {
    background: #136acd;
    outline: none;
  }

  .submit-btn:hover {
    cursor: pointer;
  }

  .sign-in-btn {
    color: #fff;
    border: 1px solid transparent;
    margin-top: 8px;
    width: 100%;
    padding: 8px 20px;
    box-sizing: border-box;
    text-align: center;
    min-width: 100px;
    border-radius: 500px;
    vertical-align: middle;
    text-decoration: none;
    appearance: none;
    font-weight: 400;
    font-size: 16px;
    outline: none;
  }

  .input:focus {
    box-shadow: 0 0 0 3px rgba(19, 106, 205, 0.2);
  }

  
/* .input:not(:focus) {
  font-style: italic;
   color: #b2c2cd;
   letter-spacing: 1.5px;
} */

.or {
  display: flex;
  flex-direction: row;
  color: #8b9ba5;
}
.or:before, .or:after{
  content: "";
  flex: 1 1;
  border-bottom: 1px solid #8b9ba5;
  margin: auto;
}

.or:before {
  margin-right: 10px
}
.or:after {
  margin-left: 10px
}

.google-btn {
  background: #4285f4;
}

.facebook-btn {
  background: #410093;
}

.fb-icon {
  background: #fff;
  padding: 0.23rem .6rem;
  border-radius: 50%;
  margin: .25rem;
}

.btn-logo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1px;
}

.bottom-container {
  text-align: center;
  color: #4d6575;
  font-size: 14px;
  line-height: 1.4;
  margin-top: 60px;
}

.sign-up {
  color: inherit;
  text-decoration: underline;
}

.error-div {
    background: #fff8f8;
    border-color: #ffe9e9;
    padding: 10px 5px;
    margin-bottom: 24px;
    border-radius: 8px;
    border: 1px solid transparent;
    border-left: 5px solid #b52626;
}

.error-message {
    color: #b52626;
}
</style>
