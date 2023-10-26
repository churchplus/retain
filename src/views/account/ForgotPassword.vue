<template>
  <div>
    <div class="fp-con">
      <div class="logo-con">
        <a href="" class="logo-link"><img src="../../assets/sendit-logo.png" alt="Churchplus Logo"></a>
      </div>
      <div class="fp-header mt-5">
          <h2>Forgot Your Password?</h2>
      </div>
      <div class="fp-form-con">
          <div class="fp-desc">
            <p class="fp-desc-text">Enter your primary email and we'll send you instructions on how to reset your password.</p>
          </div>
        <form action="" @submit.prevent="resetPassword">
          <div>
            <input
              class="input"
              v-model="credentials.email"
              type="email"
              placeholder="Email"
              required
            />
          </div>
          

          <button class="submit-btn sign-in-btn mt-2">Send Reset Instructions</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import authService from "@/services/auth/authservice"

export default {
    data() {
        return {
            credentials: { }
        }
    },

    methods: {
        resetPassword(e) {
            e.preventDefault()
            authService.forgotPassword(this.credentials.email)
              .then(res => {
                console.log(res.id);
                this.$router.push({
                  name: "EmailSent",
                  params: { email: this.credentials.email }
                })
              })
              .catch(err => {
                console.log(err);
                if (err.response.status) {
                  this.$router.push({
                    name: "EmailSent",
                    params: { email: this.credentials.email }
                  })
                }
              })
        }
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
    color: #1C252C;
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
    transition: border .1s linear;
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

  @media screen and (min-width: 1300px) {
      .fp-form-con {
          max-width: 500px;
      }
  }
</style>