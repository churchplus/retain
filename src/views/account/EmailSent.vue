<template>
  <div>
    <div class="fp-con">
      <div class="logo-con">
        <a href="" class="logo-link"><img src="https://retain.dochase.co/logo.png" alt="retain Logo"></a>
      </div>
      <div class="fp-form-con mt-5">
        <div class="confirm-text">
            <h3>Check Your Email</h3>
        </div>
        <div class="confirm-desc text-center">
            <p>We have sent an email with a link to reset your password to <span class="primary-text font-weight-bold">{{ email }}</span>.</p>
            <p class="contact-us">If you don't receive the email, check your spam folder or <a href="" class="contact-link">contact us</a></p>
            <p class="or-reset">Or try password reset using a different email address.</p>
            <router-link to="/" class="text-decoration-none primary-bg default-btn font-weight-700 text-white border-0 c-pointer">Login</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            email: ""
        }
    },

    methods: {
        login() {

        }
    },

    created() {
      this.email = this.$route.params.email
    }
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

.fp-con {
    padding: 30px 0;
}

.fp-form-con {
    width: 100%;
    max-width: 400px;
    margin: auto;
    padding: 0 10px;
    color: #142129;
}

.confirm-text {
    text-align: center;
}


.confirm-desc {
    text-align: justify;
}

.contact-link {
    color: #136ACD;
    text-decoration: none;
    font-weight: bold;
}

@media screen and (min-width: 1300px) {
    .fp-form-con {
        max-width: 500px;
    }
}
</style>