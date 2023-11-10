<template>
  <div>
    <div class="fp-con">
      <div class="logo-con">
        <a href="" class="logo-link"
          ><img src="../../assets/sendit-logo.png" alt="Churchplus Logo"
        /></a>
      </div>
      <div class="fp-header mt-5 mb-4">
        <h2>Enter a New Password</h2>
      </div>
      <div class="fp-form-con">
        <form action="" @submit.prevent="resetPassword">
          <div class="container" v-if="errorMessage">
            <div class="row">
              <div class="col-md-12">
                <div class="error-div">
                  <p class="error-message mb-0">
                    {{ errorMessage }}
                    <a class="primary-text font-weight-700 text-decoration-none c-pointer" @click="requestNewLink" v-if="resetGuideBtnShould">Request new reset link</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <input
              class="input"
              v-model="credentials.password"
              :type="passwordType"
              placeholder="New Password"
              required
              @input="clearErrorMessage"
            />
          </div>
          <div class="password-help">
            <span class="password-tip"
              >At least 6 characters, but longer is better.</span
            >
            <span class="show-password"
              ><a href="" class="show-password-link" @click="showPassword">{{
                showBtnText
              }}</a></span
            >
          </div>

          <div>
            <input
              class="input"
              v-model="credentials.confirmPassword"
              type="password"
              placeholder="Confirm Password"
              required
              @input="clearErrorMessage"
            />
            <span v-if="mismatch" class="text-danger"
              >Password do not match</span
            >
          </div>

          <button class="submit-btn sign-in-btn">Reset Password</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import authService from "@/services/auth/authservice";

export default {
  data() {
    return {
      credentials: {},
      passwordType: "password",
      showBtnText: "Show",
      mismatch: false,
      resetGuideBtnShould: false,
      errorMessage: "",

    };
  },

  methods: {
    resetPassword() {
      this.errorMessage = "";
      this.resetGuideBtnShould = false;
      if (this.credentials.password !== this.credentials.confirmPassword) {
        this.mismatch = true;
        return false;
      }

      authService
        .resetPassword({ email: this.credentials.email, password: this.credentials.password, resetToken: this.credentials.resetToken })
        .then((res) => {
          localStorage.setItem("token", res.result.value.token);
          if (res.result.value.churchSize > 0) {
            this.$router.push("/tenant");
          } else {
            this.$router.push("/next");
          }
        })
        .catch((error) => {
          if (error.status) {
            if (error.status === 404) this.errorMessage = "An error occurred, if this link was copied, check to make sure you copied the whole link";
            if (error.status === 400) {
              this.resetGuideBtnShould = true;
              this.errorMessage = "An error occured, if this link was copied check to make sure you copied the whole link. If you have the correct link, then try requesting for a new reset link";
            }
          } else {
            if (error.message.includes("timeout")) {
              this.errorMessage = "The request was taking too long, please try again";
            } else {
              this.errorMessage = "There seems to be an error, please make sure you are connected to the internet and try again";
            }
          }
        });
    },

    showPassword(e) {
      e.preventDefault();
      if (!this.credentials.password) return false;
      this.passwordType = this.passwordIsVissible ? "password" : "text";
      this.passwordIsVissible = !this.passwordIsVissible;
      this.showBtnText = this.passwordIsVissible ? "Hide" : "Show";
    },

    clearErrorMessage() {
      this.mismatch = false;
    },

    requestNewLink() {
      authService.forgotPassword(this.credentials.email)
        .then(res => {
          console.log(res.id);
          this.$router.push({
            name: "EmailSent",
            params: { email: this.credentials.email }
          })
        })
        .catch(error => {
          console.log(error);
          this.$router.push({
            name: "EmailSent",
            params: { email: this.credentials.email }
          })
        })
    }
  },

  created() {
    this.credentials.email = this.$route.query.email;
    this.credentials.resetToken = this.$route.query.resetToken;
  },
};
</script>

<style scoped>
.logo-con {
  display: flex;
  margin-bottom: 24px;
}

.logo-link {
  width: 100%;
  text-align: center;
}

.fp-header {
  text-align: center;
  color: #1c252c;
}

.fp-con {
  padding: 30px 0;
}

.fp-form-con {
  width: 100%;
  max-width: 400px;
  margin: auto;
  padding: 0 10px;
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
  transition: border 0.1s linear;
  border: 1px solid #b2c2cd;
  margin: 4px 0;
}

.input::placeholder {
  font-style: italic;
  color: #b2c2cd;
  letter-spacing: 1.5px;
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

.fp-desc {
  text-align: center;
  color: #142129;
}

.show-password {
  float: right;
}

.password-help {
  margin-bottom: 24px;
  font-size: 14px;
  color: #718fa2;
  font-weight: lighter;
}

.show-password-link {
  text-decoration: none;
  color: #136acd;
  font-weight: bold;
}

.show-password:hover {
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

@media screen and (min-width: 1300px) {
  .fp-form-con {
    max-width: 500px;
  }
}
</style>