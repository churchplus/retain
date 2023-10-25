<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-5 offset-md-1 border" style="height:100vh;">
                <div class="col-10 offset-md-2 my-5 logo">
                     <img src="../../assets/churchplus-logo.png"  alt="">
                 </div>
                 <div class="col-8 offset-md-2 my-5 col-12">
                     <p class="childLog">Log in to child checkin</p>
                 </div>
                <form>
                    <div class="form-group col-md-8 offset-md-2 col-12">
                        <label for="email"  class="labelForm">Email/Phone number</label>
                        <input type="text" class="form-control form-input" id="email" placeholder="enter email/phone number">
                    </div>
                    <div class="form-group col-md-8 offset-md-2 col-12">
                        <label for="password" class="labelForm">Password</label>
                        <input type="password" class="form-control form-input" id="password" placeholder="password">
                    </div>
                    <div class="col-md-8  offset-md-2 col-12">
                        <p class="condition">must be six characters long</p>
                    </div>
                    <div class="col-md-8 offset-md-2 col-12">
                         <button type="button" class="btn btn-primary col-12 col-md-12 mt-5" style="background:#2E67CE; font-size:15px">Create an account</button>
                    </div>
                    <div class="row align-items-center justify-content-center">
                        <div class="col-12 col-md-6 d-flex mt-3">
                            <hr class="hr-login"> <span class="mt-1"  style="color: #17293B;">or</span> <hr class="hr-login">
                        </div>
                    </div>
                </form>
            </div> 
           
            <div class="col-md-5 border" style="height:100vh;">image</div>
        </div>
    </div>
</template>

<script>
export default {
    setup () {
        

        return {}
    }
}
</script>

<style scoped>
.logo img {
    /* background: transparent url('../../assets/churchplus-logo.png') 0% 0% no-repeat padding-box; */
    width: 123px;
    height: 35px;
}
.childLog {
    font: normal normal 900 42px/57px Nunito Sans;
    color: #020E1C;
    font-size: 25px;
}
 .labelForm {
    font: normal normal 900 42px/57px Nunito Sans;
    letter-spacing: 0px;
    color: #020E1C;
    font-size: 15px;
}
.condition {
    font-size: 10px;
    font: italic normal 600 12px/17px Open Sans;
    letter-spacing: 0px;
    color: #020E1C;
    line-height: 0px;
}

.form-input {
    background: #F6F6F6 0% 0% no-repeat padding-box;
    border-radius: 5px;
}
.hr-login{
    width: 50%;
}

</style>