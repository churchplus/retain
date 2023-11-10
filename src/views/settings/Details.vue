<template>
    <div>
        <div class="detail-container">
            <h1>Detail</h1>
            <div class="detail-container0">
            <div class="detail-container1">
                <div class="mb-4">
                <h5 class="mb-0">User Name:</h5>
                <p class="">foundation@lowiew.org</p>
                </div>
                <div class="mb-4">
                <h5 class="mb-0">User Email</h5>
                <p>foundation@lowiew.org</p>
                </div>
                <div class="mb-4">
                 <h5 class="mb-0">Last Active</h5>
                <p>foundation@lowiew.org</p>
                </div>
            </div>
            <div class="detail-container2">
                <div class="mb-4">
                <h5 class="mb-0">Last Login</h5>
                <p>January 07, 2021 3:42:04pm</p>
                </div>
                <div class="mb-4">
                <h5 class="mb-0">Created</h5>
                 <p class="mb-">January 07, 2021 3:42:04pm</p>
                 </div>
            </div>
            </div>
            <hr>
            <h3>Close/Suspend Account</h3>
            <p class="para">Click the button below to delete your entire ChurchPlus account. This means you will no longer be able to access your church, accounting and payroll records and personal financial information</p>
             <div class="buton">
                 <Button label="Suspend Account" class="p-button-raised p-button-rounded" style="font-size:14px; opacity:1; color:#ffffff; background:#F2BC9E; border-color: #F2BC9E; width:177px; height:40px; margin-right:30px" />
                 <Button label="Delete Account" class="p-button-raised p-button-rounded"  style="font-size:14px; opacity:1; color:#ffffff; background:#980404; border-color: #980404; width:177px; height:40px" />
                 
             </div>
       </div>
</div>
</template>

<script>
import Button from 'primevue/button';
    export default {
        components: {Button}
  
    }
</script>

<style scoped>
*{
    box-sizing: border-box;
     margin-bottom: 20px;
}
.detail-container{
    width: 100%;
    height: auto;
    margin-top: 40px;
    padding-left: 20px;
   
}
.detail-container h1{
    font-size: 34px;
    font-weight: 800px;
    opacity: 1;
    letter-spacing: 0px;
    color: #02172E;
    margin-bottom: 55px;
    font-weight: bold;
}
.detail-container h3{
    margin-top: 30px;
    color: #02172E;
    opacity: 1;
    font-size: 24px;
    font-weight: bold;
    letter-spacing: 0px;
}
.para{
    font-size: 16px;
    font-weight: normal;
    letter-spacing: 0px;
    opacity: 1;
    color: #02172E;
}
.detail-container0{
    display: flex;
}
.detail-container0 h5{
    font-size: 14px;
    font-weight: bold;
    opacity: 0.8;
    color: #190138;
}
.detail-container0 p{
font-size:16px;
letter-spacing: 0px;
color: #02172E;
opacity: 1;  
}
.detail-container1{
    width: 40%;
}
.detail-container2{
    width: 40%;
    margin-top: 0;
}
.buton{
    margin-top: 40px;
    width: 100%;
}
@media screen and (max-width:539px) {

    .detail-container0{
    display: flex;
}
.detail-container1{
    width: 100%;
}
.detail-container2{
    width: 50%;
    margin-top: 0;
}
  
}
@media screen and (max-width:475px){
    .detail-container0{
    display: block; 
   }
   .p-button-rounded{
       width:120px!important;
       height:40px!important;
       font-size: 11px!important;
   }


}

</style>